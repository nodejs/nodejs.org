---
layout: page.hbs
title: 透過套件管理安裝 Node.js
---

# 透過套件管理安裝 Node.js

***請注意：*** 下列的套件維護及支援 **並非由** Node.js 核心團隊提供，任何套件使用上的問題，應直接聯繫各套件的維護者，若發現問題出於 Node.js 本身，則應由套件維護者聯繫上層。

----------------------------

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Debian 及 Ubuntu 系列發行版](#debian-and-ubuntu-based-linux-distributions)
* [Enterprise Linux 及 Fedora](#enterprise-linux-and-fedora)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [OpenBSD](#openbsd)
* [openSUSE 及 SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS 及 illumos](#smartos-and-illumos)
* [Void Linux](#void-linux)
* [Solus](#solus)
* [Windows](#windows)

----------------------------

## Android

Android 的 Node.js 支援仍是試驗版，因此 Node.js 開發者尚未提供預先編譯的二進制檔。

但社群提供了第三方的解決方式，舉例來說，[Termux](https://termux.com/) 社群提供了終端機模擬器及 Android 的 Linux 環境，也有自己的套件管理器及許多預先編譯的[程式清單](https://github.com/termux/termux-packages)。

下列的指令在 Termux 中分別會安裝 Node.js LTS 版及最新版：

```bash
pkg install nodejs
pkg install nodejs-current
```

目前 Termux Node.js 二進制檔尚不支援 ICU 及 Inspector。

## Arch Linux

Node.js 及 npm 套件可由公有軟體庫取得。

```bash
pacman -S nodejs npm
```


## Debian 及 Ubuntu 系列發行版

也適用於：**Linux Mint**、**Linux Mint Debian Edition (LMDE)**、**elementaryOS** 及 **bash on Windows** 等等。

Node.js 可由 [NodeSource](https://nodesource.com)（前身為  [Chris Lea](https://github.com/chrislea) 的 Launchpad PPA）軟體庫取得適用於 Debian 及 Ubuntu 的二進制檔。關於軟體庫及腳本的支援請至 [nodesource/distributions](https://github.com/nodesource/distributions)。

**請注意：**如果你正在使用 Ubuntu Precise 或 Debian Wheezy，你可能需要閱讀 [running Node.js >= 6.x on older distros](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md)。

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

或者若你想安裝的是 Node.js 10：

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

***選擇性***: 安裝編譯工具

若要從 npm 編譯及安裝原生附加元件，你需要另外安裝編譯工具：

```bash
sudo apt-get install -y build-essential
```

**適用架構：**

* **i386** (32 位元)
* **amd64** (64 位元)
* **armhf** (ARM 32 位元 hard-float, ARMv7 及更新版本: _arm-linux-gnueabihf_)

**支援的 Ubuntu 版本：**

* **Ubuntu 14.04 LTS** (Trusty Tahr)
* **Ubuntu 16.04 LTS** (Xenial Xerus)

**支援的 Debian 版本：**

* **Debian 8** (jessie, old-stable)
* **Debian 9 / stable** (stretch)
* **Debian testing** (buster to-be-released-as-next-stable)
* **Debian unstable** (sid never-to-be-released 或稱 rolling)

[官方軟體庫](http://packages.debian.org/search?searchon=names&keywords=nodejs) 可取得適用於 Debian Sid (unstable)、Jessie (testing) 及 Wheezy (wheezy-backports) 的 Node.js 套件，其僅會安裝 `nodejs` 二進制檔。

[nodejs-legacy 套件](http://packages.debian.org/search?searchon=names&keywords=nodejs-legacy)將會安裝一個 多數模組編譯及執行時所需的 `node` 軟連結，若 Node.js 模組從官方軟體庫取得就不需要此套件。

**支援的 Linux Mint 版本：**

* **Linux Mint 17 "Qiana"** (透過 Ubuntu 14.04 LTS)
* **Linux Mint 17.1 "Rebecca"** (透過 Ubuntu 14.04 LTS)
* **Linux Mint 17.2 "Rafaela"** (透過 Ubuntu 14.04 LTS)
* **Linux Mint Debian Edition (LMDE) 2 "Betsy"** (透過 Debian 8)

**支援的 elementary OS 版本：**

* **elementary OS Luna** (透過 Ubuntu 12.04 LTS)
* **elementary OS Freya** (透過 Ubuntu 14.04 LTS)
* **elementary OS Loki** (透過 Ubuntu 16.04 LTS)
* **elementary OS Juno** (透過 Ubuntu 18.04 LTS)

**支援的 Trisquel 版本：**

* **Trisquel 7 "Belenos"** (透過 Ubuntu 14.04 LTS)

**支援的 BOSS 版本**

* **BOSS 5.0 "Anokha"** (透過 Debian 7)

## 企業版 Linux 及 Fedora

也適用於 **Red Hat® Enterprise Linux®** / **RHEL**、**CentOS** 及 **Fedora**。

Node.js 可由 [NodeSource](https://nodesource.com) 軟體庫取得適用於 Linux 企業版及 Fedora 的二進制檔。關於軟體庫及腳本的支援請至 [nodesource/distributions](https://github.com/nodesource/distributions)。

需注意適用於 EL 5（RHEL5 及 CentOS 5）Node.js 的套件需依賴 **[EPEL](https://fedoraproject.org/wiki/EPEL)** 才可使用。若相依套件尚未安裝，腳本將會提供操作指南供參考。

在 RHEL、CentOS 或 Fedora 安裝 Node.js v8 LTS：

```bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

或者若你想安裝的是 Node.js 10：

```bash
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
```

接著安裝：

```bash
sudo yum -y install nodejs
```

***選擇性***: 安裝編譯工具

若要從 npm 編譯及安裝原生附加元件，你需要另外安裝編譯工具：

```bash
sudo yum install gcc-c++ make
# 或者： sudo yum groupinstall 'Development Tools'
```

**適用架構：**

* **i386** (32 位元，不支援 EL7)
* **x86_64** (64 位元)

**支援的 Red Hat® Enterprise Linux® 版本：**

* **RHEL 5** (32 位元及 64 位元)
* **RHEL 6** (32 位元及 64 位元)
* **RHEL 7** (64 位元)

**支援的 CentOS 版本：**

* **CentOS 5** (32 位元及 64 位元)
* **CentOS 6** (32 位元及 64 位元)
* **CentOS 7** (64 位元)

**支援的 CloudLinux 版本：**
* **CloudLinux 6** (32 位元及 64 位元)

**支援的 Fedora 版本：**

* **Fedora 21 (Twenty One)** (32 位元及 64 位元)
* **Fedora 20 (Heisenbug)** (32 位元及 64 位元)
* **Fedora 19 (Schrödinger's Cat)** (32 位元及 64 位元)

**其他已知支援的發行版**

* **Oracle Linux** (與 RHEL 非常相似)
* **Amazon Linux** (於 2016 三月測試)

### 替代方案

**Fedora** 官方的 [Node.js](https://apps.fedoraproject.org/packages/nodejs) 及 [npm](https://apps.fedoraproject.org/packages/npm) 套件自 Fedora 18 起可透過下列指令安裝：

```bash
sudo dnf install nodejs
```

急著想試試最新版嗎？ [從 updates-testing 取得更新](https://fedoraproject.org/wiki/QA:Updates_Testing)。

**企業版 Linux** (RHEL 及 CentOS) 可從 [EPEL](https://fedoraproject.org/wiki/EPEL) 軟體庫取得 Node.js 及 npm。

安裝適合你版本的 *epel-release* RPM (可以在 [EPEL](https://fedoraproject.org/wiki/EPEL) 軟體庫首頁上找到) 後執行：

```bash
sudo yum install nodejs npm --enablerepo=epel
```

急著想試試最新版嗎？ [從 epel-testing 取得更新](https://fedoraproject.org/wiki/EPEL/testing)。

**適用架構：**

* **i686** (32 位元，不支援 EL7)
* **x86_64** (64 位元)
* **armv6hl** (Raspberry Pi，僅支援 [Pidora](http://pidora.ca))
* **armv7hl** (32 位元 ARM hard-float, ARMv7 或更新版，僅支援 Fedora)

**支援的 Red Hat® Enterprise Linux® 版本：**

* **RHEL 6** (i686/x86_64)
* **RHEL 7** (aarch64/x86_64)

RHEL 6 已不支援 EPEL，但你仍能使用 [Red Hat Software Collections](https://www.softwarecollections.org/en/scls/?search=nodejs)。

附帶一提，上方 **CentOS** 與 **Scientific Linux** 對應的 RHEL 版本也被 EPEL 套件官方正式支援，當然也包括了 Node.js。Amazon Linux 先前因嚴重不相容被回報至 epel-devel 郵件清單而不被 EPEL 正式支援，但至少 Node.js 仍能運作。

**支援的 Fedora 版本：**

* **Fedora Rawhide** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le/s390x)
* **Fedora 27** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le/s390x)
* **Fedora 26** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le)

## FreeBSD 

近期的版本已可透過 [www/node](http://freshports.org/www/node) port 取得 Node.js。

透過 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) 安裝二進制套件：

```bash
pkg install node
```

或者透過 [ports](https://www.freebsd.org/cgi/man.cgi?ports) 編譯你自己的版本：

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js 可透過 portage 樹取得：

```bash
emerge nodejs
```


## NetBSD

Node.js 可透過 pkgsrc 樹取得：

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

或使用 pkgin 安裝二進制套件（若適用於你的平台的話）：

```bash
pkgin -y install nodejs
```

## nvm
Node 版本管理器（Node Version Manager, nvm）是款用來管理 Node.js 多重版本的 bash 腳本，它可讓你執行安裝、移除及切換版本等操作。
若要安裝 NVM 可以使用此[安裝腳本](https://github.com/creationix/nvm#install-script)。

在 Unix / OS X 系統上從源碼編譯的 Node.js 可以透過 [nvm](https://github.com/creationix/nvm) 安裝至其指定位置：

```bash
$ env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

安裝之後你便可以使用 `nvm` 切換正式版及編譯版。舉例來說若 Node.js 版本為 v8.0.0-pre：

```bash
$ nvm use 8
```

官方版本釋出後你將會需要移除從源碼編譯的版本：

```bash
$ nvm uninstall 8
```

## OpenBSD

Node.js 可於 ports 系統中取得。

```bash
/usr/ports/lang/node
```

 在 OpenBSD 上使用 [pkg_add](http://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)：

```bash
pkg_add node
```

## openSUSE 及 SLE

主要軟體庫中都提供了下列套件：

 - **openSUSE Leap 42.2**: `nodejs4`
 - **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
 - **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
 - **SUSE Linux Enterprise Server (SLES) 12**<sup>1</sup>: `nodejs4`, `nodejs6`

<sup>1:</sup> 必須[於安裝前加入](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html) "Web and Scripting Module"。

舉例來說，若想在 openSUSE Leap 42.2 上安裝 Node.js 4.x，用 root 權限執行下列指令：

```bash
zypper install nodejs4
```

## macOS

只需從 [nodejs.org](https://nodejs.org) 下載 [macOS 安裝器](https://nodejs.org/#download)即可。

_或者你也可以使用 bash 下載套件_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 替代方案

使用 **[Homebrew](http://brew.sh/)**：

```bash
brew install node
```

使用 **[MacPorts](http://www.macports.org/)**：

```bash
port install nodejs<major version>

# 範例
port install nodejs7
```

使用 **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**：

安裝二進制套件：

```bash
pkgin -y install nodejs
```

或從 pkgsrc 手動編譯：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS 及 illumos

SmartOS 映像檔已經預載了 pkgsrc，其他的 illumos 發行版則需要先**[安裝pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**，接著你就可以依照平常的方式安裝二進制套件：

```bash
pkgin -y install nodejs
```

或從 pkgsrc手動編譯：

```bash
cd pkgsrc/lang/nodejs && bmake install
```


## Void Linux

Void Linux 在其主要軟體庫中提供了 Node.js 穩定版。

```bash
xbps-install -Sy nodejs
```

## Solus

Solus 在其主要軟體庫中提供了 Node.js。

```bash
sudo eopkg install nodejs
```


## Windows

只需從 [nodejs.org](https://nodejs.org) 下載 [Windows 安裝器](https://nodejs.org/#download)即可。

### 其它方式

使用 **[Chocolatey](http://chocolatey.org)**：

```bash
cinst nodejs
# 或者是連同 npm 一起安裝
cinst nodejs.install
```

使用 **[Scoop](http://scoop.sh/)**：

```bash
scoop install nodejs
```
