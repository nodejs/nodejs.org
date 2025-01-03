---
layout: article
title: Menginstal Node.js melalui manajer paket
---

# Menginstal Node.js melalui manajer paket

> Paket-paket di halaman ini dijaga dan didukung oleh para pemberi paket mereka masing-masing, bukan tim inti Node.js. Harap laporkan setiap masalah yang Anda temui kepada pemelihara paket. Jika masalah Anda ternyata adalah bug dalam Node.js itu sendiri, pemelihara akan melaporkan masalah tersebut ke hulu.

## Alpine Linux

Paket Node.js LTS dan npm tersedia di Repository Utama.

```bash
apk add nodejs npm
```

Node.js Current dapat diinstal dari Repository Komunitas.

```bash
apk add nodejs-current
```

## Android

Dukungan Android masih eksperimental di Node.js, jadi biner pra-kompilasi belum disediakan oleh pengembang Node.js.

Namun, ada beberapa solusi pihak ketiga. Misalnya, komunitas [Termux](https://termux.com/) menyediakan emulator terminal dan lingkungan Linux untuk Android, serta pengelola paket sendiri dan [koleksi ekstensif](https://github.com/termux/termux-packages) dari banyak aplikasi pra-kompilasi. Perintah ini di aplikasi Termux akan menginstal versi Node.js terakhir yang tersedia:

```bash
pkg install nodejs
```

Saat ini, biner Termux Node.js terhubung dengan `system-icu` (bergantung pada paket `libicu`).

## Arch Linux

Paket Node.js dan npm tersedia di Repository Komunitas.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora dan Red Hat Enterprise Linux

Node.js tersedia sebagai modul yang disebut `nodejs` di CentOS/RHEL 8 dan Fedora.

```bash
dnf module install nodejs:<stream>
```

di mana `<stream>` sesuai dengan versi utama dari Node.js.
Untuk melihat daftar stream yang tersedia:

```bash
dnf module list nodejs
```

Misalnya, untuk menginstal Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternatif

Sumber-sumber ini menyediakan paket yang kompatibel dengan CentOS, Fedora, dan RHEL.

- [Node.js snaps](#snap) yang dikelola dan didukung di https://github.com/nodejs/snap
- [Distribusi biner Node.js](#distribusi-linux-berbasis-debian-dan-ubuntu) yang dikelola dan didukung oleh [NodeSource](https://github.com/nodesource/distributions)

## Distribusi Linux berbasis Debian dan Ubuntu

[Distribusi biner Node.js](https://github.com/nodesource/distributions) tersedia dari NodeSource.

### Alternatif

Paket yang kompatibel dengan distribusi Linux berbasis Debian dan Ubuntu tersedia melalui [Node.js snaps](#snap).

## Exherbo Linux

Paket Node.js dan npm tersedia di [arbor repository](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node).

```bash
cave resolve -x node
```

## fnm

Manajer versi Node.js yang cepat dan sederhana yang dibangun di Rust digunakan untuk mengelola beberapa versi Node.js yang dirilis. Ini memungkinkan Anda untuk melakukan operasi seperti menginstal, mencopot, beralih versi Node secara otomatis berdasarkan direktori saat ini, dll.
Untuk menginstal fnm, gunakan [script instalasi](https://github.com/Schniz/fnm#using-a-script-macoslinux) ini.

fnm mendukung lintas platform (macOS, Windows, Linux) & semua shell populer (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm dibangun dengan kecepatan dalam pikiran dan dukungan kompatibilitas untuk file `.node-version` dan `.nvmrc`.

## FreeBSD

Rilis terbaru Node.js tersedia melalui port [www/node](https://www.freshports.org/www/node).

Instal paket biner melalui [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Atau kompilasi sendiri menggunakan [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js tersedia di portage tree.

```bash
emerge nodejs
```

## IBM i

Versi LTS dari Node.js tersedia dari IBM, dan tersedia melalui [pengelola paket 'yum'](https://ibm.biz/ibmi-rpms). Nama paketnya adalah `nodejs` diikuti oleh nomor versi utama (misalnya, `nodejs18`, `nodejs20`, dll.)

Untuk menginstal Node.js 20.x dari baris perintah, jalankan yang berikut ini sebagai pengguna dengan otoritas khusus \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js juga dapat diinstal dengan produk IBM i Access Client Solutions. Lihat [dokumen dukungan ini](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) untuk detail lebih lanjut

## macOS

Unduh [Penginstal macOS](/#home-downloadhead) langsung dari situs web [nodejs.org](https://nodejs.org/).

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

Jika Anda sudah memiliki `npm` maka menginstal `n` dan kemudian versi LTS `node` terbaru sesederhana ini:

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

`nodenv` adalah manajer versi node yang ringan, mirip dengan `nvm`. Ini sederhana dan dapat diprediksi. Ekosistem plugin yang kaya memungkinkan Anda menyesuaikannya sesuai kebutuhan Anda. Gunakan `nodenv` untuk memilih versi Node untuk aplikasi Anda dan menjamin bahwa lingkungan pengembangan Anda cocok dengan produksi.

Petunjuk instalasi Nodenv dikelola [di halaman Github-nya](https://github.com/nodenv/nodenv#installation). Silakan kunjungi halaman tersebut untuk memastikan Anda mengikuti versi terbaru dari langkah-langkah instalasi.

## nvm

Node Version Manager adalah skrip bash yang digunakan untuk mengelola beberapa versi Node.js yang dirilis. Ini memungkinkan
Anda untuk melakukan operasi seperti menginstal, mencopot, beralih versi, dll.
Untuk menginstal nvm, gunakan [skrip instalsi](https://github.com/nvm-sh/nvm#install--update-script).

Di sistem Unix / OS X, Node.js yang dibangun dari sumber dapat diinstal menggunakan
[nvm](https://github.com/creationix/nvm) dengan menginstalasi ke lokasi yang diharapkan nvm:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Setelah ini, Anda dapat menggunakan `nvm` untuk beralih antara versi yang dirilis dan versi
yang dibangun dari sumber.
Misalnya, jika versi Node.js adalah v8.0.0-pre:

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

Untuk menginstal `nvs` di Windows, kunjungi halaman [release](https://github.com/jasongin/nvs/releases) ini dan unduh file instalator MSI dari rilis terbaru.

Anda juga dapat menggunakan `chocolatey` untuk menginstalnya:

```bash
choco install nvs
```

#### macOS,UnixLike

Anda dapat menemukan dokumentasi mengenai langkah-langkah instalasi `nvs` di sistem macOS/Unix-like [di sini](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Penggunaan

Setelah ini, Anda dapat menggunakan `nvs` untuk beralih di antara versi node yang berbeda.

Untuk menambahkan versi terbaru node:

```bash
nvs add latest
```

Atau pun bash untuk menambahkan node versi LTS terbaru:

```bash
nvs add lts
```

Kemudian jalankan perintah `nvs use` untuk menambahkan versi node ke `PATH` shell saat ini:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Kemudian jalankan perintah `nvs use` untuk menambahkan versi node ke `PATH` shell saat ini:

```bash
nvs link lts
```

## OpenBSD

Node.js tersedia melalui sistem ports.

```bash
/usr/ports/lang/node
```

Menggunakan [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) di OpenBSD:

```bash
pkg_add node
```

## openSUSE and SLE

Node.js is available in the main repositories under the following packages:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- - **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, dan `nodejs14`
    (Modul "Web and Scripting Module" harus [diaktifkan](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, dan `nodejs14`
  (Modul "Web and Scripting Module" harus [diaktifkan](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Sebagai contoh, untuk menginstal Node.js 14.x pada openSUSE Leap 15.2, jalankan perintah berikut sebagai root:

```bash
zypper install nodejs14
```

Versi utama Node yang berbeda dapat diinstal dan digunakan secara bersamaan.

## SmartOS dan illumos

Gambar SmartOS dilengkapi dengan pkgsrc yang telah diinstal. Pada distribusi illumos lainnya, pertama-tama instal **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, kemudian Anda dapat menginstal paket biner seperti biasa:

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

## vfox

Manajer versi yang lintas-platform (Windows, macOS, Linux) dan **dapat diperluas**.

Ini memungkinkan Anda untuk **versi yang berbeda untuk proyek yang berbeda**, **versi yang berbeda untuk shell yang berbeda**, dan beralih otomatis antar versi Node berdasarkan direktori saat ini, dll.

Dukung semua shell populer (Bash, Zsh, Fish, PowerShell, Clink, Cmder).

Lihat [Panduan Memulai Cepat](https://vfox.lhan.me/guides/quick-start.html) untuk menggunakan vfox dengan cepat, dan semua detail penggunaannya.

## Void Linux

Void Linux mengirimkan Node.js stabil di repositori utama.

```bash
xbps-install -Sy nodejs
```

## Windows

Unduh [Pemasang Windows](/#home-downloadhead) langsung dari situs web [nodejs.org](https://nodejs.org/).

### Windows

Unduh [Pemasang Windows](/#home-downloadhead) langsung dari situs web [nodejs.org](https://nodejs.org/).

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Menggunakan **[Winget](https://aka.ms/winget-cli)**:

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

IBM&reg; SDK untuk Node.js - z/OS&reg; tersedia dalam dua format instalasi, SMP/E dan PAX. Pilih format instalasi yang sesuai untuk Anda:

- [Menginstal dan mengkonfigurasi edisi SMP/E Node.js di z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Menginstal dan mengkonfigurasi edisi PAX Node.js di z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
