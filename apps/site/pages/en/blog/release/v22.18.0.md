---
date: '2025-07-31T21:53:12.015Z'
category: release
title: Node.js 22.18.0 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-07-31, Version 22.18.0 'Jod' (LTS), @aduh95

### Notable Changes

#### Type stripping is enabled by default

Node.js will be able to execute TypeScript files without additional configuration:

```console
$ echo 'const foo: string = "World"; console.log(`Hello ${foo}!`);' > file.ts
$ node file.ts
Hello World!
```

There are some limitations in the supported syntax documented at
<https://nodejs.org/api/typescript.html#type-stripping>.

This feature is experimental and is subject to change. Disable it by passing
`--no-experimental-strip-types` CLI flag.

Contributed by Marco Ippolito in [#56350](https://github.com/nodejs/node/pull/56350).

#### Other notable changes

- \[[`26f3711228`](https://github.com/nodejs/node/commit/26f3711228)] - **(SEMVER-MINOR)** **deps**: update amaro to 1.1.0 (Node.js GitHub Bot) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`d80ef2a71f`](https://github.com/nodejs/node/commit/d80ef2a71f)] - **(SEMVER-MINOR)** **doc**: add all watch-mode related flags to node.1 (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)
- \[[`8ab24d21c9`](https://github.com/nodejs/node/commit/8ab24d21c9)] - **doc**: add islandryu to collaborators (Shima Ryuhei) [#58714](https://github.com/nodejs/node/pull/58714)
- \[[`430e66b9b8`](https://github.com/nodejs/node/commit/430e66b9b8)] - **(SEMVER-MINOR)** **esm**: implement `import.meta.main` (Joe) [#57804](https://github.com/nodejs/node/pull/57804)
- \[[`62f7926b6a`](https://github.com/nodejs/node/commit/62f7926b6a)] - **(SEMVER-MINOR)** **fs**: allow correct handling of burst in fs-events with AsyncIterator (Philipp Dunkel) [#58490](https://github.com/nodejs/node/pull/58490)
- \[[`65f19a00c3`](https://github.com/nodejs/node/commit/65f19a00c3)] - **(SEMVER-MINOR)** **permission**: propagate permission model flags on spawn (Rafael Gonzaga) [#58853](https://github.com/nodejs/node/pull/58853)
- \[[`ccca1517f9`](https://github.com/nodejs/node/commit/ccca1517f9)] - **(SEMVER-MINOR)** **sqlite**: add support for `readBigInts` option in db connection level (Miguel Marcondes Filho) [#58697](https://github.com/nodejs/node/pull/58697)
- \[[`48003e87e8`](https://github.com/nodejs/node/commit/48003e87e8)] - **(SEMVER-MINOR)** **src,permission**: add support to `permission.has(addon)` (Rafael Gonzaga) [#58951](https://github.com/nodejs/node/pull/58951)
- \[[`fe4290a0e6`](https://github.com/nodejs/node/commit/fe4290a0e6)] - **(SEMVER-MINOR)** **url**: add `fileURLToPathBuffer` API (James M Snell) [#58700](https://github.com/nodejs/node/pull/58700)
- \[[`4dc6b4c67a`](https://github.com/nodejs/node/commit/4dc6b4c67a)] - **(SEMVER-MINOR)** **watch**: add `--watch-kill-signal` flag (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)
- \[[`8dbc6b210f`](https://github.com/nodejs/node/commit/8dbc6b210f)] - **(SEMVER-MINOR)** **worker**: make `Worker` async disposable (James M Snell) [#58385](https://github.com/nodejs/node/pull/58385)

### Commits

- \[[`b19ffebea7`](https://github.com/nodejs/node/commit/b19ffebea7)] - **assert**: remove dead code (Yoshiya Hinosawa) [#58760](https://github.com/nodejs/node/pull/58760)
- \[[`5bc828beae`](https://github.com/nodejs/node/commit/5bc828beae)] - **benchmark**: add source map and source map cache (Miguel Marcondes Filho) [#58125](https://github.com/nodejs/node/pull/58125)
- \[[`f7c16985a7`](https://github.com/nodejs/node/commit/f7c16985a7)] - **build**: disable v8_enable_pointer_compression_shared_cage on non-64bit (Shelley Vohr) [#58867](https://github.com/nodejs/node/pull/58867)
- \[[`ba42c72f7f`](https://github.com/nodejs/node/commit/ba42c72f7f)] - **build**: option to use custom inspector_protocol path (Shelley Vohr) [#58839](https://github.com/nodejs/node/pull/58839)
- \[[`4fd8911653`](https://github.com/nodejs/node/commit/4fd8911653)] - **build**: fix typo 'Stoage' to 'Storage' in help text (ganglike) [#58777](https://github.com/nodejs/node/pull/58777)
- \[[`114cd95919`](https://github.com/nodejs/node/commit/114cd95919)] - **crypto**: fix inclusion of OPENSSL_IS_BORINGSSL define (Shelley Vohr) [#58845](https://github.com/nodejs/node/pull/58845)
- \[[`6699c75eac`](https://github.com/nodejs/node/commit/6699c75eac)] - **crypto**: fix SHAKE128/256 breaking change introduced with OpenSSL 3.4 (Filip Skokan) [#58942](https://github.com/nodejs/node/pull/58942)
- \[[`f99aa748c0`](https://github.com/nodejs/node/commit/f99aa748c0)] - **deps**: upgrade npm to 10.9.3 (npm team) [#58847](https://github.com/nodejs/node/pull/58847)
- \[[`02e971190b`](https://github.com/nodejs/node/commit/02e971190b)] - **deps**: update sqlite to 3.50.2 (Node.js GitHub Bot) [#58882](https://github.com/nodejs/node/pull/58882)
- \[[`de2b85b5ae`](https://github.com/nodejs/node/commit/de2b85b5ae)] - **deps**: update googletest to 35b75a2 (Node.js GitHub Bot) [#58710](https://github.com/nodejs/node/pull/58710)
- \[[`e7591d7a19`](https://github.com/nodejs/node/commit/e7591d7a19)] - **deps**: update minimatch to 10.0.3 (Node.js GitHub Bot) [#58712](https://github.com/nodejs/node/pull/58712)
- \[[`8c61b96c43`](https://github.com/nodejs/node/commit/8c61b96c43)] - **deps**: update acorn to 8.15.0 (Node.js GitHub Bot) [#58711](https://github.com/nodejs/node/pull/58711)
- \[[`113f4e2d3c`](https://github.com/nodejs/node/commit/113f4e2d3c)] - **deps**: update sqlite to 3.50.1 (Node.js GitHub Bot) [#58630](https://github.com/nodejs/node/pull/58630)
- \[[`7ccd848995`](https://github.com/nodejs/node/commit/7ccd848995)] - **deps**: update simdjson to 3.13.0 (Node.js GitHub Bot) [#58629](https://github.com/nodejs/node/pull/58629)
- \[[`e9c51deb5c`](https://github.com/nodejs/node/commit/e9c51deb5c)] - **deps**: update zlib to 1.3.1-470d3a2 (Node.js GitHub Bot) [#58628](https://github.com/nodejs/node/pull/58628)
- \[[`26f3711228`](https://github.com/nodejs/node/commit/26f3711228)] - **(SEMVER-MINOR)** **deps**: update amaro to 1.1.0 (Node.js GitHub Bot) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`752dde182f`](https://github.com/nodejs/node/commit/752dde182f)] - **(SEMVER-MINOR)** **deps**: update amaro to 1.0.0 (Node.js GitHub Bot) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`258534d0dc`](https://github.com/nodejs/node/commit/258534d0dc)] - **(SEMVER-MINOR)** **deps**: update amaro to 0.5.3 (Node.js GitHub Bot) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`7fcf675503`](https://github.com/nodejs/node/commit/7fcf675503)] - **(SEMVER-MINOR)** **deps**: update amaro to 0.5.2 (Node.js GitHub Bot) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`81a10a67d5`](https://github.com/nodejs/node/commit/81a10a67d5)] - **(SEMVER-MINOR)** **deps**: update amaro to 0.5.1 (Marco Ippolito) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`25f8682a62`](https://github.com/nodejs/node/commit/25f8682a62)] - **(SEMVER-MINOR)** **deps**: update amaro to 0.5.0 (nodejs-github-bot) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`4baf2167e7`](https://github.com/nodejs/node/commit/4baf2167e7)] - **dns**: fix parse memory leaky (theanarkh) [#58973](https://github.com/nodejs/node/pull/58973)
- \[[`e8f4a7df22`](https://github.com/nodejs/node/commit/e8f4a7df22)] - **dns**: set timeout to 1000ms when timeout < 0 (theanarkh) [#58441](https://github.com/nodejs/node/pull/58441)
- \[[`1e373a0a25`](https://github.com/nodejs/node/commit/1e373a0a25)] - **doc**: update release key for aduh95 (Antoine du Hamel) [#58877](https://github.com/nodejs/node/pull/58877)
- \[[`d5c104246f`](https://github.com/nodejs/node/commit/d5c104246f)] - **doc**: remove broken link to permission model source code (Juan José) [#58972](https://github.com/nodejs/node/pull/58972)
- \[[`b8885a25ff`](https://github.com/nodejs/node/commit/b8885a25ff)] - **doc**: clarify details of TSC public and private meetings (James M Snell) [#58925](https://github.com/nodejs/node/pull/58925)
- \[[`aa05823b37`](https://github.com/nodejs/node/commit/aa05823b37)] - **doc**: mark stability markers consistent in `globals.md` (Antoine du Hamel) [#58932](https://github.com/nodejs/node/pull/58932)
- \[[`3856aee9b2`](https://github.com/nodejs/node/commit/3856aee9b2)] - **doc**: move "Core Promise APIs" to "Completed initiatives" (Antoine du Hamel) [#58934](https://github.com/nodejs/node/pull/58934)
- \[[`c2f9735422`](https://github.com/nodejs/node/commit/c2f9735422)] - **doc**: fix `fetch` subsections in `globals.md` (Antoine du Hamel) [#58933](https://github.com/nodejs/node/pull/58933)
- \[[`5f4c7a9d2d`](https://github.com/nodejs/node/commit/5f4c7a9d2d)] - **doc**: add missing `Class:` mentions (Antoine du Hamel) [#58931](https://github.com/nodejs/node/pull/58931)
- \[[`88ee38b37c`](https://github.com/nodejs/node/commit/88ee38b37c)] - **doc**: remove myself from security steward rotation (Michael Dawson) [#58927](https://github.com/nodejs/node/pull/58927)
- \[[`02031a9b0d`](https://github.com/nodejs/node/commit/02031a9b0d)] - **doc**: add ovflowd back to core collaborators (Claudio W.) [#58911](https://github.com/nodejs/node/pull/58911)
- \[[`9551fa3c8f`](https://github.com/nodejs/node/commit/9551fa3c8f)] - **doc**: update email address for Richard Lau (Richard Lau) [#58910](https://github.com/nodejs/node/pull/58910)
- \[[`cd6bc982c0`](https://github.com/nodejs/node/commit/cd6bc982c0)] - **doc**: update vm doc links (Chengzhong Wu) [#58885](https://github.com/nodejs/node/pull/58885)
- \[[`ce49303cd0`](https://github.com/nodejs/node/commit/ce49303cd0)] - **doc**: add missing comma in `child_process.md` (ronijames008) [#58862](https://github.com/nodejs/node/pull/58862)
- \[[`d80ef2a71f`](https://github.com/nodejs/node/commit/d80ef2a71f)] - **(SEMVER-MINOR)** **doc**: add all watch-mode related flags to node.1 (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)
- \[[`f8fcb1c83a`](https://github.com/nodejs/node/commit/f8fcb1c83a)] - **doc**: fix jsdoc definition of assert.ifError() fn in lib/assert.js (jesh) [#58573](https://github.com/nodejs/node/pull/58573)
- \[[`28fddc04ca`](https://github.com/nodejs/node/commit/28fddc04ca)] - **doc**: add array type in http request headers (Michael Henrique) [#58049](https://github.com/nodejs/node/pull/58049)
- \[[`8bd698b688`](https://github.com/nodejs/node/commit/8bd698b688)] - **doc**: add missing colon to headers in `globals.md` (Aviv Keller) [#58825](https://github.com/nodejs/node/pull/58825)
- \[[`fa5818e3c1`](https://github.com/nodejs/node/commit/fa5818e3c1)] - **doc**: fix `stream.md` section order (Antoine du Hamel) [#58811](https://github.com/nodejs/node/pull/58811)
- \[[`2384bfdcbd`](https://github.com/nodejs/node/commit/2384bfdcbd)] - **doc**: fix stability 1.x links excluding the decimal digit (Dario Piotrowicz) [#58783](https://github.com/nodejs/node/pull/58783)
- \[[`4e9fe670c9`](https://github.com/nodejs/node/commit/4e9fe670c9)] - **doc**: fix wrong RFC number in http2 (Deokjin Kim) [#58753](https://github.com/nodejs/node/pull/58753)
- \[[`bbe4ad7351`](https://github.com/nodejs/node/commit/bbe4ad7351)] - **doc**: add history entry for TS support in hooks (Antoine du Hamel) [#58732](https://github.com/nodejs/node/pull/58732)
- \[[`ec60473ab1`](https://github.com/nodejs/node/commit/ec60473ab1)] - **doc**: run license-builder (github-actions\[bot]) [#58722](https://github.com/nodejs/node/pull/58722)
- \[[`8ab24d21c9`](https://github.com/nodejs/node/commit/8ab24d21c9)] - **doc**: add islandryu to collaborators (Shima Ryuhei) [#58714](https://github.com/nodejs/node/pull/58714)
- \[[`8c641105cd`](https://github.com/nodejs/node/commit/8c641105cd)] - **doc**: punctuation fix for Node-API versioning clarification (Jiacai Liu) [#58599](https://github.com/nodejs/node/pull/58599)
- \[[`133b10a0bb`](https://github.com/nodejs/node/commit/133b10a0bb)] - **doc**: add path rules and validation for export targets in package.json (0hm☘️) [#58604](https://github.com/nodejs/node/pull/58604)
- \[[`354a68c460`](https://github.com/nodejs/node/commit/354a68c460)] - **doc**: add history entries to `--input-type` section (Antoine du Hamel) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`430e66b9b8`](https://github.com/nodejs/node/commit/430e66b9b8)] - **(SEMVER-MINOR)** **esm**: implement import.meta.main (Joe) [#57804](https://github.com/nodejs/node/pull/57804)
- \[[`42c4ca6024`](https://github.com/nodejs/node/commit/42c4ca6024)] - **esm**: syncify default path of `ModuleLoader.load` (Jacob Smith) [#57419](https://github.com/nodejs/node/pull/57419)
- \[[`3ac8c686a3`](https://github.com/nodejs/node/commit/3ac8c686a3)] - **esm**: unwrap WebAssembly.Global on Wasm Namespaces (Guy Bedford) [#57525](https://github.com/nodejs/node/pull/57525)
- \[[`c7ebf2e245`](https://github.com/nodejs/node/commit/c7ebf2e245)] - **fs**: close dir before throwing if `options.bufferSize` is invalid (Livia Medeiros) [#58856](https://github.com/nodejs/node/pull/58856)
- \[[`38ffed8744`](https://github.com/nodejs/node/commit/38ffed8744)] - **fs**: special input `-1` on `chown`, `lchown` and `fchown` (Alex Yang) [#58836](https://github.com/nodejs/node/pull/58836)
- \[[`0e82f72a46`](https://github.com/nodejs/node/commit/0e82f72a46)] - **fs**: throw `ERR_INVALID_THIS` on illegal invocations (Livia Medeiros) [#58848](https://github.com/nodejs/node/pull/58848)
- \[[`141b2b1954`](https://github.com/nodejs/node/commit/141b2b1954)] - **fs**: make `Dir` disposers idempotent (René) [#58692](https://github.com/nodejs/node/pull/58692)
- \[[`dedd9d1961`](https://github.com/nodejs/node/commit/dedd9d1961)] - **fs**: avoid computing time coefficient constants in runtime (Livia Medeiros) [#58728](https://github.com/nodejs/node/pull/58728)
- \[[`a029a06b49`](https://github.com/nodejs/node/commit/a029a06b49)] - **fs**: add UV_ENOSPC to list of things to pass to err directly (Jacky Zhao) [#56918](https://github.com/nodejs/node/pull/56918)
- \[[`62f7926b6a`](https://github.com/nodejs/node/commit/62f7926b6a)] - **(SEMVER-MINOR)** **fs**: allow correct handling of burst in fs-events with AsyncIterator (Philipp Dunkel) [#58490](https://github.com/nodejs/node/pull/58490)
- \[[`927d2e77f3`](https://github.com/nodejs/node/commit/927d2e77f3)] - **http**: fix keep-alive not timing out after post-request empty line (Shima Ryuhei) [#58178](https://github.com/nodejs/node/pull/58178)
- \[[`5cd8145612`](https://github.com/nodejs/node/commit/5cd8145612)] - **http2**: add diagnostics channel 'http2.server.stream.close' (Darshan Sen) [#58602](https://github.com/nodejs/node/pull/58602)
- \[[`0f2b31cba4`](https://github.com/nodejs/node/commit/0f2b31cba4)] - **inspector**: add protocol methods retrieving sent/received data (Chengzhong Wu) [#58645](https://github.com/nodejs/node/pull/58645)
- \[[`79428d8946`](https://github.com/nodejs/node/commit/79428d8946)] - **lib**: fix `getTypeScriptParsingMode` jsdoc (沈鸿飞) [#58681](https://github.com/nodejs/node/pull/58681)
- \[[`2c205d857c`](https://github.com/nodejs/node/commit/2c205d857c)] - **lib**: rename `validateInternalField` into `validateThisInternalField` (LiviaMedeiros) [#58765](https://github.com/nodejs/node/pull/58765)
- \[[`f67e927a5f`](https://github.com/nodejs/node/commit/f67e927a5f)] - **lib**: make `validateInternalField()` throw `ERR_INVALID_THIS` (LiviaMedeiros) [#58765](https://github.com/nodejs/node/pull/58765)
- \[[`914701d4f8`](https://github.com/nodejs/node/commit/914701d4f8)] - **lib,src**: support DOMException ser-des (Chengzhong Wu) [#58649](https://github.com/nodejs/node/pull/58649)
- \[[`12a75dca8b`](https://github.com/nodejs/node/commit/12a75dca8b)] - **meta**: bump step-security/harden-runner from 2.12.0 to 2.12.2 (dependabot\[bot]) [#58923](https://github.com/nodejs/node/pull/58923)
- \[[`0d56fec6f0`](https://github.com/nodejs/node/commit/0d56fec6f0)] - **meta**: bump github/codeql-action from 3.28.18 to 3.29.2 (dependabot\[bot]) [#58922](https://github.com/nodejs/node/pull/58922)
- \[[`7f4f6e0409`](https://github.com/nodejs/node/commit/7f4f6e0409)] - **meta**: add IlyasShabi to collaborators (Ilyas Shabi) [#58916](https://github.com/nodejs/node/pull/58916)
- \[[`50b62c9663`](https://github.com/nodejs/node/commit/50b62c9663)] - **meta**: add @nodejs/inspector as codeowner (Chengzhong Wu) [#58790](https://github.com/nodejs/node/pull/58790)
- \[[`2fc89892ab`](https://github.com/nodejs/node/commit/2fc89892ab)] - **module**: fix typescript import.meta.main (Marco Ippolito) [#58661](https://github.com/nodejs/node/pull/58661)
- \[[`bfc68c8ae8`](https://github.com/nodejs/node/commit/bfc68c8ae8)] - **module**: convert schema-only core module on `convertCJSFilenameToURL` (Alex Yang) [#58612](https://github.com/nodejs/node/pull/58612)
- \[[`54634f5e53`](https://github.com/nodejs/node/commit/54634f5e53)] - **module**: update tests for combined ambiguous module syntax error (Mert Can Altin) [#55874](https://github.com/nodejs/node/pull/55874)
- \[[`10eb3db4af`](https://github.com/nodejs/node/commit/10eb3db4af)] - **module**: allow cycles in require() in the CJS handling in ESM loader (Joyee Cheung) [#58598](https://github.com/nodejs/node/pull/58598)
- \[[`fe7994eb0c`](https://github.com/nodejs/node/commit/fe7994eb0c)] - **module**: improve typescript error message format (Marco Ippolito) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`c898491017`](https://github.com/nodejs/node/commit/c898491017)] - **(SEMVER-MINOR)** **module**: remove experimental warning from type stripping (Marco Ippolito) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`c07745a436`](https://github.com/nodejs/node/commit/c07745a436)] - **module**: refactor commonjs typescript loader (Marco Ippolito) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`8d1f5df313`](https://github.com/nodejs/node/commit/8d1f5df313)] - **(SEMVER-MINOR)** **module**: unflag --experimental-strip-types (Marco Ippolito) [#56350](https://github.com/nodejs/node/pull/56350)
- \[[`a8a1c9a960`](https://github.com/nodejs/node/commit/a8a1c9a960)] - **os**: fix GetInterfaceAddresses memory lieaky (theanarkh) [#58940](https://github.com/nodejs/node/pull/58940)
- \[[`65f19a00c3`](https://github.com/nodejs/node/commit/65f19a00c3)] - **(SEMVER-MINOR)** **permission**: propagate permission model flags on spawn (Rafael Gonzaga) [#58853](https://github.com/nodejs/node/pull/58853)
- \[[`f0a165d89f`](https://github.com/nodejs/node/commit/f0a165d89f)] - **repl**: fix eval errors thrown after close throwing `ERR_USE_AFTER_CLOSE` (Dario Piotrowicz) [#58791](https://github.com/nodejs/node/pull/58791)
- \[[`9ef1cd1607`](https://github.com/nodejs/node/commit/9ef1cd1607)] - **repl**: avoid deprecated `require.extensions` in tab completion (baki gul) [#58653](https://github.com/nodejs/node/pull/58653)
- \[[`22a4c60e08`](https://github.com/nodejs/node/commit/22a4c60e08)] - **repl**: fix tab completion not working with computer string properties (Dario Piotrowicz) [#58709](https://github.com/nodejs/node/pull/58709)
- \[[`ccca1517f9`](https://github.com/nodejs/node/commit/ccca1517f9)] - **(SEMVER-MINOR)** **sqlite**: add support for readBigInts option in db connection level (Miguel Marcondes Filho) [#58697](https://github.com/nodejs/node/pull/58697)
- \[[`690525881e`](https://github.com/nodejs/node/commit/690525881e)] - **src**: simplify adding fast APIs to ExternalReferenceRegistry (René) [#58896](https://github.com/nodejs/node/pull/58896)
- \[[`a381b4d990`](https://github.com/nodejs/node/commit/a381b4d990)] - **src**: remove fast API for InternalModuleStat (Joyee Cheung) [#58489](https://github.com/nodejs/node/pull/58489)
- \[[`390654e996`](https://github.com/nodejs/node/commit/390654e996)] - **src**: fix internalModuleStat v8 fast path (Yagiz Nizipli) [#58054](https://github.com/nodejs/node/pull/58054)
- \[[`b722647572`](https://github.com/nodejs/node/commit/b722647572)] - **src**: fix -Wunreachable-code in src/node_api.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`6d1fe67f56`](https://github.com/nodejs/node/commit/6d1fe67f56)] - **src**: -Wunreachable-code error in crypto_context.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`2d8e65c6db`](https://github.com/nodejs/node/commit/2d8e65c6db)] - **src**: fix -Wunreachable-code-return in src/node_contextify.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`e07adb3b18`](https://github.com/nodejs/node/commit/e07adb3b18)] - **src**: cleanup uv_fs_req before uv_fs_stat on existSync (RafaelGSS) [#58915](https://github.com/nodejs/node/pull/58915)
- \[[`6b30c0a511`](https://github.com/nodejs/node/commit/6b30c0a511)] - **src**: -Wmismatched-new-delete in debug_utils.cc (Shelley Vohr) [#58844](https://github.com/nodejs/node/pull/58844)
- \[[`74ef07f2e7`](https://github.com/nodejs/node/commit/74ef07f2e7)] - **src**: add FromV8Value\<T>() for integral and enum types (Aditi) [#57931](https://github.com/nodejs/node/pull/57931)
- \[[`28bf6ed87d`](https://github.com/nodejs/node/commit/28bf6ed87d)] - **src**: pass resource on permission checks for spawn (Rafael Gonzaga) [#58758](https://github.com/nodejs/node/pull/58758)
- \[[`daf65d479b`](https://github.com/nodejs/node/commit/daf65d479b)] - **src**: replace std::array with static arrays in contextify (Mert Can Altin) [#58580](https://github.com/nodejs/node/pull/58580)
- \[[`9cb671fdb1`](https://github.com/nodejs/node/commit/9cb671fdb1)] - **src**: add new CopyUtimes function to reduce code duplication (Dario Piotrowicz) [#58625](https://github.com/nodejs/node/pull/58625)
- \[[`e515eb861c`](https://github.com/nodejs/node/commit/e515eb861c)] - **src**: replace V8 Fast API todo comment with note comment (Dario Piotrowicz) [#58614](https://github.com/nodejs/node/pull/58614)
- \[[`48003e87e8`](https://github.com/nodejs/node/commit/48003e87e8)] - **(SEMVER-MINOR)** **src,permission**: add support to permission.has(addon) (Rafael Gonzaga) [#58951](https://github.com/nodejs/node/pull/58951)
- \[[`72f75bb976`](https://github.com/nodejs/node/commit/72f75bb976)] - **src,permission**: enhance permission model debug (Rafael Gonzaga) [#58898](https://github.com/nodejs/node/pull/58898)
- \[[`66fccc252b`](https://github.com/nodejs/node/commit/66fccc252b)] - **(SEMVER-MINOR)** **test**: add test for async disposable worker thread (James M Snell) [#58385](https://github.com/nodejs/node/pull/58385)
- \[[`43d2ad8599`](https://github.com/nodejs/node/commit/43d2ad8599)] - **test**: deflake test-runner-watch-mode-kill-signal (Dario Piotrowicz) [#58952](https://github.com/nodejs/node/pull/58952)
- \[[`7c54085698`](https://github.com/nodejs/node/commit/7c54085698)] - **test**: add known issue tests for recursive readdir calls with Buffer path (Dario Piotrowicz) [#58893](https://github.com/nodejs/node/pull/58893)
- \[[`cd2a5d9a51`](https://github.com/nodejs/node/commit/cd2a5d9a51)] - **test**: add known issue tests for fs.cp (James M Snell) [#58883](https://github.com/nodejs/node/pull/58883)
- \[[`26072a7953`](https://github.com/nodejs/node/commit/26072a7953)] - **test**: add tests to ensure that node.1 is kept in sync with cli.md (Dario Piotrowicz) [#58878](https://github.com/nodejs/node/pull/58878)
- \[[`3fd187f559`](https://github.com/nodejs/node/commit/3fd187f559)] - **test**: replace `.filter()[0]` with `.find()` (Livia Medeiros) [#58872](https://github.com/nodejs/node/pull/58872)
- \[[`0d538abb15`](https://github.com/nodejs/node/commit/0d538abb15)] - **test**: remove reliance on in-tree `deps/undici` (Richard Lau) [#58866](https://github.com/nodejs/node/pull/58866)
- \[[`e24dede403`](https://github.com/nodejs/node/commit/e24dede403)] - **test**: close dirs in `fs-opendir` test (Livia Medeiros) [#58855](https://github.com/nodejs/node/pull/58855)
- \[[`ac6b8222e6`](https://github.com/nodejs/node/commit/ac6b8222e6)] - **test**: correct SIMD support comment (Richard Lau) [#58767](https://github.com/nodejs/node/pull/58767)
- \[[`9d3e451181`](https://github.com/nodejs/node/commit/9d3e451181)] - **test**: add tests for REPL custom evals (Dario Piotrowicz) [#57850](https://github.com/nodejs/node/pull/57850)
- \[[`17a3246718`](https://github.com/nodejs/node/commit/17a3246718)] - **test**: reduce the use of private symbols in test-events-once.js (Yoshiya Hinosawa) [#58685](https://github.com/nodejs/node/pull/58685)
- \[[`bbf33efcd0`](https://github.com/nodejs/node/commit/bbf33efcd0)] - **test**: use `common.skipIfInspectorDisabled()` to skip tests (Dario Piotrowicz) [#58675](https://github.com/nodejs/node/pull/58675)
- \[[`d6660baff7`](https://github.com/nodejs/node/commit/d6660baff7)] - **test**: update WPT for dom/abort to dc928169ee (Node.js GitHub Bot) [#58644](https://github.com/nodejs/node/pull/58644)
- \[[`6d9d5deb44`](https://github.com/nodejs/node/commit/6d9d5deb44)] - **test**: split indirect eval import tests (Chengzhong Wu) [#58637](https://github.com/nodejs/node/pull/58637)
- \[[`abd5b5fd20`](https://github.com/nodejs/node/commit/abd5b5fd20)] - **test**: deflake async-hooks/test-improper-order on AIX (Baki Gul) [#58567](https://github.com/nodejs/node/pull/58567)
- \[[`3fc630e7cf`](https://github.com/nodejs/node/commit/3fc630e7cf)] - **test**: close FileHandle objects in tests explicitly (James M Snell) [#58615](https://github.com/nodejs/node/pull/58615)
- \[[`7f0560dc4b`](https://github.com/nodejs/node/commit/7f0560dc4b)] - **test**: skip broken sea on rhel8 (Marco Ippolito) [#58914](https://github.com/nodejs/node/pull/58914)
- \[[`898e68a915`](https://github.com/nodejs/node/commit/898e68a915)] - **test**: save the config file in a temporary directory (Luigi Pinca) [#58799](https://github.com/nodejs/node/pull/58799)
- \[[`9f2132a4f6`](https://github.com/nodejs/node/commit/9f2132a4f6)] - **test**: deflake test-config-file (Luigi Pinca) [#58799](https://github.com/nodejs/node/pull/58799)
- \[[`f1b74cff9a`](https://github.com/nodejs/node/commit/f1b74cff9a)] - **test**: skip tests failing when run under root (Livia Medeiros) [#58610](https://github.com/nodejs/node/pull/58610)
- \[[`4b0ee14a97`](https://github.com/nodejs/node/commit/4b0ee14a97)] - **tools**: bump the eslint group in /tools/eslint with 6 updates (dependabot\[bot]) [#58921](https://github.com/nodejs/node/pull/58921)
- \[[`a84935fb0e`](https://github.com/nodejs/node/commit/a84935fb0e)] - **tools**: update inspector_protocol to 69d69dd (Shelley Vohr) [#58900](https://github.com/nodejs/node/pull/58900)
- \[[`af805186cd`](https://github.com/nodejs/node/commit/af805186cd)] - **tools**: update gyp-next to 0.20.2 (Node.js GitHub Bot) [#58788](https://github.com/nodejs/node/pull/58788)
- \[[`a2d2d36bb1`](https://github.com/nodejs/node/commit/a2d2d36bb1)] - **tools**: make nodedownload module compatible with Python 3.14 (Lumír 'Frenzy' Balhar) [#58752](https://github.com/nodejs/node/pull/58752)
- \[[`cc8b9aa43d`](https://github.com/nodejs/node/commit/cc8b9aa43d)] - **tools**: include toolchain.gypi in abseil.gyp (Chengzhong Wu) [#58678](https://github.com/nodejs/node/pull/58678)
- \[[`fbbf49a7d3`](https://github.com/nodejs/node/commit/fbbf49a7d3)] - **tools**: bump `brace-expansion` in `/tools/clang-format` (dependabot\[bot]) [#58699](https://github.com/nodejs/node/pull/58699)
- \[[`8db92a41c5`](https://github.com/nodejs/node/commit/8db92a41c5)] - **tools**: bump brace-expansion from 1.1.11 to 1.1.12 in /tools/eslint (dependabot\[bot]) [#58698](https://github.com/nodejs/node/pull/58698)
- \[[`3a099cf88f`](https://github.com/nodejs/node/commit/3a099cf88f)] - **tools**: switch to `@stylistic/eslint-plugin` (Michaël Zasso) [#58623](https://github.com/nodejs/node/pull/58623)
- \[[`9798511e7c`](https://github.com/nodejs/node/commit/9798511e7c)] - **tools**: remove config.status under `make distclean` (René) [#58603](https://github.com/nodejs/node/pull/58603)
- \[[`011290a4eb`](https://github.com/nodejs/node/commit/011290a4eb)] - **tools**: edit commit-queue workflow file (Antoine du Hamel) [#58667](https://github.com/nodejs/node/pull/58667)
- \[[`a7406f56da`](https://github.com/nodejs/node/commit/a7406f56da)] - **tools**: improve release proposal linter (Antoine du Hamel) [#58647](https://github.com/nodejs/node/pull/58647)
- \[[`c855310f83`](https://github.com/nodejs/node/commit/c855310f83)] - **tools,doc**: move more MDN links to types (Antoine du Hamel) [#58930](https://github.com/nodejs/node/pull/58930)
- \[[`805239c824`](https://github.com/nodejs/node/commit/805239c824)] - **typings**: add Atomics primordials (Renegade334) [#58577](https://github.com/nodejs/node/pull/58577)
- \[[`d28b2aa0a2`](https://github.com/nodejs/node/commit/d28b2aa0a2)] - **typings**: add ZSTD_COMPRESS, ZSTD_DECOMPRESS to internalBinding (Meghan Denny) [#58655](https://github.com/nodejs/node/pull/58655)
- \[[`fe4290a0e6`](https://github.com/nodejs/node/commit/fe4290a0e6)] - **(SEMVER-MINOR)** **url**: add fileURLToPathBuffer API (James M Snell) [#58700](https://github.com/nodejs/node/pull/58700)
- \[[`db648b92c1`](https://github.com/nodejs/node/commit/db648b92c1)] - **util**: inspect: do not crash on an Error stack pointing to itself (Sam Verschueren) [#58196](https://github.com/nodejs/node/pull/58196)
- \[[`791ecfac14`](https://github.com/nodejs/node/commit/791ecfac14)] - **v8**: fix missing callback in heap utils destroy (Ruben Bridgewater) [#58846](https://github.com/nodejs/node/pull/58846)
- \[[`4dc6b4c67a`](https://github.com/nodejs/node/commit/4dc6b4c67a)] - **(SEMVER-MINOR)** **watch**: add `--watch-kill-signal` flag (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)
- \[[`8dbc6b210f`](https://github.com/nodejs/node/commit/8dbc6b210f)] - **(SEMVER-MINOR)** **worker**: make Worker async disposable (James M Snell) [#58385](https://github.com/nodejs/node/pull/58385)

Windows 32-bit Installer: https://nodejs.org/dist/v22.18.0/node-v22.18.0-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.18.0/node-v22.18.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.18.0/node-v22.18.0-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.18.0/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.18.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.18.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.18.0/node-v22.18.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.18.0/node-v22.18.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.18.0/node-v22.18.0.tar.gz \
Other release files: https://nodejs.org/dist/v22.18.0/ \
Documentation: https://nodejs.org/docs/v22.18.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

7bb75af308fc9f63e568968e0ef0e1600bb105abe2d2af99217ac72e9a24ffd0  node-v22.18.0-aix-ppc64.tar.gz
1dd46ad5edd1085da2b1a5b7e3e2a03d0266476786a7849a1207045fecc73d39  node-v22.18.0-arm64.msi
2c12913cba67af77ded8a399df3fd91c2e7f8628c7079da40bb9ff33bf00dfc0  node-v22.18.0-darwin-arm64.tar.gz
6616f388e127c858989fc7fa92879cdb20d2a5d446adbfdca6ee4feb385bfa8a  node-v22.18.0-darwin-arm64.tar.xz
9c8aa1e5ff5780b38cc1134e2263d84e2f4308eb84c02515e3af33936ca02cdc  node-v22.18.0-darwin-x64.tar.gz
76e4a1997da953dbf8e21f6ed1c4dd7eceb39deb96defe3b3e9d8f786ee287a8  node-v22.18.0-darwin-x64.tar.xz
c99fd7e0a7d2b7563ef5276e09a1f23559381c601ef80ccdce91259d6f6d0971  node-v22.18.0-headers.tar.gz
68a214508678fc6119bf1ad391fbf89fb624ab000d85693ef7c8a764b6622351  node-v22.18.0-headers.tar.xz
d415eeea90a2fdb60c66dd386b258acbfc4d1fa4720a8df5dea7369fbdbcddee  node-v22.18.0-linux-arm64.tar.gz
04fca1b9afecf375f26b41d65d52aa1703a621abea5a8948c7d1e351e85edade  node-v22.18.0-linux-arm64.tar.xz
57830914581dc3640e8d95378b76c6910860f42531959e4e88eb445e0cd982b0  node-v22.18.0-linux-armv7l.tar.gz
4d5efa082c1afbd9732dd13ab878f1b065c48c4caa08c7e6d833a759e3e6cd65  node-v22.18.0-linux-armv7l.tar.xz
38f965cbaa5e730dbd3b1afe895cfdb86da96371474827d05d847d338a0c9c97  node-v22.18.0-linux-ppc64le.tar.gz
f585a7d770619ba4eb7d4fd7df9fab5a1b1bd3aafb42046330a64952796d2869  node-v22.18.0-linux-ppc64le.tar.xz
f3578b0e7cdf247045f6eeb766febd74942954352161102cb6040a4d4c3b4c3c  node-v22.18.0-linux-s390x.tar.gz
ffa98dc69fb63dfc49b3825e2c8f0e0489f6c00184dd4a85c6e1cb1d98e613ec  node-v22.18.0-linux-s390x.tar.xz
a2e703725d8683be86bb5da967bf8272f4518bdaf10f21389e2b2c9eaeae8c8a  node-v22.18.0-linux-x64.tar.gz
c1bfeecf1d7404fa74728f9db72e697decbd8119ccc6f5a294d795756dfcfca7  node-v22.18.0-linux-x64.tar.xz
2b8fdd687b7d497121c0d3f519987a73fcbe3e0b667f7dd0e4913d4bf2ee5adb  node-v22.18.0-win-arm64.7z
023afb3d25c4c7d10cb6eb8a64865c347b56d4b07e6690606d021130a9192263  node-v22.18.0-win-arm64.zip
2a19a4258cede4f2bd9be7f65768658ae6436fe8b8b223846e5bacefdf4d64c2  node-v22.18.0-win-x64.7z
c95d8a7e1c99e669cc08c9f1176e068c1f50847c37908fcb8c35b62482366511  node-v22.18.0-win-x64.zip
37212dfb1b5dc1c4d3589979523fd607f05cb1d8780c0a7d37a85e2f899d9259  node-v22.18.0-win-x86.7z
f2e546345f729d8e82c82a088e616e76df14330c53d3cfecbbab51f783f08cf4  node-v22.18.0-win-x86.zip
dffd8e34d8eb1a1a2e6f5e6f129c4b1b8a34aa54e02799007adc99d73efac75c  node-v22.18.0-x64.msi
81bc73f802094ee8306ebab9c73f9e1fccfa11c7f4d62f536bd3f3df3f7de947  node-v22.18.0-x86.msi
6dcf25409694feab54e7c634f30cc722f0a31941c81d9d9715e880cb64ef5c35  node-v22.18.0.pkg
26247ff9a75ac13f6dac7e07dca6172314554dcf20761675c5435f1e84e6c4b2  node-v22.18.0.tar.gz
120e0f74419097a9fafae1fd80b9de7791a587e6f1c48c22b193239ccd0f7084  node-v22.18.0.tar.xz
9cdd74e4d0fde4d8b43f2370577a194ebf3fc844cd6d177e98bc7c3f432e972a  win-arm64/node.exe
c174ae3348a4a59c9d61629a7a73a38679fd27c55b2a7d85a2ea3e65de2beb13  win-arm64/node.lib
ad2d63ea61956f141f7b3902e7a1107d2efa2e4a7e13ddf94d87c517f42d672d  win-arm64/node_pdb.7z
8602ec90e83461cd8435bb9a86696c0d7ec1a1f4029e60a8eafb2891c1fe405b  win-arm64/node_pdb.zip
c22d1c59a1f767a1ed0178445a027f2257d318c55430fc819d48f269586822b7  win-x64/node.exe
4af0951712fb05a686a03e0592880e195ba53e5eb70e224d7ea7b8b76f2a3e86  win-x64/node.lib
6694a097f75781fa0d1ed4dd7b3f03076f15c074c16313fc0bab8dfd16998f7f  win-x64/node_pdb.7z
31f91c9faa70f5adceb1cb8ded0185cfd2a086843a7d98f6628b0f3261b81200  win-x64/node_pdb.zip
25c4ea966d48ef8c8619e6f672eee14dd6cead56896981bc34b7dddb029fa65f  win-x86/node.exe
e1830d28633bfa80180edfffe5f091dc945701ba8cf2b743ca542d34759f505a  win-x86/node.lib
c06375292f3250da493051a5b86d3bf82037e1634bf32b71454fdbf3d21ed3f3  win-x86/node_pdb.7z
cc9c904ee85d912ccd4d89a9d3a5ef0a24c42bdee716cc17ff6e10285d71834b  win-x86/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaIvkawAKCRAgsaOQsWjT
Von3AQDqcqTlqgKBTSaixzZXClUPuynGLQaifLLw71F+UYVgtAEA3qWofHxzS9lj
hBucx3ouhiHQ2b5F89QYgYD9e8vZTg8=
=6jia
-----END PGP SIGNATURE-----
```
