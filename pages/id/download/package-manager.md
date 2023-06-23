---
layout: page.hbs
title: Menginstal Node.js melalui manajer paket
---

# Menginstal Node.js melalui manajer paket

***Catatan:*** Paket-paket di halaman ini dikelola dan didukung oleh pembuat paketnya masing-masing, **bukan** tim inti Node.js. Harap laporkan masalah apa pun yang Anda temui ke pengelola paket. Jika ternyata masalah Anda adalah bug di Node.js itu sendiri, pengelola akan melaporkan masalah tersebut ke upstream.

---

* [Alpine Linux](#alpine-linux)
* [Android](#android)
* [Arch Linux](#arch-linux)
* [CentOS, Fedora dan Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
* [Distribusi Linux berbasis Debian dan Ubuntu](#debian-and-ubuntu-based-linux-distributions)
* [fnm](#fnm)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [macOS](#macos)
* [n](#n)
* [NetBSD](#netbsd)
* [Nodenv](#nodenv)
* [nvm](#nvm)
* [nvs](#nvs)
* [OpenBSD](#openbsd)
* [openSUSE and SLE](#opensuse-and-sle)
* [SmartOS and illumos](#smartos-and-illumos)
* [Snap](#snap)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows-1)
* [z/OS](#zos)

---

## Alpine Linux

Paket Node.js LTS dan npm tersedia di Repositori Utama.

```bash
apk add nodejs npm
```

Node.js Current dapat diinstal dari Repositori Komunitas.

```bash
apk add nodejs-current
```

## Android

Dukungan Android masih eksperimental di Node.js, jadi biner yang telah dikompilasi belum disediakan oleh pengembang Node.js.

Namun, ada beberapa solusi pihak ketiga. Misalnya, komunitas [Termux](https://termux.com/) menyediakan emulator terminal dan lingkungan Linux untuk Android, serta pengelola paket sendiri dan [koleksi ekstensif](https://github.com/termux/termux-packages) dari banyak aplikasi yang telah dikompilasi. Perintah ini di aplikasi Termux akan menginstal versi Node.js terakhir yang tersedia:

```bash
pkg install nodejs
```

Saat ini, binari Termux Node.js terhubung dengan `system-icu` (bergantung pada paket `libicu`).

## Arch Linux

Paket Node.js dan npm tersedia di Repositori Komunitas.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora dan Red Hat Enterprise Linux

Node.js tersedia sebagai modul yang disebut `nodejs` di CentOS/RHEL 8 dan Fedora.

```bash
dnf module install nodejs:<stream>
```

di mana `<stream>` sesuai dengan versi utama Node.js. Untuk melihat daftar aliran yang tersedia:

```bash
dnf module list nodejs
```

Misalnya, untuk menginstal Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternatif

Sumber daya ini menyediakan paket yang kompatibel dengan CentOS, Fedora, dan RHEL.
* [Node.js snaps](#snap) dipertahankan dan didukung di https://github.com/nodejs/snap
* [Distribusi biner Node.js](#debian-and-ubuntu-based-linux-distributions) dikelola dan didukung oleh [NodeSource](https://github.com/nodesource/distributions)

## Distribusi Linux berbasis Debian dan Ubuntu

[Distribusi biner Node.js](https://github.com/nodesource/distributions/blob/master/README.md) tersedia dari NodeSource.

### Alternatif

Paket yang kompatibel dengan distribusi Linux berbasis Debian dan Ubuntu tersedia melalui [Node.js snaps](#snap).

## fnm

Pengelola versi Node.js yang cepat dan sederhana yang dibangun di Rust digunakan untuk mengelola beberapa versi Node.js yang dirilis. Ini memungkinkan Anda untuk melakukan operasi seperti menginstal, menghapus, mengganti versi Node secara otomatis berdasarkan direktori saat ini, dll. Untuk menginstal fnm, gunakan [instalasi skrip ini](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm memiliki dukungan lintas platform (macOS, Windows, Linux) & semua shell populer (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt). fnm dibangun dengan mengutamakan kecepatan dan dukungan kompatibilitas untuk file `.node-version` dan `.nvmrc`.

## FreeBSD

Rilis terbaru Node.js tersedia melalui port [www/node](https://www.freshports.org/www/node).

Instal paket biner melalui [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Atau kompilasi sendiri menggunakan [port](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js tersedia di tree portage.

```bash
emerge nodejs
```

## IBM i

Versi LTS dari Node.js tersedia dari IBM, dan tersedia melalui [pengelola paket 'yum'](https://ibm.biz/ibmi-rpms). Nama paketnya adalah `nodejs` diikuti dengan nomor versi utama (misalnya, `nodejs12`, `nodejs14` dll)

Untuk menginstal Node.js 14.x dari baris perintah, jalankan perintah berikut sebagai pengguna dengan otoritas khusus \*ALLOBJ:

```bash
yum install nodejs14
```

Node.js juga dapat diinstal dengan produk IBM i Access Client Solutions. Lihat [dokumen dukungan ini](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) untuk detail selengkapnya

## macOS

Unduh [Instalasi macOS](https://nodejs.org/en/#home-downloadhead) langsung dari situs web [nodejs.org](https://nodejs.org/).

_Jika Anda ingin mengunduh paket dengan bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatif

Menggunakan **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Menggunakan **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Menggunakan **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Instal paket biner:

```bash
pkgin -y install nodejs
```

Atau buat secara manual dari pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` adalah manajer versi Node.js yang mudah digunakan untuk Mac dan Linux. Tentukan versi target untuk menginstal menggunakan sintaks yang kaya, atau pilih dari menu versi yang diunduh sebelumnya. Versi diinstal di seluruh sistem atau di seluruh pengguna, dan untuk lebih banyak lagi penggunaan yang ditargetkan, Anda dapat menjalankan versi langsung dari unduhan yang di-cache.

Lihat [Beranda](https://github.com/tj/n) untuk metode cara penginstalan (boostrap, npm, Homebrew, pihak ketiga), dan semua detail penggunaan.

Jika Anda sudah memiliki `npm` kemudian menginstal `n` dan menggunakan versi `node` LTS terbaru dengan metode simpel berikut:

```
npm install -g n
n lts
```

## NetBSD

Node.js tersedia di tree pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Atau instal paket biner (jika tersedia untuk platform Anda) menggunakan pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` adalah manajer versi node ringan, mirip dengan `nvm`. Ini sederhana dan dapat diprediksi. Ekosistem plugin yang kaya memungkinkan Anda menyesuaikannya dengan kebutuhan Anda. Gunakan `nodenv` untuk memilih versi Node untuk aplikasi Anda dan menjamin bahwa lingkungan pengembangan Anda cocok dengan produksi.

Instruksi instalasi Nodenv dipertahankan [di halaman Github](https://github.com/nodenv/nodenv#installation). Kunjungi halaman tersebut untuk memastikan Anda mengikuti versi terbaru dari langkah-langkah penginstalan.

## nvm
Node Version Manager adalah skrip bash yang digunakan untuk mengelola beberapa versi Node.js yang dirilis. Ini memungkinkan Anda untuk melakukan operasi seperti menginstal, menghapus, mengganti versi, dll. Untuk menginstal nvm, gunakan [instal skrip](https://github.com/nvm-sh/nvm#install--update-script).

Pada sistem Unix / OS X Node.js yang dibangun dari sumber dapat diinstal menggunakan [nvm](https://github.com/creationix/nvm) dengan menginstal ke lokasi yang diharapkan nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Setelah ini, Anda dapat menggunakan `nvm` untuk beralih antara versi dan versi yang dirilis dibangun dari sumber. Misalnya, jika versi Node.js adalah v8.0.0-pre:

```bash
nvm use 8
```

Setelah perilisan resmi keluar, Anda akan menghapus versi yang dibuat dari sumber:

```bash
nvm uninstall 8
```

## nvs

#### Windows
Manajer versi `nvs` bersifat lintas platform dan dapat digunakan pada sistem Windows, macOS, dan seperti Unix

Untuk menginstal `nvs` di Windows, buka [halaman rilis](https://github.com/jasongin/nvs/releases) di sini dan unduh file penginstal MSI dari rilis terbaru.

Anda juga dapat menggunakan `chocolatey` untuk menginstalnya:

```bash
choco install nvs
```

#### macOS,UnixLike
Anda dapat menemukan dokumentasi mengenai langkah-langkah penginstalan `nvs` di sistem seperti macOS/Unix [di sini](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Penggunaan
Setelah ini, Anda dapat menggunakan `nvs` untuk beralih di antara versi node yang berbeda.

Bash untuk menambahkan versi terbaru dari simpul:

```bash
nvs add latest
```

Atau pun bash untuk menambahkan node versi LTS terbaru:

```bash
nvs add lts
```

Dan kemudian jalankan perintah `nvs use` untuk menambahkan versi node ke `PATH` Anda untuk shell saat ini:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Untuk menambahkannya ke `PATH` secara permanen, gunakan bash `nvs link` berikut:

```bash
nvs link lts
```

## OpenBSD

Node.js tersedia melalui sistem port.

```bash
/usr/ports/lang/node
```

Cara menggunakan [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) di OpenBSD:

```bash
pkg_add node
```

## openSUSE and SLE

Node.js is available in the main repositories under the following packages:

* **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
* **openSUSE Tumbleweed**: `nodejs16`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, dan `nodejs14` ("Modul Web dan Scripting" harus [diaktifkan](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
* **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, dan `nodejs14` ("Modul Web dan Scripting" harus [diaktifkan](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Sebagai contoh, untuk menginstal Node.js 14.x pada openSUSE Leap 15.2, jalankan perintah berikut sebagai root:

```bash
zypper install nodejs14
```

Versi utama Node yang berbeda dapat diinstal dan digunakan secara bersamaan.

## SmartOS dan ilumino

SmartOS images hadir dengan pkgsrc yang sudah diinstal sebelumnya. Pada distribusi illumos lainnya, instal terlebih dahulu **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, lalu Anda dapat menginstal paket biner seperti biasa:

```bash
pkgin -y install nodejs
```

Atau buat secara manual dari pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) tersedia sebagai [`node`](https://snapcraft.io/node) di toko Snap.

## Solus

Solus menyediakan Node.js di repositori utamanya.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux mengirimkan Node.js stabil di repositori utama.

```bash
xbps-install -Sy nodejs
```

## Windows

Unduh [Instalasi Windows](https://nodejs.org/en/#home-downloadhead) langsung dari situs web [nodejs.org](https://nodejs.org/).

### Alternatif

Menggunakan **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Setelah menjalankan salah satu dari dua perintah di atas, mungkin perlu memulai ulang terminal emulator sebelum perintah `node` CLI tersedia.

Menggunakan **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Menggunakan **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```

## z/OS

IBM&reg; SDK untuk Node.js - z/OS&reg; tersedia dalam dua format instalasi, SMP/E dan PAX. Pilih format instalasi yang sesuai untuk Anda:
* [Memasang dan mengonfigurasi Node.js edisi SMP/E di z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
* [Memasang dan mengonfigurasi Node.js edisi PAX di z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
