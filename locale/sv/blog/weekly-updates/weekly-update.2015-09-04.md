---
title: Weekly Update - Sep 4th, 2015
author: Yosuke Furukawa (@yosuke-furukawa)
date: 2015-09-04T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-09-04
layout: blog-post.hbs
---

### Node.js News — September 4th
Node.js v4.0.0 is released

### Node.js v4.0.0

This week is the most historical week. Finally we have released Node.js v4.0.0(stable). Thanks to the every Node/io.js collaborator. This Node.js is the most stable Node ever. We have reviewed all of patches and the state of the test suite is more stable and there are more active contributors in new Node.

We would like to talk about this news, changes, features. But currently we don't have so much spaces and times. We hope that Node community will post more blog entries or more news.

### Node.js v4.0.0 Notable changes

This list of changes is relative to the last io.js v3.x branch release, v3.3.0. Please see the list of notable changes in the v3.x, v2.x and v1.x releases for a more complete list of changes from 0.12.x. Note, that some changes in the v3.x series as well as major breaking changes in this release constitute changes required for full convergence of the Node.js and io.js projects.

* **child_process**: `ChildProcess.prototype.send()` and `process.send()` operate asynchronously across all platforms so an optional callback parameter has been introduced that will be invoked once the message has been sent, i.e. `.send(message[, sendHandle][, callback])` (Ben Noordhuis) [#2620](https://github.com/nodejs/node/pull/2620).
* **node**: Rename "io.js" code to "Node.js" (cjihrig) [#2367](https://github.com/nodejs/node/pull/2367).
* **node-gyp**: This release bundles an updated version of node-gyp that works with all versions of Node.js and io.js including nightly and release candidate builds. From io.js v3 and Node.js v4 onward, it will only download a headers tarball when building addons rather than the entire source. (Rod Vagg) [#2700](https://github.com/nodejs/node/pull/2700)
* **npm**: Upgrade to version 2.14.2 from 2.13.3, includes a security update, see https://github.com/npm/npm/releases/tag/v2.14.2 for more details, (Kat Marchán) [#2696](https://github.com/nodejs/node/pull/2696).
* **timers**: Improved timer performance from porting the 0.12 implementation, plus minor fixes (Jeremiah Senkpiel) [#2540](https://github.com/nodejs/node/pull/2540), (Julien Gilli) [nodejs/node-v0.x-archive#8751](https://github.com/nodejs/node-v0.x-archive/pull/8751) [nodejs/node-v0.x-archive#8905](https://github.com/nodejs/node-v0.x-archive/pull/8905)
* **util**: The `util.is*()` functions have been deprecated, beginning with deprecation warnings in the documentation for this release, users are encouraged to seek more robust alternatives in the npm registry, (Sakthipriyan Vairamani) [#2447](https://github.com/nodejs/node/pull/2447).
* **v8**: Upgrade to version 4.5.103.30 from 4.4.63.30 (Ali Ijaz Sheikh) [#2632](https://github.com/nodejs/node/pull/2632).
  * Implement new `TypedArray` prototype methods: `copyWithin()`, `every()`, `fill()`, `filter()`, `find()`, `findIndex()`, `forEach()`, `indexOf()`, `join()`, `lastIndexOf()`, `map()`, `reduce()`, `reduceRight()`, `reverse()`, `slice()`, `some()`, `sort()`. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray for further information.
  * Implement new `TypedArray.from()` and `TypedArray.of()` functions. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray for further information.
  * Implement arrow functions, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions for further information.
  * Full ChangeLog available at https://github.com/v8/v8-git-mirror/blob/4.5.103/ChangeLog

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some uses of computed object shorthand properties are not handled correctly by the current version of V8. e.g. `[{ [prop]: val }]` evaluates to `[{}]`. [#2507](https://github.com/nodejs/node/issues/2507)
* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Node.js v4.0.0(stable) entry is posted

* We have posted [Node v4.0.0](https://nodejs.org/en/blog/release/v4.0.0/) entry. This entry has more details about Node.js v4.0.0.

### We are creating the list of modules that currently do not work with Node.js v4.0.0

* We are listing modules that do not work with Node.js v4.0.0, If you have some troubles in your modules with Node.js v4.0.0, please provide information in this [issue](https://github.com/nodejs/node/issues/2798).

### Community Updates

* We *still* need a V8 maintainer for our LTS build! Head on over [to GitHub](https://github.com/nodejs/LTS/issues/28) to see if the requirements match your capabilities.
* Jeremiah Senkpiel, Node TSC member, has introduced Node.js v4.0.0 deeply. Please check [this blog](https://medium.com/@nodesource/node-js-v4-0-0-node-at-its-best-54a93fd2e0c6)
* Daniel Khan posted the entry about Node.js v4.0 performance, features and LTS. His entry will help your [migration](http://apmblog.dynatrace.com/2015/09/05/all-you-need-to-know-about-node-js-4-0/).

If you have spotted or written something about Node.js and io.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [EmpireNode](http://2015.empirenode.org/), October 23rd at New York, US.
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin, Colombia
* [NodeFest](http://nodefest.jp/2015/), November 7th at Tokyo, Japan
* [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.
* [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain

Have an event about Node.js and io.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
