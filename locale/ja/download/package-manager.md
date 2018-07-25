---
layout: page.hbs
title: パッケージマネージャを利用した Node.js のインストール
---

# <!-- Installing Node.js via package manager -->パッケージマネージャを利用した Node.js のインストール


<!-- ***Note:*** The packages on this page are maintained and supported by their respective packagers, **not** the Node.js core team. Please report any issues you encounter to the package maintainer. If it turns out your issue is a bug in Node.js itself, the maintainer will report the issue upstream. -->
***注意:*** このページにあるパッケージはそれぞれのパッケージ管理者によってメンテナンスされています。Node.js コアチームによるものでは**ありません**。遭遇した問題はパッケージの管理者に報告してください。もしその問題が Node.js 自体のバグだと判明した場合は、管理者が報告をあげてくれます。

----------------------------

* [Arch Linux](#arch-linux)
* [Debian と Ubuntu ベースの Linux ディストリビューション](#debian-and-ubuntu-based-linux-distributions-debian-ubuntu-linux)
* [Enterprise Linux と Fedora](#enterprise-linux-and-fedora-enterprise-linux-fedora)
* [FreeBSD と OpenBSD](#freebsd-openbsd)
* [Gentoo](#gentoo)
* [NetBSD](#netbsd)
* [openSUSE と SLE](#opensuse-sle)
* [macOS](#macos)
* [SmartOS と illumos](#smartos-illumos)
* [Void Linux](#void-linux)
* [Windows](#windows)

----------------------------

## Arch Linux

<!-- Node.js and npm packages are available in the Community Repository. -->
Node.js と npm のパッケージがコミュニティのリポジトリから利用可能です。

```bash
pacman -S nodejs npm
```


## <!-- Debian and Ubuntu based Linux distributions --> Debian と Ubuntu ベースの Linux ディストリビューション

<!-- Also including: **Linux Mint**, **Linux Mint Debian Edition (LMDE)**, **elementaryOS** and others. -->
これらも含みます: **Linux Mint**, **Linux Mint Debian Edition (LMDE)**, **elementaryOS** 等。

<!-- Node.js is available from the [NodeSource](https://nodesource.com) Debian and Ubuntu binary distributions repository (formerly [Chris Lea's](https://github.com/chrislea) Launchpad PPA). Support for this repository, along with its scripts, can be found on GitHub at [nodesource/distributions](https://github.com/nodesource/distributions). -->
Node.js は [NodeSource](https://nodesource.com) の Debian と Ubuntu ベースの Linux ディストリビューションリポジトリ (以前の [Chris Lea's](https://github.com/chrislea) Launchpad PPA) から利用できます。このリポジトリをサポートするには、GitHub にある [nodesource/distributions](https://github.com/nodesource/distributions) を参照ください。

<!-- **NOTE:** If you are using Ubuntu Precise or Debian Wheezy, you might want to read about [running Node.js >= 4.x on older distros](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md). -->
**注意:** Ubuntu Precise や Debian Wheezy をお使いの場合は、 [running Node.js >= 6.x on older distros](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md) を読むことをお勧めします。

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

<!-- Alternatively, for Node.js v6: -->
Node.js v8 を利用するには:

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

<!-- ***Optional***: install build tools -->
***任意***: ビルドツールのインストール

<!-- To compile and install native addons from npm you may also need to install build tools: -->
npm からネイティブアドオンをコンパイル・インストールするにはビルドツールのインストールが必要です。

```bash
sudo apt-get install -y build-essential
```

<!-- **Available architectures:** -->
**利用可能なアーキテクチャ:**

* **i386** (32-bit)
* **amd64** (64-bit)
* **armhf** (ARM 32-bit hard-float, ARMv7 and up: _arm-linux-gnueabihf_)

<!-- **Supported Ubuntu versions:** -->
**サポートしている Ubuntu のバージョン:**

* **Ubuntu 14.04 LTS** (Trusty Tahr)
* **Ubuntu 16.04 LTS** (Xenial Xerus)

<!-- **Supported Debian versions:** -->
**サポートしている Debian のバージョン:**

* **Debian 7** (wheezy)
* **Debian 8 / stable** (jessie)
* **Debian testing** (stretch, aliased to jessie)
* **Debian unstable** (sid)

<!-- A Node.js package is also available in the [official repo](http://packages.debian.org/search?searchon=names&keywords=nodejs) for Debian Sid (unstable), Jessie (testing) and Wheezy (wheezy-backports) as "nodejs". It only installs a `nodejs` binary. -->
 Debian Sid (unstable)、Jessie (testing) と Wheezy (wheezy-backports) の[公式リポジトリ](http://packages.debian.org/search?searchon=names&keywords=nodejs)からも「nodejs」のパッケージが利用可能です。

<!-- The [nodejs-legacy package](http://packages.debian.org/search?searchon=names&keywords=nodejs-legacy) installs a `node` symlink that is needed by many modules to build and run correctly.
The Node.js modules available in the distribution official repositories do not need it. -->
[nodejs-legacy パッケージ](http://packages.debian.org/search?searchon=names&keywords=nodejs-legacy) は `node` のシンボリックリンクを作ります。これはたくさんのモジュールをビルドし正しく動かすために必要です。
ディストリビューションの公式リポジトリで利用可能な Node.js のモジュールでは、これを必要としません。

<!-- **Supported Linux Mint versions:** -->
**サポートしている Linux Mint のバージョン:**

* **Linux Mint 17 "Qiana"** (via Ubuntu 14.04 LTS)
* **Linux Mint 17.1 "Rebecca"** (via Ubuntu 14.04 LTS)
* **Linux Mint 17.2 "Rafaela"** (via Ubuntu 14.04 LTS)
* **Linux Mint Debian Edition (LMDE) 2 "Betsy"** (via Debian 8)

<!-- **Supported elementary OS versions:** -->
**サポートしている elementary OS のバージョン:**

* **elementary OS Freya** (via Ubuntu 14.04 LTS)

<!-- **Supported Trisquel versions:** -->
**サポートしている  Trisquel のバージョン:**

* **Trisquel 7 "Belenos"** (via Ubuntu 14.04 LTS)

<!-- **Supported BOSS versions:** -->
**サポートしている  BOSS のバージョン:**

* **BOSS 5.0 "Anokha"** (via Debian 7)

## <!-- Enterprise Linux and Fedora --> Enterprise Linux と Fedora

<!-- Including **Red Hat® Enterprise Linux®** / **RHEL**, **CentOS** and **Fedora**. -->
**Red Hat® Enterprise Linux®** / **RHEL**、 **CentOS** と **Fedora** を含みます。

<!-- Node.js is available from the [NodeSource](https://nodesource.com) Enterprise Linux and Fedora binary distributions repository. Support for this repository, along with its scripts, can be found on GitHub at [nodesource/distributions](https://github.com/nodesource/distributions). -->
Node.js は [NodeSource](https://nodesource.com) の Enterprise Linux と Fedora バイナリディストリビューションリポジトリからも利用できます。このリポジトリをサポートするには、GitHub にある [nodesource/distributions](https://github.com/nodesource/distributions) を参照ください。

<!-- Note that the Node.js packages for EL 5 (RHEL5 and CentOS 5) depend on the **[EPEL](https://fedoraproject.org/wiki/EPEL)** repository being available. The setup script will check and provide instructions if it is not installed. -->
EL 5 (RHEL5 と CentOS 5)用の Node.js パッケージは **[EPEL](https://fedoraproject.org/wiki/EPEL)** リポジトリに依存していますのでご注意ください。セットアップ用のスクリプトがチェックをして、もしそれがインストールされていない場合はインストール方法を説明します。

<!-- Run as root on RHEL, CentOS or Fedora, for Node.js v4 LTS Argon: -->
Node.js v4 LTS Argon を RHEL、CentOS や Fedora で利用するには root で実行してください:

```bash
curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
```

<!-- Alternatively for Node.js v6: -->
Node.js v6 を利用するには:

```bash
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
```

<!-- Alternatively for Node.js 0.10: -->
Node.js 0.10 を利用するには:

```bash
curl --silent --location https://rpm.nodesource.com/setup | bash -
```

<!-- Then install, as root: -->
root でインストール:

```bash
yum -y install nodejs
```

<!-- ***Optional***: install build tools -->
***任意***: ビルドツールのインストール

<!-- To compile and install native addons from npm you may also need to install build tools: -->
npm からネイティブアドオンをコンパイル・インストールするにはビルドツールのインストールが必要です。


```bash
yum install gcc-c++ make
# or: yum groupinstall 'Development Tools'
```

<!-- **Available architectures:** -->
**利用可能なアーキテクチャ:**

* **i386** (32-bit, not available for EL7)
* **x86_64** (64-bit)

<!-- **Supported Red Hat® Enterprise Linux® versions:** -->
**サポートしている  Red Hat® Enterprise Linux® のバージョン**

* **RHEL 5** (32-bit and 64-bit)
* **RHEL 6** (32-bit and 64-bit)
* **RHEL 7** (64-bit)

<!-- **Supported CentOS versions:** -->
**サポートしている CentOS バージョン:**

* **CentOS 5** (32-bit and 64-bit)
* **CentOS 6** (32-bit and 64-bit)
* **CentOS 7** (64-bit)

<!-- **Supported CloudLinux versions:** -->
**サポートしている CloudLinux バージョン:**
* **CloudLinux 6** (32-bit and 64-bit)

<!-- **Supported Fedora versions:** -->
**サポートしている Fedora バージョン:**

* **Fedora 21 (Twenty One)** (32-bit and 64-bit)
* **Fedora 20 (Heisenbug)** (32-bit and 64-bit)
* **Fedora 19 (Schrödinger's Cat)** (32-bit and 64-bit)

<!-- **Other distributions known to be supported:** -->
**その他こちらもサポートしています:**

* **Oracle Linux** (mirrors RHEL very closely)
* **Amazon Linux** (tested on 2016.03)

### 代替手段

<!-- Official **Fedora** [Node.js](https://apps.fedoraproject.org/packages/nodejs) and [npm](https://apps.fedoraproject.org/packages/npm) packages are available in Fedora 18 and later.  Install with: -->
Fedora 18 以降では、公式の **Fedora** [Node.js](https://apps.fedoraproject.org/packages/nodejs) と [npm](https://apps.fedoraproject.org/packages/npm) パッケージが利用可能です。

```bash
sudo yum install nodejs npm
```

<!-- In a hurry for the latest updates?  [Grab them from updates-testing.](https://fedoraproject.org/wiki/QA:Updates_Testing) -->
最新のアップデートをお急ぎですか？ [updates-testing を参照してください。](https://fedoraproject.org/wiki/QA:Updates_Testing)

<!-- **Enterprise Linux** (RHEL and CentOS) users may use the Node.js and npm packages from the [EPEL](https://fedoraproject.org/wiki/EPEL) repository. -->
**Enterprise Linux** (RHEL と CentOS) のユーザーは、[EPEL](https://fedoraproject.org/wiki/EPEL)リポジトリから Node.js と npm パッケージを利用可能です。

<!-- Install the appropriate *epel-release* RPM for your version (found on the [EPEL](https://fedoraproject.org/wiki/EPEL) repository homepage), then run: -->
お使いのバージョンに適切な *epel-release* RPM をインストールし ([EPEL](https://fedoraproject.org/wiki/EPEL)リポジトリから見つかります)、そして実行します:

```bash
sudo yum install nodejs npm --enablerepo=epel
```

<!-- In a hurry for the latest updates?  [Grab them from epel-testing.](https://fedoraproject.org/wiki/EPEL/testing) -->
最新のアップデートをお急ぎですか？ [epel-testing を参照してください。](https://fedoraproject.org/wiki/EPEL/testing)


<!-- **Available architectures:** -->
**利用可能なアーキテクチャ:**

* **i686** (32-bit, not available for EL7)
* **x86_64** (64-bit)
* **armv6hl** (Raspberry Pi, [Pidora](http://pidora.ca) only)
* **armv7hl** (32-bit ARM hard-float, ARMv7 and up, Fedora only)

<!-- **Supported Red Hat® Enterprise Linux® versions:** -->
**サポートしている Red Hat® Enterprise Linux® バージョン:**

* **RHEL 6** (i686/x86_64)
* **RHEL 7** (x86_64)

<!-- Additionally, versions of **CentOS** and **Scientific Linux** corresponding to the above RHEL versions are also officially supported by all EPEL packages, including nodejs.  Amazon Linux is not officially supported by EPEL due to significant incompatibilities previously reported to the epel-devel mailing list, however you might find that nodejs at least still works. -->

また、RHELバージョンに該当する **CentOS** と **Scientific Linux** も全ての EPEL パッケージによって nodejs も含め公式にサポートされています。Amazon Linux は epel-devel のメーリングリストに以前報告された影響の大きな非互換性があるため、公式にはサポートされていません。しかし nodejs の動作は確認出来るでしょう。

<!-- **Supported Fedora versions:** -->
**サポートしている Fedora バージョン:**

* **Fedora Rawhide** (i686/x86_64/armv7hl)
* **Fedora 21** (i686/x86_64/armv7hl)
* **Fedora 20 (Heisenbug)** (i686/x86_64/armv6hl/armv7hl)
* **Fedora 19 (Schrödinger's Cat)** (i686/x86_64/armv7hl)


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
## openSUSE と SLE

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

<!-- Simply download the [macOS Installer](https://nodejs.org/#download) direct from the [nodejs.org](https://nodejs.org) web site. -->
直接 [nodejs.org](https://nodejs.org) のサイトから [macOS Installer](https://nodejs.org/#download) をダウンロードしてください。

<!-- _If you want to download the package with bash:_ -->
_bash でパッケージをダウンロードしたい場合:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 代替手段

**[Homebrew](http://brew.sh/)** を使う:

```bash
brew install node
```

**[MacPorts](http://www.macports.org/)** を使う:

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
## SmartOS と illumos

<!-- SmartOS images come with pkgsrc pre-installed.  On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal: -->
SmartOS のイメージには pkgsrc が付属しています。一方、illumos ディストリビューションの場合は、まず **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** をインストールし、それから、通常通りバイナリパッケージをインストールすることが出来ます:

```bash
pkgin -y install nodejs
```

<!-- Or build manually from pkgsrc: -->
または、pkgsrc から手動でビルド:

```bash
cd pkgsrc/lang/nodejs && bmake install
```


## Void Linux

<!-- Void Linux ships node.js stable in the main repository. -->
Void Linux にはメインリポジトリに node.js の安定版があります。

```bash
xbps-install -Sy nodejs
```


## Windows

<!-- Simply download the [Windows Installer](https://nodejs.org/#download) directly from the [nodejs.org](https://nodejs.org) web site. -->
直接 [nodejs.org](https://nodejs.org) のサイトから [Windows Installer](https://nodejs.org/#download) をダウンロードしてください。

### 代替手段

**[Chocolatey](http://chocolatey.org)** を使う:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

**[Scoop](http://scoop.sh/)** を使う:

```bash
scoop install nodejs
```
