---
date: '2015-09-11T12:00:00.000Z'
category: weekly
title: Weekly Update - Sep 11th, 2015
layout: blog-post.hbs
author: 'Yosuke Furukawa (@yosuke-furukawa)'
---

### Node.js News — September 11th

Node.js v4.1.0 / io.js v3.3.1 are released

### Node.js v4.1.0 and io.js v3.3.1 Releases

This week we have two releases: [Node.js v4.1.0](https://nodejs.org/dist/v4.1.0/) and [io.js v3.3.1](https://iojs.org/dist/v3.3.1/), complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

### Node.js v4.1.0 Notable changes

- **buffer**:
  - Buffers are now created in JavaScript, rather than C++. This increases the speed of buffer creation (Trevor Norris) [#2866](https://github.com/nodejs/node/pull/2866).
  - `Buffer#slice()` now uses `Uint8Array#subarray()` internally, increasing `slice()` performance (Karl Skomski) [#2777](https://github.com/nodejs/node/pull/2777).
- **fs**:
  - `fs.utimes()` now properly converts numeric strings, `NaN`, and `Infinity` (Yazhong Liu) [#2387](https://github.com/nodejs/node/pull/2387).
  - `fs.WriteStream` now implements `_writev`, allowing for super-fast bulk writes (Ron Korving) [#2167](https://github.com/nodejs/node/pull/2167).
- **http**: Fixed an issue with certain `write()` sizes causing errors when using `http.request()` (Fedor Indutny) [#2824](https://github.com/nodejs/node/pull/2824).
- **npm**: Upgrade to version 2.14.3, see https://github.com/npm/npm/releases/tag/v2.14.3 for more details (Kat Marchán) [#2822](https://github.com/nodejs/node/pull/2822).
- **src**: V8 cpu profiling no longer erroneously shows idle time (Oleksandr Chekhovskyi) [#2324](https://github.com/nodejs/node/pull/2324).
- **timers**: `#ref()` and `#unref()` now return the timer they belong to (Sam Roberts) [#2905](https://github.com/nodejs/node/pull/2905).
- **v8**: Lateral upgrade to 4.5.103.33 from 4.5.103.30, contains minor fixes (Ali Ijaz Sheikh) [#2870](https://github.com/nodejs/node/pull/2870).
  - This fixes a previously known bug where some computed object shorthand properties did not work correctly ([#2507](https://github.com/nodejs/node/issues/2507)).

### io.js v3.3.1 Notable changes

- **buffer**: Fixed a minor errors that was causing crashes (Michaël Zasso) [#2635](https://github.com/nodejs/node/pull/2635),
- **child_process**: Fix error that was causing crashes (Evan Lucas) [#2727](https://github.com/nodejs/node/pull/2727)
- **crypto**: Replace use of rwlocks, unsafe on Windows XP / 2003 (Ben Noordhuis) [#2723](https://github.com/nodejs/node/pull/2723)
- **libuv**: Upgrade from 1.7.3 to 1.7.4 (Saúl Ibarra Corretgé) [#2817](https://github.com/nodejs/node/pull/2817)
- **node**: Fix faulty `process.release.libUrl` on Windows (Rod Vagg) [#2699](https://github.com/nodejs/node/pull/2699)
- **node-gyp**: Float v3.0.3 which has improved support for Node.js and io.js v0.10 to v4+ (Rod Vagg) [#2700](https://github.com/nodejs/node/pull/2700)
- **npm**: Upgrade to version 2.14.3 from 2.13.3, includes a security update, see https://github.com/npm/npm/releases/tag/v2.14.2 for more details, (Kat Marchán) [#2696](https://github.com/nodejs/node/pull/2696).
- **timers**: Improved timer performance from porting the 0.12 implementation, plus minor fixes (Jeremiah Senkpiel) [#2540](https://github.com/nodejs/node/pull/2540), (Julien Gilli) [nodejs/node-v0.x-archive#8751](https://github.com/nodejs/node-v0.x-archive/pull/8751) [nodejs/node-v0.x-archive#8905](https://github.com/nodejs/node-v0.x-archive/pull/8905)

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

- Some uses of computed object shorthand properties are not handled correctly by the current version of V8. e.g. `[{ [prop]: val }]` evaluates to `[{}]`. [#2507](https://github.com/nodejs/node/issues/2507)
- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
- `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Node.js Foundation Combines Node.js and io.js Into Single Codebase in New Release

Node.js Foundation posts an entry about Node.js new release and introduction of Node Foundation. [The details are here](/blog/announcements/foundation-v4-announce/)

### Node.js Interactive

[Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive) is a new, annual, vendor-neutral conference for Node.js. It is being led by the newly formed Node.js Foundation.

### Community Updates

- We _still_ need a V8 maintainer for our LTS build! Head on over [to GitHub](https://github.com/nodejs/LTS/issues/28) to see if the requirements match your capabilities.
- According to [Raygun blog](https://raygun.io/blog/2015/09/nodejs-and-io-js-are-now-one/), Node.js v4.0.0 is 8% faster than Node.js v0.12.
- Tony Pujals, evangelism WG member, posts an [entry about Node.js v4.0.0](https://www.linkedin.com/pulse/node-v400-here-tony-pujals), He discusses ES6 in Node.js v4.0.0, LTS, and SemVer.

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

- [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
- [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin, Colombia
- [EmpireNode](http://2015.empirenode.org/), October 23rd at New York, US.
- [NodeFest](http://nodefest.jp/2015/), November 7th at Tokyo, Japan
- [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.
- [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain
- [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8-9 at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
