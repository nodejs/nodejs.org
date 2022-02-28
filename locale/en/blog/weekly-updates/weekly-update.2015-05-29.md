---
title: Weekly Update - May 29th, 2015
author: Giovanny Gioyik (@Gioyik)
date: 2015-05-29T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-05-29
layout: blog-post.hbs
---

# io.js 2.2 releases
This week we had two io.js releases [v2.2.0](https://iojs.org/dist/v2.2.0/) and [v2.2.1](https://iojs.org/dist/v2.2.1/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

## Notable changes

### v2.2.0

* **node**: Speed-up `require()` by replacing usage of `fs.statSync()` and `fs.readFileSync()` with internal variants that are faster for this use-case and do not create as many objects for the garbage collector to clean up. The primary two benefits are: significant increase in application start-up time on typical applications and better start-up time for the debugger by eliminating almost all of the thousands of exception events. (Ben Noordhuis) [#1801](https://github.com/nodejs/node/pull/1801).
* **node**: Resolution of pre-load modules (`-r` or `--require`) now follows the standard `require()` rules rather than just resolving paths, so you can now pre-load modules in node_modules. (Ali Ijaz Sheikh) [#1812](https://github.com/nodejs/node/pull/1812).
* **npm**: Upgraded npm to v2.11.0. New hooks for `preversion`, `version`, and `postversion` lifecycle events, some SPDX-related license changes and license file inclusions. See the [release notes](https://github.com/npm/npm/releases/tag/v2.11.0) for full details.

### v2.2.1

* **http**: reverts the removal of an undocumented `client` property on client connections, this property is being used in the wild, most notably by [request](https://github.com/request/request) which is used by npm. (Michaël Zasso) [#1852](https://github.com/nodejs/node/pull/1852).

## Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

## Community Updates

* [Schism and Reconciliation](https://nodesource.com/blog/was-this-trip-really-necessary) in the Node Community by Rod Vagg.
* First Node TSC Meeting available on [SoundCloud](https://soundcloud.com/node-foundation/tsc-meeting-2015-05-27).
* io.js have got a new Benchmarking Working Group [nodejs/benchmarking#1](https://github.com/nodejs/benchmarking/issues/1).
* Blog post about iojs + Node.js under Node Foundation by [nodejs.com](http://blog.nodejs.org/2015/05/15/the-nodejs-foundation-benefits-all/).
* io.js implements new [`good first contribution`](https://github.com/nodejs/node/labels/good%20first%20contribution) tag for new contributors.
* Blog post from [TheNewStack](http://thenewstack.io/io-js-and-node-js-have-united-and-thats-a-good-thing/) about iojs and Node.js new relation.
* Oliver Zeigermann created a [repo](https://github.com/DJCordhose/ecmascript-2015-iojs) about ES6 and iojs implementation.

## Upcoming Events

* [NodeConf Adventure](http://nodeconf.com/) tickets are on sale, June 11th - 14th at Walker Creek Ranch, CA
* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
