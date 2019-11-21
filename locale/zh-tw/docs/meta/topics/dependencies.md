---
title: 依賴項目
layout: docs.hbs
---

# 依賴項目

這裡列出了多個 Node.js 所仰賴的依賴項目，以讓 Node.js 能如預期般運作。

* [函式庫](#libraries)
  * [V8](#v8)
  * [libuv](#libuv)
  * [http-parser](#http-parser)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [工具](#tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)

<!--
  FOR TRANSLATORS: [11.21.19]
    如原標題連結是 [XXX](#XXX) 而要翻譯標題時，
    請將標題改成 <a id='XXX'>XXX 的翻譯</a> 形式，
    否則錨點會跑掉。

    例如：有個標題叫「## Libraries」並有個連結至此標題的連結：
          [Libraries](#libraries)

          要將「Libraries」翻譯成「函式庫」，
          則請將標題改成以下形式：

          ## <a id='libraries'>函式庫</a>

          而連結翻成這樣：[函式庫](#libraries)
                                   ~~~~~~~~~~
                                   後方連結_不需_變更
-->

## <a id='libraries'>函式庫</a>

### V8

V8 函式庫為 Node.js 提供了 JavaScript 引擎（Node.js 使用 V8 C++ API 控制）。
V8 是 Google 維護用來在 Chrome 使用的。

* [文件](https://v8docs.nodesource.com/)

### libuv

Another important dependency is libuv, a C library that is used to abstract
non-blocking I/O operations to a consistent interface across all supported
platforms. It provides mechanisms to handle file system, DNS, network, child
processes, pipes, signal handling, polling and streaming. It also includes a
thread pool for offloading work for some things that can't be done
asynchronously at the operating system level.

* [文件](http://docs.libuv.org/)

### llhttp

HTTP parsing is handled by a lightweight TypeScript and C library called llhttp.
It is designed to not make any syscalls or allocations, so it has a very small
per-request memory footprint.

* [文件](https://github.com/joyent/http-parser/)

### c-ares

For some asynchronous DNS requests, Node.js uses a C library called c-ares.
It is exposed through the DNS module in JavaScript as the `resolve()` family of
functions. The `lookup()` function, which is what the rest of core uses, makes
use of threaded `getaddrinfo(3)` calls in libuv. The reason for this is that
c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, but not things
like mDNS.

* [文件](https://c-ares.haxx.se/docs.html)

### OpenSSL

OpenSSL is used extensively in both the `tls` and `crypto` modules. It provides
battle-tested implementations of many cryptographic functions that the modern
web relies on for security.

* [文件](https://www.openssl.org/docs/)

### zlib

For fast compression and decompression, Node.js relies on the industry-standard
zlib library, also known for its use in gzip and libpng. Node.js uses zlib to
create sync, async and streaming compression and decompression interfaces.

* [文件](https://www.zlib.net/manual.html)

## <a id='tools'>工具</a>

### npm

Node.js is all about modularity, and with that comes the need for a quality
package manager; for this purpose, npm was made. With npm comes the largest
selection of community-created packages of any programming ecosystem,
which makes building Node.js apps quick and easy.

* [文件](https://docs.npmjs.com/)

### gyp

The build system is handled by gyp, a python-based project generator copied
from V8. It can generate project files for use with build systems across many
platforms. Node.js requires a build system because large parts of it — and its
dependencies — are written in languages that require compilation.

* [文件](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

Native code can be tested using gtest, which is taken from Chromium. It allows
testing C/C++ without needing an existing node executable to bootstrap from.

* [文件](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
