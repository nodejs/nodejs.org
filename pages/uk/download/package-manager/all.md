---
layout: docs
title: Установка Node.js через менеджер пакетів
---

# Установка Node.js через менеджер пакетів

> Пакети на цій сторінці підтримуються та підтримуються їх відповідними пакетами, \*\*не є основною командою Node.js. Будь ласка, повідомте про будь-які проблеми, що виникли з технічним обслуговуванням пакету. Якщо виявиться, що ваша проблема — це помилка в самому Node.js, супроводжуючий користувач буде повідомляти про проблему з upstream.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora та Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Дистрибутиви Linux, які базуються на Debian та Ubuntu](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE та SLE](#opensuse-and-sle)
- [SmartOS та illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js ДПС (LTS) та пакети npm доступні в головному репозиторії.

```bash
apk add nodejs npm
```

Node.js поточний може бути встановлений з репозиторію спільноти.

```bash
apk add nodejs-current
```

## Android

Підтримка Android досі є експериментальною в Node.js, тому попередньо скомпільовані бінарні файли ще не надаються розробниками Node.js.

Однак, є сторонні рішення. Наприклад, спільнота [Termux](https://termux.com/) надає емулятор термінала та середовище Linux для Android, а також власний менеджер пакетів та [великий набір](https://github.com/termux/termux-packages) багатьох попередньо скомпільованих застосунків. Ця команда в застосунку Termux установить останню доступну версію Node.js:

```bash
pkg install nodejs
```

В даний час двійкові файли Node.js пов'язані з `system-icu` (в залежності від пакета `libicu`).

## Arch Linux

Node.js та пакети npm доступні в репозиторії спільноти.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora та Red Hat Enterprise Linux

Node.js доступний як модуль із назвою `nodejs` у CentOS/RHEL 8 та Fedora.

```bash
dnf module install nodejs:<stream>
```

де `<stream>` відповідає основній версії Node.js.
Щоб побачити список доступних потоків:

```bash
dnf module list nodejs
```

Наприклад, щоб установити Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Альтернативи

Ці ресурси надають пакети, які сумісні з CentOS, Fedora та RHEL.

- [Node.js знімки](#snap) підтримується та підтримується в https\://github.com/nodejs/snap
- [Дистрибутиви бінарних файлів Node.js](#debian-and-ubuntu-based-linux-distributions) підтримуються та підтримуються [NodeSource](https://github.com/nodesource/distributions)

## Дистрибутиви Linux, які базуються на Debian та Ubuntu

[Двійкові розподіли Node.js](https://github.com/nodesource/distributions) доступні з NodeSource.

### Альтернативи

Пакети, сумісні з Debian та Ubuntu на основі Linux розділів доступні через [Node.js snaps](#snap).

## fnm

Швидкий і простий менеджер версій Node.js, створений на Rust, використовується для керування багатьох випущених версій Node.js. Він дозволяє виконувати такі операції, як установка, видалення, автоматична зміна версій Node залежно від поточної директорії тощо.
Щоб установити fnm, [перейдіть сюди](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm має крос-платформну підтримку (macOS, Windows, Linux) і всі популярні оболонки (Bash, Zsh, Fish, PowerShell, командний рядок Windows).
fnm побудований зі швидкістю мозку і сумісністю для файлів `.node-version` і `.nvmrc`.

## FreeBSD

Останній випуск Node.js доступний на порті [www/node](https://www.freshports.org/www/node).

Встановіть двійковий пакет через [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Або компілюйте їх самостійно за допомогою [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js доступний в портатному дереві.

```bash
emerge nodejs
```

## IBM i

LTS версії Node.js доступні з IBM, і доступні через [yum' менеджера пакетів](https://ibm.biz/ibmi-rpms). Пакетна назва є `nodejs`, за яким йде основний номер версії (наприклад, `nodejs18`, `nodejs20` тощо)

Щоб встановити Node.js 20.x з командного рядка, запустіть наступне як користувач з спеціальними органами \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js також може бути встановлений за допомогою продуктів IBM для доступу до клієнтських солей. Див. [цей документ підтримки](http://www-01.ibm.com/support/docview.ws?uid=nas8N1022619) для деталей

## macOS

Завантажте [інсталятор macOS](/#home-downloadhead) безпосередньо з вебсайту [nodejs.org](https://nodejs.org/).

_Якщо ви бажаєте завантажити пакет через bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Альтернативи

Через **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Через **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Через **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Встановіть двійковий пакет:

```bash
pkgin -y install nodejs
```

Або побудувати вручну з pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` - простий у використанні менеджер версій Node.js для Mac і Linux. Вкажіть цільову версію для встановлення за допомогою багатофункціонального синтаксису, або виберіть з меню раніше завантажених версій. Версії встановлюються системно або для користувача, і для більш точного використання ви можете запустити версію безпосередньо з кешованих завантажень.

Дивіться [homepage](https://github.com/tj/n) для встановлення методів (bootstrap, npm, Homebrew, третьої сторони), і всі деталі використання.

Якщо у вас вже є `npm`, то встановіть `n` а потім найновіша версія `node` є такою ж простою:

```
npm install -g n
n lts
```

## NetBSD

Node.js доступний в дереві pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Або встановити бінарний пакет (якщо він доступний для вашої платформи) за допомогою pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` є легкою версією диспетчера вузлів, подібно до `nvm`. Це просто і передбачуване. Багата екосистема дозволяє адаптувати її до ваших потреб. Використовуйте `nodenv`, щоб вибрати версію вузла для вашої програми і гарантувати, що середовище розробки відповідає виробництву.

Інструкції для установки вузла підтримуються [на своїй сторінці Github (https\://github.com/nodenv/nodenv#installation). Будь ласка, відвідайте цю сторінку, щоб переконатися, що ви дотримуєтесь останньої версії кроків встановлення.

## nvm

Менеджер версій Node - це сценарій bash, який використовується для управління багатьма випущеними версіями Node.js. Він дозволяє виконувати операції, такі як встановлення, видалення, зміна версії тощо. Для установки nvm використовуйте цей [сценарій встановлення](https://github.com/nvm-sh/nvm#install--update-script).

На системах Unix / OS X Node.js, зібраний з вихідних текстів, можна встановити, використовуючи [nvm](https://github.com/creationix/nvm), встановивши в те місце, яке очікує nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Після цього ви можете використовувати `nvm` для перемикання між випущеними версіями та версіями, зібраними з вихідних текстів. Наприклад, якщо версія Node.js - v8.0.0-pre:

```bash
nvm use 8
```

Після того, як буде офіційний реліз, ви захочете деінсталювати версію, зібрану з вихідних текстів:

```bash
nvm uninstall 8
```

## nvs

#### Windows

Менеджер версій `nvs` користується крос-платформою і може бути використаний на Windows, macOS та в схожих на Unix-системи

Щоб встановити `nvs` на Windows, перейдіть на [сторінку релізу](https://github.com/jasongin/nvs/releases) і завантажте файл інсталятора MSI останнього релізу.

Ви також можете використати `chocolatey` для встановлення:

```bash
choco install nvs
```

#### macOS,UnixLike

Документацію щодо кроків установки `nvs` в macOS/подібних до Unix-систем можна знайти [тут](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Використання

Після цього ви зможете використовувати `nvs` для перемикання між різними версіями вузла.

Щоб додати останню версію вузла:

```bash
nvs add latest
```

Або додати останню версію LTS вузла:

```bash
nvs add lts
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

Використання [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) на OpenBSD:

```bash
pkg_add node
```

## openSUSE та SLE

Node.js доступний в основних репозиторіях під такими пакетами:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12` та `nodejs14` (Модуль "Web and Scripting Module" повинен бути [увімкнений](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Значення "Web and Scripting Module" має бути [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Наприклад, для встановлення Node.js 14.x на openSUSE позиціонування 15.2 запустіть наступне як root:

```bash
zypper install nodejs14
```

Різні основні версії вузла можуть бути встановлені та використані в даний час.

## SmartOS та illumos

SmartOS зображення надходять з попередньо встановленим pkgsrc. У інших illumos розподілах спочатку встановіть **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, а потім ви можете встановити двійковий пакет як нормально:

```bash
pkgin -y install nodejs
```

Або побудувати вручну з pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

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

## Windows

Завантажте [Windows Installer](/#home-downloadhead) безпосередньо з веб-сайту [nodejs.org](https://nodejs.org/).

### Альтернативи

Використання **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Після запуску однієї з двох команд вище, необхідно перезапустити емулятор
терміналу до команди `node` CLI стає доступним.

Через **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Через **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK для Node.js - z/OS&reg; доступний у двох форматах встановлення,
SMP/E і PAX. Виберіть формат встановлення, який вам слід застосувати:

- [Встановлення та налаштування SMP/E видання Node.js на z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-smpe-edition)
- [Встановлення та налаштування PAX видання Node.js на z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
