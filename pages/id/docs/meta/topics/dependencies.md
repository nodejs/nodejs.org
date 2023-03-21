---
title: Dependensi
layout: docs.hbs
---

# Dependencies / Dependensi

Ada beberapa dependensi yang diandalkan Node.js untuk bekerja seperti itu.

* [Perpustakaan atau Libraries](#libraries)
  * [V8](#v8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [Peralatan](#tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)

## Perpustakaan

### V8

Pustaka V8 menyediakan Node.js dengan mesin JavaScript, yang Node.js kontrol melalui V8 C++ API. V8 dikelola oleh Google, untuk digunakan di Chrome.

* [Dokumentasi](https://v8.dev/docs)

### libuv

Ketergantungan penting lainnya adalah libuv, pustaka C yang digunakan untuk abstrak operasi I/O non-pemblokiran ke antarmuka yang konsisten di semua yang didukung platform. Ini menyediakan mekanisme untuk menangani sistem file, DNS, jaringan, anak proses, pipe, penanganan sinyal, polling dan streaming. Ini juga termasuk kumpulan utas untuk pekerjaan pembongkaran untuk beberapa hal yang tidak dapat dilakukan secara asinkron di tingkat sistem operasi.

* [Dokumentasi](http://docs.libuv.org/)

### llhttp

Penguraian HTTP ditangani oleh pustaka TypeScript dan C ringan yang disebut llhttp. Ini dirancang untuk tidak membuat panggilan atau alokasi apa pun, sehingga memiliki yang sangat kecil jejak memori per-permintaan.

* [Dokumentasi](https://github.com/nodejs/llhttp)

### c-ares

Untuk beberapa permintaan DNS asinkron, Node.js menggunakan pustaka C yang disebut c-ares. Itu diekspos melalui modul DNS di JavaScript sebagai keluarga `resolve()` dari fungsi. Fungsi `lookup()`, yang digunakan oleh inti lainnya, membuat penggunaan panggilan `getaddrinfo(3)` berulir di libuv. Alasan untuk ini adalah c-ares mendukung /etc/hosts, /etc/resolv.conf dan /etc/svc.conf, tetapi tidak mendukung hal-hal seperti mDNS.

* [Dokumentasi](https://c-ares.haxx.se/docs.html)

### OpenSSL

OpenSSL digunakan secara luas di modul `tls` dan `crypto`. Ini menyediakan implementasi yang telah teruji pertempuran dari banyak fungsi kriptografi yang modern web bergantung pada keamanan.

* [Dokumentasi](https://www.openssl.org/docs/)

### zlib

Untuk kompresi dan dekompresi yang cepat, Node.js mengandalkan standar industri zlib library, juga dikenal karena penggunaannya di gzip dan libpng. Node.js menggunakan zlib untuk buat sinkronisasi, asinkron, dan antarmuka kompresi dan dekompresi streaming.

* [Dokumentasi](https://www.zlib.net/manual.html)

## Peralatan

### npm

Node.js adalah tentang modularitas, dan dengan itu muncul kebutuhan akan kualitas manajer paket; untuk tujuan ini, npm dibuat. Dengan npm datang yang terbesar pemilihan paket buatan komunitas dari ekosistem pemrograman apa pun, yang membuat pembuatan aplikasi Node.js cepat dan mudah.

* [Dokumentasi](https://docs.npmjs.com/)

### gyp

Sistem pembangunan ditangani oleh gyp, generator proyek berbasis python yang disalin dari V8. Itu dapat menghasilkan file proyek untuk digunakan dengan sistem build di banyak platform. Node.js membutuhkan sistem pembangunan karena sebagian besar — ​​dan itu dependensi — ditulis dalam bahasa yang memerlukan kompilasi.

* [Dokumentasi](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

Kode asli dapat diuji menggunakan gtest, yang diambil dari Chromium. Ini memungkinkan menguji C/C++ tanpa memerlukan node yang ada yang dapat dieksekusi untuk bootstrap.

* [Dokumentasi](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
