---
title: Weekly Update - Jul 31st, 2015
author: Steven Sinatra (@diagramatics)
date: 2015-07-31T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-07-31
layout: blog-post.hbs
---

### io.js and Node.js News — July 31st
io.js v2.5.0 and our call for an LTS build V8 maintainer.

### io.js 2.5 Release

This week we have released io.js [v2.5.0](https://iojs.org/dist/v2.5.0/). The complete changelog for this version and previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

### Notable changes

* **https**: TLS sessions in Agent are reused (Fedor Indutny) [#2228](https://github.com/nodejs/node/pull/2228)
* **src**: base64 decoding is now 50% faster (Ben Noordhuis) [#2193](https://github.com/nodejs/node/pull/2193)
* **npm**: Upgraded to v2.13.2, release notes can be found in <https://github.com/npm/npm/releases/tag/v2.13.2> (Kat Marchán) [#2241](https://github.com/nodejs/node/pull/2241).

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760).
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Community Updates

* We need a V8 maintainer for our LTS build! Head on over [to GitHub](https://github.com/nodejs/LTS/issues/28) to see if the requirements match your capabilities.
* [Milo Mordaunt](https://twitter.com/bananaoomarang) has written about [extending IFTTT with Webtask.io running Node.js code](https://auth0.com/blog/2015/07/28/if-this-then-node-dot-js-extending-ifttt-with-webtask-dot-io/) over on [Auth0](https://auth0.com/blog).
* [Hemanth.HM](https://twitter.com/gnumanth), an author and contributor of more than 200 modules on npm, has written about [authoring Node modules](http://h3manth.com/new/blog/2015/authoring-node-modules/).

If you have spotted or written something about Node.js and io.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin

Have an event about Node.js and io.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
