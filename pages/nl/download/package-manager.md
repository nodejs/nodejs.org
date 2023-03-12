---
layout: page.hbs
title: Installeer Node.js via package-manager
---

# Installeer Node.js via package-manager

***Opmerking:*** De packages op deze pagina worden onderhouden door hun makers, **niet** door het Node.js-kernteam. Meld eventuele problemen die u tegenkomt aan de pakketbeheerders. Als blijkt dat uw probleem een bug is die veroorzaakt wordt door Node.js, dan zullen de pakketbeheerders dit bij ons melden.

---

* [Alpine Linux](#alpine-linux)
* [Android](#android)
* [Arch Linux](#arch-linux)
* [CentOS, Fedora en Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
* [Debian en Ubuntu gebaseerde Linux-distributies](#debian-and-ubuntu-based-linux-distributions)
* [fnm](#fnm)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [macOS](#macos)
* [n](#n)
* [NetBSD](#netbsd)
* [Nodenv](#nodenv)
* [nvm](#nvm)
* [nvs](#nvs)
* [OpenBSD](#openbsd)
* [openSUSE en SLE](#opensuse-and-sle)
* [SmartOS en illumos](#smartos-and-illumos)
* [Snap](#snap)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows-1)
* [z/OS](#zos)

---

## Alpine Linux

Node.js LTS en npm-packages zijn beschikbaar in de Main Repository.

```bash
apk add nodejs npm
```

Node.js Current kan geïnstalleerd worden vanuit de Community Repository.

```bash
apk add nodejs-current
```

## Android

Android-ondersteuning is nog steeds experimenteel binnen Node.js, dus precompiled binaries zijn momenteel nog niet beschikbaar.

Er zijn wel enkele third-party-oplossingen beschikbaar. Bijvoorbeeld: de [Termux](https://termux.com/) community, deze bieden een terminal-emulator en Linux-omgeving aan voor Android, daarnaast hebben ze ook een eigen package-manager en een [uitgebreide collectie](https://github.com/termux/termux-packages) van precompiled applicaties. Dit commando in de Termux-app installeert de laatst beschikbare Node.js-versie:

```bash
pkg install nodejs
```

Momenteel worden Termux Node.js binaries gelinkt tegen `system-icu` (afhankelijk van `libicu` package).

## Arch Linux

Node.js en npm-packages zijn beschikbaar in de Community Repository.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora en Red Hat Enterprise Linux

Node.js is beschikbaar als een module genaamd `nodejs` in CentOS/RHEL 8 en Fedora.

```bash
dnf module install nodejs:<stream>
```

waar `<stream>` overeenkomt met de hoofdversie van Node.js.
Voor een lijst met beschikbare streams:

```bash
dnf module list nodejs
```

Bijvoorbeeld, om Node.js 12 te installeren:

```bash
dnf module install nodejs:12
```

Voor CentOS/RHEL 7 is Node.js beschikbaar via [Software Collections](https://www.softwarecollections.org/en/scls/?search=NodeJS).

### Alternatieven

Deze bronnen bieden packages aan die compatibel zijn met CentOS, Fedora en RHEL.
* [Node.js snaps](#snap) onderhouden en ondersteund op https://github.com/nodejs/snap
* [Node.js binary distributies](#debian-and-ubuntu-based-linux-distributions) onderhouden en ondersteund door [NodeSource](https://github.com/nodesource/distributions)

## Debian en Ubuntu gebaseerde Linux-distributies

[Node.js binary-distributies](https://github.com/nodesource/distributions) zijn beschikbaar bij NodeSource.

### Alternatieven

Packages die compatibel zijn met op Debian en Ubuntu gebaseerde Linux-distributies zijn beschikbaar op [Node.js snaps](#snap).

## fnm

Snelle en eenvoudige Node.js versiebeheerder geschreven in Rust, wordt gebruikt om meerdere uitgebrachte Node.js versies te beheren. Hiermee kunt u bewerkingen uitvoeren zoals: install, uninstall, switch Node versions, enz.
Om fnm te installeren, kunt u dit [script](https://github.com/Schniz/fnm#using-a-script-macoslinux) gebruiken.

fnm heeft cross-platform ondersteuning (macOS, Windows, Linux) & wordt ook ondersteund door alle populaire shells (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm is gebouwd met snelheid in het achterhoofd en met compatibiliteit voor `.node-version` en `.nvmrc` bestanden.

## FreeBSD

De meest recente release van Node.js is beschikbaar op de [www/node](https://www.freshports.org/www/node) poort.

Installeer een binary-package via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Of compileer het zelf met behulp van [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js is beschikbaar in de portage-tree.

```bash
emerge nodejs
```

## IBM i

LTS-versies van Node.js (van IBM) zijn beschikbaar en verkrijgbaar via [de 'yum' package-manager](https://ibm.biz/ibmi-rpms). De package-name is `nodejs` gevolgd door het hoofdversienummer (bijvoorbeeld: `nodejs12`, `nodejs14`, enz.)

Om Node.js 14.x vanuit de command-line te installeren, voert u het onderstaande commando uit met een gebruiker die \*ALLOBJ machtigingen heeft:

```bash
yum install nodejs14
```

Node.js kan ook worden geïnstalleerd met IBM i Access Client Solutions. Zie [dit support-document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) voor meer informatie

## macOS

Download de [macOS-installer](https://nodejs.org/en/#home-downloadhead) op de [nodejs.org](https://nodejs.org/) website.

_Als je het package met bash wilt downloaden:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatieven

Met **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Met **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Met **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Installeer de binary-package:

```bash
pkgin -y install nodejs
```

Of bouw handmatig vanuit pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` is een eenvoudig te gebruiken Node.js versiebeheerder voor Mac en Linux. Met `n` kunt u een doelversie specifieren (met gebruik van een rich-syntax) om te downloaden,
of kiezen uit een lijst van eerder gedownloade versies. De versies worden system-wide of user-wide geïnstalleerd, en voor meer
gericht gebruik kunt u een versie direct vanuit de cached-downloads uitvoeren.

Bezoek de [homepage](https://github.com/tj/n) voor installatiemethoden (bootstrap, npm, Homebrew, third-party), en alle gebruiksdetails.

Als je `npm` al hebt geïnstalleerd dan is het installeren van `n` en de nieuwste LTS `node` versie zo simpel als:

```
npm install -g n
n lts
```

## NetBSD

Node.js is beschikbaar in de pkgsrc-tree:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Of installeer een binary-package (indien beschikbaar voor uw platform) met pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` is een lightweight node versiebeheerder, vergelijkbaar met `nvm`. Het is simpel, voorspelbaar en heeft een rijk ecosysteem aan plugins die u kunt aanpassen aan uw behoeften. Gebruik `nodenv` om een Node-versie te kiezen voor uw applicatie en te garanderen dat uw ontwikkel- en productieomgeving overeenkomen.

Nodenv installatie-instructies zijn beschikbaar op [Github](https://github.com/nodenv/nodenv#installation). Bezoek a.u.b. de GitHub-pagina om er zeker van te zijn dat u de correcte installatiestappen volgt.

## nvm

Node Version Manager is een bash script dat gebruikt wordt om verschillende Node.js versies te beheren.
Het laat u handelingen uitvoeren zoals: install, uninstall, switch version, enz.
Gebruik dit [installatiescript](https://github.com/nvm-sh/nvm#install--update-script) om nvm te installeren.

Op Unix / OS X systemen kan Node.js (vanuit broncode) geïnstalleerd worden met behulp van
[nvm](https://github.com/creationix/nvm) door het te installeren op de locatie waar nvm dit verwacht:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Hierna kan `nvm` gebruikt worden om te schakelen tussen uitgebrachte versies en versies gebouwd vanuit broncode.
Bijvoorbeeld, als de versie van Node.js v8.0.0-pre is:

```bash
nvm use 8
```

Zodra de officiële versie uitgebracht is, kunt u de versie gebouwd vanuit broncode verwijderen:

```bash
nvm uninstall 8
```

## nvs

#### Windows

De `nvs` versiebeheerder is cross-platform en kan gebruikt worden op Windows, macOS en Unix-like systemen.

Ga naar de [release-pagina](https://github.com/jasongin/nvs/releases) en download de MSI-installer van de laatste release.

Het is ook mogelijk om `chocolatey` te gebruiken om `nvs` te installeren:

```bash
choco install nvs
```

#### macOS,UnixLike

[Hier](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux) kunt de documentatie over de installatiestappen van `nvs` in macOS/Unix-like systemen terugvinden

#### Gebruik

Hierna kan `nvs` gebruiken om te wisselen tussen verschillende versies van node.

Om de laatste versie van node toe te voegen:

```bash
nvs add latest
```

Of om de laatste LTS-versie van node toe te voegen:

```bash
nvs add lts
```

Voer hierna het `nvs use` commando uit om een versie van node toe te voegen aan je `PATH` voor de huidige shell:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Gebruik `nvs link`, om het permanent aan `PATH` toe te voegen:

```bash
nvs link lts
```

## OpenBSD

Node.js is beschikbaar via het ports-systeem.

```bash
/usr/ports/lang/node
```

Met [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) op OpenBSD:

```bash
pkg_add node
```

## openSUSE en SLE

Node.js is beschikbaar in de main-repositories onder de volgende packages:

* **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
* **openSUSE Tumbleweed**: `nodejs16`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (De module "Web and Scripting" moet [ingeschakeld](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated) zijn.)
* **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (De module "Web and Scripting" moet [ingeschakeld](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module) zijn.)

Om bijvoorbeeld Node.js 14.x op openSUSE Leap 15.2 te installeren, voert u het volgende commando uit als root:

```bash
zypper install nodejs14
```

Het is mogelijk om verschillende versies van Node te installeren en deze tegelijkertijd te gebruiken.

## SmartOS en illumos

SmartOS-images komen voorgeïnstalleerd met pkgsrc. Op andere illumos-distributies dient u eerst **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** installeren, hierna kunt u de binary-package installeren.

```bash
pkgin -y install nodejs
```

Of bouw handmatig vanuit pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) zijn beschikbaar als [`node`](https://snapcraft.io/node) in de Snap-store.

## Solus

Solus biedt Node.js aan in zijn main-repository.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux levert Node.js in zijn main-repository.

```bash
xbps-install -Sy nodejs
```

## Windows

Download de [Windows Installer](https://nodejs.org/en/#home-downloadhead) rechtstreeks op de [nodejs.org](https://nodejs.org/) website.

### Alternatieven

Met **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Na het uitvoeren van een van de bovenstaande commando's kan het nodig zijn om uw
terminal-emulator te herstarten voordat het `node` CLI commando beschikbaar wordt.

Met **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Met **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK voor Node.js - z/OS&reg; is beschikbaar in twee installatieformaten,
SMP/E en PAX. Selecteer het installatieformaat dat voor u van toepassing is:
* [Installatie en configuratie van de SMP/E-editie van Node.js op z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
* [Installatie en configuratie van de PAX-editie van Node.js op z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
