---
layout: article
title: Installer Node.js via le gestionnaire de paquets
---

# Installer Node.js via le gestionnaire de paquets

> Les paquets sur cette page sont maintenus et supportés par leurs auteurs respectifs, **pas** par l'équipe de base de Node.js. Veuillez rapporter tout problème que vous rencontrez au mainteneur du paquet. S'il s'avère que votre problème est un bogue dans Node.js lui-même, le mainteneur rapportera le problème en amont.

## Alpine Linux

Les paquets Node.js LTS et npm sont disponibles dans le dépôt principal.

```bash
apk add nodejs npm
```

Node.js actuel peut être installé à partir du Repository de la Communauté.

```bash
apk add nodejs-current
```

## Android

Le support d'Android est encore expérimental dans Node.js, donc les binaires précompilés ne sont pas encore fournis par les développeurs de Node.js.

Toutefois, il existe des solutions tierces. Par exemple, la communauté [Termux](https://termux.com/) fournit un émulateur de terminal et un environnement Linux pour Android, ainsi que son propre gestionnaire de paquets et une [vaste collection](https://github.com/termux/termux-packages) de nombreuses applications précompilées. Cette commande dans l'application Termux installera la dernière version disponible de Node.js :

```bash
pkg install nodejs
```

Actuellement, les binaires de Termux Node.js sont liés à `system-icu` (dépendant du paquet `libicu`).

## Arch Linux

Les paquets Node.js et npm sont disponibles dans le Dépôt de la communauté.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora et Red Hat Enterprise Linux

Node.js est disponible en tant que module appelé `nodejs` dans CentOS/RHEL 8 et Fedora.

```bash
dnf module install nodejs:<stream>
```

où `<stream>` correspond à la version majeure de Node.js.
Pour voir la liste des flux disponibles :

```bash
dnf module list nodejs
```

Par exemple, pour installer Node.js 18 :

```bash
dnf module install nodejs:18/common
```

### Alternatives

Ces ressources fournissent des paquets compatibles avec CentOS, Fedora et RHEL.

- [Node.js snaps](#snap) maintenu et supporté à https://github.com/nodejs/snap
- [Distributions binaires Node.js](#debian-and-ubuntu-based-linux-distributions) maintenues et supportées par [NodeSource](https://github.com/nodesource/distributions)

## Distributions basées sur Debian et Ubuntu

Des [distributions binaires de Node.js](https://github.com/nodesource/distributions) sont disponibles auprès de NodeSource.

### Alternatives

Les paquets compatibles avec les distributions Linux basées sur Debian et Ubuntu sont disponibles via [Node.js snaps](#snap).

## Exherbo Linux

Les paquets Node.js et npm sont disponibles dans le [dépôt d'arborescence](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node).

```bash
cave resolve -x node
```

## fnm

Gestionnaire de versions Node.js simple et rapide, construit en Rust, utilisé pour gérer plusieurs versions de Node.js. Il vous permet d'effectuer des opérations telles que l'installation, la désinstallation, le changement automatique de version de Node en fonction du répertoire courant, etc.
Pour installer fnm, utilisez ce [script d'installation](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm est multiplateforme (macOS, Windows, Linux) et supporte tous les shells populaires (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm est construit avec la vitesse à l'esprit et le support de compatibilité pour les fichiers `.node-version` et `.nvmrc`.

## FreeBSD

La version la plus récente de Node.js est disponible via le port [www/node](https://www.freshports.org/www/node).

Installer un paquetage binaire via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) :

```bash
pkg install node
```

Vous pouvez également le compiler vous-même en utilisant [ports](https://www.freebsd.org/cgi/man.cgi?ports) :

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js est disponible dans l'arbre de portage.

```bash
emerge nodejs
```

## IBM i

Les versions LTS de Node.js sont disponibles auprès d'IBM, et sont disponibles via [le gestionnaire de paquets 'yum'](https://ibm.biz/ibmi-rpms). Le nom du paquet est `nodejs` suivi du numéro de la version majeure (par exemple, `nodejs18`, `nodejs20`, etc)

Pour installer Node.js 14.x à partir de la ligne de commande, exécutez la commande suivante en tant qu'utilisateur disposant de l'autorisation spéciale \*ALLOBJ :

```bash
yum install nodejs20
```

Node.js peut également être installé avec le produit IBM i Access Client Solutions. Voir [ce document d'assistance](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) pour plus de détails

## macOS

Téléchargez l'[installateur macOS](/#home-downloadhead) directement depuis le site web [nodejs.org](https://nodejs.org/).

Si vous voulez télécharger le paquet avec bash

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatives

Utilisation de **[Homebrew](https://brew.sh/)** :

```bash
brew install node
```

Utilisation de **[MacPorts](https://www.macports.org/)** :

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Utilisation de **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)** :

Installer le paquet binaire :

```bash
pkgin -y install nodejs
```

Ou compiler manuellement à partir de pkgsrc :

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` est un gestionnaire de version Node.js simple à utiliser pour Mac et Linux. Spécifiez la version cible à installer en utilisant une syntaxe riche,
ou choisissez parmi un menu de versions précédemment téléchargées. Les versions sont installées à l'échelle du système ou de l'utilisateur, et pour une utilisation plus ciblée, vous pouvez exécuter une version directement à partir de votre ordinateur.
Pour une utilisation plus ciblée, vous pouvez exécuter une version directement à partir des téléchargements mis en cache.

Voir la [page d'accueil](https://github.com/tj/n) pour les méthodes d'installation (bootstrap, npm, Homebrew, tierce partie), et tous les détails d'utilisation.

Si vous avez déjà `npm`, l'installation de `n` et de la dernière version LTS de `node` est aussi simple que cela :

```
npm install -g n
n lts
```

## NetBSD

Node.js est disponible dans l'arborescence pkgsrc :

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou installez un paquetage binaire (si disponible pour votre plateforme) en utilisant pkgin :

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` est un gestionnaire de version léger pour les nœuds, similaire à `nvm`. Il est simple et prévisible. Un riche écosystème de plugins vous permet de l'adapter à vos besoins. Utilisez `nodenv` pour choisir une version de Node pour votre application et garantissez que votre environnement de développement correspond à la production.

Les instructions d'installation de Nodenv sont maintenues [sur sa page Github](https://github.com/nodenv/nodenv#installation). Veuillez consulter cette page pour vous assurer que vous suivez la dernière version des étapes d'installation.

## nvm

Node Version Manager est un script bash utilisé pour gérer plusieurs versions de Node.js. Il permet
d'effectuer des opérations telles que l'installation, la désinstallation, le changement de version, etc.
Pour installer nvm, utilisez ce [script d'installation](https://github.com/nvm-sh/nvm#install--update-script).

Sur les systèmes Unix / OS X, Node.js construit à partir des sources peut être installé à l'aide de
[nvm](https://github.com/creationix/nvm) en l'installant à l'emplacement attendu par nvm :

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Après cela, vous pouvez utiliser `nvm` pour basculer entre les versions publiées et les versions
compilées à partir des sources.
Par exemple, si la version de Node.js est v8.0.0-pre :

```bash
nvm use 8
```

Une fois que la version officielle sera disponible, vous voudrez désinstaller la version construite
à partir des sources :

```bash
nvm uninstall 8
```

## nvs

#### Windows

Le gestionnaire de versions `nvs` est multiplateforme et peut être utilisé sur Windows, macOS et les systèmes de type Unix

Pour installer `nvs` sur Windows, allez sur la [page de publication](https://github.com/jasongin/nvs/releases) ici et téléchargez le fichier d'installation MSI de la dernière version.

Vous pouvez également utiliser `chocolatey` pour l'installer :

```bash
choco install nvs
```

#### macOS et tous les systèmes de type Unix

Vous pouvez trouver la documentation concernant les étapes d'installation de `nvs` dans les systèmes macOS/Unix-like [ici](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Usage

Après cela, vous pouvez utiliser `nvs` pour passer d'une version à l'autre de node.

Pour ajouter la dernière version du node :

```bash
nvs add latest
```

Ou d'ajouter la dernière version LTS de node :

```bash
nvs add lts
```

Ensuite, lancez la commande `nvs use` pour ajouter une version de node à votre `PATH` pour l'interpréteur de commandes actuel :

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Pour l'ajouter à `PATH` de façon permanente, utilisez `nvs link` :

```bash
nvs link lts
```

## OpenBSD

Node.js est disponible via le système des ports.

```bash
/usr/ports/lang/node
```

Utilisation de [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) sur OpenBSD :

```bash
pkg_add node
```

## openSUSE et SLE

Node.js est disponible dans les dépôts principaux sous les paquets suivants :

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12** : `nodejs10`, `nodejs12`, et `nodejs14`
(Le "Web et Scripting Module" doit être [activé](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2** : `nodejs10`, `nodejs12`, et `nodejs14`
(Le "Web etScripting Module" doit être [activés](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Par exemple, pour installer Node.js 14.x sur openSUSE Leap 15.2, exécutez ce qui suit en tant que root :

```bash
zypper install nodejs14
```

Différentes versions majeures de Node peuvent être installées et utilisées simultanément.

## SmartOS et illumos

Les images de SmartOS sont livrées avec pkgsrc pré-installé. Sur les autres distributions illumos, installez d'abord **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, puis vous pouvez installer le paquetage binaire normalement :

```bash
pkgin -y install nodejs
```

Ou compiler manuellement à partir de pkgsrc :

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

Les [snaps Node.js](https://github.com/nodejs/snap) sont disponibles en tant que [`node`](https://snapcraft.io/node) sur le magasin Snap.

## Solus

Solus fournit Node.js dans son dépôt principal.

```bash
sudo eopkg install nodejs
```

## vfox

Un gestionnaire de versions multiplateforme (Windows, macOS, Linux) et **extensible**.

Il vous permet de **différentes versions pour différents projets**, **différentes versions pour différents shells**, et de changer de version de Node automatiquement en fonction du répertoire courant, etc.

Il supporte tous les shells populaires (Bash, Zsh, Fish, PowerShell, Clink, Cmder).

Voir le [Démarrage rapide](https://vfox.lhan.me/guides/quick-start.html) pour une utilisation rapide de vfox, et tous les détails d'utilisation.

## Void Linux

Void Linux fournit Node.js stable dans le dépôt principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Téléchargez l'[Installateur Windowsr](/#home-downloadhead) directement depuis le site web [nodejs.org](https://nodejs.org/).

### Alternatives

Utilisation **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Après avoir exécuté l'une des deux commandes ci-dessus, il peut être nécessaire de redémarrer l'émulateur de terminal avant que la commande CLI `node` ne soit disponible.
l'émulateur de terminal avant que la commande CLI `node` ne soit disponible.

Utilisation **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Utilisation **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK pour Node.js - z/OS&reg; est disponible en deux formats d'installation,
SMP/E et PAX. Sélectionnez le format d'installation qui vous convient :

- [Installation et configuration de l'édition SMP/E de Node.js sur z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Installation et configuration de l'édition PAX de Node.js sur z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
