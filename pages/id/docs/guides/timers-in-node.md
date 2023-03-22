---
title: Timer di Node.js
layout: docs.hbs
---

# Timer di Node.js dan seterusnya

Modul Timer di Node.js berisi fungsi yang mengeksekusi kode setelah satu set periode waktu. Timer tidak perlu diimpor melalui `require()`, karena semua metode tersedia secara global untuk meniru browser JavaScript API. Untuk memahami sepenuhnya kapan fungsi pengatur waktu akan dijalankan, ada baiknya untuk baca di Node.js [Event Loop](/id/docs/guides/event-loop-timers-and-nexttick/).

## Mengontrol Kontinuum Waktu dengan Node.js

API Node.js menyediakan beberapa cara untuk mengeksekusi kode penjadwalan di beberapa titik setelah saat ini. Fungsi di bawah ini mungkin tampak familier, karena tersedia di sebagian besar browser, tetapi Node.js sebenarnya menyediakan implementasi sendiri dari metode ini. Pengatur waktu terintegrasi dengan sangat erat dengan sistem, dan terlepas dari kenyataan bahwa API mencerminkan browser API, ada beberapa perbedaan dalam implementasi.

### Eksekusi "Ketika saya mengatakannya" ~ *`setTimeout()`*

`setTimeout()` dapat digunakan untuk menjadwalkan eksekusi kode setelah ditentukan jumlah milidetik. Fungsi ini mirip dengan [`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) dari browser JavaScript API, namun string kode tidak dapat diteruskan Akan dieksekusi.

`setTimeout()` menerima fungsi untuk dieksekusi sebagai argumen pertama dan penundaan milidetik didefinisikan sebagai angka sebagai argumen kedua. Tambahan argumen juga dapat disertakan dan ini akan diteruskan ke fungsi. Di Sini adalah contohnya:

```js
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 1500, 'funky');
```

Fungsi di atas `myFunc()` akan dieksekusi mendekati 1500 milidetik (atau 1,5 detik) mungkin karena panggilan `setTimeout()`.

Interval batas waktu yang diatur tidak dapat diandalkan untuk dieksekusi setelahnya jumlah milidetik yang *tepat* itu. Ini karena kode pelaksana lain yang memblokir atau menahan loop acara akan mendorong eksekusi batas waktu kembali. *Satu-satunya* jaminan adalah bahwa batas waktu tidak akan dijalankan *lebih cepat* dari interval waktu habis yang dideklarasikan.

`setTimeout()` mengembalikan objek `Timeout` yang dapat digunakan untuk mereferensikan batas waktu yang telah ditetapkan. Objek yang dikembalikan ini dapat digunakan untuk membatalkan batas waktu ( lihat `clearTimeout()` di bawah) serta ubah perilaku eksekusi (lihat `unref()` di bawah).

### Eksekusi "Tepat setelah ini" ~ *`setImmediate()`*

`setImmediate()` akan mengeksekusi kode di akhir siklus loop peristiwa saat ini. Kode ini akan mengeksekusi *setelah* setiap operasi I/O dalam loop peristiwa saat ini dan *sebelum* setiap pengatur waktu yang dijadwalkan untuk loop acara berikutnya. Eksekusi kode ini dapat dianggap terjadi "tepat setelah ini", yang berarti kode apa pun mengikuti pemanggilan fungsi `setImmediate()` akan dijalankan sebelum `setImmediate()` argumen fungsi.

Argumen pertama untuk `setImmediate()` akan menjadi fungsi yang akan dieksekusi. Setiap argumen berikutnya akan diteruskan ke fungsi saat dijalankan. Berikut ini contohnya:

```js
console.log('sebelum langsung');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('setelah segera');
```

Fungsi di atas yang diteruskan ke `setImmediate()` akan dijalankan setelah semua dapat dijalankan kode telah dieksekusi, dan output konsol adalah:

```
sebelum segera
setelah segera
mengeksekusi segera: sangat segera
```

`setImmediate()` mengembalikan objek `Immediate`, yang dapat digunakan untuk membatalkan segera yang dijadwalkan (lihat `clearImmediate()` di bawah).

> Jangan bingung `setImmediate()` dengan `process.nextTick()`. Ada beberapa cara utama mereka berbeda. Yang pertama adalah `process.nextTick()` akan berjalan *sebelum* setiap `Immediate`s yang disetel serta sebelum I/O terjadwal. Yang kedua adalah bahwa `process.nextTick()` tidak dapat dihapus, artinya sekali kode telah dijadwalkan untuk dieksekusi dengan `process.nextTick()`, eksekusi tidak bisa dihentikan, sama seperti fungsi normal. [Lihat panduan](/id/docs/guides/event-loop-timers-and-nexttick/#process-nexttick) ini untuk lebih memahami pengoperasian `process.nextTick()`.

### Eksekusi "Loop Tak Terbatas" ~ *`setInterval()`*

Jika ada blok kode yang harus dijalankan beberapa kali, `setInterval()` dapat digunakan untuk mengeksekusi kode tersebut. `setInterval()` mengambil fungsi argumen yang akan dijalankan berkali-kali dengan milidetik yang diberikan delay sebagai argumen kedua. Sama seperti `setTimeout()`, argumen tambahan dapat ditambahkan melampaui penundaan, dan ini akan diteruskan ke panggilan fungsi. Juga seperti `setTimeout()`, penundaan tidak dapat dijamin karena operasi yang mungkin berpegang pada loop acara, dan karena itu harus diperlakukan sebagai perkiraan penundaan. Lihat contoh di bawah ini:

```js
function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);
```

Dalam contoh di atas, `intervalFunc()` akan dieksekusi setiap 1500 milidetik, atau 1,5 detik, hingga berhenti (lihat di bawah).

Sama seperti `setTimeout()`, `setInterval()` juga mengembalikan `Timeout` objek yang dapat digunakan untuk referensi dan memodifikasi interval yang telah ditetapkan.

## Membersihkan Masa Depan

Apa yang dapat dilakukan jika objek `Timeout` atau `Immediate` perlu dibatalkan? `setTimeout()`, `setImmediate()`, dan `setInterval()` mengembalikan objek pengatur waktu yang dapat digunakan untuk mereferensikan objek `Timeout` atau `Immediate` yang ditetapkan. Dengan meneruskan objek tersebut ke fungsi `clear` masing-masing, eksekusi objek itu akan dihentikan sama sekali. Fungsi masing-masing adalah `clearTimeout()`, `clearImmediate()`, dan `clearInterval()`. Lihat contohnya di bawah ini untuk contoh masing-masing:

```js
const timeoutObj = setTimeout(() => {
  console.log('Batas waktu melampaui waktu');
}, 1500);

const immediateObj  = setImmediate(() => {
  console.log('Segera mengeksekusi segera');
});

const intervalObj = setInterval(() => {
  console.log('Mewawancarai interval');
}, 500);

clearTimeout(timeoutObj);
clearImmediate(immediateObj);
clearInterval(intervalObj);
```

## Meninggalkan Timeout di Belakang

Ingat bahwa objek `Timeout` dikembalikan oleh `setTimeout` dan `setInterval`. Objek `Timeout` menyediakan dua fungsi yang dimaksudkan untuk menambah `Timeout` perilaku dengan `unref()` dan `ref()`. Jika ada objek `Timeout` yang dijadwalkan menggunakan fungsi `set`, `unref()` dapat dipanggil pada objek tersebut. Ini akan berubah perilaku sedikit, dan tidak memanggil objek `Timeout` * jika itu yang terakhir kode untuk dieksekusi*. Objek `Timeout` tidak akan membuat proses tetap hidup, menunggu untuk mengeksekusi.

Dengan cara yang sama, objek `Timeout` yang memiliki `unref()` memanggilnya dapat menghapus perilaku itu dengan memanggil `ref()` pada objek `Timeout` yang sama, yang kemudian akan memastikan eksekusinya. Sadarilah, bagaimanapun, bahwa ini tidak tidak *tepat* mengembalikan perilaku awal karena alasan kinerja. Melihat di bawah ini untuk contoh keduanya:

```js
const timerObj = setTimeout(() => {
  console.log('akan saya jalankan?');
});

// jika dibiarkan saja, pernyataan ini akan mempertahankan yang di atas
// timeout dari berjalan, karena timeout akan menjadi satu-satunya
// hal yang mencegah program keluar
timerObj.unref();

// kita bisa menghidupkannya kembali dengan memanggil ref() di dalam
// segera
setImmediate(() => {
  timerObj.ref();
});
```

## Lebih Jauh ke Bawah Loop Acara

Ada lebih banyak lagi untuk Loop dan Timer Acara daripada panduan ini telah menutupi. Untuk mempelajari lebih lanjut tentang internal Node.js Loop Peristiwa dan bagaimana Pengatur Waktu beroperasi selama eksekusi, lihat panduan Node.js ini: [Loop Peristiwa Node.js, Pengatur Waktu, dan process.nextTick()](/id/docs/guides/event-loop-timers-and-nexttick/).
