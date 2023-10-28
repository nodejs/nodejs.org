---
date: '2015-02-27T12:00:00.000Z'
category: weekly
title: Weekly Update - Feb 27th, 2015
layout: blog-post.hbs
author: 'Emily Rose (@emilyrose)'
---

# io.js 1.4.1 Release

_Note: version **1.4.0** was tagged and built but not released. A libuv bug was discovered in the process so the release was aborted. We have jumped to 1.4.1 to avoid confusion._

## Notable changes

- **process** / **promises**: An`'unhandledRejection'` event is now emitted on `process` whenever a `Promise` is rejected and no error handler is attached to the `Promise` within a turn of the event loop. A `'rejectionHandled'` event is now emitted whenever a `Promise` was rejected and an error handler was attached to it later than after an event loop turn. [#758](https://github.com/nodejs/node/pull/758) (Petka Antonov)
- **streams**: you can now use regular streams as an underlying socket for `tls.connect()` [#926](https://github.com/nodejs/node/pull/926) (Fedor Indutny)
- **http**: A new `'abort'` event emitted when a `http.ClientRequest` is aborted by the client. [#945](https://github.com/nodejs/node/pull/945) (Evan Lucas)
- **V8**: Upgrade V8 to 4.1.0.21. Includes an embargoed fix, details should be available when embargo is lifted. A breaking ABI change has been held back from this upgrade, possibly to be included when io.js merges V8 4.2. See [#952](https://github.com/nodejs/node/pull/952) for discussion.
- **npm**: Upgrade npm to 2.6.0. Includes features to support the new registry and to prepare for `npm@3`. See [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v260-2015-02-12) for details. Summary:
  - [#5068](https://github.com/npm/npm/issues/5068) Add new logout command, and make it do something useful on both bearer-based and basic-based authed clients.
  - [#6565](https://github.com/npm/npm/issues/6565) Warn that `peerDependency` behavior is changing and add a note to the docs.
  - [#7171](https://github.com/npm/npm/issues/7171) Warn that `engineStrict` in `package.json` will be going away in the next major version of npm (coming soon!)
- **libuv**: Upgrade to 1.4.2. See [libuv ChangeLog](https://github.com/libuv/libuv/blob/v1.x/ChangeLog) for details of fixes.

## ARM offers support for io.js on ARMv8

ARM contacted Rod Vagg, lead of the io.js Build Working Group, to offer their support to the io.js project. ARM and their hardware partners are on track to make ARMv8 a viable server platform and the nimble nature of server-side JavaScript make it a perfect fit to run on the new ARM.

Since ARMv8 is already being adopted by mobile device manufacturers, newer versions of V8 already have good support. Because of V8's pivotal role in Android, io.js is perfectly suited to track that support, and even contribute to it given our new relationships with the V8 team.

From the beginning of the io.js project, Rod has championed the role of ARM for io.js, for IoT, hobbyist, and server use. We already have ARMv6 builds of each release for devices such as Raspberry Pi. and ARMv7 builds for many more popular devices (including the Online Labs ARM-based cloud platform, who have also offered help to io.js). ARMv8 is the logical extension of this, but also has exciting potential for server-side applications, particularly given the new 64-bit support.

The build team is in the process of being given access to the Linaro ARMv8 Server Cluster for integration with the io.js CI platform, which should eventually lead to regular ARMv8 binary releases.

## Community Updates

- [**Reconciliation Proposal**](https://github.com/nodejs/node/issues/978): The io.js project is preparing a plan for reconciliation that can be brought to The Node.js Foundation. Input from the community is very important at this early stage so please leave a comment.
- **New internal C++ Streams API**: A [fresh C++ Streams API](https://github.com/nodejs/node/commit/b9686233fc0be679d7ba1262b611711629ee334e) landed in io.js this week, allowing you to wrap a TLS stream into another TLS stream.
- **io.js Roadmap**: [The Roadmap](https://github.com/nodejs/node/blob/v1.x/ROADMAP.md) is the plan for the future of io.js. It presents the plans for the stability policy, and lists what the immediate priorities for io.js as a whole are.
- **Roadmap Slides Finished and Ready for Translation**: The set of introductory slides for the Roadmap of io.js [have been finished, and are ready for translation](https://github.com/iojs/roadmap/issues/18). Do you think you could present them to a group near you? Comment and we'll work with you to prepare you to present!
- **Microsoft io.js How-To for Azure Websites**: Microsoft [published a how-to](http://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-iojs/) tutorial for their Azure platform that describes how to use io.js with Azure Websites.
- **Floobits moves to io.js**: The code pairing software Floobits [converted their platform to io.js](https://news.floobits.com/2015/02/23/on-moving-to-io.js/), in part because of frustration with Node's slower release cycle, because the inclusion of more ES6 features without the need for the `--harmony` flag, and because they felt changes from 0.10.0 to 0.12.0 weren't very big.
- **Anand Mani Sankar's _Node.js vs io.js: Why the fork?!?_**: Anand wrote a good, for the most part objective, [post about the recent history of io.js](http://anandmanisankar.com/posts/nodejs-iojs-why-the-fork/#.VO82hE60PVw.twitter), and what we hope to achieve with it. A good read for people who aren't engaged in the community to catch up with.
- **iojs-jp - New io.js Japanese Blog**: The iojs-jp community has created a [localized io.js related blog](http://blog.iojs.jp/) to disseminate content in their language. If you're interested, take a look!
- **iojs-cn - New io.js Chinese Blog**: Similarly to the iojs-jp community, the iojs-cn community created a [localized blog](http://cn.iojs.org/) to publish posts about io.js to in their language. Make sure to visit if you're curious about iojs-cn or Chinese news about io.js!
- **[Roadmap Slides Review](https://www.youtube.com/watch?v=etI_UD4wXlo)** - A review of the roadmap slides before they were released to ensure they met with the message the project upholds.

## io.js Support Added

- **[Wallaby.js](http://wallabyjs.com/)**, a while-you-write testing library for JavaScript, hit version 1.0 and [added support for io.js](http://dm.gl/2015/02/23/wallaby-version-one/)!
- **[jsdom](https://github.com/tmpvar/jsdom)**, an implementation of the WHATWG DOM and HTML standards, just hit [version 4.0.0](https://github.com/tmpvar/jsdom/blob/master/Changelog.md#400), which added a _requirement_ of io.js.
- **[give](https://github.com/mmalecki/give)**'s creator [tweeted](https://twitter.com/maciejmalecki/status/569629100215816192) that newer versions of give support io.js. Give is a git-based Node.js/io.js version manager.
- The **Firebase Realtime Client**, the official web/Node.js JavaScript client for Firebase, [tweeted](https://twitter.com/FirebaseRelease/status/570000737343647744) that they added support for io.js in [version 2.2.1](https://www.firebase.com/docs/web/changelog.html#section-realtime-client)
- **Semaphore**, a hosted continuous integrations service, [tweeted](https://twitter.com/semaphoreapp/status/570987355005431809) about added io.js support in their [Platform update on February 24th, 2015](https://semaphoreapp.com/blog/2015/02/17/platform-update-on-february-24th.html).
