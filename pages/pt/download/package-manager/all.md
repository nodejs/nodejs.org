---
layout: download
title: Instalação da Node.js através do Gestor de Pacote
---

# Instalação da Node.js através dos Gestores de Pacote

> Os pacotes nesta página são mantidos e suportados por seus respetivos empacotadores, **não** pela equipa principal da Node.js. Precisamos reportar quaisquer problemas que encontrarmos ao responsável do pacote. Se o nosso problema for um erro de programação na própria Node.js, o responsável reportará o problema.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora e Red Hat Enterprise Linux](#centos-fedora-e-red-hat-enterprise-linux)
- [Distribuições de Linux baseadas em Debian e Ubuntu](#distribuicoes-de-linux-baseadas-em-debian-e-ubuntu)
- [Exherbo Linux](#exherbo-linux)
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
- [openSUSE e SLE](#opensuse-e-sle)
- [SmartOS e illumos](#smartos-e-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [vfox](#vfox)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Linux Alpino

Os pacotes da Node.js com suporte de longo prazo e npm estão disponíveis no repositório principal.

```bash
apk add nodejs npm
```

A versão atual da Node.js pode ser instalada a partir do repositório da comunidade.

```bash
apk add nodejs-current
```

## Android

O suporte de Android ainda é experimental na Node.js, pelo que os binários pré-compilados ainda não são fornecidos pelos programadores da Node.js.

No entanto, existem algumas soluções de terceiros. Por exemplo, a comunidade da [Termux](https://termux.com/) fornece um emulador de terminal e um ambiente de Linux para Android, bem como um gestor de pacote e uma [vasta coleção](https://github.com/termux/termux-packages) de muitas aplicações pré-compiladas. Este comando na aplicação Termux instalará a última versão disponível da Node.js:

```bash
pkg install nodejs
```

Atualmente, os binários da Node.js da Termux estão ligados ao `system-icu` (dependendo do pacote `libicu`).

## Linux Arch

Os pacotes da Node.js e npm estão disponíveis no repositório da comunidade.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora e Red Hat Enterprise Linux

A Node.js está disponível como um módulo chamado `nodejs` no CentOS/RHEL 8 e Fedora.

```bash
dnf module install nodejs:<stream>
```

onde `<stream>` corresponde à versão principal da Node.js. Para ver uma lista de fluxos disponíveis:

```bash
dnf module list nodejs
```

Por exemplo, para instalar a Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternativas

Estes recursos fornecem pacotes compatíveis com CentOS, Fedora, e RHEL.

- [Os snaps da Node.js](#snap) mantidos e suportados na https://github.com/nodejs/snap
- [Distribuições binárias da Node.js](#distribuicoes-de-linux-baseadas-em-debian-e-ubuntu) mantidas e suportadas pela [NodeSource](https://github.com/nodesource/distributions)

## Distribuições de Linux baseadas em Debian e Ubuntu

As [distribuições binárias da Node.js](https://github.com/nodesource/distributions) estão disponíveis a partir da NodeSource.

### Alternativas

Os pacotes compatíveis com as distribuições de Linux baseadas em Debian e Ubuntu estão disponíveis através dos [snaps da Node.js](#snap).

## Exherbo Linux

Os pacotes da Node.js e npm estão disponíveis no [repositório da arbor](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node).

```bash
cave resolve -x node
```

## fnm

Rápido e simples gestor de versão da Node.js, construído em Rust, usado para gerir várias versões lançadas da Node.js. Permite-nos realizar operações como instalar, desinstalar, mudar automaticamente as versões da Node com base no diretório atual, etc.
Para instalar o `fnm`, usamos este [programa de instalação](https://github.com/Schniz/fnm#using-a-script-macoslinux).

O `fnm` suporta várias plataformas (macOS, Windows, Linux) & todas as conchas populares (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
O `fnm` foi construído com a velocidade em mente e suporte de compatibilidade para ficheiros `.node-version` e `.nvmrc`.

## FreeBSD

O lançamento mais recente da Node.js está disponível através da porta [www/node](https://www.freshports.org/www/node).

Instalamos um pacote binário através do [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Ou o compilamos nós mesmos usando as [portas](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

A Node.js está disponível na árvore de transporte.

```bash
emerge nodejs
```

## IBM i

As versões de suporte de longo prazo da Node.js estão disponíveis a partir da IBM, e estão disponíveis através do [gestor de pacote `yum`](https://ibm.biz/ibmi-rpms). O nome do pacote é `nodejs` seguido pelo número da versão principal (por exemplo, `nodejs18`, `nodejs20`, etc).

Para instalar a Node.js 20.x a partir da linha de comando, executamos o seguinte como um utilizador com autorização especial \*ALLOBJ:

```bash
yum install nodejs20
```

A Node.js também pode ser instalada com o produto de soluções de cliente de acesso IBM i. Consultar [este documento de suporte](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) por mais detalhes.

## macOS

Descarregamos o [instalador do macOS](/#home-downloadhead) diretamente a partir do sítio da Web [nodejs.org](https://nodejs.org/).

_Se quisermos descarregar o pacote com o bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativas

Com o uso do **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Com o uso do **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Com o uso do **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Instalar o pacote binário:

```bash
pkgin -y install nodejs
```

Ou construir manualmente a partir do `pkgsrc`:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` é um gestor de versão da Node.js simples de usar para Mac e Linux. Especificamos a versão de destino a instalar usando uma sintaxe rica, ou selecionamos a partir de um menu de versões previamente descarregadas. As versões são instaladas em todo o sistema ou em todo o utilizador, e para um uso mais específico, podemos executar uma versão diretamente a partir das transferências provisionadas.

Consultar a [página principal](https://github.com/tj/n) por métodos de instalação (inicialização, npm, Homebrew, terceiros) e todos os detalhes de uso.

Se já tivermos o `npm`, então instalar o `n` e depois a versão mais recente da `node` com suporte de longo prazo é tão simples quanto:

```
npm install -g n
n lts
```

## NetBSD

A Node.js está disponível na árvore do `pkgsrc`:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou instalamos um pacote binário (se estiver disponível para nossa plataforma) usando `pkgin`:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodeenv` é um gestor de versão de Node leve, semelhante ao `nvm`. É simples e previsível. Um rico ecossistema de extensão permite-nos adaptá-lo às nossas necessidades. Usamos `nodenv` para escolher uma versão de Node para a nossa aplicação e garantir que o nosso ambiente de desenvolvimento seja igual ao de produção.

As instruções de instalação da Nodeenv são mantidos [na sua página da GitHub](https://github.com/nodenv/nodenv#installation). Precisamos visitar esta página para assegurar que seguimos versão mais recente dos passos de instalação.

## nvm

O gestor de versão da Node é um programa de bash usado para gerir várias versões lançadas da Node.js. Permite-nos realizar operações como instalar, desinstalar, alternar versão, etc. Para instalar a `nvm`, usamos este [programa de instalação](https://github.com/nvm-sh/nvm#install--update-script).

Nos sistemas Unix ou OS X, a Node.js construída a partir do código-fonte pode ser instalada usando [nvm](https://github.com/creationix/nvm) ao instalar numa localização esperada pelo `nvm`:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Depois disto, podemos usar o `nvm` para alternar entre versões lançadas e versões construídas a partir do código-fonte. Por exemplo, se a versão da Node.js for v8.0.0-pre:

```bash
nvm use 8
```

Quando a versão oficial for lançada, desejaremos desinstalar a versão construída a partir do código-fonte:

```bash
nvm uninstall 8
```

## nvs

#### Windows

O gestor de versão `nvs` suporta várias plataformas e pode ser usado no Windows, macOS, e sistemas parecidos com Unix.

Para instalar `nvs` no Windows seguimos para [página de lançamento](https://github.com/jasongin/nvs/releases) e descarregamos o ficheiro instalador MSI do lançamento mais recente.

Nós também podemos usar `chocolatey` para instalá-lo:

```bash
choco install nvs
```

#### macOS,UnixLike

Podemos encontrar documentação sobre os passos de instalação do `nvs` nos sistemas macOS ou parecidos com Unix [nesta hiperligação](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux).

#### Uso

Depois disto podemos usar `nvs` para alternar entre diferentes versões da Node.

Para adicionar a versão mais recente da Node:

```bash
nvs add latest
```

Ou adicionar a versão mais recente com suporte de longo prazo da Node:

```bash
nvs add lts
```

Depois executamos o comando `nvs use` para adicionar uma versão de Node ao `PATH` para concha atual:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Para adicioná-lo ao `PATH` permanentemente, usamos `nvs link`:

```bash
nvs link lts
```

## OpenBSD

A Node.js está disponível através do sistema de portas.

```bash
/usr/ports/lang/node
```

Com o uso do [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) no OpenBSD:

```bash
pkg_add node
```

## openSUSE e SLE

A Node.js está disponível nos repositórios principais sob os seguintes pacotes:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, e `nodejs14` (O "Web and Scripting Module" deve estar [ativado](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, e `nodejs14` (O "Web and Scripting Module" deve estar [ativado](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Por exemplo, para instalar a Node.js 14.x no openSUSE Leap 15.2, executamos o seguinte como administrador (root ou raiz):

```bash
zypper install nodejs14
```

Diferentes versões principais da Node podem ser instaladas e usadas simultaneamente.

## SmartOS e illumos

As imagens do SmartOS vêm com `pkgsrc` pré-instalado. Em outras distribuições de illumos, primeiro instalamos **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, depois podemos instalar o pacote binário conforme o habitual:

```bash
pkgin -y install nodejs
```

Ou compilar manualmente a partir do `pkgsrc`:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

Os [snaps da Node.js](https://github.com/nodejs/snap) estão disponíveis como [`node`](https://snapcraft.io/node) na loja da Snap.

## Solus

O Solus fornece a Node.js no seu repositório principal.

```bash
sudo eopkg install nodejs
```

## vfox

Um gestor de versão que suporta várias plataformas (Windows, macOS, Linux) e **extensível**.

Permite-nos **diferenciar versões para diferentes projetos**, **diferenciar versões para diferentes conchas**, e alternar versões da Node automaticamente com base no diretório atual, etc.

Suporta todas as conchas populares (Bash, Zsh, Fish, PowerShell, Clink, Cmder).

Consultar a [Introdução Rápida](https://vfox.lhan.me/guides/quick-start.html) para rapidamente usar o `vfox`, e todos os detalhes de uso.

## Void Linux

O Void Linux entrega a Node.js estável no repositório principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Descarregamos o [instalador da Node.js](/#home-downloadhead) diretamente a partir do sítio da Web [nodejs.org](https://nodejs.org/).

### Alternativas

Com o uso do **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Após executarmos um dos dois comandos acima, pode ser necessário reiniciar o emulador de terminal antes do comando `node` da interface da linha de comando torne-se disponível.

Com o uso do **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Com o uso do **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK para Node.js — z/OS&reg; está disponível em dois formatos de instalação, SMP/E e PAX. Selecionamos o formato de instalação que se aplica a nós:

- [Instalar e configurar a edição SMP/E da Node.js no z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Instalar e configurar a edição PAX da Node.js no z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
