---
date: '2025-11-11T22:34:19.839Z'
category: release
title: Node.js v25.2.0 (Current)
layout: blog-post
author: Antoine du Hamel
---

## 2025-11-11, Version 25.2.0 (Current), @aduh95

### Notable Changes

- \[[`a37c01e6a1`](https://github.com/nodejs/node/commit/a37c01e6a1)] - **(SEMVER-MINOR)** **lib**: add options to util.deprecate (Rafael Gonzaga) [#59982](https://github.com/nodejs/node/pull/59982)
- \[[`4fbb1ab101`](https://github.com/nodejs/node/commit/4fbb1ab101)] - **lib**: throw from localStorage getter on missing storage path (René) [#60351](https://github.com/nodejs/node/pull/60351)
- \[[`727560a96d`](https://github.com/nodejs/node/commit/727560a96d)] - **(SEMVER-MINOR)** **module**: mark type stripping as stable (Marco Ippolito) [#60600](https://github.com/nodejs/node/pull/60600)
- \[[`506b79e888`](https://github.com/nodejs/node/commit/506b79e888)] - **(SEMVER-MINOR)** **net**: increase network family autoselection timeout to 500ms (Rod Vagg) [#60334](https://github.com/nodejs/node/pull/60334)
- \[[`166c72ec02`](https://github.com/nodejs/node/commit/166c72ec02)] - **(SEMVER-MINOR)** **node-api**: add napi_create_object_with_properties (Miguel Marcondes Filho) [#59953](https://github.com/nodejs/node/pull/59953)
- \[[`399b340022`](https://github.com/nodejs/node/commit/399b340022)] - **(SEMVER-MINOR)** **v8**: adding total_allocated_bytes to HeapStatistics (Caio Lima) [#60573](https://github.com/nodejs/node/pull/60573)

### Commits

- \[[`d5158a0a2d`](https://github.com/nodejs/node/commit/d5158a0a2d)] - **benchmark**: focus on import.meta intialization in import-meta benchmark (Joyee Cheung) [#60603](https://github.com/nodejs/node/pull/60603)
- \[[`26a5305fa9`](https://github.com/nodejs/node/commit/26a5305fa9)] - **benchmark**: add per-suite setup option (Joyee Cheung) [#60574](https://github.com/nodejs/node/pull/60574)
- \[[`4810e4b82d`](https://github.com/nodejs/node/commit/4810e4b82d)] - **buffer**: speed up concat via TypedArray#set (Gürgün Dayıoğlu) [#60399](https://github.com/nodejs/node/pull/60399)
- \[[`94a94a6b3a`](https://github.com/nodejs/node/commit/94a94a6b3a)] - **console**: optimize single-string logging (Gürgün Dayıoğlu) [#60422](https://github.com/nodejs/node/pull/60422)
- \[[`ad376c31db`](https://github.com/nodejs/node/commit/ad376c31db)] - **crypto**: fix argument validation in crypto.timingSafeEqual fast path (Joyee Cheung) [#60538](https://github.com/nodejs/node/pull/60538)
- \[[`dc38a45a55`](https://github.com/nodejs/node/commit/dc38a45a55)] - **debugger**: fix event listener leak in the run command (Joyee Cheung) [#60464](https://github.com/nodejs/node/pull/60464)
- \[[`a61e5d8e05`](https://github.com/nodejs/node/commit/a61e5d8e05)] - **deps**: call OPENSSL_free after ANS1_STRING_to_UTF8 (Rafael Gonzaga) [#60609](https://github.com/nodejs/node/pull/60609)
- \[[`51e5030afa`](https://github.com/nodejs/node/commit/51e5030afa)] - **deps**: nghttp2: revert 7784fa979d0b (Antoine du Hamel) [#59790](https://github.com/nodejs/node/pull/59790)
- \[[`eef838f499`](https://github.com/nodejs/node/commit/eef838f499)] - **deps**: update nghttp2 to 1.67.1 (nodejs-github-bot) [#59790](https://github.com/nodejs/node/pull/59790)
- \[[`13120a43d4`](https://github.com/nodejs/node/commit/13120a43d4)] - **deps**: update simdjson to 4.1.0 (Node.js GitHub Bot) [#60542](https://github.com/nodejs/node/pull/60542)
- \[[`6e1b23dab8`](https://github.com/nodejs/node/commit/6e1b23dab8)] - **deps**: update corepack to 0.34.2 (Node.js GitHub Bot) [#60550](https://github.com/nodejs/node/pull/60550)
- \[[`a02e05c486`](https://github.com/nodejs/node/commit/a02e05c486)] - **deps**: update amaro to 1.1.5 (Node.js GitHub Bot) [#60541](https://github.com/nodejs/node/pull/60541)
- \[[`b9ba3a7947`](https://github.com/nodejs/node/commit/b9ba3a7947)] - **deps**: V8: backport fe81545e6d14 (Caio Lima) [#60429](https://github.com/nodejs/node/pull/60429)
- \[[`07bcd28494`](https://github.com/nodejs/node/commit/07bcd28494)] - **deps**: V8: cherry-pick 7ef6a001762 (Xiao-Tao) [#60259](https://github.com/nodejs/node/pull/60259)
- \[[`3e11658243`](https://github.com/nodejs/node/commit/3e11658243)] - **doc**: update Collaborators list to reflect hybrist handle change (Antoine du Hamel) [#60650](https://github.com/nodejs/node/pull/60650)
- \[[`b8e40e4d38`](https://github.com/nodejs/node/commit/b8e40e4d38)] - **doc**: fix link in `--env-file=file` section (N. Bighetti) [#60563](https://github.com/nodejs/node/pull/60563)
- \[[`9558c1c0df`](https://github.com/nodejs/node/commit/9558c1c0df)] - **doc**: fix linter issues (Antoine du Hamel) [#60636](https://github.com/nodejs/node/pull/60636)
- \[[`cdf70de563`](https://github.com/nodejs/node/commit/cdf70de563)] - **doc**: add missing history entry for `sqlite.md` (Antoine du Hamel) [#60607](https://github.com/nodejs/node/pull/60607)
- \[[`e3c5dcf1ea`](https://github.com/nodejs/node/commit/e3c5dcf1ea)] - **doc**: correct values/references for buffer.kMaxLength (René) [#60305](https://github.com/nodejs/node/pull/60305)
- \[[`a25d76c924`](https://github.com/nodejs/node/commit/a25d76c924)] - **doc**: recommend events.once to manage 'close' event (Dan Fabulich) [#60017](https://github.com/nodejs/node/pull/60017)
- \[[`795f32bf91`](https://github.com/nodejs/node/commit/795f32bf91)] - **doc**: highlight module loading difference between import and require (Ajay A) [#59815](https://github.com/nodejs/node/pull/59815)
- \[[`212775410b`](https://github.com/nodejs/node/commit/212775410b)] - **doc**: add CJS code snippets in `sqlite.md` (Allon Murienik) [#60395](https://github.com/nodejs/node/pull/60395)
- \[[`263c06096d`](https://github.com/nodejs/node/commit/263c06096d)] - **doc**: fix typo in `process.unref` documentation (우혁) [#59698](https://github.com/nodejs/node/pull/59698)
- \[[`356bdae408`](https://github.com/nodejs/node/commit/356bdae408)] - **doc**: add some entries to `glossary.md` (Mohataseem Khan) [#59277](https://github.com/nodejs/node/pull/59277)
- \[[`9632c398de`](https://github.com/nodejs/node/commit/9632c398de)] - **doc**: improve agent.createConnection docs for http and https agents (JaeHo Jang) [#58205](https://github.com/nodejs/node/pull/58205)
- \[[`f72880dbe3`](https://github.com/nodejs/node/commit/f72880dbe3)] - **doc**: fix pseudo code in modules.md (chirsz) [#57677](https://github.com/nodejs/node/pull/57677)
- \[[`a9c70cefe8`](https://github.com/nodejs/node/commit/a9c70cefe8)] - **doc**: add missing variable in code snippet (Koushil Mankali) [#55478](https://github.com/nodejs/node/pull/55478)
- \[[`2892d151d4`](https://github.com/nodejs/node/commit/2892d151d4)] - **doc**: add missing word in `single-executable-applications.md` (Konstantin Tsabolov) [#53864](https://github.com/nodejs/node/pull/53864)
- \[[`9c99ab6571`](https://github.com/nodejs/node/commit/9c99ab6571)] - **doc**: fix typo in http.md (Michael Solomon) [#59354](https://github.com/nodejs/node/pull/59354)
- \[[`3446cf375f`](https://github.com/nodejs/node/commit/3446cf375f)] - **doc**: update devcontainer.json and add documentation (Joyee Cheung) [#60472](https://github.com/nodejs/node/pull/60472)
- \[[`519c537875`](https://github.com/nodejs/node/commit/519c537875)] - **doc**: add haramj as triager (Haram Jeong) [#60348](https://github.com/nodejs/node/pull/60348)
- \[[`62889d7e99`](https://github.com/nodejs/node/commit/62889d7e99)] - **doc**: clarify require(esm) description (dynst) [#60520](https://github.com/nodejs/node/pull/60520)
- \[[`0b9ef68705`](https://github.com/nodejs/node/commit/0b9ef68705)] - **doc**: instantiate resolver object (Donghoon Nam) [#60476](https://github.com/nodejs/node/pull/60476)
- \[[`cd5c1ad29f`](https://github.com/nodejs/node/commit/cd5c1ad29f)] - **doc**: correct module loading descriptions (Joyee Cheung) [#60346](https://github.com/nodejs/node/pull/60346)
- \[[`74719dad7a`](https://github.com/nodejs/node/commit/74719dad7a)] - **doc**: clarify Linux runtime requirements for >=25 (Joyee Cheung) [#60484](https://github.com/nodejs/node/pull/60484)
- \[[`ca39540785`](https://github.com/nodejs/node/commit/ca39540785)] - **doc**: clarify --use-system-ca support status (Joyee Cheung) [#60340](https://github.com/nodejs/node/pull/60340)
- \[[`dbf204c714`](https://github.com/nodejs/node/commit/dbf204c714)] - **doc,crypto**: link keygen to supported types (Filip Skokan) [#60585](https://github.com/nodejs/node/pull/60585)
- \[[`3bcf86d56d`](https://github.com/nodejs/node/commit/3bcf86d56d)] - **esm**: use sync loading/resolving on non-loader-hook thread (Joyee Cheung) [#60380](https://github.com/nodejs/node/pull/60380)
- \[[`69b3d2c845`](https://github.com/nodejs/node/commit/69b3d2c845)] - **http**: replace startsWith with strict equality (btea) [#59394](https://github.com/nodejs/node/pull/59394)
- \[[`a38e2f5975`](https://github.com/nodejs/node/commit/a38e2f5975)] - **http2**: add diagnostics channels for client stream request body (Darshan Sen) [#60480](https://github.com/nodejs/node/pull/60480)
- \[[`c047e73a00`](https://github.com/nodejs/node/commit/c047e73a00)] - **inspector**: inspect HTTP response body (Chengzhong Wu) [#60572](https://github.com/nodejs/node/pull/60572)
- \[[`d2087bae92`](https://github.com/nodejs/node/commit/d2087bae92)] - **inspector**: support inspecting HTTP/2 request and response bodies (Darshan Sen) [#60483](https://github.com/nodejs/node/pull/60483)
- \[[`003121c475`](https://github.com/nodejs/node/commit/003121c475)] - **inspector**: fix crash when receiving non json message (Shima Ryuhei) [#60388](https://github.com/nodejs/node/pull/60388)
- \[[`a37c01e6a1`](https://github.com/nodejs/node/commit/a37c01e6a1)] - **(SEMVER-MINOR)** **lib**: add options to util.deprecate (Rafael Gonzaga) [#59982](https://github.com/nodejs/node/pull/59982)
- \[[`219d2e978d`](https://github.com/nodejs/node/commit/219d2e978d)] - **lib**: replace global SharedArrayBuffer constructor with bound method (Renegade334) [#60497](https://github.com/nodejs/node/pull/60497)
- \[[`4fbb1ab101`](https://github.com/nodejs/node/commit/4fbb1ab101)] - **lib**: throw from localStorage getter on missing storage path (René) [#60351](https://github.com/nodejs/node/pull/60351)
- \[[`ca8934f44d`](https://github.com/nodejs/node/commit/ca8934f44d)] - **meta**: bump cachix/install-nix-action from 31.6.1 to 31.8.2 (dependabot\[bot]) [#60534](https://github.com/nodejs/node/pull/60534)
- \[[`166490230a`](https://github.com/nodejs/node/commit/166490230a)] - **meta**: bump github/codeql-action from 3.30.5 to 4.31.2 (dependabot\[bot]) [#60533](https://github.com/nodejs/node/pull/60533)
- \[[`b722236a12`](https://github.com/nodejs/node/commit/b722236a12)] - **meta**: bump actions/download-artifact from 5.0.0 to 6.0.0 (dependabot\[bot]) [#60532](https://github.com/nodejs/node/pull/60532)
- \[[`3314b0bc60`](https://github.com/nodejs/node/commit/3314b0bc60)] - **meta**: bump actions/upload-artifact from 4.6.2 to 5.0.0 (dependabot\[bot]) [#60531](https://github.com/nodejs/node/pull/60531)
- \[[`d1d9891feb`](https://github.com/nodejs/node/commit/d1d9891feb)] - **meta**: bump actions/github-script from 7.0.1 to 8.0.0 (dependabot\[bot]) [#60530](https://github.com/nodejs/node/pull/60530)
- \[[`995596a34f`](https://github.com/nodejs/node/commit/995596a34f)] - **meta**: bump actions/setup-node from 5.0.0 to 6.0.0 (dependabot\[bot]) [#60529](https://github.com/nodejs/node/pull/60529)
- \[[`b60157a0fe`](https://github.com/nodejs/node/commit/b60157a0fe)] - **meta**: bump actions/stale from 10.0.0 to 10.1.0 (dependabot\[bot]) [#60528](https://github.com/nodejs/node/pull/60528)
- \[[`07fa6c9081`](https://github.com/nodejs/node/commit/07fa6c9081)] - **meta**: call `create-release-post.yml` post release (Aviv Keller) [#60366](https://github.com/nodejs/node/pull/60366)
- \[[`727560a96d`](https://github.com/nodejs/node/commit/727560a96d)] - **(SEMVER-MINOR)** **module**: mark type stripping as stable (Marco Ippolito) [#60600](https://github.com/nodejs/node/pull/60600)
- \[[`506b79e888`](https://github.com/nodejs/node/commit/506b79e888)] - **(SEMVER-MINOR)** **net**: increase network family autoselection timeout to 500ms (Rod Vagg) [#60334](https://github.com/nodejs/node/pull/60334)
- \[[`166c72ec02`](https://github.com/nodejs/node/commit/166c72ec02)] - **(SEMVER-MINOR)** **node-api**: add napi_create_object_with_properties (Miguel Marcondes Filho) [#59953](https://github.com/nodejs/node/pull/59953)
- \[[`6ab83cf979`](https://github.com/nodejs/node/commit/6ab83cf979)] - **node-api**: use local files for instanceof test (Vladimir Morozov) [#60190](https://github.com/nodejs/node/pull/60190)
- \[[`3671851879`](https://github.com/nodejs/node/commit/3671851879)] - **perf_hooks**: move non-standard performance properties to perf_hooks (Chengzhong Wu) [#60370](https://github.com/nodejs/node/pull/60370)
- \[[`6ddee4a7ed`](https://github.com/nodejs/node/commit/6ddee4a7ed)] - **repl**: fix pasting after moving the cursor to the left (Ruben Bridgewater) [#60470](https://github.com/nodejs/node/pull/60470)
- \[[`edc3033905`](https://github.com/nodejs/node/commit/edc3033905)] - **sqlite,doc**: fix StatementSync section (Edy Silva) [#60474](https://github.com/nodejs/node/pull/60474)
- \[[`e9b68e60d4`](https://github.com/nodejs/node/commit/e9b68e60d4)] - **src**: move import.meta initializer to native land (Joyee Cheung) [#60603](https://github.com/nodejs/node/pull/60603)
- \[[`0ebf839a4f`](https://github.com/nodejs/node/commit/0ebf839a4f)] - **src**: use CP_UTF8 for wide file names on win32 (Fedor Indutny) [#60575](https://github.com/nodejs/node/pull/60575)
- \[[`a31ad37714`](https://github.com/nodejs/node/commit/a31ad37714)] - **src**: show original file name in FileHandle GC close errors (Anna Henningsen) [#60593](https://github.com/nodejs/node/pull/60593)
- \[[`a6c221324b`](https://github.com/nodejs/node/commit/a6c221324b)] - **src**: avoid C strings in more C++ exception throws (Anna Henningsen) [#60592](https://github.com/nodejs/node/pull/60592)
- \[[`fdff838ce3`](https://github.com/nodejs/node/commit/fdff838ce3)] - **src**: add internal binding for constructing SharedArrayBuffers (Renegade334) [#60497](https://github.com/nodejs/node/pull/60497)
- \[[`4385b0b65f`](https://github.com/nodejs/node/commit/4385b0b65f)] - **src**: move `napi_addon_register_func` to `node_api_types.h` (Anna Henningsen) [#60512](https://github.com/nodejs/node/pull/60512)
- \[[`de78da7887`](https://github.com/nodejs/node/commit/de78da7887)] - **src**: move Node-API version detection to where it is used (Anna Henningsen) [#60512](https://github.com/nodejs/node/pull/60512)
- \[[`b606d46c3f`](https://github.com/nodejs/node/commit/b606d46c3f)] - **src**: remove unconditional NAPI_EXPERIMENTAL in node.h (Chengzhong Wu) [#60345](https://github.com/nodejs/node/pull/60345)
- \[[`5941341889`](https://github.com/nodejs/node/commit/5941341889)] - **src**: clean up generic counter implementation (Anna Henningsen) [#60447](https://github.com/nodejs/node/pull/60447)
- \[[`7015f30e62`](https://github.com/nodejs/node/commit/7015f30e62)] - **src**: add enum handle for ToStringHelper + formatting (Burkov Egor) [#56829](https://github.com/nodejs/node/pull/56829)
- \[[`39dfcbad6e`](https://github.com/nodejs/node/commit/39dfcbad6e)] - **stream**: don't try to read more if reading (Robert Nagy) [#60454](https://github.com/nodejs/node/pull/60454)
- \[[`ee333c9177`](https://github.com/nodejs/node/commit/ee333c9177)] - **test**: deflake test-perf-hooks-timerify-histogram-sync (Joyee Cheung) [#60639](https://github.com/nodejs/node/pull/60639)
- \[[`f0d81c91e7`](https://github.com/nodejs/node/commit/f0d81c91e7)] - **test**: apply a delay to `watch-mode-kill-signal` tests (Joyee Cheung) [#60610](https://github.com/nodejs/node/pull/60610)
- \[[`68791e2ccc`](https://github.com/nodejs/node/commit/68791e2ccc)] - **test**: async iife in repl (Tony Gorez) [#44878](https://github.com/nodejs/node/pull/44878)
- \[[`c4eb9c3383`](https://github.com/nodejs/node/commit/c4eb9c3383)] - **test**: parallelize sea tests when there's enough disk space (Joyee Cheung) [#60604](https://github.com/nodejs/node/pull/60604)
- \[[`be8c4172d9`](https://github.com/nodejs/node/commit/be8c4172d9)] - **test**: only show overridden env in child process failures (Joyee Cheung) [#60556](https://github.com/nodejs/node/pull/60556)
- \[[`8cae858f88`](https://github.com/nodejs/node/commit/8cae858f88)] - **test**: ensure assertions are reached on more tests (Antoine du Hamel) [#60498](https://github.com/nodejs/node/pull/60498)
- \[[`759d69331e`](https://github.com/nodejs/node/commit/759d69331e)] - **test**: ensure assertions are reachable in `test/es-module` (Antoine du Hamel) [#60501](https://github.com/nodejs/node/pull/60501)
- \[[`6aaf18c333`](https://github.com/nodejs/node/commit/6aaf18c333)] - **test**: ensure assertions are reached on more tests (Antoine du Hamel) [#60485](https://github.com/nodejs/node/pull/60485)
- \[[`bc41acf087`](https://github.com/nodejs/node/commit/bc41acf087)] - **test**: ensure assertions are reached on more tests (Antoine du Hamel) [#60500](https://github.com/nodejs/node/pull/60500)
- \[[`22fd621daf`](https://github.com/nodejs/node/commit/22fd621daf)] - **test**: split test-perf-hooks-timerify (Joyee Cheung) [#60568](https://github.com/nodejs/node/pull/60568)
- \[[`5efe4f722e`](https://github.com/nodejs/node/commit/5efe4f722e)] - **test**: add more logs to test-esm-loader-hooks-inspect-wait (Joyee Cheung) [#60466](https://github.com/nodejs/node/pull/60466)
- \[[`2a57268f34`](https://github.com/nodejs/node/commit/2a57268f34)] - **test**: mark stringbytes-external-exceed-max tests as flaky on AIX (Joyee Cheung) [#60565](https://github.com/nodejs/node/pull/60565)
- \[[`2c199f7f61`](https://github.com/nodejs/node/commit/2c199f7f61)] - **test**: split test-esm-wasm.js (Joyee Cheung) [#60491](https://github.com/nodejs/node/pull/60491)
- \[[`bc8f7db5bb`](https://github.com/nodejs/node/commit/bc8f7db5bb)] - **test**: correct conditional secure heap flags test (Shelley Vohr) [#60385](https://github.com/nodejs/node/pull/60385)
- \[[`3bf42a5dd3`](https://github.com/nodejs/node/commit/3bf42a5dd3)] - **test**: spin longer on flaky platforms for test-worker-prof (Joyee Cheung) [#60492](https://github.com/nodejs/node/pull/60492)
- \[[`eca6227e7e`](https://github.com/nodejs/node/commit/eca6227e7e)] - **test**: ensure assertions are reachable in `test/internet` (Antoine du Hamel) [#60513](https://github.com/nodejs/node/pull/60513)
- \[[`313983453b`](https://github.com/nodejs/node/commit/313983453b)] - **test**: fix flaky test-watch-mode-kill-signal-\* (Joyee Cheung) [#60443](https://github.com/nodejs/node/pull/60443)
- \[[`ccc26377b5`](https://github.com/nodejs/node/commit/ccc26377b5)] - **test**: capture stack trace in debugger timeout errors (Joyee Cheung) [#60457](https://github.com/nodejs/node/pull/60457)
- \[[`12e9213a24`](https://github.com/nodejs/node/commit/12e9213a24)] - **test**: ensure assertions are reachable in `test/sequential` (Antoine du Hamel) [#60412](https://github.com/nodejs/node/pull/60412)
- \[[`781a2661de`](https://github.com/nodejs/node/commit/781a2661de)] - **test**: ensure assertions are reachable in more folders (Antoine du Hamel) [#60411](https://github.com/nodejs/node/pull/60411)
- \[[`1e979e6eb7`](https://github.com/nodejs/node/commit/1e979e6eb7)] - **test**: split test-runner-watch-mode (Joyee Cheung) [#60391](https://github.com/nodejs/node/pull/60391)
- \[[`8c31cbb99b`](https://github.com/nodejs/node/commit/8c31cbb99b)] - **test**: move test-runner-watch-mode helper into common (Joyee Cheung) [#60391](https://github.com/nodejs/node/pull/60391)
- \[[`c94c6555cc`](https://github.com/nodejs/node/commit/c94c6555cc)] - **test,crypto**: handle a few more BoringSSL tests (Shelley Vohr) [#59030](https://github.com/nodejs/node/pull/59030)
- \[[`fd63c27444`](https://github.com/nodejs/node/commit/fd63c27444)] - **test,crypto**: update x448 and ed448 expectation when on boringssl (Shelley Vohr) [#60387](https://github.com/nodejs/node/pull/60387)
- \[[`bf0de92446`](https://github.com/nodejs/node/commit/bf0de92446)] - **tls**: fix leak on invalid protocol method (Shelley Vohr) [#60427](https://github.com/nodejs/node/pull/60427)
- \[[`7e8373b378`](https://github.com/nodejs/node/commit/7e8373b378)] - **tools**: replace invalid expression in dependabot config (Riddhi) [#60649](https://github.com/nodejs/node/pull/60649)
- \[[`ac08760547`](https://github.com/nodejs/node/commit/ac08760547)] - **tools**: extract Nix dependency lists to separate files (Antoine du Hamel) [#60495](https://github.com/nodejs/node/pull/60495)
- \[[`ae91a6cc3a`](https://github.com/nodejs/node/commit/ae91a6cc3a)] - **tools**: only add test reporter args when node:test is used (Joyee Cheung) [#60551](https://github.com/nodejs/node/pull/60551)
- \[[`97ed560222`](https://github.com/nodejs/node/commit/97ed560222)] - **tools**: skip unaffected GHA jobs for changes in `test/internet` (Antoine du Hamel) [#60517](https://github.com/nodejs/node/pull/60517)
- \[[`44ca97b404`](https://github.com/nodejs/node/commit/44ca97b404)] - **tools**: fix update-icu script (Michaël Zasso) [#60521](https://github.com/nodejs/node/pull/60521)
- \[[`07b0b5a5ba`](https://github.com/nodejs/node/commit/07b0b5a5ba)] - **tools**: fix linter for semver-major release proposals (Antoine du Hamel) [#60481](https://github.com/nodejs/node/pull/60481)
- \[[`97d74224c3`](https://github.com/nodejs/node/commit/97d74224c3)] - **tools**: fix failing release-proposal linter for LTS transitions (Antoine du Hamel) [#60465](https://github.com/nodejs/node/pull/60465)
- \[[`019af5bc27`](https://github.com/nodejs/node/commit/019af5bc27)] - **tools**: skip running test-shared on deps changes (Antoine du Hamel) [#60433](https://github.com/nodejs/node/pull/60433)
- \[[`3ec9764151`](https://github.com/nodejs/node/commit/3ec9764151)] - **tools**: pin OpenSSL to 3.5.4 on test-shared workflow (Antoine du Hamel) [#60428](https://github.com/nodejs/node/pull/60428)
- \[[`fe2d6d44d4`](https://github.com/nodejs/node/commit/fe2d6d44d4)] - **tools**: remove undici from daily wpt.fyi job (Filip Skokan) [#60444](https://github.com/nodejs/node/pull/60444)
- \[[`d09ba98398`](https://github.com/nodejs/node/commit/d09ba98398)] - **tools**: document that nixpkgs updates should not be backported (Antoine du Hamel) [#60431](https://github.com/nodejs/node/pull/60431)
- \[[`7fc99319e7`](https://github.com/nodejs/node/commit/7fc99319e7)] - **tools**: do not use short hashes for deps versioning to avoid collision (Antoine du Hamel) [#60407](https://github.com/nodejs/node/pull/60407)
- \[[`815edb0c3a`](https://github.com/nodejs/node/commit/815edb0c3a)] - **tools,doc**: update JavaScript primitive types to match MDN Web Docs (JustApple) [#60581](https://github.com/nodejs/node/pull/60581)
- \[[`6877139a2d`](https://github.com/nodejs/node/commit/6877139a2d)] - **util**: fix stylize of special properties in inspect (Ge Gao) [#60479](https://github.com/nodejs/node/pull/60479)
- \[[`399b340022`](https://github.com/nodejs/node/commit/399b340022)] - **(SEMVER-MINOR)** **v8**: adding total_allocated_bytes to HeapStatistics (Caio Lima) [#60573](https://github.com/nodejs/node/pull/60573)
- \[[`d64795b318`](https://github.com/nodejs/node/commit/d64795b318)] - **watch**: fix interaction with multiple env files (Marco Ippolito) [#60605](https://github.com/nodejs/node/pull/60605)

Windows 64-bit Installer: https://nodejs.org/dist/v25.2.0/node-v25.2.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v25.2.0/node-v25.2.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v25.2.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v25.2.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v25.2.0/node-v25.2.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v25.2.0/node-v25.2.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v25.2.0/node-v25.2.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v25.2.0/node-v25.2.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v25.2.0/node-v25.2.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v25.2.0/node-v25.2.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v25.2.0/node-v25.2.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v25.2.0/node-v25.2.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v25.2.0/node-v25.2.0.tar.gz \
Other release files: https://nodejs.org/dist/v25.2.0/ \
Documentation: https://nodejs.org/docs/v25.2.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

a7c3aec2d15e5a4162bc79a7dabff24cbc3cbd2eb5aaca416837358432231fc0  node-v25.2.0-aix-ppc64.tar.gz
652e602a34e67725db596b4a3da17fa2bc65c789e5c98a88c5e04e8066b989b6  node-v25.2.0-arm64.msi
5ce975101e85598d2f1f84b297e8bd7ff315e46fa644be1ffc76f0c48de480bb  node-v25.2.0-darwin-arm64.tar.gz
b76b23e604e732ee57a2099dd21ce22e18aec5d2a0dff38ab87222887c5d876c  node-v25.2.0-darwin-arm64.tar.xz
939c948f407a6e06bf6ce4ca9d978d24cf24dddb0714ea4321f548d06baf45c6  node-v25.2.0-darwin-x64.tar.gz
1b78f9bbc997a98a579e4dd474c6dbd4a2cc5490571664619b13cd17d8f08729  node-v25.2.0-darwin-x64.tar.xz
2e11d25c1b0c0df15fa44bc20f56fdb34782a16adafd5c8881c5f6aee48277db  node-v25.2.0-headers.tar.gz
a7f9c9661fbeb1bb1836fd6864214603cfea29e5d471c6a6b3be1669e2c8bf75  node-v25.2.0-headers.tar.xz
da357f65a5a6d9ebe6ba2572e73c3ba2a03e4e39ec54871cf98549cda631dec8  node-v25.2.0-linux-arm64.tar.gz
d14fdcf9a62059d4f9ae92bda8b3b796c0a1545828ade17ef736317dc7c03851  node-v25.2.0-linux-arm64.tar.xz
5306ffc31e3b9a4e50d099c26819ef4a2cd75ebd92950f5f074e9f88a522d993  node-v25.2.0-linux-ppc64le.tar.gz
d5b131e65e2632763caa6e4c490d2c07ef5304aa0748487aceee9963802ce2dc  node-v25.2.0-linux-ppc64le.tar.xz
13e224a63e6db10b9eb15a2d58d94f1e3fa3c0e7b487472f62087a49d1f86148  node-v25.2.0-linux-s390x.tar.gz
9f73e61104e4671775b140a7bb687dbfbd51e9a44339532b60ac7ec18e1dc5ec  node-v25.2.0-linux-s390x.tar.xz
41eb2871bc1fffe872c7a0dc588fccacf2892e563ff3115648a41278fe5b579b  node-v25.2.0-linux-x64.tar.gz
ad46cf9ac2eb5f78eb8578899bdaa5392fcfc21a7bcd7106174a55c40e61692b  node-v25.2.0-linux-x64.tar.xz
64c1ae32fd9161f6a016114c43f0292574c82332df0827dc9183437b94daf1f2  node-v25.2.0-win-arm64.7z
98b282c43656f3a46c0a9dc685e4faa245a1eae91797f0b55822e658d9bd8b0e  node-v25.2.0-win-arm64.zip
60cadd00d8972d4e239779cb92b042287b73ebc83ed7dd8c476d119d54725d88  node-v25.2.0-win-x64.7z
d06b49148fa8a0f6d4f0fb9fb5c2a6b66a5a3c5db89a3b4a83448e18237375e1  node-v25.2.0-win-x64.zip
2713ab55a425f4367ea161e3e92b69cfa2704c0fd32f64c1b067247ac6b1f5f8  node-v25.2.0-x64.msi
bce55c8f6f95812a356b9819e0c05be71f77a7a8455327fb97ad39438cc6727d  node-v25.2.0.pkg
c98a05bae6d650ec2ff0babb436ebaed178205ff679e9667bd7a90837574ff11  node-v25.2.0.tar.gz
8bf7bafb5a89d3d20eefbcb159401e2abccea0cf85bef65e314b626730c525a1  node-v25.2.0.tar.xz
6372e9b7e06c66ce63348f7365c69158c355822c22e11bc16e561697af567c94  win-arm64/node.exe
8505f43c0673d071ace6d57c0008eae3b7eca1b7cd6d334c7a632eff056a090e  win-arm64/node.lib
a0ebfe87d31755493c8f505ce3b76fcbb775a6660be9a87301fcba5133755608  win-arm64/node_pdb.7z
3dea69db0230f3fff7c97895e3c47a0d4ef5198abeef3232cfa7592ccd866cb1  win-arm64/node_pdb.zip
0ef45d2aaabeaadf5a091a65e4b1eb205c2d5b21907049758277d90e9cf1f507  win-x64/node.exe
d5fa10f3ab2f43420a7f2253a14508802e42541b14cd805e5f04d51cc0caa21f  win-x64/node.lib
65e6198cc03f23c095e2142b3ef0201ba66db2d16ebfc12b46297f5c5b97e9d3  win-x64/node_pdb.7z
9c104094ae2560443945b95c02e7176d6739db1f5fa613bd473ddfb6d3340e0f  win-x64/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaRO5ZwAKCRAgsaOQsWjT
VnVXAQDu+jq5ELInkMvc6uH88kGnBnWB1bYsFJkV4aB8ajEEtAEAmGE9Nvldw5w+
UxEAsNVAaVHa034nlb6cnyA23koN1g8=
=tHkG
-----END PGP SIGNATURE-----
```
