---
title: Diagnostik Memori - Menggunakan Jejak GC
layout: docs.hbs
---

# Melacak pengumpulan sampah

Panduan ini akan melalui dasar-dasar jejak pengumpulan sampah.

Di akhir panduan ini, Anda akan dapat:
* Aktifkan pelacakan di aplikasi Node.js Anda
* Menginterpretasikan jejak
* Identifikasi potensi masalah memori di aplikasi Node.js Anda

Banyak hal yang perlu dipelajari tentang bagaimana garbage collector bekerja, tetapi jika Anda mempelajari satu hal saja, itu adalah bahwa saat GC berjalan, kode Anda tidak berjalan.

Anda mungkin ingin mengetahui seberapa sering dan lama garbage collection berjalan, dan apa hasilnya.

## Penyiapan

Untuk proposal panduan ini, kita akan menggunakan skrip ini:

```js
// script.mjs

import os from 'os';

let len = 1_000_000;
const entries = new Set();

function addEntry () {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };

  entries.add(entry);
}

function summary () {
  console.log(`Total: ${entries.size} entries`);
}

// eksekusi
(() => {
  while (len > 0) {
    addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  };

  summary();
})();
```

> Meskipun kebocoran terlihat jelas di sini, menemukan sumber kebocoran dapat     menjadi merepotkan dalam konteks aplikasi dunia nyata.

## Menjalankan dengan jejak garbage collection

Anda dapat melihat jejak garbage collection pada keluaran konsol dari proses Anda dengan menggunakan flag `--trace-gc`.

```console
$ node --trace-gc script.mjs
```

> Catatan: Anda dapat menemukan kode sumber dari [latihan][] ini di repositori Node.js Diagnostics.

Ini akan menghasilkan output seperti ini:

``` bash
[39067:0x158008000]     2297 ms: Scavenge 117.5 (135.8) -> 102.2 (135.8) MB, 0.8 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2375 ms: Scavenge 120.0 (138.3) -> 104.7 (138.3) MB, 0.9 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2453 ms: Scavenge 122.4 (140.8) -> 107.1 (140.8) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2531 ms: Scavenge 124.9 (143.3) -> 109.6 (143.3) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2610 ms: Scavenge 127.1 (145.5) -> 111.8 (145.5) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2688 ms: Scavenge 129.6 (148.0) -> 114.2 (148.0) MB, 0.8 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2766 ms: Scavenge 132.0 (150.5) -> 116.7 (150.5) MB, 1.1 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
Total: 1000000 entries
```

Sulit untuk dibaca? Mungkin kita sebaiknya me-review beberapa konsep dan menjelaskan keluaran dari flag `--trace-gc`.

### Memeriksa jejak dengan `--trace-gc`

Flag `--trace-gc` (atau `--trace_gc`, keduanya sama saja) menghasilkan semua peristiwa garbage collection pada konsol. Komposisi setiap baris dapat dijelaskan sebagai berikut:

```bash
[13973:0x110008000]       44 ms: Scavenge 2.4 (3.2) -> 2.0 (4.2) MB, 0.5 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure
```

| Token value                                           | Interpretasi                                        |
| ----------------------------------------------------- | --------------------------------------------------- |
| 13973                                                 | PID (Process ID) dari proses yang sedang berjalan   |
| 0x110008000                                           | Isolate (instance heap JS)                          |
| 44 ms                                                 | Waktu sejak proses dimulai dalam milidetik (ms)     |
| Scavenge                                              | Tipe / Fase dari GC                                 |
| 2.4                                                   | Heap yang digunakan sebelum GC dalam MB             |
| (3.2)                                                 | Total heap sebelum GC dalam MB                      |
| 2.0                                                   | Heap yang digunakan sesudah GC dalam MB             |
| (4.2)                                                 | Total heap sesudah GC dalam MB                      |
| 0.5 / 0.0 ms (average mu = 1.000, current mu = 1.000) | Waktu yang dihabiskan dalam GC dalam milidetik (ms) |
| allocation failure                                    | Alasan untuk GC                                     |

Kami hanya akan fokus pada dua peristiwa di sini:
* Scavenge
* Mark-sweep

Heap dibagi menjadi _ruang_. Di antara ini, ada ruang yang disebut "ruang baru" dan yang lain disebut "ruang lama".

> 👉 Sebenarnya, struktur heap sedikit berbeda, tetapi kita akan tetap menggunakan versi yang lebih sederhana untuk artikel ini. Jika Anda ingin informasi lebih detail, kami mendorong Anda untuk melihat [presentasi Peter Marshall][] tentang Orinoco.

### Scavenge

Scavenge adalah nama algoritma yang akan melakukan pengumpulan sampah pada ruang baru. Ruang baru adalah tempat objek dibuat. Ruang baru dirancang untuk menjadi kecil dan cepat untuk pengumpulan sampah.

Mari bayangkan sebuah skenario Scavenge:

* we allocated `A`, `B`, `C` & `D`.
  ```bash
  | A | B | C | D | <unallocated> |
  ```
* kita ingin mengalokasikan `E`
* tidak cukup ruang, memori habis
* kemudian, koleksi (sampah) akan dipicu
* objek mati dikumpulkan
* objek yang hidup akan tetap
* dalam asumsi bahwa `B` dan `D` sudah mati
  ```bash
  | A | C | <unallocated> |
  ```
* sekarang kita dapat mengalokasikan `E`
  ```bash
  | A | C | E | <unallocated> |
  ```

saat dua operasi Scavenge selesai, V8 akan memindahkan objek yang tidak dihapus ke old space.

> 👉 Skenario Scavenge lengkap dapat ditemukan di [sini][]
### Mark-sweep

Mark-sweep digunakan untuk mengumpulkan objek dari old space. Old space adalah tempat objek yang selamat dari new space tinggal.

Algoritma Mark-sweep terdiri dari dua fase:
* **Mark**: Akan menandai objek yang masih hidup sebagai hitam dan objek lain sebagai putih.
* **Sweep**: Memindai objek-objek yang berwarna putih dan mengubahnya menjadi ruang yang kosong.

> 👉 Sebenarnya langkah-langkah Mark dan Sweep sedikit lebih rumit. Silakan baca [dokumen][] ini untuk lebih detail.

<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif" alt="mark dan sweep algoritma" />

## `--trace-gc` dalam aksi

### Memory leak / Kebocoran memori

Sekarang, jika Anda kembali ke jendela terminal sebelumnya: Anda akan melihat banyak peristiwa `Mark-sweep` di konsol. Kami juga melihat bahwa jumlah memori yang dikumpulkan setelah peristiwa tersebut tidak signifikan.

Sekarang bahwa kita ahli dalam pengumpulan sampah! Apa yang bisa kita simpulkan?

Kemungkinan kita memiliki kebocoran memori! Tapi bagaimana kita bisa yakin tentang hal itu? (Pengingat: Ini cukup jelas dalam contoh ini, tetapi bagaimana dengan aplikasi dunia nyata?)

Tapi bagaimana kita bisa menemukan konteksnya?

### Cara mendapatkan konteks alokasi buruk
1. Anggaplah kita mengamati bahwa ruang tua terus meningkat.
2. Kurangi [`--max-old-space-size`][] sehingga total heap lebih dekat ke batas
3. Jalankan program sampai Anda mencapai out of memory.
4. Log yang dihasilkan menunjukkan konteks gagal.
6. Jika terjadi OOM, tingkatkan ukuran heap sekitar 10% dan ulangi beberapa kali. Jika pola yang sama diamati, itu menunjukkan kebocoran memori.
7. Jika tidak ada OOM, maka tetapkan ukuran heap menjadi nilai tersebut - Heap yang terkemas mengurangi jejak memori dan laten komputasi.

Misalnya, cobalah jalankan `script.mjs` dengan perintah berikut:

```bash
node --trace-gc --max-old-space-size=50 script.mjs
```

Anda seharusnya mengalami OOM:

```bash
[...]
<--- Terakhir GCs yang dilakukan (dalam bentuk log) --->
[40928:0x148008000]      509 ms: Mark-sweep 46.8 (65.8) -> 40.6 (77.3) MB, 6.4 / 0.0 ms  (+ 1.4 ms in 11 steps since start of marking, biggest step 0.2 ms, walltime since start of marking 24 ms) (average mu = 0.977, current mu = 0.977) finalize incrementa[40928:0x148008000]      768 ms: Mark-sweep 56.3 (77.3) -> 47.1 (83.0) MB, 35.9 / 0.0 ms  (average mu = 0.927, current mu = 0.861) allocation failure scavenge might not succeed
<--- Jejak tumpukan (stack trace) dalam JavaScript --->
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory [...]
```

Sekarang, coba jalankan perintah tersebut dengan ukuran 100mb:

```bash
node --trace-gc --max-old-space-size=100 script.mjs
```

Anda seharusnya mengalami sesuatu yang serupa, satu-satunya perbedaan adalah jejak GC terakhir akan berisi ukuran heap yang lebih besar.

```bash
<--- Last few GCs --->
[40977:0x128008000]     2066 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 46.7 / 0.0 ms  (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 47 ms) (average mu = 0.154, current mu = 0.155) allocati[40977:0x128008000]     2123 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 47.7 / 0.0 ms  (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 48 ms) (average mu = 0.165, current mu = 0.175) allocati
```

> Catatan: Dalam konteks aplikasi yang sebenarnya, mungkin sulit untuk menemukan objek yang bocor di kode. Heap snapshot dapat membantu Anda menemukannya. Kunjungi [panduan yang didedikasikan untuk heap snapshot][]

### Kelambatan

Bagaimana cara memastikan apakah terlalu banyak koleksi sampah (garbage collections) terjadi atau menyebabkan overhead?
1. Tinjau data jejak (trace data), khususnya waktu antara koleksi yang berurutan.
2. Tinjau data jejak, terutama sekitar waktu yang dihabiskan dalam GC.
3. Jika waktu antara dua GC lebih kecil dari waktu yang dihabiskan untuk GC, maka aplikasi tersebut mengalami kelaparan yang serius.
4. Jika waktu antara dua GC dan waktu yang dihabiskan dalam GC sangat tinggi, kemungkinan aplikasi dapat menggunakan heap yang lebih kecil.
5. Jika waktu antara dua GC jauh lebih besar dari waktu yang dihabiskan di dalam GC, maka aplikasi tersebut relatif sehat.

## Perbaiki kebocoran

Sekarang mari kita perbaiki kebocorannya. Alih-alih menggunakan objek untuk menyimpan entri kami, kami bisa menggunakan file.

Mari kita ubah sedikit skrip kita:

```js
// script-fix.mjs
import os from 'os';
import fs from 'fs/promises';

let len = 1_000_000;
const fileName = `entries-${Date.now()}`;

async function addEntry () {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };
  await fs.appendFile(fileName, JSON.stringify(entry) + '\n');
}

async function summary () {
  const stats = await fs.lstat(fileName);
  console.log(`File size ${stats.size} bytes`);
}

// execution
(async () => {
  await fs.writeFile(fileName, "----START---\n");
  while (len > 0) {
    await addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  };

  await summary();
})();
```

Menggunakan `Set` untuk menyimpan data bukanlah praktik yang buruk sama sekali; Anda hanya perlu memperhatikan jejak memori program Anda.

> Catatan: Anda dapat menemukan kode sumber dari [latihan][] ini di repositori Diagnostik Node.js.

Sekarang, mari kita jalankan skrip ini.

```
node --trace-gc script-fix.mjs
```

Anda harus mengamati dua hal:
* Peristiwa mark-sweep lebih jarang muncul
* jejak memori tidak melebihi 25MB versus lebih dari 130MB dengan skrip pertama.

Ini sangat masuk akal karena versi baru tidak terlalu menekan memori dari yang pertama.

**Hasil**: Apa pendapat Anda tentang peningkatan skrip ini? Anda mungkin melihat bahwa versi skrip yang baru lambat. Bagaimana jika kita menggunakan `Set` lagi dan menulis isinya ke dalam a file hanya ketika memori mencapai ukuran tertentu?

> [`getheapstatistics`][] API bisa membantu Anda.

## Bonus: Lacak pengumpulan sampah secara terprogram

### Menggunakan modul `v8`

Anda mungkin ingin menghindari jejak dari seumur hidup proses Anda. Dalam hal ini, atur flag dari dalam proses. Modul `v8` memaparkan API untuk memasang flag dengan cepat.

```js
import v8 from 'v8';

// mengaktifkan trace-gc
v8.setFlagsFromString('--trace-gc');

// menonaktifkan trace-gc
v8.setFlagsFromString('--notrace-gc');
```

### Menggunakan kait kinerja

Di Node.js, Anda dapat menggunakan [kait kinerja][] untuk melacak pengumpulan sampah.

```js
const { PerformanceObserver } = require('perf_hooks');

// Buat pengamat kinerja
const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0];
  /*
   Entri tersebut adalah turunan dari PerformanceEntry yang berisi
   metrik dari satu peristiwa pengumpulan sampah.
   Misalnya:
  PerformanceEntry {
    name: 'gc',
    entryType: 'gc',
    startTime: 2820.567669,
    duration: 1.315709,
    kind: 1
  }
  */
});

// Berlangganan notifikasi GC
obs.observe({ entryTypes: ['gc'] });

// Berhenti berlangganan
obs.disconnect();
```

### Memeriksa jejak dengan kait kinerja

Anda bisa mendapatkan statistik GC sebagai [PerformanceEntry][] dari callback di [PerformanceObserver][].

Misalnya:

```ts
PerformanceEntry {
  name: 'gc',
  entryType: 'gc',
  startTime: 2820.567669,
  duration: 1.315709,
  kind: 1
}
```

| Properti  | Interpretasi                                                                        |
| --------- | ----------------------------------------------------------------------------------- |
| nama      | Nama entri pertunjukan.                                                             |
| entryType | Jenis entri kinerja.                                                                |
| startTime | Stempel waktu milidetik beresolusi tinggi menandai waktu dimulainya Entri Performa. |
| duration  | Jumlah total milidetik yang berlalu untuk entri ini.                                |
| kind      | Jenis operasi pengumpulan sampah yang terjadi.                                      |
| flags     | Informasi tambahan tentang GC.                                                      |

Untuk informasi lebih lanjut, Anda dapat merujuk ke [dokumentasi tentang performance hooks][performance hooks].

[PerformanceEntry]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceentry
[PerformanceObserver]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceobserver
[`--max-old-space-size`]: https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes
[kait kinerja]: https://nodejs.org/api/perf_hooks.html
[performance hooks]: https://nodejs.org/api/perf_hooks.html
[latihan]: https://github.com/nodejs/diagnostics/tree/main/documentation/memory/step3/exercise
[panduan yang didedikasikan untuk heap snapshot]: https://github.com/nodejs/nodejs.org/blob/main/locale/en/docs/guides/diagnostics/memory/using-heap-snapshot.md#how-to-find-a-memory-leak-with-heap-snapshots
[dokumen]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#marking-state
[sini]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#sample-scavenge-scenario
[presentasi Peter Marshall]: https://v8.dev/blog/trash-talk
[`getheapstatistics`]: https://nodejs.org/dist/latest-v16.x/docs/api/v8.html#v8getheapstatistics
