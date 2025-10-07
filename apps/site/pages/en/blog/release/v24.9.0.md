---
date: '2025-09-25T19:49:30.271Z'
category: release
title: Node.js v24.9.0 (Current)
layout: blog-post
author: Michaël Zasso
---

## 2025-09-25, Version 24.9.0 (Current), @targos

### Notable Changes

- \[[`9b043a9096`](https://github.com/nodejs/node/commit/9b043a9096)] - **(SEMVER-MINOR)** **http**: add shouldUpgradeCallback to let servers control HTTP upgrades (Tim Perry) [#59824](https://github.com/nodejs/node/pull/59824)
- \[[`a6456ab90a`](https://github.com/nodejs/node/commit/a6456ab90a)] - **(SEMVER-MINOR)** **sqlite**: cleanup ERM support and export Session class (James M Snell) [#58378](https://github.com/nodejs/node/pull/58378)
- \[[`5563361d22`](https://github.com/nodejs/node/commit/5563361d22)] - **(SEMVER-MINOR)** **sqlite**: add tagged template (0hm☘️) [#58748](https://github.com/nodejs/node/pull/58748)
- \[[`04013ee933`](https://github.com/nodejs/node/commit/04013ee933)] - **(SEMVER-MINOR)** **worker**: add heap profile API (theanarkh) [#59846](https://github.com/nodejs/node/pull/59846)

### Commits

- \[[`cbec4fd6de`](https://github.com/nodejs/node/commit/cbec4fd6de)] - **benchmark**: calibrate config dgram multi-buffer (Bruno Rodrigues) [#59696](https://github.com/nodejs/node/pull/59696)
- \[[`9a4bbdc3c5`](https://github.com/nodejs/node/commit/9a4bbdc3c5)] - **benchmark**: calibrate config cluster/echo.js (Nam Yooseong) [#59836](https://github.com/nodejs/node/pull/59836)
- \[[`0b284d86e8`](https://github.com/nodejs/node/commit/0b284d86e8)] - **build**: add the missing macro definitions for OpenHarmony (hqzing) [#59804](https://github.com/nodejs/node/pull/59804)
- \[[`43e6e54d66`](https://github.com/nodejs/node/commit/43e6e54d66)] - **build**: do not include custom ESLint rules testing in tarball (Antoine du Hamel) [#59809](https://github.com/nodejs/node/pull/59809)
- \[[`039ac19154`](https://github.com/nodejs/node/commit/039ac19154)] - **crypto**: expose signatureAlgorithm on X509Certificate (Patrick Costa) [#59235](https://github.com/nodejs/node/pull/59235)
- \[[`647c332704`](https://github.com/nodejs/node/commit/647c332704)] - **crypto**: use `return await` when returning Promises from async functions (Renegade334) [#59841](https://github.com/nodejs/node/pull/59841)
- \[[`8ed4587cf0`](https://github.com/nodejs/node/commit/8ed4587cf0)] - **crypto**: use async functions for non-stub Promise-returning functions (Renegade334) [#59841](https://github.com/nodejs/node/pull/59841)
- \[[`bb051c56ef`](https://github.com/nodejs/node/commit/bb051c56ef)] - **crypto**: avoid calls to `promise.catch()` (Renegade334) [#59841](https://github.com/nodejs/node/pull/59841)
- \[[`05e560dd25`](https://github.com/nodejs/node/commit/05e560dd25)] - **deps**: update googletest to 50b8600 (Node.js GitHub Bot) [#59955](https://github.com/nodejs/node/pull/59955)
- \[[`fa40d3a785`](https://github.com/nodejs/node/commit/fa40d3a785)] - **deps**: update archs files for openssl-3.5.3 (Node.js GitHub Bot) [#59901](https://github.com/nodejs/node/pull/59901)
- \[[`8c85570d18`](https://github.com/nodejs/node/commit/8c85570d18)] - **deps**: upgrade openssl sources to openssl-3.5.3 (Node.js GitHub Bot) [#59901](https://github.com/nodejs/node/pull/59901)
- \[[`b71125664e`](https://github.com/nodejs/node/commit/b71125664e)] - **deps**: update undici to 7.16.0 (Node.js GitHub Bot) [#59830](https://github.com/nodejs/node/pull/59830)
- \[[`dea5dd7077`](https://github.com/nodejs/node/commit/dea5dd7077)] - **dgram**: restore buffer optimization in fixBufferList (Yoo) [#59934](https://github.com/nodejs/node/pull/59934)
- \[[`b0c1e67532`](https://github.com/nodejs/node/commit/b0c1e67532)] - **diagnostics_channel**: fix race condition with diagnostics_channel and GC (Ugaitz Urien) [#59910](https://github.com/nodejs/node/pull/59910)
- \[[`0b37b594c3`](https://github.com/nodejs/node/commit/0b37b594c3)] - **doc**: use "WebAssembly" instead of "Web Assembly" (Tobias Nießen) [#59954](https://github.com/nodejs/node/pull/59954)
- \[[`1e723f9c6b`](https://github.com/nodejs/node/commit/1e723f9c6b)] - **doc**: fix typo in section on microtask order (Tobias Nießen) [#59932](https://github.com/nodejs/node/pull/59932)
- \[[`a28962a85c`](https://github.com/nodejs/node/commit/a28962a85c)] - **doc**: update V8 fast API guidance (René) [#58999](https://github.com/nodejs/node/pull/58999)
- \[[`bd767c5d1b`](https://github.com/nodejs/node/commit/bd767c5d1b)] - **doc**: add security escalation policy (Ulises Gascón) [#59806](https://github.com/nodejs/node/pull/59806)
- \[[`9df91e59e1`](https://github.com/nodejs/node/commit/9df91e59e1)] - **doc**: type improvement of file `http.md` (yusheng chen) [#58189](https://github.com/nodejs/node/pull/58189)
- \[[`e4f571680b`](https://github.com/nodejs/node/commit/e4f571680b)] - **doc**: deprecate closing `fs.Dir` on garbage collection (Livia Medeiros) [#59839](https://github.com/nodejs/node/pull/59839)
- \[[`e9cb986fa5`](https://github.com/nodejs/node/commit/e9cb986fa5)] - **doc**: rephrase dynamic import() description (Nam Yooseong) [#59224](https://github.com/nodejs/node/pull/59224)
- \[[`026d4e33f7`](https://github.com/nodejs/node/commit/026d4e33f7)] - **doc,crypto**: update subtle.generateKey and subtle.importKey (Filip Skokan) [#59851](https://github.com/nodejs/node/pull/59851)
- \[[`2b2591db52`](https://github.com/nodejs/node/commit/2b2591db52)] - **esm**: make hasAsyncGraph non-enumerable (Joyee Cheung) [#59905](https://github.com/nodejs/node/pull/59905)
- \[[`993f05d323`](https://github.com/nodejs/node/commit/993f05d323)] - **fs,win**: do not add a second trailing slash in readdir (Gerhard Stöbich) [#59847](https://github.com/nodejs/node/pull/59847)
- \[[`7aec53b607`](https://github.com/nodejs/node/commit/7aec53b607)] - **(SEMVER-MINOR)** **http**: add shouldUpgradeCallback to let servers control HTTP upgrades (Tim Perry) [#59824](https://github.com/nodejs/node/pull/59824)
- \[[`83ae6102e7`](https://github.com/nodejs/node/commit/83ae6102e7)] - **http**: optimize checkIsHttpToken for short strings (방진혁) [#59832](https://github.com/nodejs/node/pull/59832)
- \[[`6695067636`](https://github.com/nodejs/node/commit/6695067636)] - **http,https**: handle IPv6 with proxies (Joyee Cheung) [#59894](https://github.com/nodejs/node/pull/59894)
- \[[`c5d910a0a9`](https://github.com/nodejs/node/commit/c5d910a0a9)] - **http2**: fix allowHttp1+Upgrade, broken by shouldUpgradeCallback (Tim Perry) [#59924](https://github.com/nodejs/node/pull/59924)
- \[[`acada1fb82`](https://github.com/nodejs/node/commit/acada1fb82)] - **inspector**: ensure adequate memory allocation for `Binary::toBase64` (René) [#59870](https://github.com/nodejs/node/pull/59870)
- \[[`396cc8ec65`](https://github.com/nodejs/node/commit/396cc8ec65)] - **lib**: update inspect output format for subclasses (Miguel Marcondes Filho) [#59687](https://github.com/nodejs/node/pull/59687)
- \[[`fed1dac8de`](https://github.com/nodejs/node/commit/fed1dac8de)] - **lib**: update isDeepStrictEqual to support options (Miguel Marcondes Filho) [#59762](https://github.com/nodejs/node/pull/59762)
- \[[`d785929fd7`](https://github.com/nodejs/node/commit/d785929fd7)] - **lib**: add source map support for assert messages (Chengzhong Wu) [#59751](https://github.com/nodejs/node/pull/59751)
- \[[`ff13d1d61e`](https://github.com/nodejs/node/commit/ff13d1d61e)] - **lib,src**: cache ModuleWrap.hasAsyncGraph (Chengzhong Wu) [#59703](https://github.com/nodejs/node/pull/59703)
- \[[`b200cd8470`](https://github.com/nodejs/node/commit/b200cd8470)] - **lib,src**: refactor assert to load error source from memory (Chengzhong Wu) [#59751](https://github.com/nodejs/node/pull/59751)
- \[[`e94c57301b`](https://github.com/nodejs/node/commit/e94c57301b)] - **meta**: add .npmrc with ignore-scripts=true (Joyee Cheung) [#59914](https://github.com/nodejs/node/pull/59914)
- \[[`728472a57b`](https://github.com/nodejs/node/commit/728472a57b)] - **module**: only put directly require-d ESM into require.cache (Joyee Cheung) [#59874](https://github.com/nodejs/node/pull/59874)
- \[[`be48760b93`](https://github.com/nodejs/node/commit/be48760b93)] - **node-api**: added SharedArrayBuffer api (Mert Can Altin) [#59071](https://github.com/nodejs/node/pull/59071)
- \[[`f006a14522`](https://github.com/nodejs/node/commit/f006a14522)] - **node-api**: make napi_delete_reference use node_api_basic_env (Jeetu Suthar) [#59684](https://github.com/nodejs/node/pull/59684)
- \[[`0f46c1c3b0`](https://github.com/nodejs/node/commit/0f46c1c3b0)] - **repl**: fix cpu overhead pasting big strings to the REPL (Ruben Bridgewater) [#59857](https://github.com/nodejs/node/pull/59857)
- \[[`3eeb7b47ea`](https://github.com/nodejs/node/commit/3eeb7b47ea)] - **sqlite**: fix crash session extension callbacks with workers (Bart Louwers) [#59848](https://github.com/nodejs/node/pull/59848)
- \[[`0fe53375ec`](https://github.com/nodejs/node/commit/0fe53375ec)] - **(SEMVER-MINOR)** **sqlite**: cleanup ERM support and export Session class (James M Snell) [#58378](https://github.com/nodejs/node/pull/58378)
- \[[`9a3e58a007`](https://github.com/nodejs/node/commit/9a3e58a007)] - **(SEMVER-MINOR)** **sqlite**: add tagged template (0hm☘️) [#58748](https://github.com/nodejs/node/pull/58748)
- \[[`f14ed5ab7b`](https://github.com/nodejs/node/commit/f14ed5ab7b)] - **src**: simplify watchdog instantiations via `std::optional` (Anna Henningsen) [#59960](https://github.com/nodejs/node/pull/59960)
- \[[`e330f03f84`](https://github.com/nodejs/node/commit/e330f03f84)] - **src**: update crypto objects to use DictionaryTemplate (James M Snell) [#59942](https://github.com/nodejs/node/pull/59942)
- \[[`69b5607cf4`](https://github.com/nodejs/node/commit/69b5607cf4)] - **src**: simplify is_callable by making it a concept (Tobias Nießen) [#58169](https://github.com/nodejs/node/pull/58169)
- \[[`86150f3401`](https://github.com/nodejs/node/commit/86150f3401)] - **src**: rename private fields to follow naming convention (Moonki Choi) [#59923](https://github.com/nodejs/node/pull/59923)
- \[[`d17f299539`](https://github.com/nodejs/node/commit/d17f299539)] - **src**: use DictionaryTemplate more in URLPattern (James M Snell) [#59892](https://github.com/nodejs/node/pull/59892)
- \[[`ac784912ac`](https://github.com/nodejs/node/commit/ac784912ac)] - **src**: reduce the nearest parent package JSON cache size (Michael Smith) [#59888](https://github.com/nodejs/node/pull/59888)
- \[[`abecdcb536`](https://github.com/nodejs/node/commit/abecdcb536)] - **src**: replace FIXED_ONE_BYTE_STRING with Environment-cached strings (Moonki Choi) [#59891](https://github.com/nodejs/node/pull/59891)
- \[[`2bb152500b`](https://github.com/nodejs/node/commit/2bb152500b)] - **src**: create strings in `FIXED_ONE_BYTE_STRING` as internalized (Anna Henningsen) [#59826](https://github.com/nodejs/node/pull/59826)
- \[[`03116a7cd8`](https://github.com/nodejs/node/commit/03116a7cd8)] - **src**: remove `std::array` overload of `FIXED_ONE_BYTE_STRING` (Anna Henningsen) [#59826](https://github.com/nodejs/node/pull/59826)
- \[[`8a5325d6e3`](https://github.com/nodejs/node/commit/8a5325d6e3)] - **src**: ensure `v8::Eternal` is empty before setting it (Anna Henningsen) [#59825](https://github.com/nodejs/node/pull/59825)
- \[[`f0c20ccd81`](https://github.com/nodejs/node/commit/f0c20ccd81)] - **src**: remove unnecessary `Environment::GetCurrent()` calls (Moonki Choi) [#59814](https://github.com/nodejs/node/pull/59814)
- \[[`213188e491`](https://github.com/nodejs/node/commit/213188e491)] - **stream**: use new AsyncResource instead of bind (Matteo Collina) [#59867](https://github.com/nodejs/node/pull/59867)
- \[[`ce8435b003`](https://github.com/nodejs/node/commit/ce8435b003)] - **test**: testcase demonstrating issue 59541 (Eric Rannaud) [#59801](https://github.com/nodejs/node/pull/59801)
- \[[`8f32746142`](https://github.com/nodejs/node/commit/8f32746142)] - **test**: guard write to proxy client if proxy connection is ended (Joyee Cheung) [#59742](https://github.com/nodejs/node/pull/59742)
- \[[`6790093fcb`](https://github.com/nodejs/node/commit/6790093fcb)] - **tls**: load bundled and extra certificates off-thread (Joyee Cheung) [#59856](https://github.com/nodejs/node/pull/59856)
- \[[`f5d3f919d8`](https://github.com/nodejs/node/commit/f5d3f919d8)] - **tls**: only do off-thread certificate loading on loading tls (Joyee Cheung) [#59856](https://github.com/nodejs/node/pull/59856)
- \[[`87bbaa23a0`](https://github.com/nodejs/node/commit/87bbaa23a0)] - **tools**: fix `tools/make-v8.sh` for clang (Richard Lau) [#59893](https://github.com/nodejs/node/pull/59893)
- \[[`0d23fd525b`](https://github.com/nodejs/node/commit/0d23fd525b)] - **tools**: skip test-internet workflow for draft PRs (Michaël Zasso) [#59817](https://github.com/nodejs/node/pull/59817)
- \[[`e17c73731a`](https://github.com/nodejs/node/commit/e17c73731a)] - **tools**: copyedit `build-tarball.yml` (Antoine du Hamel) [#59808](https://github.com/nodejs/node/pull/59808)
- \[[`97c4e1bac9`](https://github.com/nodejs/node/commit/97c4e1bac9)] - **typings**: remove unused imports (Nam Yooseong) [#59880](https://github.com/nodejs/node/pull/59880)
- \[[`8b29bbca76`](https://github.com/nodejs/node/commit/8b29bbca76)] - **url**: replaced slice with at (Mikhail) [#59181](https://github.com/nodejs/node/pull/59181)
- \[[`6458867a6b`](https://github.com/nodejs/node/commit/6458867a6b)] - **url**: add type checking to urlToHttpOptions() (simon-id) [#59753](https://github.com/nodejs/node/pull/59753)
- \[[`3c62b3886f`](https://github.com/nodejs/node/commit/3c62b3886f)] - **util**: inspect objects with throwing Symbol.toStringTag (Ruben Bridgewater) [#59860](https://github.com/nodejs/node/pull/59860)
- \[[`6133a82875`](https://github.com/nodejs/node/commit/6133a82875)] - **util**: fix debuglog.enabled not being present with callback logger (Ruben Bridgewater) [#59858](https://github.com/nodejs/node/pull/59858)
- \[[`9347ddddf4`](https://github.com/nodejs/node/commit/9347ddddf4)] - **vm**: explain how to share promises between contexts w/ afterEvaluate (Eric Rannaud) [#59801](https://github.com/nodejs/node/pull/59801)
- \[[`44ce971619`](https://github.com/nodejs/node/commit/44ce971619)] - **vm**: "afterEvaluate", evaluate() return a promise from the outer context (Eric Rannaud) [#59801](https://github.com/nodejs/node/pull/59801)
- \[[`6e586a1409`](https://github.com/nodejs/node/commit/6e586a1409)] - **vm**: expose hasTopLevelAwait on SourceTextModule (Chengzhong Wu) [#59865](https://github.com/nodejs/node/pull/59865)
- \[[`49747a58a3`](https://github.com/nodejs/node/commit/49747a58a3)] - **(SEMVER-MINOR)** **worker**: add heap profile API (theanarkh) [#59846](https://github.com/nodejs/node/pull/59846)
- \[[`b970c0bbc2`](https://github.com/nodejs/node/commit/b970c0bbc2)] - **zlib**: reduce code duplication (jhofstee) [#57810](https://github.com/nodejs/node/pull/57810)
- \[[`9782ca2b1b`](https://github.com/nodejs/node/commit/9782ca2b1b)] - **zlib**: implement fast path for crc32 (Gürgün Dayıoğlu) [#59813](https://github.com/nodejs/node/pull/59813)

Windows 64-bit Installer: https://nodejs.org/dist/v24.9.0/node-v24.9.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.9.0/node-v24.9.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.9.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.9.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.9.0/node-v24.9.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.9.0/node-v24.9.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.9.0/node-v24.9.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.9.0/node-v24.9.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.9.0/node-v24.9.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.9.0/node-v24.9.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.9.0/node-v24.9.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.9.0/node-v24.9.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.9.0/node-v24.9.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.9.0/ \
Documentation: https://nodejs.org/docs/v24.9.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

f9d608ca04a37b9bf94d77d29d4b14359fcb02d49d6d0d09fabfb3b3c86c9859  node-v24.9.0-aix-ppc64.tar.gz
a77b91ff7b3d3caa27d63f88b6c3192bb77de638c581ec08f944daf86d60f25c  node-v24.9.0-arm64.msi
961024296c2a8e60daed0784f8b61e0fab5c51d197502a92eff052c72b53209b  node-v24.9.0-darwin-arm64.tar.gz
a61297e99bb9beb1b46a0b45e7664d35f0897cf6c6ff30942317ef64ea27993a  node-v24.9.0-darwin-arm64.tar.xz
6c9ac12d3160538d96d456dc59a8fec1479e3f8b20bfc0d61bc809eb9ec11417  node-v24.9.0-darwin-x64.tar.gz
0ce1a51658a507b59fb7283c65c1474a28580dc19e3310c25e41bd8e6de8829c  node-v24.9.0-darwin-x64.tar.xz
3b83e03dbdfa1700073659724a77718c603b2836265f69da85ab8e0cadad99c5  node-v24.9.0-headers.tar.gz
4db1e4f2bc0a1787810a24a54e351e3e49889a13cbf987041a5d462c157fbf48  node-v24.9.0-headers.tar.xz
dab232a90169737a48149149dd6707e7fdcbaefbaa94b4871047a38e93db947f  node-v24.9.0-linux-arm64.tar.gz
5a5b1dc4906e891a655d2f0689db664879724f2d9e63309486fd588172a052bc  node-v24.9.0-linux-arm64.tar.xz
557d4e3f779f5af4fc29944647e6afd76901c5be7bc0c2bd8785a199a1bc0271  node-v24.9.0-linux-ppc64le.tar.gz
84acd1058a44634b7908165032a17af45fd7db1ad29faa7f7faf571d2d3e1a48  node-v24.9.0-linux-ppc64le.tar.xz
9baab2eb6b8d9efd2e3533ac79b572e697510f6582fdb572ba636c4d7b01d2b1  node-v24.9.0-linux-s390x.tar.gz
96849c844cb76145ac401cd36382ab02524b3bd1b5c494943bbf1fb4cdbd1b41  node-v24.9.0-linux-s390x.tar.xz
d57d6c28a35785f58f33899a0aa0bfc83f7a8ef4448b6cf3f7d0961efc7b9189  node-v24.9.0-linux-x64.tar.gz
f52ec50e959d72d5c680d9731420b2661cd2a8070e94c7369b6ddfcd8b7278be  node-v24.9.0-linux-x64.tar.xz
eeab837ca6cad49e4ac1b7ef765a69acd60240b546b2754de6771fa73507ad66  node-v24.9.0.pkg
3c868d88377cb05ed87674a6af6add3e04733dd429c3370620a5a6c547fe6460  node-v24.9.0.tar.gz
f17bc4cb01f59098c34a288c1bb109a778867c14eeb0ebbd608d0617b1193bbf  node-v24.9.0.tar.xz
e4da0650ae534cb905755e027c7e34bcb6732d7df54e5d9f5b0dd130532fe9ff  node-v24.9.0-win-arm64.7z
ead06448c62743d2b872574450c6b3cf1328d87f16e8057d7cea9a797170b160  node-v24.9.0-win-arm64.zip
9bc5b9d5b6263087f620f2d6b00b99f9f799e0f4d690b47ad49f34764f05331e  node-v24.9.0-win-x64.7z
6873514c3e6a012917cc6f95ce48a6289253370d025f1b69db290d70feebfa6e  node-v24.9.0-win-x64.zip
0fbae803c054807758f91463dea94b9301cc44b7d3545e7af5b58f5ca6396cf0  node-v24.9.0-x64.msi
15e5fab233dddb6035959c6efcbd73167f5a991a1f82cc20c0be65dcd08df54f  win-arm64/node.exe
fb036d418573ea032176a432dd14bc7d929c2a7d9f7a2d0d5239c2d9448a608e  win-arm64/node.lib
d5f0d0fe7d94e45d16ca628952871378772255f1246b8051ce6da4e3891794f8  win-arm64/node_pdb.7z
fe309b6cfdf2e6a781d8b2174503b74fa3525883c523620b044dfcc4097effab  win-arm64/node_pdb.zip
5f364598aa3017130b22908ff7c3db0fd05bd42d39fd65b79fd6bd3f73c73da6  win-x64/node.exe
05f6163d27cfc385e7d39fdf2e4d0950e6e56b5f85da5df9f201ecd7e3d2b69a  win-x64/node.lib
3023d466f3448db25c7de8d008699401b2ceb4ed751157435d3e3a925eaecf1c  win-x64/node_pdb.7z
e5216056aa08cfe87a45ab9c32f36a96168ec5a12ef514f9de4a2898807ba19e  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEj8yhP+8dDC6RAI4Jdw96mlrhVgAFAmjVnJAACgkQdw96mlrh
VgDHVBAAixARYiEdhjYV9Qu47Xw5gOEq60K+xDty1ukAjHsHCSNw1EVrwWse4z6j
1lY3ZH00e0bd5aDiLAxBtcEp3r2QcSYSga7iY7gBJ8uM+ygfxAVlGV/Ucy2lG8RO
7zCiOZ8Dx3bNEEFVeaGnFkpFlFGbjZS08zgksW8a1Oe9OQoZr8TggNIgjnpRgS09
bqAnNiiNAFD8mkUz7q7OLxkQzMRuFRF7Bv9BCrxBjLAPjo9bha2TTul2h5AhvNuq
izE3lBtXoclJdWtloSC2ONc7QEoKDUfE99a/eXh6BukPBYhA7zdJX+Nby5dCuAp9
zD+P6plZVA0uF7bCHcu3Cr3HhTyDWCmGa3yGpiPMlW0rS3UvhWy2bLEr1WJkz5rA
R2YIZ8GN9Y3JCA/dMk1Ph68bZZhpRmfMG2uDNDNS5BeATxfmCJXFqtimwt0uVknA
Xp+fvIkme3+MDa3FNuz+wwGlu2al/HQFpKFdIgaiOxqZpD7uBlMhumf1zny5jtrX
NSCa8ZlbhQUlGYgXmJFj6FFhxpYfKotw1eQzl4E+PrnolTzoR55a63EvvC0q7OHL
7eMM7e8+T6msuj6Nt4aTgC2/OESorIarDZXkA08k+V6mzCYaZTLo6J2PHAX9NNuV
N+NVrx4ssbCEdqDh7RiZJKx4iPARICqjd5LGlV21HUfxZEJnD8g=
=pxdo
-----END PGP SIGNATURE-----
```
