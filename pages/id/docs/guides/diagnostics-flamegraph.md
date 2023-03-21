---
title: Diagnostik - Flame Graph
layout: docs.hbs
---

# Flame Graph

## Apa kegunaan flame graph?

Flame graph adalah cara memvisualisasikan waktu CPU yang dihabiskan dalam fungsi. Mereka dapat membantu Anda menentukan di mana Anda menghabiskan terlalu banyak waktu untuk melakukan operasi sinkron.

## Cara membuat flame graph

Anda mungkin pernah mendengar membuat flame graph untuk Node.js itu sulit, tapi itu tidak benar (lagi). Solaris vms tidak lagi diperlukan untuk grafik nyala!

Grafik nyala dihasilkan dari keluaran `perf`, yang bukan merupakan alat khusus simpul. Meskipun ini adalah cara paling ampuh untuk memvisualisasikan waktu CPU yang dihabiskan, ini mungkin memiliki masalah dengan bagaimana kode JavaScript dioptimalkan di Node.js 8 dan di atasnya. Lihat bagian [perf output issues](#perf-output-issues) di bawah ini.

### Gunakan alat yang sudah dikemas sebelumnya

Jika Anda menginginkan satu langkah yang menghasilkan grafik nyala secara lokal, coba [0x](https://www.npmjs.com/package/0x)

Untuk mendiagnosis penerapan produksi, baca catatan berikut: [0x server produksi](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md).

### Buat grafik nyala dengan alat kinerja sistem

Tujuan dari panduan ini adalah untuk menunjukkan langkah-langkah yang terlibat dalam membuat flame graph dan membuat Anda tetap mengendalikan setiap langkah.

Jika Anda ingin memahami setiap langkah dengan lebih baik, lihat bagian berikut di mana kita akan membahas lebih detail.

Sekarang mari kita mulai bekerja.

1. Instal `perf` (biasanya tersedia melalui paket linux-tools-common jika belum diinstal)
2. coba jalankan `perf` - mungkin mengeluh tentang modul kernel yang hilang, instal juga
3. jalankan node dengan perf diaktifkan (lihat [masalah output perf](#perf-output-issues) untuk tips khusus untuk versi Node.js)

    ```bash
    perf record -e cycles:u -g -- node --perf-basic-prof app.js
    ```

4. mengabaikan peringatan kecuali mereka mengatakan Anda tidak dapat menjalankan perf karena paket yang hilang; Anda mungkin mendapatkan beberapa peringatan tentang tidak dapat mengakses sampel modul kernel yang sebenarnya tidak Anda cari.
5. Jalankan `perf script > perfs.out` untuk menghasilkan file data yang akan Anda visualisasikan dalam sekejap. Berguna untuk [menerapkan beberapa pembersihan](#filtering-out-node-js-internal-functions) untuk grafik yang lebih mudah dibaca
6. instal stackvis jika belum terinstal `npm i -g stackvis`
7. jalankan `stackvis perf < perfs.out > flamegraph.htm`

Sekarang buka file flame graph di browser favorit Anda dan lihat itu terbakar. Ini diberi kode warna sehingga Anda dapat fokus pada batang oranye yang paling jenuh terlebih dahulu. Mereka cenderung mewakili fungsi berat CPU.

Perlu disebutkan - jika Anda mengklik elemen flame graph, zoom-in dari sekelilingnya akan ditampilkan di atas grafik.

### Menggunakan `perf` untuk mengambil sampel proses yang sedang berjalan

Ini bagus untuk merekam data grafik nyala dari proses yang sudah berjalan yang tidak ingin Anda hentikan. Bayangkan sebuah proses produksi dengan masalah yang sulit untuk direproduksi.

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

Tunggu, untuk apa `tidur 3` itu? Itu ada untuk menjaga kinerja tetap berjalan - meskipun opsi `-p` menunjuk ke pid yang berbeda, perintah harus dieksekusi pada suatu proses dan diakhiri dengan itu. perf berjalan selama masa perintah yang Anda berikan padanya, terlepas dari apakah Anda benar-benar membuat profil perintah itu atau tidak. `sleep 3` memastikan kinerja berjalan selama 3 detik.

Mengapa `-F` (frekuensi profil) diatur ke 99? Ini adalah default yang masuk akal. Anda dapat menyesuaikan jika Anda mau. `-F99` memberi tahu perf untuk mengambil 99 sampel per detik, untuk lebih presisi, tingkatkan nilainya. Nilai yang lebih rendah seharusnya menghasilkan keluaran yang lebih sedikit dengan hasil yang kurang tepat. Presisi yang Anda butuhkan tergantung pada berapa lama fungsi intensif CPU Anda benar-benar berjalan. Jika Anda mencari alasan perlambatan yang nyata, 99 frame per detik seharusnya sudah lebih dari cukup.

Setelah Anda mendapatkan catatan perf 3 detik itu, lanjutkan dengan membuat grafik nyala dengan dua langkah terakhir dari atas.

### Memfilter fungsi internal Node.js

Biasanya Anda hanya ingin melihat kinerja panggilan Anda sendiri, jadi memfilter fungsi internal Node.js dan V8 dapat membuat grafik lebih mudah dibaca. Anda dapat membersihkan file perf Anda dengan:

```bash
sed -i \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]\?/ /' \
  perfs.out
```

Jika Anda membaca grafik nyala Anda dan tampak aneh, seolah-olah ada sesuatu yang hilang dalam fungsi kunci yang memakan waktu paling lama, coba buat grafik nyala Anda tanpa filter - mungkin Anda mendapat kasus yang jarang terjadi tentang masalah dengan Node.js itu sendiri.

### Opsi pembuatan profil Node.js

`--perf-basic-prof-only-functions` dan `--perf-basic-prof` adalah dua yang berguna untuk men-debug kode JavaScript Anda. Opsi lain digunakan untuk membuat profil Node.js itu sendiri, yang berada di luar cakupan panduan ini.

`--perf-basic-prof-only-functions` menghasilkan lebih sedikit output, jadi ini adalah opsi dengan overhead paling sedikit.

### Mengapa saya membutuhkannya sama sekali?

Nah, tanpa opsi ini Anda masih akan mendapatkan grafik nyala, tetapi dengan sebagian besar batang berlabel `v8::Function::Call`.

## Masalah keluaran `perf`

### Perubahan pipeline Node.js 8.x V8

Node.js 8.x dan yang lebih baru dikirimkan dengan optimasi baru ke pipa kompilasi JavaScript di mesin V8 yang terkadang membuat nama/referensi fungsi tidak dapat dijangkau untuk perf kadang-kadang. (Ini disebut Turbofan)

Hasilnya adalah Anda mungkin tidak mendapatkan nama fungsi Anda tepat di grafik nyala.

Anda akan melihat `ByteCodeHandler:` di mana Anda mengharapkan nama fungsi.

[0x](https://www.npmjs.com/package/0x) memiliki beberapa mitigasi untuk itu.

Untuk detail lihat:

* https://github.com/nodejs/benchmarking/issues/168
* https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

### Node.js 10+

Node.js 10.x mengatasi masalah dengan Turbofan menggunakan flag `--interpreted-frames-native-stack`.

Jalankan `node --interpreted-frames-native-stack --perf-basic-prof-only-functions` untuk mendapatkan nama fungsi dalam grafik nyala terlepas dari pipa V8 mana yang digunakan untuk mengompilasi JavaScript Anda.

### Label rusak di flame graph

Jika Anda melihat label seperti ini

```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```

itu berarti kinerja Linux yang Anda gunakan tidak dikompilasi dengan dukungan demangle, lihat https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 misalnya

## Contoh

Berlatih menangkap flame graph sendiri dengan [latihan flame graph](https://github.com/naugtur/node-example-flamegraph)!
