---
title: Kinerja Buruk - Menggunakan Linux Perf
layout: docs.hbs
---

# Menggunakan Linux Perf

[Linux Perf](https://perf.wiki.kernel.org/index.php/Main_Page) menyediakan profil CPU level rendah dengan frame JavaScript, native, dan OS level.

**Penting**: tutorial ini hanya tersedia di Linux.

## Bagaimana Caranya

Linux Perf biasanya tersedia melalui paket `linux-tools-common`. Melalui opsi `--perf-basic-prof` atau `--perf-basic-prof-only-functions` kita dapat memulai aplikasi Node.js dengan mendukung _perf_events_.

`--perf-basic-prof` selalu akan menulis ke file (/tmp/perf-PID.map), yang dapat menyebabkan pertumbuhan disk yang tak terbatas. Jika itu menjadi masalah, gunakan modul: [linux-perf](https://www.npmjs.com/package/linux-perf) atau `--perf-basic-prof-only-functions`.

Perbedaan utama antara keduanya adalah bahwa `--perf-basic-prof-only-functions` menghasilkan keluaran yang lebih sedikit, itu adalah opsi yang layak untuk profil produksi.

```console
# Jalankan aplikasi dan dapatkan PID-nya
$ node --perf-basic-prof-only-functions index.js &
[1] 3870
```

Kemudian record event berdasarkan frekuensi yang diinginkan:

```console
$ sudo perf record -F 99 -p 3870 -g
```

Dalam fase ini, Anda mungkin ingin menggunakan tes beban pada aplikasi untuk menghasilkan lebih banyak rekaman untuk analisis yang dapat diandalkan. Ketika pekerjaan selesai, tutup proses perf dengan mengirimkan SIGINT (Ctrl-C) ke perintah.

`perf` akan menghasilkan file di dalam folder `/tmp`, biasanya disebut `/tmp/perf-PID.map` (dalam contoh di atas: `/tmp/perf-3870.map`) yang berisi jejak untuk setiap fungsi yang dipanggil.

Untuk menggabungkan hasil tersebut dalam file tertentu, jalankan:

```console
$ sudo perf script > perfs.out
```

```console
$ cat ./perfs.out
node 3870 25147.878454:          1 cycles:
        ffffffffb5878b06 native_write_msr+0x6 ([kernel.kallsyms])
        ffffffffb580d9d5 intel_tfa_pmu_enable_all+0x35 ([kernel.kallsyms])
        ffffffffb5807ac8 x86_pmu_enable+0x118 ([kernel.kallsyms])
        ffffffffb5a0a93d perf_pmu_enable.part.0+0xd ([kernel.kallsyms])
        ffffffffb5a10c06 __perf_event_task_sched_in+0x186 ([kernel.kallsyms])
        ffffffffb58d3e1d finish_task_switch+0xfd ([kernel.kallsyms])
        ffffffffb62d46fb __sched_text_start+0x2eb ([kernel.kallsyms])
        ffffffffb62d4b92 schedule+0x42 ([kernel.kallsyms])
        ffffffffb62d87a9 schedule_hrtimeout_range_clock+0xf9 ([kernel.kallsyms])
        ffffffffb62d87d3 schedule_hrtimeout_range+0x13 ([kernel.kallsyms])
        ffffffffb5b35980 ep_poll+0x400 ([kernel.kallsyms])
        ffffffffb5b35a88 do_epoll_wait+0xb8 ([kernel.kallsyms])
        ffffffffb5b35abe __x64_sys_epoll_wait+0x1e ([kernel.kallsyms])
        ffffffffb58044c7 do_syscall_64+0x57 ([kernel.kallsyms])
        ffffffffb640008c entry_SYSCALL_64_after_hwframe+0x44 ([kernel.kallsyms])
....
```

Output mentah dari perf mungkin agak sulit dipahami sehingga biasanya file mentah ini digunakan untuk menghasilkan flamegraph untuk visualisasi yang lebih baik.

![Contoh nodejs grafik flame](https://user-images.githubusercontent.com/26234614/129488674-8fc80fd5-549e-4a80-8ce2-2ba6be20f8e8.png)

Untuk menghasilkan flamegraph dari hasil ini, ikuti [tutorial ini](https://nodejs.org/en/docs/guides/diagnostics-flamegraph/#create-a-flame-graph-with-system-perf-tools) from step 6.

Karena output dari `perf` bukan merupakan alat yang khusus untuk Node.js, maka mungkin ada masalah dengan cara kode JavaScript dioptimalkan di Node.js. Lihat [masalah output perf](https://nodejs.org/en/docs/guides/diagnostics-flamegraph/#perf-output-issues) untuk referensi lebih lanjut.

## Tautan Berguna

* https://nodejs.org/en/docs/guides/diagnostics-flamegraph/
* https://www.brendangregg.com/blog/2014-09-17/node-flame-graphs-on-linux.html
* https://perf.wiki.kernel.org/index.php/Main_Page
* https://blog.rafaelgss.com.br/node-cpu-profiler
