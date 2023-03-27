---
title: Başlangıç Kılavuzu
layout: docs.hbs
---

# Node.js kurulumunu tamamladıktan son nasıl başlarım?

Node.js kurduktan sonra ilk web sunucumuzu kuralım. `app.js` adında bir dosya oluşturalım ve şu satırları ekleyelim:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Şimdi web sunucunuzu `node app.js` komutu ile çalıştırabilirsiniz. Tarayıcınızdan `http://localhost:3000` adresini açtığınızda "Hello World" mesajını göreceksiniz.

Node.js ile çalışmaya başlamak ve daha kapsamlı bilgi edinmek için [Node.js'e giriş](https://nodejs.dev/en/learn/) sayfasını inceleyebilirsiniz.
