---
layout: about.hbs
title: 关于
trademark: Trademark
---

# 关于 Node.js®

作为一个异步事件驱动的 JavaScript 运行时，Node.js 被设计用来构建可扩展的网络应用。在下面的 “Hello World” 示例中，可以并发处理许多连接，每一个连接都会触发一个回调，而当没有可做的事情时，Node.js 就会进入休眠状态。

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

这与当今比较常见的采用操作系统线程的并发模型形成了鲜明对比。基于线程的网络效率相对较低且更难以使用。此外，由于没有锁，Node.js 的用户不用担心进程死锁的问题。Node.js 中几乎没有函数直接执行 I/O 操作（除非你使用 Node.js 标准库中的同步函数版本），其进程从不会被阻塞，因此用 Node.js 来开发可扩展系统是非常合理的。

如果你对上面的描述有一些不理解地方，这里有一篇专门关于[阻塞对比非阻塞][]的文章供你参考。

---
Node.js 在设计上类似于 Ruby 的 [Event Machine][] 或 Python 的 [Twisted][] 之类的系统。但 Node.js 更深入地考虑了事件模型，它将[事件循环][]作为一个运行时结构而不是作为一个库来呈现。在其他系统中，总是有一个阻塞调用来启动事件循环。通常情况下，要执行的行为是通过脚本开始时的回调来定义的，然后通过 `EventMachine::run()` 这样的阻塞调用来启动服务器。而在 Node.js 中，没有这种启动事件循环的调用。Node.js 在执行输入脚本后直接进入事件循环，当没有更多的回调要执行时，Node.js 就会退出事件循环。这种行为就像浏览器的 JavaScript 一样 —— 事件循环对用户是隐藏的。

HTTP 是 Node.js 中的一等公民，设计时考虑到了流式和低延迟，这使得 Node.js 非常适合作为网络库或框架的基础。

Node.js 被设计成单线程运行，但这并不意味着你无法利用到 CPU 的多个核心。你可以通过 [`child_process.fork()`][] API 来生成子进程，并且它被设计成非常易于通信。而建立在同一个接口之上的 [`cluster`][] 模块允许你在进程之间共享套接字（sockets），以实现核心的负载均衡。

[阻塞对比非阻塞]: /zh-cn/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[事件循环]: /zh-cn/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
