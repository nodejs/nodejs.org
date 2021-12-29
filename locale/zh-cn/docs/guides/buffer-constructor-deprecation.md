---
title: 请使用 Buffer.from()/Buffer.alloc()
layout: docs.hbs
---

# 请使用 `Buffer.from()`/`Buffer.alloc()`

## <!--overview-->概括

本教程将向你介绍如果迁移到安全的 `Buffer` 构造函数方法。此合并将消除以下已废除的警告：

<div class="highlight-box">
Buffer() 和 new Buffer() 构造函数对于有安全顾虑的人而言是不推荐使用的。请使用新的方法 Buffer.alloc()，Buffer.allocUnsafe() 或者是 Buffer.from() 构造函数。
</div>

* [变化 1： 在 Node.js ≤ 4.4.x 和 5.0.0 — 5.9.x 版本中不支持](#variant-1) (*推荐*)
* [变化 2： 使用 polyfill 库](#variant-2)
* [变化 3： 带安全守护的手动检测](#variant-3)

### 在使用 `grep` 的代码中找出一些问题

运行 `grep -nrE '[^a-zA-Z](Slow)?Buffer\s*\(' --exclude-dir node_modules`.

此代码将从你的代码中找出潜在的不安全的代码（包括一些潜在地，没有考虑周到的异常）。

### 在使用 `Node 8` 的代码中找出一些问题

如果你使用的 Node.js 版本大于等于 8.0.0，Node.js 提供了一些选项帮助你在代码中寻找相关问题：

* `--trace-warnings` 通过 Node.js 向您展示堆栈信息跟踪，打印出此警告和其它警告信息。
* `--trace-deprecation` 和上面差不多，不过只打印废弃警告。
* `--pending-deprecation` 将对废弃警告给出更多的类型。尤其它会展示 `Buffer()` 的废弃警告，即便在 Node.js 8 也是如此。

你可以使用环境变量设置这些开关：

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

### 在使用 `linter` 的代码中找出一些问题

ESLint 规则[不使用缓存构造函数](https://eslint.org/docs/rules/no-buffer-constructor)或 [node/ 未废除的 Api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) 也会寻找到使用 `Buffer()` 废弃的函数。 这些规则预先已经包含了。

不过这存在一个劣势，举个例子，当 `Buffer` 被 polyfill 重写的时候，它不保证一直[正常工作](https://github.com/chalker/safer-buffer#why-not-safe-buffer)。所以推荐使用此方法和其它如上描述的方法在一起使用。

## <!--variant-1-->变化 1： 在 Node.js ≤ 4.4.x 和 5.0.0 — 5.9.x 版本中不支持

这是现在的一个推荐的解决方案，暗示仅有极小的成本。

Node.js 5.x 发行自 2016 年就不再支持，而 4.x 版本发行线支持到 2018 年 4 月就寿终正寝了（→ [计划表](https://github.com/nodejs/Release#release-schedule)）。这意味着这些版本 *不会* 接受任何更新，即便有安全问题也不会被修复，所以如果可能，我们不应使用这些版本。

在这种情况下，你应该把全部的 `new Buffer()` 或 `Buffer()` 更改为 `Buffer.alloc()` 或 `Buffer.from()`，规则如下：

* 对于 `new Buffer(number)`, 请用 `Buffer.alloc(number)` 替换。
* 对于 `new Buffer(string)` （或 `new Buffer(string, encoding)`），请用对应的 `Buffer.from(string)` （或 `Buffer.from(string, encoding)`）进行替换。
* 对于其它情况（一般极为罕见）中使用了 `new Buffer(...arguments)` 的，请用 `Buffer.from(...arguments)` 进行替换。

注意：`Buffer.alloc()` 在当前的 Node.js 版本上 _快于_
`new Buffer(size).fill(0)`，后者是当你确认需要用 0 对整个缓存进行初始化。

启用 ESLint 检查规则[不使用缓存构造函数](https://eslint.org/docs/rules/no-buffer-constructor)或 [node/ 未废除的 Api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) 时，也会建议避免使用不安全的 `Buffer` 函数。

同样我们还有 [JSCodeshift codemod](https://github.com/joyeecheung/node-dep-codemod#dep005)，它可以把 `Buffer` 构造函数的地方自动替换成 `Buffer.alloc()` 或 `Buffer.from()`。注意目前它只会工作在参数是文本型，或者带有两个参数的构造函数的情况下。

_如果你目前支持那些旧版本的 Node.js，并且抛弃对它们的支持又不可能的情况下，或者你需要支持你包中的旧版本情况下，请考虑使用[版本 2](#variant-2)，或者[版本 3](#variant-3)。这样人们可以在使用这些旧版本情况下照样修复这些安全问题。那样的话，这些由不安全的 `Buffer` 所引发的问题会被你彻底根除，你的用户也不用在你运行 Node.js 10 的时候观察你的运行时废弃警告。_

## <!--variant-2-->变化 2： 使用替换库

存在着三种替换库：

* **[更安全的缓存](https://www.npmjs.com/package/safer-buffer)** 是整个用来替换 `Buffer` 函数的方法。当你在使用 `new Buffer()` 的时候，将会 _抛出_ 异常。
  和[变化 1](#版本-1) 中一样，你会得到详细同样的步骤。不过请用 `const Buffer = require('safer-buffer').Buffer` 在你所有文件中对 `Buffer` 函数进行替换。

  请不要使用旧版本的 `new Buffer()` 函数，在添加上面的行的任何文件中，使用 `new Buffer()` 会 _抛出_ 异常。

* **[buffer-from](https://www.npmjs.com/package/buffer-from) 或
  [buffer-alloc](https://www.npmjs.com/package/buffer-alloc)** 都是
  [ponyfills](https://ponyfill.com/) `Buffer` 可接受的方案。 你所要做的就是针对你自己的 API 添加所需的包。

  你需要用一个合适的名字为这些调入的模块重命名，例如 `const bufferFrom = require('buffer-from')`。并且使用它们取代你的 `new Buffer()`。例如 `new Buffer('test')` 变成了 `bufferFrom('test')`。

  这种方法的缺点是稍微改变代码以迁移它们（如您所希望的那样）。例如在不同的名称下使用 `Buffer.from()`。

* **[安全的缓存](https://www.npmjs.com/package/safe-buffer)** 同样也是替换整个 `Buffer` 的方案，但是用 `new Buffer()` 也可以像以前一样正常工作。

  欲达此目的而降阶到此，可以让你在代码中使用稍旧一些的 `new Buffer()` 函数，它会引发代码一些问题，并在 Node.js 10 （[阅读更多详情](https://github.com/chalker/safer-buffer#why-not-safe-buffer)） 激发对于运行时废弃函数的警告检查。

注意，在任意一种情况下，手动移除你代码中所有关于 `Buffer` 的调用非常重要——仅在 `safe-buffer` 中抛出警告不解决问题，它只是为新的 API 提供了一种替换而已。我亲眼见过人们犯过这类错误。

启用 ESLint 规则[不使用缓存构造函数](https://eslint.org/docs/rules/no-buffer-constructor)
或是 [node/ 未废除的 Api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md) 是推荐的。

_如果你抛弃了对 Node.js 版本小于 4.5.0 的支持，请不要忘记把替代库也一起去掉。_

## <!--variant-3-->变化 3 — 带安全守护的手动检测

在某些情况下这对于你创建 `Buffer` 实例是有帮助的（例如：只需要一个实例的情况下）。或者你有你自己的包装围绕在它们身边。

### `Buffer(0)`

创建空缓存这个特殊的例子可以用 `Buffer.concat([])` 来代替，对于 Node.js 0.8.x 版本而言返回同样的结果。

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

`encoding` 为可选参数。

注意在 `new Buffer()` 前的 `typeof notNumber` 检测必不可少（对于 `notNumber` 参数不是硬编码的情况下），并且 _不会引发 `Buffer` 构造函数废弃的警报_——这就是 _为什么_ 说 `Buffer` 构造函数被废弃的原因。缺少此类型检测的生态系统引发过不计其数的安全事故——如脏用户的某些输入，在 `Buffer(arg)` 可能会意外终止，这会导致从 DoS 攻击到从进程内存向攻击者泄露敏感信息范围内一系列问题。

当 `notNumber` 被硬编码（如文本型 `"abc"` 或者 `[0,1,2]`）， `typeof` 类型检查可以被忽略。

当然，注意使用 TypeScript 也不解决问题——用 `TypeScript` 写的库从 JS 方引用，或者用户的输入停在那边——它表现得就和原生态的 JS 一模一样，因为所有类型检查仅仅在翻译解析阶段，在 TS 编译成真实的 JS 代码时却不存在了。

### `Buffer(number)`

对于 Node.js 0.10.x （和之后的版本）支持：

```js
let buf;
if (Buffer.alloc) {
  buf = Buffer.alloc(number);
} else {
  buf = new Buffer(number);
  buf.fill(0);
}
```

其余版本（Node.js ≥ 0.12.x）：

```js
const buf = Buffer.alloc ? Buffer.alloc(number) : new Buffer(number).fill(0);
```

## 关于 `Buffer.allocUnsafe()`

使用 `Buffer.allocUnsafe()` 须格外谨慎几点：

* 如果没有一个很好的理由，请不要使用它：
  * 对于小缓存，你或许不想看到性能上的差别。实际上，用 `Buffer.alloc()` 甚至更快。
  * 如果你的代码不是在热代码路径中——你也不希望看到有差别，记住用零填充将把潜在的风险降到最低。
* 如果你使用它，请务必保证你从不会返回只填充了一部分的缓存，
  * 如果你按顺序写入此缓存——总是截取此缓存到你写入缓存的实际长度。

处理与 `Buffer.allocUnsafe()` 相关的缓存错误可能会引发各种各样的问题，从你代码的不确定行为表现到敏感数据（如用户输入，密码，相关证书等）被泄露给远程的攻击者等。

_注意，当你不用 0 去填充缓存，此问题同样发生在 `new Buffer()` 上。这依赖于 Node.js 版本（缺少类型检查也会额外增加 DoS 攻击）。_

## <!--faq-->常见问题

### <!--design-flaws-->`Buffer` 构造函数有什么问题？

`Buffer` 构造函数可以用不同方式创建缓存：

* `new Buffer(42)` 创建一个 42 个字节的 `缓存`。在 Node.js 8 之前，该缓存考虑性能，它包含 *随机内存*，而这可能包括任何数据，从编码的源码到密码，以及加密秘钥等。
* `new Buffer('abc')` 创建一个 UTF-8 编码的字符串 `'abc'`。第二个参数可以指定用何种编码：举一个例子，`new Buffer(string, 'base64')` 可用于将 Base64 字符串转换为原始字符串表示的字节序列。
* 除此之外，还有一些其它参数的组合。

这意味着在代码中诸如 `var buffer = new Buffer(foo);`，当你不知道 `foo` 是什么类型，想要知道生成的缓存里边到底存了什么内容几乎是不可能的。

有时，`foo` 的值来源于外部源头。举一个例子，以下函数作为服务器上的一个函数公开，把 UTF-8 的编码字符串转换成 Base64 形式：

```js
function stringToBase64(req, res) {
  // The request body should have the format of `{ string: 'foobar' }`.
  const rawBytes = new Buffer(req.body.string);
  const encoded = rawBytes.toString('base64');
  res.end({ encoded });
}
```

注意这个代码 *不会* 验证 `req.body.string` 的类型：

* `req.body.string` 期望的类型是字符串型。如果是这种情况一切正常。
* `req.body.string` 受客户端发送请求所控制。
* 如果 `req.body.string` 是 *数字* `50`，`rawBytes` 将变成 `50` 个字节：
  * 在 Node.js 8 之前，内容是未经初始化的。
  * 在 Node.js 8 之后，内容是 50 个 0。

因为缺少类型检查，攻击者可以别有用心地发送一个数字作为请求的一部分，借助它，他们可以：

* 读取未初始化的内存数据。 这显然 **会** 导致密码、秘钥和其它敏感数据的泄露（信息泄露）。
* 强迫程序开辟一个超大内存区域。举一个例子，当指定 `500000000` 作为输入数据时，每个请求将开辟 500MB 内存区。这不是会耗尽内存使得程序崩溃，就会导致明显的程序性能下降（服务拒绝攻击）。

这些情况在现实的网络服务中都被认为是非常严重的安全问题。

当使用 `Buffer.from(req.body.string)` 的时候，如果传入一个数字总是抛出异常，给程序提供了一个总是可以自我处理的机会。

### <!--ecosystem-usage-->`Buffer()` 构造函数废弃有一阵了，它有问题吗？

检测 `npm` 生态系统的代码，表明 `Buffer()` 仍然广泛被使用。这包含新提交的代码，以及这类代码的使用仍然在 *增长中*。
