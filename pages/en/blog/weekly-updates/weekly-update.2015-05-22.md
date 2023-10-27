---
date: '2015-05-22T12:00:00.000Z'
category: weekly
title: Weekly Update - May 22nd, 2015
layout: blog-post.hbs
author: 'Giovanny Gioyik (@Gioyik) & Yosuke Furukawa (@yosuke-furukawa)'
---

# io.js 1.8, 2.0 and 2.1 releases

This week we had three io.js releases [v1.8.2](https://iojs.org/dist/v1.8.2/), [v2.0.2](https://iojs.org/dist/v2.0.2/) and [v2.1.0](https://iojs.org/dist/v2.1.0/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

## Notable changes

### 1.8.2

**Maintenance release**

- **crypto**: significantly reduced memory usage for TLS (Fedor Indutny & Сковорода Никита Андреевич) [#1529](https://github.com/nodejs/node/pull/1529)
- **npm**: Upgrade npm to 2.9.0. See the [v2.8.4](https://github.com/npm/npm/releases/tag/v2.8.4) and [v2.9.0](https://github.com/npm/npm/releases/tag/v2.9.0) release notes for details.

### 2.0.2

- **win,node-gyp**: the delay-load hook for windows addons has now been correctly enabled by default, it had wrongly defaulted to off in the release version of 2.0.0 (Bert Belder) [#1433](https://github.com/nodejs/node/pull/1433)
- **os**: `tmpdir()`'s trailing slash stripping has been refined to fix an issue when the temp directory is at '/'. Also considers which slash is used by the operating system. (cjihrig) [#1673](https://github.com/nodejs/node/pull/1673)
- **tls**: default ciphers have been updated to use gcm and aes128 (Mike MacCana) [#1660](https://github.com/nodejs/node/pull/1660)
- **build**: v8 snapshots have been re-enabled by default as suggested by the v8 team, since prior security issues have been resolved. This should give some perf improvements to both startup and vm context creation. (Trevor Norris) [#1663](https://github.com/nodejs/node/pull/1663)
- **src**: fixed preload modules not working when other flags were used before `--require` (Yosuke Furukawa) [#1694](https://github.com/nodejs/node/pull/1694)
- **dgram**: fixed `send()`'s callback not being asynchronous (Yosuke Furukawa) [#1313](https://github.com/nodejs/node/pull/1313)
- **readline**: emitKeys now keeps buffering data until it has enough to parse. This fixes an issue with parsing split escapes. (Alex Kocharin) [#1601](https://github.com/nodejs/node/pull/1601)
- **cluster**: works now properly emit 'disconnect' to `cluster.worker` (Oleg Elifantiev) [#1386](https://github.com/nodejs/node/pull/1386)
- **events**: uncaught errors now provide some context (Evan Lucas) [#1654](https://github.com/nodejs/node/pull/1654)

### 2.1.0

- **crypto**: Diffie-Hellman key exchange (DHE) parameters (`'dhparams'`) must now be 1024 bits or longer or an error will be thrown. A warning will also be printed to the console if you supply less than 2048 bits. See https://weakdh.org/ for further context on this security concern (Shigeki Ohtsu) [#1739](https://github.com/nodejs/node/pull/1739).
- **node**: A new `--trace-sync-io` command line flag will print a warning and a stack trace whenever a synchronous API is used. This can be used to track down synchronous calls that may be slowing down an application (Trevor Norris) [#1707](https://github.com/nodejs/node/pull/1707).
- **node**: To allow for chaining of methods, the `setTimeout()`, `setKeepAlive()`, `setNoDelay()`, `ref()` and `unref()` methods used in `'net'`, `'dgram'`, `'http'`, `'https'` and `'tls'` now return the current instance instead of `undefined` (Roman Reiss & Evan Lucas) [#1699](https://github.com/nodejs/node/pull/1699) [#1768](https://github.com/nodejs/node/pull/1768) [#1779](https://github.com/nodejs/node/pull/1779).
- **npm**: Upgraded to v2.10.1, release notes can be found in <https://github.com/npm/npm/releases/tag/v2.10.1> and <https://github.com/npm/npm/releases/tag/v2.10.0>.
- **util**: A significant speed-up (in the order of 35%) for the common-case of a single string argument to `util.format()`, used by `console.log()` (Сковорода Никита Андреевич) [#1749](https://github.com/nodejs/node/pull/1749).

## Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)
- `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

## Community Updates

- Mikeal Rogers post about **Promise errors in io.js** on [Modulus.io](http://blog.modulus.io/promise-errors-in-iojs)
- [NodeSchool International Day](https://nodeschool.io/international-day/) has been held for the first time. [40 cities](https://github.com/nodeschool/international-day/issues?q=label%3Arollcall-2015+is%3Aclosed) joined.
- [Logjam](https://weakdh.org/) attack vulnerability detected on Diffie-Hellman Key exchange. io.js [fixed the vulnerability](https://github.com/nodejs/node/pull/1739) on [v2.1.0](https://github.com/nodejs/node/blob/main/CHANGELOG.md#2015-05-24-version-210-rvagg).

## Upcoming Events

- [NodeConf Adventure](http://nodeconf.com/) tickets are on sale, June 11th - 14th at Walker Creek Ranch, CA
- [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
- [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
