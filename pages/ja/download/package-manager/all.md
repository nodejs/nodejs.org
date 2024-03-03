---
layout: docs.hbs
title: パッケージマネージャを介した Node.js のインストール
---

# パッケージマネージャーを介した Node.js のインストール

> このページのパッケージは、それぞれのパッケージによってメンテナンスされ、サポートされています。Node.js のコアチームではありません。 発生した問題については、パッケージメンテナに報告してください。 Node.js 自体のバグが問題であることが判明した場合、メンテナは問題を上流に報告します。

***

- format@@0(#alpine-linux)
- [Android](#android)
- format@@0(#arch-linux)
- [CentOS, Fedora と Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- format@@0(#debian-and-ubuntu-based-linux-distributions)
- [fnm](#fnm)
- [FreeBSD](#freebsd)
- [Gentoo](#gentoo)
- format@@0(#ibm-i)
- [macOS](#macos)
- [n](#n)
- [NetBSD](#netbsd)
- [Nodenv](#nodenv)
- [nvm](#nvm)
- [nvs](#nvs)
- [OpenBSD](#openbsd)
- format@@0(#opensuse-and-sle)
- format@@0(#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- format@@0(#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Alpine Linux

Node.js LTS および npm パッケージはメインリポジトリで使用できます。

```bash
apk add nodejs npm
```

Node.js Current はコミュニティリポジトリからインストールできます。

```bash
apk add nodejs-current
```

## Android

Node.jsではAndroidのサポートはまだ実験的なので、コンパイル済みのバイナリはまだNode.jsの開発者によって提供されていません。

ただし、いくつかのサードパーティの解決策があります。例えば、 [Termux](https://termux) om/) コミュニティは、Android向けのターミナルエミュレータとLinux環境、および独自のパッケージマネージャとformat@@0(https\://github) を提供します。 多くのプリコンパイル済みアプリケーションの om/termux/termux-packages) 。Termux アプリケーションのこのコマンドは、最後に使用可能な Node.js バージョンをインストールします。

```bash
pkg install nodejs
```

現在、Termux Node.js のバイナリは `system-icu` にリンクされています(`libicu`パッケージに依存します)。

## Arch Linux

Node.js と npm パッケージはコミュニティリポジトリで使用できます。

```bash
pacman -S nodejs npm
```

## CentOS、Fedora および Red Hat Enterprise Linux

Node.jsはCentOS/RHEL 8とFedoraに`nodejs`と呼ばれるモジュールとして利用できます。

```bash
dnf module install nodejs:<stream>
```

`<stream>`は、Node.jsのメジャーバージョンに対応しています。
利用可能なストリームのリストを表示するには、次のようにします。

```bash
dnfモジュールはnodejsを一覧表示します
```

例えば、Node.js 18をインストールします。

```bash
dnfモジュールはnodejsをインストール:18/common
```

### 代替

これらのリソースは CentOS、Fedora、および RHELと互換性のあるパッケージを提供します。

- [Node.js snaps](#snap) が維持され、https\://github.com/nodejs/snap でサポートされています
- [Node.js binary distributions](#debian-and-ubuntu-based-linux-distributions) maintained and supported by [NodeSource](https://github.com/nodesource/distributions)

## Debian および Ubuntu ベースの Linux ディストリビューションです

NodeSourceからは[Node.jsバイナリディストリビューション](https://github.com/nodesource/distributions)が利用できます。

### 代替

Debian および Ubuntu ベースの Linux ディストリビューションと互換性のあるパッケージは [Node.js snaps](#snap) から入手できます。

## fnm

Rustで構築された高速でシンプルなNode.jsのバージョン管理は、複数のリリースされたNode.jsのバージョン管理に使用されます。 インストール、アンインストール、ノードのバージョンを現在のディレクトリに基づいて自動的に切り替えるなどの操作を実行できます。
fnmをインストールするには、以下の[install script](https://github.com/Schniz/fnm#using-a-script-macoslinux)を使用してください。

fnmはクロスプラットフォームサポート(macOS、Windows、Linux)と人気のあるすべてのシェル(Bash、Zsh、Fish、PowerShell、Windowsコマンドラインプロンプト)をサポートしています。
fnmは、 `.node-version` と `.nvmrc` ファイルの互換性と速度を念頭に置いて構築されています。

## FreeBSD

Node.js の最新リリースは、[www/node](https://www.freshports.org/www/node) ポートから入手できます。

[pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg インストールノード
```

または、 [ports](https://www.freebsd.org/cgi/man.cgi?ports)を使用して独自にコンパイルしてください。

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js は、portage ツリーで使用できます。

```bash
nodejsをemergeする
```

## IBM i

LTSバージョンのNode.jsはIBMから利用可能で、format@@0(https\://ibm.biz/ibmi-rpms)から利用できます。 パッケージ名は `nodejs` で、メジャーバージョン番号が続きます(例えば、 `nodejs18` 、 `nodejs20` など)。

Node.js 20.x をコマンドラインからインストールするには、\*ALLOBJ 特別な権限を持つユーザとして以下を実行します。

```bash
yum install nodejs20
```

Node.js は、IBM i Access Client Solutions 製品でもインストールできます。詳細については、format@@0(http\://www-01.ibm.com/support/docview\.wss?uid=nas8N1022619) を参照してください。

## macOS

Download the [macOS Installer](/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

_もし bash でパッケージをダウンロードしたい場合:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 代替

\*\*[Homebrew](https://brew.sh/)\*\*を使用します。

```bash
brew install node
```

使用\*\*[MacPorts](https://www.macports.org/)\*\*:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Using **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

バイナリパッケージをインストールします。

```bash
pkgin -y install nodejs
```

または、pkgsrcから手動でビルドします。

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` is a simple to use Node.js version manager for Mac and Linux. Specify the target version to install using a rich syntax,
or select from a menu of previously downloaded versions. The versions are installed system-wide or user-wide, and for more
targeted use you can run a version directly from the cached downloads.

installメソッド(bootstrap, npm, Homebrew, third-party)については、 [homepage](https://github.com/tj/n)と全ての使い方の詳細を参照してください。

すでに`npm`がある場合、`n`をインストールし、最新のLTSの`node`バージョンは以下のように簡単です。

```
npm install -g n
n lts
```

## NetBSD

Node.js は pkgsrc ツリーで使用できます。

```bash
cd /usr/pkgsrc/lang/node.js && make install
```

または、pkginを使用してバイナリパッケージをインストールします(プラットフォームで利用可能な場合)。

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv`は、`nvm`に似た軽量なノードバージョンマネージャです。 シンプルで予測可能です。豊富なプラグインエコシステムを使用すると、ニーズに合わせてカスタマイズできます。 アプリケーションの Node バージョンを選択するには、`nodenv` を使用し、開発環境が本番環境と一致することを保証します。

Nodenvのインストール手順はformat@@0(https\://github.com/nodenv/nodenv#installation)に維持されています。インストール手順の最新バージョンを確認するには、そのページをご覧ください。

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

On Unix / OS X systems Node.js built from source can be installed using
[nvm](https://github.com/creationix/nvm) by installing into the location that nvm expects:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDER=`nvm_version_path v$VERSION` PREFIX=char@@1
```

After this you can use `nvm` to switch between released versions and versions
built from source.
For example, if the version of Node.js is v8.0.0-pre:

```bash
nvmで8を使う
```

公式リリースが終わったら、ソースから
ビルドされたバージョンをアンインストールします。

```bash
nvmアンインストール8
```

## nvs

#### Windows

`nvs`バージョンマネージャはクロスプラットフォームで、Windows、macOS、Unixライクなシステムで使用できます。

Windowsに`nvs`をインストールするには、format@@0(https\://github.com/jasongin/nvs/releases)からMSIインストーラをダウンロードしてください。

`chocolatey`を使ってインストールすることもできます。

```bash
choco install nvs
```

#### macOS,UnixLike

`nvs` のインストール手順については、macOS/Unix ライクなシステム [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP/SETUP.md#mac-linux) に記載されています。

#### 使用法

この後、 `nvs` を使って異なるバージョンのノードを切り替えることができます。

最新バージョンのノードを追加するには:

```bash
nvs 最新の追加
```

または、最新のLTSバージョンのノードを追加するには:

```bash
nvs lt を追加
```

`nvs use`を実行して、現在のシェルの`PATH`にノードのバージョンを追加します。

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

`PATH`に恒久的に追加するには、`nvsリンク`を使用します。

```bash
nvs link lts
```

## OpenBSD

Node.js はポートシステムを通じて利用できます。

```bash
/usr/ports/lang/node
```

OpenBSD で [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) を使用:

```bash
pkg_add ノード
```

## openSUSE と SLE

Node.js は、以下のパッケージのメインリポジトリで利用できます。

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SSEE-SLES/12-SP5/#intro-modulesExtensionsRelated)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

例えば、openSUSE Leap 15.2 に Node.js 14.x をインストールするには、root として以下を実行します。

```bash
zypper install nodejs14
```

異なるメジャーバージョンの Node を同時にインストールして使用できます。

## SmartOSとillumos

SmartOSイメージにはpkgsrcがプリインストールされています。他のillumosディストリビューションでは、まず\*\*[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)\*\*をインストールしてください。バイナリパッケージは通常のものとしてインストールできます。

```bash
pkgin -y install nodejs
```

または、pkgsrcから手動でビルドします。

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## スナップ

format@@0(https\://github.com/nodejs/snap) は Snap ストアの [`node`](https://snapcraft.io/node) として利用できます。

## Solus

Solus はメインリポジトリに Node.js を提供します。

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux はメイン リポジトリで Node.js を安定して出荷します。

```bash
xbps-install -Sy nodejs
```

## Windows

Download the [Windows Installer](/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### 代替

\*\*[Winget](https://aka.ms/winget-cli)\*\*を使用:

```bash
winget install OpenJS.NodeJS
# or LTS
winget install OpenJS.NodeJS.LTS
```

上記の2つのコマンドのいずれかを実行した後、`node` CLI コマンドが利用可能になる前に、
ターミナルエミュレータを再起動する必要があるかもしれません。

\*\*[Chocolatey](https://chocolatey.org/)\*\*を使用:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

\*\*[Scoop](https://scoop.sh/)\*\*を使用します。

```bash
scoop install nodejs
# or LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; は
SMP/E と PAX の2つのインストール形式で利用できます。 あなたに適用されるインストール形式を選択してください:

- format@@0(https\://www\.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- format@@0(https\://www\.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
