---
layout: page.hbs
title: Instalando Node.js usando un gestor de paquetes
---

# Instalando Node.js usando un gestor de paquetes

***Nota:*** Los paquetes en esta página son mantenidos y soportados por sus respectivos responsables, **no** el equipo central de Node.js. Por favor reporte cualquier problema que usted encuentre al responsable del paquete. Sí su problema resulta ser un error en Node.js mismo, el encargado reportará y escalará el error.

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Distribuciones de Linux basadas en Debian y Ubuntu, Enterprise Linux/Fedora y Snap](#distribuciones-de-linux-basadas-en-debian-y-ubuntu-enterprise-linux-fedora-y-snap)
* [FreeBSD y OpenBSD](#freebsd-y-openbsd)
* [Gentoo](#gentoo)
* [NetBSD](#netbsd)
* [openSUSE y SLE](#opensuse-y-sle)
* [macOS](#macos)
* [SmartOS y illumos](#smartos-y-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows)

---

## Android

Android support is still experimental in Node.js, so precompiled binaries are not yet provided by Node.js developers.

However, there are some third-party solutions. For example, [Termux](https://termux.com/) community provides terminal emulator and Linux environment for Android, as well as own package manager and [extensive collection](https://github.com/termux/termux-packages) of many precompiled applications. This command in Termux app will install the last available Node.js version:

```bash
pkg install nodejs
```

Currently, Termux Node.js binaries are linked against `system-icu` (depending on `libicu` package).

## Arch Linux

Paquetes para Node.js y npm están disponibles en el repositorio de la comunidad.

```bash
pacman -S nodejs npm
```

## Distribuciones de Linux basadas en Debian y Ubuntu, Enterprise Linux/Fedora y Snap

[Las distribuciones de binarios oficiales de Node.js](https://github.com/nodesource/distributions/blob/master/README.md) son proporcinadas por NodeSource.

## FreeBSD y OpenBSD

Node.js está disponible mediante el sistema de ports.

```bash
/usr/ports/www/node
```

Versiones de desarrollo también están disponibles usando ports

```bash
cd /usr/ports/www/node-devel/ && make install clean
```

Ó paquetes en FreeBSD:

```bash
pkg_add -r node-devel
```

Usando [pkg-ng](https://wiki.freebsd.org/pkgng) en FreeBSD

```bash
pkg install node
```

Ó versiones de desarrollo:

```bash
pkg install node-devel
```

## Gentoo

Node.js está disponible en el árbol de portage.

```bash
emerge nodejs
```

## NetBSD

Node.js está disponible en el árbol de pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ó instale un paquete binario (si está disponible para su plataforma) usando pkgin:

```bash
pkgin -y install nodejs
```

## openSUSE y SLE

[Descargue Node.js mediante openSUSE one-click](http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs).

Paquetes RPM disponibles para: openSUSE 11.4, 12.1, 12.2, 12.3, 13.1, Factory y Tumbleweed; SLE 11 (con las variaciones SP1/SP2/SP3).

Ejemplo de instalación en openSUSE 13.1:

```bash
sudo zypper ar \
  http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_13.1/ \
  Node.js
sudo zypper in nodejs nodejs-devel
```

## macOS

Simplemente descargue el [Instalador para macOS](https://nodejs.org/es/#home-downloadhead) directamente desde el sitio web de [nodejs.org](https://nodejs.org/).

_Si usted quiere descargar el paquete con bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativas

Usando **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Usando **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Usando **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Instale el paquete binario:

```bash
pkgin -y install nodejs
```

Ó compílelo manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS y illumos

Las imágenes de SmartOS vienen con pkgsrc pre-instalado. En otras distribuciones de illumos, primero instale **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, luego usted puede instalar el paquete binario de la manera usual:

```bash
pkgin -y install nodejs
```

Ó compilarlo manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

Solus provides Node.js in its main repository.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux incluye Node.js estable en el repositorio principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Simplemente descargue el [Instalador para Windows](https://nodejs.org/es/#home-downloadhead) directamente desde el sitio web de [nodejs.org](https://nodejs.org/).

### Alternativas

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# ó para una instalación completa con npm
cinst nodejs.install
```

Usando **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
