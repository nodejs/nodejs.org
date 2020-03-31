---
title: Weekly Update - Mar 13th, 2015
author: Julian Duque (julianduque) & Yosuke Furukawa (yosuke-furukawa)
date: 2015-03-13T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-03-13
layout: blog-post.hbs
---

# io.js 1.5.1 Release

On Monday, March 9th, [@rvagg](https://github.com/rvagg) released io.js [v1.5.1](https://iojs.org/dist/v1.5.1/). The complete change log can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

* **tls**: The reported TLS memory leak has been resolved via various commits in this release. Current testing indicated that there _may_ still be some leak problems. Track complete progress at [#1075](https://github.com/nodejs/node/issues/1075).
* **http**: Fixed an error reported at [joyent/node#9348](https://github.com/joyent/node/issues/9348) and [npm/npm#7349](https://github.com/npm/npm/issues/7349). Pending data was not being fully read upon an `'error'` event leading to an assertion failure on `socket.destroy()`. (Fedor Indutny) [#1103](https://github.com/nodejs/node/pull/1103)

## Known issues

* Possible remaining TLS-related memory leak(s), details at [#1075](https://github.com/nodejs/node/issues/1075).
* Windows still reports some minor test failures and we are continuing to address all of these as a priority. See [#1005](https://github.com/nodejs/node/issues/1005).
* Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
* Not possible to build io.js as a static library [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)

## Community Updates

* [Tony Pujals](https://twitter.com/subfuzion) gave [the io.js roadmap presentation](http://roadmap.iojs.org/) to [BayNode](http://www.meetup.com/BayNode/events/220246228/). The video was posted to [vimeo](https://vimeo.com/121707989) on March 9. Slides are available for anyone to give at their [local meetup](mailto:ron.buell@rd.io).
* [Johan Bergström](https://github.com/jbergstroem) is working on getting a patch into [V8](https://codereview.chromium.org/990063002) on behalf of io.js to bring Solaris support back into the latest version
* [NodeUp Episode 84](http://nodeup.com/eightyfour) it's io.js update #1 with [Mikeal Rogers](https://github.com/mikeal), [Trevor Norris](https://github.com/trevnorris) and [Bradley Meck](https://github.com/bmeck)
* [Mikeal Rogers](https://github.com/mikeal) was interviewed for [Descriptive](http://descriptive.audio) podcast on an episoded called [We've Never Had This Many Active Contributors to Core Before](http://descriptive.audio/episodes/12)
* [Mark Wolfe](https://twitter.com/wolfeidau) gave a [talk about io.js](https://twitter.com/wolfeidau/status/575785856545378304) at [@melbjs](https://twitter.com/melbjs) meetup, slides are published [here](https://speakerdeck.com/wolfeidau/iojs-bringing-es6-to-the-node)
* [dockeri.co](http://dockeri.co/) now runs on io.js, you can see the announcement [here](https://twitter.com/wjblankenship/status/575867637680369665)
* [Node.js Advisory Board](https://nodejs.org/about/advisory-board/) are talking about the [io.js/Node.js reconciliation proposal](https://github.com/nodejs/node/issues/978), you can check the meeting minutes [here](https://github.com/joyent/nodejs-advisory-board/blob/master/meetings/2015-03-09/minutes.md#nodejsiojs-reconciliation-bb)

## Upcoming Events

* [NodeConf](http://nodeconf.com/) tickets are on sale, June 8th and 9th at Oakland, CA and NodeConf Adventure for June 11th - 14th at Walker Creek Ranch, CA
* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
