---
judul: Debugging - Memulai
tata letak: docs.hbs
---

# Debugging Panduan

Panduan ini akan membantu anda memulai debugging Node.js aplikasi dan script.

## Mengaktifkan Inspektur

Ketika dimulai dengan **--memeriksa** beralih, Node.js proses mendengarkan melalui WebSockets
untuk diagnostik perintah seperti yang didefinisikan oleh [Inspektur Protokol][],
secara default di host dan port 127.0.0.1:9229. Masing-masing proses ini juga ditugaskan
unik [UUID][] (misalnya `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspektur klien harus mengetahui dan menentukan alamat host, port, dan UUID untuk menghubungkan
untuk WebSocket antarmuka. URL lengkap adalah
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, tentu saja tergantung
aktual host dan port dengan benar UUID untuk contoh.

Inspektur juga mencakup HTTP endpoint untuk melayani metadata tentang debuggee,
termasuk WebSocket URL, UUID, dan Chrome DevTools URL. Mendapatkan metadata ini
dengan mengirimkan permintaan HTTP ke `http://[host:port]/json/daftar`. Ini kembali
Objek JSON seperti berikut; menggunakan `webSocketDebuggerUrl` properti
URL untuk menghubungkan langsung ke Inspektur.

<!-- eslint-skip -->
``javascript
{
"deskripsi": "node.js contoh",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"title": "node",
"jenis": "node",
"url": "file://",
"webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

A Node.js proses dimulai *tanpa* `--memeriksa` juga dapat diinstruksikan untuk mulai
mendengarkan pesan debugging oleh sinyal dengan `SIGUSR1` (di Linux dan
OS X). Sebagai Node 7 ini mengaktifkan legacy Debugger API; di Node 8 dan kemudian
ini akan mengaktifkan Inspektur API.

---
## Implikasi Keamanan

Sejak debugger memiliki akses penuh ke Node.js eksekusi lingkungan, 
berbahaya aktor dapat terhubung ke port ini mungkin dapat mengeksekusi sewenang-wenang
kode pada nama Node proses. Hal ini penting untuk memahami keamanan
implikasi dari mengekspos debugger port pada jaringan publik dan swasta.

### Mengekspos debug port publik yang tidak aman

Jika debugger terikat ke sebuah alamat IP publik, atau untuk 0.0.0.0, setiap klien yang
dapat mencapai alamat IP anda akan dapat terhubung ke debugger tanpa
pembatasan dan akan mampu menjalankan kode sewenang-wenang.

Secara default `simpul-memeriksa` mengikat ke 127.0.0.1. Anda secara eksplisit harus memberikan
alamat IP publik atau 0.0.0.0, dll., jika anda berniat untuk memungkinkan koneksi eksternal
untuk debugger. Melakukan sehingga dapat mengekspos anda berpotensi signifikan keamanan
ancaman. Kami sarankan anda memastikan sesuai firewall dan akses kontrol di tempat
untuk mencegah risiko keamanan.

Lihat bagian '[yang Memungkinkan remote debugging skenario](#mengaktifkan-remote-debugging-skenario)' di beberapa saran tentang bagaimana
untuk aman memungkinkan remote debugger klien untuk terhubung.

### Aplikasi lokal memiliki akses penuh ke inspektur

Bahkan jika anda mengikat inspektur port to 127.0.0.1 (default), setiap aplikasi
berjalan secara lokal pada mesin anda akan memiliki akses tak terbatas. Ini adalah dengan desain
untuk memungkinkan lokal debugger untuk dapat melampirkan dengan mudah.

### Browser, WebSockets dan sama-asal kebijakan

Situs web terbuka di web browser dapat membuat WebSocket dan permintaan HTTP di bawah
keamanan browser model. Awal koneksi HTTP yang diperlukan untuk memperoleh
unik debugger id sesi. Sama-asal-kebijakan mencegah website dari yang
mampu membuat koneksi HTTP. Untuk keamanan tambahan terhadap
[DNS rebinding serangan](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
memverifikasi bahwa 'Host' header untuk koneksi baik
menentukan alamat IP atau `localhost` atau `localhost6` tepatnya.

Ini kebijakan keamanan melarang menghubungkan ke remote debug server dengan
menentukan hostname. Anda dapat bekerja di sekitar pembatasan ini dengan menentukan
alamat IP atau dengan menggunakan ssh terowongan seperti yang dijelaskan di bawah ini.

## Inspektur Klien

Beberapa komersial dan open source dapat terhubung ke Node Inspektur. Dasar
info ini berikut:

#### [node-memeriksa](https://github.com/nodejs/node-inspect)

* CLI Debugger didukung oleh Node.js Yayasan yang menggunakan [Inspektur Protokol][].
* Versi ini dibundel dengan Node dan dapat digunakan dengan `simpul memeriksa myscript.js`.
* Versi terbaru juga dapat diinstal secara independen (misalnya `npm install-g node-memeriksa`)
dan digunakan dengan `simpul-memeriksa myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **1**: Buka `chrome://memeriksa` di Kromium berbasis
browser. Klik tombol Configure dan memastikan target host dan port
terdaftar.
* **2**: Copy `devtoolsFrontendUrl` dari output `/json/daftar`
(lihat di atas) atau --memeriksa petunjuk teks dan paste ke Chrome.
* **3**: Menginstal Ekstensi Chrome NIM (Node Inspektur Manager): 
https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Kode Visual Studio](https://github.com/microsoft/vscode) 1.10+

* Di Debug panel, klik ikon pengaturan untuk membuka `.vscode/peluncuran.json`.
Pilih "Node.js" untuk awal setup.

#### [Visual](https://github.com/Microsoft/nodejstools) 2017

* Pilih "Debug > Start Debugging" dari menu atau tekan F5.
* [Petunjuk rinci](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ dan lain JetBrains IDEs

* Buat baru Node.js konfigurasi debug dan tekan Debug. `--memeriksa` akan digunakan
 secara default untuk Node.js 7+. Untuk menonaktifkan hapus centang `js.debugger.node.gunakan.periksa` di
IDE Registry.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Perpustakaan untuk kemudahan koneksi ke Inspektur Protokol endpoint.

---

## Opsi baris perintah

Daftar tabel berikut mencantumkan dampak dari berbagai runtime bendera di debugging:

<table cellpadding="0" cellspacing="0">
<tr><th>Bendera</th><th>Arti</th></tr>
<tr>
<td>--memeriksa</td>
<td>
<ul>
<li>Memungkinkan inspektur agent</li>
<li>Mendengarkan pada default address dan port (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--memeriksa=<i>[host:port]</i></td>
<td>
<ul>
<li>Memungkinkan inspektur agent</li>
<li>Mengikat ke alamat atau hostname <i>host</i> (default: 127.0.0.1)</li>
<li>Mendengarkan pada port <i>port</i> (default: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--memeriksa-brk</td>
<td>
<ul>
<li>Memungkinkan inspektur agent</li>
<li>Mendengarkan pada default address dan port (127.0.0.1:9229)</li>
<li>Istirahat pengguna sebelum kode</li>
</ul>
</td>
</tr>
<tr>
<td>--memeriksa-brk=<i>[host:port]</i></td>
<td>
<ul>
<li>Memungkinkan inspektur agent</li>
<li>Mengikat ke alamat atau hostname <i>host</i> (default: 127.0.0.1)</li>
<li>Mendengarkan pada port <i>port</i> (default: 9229)</li>
<li>Istirahat pengguna sebelum kode</li>
</ul>
</td>
</tr>
<tr>
<td><code>node memeriksa <i>script.js</i></code></td>
<td>
<ul>
<li>Menelurkan proses anak untuk menjalankan pengguna script di bawah --memeriksa bendera;
dan menggunakan proses utama untuk menjalankan CLI debugger.</li>
</ul>
</td>
</tr>
<tr>
<td><code>node memeriksa --port=xxxx <i>script.js</i></code></td>
<td>
<ul>
<li>Menelurkan proses anak untuk menjalankan pengguna script di bawah --memeriksa bendera;
dan menggunakan proses utama untuk menjalankan CLI debugger.</li>
<li>Mendengarkan pada port <i>port</i> (default: 9229)</li>
</ul>
</td>
</tr>
</table>

---

## Yang memungkinkan remote debugging skenario

Kami merekomendasikan bahwa anda tidak pernah memiliki debugger mendengarkan pada sebuah alamat IP publik. Jika
anda perlu untuk memungkinkan remote debugging koneksi kami merekomendasikan penggunaan ssh
terowongan sebagai gantinya. Kami menyediakan contoh berikut untuk tujuan ilustrasi saja.
Mohon memahami risiko keamanan yang memungkinkan akses remote untuk istimewa
layanan sebelum melanjutkan.

Katakanlah anda menjalankan Node pada mesin remote, remote.example.com, bahwa anda
ingin dapat debug. Pada mesin itu, anda harus mulai node proses
dengan inspektur mendengarkan hanya untuk localhost (default).

``bash
$ simpul-memeriksa server.js
``

Sekarang, pada komputer lokal anda dari mana anda ingin memulai debug klien
koneksi, anda dapat men-setup ssh tunnel:

``bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
``

Ini dimulai ssh tunnel sesi di mana koneksi ke port 9221 pada lokal anda
mesin akan diteruskan ke port 9229 di remote.example.com. Sekarang anda dapat melampirkan
debugger seperti Chrome DevTools atau Kode Visual Studio untuk localhost:9221,
yang harus mampu debug seolah-olah Node.js aplikasi ini berjalan secara lokal.

---

## Warisan Debugger

**Warisan debugger telah usang sebagai Node 7.7.0. Silakan gunakan --memeriksa
dan Inspektur sebaliknya.**

Ketika dimulai dengan **--debug** atau **--debug-brk** switch di versi 7 dan
sebelumnya, Node.js mendengarkan untuk debugging perintah yang didefinisikan oleh dihentikan
V8 Debugging Protokol pada TCP port, secara default `5858`. Setiap debugger klien
yang berbicara protokol ini dapat terhubung ke dan debug menjalankan proses; 
beberapa yang populer tercantum di bawah ini.

V8 Debugging Protokol ini tidak lagi dipertahankan atau didokumentasikan.

#### [Built-in Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Mulai `node debug script_name.js` untuk memulai script di bawah Node builtin
baris perintah debugger. Naskah dimulai pada Node lain proses dimulai dengan
`--debug-brk` pilihan, dan Simpul awal proses berjalan `_debugger.js`
script dan menghubungkan ke target anda.

#### [node-inspektur](https://github.com/node-inspector/node-inspector)

Debug anda Node.js aplikasi dengan Chrome DevTools dengan menggunakan perantara proses
yang diterjemahkan Inspektur Protokol yang digunakan dalam Kromium ke V8 Debugger
protokol yang digunakan dalam Node.js.

<!-- ref -->

[Inspektur Protokol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122