---
date: '2025-08-28T21:18:42.296Z'
category: release
title: Node.js v22.19.0 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-08-28, Version 22.19.0 'Jod' (LTS), @aduh95

### Notable Changes

- \[[`8e2076a24f`](https://github.com/nodejs/node/commit/8e2076a24f)] - **(SEMVER-MINOR)** **cli**: add `NODE_USE_SYSTEM_CA=1` (Joyee Cheung) [#59276](https://github.com/nodejs/node/pull/59276)
- \[[`e592d739c2`](https://github.com/nodejs/node/commit/e592d739c2)] - **(SEMVER-MINOR)** **cli**: support `${pid}` placeholder in `--cpu-prof-name` (Haram Jeong) [#59072](https://github.com/nodejs/node/pull/59072)
- \[[`cda1dab6e2`](https://github.com/nodejs/node/commit/cda1dab6e2)] - **(SEMVER-MINOR)** **crypto**: add `tls.setDefaultCACertificates()` (Joyee Cheung) [#58822](https://github.com/nodejs/node/pull/58822)
- \[[`1f184513e9`](https://github.com/nodejs/node/commit/1f184513e9)] - **(SEMVER-MINOR)** **dns**: support max timeout (theanarkh) [#58440](https://github.com/nodejs/node/pull/58440)
- \[[`bace73a173`](https://github.com/nodejs/node/commit/bace73a173)] - **doc**: update the instruction on how to verify releases (Antoine du Hamel) [#59113](https://github.com/nodejs/node/pull/59113)
- \[[`fa9a9e9c69`](https://github.com/nodejs/node/commit/fa9a9e9c69)] - **(SEMVER-MINOR)** **esm**: unflag `--experimental-wasm-modules` (Guy Bedford) [#57038](https://github.com/nodejs/node/pull/57038)
- \[[`390a9dc20b`](https://github.com/nodejs/node/commit/390a9dc20b)] - **(SEMVER-MINOR)** **http**: add `server.keepAliveTimeoutBuffer` option (Haram Jeong) [#59243](https://github.com/nodejs/node/pull/59243)
- \[[`c12c5343ad`](https://github.com/nodejs/node/commit/c12c5343ad)] - **lib**: docs deprecate `_http_*` (Sebastian Beltran) [#59293](https://github.com/nodejs/node/pull/59293)
- \[[`f57ee3d71f`](https://github.com/nodejs/node/commit/f57ee3d71f)] - **(SEMVER-MINOR)** **net**: update `net.blocklist` to allow file save and file management (alphaleadership) [#58087](https://github.com/nodejs/node/pull/58087)
- \[[`035da74c31`](https://github.com/nodejs/node/commit/035da74c31)] - **(SEMVER-MINOR)** **process**: add `threadCpuUsage` (Paolo Insogna) [#56467](https://github.com/nodejs/node/pull/56467)
- \[[`8e697d1884`](https://github.com/nodejs/node/commit/8e697d1884)] - **(SEMVER-MINOR)** **zlib**: add dictionary support to `zstdCompress` and `zstdDecompress` (lluisemper) [#59240](https://github.com/nodejs/node/pull/59240)

### Commits

- \[[`73aa0ae37f`](https://github.com/nodejs/node/commit/73aa0ae37f)] - **assert**: change utils to use index instead of for...of (방진혁) [#59278](https://github.com/nodejs/node/pull/59278)
- \[[`dfe3a11eed`](https://github.com/nodejs/node/commit/dfe3a11eed)] - **benchmark**: remove deprecated \_extend from benchmark (Rafael Gonzaga) [#59228](https://github.com/nodejs/node/pull/59228)
- \[[`9b9d30042a`](https://github.com/nodejs/node/commit/9b9d30042a)] - **benchmark**: add fs warmup to writefile-promises (Bruno Rodrigues) [#59215](https://github.com/nodejs/node/pull/59215)
- \[[`a663f7f954`](https://github.com/nodejs/node/commit/a663f7f954)] - **benchmark**: add calibrate-n script (Rafael Gonzaga) [#59186](https://github.com/nodejs/node/pull/59186)
- \[[`1b9b5bddd6`](https://github.com/nodejs/node/commit/1b9b5bddd6)] - **benchmark**: adjust configuration for string-decoder bench (Rafael Gonzaga) [#59187](https://github.com/nodejs/node/pull/59187)
- \[[`d0ac3319f9`](https://github.com/nodejs/node/commit/d0ac3319f9)] - **benchmark**: add --track to benchmark (Rafael Gonzaga) [#59174](https://github.com/nodejs/node/pull/59174)
- \[[`2044968b86`](https://github.com/nodejs/node/commit/2044968b86)] - **benchmark**: small lint fix on \_cli.js (Rafael Gonzaga) [#59172](https://github.com/nodejs/node/pull/59172)
- \[[`4e519934cb`](https://github.com/nodejs/node/commit/4e519934cb)] - **benchmark**: drop misc/punycode benchmark (Rafael Gonzaga) [#59171](https://github.com/nodejs/node/pull/59171)
- \[[`07e173d969`](https://github.com/nodejs/node/commit/07e173d969)] - **benchmark**: fix sqlite-is-transaction (Rafael Gonzaga) [#59170](https://github.com/nodejs/node/pull/59170)
- \[[`8440b6177f`](https://github.com/nodejs/node/commit/8440b6177f)] - **benchmark**: reduce N for diagnostics_channel subscribe benchmark (Arthur Angelo) [#59116](https://github.com/nodejs/node/pull/59116)
- \[[`8615ea6db0`](https://github.com/nodejs/node/commit/8615ea6db0)] - **buffer**: cache Environment::GetCurrent to avoid repeated calls (Mert Can Altin) [#59043](https://github.com/nodejs/node/pull/59043)
- \[[`3deb5361d2`](https://github.com/nodejs/node/commit/3deb5361d2)] - **build**: fix node_use_sqlite for GN builds (Shelley Vohr) [#59017](https://github.com/nodejs/node/pull/59017)
- \[[`0f0ce63116`](https://github.com/nodejs/node/commit/0f0ce63116)] - **build**: remove suppressions.supp (Rafael Gonzaga) [#59079](https://github.com/nodejs/node/pull/59079)
- \[[`b30a2117dc`](https://github.com/nodejs/node/commit/b30a2117dc)] - **build,deps,tools**: prepare to update to OpenSSL 3.5 (Richard Lau) [#58100](https://github.com/nodejs/node/pull/58100)
- \[[`8e2076a24f`](https://github.com/nodejs/node/commit/8e2076a24f)] - **(SEMVER-MINOR)** **cli**: add NODE_USE_SYSTEM_CA=1 (Joyee Cheung) [#59276](https://github.com/nodejs/node/pull/59276)
- \[[`e592d739c2`](https://github.com/nodejs/node/commit/e592d739c2)] - **(SEMVER-MINOR)** **cli**: support `${pid}` placeholder in --cpu-prof-name (Haram Jeong) [#59072](https://github.com/nodejs/node/pull/59072)
- \[[`b5571047ed`](https://github.com/nodejs/node/commit/b5571047ed)] - **crypto**: prepare webcrypto key import/export for modern algorithms (Filip Skokan) [#59284](https://github.com/nodejs/node/pull/59284)
- \[[`cda1dab6e2`](https://github.com/nodejs/node/commit/cda1dab6e2)] - **(SEMVER-MINOR)** **crypto**: add tls.setDefaultCACertificates() (Joyee Cheung) [#58822](https://github.com/nodejs/node/pull/58822)
- \[[`76dab34fb7`](https://github.com/nodejs/node/commit/76dab34fb7)] - **deps**: support madvise(3C) across ALL illumos revisions (Dan McDonald) [#58237](https://github.com/nodejs/node/pull/58237)
- \[[`19d3ed64b6`](https://github.com/nodejs/node/commit/19d3ed64b6)] - **deps**: update sqlite to 3.50.4 (Node.js GitHub Bot) [#59337](https://github.com/nodejs/node/pull/59337)
- \[[`38bafc59e0`](https://github.com/nodejs/node/commit/38bafc59e0)] - **deps**: V8: backport 493cb53691be (Chengzhong Wu) [#59238](https://github.com/nodejs/node/pull/59238)
- \[[`e8da171cc3`](https://github.com/nodejs/node/commit/e8da171cc3)] - **deps**: update sqlite to 3.50.3 (Node.js GitHub Bot) [#59132](https://github.com/nodejs/node/pull/59132)
- \[[`fd4ba38ab6`](https://github.com/nodejs/node/commit/fd4ba38ab6)] - **deps**: update googletest to 7e17b15 (Node.js GitHub Bot) [#59131](https://github.com/nodejs/node/pull/59131)
- \[[`f71f427b95`](https://github.com/nodejs/node/commit/f71f427b95)] - **deps**: update archs files for openssl-3.0.17 (Node.js GitHub Bot) [#59134](https://github.com/nodejs/node/pull/59134)
- \[[`79c5a8f4d2`](https://github.com/nodejs/node/commit/79c5a8f4d2)] - **deps**: upgrade openssl sources to openssl-3.0.17 (Node.js GitHub Bot) [#59134](https://github.com/nodejs/node/pull/59134)
- \[[`0dcc84cf53`](https://github.com/nodejs/node/commit/0dcc84cf53)] - **deps**: update corepack to 0.34.0 (Node.js GitHub Bot) [#59133](https://github.com/nodejs/node/pull/59133)
- \[[`1f184513e9`](https://github.com/nodejs/node/commit/1f184513e9)] - **(SEMVER-MINOR)** **dns**: support max timeout (theanarkh) [#58440](https://github.com/nodejs/node/pull/58440)
- \[[`f64f5df80e`](https://github.com/nodejs/node/commit/f64f5df80e)] - **doc**: fix `--use-system-ca` history (Joyee Cheung) [#59411](https://github.com/nodejs/node/pull/59411)
- \[[`e22aeaa38f`](https://github.com/nodejs/node/commit/e22aeaa38f)] - **doc**: add missing section for `setReturnArrays` in `sqlite.md` (Edy Silva) [#59074](https://github.com/nodejs/node/pull/59074)
- \[[`e44ef07235`](https://github.com/nodejs/node/commit/e44ef07235)] - **doc**: rename x509.extKeyUsage to x509.keyUsage (Filip Skokan) [#59332](https://github.com/nodejs/node/pull/59332)
- \[[`2c5d0aac5e`](https://github.com/nodejs/node/commit/2c5d0aac5e)] - **doc**: fix Pbkdf2Params hash attribute heading (Filip Skokan) [#59395](https://github.com/nodejs/node/pull/59395)
- \[[`fde94346e5`](https://github.com/nodejs/node/commit/fde94346e5)] - **doc**: fix missing reference links for server.keepAliveTimeoutBuffer (Lee Jiho) [#59356](https://github.com/nodejs/node/pull/59356)
- \[[`9af8bcea58`](https://github.com/nodejs/node/commit/9af8bcea58)] - **doc**: fix grammar in global dispatcher usage (Eng Zer Jun) [#59344](https://github.com/nodejs/node/pull/59344)
- \[[`0edf17198f`](https://github.com/nodejs/node/commit/0edf17198f)] - **doc**: run license-builder (github-actions\[bot]) [#59343](https://github.com/nodejs/node/pull/59343)
- \[[`7f767a2e38`](https://github.com/nodejs/node/commit/7f767a2e38)] - **doc**: correct orthography `eg.` → `e.g.` (Jacob Smith) [#59329](https://github.com/nodejs/node/pull/59329)
- \[[`a46ed50350`](https://github.com/nodejs/node/commit/a46ed50350)] - **doc**: clarify the need of compiler compatible with c++20 (Rafael Gonzaga) [#59297](https://github.com/nodejs/node/pull/59297)
- \[[`212263a305`](https://github.com/nodejs/node/commit/212263a305)] - **doc**: clarify release candidate stability index (Filip Skokan) [#59295](https://github.com/nodejs/node/pull/59295)
- \[[`ce93b8b556`](https://github.com/nodejs/node/commit/ce93b8b556)] - **doc**: add WDYT to glossary (btea) [#59280](https://github.com/nodejs/node/pull/59280)
- \[[`ebaaf2c67f`](https://github.com/nodejs/node/commit/ebaaf2c67f)] - **doc**: add manpage entry for --use-system-ca (Joyee Cheung) [#59273](https://github.com/nodejs/node/pull/59273)
- \[[`43b5a21916`](https://github.com/nodejs/node/commit/43b5a21916)] - **doc**: add path.join and path.normalize clarification (Rafael Gonzaga) [#59262](https://github.com/nodejs/node/pull/59262)
- \[[`409c66d328`](https://github.com/nodejs/node/commit/409c66d328)] - **doc**: fix typo in `test/common/README.md` (Yoo) [#59180](https://github.com/nodejs/node/pull/59180)
- \[[`cbb0a8eb13`](https://github.com/nodejs/node/commit/cbb0a8eb13)] - **doc**: add note on process memoryUsage (fengmk2) [#59026](https://github.com/nodejs/node/pull/59026)
- \[[`9892b15d81`](https://github.com/nodejs/node/commit/9892b15d81)] - **doc**: format safely for `doc-kit` (Aviv Keller) [#59229](https://github.com/nodejs/node/pull/59229)
- \[[`bace73a173`](https://github.com/nodejs/node/commit/bace73a173)] - **doc**: update the instruction on how to verify releases (Antoine du Hamel) [#59113](https://github.com/nodejs/node/pull/59113)
- \[[`b549deac02`](https://github.com/nodejs/node/commit/b549deac02)] - **doc**: copyedit SECURITY.md (Rich Trott) [#59190](https://github.com/nodejs/node/pull/59190)
- \[[`ef1bc3f344`](https://github.com/nodejs/node/commit/ef1bc3f344)] - **doc**: fix broken sentence in `URL.parse` (Superchupu) [#59164](https://github.com/nodejs/node/pull/59164)
- \[[`3c6639e8ec`](https://github.com/nodejs/node/commit/3c6639e8ec)] - **doc**: improve onboarding instructions (Joyee Cheung) [#59159](https://github.com/nodejs/node/pull/59159)
- \[[`6ffaac66bc`](https://github.com/nodejs/node/commit/6ffaac66bc)] - **doc**: add constraints for mem leak to threat model (Rafael Gonzaga) [#58917](https://github.com/nodejs/node/pull/58917)
- \[[`e419d20144`](https://github.com/nodejs/node/commit/e419d20144)] - **doc**: add Aditi-1400 to collaborators (Aditi Singh) [#59157](https://github.com/nodejs/node/pull/59157)
- \[[`ba380f7bf3`](https://github.com/nodejs/node/commit/ba380f7bf3)] - **doc**: avoid suggesting testing fast api with intense loop (Chengzhong Wu) [#59111](https://github.com/nodejs/node/pull/59111)
- \[[`fa1a532f2b`](https://github.com/nodejs/node/commit/fa1a532f2b)] - **doc**: fix typo in writing-test.md (SeokHun) [#59123](https://github.com/nodejs/node/pull/59123)
- \[[`0b93ca3d19`](https://github.com/nodejs/node/commit/0b93ca3d19)] - **doc**: add RafaelGSS as steward July 25 (Rafael Gonzaga) [#59078](https://github.com/nodejs/node/pull/59078)
- \[[`7d747aeac8`](https://github.com/nodejs/node/commit/7d747aeac8)] - **doc**: clarify ERR_FS_FILE_TOO_LARGE to reflect fs.readFile() I/O limit (Haram Jeong) [#59050](https://github.com/nodejs/node/pull/59050)
- \[[`0b5613f9fe`](https://github.com/nodejs/node/commit/0b5613f9fe)] - **doc**: run license-builder (github-actions\[bot]) [#59056](https://github.com/nodejs/node/pull/59056)
- \[[`1b6b5e72d3`](https://github.com/nodejs/node/commit/1b6b5e72d3)] - **doc**: fix typed list formatting (Aviv Keller) [#59019](https://github.com/nodejs/node/pull/59019)
- \[[`756c7dd639`](https://github.com/nodejs/node/commit/756c7dd639)] - **doc**: refine `util.parseArgs` `default` definition (Slayer95) [#58958](https://github.com/nodejs/node/pull/58958)
- \[[`0b840523a2`](https://github.com/nodejs/node/commit/0b840523a2)] - **doc**: remove unused import in `zlib.md` (coderaiser) [#59041](https://github.com/nodejs/node/pull/59041)
- \[[`3e9ed4b080`](https://github.com/nodejs/node/commit/3e9ed4b080)] - **doc**: add stability index to the `--watch-kill-signal` flag (Dario Piotrowicz) [#58997](https://github.com/nodejs/node/pull/58997)
- \[[`cb08a5d43f`](https://github.com/nodejs/node/commit/cb08a5d43f)] - **doc**: add missing `<code>` blocks (Antoine du Hamel) [#58995](https://github.com/nodejs/node/pull/58995)
- \[[`4a42360fe5`](https://github.com/nodejs/node/commit/4a42360fe5)] - **doc**: add scroll margin to links (Roman Reiss) [#58982](https://github.com/nodejs/node/pull/58982)
- \[[`9d073f32da`](https://github.com/nodejs/node/commit/9d073f32da)] - **doc**: add sponsorship link to RafaelGSS (Rafael Gonzaga) [#58983](https://github.com/nodejs/node/pull/58983)
- \[[`3cc11fc9ac`](https://github.com/nodejs/node/commit/3cc11fc9ac)] - **domain**: remove deprecated API call (Alex Yang) [#59339](https://github.com/nodejs/node/pull/59339)
- \[[`fa9a9e9c69`](https://github.com/nodejs/node/commit/fa9a9e9c69)] - **(SEMVER-MINOR)** **esm**: unflag --experimental-wasm-modules (Guy Bedford) [#57038](https://github.com/nodejs/node/pull/57038)
- \[[`177ed3b3dd`](https://github.com/nodejs/node/commit/177ed3b3dd)] - **esm**: js-string Wasm builtins in ESM Integration (Guy Bedford) [#59020](https://github.com/nodejs/node/pull/59020)
- \[[`4619fe0e04`](https://github.com/nodejs/node/commit/4619fe0e04)] - **fs**: fix glob TypeError on restricted dirs (Sylphy-0xd3ac) [#58674](https://github.com/nodejs/node/pull/58674)
- \[[`ad2089e32d`](https://github.com/nodejs/node/commit/ad2089e32d)] - **fs**: correct error message when FileHandle is transferred (Alex Yang) [#59156](https://github.com/nodejs/node/pull/59156)
- \[[`390a9dc20b`](https://github.com/nodejs/node/commit/390a9dc20b)] - **(SEMVER-MINOR)** **http**: add server.keepAliveTimeoutBuffer option (Haram Jeong) [#59243](https://github.com/nodejs/node/pull/59243)
- \[[`659002359d`](https://github.com/nodejs/node/commit/659002359d)] - **http2**: set Http2Stream#sentHeaders for raw headers (Darshan Sen) [#59244](https://github.com/nodejs/node/pull/59244)
- \[[`d02831ef73`](https://github.com/nodejs/node/commit/d02831ef73)] - **inspector**: initial support for Network.loadNetworkResource (Shima Ryuhei) [#58077](https://github.com/nodejs/node/pull/58077)
- \[[`264a838779`](https://github.com/nodejs/node/commit/264a838779)] - **lib**: add trace-sigint APIs (theanarkh) [#59040](https://github.com/nodejs/node/pull/59040)
- \[[`d22d2fa6d4`](https://github.com/nodejs/node/commit/d22d2fa6d4)] - **lib**: optimize writable stream buffer clearing (Yoo) [#59406](https://github.com/nodejs/node/pull/59406)
- \[[`a5e9759409`](https://github.com/nodejs/node/commit/a5e9759409)] - **lib**: do not modify prototype deprecated asyncResource (RafaelGSS) [#59195](https://github.com/nodejs/node/pull/59195)
- \[[`9254257fc0`](https://github.com/nodejs/node/commit/9254257fc0)] - **lib**: restructure assert to become a class (Miguel Marcondes Filho) [#58253](https://github.com/nodejs/node/pull/58253)
- \[[`946eab8d77`](https://github.com/nodejs/node/commit/946eab8d77)] - **lib**: handle superscript variants on windows device (Rafael Gonzaga) [#59261](https://github.com/nodejs/node/pull/59261)
- \[[`cd857a97b5`](https://github.com/nodejs/node/commit/cd857a97b5)] - **lib**: use validateString (hotpineapple) [#59296](https://github.com/nodejs/node/pull/59296)
- \[[`c12c5343ad`](https://github.com/nodejs/node/commit/c12c5343ad)] - **lib**: docs deprecate \_http\_\* (Sebastian Beltran) [#59293](https://github.com/nodejs/node/pull/59293)
- \[[`a28e5f0938`](https://github.com/nodejs/node/commit/a28e5f0938)] - **lib**: add type names in source mapped stack traces (Chengzhong Wu) [#58976](https://github.com/nodejs/node/pull/58976)
- \[[`6aec5aee7c`](https://github.com/nodejs/node/commit/6aec5aee7c)] - **lib**: prefer AsyncIteratorPrototype primordial (René) [#59097](https://github.com/nodejs/node/pull/59097)
- \[[`e704349858`](https://github.com/nodejs/node/commit/e704349858)] - **lib**: fix incorrect `ArrayBufferPrototypeGetDetached` primordial type (Dario Piotrowicz) [#58978](https://github.com/nodejs/node/pull/58978)
- \[[`2fc25fd400`](https://github.com/nodejs/node/commit/2fc25fd400)] - **lib**: flag to conditionally modify proto on deprecate (Rafael Gonzaga) [#58928](https://github.com/nodejs/node/pull/58928)
- \[[`446ee98e00`](https://github.com/nodejs/node/commit/446ee98e00)] - **meta**: clarify pr objection process further (James M Snell) [#59096](https://github.com/nodejs/node/pull/59096)
- \[[`46c339e4f3`](https://github.com/nodejs/node/commit/46c339e4f3)] - **meta**: add mailmap entry for aditi-1400 (Aditi) [#59316](https://github.com/nodejs/node/pull/59316)
- \[[`70a586261f`](https://github.com/nodejs/node/commit/70a586261f)] - **meta**: add tsc and build team as codeowners building.md (Rafael Gonzaga) [#59298](https://github.com/nodejs/node/pull/59298)
- \[[`e666e06781`](https://github.com/nodejs/node/commit/e666e06781)] - **meta**: add nodejs/path to path files (Rafael Gonzaga) [#59289](https://github.com/nodejs/node/pull/59289)
- \[[`251b65dd6c`](https://github.com/nodejs/node/commit/251b65dd6c)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#59140](https://github.com/nodejs/node/pull/59140)
- \[[`c8a7964da8`](https://github.com/nodejs/node/commit/c8a7964da8)] - **meta**: add marco-ippolito to security release stewards (Marco Ippolito) [#58944](https://github.com/nodejs/node/pull/58944)
- \[[`0eec5cc492`](https://github.com/nodejs/node/commit/0eec5cc492)] - **module**: fix conditions override in synchronous resolve hooks (Joyee Cheung) [#59011](https://github.com/nodejs/node/pull/59011)
- \[[`4acf7cd6d3`](https://github.com/nodejs/node/commit/4acf7cd6d3)] - **module**: throw error when re-runing errored module jobs (Joyee Cheung) [#58957](https://github.com/nodejs/node/pull/58957)
- \[[`f57ee3d71f`](https://github.com/nodejs/node/commit/f57ee3d71f)] - **(SEMVER-MINOR)** **net**: update net.blocklist to allow file save and file management (alphaleadership) [#58087](https://github.com/nodejs/node/pull/58087)
- \[[`4aefcfc318`](https://github.com/nodejs/node/commit/4aefcfc318)] - **node-api**: reword "implementation in an alternative VM" as implementable (Chengzhong Wu) [#59036](https://github.com/nodejs/node/pull/59036)
- \[[`ff6be2ed5d`](https://github.com/nodejs/node/commit/ff6be2ed5d)] - **node-api,doc**: update links to ecma262 with section names (Chengzhong Wu) [#59087](https://github.com/nodejs/node/pull/59087)
- \[[`8d60602677`](https://github.com/nodejs/node/commit/8d60602677)] - **perf_hooks**: do not expose SafeMap via Histogram wrapper (René) [#59094](https://github.com/nodejs/node/pull/59094)
- \[[`035da74c31`](https://github.com/nodejs/node/commit/035da74c31)] - **(SEMVER-MINOR)** **process**: add threadCpuUsage (Paolo Insogna) [#56467](https://github.com/nodejs/node/pull/56467)
- \[[`74e1aa4d06`](https://github.com/nodejs/node/commit/74e1aa4d06)] - **process**: make execve's args argument optional (Allon Murienik) [#58412](https://github.com/nodejs/node/pull/58412)
- \[[`3366e60bd9`](https://github.com/nodejs/node/commit/3366e60bd9)] - **src**: use simdjson to parse SEA configuration (Joyee Cheung) [#59323](https://github.com/nodejs/node/pull/59323)
- \[[`63cc06977a`](https://github.com/nodejs/node/commit/63cc06977a)] - **src**: mark realm leaf classes final (Anna Henningsen) [#59355](https://github.com/nodejs/node/pull/59355)
- \[[`133d410cd9`](https://github.com/nodejs/node/commit/133d410cd9)] - **src**: use C++20 `contains()` method (iknoom) [#59304](https://github.com/nodejs/node/pull/59304)
- \[[`57fe96fe49`](https://github.com/nodejs/node/commit/57fe96fe49)] - **src**: added CHECK_NOT_NULL check for multiple eq_wrap_async (F3lixTheCat) [#59267](https://github.com/nodejs/node/pull/59267)
- \[[`a8f381a6c5`](https://github.com/nodejs/node/commit/a8f381a6c5)] - **src**: add nullptr checks in `StreamPipe::New` (Burkov Egor) [#57613](https://github.com/nodejs/node/pull/57613)
- \[[`0769e5a0dc`](https://github.com/nodejs/node/commit/0769e5a0dc)] - **src**: call unmask after install signal handler (theanarkh) [#59059](https://github.com/nodejs/node/pull/59059)
- \[[`1e7639e9e1`](https://github.com/nodejs/node/commit/1e7639e9e1)] - **src**: use `FastStringKey` for `TrackV8FastApiCall` (Anna Henningsen) [#59148](https://github.com/nodejs/node/pull/59148)
- \[[`9075a1a4bf`](https://github.com/nodejs/node/commit/9075a1a4bf)] - **src**: use C++20 `consteval` for `FastStringKey` (Anna Henningsen) [#59148](https://github.com/nodejs/node/pull/59148)
- \[[`5a0fd5689b`](https://github.com/nodejs/node/commit/5a0fd5689b)] - **src**: remove declarations of removed BaseObject static fns (Anna Henningsen) [#59093](https://github.com/nodejs/node/pull/59093)
- \[[`c637a2c41d`](https://github.com/nodejs/node/commit/c637a2c41d)] - **src**: add cache to nearest parent package json (Ilyas Shabi) [#59086](https://github.com/nodejs/node/pull/59086)
- \[[`3375a6cfee`](https://github.com/nodejs/node/commit/3375a6cfee)] - **test**: deflake sequential/test-tls-session-timeout (Joyee Cheung) [#59423](https://github.com/nodejs/node/pull/59423)
- \[[`438cb11a15`](https://github.com/nodejs/node/commit/438cb11a15)] - **test**: update WPT resources,WebCryptoAPI,webstorage (Filip Skokan) [#59311](https://github.com/nodejs/node/pull/59311)
- \[[`68bec19f76`](https://github.com/nodejs/node/commit/68bec19f76)] - **test**: add known issue test for fs.cpSync dereference bug (James M Snell) [#58941](https://github.com/nodejs/node/pull/58941)
- \[[`a100cce379`](https://github.com/nodejs/node/commit/a100cce379)] - **test**: deflake stream-readable-to-web test (Ethan Arrowood) [#58948](https://github.com/nodejs/node/pull/58948)
- \[[`b7577d853b`](https://github.com/nodejs/node/commit/b7577d853b)] - **test**: make test-inspector-network-resource sequential (Shima Ryuhei) [#59104](https://github.com/nodejs/node/pull/59104)
- \[[`667ee82443`](https://github.com/nodejs/node/commit/667ee82443)] - **test**: don't use expose internals in test-http-outgoing-buffer.js (Meghan Denny) [#59219](https://github.com/nodejs/node/pull/59219)
- \[[`feec26d3bb`](https://github.com/nodejs/node/commit/feec26d3bb)] - **test**: use mustSucceed in test-fs-read (Sungwon) [#59204](https://github.com/nodejs/node/pull/59204)
- \[[`d7e23769ab`](https://github.com/nodejs/node/commit/d7e23769ab)] - **test**: prepare test-crypto-rsa-dsa for newer OpenSSL (Richard Lau) [#58100](https://github.com/nodejs/node/pull/58100)
- \[[`3a9aca91c6`](https://github.com/nodejs/node/commit/3a9aca91c6)] - **test**: fix flaky test-worker-message-port-transfer-filehandle test (Alex Yang) [#59158](https://github.com/nodejs/node/pull/59158)
- \[[`3aee7625b9`](https://github.com/nodejs/node/commit/3aee7625b9)] - **test**: expand linting rules around `assert` w literal messages (Anna Henningsen) [#59147](https://github.com/nodejs/node/pull/59147)
- \[[`667c2ced38`](https://github.com/nodejs/node/commit/667c2ced38)] - **test**: update WPT for WebCryptoAPI to ab08796857 (Node.js GitHub Bot) [#59129](https://github.com/nodejs/node/pull/59129)
- \[[`89ac344393`](https://github.com/nodejs/node/commit/89ac344393)] - **test**: update WPT for WebCryptoAPI to 19d82c57ab (Node.js GitHub Bot) [#59129](https://github.com/nodejs/node/pull/59129)
- \[[`d332957ac6`](https://github.com/nodejs/node/commit/d332957ac6)] - **test**: skip tests that cause timeouts on IBM i (Abdirahim Musse) [#59014](https://github.com/nodejs/node/pull/59014)
- \[[`a23562ff72`](https://github.com/nodejs/node/commit/a23562ff72)] - **test**: update `startCLI` to set `--port=0` by default (Dario Piotrowicz) [#59042](https://github.com/nodejs/node/pull/59042)
- \[[`4a12f5d83b`](https://github.com/nodejs/node/commit/4a12f5d83b)] - **test**: mark test-inspector-network-fetch as flaky on Windows (Joyee Cheung) [#59091](https://github.com/nodejs/node/pull/59091)
- \[[`ac4f7aa69c`](https://github.com/nodejs/node/commit/ac4f7aa69c)] - **test**: add missing port=0 arg in test-debugger-extract-function-name (Dario Piotrowicz) [#58977](https://github.com/nodejs/node/pull/58977)
- \[[`8dd09267e3`](https://github.com/nodejs/node/commit/8dd09267e3)] - **test,crypto**: skip unsupported ciphers (Shelley Vohr) [#59388](https://github.com/nodejs/node/pull/59388)
- \[[`45200b43ea`](https://github.com/nodejs/node/commit/45200b43ea)] - **tools**: update coverage GitHub Actions to fixed version (Rich Trott) [#59512](https://github.com/nodejs/node/pull/59512)
- \[[`8f2b8b3dc4`](https://github.com/nodejs/node/commit/8f2b8b3dc4)] - **tools**: allow selecting test subsystems with numbers in their names (Darshan Sen) [#59242](https://github.com/nodejs/node/pull/59242)
- \[[`f9bc2573dd`](https://github.com/nodejs/node/commit/f9bc2573dd)] - **tools**: clarify README linter error message (Joyee Cheung) [#59160](https://github.com/nodejs/node/pull/59160)
- \[[`cba0de128d`](https://github.com/nodejs/node/commit/cba0de128d)] - **tools**: add support for URLs to PR commits in `merge.sh` (Antoine du Hamel) [#59162](https://github.com/nodejs/node/pull/59162)
- \[[`039949ef5b`](https://github.com/nodejs/node/commit/039949ef5b)] - **tools**: bump @eslint/plugin-kit from 0.3.1 to 0.3.3 in /tools/eslint (dependabot\[bot]) [#59119](https://github.com/nodejs/node/pull/59119)
- \[[`6a8a73aa35`](https://github.com/nodejs/node/commit/6a8a73aa35)] - **tools**: ignore CVE mention when linting release proposals (Antoine du Hamel) [#59037](https://github.com/nodejs/node/pull/59037)
- \[[`d0f40f3a3a`](https://github.com/nodejs/node/commit/d0f40f3a3a)] - **tools,test**: enforce best practices to detect never settling promises (Antoine du Hamel) [#58992](https://github.com/nodejs/node/pull/58992)
- \[[`9d801a3f00`](https://github.com/nodejs/node/commit/9d801a3f00)] - **typings**: improve internal binding types (Nam Yooseong) [#59351](https://github.com/nodejs/node/pull/59351)
- \[[`6dbda6cb25`](https://github.com/nodejs/node/commit/6dbda6cb25)] - **typings**: improve internal binding types (Michaël Zasso) [#59176](https://github.com/nodejs/node/pull/59176)
- \[[`e22dddf859`](https://github.com/nodejs/node/commit/e22dddf859)] - **util**: respect nested formats in styleText (Alex Yang) [#59098](https://github.com/nodejs/node/pull/59098)
- \[[`491f390515`](https://github.com/nodejs/node/commit/491f390515)] - **worker**: add cpuUsage for worker (theanarkh) [#59177](https://github.com/nodejs/node/pull/59177)
- \[[`8e697d1884`](https://github.com/nodejs/node/commit/8e697d1884)] - **(SEMVER-MINOR)** **zlib**: add dictionary support to zstdCompress and zstdDecompress (lluisemper) [#59240](https://github.com/nodejs/node/pull/59240)

Windows 32-bit Installer: https://nodejs.org/dist/v22.19.0/node-v22.19.0-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.19.0/node-v22.19.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.19.0/node-v22.19.0-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.19.0/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.19.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.19.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.19.0/node-v22.19.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.19.0/node-v22.19.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.19.0/node-v22.19.0.tar.gz \
Other release files: https://nodejs.org/dist/v22.19.0/ \
Documentation: https://nodejs.org/docs/v22.19.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

30d83f7c179081542dfe0908d7e27a97ec2270091db6763028356e6750e476b6  node-v22.19.0-aix-ppc64.tar.gz
0b9eacc6ca3833fbccdb7636bd668bacdbb88fe404a980efa50014b84e42953c  node-v22.19.0-arm64.msi
c59006db713c770d6ec63ae16cb3edc11f49ee093b5c415d667bb4f436c6526d  node-v22.19.0-darwin-arm64.tar.gz
1c3a9e78da501bbc1f0c99fbbb69bb7c722bc7a9bf30128b21ea502f3905892a  node-v22.19.0-darwin-arm64.tar.xz
3cfed4795cd97277559763c5f56e711852d2cc2420bda1cea30c8aa9ac77ce0c  node-v22.19.0-darwin-x64.tar.gz
41796082f45db51738d1902cae84fa4f699ff6d2550321361424e8bfe6ea1939  node-v22.19.0-darwin-x64.tar.xz
183bdc17092336ad21e01a425d238e85db4ee077ae3caa0547ff1fbda07d9bd8  node-v22.19.0-headers.tar.gz
12a22367bd09674d04b95265f14295d737892bd682b99aad3122364d36e1ac8f  node-v22.19.0-headers.tar.xz
d32817b937219b8f131a28546035183d79e7fd17a86e38ccb8772901a7cd9009  node-v22.19.0-linux-arm64.tar.gz
0b2d9f564b6594222a62c82e1df2efe119dd4a4aff29644f4dd325bf360b6bcc  node-v22.19.0-linux-arm64.tar.xz
969037e6da2a710904d121dcb998510bc0d5d4d61d70ce5eb578096cf36c60e8  node-v22.19.0-linux-armv7l.tar.gz
91ea7b35edf17d351177da671ea8b40ee8e42d83f6397ab1b66767e50c7d87a9  node-v22.19.0-linux-armv7l.tar.xz
b18b05265c5586e0a7797831ed747eeac7300fd2c495b8b5276596823b076e12  node-v22.19.0-linux-ppc64le.tar.gz
fd1395179c23daec4f5e7d91353ba297b886de2ec7693ed01eb159bc382b18b2  node-v22.19.0-linux-ppc64le.tar.xz
d434665268adf0670a36676f5f3f46aaf5e13aad3fc81dac87119e871745bf22  node-v22.19.0-linux-s390x.tar.gz
874beeae662ae6d27d9078de99b9e553284a614da35abea3b1a13fe5ef79bb8e  node-v22.19.0-linux-s390x.tar.xz
d36e56998220085782c0ca965f9d51b7726335aed2f5fc7321c6c0ad233aa96d  node-v22.19.0-linux-x64.tar.gz
c0649af18e6a24f6fe5535a3e86b341dd49a8e71117c8b68bde973ef834f16f2  node-v22.19.0-linux-x64.tar.xz
d32bc3a62cf0bc0d0d10d943f29383924994eb8492521f63a7b584396242ab95  node-v22.19.0.pkg
4cea680423f98abc6a2a5ca127fb34c5f6586c24217f57749be6ea886c9be9a6  node-v22.19.0.tar.gz
0272acfce50ce9ad060288321b1092719a7f19966f81419835410c59c09daa46  node-v22.19.0.tar.xz
fc941b1baa84c5d1959d06b45c79c38bf50f3e20a8a3bcbb477d64baf7da801e  node-v22.19.0-win-arm64.7z
e4a7336010d58ff35b53d9dd5869095c56089c70913cf22508cf8183593e56b2  node-v22.19.0-win-arm64.zip
7c4547349b05779000ed3b4999c4cdaa1a4752eaef2e6b53bddb4477d0d98e29  node-v22.19.0-win-x64.7z
ea3fad0e67a991d8477d8c01344b56e69c676ccb733f065b22436994b1253f86  node-v22.19.0-win-x64.zip
2e0e9090d4e6fb33832351f531ee921284c1130bcb52173e182a55cfcdfcdd3f  node-v22.19.0-win-x86.7z
708b8a297a19e9ac433e32ac0fc496755757c5e00bd5a0683917e73cae5fe8ea  node-v22.19.0-win-x86.zip
9d75369d5c62f1d24340c7163cbb252fe29e1950b58095ea5f495998930ccefa  node-v22.19.0-x64.msi
96aae9a1053d3f8c81d04f15d3db6debbbb9dad418a0b71dcebaeeb8a5c76ae8  node-v22.19.0-x86.msi
e22d8ae9e47ff62ae4a9a21ecd52feb229c32c1a1d3024ec60c100abb940df30  win-arm64/node.exe
c174ae3348a4a59c9d61629a7a73a38679fd27c55b2a7d85a2ea3e65de2beb13  win-arm64/node.lib
eb4296fadcdc93aa33ef17ade648f3c58e166e3b0e0014b308dbfa7699adbf6e  win-arm64/node_pdb.7z
9bd3d552eb550cdab011b8090a1f6bfa95656ea59301d5e8b9f76114204f80a5  win-arm64/node_pdb.zip
995a3fb3cefad590cd3f4b321532a4b9582fb9c6575320ed2e3e894caac3e362  win-x64/node.exe
4af0951712fb05a686a03e0592880e195ba53e5eb70e224d7ea7b8b76f2a3e86  win-x64/node.lib
fdb302e7d91ab9d1097d82c3e22dfc3bf9f3c8c7e8f1a83a8a7d8b0e60eb4eb4  win-x64/node_pdb.7z
0145b60fb83e2f0007d2a7cf98922530a66d906e6fcf73ab9ed061ac8a282cce  win-x64/node_pdb.zip
8a1fb53454db56c83417abf147922932a764809954b800e34a6903a6c5833c9e  win-x86/node.exe
e1830d28633bfa80180edfffe5f091dc945701ba8cf2b743ca542d34759f505a  win-x86/node.lib
f1ebfb3a63ad01201213771582b719ea55d78a4464fb4fb125972498f4e33512  win-x86/node_pdb.7z
2950f743349e188015355dc67a2b9841a2655a30c08d8440eeb619bdce68597c  win-x86/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaLDGPAAKCRAgsaOQsWjT
VoIwAQDRMdguX4LNxiNICciOtmrK2+mXo1w4RKP6O7Qx7ACeUAEAhi5Ti/Va65O/
AepgUXbYoo01h+HjKkbnZiq5HcIl4Q0=
=YDz7
-----END PGP SIGNATURE-----
```
