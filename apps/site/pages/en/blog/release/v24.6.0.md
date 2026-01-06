---
date: '2025-08-14T21:11:47.069Z'
category: release
title: Node.js 24.6.0 (Current)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-08-14, Version 24.6.0 (Current), @RafaelGSS

### Notable Changes

- \[[`471fe712b3`](https://github.com/nodejs/node/commit/471fe712b3)] - **(SEMVER-MINOR)** **cli**: add NODE_USE_SYSTEM_CA=1 (Joyee Cheung) [#59276](https://github.com/nodejs/node/pull/59276)
- \[[`38aedfbf73`](https://github.com/nodejs/node/commit/38aedfbf73)] - **(SEMVER-MINOR)** **crypto**: support ML-DSA KeyObject, sign, and verify (Filip Skokan) [#59259](https://github.com/nodejs/node/pull/59259)
- \[[`201304537e`](https://github.com/nodejs/node/commit/201304537e)] - **(SEMVER-MINOR)** **zlib**: add dictionary support to zstdCompress and zstdDecompress (lluisemper) [#59240](https://github.com/nodejs/node/pull/59240)
- \[[`e79c93a5d0`](https://github.com/nodejs/node/commit/e79c93a5d0)] - **(SEMVER-MINOR)** **http**: add server.keepAliveTimeoutBuffer option (Haram Jeong) [#59243](https://github.com/nodejs/node/pull/59243)
- \[[`c144d69efc`](https://github.com/nodejs/node/commit/c144d69efc)] - **lib**: docs deprecate \_http\_\* (Sebastian Beltran) [#59293](https://github.com/nodejs/node/pull/59293)
- \[[`aeb4de55a7`](https://github.com/nodejs/node/commit/aeb4de55a7)] - **(SEMVER-MINOR)** **fs**: port SonicBoom module to fs module as Utf8Stream (James M Snell) [#58897](https://github.com/nodejs/node/pull/58897)

### Commits

- \[[`f7484575ff`](https://github.com/nodejs/node/commit/f7484575ff)] - **assert**: change utils to use index instead of for...of (방진혁) [#59278](https://github.com/nodejs/node/pull/59278)
- \[[`269cd16185`](https://github.com/nodejs/node/commit/269cd16185)] - **benchmark**: remove deprecated \_extend from benchmark (Rafael Gonzaga) [#59228](https://github.com/nodejs/node/pull/59228)
- \[[`848e49c20b`](https://github.com/nodejs/node/commit/848e49c20b)] - **benchmark**: add fs warmup to writefile-promises (Bruno Rodrigues) [#59215](https://github.com/nodejs/node/pull/59215)
- \[[`8c609be1b1`](https://github.com/nodejs/node/commit/8c609be1b1)] - **benchmark**: add calibrate-n script (Rafael Gonzaga) [#59186](https://github.com/nodejs/node/pull/59186)
- \[[`6a3bf772d8`](https://github.com/nodejs/node/commit/6a3bf772d8)] - **build**: fix node_use_sqlite for GN builds (Shelley Vohr) [#59017](https://github.com/nodejs/node/pull/59017)
- \[[`471fe712b3`](https://github.com/nodejs/node/commit/471fe712b3)] - **(SEMVER-MINOR)** **cli**: add NODE_USE_SYSTEM_CA=1 (Joyee Cheung) [#59276](https://github.com/nodejs/node/pull/59276)
- \[[`38aedfbf73`](https://github.com/nodejs/node/commit/38aedfbf73)] - **(SEMVER-MINOR)** **crypto**: support ML-DSA KeyObject, sign, and verify (Filip Skokan) [#59259](https://github.com/nodejs/node/pull/59259)
- \[[`a312e706cf`](https://github.com/nodejs/node/commit/a312e706cf)] - **crypto**: prepare webcrypto key import/export for modern algorithms (Filip Skokan) [#59284](https://github.com/nodejs/node/pull/59284)
- \[[`3a7c2c3a47`](https://github.com/nodejs/node/commit/3a7c2c3a47)] - **deps**: update ada to 3.2.7 (Node.js GitHub Bot) [#59336](https://github.com/nodejs/node/pull/59336)
- \[[`8d9ceeaf6a`](https://github.com/nodejs/node/commit/8d9ceeaf6a)] - **deps**: update archs files for openssl-3.5.2 (Node.js GitHub Bot) [#59371](https://github.com/nodejs/node/pull/59371)
- \[[`33b06df354`](https://github.com/nodejs/node/commit/33b06df354)] - **deps**: upgrade openssl sources to openssl-3.5.2 (Node.js GitHub Bot) [#59371](https://github.com/nodejs/node/pull/59371)
- \[[`fa70f1af77`](https://github.com/nodejs/node/commit/fa70f1af77)] - **deps**: support madvise(3C) across ALL illumos revisions (Dan McDonald) [#58237](https://github.com/nodejs/node/pull/58237)
- \[[`f834a6be59`](https://github.com/nodejs/node/commit/f834a6be59)] - **deps**: update undici to 7.13.0 (Node.js GitHub Bot) [#59338](https://github.com/nodejs/node/pull/59338)
- \[[`db2417487e`](https://github.com/nodejs/node/commit/db2417487e)] - **deps**: update sqlite to 3.50.4 (Node.js GitHub Bot) [#59337](https://github.com/nodejs/node/pull/59337)
- \[[`41978adb08`](https://github.com/nodejs/node/commit/41978adb08)] - **deps**: V8: backport 493cb53691be (Chengzhong Wu) [#59238](https://github.com/nodejs/node/pull/59238)
- \[[`05667991ca`](https://github.com/nodejs/node/commit/05667991ca)] - **deps**: V8: backport 1c3e018e7d48 (Renegade334) [#58818](https://github.com/nodejs/node/pull/58818)
- \[[`fd61588bb4`](https://github.com/nodejs/node/commit/fd61588bb4)] - **doc**: rename x509.extKeyUsage to x509.keyUsage (Filip Skokan) [#59332](https://github.com/nodejs/node/pull/59332)
- \[[`a271ae4360`](https://github.com/nodejs/node/commit/a271ae4360)] - **doc**: fix Pbkdf2Params hash attribute heading (Filip Skokan) [#59395](https://github.com/nodejs/node/pull/59395)
- \[[`72cfff165b`](https://github.com/nodejs/node/commit/72cfff165b)] - **doc**: fix missing reference links for server.keepAliveTimeoutBuffer (Lee Jiho) [#59356](https://github.com/nodejs/node/pull/59356)
- \[[`8341916772`](https://github.com/nodejs/node/commit/8341916772)] - **doc**: fix grammar in global dispatcher usage (Eng Zer Jun) [#59344](https://github.com/nodejs/node/pull/59344)
- \[[`e3e489706b`](https://github.com/nodejs/node/commit/e3e489706b)] - **doc**: run license-builder (github-actions\[bot]) [#59343](https://github.com/nodejs/node/pull/59343)
- \[[`46527e8cea`](https://github.com/nodejs/node/commit/46527e8cea)] - **doc**: correct orthography `eg.` → `e.g.` (Jacob Smith) [#59329](https://github.com/nodejs/node/pull/59329)
- \[[`d140c3713e`](https://github.com/nodejs/node/commit/d140c3713e)] - **doc**: clarify the need of compiler compatible with c++20 (Rafael Gonzaga) [#59297](https://github.com/nodejs/node/pull/59297)
- \[[`95e9cabf9d`](https://github.com/nodejs/node/commit/95e9cabf9d)] - **doc**: clarify release candidate stability index (Filip Skokan) [#59295](https://github.com/nodejs/node/pull/59295)
- \[[`a056dd36d2`](https://github.com/nodejs/node/commit/a056dd36d2)] - **doc**: add WDYT to glossary (btea) [#59280](https://github.com/nodejs/node/pull/59280)
- \[[`1e2c52f5c4`](https://github.com/nodejs/node/commit/1e2c52f5c4)] - **doc**: add manpage entry for --use-system-ca (Joyee Cheung) [#59273](https://github.com/nodejs/node/pull/59273)
- \[[`31a46fdeb4`](https://github.com/nodejs/node/commit/31a46fdeb4)] - **doc**: add path.join and path.normalize clarification (Rafael Gonzaga) [#59262](https://github.com/nodejs/node/pull/59262)
- \[[`cff3725ff9`](https://github.com/nodejs/node/commit/cff3725ff9)] - **doc**: fix typo in `test/common/README.md` (Yoo) [#59180](https://github.com/nodejs/node/pull/59180)
- \[[`31a9283591`](https://github.com/nodejs/node/commit/31a9283591)] - **doc**: add note on process memoryUsage (fengmk2) [#59026](https://github.com/nodejs/node/pull/59026)
- \[[`5a98bff6b8`](https://github.com/nodejs/node/commit/5a98bff6b8)] - **doc**: format safely for `doc-kit` (Aviv Keller) [#59229](https://github.com/nodejs/node/pull/59229)
- \[[`95b8b7ea5c`](https://github.com/nodejs/node/commit/95b8b7ea5c)] - **domain**: remove deprecated API call (Alex Yang) [#59339](https://github.com/nodejs/node/pull/59339)
- \[[`2990f178bd`](https://github.com/nodejs/node/commit/2990f178bd)] - **fs**: fix glob TypeError on restricted dirs (Sylphy-0xd3ac) [#58674](https://github.com/nodejs/node/pull/58674)
- \[[`e2fb4caf9c`](https://github.com/nodejs/node/commit/e2fb4caf9c)] - **fs**: correct error message when FileHandle is transferred (Alex Yang) [#59156](https://github.com/nodejs/node/pull/59156)
- \[[`aeb4de55a7`](https://github.com/nodejs/node/commit/aeb4de55a7)] - **(SEMVER-MINOR)** **fs**: port SonicBoom module to fs module as Utf8Stream (James M Snell) [#58897](https://github.com/nodejs/node/pull/58897)
- \[[`e79c93a5d0`](https://github.com/nodejs/node/commit/e79c93a5d0)] - **(SEMVER-MINOR)** **http**: add server.keepAliveTimeoutBuffer option (Haram Jeong) [#59243](https://github.com/nodejs/node/pull/59243)
- \[[`0fb005a53f`](https://github.com/nodejs/node/commit/0fb005a53f)] - **http2**: set Http2Stream#sentHeaders for raw headers (Darshan Sen) [#59244](https://github.com/nodejs/node/pull/59244)
- \[[`e055539604`](https://github.com/nodejs/node/commit/e055539604)] - **lib**: add trace-sigint APIs (theanarkh) [#59040](https://github.com/nodejs/node/pull/59040)
- \[[`d2183d860a`](https://github.com/nodejs/node/commit/d2183d860a)] - **lib**: optimize writable stream buffer clearing (Yoo) [#59406](https://github.com/nodejs/node/pull/59406)
- \[[`47543a7e17`](https://github.com/nodejs/node/commit/47543a7e17)] - **lib**: handle windows reserved device names on UNC (Rafael Gonzaga) [#59286](https://github.com/nodejs/node/pull/59286)
- \[[`c6911f0717`](https://github.com/nodejs/node/commit/c6911f0717)] - **lib**: do not modify prototype deprecated asyncResource (RafaelGSS) [#59195](https://github.com/nodejs/node/pull/59195)
- \[[`3c88b769bb`](https://github.com/nodejs/node/commit/3c88b769bb)] - **lib**: restructure assert to become a class (Miguel Marcondes Filho) [#58253](https://github.com/nodejs/node/pull/58253)
- \[[`e91b54df59`](https://github.com/nodejs/node/commit/e91b54df59)] - **lib**: handle superscript variants on windows device (Rafael Gonzaga) [#59261](https://github.com/nodejs/node/pull/59261)
- \[[`4ee467905d`](https://github.com/nodejs/node/commit/4ee467905d)] - **lib**: use validateString (hotpineapple) [#59296](https://github.com/nodejs/node/pull/59296)
- \[[`c144d69efc`](https://github.com/nodejs/node/commit/c144d69efc)] - **lib**: docs deprecate \_http\_\* (Sebastian Beltran) [#59293](https://github.com/nodejs/node/pull/59293)
- \[[`c89b67e681`](https://github.com/nodejs/node/commit/c89b67e681)] - **lib**: add type names in source mapped stack traces (Chengzhong Wu) [#58976](https://github.com/nodejs/node/pull/58976)
- \[[`5b2363be8d`](https://github.com/nodejs/node/commit/5b2363be8d)] - **lib**: prefer AsyncIteratorPrototype primordial (René) [#59097](https://github.com/nodejs/node/pull/59097)
- \[[`41b4f4d694`](https://github.com/nodejs/node/commit/41b4f4d694)] - **meta**: clarify pr objection process further (James M Snell) [#59096](https://github.com/nodejs/node/pull/59096)
- \[[`0eb5962f1e`](https://github.com/nodejs/node/commit/0eb5962f1e)] - **meta**: add mailmap entry for aditi-1400 (Aditi) [#59316](https://github.com/nodejs/node/pull/59316)
- \[[`a2b72c2304`](https://github.com/nodejs/node/commit/a2b72c2304)] - **meta**: add tsc and build team as codeowners building.md (Rafael Gonzaga) [#59298](https://github.com/nodejs/node/pull/59298)
- \[[`d69f3ee1e0`](https://github.com/nodejs/node/commit/d69f3ee1e0)] - **meta**: add nodejs/path to path files (Rafael Gonzaga) [#59289](https://github.com/nodejs/node/pull/59289)
- \[[`1e37eab865`](https://github.com/nodejs/node/commit/1e37eab865)] - **node-api**: reword "implementation in an alternative VM" as implementable (Chengzhong Wu) [#59036](https://github.com/nodejs/node/pull/59036)
- \[[`64add6302a`](https://github.com/nodejs/node/commit/64add6302a)] - **src**: use simdjson to parse SEA configuration (Joyee Cheung) [#59323](https://github.com/nodejs/node/pull/59323)
- \[[`e9c6636585`](https://github.com/nodejs/node/commit/e9c6636585)] - **src**: mark realm leaf classes final (Anna Henningsen) [#59355](https://github.com/nodejs/node/pull/59355)
- \[[`42ef8147d1`](https://github.com/nodejs/node/commit/42ef8147d1)] - **src**: warn about FastOneByteString invalidation (James M Snell) [#59275](https://github.com/nodejs/node/pull/59275)
- \[[`8686b8037a`](https://github.com/nodejs/node/commit/8686b8037a)] - **src**: remove unused DSAKeyExportJob (Filip Skokan) [#59291](https://github.com/nodejs/node/pull/59291)
- \[[`1e5f632666`](https://github.com/nodejs/node/commit/1e5f632666)] - **src**: use C++20 `contains()` method (iknoom) [#59304](https://github.com/nodejs/node/pull/59304)
- \[[`22d4683cfe`](https://github.com/nodejs/node/commit/22d4683cfe)] - **src**: added CHECK_NOT_NULL check for multiple eq_wrap_async (F3lixTheCat) [#59267](https://github.com/nodejs/node/pull/59267)
- \[[`6a47ff4943`](https://github.com/nodejs/node/commit/6a47ff4943)] - **src**: clear all linked module caches once instantiated (Chengzhong Wu) [#59117](https://github.com/nodejs/node/pull/59117)
- \[[`33728cb4ca`](https://github.com/nodejs/node/commit/33728cb4ca)] - **src**: add nullptr checks in `StreamPipe::New` (Burkov Egor) [#57613](https://github.com/nodejs/node/pull/57613)
- \[[`4a907bdad1`](https://github.com/nodejs/node/commit/4a907bdad1)] - **src**: add percentage support to --max-old-space-size (Asaf Federman) [#59082](https://github.com/nodejs/node/pull/59082)
- \[[`7c189d4f55`](https://github.com/nodejs/node/commit/7c189d4f55)] - **test**: deflake sequential/test-tls-session-timeout (Joyee Cheung) [#59423](https://github.com/nodejs/node/pull/59423)
- \[[`fb0a6fb57f`](https://github.com/nodejs/node/commit/fb0a6fb57f)] - **test**: exclude mock from coverage (Shima Ryuhei) [#59348](https://github.com/nodejs/node/pull/59348)
- \[[`7e10f95f13`](https://github.com/nodejs/node/commit/7e10f95f13)] - **test**: split test-fs-cp.js (Joyee Cheung) [#59408](https://github.com/nodejs/node/pull/59408)
- \[[`41bcf5f659`](https://github.com/nodejs/node/commit/41bcf5f659)] - **test**: update WPT resources,WebCryptoAPI,webstorage (Filip Skokan) [#59311](https://github.com/nodejs/node/pull/59311)
- \[[`f9f3dc94cb`](https://github.com/nodejs/node/commit/f9f3dc94cb)] - **test**: add known issue test for fs.cpSync dereference bug (James M Snell) [#58941](https://github.com/nodejs/node/pull/58941)
- \[[`244d0c38a8`](https://github.com/nodejs/node/commit/244d0c38a8)] - **test**: deflake stream-readable-to-web test (Ethan Arrowood) [#58948](https://github.com/nodejs/node/pull/58948)
- \[[`564e604a1a`](https://github.com/nodejs/node/commit/564e604a1a)] - **test**: make test-inspector-network-resource sequential (Shima Ryuhei) [#59104](https://github.com/nodejs/node/pull/59104)
- \[[`7ab13b7477`](https://github.com/nodejs/node/commit/7ab13b7477)] - **test**: don't use expose internals in test-http-outgoing-buffer.js (Meghan Denny) [#59219](https://github.com/nodejs/node/pull/59219)
- \[[`319df3859a`](https://github.com/nodejs/node/commit/319df3859a)] - **test,crypto**: skip unsupported ciphers (Shelley Vohr) [#59388](https://github.com/nodejs/node/pull/59388)
- \[[`713c70c32a`](https://github.com/nodejs/node/commit/713c70c32a)] - **test_runner**: remove unused callee convertion (Alex Yang) [#59221](https://github.com/nodejs/node/pull/59221)
- \[[`e4ca30e115`](https://github.com/nodejs/node/commit/e4ca30e115)] - **tools**: disable nullability-completeness warnings (Michaël Zasso) [#59392](https://github.com/nodejs/node/pull/59392)
- \[[`dab7f6b542`](https://github.com/nodejs/node/commit/dab7f6b542)] - **tools**: check for std::vector\<v8::Local> in lint (Aditi) [#58497](https://github.com/nodejs/node/pull/58497)
- \[[`7b94982eb0`](https://github.com/nodejs/node/commit/7b94982eb0)] - **tools**: allow selecting test subsystems with numbers in their names (Darshan Sen) [#59242](https://github.com/nodejs/node/pull/59242)
- \[[`16bbcd8881`](https://github.com/nodejs/node/commit/16bbcd8881)] - **typings**: improve internal binding types (Nam Yooseong) [#59351](https://github.com/nodejs/node/pull/59351)
- \[[`76bc4d659b`](https://github.com/nodejs/node/commit/76bc4d659b)] - **typings**: improve internal binding types (Michaël Zasso) [#59176](https://github.com/nodejs/node/pull/59176)
- \[[`eecd3272a6`](https://github.com/nodejs/node/commit/eecd3272a6)] - **worker**: add name for worker (theanarkh) [#59213](https://github.com/nodejs/node/pull/59213)
- \[[`84c3513ce2`](https://github.com/nodejs/node/commit/84c3513ce2)] - **worker**: implements nits in Web Locks code (Antoine du Hamel) [#59270](https://github.com/nodejs/node/pull/59270)
- \[[`bd68fbd753`](https://github.com/nodejs/node/commit/bd68fbd753)] - **worker**: add cpuUsage for worker (theanarkh) [#59177](https://github.com/nodejs/node/pull/59177)
- \[[`201304537e`](https://github.com/nodejs/node/commit/201304537e)] - **(SEMVER-MINOR)** **zlib**: add dictionary support to zstdCompress and zstdDecompress (lluisemper) [#59240](https://github.com/nodejs/node/pull/59240)

Windows 64-bit Installer: https://nodejs.org/dist/v24.6.0/node-v24.6.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.6.0/node-v24.6.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.6.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.6.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.6.0/node-v24.6.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.6.0/node-v24.6.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.6.0/node-v24.6.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.6.0/node-v24.6.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.6.0/node-v24.6.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.6.0/node-v24.6.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.6.0/node-v24.6.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.6.0/node-v24.6.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.6.0/node-v24.6.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.6.0/ \
Documentation: https://nodejs.org/docs/v24.6.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

7979be510ff68962e16891ee29c91080e321d7a55b9fbc6b398d8c20a5932bdf  node-v24.6.0-aix-ppc64.tar.gz
813557e5a6b8b9de6fedd09afcdfe71f4e2ae1ca6f397f58adbb633723f4770e  node-v24.6.0-arm64.msi
768f14952403e3025fed8e2887500dfa63eeb55628a9b203e4b8ebb0fb09c7eb  node-v24.6.0-darwin-arm64.tar.gz
80e400f086f3437f02fff5264e49e962925c9a785337ad23d9985eefd48c5cce  node-v24.6.0-darwin-arm64.tar.xz
695fc33454821b216d68cb198d646a9ad769c77d7c323e738381233e4666dffe  node-v24.6.0-darwin-x64.tar.gz
16e2e41fc34ecad4891e10c453bc51b9e7447233d57057774ae887cc6e718ccd  node-v24.6.0-darwin-x64.tar.xz
6b891cced2a8ee08fef06b8cb36a890bd6d1dd8aca575e2a392bb78f0970b819  node-v24.6.0-headers.tar.gz
ce35026b8f74ed0599ddddb5d84b06b1431f916fd883683002a66a07093e515a  node-v24.6.0-headers.tar.xz
8956e11dbef5b197d62eb8b5b97a131eb42fbb25347fe0cdc9b62a1c1aa36df5  node-v24.6.0-linux-arm64.tar.gz
e514b8b0fa389c10fe3f4278c68fae03df4b7ba61bbde6cae936de3f6ca3b17c  node-v24.6.0-linux-arm64.tar.xz
fafc88baa9acb9fbf82a0898eb80659918534c0ed6d19a490d86756304c66e67  node-v24.6.0-linux-ppc64le.tar.gz
24b23ca8ec4302deeb4422cdb8554fdaf766b0d7bd09fc5759eb42ee577f7c60  node-v24.6.0-linux-ppc64le.tar.xz
1cd77586b48b6db1b5248669619c62c785aeca247a4bfaae95fe9820b77a5405  node-v24.6.0-linux-s390x.tar.gz
a6459f108b3ca5f61704dab2ef30d748d4f4b6dfce6da4d90c15e16482dcb70f  node-v24.6.0-linux-s390x.tar.xz
352ddbc48b586c11f018ec9b886225117909ea93e05b4a04a6db32f3e63d0281  node-v24.6.0-linux-x64.tar.gz
fda6f6a00759eea0a27e34fcdfdd09c2b0413855edaa7f746246cf81c0186e26  node-v24.6.0-linux-x64.tar.xz
9bf78e8fac69fc1cfb394022e3a849617e69de92341a8f125b008445cec22794  node-v24.6.0-win-arm64.7z
5bd85facbcfa32ef38b73a690c28451a5c3dff7b45457f5ef421c4d0b0deeac7  node-v24.6.0-win-arm64.zip
032ae00964bb6102f5efcfe059c220e3fe50d7b4c8f8d96cd1872a8c91bcd63e  node-v24.6.0-win-x64.7z
3a6d32fe5883698e6c59ca5a6554b41c1b2a95db4f7ab7c4edd272f4391780da  node-v24.6.0-win-x64.zip
d3a3f84c6f65d05dceaa332281ba8f4651469d63d49aaed56184e0c415b98e0b  node-v24.6.0-x64.msi
8cfbc75e8682f89bb10d9f3339bea7d6e3c83ec7941894c73e17c9b863c10708  node-v24.6.0.pkg
eba12bb7a8bcd8d5e0bebb9d7733f34d3e4854db4e890702c32f1060151097ed  node-v24.6.0.tar.gz
8ad5c387b5d55d8f3b783b0f1b21bae03a3b3b10ac89a25d266cffa7b795e842  node-v24.6.0.tar.xz
68e82974fc10fee6975160bd14f70f4252a1b65869375d772b716b14d01b5b32  win-arm64/node.exe
e1243754743214ab16c8a6ca356e5aad5d4c17f99c71d6db0dae9a52a92bfe38  win-arm64/node.lib
22ee1fe40eab2cec9f3db8a0466c3fdaba5f94289bf3bfb0ff7a6558493ecb53  win-arm64/node_pdb.7z
85cbe3bb1c5a424b03920efe9dbd91edbfafd34f0a8e259550b3c27ef7013d46  win-arm64/node_pdb.zip
3428a3d055501883385d78b19128550d3e8be39a89e7edba683a9b06830257c7  win-x64/node.exe
39fb0c824509470883bfa8823872e9fa7e266f6d96cfe92ece5a8bcc47559051  win-x64/node.lib
de3625d42dbbd04964c7be9c22f1e7650fde65e5645e8083dcaa2d12ae6d447c  win-x64/node_pdb.7z
cbe953fa9630b93797dcdafb529d7274d49072376d77cc9f6245860b073869c8  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmieT8gACgkQi+q0389V
XvR38Qv8C3noTxn9hFapBd3O70Oa+XKxCGZMVwE8W6r4j1UgyGhehIxNm7wQ6Jo2
GcB/Bm/O//6pmyj60I/2mkxN0S6O6ic8Apx2mmwwpv9CJzn3gVTA/1HsRb9Hy7RD
qq6lbbdK/xqqP42tLWWReEFaogt7LmBbGy/petQ/9+/Bf97fd0RfuVEjBGHno/Mt
uAhL1QUuowpVT7BoL/zYsgKkKvnO3asF0XHPYm6mMP+NVQakGMdp1rIpP5Tqo+d5
m4uaecPO2CDNXHibBpV2KhLEV8S7HVx1wAH81InOe9qJVrAPCYD3T9mvudtf5GYr
ubvMpLGVsnKyHbK6t5RJy4XCbvaXOp0ijTAr1LEHEudc5v1mqp+gqrpe2bWDQIU4
ZIQN0YsTKBT7Mv4l/OcBDeN0OMxZsrKjOa4bZY1ZhWc1JKr52VbIBj2+sCjcVDtK
lc32gGfFgNJiTLHK3drqIcj88fgQmAMv+0tRXS+z2M52IDlm0wvhvgSQZSrztkrn
cDKjt/Ff
=TTKY
-----END PGP SIGNATURE-----
```
