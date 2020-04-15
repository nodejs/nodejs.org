---
title: Weekly Update - Apr 3rd, 2015
author: Giovanny Gioyik (@Gioyik)
date: 2015-04-03T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-04-03
layout: blog-post.hbs
---

# io.js 1.6.3 release
This week we had one io.js release [v1.6.3](https://iojs.org/dist/v1.6.3/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

* **fs**: corruption can be caused by `fs.writeFileSync()` and append-mode `fs.writeFile()` and `fs.writeFileSync()` under certain circumstances, reported in [#1058](https://github.com/nodejs/node/issues/1058), fixed in [#1063](https://github.com/nodejs/node/pull/1063) (Olov Lassus).
* **iojs**: an "internal modules" API has been introduced to allow core code to share JavaScript modules internally only without having to expose them as a public API, this feature is for core-only [#848](https://github.com/nodejs/node/pull/848) (Vladimir Kurchatkin).
* **timers**: two minor problems with timers have been fixed:
  * `Timer#close()` is now properly idempotent [#1288](https://github.com/nodejs/node/issues/1288) (Petka Antonov).
  * `setTimeout()` will only run the callback once now after an `unref()` during the callback [#1231](https://github.com/nodejs/node/pull/1231) (Roman Reiss).
  * NOTE: there are still other unresolved concerns with the timers code, such as [#1152](https://github.com/nodejs/node/pull/1152).
* **Windows**: a "delay-load hook" has been added for compiled add-ons on Windows that should alleviate some of the problems that Windows users may be experiencing with add-ons in io.js [#1251](https://github.com/nodejs/node/pull/1251) (Bert Belder).
* **V8**: minor bug-fix upgrade for V8 to 4.1.0.27.
* **npm**: upgrade npm to 2.7.4. See [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v274-2015-03-20) for details.

## Known issues

* Some problems exist with timers and `unref()` still to be resolved. See [#1152](https://github.com/nodejs/node/pull/1152).
* Possible small memory leak(s) may still exist but have yet to be properly identified, details at [#1075](https://github.com/nodejs/node/issues/1075).
* Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
* Not possible to build io.js as a static library [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)

## Community Updates

* [Scaleway](https://www.scaleway.com/) provides some ARM resources for the iojs test/build infrastructure.
* New post on Medium about Node.js reconciliation: [Help us reconcile Node.js and io.js](https://medium.com/node-js-javascript/help-us-reconcile-node-js-and-io-js-c060a9ec1bd4)
* Added support for iojs in [Reactive-Extensions/RxJS](https://travis-ci.org/Reactive-Extensions/RxJS/builds/56671837)
* [joyent/nodejs-advisory-board#30](https://github.com/joyent/nodejs-advisory-board/pull/30) merged
* Mikeal Rogers working on reconciling Project Lifecycle and WG [joyent/nodejs-advisory-board#33](https://github.com/joyent/nodejs-advisory-board/pull/33)
* Rod Vagg opened the discussion forum about Node.js reconciliation in [iojs/io.js#1336](https://github.com/nodejs/node/issues/1336)

## Upcoming Events

* [NodeConf](http://nodeconf.com/) tickets are on sale, June 8th and 9th at Oakland, CA and NodeConf Adventure for June 11th - 14th at Walker Creek Ranch, CA
* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [nodeSchool tokyo](http://nodejs.connpass.com/event/13182/) will be held in April 12th at Tokyo, Japan
