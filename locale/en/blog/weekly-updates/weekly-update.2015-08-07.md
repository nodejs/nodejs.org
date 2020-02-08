---
title: Weekly Update - Aug 7th, 2015
author: Steven Sinatra (@diagramatics)
date: 2015-08-07T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2015-08-07
layout: blog-post.hbs
---

### io.js and Node.js News — August 7th
io.js v3.0 and the new goodness, breaking changes, and our ongoing call for an LTS build V8 maintainer.

### io.js v3.0 Release

This week, io.js [v3.0.0](https://iojs.org/dist/v3.0.0/) is released! Since this is a major version bump, new features have been introduced to io.js. These are:

* V8 upgrade from v4.2 to v4.4. Rod Vagg ([@rvagg](http://twitter.com/rvagg)) has [a Gist containing the changelogs of v4.3 and v4.4](https://gist.github.com/rvagg/1f115074cb3c890985bf).
* Computed property names (`{['foo'+'bar']:'bam'}`) is now shipped without the need for any `harmony-` flag.
* Unicode escape sequence (`\u{xxxxx}`) is also shipped. There is no need for the `--harmony` option anymore.
* Previously classes are available but built-in Array subclasses are not supported or [problematic](https://code.google.com/p/v8/issues/detail?can=2&q=3930&colspec=ID%20Type%20Status%20Priority%20Owner%20Summary%20HW%20OS%20Area%20Stars&id=3930). The new version of V8 has solved this problem.
* The spread operator (`...`) is supported with the `--es-staging` flag. This allows you to use it in places where multiple arguments (for function calls) or multiple elements (for array literals) are expected.
* The Rest parameters (`function(...args) {}`) are implemented behind the `--es-staging` flag as well.
* REPL now gets a history file. Previously REPL needs to specify `NODE_REPL_HISTORY_FILE` but the current version will have the history saved by default.
* Buffer is now a subclass of Uint8Array.
* The `smalloc` module has been removed, and the `freelist` module has now been deprecated.

With a major version bump, there are also breaking changes. These include:

* Changes on `Buffer.concat`, `dgram send()` error and `http` server timing behaviors.
* The upgrade on V8, which gives the need for recompiling of all native add-ons and the new `Maybe<>` and `MaybeLocal<>` types for add-on authors to transition to these new APIs as soon as possible.
* HTTP status codes. The code mappings conform to the [IANA standard](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml) now and will be a backwards incompatible change to consumers that depend on the text value of a header.
* The HTTP agent `.getName()`, which fixes the unnecessary extra colon at the end of the return values.

You can find out more information about this release in the [complete changelog](https://github.com/nodejs/node/blob/master/CHANGELOG.md), the [Breaking Changes document](https://github.com/nodejs/node/wiki/Breaking-Changes#300-from-2x) and the [pull request for the release proposal](https://github.com/nodejs/node/pull/2299). In addition, [Yosuke Furukawa](https://twitter.com/yosuke_furukawa) has made a [repo with details about the new features](https://github.com/yosuke-furukawa/iojs-new-features).

#### Notable changes

* **buffer**:
  * Due to changes in V8, it has been necessary to reimplement `Buffer` on top of V8's `Uint8Array`. Every effort has been made to minimize the performance impact, however `Buffer` instantiation is measurably slower. Access operations may be faster in some circumstances but the exact performance profile and difference over previous versions will depend on how `Buffer` is used within applications. (Trevor Norris) [#1825](https://github.com/nodejs/node/pull/1825).
  * `Buffer` can now take `ArrayBuffer`s as a constructor argument (Trevor Norris) [#2002](https://github.com/nodejs/node/pull/2002).
  * When a single buffer is passed to `Buffer.concat()`, a new, copied `Buffer` object will be returned; previous behavior was to return the original `Buffer` object (Sakthipriyan Vairamani) [#1937](https://github.com/nodejs/node/pull/1937).
* **build**: PPC support has been added to core to allow compiling on pLinux BE and LE (AIX support coming soon) (Michael Dawson) [#2124](https://github.com/nodejs/node/pull/2124).
* **dgram**: If an error occurs within `socket.send()` and a callback has been provided, the error is only passed as the first argument to the callback and not emitted on the `socket` object; previous behavior was to do both (Matteo Collina & Chris Dickinson) [#1796](https://github.com/nodejs/node/pull/1796)
* **freelist**: Deprecate the undocumented `freelist` core module (Sakthipriyan Vairamani) [#2176](https://github.com/nodejs/node/pull/2176).
* **http**:
  * Status codes now all use the official [IANA names](http://www.iana.org/assignments/http-status-codes) as per [RFC7231](https://tools.ietf.org/html/rfc7231), e.g. `http.STATUS_CODES[414]` now returns `'URI Too Long'` rather than `'Request-URI Too Large'` (jomo) [#1470](https://github.com/nodejs/node/pull/1470).
  * Calling .getName() on an HTTP agent no longer returns a trailing colon, HTTPS agents will no longer return an extra colon near the middle of the string (Brendan Ashworth) [#1617](https://github.com/nodejs/node/pull/1617).
* **node**:
  * `NODE_MODULE_VERSION` has been bumped to `45` to reflect the break in ABI (Rod Vagg) [#2096](https://github.com/nodejs/node/pull/2096).
  * Introduce a new `process.release` object that contains a `name` property set to `'io.js'` and `sourceUrl`, `headersUrl` and `libUrl` (Windows only) properties containing URLs for the relevant resources; this is intended to be used by node-gyp (Rod Vagg) [#2154](https://github.com/nodejs/node/pull/2154).
  * The version of node-gyp bundled with io.js now downloads and uses a tarball of header files from iojs.org rather than the full source for compiling native add-ons; it is hoped this is a temporary floating patch and the change will be upstreamed to node-gyp soon (Rod Vagg) [#2066](https://github.com/nodejs/node/pull/2066).
* **repl**: Persistent history is now enabled by default. The history file is located at ~/.node_repl_history, which can be overridden by the new environment variable `NODE_REPL_HISTORY`. This deprecates the previous `NODE_REPL_HISTORY_FILE` variable. Additionally, the format of the file has been changed to plain text to better handle file corruption. (Jeremiah Senkpiel) [#2224](https://github.com/nodejs/node/pull/2224).
* **smalloc**: The `smalloc` module has been removed as it is no longer possible to provide the API due to changes in V8 (Ben Noordhuis) [#2022](https://github.com/nodejs/node/pull/2022).
* **tls**: Add `server.getTicketKeys()` and `server.setTicketKeys()` methods for [TLS session key](https://www.ietf.org/rfc/rfc5077.txt) rotation (Fedor Indutny) [#2227](https://github.com/nodejs/node/pull/2227).
* **v8**: Upgraded to 4.4.63.26
  * ES6: Enabled [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)
  * ES6: `Array` can now be subclassed in strict mode
  * ES6: Implement [rest parameters](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters) in staging, use the `--harmony-rest-parameters` command line flag
  * ES6: Implement the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) in staging, use the `--harmony-spreadcalls` command line flag
  * Removed `SetIndexedPropertiesToExternalArrayData` and related APIs, forcing a shift to `Buffer` to be reimplemented based on `Uint8Array`
  * Introduction of `Maybe` and `MaybeLocal` C++ API for objects which _may_ or _may not_ have a value.
  * Added support for PPC

See also https://github.com/nodejs/node/wiki/Breaking-Changes#300-from-2x for a summary of the breaking changes (SEMVER-MAJOR).

#### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760).
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Community Updates

* We *still* need a V8 maintainer for our LTS build! Head on over [to GitHub](https://github.com/nodejs/LTS/issues/28) to see if the requirements match your capabilities.
* [webkid.io](http://webkid.io) co-founder [Moritz Klack](http://twitter.com/moklick) has written about [creating a REST API with Hapi, Dogwater and Bedwetter](http://blog.webkid.io/how-to-create-a-rest-api-with-hapi/).
* [RisingStack](http://risingstack.com) CEO [Gergely Nemeth](http://twitter.com/nthgergo) has a post in the company blog about [using GraphQL with Graffiti](https://blog.risingstack.com/start-using-graphql-with-graffiti/).
* [Samsung banks on JavaScript, Node.js for IoT](http://www.infoworld.com/article/2953719/javascript/samsung-banks-on-javascript-node-js-for-iot.html), as reported by [Paul Krill](https://twitter.com/pjkrill), editor at large at [InfoWorld](http://www.infoworld.com/).

If you have spotted or written something about Node.js and io.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

* [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
* [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
* [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
* [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin

Have an event about Node.js and io.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
