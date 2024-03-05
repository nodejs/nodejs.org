---
layout: docs
title: Menginstal Node.js melalui package manager
---

# Menginstal Node.js melalui Manajer Paket

> Paket-paket di halaman ini dikelola dan didukung oleh para pengemas masing-masing, **bukan** tim inti Node.js. Harap laporkan masalah yang Anda temui kepada pengelola paket. Jika ternyata masalah Anda adalah bug dalam Node.js itu sendiri, pengelola akan melaporkan masalah tersebut ke hulu.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora dan Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Distribusi Linux berbasis Debian dan Ubuntu](#debian-and-ubuntu-based-linux-distributions)
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
- [SmartOS dan illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js (Node.js LTS dan paket npm tersedia di Main Repository).

```bash
apk add nodejs npm
```

Node.js Current dapat diinstal dari Community Repository.

```bash
apk add nodejs-current
```

## Android

Dukungan Android masih bersifat eksperimental di Node.js, sehingga biner pra-kompilasi belum disediakan oleh pengembang Node.js.

Namun, ada beberapa solusi pihak ketiga. Misalnya, komunitas [Termux](https://termux.com/) menyediakan emulator terminal dan lingkungan Linux untuk Android, serta manajer paket sendiri dan [koleksi yang luas](https://github.com/termux/termux-packages) dari banyak aplikasi pra-kompilasi. Perintah ini di aplikasi Termux akan menginstal versi Node.js terakhir yang tersedia:

```bash
pkg install nodejs
```

Saat ini, biner Node.js Termux terhubung dengan `system-icu` (tergantung pada paket `libicu`).

## Arch Linux

Paket Node.js dan npm tersedia di Repositori Komunitas.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora, dan Red Hat Enterprise Linux

Node.js tersedia sebagai modul yang disebut `nodejs` di CentOS/RHEL 8 dan Fedora.

```bash
dnf module install nodejs:<stream>
```

dimana `<stream>` sesuai dengan versi mayor Node.js.
Untuk melihat daftar aliran yang tersedia:

```bash
dnf module list nodejs
```

Sebagai contoh, untuk menginstal Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternatif

Sumber daya ini menyediakan paket yang kompatibel dengan CentOS, Fedora, dan RHEL.

- [Node.js snaps](#snap) dipelihara dan didukung di https\://github.com/nodejs/snap
- [Node.js distribusi biner](#debian-and-ubuntu-based-linux-distributions) dipelihara dan didukung oleh [NodeSource](https://github.com/nodesource/distributions)

## Distribusi Linux berbasis Debian dan Ubuntu

[Node.js distribusi biner](https://github.com/nodesource/distributions) tersedia dari NodeSource.

### Alternatif

Paket yang kompatibel dengan distribusi Linux berbasis Debian dan Ubuntu tersedia melalui [Node.js snaps](#snap).

## fnm

Manajer versi Node.js cepat dan sederhana yang dibangun di Rust digunakan untuk mengelola beberapa versi Node.js yang dirilis. Ini memungkinkan Anda untuk melakukan operasi seperti menginstal, menghapus, beralih versi Node secara otomatis berdasarkan direktori saat ini, dll.
Untuk menginstal fnm, gunakan [skrip instalasi ini](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm memiliki dukungan lintas-platform (macOS, Windows, Linux) & semua shell populer (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm dibangun dengan kecepatan dalam pikiran dan dukungan kompatibilitas untuk file `.node-version` dan `.nvmrc`.

## FreeBSD

Rilis terbaru dari Node.js tersedia melalui port [www/node](https://www.freshports.org/www/node).

Pasang paket biner melalui [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Atau kompilasi sendiri menggunakan [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js tersedia dalam pohon portage.

```bash
emerge nodejs
```

## IBM i

Versi LTS dari Node.js tersedia dari IBM, dan dapat diakses melalui [manajer paket 'yum'](https://ibm.biz/ibmi-rpms). Nama paketnya adalah `nodejs` diikuti oleh nomor versi utama (misalnya, `nodejs18`, `nodejs20`, dll).

Untuk menginstal Node.js 20.x dari baris perintah, jalankan hal berikut sebagai pengguna dengan wewenang khusus \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js juga dapat diinstal dengan produk IBM i Access Client Solutions. Lihat [dokumen dukungan ini](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) untuk lebih banyak detail

## macOS

Unduh [Pemasang macOS](/#home-downloadhead) langsung dari situs web [nodejs.org](https://nodejs.org/).

_Jika Anda ingin mengunduh paket dengan bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
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

Menggunakan **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Pasang paket biner:

```bash
pkgin -y install nodejs
```

Atau bangun secara manual dari pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` adalah manajer versi Node.js yang mudah digunakan untuk Mac dan Linux. Tentukan versi target untuk diinstal menggunakan sintaks yang kaya,
atau pilih dari menu versi yang sebelumnya diunduh. Versi-versi diinstal secara sistem atau pengguna, dan untuk penggunaan yang lebih terarah Anda dapat menjalankan versi langsung dari unduhan yang disimpan.

Lihat [beranda](https://github.com/tj/n) untuk metode instalasi (bootstrap, npm, Homebrew, pihak ketiga), dan semua detail penggunaan.

Jika Anda sudah memiliki `npm` maka menginstal `n` dan kemudian versi LTS `node` terbaru adalah sangat mudah:

```
npm install -g n
n lts
```

## NetBSD

Node.js tersedia di pohon pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Atau instal paket biner (jika tersedia untuk platform Anda) menggunakan pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` adalah manajer versi node yang ringan, mirip dengan `nvm`. Ini sederhana dan dapat diprediksi. Ekosistem plugin yang kaya memungkinkan Anda menyesuaikannya sesuai kebutuhan Anda. Gunakan `nodenv` untuk memilih versi Node untuk aplikasi Anda dan pastikan bahwa lingkungan pengembangan Anda cocok dengan produksi.

Instruksi instalasi Nodenv dijaga [di halaman Github-nya](https://github.com/nodenv/nodenv#installation). Silakan kunjungi halaman tersebut untuk memastikan Anda mengikuti versi terbaru langkah-langkah instalasi.

## nvm

Node Version Manager adalah skrip bash yang digunakan untuk mengelola beberapa versi Node.js yang dirilis. Ini memungkinkan Anda untuk melakukan operasi seperti menginstal, menghapus, beralih versi, dll. Untuk menginstal nvm, gunakan [skrip instalasi ini](https://github.com/nvm-sh/nvm#install--update-script).

Pada sistem Unix / OS X, Node.js yang dibangun dari sumber dapat diinstal menggunakan [nvm](https://github.com/creationix/nvm) dengan menginstal ke lokasi yang diharapkan oleh nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Setelah itu Anda dapat menggunakan `nvm` untuk beralih antara versi yang dirilis dan versi yang dibangun dari sumber. Misalnya, jika versi Node.js adalah v8.0.0-pre:

```bash
nvm use 8
```

Setelah versi resmi dirilis, Anda akan ingin menghapus versi yang dibangun dari sumber:

```bash
nvm uninstall 8
```

## nvs

#### Windows

Manajer versi `nvs` adalah lintas-platform dan dapat digunakan di Windows, macOS, dan sistem mirip Unix

Untuk menginstal `nvs` di Windows, pergi ke [halaman rilis](https://github.com/jasongin/nvs/releases) di sini dan unduh file penginstal MSI dari rilis terbaru.

Anda juga dapat menggunakan `chocolatey` untuk menginstalnya:

```bash
choco install nvs
```

#### macOS,UnixLike

Anda dapat menemukan dokumentasi mengenai langkah-langkah instalasi `nvs` di sistem macOS/Unix-like [di sini](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Penggunaan

Setelah ini Anda dapat menggunakan `nvs` untuk beralih antara berbagai versi Node.js.

Untuk menambahkan versi terbaru Node.js:

```bash
nvs add latest
```

Atau untuk menambahkan versi LTS terbaru Node.js:

```bash
nvs add lts
```

Kemudian jalankan perintah `nvs use` untuk menambahkan versi Node.js ke `PATH` untuk shell saat ini:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Untuk menambahkannya ke `PATH` secara permanen, gunakan `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js tersedia melalui sistem port.

```bash
/usr/ports/lang/node
```

Menggunakan [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) di OpenBSD:

```bash
pkg_add node
```

## openSUSE dan SLE

Node.js tersedia di repositori utama di bawah paket-paket berikut:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, dan `nodejs14`
  (Modul "Web and Scripting" harus diaktifkan [di sini](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, dan `nodejs14`
  (Modul "Web and Scripting" harus diaktifkan [di sini](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Sebagai contoh, untuk menginstal Node.js 14.x di openSUSE Leap 15.2, jalankan perintah berikut sebagai root:

```bash
zypper install nodejs14
```

Versi mayor Node yang berbeda dapat diinstal dan digunakan secara bersamaan.

## SmartOS dan illumos

Gambar SmartOS dilengkapi dengan pkgsrc yang telah diinstal sebelumnya. Pada distribusi illumos lainnya, pertama-tama instal **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, kemudian Anda dapat menginstal paket biner seperti biasa:

```bash
pkgin -y install nodejs
```

Atau bangun secara manual dari pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) tersedia sebagai [`node`](https://snapcraft.io/node) di Snap store.

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

Unduh [Pemasang Windows](/#home-downloadhead) langsung dari situs web [nodejs.org](https://nodejs.org/).

### Alternatif

Menggunakan **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Setelah menjalankan salah satu dari dua perintah di atas, mungkin perlu untuk me-restart emulator terminal sebelum perintah CLI `node` menjadi tersedia.

Menggunakan **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Menggunakan **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM® SDK untuk Node.js - z/OS® tersedia dalam dua format instalasi, SMP/E dan PAX. Pilih format instalasi yang sesuai dengan Anda:

- [Menginstal dan mengkonfigurasi edisi SMP/E Node.js di z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Menginstal dan mengkonfigurasi edisi PAX Node.js di z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
