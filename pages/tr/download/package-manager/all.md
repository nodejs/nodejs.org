---
layout: docs
title: Installing Node.js via package manager
---

# Installing Node.js via Package Managers

> The packages on this page are maintained and supported by their respective packagers, **not** the Node.js core team. Please report any issues you encounter to the package maintainer. If it turns out your issue is a bug in Node.js itself, the maintainer will report the issue upstream.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora and Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian and Ubuntu based Linux distributions](#debian-and-ubuntu-based-linux-distributions)
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
- [SmartOS and illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js LTS and npm packages are available in the Main Repository.

```bash
apk add nodejs npm
```

Node.js Current can be installed from the Community Repository.

```bash
apk add nodejs-current
```

## Android

Android desteği Node.js'de hala deneyseldir, bu nedenle önceden derlenmiş ikili dosyalar henüz Node.js geliştiricileri tarafından sağlanmamaktadır.

Ancak, bazı üçüncü parti çözümler de mevcuttur. Örneğin, [Termux](https://termux.com/) topluluğu, Android için terminal emülatörü ve Linux ortamının yanı sıra kendi paket yöneticisini ve önceden derlenmiş birçok uygulamanın [kapsamlı koleksiyonunu](https://github.com/termux/termux-packages) sağlar. Termux uygulamasındaki bu komut mevcut son Node.js sürümünü yükleyecektir:

```bash
pkg install nodejs
```

Şu anda Termux Node.js ikili dosyaları `system-icu` paketine bağlıdır (`libicu` paketine bağlı olarak).

## Arch Linux

Node.js ve npm paketleri Topluluk Deposunda mevcuttur.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora ve Red Hat Enterprise Linux

Node.js, CentOS/RHEL 8 ve Fedora'da `nodejs` adlı bir modül olarak mevcuttur.

```bash
dnf module install nodejs:<stream>
```

burada `<stream>` Node.js'in ana sürümüne karşılık gelir.
Mevcut akışların bir listesini görmek için:

```bash
dnf module list nodejs
```

Örneğin, Node.js 18'i yüklemek için:

```bash
dnf module install nodejs:18/common
```

### Alternatifler

Bu kaynaklar CentOS, Fedora ve RHEL ile uyumlu paketler sağlamaktadır.

- [Node.js snaps](#snap) https\://github.com/nodejs/snap adresinde korunmakta ve desteklenmektedir
- [Node.js ikili dağıtımları](#debian-and-ubuntu-based-linux-distributions) [NodeSource](https://github.com/nodesource/distributions) tarafından sürdürülür ve desteklenir

## Debian ve Ubuntu tabanlı Linux dağıtımları

[Node.js ikili dağıtımları](https://github.com/nodesource/distributions) NodeSource'tan temin edilebilir.

### Alternatifler

Debian ve Ubuntu tabanlı Linux dağıtımları ile uyumlu paketler [Node.js snaps](#snap) üzerinden temin edilebilir.

## fnm

Rust'ta yerleşik hızlı ve basit Node.js sürüm yöneticisi, birden fazla yayınlanan Node.js sürümünü yönetmek için kullanılır. Yükleme, kaldırma, geçerli dizine göre Node sürümlerini otomatik olarak değiştirme vb. işlemleri gerçekleştirmenize olanak tanır.
Fnm'yi yüklemek için bu [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux) kullanın.

fnm çapraz platform desteğine (macOS, Windows, Linux) ve tüm popüler kabuklara (Bash, Zsh, Fish, PowerShell, Windows Komut Satırı İstemi) sahiptir.
fnm, `.node-version` ve `.nvmrc` dosyaları için hız ve uyumluluk desteği göz önünde bulundurularak oluşturulmuştur.

## FreeBSD

Node.js'nin en son sürümüne [www/node](https://www.freshports.org/www/node) portu üzerinden erişilebilir.

[pkg](https://www.freebsd.org/cgi/man.cgi?pkg) aracılığıyla ikili bir paket yükleyin:

```bash
pkg install node
```

Ya da [ports](https://www.freebsd.org/cgi/man.cgi?ports) kullanarak kendi başınıza derleyin:

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js portage ağacında mevcuttur.

```bash
emerge nodejs
```

## IBM i

Node.js'nin LTS sürümleri IBM'den temin edilebilir ve [yum paket yöneticisi] (https\://ibm.biz/ibmi-rpms) aracılığıyla kullanılabilir. Paket adı `nodejs` ve ardından ana sürüm numarasıdır (örneğin, `nodejs18`, `nodejs20` vb.)

Node.js 20.x'i komut satırından yüklemek için, \*ALLOBJ özel yetkisine sahip bir kullanıcı olarak aşağıdakileri çalıştırın:

```bash
yum install nodejs20
```

Node.js, IBM i Access Client Solutions ürünü ile de kurulabilir. Daha fazla ayrıntı için [bu destek belgesine] (http\://www-01.ibm.com/support/docview\.wss?uid=nas8N1022619) bakın

## macOS

[macOS Installer](/#home-downloadhead) doğrudan [nodejs.org](https://nodejs.org/) web sitesinden indirin.

Eğer pakedi bash ile yüklemek istiyorsanız

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatifler

[Homebrew](https://brew.sh/)\*\* kullanarak:

```bash
brew install node
```

[MacPorts](https://www.macports.org/)\*\* kullanarak:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

**[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)** kullanılıyor:

İkili paketi yükleyin:

```bash
pkgin -y install nodejs
```

Veya pkgsrc'den manuel olarak derleyin:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

n\`, Mac ve Linux için kullanımı kolay bir Node.js sürüm yöneticisidir. Zengin bir sözdizimi kullanarak yüklemek için hedef sürümü belirtin,
veya önceden indirilmiş sürümlerden oluşan bir menüden seçim yapabilirsiniz. Sürümler sistem genelinde veya kullanıcı genelinde yüklenir ve daha fazlası için
Hedeflenen kullanım için bir sürümü doğrudan önbelleğe alınmış indirmelerden çalıştırabilirsiniz.

Yükleme yöntemleri (bootstrap, npm, Homebrew, üçüncü taraf) ve tüm kullanım ayrıntıları için [homepage](https://github.com/tj/n) adresine bakın.

Eğer zaten `npm` kullanıyorsanız, `n` ve ardından en yeni LTS `node` sürümünü yüklemek kadar basittir:

```
npm install -g n
n lts
```

## NetBSD

Node.js pkgsrc ağacında mevcuttur:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Veya pkgin kullanarak ikili bir paket (platformunuz için mevcutsa) yükleyin:

```bash
pkgin -y install nodejs
```

## Nodenv

nodenv`, `nvm`ye benzer hafif bir node sürüm yöneticisidir. Basit ve öngörülebilirdir. Zengin bir eklenti ekosistemi, onu ihtiyaçlarınıza göre uyarlamanızı sağlar. Uygulamanız için bir Node sürümü seçmek ve geliştirme ortamınızın üretimle eşleşmesini garanti etmek için `nodenv\` kullanın.

Nodenv kurulum talimatları [Github sayfasında] (https\://github.com/nodenv/nodenv#installation) tutulmaktadır. Kurulum adımlarının en son sürümünü takip ettiğinizden emin olmak için lütfen bu sayfayı ziyaret edin.

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

## OpenBSD

Node.js is available through the ports system.

```bash
/usr/ports/lang/node
```

Using [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```

## openSUSE and SLE

Node.js is available in the main repositories under the following packages:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

For example, to install Node.js 14.x on openSUSE Leap 15.2, run the following as root:

```bash
zypper install nodejs14
```

Different major versions of Node can be installed and used concurrently.

## SmartOS and illumos

SmartOS images come with pkgsrc pre-installed. On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal:

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) are available as [`node`](https://snapcraft.io/node) on the Snap store.

## Solus

Solus provides Node.js in its main repository.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux ships Node.js stable in the main repository.

```bash
xbps-install -Sy nodejs
```

## Windows

Download the [Windows Installer](/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### Alternatives

Using **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

After running one of the two commands above, it may be necessary to restart the
terminal emulator before the `node` CLI command becomes available.

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; is available in two installation formats,
SMP/E and PAX. Select the installation format that applies to you:

- [Installing and configuring SMP/E edition of Node.js on z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Installing and configuring PAX edition of Node.js on z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
