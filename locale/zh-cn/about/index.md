---
layout: about.hbs
title: 关于 Node.js
trademark: Trademark
---
# 关于 Node.js&reg;

作为异步事件驱动的 JavaScript 运行时环境，Node 旨在构建可扩展的网络应用程序。在下面的 “hello world” 的示例中，许多连接可同时被处理。在每次连接时都会触发回调函数，但如果没有任务要执行，Node 将会休眠。

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

这与现今常见使用 OS 线程的并发模型形成对比。基于线程的网络效率相对较低，且使用较为困难。此外，由于没有锁的概念，Node 用户无需担心锁死进程。Node 中几乎没有函数直接进行 I/O 操作，所以该过程不会阻塞。由于没有任何阻塞，使用 Node 开发可扩展系统非常合理。

如果对该编程语言中内容(阻塞)不熟悉，那么有篇关于[阻塞与非阻塞][Blocking vs Non-Blocking]的完整文章。

---

Node 在设计上与 Ruby 的 [Event Machine][] 或 Python 的 [Twisted][] 等系统相似，并且受其影响。Node 进一步完善了事件模型进行。它将[事件循环][event loop]表现为运行时构建而不是作为一个库。在其他系统中，总是通过阻塞调用来启动事件循环。通常，行为是通过 script 开始处的回调来定义的，并且最终通过调用像 `EventMachine::run()` 这样的(函数)来阻塞启动服务器。在 Node 中，并不存在 start-the-event-loop 的调用。Node 只需在执行入口 script 后进入事件循环。当没有回调执行时，Node 将推出事件循环。这种行为就像浏览器中的 JavaScript - 事件循环对用户是不可见的。

HTTP 是 Node 中的头等公民，设计时考虑到了流媒体和低延迟的情况。这是的 Node 非常适合作为 Web 基础库或基础框架。

只因为 Node 没有线程设计，并不意味着你无法利用你环境中的多核。可以通过使用 [`child_process.fork()`][] API 产生子进程，并且被设计的容易使用。基于相同接口构建的是 [`cluster`][] 模块，它允许你在进程间共享套接字以启用对核的负载均衡。

[Blocking vs Non-Blocking]: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: http://rubyeventmachine.com/
[Twisted]: http://twistedmatrix.com/
