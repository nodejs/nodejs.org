---
date: '2025-03-13T23:00:19.186Z'
category: release
title: Node.js v23.10.0 (Current)
layout: blog-post
author: Antoine du Hamel
---

## 2025-03-13, Version 23.10.0 (Current), @aduh95

### Notable Changes

#### Introducing `--experimental-config-file`

With the introduction of test runner, SEA, and other feature that require a lot
of flags, a JSON config flag would improve by a lot the developer experience and
increase adoption.

You can have a `node.config.json` containing:

```json
{
  "$schema": "https://nodejs.org/dist/v23.10.0/docs/node-config-schema.json",
  "nodeOptions": {
    "test-coverage-lines": 80,
    "test-coverage-branches": 60
  }
}
```

You can run your tests without passing the flags defined in the config file.

```bash
node --experimental-default-config-file --test --experimental-test-coverage
```

or

```bash
node --experimental-config-file=node.config.json --test --experimental-test-coverage
```

Node.js will not sanitize or perform validation on the user-provided configuration,
so only ever use trusted configuration files.

Contributed by Marco Ippolito in [#57016](https://github.com/nodejs/node/pull/57016)
and [#57171](https://github.com/nodejs/node/pull/57171).

#### Other Notable Changes

- \[[`323e3ac93c`](https://github.com/nodejs/node/commit/323e3ac93c)] - **crypto**: update root certificates to NSS 3.108 (Node.js GitHub Bot) [#57381](https://github.com/nodejs/node/pull/57381)
- \[[`6fd2ec6816`](https://github.com/nodejs/node/commit/6fd2ec6816)] - **doc**: add `@geeksilva97` to collaborators (Edy Silva) [#57241](https://github.com/nodejs/node/pull/57241)
- \[[`d8937f1742`](https://github.com/nodejs/node/commit/d8937f1742)] - **(SEMVER-MINOR)** **src**: create `THROW_ERR_OPTIONS_BEFORE_BOOTSTRAPPING` (Marco Ippolito) [#57016](https://github.com/nodejs/node/pull/57016)
- \[[`5054fc7941`](https://github.com/nodejs/node/commit/5054fc7941)] - **(SEMVER-MINOR)** **test_runner**: change ts default glob (Marco Ippolito) [#57359](https://github.com/nodejs/node/pull/57359)
- \[[`75f11ae1cc`](https://github.com/nodejs/node/commit/75f11ae1cc)] - **(SEMVER-MINOR)** **tls**: implement `tls.getCACertificates()` (Joyee Cheung) [#57107](https://github.com/nodejs/node/pull/57107)
- \[[`a22c21ceb8`](https://github.com/nodejs/node/commit/a22c21ceb8)] - **(SEMVER-MINOR)** **v8**: add `v8.getCppHeapStatistics()` method (Aditi) [#57146](https://github.com/nodejs/node/pull/57146)

### Commits

- \[[`2daee76b26`](https://github.com/nodejs/node/commit/2daee76b26)] - **assert**: improve myers diff performance (Giovanni Bucci) [#57279](https://github.com/nodejs/node/pull/57279)
- \[[`2fbd3bbea7`](https://github.com/nodejs/node/commit/2fbd3bbea7)] - **build**: fix compatibility with V8's `depot_tools` (Richard Lau) [#57330](https://github.com/nodejs/node/pull/57330)
- \[[`6a2e4c5fc1`](https://github.com/nodejs/node/commit/6a2e4c5fc1)] - **build,win**: disable node pch with ccache (Stefan Stojanovic) [#57224](https://github.com/nodejs/node/pull/57224)
- \[[`323e3ac93c`](https://github.com/nodejs/node/commit/323e3ac93c)] - **crypto**: update root certificates to NSS 3.108 (Node.js GitHub Bot) [#57381](https://github.com/nodejs/node/pull/57381)
- \[[`906f23d0e7`](https://github.com/nodejs/node/commit/906f23d0e7)] - **crypto**: add support for intermediate certs in --use-system-ca (Tim Jacomb) [#57164](https://github.com/nodejs/node/pull/57164)
- \[[`03cd7920c8`](https://github.com/nodejs/node/commit/03cd7920c8)] - **deps**: update simdjson to 3.12.2 (Node.js GitHub Bot) [#57084](https://github.com/nodejs/node/pull/57084)
- \[[`9e1fce9a5c`](https://github.com/nodejs/node/commit/9e1fce9a5c)] - **deps**: update archs files for openssl-3.0.16 (Node.js GitHub Bot) [#57335](https://github.com/nodejs/node/pull/57335)
- \[[`4056c1f83e`](https://github.com/nodejs/node/commit/4056c1f83e)] - **deps**: upgrade openssl sources to quictls/openssl-3.0.16 (Node.js GitHub Bot) [#57335](https://github.com/nodejs/node/pull/57335)
- \[[`b402799070`](https://github.com/nodejs/node/commit/b402799070)] - **deps**: update corepack to 0.32.0 (Node.js GitHub Bot) [#57265](https://github.com/nodejs/node/pull/57265)
- \[[`ce1cfff79a`](https://github.com/nodejs/node/commit/ce1cfff79a)] - **deps**: update amaro to 0.4.1 (marco-ippolito) [#57121](https://github.com/nodejs/node/pull/57121)
- \[[`0ac977d679`](https://github.com/nodejs/node/commit/0ac977d679)] - **deps**: update gyp file for ngtcp2 1.11.0 (Richard Lau) [#57225](https://github.com/nodejs/node/pull/57225)
- \[[`f34d78df1f`](https://github.com/nodejs/node/commit/f34d78df1f)] - **deps**: update ada to 3.1.3 (Node.js GitHub Bot) [#57222](https://github.com/nodejs/node/pull/57222)
- \[[`4fe9916701`](https://github.com/nodejs/node/commit/4fe9916701)] - **dns**: remove redundant code using common variable (Deokjin Kim) [#57386](https://github.com/nodejs/node/pull/57386)
- \[[`1c271b162b`](https://github.com/nodejs/node/commit/1c271b162b)] - **doc**: make first parameter optional in `util.getCallSites` (Deokjin Kim) [#57387](https://github.com/nodejs/node/pull/57387)
- \[[`77668fffec`](https://github.com/nodejs/node/commit/77668fffec)] - **doc**: fix usage of module.registerSync in comment (Timo Kössler) [#57328](https://github.com/nodejs/node/pull/57328)
- \[[`9b4f7aac69`](https://github.com/nodejs/node/commit/9b4f7aac69)] - **doc**: add Darshan back as voting TSC member (Michael Dawson) [#57402](https://github.com/nodejs/node/pull/57402)
- \[[`d44ccb319c`](https://github.com/nodejs/node/commit/d44ccb319c)] - **doc**: revise webcrypto.md types, interfaces, and added versions (Filip Skokan) [#57376](https://github.com/nodejs/node/pull/57376)
- \[[`f4de7cef01`](https://github.com/nodejs/node/commit/f4de7cef01)] - **doc**: add info on how project manages social media (Michael Dawson) [#57318](https://github.com/nodejs/node/pull/57318)
- \[[`792ef16921`](https://github.com/nodejs/node/commit/792ef16921)] - **doc**: revise `tsconfig.json` note (Steven) [#57353](https://github.com/nodejs/node/pull/57353)
- \[[`4e438c3fa3`](https://github.com/nodejs/node/commit/4e438c3fa3)] - **doc**: use more clear name in getSystemErrorMessage's example (ikuma-t) [#57310](https://github.com/nodejs/node/pull/57310)
- \[[`5c9f1a40e4`](https://github.com/nodejs/node/commit/5c9f1a40e4)] - **doc**: recommend setting `noEmit: true` in `tsconfig.json` (Steven) [#57320](https://github.com/nodejs/node/pull/57320)
- \[[`e178acf9d8`](https://github.com/nodejs/node/commit/e178acf9d8)] - **doc**: ping nodejs/tsc for each security pull request (Rafael Gonzaga) [#57309](https://github.com/nodejs/node/pull/57309)
- \[[`fbe464e28c`](https://github.com/nodejs/node/commit/fbe464e28c)] - **doc**: fix Windows ccache section position (Stefan Stojanovic) [#57326](https://github.com/nodejs/node/pull/57326)
- \[[`3fe8eac0ba`](https://github.com/nodejs/node/commit/3fe8eac0ba)] - **doc**: update node-api version matrix (Chengzhong Wu) [#57287](https://github.com/nodejs/node/pull/57287)
- \[[`d2f49e7fcf`](https://github.com/nodejs/node/commit/d2f49e7fcf)] - **doc**: recommend `erasableSyntaxOnly` in ts docs (Rob Palmer) [#57271](https://github.com/nodejs/node/pull/57271)
- \[[`03844d99f8`](https://github.com/nodejs/node/commit/03844d99f8)] - **doc**: clarify `path.isAbsolute` is not path traversal mitigation (Eric Fortis) [#57073](https://github.com/nodejs/node/pull/57073)
- \[[`0f8cd32986`](https://github.com/nodejs/node/commit/0f8cd32986)] - **doc**: fix rendering of DEP0174 description (David Sanders) [#56835](https://github.com/nodejs/node/pull/56835)
- \[[`f95ecca71f`](https://github.com/nodejs/node/commit/f95ecca71f)] - **doc**: add 1ilsang to triage team (1ilsang) [#57183](https://github.com/nodejs/node/pull/57183)
- \[[`6fd2ec6816`](https://github.com/nodejs/node/commit/6fd2ec6816)] - **doc**: add @geeksilva97 to collaborators (Edy Silva) [#57241](https://github.com/nodejs/node/pull/57241)
- \[[`b74e0ff7d7`](https://github.com/nodejs/node/commit/b74e0ff7d7)] - **doc**: add missing assert return types (Colin Ihrig) [#57219](https://github.com/nodejs/node/pull/57219)
- \[[`83eed33562`](https://github.com/nodejs/node/commit/83eed33562)] - **doc**: add streamResetBurst and streamResetRate (Sujal Raj) [#57195](https://github.com/nodejs/node/pull/57195)
- \[[`7f48811295`](https://github.com/nodejs/node/commit/7f48811295)] - **doc**: add esm examples to node:util (Alfredo González) [#56793](https://github.com/nodejs/node/pull/56793)
- \[[`5c20dcc166`](https://github.com/nodejs/node/commit/5c20dcc166)] - **esm**: fix module.exports export on CJS modules (Guy Bedford) [#57366](https://github.com/nodejs/node/pull/57366)
- \[[`041a217a4d`](https://github.com/nodejs/node/commit/041a217a4d)] - **fs**: fix rmSync error code (Paul Schwabauer) [#57103](https://github.com/nodejs/node/pull/57103)
- \[[`cea50b7f39`](https://github.com/nodejs/node/commit/cea50b7f39)] - **lib**: optimize priority queue (Gürgün Dayıoğlu) [#57100](https://github.com/nodejs/node/pull/57100)
- \[[`5204d495ae`](https://github.com/nodejs/node/commit/5204d495ae)] - **meta**: bump codecov/codecov-action from 5.3.1 to 5.4.0 (dependabot\[bot]) [#57257](https://github.com/nodejs/node/pull/57257)
- \[[`89599be988`](https://github.com/nodejs/node/commit/89599be988)] - **meta**: bump github/codeql-action from 3.28.8 to 3.28.10 (dependabot\[bot]) [#57254](https://github.com/nodejs/node/pull/57254)
- \[[`66cd3850bc`](https://github.com/nodejs/node/commit/66cd3850bc)] - **meta**: bump ossf/scorecard-action from 2.4.0 to 2.4.1 (dependabot\[bot]) [#57253](https://github.com/nodejs/node/pull/57253)
- \[[`6c22e446bc`](https://github.com/nodejs/node/commit/6c22e446bc)] - **meta**: set nodejs/config as codeowner (Marco Ippolito) [#57237](https://github.com/nodejs/node/pull/57237)
- \[[`ee5ce5ccde`](https://github.com/nodejs/node/commit/ee5ce5ccde)] - **meta**: move RaisinTen back to collaborators, triagers and SEA champion (Darshan Sen) [#57292](https://github.com/nodejs/node/pull/57292)
- \[[`0b0c9cc0f5`](https://github.com/nodejs/node/commit/0b0c9cc0f5)] - **meta**: bump actions/download-artifact from 4.1.8 to 4.1.9 (dependabot\[bot]) [#57260](https://github.com/nodejs/node/pull/57260)
- \[[`e6a98af8bd`](https://github.com/nodejs/node/commit/e6a98af8bd)] - **meta**: bump peter-evans/create-pull-request from 7.0.6 to 7.0.7 (dependabot\[bot]) [#57259](https://github.com/nodejs/node/pull/57259)
- \[[`91394aaf3d`](https://github.com/nodejs/node/commit/91394aaf3d)] - **meta**: bump step-security/harden-runner from 2.10.4 to 2.11.0 (dependabot\[bot]) [#57258](https://github.com/nodejs/node/pull/57258)
- \[[`63dbbe7c91`](https://github.com/nodejs/node/commit/63dbbe7c91)] - **meta**: bump actions/cache from 4.2.0 to 4.2.2 (dependabot\[bot]) [#57256](https://github.com/nodejs/node/pull/57256)
- \[[`d5ccf174ad`](https://github.com/nodejs/node/commit/d5ccf174ad)] - **meta**: bump actions/upload-artifact from 4.6.0 to 4.6.1 (dependabot\[bot]) [#57255](https://github.com/nodejs/node/pull/57255)
- \[[`46b06be9a3`](https://github.com/nodejs/node/commit/46b06be9a3)] - **module**: handle cached linked async jobs in require(esm) (Joyee Cheung) [#57187](https://github.com/nodejs/node/pull/57187)
- \[[`718305db6f`](https://github.com/nodejs/node/commit/718305db6f)] - **module**: add dynamic file-specific ESM warnings (Mert Can Altin) [#56628](https://github.com/nodejs/node/pull/56628)
- \[[`4762f4ada5`](https://github.com/nodejs/node/commit/4762f4ada5)] - **net**: validate non-string host for socket.connect (Daeyeon Jeong) [#57198](https://github.com/nodejs/node/pull/57198)
- \[[`d07bd79ac5`](https://github.com/nodejs/node/commit/d07bd79ac5)] - **net**: replace brand checks with identity checks (Yagiz Nizipli) [#57341](https://github.com/nodejs/node/pull/57341)
- \[[`a757f00747`](https://github.com/nodejs/node/commit/a757f00747)] - **net**: emit an error when custom lookup resolves to a non-string address (Edy Silva) [#57192](https://github.com/nodejs/node/pull/57192)
- \[[`984f7ef5bd`](https://github.com/nodejs/node/commit/984f7ef5bd)] - **readline**: add support for `Symbol.dispose` (Antoine du Hamel) [#57276](https://github.com/nodejs/node/pull/57276)
- \[[`21b6423b9b`](https://github.com/nodejs/node/commit/21b6423b9b)] - **sqlite**: reset statement immediately in run() (Colin Ihrig) [#57350](https://github.com/nodejs/node/pull/57350)
- \[[`e80bbb7355`](https://github.com/nodejs/node/commit/e80bbb7355)] - **sqlite,test,doc**: allow Buffer and URL as database location (Edy Silva) [#56991](https://github.com/nodejs/node/pull/56991)
- \[[`3dc3207298`](https://github.com/nodejs/node/commit/3dc3207298)] - **src**: do not pass nullptr to std::string ctor (Charles Kerr) [#57354](https://github.com/nodejs/node/pull/57354)
- \[[`5e51c62569`](https://github.com/nodejs/node/commit/5e51c62569)] - **src**: fix process exit listeners not receiving unsettled tla codes (Dario Piotrowicz) [#56872](https://github.com/nodejs/node/pull/56872)
- \[[`bf788d9d86`](https://github.com/nodejs/node/commit/bf788d9d86)] - **src**: refactor SubtleCrypto algorithm and length validations (Filip Skokan) [#57319](https://github.com/nodejs/node/pull/57319)
- \[[`37664e8485`](https://github.com/nodejs/node/commit/37664e8485)] - **src**: fix node_config_file.h compilation error in GN build (Cheng) [#57210](https://github.com/nodejs/node/pull/57210)
- \[[`274c18a365`](https://github.com/nodejs/node/commit/274c18a365)] - **(SEMVER-MINOR)** **src**: set default config as node.config.json (Marco Ippolito) [#57171](https://github.com/nodejs/node/pull/57171)
- \[[`433657de8c`](https://github.com/nodejs/node/commit/433657de8c)] - **src**: namespace config file flags (Marco Ippolito) [#57170](https://github.com/nodejs/node/pull/57170)
- \[[`d8937f1742`](https://github.com/nodejs/node/commit/d8937f1742)] - **(SEMVER-MINOR)** **src**: create THROW_ERR_OPTIONS_BEFORE_BOOTSTRAPPING (Marco Ippolito) [#57016](https://github.com/nodejs/node/pull/57016)
- \[[`9fd217daa9`](https://github.com/nodejs/node/commit/9fd217daa9)] - **(SEMVER-MINOR)** **src**: add config file support (Marco Ippolito) [#57016](https://github.com/nodejs/node/pull/57016)
- \[[`b17163b130`](https://github.com/nodejs/node/commit/b17163b130)] - **src**: allow embedder customization of OOMErrorHandler (Shelley Vohr) [#57325](https://github.com/nodejs/node/pull/57325)
- \[[`6f1c622466`](https://github.com/nodejs/node/commit/6f1c622466)] - **src**: use Maybe\<void> in ProcessEmitWarningSync (Daeyeon Jeong) [#57250](https://github.com/nodejs/node/pull/57250)
- \[[`4d86a42aa4`](https://github.com/nodejs/node/commit/4d86a42aa4)] - **src**: remove redundant qualifiers in src/quic (Yagiz Nizipli) [#56967](https://github.com/nodejs/node/pull/56967)
- \[[`41ea5a2864`](https://github.com/nodejs/node/commit/41ea5a2864)] - **src**: make even more improvements to error handling (James M Snell) [#57264](https://github.com/nodejs/node/pull/57264)
- \[[`7a554d9bf3`](https://github.com/nodejs/node/commit/7a554d9bf3)] - **src**: use cached `emit` v8::String (Daeyeon Jeong) [#57249](https://github.com/nodejs/node/pull/57249)
- \[[`b10ac9a958`](https://github.com/nodejs/node/commit/b10ac9a958)] - **src**: refactor SubtleCrypto algorithm and length validations (Filip Skokan) [#57273](https://github.com/nodejs/node/pull/57273)
- \[[`90cd780ca6`](https://github.com/nodejs/node/commit/90cd780ca6)] - **src**: make more error handling improvements (James M Snell) [#57262](https://github.com/nodejs/node/pull/57262)
- \[[`17c9e76722`](https://github.com/nodejs/node/commit/17c9e76722)] - **src**: fix typo in comment (Antoine du Hamel) [#57291](https://github.com/nodejs/node/pull/57291)
- \[[`35c283a3f3`](https://github.com/nodejs/node/commit/35c283a3f3)] - **src**: reduce string allocations on sqlite (Yagiz Nizipli) [#57227](https://github.com/nodejs/node/pull/57227)
- \[[`185d1ffe93`](https://github.com/nodejs/node/commit/185d1ffe93)] - **src**: improve error handling in `node_messaging.cc` (James M Snell) [#57211](https://github.com/nodejs/node/pull/57211)
- \[[`96b2bfb88c`](https://github.com/nodejs/node/commit/96b2bfb88c)] - **src**: improve error handling in `tty_wrap.cc` (James M Snell) [#57211](https://github.com/nodejs/node/pull/57211)
- \[[`f845ad953e`](https://github.com/nodejs/node/commit/f845ad953e)] - **src**: improve error handling in `tcp_wrap.cc` (James M Snell) [#57211](https://github.com/nodejs/node/pull/57211)
- \[[`350f62de6c`](https://github.com/nodejs/node/commit/350f62de6c)] - **src**: fix ThrowInvalidURL call in PathToFileURL (Daniel M Brasil) [#57141](https://github.com/nodejs/node/pull/57141)
- \[[`936a9997b2`](https://github.com/nodejs/node/commit/936a9997b2)] - **src**: improve error handling in buffer and dotenv (James M Snell) [#57189](https://github.com/nodejs/node/pull/57189)
- \[[`975e2a5c1d`](https://github.com/nodejs/node/commit/975e2a5c1d)] - **src**: improve error handling in module_wrap (James M Snell) [#57188](https://github.com/nodejs/node/pull/57188)
- \[[`3d103ecfbe`](https://github.com/nodejs/node/commit/3d103ecfbe)] - **src**: improve error handling in spawn_sync (James M Snell) [#57185](https://github.com/nodejs/node/pull/57185)
- \[[`98d328a1d6`](https://github.com/nodejs/node/commit/98d328a1d6)] - **src**: detect whether the string is one byte representation or not (theweipeng) [#56147](https://github.com/nodejs/node/pull/56147)
- \[[`15d7908656`](https://github.com/nodejs/node/commit/15d7908656)] - **stream**: fix sizeAlgorithm validation in WritableStream (Daeyeon Jeong) [#57280](https://github.com/nodejs/node/pull/57280)
- \[[`b866755299`](https://github.com/nodejs/node/commit/b866755299)] - **test**: test runner run plan (Pietro Marchini) [#57304](https://github.com/nodejs/node/pull/57304)
- \[[`e05e0e5772`](https://github.com/nodejs/node/commit/e05e0e5772)] - **test**: update WPT for urlpattern to 3b6b19853a (Node.js GitHub Bot) [#57377](https://github.com/nodejs/node/pull/57377)
- \[[`36542b5611`](https://github.com/nodejs/node/commit/36542b5611)] - **test**: update WPT for WebCryptoAPI to edd42c005c (Node.js GitHub Bot) [#57365](https://github.com/nodejs/node/pull/57365)
- \[[`28792ee59a`](https://github.com/nodejs/node/commit/28792ee59a)] - **test**: skip `test-config-json-schema` with quic (Richard Lau) [#57225](https://github.com/nodejs/node/pull/57225)
- \[[`5a21fa4573`](https://github.com/nodejs/node/commit/5a21fa4573)] - **test**: add more coverage to node_config_file (Marco Ippolito) [#57170](https://github.com/nodejs/node/pull/57170)
- \[[`99b2369142`](https://github.com/nodejs/node/commit/99b2369142)] - **test**: simplify test-tls-connect-abort-controller.js (Yagiz Nizipli) [#57338](https://github.com/nodejs/node/pull/57338)
- \[[`4af2f7f9a8`](https://github.com/nodejs/node/commit/4af2f7f9a8)] - **test**: use `assert.match` in `test-esm-import-meta` (Antoine du Hamel) [#57290](https://github.com/nodejs/node/pull/57290)
- \[[`99abfb6172`](https://github.com/nodejs/node/commit/99abfb6172)] - **test**: update compression wpt (Yagiz Nizipli) [#56960](https://github.com/nodejs/node/pull/56960)
- \[[`f8dde3a391`](https://github.com/nodejs/node/commit/f8dde3a391)] - **test**: skip uv-thread-name on IBM i (Abdirahim Musse) [#57299](https://github.com/nodejs/node/pull/57299)
- \[[`3bf546c317`](https://github.com/nodejs/node/commit/3bf546c317)] - _**Revert**_ "**test**: temporary remove resource check from fs read-write" (Rafael Gonzaga) [#56906](https://github.com/nodejs/node/pull/56906)
- \[[`8d0f1a7dbf`](https://github.com/nodejs/node/commit/8d0f1a7dbf)] - **test**: module syntax should throw (Marco Ippolito) [#57121](https://github.com/nodejs/node/pull/57121)
- \[[`0fd3d91e3a`](https://github.com/nodejs/node/commit/0fd3d91e3a)] - **test**: more common.mustNotCall in net, tls (Meghan Denny) [#57246](https://github.com/nodejs/node/pull/57246)
- \[[`f803d6ca29`](https://github.com/nodejs/node/commit/f803d6ca29)] - **test**: swap assert.strictEqual() parameters (Luigi Pinca) [#57217](https://github.com/nodejs/node/pull/57217)
- \[[`eb3576fde0`](https://github.com/nodejs/node/commit/eb3576fde0)] - **test**: assert write return values in buffer-bigint64 (Meghan Denny) [#57212](https://github.com/nodejs/node/pull/57212)
- \[[`a08981025a`](https://github.com/nodejs/node/commit/a08981025a)] - **test**: allow embedder running async context frame test (Shelley Vohr) [#57193](https://github.com/nodejs/node/pull/57193)
- \[[`20c032ed98`](https://github.com/nodejs/node/commit/20c032ed98)] - **test**: resolve race condition in test-net-write-fully-async-\* (Matteo Collina) [#57022](https://github.com/nodejs/node/pull/57022)
- \[[`5054fc7941`](https://github.com/nodejs/node/commit/5054fc7941)] - **(SEMVER-MINOR)** **test_runner**: change ts default glob (Marco Ippolito) [#57359](https://github.com/nodejs/node/pull/57359)
- \[[`0ad450f295`](https://github.com/nodejs/node/commit/0ad450f295)] - **timers**: simplify the compareTimersLists function (Gürgün Dayıoğlu) [#57110](https://github.com/nodejs/node/pull/57110)
- \[[`75f11ae1cc`](https://github.com/nodejs/node/commit/75f11ae1cc)] - **(SEMVER-MINOR)** **tls**: implement tls.getCACertificates() (Joyee Cheung) [#57107](https://github.com/nodejs/node/pull/57107)
- \[[`2b2267f203`](https://github.com/nodejs/node/commit/2b2267f203)] - **tools**: add config subspace (Marco Ippolito) [#57239](https://github.com/nodejs/node/pull/57239)
- \[[`8e64d38e91`](https://github.com/nodejs/node/commit/8e64d38e91)] - **tools**: import rather than require ESLint plugins (Michaël Zasso) [#57315](https://github.com/nodejs/node/pull/57315)
- \[[`2569e56b95`](https://github.com/nodejs/node/commit/2569e56b95)] - **tools**: switch back to official OpenSSL (Richard Lau) [#57301](https://github.com/nodejs/node/pull/57301)
- \[[`fd49144378`](https://github.com/nodejs/node/commit/fd49144378)] - **tools**: extract target abseil to abseil.gyp (Chengzhong Wu) [#57289](https://github.com/nodejs/node/pull/57289)
- \[[`77e1a85d24`](https://github.com/nodejs/node/commit/77e1a85d24)] - **tools**: revert to use @stylistic/eslint-plugin-js v3 (Joyee Cheung) [#57314](https://github.com/nodejs/node/pull/57314)
- \[[`2fa6e65262`](https://github.com/nodejs/node/commit/2fa6e65262)] - **tools**: add more details about rolling inspector_protocol (Chengzhong Wu) [#57167](https://github.com/nodejs/node/pull/57167)
- \[[`5788574cdf`](https://github.com/nodejs/node/commit/5788574cdf)] - **tools**: bump the eslint group in /tools/eslint with 5 updates (dependabot\[bot]) [#57261](https://github.com/nodejs/node/pull/57261)
- \[[`5955acadba`](https://github.com/nodejs/node/commit/5955acadba)] - **tools**: remove deps/zlib/GN-scraper.py (Chengzhong Wu) [#57238](https://github.com/nodejs/node/pull/57238)
- \[[`a22c21ceb8`](https://github.com/nodejs/node/commit/a22c21ceb8)] - **(SEMVER-MINOR)** **v8**: add v8.getCppHeapStatistics() method (Aditi) [#57146](https://github.com/nodejs/node/pull/57146)
- \[[`17d4074114`](https://github.com/nodejs/node/commit/17d4074114)] - **win,build**: add option to enable Control Flow Guard (Hüseyin Açacak) [#56605](https://github.com/nodejs/node/pull/56605)

Windows 64-bit Installer: https://nodejs.org/dist/v23.10.0/node-v23.10.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v23.10.0/node-v23.10.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v23.10.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v23.10.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v23.10.0/node-v23.10.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v23.10.0/node-v23.10.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v23.10.0/node-v23.10.0.tar.gz \
Other release files: https://nodejs.org/dist/v23.10.0/ \
Documentation: https://nodejs.org/docs/v23.10.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

269cc2c2ec25228285a9f4221567a9d501171958ad3a3a468ea4d5b422b6df23  node-v23.10.0-aix-ppc64.tar.gz
3aeb0efbc5bddeccec4881f2c513ed542dab80d3111a6d21f1637579996bdecb  node-v23.10.0-arm64.msi
f44ff5990735df42c79820654e2e394b6351ac9fd5eb140c3cae953cf7af302c  node-v23.10.0-darwin-arm64.tar.gz
906014f3ea4d304e94066cf6a1cccd917004f91c3c5750ea72d6360847a77794  node-v23.10.0-darwin-arm64.tar.xz
6c60ebd659dddca673ae7deff9e8e1cc4048f81a6311811a98ba4fe98372275f  node-v23.10.0-darwin-x64.tar.gz
af866d719bfb543937e06073dcbaa95b6a441a7b37f916ddbabf95192c5a1db8  node-v23.10.0-darwin-x64.tar.xz
bcacf2e9aeeff7937e500602ea4b5552272a71ff4aad254cd9c7e155823d4752  node-v23.10.0-headers.tar.gz
aaf870014a959855c2e945ca32fb35ff5f261aa511768142abdcc7f515e2e591  node-v23.10.0-headers.tar.xz
a7a2d642f43436ea22b0a050a3e7b8b9876ea33410e0d74cb18c0901cc9635d0  node-v23.10.0-linux-arm64.tar.gz
7ae7c3faffbbdaccace20cc7877ea4800bd551998ca0042c69d9f191358ee1d2  node-v23.10.0-linux-arm64.tar.xz
fac3f7d4f42dac741e3a538f9fa356b23c81272fe7bc135b944a30b7a4b3face  node-v23.10.0-linux-armv7l.tar.gz
48adacddfc26605c9f0bf228a288b5c81bda80b4dd736372511e1cec999925d9  node-v23.10.0-linux-armv7l.tar.xz
ef494e1627423e15aae09c283de854f5e745bcd95bc5dc58652c040307ffded5  node-v23.10.0-linux-ppc64le.tar.gz
6350023929c0abc926e18bdfa03fe6d170a1e274a8d7a8c4697910e1ab521108  node-v23.10.0-linux-ppc64le.tar.xz
78c176dcb05578c31cb5866ab294ba361b2659e3b20ac816fd644b234e3a0394  node-v23.10.0-linux-s390x.tar.gz
b8753a73b000dac3f607de2f4f3c4384cf707ae876027f20e5e2392a1d71df36  node-v23.10.0-linux-s390x.tar.xz
26f85defcb75e3f8f00c6ad429f9a5b2fb1766e955045fe97e31b11c44315f2d  node-v23.10.0-linux-x64.tar.gz
c0ab11362d0d671469b3a0bfcc6fb484fee5747ca96f93a3917d9ba34f12f535  node-v23.10.0-linux-x64.tar.xz
1f845932ee31868e60f1008ab8909ce2fbc4abce4c38d5d9ab2b4ec81096a16b  node-v23.10.0.pkg
27fea91e7df3f3a18875f76afb63ba4ac60926ffb10ad2be557160ef48787266  node-v23.10.0.tar.gz
b39e5fbd3debb8318ddea6af3e89b07dafb891421fb7ca99fbe19c99adabe5fd  node-v23.10.0.tar.xz
8bca1cc8618b45ba3d4673deac5f6fe023f6e80d0f221a7e034bade294c29299  node-v23.10.0-win-arm64.7z
8ccbf4f4128b7d474b5c0a681dc2bf3dc2d5010fd7a40febe0340d0ad42f0efa  node-v23.10.0-win-arm64.zip
8d56f1d2a39ec17f45b53f35c201ec206db8c9d052fdc32d9a36efd41608c7e4  node-v23.10.0-win-x64.7z
3f6a293a669a3b9e887fa2f9acb64df37923f165a76de635d72f992b0dbf51bd  node-v23.10.0-win-x64.zip
c66e9f5cf6ccb829dcdd9a2de5d1e9c57a9e622b6e71305538fa379d98b49014  node-v23.10.0-x64.msi
23b358a865d69a93bf59e3c696221b5d1754b7de1f66a105da94e7d110add8da  win-arm64/node.exe
b04fc2c4f04273feaae3a2bc372d507fa631d7d6fd5f11265219d5b10d083a3e  win-arm64/node.lib
18b6e9ffdd83f7ad3e3a59a5a5e210f4beb7d55c3d7913fd072813f6e3907603  win-arm64/node_pdb.7z
aacfae8af0893328cb1d2f25d65be4b466d38bf0808a477e50de8291a3cb6e8e  win-arm64/node_pdb.zip
bfa36e570411930744920e9333cd2eca94d8021f1181efc7dccbf14499427b3b  win-x64/node.exe
7005ad268c2a3b55e741957609696fd707982d8d7727325c44e2cbf23f00f565  win-x64/node.lib
667ccd6c5f4af88956085ec03648526b3379dbe4693ab37ee08eae0af5f19bce  win-x64/node_pdb.7z
dd1073af01c2c5ca68d22600ba781f641fb1151d5ed69e6c1de068552255ec14  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEwNYkhDnx1WBKr/tAIdkA/9sjN1YFAmfTYyUACgkQIdkA/9sj
N1YjcRAAlAonkkTWhUX3wxlVYGmXsBsWfKn5tty06i0YHmAqtwqq9IyutcuP//V6
MKT0VfXOWR/bjVGzvThDrQkmuoTEz8L8DVh7mspfh8KFfuxoXGfGMPfwa1AB/5gJ
rn/RG0iyYjsEAdJmPe3hoyjxTFIO4aRAQlVO7bH/6fkfee4mJ6TKbFMuQgnXPG9D
pLA4dH+vE6FcFK0PQhZWVo9yTkGpt7V6NoVGDVK5sPnH2OjzUwYW8jfSaJBnX8Ix
AttcOP7tynSRLNOY+EHBMxh3o+Y2WZbneHcR2QbdQM84NMev//9yexLrDxT7Oigc
SM/iXx1hEjdFRQR87rCvoHnVrpRo7rnaRd9yvptuyk1/IyYeCO1xLvZPcy/eia2S
Q4CrAc9sSRI6Q9dq5/PhyBisEnxCLwN/3wJq03+upAWEWvM6tAH8/aBPEutyy0Nh
re8Yakasrovq5JO9aHsi462XobDnVlFQ5ObACcJxhL7OMBfrzqfB6AUzMbysQnH6
ZQNmbrxvrFO2aVrGEEJkwuC2yQQIRjqSY+G3T+gEYdqoQr5V27rS8qdMAbOJR0w/
ypzNwyL18m2+OZTCMj0amd0zoQpPr06QLxQKemR7+cBMoMaQSL4XqIQ/XdICO7rC
TJzjzOuCLrq/R6LxPSv2Q7+jTjhFOG3zFsiwMvMMyBMklOIBwJo=
=2HpS
-----END PGP SIGNATURE-----
```
