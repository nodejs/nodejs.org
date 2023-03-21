---
title: Pratinjau Pemblokiran vs Non-Pemblokiran
layout: docs.hbs
---

# Ikhtisar Pemblokiran vs Non-Pemblokiran

Ikhtisar ini mencakup perbedaan antara **pemblokiran** dan **non-pemblokiran** panggilan di Node.js. Ikhtisar ini akan merujuk ke loop acara dan libuv tetapi tidak pengetahuan sebelumnya tentang topik-topik tersebut diperlukan. Pembaca diasumsikan memiliki pemahaman dasar tentang bahasa JavaScript dan Node.js [pola panggilan balik](/id/knowledge/getting-started/control-flow/what-are-callbacks/).

> "I/O" terutama mengacu pada interaksi dengan disk sistem dan jaringan yang didukung oleh [libuv](https://libuv.org/).

## Memblokir

**Blocking** adalah saat eksekusi JavaScript tambahan di Node.js proses harus menunggu hingga operasi non-JavaScript selesai. Ini terjadi karena loop acara tidak dapat melanjutkan menjalankan JavaScript saat a Operasi **pemblokiran** sedang terjadi.

Di Node.js, JavaScript yang menunjukkan kinerja buruk karena CPU intensif daripada menunggu operasi non-JavaScript, seperti I/O, biasanya tidak disebut sebagai **pemblokiran**. Metode sinkron di pustaka standar Node.js yang menggunakan libuv adalah operasi **pemblokiran** yang paling umum digunakan. Warga asli modul mungkin juga memiliki metode **pemblokiran**.

Semua metode I/O di pustaka standar Node.js menyediakan asinkron versi, yang **non-blocking**, dan menerima fungsi callback. Beberapa metode juga memiliki rekanan **pemblokiran**, yang memiliki nama yang diakhiri dengan `Sinkron`.

## Membandingkan Kode

Metode **Blocking** mengeksekusi metode **synchronously** dan **non-blocking** jalankan **secara tidak sinkron**.

Menggunakan modul Sistem File sebagai contoh, ini adalah file **sinkron** yang dibaca:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
```

Dan berikut ini adalah contoh **asynchronous** yang setara:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

Contoh pertama tampak lebih sederhana daripada yang kedua tetapi memiliki kelemahan: baris kedua **memblokir** eksekusi JavaScript tambahan apa pun hingga seluruh file dibaca. Perhatikan bahwa dalam versi sinkron jika terjadi kesalahan dilempar itu perlu ditangkap atau prosesnya akan macet. Dalam asinkron versi, terserah penulis untuk memutuskan apakah kesalahan harus dilemparkan sebagai ditampilkan.

Mari kita sedikit memperluas contoh kita:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log
```

Dan ini adalah contoh asinkron yang serupa, tetapi tidak setara:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log
```

Pada contoh pertama di atas, `console.log` akan dipanggil sebelum `moreWork()`. Di contoh kedua `fs.readFile()` adalah **non-blocking** jadi eksekusi JavaScript dapat melanjutkan dan `moreWork()` akan dipanggil terlebih dahulu. Kemampuan untuk berlari `moreWork()` tanpa menunggu file selesai dibaca adalah desain utama pilihan yang memungkinkan untuk throughput yang lebih tinggi.

## Konkurensi dan Throughput

Eksekusi JavaScript di Node.js adalah utas tunggal, jadi konkurensi mengacu pada kapasitas loop acara untuk menjalankan fungsi panggilan balik JavaScript setelah selesai pekerjaan lain. Kode apa pun yang diharapkan berjalan secara bersamaan harus mengizinkan loop acara untuk terus berjalan sebagai operasi non-JavaScript, seperti I/O, adalah terjadi.

Sebagai contoh, mari kita pertimbangkan kasus di mana setiap permintaan ke server web mengambil 50ms untuk diselesaikan dan 45ms dari 50ms itu adalah database I/O yang dapat dilakukan secara tidak sinkron. Memilih **non-blocking** operasi asinkron membebaskan itu 45ms per permintaan untuk menangani permintaan lainnya. Ini adalah perbedaan yang signifikan dalam kapasitas hanya dengan memilih untuk menggunakan metode **non-blocking** daripada **memblokir** metode.

Loop acara berbeda dari model dalam banyak bahasa lain di mana tambahan utas dapat dibuat untuk menangani pekerjaan bersamaan.

## Bahaya Mencampur Blocking dan Non-Blocking Code

Ada beberapa pola yang harus dihindari ketika berhadapan dengan I/O. Mari lihat pada contoh:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

Dalam contoh di atas, `fs.unlinkSync()` kemungkinan akan dijalankan sebelumnya `fs.readFile()`, yang akan menghapus `file.md` sebelum benar-benar dibaca. SEBUAH cara yang lebih baik untuk menulis ini, yang sepenuhnya **non-blocking** dan dijamin mengeksekusi dalam urutan yang benar adalah:

```js
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

Di atas menempatkan panggilan **non-blocking** ke `fs.unlink()` dalam callback dari `fs.readFile()` yang menjamin urutan operasi yang benar.

## Sumber daya tambahan

* [libuv](https://libuv.org/)
