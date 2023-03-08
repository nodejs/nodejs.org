---
layout: page.hbs
title: Instalando Node.js utilizando un gestor de paquetes
---

# Instalando Node.js utilizando un gestor de paquetes

***Nota:*** Los paquetes de esta página son mantenidos y soportados por sus respectivos responsables, **no** por el equipo central de Node.js. Por favor reporte cualquier problema que usted encuentre al responsable del paquete. Si su problema resulta ser un error en el mismo Node.js, la persona encargada reportará y escalará el error.

---

* [Android](#android)
* [Arch Linux](#arch-linux)
* [Distribuciones de Linux basadas en Debian y Ubuntu, Enterprise Linux/Fedora y Snap](#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
* [FreeBSD](#freebsd)
* [Gentoo](#gentoo)
* [IBM i](#ibm-i)
* [NetBSD](#netbsd)
* [nvm](#nvm)
* [nvs](#nvs)
* [OpenBSD](#openbsd)
* [openSUSE y SLE](#opensuse-and-sle)
* [macOS](#macos)
* [SmartOS y illumos](#smartos-and-illumos)
* [Solus](#solus)
* [Void Linux](#void-linux)
* [Windows](#windows-1)

---

## Android

El soporte para Android todavía es experimental en Node.js, por lo que los desarrolladores de Node.js aún no proporcionan los binarios precompilados.

Sin embargo, hay algunas soluciones de terceros. Por ejemplo, la comunidad [Termux](https://termux.com/) que proporciona un emulador de terminal y un entorno Linux para Android, así como un administrador de paquetes propio y una [amplia colección](https://github.com/termux/termux-packages) de aplicaciones precompiladas. Este comando en la aplicación Termux instalará la última versión disponible de Node.js:

```bash
pkg install nodejs
```

Actualmente, los binarios de Termux Node.js están vinculados contra `system-icu` (dependiendo del paquete `libicu`).

## Arch Linux

Los paquetes para Node.js y npm están disponibles en el repositorio de la Comunidad.

```bash
pacman -S nodejs npm
```

## Distribuciones Linux basadas en Debian y Ubuntu, paquetes Enterprise Linux / Fedora y Snap

[Las distribuciones de binarios oficiales de Node.js](https://github.com/nodesource/distributions/blob/master/README.md) son proporcinados por NodeSource.

## FreeBSD

La release más reciente de Node.js está disponible desde el port [www/node](https://www.freshports.org/www/node).

Instale el paquete binario a través de [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

O compílelo usted mismo utilizando [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js está disponible en portage.

```bash
emerge nodejs
```

## IBM i

Las versiones LTS de Node.js están disponibles en IBM, y están disponibles a través de [el administrador de paquetes 'yum'](https://ibm.biz/ibmi-rpms). El nombre del paquete es `nodejs` seguido del número de versión principal (por ejemplo, `nodejs8`, `nodejs10`, `nodejs12`, etc.)

Para instalar Node.js 12.x desde la línea de comandos, ejecute lo siguiente como usuario con autoridad especial \*ALLOBJ:

```bash
yum install nodejs12
```

Node.js también se puede instalar con el producto IBM i Access Client Solutions. Consulte [este documento de soporte](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) para obtener más detalles.

## NetBSD

Node.js está disponible en pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

O instale un paquete binario (si está disponible para su plataforma) utilizando pkgin:

```bash
pkgin -y install nodejs
```

## nvm
Node Version Manager es un script bash utilizado para administrar múltiples versiones lanzadas de Node.js. Permite realizar operaciones como instalar, desinstalar, cambiar de versión, etc. Para instalar nvm, use este [script de instalación](https://github.com/nvm-sh/nvm#install--update-script).

En los sistemas Unix / OS X, Node.js construido desde la fuente se puede instalar usando [nvm](https://github.com/creationix/nvm) instalándolo en la ubicación que nvm espera:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Después de esto, puede utilizar `nvm` para cambiar entre las versiones publicadas y las versiones creadas desde la fuente. Por ejemplo, si la versión de Node.js es v8.0.0-pre:

```bash
nvm use 8
```

Once the official release is out you will want to uninstall the version built from source:

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

Node.js está disponible a través del sistema de puertos.

```bash
/usr/ports/lang/node
```

Utilizando [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) en OpenBSD:

```bash
pkg_add node
```

## openSUSE and SLE

Node.js está disponible en los repositorios principales en los siguientes paquetes:

* **openSUSE Leap 42.2**: `nodejs4`
* **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
* **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6` (The "Web and Scripting Module" must be [added before installing](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

Por ejemplo, para instalar Node.js 4.x en openSUSE Leap 42.2, ejecute lo siguiente como root:

```bash
zypper install nodejs4
```

## macOS

Ó compílelo manualmente desde pkgsrc:

_Si quieres descargar el paquete con bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativas

Utilizando **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Utilizando **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Utilizando **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Instale el paquete binario:

```bash
pkgin -y install nodejs
```

O compílelo manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## SmartOS y illumos

Las imágenes SmartOS vienen con pkgsrc preinstalado. En otras distribuciones de illumos, primero instale **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, y entonces podrá instalar el paquete binario de manera normal:

```bash
pkgin -y install nodejs
```

O compílelo manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Solus

Solus proporciona Node.js en su repositorio principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux incluye la versión estable de Node.js en el repositorio principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### Alternativas

Utilizando **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Utilizando **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```
