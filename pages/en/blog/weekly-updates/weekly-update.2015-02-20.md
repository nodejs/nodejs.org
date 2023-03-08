---
title: Weekly Update - Feb 20th, 2015
author: Tierney Coren (@bnb)
date: 2015-02-20T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-02-20
layout: blog-post.hbs
---

## io.js Releases 1.3.0
Notable changes include:

* **url**: `url.resolve('/path/to/file', '.')` now returns `/path/to/` with the trailing slash, `url.resolve('/', '.')` returns `/` [#278](https://github.com/nodejs/node/pull/278) (Amir Saboury)
* **tls**: The default cipher suite used by `tls` and `https` has been changed to one that achieves Perfect Forward Secrecy with all modern browsers. Additionally, insecure RC4 ciphers have been excluded. If you absolutely require RC4, please specify your own cipher suites. [#826](https://github.com/nodejs/node/pull/826) (Roman Reiss)

## Notable Events in the Community

* **Node Governance** - [William Bert](https://twitter.com/williamjohnbert) created http://nodegovernance.io/ to alert Scott Hammond, CEO of Joyent, of the desire of the community for the io.js open-governance model to be the base upon which the Node Foundation's Technical Committee. The response from the community was _fantastic_!
* **Node.js and io.js Performance Improves** - Raygun.io did performance tests with both Node.js and io.js recently, and both are improving performance with each release! [Read the full article](https://raygun.io/blog/2015/02/node-js-performance-node-js-vs-io-js/).
* **LTTng Basics** - [LTTing Basics](https://asciinema.org/a/16785) with io.js by user jgalar on asciinema
* **io.js Roadmap Slides** - Slide deck for the current roadmap of io.js up.

### io.js Support Added

* [TravisCI](https://travis-ci.org/) added io.js.The day the last Weekly Update was posted, Hiro Asari (あさり) [tweeted](https://twitter.com/hiro_asari/status/566268486012633088) that about 10% of Node projects were running io.js.
* @thlorenz updated [nad](https://github.com/thlorenz/nad), Node Addon Developer, to [support io.js](https://twitter.com/thlorenz/status/566328088121081856)
* [Catberry.js](https://github.com/catberry/catberry) added support for io.js.
* Official mongodb node module supports io.js in [v. 2.0.16 2015-02-16](https://github.com/mongodb/node-mongodb-native/blob/2.0/HISTORY.md).
* [The Native Web](http://www.thenativeweb.io/) now has a [io.js Docker container](https://registry.hub.docker.com/u/thenativeweb/iojs/)
* [DNSChain](https://github.com/okTurtles/dnschain) by [okTurtles](https://okturtles.com/) added support for io.js.
* [TDPAHACLPlugin](https://github.com/neilstuartcraig/TDPAHACLPlugin) and [TDPAHAuthPlugin](https://github.com/neilstuartcraig/TDPAHAuthPlugin) for [actionHero](http://www.actionherojs.com/) now support io.js.
* [node-sass](https://www.npmjs.com/package/node-sass) added support for io.js 1.2 in node-sass [v. 2.0.1](https://github.com/sass/node-sass/issues/655)
* [total.js](https://www.totaljs.com/) added support for io.js in [v. 1.7.1](https://github.com/totaljs/framework/releases/tag/v1.7.1)
* [Clever Cloud](https://www.clever-cloud.com/) added [support for io.js](https://www.clever-cloud.com/blog/features/2015/01/23/introducing-io.js/)

## io.js Working Group Meetings

* io.js Tracing Working Group Meeting - Feb. 19, 2015: [YouTube](https://www.youtube.com/watch?v=wvBVjg8jkv0) - [Minutes](https://docs.google.com/document/d/1_ApOMt03xHVkaGpTEPMDIrtkjXOzg3Hh4ZcyfhvMHx4/edit)
* io.js Build Working Group Meeting - Feb. 19, 2015: [YouTube](https://www.youtube.com/watch?v=OKQi3pTF7fs) - [SoundCloud](https://soundcloud.com/iojs/iojs-build-wg-meeting-2015-02-19) - [Minutes](https://docs.google.com/document/d/1vRhsYBs4Hw6vRu55h5eWTwDzS1NctxdTvMMEnCbDs14/edit)
* io.js Technical Committee Meeting - Feb. 18, 2015: [YouTube](https://www.youtube.com/watch?v=jeBPYLJ2_Yc) - [SoundCloud](https://soundcloud.com/iojs/iojs-tc-meeting-meeting-2015-02-18) - [Minutes](https://docs.google.com/document/d/1JnujRu6Rfnp6wvbvwCfxXnsjLySunQ_yah91pkvSFdQ/edit)
* io.js Website Working Group Meeting - Feb. 16, 2015: [YouTube](https://www.youtube.com/watch?v=UKDKhFV61ZA) - [SoundCloud](https://soundcloud.com/iojs/iojs-website-wg-meeting-2015-02-16) - [Minutes](https://docs.google.com/document/d/1R8JmOoyr64tt-QOj27bD19ZOWg63CujW7GeaAHIIkUs/edit)
