---
layout: page.hbs
title: Cài đặt Node.js thông qua trình quản lý gói
---

# Cài đặt Node.js thông qua trình quản lý gói

***Lưu ý:*** Các gói trên trang này được duy trì và hỗ trợ bởi các nhà đóng gói
tương ứng của chúng, **không phải** nhóm cốt lõi của Node.js. Vui lòng báo cáo
bất kỳ vấn đề nào bạn gặp phải với người bảo trì gói. Nếu hóa ra vấn đề của bạn
là một lỗi trong chính Node.js, người bảo trì sẽ báo cáo vấn đề ngược dòng.

---

* [Alpine Linux](#alpine-linux)
* [Android](#android)
* [Arch Linux](#arch-linux)
* [CentOS, Fedora và Red Hat Enterprise
  Linux](#centos-fedora-và-red-hat-enterprise-linux)
* [Bản phân phối Linux dựa trên Debian và
  Ubuntu](#bn-phân-phi-linux-da-trên-debian-và-ubuntu)
* [fnm](#fnm)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [macOS](#macos)
* [n](#n)
* [NetBSD](#netbsd)
* [Nodenv](#nodenv)
* [nvm](#nvm)
* [nv](#nv)
* [OpenBSD](#openbsd)
* [openSUSE và SLE](#opensuse-và-sle)
* [SmartOS và illumos](#smartos-và-illumos)
* [Chụp](#chp)
* [Solus](#solus)
* [Vô hiệu hóa Linux](#vô-hiu-hóa-linux)
* [Các cửa sổ](#các-ca-s-1)
* [z/OS](#zos)

---

## Alpine Linux

Các gói Node.js LTS và npm có sẵn trong Kho lưu trữ chính.

```bash
apk add nodejs npm
```

Có thể cài đặt Node.js Hiện tại từ Kho lưu trữ cộng đồng.

```bash
apk install nodejs-current
```

## Android

Hỗ trợ Android vẫn đang thử nghiệm trong Node.js, vì vậy các tệp nhị phân được
biên dịch trước chưa được nhà phát triển Node.js cung cấp.

Tuy nhiên, có một số giải pháp của bên thứ ba. Ví dụ: cộng đồng
[Termux](https://termux.com/) cung cấp trình giả lập thiết bị đầu cuối và môi
trường Linux cho Android, cũng như trình quản lý gói riêng và [bộ sưu tập mở
rộng](https://github.com/termux/termux- packages) của nhiều ứng dụng được biên
dịch trước. Lệnh này trong ứng dụng Termux sẽ cài đặt phiên bản Node.js mới nhất
có sẵn:

```bash
pkg install nodejs
```

Hiện tại, các nhị phân Termux Node.js được liên kết với `system-icu` (tùy thuộc
vào gói `libicu`).

## Arch Linux

Các gói Node.js và npm có sẵn trong Kho lưu trữ cộng đồng.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora và Red Hat Enterprise Linux

Node.js có sẵn dưới dạng mô-đun có tên `nodejs` trong CentOS/RHEL 8 và Fedora.

```bash
dnf module install nodejs:<stream>
```

trong đó `<stream>` tương ứng với phiên bản chính của Node.js. Để xem danh sách
các luồng có sẵn:

```bash
dnf module list nodejs
```

Ví dụ: để cài đặt Node.js 18:

```bash
dnf module install nodejs:18/common
```

Đối với CentOS/RHEL 7, Node.js có sẵn qua [Bộ sưu tập phần
mềm](https://www.softwarecollections.org/en/scls/?search=NodeJS).

### Lựa chọn thay thế

Các tài nguyên này cung cấp các gói tương thích với CentOS, Fedora và RHEL.
* [Node.js snaps](#snap) được duy trì và hỗ trợ tại
  https://github.com/nodejs/snap
* [Bản phân phối nhị phân Node.js](#debian-and-ubuntu-based-linux-distributions)
  được duy trì và hỗ trợ bởi
  [NodeSource](https://github.com/nodesource/distributions)

## Bản phân phối Linux dựa trên Debian và Ubuntu

[Bản phân phối nhị phân Node.js](https://github.com/nodesource/distributions) có
sẵn từ NodeSource.

### Lựa chọn thay thế

Các gói tương thích với các bản phân phối Linux dựa trên Debian và Ubuntu có sẵn
thông qua [Node.js snaps](#snap).

## fnm

Trình quản lý phiên bản Node.js nhanh và đơn giản được tích hợp trong Rust dùng
để quản lý nhiều phiên bản Node.js đã phát hành. Nó cho phép bạn thực hiện các
thao tác như cài đặt, gỡ cài đặt, tự động chuyển đổi các phiên bản Node dựa trên
thư mục hiện tại, v.v. Để cài đặt fnm, hãy sử dụng [tập lệnh cài
đặt](https://github.com/Schniz/fnm#using-a-script-macoslinux) này.

fnm có hỗ trợ đa nền tảng (macOS, Windows, Linux) và tất cả các shell phổ biến
(Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt). fnm được xây dựng
chú trọng đến tốc độ và hỗ trợ tương thích cho các tệp `.node-version` và
`.nvmrc`.

## FreeBSD

Bản phát hành mới nhất của Node.js có sẵn qua cổng
[www/node](https://www.freshports.org/www/node).

Cài đặt gói nhị phân qua [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Hoặc tự biên dịch nó bằng [cổng](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js có sẵn trong cây portage.

```bash
emerge nodejs
```

## IBM i

Các phiên bản LTS của Node.js có sẵn từ IBM và có sẵn thông qua [trình quản lý
gói 'yum'](https://ibm.biz/ibmi-rpms). Tên gói là `nodejs` theo sau là số phiên
bản chính (ví dụ: `nodejs12`, `nodejs14`, v.v.)

Để cài đặt Node.js 14.x từ dòng lệnh, hãy chạy phần sau với tư cách người dùng
có quyền đặc biệt \*ALLOBJ:

```bash
yum install nodejs14
```

Node.js cũng có thể được cài đặt với sản phẩm IBM i Access Client Solutions. Xem
[tài liệu hỗ trợ
này](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) để biết thêm
chi tiết

## macOS

Tải xuống [trình cài đặt macOS](https://nodejs.org/en/#home-downloadhead) trực
tiếp từ trang web [nodejs.org](https://nodejs.org/).

_Nếu bạn muốn tải gói có bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Lựa chọn thay thế

Sử dụng **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Sử dụng **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Ví dụ
port install nodejs7
```

Sử dụng **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Cài đặt gói nhị phân:

```bash
pkgin -y install nodejs
```

Hoặc xây dựng thủ công từ pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## N

`n` là một trình quản lý phiên bản Node.js đơn giản để sử dụng cho Mac và Linux.
Chỉ định phiên bản mục tiêu để cài đặt bằng cú pháp phong phú, hoặc chọn từ menu
các phiên bản đã tải xuống trước đó. Các phiên bản được cài đặt trên toàn hệ
thống hoặc trên toàn người dùng và để biết thêm mục tiêu sử dụng, bạn có thể
chạy một phiên bản trực tiếp từ các bản tải xuống được lưu trong bộ nhớ cache.

Xem [trang chủ](https://github.com/tj/n) để biết các phương pháp cài đặt
(bootstrap, npm, Homebrew, bên thứ ba) và tất cả các chi tiết sử dụng.

Nếu bạn đã có `npm` thì việc cài đặt `n` và sau đó là phiên bản `node` LTS mới
nhất cũng đơn giản như sau:

```
npm install -g n
n lts
```

## NetBSD

Node.js có sẵn trong cây pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Hoặc cài đặt gói nhị phân (nếu có sẵn cho nền tảng của bạn) bằng pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` là trình quản lý phiên bản nút nhẹ, tương tự như `nvm`. Nó đơn giản và
có thể dự đoán được. Một hệ sinh thái plugin phong phú cho phép bạn điều chỉnh
nó cho phù hợp với nhu cầu của mình. Sử dụng `nodenv` để chọn phiên bản Node cho
ứng dụng của bạn và đảm bảo rằng môi trường phát triển của bạn phù hợp với sản
xuất.

Hướng dẫn cài đặt Nodenv được duy trì [trên trang Github của
nó](https://github.com/nodenv/nodenv#installation). Vui lòng truy cập trang đó
để đảm bảo bạn đang làm theo phiên bản mới nhất của các bước cài đặt.

## nvm

Trình quản lý phiên bản nút là một tập lệnh bash được sử dụng để quản lý nhiều
phiên bản Node.js đã phát hành. Nó cho phép bạn thực hiện các thao tác như cài
đặt, gỡ cài đặt, chuyển đổi phiên bản, v.v. Để cài đặt nvm, hãy sử dụng [tập
lệnh cài đặt](https://github.com/nvm-sh/nvm#install--update-script) này.

Trên các hệ thống Unix/OS X, có thể cài đặt Node.js từ nguồn bằng cách sử dụng
[nvm](https://github.com/creationix/nvm) bằng cách cài đặt vào vị trí mà nvm
mong đợi:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Sau này, bạn có thể sử dụng `nvm` để chuyển đổi giữa các phiên bản đã phát hành
và các phiên bản được xây dựng từ nguồn. Ví dụ: nếu phiên bản Node.js là
v8.0.0-pre:

```bash
nvm use 8
```

Sau khi phát hành chính thức, bạn sẽ muốn gỡ cài đặt phiên bản đã xây dựng từ
nguồn:

```bash
nvm uninstall 8
```

## nv

#### Các cửa sổ

Trình quản lý phiên bản `nvs` là đa nền tảng và có thể được sử dụng trên các hệ
thống tương tự Windows, macOS và Unix

Để cài đặt `nvs` trên Windows, hãy truy cập [trang phát
hành](https://github.com/jasongin/nvs/releases) tại đây và tải xuống tệp trình
cài đặt MSI của bản phát hành mới nhất.

Bạn cũng có thể sử dụng `chocolatey` để cài đặt nó:

```bash
choco install nvs
```

#### macOS, UnixLike

Bạn có thể tìm tài liệu về các bước cài đặt của `nvs` trong các hệ thống tương
tự macOS/Unix [tại
đây](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Cách sử dụng

Sau này, bạn có thể sử dụng `nvs` để chuyển giữa các phiên bản khác nhau của
nút.

Để thêm phiên bản mới nhất của nút:

```bash
nvs add latest
```

Hoặc để thêm phiên bản LTS mới nhất của nút:

```bash
nvs add lts
```

Sau đó chạy lệnh `nvs use` để thêm phiên bản nút vào `PATH` của bạn cho trình
bao hiện tại:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Để thêm nó vào `PATH` vĩnh viễn, hãy sử dụng `nvs link`:

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
node pkg_add
```

## openSUSE và SLE

Node.js có sẵn trong các kho lưu trữ chính theo các gói sau:

* **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
* **openSUSE Tumbleweed**: `nodejs16`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12` và
  `nodejs14` ("Mô-đun web và tập lệnh" phải được
  [bật](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
* **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12` và
  `nodejs14` ("Mô-đun Web và Tập lệnh" phải được
  [bật](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Ví dụ: để cài đặt Node.js 14.x trên openSUSE Leap 15.2, hãy chạy lệnh sau với
quyền root:

```bash
zypper install nodejs14
```

Các phiên bản chính khác nhau của Node có thể được cài đặt và sử dụng đồng thời.

## SmartOS và illumos

Hình ảnh SmartOS được cài đặt sẵn pkgsrc. Trên các bản phân phối khác của
illumos, trước tiên hãy cài đặt
**[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, sau đó bạn có thể
cài đặt gói nhị phân như bình thường:

```bash
pkgin -y install nodejs
```

Hoặc xây dựng thủ công từ pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Chụp

[Node.js snaps](https://github.com/nodejs/snap) có sẵn dưới dạng
[`node`](https://snapcraft.io/node) trên cửa hàng Snap.

## Solus

Solus cung cấp Node.js trong kho lưu trữ chính của nó.

```bash
sudo eopkg install nodejs
```

## Vô hiệu hóa Linux

Void Linux vận chuyển Node.js ổn định trong kho lưu trữ chính.

```bash
install xbps -Sy nodejs
```

## Các cửa sổ

Tải xuống [Windows Installer](https://nodejs.org/en/#home-downloadhead) trực
tiếp từ trang web [nodejs.org](https://nodejs.org/).

### Lựa chọn thay thế

Sử dụng **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# hoặc cho LTS
winget install OpenJS.NodeJS.LTS
```

Sau khi chạy một trong hai lệnh trên, có thể cần phải khởi động lại giả lập
thiết bị đầu cuối trước khi có lệnh `node` CLI.

Sử dụng **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# hoặc để cài đặt đầy đủ với npm
cinst nodejs.install
```

Sử dụng **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# hoặc cho LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK cho Node.js - z/OS&reg; có sẵn trong hai định dạng cài đặt, SMP/E
và PAX. Chọn định dạng cài đặt phù hợp với bạn:
* [Cài đặt và định cấu hình phiên bản SMP/E của Node.js trên
  z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=conforming-installing-smpe-edition
  )
* [Cài đặt và định cấu hình phiên bản PAX của Node.js trên
  z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=conforming-installing-pax-edition)
