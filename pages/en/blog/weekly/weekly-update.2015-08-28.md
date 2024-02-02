---
date: '2015-08-28T12:00:00.000Z'
category: weekly
title: Weekly Update - Aug 28th, 2015
layout: blog-post.hbs
author: 'Yosuke Furukawa (@yosuke-furukawa)'
---

### io.js and Node.js News — August 28th

io.js v3.2.0/v3.3.0 and Node v4 evangelism, nodejs.org, nodefest/empirenode event.

### io.js 3.2 and 3.3 Releases

This week we have two io.js releases: [v3.2.0](https://iojs.org/dist/v3.2.0/) and [v3.3.0](https://iojs.org/dist/v3.3.0/), complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

### io.js v3.3.0 Notable changes

- **build**: Add a `--link-module` option to `configure` that can be used to bundle additional JavaScript modules into a built binary (Bradley Meck) [#2497](https://github.com/nodejs/node/pull/2497)
- **docs**: Merge outstanding doc updates from joyent/node (James M Snell) [#2378](https://github.com/nodejs/node/pull/2378)
- **http_parser**: Significant performance improvement by having `http.Server` consume all initial data from its `net.Socket` and parsing directly without having to enter JavaScript. Any `'data'` listeners on the `net.Socket` will result in the data being "unconsumed" into JavaScript, thereby undoing any performance gains. (Fedor Indutny) [#2355](https://github.com/nodejs/node/pull/2355)
- **libuv**: Upgrade to 1.7.3 (from 1.6.1), see [ChangeLog](https://github.com/libuv/libuv/blob/v1.x/ChangeLog) for details (Saúl Ibarra Corretgé) [#2310](https://github.com/nodejs/node/pull/2310)
- **V8**: Upgrade to 4.4.63.30 (from 4.4.63.26) (Michaël Zasso) [#2482](https://github.com/nodejs/node/pull/2482)

### io.js v3.2.0 Notable changes

- **events**: Added `EventEmitter#listenerCount(event)` as a replacement for `EventEmitter.listenerCount(emitter, event)`, which has now been marked as deprecated in the docs. (Sakthipriyan Vairamani) [#2349](https://github.com/nodejs/node/pull/2349)
- **module**: Fixed an error with preloaded modules when the current working directory doesn't exist. (Bradley Meck) [#2353](https://github.com/nodejs/node/pull/2353)
- **node**: Startup time is now about 5% faster when not passing V8 flags. (Evan Lucas) [#2483](https://github.com/nodejs/node/pull/2483)
- **repl**: Tab-completion now works better with arrays. (James M Snell) [#2409](https://github.com/nodejs/node/pull/2409)
- **string_bytes**: Fixed an unaligned write in the handling of UCS2 encoding. (Fedor Indutny) [#2480](https://github.com/nodejs/node/pull/2480)
- **tls**: Added a new `--tls-cipher-list` flag that can be used to override the built-in default cipher list. (James M Snell) [#2412](https://github.com/nodejs/node/pull/2412) _Note: it is suggested you use the built-in cipher list as it has been carefully selected to reflect current security best practices and risk mitigation._

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

- Some uses of computed object shorthand properties are not handled correctly by the current version of V8. e.g. `[{ [prop]: val }]` evaluates to `[{}]`. [#2507](https://github.com/nodejs/node/issues/2507)
- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760).
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
- `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### We need Node.js v4 evangelists

- Node.js v4 is released soon. We need evangelists for Node.js v4. If you have an interest to evangelize, provide your information in [this issue](https://github.com/nodejs/node/issues/2633).
- Current members:
  - Fedor Indutny ([@indutny](https://github.com/indutny))
  - Yosuke Furukawa ([@yosuke-furukawa](https://github.com/yosuke-furukawa))
  - Sakthipriyan Vairamani ([@thefourtheye](https://github.com/thefourtheye))
  - Jackson Tian ([@JacksonTian](https://github.com/JacksonTian))
  - P.S.V.R ([@pmq20](https://github.com/pmq20))
  - James M Snell ([@pmq20](https://github.com/pmq20))
  - Mikeal Rogers ([@mikeal](https://github.com/mikeal))
  - Colin Ihrig ([@cjihrig](https://github.com/cjihrig))
  - Jeremiah Senkpiel ([@Fishrock123](https://github.com/Fishrock123))
  - Rich Trott ([@Trott](https://github.com/Trott))
  - Julian Duque ([@julianduque](https://github.com/julianduque))
  - Stephen Belanger ([@Qard](https://github.com/Qard))
  - Ben Noordhuis ([@bnoordhuis](https://github.com/bnoordhuis))
  - Trevor Norris ([@trevnorris](https://github.com/trevnorris))
  - Rod Vagg ([@rvagg](https://github.com/rvagg))
  - Evan Lucas ([@evanlucas](https://github.com/evanlucas))
  - Daniel Khan ([@danielkhan](https://github.com/danielkhan))
  - Raja Sekar ([@rajzshkr](https://github.com/rajzshkr))

### New nodejs.org went live today

- New nodejs.org went live today, served from DigitalOcean and CloudFlare, contributors should go to [https://github.com/nodejs/nodejs.org](https://github.com/nodejs/nodejs.org).

### Community Updates

- We _still_ need a V8 maintainer for our LTS build! Head on over [to GitHub](https://github.com/nodejs/LTS/issues/28) to see if the requirements match your capabilities.
- npm posts an blog entry about tips for [testing and deploy](http://blog.npmjs.org/post/127671403050/testing-and-deploying-with-ordered-npm-run-scripts).

If you have spotted or written something about Node.js and io.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
- [nodeday](http://nodeday.com/) tickets are on sale, September 10th at Karnataka, India
- [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
- [EmpireNode](http://2015.empirenode.org/), October 23rd at New York, US.
- [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin, Colombia
- [NodeFest](http://nodefest.jp/2015/), November 7th at Tokyo, Japan
- [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.

Have an event about Node.js and io.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
