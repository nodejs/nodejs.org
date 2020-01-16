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
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [OpenBSD](#openbsd)
* [openSUSE и SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS и illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows)

---

## Android

Поддержка Android все еще является экспериментальной в Node.js, поэтому предварительно скомпилированные
двоичные файлы еще не предоставлены в открытом доступе.

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

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Или установите бинарный пакет (если он доступен для вашей платформы) с помощью pkgin:

```bash
pkgin -y install nodejs
```

## nvm
Node Version Manager ― это bash-скрипт, используемый для управления несколькими выпущенными версиями Node.js. Он позволяет
выполнять такие операции, как установка, удаление, переключение версий и т.д..
Чтобы установить nvm, используйте этот [скрипт установки](https://github.com/nvm-sh/nvm#install--update-script).

В системах Unix/OS X Node.js, созданный из исходного кода, можно установить с помощью
[nvm](https://github.com/creationix/nvm) путем установки в папку по умолчанию nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

После этого вы можете использовать `nvm` для переключения между выпущенными версиями и версиями
построенных из исходного кода.
Например, если версия Node.js v8.0.0-pre:

```bash
nvm use 8
```

После выхода официального релиза вы захотите удалить встроенную версию:

```bash
nvm uninstall 8
```

## OpenBSD

Node.js доступен через систему портов.

```bash
/usr/ports/lang/node
```

Использование [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) в OpenBSD:

```bash
pkg_add node
```

## openSUSE и SLE

Node.js доступен в основных репозиториях в следующих пакетах:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6`
  ("Модуль Web и Scripting" должен быть [добавлен перед установкой](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

Например, чтобы установить Node.js 4.x в openSUSE Leap 42.2, запустите следующее от имени пользователя root:

```bash
zypper install nodejs4
```

## macOS

Просто загрузите [установщик macOS](https://nodejs.org/ru/#home-downloadhead) прямо с веб-сайта [nodejs.org](https://nodejs.org/).

_Если вы хотите скачать пакет с bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Альтернативы

Использование **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Использование **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Пример
port install nodejs7
```

Использование **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Установка бинарных файлов:

```bash
pkgin -y install nodejs
```

Или сборка с помощью pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS и illumos

Образы SmartOS поставляются с предустановленным pkgsrc. В других дистрибутивах Illumos сначала установите **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, затем вы сможете установить бинарный пакет как обычно:

```bash
pkgin -y install nodejs
```

Или собрать с помощью pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

Solus предоставляет Node.js в своем основном репозитории.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux поставляет стабильный файл Node.js в основном репозитории.

```bash
xbps-install -Sy nodejs
```

## Windows

Просто загрузите [Установщик Windows](https://nodejs.org/ru/#home-downloadhead) прямо с веб-сайта [nodejs.org](https://nodejs.org/).

### Альтернативы

Использование **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# или полная установка с npm
cinst nodejs.install
```

Использование **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
