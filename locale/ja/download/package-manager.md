---
layout: page.hbs
title: パッケージマネージャを利用した Node.js のインストール
---

# パッケージマネージャを利用した Node.js のインストール

***注意:*** このページにあるパッケージはそれぞれのパッケージ管理者によってメンテナンスされています。Node.js コアチームによるものでは**ありません**。遭遇した問題はパッケージの管理者に報告してください。もしその問題が Node.js 自体のバグだと判明した場合は、管理者が報告をあげてくれます。

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Debian と Ubuntu ベースの Linux ディストリビューション、エンタープライズ Linux/Fedora と Snap パッケージ](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD と OpenBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [openSUSE と SLE](#nvm)
* [macOS](#openbsd)
* [SmartOS と illumos](#opensuse-and-sle)
* [Solus](#macos)
* [Void Linux](#smartos-and-illumos)
* [Windows](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows)

---

## Android

Android support is still experimental in Node.js, so precompiled binaries are not yet provided by Node.js developers.

However, there are some third-party solutions. For example, [Termux](https://termux.com/) community provides terminal emulator and Linux environment for Android, as well as own package manager and [extensive collection](https://github.com/termux/termux-packages) of many precompiled applications. This command in Termux app will install the last available Node.js version:

```bash
pkg install nodejs
```

Currently, Termux Node.js binaries are linked against `system-icu` (depending on `libicu` package).

## Arch Linux

Node.js と npm のパッケージがコミュニティのリポジトリから利用可能です。

```bash
pacman -S nodejs npm
```

## Debian と Ubuntu ベースの Linux ディストリビューション、エンタープライズ Linux/Fedora と Snap パッケージ

[Node.js 公式のバイナリディストリビューション](https://github.com/nodesource/distributions/blob/master/README.md)が NodeSource によって提供されています。

## FreeBSD と OpenBSD

Node.js は ports を使って利用可能です。

開発バージョンも ports で利用可能です。

```bash
/usr/ports/www/node
```

または FreeBSD のパッケージ:

```bash
cd /usr/ports/www/node-devel/ && make install clean
```

## Gentoo

FreeBSD の [pkg-ng](https://wiki.freebsd.org/pkgng) を使う:

```bash
pkg_add -r node-devel
```

## IBM i

または、開発バージョン:

Node.js は Portageツリー で利用可能です。

```bash
pkg install node
```

Node.js の LTS バージョンは IBM から ['yum' パッケージマネージャ](https://ibm.biz/ibmi-rpms) で利用可能です。パッケージの名前は `nodejs` の後にメジャーバージョンの数字が付きます(例えば `nodejs8`, `nodejs10`, `nodejs12`, など)

## NetBSD

Node.js 12.x をコマンドラインからインストールするには、以下のコマンドを \*ALLOBJ 権限のユーザで実行します

```bash
pkg install node-devel
```

Node.js は IBM i Access Client Solutions と一緒にインストールすることもできます。[こちらのサポートドキュメント(英語)](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)に詳細があります。

```bash
emerge nodejs
```

## openSUSE と SLE
Node.js は pkgsrcツリー で利用可能です。

または、(お使いのプラットフォームで利用可能なら) pkgin を使ってバイナリパッケージをインストール:

```bash
yum install nodejs12
```

[openSUSE one-click を利用して Node.js をダウンロード](http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs)する。

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

RPM パッケージを利用可能なバージョン: openSUSE 11.4, 12.1, 12.2, 12.3, 13.1, Factory and Tumbleweed; SLE 11 (with SP1/SP2/SP3 variations).

```bash
pkgin -y install nodejs
```

## macOS

openSUSE 13.1 でのインストール例:

```bash
sudo zypper ar \
  http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_13.1/ \
  Node.js
sudo zypper in nodejs nodejs-devel
```

直接 [nodejs.org](https://nodejs.org/) のサイトから [macOS Installer](https://nodejs.org/ja/#home-downloadhead) をダウンロードしてください。

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

## SmartOS と illumos

_bash でパッケージをダウンロードしたい場合:_

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6` (The "Web and Scripting Module" must be [added before installing](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

**[Homebrew](https://brew.sh/)** を使う:

```bash
brew install node
```

## Solus

**[MacPorts](https://www.macports.org/)** を使う:

_If you want to download the package with bash:_

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

### 代替手段

バイナリパッケージをインストール:

```bash
pkgin -y install nodejs
```

または、pkgsrc から手動でビルド:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

SmartOS のイメージには pkgsrc が付属しています。一方、illumos ディストリビューションの場合は、まず **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** をインストールし、それから、通常通りバイナリパッケージをインストールすることが出来ます:

または、pkgsrc から手動でビルド:

```bash
emerge nodejs
```

Solus provides Node.js in its main repository.

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Void Linux

Void Linux にはメインリポジトリに Node.js の安定版があります。

```bash
emerge nodejs
```

Solus provides Node.js in its main repository.

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Windows

**[Chocolatey](https://chocolatey.org/)** を使う:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

## Void Linux

**[Scoop](https://scoop.sh/)** を使う:

```bash
scoop install nodejs
```

## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### 代替手段

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
