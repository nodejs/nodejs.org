---
layout: docs.hbs
title: Installation de Node.js via le gestionnaire de paquets
---

# Installation de Node.js via les gestionnaires de paquets

> Les paquets de cette page sont maintenus et supportés par leurs empaqueteurs respectifs, **pas** l'équipe principale de Node.js. Veuillez signaler tout problème que vous rencontrez au responsable du paquet. S'il s'avère que votre problème est un bogue dans Node.js lui-même, le responsable signalera le problème en amont.

***

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora et Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Distributions Linux basées sur Debian et Ubuntu](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE et SLE](#opensuse-and-sle)
- [SmartOS et illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Vide Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Alpine Linux

Les paquets Node.js LTS et npm sont disponibles dans le dépôt principal.

```bash
apk add nodejs npm
```

Node.js Current peut être installé depuis le Dépôt Communautaire.

```bash
apk ajouter nodejs-current
```

## Android

Le support d'Android est toujours expérimental dans Node.js, donc les binaires précompilés ne sont pas encore fournis par les développeurs de Node.js.

Cependant, il y a des solutions tierces. Par exemple, [Termux](https\://termux. om/) community provides terminal emulator and Linux environment for Android, as well as own package manager and [extensive collection](https\://github. om/termux/termux-packages) de nombreuses applications précompilées. Cette commande dans l'application Termux installera la dernière version disponible de Node.js :

```bash
pkg install nodejs
```

Actuellement, les binaires de Termux Node.js sont liés à `system-icu` (selon le paquet `libicu`).

## Arch Linux

Les paquets Node.js et npm sont disponibles dans le Dépôt Communautaire.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora et Red Hat Enterprise Linux

Node.js est disponible en tant que module appelé `nodejs` dans CentOS/RHEL 8 et Fedora.

```bash
dnf module install nodejs:<stream>
```

où `<stream>` correspond à la version majeure de Node.js.
Pour voir une liste de flux disponibles :

```bash
dnf module liste nodejs
```

Par exemple, pour installer Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternatives

Ces ressources fournissent des paquets compatibles avec CentOS, Fedora et RHEL.

- [Instantanés Node.js](#snap) maintenus et pris en charge sur https\://github.com/nodejs/snap
- [Distributions binaires de Node.js](#debian-and-ubuntu-based-linux-distributions) maintenues et supportées par [NodeSource](https://github.com/nodesource/distributions)

## distributions Linux basées sur Debian et Ubuntu

[Les distributions binaires Node.js](https://github.com/nodesource/distributions) sont disponibles sur NodeSource.

### Alternatives

Les paquets compatibles avec les distributions Linux basées sur Debian et Ubuntu sont disponibles via [les snaps Node.js](#snap).

## fnm

Fast and simple Node.js version manager built in Rust used to manage multiple released Node.js versions. It allows you to perform operations like install, uninstall, switch Node versions automatically based on the current directory, etc.
To install fnm, use this [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm a le support multi-plateforme (macOS, Windows, Linux) et tous les shells populaires (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm est construit en gardant à l'esprit la rapidité et la compatibilité des fichiers `.node-version` et `.nvmrc`.

## FreeBSD

La version la plus récente de Node.js est disponible via le port [www/node](https://www.freshports.org/www/node).

Installer un paquet binaire via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
Noeud d'installation pkg
```

Ou compilez vous-même en utilisant [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js est disponible dans l'arbre de Portage.

```bash
emerge nodejs
```

## IBM i

Les versions LTS de Node.js sont disponibles sur IBM, et sont disponibles via [le gestionnaire de paquets 'yum'](https://ibm.biz/ibmi-rpms). Le nom du paquet est `nodejs` suivi du numéro de version principal (par exemple, `nodejs18`, `nodejs20`, etc.)

Pour installer Node.js 20.x depuis la ligne de commande, exécutez ce qui suit en tant qu'utilisateur avec \*ALLOBJ autorité spéciale:

```bash
yum install nodejs20
```

Node.js peut également être installé avec le produit IBM i Access Client Solutions. Voir [ce document de support](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) pour plus de détails

## macOS

Téléchargez l’[installateur macOS](/#home-downloadhead) directement depuis le site [nodejs.org](https://nodejs.org/).

_Si vous voulez télécharger le paquet avec bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest. kg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatives

Utilisation de **[Homebrew](https://brew.sh/)**:

```bash
Nœud d'installation de brew
```

En utilisant **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Exemple
port install nodejs7
```

En utilisant **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Installer le paquet binaire :

```bash
pkgin -y installer nodejs
```

Ou construisez manuellement à partir de pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` is a simple to use Node.js version manager for Mac and Linux. Specify the target version to install using a rich syntax,
or select from a menu of previously downloaded versions. The versions are installed system-wide or user-wide, and for more
targeted use you can run a version directly from the cached downloads.

Voir [homepage](https://github.com/tj/n) pour les méthodes d'installation (bootstrap, npm, Homebrew, tierce-partie) et tous les détails d'utilisation.

Si vous avez déjà `npm` alors installer `n` et alors la dernière version de LTS `node` est aussi simple que:

```
npm install -g n
n lts
```

## NetBSD

Node.js est disponible dans l'arborescence pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou installez un paquet binaire (si disponible pour votre plateforme) en utilisant pkgin:

```bash
pkgin -y installer nodejs
```

## Nodenv

`nodenv` est un gestionnaire de version de node léger, similaire à `nvm`. C'est simple et prévisible. Un écosystème de plugin riche vous permet de l'adapter à vos besoins. Utilisez `nodenv` pour choisir une version de Node pour votre application et garantissez que votre environnement de développement corresponde à la production.

Les instructions d'installation de Nodenv sont maintenues [sur sa page Github](https://github.com/nodenv/nodenv#installation). Veuillez visiter cette page pour vous assurer que vous suivez la dernière version des étapes d'installation.

## nvm

Node Version Manager est un script bash utilisé pour gérer plusieurs versions de Node.js publiées. Il permet à
d'effectuer des opérations telles que l'installation, la désinstallation, la version de basculement, etc.
Pour installer nvm, utilisez ce [script d'installation](https://github.com/nvm-sh/nvm#install--update-script).

Sur les systèmes Unix / OS X, Node.js construit à partir des sources peut être installé en utilisant
[nvm](https://github.com/creationix/nvm) en installant à l'emplacement que nvm attend :

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Après cela, vous pouvez utiliser `nvm` pour basculer entre les versions publiées et les versions
construites à partir des sources.
Par exemple, si la version de Node.js est v8.0.0-pre:

```bash
nvm utiliser 8
```

Une fois que la version officielle sera sortie, vous voudrez désinstaller la version compilée
de la source:

```bash
nvm désinstaller 8
```

## nvs

#### Fenêtres

Le gestionnaire de versions `nvs` est multi-plateforme et peut être utilisé sur Windows, macOS et Unix-like

Pour installer `nvs` sous Windows, allez sur la [page de publication](https://github.com/jasongin/nvs/releases) ici et téléchargez le fichier d'installation MSI de la dernière version.

Vous pouvez également utiliser `chocolatey` pour l'installer:

```bash
choco install nvs
```

#### macOS,UnixLike

Vous pouvez trouver la documentation concernant les étapes d'installation de `nvs` dans macOS/Unix-like systems [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Usage

Après cela, vous pouvez utiliser `nvs` pour basculer entre différentes versions de nœud.

Pour ajouter la dernière version du noeud :

```bash
nvs ajouter la dernière fois
```

Ou pour ajouter la dernière version LTS de node:

```bash
nvs add lts
```

Ensuite, exécutez la commande `nvs use` pour ajouter une version de node à votre `PATH` pour le shell actuel :

```bash
$ nvs utilise lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Pour l'ajouter à `PATH` de manière permanente, utilisez `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js est disponible via le système de ports.

```bash
/usr/ports/lang/node
```

Utilisation de [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) sur OpenBSD:

```bash
pkg_add nœud
```

## openSUSE et SLE

Node.js est disponible dans les dépôts principaux sous les paquets suivants :

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12` et `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, et `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Par exemple, pour installer Node.js 14.x sur openSUSE Leap 15.2, exécutez ce qui suit en tant que root :

```bash
zypper installer nodejs14
```

Différentes versions majeures de Node peuvent être installées et utilisées simultanément.

## SmartOS et illumos

Les images SmartOS sont fournies avec pkgsrc pré-installées. Sur d'autres distributions illumos, installez d'abord **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, puis vous pouvez installer le paquet binaire comme d'habitude :

```bash
pkgin -y installer nodejs
```

Ou construisez manuellement à partir de pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Aligner

Les [snaps Node.js](https://github.com/nodejs/snap) sont disponibles en tant que [`node`](https://snapcraft.io/node) dans la boutique Snap.

## Solus

Solus fournit Node.js dans son dépôt principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux fournit Node.js stable dans le référentiel principal.

```bash
xbps-install -Sy nodejs
```

## Fenêtres

Téléchargez l'[installateur Windows](/#home-downloadhead) directement depuis le site [nodejs.org](https://nodejs.org/).

### Alternatives

En utilisant **[Winget](https://aka.ms/winget-cli)**:

```bash
winget installez OpenJS.NodeJS
# ou installez OpenJS.NodeJS.LTS pour LTS
winget
```

Après avoir exécuté l'une des deux commandes ci-dessus, il peut être nécessaire de redémarrer l'émulateur de terminal
avant que la commande CLI `node` ne devienne disponible.

Utilisation de **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# ou pour une installation complète avec npm
cinst nodejs.install
```

Utilisation de **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# ou pour LTS
installer nodejs-lts
```

## Z/OS

IBM&reg; SDK pour Node.js - z/OS&reg; est disponible en deux formats d'installation,
SMP/E et PAX. Sélectionnez le format d'installation qui vous convient :

- [Installer et configurer l'édition SMP/E de Node.js sur z/OS](https://www.ibm.com/docs/fr/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Installer et configurer l'édition PAX de Node.js sur z/OS](https://www.ibm.com/docs/fr/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
