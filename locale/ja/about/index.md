---
layout: about.hbs
title: Node.js とは
trademark: Trademark
---

# Node.js® とは

As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

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

Node.js はスケーラブルなネットワークアプリケーションを構築するために設計された非同期型のイベント駆動の JavaScript 環境です。 以下の「Hello World」の例では、たくさんの接続を同時に処理することができます。 各接続ごとにコールバックは発火され、何もすることがない場合、Node.js はスリープします。

If some of this language is unfamiliar, there is a full article on [Blocking vs. Non-Blocking](/en/docs/guides/blocking-vs-non-blocking/).

---

これは OS のスレッドが採用されている一般的な同時実行モデルとは対象的です。 スレッドベースのネットワーキングは比較的非効率であり、使うのはとても困難です。 さらに Node.js にはロックがないので Node.js ユーザーはプロセスのデッドロックの悩みから開放されます。 ほとんどの Node.js の関数は I/O を直接実行しないため、プロセスをブロックしません。 ブロックしないのでスケーラブルなシステムを開発するのに Node.js はとても最適です。

HTTP is a first-class citizen in Node.js, designed with streaming and low latency in mind. This makes Node.js well suited for the foundation of a web library or framework.

この言葉だけでは不慣れな部分がいくつかあるかもしれません。 [Blocking vs Non-Blocking](/en/docs/guides/blocking-vs-non-blocking/) にもう少し詳しい記事があります。
