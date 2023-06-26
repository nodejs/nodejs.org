---
layout: page.hbs
title: 通过包管理器安装 Node.js
---

# 通过包管理器方式安装 Node.js

***注意：*** 此页面上所有的安装包均有它们各自作者，**非** Node.js 核心团队负责进行维护和支持。如遇任何问题，请直接向有关作者报告。 如你的问题被证实是因为 Node.js 的缺陷引发的，维护者将直接向 Node.js 汇报此问题。

---

* [Alpine Linux](#alpine-linux)
* [Android](#android)
* [Arch Linux](#arch-linux)
* [CentOS, Fedora 和 Red Hat Enterprise Linux](#centos-fedora-和-red-hat-enterprise-linux)
* [基于 Linux 发布的 Debian 和 Ubuntu](#基于-linux-发布的-debian-和-ubuntu)
* [fnm](#fnm)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [nvm](#macos)
* [n](#n)
* [NetBSD](#netbsd)
* [Nodenv](#nodenv)
* [nvm](#nvm)
* [nvs](#nvs)
* [OpenBSD](#openbsd)
* [openSUSE 和 SLE](#opensuse-和-sle)
* [SmartOS 和 illumos](#smartos-和-illumos)
* [Snap](#snap)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows-1)
* [z/OS](#zos)

---

## Alpine Linux

Node.js 以及 npm 包管理器在社区库中可如下方式使用：

```bash
pkg install nodejs
pkg install nodejs-current
```

Node.js Current 可以从社区仓库安装。

```bash
pacman -S nodejs npm
```

## Android

因为 Android 版的 Node.js 目前处于实验阶段，所以当下不提供预编译版本。

但是你有一些第三方的解决方案可供选择：拿 [Termux](https://termux.com/) 来说，它为安卓提供了终端模拟器和 Linux 环境，以及内置的包管理器和[可扩展应用集](https://github.com/termux/termux-packages)，其中包含了大量预编译的应用。在 Termux 中，以下的命令将会安装最新版 Node.js：

```bash
dnf module install nodejs:<stream>
```

目前，Termux 的 Node.js 二进制程序包与 `system-icu` （依赖于 `libicu` 包）相关联。

## Arch Linux

Node.js 以及 npm 包管理器在社区库中可如下方式使用：

```bash
pacman -S nodejs npm
```

## CentOS, Fedora 和 Red Hat Enterprise Linux

Node.js可以在 CentOS/RHEL 8 和 Fedora 中作为名为 `nodejs` 的模块使用。

```bash
dnf module install nodejs:<stream>
```

其中 `<stream>` 对应于Node.js的主要版本。 要查看可使用如下命令：

```bash
dnf module list nodejs
```

例如，安装 Node.js 18：

```bash
dnf module install nodejs:18/common
```

### 可替换项

这些资源提供了与CentOS、Fedora和RHEL兼容的包。
* [Node.js 快照](#snap) 在 https://github.com/nodejs/snap 得到支持和维护。
* [Node.js 二进制发布版](#debian-and-ubuntu-based-linux-distributions) 通过 [NodeSource](https://github.com/nodesource/distributions) 得到维护支持。

## 基于 Linux 发布的 Debian 和 Ubuntu

[Node.js 二进制发行版](https://github.com/nodesource/distributions) 可从 NodeSource 获得。

### 可替换项

兼容基于 Debian 和 Ubuntu 的 Linux 发行版的软件包可通过 [Node.js snaps](#snap) 获取。

## fnm

快速和简单的 Node.js 版本管理器构建于Rust 中，用于管理多个发布的 Node.js 版本。 它允许您执行安装、卸载、自动根据当前目录切换节点版本等操作。 要安装 fnm, 请使用此 [安装脚本](https://github.com/Schniz/fnm#using-a-script-macoslinux)。

fnm 有跨平台支持 (macOS, Windows, Linux) & 所有流行炮弹(Bash, Zsh, Fish, PowerShell, Windows 命令行提示)。 fnm 是用速度构建的，并支持 `.node-version` 和 `.nvmrc` 文件。

## FreeBSD

最新发布的 Node.js 通过 [www/node](https://www.freshports.org/www/node) 端口可用。

通过 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) 安装二进制软件包：

```bash
pkg install node
```

或者使用 [ports](https://www.freebsd.org/cgi/man.cgi?ports) 来自行编译：

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js 在 portage tree 中可用。

```bash
emerge nodejs
```

## IBM i

Node.js的LTS版本可从IBM获取，可通过 [“yum”软件包管理器](https://ibm.biz/ibmi-rpms)获取。 软件包名称是 `nodejs` 后面是主要版本号 (例如) `nodejs12`, `nodejs14` 等)

要从命令行安装 Node.js 14.x，请以 \*ALLOBJ 特殊授权用户模式下，运行以下命令：

```bash
emerge nodejs
```

Node.js也可以通过IBM i Access Client Solutions 产品安装。请参阅 [此支持文档](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) 了解更多详情

## macOS

直接从 [nodejs.org](https://nodejs.org/) 网站下载 [macOS Installer](https://nodejs.org/en/#home-downloadhead)

_如果你想用命令行的方式安装：_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 可替代方案

使用 **[自制程序](https://brew.sh/)**：

```bash
brew install node
```

使用 **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

使用 **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

安装二进制软件包：

```bash
pkgin -y install nodejs
```

或从 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` 是一个简单的使用 Node.js 版本管理器为 Mac 和 Linux 。 指定要安装的目标版本使用丰富的语法 或者从先前下载的版本的菜单中选择。 版本安装在全系统或用户范围内，对于更多的 目标用途，您可以直接从缓存下载运行版本。

请参阅 [主页](https://github.com/tj/n) 以获取安装方法 (bootstrap, npm, Homebrew, 第三方) 以及所有使用详细信息。

如果您已经有 `npm` 然后安装 `n` ：

```
npm install -g n
n lts
```

## NetBSD

Node.js 在 pkgsrc 树中可用：

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

或者使用 pkgin 安装二进制软件包(如果您的平台可用)：

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` 是一个轻量级节点版本管理器，类似于 `nvm`。 它是简单和可预测的。一个丰富的插件生态系统可以让你裁剪它来满足你的需要。 使用 `nodenv` 为您的应用程序选择节点版本，并保证您的开发环境与生产相符。

Nodenv 安装程序通过[此GitHub 页](https://github.com/nodenv/nodenv#installation)进行维护。请访问并确保你完全遵循了最新版本的安装步骤。

## nvm
节点版本管理器是一个基础脚本，用于管理多个发布的 Node.js 版本。 它允许 您执行诸如安装、卸载、切换版本等操作。 要安装 nvm，请使用 [安装脚本](https://github.com/nvm-sh/nvm#install--update-script)。

在 Unix / OS X 系统节点。 可以通过 [nvm](https://github.com/creationix/nvm) 通过安装到 nvm 期望的位置来安装源代码生成：

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

在此之后，您可以使用 `nvm` 来切换发布版本和从源代码生成的 版本。 例如，如果Node.js版本是 v8.0.0-pre：

```bash
nvm use 8
```

一旦正式发行完毕，您将想要从源代码卸载生成的 版本：

```bash
nvm uninstall 8
```

## nvs

#### Windows
`nvs` 版本管理器是跨平台的，可以在 Windows 、 macOS 和 Unix 式系统上使用

若要在Windows上安装 `nvs` ，请到这里的 [发布页面](https://github.com/jasongin/nvs/releases) 并下载最新版本的 MSI安装程序文件。

您也可以使用 `chocolatey` 来安装它：

```bash
choco install nvs
```

#### macOS，UnixLike
您可以在这里的macOS/ Unix式系统 [找到关于 `nvs` 安装步骤的文档](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### 使用方法
在此之后，您可以使用 `nvs` 在不同版本的节点之间切换。

要添加最新版本的 Node：

```bash
nvs add latest
```

或者添加最新的 LTS Node 版本：

```bash
nvs add lts
```

然后运行 `nvs 使用` 命令将节点版本添加到您 `PATH` 当前shell：

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

要永久添加到 `PATH` ，请使用 `nvs 链接`:

```bash
nvs link lts
```

## OpenBSD

Node.js可以通过 Ports 系统获得。

```bash
/usr/ports/lang/node
```

在 OpenBSD 上使用 [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)

```bash
pkg_add node
```

## openSUSE 和 SLE

Node.js在以下软件包的主仓库中可用：

* **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
* **openSUSE Tumbleweed**: `nodejs16`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14` ("Web and Scripting Module" 必须是 [启用](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated)状态)
* **SUSE Linux Enterprise Server (SLES) 15**: `nodejs10`, `nodejs12`, and `nodejs14` ("Web and Scripting Module" 必须是 [启用](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module)状态)

例如，若要在 openSUSE Leap 15.2上安装 Node.js 14.x，请以 root 身份运行以下命令：

```bash
zypper install nodejs14
```

可以同时安装和使用不同版本的节点。

## SmartOS 和 illumos

SmartOS 镜像与 pkgsrc 是一起被预安装的。在其他illumos 发行版上，首先安装 **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**</strong>，然后您可以按照正常情况安装二进制软件包：

```bash
pkgin -y install nodejs
```

或从 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap)在 Snap 商店的[`node`](https://snapcraft.io/node)中获取。

## Solus

在主版本库中 Solus 提供了 Node.js，所以你可以这样安装：

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux 在主仓库中映射了 Node.js 一些稳定的功能。

```bash
xbps-install -Sy nodejs
```

## Windows

直接从 [nodejs.org](https://nodejs.org/) 网站下载 [Windows 安装程序](https://nodejs.org/en/#home-downloadhead)

### 可替代方案

使用 **[Winget](https://aka.ms/winget-cli)**：

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

运行了上述两个命令中的一个。 可能需要在 `节点` CLI 命令可用之前重启终端仿真器。

使用 **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

使用 **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; 可用两种安装格式。 SMP/E 和 PAX 。 选择适用于您的安装格式：
* [在 z/OS 上安装配置 Node.js 的 SMP/E 版本](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
* [在 z/OS 上安装和配置Node.js 的 PAX 版](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
