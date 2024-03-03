---
layout: docs.hbs
title: Установка Node.js через менеджер пакетов
---

# Установка Node.js через менеджеры пакетов

> Пакеты на этой странице поддерживаются и поддерживаются соответствующими пакетами, **не** основной командой Node.js. Пожалуйста, сообщите о любых проблемах, с которыми вы столкнулись сопровождающему пакета. Если ваша проблема - это ошибка в самом Node.js, сопровождающий сообщит о проблеме upstream.

***

- [Альпийский Linux](#alpine-linux)
- [Android](#android)
- [Архивный Linux](#arch-linux)
- [CentOS, Fedora and Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [дистрибутивы, основанные на Debian и Ubuntu на базе Linux](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE и SLE](#opensuse-and-sle)
- [SmartOS и освещение](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Бездна Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Альпийский Linux

Пакеты Node.js LTS и npm доступны в главном репозитории.

```bash
apk add nodejs npm
```

Node.js Current может быть установлен из репозитория сообщества.

```bash
apk добавлять узлы
```

## Android

Поддержка Android все еще экспериментальна в Node.js, поэтому предварительно скомпилированные файлы пока не предоставляются разработчиками Node.js.

Однако, есть некоторые сторонние решения. Например, [Termux](https\://termux. om/) сообщество обеспечивает эмулятор терминалов и Linux среды для Android, а также собственный менеджер пакетов и [обширную коллекцию](https\://github. om/termux/termux-packages) многих предварительно скомпилированных приложений. Эта команда в Termux установит последнюю доступную версию Node.js:

```bash
pkg install nodejs
```

В настоящее время исполняемые файлы Termux Node.js связаны с файлами `system-icu` (в зависимости от пакета `libicu`).

## Arch Linux

Пакеты Node.js и npm доступны в репозитории сообщества.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora and Red Hat Enterprise Linux

Node.js доступен в виде модуля `nodejs` в CentOS/RHEL 8 и Fedora.

```bash
dnf module install nodejs:<stream>
```

где `<stream>` соответствует основной версии Node.js.
чтобы увидеть список доступных потоков:

```bash
Список узлов dnf модулей
```

Например, для установки Node.js 18:

```bash
Установка узлов dnf модуля:18/common
```

### Альтернативы

Эти ресурсы предоставляют пакеты, совместимые с CentOS, Fedora и RHEL.

- [Node.js snaps](#snap) поддерживается и поддерживается на https\://github.com/nodejs/snap
- [Node.js бинарные дистрибутивы](#debian-and-ubuntu-based-linux-distributions) поддерживается и поддерживается [NodeSource](https://github.com/nodesource/distributions)

## Debian и Ubuntu дистрибутивы на основе Linux

[Node.js бинарные дистрибутивы](https://github.com/nodesource/distributions) доступны из NodeSource.

### Альтернативы

Пакеты, совместимые с Debian и дистрибутивами на базе Ubuntu Linux, доступны через [Node.js snaps](#snap).

## фн

Быстрый и простой менеджер версий Node.js, встроенный в Rust для управления множеством выпущенных версий Node.js. Она позволяет вам выполнять операции, такие как установка, деинсталляция, переключение версий узлов автоматически на основе текущей директории и т.д.
Для установки fnm, используйте [установить сценарий](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm имеет кросс-платформенную поддержку (macOS, Windows, Linux) и все популярные оболочки (Баш, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm собран с учетом скорости и совместимости файлов `.node-version` и `.nvmrc`.

## FreeBSD

Последняя версия Node.js доступна по адресу [www/node](https://www.freshports.org/www/node).

Установить бинарный пакет через [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
узел установки pkg
```

Или скомпилируйте самостоятельно с помощью [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && сделать установку
```

## Gentoo

Node.js доступен в дереве портежей.

```bash
установить nodejs
```

## IBM i

LTS версии Node.js доступны из IBM и доступны через [менеджер пакетов](https://ibm.biz/ibmi-rpms). Имя пакета — это `nodejs`, за которым следует основной номер версии (например, `nodejs18`, `nodejs20` и т.д.

Чтобы установить Node.js 20.x из командной строки, запустите пользователя с \*ALLOBJ специальным авторитетом:

```bash
yum install nodejs20
```

Также Node.js может быть установлен с продуктом IBM i Access Client Solutions. См. [этот документ поддержки](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)

## macOS

Скачайте [macOS Installer](/#home-downloadhead) прямо с сайта [nodejs.org](https://nodejs.org/).

_Если вы хотите скачать пакет с bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest. kg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Альтернативы

Используя **[Homebrew](https://brew.sh/)**:

```bash
создать узел установки
```

Используя **[MacPorts](https://www.macports.org/)**:

```bash
порт установки узлов<major version>

# Пример
установки nodejs7
```

Используя **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Установите бинарный пакет:

```bash
pkgin -y установить узлы
```

Или создать вручную из pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## п

`n` — простой в использовании менеджер версий Node.js для Mac и Linux. Укажите целевую версию для установки с помощью rich syntax,
или выберите из меню ранее загруженных версий. Версии установлены в масштабах всей системы или в масштабе пользователя, и для большего использования
вы можете запускать версию непосредственно из кэшированных загрузок.

Смотрите [homepage](https://github.com/tj/n) для методов установки (bootstrap, npm, Homebrew, third-party) и все детали использования.

Если у вас уже есть `npm`, то установка `n` и затем новейшая версия LTS `node` проста как:

```
npm install -g n
n lts
```

## NetBSD

Node.js доступен в дереве pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && сделать установку
```

Или установите бинарный пакет (если он доступен для вашей платформы) с помощью pkgin:

```bash
pkgin -y установить узлы
```

## Nodenv

`nodenv` — это легкий менеджер версий узлов, похожий на `nvm`. Это простая и предсказуемая. Богатая экосистема позволяет вам адаптировать ее под ваши нужды. Используйте `nodenv` чтобы выбрать версию узла для вашего приложения и гарантировать, что ваша среда разработки совпадает с производством.

Инструкции по установке Nodenv [на его странице Github](https://github.com/nodenv/nodenv#installation). Пожалуйста, посетите эту страницу, чтобы убедиться, что вы выполнили последние шаги по установке.

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

На Unix / OS X системах Node.js, собранных из исходного кода, можно установить с помощью
[nvm](https://github.com/creationix/nvm), установив в местоположение, которое ожидается nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

После этого вы можете использовать `nvm` для переключения между выпущенными версиями и
собранными из исходного кода.
Например, если версия Node.js v8.0.0-pre:

```bash
nvm использование 8
```

Как только официальный релиз закончится, вы захотите удалить версию собранную
из исходного кода:

```bash
nvm удаление 8
```

## nvs

#### Окна

Менеджер версий `nvs` является кросс-платформенным и может быть использован в Windows, macOS и Unix-подобных системах

Чтобы установить `nvs` в Windows, перейдите на [страницу выпуска](https://github.com/jasongin/nvs/releases) здесь и загрузите установочный файл MSI последней версии.

Вы также можете использовать `шоколад` для установки:

```bash
choco install nvs
```

#### macOS,UnixLike

Документация о шагах установки `nvs` находится в macOS/Unix-подобных системах [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Использование

После этого вы можете использовать `nvs` для переключения между различными версиями узла.

Чтобы добавить последнюю версию узла:

```bash
nvs добавить последние
```

Или добавить последнюю версию узла LTS:

```bash
nvs добавлять lts
```

Затем выполните команду `nvs use`, чтобы добавить версию узла в ваш `PATH` для текущей оболочки:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Чтобы добавить его в `PATH` постоянно, используйте `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js доступен через систему портов.

```bash
/usr/ports/lang/node
```

С помощью [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) на OpenBSD:

```bash
пкг_добавить узел
```

## openSUSE и SLE

Node.js доступен в основных репозиториях в следующих пакетах:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, и `nodejs14`
  (The "Web and Scripting Module" должен быть [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, и `nodejs14`
  (The "Web and Scripting Module" должен быть [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Например, для установки Node.js 14.x на openSUSE Leap 15.2, запустите как root:

```bash
zypper установить узлы 14
```

Различные основные версии узла могут быть установлены и использованы одновременно.

## SmartOS и иллюстрации

Образы SmartOS поставляются с предустановленными pkgsrc. Сначала установите **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, затем вы можете установить бинарный пакет как обычный:

```bash
pkgin -y установить узлы
```

Или создать вручную из pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Привязка

[Node.js snaps](https://github.com/nodejs/snap) доступны как [`node`](https://snapcraft.io/node) в магазине Snap.

## Solus

Solus предоставляет Node.js в основном репозитории.

```bash
sudo eopkg install nodejs
```

## Void Linux

В главном репозитории остаётся стабильная версия Node.js.

```bash
xbps-install -Sy nodejs
```

## Окна

Скачайте [Windows Installer](/#home-downloadhead) прямо с веб-сайта [nodejs.org](https://nodejs.org/).

### Альтернативы

Используя **[Winget](https://aka.ms/winget-cli)**:

```bash
winget установите OpenJS.NodeJS
# или для LTS
установить OpenJS.NodeJS.LTS
```

После выполнения одной из двух команд выше может потребоваться перезапустить эмулятор терминала
перед тем, как команда `node` CLI станет доступной.

Используя **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# или для полной установки с npm
cinst nodejs.install
```

Используя **[Scoop](https://scoop.sh/)**:

```bash
scoop установить nodejs
# или для LTS
установить nodejs-lts
```

## z/OS

IBM&reg; SDK для Node.js - z/OS&reg; доступен в двух установочных форматах,
SMP/E и PAX. Выберите формат установки, применимый к вам:

- [Установка и настройка SMP/E версии Node.js в z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Установка и настройка PAX версии Node.js в z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
