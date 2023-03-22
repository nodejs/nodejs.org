---
title: Loop Peristiwa Node.js, Pengatur Waktu, dan process.nextTick()
layout: docs.hbs
---

# Loop Peristiwa Node.js, Timer, dan `process.nextTick()`

## Apa itu Loop Peristiwa?

Loop peristiwa inilah yang memungkinkan Node.js melakukan I/O non-pemblokiran operasi — terlepas dari kenyataan bahwa JavaScript adalah single-threaded — oleh operasi pembongkaran ke kernel sistem bila memungkinkan.

Karena kebanyakan kernel modern adalah multi-threaded, mereka dapat menangani multiple operasi yang dijalankan di latar belakang. Ketika salah satu dari operasi ini selesai, kernel memberi tahu Node.js sehingga panggilan balik yang sesuai dapat ditambahkan ke antrean **poll** untuk akhirnya dieksekusi. Kami akan menjelaskan ini secara lebih rinci nanti dalam topik ini.

## Loop Peristiwa Dijelaskan

Ketika Node.js dimulai, itu menginisialisasi loop acara, memproses skrip input yang disediakan (atau masuk ke [REPL][], yang tidak tercakup dalam dokumen ini) yang dapat membuat panggilan API asinkron, pengatur waktu jadwal, atau panggilan `process.nextTick()`, lalu mulai memproses loop peristiwa.

Diagram berikut menunjukkan ikhtisar yang disederhanakan dari loop acara urutan operasi.

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

> Setiap kotak akan disebut sebagai "fase" dari loop peristiwa.

Setiap fase memiliki antrian panggilan balik FIFO untuk dieksekusi. Sedangkan setiap fase adalah khusus dengan caranya sendiri, umumnya, ketika loop acara memasuki yang diberikan fase, itu akan melakukan operasi apa pun yang spesifik untuk fase itu, lalu jalankan panggilan balik dalam antrian fase itu sampai antrian selesai habis atau jumlah maksimum panggilan balik telah dieksekusi. Ketika antrian telah habis atau batas panggilan balik tercapai, acara loop akan pindah ke fase berikutnya, dan seterusnya.

Karena salah satu dari operasi ini dapat dijadwalkan _lebih_ operasi dan baru peristiwa yang diproses dalam fase **poll** diantrekan oleh kernel, poll acara dapat diantrekan saat acara pemungutan suara sedang diproses. Sebagai hasilnya, panggilan balik yang berjalan lama dapat memungkinkan fase polling berjalan banyak lebih lama dari ambang timer. Lihat [**timers**](#timers) dan [**poll**](#poll) untuk detail selengkapnya.

> Ada sedikit perbedaan antara Windows dan Implementasi Unix/Linux, tapi itu tidak penting untuk ini demonstrasi. Bagian terpenting ada di sini. Sebenarnya ada tujuh atau delapan langkah, tapi yang kami pedulikan — yang Node.js sebenarnya menggunakan - apakah yang di atas.

## Ikhtisar Fase

* **timer**: fase ini mengeksekusi callback yang dijadwalkan oleh `setTimeout()` dan `setInterval()`.
* **panggilan balik yang tertunda**: mengeksekusi panggilan balik I/O yang ditangguhkan ke loop berikutnya pengulangan.
* **idle, prepare**: hanya digunakan secara internal.
* **jajak pendapat**: mengambil peristiwa I/O baru; jalankan panggilan balik terkait I/O (hampir) semua dengan pengecualian close callback, yang dijadwalkan oleh timer, dan `setImmediate()`); node akan memblokir di sini bila perlu.
* **check**: callback `setImmediate()` dipanggil di sini.
* **close callback**: beberapa close callback, mis. `socket.on('tutup', ...)`.

Di antara setiap putaran acara, Node.js memeriksa apakah itu menunggu setiap I/O atau penghitung waktu asinkron dan mati dengan bersih jika tidak ada setiap.

## Fase secara Detail

### pengatur waktu

Timer menentukan **threshold** _setelah itu_ callback yang disediakan _mungkin dieksekusi_ daripada **waktu yang tepat** yang _diinginkan seseorang dieksekusi_. Panggilan balik pengatur waktu akan berjalan sedini mungkin dijadwalkan setelah jumlah waktu yang ditentukan telah berlalu; namun, Penjadwalan Sistem Operasi atau menjalankan panggilan balik lainnya mungkin tertunda mereka.

> Secara teknis, [**poll** phase](#poll) mengontrol kapan timer dijalankan.

Misalnya, Anda menjadwalkan waktu tunggu untuk dieksekusi setelah 100 ms ambang batas, maka skrip Anda mulai membaca file secara tidak sinkron yang membutuhkan waktu 95 ms:

```js
const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

Saat loop peristiwa memasuki fase **poll**, antriannya kosong (`fs.readFile()` belum selesai), sehingga akan menunggu jumlah ms tersisa sampai ambang timer tercepat tercapai. Sementara itu menunggu 95 ms berlalu, `fs.readFile()` selesai membaca file dan nya panggilan balik yang membutuhkan waktu 10 md untuk diselesaikan ditambahkan ke antrean **jajak pendapat** dan dieksekusi. Saat panggilan balik selesai, tidak ada lagi panggilan balik di antrian, sehingga loop acara akan melihat bahwa ambang batas paling cepat timer telah tercapai lalu bungkus kembali ke fase **timers** untuk dieksekusi panggilan balik pengatur waktu. Dalam contoh ini, Anda akan melihat bahwa penundaan total antara pengatur waktu yang dijadwalkan dan panggilan baliknya yang dieksekusi akan menjadi 105ms.

> Untuk mencegah fase **poll** kelaparan loop acara, [libuv][] (library C yang mengimplementasikan Node.js loop acara dan semua perilaku asinkron platform) juga memiliki hard maximum (tergantung sistem) sebelum berhenti polling untuk lebih banyak acara.

### panggilan balik tertunda

Fase ini mengeksekusi panggilan balik untuk beberapa operasi sistem seperti tipe dari kesalahan TCP. Misalnya jika soket TCP menerima `ECONNREFUSED` ketika mencoba menyambung, beberapa sistem \*nix ingin menunggu untuk melaporkan kesalahan. Ini akan diantrekan untuk dieksekusi dalam fase **panggilan balik tertunda**.

### polling

Fase **jajak pendapat** memiliki dua fungsi utama:

1. Menghitung berapa lama harus memblokir dan polling untuk I/O, lalu
2. Memproses peristiwa dalam antrean **jajak pendapat**.

Saat loop peristiwa memasuki fase **poll** _dan tidak ada timer dijadwalkan_, salah satu dari dua hal akan terjadi:

* _Jika antrean **poll** **tidak kosong**_, loop peristiwa akan berulang melalui antrian panggilan baliknya yang mengeksekusinya secara sinkron sampai baik antrian telah habis, atau batas keras yang bergantung pada sistem tercapai.

* _Jika antrean **jajak pendapat** **kosong**_, salah satu dari dua hal lagi akan terjadi:
  * Jika skrip telah dijadwalkan oleh `setImmediate()`, loop acara akan mengakhiri fase **poll** dan melanjutkan ke fase **check** ke jalankan skrip terjadwal tersebut.

  * Jika skrip **belum** dijadwalkan oleh `setImmediate()`, maka loop acara akan menunggu panggilan balik ditambahkan ke antrian, lalu mengeksekusi mereka segera.

Setelah antrean **poll** kosong, loop acara akan memeriksa timer _yang batas waktunya telah tercapai_. Jika satu atau lebih pengatur waktu adalah siap, loop acara akan kembali ke fase **timers** untuk dieksekusi callback pengatur waktu itu.

### memeriksa

Fase ini memungkinkan seseorang untuk mengeksekusi panggilan balik segera setelah fase **jajak pendapat** telah selesai. Jika fase **jajak pendapat** menjadi tidak aktif dan skrip telah diantrekan dengan `setImmediate()`, loop acara mungkin lanjutkan ke fase **periksa** daripada menunggu.

`setImmediate()` sebenarnya adalah timer khusus yang berjalan secara terpisah fase loop acara. Ini menggunakan API libuv yang menjadwalkan panggilan balik ke jalankan setelah fase **jajak pendapat** selesai.

Umumnya, saat kode dieksekusi, loop acara pada akhirnya akan mengenai fase **jajak pendapat** di mana ia akan menunggu koneksi masuk, permintaan, dll. Namun, jika panggilan balik telah dijadwalkan dengan `setImmediate()` dan fase **poll** menjadi idle, akan berakhir dan berlanjut ke **periksa** fase daripada menunggu acara **jajak pendapat**.

### tutup panggilan balik

Jika soket atau pegangan ditutup tiba-tiba (misalnya `socket.destroy()`), Acara `'close'` akan dipancarkan dalam fase ini. Kalau tidak, itu akan menjadi dipancarkan melalui `process.nextTick()`.

## `setImmediate()` vs `setTimeout()`

`setImmediate()` dan `setTimeout()` serupa, tetapi berperilaku berbeda cara tergantung pada saat mereka dipanggil.

* `setImmediate()` dirancang untuk mengeksekusi skrip setelah fase **jajak pendapat** saat ini selesai.
* `setTimeout()` menjadwalkan skrip untuk dijalankan setelah ambang batas minimum di ms telah berlalu.

Urutan di mana penghitung waktu dijalankan akan bervariasi tergantung pada konteks di mana mereka dipanggil. Jika keduanya dipanggil dari dalam modul utama, maka waktu akan terikat oleh kinerja proses (yang dapat dipengaruhi oleh aplikasi lain yang berjalan di mesin).

Misalnya, jika kita menjalankan skrip berikut yang tidak berada dalam I/O siklus (yaitu modul utama), urutan di mana dua timer adalah dieksekusi adalah non-deterministik, karena terikat oleh kinerja proses:

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

```
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```

Namun, jika Anda memindahkan dua panggilan tersebut dalam siklus I/O, panggilan balik segera selalu dieksekusi terlebih dahulu:

```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

```
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

Keuntungan utama menggunakan `setImmediate()` daripada `setTimeout()` adalah `setImmediate()` akan selalu dieksekusi sebelum timer apa pun jika dijadwalkan dalam siklus I/O, terlepas dari berapa banyak timer yang ada.

## `process.nextTick()`

### Memahami `process.nextTick()`

Anda mungkin telah memperhatikan bahwa `process.nextTick()` tidak ditampilkan di diagram, meskipun itu adalah bagian dari API asinkron. Hal ini karena `process.nextTick()` secara teknis bukan bagian dari loop peristiwa. Alih-alih, `nextTickQueue` akan diproses setelah operasi saat ini selesai, terlepas dari fase loop acara saat ini. Di Sini, sebuah *operasi* didefinisikan sebagai transisi dari penangan C/C++ yang mendasarinya, dan penanganan JavaScript yang perlu dieksekusi.

Melihat kembali diagram kita, setiap kali Anda memanggil `process.nextTick()` dalam sebuah fase tertentu, semua panggilan balik yang diteruskan ke `process.nextTick()` akan menjadi diselesaikan sebelum loop acara berlanjut. Ini bisa membuat beberapa hal buruk situasi karena ** memungkinkan Anda untuk "melaparkan" I/O Anda dengan membuat panggilan `process.nextTick()` rekursif*** yang mencegah loop peristiwa dari mencapai fase **jajak pendapat**.

### Mengapa itu diizinkan?

Mengapa sesuatu seperti ini dimasukkan dalam Node.js? Sebagiannya adalah filosofi desain di mana API harus selalu asinkron bahkan di mana pun itu tidak harus. Ambil cuplikan kode ini misalnya:

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(
      callback,
      new TypeError('argument should be string')
    );
}
```

Cuplikan melakukan pemeriksaan argumen dan jika tidak benar, itu akan lolos kesalahan pada panggilan balik. API diperbarui cukup baru untuk memungkinkan meneruskan argumen ke `process.nextTick()` yang memungkinkannya mengambil apa pun argumen yang diteruskan setelah panggilan balik untuk disebarkan sebagai argumen untuk panggilan balik sehingga Anda tidak perlu menumpuk fungsi.

Apa yang kami lakukan adalah meneruskan kesalahan kembali ke pengguna tetapi hanya *setelah* kami telah mengizinkan sisa kode pengguna untuk dieksekusi. Dengan menggunakan `process.nextTick()` kami menjamin bahwa `apiCall()` selalu berjalan panggilan balik *setelah* sisa kode pengguna dan *sebelum* loop acara diperbolehkan untuk dilanjutkan. Untuk mencapai ini, tumpukan panggilan JS diizinkan untuk bersantai kemudian segera jalankan panggilan balik yang disediakan yang memungkinkan a orang untuk membuat panggilan rekursif ke `process.nextTick()` tanpa mencapai a `RangeError: Ukuran tumpukan panggilan maksimum terlampaui dari v8`.

Filosofi ini dapat menyebabkan beberapa situasi yang berpotensi bermasalah. Ambil cuplikan ini misalnya:

```js
let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) {
  callback();
}

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall hasn't completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;
```

Pengguna mendefinisikan `someAsyncApiCall()` untuk memiliki tanda tangan asinkron, tetapi sebenarnya beroperasi secara sinkron. Saat dipanggil, panggilan balik disediakan untuk `someAsyncApiCall()` dipanggil dalam fase yang sama dari loop acara karena `someAsyncApiCall()` sebenarnya tidak melakukan apa-apa secara tidak sinkron. Akibatnya, callback mencoba mereferensikan `bar` even meskipun mungkin belum memiliki variabel itu dalam cakupannya, karena skripnya belum dapat berjalan sampai selesai.

Dengan menempatkan callback dalam `process.nextTick()`, skrip masih memiliki kemampuan untuk menjalankan sampai selesai, memungkinkan semua variabel, fungsi, dll., untuk diinisialisasi sebelum panggilan balik dipanggil. Ini juga memiliki keuntungan dari tidak membiarkan loop acara berlanjut. Itu mungkin berguna bagi pengguna untuk diperingatkan akan kesalahan sebelum loop acara diperbolehkan untuk melanjutkan. Berikut adalah contoh sebelumnya menggunakan `process.nextTick()`:

```js
let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;
```

Berikut contoh dunia nyata lainnya:

```js
const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
```

Ketika hanya sebuah port yang dilewati, port tersebut langsung terikat. Sehingga `'mendengarkan'` panggilan balik dapat segera dipanggil. Masalahnya adalah bahwa `.on('listening')` panggilan balik tidak akan disetel pada saat itu.

Untuk menyiasatinya, acara `'listening'` diantrekan di `nextTick()` untuk memungkinkan skrip berjalan hingga selesai. Ini memungkinkan pengguna untuk mengatur event handler yang mereka inginkan.

## `process.nextTick()` vs `setImmediate()`

Kami memiliki dua panggilan yang serupa sejauh menyangkut pengguna, tapi nama mereka membingungkan.

* `process.nextTick()` langsung aktif pada fase yang sama
* `setImmediate()` diaktifkan pada iterasi berikut atau 'centang' dari lingkaran acara

Intinya, nama harus ditukar. `process.nextTick()` mengaktifkan lebih banyak langsung dari `setImmediate()`, tetapi ini adalah artefak dari masa lalu yang tidak mungkin berubah. Membuat sakelar ini akan merusak banyak persentase paket di npm. Setiap hari lebih banyak modul baru sedang tambah, yang berarti setiap hari kita menunggu, lebih banyak potensi kerusakan terjadi. Meskipun membingungkan, namanya sendiri tidak akan berubah.

> Kami menyarankan pengembang menggunakan `setImmediate()` dalam semua kasus karena ini lebih mudah untuk dipikirkan.

## Mengapa menggunakan `process.nextTick()`?

Ada dua alasan utama:

1. Izinkan pengguna untuk menangani kesalahan, membersihkan sumber daya yang tidak diperlukan, atau mungkin coba permintaan lagi sebelum loop acara berlanjut.

2. Kadang-kadang perlu untuk mengizinkan panggilan balik berjalan setelah panggilan stack telah dibatalkan tetapi sebelum loop acara berlanjut.

Salah satu contohnya adalah agar sesuai dengan harapan pengguna. Contoh sederhana:

```js
const server = net.createServer();
server.on('connection', (conn) => {});

server.listen(8080);
server.on('listening', () => {});
```

Katakan bahwa `listen()` dijalankan di awal loop acara, tetapi mendengarkan panggilan balik ditempatkan di `setImmediate()`. Kecuali a nama host dilewatkan, pengikatan ke port akan segera terjadi. Untuk loop acara untuk melanjutkan, itu harus mencapai fase **jajak pendapat**, yang berarti ada kemungkinan bukan nol bahwa koneksi dapat diterima memungkinkan acara koneksi dipecat sebelum acara mendengarkan.

Contoh lain adalah mewarisi dari `EventEmitter` dan memancarkan acara dari dalam konstruktor:

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.emit('event');
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

Anda tidak dapat langsung memancarkan acara dari konstruktor karena skrip tidak akan diproses ke titik di mana pengguna memberikan panggilan balik ke acara itu. Jadi, di dalam konstruktor itu sendiri, Anda dapat menggunakan `process.nextTick()` untuk menyetel panggilan balik untuk memancarkan acara setelah konstruktor selesai, yang memberikan hasil yang diharapkan:

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    // use nextTick to emit the event once a handler is assigned
    process.nextTick(() => {
      this.emit('event');
    });
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

[libuv]: https://libuv.org/
[REPL]: https://nodejs.org/api/repl.html#repl_repl
