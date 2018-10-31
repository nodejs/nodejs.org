---
layout: about.hbs
title: درباره
trademark: نشان تجاری
---
# درباره Node.js&reg;

به عنوان یک اجرا کننده رویدادهای ناهماهنگ در جاوا اسکریپت، Node به شکلی طراحی شده است که بتوان با آن برنامه‌های تحت وب توسعه پذیر ساخت. در مثال "hello world" پایین، تعداد خیلی زیادی اتصال به صورت هم زمان انجام گیرد. 
پس از هر اتصال یه فراخوان (callback) اجرا خواهد شد، اما اگر کاری برای انجام نباشد نود میخوابد.


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

This is in contrast to today's more common concurrency model where OS threads
are employed. Thread-based networking is relatively inefficient and very
difficult to use. Furthermore, users of Node are free from worries of
dead-locking the process, since there are no locks. Almost no function in Node
directly performs I/O, so the process never blocks. Because nothing blocks,
scalable systems are very reasonable to develop in Node.

If some of this language is unfamiliar, there is a full article on
[Blocking vs Non-Blocking][].

---

Node is similar in design to, and influenced by, systems like Ruby's
[Event Machine][] or Python's [Twisted][]. Node takes the event model a bit
further. It presents an [event loop][] as a runtime construct instead of as a library. In other systems there is always a blocking call to start the
event-loop.
Typically behavior is defined through callbacks at the beginning of a script
and at the end starts a server through a blocking call like
`EventMachine::run()`. In Node there is no such start-the-event-loop call. Node
simply enters the event loop after executing the input script. Node exits the
event loop when there are no more callbacks to perform. This behavior is like
browser JavaScript — the event loop is hidden from the user.

HTTP is a first class citizen in Node, designed with streaming and low latency
in mind. This makes Node well suited for the foundation of a web library or
framework.

فقط به خاطر اینکه Node بدون threads طراحی شده، به این معنی نیست که نتوانید از چند هسته در مخیط خود بهره ببرید. پروسه‌های زیرن میتوانند توسط ‌[`child_process.fork()`][] API  اجرا شوند. پروسه های زیرین به شکلی طراحی شده اند که تعامل کردن با آن ها به سادگی انجام شود. 
ماژول [`cluster`][] هم به همین شکل ساخته شده که به ما قابلیتی برای اشتراک گذاری سوکت ها بین پروسه‌ها محیا می‌سازد. که به همین شکل قادر خواهید بود برای هسته های پردازشگر خود load balancing را فعال کنید.
 
[Blocking vs Non-Blocking]: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: http://twistedmatrix.com/
