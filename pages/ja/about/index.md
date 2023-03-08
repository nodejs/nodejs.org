---
layout: about.hbs
title: Node.js とは
trademark: Trademark
---

# <!--about-node-js-->Node.js® とは

<!--
As an asynchronous event driven JavaScript runtime, Node is designed to build
scalable network applications. In the following "hello world" example, many
connections can be handled concurrently. Upon each connection the callback is
fired, but if there is no work to be done Node is sleeping.
-->

Node.js はスケーラブルなネットワークアプリケーションを構築するために設計された非同期型のイベント駆動の JavaScript 環境です。
以下の「Hello World」の例では、たくさんの接続を同時に処理することができます。
各接続ごとにコールバックは発火され、何もすることがない場合、Node.js はスリープします。

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

<!--
This is in contrast to today's more common concurrency model where OS threads
are employed. Thread-based networking is relatively inefficient and very
difficult to use. Furthermore, users of Node are free from worries of
dead-locking the process, since there are no locks. Almost no function in Node
directly performs I/O, so the process never blocks. Because nothing blocks,
scalable systems are very reasonable to develop in Node.
-->

これは OS のスレッドが採用されている一般的な同時実行モデルとは対照的です。
スレッドベースのネットワーキングは比較的非効率であり、使うのはとても困難です。
さらに Node.js にはロックがないので Node.js ユーザーはプロセスのデッドロックの悩みから開放されます。
ほとんどの Node.js の関数は I/O を直接実行しないため、プロセスをブロックしません。
ブロックしないのでスケーラブルなシステムを開発するのに Node.js はとても最適です。

<!--
If some of this language is unfamiliar, there is a full article on
[Blocking vs Non-Blocking][].
-->

この言葉だけでは不慣れな部分がいくつかあるかもしれません。
[Blocking vs Non-Blocking][] にもう少し詳しい記事があります。

---

<!--
Node is similar in design to, and influenced by, systems like Ruby's
[Event Machine][] or Python's [Twisted][]. Node takes the event model a bit
further, it presents an [event loop][] as a runtime construct instead of as a library. In other systems there is always a blocking call to start the
event-loop.
Typically behavior is defined through callbacks at the beginning of a script
and at the end starts a server through a blocking call like
`EventMachine::run()`. In Node there is no such start-the-event-loop call. Node
simply enters the event loop after executing the input script. Node exits the
event loop when there are no more callbacks to perform. This behavior is like
browser JavaScript — the event loop is hidden from the user.
-->

Node.js は Ruby の [Event Machine][] や Python の [Twisted][] のシステムに影響を受けていて、同様の設計です。
Node.js はランタイムコンストラクタの替わりにライブラリとして[イベントループ][]を提供し、さらに小さなイベントモデルを持ちます。
ほかのシステムではイベントループの開始時にブロッキングコールが常にあります。
典型的な例ではスクリプトの先頭で動作をコールバックを用いて定義し、
最後に `EventMachine::run()` のようなブロッキングコールでサーバを起動します。
Node.js ではそのようなイベントループを開始する呼び出しはありません。
Node.js は単純にスクリプトを実行した直後にイベントループが開始されます。
実行するコールバックがこれ以上ない場合に Node.js はイベントループから抜けます。
この動作はブラウザ上の JavaScript と似ています — イベントループはユーザからは隠されます。

<!--
HTTP is a first class citizen in Node, designed with streaming and low latency
in mind. This makes Node well suited for the foundation of a web library or
framework.
-->

HTTP はストリーミングと低遅延を念頭に置いて設計された Node.js の第一級オブジェクトです。
これにより Node.js は Web ライブラリやフレームワークの基礎を作るために適しています。

<!--
Just because Node is designed without threads, doesn't mean you cannot take
advantage of multiple cores in your environment. Child processes can be spawned
by using our [`child_process.fork()`][] API, and are designed to be easy to
communicate with. Built upon that same interface is the [`cluster`][] module,
which allows you to share sockets between processes to enable load balancing
over your cores.
-->

Node.js はスレッドがない設計をしているという理由だけで、複数コアの利点が得られないわけではありません。
通信しやすく設計された子プロセスは [`child_process.fork()`][] API を使って生成できます。
コア上でロードバランシングを有効にするためにプロセス間でソケットを共有することを可能にする [`cluster`][] モジュールが同じインターフェース上に内蔵されています。

[Blocking vs Non-Blocking]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[イベントループ]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
