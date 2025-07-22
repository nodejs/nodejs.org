---
date: '2025-02-10T13:55:43.353Z'
category: release
title: Node.js v20.18.3 (LTS)
layout: blog-post
author: Marco Ippolito
---

## 2025-02-10, Version 20.18.3 'Iron' (LTS), @marco-ippolito

### Notable Changes

- \[[`030f155986`](https://github.com/nodejs/node/commit/030f155986)] - **esm**: mark import attributes and JSON module as stable (Nicolò Ribaudo) [#55333](https://github.com/nodejs/node/pull/55333)
- \[[`b9b006331f`](https://github.com/nodejs/node/commit/b9b006331f)] - **doc**: add LJHarb to collaborators (Jordan Harband) [#56132](https://github.com/nodejs/node/pull/56132)
- \[[`39b89e90b4`](https://github.com/nodejs/node/commit/39b89e90b4)] - **doc**: enforce strict policy to semver-major releases (Rafael Gonzaga) [#55732](https://github.com/nodejs/node/pull/55732)
- \[[`247fa1959f`](https://github.com/nodejs/node/commit/247fa1959f)] - **crypto**: update root certificates to NSS 3.104 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
- \[[`adfc2f993a`](https://github.com/nodejs/node/commit/adfc2f993a)] - **tools**: fix root certificate updater (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
- \[[`29862ae105`](https://github.com/nodejs/node/commit/29862ae105)] - **doc**: add jazelly to collaborators (Jason Zhang) [#55531](https://github.com/nodejs/node/pull/55531)

### Commits

- \[[`b4f5da18a5`](https://github.com/nodejs/node/commit/b4f5da18a5)] - **benchmark**: add `test-reporters` (Aviv Keller) [#55757](https://github.com/nodejs/node/pull/55757)
- \[[`407992e272`](https://github.com/nodejs/node/commit/407992e272)] - **benchmark**: add `test_runner/mock-fn` (Aviv Keller) [#55771](https://github.com/nodejs/node/pull/55771)
- \[[`17abec4367`](https://github.com/nodejs/node/commit/17abec4367)] - **benchmark**: add nodeTiming.uvmetricsinfo bench (RafaelGSS) [#55614](https://github.com/nodejs/node/pull/55614)
- \[[`43f7050338`](https://github.com/nodejs/node/commit/43f7050338)] - **benchmark**: add --runs support to run.js (Rafael Gonzaga) [#55158](https://github.com/nodejs/node/pull/55158)
- \[[`470789a981`](https://github.com/nodejs/node/commit/470789a981)] - **benchmark**: adjust byte size for buffer-copy (Rafael Gonzaga) [#55295](https://github.com/nodejs/node/pull/55295)
- \[[`ea1c97ac16`](https://github.com/nodejs/node/commit/ea1c97ac16)] - **buffer**: document concat zero-fill (Duncan) [#55562](https://github.com/nodejs/node/pull/55562)
- \[[`ae683a9e1f`](https://github.com/nodejs/node/commit/ae683a9e1f)] - **build**: set DESTCPU correctly for 'make binary' on loongarch64 (吴小白) [#56271](https://github.com/nodejs/node/pull/56271)
- \[[`af020edf96`](https://github.com/nodejs/node/commit/af020edf96)] - **build**: fix missing fp16 dependency in d8 builds (Joyee Cheung) [#56266](https://github.com/nodejs/node/pull/56266)
- \[[`d6a1b74404`](https://github.com/nodejs/node/commit/d6a1b74404)] - **build**: add major release action (Rafael Gonzaga) [#56199](https://github.com/nodejs/node/pull/56199)
- \[[`bc92a96a5a`](https://github.com/nodejs/node/commit/bc92a96a5a)] - **build**: allow overriding clang usage (Shelley Vohr) [#56016](https://github.com/nodejs/node/pull/56016)
- \[[`f370ec0989`](https://github.com/nodejs/node/commit/f370ec0989)] - **build**: remove defaults for create-release-proposal (Rafael Gonzaga) [#56042](https://github.com/nodejs/node/pull/56042)
- \[[`25e1862e87`](https://github.com/nodejs/node/commit/25e1862e87)] - **build**: set node_arch to target_cpu in GN (Shelley Vohr) [#55967](https://github.com/nodejs/node/pull/55967)
- \[[`55c205e5f6`](https://github.com/nodejs/node/commit/55c205e5f6)] - **build**: add create release proposal action (Rafael Gonzaga) [#55690](https://github.com/nodejs/node/pull/55690)
- \[[`9f14ba808d`](https://github.com/nodejs/node/commit/9f14ba808d)] - **build**: implement node_use_amaro flag in GN build (Cheng) [#55798](https://github.com/nodejs/node/pull/55798)
- \[[`046430c47e`](https://github.com/nodejs/node/commit/046430c47e)] - **build**: fix building with system icu 76 (Michael Cho) [#55563](https://github.com/nodejs/node/pull/55563)
- \[[`0b6d62c812`](https://github.com/nodejs/node/commit/0b6d62c812)] - **build**: fix GN arg used in generate_config_gypi.py (Shelley Vohr) [#55530](https://github.com/nodejs/node/pull/55530)
- \[[`8f9c642369`](https://github.com/nodejs/node/commit/8f9c642369)] - **build**: fix GN build for cares/uv deps (Cheng) [#55477](https://github.com/nodejs/node/pull/55477)
- \[[`284e932326`](https://github.com/nodejs/node/commit/284e932326)] - **build**: fix uninstall script for AIX 7.1 (Cloorc) [#55438](https://github.com/nodejs/node/pull/55438)
- \[[`2f71f168ef`](https://github.com/nodejs/node/commit/2f71f168ef)] - **build**: tidy up cares.gyp (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
- \[[`e89e807522`](https://github.com/nodejs/node/commit/e89e807522)] - **build**: synchronize list of c-ares source files (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
- \[[`5eb6c94851`](https://github.com/nodejs/node/commit/5eb6c94851)] - **build**: fix path concatenation (Mohammed Keyvanzadeh) [#55387](https://github.com/nodejs/node/pull/55387)
- \[[`720d23f3ac`](https://github.com/nodejs/node/commit/720d23f3ac)] - **build**: fix make errors that occur in Makefile (minkyu_kim) [#55287](https://github.com/nodejs/node/pull/55287)
- \[[`dc552c6739`](https://github.com/nodejs/node/commit/dc552c6739)] - **build,win**: enable pch for clang-cl (Stefan Stojanovic) [#55249](https://github.com/nodejs/node/pull/55249)
- \[[`64b140d484`](https://github.com/nodejs/node/commit/64b140d484)] - **cli**: add `--heap-prof` flag available to `NODE_OPTIONS` (Juan José) [#54259](https://github.com/nodejs/node/pull/54259)
- \[[`23fb644037`](https://github.com/nodejs/node/commit/23fb644037)] - **crypto**: ensure CryptoKey usages and algorithm are cached objects (Filip Skokan) [#56108](https://github.com/nodejs/node/pull/56108)
- \[[`247fa1959f`](https://github.com/nodejs/node/commit/247fa1959f)] - **crypto**: update root certificates to NSS 3.104 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
- \[[`3c4262a171`](https://github.com/nodejs/node/commit/3c4262a171)] - **deps**: V8: cherry-pick 26fd1dfa9cd6 (Shu-yu Guo) [#55961](https://github.com/nodejs/node/pull/55961)
- \[[`558e6588a4`](https://github.com/nodejs/node/commit/558e6588a4)] - **deps**: V8: backport ae5a4db8ad86 (Shu-yu Guo) [#55961](https://github.com/nodejs/node/pull/55961)
- \[[`169bc58447`](https://github.com/nodejs/node/commit/169bc58447)] - **deps**: update simdutf to 5.6.4 (Node.js GitHub Bot) [#56255](https://github.com/nodejs/node/pull/56255)
- \[[`bc7bb1e269`](https://github.com/nodejs/node/commit/bc7bb1e269)] - **deps**: update c-ares to v1.34.4 (Node.js GitHub Bot) [#56256](https://github.com/nodejs/node/pull/56256)
- \[[`782bb6cac4`](https://github.com/nodejs/node/commit/782bb6cac4)] - **deps**: update zlib to 1.3.0.1-motley-82a5fec (Node.js GitHub Bot) [#55980](https://github.com/nodejs/node/pull/55980)
- \[[`f7131cf178`](https://github.com/nodejs/node/commit/f7131cf178)] - **deps**: update corepack to 0.30.0 (Node.js GitHub Bot) [#55977](https://github.com/nodejs/node/pull/55977)
- \[[`b09f6abcd3`](https://github.com/nodejs/node/commit/b09f6abcd3)] - **deps**: update simdutf to 5.6.3 (Node.js GitHub Bot) [#55973](https://github.com/nodejs/node/pull/55973)
- \[[`d63ccb60ea`](https://github.com/nodejs/node/commit/d63ccb60ea)] - **deps**: update zlib to 1.3.0.1-motley-7e2e4d7 (Node.js GitHub Bot) [#54432](https://github.com/nodejs/node/pull/54432)
- \[[`a2f315ef8b`](https://github.com/nodejs/node/commit/a2f315ef8b)] - **deps**: update simdutf to 5.6.2 (Node.js GitHub Bot) [#55889](https://github.com/nodejs/node/pull/55889)
- \[[`afed723b6c`](https://github.com/nodejs/node/commit/afed723b6c)] - **deps**: update simdutf to 5.6.1 (Node.js GitHub Bot) [#55850](https://github.com/nodejs/node/pull/55850)
- \[[`753c3b322f`](https://github.com/nodejs/node/commit/753c3b322f)] - **deps**: update c-ares to v1.34.3 (Node.js GitHub Bot) [#55803](https://github.com/nodejs/node/pull/55803)
- \[[`4f89af8a6f`](https://github.com/nodejs/node/commit/4f89af8a6f)] - **deps**: update acorn to 8.14.0 (Node.js GitHub Bot) [#55699](https://github.com/nodejs/node/pull/55699)
- \[[`07359ec14f`](https://github.com/nodejs/node/commit/07359ec14f)] - **deps**: update acorn to 8.13.0 (Node.js GitHub Bot) [#55558](https://github.com/nodejs/node/pull/55558)
- \[[`c6236571fc`](https://github.com/nodejs/node/commit/c6236571fc)] - **deps**: update googletest to df1544b (Node.js GitHub Bot) [#55465](https://github.com/nodejs/node/pull/55465)
- \[[`f63413c6f3`](https://github.com/nodejs/node/commit/f63413c6f3)] - **deps**: update c-ares to v1.34.2 (Node.js GitHub Bot) [#55463](https://github.com/nodejs/node/pull/55463)
- \[[`ad725c766d`](https://github.com/nodejs/node/commit/ad725c766d)] - **deps**: update ada to 2.9.1 (Node.js GitHub Bot) [#54679](https://github.com/nodejs/node/pull/54679)
- \[[`33367cbd62`](https://github.com/nodejs/node/commit/33367cbd62)] - **deps**: update simdutf to 5.6.0 (Node.js GitHub Bot) [#55379](https://github.com/nodejs/node/pull/55379)
- \[[`f2a55d9d2d`](https://github.com/nodejs/node/commit/f2a55d9d2d)] - **deps**: update c-ares to v1.34.1 (Node.js GitHub Bot) [#55369](https://github.com/nodejs/node/pull/55369)
- \[[`1d14886266`](https://github.com/nodejs/node/commit/1d14886266)] - **dgram**: check udp buffer size to avoid fd leak (theanarkh) [#56084](https://github.com/nodejs/node/pull/56084)
- \[[`de265b9558`](https://github.com/nodejs/node/commit/de265b9558)] - **diagnostics_channel**: fix unsubscribe during publish (simon-id) [#55116](https://github.com/nodejs/node/pull/55116)
- \[[`22e0d17097`](https://github.com/nodejs/node/commit/22e0d17097)] - **dns**: stop using deprecated `ares_query` (Aviv Keller) [#55430](https://github.com/nodejs/node/pull/55430)
- \[[`44f3b23749`](https://github.com/nodejs/node/commit/44f3b23749)] - **dns**: honor the order option (Luigi Pinca) [#55392](https://github.com/nodejs/node/pull/55392)
- \[[`f78508cd30`](https://github.com/nodejs/node/commit/f78508cd30)] - **doc**: add history info for Permission Model (Antoine du Hamel) [#56707](https://github.com/nodejs/node/pull/56707)
- \[[`f07be5e3cd`](https://github.com/nodejs/node/commit/f07be5e3cd)] - **doc**: add note for features using `InternalWorker` with permission model (Antoine du Hamel) [#56706](https://github.com/nodejs/node/pull/56706)
- \[[`618e005672`](https://github.com/nodejs/node/commit/618e005672)] - **doc**: add history entries for JSON modules stabilization (Antoine du Hamel) [#55855](https://github.com/nodejs/node/pull/55855)
- \[[`f89f4ff856`](https://github.com/nodejs/node/commit/f89f4ff856)] - **doc**: fix color contrast issue in light mode (Rich Trott) [#56272](https://github.com/nodejs/node/pull/56272)
- \[[`a51ef9d829`](https://github.com/nodejs/node/commit/a51ef9d829)] - **doc**: clarify util.aborted resource usage (Kunal Kumar) [#55780](https://github.com/nodejs/node/pull/55780)
- \[[`2d88c4b425`](https://github.com/nodejs/node/commit/2d88c4b425)] - **doc**: add esm examples to node:repl (Alfredo González) [#55432](https://github.com/nodejs/node/pull/55432)
- \[[`722dada673`](https://github.com/nodejs/node/commit/722dada673)] - **doc**: add esm examples to node:readline (Alfredo González) [#55335](https://github.com/nodejs/node/pull/55335)
- \[[`090c7a3b01`](https://github.com/nodejs/node/commit/090c7a3b01)] - **doc**: fix 'which' to 'that' and add commas (Selveter Senitro) [#56216](https://github.com/nodejs/node/pull/56216)
- \[[`ae3f6fbe59`](https://github.com/nodejs/node/commit/ae3f6fbe59)] - **doc**: `sea.getRawAsset(key)` always returns an ArrayBuffer (沈鸿飞) [#56206](https://github.com/nodejs/node/pull/56206)
- \[[`d103917d92`](https://github.com/nodejs/node/commit/d103917d92)] - **doc**: update announce documentation for releases (Rafael Gonzaga) [#56200](https://github.com/nodejs/node/pull/56200)
- \[[`80e5bb87c4`](https://github.com/nodejs/node/commit/80e5bb87c4)] - **doc**: update blog link to /vulnerability (Rafael Gonzaga) [#56198](https://github.com/nodejs/node/pull/56198)
- \[[`b739c2a926`](https://github.com/nodejs/node/commit/b739c2a926)] - **doc**: call out import.meta is only supported in ES modules (Anton Kastritskii) [#56186](https://github.com/nodejs/node/pull/56186)
- \[[`bbd0222a10`](https://github.com/nodejs/node/commit/bbd0222a10)] - **doc**: add ambassador message - benefits of Node.js (Michael Dawson) [#56085](https://github.com/nodejs/node/pull/56085)
- \[[`0e9abf2754`](https://github.com/nodejs/node/commit/0e9abf2754)] - **doc**: fix incorrect link to style guide (Yuan-Ming Hsu) [#56181](https://github.com/nodejs/node/pull/56181)
- \[[`1dbc7e87d7`](https://github.com/nodejs/node/commit/1dbc7e87d7)] - **doc**: fix c++ addon hello world sample (Edigleysson Silva (Edy)) [#56172](https://github.com/nodejs/node/pull/56172)
- \[[`026f0198c8`](https://github.com/nodejs/node/commit/026f0198c8)] - **doc**: update blog release-post link (Ruy Adorno) [#56123](https://github.com/nodejs/node/pull/56123)
- \[[`c2fa359f7a`](https://github.com/nodejs/node/commit/c2fa359f7a)] - **doc**: mention `-a` flag for the release script (Ruy Adorno) [#56124](https://github.com/nodejs/node/pull/56124)
- \[[`b9b006331f`](https://github.com/nodejs/node/commit/b9b006331f)] - **doc**: add LJHarb to collaborators (Jordan Harband) [#56132](https://github.com/nodejs/node/pull/56132)
- \[[`7a1365ba62`](https://github.com/nodejs/node/commit/7a1365ba62)] - **doc**: add create-release-action to process (Rafael Gonzaga) [#55993](https://github.com/nodejs/node/pull/55993)
- \[[`51262ec84e`](https://github.com/nodejs/node/commit/51262ec84e)] - **doc**: rename file to advocacy-ambassador-program.md (Tobias Nießen) [#56046](https://github.com/nodejs/node/pull/56046)
- \[[`6fc7328831`](https://github.com/nodejs/node/commit/6fc7328831)] - **doc**: remove unused import from sample code (Blended Bram) [#55570](https://github.com/nodejs/node/pull/55570)
- \[[`9f3ef4a434`](https://github.com/nodejs/node/commit/9f3ef4a434)] - **doc**: add FAQ to releases section (Rafael Gonzaga) [#55992](https://github.com/nodejs/node/pull/55992)
- \[[`1dcf8dfedb`](https://github.com/nodejs/node/commit/1dcf8dfedb)] - **doc**: move history entry to class description (Luigi Pinca) [#55991](https://github.com/nodejs/node/pull/55991)
- \[[`e016f68c73`](https://github.com/nodejs/node/commit/e016f68c73)] - **doc**: add history entry for textEncoder.encodeInto() (Luigi Pinca) [#55990](https://github.com/nodejs/node/pull/55990)
- \[[`1b31638262`](https://github.com/nodejs/node/commit/1b31638262)] - **doc**: improve GN build documentation a bit (Shelley Vohr) [#55968](https://github.com/nodejs/node/pull/55968)
- \[[`d25bcfd0b2`](https://github.com/nodejs/node/commit/d25bcfd0b2)] - **doc**: remove confusing and outdated sentence (Luigi Pinca) [#55988](https://github.com/nodejs/node/pull/55988)
- \[[`65c1784337`](https://github.com/nodejs/node/commit/65c1784337)] - **doc**: add doc for PerformanceObserver.takeRecords() (skyclouds2001) [#55786](https://github.com/nodejs/node/pull/55786)
- \[[`682ae41f86`](https://github.com/nodejs/node/commit/682ae41f86)] - **doc**: add vetted courses to the ambassador benefits (Matteo Collina) [#55934](https://github.com/nodejs/node/pull/55934)
- \[[`9b6cc54b50`](https://github.com/nodejs/node/commit/9b6cc54b50)] - **doc**: doc how to add message for promotion (Michael Dawson) [#55843](https://github.com/nodejs/node/pull/55843)
- \[[`db5378c8b9`](https://github.com/nodejs/node/commit/db5378c8b9)] - **doc**: add esm example for zlib (Leonardo Peixoto) [#55946](https://github.com/nodejs/node/pull/55946)
- \[[`58a6fbb9cf`](https://github.com/nodejs/node/commit/58a6fbb9cf)] - **doc**: document approach for building wasm in deps (Michael Dawson) [#55940](https://github.com/nodejs/node/pull/55940)
- \[[`41e3bcd752`](https://github.com/nodejs/node/commit/41e3bcd752)] - **doc**: add esm examples to node:timers (Alfredo González) [#55857](https://github.com/nodejs/node/pull/55857)
- \[[`61de8f9b04`](https://github.com/nodejs/node/commit/61de8f9b04)] - **doc**: include git node release --promote to steps (Rafael Gonzaga) [#55835](https://github.com/nodejs/node/pull/55835)
- \[[`559a0bfa2e`](https://github.com/nodejs/node/commit/559a0bfa2e)] - **doc**: add a note on console stream behavior (Gireesh Punathil) [#55616](https://github.com/nodejs/node/pull/55616)
- \[[`3d11a85fe5`](https://github.com/nodejs/node/commit/3d11a85fe5)] - **doc**: add `-S` flag release preparation example (Antoine du Hamel) [#55836](https://github.com/nodejs/node/pull/55836)
- \[[`955690e6cf`](https://github.com/nodejs/node/commit/955690e6cf)] - **doc**: clarify UV_THREADPOOL_SIZE env var usage (Preveen P) [#55832](https://github.com/nodejs/node/pull/55832)
- \[[`d6738e919a`](https://github.com/nodejs/node/commit/d6738e919a)] - **doc**: add notable-change mention to sec release (Rafael Gonzaga) [#55830](https://github.com/nodejs/node/pull/55830)
- \[[`79876f0dfd`](https://github.com/nodejs/node/commit/79876f0dfd)] - **doc**: fix history info for `URL.prototype.toJSON` (Antoine du Hamel) [#55818](https://github.com/nodejs/node/pull/55818)
- \[[`c14776fbaa`](https://github.com/nodejs/node/commit/c14776fbaa)] - **doc**: correct max-semi-space-size statement (Joe Bowbeer) [#55812](https://github.com/nodejs/node/pull/55812)
- \[[`83b415e8f3`](https://github.com/nodejs/node/commit/83b415e8f3)] - **doc**: run license-builder (github-actions\[bot]) [#55813](https://github.com/nodejs/node/pull/55813)
- \[[`07f53b1d75`](https://github.com/nodejs/node/commit/07f53b1d75)] - **doc**: clarify triager role (Gireesh Punathil) [#55775](https://github.com/nodejs/node/pull/55775)
- \[[`2abfdefcf3`](https://github.com/nodejs/node/commit/2abfdefcf3)] - **doc**: clarify removal of experimental API does not require a deprecation (Antoine du Hamel) [#55746](https://github.com/nodejs/node/pull/55746)
- \[[`39b89e90b4`](https://github.com/nodejs/node/commit/39b89e90b4)] - **doc**: enforce strict policy to semver-major releases (Rafael Gonzaga) [#55732](https://github.com/nodejs/node/pull/55732)
- \[[`d0417eaec9`](https://github.com/nodejs/node/commit/d0417eaec9)] - **doc**: add esm example in `path.md` (Aviv Keller) [#55745](https://github.com/nodejs/node/pull/55745)
- \[[`032ff07a2d`](https://github.com/nodejs/node/commit/032ff07a2d)] - **doc**: consistent use of word child process (Gireesh Punathil) [#55654](https://github.com/nodejs/node/pull/55654)
- \[[`16eef6461e`](https://github.com/nodejs/node/commit/16eef6461e)] - **doc**: clarity to available addon options (Preveen P) [#55715](https://github.com/nodejs/node/pull/55715)
- \[[`a7ce82e3cc`](https://github.com/nodejs/node/commit/a7ce82e3cc)] - **doc**: update `--max-semi-space-size` description (Joe Bowbeer) [#55495](https://github.com/nodejs/node/pull/55495)
- \[[`1bb461e2b6`](https://github.com/nodejs/node/commit/1bb461e2b6)] - **doc**: add write flag when open file as the demo code's intention (robberfree) [#54626](https://github.com/nodejs/node/pull/54626)
- \[[`8cd619f8d7`](https://github.com/nodejs/node/commit/8cd619f8d7)] - **doc**: remove mention of ECDH-ES in crypto.diffieHellman (Filip Skokan) [#55611](https://github.com/nodejs/node/pull/55611)
- \[[`4576d14d0f`](https://github.com/nodejs/node/commit/4576d14d0f)] - **doc**: improve c++ embedder API doc (Gireesh Punathil) [#55597](https://github.com/nodejs/node/pull/55597)
- \[[`12bd57fbaa`](https://github.com/nodejs/node/commit/12bd57fbaa)] - **doc**: capitalize "MIT License" (Aviv Keller) [#55575](https://github.com/nodejs/node/pull/55575)
- \[[`362b01b275`](https://github.com/nodejs/node/commit/362b01b275)] - **doc**: add esm examples to node:string_decoder (Alfredo González) [#55507](https://github.com/nodejs/node/pull/55507)
- \[[`29862ae105`](https://github.com/nodejs/node/commit/29862ae105)] - **doc**: add jazelly to collaborators (Jason Zhang) [#55531](https://github.com/nodejs/node/pull/55531)
- \[[`c1b63e5e6b`](https://github.com/nodejs/node/commit/c1b63e5e6b)] - **doc**: changed the command used to verify SHASUMS256 (adriancuadrado) [#55420](https://github.com/nodejs/node/pull/55420)
- \[[`9db657532b`](https://github.com/nodejs/node/commit/9db657532b)] - **doc**: add note about stdio streams in child_process (Ederin (Ed) Igharoro) [#55322](https://github.com/nodejs/node/pull/55322)
- \[[`475e478713`](https://github.com/nodejs/node/commit/475e478713)] - **doc**: add `isBigIntObject` to documentation (leviscar) [#55450](https://github.com/nodejs/node/pull/55450)
- \[[`0487e70475`](https://github.com/nodejs/node/commit/0487e70475)] - **doc**: remove outdated remarks about `highWaterMark` in fs (Ian Kerins) [#55462](https://github.com/nodejs/node/pull/55462)
- \[[`e9a8feb44a`](https://github.com/nodejs/node/commit/e9a8feb44a)] - **doc**: move Danielle Adams key to old gpg keys (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
- \[[`bfbe651626`](https://github.com/nodejs/node/commit/bfbe651626)] - **doc**: move Bryan English key to old gpg keys (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
- \[[`c1cab9b4d7`](https://github.com/nodejs/node/commit/c1cab9b4d7)] - **doc**: move Beth Griggs keys to old gpg keys (RafaelGSS) [#55399](https://github.com/nodejs/node/pull/55399)
- \[[`85d8eb397c`](https://github.com/nodejs/node/commit/85d8eb397c)] - **doc**: spell out condition restrictions (Jan Martin) [#55187](https://github.com/nodejs/node/pull/55187)
- \[[`de8de542b5`](https://github.com/nodejs/node/commit/de8de542b5)] - **doc**: add missing return values in buffer docs (Karl Horky) [#55273](https://github.com/nodejs/node/pull/55273)
- \[[`a5df7087fd`](https://github.com/nodejs/node/commit/a5df7087fd)] - **doc**: fix ambasador markdown list (Rafael Gonzaga) [#55361](https://github.com/nodejs/node/pull/55361)
- \[[`fbfcb0cc08`](https://github.com/nodejs/node/commit/fbfcb0cc08)] - **doc**: edit onboarding guide to clarify when mailmap addition is needed (Antoine du Hamel) [#55334](https://github.com/nodejs/node/pull/55334)
- \[[`e70abce96a`](https://github.com/nodejs/node/commit/e70abce96a)] - **doc**: fix the return type of outgoingMessage.setHeaders() (Jimmy Leung) [#55290](https://github.com/nodejs/node/pull/55290)
- \[[`030f155986`](https://github.com/nodejs/node/commit/030f155986)] - **esm**: mark import attributes and JSON module as stable (Nicolò Ribaudo) [#55333](https://github.com/nodejs/node/pull/55333)
- \[[`86cb697b81`](https://github.com/nodejs/node/commit/86cb697b81)] - **esm**: add a fallback when importer in not a file (Antoine du Hamel) [#55471](https://github.com/nodejs/node/pull/55471)
- \[[`8c8de30680`](https://github.com/nodejs/node/commit/8c8de30680)] - **esm**: fix inconsistency with `importAssertion` in `resolve` hook (Wei Zhu) [#55365](https://github.com/nodejs/node/pull/55365)
- \[[`a41b0e1247`](https://github.com/nodejs/node/commit/a41b0e1247)] - **events**: optimize EventTarget.addEventListener (Robert Nagy) [#55312](https://github.com/nodejs/node/pull/55312)
- \[[`2c6dcf7209`](https://github.com/nodejs/node/commit/2c6dcf7209)] - **fs**: make mutating `options` in Promises `readdir()` not affect results (LiviaMedeiros) [#56057](https://github.com/nodejs/node/pull/56057)
- \[[`9317feb829`](https://github.com/nodejs/node/commit/9317feb829)] - **fs**: lazily load ReadFileContext (Gürgün Dayıoğlu) [#55998](https://github.com/nodejs/node/pull/55998)
- \[[`739ee18430`](https://github.com/nodejs/node/commit/739ee18430)] - **http2**: support ALPNCallback option (ZYSzys) [#56187](https://github.com/nodejs/node/pull/56187)
- \[[`7ba6dcf180`](https://github.com/nodejs/node/commit/7ba6dcf180)] - **http2**: fix memory leak caused by premature listener removing (ywave620) [#55966](https://github.com/nodejs/node/pull/55966)
- \[[`4c15bd44a0`](https://github.com/nodejs/node/commit/4c15bd44a0)] - **http2**: fix client async storage persistence (Orgad Shaneh) [#55460](https://github.com/nodejs/node/pull/55460)
- \[[`ac57dadd9a`](https://github.com/nodejs/node/commit/ac57dadd9a)] - **lib**: add validation for options in compileFunction (Taejin Kim) [#56023](https://github.com/nodejs/node/pull/56023)
- \[[`a5b0d8900a`](https://github.com/nodejs/node/commit/a5b0d8900a)] - **lib**: remove startsWith/endsWith primordials for char checks (Gürgün Dayıoğlu) [#55407](https://github.com/nodejs/node/pull/55407)
- \[[`f10857828f`](https://github.com/nodejs/node/commit/f10857828f)] - **lib**: test_runner#mock:timers respeced timeout_max behaviour (BadKey) [#55375](https://github.com/nodejs/node/pull/55375)
- \[[`1a193bf256`](https://github.com/nodejs/node/commit/1a193bf256)] - **meta**: bump github/codeql-action from 3.27.0 to 3.27.5 (dependabot\[bot]) [#56103](https://github.com/nodejs/node/pull/56103)
- \[[`23f319803d`](https://github.com/nodejs/node/commit/23f319803d)] - **meta**: bump actions/checkout from 4.1.7 to 4.2.2 (dependabot\[bot]) [#56102](https://github.com/nodejs/node/pull/56102)
- \[[`a953301a1c`](https://github.com/nodejs/node/commit/a953301a1c)] - **meta**: bump step-security/harden-runner from 2.10.1 to 2.10.2 (dependabot\[bot]) [#56101](https://github.com/nodejs/node/pull/56101)
- \[[`c58065ae77`](https://github.com/nodejs/node/commit/c58065ae77)] - **meta**: bump actions/setup-node from 4.0.3 to 4.1.0 (dependabot\[bot]) [#56100](https://github.com/nodejs/node/pull/56100)
- \[[`12b0cecc20`](https://github.com/nodejs/node/commit/12b0cecc20)] - **meta**: add releasers as CODEOWNERS to proposal action (Rafael Gonzaga) [#56043](https://github.com/nodejs/node/pull/56043)
- \[[`070aa9d6a5`](https://github.com/nodejs/node/commit/070aa9d6a5)] - **meta**: bump actions/setup-python from 5.2.0 to 5.3.0 (dependabot\[bot]) [#55688](https://github.com/nodejs/node/pull/55688)
- \[[`7a46ffd18a`](https://github.com/nodejs/node/commit/7a46ffd18a)] - **meta**: bump actions/setup-node from 4.0.4 to 4.1.0 (dependabot\[bot]) [#55687](https://github.com/nodejs/node/pull/55687)
- \[[`8b4f2e0c6a`](https://github.com/nodejs/node/commit/8b4f2e0c6a)] - **meta**: bump rtCamp/action-slack-notify from 2.3.0 to 2.3.2 (dependabot\[bot]) [#55686](https://github.com/nodejs/node/pull/55686)
- \[[`024c5b2ab3`](https://github.com/nodejs/node/commit/024c5b2ab3)] - **meta**: bump actions/upload-artifact from 4.4.0 to 4.4.3 (dependabot\[bot]) [#55685](https://github.com/nodejs/node/pull/55685)
- \[[`3d06971a15`](https://github.com/nodejs/node/commit/3d06971a15)] - **meta**: bump actions/cache from 4.0.2 to 4.1.2 (dependabot\[bot]) [#55684](https://github.com/nodejs/node/pull/55684)
- \[[`c33de63a86`](https://github.com/nodejs/node/commit/c33de63a86)] - **meta**: bump actions/checkout from 4.2.0 to 4.2.2 (dependabot\[bot]) [#55683](https://github.com/nodejs/node/pull/55683)
- \[[`ccc1ea0576`](https://github.com/nodejs/node/commit/ccc1ea0576)] - **meta**: bump github/codeql-action from 3.26.10 to 3.27.0 (dependabot\[bot]) [#55682](https://github.com/nodejs/node/pull/55682)
- \[[`9c2d0fd242`](https://github.com/nodejs/node/commit/9c2d0fd242)] - **meta**: make review-wanted message minimal (Aviv Keller) [#55607](https://github.com/nodejs/node/pull/55607)
- \[[`0c14cae2b2`](https://github.com/nodejs/node/commit/0c14cae2b2)] - **meta**: show PR/issue title on review-wanted (Aviv Keller) [#55606](https://github.com/nodejs/node/pull/55606)
- \[[`aeae7e1e6f`](https://github.com/nodejs/node/commit/aeae7e1e6f)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#55381](https://github.com/nodejs/node/pull/55381)
- \[[`6d7b78c3d8`](https://github.com/nodejs/node/commit/6d7b78c3d8)] - **meta**: change color to blue notify review-wanted (Rafael Gonzaga) [#55423](https://github.com/nodejs/node/pull/55423)
- \[[`7441e289db`](https://github.com/nodejs/node/commit/7441e289db)] - **meta**: bump codecov/codecov-action from 4.5.0 to 4.6.0 (dependabot\[bot]) [#55222](https://github.com/nodejs/node/pull/55222)
- \[[`158c8ad77c`](https://github.com/nodejs/node/commit/158c8ad77c)] - **meta**: bump github/codeql-action from 3.26.6 to 3.26.10 (dependabot\[bot]) [#55221](https://github.com/nodejs/node/pull/55221)
- \[[`8d3d4a9fab`](https://github.com/nodejs/node/commit/8d3d4a9fab)] - **meta**: bump step-security/harden-runner from 2.9.1 to 2.10.1 (dependabot\[bot]) [#55220](https://github.com/nodejs/node/pull/55220)
- \[[`6797a35a5b`](https://github.com/nodejs/node/commit/6797a35a5b)] - **module**: prevent main thread exiting before esm worker ends (Shima Ryuhei) [#56183](https://github.com/nodejs/node/pull/56183)
- \[[`bd99bf109f`](https://github.com/nodejs/node/commit/bd99bf109f)] - **node-api**: allow napi_delete_reference in finalizers (Chengzhong Wu) [#55620](https://github.com/nodejs/node/pull/55620)
- \[[`6308c18dbb`](https://github.com/nodejs/node/commit/6308c18dbb)] - **report**: fix network queries in getReport libuv with exclude-network (Adrien Foulon) [#55602](https://github.com/nodejs/node/pull/55602)
- \[[`ff2eec7275`](https://github.com/nodejs/node/commit/ff2eec7275)] - **sea**: only assert snapshot main function for main threads (Joyee Cheung) [#56120](https://github.com/nodejs/node/pull/56120)
- \[[`f9f3003de7`](https://github.com/nodejs/node/commit/f9f3003de7)] - **src**: fix outdated js2c.cc references (Chengzhong Wu) [#56133](https://github.com/nodejs/node/pull/56133)
- \[[`a882536596`](https://github.com/nodejs/node/commit/a882536596)] - **src**: fix kill signal on Windows (Hüseyin Açacak) [#55514](https://github.com/nodejs/node/pull/55514)
- \[[`df1002438a`](https://github.com/nodejs/node/commit/df1002438a)] - **src**: improve `node:os` userInfo performance (Yagiz Nizipli) [#55719](https://github.com/nodejs/node/pull/55719)
- \[[`f17416ec3e`](https://github.com/nodejs/node/commit/f17416ec3e)] - **src**: fix dns crash when failed to create NodeAresTask (theanarkh) [#55521](https://github.com/nodejs/node/pull/55521)
- \[[`8d5b8c31d8`](https://github.com/nodejs/node/commit/8d5b8c31d8)] - **src**: use NewFromUtf8Literal in NODE_DEFINE_CONSTANT (Charles Kerr) [#55581](https://github.com/nodejs/node/pull/55581)
- \[[`0977bb6c1d`](https://github.com/nodejs/node/commit/0977bb6c1d)] - **src**: remove icu based `ToASCII` and `ToUnicode` (Yagiz Nizipli) [#55156](https://github.com/nodejs/node/pull/55156)
- \[[`72817072e2`](https://github.com/nodejs/node/commit/72817072e2)] - **src**: fix winapi_strerror error string (Hüseyin Açacak) [#55207](https://github.com/nodejs/node/pull/55207)
- \[[`6f47f53f90`](https://github.com/nodejs/node/commit/6f47f53f90)] - **src,lib**: optimize nodeTiming.uvMetricsInfo (RafaelGSS) [#55614](https://github.com/nodejs/node/pull/55614)
- \[[`ac583d4549`](https://github.com/nodejs/node/commit/ac583d4549)] - **stream**: propagate AbortSignal reason (Marvin ROGER) [#55473](https://github.com/nodejs/node/pull/55473)
- \[[`1c8b474319`](https://github.com/nodejs/node/commit/1c8b474319)] - **test**: skip test-buffer-tostring-range on smartos (Marco Ippolito) [#56727](https://github.com/nodejs/node/pull/56727)
- \[[`39d608f9d8`](https://github.com/nodejs/node/commit/39d608f9d8)] - **test**: mark test-http-server-request-timeouts-mixed as flaky (Joyee Cheung) [#56503](https://github.com/nodejs/node/pull/56503)
- \[[`5c3f18be04`](https://github.com/nodejs/node/commit/5c3f18be04)] - **test**: temporary remove resource check from fs read-write (Rafael Gonzaga) [#56789](https://github.com/nodejs/node/pull/56789)
- \[[`4196aaf033`](https://github.com/nodejs/node/commit/4196aaf033)] - **test**: remove exludes for sea tests on PPC (Michael Dawson) [#56217](https://github.com/nodejs/node/pull/56217)
- \[[`3ea738fc26`](https://github.com/nodejs/node/commit/3ea738fc26)] - **test**: remove `hasOpenSSL3x` utils (Antoine du Hamel) [#56164](https://github.com/nodejs/node/pull/56164)
- \[[`21e21a270e`](https://github.com/nodejs/node/commit/21e21a270e)] - **test**: remove test-fs-utimes flaky designation (Luigi Pinca) [#56052](https://github.com/nodejs/node/pull/56052)
- \[[`e464c6f7a5`](https://github.com/nodejs/node/commit/e464c6f7a5)] - **test**: move test-worker-arraybuffer-zerofill to parallel (Luigi Pinca) [#56053](https://github.com/nodejs/node/pull/56053)
- \[[`e99584cd57`](https://github.com/nodejs/node/commit/e99584cd57)] - **test**: make HTTP/1.0 connection test more robust (Arne Keller) [#55959](https://github.com/nodejs/node/pull/55959)
- \[[`2d03f87ef7`](https://github.com/nodejs/node/commit/2d03f87ef7)] - **test**: convert readdir test to use test runner (Thomas Chetwin) [#55750](https://github.com/nodejs/node/pull/55750)
- \[[`207562fa3d`](https://github.com/nodejs/node/commit/207562fa3d)] - **test**: make x509 crypto tests work with BoringSSL (Shelley Vohr) [#55927](https://github.com/nodejs/node/pull/55927)
- \[[`a17d9e1acf`](https://github.com/nodejs/node/commit/a17d9e1acf)] - **test**: fix determining lower priority (Livia Medeiros) [#55908](https://github.com/nodejs/node/pull/55908)
- \[[`50b6729d8c`](https://github.com/nodejs/node/commit/50b6729d8c)] - **test**: increase coverage of `pathToFileURL` (Antoine du Hamel) [#55493](https://github.com/nodejs/node/pull/55493)
- \[[`0aa9e74027`](https://github.com/nodejs/node/commit/0aa9e74027)] - **test**: improve test coverage for child process message sending (Juan José) [#55710](https://github.com/nodejs/node/pull/55710)
- \[[`ebdbbc3ec8`](https://github.com/nodejs/node/commit/ebdbbc3ec8)] - **test**: ensure that test priority is not higher than current priority (Livia Medeiros) [#55739](https://github.com/nodejs/node/pull/55739)
- \[[`b40789e085`](https://github.com/nodejs/node/commit/b40789e085)] - **test**: add buffer to fs_permission tests (Rafael Gonzaga) [#55734](https://github.com/nodejs/node/pull/55734)
- \[[`a9998799be`](https://github.com/nodejs/node/commit/a9998799be)] - **test**: improve test coverage for `ServerResponse` (Juan José) [#55711](https://github.com/nodejs/node/pull/55711)
- \[[`d2421f3c92`](https://github.com/nodejs/node/commit/d2421f3c92)] - **test**: ignore unrelated events in FW watch tests (Carlos Espa) [#55605](https://github.com/nodejs/node/pull/55605)
- \[[`0ac0afc4a9`](https://github.com/nodejs/node/commit/0ac0afc4a9)] - **test**: refactor some esm tests (Antoine du Hamel) [#55472](https://github.com/nodejs/node/pull/55472)
- \[[`0f8b8269d1`](https://github.com/nodejs/node/commit/0f8b8269d1)] - **test**: split up test-runner-mock-timers test (Julian Gassner) [#55506](https://github.com/nodejs/node/pull/55506)
- \[[`8f6462f40b`](https://github.com/nodejs/node/commit/8f6462f40b)] - **test**: avoid `apply()` calls with large amount of elements (Livia Medeiros) [#55501](https://github.com/nodejs/node/pull/55501)
- \[[`e9b0ff482b`](https://github.com/nodejs/node/commit/e9b0ff482b)] - **test**: increase test coverage for `http.OutgoingMessage.appendHeader()` (Juan José) [#55467](https://github.com/nodejs/node/pull/55467)
- \[[`d5ad060073`](https://github.com/nodejs/node/commit/d5ad060073)] - **test**: fix addons and node-api test assumptions (Antoine du Hamel) [#55441](https://github.com/nodejs/node/pull/55441)
- \[[`a28376bb85`](https://github.com/nodejs/node/commit/a28376bb85)] - **test**: deflake `test-cluster-shared-handle-bind-privileged-port` (Aviv Keller) [#55378](https://github.com/nodejs/node/pull/55378)
- \[[`22c07867d1`](https://github.com/nodejs/node/commit/22c07867d1)] - **test**: remove duplicate tests (Luigi Pinca) [#55393](https://github.com/nodejs/node/pull/55393)
- \[[`5489656b35`](https://github.com/nodejs/node/commit/5489656b35)] - **test**: update test_util.cc for coverage (minkyu_kim) [#55291](https://github.com/nodejs/node/pull/55291)
- \[[`ceafb3250d`](https://github.com/nodejs/node/commit/ceafb3250d)] - **test,crypto**: make crypto tests work with BoringSSL (Shelley Vohr) [#55491](https://github.com/nodejs/node/pull/55491)
- \[[`7021b3b276`](https://github.com/nodejs/node/commit/7021b3b276)] - **test_runner**: simplify hook running logic (Colin Ihrig) [#55963](https://github.com/nodejs/node/pull/55963)
- \[[`d9fd632f56`](https://github.com/nodejs/node/commit/d9fd632f56)] - **test_runner**: error on mocking an already mocked date (Aviv Keller) [#55858](https://github.com/nodejs/node/pull/55858)
- \[[`3fcca16374`](https://github.com/nodejs/node/commit/3fcca16374)] - **test_runner**: add support for scheduler.wait on mock timers (Erick Wendel) [#55244](https://github.com/nodejs/node/pull/55244)
- \[[`f67147ec47`](https://github.com/nodejs/node/commit/f67147ec47)] - **tools**: update github_reporter to 1.7.2 (Node.js GitHub Bot) [#56205](https://github.com/nodejs/node/pull/56205)
- \[[`5c819f1043`](https://github.com/nodejs/node/commit/5c819f1043)] - **tools**: add REPLACEME check to workflow (Mert Can Altin) [#56251](https://github.com/nodejs/node/pull/56251)
- \[[`b24a85b00b`](https://github.com/nodejs/node/commit/b24a85b00b)] - **tools**: use `github.actor` instead of bot username for release proposals (Antoine du Hamel) [#56232](https://github.com/nodejs/node/pull/56232)
- \[[`33cd7d3d8c`](https://github.com/nodejs/node/commit/33cd7d3d8c)] - **tools**: fix release proposal linter to support more than 1 folk preparing (Antoine du Hamel) [#56203](https://github.com/nodejs/node/pull/56203)
- \[[`10d55e3d73`](https://github.com/nodejs/node/commit/10d55e3d73)] - **tools**: use commit title as PR title when creating release proposal (Antoine du Hamel) [#56165](https://github.com/nodejs/node/pull/56165)
- \[[`b3d40e3be5`](https://github.com/nodejs/node/commit/b3d40e3be5)] - **tools**: improve release proposal PR opening (Antoine du Hamel) [#56161](https://github.com/nodejs/node/pull/56161)
- \[[`13455ca9ce`](https://github.com/nodejs/node/commit/13455ca9ce)] - **tools**: update `create-release-proposal` workflow (Antoine du Hamel) [#56054](https://github.com/nodejs/node/pull/56054)
- \[[`851a3d7d8d`](https://github.com/nodejs/node/commit/851a3d7d8d)] - **tools**: fix update-undici script (Michaël Zasso) [#56069](https://github.com/nodejs/node/pull/56069)
- \[[`e1635fbd4e`](https://github.com/nodejs/node/commit/e1635fbd4e)] - **tools**: allow dispatch of `tools.yml` from forks (Antoine du Hamel) [#56008](https://github.com/nodejs/node/pull/56008)
- \[[`5f15d8b3f5`](https://github.com/nodejs/node/commit/5f15d8b3f5)] - **tools**: fix nghttp3 updater script (Antoine du Hamel) [#56007](https://github.com/nodejs/node/pull/56007)
- \[[`bbf39b8c46`](https://github.com/nodejs/node/commit/bbf39b8c46)] - **tools**: filter release keys to reduce interactivity (Antoine du Hamel) [#55950](https://github.com/nodejs/node/pull/55950)
- \[[`954e60b87d`](https://github.com/nodejs/node/commit/954e60b87d)] - **tools**: update WPT updater (Antoine du Hamel) [#56003](https://github.com/nodejs/node/pull/56003)
- \[[`1e09d258da`](https://github.com/nodejs/node/commit/1e09d258da)] - **tools**: add WPT updater for specific subsystems (Mert Can Altin) [#54460](https://github.com/nodejs/node/pull/54460)
- \[[`b95c4f5bf0`](https://github.com/nodejs/node/commit/b95c4f5bf0)] - **tools**: use tokenless Codecov uploads (Michaël Zasso) [#55943](https://github.com/nodejs/node/pull/55943)
- \[[`6327554706`](https://github.com/nodejs/node/commit/6327554706)] - **tools**: add linter for release commit proposals (Antoine du Hamel) [#55923](https://github.com/nodejs/node/pull/55923)
- \[[`aad478e58d`](https://github.com/nodejs/node/commit/aad478e58d)] - **tools**: fix exclude labels for commit-queue (Richard Lau) [#55809](https://github.com/nodejs/node/pull/55809)
- \[[`1c8c881aef`](https://github.com/nodejs/node/commit/1c8c881aef)] - **tools**: make commit-queue check blocked label (Marco Ippolito) [#55781](https://github.com/nodejs/node/pull/55781)
- \[[`c3913f9c87`](https://github.com/nodejs/node/commit/c3913f9c87)] - **tools**: fix c-ares updater script for Node.js 18 (Richard Lau) [#55717](https://github.com/nodejs/node/pull/55717)
- \[[`adfc2f993a`](https://github.com/nodejs/node/commit/adfc2f993a)] - **tools**: fix root certificate updater (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
- \[[`d336f8de15`](https://github.com/nodejs/node/commit/d336f8de15)] - **tools**: compact jq output in daily-wpt-fyi.yml action (Filip Skokan) [#55695](https://github.com/nodejs/node/pull/55695)
- \[[`cdb7839a0c`](https://github.com/nodejs/node/commit/cdb7839a0c)] - **tools**: run daily WPT.fyi report on all supported releases (Filip Skokan) [#55619](https://github.com/nodejs/node/pull/55619)
- \[[`274d0b4062`](https://github.com/nodejs/node/commit/274d0b4062)] - **tools**: update lint-md-dependencies (Node.js GitHub Bot) [#55470](https://github.com/nodejs/node/pull/55470)
- \[[`3dceeb8b15`](https://github.com/nodejs/node/commit/3dceeb8b15)] - **tools**: add script to synch c-ares source lists (Richard Lau) [#55445](https://github.com/nodejs/node/pull/55445)
- \[[`bd0ec907da`](https://github.com/nodejs/node/commit/bd0ec907da)] - **url**: handle "unsafe" characters properly in `pathToFileURL` (Antoine du Hamel) [#54545](https://github.com/nodejs/node/pull/54545)
- \[[`83137bceb6`](https://github.com/nodejs/node/commit/83137bceb6)] - **util**: fix Latin1 decoding to return string output (Mert Can Altin) [#56222](https://github.com/nodejs/node/pull/56222)
- \[[`195cc42935`](https://github.com/nodejs/node/commit/195cc42935)] - **util**: do not rely on mutable `Object` and `Function`' `constructor` prop (Antoine du Hamel) [#56188](https://github.com/nodejs/node/pull/56188)
- \[[`cca7c518de`](https://github.com/nodejs/node/commit/cca7c518de)] - **util**: add fast path for Latin1 decoding (Mert Can Altin) [#55275](https://github.com/nodejs/node/pull/55275)
- \[[`7ed346d8fd`](https://github.com/nodejs/node/commit/7ed346d8fd)] - **util**: do not catch on circular `@@toStringTag` errors (Aviv Keller) [#55544](https://github.com/nodejs/node/pull/55544)
- \[[`aa031b3eec`](https://github.com/nodejs/node/commit/aa031b3eec)] - **worker**: fix crash when a worker joins after exit (Stephen Belanger) [#56191](https://github.com/nodejs/node/pull/56191)

Windows 32-bit Installer: https://nodejs.org/dist/v20.18.3/node-v20.18.3-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.18.3/node-v20.18.3-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.18.3/node-v20.18.3-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.18.3/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.18.3/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.18.3/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.18.3/node-v20.18.3.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.18.3/node-v20.18.3-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.18.3/node-v20.18.3.tar.gz \
Other release files: https://nodejs.org/dist/v20.18.3/ \
Documentation: https://nodejs.org/docs/v20.18.3/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

c0f0c72b80a67ef32402fda206b10a101b1c309158d850dbbedc9e751738d300  node-v20.18.3-aix-ppc64.tar.gz
3d4737a6bdf55ae372148f31d011fc93ba1fdc432c853168c03cbbe0cd1d6b48  node-v20.18.3-arm64.msi
1f15b7ed18a580af31cf32bc126572292d820f547bf55bf9cdce08041a24e1d9  node-v20.18.3-darwin-arm64.tar.gz
78d8a583a983b4818f30b4e96b7458c1a4cf33397e34b08acdae3e5727026030  node-v20.18.3-darwin-arm64.tar.xz
ba668f64df9239843fefcef095ee539f5ac5aa1b0fc15a71f1ecca16abedec7a  node-v20.18.3-darwin-x64.tar.gz
bef0e73e30a14cbaed6c83c1eb65f42c5a212d8a8aab24ea5ceadc1faf003f9e  node-v20.18.3-darwin-x64.tar.xz
d660b43357541d13cb7756046c7b1c7e4a6630f2d086873740012953e33c1872  node-v20.18.3-headers.tar.gz
070c0faecf160e649eada2153f5028fb363b115c6df2d86efa384d74eef0967b  node-v20.18.3-headers.tar.xz
93a9df19238adfaa289f4784041d03edaf2fdd89fbb247faffca2fe4a1000703  node-v20.18.3-linux-arm64.tar.gz
c03412ab9c0ed30468e4d03e56d2e35c5ae761a98deb16727c7af2fe5be34700  node-v20.18.3-linux-arm64.tar.xz
8a84eb34287db6a273066934d7195e429f57b91686b62fc19497210204a2b3de  node-v20.18.3-linux-armv7l.tar.gz
c630c27fc5bc6ffcdf82deb7806688cc42c1208724588a1a6392702d75cbf85d  node-v20.18.3-linux-armv7l.tar.xz
787612cd7a2461b5340fee1406d8f958e9bb9349030189a03d37fc92529d2f74  node-v20.18.3-linux-ppc64le.tar.gz
73bcc4e55049a601cb9d6542cb58cb529af5a13b1548c8fa8a0806fcc94561b3  node-v20.18.3-linux-ppc64le.tar.xz
72156704416f4c32f8eb72e9ee59a0fcacbd972f28b2e05b9c888c7098acd2d2  node-v20.18.3-linux-s390x.tar.gz
cd83c11dbe1e3dfde022b8f2814dce0ad51f7d0855682bfa52692234a0f4b962  node-v20.18.3-linux-s390x.tar.xz
9fc3952da39b20d1fcfdb777b198cc035485afbbb1004b4df93f35245d61151e  node-v20.18.3-linux-x64.tar.gz
595bcc9a28e6d1ee5fc7277b5c3cb029275b98ec0524e162a0c566c992a7ee5c  node-v20.18.3-linux-x64.tar.xz
39861dd7de5336e0dd21bbb9ad143443165af24fcdef4a2b3657ca146eb671b6  node-v20.18.3.pkg
eba088fa562735140b283c7bb33f53e026ccd5febe68c52c5737ef6e577ec874  node-v20.18.3.tar.gz
0674f16f3bc284c11724cd3f7c2a43f7c2c13d2eb7a872dd0db198f3d588c5f2  node-v20.18.3.tar.xz
8c754eee1691257517cfb166dc3bcb04dc4a705f2dab8dc8c345bd63c912b2b3  node-v20.18.3-win-arm64.7z
69598ba58c0e40bb46dc423e4db939adbad4a74ffbb8e377a01ffdaa187ebbf0  node-v20.18.3-win-arm64.zip
62c4e4e0320189c02d3cb2df0c1694699e832fae0168eb6d1bae34bc515b3c50  node-v20.18.3-win-x64.7z
11d483dfba711bc7c9bcb513e80a2941be0c2e7cbf62753755785b9a6e80a731  node-v20.18.3-win-x64.zip
7dfba76517de8394080931992e8ff1716f5a31d2f4a4848b00656c8502b6dd39  node-v20.18.3-win-x86.7z
00d125e6a4cbd4dec2068d76bd27e3fc680bcc145559ef1bcb77b3f48d3d458e  node-v20.18.3-win-x86.zip
18bf5b334f70ecd310c5413397da4d241521c700e032abb12aced8aba253425b  node-v20.18.3-x64.msi
8c193b46140921a6d58e22e4992d7f725e0ba09781df6a1f07bd4be85b725fd7  node-v20.18.3-x86.msi
4258e333f4b95060681d61bffa762542a8068547d3dffebe57c575b38d380dda  win-arm64/node.exe
58795bcd44e8023ff443dedabf7f9af928732a51befc5324082aafe56e0f5eb0  win-arm64/node.lib
33a21b130357c6dedbf20c22aae95f4431e2ca9e964ee73ad03acb5a0631df05  win-arm64/node_pdb.7z
d3c6956d3be10706bde1387db6a0f4329bbd57d8146ade299664f65f0d5e8956  win-arm64/node_pdb.zip
528a9aa64888a2a3ba71c6aea89434dd5ab5cb3caa9f0f31345cf5facf685ab0  win-x64/node.exe
5a16801c62c34c8056744ac339950c970b2b76f39b2d02afef4112ff51b74f1a  win-x64/node.lib
34b762a9801769556a280f0f744b64aab8435e7e91588a346d6f826afdf1e882  win-x64/node_pdb.7z
d154fc9fc47bb1a6361ddfa81b063061432a3d92eff7b1ef8cf5cbc0e5f910db  win-x64/node_pdb.zip
feb38faae00f7c6b194077cf003349227fd3213649446ed60655ce939f7ef50f  win-x86/node.exe
fcc6ab34ebd4ad3a44de12376c3822c2ebc41febaa1ed4c4221ddc239f79f61c  win-x86/node.lib
8f38a0a2bd21dfb55defafed2ff35b4fea46cc06ca77e62dd263fa54e45230b9  win-x86/node_pdb.7z
b2f2825180d95fdb27fce904a7687fcb4309b2eac5dd8d39f2191b0e393b1f83  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEzGj1oxBv9EgyLkjtJ/XjjVsKIV8FAmeqBNMACgkQJ/XjjVsK
IV/klw/9EAp5hDWbsC+64CyEl1WARMR2fwDNzm0PNK8FGmTFHLkXsPSdz+svcHaf
DLmE/QCVMnD1GWWlWo6QjGLruHZDUgsNoMSBXkIMioSss3KASfUJ1u+L3kdmfCM3
QcQO4zYhRoRam8e2/TBh02PjDi/tfJok5wbLEeBZE8GRUHkpxr3W70v2ekOcXdzL
cACgDJSAukLW1qowo57KNaEOy1nPEpZB2WNB3MbMuk+T2m37Unz4tUqJrkyDrwq5
BwDdEtDoaYp4gZoBd1Jr96M2DsD8buWKeonRAAfzdVexJV2xBrWro+ntYXp1F2tW
ba39vjVqCYz0iLxWC398PBkgV/q5r74PqGUx3F27dzbkI8sPh42ad5dv4sdybu6z
VlFmIVbZu0O3D5sm6bYgtgVRvhrzAFMm1+4MEIf1Pghe8N+V0FeKLRbyjAApHz1+
OinXZjoyIlswwAYPtTuygXkOAj7ZCgrIPwLDthWe10mE+zqNtiLQLy82G6N9B6yX
3y7WLFjbTkX5wQuCbTDHNhNmTs+h49wkD3h1XBqUaIUwJ05P0aCBzhJsN8F9MA2U
f49m1D1vIxEsu7+wYWdFp/hH+usd6H2U4fkqQNgn0MiP0G5r0GtABrBSkLuYcCy0
yRuFd7G7mtD4qUr4nslvjub++HjGcmfN+MHYgFcHa+NMim7NspM=
=D03e
-----END PGP SIGNATURE-----
```
