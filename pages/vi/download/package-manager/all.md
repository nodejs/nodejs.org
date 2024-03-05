---
layout: docs
title: Cài đặt Node.js qua trình quản lý gói
---

# Cài đặt Node.js qua Trình quản lý Gói

> Các gói trên trang này được duy trì và hỗ trợ bởi người quản lý gói tương ứng, **không phải** là nhóm nhân viên cốt lõi của Node.js. Vui lòng báo cáo bất kỳ vấn đề nào bạn gặp phải cho người duy trì gói. Nếu vấn đề của bạn cuối cùng là một lỗi trong Node.js chính nó, người duy trì sẽ báo cáo vấn đề lên trên.

---

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora và Red Hat Enterprise Linux](#centos-fedora-and-red-hat-enterprise-linux)
- [Debian và các bản phân phối Linux dựa trên Ubuntu](#debian-and-ubuntu-based-linux-distributions)
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
- [SmartOS và illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

---

## Alpine Linux

Node.js LTS và các gói npm có sẵn trong Kho chính.

```bash
apk add nodejs npm
```

Node.js Current có thể được cài đặt từ Kho cộng đồng.

```bash
apk add nodejs-current
```

## Android

Hỗ trợ Android vẫn đang thử nghiệm trong Node.js, vì vậy các tệp nhị phân đã được biên soạn trước vẫn chưa được cung cấp bởi các nhà phát triển Node.js.

Tuy nhiên, có một số giải pháp của bên thứ ba. Ví dụ, cộng đồng [Termux](https://termux.com/) cung cấp trình giả lập terminal và môi trường Linux cho Android, cũng như trình quản lý gói riêng và [bộ sưu tập đa dạng](https://github.com/termux/termux-packages) của nhiều ứng dụng đã được biên soạn sẵn. Lệnh này trong ứng dụng Termux sẽ cài đặt phiên bản Node.js cuối cùng có sẵn:

```bash
pkg install nodejs
```

Hiện tại, các tệp nhị phân Node.js của Termux được liên kết với `system-icu` (tùy thuộc vào gói `libicu`).

## Arch Linux

Gói Node.js và npm có sẵn trong Kho cộng đồng.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora và Red Hat Enterprise Linux

Node.js có sẵn dưới dạng một module có tên là `nodejs` trong CentOS/RHEL 8 và Fedora.

```bash
dnf module install nodejs:<stream>
```

nơi `<stream>` tương ứng với phiên bản chính của Node.js.
Để xem danh sách các luồng có sẵn:

```bash
dnf module list nodejs
```

Ví dụ, để cài đặt Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Các lựa chọn

Những tài nguyên này cung cấp các gói tương thích với CentOS, Fedora và RHEL.

- [Node.js snaps](#snap) được duy trì và hỗ trợ tại https\://github.com/nodejs/snap
- [Node.js binary distributions](#debian-and-ubuntu-based-linux-distributions) được duy trì và hỗ trợ bởi [NodeSource](https://github.com/nodesource/distributions)

## Các bản phân phối nhị phân Node.js dành cho Debian và Ubuntu

[Node.js binary distributions](https://github.com/nodesource/distributions) có sẵn từ NodeSource.

### Các lựa chọn

Các gói tương thích với Debian và Ubuntu dựa trên các bản phân phối Linux có sẵn thông qua [Node.js snaps](#snap).

## fnm

Trình quản lý phiên bản Node.js nhanh chóng và đơn giản được xây dựng bằng Rust để quản lý nhiều phiên bản Node.js đã phát hành. Nó cho phép bạn thực hiện các thao tác như cài đặt, gỡ cài đặt, chuyển đổi phiên bản Node tự động dựa trên thư mục hiện tại, v.v.
Để cài đặt fnm, sử dụng [kịch bản cài đặt này](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm hỗ trợ đa nền tảng (macOS, Windows, Linux) và tất cả các shell phổ biến (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm được xây dựng với tốc độ và hỗ trợ tương thích cho các tệp `.node-version` và `.nvmrc`.

## FreeBSD

Phiên bản mới nhất của Node.js có sẵn thông qua cổng [www/node](https://www.freshports.org/www/node).

Cài đặt một gói nhị phân thông qua [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Hoặc biên dịch nó trên máy của bạn bằng cách sử dụng [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js có sẵn trong cây portage.

```bash
emerge nodejs
```

## IBM i

Phiên bản LTS của Node.js có sẵn từ IBM, và có sẵn thông qua [trình quản lý gói 'yum'](https://ibm.biz/ibmi-rpms). Tên gói là `nodejs` theo sau là số phiên bản chính (ví dụ, `nodejs18`, `nodejs20` v.v.)

Để cài đặt Node.js 20.x từ dòng lệnh, chạy lệnh sau với quyền đặc biệt \*ALLOBJ:

```bash
yum install nodejs20
```

Node.js cũng có thể được cài đặt bằng sản phẩm IBM i Access Client Solutions. Xem [tài liệu hỗ trợ này](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) để biết thêm chi tiết

## macOS

Tải về [macOS Installer](/#home-downloadhead) trực tiếp từ trang web [nodejs.org](https://nodejs.org/).

_Nếu bạn muốn tải gói cài đặt bằng bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Tùy chọn

Sử dụng **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Sử dụng **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Sử dụng **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Cài đặt gói nhị phân:

```bash
pkgin -y install nodejs
```

Hoặc xây dựng thủ công từ pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` là một trình quản lý phiên bản Node.js dễ sử dụng cho Mac và Linux. Chỉ định phiên bản mục tiêu để cài đặt bằng cú pháp phong phú,
hoặc chọn từ menu các phiên bản đã tải trước đó. Các phiên bản được cài đặt trên toàn hệ thống hoặc trên người dùng, và để sử dụng mục tiêu hơn
bạn có thể chạy một phiên bản trực tiếp từ các tải về đã lưu trữ.

Xem trang chủ](https\://github.com/tj/n) để biết các phương pháp cài đặt (bootstrap, npm, Homebrew, bên thứ ba), và tất cả các chi tiết sử dụng.

Nếu bạn đã có `npm` thì việc cài đặt `n` và sau đó là phiên bản LTS mới nhất của `node` là rất đơn giản:

```
npm install -g n
n lts
```

## NetBSD

Node.js có sẵn trong cây pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Hoặc cài đặt một gói nhị phân (nếu có sẵn cho nền tảng của bạn) bằng pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` là một trình quản lý phiên bản node nhẹ, tương tự như `nvm`. Nó đơn giản và dễ dự đoán. Một hệ sinh thái plugin phong phú cho phép bạn tinh chỉnh nó để phù hợp với nhu cầu của bạn. Sử dụng `nodenv` để chọn một phiên bản Node cho ứng dụng của bạn và đảm bảo rằng môi trường phát triển của bạn khớp với môi trường sản xuất.

Hướng dẫn cài đặt Nodenv được duy trì [trên trang Github của nó](https://github.com/nodenv/nodenv#installation). Vui lòng truy cập trang đó để đảm bảo bạn đang tuân thủ phiên bản mới nhất của các bước cài đặt.

## nvm

Node Version Manager là một tập lệnh bash được sử dụng để quản lý nhiều phiên bản Node.js đã phát hành. Nó cho phép bạn thực hiện các hoạt động như cài đặt, gỡ cài đặt, chuyển đổi phiên bản, v.v. Để cài đặt nvm, sử dụng [tập lệnh cài đặt](https://github.com/nvm-sh/nvm#install--update-script) này.

Trên hệ thống Unix / OS X, Node.js được xây dựng từ mã nguồn có thể được cài đặt bằng cách sử dụng [nvm](https://github.com/creationix/nvm) bằng cách cài đặt vào vị trí mà nvm mong đợi:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Sau đó, bạn có thể sử dụng `nvm` để chuyển đổi giữa các phiên bản đã phát hành và các phiên bản được xây dựng từ mã nguồn. Ví dụ, nếu phiên bản của Node.js là v8.0.0-pre:

```bash
nvm use 8
```

Khi phiên bản chính thức được phát hành, bạn sẽ muốn gỡ cài đặt phiên bản được xây dựng từ mã nguồn:

```bash
nvm uninstall 8
```

## nvs

#### Windows

Trình quản lý phiên bản `nvs` là đa nền tảng và có thể được sử dụng trên Windows, macOS và các hệ thống giống Unix

Để cài đặt `nvs` trên Windows, hãy truy cập trang [phát hành](https://github.com/jasongin/nvs/releases) ở đây và tải xuống tệp cài đặt MSI của phiên bản mới nhất.

Bạn cũng có thể sử dụng `chocolatey` để cài đặt nó:

```bash
choco install nvs
```

#### macOS,UnixLike

Bạn có thể tìm tài liệu về các bước cài đặt `nvs` trên các hệ thống macOS/Unix-like [tại đây](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Sử dụng

Sau đó, bạn có thể sử dụng `nvs` để chuyển đổi giữa các phiên bản khác nhau của Node.js.

Để thêm phiên bản mới nhất của Node.js:

```bash
nvs add latest
```

Hoặc để thêm phiên bản LTS mới nhất của Node.js:

```bash
nvs add lts
```

Sau đó chạy lệnh `nvs use` để thêm một phiên bản của Node.js vào `PATH` cho shell hiện tại của bạn:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Để thêm nó vào `PATH` vĩnh viễn, sử dụng `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js có sẵn thông qua hệ thống cổng.

```bash
/usr/ports/lang/node
```

Sử dụng [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) trên OpenBSD:

```bash
pkg_add node
```

## openSUSE và SLE

Node.js có sẵn trong các kho chính dưới các gói sau:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, và `nodejs14`
  (Mô-đun "Web and Scripting" phải được [kích hoạt](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, và `nodejs14`
  (Mô-đun "Web and Scripting" phải được [kích hoạt](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Ví dụ, để cài đặt Node.js 14.x trên openSUSE Leap 15.2, chạy lệnh sau với quyền root:

```bash
zypper install nodejs14
```

Các phiên bản chính khác nhau của Node có thể được cài đặt và sử dụng đồng thời.

## SmartOS và illumos

Hình ảnh SmartOS đi kèm với pkgsrc đã được cài đặt sẵn. Trên các bản phân phối illumos khác, trước tiên cài đặt **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, sau đó bạn có thể cài đặt gói nhị phân như bình thường:

```bash
pkgin -y install nodejs
```

Hoặc xây dựng thủ công từ pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) có sẵn dưới dạng [`node`](https://snapcraft.io/node) trên cửa hàng Snap.

## Solus

Solus cung cấp Node.js trong kho chính của mình.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux cung cấp Node.js ổn định trong kho chính.

```bash
xbps-install -Sy nodejs
```

## Windows

Tải xuống [Windows Installer](/#home-downloadhead) trực tiếp từ trang web [nodejs.org](https://nodejs.org/).

### Các lựa chọn

Sử dụng **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Sau khi chạy một trong hai lệnh trên, có thể cần khởi động lại bộ mô phỏng terminal trước khi lệnh CLI `node` trở nên khả dụng.

Sử dụng **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Sử dụng **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM® SDK cho Node.js - z/OS® có sẵn trong hai định dạng cài đặt, SMP/E và PAX. Chọn định dạng cài đặt phù hợp với bạn:

- [Cài đặt và cấu hình phiên bản SMP/E của Node.js trên z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Cài đặt và cấu hình phiên bản PAX của Node.js trên z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
