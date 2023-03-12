---
layout: page.hbs
title: Installation de Node.js via le gestionnaire de paquets
---

# Installation de Node.js via le gestionnaire de paquets

***Note:*** Les paquets sur cette page sont maintenus et supportés par leurs mainteneurs respectifs, **non pas** par l'équipe centrale de Node.js. Veuillez signaler tout problème que vous rencontrez au mainteneur du paquet. S'il s'avère que votre problème est un bogue dans Node.js lui-même, le mainteneur signalera le problème en amont.

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Distributions Linux dérivées de Debian et Ubuntu, Linux/Fedora Entreprise, et paquets Snap](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [nvs](#nvs)
* [OpenBSD](#openbsd)
* [openSUSE and SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS and illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows)

---

## Android

Le support d'Android est encore expérimental dans Node.js, donc les binaires précompilés ne sont pas encore fournis par les développeurs de Node.js.

Cependant, il existe quelques solutions tierces. Par exemple, la communauté [Termux](https://termux.com/) fournit un émulateur de terminal et un environnement Linux pour Android, ainsi que son propre gestionnaire de paquets et une [vaste collection](https://github.com/termux/termux-packages) de nombreuses applications précompilées. Cette commande dans l'application Termux installera la dernière version disponible de Node.js :

```bash
pkg install nodejs
```

Currently, Termux Node.js binaries are linked against `system-icu` (depending on `libicu` package).

## Arch Linux

Node.js and npm packages are available in the Community Repository.

```bash
pacman -S nodejs npm
```

## Les distributions Linux basées sur Debian et Ubuntu, Enterprise Linux/Fedora et les paquets Snap

[Les distributions binaires Node.js] (https://github.com/nodesource/distributions) sont disponibles sur NodeSource.

## FreeBSD

La version la plus récente de Node.js est disponible via le port [www/node](https://www.freshports.org/www/node).

Installez un paquet binaire via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) :

```bash
pkg install node
```

Ou compilez-le vous-même en utilisant [ports](https://www.freebsd.org/cgi/man.cgi?ports) :

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js est disponible dans l'arbre de portage.

```bash
emerge nodejs
```

## IBM i

Les versions LTS de Node.js sont disponibles auprès d'IBM, et sont disponibles via [le gestionnaire de paquets 'yum'] (https://ibm.biz/ibmi-rpms). Le nom du paquet est `nodejs` suivi du numéro de la version majeure (par exemple, `nodejs8`, `nodejs10`, `nodejs12`, etc).

Pour installer Node.js 12.x à partir de la ligne de commande, exécutez la commande suivante en tant qu'utilisateur disposant de l'autorisation spéciale \*ALLOBJ :

```bash
yum install nodejs12
```

Node.js peut également être installé avec le produit IBM i Access Client Solutions. Voir [ce document de support] (http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) pour plus de détails.

## NetBSD

Node.js est disponible dans l'arbre pkgsrc :

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou installez un  paquet binaire (si disponible pour votre plateforme) en utilisant pkgin :

```bash
pkgin -y install nodejs
```

## nvm
Node Version Manager est un script bash utilisé pour gérer plusieurs versions de Node.js. Il vous permet d'effectuer des opérations comme l'installation, la désinstallation, le changement de version, etc. Pour installer nvm, utilisez ce [script d'installation](https://github.com/nvm-sh/nvm#install--update-script).

Sur les systèmes Unix / OS X, Node.js construit à partir des sources peut être installé en utilisant [nvm](https://github.com/creationix/nvm) en l'installant à l'emplacement attendu par nvm :

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Après cela, vous pouvez utiliser `nvm` pour basculer entre les versions publiées et les versions construites à partir des sources. Par exemple, si la version de Node.js est v8.0.0-pre :

```bash
nvm use 8
```

Une fois que la version officielle sera sortie, vous voudrez désinstaller la version construite à partir des sources :

```bash
nvm uninstall 8
```

## nvs

#### Windows
Le gestionnaire de version `nvs` est multiplateforme et peut être utilisé sur Windows, macOS, et les systèmes Unix.

Pour installer `nvs` sur Windows, allez sur la [release page](https://github.com/jasongin/nvs/releases) ici et téléchargez le fichier d'installation MSI de la dernière version.

Vous pouvez également utiliser `chocolatey` pour l'installer :

```bash
choco install nvs
```

#### macOS et tous les systèmes de type Unix
Vous pouvez trouver la documentation concernant les étapes d'installation de `nvs` dans les systèmes macOS/Unix-like [ici](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Utilisation
Après cela, vous pouvez utiliser `nvs` pour basculer entre les différentes versions de node.

Pour ajouter la dernière version de node :

```bash
nvs add latest
```

Ou pour ajouter la dernière version LTS de node :

```bash
nvs add lts
```

Ensuite, lancez la commande `nvs use` pour ajouter une version de node à votre `PATH` pour le shell actuel :

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Pour l'ajouter au `PATH` de façon permanente, utilisez `nvs link` :

```bash
nvs link lts
```

## OpenBSD

Node.js est disponible via le système de ports.

```bash
/usr/ports/lang/node
```

Utilisation de [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) sur OpenBSD :

```bash
pkg_add node
```

## openSUSE et SLE

Node.js est disponible dans les dépôts principaux sous les paquets suivants :

* **openSUSE Leap 42.2** : `nodejs4`
* **openSUSE Leap 42.3** : `nodejs4`, `nodejs6`
**openSUSE Tumbleweed** : `nodejs4`, `nodejs6`, `nodejs8`
**SUSE Linux Enterprise Server (SLES) 12** : `nodejs4`, `nodejs6` (Le "Web and Scripting Module" doit être [ajouté avant l'installation](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

Par exemple, pour installer Node.js 4.x sur openSUSE Leap 42.2, exécutez ce qui suit en tant que root :

```bash
zypper install nodejs4
```

## macOS

Téléchargez simplement le [macOS Installer](https://nodejs.org/en/#home-downloadhead) directement depuis le site Web [nodejs.org](https://nodejs.org/).

_Si vous voulez télécharger le paquet avec bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatives

Utilisation de **[Homebrew](https://brew.sh/)** :

```bash
brew install node
```

Utilisation de **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Utilisation de **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Installez le  paquet binaire :

```bash
pkgin -y install nodejs
```

Ou compiler manuellement à partir de pkgsrc :

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS et illumos

Les images SmartOS sont livrées avec pkgsrc pré-installé. Sur les autres distributions illumos, installez d'abord **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, puis vous pouvez installer le  paquet binaire normalement :

```bash
pkgin -y install nodejs
```

Ou compiler manuellement à partir de pkgsrc :

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

Solus fournit Node.js dans son dépôt principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux fournit Node.js stable dans le dépôt principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Téléchargez simplement le [Windows Installer](https://nodejs.org/en/#home-downloadhead) directement depuis le site web [nodejs.org](https://nodejs.org/).

### Alternatives

En utilisant **[Chocolatey](https://chocolatey.org/)** :

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

En utilisant **[Scoop](https://scoop.sh/)** :

```bash
scoop install nodejs
```
