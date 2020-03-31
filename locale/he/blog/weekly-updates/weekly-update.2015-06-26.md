---
title: Weekly Update - Jun 26th, 2015
author: Giovanny Gioyik (@Gioyik)
date: 2015-06-26T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-06-26
layout: blog-post.hbs
---

# io.js and Node.js News
This week we have one io.js [release v2.3.1](https://github.com/nodejs/node/blob/master/CHANGELOG.md#2015-06-23-version-231-rvagg), complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

## Notable changes

* **module**: The number of syscalls made during a `require()` have been significantly reduced again (see [#1801](https://github.com/nodejs/node/pull/1801) from v2.2.0 for previous work), which should lead to a performance improvement (Pierre Inglebert) [#1920](https://github.com/nodejs/node/pull/1920).
* **npm**:
  * Upgrade to [v2.11.2](https://github.com/npm/npm/releases/tag/v2.11.2) (Rebecca Turner) [#1956](https://github.com/nodejs/node/pull/1956).
  * Upgrade to [v2.11.3](https://github.com/npm/npm/releases/tag/v2.11.3) (Forrest L Norvell) [#2018](https://github.com/nodejs/node/pull/2018).
* **zlib**: A bug was discovered where the process would abort if the final part of a zlib decompression results in a buffer that would exceed the maximum length of `0x3fffffff` bytes (~1GiB). This was likely to only occur during buffered decompression (rather than streaming). This is now fixed and will instead result in a thrown `RangeError` (Michaël Zasso) [#1811](https://github.com/nodejs/node/pull/1811).

## Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

## Community Updates

* Slide deck: [Bluemix Webinar: Deploying a Full Stack Node.js Application to IBM Bluemix](https://speakerdeck.com/bradleyholt/bluemix-webinar-deploying-a-full-stack-node-dot-js-application-to-ibm-bluemix)
* Article by RisingStack: [How to Use Rust with Node.js When Performance Matters](http://blog.risingstack.com/how-to-use-rust-with-node-when-performance-matters/)
* Device Atlas API now [supports Node.js](https://deviceatlas.com/blog/deviceatlas-api-node-js)
* [On Maintaining a Native Node Module](http://www.voodootikigod.com/on-maintaining-a-native-node-module/) by Chris Williams
* [nodei.co](http://twitter.com/rvagg/status/613688739030679552) is running with io.js
* npm [3.0.0 pre-release](https://github.com/npm/npm/releases/tag/v3.0.0)

## Upcoming Events

* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin
