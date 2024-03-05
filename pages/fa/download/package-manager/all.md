---
layout: docs
title: نصب Node.js از طریق مدیر بسته
---

# نصب Node.js از طریق مدیران بسته

> بسته‌های موجود در این صفحه توسط بسته‌بندان مربوطه حفظ و پشتیبانی می‌شوند، **نه** توسط تیم هسته Node.js. لطفاً هر گونه مشکلی که برخورد می‌کنید را به نگهدارنده بسته گزارش دهید. اگر مشخص شود که مشکل شما یک باگ در خود Node.js است، نگهدارنده به بالادست گزارش خواهد داد.

***

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS، Fedora و Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [توزیع‌های مبتنی بر Debian و Ubuntu Linux](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE and SLE](#opensuse-and-sle)
- [SmartOS و illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Alpine Linux

Node.js LTS و npm پکیج‌ها در مخزن اصلی موجود است.

```bash
apk add nodejs npm
```

Node.js Current از طریق مخزن جامعه قابل نصب است.

```bash
apk add nodejs-current
```

## اندروید

پشتیبانی اندروید هنوز در Node.js آزمایشی است، بنابراین فایل‌های دودویی پیش‌کامپایل شده توسط توسعه‌دهندگان Node.js هنوز فراهم نشده‌اند.

با این حال، راه‌حل‌های شخص ثالثی وجود دارند. به عنوان مثال، [Termux](https://termux.com/) امکانات امولاتور ترمینال و محیط لینوکس برای اندروید را فراهم می‌کند، همچنین مدیر بسته خود و [مجموعه گسترده](https://github.com/termux/termux-packages) از بسیاری از برنامه‌های پیش‌کامپایل شده. این دستور در برنامه Termux آخرین نسخه قابل دسترس Node.js را نصب می‌کند:

```bash
pkg install nodejs
```

در حال حاضر، فایل‌های دودویی Termux Node.js با `system-icu` مرتبط هستند (بسته `libicu` راه‌اندازی می‌شود).

## آرچ لینوکس

بسته‌های Node.js و npm در مخزن اجتماعی در دسترس هستند.

```bash
pacman -S nodejs npm
```

## سانتوس، فدورا و ردهٔ حقوقی شرکت رد هت

Node.js به عنوان یک ماژول با نام `nodejs` در CentOS/RHEL 8 و Fedora در دسترس است.

```bash
dnf module install nodejs:<stream>
```

جایی که `<stream>` با نسخه اصلی Node.js مطابقت دارد.
برای مشاهده لیست جریان‌های در دسترس:

```bash
dnf module list nodejs
```

به عنوان مثال، برای نصب Node.js 18:

```bash
dnf module install nodejs:18/common
```

### جایگزین‌ها

این منابع بسته‌هایی را ارائه می‌دهند که با CentOS، Fedora و RHEL سازگار هستند.

- [Node.js snaps](#snap) توسط https\://github.com/nodejs/snap حفظ و پشتیبانی می‌شود
- [توزیع‌های باینری Node.js](#debian-and-ubuntu-based-linux-distributions) توسط [NodeSource](https://github.com/nodesource/distributions) حفظ و پشتیبانی می‌شوند

## توزیع‌های لینوکس مبتنی بر Debian و Ubuntu

[توزیع‌های باینری Node.js](https://github.com/nodesource/distributions) از NodeSource در دسترس هستند

### جایگزینی‌ها

بسته‌هایی که با توزیع‌های لینوکس مبتنی بر Debian و Ubuntu سازگار هستند از طریق [Node.js snaps](#snap) در دسترس هستند

## fnm

مدیر نسخه ساده و سریع Node.js که با Rust ساخته شده است و برای مدیریت چندین نسخه منتشر شده Node.js استفاده می‌شود. این به شما امکاناتی مانند نصب، حذف، تغییر نسخه Node به صورت خودکار بر اساس دایرکتوری فعلی و غیره را می‌دهد. برای نصب fnm، از این [اسکریپت نصب](https://github.com/Schniz/fnm#using-a-script-macoslinux) استفاده کنید

fnm پشتیبانی از پلتفرمهای متقابل (macOS، Windows، Linux) و تمام پوسته‌های محبوب (Bash، Zsh، Fish، PowerShell، پرومپت خط فرمان Windows) دارد. fnm با سرعت و پشتیبانی از فایل‌های `.node-version` و `.nvmrc` ساخته شده است

## FreeBSD

آخرین نسخه Node.js از راهگاه [www/node](https://www.freshports.org/www/node) در دسترس است.

یک بستهٔ باینری را از طریق [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) نصب کنید:

```bash
pkg install node
```

یا آن را خودتان از طریق [ports](https://www.freebsd.org/cgi/man.cgi?ports) کامپایل کنید:

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js در درخت portage در دسترس است.

```bash
emerge nodejs
```

## IBM i

نسخه‌های LTS Node.js از طریق IBM در دسترس هستند و از طریق [مدیر بسته 'yum'](https://ibm.biz/ibmi-rpms) در دسترس هستند. نام بسته `nodejs` به عدد نسخه اصلی پیروی می‌کند (به عنوان مثال، `nodejs18`، `nodejs20` و غیره)

برای نصب Node.js 20.x از خط فرمان، دستور زیر را به عنوان یک کاربر با اختیارات ویژه \*ALLOBJ اجرا کنید:

```bash
yum install nodejs20
```

Node.js همچنین می‌تواند با محصول IBM i Access Client Solutions نصب شود. برای اطلاعات بیشتر [این سند پشتیبانی](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) را مشاهده کنید

## macOS

از [نصب کننده macOS](/#home-downloadhead) مستقیما از وب سایت [nodejs.org](https://nodejs.org/) دانلود کنید.

_اگر می خواهید بسته را با bash دانلود کنید:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### جایگزینی ها

استفاده از **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

استفاده از **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

استفاده از **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

نصب بسته باینری:

```bash
pkgin -y install nodejs
```

یا به صورت دستی از pkgsrc بسازید:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` یک مدیر نسخه ساده برای Node.js برای مک و لینوکس است. نسخه مورد نظر را برای نصب با یک دستور غنی مشخص کنید، یا از فهرستی از نسخه‌های قبلی دانلود شده انتخاب کنید. این نسخه‌ها به صورت سیستمی یا کاربری نصب می‌شوند و برای استفاده مستقیم از یک نسخه می‌توانید آن را مستقیماً از دانلودهای ذخیره شده اجرا کنید.

برای روش‌های نصب (bootstrap، npm، Homebrew، شخص ثالث) و جزئیات استفاده همه را در [صفحه اصلی](https://github.com/tj/n) ببینید.

اگر قبلاً `npm` را دارید، نصب `n` و سپس جدیدترین نسخه LTS `node` به سادگی انجام می‌شود:

```
npm install -g n
n lts
```

## NetBSD

Node.js در درخت pkgsrc در دسترس است:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

یا یک بسته باینری (اگر برای پلتفرم شما موجود است) با استفاده از pkgin نصب کنید:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` یک مدیر نسخه سبک برای node است، مشابه `nvm`. این ساده و قابل پیش‌بینی است. یک اکوسیستم افزونه غنی به شما امکان می‌دهد آن را براساس نیازهای خود تنظیم کنید. از `nodenv` برای انتخاب یک نسخه Node برای برنامه خود و تضمین کردن اینکه محیط توسعه شما با محیط تولید مطابقت دارد، استفاده کنید.

دستورات نصب nodenv را [در صفحه Github خود](https://github.com/nodenv/nodenv#installation) نگهداری می‌کنند. لطفاً به آن صفحه مراجعه کنید تا اطمینان حاصل کنید که دنبال آخرین نسخه مراحل نصب هستید.

## nvm

مدیر نسخه Node یک اسکریپت bash است که برای مدیریت چندین نسخه منتشر شده Node.js استفاده می شود. این به شما امکان می دهد که عملیاتی مانند نصب، حذف، تغییر نسخه و غیره را انجام دهید. برای نصب nvm، از این [اسکریپت نصب](https://github.com/nvm-sh/nvm#install--update-script) استفاده کنید.

در سیستم های Unix / OS X می توان Node.js که از منبع ساخته شده است را با استفاده از [nvm](https://github.com/creationix/nvm) نصب کرد، با نصب آن در مکانی که nvm انتظار دارد:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

پس از این می توانید از `nvm` برای تغییر بین نسخه های منتشر شده و نسخه های ساخته شده از منبع استفاده کنید. به عنوان مثال، اگر نسخه Node.js v8.0.0-pre باشد:

```bash
nvm use 8
```

هنگامی که نسخه رسمی منتشر می شود، شما می خواهید نسخه ای که از منبع ساخته شده است را حذف کنید:

```bash
nvm uninstall 8
```

## nvs

#### ویندوز

مدیر نسخه `nvs` چند پلتفرمی است و می تواند بر روی ویندوز، macOS و سیستم های مانند Unix استفاده شود

برای نصب `nvs` در ویندوز به [صفحه انتشارات](https://github.com/jasongin/nvs/releases) اینجا بروید و فایل نصب کننده MSI آخرین نسخه را دانلود کنید.

همچنین می توانید از `chocolatey` برای نصب آن استفاده کنید:

```bash
choco install nvs
```

#### macOS، UnixLike

می‌توانید مستندات مربوط به مراحل نصب `nvs` در سیستم‌های macOS/Unix-like را [اینجا](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux) پیدا کنید.

#### استفاده

بعد از این می‌توانید از `nvs` برای تغییر بین نسخه‌های مختلف Node.js استفاده کنید.

برای اضافه کردن آخرین نسخه Node.js:

```bash
nvs add latest
```

یا برای اضافه کردن آخرین نسخه LTS Node.js:

```bash
nvs add lts
```

سپس دستور `nvs use` را اجرا کنید تا یک نسخه از Node.js را به `PATH` شما برای شل فعلی اضافه کنید.

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

برای اضافه کردن آن به `PATH` به صورت دائمی، از `nvs link` استفاده کنید:

```bash
nvs link lts
```

## OpenBSD

Node.js از طریق سیستم پورت‌ها در دسترس است.

```bash
/usr/ports/lang/node
```

استفاده از [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) در OpenBSD:

```bash
pkg_add node
```

## openSUSE و SLE

Node.js در مخازن اصلی با بسته‌های زیر موجود است:

- **openSUSE Leap 15.2**: `nodejs10`، `nodejs12`، `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`، `nodejs12` و `nodejs14`
  (ماژول "وب و اسکریپت‌نویسی" باید [فعال شود](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`، `nodejs12` و `nodejs14`
  (ماژول "وب و اسکریپت‌نویسی" باید [فعال شود](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

به عنوان مثال، برای نصب Node.js 14.x در openSUSE Leap 15.2، دستور زیر را به عنوان روت اجرا کنید:

```bash
zypper install nodejs14
```

نسخه‌های اصلی مختلف Node می‌توانند نصب و همزمان استفاده شوند.

## SmartOS و illumos

تصاویر SmartOS دارای pkgsrc به صورت پیش‌فرض می‌باشند. در توزیع‌های دیگر illumos، ابتدا **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** را نصب کنید، سپس می‌توانید بسته دودویی را به صورت عادی نصب کنید:

```bash
pkgin -y install nodejs
```

یا به صورت دستی از pkgsrc ساخته شود:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) به عنوان [`node`](https://snapcraft.io/node) در فروشگاه Snap موجود است.

## Solus

Solus Node.js را در مخزن اصلی خود فراهم می کند.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux نسخه پایدار Node.js را در مخزن اصلی ارائه می دهد.

```bash
xbps-install -Sy nodejs
```

## ویندوز

[نصب کننده ویندوز](/#home-downloadhead) را مستقیما از وب سایت [nodejs.org](https://nodejs.org/) دانلود کنید.

### جایگزین ها

استفاده از **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

پس از اجرای یکی از دو دستور فوق، ممکن است لازم باشد تا قبل از دسترسی به دستور CLI `node`، شبیه‌ساز ترمینال را دوباره راه‌اندازی کنید.

استفاده از **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

استفاده از **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM® SDK برای Node.js - z/OS® در دو فرمت نصب، SMP/E و PAX، موجود است. فرمت نصبی را که برای شما صدق می‌کند انتخاب کنید:

- [نصب و پیکربندی نسخه SMP/E Node.js در z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [نصب و پیکربندی نسخه PAX Node.js در z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
