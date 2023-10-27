---
date: '2015-07-10T12:00:00.000Z'
category: weekly
title: Weekly Update - Jul 10th, 2015
layout: blog-post.hbs
author: 'Yosuke Furukawa (@yosuke-furukawa)'
---

### io.js and Node.js News — July 10th

Security patches for io.js 1.8 and 2.3 and upcoming events.

### io.js 1.8 and 2.3 Releases

This week we have two io.js releases: [v2.3.4](https://iojs.org/dist/v2.3.4/) and [v1.8.4](https://iojs.org/dist/v1.8.4/), complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md) with the [v1.x changelog here](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

### Notable Changes

#### 1.8.4

**Maintenance release**

- **openssl**: Upgrade to 1.0.2d, fixes CVE-2015-1793 (Alternate Chains Certificate Forgery) [#2141](https://github.com/nodejs/node/pull/2141).

#### 2.3.4

- **openssl**: Upgrade to 1.0.2d, fixes CVE-2015-1793 (Alternate Chains Certificate Forgery) (Shigeki Ohtsu) [#2141](https://github.com/nodejs/node/pull/2141).
- **npm**: Upgraded to v2.12.1, release notes can be found in <https://github.com/npm/npm/releases/tag/v2.12.0> and <https://github.com/npm/npm/releases/tag/v2.12.1> (Kat Marchán) [#2112](https://github.com/nodejs/node/pull/2112).

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760).
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
- `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Community Updates

- OpenSSL published a [high severity security issue](https://mta.openssl.org/pipermail/openssl-announce/2015-July/000037.html), io.js and Node.js have upgraded OpenSSL version and fixed the problem on latest version.
- Node.js LTS WG has updated [their proposed LTS plan](https://github.com/nodejs/LTS/blob/master/README.md#example). They need some feedbacks from Noders.
- ReactNative required io.js as [their test platform](https://github.com/facebook/react-native/blob/master/.travis.yml#L24).

### Upcoming Events

- [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
- [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
- [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin
