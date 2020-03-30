---
layout: about.hbs
title: مجموعات العمل
---

# مجموعات العمل الأساسية
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

يتم إنشاء مجموعات العمل الأساسية من قبل لجنة التوجيه التقني [لجنة التوجيه التقني (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## مجموعات العمل الحالية

* [Addon API](#addon-api)
* [القياس](#benchmarking)
* [البناء](#build)
* [التشخيص](#diagnostics)
* [دوكر](#docker)
* [التوعية](#evangelism)
* [i18n](#i18n)
* [الإصدار](#release)
* [الحماية](#security)
* [التدفق](#streams)

### [Addon API](https://github.com/nodejs/nan)

ان مجموعة <span dir="rtl">Addon API</span> مسؤولة عن صيانة مستودع مشروع NAN و الحزم التابعة له تحت مسمى _nan_ على مدير حزم النود. يوفر مشروع NAN طبقة مجردة للمؤلفين الاصليين لاضافة Node.js، و ذلك عبر المساعدة في كتابة شفرة برمجية متوافقة مع عدة اصدارات نشطة من Node.js و V8 و libuv. تشمل مسؤوليات هذه المجموعة:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* صيانة مستودع [NAN](https://github.com/nodejs/nan) على الـGitHub، بما في ذلك الشفرة البرمجة، والمشاكل و التوثيق الخاص به
* صيانة مستودع [addon-examples](https://github.com/nodejs/node-addon-examples) على الـGitHub، بما في ذلك الشفرة البرمجية، والمشاكل والتوثيق الخاص به
* Maintaining the C++ Addon API within the Node.js project, in subordination to the Node.js TSC.
* Maintaining the Addon documentation within the Node.js project, in subordination to the Node.js TSC.
* Maintaining the _nan_ package in npm, releasing new versions as appropriate.
* التراسل حول مستقبل Node.js و واجهة NAN لإعطاء المجتمع ملاحظات مسبقة حول التغييرات المستقبلية.

يتمثل الغرض من مجموعة القياس الحصول على توافق حول مجموعة من المعايير المتفق عليها و الخاصة بالأداء التي يمكن استعمالها لأجل:

### [القياس](https://github.com/nodejs/benchmarking)

تشمل مسؤولياتها:

* تتبع و تشخيص تحسينات الأداء بين إصدارات Node.js
* تجنب التراجع في الأداء في النسخ الأحدث

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* Identifying 1 or more benchmarks that reflect customer usage. Likely will need more than one to cover typical Node.js use cases including low-latency and high concurrency
* Working to get community consensus on the list chosen
* إضافة تنفيذ دوري لجملة من المعايير المختارة لنسخ Node.js
* تتبع و نشر نتائج الأداء بين مختلف الاصدارات و النسخ المبنية

### [البناء](https://github.com/nodejs/build)

تشمل مسؤولياتها:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* إنتاج الحزم لجميع المنصات المستهدفة
* إجراء الاختبارات.
* إجراء اختبارات الأداء و المقارنات.
* إنشاء و تسيير حاويات البناء

### [التشخيص](https://github.com/nodejs/diagnostics)

تشمل مسؤولياتها:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* التعاون مع V8 لإدماج `v8_inspector` ضمن Node.js.
* التعاون مع V8 لإدماج `trace_event` ضمن Node.js.
* التعاون مع مجموعة العمل الأساسية لتحسين `async_wrap` و `async_wrap`.
* صيانة و تحسين الدمج الخاص بنظام تتبع نظام التشغيل (ETW، LTTNG، dtrace على سبيل المثال).
* توثيق القدرات التشخيصية و وواجهات برمجة التطبيقات في Node.js و مكوناتها.
* Exploring opportunities and gaps, discussing feature requests, and addressing conflicts in Node.js diagnostics.
* Fostering an ecosystem of diagnostics tools for Node.js.
* Defining and adding interfaces/APIs in order to allow dumps to be generated when needed.
* Defining and adding common structures to the dumps generated in order to support tools that want to introspect those dumps.

### [دوكر](https://github.com/nodejs/docker-node)

تشمل مسؤولياتها:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* الإبقاء على اسطوانات الدوكر الرسمية محدثة بالتزامن مع اصدارات Node.js.
* اتخاذ القرارات المتعلقة بتحسين و تطبيق الاسطوانات و / أو إجراء اصلاحات عليها.
* صيانة و تحسين التوثيق الخاص بهذه الاسطوانات.

### [التوعية](https://github.com/nodejs/evangelism)

تشمل مسؤولياتها:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* تسهيل التواصل داخل المشروع.
* إدارة وسائل التواصل الإجتماعي الرسمية للمشروع.
* توجيه الترويج للمتحدثين في اللقاءات و المؤتمرات الخاصة بNode.js.
* توجيه الترويج للمناسبات الخاصة بالمجتمع.
* نشر ملخصات تحديثية دورية و محتوى ترويجي آخر.

### [i18n](https://github.com/nodejs/i18n)

كل فريق ينتظم حول لغة معروفة، و يمكن كل مجتمع للغة معروفة ينتج عدة ترجمات للمشروعات المختلفة.

تشمل مسؤولياتها:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* Translating any Node.js materials they believe are relevant to their community.
* Reviewing processes for keeping translations up to date and of high quality.
* إدارة و مراقبة قنوات التواصل الاجتماعي بلغاتهم.
* ترويج المتحدثين و اللقاءات و المؤتمرات الخاصة بـ Node.js بلغاتهم الأصلية.

تقوم هذه المجموعة بإدارة عمليات الأصدار للنسخ الجديدة من Node.js.

* [nodejs-ar - Arabic (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [الإصدار](https://github.com/nodejs/Release)

تشمل مسؤولياتها:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* تحديد عملية الإصدار.
* تحديد محتوى الإصدارات.
* توليد و إنشاء الإصدارات.
* إختبار الإصدارات.
* Manage the Long Term Support and Current branches including backporting changes to these branches.
* Define the policy for what gets backported to release streams

### [الحماية](https://github.com/nodejs/security-wg)

تشمل مسؤولياتها:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* تحديد و صيانة سياسات الأمن و إجراءاته لـ:
  * مشروع Node.js الأساسي
  * المشاريع الأخرى المصانة من قبل لجنة التوجيه التقني التابعة للنود جي اس
* Work with the Node Security Platform to bring community vulnerability data into the foundation as a shared asset.
* Ensure the vulnerability data is updated in an efficient and timely manner. For example, ensuring there are well-documented processes for reporting vulnerabilities in community modules.
* Review and recommend processes for handling of security reports (but not the actual administration of security reports, which are reviewed by a group of people directly delegated to by the TSC).
* Define and maintain policies and procedures for the coordination of security concerns within the external Node.js open source ecosystem.
* Offer help to npm package maintainers to fix high-impact security bugs.
* صيانة و توفير بيانات حول الثغرات التي تم الكشف عنها في:
  * مشروع Node.js الأساسي
  * المشاريع الأخرى المصانة من قبل لجنة التوجيه التقني التابعة للنود جي اس
  * النظام البيئي الخارجي مفتوح المصدر الخاص بNode.js
* الترويج للتحسينات الأمنية في النظام البيئي للنود جي اس.
* التوصية بالتحسينات الأمنية للمشروع الأساسي للنود جي اس.
* تسهيل و ترويج توسع الخدمات الأمنية القوية و النظام البيئي لموفر المنتجات

### [التدفق](https://github.com/nodejs/readable-stream)

تشمل المسؤوليات:

يمكنك الإطلاع على القائمة الحالية للاعضاء هنا: [README](https://github.com/nodejs/nan#collaborators).

* تحديد مشاكل التدفق في متتبع المشاكل الخاص بNode.js.
* تولي المسؤولية عن التوثيق الخاص بمشروع Node.js و تعديله.
* مراجعة التغييرات للكلاسات الفرعية الخاصة بالتدفق ضمن مشروع Node.js.
* إعادة توجيه التغييرات للتدفقات من مشروع Node.js إلى هذا المشروع.
* المساعدة في تطبيق موفري التدفق ضمن Node.js.
* التوصية بإدراج نسخ الـ `readable-stream` ضمن Node.js.
* التراسل حول مستقبل التدفقات لإعطاء المجتمع لمحة مسبقة عن التغييرات.
