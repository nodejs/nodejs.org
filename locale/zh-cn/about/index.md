---
layout: about.hbs
title: 关于
trademark: Trademark
---

# 关于 Node.js®

作为异步驱动的 JavaScript 运行时，Node.js 被设计成可升级的网络应用。在下面的“Hello World”示例中，许多连接可以并行处理。每一个连接都会触发一个回调，但是如果没有可做的事情，Node.js 就进入睡眠状态。

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

这与今天使用 OS 线程的更常见并发模型形成了对比。基于线程的网络效率相对低下，使用起来非常困难。此外，Node.js 的用户不必担心死锁过程，因为没有锁。Node 中几乎没有函数直接执行 I/O 操作，因此进程从不阻塞。由于没有任何阻塞，可伸缩系统在 Node 中开发是非常合理的。

如果你对这门语言其中的一部分尚未熟悉理解，这里有一篇专门关于[阻塞对比非阻塞][]的文章供你参考。

---
Node.js 在设计上类似于 Ruby 的[事件机][]或 Python 的 [Twisted][]之类的系统。Node.js 更深入地考虑事件模型。它呈现一个[事件轮询][]作为运行时构造而不是库。在其它系统中，总是有一个阻止调用来启动事件循环。

通常 Node.js 的行为是通过在脚本开头的回调定义的，在结束时通过阻塞调用（如 `EventMachine::run()` ）启动服务器。在 Node.js 中没有这样的启动-事件循环调用。Node.js 在执行输入脚本后只需输入事件循环即可。
当没有更多要执行的回调时，Node.js 退出事件循环。此行为类似于浏览器中的 JavaScript ——事件循环总是对用户不可见的。

HTTP 是 Node.js 中的一等公民。它设计的是流式和低延迟。这使得 Node.js 非常适合于 web 库或框架的基础。

仅仅因为 Node.js 是在没有线程的情况下设计的，这并不意味着您无法利用环境中的多个内核。子进程可以通过使用我们的 [`child_process.fork()`][] API 来生成，并且被设计为易于沟通。建立在同一接口上的是 [`cluster`][] 模块，它允许您在进程之间共享套接字，以便在核心上启用负载平衡。

[阻塞对比非阻塞]: /zh-cn/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[事件轮询]: /zh-cn/docs/guides/event-loop-timers-and-nexttick/
[事件机]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
