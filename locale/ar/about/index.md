---
layout: about.hbs
title: عن النود جي اس
trademark: العلامة التجارية
---

# عن الـ Node.js ®
كونه بيئة تشغيل جافاسكريبت غير متزامنة و مدفوعة بالاحداث، فإن Node.js صمم لبناء تطبيقات للشبكات قابلة للتطوير. في المثال الأتي، يمكن التحكم في عدة اتصالات معا في وقت واحد و مع كل اتصال يتم تشغيل دالة مستدعاة، وعندما لن يكون هناك عمل لاتمامه، سيقف النود جي اس عن العمل مؤقتا.

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

هذا على النقيض من نموذج التزامن الأكثر شيوعا اليوم أين يتم استخدام الخيوط الخاصة بالنظام

إن شبكة مبنية على الخيوط تعتبر غير فعالة نسبيا، و صعبة الاستخدام. و إضافة إلى ذلك
فإن مستخدمي Node.js لن يكون لديهم قلق حول اغلاق العملية بما أنه ليس هنالك اقفال.
تقريبا، ليس هنالك من دالة في Node.js تعمل مباشرة على مستوى الادخال و الاخراج لذلك
لا تتوقف اي عملية، لذلك فإن بناء انظمة قابلة للتطوير بNode.js يعد امرا محببا و منطقيا.
اذا كانت الفقرة السابقة تحتوي على مصطلحات مبهمة بالنسبة إليك
تفضل بقراءة هذا المقال للتعمق (باللغة الانجليزية) [Blocking vs Non-Blocking][].

---

تعتبر النود جي اس شبيهة في تصميمها بمكتبات و أنظمة مثل [Event Machine][] الخاصة بالروبي و [Twisted][] الخاصة بالبايثون.

تأخذ Node.js نموذج الاحداث (event model) ابعد قليلا فتمثل الحلقة التكرارية الخاصة بالاحداث ([event loop][]) كمكون اساسي في وقت التشغيل (runtime construct) وليس كمكتبة في انظمة أخرى، حيث ان هنالك دائما استدعاء متزامن (blocking call)
للبدء في حلقة الاحداث.
مبدئيا، يتم تحديد السلوك عبر دالة مستدعاة في بداية السكريبت في نهايتها
تقوم بتشغيل خادم (server) عبر استدعاءٍ غير متزامن (blocking call) مثل <span dir="ltr">`EventMachine::run()`</span>، ولكن في Node.js لا يوجد شيء من هذا القبيل.
تقوم Node.js بكل بساطة بدخول حلقة الاحداث بعد تنفيذها لسكريبت الادخال و تخرج من الحلقة السالفة الذكر عندما لا يكون هنالك اي دوال مستدعاة اخرى تستوجب التنفيذ.
هذا النمط يشبه JavaScript الخاصة بالمتصفح اين يتم اخفاء حلقة الاحداث عن المستخدم.

يعتبر بروتوكول الـHTTP مهما في Node.js. حيث انه تم أخذ اعتبار بث و تقليل وقت التأخير و هذا ما يجعل النود ممتازة لبناء مكتبات و إطارات عمل خاصة بالويب.

يجب عليك ان تدرك ان تصميم Node.js بدون خيوط (threads) لا يعني انك لا تستطيع تحقيق الاستفادة الكاملة من الانوية المتعددة في البيئة التي تعمل عليها، فيمكن توليد المعالجات الفرعية عبر واجهة برمجة التطبيقات <span dir="ltr">[`child_process.fork()`][]</span> الخاصة بنا حيث انها مصممة لتكون سهلة التعامل.
هناك ايضا نموذج [`cluster`][] المبني على نفس الواجهة والذي يسمح لك بمشاركة المآخذ (sockets) بين العمليات لموازنة الحمل على الانوية الخاصة بك.

[Blocking vs Non-Blocking]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
