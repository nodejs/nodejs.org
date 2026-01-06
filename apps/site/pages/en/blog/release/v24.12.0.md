---
date: '2025-12-10T16:51:31.743Z'
category: release
title: Node.js 24.12.0 (LTS)
layout: blog-post
author: Michaël Zasso
---

## 2025-12-10, Version 24.12.0 'Krypton' (LTS), @targos

### Notable Changes

- \[[`1a00b5f68a`](https://github.com/nodejs/node/commit/1a00b5f68a)] - **(SEMVER-MINOR)** **http**: add optimizeEmptyRequests server option (Rafael Gonzaga) [#59778](https://github.com/nodejs/node/pull/59778)
- \[[`ff5754077d`](https://github.com/nodejs/node/commit/ff5754077d)] - **(SEMVER-MINOR)** **lib**: add options to util.deprecate (Rafael Gonzaga) [#59982](https://github.com/nodejs/node/pull/59982)
- \[[`8987159234`](https://github.com/nodejs/node/commit/8987159234)] - **(SEMVER-MINOR)** **module**: mark type stripping as stable (Marco Ippolito) [#60600](https://github.com/nodejs/node/pull/60600)
- \[[`92c484ebf4`](https://github.com/nodejs/node/commit/92c484ebf4)] - **(SEMVER-MINOR)** **node-api**: add napi_create_object_with_properties (Miguel Marcondes Filho) [#59953](https://github.com/nodejs/node/pull/59953)
- \[[`b11bc5984e`](https://github.com/nodejs/node/commit/b11bc5984e)] - **(SEMVER-MINOR)** **sqlite**: allow setting defensive flag (Bart Louwers) [#60217](https://github.com/nodejs/node/pull/60217)
- \[[`e7da5b4b7d`](https://github.com/nodejs/node/commit/e7da5b4b7d)] - **(SEMVER-MINOR)** **src**: add watch config namespace (Marco Ippolito) [#60178](https://github.com/nodejs/node/pull/60178)
- \[[`a7f7d10c06`](https://github.com/nodejs/node/commit/a7f7d10c06)] - **(SEMVER-MINOR)** **src**: add an option to make compile cache portable (Aditi) [#58797](https://github.com/nodejs/node/pull/58797)
- \[[`92ea669240`](https://github.com/nodejs/node/commit/92ea669240)] - **(SEMVER-MINOR)** **src,permission**: add --allow-inspector ability (Rafael Gonzaga) [#59711](https://github.com/nodejs/node/pull/59711)
- \[[`05d7509bd2`](https://github.com/nodejs/node/commit/05d7509bd2)] - **(SEMVER-MINOR)** **v8**: add cpu profile (theanarkh) [#59807](https://github.com/nodejs/node/pull/59807)

### Commits

- \[[`e4a23a35ac`](https://github.com/nodejs/node/commit/e4a23a35ac)] - **benchmark**: focus on import.meta initialization in import-meta benchmark (Joyee Cheung) [#60603](https://github.com/nodejs/node/pull/60603)
- \[[`b6114ae5c9`](https://github.com/nodejs/node/commit/b6114ae5c9)] - **benchmark**: add per-suite setup option (Joyee Cheung) [#60574](https://github.com/nodejs/node/pull/60574)
- \[[`ac8e90af7c`](https://github.com/nodejs/node/commit/ac8e90af7c)] - **buffer**: speed up concat via TypedArray#set (Gürgün Dayıoğlu) [#60399](https://github.com/nodejs/node/pull/60399)
- \[[`acbc8ca13e`](https://github.com/nodejs/node/commit/acbc8ca13e)] - **build**: upgrade Python linter ruff, add rules ASYNC,PERF (Christian Clauss) [#59984](https://github.com/nodejs/node/pull/59984)
- \[[`f97a609a07`](https://github.com/nodejs/node/commit/f97a609a07)] - **console**: optimize single-string logging (Gürgün Dayıoğlu) [#60422](https://github.com/nodejs/node/pull/60422)
- \[[`6cd9bdc580`](https://github.com/nodejs/node/commit/6cd9bdc580)] - **crypto**: ensure documented RSA-PSS saltLength default is used (Filip Skokan) [#60662](https://github.com/nodejs/node/pull/60662)
- \[[`0fafe24d9b`](https://github.com/nodejs/node/commit/0fafe24d9b)] - **crypto**: fix argument validation in crypto.timingSafeEqual fast path (Joyee Cheung) [#60538](https://github.com/nodejs/node/pull/60538)
- \[[`54421e0419`](https://github.com/nodejs/node/commit/54421e0419)] - **debugger**: fix event listener leak in the run command (Joyee Cheung) [#60464](https://github.com/nodejs/node/pull/60464)
- \[[`c361a628b4`](https://github.com/nodejs/node/commit/c361a628b4)] - **deps**: V8: cherry-pick 72b0e27bd936 (pthier) [#60732](https://github.com/nodejs/node/pull/60732)
- \[[`c70f4588dd`](https://github.com/nodejs/node/commit/c70f4588dd)] - **deps**: V8: cherry-pick 6bb32bd2c194 (Erik Corry) [#60732](https://github.com/nodejs/node/pull/60732)
- \[[`881fe784c5`](https://github.com/nodejs/node/commit/881fe784c5)] - **deps**: V8: cherry-pick 0dd2318b5237 (Erik Corry) [#60732](https://github.com/nodejs/node/pull/60732)
- \[[`457c33efcc`](https://github.com/nodejs/node/commit/457c33efcc)] - **deps**: V8: cherry-pick df20105ccf36 (Erik Corry) [#60732](https://github.com/nodejs/node/pull/60732)
- \[[`0bf45a829c`](https://github.com/nodejs/node/commit/0bf45a829c)] - **deps**: V8: backport e5dbbbadcbff (Darshan Sen) [#60524](https://github.com/nodejs/node/pull/60524)
- \[[`4993bdc476`](https://github.com/nodejs/node/commit/4993bdc476)] - **deps**: V8: cherry-pick 5ba9200cd046 (Juan José Arboleda) [#60620](https://github.com/nodejs/node/pull/60620)
- \[[`1e9abe0078`](https://github.com/nodejs/node/commit/1e9abe0078)] - **deps**: update corepack to 0.34.5 (Node.js GitHub Bot) [#60842](https://github.com/nodejs/node/pull/60842)
- \[[`3f704ed08f`](https://github.com/nodejs/node/commit/3f704ed08f)] - **deps**: update corepack to 0.34.4 (Node.js GitHub Bot) [#60643](https://github.com/nodejs/node/pull/60643)
- \[[`04e360fdb1`](https://github.com/nodejs/node/commit/04e360fdb1)] - **deps**: V8: cherry-pick 06bf293610ef, 146962dda8d2 and e0fb10b5148c (Michaël Zasso) [#60713](https://github.com/nodejs/node/pull/60713)
- \[[`fcbd8dbbde`](https://github.com/nodejs/node/commit/fcbd8dbbde)] - **deps**: patch V8 to 13.6.233.17 (Michaël Zasso) [#60712](https://github.com/nodejs/node/pull/60712)
- \[[`28e9433f39`](https://github.com/nodejs/node/commit/28e9433f39)] - **deps**: V8: cherry-pick 87356585659b (Joyee Cheung) [#60069](https://github.com/nodejs/node/pull/60069)
- \[[`3cac85b243`](https://github.com/nodejs/node/commit/3cac85b243)] - **deps**: V8: backport 2e4c5cf9b112 (Michaël Zasso) [#60654](https://github.com/nodejs/node/pull/60654)
- \[[`1daece1970`](https://github.com/nodejs/node/commit/1daece1970)] - **deps**: call OPENSSL_free after ASN1_STRING_to_UTF8 (Rafael Gonzaga) [#60609](https://github.com/nodejs/node/pull/60609)
- \[[`5f55a9c9ea`](https://github.com/nodejs/node/commit/5f55a9c9ea)] - **deps**: nghttp2: revert 7784fa979d0b (Antoine du Hamel) [#59790](https://github.com/nodejs/node/pull/59790)
- \[[`1d9e7c1f4d`](https://github.com/nodejs/node/commit/1d9e7c1f4d)] - **deps**: update nghttp2 to 1.67.1 (nodejs-github-bot) [#59790](https://github.com/nodejs/node/pull/59790)
- \[[`3140415068`](https://github.com/nodejs/node/commit/3140415068)] - **deps**: update simdjson to 4.1.0 (Node.js GitHub Bot) [#60542](https://github.com/nodejs/node/pull/60542)
- \[[`d911f9f1b8`](https://github.com/nodejs/node/commit/d911f9f1b8)] - **deps**: update amaro to 1.1.5 (Node.js GitHub Bot) [#60541](https://github.com/nodejs/node/pull/60541)
- \[[`daaaf04a32`](https://github.com/nodejs/node/commit/daaaf04a32)] - **deps**: V8: cherry-pick 2abc61361dd4 (Richard Lau) [#60177](https://github.com/nodejs/node/pull/60177)
- \[[`b4f63ee5f8`](https://github.com/nodejs/node/commit/b4f63ee5f8)] - **doc**: update Collaborators list to reflect hybrist handle change (Antoine du Hamel) [#60650](https://github.com/nodejs/node/pull/60650)
- \[[`effcf7a8ab`](https://github.com/nodejs/node/commit/effcf7a8ab)] - **doc**: fix link in `--env-file=file` section (N. Bighetti) [#60563](https://github.com/nodejs/node/pull/60563)
- \[[`7011736703`](https://github.com/nodejs/node/commit/7011736703)] - **doc**: fix linter issues (Antoine du Hamel) [#60636](https://github.com/nodejs/node/pull/60636)
- \[[`5cc79d8945`](https://github.com/nodejs/node/commit/5cc79d8945)] - **doc**: add missing history entry for `sqlite.md` (Antoine du Hamel) [#60607](https://github.com/nodejs/node/pull/60607)
- \[[`bbc649057c`](https://github.com/nodejs/node/commit/bbc649057c)] - **doc**: correct values/references for buffer.kMaxLength (René) [#60305](https://github.com/nodejs/node/pull/60305)
- \[[`ea7ecb517b`](https://github.com/nodejs/node/commit/ea7ecb517b)] - **doc**: recommend events.once to manage 'close' event (Dan Fabulich) [#60017](https://github.com/nodejs/node/pull/60017)
- \[[`58bff04cc2`](https://github.com/nodejs/node/commit/58bff04cc2)] - **doc**: highlight module loading difference between import and require (Ajay A) [#59815](https://github.com/nodejs/node/pull/59815)
- \[[`bbcbff9b4d`](https://github.com/nodejs/node/commit/bbcbff9b4d)] - **doc**: add CJS code snippets in `sqlite.md` (Allon Murienik) [#60395](https://github.com/nodejs/node/pull/60395)
- \[[`f8af33d5a7`](https://github.com/nodejs/node/commit/f8af33d5a7)] - **doc**: fix typo in `process.unref` documentation (우혁) [#59698](https://github.com/nodejs/node/pull/59698)
- \[[`df105dc351`](https://github.com/nodejs/node/commit/df105dc351)] - **doc**: add some entries to `glossary.md` (Mohataseem Khan) [#59277](https://github.com/nodejs/node/pull/59277)
- \[[`4955cb2b5b`](https://github.com/nodejs/node/commit/4955cb2b5b)] - **doc**: improve agent.createConnection docs for http and https agents (JaeHo Jang) [#58205](https://github.com/nodejs/node/pull/58205)
- \[[`6283bb5cc9`](https://github.com/nodejs/node/commit/6283bb5cc9)] - **doc**: fix pseudo code in modules.md (chirsz) [#57677](https://github.com/nodejs/node/pull/57677)
- \[[`d5059ea537`](https://github.com/nodejs/node/commit/d5059ea537)] - **doc**: add missing variable in code snippet (Koushil Mankali) [#55478](https://github.com/nodejs/node/pull/55478)
- \[[`900de373ae`](https://github.com/nodejs/node/commit/900de373ae)] - **doc**: add missing word in `single-executable-applications.md` (Konstantin Tsabolov) [#53864](https://github.com/nodejs/node/pull/53864)
- \[[`5735044c8b`](https://github.com/nodejs/node/commit/5735044c8b)] - **doc**: fix typo in http.md (Michael Solomon) [#59354](https://github.com/nodejs/node/pull/59354)
- \[[`2dee6df831`](https://github.com/nodejs/node/commit/2dee6df831)] - **doc**: update devcontainer.json and add documentation (Joyee Cheung) [#60472](https://github.com/nodejs/node/pull/60472)
- \[[`8f2d98d7d2`](https://github.com/nodejs/node/commit/8f2d98d7d2)] - **doc**: add haramj as triager (Haram Jeong) [#60348](https://github.com/nodejs/node/pull/60348)
- \[[`bbd7fdfff4`](https://github.com/nodejs/node/commit/bbd7fdfff4)] - **doc**: clarify require(esm) description (dynst) [#60520](https://github.com/nodejs/node/pull/60520)
- \[[`33ad11a764`](https://github.com/nodejs/node/commit/33ad11a764)] - **doc**: instantiate resolver object (Donghoon Nam) [#60476](https://github.com/nodejs/node/pull/60476)
- \[[`81a61274f3`](https://github.com/nodejs/node/commit/81a61274f3)] - **doc**: correct module loading descriptions (Joyee Cheung) [#60346](https://github.com/nodejs/node/pull/60346)
- \[[`77911185fe`](https://github.com/nodejs/node/commit/77911185fe)] - **doc**: clarify --use-system-ca support status (Joyee Cheung) [#60340](https://github.com/nodejs/node/pull/60340)
- \[[`185f6e95d9`](https://github.com/nodejs/node/commit/185f6e95d9)] - **doc,crypto**: link keygen to supported types (Filip Skokan) [#60585](https://github.com/nodejs/node/pull/60585)
- \[[`772d6c6608`](https://github.com/nodejs/node/commit/772d6c6608)] - **doc,src,lib**: clarify experimental status of Web Storage support (Antoine du Hamel) [#60708](https://github.com/nodejs/node/pull/60708)
- \[[`ad98e11ac2`](https://github.com/nodejs/node/commit/ad98e11ac2)] - **esm**: use sync loading/resolving on non-loader-hook thread (Joyee Cheung) [#60380](https://github.com/nodejs/node/pull/60380)
- \[[`1a00b5f68a`](https://github.com/nodejs/node/commit/1a00b5f68a)] - **(SEMVER-MINOR)** **http**: add optimizeEmptyRequests server option (Rafael Gonzaga) [#59778](https://github.com/nodejs/node/pull/59778)
- \[[`5703ce68bc`](https://github.com/nodejs/node/commit/5703ce68bc)] - **http**: replace startsWith with strict equality (btea) [#59394](https://github.com/nodejs/node/pull/59394)
- \[[`2b696ffad8`](https://github.com/nodejs/node/commit/2b696ffad8)] - **http2**: add diagnostics channels for client stream request body (Darshan Sen) [#60480](https://github.com/nodejs/node/pull/60480)
- \[[`dbdf4cb5a5`](https://github.com/nodejs/node/commit/dbdf4cb5a5)] - **inspector**: inspect HTTP response body (Chengzhong Wu) [#60572](https://github.com/nodejs/node/pull/60572)
- \[[`9dc9a7d33d`](https://github.com/nodejs/node/commit/9dc9a7d33d)] - **inspector**: support inspecting HTTP/2 request and response bodies (Darshan Sen) [#60483](https://github.com/nodejs/node/pull/60483)
- \[[`89fa2befe4`](https://github.com/nodejs/node/commit/89fa2befe4)] - **inspector**: fix crash when receiving non json message (Shima Ryuhei) [#60388](https://github.com/nodejs/node/pull/60388)
- \[[`ff5754077d`](https://github.com/nodejs/node/commit/ff5754077d)] - **(SEMVER-MINOR)** **lib**: add options to util.deprecate (Rafael Gonzaga) [#59982](https://github.com/nodejs/node/pull/59982)
- \[[`33baaf42c8`](https://github.com/nodejs/node/commit/33baaf42c8)] - **lib**: replace global SharedArrayBuffer constructor with bound method (Renegade334) [#60497](https://github.com/nodejs/node/pull/60497)
- \[[`b047586a08`](https://github.com/nodejs/node/commit/b047586a08)] - **meta**: bump actions/download-artifact from 5.0.0 to 6.0.0 (dependabot\[bot]) [#60532](https://github.com/nodejs/node/pull/60532)
- \[[`64192176d7`](https://github.com/nodejs/node/commit/64192176d7)] - **meta**: bump actions/upload-artifact from 4.6.2 to 5.0.0 (dependabot\[bot]) [#60531](https://github.com/nodejs/node/pull/60531)
- \[[`af6d4a6b9b`](https://github.com/nodejs/node/commit/af6d4a6b9b)] - **meta**: bump github/codeql-action from 3.30.5 to 4.31.2 (dependabot\[bot]) [#60533](https://github.com/nodejs/node/pull/60533)
- \[[`c17276fd24`](https://github.com/nodejs/node/commit/c17276fd24)] - **meta**: bump actions/setup-node from 5.0.0 to 6.0.0 (dependabot\[bot]) [#60529](https://github.com/nodejs/node/pull/60529)
- \[[`6e8b52a7dc`](https://github.com/nodejs/node/commit/6e8b52a7dc)] - **meta**: bump actions/stale from 10.0.0 to 10.1.0 (dependabot\[bot]) [#60528](https://github.com/nodejs/node/pull/60528)
- \[[`a12658595b`](https://github.com/nodejs/node/commit/a12658595b)] - **meta**: call `create-release-post.yml` post release (Aviv Keller) [#60366](https://github.com/nodejs/node/pull/60366)
- \[[`8987159234`](https://github.com/nodejs/node/commit/8987159234)] - **(SEMVER-MINOR)** **module**: mark type stripping as stable (Marco Ippolito) [#60600](https://github.com/nodejs/node/pull/60600)
- \[[`36da413663`](https://github.com/nodejs/node/commit/36da413663)] - **module**: fix directory option in the enableCompileCache() API (Joyee Cheung) [#59931](https://github.com/nodejs/node/pull/59931)
- \[[`92c484ebf4`](https://github.com/nodejs/node/commit/92c484ebf4)] - **(SEMVER-MINOR)** **node-api**: add napi_create_object_with_properties (Miguel Marcondes Filho) [#59953](https://github.com/nodejs/node/pull/59953)
- \[[`545162b0d4`](https://github.com/nodejs/node/commit/545162b0d4)] - **node-api**: use local files for instanceof test (Vladimir Morozov) [#60190](https://github.com/nodejs/node/pull/60190)
- \[[`526c011d89`](https://github.com/nodejs/node/commit/526c011d89)] - **perf_hooks**: fix stack overflow error (Antoine du Hamel) [#60084](https://github.com/nodejs/node/pull/60084)
- \[[`1de0476939`](https://github.com/nodejs/node/commit/1de0476939)] - **perf_hooks**: move non-standard performance properties to perf_hooks (Chengzhong Wu) [#60370](https://github.com/nodejs/node/pull/60370)
- \[[`07ec1239ef`](https://github.com/nodejs/node/commit/07ec1239ef)] - **repl**: fix pasting after moving the cursor to the left (Ruben Bridgewater) [#60470](https://github.com/nodejs/node/pull/60470)
- \[[`b11bc5984e`](https://github.com/nodejs/node/commit/b11bc5984e)] - **(SEMVER-MINOR)** **sqlite**: allow setting defensive flag (Bart Louwers) [#60217](https://github.com/nodejs/node/pull/60217)
- \[[`273c9661fd`](https://github.com/nodejs/node/commit/273c9661fd)] - **sqlite,doc**: fix StatementSync section (Edy Silva) [#60474](https://github.com/nodejs/node/pull/60474)
- \[[`d92ec21a4c`](https://github.com/nodejs/node/commit/d92ec21a4c)] - **src**: use CP_UTF8 for wide file names on win32 (Fedor Indutny) [#60575](https://github.com/nodejs/node/pull/60575)
- \[[`baef0468ed`](https://github.com/nodejs/node/commit/baef0468ed)] - **src**: move Node-API version detection to where it is used (Anna Henningsen) [#60512](https://github.com/nodejs/node/pull/60512)
- \[[`e7da5b4b7d`](https://github.com/nodejs/node/commit/e7da5b4b7d)] - **(SEMVER-MINOR)** **src**: add watch config namespace (Marco Ippolito) [#60178](https://github.com/nodejs/node/pull/60178)
- \[[`a7f7d10c06`](https://github.com/nodejs/node/commit/a7f7d10c06)] - **(SEMVER-MINOR)** **src**: add an option to make compile cache portable (Aditi) [#58797](https://github.com/nodejs/node/pull/58797)
- \[[`566add0b19`](https://github.com/nodejs/node/commit/566add0b19)] - **src**: avoid C strings in more C++ exception throws (Anna Henningsen) [#60592](https://github.com/nodejs/node/pull/60592)
- \[[`9b796347c1`](https://github.com/nodejs/node/commit/9b796347c1)] - **src**: add internal binding for constructing SharedArrayBuffers (Renegade334) [#60497](https://github.com/nodejs/node/pull/60497)
- \[[`3b01cbb411`](https://github.com/nodejs/node/commit/3b01cbb411)] - **src**: move `napi_addon_register_func` to `node_api_types.h` (Anna Henningsen) [#60512](https://github.com/nodejs/node/pull/60512)
- \[[`02fb7f4ecb`](https://github.com/nodejs/node/commit/02fb7f4ecb)] - **src**: remove unconditional NAPI_EXPERIMENTAL in node.h (Chengzhong Wu) [#60345](https://github.com/nodejs/node/pull/60345)
- \[[`bd09ae24e4`](https://github.com/nodejs/node/commit/bd09ae24e4)] - **src**: clean up generic counter implementation (Anna Henningsen) [#60447](https://github.com/nodejs/node/pull/60447)
- \[[`cd6bf51dbd`](https://github.com/nodejs/node/commit/cd6bf51dbd)] - **src**: add enum handle for ToStringHelper + formatting (Burkov Egor) [#56829](https://github.com/nodejs/node/pull/56829)
- \[[`92ea669240`](https://github.com/nodejs/node/commit/92ea669240)] - **(SEMVER-MINOR)** **src,permission**: add --allow-inspector ability (Rafael Gonzaga) [#59711](https://github.com/nodejs/node/pull/59711)
- \[[`ac3dbe48f7`](https://github.com/nodejs/node/commit/ac3dbe48f7)] - **stream**: don't try to read more if reading (Robert Nagy) [#60454](https://github.com/nodejs/node/pull/60454)
- \[[`790288a93b`](https://github.com/nodejs/node/commit/790288a93b)] - **test**: ensure assertions are reachable in `test/internet` (Antoine du Hamel) [#60513](https://github.com/nodejs/node/pull/60513)
- \[[`0a85132989`](https://github.com/nodejs/node/commit/0a85132989)] - **test**: fix status when compiled without inspector (Antoine du Hamel) [#60289](https://github.com/nodejs/node/pull/60289)
- \[[`2f57673172`](https://github.com/nodejs/node/commit/2f57673172)] - **test**: deflake test-perf-hooks-timerify-histogram-sync (Joyee Cheung) [#60639](https://github.com/nodejs/node/pull/60639)
- \[[`09726269de`](https://github.com/nodejs/node/commit/09726269de)] - **test**: apply a delay to `watch-mode-kill-signal` tests (Joyee Cheung) [#60610](https://github.com/nodejs/node/pull/60610)
- \[[`45537b9562`](https://github.com/nodejs/node/commit/45537b9562)] - **test**: async iife in repl (Tony Gorez) [#44878](https://github.com/nodejs/node/pull/44878)
- \[[`4ca81f101d`](https://github.com/nodejs/node/commit/4ca81f101d)] - **test**: parallelize sea tests when there's enough disk space (Joyee Cheung) [#60604](https://github.com/nodejs/node/pull/60604)
- \[[`ea71e96191`](https://github.com/nodejs/node/commit/ea71e96191)] - **test**: only show overridden env in child process failures (Joyee Cheung) [#60556](https://github.com/nodejs/node/pull/60556)
- \[[`06b2e348c7`](https://github.com/nodejs/node/commit/06b2e348c7)] - **test**: ensure assertions are reached on more tests (Antoine du Hamel) [#60498](https://github.com/nodejs/node/pull/60498)
- \[[`de9c8cb670`](https://github.com/nodejs/node/commit/de9c8cb670)] - **test**: ensure assertions are reachable in `test/es-module` (Antoine du Hamel) [#60501](https://github.com/nodejs/node/pull/60501)
- \[[`75bc40fced`](https://github.com/nodejs/node/commit/75bc40fced)] - **test**: ensure assertions are reached on more tests (Antoine du Hamel) [#60485](https://github.com/nodejs/node/pull/60485)
- \[[`1a6084cfd3`](https://github.com/nodejs/node/commit/1a6084cfd3)] - **test**: ensure assertions are reached on more tests (Antoine du Hamel) [#60500](https://github.com/nodejs/node/pull/60500)
- \[[`2c651c90cf`](https://github.com/nodejs/node/commit/2c651c90cf)] - **test**: split test-perf-hooks-timerify (Joyee Cheung) [#60568](https://github.com/nodejs/node/pull/60568)
- \[[`6e8b5f7345`](https://github.com/nodejs/node/commit/6e8b5f7345)] - **test**: add more logs to test-esm-loader-hooks-inspect-wait (Joyee Cheung) [#60466](https://github.com/nodejs/node/pull/60466)
- \[[`9dea7ffa30`](https://github.com/nodejs/node/commit/9dea7ffa30)] - **test**: mark stringbytes-external-exceed-max tests as flaky on AIX (Joyee Cheung) [#60565](https://github.com/nodejs/node/pull/60565)
- \[[`0b3c3b710a`](https://github.com/nodejs/node/commit/0b3c3b710a)] - **test**: split test-esm-wasm.js (Joyee Cheung) [#60491](https://github.com/nodejs/node/pull/60491)
- \[[`a15b795b34`](https://github.com/nodejs/node/commit/a15b795b34)] - **test**: correct conditional secure heap flags test (Shelley Vohr) [#60385](https://github.com/nodejs/node/pull/60385)
- \[[`38b77b3a44`](https://github.com/nodejs/node/commit/38b77b3a44)] - **test**: fix flaky test-watch-mode-kill-signal-\* (Joyee Cheung) [#60443](https://github.com/nodejs/node/pull/60443)
- \[[`e8d7598057`](https://github.com/nodejs/node/commit/e8d7598057)] - **test**: capture stack trace in debugger timeout errors (Joyee Cheung) [#60457](https://github.com/nodejs/node/pull/60457)
- \[[`674befeb81`](https://github.com/nodejs/node/commit/674befeb81)] - **test**: ensure assertions are reachable in `test/sequential` (Antoine du Hamel) [#60412](https://github.com/nodejs/node/pull/60412)
- \[[`952c08a735`](https://github.com/nodejs/node/commit/952c08a735)] - **test**: ensure assertions are reachable in more folders (Antoine du Hamel) [#60411](https://github.com/nodejs/node/pull/60411)
- \[[`bbca57584b`](https://github.com/nodejs/node/commit/bbca57584b)] - **test**: split test-runner-watch-mode (Joyee Cheung) [#60391](https://github.com/nodejs/node/pull/60391)
- \[[`e78e0cf6e7`](https://github.com/nodejs/node/commit/e78e0cf6e7)] - **test**: move test-runner-watch-mode helper into common (Joyee Cheung) [#60391](https://github.com/nodejs/node/pull/60391)
- \[[`84576ef021`](https://github.com/nodejs/node/commit/84576ef021)] - **test**: ensure assertions are reachable in `test/addons` (Antoine du Hamel) [#60142](https://github.com/nodejs/node/pull/60142)
- \[[`1659078c11`](https://github.com/nodejs/node/commit/1659078c11)] - **test**: ignore EPIPE errors in https proxy invalid URL test (Joyee Cheung) [#60269](https://github.com/nodejs/node/pull/60269)
- \[[`79ffee80ec`](https://github.com/nodejs/node/commit/79ffee80ec)] - **test**: ensure assertions are reachable in `test/client-proxy` (Antoine du Hamel) [#60175](https://github.com/nodejs/node/pull/60175)
- \[[`e5a812243a`](https://github.com/nodejs/node/commit/e5a812243a)] - **test**: ensure assertions are reachable in `test/async-hooks` (Antoine du Hamel) [#60150](https://github.com/nodejs/node/pull/60150)
- \[[`e924fd72e3`](https://github.com/nodejs/node/commit/e924fd72e3)] - **test,crypto**: handle a few more BoringSSL tests (Shelley Vohr) [#59030](https://github.com/nodejs/node/pull/59030)
- \[[`a55ac11611`](https://github.com/nodejs/node/commit/a55ac11611)] - **test,crypto**: update x448 and ed448 expectation when on boringssl (Shelley Vohr) [#60387](https://github.com/nodejs/node/pull/60387)
- \[[`55d5e9ec73`](https://github.com/nodejs/node/commit/55d5e9ec73)] - **tls**: fix leak on invalid protocol method (Shelley Vohr) [#60427](https://github.com/nodejs/node/pull/60427)
- \[[`5763c96e7c`](https://github.com/nodejs/node/commit/5763c96e7c)] - **tools**: replace invalid expression in dependabot config (Riddhi) [#60649](https://github.com/nodejs/node/pull/60649)
- \[[`b6e21b47d7`](https://github.com/nodejs/node/commit/b6e21b47d7)] - **tools**: skip unaffected GHA jobs for changes in `test/internet` (Antoine du Hamel) [#60517](https://github.com/nodejs/node/pull/60517)
- \[[`999664c76d`](https://github.com/nodejs/node/commit/999664c76d)] - **tools**: do not use short hashes for deps versioning to avoid collision (Antoine du Hamel) [#60407](https://github.com/nodejs/node/pull/60407)
- \[[`ada856d0fb`](https://github.com/nodejs/node/commit/ada856d0fb)] - **tools**: only add test reporter args when node:test is used (Joyee Cheung) [#60551](https://github.com/nodejs/node/pull/60551)
- \[[`1812c56bb3`](https://github.com/nodejs/node/commit/1812c56bb3)] - **tools**: fix update-icu script (Michaël Zasso) [#60521](https://github.com/nodejs/node/pull/60521)
- \[[`747040438a`](https://github.com/nodejs/node/commit/747040438a)] - **tools**: fix linter for semver-major release proposals (Antoine du Hamel) [#60481](https://github.com/nodejs/node/pull/60481)
- \[[`f170551e40`](https://github.com/nodejs/node/commit/f170551e40)] - **tools**: fix failing release-proposal linter for LTS transitions (Antoine du Hamel) [#60465](https://github.com/nodejs/node/pull/60465)
- \[[`2db4ea0ce4`](https://github.com/nodejs/node/commit/2db4ea0ce4)] - **tools**: remove undici from daily wpt.fyi job (Filip Skokan) [#60444](https://github.com/nodejs/node/pull/60444)
- \[[`2a85aa4e7b`](https://github.com/nodejs/node/commit/2a85aa4e7b)] - **tools**: add lint rule to ensure assertions are reached (Antoine du Hamel) [#60125](https://github.com/nodejs/node/pull/60125)
- \[[`48299ef5fb`](https://github.com/nodejs/node/commit/48299ef5fb)] - **tools,doc**: update JavaScript primitive types to match MDN Web Docs (JustApple) [#60581](https://github.com/nodejs/node/pull/60581)
- \[[`7ec04cf936`](https://github.com/nodejs/node/commit/7ec04cf936)] - **util**: fix stylize of special properties in inspect (Ge Gao) [#60479](https://github.com/nodejs/node/pull/60479)
- \[[`05d7509bd2`](https://github.com/nodejs/node/commit/05d7509bd2)] - **(SEMVER-MINOR)** **v8**: add cpu profile (theanarkh) [#59807](https://github.com/nodejs/node/pull/59807)
- \[[`884fe884a1`](https://github.com/nodejs/node/commit/884fe884a1)] - **vm**: hint module identifier in instantiate errors (Chengzhong Wu) [#60199](https://github.com/nodejs/node/pull/60199)
- \[[`a2caf19f70`](https://github.com/nodejs/node/commit/a2caf19f70)] - **watch**: fix interaction with multiple env files (Marco Ippolito) [#60605](https://github.com/nodejs/node/pull/60605)

Windows 64-bit Installer: https://nodejs.org/dist/v24.12.0/node-v24.12.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.12.0/node-v24.12.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.12.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.12.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.12.0/node-v24.12.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.12.0/node-v24.12.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.12.0/node-v24.12.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.12.0/node-v24.12.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.12.0/node-v24.12.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.12.0/ \
Documentation: https://nodejs.org/docs/v24.12.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

31f3d065bb84f069e522e55d0d3035bd364cba5d8a22233ff68005d281e8bb78  node-v24.12.0-aix-ppc64.tar.gz
24b03834da0c49f8cf1f22dea7da8ccb65dc705c37a10c0622bfd839c904d6f2  node-v24.12.0-arm64.msi
319f221adc5e44ff0ed57e8a441b2284f02b8dc6fc87b8eb92a6a93643fd8080  node-v24.12.0-darwin-arm64.tar.gz
4db2a7842267d4d99e35284289b241c43465b08a28ece4fcb6a9460ce7e4c68c  node-v24.12.0-darwin-arm64.tar.xz
b82ea4c62fd08e250cab59d625e75d77cc5b0a3d60c6698ebee4545c88a169c5  node-v24.12.0-darwin-x64.tar.gz
1e4d54f706e0a3613d6415ffe2ccdfd4095d3483971dbbaa4ff909fac5fc211c  node-v24.12.0-darwin-x64.tar.xz
af120bedced0f62cf6506503347e165032b50274383e0dcc6d216c8d32260172  node-v24.12.0-headers.tar.gz
a432e8935507a98ec0fc4c93b48199e83b4bec5b8db7e0caedf058be0c5631bf  node-v24.12.0-headers.tar.xz
9b2a2eeb98a8eb37361224e2a1d060300ad2dd143af58dfdb16de785df0f1228  node-v24.12.0-linux-arm64.tar.gz
a06d42807fb500f7459e5f3fa6cb431447352826ee6f07e14adfeec58a1b3210  node-v24.12.0-linux-arm64.tar.xz
66ec79b4d64f4109aedf822108715d0b6097118df9159c2f6321477da4ea17aa  node-v24.12.0-linux-ppc64le.tar.gz
3a18221623530a35c35611786b33cedef8b84b5d4c683b01ba6341b15043bf97  node-v24.12.0-linux-ppc64le.tar.xz
8dc960a2555db1aa77fd131c25be571b9f7844bc8b278e78732b9f580fe7d580  node-v24.12.0-linux-s390x.tar.gz
b9038c2c6b51970cd09cc2bee81dd7e0fb7130823d940cec498c4686b204e4ed  node-v24.12.0-linux-s390x.tar.xz
6159227e0af7d7c3c6bb2fa900452b04a6cb8841a702a79acc613209d70b04d0  node-v24.12.0-linux-x64.tar.gz
bdebee276e58d0ef5448f3d5ac12c67daa963dd5e0a9bb621a53d1cefbc852fd  node-v24.12.0-linux-x64.tar.xz
b1659be3795c70073d72f5c3fb5834f080fec445a72e2f30a7796f65d6ba686c  node-v24.12.0.pkg
ad24a1f29e55c9539228f2c51a032da279188b681c4dc019cced7f82a0fcdd8d  node-v24.12.0.tar.gz
6d3e891a016b90f6c6a19ea5cbc9c90c57eef9198670ba93f04fa82af02574ae  node-v24.12.0.tar.xz
52f6d601c145f886434ed42533626571b388d3ad8d98dad16c310bc09a7ed86e  node-v24.12.0-win-arm64.7z
b05e7e066f813d35ad3cd9c24eedaee074c012ac7e00071297608fdd2e948ae3  node-v24.12.0-win-arm64.zip
8d41356abf5cb62404f311f131b7937f45aaeda5c15d060dc281c2ece817cdce  node-v24.12.0-win-x64.7z
9c125f61ae947b52e779095830f9cac267846a043ef7192183c84016aaad2812  node-v24.12.0-win-x64.zip
e3a50a907b6c71d9f3cb7571980cf3070ec0fadc6fb2a55516d5ff95083990f3  node-v24.12.0-x64.msi
986eb1e1d19222f7df4798df657bcc114c41c0d11b8344f03a1bf55a20772efc  win-arm64/node.exe
afef88b389be8ac30974d2cf69de26001f95f1e9efe1811f2e8467c4cdfe05d0  win-arm64/node.lib
74b1851395227ee43a7eb08cc98928234a835c23e9652508637e9cba9ada2b1e  win-arm64/node_pdb.7z
3de5ee60cc482a316aae5ee19ecc9cb78b382b3b1b6b5ab794e0b8b7f905aa67  win-arm64/node_pdb.zip
2ffe3acc0458fdde999f50d11809bbe7c9b7ef204dcf17094e325d26ace101d8  win-x64/node.exe
be205f2934c17fbd56ce6cdfcfbeb2f6a85061d5141e7a58eba240a8477a12fd  win-x64/node.lib
f39ab85c97d4df4822e5b38000120daffbf3ffcb35f291d1472a96eac1f3e70b  win-x64/node_pdb.7z
44e003eba00abbcc93554169979aa466dc78e70bdb6c1bde8552a2b5ca463853  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQSGyNdGQuZ4RvjhIChNqoDR5ze8nwUCaTmjiQAKCRBNqoDR5ze8
n7BQAQCogq7g1amRbEYtWTeHg4aRCiOch9E1VAc2+xK0AP9SUwEA7ZNu7wtzdEF8
pIek2NZttJimx5IYGNVUVGxoZr7cug8=
=FCYb
-----END PGP SIGNATURE-----
```
