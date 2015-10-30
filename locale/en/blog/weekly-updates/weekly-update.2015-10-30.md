---
title: Weekly Update - Oct 30th, 2015
author: Minwoo Jung (@jmwsoft)
date: 2015-10-30T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-10-30
layout: blog-post.hbs
---

### Node.js News — October 30th
Node.js Release Proposal: v4.2.2 "Argon" (LTS), v5.0.0 (Stable)

### Node.js Release Proposal: v4.2.2 "Argon" (LTS), v5.0.0 (Stable)

This week we have two release proposals: [Node.js v4.2.2 "Argon" (LTS)](https://github.com/nodejs/node/pull/3588) and [Node.js v5.0.0](https://github.com/nodejs/node/pull/3466). Complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

### Notable changes : v4.2.2 "Argon" (LTS)

* buffer: fix value check for writeUInt{B,L}E (Trevor Norris) [#3500](https://github.com/nodejs/node/pull/3500)
* buffer: don't CHECK on zero-sized realloc (Ben Noordhuis) [#3499](https://github.com/nodejs/node/pull/3499)

### Notable changes : v5.0.0 (Stable)

* **buffer**: _(Breaking)_ Removed both `'raw'` and `'raws'` encoding types from `Buffer`, these have been deprecated for a long time (Sakthipriyan Vairamani) [#2859](https://github.com/nodejs/node/pull/2859).
* **console**: _(Breaking)_ Values reported by `console.time()` now have 3 decimals of accuracy added (Michaël Zasso) [#3166](https://github.com/nodejs/node/pull/3166).

### Node.js foundation is considering an iteration on the official logo

* [Please click here](https://github.com/nodejs/evangelism/issues/179) to post images and ideas. 
* The Marketing Committee will look over ideas at some point in the future and potentially select one or take some of the ideas/direction and handoff to a designer.
* Final logo will have to be approved by the Board of Directors.

### Community Updates

* [NodeSource - Need to Node Ep.3: Office Hours with Rod Vagg](https://vimeo.com/143308094), "Rod answers questions about the Node.js TSC, discusses what is happening with Node.js, provides updates on how the reconciliation of Node.js & io.js is going and outlines what's coming up next with Node.js."
* [Using Node.js for everything](https://codek.tv/2095), "Charlie Key, CEO at Modulus, covers how a fast-moving company can use Node.js and JavaScript for basically everything and succeed."
* [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/), "checklist to help you guide through the must have security checks before your application is enabled to thousands of users/customers."
* [IBM acquires StrongLoop, helping clients extend their enterprise reach](http://www.thoughtsoncloud.com/2015/09/ibm-acquires-strongloop-helping-clients-extend-their-enterprise-reach/), "IBM announced that it acquired StrongLoop to help you accelerate your digital transformation."

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [NodeFest](http://nodefest.jp/2015/), November 7th at Tokyo, Japan
* [Node Knockout](http://www.nodeknockout.com/), November 7 - 8th, Worldwide
* [Node Girls London](https://nodegirls.typeform.com/to/atW4HR), November 7th at London, UK
* [Playnode](http://playnode.io/), November 12nd at Seoul, South Korea
* [Nodevember](http://nodevember.org/?utm_source=io.js+and+Node.js+News&utm_medium=article), November 14th - 15th at Nashville, Tennessee, US.
* [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain
* [CampJS VI](http://vi.campjs.com), November 20 – 23th at Queensland, Australia
* [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8-9th at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
