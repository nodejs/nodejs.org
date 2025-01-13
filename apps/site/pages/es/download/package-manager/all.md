---
layout: article
title: Instalando Node.js mediante un gestor de paquetes
---

# Instalando Node.js mediante un Gestor de Paquetes

> Los paquetes de esta página son mantenidos y respaldados por sus respectivos empaquetadores, **no** por el equipo central de Node.js. Informe cualquier problema que encuentre al responsable del paquete. Si resulta que su problema es un error en el propio Node.js, el responsable del mantenimiento informará el problema al equipo principal.

## Alpine Linux

Las versiones LTS de Node.js y los paquetes de npm están disponibles en el Repositorio Principal.

```bash
apk add nodejs npm
```

La versión actual de Node.js puede ser instalada desde el Repositorio de la Comunidad.

```bash
apk add nodejs-current
```

## Android

El soporte para Android todavía es experimental en Node.js, por lo que los desarrolladores de Node.js aún no proporcionan los binarios precompilados.

Sin embargo, hay algunas soluciones de terceros. Por ejemplo, la comunidad [Termux](https://termux.com/) que proporciona un emulador de terminal y un entorno Linux para Android, así como un administrador de paquetes propio y una [amplia colección](https://github.com/termux/termux-packages) de aplicaciones precompiladas. Este comando en la aplicación Termux instalará la última versión disponible de Node.js:

```bash
pkg install nodejs
```

Actualmente, los binarios de Node.js para Termux están enlazados contra `system-icu` (dependiente del paquete `libicu`).

## Arch Linux

Los paquetes para Node.js y npm están disponibles en el repositorio de la comunidad.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora y Red Hat Enterprise Linux

Node.js está disponible como módulo llamado `nodejs` en CentOS/RHEL 8 y Fedora.

```bash
dnf module install nodejs:<stream>
```

donde `<stream>` corresponde a la versión mayor de Node.js.
Para ver una lista de las versiones disponibles:

```bash
dnf module list nodejs
```

Por ejemplo, para instalar Node.js 18:

```bash
dnf module install nodejs:18/common
```

### Alternativas

Estos recursos proporcionan paquetes compatibles con CentOS, Fedora, y RHEL.

- [Node.js snaps](#snap) mantenido y soportado en https://github.com/nodejs/snap
- [Distribuciones de binarios de Node.js](#debian-and-ubuntu-based-linux-distributions) son mantenidas y soportadas por [NodeSource](https://github.com/nodesource/distributions)

## Distribuciones Linux basadas en Debian y Ubuntu

Las [distribuciones de binarios Node.js](https://github.com/nodesource/distributions) están disponibles desde NodeSource.

### Alternativas

Los paquetes compatibles con distribuciones Linux basadas en Debian y Ubuntu están disponibles a través de [Node.js snaps](#snap).

## Exherbo Linux

Los paquetes de Node.js y npm están disponibles en el [repositorio arbor](https://gitlab.exherbo.org/exherbo/arbor/-/tree/master/packages/dev-lang/node).

```bash
cave resolve -x node
```

## fnm

Un gestor de versiones de Node.js rápido y simple, construido en Rust, utilizado para gestionar múltiples versiones de Node.js lanzadas. Te permite realizar operaciones como instalar, desinstalar, cambiar versiones de Node automáticamente según el directorio actual, etc.
Para instalar fnm, utiliza este [script de instalación](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm tiene soporte multiplataforma (macOS, Windows, Linux) y todas las shells populares (Bash, Zsh, Fish, PowerShell, símbolo de la línea de comandos de Windows).
fnm está diseñado teniendo en cuenta la velocidad y la compatibilidad con archivos `.node-version` y `.nvmrc`.

## FreeBSD

La versión más reciente de Node.js está disponible a través del puerto [www/node](https://www.freshports.org/www/node).

Instala el paquete de binarios con [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

O compílalo por tu cuenta utilizando [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js está disponible en el árbol de portage.

```bash
emerge nodejs
```

## IBM i

Las versiones LTS de Node.js están disponibles en IBM y están disponibles a través de [el administrador de paquetes 'yum'](https://ibm.biz/ibmi-rpms). El nombre del paquete es `nodejs` seguido del número de versión principal (por ejemplo, `nodejs18`, `nodejs20`, etc.)

Para instalar Node.js 20.x desde la línea de comandos, ejecute lo siguiente como usuario con autoridad especial:

```bash
yum install nodejs20
```

Node.js también se puede instalar con el producto IBM i Access Client Solutions. Consulte [este documento de soporte](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) para obtener más detalles

## macOS

Descarga el [Instalador de macOS](/#home-downloadhead) directamente desde la web de [nodejs.org](https://nodejs.org/).

_Si quieres descargar el paquete con bash:_

```bash
curl "https://nodejs.org/dist/latest/$(curl -s https://nodejs.org/dist/latest/ | grep "pkg" | cut -d'"' -f 2)" -o "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternativas

Utiliza **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Utilizando **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Utilizando **[pkgsrc](https://pkgsrc.joyent.com/install-on-macos/)**:

Instala el paquete de binarios:

```bash
pkgin -y install nodejs
```

O construye manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` es un administrador de versiones de Node.js fácil de usar para Mac y Linux. Especifique la versión de destino para instalar utilizando una sintaxis enriquecida o selecciónela de un menú de versiones descargadas previamente. Las versiones se instalan en todo el sistema o en todo el usuario y, para un uso más específico, puede ejecutar una versión directamente desde las descargas en caché.

Visita la [página principal](https://github.com/tj/n) para ver los métodos de instalación (bootstrap, npm, Homebrew, third-party), y todos los detalles de uso.

Si ya tienes `npm`, entonces instala `n` y a continuación obtener la última versión LTS de `node` es tan simple como:

```
npm install -g n
n lts
```

## NetBSD

Node.js está disponible en el árbol de pkgsrc:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

O instala un paquete binario (si está disponible para tu plataforma) utilizando pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` es un administrador de versiones de node liviano, similar a `nvm`. Es simple y predecible. Un rico ecosistema de complementos le permite adaptarlo a sus necesidades. Utilice `nodenv` para elegir una versión de Node para su aplicación y garantizar que su entorno de desarrollo coincida con la producción.

Las instrucciones de instalación de Nodenv están mantenidas [en su página de Github](https://github.com/nodenv/nodenv#installation). Por favor, visita esta página para asegurarte de que sigues los pasos de instalación de la última versión.

## nvm

Node Version Manager es un script de bash que se utiliza para administrar múltiples versiones publicadas de Node.js. Eso permite realizar operaciones como instalar, desinstalar, cambiar de versión, etc.
Para instalar nvm, utilice este [script de instalación](https://github.com/nvm-sh/nvm#install--update-script).

En sistemas Unix / OS X, Node.js compilado desde el código fuente puede instalarse usando [nvm](https://github.com/creationix/nvm) instalándolo en la ubicación que nvm espera:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Después de esto, puedes usar `nvm` para cambiar entre versiones publicadas y versiones
compiladas desde la fuente.
Por ejemplo, si la versión de Node.js es v8.0.0-pre:

```bash
nvm use 8
```

Una vez que salga el lanzamiento oficial, querrás desinstalar la versión creada desde la fuente:

```bash
nvm uninstall 8
```

## nvs

#### Windows

El administrador de versiones `nvs` es multiplataforma y se puede usar en sistemas Windows, macOS y tipo Unix

Para instalar `nvs` en Windows, vaya a la [página de lanzamiento](https://github.com/jasongin/nvs/releases) aquí y descargue el archivo de instalación MSI de la última versión.

También puedes utilizar `chocolatey` para instalarlo:

```bash
choco install nvs
```

#### macOS,UnixLike

Puede encontrar la documentación sobre los pasos de instalación de `nvs` en sistemas tipo macOS/Unix [aquí](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Uso

Después de esto, puedes usar `nvs` para cambiar entre diferentes versiones de node.

Para añadir la última versión de node:

```bash
nvs add latest
```

O para añadir la última versión LTS de node:

```bash
nvs add lts
```

Después ejecuta el comando `nvs use` para añadir una versión de node a tu `PATH` en la shell actual:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Para añadirlo al `PATH` permanentemente, utiliza `nvs link`:

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

## openSUSE y SLE

Node.js está disponible en los repositorios principales en los siguientes paquetes:

- **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
- **openSUSE Tumbleweed**: `nodejs20`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (El módulo de Web y Scripting debe estar [habilitado](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
- **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (El módulo de Web y Scripting debe estar [habilitado](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Por ejemplo, para instalar Node.js 14.x en openSUSE Leap 15.2, ejecute lo siguiente como root:

```bash
zypper install nodejs14
```

Diferentes versiones mayores de Node pueden ser instaladas y utilizadas de forma concurrente.

## SmartOS e illumos

Las imágenes de SmartOS vienen con pkgsrc preinstalado. En otras distribuciones de illusmos, primero instale **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, luego podrá instalar el paquete binario normalmente:

```bash
pkgin -y install nodejs
```

O construye manualmente desde pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) están disponibles como [`node`](https://snapcraft.io/node) en la tienda Snap.

## Solus

Solus proporciona Node.js en su repositorio principal.

```bash
sudo eopkg install nodejs
```

## vfox

Un gestor de versiones multi-plataforma(Windows, macOS, Linux) y **extensible**.

Te permite tener **diferentes versiones para diferentes proyectos**, **diferentes versiones para diferentes shells**, y cambiar automáticamente las versiones de Node según el directorio actual, etc.

Soporta todas las shells populares (Bash, Zsh, Fish, PowerShell, Clink, Cmder).

Consulta el [inicio rápido](https://vfox.lhan.me/guides/quick-start.html) para usar vfox rápidamente y todos los detalles de uso.

## Void Linux

Void Linux incluye la versión estable de Node.js en el repositorio principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Descarga el [Instalador de Windows](/#home-downloadhead) directamente desde la web de [nodejs.org](https://nodejs.org/).

### Alternativas

Usando **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# or for LTS
winget install OpenJS.NodeJS.LTS
```

Después de ejecutar uno de los dos comandos anteriores, puede ser necesario reiniciar el emulador de terminal antes de que el comando CLI `node` esté disponible.

Usando **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Usando **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# or for LTS
scoop install nodejs-lts
```

## z/OS

IBM&reg; SDK para Node.js - z/OS&reg; Está disponible en dos formatos de instalación, SMP/E y PAX. Seleccione el formato de instalación que le corresponda:

- [Instalando y configurando la edición SMP/E de Node.js en z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
- [Instalando y configurando la edición PAX de Node.js en z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
