---
layout: page.hbs
title: Instalando Node.js via gerenciador pacotes
---

# Instalando Node.js via gerenciador pacotes

***Nota:*** Os pacotes nessa página são mantidos e suportados por seus respectivos empacotadores, **não** pela equipe principal do Node.js. Por favor, relate quaisquer problemas encontrados para o mantenedor do pacote. Se o problema for um bug no próprio Node.js, o mantenedor deve relatar para o issue upstream.

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Debian e Distribuições Linux baseadas em Ubuntu, Enterprise Linux/Fedora e pacotes Snap](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [NetBSD](#ibm-i)
* [nvm](#netbsd)
* [OpenBSD](#nvm)
* [openSUSE e SLE](#openbsd)
* [macOS](#opensuse-and-sle)
* [SmartOS e illumos](#macos)
* [Solus](#smartos-and-illumos)
* [Void Linux](#solus)
* [Windows](#void-linux)
* [Windows](#windows)

---

## Android

O suporte ao Android ainda é experimental no Node.js, portanto, os binários pré-compilados ainda não são fornecidos pelos desenvolvedores do Node.js

Entretanto, existem algumas soluções de terceiros. Por exemplo, a comunidade [Termux](https://termux.com/) que fornece um emulador de terminal e ambiente Linux para Android, assim como seu próprio gerenciador de pacotes e [extensa coleção](https://github.com/termux/termux-packages) com muitas aplicações pré-compiladas. Esse comando vai instalar a última versão disponível do Node.js no Termux:

```bash
pkg install nodejs
```

Atualmente, os binários do Node.js no Termux estão ligados ao `system-icu` (dependência do pacote `libicu`)

## Arch Linux

Os pacotes para o Node.js e o npm estão disponíveis no Repositório da Comunidade.

```bash
pacman -S nodejs npm
```

## Debian e Distribuições Linux baseadas em Ubuntu, Enterprise Linux/Fedora e pacotes Snap

[Distribuição dos binários oficiais do Node.js](https://github.com/nodesource/distributions/blob/master/README.md) são fornecidos pelo NodeSource.

## FreeBSD

A versão mais recente do Node.js está disponível na porta [www/node](https://www.freshports.org/www/node).

Instale um pacote binário via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Ou compile-o por conta própria usando [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

O Node.js está disponível no diretório portage.

```bash
emerge nodejs
```

## NetBSD

Node.js está disponível no diretório pkgsrc:

Ou instale um pacote binário (se estiver disponível para sua plataforma) usando pkgin:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Node Version Manager é um script bash utilizado para gerenciar múltiplas versões do Node.js. Ele Permite que você instale, desinstale, mude de versão e etc. Para instalar o nvm, use esse [script de instalação](https://github.com/nvm-sh/nvm#install--update-script).

## nvm

Em sistemas Unix / OS X o Node.js compilado a partir do código fonte pode ser instalado usando [nvm](https://github.com/creationix/nvm), instalando-o no local em que o nvm espera:

```bash
pkgin -y install nodejs
```

Despois disso, você pode usar o `nvm` para alternar entre versões lançadas e versões compiladas a partir do código fonte. Por exemplo, se a versão do Node.js é v8.0.0-pre:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

## OpenBSD
Uma vez que a versão oficial for lançada você pode querer desinstalar a versão compilada a partir do código fonte:

O Node.js está disponível através das portas do sistema.

```bash
nvm use 8
```

Usando [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) no OpenBSD:

```bash
nvm uninstall 8
```

Node.js está disponível nos principais repositórios sob os seguintes pacotes:

```bash
/usr/ports/lang/node
```

## openSUSE e SLE

Por exemplo, para instalar o Node.js 4.x no openSUSE 42.2, execute o seguinte como root:

```bash
pkg_add node
```

Basta baixar o [macOS Installer](https://nodejs.org/pt-br/#home-downloadhead) diretamente do site [nodejs.org](https://nodejs.org/).

```bash
zypper install nodejs4
```

## macOS

Node.js is available in the main repositories under the following packages:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6` (O "Web and Scripting Module" deve ser [adicionado antes da instalação](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

Usando **[Homebrew](https://brew.sh/)**:

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

## SmartOS e illumos

Usando **[MacPorts](https://www.macports.org/)**:

_If you want to download the package with bash:_

```bash
brew install node
```

### Alternativas

Instale o pacote binário:

```bash
port install nodejs<major version>

# Exemplo
port install nodejs7
```

Ou compile manualmente pelo pkgsrc:

```bash
pkgin -y install nodejs
```

Imagens do SmartOS vêm com o pkgsrc pré-instalado. Em outras distribuições illumos, primeiro instale **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, então você pode instalar o binário normalmente:

Ou compile manualmente pelo pkgsrc:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

O Solus fornece o Node.js em seu repositório principal.

```bash
pkgin -y install nodejs
```

## Solus

Void Linux possui versões estáveis de Node.js no seu repositório principal.

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

O Solus fornece o Node.js em seu repositório principal.

```bash
pkgin -y install nodejs
```

## Void Linux

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
xbps-install -Sy nodejs
```

## Windows

Usando **[Scoop](https://scoop.sh/)**:

```bash
cinst nodejs
# ou para a instalação completa com npm
cinst nodejs.install
```

## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### Alternativas

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
scoop install nodejs
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
