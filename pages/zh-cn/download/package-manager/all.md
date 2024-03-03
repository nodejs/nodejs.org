---
layout: hbs
title: 通过软件包管理器安装 Node.js
---

# 通过软件包管理器安装 Node.js

> 此页面上的软件包是由各自的软件包软件包管理和支持的，**不是** Node.js核心团队。 请将您遇到的任何问题报告给软件包维护者。 如果你的问题在Node.js本身是一个错误，维护者将向上报告这个问题。

***

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora and Red Hat Enterprise Linux](#centos-fedora-and-hat-enterprise-linux)
- [基于 Debian 和 Ubuntu 的 Linux 发行版](#debian-andubuntu-based-linux-distribution)
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
- [openSUSE 和 SLE](#opensused-sle)
- [SmartOS and illumos](#smartos-andillumos)
- [Snap](#snap)
- [Solus](#solus)
- [无效线性](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Alpine Linux

Node.js LTS 和 npm 软件包可在主仓库中获得。

```bash
apk 添加节点npm
```

Node.js Current 可以从社区仓库安装。

```bash
apk 添加节点电流
```

## Android

Android 支持仍然是Node.js中的实验性支持，因此预编译的二进制文件尚未由Node.js开发人员提供。

然而，有一些第三方解决方案。例如， [Termux](https://termux)。 om/) 社区为 Android 提供终端模拟器和Linux 环境，以及自己的软件包管理器和[广泛收藏](https://github)。 很多预编译应用程序的om/termux/termux-packes。Termux 应用程序中的此命令将安装最新可用的 Node.js 版本：

```bash
pkg install nodejs
```

目前，Termux Node.js binaries 与 `system-icu` (依赖`libicu` 包) 连接。

## Arch Linux

Node.js 和 npm 软件包可在社区仓库中使用。

```bash
pacman -S nodejs npm
```

## CentOS, Fedora and Red Hat Enterprise Linux

Node.js可以在 CentOS/RHEL 8 和 Fedora 中作为一个名为“nodejs”的模块使用。

```bash
dnf module install nodejs:<stream>
```

<stream>对应于Node.js的主要版本。
查看可用流列表：

```bash
dnf 模块列表节点列表
```

例如，安装 Node.js 18：

```bash
dnf 模块安装 nodejs:18/common
```

### 替代办法

这些资源提供了与CentOS、Fedora和RHEL兼容的包。

- [Node.js snaps](#snap) 维护和支持 https\://github.com/nodejs/snap
- [Node.js binary distributions](#debian-and-ubuntu-based-linux-distributions) maintained and supported by [NodeSource](https://github.com/nodesource/distributions)

## 基于 Debian 和 Ubuntu 的 Linux 分布

[Node.js 二进制发行版](https://github.com/nodesource/distributions) 可从NodeSource处获取。

### 替代办法

兼容基于 Debian 和 Ubuntu 的 Linux 发行版的软件包可通过 [Node.js snaps](#snap) 获得。

## fnm

快速和简单的 Node.js 版本管理器构建于Rust 中，用于管理多个发布的 Node.js 版本。 它允许您执行安装、卸载、自动根据当前目录切换节点版本等操作。
要安装fnm, 请使用这个 [install](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm 有跨平台支持 (macOS, Windows, Linux) 和所有流行的炮弹(Bash, Zsh, Fish, PowerShell, Windows 命令行提示)。
fnm 是以速度和兼容性支持构建的 `.node-version` 和 `.nvmrc` 文件。

## FreeBSD

最近发行的Node.js可通过[www/node](https://www.freshports.org/www/node)港口查阅。

通过 [pkg]安装一个二进制软件包(https\://www\.freebsd.org/cgi/man.cgi?pkg)：

```bash
pkg 安装节点
```

或者使用 [ports](https://www.freebsd.org/cgi/man.cgi?ports)自行编译它：

```bash
cd /usr/ports/www/node && make installation
```

## 根多文

Node.js在搬运树中可用。

```bash
出现节点数
```

## IBM i

Node.js的LTS版本可从IBM获取，可通过['yum'软件包管理器](https://ibm.biz/ibmi-rpms)获得。 软件包名称是 `nodejs` ，其后是主要版本号(例如`nodejs18`, `nodejs20` 等)

要从命令行安装 Node.js 20.x，请以 \*ALLOBJ 特殊授权运行以下用户

```bash
yum install nodejs20
```

Node.js 也可以通过IBM i Access Client Solutions production安装。更多详情请查看[此支持文档](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)

## macOS

直接从 [nodejs.org](https://nodejs.org/) 下载[macOS Installer](/#home-downloadhead)。

_如果你想要用Bash下载软件包：_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 替代办法

使用 **[Homebrew](https://brew.sh/)**：

```bash
酿造安装节点
```

使用 **[MacPorts](https://www.macports.org/)**：

```bash
端口安装nodejs<major version>

# 示例
端口安装nodejs7
```

使用 **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**：

安装二进制软件包：

```bash
pkgin -y install nodejs
```

或从 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n`是一个简单的使用 Node.js 版本管理器的 Mac 和 Linux。 指定要安装的目标版本使用丰富的语法,
或从先前下载的版本菜单中选择. 版本安装在全系统或用户范围内，对于更多的
目标使用，您可以直接从缓存的下载运行一个版本。

请参阅 [homepage](https://github.com/tj/n) 以获取安装方法 (bootstrap, npm, Homebrew, Third party) 以及所有的使用详细信息。

如果您已经安装了 `npm` ，然后安装了 `n` ，然后安装最新的 LTS `node` 版本就像这样简单：

```
npm install -g n
n lts
```

## NetBSD

Node.js 在 pkgsrc 树中可用：

```bash
cd /usr/pkgsrc/lang/nodejs&并进行安装
```

或者使用 pkgin 安装二进制软件包(如果您的平台可用)：

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` 是一个轻量节点版本管理器，类似于`nvm`。 它是简单和可预测的。一个丰富的插件生态系统可以让你裁剪它来满足你的需要。 使用 "nodenv" 为您的应用程序选择一个节点版本，并保证您的开发环境与生产匹配。

[根据Github page](https://github.com/nodenv/nodenv#install)保留Novenv 安装说明。请访问该页面以确保你跟随最新版本的安装步骤。

## nvm

节点版本管理器是一个基础脚本，用于管理多个发布的 Node.js 版本。 它允许
您执行操作，如安装、卸载、切换版本等。
要安装 nvm，请使用此 [install] (https\://github.com/nvm-sh/nvm#install--update-script).

在 Unix / OS X systems Node.js 上，可以通过
[nvm](https://github.com/creatationix/nvm) 安装到 nvm 期望的位置：

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

在这之后, 你可以使用 `nvm` 来切换发布版本和
从源代码生成的版本。
如果Node.js版本是 v8.0.0-pre：

```bash
nvm 使用 8
```

一旦正式发行完毕，您将想要从源代码卸载已生成的
版本：

```bash
nvm 卸载 8
```

## nvs

#### 窗口

`nvs`版本管理器是跨平台的，可以在 Windows 、 macOS 和 Unix 式系统上使用

若要在 Windows 上安装 `nvs` ，请前往这里[发布页面](https://github.com/jasongin/nvs/releases)并下载最新版本的 MSI安装程序文件。

你也可以使用 `chocolatey` 来安装它：

```bash
choco install nvs
```

#### macOS,UnixLike

You can find the documentation regarding the installation steps of `nvs` in macOS/Unix-like systems [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### 用法

在这之后你可以使用 `nvs` 来切换不同版本的节点。

要添加最新版本的节点：

```bash
nvs 添加最新版本
```

或者添加最新的 LTS 节点版本：

```bash
nvs 添加 lts
```

然后运行 `nvs use` 命令，在当前外壳的 `PATH` 中添加一个节点版本：

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

若要永久添加到 `PATH` 中，请使用 `nvs link`：

```bash
nvs link lts
```

## OpenBSD

Node.js可以通过端口系统获得。

```bash
/usr/ports/lang/节点
```

在 OpenBSD 上使用 [pkg_add](https\://man.openbsd.org/OpenBSD current/man1/pkg_add.1)

```bash
pkg_add 节点
```

## openSUSE 和 SLE

Node.js在以下软件包的主仓库中可用：

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (“Web and Scripting Module”必须是 [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SSP5/#intro-modulesExtensionsRelated)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  ("Web and Scripting Module" 必须是 [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module)

例如，若要在 openSUSE Leap 15.2上安装 Node.js 14.x，请以 root 运行以下：

```bash
zypper install nodejs14
```

可以同时安装和使用不同版本的节点。

## SmartOS 和 illumos

SmartOS 图像与预先安装的 pkgsrc 一起。在其他illumos 分布上，首先安装\*\*[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)\*\*，然后你可以按照正常情况安装二进制软件包：

```bash
pkgin -y install nodejs
```

或从 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## 吸附

[Node.js snaps](https://github.com/nodejs/snap)可在 Snap 商店上以[`node`](https://snapcraft.io/node)查阅。

## Solus

解决方案在其主要仓库中提供 Node.js。

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux在主仓库中投射Node.js稳定的功能。

```bash
xbps-install -Sy nodejs
```

## 窗口

从 [nodejs.org](https://nodejs.org/) 直接下载[Windows Installer](/#home-downloadhead)。

### 替代办法

使用 **[Winget](https://aka.ms/winget-clies)**：

```bash
winget install OpenJS.NodeJS
# 或 LTS
winget install OpenJS.NodeJS.LTS
```

在运行上述两个命令中的一个后，可能需要在`node`CLI命令可用之前重新启动
终端仿真器。

使用 **[Chocolatey](https://chocolatey.org/)**：

```bash
cintiple nodejs
# 或使用 npm
cinstont sinstalling 完整安装
```

使用 **[Scoop](https://scoop.sh/)**：

```bash
scoop install nodejs
# 或 LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; 可用两种安装格式，
SMP/E 和 PAX 。 选择适用于您的安装格式：

- [在z/OS上安装和配置SMP/E版Node.js](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [在z/OS上安装和配置PAX版本的 Node.js](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
