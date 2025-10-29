---
date: '2025-10-28T19:21:59.508Z'
category: release
title: Node.js v25.1.0 (Current)
layout: blog-post
author: Antoine du Hamel
---

## 2025-10-28, Version 25.1.0 (Current), @aduh95

### Notable Changes

- \[[`4395fe14b9`](https://github.com/nodejs/node/commit/4395fe14b9)] - **(SEMVER-MINOR)** **http**: add optimizeEmptyRequests server option (Rafael Gonzaga) [#59778](https://github.com/nodejs/node/pull/59778)
- \[[`2e55c6ad04`](https://github.com/nodejs/node/commit/2e55c6ad04)] - **(SEMVER-MINOR)** **sqlite**: allow setting defensive flag (Bart Louwers) [#60217](https://github.com/nodejs/node/pull/60217)
- \[[`f437204491`](https://github.com/nodejs/node/commit/f437204491)] - **(SEMVER-MINOR)** **src**: add watch config namespace (Marco Ippolito) [#60178](https://github.com/nodejs/node/pull/60178)

### Commits

- \[[`bb27766bd5`](https://github.com/nodejs/node/commit/bb27766bd5)] - **benchmark**: improve cpu.sh for safety and usability (Nam Yooseong) [#60162](https://github.com/nodejs/node/pull/60162)
- \[[`e600711c20`](https://github.com/nodejs/node/commit/e600711c20)] - **benchmark**: add benchmark for leaf source text modules (Joyee Cheung) [#60205](https://github.com/nodejs/node/pull/60205)
- \[[`1bbcdf9039`](https://github.com/nodejs/node/commit/1bbcdf9039)] - **benchmark**: add vm.SourceTextModule benchmark (Joyee Cheung) [#59396](https://github.com/nodejs/node/pull/59396)
- \[[`22fa6bd28b`](https://github.com/nodejs/node/commit/22fa6bd28b)] - **build**: ibmi follow aix visibility (SRAVANI GUNDEPALLI) [#60360](https://github.com/nodejs/node/pull/60360)
- \[[`931028400e`](https://github.com/nodejs/node/commit/931028400e)] - **build**: use call command when calling python configure (Jacob Nichols) [#60098](https://github.com/nodejs/node/pull/60098)
- \[[`17fde3f3d1`](https://github.com/nodejs/node/commit/17fde3f3d1)] - **build**: build v8 with -fvisibility=hidden -fvisibility-inlines-hidden (Joyee Cheung) [#56290](https://github.com/nodejs/node/pull/56290)
- \[[`04cc7aae5e`](https://github.com/nodejs/node/commit/04cc7aae5e)] - **build**: remove V8_COMPRESS_POINTERS_IN_ISOLATE_CAGE defs (Joyee Cheung) [#60296](https://github.com/nodejs/node/pull/60296)
- \[[`8a2053060d`](https://github.com/nodejs/node/commit/8a2053060d)] - **crypto**: update root certificates to NSS 3.116 (Node.js GitHub Bot) [#59956](https://github.com/nodejs/node/pull/59956)
- \[[`fe91c0f755`](https://github.com/nodejs/node/commit/fe91c0f755)] - **deps**: update simdjson to 4.0.7 (Node.js GitHub Bot) [#59883](https://github.com/nodejs/node/pull/59883)
- \[[`aacfc0d212`](https://github.com/nodejs/node/commit/aacfc0d212)] - **deps**: update corepack to 0.34.1 (Node.js GitHub Bot) [#60314](https://github.com/nodejs/node/pull/60314)
- \[[`8596891a71`](https://github.com/nodejs/node/commit/8596891a71)] - **deps**: update inspector_protocol to af7f5a8173fdbc29f0835ec94395932e328b (Node.js GitHub Bot) [#60312](https://github.com/nodejs/node/pull/60312)
- \[[`21bcd0eb2f`](https://github.com/nodejs/node/commit/21bcd0eb2f)] - **deps**: V8: cherry-pick 3d0f462a17ff (Joyee Cheung) [#59396](https://github.com/nodejs/node/pull/59396)
- \[[`673558501c`](https://github.com/nodejs/node/commit/673558501c)] - **deps**: update googletest to 279f847 (Node.js GitHub Bot) [#60219](https://github.com/nodejs/node/pull/60219)
- \[[`425a1879b1`](https://github.com/nodejs/node/commit/425a1879b1)] - **doc**: mention more codemods in `deprecations.md` (Augustin Mauroy) [#60243](https://github.com/nodejs/node/pull/60243)
- \[[`563e1317f3`](https://github.com/nodejs/node/commit/563e1317f3)] - **doc**: remove unnecessary statement of web storage (Deokjin Kim) [#60363](https://github.com/nodejs/node/pull/60363)
- \[[`064c8c5cfd`](https://github.com/nodejs/node/commit/064c8c5cfd)] - **doc**: add missing CAA type to dns.resolveAny() & dnsPromises.resolveAny() (Jimmy Leung) [#58899](https://github.com/nodejs/node/pull/58899)
- \[[`99e357af35`](https://github.com/nodejs/node/commit/99e357af35)] - **doc**: use `any` for `worker_threads.Worker` 'error' event argument `err` (Jonas Geiler) [#60300](https://github.com/nodejs/node/pull/60300)
- \[[`8ccff0d934`](https://github.com/nodejs/node/commit/8ccff0d934)] - **doc**: update decorator documentation to reflect actual policy (Muhammad Salman Aziz) [#60288](https://github.com/nodejs/node/pull/60288)
- \[[`bac70c6ef3`](https://github.com/nodejs/node/commit/bac70c6ef3)] - **doc**: document wildcard supported by tools/test.py (Joyee Cheung) [#60265](https://github.com/nodejs/node/pull/60265)
- \[[`8492bc6a88`](https://github.com/nodejs/node/commit/8492bc6a88)] - **doc**: add --heap-snapshot-on-oom to useful v8 flag (jakecastelli) [#60260](https://github.com/nodejs/node/pull/60260)
- \[[`0f0d3c0e47`](https://github.com/nodejs/node/commit/0f0d3c0e47)] - **doc**: fix `blob.bytes()` heading level (XTY) [#60252](https://github.com/nodejs/node/pull/60252)
- \[[`8c8525cf93`](https://github.com/nodejs/node/commit/8c8525cf93)] - **doc**: fix not working code example in vm docs (Artur Gawlik) [#60224](https://github.com/nodejs/node/pull/60224)
- \[[`8a6de3866c`](https://github.com/nodejs/node/commit/8a6de3866c)] - **doc, assert**: correct order of changes entries (Gerhard Stöbich) [#60304](https://github.com/nodejs/node/pull/60304)
- \[[`6bacb6555a`](https://github.com/nodejs/node/commit/6bacb6555a)] - **doc, module**: change async customization hooks to experimental (Gerhard Stöbich) [#60302](https://github.com/nodejs/node/pull/60302)
- \[[`6f3b16df16`](https://github.com/nodejs/node/commit/6f3b16df16)] - **esm**: use index-based resolution callbacks (Joyee Cheung) [#59396](https://github.com/nodejs/node/pull/59396)
- \[[`95644a432c`](https://github.com/nodejs/node/commit/95644a432c)] - **http**: lazy allocate cookies array (Robert Nagy) [#59734](https://github.com/nodejs/node/pull/59734)
- \[[`4395fe14b9`](https://github.com/nodejs/node/commit/4395fe14b9)] - **(SEMVER-MINOR)** **http**: add optimizeEmptyRequests server option (Rafael Gonzaga) [#59778](https://github.com/nodejs/node/pull/59778)
- \[[`f1aa1eaaf5`](https://github.com/nodejs/node/commit/f1aa1eaaf5)] - **inspector**: add network payload buffer size limits (Chengzhong Wu) [#60236](https://github.com/nodejs/node/pull/60236)
- \[[`64fc625bf9`](https://github.com/nodejs/node/commit/64fc625bf9)] - **inspector**: support handshake response for websocket inspection (Shima Ryuhei) [#60225](https://github.com/nodejs/node/pull/60225)
- \[[`0ecbb806a8`](https://github.com/nodejs/node/commit/0ecbb806a8)] - **lib**: fix typo in createBlobReaderStream (SeokHun) [#60132](https://github.com/nodejs/node/pull/60132)
- \[[`ffec5927fd`](https://github.com/nodejs/node/commit/ffec5927fd)] - **meta**: fix typo in test-shared workflow name (Ronit Sabhaya) [#60321](https://github.com/nodejs/node/pull/60321)
- \[[`a02897e157`](https://github.com/nodejs/node/commit/a02897e157)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#60325](https://github.com/nodejs/node/pull/60325)
- \[[`59223a7831`](https://github.com/nodejs/node/commit/59223a7831)] - **meta**: loop userland-migrations in deprecations (Chengzhong Wu) [#60299](https://github.com/nodejs/node/pull/60299)
- \[[`2d48d17696`](https://github.com/nodejs/node/commit/2d48d17696)] - **module**: refactor and clarify async loader hook customizations (Joyee Cheung) [#60278](https://github.com/nodejs/node/pull/60278)
- \[[`be1b84fd93`](https://github.com/nodejs/node/commit/be1b84fd93)] - **module**: handle null source from async loader hooks in sync hooks (Joyee Cheung) [#59929](https://github.com/nodejs/node/pull/59929)
- \[[`063fbd87d3`](https://github.com/nodejs/node/commit/063fbd87d3)] - **msi**: fix WiX warnings (Stefan Stojanovic) [#60251](https://github.com/nodejs/node/pull/60251)
- \[[`2e55c6ad04`](https://github.com/nodejs/node/commit/2e55c6ad04)] - **(SEMVER-MINOR)** **sqlite**: allow setting defensive flag (Bart Louwers) [#60217](https://github.com/nodejs/node/pull/60217)
- \[[`dc93d6988a`](https://github.com/nodejs/node/commit/dc93d6988a)] - **src**: fix timing of snapshot serialize callback (Joyee Cheung) [#60434](https://github.com/nodejs/node/pull/60434)
- \[[`267e1b3817`](https://github.com/nodejs/node/commit/267e1b3817)] - **src**: add COUNT_GENERIC_USAGE utility for tests (Joyee Cheung) [#60434](https://github.com/nodejs/node/pull/60434)
- \[[`4a5d7a4c2a`](https://github.com/nodejs/node/commit/4a5d7a4c2a)] - **src**: conditionally disable source phase imports by default (Shelley Vohr) [#60364](https://github.com/nodejs/node/pull/60364)
- \[[`f437204491`](https://github.com/nodejs/node/commit/f437204491)] - **(SEMVER-MINOR)** **src**: add watch config namespace (Marco Ippolito) [#60178](https://github.com/nodejs/node/pull/60178)
- \[[`36837fa0f9`](https://github.com/nodejs/node/commit/36837fa0f9)] - **src**: use cached primordials_string (Sohyeon Kim) [#60255](https://github.com/nodejs/node/pull/60255)
- \[[`df8396ad37`](https://github.com/nodejs/node/commit/df8396ad37)] - **src**: replace Environment::GetCurrent with args.GetIsolate (Sohyeon Kim) [#60256](https://github.com/nodejs/node/pull/60256)
- \[[`5dd670b2b9`](https://github.com/nodejs/node/commit/5dd670b2b9)] - **src**: initial enablement of IsolateGroups (James M Snell) [#60254](https://github.com/nodejs/node/pull/60254)
- \[[`afdb362933`](https://github.com/nodejs/node/commit/afdb362933)] - **src**: use `Utf8Value` and `TwoByteValue` instead of V8 helpers (Anna Henningsen) [#60244](https://github.com/nodejs/node/pull/60244)
- \[[`a40e533e72`](https://github.com/nodejs/node/commit/a40e533e72)] - **src**: add a default branch for module phase (Chengzhong Wu) [#60261](https://github.com/nodejs/node/pull/60261)
- \[[`42729f07ee`](https://github.com/nodejs/node/commit/42729f07ee)] - **src**: stop using deprecated v8::Context::GetIsolate (Michaël Zasso) [#60223](https://github.com/nodejs/node/pull/60223)
- \[[`7a6542c205`](https://github.com/nodejs/node/commit/7a6542c205)] - **test**: skip failing test on macOS 15.7+ (Antoine du Hamel) [#60419](https://github.com/nodejs/node/pull/60419)
- \[[`29a5855a4f`](https://github.com/nodejs/node/commit/29a5855a4f)] - **test**: ensure assertions are reachable in `test/addons` (Antoine du Hamel) [#60142](https://github.com/nodejs/node/pull/60142)
- \[[`12773d19c4`](https://github.com/nodejs/node/commit/12773d19c4)] - **test**: increase debugger waitFor timeout on macOS (Chengzhong Wu) [#60367](https://github.com/nodejs/node/pull/60367)
- \[[`0b38de3e9e`](https://github.com/nodejs/node/commit/0b38de3e9e)] - **test**: put helper in test-runner-output into common (Joyee Cheung) [#60330](https://github.com/nodejs/node/pull/60330)
- \[[`6de2407c44`](https://github.com/nodejs/node/commit/6de2407c44)] - **test**: fix small compile warning in test_network_requests_buffer.cc (xiaocainiao633) [#60281](https://github.com/nodejs/node/pull/60281)
- \[[`4b23ac8613`](https://github.com/nodejs/node/commit/4b23ac8613)] - **test**: fix status when compiled without inspector (Antoine du Hamel) [#60289](https://github.com/nodejs/node/pull/60289)
- \[[`a07f32e326`](https://github.com/nodejs/node/commit/a07f32e326)] - **test**: split test-runner-watch-mode-kill-signal (Joyee Cheung) [#60298](https://github.com/nodejs/node/pull/60298)
- \[[`30451d32d7`](https://github.com/nodejs/node/commit/30451d32d7)] - **test**: fix incorrect calculation in test-perf-hooks.js (Joyee Cheung) [#60271](https://github.com/nodejs/node/pull/60271)
- \[[`e3c3b48f1c`](https://github.com/nodejs/node/commit/e3c3b48f1c)] - **test**: ignore EPIPE errors in https proxy invalid URL test (Joyee Cheung) [#60269](https://github.com/nodejs/node/pull/60269)
- \[[`405a9c4c5f`](https://github.com/nodejs/node/commit/405a9c4c5f)] - **test**: parallelize test-without-async-context-frame correctly (Joyee Cheung) [#60273](https://github.com/nodejs/node/pull/60273)
- \[[`ffeebebc71`](https://github.com/nodejs/node/commit/ffeebebc71)] - **test**: make test-worker-prof more tolerant (Joyee Cheung) [#60272](https://github.com/nodejs/node/pull/60272)
- \[[`26b01bf170`](https://github.com/nodejs/node/commit/26b01bf170)] - **test**: skip sea tests on x64 macOS (Joyee Cheung) [#60250](https://github.com/nodejs/node/pull/60250)
- \[[`8caae1a05b`](https://github.com/nodejs/node/commit/8caae1a05b)] - **test**: move sea tests into test/sea (Joyee Cheung) [#60250](https://github.com/nodejs/node/pull/60250)
- \[[`3d183e3e9f`](https://github.com/nodejs/node/commit/3d183e3e9f)] - **test,crypto**: fix conditional SHA3-\* skip on BoringSSL (Filip Skokan) [#60379](https://github.com/nodejs/node/pull/60379)
- \[[`e83dbcba94`](https://github.com/nodejs/node/commit/e83dbcba94)] - **test,crypto**: sha3 algorithms aren't supported with BoringSSL (Shelley Vohr) [#60374](https://github.com/nodejs/node/pull/60374)
- \[[`3d89331496`](https://github.com/nodejs/node/commit/3d89331496)] - **test_runner**: use module.registerHooks in module mocks (Joyee Cheung) [#60326](https://github.com/nodejs/node/pull/60326)
- \[[`377e8ce85a`](https://github.com/nodejs/node/commit/377e8ce85a)] - **tls**: avoid external memory leak on invalid protocol versions (Shelley Vohr) [#60390](https://github.com/nodejs/node/pull/60390)
- \[[`ae4858c1f6`](https://github.com/nodejs/node/commit/ae4858c1f6)] - **tools**: add an option to generate lighter archives (Antoine du Hamel) [#60294](https://github.com/nodejs/node/pull/60294)
- \[[`cb615b1a2e`](https://github.com/nodejs/node/commit/cb615b1a2e)] - **tools**: skip test-shared workflow for draft PRs (Michaël Zasso) [#60365](https://github.com/nodejs/node/pull/60365)
- \[[`03b034731e`](https://github.com/nodejs/node/commit/03b034731e)] - **tools**: disable inspector on macOS-shared to reduce flakiness (Antoine du Hamel) [#60320](https://github.com/nodejs/node/pull/60320)
- \[[`f402b4e1d1`](https://github.com/nodejs/node/commit/f402b4e1d1)] - **tools**: show diff alongside the error in Nix linter (Antoine du Hamel) [#60301](https://github.com/nodejs/node/pull/60301)
- \[[`5d5c8483fb`](https://github.com/nodejs/node/commit/5d5c8483fb)] - **tools**: run CI with shared libs on GHA (Antoine du Hamel) [#60121](https://github.com/nodejs/node/pull/60121)
- \[[`e8fdd8d2e8`](https://github.com/nodejs/node/commit/e8fdd8d2e8)] - **tools**: update gyp-next to 0.20.5 (Node.js GitHub Bot) [#60313](https://github.com/nodejs/node/pull/60313)
- \[[`6e8b029a21`](https://github.com/nodejs/node/commit/6e8b029a21)] - **tools**: limit inspector protocol PR title length (Chengzhong Wu) [#60324](https://github.com/nodejs/node/pull/60324)
- \[[`a5073086c6`](https://github.com/nodejs/node/commit/a5073086c6)] - **tools**: fix inspector_protocol updater (Chengzhong Wu) [#60277](https://github.com/nodejs/node/pull/60277)
- \[[`47fa765bff`](https://github.com/nodejs/node/commit/47fa765bff)] - **tools**: optimize wildcard execution in tools/test.py (Joyee Cheung) [#60266](https://github.com/nodejs/node/pull/60266)
- \[[`11ebb0447d`](https://github.com/nodejs/node/commit/11ebb0447d)] - **tools**: add C++ lint rule to avoid using `String::Utf8Value` (Anna Henningsen) [#60244](https://github.com/nodejs/node/pull/60244)
- \[[`14f3189670`](https://github.com/nodejs/node/commit/14f3189670)] - **tools**: add inspector_protocol updater (Chengzhong Wu) [#60245](https://github.com/nodejs/node/pull/60245)
- \[[`ef4c596fc6`](https://github.com/nodejs/node/commit/ef4c596fc6)] - **typings**: add missing properties and method in Worker (Woohyun Sung) [#60257](https://github.com/nodejs/node/pull/60257)
- \[[`09ae6fc065`](https://github.com/nodejs/node/commit/09ae6fc065)] - **typings**: add missing properties in HTTPParser (Woohyun Sung) [#60257](https://github.com/nodejs/node/pull/60257)
- \[[`9ecaf41f8e`](https://github.com/nodejs/node/commit/9ecaf41f8e)] - **typings**: delete undefined property in ConfigBinding (Woohyun Sung) [#60257](https://github.com/nodejs/node/pull/60257)
- \[[`4a86016e86`](https://github.com/nodejs/node/commit/4a86016e86)] - **util**: use more defensive code when inspecting error objects (Antoine du Hamel) [#60139](https://github.com/nodejs/node/pull/60139)
- \[[`9e6d6cec59`](https://github.com/nodejs/node/commit/9e6d6cec59)] - **util**: mark special properties when inspecting them (Ruben Bridgewater) [#60131](https://github.com/nodejs/node/pull/60131)
- \[[`79b2387fd9`](https://github.com/nodejs/node/commit/79b2387fd9)] - **vm**: make vm.Module.evaluate() conditionally synchronous (Joyee Cheung) [#60205](https://github.com/nodejs/node/pull/60205)
- \[[`e5559f3be3`](https://github.com/nodejs/node/commit/e5559f3be3)] - **win**: upgrade Visual Studio workload from 2019 to 2022 (Jiawen Geng) [#60318](https://github.com/nodejs/node/pull/60318)

Windows 64-bit Installer: https://nodejs.org/dist/v25.1.0/node-v25.1.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v25.1.0/node-v25.1.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v25.1.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v25.1.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v25.1.0/node-v25.1.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v25.1.0/node-v25.1.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v25.1.0/node-v25.1.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v25.1.0/node-v25.1.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v25.1.0/node-v25.1.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v25.1.0/node-v25.1.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v25.1.0/node-v25.1.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v25.1.0/node-v25.1.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v25.1.0/node-v25.1.0.tar.gz \
Other release files: https://nodejs.org/dist/v25.1.0/ \
Documentation: https://nodejs.org/docs/v25.1.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

bfe22e0c6a65cdd082a696b92675ceaae660306c1ef4a9b42e69e8191211a320  node-v25.1.0-aix-ppc64.tar.gz
eea216a6c436017fcdb1cf4a4ee553370a51dcf2432b5c028394ea5af648ff10  node-v25.1.0-arm64.msi
811dcf54580d9eef0abfed9f65457545d2aac8e24853b6e638194fcba0257168  node-v25.1.0-darwin-arm64.tar.gz
f7fc6aae11d635291ca95740045d31ee08f368f44c6acb610f9e78e6643a7714  node-v25.1.0-darwin-arm64.tar.xz
5c2d45214e70327e683df301eeb11d8fc9265ab22ad41ff6335e4a7befc07169  node-v25.1.0-darwin-x64.tar.gz
c42047bf46f80ac977142785a3d13f7b42b892963752901acbf7eed1b3d85496  node-v25.1.0-darwin-x64.tar.xz
bf51816ca0626adeaec09706ad75985634f00f96273dd3ed281ba60617c9d466  node-v25.1.0-headers.tar.gz
9c90bada269f438981ac9d053f62d195dcd606de3266d68852813fb7dc2a7971  node-v25.1.0-headers.tar.xz
9cc83fc5dfdc36692aabec37ab1c6d070d11c44f02764b5e50777491552e8449  node-v25.1.0-linux-arm64.tar.gz
ebc9b74799ddba9e9923227da655ad28a36a22180c0a8f1bee5d4f4bf71a8d42  node-v25.1.0-linux-arm64.tar.xz
ad4be9941d15cfc3fd6cb0b20269b68f8f12ec3bcbd68bdaa4751ba96a236a5c  node-v25.1.0-linux-ppc64le.tar.gz
b9fa290ff7899ea2e17d285572ab9dbd6363efea807ea6bb0f78686aafef29bb  node-v25.1.0-linux-ppc64le.tar.xz
bdd93b9ce06a6e6bcdc0af9d838b9861cbcb4271481f5c5bd4e965601bc5b155  node-v25.1.0-linux-s390x.tar.gz
58eb6fd47e799d6d068aaf51e290f2504b86b6cbc5475e562d7ecc5fe7c1fcee  node-v25.1.0-linux-s390x.tar.xz
0b8de924cd43546a2098c091b73002442cd61340622b2c1489df408755de21fc  node-v25.1.0-linux-x64.tar.gz
dbfed2a1ec191af657f727c9bdc87e88ec9b10fd1a095ed68996090648b0a03f  node-v25.1.0-linux-x64.tar.xz
6c4d7d10c7344c6c85890d0057e9d0215d3fd967aae7f80db4d45248db158e76  node-v25.1.0-win-arm64.7z
8063f6caa9f865cd1ddc30b7bccb6ddb457b7cac0d61e30e74ff85b97b32673b  node-v25.1.0-win-arm64.zip
714ba455c0d4a6b6956151ab56ef5fd1730baa6e0835f024d86767ef8b386aee  node-v25.1.0-win-x64.7z
abab8d2fff33dad361e51b51dfadd1f8aaef8677f88d21e3cccaf7b6e6f46339  node-v25.1.0-win-x64.zip
0ad87501ebc32c6b904ca493394d647ebd8d41e9e9dc451281c5bac8464d6f26  node-v25.1.0-x64.msi
c0574acf6808be1287c02e3eb81acae72135650cbf7c7086306cfc0959b55652  node-v25.1.0.pkg
3c7bc7bc3a7197f5342a6fb464af87263ff5bc0492ee4055663f2607840a7c5c  node-v25.1.0.tar.gz
ee7741190e47402dfc621547ac23d3f58e6463a86878dc1879fb9e8de1ce3226  node-v25.1.0.tar.xz
8ef93a74938bfa4b817b575c52941b9c32786f7002307ad496386f6189613a3b  win-arm64/node.exe
840728a0e19f725d31aa9294e1f6fb9d377937d91186bbbbcb4634f8a9077d6e  win-arm64/node.lib
4a20ea531a4b108df910f5232d23557f841cb2d09b18e150a24134556768dd8a  win-arm64/node_pdb.7z
3dbe585a0108fd914f4980abd938a000defaf149f1bbc16e701eb53f814d6bbf  win-arm64/node_pdb.zip
653d4166b48bcde5c1646b24d0b5bae3594a6c48896aa85f1a8934fce60b063b  win-x64/node.exe
b4d2bd30f4fb5a26853bb443dced92e0480857cc4e77130933391390293e9b82  win-x64/node.lib
e505cbab1677aff8798bab242e2dbf618543d10b5f903bf62527f13fdd49d330  win-x64/node_pdb.7z
6e5b022a1e6ad72afa3411af8d1c460e87fe107d6a648612c2035d7ae70b582e  win-x64/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaQEUzgAKCRAgsaOQsWjT
VgNOAP0VKJFgqjFZwfC3VAPX5R0aAah1ded8gTq+zS4REQzl7gD7B8bbKLxwaBuS
Fp2HA4/0+XlLfpLSCPG3xBYueAk/rQg=
=toUT
-----END PGP SIGNATURE-----
```
