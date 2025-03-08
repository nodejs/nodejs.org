---
layout: article
title: 使用套件管理器安裝 Node.js
---

# 使用套件管理器安裝 Node.js

> 本站上的套件皆由各自的套件管理器維護與支援，**並非**由 Node.js 的核心團隊維護。若遭遇任何問題，請向該套件的維護者回報。如果問題確實是 Node.js 本身的錯誤，將由維護者負責向上游回報。

## Alpine Linux

Node.js LTS 與 npm 套件皆收錄於主儲存庫。

```bash
apk add nodejs npm
```

你可以從社群儲存庫下載 Node.js 的最新版本。

```bash
apk add nodejs-current
```

## Android

Node.js 對於 Android 的支援系統仍在測試階段，因此 Node.js 的開發者尚未提供預編譯的二進制檔案。

然而，有一些第三方解決方案。例如， [Termux](https://termux.com/) 社群提供了 Android 的終端模擬器和 Linux 環境，以及自己的套件管理器和廣泛的[預編譯應用程式](https://github.com/termux/termux-packages) 。在 Termux 應用程式中使用以下命令可以安裝最新的 Node.js 版本：

```bash
pkg install nodejs
```

目前，Termux 的 Node.js 二進制檔案與 `system-icu` (依賴於 libicu 套件) 進行了連結。

## Arch Linux

Node.js 與 npm 套件皆收錄於主儲存庫。

```bash
pacman -S nodejs npm
```

## CentOS、Fedora 與 Red Hat Enterprise Linux

Node.js 在 CentOS/RHEL 8 和 Fedora 中以 `nodejs` 模組的名稱開放使用。

```bash
dnf module install nodejs:<stream>
```

其中 <stream> 對應 Node.js 的主要版本。
可用的流清單請見下表：

```bash
dnf module list nodejs
```

舉例而言，安裝 Node.js 18 應遵循下列步驟：

```bash
dnf module install nodejs:18/common
```

### 替代方案

這些資源提供與 CentOS、Fedora 和 RHEL 相容的套件。

- [Node.js snaps](#snap) 由 https://github.com/nodejs/snap 維護與支援
- [Node.js 二進制發行版](#debian-and-ubuntu-based-linux-distributions)由 [NodeSource](https://github.com/nodesource/distributions) 維護與支援

## 基於 Debian 或 Ubuntu 的 Linux 發行版

[Node.js 二進制發行版](https://github.com/nodesource/distributions)收錄於 NodeSource。

### 替代方案

和基於 Debian 與 Ubuntu 的 Linux 發行版相容的套件可以透過 [Node.js snaps](#snap) 取得。

## Exherbo Linux

Node.js 和 npm 套件在收錄於 [arbor 版本庫](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node)。

```bash
cave resolve -x node
```

## fnm

快速簡單的 Node.js 版本管理器，使用 Rust 構建，用於管理多個已釋出的 Node.js 版本。其功能包含安裝、解除安裝、根據目錄自動切換 Node 版本等。如欲安裝 fnm，請使用此[安裝腳本](https://github.com/Schniz/fnm#using-a-script-macoslinux)。

fnm 支援跨平台 (macOS、Windows、Linux) 以及所有主流的 shell 指令 (Bash、Zsh、 Fish、PowerShell、Windows Command Line Prompt)。
fnm 在設計時考慮了速度，以及對 `.node-version` 和 `.nvmrc` 檔案的相容性。

## FreeBSD

最新版本的 Node.js 可以透過 [www/node](https://www.freshports.org/www/node) 軟體包取得。

透過 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) 安裝二進制套件：

```bash
pkg install node
```

或自己使用 [ports](https://www.freebsd.org/cgi/man.cgi?ports) 編譯：

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js 可以透過 portage 樹取得。

```bash
emerge nodejs
```

## IBM i

IBM 提供的 Node.js LTS 版本可以透過 [yum 套件管理器](https://ibm.biz/ibmi-rpms)取得。套件名稱為 `nodejs`，後綴為主要版本編號 (例如 `nodejs18`、`nodejs20` 等)。

若要從命令列安裝 Node.js 20.x，請以具有 \*ALLOBJ 特殊權限的使用者身分執行下列命令：

```bash
yum install nodejs20
```

Node.js 也可以與 IBM i Access Client Solutions 一起安裝。詳細資訊請參閱[支援文件](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)

## macOS

直接從 [nodejs.org](https://nodejs.org/) 網站下載 [macOS 安裝器](/#home-downloadhead)。

如欲使用 bash 下載套件：

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 替代方案

使用 **[Homebrew](https://brew.sh/)**：

```bash
brew install node
```

使用 **[MacPorts](https://www.macports.org/)**：

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

使用 **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**：

下載二進制套件：

```bash
pkgin -y install nodejs
```

或從 pkgsrc 自行編譯：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` 是一款簡單易用的 Node.js 版本管理器，適用於 Mac 和 Linux。你可以使用豐富的語法指定欲安裝的目標版本，或者從之前下載的版本清單中進行選擇。安裝範圍可選擇全系統或以使用者為限，也可以直接從快取的下載檔案中執行特定版本。

請參閱[首頁](https://github.com/tj/n)以了解安裝方法 (bootstrap、npm、Homebrew、第三方) 以及所有使用詳細資訊。

如果你已經有 `npm`，那麼安裝 `n` 後再安裝最新的 LTS `node` 非常簡單，只需要執行下列步驟：

```
npm install -g n
n lts
```

## NetBSD

Node.js 可於 pkgsrc 樹中取得：

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

或使用 pkgin 安裝二進制套件 (如果適用於你的平台)：

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` 是一款輕量級的 Node 版本管理器，類似於 `nvm`。它不但設計簡潔，還穩定可靠。豐富的插件生態系統可以讓使用者可以隨心個人化。使用 `nodenv` 為你的應用程式選擇 Node 版本，並確保開發環境與生產環境保持一致。

Nodenv 安裝說明在其 [Github 頁面上](https://github.com/nodenv/nodenv#installation) 進行維護。請前往該頁面以遵循最新版本的安裝步驟。

## nvm

Node Version Manager 是一個 Bash 腳本，用於管理多個已釋出的 Node.js 版本。其功能包含安裝、解除安裝、切換版本等。
如欲安裝 nvm，請使用[此安裝腳本](https://github.com/nvm-sh/nvm#install--update-script)。

在 Unix / OS X 系統上，可以使用 [nvm](https://github.com/creationix/nvm) 安裝從原始碼構建的 Node.js，方法是安裝到 nvm 預期的位置：

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

之後就可以使用 `nvm` 在釋出版本和從原始碼建構的版本之間切換。
例如，如果 Node.js 的版本是 v8.0.0-pre：

```bash
nvm use 8
```

一旦正式版本釋出，就可以解除安裝從原始碼建構的版本：

```bash
nvm uninstall 8
```

## nvs

#### Windows

`nvs` 是一款可在 Windows、macOS 與類 Unix 系統上運行的跨平台版本管理器

如欲在 Windows 上安裝 `nvs`，請前往此[釋出頁面](https://github.com/jasongin/nvs/releases)下載最新版本的 MSI 安裝程式檔案。

此外也可以使用 `chocolatey` 安裝：

```bash
choco install nvs
```

#### macOS, 類 Unix 系統

macOS / 類 Unix 系統安裝步驟文件請[見此](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### 使用方法

安裝後可以使用 `nvs` 切換不同版本的 node。

新增最新版本的 node：

```bash
nvs add latest
```

或是新增最新 LTS 版本的 node：

```bash
nvs add lts
```

隨後執行 `nvs use` 命令將 Node. js 版本加入目前 shell 指令的 `PATH` 中：

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

如欲將其永久新增至 `PATH`，請使用 `nvs link`：

```bash
nvs link lts
```

## OpenBSD

Node.js 可透過 ports 系統取得。

```bash
/usr/ports/lang/node
```

在 OpenBSD 上使用 [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)：

```bash
pkg_add node
```

## openSUSE 及 SLE

Node.js 收錄於主儲存庫的以下軟體包：

- **openSUSE Leap 15.2**：`nodejs10`、`nodejs12`、`nodejs14`
- **openSUSE Tumbleweed**：`nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**：`nodejs10`、`nodejs12`和`nodejs14`
  (「Web 與腳本模組」必須[啟用](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated)。)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14` (「Web 與腳本模組」必須[啟用](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module)。)

舉例而言，如果要在 openSUSE Leap 15.2 上安裝 Node.js 14.x，請以 root 身分執行下列命令：

```bash
zypper install nodejs14
```

不同主要版本的 Node 可以同時安裝和使用。

## SmartOS 及 illumos

SmartOS 映像預先安裝了 pkgsrc。在其他 illumos 發行版上，請先安裝 **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**，然後才可以正常安裝二進制套件：

```bash
pkgin -y install nodejs
```

或從 pkgsrc 自行編譯：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) 在 Snap 商店中顯示為 [`node`](https://snapcraft.io/node)。

## Solus

Solus 的主儲存庫有提供 Node.js。

```bash
sudo eopkg install nodejs
```

## vfox

這是一款跨平台 (Windows、macOS、Linux) 的**可擴充的**版本管理器。

你可以**在不同的專案使用不同的版本**、**在不同的shell使用不同的版本**，也可以根據當下的目錄自動切換 Node 版本等。

它支援所有主流的 shell 指令 (Bash、Zsh、Fish、PowerShell、Clink、Cmder)。

請參閱[快速入門](https://vfox.lhan.me/guides/quick-start.html)瞭解 vfox 的所有使用細節。

## Void Linux

Void Linux 在主儲存庫中提供了 Node.js 的穩定版本。

```bash
xbps-install -Sy nodejs
```

## Windows

直接從 [nodejs.org](https://nodejs.org/) 網站下載 [Windows 安裝器](/#home-downloadhead)。

### 替代方案

使用 **[Winget](https://aka.ms/winget-cli)**：

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

執行上述的兩個命令之一後，可能需要重新啟動，這樣 `node` 的指令才能使用。

使用 **[Chocolatey](https://chocolatey.org/)**：

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

使用 **[Scoop](https://scoop.sh/)**：

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; 有兩種安裝格式可供選擇，分別是
SMP/E 和 PAX。請選擇適合的安裝格式：

- [在 z/OS 上安裝和設定 Node.js 的 SMP/E 版本](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [在 z/OS 上安裝和設定 Node.js 的 PAX 版本](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
