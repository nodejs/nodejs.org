---
title: Dependencies
layout: docs.hbs
---

# Dependencies

There are several dependencies that Node.js relies on to work the way it does.

* [Libraries](#libraries)
  * [V8](#v8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [Tools](#tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)

## Libraries

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

For fast compression and decompression, Node.js relies on the industry-standard zlib library, also known for its use in gzip and libpng. Node.js uses zlib to create sync, async and streaming compression and decompression interfaces.

* [Documentation](https://www.zlib.net/manual.html)

## Tools

### npm

Node.js is all about modularity, and with that comes the need for a quality package manager; for this purpose, npm was made. With npm comes the largest selection of community-created packages of any programming ecosystem, which makes building Node.js apps quick and easy.

* [Documentation](https://docs.npmjs.com/)

### gyp

The build system is handled by gyp, a python-based project generator copied from V8. It can generate project files for use with build systems across many platforms. Node.js requires a build system because large parts of it — and its dependencies — are written in languages that require compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

Native code can be tested using gtest, which is taken from Chromium. It allows testing C/C++ without needing an existing node executable to bootstrap from.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
