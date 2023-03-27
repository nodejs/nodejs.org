---
title: Dépendances
layout: docs.hbs
---

# Dépendances

Il existe plusieurs dépendances sur lesquelles Node.js s'appuie pour fonctionner comme il le fait.

* [Bibliothèques](#libraries)
  * [V8](#v8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [Outils](#tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)

## Bibliothèques

### V8

The V8 library provides Node.js with a JavaScript engine, which Node.js controls via the V8 C++ API. V8 is maintained by Google, for use in Chrome.

* [Documentation](https://v8.dev/docs)

### libuv

Another important dependency is libuv, a C library that is used to abstract non-blocking I/O operations to a consistent interface across all supported platforms. It provides mechanisms to handle file system, DNS, network, child processes, pipes, signal handling, polling and streaming. It also includes a thread pool for offloading work for some things that can't be done asynchronously at the operating system level.

* [Documentation](http://docs.libuv.org/)

### llhttp

HTTP parsing is handled by a lightweight TypeScript and C library called llhttp. It is designed to not make any syscalls or allocations, so it has a very small per-request memory footprint.

* [Documentation](https://github.com/nodejs/llhttp)

### c-ares

For some asynchronous DNS requests, Node.js uses a C library called c-ares. It is exposed through the DNS module in JavaScript as the `resolve()` family of functions. The `lookup()` function, which is what the rest of core uses, makes use of threaded `getaddrinfo(3)` calls in libuv. The reason for this is that c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, but not things like mDNS.

* [Documentation](https://c-ares.haxx.se/docs.html)

### OpenSSL

OpenSSL is used extensively in both the `tls` and `crypto` modules. It provides battle-tested implementations of many cryptographic functions that the modern web relies on for security.

* [Documentation](https://www.openssl.org/docs/)

### zlib

Pour une compression et une décompression rapides, Node.js s'appuie sur la bibliothèque standard zlib, également connue pour son utilisation dans gzip et libpng. Node.js utilise zlib pour créer des interfaces de compression et de décompression sync, async et streaming.

* [Documentation](https://www.zlib.net/manual.html)

## Outils

### npm

Node.js est tout en modularité, et avec cela vient le besoin d'un gestionnaire de paquets de qualité. de qualité ; c'est dans ce but que npm a été créé. Avec npm vient la plus grande sélection de paquets créés par la communauté de tout écosystème de programmation, ce qui rend la construction d'applications Node.js rapide et facile.

* [Documentation](https://docs.npmjs.com/)

### gyp

Le système de construction est géré par gyp, un générateur de projet basé sur python copié de V8. Il peut générer des fichiers de projet à utiliser avec des systèmes de compilation sur de nombreuses plateformes. Node.js nécessite un système de compilation parce que de grandes parties de celui-ci - et ses dépendances - sont écrites dans des langages qui nécessitent une compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

Le code natif peut être testé à l'aide de gtest, qui est tiré de Chromium. Il permet de tester C/C++ sans avoir besoin d'un exécutable de noeud existant à partir duquel démarrer.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
