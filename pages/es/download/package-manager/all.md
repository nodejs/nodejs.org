---
layout: docs.hbs
title: Instalar Node.js a través del gestor de paquetes
---

# Instalar Node.js a través de gestores de paquetes

> Los paquetes de esta página son mantenidos y soportados por sus respectivos empaquetadores, **no** el equipo central de Node.js. Por favor, informe de cualquier problema que encuentre al mantenedor del paquete. Si resulta que su problema es un error en Node.js, el mantenedor informará del problema en el desarrollador principal.

***

- [Alpine Linux](#alpine-linux)
- [Android](#android)
- [Arch Linux](#arch-linux)
- [CentOS, Fedora y Red Hat Enterprise Linux](#centos-fedora-and-red-hat-)[video] e-linux)
- [Distribuciones Linux basadas en Debian y Ubuntu](#debian-and-ubuntu-based-linux-distributions)
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
- [openSUSE y SLE](#opensuse-and-sle)
- [SmartOS y illumos](#smartos-and-illumos)
- [Snap](#snap)
- [Solus](#solus)
- [Void Linux](#void-linux)
- [Windows](#windows-1)
- [z/OS](#zos)

***

## Alpine Linux

Los paquetes LTS y npm de Node.js están disponibles en el repositorio principal.

```bash
apk añadir nodejs npm
```

Node.js Current puede instalarse desde el repositorio de la Comunidad.

```bash
apk añadir nodejs-current
```

## Android

El soporte para Android es todavía experimental en Node.js, por lo que los binarios precompilados aún no son proporcionados por los desarrolladores de Node.js.

Sin embargo, hay algunas soluciones de terceros. Por ejemplo, [Termux](https\://termux. om/) la comunidad proporciona un entorno de emulador de terminales y Linux para Android, así como un gestor de paquetes propio y una [colección extensa](https\://github. om/termux/termux-packages) de muchas aplicaciones precompiladas. Este comando en la aplicación de Termux instalará la última versión disponible de Node.js:

```bash
pkg install nodejs
```

Actualmente, los binarios de Termux Node.js están enlazados contra `system-icu` (dependiendo del paquete `libicu`).

## Arco Linux

Los paquetes Node.js y npm están disponibles en el repositorio de la Comunidad.

```bash
pacman -S nodejs npm
```

## CentOS, Unionora y Red Hat Enterprise Linux

Node.js está disponible como un módulo llamado `nodejs` en CentOS/RHEL 8 y Federora.

```bash
dnf module install nodejs:<stream>
```

donde `<stream>` corresponde a la versión principal de Node.js.
Para ver una lista de streams disponibles:

```bash
lista de módulos dnf nodejs
```

Por ejemplo, para instalar Node.js 18:

```bash
módulo dnf instalar nodejs:18/common
```

### Alternativos

Estos recursos proporcionan paquetes compatibles con CentOS, Cup y RHEL.

- [Snaps de Node.js](#snap) mantenidos y soportados en https\://github.com/nodejs/snap
- [distribuciones binarias de Node.js](#debian-and-ubuntu-based-linux-distributions) mantenidas y soportadas por [NodeSource](https://github.com/nodesource/distributions)

## Distribuciones Linux basadas en Debian y Ubuntu

[Las distribuciones binarias de Node.js](https://github.com/nodesource/distributions) están disponibles en NodeSource.

### Alternativos

Los paquetes compatibles con las distribuciones Linux basadas en Debian y Ubuntu están disponibles a través de [snaps de Node.js](#snap).

## fnm

Fast and simple Node.js version manager built in Rust used to manage multiple released Node.js versions. It allows you to perform operations like install, uninstall, switch Node versions automatically based on the current directory, etc.
To install fnm, use this [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm tiene soporte multiplataforma (macOS, Windows, Linux) y todos los shells populares (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
fnm se construye pensando en la velocidad y el soporte de compatibilidad para archivos `.node-version` y `.nvmrc`.

## BSD

La versión más reciente de Node.js está disponible a través del [www/node](https://www.freshports.org/www/node).

Instalar un paquete binario a través de [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg instalar nodo
```

O compilarlo por tu cuenta usando [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js está disponible en el árbol portage.

```bash
emerger nodejs
```

## IBM i

Las versiones LTS de Node.js están disponibles desde IBM, y están disponibles a través de [el gestor de paquetes 'yum'](https://ibm.biz/ibmi-rpms). El nombre del paquete es `nodejs` seguido por el número de versión principal (por ejemplo, `nodejs18`, `nodejs20` etc)

Para instalar Node.js 20.x desde la línea de comandos, ejecute lo siguiente como un usuario con \*ALLOBJ autoridad especial:

```bash
yum install nodejs20
```

Node.js también puede instalarse con el producto IBM i Access Client Solutions Vea [este documento de soporte](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) para más detalles

## macOS

Descarga el [macOS Installer](/#home-downloadhead) directamente desde el sitio web [nodejs.org](https://nodejs.org/).

_Si quieres descargar el paquete con bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest. kg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativos

Usando **[Homebrew](https://brew.sh/)**:

```bash
brew instalar nodo
```

Usando **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Ejemplo
port install nodejs7
```

Usando **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Instalar el paquete binario:

```bash
pkgin -y instalar nodejs
```

O compilar manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` es un gestor de versiones Node.js para Mac y Linux. Especifique la versión de destino a instalar usando una sintaxis rica,
o seleccione desde un menú de versiones previamente descargadas. Las versiones están instaladas en todo el sistema o en todo el usuario, y para más
uso dirigido puedes ejecutar una versión directamente desde las descargas en caché.

Consulte la [homepage](https://github.com/tj/n) para ver los métodos de instalación (bootstrap, npm, Homebrew, terceros) y todos los detalles de uso.

Si ya tienes `npm` instalando `n` y entonces la versión más reciente de `node` de LTS es tan simple como:

```
npm install -g n
n lts
```

## NetBSD

Node.js está disponible en el árbol pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && hacer instalación
```

O instale un paquete binario (si está disponible para su plataforma) usando pkgin:

```bash
pkgin -y instalar nodejs
```

## Nodenv

`nodenv` es un gestor de versiones de nodos ligeros, similar a `nvm`. Es simple y predecible. Un rico ecosistema de plugins le permite adaptarlo a sus necesidades. Usa `nodenv` para elegir una versión de Nodo para tu aplicación y garantizar que tu entorno de desarrollo coincida con la producción.

Las instrucciones de instalación de Nodenv se mantienen [en su página de Github](https://github.com/nodenv/nodenv#installation). Por favor visita esa página para asegurarte de que estás siguiendo la última versión de los pasos de instalación.

## nvm

Node Version Manager es un script bash utilizado para administrar múltiples versiones liberadas de Node.js. Permite
realizar operaciones como instalar, desinstalar, cambiar versión, etc.
Para instalar nvm, usa este [script de instalación](https://github.com/nvm-sh/nvm#install--update-script).

En sistemas Unix / OS X se puede instalar Node.js construido desde la fuente usando
[nvm](https://github.com/creationix/nvm) instalando en la ubicación que nvm espera:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

After this you can use `nvm` to switch between released versions and versions
built from source.
For example, if the version of Node.js is v8.0.0-pre:

```bash
nvm usar 8
```

Una vez que la versión oficial haya terminado, querrá desinstalar la versión compilada
desde el código fuente:

```bash
nvm desinstalar 8
```

## nvs

#### Ventanas

El gestor de versiones `nvs` es multiplataforma y puede ser usado en sistemas Windows, macOS y Unix

Para instalar `nvs` en Windows ve a la [página de lanzamiento](https://github.com/jasongin/nvs/releases) aquí y descarga el archivo del instalador MSI de la última versión.

También puedes usar `chocolatey` para instalarlo:

```bash
choco install nvs
```

#### macOS,UnixLike

Puede encontrar la documentación relativa a los pasos de instalación de `nvs` en sistemas de macOS/Unix-like [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Uso

Después de esto puedes usar `nvs` para cambiar entre diferentes versiones de nodo.

Para añadir la última versión del nodo:

```bash
nvs añadir última
```

O añadir la última versión LTS del nodo:

```bash
nvs añadir lts
```

Luego ejecuta el comando `nvs use` para añadir una versión de nodo a tu `PATH` para el shell actual:

```bash
$ nvs usa lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Para añadirlo a `PATH` permanentemente, usa `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js está disponible a través del sistema de puertos.

```bash
/usr/ports/lang/node
```

Usando [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) en OpenBSD:

```bash
pkg_add nodo
```

## openSUSE y SLE

Node.js está disponible en los repositorios principales bajo los siguientes paquetes:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12` y `nodejs14`
  (El "Web and Scripting Module" debe ser [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12` y `nodejs14`
  (El "Web and Scripting Module" debe ser [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Por ejemplo, para instalar Node.js 14.x en openSUSE Leap 15.2, ejecute lo siguiente como root:

```bash
zypper instalar nodejs14
```

Diferentes versiones importantes de Node pueden ser instaladas y usadas simultáneamente.

## SmartOS y illumos

Las imágenes de SmartOS vienen con pkgsrc preinstaladas. En otras distribuciones de illumos, primero instale **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, entonces puede instalar el paquete binario de forma normal:

```bash
pkgin -y instalar nodejs
```

O compilar manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Adherir

[Snaps de Node.js](https://github.com/nodejs/snap) están disponibles como [`node`](https://snapcraft.io/node) en la tienda Snap.

## Solus

Solus proporciona Node.js en su repositorio principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

Vacío Linux incluye Node.js estable en el repositorio principal.

```bash
xbps-install -Sy nodejs
```

## Ventanas

Descarga el [Windows Installer](/#home-downloadhead) directamente desde el sitio web [nodejs.org](https://nodejs.org/).

### Alternativos

Usando **[Winget](https://aka.ms/winget-cli)**:

```bash
winget instalar OpenJS.NodeJS
# o para LTS
winget instalar OpenJS.NodeJS.LTS
```

Después de ejecutar uno de los dos comandos anteriores, puede ser necesario reiniciar el emulador de terminal
antes de que el comando CLI `node` esté disponible.

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
c)[video] nodejs
# o para instalación completa con npm
c)[video] nodejs.install
```

Usando **[Scoop](https://scoop.sh/)**:

```bash
scoop instala nodejs
# o para LTS
scoop instalar nodejs-lts
```

## z/OS

IBM&reg; SDK para Node.js - z/OS&reg; está disponible en dos formatos de instalación,
SMP/E y PAX. Seleccione el formato de instalación que le corresponde:

- [Instalando y configurando la edición SMP/E de Node.js en z/OS](https://www.ibm.com/docs/es/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Instalar y configurar la edición PAX de Node.js en z/OS](https://www.ibm.com/docs/es/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
