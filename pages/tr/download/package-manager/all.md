---
layout: docs
title: Paket yöneticisi aracılığıyla Node.js'in yüklenmesi
---

# Paket Yöneticileri Aracılığıyla Node.js'in Yüklenmesi

> Bu sayfadaki paketler, kendi paketleyicileri tarafından bakımı ve desteklenmektedir, **Node.js çekirdek ekibi değil**. Karşılaştığınız herhangi bir sorunu paketin bakımını yapan kişiye bildirin. Eğer sorununuz Node.js'in kendisinde bir hata olduğu ortaya çıkarsa, bakım yapan kişi bu sorunu yukarıya rapor edecektir.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora ve Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian ve Ubuntu tabanlı Linux dağıtımları](#debian-and-ubuntu-based-linux-distributions)
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
- [SmartOS ve illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js LTS ve npm paketleri Ana Depoda mevcuttur.

```bash
apk add nodejs npm
```

Node.js Current Topluluk Deposundan yüklenebilir.

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

Node.js Sürüm Yöneticisi, birden fazla yayınlanmış Node.js sürümünü yönetmek için kullanılan bir bash betiğidir. Yükleme, kaldırma, sürüm değiştirme vb. gibi işlemleri gerçekleştirmenize olanak tanır. Nvm'yi yüklemek için bu [install script](https://github.com/nvm-sh/nvm#install--update-script) kullanın.

Unix / OS X sistemlerinde kaynaktan derlenmiş Node.js, nvm tarafından beklenen konuma yüklenerek kurulabilir.

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Bundan sonra `nvm` kullanarak yayınlanmış sürümler ve kaynaktan derlenmiş sürümler arasında geçiş yapabilirsiniz. Örneğin, Node.js sürümü v8.0.0-pre ise:

```bash
nvm use 8
```

Resmi sürüm yayınlandığında kaynaktan derlenmiş sürümü kaldırmak isteyeceksiniz:

```bash
nvm uninstall 8
```

## nvs

#### Windows

`nvs` sürüm yöneticisi çapraz platformlu olup Windows, macOS ve Unix benzeri sistemlerde kullanılabilir.

`nvs`'yi Windows üzerinde yüklemek için buraya gidin ve en son sürümün MSI yükleyici dosyasını indirin: [release page](https://github.com/jasongin/nvs/releases).

Ayrıca `chocolatey` kullanarak da yükleyebilirsiniz:

```bash
choco install nvs
```

#### macOS,Unix benzeri

MacOS/Unix benzeri sistemlerde `nvs` kurulum adımlarına ilişkin belgelere [buradan](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux) ulaşabilirsiniz

#### Kullanım

Bundan sonra farklı node sürümleri arasında geçiş yapmak için `nvs` kullanabilirsiniz.

Node'un en son sürümünü eklemek için:

```bash
nvs add latest
```

Veya node'un en son LTS sürümünü eklemek için:

```bash
nvs add lts
```

Ardından, geçerli kabuk için `PATH`inize bir node sürümü eklemek için `nvs use` komutunu çalıştırın:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Kalıcı olarak `PATH`e eklemek için `nvs link` kullanın:

```bash
nvs link lts
```

## OpenBSD

Node.js port sistemi aracılığıyla kullanılabilir.

```bash
/usr/ports/lang/node
```

OpenBSD üzerinde [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) kullanımı:

```bash
pkg_add node
```

## openSUSE ve SLE

Node.js ana depolarda aşağıdaki paketler altında mevcuttur:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12` ve `nodejs14`
  ("Web ve Scripting Modülü" [etkinleştirilmelidir](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12` ve `nodejs14`
  ("Web ve Scripting Modülü" [etkinleştirilmelidir](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Örneğin, openSUSE Leap 15.2 üzerine Node.js 14.x'i yüklemek için, aşağıdakileri kök olarak çalıştırın:

```bash
zypper install nodejs14
```

Farklı ana sürümler arasında Node farklı sürümleri yüklenebilir ve eş zamanlı olarak kullanılabilir.

## SmartOS ve illumos

SmartOS görüntüleri önceden pkgsrc ile birlikte gelir. Diğer illumos dağıtımlarında, önce **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**'yi yükleyin, ardından normal olarak ikili paketi yükleyebilirsiniz:

```bash
pkgin -y install nodejs
```

Veya pkgsrc'den manuel olarak inşa edin:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snap'leri](https://github.com/nodejs/snap) Snap Store'da [`node`](https://snapcraft.io/node) olarak mevcuttur.

## Solus

Solus, Node.js'i ana depoda sağlar.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux, Node.js'in kararlı sürümünü ana depoda gönderir.

```bash
xbps-install -Sy nodejs
```

## Windows

[Windows Yükleyiciyi](/#home-downloadhead) doğrudan [nodejs.org](https://nodejs.org/) web sitesinden indirin.

### Alternatifler

**[Winget](https://aka.ms/winget-cli)** kullanılıyor:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Yukarıdaki iki komutun birini çalıştırdıktan sonra, `node` CLI komutunun kullanılabilir hale gelmesi için terminal emülatörünü yeniden başlatmak gerekebilir.

**[Chocolatey](https://chocolatey.org/)** kullanılıyor:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

**[Scoop](https://scoop.sh/)** kullanılıyor:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM® Node.js için SDK - z/OS® iki kurulum formatında mevcuttur, SMP/E ve PAX. Size uygun olan kurulum formatını seçin:

- [z/OS üzerinde SMP/E sürümü Node.js'in kurulumu ve yapılandırılması](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [z/OS üzerinde PAX sürümü Node.js'in kurulumu ve yapılandırılması](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
