---
layout: article
title: Node.js'i paket yöneticisi aracılığıyla yüklemek
---

# Paket Yöneticileri Aracılığıyla Node.js Kurulumu

> Bu sayfadaki paketler, ilgili paketleyiciler tarafından sürdürülür ve desteklenir, Node.js çekirdek ekibi tarafından **değil**. Karşılaştığınız herhangi bir sorunu paketin bakımını üstlenen kişiye bildirin. Sorununuzun Node.js'in kendisinde bir hata olduğu ortaya çıkarsa, bakımı üstlenen kişi bu sorunu yukarıya raporlayacaktır.

## Alpine Linux

Node.js LTS ve npm paketleri Ana Depo'da bulunmaktadır.

```bash
apk add nodejs npm
```

Node.js Current, Topluluk Deposu'ndan kurulabilir.

```bash
apk add nodejs-current
```

## Android

Android desteği Node.js'de hala deneyseldir, bu nedenle önceden derlenmiş ikili (binary) dosyalar henüz Node.js geliştiricileri tarafından sağlanmamaktadır.

Ancak, bazı üçüncü parti çözümler de mevcuttur. Örneğin, [Termux](https://termux.com/) topluluğu, Android için terminal emülatörü ve Linux ortamının yanı sıra kendi paket yöneticisini ve önceden derlenmiş birçok uygulamanın [kapsamlı koleksiyonunu](https://github.com/termux/termux-packages) sağlar. Termux uygulamasındaki bu komut mevcut son Node.js sürümünü yükleyecektir:

```bash
pkg install nodejs
```

Şu anda, Termux Node.js ikili dosyaları system-icu'ya (`libicu` paketine bağlı olarak) bağlanmıştır.

## Arch Linux

Node.js ve npm paketleri Topluluk Deposu'nda bulunmaktadır.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora ve Red Hat Enterprise Linux

CentOS/RHEL 8 ve Fedora'da, Node.js `nodejs` adında bir modül olarak mevcuttur.

```bash
dnf module install nodejs:<stream>
```

`<stream>` düğümü, Node.js'in ana sürümüne karşılık gelir.
Kullanılabilir akışların listesini görmek için:

```bash
dnf module list nodejs
```

Örneğin, Node.js 18'i yüklemek için:

```bash
dnf module install nodejs:18/common
```

### Alternatifler

Bu kaynaklar CentOS, Fedora ve RHEL ile uyumlu paketler sağlamaktadır.

- [Node.js snapleri](#snap) https://github.com/nodejs/snap adresinde tutulmakta ve desteklenmektedir
- [Node.js ikili dağıtımları](#debian-and-ubuntu-based-linux-distributions) [NodeSource](https://github.com/nodesource/distributions) tarafından sürdürülür ve desteklenir

## Debian ve Ubuntu tabanlı Linux dağıtımları

[Node.js ikili dağıtımları](https://github.com/nodesource/distributions) NodeSource'tan temin edilebilir.

### Alternatifler

Debian ve Ubuntu tabanlı Linux dağıtımları ile uyumlu paketler [Node.js snapleri](#snap) üzerinden temin edilebilir.

## Exherbo Linux

Node.js ve npm paketleri [arbor deposunda](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node) mevcuttur.

```bash
cave resolve -x node
```

## fnm

Rust'ta yerleşik hızlı ve basit Node.js sürüm yöneticisi, birden fazla yayınlanan Node.js sürümünü yönetmek için kullanılır. Yükleme, kaldırma, geçerli dizine göre Node sürümlerini otomatik olarak değiştirme vb. işlemleri gerçekleştirmenize olanak tanır.
Fnm'yi yüklemek için bu [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux) kullanın.

fnm, macOS, Windows, Linux gibi çapraz platform desteği sunar ve tüm yaygın kabuklar (Bash, Zsh, Fish, PowerShell, Windows Komut İstemi) ile uyumludur. fnm, hızlı bir şekilde oluşturulmuştur ve.node-version ve.nvmrc dosyaları için uyumluluk desteği sunar.

## FreeBSD

Node.js'nin en güncel sürümü [www/node](https://www.freshports.org/www/node) bağlantısı üzerinden erişilebilir.

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

Node.js'nin LTS sürümleri IBM'den temin edilebilir ve [yum paket yöneticisi](https://ibm.biz/ibmi-rpms) aracılığıyla kullanılabilir. Paket adı `nodejs` ve ardından ana sürüm numarasıdır (örneğin, `nodejs18`, `nodejs20` vb.)

Node.js 20.x'i komut satırından yüklemek için, \*ALLOBJ özel yetkisine sahip bir kullanıcı olarak aşağıdakileri çalıştırın:

```bash
yum install nodejs20
```

Node.js, IBM i Access Client Solutions ürünü ile de kurulabilir. Daha fazla ayrıntı için [bu destek belgesine](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) bakın

## macOS

MacOS Installer](/#home-downloadhead) doğrudan [nodejs.org](https://nodejs.org/) web sitesinden indirin.

_Eğer paketi bash ile indirmek istiyorsanız:_

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

binary paketi yükleyin:

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

Veya pkgin kullanarak binary paket (platformunuz için mevcutsa) yükleyin:

```bash
pkgin -y install nodejs
```

## Nodenv

nodenv`, `nvm`ye benzer hafif bir node sürüm yöneticisidir. Basit ve öngörülebilirdir. Zengin bir eklenti ekosistemi, onu ihtiyaçlarınıza göre uyarlamanızı sağlar. Uygulamanız için bir Node sürümü seçmek ve geliştirme ortamınızın üretimle eşleşmesini garanti etmek için `nodenv\` kullanın.

Nodenv kurulum talimatları [Github sayfasında](https://github.com/nodenv/nodenv#installation) tutulmaktadır. Kurulum adımlarının en son sürümünü takip ettiğinizden emin olmak için lütfen bu sayfayı ziyaret edin.

## nvm

Node Version Manager, birden fazla yayınlanmış Node.js sürümünü yönetmek için kullanılan bir bash betiğidir. İzin verir
yükleme, kaldırma, sürüm değiştirme vb. işlemleri gerçekleştirebilirsiniz.
Nvm yüklemek için bu [install script](https://github.com/nvm-sh/nvm#install--update-script) kullanın.

Unix / OS X sistemlerinde kaynaktan oluşturulan Node.js şu şekilde kurulabilir
nvm'nin beklediği konuma yükleyerek [nvm](https://github.com/creationix/nvm):

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Bundan sonra, yayınlanan sürümler ve sürümler arasında geçiş yapmak için `nvm` kullanabilirsiniz
kaynaktan oluşturulmuştur.
Örneğin, Node.js sürümü v8.0.0-pre ise:

```bash
nvm use 8
```

Resmi sürüm çıktığında, oluşturulmuş sürümü kaldırmak isteyeceksiniz
Kaynaktan:

```bash
nvm uninstall 8
```

## nvs

#### Windows

`nvs` sürüm yöneticisi çapraz platformdur ve Windows, macOS ve Unix benzeri sistemlerde kullanılabilir

Windows'a `nvs` yüklemek için buradan [sürüm sayfasına](https://github.com/jasongin/nvs/releases) gidin ve en son sürümün MSI yükleyici dosyasını indirin.

Yüklemek için `chocolatey` de kullanabilirsiniz:

```bash
choco install nvs
```

#### macos, Unix benzeri

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

Then run the `nvs use` command to add a version of node to your `PATH` for the current shell:

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
  ("Web ve Komut Dosyası Modülü" [etkin](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated) olmalıdır.)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12` ve `nodejs14`
  ("Web ve Komut Dosyası Modülü" [etkin](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module) olmalıdır.)

Örneğin, openSUSE Leap 15.2 üzerinde Node.js 14.x yüklemek için aşağıdakileri root olarak çalıştırın:

```bash
zypper install nodejs14
```

Node'un farklı ana sürümleri aynı anda kurulabilir ve kullanılabilir.

## SmartOS ve illumos

SmartOS imajları pkgsrc önceden yüklenmiş olarak gelir. Diğer illumos dağıtımlarında, önce **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)** yükleyin, ardından ikili paketi normal şekilde yükleyebilirsiniz:

```bash
pkgin -y install nodejs
```

Veya pkgsrc'den manuel olarak derleyin:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Yakala

[Node.js snaps](https://github.com/nodejs/snap), Snap deposunda [`node`](https://snapcraft.io/node) olarak mevcuttur.

## Solus

Solus, ana deposunda Node.js sağlar.

```bash
sudo eopkg install nodejs
```

## vfox

Platformlar arası (Windows, macOS, Linux) ve **genişletilebilir** bir sürüm yöneticisi.

**Farklı projeler için farklı sürümler**, **farklı kabuklar için farklı sürümler** ve geçerli dizine göre Node sürümlerini otomatik olarak değiştirmenize vb. olanak tanır.

Tüm popüler kabukları (Bash, Zsh, Fish, PowerShell, Clink, Cmder) destekler.

Vfox'u hızlı bir şekilde kullanmak ve tüm kullanım ayrıntıları için [Hızlı Başlangıç](https://vfox.lhan.me/guides/quick-start.html) bölümüne bakın.

## Void Linux

Void Linux, Node.js'yi ana depoda kararlı olarak gönderir.

```bash
xbps-install -Sy nodejs
```

## Windows

Windows Installer](/#home-downloadhead) doğrudan [nodejs.org](https://nodejs.org/) web sitesinden indirin.

### Alternatifler

[Winget](https://aka.ms/winget-cli)\*\* kullanarak:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Yukarıdaki iki komuttan birini çalıştırdıktan sonra, yeniden başlatmak gerekebilir
CLI komutu kullanılabilir hale gelmeden önce terminal emülatörü.

[Chocolatey](https://chocolatey.org/)\*\* kullanarak:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

[Scoop](https://scoop.sh/)\*\* kullanarak:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK for Node.js - z/OS&reg; SMP/E ve PAX olarak iki kurulum formatında sunulur. Size uygun olan kurulum formatını seçin:

- [z/OS üzerinde Node.js'nin SMP/E sürümünün kurulması ve yapılandırılması](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [z/OS üzerinde Node.js PAX sürümünün kurulması ve yapılandırılması](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
