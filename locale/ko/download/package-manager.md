---
layout: page.hbs
title: 패키지 매니저로 Node.js 설치하기
---

# 패키지 매니저로 Node.js 설치하기

***Note:*** The packages on this page are maintained and supported by their respective packagers, **not** the Node.js core team. Please report any issues you encounter to the package maintainer. If it turns out your issue is a bug in Node.js itself, the maintainer will report the issue upstream.

---

* [안드로이드](#android)
* [Arch Linux](#arch-linux)
* [데비안과 우분투 기반 리눅스 배포판. 엔터프라이즈 리눅스/페도라와 Snap 패키지](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [OpenBSD](#openbsd)
* [openSUSE 와 SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS 와 illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows)

---

## 안드로이드

***Note:*** 이 페이지에 나오는 패키지는 각 패키지 관리자가 관리하고 Node.js 코어 팀이 **관리하지 않습니다**. 이슈가 있다면 패키지 관리자에게 보고해 주세요. 해당 이슈가 Node.js 자체의 버그라면 관리자가 이슈를 Node.js에 보고할 것입니다.

However, there are some third-party solutions. For example, [Termux](https://termux.com/) community provides terminal emulator and Linux environment for Android, as well as own package manager and [extensive collection](https://github.com/termux/termux-packages) of many precompiled applications. This command in Termux app will install the last available Node.js version:

```bash
pkg install nodejs
```

Node.js의 안드로이드 지원은 현재 시험 단계에 있기 때문에 Node.js 개발자들이 제공하는 미리 컴파일된 바이너리가 아직 없습니다.

## Arch Linux

하지만 몇 가지 서드파티는 존재합니다. 일례로 [Termux](https://termux.com/) 커뮤니티는 안드로이드를 위한 터미널 에뮬레이터와 리눅스 환경을 제공하는데, 고유한 패키지 매니저와 다수의 [미리 컴파일된 애플리케이션 패키지](https://github.com/termux/termux-packages)도 함께 제공하고 있습니다. Termux 앱에서 다음 명령어를 사용하면 최신 Node.js 버전을 설치합니다.

```bash
pacman -S nodejs npm
```

## 데비안과 우분투 기반 리눅스 배포판. 엔터프라이즈 리눅스/페도라와 Snap 패키지

현재 Termux Node.js 바이너리는 `libicu` 패키지에 의존하는 `system-icu`에 링크되어 있습니다.

## FreeBSD

The most recent release of Node.js is available via the [www/node](https://www.freshports.org/www/node) port.

커뮤니티 저장소에서 Node.js와 npm을 이용할 수 있습니다.

```bash
pkg install node
```

Or compile it on your own using [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

[공식 Node.js 바이너리 배포판](https://github.com/nodesource/distributions/blob/master/README.md)은 NodeSource가 제공합니다.

```bash
emerge nodejs
```

## IBM i

LTS versions of Node.js are available from IBM, and are available via [the 'yum' package manager](https://ibm.biz/ibmi-rpms). The package name is `nodejs` followed by the major version number (for instance, `nodejs8`, `nodejs10`, `nodejs12`, etc)

Node.js의 최신 릴리스는 [www/node](https://www.freshports.org/www/node) 포트를 통해 사용할 수 있습니다.

```bash
yum install nodejs12
```

바이너리 패키지는 다음과 같이 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg)를 통해 설치할 수 있습니다.

## NetBSD

또는 다음과 같이 [ports](https://www.freebsd.org/cgi/man.cgi?ports)를 사용해 컴파일 할 수도 있습니다.

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Or install a binary package (if available for your platform) using pkgin:

```bash
pkgin -y install nodejs
```

## nvm
Node.js는 portage를 사용할 수 있습니다.

On Unix / OS X systems Node.js built from source can be installed using [nvm](https://github.com/creationix/nvm) by installing into the location that nvm expects:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

IBM에서 ['yum' 패키지 매니저](https://ibm.biz/ibmi-rpms)를 통해 Node.js의 LTS 버전을 사용할 수 있습니다. 패키지 이름은 `nodejs` 뒤에 주 버전 숫자를 붙이면 됩니다(`nodejs8`, `nodejs10`, `nodejs12` 등).

```bash
nvm use 8
```

커맨드 라인에서 Node.js 12.x를 설치하려면 \*ALLOBJ 특수 권한을 가진 사용자로 다음 명령을 실행하세요.

```bash
nvm uninstall 8
```

## OpenBSD

IBM i Access Client 솔루션 제품을 통해 Node.js를 설치할 수도 있습니다. 자세한 사항은 [지원 문서](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)를 참조하세요.

```bash
/usr/ports/lang/node
```

Using [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```

## openSUSE 와 SLE

pkgsrc에서 Node.js를 설치할 수 있습니다.

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6` ("웹과 스크립트 모듈"은 반드시 [설치 전에 추가](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html)해야 합니다.)

사용하는 플랫폼에서 가능하다면 pkgin로 바이너리 패키지를 설치하는 방법도 있습니다.

```bash
zypper install nodejs4
```

## macOS

Simply download the [macOS Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

_If you want to download the package with bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 그 밖의 방법

Unix / OS X 시스템에서는 소스로 빌드된 Node.js를 [nvm](https://github.com/creationix/nvm)으로 설치할 수 있습니다. 이는 nvm에 설정된 위치에 설치됩니다.

```bash
brew install node
```

설치 후 `nvm`으로 릴리스 된 버전이나 소스에서 빌드한 버전 간에 변경할 수 있습니다. 예를 들어 Node.js 버전이 v8.0.0-pre라면 다음과 같이 실행합니다.

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

공식적으로 릴리스 된 후 소스에서 빌드된 버전을 다음과 같이 제거할 수 있습니다.

Install the binary package:

```bash
pkgin -y install nodejs
```

다음과 같이 ports 시스템을 통해 Node.js를 사용할 수 있습니다.

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS 와 illumos

OpenBSD 환경에서 [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1)를 사용하는 방법도 있습니다.

```bash
pkgin -y install nodejs
```

다음과 같이 ports 시스템을 통해 Node.js를 사용할 수 있습니다.

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

다음 패키지 아래 주 저장소에서 Node.js를 사용할 수 있습니다.

```bash
sudo eopkg install nodejs
```

## Void Linux

예시로 openSUSE Leap 42.2에서 Node.js 4.x를 설치하려면 root 계정으로 다음 명령어를 실행해야 합니다.

```bash
xbps-install -Sy nodejs
```

## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### 그 밖의 방법

[nodejs.org](https://nodejs.org/) 웹사이트에서 [매킨토시 인스톨러](https://nodejs.org/ko/#home-downloadhead)를 다운로드 받으세요.

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
