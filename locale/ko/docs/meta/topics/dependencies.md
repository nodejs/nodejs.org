---
title: Dependencies
layout: docs.hbs
---

# Dependencies

There are several dependencies that Node.js relies on to work the way it does.

* [라이브러리](#libraries)
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

## 라이브러리

### V8

Node.js가 의존하고 있는 여러 의존성

* [Documentation](https://v8.dev/docs)

### libuv

Another important dependency is libuv, a C library that is used to abstract non-blocking I/O operations to a consistent interface across all supported platforms. It provides mechanisms to handle file system, DNS, network, child processes, pipes, signal handling, polling and streaming. It also includes a thread pool for offloading work for some things that can't be done asynchronously at the operating system level.

* [Documentation](http://docs.libuv.org/)

### llhttp

V8 라이브러리는 Node.js가 V8 C++ API로 제어하는 JavaScript 엔진을 제공합니다. V8은 구글이 관리하고 크롬에서 사용 중인 엔진입니다.

* [Documentation](https://github.com/nodejs/llhttp)

### c-ares

For some asynchronous DNS requests, Node.js uses a C library called c-ares. It is exposed through the DNS module in JavaScript as the `resolve()` family of functions. The `lookup()` function, which is what the rest of core uses, makes use of threaded `getaddrinfo(3)` calls in libuv. The reason for this is that c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, but not things like mDNS.

* [Documentation](https://c-ares.haxx.se/docs.html)

### OpenSSL

또 하나의 중요한 의존성은 libuv입니다. libuv는 C 라이브러리로 논블로킹 I/O 작업을 지원하는 모든 플랫폼에서 일관된 인터페이스로 추상화하는 데 사용됩니다. libuv는 파일 시스템, DNS, 네트워크, 자식 프로세스, 파이프, 신호 처리, 폴링, 스트리밍을 다루는 메커니즘을 제공하고 운영체제 수준에서 비동기로 처리될 수 없는 작업을 위한 스레드 풀도 포함하고 있습니다.

* [Documentation](https://www.openssl.org/docs/)

### zlib

For fast compression and decompression, Node.js relies on the industry-standard zlib library, also known for its use in gzip and libpng. Node.js uses zlib to create sync, async and streaming compression and decompression interfaces.

* [Documentation](https://www.zlib.net/manual.html)

## Tools

### npm

HTTP 파싱은 llhttp라는 경량 C 라이브러리가 처리합니다. 이는 시스템 호출이나 할당을 하려고 만들어진 것이 아니므로 요청당 아주 작은 메모리 공간만 차지합니다.

* [Documentation](https://docs.npmjs.com/)

### gyp

The build system is handled by gyp, a python-based project generator copied from V8. It can generate project files for use with build systems across many platforms. Node.js requires a build system because large parts of it — and its dependencies — are written in languages that require compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

일부 비동기 DNS 요청을 위해서 Node.js는 c-ares라는 C 라이브러리를 사용합니다. c-ares는 JavaScript DNS 모듈로 `resolve()` 류의 함수들을 노출합니다. 코어의 다른 부분에서 사용하는 `lookup()` 함수는 libuv에서 스레드로 관리되는 `getaddrinfo(3)` 호출을 사용합니다. 이렇게 사용하는 이유는 c-ares가 /etc/hosts, /etc/resolv.conf, /etc/svc.conf는 지원하지만 mDNS 같은 것은 지원하지 않기 때문입니다.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
