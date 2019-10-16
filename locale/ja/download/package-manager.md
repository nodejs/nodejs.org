---
layout: page.hbs
title: パッケージマネージャを利用した Node.js のインストール
---

# <!-- Installing Node.js via package manager -->パッケージマネージャを利用した Node.js のインストール

<!-- ***Note:*** The packages on this page are maintained and supported by their respective packagers, **not** the Node.js core team. Please report any issues you encounter to the package maintainer. If it turns out your issue is a bug in Node.js itself, the maintainer will report the issue upstream. -->
***注意:*** このページにあるパッケージはそれぞれのパッケージ管理者によってメンテナンスされています。Node.js コアチームによるものでは**ありません**。遭遇した問題はパッケージの管理者に報告してください。もしその問題が Node.js 自体のバグだと判明した場合は、管理者が報告をあげてくれます。

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Debian と Ubuntu ベースの Linux ディストリビューション、エンタープライズ Linux/Fedora と Snap パッケージ](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD と OpenBSD](#freebsd-openbsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [openSUSE と SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS と illumos](#smartos-and-illumos)
* [Solus](#solus)
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

<!-- Node.js and npm packages are available in the Community Repository. -->
Node.js と npm のパッケージがコミュニティのリポジトリから利用可能です。

```bash
pacman -S nodejs npm
```

## <!--debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages-->Debian と Ubuntu ベースの Linux ディストリビューション、エンタープライズ Linux/Fedora と Snap パッケージ

<!-- [Official Node.js binary distributions](https://github.com/nodesource/distributions/blob/master/README.md) are provided by NodeSource. -->
[Node.js 公式のバイナリディストリビューション](https://github.com/nodesource/distributions/blob/master/README.md)が NodeSource によって提供されています。

<!-- ## FreeBSD and OpenBSD -->
## FreeBSD と OpenBSD

<!-- Node.js is available through the ports system. -->
Node.js は ports を使って利用可能です。

```bash
/usr/ports/www/node
```

<!-- Development versions are also available using ports -->
開発バージョンも ports で利用可能です。

```bash
cd /usr/ports/www/node-devel/ && make install clean
```

<!-- Or packages on FreeBSD: -->
または FreeBSD のパッケージ:

```bash
pkg_add -r node-devel
```

<!-- Using [pkg-ng](https://wiki.freebsd.org/pkgng) on FreeBSD -->
FreeBSD の [pkg-ng](https://wiki.freebsd.org/pkgng) を使う:

```bash
pkg install node
```

<!-- Or the development versions: -->
または、開発バージョン:

```bash
pkg install node-devel
```

## Gentoo

<!-- Node.js is available in the portage tree. -->
Node.js は Portageツリー で利用可能です。

```bash
emerge nodejs
```

## IBM i

<!-- LTS versions of Node.js are available from IBM, and are available via [the 'yum' package manager](https://ibm.biz/ibmi-rpms). The package name is `nodejs` followed by the major version number (for instance, `nodejs8`, `nodejs10`, `nodejs12`, etc) -->

Node.js の LTS バージョンは IBM から ['yum' パッケージマネージャ](https://ibm.biz/ibmi-rpms) で利用可能です。パッケージの名前は `nodejs` の後にメジャーバージョンの数字が付きます(例えば `nodejs8`, `nodejs10`, `nodejs12`, など)

<!-- To install Node.js 12.x from the command line, run the following as a user with \*ALLOBJ special authority: -->

Node.js 12.x をコマンドラインからインストールするには、以下のコマンドを \*ALLOBJ 権限のユーザで実行します

```bash
yum install nodejs12
```

<!-- Node.js can also be installed with the IBM i Access Client Solutions product. See [this support document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) for more details -->

Node.js は IBM i Access Client Solutions と一緒にインストールすることもできます。[こちらのサポートドキュメント(英語)](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)に詳細があります。

## NetBSD

<!-- Node.js is available in the pkgsrc tree: -->
Node.js は pkgsrcツリー で利用可能です。

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

<!-- Or install a binary package (if available for your platform) using pkgin: -->
または、(お使いのプラットフォームで利用可能なら) pkgin を使ってバイナリパッケージをインストール:

```bash
pkgin -y install nodejs
```

<!-- ## openSUSE and SLE -->
## <!--opensuse-and-sle-->openSUSE と SLE

<!-- [Download Node.js via openSUSE one-click](http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs). -->
[openSUSE one-click を利用して Node.js をダウンロード](http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs)する。

<!-- Available RPM packages for: openSUSE 11.4, 12.1, 12.2, 12.3, 13.1, Factory and Tumbleweed; SLE 11 (with SP1/SP2/SP3 variations). -->
RPM パッケージを利用可能なバージョン: openSUSE 11.4, 12.1, 12.2, 12.3, 13.1, Factory and Tumbleweed; SLE 11 (with SP1/SP2/SP3 variations).

<!-- Example install on openSUSE 13.1: -->
openSUSE 13.1 でのインストール例:

```bash
sudo zypper ar \
  http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_13.1/ \
  Node.js
sudo zypper in nodejs nodejs-devel
```

## macOS

<!-- Simply download the [macOS Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site. -->
直接 [nodejs.org](https://nodejs.org/) のサイトから [macOS Installer](https://nodejs.org/ja/#home-downloadhead) をダウンロードしてください。

<!-- _If you want to download the package with bash:_ -->
_bash でパッケージをダウンロードしたい場合:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 代替手段

**[Homebrew](https://brew.sh/)** を使う:

```bash
brew install node
```

**[MacPorts](https://www.macports.org/)** を使う:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

**[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)** を使う:

<!-- Install the binary package: -->
バイナリパッケージをインストール:

```bash
pkgin -y install nodejs
```

<!-- Or build manually from pkgsrc: -->
または、pkgsrc から手動でビルド:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

<!-- ## SmartOS and illumos -->
## <!--smartos-and-illumos-->SmartOS と illumos

<!-- SmartOS images come with pkgsrc pre-installed. On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal: -->
SmartOS のイメージには pkgsrc が付属しています。一方、illumos ディストリビューションの場合は、まず **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** をインストールし、それから、通常通りバイナリパッケージをインストールすることが出来ます:

```bash
pkgin -y install nodejs
```

<!-- Or build manually from pkgsrc: -->
または、pkgsrc から手動でビルド:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

Solus provides Node.js in its main repository.

```bash
sudo eopkg install nodejs
```

## Void Linux

<!-- Void Linux ships Node.js stable in the main repository. -->
Void Linux にはメインリポジトリに Node.js の安定版があります。

```bash
xbps-install -Sy nodejs
```

## Windows

<!-- Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site. -->
直接 [nodejs.org](https://nodejs.org/) のサイトから [Windows Installer](https://nodejs.org/ja/#home-downloadhead) をダウンロードしてください。

### 代替手段

**[Chocolatey](https://chocolatey.org/)** を使う:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

**[Scoop](https://scoop.sh/)** を使う:

```bash
scoop install nodejs
```
