---
title: Buffer.from()/Buffer.alloc() API への移植
layout: docs.hbs
---

# `Buffer.from()`/`Buffer.alloc()` API への移植

## 概要

このガイドは安全な `Buffer` コンストラクタメソッドに移行する方法を説明します。マイグレーションにより、以下の非推奨警告が修正されました。

<div class="highlight-box">
The Buffer() and new Buffer() constructors are not recommended for use due to security and usability concerns. Please use the new Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() construction methods instead.
</div>

* [Variant 1: Node.js ≤ 4.4.x および 5.0.0 — 5.9.x のサポートを終了](#variant-1) (*推奨*)
* [Variant 2: ポリフィルの使用](#variant-2)
* [Variant 3: セーフガード付きの手動検出](#variant-3)

### `grep` を使って問題のあるコードを見つける

Just run `grep -nrE '[^a-zA-Z](Slow)?Buffer\s*\(' --exclude-dir node_modules`.

`grep -nrE '[^a-zA-Z](Slow)?Buffer\s*\(' --exclude-dir node_modules` を実行するだけです。

### Node.js 8 を使用して問題のあるコードを見つける

それにより自身のコードの中ですべての潜在的に危険な箇所が分かるでしょう (とてもありそうにない例外を除いて)。

* `--trace-warnings` は Node.js にこの警告と Node.js によって表示される他の警告のスタックトレースを表示させます
* `--trace-deprecation` でも同じことができますが、それは非推奨警告のためだけです
* `--pending-deprecation` はより多くの種類の非推奨警告を表示します。特に Node.js 8 でも、`Buffer()` の非推奨警告が表示されます

Node.js ≥ 8.0.0 (これが推奨されています) を使用している場合、Node.js は関連するコードを見つけるのに役立つ複数のオプションを公開します。

```bash
$ export NODE_OPTIONS='--trace-warnings --pending-deprecation'
$ cat example.js
'use strict';
const foo = new Buffer('foo');
$ node example.js
(node:7147) [DEP0005] DeprecationWarning: The Buffer() and new Buffer() constructors are not recommended for use due to security and usability concerns. Please use the new Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() construction methods instead.
    at showFlaggedDeprecation (buffer.js:127:13)
    at new Buffer (buffer.js:148:3)
    at Object.<anonymous> (/path/to/example.js:2:13)
    [... more stack trace lines ...]
```

### リンターを使用して問題のあるコードを見つける

環境変数を使用してこれらのフラグを設定できます。

There is a drawback, though, that it doesn't always [work correctly](https://github.com/chalker/safer-buffer#why-not-safe-buffer) when `Buffer` is overridden e.g. with a polyfill, so recommended is a combination of this and some other method described above.

## <!--variant-1-->Variant 1: Node.js ≤ 4.4.x および 5.0.0 — 5.9.x のサポートを終了

ESLint の規則 [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor) または [node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) にも、廃止予定の `Buffer()` API への呼び出しを検知するAPIがあります。 これらの規則はいくつかのプリセットに含まれています。

ただし、`Buffer` がオーバーライドされると 必ずしも[正しく動作する](https://github.com/chalker/safer-buffer#why-not-safe-buffer)とは限らないという欠点があります。 ポリフィルでは、この方法と上記の他の方法を 組み合わせて使用することをお勧めします。

これは現在推奨されている解決策であり、最小限のオーバーヘッドしか意味しません。

* `new Buffer(number)` の場合は、`Buffer.alloc(number)` に置き換えます
* `new Buffer(string)` (または `new Buffer(string, encoding)`) の場合は、`Buffer.from(string)` (または `Buffer.from(string, encoding)`) に置き換えます
* 他のすべての引数の組み合わせ (これは滅多にありません)では、`new Buffer(...arguments)` を `Buffer.from(...arguments)` に置き換えます

Node.js 5.x リリースラインは2016年7月からサポートされていません。Node.js 4.x リリースラインは2018年4月にサポート終了となります (→ [Schedule](https://github.com/nodejs/Release#release-schedule))。つまり、セキュリティ上の問題が発生した場合でも、これらのバージョンの Node.js は更新を*受け取らない*ので、可能な限りこれらのリリースラインを使用しないでください。

この場合にすることは、すべての `new Buffer()` または `Buffer()` 呼び出しが `Buffer.alloc()` または `Buffer.from()` を使用するように変換することです。

`Buffer.alloc()` は現在の Node.js バージョンにおいても `new Buffer(size).fill(0)`と比べて _より速い_ ことに注意してください。

_If you currently support those older Node.js versions and dropping support for them is not possible, or if you support older branches of your packages, consider using [Variant 2](#variant-2) or [Variant 3](#variant-3) on older branches, so people using those older branches will also receive the fix. That way, you will eradicate potential issues caused by unguarded `Buffer` API usage and your users will not observe a runtime deprecation warning when running your code on Node.js 10._

## <!--variant-2-->Variant 2: ポリフィルの使用

`Buffer` コンストラクタを自動的に `Buffer.alloc()` または `Buffer.from()` に移行するための [JSCodeshift codemod](https://github.com/joyeecheung/node-dep-codemod#dep005) もあります。 現在のところ、引数がリテラルである場合、 またはコンストラクタが2つの引数で呼び出される場合にのみ機能することに注意してください。

* **[safer-buffer](https://www.npmjs.com/package/safer-buffer)** は `Buffer` API 全体の代わりとなるドロップインであり、 `new Buffer()` を使用すると _throw_ します。

  [Variant 1](#variant-1)とまったく同じ手順を踏みますが、 新しい `Buffer` API を使うすべてのファイルにポリフィル `const Buffer = require('safer-buffer').Buffer` を入れます。

  古い `new Buffer()` API を使わないでください。上記の行が追加されているファイルでは、 古い `new Buffer()` API を使用すると _throw_ されます。

* **[buffer-from](https://www.npmjs.com/package/buffer-from) または [buffer-alloc](https://www.npmjs.com/package/buffer-alloc)** あるいはその両方は `Buffer` API のそれぞれの部分の [ポリフィル](https://ponyfill.com/) です。 使用している API に対応するパッケージを追加するだけです。

  必要なモジュールを適切な名前、例えば `const bufferFrom = require('buffer-from')` でインポートします。 そして `new Buffer()` の呼び出しの代わりにそれを使います。 `new Buffer('test')` は `bufferFrom('test')`になります。

  このアプローチの欠点は、移行するためのコード変更 (たとえば、`Buffer.from()` を別の名前で使用しているような) が 多少増えることです。

* **[safe-buffer](https://www.npmjs.com/package/safe-buffer)** も `Buffer` API 全体の代わりになるドロップインですが、 `new Buffer()` を使用しても以前と同じように動作します。

  このアプローチのマイナス面は、コード内で古い `new Buffer()` API を使用することも可能になることです。 これは、コード内で問題を引き起こす可能性があり、 Node.js 10 以降で実行時に非推奨の警告を発行し始めます ([詳細はこちらをご覧ください](https://github.com/chalker/safer-buffer#why-not-safe-buffer))。

Note that in either case, it is important that you also remove all calls to the old `Buffer` API manually — just throwing in `safe-buffer` doesn't fix the problem by itself, it just provides a polyfill for the new API. I have seen people doing that mistake.

利用可能な3つの異なるポリフィルがあります。

_Don't forget to drop the polyfill usage once you drop support for Node.js < 4.5.0._

## <!--variant-3-->Variant 3 — セーフガード付きの手動検出

ESLint ルールの [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor) または [node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) を有効にすることを お勧めします。

### `Buffer(0)`

This special case for creating empty buffers can be safely replaced with `Buffer.concat([])`, which returns the same result all the way down to Node.js 0.8.x.

### `Buffer(notNumber)`

Before:

```js
const buf = new Buffer(notNumber, encoding);
```

これは、少数の場所 (たとえば1か所) だけで `Buffer` インスタンスを作成する場合、 またはそれらの周りに独自のラッパーがある場合に便利です。

```js
let buf;
if (Buffer.from && Buffer.from !== Uint8Array.from) {
  buf = Buffer.from(notNumber, encoding);
} else {
  if (typeof notNumber === 'number') {
    throw new Error('The "size" argument must be not of type number.');
  }
  buf = new Buffer(notNumber, encoding);
}
```

空のバッファを作成するためのこの特別なケースは安全に `Buffer.concat([])` で置き換えることができます。 これは Node.js 0.8.x までずっと同じ結果を返します。

使用前:

使用後:

`encoding` は任意です。

### `Buffer(number)`

`new Buffer()` の前の `typeof notNumber` は必須であり (`notNumber` 引数がハードコーディングされていない場合)、 _`Buffer` コンストラクタの廃止が原因ではない_ ことに注意してください。 `Buffer` コンストラクタが廃止されるのはそのためです。 この型チェックに欠けているエコシステムパッケージは多くのセキュリティ問題を引き起こしました。 悪意のあるユーザー入力が `Buffer(arg)` になって DoS からプロセスメモリから攻撃者への機密情報の漏洩に至る問題を引き起こすことです。

```js
var buf;
if (Buffer.alloc) {
  buf = Buffer.alloc(number);
} else {
  buf = new Buffer(number);
  buf.fill(0);
}
```

`notNumber` 引数がハードコードされている場合 (例: リテラル `"abc"` または `[0,1,2]`)、 `typeof` チェックは省略できます。

```js
const buf = Buffer.alloc ? Buffer.alloc(number) : new Buffer(number).fill(0);
```

## `Buffer.allocUnsafe()` について

また、TypeScript を使用してもこの問題は解決されないことに注意してください。 `TypeScript` で記述されたライブラリが JS から使用される場合、またはユーザ入力がそこで終わる場合、 すべての型チェックは変換時のみであり、 TS がコンパイルする実際の JS コードには存在しません。

* 正当な理由がない場合は使用しないでください
  * 例えば、おそらく小さなバッファのパフォーマンスの違いを見たことがない場合でしょう。 実際、それらは `Buffer.alloc()` でもっと速いかもしれません
  * コードがホットコードパスにない場合 - おそらく違いに気付かないでしょう
  * ゼロフィリングは潜在的なリスクを最小限に抑えることに留意してください
* 使用する場合は、決してバッファを部分的に満たした状態で返さないようにしてください
  * 順番にそれを書いているならば - 常に実際に書かれた長さにそれを切り捨てます

Node.js 0.10.x (およびそれ以下) をサポートする場合

_Note that the same applies to `new Buffer()` usage without zero-filling, depending on the Node.js version (and lacking type checks also adds DoS to the list of potential problems)._

## FAQ

### <!--design-flaws-->`Buffer` コンストラクタの何が問題になっていますか。

The `Buffer` constructor could be used to create a buffer in many different ways:

* `new Buffer(42)` は 42 バイトの `Buffer` を作成します。 Node.js 8 以前は、このバッファにはパフォーマンス上の理由から*任意のメモリ*が含まれていました。 これには、プログラムのソースコードからパスワードや暗号化キーまで、さまざまなものが含まれます。
* `new Buffer('abc')` は、文字列 `'abc'` の UTF-8 エンコードバージョンを含む `Buffer` を作成します。 2番目の引数は別のエンコーディングを指定できます。 たとえば、`new Buffer(string, 'base64')` を使用して、 Base64 文字列をそれが表す元のバイトシーケンスに変換できます。
* 引数には他にもいくつかの組み合わせがあります。

`Buffer.allocUnsafe()` を使用するときは特に注意してください:

`Buffer.allocUnsafe()` で割り当てられたバッファの処理エラーは、 コードの未定義の動作からリモートの攻撃者に漏洩する機密データ (ユーザ入力、パスワード、証明書) まで、 さまざまな問題を引き起こす可能性があります。

```js
function stringToBase64(req, res) {
  // リクエストボディは `{ string: 'foobar' }` のフォーマットを持つべきです。
  const rawBytes = new Buffer(req.body.string);
  const encoded = rawBytes.toString('base64');
  res.end({ encoded });
}
```

Note that this code does *not* validate the type of `req.body.string`:

* `req.body.string` は文字列であることが期待されています。この場合、すべてうまくいきます。
* `req.body.string` はリクエストを送信するクライアントによって制御されます。
* If `req.body.string` is the *number* `req.body.string` が *数値の*
  * Node.js 8 以前の場合、コンテンツは初期化されていませんでした。
  * Node.js 8 以降の場合、コンテンツは値が `0` の `50` バイトになります。

`Buffer` コンストラクタは、さまざまな方法でバッファを作成するために使うことができます:

* 未初期化メモリを読み取ります。 これにより、パスワード、暗号化キー、その他の機密情報が**漏洩します**。(情報漏洩)
* プログラムに大量のメモリーを割り当てさせます。 たとえば、`500000000` を入力値として指定した場合、各リクエストは 500MB のメモリを割り当てます。 これは、プログラムの利用可能なメモリを完全に使い果たしてクラッシュさせる、 または大幅に遅くするために使用できます。(サービス拒否)

つまり、`var buffer = new Buffer(foo);`のようなコードでは、 `foo` の型を知ることなしに、生成されたバッファの内容が正確に何であるかを知ることはできません。

時々、`foo` の値は外部の情報源から来ます。 たとえば、この関数は Web サーバ上のサービスとして公開され、UTF-8 文字列を Base64 形式に変換します:

### <!--ecosystem-usage-->`Buffer()` コンストラクタはしばらくの間非推奨です。これは本当に問題なのでしょうか。

このコードは `req.body.string` の型を検証*しない*ことに注意してください:
