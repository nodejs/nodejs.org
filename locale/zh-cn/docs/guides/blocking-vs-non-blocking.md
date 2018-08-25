---
title: 阻塞对比非阻塞一览
layout: docs.hbs
---

# 阻塞对比非阻塞一览

本概论涵盖了在 Node.js 中 **阻塞** and **非阻塞** 的区别，同时也会牵涉到时间轮询和 libuv 方面，不需要先行了解这些方面的知识也可以继续阅读。我们假定读者对于 JavaScript 语言和 Node.js 的回调机制有一个基本的了解。

> "I/O" 指的是系统磁盘和由 [libuv](http://libuv.org/) 支持的网络之间的交互。

## 阻塞

**阻塞** 是说 Node.js 中其它的 JavaScript 命令必须等到一个非 JavaScript 操作完成之后才可以执行。这是因为当 **阻塞** 发生时，事件机制无法继续运行JavaScript。

在 Node.js 中，JavaScript由于 CPU 密集操作而表现不佳。而不是等待非 JavaScript操作 （例如I/O）。这被称为 **阻塞**。在 Node.js 基本类库中，使用 libuv 的同步方法大多数都是 **阻塞** 的。原生方法也可能是 **阻塞** 的。

所有在 Node.js 中提供的 I/O 方法也包括异步版本，它们都是 **非阻塞** 的，接受回调函数。一些方法同时也具备 **阻塞** 功能，它们的名字结尾都以 `Sync` 结尾。


## 代码比较

**阻塞** 方法执行起来是 **同步地**，但是 **非阻塞** 方法执行起来是 **异步地**。
如果你使用文件系统模块读取一个文件，同步方法看上去如下：

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
```

这是一个与之功能等同的 **异步** 版本示例：

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

第一个示例看上去比第二个似乎简单些，但是有一个缺陷：第二行语句会 **阻塞** 其它 JavaScript 语句的执行直到整个文件全部读取完毕。注意在同步版本的代码中，任何异常都会抛出，会导致整个程序崩溃。在异步版本示例代码中，它由作者来决定是否抛出异常。

让我们扩展一点我们的同步代码：

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
// moreWork(); will run after console.log
```

这是一个类似的，但是功能上不等同的异步代码示例版本：

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// moreWork(); will run before console.log
```

第一个示例代码中， `console.log` 将在 `moreWork()` 之前被调用。在第二个例子中， `fs.readFile()` 因为是 **非阻塞** 的，所以 JavaScript 会继续执行， `moreWork()` 将被首先调用。`moreWork()` 无需等待文件读完而先行执行完毕，这对于高效吞吐来说是一个绝佳的设计。


## 并行和吞吐

在 Node.js 中 JavaScript 的执行是单线程的，所以并行与事件轮询能力（即在完成其它任务之后处理 JavaScript 回调函数的能力）有关。任何一个企图以并行的方式运行的代码必须让事件轮询机制以非 JavaScript 操作来运行，像 I/O 操作。

举个例子，让我们思考一个案例：案例中每个对服务器的请求消耗 50 毫秒完成，其中的 45 毫秒又是可以通过异步操作而完成的数据库操作。选择 **非阻塞** 操作可以释放那 45 毫秒用以处理其它的请求操作。这是在选择 **阻塞** 和 **非阻塞** 方法上的重大区别。

Node.js 中的事件轮询机制和其它语言相比而言有区别，其它语言需要创建线程来处理并行任务。


## 把阻塞和非阻塞代码混在一起写的危险

在处理 I/O 问题时，有些东西必须避免。下面让我们看一个例子：

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

在以上的例子中， `fs.unlinkSync()` 极有可能在 `fs.readFile()` 之前执行，所以在真正准备开始读取文件前此文件就已经被删除了。一个更好的处理方法就是彻底让使它变得 **非阻塞化**，并且保证按照正确顺序执行：

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

以上代码在 `fs.readFile()` 用异步方式调用 `fs.unlink()`，这就保证了执行顺序的正确。


## 其它资料

- [libuv](http://libuv.org/)
- [关于 Node.js](https://nodejs.org/en/about/)
