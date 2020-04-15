---
title: Weekly Update - Oct 9th, 2015
author: Minwoo Jung (@jmwsoft)
date: 2015-10-09T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-10-09
layout: blog-post.hbs
---

### Node.js News — October 9th
Node.js v4.1.2 is released

### Node.js v4.1.2 Releases

This week we have one release: [Node.js v4.1.2](https://nodejs.org/en/blog/release/v4.1.2/). complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

### Notable changes

* **http**:
  * Fix out-of-order 'finish' event bug in pipelining that can abort execution, fixes DoS vulnerability [CVE-2015-7384](https://github.com/nodejs/node/issues/3138) (Fedor Indutny) [#3128](https://github.com/nodejs/node/pull/3128)
  * Account for pending response data instead of just the data on the current request to decide whether pause the socket or not (Fedor Indutny) [#3128](https://github.com/nodejs/node/pull/3128)
* **libuv**: Upgraded from v1.7.4 to v1.7.5, see [release notes](https://github.com/libuv/libuv/releases/tag/v1.7.5) for details (Saúl Ibarra Corretgé) [#3010](https://github.com/nodejs/node/pull/3010)
  * A better rwlock implementation for all Windows versions
  * Improved AIX support

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Node.js Foundation Welcomes Red Hat as Newest Platinum Member

* The Node.js Foundation, a community-led and industry-backed consortium to advance the development of the Node.js platform, announced Red Hat, Inc. has joined the Foundation as a Platinum member.
* Red Hat joins platinum members, including Famous, IBM, Intel, Joyent, Microsoft and PayPal, to provide support in the adoption, development and long-term success of the Node.js project.

See https://www.redhat.com/en/about/press-releases/red-hat-joins-nodejs-foundation for more information.

### Community Updates

* [StrongLoop provides "An Introduction to JavaScript ES6 Arrow Functions"](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/), "Arrow functions serve two main purposes: more concise syntax and sharing lexical this with the parent scope."

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin, Colombia
* [EmpireNode](http://2015.empirenode.org/), October 23rd at New York, US.
* [NodeFest](http://nodefest.jp/2015/), November 7th at Stack Exchange HQ, Old St
* [Node Girls London](https://nodegirls.typeform.com/to/atW4HR), November 7th at Stack Exchange HQ, Old St
* [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.
* [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain
* [CampJS VI](http://vi.campjs.com), November 20 – 23th at Queensland, Australia
* [Playnode](https://playnode.io), call-for-proposals, November, Korea
* [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8-9 at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
