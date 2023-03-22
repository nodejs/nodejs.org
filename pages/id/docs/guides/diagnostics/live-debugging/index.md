---
title: Pemecahan Masalah Langsung
layout: docs.hbs
---

# Pemecahan Masalah Langsung

* [Pemecahan Masalah Langsung](#live-debugging)
  * [Aplikasi saya tidak berjalan seperti yang diharapkan](#my-application-doesnt-behave-as-expected)
    * [Gejala](#symptoms)
    * [Pemecahan Masalah](#debugging)

Dalam dokumen ini, Anda dapat belajar tentang cara melakukan debug langsung pada proses Node.js.

## Aplikasi saya tidak berjalan seperti yang diharapkan

### Gejala

Pengguna mungkin memperhatikan bahwa aplikasi tidak memberikan output yang diharapkan untuk beberapa input tertentu, misalnya, server HTTP mengembalikan respons JSON di mana beberapa field kosong. Berbagai hal dapat salah dalam proses tersebut, tetapi dalam kasus penggunaan ini, kami terutama fokus pada logika aplikasi dan kebenarannya.

### Pemecahan Masalah

Dalam kasus penggunaan ini, pengguna ingin memahami jalur kode yang dieksekusi oleh aplikasi kita untuk trigger tertentu seperti permintaan HTTP yang masuk. Mereka juga mungkin ingin melangkah melalui kode dan mengontrol eksekusi serta memeriksa nilai-nilai variabel yang ada di dalam memori.

* [Menggunakan Inspeksi](/en/docs/guides/diagnostics/live-debugging/using-inspector)
