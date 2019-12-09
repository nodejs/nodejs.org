---
title: 所有依赖项
layout: docs.hbs
---

# 所有依赖项

Node.js 依赖于以下一些依赖项，这样它才能正常工作。

* [类库](#libraries)
  * [V8](#v8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [工具](#tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)

## <!--libraries-->类库

### V8

V8 类库为 Node.js 提供了 JavaScript 引擎，Node.js 通过 V8 C++ 的 API 函数接口进行操控， V8 由谷歌公司维护，用于谷歌浏览器中。

* [相关文档](https://v8docs.nodesource.com/)

### libuv

另外一个重要的依赖项是 libuv，它是一个 C 写成的类库，用于非阻塞型的 I/O 操作，同时在所有支持的操作系统上保持一致的接口。它提供了一些机制来处理诸如文件系统、DNS、网络、子进程、管道、信号量控制、轮询机制和数据流。它同样也提供了一个线程池，用于无法在操作系统层面进行异步操作的任务卸载。

* [相关文档](http://docs.libuv.org/)

### llhttp

HTTP 解析是通过一个由 C 语言编写、轻量级称作 llhttp 的类库进行的。由于它的设计不会引发系统调用和系统资源分配，因而它的预请求内存痕迹极小。

* [相关文档](https://github.com/nodejs/llhttp)

### c-ares

对于某些异步的 DNS 请求，Node.js 使用由 C 编写，称作 c-areas 的类库。它是通过 JavaScript 的 DNS 模块，以 `resolve()` 家族函数的形式发布。`lookup()` 函数，核心剩余部分使用它，借助在 libuv 中 `getaddrinfo(3)` 跨越函数的调用。那是因为 c-areas 支持 /etc/hosts，/etc/resolv.conf 以及 /etc/svc.conf。但不是像 mDNS 一样的东西。

* [相关文档](https://c-ares.haxx.se/docs.html)

### OpenSSL

OpenSSL 广泛地在 `tls` 和 `crypto` 模块中使用。它提供了战争环境下，许多现代网络为安全而依赖的密码函数。

* [相关文档](https://www.openssl.org/docs/)

### zlib

为了快速压缩解压，Node.js 依赖于工业标准的 zlib 类库。同名可知的还有 gzip 和 libpng。Node.js 使用 zlib 创建同步、异步和数据流压缩、解压缩接口。

* [相关文档](https://www.zlib.net/manual.html)

## <!--tools-->工具

### npm

Node.js 完全是基于模块化构建的，因此需要一个高质量的包管理器；有鉴于此 npm 产生了。随着 npm 的产生史上最大的社区创建的编程生态圈诞生，它们使得构建 Node.js 快而容易。

* [相关文档](https://docs.npmjs.com/)

### gyp

构建系统通过 gyp 来处理。这是一个从 V8 拷贝而来、基于 python 的项目生成工具。它可以生成项目文件用以跨不同平台中使用。Node.js 需要一个构建系统，因为它自身的大部分，以及它的依赖项，是用需要编译的语言写成的。

* [相关文档](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

本地代码可以通过 gtest 进行测试，它是从 Chromium 收录的。它不需要一个真实可启动的节点环境下，直接测试 C/C++ 程序。

* [相关文档](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
