---
layout: page.hbs
title: Installing Node.js via package manager
---

# تثبيت النود جي اس عبر مدير حزم

***ملاحظة*** إن صيانة و دعم الحزم المذكورة في هذه الصفحة تتم عبر المشرفين على مديري الحزم، و **ليس** فريق النود جي اس الأساسي. تفضل بإبلاغ أية مشكلة إلى المشرفين على الحزم و إذا كانت مشكلتك عبارة عن خطأ في النود جي اس بحد ذاتها فسيبلغ المشرف عن هذه المشكلة صعودا.

---

* [آندرويد](#android)
* [Arch Linux](#arch-linux)
* [التوزيعات المبنية على ديبيان أو اوبنتو، لينكس للمؤسسات / فيدورا و حزم سناب](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [OpenBSD](#openbsd)
* [openSUSE و SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS و illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [ويندوز](#windows)

---

## <!--android-->آندرويد

لا يزال دعم النود جي اس على الاندرويد قيد التجربة، لذلك فإن الملفات الثنائية المنتجة قبلا لا تزال غير متوفرة من قبل مطوري النود جي اس.

رغم ذلك، هناك بعض الحلول الموفرة من طرف ثالث، فمثلا يوفر مجتمع [Termux](https://termux.com/) محاكي طرفية و بيئة لينكس للأندرويد، إضافة إلى مدير حزم خاص و [مجموعة واسعة](https://github.com/termux/termux-packages) من العديد من التطبيقات المنتجة قبلا.
الأمر التالي سيثبت آخر نسخة متوفرة من النود جي اس:

```bash
pkg install nodejs
```

حاليا، النسخ الثنائية الخاصة بـ Termux و هي مربوطة بـ `system-icu` (تعتمد على حزمة `libicu`).

## Arch Linux

تتوفر حزم النود جي اس و الـ npm على مستوى مستودعات المجتمع.

```bash
pacman -S nodejs npm
```

## <!--debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages-->التوزيعات المبنية على ديبيان أو اوبنتو، لينكس للمؤسسات / فيدورا و حزم سناب

يتم توفير [الملف الثنائي الرسمي للنود جي اس](https://github.com/nodesource/distributions/blob/master/README.md) من قبل NodeSource.

## FreeBSD

آخر إصدارات النود جي اس متوفرة عبر [www/node](https://www.freshports.org/www/node)

يمكنك تثبيت حزمة ثنائية عبر [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

او يمكنك انتاجها باستعمال الـ[ports](https://www.freebsd.org/cgi/man.cgi?ports) الخاص بك:

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

النود جي اس متوفر عبر portage tree.

```bash
emerge nodejs
```

## IBM i

نسخ LTS لـNode.js متوفرة من IBM و متوفرة عبر [مدير الحزمة الـ'yum'](https://ibm.biz/ibmi-rpms). إسم الحزمة هو `nodejs` متبوعا برقم الإصدار الرائد (مثلا، `nodejs8`، `nodejs10`، `nodejs12`، إلخ

لتثبيت Node.js 12.x باستخدام سطر الأوامر، شغل الامر التالي كمستخدم مع سلطة *ALLOBJ الخاصة :

```bash
yum install nodejs12
```

يمكن أيضًا تثبيت Node.js مع منتج IBM i الخاص بحلول وصول العملاء. انظر [وثيقة الدعم هذه](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) لتفاصيل أكثر

## NetBSD

النود جي اس متوفر في pkgsrc tree:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

أو يمكنك تثبيت حزمة ثنائية (إذا كانت متوفرة لمنصتك) باستعمال pkgin:

```bash
pkgin -y install nodejs
```

## nvm

مدير نسخ النود هو عبارة عن سكريبت خاص بالباش يستخدم لإدارة عدة نسخ من النود جي اس، حيث يسمح لك بالقيام بعمليات مختلفة كتثبيت و إلغاء تثبيت و تبديل نسخة معينة و اكثر من ذلك.
لتثبيت مدير نسخ النود استعمل [سكريبت التثبيت](https://github.com/nvm-sh/nvm#install--update-script).

على انظمة يونيكس و OS X، يمكن تثبيت نسخة من النود جي اس تم بنائها من المصدر عبر [مدير نسخ النود (nvm)](https://github.com/creationix/nvm) عبر تثبيتها في المسار الذي يتوقعه مدير نسخ النود:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

بعد قيامك بهذه الخطوة، يمكنك استعمال مدير نسخ النود للتبديل بين النسخ المحررة و النسخ المبنية من المصدر.
على سبيل المثال ، اذا كانت نسخة النود جي اس الحالية هي <span dir="ltr">v8.0.0-pre</span>:

```bash
nvm use 8
```

حالما يتم إطلاق نسخة رسمية، قم بإلغاء تثبيت النسخة المبنية من المصدر:

```bash
nvm uninstall 8
```

## OpenBSD

يتوفر النود جي اس حاليا عبر نظام البوابات.

```bash
/usr/ports/lang/node
```

باستعمال [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) على OpenBSD:

```bash
pkg_add node
```

## <!--opensuse-and-sle-->openSUSE و SLE

يتوفر النود جي اس في المستودعات الرئيسية تحت الحزم الاتية:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6`
  (يجب إضافة الـ "موديل الويب و البرمجة" [قبل التثبيت](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html))

على سبيل المثال، لتثبيت النود جي اس <span dir="ltr">4.x</span> على <span dir="ltr">openSUSE Leap 42.2</span> قم بتنفيذ ما يلي كجذر:

```bash
zypper install nodejs4
```

## macOS

بكل بساطة، قم بتنزيل [مثبت الماك او اس](https://nodejs.org/ar/#home-downloadhead) مباشرة من موقع [nodejs.org](https://nodejs.org/).

_إذا كنت تريد تنزيل الحزمة باستعمال الباش:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### البدائل

باستعمال **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

باستعمال **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

باستعمال **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

تثبيت الحزمة الثنائية:

```bash
pkgin -y install nodejs
```

من أو قم ببنائها يدويا من pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## <!--smartos-and-illumos-->SmartOS و illumos

تأتي اسطوانة SmartOS مثبتة افتراضيا مع pkgsrc. على توزيعات أخرى من illumos، قم بتثبيت **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** أولا و عندها يمكنك تثبيت الحزمة الثنائية اعتياديا:

```bash
pkgin -y install nodejs
```

او قم ببنائها يدويا من pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

توفر Solus النود جي اس في مستودعها الرئيسي.

```bash
sudo eopkg install nodejs
```

## Void Linux

يوفر Void Linux نسخة مستقرة من النود جي اس في المستودع الرئيسي.

```bash
xbps-install -Sy nodejs
```

## <!--windows-->ويندوز

قم بتحميل [المثبت الخاص بويندوز](https://nodejs.org/ar/#home-downloadhead) مباشرة من موقع [nodejs.org](https://nodejs.org/).

### البدائل

باستعمال **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

باستعمال **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
