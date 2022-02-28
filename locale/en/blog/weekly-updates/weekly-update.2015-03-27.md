---
title: Weekly Update - Mar 27th, 2015
author: Yosuke Furukawa (yosuke-furukawa)
date: 2015-03-27T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-03-27
layout: blog-post.hbs
---

# io.js 1.6.2 release
This week we had one io.js releases [v1.6.2](https://iojs.org/dist/v1.6.2/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

### 1.6.2

* **Windows**: The ongoing work in improving the state of Windows support has resulted in full test suite passes once again. As noted in the release notes for v1.4.2, CI system and configuration problems prevented it from properly reporting problems with the Windows tests, the problems with the CI and the codebase appear to have been fully resolved.
* **FreeBSD**: A [kernel bug](https://lists.freebsd.org/pipermail/freebsd-current/2015-March/055043.html) impacting io.js/Node.js was [discovered](https://github.com/joyent/node/issues/9326) and a patch has been introduced to prevent it causing problems for io.js (Fedor Indutny) [#1218](https://github.com/nodejs/node/pull/1218).
* **module**: you can now `require('.')` instead of having to `require('./')`, this is considered a bugfix (Michaël Zasso) [#1185](https://github.com/nodejs/node/pull/1185).
* **v8**: updated to 4.1.0.25 including patches for `--max_old_space_size` values above `4096` and Solaris support, both of which are already included in io.js.

## Known issues

* Possible small memory leak(s) may still exist but have yet to be properly identified, details at [#1075](https://github.com/nodejs/node/issues/1075).
* Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
* Not possible to build io.js as a static library [#686](https://github.com/nodejs/node/issues/686)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)

## Community Updates

* Node.js Technical Governance Draft is proposed, you can check the draft [here](https://github.com/joyent/nodejs-advisory-board/pull/30)
* Microsoft Visual Studio team releases Node.js Tools 1.0 for Visual Studio, the release includes rich editor, code completions, interactive window, advanced debugging and profiling. Check [the announcement](http://blogs.msdn.com/b/visualstudio/archive/2015/03/25/node-js-tools-1-0-for-visual-studio.aspx).
* [SPM monitor supports Node.js and io.js](http://blog.sematext.com/2015/03/30/nodejs-iojs-monitoring/), the monitor adds performance monitoring, alerting, and anomaly detection.

## Upcoming Events

* [NodeConf](http://nodeconf.com/) tickets are on sale, June 8th and 9th at Oakland, CA and NodeConf Adventure for June 11th - 14th at Walker Creek Ranch, CA
* [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [nodeSchool tokyo](http://nodejs.connpass.com/event/13182/) will be held in April 12th at Tokyo, Japan
