---
title: Weekly Update - Aug 21st, 2015
author: Yosuke Furukawa (@yosuke-furukawa)
date: 2015-08-21T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-08-21
layout: blog-post.hbs
---

### io.js and Node.js News — August 21st
io.js v3.1.0 and the v0.12 LTS plan, ARM build, nodeday event.

### io.js v3.1.0 Release

### Notable changes

* **buffer**: Fixed a couple large memory leaks (Ben Noordhuis) [#2352](https://github.com/nodejs/node/pull/2352).
* **crypto**:
  * Fixed a couple of minor memory leaks (Karl Skomski) [#2375](https://github.com/nodejs/node/pull/2375).
  * Signing now checks for OpenSSL errors (P.S.V.R) [#2342](https://github.com/nodejs/node/pull/2342). **Note that this may expose previously hidden errors in user code.**
* **intl**: Intl support using small-icu is now enabled by default in builds (Steven R. Loomis) [#2264](https://github.com/nodejs/node/pull/2264).
  * [`String#normalize()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) can now be used for unicode normalization.
  * The [`Intl`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl) object and various `String` and `Number` methods are present, but only support the English locale.
  * For support of all locales, node must be built with [full-icu](https://github.com/nodejs/node#build-with-full-icu-support-all-locales-supported-by-icu).
* **tls**: Fixed tls throughput being much lower after an incorrect merge (Fedor Indutny) [#2381](https://github.com/nodejs/node/pull/2381).
* **tools**: The v8 tick processor now comes bundled with node (Matt Loring) [#2090](https://github.com/nodejs/node/pull/2090).
  * This can be used by producing performance profiling output by running node with `--perf`, then running your appropriate platform's script on the output as found in [tools/v8-prof](https://github.com/nodejs/node/tree/master/tools/v8-prof).
* **util**: `util.inspect(obj)` now prints the constructor name of the object if there is one (Christopher Monsanto) [#1935](https://github.com/nodejs/node/pull/1935).

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760).
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Node.js v0.12 LTS plan has been shortened

* Node.js v0.12 LTS plan has been shortened to end at the end of 2016, because OpenSSL 1.0.1 LTS is scheduled until the end of 2016. The detail is [here](https://github.com/nodejs/LTS/pull/36).

### Community Updates

* We *still* need a V8 maintainer for our LTS build! Head on over [to GitHub](https://github.com/nodejs/LTS/issues/28) to see if the requirements match your capabilities.
* [Marko Bonaći](https://github.com/mbonaci) published [his blog post](http://blog.sematext.com/2015/07/15/logging-cli-writing-first-node-project/) about his first useful Node.js product which can search log files.
* [Rod Vagg](https://github.com/rvagg) updated [his post about the state of the Node.js build on ARM](https://medium.com/@rvagg/node-js-io-js-state-of-the-build-arm-2f24c18e1ab4). In the entry, Rod details how Node core members test and build Node.js for ARM hardware.

If you have spotted or written something about Node.js and io.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
* [nodeday](http://nodeday.com/) tickets are on sale, September 10th at Karnataka, India
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin
* [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.

Have an event about Node.js and io.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
