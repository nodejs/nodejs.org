---
title: 依存関係
layout: docs.hbs
---

<!--
# Dependencies

There are several dependencies that Node.js relies on to work the way it does.

- [Libraries](#libraries)
  - [V8](#v8)
  - [libuv](#libuv)
  - [http-parser](#http-parser)
  - [c-ares](#c-ares)
  - [OpenSSL](#openssl)
  - [zlib](#zlib)
- [Tools](#tools)
  - [npm](#npm)
  - [gyp](#gyp)
  - [gtest](#gtest)

 -->
# 依存関係

Node.js がそのように機能するために依存する依存関係がいくつかあります。

- [ライブラリ](#libraries)
  - [V8](#v8)
  - [libuv](#libuv)
  - [http-parser](#http-parser)
  - [c-ares](#c-ares)
  - [OpenSSL](#openssl)
  - [zlib](#zlib)
- [ツール](#tools)
  - [npm](#npm)
  - [gyp](#gyp)
  - [gtest](#gtest)

## ライブラリ

### V8

V8 ライブラリは、Node.js に JavaScript エンジンを提供します。これは、Node.js が V8 C++ API を介して制御するものです。
V8 は Chrome で使用するために Google によってメンテナンスされています。

- [ドキュメント](https://v8docs.nodesource.com/)

### libuv

もう1つの重要な依存関係は libuv です。
これは、サポートされているすべてのプラットフォームで、ノンブロッキング I/O 操作を一貫したインターフェースに抽象化するために使用される C ライブラリです。
ファイルシステム、DNS、ネットワーク、子プロセス、パイプ、シグナル処理、ポーリング、ストリーミングを処理するメカニズムを提供します。
また、オペレーティングシステムレベルで非同期的に実行することができないいくつかの作業のための
作業をオフロードするためのスレッドプールも含まれています。

- [ドキュメント](http://docs.libuv.org/)

### http-parser

HTTP 解析は、http-parser という軽量の C ライブラリによって処理されます。
システムコールや割り当てを行わないように設計されているため、
リクエストごとのメモリ使用量は非常に小さくなっています。

- [ドキュメント](https://github.com/joyent/http-parser/)

### c-ares

一部の非同期 DNS 要求では、Node.js は c-ares というCライブラリを使用します。
JavaScript の DNS モジュールを通して `resolve()` 関数ファミリとして公開されています。
`lookup()` 関数は、残りのコアが使用しているもので、
libuv でスレッド付きの`getaddrinfo(3)` 呼び出しを利用します。
これは、c-ares が /etc/hosts、/etc/resolv.conf、および /etc/svc.conf をサポートしているが、
mDNS のようなものはサポートしていないためです。

- [ドキュメント](https://c-ares.haxx.se/docs.html)

### OpenSSL

OpenSSL は、`tls` モジュールと`crypto` モジュールの両方で広く使用されています。
それは現代の Web がセキュリティのために頼っている
多くの暗号機能の戦いでテストされた実装を提供します。

- [ドキュメント](https://www.openssl.org/docs/)

### zlib

高速な圧縮と解凍のために、Node.js は gzip と libpng での使用でも知られている
業界標準の zlib ライブラリに依存しています。
Node.js は zlib を使って同期、非同期、ストリーミングの圧縮と解凍のインターフェースを作成します。

- [ドキュメント](https://www.zlib.net/manual.html)

## ツール

### npm

Node.js はすべてモジュールであり、それに伴い高品質のパッケージマネージャが必要になります。
この目的のために、npm が作られました。
npm を使えば、あらゆるプログラミングエコシステムのコミュニティで作成されたパッケージの中で最大のものが選択でき、
Node.js アプリケーションを素早く簡単に構築することができます。

- [ドキュメント](https://docs.npmjs.com/)

### gyp

ビルドシステムは、V8 からコピーされた python ベースのプロジェクトジェネレータである gyp によって処理されます。
それは多くのプラットフォームにわたるビルドシステムで使用するためのプロジェクトファイルを生成することができます。
Node.js の大部分 (およびその依存関係) はコンパイルが必要な言語で書かれているため、
Node.js にはビルドシステムが必要です。

- [ドキュメント](https://gyp.gsrc.io/docs/UserDocumentation.md)

### gtest

ネイティブコードは、Chromium から入手した gtest を使用してテストできます。
既存のノード実行可能ファイルをブートストラップする必要なしに C/C++ をテストすることができます。

- [ドキュメント](https://code.google.com/p/googletest/wiki/V1_7_Documentation)
