---
date: '2025-02-13T17:44:50.270Z'
category: release
title: Node.js 23.8.0 (Current)
layout: blog-post
author: Michaël Zasso
---

## 2025-02-13, Version 23.8.0 (Current), @targos

### Notable Changes

#### Support for using system CA certificates store on macOS and Windows

This version adds the `--use-system-ca` command-line flag, which instructs Node.js
to use the trusted CA certificates present in the system store along with
the `--use-bundled-ca`, `--use-openssl-ca` options.

This option is available on macOS and Windows for now.

Contributed by Tim Jacomb in [#56599](https://github.com/nodejs/node/pull/56599)
and Joyee Cheung in [#56833](https://github.com/nodejs/node/pull/56833).

#### Introduction of the URL Pattern API

An implementation of the [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API)
is now available.

The `URLPattern` constructor is exported from the `node:url` module and will be
available as a global in Node.js 24.

Contributed by Yagiz Nizipli and Daniel Lemire in [#56452](https://github.com/nodejs/node/pull/56452).

#### Support for the zstd compression algorithm

Node.js now includes support for the Zstandard (zstd) compression algorithm.
Various APIs have been added to the `node:zlib` module for both compression and decompression
of zstd streams.

Contributed by Jan Krems in [#52100](https://github.com/nodejs/node/pull/52100).

#### Node.js thread names

Threads created by the Node.js process are now named to improve the debugging experience.
Worker threads will use the `name` option that can be passed to the `Worker` constructor.

Contributed by Rafael Gonzaga in [#56416](https://github.com/nodejs/node/pull/56416).

#### Timezone data has been updated to 2025a

Included changes:

- Paraguay adopts permanent -03 starting spring 2024.
- Improve pre-1991 data for the Philippines.

#### Other Notable Changes

- \[[`39997867cf`](https://github.com/nodejs/node/commit/39997867cf)] - **(SEMVER-MINOR)** **sqlite**: allow returning `ArrayBufferView`s from user-defined functions (René) [#56790](https://github.com/nodejs/node/pull/56790)

### Commits

- \[[`0ee9c34d63`](https://github.com/nodejs/node/commit/0ee9c34d63)] - **benchmark**: add simple parse and test benchmarks for URLPattern (James M Snell) [#56882](https://github.com/nodejs/node/pull/56882)
- \[[`b3f2045d14`](https://github.com/nodejs/node/commit/b3f2045d14)] - **build**: gyp exclude libm linking on macOS (deepak1556) [#56901](https://github.com/nodejs/node/pull/56901)
- \[[`e0dd9aefd6`](https://github.com/nodejs/node/commit/e0dd9aefd6)] - **build**: remove explicit linker call to libm on macOS (deepak1556) [#56901](https://github.com/nodejs/node/pull/56901)
- \[[`52399da780`](https://github.com/nodejs/node/commit/52399da780)] - **build**: link with Security.framework in GN build (Cheng) [#56895](https://github.com/nodejs/node/pull/56895)
- \[[`582b9221c9`](https://github.com/nodejs/node/commit/582b9221c9)] - **build**: do not put commands in sources variables (Cheng) [#56885](https://github.com/nodejs/node/pull/56885)
- \[[`ea61b956e9`](https://github.com/nodejs/node/commit/ea61b956e9)] - **build**: add double quotes around <(python) (Luigi Pinca) [#56826](https://github.com/nodejs/node/pull/56826)
- \[[`14236ef778`](https://github.com/nodejs/node/commit/14236ef778)] - **build**: add build option suppress_all_error_on_warn (Michael Dawson) [#56647](https://github.com/nodejs/node/pull/56647)
- \[[`dfd3f430f3`](https://github.com/nodejs/node/commit/dfd3f430f3)] - **build,win**: enable ccache (Stefan Stojanovic) [#56847](https://github.com/nodejs/node/pull/56847)
- \[[`3e207bd9ec`](https://github.com/nodejs/node/commit/3e207bd9ec)] - **(SEMVER-MINOR)** **crypto**: support --use-system-ca on Windows (Joyee Cheung) [#56833](https://github.com/nodejs/node/pull/56833)
- \[[`fe2694a992`](https://github.com/nodejs/node/commit/fe2694a992)] - **crypto**: fix X509\* leak in --use-system-ca (Joyee Cheung) [#56832](https://github.com/nodejs/node/pull/56832)
- \[[`60039a2c36`](https://github.com/nodejs/node/commit/60039a2c36)] - **crypto**: add api to get openssl security level (Michael Dawson) [#56601](https://github.com/nodejs/node/pull/56601)
- \[[`39a474f7c0`](https://github.com/nodejs/node/commit/39a474f7c0)] - **(SEMVER-MINOR)** **crypto**: added support for reading certificates from macOS system store (Tim Jacomb) [#56599](https://github.com/nodejs/node/pull/56599)
- \[[`144bee8067`](https://github.com/nodejs/node/commit/144bee8067)] - **deps**: update zlib to 1.3.0.1-motley-788cb3c (Node.js GitHub Bot) [#56655](https://github.com/nodejs/node/pull/56655)
- \[[`7fd39e3a79`](https://github.com/nodejs/node/commit/7fd39e3a79)] - **deps**: update sqlite to 3.49.0 (Node.js GitHub Bot) [#56654](https://github.com/nodejs/node/pull/56654)
- \[[`d698cb5434`](https://github.com/nodejs/node/commit/d698cb5434)] - **deps**: update amaro to 0.3.2 (marco-ippolito) [#56916](https://github.com/nodejs/node/pull/56916)
- \[[`dbd09067c0`](https://github.com/nodejs/node/commit/dbd09067c0)] - **deps**: V8: cherry-pick 9ab40592f697 (Levi Zim) [#56781](https://github.com/nodejs/node/pull/56781)
- \[[`ee33ef3aa6`](https://github.com/nodejs/node/commit/ee33ef3aa6)] - **deps**: update cjs-module-lexer to 2.0.0 (Michael Dawson) [#56855](https://github.com/nodejs/node/pull/56855)
- \[[`c0542557d0`](https://github.com/nodejs/node/commit/c0542557d0)] - **deps**: update timezone to 2025a (Node.js GitHub Bot) [#56876](https://github.com/nodejs/node/pull/56876)
- \[[`d67cb1f9bb`](https://github.com/nodejs/node/commit/d67cb1f9bb)] - **deps**: update simdjson to 3.12.0 (Node.js GitHub Bot) [#56874](https://github.com/nodejs/node/pull/56874)
- \[[`70b04b4314`](https://github.com/nodejs/node/commit/70b04b4314)] - **deps**: update googletest to e235eb3 (Node.js GitHub Bot) [#56873](https://github.com/nodejs/node/pull/56873)
- \[[`e11cda003f`](https://github.com/nodejs/node/commit/e11cda003f)] - **(SEMVER-MINOR)** **deps**: update ada to v3.0.1 (Yagiz Nizipli) [#56452](https://github.com/nodejs/node/pull/56452)
- \[[`8743ef525d`](https://github.com/nodejs/node/commit/8743ef525d)] - **deps**: update simdjson to 3.11.6 (Node.js GitHub Bot) [#56250](https://github.com/nodejs/node/pull/56250)
- \[[`0f553e5575`](https://github.com/nodejs/node/commit/0f553e5575)] - **deps**: update amaro to 0.3.1 (Node.js GitHub Bot) [#56785](https://github.com/nodejs/node/pull/56785)
- \[[`380a8d8d2f`](https://github.com/nodejs/node/commit/380a8d8d2f)] - **(SEMVER-MINOR)** **deps,tools**: add zstd 1.5.6 (Jan Krems) [#52100](https://github.com/nodejs/node/pull/52100)
- \[[`66898a7c3b`](https://github.com/nodejs/node/commit/66898a7c3b)] - **doc**: update history of stream.Readable.toWeb() (Jimmy Leung) [#56928](https://github.com/nodejs/node/pull/56928)
- \[[`9e29416e12`](https://github.com/nodejs/node/commit/9e29416e12)] - **doc**: make MDN links to global classes more consistent (Antoine du Hamel) [#56924](https://github.com/nodejs/node/pull/56924)
- \[[`6bc270728a`](https://github.com/nodejs/node/commit/6bc270728a)] - **doc**: make MDN links to global classes more consistent in `assert.md` (Antoine du Hamel) [#56920](https://github.com/nodejs/node/pull/56920)
- \[[`00da003171`](https://github.com/nodejs/node/commit/00da003171)] - **doc**: make MDN links to global classes more consistent (Antoine du Hamel) [#56923](https://github.com/nodejs/node/pull/56923)
- \[[`d90198793a`](https://github.com/nodejs/node/commit/d90198793a)] - **doc**: make MDN links to global classes more consistent in `util.md` (Antoine du Hamel) [#56922](https://github.com/nodejs/node/pull/56922)
- \[[`5f4377a759`](https://github.com/nodejs/node/commit/5f4377a759)] - **doc**: make MDN links to global classes more consistent in `buffer.md` (Antoine du Hamel) [#56921](https://github.com/nodejs/node/pull/56921)
- \[[`7353266b50`](https://github.com/nodejs/node/commit/7353266b50)] - **doc**: improve type stripping documentation (Marco Ippolito) [#56916](https://github.com/nodejs/node/pull/56916)
- \[[`888d2acc3a`](https://github.com/nodejs/node/commit/888d2acc3a)] - **doc**: specificy support for erasable ts syntax (Marco Ippolito) [#56916](https://github.com/nodejs/node/pull/56916)
- \[[`3c082d43bc`](https://github.com/nodejs/node/commit/3c082d43bc)] - **doc**: update post sec release process (Rafael Gonzaga) [#56907](https://github.com/nodejs/node/pull/56907)
- \[[`f0bf35d3c5`](https://github.com/nodejs/node/commit/f0bf35d3c5)] - **doc**: update websocket link to avoid linking to self (Chengzhong Wu) [#56897](https://github.com/nodejs/node/pull/56897)
- \[[`373dbb0e6c`](https://github.com/nodejs/node/commit/373dbb0e6c)] - **doc**: mark `--env-file-if-exists` flag as experimental (Juan José) [#56893](https://github.com/nodejs/node/pull/56893)
- \[[`d436888cc8`](https://github.com/nodejs/node/commit/d436888cc8)] - **doc**: fix typo in cjs example of `util.styleText` (Deokjin Kim) [#56769](https://github.com/nodejs/node/pull/56769)
- \[[`91638eeb4a`](https://github.com/nodejs/node/commit/91638eeb4a)] - **doc**: clarify sqlite user-defined function behaviour (René) [#56786](https://github.com/nodejs/node/pull/56786)
- \[[`bab9c4d331`](https://github.com/nodejs/node/commit/bab9c4d331)] - **events**: getMaxListeners detects 0 listeners (Matthew Aitken) [#56807](https://github.com/nodejs/node/pull/56807)
- \[[`ccaf7fe737`](https://github.com/nodejs/node/commit/ccaf7fe737)] - **fs**: make `FileHandle.readableWebStream` always create byte streams (Ian Kerins) [#55461](https://github.com/nodejs/node/pull/55461)
- \[[`974cec7a0a`](https://github.com/nodejs/node/commit/974cec7a0a)] - **http**: be more generational GC friendly (ywave620) [#56767](https://github.com/nodejs/node/pull/56767)
- \[[`be00058712`](https://github.com/nodejs/node/commit/be00058712)] - **inspector**: add Network.Initiator in inspector protocol (Chengzhong Wu) [#56805](https://github.com/nodejs/node/pull/56805)
- \[[`31293a4b09`](https://github.com/nodejs/node/commit/31293a4b09)] - **inspector**: fix GN build (Cheng) [#56798](https://github.com/nodejs/node/pull/56798)
- \[[`91a302356b`](https://github.com/nodejs/node/commit/91a302356b)] - **inspector**: fix StringUtil::CharacterCount for unicodes (Chengzhong Wu) [#56788](https://github.com/nodejs/node/pull/56788)
- \[[`3b305f25f2`](https://github.com/nodejs/node/commit/3b305f25f2)] - **lib**: filter node:quic from builtinModules when flag not used (James M Snell) [#56870](https://github.com/nodejs/node/pull/56870)
- \[[`f06ee4c54a`](https://github.com/nodejs/node/commit/f06ee4c54a)] - **meta**: bump `actions/upload-artifact` from 4.4.3 to 4.6.0 (dependabot\[bot]) [#56861](https://github.com/nodejs/node/pull/56861)
- \[[`d230bc3b3c`](https://github.com/nodejs/node/commit/d230bc3b3c)] - **meta**: bump `actions/setup-node` from 4.1.0 to 4.2.0 (dependabot\[bot]) [#56868](https://github.com/nodejs/node/pull/56868)
- \[[`d4ecfa745e`](https://github.com/nodejs/node/commit/d4ecfa745e)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#56889](https://github.com/nodejs/node/pull/56889)
- \[[`698c56bb94`](https://github.com/nodejs/node/commit/698c56bb94)] - **meta**: add @nodejs/url as codeowner (Chengzhong Wu) [#56783](https://github.com/nodejs/node/pull/56783)
- \[[`a274b28857`](https://github.com/nodejs/node/commit/a274b28857)] - **module**: fix require.resolve() crash on non-string paths (Aditi) [#56942](https://github.com/nodejs/node/pull/56942)
- \[[`4e3052aeee`](https://github.com/nodejs/node/commit/4e3052aeee)] - **quic**: fixup errant LocalVector usage (James M Snell) [#56564](https://github.com/nodejs/node/pull/56564)
- \[[`dfc61f7bb7`](https://github.com/nodejs/node/commit/dfc61f7bb7)] - **readline**: fix unresolved promise on abortion (Daniel Venable) [#54030](https://github.com/nodejs/node/pull/54030)
- \[[`9e60501f5e`](https://github.com/nodejs/node/commit/9e60501f5e)] - **sqlite**: fix coverity warnings related to backup() (Colin Ihrig) [#56961](https://github.com/nodejs/node/pull/56961)
- \[[`1913a4aabc`](https://github.com/nodejs/node/commit/1913a4aabc)] - **sqlite**: restore changes from #55373 (Colin Ihrig) [#56908](https://github.com/nodejs/node/pull/56908)
- \[[`8410c955b7`](https://github.com/nodejs/node/commit/8410c955b7)] - **sqlite**: fix use-after-free in StatementSync due to premature GC (Divy Srivastava) [#56840](https://github.com/nodejs/node/pull/56840)
- \[[`01d732d629`](https://github.com/nodejs/node/commit/01d732d629)] - **sqlite**: handle conflicting SQLite and JS errors (Colin Ihrig) [#56787](https://github.com/nodejs/node/pull/56787)
- \[[`39997867cf`](https://github.com/nodejs/node/commit/39997867cf)] - **(SEMVER-MINOR)** **sqlite**: allow returning `ArrayBufferView`s from user-defined functions (René) [#56790](https://github.com/nodejs/node/pull/56790)
- \[[`8dc637681a`](https://github.com/nodejs/node/commit/8dc637681a)] - **sqlite, test**: expose sqlite online backup api (Edy Silva) [#56253](https://github.com/nodejs/node/pull/56253)
- \[[`cfea53eccc`](https://github.com/nodejs/node/commit/cfea53eccc)] - **src**: use `args.This()` in zlib (Michaël Zasso) [#56988](https://github.com/nodejs/node/pull/56988)
- \[[`6b398d6d0b`](https://github.com/nodejs/node/commit/6b398d6d0b)] - **src**: replace `SplitString` with built-in (Yagiz Nizipli) [#54990](https://github.com/nodejs/node/pull/54990)
- \[[`fbb32e0a08`](https://github.com/nodejs/node/commit/fbb32e0a08)] - **src**: add nullptr handling for `NativeKeyObject` (Burkov Egor) [#56900](https://github.com/nodejs/node/pull/56900)
- \[[`83ff7be9fd`](https://github.com/nodejs/node/commit/83ff7be9fd)] - **src**: disallow copy/move fns/constructors (Yagiz Nizipli) [#56811](https://github.com/nodejs/node/pull/56811)
- \[[`63611d0331`](https://github.com/nodejs/node/commit/63611d0331)] - **src**: add a hard dependency v8_inspector_headers (Chengzhong Wu) [#56805](https://github.com/nodejs/node/pull/56805)
- \[[`3d957d135c`](https://github.com/nodejs/node/commit/3d957d135c)] - **src**: improve error handling in encoding_binding.cc (James M Snell) [#56915](https://github.com/nodejs/node/pull/56915)
- \[[`9e9ac3ccd8`](https://github.com/nodejs/node/commit/9e9ac3ccd8)] - **src**: avoid copy by using std::views::keys (Yagiz Nizipli) [#56080](https://github.com/nodejs/node/pull/56080)
- \[[`086cdc297a`](https://github.com/nodejs/node/commit/086cdc297a)] - **src**: remove obsolete NoArrayBufferZeroFillScope (James M Snell) [#56913](https://github.com/nodejs/node/pull/56913)
- \[[`915d7aeb37`](https://github.com/nodejs/node/commit/915d7aeb37)] - **src**: set signal inspector io thread name (RafaelGSS) [#56416](https://github.com/nodejs/node/pull/56416)
- \[[`f4b086d29d`](https://github.com/nodejs/node/commit/f4b086d29d)] - **src**: set thread name for main thread and v8 worker (RafaelGSS) [#56416](https://github.com/nodejs/node/pull/56416)
- \[[`3579143630`](https://github.com/nodejs/node/commit/3579143630)] - **src**: set worker thread name using worker.name (RafaelGSS) [#56416](https://github.com/nodejs/node/pull/56416)
- \[[`736ff5de6d`](https://github.com/nodejs/node/commit/736ff5de6d)] - **src**: use a default thread name for inspector (RafaelGSS) [#56416](https://github.com/nodejs/node/pull/56416)
- \[[`be8e2b4d8f`](https://github.com/nodejs/node/commit/be8e2b4d8f)] - **src**: improve error handling in permission.cc (James M Snell) [#56904](https://github.com/nodejs/node/pull/56904)
- \[[`d6cf0911ee`](https://github.com/nodejs/node/commit/d6cf0911ee)] - **src**: improve error handling in node_sqlite (James M Snell) [#56891](https://github.com/nodejs/node/pull/56891)
- \[[`521fed1bac`](https://github.com/nodejs/node/commit/521fed1bac)] - **src**: improve error handling in node_os by removing ToLocalChecked (James M Snell) [#56888](https://github.com/nodejs/node/pull/56888)
- \[[`c9a99df8e7`](https://github.com/nodejs/node/commit/c9a99df8e7)] - **src**: improve error handling in node_url (James M Snell) [#56886](https://github.com/nodejs/node/pull/56886)
- \[[`5c82ef3ace`](https://github.com/nodejs/node/commit/5c82ef3ace)] - **src**: add memory retainer traits for external types (Chengzhong Wu) [#56881](https://github.com/nodejs/node/pull/56881)
- \[[`edb194b2d5`](https://github.com/nodejs/node/commit/edb194b2d5)] - **src**: prevent URLPattern property accessors from crashing on invalid this (James M Snell) [#56877](https://github.com/nodejs/node/pull/56877)
- \[[`9624049414`](https://github.com/nodejs/node/commit/9624049414)] - **src**: pull in more electron boringssl adjustments (James M Snell) [#56858](https://github.com/nodejs/node/pull/56858)
- \[[`f8910e384d`](https://github.com/nodejs/node/commit/f8910e384d)] - **src**: make multiple improvements to node_url_pattern (James M Snell) [#56871](https://github.com/nodejs/node/pull/56871)
- \[[`94a0237b18`](https://github.com/nodejs/node/commit/94a0237b18)] - **src**: clean up some obsolete crypto methods (James M Snell) [#56792](https://github.com/nodejs/node/pull/56792)
- \[[`b240ca67b9`](https://github.com/nodejs/node/commit/b240ca67b9)] - **src**: add check for Bignum in GroupOrderSize (Burkov Egor) [#56702](https://github.com/nodejs/node/pull/56702)
- \[[`45692e9c7c`](https://github.com/nodejs/node/commit/45692e9c7c)] - **src, deps**: port electron's boringssl workarounds (James M Snell) [#56812](https://github.com/nodejs/node/pull/56812)
- \[[`a9d80d43cb`](https://github.com/nodejs/node/commit/a9d80d43cb)] - **(SEMVER-MINOR)** **src, quic**: refine more of the quic implementation (James M Snell) [#56328](https://github.com/nodejs/node/pull/56328)
- \[[`93d0beb6c8`](https://github.com/nodejs/node/commit/93d0beb6c8)] - **src,test**: expand test coverage for urlpattern and fix error (James M Snell) [#56878](https://github.com/nodejs/node/pull/56878)
- \[[`5a9732e1d0`](https://github.com/nodejs/node/commit/5a9732e1d0)] - **test**: improve timeout duration for debugger events (Yagiz Nizipli) [#56970](https://github.com/nodejs/node/pull/56970)
- \[[`60c8fc07ff`](https://github.com/nodejs/node/commit/60c8fc07ff)] - **test**: remove unnecessary syscall to cpuinfo (Yagiz Nizipli) [#56968](https://github.com/nodejs/node/pull/56968)
- \[[`40cdf756e6`](https://github.com/nodejs/node/commit/40cdf756e6)] - **test**: update webstorage wpt (Yagiz Nizipli) [#56963](https://github.com/nodejs/node/pull/56963)
- \[[`de77371a9e`](https://github.com/nodejs/node/commit/de77371a9e)] - **test**: execute shell directly for refresh() (Yagiz Nizipli) [#55051](https://github.com/nodejs/node/pull/55051)
- \[[`f4254b8e70`](https://github.com/nodejs/node/commit/f4254b8e70)] - **test**: automatically sync wpt urlpattern tests (Jonas) [#56949](https://github.com/nodejs/node/pull/56949)
- \[[`a473d3f57a`](https://github.com/nodejs/node/commit/a473d3f57a)] - **test**: update snapshots for amaro v0.3.2 (Marco Ippolito) [#56916](https://github.com/nodejs/node/pull/56916)
- \[[`abca97f7e2`](https://github.com/nodejs/node/commit/abca97f7e2)] - **test**: change jenkins reporter (Carlos Espa) [#56808](https://github.com/nodejs/node/pull/56808)
- \[[`7c9fa11127`](https://github.com/nodejs/node/commit/7c9fa11127)] - **test**: fix race condition in test-child-process-bad-stdio (Colin Ihrig) [#56845](https://github.com/nodejs/node/pull/56845)
- \[[`b8b6e68836`](https://github.com/nodejs/node/commit/b8b6e68836)] - **(SEMVER-MINOR)** **test**: add WPT for URLPattern (Yagiz Nizipli) [#56452](https://github.com/nodejs/node/pull/56452)
- \[[`b6d3d52e20`](https://github.com/nodejs/node/commit/b6d3d52e20)] - **test**: adjust check to use OpenSSL sec level (Michael Dawson) [#56819](https://github.com/nodejs/node/pull/56819)
- \[[`3beac87f92`](https://github.com/nodejs/node/commit/3beac87f92)] - **test**: test-crypto-scrypt.js doesn't need internals (Meghan Denny) [#56673](https://github.com/nodejs/node/pull/56673)
- \[[`3af23a10f3`](https://github.com/nodejs/node/commit/3af23a10f3)] - **test**: set `test-fs-cp` as flaky (Stefan Stojanovic) [#56799](https://github.com/nodejs/node/pull/56799)
- \[[`1146f48f67`](https://github.com/nodejs/node/commit/1146f48f67)] - **test**: search cctest files (Chengzhong Wu) [#56791](https://github.com/nodejs/node/pull/56791)
- \[[`86c199b25a`](https://github.com/nodejs/node/commit/86c199b25a)] - **test**: convert test_encoding_binding.cc to a JS test (Chengzhong Wu) [#56791](https://github.com/nodejs/node/pull/56791)
- \[[`bd5484717c`](https://github.com/nodejs/node/commit/bd5484717c)] - **test**: test-crypto-prime.js doesn't need internals (Meghan Denny) [#56675](https://github.com/nodejs/node/pull/56675)
- \[[`f5f54414e4`](https://github.com/nodejs/node/commit/f5f54414e4)] - **test**: temporary remove resource check from fs read-write (Rafael Gonzaga) [#56789](https://github.com/nodejs/node/pull/56789)
- \[[`c8bd2ba0ad`](https://github.com/nodejs/node/commit/c8bd2ba0ad)] - **test**: mark test-without-async-context-frame flaky on windows (James M Snell) [#56753](https://github.com/nodejs/node/pull/56753)
- \[[`2c2e4a4ae0`](https://github.com/nodejs/node/commit/2c2e4a4ae0)] - **test**: remove unnecessary code (Luigi Pinca) [#56784](https://github.com/nodejs/node/pull/56784)
- \[[`4606a5f79b`](https://github.com/nodejs/node/commit/4606a5f79b)] - **test**: mark `test-esm-loader-hooks-inspect-wait` flaky (Richard Lau) [#56803](https://github.com/nodejs/node/pull/56803)
- \[[`38c77e3462`](https://github.com/nodejs/node/commit/38c77e3462)] - **test**: update WPT for url to a23788b77a (Node.js GitHub Bot) [#56779](https://github.com/nodejs/node/pull/56779)
- \[[`50ebd5fd31`](https://github.com/nodejs/node/commit/50ebd5fd31)] - **test**: remove duplicate error reporter from ci (Carlos Espa) [#56739](https://github.com/nodejs/node/pull/56739)
- \[[`0c3ae25aec`](https://github.com/nodejs/node/commit/0c3ae25aec)] - **test_runner**: print formatted errors on summary (Pietro Marchini) [#56911](https://github.com/nodejs/node/pull/56911)
- \[[`b5a8a812fb`](https://github.com/nodejs/node/commit/b5a8a812fb)] - **tools**: bump eslint version (dependabot\[bot]) [#56869](https://github.com/nodejs/node/pull/56869)
- \[[`e1f86c1b9d`](https://github.com/nodejs/node/commit/e1f86c1b9d)] - **tools**: remove test-asan/ubsan workflows (Michaël Zasso) [#56823](https://github.com/nodejs/node/pull/56823)
- \[[`405a6678b7`](https://github.com/nodejs/node/commit/405a6678b7)] - **tools**: run macOS test workflow with Xcode 16.1 (Michaël Zasso) [#56831](https://github.com/nodejs/node/pull/56831)
- \[[`16529c130f`](https://github.com/nodejs/node/commit/16529c130f)] - **tools**: update sccache and sccache-action (Michaël Zasso) [#56815](https://github.com/nodejs/node/pull/56815)
- \[[`fe004111ea`](https://github.com/nodejs/node/commit/fe004111ea)] - **tools**: fix license-builder for inspector_protocol (Michaël Zasso) [#56814](https://github.com/nodejs/node/pull/56814)
- \[[`bc97a90176`](https://github.com/nodejs/node/commit/bc97a90176)] - **(SEMVER-MINOR)** **url**: add URLPattern implementation (Yagiz Nizipli) [#56452](https://github.com/nodejs/node/pull/56452)
- \[[`77294d8918`](https://github.com/nodejs/node/commit/77294d8918)] - **util**: enforce shouldColorize in styleText array arg (Marco Ippolito) [#56722](https://github.com/nodejs/node/pull/56722)
- \[[`8e6c191601`](https://github.com/nodejs/node/commit/8e6c191601)] - **zlib**: use modern class syntax for zstd classes (Yagiz Nizipli) [#56965](https://github.com/nodejs/node/pull/56965)
- \[[`a3ca7f37a2`](https://github.com/nodejs/node/commit/a3ca7f37a2)] - **zlib**: make all zstd functions experimental (Yagiz Nizipli) [#56964](https://github.com/nodejs/node/pull/56964)
- \[[`4cc7907738`](https://github.com/nodejs/node/commit/4cc7907738)] - **(SEMVER-MINOR)** **zlib**: add zstd support (Jan Krems) [#52100](https://github.com/nodejs/node/pull/52100)

Windows 64-bit Installer: https://nodejs.org/dist/v23.8.0/node-v23.8.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v23.8.0/node-v23.8.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v23.8.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v23.8.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v23.8.0/node-v23.8.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v23.8.0/node-v23.8.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v23.8.0/node-v23.8.0.tar.gz \
Other release files: https://nodejs.org/dist/v23.8.0/ \
Documentation: https://nodejs.org/docs/v23.8.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

7fefc7b97a47364a096d882f0ee3c43b4aa79fc472b17dc3ab3559da88cc48a7  node-v23.8.0-aix-ppc64.tar.gz
c1ee20f43adde04a84191a183f31b5b825206a98885d9c5b86dbd474b304a3e1  node-v23.8.0-arm64.msi
7c3bb4ccfd558f5cc12ffb81df795c5960e429088feb1ae650fa2ae65418858a  node-v23.8.0-darwin-arm64.tar.gz
5629dbad3255f0655228f2c3188bd1a765aaaec189fb495d20f1c570b626f122  node-v23.8.0-darwin-arm64.tar.xz
a4c93b517d51d368248e9fddd20bc46ba1f6081df2a55d267a33015a4ab31886  node-v23.8.0-darwin-x64.tar.gz
c2854c765cfd013409463f11d4099666ff2b45d8136b4c60e7844b117211f6f5  node-v23.8.0-darwin-x64.tar.xz
5b8daef6067d34974d7807ffcde0e3f4930420bbc8a1c0ad5fb61a46c769d247  node-v23.8.0-headers.tar.gz
0ba4536c31c67e897d2390e7c9c942a1711f4632d832e63e336bdda760264dcc  node-v23.8.0-headers.tar.xz
d603dcce61cd8f27440bd0cdb2688f5963a7ac6cd0f425e5c9ae8c93cfaaa134  node-v23.8.0-linux-arm64.tar.gz
0be81418587eee8ef2d7537243d808d15e12f3f8a8461dd39728bcdcc91c9c72  node-v23.8.0-linux-arm64.tar.xz
02194b458283fcc0f41f826829e2452dac4622f2386b0c29e374bc859daa70ce  node-v23.8.0-linux-armv7l.tar.gz
f9b874ff462f4b34801530eab802ce2c86be372ae7040f20b9d6e430f3557a19  node-v23.8.0-linux-armv7l.tar.xz
66e0e26a27db7ecb591c7d146ca63b727e452610a8adfb334d423bbb76563619  node-v23.8.0-linux-ppc64le.tar.gz
b7511b7fd5275a69ab868019a51837fe090a3ed5e5a63e3974bfbccf4fca0dd5  node-v23.8.0-linux-ppc64le.tar.xz
84996f533ddc37d720085a5134b898fd518b00fbc1f0f70a9a29fd3fd0df632d  node-v23.8.0-linux-s390x.tar.gz
204c462aab3557d205f2f4b72a468b84fac82fb4360a76630437d988e4614e57  node-v23.8.0-linux-s390x.tar.xz
f6d98bbdd0a4078c1e422a6a1d8bf07ad693a4dd793bb5772990456faeca6e95  node-v23.8.0-linux-x64.tar.gz
78d24ff80a52f7dd3a94542d7598163624fcda7be1d4777bc9161d8c8d15267f  node-v23.8.0-linux-x64.tar.xz
172e4c4e57983a94f6398fc29cafbb8aa1003526bf937742cd89df7e9b42b7c5  node-v23.8.0.pkg
23b5e0b0b6752a21c7af4e2361655a54ad499d3ae06b6f9af1dd311365b8496a  node-v23.8.0.tar.gz
6ec5d54d0e8423fc5986f6efa4f661e8370659818b14f458cdc9d1b9f75d3b88  node-v23.8.0.tar.xz
df941b65ae8a3b2975741487707f3c656519136000fb481753eb2ed053480324  node-v23.8.0-win-arm64.7z
13b44af66a6bf2938a6a6a8d96ea17e164852ece1b293d552bb45deb1acb1ba9  node-v23.8.0-win-arm64.zip
ef23a3cc0c27d4647e54266edabde8d4e24ea7768171ae7057a1a6c96f081575  node-v23.8.0-win-x64.7z
9e03646224fcf44fa0b594df5d012da9cb5b137c52f36f33b11def3319cd132c  node-v23.8.0-win-x64.zip
1cc6010559c43447a5573bacf8e91d18a8ceb2a36a8c26f3eda23ef820f116af  node-v23.8.0-x64.msi
c6b7d947c05b85d02e0829feae8843f6326a2a0ca1189bdf10c9f1431591aba5  win-arm64/node.exe
b04fc2c4f04273feaae3a2bc372d507fa631d7d6fd5f11265219d5b10d083a3e  win-arm64/node.lib
4ed598117177d60ef65899f0315ab63a861a4d2fb4d6dde116ed7f26bdaf2d3b  win-arm64/node_pdb.7z
d244d5237fcce8dbf22f6bf350b309187386c5df0d03a61a9df85fbe7456ce4c  win-arm64/node_pdb.zip
8a0e6be40de816f334e65eb2de19d4a9b833c413eb866015eac19dceca9c3edf  win-x64/node.exe
7005ad268c2a3b55e741957609696fd707982d8d7727325c44e2cbf23f00f565  win-x64/node.lib
38fbaeb11dd303086ec71a7198b84c09579ddbf4a3d80386434bc9bbd597ab5e  win-x64/node_pdb.7z
ca2c9b25c58cdfeadc11b51325f6d348fe7fa51dd600f1cec1de1d43558a8dab  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEj8yhP+8dDC6RAI4Jdw96mlrhVgAFAmeuLsYACgkQdw96mlrh
VgBnZw/+O7x8q1BobRqmGyPQrR3O5+FoysW2/fg4b4ZrtWHlfLskUC1BzRfvQJHy
lLQu+rZzuUDM9mM78+Q5Xo32RLoRQUuZ3tr2lWgXrPxzsixaJgGBCHzCmHIKNoh+
79Ta9y8Uqe6Edy2gWlqZE5lP2Ls9MAYvZU0C2wWsEKvl27VEmblfaf1eSJ3TnMlI
ou8cnr7qBDmc8qPRDmuO/ct3ZY/nNWl+jR43wKjINM6CEY60NZMLu2OFjpsiPEm+
/RAfjUgbp7IZcvFR5T3+GZuS2okdbUJQ/MKzqLLbSJeE4bSfwPskgNKGwK6lztjQ
lxDX10ADniRqDXDJ8klyPi1s7d8GS6efM9bmTi35Z/uxPQ/t1tdeQrACn8c/HXrG
SNs0/wXy2P4zxgw5cDVKHsMplHDbMmbHJFaUZa1EUyo5zjMUHiQX92H84vomjX4C
TBE5gc1qEewAhoqrd2/flF5vBPcSo6kXhPcIrCmKDYBh/DZvNvnEgAJlJVKKI4Zz
i1COmH08JnWeYlkvGthLyPQUJU0v2DDqsEouqLdnSc4sdmn9NKG9MWHBpGsxwtbC
cIJ3CEGPvV+T8thbulMy2UI5HTnq9Y8nZO2rj0n4ihbkt+b6k1WGmxpOohRIHlS4
Vls+vxQPbiRnp+atvFhBjIDtRMGZqtB+pYZEY5/EJH/b2rQgp88=
=PxAu
-----END PGP SIGNATURE-----
```
