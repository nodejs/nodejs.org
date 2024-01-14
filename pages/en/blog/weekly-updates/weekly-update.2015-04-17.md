---
date: '2015-04-17T12:00:00.000Z'
category: weekly
title: Weekly Update - Apr 17th, 2015
layout: blog-post.hbs
author: 'Giovanny Gioyik (@Gioyik)'
---

# io.js 1.7 releases

This week we had two io.js releases [v1.7.0](https://iojs.org/dist/v1.7.0/) and [v1.7.1](https://iojs.org/dist/v1.7.1/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

- **build**: A syntax error in the Makefile for release builds caused 1.7.0 to be DOA and unreleased. (Rod Vagg) [#1421](https://github.com/nodejs/node/pull/1421).
- **C++ API**: Fedor Indutny contributed a feature to V8 which has been backported to the V8 bundled in io.js. `SealHandleScope` allows a C++ add-on author to _seal_ a `HandleScope` to prevent further, unintended allocations within it. Currently only enabled for debug builds of io.js. This feature helped detect the leak in [#1075](https://github.com/nodejs/node/issues/1075) and is now activated on the root `HandleScope` in io.js. (Fedor Indutny) [#1395](https://github.com/nodejs/node/pull/1395).
- **ARM**: This release includes significant work to improve the state of ARM support for builds and tests. The io.js CI cluster's ARMv6, ARMv7 and ARMv8 build servers are now all (mostly) reporting passing builds and tests.
  - ARMv8 64-bit (AARCH64) is now properly supported, including a backported fix in libuv that was mistakenly detecting the existence of `epoll_wait()`. (Ben Noordhuis) [#1365](https://github.com/nodejs/node/pull/1365).
  - ARMv6: [#1376](https://github.com/nodejs/node/issues/1376) reported a problem with `Math.exp()` on ARMv6 (including Raspberry Pi). The culprit is erroneous codegen for ARMv6 when using the "fast math" feature of V8. `--nofast_math` has been turned on for all ARMv6 variants by default to avoid this, fast math can be turned back on with `--fast_math`. (Ben Noordhuis) [#1398](https://github.com/nodejs/node/pull/1398).
  - Tests: timeouts have been tuned specifically for slower platforms, detected as ARMv6 and ARMv7. (Roman Reiss) [#1366](https://github.com/nodejs/node/pull/1366).
- **npm**: Upgrade npm to 2.7.6. See the [release notes](https://github.com/npm/npm/releases/tag/v2.7.6) for details.

## Known issues

- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)
- readline: split escapes are processed incorrectly, see [#1403](https://github.com/nodejs/node/issues/1403)

## Community Updates

- Difference between io.js and The Node Foundation [iojs/io.js#1416](https://github.com/nodejs/node/issues/1416).
- npm launches private modules and npm inc [raises](http://techcrunch.com/2015/04/14/popular-javascript-package-manager-npm-raises-8m-launches-private-modules/).
- Thoughts of Node.js Foundation on [Medium](https://medium.com/@programmer/thoughts-on-node-foundation-abcf86c72786).
- io.js v1.8.0 crypto performance on [io.js wiki](https://github.com/nodejs/node/wiki/Crypto-Performance-Notes-for-OpenSSL-1.0.2a-on-iojs-v1.8.0).
- io.js mention on [Oracle's blog](https://blogs.oracle.com/java-platform-group/entry/node_js_and_io_js).
- State of the io.js Build [April 2015](https://github.com/iojs/build/issues/77)

## Upcoming Events

- [JSConf Uruguay](http://jsconf.uy) tickets are on sale, April 24th & 25th at Montevideo, Uruguay
- [NodeConf Adventure](http://nodeconf.com/) tickets are on sale, June 11th - 14th at Walker Creek Ranch, CA
- [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
