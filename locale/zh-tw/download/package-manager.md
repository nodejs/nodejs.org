---
layout: page.hbs
title: 透過套件管理安裝 Node.js
---

# 透過套件管理安裝 Node.js

***請注意：*** 下列的套件維護及支援 **並非由** Node.js 核心團隊提供，任何套件使用上的問題，應直接聯繫各套件的維護者，若發現問題出於 Node.js 本身，則應由套件維護者聯繫上層。

----------------------------

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Debian 及 Ubuntu 系列發行版，企業版 Linux/Fedora 和 Snap packages](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [OpenBSD](#openbsd)
* [openSUSE 及 SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS 及 illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
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

目前，Termux 的 Node.js 二進位套裝程式與 `system-icu`（依賴于 `libicu` 包）相關聯。

## Arch Linux

Node.js 及 npm 套件可由公有軟體庫取得。

```bash
pacman -S nodejs npm
```
<!--請不要把此改成 ## 的形式，因為自動產生器會完全忽略非英語字元，導致生成的 anchor 名稱與上面實際的名稱不符合，導致無法正確跳轉到所要的位置。
相關修復：HTTPs://github.com/nodejs/nodejs.org/pull/2028-->
<h2>Debian 及 Ubuntu 系列發行版，企業版 Linux/Fedora 和 Snap packages<a name="debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages" class="anchor" href="#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages"></a></h2>

[官方 Node.js 二進制發行版](https://github.com/nodesource/distributions/blob/master/README.md) 透過 NodeSource 提供.

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

<!--請不要把此改成 ## 的形式，因為自動產生器會完全忽略非英語字元，導致生成的 anchor 名稱與上面實際的名稱不符合，導致無法正確跳轉到所要的位置。
相關修復：HTTPs://github.com/nodejs/nodejs.org/pull/2028-->
<h2>openSUSE 及 SLE<a name="opensuse-and-sle" class="anchor" href="#opensuse-and-sle"></a></h2>

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

<!--請不要把此改成 ## 的形式，因為自動產生器會完全忽略非英語字元，導致生成的 anchor 名稱與上面實際的名稱不符合，導致無法正確跳轉到所要的位置。
相關修復：HTTPs://github.com/nodejs/nodejs.org/pull/2028-->
<h2>SmartOS 及 illumos<a name="smartos-and-illumos" class="anchor" href="#smartos-and-illumos"></a></h2>

SmartOS 映像檔已經預載了 pkgsrc，其他的 illumos 發行版則需要先**[安裝pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**，接著你就可以依照平常的方式安裝二進制套件：

```bash
pkgin -y install nodejs
```

或從 pkgsrc手動編譯：

```bash
cd pkgsrc/lang/nodejs && bmake install
```


## Solus

Solus 在其主要軟體庫中提供了 Node.js。

```bash
sudo eopkg install nodejs
```


## Void Linux

Void Linux 在其主要軟體庫中提供了 Node.js 穩定版。

```bash
xbps-install -Sy nodejs
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
