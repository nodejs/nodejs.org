---
layout: download
title: از طریق پکیج منیجر Node.js نصب
---

# نصب Node.js از طریق پکیج منیجر

> پکیج‌های این صفحه توسط پکیج منیجر های مربوطه نگهداری و پشتیبانی می‌شوند، **نه** توسط تیم هسته Node.js. لطفاً اگر به هرگونه مشکلی برخوردید آن را به نگه دارنده پکیج گزارش دهید. اگر مشکل شما یک باگ در خود Node.js باشد، نگه دارنده آن را به مرجع اصلی گزارش خواهد داد.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora and Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian and Ubuntu based Linux distributions](#debian-and-ubuntu-based-linux-distributions)
- [Exherbo Linux](#exherbo-linux)
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
- [SmartOS and illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [vfox](#vfox)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

بسته‌های Node.js LTS و npm در مخزن اصلی موجود هستند.

```bash
apk add nodejs npm
```

Node.js Current نیز می‌تواند از مخزن کامیونیتی نصب شود.

```bash
apk add nodejs-current
```

## Android

پشتیبانی از اندروید در Node.js هنوز در مرحله آزمایشی است، بنابراین باینری‌های از پیش کامپایل شده هنوز توسط توسعه دهندگان Node.js ارائه نشده‌اند.

با این حال، برخی راه حل‌های شخص ثالث وجود دارند. به عنوان مثال، کامیونیتی [Termux](https://termux.com/) یک شبیه‌ساز ترمینال و محیط لینوکس برای اندروید، به همراه پکیج منیجر مخصوص و [مجموعه گسترده‌ای](https://github.com/termux/termux-packages) از بسیاری از برنامه‌های از پیش کامپایل شده را ارائه می‌دهد. این دستور در برنامه Termux، آخرین نسخه موجود از Node.js را نصب خواهد کرد:

```bash
pkg install nodejs
```

در حال حاضر، باینری‌های Node.js در Termux به `system-icu` لینک شده‌اند (وابسته به بسته `libicu`).

## Arch Linux

بسته‌های Node.js و npm در مخزن کامیونیتی موجود هستند.

```bash
pacman -S nodejs npm
```

## CentOS - Fedora - Red Hat Enterprise Linux

Node.js در CentOS/RHEL 8 و Fedora به عنوان یک ماژول با نام `nodejs` موجود است.

```bash
dnf module install nodejs:<stream>
```

که در آن `<stream>` مربوط به نسخه اصلی Node.js است.
برای مشاهده لیست استریم‌های موجود:

```bash
dnf module list nodejs
```

به عنوان مثال، برای نصب Node.js 18:

```bash
dnf module install nodejs:18/common
```

### جایگزین

این منابع بسته‌هایی را ارائه می‌کنند که با CentOS ، Fedora و RHEL سازگار هستند.

- [Node.js snaps](#snap) که در https://github.com/nodejs/snap نگهداری و پشتیبانی می‌شوند.
- [توزیع‌های باینری Node.js](#debian-and-ubuntu-based-linux-distributions) که توسط [NodeSource](https://github.com/nodesource/distributions) نگهداری و پشتیبانی می‌شوند.

## توزیع‌های لینوکس مبتنی بر Debian و Ubuntu

[توزیع‌های باینری Node.js](https://github.com/nodesource/distributions) از NodeSource در دسترس هستند.

### جایگزین

بسته‌هایی که با توزیع‌های لینوکس مبتنی بر دبیان و اوبونتو سازگار هستند، از طریق [Node.js snaps](#snap) در دسترس می‌باشند.

## Exherbo Linux

بسته های Node.js و npm در [مخزن arbor](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node) در دسترس است.

```bash
cave resolve -x node
```

## fnm

مدیر نسخه سریع و ساده Node.js که با Rust ساخته شده است و برای مدیریت نسخه‌های مختلف منتشر شده Node.js استفاده می‌شود. به شما امکان می‌دهد عملیاتی مانند نصب، حذف، تغییر نسخه‌های Node را براساس پوشه فعلی به صورت خودکار انجام دهید و غیره.
برای نصب fnm از این [اسکریپت نصب](https://github.com/Schniz/fnm#using-a-script-macoslinux) استفاده کنید.

fnm پشتیبانی از پلتفرم‌های متعدد (macOS ، Windows ، Linux) و تمام شل‌های محبوب (Bash ، Zsh ، Fish ، PowerShell ، Windows Command Line Prompt) را دارد.
fnm با تمرکز بر سرعت و پشتیبانی از سازگاری برای فایل‌های `‎.node-version` و `‎.nvmrc` ساخته شده است.

## FreeBSD

آخرین نسخه منتشر شده Node.js از طریق [پورت www/node](https://www.freshports.org/www/node) در دسترس است.

بسته باینری را از طریق [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) نصب کنید:

```bash
pkg install node
```

یا آن را با استفاده از [ports](https://www.freebsd.org/cgi/man.cgi?ports) کامپایل کنید:

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js در portage tree موجود است.

```bash
emerge nodejs
```

## IBM i

نسخه‌های LTS از Node.js در دسترس هستند و از طریق [پکیج منیجر 'yum'](https://ibm.biz/ibmi-rpms) قابل دسترسی می‌باشند. نام بسته `nodejs` به دنبال شماره نسخه اصلی است (به عنوان مثال: `nodejs18` ، `nodejs20` و غیره)

برای نصب Node.js 20.x از خط فرمان، دستور زیر را به عنوان کاربر با مجوز ویژه ‎\*ALLOBJ اجرا کنید:

```bash
yum install nodejs20
```

Node.js همچنین می‌تواند با محصول IBM i Access Client Solutions نصب شود. برای جزئیات بیشتر به [این سند پشتیبانی](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) مراجعه کنید.

## macOS

دانلود مستقیم [نصب‌کننده macOS](/#home-downloadhead) از وب‌سایت [nodejs.org](https://nodejs.org/)

_اگر می‌خواهید بسته را با bash دانلود کنید:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### جایگزین

با استفاده از **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

با استفاده از **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

با استفاده از **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

نصب بسته باینری:

```bash
pkgin -y install nodejs
```

یا ساخت دستی از pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` یک مدیر نسخه ساده برای استفاده Node.js برای Mac و Linux است. نسخه مورد نظر برای نصب را مشخص کنید، یا از میان منوی نسخه‌های قبلاً دانلود شده انتخاب نمایید. نسخه‌ها در سطح سیستم یا در سطح کاربر نصب می‌شوند و برای استفاده هدفمندتر می‌توانید نسخه‌ای را مستقیماً از دانلودهای ذخیره شده اجرا کنید.

برای روش‌های نصب (bootstrap, npm, Homebrew, third-party) و تمام جزئیات استفاده، به [صفحه اصلی](https://github.com/tj/n) مراجعه کنید.

اگر قبلاً `npm` را داشته باشید، نصب `n` و سپس نسخه LTS جدیدترین `node` به این سادگی است:

```
npm install -g n
n lts
```

## NetBSD

Node.js در pkgsrc tree موجود است:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

یا یک بسته باینری را نصب کنید (در صورت موجود بودن برای پلتفرم شما) با استفاده از pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` یک مدیر نسخه سبک Node، مشابه `nvm` است. ساده و قابل پیش‌بینی است. یک اکوسیستم پلاگین غنی به شما امکان می‌دهد آن را برای تطابق با نیازهایتان سفارشی کنید. از `nodenv` برای انتخاب نسخه Node برای برنامه خود استفاده کنید و اطمینان حاصل کنید که محیط توسعه شما با محیط تولید مطابقت دارد.

دستورالعمل‌های نصب Nodenv در [صفحه گیت‌هاب آن](https://github.com/nodenv/nodenv#installation) نگهداری می‌شوند. لطفاً به آن صفحه مراجعه کنید تا از آخرین نسخه مراحل نصب پیروی کنید.

## nvm

Node Version Manager یک اسکریپت bash است که برای مدیریت نسخه‌های مختلف منتشر شده Node.js استفاده می‌شود. به شما امکان می‌دهد عملیاتی مانند نصب، حذف، تغییر نسخه و غیره را انجام دهید.
برای نصب nvm، از این [اسکریپت نصب](https://github.com/nvm-sh/nvm#install--update-script) استفاده کنید.

در سیستم‌های Unix / OS X، می‌توانیم Node.js ساخته شده از سورس کد را با استفاده از [nvm](https://github.com/creationix/nvm) در مکانی که nvm انتظار دارد، نصب کنیم:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

پس از این می‌توانید از `nvm` برای سوئیچ بین نسخه‌های منتشر شده و نسخه‌های ساخته شده از سورس کد استفاده کنید.
به عنوان مثال، اگر نسخه Node.js برابر با v8.0.0-pre باشد:

```bash
nvm use 8
```

هنگامی که نسخه رسمی منتشر شد، باید نسخه ساخته شده از سوررس کد را حذف کنید:

```bash
nvm uninstall 8
```

## nvs

#### Windows

مدیر نسخه `nvs` چندسکویی است و می‌تواند در ویندوز، macOS و سیستم‌های شبیه یونیکس استفاده شود.

برای نصب `nvs` در ویندوز به [صفحه انتشار](https://github.com/jasongin/nvs/releases) بروید و فایل نصب‌کننده MSI از آخرین نسخه را دانلود کنید.

همچنین می‌توانید از `chocolatey` برای نصب آن استفاده کنید:

```bash
choco install nvs
```

#### macOS، UnixLike

می‌توانید مستندات مربوط به مراحل نصب `nvs` در سیستم‌های macOS/Unix-like را [اینجا](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux) پیدا کنید.

#### استفاده

پس از این می‌توانید از `nvs` برای تغییر بین نسخه‌های مختلف node استفاده کنید.

برای اضافه کردن آخرین نسخه از node:

```bash
nvs add latest
```

یا برای اضافه کردن آخرین نسخه LTS از node:

```bash
nvs add lts
```

سپس دستور `nvs use` را اجرا کنید تا یک نسخه از node را به `PATH` برای شل فعلی اضافه کنید:

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

با استفاده از [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) در OpenBSD:

```bash
pkg_add node
```

## openSUSE و SLE

Node.js در مخازن اصلی تحت بسته‌های زیر موجود است:

- `nodejs10` ، `nodejs12` ، `nodejs14` :**openSUSE Leap 15.2**
- - `nodejs20` :**openSUSE Tumbleweed**
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (باید [ماژول "Web and Scripting"](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated) فعال شود.)
- `nodejs10`، `nodejs12` ، `nodejs14` :**SUSE Linux Enterprise Server (SLES) 15 SP2**
  (باید [ماژول "Web and Scripting"](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module) فعال شود.)

به عنوان مثال، برای نصب Node.js 14.x در openSUSE Leap 15.2، با دسترسی root دستور زیر را اجرا کنید:

```bash
zypper install nodejs14
```

نسخه‌های مختلف اصلی Node می‌توانند همزمان نصب و استفاده شوند.

## SmartOS و illumos

image های SmartOS با pkgsrc از پیش نصب شده ارائه می‌شوند. در توزیع‌های دیگر illumos، ابتدا **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** را نصب کنید، سپس می‌توانید بسته باینری را به صورت عادی نصب کنید:

```bash
pkgin -y install nodejs
```

یا به صورت دستی از pkgsrc بسازید:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[اسنپ ​​های Node.js](https://github.com/nodejs/snap) تحت عنوان [`node`](https://snapcraft.io/node) در فروشگاه Snap در دسترس هستند.

## Solus

Solus، بسته Node.js را در مخزن اصلی خود ارائه می‌دهد.

```bash
sudo eopkg install nodejs
```

## vfox

یک مدیر نسخه چندسکویی (ویندوز، macOS، لینوکس) و قابل **گسترش**.

به شما اجازه می‌دهد که **نسخه‌های مختلف برای پروژه‌های مختلف**، **نسخه‌های مختلف برای شل‌های مختلف**، و تغییر خودکار نسخه Node بر اساس دایرکتوری فعلی، و غیره را انجام دهید.

این نرم‌افزار تمام پوسته‌های محبوب را پشتیبانی می‌کند (Bash, Zsh, Fish, PowerShell, Clink, Cmder).

به [شروع سریع](https://vfox.lhan.me/guides/quick-start.html) برای استفاده سریع از vfox و تمام جزئیات استفاده مراجعه کنید.

## Void Linux

Void Linux نسخه پایدار Node.js را در مخزن اصلی خود ارائه می‌کند.

```bash
xbps-install -Sy nodejs
```

## Windows

مستقیماً [نصب‌کننده ویندوز](/#home-downloadhead) را از وب‌سایت [nodejs.org](https://nodejs.org/) دانلود کنید.

### جایگزین

با استفاده از **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

پس از اجرای یکی از دو دستور بالا، ممکن است لازم باشد ترمینال را دوباره راه‌اندازی کنید تا دستور `node` در CLI در دسترس قرار بگیرد.

با استفاده از **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

با استفاده از **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK برای Node.js - z/OS&reg; در دو قالب نصب، SMP/E و PAX در دسترس است. قالب نصب مربوط به خود را انتخاب کنید:

- [نصب و پیکربندی نسخه SMP/E از Node.js در z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [نصب و پیکربندی نسخه PAX از Node.js در z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
