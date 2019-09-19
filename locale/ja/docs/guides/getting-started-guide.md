---
title: 入門ガイド
layout: docs.hbs
---


# はじめての Web サーバー


Node をインストールしたら、まずはじめに Web サーバーを構築してみましょう。
"app.js" という名前のファイルを作成し、以下のコードをコピー&ペーストしましょう。

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

その後、 `node app.js` を使って Web サーバーを起動し、`http://localhost:3000` にアクセスすると、 'Hello World' というメッセージが表示されます。
