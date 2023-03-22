---
title: Memecahkan Masalah - Memulai
layout: docs.hbs
---

# Panduan Memecahkan Masalah

Panduan ini akan membantu Anda memulai debugging aplikasi dan skrip Node.js Anda.

## Aktifkan Inspektur

Saat dimulai dengan sakelar `--inspect`, proses Node.js mendengarkan a klien debug. Secara default, ia akan mendengarkan di host dan port 127.0.0.1:9229. Setiap proses juga diberi [UUID][] yang unik.

Klien pemeriksa harus mengetahui dan menentukan alamat host, port, dan UUID untuk terhubung. URL lengkap akan terlihat seperti `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js juga akan mulai mendengarkan pesan debug jika menerima a Sinyal `SIGUSR1`. (`SIGUSR1` tidak tersedia di Windows.) Di Node.js 7 dan sebelumnya, ini mengaktifkan API Debugger lawas. Di Node.js 8 dan yang lebih baru, itu akan aktifkan API Inspektur.

---
## Implikasi Keamanan

Karena debugger memiliki akses penuh ke lingkungan eksekusi Node.js, a aktor jahat yang dapat terhubung ke port ini mungkin dapat mengeksekusi secara sewenang-wenang kode atas nama proses Node.js. Penting untuk memahami keamanan implikasi mengekspos port debugger pada jaringan publik dan pribadi.

### Mengekspos port debug secara publik tidak aman

Jika debugger terikat ke alamat IP publik, atau ke 0.0.0.0, setiap klien yang dapat mencapai alamat IP Anda akan dapat terhubung ke debugger tanpa pembatasan dan akan dapat menjalankan kode arbitrer.

Secara default `node --inspect` mengikat ke 127.0.0.1. Anda secara eksplisit perlu memberikan alamat IP publik atau 0.0.0.0, dll., jika Anda ingin mengizinkan koneksi eksternal ke debuggernya. Melakukannya dapat membuat Anda terkena keamanan yang berpotensi signifikan ancaman. Kami menyarankan Anda memastikan firewall yang sesuai dan kontrol akses di tempat untuk mencegah paparan keamanan.

Lihat bagian '[Mengaktifkan skenario debugging jarak jauh](#enabling-remote-debugging-scenarios)' pada beberapa saran tentang cara untuk memungkinkan klien debugger jarak jauh terhubung dengan aman.

### Aplikasi lokal memiliki akses penuh ke inspektur

Bahkan jika Anda mengikat port inspektur ke 127.0.0.1 (default), aplikasi apa pun berjalan secara lokal di mesin Anda akan memiliki akses tak terbatas. Ini adalah dengan desain untuk memungkinkan debugger lokal dapat melampirkan dengan nyaman.

### Browser, WebSockets, dan kebijakan asal yang sama

Situs web yang dibuka di browser web dapat membuat permintaan WebSocket dan HTTP di bawah model keamanan peramban. Koneksi HTTP awal diperlukan untuk mendapatkan id sesi debugger unik. Kebijakan asal yang sama mencegah situs web menjadi dapat membuat koneksi HTTP ini. Untuk keamanan tambahan terhadap [Serangan rebinding DNS](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js memverifikasi bahwa tajuk 'Host' untuk koneksi juga tentukan alamat IP atau `localhost6` dengan tepat.

Kebijakan keamanan ini melarang koneksi ke server debug jarak jauh dengan: menentukan nama host. Anda dapat mengatasi batasan ini dengan menentukan baik alamat IP atau dengan menggunakan terowongan ssh seperti yang dijelaskan di bawah ini.

## Klien Inspektur

Debugger CLI minimal tersedia dengan `node inspect myscript.js`. Beberapa alat komersial dan sumber terbuka juga dapat terhubung ke Inspektur Node.js.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+, [Microsoft Edge](https://www.microsoftedgeinsider.com)

* **Opsi 1**: Buka `chrome://inspect` dalam berbasis Chromium browser atau `edge://inspect` di Edge. Klik tombol Konfigurasi dan pastikan host dan port target Anda terdaftar.
* **Opsi 2**: Salin `devtoolsFrontendUrl` dari output `/json/list` (lihat di atas) atau teks petunjuk --inspect dan tempel ke Chrome.

> Perhatikan bahwa Node.js dan Chrome harus dijalankan pada platform yang sama.

### [Visual Studio code](https://github.com/microsoft/vscode) 1.10+

* Di panel Debug, klik ikon pengaturan untuk membuka `.vscode/launch.json`. Pilih "Node.js" untuk pengaturan awal.

### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017+

* Pilih "Debug > Start Debugging" dari menu atau tekan F5.
* [Petunjuk terperinci](https://github.com/Microsoft/nodejstools/wiki/Debugging).

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) dan IDE JetBrains lainnya

* Buat konfigurasi debug Node.js baru dan tekan Debug. `--inspect` akan digunakan secara default untuk Node.js 7+. Untuk menonaktifkan hapus centang `js.debugger.node.use.inspect` di Registri IDE. Untuk mempelajari lebih lanjut tentang menjalankan dan men-debug Node.js di WebStorm dan IDE JetBrains lainnya, lihat [bantuan online WebStorm](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html).

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Perpustakaan untuk memudahkan koneksi ke [Protokol Inspektur][] titik akhir.

### [Gitpod](https://www.gitpod.io)

* Mulai konfigurasi debug Node.js dari tampilan `Debug` atau tekan `F5`. [Petunjuk terperinci](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

### [Eclipse IDE](https://Eclipse.org/Eclipseide) dengan ekstensi Pengembang Web Liar Eclipse

* Dari file .js, pilih "Debug As... > Node program", atau
* Buat Konfigurasi Debug untuk melampirkan debugger ke aplikasi Node.js yang sedang berjalan (sudah dimulai dengan `--inspect`).

---

## Opsi baris perintah

Tabel berikut mencantumkan dampak dari berbagai flag runtime pada debugging:

<table class="table-no-border-no-padding">
  <tr><th>Penanda</th><th>Arti</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>Mengaktifkan agen inspeksi</li>
        <li>Mendengarkan di alamat dan port default (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Mengaktifkan agen inspeksi</li>
        <li>Mengikat ke alamat atau nama host <em>host</em> (default: 127.0.0.1)</li>
        <li>Mendengarkan pada port <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>Mengaktifkan agen inspeksi</li>
        <li>Mendengarkan di alamat dan port default (127.0.0.1:9229)</li>
        <li>Berhenti sebelum kode pengguna dimulai</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Mengaktifkan agen inspeksi</li>
        <li>Mengikat ke alamat atau nama host <em>host</em> (default: 127.0.0.1)</li>
        <li>Mendengarkan pada port <em>port</em> (default: 9229)</li>
        <li>Berhenti sebelum kode pengguna dimulai</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Menjalankan proses anak untuk menjalankan skrip pengguna dengan flag --inspect;                         dan menggunakan proses utama untuk menjalankan debugger CLI.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Menjalankan proses anak untuk menjalankan skrip pengguna dengan flag --inspect;                         dan menggunakan proses utama untuk menjalankan debugger CLI.</li>
        <li>Mendengarkan pada port <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

## Mengaktifkan skenario debugging jarak jauh

Kami menyarankan Anda tidak pernah mendengarkan debugger pada alamat IP publik. Jika Anda perlu mengizinkan koneksi debugging jarak jauh, kami merekomendasikan penggunaan ssh terowongan sebagai gantinya. Kami memberikan contoh berikut untuk tujuan ilustrasi saja. Harap pahami risiko keamanan dari mengizinkan akses jarak jauh ke hak istimewa layanan sebelum melanjutkan.

Katakanlah Anda menjalankan Node.js pada mesin jarak jauh, remote.example.com, yang Anda ingin dapat men-debug. Di mesin itu, Anda harus memulai proses simpul dengan inspektur hanya mendengarkan localhost (default).

```bash
node --inspect server.js
```

Sekarang, di mesin lokal Anda dari mana Anda ingin memulai klien debug koneksi, Anda dapat mengatur terowongan ssh:

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

Ini memulai sesi terowongan ssh di mana koneksi ke port 9221 di lokal Anda mesin akan diteruskan ke port 9229 di remote.example.com. Anda sekarang dapat melampirkan debugger seperti Chrome DevTools atau Visual Studio Code ke localhost:9221, yang seharusnya dapat melakukan debug seolah-olah aplikasi Node.js berjalan secara lokal.

---

## Debugger Lama

**Debugger lama tidak digunakan lagi sejak Node.js 7.7.0. Mohon gunakan `--inspect` dan Inspector sebagai gantinya.**

Saat dimulai dengan sakelar **--debug** atau **--debug-brk** di versi 7 dan sebelumnya, Node.js mendengarkan perintah debugging yang ditentukan oleh yang dihentikan Protokol Debugging V8 pada port TCP, secara default `5858`. Setiap klien debugger yang berbicara bahwa protokol ini dapat terhubung dan men-debug proses yang sedang berjalan; sebuah pasangan yang populer tercantum di bawah ini.

Protokol Debugging V8 tidak lagi dipertahankan atau didokumentasikan.

### [Debugger Bawaan](https://nodejs.org/dist/{#var currentVersion}/docs/api/debugger.html)

Mulai `node debug script_name.js` untuk memulai skrip Anda di bawah bawaan debugger baris perintah. Skrip Anda dimulai dalam proses Node.js lain yang dimulai dengan opsi `--debug-brk`, dan proses Node.js awal menjalankan `_debugger.js` script dan menghubungkan ke target Anda.

### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug aplikasi Node.js Anda dengan Chrome DevTools menggunakan proses perantara yang menerjemahkan [Protokol Inspektur][] yang digunakan di Chromium ke V8 Debugger protokol yang digunakan di Node.js.

<!-- refs -->

[Protokol Inspektur]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
