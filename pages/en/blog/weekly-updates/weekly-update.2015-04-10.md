---
date: '2015-04-10T12:00:00.000Z'
category: weekly
title: Weekly Update - Apr 10th, 2015
layout: blog-post.hbs
author: 'Giovanny Gioyik (@Gioyik) & Julian Duque (@julianduque)'
---

# io.js 1.6.4 release

This week we had one io.js release [v1.6.4](https://iojs.org/dist/v1.6.4/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

- **npm**: upgrade npm to 2.7.5. See [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v275-2015-03-26) for details. Includes two important security fixes.
- **openssl**: preliminary work has been done for an upcoming upgrade to OpenSSL 1.0.2a [#1325](https://github.com/nodejs/node/pull/1325) (Shigeki Ohtsu). See [#589](https://github.com/nodejs/node/issues/589) for additional details.
- **timers**: a minor memory leak when timers are unreferenced was fixed, alongside some related timers issues [#1330](https://github.com/nodejs/node/pull/1330) (Fedor Indutny). This appears to have fixed the remaining leak reported in [#1075](https://github.com/nodejs/node/issues/1075).
- **android**: it is now possible to compile io.js for Android and related devices [#1307](https://github.com/nodejs/node/pull/1307) (Giovanny Andres Gongora Granada).

## Known issues

- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
- Not possible to build io.js as a static library [#686](https://github.com/nodejs/node/issues/686)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)

## Community Updates

- Node Foundation dev policy draft is [here](https://github.com/jasnell/dev-policy)
- ARMv8 / ARM64 [support](https://twitter.com/rvagg/status/586050873349939201) on io.js
- Continued work on a new dev policy for [Node.js/io.js](https://github.com/jasnell/dev-policy)
- TC call from [Wednesday](https://www.youtube.com/watch?v=OjlK8k10oyo)

## Upcoming Events

- [JSConf Uruguay](http://jsconf.uy) tickets are on sale, April 24th & 25th at Montevideo, Uruguay
- [NodeConf Adventure](http://nodeconf.com/) tickets are on sale, June 11th - 14th at Walker Creek Ranch, CA
- [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
- [nodeSchool Tokyo](http://nodejs.connpass.com/event/13182/) will be held in April 12th at Tokyo, Japan
