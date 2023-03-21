---
title: Pembuatan profil yang mudah untuk Aplikasi Node.js
layout: docs.hbs
---

# Pembuatan profil mudah untuk Aplikasi Node.js

Ada banyak alat pihak ketiga yang tersedia untuk membuat profil aplikasi Node.js tetapi, dalam banyak kasus, opsi termudah adalah menggunakan profiler bawaan Node.js. Profiler bawaan menggunakan [profiler di dalam V8][] yang mengambil sampel tumpukan di interval reguler selama eksekusi program. Ini mencatat hasil ini sampel, bersama dengan peristiwa pengoptimalan penting seperti kompilasi jit, sebagai serangkaian kutu:

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```

Di masa lalu, Anda memerlukan kode sumber V8 untuk dapat menafsirkan kutu. Untungnya, alat telah diperkenalkan sejak Node.js 4.4.0 yang memfasilitasi konsumsi informasi ini tanpa membangun V8 secara terpisah dari sumbernya. Mari kita lihat bagaimana profiler bawaan dapat membantu memberikan wawasan tentang aplikasi pertunjukan.

Untuk mengilustrasikan penggunaan profiler centang, kami akan bekerja dengan Express . sederhana aplikasi. Aplikasi kami akan memiliki dua penangan, satu untuk menambahkan pengguna baru ke sistem kami:

```javascript
app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[username] = { salt, hash };

  res.sendStatus(200);
});
```

dan satu lagi untuk memvalidasi upaya otentikasi pengguna:

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  const { salt, hash } = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  if (crypto.timingSafeEqual(hash, encryptHash)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});
```

*Harap dicatat bahwa ini BUKAN penangan yang disarankan untuk mengautentikasi pengguna di aplikasi Node.js Anda dan digunakan murni untuk tujuan ilustrasi. Anda tidak boleh mencoba merancang mekanisme otentikasi kriptografi Anda sendiri secara umum. Jauh lebih baik menggunakan solusi autentikasi yang sudah ada dan terbukti.*

Sekarang asumsikan bahwa kami telah menerapkan aplikasi kami dan pengguna mengeluh tentang latensi tinggi pada permintaan. Kami dapat dengan mudah menjalankan aplikasi dengan profiler bawaan:

```
NODE_ENV=production node --prof app.js
```

dan letakkan beberapa beban di server menggunakan `ab` (ApacheBench):

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

dan dapatkan output ab dari:

```
Concurrency Level:      20
Time taken for tests:   46.932 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    5.33 [#/sec] (mean)
Time per request:       3754.556 [ms] (mean)
Time per request:       187.728 [ms] (mean, across all concurrent requests)
Transfer rate:          1.05 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (longest request)
```

Dari output ini, kami melihat bahwa kami hanya berhasil melayani sekitar 5 permintaan per detik dan rata-rata permintaan hanya membutuhkan waktu kurang dari 4 detik pulang pergi. Di sebuah contoh dunia nyata, kita bisa melakukan banyak pekerjaan di banyak fungsi atas nama dari permintaan pengguna tetapi bahkan dalam contoh sederhana kami, waktu kompilasi bisa hilang ekspresi reguler, menghasilkan garam acak, menghasilkan hash unik dari pengguna kata sandi, atau di dalam kerangka kerja Express itu sendiri.

Karena kami menjalankan aplikasi kami menggunakan opsi `--prof`, file centang dibuat di direktori yang sama dengan aplikasi yang dijalankan secara lokal. Itu harus memiliki bentuk `isolate-0xnnnnnnnnnnnn-v8.log` (di mana `n` adalah digit).

Untuk memahami file ini, kita perlu menggunakan prosesor centang yang dibundel dengan biner Node.js. Untuk menjalankan prosesor, gunakan flag `--prof-process`:

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

Membuka diproses.txt di editor teks favorit Anda akan memberi Anda beberapa perbedaan jenis informasi. File dipecah menjadi beberapa bagian yang rusak lagi sampai dengan bahasa. Pertama, kita melihat bagian ringkasan dan melihat:

```
 [Summary]:
   ticks  total  nonlib   name
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          Shared libraries
    215    0.6%          Unaccounted
```

Ini memberitahu kita bahwa 97% dari semua sampel yang dikumpulkan terjadi dalam kode C++ dan itu saat melihat bagian lain dari output yang diproses, kita harus lebih memperhatikan untuk pekerjaan yang dilakukan di C++ (sebagai lawan dari JavaScript). Dengan mengingat hal ini, kita selanjutnya temukan bagian \[C++\] yang berisi informasi tentang fungsi C++ yang mana mengambil waktu CPU paling banyak dan lihat:

```
 [C++]:
   ticks  total  nonlib   name
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```

Kami melihat bahwa 3 entri teratas menyumbang 72,1% dari waktu CPU yang diambil oleh program. Dari output ini, kita langsung melihat bahwa setidaknya 51,8% dari waktu CPU adalah diambil oleh fungsi yang disebut PBKDF2 yang sesuai dengan generasi hash kami dari kata sandi pengguna. Namun, mungkin tidak segera jelas bagaimana yang lebih rendah dua faktor entri ke dalam aplikasi kami (atau jika ya, kami akan berpura-pura sebaliknya demi contoh). Untuk lebih memahami hubungan antara ini fungsi, selanjutnya kita akan melihat bagian \[Profil bawah (berat)\] yang memberikan informasi tentang pemanggil utama dari setiap fungsi. Memeriksa ini bagian, kami menemukan:

```
   ticks parent  name
  19557   51.8%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
  19557  100.0%    v8::internal::Builtins::~Builtins()
  19557  100.0%      LazyCompile: ~pbkdf2 crypto.js:557:16

   4510   11.9%  _sha1_block_data_order
   4510  100.0%    LazyCompile: *pbkdf2 crypto.js:557:16
   4510  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30

   3165    8.4%  _malloc_zone_malloc
   3161   99.9%    LazyCompile: *pbkdf2 crypto.js:557:16
   3161  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30
```

Parsing bagian ini membutuhkan sedikit lebih banyak pekerjaan daripada jumlah centang mentah di atas. Dalam setiap "tumpukan panggilan" di atas, persentase di kolom induk memberi tahu Anda persentase sampel yang fungsinya pada baris di atas adalah dipanggil oleh fungsi di baris saat ini. Misalnya, di tengah "panggilan stack" di atas untuk _sha1_block_data_order, kita melihat bahwa `_sha1_block_data_order` terjadi di 11,9% sampel, yang kami ketahui dari jumlah mentah di atas. Namun, di sini, kami juga dapat mengatakan bahwa itu selalu dipanggil oleh fungsi pbkdf2 di dalam Modul kripto Node.js. Kami melihat bahwa dengan cara yang sama, `_malloc_zone_malloc` dipanggil hampir secara eksklusif oleh fungsi pbkdf2 yang sama. Jadi, dengan menggunakan informasi dalam tampilan ini, kami dapat mengetahui bahwa perhitungan hash kami dari kata sandi pengguna menyumbang tidak hanya untuk 51,8% dari atas tetapi juga untuk semua waktu CPU di atas 3 fungsi yang paling banyak sampelnya sejak panggilan ke `_sha1_block_data_order` dan `_malloc_zone_malloc` dibuat atas nama fungsi pbkdf2.

Pada titik ini, sangat jelas bahwa pembuatan hash berbasis kata sandi harus menjadi target optimasi kami. Untungnya, Anda telah sepenuhnya menginternalisasi [manfaat pemrograman asinkron][] dan Anda menyadari bahwa bekerja untuk menghasilkan hash dari kata sandi pengguna sedang dilakukan dengan cara yang sinkron dan sehingga mengikat loop acara. Ini mencegah kami untuk mengerjakan entri lain permintaan saat menghitung hash.

Untuk mengatasi masalah ini, Anda membuat sedikit modifikasi pada penangan di atas untuk digunakan versi asinkron dari fungsi pbkdf2:

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
    if (users[username].hash.toString() === hash.toString()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});
```

Benchmark ab yang baru dijalankan di atas dengan versi asinkron aplikasi Anda hasil:

```
Concurrency Level:      20
Time taken for tests:   12.846 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    19.46 [#/sec] (mean)
Time per request:       1027.689 [ms] (mean)
Time per request:       51.384 [ms] (mean, across all concurrent requests)
Transfer rate:          3.82 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   1018
  66%   1035
  75%   1041
  80%   1043
  90%   1049
  95%   1063
  98%   1070
  99%   1071
 100%   1079 (longest request)
```

YEEEY! Aplikasi Anda sekarang melayani sekitar 20 permintaan per detik, kira-kira 4 kali lebih banyak dibandingkan dengan generasi hash sinkron. Selain itu, rata-rata latensi turun dari 4 detik sebelumnya menjadi lebih dari 1 detik.

Semoga melalui investigasi kinerja ini (diakui dibikin) contoh, Anda telah melihat bagaimana prosesor tick V8 dapat membantu Anda mendapatkan yang lebih baik pemahaman tentang kinerja aplikasi Node.js Anda.

Anda juga dapat menemukan [bagaimana untuk membuat grafik nyala][flamegraph diagnostik] bermanfaat.

[profiler di dalam V8]: https://v8.dev/docs/profile
[manfaat pemrograman asinkron]: https://nodesource.com/blog/why-asynchronous
[flamegraph diagnostik]: /id/docs/guides/diagnostics-flamegraph/
