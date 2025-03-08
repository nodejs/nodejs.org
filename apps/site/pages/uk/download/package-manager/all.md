---
layout: article
title: Установка Node.js через менеджер пакетів
---

# Установка Node.js через менеджери пакетів

> Пакети на цій сторінці супроводжуються та підтримуються їхніми відповідними розробниками, **не** командою Node.js. Будь ласка, повідомляйте про проблеми цих пакетів їхнім розробникам. Якщо виявиться, що проблема є помилкою Node.js, то вони повідомлять нас про неї.

## Alpine Linux

Node.js LTS та пакети npm доступні в головному репозиторії.

```bash
apk add nodejs npm
```

Node.js Current можна встановити через репозиторій спільноти.

```bash
apk add nodejs-current
```

## Android

Підтримка Android досі є експериментальною в Node.js, тому попередньо скомпільовані бінарні файли ще не надаються розробниками Node.js.

Однак, є сторонні рішення. Наприклад, спільнота [Termux](https://termux.com/) надає емулятор термінала та середовище Linux для Android, а також власний менеджер пакетів та [великий набір](https://github.com/termux/termux-packages) попередньо скомпільованих застосунків. Ця команда в застосунку Termux установить останню доступну версію Node.js:

```bash
pkg install nodejs
```

Наразі бінарні файли Termux Node.js компонуються із `system-icu` (залежно від пакета `libicu`).

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

де `<stream>` — основна версія Node.js.
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

- [Snaps Node.js](#snap) супроводжуються та підтримуються на https://github.com/nodejs/snap
- [Бінарні дистрибутиви Node.js](#debian-and-ubuntu-based-linux-distributions) супроводжуються та підтримуються [NodeSource](https://github.com/nodesource/distributions)

## Дистрибутиви Linux на базі Debian та Ubuntu

[Бінарні дистрибутиви Node.js](https://github.com/nodesource/distributions) доступні на NodeSource.

### Альтернативи

Пакети, сумісні з дистрибутивами Linux на базі Debian та Ubuntu, доступні на [snaps Node.js](#snap).

## Exherbo Linux

Node.js і пакети npm доступні в [репозиторії arbor](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node).

```bash
cave resolve -x node
```

## fnm

Швидкий і простий менеджер версій Node.js, створений на Rust, використовується для керування багатьма випущеними версіями Node.js. Він дозволяє виконувати такі операції, як установка, видалення, автоматична зміна версій Node залежно від поточної директорії тощо.
Щоб установити fnm, використайте [цей скрипт](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm кросплатформний (macOS, Windows, Linux) та підтримує всі популярні оболонки (Bash, Zsh, Fish, PowerShell, командний рядок Windows).
fnm створено з думкою про швидкість та підтримку сумісності для файлів `.node-version` та `.nvmrc`.

## FreeBSD

Останній реліз Node.js доступний через порт [www/node](https://www.freshports.org/www/node).

Установіть бінарний пакет через [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Або скомпілюйте його самостійно через [порти](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js доступний у дереві portage.

```bash
emerge nodejs
```

## IBM i

LTS-версії Node.js доступні від IBM через [менеджер пакетів 'yum'](https://ibm.biz/ibmi-rpms). Назва пакета: `nodejs`, після нього номер основної версії (наприклад, `nodejs18`, `nodejs20` тощо)

Щоб установити Node.js 20.x з командного рядка, запустіть наступну команду як користувач зі спеціальними повноваженнями \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js також можна встановити за допомогою продукту «IBM i Access Client Solutions». Перегляньте [цей документ](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619), щоб дізнатися більше

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

Установіть бінарний пакет:

```bash
pkgin -y install nodejs
```

Або зберіть уручну з pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` — простий у використанні менеджер версій Node.js для платформ Mac і Linux. Укажіть цільову версію для встановлення за допомогою розширеного синтаксису або оберіть у меню раніше завантажених версій. Версії встановлюються на рівні системи чи користувача, а для більш цільового використання можна запускати її безпосередньо з кешованих завантажень.

Відвідайте [головну сторінку](https://github.com/tj/n), щоб дізнатися методи установки (bootstrap, npm, Homebrew, сторонні) та деталі використання.

Якщо у вас уже є `npm`, то установка `n` та найновішої LTS-версії `node` дуже проста:

```
npm install -g n
n lts
```

## NetBSD

Node.js доступний у дереві pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Або встановіть бінарний пакет (якщо доступний для вашої платформи) через pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` — легковаговий менеджер версій Node, подібний до `nvm`. Простий та інтуїтивний у використанні. Широка екосистема плагінів дозволяє налаштувати його відповідно до ваших потреб. Використовуйте `nodenv`, щоб обрати версію Node для вашої програми та переконатися, що ваше середовище розробки відповідає клієнтському середовищу.

Інструкції зі встановлення Nodenv є [на його сторінці Github](https://github.com/nodenv/nodenv#installation). Будь ласка, відвідайте її, щоб використовувати останню версію кроків установки.

## nvm

Node Version Manager — це bash-скрипт, що використовується для керування різними випущеними версіями Node.js. Він дозволяє виконувати наступні операції: установка, видалення, зміна версії тощо. Щоб установити nvm, використайте [цей скрипт](https://github.com/nvm-sh/nvm#install--update-script).

На системах Unix / OS X Node.js, зібраний із вихідного коду, можна встановити за допомогою [nvm](https://github.com/creationix/nvm), установивши в директорію, яку вимагає nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Після цього ви можете використовувати `nvm`, щоб перемикатися між релізовими версіями та версіями, зібраними з вихідного коду.
Для прикладу, якщо версія Node.js — v8.0.0-pre:

```bash
nvm use 8
```

Коли вийде офіційний реліз, ви можете видалити версію, зібрану з вихідного коду:

```bash
nvm uninstall 8
```

## nvs

#### Windows

Менеджер версій `nvs` кросплатформний та може використовуватися на Windows, macOS та системах типу Unix

Щоб установити `nvs` на Windows, перейдіть на [сторінку релізів](https://github.com/jasongin/nvs/releases) і завантажте MSI-інсталятор останнього релізу.

Ви також можете використати `chocolatey` для установки:

```bash
choco install nvs
```

#### macOS, системи типу Unix

Ви можете знайти документацію щодо кроків інсталяції `nvs` на macOS та системах типу Unix [тут](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Використання

Після цього ви можете використовувати `nvs`, щоб перемикатися між різними версіями Node.

Щоб додати її останню версію:

```bash
nvs add latest
```

Чи додати її останню LTS-версію:

```bash
nvs add lts
```

Тоді запустіть команду `nvs use`, щоб додати версію Node до своєї `PATH` для поточної оболонки:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Щоб додати її до `PATH` назавжди, використайте `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js доступний через систему портів.

```bash
/usr/ports/lang/node
```

Через [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) на OpenBSD:

```bash
pkg_add node
```

## openSUSE та SLE

Node.js доступний у головних репозиторіях у наступних пакетах:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Модуль «Web and Scripting Module» має бути [ввімкнений](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Модуль «Web and Scripting Module» має бути [ввімкнений](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Для прикладу, щоб встановити Node.js 14.x на openSUSE Leap 15.2, запустіть наступну команду в корені:

```bash
zypper install nodejs14
```

Можна встановити та використовувати різні основні версії Node одночасно.

## SmartOS та illumos

Образи SmartOS мають уже інстальований pkgsrc. Для інших дистрибутивів illumos спершу встановіть **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, тоді ви зможете встановити бінарний пакет звичайним чином:

```bash
pkgin -y install nodejs
```

Або зберіть уручну з pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Snaps Node.js](https://github.com/nodejs/snap) доступні як [`node`](https://snapcraft.io/node) у крамниці Snap.

## Solus

Solus надає Node.js у своєму головному репозиторії.

```bash
sudo eopkg install nodejs
```

## vfox

Кросплатформний (Windows, macOS, Linux) і **розширюваний** менеджер версій.

Підтримує **різні версії для різних проєктів**, **різні версії для різних оболонок**, а також дає можливість перемикати версії Node автоматично на основі поточної директорії тощо.

Підтримує всі популярні оболонки (Bash, Zsh, Fish, PowerShell, Clink, Cmder).

Перегляньте [швидкий старт](https://vfox.lhan.me/guides/quick-start.html), щоб почати використовувати vfox та дізнатися всі деталі його використання.

## Void Linux

Void Linux надає стабільний Node.js в основному репозиторії.

```bash
xbps-install -Sy nodejs
```

## Windows

Завантажте [інсталятор Windows](/#home-downloadhead) безпосередньо з вебсайту [nodejs.org](https://nodejs.org/).

### Альтернативи

Через **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Після запуску однієї з двох команд вище, можливо, необхідно буде перезапустити емулятор термінала, перш ніж CLI-команда `node` стане доступною.

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

IBM&reg; SDK для Node.js — z/OS&reg; доступний у двох інсталяційних форматах:
SMP/E та PAX. Оберіть підхожий вам формат:

- [Установка та налаштування Node.js із SMP/E на z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Установка та налаштування Node.js із PAX на z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
