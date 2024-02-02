---
date: '2015-03-06T12:00:00.000Z'
category: weekly
title: Weekly Update - Mar 6th, 2015
layout: blog-post.hbs
author: 'Ross Kukulinski (@rosskukulinksi)'
---

# io.js 1.5.0 Release

On Friday, March 6th, [@rvagg](https://github.com/rvagg) released io.js [**v1.5.0**](https://iojs.org/dist/latest/). The complete change log can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

- **buffer**: New `Buffer#indexOf()` method, modelled off [`Array#indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf). Accepts a String, Buffer or a Number. Strings are interpreted as UTF8. (Trevor Norris) [#561](https://github.com/nodejs/node/pull/561)
- **fs**: `options` object properties in `'fs'` methods no longer perform a `hasOwnProperty()` check, thereby allowing options objects to have prototype properties that apply. (Jonathan Ong) [#635](https://github.com/nodejs/node/pull/635)
- **tls**: A likely TLS memory leak was reported by PayPal. Some of the recent changes in **stream_wrap** appear to be to blame. The initial fix is in [#1078](https://github.com/nodejs/node/pull/1078), you can track the progress toward closing the leak at [#1075](https://github.com/nodejs/node/issues/1075) (Fedor Indutny).
- **npm**: Upgrade npm to 2.7.0. See [npm CHANGELOG.md](https://github.com/npm/npm/blob/master/CHANGELOG.md#v270-2015-02-26) for details including why this is a semver-minor when it could have been semver-major.
- **TC**: Colin Ihrig (@cjihrig) resigned from the TC due to his desire to do more code and fewer meetings.

## Known issues

- Possible TLS-related memory leak, details at [#1075](https://github.com/nodejs/node/issues/1075).
- Windows still reports some minor test failures and we are continuing to address all of these as a priority. See [#1005](https://github.com/nodejs/node/issues/1005).
- Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
- Not possible to build io.js as a static library [#686](https://github.com/nodejs/node/issues/686)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)

## Community Updates

- You can relax knowing that io.js and latest Node.js [**are not affected**](https://strongloop.com/strongblog/are-node-and-io-js-affected-by-the-freak-attack-openssl-vulnerability/) by the [FREAK Attack](https://freakattack.com/). You are running io.js or the latest version of Node.js, right?

- Walmart is now sponsoring a build machine for the io.js Jenkins CI system. The @iojs/build team is working on creating io.js SunOS binaries (like you can get from nodejs.org). A V8 fix ([iojs/io.js#1079](https://github.com/nodejs/node/pull/1079)) needs to be landed first before more progress can be made.
- We would also like to thank the following companies for contributing hardware and related technology/support/engineering for io.js builds:
  - **Digital Ocean** (mainly Linux)
  - **Rackspace** (mainly Windows)
  - **Voxer** (OS X and FreeBSD)
  - **NodeSource** (ARMv6 & ARMv7)
  - **Linaro** (ARMv8)
  - **Walmart** (SmartOS / Solaris)
- The io.js community has been hard at work on the internationalization of all of its content. There are now over 20 active languages published on [iojs.org](http://iojs.org) and i18n community sites. Additionally, i18n links ([iojs/website#258](https://github.com/iojs/website/pull/258)) have been added to the website footer for easy access. Are we missing your language? [Help us add it!](https://github.com/iojs/website/blob/master/TRANSLATION.md)
- Speaking of translations, the [io.js roadmap presentation](http://roadmap.iojs.org/) has been updated to link to other language versions.

- It seems that **PayPal** is running an experiment comparing [Kappa](https://www.npmjs.com/package/kappa) on io.js vs Node.js 0.12 vs Node.js v0.10. The PayPal team identified a likely TLS memory leak. Initial fix is in [#1078](https://github.com/nodejs/node/pull/1078) and progress towards closing is in [#1075](https://github.com/nodejs/node/issues/1075)

- [**NodeSource**](http://nodesource.com) is now providing io.js [Linux binary](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories) packages for Ubuntu/Debian as well as RHEL/Fedora distributions.
- The io.js [Docker build](https://registry.hub.docker.com/u/library/iojs/) is one of thirteen new [official Docker repositories](http://blog.docker.com/2015/03/thirteen-new-official-repositories-added-in-january-and-february/) added in January and February.

- NodeBots and IoT people should be happy to hear that the just-announced [**Tessel2**](http://blog.technical.io/post/112787427217/tessel-2-new-hardware-for-the-tessel-ecosystem) runs [io.js natively](http://blog.technical.io/post/112888410737/moving-faster-with-io-js).
- [**@maxbeatty**](https://twitter.com/maxbeatty) is working on a new version of the [jsperf.com](http://jsperf.com/) backend, running on io.js and it is entirely [open source](https://github.com/jsperf/jsperf.com). Contributions are welcome!

- [@eranhammer](https://twitter.com/eranhammer) wrote a blog post called [The Node Version Dilemma](http://hueniverse.com/2015/03/02/the-node-version-dilemma/) which discusses the various Node.js / io.js versions and proposes which ones to use and when to use them.

## io.js Support Added

- **[scrypt](https://npmjs.com/scrypt)** now supports io.js. Learn more from this [GitHub issue](https://github.com/barrysteyn/node-scrypt/issues/39)
- **[proxyquire](https://github.com/thlorenz/proxyquire)** v1.3.2 published with support for iojs.
