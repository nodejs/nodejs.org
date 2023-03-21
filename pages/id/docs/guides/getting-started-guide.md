---
title: Panduan Memulai
layout: docs.hbs
---

# Bagaimana cara memulai dengan Node.js setelah saya menginstalnya?

Setelah kita menginstal Node.js, mari kita buat server web pertama kita. Buat file bernama `app.js` yang berisi konten berikut:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Halo Dunia');
});

server.listen(port, hostname, () => {
  console.log(`Server berjalan di http://${hostname}:${port}/`);
});
```

Sekarang, jalankan server web Anda menggunakan `node app.js`. Kunjungi `http://localhost:3000` dan Anda akan melihat pesan yang mengatakan "Halo Dunia".

Lihat [Pengantar Node.js](https://nodejs.dev/learn) untuk informasi lebih lanjut panduan komprehensif untuk memulai dengan Node.js.
