---
title: Weekly Update - Oct 2nd, 2015
author: Minwoo Jung (@jmwsoft)
date: 2015-10-02T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-10-02
layout: blog-post.hbs
---

### Node.js News — October 2nd
Node.js v4.1.2 release proposal

### Node.js v4.1.2 Release proposal

This week we have one release proposal: [Node.js v4.1.2](https://github.com/nodejs/node/pull/3128), complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/master/CHANGELOG.md).

### Node.js v4.1.2 Notable changes

* **buffer**: Fixed a bug introduced in v4.1.0 where allocating a new zero-length buffer can result in the _next_ allocation of a TypedArray in JavaScript not being zero-filled. In certain circumstances this could result in data leakage via reuse of memory space in TypedArrays, breaking the normally safe assumption that TypedArrays should be always zero-filled. (Trevor Norris) [#2931](https://github.com/nodejs/node/pull/2931).
* **http**: Guard against response-splitting of HTTP trailing headers added via [`response.addTrailers()`](https://nodejs.org/api/http.html#http_response_addtrailers_headers) by removing new-line (`[\r\n]`) characters from values. Note that standard header values are already stripped of new-line characters. The expected security impact is low because trailing headers are rarely used. (Ben Noordhuis) [#2945](https://github.com/nodejs/node/pull/2945).
* **npm**: Upgrade to npm 2.14.4 from 2.14.3, see [release notes](https://github.com/npm/npm/releases/tag/v2.14.4) for full details (Kat Marchán) [#2958](https://github.com/nodejs/node/pull/2958)
  * Upgrades `graceful-fs` on multiple dependencies to no longer rely on monkey-patching `fs`
  * Fix `npm link` for pre-release / RC builds of Node
* **v8**: Update post-mortem metadata to allow post-mortem debugging tools to find and inspect:
  * JavaScript objects that use dictionary properties (Julien Gilli) [#2959](https://github.com/nodejs/node/pull/2959)
  * ScopeInfo and thus closures (Julien Gilli) [#2974](https://github.com/nodejs/node/pull/2974)

### Node.js Help Repository

[Node.js Help](https://github.com/nodejs/help) is open. Need help with Node? Please feel free to ask.
Want to help others with issues? You can start simply, by answering open questions.

Please do come over to our [Node.js Help](https://github.com/nodejs/help) to create a new issue if you have any questions.

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Security Updates

* [CVE-2015-7384 Denial of Service Vulnerability](https://groups.google.com/forum/#!topic/nodejs-sec/fSNEQiuof6I), "A new v4.x release on **Monday the 5th of October 2015** will be made available with appropriate fixes for this vulnerability along with disclosure of the details of the bug to allow for complete impact assessment by users"
* Please subscribe to the low-volume announcement-only **nodejs-sec** mailing list at https://groups.google.com/forum/#!forum/nodejs-sec to stay up to date with security vulnerabilities in Node.js and the projects maintained in the **nodejs** [GitHub organization](http://github.com/nodejs/).

Please contact secu...@nodejs.org if you wish to report a vulnerability in Node.js.

### Community Updates

* [StrongLoop introduces Arrow functions](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/), "Arrow functions serve two main purposes: more concise syntax and sharing lexical this with the parent scope."

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin, Colombia
* [EmpireNode](http://2015.empirenode.org/), October 23rd at New York, US.
* [NodeFest](http://nodefest.jp/2015/), November 7th at Tokyo, Japan
* [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.
* [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain
* [CampJS VI](http://vi.campjs.com), November 20 – 23th at Queensland, Australia
* [Playnode](https://playnode.io), call-for-proposals, November, Korea
* [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8-9 at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
