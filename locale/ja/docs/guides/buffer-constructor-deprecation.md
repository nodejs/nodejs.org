---
title: Buffer.from()/Buffer.alloc() API への移植
layout: docs.hbs
---

<!-- 
# Porting to the `Buffer.from()`/`Buffer.alloc()` API

## Overview

This guide explains how to migrate to safe `Buffer` constructor methods. The migration fixes the following deprecation warning:

<div class="highlight-box"> 
The Buffer() and new Buffer() constructors are not recommended for use due to security and usability concerns. Please use the new Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() construction methods instead.
</div>

- [Variant 1: Drop support for Node.js ≤ 4.4.x and 5.0.0 — 5.9.x](#variant-1) (*recommended*)
- [Variant 2: Use a polyfill](#variant-2)
- [Variant 3: Manual detection, with safeguards](#variant-3)

 -->
# `Buffer.from()`/`Buffer.alloc()` API への移植

## 概要

このガイドは安全な `Buffer` コンストラクタメソッドに移行する方法を説明します。マイグレーションにより、以下の非推奨警告が修正されました。

<div class="highlight-box"> 
The Buffer() and new Buffer() constructors are not recommended for use due to security and usability concerns. Please use the new Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() construction methods instead.
</div>

- [Variant 1: Node.js ≤ 4.4.x および 5.0.0 — 5.9.x のサポートを終了](#variant-1) (*推奨*)
- [Variant 2: ポリフィルの使用](#variant-2)
- [Variant 3: セーフガード付きの手動検出](#variant-3)

<!-- 
### Finding problematic bits of code using `grep`

Just run `grep -nrE '[^a-zA-Z](Slow)?Buffer\s*\(' --exclude-dir node_modules`.

It will find all the potentially unsafe places in your own code (with some considerably unlikely
exceptions).

 -->
### `grep` を使って問題のあるコードを見つける

`grep -nrE '[^a-zA-Z](Slow)?Buffer\s*\(' --exclude-dir node_modules` を実行するだけです。

それにより自身のコードの中ですべての潜在的に危険な箇所が分かるでしょう (とてもありそうにない例外を除いて)。

<!-- 
### Finding problematic bits of code using Node.js 8

If you’re using Node.js ≥ 8.0.0 (which is recommended), Node.js exposes multiple options that help with finding the relevant pieces of code:

- `--trace-warnings` will make Node.js show a stack trace for this warning and other warnings that are printed by Node.js.
- `--trace-deprecation` does the same thing, but only for deprecation warnings.
- `--pending-deprecation` will show more types of deprecation warnings. In particular, it will show the `Buffer()` deprecation warning, even on Node.js 8.

You can set these flags using environment variables:

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

 -->
### Node.js 8 を使用して問題のあるコードを見つける

Node.js ≥ 8.0.0 (これが推奨されています) を使用している場合、Node.js は関連するコードを見つけるのに役立つ複数のオプションを公開します。

- `--trace-warnings` は Node.js にこの警告と Node.js によって表示される他の警告のスタックトレースを表示させます
- `--trace-deprecation` でも同じことができますが、それは非推奨警告のためだけです
- `--pending-deprecation` はより多くの種類の非推奨警告を表示します。特に Node.js 8 でも、`Buffer()` の非推奨警告が表示されます

環境変数を使用してこれらのフラグを設定できます。

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

<!-- 
### Finding problematic bits of code using linters

ESLint rules [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor)
or
[node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md)
also find calls to deprecated `Buffer()` API. Those rules are included in some presets.

There is a drawback, though, that it doesn't always
[work correctly](https://github.com/chalker/safer-buffer#why-not-safe-buffer) when `Buffer` is
overridden e.g. with a polyfill, so recommended is a combination of this and some other method
described above.

 -->
### リンターを使用して問題のあるコードを見つける

ESLint の規則 [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor)
または
[node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) にも、廃止予定の `Buffer()` API への呼び出しを検知するAPIがあります。
これらの規則はいくつかのプリセットに含まれています。

ただし、`Buffer` がオーバーライドされると
必ずしも[正しく動作する](https://github.com/chalker/safer-buffer#why-not-safe-buffer)とは限らないという欠点があります。
ポリフィルでは、この方法と上記の他の方法を
組み合わせて使用することをお勧めします。

<!-- 
## &lt;!--variant-1--&gt;Variant 1: Drop support for Node.js ≤ 4.4.x and 5.0.0 — 5.9.x

This is the recommended solution nowadays that would imply only minimal overhead.

The Node.js 5.x release line has been unsupported since July 2016, and the Node.js 4.x release line reaches its End of Life in April 2018 (→ [Schedule](https://github.com/nodejs/Release#release-schedule)). This means that these versions of Node.js will *not* receive any updates, even in case of security issues, so using these release lines should be avoided, if at all possible.

What you would do in this case is to convert all `new Buffer()` or `Buffer()` calls to use `Buffer.alloc()` or `Buffer.from()`, in the following way:

- For `new Buffer(number)`, replace it with `Buffer.alloc(number)`.
- For `new Buffer(string)` (or `new Buffer(string, encoding)`), replace it with `Buffer.from(string)` (or `Buffer.from(string, encoding)`).
- For all other combinations of arguments (these are much rarer), also replace `new Buffer(...arguments)` with `Buffer.from(...arguments)`.

Note that `Buffer.alloc()` is also _faster_ on the current Node.js versions than
`new Buffer(size).fill(0)`, which is what you would otherwise need to ensure zero-filling.

Enabling ESLint rule [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor)
or
[node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md)
is recommended to avoid accidental unsafe `Buffer` API usage.

There is also a [JSCodeshift codemod](https://github.com/joyeecheung/node-dep-codemod#dep005)
for automatically migrating `Buffer` constructors to `Buffer.alloc()` or `Buffer.from()`.
Note that it currently only works with cases where the arguments are literals or where the
constructor is invoked with two arguments.

_If you currently support those older Node.js versions and dropping support for them is not possible, or if you support older branches of your packages, consider using [Variant 2](#variant-2)
or [Variant 3](#variant-3) on older branches, so people using those older branches will also receive
the fix. That way, you will eradicate potential issues caused by unguarded `Buffer` API usage and
your users will not observe a runtime deprecation warning when running your code on Node.js 10._

 -->
## <!--variant-1-->Variant 1: Node.js ≤ 4.4.x および 5.0.0 — 5.9.x のサポートを終了

これは現在推奨されている解決策であり、最小限のオーバーヘッドしか意味しません。

Node.js 5.x リリースラインは2016年7月からサポートされていません。Node.js 4.x リリースラインは2018年4月にサポート終了となります (→ [Schedule](https://github.com/nodejs/Release#release-schedule))。つまり、セキュリティ上の問題が発生した場合でも、これらのバージョンの Node.js は更新を*受け取らない*ので、可能な限りこれらのリリースラインを使用しないでください。

この場合にすることは、すべての `new Buffer()` または `Buffer()` 呼び出しが `Buffer.alloc()` または `Buffer.from()` を使用するように変換することです。

- `new Buffer(number)` の場合は、`Buffer.alloc(number)` に置き換えます
- `new Buffer(string)` (または `new Buffer(string, encoding)`) の場合は、`Buffer.from(string)` (または `Buffer.from(string, encoding)`) に置き換えます
- 他のすべての引数の組み合わせ (これは滅多にありません)では、`new Buffer(...arguments)` を `Buffer.from(...arguments)` に置き換えます

`Buffer.alloc()` は現在の Node.js バージョンにおいても
`new Buffer(size).fill(0)`と比べて _より速い_ ことに注意してください。

ESLint ルール [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor)
または
[node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) を有効にすることは、
誤った安全でない `Buffer` API の使用を避けるために推奨されます。

`Buffer` コンストラクタを自動的に `Buffer.alloc()` または `Buffer.from()` に移行するための
[JSCodeshift codemod](https://github.com/joyeecheung/node-dep-codemod#dep005) もあります。
現在のところ、引数がリテラルである場合、
またはコンストラクタが2つの引数で呼び出される場合にのみ機能することに注意してください。

_現在、古いバージョンの Node.js をサポートしていて、それらのサポートを削除することができない場合、または古いブランチをサポートしている場合は、
[Variant 2](#variant-2) または [Variant 3](#variant-3) の使用を検討してください。また修正を受け取ります。
そうすることで、無防備な `Buffer` API の使用によって引き起こされる潜在的な問題を根絶し、
Node.js 10 でコードを実行するときにユーザは実行時廃止予定の警告を見ることはないでしょう。_

<!-- 
## &lt;!--variant-2--&gt;Variant 2: Use a polyfill

There are three different polyfills available:

- **[safer-buffer](https://www.npmjs.com/package/safer-buffer)** is a drop-in replacement for the
  entire `Buffer` API, that will _throw_ when using `new Buffer()`.

  You would take exactly the same steps as in [Variant 1](#variant-1), but with a polyfill
  `const Buffer = require('safer-buffer').Buffer` in all files where you use the new `Buffer` API.

  Do not use the old `new Buffer()` API. In any files where the line above is added,
  using old `new Buffer()` API will _throw_.

- **[buffer-from](https://www.npmjs.com/package/buffer-from) and/or
  [buffer-alloc](https://www.npmjs.com/package/buffer-alloc)** are
  [ponyfills](https://ponyfill.com/) for their respective part of the `Buffer` API. You only need
  to add the package(s) corresponding to the API you are using.

  You would import the module needed with an appropriate name, e.g.
  `const bufferFrom = require('buffer-from')` and then use that instead of the call to
  `new Buffer()`, e.g. `new Buffer('test')` becomes `bufferFrom('test')`.

  A downside with this approach is slightly more code changes to migrate off them (as you would be
  using e.g. `Buffer.from()` under a different name).

- **[safe-buffer](https://www.npmjs.com/package/safe-buffer)** is also a drop-in replacement for
  the entire `Buffer` API, but using `new Buffer()` will still work as before.

  A downside to this approach is that it will allow you to also use the older `new Buffer()` API
  in your code, which is problematic since it can cause issues in your code, and will start
  emitting runtime deprecation warnings starting with Node.js 10
  ([read more here](https://github.com/chalker/safer-buffer#why-not-safe-buffer)).

Note that in either case, it is important that you also remove all calls to the old `Buffer`
API manually — just throwing in `safe-buffer` doesn't fix the problem by itself, it just provides
a polyfill for the new API. I have seen people doing that mistake.

Enabling ESLint rule [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor)
or
[node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md)
is recommended.

_Don't forget to drop the polyfill usage once you drop support for Node.js < 4.5.0._

 -->
## <!--variant-2-->Variant 2: ポリフィルの使用

利用可能な3つの異なるポリフィルがあります。

- **[safer-buffer](https://www.npmjs.com/package/safer-buffer)** は `Buffer` API 全体の代わりとなるドロップインであり、
  `new Buffer()` を使用すると _throw_ します。

  [Variant 1](#variant-1)とまったく同じ手順を踏みますが、
  新しい `Buffer` API を使うすべてのファイルにポリフィル `const Buffer = require('safer-buffer').Buffer` を入れます。

  古い `new Buffer()` API を使わないでください。上記の行が追加されているファイルでは、
  古い `new Buffer()` API を使用すると _throw_ されます。

- **[buffer-from](https://www.npmjs.com/package/buffer-from) and/or
  [buffer-alloc](https://www.npmjs.com/package/buffer-alloc)** are
  [ponyfills](https://ponyfill.com/) for their respective part of the `Buffer` API. You only need
  to add the package(s) corresponding to the API you are using.

  You would import the module needed with an appropriate name, e.g.
  `const bufferFrom = require('buffer-from')` and then use that instead of the call to
  `new Buffer()`, e.g. `new Buffer('test')` becomes `bufferFrom('test')`.

  A downside with this approach is slightly more code changes to migrate off them (as you would be
  using e.g. `Buffer.from()` under a different name).

- **[safe-buffer](https://www.npmjs.com/package/safe-buffer)** is also a drop-in replacement for
  the entire `Buffer` API, but using `new Buffer()` will still work as before.

  A downside to this approach is that it will allow you to also use the older `new Buffer()` API
  in your code, which is problematic since it can cause issues in your code, and will start
  emitting runtime deprecation warnings starting with Node.js 10
  ([read more here](https://github.com/chalker/safer-buffer#why-not-safe-buffer)).

Note that in either case, it is important that you also remove all calls to the old `Buffer`
API manually — just throwing in `safe-buffer` doesn't fix the problem by itself, it just provides
a polyfill for the new API. I have seen people doing that mistake.

Enabling ESLint rule [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor)
or
[node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md)
is recommended.

_Don't forget to drop the polyfill usage once you drop support for Node.js < 4.5.0._

## <!--variant-3-->Variant 3 — Manual detection, with safeguards

This is useful if you create `Buffer` instances in only a few places (e.g. one), or you have your own
wrapper around them.

### `Buffer(0)`

This special case for creating empty buffers can be safely replaced with `Buffer.concat([])`, which
returns the same result all the way down to Node.js 0.8.x.

### `Buffer(notNumber)`

Before:

```js
const buf = new Buffer(notNumber, encoding);
```

After:

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

`encoding` is optional.

Note that the `typeof notNumber` before `new Buffer()` is required (for cases when `notNumber` argument is not
hard-coded) and _is not caused by the deprecation of `Buffer` constructor_ — it's exactly _why_ the
`Buffer` constructor is deprecated. Ecosystem packages lacking this type-check caused numerous
security issues — situations when unsanitized user input could end up in the `Buffer(arg)` create
problems ranging from DoS to leaking sensitive information to the attacker from the process memory.

When `notNumber` argument is hardcoded (e.g. literal `"abc"` or `[0,1,2]`), the `typeof` check can
be omitted.

Also, note that using TypeScript does not fix this problem for you — when libs written in
`TypeScript` are used from JS, or when user input ends up there — it behaves exactly as pure JS, as
all type checks are translation-time only and are not present in the actual JS code which TS
compiles to.

### `Buffer(number)`

For Node.js 0.10.x (and below) support:

```js
var buf;
if (Buffer.alloc) {
  buf = Buffer.alloc(number);
} else {
  buf = new Buffer(number);
  buf.fill(0);
}
```

Otherwise (Node.js ≥ 0.12.x):

```js
const buf = Buffer.alloc ? Buffer.alloc(number) : new Buffer(number).fill(0);
```

## Regarding `Buffer.allocUnsafe()`

Be extra cautious when using `Buffer.allocUnsafe()`:
 * Don't use it if you don't have a good reason to
   * e.g. you probably won't ever see a performance difference for small buffers, in fact, those
     might be even faster with `Buffer.alloc()`,
   * if your code is not in the hot code path — you also probably won't notice a difference,
   * keep in mind that zero-filling minimizes the potential risks.
 * If you use it, make sure that you never return the buffer in a partially-filled state,
   * if you are writing to it sequentially — always truncate it to the actual written length

Errors in handling buffers allocated with `Buffer.allocUnsafe()` could result in various issues,
ranged from undefined behavior of your code to sensitive data (user input, passwords, certs)
leaking to the remote attacker.

_Note that the same applies to `new Buffer()` usage without zero-filling, depending on the Node.js
version (and lacking type checks also adds DoS to the list of potential problems)._

## <!--faq-->FAQ

### <!--design-flaws-->What is wrong with the `Buffer` constructor?

The `Buffer` constructor could be used to create a buffer in many different ways:

- `new Buffer(42)` creates a `Buffer` of 42 bytes. Before Node.js 8, this buffer contained
  *arbitrary memory* for performance reasons, which could include anything ranging from
  program source code to passwords and encryption keys.
- `new Buffer('abc')` creates a `Buffer` that contains the UTF-8-encoded version of
  the string `'abc'`. A second argument could specify another encoding: for example,
  `new Buffer(string, 'base64')` could be used to convert a Base64 string into the original
  sequence of bytes that it represents.
- There are several other combinations of arguments.

This meant that in code like `var buffer = new Buffer(foo);`, *it is not possible to tell
what exactly the contents of the generated buffer are* without knowing the type of `foo`.

Sometimes, the value of `foo` comes from an external source. For example, this function
could be exposed as a service on a web server, converting a UTF-8 string into its Base64 form:

```js
function stringToBase64(req, res) {
  // The request body should have the format of `{ string: 'foobar' }`.
  const rawBytes = new Buffer(req.body.string);
  const encoded = rawBytes.toString('base64');
  res.end({ encoded });
}
```

Note that this code does *not* validate the type of `req.body.string`:

- `req.body.string` is expected to be a string. If this is the case, all goes well.
- `req.body.string` is controlled by the client that sends the request.
- If `req.body.string` is the *number* `50`, the `rawBytes` would be `50` bytes:
  - Before Node.js 8, the content would be uninitialized
  - After Node.js 8, the content would be `50` bytes with the value `0`

Because of the missing type check, an attacker could intentionally send a number
as part of the request. Using this, they can either:

- Read uninitialized memory. This **will** leak passwords, encryption keys and other
  kinds of sensitive information. (Information leak)
- Force the program to allocate a large amount of memory. For example, when specifying
  `500000000` as the input value, each request will allocate 500MB of memory.
  This can be used to either exhaust the memory available of a program completely
  and make it crash, or slow it down significantly. (Denial of Service)

Both of these scenarios are considered serious security issues in a real-world
web server context.

When using `Buffer.from(req.body.string)` instead, passing a number will always
throw an exception instead, giving a controlled behavior that can always be
handled by the program.

### <!--ecosystem-usage-->The `Buffer()` constructor has been deprecated for a while. Is this really an issue?

Surveys of code in the `npm` ecosystem have shown that the `Buffer()` constructor is still
widely used. This includes new code, and overall usage of such code has actually been
*increasing*.
