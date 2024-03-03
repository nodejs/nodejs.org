---
layout: docs.hb
title: Встановлення Node.js через менеджер пакетів
---

# Встановлення Node.js через менеджерів пакунків

> Пакети на цій сторінці підтримуються та підтримуються їх відповідними пакетами, \*\*не є основною командою Node.js. Будь ласка, повідомте про будь-які проблеми, що виникли з технічним обслуговуванням пакету. Якщо виявиться, що ваша проблема — це помилка в самому Node.js, супроводжуючий користувач буде повідомляти про проблему з upstream.

***

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Арч Linux](#arch-linux)
- [CentOS, Fedora і Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian та Ubuntu на основі дистрибутивів Linux](#debian-and-ubuntu-based-linux-дистрибуція)
- [fnm](#fnm)
- [FreeBSD](#freebsd)
- [Gentoo](#gentoo)
- [IBM я](#ibm-i)
- [macOS](#macos)
- [n](#n)
- [NetBSD](#netbs)
- [Nodenv](#nodenv)
- [nvm](#nvm)
- [nvs](#nvs)
- [OpenBSD](#openbsd)
- [openSUSE і SLE](#opensuse-and-sle)
- [SmartOS і ілюмів](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Альпіна Лінукс

Node.js LTS та npm пакети доступні в головному репозиторії.

```bash
apk додати nodejs npm
```

Node.js поточний може бути встановлений з репозиторію спільноти.

```bash
apk додати nodejs-current
```

## Android

Підтримка Android досі експериментальна в Node.js, тому попередні двійкові файли для Android ще не надаються розробниками Node.js.

Однак, є деякі сторонні рішення. Наприклад, [Termux](https\://termux. om/) спільнота надає термінальний емулятор та середовище Linux для Android, а також власний менеджер пакетів і [розширена колекція](https\://github. om/termux/termux-packages) декількох бажаних застосунків. Ця команда в Termux буде встановлювати останню наявну версію Node.js:

```bash
pkg install nodejs
```

В даний час двійкові файли Node.js пов'язані з `system-icu` (в залежності від пакета `libicu`).

## Арка Linux

У репозиторії спільноти доступні Node.js та npm.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora і Red Hat Enterprise Linux

Node.js доступний в якості модуля, що називається `nodejs` в CentOS/RHEL 8 і Fedora.

```bash
dnf module install nodejs:<stream>
```

де `<stream>` відповідає основній версії Node.js.
Щоб побачити список доступних потоків:

```bash
вузли списку модулів dnf
```

Наприклад, для встановлення Node.js 18:

```bash
dnf модуль встановити вузли:18/common
```

### Альтернативи

Ці ресурси забезпечують пакети сумісні з CentOS, Fedora та RHEL.

- [Node.js знімки](#snap) підтримується та підтримується в https\://github.com/nodejs/snap
- [Node.js binary distributions](#debian-and-ubuntu-based-linux-distributions) maintained and supported by [NodeSource](https://github.com/nodesource/distributions)

## Debian та Ubuntu засновані на дистрибутивах Linux

[Двійкові розподіли Node.js](https://github.com/nodesource/distributions) доступні з NodeSource.

### Альтернативи

Пакети, сумісні з Debian та Ubuntu на основі Linux розділів доступні через [Node.js snaps](#snap).

## фнм

Швидкий і простий менеджер версій Node.js, заснований в Rust, який використовувався для керування кількома випущеними версіями Node.js. Це дозволяє вам виконувати такі операції, як встановлення, видалення, переключити версії Node автоматично в залежності від поточного каталогу тощо.
Щоб встановити fnm, використовуйте цей [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm має крос-платформну підтримку (macOS, Windows, Linux) і всі популярні оболонки (Bash, Zsh, Fish, PowerShell, командний рядок Windows).
fnm побудований зі швидкістю мозку і сумісністю для файлів `.node-version` і `.nvmrc`.

## FreeBSD

Найбільш останній випуск Node.js доступний через [www/node](https://www.freshports.org/www/node) порт.

Встановіть двійковий пакет через [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg встановлювач вузол
```

Або компілюйте їх самостійно за допомогою [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && зробити встановлення
```

## Дженту

Node.js доступний в портатному дереві.

```bash
створити нові вузли
```

## IBM

LTS версії Node.js доступні з IBM, і доступні через [yum' менеджера пакетів](https://ibm.biz/ibmi-rpms). Пакетна назва є `nodejs`, за яким йде основний номер версії (наприклад, `nodejs18`, `nodejs20` тощо)

Щоб встановити Node.js 20.x з командного рядка, запустіть наступне як користувач з спеціальними органами \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js також може бути встановлений за допомогою продуктів IBM для доступу до клієнтських солей. Див. [цей документ підтримки](http://www-01.ibm.com/support/docview.ws?uid=nas8N1022619) для деталей

## macOS

Завантажте [macOS Встановлювач](/#home-downloadhead) безпосередньо з веб-сайту [nodejs.org](https://nodejs.org/).

_Якщо ви хочете завантажити пакет з bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest. kg" && судо установки -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Альтернативи

Using **[Homebrew](https://brew.sh/)**:

```bash
створити новий вузол встановлення
```

Using **[MacPorts](https://www.macports.org/)**:

```bash
порт встановити nodejs<major version>

# Приклад
порт встановлювати nodejs7
```

Використання **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Встановіть двійковий пакет:

```bash
pkgin -y встановити nodejs
```

Або побудувати вручну з pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` is a simple to use Node.js version manager for Mac and Linux. Specify the target version to install using a rich syntax,
or select from a menu of previously downloaded versions. The versions are installed system-wide or user-wide, and for more
targeted use you can run a version directly from the cached downloads.

Дивіться [homepage](https://github.com/tj/n) для встановлення методів (bootstrap, npm, Homebrew, третьої сторони), і всі деталі використання.

Якщо у вас вже є `npm`, то встановіть `n` а потім найновіша версія `node` є такою ж простою:

```
npm install -g n
n lts
```

## NetBSD

Node.js доступний в дереві pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && додатково
```

Або встановити бінарний пакет (якщо він доступний для вашої платформи) за допомогою pkgin:

```bash
pkgin -y встановити nodejs
```

## Nodenv

`nodenv` є легкою версією диспетчера вузлів, подібно до `nvm`. Це просто і передбачуване. Багата екосистема дозволяє адаптувати її до ваших потреб. Використовуйте `nodenv`, щоб вибрати версію вузла для вашої програми і гарантувати, що середовище розробки відповідає виробництву.

Інструкції для установки вузла підтримуються [на своїй сторінці Github (https\://github.com/nodenv/nodenv#installation). Будь ласка, відвідайте цю сторінку, щоб переконатися, що ви дотримуєтесь останньої версії кроків встановлення.

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

On Unix / OS X systems Node.js built from source can be installed using
[nvm](https://github.com/creationix/nvm) by installing into the location that nvm expects:

```bash
env VERSION=`python tools/getnodeversion.py` робить встановлення DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

After this you can use `nvm` to switch between released versions and versions
built from source.
For example, if the version of Node.js is v8.0.0-pre:

```bash
nvm використання 8
```

Once the official release is out you will want to uninstall the version built
from source:

```bash
видалення nvm видалення 8
```

## nvs

#### Вікна

Менеджер версій `nvs` користується крос-платформою і може бути використаний на Windows, macOS та в схожих на Unix-системи

Щоб встановити `nvs` на Windows, перейдіть на [сторінку релізу](https://github.com/jasongin/nvs/releases) і завантажте файл інсталятора MSI останнього релізу.

Ви також можете використати `chocolatey` для встановлення:

```bash
choco install nvs
```

#### macOS,UnixLike

You can find the documentation regarding the installation steps of `nvs` in macOS/Unix-like systems [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Використання

Після цього ви зможете використовувати `nvs` для перемикання між різними версіями вузла.

Щоб додати останню версію вузла:

```bash
nvs додати новіші
```

Або додати останню версію LTS вузла:

```bash
nvs додати лти
```

Потім запустіть команду `nvs use`, щоб додати версію вузла до вашого `PATH` для поточного шару:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Щоб додати його до `PATH` безповоротно, використовуйте `nvs посилання`:

```bash
nvs link lts
```

## OpenBSD

Node.js доступний через портову систему.

```bash
/usr/ports/lang/node
```

Using [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```

## openSUSE і SLE

Node.js доступний в основних репозиторіях під такими пакетами:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Значення "Web and Scripting Module" має бути [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Наприклад, для встановлення Node.js 14.x на openSUSE позиціонування 15.2 запустіть наступне як root:

```bash
зиппер встановити nodejs14
```

Різні основні версії вузла можуть бути встановлені та використані в даний час.

## SmartOS і ілюмос

SmartOS зображення надходять з попередньо встановленим pkgsrc. У інших illumos розподілах спочатку встановіть **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, а потім ви можете встановити двійковий пакет як нормально:

```bash
pkgin -y встановити nodejs
```

Або побудувати вручну з pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Знімок

[Node.js знімки](https://github.com/nodejs/snap) доступні як [`node`](https://snapcraft.io/node) в магазині знімків.

## Solus

Сол надає Node.js у своєму головному репозиторії.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux кораблі Node.js стабільні в головному репозиторії.

```bash
xbps-install -Sy nodejs
```

## Вікна

Завантажте [Windows Installer](/#home-downloadhead) безпосередньо з веб-сайту [nodejs.org](https://nodejs.org/).

### Альтернативи

Використання **[Winget](https://aka.ms/winget-cli)**:

```bash
winget встановити OpenJS.NodeJS
# або для LTS
встановити встановити OpenJS.NodeJS.LTS
```

Після запуску однієї з двох команд вище, необхідно перезапустити емулятор
терміналу до команди `node` CLI стає доступним.

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# або для повної інсталяції з npm
cinst nodejs.install
```

Using **[Scoop](https://scoop.sh/)**:

```bash
самокат встановити nodejs
# або LTS
самокат встановить nodejs-lts
```

## z/OS

IBM&reg; SDK для Node.js - z/OS&reg; доступний у двох форматах встановлення,
SMP/E і PAX. Виберіть формат встановлення, який вам слід застосувати:

- [Встановлення та налаштування SMP/E видання Node.js на z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-smpe-edition)
- [Встановлення та налаштування PAX видання Node.js на z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
