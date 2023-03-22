---
title: Backpressuring in Streams
layout: docs.hbs
---

# Backpressuring in Streams

Ada masalah umum yang terjadi selama penanganan data yang disebut [`backpressure`][] yang menggambarkan penumpukan data di belakang buffer selama transfer data. Ketika penerima transfer memiliki operasi yang kompleks, atau lebih lambat karena alasan apa pun, ada kecenderungan bagi data dari sumber masuk untuk menumpuk, seperti penyumbatan.

Untuk memecahkan masalah ini, harus ada sistem delegasi yang ada untuk memastikan aliran data yang lancar dari satu sumber ke sumber lain. Komunitas yang berbeda telah menyelesaikan masalah ini dengan cara yang unik untuk program mereka, pipa Unix dan soket TCP adalah contoh yang baik dari ini, dan sering kali disebut sebagai _flow control_. Dalam Node.js, streams telah menjadi solusi yang diadopsi.

Tujuan panduan ini adalah untuk menjelaskan secara lebih rinci apa itu backpressure, dan bagaimana streams menanganinya secara tepat dalam kode sumber Node.js. Bagian kedua dari panduan akan memperkenalkan praktik terbaik yang disarankan untuk memastikan kode aplikasi Anda aman dan dioptimalkan saat mengimplementasikan streams.

Kami berasumsi sedikit pengetahuan tentang definisi umum [`backpressure`][], [`Buffer`][], dan [`EventEmitters`][] dalam Node.js, serta beberapa pengalaman dengan [`Stream`][]. Jika Anda belum membaca dokumen tersebut, tidak ada salahnya untuk melihat dokumentasi API terlebih dahulu, karena ini akan membantu memperluas pemahaman Anda saat membaca panduan ini.

## Masalah Penanganan Data

Dalam sistem komputer, data ditransfer dari satu proses ke proses lain melalui pipa, soket, dan sinyal. Dalam Node.js, kami menemukan mekanisme serupa yang disebut [`Stream`][]. Streams sangat bagus! Mereka melakukan begitu banyak hal untuk Node.js dan hampir setiap bagian dari kode internal memanfaatkan modul tersebut. Sebagai pengembang, Anda lebih dari diharapkan untuk menggunakannya juga!

```javascript
const readline = require('readline');

// process.stdin and process.stdout are both instances of Streams.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Why should you use streams? ', (answer) => {
  console.log(`Maybe it's ${answer}, maybe it's because they are awesome! :)`);

  rl.close();
});
```

Contoh yang bagus tentang mengapa mekanisme backpressure yang diimplementasikan melalui streams adalah sebuah optimasi yang bagus dapat ditunjukkan dengan membandingkan alat sistem internal dari implementasi [`Stream`][] Node.js.

Dalam satu skenario, kami akan mengambil file besar (sekitar ~9gb) dan memampatkannya menggunakan alat yang sudah dikenal [`zip(1)`][].

```
zip The.Matrix.1080p.mkv
```

Meskipun itu akan memakan beberapa menit untuk menyelesaikannya, di shell lain kita dapat menjalankan skrip yang menggunakan modul Node.js [`zlib`][], yang membungkus alat kompresi lainnya, [`gzip(1)`][].

```javascript
const gzip = require('zlib').createGzip();
const fs = require('fs');

const inp = fs.createReadStream('The.Matrix.1080p.mkv');
const out = fs.createWriteStream('The.Matrix.1080p.mkv.gz');

inp.pipe(gzip).pipe(out);
```

Untuk menguji hasilnya, cobalah membuka setiap file yang terkompresi. File yang dikompresi oleh alat [`zip(1)`][] akan memberi tahu Anda bahwa file tersebut rusak, sedangkan kompresi yang selesai dengan menggunakan [`Stream`][] akan didekompresi tanpa kesalahan.

> Dalam contoh ini, kita menggunakan `.pipe()` untuk mendapatkan sumber data dari satu ujung ke ujung yang lain. Namun, perhatikan bahwa tidak ada penangan kesalahan yang benar yang terpasang. Jika sepotong data gagal diterima dengan benar, sumber `Readable` atau stream `gzip` tidak akan dihancurkan. [`pump`][] adalah alat utilitas yang akan menghancurkan semua stream dalam pipeline secara tepat jika salah satunya gagal atau ditutup, dan harus dimiliki dalam kasus ini!

[`pump`][] hanya diperlukan untuk Node.js 8.x atau versi sebelumnya, karena untuk Node.js 10.x atau versi yang lebih baru, [`pipeline`][] diperkenalkan untuk menggantikan [`pump`][]. Ini adalah metode modul untuk mengalirkan antara stream yang meneruskan kesalahan dan membersihkan dengan benar dan memberikan panggilan kembali ketika pipeline selesai.

Berikut adalah contoh penggunaan pipeline:

```javascript
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// Gunakan API pipeline untuk dengan mudah mengalirkan serangkaian stream
// bersama-sama dan mendapatkan pemberitahuan ketika pipa sepenuhnya selesai.
// Pipa untuk mengompresi file video yang mungkin sangat besar secara efisien menggunakan gzip:

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
```

Anda juga dapat memanggil [`promisify`][] pada pipeline untuk menggunakannya dengan `async` / `await`:

```javascript
const stream = require('stream');
const fs = require('fs');
const zlib = require('zlib');
const util = require('util');

const pipeline = util.promisify(stream.pipeline);

async function run() {
  try {
    await pipeline(
      fs.createReadStream('The.Matrix.1080p.mkv'),
      zlib.createGzip(),
      fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
    );
    console.log('Pipeline succeeded');
  } catch (err) {
    console.error('Pipeline failed', err);
  }
}
```

## Terlalu Banyak Data, Terlalu Cepat

Terlalu Banyak Data, Terlalu Cepat Terkadang sebuah stream [`Readable`][] memberikan data ke stream [`Writable`][] terlalu cepat - jauh lebih banyak daripada konsumen dapat tangani!

Ketika hal itu terjadi, konsumen akan mulai memasukkan semua potongan data ke dalam antrian untuk dikonsumsi nanti. Antrian penulisan akan semakin panjang, dan karena itu lebih banyak data harus disimpan di memori sampai seluruh proses selesai.

Menulis ke disk jauh lebih lambat daripada membaca dari disk, oleh karena itu, ketika kita mencoba mengompres file dan menuliskannya ke hard disk, backpressure akan terjadi karena disk tulis tidak akan mampu mengejar kecepatan dari pembacaan.

```javascript
// Secara diam-diam, stream sedang mengatakan: "whoa, whoa! tunggu dulu, ini terlalu banyak!"
// Data akan mulai menumpuk di sisi pembacaan dari buffer data ketika
// write mencoba mengejar arus data yang masuk.
inp.pipe(gzip).pipe(outputFile);
```

Ini sebab mengapa mekanisme backpressure sangat penting. Jika sistem backpressure tidak ada, proses akan menggunakan memori sistem Anda, mengurangi kecepatan proses lain dan memonopoli sebagian besar sistem Anda sampai selesai.

Hal ini mengakibatkan beberapa hal berikut:

* Memperlambat semua proses saat ini
* Pemulung sampah yang sangat terbebani
* Kekurangan memori

Pada contoh-contoh berikut kita akan menghapus [return value][] dari fungsi `.write()` dan mengubahnya menjadi `true`, yang secara efektif menonaktifkan dukungan backpressure di inti Node.js. Dalam setiap referensi ke binary yang dimodifikasi, kita berbicara tentang menjalankan binary `node` tanpa baris `return ret;`, dan sebagai gantinya dengan `return true;` yang diganti.

## Beban Berlebih pada Pengumpulan Sampah

Mari kita lihat benchmark singkat. Menggunakan contoh yang sama seperti di atas, kami melakukan beberapa percobaan waktu untuk mendapatkan waktu median untuk kedua binary.

```
   trial (#)  | `node` binary (ms) | modified `node` binary (ms)
=================================================================
      1       |      56924         |           55011
      2       |      52686         |           55869
      3       |      59479         |           54043
      4       |      54473         |           55229
      5       |      52933         |           59723
=================================================================
average time: |      55299         |           55975
```

Kedua proses tersebut memakan waktu sekitar satu menit untuk dijalankan, sehingga tidak terlalu banyak perbedaan antara keduanya, tetapi mari kita perhatikan lebih dekat untuk mengonfirmasi apakah kecurigaan kita benar. Kami menggunakan alat Linux [`dtrace`][] untuk mengevaluasi apa yang terjadi dengan pengumpul sampah V8.

Waktu pengukuran GC (pengumpul sampah) menunjukkan interval dari siklus lengkap dari satu kali sapuan yang dilakukan oleh pengumpul sampah:

```
approx. time (ms) | GC (ms) | modified GC (ms)
=================================================
          0       |    0    |      0
          1       |    0    |      0
         40       |    0    |      2
        170       |    3    |      1
        300       |    3    |      1

         *             *           *
         *             *           *
         *             *           *

      39000       |    6    |     26
      42000       |    6    |     21
      47000       |    5    |     32
      50000       |    8    |     28
      54000       |    6    |     35
```

Ketika kedua proses dimulai dengan sama dan tampaknya bekerja dengan GC pada tingkat yang sama, menjadi jelas bahwa setelah beberapa detik dengan sistem backpressure yang berfungsi dengan baik, beban GC disebar di selang waktu yang konsisten antara 4-8 milidetik hingga akhir transfer data.

Namun, ketika sistem backpressure tidak ada, pengumpulan sampah V8 mulai menurun. Binary normal memanggil GC sekitar **75** kali dalam satu menit, sedangkan binary yang dimodifikasi hanya memanggil sebanyak **36** kali.

Ini adalah utang yang lambat dan bertahap dari penggunaan memori yang semakin meningkat. Saat data ditransfer, tanpa adanya sistem backpressure, lebih banyak memori digunakan untuk setiap transfer chunk.

Semakin banyak memori yang dialokasikan, semakin banyak GC yang harus diatasi dalam satu sapuan. Semakin besar sapuan, semakin banyak GC yang perlu memutuskan apa yang dapat dibebaskan, dan pemindaian untuk pointer terlepas di ruang memori yang lebih besar akan menghabiskan lebih banyak daya komputasi.

## Kepenuhan Memori

Untuk menentukan konsumsi memori dari setiap binary, kami menggunakan `/usr/bin/time -lp sudo ./node ./backpressure-example/zlib.js` pada masing-masing proses.

Berikut adalah output dari binary normal:

```
Respecting the return value of .write()
=============================================
real        58.88
user        56.79
sys          8.79
  87810048  maximum resident set size
         0  average shared memory size
         0  average unshared data size
         0  average unshared stack size
     19427  page reclaims
      3134  page faults
         0  swaps
         5  block input operations
       194  block output operations
         0  messages sent
         0  messages received
         1  signals received
        12  voluntary context switches
    666037  involuntary context switches
```

Ukuran byte maksimum yang ditempati oleh memori virtual ternyata sekitar 87,81 mb.

Dan sekarang dengan mengubah [nilai kembali][] dari fungsi [`.write()`][], kami mendapatkan:

```
Without respecting the return value of .write():
==================================================
real        54.48
user        53.15
sys          7.43
1524965376  maximum resident set size
         0  average shared memory size
         0  average unshared data size
         0  average unshared stack size
    373617  page reclaims
      3139  page faults
         0  swaps
        18  block input operations
       199  block output operations
         0  messages sent
         0  messages received
         1  signals received
        25  voluntary context switches
    629566  involuntary context switches
```

Ukuran byte maksimum yang ditempati oleh memori virtual ternyata sekitar 1,52 gb.

Tanpa adanya stream yang menerapkan backpressure, terdapat perbedaan besar pada jumlah ruang memori yang dialokasikan - perbedaan margin yang sangat besar antara dua proses yang sama!

Eksperimen ini menunjukkan betapa mekanisme backpressure Node.js sangat dioptimalkan dan hemat biaya untuk sistem komputasi Anda. Sekarang, mari kita kupas bagaimana mekanisme ini bekerja!

## Bagaimana Backpressure Menyelesaikan Masalah Ini?

Ada berbagai fungsi untuk mentransfer data dari satu proses ke proses lainnya. Di Node.js, ada fungsi bawaan internal yang disebut [`.pipe()`][]. Ada juga [paket lainnya][] yang dapat Anda gunakan! Namun, pada level dasar dari proses ini, kita memiliki dua komponen terpisah: _sumber_ dari data dan _konsumer_.

Ketika [`.pipe()`][] dipanggil dari sumber, ini memberi sinyal ke konsumer bahwa ada data yang harus ditransfer. Fungsi pipe membantu mengatur penutupan backpressure yang sesuai untuk trigger acara.

Dalam Node.js, sumber datanya adalah aliran [`Readable`][] dan penerima datanya adalah aliran [`Writable`][] (keduanya dapat saling ditukar dengan aliran [`Duplex`][] atau aliran [`Transform`][], tetapi hal tersebut di luar cakupan panduan ini).

Waktu terpicunya backpressure dapat diperinci tepat pada nilai kembalian dari fungsi [`.write()`][] pada aliran [`Writable`][]. Tentunya, nilai kembalian ini ditentukan oleh beberapa kondisi.

Dalam setiap skenario di mana buffer data telah melebihi [`highWaterMark`][] atau antrian tulis sedang sibuk, [`.write()`][] akan mengembalikan `false`.

Ketika nilai `false` dikembalikan, sistem backpressure akan berjalan. Ini akan menangguhkan [`readable`][] stream masuk dari mengirimkan data apa pun dan menunggu hingga konsumer siap kembali. Begitu buffer data dikosongkan, sebuah acara [`drain`][] akan dipancarkan dan melanjutkan aliran data yang masuk.

Setelah antrian selesai, backpressure akan memungkinkan data dikirimkan lagi. Ruang di memori yang sedang digunakan akan membebaskan dirinya dan bersiap untuk batch data berikutnya.

Ini efektif memungkinkan jumlah memori yang tetap digunakan pada saat tertentu untuk fungsi [`.pipe()`][]. Tidak akan ada kebocoran memori, buffering tak terbatas, dan garbage collector hanya harus menangani satu area di memori!

Jadi, jika backpressure begitu penting, mengapa Anda (mungkin) belum pernah mendengarnya? Jawabannya sederhana: Node.js melakukan semua ini secara otomatis untuk Anda.

Itu sangat bagus! Tetapi juga tidak begitu bagus ketika kita mencoba memahami cara mengimplementasikan stream kustom kami sendiri.

> Pada kebanyakan mesin, ada ukuran byte yang menentukan kapan buffer penuh (yang akan berbeda-beda di mesin yang berbeda). Node.js memungkinkan Anda untuk menetapkan [`highWaterMark`][] kustom Anda sendiri, tetapi umumnya, nilai default diatur menjadi 16kb (16384, atau 16 untuk objectMode streams). Dalam situasi di mana Anda mungkin ingin menaikkan nilai tersebut, silakan lakukan dengan hati-hati!

## Siklus Hidup `.pipe()`

Untuk mencapai pemahaman yang lebih baik tentang backpressure, berikut adalah diagram alir tentang siklus aliran [`Readable`][] yang di-[pipe][] ke dalam aliran [`Writable`][]:

```
                                                     +===================+
                         x-->  Piping functions   +-->   src.pipe(dest)  |
                         x     are set up during     |===================|
                         x     the .pipe method.     |  Event callbacks  |
  +===============+      x                           |-------------------|
  |   Your Data   |      x     They exist outside    | .on('close', cb)  |
  +=======+=======+      x     the data flow, but    | .on('data', cb)   |
          |              x     importantly attach    | .on('drain', cb)  |
          |              x     events, and their     | .on('unpipe', cb) |
+---------v---------+    x     respective callbacks. | .on('error', cb)  |
|  Readable Stream  +----+                           | .on('finish', cb) |
+-^-------^-------^-+    |                           | .on('end', cb)    |
  ^       |       ^      |                           +-------------------+
  |       |       |      |
  |       ^       |      |
  ^       ^       ^      |    +-------------------+         +=================+
  ^       |       ^      +---->  Writable Stream  +--------->  .write(chunk)  |
  |       |       |           +-------------------+         +=======+=========+
  |       |       |                                                 |
  |       ^       |                              +------------------v---------+
  ^       |       +-> if (!chunk)                |    Is this chunk too big?  |
  ^       |       |     emit .end();             |    Is the queue busy?      |
  |       |       +-> else                       +-------+----------------+---+
  |       ^       |     emit .write();                   |                |
  |       ^       ^                                   +--v---+        +---v---+
  |       |       ^-----------------------------------<  No  |        |  Yes  |
  ^       |                                           +------+        +---v---+
  ^       |                                                               |
  |       ^               emit .pause();          +=================+     |
  |       ^---------------^-----------------------+  return false;  <-----+---+
  |                                               +=================+         |
  |                                                                           |
  ^            when queue is empty     +============+                         |
  ^------------^-----------------------<  Buffering |                         |
               |                       |============|                         |
               +> emit .drain();       |  ^Buffer^  |                         |
               +> emit .resume();      +------------+                         |
                                       |  ^Buffer^  |                         |
                                       +------------+   add chunk to queue    |
                                       |            <---^---------------------<
                                       +============+
```

> Jika Anda mengatur pipeline untuk menggabungkan beberapa stream untuk memanipulasi data Anda, kemungkinan besar Anda akan mengimplementasikan [`Transform`][] stream.

Dalam hal ini, keluaran dari [`Readable'][] stream akan masuk ke dalam [`Transform`][] stream dan akan dipipa ke dalam [`Writable`][] stream.

```javascript
Readable.pipe(Transformable).pipe(Writable);
```

Tekanan balik akan diterapkan secara otomatis, tetapi perlu diingat bahwa `highWaterMark` masuk dan keluar dari aliran [`Transform`][] dapat dimanipulasi dan akan mempengaruhi sistem tekanan balik.

## Pedoman Tekanan Balik

Sejak [Node.js v0.10][], kelas [`Stream`][] telah menawarkan kemampuan untuk memodifikasi perilaku [`.read()`][] atau [`.write()`][] dengan menggunakan versi garis bawah dari fungsi masing-masing ([`._read()`][] dan [`._write()`][]).

Ada panduan yang terdokumentasi untuk [mengimplementasikan aliran Readable][] dan [mengimplementasikan aliran Writable][]. Kami akan mengasumsikan bahwa Anda telah membacanya, dan bagian selanjutnya akan membahas lebih dalam sedikit.

## Aturan yang Harus Dipatuhi Saat Menerapkan Aliran Khusus

Aturan emas dari aliran adalah **selalu menghormati tekanan balik**. Apa yang dianggap sebagai praktik terbaik adalah praktik non-inkonsisten. Selama Anda berhati-hati untuk menghindari perilaku yang bertentangan dengan dukungan tekanan balik internal, Anda dapat yakin bahwa Anda mengikuti praktik yang baik.

Secara umum,

1. Jangan pernah melakukan `.push()` jika Anda tidak diminta.
2. Jangan pernah memanggil `.write()` setelah mengembalikan nilai false tetapi tunggu 'drain' sebagai gantinya.
3. Aliran berubah antara versi Node.js yang berbeda, dan pustaka yang Anda gunakan. Berhati-hatilah dan uji segala sesuatu.

> Dalam hal poin 3, paket yang sangat berguna untuk membangun aliran browser adalah [`readable-stream`][]. Rodd Vagg telah menulis [blog post yang bagus][] yang menjelaskan kegunaan pustaka ini. Singkatnya, ini menyediakan jenis penurunan tingkat yang terautomatisasi untuk aliran [`Readable`][] stream, dan mendukung versi browser dan Node.js yang lebih lama.

## Aturan yang Khusus untuk Aliran Writable

Sejauh ini, kita telah melihat bagaimana [`.write()`][] mempengaruhi backpressure dan telah berfokus pada stream [`Writable`][]. Karena fungsionalitas Node.js, secara teknis data mengalir dari hulu [`Readable`][] ke hilir [`Writable`][]. Namun, seperti yang dapat kita amati pada setiap transmisi data, materi, atau energi, sumber sama pentingnya dengan tujuan akhir dan stream [`Readable`][] sangat penting dalam bagaimana backpressure diatasi.

Kedua proses ini saling bergantung untuk berkomunikasi dengan efektif. Jika stream [`Readable`][] mengabaikan permintaan stream [`Writable`][] untuk berhenti mengirimkan data, hal tersebut sama sulitnya dengan ketika nilai kembalian dari [`.write()`][] tidak benar.

Oleh karena itu, selain menghormati nilai kembalian dari [`.write()`][], kita juga harus menghormati nilai kembalian dari [`.push()`][] yang digunakan dalam metode [`._read()`][]. Jika [`.push()`][] mengembalikan nilai `false`, maka stream akan berhenti membaca dari sumber. Jika tidak, stream akan berlanjut tanpa jeda.

Selain itu, dari luar aliran kustom, ada risiko mengabaikan backpressure. Dalam contoh kebalikannya dari praktik baik, kode aplikasi memaksa data masuk setiap kali tersedia (ditandai oleh \['data' event\]\[\]):

```javascript
// Ini masalah besar karena sepenuhnya mengabaikan nilai kembalian dari push
// yang mungkin menjadi sinyal backpressure dari aliran tujuan!
class MyReadable extends Readable {
  _read(size) {
    let chunk;
    while (null !== (chunk = getNextChunk())) {
      this.push(chunk);
    }
  }
}
```

Selain itu, dari luar aliran kustom, ada kesalahan dalam mengabaikan backpressure. Dalam contoh kontraposisi dari praktik yang baik, kode aplikasi memaksa data untuk dilewatkan setiap kali tersedia (diisyaratkan oleh peristiwa [`'data'`][]:

```javascript
// Ini mengabaikan mekanisme backpressure yang telah ditetapkan oleh Node.js,
// dan tanpa syarat mendorong data, terlepas apakah
// aliran tujuan siap atau tidak.
readable.on('data', (data) =>
  writable.write(data)
);
```

Berikut adalah contoh penggunaan [`.push()`][] dengan sebuah Readable stream.

```javascript
const { Readable } = require('stream');

// Membuat Readable stream kustom
const myReadableStream = new Readable({
  objectMode: true,
  read(size) {
   // Memasukkan beberapa data ke dalam stream
   this.push({ message: 'Hello, world!' });
   this.push(null); // Menandai akhir dari stream
  }
});

// Mengkonsumsi stream
myReadableStream.on('data', (chunk) => {
  console.log(chunk);
});

// Output:
// { message: 'Hello, world!' }
```
Dalam contoh ini, kita membuat sebuah Readable stream kustom yang memasukkan sebuah objek tunggal ke dalam stream menggunakan [`.push()`][]. Metode [`._read()`][] dipanggil ketika stream siap untuk mengkonsumsi data, dan dalam hal ini, kita langsung memasukkan beberapa data ke dalam stream dan menandai akhir dari stream dengan memasukkan null.

Kami kemudian mengkonsumsi aliran dengan mendengarkan acara 'data' dan mencatat setiap potongan data yang didorong ke aliran. Dalam hal ini, kami hanya mendorong satu bagian data ke aliran, jadi kami hanya melihat satu pesan log.

## Aturan khusus untuk Aliran yang Dapat Ditulis

Ingatlah bahwa [`.write()`][] dapat mengembalikan nilai true atau false tergantung pada beberapa kondisi. Untungnya bagi kita, ketika membangun aliran [`Writable`][] sendiri, [`mesin keadaan aliran`][] akan menangani panggilan balik kita dan menentukan kapan harus menangani backpressure dan mengoptimalkan aliran data untuk kita.

Namun, ketika kita ingin menggunakan sebuah [`Writable`][] secara langsung, kita harus menghormati nilai kembalian [`.write()`][] dan memperhatikan kondisi-kondisi ini dengan cermat:

* Jika antrian tulis sedang sibuk, [`.write()`][] akan mengembalikan false.
* Jika potongan data terlalu besar, [`.write()`][] akan mengembalikan false (batasnya ditandai oleh variabel [`highWaterMark`][]).

<!-- eslint-disable indent -->
```javascript
// This writable is invalid because of the async nature of JavaScript callbacks.
// Without a return statement for each callback prior to the last,
// there is a great chance multiple callbacks will be called.
class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0)
      callback();
    else if (chunk.toString().indexOf('b') >= 0)
      callback();
    callback();
  }
}

// The proper way to write this would be:
    if (chunk.contains('a'))
      return callback();
    if (chunk.contains('b'))
      return callback();
    callback();
```

Ada juga beberapa hal yang perlu diperhatikan saat mengimplementasikan [`._writev()`][]. Fungsi ini terkait dengan [`.cork()`][], tetapi ada kesalahan umum saat menulis:

```javascript
// Menggunakan .uncork() dua kali di sini membuat dua panggilan pada lapisan C++,
// sehingga teknik cork/uncork menjadi tidak berguna.
ws.cork();
ws.write('hello ');
ws.write('world ');
ws.uncork();

ws.cork();
ws.write('from ');
ws.write('Matteo');
ws.uncork();

// Cara yang benar untuk menulisnya adalah dengan menggunakan process.nextTick(),
// yang akan dipanggil pada event loop berikutnya.
ws.cork();
ws.write('hello ');
ws.write('world ');
process.nextTick(doUncork, ws);

ws.cork();
ws.write('from ');
ws.write('Matteo');
process.nextTick(doUncork, ws);

// Sebagai fungsi global.
function doUncork(stream) {
  stream.uncork();
}
```

[`.cork()`][] dapat dipanggil sebanyak yang kita inginkan, kita hanya perlu berhati-hati untuk memanggil [`.uncork()`][] sebanyak jumlah yang sama untuk membuatnya mengalir kembali.

## Kesimpulan

Stream adalah modul yang sering digunakan di Node.js. Mereka penting untuk struktur internal, dan bagi pengembang, untuk memperluas dan menghubungkan antar ekosistem modul Node.js.

Semoga sekarang Anda dapat menyelesaikan masalah, mengkodekan dengan aman aliran [`Writable`][] dan [`Readable`][] dengan memperhatikan tekanan balik, dan membagikan pengetahuan Anda dengan rekan kerja dan teman-teman.

Pastikan untuk membaca lebih lanjut tentang [`Stream`][] untuk fungsi API lainnya yang dapat membantu meningkatkan kemampuan streaming Anda saat membangun aplikasi dengan Node.js.

[`Stream`]: https://nodejs.org/api/stream.html
[`Buffer`]: https://nodejs.org/api/buffer.html
[`EventEmitters`]: https://nodejs.org/api/events.html
[`Writable`]: https://nodejs.org/api/stream.html#stream_writable_streams
[`Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`Duplex`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`Transform`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`zlib`]: https://nodejs.org/api/zlib.html
[`drain`]: https://nodejs.org/api/stream.html#stream_event_drain
[`'data'`]: https://nodejs.org/api/stream.html#stream_event_data
[`.read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size
[`.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[`._read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size_1
[`._write()`]: https://nodejs.org/docs/latest/api/stream.html#stream_writable_write_chunk_encoding_callback_1
[`._writev()`]: https://nodejs.org/api/stream.html#stream_writable_writev_chunks_callback
[`.cork()`]: https://nodejs.org/api/stream.html#stream_writable_cork
[`.uncork()`]: https://nodejs.org/api/stream.html#stream_writable_uncork

[`.push()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_push_chunk_encoding

[mengimplementasikan aliran Writable]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_writable_stream
[mengimplementasikan aliran Readable]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_readable_stream

[paket lainnya]: https://github.com/sindresorhus/awesome-nodejs#streams
[`backpressure`]: https://en.wikipedia.org/wiki/Backpressure_routing
[Node.js v0.10]: https://nodejs.org/docs/v0.10.0/
[`highWaterMark`]: https://nodejs.org/api/stream.html#stream_buffering
[return value]: https://github.com/nodejs/node/blob/55c42bc6e5602e5a47fb774009cfe9289cb88e71/lib/_stream_writable.js#L239
[nilai kembali]: https://github.com/nodejs/node/blob/55c42bc6e5602e5a47fb774009cfe9289cb88e71/lib/_stream_writable.js#L239

[`readable-stream`]: https://github.com/nodejs/readable-stream
[blog post yang bagus]: https://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html

[`dtrace`]: http://dtrace.org/blogs/about/
[`zip(1)`]: https://linux.die.net/man/1/zip
[`gzip(1)`]: https://linux.die.net/man/1/gzip
[`mesin keadaan aliran`]: https://en.wikipedia.org/wiki/Finite-state_machine

[`.pipe()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[pipe]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[`pump`]: https://github.com/mafintosh/pump
[`pipeline`]: https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback
[`promisify`]: https://nodejs.org/api/util.html#util_util_promisify_original
