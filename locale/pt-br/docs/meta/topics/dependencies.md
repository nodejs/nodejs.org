---
title: Dependencies
layout: docs.hbs
---

# Dependencies

O Node.js precisa de diversas dependências para funcionar do jeito que funciona atualmente.

* [Dependências](#libraries)
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

## Dependências

### V8

A biblioteca do V8 provê um engine JavaScript para o Node.js, o qual é controlado pela API C++ do próprio V8. O V8 é atualmente mantido pelo Google, por conta de seu uso no navegador Chrome.

* [Documentation](https://v8.dev/docs)

### libuv

Uma outra dependência importante é a *libuv*. Uma biblioteca escrita em C que é utilizada para abstrair todas as operações que não bloqueiam o I/O para uma interface consistente por todas as plataformas suportadas. Ela provê mecanismos para lidar com o sistema de arquivos, DNS, rede, processos filhos, pipes, tratamento de sinais, polling e streaming. Ela também inclui uma pool de threads para distribuir o trabalho que não pode ser feito assíncronamente a nível de SO.

* [Documentation](http://docs.libuv.org/)

### llhttp

O parsing do protocolo HTTP é delegado a uma biblioteca leve, escrita em C, chamada *llhttp*. Ela foi desenhada para não fazer nenhuma syscall ou alocações, portanto acaba possuindo um baixo consumo de memória por requisição.

* [Documentation](https://github.com/nodejs/llhttp)

### c-ares

Para algumas requisições assíncronas de DNS, o Node.js utilizar uma biblioteca escrita em C chamada *c-ares*. Ela é exposta através do módulo de DNS no JavaScript na família `resolve()` de funções. A função `lookup()`, que é o que o resto do core do Node.js usa, faz uso de uma chamada `getaddrinfo(3)` que é processada em threads na libuv. A razão por trás disso é que o c-ares suporta caminhos como /etc/hosts, /etc/resolv.conf e /etc/svc.conf, mas não outras coisas como o mDNS.

* [Documentation](https://c-ares.haxx.se/docs.html)

### OpenSSL

O OpenSSL é extensivamente usado nos módulos `tls` e `crypto` do Node.js. Ele provê uma implementação altamente testada de várias funções criptográficas que a web moderna utiliza em grande escala a fim de manter a segurança.

* [Documentation](https://www.openssl.org/docs/)

### zlib

Para compressões e descompressões rápidas, o Node.js utiliza na biblioteca zlib, que é o padrão da indústria, também conhecida pelo seu uso nas bibliotecas gzip e libpng. O Node.js utiliza o zlib para criar interfaces de descompressão e compressão que podem ser síncronas, assíncronas ou através de streaming.

* [Documentation](https://www.zlib.net/manual.html)

## Tools

### npm

Uma das grandes vantagens do Node.js é sua modularidade, e com isso vem a necessidade de um gerenciador de pacotes de qualidade. O NPM foi justamente criado para isto. Com ele, temos a maior seleção de pacotes criados pela comunidade, maior do que em todos os outros ecossistemas existentes. Isto faz com que construir uma aplicação Node.js seja fácil e rápida.

* [Documentation](https://docs.npmjs.com/)

### gyp

Todo o sistema de build é gerenciado pelo gyp, um gerador de projetos baseado em python que foi copiado do V8. Ele pode gerar arquivos de projeto para uso em sistemas de build de diversas plataformas. O Node.js precisa disso porque grande parte do próprio Node – e também de suas dependências – são escritas em linguagens que requerem compilação, como C++.

* [Documentation](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

O código nativo pode ser testado usando gtest, que foi tirado do Chromium. Ele permite testes de C/C++ sem a necessidade de um executável node existente para dar o bootstrap inicial.

* [Documentation](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
