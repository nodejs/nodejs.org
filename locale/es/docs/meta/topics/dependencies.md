---
title: Dependencias
layout: docs.hbs
---

# Dependencias

Hay varias dependencias en las que se basa Node.js para funcionar como lo hace.

* [Dependencias](#dependencias)
  * [Librerías](#librerías)
    * [V8](#v8)
    * [libuv](#libuv)
    * [llhttp](#llhttp)
    * [c-ares](#c-ares)
    * [OpenSSL](#openssl)
    * [zlib](#zlib)
  * [Herramientas](#herramientas)
    * [npm](#npm)
    * [gyp](#gyp)
    * [gtest](#gtest)

## Librerías

### V8

La librería V8 proporciona a Node.js un motor de JavaScript, que Node.js controla a través de la API V8 C++. V8 es mantenido por Google para su uso en Chrome.

* [Documentación](https://v8.dev/docs)

### libuv

Otra dependencia importante es libuv, una librería en C que se utiliza para abstraer operaciones I/O sin bloqueo en una interfaz coherente en todas las plataformas compatibles. Proporciona mecanismos para manejar sistema de archivos, DNS, red, child processes, pipes, signal handling, polling y streaming. También incluye un thread pool para descargar el trabajo de algunas cosas que no se pueden hacer de forma asíncrona a nivel del sistema operativo.

* [Documentación](http://docs.libuv.org/)

### llhttp

El análisis sintáctico de HTTP es manejado por una biblioteca ligera de TypeScript y C llamada llhttp. Está diseñada para no hacer ninguna llamada al sistema (syscalls) o asignación (allocations), por lo que tiene una cuota de memoria por solicitud muy pequeña.

* [Documentación](https://github.com/nodejs/llhttp)

### c-ares

Para algunas peticiones DNS asíncronas, Node.js utiliza una librería en C llamada c-ares. Se expone a través del módulo DNS en JavaScript como la familia de funciones `resolve()`. La función `lookup()`, que es la que utiliza el resto del núcleo, hace uso de las llamadas `getaddrinfo(3)` en libuv. La razón de esto es que c-ares soporta /etc/hosts, /etc/resolv.conf y /etc/svc.conf pero no cosas como mDNS.

* [Documentación](https://c-ares.haxx.se/docs.html)

### OpenSSL

OpenSSL se utiliza ampliamente en los módulos `tls` y `crypto`. Proporciona implementaciones ampliamente probadas de muchas funciones criptográficas en las que la web moderna confía para su seguridad.

* [Documentación](https://www.openssl.org/docs/)

### zlib

Para una rápida compresión y descompresión, Node.js se basa en la librería zlib, un estándar de la industria conocida también por su uso en gzip y libpng. Node.js utiliza zlib para crear interfaces de compresión y descompresión síncronas, asíncronas y de streaming.

* [Documentación](https://www.zlib.net/manual.html)

## Herramientas

### npm

Node.js se basa en la modularidad, y con ello viene la necesidad de un gestor de paquetes de calidad; para este propósito, se creó npm. Con npm viene la mayor selección de paquetes creados por la comunidad de cualquier ecosistema de programación, lo que hace que la construcción de aplicaciones Node.js sea rápida y fácil.

* [Documentación](https://docs.npmjs.com/)

### gyp

El sistema de construcción (build system) es manejado por gyp, un generador de proyectos basado en python copiado de V8. Puede generar archivos de proyecto para utilizarlos con sistemas de compilación en muchas plataformas. Node.js requiere un sistema de compilación porque gran parte de él — y sus dependencias — están escritas en lenguajes que requieren compilación.

* [Documentación](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

El código nativo puede ser probado usando gtest, que está tomado de Chromium. Permite probar C/C++ sin necesidad de un ejecutable de node existente desde el que arrancar.

* [Documentación](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
