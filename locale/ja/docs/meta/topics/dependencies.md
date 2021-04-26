---
title: 依存関係
layout: docs.hbs
---

<!--
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

-->
# 依存関係

Node.js がそのように機能するために依存する依存関係がいくつかあります。

* [ライブラリ](#libraries)
  * [V8](#v8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [ツール](#tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)

<!--
## Libraries

### V8

The V8 library provides Node.js with a JavaScript engine, which Node.js
controls via the V8 C++ API. V8 is maintained by Google, for use in Chrome.

* [Documentation](https://v8.dev/docs/)

-->
## ライブラリ

### V8

V8 ライブラリは、Node.js に JavaScript エンジンを提供します。これは、Node.js が V8 C++ API を介して制御するものです。
V8 は Chrome で使用するために Google によってメンテナンスされています。

* [ドキュメント](https://v8.dev/docs/)

<!--
### libuv

Another important dependency is libuv, a C library that is used to abstract
non-blocking I/O operations to a consistent interface across all supported
platforms. It provides mechanisms to handle file system, DNS, network, child
processes, pipes, signal handling, polling and streaming. It also includes a
thread pool for offloading work for some things that can't be done
asynchronously at the operating system level.

* [Documentation](http://docs.libuv.org/)

-->
### libuv

もう1つの重要な依存関係は libuv です。
これは、サポートされているすべてのプラットフォームで、ノンブロッキング I/O 操作を一貫したインターフェースに抽象化するために使用される C ライブラリです。
ファイルシステム、DNS、ネットワーク、子プロセス、パイプ、シグナル処理、ポーリング、ストリーミングを処理するメカニズムを提供します。
また、オペレーティングシステムレベルで非同期的に実行することができないいくつかの作業のための
作業をオフロードするためのスレッドプールも含まれています。

* [ドキュメント](http://docs.libuv.org/)

<!--
### llhttp

HTTP parsing is handled by a lightweight C library called llhttp. It is
designed to not make any syscalls or allocations, so it has a very small
per-request memory footprint.

* [Documentation](https://github.com/nodejs/llhttp)

-->
### llhttp

HTTP 解析は、llhttp という軽量の C ライブラリによって処理されます。
システムコールや割り当てを行わないように設計されているため、
リクエストごとのメモリ使用量は非常に小さくなっています。

* [ドキュメント](https://github.com/nodejs/llhttp)

<!--
### c-ares

For some asynchronous DNS requests, Node.js uses a C library called c-ares.
It is exposed through the DNS module in JavaScript as the `resolve()` family of
functions. The `lookup()` function, which is what the rest of core uses, makes
use of threaded `getaddrinfo(3)` calls in libuv. The reason for this is that
c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, but not things
like mDNS.

* [Documentation](https://c-ares.haxx.se/docs.html)

-->
### c-ares

一部の非同期 DNS 要求では、Node.js は c-ares というCライブラリを使用します。
JavaScript の DNS モジュールを通して `resolve()` 関数ファミリとして公開されています。
`lookup()` 関数は、残りのコアが使用しているもので、
libuv でスレッド付きの`getaddrinfo(3)` 呼び出しを利用します。
これは、c-ares が /etc/hosts、/etc/resolv.conf、および /etc/svc.conf をサポートしているが、
mDNS のようなものはサポートしていないためです。

* [ドキュメント](https://c-ares.haxx.se/docs.html)

<!--
### OpenSSL

OpenSSL is used extensively in both the `tls` and `crypto` modules. It provides
battle-tested implementations of many cryptographic functions that the modern
web relies on for security.

* [Documentation](https://www.openssl.org/docs/)

-->
### OpenSSL

OpenSSL は、`tls` モジュールと`crypto` モジュールの両方で広く使用されています。
それは現代の Web がセキュリティのために頼っている
多くの暗号機能の戦いでテストされた実装を提供します。

* [ドキュメント](https://www.openssl.org/docs/)

<!--
### zlib

For fast compression and decompression, Node.js relies on the industry-standard
zlib library, also known for its use in gzip and libpng. Node.js uses zlib to
create sync, async and streaming compression and decompression interfaces.

* [Documentation](https://www.zlib.net/manual.html)

-->
### zlib

高速な圧縮と解凍のために、Node.js は gzip と libpng での使用でも知られている
業界標準の zlib ライブラリに依存しています。
Node.js は zlib を使って同期、非同期、ストリーミングの圧縮と解凍のインターフェースを作成します。

* [ドキュメント](https://www.zlib.net/manual.html)

<!--
## Tools

### npm

Node.js is all about modularity, and with that comes the need for a quality
package manager; for this purpose, npm was made. With npm comes the largest
selection of community-created packages of any programming ecosystem,
which makes building Node.js apps quick and easy.

* [Documentation](https://docs.npmjs.com/)

-->
## ツール

### npm

Node.js はすべてモジュールであり、それに伴い高品質のパッケージマネージャが必要になります。
この目的のために、npm が作られました。
npm を使えば、あらゆるプログラミングエコシステムのコミュニティで作成されたパッケージの中で最大のものが選択でき、
Node.js アプリケーションを素早く簡単に構築することができます。

* [ドキュメント](https://docs.npmjs.com/)

<!--
### gyp

The build system is handled by gyp, a python-based project generator copied
from V8. It can generate project files for use with build systems across many
platforms. Node.js requires a build system because large parts of it — and its
dependencies — are written in languages that require compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)

-->
### gyp

ビルドシステムは、V8 からコピーされた python ベースのプロジェクトジェネレータである gyp によって処理されます。
それは多くのプラットフォームにわたるビルドシステムで使用するためのプロジェクトファイルを生成することができます。
Node.js の大部分 (およびその依存関係) はコンパイルが必要な言語で書かれているため、
Node.js にはビルドシステムが必要です。

* [ドキュメント](https://gyp.gsrc.io/docs/UserDocumentation.md)

<!--
### gtest

Native code can be tested using gtest, which is taken from Chromium. It allows
testing C/C++ without needing an existing node executable to bootstrap from.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)

-->
### gtest

ネイティブコードは、Chromium から入手した gtest を使用してテストできます。
既存のノード実行可能ファイルをブートストラップする必要なしに C/C++ をテストすることができます。

* [ドキュメント](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
