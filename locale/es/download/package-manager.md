---
layout: page.hbs
title: Instalando Node.js usando un gestor de paquetes
---

# Instalando Node.js usando un gestor de paquetes

***Nota:*** Los paquetes en esta página son mantenidos y soportados por sus respectivos responsables, **no** el equipo central de Node.js. Por favor reporte cualquier problema que usted encuentre al responsable del paquete. Sí su problema resulta ser un error en Node.js mismo, el encargado reportará y escalará el error.

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Distribuciones de Linux basadas en Debian y Ubuntu, Enterprise Linux/Fedora y Snap](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD y OpenBSD](#freebsd)
* [Gentoo](#gentoo)
* [NetBSD](#ibm-i)
* [openSUSE y SLE](#netbsd)
* [macOS](#nvm)
* [SmartOS y illumos](#openbsd)
* [Solus](#opensuse-and-sle)
* [Void Linux](#macos)
* [Windows](#smartos-and-illumos)
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

Versiones de desarrollo también están disponibles usando ports

```bash
/usr/ports/www/node
```

Ó paquetes en FreeBSD:

```bash
cd /usr/ports/www/node-devel/ && make install clean
```

## Gentoo

Usando [pkg-ng](https://wiki.freebsd.org/pkgng) en FreeBSD

```bash
pkg_add -r node-devel
```

## NetBSD

Ó versiones de desarrollo:

Node.js está disponible en el árbol de portage.

```bash
pkg install node
```

Node.js está disponible en el árbol de pkgsrc:

## openSUSE y SLE

Ó instale un paquete binario (si está disponible para su plataforma) usando pkgin:

```bash
pkg install node-devel
```

[Descargue Node.js mediante openSUSE one-click](http://software.opensuse.org/download.html?project=devel%3Alanguages%3Anodejs&package=nodejs).

```bash
emerge nodejs
```

## macOS
Paquetes RPM disponibles para: openSUSE 11.4, 12.1, 12.2, 12.3, 13.1, Factory y Tumbleweed; SLE 11 (con las variaciones SP1/SP2/SP3).

Ejemplo de instalación en openSUSE 13.1:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Simplemente descargue el [Instalador para macOS](https://nodejs.org/es/#home-downloadhead) directamente desde el sitio web de [nodejs.org](https://nodejs.org/).

```bash
pkgin -y install nodejs
```

Once the official release is out you will want to uninstall the version built from source:

```bash
sudo zypper ar \
  http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_13.1/ \
  Node.js
sudo zypper in nodejs nodejs-devel
```

## SmartOS y illumos

Usando **[Homebrew](https://brew.sh/)**:

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

Usando **[MacPorts](https://www.macports.org/)**:

```bash
brew install node
```

## Solus

Usando **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6` (The "Web and Scripting Module" must be [added before installing](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

Instale el paquete binario:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

## Void Linux

Ó compílelo manualmente desde pkgsrc:

_If you want to download the package with bash:_

```bash
pkgin -y install nodejs
```

### Alternativas

Ó compilarlo manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

Solus provides Node.js in its main repository.

```bash
pkgin -y install nodejs
```

Void Linux incluye Node.js estable en el repositorio principal.

Simplemente descargue el [Instalador para Windows](https://nodejs.org/es/#home-downloadhead) directamente desde el sitio web de [nodejs.org](https://nodejs.org/).

```bash
emerge nodejs
```

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
sudo eopkg install nodejs
```

## Windows

Usando **[Scoop](https://scoop.sh/)**:

```bash
emerge nodejs
```

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
sudo eopkg install nodejs
```

## Solus

Solus provides Node.js in its main repository.

```bash
scoop install nodejs
```

## Void Linux

Void Linux ships Node.js stable in the main repository.

```bash
xbps-install -Sy nodejs
```

## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### Alternativas

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
