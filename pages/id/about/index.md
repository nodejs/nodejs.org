---
layout: about.hbs
title: Tentang
trademark: Merek dagang
---

# Tentang Node.js®

Sebagai runtime JavaScript berbasis peristiwa asinkron, Node.js dirancang untuk membangun aplikasi jaringan yang dapat diskalakan. Dalam contoh "HELLO WORLD" berikut, banyak koneksi dapat ditangani secara bersamaan. Pada setiap koneksi, panggilan baliknya adalah dipecat, tetapi jika tidak ada pekerjaan yang harus dilakukan, Node.js akan tidur.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hai Dunia');
});

server.listen(port, hostname, () => {
  console.log(`Server berjalan di http://${hostname}:${port}/`);
});
```

Ini berbeda dengan model konkurensi yang lebih umum saat ini, di mana utas OS dipekerjakan. Jaringan berbasis thread relatif tidak efisien dan sangat sulit untuk digunakan. Selain itu, pengguna Node.js bebas dari kekhawatiran dead-locking proses, karena tidak ada kunci. Hampir tidak ada fungsi di Node.js langsung melakukan I/O, jadi proses tidak pernah memblokir kecuali saat I/O dilakukan menggunakan metode sinkron dari pustaka standar Node.js. Karena tidak ada yang menghalangi, sistem yang dapat diskalakan sangat masuk akal untuk dikembangkan di Node.js.

Jika beberapa bahasa ini tidak dikenal, ada artikel lengkap di [Pemblokiran vs. Non-Pemblokiran][].

---

Node.js mirip dalam desain, dan dipengaruhi oleh, sistem seperti Ruby [Event Machine][] dan [Twisted][] Python. Node.js mengambil model acara sedikit lebih jauh. Ini menyajikan [event loop][] sebagai konstruk runtime alih-alih sebagai perpustakaan. Dalam sistem lain, selalu ada panggilan pemblokiran untuk memulai acara-loop. Biasanya, perilaku didefinisikan melalui panggilan balik di awal skrip, dan pada akhirnya server dimulai melalui panggilan pemblokiran seperti `EventMachine::run()`. Di Node.js, tidak ada panggilan start-the-event-loop seperti itu. Node.js cukup memasuki loop acara setelah menjalankan skrip input. Node.js keluar dari loop acara ketika tidak ada lagi panggilan balik untuk dilakukan. Perilaku ini seperti JavaScript browser — loop acara disembunyikan dari pengguna.

HTTP adalah warga negara kelas satu di Node.js, dirancang dengan streaming dan rendah latensi dalam pikiran. Ini membuat Node.js sangat cocok untuk fondasi web perpustakaan atau kerangka kerja.

Node.js dirancang tanpa utas tidak berarti Anda tidak dapat mengambil keuntungan dari beberapa inti di lingkungan Anda. Proses anak dapat dimunculkan dengan menggunakan API [`child_process.fork()`][] kami, dan dirancang agar mudah berkomunikasi dengan. Dibangun di atas antarmuka yang sama adalah modul [`cluster`][], yang memungkinkan Anda untuk berbagi soket antar proses untuk mengaktifkan penyeimbangan beban atas inti Anda.

[Pemblokiran vs. Non-Pemblokiran]: /id/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /id/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
