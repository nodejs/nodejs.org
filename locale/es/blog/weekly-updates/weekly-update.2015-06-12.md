---
title: Weekly Update - Jun 12th, 2015
author: Giovanny Gioyik (@Gioyik)
date: 2015-06-12T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-06-12
layout: blog-post.hbs
---

# io.js 2.3 releases
This week we had one io.js release [v2.3.0](https://iojs.org/dist/v2.3.0/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

## Notable changes

* **libuv**: Upgraded to 1.6.0 and 1.6.1, see [full ChangeLog](https://github.com/libuv/libuv/blob/60e515d9e6f3d86c0eedad583805201f32ea3aed/ChangeLog#L1-L36) for details. (Saúl Ibarra Corretgé) [#1905](https://github.com/nodejs/node/pull/1905) [#1889](https://github.com/nodejs/node/pull/1889). Highlights include:
  * Fix TTY becoming blocked on OS X
  * Fix UDP send callbacks to not to be synchronous
  * Add `uv_os_homedir()` (exposed as `os.homedir()`, see below)
* **npm**: See full [release notes](https://github.com/npm/npm/releases/tag/v2.11.1) for details. (Kat Marchán) [#1899](https://github.com/nodejs/node/pull/1899). Highlight:
  * Use GIT_SSH_COMMAND (available as of Git 2.3)
* **openssl**:
  * Upgrade to 1.0.2b and 1.0.2c, introduces DHE man-in-the-middle protection (Logjam) and fixes malformed ECParameters causing infinite loop (CVE-2015-1788). See the [security advisory](https://www.openssl.org/news/secadv_20150611.txt) for full details. (Shigeki Ohtsu) [#1950](https://github.com/nodejs/node/pull/1950) [#1958](https://github.com/nodejs/node/pull/1958)
  * Support [FIPS](https://en.wikipedia.org/wiki/Federal_Information_Processing_Standards) mode of OpenSSL, see [README](https://github.com/nodejs/node#building-iojs-with-fips-compliant-openssl) for instructions. (Fedor Indutny) [#1890](https://github.com/nodejs/node/pull/1890)
* **os**: Add `os.homedir()` method. (Colin Ihrig) [#1791](https://github.com/nodejs/node/pull/1791)
* **smalloc**: Deprecate whole module. (Vladimir Kurchatkin) [#1822](https://github.com/nodejs/node/pull/1822)
* Add new collaborators:
  * Alex Kocharin ([@rlidwka](https://github.com/rlidwka))
  * Christopher Monsanto ([@monsanto](https://github.com/monsanto))
  * Ali Ijaz Sheikh ([@ofrobots](https://github.com/ofrobots))
  * Oleg Elifantiev ([@Olegas](https://github.com/Olegas))
  * Domenic Denicola ([@domenic](https://github.com/domenic))
  * Rich Trott ([@Trott](https://github.com/Trott))

## Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

## Community Updates

* Openssl vulnerabilities are updated on io.js. **Resume:** *Upgrade to 1.0.2b and 1.0.2c, introduces DHE man-in-the-middle protection (Logjam) and fixes malformed ECParameters causing infinite loop (CVE-2015-1788). See the security advisory for full details. (Shigeki Ohtsu) #1950 #1958*
* io.js 2.3.0 os.homedir() [ponyfill](http://t.co/2XQV5XQblu)
* ["Should I use Node.js or io.js? And which version?"](https://strongloop.com/strongblog/should-i-use-node-js-or-io-js-and-which-version/) article by StrongLoop
* iojs now supports [`--use_strong`](https://t.co/4t1EaiiK27). Strong mode (part of Google v8 experiments) implements a stronger semantics.
* ["Node.js and io.js Merge Under the Node Foundation"](http://www.infoq.com/news/2015/05/nodejs-iojs#.VX41fCR99Kc.twitter) by InfoQ.

## Upcoming Events

* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin
