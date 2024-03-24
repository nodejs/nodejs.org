---
layout: docs
title: Installing Node.js via package manager
---

# Node.js mit Paketmanagern installieren

> Die Pakete auf dieser Seite werden von ihren jeweiligen Paketbetreuern nicht vom Node.js-Kernteam gepflegt und unterstützt. Bitte melden Sie alle Probleme, die Ihnen begegnen, dem Paketbetreuer. Wenn sich herausstellt, dass es sich um einen Fehler in Node.js selbst handelt, wird der Betreuer das Problem an die Entwickler weitermelden.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora und Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian und Ubuntu basierende Linux Distributionen](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE und SLE](#opensuse-and-sle)
- [SmartOS und illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js LTS- und npm-Pakete sind im Haupt-Repository verfügbar.

```bash
apk add nodejs npm
```

Node.js Current kann aus dem Community Repository installiert werden.

```bash
apk add nodejs-current
```

## Android

Die Unterstützung von Android ist in Node.js noch experimentell, daher werden noch keine vorkompilierten Binaries von den Node.js-Entwicklern bereitgestellt.

Es gibt jedoch einige Drittanbieter-Lösungen. Zum Beispiel bietet die [Termux](https://termux.com/)-Community einen Terminal-Emulator und eine Linux-Umgebung für Android an, sowie einen eigenen Paketmanager als auch eine [umfangreiche Sammlung](https://github.com/termux/termux-packages) von vielen vorkompilierten Anwendungen. Folgender Befehl in der Termux-App installiert die neueste verfügbare Node.js-Version:

```bash
pkg install nodejs
```

Derzeit sind die Termux Node.js Binaries gegen `system-icu` verlinkt (abhängig vom `libicu`-Paket).

## Arch Linux

Node.js und npm Pakete sind in der Community Repository verfügbar.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora und Red Hat Enterprise Linux

Node.js ist als Modul namens `nodejs` in CentOS/RHEL 8 und Fedora verfügbar.

```bash
dnf module install nodejs:<stream>
```

wobei `<stream>` der Hauptversion von Node.js entspricht.
So zeigen Sie eine Liste der verfügbaren Streams an:

```bash
dnf module list nodejs
```

Um beispielsweise Node.js 18 zu installieren:

```bash
dnf module install nodejs:18/common
```

### Alternativen

Folgende Ressourcen stellen Pakete bereit, die mit CentOS, Fedora und RHEL kompatibel sind.

- [Node.js snaps](#snap) werden unter https\://github.com/nodejs/snap gewartet und unterstützt
- [Vorkompilierte Binärpakete von Node.js](#debian-and-ubuntu-based-linux-distributions) werden von [NodeSource](https://github.com/nodesource/distributions) gewartet und unterstützt

## Debian und Ubuntu basierende Linux Distributionen

[Vorkompilierte Binärpakete von Node.js](https://github.com/nodesource/distributions) sind bei NodeSource verfügbar.

### Alternativen

Pakete, die mit Debian und Ubuntu basierten Linux Distributionen kompatibel sind, sind über [Node.js snaps](#snap) verfügbar.

## fnm

Ein schneller und einfacher Node.js Versionsmanager, entwickelt in Rust. Er dient der Verwaltung mehrerer installierter Node.js-Versionen. Du kannst damit Node-Versionen installieren, deinstallieren, und basierend auf dem aktuellen Verzeichnis automatisch zwischen Versionen wechseln, etc.
Zur Installation von fnm nutze dieses [Installationsskript](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm bietet plattformübergreifende Unterstützung (macOS, Windows, Linux) und funktioniert mit allen gängigen Shells (Bash, Zsh, Fish, PowerShell, Windows-Eingabeaufforderung).
fnm wurde mit Fokus auf Geschwindigkeit entwickelt und bietet Kompatibilität mit `.node-version` und `.nvmrc` Dateien.

## FreeBSD

Die aktuellste Version von Node.js ist über den [www/node-Port](https://www.freshports.org/www/node) verfügbar.

Binaries mit [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) installieren:

```bash
pkg install node
```

Oder kompiliere es selber mit [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js ist im Portage-Tree verfügbar.

```bash
emerge nodejs
```

## IBM i

Langzeitunterstützte Versionen (LTS) von Node.js werden von IBM angeboten und können über den Paketmanager 'yum' bezogen werden. Der Paketname lautet nodejs gefolgt von der Hauptversionsnummer (zum Beispiel nodejs18, nodejs20 usw.)

Um Node.js 20.x von der Kommandozeile zu installieren, führe den folgenden Befehl als Benutzer mit der Sonderberechtigung \*ALLOBJ aus:

```bash
yum install nodejs20
```

Node.js kann auch mit IBM i Access Client Solutions installiert werden. Weitere Einzelheiten findest du in dem [Support-Dokument](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)

## macOS

Lade das [macOS-Installationsprogramm](/#home-downloadhead) direkt von der [nodejs.org-Webseite](https://nodejs.org/) herunter.

_Wenn Sie das Paket mit Bash herunterladen möchten:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativen

Mit **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Mit **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Mit **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Binary installieren:

```bash
pkgin -y install nodejs
```

Oder manuell aus pkgsrc kompilieren:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` ist ein benutzerfreundlicher Node.js Versionsmanager für Mac und Linux. Du kannst die Zielversion für die Installation mit einer vielfältigen Syntax angeben oder über ein Menü eine zuvor heruntergeladene Version auswählen. Die Versionen werden system- oder benutzerweit installiert. Für eine gezieltere Verwendung kannst du eine Version auch direkt aus den zwischengespeicherten Downloads heraus ausführen.

Für Installationsmethoden (Bootstrap, npm, Homebrew, Drittanbieter) und alle Nutzungsdetails besuche die [Homepage](https://github.com/tj/n) von `n`.

Falls du bereits `npm` installiert hast, kannst du `n` und anschließend die neueste LTS-Version von `node` ganz einfach wie folgt installieren:

```
npm install -g n
n lts
```

## NetBSD

Node.js ist im pkgsrc-Tree verfügbar:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Installiere alternativ ein Binärpaket (falls verfügbar für deine Plattform) mit pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` is a lightweight node version manager, similar to `nvm`. It's simple and predictable. A rich plugin ecosystem lets you tailor it to suit your needs. Use `nodenv` to pick a Node version for your application and guarantee that your development environment matches production.

Nodenv installation instructions are maintained [on its Github page](https://github.com/nodenv/nodenv#installation). Please visit that page to ensure you're following the latest version of the installation steps.

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

On Unix / OS X systems Node.js built from source can be installed using
[nvm](https://github.com/creationix/nvm) by installing into the location that nvm expects:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

After this you can use `nvm` to switch between released versions and versions
built from source.
For example, if the version of Node.js is v8.0.0-pre:

```bash
nvm use 8
```

Once the official release is out you will want to uninstall the version built
from source:

```bash
nvm uninstall 8
```

## nvs

#### Windows

The `nvs` version manager is cross-platform and can be used on Windows, macOS, and Unix-like systems

To install `nvs` on Windows go to the [release page](https://github.com/jasongin/nvs/releases) here and download the MSI installer file of the latest release.

You can also use `chocolatey` to install it:

```bash
choco install nvs
```

#### macOS,UnixLike

You can find the documentation regarding the installation steps of `nvs` in macOS/Unix-like systems [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Usage

After this you can use `nvs` to switch between different versions of node.

To add the latest version of node:

```bash
nvs add latest
```

Or to add the latest LTS version of node:

```bash
nvs add lts
```

Then run the `nvs use` command to add a version of node to your `PATH` for the current shell:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

To add it to `PATH` permanently, use `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js is available through the ports system.

```bash
/usr/ports/lang/node
```

Mit [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) unter OpenBSD:

```bash
pkg_add node
```

## openSUSE und SLE

Node.js ist in den Haupt-Repositories unter den folgenden Paketen verfügbar:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Das "Web and Scripting Module" muss [aktiviert](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated) sein.)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Das "Web and Scripting Module" muss [aktiviert](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module) sein.)

Um beispielsweise Node.js 14.x unter openSUSE Leap 15.2 zu installieren, muss folgender Befehl als `root` ausgeführt werden:

```bash
zypper install nodejs14
```

Verschiedene Hauptversionen von Node können parallel installiert und genutzt werden.

## SmartOS und illumos

SmartOS images come with pkgsrc pre-installed. On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal:

```bash
pkgin -y install nodejs
```

Oder manuell aus pkgsrc kompilieren:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) are available as [`node`](https://snapcraft.io/node) on the Snap store.

## Solus

Solus beinhaltet Node.js im Haupt-Repository.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux beinhaltet Node.js stable im Haupt-Repository.

```bash
xbps-install -Sy nodejs
```

## Windows

Lade das [Windows-Installationsprogramm](/#home-downloadhead) direkt von der [nodejs.org-Webseite](https://nodejs.org/) herunter.

### Alternativen

Using **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

After running one of the two commands above, it may be necessary to restart the
terminal emulator before the `node` CLI command becomes available.

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; is available in two installation formats,
SMP/E and PAX. Select the installation format that applies to you:

- [Installing and configuring SMP/E edition of Node.js on z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Installing and configuring PAX edition of Node.js on z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
