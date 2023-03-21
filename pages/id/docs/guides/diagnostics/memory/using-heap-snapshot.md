---
title: Diagnostik Memori - Menggunakan Snapshot Heap
layout: docs.hbs
---

# Menggunakan Snapshot Heap

Anda dapat mengambil Snapshot Heap dari aplikasi yang sedang berjalan dan memuatnya ke [Chrome Developer Tools][] untuk memeriksa variabel tertentu atau memeriksa ukuran retainer. Anda juga dapat membandingkan beberapa snapshot untuk melihat perbedaan dari waktu ke waktu.

## Peringatan

Ketika membuat snapshot, semua pekerjaan lain dalam thread utama Anda akan dihentikan. Bergantung pada isi heap, ini bahkan bisa memakan waktu lebih dari satu menit. Snapshot dibangun di dalam memori, sehingga dapat menggandakan ukuran heap, sehingga mengisi seluruh memori dan kemudian menonaktifkan aplikasi.

Jika Anda akan mengambil snapshot heap pada produksi, pastikan bahwa proses yang Anda ambil tidak akan berdampak pada ketersediaan aplikasi Anda.

## Cara Melakukan

### Dapatkan Snapshot Heap

Ada beberapa cara untuk memperoleh snapshot heap:

1. melalui inspector,
2. melalui sinyal eksternal dan flag baris perintah,
3. melalui panggilan `writeHeapSnapshot` dalam proses,
4. melalui protokol inspector.

#### 1. Gunakan profil memori dalam inspector

> Berfungsi di semua versi Node.js yang aktif dipelihara

Jalankan node dengan flag`--inspect` dan buka inspector. ![buka inspector][2]

Cara paling sederhana untuk mendapatkan Snapshot Heap adalah menghubungkan inspector ke proses Anda yang berjalan secara lokal. Kemudian pergi ke tab Memori dan ambil snapshot heap.

![ambil snapshot memori heap][3]

#### 2. Gunakan flag `--heapsnapshot-signal`

> Berfungsi di v12.0.0 atau versi yang lebih baru

Anda dapat memulai node dengan flag baris perintah yang memungkinkan bereaksi terhadap sinyal untuk membuat snapshot heap.

```
$ node --heapsnapshot-signal=SIGUSR2 index.js
```

```
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
node         1  5.5  6.1 787252 247004 ?       Ssl  16:43   0:02 node --heapsnapshot-signal=SIGUSR2 index.js
$ kill -USR2 1
$ ls
Heap.20190718.133405.15554.0.001.heapsnapshot
```

Untuk detailnya, lihat dokumentasi terbaru dari [flag heapsnapshot-signal][].

#### 3. Gunakan fungsi `writeHeapSnapshot`

> Berfungsi di v11.13.0 atau versi yang lebih baru, dapat bekerja pada versi yang lebih lama dengan paket [heapdump][]

Jika Anda membutuhkan snapshot dari proses yang sedang berjalan, seperti aplikasi yang berjalan pada server, Anda dapat mengimplementasikannya menggunakan:

```js
require('v8').writeHeapSnapshot();
```

Periksa [dokumen `writeHeapSnapshot`][] untuk opsi nama file.

Anda perlu memiliki cara untuk memanggilnya tanpa menghentikan proses, jadi disarankan untuk memanggilnya dalam HTTP handler atau sebagai reaksi terhadap sinyal dari sistem operasi. Hati-hati untuk tidak mengekspos titik akhir HTTP yang memicu snapshot. Tidak boleh memungkinkan siapa pun untuk mengaksesnya.

Untuk versi Node.js sebelum v11.13.0, Anda dapat menggunakan paket [heapdump][].

#### 4. Picu Heap Snapshot menggunakan protokol inspektor

Protokol inspektor dapat digunakan untuk memicu Heap Snapshot dari luar proses.

Tidak perlu menjalankan inspektor aktual dari Chromium untuk menggunakan API.

Berikut contoh pemicu snapshot pada bash, menggunakan `websocat` dan `jq`:

```bash
#!/bin/bash
set -e

kill -USR1 "$1"
rm -f fifo out
mkfifo ./fifo
websocat -B 10000000000 "$(curl -s http://localhost:9229/json | jq -r '.[0].webSocketDebuggerUrl')" < ./fifo > ./out &
exec 3>./fifo
echo '{"method": "HeapProfiler.enable", "id": 1}' > ./fifo
echo '{"method": "HeapProfiler.takeHeapSnapshot", "id": 2}' > ./fifo
while jq -e "[.id != 2, .result != {}] | all" < <(tail -n 1 ./out); do
  sleep 1s
  echo "Capturing Heap Snapshot..."
done

echo -n "" > ./out.heapsnapshot
while read -r line; do
  f="$(echo "$line" | jq -r '.params.chunk')"
  echo -n "$f" >> out.heapsnapshot
  i=$((i+1))
done < <(cat out | tail -n +2 | head -n -1)

exec 3>&-
```

Berikut adalah daftar alat profil memori yang dapat digunakan dengan protokol inspector:

* [OpenProfiling untuk Node.js][openprofiling]

## Cara menemukan kebocoran memori dengan Heap Snapshots

Anda dapat menemukan kebocoran memori dengan membandingkan dua snapshot heap. Penting untuk memastikan bahwa perbedaan snapshot tidak mengandung informasi yang tidak perlu. Langkah-langkah berikut harus menghasilkan perbedaan yang bersih antara snapshot.

1. Biarkan proses memuat semua sumber dan selesai bootstrapping. Ini seharusnya hanya memakan waktu beberapa detik.
2. Mulai menggunakan fungsionalitas yang Anda curigai bocor memori. Kemungkinan besar ini membuat beberapa alokasi awal yang bukan bocoran.
3. Ambil satu snapshot heap.
4. Lanjutkan menggunakan fungsionalitas untuk sementara waktu, lebih baik tanpa menjalankan apa pun di antara.
5. Ambil snapshot heap lainnya. Perbedaan antara keduanya seharusnya sebagian besar berisi apa yang bocor.
6. Buka alat pengembang Chromium/Chrome dan pergi ke tab *Memory*
7. Muat file snapshot lama terlebih dahulu, dan yang lebih baru satu detik. ![Muat tombol di alat][8]
8. Pilih snapshot yang lebih baru dan alihkan mode di dropdown di bagian atas dari *Ringkasan* dengan *Perbandingan*. ![Comparison dropdown][9]
9. Cari delta positif besar dan jelajahi referensi yang menyebabkannya di panel bawah.

Anda dapat berlatih menangkap snapshot heap dan menemukan kebocoran memori dengan [latihan snapshot heap ini][heapsnapshot exercise].

[Chrome Developer Tools]: https://developer.chrome.com/docs/devtools/
[2]: /static/images/docs/guides/diagnostics/tools.png
[3]: /static/images/docs/guides/diagnostics/snapshot.png
[flag heapsnapshot-signal]: https://nodejs.org/api/cli.html#--heapsnapshot-signalsignal
[heapdump]: https://www.npmjs.com/package/heapdump
[dokumen `writeHeapSnapshot`]: https://nodejs.org/api/v8.html#v8_v8_writeheapsnapshot_filename
[openprofiling]: https://github.com/vmarchaud/openprofiling-node
[8]: /static/images/docs/guides/diagnostics/load-snapshot.png
[9]: /static/images/docs/guides/diagnostics/compare.png
[heapsnapshot exercise]: https://github.com/naugtur/node-example-heapdump
