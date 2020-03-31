---
layout: page.hbs
title: Установка Node.js через пакетный менеджер
---

# Установка Node.js через пакетный менеджер

***Заметка:*** Пакеты, описанные на этой странице, разрабатываются и поддерживаются соответствующими упаковщиками, **а не** командой Node.js. Пожалуйста, сообщайте о любых проблемах, с которыми вы сталкиваетесь с конкретным пакетом. Если выяснится, что ваша проблема ― ошибка в самом Node.js, проблема будет передана выше.

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Дистрибутивы Linux на основе Debian и Ubuntu, пакеты Enterprise Linux/Fedora и Snap](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [NetBSD](#ibm-i)
* [nvm](#netbsd)
* [OpenBSD](#nvm)
* [openSUSE и SLE](#openbsd)
* [macOS](#opensuse-and-sle)
* [SmartOS и illumos](#macos)
* [Solus](#smartos-and-illumos)
* [Void Linux](#solus)
* [Windows](#void-linux)
* [Windows](#windows)

---

## Android

Поддержка Android все еще является экспериментальной в Node.js, поэтому предварительно скомпилированные двоичные файлы еще не предоставлены в открытом доступе.

Однако есть и сторонние решения. Например, сообщество [Termux](https://termux.com/) предоставляет эмулятор терминала и среду Linux для Android, а также собственный менеджер пакетов и [обширную коллекцию](https://github.com/termux/termux-packages) многих предварительно скомпилированных приложений. Эта команда в приложении Termux установит последнюю доступную версию Node.js:

```bash
pkg install nodejs
```

В настоящее время двоичные файлы Termux Node.js связаны с `system-icu` (в зависимости от пакета `libicu`).

## Arch Linux

Пакеты Node.js и npm доступны в репозитории сообщества.

```bash
pacman -S nodejs npm
```

## Дистрибутивы Linux на основе Debian и Ubuntu, пакеты Enterprise Linux/Fedora и Snap

[Официальный Node.js бинарный дистрибутив](https://github.com/nodesource/distributions/blob/master/README.md) предоставляемый NodeSource.

## FreeBSD

Самый последний выпуск Node.js доступен через порт [www/node](https://www.freshports.org/www/node).

Установите бинарный пакет через [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Или скомпилируйте свой используя [порты](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js доступен в дереве портежей.

```bash
emerge nodejs
```

## NetBSD

Node.js доступен в дереве pkgsrc:

Или установите бинарный пакет (если он доступен для вашей платформы) с помощью pkgin:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Node Version Manager ― это bash-скрипт, используемый для управления несколькими выпущенными версиями Node.js. Он позволяет выполнять такие операции, как установка, удаление, переключение версий и т.д.. Чтобы установить nvm, используйте этот [скрипт установки](https://github.com/nvm-sh/nvm#install--update-script).

## nvm

В системах Unix/OS X Node.js, созданный из исходного кода, можно установить с помощью [nvm](https://github.com/creationix/nvm) путем установки в папку по умолчанию nvm:

```bash
pkgin -y install nodejs
```

После этого вы можете использовать `nvm` для переключения между выпущенными версиями и версиями построенных из исходного кода. Например, если версия Node.js v8.0.0-pre:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

## OpenBSD
После выхода официального релиза вы захотите удалить встроенную версию:

Node.js доступен через систему портов.

```bash
nvm use 8
```

Использование [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) в OpenBSD:

```bash
nvm uninstall 8
```

Node.js доступен в основных репозиториях в следующих пакетах:

```bash
/usr/ports/lang/node
```

## openSUSE и SLE

Например, чтобы установить Node.js 4.x в openSUSE Leap 42.2, запустите следующее от имени пользователя root:

```bash
pkg_add node
```

Просто загрузите [установщик macOS](https://nodejs.org/ru/#home-downloadhead) прямо с веб-сайта [nodejs.org](https://nodejs.org/).

```bash
zypper install nodejs4
```

## macOS

Node.js is available in the main repositories under the following packages:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6` ("Модуль Web и Scripting" должен быть [добавлен перед установкой](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

Использование **[Homebrew](https://brew.sh/)**:

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

## SmartOS и illumos

Использование **[MacPorts](https://www.macports.org/)**:

_If you want to download the package with bash:_

```bash
brew install node
```

### Альтернативы

Установка бинарных файлов:

```bash
port install nodejs<major version>

# Пример
port install nodejs7
```

Или сборка с помощью pkgsrc:

```bash
pkgin -y install nodejs
```

Образы SmartOS поставляются с предустановленным pkgsrc. В других дистрибутивах Illumos сначала установите **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, затем вы сможете установить бинарный пакет как обычно:

Или собрать с помощью pkgsrc:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Solus предоставляет Node.js в своем основном репозитории.

```bash
pkgin -y install nodejs
```

## Solus

Void Linux поставляет стабильный файл Node.js в основном репозитории.

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Solus предоставляет Node.js в своем основном репозитории.

```bash
pkgin -y install nodejs
```

## Void Linux

Использование **[Chocolatey](https://chocolatey.org/)**:

```bash
xbps-install -Sy nodejs
```

## Windows

Использование **[Scoop](https://scoop.sh/)**:

```bash
cinst nodejs
# или полная установка с npm
cinst nodejs.install
```

## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### Альтернативы

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
scoop install nodejs
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
