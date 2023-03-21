---
title: Jangan Blokir Event Loop (atau Worker Pool)
layout: docs.hbs
---

# Jangan Blokir Event Loop (atau Worker Pool)

## Haruskah Anda membaca panduan ini?
Jika Anda menulis sesuatu yang lebih rumit daripada skrip baris perintah singkat, membaca ini akan membantu Anda menulis aplikasi dengan kinerja lebih tinggi dan lebih aman.

Dokumen ini ditulis dengan mempertimbangkan server Node.js, tetapi konsepnya juga berlaku untuk aplikasi Node.js yang kompleks. Di mana detail spesifik OS bervariasi, dokumen ini berpusat pada Linux.

## Ringkasan
Node.js menjalankan kode JavaScript di Event Loop (inisialisasi dan callback), dan menawarkan Worker Pool untuk menangani tugas-tugas mahal seperti file I/O. Skala Node.js baik, terkadang lebih baik daripada pendekatan kelas berat seperti Apache. Rahasia skalabilitas Node.js adalah ia menggunakan sejumlah kecil utas untuk menangani banyak klien. Jika Node.js dapat bekerja dengan lebih sedikit utas, maka Node.js dapat menghabiskan lebih banyak waktu dan memori sistem Anda untuk bekerja pada klien daripada membayar overhead ruang dan waktu untuk utas (memori, pengalihan konteks). Tetapi karena Node.js hanya memiliki beberapa utas, Anda harus menyusun aplikasi Anda untuk menggunakannya dengan bijak.

Berikut adalah aturan praktis yang baik untuk menjaga kecepatan server Node.js Anda: *Node.js cepat ketika pekerjaan yang terkait dengan setiap klien pada waktu tertentu adalah "kecil"*.

Ini berlaku untuk callback di Event Loop dan tugas di Worker Pool.

## Mengapa saya harus menghindari pemblokiran Event Loop dan Worker Pool?
Node.js menggunakan sejumlah kecil utas untuk menangani banyak klien. Di Node.js ada dua jenis utas: satu Loop Peristiwa (alias loop utama, utas utama, utas acara, dll.), dan kumpulan `k` Pekerja di Kumpulan Pekerja (alias threadpool).

Jika utas membutuhkan waktu lama untuk menjalankan panggilan balik (Loop Peristiwa) atau tugas (Pekerja), kami menyebutnya "diblokir". Sementara utas diblokir bekerja atas nama satu klien, itu tidak dapat menangani permintaan dari klien lain. Ini memberikan dua motivasi untuk memblokir baik Event Loop maupun Worker Pool:

1. Kinerja: Jika Anda secara teratur melakukan aktivitas kelas berat pada kedua jenis utas, *throughput* (permintaan/detik) server Anda akan terganggu.
2. Keamanan: Jika mungkin untuk input tertentu salah satu utas Anda mungkin diblokir, klien jahat dapat mengirimkan "masukan jahat" ini, membuat utas Anda diblokir, dan mencegahnya bekerja pada klien lain. Ini akan menjadi serangan [Denial of Service](https://en.wikipedia.org/wiki/Denial-of-service_attack).

## Ulasan singkat tentang Node

Node.js menggunakan Event-Driven Architecture: ia memiliki Event Loop untuk orkestrasi dan Worker Pool untuk tugas-tugas mahal.

### Kode apa yang berjalan di Event Loop?
Saat dimulai, aplikasi Node.js pertama-tama menyelesaikan fase inisialisasi, `memerlukan` modul dan mendaftarkan callback untuk event. Aplikasi Node.js kemudian masuk ke Event Loop, menanggapi permintaan klien yang masuk dengan mengeksekusi callback yang sesuai. Callback ini dijalankan secara sinkron, dan dapat mendaftarkan permintaan asinkron untuk melanjutkan pemrosesan setelah selesai. Callback untuk permintaan asinkron ini juga akan dijalankan di Event Loop.

Loop Peristiwa juga akan memenuhi permintaan asinkron non-pemblokiran yang dibuat oleh panggilan baliknya, mis., I/O jaringan.

Singkatnya, Event Loop mengeksekusi callback JavaScript yang terdaftar untuk event, dan juga bertanggung jawab untuk memenuhi permintaan asinkron yang tidak memblokir seperti I/O jaringan.

### Kode apa yang berjalan di Worker Pool?
Kumpulan Pekerja Node.js diimplementasikan di libuv ([docs](http://docs.libuv.org/en/v1.x/threadpool.html)), yang memperlihatkan API pengiriman tugas umum.

Node.js menggunakan Worker Pool untuk menangani tugas-tugas "mahal". Ini termasuk I/O yang sistem operasinya tidak menyediakan versi non-pemblokiran, serta tugas-tugas yang secara khusus menggunakan CPU.

Ini adalah API modul Node.js yang menggunakan Worker Pool ini:

1. I/O-intensif
    1. [DNS](https://nodejs.org/api/dns.html): `dns.lookup()`, `dns.lookupService()`.
    2. [Sistem File](https://nodejs.org/api/fs.html#fs_threadpool_usage): Semua API sistem file kecuali `fs.FSWatcher()` dan yang secara eksplisit sinkron menggunakan threadpool libuv.
2. CPU-intensif
    1. [Crypto](https://nodejs.org/api/crypto.html): `crypto.pbkdf2()`, `crypto.scrypt()`, `crypto.randomBytes()`, `crypto.randomFill( )`, `crypto.generateKeyPair()`.
    2. [Zlib](https://nodejs.org/api/zlib.html#zlib_threadpool_usage): Semua zlib API kecuali yang secara eksplisit sinkron menggunakan threadpool libuv.

Di banyak aplikasi Node.js, API ini adalah satu-satunya sumber tugas untuk Worker Pool. Aplikasi dan modul yang menggunakan [add-on C++](https://nodejs.org/api/addons.html) dapat mengirimkan tugas lain ke Worker Pool.

Demi kelengkapan, kami mencatat bahwa ketika Anda memanggil salah satu API ini dari callback di Event Loop, Event Loop membayar beberapa biaya penyiapan kecil saat memasuki binding C++ Node.js untuk API tersebut dan mengirimkan tugas ke kolam pekerja. Biaya ini dapat diabaikan dibandingkan dengan biaya keseluruhan tugas, itulah sebabnya Event Loop membongkarnya. Saat mengirimkan salah satu tugas ini ke Worker Pool, Node.js memberikan pointer ke fungsi C++ yang sesuai di binding C++ Node.js.

### Bagaimana Node.js memutuskan kode apa yang akan dijalankan selanjutnya?
Secara abstrak, Event Loop dan Worker Pool masing-masing mempertahankan antrian untuk event yang tertunda dan tugas yang tertunda.

Sebenarnya, Event Loop tidak benar-benar mempertahankan antrian. Sebaliknya, ia memiliki kumpulan deskriptor file yang meminta sistem operasi untuk memantau, menggunakan mekanisme seperti [epoll](http://man7.org/linux/man-pages/man7/epoll.7.html) (Linux ), [kqueue](https://developer.apple.com/library/content/documentation/Darwin/Conceptual/FSEvents_ProgGuide/KernelQueues/KernelQueues.html) (OSX), port peristiwa (Solaris), atau [IOCP](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365198.aspx) (Windows). Deskriptor file ini sesuai dengan soket jaringan, file apa pun yang ditontonnya, dan sebagainya. Ketika sistem operasi mengatakan bahwa salah satu deskriptor file ini sudah siap, Loop Peristiwa menerjemahkannya ke peristiwa yang sesuai dan memanggil panggilan balik yang terkait dengan peristiwa itu. Anda dapat mempelajari lebih lanjut tentang proses ini [di sini](https://www.youtube.com/watch?v=P9csgxBgaZ8).

Sebaliknya, Worker Pool menggunakan antrian nyata yang entrinya adalah tugas untuk diproses. Worker mengeluarkan tugas dari antrian ini dan mengerjakannya, dan ketika selesai Worker memunculkan acara "Setidaknya satu tugas selesai" untuk Event Loop.

### Apa artinya ini bagi desain aplikasi?
Dalam sistem satu utas per klien seperti Apache, setiap klien yang tertunda diberi utasnya sendiri. Jika utas menangani satu blok klien, sistem operasi akan menginterupsinya dan memberi klien lain giliran. Sistem operasi dengan demikian memastikan bahwa klien yang membutuhkan sedikit pekerjaan tidak dikenakan sanksi oleh klien yang membutuhkan lebih banyak pekerjaan.

Karena Node.js menangani banyak klien dengan sedikit utas, jika utas memblokir menangani satu permintaan klien, maka permintaan klien yang tertunda mungkin tidak mendapat giliran sampai utas menyelesaikan panggilan balik atau tugasnya. *Perlakuan yang adil terhadap klien adalah tanggung jawab aplikasi Anda*. Ini berarti Anda tidak boleh melakukan terlalu banyak pekerjaan untuk klien mana pun dalam satu panggilan balik atau tugas.

Ini adalah bagian dari mengapa Node.js dapat menskalakan dengan baik, tetapi ini juga berarti bahwa Anda bertanggung jawab untuk memastikan penjadwalan yang adil. Bagian selanjutnya berbicara tentang cara memastikan penjadwalan yang adil untuk Loop Peristiwa dan untuk Kelompok Pekerja.

## Jangan blokir Event Loop
Loop Peristiwa memperhatikan setiap koneksi klien baru dan mengatur pembuatan respons. Semua permintaan masuk dan tanggapan keluar melewati Event Loop. Ini berarti bahwa jika Loop Peristiwa menghabiskan waktu terlalu lama di titik mana pun, semua klien saat ini dan klien baru tidak akan mendapat giliran.

Anda harus memastikan bahwa Anda tidak pernah memblokir Event Loop. Dengan kata lain, setiap callback JavaScript Anda harus selesai dengan cepat. Ini tentu saja juga berlaku untuk `await` Anda, `Promise.then` Anda, dan seterusnya.

Cara yang baik untuk memastikan ini adalah dengan mempertimbangkan ["kompleksitas komputasi"](https://en.wikipedia.org/wiki/Time_complexity) dari panggilan balik Anda. Jika panggilan balik Anda mengambil jumlah langkah yang konstan, apa pun argumennya, maka Anda akan selalu memberikan giliran yang adil kepada setiap klien yang menunggu keputusan. Jika panggilan balik Anda mengambil jumlah langkah yang berbeda tergantung pada argumennya, maka Anda harus memikirkan berapa lama argumennya.

Contoh 1: Panggilan balik waktu konstan.

```javascript
app.get('/constant-time', (req, res) => {
  res.sendStatus(200);
});
```

Contoh 2: Panggilan balik `O(n)`. Callback ini akan berjalan cepat untuk `n` kecil dan lebih lambat untuk `n` besar.

```javascript
app.get('/countToN', (req, res) => {
  let n = req.query.n;

  // n iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    console.log(`Iter ${i}`);
  }

  res.sendStatus(200);
});
```

Contoh 3: Panggilan balik `O(n^2)`. Callback ini akan tetap berjalan dengan cepat untuk `n` kecil, tetapi untuk `n` besar akan berjalan jauh lebih lambat daripada contoh `O(n)` sebelumnya.

```javascript
app.get('/countToN2', (req, res) => {
  let n = req.query.n;

  // n^2 iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`Iter ${i}.${j}`);
    }
  }

  res.sendStatus(200);
});
```

### Seberapa hati-hati Anda seharusnya?
Node.js menggunakan mesin Google V8 untuk JavaScript, yang cukup cepat untuk banyak operasi umum. Pengecualian untuk aturan ini adalah operasi regexps dan JSON, yang dibahas di bawah ini.

Namun, untuk tugas yang kompleks, Anda harus mempertimbangkan untuk membatasi input dan menolak input yang terlalu panjang. Dengan begitu, bahkan jika panggilan balik Anda memiliki kompleksitas yang besar, dengan membatasi input, Anda memastikan bahwa panggilan balik tidak dapat memakan waktu lebih dari waktu terburuk pada input terlama yang dapat diterima. Anda kemudian dapat mengevaluasi biaya kasus terburuk dari panggilan balik ini dan menentukan apakah waktu berjalannya dapat diterima dalam konteks Anda.

### Memblokir Loop Acara: REDOS
Salah satu cara umum untuk memblokir Loop Peristiwa secara fatal adalah dengan menggunakan [ekspresi reguler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) yang "rentan".

#### Menghindari ekspresi reguler yang rentan
Ekspresi reguler (regexp) mencocokkan string input dengan pola. Kami biasanya menganggap kecocokan regexp membutuhkan satu lintasan melalui string input --- `O(n)` waktu di mana `n` adalah panjang string input. Dalam banyak kasus, satu pass memang diperlukan. Sayangnya, dalam beberapa kasus, pencocokan regexp mungkin memerlukan jumlah perjalanan eksponensial melalui string input --- waktu `O(2^n)`. Jumlah perjalanan eksponensial berarti bahwa jika mesin memerlukan perjalanan `x` untuk menentukan kecocokan, itu akan membutuhkan perjalanan `2*x` jika kita menambahkan hanya satu karakter lagi ke string input. Karena jumlah perjalanan berbanding lurus dengan waktu yang dibutuhkan, efek dari evaluasi ini adalah memblokir Loop Peristiwa.

*Ekspresi reguler yang rentan* adalah ekspresi yang mungkin memerlukan waktu eksponensial untuk mesin ekspresi reguler Anda, yang memaparkan Anda ke [REDOS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) pada "input jahat". Apakah pola ekspresi reguler Anda rentan atau tidak (yaitu mesin regexp mungkin membutuhkan waktu eksponensial) sebenarnya adalah pertanyaan yang sulit untuk dijawab, dan bervariasi tergantung pada apakah Anda menggunakan Perl, Python, Ruby, Java, JavaScript, dll., tetapi berikut adalah beberapa aturan praktis yang berlaku di semua bahasa ini:

1. Hindari quantifier bersarang seperti `(a+)*`. Mesin regexp V8 dapat menangani beberapa di antaranya dengan cepat, tetapi yang lain rentan.
2. Hindari OR dengan klausa yang tumpang tindih, seperti `(a|a)*`. Sekali lagi, ini terkadang-cepat.
3. Hindari menggunakan referensi balik, seperti `(a.*) \1`. Tidak ada mesin regexp yang dapat menjamin evaluasi ini dalam waktu linier.
4. Jika Anda melakukan pencocokan string sederhana, gunakan `indexOf` atau yang setara dengan lokal. Ini akan lebih murah dan tidak akan pernah memakan waktu lebih dari `O(n)`.

Jika Anda tidak yakin apakah ekspresi reguler Anda rentan, ingatlah bahwa Node.js umumnya tidak mengalami kesulitan untuk melaporkan *kecocokan* bahkan untuk regexp yang rentan dan string input yang panjang. Perilaku eksponensial dipicu ketika ada ketidakcocokan tetapi Node.js tidak dapat memastikannya sampai mencoba banyak jalur melalui string input.

#### Contoh REDOS
Berikut adalah contoh regexp yang rentan mengekspos servernya ke REDOS:

```javascript
app.get('/redos-me', (req, res) => {
  let filePath = req.query.filePath;

  // REDOS
  if (filePath.match(/(\/.+)+$/)) {
    console.log('valid path');
  }
  else {
    console.log('invalid path');
  }

  res.sendStatus(200);
});
```

Regexp yang rentan dalam contoh ini adalah cara (buruk!) untuk memeriksa jalur yang valid di Linux. Ini cocok dengan string yang merupakan urutan nama yang dibatasi "/", seperti "/a/b/c". Ini berbahaya karena melanggar aturan 1: ia memiliki quantifier bersarang ganda.

Jika klien bertanya dengan filePath `///.../\n` (100 / diikuti oleh karakter baris baru yang "." regexp tidak akan cocok), maka Loop Peristiwa akan berlangsung selamanya, memblokir Putaran Acara. Serangan REDOS klien ini menyebabkan semua klien lain tidak mendapatkan giliran sampai pencocokan regexp selesai.

Untuk alasan ini, Anda harus waspada menggunakan ekspresi reguler yang kompleks untuk memvalidasi input pengguna.

#### Sumber Daya Anti-REDOS
Ada beberapa alat untuk memeriksa regexps Anda untuk keamanan, seperti

* [safe-regex](https://github.com/davisjam/safe-regex)
* [rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/). Namun, tak satu pun dari ini akan menangkap semua regexps yang rentan.

Pendekatan lain adalah dengan menggunakan mesin regexp yang berbeda. Anda dapat menggunakan modul [node-re2](https://github.com/uhop/node-re2), yang menggunakan mesin regexp [RE2](https://github.com/google/re2) yang sangat cepat dari Google. Namun berhati-hatilah, RE2 tidak 100% kompatibel dengan regexps V8, jadi periksa regresi jika Anda menukar modul node-re2 untuk menangani regexps Anda. Dan regexp yang sangat rumit tidak didukung oleh node-re2.

Jika Anda mencoba mencocokkan sesuatu yang "jelas", seperti URL atau jalur file, temukan contoh di [perpustakaan regexp](http://www.regexlib.com) atau gunakan modul npm, mis. [ip-regex](https://www.npmjs.com/package/ip-regex).

### Memblokir Loop Peristiwa: Modul inti Node.js
Beberapa modul inti Node.js memiliki API mahal yang sinkron, termasuk:

* [Enkripsi](https://nodejs.org/api/crypto.html)
* [Kompresi](https://nodejs.org/api/zlib.html)
* [Sistem file](https://nodejs.org/api/fs.html)
* [Proses turunan](https://nodejs.org/api/child_process.html)

API ini mahal, karena melibatkan komputasi yang signifikan (enkripsi, kompresi), memerlukan I/O (file I/O), atau berpotensi keduanya (Child Process). API ini dimaksudkan untuk kenyamanan skrip, tetapi tidak dimaksudkan untuk digunakan dalam konteks server. Jika Anda menjalankannya di Event Loop, mereka akan membutuhkan waktu lebih lama untuk diselesaikan daripada instruksi JavaScript biasa, memblokir Event Loop.

Di server, *Anda tidak boleh menggunakan API sinkron berikut dari modul ini*:

* Enkripsi:
  * `crypto.randomBytes` (versi sinkron)
  * `crypto.randomFillSync`
  * `crypto.pbkdf2Sync`
  * Anda juga harus berhati-hati dalam memberikan masukan besar ke rutinitas enkripsi dan dekripsi.
* Kompresi:
  * `zlib.inflateSync`
  * `zlib.deflateSync`
* Berkas sistem:
  * Jangan gunakan API sistem file sinkron. Misalnya, jika file yang Anda akses berada dalam [sistem file terdistribusi](https://en.wikipedia.org/wiki/Clustered_file_system#Distributed_file_systems) seperti [NFS](https://en.wikipedia.org/wiki/Network_File_System), waktu akses dapat sangat bervariasi.
* Child Process:
  * `child_process.spawnSync`
  * `child_process.execSync`
  * `child_process.execFileSync`

Daftar ini cukup lengkap pada Node.js v9.

### Memblokir Loop Peristiwa: JSON DOS
`JSON.parse` dan `JSON.stringify` adalah operasi lain yang berpotensi mahal. Meskipun ini adalah `O(n)` dalam panjang input, untuk `n` besar mereka bisa memakan waktu sangat lama.

Jika server Anda memanipulasi objek JSON, terutama objek dari klien, Anda harus berhati-hati dengan ukuran objek atau string yang Anda gunakan di Event Loop.

Contoh: pemblokiran JSON. Kami membuat objek `obj` dengan ukuran 2^21 dan `JSON.stringify`, menjalankan `indexOf` pada string, lalu JSON.parse. String `JSON.stringify`'d berukuran 50MB. Dibutuhkan 0,7 detik untuk merangkai objek, 0,03 detik untuk indexOf pada string 50MB, dan 1,3 detik untuk mengurai string.

```javascript
var obj = { a: 1 };
var niter = 20;

var before, str, pos, res, took;

for (var i = 0; i < niter; i++) {
  obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
}

before = process.hrtime();
str = JSON.stringify(obj);
took = process.hrtime(before);
console.log('JSON.stringify took ' + took);

before = process.hrtime();
pos = str.indexOf('nomatch');
took = process.hrtime(before);
console.log('Pure indexof took ' + took);

before = process.hrtime();
res = JSON.parse(str);
took = process.hrtime(before);
console.log('JSON.parse took ' + took);
```

Ada modul npm yang menawarkan API JSON asinkron. Lihat misalnya:

* [JSONStream](https://www.npmjs.com/package/JSONStream), yang memiliki API streaming.
* [JSON Ramah Besar](https://www.npmjs.com/package/bfj), yang memiliki API aliran serta versi asinkron dari API JSON standar menggunakan paradigma partisi-on-the-Event-Loop yang diuraikan di bawah.

### Perhitungan rumit tanpa memblokir Event Loop
Misalkan Anda ingin melakukan perhitungan kompleks dalam JavaScript tanpa memblokir Event Loop. Anda memiliki dua opsi: mempartisi atau membongkar.

#### Partisi
Anda dapat *mempartisi* perhitungan Anda sehingga masing-masing berjalan pada Loop Peristiwa tetapi secara teratur menghasilkan (memberikan giliran ke) peristiwa tertunda lainnya. Dalam JavaScript, mudah untuk menyimpan status tugas yang sedang berlangsung dalam penutupan, seperti yang ditunjukkan pada contoh 2 di bawah ini.

Sebagai contoh sederhana, misalkan Anda ingin menghitung rata-rata angka `1` hingga `n`.

Contoh 1: Rata-rata yang tidak dipartisi, biaya `O(n)`

```javascript
for (let i = 0; i < n; i++)
  sum += i;
let avg = sum / n;
console.log('avg: ' + avg);
```

Contoh 2: Rata-rata yang dipartisi, setiap langkah asinkron `n` berharga `O(1)`.

```javascript
function asyncAvg(n, avgCB) {
  // Save ongoing sum in JS closure.
  var sum = 0;
  function help(i, cb) {
    sum += i;
    if (i == n) {
      cb(sum);
      return;
    }

    // "Asynchronous recursion".
    // Schedule next operation asynchronously.
    setImmediate(help.bind(null, i+1, cb));
  }

  // Start the helper, with CB to call avgCB.
  help(1, function(sum){
      var avg = sum/n;
      avgCB(avg);
  });
}

asyncAvg(n, function(avg){
  console.log('avg of 1-n: ' + avg);
});
```

Anda dapat menerapkan prinsip ini pada iterasi array dan sebagainya.

#### Menurunkan
Jika Anda perlu melakukan sesuatu yang lebih kompleks, mempartisi bukanlah pilihan yang baik. Ini karena mempartisi hanya menggunakan Event Loop, dan Anda tidak akan mendapat manfaat dari banyak inti yang hampir pasti tersedia di mesin Anda. *Ingat, Event Loop harus mengatur permintaan klien, bukan memenuhinya sendiri.* Untuk tugas yang rumit, pindahkan pekerjaan dari Event Loop ke Worker Pool.

##### Cara membongkar
Anda memiliki dua opsi untuk Worker Pool tujuan yang akan digunakan untuk membongkar pekerjaan.

1. Anda dapat menggunakan Node.js Worker Pool bawaan dengan mengembangkan [addon C++](https://nodejs.org/api/addons.html). Pada Node versi lama, buat addon C++ Anda menggunakan [NAN](https://github.com/nodejs/nan), dan pada versi yang lebih baru gunakan [N-API](https://nodejs.org/api/n-api.html). [node-webworker-threads](https://www.npmjs.com/package/webworker-threads) menawarkan cara khusus JavaScript untuk mengakses Kumpulan Pekerja Node.js.
2. Anda dapat membuat dan mengelola Worker Pool Anda sendiri yang didedikasikan untuk komputasi daripada Worker Pool bertema I/O Node.js. Cara paling mudah untuk melakukannya adalah menggunakan [Child Process](https://nodejs.org/api/child_process.html) atau [Cluster](https://nodejs.org/api/cluster.html).

Anda seharusnya *tidak* hanya membuat [Child Process](https://nodejs.org/api/child_process.html) untuk setiap klien. Anda dapat menerima permintaan klien lebih cepat daripada membuat dan mengelola turunan, dan server Anda mungkin menjadi [bom garpu](https://en.wikipedia.org/wiki/Fork_bomb).

##### Kelemahan dari pembongkaran
Kelemahan dari pendekatan pembongkaran adalah menimbulkan biaya overhead dalam bentuk *biaya komunikasi*. Hanya Event Loop yang diizinkan untuk melihat "namespace" (status JavaScript) aplikasi Anda. Dari Worker, Anda tidak bisa memanipulasi objek JavaScript di namespace Event Loop. Sebagai gantinya, Anda harus membuat serial dan deserialize objek apa pun yang ingin Anda bagikan. Kemudian Worker dapat mengoperasikan salinannya sendiri dari objek-objek ini dan mengembalikan objek yang dimodifikasi (atau "patch") ke Event Loop.

Untuk masalah serialisasi, lihat bagian tentang JSON DOS.

##### Beberapa saran untuk pembongkaran
Anda mungkin ingin membedakan antara tugas-tugas CPU-intensif dan I/O-intensif karena mereka memiliki karakteristik yang sangat berbeda.

Tugas intensif CPU hanya membuat kemajuan saat Worker-nya dijadwalkan, dan Worker harus dijadwalkan ke salah satu [logical core](https://nodejs.org/api/os.html#os_os_cpus) mesin Anda. Jika Anda memiliki 4 inti logis dan 5 Pekerja, salah satu Pekerja ini tidak dapat membuat kemajuan. Akibatnya, Anda membayar overhead (biaya memori dan penjadwalan) untuk Pekerja ini dan tidak mendapatkan pengembalian untuk itu.

Tugas intensif I/O melibatkan permintaan dari penyedia layanan eksternal (DNS, sistem file, dll.) dan menunggu tanggapannya. Sementara seorang Pekerja dengan tugas intensif I/O sedang menunggu tanggapannya, tidak ada hal lain yang harus dilakukan dan dapat dibatalkan jadwalnya oleh sistem operasi, memberikan Pekerja lain kesempatan untuk mengajukan permintaan mereka. Dengan demikian, *tugas intensif I/O akan membuat kemajuan meskipun utas terkait tidak berjalan*. Penyedia layanan eksternal seperti database dan sistem file telah sangat dioptimalkan untuk menangani banyak permintaan yang tertunda secara bersamaan. Misalnya, sistem file akan memeriksa sekumpulan besar permintaan tulis dan baca yang tertunda untuk menggabungkan pembaruan yang bertentangan dan untuk mengambil file dalam urutan yang optimal (mis. lihat [slide ini](http://researcher.ibm.com/researcher/files/il-AVISHAY/01-block_io-v1.3.pdf)).

Jika Anda hanya mengandalkan satu Kelompok Pekerja, mis. Node.js Worker Pool, maka karakteristik yang berbeda dari pekerjaan yang terikat CPU dan yang terikat I/O dapat membahayakan kinerja aplikasi Anda.

Untuk alasan ini, Anda mungkin ingin mempertahankan Kumpulan Pekerja Komputasi yang terpisah.

#### Membongkar: kesimpulan
Untuk tugas-tugas sederhana, seperti mengulangi elemen-elemen array yang panjangnya sewenang-wenang, mempartisi mungkin merupakan pilihan yang baik. Jika komputasi Anda lebih kompleks, pembongkaran adalah pendekatan yang lebih baik: biaya komunikasi, yaitu overhead melewatkan objek serial antara Event Loop dan Worker Pool, diimbangi dengan manfaat menggunakan banyak inti.

Namun, jika server Anda sangat bergantung pada perhitungan yang rumit, Anda harus memikirkan apakah Node.js benar-benar cocok. Node.js unggul untuk pekerjaan terikat I/O, tetapi untuk komputasi yang mahal, ini mungkin bukan pilihan terbaik.

Jika Anda mengambil pendekatan pembongkaran, lihat bagian tentang tidak memblokir Kumpulan Pekerja.

## Jangan blokir Kelompok Pekerja
Node.js memiliki Worker Pool yang terdiri dari `k` Workers. Jika Anda menggunakan paradigma Pembongkaran yang dibahas di atas, Anda mungkin memiliki Kumpulan Pekerja Komputasi terpisah, yang menerapkan prinsip yang sama. Dalam kedua kasus tersebut, mari kita asumsikan bahwa `k` jauh lebih kecil daripada jumlah klien yang mungkin Anda tangani secara bersamaan. Ini sesuai dengan filosofi "satu utas untuk banyak klien" dari Node.js, rahasia skalabilitasnya.

Seperti dibahas di atas, setiap Pekerja menyelesaikan Tugasnya saat ini sebelum melanjutkan ke yang berikutnya di antrian Kumpulan Pekerja.

Sekarang, akan ada variasi dalam biaya Tugas yang diperlukan untuk menangani permintaan klien Anda. Beberapa Tugas dapat diselesaikan dengan cepat (misalnya membaca file pendek atau yang di-cache, atau menghasilkan sejumlah kecil byte acak), dan yang lain akan memakan waktu lebih lama (misalnya membaca file yang lebih besar atau tidak di-cache, atau menghasilkan lebih banyak byte acak). Tujuan Anda adalah untuk *meminimalkan variasi dalam waktu Tugas*, dan Anda harus menggunakan *Pembagian tugas* untuk mencapainya.

### Meminimalkan variasi waktu Tugas
Jika Tugas Pekerja saat ini jauh lebih mahal daripada Tugas lainnya, maka tugas tersebut tidak akan tersedia untuk mengerjakan Tugas lain yang tertunda. Dengan kata lain, *setiap Tugas yang relatif panjang secara efektif mengurangi ukuran Kelompok Pekerja sebanyak satu hingga selesai*. Ini tidak diinginkan karena, sampai titik tertentu, semakin banyak Pekerja di Kumpulan Pekerja, semakin besar throughput Kumpulan Pekerja (tugas/detik) dan dengan demikian semakin besar throughput server (permintaan klien/detik). Satu klien dengan Tugas yang relatif mahal akan menurunkan throughput Worker Pool, yang pada gilirannya menurunkan throughput server.

Untuk menghindari hal ini, Anda harus mencoba meminimalkan variasi panjang Tugas yang Anda kirimkan ke Kelompok Pekerja. Meskipun tepat untuk memperlakukan sistem eksternal yang diakses oleh permintaan I/O Anda (DB, FS, dll.) sebagai kotak hitam, Anda harus mengetahui biaya relatif dari permintaan I/O ini, dan harus menghindari pengiriman permintaan yang dapat Anda lakukan. berharap untuk menjadi sangat panjang.

Dua contoh harus menggambarkan kemungkinan variasi dalam waktu tugas.

#### Contoh variasi: Sistem file yang berjalan lama membaca
Misalkan server Anda harus membaca file untuk menangani beberapa permintaan klien. Setelah berkonsultasi dengan API Node.js [File system](https://nodejs.org/api/fs.html), Anda memilih untuk menggunakan `fs.readFile()` untuk kesederhanaan. Namun, `fs.readFile()` adalah ([saat ini](https://github.com/nodejs/node/pull/17054)) tidak dipartisi: ia mengirimkan satu Tugas `fs.read()` yang mencakup seluruh mengajukan. Jika Anda membaca file yang lebih pendek untuk beberapa pengguna dan file yang lebih panjang untuk yang lain, `fs.readFile()` dapat menyebabkan variasi yang signifikan dalam panjang Tugas, sehingga merugikan throughput Kumpulan Pekerja.

Untuk skenario terburuk, misalkan penyerang dapat meyakinkan server Anda untuk membaca file *arbitrary* (ini adalah [kerentanan traversal direktori](https://www.owasp.org/index.php/Path_Traversal)). Jika server Anda menjalankan Linux, penyerang dapat memberi nama file yang sangat lambat: [`/dev/random`](http://man7.org/linux/man-pages/man4/random.4.html). Untuk semua tujuan praktis, `/dev/random` sangat lambat, dan setiap Pekerja yang diminta untuk membaca dari `/dev/random` tidak akan pernah menyelesaikan Tugas itu. Penyerang kemudian mengirimkan permintaan `k`, satu untuk setiap Pekerja, dan tidak ada permintaan klien lain yang menggunakan Kumpulan Pekerja yang akan membuat kemajuan.

#### Contoh variasi: Operasi kripto yang berjalan lama
Misalkan server Anda menghasilkan byte acak yang aman secara kriptografis menggunakan [`crypto.randomBytes()`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback). `crypto.randomBytes()` tidak dipartisi: ia membuat satu Tugas `randomBytes()` untuk menghasilkan byte sebanyak yang Anda minta. Jika Anda membuat lebih sedikit byte untuk beberapa pengguna dan lebih banyak byte untuk yang lain, `crypto.randomBytes()` adalah sumber variasi lain dalam panjang Tugas.

### Pembagian tugas
Tugas dengan biaya waktu variabel dapat merusak throughput Worker Pool. Untuk meminimalkan variasi dalam waktu Tugas, sejauh mungkin Anda harus *mempartisi* setiap Tugas menjadi sub-Tugas dengan biaya yang sebanding. Ketika setiap sub-Tugas selesai, ia harus menyerahkan sub-Tugas berikutnya, dan ketika sub-Tugas terakhir selesai, ia harus memberi tahu pengirim.

Untuk melanjutkan contoh `fs.readFile()`, Anda sebaiknya menggunakan `fs.read()` (partisi manual) atau `ReadStream` (dipartisi secara otomatis).

Prinsip yang sama berlaku untuk tugas terikat CPU; contoh `asyncAvg` mungkin tidak sesuai untuk Loop Peristiwa, tetapi sangat cocok untuk Kumpulan Pekerja.

Saat Anda mempartisi Tugas menjadi sub-Tugas, Tugas yang lebih pendek diperluas menjadi sejumlah kecil sub-Tugas, dan Tugas yang lebih panjang diperluas menjadi lebih banyak sub-Tugas. Di antara setiap sub-Tugas dari Tugas yang lebih panjang, Pekerja yang ditugaskan dapat mengerjakan sub-Tugas dari Tugas lain yang lebih pendek, sehingga meningkatkan keseluruhan throughput Tugas dari Kumpulan Pekerja.

Perhatikan bahwa jumlah sub-Tugas yang diselesaikan bukanlah metrik yang berguna untuk throughput Worker Pool. Alih-alih, perhatikan jumlah *Tugas* yang diselesaikan.

### Menghindari pembagian tugas
Ingatlah bahwa tujuan dari pembagian Tugas adalah untuk meminimalkan variasi dalam waktu Tugas. Jika Anda dapat membedakan antara Tugas yang lebih pendek dan Tugas yang lebih panjang (mis. menjumlahkan larik vs. mengurutkan larik), Anda dapat membuat satu Kumpulan Pekerja untuk setiap kelas Tugas. Merutekan Tugas yang lebih pendek dan Tugas yang lebih panjang untuk memisahkan Kumpulan Pekerja adalah cara lain untuk meminimalkan variasi waktu Tugas.

Mendukung pendekatan ini, mempartisi Tugas menimbulkan overhead (biaya untuk membuat representasi Tugas Kumpulan Pekerja dan memanipulasi antrian Kumpulan Pekerja), dan menghindari pemartisian menghemat biaya perjalanan tambahan ke Kumpulan Pekerja. Ini juga mencegah Anda membuat kesalahan dalam mempartisi Tugas Anda.

Kelemahan dari pendekatan ini adalah bahwa Pekerja di semua Kumpulan Pekerja ini akan dikenakan overhead ruang dan waktu dan akan bersaing satu sama lain untuk waktu CPU. Ingatlah bahwa setiap Tugas yang terikat CPU membuat kemajuan hanya saat dijadwalkan. Akibatnya, Anda hanya harus mempertimbangkan pendekatan ini setelah analisis yang cermat.

### Kelompok Pekerja: kesimpulan
Baik Anda hanya menggunakan Kumpulan Pekerja Node.js atau memelihara Kumpulan Pekerja yang terpisah, Anda harus mengoptimalkan throughput Tugas dari Kumpulan Anda.

Untuk melakukannya, minimalkan variasi waktu tugas dengan menggunakan partisi tugas.

## Risiko modul npm
Sementara modul inti Node.js menawarkan blok bangunan untuk berbagai macam aplikasi, terkadang sesuatu yang lebih dibutuhkan. Pengembang Node.js sangat diuntungkan dari [ekosistem npm](https://www.npmjs.com/), dengan ratusan ribu modul yang menawarkan fungsionalitas untuk mempercepat proses pengembangan Anda.

Namun, ingat bahwa sebagian besar modul ini ditulis oleh pengembang pihak ketiga dan umumnya dirilis hanya dengan jaminan upaya terbaik. Pengembang yang menggunakan modul npm harus memperhatikan dua hal, meskipun yang terakhir sering dilupakan.

1. Apakah itu menghormati API-nya?
2. Mungkinkah API-nya memblokir Event Loop atau Worker? Banyak modul tidak berusaha menunjukkan biaya API mereka, sehingga merugikan komunitas.

Untuk API sederhana, Anda dapat memperkirakan biaya API; biaya manipulasi string tidak sulit untuk dipahami. Namun dalam banyak kasus, tidak jelas berapa biaya API.

*Jika Anda memanggil API yang mungkin melakukan sesuatu yang mahal, periksa kembali biayanya. Minta pengembang untuk mendokumentasikannya, atau periksa sendiri kode sumbernya (dan kirimkan PR yang mendokumentasikan biayanya).*

Ingat, meskipun API tidak sinkron, Anda tidak tahu berapa banyak waktu yang mungkin dihabiskan untuk Worker atau Event Loop di setiap partisinya. Misalnya, dalam contoh `asyncAvg` yang diberikan di atas, setiap panggilan ke fungsi helper dijumlahkan *setengah* dari angka, bukan salah satunya. Maka fungsi ini akan tetap asinkron, tetapi biaya setiap partisi adalah `O(n)`, bukan `O(1)`, sehingga kurang aman digunakan untuk nilai `n` yang berubah-ubah.

## Kesimpulan
Node.js memiliki dua jenis utas: satu Loop Peristiwa dan Pekerja `k`. Event Loop bertanggung jawab atas callback JavaScript dan I/O non-pemblokiran, dan Worker menjalankan tugas yang terkait dengan kode C++ yang menyelesaikan permintaan asinkron, termasuk memblokir I/O dan pekerjaan intensif CPU. Kedua jenis utas bekerja pada tidak lebih dari satu aktivitas pada satu waktu. Jika ada panggilan balik atau tugas yang membutuhkan waktu lama, utas yang menjalankannya menjadi *diblokir*. Jika aplikasi Anda membuat panggilan balik atau tugas pemblokiran, ini dapat menyebabkan penurunan throughput (klien/detik) paling baik, dan penolakan layanan total paling buruk.

Untuk menulis server web dengan throughput tinggi dan lebih tahan DoS, Anda harus memastikan bahwa pada input jinak dan berbahaya, Event Loop maupun Pekerja Anda tidak akan memblokir.
