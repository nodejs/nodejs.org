---
title: Kinerja Buruk - Diagnostik
layout: docs.hbs
---

# Kinerja Buruk

Dalam dokumen ini Anda dapat mempelajari tentang cara memprofil proses Node.js.

* [Kinerja Buruk](#poor-performance)
  * [Aplikasi saya memiliki kinerja buruk](#my-application-has-a-poor-performance)
    * [Gejala](#symptoms)
    * [Debug](#debugging)

## Aplikasi saya memiliki kinerja buruk

### Gejala

Latensi aplikasi saya tinggi dan saya sudah mengonfirmasi bahwa bottleneck bukanlah ketergantungan saya seperti database dan layanan downstream. Jadi saya curiga bahwa aplikasi saya menghabiskan waktu yang signifikan untuk menjalankan kode atau memproses informasi.

Anda puas dengan kinerja aplikasi Anda secara umum tetapi ingin memahami bagian mana dari aplikasi Anda yang dapat ditingkatkan untuk berjalan lebih cepat atau lebih efisien. Ini dapat berguna ketika kita ingin meningkatkan pengalaman pengguna atau menghemat biaya komputasi.

### Debug

Dalam kasus penggunaan ini, kita tertarik dengan potongan kode yang menggunakan lebih banyak siklus CPU dari yang lain. Ketika kita melakukannya secara lokal, biasanya kita mencoba mengoptimalkan kode kita.

Dokumen ini menyediakan dua cara sederhana untuk memprofil aplikasi Node.js:

* [Menggunakan Profiler Sampling V8](https://nodejs.org/en/docs/guides/simple-profiling/)
* [Menggunakan Linux Perf](/en/docs/guides/diagnostics/poor-performance/using-linux-perf)
