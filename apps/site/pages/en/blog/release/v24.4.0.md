---
date: '2025-07-09T12:37:36.534Z'
category: release
title: Node.js v24.4.0 (Current)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-07-09, Version 24.4.0 (Current), @RafaelGSS

### Notable Changes

- \[[`22b60e8a57`](https://github.com/nodejs/node/commit/22b60e8a57)] - **(SEMVER-MINOR)** **crypto**: support outputLength option in crypto.hash for XOF functions (Aditi) [#58121](https://github.com/nodejs/node/pull/58121)
- \[[`80dec9849d`](https://github.com/nodejs/node/commit/80dec9849d)] - **(SEMVER-MINOR)** **doc**: add all watch-mode related flags to node.1 (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)
- \[[`87f4d078b3`](https://github.com/nodejs/node/commit/87f4d078b3)] - **(SEMVER-MINOR)** **fs**: add disposable mkdtempSync (Kevin Gibbons) [#58516](https://github.com/nodejs/node/pull/58516)
- \[[`9623c50b53`](https://github.com/nodejs/node/commit/9623c50b53)] - **(SEMVER-MINOR)** **permission**: propagate permission model flags on spawn (Rafael Gonzaga) [#58853](https://github.com/nodejs/node/pull/58853)
- \[[`797ec4da04`](https://github.com/nodejs/node/commit/797ec4da04)] - **(SEMVER-MINOR)** **sqlite**: add support for readBigInts option in db connection level (Miguel Marcondes Filho) [#58697](https://github.com/nodejs/node/pull/58697)
- \[[`ed966a0215`](https://github.com/nodejs/node/commit/ed966a0215)] - **(SEMVER-MINOR)** **src,permission**: add support to permission.has(addon) (Rafael Gonzaga) [#58951](https://github.com/nodejs/node/pull/58951)
- \[[`fe17f5d285`](https://github.com/nodejs/node/commit/fe17f5d285)] - **(SEMVER-MINOR)** **watch**: add `--watch-kill-signal` flag (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)

### Commits

- \[[`a118bfc536`](https://github.com/nodejs/node/commit/a118bfc536)] - **assert**: remove dead code (Yoshiya Hinosawa) [#58760](https://github.com/nodejs/node/pull/58760)
- \[[`31252b9af1`](https://github.com/nodejs/node/commit/31252b9af1)] - **benchmark**: add source map and source map cache (Miguel Marcondes Filho) [#58125](https://github.com/nodejs/node/pull/58125)
- \[[`4170359bcd`](https://github.com/nodejs/node/commit/4170359bcd)] - **bootstrap**: initialize http proxy after user module loader setup (Joyee Cheung) [#58938](https://github.com/nodejs/node/pull/58938)
- \[[`c76585d10e`](https://github.com/nodejs/node/commit/c76585d10e)] - **build**: disable v8_enable_pointer_compression_shared_cage on non-64bit (Shelley Vohr) [#58867](https://github.com/nodejs/node/pull/58867)
- \[[`049c838609`](https://github.com/nodejs/node/commit/049c838609)] - **build**: option to use custom inspector_protocol path (Shelley Vohr) [#58839](https://github.com/nodejs/node/pull/58839)
- \[[`22b60e8a57`](https://github.com/nodejs/node/commit/22b60e8a57)] - **(SEMVER-MINOR)** **crypto**: support outputLength option in crypto.hash for XOF functions (Aditi) [#58121](https://github.com/nodejs/node/pull/58121)
- \[[`77712ae2a1`](https://github.com/nodejs/node/commit/77712ae2a1)] - **crypto**: fix SHAKE128/256 breaking change introduced with OpenSSL 3.4 (Filip Skokan) [#58942](https://github.com/nodejs/node/pull/58942)
- \[[`93e1a33b81`](https://github.com/nodejs/node/commit/93e1a33b81)] - **crypto**: fix inclusion of OPENSSL_IS_BORINGSSL define (Shelley Vohr) [#58845](https://github.com/nodejs/node/pull/58845)
- \[[`573171deb0`](https://github.com/nodejs/node/commit/573171deb0)] - **deps**: V8: cherry-pick 0ce2edb7adfd (Levi Zim) [#58773](https://github.com/nodejs/node/pull/58773)
- \[[`bf66291382`](https://github.com/nodejs/node/commit/bf66291382)] - **deps**: V8: cherry-pick 1d7159580156 (Michaël Zasso) [#58749](https://github.com/nodejs/node/pull/58749)
- \[[`f735b8b8d0`](https://github.com/nodejs/node/commit/f735b8b8d0)] - **deps**: update sqlite to 3.50.2 (Node.js GitHub Bot) [#58882](https://github.com/nodejs/node/pull/58882)
- \[[`8e9622e494`](https://github.com/nodejs/node/commit/8e9622e494)] - **deps**: update undici to 7.11.0 (Node.js GitHub Bot) [#58859](https://github.com/nodejs/node/pull/58859)
- \[[`8741da81c7`](https://github.com/nodejs/node/commit/8741da81c7)] - **deps**: update googletest to 35b75a2 (Node.js GitHub Bot) [#58710](https://github.com/nodejs/node/pull/58710)
- \[[`028ce40e25`](https://github.com/nodejs/node/commit/028ce40e25)] - **deps**: update minimatch to 10.0.3 (Node.js GitHub Bot) [#58712](https://github.com/nodejs/node/pull/58712)
- \[[`3afb15b715`](https://github.com/nodejs/node/commit/3afb15b715)] - **dns**: fix parse memory leaky (theanarkh) [#58973](https://github.com/nodejs/node/pull/58973)
- \[[`f40ac32f3e`](https://github.com/nodejs/node/commit/f40ac32f3e)] - **dns**: set timeout to 1000ms when timeout < 0 (theanarkh) [#58441](https://github.com/nodejs/node/pull/58441)
- \[[`921b563999`](https://github.com/nodejs/node/commit/921b563999)] - **doc**: remove broken link to permission model source code (Juan José) [#58972](https://github.com/nodejs/node/pull/58972)
- \[[`78628d6158`](https://github.com/nodejs/node/commit/78628d6158)] - **doc**: clarify details of TSC public and private meetings (James M Snell) [#58925](https://github.com/nodejs/node/pull/58925)
- \[[`ab834a8b94`](https://github.com/nodejs/node/commit/ab834a8b94)] - **doc**: mark stability markers consistent in `globals.md` (Antoine du Hamel) [#58932](https://github.com/nodejs/node/pull/58932)
- \[[`8d4f6a0016`](https://github.com/nodejs/node/commit/8d4f6a0016)] - **doc**: move "Core Promise APIs" to "Completed initiatives" (Antoine du Hamel) [#58934](https://github.com/nodejs/node/pull/58934)
- \[[`94725fced5`](https://github.com/nodejs/node/commit/94725fced5)] - **doc**: fix `fetch` subsections in `globals.md` (Antoine du Hamel) [#58933](https://github.com/nodejs/node/pull/58933)
- \[[`a7a4870014`](https://github.com/nodejs/node/commit/a7a4870014)] - **doc**: add missing `Class:` mentions (Antoine du Hamel) [#58931](https://github.com/nodejs/node/pull/58931)
- \[[`98f29fa2fd`](https://github.com/nodejs/node/commit/98f29fa2fd)] - **doc**: remove myself from security steward rotation (Michael Dawson) [#58927](https://github.com/nodejs/node/pull/58927)
- \[[`710e13d436`](https://github.com/nodejs/node/commit/710e13d436)] - **doc**: add ovflowd back to core collaborators (Claudio W.) [#58911](https://github.com/nodejs/node/pull/58911)
- \[[`8b93008dc0`](https://github.com/nodejs/node/commit/8b93008dc0)] - **doc**: update email address for Richard Lau (Richard Lau) [#58910](https://github.com/nodejs/node/pull/58910)
- \[[`9ff81d21ed`](https://github.com/nodejs/node/commit/9ff81d21ed)] - **doc**: update vm doc links (Chengzhong Wu) [#58885](https://github.com/nodejs/node/pull/58885)
- \[[`ff2efd266d`](https://github.com/nodejs/node/commit/ff2efd266d)] - **doc**: fix links in test.md (Vas Sudanagunta) [#58876](https://github.com/nodejs/node/pull/58876)
- \[[`5e854e1f61`](https://github.com/nodejs/node/commit/5e854e1f61)] - **doc**: add missing comma in `child_process.md` (ronijames008) [#58862](https://github.com/nodejs/node/pull/58862)
- \[[`48f5d6d686`](https://github.com/nodejs/node/commit/48f5d6d686)] - **doc**: add guidelines for introduction of ERM support (James M Snell) [#58526](https://github.com/nodejs/node/pull/58526)
- \[[`80dec9849d`](https://github.com/nodejs/node/commit/80dec9849d)] - **(SEMVER-MINOR)** **doc**: add all watch-mode related flags to node.1 (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)
- \[[`b36fa0fda1`](https://github.com/nodejs/node/commit/b36fa0fda1)] - **doc**: fix jsdoc definition of assert.ifError() fn in lib/assert.js (jesh) [#58573](https://github.com/nodejs/node/pull/58573)
- \[[`cebb93ea12`](https://github.com/nodejs/node/commit/cebb93ea12)] - **doc**: add array type in http request headers (Michael Henrique) [#58049](https://github.com/nodejs/node/pull/58049)
- \[[`6e6b373da1`](https://github.com/nodejs/node/commit/6e6b373da1)] - **doc**: add missing colon to headers in `globals.md` (Aviv Keller) [#58825](https://github.com/nodejs/node/pull/58825)
- \[[`1519b75191`](https://github.com/nodejs/node/commit/1519b75191)] - **doc**: fix `stream.md` section order (Antoine du Hamel) [#58811](https://github.com/nodejs/node/pull/58811)
- \[[`87f4d078b3`](https://github.com/nodejs/node/commit/87f4d078b3)] - **(SEMVER-MINOR)** **fs**: add disposable mkdtempSync (Kevin Gibbons) [#58516](https://github.com/nodejs/node/pull/58516)
- \[[`b378fc3ac0`](https://github.com/nodejs/node/commit/b378fc3ac0)] - **fs**: close dir before throwing if `options.bufferSize` is invalid (Livia Medeiros) [#58856](https://github.com/nodejs/node/pull/58856)
- \[[`23bd4d1867`](https://github.com/nodejs/node/commit/23bd4d1867)] - **fs**: special input `-1` on `chown`, `lchown` and `fchown` (Alex Yang) [#58836](https://github.com/nodejs/node/pull/58836)
- \[[`d07ce8e90c`](https://github.com/nodejs/node/commit/d07ce8e90c)] - **fs**: throw `ERR_INVALID_THIS` on illegal invocations (Livia Medeiros) [#58848](https://github.com/nodejs/node/pull/58848)
- \[[`0d969a66dc`](https://github.com/nodejs/node/commit/0d969a66dc)] - **inspector**: support undici traffic data inspection (Chengzhong Wu) [#58953](https://github.com/nodejs/node/pull/58953)
- \[[`839b25e371`](https://github.com/nodejs/node/commit/839b25e371)] - **lib**: expose `setupInstance` method on WASI class (toyobayashi) [#57214](https://github.com/nodejs/node/pull/57214)
- \[[`d8f3f649c2`](https://github.com/nodejs/node/commit/d8f3f649c2)] - **lib**: fix `getTypeScriptParsingMode` jsdoc (沈鸿飞) [#58681](https://github.com/nodejs/node/pull/58681)
- \[[`d534706211`](https://github.com/nodejs/node/commit/d534706211)] - **meta**: bump step-security/harden-runner from 2.12.0 to 2.12.2 (dependabot\[bot]) [#58923](https://github.com/nodejs/node/pull/58923)
- \[[`3ec5fe04d0`](https://github.com/nodejs/node/commit/3ec5fe04d0)] - **meta**: bump github/codeql-action from 3.28.18 to 3.29.2 (dependabot\[bot]) [#58922](https://github.com/nodejs/node/pull/58922)
- \[[`bd4a1a5b06`](https://github.com/nodejs/node/commit/bd4a1a5b06)] - **meta**: add IlyasShabi to collaborators (Ilyas Shabi) [#58916](https://github.com/nodejs/node/pull/58916)
- \[[`d29b195b51`](https://github.com/nodejs/node/commit/d29b195b51)] - **module**: link module with a module request record (Chengzhong Wu) [#58886](https://github.com/nodejs/node/pull/58886)
- \[[`a78385c4bd`](https://github.com/nodejs/node/commit/a78385c4bd)] - **module**: convert schema-only core module on `convertCJSFilenameToURL` (Alex Yang) [#58612](https://github.com/nodejs/node/pull/58612)
- \[[`e0de362319`](https://github.com/nodejs/node/commit/e0de362319)] - **module**: update tests for combined ambiguous module syntax error (Mert Can Altin) [#55874](https://github.com/nodejs/node/pull/55874)
- \[[`7f7a833e82`](https://github.com/nodejs/node/commit/7f7a833e82)] - **os**: fix GetInterfaceAddresses memory lieaky (theanarkh) [#58940](https://github.com/nodejs/node/pull/58940)
- \[[`9623c50b53`](https://github.com/nodejs/node/commit/9623c50b53)] - **(SEMVER-MINOR)** **permission**: propagate permission model flags on spawn (Rafael Gonzaga) [#58853](https://github.com/nodejs/node/pull/58853)
- \[[`efe19b50b6`](https://github.com/nodejs/node/commit/efe19b50b6)] - **repl**: fix eval errors thrown after close throwing `ERR_USE_AFTER_CLOSE` (Dario Piotrowicz) [#58791](https://github.com/nodejs/node/pull/58791)
- \[[`c891db1c05`](https://github.com/nodejs/node/commit/c891db1c05)] - **repl**: improve tab completion on computed properties (Dario Piotrowicz) [#58775](https://github.com/nodejs/node/pull/58775)
- \[[`797ec4da04`](https://github.com/nodejs/node/commit/797ec4da04)] - **(SEMVER-MINOR)** **sqlite**: add support for readBigInts option in db connection level (Miguel Marcondes Filho) [#58697](https://github.com/nodejs/node/pull/58697)
- \[[`8eecaa264d`](https://github.com/nodejs/node/commit/8eecaa264d)] - **src**: -Wunreachable-code-break in node_config_file.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`143379df56`](https://github.com/nodejs/node/commit/143379df56)] - **src**: -Wunreachable-code error in crypto_context.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`056a1af197`](https://github.com/nodejs/node/commit/056a1af197)] - **src**: fix -Wunreachable-code-return in src/node_contextify.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`ba661459f5`](https://github.com/nodejs/node/commit/ba661459f5)] - **src**: fix -Wunreachable-code in src/node_api.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`6af0163dda`](https://github.com/nodejs/node/commit/6af0163dda)] - **src**: simplify adding fast APIs to ExternalReferenceRegistry (René) [#58896](https://github.com/nodejs/node/pull/58896)
- \[[`210e608938`](https://github.com/nodejs/node/commit/210e608938)] - **src**: cleanup uv_fs_req before uv_fs_stat on existSync (RafaelGSS) [#58915](https://github.com/nodejs/node/pull/58915)
- \[[`2445f86dc9`](https://github.com/nodejs/node/commit/2445f86dc9)] - **src**: -Wmismatched-new-delete in debug_utils.cc (Shelley Vohr) [#58844](https://github.com/nodejs/node/pull/58844)
- \[[`12286c9f64`](https://github.com/nodejs/node/commit/12286c9f64)] - **src**: use ranges library (C++20) more systematically (Daniel Lemire) [#58028](https://github.com/nodejs/node/pull/58028)
- \[[`ed966a0215`](https://github.com/nodejs/node/commit/ed966a0215)] - **(SEMVER-MINOR)** **src,permission**: add support to permission.has(addon) (Rafael Gonzaga) [#58951](https://github.com/nodejs/node/pull/58951)
- \[[`dd54910ab1`](https://github.com/nodejs/node/commit/dd54910ab1)] - **src,permission**: enhance permission model debug (Rafael Gonzaga) [#58898](https://github.com/nodejs/node/pull/58898)
- \[[`94f9424d78`](https://github.com/nodejs/node/commit/94f9424d78)] - **test**: deflake test-runner-watch-mode-kill-signal (Dario Piotrowicz) [#58952](https://github.com/nodejs/node/pull/58952)
- \[[`b6ff6c8d20`](https://github.com/nodejs/node/commit/b6ff6c8d20)] - **test**: add known issue tests for recursive readdir calls with Buffer path (Dario Piotrowicz) [#58893](https://github.com/nodejs/node/pull/58893)
- \[[`c300f107ac`](https://github.com/nodejs/node/commit/c300f107ac)] - **test**: add known issue tests for fs.cp (James M Snell) [#58883](https://github.com/nodejs/node/pull/58883)
- \[[`d8a86a622e`](https://github.com/nodejs/node/commit/d8a86a622e)] - **test**: add tests to ensure that node.1 is kept in sync with cli.md (Dario Piotrowicz) [#58878](https://github.com/nodejs/node/pull/58878)
- \[[`57c69acb78`](https://github.com/nodejs/node/commit/57c69acb78)] - **test**: replace `.filter()[0]` with `.find()` (Livia Medeiros) [#58872](https://github.com/nodejs/node/pull/58872)
- \[[`67b3f4fbee`](https://github.com/nodejs/node/commit/67b3f4fbee)] - **test**: remove reliance on in-tree `deps/undici` (Richard Lau) [#58866](https://github.com/nodejs/node/pull/58866)
- \[[`df85b02a00`](https://github.com/nodejs/node/commit/df85b02a00)] - **test**: close dirs in `fs-opendir` test (Livia Medeiros) [#58855](https://github.com/nodejs/node/pull/58855)
- \[[`692f1aebf0`](https://github.com/nodejs/node/commit/692f1aebf0)] - **test**: update WPT for urlpattern to 84b75f0880 (Node.js GitHub Bot) [#58785](https://github.com/nodejs/node/pull/58785)
- \[[`3a119be362`](https://github.com/nodejs/node/commit/3a119be362)] - **test**: save the config file in a temporary directory (Luigi Pinca) [#58799](https://github.com/nodejs/node/pull/58799)
- \[[`924cf1ef25`](https://github.com/nodejs/node/commit/924cf1ef25)] - **test**: deflake test-config-file (Luigi Pinca) [#58799](https://github.com/nodejs/node/pull/58799)
- \[[`b5c7e645c9`](https://github.com/nodejs/node/commit/b5c7e645c9)] - **test_runner**: correctly filter --experimental-config-file (Pietro Marchini) [#58833](https://github.com/nodejs/node/pull/58833)
- \[[`d0faf723c7`](https://github.com/nodejs/node/commit/d0faf723c7)] - **test_runner**: fix timeout not propagated to the child process in run (jakecastelli) [#58831](https://github.com/nodejs/node/pull/58831)
- \[[`6052d8c1ac`](https://github.com/nodejs/node/commit/6052d8c1ac)] - **test_runner**: correct "already mocked" error punctuation placement (Jacob Smith) [#58840](https://github.com/nodejs/node/pull/58840)
- \[[`e8dd1897d5`](https://github.com/nodejs/node/commit/e8dd1897d5)] - **tools**: compile maglev files into v8_compiler if maglev is disabled (Yao Zi) [#58861](https://github.com/nodejs/node/pull/58861)
- \[[`191396260c`](https://github.com/nodejs/node/commit/191396260c)] - **tools**: bump the eslint group in /tools/eslint with 6 updates (dependabot\[bot]) [#58921](https://github.com/nodejs/node/pull/58921)
- \[[`1e423e0680`](https://github.com/nodejs/node/commit/1e423e0680)] - **tools**: update inspector_protocol to 69d69dd (Shelley Vohr) [#58900](https://github.com/nodejs/node/pull/58900)
- \[[`0def4e23b1`](https://github.com/nodejs/node/commit/0def4e23b1)] - **tools**: update gyp-next to 0.20.2 (Node.js GitHub Bot) [#58788](https://github.com/nodejs/node/pull/58788)
- \[[`adb950cde2`](https://github.com/nodejs/node/commit/adb950cde2)] - **tools,doc**: move more MDN links to types (Antoine du Hamel) [#58930](https://github.com/nodejs/node/pull/58930)
- \[[`1ee539a3aa`](https://github.com/nodejs/node/commit/1ee539a3aa)] - **tty**: treat empty `NO_COLOR` same as absent `NO_COLOR` (Antoine du Hamel) [#58074](https://github.com/nodejs/node/pull/58074)
- \[[`2b34867ba9`](https://github.com/nodejs/node/commit/2b34867ba9)] - **v8**: fix missing callback in heap utils destroy (Ruben Bridgewater) [#58846](https://github.com/nodejs/node/pull/58846)
- \[[`a1f4333695`](https://github.com/nodejs/node/commit/a1f4333695)] - **vm**: expose import phase on SourceTextModule.moduleRequests (Chengzhong Wu) [#58829](https://github.com/nodejs/node/pull/58829)
- \[[`fe17f5d285`](https://github.com/nodejs/node/commit/fe17f5d285)] - **(SEMVER-MINOR)** **watch**: add `--watch-kill-signal` flag (Dario Piotrowicz) [#58719](https://github.com/nodejs/node/pull/58719)

Windows 64-bit Installer: https://nodejs.org/dist/v24.4.0/node-v24.4.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.4.0/node-v24.4.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.4.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.4.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.4.0/node-v24.4.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.4.0/node-v24.4.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.4.0/node-v24.4.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.4.0/node-v24.4.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.4.0/node-v24.4.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.4.0/node-v24.4.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.4.0/node-v24.4.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.4.0/node-v24.4.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.4.0/node-v24.4.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.4.0/ \
Documentation: https://nodejs.org/docs/v24.4.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

41394530a9b85327f1cd6aa618ca351f7386f0d9db41181973abf3f601637508  node-v24.4.0-aix-ppc64.tar.gz
e52e72c5bf332de9acd8a8ae57864f7fa53f9f4a6eae7c6467125cac4bf11c06  node-v24.4.0-arm64.msi
d7db0e5017d68f4e34405f5c99ad3895481793cc6420550e582b7eedf911780f  node-v24.4.0-darwin-arm64.tar.gz
b126a6d978a0d1ac1cd8b4e34b108b64ec074039820fe66714583e3c136aeff5  node-v24.4.0-darwin-arm64.tar.xz
3dea0c90625c2e7be1e71c3561e1e3337d42d7b6e67dd6f3a3709ec12359bec7  node-v24.4.0-darwin-x64.tar.gz
15e2d12e279e86b3bf7595f843dc0ecc0a3f243f0471b7b1611a690cc0a12801  node-v24.4.0-darwin-x64.tar.xz
acb66dfaf241c0eeb73e09d84922b776f72be3b237495ee57b375df39e65df31  node-v24.4.0-headers.tar.gz
063a87ca06d7b3d4144aa7b44114a693970a90668db16e23ba4a1fd8dfaf2e7e  node-v24.4.0-headers.tar.xz
637ab954900450101c9a254df9014771f5f21d5fd12fec53e4cf4f8bae7e7365  node-v24.4.0-linux-arm64.tar.gz
48ecb7ee501f69e2a27d9b4b724c05e82bbd1cf03df7152ce37628956b8303a7  node-v24.4.0-linux-arm64.tar.xz
dd7bbd65b315097c685aef1f0f0cd4cb5e605a1a94458dc44cae7da814eb209a  node-v24.4.0-linux-ppc64le.tar.gz
b00e1449ad9a4ec77cc1b8c1e3df3799e995fd781c24ba9bc4d787ba4ad3f605  node-v24.4.0-linux-ppc64le.tar.xz
efa22fc1bdb25c9eb656465b9304b02a037c2d07774c9f9adaf3bf3741583cd3  node-v24.4.0-linux-s390x.tar.gz
3333eb8b114111742056865516685519e486e8988521e2cb086f40ef73d0f2bc  node-v24.4.0-linux-s390x.tar.xz
292c187efeb7a360dee81efb519518dea2e02cb98e4c0d1d5a0f0af62c31e4b6  node-v24.4.0-linux-x64.tar.gz
af59f88ed35c68f7196dc94938e74327e3abe62055b831746de5b23bd7e1670a  node-v24.4.0-linux-x64.tar.xz
cee5a937a67b1e99d7b92ceafefef03109dc2f9c667284f9d9a23aa523645769  node-v24.4.0-win-arm64.7z
e6ebdac17e1c25c9722c85647f1f07bb1ee160b9fb9cfb9a9214f20703981ea0  node-v24.4.0-win-arm64.zip
4643950bbff4b920690af1d3b673dfba96cbcc648844192cc9310997a2c34adf  node-v24.4.0-win-x64.7z
1471b32d0690b21b2d0f67f3b11c7ecbf9577c1bfc03acf41df0074e677f1531  node-v24.4.0-win-x64.zip
6fa0be2a221a4c3cdfa9a4c017b95a8f8b99c8abc1261285239fe98c86f86b89  node-v24.4.0-x64.msi
bff7a6239d9c5a809f4fe4e8585144ccc930533d88f8ef2935afa0d5aa86c244  node-v24.4.0.pkg
20d683315d8ecd6ea21a786437d3b680b2a0693646662ddade8ccef4509b78b9  node-v24.4.0.tar.gz
42fa8079da25a926013cd89b9d3467d09110e4fbb0c439342ebe4dd6ecc26bbb  node-v24.4.0.tar.xz
8fcf14f206c72b2362ecb04e977e1428810331d3ff18845b06f97f9ee204dde4  win-arm64/node.exe
6809fc156673d10cca7dff0e54f28309bb111d235c54493a4a0ca401c2113be7  win-arm64/node.lib
be8b31d78b98764041c9b8990df3b8ffa26ff182f3eefae5dbae1987454e7f62  win-arm64/node_pdb.7z
0185e4657278b57b772e8b890c56b889f97edd5832d8149c642bae2017e174c0  win-arm64/node_pdb.zip
0b0be4b64648e4f01803b9582aafce9d0f648b1115083abbdd55351cae38bde1  win-x64/node.exe
34882ca2bb450431047f2dd3bae1c3b8c1cd2b4cffd5c1a0bf079948846d2b83  win-x64/node.lib
384fe079b2d28986217ffbecf5b97401a8286a8115b92da90bdb9854476cde0c  win-x64/node_pdb.7z
390d0ae2bb72992f4c4d70cbb16019cbdddacb195ac9a4a7d85fb44319414efb  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmhuYjIACgkQi+q0389V
XvQtxwv/dGQ4Cae+3duKs+qMjliKhRKuK2dQIosk/yOyPLZhstZygIiaMacARq12
AL3BabOFtScmT2QMv45Rdso43TFFgCuD/8tZihapxXpU9sTDbRlOZsr3TrQ3A1zf
XWZGWmtyzfA0paOiOwmpI0YD2+Mbyhf/1tLiWrVLv+05hduf18dyLxY8kiXCrnfD
wWox6fvVwJ+7hJzAN1Qjr8Rl/ZHTE+fnTsCn5742uC4N080lE4kUmvw5OPUP4tAo
4+j3iPPB4kNnwwFs2JmZ92r5+UonFQufiUl6IYAfM3wnxEnxRj5qo09Ih9PCR9tu
Yfb+6StsxjhxNKcn2zvcrqZFTHptmXyle5PvVsUgdc9OTW0K37OnKXgupEv0m/nP
t0MdcQztD4EC3/+vCBXmV4QhgCYxRPawYTx8ey5GPh1m5J0CVxsGtgZP13Z9tF7A
UVKJKrvkuK1Azs2Voz0IhZovIoamMPGWMaK9SZKOWqHWZjoEidWOk857J+HNsobF
7UmbjimH
=ElhG
-----END PGP SIGNATURE-----
```
