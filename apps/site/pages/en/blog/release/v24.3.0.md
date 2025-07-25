---
date: '2025-06-24T23:05:50.672Z'
category: release
title: Node.js v24.3.0 (Current)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-06-24, Version 24.3.0 (Current), @RafaelGSS

### Notable Changes

- \[[`841609ac1c`](https://github.com/nodejs/node/commit/841609ac1c)] - **doc**: add islandryu to collaborators (Shima Ryuhei) [#58714](https://github.com/nodejs/node/pull/58714)
- \[[`839964ece8`](https://github.com/nodejs/node/commit/839964ece8)] - **(SEMVER-MINOR)** **fs**: allow correct handling of burst in fs-events with AsyncIterator (Philipp Dunkel) [#58490](https://github.com/nodejs/node/pull/58490)
- \[[`9b28f40834`](https://github.com/nodejs/node/commit/9b28f40834)] - **(SEMVER-MINOR)** **module**: remove experimental warning from type stripping (Marco Ippolito) [#58643](https://github.com/nodejs/node/pull/58643)
- \[[`7cdda927fa`](https://github.com/nodejs/node/commit/7cdda927fa)] - **test**: fix test-timeout-flag after revert of auto subtest wait (Pietro Marchini) [#58282](https://github.com/nodejs/node/pull/58282)
- \[[`dce1995c55`](https://github.com/nodejs/node/commit/dce1995c55)] - _**Revert**_ "**test_runner**: remove promises returned by t.test()" (Romain Menke) [#58282](https://github.com/nodejs/node/pull/58282)
- \[[`8b0c5edbb6`](https://github.com/nodejs/node/commit/8b0c5edbb6)] - _**Revert**_ "**test_runner**: remove promises returned by test()" (Romain Menke) [#58282](https://github.com/nodejs/node/pull/58282)
- \[[`713fbad7b6`](https://github.com/nodejs/node/commit/713fbad7b6)] - **(SEMVER-MINOR)** **test_runner**: support object property mocking (Idan Goshen) [#58438](https://github.com/nodejs/node/pull/58438)
- \[[`ef0230abaf`](https://github.com/nodejs/node/commit/ef0230abaf)] - **(SEMVER-MINOR)** **url**: add fileURLToPathBuffer API (James M Snell) [#58700](https://github.com/nodejs/node/pull/58700)

### Commits

- \[[`2ba2c93dee`](https://github.com/nodejs/node/commit/2ba2c93dee)] - **build**: fix typo 'Stoage' to 'Storage' in help text (ganglike) [#58777](https://github.com/nodejs/node/pull/58777)
- \[[`11811c15da`](https://github.com/nodejs/node/commit/11811c15da)] - **deps**: update nghttp2 to 1.66.0 (Node.js GitHub Bot) [#58786](https://github.com/nodejs/node/pull/58786)
- \[[`7643ce9322`](https://github.com/nodejs/node/commit/7643ce9322)] - **deps**: update acorn to 8.15.0 (Node.js GitHub Bot) [#58711](https://github.com/nodejs/node/pull/58711)
- \[[`4b61f10eb6`](https://github.com/nodejs/node/commit/4b61f10eb6)] - **deps**: V8: cherry-pick e3df60f3f5ab (Chengzhong Wu) [#58691](https://github.com/nodejs/node/pull/58691)
- \[[`fa6854f083`](https://github.com/nodejs/node/commit/fa6854f083)] - **deps**: update amaro to 1.1.0 (Node.js GitHub Bot) [#58754](https://github.com/nodejs/node/pull/58754)
- \[[`68671f4314`](https://github.com/nodejs/node/commit/68671f4314)] - **deps**: upgrade npm to 11.4.2 (npm team) [#58696](https://github.com/nodejs/node/pull/58696)
- \[[`450f4815b3`](https://github.com/nodejs/node/commit/450f4815b3)] - **deps**: update amaro to 1.0.0 (Node.js GitHub Bot) [#58639](https://github.com/nodejs/node/pull/58639)
- \[[`3aa2762e96`](https://github.com/nodejs/node/commit/3aa2762e96)] - **deps**: update sqlite to 3.50.1 (Node.js GitHub Bot) [#58630](https://github.com/nodejs/node/pull/58630)
- \[[`80eac147e6`](https://github.com/nodejs/node/commit/80eac147e6)] - **deps**: update simdjson to 3.13.0 (Node.js GitHub Bot) [#58629](https://github.com/nodejs/node/pull/58629)
- \[[`dc1023878c`](https://github.com/nodejs/node/commit/dc1023878c)] - **deps**: update zlib to 1.3.1-470d3a2 (Node.js GitHub Bot) [#58628](https://github.com/nodejs/node/pull/58628)
- \[[`97fbfd82af`](https://github.com/nodejs/node/commit/97fbfd82af)] - **doc**: fix stability 1.x links excluding the decimal digit (Dario Piotrowicz) [#58783](https://github.com/nodejs/node/pull/58783)
- \[[`e2e88d4971`](https://github.com/nodejs/node/commit/e2e88d4971)] - **doc**: fix wrong RFC number in http2 (Deokjin Kim) [#58753](https://github.com/nodejs/node/pull/58753)
- \[[`7bb1246c8f`](https://github.com/nodejs/node/commit/7bb1246c8f)] - **doc**: add history entry for TS support in hooks (Antoine du Hamel) [#58732](https://github.com/nodejs/node/pull/58732)
- \[[`f125310d3a`](https://github.com/nodejs/node/commit/f125310d3a)] - **doc**: run license-builder (github-actions\[bot]) [#58722](https://github.com/nodejs/node/pull/58722)
- \[[`841609ac1c`](https://github.com/nodejs/node/commit/841609ac1c)] - **doc**: add islandryu to collaborators (Shima Ryuhei) [#58714](https://github.com/nodejs/node/pull/58714)
- \[[`1cc77c7ee6`](https://github.com/nodejs/node/commit/1cc77c7ee6)] - **doc**: punctuation fix for Node-API versioning clarification (Jiacai Liu) [#58599](https://github.com/nodejs/node/pull/58599)
- \[[`d59680348e`](https://github.com/nodejs/node/commit/d59680348e)] - **doc**: add path rules and validation for export targets in package.json (0hm☘️) [#58604](https://github.com/nodejs/node/pull/58604)
- \[[`b6760b3379`](https://github.com/nodejs/node/commit/b6760b3379)] - **esm**: syncify default path of `ModuleLoader.load` (Jacob Smith) [#57419](https://github.com/nodejs/node/pull/57419)
- \[[`96c78d726c`](https://github.com/nodejs/node/commit/96c78d726c)] - **fs**: make `Dir` disposers idempotent (René) [#58692](https://github.com/nodejs/node/pull/58692)
- \[[`62b5879d88`](https://github.com/nodejs/node/commit/62b5879d88)] - **fs**: avoid computing time coefficient constants in runtime (Livia Medeiros) [#58728](https://github.com/nodejs/node/pull/58728)
- \[[`af18c0e81a`](https://github.com/nodejs/node/commit/af18c0e81a)] - **fs**: remove IIFE in glob (LiviaMedeiros) [#58418](https://github.com/nodejs/node/pull/58418)
- \[[`fb4378b72e`](https://github.com/nodejs/node/commit/fb4378b72e)] - **fs**: add UV_ENOSPC to list of things to pass to err directly (Jacky Zhao) [#56918](https://github.com/nodejs/node/pull/56918)
- \[[`839964ece8`](https://github.com/nodejs/node/commit/839964ece8)] - **(SEMVER-MINOR)** **fs**: allow correct handling of burst in fs-events with AsyncIterator (Philipp Dunkel) [#58490](https://github.com/nodejs/node/pull/58490)
- \[[`c9dc0a8903`](https://github.com/nodejs/node/commit/c9dc0a8903)] - **http**: fix keep-alive not timing out after post-request empty line (Shima Ryuhei) [#58178](https://github.com/nodejs/node/pull/58178)
- \[[`b11da1115e`](https://github.com/nodejs/node/commit/b11da1115e)] - **http2**: fix DEP0194 message (KaKa) [#58669](https://github.com/nodejs/node/pull/58669)
- \[[`b1f60d2f18`](https://github.com/nodejs/node/commit/b1f60d2f18)] - **http2**: add diagnostics channel 'http2.server.stream.close' (Darshan Sen) [#58602](https://github.com/nodejs/node/pull/58602)
- \[[`be93091694`](https://github.com/nodejs/node/commit/be93091694)] - **inspector**: add protocol methods retrieving sent/received data (Chengzhong Wu) [#58645](https://github.com/nodejs/node/pull/58645)
- \[[`20089e2a2e`](https://github.com/nodejs/node/commit/20089e2a2e)] - **lib**: rename `validateInternalField` into `validateThisInternalField` (LiviaMedeiros) [#58765](https://github.com/nodejs/node/pull/58765)
- \[[`74983832f9`](https://github.com/nodejs/node/commit/74983832f9)] - **lib**: make `validateInternalField()` throw `ERR_INVALID_THIS` (LiviaMedeiros) [#58765](https://github.com/nodejs/node/pull/58765)
- \[[`081c70878f`](https://github.com/nodejs/node/commit/081c70878f)] - **lib**: make domexception a native error (Chengzhong Wu) [#58691](https://github.com/nodejs/node/pull/58691)
- \[[`6390f70da2`](https://github.com/nodejs/node/commit/6390f70da2)] - **lib,src**: support DOMException ser-des (Chengzhong Wu) [#58649](https://github.com/nodejs/node/pull/58649)
- \[[`4c2c100f63`](https://github.com/nodejs/node/commit/4c2c100f63)] - **meta**: add @nodejs/inspector as codeowner (Chengzhong Wu) [#58790](https://github.com/nodejs/node/pull/58790)
- \[[`ff8a3691c4`](https://github.com/nodejs/node/commit/ff8a3691c4)] - **module**: fix typescript import.meta.main (Marco Ippolito) [#58661](https://github.com/nodejs/node/pull/58661)
- \[[`45f7d160ed`](https://github.com/nodejs/node/commit/45f7d160ed)] - **module**: refactor commonjs typescript loader (Marco Ippolito) [#58657](https://github.com/nodejs/node/pull/58657)
- \[[`9b28f40834`](https://github.com/nodejs/node/commit/9b28f40834)] - **(SEMVER-MINOR)** **module**: remove experimental warning from type stripping (Marco Ippolito) [#58643](https://github.com/nodejs/node/pull/58643)
- \[[`a3c7a63c73`](https://github.com/nodejs/node/commit/a3c7a63c73)] - **module**: allow cycles in require() in the CJS handling in ESM loader (Joyee Cheung) [#58598](https://github.com/nodejs/node/pull/58598)
- \[[`d0e42ffa58`](https://github.com/nodejs/node/commit/d0e42ffa58)] - **repl**: avoid deprecated `require.extensions` in tab completion (baki gul) [#58653](https://github.com/nodejs/node/pull/58653)
- \[[`82b18ba890`](https://github.com/nodejs/node/commit/82b18ba890)] - **repl**: fix tab completion not working with computer string properties (Dario Piotrowicz) [#58709](https://github.com/nodejs/node/pull/58709)
- \[[`8c2089683e`](https://github.com/nodejs/node/commit/8c2089683e)] - **src**: add FromV8Value\<T>() for integral and enum types (Aditi) [#57931](https://github.com/nodejs/node/pull/57931)
- \[[`a0b1378a20`](https://github.com/nodejs/node/commit/a0b1378a20)] - **src**: pass resource on permission checks for spawn (Rafael Gonzaga) [#58758](https://github.com/nodejs/node/pull/58758)
- \[[`dfb0144490`](https://github.com/nodejs/node/commit/dfb0144490)] - **src**: enhance error messages for unknown options (Pietro Marchini) [#58677](https://github.com/nodejs/node/pull/58677)
- \[[`e9c6fa514c`](https://github.com/nodejs/node/commit/e9c6fa514c)] - **src**: replace std::array with static arrays in contextify (Mert Can Altin) [#58580](https://github.com/nodejs/node/pull/58580)
- \[[`4347ce3dba`](https://github.com/nodejs/node/commit/4347ce3dba)] - **src**: add new CopyUtimes function to reduce code duplication (Dario Piotrowicz) [#58625](https://github.com/nodejs/node/pull/58625)
- \[[`893999e0ee`](https://github.com/nodejs/node/commit/893999e0ee)] - **src**: replace V8 Fast API todo comment with note comment (Dario Piotrowicz) [#58614](https://github.com/nodejs/node/pull/58614)
- \[[`7cdda927fa`](https://github.com/nodejs/node/commit/7cdda927fa)] - **test**: fix test-timeout-flag after revert of auto subtest wait (Pietro Marchini) [#58282](https://github.com/nodejs/node/pull/58282)
- \[[`d9c2b7054b`](https://github.com/nodejs/node/commit/d9c2b7054b)] - **test**: refactor repl save-load tests (Dario Piotrowicz) [#58715](https://github.com/nodejs/node/pull/58715)
- \[[`3faa4e8b56`](https://github.com/nodejs/node/commit/3faa4e8b56)] - **test**: deflake test-buffer-large-size-buffer-alloc-unsafe (Luigi Pinca) [#58771](https://github.com/nodejs/node/pull/58771)
- \[[`8eec789888`](https://github.com/nodejs/node/commit/8eec789888)] - **test**: correct SIMD support comment (Richard Lau) [#58767](https://github.com/nodejs/node/pull/58767)
- \[[`6e0ee39b6d`](https://github.com/nodejs/node/commit/6e0ee39b6d)] - **test**: skip the test if the buffer allocation fails (Luigi Pinca) [#58738](https://github.com/nodejs/node/pull/58738)
- \[[`d94b184700`](https://github.com/nodejs/node/commit/d94b184700)] - **test**: deflake test-buffer-large-size-buffer-alloc (Luigi Pinca) [#58734](https://github.com/nodejs/node/pull/58734)
- \[[`704b1fa075`](https://github.com/nodejs/node/commit/704b1fa075)] - **test**: add tests for REPL custom evals (Dario Piotrowicz) [#57850](https://github.com/nodejs/node/pull/57850)
- \[[`c39d570871`](https://github.com/nodejs/node/commit/c39d570871)] - **test**: reduce the use of private symbols in test-events-once.js (Yoshiya Hinosawa) [#58685](https://github.com/nodejs/node/pull/58685)
- \[[`b7e488c77f`](https://github.com/nodejs/node/commit/b7e488c77f)] - **test**: refactor repl tab complete tests (Dario Piotrowicz) [#58636](https://github.com/nodejs/node/pull/58636)
- \[[`ec808b3e06`](https://github.com/nodejs/node/commit/ec808b3e06)] - **test**: use `common.skipIfInspectorDisabled()` to skip tests (Dario Piotrowicz) [#58675](https://github.com/nodejs/node/pull/58675)
- \[[`94e53d4f6c`](https://github.com/nodejs/node/commit/94e53d4f6c)] - **test**: update WPT for urlpattern to 3ffda23e5a (Node.js GitHub Bot) [#58537](https://github.com/nodejs/node/pull/58537)
- \[[`fa089d610f`](https://github.com/nodejs/node/commit/fa089d610f)] - **test**: update WPT for dom/abort to dc928169ee (Node.js GitHub Bot) [#58644](https://github.com/nodejs/node/pull/58644)
- \[[`aa657f0fc4`](https://github.com/nodejs/node/commit/aa657f0fc4)] - **test**: split indirect eval import tests (Chengzhong Wu) [#58637](https://github.com/nodejs/node/pull/58637)
- \[[`76e3c8aaf2`](https://github.com/nodejs/node/commit/76e3c8aaf2)] - **test**: update WPT for es-exceptions to 2f96fa1996 (Node.js GitHub Bot) [#58640](https://github.com/nodejs/node/pull/58640)
- \[[`7e34aa4eaa`](https://github.com/nodejs/node/commit/7e34aa4eaa)] - **test**: skip tests failing when run under root (Livia Medeiros) [#58610](https://github.com/nodejs/node/pull/58610)
- \[[`85f062c22e`](https://github.com/nodejs/node/commit/85f062c22e)] - **test**: deflake async-hooks/test-improper-order on AIX (Baki Gul) [#58567](https://github.com/nodejs/node/pull/58567)
- \[[`181014a8fe`](https://github.com/nodejs/node/commit/181014a8fe)] - **test**: cleanup status files (Filip Skokan) [#58633](https://github.com/nodejs/node/pull/58633)
- \[[`a4d756068d`](https://github.com/nodejs/node/commit/a4d756068d)] - **test**: close FileHandle objects in tests explicitly (James M Snell) [#58615](https://github.com/nodejs/node/pull/58615)
- \[[`a1529d5d99`](https://github.com/nodejs/node/commit/a1529d5d99)] - **test_runner**: automatically wait for subtests to finish (Colin Ihrig) [#58800](https://github.com/nodejs/node/pull/58800)
- \[[`dce1995c55`](https://github.com/nodejs/node/commit/dce1995c55)] - _**Revert**_ "**test_runner**: remove promises returned by t.test()" (Romain Menke) [#58282](https://github.com/nodejs/node/pull/58282)
- \[[`8b0c5edbb6`](https://github.com/nodejs/node/commit/8b0c5edbb6)] - _**Revert**_ "**test_runner**: remove promises returned by test()" (Romain Menke) [#58282](https://github.com/nodejs/node/pull/58282)
- \[[`6ef7329c8c`](https://github.com/nodejs/node/commit/6ef7329c8c)] - _**Revert**_ "**test_runner**: automatically wait for subtests to finish" (Romain Menke) [#58282](https://github.com/nodejs/node/pull/58282)
- \[[`c9e7b5e43a`](https://github.com/nodejs/node/commit/c9e7b5e43a)] - **test_runner**: prefer `Atomics` primordials (Renegade334) [#58716](https://github.com/nodejs/node/pull/58716)
- \[[`713fbad7b6`](https://github.com/nodejs/node/commit/713fbad7b6)] - **(SEMVER-MINOR)** **test_runner**: support object property mocking (Idan Goshen) [#58438](https://github.com/nodejs/node/pull/58438)
- \[[`9df1cfe402`](https://github.com/nodejs/node/commit/9df1cfe402)] - **tools**: make nodedownload module compatible with Python 3.14 (Lumír 'Frenzy' Balhar) [#58752](https://github.com/nodejs/node/pull/58752)
- \[[`b5ff3f42b8`](https://github.com/nodejs/node/commit/b5ff3f42b8)] - **tools**: include toolchain.gypi in abseil.gyp (Chengzhong Wu) [#58678](https://github.com/nodejs/node/pull/58678)
- \[[`dc2f23e986`](https://github.com/nodejs/node/commit/dc2f23e986)] - **tools**: bump `brace-expansion` in `/tools/clang-format` (dependabot\[bot]) [#58699](https://github.com/nodejs/node/pull/58699)
- \[[`e6a1787140`](https://github.com/nodejs/node/commit/e6a1787140)] - **tools**: bump brace-expansion from 1.1.11 to 1.1.12 in /tools/eslint (dependabot\[bot]) [#58698](https://github.com/nodejs/node/pull/58698)
- \[[`b22e970774`](https://github.com/nodejs/node/commit/b22e970774)] - **tools**: switch to `@stylistic/eslint-plugin` (Michaël Zasso) [#58623](https://github.com/nodejs/node/pull/58623)
- \[[`268c8c1799`](https://github.com/nodejs/node/commit/268c8c1799)] - **tools**: remove config.status under `make distclean` (René) [#58603](https://github.com/nodejs/node/pull/58603)
- \[[`c1f9791844`](https://github.com/nodejs/node/commit/c1f9791844)] - **tools**: edit commit-queue workflow file (Antoine du Hamel) [#58667](https://github.com/nodejs/node/pull/58667)
- \[[`afbaf9277b`](https://github.com/nodejs/node/commit/afbaf9277b)] - **tools**: improve release proposal linter (Antoine du Hamel) [#58647](https://github.com/nodejs/node/pull/58647)
- \[[`17df800b90`](https://github.com/nodejs/node/commit/17df800b90)] - **typings**: add Atomics primordials (Renegade334) [#58577](https://github.com/nodejs/node/pull/58577)
- \[[`ffff8ce3a4`](https://github.com/nodejs/node/commit/ffff8ce3a4)] - **typings**: add ZSTD_COMPRESS, ZSTD_DECOMPRESS to internalBinding (Meghan Denny) [#58655](https://github.com/nodejs/node/pull/58655)
- \[[`ef0230abaf`](https://github.com/nodejs/node/commit/ef0230abaf)] - **(SEMVER-MINOR)** **url**: add fileURLToPathBuffer API (James M Snell) [#58700](https://github.com/nodejs/node/pull/58700)
- \[[`6f7b89516f`](https://github.com/nodejs/node/commit/6f7b89516f)] - **util**: inspect: do not crash on an Error stack pointing to itself (Sam Verschueren) [#58196](https://github.com/nodejs/node/pull/58196)

Windows 64-bit Installer: https://nodejs.org/dist/v24.3.0/node-v24.3.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.3.0/node-v24.3.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.3.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.3.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.3.0/node-v24.3.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.3.0/node-v24.3.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.3.0/node-v24.3.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.3.0/node-v24.3.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.3.0/node-v24.3.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.3.0/node-v24.3.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.3.0/node-v24.3.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.3.0/node-v24.3.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.3.0/node-v24.3.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.3.0/ \
Documentation: https://nodejs.org/docs/v24.3.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

8dba56a4ecdfac96cb659d153fce30e7718829cb414d4d853cea9f00a6223362  node-v24.3.0-aix-ppc64.tar.gz
b4eaa21f8d331807e19df6ae35abdfbf24d77a54e15ef3f2bb3036becc6012b8  node-v24.3.0-arm64.msi
fee91aa5febeda47ef9f6c0afd2f2bcd3dacb0e656c29de0b5274e0ea1ca3565  node-v24.3.0-darwin-arm64.tar.gz
11994ecf21c5e2c1b247df18969a6d0be60a8cfc70a9092d5f4535d3a6df5087  node-v24.3.0-darwin-arm64.tar.xz
0c065ffa4e53b1a172ab9cd8ca08ae141b187aca8a07403c6856a7b8d0024804  node-v24.3.0-darwin-x64.tar.gz
b1ee1cffb39ff6b47c7da9b9da7f2dd01713334b4bae7b2595954237d94cfac7  node-v24.3.0-darwin-x64.tar.xz
045e9bf477cd5db0ec67f8c1a63ba7f784dedfe2c581e3d0ed09b88e9115dd07  node-v24.3.0-headers.tar.gz
4a655fd9759f0be1e3e78d99590e8ef08386fdc45dab9aa909aa86408353e14e  node-v24.3.0-headers.tar.xz
371fc060d5dd4de565586c3cc70034956db67a8f3dae0f0e5724fa56147c472a  node-v24.3.0-linux-arm64.tar.gz
9729d0ecc69fad6591e4e19b46854881e8cc9d865cf03fc951a8abc567854f5e  node-v24.3.0-linux-arm64.tar.xz
2f3979aa58e30b78205a319f2bcb4c21f849d1f4a31acb753c63a0508046e87f  node-v24.3.0-linux-ppc64le.tar.gz
88a3f44fed8105bd74eee678933cfcf2c1c4ea0828b60e76a9c6ca687195a889  node-v24.3.0-linux-ppc64le.tar.xz
bb5ca45bab065d7a23cdfda7e682b0aa6c64a3756c92bfc2bf13831731cd6324  node-v24.3.0-linux-s390x.tar.gz
ae3660a75a2c13db674ef4b906739eb4c0aafdaa6b8f7e72cf4a5b3af61052ba  node-v24.3.0-linux-s390x.tar.xz
bbeb5fb8113b44fc30f5a5887dbc0ab66af8e56139f5f9fbe7c7a1aa056246dc  node-v24.3.0-linux-x64.tar.gz
a962afadaa8b94bae8bff87ddd6c11f7aae621032424ef05c0a4fe2537fa4de0  node-v24.3.0-linux-x64.tar.xz
96dd060e08c825d0d1d53f5ebcc35f03a3e2b59e1242ceabdb7251aeee8312a1  node-v24.3.0-win-arm64.7z
95ff08f6b2763d8491faba46b3a0ba1fb2045e029484494235b20b17c9053208  node-v24.3.0-win-arm64.zip
c299a9f61c19910112831bc4ab7bde4985a1865b49d92453e26a62bd509b95b2  node-v24.3.0-win-x64.7z
c0c8efbca1b57e5b074bbdf7cef1ccca40979d6b46e5bcadaad5d4b07cbb3b10  node-v24.3.0-win-x64.zip
9c3d2d010c0c6f47deb15ea3670c36da29009aaab9b4b76bd7d97862b5b3f402  node-v24.3.0-x64.msi
5d26dfb26af1b65ce3c739695425da4f215d560d69b43d1845ecd34b029860c7  node-v24.3.0.pkg
f8cc1dcde9b76fa380765204fefbb98e51123e52c919ba4adcf4ccd235bbf70b  node-v24.3.0.tar.gz
eb688ef8a63fda9ebc0b5f907609a46e26db6d9aceefc0832009a98371e992ed  node-v24.3.0.tar.xz
2817d1d820ce1fccfe214761265d1423f036ceff367b406382b08ba2d6b0dc0c  win-arm64/node.exe
6809fc156673d10cca7dff0e54f28309bb111d235c54493a4a0ca401c2113be7  win-arm64/node.lib
40a984b26479f25ff35e82eb7c24344bb03dfe13c9ca3f1cc686614e21d0f6d6  win-arm64/node_pdb.7z
4cf90bca613e0ba98fb124e540da98d7a4e80f8fa82c9b8ee5b015e3c1f3e951  win-arm64/node_pdb.zip
f92545eb2742aff13dc8efe5b0ebcef77f789020ba15926252ed749b2cf0784d  win-x64/node.exe
34882ca2bb450431047f2dd3bae1c3b8c1cd2b4cffd5c1a0bf079948846d2b83  win-x64/node.lib
8d78f6a20eae820243188f444db3ba24c2e2f2a7f27d1cd5ba6e85d0793972e0  win-x64/node_pdb.7z
3500676b94e033f904879fd70ffdae75a4dd87463df985769e5919ba0a5bcb65  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmhbLf4ACgkQi+q0389V
XvQjOAwAtugJLDD82rAkLUI+z8uJDtMvmOxKkHsKae4TF76fTdbJOcIduREsu3kI
d2V7d2uueESUXNwKql8hI1jb7VDQkmrtpI7GonZmXKCpY4Kl2etxxxeWjTZEhEMh
XZ377EpxYtxoMG6wKxLvZJKcVfouFRBS4MPmbqW1I9N1G3p0uhapHbVALpO5+6jl
DGHfV4/hEHxK/AHPlYuQ7MNohS86OCwLXiI/QDK5SWOL9O0Q+qty8sOosfpiYq+P
23ZRR2EXv9yZXa9qAYjdMezEMo/Xj2j28hpYuJXZ3XIrcGxTk9EWKIewpaetPa+4
ZGxfw0mDZn/pXifKx4Qxj1sbOX20X9vNckD5IyVPmpJELgIQuimof+cxdftnm6bE
7+zMsOlgbZJAc8jvsaht8vWeXHcmQMjfRddXSz6MEy+q4aHWQIdkiaw+M3jko1kJ
qOaSHCQyplUXhF7DqSDkbdmSqCk00l7J/rr30WZKcbQQDFPDjevSfr31UefjD8Gi
SeXZaF57
=QiZg
-----END PGP SIGNATURE-----
```
