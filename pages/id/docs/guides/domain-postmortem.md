---
title: Postmortem Modul Domain
layout: docs.hbs
---

# Postmortem Modul Domain

## Masalah Kegunaan

### Perilaku Tersirat

Mungkin bagi pengembang untuk membuat domain baru dan kemudian menjalankannya `domain.enter()`. Yang kemudian bertindak sebagai penangkap semua untuk pengecualian apa pun di masa depan yang tidak bisa diamati oleh pelempar. Mengizinkan penulis modul untuk mencegat pengecualian kode yang tidak terkait dalam modul yang berbeda. Mencegah pencetus kode dari mengetahui tentang pengecualiannya sendiri.

Berikut adalah contoh bagaimana satu modul yang ditautkan secara tidak langsung dapat memengaruhi modul lainnya:

```js
// module a.js
const b = require('./b');
const c = require('./c');

// module b.js
const d = require('domain').create();
d.on('error', () => {
  /* silence everything */
});
d.enter();

// module c.js
const dep = require('some-dep');
dep.method(); // Uh-oh! This method doesn't actually exist.
```

Karena modul `b` memasuki domain tetapi tidak pernah keluar, pengecualian yang tidak tertangkap akan ditelan. Meninggalkan modul `c` dalam kegelapan mengapa modul itu tidak berjalan secara keseluruhan naskah. Meninggalkan `module.exports` yang berpotensi terisi sebagian. Melakukan ini tidak sama dengan mendengarkan `'uncaughtException'`. Seperti yang terakhir adalah secara eksplisit dimaksudkan untuk menangkap kesalahan secara global. Masalah lainnya adalah bahwa domain adalah diproses sebelum penangan `'uncaughtException'`, dan mencegahnya dari berlari.

Masalah lainnya adalah domain merutekan kesalahan secara otomatis jika tidak ada `'error'` handler diatur pada emitor acara. Tidak ada mekanisme keikutsertaan untuk ini, dan secara otomatis menyebar ke seluruh rantai asinkron. Ini mungkin tampak berguna pada awalnya, tetapi sekali panggilan asinkron adalah dua atau lebih modul yang dalam dan salah satunya tidak menyertakan penangan kesalahan yang akan dibuat oleh pembuat domain tiba-tiba menangkap pengecualian yang tidak terduga, dan pengecualian pelempar akan pergi tidak disadari oleh penulis.

Berikut ini adalah contoh sederhana tentang bagaimana handler `'error'` yang hilang memungkinkan domain aktif untuk membajak kesalahan:

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', (err) => console.error(err.message));

d.run(() =>
  net
    .createServer((c) => {
      c.end();
      c.write('bye');
    })
    .listen(8000)
);
```

Bahkan menghapus koneksi secara manual melalui `d.remove(c)` tidak mencegah kesalahan koneksi agar tidak disadap secara otomatis.

Kegagalan yang mengganggu baik perutean kesalahan dan penanganan pengecualian adalah: inkonsistensi dalam bagaimana kesalahan digelembungkan. Berikut ini adalah contoh caranya domain bersarang akan dan tidak akan menggelembungkan pengecualian berdasarkan waktu terjadinya:

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', () => console.error('d intercepted an error'));

d.run(() => {
  const server = net
    .createServer((c) => {
      const e = domain.create(); // No 'error' handler being set.
      e.run(() => {
        // This will not be caught by d's error handler.
        setImmediate(() => {
          throw new Error('thrown from setImmediate');
        });
        // Though this one will bubble to d's error handler.
        throw new Error('immediately thrown');
      });
    })
    .listen(8080);
});
```

Mungkin diharapkan bahwa domain bersarang selalu tetap bersarang, dan akan selalu menyebarkan pengecualian ke tumpukan domain. Atau pengecualian itu tidak akan pernah gelembung secara otomatis. Sayangnya kedua situasi ini terjadi, yang mengarah ke perilaku yang berpotensi membingungkan yang bahkan cenderung sulit untuk di-debug konflik waktu.

### Kesenjangan API

Sementara API berdasarkan penggunaan `EventEmitter` dapat menggunakan `bind()` dan gaya errback callback dapat menggunakan `intercept()`, API alternatif yang secara implisit mengikat ke domain aktif harus dieksekusi di dalam `run()`. Artinya jika penulis modul ingin mendukung domain menggunakan mekanisme alternatif dari yang disebutkan mereka harus secara manual mengimplementasikan dukungan domain itu sendiri. Alih-alih bisa memanfaatkan mekanisme implisit yang sudah ada.

### Propagasi Kesalahan

Menyebarkan kesalahan di seluruh domain bersarang tidak langsung, jika bahkan mungkin. Dokumentasi yang ada menunjukkan contoh sederhana tentang cara `close()` dan `http` server jika ada kesalahan pada handler permintaan. Apa yang tidak jelaskan adalah cara menutup server jika penangan permintaan membuat yang lain contoh domain untuk permintaan asinkron lainnya. Menggunakan yang berikut ini sebagai sederhana contoh kegagalan propagasi kesalahan:

```js
const d1 = domain.create();
d1.foo = true; // custom member to make more visible in console
d1.on('error', (er) => {
  /* handle error */
});

d1.run(() =>
  setTimeout(() => {
    const d2 = domain.create();
    d2.bar = 43;
    d2.on('error', (er) => console.error(er.message, domain._stack));
    d2.run(() => {
      setTimeout(() => {
        setTimeout(() => {
          throw new Error('outer');
        });
        throw new Error('inner');
      });
    });
  })
);
```

Bahkan jika instance domain digunakan untuk penyimpanan lokal, jadi akses ke sumber daya tersedia, masih tidak ada cara untuk mengizinkan kesalahan untuk melanjutkan propagasi dari `d2` kembali ke `d1`. Inspeksi cepat dapat memberi tahu kami yang hanya melempar dari domain `d2`'s handler `'error'` akan memungkinkan `d1` untuk kemudian tangkap pengecualian dan jalankan penangan kesalahannya sendiri. Padahal itu bukan kasus. Setelah memeriksa `domain._stack` Anda akan melihat bahwa hanya tumpukan berisi `d2`.

Ini mungkin dianggap sebagai kegagalan API, tetapi meskipun itu beroperasi dalam hal ini cara masih ada masalah transmisi fakta bahwa cabang di eksekusi asinkron telah gagal, dan bahwa semua operasi lebih lanjut di dalamnya cabang harus dihentikan. Dalam contoh penangan permintaan http, jika kita mematikan beberapa permintaan asinkron dan masing-masing kemudian data `write()` kembali ke klien lebih banyak kesalahan akan muncul dari mencoba `write()` ke closed menangani. Lebih lanjut tentang ini di _Resource Cleanup on Exception_.

### Pembersihan Sumber Daya pada Pengecualian

Skrip berikut berisi contoh yang lebih kompleks dari pembersihan yang benar di pohon ketergantungan sumber daya kecil dalam kasus pengecualian terjadi di a koneksi yang diberikan atau salah satu dependensinya. Memecah skrip menjadi operasi dasar:

```js
'use strict';

const domain = require('domain');
const EE = require('events');
const fs = require('fs');
const net = require('net');
const util = require('util');
const print = process._rawDebug;

const pipeList = [];
const FILENAME = '/tmp/tmp.tmp';
const PIPENAME = '/tmp/node-domain-example-';
const FILESIZE = 1024;
let uid = 0;

// Setting up temporary resources
const buf = Buffer.alloc(FILESIZE);
for (let i = 0; i < buf.length; i++) buf[i] = ((Math.random() * 1e3) % 78) + 48; // Basic ASCII
fs.writeFileSync(FILENAME, buf);

function ConnectionResource(c) {
  EE.call(this);
  this._connection = c;
  this._alive = true;
  this._domain = domain.create();
  this._id = Math.random().toString(32).substr(2).substr(0, 8) + ++uid;

  this._domain.add(c);
  this._domain.on('error', () => {
    this._alive = false;
  });
}
util.inherits(ConnectionResource, EE);

ConnectionResource.prototype.end = function end(chunk) {
  this._alive = false;
  this._connection.end(chunk);
  this.emit('end');
};

ConnectionResource.prototype.isAlive = function isAlive() {
  return this._alive;
};

ConnectionResource.prototype.id = function id() {
  return this._id;
};

ConnectionResource.prototype.write = function write(chunk) {
  this.emit('data', chunk);
  return this._connection.write(chunk);
};

// Example begin
net
  .createServer((c) => {
    const cr = new ConnectionResource(c);

    const d1 = domain.create();
    fs.open(
      FILENAME,
      'r',
      d1.intercept((fd) => {
        streamInParts(fd, cr, 0);
      })
    );

    pipeData(cr);

    c.on('close', () => cr.end());
  })
  .listen(8080);

function streamInParts(fd, cr, pos) {
  const d2 = domain.create();
  const alive = true;
  d2.on('error', (er) => {
    print('d2 error:', er.message);
    cr.end();
  });
  fs.read(
    fd,
    Buffer.alloc(10),
    0,
    10,
    pos,
    d2.intercept((bRead, buf) => {
      if (!cr.isAlive()) {
        return fs.close(fd);
      }
      if (cr._connection.bytesWritten < FILESIZE) {
        // Documentation says callback is optional, but doesn't mention that if
        // the write fails an exception will be thrown.
        const goodtogo = cr.write(buf);
        if (goodtogo) {
          setTimeout(() => streamInParts(fd, cr, pos + bRead), 1000);
        } else {
          cr._connection.once('drain', () =>
            streamInParts(fd, cr, pos + bRead)
          );
        }
        return;
      }
      cr.end(buf);
      fs.close(fd);
    })
  );
}

function pipeData(cr) {
  const pname = PIPENAME + cr.id();
  const ps = net.createServer();
  const d3 = domain.create();
  const connectionList = [];
  d3.on('error', (er) => {
    print('d3 error:', er.message);
    cr.end();
  });
  d3.add(ps);
  ps.on('connection', (conn) => {
    connectionList.push(conn);
    conn.on('data', () => {}); // don't care about incoming data.
    conn.on('close', () => {
      connectionList.splice(connectionList.indexOf(conn), 1);
    });
  });
  cr.on('data', (chunk) => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].write(chunk);
    }
  });
  cr.on('end', () => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].end();
    }
    ps.close();
  });
  pipeList.push(pname);
  ps.listen(pname);
}

process.on('SIGINT', () => process.exit());
process.on('exit', () => {
  try {
    for (let i = 0; i < pipeList.length; i++) {
      fs.unlinkSync(pipeList[i]);
    }
    fs.unlinkSync(FILENAME);
  } catch (e) {}
});
```

* Ketika koneksi baru terjadi, secara bersamaan:
  * Buka file di sistem file
  * Buka Pipa ke soket unik
* Baca sepotong file secara tidak sinkron
* Tulis potongan ke koneksi TCP dan soket pendengar apa pun
* Jika salah satu dari sumber daya ini error, beri tahu semua sumber daya terlampir lainnya bahwa mereka perlu membersihkan dan mematikan

Seperti yang dapat kita lihat dari contoh ini, lebih banyak yang harus dilakukan untuk membersihkan dengan benar sumber daya ketika sesuatu gagal daripada apa yang dapat dilakukan secara ketat melalui API domain. Semua yang ditawarkan domain adalah mekanisme agregasi pengecualian. Bahkan kemampuan yang berpotensi berguna untuk menyebarkan data dengan domain dengan mudah dilawan, dalam contoh ini, dengan melewatkan sumber daya yang dibutuhkan sebagai fungsi argumen.

Satu domain masalah yang diabadikan adalah kesederhanaan yang seharusnya bisa melanjutkan eksekusi, bertentangan dengan apa yang dinyatakan dokumentasi, dari aplikasi meskipun pengecualian tak terduga. Contoh ini menunjukkan kekeliruan di balik gagasan itu.

Mencoba pembersihan sumber daya yang tepat pada pengecualian tak terduga menjadi lebih kompleks sebagai aplikasi itu sendiri tumbuh dalam kompleksitas. Contoh ini hanya memiliki 3 dasar sumber daya dalam permainan, dan semuanya dengan jalur ketergantungan yang jelas. Jika aplikasi menggunakan sesuatu seperti sumber daya bersama atau sumber daya menggunakan kembali kemampuan untuk membersihkan, dan menguji dengan benar bahwa pembersihan telah dilakukan, tumbuh pesat.

Pada akhirnya, dalam hal penanganan kesalahan, domain tidak lebih dari pengendali `'uncaughtException'` yang dimuliakan. Kecuali dengan lebih implisit dan perilaku yang tidak dapat diamati oleh pihak ketiga.

### Propagasi Sumber Daya

Kasus penggunaan lain untuk domain adalah menggunakannya untuk menyebarkan data di sepanjang asinkron jalur data. Satu hal yang bermasalah adalah ambiguitas kapan harus mengharapkan domain yang benar ketika ada beberapa di tumpukan (yang harus diasumsikan jika tumpukan async berfungsi dengan modul lain). Juga konflik antara makhluk dapat bergantung pada domain untuk penanganan kesalahan sementara juga tersedia untuk mengambil data yang diperlukan.

Berikut ini adalah contoh yang terlibat yang menunjukkan kegagalan menggunakan domain untuk: menyebarkan data di sepanjang tumpukan asinkron:

```js
const domain = require('domain');
const net = require('net');

const server = net
  .createServer((c) => {
    // Use a domain to propagate data across events within the
    // connection so that we don't have to pass arguments
    // everywhere.
    const d = domain.create();
    d.data = { connection: c };
    d.add(c);
    // Mock class that does some useless async data transformation
    // for demonstration purposes.
    const ds = new DataStream(dataTransformed);
    c.on('data', (chunk) => ds.data(chunk));
  })
  .listen(8080, () => console.log('listening on 8080'));

function dataTransformed(chunk) {
  // FAIL! Because the DataStream instance also created a
  // domain we have now lost the active domain we had
  // hoped to use.
  domain.active.data.connection.write(chunk);
}

function DataStream(cb) {
  this.cb = cb;
  // DataStream wants to use domains for data propagation too!
  // Unfortunately this will conflict with any domain that
  // already exists.
  this.domain = domain.create();
  this.domain.data = { inst: this };
}

DataStream.prototype.data = function data(chunk) {
  // This code is self contained, but pretend it's a complex
  // operation that crosses at least one other module. So
  // passing along "this", etc., is not easy.
  this.domain.run(() => {
    // Simulate an async operation that does the data transform.
    setImmediate(() => {
      for (let i = 0; i < chunk.length; i++)
        chunk[i] = ((chunk[i] + Math.random() * 100) % 96) + 33;
      // Grab the instance from the active domain and use that
      // to call the user's callback.
      const self = domain.active.data.inst;
      self.cb(chunk);
    });
  });
};
```

Di atas menunjukkan bahwa sulit untuk memiliki lebih dari satu API asinkron mencoba menggunakan domain untuk menyebarkan data. Contoh ini mungkin bisa diperbaiki dengan menetapkan `parent: domain.active` di konstruktor `DataStream`. Kemudian memulihkannya melalui `domain.active = domain.active.data.parent` tepat sebelum panggilan balik pengguna dipanggil. Juga instantiasi `DataStream` di `'connection'` callback harus dijalankan di dalam `d.run()`, bukan hanya menggunakan `d.add(c)`, jika tidak, tidak akan ada domain aktif.

Singkatnya, untuk memiliki doa penggunaan kesempatan ini harus benar-benar mematuhi seperangkat pedoman yang akan sulit untuk ditegakkan atau diuji.

## Masalah perfoma

Penghalang yang signifikan dari penggunaan domain adalah overhead. Menggunakan node's benchmark http bawaan, `http_simple.js`, tanpa domain yang dapat ditanganinya 22.000 permintaan/detik. Sedangkan jika dijalankan dengan `NODE_USE_DOMAINS=1` itu jumlahnya turun menjadi di bawah 17.000 permintaan/detik. Dalam hal ini hanya ada satu domain global. Jika kita mengedit benchmark maka http request callback membuat performa instans domain baru turun lebih jauh ke 15.000 permintaan/detik.

Meskipun ini mungkin tidak akan memengaruhi server yang hanya melayani beberapa ratus atau bahkan seribu permintaan per detik, jumlah overhead berbanding lurus dengan jumlah permintaan asinkron yang dibuat. Jadi jika satu koneksi perlu terhubung ke beberapa layanan lain, semuanya akan berkontribusi pada keseluruhan latensi pengiriman produk akhir ke klien.

Menggunakan `AsyncWrap` dan melacak berapa kali `init`/`pre`/`post`/`destroy` dipanggil dalam benchmark yang kami temukan bahwa jumlah semua peristiwa yang disebut lebih dari 170.000 kali per detik. Ini berarti bahkan menambahkan overhead 1 mikrodetik per panggilan untuk semua jenis pengaturan atau pembongkaran akan mengakibatkan hilangnya kinerja 17%. Memang, ini untuk yang dioptimalkan skenario tolok ukur, tetapi saya yakin ini menunjukkan perlunya a mekanisme seperti domain menjadi semurah mungkin untuk dijalankan.

## Melihat ke depan

Modul domain telah tidak digunakan lagi sejak Desember 2014, tetapi belum dihapus karena node tidak menawarkan fungsionalitas alternatif saat ini. Mulai dari tulisan ini ada pekerjaan yang sedang berlangsung membangun `AsyncWrap` API dan a proposal untuk Zona yang sedang disiapkan untuk TC39. Pada saat seperti itu ada yang cocok fungsi untuk menggantikan domain itu akan menjalani siklus penghentian penuh dan akhirnya akan dihapus dari inti.
