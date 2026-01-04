---
date: '2025-05-21T15:31:48.705Z'
category: release
title: Node.js 22.16.0 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-05-21, Version 22.16.0 'Jod' (LTS), @aduh95

### Notable Changes

- \[[`c3ceaebb7a`](https://github.com/nodejs/node/commit/c3ceaebb7a)] - **deps**: update timezone to 2025b (Node.js GitHub Bot) [#57857](https://github.com/nodejs/node/pull/57857)
- \[[`5059a746ec`](https://github.com/nodejs/node/commit/5059a746ec)] - **doc**: add dario-piotrowicz to collaborators (Dario Piotrowicz) [#58102](https://github.com/nodejs/node/pull/58102)
- \[[`c8ceaaf397`](https://github.com/nodejs/node/commit/c8ceaaf397)] - **(SEMVER-MINOR)** **doc**: graduate multiple experimental apis (James M Snell) [#57765](https://github.com/nodejs/node/pull/57765)
- \[[`e21b37d9df`](https://github.com/nodejs/node/commit/e21b37d9df)] - **(SEMVER-MINOR)** **esm**: graduate import.meta properties (James M Snell) [#58011](https://github.com/nodejs/node/pull/58011)
- \[[`832640c35e`](https://github.com/nodejs/node/commit/832640c35e)] - **(SEMVER-MINOR)** **esm**: support top-level Wasm without package type (Guy Bedford) [#57610](https://github.com/nodejs/node/pull/57610)
- \[[`c510391d2f`](https://github.com/nodejs/node/commit/c510391d2f)] - **(SEMVER-MINOR)** **sqlite**: add StatementSync.prototype.columns() (Colin Ihrig) [#57490](https://github.com/nodejs/node/pull/57490)
- \[[`5d1230bec0`](https://github.com/nodejs/node/commit/5d1230bec0)] - **(SEMVER-MINOR)** **src**: set default config as `node.config.json` (Marco Ippolito) [#57171](https://github.com/nodejs/node/pull/57171)
- \[[`30bb1ccbb0`](https://github.com/nodejs/node/commit/30bb1ccbb0)] - **(SEMVER-MINOR)** **src**: create `THROW_ERR_OPTIONS_BEFORE_BOOTSTRAPPING` (Marco Ippolito) [#57016](https://github.com/nodejs/node/pull/57016)
- \[[`0350c6f478`](https://github.com/nodejs/node/commit/0350c6f478)] - **(SEMVER-MINOR)** **src**: add config file support (Marco Ippolito) [#57016](https://github.com/nodejs/node/pull/57016)
- \[[`e1d3a9e192`](https://github.com/nodejs/node/commit/e1d3a9e192)] - **(SEMVER-MINOR)** **src**: add ExecutionAsyncId getter for any Context (Attila Szegedi) [#57820](https://github.com/nodejs/node/pull/57820)
- \[[`0ec912f452`](https://github.com/nodejs/node/commit/0ec912f452)] - **(SEMVER-MINOR)** **stream**: preserve AsyncLocalStorage context in finished() (Gürgün Dayıoğlu) [#57865](https://github.com/nodejs/node/pull/57865)
- \[[`43490c8797`](https://github.com/nodejs/node/commit/43490c8797)] - **(SEMVER-MINOR)** **util**: add `types.isFloat16Array()` (Livia Medeiros) [#57879](https://github.com/nodejs/node/pull/57879)
- \[[`dda6ca9172`](https://github.com/nodejs/node/commit/dda6ca9172)] - **(SEMVER-MINOR)** **worker**: add worker.getHeapStatistics() (Matteo Collina) [#57888](https://github.com/nodejs/node/pull/57888)

### Commits

- \[[`4252dc798c`](https://github.com/nodejs/node/commit/4252dc798c)] - **assert**: support `Float16Array` in loose deep equality checks (Livia Medeiros) [#57881](https://github.com/nodejs/node/pull/57881)
- \[[`1c7396b078`](https://github.com/nodejs/node/commit/1c7396b078)] - **assert,util**: fix constructor lookup in deep equal comparison (Ruben Bridgewater) [#57876](https://github.com/nodejs/node/pull/57876)
- \[[`1ded5f25c8`](https://github.com/nodejs/node/commit/1ded5f25c8)] - **assert,util**: improve deep object comparison performance (Ruben Bridgewater) [#57648](https://github.com/nodejs/node/pull/57648)
- \[[`696b5f85ca`](https://github.com/nodejs/node/commit/696b5f85ca)] - **assert,util**: improve unequal number comparison performance (Ruben Bridgewater) [#57619](https://github.com/nodejs/node/pull/57619)
- \[[`775ee4d40f`](https://github.com/nodejs/node/commit/775ee4d40f)] - **assert,util**: improve array comparison (Ruben Bridgewater) [#57619](https://github.com/nodejs/node/pull/57619)
- \[[`3766992ba4`](https://github.com/nodejs/node/commit/3766992ba4)] - **benchmark**: add sqlite prepare select get (Vinícius Lourenço) [#58040](https://github.com/nodejs/node/pull/58040)
- \[[`8390276be3`](https://github.com/nodejs/node/commit/8390276be3)] - **benchmark**: add sqlite prepare select all (Vinícius Lourenço) [#58040](https://github.com/nodejs/node/pull/58040)
- \[[`6a9b79e5c1`](https://github.com/nodejs/node/commit/6a9b79e5c1)] - **benchmark**: add sqlite is transaction (Vinícius Lourenço) [#58040](https://github.com/nodejs/node/pull/58040)
- \[[`f689f98344`](https://github.com/nodejs/node/commit/f689f98344)] - **benchmark**: add sqlite prepare insert (Vinícius Lourenço) [#58040](https://github.com/nodejs/node/pull/58040)
- \[[`14a82804d7`](https://github.com/nodejs/node/commit/14a82804d7)] - **benchmark**: disambiguate `filename` and `dirname` read perf (Antoine du Hamel) [#58056](https://github.com/nodejs/node/pull/58056)
- \[[`e7e8256d35`](https://github.com/nodejs/node/commit/e7e8256d35)] - **buffer**: avoid creating unnecessary environment (Yagiz Nizipli) [#58053](https://github.com/nodejs/node/pull/58053)
- \[[`d7d8e8e994`](https://github.com/nodejs/node/commit/d7d8e8e994)] - **buffer**: define global v8::CFunction objects as const (Mert Can Altin) [#57676](https://github.com/nodejs/node/pull/57676)
- \[[`f37633e85a`](https://github.com/nodejs/node/commit/f37633e85a)] - **build**: use `$(BUILDTYPE)` when cleaning coverage files (Aviv Keller) [#57995](https://github.com/nodejs/node/pull/57995)
- \[[`e5bf67fe77`](https://github.com/nodejs/node/commit/e5bf67fe77)] - **build**: define python when generating `out/Makefile` (Aviv Keller) [#57970](https://github.com/nodejs/node/pull/57970)
- \[[`718f874ae0`](https://github.com/nodejs/node/commit/718f874ae0)] - **build**: fix zstd libname (Antoine du Hamel) [#57999](https://github.com/nodejs/node/pull/57999)
- \[[`53c5fdcae1`](https://github.com/nodejs/node/commit/53c5fdcae1)] - **crypto**: fix cross-realm `SharedArrayBuffer` validation (Antoine du Hamel) [#57974](https://github.com/nodejs/node/pull/57974)
- \[[`78f4ffee5d`](https://github.com/nodejs/node/commit/78f4ffee5d)] - **crypto**: fix cross-realm check of `ArrayBuffer` (Felipe Forbeck) [#57828](https://github.com/nodejs/node/pull/57828)
- \[[`f606352b63`](https://github.com/nodejs/node/commit/f606352b63)] - **crypto**: forbid passing `Float16Array` to `getRandomValues()` (Livia Medeiros) [#57880](https://github.com/nodejs/node/pull/57880)
- \[[`23c4e941c2`](https://github.com/nodejs/node/commit/23c4e941c2)] - **crypto**: remove BoringSSL dh-primes addition (Shelley Vohr) [#57023](https://github.com/nodejs/node/pull/57023)
- \[[`8339d9bc14`](https://github.com/nodejs/node/commit/8339d9bc14)] - **deps**: V8: cherry-pick f915fa4c9f41 (Chengzhong Wu) [#55484](https://github.com/nodejs/node/pull/55484)
- \[[`c2111dd126`](https://github.com/nodejs/node/commit/c2111dd126)] - **deps**: V8: backport e5dbbbadcbff (Darshan Sen) [#58120](https://github.com/nodejs/node/pull/58120)
- \[[`4cc49be951`](https://github.com/nodejs/node/commit/4cc49be951)] - **deps**: update zstd to 1.5.7 (Node.js GitHub Bot) [#57940](https://github.com/nodejs/node/pull/57940)
- \[[`c956d37c84`](https://github.com/nodejs/node/commit/c956d37c84)] - **deps**: update zlib to 1.3.0.1-motley-780819f (Node.js GitHub Bot) [#57768](https://github.com/nodejs/node/pull/57768)
- \[[`c3ceaebb7a`](https://github.com/nodejs/node/commit/c3ceaebb7a)] - **deps**: update timezone to 2025b (Node.js GitHub Bot) [#57857](https://github.com/nodejs/node/pull/57857)
- \[[`b5cd0eb590`](https://github.com/nodejs/node/commit/b5cd0eb590)] - **deps**: update simdutf to 6.4.2 (Node.js GitHub Bot) [#57855](https://github.com/nodejs/node/pull/57855)
- \[[`3eb6b814e9`](https://github.com/nodejs/node/commit/3eb6b814e9)] - **deps**: update simdutf to 6.4.0 (Node.js GitHub Bot) [#56764](https://github.com/nodejs/node/pull/56764)
- \[[`0be9fa3218`](https://github.com/nodejs/node/commit/0be9fa3218)] - **deps**: update icu to 77.1 (Node.js GitHub Bot) [#57455](https://github.com/nodejs/node/pull/57455)
- \[[`d5cf4254fb`](https://github.com/nodejs/node/commit/d5cf4254fb)] - **doc**: add HBSPS as triager (Wiyeong Seo) [#57980](https://github.com/nodejs/node/pull/57980)
- \[[`ad0861dba0`](https://github.com/nodejs/node/commit/ad0861dba0)] - **doc**: add ambassaor message (Brian Muenzenmeyer) [#57600](https://github.com/nodejs/node/pull/57600)
- \[[`0d3ec1aafe`](https://github.com/nodejs/node/commit/0d3ec1aafe)] - **doc**: fix misaligned options in vm.compileFunction() (Jimmy Leung) [#58145](https://github.com/nodejs/node/pull/58145)
- \[[`1f70baf3b0`](https://github.com/nodejs/node/commit/1f70baf3b0)] - **doc**: add missing options.signal to readlinePromises.createInterface() (Jimmy Leung) [#55456](https://github.com/nodejs/node/pull/55456)
- \[[`ec6a48621f`](https://github.com/nodejs/node/commit/ec6a48621f)] - **doc**: fix typo of file `zlib.md` (yusheng chen) [#58093](https://github.com/nodejs/node/pull/58093)
- \[[`37e360e386`](https://github.com/nodejs/node/commit/37e360e386)] - **doc**: make stability labels more consistent (Antoine du Hamel) [#57516](https://github.com/nodejs/node/pull/57516)
- \[[`2b5d63d36e`](https://github.com/nodejs/node/commit/2b5d63d36e)] - **doc**: allow the $schema property in node.config.json (Remco Haszing) [#57560](https://github.com/nodejs/node/pull/57560)
- \[[`a2063638e2`](https://github.com/nodejs/node/commit/a2063638e2)] - **doc**: fix `AsyncLocalStorage` example response changes after node v18 (Naor Tedgi (Abu Emma)) [#57969](https://github.com/nodejs/node/pull/57969)
- \[[`474c2b14c3`](https://github.com/nodejs/node/commit/474c2b14c3)] - **doc**: mark Node.js 18 as End-of-Life (Richard Lau) [#58084](https://github.com/nodejs/node/pull/58084)
- \[[`5059a746ec`](https://github.com/nodejs/node/commit/5059a746ec)] - **doc**: add dario-piotrowicz to collaborators (Dario Piotrowicz) [#58102](https://github.com/nodejs/node/pull/58102)
- \[[`1eec170fc3`](https://github.com/nodejs/node/commit/1eec170fc3)] - **doc**: fix formatting of `import.meta.filename` section (Antoine du Hamel) [#58079](https://github.com/nodejs/node/pull/58079)
- \[[`7f108de525`](https://github.com/nodejs/node/commit/7f108de525)] - **doc**: fix env variable name in `util.styleText` (Antoine du Hamel) [#58072](https://github.com/nodejs/node/pull/58072)
- \[[`54b3f7fffc`](https://github.com/nodejs/node/commit/54b3f7fffc)] - **doc**: add returns for https.get (Eng Zer Jun) [#58025](https://github.com/nodejs/node/pull/58025)
- \[[`66f2c605a8`](https://github.com/nodejs/node/commit/66f2c605a8)] - **doc**: fix typo in `buffer.md` (chocolateboy) [#58052](https://github.com/nodejs/node/pull/58052)
- \[[`b0256dd42b`](https://github.com/nodejs/node/commit/b0256dd42b)] - **doc**: correct deprecation type of `assert.CallTracker` (René) [#57997](https://github.com/nodejs/node/pull/57997)
- \[[`581439c9e6`](https://github.com/nodejs/node/commit/581439c9e6)] - **doc**: mark devtools integration section as active development (Chengzhong Wu) [#57886](https://github.com/nodejs/node/pull/57886)
- \[[`a2a2a2f027`](https://github.com/nodejs/node/commit/a2a2a2f027)] - **doc**: fix typo in `module.md` (Alex Schwartz) [#57889](https://github.com/nodejs/node/pull/57889)
- \[[`c0ec4e2935`](https://github.com/nodejs/node/commit/c0ec4e2935)] - **doc**: increase z-index of header element (Dario Piotrowicz) [#57851](https://github.com/nodejs/node/pull/57851)
- \[[`93d19ec6cd`](https://github.com/nodejs/node/commit/93d19ec6cd)] - **doc**: add missing TS formats for `load` hooks (Antoine du Hamel) [#57837](https://github.com/nodejs/node/pull/57837)
- \[[`f5ea06c61f`](https://github.com/nodejs/node/commit/f5ea06c61f)] - **doc**: clarify the multi REPL example (Dario Piotrowicz) [#57759](https://github.com/nodejs/node/pull/57759)
- \[[`80c4fe1b70`](https://github.com/nodejs/node/commit/80c4fe1b70)] - **doc**: fix deprecation type for `DEP0148` (Livia Medeiros) [#57785](https://github.com/nodejs/node/pull/57785)
- \[[`01cad99da0`](https://github.com/nodejs/node/commit/01cad99da0)] - **doc**: list DOMException as a potential error raised by Node.js (Chengzhong Wu) [#57783](https://github.com/nodejs/node/pull/57783)
- \[[`a08b714a46`](https://github.com/nodejs/node/commit/a08b714a46)] - **doc**: add missing v0.x changelog entries (Antoine du Hamel) [#57779](https://github.com/nodejs/node/pull/57779)
- \[[`d0b48350fd`](https://github.com/nodejs/node/commit/d0b48350fd)] - **doc**: fix typo in writing-docs (Sebastian Beltran) [#57776](https://github.com/nodejs/node/pull/57776)
- \[[`bde3725f8b`](https://github.com/nodejs/node/commit/bde3725f8b)] - **doc**: clarify examples section in REPL doc (Dario Piotrowicz) [#57762](https://github.com/nodejs/node/pull/57762)
- \[[`c8ceaaf397`](https://github.com/nodejs/node/commit/c8ceaaf397)] - **(SEMVER-MINOR)** **doc**: graduate multiple experimental apis (James M Snell) [#57765](https://github.com/nodejs/node/pull/57765)
- \[[`92428c2609`](https://github.com/nodejs/node/commit/92428c2609)] - **doc**: explicitly state that corepack will be removed in v25+ (Trivikram Kamat) [#57747](https://github.com/nodejs/node/pull/57747)
- \[[`298969e1dd`](https://github.com/nodejs/node/commit/298969e1dd)] - **doc**: update position type to integer | null in fs (Yukihiro Hasegawa) [#57745](https://github.com/nodejs/node/pull/57745)
- \[[`a9d28e27c9`](https://github.com/nodejs/node/commit/a9d28e27c9)] - **doc**: update CI instructions (Antoine du Hamel) [#57743](https://github.com/nodejs/node/pull/57743)
- \[[`133d2878a1`](https://github.com/nodejs/node/commit/133d2878a1)] - **doc**: update example of using `await` in REPL (Dario Piotrowicz) [#57653](https://github.com/nodejs/node/pull/57653)
- \[[`fc5f126629`](https://github.com/nodejs/node/commit/fc5f126629)] - **doc**: add back mention of visa fees to onboarding doc (Darshan Sen) [#57730](https://github.com/nodejs/node/pull/57730)
- \[[`945f4ac538`](https://github.com/nodejs/node/commit/945f4ac538)] - **doc**: process.execve is only unavailable for Windows (Yaksh Bariya) [#57726](https://github.com/nodejs/node/pull/57726)
- \[[`f3b885bb5e`](https://github.com/nodejs/node/commit/f3b885bb5e)] - **doc**: clarify `unhandledRejection` events behaviors in process doc (Dario Piotrowicz) [#57654](https://github.com/nodejs/node/pull/57654)
- \[[`7326dda5b0`](https://github.com/nodejs/node/commit/7326dda5b0)] - **doc**: improved fetch docs (Alessandro Miliucci) [#57296](https://github.com/nodejs/node/pull/57296)
- \[[`6906c5eb1f`](https://github.com/nodejs/node/commit/6906c5eb1f)] - **doc**: document REPL custom eval arguments (Dario Piotrowicz) [#57690](https://github.com/nodejs/node/pull/57690)
- \[[`47a7564e8f`](https://github.com/nodejs/node/commit/47a7564e8f)] - **doc**: classify Chrome DevTools Protocol as tier 2 (Chengzhong Wu) [#57634](https://github.com/nodejs/node/pull/57634)
- \[[`e274cc1310`](https://github.com/nodejs/node/commit/e274cc1310)] - **doc**: replace NOTE that does not render properly (Colin Ihrig) [#57484](https://github.com/nodejs/node/pull/57484)
- \[[`bef06b11df`](https://github.com/nodejs/node/commit/bef06b11df)] - **esm**: avoid `import.meta` setup costs for unused properties (Antoine du Hamel) [#57286](https://github.com/nodejs/node/pull/57286)
- \[[`e21b37d9df`](https://github.com/nodejs/node/commit/e21b37d9df)] - **(SEMVER-MINOR)** **esm**: graduate import.meta properties (James M Snell) [#58011](https://github.com/nodejs/node/pull/58011)
- \[[`832640c35e`](https://github.com/nodejs/node/commit/832640c35e)] - **(SEMVER-MINOR)** **esm**: support top-level Wasm without package type (Guy Bedford) [#57610](https://github.com/nodejs/node/pull/57610)
- \[[`8f643471ef`](https://github.com/nodejs/node/commit/8f643471ef)] - **fs**: improve globSync performance (Rich Trott) [#57725](https://github.com/nodejs/node/pull/57725)
- \[[`bf9e17ecc6`](https://github.com/nodejs/node/commit/bf9e17ecc6)] - **http2**: use args.This() instead of args.Holder() (Joyee Cheung) [#58004](https://github.com/nodejs/node/pull/58004)
- \[[`137717354f`](https://github.com/nodejs/node/commit/137717354f)] - **http2**: fix graceful session close (Kushagra Pandey) [#57808](https://github.com/nodejs/node/pull/57808)
- \[[`9baf580269`](https://github.com/nodejs/node/commit/9baf580269)] - **http2**: fix check for `frame->hd.type` (hanguanqiang) [#57644](https://github.com/nodejs/node/pull/57644)
- \[[`b8189242b2`](https://github.com/nodejs/node/commit/b8189242b2)] - **http2**: skip writeHead if stream is closed (Shima Ryuhei) [#57686](https://github.com/nodejs/node/pull/57686)
- \[[`4e02a1650a`](https://github.com/nodejs/node/commit/4e02a1650a)] - **lib**: remove unused file `fetch_module` (Michaël Zasso) [#55880](https://github.com/nodejs/node/pull/55880)
- \[[`d9700fef26`](https://github.com/nodejs/node/commit/d9700fef26)] - **lib**: avoid StackOverflow on `serializeError` (Chengzhong Wu) [#58075](https://github.com/nodejs/node/pull/58075)
- \[[`f3a16b6d9c`](https://github.com/nodejs/node/commit/f3a16b6d9c)] - **lib**: resolve the issue of not adhering to the specified buffer size (0hm☘️🏳️‍⚧️) [#55896](https://github.com/nodejs/node/pull/55896)
- \[[`d4fc282f73`](https://github.com/nodejs/node/commit/d4fc282f73)] - **lib**: fix AbortSignal.any() with timeout signals (Gürgün Dayıoğlu) [#57867](https://github.com/nodejs/node/pull/57867)
- \[[`f7e2902861`](https://github.com/nodejs/node/commit/f7e2902861)] - **lib**: use Map primordial for ActiveAsyncContextFrame (Gürgün Dayıoğlu) [#57670](https://github.com/nodejs/node/pull/57670)
- \[[`8652b0e168`](https://github.com/nodejs/node/commit/8652b0e168)] - **meta**: set nodejs/config as codeowner (Marco Ippolito) [#57237](https://github.com/nodejs/node/pull/57237)
- \[[`e98504ed95`](https://github.com/nodejs/node/commit/e98504ed95)] - **meta**: allow penetration testing on live system with prior authorization (Matteo Collina) [#57966](https://github.com/nodejs/node/pull/57966)
- \[[`340731bea0`](https://github.com/nodejs/node/commit/340731bea0)] - **meta**: fix subsystem in commit title (Luigi Pinca) [#57945](https://github.com/nodejs/node/pull/57945)
- \[[`d767cbffcf`](https://github.com/nodejs/node/commit/d767cbffcf)] - **meta**: bump Mozilla-Actions/sccache-action from 0.0.8 to 0.0.9 (dependabot\[bot]) [#57720](https://github.com/nodejs/node/pull/57720)
- \[[`575f904b13`](https://github.com/nodejs/node/commit/575f904b13)] - **meta**: bump actions/download-artifact from 4.1.9 to 4.2.1 (dependabot\[bot]) [#57719](https://github.com/nodejs/node/pull/57719)
- \[[`acd323c069`](https://github.com/nodejs/node/commit/acd323c069)] - **meta**: bump actions/setup-python from 5.4.0 to 5.5.0 (dependabot\[bot]) [#57718](https://github.com/nodejs/node/pull/57718)
- \[[`21246fec20`](https://github.com/nodejs/node/commit/21246fec20)] - **meta**: bump peter-evans/create-pull-request from 7.0.7 to 7.0.8 (dependabot\[bot]) [#57717](https://github.com/nodejs/node/pull/57717)
- \[[`97f32d5849`](https://github.com/nodejs/node/commit/97f32d5849)] - **meta**: bump github/codeql-action from 3.28.10 to 3.28.13 (dependabot\[bot]) [#57716](https://github.com/nodejs/node/pull/57716)
- \[[`90ddbb8cfa`](https://github.com/nodejs/node/commit/90ddbb8cfa)] - **meta**: bump actions/cache from 4.2.2 to 4.2.3 (dependabot\[bot]) [#57715](https://github.com/nodejs/node/pull/57715)
- \[[`728425d03e`](https://github.com/nodejs/node/commit/728425d03e)] - **meta**: bump actions/setup-node from 4.2.0 to 4.3.0 (dependabot\[bot]) [#57714](https://github.com/nodejs/node/pull/57714)
- \[[`1f799140e0`](https://github.com/nodejs/node/commit/1f799140e0)] - **meta**: bump actions/upload-artifact from 4.6.1 to 4.6.2 (dependabot\[bot]) [#57713](https://github.com/nodejs/node/pull/57713)
- \[[`021b174a1f`](https://github.com/nodejs/node/commit/021b174a1f)] - **module**: tidy code string concat → string templates (Jacob Smith) [#55820](https://github.com/nodejs/node/pull/55820)
- \[[`44c5718476`](https://github.com/nodejs/node/commit/44c5718476)] - **module**: fix incorrect formatting in require(esm) cycle error message (haykam821) [#57453](https://github.com/nodejs/node/pull/57453)
- \[[`bb09b4d4ae`](https://github.com/nodejs/node/commit/bb09b4d4ae)] - **module**: improve `getPackageType` performance (Dario Piotrowicz) [#57599](https://github.com/nodejs/node/pull/57599)
- \[[`9e6054e715`](https://github.com/nodejs/node/commit/9e6054e715)] - **module**: remove unnecessary `readPackage` function (Dario Piotrowicz) [#57596](https://github.com/nodejs/node/pull/57596)
- \[[`4a8db273ba`](https://github.com/nodejs/node/commit/4a8db273ba)] - **node-api**: add nested object wrap and napi_ref test (Chengzhong Wu) [#57981](https://github.com/nodejs/node/pull/57981)
- \[[`3c65058f20`](https://github.com/nodejs/node/commit/3c65058f20)] - **node-api**: convert NewEnv to node_napi_env\_\_::New (Vladimir Morozov) [#57834](https://github.com/nodejs/node/pull/57834)
- \[[`a4105db1f7`](https://github.com/nodejs/node/commit/a4105db1f7)] - **os**: fix netmask format check condition in getCIDR function (Wiyeong Seo) [#57324](https://github.com/nodejs/node/pull/57324)
- \[[`248c938139`](https://github.com/nodejs/node/commit/248c938139)] - **process**: disable building execve on IBM i (Abdirahim Musse) [#57883](https://github.com/nodejs/node/pull/57883)
- \[[`972275697a`](https://github.com/nodejs/node/commit/972275697a)] - **repl**: deprecate `repl.builtinModules` (Dario Piotrowicz) [#57508](https://github.com/nodejs/node/pull/57508)
- \[[`7485309d7e`](https://github.com/nodejs/node/commit/7485309d7e)] - **sqlite**: add location method (Edy Silva) [#57860](https://github.com/nodejs/node/pull/57860)
- \[[`c12cd2a190`](https://github.com/nodejs/node/commit/c12cd2a190)] - **sqlite**: add timeout options to DatabaseSync (Edy Silva) [#57752](https://github.com/nodejs/node/pull/57752)
- \[[`5e0503a967`](https://github.com/nodejs/node/commit/5e0503a967)] - **sqlite**: add setReturnArrays method to StatementSync (Gürgün Dayıoğlu) [#57542](https://github.com/nodejs/node/pull/57542)
- \[[`ed9d2fd51a`](https://github.com/nodejs/node/commit/ed9d2fd51a)] - **sqlite**: enable common flags (Edy Silva) [#57621](https://github.com/nodejs/node/pull/57621)
- \[[`06dcb318bc`](https://github.com/nodejs/node/commit/06dcb318bc)] - **sqlite**: refactor prepared statement iterator (Colin Ihrig) [#57569](https://github.com/nodejs/node/pull/57569)
- \[[`c510391d2f`](https://github.com/nodejs/node/commit/c510391d2f)] - **(SEMVER-MINOR)** **sqlite**: add StatementSync.prototype.columns() (Colin Ihrig) [#57490](https://github.com/nodejs/node/pull/57490)
- \[[`4e24456a1a`](https://github.com/nodejs/node/commit/4e24456a1a)] - **sqlite**: reset statement immediately in run() (Colin Ihrig) [#57350](https://github.com/nodejs/node/pull/57350)
- \[[`a9a6891b0b`](https://github.com/nodejs/node/commit/a9a6891b0b)] - **sqlite**: fix coverity warnings related to backup() (Colin Ihrig) [#56961](https://github.com/nodejs/node/pull/56961)
- \[[`d2e1bcf3d4`](https://github.com/nodejs/node/commit/d2e1bcf3d4)] - **sqlite**: fix use-after-free in StatementSync due to premature GC (Divy Srivastava) [#56840](https://github.com/nodejs/node/pull/56840)
- \[[`cfe15ca7b4`](https://github.com/nodejs/node/commit/cfe15ca7b4)] - **sqlite**: handle conflicting SQLite and JS errors (Colin Ihrig) [#56787](https://github.com/nodejs/node/pull/56787)
- \[[`0e999eb65f`](https://github.com/nodejs/node/commit/0e999eb65f)] - **sqlite**: add getter to detect transactions (Colin Ihrig) [#57925](https://github.com/nodejs/node/pull/57925)
- \[[`20b27331c0`](https://github.com/nodejs/node/commit/20b27331c0)] - **sqlite, test**: expose sqlite online backup api (Edy Silva) [#56253](https://github.com/nodejs/node/pull/56253)
- \[[`8856712171`](https://github.com/nodejs/node/commit/8856712171)] - **sqlite,doc,test**: add aggregate function (Edy Silva) [#56600](https://github.com/nodejs/node/pull/56600)
- \[[`120050db97`](https://github.com/nodejs/node/commit/120050db97)] - **sqlite,src**: refactor sqlite value conversion (Edy Silva) [#57571](https://github.com/nodejs/node/pull/57571)
- \[[`4c5555d558`](https://github.com/nodejs/node/commit/4c5555d558)] - **src**: initialize privateSymbols for per_context (Jason Zhang) [#57479](https://github.com/nodejs/node/pull/57479)
- \[[`d2ce9023b1`](https://github.com/nodejs/node/commit/d2ce9023b1)] - **src**: ensure primordials are initialized exactly once (Chengzhong Wu) [#57519](https://github.com/nodejs/node/pull/57519)
- \[[`06179be6ca`](https://github.com/nodejs/node/commit/06179be6ca)] - **src**: disable abseil deadlock detection (Chengzhong Wu) [#57582](https://github.com/nodejs/node/pull/57582)
- \[[`5121c47990`](https://github.com/nodejs/node/commit/5121c47990)] - **src**: fix node_config_file.h compilation error in GN build (Cheng) [#57210](https://github.com/nodejs/node/pull/57210)
- \[[`5d1230bec0`](https://github.com/nodejs/node/commit/5d1230bec0)] - **(SEMVER-MINOR)** **src**: set default config as `node.config.json` (Marco Ippolito) [#57171](https://github.com/nodejs/node/pull/57171)
- \[[`ccee741c43`](https://github.com/nodejs/node/commit/ccee741c43)] - **src**: namespace config file flags (Marco Ippolito) [#57170](https://github.com/nodejs/node/pull/57170)
- \[[`30bb1ccbb0`](https://github.com/nodejs/node/commit/30bb1ccbb0)] - **(SEMVER-MINOR)** **src**: create `THROW_ERR_OPTIONS_BEFORE_BOOTSTRAPPING` (Marco Ippolito) [#57016](https://github.com/nodejs/node/pull/57016)
- \[[`0350c6f478`](https://github.com/nodejs/node/commit/0350c6f478)] - **(SEMVER-MINOR)** **src**: add config file support (Marco Ippolito) [#57016](https://github.com/nodejs/node/pull/57016)
- \[[`eef37d00cb`](https://github.com/nodejs/node/commit/eef37d00cb)] - **src**: add more debug logs and comments in NodePlatform (Joyee Cheung) [#58047](https://github.com/nodejs/node/pull/58047)
- \[[`678e8f57c0`](https://github.com/nodejs/node/commit/678e8f57c0)] - **src**: add dcheck_eq for Object::New constructor calls (Jonas) [#57943](https://github.com/nodejs/node/pull/57943)
- \[[`aee45e2036`](https://github.com/nodejs/node/commit/aee45e2036)] - **src**: move windows specific fns to `_WIN32` (Yagiz Nizipli) [#57951](https://github.com/nodejs/node/pull/57951)
- \[[`6206a8edbc`](https://github.com/nodejs/node/commit/6206a8edbc)] - **src**: improve thread safety of TaskQueue (Shelley Vohr) [#57910](https://github.com/nodejs/node/pull/57910)
- \[[`03936f31c1`](https://github.com/nodejs/node/commit/03936f31c1)] - **src**: fixup errorhandling more in various places (James M Snell) [#57852](https://github.com/nodejs/node/pull/57852)
- \[[`010dd91a19`](https://github.com/nodejs/node/commit/010dd91a19)] - **src**: fix typo in comments (Edy Silva) [#57868](https://github.com/nodejs/node/pull/57868)
- \[[`e00c1ecbd2`](https://github.com/nodejs/node/commit/e00c1ecbd2)] - **src**: add BaseObjectPtr nullptr operations (Chengzhong Wu) [#56585](https://github.com/nodejs/node/pull/56585)
- \[[`648ad252e1`](https://github.com/nodejs/node/commit/648ad252e1)] - **src**: remove `void*` -> `char*` -> `void*` casts (Tobias Nießen) [#57791](https://github.com/nodejs/node/pull/57791)
- \[[`680b434a62`](https://github.com/nodejs/node/commit/680b434a62)] - **src**: improve error handing in node_messaging (James M Snell) [#57760](https://github.com/nodejs/node/pull/57760)
- \[[`18f5301747`](https://github.com/nodejs/node/commit/18f5301747)] - **src**: remove unused detachArrayBuffer method (Yagiz Nizipli) [#58055](https://github.com/nodejs/node/pull/58055)
- \[[`065e8cd670`](https://github.com/nodejs/node/commit/065e8cd670)] - **src**: use macros to reduce code duplication is cares_wrap (James M Snell) [#57937](https://github.com/nodejs/node/pull/57937)
- \[[`39af5d678f`](https://github.com/nodejs/node/commit/39af5d678f)] - **src**: improve error handling in cares_wrap (James M Snell) [#57937](https://github.com/nodejs/node/pull/57937)
- \[[`ca020fdc4e`](https://github.com/nodejs/node/commit/ca020fdc4e)] - **src**: fix -Wunreachable-code-return in node_sea (Shelley Vohr) [#57664](https://github.com/nodejs/node/pull/57664)
- \[[`32b6e7094a`](https://github.com/nodejs/node/commit/32b6e7094a)] - **src**: change DCHECK to CHECK (Wuli Zuo) [#57948](https://github.com/nodejs/node/pull/57948)
- \[[`e1d3a9e192`](https://github.com/nodejs/node/commit/e1d3a9e192)] - **(SEMVER-MINOR)** **src**: add ExecutionAsyncId getter for any Context (Attila Szegedi) [#57820](https://github.com/nodejs/node/pull/57820)
- \[[`96243a723a`](https://github.com/nodejs/node/commit/96243a723a)] - **src**: update std::vector\<v8::Local\<T>> to use v8::LocalVector\<T> (Aditi) [#57646](https://github.com/nodejs/node/pull/57646)
- \[[`0f2cbc17c7`](https://github.com/nodejs/node/commit/0f2cbc17c7)] - **src**: update std::vector\<v8::Local\<T>> to use v8::LocalVector\<T> (Aditi) [#57642](https://github.com/nodejs/node/pull/57642)
- \[[`d1c6f861d5`](https://github.com/nodejs/node/commit/d1c6f861d5)] - **src**: update std::vector\<v8::Local\<T>> to use v8::LocalVector\<T> (Aditi) [#57578](https://github.com/nodejs/node/pull/57578)
- \[[`ab0d3a38db`](https://github.com/nodejs/node/commit/ab0d3a38db)] - **src**: improve error message for invalid child stdio type in spawn_sync (Dario Piotrowicz) [#57589](https://github.com/nodejs/node/pull/57589)
- \[[`24b182e7b3`](https://github.com/nodejs/node/commit/24b182e7b3)] - **src**: implement util.types fast API calls (Ruben Bridgewater) [#57819](https://github.com/nodejs/node/pull/57819)
- \[[`dda6423be9`](https://github.com/nodejs/node/commit/dda6423be9)] - **src**: enter and lock isolate properly in json parser (Joyee Cheung) [#57823](https://github.com/nodejs/node/pull/57823)
- \[[`4754c693f8`](https://github.com/nodejs/node/commit/4754c693f8)] - **src**: improve error handling in `node_env_var.cc` (Antoine du Hamel) [#57767](https://github.com/nodejs/node/pull/57767)
- \[[`db483bbe63`](https://github.com/nodejs/node/commit/db483bbe63)] - **src**: improve error handling in node_http2 (James M Snell) [#57764](https://github.com/nodejs/node/pull/57764)
- \[[`b0277700d6`](https://github.com/nodejs/node/commit/b0277700d6)] - **src**: improve error handling in crypto_x509 (James M Snell) [#57757](https://github.com/nodejs/node/pull/57757)
- \[[`353587f984`](https://github.com/nodejs/node/commit/353587f984)] - **src**: improve error handling in callback.cc (James M Snell) [#57758](https://github.com/nodejs/node/pull/57758)
- \[[`bec053ab20`](https://github.com/nodejs/node/commit/bec053ab20)] - **src**: remove unused variable in crypto_x509.cc (Michaël Zasso) [#57754](https://github.com/nodejs/node/pull/57754)
- \[[`38a329a857`](https://github.com/nodejs/node/commit/38a329a857)] - **src**: fix kill signal 0 on Windows (Stefan Stojanovic) [#57695](https://github.com/nodejs/node/pull/57695)
- \[[`70bb387f82`](https://github.com/nodejs/node/commit/70bb387f82)] - **src**: fix inefficient usage of v8_inspector::StringView (Simon Zünd) [#52372](https://github.com/nodejs/node/pull/52372)
- \[[`be038f0273`](https://github.com/nodejs/node/commit/be038f0273)] - **src,permission**: make ERR_ACCESS_DENIED more descriptive (Rafael Gonzaga) [#57585](https://github.com/nodejs/node/pull/57585)
- \[[`0ec912f452`](https://github.com/nodejs/node/commit/0ec912f452)] - **(SEMVER-MINOR)** **stream**: preserve AsyncLocalStorage context in finished() (Gürgün Dayıoğlu) [#57865](https://github.com/nodejs/node/pull/57865)
- \[[`6ffb66f82f`](https://github.com/nodejs/node/commit/6ffb66f82f)] - **test**: fix permission fixtures lint (Rafael Gonzaga) [#55819](https://github.com/nodejs/node/pull/55819)
- \[[`fd37891186`](https://github.com/nodejs/node/commit/fd37891186)] - **test**: add repl preview timeout test (Chengzhong Wu) [#55484](https://github.com/nodejs/node/pull/55484)
- \[[`1be5a8c1b4`](https://github.com/nodejs/node/commit/1be5a8c1b4)] - **test**: skip `test-config-json-schema` with quic (Richard Lau) [#57225](https://github.com/nodejs/node/pull/57225)
- \[[`e90583b657`](https://github.com/nodejs/node/commit/e90583b657)] - **test**: add more coverage to `node_config_file` (Marco Ippolito) [#57170](https://github.com/nodejs/node/pull/57170)
- \[[`df2a36bfcc`](https://github.com/nodejs/node/commit/df2a36bfcc)] - **test**: remove deadlock workaround (Joyee Cheung) [#58047](https://github.com/nodejs/node/pull/58047)
- \[[`103034b051`](https://github.com/nodejs/node/commit/103034b051)] - **test**: prevent extraneous HOSTNAME substitution in test-runner-output (René) [#58076](https://github.com/nodejs/node/pull/58076)
- \[[`3e58f81a38`](https://github.com/nodejs/node/commit/3e58f81a38)] - **test**: update WPT for WebCryptoAPI to b48efd681e (Node.js GitHub Bot) [#58044](https://github.com/nodejs/node/pull/58044)
- \[[`2f4e4164a3`](https://github.com/nodejs/node/commit/2f4e4164a3)] - **test**: add missing newlines to repl .exit writes (Dario Piotrowicz) [#58041](https://github.com/nodejs/node/pull/58041)
- \[[`b40769292e`](https://github.com/nodejs/node/commit/b40769292e)] - **test**: add fast api tests for getLibuvNow() (Yagiz Nizipli) [#58022](https://github.com/nodejs/node/pull/58022)
- \[[`cbd5768d47`](https://github.com/nodejs/node/commit/cbd5768d47)] - **test**: add ALS test using http agent keep alive (Gerhard Stöbich) [#58017](https://github.com/nodejs/node/pull/58017)
- \[[`9e31ab502a`](https://github.com/nodejs/node/commit/9e31ab502a)] - **test**: deflake test-http2-options-max-headers-block-length (Luigi Pinca) [#57959](https://github.com/nodejs/node/pull/57959)
- \[[`13f8f9cc12`](https://github.com/nodejs/node/commit/13f8f9cc12)] - **test**: rename to getCallSites (Wuli Zuo) [#57948](https://github.com/nodejs/node/pull/57948)
- \[[`92dce6ed6b`](https://github.com/nodejs/node/commit/92dce6ed6b)] - **test**: force GC in test-file-write-stream4 (Luigi Pinca) [#57930](https://github.com/nodejs/node/pull/57930)
- \[[`aa755d3acf`](https://github.com/nodejs/node/commit/aa755d3acf)] - **test**: enable skipped colorize test (Shima Ryuhei) [#57887](https://github.com/nodejs/node/pull/57887)
- \[[`331f44c78c`](https://github.com/nodejs/node/commit/331f44c78c)] - **test**: update WPT for WebCryptoAPI to 164426ace2 (Node.js GitHub Bot) [#57854](https://github.com/nodejs/node/pull/57854)
- \[[`4aaa8438b4`](https://github.com/nodejs/node/commit/4aaa8438b4)] - **test**: add test for frame count being 0.5 (Jake Yuesong Li) [#57732](https://github.com/nodejs/node/pull/57732)
- \[[`fb51d3a0c5`](https://github.com/nodejs/node/commit/fb51d3a0c5)] - **test**: fix the decimal fractions explaination (Jake Yuesong Li) [#57732](https://github.com/nodejs/node/pull/57732)
- \[[`c6a45a9087`](https://github.com/nodejs/node/commit/c6a45a9087)] - _**Revert**_ "**test**: add tests for REPL custom evals" (Tobias Nießen) [#57793](https://github.com/nodejs/node/pull/57793)
- \[[`f3a4d03963`](https://github.com/nodejs/node/commit/f3a4d03963)] - **test**: add tests for REPL custom evals (Dario Piotrowicz) [#57691](https://github.com/nodejs/node/pull/57691)
- \[[`a3be0df337`](https://github.com/nodejs/node/commit/a3be0df337)] - **test**: update expected error message for macOS (Antoine du Hamel) [#57742](https://github.com/nodejs/node/pull/57742)
- \[[`a7e73a0a74`](https://github.com/nodejs/node/commit/a7e73a0a74)] - **test**: fix dangling promise in test_runner no isolation test setup (Jacob Smith) [#57595](https://github.com/nodejs/node/pull/57595)
- \[[`edb7dd1ec7`](https://github.com/nodejs/node/commit/edb7dd1ec7)] - **test_runner**: match minimum file column to 'all files' (Shima Ryuhei) [#57848](https://github.com/nodejs/node/pull/57848)
- \[[`c56f495e83`](https://github.com/nodejs/node/commit/c56f495e83)] - **tools**: extract target abseil to abseil.gyp (Chengzhong Wu) [#57289](https://github.com/nodejs/node/pull/57289)
- \[[`1b37161a27`](https://github.com/nodejs/node/commit/1b37161a27)] - **tools**: ignore V8 tests in CodeQL scans (Rich Trott) [#58081](https://github.com/nodejs/node/pull/58081)
- \[[`23386308dd`](https://github.com/nodejs/node/commit/23386308dd)] - **tools**: enable CodeQL config file (Rich Trott) [#58036](https://github.com/nodejs/node/pull/58036)
- \[[`9c21abc169`](https://github.com/nodejs/node/commit/9c21abc169)] - **tools**: ignore test directory in CodeQL scans (Rich Trott) [#57978](https://github.com/nodejs/node/pull/57978)
- \[[`f210a1530d`](https://github.com/nodejs/node/commit/f210a1530d)] - **tools**: add semver-major release support to release-lint (Antoine du Hamel) [#57892](https://github.com/nodejs/node/pull/57892)
- \[[`234c417e98`](https://github.com/nodejs/node/commit/234c417e98)] - **tools**: add codeql nightly (Rafael Gonzaga) [#57788](https://github.com/nodejs/node/pull/57788)
- \[[`938f1532da`](https://github.com/nodejs/node/commit/938f1532da)] - **tools**: edit create-release-proposal workflow to handle pr body length (Elves Vieira) [#57841](https://github.com/nodejs/node/pull/57841)
- \[[`b362339f72`](https://github.com/nodejs/node/commit/b362339f72)] - **tools**: add zstd updater to workflow (KASEYA\yahor.siarheyenka) [#57831](https://github.com/nodejs/node/pull/57831)
- \[[`61180db9c0`](https://github.com/nodejs/node/commit/61180db9c0)] - **tools**: remove unused `osx-pkg-postinstall.sh` (Antoine du Hamel) [#57667](https://github.com/nodejs/node/pull/57667)
- \[[`3ae04c94eb`](https://github.com/nodejs/node/commit/3ae04c94eb)] - **tools**: do not use temp files when merging PRs (Antoine du Hamel) [#57790](https://github.com/nodejs/node/pull/57790)
- \[[`d623c2c2b4`](https://github.com/nodejs/node/commit/d623c2c2b4)] - **tools**: update gyp-next to 0.20.0 (Node.js GitHub Bot) [#57683](https://github.com/nodejs/node/pull/57683)
- \[[`43ea4c532a`](https://github.com/nodejs/node/commit/43ea4c532a)] - **tools**: bump the eslint group in /tools/eslint with 4 updates (dependabot\[bot]) [#57721](https://github.com/nodejs/node/pull/57721)
- \[[`5703147470`](https://github.com/nodejs/node/commit/5703147470)] - **tools**: enable linter in `test/fixtures/source-map/output` (Antoine du Hamel) [#57700](https://github.com/nodejs/node/pull/57700)
- \[[`80d58c372d`](https://github.com/nodejs/node/commit/80d58c372d)] - **tools**: enable linter in `test/fixtures/errors` (Antoine du Hamel) [#57701](https://github.com/nodejs/node/pull/57701)
- \[[`ef5275b7be`](https://github.com/nodejs/node/commit/ef5275b7be)] - **tools**: enable linter in `test/fixtures/test-runner/output` (Antoine du Hamel) [#57698](https://github.com/nodejs/node/pull/57698)
- \[[`631733e41f`](https://github.com/nodejs/node/commit/631733e41f)] - **tools**: enable linter in `test/fixtures/eval` (Antoine du Hamel) [#57699](https://github.com/nodejs/node/pull/57699)
- \[[`6d0128695f`](https://github.com/nodejs/node/commit/6d0128695f)] - **tools**: enable linter on some fixtures file (Antoine du Hamel) [#57674](https://github.com/nodejs/node/pull/57674)
- \[[`f4d7cbae89`](https://github.com/nodejs/node/commit/f4d7cbae89)] - **tools**: update ESLint to 9.23 (Antoine du Hamel) [#57673](https://github.com/nodejs/node/pull/57673)
- \[[`5a39a24cd1`](https://github.com/nodejs/node/commit/5a39a24cd1)] - **typings**: fix `ModulesBinding` types (Antoine du Hamel) [#55549](https://github.com/nodejs/node/pull/55549)
- \[[`2df7ce9ebd`](https://github.com/nodejs/node/commit/2df7ce9ebd)] - **util**: fix parseEnv handling of invalid lines (Augustin Mauroy) [#57798](https://github.com/nodejs/node/pull/57798)
- \[[`416052a9f2`](https://github.com/nodejs/node/commit/416052a9f2)] - **util**: fix formatting of objects with built-in Symbol.toPrimitive (Shima Ryuhei) [#57832](https://github.com/nodejs/node/pull/57832)
- \[[`43490c8797`](https://github.com/nodejs/node/commit/43490c8797)] - **(SEMVER-MINOR)** **util**: add `types.isFloat16Array()` (Livia Medeiros) [#57879](https://github.com/nodejs/node/pull/57879)
- \[[`30060e13d3`](https://github.com/nodejs/node/commit/30060e13d3)] - **util**: preserve `length` of deprecated functions (Livia Medeiros) [#57806](https://github.com/nodejs/node/pull/57806)
- \[[`9837e08a84`](https://github.com/nodejs/node/commit/9837e08a84)] - **util**: fix parseEnv incorrectly splitting multiple ‘=‘ in value (HEESEUNG) [#57421](https://github.com/nodejs/node/pull/57421)
- \[[`af41dd3c07`](https://github.com/nodejs/node/commit/af41dd3c07)] - **watch**: clarify completion/failure watch mode messages (Dario Piotrowicz) [#57926](https://github.com/nodejs/node/pull/57926)
- \[[`7229a29b47`](https://github.com/nodejs/node/commit/7229a29b47)] - **watch**: check parent and child path properly (Jason Zhang) [#57425](https://github.com/nodejs/node/pull/57425)
- \[[`1b5a7c6dc8`](https://github.com/nodejs/node/commit/1b5a7c6dc8)] - **win**: fix SIGQUIT on ClangCL (Stefan Stojanovic) [#57659](https://github.com/nodejs/node/pull/57659)
- \[[`e935c3c6f2`](https://github.com/nodejs/node/commit/e935c3c6f2)] - **worker**: add ESM version examples to worker docs (fisker Cheung) [#57645](https://github.com/nodejs/node/pull/57645)
- \[[`dda6ca9172`](https://github.com/nodejs/node/commit/dda6ca9172)] - **(SEMVER-MINOR)** **worker**: add worker.getHeapStatistics() (Matteo Collina) [#57888](https://github.com/nodejs/node/pull/57888)
- \[[`f2159f2a44`](https://github.com/nodejs/node/commit/f2159f2a44)] - **zlib**: fix pointer alignment (jhofstee) [#57727](https://github.com/nodejs/node/pull/57727)

Windows 32-bit Installer: https://nodejs.org/dist/v22.16.0/node-v22.16.0-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.16.0/node-v22.16.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.16.0/node-v22.16.0-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.16.0/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.16.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.16.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.16.0/node-v22.16.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.16.0/node-v22.16.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.16.0/node-v22.16.0.tar.gz \
Other release files: https://nodejs.org/dist/v22.16.0/ \
Documentation: https://nodejs.org/docs/v22.16.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

17d4038360f2322e6c3b9f82e7115163ca039da470b59933ab708a4844c5e936  node-v22.16.0-aix-ppc64.tar.gz
d31f0e4a2fbc1fa16bc3f8c12580e0639d875bb9093dd667842ab90c20268e82  node-v22.16.0-arm64.msi
1d7f34ec4c03e12d8b33481e5c4560432d7dc31a0ef3ff5a4d9a8ada7cf6ecc9  node-v22.16.0-darwin-arm64.tar.gz
aaf7fc3c936f1b359bc312b63638e41f258689ac2303966ad932cda18c54ea00  node-v22.16.0-darwin-arm64.tar.xz
838d400f7e66c804e5d11e2ecb61d6e9e878611146baff69d6a2def3cc23f4ac  node-v22.16.0-darwin-x64.tar.gz
5c34638f2c0e3f3aaa7b3a94b58304765a169730da1896ebba8515ea4d987a9c  node-v22.16.0-darwin-x64.tar.xz
a60e5a543fab5e5105525948c596d4974c617f39606cef76eb94c3bf1df9a06c  node-v22.16.0-headers.tar.gz
9820194181a18fbfc6f3c9323a7edc5b587ad1753287bdf41466b89d8f4eaed9  node-v22.16.0-headers.tar.xz
1725602e9fb150eb8b8220a899085190e1c04d1a5f3862b01c3dc1dfce0157f9  node-v22.16.0-linux-arm64.tar.gz
eab80cb88f8fda1e65f5e8d0420c9809bdb320b03fd34976ab7161b6e703b910  node-v22.16.0-linux-arm64.tar.xz
d4c3d8b6862208f0e0d6e20726a8dc5fb019cba8333c72dfd97b34ceed8d22a4  node-v22.16.0-linux-armv7l.tar.gz
a3d42085f034be76e8e6f40d4e534e57036818f523fbbd0da90d51165b1f2c10  node-v22.16.0-linux-armv7l.tar.xz
b4eec15ffd2d738ae34566057a6928e789e02a0f47176f4af8520f1248c63aab  node-v22.16.0-linux-ppc64le.tar.gz
02b082697a4f73dcd02e89d185e004af69a8462c13fa62caf403e7f717b79754  node-v22.16.0-linux-ppc64le.tar.xz
668a5c65ade42f08d921c48a1c14437d10d026291e381d2541c2b0a585724567  node-v22.16.0-linux-s390x.tar.gz
b3603dcbea7b1ef87cfd3bf986ff9697609359356d82334de6217838d3cce640  node-v22.16.0-linux-s390x.tar.xz
fb870226119d47378fa9c92c4535389c72dae14fcc7b47e6fdcc82c43de5a547  node-v22.16.0-linux-x64.tar.gz
f4cb75bb036f0d0eddf6b79d9596df1aaab9ddccd6a20bf489be5abe9467e84e  node-v22.16.0-linux-x64.tar.xz
030da05e79e596a7076894d8fefac3821d25f0e164bb01edf0302f49b7dafcd0  node-v22.16.0-win-arm64.7z
31e885dcd06355f67b4be8cca86464270d83d0f5b8d4e3d4369c16ed22a5f4fa  node-v22.16.0-win-arm64.zip
03ff95bfb2c256017db9688921d2669edf6f05a3b0b8491d17c387d870360f40  node-v22.16.0-win-x64.7z
21c2d9735c80b8f86dab19305aa6a9f6f59bbc808f68de3eef09d5832e3bfbbd  node-v22.16.0-win-x64.zip
fb6de1694575df82c0f681cd88f0b62a40f714b84330f1b612a294eeefb6ba67  node-v22.16.0-win-x86.7z
c23e16ffddd95ef45272549675a8f87480b3a0a900bebb94c277ff11ba99ec06  node-v22.16.0-win-x86.zip
e2f2802202513e1bf41f7c00307635f6c6fe31c0275c1e03d269d45a76e5fc2e  node-v22.16.0-x64.msi
715979e8e36b7128a2d8edf18aca7bbde6b86de92824608c1c1a5a2bb54548fc  node-v22.16.0-x86.msi
b59ca7c71fef10f1b13e51c628e3e64f0df466feebbc528589f4e0566e6bbede  node-v22.16.0.pkg
108f250ff79cc103b464b3ef41fa60f4866e4e6c962117171adaac7325ebdab2  node-v22.16.0.tar.gz
720894f323e5c1ac24968eb2676660c90730d715cb7f090be71a668662a17c37  node-v22.16.0.tar.xz
1944e0635b3c353a1e728a782f0984cccbb4864a461a429d86878b273dafe368  win-arm64/node.exe
344c1d69f0b008da7318c29397d552c6ad8d9d6b94c115a35c6eaf278e87d24c  win-arm64/node.lib
b407648861647a7f763d3465d713aec40fd1a127a2d9c07c582c3c37c589962b  win-arm64/node_pdb.7z
d7582350d9c9aa282286b4e7893bbe42f17a5acc95167c2eacdcb38c78b42137  win-arm64/node_pdb.zip
c5ff4c736112dd483c750fd4149d30c8a116db1a49b8b3ec88be4b65e6c86c19  win-x64/node.exe
a3498bf1b8eebb3a07b1c7e9e28703fed4f1ce0b520d5f6898ae607862178cd2  win-x64/node.lib
c50424250b220e2b6e0aec2c3d9c2f3f6d69263614319d5272e01711362eab26  win-x64/node_pdb.7z
4a01fc48450741afd67c5b45c45cf1ad7871775ad97ff69858057e79241987b3  win-x64/node_pdb.zip
249e0e1afb8fcce9cd88e0f45b92c8e00191c36256260b622a3ad1433dc63b1d  win-x86/node.exe
4ca7aae3eab9f5a18dae49b2b1fcc5fccfffcf47f3c3c2f2d644d28bf92a69a3  win-x86/node.lib
329e771115f6a8dfd0f22e2f2db32048e41b601b45b63d32a86e080ae465ba5f  win-x86/node_pdb.7z
aaeb68e8b86a1bf9f0dda53fdeebd8f573897fdb75bc624cdf5a6736e3d8e921  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEwNYkhDnx1WBKr/tAIdkA/9sjN1YFAmgt8EoACgkQIdkA/9sj
N1YXBA/9G4lgCoJb4TxVI/YPH/bZKjfMLt2s5UHgRcI1rMYHhcQoqSDYWtJpBiMr
+8/ZEEzYEDDHLhb0Rj/vFp+jYmSOn5d96gYdQhV6hIOx58ScxoVRhxTO/KtZ/Z0g
bEcR1uG8s22lQR8X8KWOqpNg/bP9i9vUg0z9weazZsepPc79rW548vf5I6TFizA/
bignuL2L9gaFhYIDGi9FkUX9zC6vsrjIjrAcZzo32l5p8fhvJ5QQFFJlJsqwear9
xHfT4GE2VSHWXMBV4XGeaP9+3AR6+zHMW4W6s4D4zlJ5jSdHSPKL3MsWl5YyNtX3
9OcbIayeiTBz7GSoQ3La1r9myslsOZNecxvEmKVMzLAgYqbKRi3Fssk+MCWdbJQV
FzUvWH+fH+nBR9UCL7Buwy1RF5ZG0gakeda+odj+p/UB3h5y+rgCOoauJRFOzvcn
NHOEoLCiPFxWrjBThEbId8hSs4ZQNgnOwBlKiBCcPiCj9TJ82n9D3HVhgN6o3Y4Y
fTkSSySevICcRReg6AECZz7znN66PhHWTAnzCleZGgxh78RF5ateKtlyRK8vH+MC
wjQu/0Eh7dR9HedqQiPk1nATk3NmT1wFR2IWZZAIt/ldixlec0Ee4vHQKvkTesJi
wz7XxEHufmHjaqJwCNFDIRgTGuQXn/+cvebjotO2yYdXddfp2dw=
=XYjr
-----END PGP SIGNATURE-----
```
