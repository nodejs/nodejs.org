---
date: '2025-02-11T10:46:49.097Z'
category: release
title: Node.js v22.14.0 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-02-11, Version 22.14.0 'Jod' (LTS), @aduh95

### Notable Changes

- \[[`82a9000e9e`](https://github.com/nodejs/node/commit/82a9000e9e)] - **crypto**: update root certificates to NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)
- \[[`b7fe54fc88`](https://github.com/nodejs/node/commit/b7fe54fc88)] - **(SEMVER-MINOR)** **fs**: allow `exclude` option in globs to accept glob patterns (Daeyeon Jeong) [#56489](https://github.com/nodejs/node/pull/56489)
- \[[`3ac92ef607`](https://github.com/nodejs/node/commit/3ac92ef607)] - **(SEMVER-MINOR)** **lib**: add typescript support to STDIN eval (Marco Ippolito) [#56359](https://github.com/nodejs/node/pull/56359)
- \[[`1614e8e7bc`](https://github.com/nodejs/node/commit/1614e8e7bc)] - **(SEMVER-MINOR)** **module**: add ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX (Marco Ippolito) [#56610](https://github.com/nodejs/node/pull/56610)
- \[[`6d6cffa9cc`](https://github.com/nodejs/node/commit/6d6cffa9cc)] - **(SEMVER-MINOR)** **module**: add `findPackageJSON` util (Jacob Smith) [#55412](https://github.com/nodejs/node/pull/55412)
- \[[`d35333ae18`](https://github.com/nodejs/node/commit/d35333ae18)] - **(SEMVER-MINOR)** **process**: add process.ref() and process.unref() methods (James M Snell) [#56400](https://github.com/nodejs/node/pull/56400)
- \[[`07ff3ddcb5`](https://github.com/nodejs/node/commit/07ff3ddcb5)] - **(SEMVER-MINOR)** **sqlite**: support TypedArray and DataView in `StatementSync` (Alex Yang) [#56385](https://github.com/nodejs/node/pull/56385)
- \[[`94d3fe1b62`](https://github.com/nodejs/node/commit/94d3fe1b62)] - **(SEMVER-MINOR)** **src**: add --disable-sigusr1 to prevent signal i/o thread (Rafael Gonzaga) [#56441](https://github.com/nodejs/node/pull/56441)
- \[[`5afffb4415`](https://github.com/nodejs/node/commit/5afffb4415)] - **(SEMVER-MINOR)** **src,worker**: add isInternalWorker (Carlos Espa) [#56469](https://github.com/nodejs/node/pull/56469)
- \[[`697a851fb3`](https://github.com/nodejs/node/commit/697a851fb3)] - **(SEMVER-MINOR)** **test_runner**: add TestContext.prototype.waitFor() (Colin Ihrig) [#56595](https://github.com/nodejs/node/pull/56595)
- \[[`047537b48c`](https://github.com/nodejs/node/commit/047537b48c)] - **(SEMVER-MINOR)** **test_runner**: add t.assert.fileSnapshot() (Colin Ihrig) [#56459](https://github.com/nodejs/node/pull/56459)
- \[[`926cf84e95`](https://github.com/nodejs/node/commit/926cf84e95)] - **(SEMVER-MINOR)** **test_runner**: add assert.register() API (Colin Ihrig) [#56434](https://github.com/nodejs/node/pull/56434)
- \[[`c658a8afdf`](https://github.com/nodejs/node/commit/c658a8afdf)] - **(SEMVER-MINOR)** **worker**: add eval ts input (Marco Ippolito) [#56394](https://github.com/nodejs/node/pull/56394)

### Commits

- \[[`bad1ad8650`](https://github.com/nodejs/node/commit/bad1ad8650)] - **assert**: make myers_diff function more performant (Giovanni Bucci) [#56303](https://github.com/nodejs/node/pull/56303)
- \[[`e222e36f3b`](https://github.com/nodejs/node/commit/e222e36f3b)] - **assert**: make partialDeepStrictEqual work with urls and File prototypes (Giovanni Bucci) [#56231](https://github.com/nodejs/node/pull/56231)
- \[[`e232789fe2`](https://github.com/nodejs/node/commit/e232789fe2)] - **assert**: show diff when doing partial comparisons (Giovanni Bucci) [#56211](https://github.com/nodejs/node/pull/56211)
- \[[`c99de1fdcf`](https://github.com/nodejs/node/commit/c99de1fdcf)] - **assert**: make partialDeepStrictEqual throw when comparing \[0] with \[-0] (Giovanni) [#56237](https://github.com/nodejs/node/pull/56237)
- \[[`2386fd5840`](https://github.com/nodejs/node/commit/2386fd5840)] - **benchmark**: add validateStream to styleText bench (Rafael Gonzaga) [#56556](https://github.com/nodejs/node/pull/56556)
- \[[`b197dfa7ec`](https://github.com/nodejs/node/commit/b197dfa7ec)] - **build**: fix GN build for ngtcp2 (Cheng) [#56300](https://github.com/nodejs/node/pull/56300)
- \[[`2a3cdd34ff`](https://github.com/nodejs/node/commit/2a3cdd34ff)] - **build**: test macos-13 on GitHub actions (Michaël Zasso) [#56307](https://github.com/nodejs/node/pull/56307)
- \[[`12f716be0a`](https://github.com/nodejs/node/commit/12f716be0a)] - **build**: build v8 with -fvisibility=hidden on macOS (Joyee Cheung) [#56275](https://github.com/nodejs/node/pull/56275)
- \[[`c5ca15bd34`](https://github.com/nodejs/node/commit/c5ca15bd34)] - **child_process**: fix parsing messages with splitted length field (Maksim Gorkov) [#56106](https://github.com/nodejs/node/pull/56106)
- \[[`8346b8fc2c`](https://github.com/nodejs/node/commit/8346b8fc2c)] - **crypto**: add missing return value check (Michael Dawson) [#56615](https://github.com/nodejs/node/pull/56615)
- \[[`82a9000e9e`](https://github.com/nodejs/node/commit/82a9000e9e)] - **crypto**: update root certificates to NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)
- \[[`890eef20a1`](https://github.com/nodejs/node/commit/890eef20a1)] - **crypto**: fix checkPrime crash with large buffers (Santiago Gimeno) [#56559](https://github.com/nodejs/node/pull/56559)
- \[[`5edb7b5e87`](https://github.com/nodejs/node/commit/5edb7b5e87)] - **crypto**: fix warning of ignoring return value (Cheng) [#56527](https://github.com/nodejs/node/pull/56527)
- \[[`b89f123a0b`](https://github.com/nodejs/node/commit/b89f123a0b)] - **crypto**: make generatePrime/checkPrime interruptible (James M Snell) [#56460](https://github.com/nodejs/node/pull/56460)
- \[[`63c1859e01`](https://github.com/nodejs/node/commit/63c1859e01)] - **deps**: update corepack to 0.31.0 (Node.js GitHub Bot) [#56795](https://github.com/nodejs/node/pull/56795)
- \[[`a48430d4d3`](https://github.com/nodejs/node/commit/a48430d4d3)] - **deps**: move inspector_protocol to deps (Chengzhong Wu) [#56649](https://github.com/nodejs/node/pull/56649)
- \[[`74cccc824f`](https://github.com/nodejs/node/commit/74cccc824f)] - **deps**: macro ENODATA is deprecated in libc++ (Cheng) [#56698](https://github.com/nodejs/node/pull/56698)
- \[[`fa869ea0f2`](https://github.com/nodejs/node/commit/fa869ea0f2)] - **deps**: fixup some minor coverity warnings (James M Snell) [#56612](https://github.com/nodejs/node/pull/56612)
- \[[`1a4fa2b015`](https://github.com/nodejs/node/commit/1a4fa2b015)] - **deps**: update amaro to 0.3.0 (Node.js GitHub Bot) [#56568](https://github.com/nodejs/node/pull/56568)
- \[[`b47076fd82`](https://github.com/nodejs/node/commit/b47076fd82)] - **deps**: update amaro to 0.2.2 (Node.js GitHub Bot) [#56568](https://github.com/nodejs/node/pull/56568)
- \[[`46bd4b8731`](https://github.com/nodejs/node/commit/46bd4b8731)] - **deps**: update simdutf to 6.0.3 (Node.js GitHub Bot) [#56567](https://github.com/nodejs/node/pull/56567)
- \[[`8ead9c693b`](https://github.com/nodejs/node/commit/8ead9c693b)] - **deps**: update simdutf to 5.7.2 (Node.js GitHub Bot) [#56388](https://github.com/nodejs/node/pull/56388)
- \[[`18d4b502af`](https://github.com/nodejs/node/commit/18d4b502af)] - **deps**: update amaro to 0.2.1 (Node.js GitHub Bot) [#56390](https://github.com/nodejs/node/pull/56390)
- \[[`d938d7cc86`](https://github.com/nodejs/node/commit/d938d7cc86)] - **deps**: update googletest to 7d76a23 (Node.js GitHub Bot) [#56387](https://github.com/nodejs/node/pull/56387)
- \[[`9761e7dccb`](https://github.com/nodejs/node/commit/9761e7dccb)] - **deps**: update googletest to e54519b (Node.js GitHub Bot) [#56370](https://github.com/nodejs/node/pull/56370)
- \[[`8319dc6bc5`](https://github.com/nodejs/node/commit/8319dc6bc5)] - **deps**: update ngtcp2 to 1.10.0 (Node.js GitHub Bot) [#56334](https://github.com/nodejs/node/pull/56334)
- \[[`6eacd19d6a`](https://github.com/nodejs/node/commit/6eacd19d6a)] - **deps**: update simdutf to 5.7.0 (Node.js GitHub Bot) [#56332](https://github.com/nodejs/node/pull/56332)
- \[[`28bec2dda3`](https://github.com/nodejs/node/commit/28bec2dda3)] - **diagnostics_channel**: capture console messages (Stephen Belanger) [#56292](https://github.com/nodejs/node/pull/56292)
- \[[`d519d33502`](https://github.com/nodejs/node/commit/d519d33502)] - **doc**: update macOS and Xcode versions for releases (Michaël Zasso) [#56337](https://github.com/nodejs/node/pull/56337)
- \[[`fcfe650507`](https://github.com/nodejs/node/commit/fcfe650507)] - **doc**: add note for features using `InternalWorker` with permission model (Antoine du Hamel) [#56706](https://github.com/nodejs/node/pull/56706)
- \[[`efbba182b5`](https://github.com/nodejs/node/commit/efbba182b5)] - **doc**: add entry to changelog about SQLite Session Extension (Bart Louwers) [#56318](https://github.com/nodejs/node/pull/56318)
- \[[`31bf9c7dd9`](https://github.com/nodejs/node/commit/31bf9c7dd9)] - **doc**: move anatoli to emeritus (Michael Dawson) [#56592](https://github.com/nodejs/node/pull/56592)
- \[[`6096e38c7c`](https://github.com/nodejs/node/commit/6096e38c7c)] - **doc**: fix styles of the expandable TOC (Antoine du Hamel) [#56755](https://github.com/nodejs/node/pull/56755)
- \[[`d423638281`](https://github.com/nodejs/node/commit/d423638281)] - **doc**: add "Skip to content" button (Antoine du Hamel) [#56750](https://github.com/nodejs/node/pull/56750)
- \[[`edeb157d75`](https://github.com/nodejs/node/commit/edeb157d75)] - **doc**: improve accessibility of expandable lists (Antoine du Hamel) [#56749](https://github.com/nodejs/node/pull/56749)
- \[[`1a79e87687`](https://github.com/nodejs/node/commit/1a79e87687)] - **doc**: add note regarding commit message trailers (Dario Piotrowicz) [#56736](https://github.com/nodejs/node/pull/56736)
- \[[`927c7e47e4`](https://github.com/nodejs/node/commit/927c7e47e4)] - **doc**: fix typo in example code for util.styleText (Robin Mehner) [#56720](https://github.com/nodejs/node/pull/56720)
- \[[`fade522538`](https://github.com/nodejs/node/commit/fade522538)] - **doc**: fix inconsistencies in `WeakSet` and `WeakMap` comparison details (Shreyans Pathak) [#56683](https://github.com/nodejs/node/pull/56683)
- \[[`55533bf147`](https://github.com/nodejs/node/commit/55533bf147)] - **doc**: add RafaelGSS as latest sec release stewards (Rafael Gonzaga) [#56682](https://github.com/nodejs/node/pull/56682)
- \[[`8e978bdee1`](https://github.com/nodejs/node/commit/8e978bdee1)] - **doc**: clarify cjs/esm diff in `queueMicrotask()` vs `process.nextTick()` (Dario Piotrowicz) [#56659](https://github.com/nodejs/node/pull/56659)
- \[[`ae360c30dc`](https://github.com/nodejs/node/commit/ae360c30dc)] - **doc**: `WeakSet` and `WeakMap` comparison details (Shreyans Pathak) [#56648](https://github.com/nodejs/node/pull/56648)
- \[[`acd2a2fda5`](https://github.com/nodejs/node/commit/acd2a2fda5)] - **doc**: mention prepare --security (Rafael Gonzaga) [#56617](https://github.com/nodejs/node/pull/56617)
- \[[`d3c0a2831d`](https://github.com/nodejs/node/commit/d3c0a2831d)] - **doc**: tweak info on reposts in ambassador program (Michael Dawson) [#56589](https://github.com/nodejs/node/pull/56589)
- \[[`3299505b49`](https://github.com/nodejs/node/commit/3299505b49)] - **doc**: add type stripping to ambassadors program (Marco Ippolito) [#56598](https://github.com/nodejs/node/pull/56598)
- \[[`b1a6ffa4e4`](https://github.com/nodejs/node/commit/b1a6ffa4e4)] - **doc**: improve internal documentation on built-in snapshot (Joyee Cheung) [#56505](https://github.com/nodejs/node/pull/56505)
- \[[`1641a28930`](https://github.com/nodejs/node/commit/1641a28930)] - **doc**: document CLI way to open the nodejs/bluesky PR (Antoine du Hamel) [#56506](https://github.com/nodejs/node/pull/56506)
- \[[`2042628fda`](https://github.com/nodejs/node/commit/2042628fda)] - **doc**: add section about using npx with permission model (Rafael Gonzaga) [#56539](https://github.com/nodejs/node/pull/56539)
- \[[`ace19a0263`](https://github.com/nodejs/node/commit/ace19a0263)] - **doc**: update gcc-version for ubuntu-lts (Kunal Kumar) [#56553](https://github.com/nodejs/node/pull/56553)
- \[[`4aa57b50f8`](https://github.com/nodejs/node/commit/4aa57b50f8)] - **doc**: fix parentheses in options (Tobias Nießen) [#56563](https://github.com/nodejs/node/pull/56563)
- \[[`b40b01b4d3`](https://github.com/nodejs/node/commit/b40b01b4d3)] - **doc**: include CVE to EOL lines as sec release process (Rafael Gonzaga) [#56520](https://github.com/nodejs/node/pull/56520)
- \[[`6701360113`](https://github.com/nodejs/node/commit/6701360113)] - **doc**: add esm examples to node:trace_events (Alfredo González) [#56514](https://github.com/nodejs/node/pull/56514)
- \[[`d3207cca3e`](https://github.com/nodejs/node/commit/d3207cca3e)] - **doc**: add message for Ambassadors to promote (Michael Dawson) [#56235](https://github.com/nodejs/node/pull/56235)
- \[[`97ece4ae06`](https://github.com/nodejs/node/commit/97ece4ae06)] - **doc**: allow request for TSC reviews via the GitHub UI (Antoine du Hamel) [#56493](https://github.com/nodejs/node/pull/56493)
- \[[`03f25055ab`](https://github.com/nodejs/node/commit/03f25055ab)] - **doc**: add example for piping ReadableStream (Gabriel Schulhof) [#56415](https://github.com/nodejs/node/pull/56415)
- \[[`516d07482c`](https://github.com/nodejs/node/commit/516d07482c)] - **doc**: expand description of `parseArg`'s `default` (Kevin Gibbons) [#54431](https://github.com/nodejs/node/pull/54431)
- \[[`a6491effcb`](https://github.com/nodejs/node/commit/a6491effcb)] - **doc**: use `<ul>` instead of `<ol>` in `SECURITY.md` (Antoine du Hamel) [#56346](https://github.com/nodejs/node/pull/56346)
- \[[`e4ec134b21`](https://github.com/nodejs/node/commit/e4ec134b21)] - **doc**: clarify that WASM is trusted (Matteo Collina) [#56345](https://github.com/nodejs/node/pull/56345)
- \[[`0f7aed8a59`](https://github.com/nodejs/node/commit/0f7aed8a59)] - **doc**: fix the `crc32` documentation (Kevin Toshihiro Uehara) [#55898](https://github.com/nodejs/node/pull/55898)
- \[[`721104a296`](https://github.com/nodejs/node/commit/721104a296)] - **doc**: fix links in `module.md` (Antoine du Hamel) [#56283](https://github.com/nodejs/node/pull/56283)
- \[[`928540d792`](https://github.com/nodejs/node/commit/928540d792)] - **doc**: fix typos (Nathan Baulch) [#55066](https://github.com/nodejs/node/pull/55066)
- \[[`e69d35f03b`](https://github.com/nodejs/node/commit/e69d35f03b)] - **doc**: add history info for Permission Model (Antoine du Hamel) [#56707](https://github.com/nodejs/node/pull/56707)
- \[[`c6fd867ab5`](https://github.com/nodejs/node/commit/c6fd867ab5)] - **esm**: fix jsdoc type refs to `ModuleJobBase` in esm/loader (Jacob Smith) [#56499](https://github.com/nodejs/node/pull/56499)
- \[[`9cf9046bd7`](https://github.com/nodejs/node/commit/9cf9046bd7)] - _**Revert**_ "**events**: add hasEventListener util for validate" (origranot) [#56282](https://github.com/nodejs/node/pull/56282)
- \[[`b7fe54fc88`](https://github.com/nodejs/node/commit/b7fe54fc88)] - **(SEMVER-MINOR)** **fs**: allow `exclude` option in globs to accept glob patterns (Daeyeon Jeong) [#56489](https://github.com/nodejs/node/pull/56489)
- \[[`6ca27c2a59`](https://github.com/nodejs/node/commit/6ca27c2a59)] - **http2**: omit server name when HTTP2 host is IP address (islandryu) [#56530](https://github.com/nodejs/node/pull/56530)
- \[[`9f1fa199bf`](https://github.com/nodejs/node/commit/9f1fa199bf)] - **inspector**: roll inspector_protocol (Chengzhong Wu) [#56649](https://github.com/nodejs/node/pull/56649)
- \[[`0dae4bb3ab`](https://github.com/nodejs/node/commit/0dae4bb3ab)] - **inspector**: add undici http tracking support (Chengzhong Wu) [#56488](https://github.com/nodejs/node/pull/56488)
- \[[`2c6124cec4`](https://github.com/nodejs/node/commit/2c6124cec4)] - **inspector**: report loadingFinished until the response data is consumed (Chengzhong Wu) [#56372](https://github.com/nodejs/node/pull/56372)
- \[[`96ec862ce2`](https://github.com/nodejs/node/commit/96ec862ce2)] - **lib**: refactor execution.js (Marco Ippolito) [#56358](https://github.com/nodejs/node/pull/56358)
- \[[`3ac92ef607`](https://github.com/nodejs/node/commit/3ac92ef607)] - **(SEMVER-MINOR)** **lib**: add typescript support to STDIN eval (Marco Ippolito) [#56359](https://github.com/nodejs/node/pull/56359)
- \[[`d5bf3db0cf`](https://github.com/nodejs/node/commit/d5bf3db0cf)] - **lib**: allow skipping source maps in node_modules (Chengzhong Wu) [#56639](https://github.com/nodejs/node/pull/56639)
- \[[`d33eaf2bcb`](https://github.com/nodejs/node/commit/d33eaf2bcb)] - **lib**: ensure FORCE_COLOR forces color output in non-TTY environments (Pietro Marchini) [#55404](https://github.com/nodejs/node/pull/55404)
- \[[`dc003218a8`](https://github.com/nodejs/node/commit/dc003218a8)] - **lib**: optimize `prepareStackTrace` on builtin frames (Chengzhong Wu) [#56299](https://github.com/nodejs/node/pull/56299)
- \[[`df06524863`](https://github.com/nodejs/node/commit/df06524863)] - **lib**: suppress source map lookup exceptions (Chengzhong Wu) [#56299](https://github.com/nodejs/node/pull/56299)
- \[[`35335a5a66`](https://github.com/nodejs/node/commit/35335a5a66)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#56580](https://github.com/nodejs/node/pull/56580)
- \[[`1faabdb150`](https://github.com/nodejs/node/commit/1faabdb150)] - **meta**: add codeowners of security release document (Rafael Gonzaga) [#56521](https://github.com/nodejs/node/pull/56521)
- \[[`b4ece22ef5`](https://github.com/nodejs/node/commit/b4ece22ef5)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#56342](https://github.com/nodejs/node/pull/56342)
- \[[`9ec67e7ce0`](https://github.com/nodejs/node/commit/9ec67e7ce0)] - **meta**: move MoLow to TSC regular member (Moshe Atlow) [#56276](https://github.com/nodejs/node/pull/56276)
- \[[`bae4b2e20a`](https://github.com/nodejs/node/commit/bae4b2e20a)] - **module**: use more defensive code when handling SWC errors (Antoine du Hamel) [#56646](https://github.com/nodejs/node/pull/56646)
- \[[`1614e8e7bc`](https://github.com/nodejs/node/commit/1614e8e7bc)] - **(SEMVER-MINOR)** **module**: add ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX (Marco Ippolito) [#56610](https://github.com/nodejs/node/pull/56610)
- \[[`174d88eab1`](https://github.com/nodejs/node/commit/174d88eab1)] - **module**: support eval with ts syntax detection (Marco Ippolito) [#56285](https://github.com/nodejs/node/pull/56285)
- \[[`299d6fa829`](https://github.com/nodejs/node/commit/299d6fa829)] - **module**: fix jsdoc for `format` parameter in cjs/loader (pacexy) [#56501](https://github.com/nodejs/node/pull/56501)
- \[[`0307e4dd59`](https://github.com/nodejs/node/commit/0307e4dd59)] - **module**: unify TypeScript and .mjs handling in CommonJS (Joyee Cheung) [#55590](https://github.com/nodejs/node/pull/55590)
- \[[`1f4f9be93d`](https://github.com/nodejs/node/commit/1f4f9be93d)] - **module**: fix async resolution error within the sync `findPackageJSON` (Jacob Smith) [#56382](https://github.com/nodejs/node/pull/56382)
- \[[`bbedffa0f0`](https://github.com/nodejs/node/commit/bbedffa0f0)] - **module**: simplify `findPackageJSON` implementation (Antoine du Hamel) [#55543](https://github.com/nodejs/node/pull/55543)
- \[[`6d6cffa9cc`](https://github.com/nodejs/node/commit/6d6cffa9cc)] - **(SEMVER-MINOR)** **module**: add `findPackageJSON` util (Jacob Smith) [#55412](https://github.com/nodejs/node/pull/55412)
- \[[`cd7ce18233`](https://github.com/nodejs/node/commit/cd7ce18233)] - **module**: fix bad `require.resolve` with option paths for `.` and `..` (Dario Piotrowicz) [#56735](https://github.com/nodejs/node/pull/56735)
- \[[`152df4da21`](https://github.com/nodejs/node/commit/152df4da21)] - **module**: rethrow amaro error message (Marco Ippolito) [#56568](https://github.com/nodejs/node/pull/56568)
- \[[`acba5dc87e`](https://github.com/nodejs/node/commit/acba5dc87e)] - **module**: use buffer.toString base64 (Chengzhong Wu) [#56315](https://github.com/nodejs/node/pull/56315)
- \[[`01e69be8ff`](https://github.com/nodejs/node/commit/01e69be8ff)] - **node-api**: define version 10 (Gabriel Schulhof) [#55676](https://github.com/nodejs/node/pull/55676)
- \[[`724524528e`](https://github.com/nodejs/node/commit/724524528e)] - **node-api**: remove deprecated attribute from napi_module_register (Vladimir Morozov) [#56162](https://github.com/nodejs/node/pull/56162)
- \[[`c78e11064f`](https://github.com/nodejs/node/commit/c78e11064f)] - **process**: remove support for undocumented symbol (Antoine du Hamel) [#56552](https://github.com/nodejs/node/pull/56552)
- \[[`3f69b18a23`](https://github.com/nodejs/node/commit/3f69b18a23)] - **process**: fix symbol key and mark experimental new `node:process` methods (Antoine du Hamel) [#56517](https://github.com/nodejs/node/pull/56517)
- \[[`d35333ae18`](https://github.com/nodejs/node/commit/d35333ae18)] - **(SEMVER-MINOR)** **process**: add process.ref() and process.unref() methods (James M Snell) [#56400](https://github.com/nodejs/node/pull/56400)
- \[[`fa49f0f7d5`](https://github.com/nodejs/node/commit/fa49f0f7d5)] - **punycode**: limit deprecation warning (Colin Ihrig) [#56632](https://github.com/nodejs/node/pull/56632)
- \[[`d77c7073b7`](https://github.com/nodejs/node/commit/d77c7073b7)] - **sqlite**: disable memstatus APIs at build time (Colin Ihrig) [#56541](https://github.com/nodejs/node/pull/56541)
- \[[`07ff3ddcb5`](https://github.com/nodejs/node/commit/07ff3ddcb5)] - **(SEMVER-MINOR)** **sqlite**: support TypedArray and DataView in `StatementSync` (Alex Yang) [#56385](https://github.com/nodejs/node/pull/56385)
- \[[`b6c2e91365`](https://github.com/nodejs/node/commit/b6c2e91365)] - **sqlite**: enable SQL math functions (Colin Ihrig) [#56447](https://github.com/nodejs/node/pull/56447)
- \[[`3462263e8b`](https://github.com/nodejs/node/commit/3462263e8b)] - **sqlite**: pass conflict type to conflict resolution handler (Bart Louwers) [#56352](https://github.com/nodejs/node/pull/56352)
- \[[`89ba3af743`](https://github.com/nodejs/node/commit/89ba3af743)] - **src**: add nullptr handling from X509_STORE_new() (Burkov Egor) [#56700](https://github.com/nodejs/node/pull/56700)
- \[[`89a7c82e0c`](https://github.com/nodejs/node/commit/89a7c82e0c)] - **src**: add default value for RSACipherConfig mode field (Burkov Egor) [#56701](https://github.com/nodejs/node/pull/56701)
- \[[`7bae51e62e`](https://github.com/nodejs/node/commit/7bae51e62e)] - **src**: fix build with GCC 15 (tjuhaszrh) [#56740](https://github.com/nodejs/node/pull/56740)
- \[[`432a4b8bd6`](https://github.com/nodejs/node/commit/432a4b8bd6)] - **src**: fix to generate path from wchar_t via wstring (yamachu) [#56696](https://github.com/nodejs/node/pull/56696)
- \[[`8c9eaf82f0`](https://github.com/nodejs/node/commit/8c9eaf82f0)] - **src**: initialize FSReqWrapSync in path that uses it (Michaël Zasso) [#56613](https://github.com/nodejs/node/pull/56613)
- \[[`bcdb42d40b`](https://github.com/nodejs/node/commit/bcdb42d40b)] - **src**: handle duplicate paths granted (Rafael Gonzaga) [#56591](https://github.com/nodejs/node/pull/56591)
- \[[`d6a7acc207`](https://github.com/nodejs/node/commit/d6a7acc207)] - **src**: update ECKeyPointer in ncrypto (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
- \[[`01922f8b1f`](https://github.com/nodejs/node/commit/01922f8b1f)] - **src**: update ECPointPointer in ncrypto (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
- \[[`2a3a36eceb`](https://github.com/nodejs/node/commit/2a3a36eceb)] - **src**: update ECGroupPointer in ncrypto (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
- \[[`67c10cdacb`](https://github.com/nodejs/node/commit/67c10cdacb)] - **src**: update ECDASSigPointer implementation in ncrypto (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
- \[[`17f931c68b`](https://github.com/nodejs/node/commit/17f931c68b)] - **src**: cleaning up more crypto internals for ncrypto (James M Snell) [#56526](https://github.com/nodejs/node/pull/56526)
- \[[`94d3fe1b62`](https://github.com/nodejs/node/commit/94d3fe1b62)] - **(SEMVER-MINOR)** **src**: add --disable-sigusr1 to prevent signal i/o thread (Rafael Gonzaga) [#56441](https://github.com/nodejs/node/pull/56441)
- \[[`6594ee8dff`](https://github.com/nodejs/node/commit/6594ee8dff)] - **src**: fix undefined script name in error source (Chengzhong Wu) [#56502](https://github.com/nodejs/node/pull/56502)
- \[[`b46bad3e91`](https://github.com/nodejs/node/commit/b46bad3e91)] - **src**: refactor --trace-env to reuse option selection and handling (Joyee Cheung) [#56293](https://github.com/nodejs/node/pull/56293)
- \[[`76921b822b`](https://github.com/nodejs/node/commit/76921b822b)] - **src**: minor cleanups on OneByteString usage (James M Snell) [#56482](https://github.com/nodejs/node/pull/56482)
- \[[`3f0d1dd4fe`](https://github.com/nodejs/node/commit/3f0d1dd4fe)] - **src**: move more crypto impl detail to ncrypto dep (James M Snell) [#56421](https://github.com/nodejs/node/pull/56421)
- \[[`04f623b283`](https://github.com/nodejs/node/commit/04f623b283)] - **src**: fixup more ToLocalChecked uses in node_file (James M Snell) [#56484](https://github.com/nodejs/node/pull/56484)
- \[[`5aa436f5a1`](https://github.com/nodejs/node/commit/5aa436f5a1)] - **src**: make some minor ToLocalChecked cleanups (James M Snell) [#56483](https://github.com/nodejs/node/pull/56483)
- \[[`6eec5e7ec2`](https://github.com/nodejs/node/commit/6eec5e7ec2)] - **src**: lock the thread properly in snapshot builder (Joyee Cheung) [#56327](https://github.com/nodejs/node/pull/56327)
- \[[`5614993968`](https://github.com/nodejs/node/commit/5614993968)] - **src**: drain platform tasks before creating startup snapshot (Chengzhong Wu) [#56403](https://github.com/nodejs/node/pull/56403)
- \[[`48493e9fd5`](https://github.com/nodejs/node/commit/48493e9fd5)] - **src**: use LocalVector in more places (James M Snell) [#56457](https://github.com/nodejs/node/pull/56457)
- \[[`7e5ea0681e`](https://github.com/nodejs/node/commit/7e5ea0681e)] - **src**: use v8::LocalVector consistently with other minor cleanups (James M Snell) [#56417](https://github.com/nodejs/node/pull/56417)
- \[[`ad3d857f2b`](https://github.com/nodejs/node/commit/ad3d857f2b)] - **src**: use starts_with in fs_permission.cc (ishabi) [#55811](https://github.com/nodejs/node/pull/55811)
- \[[`5afffb4415`](https://github.com/nodejs/node/commit/5afffb4415)] - **(SEMVER-MINOR)** **src,worker**: add isInternalWorker (Carlos Espa) [#56469](https://github.com/nodejs/node/pull/56469)
- \[[`7d1676e72e`](https://github.com/nodejs/node/commit/7d1676e72e)] - **stream**: fix typo in ReadableStreamBYOBReader.readIntoRequests (Mattias Buelens) [#56560](https://github.com/nodejs/node/pull/56560)
- \[[`e658ea6b26`](https://github.com/nodejs/node/commit/e658ea6b26)] - **stream**: validate undefined sizeAlgorithm in WritableStream (Jason Zhang) [#56067](https://github.com/nodejs/node/pull/56067)
- \[[`e4f133c20c`](https://github.com/nodejs/node/commit/e4f133c20c)] - **test**: add ts eval snapshots (Marco Ippolito) [#56358](https://github.com/nodejs/node/pull/56358)
- \[[`f041742400`](https://github.com/nodejs/node/commit/f041742400)] - **test**: remove empty lines from snapshots (Marco Ippolito) [#56358](https://github.com/nodejs/node/pull/56358)
- \[[`801cde91f6`](https://github.com/nodejs/node/commit/801cde91f6)] - **test**: reduce number of written chunks (Luigi Pinca) [#56757](https://github.com/nodejs/node/pull/56757)
- \[[`6fdf1879ab`](https://github.com/nodejs/node/commit/6fdf1879ab)] - **test**: fix invalid common.mustSucceed() usage (Luigi Pinca) [#56756](https://github.com/nodejs/node/pull/56756)
- \[[`d2bfbfa364`](https://github.com/nodejs/node/commit/d2bfbfa364)] - **test**: use strict mode in global setters test (Rich Trott) [#56742](https://github.com/nodejs/node/pull/56742)
- \[[`5c030da42f`](https://github.com/nodejs/node/commit/5c030da42f)] - **test**: cleanup and simplify test-crypto-aes-wrap (James M Snell) [#56748](https://github.com/nodejs/node/pull/56748)
- \[[`f1442d6eaf`](https://github.com/nodejs/node/commit/f1442d6eaf)] - **test**: do not use common.isMainThread (Luigi Pinca) [#56768](https://github.com/nodejs/node/pull/56768)
- \[[`49405bd9e7`](https://github.com/nodejs/node/commit/49405bd9e7)] - **test**: make some requires lazy in common/index (James M Snell) [#56715](https://github.com/nodejs/node/pull/56715)
- \[[`52ef376788`](https://github.com/nodejs/node/commit/52ef376788)] - **test**: add test that uses multibyte for path and resolves modules (yamachu) [#56696](https://github.com/nodejs/node/pull/56696)
- \[[`b811dea85a`](https://github.com/nodejs/node/commit/b811dea85a)] - **test**: replace more uses of `global` with `globalThis` (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
- \[[`eb97076199`](https://github.com/nodejs/node/commit/eb97076199)] - **test**: make common/index slightly less node.js specific (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
- \[[`1795202d19`](https://github.com/nodejs/node/commit/1795202d19)] - **test**: rely less on duplicative common test harness utilities (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
- \[[`5be29a274e`](https://github.com/nodejs/node/commit/5be29a274e)] - **test**: simplify common/index.js (James M Snell) [#56712](https://github.com/nodejs/node/pull/56712)
- \[[`92e99780f0`](https://github.com/nodejs/node/commit/92e99780f0)] - **test**: move hasMultiLocalhost to common/net (James M Snell) [#56716](https://github.com/nodejs/node/pull/56716)
- \[[`1c3204a4cc`](https://github.com/nodejs/node/commit/1c3204a4cc)] - **test**: move crypto related common utilities in common/crypto (James M Snell) [#56714](https://github.com/nodejs/node/pull/56714)
- \[[`fe79d63be0`](https://github.com/nodejs/node/commit/fe79d63be0)] - **test**: add missing test for env file (Jonas) [#56642](https://github.com/nodejs/node/pull/56642)
- \[[`e08af61537`](https://github.com/nodejs/node/commit/e08af61537)] - **test**: enforce strict mode in test-zlib-const (Rich Trott) [#56689](https://github.com/nodejs/node/pull/56689)
- \[[`c96792d7f8`](https://github.com/nodejs/node/commit/c96792d7f8)] - **test**: fix localization data for ICU 74.2 (Antoine du Hamel) [#56661](https://github.com/nodejs/node/pull/56661)
- \[[`48b72f1195`](https://github.com/nodejs/node/commit/48b72f1195)] - **test**: use --permission instead of --experimental-permission (Rafael Gonzaga) [#56685](https://github.com/nodejs/node/pull/56685)
- \[[`de81d90fce`](https://github.com/nodejs/node/commit/de81d90fce)] - **test**: test-stream-compose.js doesn't need internals (Meghan Denny) [#56619](https://github.com/nodejs/node/pull/56619)
- \[[`f5b8499ad0`](https://github.com/nodejs/node/commit/f5b8499ad0)] - **test**: add maxCount and gcOptions to gcUntil() (Joyee Cheung) [#56522](https://github.com/nodejs/node/pull/56522)
- \[[`d9e5a81041`](https://github.com/nodejs/node/commit/d9e5a81041)] - **test**: add line break at end of file (Rafael Gonzaga) [#56588](https://github.com/nodejs/node/pull/56588)
- \[[`59be346fbf`](https://github.com/nodejs/node/commit/59be346fbf)] - **test**: mark test-worker-prof as flaky on smartos (Joyee Cheung) [#56583](https://github.com/nodejs/node/pull/56583)
- \[[`12a2cae9e5`](https://github.com/nodejs/node/commit/12a2cae9e5)] - **test**: update test-child-process-bad-stdio to use node:test (Colin Ihrig) [#56562](https://github.com/nodejs/node/pull/56562)
- \[[`2dc4a30e19`](https://github.com/nodejs/node/commit/2dc4a30e19)] - **test**: disable openssl 3.4.0 incompatible tests (Jelle van der Waa) [#56160](https://github.com/nodejs/node/pull/56160)
- \[[`1950fbf51d`](https://github.com/nodejs/node/commit/1950fbf51d)] - **test**: make test-crypto-hash compatible with OpenSSL > 3.4.0 (Jelle van der Waa) [#56160](https://github.com/nodejs/node/pull/56160)
- \[[`a533420a91`](https://github.com/nodejs/node/commit/a533420a91)] - **test**: clarify fork inherit permission flags (Rafael Gonzaga) [#56523](https://github.com/nodejs/node/pull/56523)
- \[[`697e799dc1`](https://github.com/nodejs/node/commit/697e799dc1)] - **test**: add error only reporter for node:test (Carlos Espa) [#56438](https://github.com/nodejs/node/pull/56438)
- \[[`4844fa212d`](https://github.com/nodejs/node/commit/4844fa212d)] - **test**: mark test-http-server-request-timeouts-mixed as flaky (Joyee Cheung) [#56503](https://github.com/nodejs/node/pull/56503)
- \[[`843c2389b9`](https://github.com/nodejs/node/commit/843c2389b9)] - **test**: update error code in tls-psk-circuit for for OpenSSL 3.4 (sebastianas) [#56420](https://github.com/nodejs/node/pull/56420)
- \[[`ccb2ddbd83`](https://github.com/nodejs/node/commit/ccb2ddbd83)] - **test**: update compiled sqlite tests to match other tests (Colin Ihrig) [#56446](https://github.com/nodejs/node/pull/56446)
- \[[`b40f50324d`](https://github.com/nodejs/node/commit/b40f50324d)] - **test**: add initial test426 coverage (Chengzhong Wu) [#56436](https://github.com/nodejs/node/pull/56436)
- \[[`059f81e4fd`](https://github.com/nodejs/node/commit/059f81e4fd)] - **test**: update test-set-http-max-http-headers to use node:test (Colin Ihrig) [#56439](https://github.com/nodejs/node/pull/56439)
- \[[`ec2940b418`](https://github.com/nodejs/node/commit/ec2940b418)] - **test**: update test-child-process-windows-hide to use node:test (Colin Ihrig) [#56437](https://github.com/nodejs/node/pull/56437)
- \[[`0362924880`](https://github.com/nodejs/node/commit/0362924880)] - **test**: use unusual chars in the path to ensure our tests are robust (Antoine du Hamel) [#48409](https://github.com/nodejs/node/pull/48409)
- \[[`b6c3869910`](https://github.com/nodejs/node/commit/b6c3869910)] - **test**: improve abort signal dropping test (Edy Silva) [#56339](https://github.com/nodejs/node/pull/56339)
- \[[`cc648ef923`](https://github.com/nodejs/node/commit/cc648ef923)] - **test**: enable ts test on win arm64 (Marco Ippolito) [#56349](https://github.com/nodejs/node/pull/56349)
- \[[`68819b4997`](https://github.com/nodejs/node/commit/68819b4997)] - **test**: deflake test-watch-file-shared-dependency (Luigi Pinca) [#56344](https://github.com/nodejs/node/pull/56344)
- \[[`ca6ed2190c`](https://github.com/nodejs/node/commit/ca6ed2190c)] - **test**: skip `test-sqlite-extensions` when SQLite is not built by us (Antoine du Hamel) [#56341](https://github.com/nodejs/node/pull/56341)
- \[[`8ffeb8b58c`](https://github.com/nodejs/node/commit/8ffeb8b58c)] - **test**: increase spin for eventloop test on s390 (Michael Dawson) [#56228](https://github.com/nodejs/node/pull/56228)
- \[[`6ae9950f08`](https://github.com/nodejs/node/commit/6ae9950f08)] - **test**: migrate message eval tests from Python to JS (Yiyun Lei) [#50482](https://github.com/nodejs/node/pull/50482)
- \[[`4352bf69e9`](https://github.com/nodejs/node/commit/4352bf69e9)] - **test**: check typescript loader (Marco Ippolito) [#54657](https://github.com/nodejs/node/pull/54657)
- \[[`406e7db9c3`](https://github.com/nodejs/node/commit/406e7db9c3)] - **test**: remove async-hooks/test-writewrap flaky designation (Luigi Pinca) [#56048](https://github.com/nodejs/node/pull/56048)
- \[[`fa56ab2bba`](https://github.com/nodejs/node/commit/fa56ab2bba)] - **test**: deflake test-esm-loader-hooks-inspect-brk (Luigi Pinca) [#56050](https://github.com/nodejs/node/pull/56050)
- \[[`8e149aac99`](https://github.com/nodejs/node/commit/8e149aac99)] - **test**: add test case for listeners (origranot) [#56282](https://github.com/nodejs/node/pull/56282)
- \[[`a3f5ef22cd`](https://github.com/nodejs/node/commit/a3f5ef22cd)] - **test**: make `test-permission-sqlite-load-extension` more robust (Antoine du Hamel) [#56295](https://github.com/nodejs/node/pull/56295)
- \[[`8cbb7cc838`](https://github.com/nodejs/node/commit/8cbb7cc838)] - **test_runner**: print failing assertion only once with spec reporter (Pietro Marchini) [#56662](https://github.com/nodejs/node/pull/56662)
- \[[`1f426bad9a`](https://github.com/nodejs/node/commit/1f426bad9a)] - **test_runner**: remove unused errors (Pietro Marchini) [#56607](https://github.com/nodejs/node/pull/56607)
- \[[`697a851fb3`](https://github.com/nodejs/node/commit/697a851fb3)] - **(SEMVER-MINOR)** **test_runner**: add TestContext.prototype.waitFor() (Colin Ihrig) [#56595](https://github.com/nodejs/node/pull/56595)
- \[[`047537b48c`](https://github.com/nodejs/node/commit/047537b48c)] - **(SEMVER-MINOR)** **test_runner**: add t.assert.fileSnapshot() (Colin Ihrig) [#56459](https://github.com/nodejs/node/pull/56459)
- \[[`19b4aa4b14`](https://github.com/nodejs/node/commit/19b4aa4b14)] - **test_runner**: run single test file benchmark (Pietro Marchini) [#56479](https://github.com/nodejs/node/pull/56479)
- \[[`926cf84e95`](https://github.com/nodejs/node/commit/926cf84e95)] - **(SEMVER-MINOR)** **test_runner**: add assert.register() API (Colin Ihrig) [#56434](https://github.com/nodejs/node/pull/56434)
- \[[`fb4661a4cf`](https://github.com/nodejs/node/commit/fb4661a4cf)] - **test_runner**: finish marking snapshot testing as stable (Colin Ihrig) [#56425](https://github.com/nodejs/node/pull/56425)
- \[[`900c6c3940`](https://github.com/nodejs/node/commit/900c6c3940)] - **tls**: fix error stack conversion in cryptoErrorListToException() (Joyee Cheung) [#56554](https://github.com/nodejs/node/pull/56554)
- \[[`e9f185b658`](https://github.com/nodejs/node/commit/e9f185b658)] - **tools**: update doc to new version (Node.js GitHub Bot) [#56259](https://github.com/nodejs/node/pull/56259)
- \[[`7644c7e619`](https://github.com/nodejs/node/commit/7644c7e619)] - **tools**: update inspector_protocol roller (Chengzhong Wu) [#56649](https://github.com/nodejs/node/pull/56649)
- \[[`362272b0a4`](https://github.com/nodejs/node/commit/362272b0a4)] - **tools**: do not throw on missing `create-release-proposal.sh` (Antoine du Hamel) [#56704](https://github.com/nodejs/node/pull/56704)
- \[[`df8b835953`](https://github.com/nodejs/node/commit/df8b835953)] - **tools**: fix tools-deps-update (Daniel Lemire) [#56684](https://github.com/nodejs/node/pull/56684)
- \[[`feba5d3274`](https://github.com/nodejs/node/commit/feba5d3274)] - **tools**: do not throw on missing `create-release-proposal.sh` (Antoine du Hamel) [#56695](https://github.com/nodejs/node/pull/56695)
- \[[`9827f7d395`](https://github.com/nodejs/node/commit/9827f7d395)] - **tools**: fix permissions in `lint-release-proposal` workflow (Antoine du Hamel) [#56614](https://github.com/nodejs/node/pull/56614)
- \[[`14c562c0dc`](https://github.com/nodejs/node/commit/14c562c0dc)] - **tools**: remove github reporter (Carlos Espa) [#56468](https://github.com/nodejs/node/pull/56468)
- \[[`ed1785d0ae`](https://github.com/nodejs/node/commit/ed1785d0ae)] - **tools**: edit `create-release-proposal` workflow (Antoine du Hamel) [#56540](https://github.com/nodejs/node/pull/56540)
- \[[`294e4c42f5`](https://github.com/nodejs/node/commit/294e4c42f5)] - **tools**: validate commit list as part of `lint-release-commit` (Antoine du Hamel) [#56291](https://github.com/nodejs/node/pull/56291)
- \[[`98d3474267`](https://github.com/nodejs/node/commit/98d3474267)] - **tools**: fix loong64 build failed (Xiao-Tao) [#56466](https://github.com/nodejs/node/pull/56466)
- \[[`3e729ceec8`](https://github.com/nodejs/node/commit/3e729ceec8)] - **tools**: disable unneeded rule ignoring in Python linting (Rich Trott) [#56429](https://github.com/nodejs/node/pull/56429)
- \[[`d5c05328e2`](https://github.com/nodejs/node/commit/d5c05328e2)] - **tools**: use a configurable value for number of open dependabot PRs (Antoine du Hamel) [#56427](https://github.com/nodejs/node/pull/56427)
- \[[`1705cbe002`](https://github.com/nodejs/node/commit/1705cbe002)] - **tools**: bump the eslint group in /tools/eslint with 4 updates (dependabot\[bot]) [#56426](https://github.com/nodejs/node/pull/56426)
- \[[`53b29b0469`](https://github.com/nodejs/node/commit/53b29b0469)] - **tools**: fix `require-common-first` lint rule from subfolder (Antoine du Hamel) [#56325](https://github.com/nodejs/node/pull/56325)
- \[[`105c4ed4fb`](https://github.com/nodejs/node/commit/105c4ed4fb)] - **tools**: add release line label when opening release proposal (Antoine du Hamel) [#56317](https://github.com/nodejs/node/pull/56317)
- \[[`30f61f4aa5`](https://github.com/nodejs/node/commit/30f61f4aa5)] - **url**: use resolved path to convert UNC paths to URL (Antoine du Hamel) [#56302](https://github.com/nodejs/node/pull/56302)
- \[[`a0aef4dfb6`](https://github.com/nodejs/node/commit/a0aef4dfb6)] - **util**: inspect: do not crash on an Error stack that contains a Symbol (Jordan Harband) [#56573](https://github.com/nodejs/node/pull/56573)
- \[[`a8a060341f`](https://github.com/nodejs/node/commit/a8a060341f)] - **util**: inspect: do not crash on an Error with a regex `name` (Jordan Harband) [#56574](https://github.com/nodejs/node/pull/56574)
- \[[`ea66bf3553`](https://github.com/nodejs/node/commit/ea66bf3553)] - **util**: rename CallSite.column to columnNumber (Chengzhong Wu) [#56584](https://github.com/nodejs/node/pull/56584)
- \[[`9cdc3b373c`](https://github.com/nodejs/node/commit/9cdc3b373c)] - **util**: do not crash on inspecting function with `Symbol` name (Jordan Harband) [#56572](https://github.com/nodejs/node/pull/56572)
- \[[`0bfbb68569`](https://github.com/nodejs/node/commit/0bfbb68569)] - **util**: expose CallSite.scriptId (Chengzhong Wu) [#56551](https://github.com/nodejs/node/pull/56551)
- \[[`5dd7116e09`](https://github.com/nodejs/node/commit/5dd7116e09)] - **watch**: reload env file for --env-file-if-exists (Jonas) [#56643](https://github.com/nodejs/node/pull/56643)
- \[[`c658a8afdf`](https://github.com/nodejs/node/commit/c658a8afdf)] - **(SEMVER-MINOR)** **worker**: add eval ts input (Marco Ippolito) [#56394](https://github.com/nodejs/node/pull/56394)
- \[[`2e5d038f48`](https://github.com/nodejs/node/commit/2e5d038f48)] - **worker**: refactor stdio to improve performance (Matteo Collina) [#56630](https://github.com/nodejs/node/pull/56630)
- \[[`f959805d01`](https://github.com/nodejs/node/commit/f959805d01)] - **worker**: flush stdout and stderr on exit (Matteo Collina) [#56428](https://github.com/nodejs/node/pull/56428)

Windows 32-bit Installer: https://nodejs.org/dist/v22.14.0/node-v22.14.0-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.14.0/node-v22.14.0-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.14.0/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.14.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.14.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.14.0/node-v22.14.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.14.0/node-v22.14.0.tar.gz \
Other release files: https://nodejs.org/dist/v22.14.0/ \
Documentation: https://nodejs.org/docs/v22.14.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

ddec69aded8f826efbef8b4af09baa451f5ed8b057e84d836accf33de04d2d7a  node-v22.14.0-aix-ppc64.tar.gz
d733bc14c2da6b69af4d89117b39d33cc1a7c7a75a21cf9fa4bfe81884db70e5  node-v22.14.0-arm64.msi
e9404633bc02a5162c5c573b1e2490f5fb44648345d64a958b17e325729a5e42  node-v22.14.0-darwin-arm64.tar.gz
4e845cb71b4e897289312743b2e31c405a8a48720655404d82a4dce23fc43527  node-v22.14.0-darwin-arm64.tar.xz
6698587713ab565a94a360e091df9f6d91c8fadda6d00f0cf6526e9b40bed250  node-v22.14.0-darwin-x64.tar.gz
deb5b211c25f3f803cd49c1c3fc3964e6c3725546d7d9608d994270388dcbf02  node-v22.14.0-darwin-x64.tar.xz
715aedf641a024efdeeccd545ce4acdc4759155e08c32efdfe9069921fcfa86b  node-v22.14.0-headers.tar.gz
63406b4329c080a8ff3e5c8794cae82ad9ef1ebb8b8d8c73f82d2077810e0eaf  node-v22.14.0-headers.tar.xz
8cf30ff7250f9463b53c18f89c6c606dfda70378215b2c905d0a9a8b08bd45e0  node-v22.14.0-linux-arm64.tar.gz
08bfbf538bad0e8cbb0269f0173cca28d705874a67a22f60b57d99dc99e30050  node-v22.14.0-linux-arm64.tar.xz
1cadf5aee7d71b6f0921235faec05e42d908ba5e8a76959f0697968fe0741204  node-v22.14.0-linux-armv7l.tar.gz
32804b6d7fca03e668765e91ea892dd329ff928d02e6c61d4b3b3c4afac178c6  node-v22.14.0-linux-armv7l.tar.xz
a0818ece898175db71a1df81dc4fdc3794a14b03a3901894a88e465e745ea429  node-v22.14.0-linux-ppc64le.tar.gz
70aeb7b16dabce5395b1ed383f60416c8d8ed693927003f948c0b5390a35ce5f  node-v22.14.0-linux-ppc64le.tar.xz
0e4232e4b3c0312a391bb9c0c36524623b3b616cac5d0338d743ae4228f984d1  node-v22.14.0-linux-s390x.tar.gz
a666b8ce5e442dbdbb5a2280f29caad603a723017aac5acf5baff5b16e648981  node-v22.14.0-linux-s390x.tar.xz
9d942932535988091034dc94cc5f42b6dc8784d6366df3a36c4c9ccb3996f0c2  node-v22.14.0-linux-x64.tar.gz
69b09dba5c8dcb05c4e4273a4340db1005abeafe3927efda2bc5b249e80437ec  node-v22.14.0-linux-x64.tar.xz
06113f553199227be915d80c191031283622d6363c57c83aad137ff33f9ac9e4  node-v22.14.0-win-arm64.7z
2d71f5f9b2fffa33baa108c07d74b0d24e0c3dd8f441d567772ae0e3dd4b1a22  node-v22.14.0-win-arm64.zip
4c6018bd170ca46bfc7112bc4ca0f43cf55759a0c2bb9fccd50d8f8c3f7bdb14  node-v22.14.0-win-x64.7z
55b639295920b219bb2acbcfa00f90393a2789095b7323f79475c9f34795f217  node-v22.14.0-win-x64.zip
5f7514392d0330c1b0c76e0dd299ac44786139b59231bf3d115f85c9c763bd4f  node-v22.14.0-win-x86.7z
4bf00caba7b0f3c7a4e8ee6a5b73049db19b5ee5510473219ae5fb649c2017b6  node-v22.14.0-win-x86.zip
2c0cc97ec64c1e4111362e1e32e0547fd870e4d9c79ec844c117da583f21b386  node-v22.14.0-x64.msi
5e91ec1da6c7de32406f3f7fdd2b8de163e871ecd2ebb466bf1b526e6379755c  node-v22.14.0-x86.msi
3931585e6af0785f01af897d31d67b7318e724af07845ffb04d432ab1a4532b4  node-v22.14.0.pkg
6c4e31ed5702dc45cfd8c435af56a36a474427e1bd7afe74c346136060beba8a  node-v22.14.0.tar.gz
c609946bf793b55c7954c26582760808d54c16185d79cb2fb88065e52de21914  node-v22.14.0.tar.xz
b37c6950508f266d066deb91abe2050fcd3f19e34c86ca89eed72efb40090b57  win-arm64/node.exe
988eb8c60a5ade17e652dbdb60d56d3c6ad5e599a99ce04932b8c4c86583cdaf  win-arm64/node.lib
37bf09d40005ba618a49aec998c275c56e390df501c824ed73c87520834de4b3  win-arm64/node_pdb.7z
6d51bdae6ec86490338d22eb133ae34c00be9052455f94cb44d08062097ed02c  win-arm64/node_pdb.zip
33b1bc1a8aca11fd5a4f2699e51019c63c0af30cf437701d07af69be7706771b  win-x64/node.exe
65e45757c026c93a170743a811ef1b921ae12d6d9dd62d258bbbca0626687626  win-x64/node.lib
652acb96f8c81f6fb27517f729465a5644c02efd27d60925389323b11cb44ee8  win-x64/node_pdb.7z
b4722c573f3a387de9e259b116cefd36870516947c1048fda425f1641d72a7b9  win-x64/node_pdb.zip
d52f9f1b03eca305dbaa23e251fe612efbb48a99aaeab6ffa073ee1c111b28e0  win-x86/node.exe
79bae10059e833ce7fa4de05e5601034461327e2e7cb75c2144b87d4ab5ac547  win-x86/node.lib
2f2313b969b715af1c59aa7d7a84c36f7d09cc5e0c6c6dc9365bad6341e06ae2  win-x86/node_pdb.7z
45edff3492d39ffee520881ab1050afc2b515cb6817285a153291af04af2c668  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEwNYkhDnx1WBKr/tAIdkA/9sjN1YFAmerKiUACgkQIdkA/9sj
N1baDw/9GGx+nxucDIL5sfN6dnU4i0bodGVlCGh8RKotUuexbZkZ2SrlYokuJfM8
c+NFUeUTimNgeGXxuReQZ0U5oCC9YVrEsoSFyHsUJjx9D+mNhKw/beWdZrA1m5L2
I6BzGOZwkJ1PygJM0mQ/l0Wp0ZMbMVW2N9cvj+u/2HtJ7a/H9n938R51uMofELy2
I7l0hm/Q53X8nhpYfNXEhrqVRWs8mWZ9ha/pA1ydI/YWPlIs1jdPkD+ULteMsc37
7vv0JqYHAvnIov2H5SDW9WMfX+RUAqSWL570PhmmK1InnI+VfFAPhOozueugtVmd
CsKy+nUMHV3R5P5Nalq0X6lfGiaFGMjOVMZ1TFAG/cwOl8ZK/pWK1VVArKfN6Vgq
pOUFh8iSohfBseglcBbK+OA9HVM8tGGGydfprKkuzLIekRyl8yoInGLRtEVpcHQx
wsEG3Ycgwxd4ico8IlWburUswSzplmmeJhiyOzk3y449rrohgDD7Z0SQgaVe5vNu
br3o/bRwqufjUqaG63Wu4iYRgKuUdTAOEc1x4ne71L37rL6aA51SfqAKjYYNsbRi
BJ9/2R9J0a899nd0Sin5w+3Bo18ABnFn7Zgnyd2ow3qN3p74hjzBw4Msc5kJ1mQy
DyOevQux9/w9cYj7UOp+Ahyp8Egs/0QtxT651zL4LzXD7TQE+5M=
=DK2a
-----END PGP SIGNATURE-----
```
