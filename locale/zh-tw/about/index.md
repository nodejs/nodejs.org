---
layout: about.hbs
title: 關於
trademark: 商標
---

# 關於 Node.js®

作為一個異步事件驅動的 JavaScript 執行階段，Node.js 設計來建構可擴充的網路應用程式。下方的「Hello World」範例中，多個連線皆能並行處理。一當每個連線建立後，會先執行回呼函式，但如果沒有需要作的事情，Node.js 則會休眠。

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
  console.log(`伺服器正在 http://${hostname}:${port}/ 運作`);
});
```

This is in contrast to today's more common concurrency model, in which OS threads
are employed. Thread-based networking is relatively inefficient and very
difficult to use. Furthermore, users of Node.js are free from worries of
dead-locking the process, since there are no locks. Almost no function in
Node.js directly performs I/O, so the process never blocks. Because nothing blocks, scalable systems are very reasonable to develop in Node.js.

如果不熟悉這門語言的一些地方，在 [阻塞式與非阻塞式的比較][] 這篇文章有完整的解釋。

---

Node.js is similar in design to, and influenced by, systems like Ruby's
[Event Machine][] and Python's [Twisted][]. Node.js takes the event model a bit
further. It presents an [事件循環][] as a runtime construct instead of as a library. In other systems, there is always a blocking call to start the
event-loop.
Typically, behavior is defined through callbacks at the beginning of a script, and
at the end a server is started through a blocking call like
`EventMachine::run()`. In Node.js, there is no such start-the-event-loop call.
Node.js simply enters the event loop after executing the input script. Node.js
exits the event loop when there are no more callbacks to perform. This behavior
is like browser JavaScript — the event loop is hidden from the user.

HTTP is a first-class citizen in Node.js, designed with streaming and low
latency in mind. This makes Node.js well suited for the foundation of a web
library or framework.

Node.js being designed without threads doesn't mean you can't take
advantage of multiple cores in your environment. Child processes can be spawned
by using our [`child_process.fork()`][] API, and are designed to be easy to
communicate with. Built upon that same interface is the [`cluster`][] module,
which allows you to share sockets between processes to enable load balancing
over your cores.

[阻塞式與非阻塞式的比較]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[事件循環]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
