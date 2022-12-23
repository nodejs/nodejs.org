---
title: 의존성
layout: docs.hbs
---

<!--
# Dependencies

There are several dependencies that Node.js relies on to work the way it does.

* [Libraries](#Libraries)
  * [V8](#V8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#OpenSSL)
  * [zlib](#zlib)
* [Tools](#Tools)
  * [npm](#npm)
  * [gyp](#gyp)
  * [gtest](#gtest)
-->

# 의존성

Node.js가 의존하고 있는 여러 의존성

* [라이브러리](#libraries)
  * [V8](#v8)
  * [libuv](#libuv)
  * [llhttp](#llhttp)
  * [c-ares](#c-ares)
  * [OpenSSL](#openssl)
  * [zlib](#zlib)
* [도구](#tools)
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

## <!--libraries-->라이브러리

### V8

V8 라이브러리는 Node.js가 V8 C++ API로 제어하는 JavaScript 엔진을 제공합니다.
V8은 구글이 관리하고 크롬에서 사용 중인 엔진입니다.

* [문서](https://v8.dev/docs/)

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

또 하나의 중요한 의존성은 libuv입니다. libuv는 C 라이브러리로 논블로킹 I/O 작업을 지원하는
모든 플랫폼에서 일관된 인터페이스로 추상화하는 데 사용됩니다. libuv는 파일 시스템, DNS, 네트워크,
자식 프로세스, 파이프, 신호 처리, 폴링, 스트리밍을 다루는 메커니즘을 제공하고 운영체제 수준에서
비동기로 처리될 수 없는 작업을 위한 스레드 풀도 포함하고 있습니다.

* [문서](http://docs.libuv.org/)

<!--
### llhttp

HTTP parsing is handled by a lightweight C library called llhttp. It is
designed to not make any syscalls or allocations, so it has a very small
per-request memory footprint.

* [Documentation](https://github.com/nodejs/llhttp)
-->

### llhttp

HTTP 파싱은 llhttp라는 경량 C 라이브러리가 처리합니다. 이는 시스템 호출이나 할당을 하려고
만들어진 것이 아니므로 요청당 아주 작은 메모리 공간만 차지합니다.

* [문서](https://github.com/nodejs/llhttp)

<!--
### c-ares

For some asynchronous DNS requests, Node.js uses a C library called c-ares.
It is exposed through the DNS module in JavaScript as the resolve() family of
functions. The lookup() function, which is what the rest of core uses, makes
use of threaded getaddrinfo(3) calls in libuv. The reason for this is that
c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, but not things
like mDNS.

* [Documentation](https://c-ares.haxx.se/docs.html)
-->

### c-ares

일부 비동기 DNS 요청을 위해서 Node.js는 c-ares라는 C 라이브러리를 사용합니다. c-ares는
JavaScript DNS 모듈로 `resolve()` 류의 함수들을 노출합니다. 코어의 다른 부분에서 사용하는
`lookup()` 함수는 libuv에서 스레드로 관리되는 `getaddrinfo(3)` 호출을 사용합니다. 이렇게 사용하는
이유는 c-ares가 /etc/hosts, /etc/resolv.conf, /etc/svc.conf는 지원하지만
mDNS 같은 것은 지원하지 않기 때문입니다.

* [문서](https://c-ares.haxx.se/docs.html)

<!--
### OpenSSL

OpenSSL is used extensively in both the `tls` and `crypto` modules. It provides
battle-tested implementations of many cryptographic functions that the modern
web relies on for security.

* [Documentation](https://www.openssl.org/docs/)
-->

### OpenSSL

OpenSSL은 `tls`와 `crypto` 모듈에서 광범위하게 사용되고 있습니다. OpenSSL은 현대 웹이
보안에서 사용하는 수많은 암호화 함수에 대한 검증된 구현체를 제공합니다.

* [문서](https://www.openssl.org/docs/)

<!--
### zlib

For fast compression and decompression, Node.js relies on the industry-standard
zlib library, also known for its use in gzip and libpng. Node.js uses zlib to
create sync, async and streaming compression and decompression interfaces.

* [Documentation](https://www.zlib.net/manual.html)
-->

### zlib

빠른 압축과 압축 해제를 하기 위해 Node.js는 산업 표준인 zlib 라이브러리를 사용하고 zlib은
gzip과 libpng를 사용한다고 알려져 있습니다. Node.js는 동기, 비동기, 스트리밍 압축과
압축 해제 인터페이스에 zlib을 사용합니다.

* [문서](https://www.zlib.net/manual.html)

<!--
## Tools

### npm

Node.js is all about modularity, and with that comes the need for a quality
package manager; for this purpose, npm was made. With npm comes the largest
selection of community-created packages of any programming ecosystem,
which makes building Node.js apps quick and easy.

* [Documentation](https://docs.npmjs.com/)
-->

## <!--tools-->도구

### npm

Node.js는 모든 것이 모듈화되어 있으므로 질 좋은 패키지 매니저가 필요해졌습니다. 이 목적 때문에
npm이 만들어졌습니다. npm이 모든 프로그래밍 생태계에서 커뮤니티가 만든 커다란 패키지 선택권을
제공해 주므로 Node.js를 빠르고 쉽게 만들 수 있습니다.

* [문서](https://docs.npmjs.com/)

<!--
### gyp

The build system is handled by gyp, a python-based project generator copied
from V8. It can generate project files for use with build systems across many
platforms. Node.js requires a build system because large parts of it — and its
dependencies — are written in languages that require compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)
-->

### gyp

V8에서 파생된 Python 기반의 프로젝트 제너레이터인 gyp가 빌드 시스템을 다룹니다. gyp는 다수의
플랫폼에서 빌드 시스템을 사용하기 위한 프로젝트 파일을 생성할 수 있습니다. Node.js는 컴파일이
필요한 언어로 작성된 부분이 많이 있으므로(혹은 의존성 라이브러리에서) 빌드 시스템이 필요합니다.

* [문서](https://gyp.gsrc.io/docs/UserDocumentation.md)

<!--
### gtest

Native code can be tested using gtest, which is taken from Chromium. It allows
testing C/C++ without needing an existing node executable to bootstrap from.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
-->

### gtest

네이티브 코드는 Chromium의 gtest로 테스트할 수 있습니다. gtest로 C/C++를 시작하는
기존의 node 실행 파일 없이 C/C++를 테스트할 수 있습니다.

* [문서](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
