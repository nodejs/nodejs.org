---
layout: article
title: 패키지 관리자를 통한 Node.js 설치
---

# 패키지 관리자를 통한 Node.js 설치

> 이 페이지의 패키지는 각각의 패키지 관리자에 의해 유지 관리 및 지원되며, **Node.js 코어 팀이 지원하는 것이 아닙니다**. 문제가 발생하면 패키지 관리자에게 문의해 주세요. 만약 문제가 Node.js 자체의 버그라면, 패키지 관리자가 이를 상위 리포트에 전달할 것입니다.

## Alpine Linux

Node.js LTS 및 npm 패키지는 Main Repository에서 사용할 수 있습니다.

```bash
apk add nodejs npm
```

Node.js Current 버전은 Community Repository에서 설치할 수 있습니다.

```bash
apk add nodejs-current
```

## Android

Android에서 Node.js 지원은 아직 실험적이며, Node.js 개발자들이 제공하는 미리 컴파일된 바이너리는 아직 없습니다.

하지만, 타사 솔루션이 몇 가지 있습니다. 예를 들어, [Termux](https://termux.com/) 커뮤니티는 Android용 터미널 에뮬레이터와 Linux 환경을 제공하며, 자체 패키지 관리자와 [광범위한 미리 컴파일된 애플리케이션 모음](https://github.com/termux/termux-packages)을 제공합니다. Termux 앱에서 다음 명령어를 실행하면 최신 Node.js 버전을 설치할 수 있습니다:

```bash
pkg install nodejs
```

현재 Termux의 Node.js 바이너리는 `system-icu`에 연결되어 있습니다(이는 `libicu` 패키지에 따라 달라집니다).

## Arch Linux

Node.js 및 npm 패키지는 Community Repository에서 사용할 수 있습니다.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora 및 Red Hat Enterprise Linux

Node.js는 CentOS/RHEL 8 및 Fedora에서 `nodejs`라는 모듈로 사용할 수 있습니다.

```bash
dnf module install nodejs:<stream>
```

여기서 `<stream>`은 Node.js의 주요 버전과 대응됩니다. 사용 가능한 스트림 목록을 보려면:

```bash
dnf module list nodejs
```

예를 들어, Node.js 18을 설치하려면:

```bash
dnf module install nodejs:18/common
```

### 대안

이 리소스들은 CentOS, Fedora 및 RHEL과 호환되는 패키지를 제공합니다.

- [Node.js snaps](#snap) - https://github.com/nodejs/snap에서 유지 관리 및 지원
- [NodeSource](https://github.com/nodesource/distributions)에서 유지 관리하고 지원하는 [Node.js 바이너리 배포판](#debian-and-ubuntu-based-linux-distributions)

## Debian 및 Ubuntu 기반 리눅스 배포판

[Node.js 바이너리 배포판](https://github.com/nodesource/distributions)은 NodeSource에서 사용할 수 있습니다.

### 대안

Debian 및 Ubuntu 기반 리눅스 배포판과 호환되는 패키지는 [Node.js snaps](#snap)를 통해 사용할 수 있습니다.

## Exherbo Linux

Node.js 및 npm 패키지는 [arbor repository](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node)에서 사용할 수 있습니다.

```bash
cave resolve -x node
```

## fnm

Fast and simple Node.js 버전 관리자로 Rust로 작성되어 여러 릴리즈된 Node.js 버전을 관리하는 데 사용됩니다. 설치, 제거, 현재 디렉터리에 따라 Node 버전 자동 전환 등의 작업을 수행할 수 있습니다.
fnm을 설치하려면 이 [설치 스크립트](https://github.com/Schniz/fnm#using-a-script-macoslinux)를 사용하세요.

fnm은 크로스 플랫폼 지원(맥OS, 윈도우, 리눅스)과 모든 인기 있는 셸(Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt)을 지원합니다.
fnm은 속도를 염두에 두고 설계되었으며 `.node-version` 및 `.nvmrc` 파일에 대한 호환성을 지원합니다.

## FreeBSD

Node.js의 최신 릴리즈는 [www/node](https://www.freshports.org/www/node) 포트를 통해 사용할 수 있습니다.

바이너리 패키지를 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg)를 통해 설치하려면:

```bash
pkg install node
```

또는 [ports](https://www.freebsd.org/cgi/man.cgi?ports)를 사용하여 직접 컴파일하려면:

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js는 포트리지 트리에 있습니다.

```bash
emerge nodejs
```

## IBM i

Node.js의 LTS 버전은 IBM에서 사용할 수 있으며, [yum 패키지 관리자](https://ibm.biz/ibmi-rpms)를 통해 설치할 수 있습니다. 패키지 이름은 주요 버전 번호가 붙은 `nodejs`입니다(예: `nodejs18`, `nodejs20` 등).

명령줄에서 Node.js 20.x를 설치하려면, \*ALLOBJ 특수 권한을 가진 사용자로 다음을 실행하세요:

```bash
yum install nodejs20
```

Node.js는 IBM i Access Client Solutions 제품을 통해서도 설치할 수 있습니다. 자세한 내용은 [이 지원 문서](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)를 참조하세요.

## macOS

[macOS Installer](/#home-downloadhead)를 직접 [nodejs.org](https://nodejs.org/) 웹사이트에서 다운로드하세요.

만약 bash로 패키지를 다운로드하려면:

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 대안

\*\*[Homebrew](https://brew.sh/)\*\*를 사용하는 경우:

```bash
brew install node
```

\*\*[MacPorts](https://www.macports.org/)\*\*를 사용하는 경우:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

\*\*[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)\*\*를 사용하는 경우:

이진 패키지를 설치하려면:

```bash
pkgin -y install nodejs
```

또는 pkgsrc에서 수동으로 빌드하려면:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n`은 Mac과 Linux에서 사용하기 쉬운 Node.js 버전 관리자입니다. 설치할 대상 버전을 풍부한 구문을 사용하여 지정하거나, 이전에 다운로드한 버전 목록에서 선택할 수 있습니다. 버전은 시스템 전체 또는 사용자 범위로 설치되며, 보다 특화된 사용을 위해 캐시된 다운로드에서 직접 버전을 실행할 수 있습니다.

설치 방법(부트스트랩, npm, Homebrew, 타사) 및 모든 사용 세부정보는 [홈페이지](https://github.com/tj/n)에서 확인하세요.

이미 `npm`이 설치되어 있다면 `n`을 설치한 후 최신 LTS `node` 버전을 설치하는 것은 다음과 같이 간단합니다:

```
npm install -g n
n lts
```

## NetBSD

Node.js는 pkgsrc 트리에서 사용할 수 있습니다:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

또는 pkgin을 사용하여 이진 패키지를 설치하려면(플랫폼에 사용할 수 있는 경우):

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv`는 `nvm`과 유사한 경량 Node 버전 관리자입니다. 간단하고 예측 가능합니다. 풍부한 플러그인 생태계는 필요에 맞게 조정할 수 있게 해줍니다. `nodenv`를 사용하여 애플리케이션에 대한 Node 버전을 선택하고 개발 환경이 프로덕션과 일치하도록 보장합니다.

Nodenv 설치 지침은 [Github 페이지](https://github.com/nodenv/nodenv#installation)에서 유지 관리됩니다. 해당 페이지를 방문하여 최신 버전의 설치 단계를 따르고 있는지 확인하세요.

## nvm

Node Version Manager는 여러 릴리스된 Node.js 버전을 관리하는 데 사용되는 bash 스크립트입니다. 설치, 제거, 버전 전환 등의 작업을 수행할 수 있습니다.
nvm을 설치하려면 이 [설치 스크립트](https://github.com/nvm-sh/nvm#install--update-script)를 사용하세요.

Unix / OS X 시스템에서는 소스에서 빌드된 Node.js를 nvm을 사용하여 설치할 수 있으며, nvm이 예상하는 위치에 설치해야 합니다:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

이후에는 `nvm`을 사용하여 릴리스된 버전과 소스에서 빌드된 버전 간에 전환할 수 있습니다. 예를 들어 Node.js 버전이 v8.0.0-pre인 경우:

```bash
nvm use 8
```

공식 릴리스가 나오면 소스에서 빌드한 버전을 제거하려고 할 것입니다:

```bash
nvm uninstall 8
```

## nvs

#### Windows

`nvs` 버전 관리자는 크로스 플랫폼이며 Windows, macOS 및 Unix 유사 시스템에서 사용할 수 있습니다.

Windows에 `nvs`를 설치하려면 [릴리스 페이지](https://github.com/jasongin/nvs/releases)로 가서 최신 릴리스의 MSI 설치 파일을 다운로드하세요.

`chocolatey`를 사용하여 설치할 수도 있습니다:

```bash
choco install nvs
```

#### macOS, Unix 유사 시스템

macOS/Unix 유사 시스템에서 `nvs`의 설치 단계에 대한 문서는 [여기](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)에서 확인할 수 있습니다.

#### 사용법

이후에는 `nvs`를 사용하여 다른 Node 버전 간에 전환할 수 있습니다.

Node의 최신 버전을 추가하려면:

```bash
nvs add latest
```

또는 Node의 최신 LTS 버전을 추가하려면:

```bash
nvs add lts
```

그런 다음 `nvs use` 명령을 실행하여 현재 셸의 `PATH`에 Node 버전을 추가하세요:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

`PATH`에 영구적으로 추가하려면 `nvs link`를 사용하세요:

```bash
nvs link lts
```

## OpenBSD

Node.js is available through the ports system.

```bash
/usr/ports/lang/node
```

Using [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```

## openSUSE 및 SLE

Node.js는 다음 패키지로 메인 리포지토리에서 사용할 수 있습니다:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, 및 `nodejs14`
  ( "웹 및 스크립팅 모듈"이 [활성화](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated)되어야 합니다.)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, 및 `nodejs14`
  ( "웹 및 스크립팅 모듈"이 [활성화](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module)되어야 합니다.)

예를 들어, openSUSE Leap 15.2에서 Node.js 14.x를 설치하려면 다음 명령을 root로 실행하세요:

```bash
zypper install nodejs14
```

서로 다른 주요 버전의 Node는 동시에 설치하고 사용할 수 있습니다.

## SmartOS 및 illumos

SmartOS 이미지는 pkgsrc가 사전 설치되어 제공됩니다. 다른 illumos 배포판에서는 먼저 \*\*[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)\*\*를 설치한 다음, 다음과 같이 이진 패키지를 정상적으로 설치할 수 있습니다:

```bash
pkgin -y install nodejs
```

또는 pkgsrc에서 수동으로 빌드하려면:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap)는 Snap 스토어에서 [`node`](https://snapcraft.io/node)로 제공됩니다.

## Solus

Solus는 메인 리포지토리에서 Node.js를 제공합니다.

```bash
sudo eopkg install nodejs
```

## vfox

Windows, macOS, Linux를 위한 **확장 가능한** 크로스 플랫폼 버전 관리자입니다.

다양한 프로젝트에 대해 **다양한 버전**을 사용하거나, **다양한 셸에 대해** 다른 버전을 사용하고, 현재 디렉토리에 따라 Node 버전을 자동으로 전환할 수 있습니다.

모든 인기 있는 셸(Bash, Zsh, Fish, PowerShell, Clink, Cmder)을 지원합니다.

vfox를 신속하게 사용하기 위한 [빠른 시작 가이드](https://vfox.lhan.me/guides/quick-start.html)와 모든 사용 세부정보를 확인하세요.

## Void Linux

Void Linux는 메인 리포지토리에서 Node.js의 안정적인 버전을 제공합니다.

```bash
xbps-install -Sy nodejs
```

## Windows

[Windows Installer](/#home-downloadhead)를 [nodejs.org](https://nodejs.org/) 웹사이트에서 직접 다운로드하세요.

### 대안

\*\*[Winget](https://aka.ms/winget-cli)\*\*를 사용하여:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

위의 두 명령 중 하나를 실행한 후 `node` CLI 명령이 사용 가능해지기 전에 터미널 에뮬레이터를 재시작해야 할 수도 있습니다.

\*\*[Chocolatey](https://chocolatey.org/)\*\*를 사용하여:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

\*\*[Scoop](https://scoop.sh/)\*\*를 사용하여:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg;는 두 가지 설치 형식(SMP/E 및 PAX)으로 제공됩니다. 해당하는 설치 형식을 선택하세요:

- [z/OS에서 Node.js의 SMP/E 버전 설치 및 구성하기](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [z/OS에서 Node.js의 PAX 버전 설치 및 구성하기](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
