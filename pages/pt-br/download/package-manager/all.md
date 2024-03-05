---
layout: docs
title: Instalando Node.js através do gerenciador de pacotes
---

# Instalando Node.js via Gerenciador de Pacotes

> Os pacotes nesta página são mantidos e suportados por seus respectivos pacotes, **não** à equipe central do Node.js. Por favor relate qualquer problema que você encontrar ao mantenedor do pacote. Se acontecer que seu problema seja um bug no Node.js em si, o mantenedor informará a questão a montante.

***

- [Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora e Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Distribuições Linux baseadas em Debian e Ubuntu](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE and SLE](#opensuse-and-sle)
- [SmartOS e illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Linux alpino

Os pacotes Node.js LTS e npm estão disponíveis no Repositório Principal.

```bash
apk add nodejs npm
```

A corrente do Node.js pode ser instalada pelo Repositório da Comunidade.

```bash
apk add nodejs-current
```

## Android

Suporte ao Android ainda é experimental no Node.js, então binários pré-compilados ainda não são fornecidos por desenvolvedores Node.js.

No entanto, existem algumas soluções de terceiros. Por exemplo, [Termux](https\://termux. A comunidade om/) fornece emulador de terminais e ambiente Linux para Android, bem como o próprio gerenciador de pacotes e a [coleção extensa](https\://github. de muitas aplicações pré-compiladas/termux/termux-packages) de muitas aplicações pré-compiladas. Este comando no aplicativo Termux instalará a última versão disponível do Node.js:

```bash
pkg install nodejs
```

Atualmente, os binários de Termux Node.js estão ligados ao `system-icu` (dependendo do pacote `libicu`).

## Arquitetura Linux

Os pacotes Node.js e npm estão disponíveis no Repositório da Comunidade.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora e Red Hat Enterprise Linux

Node.js está disponível como um módulo chamado `nodejs` em CentOS/RHEL 8 e Fedora.

```bash
dnf module install nodejs:<stream>
```

onde `<stream>` corresponde à versão principal do Node.js.
Para ver uma lista dos fluxos disponíveis:

```bash
dnf module list nodejs
```

Por exemplo, para instalar o Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternativas

Esses recursos fornecem pacotes compatíveis com a CentOS, Fedora e RHEL.

- [snaps do Node.js](#snap) mantiveram e suportadas em https\://github.com/nodejs/snap
- [distribuições binárias do Node.js](#debian-and-ubuntu-based-linux-distributions) mantidas e apoiadas por [NodeSource](https://github.com/nodesource/distributions)

## Distribuições Linux baseadas em Debian e Ubuntu

[distribuições binárias do Node.js](https://github.com/nodesource/distributions) estão disponíveis no NodeSource.

### Alternativas

Pacotes compatíveis com as distribuições do Debian e Ubuntu baseadas em Linux estão disponíveis através dos [snaps do Node.js](#snap).

## fnm

Gestor de versão do Node.js simples e rápido, criado com o Rust usado para gerenciar múltiplas versões do Node.js lançadas. Ele permite que você execute operações como instalar, desinstalar e alternar as versões do Node automaticamente baseadas no diretório atual, etc.
Para instalar fnm, use este [script de instalação](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm tem suporte multiplataforma (macOS, Windows, Linux) e todas as cascas populares (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm é construído com velocidade em mente e suporte a compatibilidade dos arquivos `.node-version` e `.nvmrc`.

## BSD

A versão mais recente do Node.js está disponível através da porta [www/node](https://www.freshports.org/www/node).

Instalar um pacote binário via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Ou compile-o por sua conta usando [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js está disponível na árvore de portagens.

```bash
emerge nodejs
```

## IBM I

As versões LTS do Node.js estão disponíveis na IBM e estão disponíveis via [gerenciador de pacotes ''yum'](https://ibm.biz/ibmi-rpms). O nome do pacote é `nodejs` seguido do número da versão maior (por exemplo, `nodejs18`, `nodejs20` etc)

Para instalar o Node.js 20.x da linha de comando, execute o seguinte como um usuário com a autoridade especial \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js também pode ser instalado com o produto de soluções de cliente IBM. Veja [este documento de suporte](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) para mais detalhes

## macOS

Baixe o [instalador do macOS](/#home-downloadhead) diretamente do site do [nodejs.org](https://nodejs.org/).

_Se você quiser baixar o pacote com o bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativas

Usando **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Usando **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Usando **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Instale o pacote binário:

```bash
pkgin -y install nodejs
```

Ou construir manualmente a partir de pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` é simples de usar o gerenciador de versões Node.js para Mac e Linux. Especifique a versão de destino para instalar usando uma sintaxe rica,
ou selecione um menu das versões baixadas anteriormente. As versões são instaladas, em todo o sistema ou para todo o usuário, e para mais uso direcionado
você pode executar uma versão diretamente a partir dos downloads armazenados em cache.

Veja o [homepage](https://github.com/tj/n) para instalar métodos (bootstrap, npm, Homebrew, terceiros) e todos os detalhes de uso.

Se você já tem o `npm` então instalando `n` e então a nova versão do `node` é tão simples como:

```
npm install -g n
n lts
```

## NetBSD

Node.js está disponível na árvore pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou instale um pacote binário (se disponível para sua plataforma) usando pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` é um gerenciador de versão de nó leve semelhante, similar ao `nvm`. É simples e previsível. Um ecossistema de plugins rico permite que você o adapte às suas necessidades. Use `nodenv` para escolher uma versão do Node para sua aplicação e garantir que seu ambiente de desenvolvimento corresponde à produção.

Instruções de instalação do Nodenv são mantidas [na sua página do Github](https://github.com/nodenv/nodenv#installation). Por favor, visite essa página para garantir que você está seguindo a versão mais recente dos passos de instalação.

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

Em Unix / OS X systems Node.js construídos a partir da fonte pode ser instalado usando
[nvm](https://github.com/creationix/nvm) instalando no local que o nvm espera:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Depois disso, você pode usar o `nvm` para alternar entre versões lançadas e versões
construídas da origem.
Por exemplo, se a versão do Node.js for a v8.0.0-pre:

```bash
nvm use 8
```

Uma vez que a versão oficial for lançada, você vai querer desinstalar a versão criada
da fonte:

```bash
nvm uninstall 8
```

## nvs

#### Janelas

O gerenciador de versões `nvs` é multiplataforma e pode ser usado no Windows, macOS e no sistema Unix-like

Para instalar o `nvs` no Windows vá para a [página de lançamento](https://github.com/jasongin/nvs/releases) aqui e baixe o arquivo do instalador MSI da versão mais recente.

Você também pode usar o `chocolatey` para instalá-lo:

```bash
choco install nvs
```

#### macOS,UnixLike

Você pode encontrar a documentação sobre os passos de instalação de `nvs` no macOS/Unix-like systems [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Utilização

Depois disso você pode usar o `nvs` para alternar entre diferentes versões do nó.

Para adicionar a versão mais recente do nó:

```bash
nvs add latest
```

Ou para adicionar a versão mais recente do nó LTS:

```bash
nvs add lts
```

Então execute o comando `nvs use` para adicionar uma versão do nó ao seu `PATH` para o shell atual:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Para adicioná-lo ao `PATH` permanentemente, use o `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js está disponível através do sistema de portas.

```bash
/usr/ports/lang/node
```

Usando o [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) no OpenBSD:

```bash
pkg_add node
```

## openSUSE e SLE

Node.js está disponível nos repositórios principais nos seguintes pacotes:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, e `nodejs14`
  (O "Web and Scripting Module" deve ser [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (O "Web and Scripting Module" deve ser [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Por exemplo, para instalar o Node.js 14.x no openSUSE Leap 15.2, execute o seguinte como root:

```bash
zypper install nodejs14
```

Diferentes versões maiores do Node podem ser instaladas e usadas simultaneamente.

## SmartOS e illumos

Imagens SmartOS vêm com pkgsrc pré-instaladas. Em outras distribuições do illumos, primeiro instale **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, então você pode instalar o pacote binário como normal:

```bash
pkgin -y install nodejs
```

Ou construir manualmente a partir de pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Capturar

[snaps do Node.js](https://github.com/nodejs/snap) estão disponíveis como [`node`](https://snapcraft.io/node) na loja do Snap.

## Solus

O Solus fornece o Node.js em seu repositório principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

O Void Linux navio Node.js estável no repositório principal.

```bash
xbps-install -Sy nodejs
```

## Janelas

Baixe o [instalador Windows](/#home-downloadhead) diretamente do [nodejs.org](https://nodejs.org/) web site.

### Alternativas

Usando **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Depois de executar um dos dois comandos acima, pode ser necessário reiniciar o emulador de terminal
antes que o comando `node` CLI fique disponível.

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Usando **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/S.O.

IBM&reg; SDK para Node.js - z/OS&reg; está disponível em dois formatos de instalação,
SMP/E e PAX. Selecione o formato de instalação que se aplica a você:

- [Instalando e configurando a edição SMP/E do Node.js no z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Instalando e configurando a edição PAX do Node.js no z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
