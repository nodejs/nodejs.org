---
layout: about.hbs
title: درباره
trademark: نشان تجاری
---

# درباره Node.js®

به عنوان یک اجرا کننده رویدادهای ناهماهنگ در جاوا اسکریپت، Node.js به شکلی طراحی شده است که بتوان با آن برنامه‌های تحت وب توسعه پذیر ساخت. در مثال "hello world" پایین، تعداد خیلی زیادی اتصال به صورت هم زمان انجام گیرد.
پس از هر اتصال یه فراخوان (callback) اجرا خواهد شد، اما اگر کاری برای انجام نباشد نود می‌خوابد.

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

این در مقایسه با مدل امروزی‌تر هم‌زمانی است، جایی که Theradهای سیستم عامل به کار گرفته می‌شوند.
شبکه مبتنی بر Thread به نسب ناکارآمد و بسیار سخت کاربرد است.
علاوه بر این کاربران Node.js از نگرانی قفل مرگبار فرایند‌ها آسوده هستند.
از آن جایی که هیچ قفلی وجود ندارد، تقریبا هیچ فانکشنی در Node.js به صورت مستقیم با I/O انجام نمی‌دهد بنا بر این هیچ فرایند‌ای فقل نخواهد شد. به همین علت پیاده سازی سیستم‌های مقیاس‌پذیر بر روی Node.js بسیار منطقی است.

اگر با این ادبیات ناآشنا هستید یک مقاله کامل در این رابطه وجود دارد.
[Blocking vs Non-Blocking][].

---

Node.js در طراحی مشابه و تاثیر گرفته است از سیستم‌هایی ماننده Ruby's
[Event Machine][] یا Python's [Twisted][].
Node.js مدل رویداد را کمی به جلوتر می‌برد و [event loop][] را به عنوان یک ساختار زمان‌بندی به جای یک کتابخانه ارائه می‌کند.

در سیستم‌های دیگر همیشه یک تماس مسدود کننده برای شروع event-loop وجود دارد.

به طور معمول رفتار از طریق callbackها در ابتدای اسکریپت تعریف می‌شود
و در پایان یک سرور را از طریق یک تماس مسدود کننده مانند
`EventMachine::run()` اجرا می‌کند.
 در Node.js چیزی به عنوان فراخوان برای شروع حلقه رویداد وجود ندارد. Node.js پس از اجرای اسکریپت ورودی به حلقه رویداد وارد می‌شود. این رفتار ماننده جاوااسکریپت در مرورگر است - حلقه رویداد از کاربر مخفی می‌ماند.

HTTP در Node.js شهروند درجه یک محسوب می‌شود، طراحی شده با درنظر گیری streaming و زمان تأخیر کم. این امر Node.js را به یک گزینه مناسب برای بنیاد کتابخانه وب و یا یک چارچوب تبدیل می‌کند.

فقط به خاطر اینکه Node.js بدون Threadها طراحی شده، به این معنی نیست که نتوانید از چند هسته در محیط خود بهره ببرید. فرایند‌های زیرین می‌توانند توسط ‌[`child_process.fork()`][] API اجرا شوند. فرایند های زیرین به شکلی طراحی شده‌اند که تعامل کردن با آن‌ها به سادگی انجام شود.
ماژول [`cluster`][] هم به همین شکل ساخته شده که برای ما قابلیتی برای اشتراک‌گذاری سوکت‌ها بین فرایند‌ها محیا می‌سازد. که به همین شکل قادر خواهید بود برای هسته‌های پردازشگر خود load balancing را فعال کنید.

[Blocking vs Non-Blocking]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
