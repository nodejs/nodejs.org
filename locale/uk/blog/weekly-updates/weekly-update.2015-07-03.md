---
title: Weekly Update - Jul 3rd, 2015
author: Yosuke Furukawa (@yosuke-furukawa)
date: 2015-07-03T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-07-03
layout: blog-post.hbs
---

### io.js and Node.js News — July 3rd
Important patches for io.js 1.8 and 2.3 and upcoming events.

### io.js 1.8 and 2.3 Releases

This week we have three io.js releases: [v2.3.2](https://iojs.org/dist/v2.3.2/) and two following important security patches [v1.8.3](https://iojs.org/dist/v1.8.3/) and [v2.3.3](https://iojs.org/dist/v2.3.3/), complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md) with the [v1.x changelog here](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

### Notable Changes

#### 1.8.3

**Maintenance release**

* **v8**: Fixed an out-of-band write in utf8 decoder. **This is an important security update** as it can be used to cause a denial of service attack.
* **openssl**: Upgrade to 1.0.2b and 1.0.2c, introduces DHE man-in-the-middle protection (Logjam) and fixes malformed ECParameters causing infinite loop (CVE-2015-1788). See the [security advisory](https://www.openssl.org/news/secadv_20150611.txt) for full details. (Shigeki Ohtsu) [#1950](https://github.com/nodejs/node/pull/1950) [#1958](https://github.com/nodejs/node/pull/1958)
* **build**:
  * Added support for compiling with Microsoft Visual C++ 2015
  * Started building and distributing headers*only tarballs along with binaries

#### 2.3.2

* **build**:
  * Added support for compiling with Microsoft Visual C++ 2015
  * Started building and distributing headers-only tarballs along with binaries

#### 2.3.3

* **deps**: Fixed an out-of-band write in utf8 decoder. **This is an important security update** as it can be used to cause a denial of service attack.

### Known Issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760).
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Community Updates

* Yosuke Furukawa will give a talk about the past, present, and future of Node.js in [YAPC Asia 2015](http://yapcasia.org/2015/), the largest conference in Japan's programming community. It will be hosted at Tokyo on August 20th - 22nd and his talk will specifically be on the 22nd. Details of the talk can be found [here](http://yapcasia.org/2015/talk/show/82e93a96-f60e-11e4-907e-8ab37d574c3a).
* A security issue is found in v8 that can be used for DoS attacks against Node.js applications and servers running 0.12 and all versions of io.js. Critical security upgrades ([Node.js v0.12.6](https://nodejs.org/dist/v0.12.6/), [io.js 2.3.3](https://iojs.org/dist/v2.3.3/) and [io.js 1.8.3](https://iojs.org/dist/v1.8.3/)) have been released. Also, details about the issue can be found [on one of our Medium post](https://medium.com/@iojs/important-security-upgrades-for-node-js-and-io-js-8ac14ece5852). If you're running v1.8.2 or below, or v2.3.2 or below, please update them to io.js versions 1.8.3 and 2.3.3.

### Upcoming Events

* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin
