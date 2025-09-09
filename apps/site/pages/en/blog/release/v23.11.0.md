---
date: '2025-04-01T14:27:44.156Z'
category: release
title: Node.js v23.11.0 (Current)
layout: blog-post
author: Antoine du Hamel
---

## 2025-04-01, Version 23.11.0 (Current), @aduh95

### Notable Changes

- \[[`64b086740a`](https://github.com/nodejs/node/commit/64b086740a)] - **(SEMVER-MINOR)** **assert**: implement partial error comparison (Ruben Bridgewater) [#57370](https://github.com/nodejs/node/pull/57370)
- \[[`053cef70e0`](https://github.com/nodejs/node/commit/053cef70e0)] - **(SEMVER-MINOR)** **crypto**: add optional callback to `crypto.diffieHellman` (Filip Skokan) [#57274](https://github.com/nodejs/node/pull/57274)
- \[[`f8aff90235`](https://github.com/nodejs/node/commit/f8aff90235)] - **(SEMVER-MINOR)** **process**: add `execve` (Paolo Insogna) [#56496](https://github.com/nodejs/node/pull/56496)
- \[[`4b04c92d7d`](https://github.com/nodejs/node/commit/4b04c92d7d)] - **(SEMVER-MINOR)** **sqlite**: add `StatementSync.prototype.columns()` (Colin Ihrig) [#57490](https://github.com/nodejs/node/pull/57490)
- \[[`1b8d1d3a3a`](https://github.com/nodejs/node/commit/1b8d1d3a3a)] - **(SEMVER-MINOR)** **util**: expose diff function used by the assertion errors (Giovanni Bucci) [#57462](https://github.com/nodejs/node/pull/57462)

### Commits

- \[[`7b72396c8b`](https://github.com/nodejs/node/commit/7b72396c8b)] - **assert**: improve partialDeepStrictEqual performance (Ruben Bridgewater) [#57509](https://github.com/nodejs/node/pull/57509)
- \[[`64b086740a`](https://github.com/nodejs/node/commit/64b086740a)] - **(SEMVER-MINOR)** **assert**: implement partial error comparison (Ruben Bridgewater) [#57370](https://github.com/nodejs/node/pull/57370)
- \[[`f694d7de0e`](https://github.com/nodejs/node/commit/f694d7de0e)] - **(SEMVER-MINOR)** **assert**: improve partialDeepStrictEqual (Ruben Bridgewater) [#57370](https://github.com/nodejs/node/pull/57370)
- \[[`80d9d5653f`](https://github.com/nodejs/node/commit/80d9d5653f)] - **(SEMVER-MINOR)** **assert,util**: improve performance (Ruben Bridgewater) [#57370](https://github.com/nodejs/node/pull/57370)
- \[[`d52a71f832`](https://github.com/nodejs/node/commit/d52a71f832)] - **(SEMVER-MINOR)** **benchmark**: adjust assert runtimes (Ruben Bridgewater) [#57370](https://github.com/nodejs/node/pull/57370)
- \[[`7592cf4cd7`](https://github.com/nodejs/node/commit/7592cf4cd7)] - **(SEMVER-MINOR)** **benchmark**: skip running some assert benchmarks by default (Ruben Bridgewater) [#57370](https://github.com/nodejs/node/pull/57370)
- \[[`e4cc54a746`](https://github.com/nodejs/node/commit/e4cc54a746)] - **(SEMVER-MINOR)** **benchmark**: add assert partialDeepStrictEqual benchmark (Ruben Bridgewater) [#57370](https://github.com/nodejs/node/pull/57370)
- \[[`de48407011`](https://github.com/nodejs/node/commit/de48407011)] - **build**: fix update-wpt workflow (Jonas) [#57468](https://github.com/nodejs/node/pull/57468)
- \[[`52cd0954f9`](https://github.com/nodejs/node/commit/52cd0954f9)] - **cli**: clarify --cpu-prof-name allowed values (Eugenio Ceschia) [#57433](https://github.com/nodejs/node/pull/57433)
- \[[`7611fc14de`](https://github.com/nodejs/node/commit/7611fc14de)] - **crypto**: fix output of privateDecrypt with zero-length data (Filip Skokan) [#57575](https://github.com/nodejs/node/pull/57575)
- \[[`cc42ee8fc7`](https://github.com/nodejs/node/commit/cc42ee8fc7)] - **crypto**: ensure expected JWK alg in SubtleCrypto.importKey RSA imports (Filip Skokan) [#57450](https://github.com/nodejs/node/pull/57450)
- \[[`053cef70e0`](https://github.com/nodejs/node/commit/053cef70e0)] - **(SEMVER-MINOR)** **crypto**: add optional callback to crypto.diffieHellman (Filip Skokan) [#57274](https://github.com/nodejs/node/pull/57274)
- \[[`1f08864fd7`](https://github.com/nodejs/node/commit/1f08864fd7)] - **debugger**: fix behavior of plain object exec in debugger repl (Dario Piotrowicz) [#57498](https://github.com/nodejs/node/pull/57498)
- \[[`162b2828eb`](https://github.com/nodejs/node/commit/162b2828eb)] - **deps**: update undici to 6.21.2 (Matteo Collina) [#57442](https://github.com/nodejs/node/pull/57442)
- \[[`43bea6bb80`](https://github.com/nodejs/node/commit/43bea6bb80)] - **deps**: V8: cherry-pick c172ffc5bf54 (Choongwoo Han) [#57437](https://github.com/nodejs/node/pull/57437)
- \[[`99f93afb9d`](https://github.com/nodejs/node/commit/99f93afb9d)] - **deps**: update ada to v3.2.1 (Yagiz Nizipli) [#57429](https://github.com/nodejs/node/pull/57429)
- \[[`30e5658f12`](https://github.com/nodejs/node/commit/30e5658f12)] - **deps**: update googletest to 0bdccf4 (Node.js GitHub Bot) [#57380](https://github.com/nodejs/node/pull/57380)
- \[[`573467c070`](https://github.com/nodejs/node/commit/573467c070)] - **deps**: update acorn to 8.14.1 (Node.js GitHub Bot) [#57382](https://github.com/nodejs/node/pull/57382)
- \[[`affeaac0c7`](https://github.com/nodejs/node/commit/affeaac0c7)] - **doc**: add gurgunday as triager (Gürgün Dayıoğlu) [#57594](https://github.com/nodejs/node/pull/57594)
- \[[`4ed1a098f5`](https://github.com/nodejs/node/commit/4ed1a098f5)] - **doc**: clarify behaviour of node-api adjust function (Michael Dawson) [#57463](https://github.com/nodejs/node/pull/57463)
- \[[`921041b284`](https://github.com/nodejs/node/commit/921041b284)] - **doc**: remove Corepack documentation (Antoine du Hamel) [#57635](https://github.com/nodejs/node/pull/57635)
- \[[`99dbd8b391`](https://github.com/nodejs/node/commit/99dbd8b391)] - **doc**: remove mention of `--require` not supporting ES modules (Huáng Jùnliàng) [#57620](https://github.com/nodejs/node/pull/57620)
- \[[`8c76b2949e`](https://github.com/nodejs/node/commit/8c76b2949e)] - **doc**: mention reports should align with Node.js CoC (Rafael Gonzaga) [#57607](https://github.com/nodejs/node/pull/57607)
- \[[`ee1c78a7a3`](https://github.com/nodejs/node/commit/ee1c78a7a3)] - **doc**: add section stating that very stale PRs should be closed (Dario Piotrowicz) [#57541](https://github.com/nodejs/node/pull/57541)
- \[[`595e9e5ad6`](https://github.com/nodejs/node/commit/595e9e5ad6)] - **doc**: add bjohansebas as triager (Sebastian Beltran) [#57564](https://github.com/nodejs/node/pull/57564)
- \[[`3742d2a198`](https://github.com/nodejs/node/commit/3742d2a198)] - **doc**: update support channels (Claudio W.) [#57538](https://github.com/nodejs/node/pull/57538)
- \[[`717c44dead`](https://github.com/nodejs/node/commit/717c44dead)] - **doc**: make stability labels more consistent (Antoine du Hamel) [#57516](https://github.com/nodejs/node/pull/57516)
- \[[`b4576a6f57`](https://github.com/nodejs/node/commit/b4576a6f57)] - **doc**: remove cryptoStream API reference (Jonas) [#57579](https://github.com/nodejs/node/pull/57579)
- \[[`2c4f894036`](https://github.com/nodejs/node/commit/2c4f894036)] - **doc**: module resolution pseudocode corrections (Marcel Laverdet) [#57080](https://github.com/nodejs/node/pull/57080)
- \[[`c45894f90c`](https://github.com/nodejs/node/commit/c45894f90c)] - **doc**: add history entry for DEP0190 in `child_process.md` (Antoine du Hamel) [#57544](https://github.com/nodejs/node/pull/57544)
- \[[`c21068b696`](https://github.com/nodejs/node/commit/c21068b696)] - **doc**: remove deprecated pattern in `child_process.md` (Antoine du Hamel) [#57568](https://github.com/nodejs/node/pull/57568)
- \[[`87e0dda352`](https://github.com/nodejs/node/commit/87e0dda352)] - **doc**: mark multiple experimental APIS as stable (James M Snell) [#57510](https://github.com/nodejs/node/pull/57510)
- \[[`d637763e4e`](https://github.com/nodejs/node/commit/d637763e4e)] - **doc**: remove mertcanaltin from Triagers (Mert Can Altin) [#57531](https://github.com/nodejs/node/pull/57531)
- \[[`ee6025495d`](https://github.com/nodejs/node/commit/ee6025495d)] - **doc**: recommend watching the collaborators repo in the onboarding doc (Darshan Sen) [#57527](https://github.com/nodejs/node/pull/57527)
- \[[`706b64638b`](https://github.com/nodejs/node/commit/706b64638b)] - **doc**: remove mention of visa fees from onboarding doc (Darshan Sen) [#57526](https://github.com/nodejs/node/pull/57526)
- \[[`176d951bd0`](https://github.com/nodejs/node/commit/176d951bd0)] - **doc**: deprecate passing `args` to `spawn` and `execFile` (Antoine du Hamel) [#57389](https://github.com/nodejs/node/pull/57389)
- \[[`5c05ba119b`](https://github.com/nodejs/node/commit/5c05ba119b)] - **doc**: remove some inconsistencies in `deprecations.md` (Antoine du Hamel) [#57512](https://github.com/nodejs/node/pull/57512)
- \[[`9d5be4bb8c`](https://github.com/nodejs/node/commit/9d5be4bb8c)] - **doc**: run license-builder (github-actions\[bot]) [#57511](https://github.com/nodejs/node/pull/57511)
- \[[`273607edb4`](https://github.com/nodejs/node/commit/273607edb4)] - **doc**: add new writing-docs contributing md (Dario Piotrowicz) [#57502](https://github.com/nodejs/node/pull/57502)
- \[[`e28c723f24`](https://github.com/nodejs/node/commit/e28c723f24)] - **doc**: add node.js streams references to Web Streams doc (Dario Piotrowicz) [#57393](https://github.com/nodejs/node/pull/57393)
- \[[`47296492ba`](https://github.com/nodejs/node/commit/47296492ba)] - **doc**: replace NOTEs that do not render properly (Colin Ihrig) [#57484](https://github.com/nodejs/node/pull/57484)
- \[[`db9c37f792`](https://github.com/nodejs/node/commit/db9c37f792)] - **doc**: prefer to sign commits under nodejs repository (Rafael Gonzaga) [#57311](https://github.com/nodejs/node/pull/57311)
- \[[`e5e3987ae7`](https://github.com/nodejs/node/commit/e5e3987ae7)] - **doc**: fixed the incorrect splitting of multiple words (letianpailove) [#57454](https://github.com/nodejs/node/pull/57454)
- \[[`91a824e43b`](https://github.com/nodejs/node/commit/91a824e43b)] - **doc**: add review guidelines for collaborator nominations (Antoine du Hamel) [#57449](https://github.com/nodejs/node/pull/57449)
- \[[`2a5fcb2172`](https://github.com/nodejs/node/commit/2a5fcb2172)] - **doc**: fix typo in `url.md` (Allon Murienik) [#57467](https://github.com/nodejs/node/pull/57467)
- \[[`17ccf9282f`](https://github.com/nodejs/node/commit/17ccf9282f)] - **doc**: add history info for --use-system-ca (Darshan Sen) [#57432](https://github.com/nodejs/node/pull/57432)
- \[[`9adaaeb965`](https://github.com/nodejs/node/commit/9adaaeb965)] - **doc**: remove typo YAML snippet from tls.getCACertificates doc (Darshan Sen) [#57459](https://github.com/nodejs/node/pull/57459)
- \[[`ee4e855f8e`](https://github.com/nodejs/node/commit/ee4e855f8e)] - **doc**: fix typo in sqlite.md (Tobias Nießen) [#57473](https://github.com/nodejs/node/pull/57473)
- \[[`8cb3441443`](https://github.com/nodejs/node/commit/8cb3441443)] - **doc**: explicit mention arbitrary code execution as a vuln (Rafael Gonzaga) [#57426](https://github.com/nodejs/node/pull/57426)
- \[[`27f183ad03`](https://github.com/nodejs/node/commit/27f183ad03)] - **doc**: update maintaining-openssl.md for openssl (Richard Lau) [#57413](https://github.com/nodejs/node/pull/57413)
- \[[`ca67145d60`](https://github.com/nodejs/node/commit/ca67145d60)] - **doc**: add missing `deprecated` badges in `fs.md` (Yukihiro Hasegawa) [#57384](https://github.com/nodejs/node/pull/57384)
- \[[`3687390510`](https://github.com/nodejs/node/commit/3687390510)] - **doc**: fix small typo in `process.md` (Felix Rieseberg) [#57333](https://github.com/nodejs/node/pull/57333)
- \[[`097d9926e3`](https://github.com/nodejs/node/commit/097d9926e3)] - **doc**: add note about sync nodejs-private branches (Rafael Gonzaga) [#57404](https://github.com/nodejs/node/pull/57404)
- \[[`5006627969`](https://github.com/nodejs/node/commit/5006627969)] - **fs**: apply exclude function to root path (Rich Trott) [#57420](https://github.com/nodejs/node/pull/57420)
- \[[`0583c3db92`](https://github.com/nodejs/node/commit/0583c3db92)] - **http**: coerce content-length to number (Marco Ippolito) [#57458](https://github.com/nodejs/node/pull/57458)
- \[[`2a580b9332`](https://github.com/nodejs/node/commit/2a580b9332)] - **lib**: add warning when binding inspector to public IP (Demian Parkhomenko) [#55736](https://github.com/nodejs/node/pull/55736)
- \[[`fda56b9837`](https://github.com/nodejs/node/commit/fda56b9837)] - **lib**: limit split function calls to prevent excessive array length (Gürgün Dayıoğlu) [#57501](https://github.com/nodejs/node/pull/57501)
- \[[`d5a26f6525`](https://github.com/nodejs/node/commit/d5a26f6525)] - **lib**: make getCallSites sourceMap option truly optional (James M Snell) [#57388](https://github.com/nodejs/node/pull/57388)
- \[[`00a5b18043`](https://github.com/nodejs/node/commit/00a5b18043)] - **meta**: add some clarification to the nomination process (James M Snell) [#57503](https://github.com/nodejs/node/pull/57503)
- \[[`d0c96c463c`](https://github.com/nodejs/node/commit/d0c96c463c)] - **meta**: remove collaborator self-nomination (Rich Trott) [#57537](https://github.com/nodejs/node/pull/57537)
- \[[`a9a93f31ee`](https://github.com/nodejs/node/commit/a9a93f31ee)] - **meta**: edit collaborator nomination process (Antoine du Hamel) [#57483](https://github.com/nodejs/node/pull/57483)
- \[[`0ca362f5f2`](https://github.com/nodejs/node/commit/0ca362f5f2)] - **meta**: move ovflowd to emeritus (Claudio W.) [#57443](https://github.com/nodejs/node/pull/57443)
- \[[`f8aff90235`](https://github.com/nodejs/node/commit/f8aff90235)] - **(SEMVER-MINOR)** **process**: add execve (Paolo Insogna) [#56496](https://github.com/nodejs/node/pull/56496)
- \[[`e8d4a31d4b`](https://github.com/nodejs/node/commit/e8d4a31d4b)] - **sqlite**: add support for unknown named parameters (Colin Ihrig) [#57552](https://github.com/nodejs/node/pull/57552)
- \[[`5652da642d`](https://github.com/nodejs/node/commit/5652da642d)] - **sqlite**: add DatabaseSync.prototype.isOpen (Colin Ihrig) [#57522](https://github.com/nodejs/node/pull/57522)
- \[[`5c976f16cd`](https://github.com/nodejs/node/commit/5c976f16cd)] - **sqlite**: add DatabaseSync.prototype\[Symbol.dispose]\() (Colin Ihrig) [#57506](https://github.com/nodejs/node/pull/57506)
- \[[`4b04c92d7d`](https://github.com/nodejs/node/commit/4b04c92d7d)] - **(SEMVER-MINOR)** **sqlite**: add StatementSync.prototype.columns() (Colin Ihrig) [#57490](https://github.com/nodejs/node/pull/57490)
- \[[`7f5e31645c`](https://github.com/nodejs/node/commit/7f5e31645c)] - **src**: ensure primordials are initialized exactly once (Chengzhong Wu) [#57519](https://github.com/nodejs/node/pull/57519)
- \[[`9611980f58`](https://github.com/nodejs/node/commit/9611980f58)] - **src**: improve error handling in multiple files (James M Snell) [#57507](https://github.com/nodejs/node/pull/57507)
- \[[`3ddc5cd875`](https://github.com/nodejs/node/commit/3ddc5cd875)] - **src**: cache urlpattern properties (JonasBa) [#57465](https://github.com/nodejs/node/pull/57465)
- \[[`b9d9ee4da2`](https://github.com/nodejs/node/commit/b9d9ee4da2)] - **src**: make minor cleanups in encoding_binding.cc (James M Snell) [#57448](https://github.com/nodejs/node/pull/57448)
- \[[`f8acf2dd2a`](https://github.com/nodejs/node/commit/f8acf2dd2a)] - **src**: make minor cleanups in compile_cache.cc (James M Snell) [#57448](https://github.com/nodejs/node/pull/57448)
- \[[`6ee15c6509`](https://github.com/nodejs/node/commit/6ee15c6509)] - **src**: define urlpattern components using a macro (JonasBa) [#57452](https://github.com/nodejs/node/pull/57452)
- \[[`4ab3c1690a`](https://github.com/nodejs/node/commit/4ab3c1690a)] - **src**: cleanup crypto more (James M Snell) [#57323](https://github.com/nodejs/node/pull/57323)
- \[[`5be80b1748`](https://github.com/nodejs/node/commit/5be80b1748)] - **src**: refine ncrypto more (James M Snell) [#57300](https://github.com/nodejs/node/pull/57300)
- \[[`6a13319a6e`](https://github.com/nodejs/node/commit/6a13319a6e)] - **src**: cleanup aliased_buffer.h (Mohammed Keyvanzadeh) [#57395](https://github.com/nodejs/node/pull/57395)
- \[[`3cff7f80bb`](https://github.com/nodejs/node/commit/3cff7f80bb)] - **src**: suggest --use-system-ca when a certificate error occurs (Aditi) [#57362](https://github.com/nodejs/node/pull/57362)
- \[[`3d372ad9f3`](https://github.com/nodejs/node/commit/3d372ad9f3)] - **test**: update WPT for urlpattern to 6ceca69d26 (Node.js GitHub Bot) [#57486](https://github.com/nodejs/node/pull/57486)
- \[[`481ea665af`](https://github.com/nodejs/node/commit/481ea665af)] - **test**: add more number cases for buffer.indexOf (Meghan Denny) [#57200](https://github.com/nodejs/node/pull/57200)
- \[[`27b01ed4e7`](https://github.com/nodejs/node/commit/27b01ed4e7)] - **test**: update parallel/test-tls-dhe for OpenSSL 3.5 (Richard Lau) [#57477](https://github.com/nodejs/node/pull/57477)
- \[[`8f7debcf41`](https://github.com/nodejs/node/commit/8f7debcf41)] - **timers**: optimize timer functions with improved argument handling (Gürgün Dayıoğlu) [#57072](https://github.com/nodejs/node/pull/57072)
- \[[`d4abd9d3fb`](https://github.com/nodejs/node/commit/d4abd9d3fb)] - **timers**: remove unnecessary allocation of \_onTimeout (Gürgün Dayıoğlu) [#57497](https://github.com/nodejs/node/pull/57497)
- \[[`f8f81c8ba2`](https://github.com/nodejs/node/commit/f8f81c8ba2)] - **timers**: remove unused parameter from insertGuarded (Gürgün Dayıoğlu) [#57251](https://github.com/nodejs/node/pull/57251)
- \[[`c4fdb27b51`](https://github.com/nodejs/node/commit/c4fdb27b51)] - **tls**: remove unnecessary type check on normalize (Yagiz Nizipli) [#57336](https://github.com/nodejs/node/pull/57336)
- \[[`ad5dcc5798`](https://github.com/nodejs/node/commit/ad5dcc5798)] - **tools**: fix WPT update cron string (Antoine du Hamel) [#57665](https://github.com/nodejs/node/pull/57665)
- \[[`7faa482588`](https://github.com/nodejs/node/commit/7faa482588)] - **tools**: remove stalled label on unstalled issues and PRs (Rich Trott) [#57630](https://github.com/nodejs/node/pull/57630)
- \[[`e3bb26da2b`](https://github.com/nodejs/node/commit/e3bb26da2b)] - **tools**: update sccache to support GH cache changes (Michaël Zasso) [#57573](https://github.com/nodejs/node/pull/57573)
- \[[`f0c9f505d9`](https://github.com/nodejs/node/commit/f0c9f505d9)] - **tools**: bump @babel/helpers from 7.26.9 to 7.26.10 in /tools/eslint (dependabot\[bot]) [#57444](https://github.com/nodejs/node/pull/57444)
- \[[`a40ff1f646`](https://github.com/nodejs/node/commit/a40ff1f646)] - **url**: fix constructor error message for URLPattern (jakecastelli) [#57482](https://github.com/nodejs/node/pull/57482)
- \[[`f36bee4b89`](https://github.com/nodejs/node/commit/f36bee4b89)] - **util**: avoid run debug when enabled is false (fengmk2) [#57494](https://github.com/nodejs/node/pull/57494)
- \[[`1b8d1d3a3a`](https://github.com/nodejs/node/commit/1b8d1d3a3a)] - **(SEMVER-MINOR)** **util**: expose diff function used by the assertion errors (Giovanni Bucci) [#57462](https://github.com/nodejs/node/pull/57462)
- \[[`1f7b08a317`](https://github.com/nodejs/node/commit/1f7b08a317)] - **win,test**: disable test case failing with ClangCL (Stefan Stojanovic) [#57397](https://github.com/nodejs/node/pull/57397)

Windows 64-bit Installer: https://nodejs.org/dist/v23.11.0/node-v23.11.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v23.11.0/node-v23.11.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v23.11.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v23.11.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v23.11.0/node-v23.11.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v23.11.0/node-v23.11.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v23.11.0/node-v23.11.0.tar.gz \
Other release files: https://nodejs.org/dist/v23.11.0/ \
Documentation: https://nodejs.org/docs/v23.11.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

281c642514a14bc326b2b4953acef169dd20aac78d138607b778eabf5521a2b6  node-v23.11.0-aix-ppc64.tar.gz
33ac1b7ad8c619187c6436fbd4ff9766598b0c50d48fbc9a1a96eea9a214a59a  node-v23.11.0-arm64.msi
635990b46610238e3c008cd01480c296e0c2bfe7ec59ea9a8cd789d5ac621bb0  node-v23.11.0-darwin-arm64.tar.gz
d020d7703959f65e289fc8fc51e216e87793dd297cd40f410f6e2fc18d321c11  node-v23.11.0-darwin-arm64.tar.xz
a5782655748d4602c1ee1ee62732e0a16d29d3e4faac844db395b0fbb1c9dab8  node-v23.11.0-darwin-x64.tar.gz
0a47bae567703255d3dddc5918a875a9cc4ce07f7c6feca480e9d564cadecafb  node-v23.11.0-darwin-x64.tar.xz
48586eebb7ddcd51109c092b2bfc0218f9fbac504b3622293e404fd9274c19ff  node-v23.11.0-headers.tar.gz
130707d6de3df0fd6de70f47b835511b0708ac3ffbe7e7c4ebf23b8bc2602ce7  node-v23.11.0-headers.tar.xz
12b29a87a7ccd7e1b97392d1e1533470d596578dad900430cff403e404fe72a7  node-v23.11.0-linux-arm64.tar.gz
85915f885fe7eab2be4a6e3de840cb83db4fc53749274d31383a0e1721a883c6  node-v23.11.0-linux-arm64.tar.xz
f20ced60e7f5b0136582ac7e3f5b2dafb4e320332dba81abb450e1f50ea64da4  node-v23.11.0-linux-armv7l.tar.gz
a0012b90af20ec5f219ead4ea9321249c0c4e74b077855e5d41634b157047089  node-v23.11.0-linux-armv7l.tar.xz
7fd70c5470d782dd03c31ca45505e563e6958e21790a8c7bf12a4c0fdd62b010  node-v23.11.0-linux-ppc64le.tar.gz
2e974a15d60583b26e82ef59c9bd507c897c7a6ee57c382f8f10d87aa27095db  node-v23.11.0-linux-ppc64le.tar.xz
3535e5ca971b9163c5f1b0232ea1a3c827bfcbe2cc0627458d43087e337934b8  node-v23.11.0-linux-s390x.tar.gz
bfda95d724b78a85f56697671e516ce8664dceb579fd72ba0571e9744c92d853  node-v23.11.0-linux-s390x.tar.xz
66f768a7f2d89ecdda8fe1e33ee71ac04ed9180111cbf1c5fb944655fe7c90c7  node-v23.11.0-linux-x64.tar.gz
fa9ae28d8796a6cfb7057397e1eea30ca1c61002b42b8897f354563a254e7cf5  node-v23.11.0-linux-x64.tar.xz
3635315a6d8d2d51ef466ea7b9c6b32b2f9f00a04c3e70cf01e16a44e26396ca  node-v23.11.0-win-arm64.7z
174936f8a36e955c4e16cf5252187a148f9148aa9c5b6d26366d7d9e1d0e49cc  node-v23.11.0-win-arm64.zip
35f424f7eadbbbcd6e65a841f994b231e42f790e2ad2727b196f2d194f9ab993  node-v23.11.0-win-x64.7z
42749f1e4583907ab92bac4b4bdb031201a0b3f7b028ea6b6e0d5bb40e433ae9  node-v23.11.0-win-x64.zip
4d345be9222ffcc052921865a6ac498ac4d93c833ac5c37b84784bd6738c7dca  node-v23.11.0-x64.msi
951ca83a4b4c70686019f88761b5ac6096519ae5e113add8cdffa45b839307d4  node-v23.11.0.pkg
0080beb9a481e2536543f70b59880093cb6c42470092efad8193563219efdc80  node-v23.11.0.tar.gz
f2c5db21fc5d3c3d78c7e8823bff770cef0da8078c3b5ac4fa6d17d5a41be99d  node-v23.11.0.tar.xz
7ee966060ec29ad00a8853f7af86698e29e838780312bbaec47076d2f9a1e75b  win-arm64/node.exe
b04fc2c4f04273feaae3a2bc372d507fa631d7d6fd5f11265219d5b10d083a3e  win-arm64/node.lib
5eb8a4b6eb129c5938b39cf06d874699aa92ea9f7156f8b8748eccb5e3f75445  win-arm64/node_pdb.7z
a5404d2a165ae4044f1e379a2c5cb817e48b2a45b063605ad1b627d5977d20ba  win-arm64/node_pdb.zip
806777a1aa8d511a3eaffb6f75200e85c5a67e78bb921bc4c340353fb343b33d  win-x64/node.exe
7005ad268c2a3b55e741957609696fd707982d8d7727325c44e2cbf23f00f565  win-x64/node.lib
922615546546d6c66ab6cbf1fcd2366a7e942061fad50c88134c9fb54824749e  win-x64/node_pdb.7z
c304a55e0228e6a767dedaa66d64421cb99f6c75acbed06adcf01958e9aa1a63  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEwNYkhDnx1WBKr/tAIdkA/9sjN1YFAmfr948ACgkQIdkA/9sj
N1bt8xAAmPC/y4YavKY4mfdxVNfNRbv6jJ1ChtFPysfyROCB/5vhsCACefCVOdLZ
ACjU0wuOkZ08/pEBQdzk+BFE2e1Vytj3Sfz2g27iDCK3VG/uZVzcgeAOc3MVrTQN
g/gLdL5t2HF3ane2VCGHOLqC3xAyNAlVIz5Kf4qYEuCXtsv4eIEQgEo9Gpph6NWo
uO3AE3CO235lMJambhAIV9eGtPsivcDnrAojOgHTwUAEA8eYNxZHYl2eqoaqgR6h
GLg0wC8mf+7uD7GrDDhxhJ/H9p5oGTA5mp8j/hDSlUcgISht24FCBMGLDDx1G7hA
znAgOqa7Aj0CAwak8gyor+Fm9yvcdQ+/5vdKms16ESYf9dcrqvuRcYjyky7/I0Ue
gNfoOec3UrbDquBPyEB5eSUlLxBFC+JTJOyTgywC0CQC8p5zNY+2qFzGG9ClwJq1
u7QPA2PlDfb44HR1n/yv+R7tuf9ws7KOtbXWClPz4vz/jberzCBFvdWnAntFouMq
oyIQp7JcAkVfrlrlT2WbTzsHYhfafvPnX/STx9u/lL5DSRwlFfPP3JP5i2AkLh6B
+DqjDqQUQXVea0rj7C/c3E9tUydl6Uwlgj3BG6aDb4r7svyW8LfcUtkTe5AOdgBp
euLoL2KzfyEHo8Umg4lAw9ThfEhdYO9XcG1ExjSNTj5/iAPeItY=
=9mLp
-----END PGP SIGNATURE-----
```
