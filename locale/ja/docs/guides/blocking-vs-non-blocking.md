---
title: ブロッキングとノンブロッキングの概要
layout: docs.hbs
---

# ブロッキングとノンブロッキングの概要

This overview covers the difference between **blocking** and **non-blocking** calls in Node.js. This overview will refer to the event loop and libuv but no prior knowledge of those topics is required. Readers are assumed to have a basic understanding of the JavaScript language and Node.js [callback pattern](/en/knowledge/getting-started/control-flow/what-are-callbacks/).

> "I/O" とは、主に [libuv](https://libuv.org/) がサポートしている システムのディスクやネットワークとのやり取りを指します。

## ブロッキング

この概要では、Node.js における**ブロッキング**と**ノンブロッキング**呼び出しの違いについて説明します。 この概要ではイベントループと libuv について説明しますが、 これらのトピックに関する事前知識は必要ありません。 読者は JavaScript 言語と Node.js コールバックパターンの基本的な知識を持っていることを前提としています。

In Node.js, JavaScript that exhibits poor performance due to being CPU intensive rather than waiting on a non-JavaScript operation, such as I/O, isn't typically referred to as **blocking**. Synchronous methods in the Node.js standard library that use libuv are the most commonly used **blocking** operations. Native modules may also have **blocking** methods.

**ブロッキング**は、Node.js プロセス内の追加の JavaScript の実行が、 JavaScript 以外の操作が完了するまで待たなければならない場合です。 これは、**ブロッキング**操作が行われている間は イベントループが JavaScript の実行を継続できないために起こります。

## コードを比較する

Node.js では、 I/O などの JavaScript 以外の操作を待機するのではなく、CPU に負荷がかかるためパフォーマンスが低下する JavaScript は通常、 **ブロッキング**としては呼び出されません。 Node.js 標準ライブラリの libuv を使用する同期メソッドは、最も一般的に使用されている**ブロッキング**操作です。 ネイティブモジュールには**ブロッキング**メソッドもあります。

Node.js 標準ライブラリのすべての I/O メソッドは非同期バージョンを提供します。 これらは**ノンブロッキング**で、コールバック関数を受け入れます。 一部のメソッドには**ブロッキング**に対応したものもあり、 その名前は `Sync` で終わります。

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // ファイルが読み込まれるまでここでブロック
```

And here is an equivalent **asynchronous** example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

**ブロッキング**メソッドは同期的に実行され、 **ノンブロッキング**メソッドは非同期的に実行されます。

例としてファイルシステムモジュールを使用する場合、これは**同期的な**ファイルの読み取りです:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // ファイルが読み込まれるまでここでブロック
console.log(data);
moreWork(); // console.log の後に実行されます
```

そして、これは同等の**非同期的な**コードの例です:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // console.log の前に実行されます
```

最初の例は2番目の例よりも単純に見えますが、 2行目がファイル全体が読み取られるまで追加の JavaScript の実行を**ブロックする**という欠点があります。 同期バージョンでは、エラーがスローされた場合はそれをキャッチする必要があるか、 プロセスがクラッシュします。 非同期バージョンでは、 示されているようにエラーをスローするかどうかを決めるのは開発者次第です。

## 並行性とスループット

例を少しだけ拡張しましょう:

そして、これは似ていますが、同等ではない非同期の例です。

上記の最初の例では、`console.log` が `moreWork()` の前に呼び出されます。 2番目の例では、`fs.readFile()` は**ノンブロッキング**であるため、JavaScript の実行は続行でき、 `moreWork()` が最初に呼び出されます。 ファイルの読み込みが完了するのを待たずに `moreWork()` を実行する機能は、 より高いスループットを可能にする重要な設計上の選択です。

## ブロッキングコードとノンブロッキングコードが混在する危険性

There are some patterns that should be avoided when dealing with I/O. Let's look at an example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

Node.js での JavaScript の実行はシングルスレッドであるため、 同時実行性とは、他の作業が完了した後に JavaScript コールバック関数を実行するイベントループの能力のことです。 同時に実行されることが予想されるコードでは、 I/O などの JavaScript 以外の操作が発生しても、 イベントループの実行を継続できる必要があります。

```js
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

例として、Web サーバへの各リクエストが完了するのに 50 ミリ秒かかり、 その 50 ミリ秒のうち 45 ミリ秒が非同期に実行できるデータベース入出力である場合を考えてみましょう。 **ノンブロッキング**の非同期操作を選択すると、 他のリクエストを処理するために 1 リクエストあたり 45 ミリ秒が解放されます。 これは、**ブロッキング**メソッドの代わりに**ノンブロッキング**メソッドを使用することを選択しただけで、 キャパシティが大きく異なることを意味します。

## Additional Resources

* [libuv](https://libuv.org/)
* [About Node.js](/en/about/)
