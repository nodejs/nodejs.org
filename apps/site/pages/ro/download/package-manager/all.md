---
layout: article
title: Instalarea Node.js folosind un manager de pachete
---

# Instalarea Node.js folosind manageri de pachete

> Pachetele de pe această pagină sunt întreținute și gestionate de către menținătorii lor respectivi, **nu** de echipa de bază Node.js. Vă rugăm să raportați orice problemă întâmpinată direct menținătorului pachetului. Dacă se dovedește că problema este în Node.js, menținătorul o va raporta mai departe către echipa Node.js.

## Alpine Linux

Versiunile LTS de Node.js și pachetele npm sunt disponibile în Repozitoriul Principal.

```bash
apk add nodejs npm
```

Versiunea actuală de Node.js poate fi instalată din Repozitoriul Comunității.

```bash
apk add nodejs-current
```

## Android

Suportul pentru Android este încă experimental în Node.js, astfel încât dezvoltatorii Node.js nu oferă încă pachete precompilate.

Cu toate acestea, există câteva soluții oferite de terți. De exemplu, comunitatea [Termux](https://termux.com/) pune la dispoziție un emulator de terminal și un mediu Linux pentru Android, împreună cu un manager de pachete propriu și o [colecție extinsă](https://github.com/termux/termux-packages) de aplicații precompilate. Comanda următoare, executată în aplicația Termux, va instala cea mai recentă versiune disponibilă de Node.js:

```bash
pkg install nodejs
```

În prezent, fișierele binare Node.js din Termux sunt construite cu legături către `system-icu` (în funcție de pachetul `libicu`).

## Arch Linux

Versiunile LTS de Node.js și pachetele npm sunt disponibile în Repozitoriul Principal.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora și Red Hat Enterprise Linux

Node.js este disponibil ca un modul numit `nodejs` în CentOS/RHEL 8 și Fedora

```bash
dnf module install nodejs:<stream>
```

Unde `<stream>` corespunde versiunii majore a Node.js. Pentru a vedea o listă de fluxuri disponibile:

```bash
dnf module list nodejs
```

De exemplu, pentru a instala Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternative

Aceste resurse oferă pachete compatibile cu CentOS, Fedora și RHEL.

- [Node.js snaps](#snap) întreținute si susținute la https://github.com/nodejs/snap
- [Distribuții binare Node.js](#debian-and-ubuntu-based-linux-distributions) întreținute si susținute de [NodeSource](https://github.com/nodesource/distributions)

## Distribuții Linux bazate pe Debian și Ubuntu

[Distribuții binare de Node.js](https://github.com/nodesource/distributions) sunt disponibile de la NodeSource.

### Alternative

Pachetele compatibile cu distribuțiile Linux bazate pe Debian și Ubuntu sunt disponibile prin intermediul [Node.js snaps](#snap).

## Exherbo Linux

Pachetele Node.js și npm sunt disponibile în [repozitoriul arbor](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node).

```bash
cave resolve -x node
```

## fnm

Un manager de versiuni Node.js rapid și simplu, construit în Rust, folosit pentru a gestiona mai multe versiuni lansate de Node.js. Vă permite să efectuați operațiuni precum instalarea, dezinstalarea, schimbarea automată a versiunilor de Node pe baza directorului curent etc.
Pentru a instala fnm, utilizați acest [script de instalare](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm are suport pentru mai multe platforme (macOS, Windows, Linux) și toate shell-urile populare (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm este construit având în vedere viteza și compatibilitatea cu fișierele `.node-version` și `.nvmrc`.

## FreeBSD

Cea mai recentă versiune de Node.js este disponibilă prin portul [www/node](https://www.freshports.org/www/node).

Instalați un pachet binar prin [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Sau compilați-l singur folosind [porturi](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js este disponibil în arborele portage.

```bash
emerge nodejs
```

## IBM i

Versiunile LTS ale Node.js sunt disponibile de la IBM și sunt disponibile prin intermediul [managerul de pachete „yum”](https://ibm.biz/ibmi-rpms). Numele pachetului este `nodejs` urmat de numărul versiunii majore (de exemplu, `nodejs18`, `nodejs20` etc.)

Pentru a instala Node.js 20.x din linia de comandă, rulați următoarele ca utilizator cu autorizare specială \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js poate fi instalat și cu produsul IBM i Access Client Solutions. Consultați [acest document de asistență](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) pentru mai multe detalii

## macOS

Descărcați [macOS Installer](/#home-downloadhead) direct de pe site-ul web [nodejs.org](https://nodejs.org/).

_Dacă doriți să descărcați pachetul folosind bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternative

Folosind **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Folosind **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Folosind **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Instalați pachetul binar:

```bash
pkgin -y install nodejs
```

Sau construiți manual din pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` este un manager de versiuni Node.js simplu de utilizat pentru Mac și Linux. Specificați versiunea țintă de instalat folosind o sintaxă bogată sau selectați dintr-un meniu de versiuni descărcate anterior. Versiunile sunt instalate la nivel de sistem sau la nivel de utilizator, iar pentru o utilizare mai vizată, puteți rula o versiune direct din descărcările din cache.

Consultați [homepage](https://github.com/tj/n) pentru metode de instalare (bootstrap, npm, Homebrew, terță parte) și toate detaliile de utilizare.

Dacă aveți deja `npm`, atunci instalați `n` și apoi cea mai nouă versiune LTS `node` este la fel de simplă ca:

```
npm install -g n
n lts
```

## NetBSD

Node.js este disponibil în arborele pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Sau instalați un pachet binar (dacă este disponibil pentru platforma dvs.) folosind pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` este un manager de versiuni de nod ușor, similar cu `nvm`. Este simplu și previzibil. Un ecosistem bogat de pluginuri vă permite să îl adaptați nevoilor dvs. Utilizați `nodenv` pentru a alege o versiune Node pentru aplicația dvs. și pentru a garanta că mediul dumneavoastră de dezvoltare se potrivește cu producția.

Instrucțiunile de instalare Nodenv sunt menținute [pe pagina sa Github](https://github.com/nodenv/nodenv#installation). Vă rugăm să vizitați pagina respectivă pentru a vă asigura că urmați cea mai recentă versiune a pașilor de instalare.

## nvm

Node Version Manager este un script bash folosit pentru a gestiona mai multe versiuni Node.js lansate. Permite
să efectuați operațiuni precum instalarea, dezinstalarea, schimbarea versiunii etc.
Pentru a instala nvm, utilizați acest [script de instalare](https://github.com/nvm-sh/nvm#install--update-script).

Pe sistemele Unix / OS X Node.js construit din sursă poate fi instalat folosind
[nvm](https://github.com/creationix/nvm) prin instalarea în locația la care se așteaptă nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

După aceasta, puteți folosi `nvm` pentru a comuta între versiunile lansate și versiunile
construit din sursă.
De exemplu, dacă versiunea Node.js este v8.0.0-pre:

```bash
nvm use 8
```

Odată ce lansarea oficială este lansată, veți dori să dezinstalați versiunea construită
din sursa:

```bash
nvm uninstall 8
```

## nvs

#### Windows

Managerul de versiuni „nvs” este multiplatformă și poate fi utilizat pe sisteme Windows, macOS și Unix

Pentru a instala `nvs` pe Windows, accesați [pagina de lansare](https://github.com/jasongin/nvs/releases) aici și descărcați fișierul de instalare MSI al celei mai recente ediții.

De asemenea, puteți folosi `chocolatey` pentru a-l instala:

```bash
choco install nvs
```

#### macOS,UnixLike

Puteți găsi documentația referitoare la pașii de instalare a `nvs` în sisteme macOS/Unix-like [aici](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Utilizare

După aceasta, puteți folosi `nvs` pentru a comuta între diferite versiuni de nod.

Pentru a adăuga cea mai recentă versiune a nodului:

```bash
nvs add latest
```

Sau pentru a adăuga cea mai recentă versiune LTS a node-ului:

```bash
nvs add lts
```

Apoi rulați comanda `nvs use` pentru a adăuga o versiune a nodului la `PATH` pentru shell-ul curent:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Pentru a-l adăuga permanent la `PATH`, utilizați `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js este disponibil prin sistemul de porturi.

```bash
/usr/ports/lang/node
```

Folosind [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) pe OpenBSD:

```bash
pkg_add node
```

## openSUSE și SLE

Node.js este disponibil în depozitele principale în următoarele pachete:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  („Modulul Web și Scripting” trebuie să fie [activată](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, și `nodejs14` ("Web and Scripting Module" trebuie să fie [activat](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

De exemplu, pentru a instala Node.js 14.x pe openSUSE Leap 15.2, rulați următoarea comandă ca și utilizator root:

```bash
zypper install nodejs14
```

Diferite versiune majore de Node pot fi instalate si folosite concomitent.

## SmartOS și illumos

Imaginile SmartOS vin cu pkgsrc preinstalat. Pe alte distribuții illumos, instalați mai întâi **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, iar apoi puteți instala pachetul binar în mod obișnuit:

```bash
pkgin -y install nodejs
```

Sau compilați manual din pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Snap-urile Node.js](https://github.com/nodejs/snap) sund disponibile sub denumirea de [`node`](https://snapcraft.io/node) în magazinul Snap.

## Solus

Solus oferă Node.js în repozitoriul său principal.

```bash
sudo eopkg install nodejs
```

## vfox

Un manager de versiuni pentru mai multe platforme (Windows, macOS, Linux), **extensibil**.

Vă permite să folosiți **versiuni diferite pentru proiecte diferite**, **versiuni diferite pentru sesiuni shell diferite** și să comute automat între versiunile Node în funcție de directorul curent, etc.

Este compatibil cu toate shell-urile populare (Bash, Zsh, Fish, PowerShell, Clink, Cmder).

Consultați [Ghidul de început rapid](https://vfox.lhan.me/guides/quick-start.html) pentru a începe rapid să utilizați vfox și pentru toate detaliile de utilizare.

## Void Linux

Void Linux include versiunea stabilă de Node.js în repozitoriul principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Descărcați [Instalatorul pentru Windows](/#home-downloadhead) direct de pe website-ul [nodejs.org](https://nodejs.org/).

### Alternative

Folosind **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

După rularea uneia dintre cele două comenzi de mai sus, poate fi necesar să reporniți emulatorul de terminal înainte ca instrucțiunea CLI `node` să devină disponibilă.

Folosind **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Folosind **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK pentru Node.js - z/OS&reg; este disponibil în două formate de instalare: SMP/E și PAX. Alegeți formatul de instalare potrivit pentru dvs.:

- [Instalarea și configurarea ediției SMP/E a Node.js pe z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Instalarea și configurarea ediției PAX a Node.js pe z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
