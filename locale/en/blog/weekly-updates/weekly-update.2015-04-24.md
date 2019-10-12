---
title: Weekly Update - Apr 24th, 2015
author: Giovanny Gioyik (@Gioyik)
date: 2015-04-24T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-04-24
layout: blog-post.hbs
---

# io.js 1.8.1 release
This week we had one io.js release [v1.8.1](https://iojs.org/dist/v1.8.1/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

* **NOTICE**: Skipped v1.8.0 due to problems with release tooling.
  See [#1436](https://github.com/nodejs/node/issues/1436) for details.
* **build**: Support for building io.js as a static library (Marat Abdullin) [#1341](https://github.com/nodejs/node/pull/1341)
* **deps**: Upgrade openssl to 1.0.2a (Shigeki Ohtsu) [#1389](https://github.com/nodejs/node/pull/1389)
  * Users should see performance improvements when using the crypto API.
  See [here](https://github.com/nodejs/node/wiki/Crypto-Performance-Notes-for-OpenSSL-1.0.2a-on-iojs-v1.8.0)
  for details.
* **npm**: Upgrade npm to 2.8.3. See the [release notes](https://github.com/npm/npm/releases/tag/v2.8.3) for details. Includes improved git support.
* **src**: Allow multiple arguments to be passed to process.nextTick (Trevor Norris) [#1077](https://github.com/nodejs/node/pull/1077)
* **module**: The interaction of `require('.')` with `NODE_PATH` has been restored and deprecated. This functionality
will be removed at a later point. (Roman Reiss) [#1363](https://github.com/nodejs/node/pull/1363)

## Known issues

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).
* readline: split escapes are processed incorrectly, see [#1403](https://github.com/nodejs/node/issues/1403)

## Community Updates

* Fedor Indutny opened discussion about removing TLS `newSession` and `resumeSession` event. [iojs/io.js#1462](https://github.com/nodejs/node/issues/1462)
* Proposal to change the C HTTP parser JS HTTP parser [here](https://github.com/nodejs/node/pull/1457)
* NPM founder talks about io.js at [InfoWorld](http://www.infoworld.com/article/2910594/node-js/npm-founder-foresees-merger-node-js-io-js.html)
* Proposal to add mikeal, mscdex, shigeki as new TC members. [iojs/io.js#1483](https://github.com/nodejs/node/issues/1483#issuecomment-95128140)

## Upcoming Events

* [JSConf Uruguay](http://jsconf.uy) tickets are on sale, April 24th & 25th at Montevideo, Uruguay
* [NodeConf Adventure](http://nodeconf.com/) tickets are on sale, June 11th - 14th at Walker Creek Ranch, CA
* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
