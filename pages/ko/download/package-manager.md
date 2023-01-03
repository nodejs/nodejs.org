---
layout: page.hbs
title: 패키지 매니저로 Node.js 설치하기
---

<!--
# Installing Node.js via package manager

***Note:*** The packages on this page are maintained and supported by their respective packagers, **not** the Node.js core team. Please report any issues you encounter to the package maintainer. If it turns out your issue is a bug in Node.js itself, the maintainer will report the issue upstream.

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Debian and Ubuntu based Linux distributions, Enterprise Linux/Fedora and Snap packages](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [OpenBSD](#openbsd)
* [openSUSE and SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS and illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows)

---
-->
# 패키지 매니저로 Node.js 설치하기

***Note:*** 이 페이지에 나오는 패키지는 각 패키지 관리자가 관리하고 Node.js 코어 팀이
**관리하지 않습니다**. 이슈가 있다면 패키지 관리자에게 보고해 주세요. 해당 이슈가 Node.js 자체의
버그라면 관리자가 이슈를 Node.js에 보고할 것입니다.

---

* [안드로이드](#android)
* [Arch Linux](#arch-linux)
* [데비안과 우분투 기반 리눅스 배포판. 엔터프라이즈 리눅스/페도라와 Snap 패키지](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [nvs](#nvs)
* [OpenBSD](#openbsd)
* [openSUSE 와 SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS 와 illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows-1)

---

<!--
## Android

Android support is still experimental in Node.js, so precompiled binaries are not yet provided by Node.js developers.

However, there are some third-party solutions. For example, [Termux](https://termux.com/) community provides terminal emulator and Linux environment for Android, as well as own package manager and [extensive collection](https://github.com/termux/termux-packages) of many precompiled applications. This command in Termux app will install the last available Node.js version:

```bash
pkg install nodejs
```

Currently, Termux Node.js binaries are linked against `system-icu` (depending on `libicu` package).
-->
## <!--android-->안드로이드

Node.js의 안드로이드 지원은 현재 시험 단계에 있기 때문에 Node.js 개발자들이 제공하는 미리 컴파일된 바이너리가 아직 없습니다.

하지만 몇 가지 서드파티는 존재합니다. 일례로 [Termux](https://termux.com/) 커뮤니티는 안드로이드를 위한 터미널 에뮬레이터와 리눅스 환경을 제공하는데, 고유한 패키지 매니저와 다수의 [미리 컴파일된 애플리케이션 패키지](https://github.com/termux/termux-packages)도 함께 제공하고 있습니다. Termux 앱에서 다음 명령어를 사용하면 최신 Node.js 버전을 설치합니다.

```bash
pkg install nodejs
```

현재 Termux Node.js 바이너리는 `libicu` 패키지에 의존하는 `system-icu`에 링크되어 있습니다.

<!--
## Arch Linux

Node.js and npm packages are available in the Community Repository.

```bash
pacman -S nodejs npm
```
-->
## Arch Linux

커뮤니티 저장소에서 Node.js와 npm을 이용할 수 있습니다.

```bash
pacman -S nodejs npm
```

<!--
## Debian and Ubuntu based Linux distributions, Enterprise Linux/Fedora and Snap packages

[Official Node.js binary distributions](https://github.com/nodesource/distributions/blob/master/README.md) are provided by NodeSource.
-->
## <!--debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages-->데비안과 우분투 기반 리눅스 배포판. 엔터프라이즈 리눅스/페도라와 Snap 패키지

[공식 Node.js 바이너리 배포판](https://github.com/nodesource/distributions/blob/master/README.md)은 NodeSource가 제공합니다.

<!--
## FreeBSD

The most recent release of Node.js is available via the [www/node](https://www.freshports.org/www/node) port.

Install a binary package via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Or compile it on your own using [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

-->
## FreeBSD

Node.js의 최신 릴리스는 [www/node](https://www.freshports.org/www/node) 포트를 통해 사용할 수 있습니다.

바이너리 패키지는 다음과 같이 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg)를 통해 설치할 수 있습니다.

```bash
pkg install node
```

또는 다음과 같이 [ports](https://www.freebsd.org/cgi/man.cgi?ports)를 사용해 컴파일 할 수도 있습니다.

```bash
cd /usr/ports/www/node && make install
```

<!--
## Gentoo

Node.js is available in the portage tree.

```bash
emerge nodejs
```
-->
## Gentoo

Node.js는 portage를 사용할 수 있습니다.

```bash
emerge nodejs
```

<!--
## IBM i

LTS versions of Node.js are available from IBM, and are available via [the 'yum' package manager](https://ibm.biz/ibmi-rpms). The package name is `nodejs` followed by the major version number (for instance, `nodejs8`, `nodejs10`, `nodejs12`, etc)

To install Node.js 12.x from the command line, run the following as a user with \*ALLOBJ special authority:

```bash
yum install nodejs12
```

Node.js can also be installed with the IBM i Access Client Solutions product. See [this support document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) for more details
-->
## IBM i

IBM에서 ['yum' 패키지 매니저](https://ibm.biz/ibmi-rpms)를 통해 Node.js의 LTS 버전을 사용할 수 있습니다.
패키지 이름은 `nodejs` 뒤에 주 버전 숫자를 붙이면 됩니다(`nodejs8`, `nodejs10`, `nodejs12` 등).

커맨드 라인에서 Node.js 12.x를 설치하려면 \*ALLOBJ 특수 권한을 가진 사용자로 다음 명령을 실행하세요.

```bash
yum install nodejs12
```

IBM i Access Client 솔루션 제품을 통해 Node.js를 설치할 수도 있습니다.
자세한 사항은 [지원 문서](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)를 참조하세요.

<!--
## NetBSD

Node.js is available in the pkgsrc tree:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Or install a binary package (if available for your platform) using pkgin:

```bash
pkgin -y install nodejs
```
-->
## NetBSD

pkgsrc에서 Node.js를 설치할 수 있습니다.

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

사용하는 플랫폼에서 가능하다면 pkgin로 바이너리 패키지를 설치하는 방법도 있습니다.

```bash
pkgin -y install nodejs
```

<!--
## nvm
Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

On Unix / OS X systems Node.js built from source can be installed using
[nvm](https://github.com/creationix/nvm) by installing into the location that nvm expects:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

After this you can use `nvm` to switch between released versions and versions
built from source.
For example, if the version of Node.js is v8.0.0-pre:

```bash
nvm use 8
```

Once the official release is out you will want to uninstall the version built
from source:

```bash
nvm uninstall 8
```
-->

## nvm
Node Version Manager는 Node.js의 다양한 릴리스 버전을 관리하는 bash 스크립트입니다. nvm으로
설치, 제거, 버전 변경 같은 작업을 할 수 있습니다. nvm을 설치하려면
[설치 스크립트](https://github.com/nvm-sh/nvm#install--update-script)를 사용하세요.

Unix / OS X 시스템에서는 소스로 빌드된 Node.js를
[nvm](https://github.com/creationix/nvm)으로 설치할 수 있습니다.
이는 nvm에 설정된 위치에 설치됩니다.

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

설치 후 `nvm`으로 릴리스 된 버전이나 소스에서 빌드한 버전 간에 변경할 수 있습니다.
예를 들어 Node.js 버전이 v8.0.0-pre라면 다음과 같이 실행합니다.

```bash
nvm use 8
```

공식적으로 릴리스 된 후 소스에서 빌드된 버전을 다음과 같이 제거할 수 있습니다.

```bash
nvm uninstall 8
```

## nvs

#### Windows
The `nvs` version manager is cross-platform and can be used on Windows, macOS, and Unix-like systems

To install `nvs` on Windows go to the [release page](https://github.com/jasongin/nvs/releases) here and download the MSI installer file of the latest release.

You can also use `chocolatey` to install it:

```bash
choco install nvs
```

#### macOS,UnixLike
You can find the documentation regarding the installation steps of `nvs` in macOS/Unix-like systems [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Usage
After this you can use `nvs` to switch between different versions of node.

To add the latest version of node:

```bash
nvs add latest
```

Or to add the latest LTS version of node:

```bash
nvs add lts
```

Then run the `nvs use` command to add a version of node to your `PATH` for the current shell:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

To add it to `PATH` permanently, use `nvs link`:

```bash
nvs link lts
```

<!--
## OpenBSD

Node.js is available through the ports system.

```bash
/usr/ports/lang/node
```

Using [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```
-->
## OpenBSD

다음과 같이 ports 시스템을 통해 Node.js를 사용할 수 있습니다.

```bash
/usr/ports/lang/node
```

OpenBSD 환경에서 [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)를 사용하는 방법도 있습니다.

```bash
pkg_add node
```

<!--
## openSUSE and SLE

Node.js is available in the main repositories under the following packages:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6`
  (The "Web and Scripting Module" must be [added before installing](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

For example, to install Node.js 4.x on openSUSE Leap 42.2, run the following as root:

```bash
zypper install nodejs4
```
-->

## <!--opensuse-and-sle-->openSUSE와 SLE

다음 패키지 아래 주 저장소에서 Node.js를 사용할 수 있습니다.

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6`
  ("웹과 스크립트 모듈"은 반드시 [설치 전에 추가](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html)해야 합니다.)

예시로 openSUSE Leap 42.2에서 Node.js 4.x를 설치하려면 root 계정으로 다음 명령어를 실행해야 합니다.

```bash
zypper install nodejs4
```

<!--
## macOS

Simply download the [macOS Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

_If you want to download the package with bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```
-->
## macOS

[nodejs.org](https://nodejs.org/) 웹사이트에서 [매킨토시 인스톨러](https://nodejs.org/ko/#home-downloadhead)를 다운로드 받으세요.

_bash에서 패키지를 다운로드 받고 싶다면 다음 명령어를 실행하세요._

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

<!--
### Alternatives

Using **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Using **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Using **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Install the binary package:

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```
-->
### 그 밖의 방법

**[Homebrew](https://brew.sh/)**를 사용할 수 있습니다.

```bash
brew install node
```

**[MacPorts](https://www.macports.org/)**를 사용할 수 있습니다.

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

**[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**를 사용해서
바이너리 패키지를 설치할 수 있습니다.

```bash
pkgin -y install nodejs
```

pkgsrc에서 수동으로 빌드할 수도 있습니다.

```bash
cd pkgsrc/lang/nodejs && bmake install
```

<!--
## SmartOS and illumos

SmartOS images come with pkgsrc pre-installed. On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal:

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```
-->
## <!--smartos-and-illumos-->SmartOS와 illumoss

SmartOS 이미지에는 미리 설치된 pkgsrc가 포함되어 있습니다. illumos 배포판에서는 먼저
**[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**를 설치하고 평소처럼
바이너리 패키지를 설치하세요.

```bash
pkgin -y install nodejs
```

pkgsrc에서 수동으로 빌드할 수도 있습니다.

```bash
cd pkgsrc/lang/nodejs && bmake install
```

<!--
## Solus

Solus provides Node.js in its main repository.

```bash
sudo eopkg install nodejs
```
-->
## Solus

Solus는 메인 저장소에서 Node.js를 제공합니다.

```bash
sudo eopkg install nodejs
```

<!--
## Void Linux

Void Linux ships Node.js stable in the main repository.

```bash
xbps-install -Sy nodejs
```
-->
## Void Linux

Void Linux는 메인 저장소에서 Node.js 안정 버전을 제공합니다.

```bash
xbps-install -Sy nodejs
```

<!--
## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### Alternatives

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
-->
## Windows

[nodejs.org](https://nodejs.org/) 웹사이트에서
[윈도우 인스톨러](https://nodejs.org/ko/#home-downloadhead)를 직접 다운로드 받으세요.

### 그 밖의 방법

**[Chocolatey](https://chocolatey.org/)**를 사용할 수 있습니다.

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

**[Scoop](https://scoop.sh/)**를 사용할 수 있습니다.

```bash
scoop install nodejs
```
