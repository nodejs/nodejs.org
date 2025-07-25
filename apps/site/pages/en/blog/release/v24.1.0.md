---
date: '2025-05-21T15:31:30.747Z'
category: release
title: Node.js v24.1.0 (Current)
layout: blog-post
author: Antoine du Hamel
---

## 2025-05-21, Version 24.1.0 (Current), @aduh95

### Notable Changes

- \[[`9d35b4ce95`](https://github.com/nodejs/node/commit/9d35b4ce95)] - **doc**: add JonasBa to collaborators (Jonas Badalic) [#58355](https://github.com/nodejs/node/pull/58355)
- \[[`b7d1bfa7b4`](https://github.com/nodejs/node/commit/b7d1bfa7b4)] - **doc**: add puskin to collaborators (Giovanni Bucci) [#58308](https://github.com/nodejs/node/pull/58308)
- \[[`fcead7c28e`](https://github.com/nodejs/node/commit/fcead7c28e)] - **(SEMVER-MINOR)** **fs**: add to `Dir` support for explicit resource management (Antoine du Hamel) [#58206](https://github.com/nodejs/node/pull/58206)
- \[[`f7041b9369`](https://github.com/nodejs/node/commit/f7041b9369)] - _**Revert**_ "**test_runner**: change ts default glob" (Théo LUDWIG) [#58202](https://github.com/nodejs/node/pull/58202)

### Commits

- \[[`b33e8d2a71`](https://github.com/nodejs/node/commit/b33e8d2a71)] - **async_hooks**: ensure AsyncLocalStore instances work isolated (Gerhard Stöbich) [#58149](https://github.com/nodejs/node/pull/58149)
- \[[`a1b078b18c`](https://github.com/nodejs/node/commit/a1b078b18c)] - **buffer**: give names to `Buffer.prototype.*Write()` functions (Livia Medeiros) [#58258](https://github.com/nodejs/node/pull/58258)
- \[[`4c967b73c3`](https://github.com/nodejs/node/commit/4c967b73c3)] - **buffer**: use constexpr where possible (Yagiz Nizipli) [#58141](https://github.com/nodejs/node/pull/58141)
- \[[`327095a928`](https://github.com/nodejs/node/commit/327095a928)] - **build**: fix uvwasi pkgname (Antoine du Hamel) [#58270](https://github.com/nodejs/node/pull/58270)
- \[[`2e54653d3d`](https://github.com/nodejs/node/commit/2e54653d3d)] - **build**: use FILE_OFFSET_BITS=64 esp. on 32-bit arch (RafaelGSS) [#58090](https://github.com/nodejs/node/pull/58090)
- \[[`7e4453fe93`](https://github.com/nodejs/node/commit/7e4453fe93)] - **build**: escape > metachar in vcbuild (Gerhard Stöbich) [#58157](https://github.com/nodejs/node/pull/58157)
- \[[`7dabf079b1`](https://github.com/nodejs/node/commit/7dabf079b1)] - **child_process**: give names to promisified `exec()` and `execFile()` (LiviaMedeiros) [#57916](https://github.com/nodejs/node/pull/57916)
- \[[`a896eff1f2`](https://github.com/nodejs/node/commit/a896eff1f2)] - **crypto**: handle missing OPENSSL_TLS_SECURITY_LEVEL (Shelley Vohr) [#58103](https://github.com/nodejs/node/pull/58103)
- \[[`6403aa458f`](https://github.com/nodejs/node/commit/6403aa458f)] - **crypto**: merge CipherBase.initiv into constructor (Tobias Nießen) [#58166](https://github.com/nodejs/node/pull/58166)
- \[[`30897d915c`](https://github.com/nodejs/node/commit/30897d915c)] - **deps**: V8: backport 1d3362c55396 (Shu-yu Guo) [#58230](https://github.com/nodejs/node/pull/58230)
- \[[`63f5d69d2b`](https://github.com/nodejs/node/commit/63f5d69d2b)] - **deps**: V8: cherry-pick 4f38995c8295 (Shu-yu Guo) [#58230](https://github.com/nodejs/node/pull/58230)
- \[[`5a5f6bb1d4`](https://github.com/nodejs/node/commit/5a5f6bb1d4)] - **deps**: V8: cherry-pick 044b9b6f589d (Rezvan Mahdavi Hezaveh) [#58230](https://github.com/nodejs/node/pull/58230)
- \[[`db57f0a4c0`](https://github.com/nodejs/node/commit/db57f0a4c0)] - **deps**: patch V8 to 13.6.233.10 (Michaël Zasso) [#58230](https://github.com/nodejs/node/pull/58230)
- \[[`f54a7a44ab`](https://github.com/nodejs/node/commit/f54a7a44ab)] - _**Revert**_ "**deps**: patch V8 to support compilation with MSVC" (Michaël Zasso) [#58187](https://github.com/nodejs/node/pull/58187)
- \[[`e3193eeca4`](https://github.com/nodejs/node/commit/e3193eeca4)] - _**Revert**_ "**deps**: always define V8_EXPORT_PRIVATE as no-op" (Michaël Zasso) [#58187](https://github.com/nodejs/node/pull/58187)
- \[[`e75ecf8ad1`](https://github.com/nodejs/node/commit/e75ecf8ad1)] - _**Revert**_ "**deps**: disable V8 concurrent sparkplug compilation" (Michaël Zasso) [#58187](https://github.com/nodejs/node/pull/58187)
- \[[`a0ca15558d`](https://github.com/nodejs/node/commit/a0ca15558d)] - **deps**: update llhttp to 9.3.0 (Fedor Indutny) [#58144](https://github.com/nodejs/node/pull/58144)
- \[[`90d4c11992`](https://github.com/nodejs/node/commit/90d4c11992)] - **deps**: update amaro to 0.5.3 (Node.js GitHub Bot) [#58174](https://github.com/nodejs/node/pull/58174)
- \[[`9d35b4ce95`](https://github.com/nodejs/node/commit/9d35b4ce95)] - **doc**: add JonasBa to collaborators (Jonas Badalic) [#58355](https://github.com/nodejs/node/pull/58355)
- \[[`2676ca0cf5`](https://github.com/nodejs/node/commit/2676ca0cf5)] - **doc**: add latest security release steward (Rafael Gonzaga) [#58339](https://github.com/nodejs/node/pull/58339)
- \[[`c35cc1bdd9`](https://github.com/nodejs/node/commit/c35cc1bdd9)] - **doc**: document default test-reporter change (Nico Jansen) [#58302](https://github.com/nodejs/node/pull/58302)
- \[[`2bb433d4a5`](https://github.com/nodejs/node/commit/2bb433d4a5)] - **doc**: fix CryptoKey.algorithm type and other interfaces in webcrypto.md (Filip Skokan) [#58294](https://github.com/nodejs/node/pull/58294)
- \[[`f04f09d783`](https://github.com/nodejs/node/commit/f04f09d783)] - **doc**: mark the callback argument of crypto.generatePrime as mandatory (Allon Murienik) [#58299](https://github.com/nodejs/node/pull/58299)
- \[[`3b9b010844`](https://github.com/nodejs/node/commit/3b9b010844)] - **doc**: remove comma delimiter mention on permissions doc (Rafael Gonzaga) [#58297](https://github.com/nodejs/node/pull/58297)
- \[[`f0cf1a028d`](https://github.com/nodejs/node/commit/f0cf1a028d)] - **doc**: make Stability labels not sticky in Stability index (Livia Medeiros) [#58291](https://github.com/nodejs/node/pull/58291)
- \[[`a1b937bdee`](https://github.com/nodejs/node/commit/a1b937bdee)] - **doc**: update commit-queue documentation (Dario Piotrowicz) [#58275](https://github.com/nodejs/node/pull/58275)
- \[[`b7d1bfa7b4`](https://github.com/nodejs/node/commit/b7d1bfa7b4)] - **doc**: add puskin to collaborators (Giovanni Bucci) [#58308](https://github.com/nodejs/node/pull/58308)
- \[[`fc30cdd8d2`](https://github.com/nodejs/node/commit/fc30cdd8d2)] - **doc**: update stability status for diagnostics_channel to experimental (Idan Goshen) [#58261](https://github.com/nodejs/node/pull/58261)
- \[[`290a5ab8ca`](https://github.com/nodejs/node/commit/290a5ab8ca)] - **doc**: clarify napi_get_value_string\_\* for bufsize 0 (Tobias Nießen) [#58158](https://github.com/nodejs/node/pull/58158)
- \[[`c26863a683`](https://github.com/nodejs/node/commit/c26863a683)] - **doc**: fix typo of file `http.md`, `outgoingMessage.setTimeout` section (yusheng chen) [#58188](https://github.com/nodejs/node/pull/58188)
- \[[`62dbd36dcb`](https://github.com/nodejs/node/commit/62dbd36dcb)] - **doc**: update return types for eventNames method in EventEmitter (Yukihiro Hasegawa) [#58083](https://github.com/nodejs/node/pull/58083)
- \[[`130c135f38`](https://github.com/nodejs/node/commit/130c135f38)] - **fs**: add support for `URL` for `fs.glob`'s `cwd` option (Antoine du Hamel) [#58182](https://github.com/nodejs/node/pull/58182)
- \[[`fcead7c28e`](https://github.com/nodejs/node/commit/fcead7c28e)] - **(SEMVER-MINOR)** **fs**: add to `Dir` support for explicit resource management (Antoine du Hamel) [#58206](https://github.com/nodejs/node/pull/58206)
- \[[`655326ba9f`](https://github.com/nodejs/node/commit/655326ba9f)] - **fs**: glob is stable, so should not emit experimental warnings (Théo LUDWIG) [#58236](https://github.com/nodejs/node/pull/58236)
- \[[`6ebcce7625`](https://github.com/nodejs/node/commit/6ebcce7625)] - **fs**: ensure `dir.read()` does not throw synchronously (Antoine du Hamel) [#58228](https://github.com/nodejs/node/pull/58228)
- \[[`7715722323`](https://github.com/nodejs/node/commit/7715722323)] - **http**: remove unused functions and add todos (Yagiz Nizipli) [#58143](https://github.com/nodejs/node/pull/58143)
- \[[`74a807e31f`](https://github.com/nodejs/node/commit/74a807e31f)] - **http,https**: give names to anonymous or misnamed functions (Livia Medeiros) [#58180](https://github.com/nodejs/node/pull/58180)
- \[[`24a9aefb08`](https://github.com/nodejs/node/commit/24a9aefb08)] - **http2**: add diagnostics channel 'http2.client.stream.start' (Darshan Sen) [#58292](https://github.com/nodejs/node/pull/58292)
- \[[`2cb86a3cd6`](https://github.com/nodejs/node/commit/2cb86a3cd6)] - **http2**: add diagnostics channel 'http2.client.stream.created' (Darshan Sen) [#58246](https://github.com/nodejs/node/pull/58246)
- \[[`8f1aee90d9`](https://github.com/nodejs/node/commit/8f1aee90d9)] - **http2**: give name to promisified `connect()` (LiviaMedeiros) [#57916](https://github.com/nodejs/node/pull/57916)
- \[[`b66f1b0be6`](https://github.com/nodejs/node/commit/b66f1b0be6)] - **inspector**: support for worker inspection in chrome devtools (Shima Ryuhei) [#56759](https://github.com/nodejs/node/pull/56759)
- \[[`868e72e367`](https://github.com/nodejs/node/commit/868e72e367)] - **lib**: fix sourcemaps with ts module mocking (Marco Ippolito) [#58193](https://github.com/nodejs/node/pull/58193)
- \[[`570cb6f6b6`](https://github.com/nodejs/node/commit/570cb6f6b6)] - **meta**: ignore mailmap changes in linux ci (Jonas Badalic) [#58356](https://github.com/nodejs/node/pull/58356)
- \[[`b94f63b865`](https://github.com/nodejs/node/commit/b94f63b865)] - **module**: handle instantiated async module jobs in require(esm) (Joyee Cheung) [#58067](https://github.com/nodejs/node/pull/58067)
- \[[`714b706f2e`](https://github.com/nodejs/node/commit/714b706f2e)] - **repl**: add proper vertical cursor movements (Giovanni Bucci) [#58003](https://github.com/nodejs/node/pull/58003)
- \[[`629a954477`](https://github.com/nodejs/node/commit/629a954477)] - **repl**: add possibility to edit multiline commands while adding them (Giovanni Bucci) [#58003](https://github.com/nodejs/node/pull/58003)
- \[[`17746129f3`](https://github.com/nodejs/node/commit/17746129f3)] - **sqlite**: set `name` and `length` on `sqlite.backup()` (Livia Medeiros) [#58251](https://github.com/nodejs/node/pull/58251)
- \[[`908782b1c0`](https://github.com/nodejs/node/commit/908782b1c0)] - **sqlite**: add build option to build without sqlite (Michael Dawson) [#58122](https://github.com/nodejs/node/pull/58122)
- \[[`a92a4074e4`](https://github.com/nodejs/node/commit/a92a4074e4)] - **src**: remove unused `internalVerifyIntegrity` internal binding (Dario Piotrowicz) [#58285](https://github.com/nodejs/node/pull/58285)
- \[[`e0355b71ba`](https://github.com/nodejs/node/commit/e0355b71ba)] - **src**: add a variant of ToV8Value() for primitive arrays (Aditi) [#57576](https://github.com/nodejs/node/pull/57576)
- \[[`cb24fc71c4`](https://github.com/nodejs/node/commit/cb24fc71c4)] - **src**: remove unused `checkMessagePort` internal binding (Dario Piotrowicz) [#58267](https://github.com/nodejs/node/pull/58267)
- \[[`4db5d0bc49`](https://github.com/nodejs/node/commit/4db5d0bc49)] - **src**: remove unused `shouldRetryAsESM` internal binding (Dario Piotrowicz) [#58265](https://github.com/nodejs/node/pull/58265)
- \[[`3b8d4e32ca`](https://github.com/nodejs/node/commit/3b8d4e32ca)] - **src**: add a couple fast apis in node_os (James M Snell) [#58210](https://github.com/nodejs/node/pull/58210)
- \[[`a135c0aea3`](https://github.com/nodejs/node/commit/a135c0aea3)] - **src**: remove unneeded explicit V8 flags (Michaël Zasso) [#58230](https://github.com/nodejs/node/pull/58230)
- \[[`abeb5c4cdc`](https://github.com/nodejs/node/commit/abeb5c4cdc)] - **src**: fix module buffer allocation (X-BW) [#57738](https://github.com/nodejs/node/pull/57738)
- \[[`9ca4b46eb3`](https://github.com/nodejs/node/commit/9ca4b46eb3)] - **src**: use String::WriteV2() in TwoByteValue (Tobias Nießen) [#58164](https://github.com/nodejs/node/pull/58164)
- \[[`bb28e2bfd7`](https://github.com/nodejs/node/commit/bb28e2bfd7)] - **src**: remove overzealous tcsetattr error check (Ben Noordhuis) [#58200](https://github.com/nodejs/node/pull/58200)
- \[[`329e008e73`](https://github.com/nodejs/node/commit/329e008e73)] - **src**: refactor WriteUCS2 and remove flags argument (Tobias Nießen) [#58163](https://github.com/nodejs/node/pull/58163)
- \[[`c815f29d61`](https://github.com/nodejs/node/commit/c815f29d61)] - **src**: remove NonCopyableMaybe (Tobias Nießen) [#58168](https://github.com/nodejs/node/pull/58168)
- \[[`685d137dec`](https://github.com/nodejs/node/commit/685d137dec)] - **test**: reduce iteration count in test-child-process-stdout-flush-exit (Antoine du Hamel) [#58273](https://github.com/nodejs/node/pull/58273)
- \[[`40dc092e25`](https://github.com/nodejs/node/commit/40dc092e25)] - **test**: remove unnecessary `console.log` from test-repl-null-thrown (Dario Piotrowicz) [#58281](https://github.com/nodejs/node/pull/58281)
- \[[`a3af644dda`](https://github.com/nodejs/node/commit/a3af644dda)] - **test**: allow `tmpDir.path` to be modified (Aviv Keller) [#58173](https://github.com/nodejs/node/pull/58173)
- \[[`97f80374a6`](https://github.com/nodejs/node/commit/97f80374a6)] - **test**: add `Float16Array` to `common.getArrayBufferViews()` (Livia Medeiros) [#58233](https://github.com/nodejs/node/pull/58233)
- \[[`65683735ab`](https://github.com/nodejs/node/commit/65683735ab)] - **test**: fix executable flags (Livia Medeiros) [#58250](https://github.com/nodejs/node/pull/58250)
- \[[`ebb82aa1c3`](https://github.com/nodejs/node/commit/ebb82aa1c3)] - **test**: deflake test-http2-client-socket-destroy (Luigi Pinca) [#58212](https://github.com/nodejs/node/pull/58212)
- \[[`eb4f130b17`](https://github.com/nodejs/node/commit/eb4f130b17)] - **test**: remove Float16Array flag (Livia Medeiros) [#58184](https://github.com/nodejs/node/pull/58184)
- \[[`09a85fdeb1`](https://github.com/nodejs/node/commit/09a85fdeb1)] - **test**: skip test-buffer-tostring-rangeerror when low on memory (Ruben Bridgewater) [#58142](https://github.com/nodejs/node/pull/58142)
- \[[`65446632b1`](https://github.com/nodejs/node/commit/65446632b1)] - **test**: reduce flakiness in test-heapdump-http2 (Joyee Cheung) [#58148](https://github.com/nodejs/node/pull/58148)
- \[[`f7041b9369`](https://github.com/nodejs/node/commit/f7041b9369)] - _**Revert**_ "**test_runner**: change ts default glob" (Théo LUDWIG) [#58202](https://github.com/nodejs/node/pull/58202)
- \[[`287454298d`](https://github.com/nodejs/node/commit/287454298d)] - **test_runner**: unify --require and --import behavior when isolation none (Pietro Marchini) [#57924](https://github.com/nodejs/node/pull/57924)
- \[[`6301b003f7`](https://github.com/nodejs/node/commit/6301b003f7)] - **tools**: ignore `deps/` and `benchmark/` for CodeQL (Rafael Gonzaga) [#58254](https://github.com/nodejs/node/pull/58254)
- \[[`2d5de7e309`](https://github.com/nodejs/node/commit/2d5de7e309)] - **tools**: add read permission to workflows that read contents (Antoine du Hamel) [#58255](https://github.com/nodejs/node/pull/58255)
- \[[`b8d4715527`](https://github.com/nodejs/node/commit/b8d4715527)] - **tools**: support environment variables via comments (Pietro Marchini) [#58186](https://github.com/nodejs/node/pull/58186)
- \[[`d8e88f2c17`](https://github.com/nodejs/node/commit/d8e88f2c17)] - **typings**: add missing typings for `TypedArray` (Jason Zhang) [#58248](https://github.com/nodejs/node/pull/58248)
- \[[`4c6f73c5d5`](https://github.com/nodejs/node/commit/4c6f73c5d5)] - **url**: improve performance of the format function (Giovanni Bucci) [#57099](https://github.com/nodejs/node/pull/57099)
- \[[`94c720c4ee`](https://github.com/nodejs/node/commit/94c720c4ee)] - **util**: add internal `assignFunctionName()` function (LiviaMedeiros) [#57916](https://github.com/nodejs/node/pull/57916)
- \[[`3ed159afd1`](https://github.com/nodejs/node/commit/3ed159afd1)] - **watch**: fix watch args not being properly filtered (Dario Piotrowicz) [#58279](https://github.com/nodejs/node/pull/58279)

Windows 64-bit Installer: https://nodejs.org/dist/v24.1.0/node-v24.1.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.1.0/node-v24.1.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.1.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.1.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.1.0/node-v24.1.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.1.0/node-v24.1.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.1.0/node-v24.1.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.1.0/node-v24.1.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.1.0/node-v24.1.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.1.0/node-v24.1.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.1.0/node-v24.1.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.1.0/node-v24.1.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.1.0/node-v24.1.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.1.0/ \
Documentation: https://nodejs.org/docs/v24.1.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

363a6826fa1ca6bec5028bc4e061b9dcf2f8e163ca4963e8c3d346c03b1ebff1  node-v24.1.0-aix-ppc64.tar.gz
f77a0cc7424d1853f0c3d3911b6f414d84fa4e5e3c71fbd30e909e3a546378b8  node-v24.1.0-arm64.msi
d474192c55b9f54ead37310dfab54431b9ba841fb8abdf8ca800e7a227afc1fb  node-v24.1.0-darwin-arm64.tar.gz
c107305437e41a111f11de52e87b06edf3b462fd1a4178d553704ef96c296f7f  node-v24.1.0-darwin-arm64.tar.xz
cdb47a43209c2fa4b6d9ccf7b71e59096448d172d0034aa213284f8931ef0946  node-v24.1.0-darwin-x64.tar.gz
24972a36e5468bba55fba413c2a09454a3c1e4daa1f8421da9b6c51fc0f4b0f8  node-v24.1.0-darwin-x64.tar.xz
058b49221a7e440209380b744aa5b69e3d08c10fee209e0c0acff818f68f7711  node-v24.1.0-headers.tar.gz
537af3811e044007bf6d7a9c43ae97504b41a20f706cdd61c29c8330b8c815e9  node-v24.1.0-headers.tar.xz
4ed15737d3781baa7d69b6a2e576507666229208fd25c83d58abf8d95b6a56f3  node-v24.1.0-linux-arm64.tar.gz
ff5a3a68781794a473f59a727f35314723785eff6f48aaf983361fadf0eadf36  node-v24.1.0-linux-arm64.tar.xz
62777e5245ec46c151409111172adb7f30f2ef9d006ff5ba11c7cae76b9e91ee  node-v24.1.0-linux-ppc64le.tar.gz
04fa3da93d7e81151ad604b402068d5fc4e8b330c2b65514b86065fccd910f83  node-v24.1.0-linux-ppc64le.tar.xz
83fcab77f7feafa235da6d9d8496adb4c6411b7a9468538447ea27f078decf31  node-v24.1.0-linux-s390x.tar.gz
f01c53d1ba0e7f39ad170a4bb5be3be428e732a27753bb7049e9bde0b058ff35  node-v24.1.0-linux-s390x.tar.xz
4d2beaa55d962c1b31d6a4663cc831087f79f83f304a066963b65c8f4495843f  node-v24.1.0-linux-x64.tar.gz
76b77c43f97a7c4cf60917e24c5e212faaf8ca664e433759ef98d12f268b6b49  node-v24.1.0-linux-x64.tar.xz
8a6addad626179ddb07b566d5d2ca60a979577b5b6d87e4668988b759f6a0b38  node-v24.1.0-win-arm64.7z
aa304f30f1420b4ba0067fe18949b67c56a7e88ceb86a7a76dcde24b63a295f3  node-v24.1.0-win-arm64.zip
987cd5f8edb7c687b722d364b698d277c85c377caae3bb97a8ea56a67892bb94  node-v24.1.0-win-x64.7z
81d6774f5c1581c7ddd32fb25cf6138f68755dfbb245025d05a249aafa35ea9d  node-v24.1.0-win-x64.zip
082fb5a7fbd4eff935aa39d9d3ba4973e5fe0ceb30f500f0d49a7151b7d3dd28  node-v24.1.0-x64.msi
623b7a5fd6886dcfff8aa360b268a7f5031ec1a8a363b30173c0033c96948100  node-v24.1.0.pkg
b565cba1dd8f2eb3db7c95e0c3a87ecc5e77f079611ea6a3688531511383ec72  node-v24.1.0.tar.gz
c8171b2aeccb28c8c5347f273a25adae172fb2a65bc8c975bc22ec58949d0eaf  node-v24.1.0.tar.xz
65cc840ad2b1c4ace2e5896396bef1c0cded8cc4fa1a52eeaf2a3076be90ca87  win-arm64/node.exe
6809fc156673d10cca7dff0e54f28309bb111d235c54493a4a0ca401c2113be7  win-arm64/node.lib
ee9ef6133f31a858fd7d5a25acc707d6a1e0676b33a60ca899fd14296e8b16df  win-arm64/node_pdb.7z
7650ee0c93704e14194f737d6cb2592269069a960c87ccc0f2807ae177e43e1e  win-arm64/node_pdb.zip
586ba24429b718a548ca76cef2414fc64a4755987ac907b5e98ca8d897edbb5d  win-x64/node.exe
34882ca2bb450431047f2dd3bae1c3b8c1cd2b4cffd5c1a0bf079948846d2b83  win-x64/node.lib
e4ecb727402d18544e876d7fdbca16e67b76e8f352c6014b8d05da5ed3bb8163  win-x64/node_pdb.7z
975e384f09ef4516c6c7f0b663a8164592b59a30719b987620c66e098f27d8bf  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEwNYkhDnx1WBKr/tAIdkA/9sjN1YFAmgt8UwACgkQIdkA/9sj
N1ZJIQ//d0qk4XuEG5KdhYnBdjqGX0hsoogtQ5p5bR7hofmj0YrnzEUKqyUmOFqR
au0lfEVjmb6pJvxKalGivtWuFQRmrrtKwWn9rmtC1q5T0TxRRBYCAk+lh1BeEQ3L
TZNsG8j15rWOHyiue2PPWMIMxd2rkiXyGVEZHr5/hth4Aw/QlZ0ZT6MM3GhVogfJ
l/LLFo8HMrOPhWjMumbkqM4wgyAN7vPAiERAbD1whJrOhv+VO5ZyhhQvCH8pmKMb
0ZuE36cqEQ5AA0F3exJLMGR7oMRXO6tjsIwPOuZOHji8xvwStggxLYNM+C0dnNuv
+yyYmL0VpxmX2fdG/yI19L3jTT6F3BdaTugVfEnE6E63hh17yg2jRaipto4gdifZ
5Ugm/C1tPnApYkOdfyy7oGfpRDJdor8t3wB4uM5oisLgMBMFDUcFf+JfISU+G6H8
U5akqXSuZmnDuvK7ofhDt18Nyvwu+q2nMNPCVRORve4s3eKp/fk8/xjDnSTc89dx
YOTfR1etQ6+T3fFnLM44+INbfRMcs0zGZhmyi1DNQLTh+g8ydy9UfOruEkUAI0Bh
iQ7PWjggGxoYav3PSqnt4yfj1NoGgkclXZm86GCAnqu2rfBsR1tNe+aDQ7q8yusB
gyrr1jjLryugV7E2/KdYM9tpGqwylWR+XyOh5QNWCa4GK2xz6pU=
=yqwo
-----END PGP SIGNATURE-----
```
