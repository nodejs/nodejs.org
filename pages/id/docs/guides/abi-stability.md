---
title: Stabilitas ABI
layout: docs.hbs
---

# Stabilitas ABI

## Pengantar
Application Binary Interface (ABI) adalah cara bagi program untuk memanggil fungsi dan menggunakan struktur data dari program terkompilasi lainnya. Ini adalah versi yang dikompilasi dari Antarmuka Pemrograman Aplikasi (Inggris: Application Programming Interface disingkat API). Dengan kata lain, file header menggambarkan kelas, fungsi, struktur data, enumerasi, dan konstanta yang memungkinkan aplikasi untuk melakukan tugas yang diinginkan sesuai dengan cara kompilasi ke satu set alamat dan nilai parameter dan memori yang diharapkan ukuran struktur dan tata letak yang dengannya penyedia ABI dikompilasi.

Aplikasi yang menggunakan ABI harus dikompilasi sedemikian rupa sehingga tersedia alamat, nilai parameter yang diharapkan, dan ukuran dan tata letak struktur memori setuju dengan yang dengannya penyedia ABI dikompilasi. Ini biasanya dicapai dengan kompilasi terhadap header yang disediakan oleh penyedia ABI.

Karena penyedia ABI dan pengguna ABI dapat dikompilasi di waktu yang berbeda dengan versi kompiler yang berbeda, sebagian dari tanggung jawab untuk memastikan kompatibilitas ABI terletak pada kompiler. Berbeda versi kompiler, mungkin disediakan oleh vendor yang berbeda, harus semuanya menghasilkan ABI yang sama dari file header dengan konten tertentu, dan harus menghasilkan kode untuk aplikasi yang menggunakan ABI yang mengakses API yang dijelaskan dalam a header yang diberikan sesuai dengan konvensi ABI yang dihasilkan dari deskripsi di header. Kompiler modern memiliki rekam jejak yang cukup baik tentang tidak melanggar kompatibilitas ABI dari aplikasi yang mereka kompilasi.

Tanggung jawab yang tersisa untuk memastikan kompatibilitas ABI terletak pada tim memelihara file header yang menyediakan API yang dihasilkan, setelah kompilasi, di ABI agar tetap stabil. Perubahan pada file header dapat dibuat, tetapi sifat perubahan harus dilacak dengan cermat untuk memastikan bahwa, setelah kompilasi, ABI tidak berubah dengan cara yang akan merender pengguna ABI yang ada tidak kompatibel dengan versi baru.

## Stabilitas ABI di Node.js
Node.js menyediakan file header yang dikelola oleh beberapa tim independen. Untuk contoh, file header seperti `node.h` dan `node_buffer.h` dikelola oleh tim Node.js. `v8.h` dikelola oleh tim V8, yang meskipun berdekatan kerjasama dengan tim Node.js, independen, dan dengan jadwal sendiri dan prioritas. Dengan demikian, tim Node.js hanya memiliki sebagian kendali atas perubahan yang diperkenalkan di header yang disediakan proyek. Hasil dari, proyek Node.js telah mengadopsi [versi semantik](https://semver.org/). Ini memastikan bahwa API yang disediakan oleh proyek akan menghasilkan ABI yang stabil untuk semua versi minor dan patch dari Node.js yang dirilis dalam satu versi mayor. Dalam praktiknya, ini berarti bahwa proyek Node.js telah berkomitmen untuk memastikan bahwa addon asli Node.js dikompilasi terhadap versi utama tertentu dari Node.js akan berhasil dimuat saat dimuat oleh versi minor atau patch Node.js apa pun dalam versi utama yang dikompilasi.

## N-API
Permintaan telah muncul untuk melengkapi Node.js dengan API yang menghasilkan ABI yang tetap stabil di beberapa versi utama Node.js. motivasi untuk membuat API seperti itu adalah sebagai berikut:

* Bahasa JavaScript tetap kompatibel dengan dirinya sendiri sejak sangat hari-hari awal, sedangkan ABI mesin yang mengeksekusi kode JavaScript berubah dengan setiap versi utama Node.js. Ini berarti bahwa aplikasi yang terdiri dari: Paket Node.js yang ditulis seluruhnya dalam JavaScript tidak perlu dikompilasi ulang, diinstal ulang, atau digunakan kembali sebagai versi utama baru dari Node.js dimasukkan ke dalam lingkungan produksi di mana aplikasi tersebut berjalan. Sebaliknya, jika aplikasi tergantung pada paket yang berisi addon asli, aplikasi harus dikompilasi ulang, diinstal ulang, dan digunakan kembali setiap kali versi utama baru dari Node.js diperkenalkan ke dalam lingkungan produksi. Disparitas ini antara paket Node.js yang berisi add-on asli dan yang ditulis sepenuhnya dalam JavaScript telah menambah beban pemeliharaan produksi sistem yang mengandalkan add-on asli.

* Proyek lain sudah mulai menghasilkan antarmuka JavaScript yang pada dasarnya implementasi alternatif dari Node.js. Karena proyek-proyek ini adalah biasanya dibangun di atas mesin JavaScript yang berbeda dari V8, add-on asli mereka tentu mengambil struktur yang berbeda dan menggunakan API yang berbeda. Namun demikian, menggunakan satu API untuk addon asli di berbagai implementasi Node.js JavaScript API akan memungkinkan proyek ini memanfaatkan ekosistem paket JavaScript yang terkumpul di sekitar Node.js.

* Node.js mungkin berisi mesin JavaScript yang berbeda di masa mendatang. Ini berarti bahwa, secara eksternal, semua antarmuka Node.js akan tetap sama, tetapi V8 file header tidak akan ada. Langkah tersebut akan menyebabkan terganggunya Ekosistem Node.js secara umum, dan addon asli pada khususnya, jika API yang agnostik mesin JavaScript tidak pertama kali disediakan oleh Node.js dan diadopsi oleh addon asli.

Untuk tujuan ini Node.js telah memperkenalkan N-API di versi 8.6.0 dan menandainya sebagai komponen proyek yang stabil pada Node.js 8.12.0. API didefinisikan dalam header [`node_api.h`][] dan [`node_api_types.h`][], dan menyediakan forward- jaminan kompatibilitas yang melintasi batas versi utama Node.js. Itu jaminan dapat dinyatakan sebagai berikut:

**Versi tertentu *n* N-API akan tersedia dalam versi utama Node.js di mana ia diterbitkan, dan di semua versi Node.js berikutnya, termasuk versi utama berikutnya.**

Penulis addon asli dapat memanfaatkan kompatibilitas ke depan N-API jaminan dengan memastikan bahwa addon hanya menggunakan API yang ditentukan dalam `node_api.h` serta struktur data dan konstanta yang didefinisikan dalam `node_api_types.h`. Dengan demikian, penulis memfasilitasi adopsi addon mereka dengan menunjukkan untuk pengguna produksi bahwa beban pemeliharaan untuk aplikasi mereka akan meningkat tidak lebih dengan menambahkan addon asli ke proyek mereka daripada dengan penambahan paket yang ditulis murni dalam JavaScript.

N-API diversi karena API baru ditambahkan dari waktu ke waktu. Tidak seperti versi semantik, versi N-API bersifat kumulatif. Artinya, setiap versi dari N-API menyampaikan arti yang sama dengan versi minor dalam sistem semver, artinya bahwa semua perubahan yang dibuat pada N-API akan kompatibel ke belakang. Selain itu, baru N-API ditambahkan di bawah bendera eksperimental untuk memberi komunitas kesempatan untuk memeriksanya di lingkungan produksi. Status eksperimental berarti bahwa, meskipun perawatan telah diambil untuk memastikan bahwa API baru tidak harus dimodifikasi dengan cara yang tidak kompatibel dengan ABI di masa mendatang, itu belum cukup terbukti dalam produksi untuk menjadi benar dan berguna seperti yang dirancang dan, sebagai seperti itu, dapat mengalami perubahan yang tidak kompatibel dengan ABI sebelum akhirnya dimasukkan menjadi versi N-API yang akan datang. Artinya, N-API eksperimental belum dicakup oleh jaminan kompatibilitas ke depan.

[`node_api.h`]: https://github.com/nodejs/node/blob/main/src/node_api.h
[`node_api_types.h`]: https://github.com/nodejs/node/blob/main/src/node_api_types.h
