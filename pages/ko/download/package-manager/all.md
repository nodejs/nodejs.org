---
layout: docs
title: 패키지 관리자를 통해 Node.js 설치
---

# 패키지 관리자를 통해 Node.js 설치

> 이 페이지의 패키지는 각 패키지 유지자에 의해 유지 및 지원되며 Node.js 코어 팀이 아닙니다. 만나는 문제를 패키지 유지자에게 보고하세요. 문제가 Node.js 자체의 버그인 경우 유지자가 상위로 문제를 보고할 것입니다.

---

- [알파인 리눅스](#alpine-linux)
- [안드로이드](#android)
- [아치 리눅스](#arch-linux)
- [CentOS, Fedora 및 Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [데비안 및 우분투 기반 리눅스 배포판](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE and SLE](#opensuse-and-sle)
- [SmartOS 및 illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js LTS 및 npm 패키지는 Main Repository에서 사용할 수 있습니다.

```bash
apk add nodejs npm
```

Node.js Current는 Community Repository에서 설치할 수 있습니다.

```bash
apk add nodejs-current
```

## Android

Node.js에서 Android 지원은 여전히 실험적이므로 Node.js 개발자들이 아직은 미리 컴파일된 이진 파일을 제공하지 않습니다.

그러나 몇 가지 타사 솔루션이 있습니다. 예를 들어, [Termux](https://termux.com/) 커뮤니티는 Android용 터미널 에뮬레이터 및 리눅스 환경, 자체 패키지 관리자 및 [많은 미리 컴파일된 애플리케이션](https://github.com/termux/termux-packages)의 확장 컬렉션을 제공합니다. Termux 앱에서 이 명령을 실행하면 최신 Node.js 버전이 설치됩니다:

```bash
pkg install nodejs
```

현재 Termux Node.js 이진 파일은 `system-icu`에 링크되어 있습니다 (`libicu` 패키지에 따라).

## Arch Linux

Node.js 및 npm 패키지는 커뮤니티 저장소에서 사용할 수 있습니다.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora 및 Red Hat Enterprise Linux

Node.js는 CentOS/RHEL 8 및 Fedora에서 `nodejs`라는 모듈로 사용할 수 있습니다.

```bash
dnf module install nodejs:<stream>
```

`<stream>`은 Node.js의 주요 버전에 해당합니다.
사용 가능한 스트림 목록을 보려면:

```bash
dnf module list nodejs
```

예를 들어, Node.js 18을 설치하려면:

```bash
dnf module install nodejs:18/common
```

### 대안

이러한 자원은 CentOS, Fedora 및 RHEL과 호환되는 패키지를 제공합니다.

- [Node.js 스냅](#snap)은 https\://github.com/nodejs/snap에서 유지보수 및 지원됩니다.
- [Node.js 이진 배포](#debian-and-ubuntu-based-linux-distributions)는 [NodeSource](https://github.com/nodesource/distributions)에서 유지보수 및 지원됩니다.

## 데비안 및 우분투 기반 리눅스 배포판

[Node.js 이진 배포](https://github.com/nodesource/distributions)는 NodeSource에서 제공됩니다.

### 대안

데비안 및 우분투 기반 리눅스 배포판과 호환되는 패키지는 [Node.js 스냅](#snap)을 통해 이용할 수 있습니다.

## fnm

Rust로 구축된 빠르고 간단한 Node.js 버전 관리자인 fnm은 여러 릴리스된 Node.js 버전을 관리하는 데 사용됩니다. 현재 디렉토리를 기반으로 자동으로 노드 버전을 설치, 제거, 전환하는 등의 작업을 수행할 수 있습니다.
fnm을 설치하려면 [설치 스크립트](https://github.com/Schniz/fnm#using-a-script-macoslinux)를 사용하십시오.

fnm은 macOS, Windows, Linux와 Bash, Zsh, Fish, PowerShell, Windows 명령줄과 호환되는 크로스 플랫폼 지원을 제공합니다.
fnm은 속도와 `.node-version`, `.nvmrc` 파일과의 호환성 지원에 중점을 두고 구축되었습니다.

## FreeBSD

Node.js의 가장 최근 릴리스는 [www/node](https://www.freshports.org/www/node) 포트를 통해 사용 가능합니다.

바이너리 패키지를 [pkg](https://www.freebsd.org/cgi/man.cgi?pkg)를 통해 설치하십시오:

```bash
pkg install node
```

또는 [ports](https://www.freebsd.org/cgi/man.cgi?ports)를 사용하여 직접 컴파일하십시오:

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js는 포트 트리에 사용 가능합니다.

```bash
emerge nodejs
```

## IBM i

Node.js의 LTS 버전은 IBM에서 제공되며 [the 'yum' package manager](https://ibm.biz/ibmi-rpms)를 통해 사용 가능합니다. 패키지 이름은 주 버전 번호를 따라 `nodejs` 다음에 오는 형식입니다 (예: `nodejs18`, `nodejs20` 등).

커맨드 라인에서 Node.js 20.x를 설치하려면 다음을 \*ALLOBJ 특별 권한을 가진 사용자로 실행하십시오:

```bash
yum install nodejs20
```

Node.js는 IBM i Access Client Solutions 제품으로도 설치할 수 있습니다. 자세한 내용은 [이 지원 문서](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619)를 참조하십시오.

## macOS

macOS 설치 프로그램을 직접 [nodejs.org](https://nodejs.org/) 웹 사이트에서 다운로드하십시오.

_배시로 패키지를 다운로드하려면:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### 대안

**[Homebrew](https://brew.sh/)** 사용:

```bash
brew install node
```

**[MacPorts](https://www.macports.org/)** 사용:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

**[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)** 사용:

바이너리 패키지 설치:

```bash
pkgin -y install nodejs
```

또는 pkgsrc에서 수동으로 빌드:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n`은 Mac 및 Linux용 간단한 Node.js 버전 관리자입니다. 풍부한 구문을 사용하여 설치할 대상 버전을 지정하거나, 이전에 다운로드한 버전 목록에서 선택할 수 있습니다. 버전은 시스템 전체 또는 사용자 전체에 설치되며, 더 정교한 사용을 위해 캐시된 다운로드에서 직접 버전을 실행할 수 있습니다.

설치 방법(부트스트랩, npm, Homebrew, 제3자) 및 모든 사용 세부 정보는 [홈페이지](https://github.com/tj/n)를 참조하십시오.

이미 `npm`을 가지고 있다면 `n`을 설치한 다음 최신 LTS `node` 버전을 설치하는 것은 매우 간단합니다.

```
npm install -g n
n lts
```

## NetBSD

Node.js는 pkgsrc 트리에서 사용할 수 있습니다.

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

사용 가능한 경우 바이너리 패키지를 설치하려면 pkgin을 사용하십시오.

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv`는 `nvm`과 유사한 가벼운 노드 버전 관리자입니다. 간단하고 예측 가능합니다. 풍부한 플러그인 생태계를 통해 필요에 맞게 맞춤 설정할 수 있습니다. `nodenv`를 사용하여 응용 프로그램에 Node 버전을 선택하고 개발 환경이 프로덕션과 일치함을 보장하십시오.

Nodenv 설치 지침은 [Github 페이지](https://github.com/nodenv/nodenv#installation)에서 유지됩니다. 최신 설치 단계의 버전을 따르고 있는지 확인하려면 해당 페이지를 방문하십시오.

## nvm

Node 버전 관리자는 여러 릴리스된 Node.js 버전을 관리하는 데 사용되는 bash 스크립트입니다. 설치, 제거, 버전 전환 등과 같은 작업을 수행할 수 있습니다. nvm을 설치하려면 [설치 스크립트](https://github.com/nvm-sh/nvm#install--update-script)를 사용하십시오.

소스에서 빌드된 Unix / OS X 시스템의 Node.js는 nvm을 사용하여 설치할 수 있습니다. nvm이 예상하는 위치에 설치하면 됩니다.

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

이후에 `nvm`을 사용하여 릴리스된 버전과 소스에서 빌드된 버전 간에 전환할 수 있습니다. 예를 들어, Node.js의 버전이 v8.0.0-pre인 경우:

```bash
nvm use 8
```

공식 릴리스가 나오면 소스에서 빌드된 버전을 제거해야 합니다.

```bash
nvm uninstall 8
```

## nvs

#### Windows

`nvs` 버전 관리자는 Windows, macOS 및 Unix-like 시스템에서 사용할 수 있는 크로스 플랫폼입니다.

`nvs`를 Windows에 설치하려면 여기 [릴리스 페이지](https://github.com/jasongin/nvs/releases)로 이동하여 최신 릴리스의 MSI 설치 파일을 다운로드하십시오.

`chocolatey`를 사용하여 설치할 수도 있습니다.

```bash
choco install nvs
```

#### macOS,UnixLike

macOS/Unix와 같은 시스템에서 `nvs` 설치 단계에 대한 설명서를 [여기](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)에서 찾을 수 있습니다.

#### 사용법

이후에 `nvs`를 사용하여 노드의 다른 버전 간에 전환할 수 있습니다.

최신 버전의 노드를 추가하려면:

```bash
nvs add latest
```

또는 최신 LTS 버전의 노드를 추가하려면:

```bash
nvs add lts
```

그런 다음 `nvs use` 명령을 실행하여 현재 셸에 노드 버전을 `PATH`에 추가합니다.

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

영구적으로 `PATH`에 추가하려면 `nvs link`를 사용하세요:

```bash
nvs link lts
```

## OpenBSD

Node.js는 포트 시스템을 통해 사용할 수 있습니다.

```bash
/usr/ports/lang/node
```

OpenBSD에서 [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) 사용하기:

```bash
pkg_add node
```

## openSUSE 및 SLE

Node.js는 다음 패키지로 메인 저장소에서 사용 가능합니다:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, 및 `nodejs14`
  ("Web 및 Scripting Module"은 [활성화](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated)되어야 함).
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, 및 `nodejs14`
  ("Web 및 Scripting Module"은 [활성화](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module)되어야 함).

예를 들어, openSUSE Leap 15.2에 Node.js 14.x를 설치하려면 다음을 루트로 실행하십시오:

```bash
zypper install nodejs14
```

다른 주요 버전의 Node를 설치하고 동시에 사용할 수 있습니다.

## SmartOS 및 illumos

SmartOS 이미지에는 사전 설치된 pkgsrc가 함께 제공됩니다. 다른 illumos 배포판에서는 먼저 \*\*[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)\*\*를 설치한 후 이진 패키지를 보통대로 설치할 수 있습니다:

```bash
pkgin -y install nodejs
```

또는 pkgsrc에서 수동으로 빌드:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## 스냅

[Node.js 스냅](https://github.com/nodejs/snap)은 Snap 스토어의 [`node`](https://snapcraft.io/node)로 사용할 수 있습니다.

## 솔루스

솔루스는 메인 저장소에서 Node.js를 제공합니다.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux는 주 저장소에서 Node.js 안정 버전을 제공합니다.

```bash
xbps-install -Sy nodejs
```

## Windows

[Windows Installer](/#home-downloadhead)를 [nodejs.org](https://nodejs.org/) 웹 사이트에서 직접 다운로드하세요.

### 대안

\*\*[Winget](https://aka.ms/winget-cli)\*\*를 사용하는 중:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

위의 두 명령 중 하나를 실행한 후에는 `node` CLI 명령을 사용할 수 있게 되기 전에 터미널 에뮬레이터를 다시 시작해야 할 수도 있습니다.

\*\*[Chocolatey](https://chocolatey.org/)\*\*를 사용하는 중:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

\*\*[Scoop](https://scoop.sh/)\*\*를 사용하는 중:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM® SDK for Node.js - z/OS®는 SMP/E 및 PAX 두 가지 설치 형식으로 제공됩니다. 해당하는 설치 형식을 선택하십시오.

- z/OS에 Node.js SMP/E 에디션을 설치하고 구성하는 방법
- z/OS에 Node.js PAX 에디션을 설치하고 구성하는 방법
