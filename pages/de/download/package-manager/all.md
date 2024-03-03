---
layout: docs.hbs
title: Installiere Node.js über den Paketmanager
---

# Installiere Node.js über Paketmanager

> Die Pakete auf dieser Seite werden von ihren jeweiligen Paketdienstleistern, **nicht** dem Node.js Kern-Team betreut und unterstützt. Bitte melden Sie dem Paketbetreuer alle aufgetretenen Probleme. Sollte sich herausstellen, dass Ihr Problem ein Fehler in Node.js ist, wird der Betreuer das Problem im Quelltext melden.

***

- [Alpines Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora und Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian und Ubuntu basierte Linux-Distributionen](#debian-and-ubuntu-based-linux-distributions)
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
- [Linux](#void-linux) löschen
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Alpine Linux

Node.js LTS und npm Pakete sind im Hauptarchiv verfügbar.

```bash
apk add nodejs npm
```

Node.js Aktuelle kann aus dem Community Repository installiert werden.

```bash
apk add nodejs-current
```

## Android

Die Android-Unterstützung ist in Node.js noch experimentell, so dass vorkompilierte Binärdateien noch nicht von Node.js Entwicklern bereitgestellt werden.

Es gibt jedoch einige Lösungen von Drittanbietern. Zum Beispiel [Termux](https\://termux. om/) Community bietet Terminal-Emulator und Linux-Umgebung für Android sowie eigenen Paketmanager und [extensive collection](https\://github. om/termux/termux-Pakete) vieler vorkompilierter Anwendungen. Dieser Befehl in der Termux-App wird die letzte verfügbare Node.js-Version installieren:

```bash
pkg install nodejs
```

Zurzeit sind Termux Node.js Binärdateien gegen `system-icu` (abhängig vom `libicu` Paket) verknüpft.

## Bogen Linux

Node.js und npm Pakete sind im Community Repository verfügbar.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora und Red Hat Enterprise Linux

Node.js ist als Modul namens `nodejs` in CentOS/RHEL 8 und Fedora verfügbar.

```bash
dnf module install nodejs:<stream>
```

wo `<stream>` der Hauptversion von Node.js entspricht.
Um eine Liste der verfügbaren Streams zu sehen:

```bash
dnf Modul Liste nodejs
```

Zum Beispiel, um Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternativen

Diese Ressourcen bieten Pakete an, die mit CentOS, Fedora und RHEL kompatibel sind.

- [Node.js snaps](#snap) gepflegt und unterstützt unter https\://github.com/nodejs/snap
- [Node.js Binärdistributionen](#debian-and-ubuntu-based-linux-distributions) gepflegt und unterstützt von [NodeSource](https://github.com/nodesource/distributions)

## Debian und Ubuntu basierte Linux-Distributionen

[Node.js Binärdistributionen](https://github.com/nodesource/distributions) sind bei NodeSource verfügbar.

### Alternativen

Pakete, die mit Debian und Ubuntu basierten Linux-Distributionen kompatibel sind, sind über [Node.js snaps](#snap) verfügbar.

## fnm

Schneller und einfacher Versionsmanager von Node.js, der in Rust gebaut wurde, um mehrere freigegebene Node.js Versionen zu verwalten. Es erlaubt Ihnen Operationen wie Installation, Deinstallation, Umschalten von Knotenversionen automatisch basierend auf dem aktuellen Verzeichnis usw. durchzuführen.
Um fnm zu installieren, benutze dieses [Installationsskript](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm unterstützt plattformübergreifend (macOS, Windows, Linux) & alle beliebten Shells (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm ist mit Geschwindigkeit und Kompatibilitätsunterstützung für `.node-version` und `.nvmrc` Dateien gebaut.

## FreeBSD

Die neueste Version von Node.js ist über den [www/node](https://www.freshports.org/www/node) Port verfügbar.

Installiere ein Binärpaket über [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg Installationsknoten
```

Oder kompilieren Sie es selbst mit [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js ist im Portage Tree verfügbar.

```bash
emerge nodejs
```

## IBM i

LTS-Versionen von Node.js sind bei IBM verfügbar und sind über [den 'yum'-Paketmanager](https://ibm.biz/ibmi-rpms) verfügbar. Der Paketname ist `nodejs` gefolgt von der Hauptversionsnummer (z. B. `nodejs18`, `nodejs20` usw.)

Um Node.js 20.x von der Befehlszeile zu installieren, führen Sie folgendes als Benutzer mit \*ALLOBJ Spezialautorität:

```bash
yum install nodejs20
```

Node.js kann auch mit dem IBM i Access Client Solutions Produkt installiert werden. Siehe [dieses Support-Dokument](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) für weitere Details

## macOS

Lade den [macOS Installer](/#home-downloadhead) direkt von der [nodejs.org](https://nodejs.org/) Webseite herunter.

_Wenn Sie das Paket mit bash:_ herunterladen möchten

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest. kg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativen

**[Homebrew](https://brew.sh/)**:

```bash
braue Installationsknoten
```

Benutze **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Beispiel
port install nodejs7
```

Benutze **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Binärpaket installieren:

```bash
pkgin -y install nodejs
```

Oder bauen Sie manuell aus pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` ist ein einfach zu bedienender Node.js Versionsmanager für Mac und Linux. Geben Sie die Zielversion für die Installation mit einer Rich-Syntax,
oder wählen Sie aus einem Menü der zuvor heruntergeladenen Versionen. Die Versionen sind systemweit oder benutzerfreundlich installiert und für mehr
können Sie eine Version direkt aus den zwischengespeicherten Downloads ausführen.

Siehe [homepage](https://github.com/tj/n) für Installationsmethoden (bootstrap, npm, Homebrew, Drittanbieter) und alle Nutzungsdetails.

Wenn du bereits `npm` hast, dann installiere `n` und dann ist die neueste LTS-`node` Version so einfach wie:

```
npm install -g n
n lts
```

## NetBSD

Node.js ist im pkgsrc-Baum verfügbar:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Oder installieren Sie ein Binärpaket (falls verfügbar für Ihre Plattform) mit pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` ist ein leichtgewichtiger Versionsmanager, ähnlich wie `nvm`. Es ist einfach und berechenbar. Ein reichhaltiges Plugin-Ökosystem lässt es an Ihre Bedürfnisse anpassen. Benutze `nodenv` um eine Knotenversion für deine Anwendung auszuwählen und zu garantieren, dass deine Entwicklungsumgebung mit der Produktion übereinstimmt.

Die Anweisungen zur Nodenv-Installation werden gepflegt [auf der Github Seite](https://github.com/nodenv/nodenv#installation). Bitte besuchen Sie diese Seite, um sicherzustellen, dass Sie der neuesten Version der Installationsschritte folgen.

## nvm

Node Version Manager ist ein Bash-Skript, das zur Verwaltung mehrerer veröffentlichter Node.js-Versionen verwendet wird. Es erlaubt Ihnen
Operationen wie Installation, Deinstallation, Wechselversion usw. auszuführen.
Um nvm zu installieren, benutze dieses [Installationsskript](https://github.com/nvm-sh/nvm#install--update-script).

Auf Unix / OS X Systemen können Node.js aus Quellcode mit
[nvm](https://github.com/creationix/nvm) installiert werden, indem sie an den Speicherort installieren, den nvm erwartet:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Danach kannst du `nvm` verwenden, um zwischen freigegebenen Versionen und
aus dem Quellcode zu wechseln.
Zum Beispiel, wenn die Version von Node.js v8.0.0-pre:

```bash
nvm verwenden 8
```

Sobald die offizielle Version fertig ist, möchten Sie die Version
aus dem Quellcode deinstallieren:

```bash
nvm deinstallieren 8
```

## nvs

#### Fenster

Der `nvs` Versionsmanager ist plattformübergreifend und kann auf Windows, macOS und Unix-ähnlichen Systemen verwendet werden

Um `nvs` unter Windows zu installieren, gehe auf die [Release-Seite](https://github.com/jasongin/nvs/releases) und lade die MSI Installer-Datei der neuesten Version herunter.

Du kannst auch `chocolatey` verwenden, um es zu installieren:

```bash
choco install nvs
```

#### macOS,UnixLike

Sie finden die Dokumentation zu den Installationsschritten von `nvs` in macOS/Unix-ähnlichen Systemen [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Auslastung

Danach kannst du `nvs` verwenden, um zwischen verschiedenen Versionen des Knotens zu wechseln.

Um die neueste Version des Knotens hinzuzufügen:

```bash
nvs fügen Sie neueste
```

Oder um die neueste LTS-Version des Knotens hinzuzufügen:

```bash
nvs add lts
```

Führe dann den Befehl `nvs use` aus, um eine Version des Knotens zu deiner `PATH` für die aktuelle Shell hinzuzufügen:

```bash
$ nvs verwenden lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Um es dauerhaft zu `PATH` hinzuzufügen, benutze `nvs Link`:

```bash
nvs link lts
```

## OpenBSD

Node.js ist über das Port-System verfügbar.

```bash
/usr/ports/lang/node
```

Verwendung von [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) auf OpenBSD:

```bash
pkg_add node
```

## openSUSE und SLE

Node.js ist in den Hauptrepositories unter den folgenden Paketen verfügbar:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12` und `nodejs14`
  (Das "Web and Scripting Module" muss [enabled]sein (https\://www\.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12` und `nodejs14`
  (Das "Web and Scripting Modul" muss [enabled]sein (https\://www\.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Um beispielsweise Node.js 14.x auf openSUSE Leap 15.2 zu installieren, führen Sie folgendes als root aus:

```bash
zypper nodejs14 installieren
```

Verschiedene Hauptversionen von Knoten können gleichzeitig installiert und verwendet werden.

## SmartOS und illumos

SmartOS-Images sind mit pkgsrc vorinstalliert. In anderen illumos-Distributionen installieren Sie zuerst **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, dann können Sie das Binärpaket wie normal installieren:

```bash
pkgin -y install nodejs
```

Oder bauen Sie manuell aus pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Einrasten

[Node.js snaps](https://github.com/nodejs/snap) sind als [`node`](https://snapcraft.io/node) im Snap Store verfügbar.

## Solus

Solus stellt Node.js in seinem Hauptarchiv zur Verfügung.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux liefert Node.js stabil im Hauptarchiv.

```bash
xbps-install -Sy nodejs
```

## Fenster

Lade den [Windows Installer](/#home-downloadhead) direkt von der [nodejs.org](https://nodejs.org/) Webseite herunter.

### Alternativen

**[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# oder für LTS
winget install OpenJS.NodeJS.LTS
```

Nachdem eines der beiden obigen Befehle ausgeführt wurde, ist es möglicherweise notwendig, den
Terminal-Emulator neu zu starten, bevor der CLI-Befehl `node` verfügbar ist.

Benutze **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# oder für vollständige Installation mit npm
cinst nodejs.install
```

**[Scoop](https://scoop.sh/)**:

```bash
scoop installiert nodejs
# oder für LTS
scoop nodejs-lts installieren
```

## z/OS

IBM&reg; SDK für Node.js - z/OS&reg; ist in zwei Installationsformaten verfügbar,
SMP/E und PAX. Wählen Sie das Installationsformat aus, das für Sie gilt:

- [Installation und Konfiguration der SMP/E-Ausgabe von Node.js auf z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Installation und Konfiguration von PAX-Version von Node.js auf z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
