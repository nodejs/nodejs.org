---
date: '2015-09-18T12:00:00.000Z'
category: weekly
title: Weekly Update - Sep 18th, 2015
layout: blog-post.hbs
author: 'Yosuke Furukawa (@yosuke-furukawa)'
---

### Node.js News — September 18th

Node.js v4.1.1 is released

### Node.js v4.1.1 Releases

This week we have one release: [Node.js v4.1.1](https://nodejs.org/dist/v4.1.1/), complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

### Node.js v4.1.1 Notable changes

- **buffer**: Fixed a bug introduced in v4.1.0 where allocating a new zero-length buffer can result in the _next_ allocation of a TypedArray in JavaScript not being zero-filled. In certain circumstances this could result in data leakage via reuse of memory space in TypedArrays, breaking the normally safe assumption that TypedArrays should be always zero-filled. (Trevor Norris) [#2931](https://github.com/nodejs/node/pull/2931).
- **http**: Guard against response-splitting of HTTP trailing headers added via [`response.addTrailers()`](https://nodejs.org/api/http.html#http_response_addtrailers_headers) by removing new-line (`[\r\n]`) characters from values. Note that standard header values are already stripped of new-line characters. The expected security impact is low because trailing headers are rarely used. (Ben Noordhuis) [#2945](https://github.com/nodejs/node/pull/2945).
- **npm**: Upgrade to npm 2.14.4 from 2.14.3, see [release notes](https://github.com/npm/npm/releases/tag/v2.14.4) for full details (Kat Marchán) [#2958](https://github.com/nodejs/node/pull/2958)
  - Upgrades `graceful-fs` on multiple dependencies to no longer rely on monkey-patching `fs`
  - Fix `npm link` for pre-release / RC builds of Node
- **v8**: Update post-mortem metadata to allow post-mortem debugging tools to find and inspect:
  - JavaScript objects that use dictionary properties (Julien Gilli) [#2959](https://github.com/nodejs/node/pull/2959)
  - ScopeInfo and thus closures (Julien Gilli) [#2974](https://github.com/nodejs/node/pull/2974)

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
- `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Community Updates

- [NodeSource announced N|Solid](https://nodesource.com/blog/nsolid-enterprise-node-finally), "a platform built on Node.js and designed specifically for the unique needs of the enterprise" with a focus on insight, control and protection.
- [NodeUp nintyone](http://nodeup.com/ninetyone) An Onboarding Show.

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
