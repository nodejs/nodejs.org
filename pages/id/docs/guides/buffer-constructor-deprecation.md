---
title: Porting ke API Buffer.from() / Buffer.alloc()
layout: docs.hbs
---

# Porting ke `Buffer.from()`/`Buffer.alloc()` API

## Pratinjau

Panduan ini menjelaskan cara bermigrasi ke metode konstruktor `Buffer` yang aman. Migrasi memperbaiki peringatan penghentian berikut:

> Konstruktor Buffer() dan new Buffer() tidak direkomendasikan untuk digunakan karena masalah keamanan dan penggunaan. Mohon gunakan metode konstruksi Buffer.alloc(), Buffer.allocUnsafe(), atau Buffer.from() yang baru.

- [Varian 1: Hilangkan dukungan untuk Node.js 4.4.x dan 5.0.0 — 5.9.x](#varian-1) (*direkomendasikan*)
- [Varian 2: Gunakan polyfill](#variant-2)
- [Varian 3: Deteksi manual, dengan pengaman](#variant-3)

### Menemukan bit kode yang bermasalah menggunakan `grep`

Jalankan saja `grep -nrE '[^a-zA-Z](Lambat)?Buffer\s*\(' --exclude-dir node_modules`.

Ini akan menemukan semua tempat yang berpotensi tidak aman dalam kode Anda sendiri (dengan beberapa yang sangat tidak mungkin pengecualian).

### Menemukan bit kode yang bermasalah menggunakan Node.js 8

Jika Anda menggunakan Node.js 8.0.0 (yang direkomendasikan), Node.js memperlihatkan beberapa opsi yang membantu menemukan potongan kode yang relevan:

- `--trace-warnings` akan membuat Node.js menampilkan jejak tumpukan untuk peringatan ini dan peringatan lain yang dicetak oleh Node.js.
- `--trace-deprecation` melakukan hal yang sama, tetapi hanya untuk peringatan penghentian.
- `--pending-deprecation` akan menampilkan lebih banyak jenis peringatan penghentian. Secara khusus, ini akan menampilkan peringatan penghentian `Buffer()`, bahkan pada Node.js 8.

Anda dapat mengatur flag ini menggunakan variabel lingkungan:

```bash
$ export NODE_OPTIONS='--trace-warnings --pending-deprecation'
$ cat example.js
'use strict';
const foo = new Buffer('foo');
$ node example.js
(node:7147) [DEP0005] DeprecationWarning: The Buffer() and new Buffer() constructors are not recommended for use due to security and usability concerns. Please use the new Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() construction methods instead.
    at showFlaggedDeprecation (buffer.js:127:13)
    at new Buffer (buffer.js:148:3)
    at Object.<anonymous> (/path/to/example.js:2:13)
    [... more stack trace lines ...]
```

### Menemukan bit kode yang bermasalah menggunakan linter

Aturan ESLint [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor) atau [node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) juga menemukan panggilan ke `Buffer()` API yang tidak digunakan lagi. Aturan-aturan itu termasuk dalam beberapa preset.

Namun, ada kekurangannya, itu tidak selalu [bekerja dengan benar](https://github.com/chalker/safer-buffer#why-not-safe-buffer) saat `Buffer` ditimpa misalnya dengan polyfill, jadi disarankan adalah kombinasi dari ini dan beberapa metode lainnya dijelaskan di atas.

## <!--variant-1-->Varian 1: Hilangkan dukungan untuk Node.js 4.4.x dan 5.0.0 — 5.9.x

Ini adalah solusi yang direkomendasikan saat ini yang hanya menyiratkan overhead minimal.

Jalur rilis Node.js 5.x tidak didukung sejak Juli 2016, dan jalur rilis Node.js 4.x mencapai Akhir Masa Pakainya pada April 2018 (→ [Jadwal](https://github.com/nodejs/Release#Release_schedule)). Ini berarti bahwa versi Node.js ini *tidak* akan menerima pembaruan apa pun, bahkan jika ada masalah keamanan, jadi penggunaan jalur rilis ini harus dihindari, jika memungkinkan.

Apa yang akan Anda lakukan dalam kasus ini adalah mengonversi semua panggilan `New Buffer()` atau `Buffer()` untuk menggunakan `Buffer.alloc()` atau `Buffer.from()`, dengan cara berikut:

- Untuk `Buffer(number) baru`, ganti dengan `Buffer.alloc(number)`.
- Untuk `New Buffer(string)` (atau `new Buffer(string, encoding)`), ganti dengan `Buffer.from(string)` (atau `Buffer.from(string, encoding)`).
- Untuk semua kombinasi argumen lainnya (ini jauh lebih jarang), ganti juga `new Buffer(...arguments)` dengan `Buffer.from(...arguments)`.

Perhatikan bahwa `Buffer.alloc()` juga _lebih cepat_ pada versi Node.js saat ini daripada `new Buffer(size).fill(0)`, yang seharusnya Anda perlukan untuk memastikan zero-filling.

Mengaktifkan aturan ESLint [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor) atau [node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) direkomendasikan untuk menghindari penggunaan `Buffer` API yang tidak aman secara tidak sengaja.

Ada juga [JSCodeshift codemod](https://github.com/joyeecheung/node-dep-codemod#dep005) untuk memigrasikan konstruktor `Buffer` secara otomatis ke `Buffer.alloc()` atau `Buffer.from()`. Perhatikan bahwa saat ini hanya berfungsi dengan kasus di mana argumennya literal atau di mana konstruktor dipanggil dengan dua argumen.

_Jika saat ini Anda mendukung versi Node.js yang lebih lama dan menghentikan dukungan untuk mereka tidak mungkin, atau jika Anda mendukung cabang paket Anda yang lebih lama, pertimbangkan untuk menggunakan [Varian 2](#varian-2) atau [Varian 3](#varian-3) di cabang lama, jadi orang yang menggunakan cabang lama itu juga akan menerima perbaikan. Dengan begitu, Anda akan menghilangkan potensi masalah yang disebabkan oleh penggunaan `Buffer` API yang tidak dijaga dan pengguna Anda tidak akan melihat peringatan penghentian runtime saat menjalankan kode Anda di Node.js 10._

## <!--variant-2-->Variant 2: Gunakan polyfill

Ada tiga polyfill berbeda yang tersedia:

- **[safer-buffer](https://www.npmjs.com/package/safer-buffer)** adalah pengganti drop-in untuk seluruh `Buffer` API, yang akan _dilempar_ saat menggunakan `new Buffer()`.

  Anda akan mengambil langkah yang sama persis seperti pada [Varian 1](#varian-1), tetapi dengan polyfill `const Buffer = require('safer-buffer').Buffer` di semua file tempat Anda menggunakan `Buffer` API baru.

  Jangan gunakan API `new Buffer()` yang lama. Dalam file apa pun di mana baris di atas ditambahkan, menggunakan `new Buffer()` API lama akan _throw_.

- **[buffer-from](https://www.npmjs.com/package/buffer-from) dan/atau [buffer-alloc](https://www.npmjs.com/package/buffer-alloc)** adalah [ponyfills](https://ponyfill.com/) untuk masing-masing bagian dari `Buffer` API. Anda hanya perlu untuk menambahkan paket yang sesuai dengan API yang Anda gunakan.

  Anda akan mengimpor modul yang diperlukan dengan nama yang sesuai, mis. `const bufferFrom = require('buffer-from')` lalu gunakan itu sebagai ganti panggilan ke `Buffer baru()`, mis. `new Buffer('test')` menjadi `bufferFrom('test')`.

  Kelemahan dengan pendekatan ini adalah sedikit lebih banyak perubahan kode untuk dimigrasikan (seperti yang akan Anda lakukan menggunakan misalnya `Buffer.from()` dengan nama yang berbeda).

- **[safe-buffer](https://www.npmjs.com/package/safe-buffer)** juga merupakan pengganti drop-in untuk seluruh `Buffer` API, tetapi menggunakan `new Buffer()` akan tetap berfungsi seperti sebelumnya.

  Kelemahan dari pendekatan ini adalah Anda juga dapat menggunakan `new Buffer()` API . yang lebih lama dalam kode Anda, yang bermasalah karena dapat menyebabkan masalah dalam kode Anda, dan akan mulai memancarkan peringatan penghentian runtime dimulai dengan Node.js 10 ([baca selengkapnya di sini](https://github.com/chalker/safer-buffer#why-not-safe-buffer)).

Perhatikan bahwa dalam kedua kasus tersebut, Anda juga harus menghapus semua panggilan ke `Buffer` . yang lama API secara manual — hanya memasukkan `safe-buffer` tidak memperbaiki masalah dengan sendirinya, itu hanya menyediakan polyfill untuk API baru. Saya telah melihat orang-orang melakukan kesalahan itu.

Mengaktifkan aturan ESLint [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor) atau [node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) direkomendasikan.

_Jangan lupa untuk menghentikan penggunaan polyfill setelah Anda menghentikan dukungan untuk Node.js <4.5.0._

## <!--variant-3-->Varian 3 — Deteksi manual, dengan pengaman

Ini berguna jika Anda membuat instance `Buffer` hanya di beberapa tempat (mis. pembungkus di sekitar mereka.

### `Buffer(0)`

Kasus khusus untuk membuat buffer kosong ini dapat diganti dengan aman dengan `Buffer.concat([])`, yang mengembalikan hasil yang sama hingga ke Node.js 0.8.x.

### `Buffer(bukanNumber)`

Sebelum:

```js
const buf = new Buffer(notNumber, encoding);
```

Sesudah:

```js
let buf;
if (Buffer.from && Buffer.from !== Uint8Array.from) {
  buf = Buffer.from(notNumber, encoding);
} else {
  if (typeof notNumber === 'number') {
    throw new Error('The "size" argument must be not of type number.');
  }
  buf = new Buffer(notNumber, encoding);
}
```

`encoding` adalah opsional.

Perhatikan bahwa `typeof notNumber` sebelum `new Buffer()` diperlukan (untuk kasus ketika argumen `notNumber` tidak hard-coded) dan _tidak disebabkan oleh penghentian konstruktor `Buffer`_ — justru _why_ the Konstruktor `Buffer` tidak digunakan lagi. Paket ekosistem yang tidak memiliki jenis pemeriksaan ini menyebabkan banyak masalah keamanan — situasi ketika input pengguna yang tidak bersih dapat berakhir di `Buffer(arg)` create masalah mulai dari DoS hingga membocorkan informasi sensitif ke penyerang dari memori proses.

Ketika argumen `notNumber` di-hardcode (misalnya literal `"abc"` atau `[0,1,2]`), pemeriksaan `typeof` dapat dihilangkan.

Juga, perhatikan bahwa menggunakan TypeScript tidak memperbaiki masalah ini untuk Anda — ketika libs ditulis dalam `TypeScript` digunakan dari JS, atau ketika input pengguna berakhir di sana — ia berperilaku persis seperti JS murni, seperti semua jenis pemeriksaan hanya waktu terjemahan dan tidak ada dalam kode JS aktual yang TS mengkompilasi ke.

### `Buffer(number)`

Untuk dukungan Node.js 0.10.x (dan di bawah):

```js
let buf;
if (Buffer.alloc) {
  buf = Buffer.alloc(number);
} else {
  buf = new Buffer(number);
  buf.fill(0);
}
```

Jika tidak (Node.js 0.12.x):

```js
const buf = Buffer.alloc ? Buffer.alloc(number) : new Buffer(number).fill(0);
```

## Tentang `Buffer.allocUnsafe()`

Berhati-hatilah saat menggunakan `Buffer.allocUnsafe()`:

- Jangan gunakan jika Anda tidak memiliki alasan yang baik untuk
  - misalnya Anda mungkin tidak akan pernah melihat perbedaan kinerja untuk buffer kecil, pada kenyataannya, itu mungkin lebih cepat dengan `Buffer.alloc()`,
  - jika kode Anda tidak berada di jalur kode panas — Anda mungkin juga tidak akan melihat perbedaan,
  - perlu diingat bahwa pengisian nol meminimalkan potensi risiko.
- Jika Anda menggunakannya, pastikan Anda tidak pernah mengembalikan buffer dalam keadaan terisi sebagian,
  - jika Anda menulisnya secara berurutan — selalu potong ke panjang tulisan yang sebenarnya

Kesalahan dalam menangani buffer yang dialokasikan dengan `Buffer.allocUnsafe()` dapat mengakibatkan berbagai masalah, berkisar dari perilaku kode Anda yang tidak terdefinisi hingga data sensitif (input pengguna, kata sandi, sertifikat) bocor ke penyerang jarak jauh.

_Perhatikan bahwa hal yang sama berlaku untuk penggunaan `new Buffer()` tanpa pengisian nol, tergantung pada Node.js versi (dan kurangnya pemeriksaan tipe juga menambahkan DoS ke daftar potensi masalah)._

## Pertanyaan Umum (FAQ)

### <!--design-flaws-->Apa yang salah dengan konstruktor `Buffer`?

Konstruktor `Buffer` dapat digunakan untuk membuat buffer dengan berbagai cara:

- `New Buffer(42)` membuat `Buffer` sebesar 42 byte. Sebelum Node.js 8, buffer ini berisi *memori sewenang-wenang* untuk alasan kinerja, yang dapat mencakup apa saja mulai dari kode sumber program untuk kata sandi dan kunci enkripsi.
- `new Buffer('abc')` membuat `Buffer` yang berisi versi UTF-8-encoded string '`'abc'`. Argumen kedua dapat menentukan pengkodean lain: misalnya,`new Buffer(string, 'base64')` dapat digunakan untuk mengonversi string Base64 menjadi yang asli urutan byte yang diwakilinya.
- Ada beberapa kombinasi argumen lainnya.

Ini berarti bahwa dalam kode seperti `var buffer = new Buffer(foo);`, *tidak mungkin untuk mengetahuinya apa sebenarnya isi buffer yang dihasilkan* tanpa mengetahui jenis `foo`.

Terkadang, nilai `foo` berasal dari sumber eksternal. Misalnya, fungsi ini dapat diekspos sebagai layanan di server web, mengubah string UTF-8 menjadi bentuk Base64:

```js
function stringToBase64(req, res) {
  // The request body should have the format of `{ string: 'foobar' }`.
  const rawBytes = new Buffer(req.body.string);
  const encoded = rawBytes.toString('base64');
  res.end({ encoded });
}
```

Perhatikan bahwa kode ini _tidak_ memvalidasi jenis `req.body.string`:

- `req.body.string` diharapkan berupa string. Jika ini masalahnya, semuanya berjalan dengan baik.
- `req.body.string` dikendalikan oleh klien yang mengirimkan permintaan.
- Jika `req.body.string` adalah *number* `50`, `rawBytes` akan menjadi `50` byte:
  - Sebelum Node.js 8, konten tidak akan diinisialisasi
  - Setelah Node.js 8, konten akan menjadi `50` byte dengan nilai `0`

Karena pemeriksaan tipe yang hilang, penyerang dapat dengan sengaja mengirim nomor sebagai bagian dari permintaan. Dengan menggunakan ini, mereka dapat:

- Baca memori yang tidak diinisialisasi. Ini **akan** membocorkan kata sandi, kunci enkripsi, dan lainnya jenis informasi sensitif. (Kebocoran informasi)
- Memaksa program untuk mengalokasikan sejumlah besar memori. Misalnya, saat menentukan `500000000` sebagai nilai input, setiap permintaan akan mengalokasikan 500MB memori. Ini dapat digunakan untuk menghabiskan memori yang tersedia dari suatu program sepenuhnya dan membuatnya crash, atau memperlambatnya secara signifikan. (Kegagalan layanan)

Kedua skenario ini dianggap sebagai masalah keamanan yang serius di dunia nyata konteks server web.

Saat menggunakan `Buffer.from(req.body.string)` sebagai gantinya, melewatkan nomor akan selalu melempar pengecualian sebagai gantinya, memberikan perilaku terkontrol yang selalu bisa ditangani oleh program.

### <!--ecosystem-usage-->Konstruktor `Buffer()` telah ditinggalkan untuk sementara waktu. Apakah ini benar-benar masalah?

Survei kode di ekosistem `npm` telah menunjukkan bahwa konstruktor `Buffer()` masih banyak digunakan. Ini termasuk kode baru, dan penggunaan keseluruhan kode tersebut sebenarnya telah *increasing*.
