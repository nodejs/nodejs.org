---
title: 入門ガイド
layout: docs.hbs
---

<!-- # How do I start with Node.js after I installed it? -->
# はじめての Web サーバー

<!-- Once you have installed Node, let's try building our first web server.
Create a file named "app.js", and paste the following code: -->
Node をインストールしたら、まずはじめに Web サーバーを構築してみましょう。
"app.js" という名前のファイルを作成し、以下のコードをコピー&ペーストしましょう。

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

<!-- After that, run your web server using `node app.js`, visit `http://localhost:3000`, and you will see a message 'Hello World' -->
その後、 `node app.js` を使って Web サーバーを起動し、`http://localhost:3000` にアクセスすると、 'Hello World' というメッセージが表示されます。
