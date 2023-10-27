---
date: '2015-03-20T12:00:00.000Z'
category: weekly
title: Weekly Update - Mar 20th, 2015
layout: blog-post.hbs
author: Julian Duque (julianduque)
---

# io.js 1.6 release

This week we had a two io.js releases [v1.6.1](https://iojs.org/dist/v1.6.1/) and [v1.6.0](https://iojs.org/dist/v1.6.0/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

### 1.6.1

- **path**: New type-checking on `path.resolve()` [#1153](https://github.com/nodejs/node/pull/1153) uncovered some edge-cases being relied upon in the wild, most notably `path.dirname(undefined)`. Type-checking has been loosened for `path.dirname()`, `path.basename()`, and `path.extname()` (Colin Ihrig) [#1216](https://github.com/nodejs/node/pull/1216).
- **querystring**: Internal optimizations in `querystring.parse()` and `querystring.stringify()` [#847](https://github.com/nodejs/node/pull/847) prevented `Number` literals from being properly converted via `querystring.escape()` [#1208](https://github.com/nodejs/node/issues/1208), exposing a blind-spot in the test suite. The bug and the tests have now been fixed (Jeremiah Senkpiel) [#1213](https://github.com/nodejs/node/pull/1213).

### 1.6.0

- **node**: a new `-r` or `--require` command-line option can be used to pre-load modules at start-up (Ali Ijaz Sheikh) [#881](https://github.com/nodejs/node/pull/881).
- **querystring**: `parse()` and `stringify()` are now faster (Brian White) [#847](https://github.com/nodejs/node/pull/847).
- **http**: the `http.ClientRequest#flush()` method has been deprecated and replaced with `http.ClientRequest#flushHeaders()` to match the same change now in Node.js v0.12 as per [joyent/node#9048](https://github.com/joyent/node/pull/9048) (Yosuke Furukawa) [#1156](https://github.com/nodejs/node/pull/1156).
- **net**: allow `server.listen()` to accept a `String` option for `port`, e.g. `{ port: "1234" }`, to match the same option being accepted in `net.connect()` as of [joyent/node#9268](https://github.com/joyent/node/pull/9268) (Ben Noordhuis) [#1116](https://github.com/nodejs/node/pull/1116).
- **tls**: further work on the reported memory leak although there appears to be a minor leak remaining for the use-case in question, track progress at [#1075](https://github.com/nodejs/node/issues/1075).
- **v8**: backport a fix for an integer overflow when `--max_old_space_size` values above `4096` are used (Ben Noordhuis) [#1166](https://github.com/nodejs/node/pull/1166).
- **platforms**: the io.js CI system now reports passes on **FreeBSD** and **SmartOS** (_Solaris_).
- **npm**: upgrade npm to 2.7.1. See [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v271-2015-03-05) for details.

## Known Issues

- Possible remaining TLS-related memory leak(s), details at [#1075](https://github.com/nodejs/node/issues/1075).
- Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
- Not possible to build io.js as a static library [#686](https://github.com/nodejs/node/issues/686)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)

## Community Updates

- browserify supports io.js, you can check the announcement [here](https://twitter.com/yosuke_furukawa/status/577150547850969088)
- express.js added [support](https://github.com/strongloop/express/commit/165660811aa9ba5f3733a7b033894f3d9a9c5e60) to io.js
- Over the last two weeks we got access to hardware from Joyent and upstreamed a patch to V8 so we got io.js building. After that we worked on passing tests for both [SmartOS](https://github.com/iojs/build/pull/64) and [FreeBSD](https://github.com/nodejs/node/pull/1167) which as of two days ago now pass, this was thanks to the amazing work of the build team and [Johan Bergström](https://github.com/jbergstroem)
- [Petka Antonov](https://github.com/petkaantonov) is proposing a workers implementation in io.js under an experimental flag, you can join the discussion [here](https://github.com/nodejs/node/pull/1159)
- io.js [upgraded](https://github.com/nodejs/node/pull/1206) openssl to `1.0.1m`

## Upcoming Events

- [NodeConf](http://nodeconf.com/) tickets are on sale, June 8th and 9th at Oakland, CA and NodeConf Adventure for June 11th - 14th at Walker Creek Ranch, CA
- [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
