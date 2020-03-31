---
title: Dependencies
layout: docs.hbs
---

# Dependencies

There are several dependencies that Node.js relies on to work the way it does.

* [ライブラリ](#libraries)
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

## ライブラリ

### V8

Node.js がそのように機能するために依存する依存関係がいくつかあります。

* [Documentation](https://v8.dev/docs)

### libuv

Another important dependency is libuv, a C library that is used to abstract non-blocking I/O operations to a consistent interface across all supported platforms. It provides mechanisms to handle file system, DNS, network, child processes, pipes, signal handling, polling and streaming. It also includes a thread pool for offloading work for some things that can't be done asynchronously at the operating system level.

* [Documentation](http://docs.libuv.org/)

### llhttp

V8 ライブラリは、Node.js に JavaScript エンジンを提供します。これは、Node.js が V8 C++ API を介して制御するものです。 V8 は Chrome で使用するために Google によってメンテナンスされています。

* [Documentation](https://github.com/nodejs/llhttp)

### c-ares

For some asynchronous DNS requests, Node.js uses a C library called c-ares. It is exposed through the DNS module in JavaScript as the `resolve()` family of functions. The `lookup()` function, which is what the rest of core uses, makes use of threaded `getaddrinfo(3)` calls in libuv. The reason for this is that c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, but not things like mDNS.

* [Documentation](https://c-ares.haxx.se/docs.html)

### OpenSSL

もう1つの重要な依存関係は libuv です。 これは、サポートされているすべてのプラットフォームで、ノンブロッキング I/O 操作を一貫したインターフェースに抽象化するために使用される C ライブラリです。 ファイルシステム、DNS、ネットワーク、子プロセス、パイプ、シグナル処理、ポーリング、ストリーミングを処理するメカニズムを提供します。 また、オペレーティングシステムレベルで非同期的に実行することができないいくつかの作業のための 作業をオフロードするためのスレッドプールも含まれています。

* [Documentation](https://www.openssl.org/docs/)

### zlib

For fast compression and decompression, Node.js relies on the industry-standard zlib library, also known for its use in gzip and libpng. Node.js uses zlib to create sync, async and streaming compression and decompression interfaces.

* [Documentation](https://www.zlib.net/manual.html)

## Tools

### npm

HTTP 解析は、llhttp という軽量の C ライブラリによって処理されます。 システムコールや割り当てを行わないように設計されているため、 リクエストごとのメモリ使用量は非常に小さくなっています。

* [Documentation](https://docs.npmjs.com/)

### gyp

The build system is handled by gyp, a python-based project generator copied from V8. It can generate project files for use with build systems across many platforms. Node.js requires a build system because large parts of it — and its dependencies — are written in languages that require compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

一部の非同期 DNS 要求では、Node.js は c-ares というCライブラリを使用します。 JavaScript の DNS モジュールを通して `resolve()` 関数ファミリとして公開されています。 `lookup()` 関数は、残りのコアが使用しているもので、 libuv でスレッド付きの`getaddrinfo(3)` 呼び出しを利用します。 これは、c-ares が /etc/hosts、/etc/resolv.conf、および /etc/svc.conf をサポートしているが、 mDNS のようなものはサポートしていないためです。

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
