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
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [nvs](#nvs)
* [OpenBSD](#openbsd)
* [openSUSE e SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS e illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows-1)

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

## Debian e distribuições Linux basedas em Ubuntu, Enterprise Linux/Fedora e pacotes Snap

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

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou instale um pacote binário (se estiver disponível para sua plataforma) usando pkgin:

```bash
pkgin -y install nodejs
```

## nvm

Node Version Manager é um script bash utilizado para gerenciar múltiplas versões do Node.js. Ele Permite que você instale, desinstale, mude de versão e etc. Para instalar o nvm, use esse [script de instalação](https://github.com/nvm-sh/nvm#install--update-script).

Em sistemas Unix / OS X o Node.js compilado a partir do código fonte pode ser instalado usando [nvm](https://github.com/creationix/nvm), instalando-o no
local em que o nvm espera:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Despois disso, você pode usar o `nvm` para alternar entre versões lançadas e versões
compiladas a partir do código fonte.
Por exemplo, se a versão do Node.js é v8.0.0-pre:

```bash
nvm use 8
```

Uma vez que a versão oficial for lançada você pode querer desinstalar a versão compilada
a partir do código fonte:

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

O Node.js está disponível através das portas do sistema.

```bash
/usr/ports/lang/node
```

Usando [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) no OpenBSD:

```bash
pkg_add node
```

## openSUSE e SLE

Node.js está disponível nos principais repositórios sob os seguintes pacotes:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6`
  (O "Web and Scripting Module" deve ser [adicionado antes da instalação](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

Por exemplo, para instalar o Node.js 4.x no openSUSE 42.2, execute o seguinte como root:

```bash
zypper install nodejs4
```

## macOS

Basta baixar o [macOS Installer](https://nodejs.org/pt-br/#home-downloadhead) diretamente do site [nodejs.org](https://nodejs.org/).

_Se desejar baixar o pacote com bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativas

Usando **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Usando **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Exemplo
port install nodejs7
```

Usando **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Instale o pacote binário:

```bash
pkgin -y install nodejs
```

Ou compile manualmente pelo pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS e illumos

Imagens do SmartOS vêm com o pkgsrc pré-instalado. Em outras distribuições illumos, primeiro instale **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, então você pode instalar o binário normalmente:

```bash
pkgin -y install nodejs
```

Ou compile manualmente pelo pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

O Solus fornece o Node.js em seu repositório principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux possui versões estáveis de Node.js no seu repositório principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Baixe o [Windows Installer](https://nodejs.org/pt-br/#home-downloadhead) diretamente do site [nodejs.org](https://nodejs.org/).

### Alternativas

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# ou para a instalação completa com npm
cinst nodejs.install
```

Usando **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
