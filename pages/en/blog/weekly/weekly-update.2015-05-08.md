---
date: '2015-05-08T12:00:00.000Z'
category: weekly
title: Weekly Update - May 8th, 2015
layout: blog-post.hbs
author: 'Giovanny Gioyik (@Gioyik) & Daijiro Wachi (@watilde)'
---

# io.js 2.0 releases

This week we had two io.js releases [v2.0.0](https://iojs.org/dist/v2.0.0/) and [v2.0.1](https://iojs.org/dist/v2.0.1/), complete changelog can be found [on GitHub](https://github.com/nodejs/node/blob/v1.x/CHANGELOG.md).

## Notable changes

### 2.0.1

- **async_wrap**: (Trevor Norris) [#1614](https://github.com/nodejs/node/pull/1614)
  - it is now possible to filter by providers
  - bit flags have been removed and replaced with method calls on the binding object
  - _note that this is an unstable API so feature additions and breaking changes won't change io.js semver_
- **libuv**: resolves numerous io.js issues:
  - [#862](https://github.com/nodejs/node/issues/862) prevent spawning child processes with invalid stdio file descriptors
  - [#1397](https://github.com/nodejs/node/issues/1397) fix EPERM error with fs.access(W_OK) on Windows
  - [#1621](https://github.com/nodejs/node/issues/1621) build errors associated with the bundled libuv
  - [#1512](https://github.com/nodejs/node/issues/1512) should properly fix Windows termination errors
- **addons**: the `NODE_DEPRECATED` macro was causing problems when compiling addons with older compilers, this should now be resolved (Ben Noordhuis) [#1626](https://github.com/nodejs/node/pull/1626)
- **V8**: upgrade V8 from 4.2.77.18 to 4.2.77.20 with minor fixes, including a bug preventing builds on FreeBSD

### 2.0.0

- **crypto**: significantly reduced memory usage for TLS (Fedor Indutny & Сковорода Никита Андреевич) [#1529](https://github.com/nodejs/node/pull/1529)
- **net**: `socket.connect()` now accepts a `'lookup'` option for a custom DNS resolution mechanism, defaults to `dns.lookup()` (Evan Lucas) [#1505](https://github.com/nodejs/node/pull/1505)
- **npm**: Upgrade npm to 2.9.0. See the [v2.8.4](https://github.com/npm/npm/releases/tag/v2.8.4) and [v2.9.0](https://github.com/npm/npm/releases/tag/v2.9.0) release notes for details. Notable items:
  - Add support for default author field to make `npm init -y` work without user-input (@othiym23) [npm/npm/d8eee6cf9d](https://github.com/npm/npm/commit/d8eee6cf9d2ff7aca68dfaed2de76824a3e0d9af)
  - Include local modules in `npm outdated` and `npm update` (@ArnaudRinquin) [npm/npm#7426](https://github.com/npm/npm/issues/7426)
  - The prefix used before the version number on `npm version` is now configurable via `tag-version-prefix` (@kkragenbrink) [npm/npm#8014](https://github.com/npm/npm/issues/8014)
- **os**: `os.tmpdir()` is now cross-platform consistent and will no longer returns a path with a trailing slash on any platform (Christian Tellnes) [#747](https://github.com/nodejs/node/pull/747)
- **process**:
  - `process.nextTick()` performance has been improved by between 2-42% across the benchmark suite, notable because this is heavily used across core (Brian White) [#1571](https://github.com/nodejs/node/pull/1571)
  - New `process.geteuid()`, `process.seteuid(id)`, `process.getegid()` and `process.setegid(id)` methods allow you to get and set effective UID and GID of the process (Evan Lucas) [#1536](https://github.com/nodejs/node/pull/1536)
- **repl**:
  - REPL history can be persisted across sessions if the `NODE_REPL_HISTORY_FILE` environment variable is set to a user accessible file, `NODE_REPL_HISTORY_SIZE` can set the maximum history size and defaults to `1000` (Chris Dickinson) [#1513](https://github.com/nodejs/node/pull/1513)
  - The REPL can be placed in to one of three modes using the `NODE_REPL_MODE` environment variable: `sloppy`, `strict` or `magic` (default); the new `magic` mode will automatically run "strict mode only" statements in strict mode (Chris Dickinson) [#1513](https://github.com/nodejs/node/pull/1513)
- **smalloc**: the 'smalloc' module has been deprecated due to changes coming in V8 4.4 that will render it unusable
- **util**: add Promise, Map and Set inspection support (Christopher Monsanto) [#1471](https://github.com/nodejs/node/pull/1471)
- **V8**: upgrade to 4.2.77.18, see the [ChangeLog](https://chromium.googlesource.com/v8/v8/+/refs/heads/4.2.77/ChangeLog) for full details. Notable items:
  - Classes have moved out of staging; the `class` keyword is now usable in strict mode without flags
  - Object literal enhancements have moved out of staging; shorthand method and property syntax is now usable (`{ method() { }, property }`)
  - Rest parameters (`function(...args) {}`) are implemented in staging behind the `--harmony-rest-parameters` flag
  - Computed property names (`{['foo'+'bar']:'bam'}`) are implemented in staging behind the `--harmony-computed-property-names` flag
  - Unicode escapes (`'\u{xxxx}'`) are implemented in staging behind the `--harmony_unicode` flag and the `--harmony_unicode_regexps` flag for use in regular expressions
- **Windows**:
  - Random process termination on Windows fixed (Fedor Indutny) [#1512](https://github.com/nodejs/node/issues/1512) / [#1563](https://github.com/nodejs/node/pull/1563)
  - The delay-load hook introduced to fix issues with process naming (iojs.exe / node.exe) has been made opt-out for native add-ons. Native add-ons should include `'win_delay_load_hook': 'false'` in their binding.gyp to disable this feature if they experience problems . (Bert Belder) [#1433](https://github.com/nodejs/node/pull/1433)
- **Governance**:
  - Rod Vagg (@rvagg) was added to the Technical Committee (TC)
  - Jeremiah Senkpiel (@Fishrock123) was added to the Technical Committee (TC)

## Breaking changes

Full details at https://github.com/nodejs/node/wiki/Breaking-Changes#200-from-1x

- V8 upgrade to 4.2, minor changes to C++ API
- `os.tmpdir()` is now cross-platform consistent and will no longer returns a path with a trailing slash on any platform
- While not a _breaking change_ the 'smalloc' module has been deprecated in anticipation of it becoming unsupportable with a future upgrade to V8 4.4. See [#1451](https://github.com/nodejs/node/issues/1451) for further information.

_Note: a new version of the 'url' module was reverted prior to release as it was decided the potential for breakage across the npm ecosystem was too great and that more compatibility work needed to be done before releasing it. See [#1602](https://github.com/nodejs/node/pull/1602) for further information._

## Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

- Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
- Surrogate pair in REPL can freeze terminal [#690](https://github.com/nodejs/node/issues/690)
- `process.send()` is not synchronous as the docs suggest, a regression introduced in 1.0.2, see [#760](https://github.com/nodejs/node/issues/760) and fix in [#774](https://github.com/nodejs/node/issues/774)
- Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion [#894](https://github.com/nodejs/node/issues/894)
- `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).
- readline: split escapes are processed incorrectly, see [#1403](https://github.com/nodejs/node/issues/1403)

## Community Updates

- Michael Dawson creates [WG proposal](https://github.com/mhdawson/workgroup-proposals) under the Node Foundation.
- Mikeal Rogers wrote about growing up of io.js [on Medium](https://medium.com/node-js-javascript/growing-up-27d6cc8b7c53).
- CodeSchool [blog post](https://www.codeschool.com/blog/2015/05/08/whats-new-in-io-js-2-0-0/) on what's new in io.js 2.0.
- Node Lead TJ Fontaine [steps back](http://blog.nodejs.org/2015/05/08/next-chapter/) from leader.

## Upcoming Events

- [NodeConf Adventure](http://nodeconf.com/) tickets are on sale, June 11th - 14th at Walker Creek Ranch, CA
- [CascadiaJS](http://2015.cascadiajs.com/) tickets are on sale, July 8th - 10th at Washington State
- [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
