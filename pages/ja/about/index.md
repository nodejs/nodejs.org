---
layout: about.hbs
title: Node.jsとは
trademark: トレードマーク
---

# Node.js®とは

Node.jsはスケールできるネットワークアプリケーションを構築するために、非同期でイベント駆動型のJavaScript実行環境として設計されています。次の「hello world」のサンプルコードは多くのネットワーク接続を並列に処理できます。それぞれのネットワーク接続ではコールバック処理が呼び出されますが、実行する処理がなければNode.jsはスリープします。

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

これはOSのスレッドを採用した一般的な同時実行モデルとは対照的です。スレッドベースのネットワーキングは効率が悪く非常に使いにくいものです。さらにNode.jsにはロックがないため、ユーザーはプロセスのデッドロックの心配から解放されます。また、I/Oを直接実行する関数はほとんどないため、Node.jsの標準ライブラリーの同期メソッドを利用しない限りプロセスがブロックされることはありません。ブロックがないためスケーラブルなシステムをNode.jsで開発することは非常に合理的です。

もしこの説明が聞き慣れない場合は[Blocking vs. Non-Blocking][]の記事を参考にしてください。

---

Node.jsはRubyの[Event Machine][]やPythonの[Twisted][]に影響を受けておりそれらに似ています。Node.jsはさらにイベントモデルを進めています。Node.jsは[event loop][]をライブラリーとしてではなく実行環境の要素として扱っています。Node.js以外のシステムではイベントループを開始するために常にブロックの呼び出しが発生します。通常、この動作はスクリプトの開始時のコールバックを通して定義され、最終的に`EventMachine::run()`のようなブロックの呼び出しを通してサーバーが起動します。Node.jsにはこのようなイベントループを開始する呼び出しはありません。Node.jsは入力されたスクリプトを実行したあと、単純にイベントループに入ります。実行するコールバックがなくなるとイベントループを終了します。この動作はブラウザーのJavaScriptと似ていて、ユーザーからはイベントループは隠されています。

HTTPはNode.jsでは第一級オブジェクトであり、ストリーミングと低レイテンシーを意識して設計されています。このことからNode.jsはウェブのライブラリーやフレームワークの基盤に適したものになっています。

Node.jsはスレッドを使わず設計されていますが、マルチコアを利用できないわけではありません。子プロセスは[`child_process.fork()`][] APIを利用して作成することができ、簡単に通信できるように設計されています。同じインターフェイス上に[`cluster`][]モジュールが存在しており、プロセス間でソケットを共有しコアの負荷分散が可能になっています。

[Blocking vs. Non-Blocking]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
