---
layout: article
title: パッケージマネージャーを利用したNode.jsのインストール
---

# パッケージマネージャーを利用したNode.jsのインストール

> このページにあるパッケージはNode.jsコアチームではなく、それぞれのパッケージの管理者によって管理・サポートされています。問題が発生した場合は、パッケージの管理者に報告してください。問題がNode.js自体の問題であることが判明した場合、パッケージの管理者がその問題をNode.jsに報告します。

## Alpine Linux

Node.jsのLTSとnpmがメインリポジトリーから利用できます。

```bash
apk add nodejs npm
```

Node.jsのCurrentはコミュニティーリポジトリーからインストールできます。

```bash
apk add nodejs-current
```

## Android

AndroidのサポートはNode.jsではまだ実験的なものです。Node.js開発者によるコンパイル済みバイナリーはまだ提供されていません。

しかしながらサードパーティーによるソリューションはあります。例えば、[Termux](https://termux.com/)コミュニティーはAndroid用にターミナルエミュレーターとLinux環境を提供しています。独自にパッケージマネージャーと多くのコンパイル済みアプリケーションの[さまざまなコレクション](https://github.com/termux/termux-packages)を用意しています。

```bash
pkg install nodejs
```

現在、TermuxのNode.jsバイナリーは`system-icu`にリンクされています（`libicu`パッケージに依存）。

## Arch Linux

Node.jsとnpmがコミュニティーリポジトリーから利用できます。

```bash
pacman -S nodejs npm
```

## CentOS, Fedora and Red Hat Enterprise Linux

CentOS/RHEL 8とFedoraでは`nodejs`というモジュールとしてNode.jsが利用できます。

```bash
dnf module install nodejs:<stream>
```

`<stream>`にはNode.jsのメジャーバージョンが当てはまります。利用できるstreamは次のコマンドで確認できます。

```bash
dnf module list nodejs
```

例えば、Node.js 18をインストールする場合は次のようになります。

```bash
dnf module install nodejs:18/common
```

### その他のインストール方法

他にもCentOS、Fedora、RHELと互換性のあるパッケージが提供されています。

- [Node.js snaps](#snap)は https://github.com/nodejs/snap で管理およびサポートされています
- [NodeSource](https://github.com/nodesource/distributions)によって管理およびサポートされている[Node.jsバイナリー](#debian-and-ubuntu-based-linux-distributions) があります

## Debian and Ubuntu based Linux distributions

NodeSourceが提供している[Node.jsバイナリー](https://github.com/nodesource/distributions)を利用できます。

### その他のインストール方法

DebianやUbuntuベースのLinuxディストリビューションと互換性のあるパッケージは[Node.js snaps](#snap)を通して利用できます。

## Exherbo Linux

Node.jsとnpmパッケージは[arborリポジトリー](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node)から利用できます。

```bash
cave resolve -x node
```

## fnm

複数のNode.jsのバージョンを管理できるRustで開発された高速でシンプルなNode.jsのバージョンマネージャーです。ディレクトリー上でNode.jsのインストールやアンインストール、Node.jsのバージョンの自動切り替えといったことができます。fnmをインストールする場合は[インストールスクリプト](https://github.com/Schniz/fnm#using-a-script-macoslinux)を利用してください。

fnmはクロスプラットフォーム（macOS、Windows、Linux）で動作し、主要なシェル（Bash、Zsh、Fish、PowerShell、Windows Command Line Prompt）もサポートしています。fnmはスピードを念頭に作られており、`.node-version`ファイルや`.nvmrc`ファイルとの互換サポートもあります。

## FreeBSD

[www/node](https://www.freshports.org/www/node) portから最新のリリースをインストールできます。

[pkg](https://www.freebsd.org/cgi/man.cgi?pkg)でバイナリーパッケージをインストールできます。

```bash
pkg install node
```

または[ports](https://www.freebsd.org/cgi/man.cgi?ports)を利用してご自身でコンパイルもできます。

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.jsはportageツリーからインストールできます。

```bash
emerge nodejs
```

## IBM i

Node.jsのLTSバージョンがIBMから提供されており、[yumパッケージマネージャー](https://ibm.biz/ibmi-rpms)を通してインストールできます。パッケージ名は`nodejs`の後ろにメジャーバージョンが付いたものになります（例えば、`nodejs18`や`nodejs20`など）。

コマンドラインでNode.js 20.xをインストールする場合は\*ALLOBJの特別な権限を持ったユーザーで次のコマンドを実行してください。

```bash
yum install nodejs20
```

Node.jsはIBM i Access Client Solutions製品と一緒にインストールできます。詳しくは[サポートドキュメント](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)をご確認ください。

## macOS

[nodejs.org](https://nodejs.org/)から直接[macOS用のインストーラー](/#home-downloadhead)をダウンロードできます。

_もしbashでダウンロードしたい場合はこちらを実行してください。_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### その他のインストール方法

\*\*[Homebrew](https://brew.sh/)\*\*を利用する場合

```bash
brew install node
```

\*\*[MacPorts](https://www.macports.org/)\*\*を利用する場合

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

\*\*[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)\*\*を利用する場合

次のようにしてバイナリーパッケージをインストールしてください。

```bash
pkgin -y install nodejs
```

もしくはpkgsrcから手動でビルドしてください。

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n`はMacとLinuxで利用できるシンプルなNode.jsのバージョンマネージャーです。さまざまな構文でインストールするNode.jsのバージョンを指定したり、過去にダウンロードしたバージョンから選択してNode.jsをインストールできます。これらのバージョンはシステム単位やユーザー単位でインストールできます。キャッシュされたダウンロードデータからも直接Node.jsを実行することができます。

詳しいインストール方法や利用方法は`n`の[ホームページ](https://github.com/tj/n)を参考にしてください。

もしすでに`npm`を利用できる場合は`n`をインストールして、次のようにLTSの`node`のバージョンを利用できます:

```
npm install -g n
n lts
```

## NetBSD

Node.jsはpkgsrcツリーからインストールできます：

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

もしくはpkginを使用してバイナリパッケージをインストールしてください（あなたのプラットフォームで利用可能な場合）：

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv`は`nvm`に似ている軽量のNode.jsのバージョンマネージャーです。シンプルで直感的に利用できます。機能が豊富なプラグインエコシステムによって、さまざまなカスタマイズができます。開発環境や本番環境のNode.jsのバージョンを一致させるために`nodenv`を利用できます。

Nodenvのインストール手順は[GitHub](https://github.com/nodenv/nodenv#installation)で確認できます。最新のインストール手順に従っていることを確認してください。

## nvm

Node Version Managerは複数のNode.jsバージョンを管理するために使用されるbashスクリプトです。インストール、アンインストール、バージョンの切り替えなどの操作を実行できます。nvmをインストールするには[インストールスクリプト](https://github.com/nvm-sh/nvm#install--update-script)を使用します。

UnixやOS XシステムではNode.jsをソースからビルドし、[nvm](https://github.com/creationix/nvm)を使用してnvmが期待する場所にインストールできます：

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

このあとはリリースされたバージョンやソースからビルドされたバージョンの間で`nvm`を使用してNode.jsを切り替えることができます。例えば、Node.jsのバージョンがv8.0.0-preである場合はこのようにできます：

```bash
nvm use 8
```

公式リリースが出た際にソースからビルドしたNode.jsをアンインストールしたい場合はこうのようにできます：

```bash
nvm uninstall 8
```

## nvs

#### Windows

`nvs`バージョンマネージャーはクロスプラットフォームでWindows、macOS、Unix系システムで使用できます。

Windowsに`nvs`をインストールする場合は[リリースページ](https://github.com/jasongin/nvs/releases)から最新リリースのMSIインストーラーファイルをダウンロードしてください。

`chocolatey`を使用してインストールすることもできます：

```bash
choco install nvs
```

#### macOS,UnixLike

macOS / Unix系システムの`nvs`のインストール手順に関するドキュメントは[こちら](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)を参照してください。

#### 使用方法

これ以降、`nvs`を使用して異なるバージョンのNode.jsを切り替えることができます。

最新のNode.jsを追加する場合：

```bash
nvs add latest
```

最新のLTSバージョンのNode.jsを追加する場合：

```bash
nvs add lts
```

`nvs use`コマンドを実行してシェルの`PATH`にNode.jsを追加できます：

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

恒久的に`PATH`に追加する場合は`nvs link`コマンドを使用できます：

```bash
nvs link lts
```

## OpenBSD

Node.jsはポートシステムを通じて利用できます。

```bash
/usr/ports/lang/node
```

OpenBSDで[pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)を使用する：

```bash
pkg_add node
```

## openSUSEおよびSLE

Node.jsは次のパッケージがメインリポジトリーにあります：

- **openSUSE Leap 15.2**： `nodejs10`、`nodejs12`、`nodejs14`
- **openSUSE Tumbleweed**： `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**： `nodejs10`、`nodejs12`、`nodejs14`
  （「Webおよびスクリプティングモジュール」を[有効にする](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated)必要があります。）
- **SUSE Linux Enterprise Server (SLES) 15 SP2**： `nodejs10`、`nodejs12`、`nodejs14`
  （「Webおよびスクリプティングモジュール」を[有効にする](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module)必要があります。）

例えば、openSUSE Leap 15.2にNode.js 14.xをインストールする場合は次のコマンドをrootユーザーで実行します：

```bash
zypper install nodejs14
```

Nodeの異なるメジャーバージョンを同時にインストールし使用することもできます。

## SmartOSおよびillumos

SmartOSイメージにはpkgsrcが同梱されています。他のillumosディストリビューションでは、\*\*[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)\*\*をインストールするとバイナリーパッケージをインストールできます：

```bash
pkgin -y install nodejs
```

もしくはpkgsrcから手動でビルドしてください：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap)は、Snapストアの[`node`](https://snapcraft.io/node)として利用できます。

## Solus

SolusはメインリポジトリーにNode.jsを提供しています。

```bash
sudo eopkg install nodejs
```

## vfox

クロスプラットフォーム（Windows、macOS、Linux）で**拡張可能な**バージョンマネージャーです。

プロジェクトごとに**異なるバージョン**、シェルごとに**異なるバージョン**を設定でき、現在のディレクトリに基づいてNodeバージョンを自動的に切り替えるなどが可能です。

主要なシェル環境（Bash、Zsh、Fish、PowerShell、Clink、Cmder）をサポートしています。

vfoxを迅速に使用するための[クイックスタート](https://vfox.lhan.me/guides/quick-start.html)を参照し、すべての使用詳細を確認してください。

## Void Linux

Void LinuxはメインリポジトリにNode.jsの安定版を提供しています。

```bash
xbps-install -Sy nodejs
```

## Windows

[Windowsインストーラー](/#home-downloadhead)を[nodejs.org](https://nodejs.org/)ウェブサイトから直接ダウンロードできます。

### その他のインストール方法

\*\*[Winget](https://aka.ms/winget-cli)\*\*を使用：

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

上記のいずれかのコマンドを実行した後、`node` CLIコマンドが利用可能になる前にターミナルエミュレーターを再起動する必要があります。

\*\*[Chocolatey](https://chocolatey.org/)\*\*を使用：

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

\*\*[Scoop](https://scoop.sh/)\*\*を使用：

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg;は、2つのインストール形式（SMP/EとPAX）で利用可能です。あなたに適したインストール形式を選んでください：

- [z/OSにおけるNode.jsのSMP/E版のインストールと構成](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [z/OSにおけるNode.jsのPAX版のインストールと構成](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
