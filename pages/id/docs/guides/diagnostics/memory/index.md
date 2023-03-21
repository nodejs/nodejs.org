---
title: Diagnostik Memori
layout: docs.hbs
---

# Memori

Dalam dokumen ini, Anda dapat belajar tentang cara memecahkan masalah yang berkaitan dengan memori.

* [Memori](#memory)
  * [Proses saya kehabisan memori](#my-process-runs-out-of-memory)
    * [Gejala](#symptoms)
    * [Efek Samping](#side-effects)
  * [Proses saya menggunakan memori secara tidak efisien](#my-process-utilizes-memory-inefficiently)
    * [Gejala](#symptoms-1)
    * [Efek Samping](#side-effects-1)
  * [Pemecahan Masalah](#debugging)

## Proses saya kehabisan memori

Node.js _(JavaScript)_ adalah bahasa yang dikumpulkan sampah, sehingga kebocoran memori mungkin terjadi melalui retainer. Karena aplikasi Node.js biasanya multi-penyewa, kritis untuk bisnis, dan berjalan lama, menyediakan cara yang mudah diakses dan efisien untuk menemukan kebocoran memori sangat penting.

### Gejala

Pengguna memperhatikan penggunaan memori yang terus meningkat _(dapat cepat atau lambat, selama beberapa hari atau bahkan minggu)_ kemudian melihat proses crash dan restart oleh manajer proses. Proses mungkin berjalan lebih lambat dari sebelumnya dan restart menyebabkan beberapa permintaan gagal _(load balancer merespons dengan 502)_.

### Efek Samping

* Restart proses karena kehabisan memori dan permintaan ditolakRestart proses karena kehabisan memori dan permintaan ditolak
* Aktivitas GC yang meningkat menyebabkan penggunaan CPU yang lebih tinggi dan waktu respons yang lebih lambat
  * GC menghalangi Event Loop menyebabkan lambat
* Peningkatan swapping memori memperlambat proses (aktivitas GC)
* Mungkin tidak memiliki cukup memori yang tersedia untuk mendapatkan Heap Snapshot

## Proses saya memanfaatkan memori secara tidak efisien

### Gejala

Aplikasi menggunakan jumlah memori yang tidak terduga dan / atau kami mengamati aktivitas kolektor sampah yang meningkat.

### Efek Samping

* Jumlah page fault yang tinggi
* Aktivitas GC yang lebih tinggi dan penggunaan CPU

## Pemecahan Masalah

Sebagian besar masalah memori dapat diatasi dengan menentukan berapa banyak ruang yang digunakan oleh objek tipe khusus kita dan variabel apa yang mencegah mereka dari dikumpulkan oleh sampah. Juga membantu untuk mengetahui pola alokasi program kita dari waktu ke waktu.

* [Menggunakan Heap Profiler](/en/docs/guides/diagnostics/memory/using-heap-profiler/)
* [Menggunakan Heap Snapshot](/en/docs/guides/diagnostics/memory/using-heap-snapshot/)
* [GC Traces](/en/docs/guides/diagnostics/memory/using-gc-traces)
