---
layout: docs.hbs
title: تثبيت Node.js عبر مدير الحزمة
---

# تثبيت Node.js عبر Package Managers

> يتم صيانة الحزم في هذه الصفحة ودعمها من قبل حزم كل منها، **لا** الفريق الأساسي Node.js. يرجى الإبلاغ عن أي مشاكل واجهتها إلى مشرف الحزمة. إذا تبين أن مشكلتك هي خطأ في Node.js نفسه، سيقوم المشرف بالإبلاغ عن المشكلة في واجهة التدفق.

***

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora and Red Hat Enterprise Linux](#centos-fedora-and-red-hat-Entere-linux)
- [توزيعات لينوكس الموجودة في ديبيان وأوبونتو والموجودة في دينكس](#debian-and-ubuntu-based-linux-distributions)
- [fnm](#fnm)
- [FreeBSD](#freebsd)
- [Gentoo](#gentoo)
- [IBM i](#ibm-i)
- [macOS](#macos)
- [n](#n)
- [NetBSD](#netbsd)
- [Nodenv](#nodenv)
- [nvm](#nvm)
- [nvs](#nvs)
- [OpenBSD](#openbsd)
- [openSUSE و SLE](#opensuse-and-sle)
- [SmartOS و الإضافات](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [الفراغ لينوكس](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## جبال الألب لينكس

تتوفر الحزمتين Node.js LTS و npm في المستودع الرئيسي.

```bash
apk إضافة عقدة npm
```

يمكن تثبيت تيار Node.js من مستودع المجتمع.

```bash
apk إضافة العقدة الحالية
```

## Android

لا يزال دعم الأندرويد تجريبيا في Node.js، لذلك لم يتم بعد توفير ثنائيات المجمعة مسبقاً من قبل مطوري Node.js.

ومع ذلك، هناك بعض الحلول من طرف ثالث. على سبيل المثال، [Termux](https://termux). om/) يوفر المجتمع محاكي طرفي وبيئة لينكس للأندرويد، فضلا عن مدير الحزمة و [مجموعة واسعة](https\://github. om/termux/termux-packages) للعديد من التطبيقات المجمعة مسبقا. هذا الأمر في تطبيق Termux سوف يقوم بتثبيت آخر إصدار متاح Node.js :

```bash
pkg install nodejs
```

في الوقت الحالي، تم ربط Termux Node.js binaries ضد `system-icu` (اعتماداً على حزمة `libicu`).

## أرش لينكس

تتوفر الحزمتين Node.js و npm في مستودع المجتمع.

```bash
pacman -S nodejs npm
```

## CentOS و Fedora و Red Hat Enterprise Linux

وتتوفر Node.js كوحدة تسمى `nodejs` في CentOS/RHEL 8 وFedora.

```bash
dnf module install nodejs:<stream>
```

حيث `<stream>` تتوافق مع النسخة الرئيسية من Node.js.
لمشاهدة قائمة بالمسارات المتاحة:

```bash
dnf وحدة قائمة العقد
```

على سبيل المثال، لتثبيت Node.js 18:

```bash
dnf وحدة تثبيت nodejs:18/مشترك
```

### البدائل

وتوفر هذه الموارد مجموعات متوافقة مع نظام التشغيل CentOS و Fedora و RHEL.

- [Node.js snaps](#snap) تم صيانته ودعمه في https\://github.com/nodejs/snap
- [Node.js binary distributions](#debian-and-ubuntu-based-linux-distributions) تحافظ عليها وتدعمها [NodeSource](https://github.com/nodesource/distributions)

## توزيع لينوكس الموجود في ديبا وأوبونتو

[Node.js binary distributions](https://github.com/nodesource/distributions) متاحة من NodeSource.

### البدائل

الحزم المتوافقة مع توزيعات ديبيان وأوبونتو القائمة على لينكس متاحة عبر [Node.js snaps](#snap).

## صاعقة

مدير إصدار Node.js سريع وبسيط مبني في Rust يستخدم لإدارة إصدارات Node.js الصادرة متعددة. يسمح لك بتنفيذ عمليات مثل التثبيت، إلغاء التثبيت، تبديل إصدارات العقدة تلقائيًا استنادًا إلى الدليل الحالي، إلخ.
لتثبيت fnm، استخدم هذا [برنامج نصي تثبيت](https://github.com/Schniz/fnm#using-a-script-macoslinux).

Fnm لديها دعم عبر المنصة (ماكوس، ويندوز، لينوكس) وجميع القذائف الشائعة (باش، زيش، فيش، PowerShell، وسطر أوامر ويندوز Prompt). تم بناء
fnm مع مراعاة السرعة ودعم التوافق للملفات `.node-version' و `.nvmrc'.

## FreeBSD

وأحدث إصدار من Node.js متاح عن طريق ميناء [www/node](https://www.freshports.org/www/node).

تثبيت حزمة ثنائية عبر [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
عقدة تثبيت pkg
```

أو جمعها بنفسك باستخدام [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && اجعل التثبيت
```

## جينتوو

وتتوفر Node.js في شجرة النحل.

```bash
الخروج من العقد
```

## IBM i

إصدارات LTS من Node.js متاحة من IBM، وهي متاحة عبر [مدير الحزمة 'yum'](https://ibm.biz/ibmi-rpms). اسم الحزمة هو 'nodejs' يتبعه رقم الإصدار الرئيسي (على سبيل المثال 'nodejs18' و 'nodejs20' وغيرها)

لتثبيت Node.js 20.x من سطر الأوامر، قم بتشغيل التالي كمستخدم مع \*ALLOBJ سلطة خاصة:

```bash
yum install nodejs20
```

يمكن أيضا تثبيت Node.js مع منتج IBM i Access Coluent Solutions . انظر [هذه الوثيقة الدعم](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) لمزيد من التفاصيل.

## macOS

قم بتنزيل [مثبت macOS Installer](/#home-downloadhead) مباشرة من موقع [nodejs.org](https://nodejs.org/).

_إذا كنت ترغب في تحميل الحزمة باستخدام الباش:_

```bash
حظر "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ <unk> grep "pkg" <unk> cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest. kg" & sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" - الهدف "/"
```

### البدائل

باستخدام **[Homebrew](https://brew.sh/)**:

```bash
تثبيت العقدة
```

باستخدام **[MacPorts](https://www.macports.org/)**:

```bash
تنفيذ تثبيت nodejs<major version>

# المثال
منفذ تثبيت nodejs7
```

باستخدام **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

تثبيت الحزمة الثنائية:

```bash
pkgin -y تثبيت العقد
```

أو بناء يدوياً من pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## ن

'n' هو أمر بسيط لاستخدام Node.js Manager for Mac and Linux. حدد الإصدار المستهدف لتثبيته باستخدام بناء غني
أو حدد من قائمة الإصدارات التي تم تنزيلها من قبل. يتم تثبيت الإصدارات على نطاق المنظومة أو على نطاق المستخدم، ولمزيد من الاستخدام
المستهدف، يمكنك تشغيل الإصدار مباشرة من التنزيلات المخزنة.

راجع [homepage](https://github.com/tj/n) لأساليب التثبيت (bootstrap, npm, Homebrew, third Party) وجميع تفاصيل الاستخدام.

إذا كان لديك بالفعل 'npm' ثم تثبيت 'n' ثم أحدث إصدار LTS 'عقدة' هو بسيط كالتالي:

```
npm install -g n
n lts
```

## NetBSD

تتوفر Node.js في شجرة pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && قم بتثبيت
```

أو تثبيت حزمة ثنائية (إذا كانت متاحة للمنصة الخاصة بك) باستخدام pkgin:

```bash
pkgin -y تثبيت العقد
```

## Nodenv

'nodenv' هو مدير إصدار عقد خفيف، شبيه بـ 'nvm'. إنه بسيط ويمكن التنبؤ به. نظام اضافي غني يسمح لك بتكييفه ليلائم احتياجاتك. استخدم "nodenv" لاختيار إصدار عقدة لتطبيقك وضمان تطابق بيئة التطوير الخاصة بك مع الإنتاج.

يتم الحفاظ على تعليمات تثبيت Nodenv [على صفحة Github الخاصة بها](https://github.com/nodenv/nodenv#installation). يرجى زيارة هذه الصفحة للتأكد من أنك تتبع أحدث إصدار لخطوات التثبيت.

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

على Unix / OS X أنظمة Node.js المبنية من المصدر يمكن تثبيتها باستخدام
[nvm](https://github.com/creationix/nvm) عن طريق تثبيتها في الموقع الذي يتوقع nvm أنه:

```bash
env VERSION=`أدوات python tools/getnodeversion.py` إجراء تثبيت DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

بعد هذا يمكنك استخدام `nvm` للتبديل بين الإصدارات الصادرة والإصدارات
المبنية من المصدر.
على سبيل المثال، إذا كان إصدار Node.js v8.0.0-pre:

```bash
استخدام nvm 8
```

بمجرد صدور الإصدار الرسمي سوف ترغب في إلغاء تثبيت الإصدار الذي تم بناؤه
من المصدر:

```bash
إلغاء تثبيت nvm 8
```

## nvs

#### ويندوز

مدير الإصدار 'nvs' هو نظام شامل للمنصات ويمكن استخدامه على أنظمة Windows، macOS، و Unix-like

لتثبيت `nvs` على Windows انتقل إلى [release page](https://github.com/jasongin/nvs/releases) هنا وقم بتنزيل ملف MSI المثبت من الإصدار الأخير.

يمكنك أيضًا استخدام 'chocolatey' لتثبيت:

```bash
choco install nvs
```

#### macOS,UnixLike

يمكنك العثور على الوثائق المتعلقة بخطوات التثبيت لـ 'nvs' في أنظمة macOS/Unix-like [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### الاستخدام

بعد هذا يمكنك استخدام `nvs` للتبديل بين إصدارات مختلفة من العقدة.

لإضافة أحدث إصدار من العقدة:

```bash
nvs إضافة الأحدث
```

أو لإضافة أحدث إصدار LTS من العقدة:

```bash
nvs إضافة رسائل
```

ثم قم بتشغيل الأمر `nvs use` لإضافة نسخة من العقدة إلى `PATH` الخاص بك من أجل القذيفة الحالية:

```bash
$ nvs يستخدم
PATH = %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nضد\node\14.17.0\x64
```

لإضافته إلى 'PATH' بشكل دائم، استخدم رابط 'nvs link\`:

```bash
nvs link lts
```

## OpenBSD

وتتاح Node.js من خلال نظام الموانئ.

```bash
/usr/ports/lang/العقدة
```

باستخدام [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) على OpenBSD:

```bash
pkg_إضافة عقدة
```

## افتح و SLE

وتتوفر Node.js في المستودعات الرئيسية في إطار الحزم التالية:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (يجب أن تكون "Web and Scripting Module" [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`، `nodejs12`، و `nodejs14`
  (يجب أن تكون "وحدة الويب والنص النصيبي" [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

على سبيل المثال، لتثبيت Node.js 14.x على openSUSE القفزة 15.2، قم بتشغيل الجذر التالي:

```bash
تثبيت zypper nodejs14
```

يمكن تثبيت إصدارات رئيسية مختلفة من العقدة واستخدامها في وقت واحد.

## SmartOS و الإضاءة

صور SmartOS تأتي مع pkgsrc مسبقاً. في توزيعات الإضافات الأخرى، قم أولاً بتثبيت **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**، ثم يمكنك تثبيت الحزمة الثنائية كعادية:

```bash
pkgin -y تثبيت العقد
```

أو بناء يدوياً من pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## التقط

[Node.js snaps](https://github.com/nodejs/snap) متاحة كـ [`node`](https://snapcraft.io/node) في متجر Snap.

## Solus

توفر Solus Node.js في مستودعها الرئيسي.

```bash
sudo eopkg install nodejs
```

## Void Linux

إبطال سفن لينكس Node.js المستقرة في المستودع الرئيسي.

```bash
xbps-install -Sy nodejs
```

## ويندوز

تحميل [Windows Installer](/#home-downloadhead) مباشرة من موقع [nodejs.org](https://nodejs.org/).

### البدائل

باستخدام **[Winget](https://aka.ms/winget-cli)**:

```bash
تثبيت الجناح OpenJS.NodeJS
# أو لـ LTS
تثبيت الجناح OpenJS.NodeJS.LTS
```

بعد تشغيل أحد الأمرين أعلاه، قد يكون من الضروري إعادة تشغيل محاكي المحطة الطرفية
قبل أن يصبح أمر CLI `العقدة` متاحاً.

باستخدام **[Chocolatey](https://chocolatey.org/)**:

```bash
c<unk> nodejs
# أو للتثبيت الكامل مع npm
c<unk> nodejs.install
```

باستخدام **[Scoop](https://scoop.sh/)**:

```bash
قم بتثبيت nodejs
# أو ل LTS
قم بتثبيت nodejs-lts
```

## z/OS

IBM&reg; SDK لـ Node.js - z/OS&reg; متاح في شكلين من أشكال التثبيت،
SMP/E و PAX. حدد تنسيق التثبيت الذي ينطبق عليك:

- [تثبيت وتكوين نسخة SMP/E من Node.js على z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [تثبيت وتكوين إصدار PAX من Node.js على z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
