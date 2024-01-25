---
date: '2015-10-16T12:00:00.000Z'
category: weekly
title: Weekly Update - Oct 16th, 2015
layout: blog-post.hbs
author: 'Minwoo Jung (@jmwsoft)'
---

### Node.js News — October 16th

Node.js v4.2.1 (LTS), v4.2.0 (LTS) are released

### Node.js v4.2.1 (LTS) and v4.2.0 (LTS) Releases

This week we have two releases: [Node.js v4.2.1 (LTS)](/blog/release/v4.2.1/) and [Node.js v4.2.0 (LTS)](/blog/release/v4.2.0/). Complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

### Notable changes : v4.2.1 (LTS)

- Includes fixes for two regressions
  - Assertion error in WeakCallback - see [#3329](https://github.com/nodejs/node/pull/3329)
  - Undefined timeout regression - see [#3331](https://github.com/nodejs/node/pull/3331)

### Notable changes : v4.2.0 (LTS)

- **icu**: Updated to version 56 with significant performance improvements (Steven R. Loomis) [#3281](https://github.com/nodejs/node/pull/3281)
- **node**:
  - Added new `-c` (or `--check`) command line argument for checking script syntax without executing the code (Dave Eddy) [#2411](https://github.com/nodejs/node/pull/2411)
  - Added `process.versions.icu` to hold the current ICU library version (Evan Lucas) [#3102](https://github.com/nodejs/node/pull/3102)

### Community Updates

- [Node.js v4.2.1 Release Summary and Stats](https://nodesource.com/blog/nodejs-v421-release-summary-and-stats), "Closely tracking the Long Term Support plan, 4.2.0 and 4.2.1 have been released this week as LTS. v4.2.1 has been released to fix two critical regressions in v4.2.0. It is highly suggested you use v4.2.1 instead of v4.2.0"
- [A Hubot Plugin that Helps You to Choose Where to Drink Coffee](http://ditrospecta.com/javascript/plugin/hubot/2015/10/03/hubot-plugin-choose-place-to-drink-coffee.html), "Hubot is a very friendly and easy extensible bot written in Coffeescript"
- [Linux and Node.js in Production using Daemontools and NDT](http://www.serverpals.com/blog/linux-nodejs-in-production-using-daemontools-ndt), "Putting the application to the test with Linux and Node.js in Production using Daemontools and NDT"

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

- [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin, Colombia
- [EmpireNode](http://2015.empirenode.org/), October 23rd at New York, US.
- [NodeFest](http://nodefest.jp/2015/), November 7th at Tokyo, Japan
- [Node Girls London](https://nodegirls.typeform.com/to/atW4HR), November 7th at London, UK
- [Playnode](http://playnode.io/), November 12nd at Seoul, South Korea
- [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.
- [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain
- [CampJS VI](http://vi.campjs.com), November 20 – 23th at Queensland, Australia
- [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8-9 at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
