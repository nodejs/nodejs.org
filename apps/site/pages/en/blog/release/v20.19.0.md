---
date: '2025-03-13T13:18:23.825Z'
category: release
title: Node.js v20.19.0 (LTS)
layout: blog-post
author: Marco Ippolito
---

## 2025-03-13, Version 20.19.0 'Iron' (LTS), @marco-ippolito

This is a special minor release.
Although v20 is in maintenance mode, meaning only patch releases are expected,
an exception was made to backport `require(esm)` due to its importance and impact on the ecosystem.

### Notable Changes

### require(esm) is now enabled by default

Support for loading native ES modules using require() had been available on v20.x under the command line flag --experimental-require-module, and available by default on v22.x and v23.x. In this release, it is now no longer behind a flag on v20.x.

This feature has been tested on v23.x and v22.x, and we are looking for user feedback from v20.x to make more final tweaks before fully stabilizing it.
It now no longer emits a warning unless `--trace-require-module` is explicitly used.
If there happens to be any regressions caused by this feature, users can report it to the Node.js issue tracker. Meanwhile this feature can also be disabled using `--no-experimental-require-module` as a workaround.

With this feature enabled, Node.js will no longer throw `ERR_REQUIRE_ESM` if `require()` is used to load a ES module. It can, however, throw `ERR_REQUIRE_ASYNC_MODULE` if the ES module being loaded or its dependencies contain top-level `await`. When the ES module is loaded successfully by `require()`, the returned object will either be a ES module namespace object similar to what's returned by `import()`, or what gets exported as `"module.exports"` in the ES module.

Users can check `process.features.require_module` to see whether `require(esm)` is enabled in the current Node.js instance. For packages, the `"module-sync"` exports condition can be used as a way to detect `require(esm)` support in the current Node.js instance and allow both `require()` and `import` to load the same native ES module. See [the documentation](https://nodejs.org/docs/latest/api/modules.html#loading-ecmascript-modules-using-require) for more details about this feature.

Contributed by Joyee Cheung in [#55085](https://github.com/nodejs/node/pull/55085)

### Module syntax detection is now enabled by default

Module syntax detection (the `--experimental-detect-module` flag) is now
enabled by default. Use `--no-experimental-detect-module` to disable it if
needed.

Syntax detection attempts to run ambiguous files as CommonJS, and if the module
fails to parse as CommonJS due to ES module syntax, Node.js tries again and runs
the file as an ES module.
Ambiguous files are those with a `.js` or no extension, where the nearest parent
`package.json` has no `"type"` field (either `"type": "module"` or
`"type": "commonjs"`).
Syntax detection should have no performance impact on CommonJS modules, but it
incurs a slight performance penalty for ES modules; add `"type": "module"` to
the nearest parent `package.json` file to eliminate the performance cost.
A use case unlocked by this feature is the ability to use ES module syntax in
extensionless scripts with no nearby `package.json`.

Thanks to Geoffrey Booth for making this work on [#53619](https://github.com/nodejs/node/pull/53619).

### Other Notable Changes

- \[[`285bb4ee14`](https://github.com/nodejs/node/commit/285bb4ee14)] - **crypto**: update root certificates to NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)
- \[[`73b5c16684`](https://github.com/nodejs/node/commit/73b5c16684)] - **(SEMVER-MINOR)** **worker**: add postMessageToThread (Paolo Insogna) [#53682](https://github.com/nodejs/node/pull/53682)
- \[[`de313b2336`](https://github.com/nodejs/node/commit/de313b2336)] - **(SEMVER-MINOR)** **module**: only emit require(esm) warning under --trace-require-module (Joyee Cheung) [#56194](https://github.com/nodejs/node/pull/56194)
- \[[`4fba01911d`](https://github.com/nodejs/node/commit/4fba01911d)] - **(SEMVER-MINOR)** **process**: add process.features.require_module (Joyee Cheung) [#55241](https://github.com/nodejs/node/pull/55241)
- \[[`df8a045afe`](https://github.com/nodejs/node/commit/df8a045afe)] - **(SEMVER-MINOR)** **module**: implement the "module-sync" exports condition (Joyee Cheung) [#54648](https://github.com/nodejs/node/pull/54648)
- \[[`f9dc1eaef5`](https://github.com/nodejs/node/commit/f9dc1eaef5)] - **(SEMVER-MINOR)** **module**: add \_\_esModule to require()'d ESM (Joyee Cheung) [#52166](https://github.com/nodejs/node/pull/52166)

### Commits

- \[[`d84be843e3`](https://github.com/nodejs/node/commit/d84be843e3)] - **benchmark**: add validateStream to styleText bench (Rafael Gonzaga) [#56556](https://github.com/nodejs/node/pull/56556)
- \[[`d8eaf5b9b8`](https://github.com/nodejs/node/commit/d8eaf5b9b8)] - **build**: fix compatibility with V8's `depot_tools` (Richard Lau) [#57330](https://github.com/nodejs/node/pull/57330)
- \[[`1ee4bf9690`](https://github.com/nodejs/node/commit/1ee4bf9690)] - **build**: test macos-13 on GitHub actions (Michaël Zasso) [#56307](https://github.com/nodejs/node/pull/56307)
- \[[`1cc8d69882`](https://github.com/nodejs/node/commit/1cc8d69882)] - **build**: build v8 with -fvisibility=hidden on macOS (Joyee Cheung) [#56275](https://github.com/nodejs/node/pull/56275)
- \[[`52f1f7e22b`](https://github.com/nodejs/node/commit/52f1f7e22b)] - **child_process**: fix parsing messages with splitted length field (Maksim Gorkov) [#56106](https://github.com/nodejs/node/pull/56106)
- \[[`5ef3c3c996`](https://github.com/nodejs/node/commit/5ef3c3c996)] - **crypto**: add missing return value check (Michael Dawson) [#56615](https://github.com/nodejs/node/pull/56615)
- \[[`285bb4ee14`](https://github.com/nodejs/node/commit/285bb4ee14)] - **crypto**: update root certificates to NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)
- \[[`46ceb9dc1c`](https://github.com/nodejs/node/commit/46ceb9dc1c)] - **deps**: update timezone to 2025a (Node.js GitHub Bot) [#56876](https://github.com/nodejs/node/pull/56876)
- \[[`d4ca38fe8e`](https://github.com/nodejs/node/commit/d4ca38fe8e)] - **deps**: macro ENODATA is deprecated in libc++ (Cheng) [#56698](https://github.com/nodejs/node/pull/56698)
- \[[`15214e6508`](https://github.com/nodejs/node/commit/15214e6508)] - **deps**: update simdutf to 6.0.3 (Node.js GitHub Bot) [#56567](https://github.com/nodejs/node/pull/56567)
- \[[`1e44f5d84b`](https://github.com/nodejs/node/commit/1e44f5d84b)] - **deps**: update simdutf to 5.7.2 (Node.js GitHub Bot) [#56388](https://github.com/nodejs/node/pull/56388)
- \[[`b92ff7be38`](https://github.com/nodejs/node/commit/b92ff7be38)] - **deps**: update googletest to 7d76a23 (Node.js GitHub Bot) [#56387](https://github.com/nodejs/node/pull/56387)
- \[[`e1b71a81a9`](https://github.com/nodejs/node/commit/e1b71a81a9)] - **deps**: update googletest to e54519b (Node.js GitHub Bot) [#56370](https://github.com/nodejs/node/pull/56370)
- \[[`c0d45e7f38`](https://github.com/nodejs/node/commit/c0d45e7f38)] - **deps**: update simdutf to 5.7.0 (Node.js GitHub Bot) [#56332](https://github.com/nodejs/node/pull/56332)
- \[[`d69107f5a8`](https://github.com/nodejs/node/commit/d69107f5a8)] - **deps**: update icu to 76.1 (Node.js GitHub Bot) [#55551](https://github.com/nodejs/node/pull/55551)
- \[[`5c9a397699`](https://github.com/nodejs/node/commit/5c9a397699)] - **deps**: V8: backport 9ab40592f697 (Lu Yahan) [#56781](https://github.com/nodejs/node/pull/56781)
- \[[`8342233f6d`](https://github.com/nodejs/node/commit/8342233f6d)] - **deps**: update corepack to 0.31.0 (Node.js GitHub Bot) [#56795](https://github.com/nodejs/node/pull/56795)
- \[[`561493d35e`](https://github.com/nodejs/node/commit/561493d35e)] - **deps,src**: simplify base64 encoding (Daniel Lemire) [#52714](https://github.com/nodejs/node/pull/52714)
- \[[`6207b2936c`](https://github.com/nodejs/node/commit/6207b2936c)] - **doc**: move anatoli to emeritus (Michael Dawson) [#56592](https://github.com/nodejs/node/pull/56592)
- \[[`b0ab483400`](https://github.com/nodejs/node/commit/b0ab483400)] - **doc**: fix styles of the expandable TOC (Antoine du Hamel) [#56755](https://github.com/nodejs/node/pull/56755)
- \[[`53e4dc2a82`](https://github.com/nodejs/node/commit/53e4dc2a82)] - **doc**: add "Skip to content" button (Antoine du Hamel) [#56750](https://github.com/nodejs/node/pull/56750)
- \[[`33ee4645c3`](https://github.com/nodejs/node/commit/33ee4645c3)] - **doc**: improve accessibility of expandable lists (Antoine du Hamel) [#56749](https://github.com/nodejs/node/pull/56749)
- \[[`b514438418`](https://github.com/nodejs/node/commit/b514438418)] - **doc**: add note regarding commit message trailers (Dario Piotrowicz) [#56736](https://github.com/nodejs/node/pull/56736)
- \[[`627f2997e3`](https://github.com/nodejs/node/commit/627f2997e3)] - **doc**: fix typo in example code for util.styleText (Robin Mehner) [#56720](https://github.com/nodejs/node/pull/56720)
- \[[`68548dcb48`](https://github.com/nodejs/node/commit/68548dcb48)] - **doc**: fix inconsistencies in `WeakSet` and `WeakMap` comparison details (Shreyans Pathak) [#56683](https://github.com/nodejs/node/pull/56683)
- \[[`337cfb2549`](https://github.com/nodejs/node/commit/337cfb2549)] - **doc**: add RafaelGSS as latest sec release stewards (Rafael Gonzaga) [#56682](https://github.com/nodejs/node/pull/56682)
- \[[`e890c86d7b`](https://github.com/nodejs/node/commit/e890c86d7b)] - **doc**: clarify cjs/esm diff in `queueMicrotask()` vs `process.nextTick()` (Dario Piotrowicz) [#56659](https://github.com/nodejs/node/pull/56659)
- \[[`978263923f`](https://github.com/nodejs/node/commit/978263923f)] - **doc**: `WeakSet` and `WeakMap` comparison details (Shreyans Pathak) [#56648](https://github.com/nodejs/node/pull/56648)
- \[[`aba280ccd8`](https://github.com/nodejs/node/commit/aba280ccd8)] - **doc**: mention prepare --security (Rafael Gonzaga) [#56617](https://github.com/nodejs/node/pull/56617)
- \[[`0a009a527b`](https://github.com/nodejs/node/commit/0a009a527b)] - **doc**: tweak info on reposts in ambassador program (Michael Dawson) [#56589](https://github.com/nodejs/node/pull/56589)
- \[[`d2f09e2ab3`](https://github.com/nodejs/node/commit/d2f09e2ab3)] - **doc**: add type stripping to ambassadors program (Marco Ippolito) [#56598](https://github.com/nodejs/node/pull/56598)
- \[[`b0b77d7fbe`](https://github.com/nodejs/node/commit/b0b77d7fbe)] - **doc**: improve internal documentation on built-in snapshot (Joyee Cheung) [#56505](https://github.com/nodejs/node/pull/56505)
- \[[`4b3e7fee94`](https://github.com/nodejs/node/commit/4b3e7fee94)] - **doc**: document CLI way to open the nodejs/bluesky PR (Antoine du Hamel) [#56506](https://github.com/nodejs/node/pull/56506)
- \[[`03878b0384`](https://github.com/nodejs/node/commit/03878b0384)] - **doc**: update gcc-version for ubuntu-lts (Kunal Kumar) [#56553](https://github.com/nodejs/node/pull/56553)
- \[[`acbbd7c1a6`](https://github.com/nodejs/node/commit/acbbd7c1a6)] - **doc**: fix parentheses in options (Tobias Nießen) [#56563](https://github.com/nodejs/node/pull/56563)
- \[[`3fe80c30b8`](https://github.com/nodejs/node/commit/3fe80c30b8)] - **doc**: include CVE to EOL lines as sec release process (Rafael Gonzaga) [#56520](https://github.com/nodejs/node/pull/56520)
- \[[`ff8af58046`](https://github.com/nodejs/node/commit/ff8af58046)] - **doc**: add esm examples to node:trace_events (Alfredo González) [#56514](https://github.com/nodejs/node/pull/56514)
- \[[`27b9cfd135`](https://github.com/nodejs/node/commit/27b9cfd135)] - **doc**: add message for Ambassadors to promote (Michael Dawson) [#56235](https://github.com/nodejs/node/pull/56235)
- \[[`020c939da1`](https://github.com/nodejs/node/commit/020c939da1)] - **doc**: allow request for TSC reviews via the GitHub UI (Antoine du Hamel) [#56493](https://github.com/nodejs/node/pull/56493)
- \[[`1ef9c9a354`](https://github.com/nodejs/node/commit/1ef9c9a354)] - **doc**: add example for piping ReadableStream (Gabriel Schulhof) [#56415](https://github.com/nodejs/node/pull/56415)
- \[[`e675c3a7fc`](https://github.com/nodejs/node/commit/e675c3a7fc)] - **doc**: expand description of `parseArg`'s `default` (Kevin Gibbons) [#54431](https://github.com/nodejs/node/pull/54431)
- \[[`bc756da876`](https://github.com/nodejs/node/commit/bc756da876)] - **doc**: use `<ul>` instead of `<ol>` in `SECURITY.md` (Antoine du Hamel) [#56346](https://github.com/nodejs/node/pull/56346)
- \[[`ad59c82a49`](https://github.com/nodejs/node/commit/ad59c82a49)] - **doc**: clarify that WASM is trusted (Matteo Collina) [#56345](https://github.com/nodejs/node/pull/56345)
- \[[`8e76cc69e5`](https://github.com/nodejs/node/commit/8e76cc69e5)] - **doc**: move dual package shipping docs to separate repo (Joyee Cheung) [#55444](https://github.com/nodejs/node/pull/55444)
- \[[`9fda8e29cd`](https://github.com/nodejs/node/commit/9fda8e29cd)] - **doc**: mark `--env-file-if-exists` flag as experimental (Juan José) [#56893](https://github.com/nodejs/node/pull/56893)
- \[[`9e975f1a7d`](https://github.com/nodejs/node/commit/9e975f1a7d)] - **doc**: fix link and history of `SourceMap` sections (Antoine du Hamel) [#57098](https://github.com/nodejs/node/pull/57098)
- \[[`64ce95b8fc`](https://github.com/nodejs/node/commit/64ce95b8fc)] - **doc**: update `require(ESM)` history and stability status (Antoine du Hamel) [#55199](https://github.com/nodejs/node/pull/55199)
- \[[`697a39248b`](https://github.com/nodejs/node/commit/697a39248b)] - **doc**: fix history of `process.features` (Antoine du Hamel) [#54897](https://github.com/nodejs/node/pull/54897)
- \[[`7c38e503a3`](https://github.com/nodejs/node/commit/7c38e503a3)] - **doc**: add documentation for process.features (Marco Ippolito) [#54897](https://github.com/nodejs/node/pull/54897)
- \[[`c85b386a39`](https://github.com/nodejs/node/commit/c85b386a39)] - **esm**: fix jsdoc type refs to `ModuleJobBase` in esm/loader (Jacob Smith) [#56499](https://github.com/nodejs/node/pull/56499)
- \[[`4813a6a66c`](https://github.com/nodejs/node/commit/4813a6a66c)] - **esm**: throw `ERR_REQUIRE_ESM` instead of `ERR_INTERNAL_ASSERTION` (Antoine du Hamel) [#54868](https://github.com/nodejs/node/pull/54868)
- \[[`0d327c8e47`](https://github.com/nodejs/node/commit/0d327c8e47)] - **esm**: refactor `get_format` (Antoine du Hamel) [#53872](https://github.com/nodejs/node/pull/53872)
- \[[`e87db6c9bc`](https://github.com/nodejs/node/commit/e87db6c9bc)] - **events**: add hasEventListener util for validate (Sunghoon) [#55230](https://github.com/nodejs/node/pull/55230)
- \[[`674b932f33`](https://github.com/nodejs/node/commit/674b932f33)] - **http**: don't emit error after destroy (Robert Nagy) [#55457](https://github.com/nodejs/node/pull/55457)
- \[[`4c24ef8f71`](https://github.com/nodejs/node/commit/4c24ef8f71)] - **http2**: omit server name when HTTP2 host is IP address (islandryu) [#56530](https://github.com/nodejs/node/pull/56530)
- \[[`533afe8124`](https://github.com/nodejs/node/commit/533afe8124)] - **lib**: reduce amount of caught URL errors (Yagiz Nizipli) [#52658](https://github.com/nodejs/node/pull/52658)
- \[[`34221a1d6e`](https://github.com/nodejs/node/commit/34221a1d6e)] - **lib**: allow CJS source map cache to be reclaimed (Chengzhong Wu) [#51711](https://github.com/nodejs/node/pull/51711)
- \[[`f13589f1f9`](https://github.com/nodejs/node/commit/f13589f1f9)] - **lib,src**: iterate module requests of a module wrap in JS (Chengzhong Wu) [#52058](https://github.com/nodejs/node/pull/52058)
- \[[`6afee9ea43`](https://github.com/nodejs/node/commit/6afee9ea43)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#56580](https://github.com/nodejs/node/pull/56580)
- \[[`85bb738739`](https://github.com/nodejs/node/commit/85bb738739)] - **meta**: add codeowners of security release document (Rafael Gonzaga) [#56521](https://github.com/nodejs/node/pull/56521)
- \[[`48f9ca0992`](https://github.com/nodejs/node/commit/48f9ca0992)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#56342](https://github.com/nodejs/node/pull/56342)
- \[[`4d724121b4`](https://github.com/nodejs/node/commit/4d724121b4)] - **meta**: move MoLow to TSC regular member (Moshe Atlow) [#56276](https://github.com/nodejs/node/pull/56276)
- \[[`5e2dab7868`](https://github.com/nodejs/node/commit/5e2dab7868)] - **module**: fix bad `require.resolve` with option paths for `.` and `..` (Dario Piotrowicz) [#56735](https://github.com/nodejs/node/pull/56735)
- \[[`f507c05060`](https://github.com/nodejs/node/commit/f507c05060)] - **module**: simplify --inspect-brk handling (Joyee Cheung) [#55679](https://github.com/nodejs/node/pull/55679)
- \[[`ed2d373e5a`](https://github.com/nodejs/node/commit/ed2d373e5a)] - **module**: disable require(esm) for policy and network import (Joyee Cheung) [#56927](https://github.com/nodejs/node/pull/56927)
- \[[`de313b2336`](https://github.com/nodejs/node/commit/de313b2336)] - **(SEMVER-MINOR)** **module**: only emit require(esm) warning under --trace-require-module (Joyee Cheung) [#56194](https://github.com/nodejs/node/pull/56194)
- \[[`3d89e6b6fa`](https://github.com/nodejs/node/commit/3d89e6b6fa)] - **module**: mark evaluation rejection in require(esm) as handled (Joyee Cheung) [#56122](https://github.com/nodejs/node/pull/56122)
- \[[`e01dd4bd4f`](https://github.com/nodejs/node/commit/e01dd4bd4f)] - **module**: do not warn when require(esm) comes from node_modules (Joyee Cheung) [#55960](https://github.com/nodejs/node/pull/55960)
- \[[`011e6e0032`](https://github.com/nodejs/node/commit/011e6e0032)] - **module**: fix error thrown from require(esm) hitting TLA repeatedly (Joyee Cheung) [#55520](https://github.com/nodejs/node/pull/55520)
- \[[`fdf50289c6`](https://github.com/nodejs/node/commit/fdf50289c6)] - **module**: trim off internal stack frames for require(esm) warnings (Joyee Cheung) [#55496](https://github.com/nodejs/node/pull/55496)
- \[[`8d33f78ca5`](https://github.com/nodejs/node/commit/8d33f78ca5)] - **module**: allow ESM that failed to be required to be re-imported (Joyee Cheung) [#55502](https://github.com/nodejs/node/pull/55502)
- \[[`8192dd6cf3`](https://github.com/nodejs/node/commit/8192dd6cf3)] - **module**: include module information in require(esm) warning (Joyee Cheung) [#55397](https://github.com/nodejs/node/pull/55397)
- \[[`1db210a0ec`](https://github.com/nodejs/node/commit/1db210a0ec)] - **module**: check --experimental-require-module separately from detection (Joyee Cheung) [#55250](https://github.com/nodejs/node/pull/55250)
- \[[`cf8701c866`](https://github.com/nodejs/node/commit/cf8701c866)] - **module**: use kNodeModulesRE to detect node_modules (Joyee Cheung) [#55243](https://github.com/nodejs/node/pull/55243)
- \[[`dc66632261`](https://github.com/nodejs/node/commit/dc66632261)] - **module**: support 'module.exports' interop export in require(esm) (Guy Bedford) [#54563](https://github.com/nodejs/node/pull/54563)
- \[[`1ac1dda9a4`](https://github.com/nodejs/node/commit/1ac1dda9a4)] - **(SEMVER-MINOR)** **module**: unflag --experimental-require-module (Joyee Cheung) [#55085](https://github.com/nodejs/node/pull/55085)
- \[[`683c93f45f`](https://github.com/nodejs/node/commit/683c93f45f)] - **module**: refator ESM loader for adding future synchronous hooks (Joyee Cheung) [#54769](https://github.com/nodejs/node/pull/54769)
- \[[`df8a045afe`](https://github.com/nodejs/node/commit/df8a045afe)] - **(SEMVER-MINOR)** **module**: implement the "module-sync" exports condition (Joyee Cheung) [#54648](https://github.com/nodejs/node/pull/54648)
- \[[`249d82b686`](https://github.com/nodejs/node/commit/249d82b686)] - **module**: report unfinished TLA in ambiguous modules (Antoine du Hamel) [#54980](https://github.com/nodejs/node/pull/54980)
- \[[`1925d729f9`](https://github.com/nodejs/node/commit/1925d729f9)] - **module**: remove bogus assertion in CJS entrypoint handling with --import (Joyee Cheung) [#54592](https://github.com/nodejs/node/pull/54592)
- \[[`d1331fccb2`](https://github.com/nodejs/node/commit/d1331fccb2)] - **module**: do not warn for typeless package.json when there isn't one (Joyee Cheung) [#54045](https://github.com/nodejs/node/pull/54045)
- \[[`9916458b44`](https://github.com/nodejs/node/commit/9916458b44)] - **(SEMVER-MINOR)** **module**: unflag detect-module (Geoffrey Booth) [#53619](https://github.com/nodejs/node/pull/53619)
- \[[`f9dc1eaef5`](https://github.com/nodejs/node/commit/f9dc1eaef5)] - **(SEMVER-MINOR)** **module**: add \_\_esModule to require()'d ESM (Joyee Cheung) [#52166](https://github.com/nodejs/node/pull/52166)
- \[[`b86f575504`](https://github.com/nodejs/node/commit/b86f575504)] - **module**: do not set CJS variables for Worker eval (Antoine du Hamel) [#53050](https://github.com/nodejs/node/pull/53050)
- \[[`30ed93db12`](https://github.com/nodejs/node/commit/30ed93db12)] - **module**: cache synchronous module jobs before linking (Joyee Cheung) [#52868](https://github.com/nodejs/node/pull/52868)
- \[[`a03faf289d`](https://github.com/nodejs/node/commit/a03faf289d)] - **module**: support ESM detection in the CJS loader (Joyee Cheung) [#52047](https://github.com/nodejs/node/pull/52047)
- \[[`b07ad39bda`](https://github.com/nodejs/node/commit/b07ad39bda)] - **module**: detect ESM syntax by trying to recompile as SourceTextModule (Joyee Cheung) [#52413](https://github.com/nodejs/node/pull/52413)
- \[[`132a5c190f`](https://github.com/nodejs/node/commit/132a5c190f)] - **module**: eliminate performance cost of detection for cjs entry (Geoffrey Booth) [#52093](https://github.com/nodejs/node/pull/52093)
- \[[`55a57a189f`](https://github.com/nodejs/node/commit/55a57a189f)] - **node-api**: remove deprecated attribute from napi_module_register (Vladimir Morozov) [#56162](https://github.com/nodejs/node/pull/56162)
- \[[`4fba01911d`](https://github.com/nodejs/node/commit/4fba01911d)] - **(SEMVER-MINOR)** **process**: add process.features.require_module (Joyee Cheung) [#55241](https://github.com/nodejs/node/pull/55241)
- \[[`c0fad18ac0`](https://github.com/nodejs/node/commit/c0fad18ac0)] - **src**: add nullptr handling from X509_STORE_new() (Burkov Egor) [#56700](https://github.com/nodejs/node/pull/56700)
- \[[`5b88d48cbb`](https://github.com/nodejs/node/commit/5b88d48cbb)] - **src**: add default value for RSACipherConfig mode field (Burkov Egor) [#56701](https://github.com/nodejs/node/pull/56701)
- \[[`e3b69e57a6`](https://github.com/nodejs/node/commit/e3b69e57a6)] - **src**: fix build with GCC 15 (tjuhaszrh) [#56740](https://github.com/nodejs/node/pull/56740)
- \[[`a7c1d8c0e8`](https://github.com/nodejs/node/commit/a7c1d8c0e8)] - **src**: initialize FSReqWrapSync in path that uses it (Michaël Zasso) [#56613](https://github.com/nodejs/node/pull/56613)
- \[[`c06ac66356`](https://github.com/nodejs/node/commit/c06ac66356)] - **src**: fix undefined script name in error source (Chengzhong Wu) [#56502](https://github.com/nodejs/node/pull/56502)
- \[[`500f3ccc66`](https://github.com/nodejs/node/commit/500f3ccc66)] - **src**: lock the thread properly in snapshot builder (Joyee Cheung) [#56327](https://github.com/nodejs/node/pull/56327)
- \[[`cf25a5edeb`](https://github.com/nodejs/node/commit/cf25a5edeb)] - **src**: drain platform tasks before creating startup snapshot (Chengzhong Wu) [#56403](https://github.com/nodejs/node/pull/56403)
- \[[`8af1b53bb8`](https://github.com/nodejs/node/commit/8af1b53bb8)] - **src**: safely remove the last line from dotenv (Shima Ryuhei) [#55982](https://github.com/nodejs/node/pull/55982)
- \[[`bb57e909aa`](https://github.com/nodejs/node/commit/bb57e909aa)] - **src**: remove `base64` from `process.versions` (Richard Lau) [#53442](https://github.com/nodejs/node/pull/53442)
- \[[`b8c89a693e`](https://github.com/nodejs/node/commit/b8c89a693e)] - **src**: add `--env-file-if-exists` flag (Bosco Domingo) [#53060](https://github.com/nodejs/node/pull/53060)
- \[[`9097de073a`](https://github.com/nodejs/node/commit/9097de073a)] - **src**: don't match after `--` in `Dotenv::GetPathFromArgs` (Aviv Keller) [#54237](https://github.com/nodejs/node/pull/54237)
- \[[`ececd225b6`](https://github.com/nodejs/node/commit/ececd225b6)] - **src**: implement IsInsideNodeModules() in C++ (Joyee Cheung) [#55286](https://github.com/nodejs/node/pull/55286)
- \[[`18593b7d3e`](https://github.com/nodejs/node/commit/18593b7d3e)] - **src**: refactor embedded entrypoint loading (Joyee Cheung) [#53573](https://github.com/nodejs/node/pull/53573)
- \[[`d7aefc0524`](https://github.com/nodejs/node/commit/d7aefc0524)] - **stream**: fix typo in ReadableStreamBYOBReader.readIntoRequests (Mattias Buelens) [#56560](https://github.com/nodejs/node/pull/56560)
- \[[`fe5f7bcd47`](https://github.com/nodejs/node/commit/fe5f7bcd47)] - **stream**: validate undefined sizeAlgorithm in WritableStream (Jason Zhang) [#56067](https://github.com/nodejs/node/pull/56067)
- \[[`12744c1fd4`](https://github.com/nodejs/node/commit/12744c1fd4)] - **test**: reduce number of written chunks (Luigi Pinca) [#56757](https://github.com/nodejs/node/pull/56757)
- \[[`e121d7d62c`](https://github.com/nodejs/node/commit/e121d7d62c)] - **test**: fix invalid common.mustSucceed() usage (Luigi Pinca) [#56756](https://github.com/nodejs/node/pull/56756)
- \[[`11b82de7ed`](https://github.com/nodejs/node/commit/11b82de7ed)] - **test**: use strict mode in global setters test (Rich Trott) [#56742](https://github.com/nodejs/node/pull/56742)
- \[[`f9d6e35c5e`](https://github.com/nodejs/node/commit/f9d6e35c5e)] - **test**: cleanup and simplify test-crypto-aes-wrap (James M Snell) [#56748](https://github.com/nodejs/node/pull/56748)
- \[[`792ce98699`](https://github.com/nodejs/node/commit/792ce98699)] - **test**: do not use common.isMainThread (Luigi Pinca) [#56768](https://github.com/nodejs/node/pull/56768)
- \[[`4f0cf475e0`](https://github.com/nodejs/node/commit/4f0cf475e0)] - **test**: add test that uses multibyte for path and resolves modules (yamachu) [#56696](https://github.com/nodejs/node/pull/56696)
- \[[`3bc8d273c2`](https://github.com/nodejs/node/commit/3bc8d273c2)] - **test**: add missing test for env file (Jonas) [#56642](https://github.com/nodejs/node/pull/56642)
- \[[`ad39367712`](https://github.com/nodejs/node/commit/ad39367712)] - **test**: enforce strict mode in test-zlib-const (Rich Trott) [#56689](https://github.com/nodejs/node/pull/56689)
- \[[`ca79914137`](https://github.com/nodejs/node/commit/ca79914137)] - **test**: test-stream-compose.js doesn't need internals (Meghan Denny) [#56619](https://github.com/nodejs/node/pull/56619)
- \[[`08bde67101`](https://github.com/nodejs/node/commit/08bde67101)] - **test**: add maxCount and gcOptions to gcUntil() (Joyee Cheung) [#56522](https://github.com/nodejs/node/pull/56522)
- \[[`40a0f6f6e3`](https://github.com/nodejs/node/commit/40a0f6f6e3)] - **test**: mark test-worker-prof as flaky on smartos (Joyee Cheung) [#56583](https://github.com/nodejs/node/pull/56583)
- \[[`d17bf2f62a`](https://github.com/nodejs/node/commit/d17bf2f62a)] - **test**: update test-child-process-bad-stdio to use node:test (Colin Ihrig) [#56562](https://github.com/nodejs/node/pull/56562)
- \[[`5660b99b43`](https://github.com/nodejs/node/commit/5660b99b43)] - **test**: disable openssl 3.4.0 incompatible tests (Jelle van der Waa) [#56160](https://github.com/nodejs/node/pull/56160)
- \[[`861c99f351`](https://github.com/nodejs/node/commit/861c99f351)] - **test**: make test-crypto-hash compatible with OpenSSL > 3.4.0 (Jelle van der Waa) [#56160](https://github.com/nodejs/node/pull/56160)
- \[[`597a39b5f9`](https://github.com/nodejs/node/commit/597a39b5f9)] - **test**: update error code in tls-psk-circuit for for OpenSSL 3.4 (sebastianas) [#56420](https://github.com/nodejs/node/pull/56420)
- \[[`721e9e1217`](https://github.com/nodejs/node/commit/721e9e1217)] - **test**: add initial test426 coverage (Chengzhong Wu) [#56436](https://github.com/nodejs/node/pull/56436)
- \[[`cfe5380c44`](https://github.com/nodejs/node/commit/cfe5380c44)] - **test**: update test-set-http-max-http-headers to use node:test (Colin Ihrig) [#56439](https://github.com/nodejs/node/pull/56439)
- \[[`51ff71a87a`](https://github.com/nodejs/node/commit/51ff71a87a)] - **test**: update test-child-process-windows-hide to use node:test (Colin Ihrig) [#56437](https://github.com/nodejs/node/pull/56437)
- \[[`d6aca0cd89`](https://github.com/nodejs/node/commit/d6aca0cd89)] - **test**: increase spin for eventloop test on s390 (Michael Dawson) [#56228](https://github.com/nodejs/node/pull/56228)
- \[[`82461af6ec`](https://github.com/nodejs/node/commit/82461af6ec)] - **test**: migrate message eval tests from Python to JS (Yiyun Lei) [#50482](https://github.com/nodejs/node/pull/50482)
- \[[`5083bbb2bb`](https://github.com/nodejs/node/commit/5083bbb2bb)] - **test**: remove async-hooks/test-writewrap flaky designation (Luigi Pinca) [#56048](https://github.com/nodejs/node/pull/56048)
- \[[`b4b26e973d`](https://github.com/nodejs/node/commit/b4b26e973d)] - **test**: deflake test-esm-loader-hooks-inspect-brk (Luigi Pinca) [#56050](https://github.com/nodejs/node/pull/56050)
- \[[`182be26b8a`](https://github.com/nodejs/node/commit/182be26b8a)] - **test**: update WPT for url to 67880a4eb83ca9aa732eec4b35a1971ff5bf37ff (Node.js GitHub Bot) [#55999](https://github.com/nodejs/node/pull/55999)
- \[[`e67a84902f`](https://github.com/nodejs/node/commit/e67a84902f)] - **test_runner**: remove unused errors (Pietro Marchini) [#56607](https://github.com/nodejs/node/pull/56607)
- \[[`4274c6a015`](https://github.com/nodejs/node/commit/4274c6a015)] - **test_runner**: run single test file benchmark (Pietro Marchini) [#56479](https://github.com/nodejs/node/pull/56479)
- \[[`e57004458b`](https://github.com/nodejs/node/commit/e57004458b)] - **tools**: update doc to new version (Node.js GitHub Bot) [#56259](https://github.com/nodejs/node/pull/56259)
- \[[`e039f2b571`](https://github.com/nodejs/node/commit/e039f2b571)] - **tools**: do not throw on missing `create-release-proposal.sh` (Antoine du Hamel) [#56704](https://github.com/nodejs/node/pull/56704)
- \[[`9a1e314498`](https://github.com/nodejs/node/commit/9a1e314498)] - **tools**: fix tools-deps-update (Daniel Lemire) [#56684](https://github.com/nodejs/node/pull/56684)
- \[[`d6469b5287`](https://github.com/nodejs/node/commit/d6469b5287)] - **tools**: do not throw on missing `create-release-proposal.sh` (Antoine du Hamel) [#56695](https://github.com/nodejs/node/pull/56695)
- \[[`e162476fdc`](https://github.com/nodejs/node/commit/e162476fdc)] - **tools**: fix permissions in `lint-release-proposal` workflow (Antoine du Hamel) [#56614](https://github.com/nodejs/node/pull/56614)
- \[[`914b4675c8`](https://github.com/nodejs/node/commit/914b4675c8)] - **tools**: edit `create-release-proposal` workflow (Antoine du Hamel) [#56540](https://github.com/nodejs/node/pull/56540)
- \[[`4ff9aa7235`](https://github.com/nodejs/node/commit/4ff9aa7235)] - **tools**: validate commit list as part of `lint-release-commit` (Antoine du Hamel) [#56291](https://github.com/nodejs/node/pull/56291)
- \[[`589d0ae8ea`](https://github.com/nodejs/node/commit/589d0ae8ea)] - **tools**: fix loong64 build failed (Xiao-Tao) [#56466](https://github.com/nodejs/node/pull/56466)
- \[[`bc8c39bff8`](https://github.com/nodejs/node/commit/bc8c39bff8)] - **tools**: disable unneeded rule ignoring in Python linting (Rich Trott) [#56429](https://github.com/nodejs/node/pull/56429)
- \[[`3b130002bb`](https://github.com/nodejs/node/commit/3b130002bb)] - **tools**: add release line label when opening release proposal (Antoine du Hamel) [#56317](https://github.com/nodejs/node/pull/56317)
- \[[`73b5c16684`](https://github.com/nodejs/node/commit/73b5c16684)] - **(SEMVER-MINOR)** **worker**: add postMessageToThread (Paolo Insogna) [#53682](https://github.com/nodejs/node/pull/53682)

Windows 32-bit Installer: https://nodejs.org/dist/v20.19.0/node-v20.19.0-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.19.0/node-v20.19.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.19.0/node-v20.19.0-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.19.0/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.19.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.19.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.19.0/node-v20.19.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.19.0/node-v20.19.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.19.0/node-v20.19.0.tar.gz \
Other release files: https://nodejs.org/dist/v20.19.0/ \
Documentation: https://nodejs.org/docs/v20.19.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

0609a0e76791783a3ff7845d55455ba071cb0c70d9f40880b23c2d7863acd16e  node-v20.19.0-aix-ppc64.tar.gz
8c7e65cfe4ec208821ee8f6ecda8b3b6ed1cdffbf08ab6e886cd52a7154bc426  node-v20.19.0-arm64.msi
c016cd1975a264a29dc1b07c6fbe60d5df0a0c2beb4113c0450e3d998d1a0d9c  node-v20.19.0-darwin-arm64.tar.gz
881a91a81481799f785ff251e3374e90c7ed3e0d6b89e830ffd3806d59338739  node-v20.19.0-darwin-arm64.tar.xz
a8554af97d6491fdbdabe63d3a1cfb9571228d25a3ad9aed2df856facb131b20  node-v20.19.0-darwin-x64.tar.gz
d0f34126b41532719035fdb3484d5c4210f18cd2489d6098dcc57802dfb80a71  node-v20.19.0-darwin-x64.tar.xz
800194e32cef4ee77f5a2e8c0e5dd2b4acb38b39ef2ea544929c181b949494bb  node-v20.19.0-headers.tar.gz
cca8de2ca8d8cb0a61c657c90b6ca8d37ec2866332af0129f175042e1749b9b6  node-v20.19.0-headers.tar.xz
618e4294602b78e97118a39050116b70d088b16197cd3819bba1fc18b473dfc4  node-v20.19.0-linux-arm64.tar.gz
dbe339e55eb393955a213e6b872066880bb9feceaa494f4d44c7aac205ec2ab9  node-v20.19.0-linux-arm64.tar.xz
2deb2f333b42fcdeb0d215800b3d2b9af64dd88c1d0b05e67b980398d43c4dce  node-v20.19.0-linux-armv7l.tar.gz
9b1509684988e5a343721baf6fce38dc66563921346f73b03ff5775d34ac4624  node-v20.19.0-linux-armv7l.tar.xz
a408067f48198c8ade06c09c5ad36f12b976bc801144ea4220ad850ee14b62a8  node-v20.19.0-linux-ppc64le.tar.gz
84937108f005679e60b486ed8e801cebfe923f02b76d8e710463d32f82181f65  node-v20.19.0-linux-ppc64le.tar.xz
08c3a52fcb1ddcc83d45eb7f6a1366d71d4d499114387e00af64c0e38c471034  node-v20.19.0-linux-s390x.tar.gz
11f8ee99d792a83bba7b29911e0229dd6cd5e88987d7416346067db1cc76d89a  node-v20.19.0-linux-s390x.tar.xz
8a4dbcdd8bccef3132d21e8543940557e55dcf44f00f0a99ba8a062f4552e722  node-v20.19.0-linux-x64.tar.gz
b4e336584d62abefad31baecff7af167268be9bb7dd11f1297112e6eed3ca0d5  node-v20.19.0-linux-x64.tar.xz
59a26a91c664916de2d4eaa8bd039a40edf9a080e2cf799f5b1320620aed1da0  node-v20.19.0.pkg
658572c4a0f546b0c07ea64d53b396a19c425ff183924872cb34712a17e15332  node-v20.19.0.tar.gz
5ac2516fc905b6a0bc1a33e7302937eac664a820b887cc86bd48c035fba392d7  node-v20.19.0.tar.xz
43dda26cb68797540b1843185b408007d50806c2d4799e25c28a5596d58dc1c8  node-v20.19.0-win-arm64.7z
773325a26ad51a5ba857963825dee3a871eacef653c31d62e5492574c965accb  node-v20.19.0-win-arm64.zip
aaa5903c0e33c242dfc3c0cc32a72ae44341ab8cba8eac819f8b11b3e333941b  node-v20.19.0-win-x64.7z
be72284c7bc62de07d5a9fd0ae196879842c085f11f7f2b60bf8864c0c9d6a4f  node-v20.19.0-win-x64.zip
fb3e7236b6a67d21e4d3be23670332175d2fa70af5fd8d32fb35ec868969c0fe  node-v20.19.0-win-x86.7z
0d5dde8238fce3982342721d66e85cfbd3d3affa777bf248145c4dbaab6b7444  node-v20.19.0-win-x86.zip
e9032adb422bf332001a5d8c799621307b8f2f2f8bcf3071b8b6998923ddc20e  node-v20.19.0-x64.msi
68d09bc053428bec1e1c76db1d3b73db8976af1387a0458a53c95b4f972f7427  node-v20.19.0-x86.msi
4ec1ae34fc7c0c65b35ec3688b9dc6d8ad5feca69d5ba45f7d72d559dc850fbb  win-arm64/node.exe
a9d9a73785f8d95b98eed317c07ca34d4b2d59a45b425bab8b942795ab9236f1  win-arm64/node.lib
4e4c9631464328ceac80eb73ed60116c6e6181fc160329105b23ef9ac0f3097c  win-arm64/node_pdb.7z
76876a35665f2e0d6f40415a798339904370fd0c19f92e9411e2531eb22aa06c  win-arm64/node_pdb.zip
6e3a39787e667d50487f7335c85636c2823a53e636d73c2c841d45da4e57906c  win-x64/node.exe
72f7ca3b33f0991e93e25521f7e78c8adf187df7d5223bf0efcb5e005420f327  win-x64/node.lib
f3ccba2a1faf67d642f300b23a6ff9116937ae14d444172061615886162fd335  win-x64/node_pdb.7z
07cbff5d671322bbcdc7eb69090794c9a171b552343547b71edfc232296c5616  win-x64/node_pdb.zip
6d2f2131f5ed14c04c0c2c7652f60f62dc1ca4bfb65fb539594e5b0ede86326b  win-x86/node.exe
1e70659d1bb7706899c116a5fec9ae0f5e75b691d8c5b9ed55cef9cd05760988  win-x86/node.lib
bf14909bd0ae046ba43e1f6161925e0372eda1056cc5f525de8ad4b4a9729da4  win-x86/node_pdb.7z
4ed51daa06dbf2568eef1061b516905ddddf00bb4aacb8a6786a10b29c85aa8b  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEzGj1oxBv9EgyLkjtJ/XjjVsKIV8FAmfS2pEACgkQJ/XjjVsK
IV8ZHA/+MLLVL5T+0Q+JW+g2Lq4y6vnwhD00iEmCpANlZ4SPz9eZ/mQAsa0DGHkq
gs0rh2SRwMg5Zo1E8Dpjvzv9BVTkjSVb8lwz+dTgnOzD1A2iTUFHiBLHb6fJBbjI
XD3kooNF2pLzLfyMtkrDuCAroa8yxINx1q7CUzheMHvDJZEOE0P3eUZBIH+olrob
ok4dmjKed+MOg4sa8YPAc2mwtIN6K6suXJa+7frXVcL96UE4ReybMFGnbha23uby
cY0IggvzPF++ZtSzXiBrTIBYENqUxrtYONCT7mFoIGmmKtDRdOu+jTRdz3Q608Yg
LpmNVYRAkMLU/T04ePGfujnCA5T/v+r1lzkl8OnOYC+0WuzrwHCUEzAmIsLOy4sg
rL8bQwL9B6BfNvyXAtE4q0lxB+9574qb7YF9tL1sg4ddq+aqqSej2TdhZ0D1Ie3I
9tro9NkjCEbJJBZUxC/u+C3ZNDEKdPqy2QLT5F5kpjIOZoSj61AtQTI0wEMnn5FT
GloxOigpbNV0wOzXKxZQ4LF0YsQCaAHshgdFLMhHg8l84FnMCa4W727mKa233VBG
8gEc9FPopnOAdVAmxqmjLLSYBCptp223vezoCiiJ62vcNWIxyToRUCzfC/fZrzAd
SyvhIeKOyaw1mLkqGOwaW8J9Y8etCmM633hNT74HUqa8M0ZohFs=
=Jkau
-----END PGP SIGNATURE-----
```
