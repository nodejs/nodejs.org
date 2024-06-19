---
layout: download
title: 通过包管理器安装 Node.js
---

# 通过包管理器安装 Node.js

> 这个页面上的软件包由各自的打包者维护和支持，而不是 Node.js 核心团队。当将您遇到的任何疑问时，请将问题报告给软件包维护者。如果问题最终是 Node.js 本身的 bug，则维护者将向上报告该问题。

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora 和 Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian 以及 Ubuntu based Linux 发行版](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE 与 SLE](#opensused-sle)
- [SmartOS 和 illumos](#smartos-andillumos)
- [Snap](#snap)
- [Solus](#solus)
- [vfox](#vfox)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js LTS 和 npm 软件包可在主仓库中获得。

```bash
apk add nodejs npm
```

Node.js Current 可从社区仓库安装。

```bash
apk add nodejs-current
```

## Android

在 Node.js 中，Android 支持仍处于实验阶段，因此 Node.js 开发人员尚未提供预编译的二进制文件。

但是，有一些第三方解决方案。例如，[Termux](https://termux.com/) 社区为 Android 提供终端模拟器和 Linux 环境，以及自己的包管理器和广泛的[预编译应用程序集合](https://github.com/termux/termux-packages)。在 Termux 应用中，此命令将安装最新可用的 Node.js 版本：

```bash
pkg install nodejs
```

目前，Termux Node.js 二进制文件链接到 `system-icu`(依赖于`libicu`软件包)。

## Arch Linux

Node.js 以及 npm 包管理器可在社区库中使用。

```bash
pacman -S nodejs npm
```

## CentOS、Fedora 和 Red Hat Enterprise Linux

Node.js 在 CentOS/RHEL 8 和 Fedora 中作为一个名为 `nodejs` 的模块可用。

```bash
dnf module install nodejs:<stream>
```

`<stream>` 对应于 Node.js 的主要版本号。如需查看可用stream的列表：

```bash
dnf module list nodejs
```

例如，安装 Node.js 18：

```bash
dnf module install nodejs:18/common
```

### 备选资源

这些资源提供了与 CentOS、Fedora 和 RHEL 兼容的软件包。

- [Node.js snaps](#snap) 在https://github.com/nodejs/snap 维护并得到支持
- [Node.js 二进制发行版](#debian-and-ubuntu-based-linux-distributions) 由 [NodeSource](https://github.com/nodesource/distributions) 维护并得到支持。

## 基于 Linux 的 Debian 和 Ubuntu 发行版

[Node.js 二进制发行版](https://github.com/nodesource/distributions) 可从 NodeSource 获取。

### 备选资源

与基于 Linux 的 Debian 和 Ubuntu 发行版兼容的软件包可以通过 [Node.js snaps](#snap) 获取。

## Exherbo Linux

Node.js 和 npm 软件包可以在 [arbor 仓库](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node)当中找到。

```bash
cave resolve -x node
```

## fnm

"fnm" 是一个用 Rust 构建的快速简单的 Node.js 版本管理器，用于管理多个已发布的 Node.js 版本。它允许您执行诸如安装、卸载、根据当前目录自动切换 Node 版本等操作。
要安装 fnm，请使用此[安装脚本](https://github.com/Schniz/fnm#using-a-script-macoslinux)。

fnm 具有跨平台支持(macOS、Windows、Linux)和所有流行的 shell(Bash、Zsh、Fish、PowerShell、Windows 命令行提示符)。
fnm 的设计考虑了速度和对 `.node-version` 和 `.nvmrc` 文件的兼容性。

## FreeBSD

最新版本的 Node.js 可通过 [www/node](https://www.freshports.org/www/node) 端口获取。

通过 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) 安装一个二进制包：

```bash
pkg install node
```

或者使用 [ports](https://www.freebsd.org/cgi/man.cgi?ports) 自行编译安装：

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js 可以在 Portage 树中找到。

```bash
emerge nodejs
```

## IBM i

LTS 版本的 Node.js 可以从 IBM 获取，并且可以通过 [yum 包管理器](https://ibm.biz/ibmi-rpms) 获取。包名为 `nodejs`，后跟主要版本号(例如 `nodejs18`、`nodejs20` 等)。

要从命令行安装 Node.js 20.x，请以具有 \*ALLOBJ 特殊权限的用户身份运行以下命令：

```bash
yum install nodejs20
```

Node.js 也可以使用 IBM i Access Client Solutions 产品进行安装。有关更多详细信息，请参阅 [此支持文档](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)。

## macOS

直接从 [nodejs.org](https://nodejs.org/) 网站下载 [macOS 安装程序](/#home-downloadhead)。

_如果您想使用 bash 下载软件包：_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 备选资源

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

安装二进制包：

```bash
pkgin -y install nodejs
```

或者从 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` 是一个简单易用的 Node.js 版本管理器，适用于 Mac 和 Linux。使用丰富的语法指定要安装的目标版本，或从先前下载的版本菜单中进行选择。这些版本可以系统范围或用户范围安装，对于更有针对性的使用，您可以直接从缓存的下载文件中运行一个版本。

请查看 [首页](https://github.com/tj/n) 获取安装方法（bootstrap、npm、Homebrew、第三方）以及所有的使用详情。

如果您已经安装了 `npm`，那么安装 `n`，然后安装最新的 LTS `node` 版本就这样简单：

```
npm install -g n
n lts
```

## NetBSD

Node.js 可以在 pkgsrc 树中找到：

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

或者使用 pkgin 安装一个二进制包（如果适用于您的平台）：

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` 是一个轻量级的 Node 版本管理器，类似于 `nvm`。它简单而可预测。丰富的插件生态系统让您可以根据自己的需求进行定制。使用 `nodenv` 为您的应用选择一个 Node 版本，并确保您的开发环境与生产环境匹配。

Nodenv 的安装说明维护于 [Github 页面](https://github.com/nodenv/nodenv#installation) 上。请访问该页面以确保您遵循最新版本的安装步骤。

## nvm

Node Version Manager（nvm）是一个 bash 脚本，用于管理多个发布的 Node.js 版本。它允许您执行诸如安装、卸载、切换版本等操作。
要安装 nvm，请使用这个 [安装脚本](https://github.com/nvm-sh/nvm#install--update-script)。

在 Unix / OS X 系统上，可以使用[nvm](https://github.com/creationix/nvm)从源代码构建安装 Node.js，方法是安装到 nvm 期望的位置：

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

在这之后，您可以使用 `nvm` 在发布版本和从源代码构建的版本之间进行切换。
例如，如果 Node.js 的版本是 v8.0.0-pre：

```bash
nvm use 8
```

一旦官方版本发布，您可以卸载从源代码构建的版本：

```bash
nvm uninstall 8
```

## nvs

#### Windows

`nvs` 是跨平台的版本管理器，可在 Windows、macOS 和类 Unix 系统上使用。

要在 Windows 上安装 `nvs`，请前往[发布页面](https://github.com/jasongin/nvs/releases)下载最新版本的 MSI 安装程序文件。

您也可以使用 `chocolatey` 进行安装：

```bash
choco install nvs
```

#### macOS、类 Unix

您可以在[这里](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)找到关于在 macOS/类 Unix 系统上安装 `nvs` 的文档。

#### 用法

之后，您可以使用 `nvs` 在不同的 Node. js 版本之间进行切换。

要添加最新版本的 Node. js：

```bash
nvs add latest
```

或者添加最新的 LTS 版本的 Node. js：

```bash
nvs add lts
```

然后运行 `nvs use` 命令将一个 Node. js 版本添加到当前 shell 的 `PATH` 中：

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

要永久添加到 `PATH` 中，请使用 `nvs link`：

```bash
nvs link lts
```

## OpenBSD

Node.js 可通过 ports 系统获得。

```bash
/usr/ports/lang/node
```

在 OpenBSD 上使用 [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)：

```bash
pkg_add node
```

## openSUSE 和 SLE

Node.js 可在以下软件包的主仓库中找到：

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, 和 `nodejs14`（必须[启用](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated)“Web 和脚本模块”）。
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, 和 `nodejs14`（必须[启用](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module)“Web 和脚本模块”）。

例如，在 openSUSE Leap 15.2 上安装 Node.js 14.x，作为 root 运行以下命令：

```bash
zypper install nodejs14
```

可以同时安装和使用不同的 Node. js 主要版本。

## SmartOS 和 illumos

SmartOS 映像预装了 pkgsrc。在其他 illumos 发行版上，首先安装 **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**，然后您可以像平常一样安装二进制软件包：

```bash
pkgin -y install nodejs
```

或者通过 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) 在 Snap store 上以 [`node`](https://snapcraft.io/node) 提供。

## Solus

Solus 在其主软件仓库中提供 Node.js。

```bash
sudo eopkg install nodejs
```

## vfox

一个跨平台（Windows、macOS、Linux）并**可拓展的**版本管理器。

它允许你为**不同的项目使用不同的版本**，**为不同的Shell使用不同的版本**，并根据当前目录自动切换Node版本等等。

它支持所有主流的Shell（Bash、Zsh、Fish、PowerShell、Clink、Cmder）。

查看[快速入门](https://vfox.lhan.me/guides/quick-start.html)，了解vfox如何上手及所有使用细节。

## Void Linux

Void Linux 在其主仓库中提供 Node.js 的稳定版本。

```bash
xbps-install -Sy nodejs
```

## Windows

直接从 [nodejs.org](https://nodejs.org/) 网站下载 [Windows 安装程序](/#home-downloadhead)。

### 备选资源

使用 **[Winget](https://aka.ms/winget-cli)**：

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

在运行上述两个命令之后，可能需要重新启动终端模拟器，然后 `node` 命令行界面命令才能生效。

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

IBM&reg; SDK for Node.js - z/OS&reg; 可用两种安装格式。 SMP/E 和 PAX 。 选择适用于您的安装格式：

- [在 z/OS 上安装和配置 SMP/E 版本的 Node.js](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [在 z/OS 上安装和配置 PAX 版本的 Node.js](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
