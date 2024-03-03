---
layout: docs.hbs
title: Installazione di Node.js tramite gestore pacchetti
---

# Installazione di Node.js tramite Gestori Pacchetti

> I pacchetti di questa pagina sono mantenuti e supportati dai rispettivi packager, **non** il core team di Node.js. Si prega di segnalare eventuali problemi riscontrati al responsabile del pacchetto. Se si scopre che il problema è un bug in Node.js stesso, il manutentore segnalerà il problema a monte.

***

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora e Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Distribuzioni Linux basate su Debian e Ubuntu](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE e SLE](#opensuse-and-sle)
- [SmartOS e illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Alpine Linux

Node.js LTS e npm pacchetti sono disponibili nel Main Repository.

```bash
apk add nodejs npm
```

Node.js Current può essere installato dal Community Repository.

```bash
apk add nodejs-current
```

## Android

Il supporto Android è ancora sperimentale in Node.js, quindi i binari precompilati non sono ancora forniti dagli sviluppatori di Node.js.

Tuttavia, ci sono alcune soluzioni di terze parti. Ad esempio, [Termux](https\://termux. om/) community fornisce emulatore terminale e ambiente Linux per Android, così come il proprio gestore di pacchetti e [vasta collezione](https\://github. om/termux/termux-packages) di molte applicazioni precompilate. Questo comando nell'app Termux installerà l'ultima versione disponibile di Node.js:

```bash
pkg install nodejs
```

Attualmente, i binari di Termux Node.js sono collegati a `system-icu` (a seconda del pacchetto `libicu`).

## Arch Linux

I pacchetti Node.js e npm sono disponibili nel Community Repository.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora e Red Hat Enterprise Linux

Node.js è disponibile come modulo chiamato `nodejs` in CentOS/RHEL 8 e Fedora.

```bash
dnf module install nodejs:<stream>
```

dove `<stream>` corrisponde alla versione principale di Node.js.
Per vedere un elenco di flussi disponibili:

```bash
dnf module list nodejs
```

Ad esempio, per installare Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternative

Queste risorse forniscono pacchetti compatibili con CentOS, Fedora e RHEL.

- [Node.js snaps](#snap) mantenuto e supportato su https\://github.com/nodejs/snap
- [Node.js distribuzioni binarie](#debian-and-ubuntu-based-linux-distributions) mantenute e supportate da [NodeSource](https://github.com/nodesource/distributions)

## Distribuzioni Linux basate su Debian e Ubuntu

[Node.js binary distributions](https://github.com/nodesource/distributions) sono disponibili da NodeSource.

### Alternative

I pacchetti compatibili con le distribuzioni Linux basate su Debian e Ubuntu sono disponibili tramite [Node.js snaps](#snap).

## fnm

Gestore di versioni Node.js semplice e veloce costruito in Rust utilizzato per gestire più versioni rilasciate Node.js. Consente di eseguire operazioni come installazione, disinstallazione, commutare versioni Nodo automaticamente in base alla directory corrente, ecc.
Per installare fnm, usa questo [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm ha il supporto multi-piattaforma (macOS, Windows, Linux) e tutte le shell popolari (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm è costruito tenendo presente la velocità e il supporto di compatibilità per i file `.node-version` e `.nvmrc`.

## FreeBSD

La versione più recente di Node.js è disponibile tramite la porta [www/node](https://www.freshports.org/www/node).

Installa un pacchetto binario tramite [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Oppure compilalo da solo usando [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js è disponibile nell'albero portagio.

```bash
emerge nodejs
```

## IBM i

Le versioni LTS di Node.js sono disponibili da IBM e sono disponibili tramite [il gestore dei pacchetti 'yum'](https://ibm.biz/ibmi-rpms). Il nome del pacchetto è `nodejs` seguito dal numero di versione principale (per esempio, `nodejs18`, `nodejs20` ecc)

Per installare Node.js 20.x dalla riga di comando, eseguire quanto segue come utente con \*ALLOBJ autorità speciale:

```bash
yum install nodejs20
```

Node.js può anche essere installato con il prodotto IBM i Access Client Solutions. Vedi [questo documento di supporto](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) per maggiori dettagli

## macOS

Scarica il [macOS Installer](/#home-downloadhead) direttamente dal sito web [nodejs.org](https://nodejs.org/).

_Se si desidera scaricare il pacchetto con bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ <unk> grep "pkg" <unk> cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest. kg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternative

Uso **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Uso **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Esempio
port install nodejs7
```

Utilizzando **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Installare il pacchetto binario:

```bash
pkgin -y install nodejs
```

O costruisci manualmente da pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` è un semplice da usare Node.js version manager per Mac e Linux. Specificare la versione di destinazione da installare utilizzando una sintassi ricca,
o selezionare da un menu di versioni precedentemente scaricate. Le versioni sono installate a livello di sistema o a livello di utente, e per più
uso mirato è possibile eseguire una versione direttamente dal download nella cache.

Vedere [homepage](https://github.com/tj/n) per i metodi di installazione (bootstrap, npm, Homebrew, terze parti) e tutti i dettagli di utilizzo.

Se hai già `npm` allora installando `n` e poi la nuova versione `node` di LTS è semplice come:

```
npm install -g n
n lts
```

## NetBSD

Node.js è disponibile nell'albero pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Oppure installa un pacchetto binario (se disponibile per la tua piattaforma) usando pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` è un node manager leggero, simile a `nvm`. È semplice e prevedibile. Un ricco ecosistema di plugin ti permette di adattarlo alle tue esigenze. Usa `nodenv` per scegliere una versione Nodo per la tua applicazione e garantire che il tuo ambiente di sviluppo corrisponda alla produzione.

Le istruzioni di installazione di Nodenv sono mantenute [sulla sua pagina Github](https://github.com/nodenv/nodenv#installazione). Visita quella pagina per assicurarti di seguire l'ultima versione dei passaggi di installazione.

## nvm

Nodo Version Manager è uno script bash utilizzato per gestire più versioni di Node.js rilasciate. Permette a
di eseguire operazioni come installazione, disinstallazione, versione di commutazione, ecc.
Per installare nvm, usa questo [install script](https://github.com/nvm-sh/nvm#install--update-script).

Su sistemi Unix / OS X Node.js costruito da sorgente può essere installato utilizzando
[nvm](https://github.com/creationix/nvm) installando nella posizione che nvm si aspetta:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Dopo di che puoi usare `nvm` per passare tra le versioni rilasciate e le versioni
costruite dalla sorgente.
Per esempio, se la versione di Node.js è v8.0.0-pre:

```bash
uso nvm 8
```

Una volta che il rilascio ufficiale è fuori si desidera disinstallare la versione costruita
dal sorgente:

```bash
nvm disinstalla 8
```

## nvs

#### Finestre

Il gestore di versioni `nvs` è multipiattaforma e può essere utilizzato su sistemi Windows, macOS e Unix

Per installare `nvs` su Windows vai alla [release page](https://github.com/jasongin/nvs/releases) qui e scarica il file di installazione MSI dell'ultima versione.

Puoi anche usare `chocolatey` per installarlo:

```bash
choco install nvs
```

#### macOS,UnixLike

Puoi trovare la documentazione relativa ai passaggi di installazione di `nvs` nei sistemi macOS/Unix-like [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Utilizzo

Dopo di che puoi usare `nvs` per passare tra diverse versioni di nodo.

Per aggiungere l'ultima versione del nodo:

```bash
nvs add latest
```

Oppure per aggiungere l'ultima versione LTS del nodo:

```bash
nvs add lts
```

Quindi esegui il comando `nvs use` per aggiungere una versione del nodo al tuo `PATH` per la shell corrente:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Per aggiungerlo a `PATH` in modo permanente, usa `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js è disponibile attraverso il sistema delle porte.

```bash
/usr/ports/lang/node
```

Utilizzando [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) su OpenBSD:

```bash
pkg_aggiungi nodo
```

## openSUSE e SLE

Node.js è disponibile nei repository principali sotto i seguenti pacchetti:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Ad esempio, per installare Node.js 14.x su openSUSE Leap 15.2, eseguire come root:

```bash
zypper install nodejs14
```

Diverse versioni principali di Nodo possono essere installate e usate contemporaneamente.

## SmartOS e illumos

Le immagini SmartOS sono disponibili con pkgsrc pre-installato. Su altre distribuzioni illumos, prima installare **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, poi è possibile installare il pacchetto binario come normale:

```bash
pkgin -y install nodejs
```

O costruisci manualmente da pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) sono disponibili come [`node`](https://snapcraft.io/node) sullo Snap store.

## Solus

Solus fornisce Node.js nel suo repository principale.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux fornisce Node.js stabile nel repository principale.

```bash
xbps-install -Sy nodejs
```

## Finestre

Scarica il [Windows Installer](/#home-downloadhead) direttamente dal sito web [nodejs.org](https://nodejs.org/).

### Alternative

Utilizzando **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# o per LTS
winget install OpenJS.NodeJS.LTS
```

Dopo aver eseguito uno dei due comandi sopra, potrebbe essere necessario riavviare l'emulatore di terminale
prima che il comando CLI `node` diventi disponibile.

Utilizzando **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# o per l'installazione completa con npm
cinst nodejs.install
```

Uso **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# o per LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; è disponibile in due formati di installazione,
SMP/E e PAX. Selezionare il formato di installazione che si applica a te:

- [Installazione e configurazione dell'edizione SMP/E di Node.js su z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Installazione e configurazione dell'edizione PAX di Node.js su z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
