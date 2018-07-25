---
layout: page.hbs
title: 通过包管理器安装 Node.js
---

# 通过包管理器方式安装 Nodejs

***注意：*** 此页面上所有的安装包均有它们各自作者，**而非** Node.js 核心团队负责进行维护和支持。如遇任何问题，请直接向有关作者报告。 如你的问题被证实是因为 Nodejs 的缺陷引发的，维护者将直接向 Nodejs 汇报此问题。

----------------------------

* [Android](#android)
* [Arch Linux](#arch-linux)
* [基于 Linux 的 Debian 和 Ubuntu 发行版](#debian-and-ubuntu-based-linux-distributions)
* [Enterprise Linux 和 Fedora](#enterprise-linux-and-fedora)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [OpenBSD](#openbsd)
* [openSUSE 和 SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS 和 illumos](#smartos-and-illumos)
* [Void Linux](#void-linux)
* [Solus](#solus)
* [Windows](#windows)

----------------------------

## Android

因为 Android 版的 Nodejs 目前处于实验阶段，所以当下不提供预编译版本。

但是你有一些第三方的解决方案可供选择：拿 [Termux](https://termux.com/) 来说，它为安卓提供了终端模拟器和 Linux 环境，以及内置的包管理器和 [可扩展应用集](https://github.com/termux/termux-packages)，其中包含了大量预编译的应用。在 Termux 中，以下的命令将会安装最新的 LTS 版或是 Nodejs：

```bash
pkg install nodejs
pkg install nodejs-current
```

截止到目前，基于 Termux 的 Node.js 二进制程序包不支持在 ICU 和 Inspector 上编译。

## Arch Linux

Node.js 以及 npm 包管理器在社区库中可如下方式使用：

```bash
pacman -S nodejs npm
```

## 基于Linux 发布的 Debian 和 Ubuntu 系统

同时包括 **Linux Mint**, **Linux Mint Debian Edition (LMDE)**, **elementaryOS**, **bash on Windows** 和其它系统等。

你同时也可以从 [NodeSource](https://nodesource.com) 获取 Debian 和 Ubuntu 的 Node.js 二进制分发库（在此之前则是通过 [Chris Lea's](https://github.com/chrislea) Launchpad PPA）。
有关于这些库和脚本代码方面的分发支持，你可以在 [nodesource/distributions](https://github.com/nodesource/distributions) 找到相关信息。

**注意：** 如果你在使用 Ubuntu Precise 或 Debian Wheezy 系统，你可能需要阅读相关信息：[在更古老的发行版系统上运行大于 6.0 版的 Nodejs](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md)。

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

而在 Node.js 10 版本中：

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

***可选***：安装构建工具

为构建和安装本地化的 npm 插件，你或许需要安装构建工具：

```bash
sudo apt-get install -y build-essential
```

**支持的架构：**

* **i386** (32 位)
* **amd64** (64 位)
* **armhf** (ARM 32 位 hard-float, ARMv7 和以上的 _arm-linux-gnueabihf_)

**Ubuntu 中支持的版本：**

* **Ubuntu 14.04 LTS** (Trusty Tahr)
* **Ubuntu 16.04 LTS** (Xenial Xerus)

**Debian 中支持的版本：**

* **Debian 8** (Jessie，上一个稳定版)
* **Debian 9 / stable** (当前稳定版)
* **Debian testing** (目前仍在测试的下一个稳定版)
* **Debian unstable** (依然在不断迭代的测试版)

您也可以在 [官网发布版](http://packages.debian.org/search?searchon=names&keywords=nodejs) 获取针对 Debian Sid（非稳定版）、Jessie（测试版）和 Wheezy (wheezy补丁版) 的 Nodejs 程序包。它仅仅安装一个 `nodejs` 二进制程序包。

[nodejs-legacy 程序包](http://packages.debian.org/search?searchon=names&keywords=nodejs-legacy) 安装一个被许多模块使用、并使它们能够正常构建和运行的 `node` 符号链接。
注：官方发布的 Node.js 模块库并不需要此链接。

**Linux Mint 中支持的版本：**

* **Linux Mint 17 "Qiana"** (基于 Ubuntu 14.04 LTS)
* **Linux Mint 17.1 "Rebecca"** (基于 Ubuntu 14.04 LTS)
* **Linux Mint 17.2 "Rafaela"** (基于 Ubuntu 14.04 LTS)
* **Linux Mint Debian Edition (LMDE) 2 "Betsy"** (基于 Debian 8)

**OS 中支持的版本：**

* **elementary OS Luna** (基于 Ubuntu 12.04 LTS)
* **elementary OS Freya** (基于 Ubuntu 14.04 LTS)
* **elementary OS Loki** (基于 Ubuntu 16.04 LTS)
* **elementary OS Juno** (基于 Ubuntu 18.04 LTS)

**Trisquel 中支持的版本：**

* **Trisquel 7 "Belenos"** (基于 Ubuntu 14.04 LTS)

**BOSS 中支持的版本：**

* **BOSS 5.0 "Anokha"** (基于 Debian 7)

## Enterprise Linux 和 Fedora

包含 **Red Hat® Enterprise Linux®** / **RHEL**, **CentOS** 以及 **Fedora**。

你可以在 [NodeSource](https://nodesource.com) 获得企业版的 Linux 和 Fedora 版的程序分发包。
并且你可在 [nodesource/distributions](https://github.com/nodesource/distributions) 获取相关信息。

注意： 针对于 EL 5 (RHEL5 和 CentOS 5) 的 Nodejs 程序包依赖于 **[EPEL](https://fedoraproject.org/wiki/EPEL)** 库是否可用， 安装程序将检测是否安装此依赖库并提供相关信息。

对于 RHEL, CentOS or Fedora 系统，Node.js v8 LTS版本命令：

```bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

而 Node.js 10 的命令：

```bash
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
```

然后安装：

```bash
sudo yum -y install nodejs
```

***可选：***： 安装构建工具

为构建和安装本地化的 npm 插件，你或许需要安装构建工具：

```bash
sudo yum install gcc-c++ make
# or: sudo yum groupinstall 'Development Tools'
```

**支持的架构：**

* **i386** (32 位， EL7不支持)
* **x86_64** (64 位)

**Red Hat® Enterprise Linux® 中支持的版本：**

* **RHEL 5** (32 位以及 64 位)
* **RHEL 6** (32 位以及 64 位)
* **RHEL 7** (64 位)

**CentOS 中支持的版本：**

* **CentOS 5** (32 位以及 64 位)
* **CentOS 6** (32 位以及 64 位)
* **CentOS 7** (64 位)

**CloudLinux 中支持的版本：**
* **CloudLinux 6** (32 位以及 64 位)

**Fedora 中支持的版本：**

* **Fedora 21 (Twenty One)** (32 位以及 64 位)
* **Fedora 20 (Heisenbug)** (32 位以及 64 位)
* **Fedora 19 (Schrödinger's Cat)** (32 位以及 64 位)

**其余支持的系统：**

* **Oracle Linux** (非常接近于 RHEL 镜像)
* **Amazon Linux** (于 2016.03 测试完毕)

### 可替代方案

在 Fedora 18 以及后继版本中，你可以通过 [Node.js](https://apps.fedoraproject.org/packages/nodejs) 和 [npm](https://apps.fedoraproject.org/packages/npm) 获取官方正式 Nodejs 安装包。用以下命令安装：

```bash
sudo dnf install nodejs
```

急于获取最新版本？[用于更新测试](https://fedoraproject.org/wiki/QA:Updates_Testing)

**Enterprise Linux** （RHEL 和 CentOS） 的用户可以通过  [EPEL](https://fedoraproject.org/wiki/EPEL) 获得 Node.js 和 npm 程序管理包，并且使用。

针对你的版本安装最合适的 *epel 发布版* (在 [EPEL](https://fedoraproject.org/wiki/EPEL) 的库首页面上)，随后运行：

```bash
sudo yum install nodejs npm --enablerepo=epel
```

急于获取最新版本？[用于 epel 测试](https://fedoraproject.org/wiki/EPEL/testing)

**支持架构：**

* **i686** (32 位，EL7不支持)
* **x86_64** (64 位)
* **armv6hl** (Raspberry Pi，仅是 [Pidora](http://pidora.ca))
* **armv7hl** (32 位 ARM hard-float, ARMv7 以及后续版本，仅Fedora)

**Red Hat® Enterprise Linux® 中支持的版本：**

* **RHEL 6** (i686/x86_64)
* **RHEL 7** (aarch64/x86_64)

RHEL 6 在 EPEL 中已经不被支持，但你可以使用 [Red Hat Software Collections](https://www.softwarecollections.org/en/scls/?search=nodejs) 取代。

除此之外，和以上 RHEL 版本相当的 **CentOS** 和 **Scientific Linux** 系统同样被所有的 EHEL 包支持，包括 nodejs。  因为之前在 epel-devel 中邮件列表中的报告说 Amazon Linux 有巨大的兼容性差异，所以此系统不被官方 EPEL 正式支持，但 Nodejs 仍然可以正常运行。

**Fedora 中支持版本：**

* **Fedora Rawhide** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le/s390x)
* **Fedora 27** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le/s390x)
* **Fedora 26** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le)

## FreeBSD 

可以通过 [www/node](http://freshports.org/www/node) 获取最近的 Node.js。

通过 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg) 安装二进制文件包：

```bash
pkg install node
```

或通过 [ports](https://www.freebsd.org/cgi/man.cgi?ports) 进行构建。

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

可以在 portage tree 中获得 Node.js：

```bash
emerge nodejs
```


## NetBSD

可以在 pkgsrc 目录树中获得 Node.js：

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

或者使用 pkgin 安装一个二进制文件包 (如果它支持你的系统)：

```bash
pkgin -y install nodejs
```

## nvm
Node 版本管理器是一个用于管理多个已发布的 Node.js 不同版本的 bash 脚本。它允许你执行诸如“安装”、“卸载”以及“版本切换”等诸多功能。
使用 [安装脚本](https://github.com/creationix/nvm#install-script) 安装 nvm。

对于 Unix / OS X 系统，Node.js 从源代码构建，并通过 [nvm](https://github.com/creationix/nvm) 安装到你所期望的地方。

```bash
$ env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

随后你可以通过 `nvm` 在“发布版本”和“从源代码构建版本”中选择。

举个例子，如果你的 Node.js 版本是 v8.0.0-pre：

```bash
$ nvm use 8
```

一旦官方发布了版本，并且你希望卸载从源代码编译的版本，可以这样做：

```bash
$ nvm uninstall 8
```

## OpenBSD

Node.js 也可以通过 ports 系统获取。

```bash
/usr/ports/lang/node
```

在 OpenBSD 上中使用[pkg_add](http://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)：

```bash
pkg_add node
```

## openSUSE 以及 SLE

在以下安装包中，Node.js在以下主版本库中可用：

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6`  
  （“Web 和 Scripting 模块” [安装前必须添加](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html)。）

举个例子，在 openSUSE Leap 42.2 上安装 Node.js，用 root 角色运行命令：

```bash
zypper install nodejs4
```

## macOS

从 [nodejs.org](https://nodejs.org) 官网直接下载 [macOS Installer](https://nodejs.org/#download)。

_如果你想用 bash 命令下载：_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 可替代方案

使用 **[Homebrew](http://brew.sh/)**:

```bash
brew install node
```

使用 **[MacPorts](http://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

使用 **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

安装二进制文件包：

```bash
pkgin -y install nodejs
```

或者通过 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS 和 illumos

SmartOS 镜像随 pkgsrc 预装。在其它的 illumos 发布版中，先安装 **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**，然后你可以正常安装二进制文件包：

```bash
pkgin -y install nodejs
```

或通过 pkgsrc 手动构建：

```bash
cd pkgsrc/lang/nodejs && bmake install
```


## Void Linux

在主版本库中 Void Linux 发布稳定的 node.js。

```bash
xbps-install -Sy nodejs
```

## Solus

在主版本库中，Solus 提供了 node.js。

```bash
sudo eopkg install nodejs
```


## Windows

直接通过 [nodejs.org](https://nodejs.org) 下载 [Windows Installer](https://nodejs.org/#download) 安装。

### 可替代方案

使用 **[Chocolatey](http://chocolatey.org)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

使用 **[Scoop](http://scoop.sh/)**:

```bash
scoop install nodejs
```
