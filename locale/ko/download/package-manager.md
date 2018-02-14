---
layout: page.hbs
title: 패키지 매니저로 Node.js 설치하기
---

<!--
# Installing Node.js via package manager

***Note:*** The packages on this page are maintained and supported by their respective packagers, **not** the Node.js core team. Please report any issues you encounter to the package maintainer. If it turns out your issue is a bug in Node.js itself, the maintainer will report the issue upstream.

----------------------------

* [Arch Linux](#arch-linux)
* [Debian and Ubuntu based Linux distributions](#debian-and-ubuntu-based-linux-distributions)
* [Enterprise Linux and Fedora](#enterprise-linux-and-fedora)
* [FreeBSD and OpenBSD](#freebsd-and-openbsd)
* [Gentoo](#gentoo)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [openSUSE and SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS and illumos](#smartos-and-illumos)
* [Void Linux](#void-linux)
* [Windows](#windows)

----------------------------
-->
# 패키지 매니저로 Node.js 설치하기

***Note:*** 이 페이지에 나오는 패키지는 각 패키지 관리자가 관리하고 Node.js 코어 팀이
**관리하지 않습니다**. 이슈가 있다면 패키지 관리자에게 보고해 주세요. 해당 이슈가 Node.js 자체의
버그라면 관리자가 이슈를 Node.js에 보고할 것입니다.

----------------------------

* [Arch Linux](#arch-linux)
* [Debian과 Ubuntu에 기반을 둔 Linux 배포판](#debian-ubuntu-linux)
* [Enterprise Linux와 Fedora](#enterprise-linux-fedora)
* [FreeBSD와 OpenBSD](#freebsd-openbsd)
* [Gentoo](#gentoo)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [openSUSE와 SLE](#opensuse-sle)
* [macOS](#macos)
* [SmartOS와 illumos](#smartos-illumos)
* [Void Linux](#void-linux)
* [Windows](#windows)

----------------------------

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
## Debian and Ubuntu based Linux distributions

Also including: **Linux Mint**, **Linux Mint Debian Edition (LMDE)**, **elementaryOS**, **bash on Windows** and others.

Node.js is available from the [NodeSource](https://nodesource.com) Debian and Ubuntu binary distributions repository (formerly [Chris Lea's](https://github.com/chrislea) Launchpad PPA). Support for this repository, along with its scripts, can be found on GitHub at [nodesource/distributions](https://github.com/nodesource/distributions).

**NOTE:** If you are using Ubuntu Precise or Debian Wheezy, you might want to read about [running Node.js >= 6.x on older distros](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md).

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
-->
## Debian과 Ubuntu에 기반을 둔 Linux 배포판

**Linux Mint**, **Linux Mint Debian Edition (LMDE)**, **elementaryOS**, **bash on Windows** 등도
포함합니다.

[NodeSource](https://nodesource.com) Debian과 Ubuntu 바이너리 배포판
저장소(전 [Chris Lea's](https://github.com/chrislea) Launchpad PPA)에서
Node.js를 이용할 수 있습니다. 이 저장소의 지원내용과 스크립트를 GitHub
[nodesource/distributions](https://github.com/nodesource/distributions)에서
볼 수 있습니다.

**NOTE:** Ubuntu Precise나 Debian Wheezy를 사용한다면
[오래된 배포판에서 Node.js >= 6.x 실행하기](https://github.com/nodesource/distributions/blob/master/OLDER_DISTROS.md)를
읽어볼 필요가 있습니다.

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```


<!--
Alternatively, for Node.js 9:

```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

***Optional***: install build tools

To compile and install native addons from npm you may also need to install build tools:

```bash
sudo apt-get install -y build-essential
```

**Available architectures:**

* **i386** (32-bit)
* **amd64** (64-bit)
* **armhf** (ARM 32-bit hard-float, ARMv7 and up: _arm-linux-gnueabihf_)

**Supported Ubuntu versions:**

* **Ubuntu 14.04 LTS** (Trusty Tahr)
* **Ubuntu 16.04 LTS** (Xenial Xerus)

**Supported Debian versions:**

* **Debian 7** (wheezy)
* **Debian 8 / stable** (jessie)
* **Debian testing** (stretch, aliased to jessie)
* **Debian unstable** (sid)
-->
Node.js 9를 사용하고 싶다면 다음을 실행합니다.

```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

***선택 사항***: 빌드 도구 설치

npm에서 네이티브 애드온을 컴파일하고 실행하려면 빌드 도구도 설치해야 합니다.

```bash
sudo apt-get install -y build-essential
```

**사용가능한 아키텍처:**

* **i386** (32-bit)
* **amd64** (64-bit)
* **armhf** (ARM 32-bit hard-float, ARMv7 이상: _arm-linux-gnueabihf_)

**지원하는 Ubuntu 버전:**

* **Ubuntu 14.04 LTS** (Trusty Tahr)
* **Ubuntu 16.04 LTS** (Xenial Xerus)

**지원하는 Debian 버전:**

* **Debian 7** (wheezy)
* **Debian 8 / stable** (jessie)
* **Debian testing** (stretch, jessie라고도 부름)
* **Debian unstable** (sid)

<!--
A Node.js package is also available in the [official repo](http://packages.debian.org/search?searchon=names&keywords=nodejs) for Debian Sid (unstable), Jessie (testing) and Wheezy (wheezy-backports) as "nodejs". It only installs a `nodejs` binary.

The [nodejs-legacy package](http://packages.debian.org/search?searchon=names&keywords=nodejs-legacy) installs a `node` symlink that is needed by many modules to build and run correctly.
The Node.js modules available in the distribution official repositories do not need it.
-->
Debian Sid(unstable), Jessie(testing), Wheezy(wheezy-backports)의
[공식 저장소](http://packages.debian.org/search?searchon=names&keywords=nodejs)에서
"nodejs"라는 이름으로 Node.js 패키지를 사용할 수도 있습니다.

[nodejs-legacy package](http://packages.debian.org/search?searchon=names&keywords=nodejs-legacy)는
다수의 모듈을 제대로 빌드하고 실행하는 데 필요한 `node` 심볼릭 링크를 설치합니다.
배포판 공식 저장소에 있는 Node.js 모듈은 이 도구가 필요 없습니다.

<!--
**Supported Linux Mint versions:**

* **Linux Mint 17 "Qiana"** (via Ubuntu 14.04 LTS)
* **Linux Mint 17.1 "Rebecca"** (via Ubuntu 14.04 LTS)
* **Linux Mint 17.2 "Rafaela"** (via Ubuntu 14.04 LTS)
* **Linux Mint Debian Edition (LMDE) 2 "Betsy"** (via Debian 8)

**Supported elementary OS versions:**

* **elementary OS Freya** (via Ubuntu 14.04 LTS)

**Supported Trisquel versions:**

* **Trisquel 7 "Belenos"** (via Ubuntu 14.04 LTS)

**Supported BOSS versions:**

* **BOSS 5.0 "Anokha"** (via Debian 7)
-->
**지원하는 Linux Mint 버전:**

* **Linux Mint 17 "Qiana"** (Ubuntu 14.04 LTS에서)
* **Linux Mint 17.1 "Rebecca"** (Ubuntu 14.04 LTS에서)
* **Linux Mint 17.2 "Rafaela"** (Ubuntu 14.04 LTS에서)
* **Linux Mint Debian Edition (LMDE) 2 "Betsy"** (Debian 8에서)

**지원하는 elementary OS 버전:**

* **elementary OS Freya** (Ubuntu 14.04 LTS에서)

**지원하는 Trisquel 버전:**

* **Trisquel 7 "Belenos"** (Ubuntu 14.04 LTS에서)

**지원하는 BOSS 버전:**

* **BOSS 5.0 "Anokha"** (Debian 7에서)

<!--
## Enterprise Linux and Fedora

Including **Red Hat® Enterprise Linux®** / **RHEL**, **CentOS** and **Fedora**.

Node.js is available from the [NodeSource](https://nodesource.com) Enterprise Linux and Fedora binary distributions repository. Support for this repository, along with its scripts, can be found on GitHub at [nodesource/distributions](https://github.com/nodesource/distributions).

Note that the Node.js packages for EL 5 (RHEL5 and CentOS 5) depend on the **[EPEL](https://fedoraproject.org/wiki/EPEL)** repository being available. The setup script will check and provide instructions if it is not installed.

On RHEL, CentOS or Fedora, for Node.js v8 LTS:
-->
## Enterprise Linux와 Fedora

**Red Hat® Enterprise Linux®** / **RHEL**, **CentOS**, **Fedora**를 포함합니다.

[NodeSource](https://nodesource.com) Enterprise Linux와 Fedora 바이너리 배포판
저장소에서 Node.js를 이용할 수 있습니다. 이 저장소의 지원내용과 스크립트를 GitHub
[nodesource/distributions](https://github.com/nodesource/distributions)에서
볼 수 있습니다.

**[EPEL](https://fedoraproject.org/wiki/EPEL)** 저장소에 기반을 둔 EL 5(RHEL5와
CentOS 5)의 Node.js 패키지도 사용할 수 있습니다. 설치되어 있지 않다면 설정 스크립트가 확인하고
안내할 것입니다.

RHEL, CentOS, Fedora에서 Node.js v8 LTS를 사용하려면 다음을 실행합니다.

<!--
```bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

Alternatively for Node.js 9:

```bash
curl --silent --location https://rpm.nodesource.com/setup_9.x | sudo bash -
```

Then install:

```bash
sudo yum -y install nodejs
```
-->
```bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
```

Node.js 9를 사용한다면 다음을 실행하세요.

```bash
curl --silent --location https://rpm.nodesource.com/setup_9.x | sudo bash -
```

그 다음 아래의 명령어로 설치하세요.

```bash
sudo yum -y install nodejs
```

<!--
***Optional***: install build tools

To compile and install native addons from npm you may also need to install build tools:

```bash
yum install gcc-c++ make
# or: yum groupinstall 'Development Tools'
```
-->
***선택 사항***: 빌드 도구 설치

npm에서 네이티브 애드온을 컴파일하고 실행하려면 빌드도구도 설치해야 합니다.

```bash
yum install gcc-c++ make
# 아니면: yum groupinstall 'Development Tools'
```

<!--
**Available architectures:**ㅌ

* **i386** (32-bit, not available for EL7)
* **x86_64** (64-bit)

**Supported Red Hat® Enterprise Linux® versions:**

* **RHEL 5** (32-bit and 64-bit)
* **RHEL 6** (32-bit and 64-bit)
* **RHEL 7** (64-bit)

**Supported CentOS versions:**

* **CentOS 5** (32-bit and 64-bit)
* **CentOS 6** (32-bit and 64-bit)
* **CentOS 7** (64-bit)

**Supported CloudLinux versions:**
* **CloudLinux 6** (32-bit and 64-bit)

**Supported Fedora versions:**

* **Fedora 21 (Twenty One)** (32-bit and 64-bit)
* **Fedora 20 (Heisenbug)** (32-bit and 64-bit)
* **Fedora 19 (Schrödinger's Cat)** (32-bit and 64-bit)

**Other distributions known to be supported:**

* **Oracle Linux** (mirrors RHEL very closely)
* **Amazon Linux** (tested on 2016.03)
-->
**사용가능한 아키텍처:**

* **i386** (32-bit, EL7에서는 사용할 수 없음)
* **x86_64** (64-bit)

**지원하는 Red Hat® Enterprise Linux® 버전:**

* **RHEL 5** (32-bit와 64-bit)
* **RHEL 6** (32-bit와 64-bit)
* **RHEL 7** (64-bit)

**지원하는 CentOS 버전:**

* **CentOS 5** (32-bit와 64-bit)
* **CentOS 6** (32-bit와 64-bit)
* **CentOS 7** (64-bit)

**지원하는 CloudLinux 버전:**
* **CloudLinux 6** (32-bit와 64-bit)

**지원하는 Fedora 버전:**

* **Fedora 21 (Twenty One)** (32-bit와 64-bit)
* **Fedora 20 (Heisenbug)** (32-bit와 64-bit)
* **Fedora 19 (Schrödinger's Cat)** (32-bit와 64-bit)

**지원되는 걸로 알려진 다른 배포판:**

* **Oracle Linux** (RHEL와 아주 유사한 미러)
* **Amazon Linux** (2016.03에 테스트함)


<!--
### Alternatives

Official **Fedora** [Node.js](https://apps.fedoraproject.org/packages/nodejs) and [npm](https://apps.fedoraproject.org/packages/npm) packages are available in Fedora 18 and later.  Install with:

```bash
sudo yum install nodejs npm
```

In a hurry for the latest updates?  [Grab them from updates-testing.](https://fedoraproject.org/wiki/QA:Updates_Testing)

**Enterprise Linux** (RHEL and CentOS) users may use the Node.js and npm packages from the [EPEL](https://fedoraproject.org/wiki/EPEL) repository.

Install the appropriate *epel-release* RPM for your version (found on the [EPEL](https://fedoraproject.org/wiki/EPEL) repository homepage), then run:

```bash
sudo yum install nodejs npm --enablerepo=epel
```
-->
### 그 밖의 방법

Fedora 18 이후 버전에서는 공식 **Fedora**
[Node.js](https://apps.fedoraproject.org/packages/nodejs)와
[npm](https://apps.fedoraproject.org/packages/npm) 패키지를 사용할 수 있습니다.
다음 명령어로 설치합니다.

```bash
sudo yum install nodejs npm
```

최신 업데이트를 바로 적용하고 싶다면
[테스트 업데이트 버전](https://fedoraproject.org/wiki/QA:Updates_Testing)을 사용하세요.

**엔터프라이즈 Linux**(RHEL와 CentOS) 사용자는 [EPEL](https://fedoraproject.org/wiki/EPEL)
 저장소의 Node.js와 npm 패키지를 사용할 것입니다.

버전에 맞는 *epel-release* RPM을 설치하세요.([EPEL](https://fedoraproject.org/wiki/EPEL)
저장소 페이지에서 찾을 수 있습니다.)

```bash
sudo yum install nodejs npm --enablerepo=epel
```

<!--
In a hurry for the latest updates?  [Grab them from epel-testing.](https://fedoraproject.org/wiki/EPEL/testing)

**Available architectures:**

* **i686** (32-bit, not available for EL7)
* **x86_64** (64-bit)
* **armv6hl** (Raspberry Pi, [Pidora](http://pidora.ca) only)
* **armv7hl** (32-bit ARM hard-float, ARMv7 and up, Fedora only)

**Supported Red Hat® Enterprise Linux® versions:**

* **RHEL 6** (i686/x86_64)
* **RHEL 7** (x86_64)

RHEL 6 is no longer supported through EPEL, you can however use [Red Hat Software Collections](https://www.softwarecollections.org/en/scls/?search=nodejs).

Additionally, versions of **CentOS** and **Scientific Linux** corresponding to the above RHEL versions are also officially supported by all EPEL packages, including nodejs.  Amazon Linux is not officially supported by EPEL due to significant incompatibilities previously reported to the epel-devel mailing list, however you might find that nodejs at least still works.

**Supported Fedora versions:**

* **Fedora Rawhide** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le/s390x)
* **Fedora 26** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le)
* **Fedora 25** (i686/x86_64/armv7hl)
* **Fedora 24** (i686/x86_64/armv7hl)
-->

최신 업데이트를 바로 적용하고 싶다면
[테스트 업데이트 버전](https://fedoraproject.org/wiki/EPEL/testing)을 사용하세요.

**사용 가능한 아키텍처:**

* **i686** (32-bit, EF7에서는 사용할 수 없습니다.)
* **x86_64** (64-bit)
* **armv6hl** (Raspberry Pi, [Pidora](http://pidora.ca) 전용)
* **armv7hl** (32-bit ARM hard-float, ARMv7 이상, Fedora 전용)

**지원하는 Red Hat® Enterprise Linux® 버전:**

* **RHEL 6** (i686/x86_64)
* **RHEL 7** (x86_64)

RHEL 6에서는 더이상 EPEL로 지원되지 않습니다. 하지만 [Red Hat Software Collections](https://www.softwarecollections.org/en/scls/?search=nodejs)를 사용 할 수 있습니다.

게다가 위 RHEL에 대응되는 **CentOS**와 **Scientific Linux** 버전도 모든 EPEL
패키지에서(nodejs 포함) 공식적으로 지원합니다. Amazon Linux는 과거 epel-devel 메일링 리스트에
호환 안 된다는 보고가 많아서 EPEL에서 공식 지원하지 않습니다만 현재 동작하는 nodejs를
찾을 수 있을 것입니다.

**지원하는 Fedora 버전:**

* **Fedora Rawhide** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le/s390x)
* **Fedora 26** (i686/x86_64/armv7hl/aarch64/ppc64/ppc64le)
* **Fedora 25** (i686/x86_64/armv7hl)
* **Fedora 24** (i686/x86_64/armv7hl)

<!--
## FreeBSD and OpenBSD

Node.js is available through the ports system.

**FreeBSD**:

```bash
/usr/ports/www/node
```

**OpenBSD**:

```bash
/usr/ports/lang/node
```

Development versions are also available using ports on FreeBSD

```bash
cd /usr/ports/www/node-devel/ && make install clean
```

Or packages on FreeBSD:

```bash
pkg_add -r node-devel
```

Using [pkg-ng](https://wiki.freebsd.org/pkgng) on FreeBSD

```bash
pkg install node
```

Or the development versions:

```bash
pkg install node-devel
```
-->
## FreeBSD와 OpenBSD

Node.js는 ports 시스템으로 설치할 수 있습니다.

**FreeBSD**:

```bash
/usr/ports/www/node
```

**OpenBSD**:

```bash
/usr/ports/lang/node
```

개발 버전도 FreeBSD의 ports에서 사용할 수 있습니다.

```bash
cd /usr/ports/www/node-devel/ && make install clean
```

아니면 FreeBSD 패키지를 이용할 수도 있습니다.

```bash
pkg_add -r node-devel
```

FreeBSD의 [pkg-ng](https://wiki.freebsd.org/pkgng)를 사용하세요.

```bash
pkg install node
```

개발 버전도 설치할 수 있습니다.

```bash
pkg install node-devel
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

pkgsrc에서 Node.js를 설치할 수 있습니다

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
To install nvm, use this [install script](https://github.com/creationix/nvm#install-script).

On Unix / OS X systems Node.js built from source can be installed using
[nvm](https://github.com/creationix/nvm) by installing into the location that nvm expects:

```bash
$ env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

After this you can use `nvm` to switch between released versions and versions
built from source.
For example, if the version of Node.js is v8.0.0-pre:

```bash
$ nvm use 8
```

Once the official release is out you will want to uninstall the version built
from source:

```bash
$ nvm uninstall 8
```
-->

## nvm
Node Version Manager는 Node.js의 다양한 릴리스 버전을 관리하는 bash 스크립트입니다. nvm으로
설치, 제거, 버전 변경 같은 작업을 할 수 있습니다. nvm을 설치하려면
[설치 스크립트](https://github.com/creationix/nvm#install-script)를 사용하세요.

Unix / OS X 시스템에서는 소스로 빌드된 Node.js를
[nvm](https://github.com/creationix/nvm)으로 설치할 수 있습니다.
이는 nvm에 설정된 위치에 설치됩니다.

```bash
$ env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

설치 후 `nvm`으로 릴리스 된 버전이나 소스에서 빌드한 버전 간에 변경할 수 있습니다.
예를 들어 Node.js 버전이 v8.0.0-pre라면 다음과 같이 실행합니다.

```bash
$ nvm use 8
```

공식적으로 릴리스 된 후 소스에서 빌드된 버전을 다음과 같이 제거할 수 있습니다.

```bash
$ nvm uninstall 8
```

<!--
## openSUSE and SLE

Node.js is available in the main repositories under the following packages:

 - **openSUSE Leap 42.2**: `nodejs4`
 - **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
 - **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
 - **SUSE Linux Enterprise Server (SLES) 12**<sup>1</sup>: `nodejs4`, `nodejs6`

<sup>1:</sup> The "Web and Scripting Module" must be [added before installing](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).

For example, to install Node.js 4.x on openSUSE Leap 42.2, run the following as root:

```bash
zypper install nodejs4
```
-->

## openSUSE와 SLE

다음 패키지 아래 주 저장소에서 Node.js를 사용할 수 있습니다.

 - **openSUSE Leap 42.2**: `nodejs4`
 - **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
 - **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
 - **SUSE Linux Enterprise Server (SLES) 12**<sup>1</sup>: `nodejs4`, `nodejs6`

<sup>1:</sup> "웹과 스크립트 모듈"은 반드시 [설치 전에 추가](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html)해야 합니다.

예시로 openSUSE Leap 42.2에서 Node.js 4.x를 설치하려면 root 계정으로 다음 명령어를 실행해야 합니다.

```bash
zypper install nodejs4
```

<!--
## macOS

Simply download the [macOS Installer](http://nodejs.org/#download) direct from the [nodejs.org](http://nodejs.org) web site.

_If you want to download the package with bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```
-->
## macOS

[nodejs.org](http://nodejs.org) 웹사이트에서 [매킨토시 인스톨러](http://nodejs.org/#download)를 다운로드 받으세요.

_bash에서 패키지를 다운로드 받고 싶다면 다음 명령어를 실행하세요._

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

<!--
### Alternatives

Using **[Homebrew](http://brew.sh/)**:

```bash
brew install node
```

Using **[MacPorts](http://www.macports.org/)**:

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

**[Homebrew](http://brew.sh/)**를 사용할 수 있습니다.

```bash
brew install node
```

**[MacPorts](http://www.macports.org/)**를 사용할 수 있습니다.

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

SmartOS images come with pkgsrc pre-installed.  On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal:

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```
-->
## SmartOS와 illumos

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
## Void Linux

Void Linux ships node.js stable in the main repository.

```bash
xbps-install -Sy nodejs
```
-->
## Void Linux

Void Linux는 메인 저장소에서 node.js 안정 버전을 제공합니다.

```bash
xbps-install -Sy nodejs
```


<!--
## Windows

Simply download the [Windows Installer](http://nodejs.org/#download) directly from the [nodejs.org](http://nodejs.org) web site.

### Alternatives

Using **[Chocolatey](http://chocolatey.org)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Using **[Scoop](http://scoop.sh/)**:

```bash
scoop install nodejs
```
-->
## Windows

[nodejs.org](http://nodejs.org) 웹사이트에서
[윈도우 인스톨러](http://nodejs.org/#download)를 직접 다운로드 받으세요.

### 그 밖의 방법

**[Chocolatey](http://chocolatey.org)**를 사용할 수 있습니다.

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

**[Scoop](http://scoop.sh/)**를 사용할 수 있습니다.

```bash
scoop install nodejs
```
