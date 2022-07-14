---
layout: about.hbs
title: Kelompok Kerja
---

# Kelompok Kerja Inti
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/main/WORKING_GROUPS.md -->

Kelompok Kerja Inti dibuat oleh
[Technical Steering Committee (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md) atau dikenal juga sebagai "Panitia Pengarah Teknis".

## Kelompok Kerja Saat Ini

* [Addon API](#addon-api)
* [Build](#build)
* [Diagnostik](#diagnostik)
* [Docker](#docker)
* [Evangelism](#evangelism)
* [i18n](#i18n)
* [Pemeliharaan Paket](#pemeliharaan_paket)
* [Perilisan](#perilisan)
* [Keamanan](#keamanan)
* [Streams](#streams)

### [Addon API](https://github.com/nodejs/nan)

Kelompok Kerja Addon API bertanggung jawab untuk memelihara proyek NAN dan
paket _nan_ yang sesuai dalam npm. Proyek NAN menyediakan dan
lapisan abstraksi untuk penulis add-on asli untuk Node.js,
membantu dalam penulisan kode yang kompatibel dengan banyak digunakan secara aktif
versi Node.js, V8 dan libuv.

Tanggung jawab meliputi:

* Mempertahankan repositori GitHub [NAN](https://github.com/nodejs/nan),
   termasuk kode, masalah dan dokumentasi.
* Mempertahankan [addon-examples](https://github.com/nodejs/node-addon-examples)
   Repositori GitHub, termasuk kode, masalah, dan dokumentasi.
* Memelihara C++ Addon API dalam proyek Node.js, dalam subordinasi ke
   TSC Node.js.
* Memelihara dokumentasi Addon dalam proyek Node.js, di subordinasi ke TSC Node.js.
* Mempertahankan paket _nan_ di npm, merilis versi baru yang sesuai.
* Pesan tentang masa depan antarmuka Node.js dan NAN untuk memberikan
   pemberitahuan awal masyarakat tentang perubahan.

Anggota saat ini dapat ditemukan di
[README](https://github.com/nodejs/nan#collaborators).

### [Build](https://github.com/nodejs/build)

Tujuan Build Working Group adalah untuk membuat dan memelihara
infrastruktur otomatisasi.

Tanggung jawab meliputi:

* Memproduksi paket untuk semua platform target.
* Menjalankan tes.
* Menjalankan pengujian dan perbandingan kinerja.
* Membuat dan mengelola build-container.

### [Diagnostik](https://github.com/nodejs/diagnostics)

Tujuan Kelompok Kerja Diagnostik adalah untuk memunculkan seperangkat
didokumentasikan, dan antarmuka diagnostik yang dapat diperluas untuk digunakan oleh alat Node.js dan
VM JavaScript.

Tanggung jawab meliputi:

* Berkolaborasi dengan V8 untuk mengintegrasikan `v8_inspector` ke dalam Node.js.
* Berkolaborasi dengan V8 untuk mengintegrasikan `trace_event` ke dalam Node.js.
* Berkolaborasi dengan Core untuk menyempurnakan `async_wrap` dan `async_hooks`.
* Memelihara dan meningkatkan integrasi sistem pelacakan OS (misalnya ETW, LTTNG, dtrace).
* Mendokumentasikan kemampuan diagnostik dan API di Node.js dan komponennya.
* Menjelajahi peluang dan celah, mendiskusikan permintaan fitur, dan menangani
   konflik dalam diagnostik Node.js.
* Membina ekosistem alat diagnostik untuk Node.js.
* Mendefinisikan dan menambahkan antarmuka/API untuk memungkinkan dump dihasilkan
   ketika diperlukan.
* Mendefinisikan dan menambahkan struktur umum ke dump yang dihasilkan untuk
   alat pendukung yang ingin mengintrospeksi dump tersebut.

### [Docker](https://github.com/nodejs/docker-node)

Tujuan Kelompok Kerja Docker adalah untuk membangun, memelihara, dan meningkatkan pejabat
Images Docker untuk proyek Node.js.

Tanggung jawab meliputi:

* Menjaga image Docker resmi diperbarui sejalan dengan rilis Node.js baru.
* Putuskan dan terapkan peningkatan dan/atau perbaikan image.
* Memelihara dan meningkatkan dokumentasi image.

### [Evangelism](https://github.com/nodejs/evangelism)

Kelompok Kerja Evangelism mempromosikan pencapaian
dari Node.js dan memberi tahu komunitas bagaimana mereka bisa terlibat.

Tanggung jawab meliputi:

* Memfasilitasi pengiriman pesan proyek.
* Mengelola media sosial proyek resmi.
* Menangani promosi pembicara untuk pertemuan dan konferensi.
* Menangani promosi acara komunitas.
* Menerbitkan ringkasan pembaruan rutin dan promosi lainnya
   isi.

### [i18n](https://github.com/nodejs/i18n)

Kelompok Kerja i18n menangani lebih dari sekedar penerjemahan. Mereka
adalah titik akhir bagi anggota komunitas untuk berkolaborasi dengan masing-masing
lain dalam bahasa pilihan mereka.

Setiap tim diatur dalam bahasa lisan yang sama. Setiap
komunitas bahasa kemudian dapat menghasilkan beberapa pelokalan untuk
berbagai sumber daya proyek.

Tanggung jawab meliputi:

* Menerjemahkan materi Node.js apa pun yang mereka yakini relevan dengan komunitas
   mereka.
* Meninjau proses untuk menjaga agar terjemahan tetap mutakhir dan berkualitas tinggi.
* Mengelola dan memantau saluran media sosial dalam bahasa mereka.
* Mempromosikan pembicara Node.js untuk pertemuan dan konferensi dalam bahasa mereka.

Setiap komunitas bahasa mempertahankan keanggotaannya sendiri.

* [nodejs-ar - Arabic (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [Pemeliharaan Paket](https://github.com/nodejs/package-maintenance)

Tanggung jawab meliputi:

* Membangun, mendokumentasikan, dan panduan evangeliz, alat, dan proses yang memudahkan pengelola untuk
  memelihara paket dan menerima bantuan dari mereka yang bergantung pada paket mereka.
* Manajemen repositori dalam [pkgjs](https://github.com/pkgjs)
  Organisasi GitHub termasuk namun tidak terbatas pada:
  * Mengelola daftar pemilik organisasi yang melengkapi standar
    Pemilik organisasi Node.js sebagaimana diuraikan dalam: <https://github.com/nodejs/admin/blob/master/GITHUB_ORG_MANAGEMENT_POLICY.md#owners>
  * Mengawasi repositori baru (membuat, memindahkan, menghapus)
  * Mengelola tim pengelola untuk semua repositori.
  * Kebijakan kontribusi untuk repositori
* Arahan teknis untuk proyek-proyek di dalam
  organisasi [pkgjs](https://github.com/pkgjs)
* Mengelola tim pengelola dan kebijakan kontribusi untuk
  repositori berikut
  * nodejs/ci-config-travis
  * nodejs/ci-config-github-actions
  * nodejs/package-maintenance repository.

### [Perilisan](https://github.com/nodejs/Release)

Kelompok Kerja Rilis mengelola proses rilis untuk Node.js.

Tanggung jawab meliputi:

* Tentukan proses rilis.
* Tentukan konten rilis.
* Hasilkan dan buat rilis.
* Uji Perilisan.
* Kelola Dukungan Jangka Panjang dan cabang Saat Ini termasuk
   mendukung perubahan ke cabang-cabang ini.
* Tentukan kebijakan untuk apa yang akan di-backport untuk merilis stream.

### [Keamanan](https://github.com/nodejs/security-wg)

Kelompok Kerja Keamanan mengelola semua aspek dan proses yang terkait dengan keamanan Node.js.

Tanggung jawab meliputi:

* Menentukan dan memelihara kebijakan dan prosedur keamanan untuk:
  * proyek inti Node.js
  * proyek lain yang dikelola oleh Komite Pengarah Teknis (TSC) Node.js.
* Bekerja dengan Platform Keamanan Node untuk membawa data kerentanan komunitas ke dalam
  yayasan sebagai aset bersama.
* Pastikan data kerentanan diperbarui secara efisien dan tepat waktu.
  Misalnya, memastikan ada proses pelaporan yang terdokumentasi dengan baik
  kerentanan dalam modul komunitas.
* Tinjau dan rekomendasikan proses untuk menangani laporan keamanan (tetapi bukan
  administrasi sebenarnya dari laporan keamanan, yang ditinjau oleh sekelompok orang
  didelegasikan langsung oleh TSC).
* Menetapkan dan memelihara kebijakan dan prosedur untuk koordinasi keamanan
  kekhawatiran dalam ekosistem sumber terbuka Node.js eksternal.
* Tawarkan bantuan kepada pengelola paket npm untuk memperbaiki bug keamanan berdampak tinggi.
* Menjaga dan menyediakan data tentang kerentanan keamanan yang diungkapkan di:
  * proyek inti Node.js
  * proyek lain yang dikelola oleh grup teknis Yayasan Node.js
  * ekosistem sumber terbuka Node.js eksternal
* Mempromosikan peningkatan praktik keamanan dalam ekosistem Node.js.
* Merekomendasikan peningkatan keamanan untuk proyek inti Node.js.
* Memfasilitasi dan mempromosikan perluasan layanan dan produk keamanan yang sehat
  akan ekosistem penyedia.
### [Streams](https://github.com/nodejs/readable-stream)

Kelompok Kerja Streams didedikasikan untuk mendukung dan meningkatkan
Streaming API seperti yang digunakan di Node.js dan ekosistem npm. Kami berusaha untuk membuat
API yang dapat dikomposisi yang memecahkan masalah merepresentasikan banyak kejadian
dari suatu peristiwa dari waktu ke waktu dengan cara yang manusiawi dan rendah biaya. Perbaikan pada
API akan didorong oleh kebutuhan ekosistem; interoperabilitas dan
kompatibilitas mundur dengan solusi lain dan versi sebelumnya adalah yang terpenting
dalam pentingnya.

Tanggung jawab meliputi:

* Mengatasi masalah stream pada pelacak masalah Node.js.
* Penulisan dan pengeditan dokumentasi stream dalam proyek Node.js.
* Meninjau perubahan pada subkelas streaming dalam proyek Node.js.
* Mengarahkan perubahan stream dari proyek Node.js ke proyek ini.
* Membantu implementasi penyedia stream dalam Node.js.
* Merekomendasikan versi `readable-stream` untuk disertakan dalam Node.js.
* Pesan tentang masa depan stream untuk memberikan pemberitahuan terlebih dahulu kepada komunitas tentang perubahan.
