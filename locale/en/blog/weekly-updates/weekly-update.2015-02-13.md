---
title: Weekly Update - Feb 13th, 2015
author: Tierney Coren (@bnb)
date: 2015-02-13T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-02-13
layout: blog-post.hbs
---

## io.js support added by...

* [Postmark](http://blog.postmarkapp.com/post/110829734198/its-official-were-getting-cozy-with-node-js)
* [node-serialport](https://github.com/voodootikigod/node-serialport/issues/439)
* [Microsoft Azure](http://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-iojs/)

## io.js breaks 10,000 stars on GitHub
On Feb. 13, io.js reached the goal of 10,000 stars on GitHub. We couldn't have done it without the support of the amazing community behind JavaScript. Thank you all!

## io.js 1.2.0 released

* **stream**: Simpler stream construction ([readable-stream/issues#102[(https://github.com/iojs/readable-stream/issues/102))
* **dns**: `lookup()` now supports an `'all'` boolean option, default to `false` but when turned on will cause the method to return an array of all resolved names for an address, see, ([iojs/pull#744](https://github.com/nodejs/node/pull/744))
* **assert**: Remove `prototype` property comparison in `deepEqual()` ([iojs/issues#636](https://github.com/nodejs/node/pull/636)); introduce a `deepStrictEqual()` method to mirror `deepEqual()` but performs strict equality checks on primitives ([iojs/issues#639](https://github.com/nodejs/node/pull/639)).
* **tracing**: Add [LTTng](http://lttng.org/) (Linux Trace Toolkit Next Generation) when compiled with the `--with-lttng option`. Trace points match those available for DTrace and ETW. ([iojs/issues#702](https://github.com/nodejs/node/pull/702))
* **docs**: Lots of doc updates, see individual commits; new Errors page discussing JavaScript errors, V8 specifics, and io.js specific error details.
* **npm** upgrade to 2.5.1
* **libuv** upgrade to 1.4.0, see libuv [ChangeLog](https://github.com/libuv/libuv/blob/v1.x/ChangeLog)
* Add new collaborators:
  * Aleksey Smolenchuk (@lxe)
  * Shigeki Ohtsu (@shigeki)

## Opened our doors to the international community
View the [original article](https://medium.com/@mikeal/how-io-js-built-a-146-person-27-language-localization-effort-in-one-day-65e5b1c49a62) on Medium.

* Added interested contributors to teams for their language.
* Teams registered Twitter accounts for their teams and other relevant social media accounts.
* Teams came up with their own ways of working together, and they became more of "community organizers," as opposed to just "translators"

### Stats for Localizations:

* 146 people signed up to help with the localizations the first day (over 160 signed up now)
* 27 languages communities created the first day (already up to 29)

### Language Communities

* [`iojs-bn`](https://github.com/iojs/iojs-bn) Bengali Community
* [`iojs-cn`](https://github.com/iojs/iojs-cn) Chinese Community
* [`iojs-cs`](https://github.com/iojs/iojs-cs) Czech Community
* [`iojs-da`](https://github.com/iojs/iojs-da) Danish Community
* [`iojs-de`](https://github.com/iojs/iojs-de) German Community
* [`iojs-el`](https://github.com/iojs/iojs-el) Greek Community
* [`iojs-es`](https://github.com/iojs/iojs-es) Spanish Community
* [`iojs-fa`](https://github.com/iojs/iojs-fa) Persian Community
* [`iojs-fi`](https://github.com/iojs/iojs-fi) Finnish Community
* [`iojs-fr`](https://github.com/iojs/iojs-fr) French Community
* [`iojs-he`](https://github.com/iojs/iojs-he) Hebrew Community
* [`iojs-hi`](https://github.com/iojs/iojs-hi) Hindi Community
* [`iojs-hu`](https://github.com/iojs/iojs-hu) Hungarian Community
* [`iojs-id`](https://github.com/iojs/iojs-id) Indonesian Community
* [`iojs-it`](https://github.com/iojs/iojs-it) Italian Community
* [`iojs-ja`](https://github.com/iojs/iojs-ja) Japanese Community
* [`iojs-ka`](https://github.com/iojs/iojs-ka) Georgian Community
* [`iojs-kr`](https://github.com/iojs/iojs-kr) Korean Community
* [`iojs-mk`](https://github.com/iojs/iojs-mk) Macedonian Community
* [`iojs-nl`](https://github.com/iojs/iojs-nl) Dutch Community
* [`iojs-no`](https://github.com/iojs/iojs-no) Norwegian Community
* [`iojs-pl`](https://github.com/iojs/iojs-pl) Polish Community
* [`iojs-pt`](https://github.com/iojs/iojs-pt) Portuguese Community
* [`iojs-ro`](https://github.com/iojs/iojs-ro) Romanian Community
* [`iojs-ru`](https://github.com/iojs/iojs-ru) Russian Community
* [`iojs-sv`](https://github.com/iojs/iojs-sv) Swedish Community
* [`iojs-tr`](https://github.com/iojs/iojs-tr) Turkish Community
* [`iojs-tw`](https://github.com/iojs/iojs-tw) Taiwan Community
* [`iojs-uk`](https://github.com/iojs/iojs-uk) Ukrainian Community

## io.js and Node.js
View the [original article](https://medium.com/@iojs/io-js-and-a-node-js-foundation-4e14699fb7be) on Medium.

* Scott Hammond, CEO of Joyent, expressed his desire to bring io.js back to the Node.js.

### In only a few months io.js...

* Has grown to 23 active core team members
* Has several working groups
* Has 29 language localization teams,
* Has drawn more contributors to the project than we’ve ever had in the history of Node.js, and
* Has been able to release quality software at a good pace with the support of an exceptional community.

> We are eager to put this all behind us but we can’t sacrifice the progress we’ve made or the principles and open governance that got us here.

### The Future

* Talks with the Node.js foundation are ongoing.
* Once the foundation has a technical governance model you will see an issue on io.js’ GitHub about whether io.js should join.

  * This will be discussed and voted on openly in a public TC meeting following the governance rules we’ve already built.

> For the community, nothing has changed.

### What to do right now

* Continue to send your pull requests to io.js
* Join one of the 27 [language localization teams](https://github.com/iojs/website/issues/125)
* Contribute to io.js’ working groups ([streams](https://github.com/iojs/readable-stream), [website](https://github.com/iojs/website), [evangelism](https://github.com/iojs/website/labels/evangelism), [tracing](https://github.com/iojs/tracing-wg), [build](https://github.com/iojs/build), [roadmap](https://github.com/iojs/roadmap)) and
* Continue to adopt io.js in your applications.
