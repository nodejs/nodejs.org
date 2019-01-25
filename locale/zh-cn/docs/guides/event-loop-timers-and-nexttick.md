---
title: Node.js 事件循环，定时器和 process.nextTick()
layout: docs.hbs
---

# Node.js 事件循环，定时器和 `process.nextTick()`

## 什么是事件轮询

事件循环是 Node.js 处理非阻塞 I/O 操作的机制——尽管 JavaScript 是单线程处理的——当有可能的时候，它们会把操作转移到系统内核中去。

既然目前大多数内核都是多线程的，它们可在后台处理多种操作。当其中的一个操作完成的时候，内核通知 Node.js 将适合的回调函数添加到 *轮询* 队列中等待时机执行。我们在本文后面会进行详细介绍。

## 事件轮询机制解析

当 Node.js 启动后，它会初始化事件轮询；处理已提供的输入脚本（或丢入 [REPL][]，本文不涉及到），它可能会调用一些异步的 API 函数调用，安排任务处理事件，或者调用 `process.nextTick()`，然后开始处理事件循环。

下面的图表显示了事件循环的概述以及操作顺序。

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

*注意：每个框框里每一步都是事件循环机制的一个阶段。*

每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后在该阶段的队列中执行回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段，等等。

由于这些操作中的任何一个都可能计划 _更多的_ 操作，并且在 **轮询** 阶段处理的新事件由内核排队，因此在处理轮询事件时，轮询事件可以排队。因此，长时间运行回调可以允许轮询阶段运行大量长于计时器的阈值。有关详细信息，请参阅 [**计时器**](#timers) 和 [**轮询**](#poll) 部分。

_**注意：** 在 Windows 和 Unix/Linux 实现之间存在细微的差异，但这对演示来说并不重要。最重要的部分在这里。实际上有七或八个步骤，但我们关心的是 Node.js 实际上使用以上的某些步骤。_


## 阶段概述

* **定时器**：本阶段执行已经安排的 `setTimeout()` 和 `setInterval()` 的回调函数。
* **待定回调**：执行延迟到下一个循环迭代的 I/O 回调。
* **idle, prepare**：仅系统内部使用。
* **轮询**：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 `setImmediate()` 排定的之外），其余情况 node 将在此处阻塞。
* **检测**：`setImmediate()` 回调函数在这里执行。
* **关闭的回调函数**：一些准备关闭的回调函数，如：`socket.on('close', ...)`。

在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或计时器，如果没有的话，则关闭干净。

## 阶段的详细概述

### <!--timers-->定时器

计时器指定 _可执行所提供回调_ 的 **阈值**，而不是用户希望其执行的确切时间。计时器回调将尽可能早地运行，因为它们可以在指定的时间间隔后进行调度。但是，操作系统调度或其它回调的运行可能会延迟它们。

_**注意**：[**轮询** 阶段](#poll) 控制何时定时器执行。_

例如，假设您计划在 100 毫秒后执行超时阈值，然后您的脚本开始异步读取文件，这需要 95 毫秒:

```js
const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

当事件循环进入 **轮询** 阶段时，它有一个空队列（此时 `fs.readFile()` 尚未完成），因此它将等待毫秒数，直到达到最快的计时器阈值为止。当它等待 95 毫秒通过时，`fs.readFile()` 完成读取文件，它需要 10 毫秒完成的回调将添加到 **轮询** 队列中并执行。当回调完成时，队列中不再有回调，因此事件循环将看到已达到最快计时器的阈值，然后将回滚到 **计时器** 阶段，以执行定时器的回调。在本示例中，您将看到计划中的计时器和执行的回调之间的总延迟将为 105 毫秒。

注意：为了防止 **轮询** 阶段饿死事件循环，[libuv][]（实现 Node.js
事件循环和平台的所有异步行为的 C 函数库），在停止轮询以获得更多事件之前，还有一个最大的（系统依赖）。

### 挂起的回调函数

此阶段对某些系统操作（如 TCP 错误类型）执行回调。例如，如果 TCP 套接字在尝试连接时接收到 `ECONNREFUSED`，则某些 \*nix 的系统希望等待报告错误。这将被排队以在 **挂起的回调** 阶段执行。

### <!--poll-->轮询

**轮询** 阶段有两个重要的功能：

1. 计算应该阻塞和轮询 I/O 的时间。
2. 然后，处理 **轮询** 队列里的事件。

当事件循环进入 **轮询** 阶段且 _没有计划计时器时_，将发生以下两种情况之一：

* _如果 **轮询** 队列 **不是空的**_，事件循环将循环访问其回调队列并同步执行它们，直到队列已用尽，或者达到了与系统相关的硬限制。

* _如果 **轮询** 队列 **是空的**_，还有两件事发生：
  * 如果脚本已按 `setImmediate()` 排定，则事件循环将结束 **轮询** 阶段，并继续 **检查** 阶段以执行这些计划脚本。

  * 如果脚本 **尚未** 按 `setImmediate()`排定，则事件循环将等待回调添加到队列中，然后立即执行。

一旦 **轮询** 队列为空，事件循环将检查 _已达到时间阈值的计时器_。如果一个或多个计时器已准备就绪，则事件循环将绕回计时器阶段以执行这些计时器的回调。

### 检查阶段

此阶段允许人员在轮询阶段完成后立即执行回调。如果轮询阶段变为空闲状态，并且脚本已排队使用 `setImmediate()`，则事件循环可能继续到 **检查** 阶段而不是等待。

`setImmediate()` 实际上是一个在事件循环的单独阶段运行的特殊计时器。它使用一个 libuv API 来安排回调在 **轮询** 阶段完成后执行。

通常，在执行代码时，事件循环最终会命中轮询阶段，等待传入连接、请求等。但是，如果回调已计划为 `setImmediate()`，并且轮询阶段变为空闲状态，则它将结束并继续到检查阶段而不是等待轮询事件。

### 关闭的回调函数

如果套接字或处理函数突然关闭（例如 `socket.destroy()`），则`'close'` 事件将在这个阶段发出。否则它将通过 `process.nextTick()` 发出。

## `setImmediate()` 对比 `setTimeout()`

`setImmediate` 和 `setTimeout()` 很类似，但何时调用行为完全不同。

* `setImmediate()` 设计为在当前 **轮询** 阶段完成后执行脚本。
* `setTimeout()` 计划在毫秒的最小阈值经过后运行的脚本。

执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时将受进程性能的约束（这可能会受到计算机上运行的其它应用程序的影响）。

例如，如果运行的是不属于 I/O 周期（即主模块）的以下脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束：

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

```
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```

但是，如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用：

```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

```
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

使用 `setImmediate()` 超过 `setTimeout()` 的主要优点是 `setImmediate()` 在任何计时器（如果在 I/O 周期内）都将始终执行，而不依赖于存在多少个计时器。

## `process.nextTick()`

### 理解 `process.nextTick()`

您可能已经注意到 `process.nextTick()` 在关系图中没有显示，即使它是异步 API 的一部分。这是因为 `process.nextTick()` 在技术上不是事件循环的一部分。相反，无论事件循环的当前阶段如何，都将在当前操作完成后处理 `nextTickQueue`。

回顾我们的关系图，任何时候您调用 `process.nextTick()` 在给定的阶段中，所有传递到 `process.nextTick()` 的回调将在事件循环继续之前得到解决。这可能会造成一些糟糕的情况, 因为**它允许您通过进行递归 `process.nextTick()` 来“饿死”您的 I/O 调用**，阻止事件循环到达 **轮询** 阶段。

### 为什么会允许这样？

为什么这样的事情会包含在 Node.js 中？它的一部分是一个设计理念，其中 API 应该始终是异步的，即使它不必是。以此代码段为例：

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(callback,
                            new TypeError('argument should be string'));
}
```

代码段进行参数检查。如果不正确，则会将错误传递给回调函数。最近对 API 进行了更新，允许将参数传递给 `process.nextTick()`，允许它在回调后传递任何参数作为回调的参数传播，这样您就不必嵌套函数了。

我们正在做的是将错误传递给用户，但仅在我们允许用户的其余代码执行之后。通过使用`process.nextTick()`，我们保证 `apiCall()` 始终在用户代码的其余部分 *之后* 运行其回调函数，并在允许事件循环 *之前* 继续进行。为了实现这一点，JS 调用栈被允许
展开，然后立即执行提供的回调，允许进行递归调用 `process.nextTick()`，而不达到 `RangeError: 超过 v8 的最大调用堆栈大小`。

这种哲学可能会导致一些潜在的问题。
以此代码段为例：

```js
let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall has completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;
```

用户将 `someAsyncApiCall()` 定义为具有异步签名，但实际上它是同步运行的。当调用它时，提供给 `someAsyncApiCall()` 的回调在同一阶段调用事件循环，因为 `someAsyncApiCall()` 实际上并没有异步执行任何事情。因此，回调尝试引用 `bar`，即使它在范围内可能还没有该变量，因为脚本无法运行到完成。

通过将回调置于 `process.nextTick()` 中，脚本仍具有运行完成的能力，允许在调用回调之前初始化所有变量、函数等。它还具有不允许事件循环继续的优点。在允许事件循环继续之前，对用户发出错误警报可能很有用。下面是使用 `process.nextTick()` 的上一个示例：

```js
let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;
```

这又是另外一个真实的例子：

```js
const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
```

只有端口通过时，端口才会立即被绑定。因此，可以立即调用 `'listening'` 回调。问题是 `.on('listening')` 回调将不会被设置的时间。

为了绕过此现象，`'listening'` 事件在 `nextTick()` 中排队，以允许脚本运行到完成阶段。这允许用户设置所需的任何事件处理程序。

## `process.nextTick()` 对比 `setImmediate()`

就用户而言我们有两个类似的调用，但它们的名称令人费解。

* `process.nextTick()` 在同一个阶段立即执行。
* `setImmediate()` 在以下迭代或 ‘tick’ 上触发事件循环。

实质上，应该交换名称。`process.nextTick()` 比 `setImmediate()` 触发得更直接，但这是过去遗留的，所以不太可能改变。进行此开关将会破坏 npm 上的大部分软件包。每天都有新的模块在不断增长，这意味着我们每天等待，而更多的潜在破损在发生。
虽然他们很迷惑，但名字本身不会改变。

*我们建议开发人员在所有情况下都使用 `setImmediate()`，因为它更容易被推理（并且它导致代码与更广泛的环境，如浏览器 JS 所兼容。）*

## 为什么要使用 `process.nextTick()`?

主要有两个原因：

1. 允许用户处理错误，清理任何不需要的资源，或者在事件循环继续之前重试请求。

2. 有时在调用堆栈已解除但在事件循环继续之前，必须允许回调运行。

一个例子就是要符合用户的期望。简单示例：

```js
const server = net.createServer();
server.on('connection', (conn) => { });

server.listen(8080);
server.on('listening', () => { });
```

假设 `listen()` 在事件循环开始时运行，但侦听回调被放置在 `setImmediate()` 中。除非通过主机名，否则将立即绑定到端口。为使事件循环继续进行，它必须命中 **轮询** 阶段，这意味着可能会收到连接，从而允许在侦听事件之前激发连接事件。

另一个示例运行的函数构造函数是从 `EventEmitter` 继承的，它想调用构造函数：

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

不能立即从构造函数中发出事件。因为脚本不会处理到用户为该事件分配回调的点。因此，在构造函数本身中可以使用 `process.nextTick()` 来设置回调，以便在构造函数完成后发出该事件，从而提供预期的结果：

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

[libuv]: http://libuv.org
[REPL]: https://nodejs.org/api/repl.html#repl_repl
