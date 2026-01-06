---
date: '2025-11-11T22:35:48.531Z'
category: release
title: Node.js 24.11.1 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-11-11, Version 24.11.1 'Krypton' (LTS), @aduh95

### Notable Changes

The known issue relating to `Buffer.allocUnsafe` incorrectly zero-filling buffers
has now been addressed and returns uninitialized memory as documented in the
[`Buffer.allocUnsafe`](https://nodejs.org/docs/latest-v24.x/api/buffer.html#static-method-bufferallocunsafesize)
documentation.

### Commits

- \[[`0a15ccf3f4`](https://github.com/nodejs/node/commit/0a15ccf3f4)] - **benchmark**: improve cpu.sh for safety and usability (Nam Yooseong) [#60162](https://github.com/nodejs/node/pull/60162)
- \[[`a1c7d1dac9`](https://github.com/nodejs/node/commit/a1c7d1dac9)] - **benchmark**: add benchmark for leaf source text modules (Joyee Cheung) [#60205](https://github.com/nodejs/node/pull/60205)
- \[[`99e2acf46b`](https://github.com/nodejs/node/commit/99e2acf46b)] - **benchmark**: add vm.SourceTextModule benchmark (Joyee Cheung) [#59396](https://github.com/nodejs/node/pull/59396)
- \[[`c01c72b407`](https://github.com/nodejs/node/commit/c01c72b407)] - **benchmark**: use non-deprecated WriteUtf8V2 method (Michaël Zasso) [#60173](https://github.com/nodejs/node/pull/60173)
- \[[`a42dbd138e`](https://github.com/nodejs/node/commit/a42dbd138e)] - **build**: ibmi follow aix visibility (SRAVANI GUNDEPALLI) [#60360](https://github.com/nodejs/node/pull/60360)
- \[[`5673a54a5d`](https://github.com/nodejs/node/commit/5673a54a5d)] - **build**: use call command when calling python configure (Jacob Nichols) [#60098](https://github.com/nodejs/node/pull/60098)
- \[[`c67cb727cb`](https://github.com/nodejs/node/commit/c67cb727cb)] - **build**: build v8 with -fvisibility=hidden -fvisibility-inlines-hidden (Joyee Cheung) [#56290](https://github.com/nodejs/node/pull/56290)
- \[[`b03f7b93b1`](https://github.com/nodejs/node/commit/b03f7b93b1)] - **build**: remove V8_COMPRESS_POINTERS_IN_ISOLATE_CAGE defs (Joyee Cheung) [#60296](https://github.com/nodejs/node/pull/60296)
- \[[`2505568531`](https://github.com/nodejs/node/commit/2505568531)] - **build, src**: fix include paths for vtune files (Rahul) [#59999](https://github.com/nodejs/node/pull/59999)
- \[[`95330b036f`](https://github.com/nodejs/node/commit/95330b036f)] - **crypto**: update root certificates to NSS 3.116 (Node.js GitHub Bot) [#59956](https://github.com/nodejs/node/pull/59956)
- \[[`c221d892ef`](https://github.com/nodejs/node/commit/c221d892ef)] - **deps**: update corepack to 0.34.2 (Node.js GitHub Bot) [#60550](https://github.com/nodejs/node/pull/60550)
- \[[`bc00aa4c77`](https://github.com/nodejs/node/commit/bc00aa4c77)] - **deps**: update simdjson to 4.0.7 (Node.js GitHub Bot) [#59883](https://github.com/nodejs/node/pull/59883)
- \[[`d03b89ec53`](https://github.com/nodejs/node/commit/d03b89ec53)] - **deps**: update corepack to 0.34.1 (Node.js GitHub Bot) [#60314](https://github.com/nodejs/node/pull/60314)
- \[[`b7882090de`](https://github.com/nodejs/node/commit/b7882090de)] - **deps**: update inspector_protocol to af7f5a8173fdbc29f0835ec94395932e328b (Node.js GitHub Bot) [#60312](https://github.com/nodejs/node/pull/60312)
- \[[`7007f9dd65`](https://github.com/nodejs/node/commit/7007f9dd65)] - **deps**: update googletest to 279f847 (Node.js GitHub Bot) [#60219](https://github.com/nodejs/node/pull/60219)
- \[[`a56aa9ffa8`](https://github.com/nodejs/node/commit/a56aa9ffa8)] - **deps**: upgrade npm to 11.6.2 (npm team) [#60168](https://github.com/nodejs/node/pull/60168)
- \[[`0bf8952721`](https://github.com/nodejs/node/commit/0bf8952721)] - **doc**: mention more codemods in `deprecations.md` (Augustin Mauroy) [#60243](https://github.com/nodejs/node/pull/60243)
- \[[`2473ca77f6`](https://github.com/nodejs/node/commit/2473ca77f6)] - **doc**: add missing CAA type to dns.resolveAny() & dnsPromises.resolveAny() (Jimmy Leung) [#58899](https://github.com/nodejs/node/pull/58899)
- \[[`39ddd8522e`](https://github.com/nodejs/node/commit/39ddd8522e)] - **doc**: use `any` for `worker_threads.Worker` 'error' event argument `err` (Jonas Geiler) [#60300](https://github.com/nodejs/node/pull/60300)
- \[[`eaa825fd97`](https://github.com/nodejs/node/commit/eaa825fd97)] - **doc**: update decorator documentation to reflect actual policy (Muhammad Salman Aziz) [#60288](https://github.com/nodejs/node/pull/60288)
- \[[`a744e42282`](https://github.com/nodejs/node/commit/a744e42282)] - **doc**: document wildcard supported by tools/test.py (Joyee Cheung) [#60265](https://github.com/nodejs/node/pull/60265)
- \[[`ec0d5beb09`](https://github.com/nodejs/node/commit/ec0d5beb09)] - **doc**: add --heap-snapshot-on-oom to useful v8 flag (jakecastelli) [#60260](https://github.com/nodejs/node/pull/60260)
- \[[`13da0df12a`](https://github.com/nodejs/node/commit/13da0df12a)] - **doc**: fix `blob.bytes()` heading level (XTY) [#60252](https://github.com/nodejs/node/pull/60252)
- \[[`8e771632b7`](https://github.com/nodejs/node/commit/8e771632b7)] - **doc**: fix not working code example in vm docs (Artur Gawlik) [#60224](https://github.com/nodejs/node/pull/60224)
- \[[`70c2080bff`](https://github.com/nodejs/node/commit/70c2080bff)] - **doc**: improve code snippet alternative of url.parse() using WHATWG URL (Steven) [#60209](https://github.com/nodejs/node/pull/60209)
- \[[`beadcf176e`](https://github.com/nodejs/node/commit/beadcf176e)] - **doc**: `createSQLTagStore` -> `createTagStore` (Aviv Keller) [#60182](https://github.com/nodejs/node/pull/60182)
- \[[`b0da3b9c6a`](https://github.com/nodejs/node/commit/b0da3b9c6a)] - **doc**: use markdown when branch-diff major release (Rafael Gonzaga) [#60179](https://github.com/nodejs/node/pull/60179)
- \[[`688115aa6b`](https://github.com/nodejs/node/commit/688115aa6b)] - **doc**: update teams in collaborator-guide.md and add links (Bart Louwers) [#60065](https://github.com/nodejs/node/pull/60065)
- \[[`923082a064`](https://github.com/nodejs/node/commit/923082a064)] - **doc**: disambiguate top-level `worker_threads` module exports (René) [#59890](https://github.com/nodejs/node/pull/59890)
- \[[`7be4330870`](https://github.com/nodejs/node/commit/7be4330870)] - **doc**: add known issue to v24.11.0 release notes (Richard Lau) [#60467](https://github.com/nodejs/node/pull/60467)
- \[[`4d8f62aeaf`](https://github.com/nodejs/node/commit/4d8f62aeaf)] - **doc, module**: change async customization hooks to experimental (Gerhard Stöbich) [#60302](https://github.com/nodejs/node/pull/60302)
- \[[`d86a118bbd`](https://github.com/nodejs/node/commit/d86a118bbd)] - **http**: lazy allocate cookies array (Robert Nagy) [#59734](https://github.com/nodejs/node/pull/59734)
- \[[`8c256d4139`](https://github.com/nodejs/node/commit/8c256d4139)] - **http**: fix http client leaky with double response (theanarkh) [#60062](https://github.com/nodejs/node/pull/60062)
- \[[`265e9d59fa`](https://github.com/nodejs/node/commit/265e9d59fa)] - **http2**: rename variable to additionalPseudoHeaders (Tobias Nießen) [#60208](https://github.com/nodejs/node/pull/60208)
- \[[`65bec037e2`](https://github.com/nodejs/node/commit/65bec037e2)] - **http2**: do not crash on mismatched ping buffer length (René) [#60135](https://github.com/nodejs/node/pull/60135)
- \[[`9b83ef53b7`](https://github.com/nodejs/node/commit/9b83ef53b7)] - **inspector**: add network payload buffer size limits (Chengzhong Wu) [#60236](https://github.com/nodejs/node/pull/60236)
- \[[`03ac05c458`](https://github.com/nodejs/node/commit/03ac05c458)] - **inspector**: support handshake response for websocket inspection (Shima Ryuhei) [#60225](https://github.com/nodejs/node/pull/60225)
- \[[`aa04f06190`](https://github.com/nodejs/node/commit/aa04f06190)] - **lib**: fix typo in createBlobReaderStream (SeokHun) [#60132](https://github.com/nodejs/node/pull/60132)
- \[[`5aea1a429e`](https://github.com/nodejs/node/commit/5aea1a429e)] - **lib**: fix constructor in \_errnoException stack tree (SeokHun) [#60156](https://github.com/nodejs/node/pull/60156)
- \[[`4f7745acc7`](https://github.com/nodejs/node/commit/4f7745acc7)] - **lib**: fix typo in QuicSessionStats (SeokHun) [#60155](https://github.com/nodejs/node/pull/60155)
- \[[`f8725861ea`](https://github.com/nodejs/node/commit/f8725861ea)] - **lib**: remove redundant destroyHook checks (Gürgün Dayıoğlu) [#60120](https://github.com/nodejs/node/pull/60120)
- \[[`696c20bf3f`](https://github.com/nodejs/node/commit/696c20bf3f)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#60325](https://github.com/nodejs/node/pull/60325)
- \[[`90434ff99a`](https://github.com/nodejs/node/commit/90434ff99a)] - **meta**: loop userland-migrations in deprecations (Chengzhong Wu) [#60299](https://github.com/nodejs/node/pull/60299)
- \[[`ffbc0ae60a`](https://github.com/nodejs/node/commit/ffbc0ae60a)] - **module**: refactor and clarify async loader hook customizations (Joyee Cheung) [#60278](https://github.com/nodejs/node/pull/60278)
- \[[`6ed6062f7d`](https://github.com/nodejs/node/commit/6ed6062f7d)] - **module**: handle null source from async loader hooks in sync hooks (Joyee Cheung) [#59929](https://github.com/nodejs/node/pull/59929)
- \[[`a2871baed2`](https://github.com/nodejs/node/commit/a2871baed2)] - **msi**: fix WiX warnings (Stefan Stojanovic) [#60251](https://github.com/nodejs/node/pull/60251)
- \[[`6199541d67`](https://github.com/nodejs/node/commit/6199541d67)] - **src**: fix timing of snapshot serialize callback (Joyee Cheung) [#60434](https://github.com/nodejs/node/pull/60434)
- \[[`13b687959a`](https://github.com/nodejs/node/commit/13b687959a)] - **src**: add COUNT_GENERIC_USAGE utility for tests (Joyee Cheung) [#60434](https://github.com/nodejs/node/pull/60434)
- \[[`a587623b4f`](https://github.com/nodejs/node/commit/a587623b4f)] - **src**: conditionally disable source phase imports by default (Shelley Vohr) [#60364](https://github.com/nodejs/node/pull/60364)
- \[[`e483267995`](https://github.com/nodejs/node/commit/e483267995)] - **src**: use cached primordials_string (Sohyeon Kim) [#60255](https://github.com/nodejs/node/pull/60255)
- \[[`4c9a64fbaf`](https://github.com/nodejs/node/commit/4c9a64fbaf)] - **src**: replace Environment::GetCurrent with args.GetIsolate (Sohyeon Kim) [#60256](https://github.com/nodejs/node/pull/60256)
- \[[`eb8a0493d1`](https://github.com/nodejs/node/commit/eb8a0493d1)] - **src**: initial enablement of IsolateGroups (James M Snell) [#60254](https://github.com/nodejs/node/pull/60254)
- \[[`463c6450cf`](https://github.com/nodejs/node/commit/463c6450cf)] - **src**: use `Utf8Value` and `TwoByteValue` instead of V8 helpers (Anna Henningsen) [#60244](https://github.com/nodejs/node/pull/60244)
- \[[`b370e02789`](https://github.com/nodejs/node/commit/b370e02789)] - **src**: add a default branch for module phase (Chengzhong Wu) [#60261](https://github.com/nodejs/node/pull/60261)
- \[[`4e1c5c5601`](https://github.com/nodejs/node/commit/4e1c5c5601)] - **src**: make additional cleanups in node locks impl (James M Snell) [#60061](https://github.com/nodejs/node/pull/60061)
- \[[`f00d4c10fc`](https://github.com/nodejs/node/commit/f00d4c10fc)] - **src**: update locks to use DictionaryTemplate (James M Snell) [#60061](https://github.com/nodejs/node/pull/60061)
- \[[`1c8716e97c`](https://github.com/nodejs/node/commit/1c8716e97c)] - **test**: increase debugger waitFor timeout on macOS (Chengzhong Wu) [#60367](https://github.com/nodejs/node/pull/60367)
- \[[`17b4f38e9c`](https://github.com/nodejs/node/commit/17b4f38e9c)] - **test**: put helper in test-runner-output into common (Joyee Cheung) [#60330](https://github.com/nodejs/node/pull/60330)
- \[[`43b9ea8389`](https://github.com/nodejs/node/commit/43b9ea8389)] - **test**: fix small compile warning in test_network_requests_buffer.cc (xiaocainiao633) [#60281](https://github.com/nodejs/node/pull/60281)
- \[[`38a62980ad`](https://github.com/nodejs/node/commit/38a62980ad)] - **test**: split test-runner-watch-mode-kill-signal (Joyee Cheung) [#60298](https://github.com/nodejs/node/pull/60298)
- \[[`34e4c8c84f`](https://github.com/nodejs/node/commit/34e4c8c84f)] - **test**: fix incorrect calculation in test-perf-hooks.js (Joyee Cheung) [#60271](https://github.com/nodejs/node/pull/60271)
- \[[`4481feb17b`](https://github.com/nodejs/node/commit/4481feb17b)] - **test**: parallelize test-without-async-context-frame correctly (Joyee Cheung) [#60273](https://github.com/nodejs/node/pull/60273)
- \[[`91ea9b06e0`](https://github.com/nodejs/node/commit/91ea9b06e0)] - **test**: skip sea tests on x64 macOS (Joyee Cheung) [#60250](https://github.com/nodejs/node/pull/60250)
- \[[`cedba09e60`](https://github.com/nodejs/node/commit/cedba09e60)] - **test**: move sea tests into test/sea (Joyee Cheung) [#60250](https://github.com/nodejs/node/pull/60250)
- \[[`635af55e12`](https://github.com/nodejs/node/commit/635af55e12)] - _**Revert**_ "**test**: ensure message event fires in worker message port test" (Luigi Pinca) [#60126](https://github.com/nodejs/node/pull/60126)
- \[[`68f678028e`](https://github.com/nodejs/node/commit/68f678028e)] - **test**: skip tests that cause timeouts on IBM i (SRAVANI GUNDEPALLI) [#60148](https://github.com/nodejs/node/pull/60148)
- \[[`cc3a70598c`](https://github.com/nodejs/node/commit/cc3a70598c)] - **test**: deflake test-fs-promises-watch-iterator (Luigi Pinca) [#60060](https://github.com/nodejs/node/pull/60060)
- \[[`3d784dd766`](https://github.com/nodejs/node/commit/3d784dd766)] - **test**: prepare junit file attribute normalization (sangwook) [#59432](https://github.com/nodejs/node/pull/59432)
- \[[`84974d97ad`](https://github.com/nodejs/node/commit/84974d97ad)] - **test**: skip failing test on macOS 15.7+ (Antoine du Hamel) [#60419](https://github.com/nodejs/node/pull/60419)
- \[[`fabf8e4975`](https://github.com/nodejs/node/commit/fabf8e4975)] - **test,crypto**: fix conditional SHA3-\* skip on BoringSSL (Filip Skokan) [#60379](https://github.com/nodejs/node/pull/60379)
- \[[`8faa494bf2`](https://github.com/nodejs/node/commit/8faa494bf2)] - **test,crypto**: sha3 algorithms aren't supported with BoringSSL (Shelley Vohr) [#60374](https://github.com/nodejs/node/pull/60374)
- \[[`538a00c0f6`](https://github.com/nodejs/node/commit/538a00c0f6)] - **test,doc**: skip --max-old-space-size-percentage on 32-bit platforms (Asaf Federman) [#60144](https://github.com/nodejs/node/pull/60144)
- \[[`9ac5dbb694`](https://github.com/nodejs/node/commit/9ac5dbb694)] - **test_runner**: use module.registerHooks in module mocks (Joyee Cheung) [#60326](https://github.com/nodejs/node/pull/60326)
- \[[`f6ff6e7166`](https://github.com/nodejs/node/commit/f6ff6e7166)] - **test_runner**: fix suite timeout (Moshe Atlow) [#59853](https://github.com/nodejs/node/pull/59853)
- \[[`455bfeb52d`](https://github.com/nodejs/node/commit/455bfeb52d)] - **test_runner**: add junit file attribute support (sangwook) [#59432](https://github.com/nodejs/node/pull/59432)
- \[[`223c5e105d`](https://github.com/nodejs/node/commit/223c5e105d)] - **tools**: update gyp-next to 0.20.5 (Node.js GitHub Bot) [#60313](https://github.com/nodejs/node/pull/60313)
- \[[`2949408fc1`](https://github.com/nodejs/node/commit/2949408fc1)] - **tools**: limit inspector protocol PR title length (Chengzhong Wu) [#60324](https://github.com/nodejs/node/pull/60324)
- \[[`b36a898650`](https://github.com/nodejs/node/commit/b36a898650)] - **tools**: fix inspector_protocol updater (Chengzhong Wu) [#60277](https://github.com/nodejs/node/pull/60277)
- \[[`d60f002b62`](https://github.com/nodejs/node/commit/d60f002b62)] - **tools**: optimize wildcard execution in tools/test.py (Joyee Cheung) [#60266](https://github.com/nodejs/node/pull/60266)
- \[[`9d4e422419`](https://github.com/nodejs/node/commit/9d4e422419)] - **tools**: add inspector_protocol updater (Chengzhong Wu) [#60245](https://github.com/nodejs/node/pull/60245)
- \[[`2f93a9894f`](https://github.com/nodejs/node/commit/2f93a9894f)] - **tools**: use cooldown property correctly (Rafael Gonzaga) [#60134](https://github.com/nodejs/node/pull/60134)
- \[[`9468ade95d`](https://github.com/nodejs/node/commit/9468ade95d)] - **typings**: add missing properties and method in Worker (Woohyun Sung) [#60257](https://github.com/nodejs/node/pull/60257)
- \[[`f611ec0a9e`](https://github.com/nodejs/node/commit/f611ec0a9e)] - **typings**: add missing properties in HTTPParser (Woohyun Sung) [#60257](https://github.com/nodejs/node/pull/60257)
- \[[`301c1347a1`](https://github.com/nodejs/node/commit/301c1347a1)] - **typings**: delete undefined property in ConfigBinding (Woohyun Sung) [#60257](https://github.com/nodejs/node/pull/60257)
- \[[`80fdb3d39b`](https://github.com/nodejs/node/commit/80fdb3d39b)] - **typings**: add buffer internalBinding typing (방진혁) [#60163](https://github.com/nodejs/node/pull/60163)
- \[[`8cb3b77039`](https://github.com/nodejs/node/commit/8cb3b77039)] - **util**: use more defensive code when inspecting error objects (Antoine du Hamel) [#60139](https://github.com/nodejs/node/pull/60139)
- \[[`748d4f6430`](https://github.com/nodejs/node/commit/748d4f6430)] - **util**: mark special properties when inspecting them (Ruben Bridgewater) [#60131](https://github.com/nodejs/node/pull/60131)
- \[[`6183a759d7`](https://github.com/nodejs/node/commit/6183a759d7)] - **vm**: make vm.Module.evaluate() conditionally synchronous (Joyee Cheung) [#60205](https://github.com/nodejs/node/pull/60205)
- \[[`4b8506628f`](https://github.com/nodejs/node/commit/4b8506628f)] - **win**: upgrade Visual Studio workload from 2019 to 2022 (Jiawen Geng) [#60318](https://github.com/nodejs/node/pull/60318)

Windows 64-bit Installer: https://nodejs.org/dist/v24.11.1/node-v24.11.1-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.11.1/node-v24.11.1-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.11.1/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.11.1/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.11.1/node-v24.11.1.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.11.1/node-v24.11.1-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.11.1/node-v24.11.1-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.11.1/node-v24.11.1-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.11.1/node-v24.11.1-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.11.1/node-v24.11.1-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.11.1/node-v24.11.1-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.11.1/node-v24.11.1-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.11.1/node-v24.11.1.tar.gz \
Other release files: https://nodejs.org/dist/v24.11.1/ \
Documentation: https://nodejs.org/docs/v24.11.1/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

98ba919a0390d8c422d4bb3105ec5b77723cf54143b4c1e4b9d77690fa075206  node-v24.11.1-aix-ppc64.tar.gz
09f611f63ef40b9955c42ddcc8f32cc1f6e558ac136f7ca67f481bf669bd8bfe  node-v24.11.1-arm64.msi
b05aa3a66efe680023f930bd5af3fdbbd542794da5644ca2ad711d68cbd4dc35  node-v24.11.1-darwin-arm64.tar.gz
064b017da9efd6b5d2bd0fadd56d3b8a50fcb369af3ccf91102c7a07a6cf4deb  node-v24.11.1-darwin-arm64.tar.xz
096081b6d6fcdd3f5ba0f5f1d44a47e83037ad2e78eada26671c252fe64dd111  node-v24.11.1-darwin-x64.tar.gz
3793aa4aa52eb1f464d7848cd4e254880d9abca989c7cdc79a32c51bfeec1806  node-v24.11.1-darwin-x64.tar.xz
865b1da01e764066d207f5a14b41e2593e03fd43fcce60a5ac0a9a6d2822fedb  node-v24.11.1-headers.tar.gz
049ec2d18d3339612663262dcd4de69d46c9212fd5a74669e516cd7f3cc90129  node-v24.11.1-headers.tar.xz
0dc93ec5c798b0d347f068db6d205d03dea9a71765e6a53922b682b91265d71f  node-v24.11.1-linux-arm64.tar.gz
6b0863fb9f627bf4a6c5948dce1de4398174a2e05dbe717503d828e211ca01f0  node-v24.11.1-linux-arm64.tar.xz
cd41407f3352de2f066ea26c5c5d0ea9b6362374d6b618385a9f2e9dad220616  node-v24.11.1-linux-ppc64le.tar.gz
57c146a5d2386f0964b0e9af11bc0fcfb346d0430693b053461df9597d9ed201  node-v24.11.1-linux-ppc64le.tar.xz
5d4c8bca5f8f2593f9081dee39834760e85a16fa61c950f3e86ec85996f00550  node-v24.11.1-linux-s390x.tar.gz
f4398a2b883b30a8763e5e5e1c2b689b9ed024dbaa61f90679f46def78555b37  node-v24.11.1-linux-s390x.tar.xz
58a5ff5cc8f2200e458bea22e329d5c1994aa1b111d499ca46ec2411d58239ca  node-v24.11.1-linux-x64.tar.gz
60e3b0a8500819514aca603487c254298cd776de0698d3cd08f11dba5b8289a8  node-v24.11.1-linux-x64.tar.xz
61c5d34739c782cbd912a21cfa8072d860884e674ab3c4dea551830b7866a06e  node-v24.11.1-win-arm64.7z
ce9ee4e547ebdff355beb48e309b166c24df6be0291c9eaf103ce15f3de9e5b4  node-v24.11.1-win-arm64.zip
4ff32b2db66fa95ca2c6b620c3d13d950bdae39a23cf872fcf2c4d3d47241e91  node-v24.11.1-win-x64.7z
5355ae6d7c49eddcfde7d34ac3486820600a831bf81dc3bdca5c8db6a9bb0e76  node-v24.11.1-win-x64.zip
208ba5ca1dab0b330f457909e0797de340c40b34ddf2edf40d26f382f733297e  node-v24.11.1-x64.msi
c9f53f7386d9ff7e6d81a19b0005a40b209d620d6e68f916093846b3a8fcad9a  node-v24.11.1.pkg
57b93529b97fabc643e34ce1d16883c1926cef17ce270a01248b82216e59ea61  node-v24.11.1.tar.gz
ea4da35f1c9ca376ec6837e1e30cee30d491847fe152a3f0378dc1156d954bbd  node-v24.11.1.tar.xz
8f3e33fa1f67843a320d2200ed1a5d40cc59766715a7a02728b8213c2167a084  win-arm64/node.exe
b51814dc7a36a1e2a0ef0c0a0a63515bf9be8c55a16d4b2d4dc5558921c4a26b  win-arm64/node.lib
1cc2c5d0eda23a3d1150515c43b00b0c2b4f6ee7614e12295a00a6f52a967fac  win-arm64/node_pdb.7z
12e0a2228f7715b8dcebc6c260b2407ab62e98482656dbde0f6d163672662cd0  win-arm64/node_pdb.zip
f13ac3ca23248dc389507e8fe38c34489ab7edb3e6d6700eb6da6a0b7e128eaf  win-x64/node.exe
51dd3a17e843d5b9434a651888927067e6a5f4ae9ade5f57d8394fb0a33cc80a  win-x64/node.lib
eff60fc3fabec61e38e4f26ee02a60ff6cdb86d3ee8e4342e2f8c2cf79b0307a  win-x64/node_pdb.7z
d486c9959bd5d054110366b278faee1eede911b8e18216ba024774c40c31c808  win-x64/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaRO41wAKCRAgsaOQsWjT
VpyHAP0fBH7/ckaphdy1g2GYwMugVrOqNEF3qEtbQZdHwAyyJAD/eH6QM6dP8zYs
v3H11W7yGL6svP2zCguynqNd45uDqQ4=
=m3wD
-----END PGP SIGNATURE-----
```
