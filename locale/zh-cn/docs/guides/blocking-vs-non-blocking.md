---
title: 阻塞对比非阻塞一览
layout: docs.hbs
---

# 阻塞对比非阻塞一览

本文介绍了在 Node.js 中 **阻塞** 和 **非阻塞** 调用的区别。本文涉及事件循环和 libuv ，但不必对其有事先了解。我们假定读者对于 JavaScript 语言和 Node.js 的回调机制有一个基本的了解。

> "I/O" 主要指由[libuv](https://libuv.org/)支持的，与系统磁盘和网络之间的交互。

## 阻塞

**阻塞** 是指在 Node.js 程序中，其它 JavaScript 语句的执行，必须等待一个非 JavaScript 操作完成。这是因为当 **阻塞** 发生时，事件循环无法继续运行 JavaScript。

在 Node.js 中，JavaScript 由于执行 CPU 密集型操作，而不是等待一个非 JavaScript 操作（例如 I/O）而表现不佳，通常不被称为 **阻塞**。在 Node.js 标准库中使用 libuv 的同步方法是最常用的 **阻塞** 操作。原生模块中也有 **阻塞** 方法。

在 Node.js 标准库中的所有 I/O 方法都提供异步版本，**非阻塞**，并且接受回调函数。某些方法也有对应的 **阻塞** 版本，名字以 `Sync` 结尾。

## 代码比较

**阻塞** 方法 **同步** 执行，**非阻塞** 方法 **异步** 执行。

使用文件系统模块做例子，这是一个 **同步** 文件读取：

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
```

这是一个等同的 **异步** 示例：

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

第一个示例看上去比第二个简单些，但是有一个缺陷：第二行语句会 **阻塞** 其它 JavaScript 语句的执行直到整个文件全部读取完毕。注意在同步版本中，如果错误被抛出，它需要被捕获否则整个程序都会崩溃。在异步版本中，由作者来决定错误是否如上所示抛出。

让我们稍微扩展一下我们的例子：

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log
```

这是一个类似但不等同的异步示例：

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log
```

在上述第一个例子中， `console.log` 将在 `moreWork()` 之前被调用。在第二个例子中， `fs.readFile()` 是 **非阻塞** 的，所以 JavaScript 执行可以继续， `moreWork()` 将被首先调用。在不等待文件读取完成的情况下运行 `moreWork()` 的能力是一个可以提高吞吐量的关键设计选择。

## 并发和吞吐量

在 Node.js 中 JavaScript 的执行是单线程的，因此并发性是指事件循环在完成其他工作后执行 JavaScript 回调函数的能力。任何预期以并行方式运行的代码必须让事件循环能够在非 JavaScript 操作（比如 I/O ）执行的同时继续运行。

例如，让我们思考这样一种情况：每个对 Web 服务器的请求需要 50 毫秒完成，而那 50 毫秒中的 45 毫秒是可以异步执行的数据库 I/O。选择 **非阻塞** 异步操作可以释放每个请求的 45 毫秒来处理其它请求。仅仅是选择使用 **非阻塞** 方法而不是 **阻塞** 方法，就能造成并发的显著差异。

事件循环不同于许多其他语言的模型，其它语言创建额外线程来处理并发工作。

## 混合阻塞和非阻塞代码的危险

处理 I/O 时应该避免一些模式。我们来看一个例子：

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

在以上的例子中， `fs.unlinkSync()` 极有可能在 `fs.readFile()` 之前执行，它会在实际读取之前删除 `file.md` 。更好的写法是完全 **非阻塞** 并保证按正确顺序执行：

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

以上代码在 `fs.readFile()` 的回调中对 `fs.unlink()` 进行了 **非阻塞** 调用，这保证了正确的操作顺序。

## 其它资源

* [libuv](https://libuv.org/)
* [关于 Node.js](https://nodejs.org/zh-cn/about/)
