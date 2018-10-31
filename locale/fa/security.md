---
layout: security.hbs
title: امنیت
---

# امنیت

### گزارش باگ در Node.js

تمامی باگ های امنیتی در Node.js جدی گرفته می‌شوند و باید از طریق [HackerOne](https://hackerone.com/nodejs) یا ایمیل [security@nodejs.org](mailto:security@nodejs.org) گزارش داده شوند. این گزارش به زیر مجموعه‌ای از تیم هسته Node.js که مسئول رفع کردن مشکلات امنیتی هستند تحویل داده خواهد شد.


گزارش شما حداکثر تا ۲۴ ساعت تصدیق خوهد شد و حداکثر تا ۴۸ ساعت پاسخ دقیقی به گزارش خود دریافت خواهید کرد که نشان خواهد داد کام های بعدی در رسیدگی به درخواست شما چیست.
 
 پس از پاسخ اولیه به گزارش شما، تیم امنیتی تلاش خواهد کرد تا شما را از پیشرفت کار در جهت یک اعلامیه کامل  و تعمیر مطلع سازد و ممکن است از شما در رابطه با اطلاعات تکمیلی یا راهنمایی در حیطه مسئله گزارش شده سوال پرسیده شود.این به روز رسانی حداقل هر پنج روز یک بار ارسال خواهد شد. اما در عمل امکان بیشتری وجود دارد که هر ۲۴ تا ۴۸ ساعت یک بار ارسال شوند.

 
###  برنامه جایزه پیدا کردن باگ در Node.js
 
پروژه Node.js در یک برنامه رسمی جایزه برای باک شرکت می‌کند که برای فعالان امنیتی و  افشاهای عمومی است.

این برنامه از طریق پلتفرم HackerOne مدیریت می‌شود به آدرس  [https://hackerone.com/nodejs](https://hackerone.com/nodejs) برای اطلاعات بیشتر.

## گزارش باگ در ماژول‌های سوم شخص

گزارش‌های  باگ در ماژول‌های سوم شخص باید به نگاه دارندگان آن ها اعلام شود و همجنین باید از طریق [تیم اکو سیستم Node](https://hackerone.com/nodejs-ecosystem) ایمیل  [security-ecosystem@nodejs.org](mailto:security-ecosystem@nodejs.org)  اعلام شود.
 

اطلاعات بیشتر در رابطه با این پروسه را می‌توانید در  [مخزن گروه کاری امینت ](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md).
پیدا کنید.

از شما بابت بهتر کردن امنیت Node.js و اکوسیستم آن متشکریم. 
از تلاش‌ها  و بی پرده گویی های مسئولیت پذیرانه شما بسیار استقبال میکنیم و متوحه آن خواهیم بود.


## سیاست برخورد با افشای باگ


- The security report is received and is assigned a primary handler. This person will coordinate the fix and release
process. The problem is confirmed and a list of all affected versions is determined. Code is audited to find any
potential similar problems. Fixes are prepared for all releases which are still under maintenance. These fixes are not
committed to the public repository but rather held locally pending the announcement.

- A suggested embargo date for this vulnerability is chosen and a CVE (Common Vulnerabilities and Exposures (CVE®))
is requested for the vulnerability.

- On the embargo date, the Node.js security mailing list is sent a copy of the announcement. The changes are pushed to
the public repository and new builds are deployed to nodejs.org. Within 6 hours of the mailing list being notified, a
copy of the advisory will be published on the Node.js blog.

- Typically the embargo date will be set 72 hours from the time the CVE is issued. However, this may vary depending on
the severity of the bug or difficulty in applying a fix.
 
- این پروسه ممکن است کمی زمان ببرد، مخصوصا زمانی که هماهنگی با نگه دارندگان پروژه های دیگر نیاز است.
تلاش خواهد شد تا باگ ها در سریع ترین حالت ممکن رسیدگی شوند. با این حال مهم است که ما پروسه انتشار بالا را تا پیدا کردن یک راه مشخص برای رفع مشکل دنبال کنیم.

##   دریافت به روز رسانی‌های امنیتی


اعلان‌های امنیتی به روش‌های زیر توزیع خواهند شد.

- [گروه گوگل https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
- [بلاگ https://nodejs.org/en/blog](https://nodejs.org/en/blog)

##   نظرات بر روی این سیاست

اگر شما در رابطه با بهبود این پروسه پیشنهادی دارید برای بحث در رابطه با آن لطفا یک [pull request](https://github.com/nodejs/nodejs.org) بفرستید یا  [یک   issue ایجاد کنید](https://github.com/nodejs/security-wg/issues/new).
