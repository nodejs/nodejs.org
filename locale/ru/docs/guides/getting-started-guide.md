---
title: Начало работы, Руководство
layout: docs.hbs
---

# Как начать работу с Node.js после установки?

После того как вы установили Node, давайте попробуем наш первый веб-сервер.
Создайте файл с названием "app.js" и вставьте следующий код:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

После этого, запустите веб сервер используя ``` node app.js ```, зайдите на http://localhost:3000, и вы увидите сообщение 'Hello World'
