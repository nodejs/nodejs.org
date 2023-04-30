---
title: Praktik Terbaik Keamanan Node.js
layout: docs.hbs
---

# Praktik Terbaik Keamanan Node.js

## Maksud

Dokumen ini bermaksud untuk memperluas [model ancaman][] saat ini dan memberikan pedoman yang ekstensif tentang cara mengamankan aplikasi Node.js.

## Isi Dokumen

* Praktik terbaik: Cara ringkas dan mudah untuk melihat praktik terbaik. Kami dapat menggunakan [masalah ini][security guidance issue] atau [panduan ini][nodejs guideline] sebagai titik awal. Penting untuk dicatat bahwa dokumen ini khusus untuk Node.js, jika Anda mencari sesuatu yang luas, pertimbangkan [Praktik Terbaik OSSF][].
* Enjelasan serangan: Menjelaskan dan mendokumentasikan dengan bahasa yang jelas dan contoh kode (jika memungkinkan) serangan yang disebutkan dalam model ancaman.
* Pustaka Pihak Ketiga: Mendefinisikan ancaman (serangan typo-squatting, paket berbahaya...) dan praktik terbaik sehubungan dengan dependensi modul node, dll...

## Daftar Ancaman

### Denial of Service dari server HTTP (CWE-400)

Ini adalah serangan di mana aplikasi menjadi tidak tersedia untuk tujuan yang dirancang karena cara memproses permintaan HTTP yang masuk. Permintaan ini tidak perlu sengaja dibuat oleh pelaku jahat: klien yang dikonfigurasi atau bermasalah juga dapat mengirim pola permintaan ke server yang mengakibatkan penolakan layanan.

Permintaan HTTP diterima oleh server HTTP Node.js dan diserahkan ke kode aplikasi melalui handler permintaan yang terdaftar. Server tidak mem-parsing isi dari badan permintaan. Oleh karena itu, setiap DoS yang disebabkan oleh isi dari badan permintaan setelah diserahkan ke handler permintaan bukanlah kerentanan dalam Node.js itu sendiri, karena tanggung jawab kode aplikasi untuk menanganinya dengan benar.

Pastikan bahwa WebServer menangani kesalahan soket dengan benar, misalnya, ketika server dibuat tanpa penanganan kesalahan, maka akan rentan terhadap DoS

```js
const net = require('net');

const server = net.createServer(function(socket) {
  // socket.on('error', console.error) // ini mencegah server menjadi crash
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(5000, '0.0.0.0');
```

Jika _permintaan buruk_ dilakukan, server dapat menjadi crash.

Contoh serangan DoS yang tidak disebabkan oleh isi permintaan adalah [Slowloris][]. Pada serangan ini, permintaan HTTP dikirim secara perlahan-lahan dan terfragmentasi, satu fragmen pada satu waktu. Sampai permintaan lengkap diterima, server akan menahan sumber daya yang diperuntukkan untuk permintaan tersebut. Jika cukup banyak permintaan seperti ini dikirim pada waktu yang sama, jumlah koneksi simultan akan segera mencapai maksimumnya sehingga mengakibatkan serangan DoS. Inilah sebabnya mengapa serangan ini tidak bergantung pada isi permintaan, tetapi pada waktu dan pola permintaan yang dikirim ke server.

**Pengendalian**

* Gunakan reverse proxy untuk menerima dan meneruskan permintaan ke aplikasi Node.js. Reverse proxies dapat menyediakan caching, load balancing, IP blacklisting, dan sebagainya, yang mengurangi kemungkinan serangan DoS menjadi efektif.
* Konfigurasikan server timeouts dengan benar sehingga koneksi yang idle atau permintaan yang datang terlalu lambat dapat dijatuhkan. Lihat timeout yang berbeda pada [`http.Server`][], terutama `headersTimeout`, `requestTimeout`, `timeout`, dan `keepAliveTimeout`.
* Batasi jumlah soket terbuka per host dan secara keseluruhan. Lihat [dokumentasi http][], terutama `agent.maxSockets`, `agent.maxTotalSockets`, `agent.maxFreeSockets`, dan `server.maxRequestsPerSocket`.

### Pengikatan Ulang DNS (CWE-346)

Ini adalah serangan yang dapat menargetkan aplikasi Node.js yang dijalankan dengan inspektor debugging diaktifkan menggunakan [--inspect switch][].

Karena situs web yang dibuka di browser web dapat membuat permintaan WebSocket dan HTTP, mereka dapat menargetkan inspektor debugging yang berjalan secara lokal. Hal ini biasanya dicegah oleh [same-origin policy][] yang diterapkan oleh browser modern, yang melarang skrip dari mencapai sumber daya dari asal yang berbeda (yang berarti situs web jahat tidak dapat membaca data yang diminta dari alamat IP lokal).

Namun, melalui DNS rebinding, penyerang dapat sementara mengendalikan asal untuk permintaan mereka sehingga mereka tampak berasal dari alamat IP lokal. Ini dilakukan dengan mengendalikan baik situs web maupun server DNS yang digunakan untuk menyelesaikan alamat IP-nya. Lihat [DNS Rebinding wiki][] untuk lebih detail.

**Pengurangan Risiko**

* Matikan inspektor pada sinyal _SIGUSR1_ dengan melekatkan pendengar `process.on('SIGUSR1',...)` kepadanya.
* Jangan jalankan protokol inspektor di produksi.

### Pemaparan Informasi Sensitif kepada Pelaku yang Tidak Sah (CWE-552)

Semua file dan folder yang terdapat pada direktori saat ini dimasukkan ke dalam registri npm selama publikasi paket.

Terdapat beberapa mekanisme untuk mengontrol perilaku ini dengan menentukan daftar blokir dengan `.npmignore` dan `.gitignore` atau dengan menentukan daftar izin dalam `package.json`

**Pengurangan Risiko**

* Menggunakan `npm publish --dry-run` untuk melihat semua file yang akan dipublikasikan. Pastikan untuk meninjau kontennya sebelum menerbitkan paket.
* Juga penting untuk membuat dan menjaga file-file yang diabaikan seperti `.gitignore` dan `.npmignore`. Dalam file-file ini, Anda dapat menentukan file/folder mana yang tidak boleh dipublikasikan. [Properti file][] dalam `package.json` memungkinkan operasi sebaliknya -- allowed list.
* Jika terjadi pemaparan, pastikan untuk [membatalkan publikasi paket][].

### Pemalsuan Permintaan HTTP (CWE-444)

Ini adalah serangan yang melibatkan dua server HTTP (biasanya proxy dan aplikasi Node.js). Klien mengirimkan permintaan HTTP yang pertama-tama melewati server front-end (proxy) dan kemudian diarahkan ke server back-end (aplikasi). Ketika front-end dan back-end menafsirkan permintaan HTTP yang ambigu dengan cara yang berbeda, maka ada potensi bagi penyerang untuk mengirimkan pesan berbahaya yang tidak akan terlihat oleh front-end tetapi akan terlihat oleh back-end, efektif "menyelundupkannya" melewati server proxy.

Lihat [CWE-444][] untuk deskripsi yang lebih terperinci dan contoh-contohnya.

Karena serangan ini tergantung pada Node.js menafsirkan permintaan HTTP secara berbeda dari server HTTP (acak) lainnya, serangan yang berhasil dapat disebabkan oleh kerentanan di Node.js, server front-end, atau keduanya. Jika cara permintaan diinterpretasikan oleh Node.js konsisten dengan spesifikasi HTTP (lihat [RFC7230][]), maka tidak dianggap sebagai kerentanan di Node.js.

**Pengurangan Risiko**

* Jangan gunakan opsi `insecureHTTPParser` saat membuat Server HTTP.
* Konfigurasikan server front-end untuk menormalkan permintaan yang ambigu.
* Terus memantau kerentanan penyelundupan permintaan HTTP baru di Node.js dan server front-end pilihan.
* Gunakan HTTP/2 ujung ke ujung dan nonaktifkan penurunan versi HTTP jika memungkinkan.

### Paparan Informasi melalui Timing Attacks (CWE-208)

Ini adalah serangan yang memungkinkan penyerang mempelajari informasi yang berpotensi sensitif dengan, misalnya, mengukur berapa lama waktu yang dibutuhkan aplikasi untuk merespons permintaan. Serangan ini tidak spesifik untuk Node.js dan dapat menargetkan hampir semua runtime.

Serangan itu dimungkinkan setiap kali aplikasi menggunakan rahasia dalam operasi sensitif waktu (mis., Cabang). Pertimbangkan untuk menangani autentikasi dalam aplikasi tipikal. Di sini, metode autentikasi dasar menyertakan email dan kata sandi sebagai kredensial. Informasi pengguna diambil dari input yang disediakan pengguna dari DBMS idealnya. Setelah mengambil informasi pengguna, kata sandi dibandingkan dengan informasi pengguna yang diambil dari database. Menggunakan perbandingan string bawaan membutuhkan waktu lebih lama untuk nilai panjang yang sama. Perbandingan ini, ketika dijalankan untuk jumlah yang dapat diterima, dengan enggan meningkatkan waktu respons permintaan. Dengan membandingkan waktu respons permintaan, penyerang dapat menebak panjang dan nilai kata sandi dalam permintaan dalam jumlah besar.

**Mitigasi**

* Crypto API memperlihatkan fungsi `timingSafeEqual` untuk membandingkan nilai sensitif aktual dan yang diharapkan menggunakan algoritme waktu konstan.
* Untuk perbandingan kata sandi, Anda dapat menggunakan [scrypt][] yang tersedia juga di modul crypto asli.

* Lebih umum, hindari penggunaan rahasia dalam operasi waktu variabel. Ini termasuk percabangan rahasia dan, ketika penyerang dapat ditempatkan bersama di infrastruktur yang sama (misalnya, mesin cloud yang sama), menggunakan rahasia sebagai indeks ke dalam memori. Menulis kode waktu konstan dalam JavaScript itu sulit (sebagian karena JIT). Untuk aplikasi kripto, gunakan API kripto atau WebAssembly bawaan (untuk algoritme yang tidak diterapkan secara asli).
### Modul Pihak Ketiga Berbahaya (CWE-1357)

Saat ini, di Node.js, paket apa pun dapat mengakses sumber daya yang kuat seperti akses jaringan. Selain itu, karena mereka juga memiliki akses ke sistem file, mereka dapat mengirimkan data apa saja ke mana saja.

Semua kode yang berjalan ke proses node memiliki kemampuan untuk memuat dan menjalankan kode arbitrer tambahan dengan menggunakan `eval()`(atau yang setara). Semua kode dengan akses tulis sistem file dapat mencapai hal yang sama dengan menulis ke file baru atau yang sudah ada yang dimuat.

Node.js memiliki [¹][experimental-features] [mekanisme kebijakan][] eksperimental untuk mendeklarasikan sumber daya yang dimuat sebagai tidak tepercaya atau tepercaya. Namun, kebijakan ini tidak diaktifkan secara default. Pastikan untuk menyematkan versi ketergantungan dan menjalankan pemeriksaan otomatis untuk kerentanan menggunakan alur kerja umum atau skrip npm. Sebelum menginstal paket, pastikan paket ini dipertahankan dan menyertakan semua konten yang Anda harapkan. Hati-hati, kode sumber Github tidak selalu sama dengan yang dipublikasikan, validasi di _node_modules_.

#### Serangan rantai pasokan

Serangan rantai suplai pada aplikasi Node.js terjadi ketika salah satu ketergantungannya (baik langsung atau transitif) terganggu. Hal ini dapat terjadi karena aplikasi terlalu lemah dalam spesifikasi dependensi (memungkinkan pembaruan yang tidak diinginkan) dan/atau kesalahan ketik umum dalam spesifikasi (rentan terhadap [typosquatting][]).

Penyerang yang mengendalikan paket upstream dapat menerbitkan versi baru dengan kode berbahaya di dalamnya. Jika aplikasi Node.js bergantung pada paket itu tanpa ketat pada versi mana yang aman untuk digunakan, paket tersebut dapat diperbarui secara otomatis ke versi jahat terbaru, membahayakan aplikasi.

Ketergantungan yang ditentukan dalam file `package.json` dapat memiliki nomor versi atau rentang yang tepat. Namun, saat menyematkan dependensi ke versi yang tepat, dependensi transitifnya tidak disematkan sendiri. Ini masih membuat aplikasi rentan terhadap pembaruan yang tidak diinginkan / tidak terduga.

Vektor serangan yang mungkin terjadi:

* Serangan salah ketik
* Keracunan Lockfile
* Pengelola yang dikompromikan
* Paket Berbahaya
* Kebingungan Ketergantungan

**Mitigasi**

* Cegah npm mengeksekusi skrip arbitrer dengan `--ignore-scripts`
  * Selain itu, Anda dapat menonaktifkannya secara global dengan `npm config set quit-scripts true`
* Sematkan versi dependensi ke versi tetap tertentu, bukan versi yang merupakan rentang atau dari sumber yang dapat diubah.
* Gunakan lockfiles, yang menyematkan setiap ketergantungan (langsung dan transitif).
  * Gunakan [Mitigasi untuk kerusakan lockfile][].
* Otomatiskan pemeriksaan kerentanan baru menggunakan CI, dengan alat seperti [`npm-audit`][].
  * Alat seperti [`Socket`][] dapat digunakan untuk menganalisis paket dengan analisis statis untuk menemukan perilaku berisiko seperti akses jaringan atau sistem file.
* Gunakan [`npm ci`][] alih-alih ` instal npm`. Ini memaksa file kunci sehingga ketidakkonsistenan antara itu dan File _package.json_ menyebabkan kesalahan (alih-alih mengabaikan file kunci mendukung _package.json_).
* Periksa file _package.json_ dengan hati-hati untuk kesalahan/salah ketik pada nama dependencies.

### Pelanggaran Akses Memori (CWE-284)

Serangan berbasis memori atau berbasis tumpukan bergantung pada kombinasi kesalahan manajemen memori dan pengalokasi memori yang dapat dieksploitasi. Seperti semua runtime, Node.js rentan terhadap serangan ini jika proyek Anda berjalan di mesin bersama. Menggunakan heap yang aman berguna untuk mencegah kebocoran informasi sensitif karena pointer overruns dan underruns.

Sayangnya, secure heap tidak tersedia di Windows. Informasi lebih lanjut dapat ditemukan di Node.js [dokumentasi secure-heap][].

**Mitigasi**

* Gunakan `--secure-heap=n` bergantung pada aplikasi Anda di mana _n_ dialokasikan ukuran byte maksimum.
* Jangan menjalankan aplikasi produksi Anda di mesin bersama.

### Penambalan Monyet (CWE-349)

Penambalan monyet mengacu pada modifikasi properti dalam waktu proses yang bertujuan untuk mengubah perilaku yang ada. Contoh:

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};
```

**Mitigasi**

Bendera `--frozen-intrinsics` mengaktifkan intrinsik beku eksperimental[¹][experimental-features], yang berarti semua objek dan fungsi JavaScript bawaan dibekukan secara rekursif. Oleh karena itu, cuplikan berikut **tidak akan** menggantikan perilaku default `Array.prototype.push`

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};

// Uncaught:
// TypeError <Object <Object <[Object: null prototype] {}>>>:
// Cannot assign to read only property 'push' of object ''
```

Namun, penting untuk disebutkan bahwa Anda masih dapat menentukan global baru dan mengganti global yang ada menggunakan `globalThis`
```console
> globalThis.foo = 3; foo; // Anda masih bisa mendefinisikan global baru
3
> globalIni.Array = 4; Himpunan; // Namun, Anda juga dapat mengganti global yang ada
4
```

Oleh karena itu, `Object.freeze(globalThis)` dapat digunakan untuk menjamin tidak ada global yang akan diganti.

### Prototipe Serangan Polusi (CWE-1321)

Polusi prototipe mengacu pada kemungkinan untuk memodifikasi atau menyuntikkan properti ke item bahasa Javascript dengan menyalahgunakan penggunaan _\_proto\__, _constructor_, _prototype_, dan properti lain yang diwarisi dari prototipe bawaan.

<!-- eslint-skip -->

```js
const a = {"a": 1, "b": 2};
const data = JSON.parse('{"__proto__": { "polluted": true}}');

const c = Object.assign({}, a, data);
console.log(c.polluted); // true

// Potential DoS
const data2 = JSON.parse('{"__proto__": null}');
const d = Object.assign(a, data2);
d.hasOwnProperty('b'); // Uncaught TypeError: d.hasOwnProperty is not a function
```

Ini adalah kerentanan potensial yang diwarisi dari bahasa JavaScript.

**Contoh**:

* [CVE-2022-21824][] (Node.js)
* [CVE-2018-3721][] (Perpustakaan Pihak ke-3: Lodash)

**Mitigasi**

* Hindari [penggabungan rekursif tidak aman][], lihat [CVE-2018-16487][].
* Terapkan validasi Skema JSON untuk permintaan eksternal/tidak tepercaya.
* Buat Objek tanpa prototipe dengan menggunakan `Object.create(null)`.
* Membekukan prototipe: `Object.freeze(MyObject.prototype)`.
* Nonaktifkan properti `Object.prototype.__proto__` menggunakan flag `--disable-proto`.
* Periksa apakah properti ada langsung pada objek, bukan dari prototipe menggunakan `Object.hasOwn(obj, keyFromObj)`.
* Hindari menggunakan metode dari `Object.prototype`.

### Elemen Jalur Pencarian Tidak Terkontrol (CWE-427)

Node.js memuat modul mengikuti [Module Resolution Algorithm][]. Oleh karena itu, ini mengasumsikan direktori di mana modul diminta (mengharuskan) dipercaya.

Artinya, perilaku aplikasi berikut diharapkan. Dengan asumsi struktur direktori berikut:

* _app/_
  * _server.js_
  * _auth.js_
  * _auth_

Jika server.js menggunakan `require('./auth')` ia akan mengikuti algoritme resolusi modul dan memuat _auth_ alih-alih _auth.js_.

**Mitigasi**

Menggunakan [¹][experimental-features] [mekanisme kebijakan dengan pemeriksaan integritas][] eksperimental dapat menghindari ancaman di atas. Untuk direktori yang dijelaskan di atas, seseorang dapat menggunakan `policy.json` berikut

```json
{
  "resources": {
    "./app/auth.js": {
      "integrity": "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8="
    },
    "./app/server.js": {
      "dependencies": {
        "./auth" : "./app/auth.js"
      },
      "integrity": "sha256-NPtLCQ0ntPPWgfVEgX46ryTNpdvTWdQPoZO3kHo0bKI="
    }
  }
}
```

Oleh karena itu, saat membutuhkan modul _auth_, sistem akan memvalidasi integritas dan menampilkan error jika tidak sesuai dengan yang diharapkan.

```console
» node --experimental-policy=policy.json app/server.js
node:internal/policy/sri:65
      throw new ERR_SRI_PARSE(str, str[prevIndex], prevIndex);
      ^

SyntaxError [ERR_SRI_PARSE]: Subresource Integrity string "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8=%" had an unexpected "%" at position 51
    at new NodeError (node:internal/errors:393:5)
    at Object.parse (node:internal/policy/sri:65:13)
    at processEntry (node:internal/policy/manifest:581:38)
    at Manifest.assertIntegrity (node:internal/policy/manifest:588:32)
    at Module._compile (node:internal/modules/cjs/loader:1119:21)
    at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Module._load (node:internal/modules/cjs/loader:878:12)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:99:18) {
  code: 'ERR_SRI_PARSE'
}
```

Perhatikan, selalu disarankan penggunaan `--policy-integrity` untuk menghindari mutasi kebijakan.

## Fitur Eksperimental dalam Produksi

Penggunaan fitur eksperimental dalam produksi tidak disarankan. Fitur eksperimental dapat mengalami perubahan besar jika diperlukan, dan fungsinya tidak stabil dengan aman. Meskipun, umpan balik sangat dihargai.

## Alat OpenSSF

[OpenSSF][] memimpin beberapa inisiatif yang bisa sangat berguna, terutama jika Anda berencana memublikasikan paket npm. Inisiatif tersebut meliputi:

- [OpenSSF Scorecard][] Scorecard mengevaluasi project open source menggunakan serangkaian pemeriksaan risiko keamanan otomatis. Anda dapat menggunakannya untuk secara proaktif menilai kerentanan dan ketergantungan dalam basis kode Anda dan membuat keputusan yang matang tentang menerima kerentanan.
- [Program Badge Praktik Terbaik OpenSSF][] Project dapat secara sukarela melakukan sertifikasi mandiri dengan menjelaskan cara mereka mematuhi setiap praktik terbaik. Ini akan menghasilkan lencana yang dapat ditambahkan ke proyek.

[model ancaman]: https://github.com/nodejs/node/blob/main/SECURITY.md#the-nodejs-threat-model
[security guidance issue]: https://github.com/nodejs/security-wg/issues/488
[nodejs guideline]: https://github.com/goldbergyoni/nodebestpractices
[Praktik Terbaik OSSF]: https://github.com/ossf/wg-best-practices-os-developers
[Slowloris]: https://en.wikipedia.org/wiki/Slowloris_(computer_security)
[`http.Server`]: https://nodejs.org/api/http.html#class-httpserver
[dokumentasi http]: https://nodejs.org/api/http.html
[--inspect switch]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[same-origin policy]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[DNS Rebinding wiki]: https://en.wikipedia.org/wiki/DNS_rebinding
[Properti file]: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files
[membatalkan publikasi paket]: https://docs.npmjs.com/unpublishing-packages-from-the-registry
[CWE-444]: https://cwe.mitre.org/data/definitions/444.html
[RFC7230]: https://datatracker.ietf.org/doc/html/rfc7230#section-3
[mekanisme kebijakan]: https://nodejs.org/api/permissions.html#policies
[typosquatting]: https://en.wikipedia.org/wiki/Typosquatting
[Mitigasi untuk kerusakan lockfile]: https://blog.ulisesgascon.com/lockfile-posioned
[`npm ci`]: https://docs.npmjs.com/cli/v8/commands/npm-ci
[dokumentasi secure-heap]: https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#--secure-heapn
[CVE-2022-21824]: https://www.cvedetails.com/cve/CVE-2022-21824/
[CVE-2018-3721]: https://www.cvedetails.com/cve/CVE-2018-3721/
[penggabungan rekursif tidak aman]: https://gist.github.com/DaniAkash/b3d7159fddcff0a9ee035bd10e34b277#file-unsafe-merge-js
[CVE-2018-16487]: https://www.cve.org/CVERecord?id=CVE-2018-16487
[scrypt]: https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
[Module Resolution Algorithm]: https://nodejs.org/api/modules.html#modules_all_together
[mekanisme kebijakan dengan pemeriksaan integritas]: https://nodejs.org/api/permissions.html#integrity-checks
[experimental-features]: #experimental-features-in-production
[`Socket`]: https://socket.dev/
[OpenSSF]: https://openssf.org/
[OpenSSF Scorecard]: https://securityscorecards.dev/
[Program Badge Praktik Terbaik OpenSSF]: https://bestpractices.coreinfrastructure.org/en
