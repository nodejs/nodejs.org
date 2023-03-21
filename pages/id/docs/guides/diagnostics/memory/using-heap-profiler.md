---
title: Diagnostik Memori - Menggunakan Heap Profiler
layout: docs.hbs
---

# Menggunakan Heap Profiler

Heap profiler berfungsi di atas V8 untuk menangkap alokasi seiring waktu. Dalam dokumen ini, kita akan membahas profil memori menggunakan:

1. Timeline Alokasi
2. Sampling Heap Profiler

Berbeda dengan heap dumps yang dibahas dalam panduan [Using Heap Snapshot][] ide menggunakan profil real-time adalah untuk memahami alokasi selama periode waktu tertentu.

## Heap Profiler - Timeline Alokasi

Heap Profiler mirip dengan Sampling Heap Profiler, kecuali ia akan melacak setiap alokasi. Ini memiliki overhead yang lebih tinggi daripada Sampling Heap Profiler sehingga tidak disarankan untuk digunakan di produksi.

> Anda dapat menggunakan [@mmarchini/observe][] untuk memulai dan menghentikan profiler secara programatik.

### Cara Menggunakan

Memulai aplikasi:

```console
node --inspect index.js
```

> `--inspect-brk` adalah pilihan yang lebih baik untuk skrip.

Hubungkan ke instance dev-tools di Chrome dan kemudian:

* Pilih tab `Memory`.
* Pilih  `Allocation instrumentation timeline`.
* Mulai memprofil.

![tutorial profiler heap langkah 1][3]

Setelah profil heap berjalan, sangat disarankan untuk menjalankan sampel untuk mengidentifikasi masalah memori. Misalnya, jika kami melakukan profil heap pada aplikasi web, kami dapat menggunakan `Apache Benchmark` untuk memproduksi beban:

```console
$ ab -n 1000 -c 5 http://localhost:3000
```

Kemudian, tekan tombol stop saat beban selesai:

![tutorial profiler heap langkah 2][4]

Terakhir, lihat data snapshot:

![tutorial profiler heap langkah 3][5]

Periksa bagian [useful links](#useful-links) untuk informasi lebih lanjut tentang terminologi memori.

## Sampling Heap Profiler

Sampling Heap Profiler melacak pola alokasi memori dan ruang yang dipesan seiring waktu. Karena ini berbasis sampling, overheadnya cukup rendah untuk digunakan dalam sistem produksi.

> Anda dapat menggunakan modul [`heap-profiler`][] untuk memulai dan menghentikan heap profiler secara programatik.

### Cara Menggunakan

Memuali aplikasi:

```console
$ node --inspect index.js
```

> `--inspect-brk`adalah pilihan yang lebih baik untuk skrip.

Hubungkan ke instance dev-tools dan kemudian:

1. Pilih tab `Memory`.
2. Pilih `Allocation sampling`.
3. Mulai memprofil.

![tutorial profiler heap 4][7]

Buat beberapa beban dan hentikan profiler. Ini akan menghasilkan ringkasan dengan alokasi berdasarkan stacktrace mereka. Anda dapat fokus pada fungsi dengan alokasi heap yang lebih banyak, lihat contoh di bawah:

![tutorial profiler heap 5][8]

## Link Berguna

* https://developer.chrome.com/docs/devtools/memory-problems/memory-101/
* https://github.com/v8/sampling-heap-profiler
* https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/

[Using Heap Snapshot]: /en/docs/guides/diagnostics/memory/using-heap-snapshot/
[@mmarchini/observe]: https://www.npmjs.com/package/@mmarchini/observe
[3]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-1.png
[4]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-2.png
[5]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-3.png
[`heap-profiler`]: https://www.npmjs.com/package/heap-profile
[7]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-4.png
[8]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-5.png
