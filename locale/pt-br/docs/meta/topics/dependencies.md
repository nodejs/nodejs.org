---
title: Dependências
layout: docs.hbs
---

# Dependências

O Node.js precisa de diversas dependências para funcionar do jeito que funciona atualmente.

* [Dependências](#dependências)
  * [Bibliotecas](#bibliotecas)
    * [V8](#v8)
    * [libuv](#libuv)
    * [llhttp](#llhttp)
    * [c-ares](#c-ares)
    * [OpenSSL](#openssl)
    * [zlib](#zlib)
  * [Ferramentas](#ferramentas)
    * [npm](#npm)
    * [gyp](#gyp)
    * [gtest](#gtest)

## Bibliotecas

### V8

<!-- The V8 library provides Node.js with a JavaScript engine, which Node.js
controls via the V8 C++ API. V8 is maintained by Google, for use in Chrome.

* [Documentation](https://v8docs.nodesource.com/) -->

A biblioteca do V8 provê um engine JavaScript para o Node.js, o qual
é controlado pela API C++ do próprio V8. O V8 é atualmente mantido
pelo Google, por conta de seu uso no navegador Chrome.

* [Documentação](https://v8docs.nodesource.com/)

### libuv

<!-- Another important dependency is libuv, a C library that is used to abstract
non-blocking I/O operations to a consistent interface across all supported
platforms. It provides mechanisms to handle file system, DNS, network, child
processes, pipes, signal handling, polling and streaming. It also includes a
thread pool for offloading work for some things that can't be done
asynchronously at the operating system level.

* [Documentation](http://docs.libuv.org/) -->

Uma outra dependência importante é a *libuv*. Uma biblioteca escrita em C que
é utilizada para abstrair todas as operações que não bloqueiam o I/O para uma
interface consistente por todas as plataformas suportadas. Ela provê mecanismos
para lidar com o sistema de arquivos, DNS, rede, processos filhos, pipes,
tratamento de sinais, polling e streaming. Ela também inclui uma pool de threads
para distribuir o trabalho que não pode ser feito assíncronamente a nível de SO.

* [Documentação](http://docs.libuv.org/)

### llhttp

<!-- HTTP parsing is handled by a lightweight C library called llhttp. It is
designed to not make any syscalls or allocations, so it has a very small
per-request memory footprint.

* [Documentation](https://github.com/nodejs/llhttp) -->

O parsing do protocolo HTTP é delegado a uma biblioteca leve, escrita em C,
chamada *llhttp*. Ela foi desenhada para não fazer nenhuma syscall ou
alocações, portanto acaba possuindo um baixo consumo de memória por requisição.

* [Documentação](https://github.com/nodejs/llhttp)

### c-ares

<!-- For some asynchronous DNS requests, Node.js uses a C library called c-ares.
It is exposed through the DNS module in JavaScript as the `resolve()` family of
functions. The `lookup()` function, which is what the rest of core uses, makes
use of threaded `getaddrinfo(3)` calls in libuv. The reason for this is that
c-ares supports /etc/hosts, /etc/resolv.conf and /etc/svc.conf, but not things
like mDNS.

* [Documentation](http://c-ares.haxx.se/docs.html) -->
Para algumas requisições assíncronas de DNS, o Node.js utilizar uma biblioteca
escrita em C chamada *c-ares*. Ela é exposta através do módulo de DNS no JavaScript
na família `resolve()` de funções. A função `lookup()`, que é o que o resto do core
do Node.js usa, faz uso de uma chamada `getaddrinfo(3)` que é processada em threads
na libuv. A razão por trás disso é que o c-ares suporta caminhos como
/etc/hosts, /etc/resolv.conf e /etc/svc.conf, mas não outras coisas como o mDNS.

* [Documentação](http://c-ares.haxx.se/docs.html)

### OpenSSL

<!-- OpenSSL is used extensively in both the `tls` and `crypto` modules. It provides
battle-tested implementations of many cryptographic functions that the modern
web relies on for security.

* [Documentation](https://www.openssl.org/docs/) -->

O OpenSSL é extensivamente usado nos módulos `tls` e `crypto` do Node.js. Ele provê
uma implementação altamente testada de várias funções criptográficas que a web
moderna utiliza em grande escala a fim de manter a segurança.

* [Documentação](https://www.openssl.org/docs/)

### zlib

<!-- For fast compression and decompression, Node.js relies on the industry-standard
zlib library, also known for its use in gzip and libpng. Node.js uses zlib to
create sync, async and streaming compression and decompression interfaces.

* [Documentation](http://www.zlib.net/manual.html) -->

Para compressões e descompressões rápidas, o Node.js utiliza na biblioteca zlib,
que é o padrão da indústria, também conhecida pelo seu uso nas bibliotecas gzip e libpng.
O Node.js utiliza o zlib para criar interfaces de descompressão e compressão que podem
ser síncronas, assíncronas ou através de streaming.

* [Documentação](http://www.zlib.net/manual.html)

## Ferramentas

### npm

<!-- Node.js is all about modularity, and with that comes the need for a quality
package manager; for this purpose, npm was made. With npm comes the largest
selection of community-created packages of any programming ecosystem,
which makes building Node.js apps quick and easy.

* [Documentation](https://docs.npmjs.com/) -->

Uma das grandes vantagens do Node.js é sua modularidade, e com isso vem a
necessidade de um gerenciador de pacotes de qualidade. O NPM foi justamente
criado para isto. Com ele, temos a maior seleção de pacotes criados pela
comunidade, maior do que em todos os outros ecossistemas existentes. Isto
faz com que construir uma aplicação Node.js seja fácil e rápida.

* [Documentação](https://docs.npmjs.com/)

### gyp

<!-- The build system is handled by gyp, a python-based project generator copied
from V8. It can generate project files for use with build systems across many
platforms. Node.js requires a build system because large parts of it — and its
dependencies — are written in languages that require compilation.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md) -->

Todo o sistema de build é gerenciado pelo gyp, um gerador de projetos baseado
em python que foi copiado do V8. Ele pode gerar arquivos de projeto para uso
em sistemas de build de diversas plataformas. O Node.js precisa disso porque
grande parte do próprio Node – e também de suas dependências – são escritas em
linguagens que requerem compilação, como C++.

* [Documentação](https://gyp.gsrc.io/docs/UserDocumentação.md)

### gtest

<!--
Native code can be tested using gtest, which is taken from Chromium. It allows
testing C/C++ without needing an existing node executable to bootstrap from.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation) -->

O código nativo pode ser testado usando gtest, que foi tirado do Chromium. Ele
permite testes de C/C++ sem a necessidade de um executável node existente para
dar o bootstrap inicial.

* [Documentação](https://code.google.com/p/googletest/wiki/V1_7_Documentação)
