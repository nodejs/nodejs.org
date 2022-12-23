---
title: Первые шаги
layout: docs.hbs
---

# С чего начать в Node.js после его установки?

После того, как вы установили Node, давайте попробуем создать наш первый веб-сервер.
Создайте файл с именем "app.js" и скопируйте следующий код:

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

Далее запустите ваш веб-сервер, используя команду `node app.js`, откройте `http://localhost:3000` в браузере и вы увидите сообщение 'Hello World'.
