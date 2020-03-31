---
title: Weekly Update - Nov 27th, 2015
author: Minwoo Jung (@jmwsoft)
date: 2015-11-27T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-11-27
layout: blog-post.hbs
---

### Node.js News — November 27th
Node v0.12.8 (LTS) is released

### Node v0.12.8 (LTS) Releases

This week we have one release: [Node v0.12.8 (LTS)](https://nodejs.org/en/blog/release/v0.12.8/). Complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

### Notable changes

* [[`7d11208f68`](https://github.com/nodejs/node/commit/7d11208f68)] - **build**: backport tools/release.sh (Rod Vagg) [#3642](https://github.com/nodejs/node/pull/3642)
* [[`6fb0b92fa0`](https://github.com/nodejs/node/commit/6fb0b92fa0)] - **build**: backport config for new CI infrastructure (Rod Vagg) [#3642](https://github.com/nodejs/node/pull/3642)
* [[`83441616a5`](https://github.com/nodejs/node/commit/83441616a5)] - **build**: fix --without-ssl compile time error (Ben Noordhuis) [#3825](https://github.com/nodejs/node/pull/3825)

### CVE-2015-8027 Denial of Service Vulnerability / CVE-2015-6764 V8 Out-of-bounds Access Vulnerability

* Security release coming on December 1 or December 2 (depending on your timezone) will resolve a denial-of-service vulnerability. Be prepared to update!
* New releases of v0.12.x, v4.x and v5.x will be made available with appropriate fixes for CVE-2015-8027 and CVE-2015-6764 (for v4.x and v5.x only)
* Please contact security@nodejs.org if you wish to report a vulnerability in Node.js.

See https://nodejs.org/en/blog/vulnerability/cve-2015-8027_cve-2015-6764/ for more information.

### NodeUp

* [NodeUp 96](http://nodeup.com/ninetysix): "A Node v5.0 Show" with Rebecca Turner, Rod Vagg, and Rich Trott".

### Community Updates

* [Top Node.js metrics to watch](https://www.oreilly.com/ideas/top-nodejs-metrics-to-watch), "Track key metrics to keep your Node.js apps running smoothly."
* [Why we stopped vendoring our npm dependencies](http://blog.bithound.io/why-we-stopped-vendoring-our-npm-dependencies/), "Should I check my node_modules directory into my repository?"
* [Clearing the air: Is WordPress being rewritten in Node.js and React?](http://wesbos.com/wordpress-calypso-react/), "Almost all front-end tooling is built in Node.js."
* [Massive Memory Gains in Node.js 4.2](http://goldfirestudios.com/blog/140/Massive-Memory-Gains-in-Node.js-4.2), "Not only did we see our memory graphs smooth out significantly, but the total memory usage dropped."

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8th - 9th at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
