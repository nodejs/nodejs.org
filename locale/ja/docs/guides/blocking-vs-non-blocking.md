---
title: ブロッキングとノンブロッキングの概要
layout: docs.hbs
---

<!--
# Overview of Blocking vs Non-Blocking

This overview covers the difference between **blocking** and **non-blocking**
calls in Node.js. This overview will refer to the event loop and libuv but no
prior knowledge of those topics is required. Readers are assumed to have a
basic understanding of the JavaScript language and Node.js callback pattern.

> "I/O" refers primarily to interaction with the system's disk and
> network supported by [libuv](https://libuv.org/).

-->
# ブロッキングとノンブロッキングの概要

この概要では、Node.js における**ブロッキング**と**ノンブロッキング**呼び出しの違いについて説明します。
この概要ではイベントループと libuv について説明しますが、
これらのトピックに関する事前知識は必要ありません。
読者は JavaScript 言語と Node.js コールバックパターンの基本的な知識を持っていることを前提としています。

> "I/O" とは、主に [libuv](https://libuv.org/) がサポートしている
> システムのディスクやネットワークとのやり取りを指します。

<!--
## Blocking

**Blocking** is when the execution of additional JavaScript in the Node.js
process must wait until a non-JavaScript operation completes. This happens
because the event loop is unable to continue running JavaScript while a
**blocking** operation is occurring.

In Node.js, JavaScript that exhibits poor performance due to being CPU intensive
rather than waiting on a non-JavaScript operation, such as I/O, isn't typically
referred to as **blocking**. Synchronous methods in the Node.js standard library
that use libuv are the most commonly used **blocking** operations. Native
modules may also have **blocking** methods.

All of the I/O methods in the Node.js standard library provide asynchronous
versions, which are **non-blocking**, and accept callback functions. Some
methods also have **blocking** counterparts, which have names that end with
`Sync`.

-->
## ブロッキング

**ブロッキング**は、Node.js プロセス内の追加の JavaScript の実行が、
JavaScript 以外の操作が完了するまで待たなければならない場合です。
これは、**ブロッキング**操作が行われている間は
イベントループが JavaScript の実行を継続できないために起こります。

Node.js では、
I/O などの JavaScript 以外の操作を待機するのではなく、CPU に負荷がかかるためパフォーマンスが低下する JavaScript は通常、
**ブロッキング**としては呼び出されません。
Node.js 標準ライブラリの libuv を使用する同期メソッドは、最も一般的に使用されている**ブロッキング**操作です。
ネイティブモジュールには**ブロッキング**メソッドもあります。

Node.js 標準ライブラリのすべての I/O メソッドは非同期バージョンを提供します。
これらは**ノンブロッキング**で、コールバック関数を受け入れます。
一部のメソッドには**ブロッキング**に対応したものもあり、
その名前は `Sync` で終わります。

<!--
## Comparing Code

**Blocking** methods execute **synchronously** and **non-blocking** methods
execute **asynchronously**.

Using the File System module as an example, this is a **synchronous** file read:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
```

And here is an equivalent **asynchronous** example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

The first example appears simpler than the second but has the disadvantage of
the second line **blocking** the execution of any additional JavaScript until
the entire file is read. Note that in the synchronous version if an error is
thrown it will need to be caught or the process will crash. In the asynchronous
version, it is up to the author to decide whether an error should throw as
shown.

Let's expand our example a little bit:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log
```

And here is a similar, but not equivalent asynchronous example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log
```

In the first example above, `console.log` will be called before `moreWork()`. In
the second example `fs.readFile()` is **non-blocking** so JavaScript execution
can continue and `moreWork()` will be called first. The ability to run
`moreWork()` without waiting for the file read to complete is a key design
choice that allows for higher throughput.

-->
## コードを比較する

**ブロッキング**メソッドは同期的に実行され、
**ノンブロッキング**メソッドは非同期的に実行されます。

例としてファイルシステムモジュールを使用する場合、これは**同期的な**ファイルの読み取りです:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // ファイルが読み込まれるまでここでブロック
```

そして、これは同等の**非同期的な**コードの例です:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

最初の例は2番目の例よりも単純に見えますが、
2行目がファイル全体が読み取られるまで追加の JavaScript の実行を**ブロックする**という欠点があります。
同期バージョンでは、エラーがスローされた場合はそれをキャッチする必要があるか、
プロセスがクラッシュします。
非同期バージョンでは、
示されているようにエラーをスローするかどうかを決めるのは開発者次第です。

例を少しだけ拡張しましょう:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // ファイルが読み込まれるまでここでブロック
console.log(data);
moreWork(); // console.log の後に実行されます
```

そして、これは似ていますが、同等ではない非同期の例です。

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // console.log の前に実行されます
```

上記の最初の例では、`console.log` が `moreWork()` の前に呼び出されます。
2番目の例では、`fs.readFile()` は**ノンブロッキング**であるため、JavaScript の実行は続行でき、
`moreWork()` が最初に呼び出されます。
ファイルの読み込みが完了するのを待たずに `moreWork()` を実行する機能は、
より高いスループットを可能にする重要な設計上の選択です。

<!--
## Concurrency and Throughput

JavaScript execution in Node.js is single threaded, so concurrency refers to the
event loop's capacity to execute JavaScript callback functions after completing
other work. Any code that is expected to run in a concurrent manner must allow
the event loop to continue running as non-JavaScript operations, like I/O, are
occurring.

As an example, let's consider a case where each request to a web server takes
50ms to complete and 45ms of that 50ms is database I/O that can be done
asynchronously. Choosing **non-blocking** asynchronous operations frees up that
45ms per request to handle other requests. This is a significant difference in
capacity just by choosing to use **non-blocking** methods instead of
**blocking** methods.

The event loop is different than models in many other languages where additional
threads may be created to handle concurrent work.

-->
## 並行性とスループット

Node.js での JavaScript の実行はシングルスレッドであるため、
同時実行性とは、他の作業が完了した後に JavaScript コールバック関数を実行するイベントループの能力のことです。
同時に実行されることが予想されるコードでは、
I/O などの JavaScript 以外の操作が発生しても、
イベントループの実行を継続できる必要があります。

例として、Web サーバへの各リクエストが完了するのに 50 ミリ秒かかり、
その 50 ミリ秒のうち 45 ミリ秒が非同期に実行できるデータベース入出力である場合を考えてみましょう。
**ノンブロッキング**の非同期操作を選択すると、
他のリクエストを処理するために 1 リクエストあたり 45 ミリ秒が解放されます。
これは、**ブロッキング**メソッドの代わりに**ノンブロッキング**メソッドを使用することを選択しただけで、
キャパシティが大きく異なることを意味します。

イベントループは、
並行作業を処理するために追加のスレッドが作成される可能性がある他の多くの言語のモデルとは異なります。

<!--
## Dangers of Mixing Blocking and Non-Blocking Code

There are some patterns that should be avoided when dealing with I/O. Let's look
at an example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

In the above example, `fs.unlinkSync()` is likely to be run before
`fs.readFile()`, which would delete `file.md` before it is actually read. A
better way to write this that is completely **non-blocking** and guaranteed to
execute in the correct order is:

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

The above places a **non-blocking** call to `fs.unlink()` within the callback of
`fs.readFile()` which guarantees the correct order of operations.

-->
## ブロッキングコードとノンブロッキングコードが混在する危険性

I/O を扱うときに避けるべきいくつかのパターンがあります。
例を見てみましょう。

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

上記の例では、`fs.unlinkSync()` は
`fs.readFile()` の前に実行される可能性が高いため、
`file.md` は実際に読み取られる前に削除されます。
これを書くためのより良い方法は、
完全に**ノンブロッキング**で正しい順序で実行されることが保証されていることです。

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

上記は、`fs.readFile()`のコールバック内で `fs.unlink()` への**ノンブロッキング**呼び出しを行います。
これにより、正しい操作順序が保証されます。

<!--
## Additional Resources

* [libuv](https://libuv.org/)
* [About Node.js](/en/about/)

-->
## 追加のリソース

* [libuv](https://libuv.org/)
* [About Node.js](/ja/about/)
