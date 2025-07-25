---
date: '2025-02-26T16:41:09.271Z'
category: release
title: Node.js v23.9.0 (Current)
layout: blog-post
author: Michaël Zasso
---

## 2025-02-26, Version 23.9.0 (Current), @targos

### Notable Changes

- \[[`927d985aa0`](https://github.com/nodejs/node/commit/927d985aa0)] - **(SEMVER-MINOR)** **dns**: add TLSA record query and parsing (Rithvik Vibhu) [#52983](https://github.com/nodejs/node/pull/52983)
- \[[`0236fbf75a`](https://github.com/nodejs/node/commit/0236fbf75a)] - **(SEMVER-MINOR)** **process**: add threadCpuUsage (Paolo Insogna) [#56467](https://github.com/nodejs/node/pull/56467)

### Commits

- \[[`f4a82fddb1`](https://github.com/nodejs/node/commit/f4a82fddb1)] - **benchmark**: add a warmup on bench-openSync (Elves Vieira) [#57051](https://github.com/nodejs/node/pull/57051)
- \[[`b384baa073`](https://github.com/nodejs/node/commit/b384baa073)] - **build**: print 'Formatting Markdown...' for long task markdown formatting (1ilsang) [#57108](https://github.com/nodejs/node/pull/57108)
- \[[`fec2d50308`](https://github.com/nodejs/node/commit/fec2d50308)] - **build**: add skip_apidoc_files and include QUIC (RafaelGSS) [#56941](https://github.com/nodejs/node/pull/56941)
- \[[`5af35d1850`](https://github.com/nodejs/node/commit/5af35d1850)] - **build**: fix GN build failure (Cheng) [#57013](https://github.com/nodejs/node/pull/57013)
- \[[`35f89aa66f`](https://github.com/nodejs/node/commit/35f89aa66f)] - **build**: fix GN build of uv (Cheng) [#56955](https://github.com/nodejs/node/pull/56955)
- \[[`e26d4841d1`](https://github.com/nodejs/node/commit/e26d4841d1)] - **cli**: allow --cpu-prof\* in NODE_OPTIONS (Carlos Espa) [#57018](https://github.com/nodejs/node/pull/57018)
- \[[`b50fc42a99`](https://github.com/nodejs/node/commit/b50fc42a99)] - **crypto**: support --use-system-ca on non-Windows and non-macOS (Joyee Cheung) [#57009](https://github.com/nodejs/node/pull/57009)
- \[[`dfdaa92a37`](https://github.com/nodejs/node/commit/dfdaa92a37)] - **crypto**: fix missing OPENSSL_NO_ENGINE guard (Shelley Vohr) [#57012](https://github.com/nodejs/node/pull/57012)
- \[[`18ea88bcbe`](https://github.com/nodejs/node/commit/18ea88bcbe)] - **crypto**: cleanup root certificates and skip PEM deserialization (Joyee Cheung) [#56999](https://github.com/nodejs/node/pull/56999)
- \[[`8076284f9e`](https://github.com/nodejs/node/commit/8076284f9e)] - **deps**: update cjs-module-lexer to 2.1.0 (Node.js GitHub Bot) [#57180](https://github.com/nodejs/node/pull/57180)
- \[[`8644cf3e5a`](https://github.com/nodejs/node/commit/8644cf3e5a)] - **deps**: update ngtcp2 to 1.11.0 (Node.js GitHub Bot) [#57179](https://github.com/nodejs/node/pull/57179)
- \[[`2aceca15d6`](https://github.com/nodejs/node/commit/2aceca15d6)] - **deps**: update sqlite to 3.49.1 (Node.js GitHub Bot) [#57178](https://github.com/nodejs/node/pull/57178)
- \[[`8421021427`](https://github.com/nodejs/node/commit/8421021427)] - **deps**: update ada to 3.1.0 (Node.js GitHub Bot) [#57083](https://github.com/nodejs/node/pull/57083)
- \[[`21d795a5f0`](https://github.com/nodejs/node/commit/21d795a5f0)] - **(SEMVER-MINOR)** **dns**: add TLSA record query and parsing (Rithvik Vibhu) [#52983](https://github.com/nodejs/node/pull/52983)
- \[[`455bf5a0a8`](https://github.com/nodejs/node/commit/455bf5a0a8)] - **doc**: update options to filehandle.appendFile() (Hasegawa-Yukihiro) [#56972](https://github.com/nodejs/node/pull/56972)
- \[[`f35bd869ee`](https://github.com/nodejs/node/commit/f35bd869ee)] - **doc**: add additional caveat for fs.watch (Michael Dawson) [#57150](https://github.com/nodejs/node/pull/57150)
- \[[`4413ce7ed3`](https://github.com/nodejs/node/commit/4413ce7ed3)] - **doc**: fix typo in Windows building instructions (Tim Jacomb) [#57158](https://github.com/nodejs/node/pull/57158)
- \[[`66614cfcf3`](https://github.com/nodejs/node/commit/66614cfcf3)] - **doc**: fix web.libera.chat link in pull-requests.md (Samuel Bronson) [#57076](https://github.com/nodejs/node/pull/57076)
- \[[`587112cb08`](https://github.com/nodejs/node/commit/587112cb08)] - **doc**: remove buffered flag from performance hooks examples (Pavel Romanov) [#52607](https://github.com/nodejs/node/pull/52607)
- \[[`fdc8aeb8a0`](https://github.com/nodejs/node/commit/fdc8aeb8a0)] - **doc**: fix 'introduced_in' version in typescript module (1ilsang) [#57109](https://github.com/nodejs/node/pull/57109)
- \[[`b6960499c8`](https://github.com/nodejs/node/commit/b6960499c8)] - **doc**: fix link and history of `SourceMap` sections (Antoine du Hamel) [#57098](https://github.com/nodejs/node/pull/57098)
- \[[`0de128ca97`](https://github.com/nodejs/node/commit/0de128ca97)] - **doc**: add `module namespace object` links (Dario Piotrowicz) [#57093](https://github.com/nodejs/node/pull/57093)
- \[[`5a74568320`](https://github.com/nodejs/node/commit/5a74568320)] - **doc**: disambiguate pseudo-code statement (Dario Piotrowicz) [#57092](https://github.com/nodejs/node/pull/57092)
- \[[`46df14ddcb`](https://github.com/nodejs/node/commit/46df14ddcb)] - **doc**: update clang-cl on Windows building guide (Joyee Cheung) [#57087](https://github.com/nodejs/node/pull/57087)
- \[[`4b02fdc72f`](https://github.com/nodejs/node/commit/4b02fdc72f)] - **doc**: update Xcode version used for arm64 and pkg (Michaël Zasso) [#57104](https://github.com/nodejs/node/pull/57104)
- \[[`78d4e52a52`](https://github.com/nodejs/node/commit/78d4e52a52)] - **doc**: fix wrong articles used to address modules (Dario Piotrowicz) [#57090](https://github.com/nodejs/node/pull/57090)
- \[[`ed5671f1bc`](https://github.com/nodejs/node/commit/ed5671f1bc)] - **doc**: update `module.builtinModules` sentence (Dario Piotrowicz) [#57089](https://github.com/nodejs/node/pull/57089)
- \[[`9de45cbac9`](https://github.com/nodejs/node/commit/9de45cbac9)] - **doc**: `modules.md`: fix `distance` definition (Alexander “weej” Jones) [#57046](https://github.com/nodejs/node/pull/57046)
- \[[`a7e5ef9e01`](https://github.com/nodejs/node/commit/a7e5ef9e01)] - **doc**: fix wrong verb form (Dario Piotrowicz) [#57091](https://github.com/nodejs/node/pull/57091)
- \[[`c02494f5fe`](https://github.com/nodejs/node/commit/c02494f5fe)] - **doc**: fix transpiler loader hooks documentation (Joyee Cheung) [#57037](https://github.com/nodejs/node/pull/57037)
- \[[`5b2dfadd40`](https://github.com/nodejs/node/commit/5b2dfadd40)] - **doc**: add a note about `require('../common')` in testing documentation (Aditi) [#56953](https://github.com/nodejs/node/pull/56953)
- \[[`50ba04e214`](https://github.com/nodejs/node/commit/50ba04e214)] - **doc**: recommend writing tests in new files and including comments (Joyee Cheung) [#57028](https://github.com/nodejs/node/pull/57028)
- \[[`6951133e1a`](https://github.com/nodejs/node/commit/6951133e1a)] - **doc**: improve documentation on argument validation (Aditi) [#56954](https://github.com/nodejs/node/pull/56954)
- \[[`44dd8a5cc2`](https://github.com/nodejs/node/commit/44dd8a5cc2)] - **doc**: buffer: fix typo on `Buffer.copyBytesFrom(` `offset` option (tpoisseau) [#57015](https://github.com/nodejs/node/pull/57015)
- \[[`c011271a70`](https://github.com/nodejs/node/commit/c011271a70)] - **doc**: update cleanup to trust on vuln db automation (Rafael Gonzaga) [#57004](https://github.com/nodejs/node/pull/57004)
- \[[`a6b7bce3a0`](https://github.com/nodejs/node/commit/a6b7bce3a0)] - **doc**: move stability index after history section for consistency (Antoine du Hamel) [#56997](https://github.com/nodejs/node/pull/56997)
- \[[`3bc6d626b4`](https://github.com/nodejs/node/commit/3bc6d626b4)] - **doc**: add `signal` to `filehandle.writeFile()` options (Yukihiro Hasegawa) [#56804](https://github.com/nodejs/node/pull/56804)
- \[[`2990cc8616`](https://github.com/nodejs/node/commit/2990cc8616)] - **doc**: run license-builder (github-actions\[bot]) [#56985](https://github.com/nodejs/node/pull/56985)
- \[[`40f3a516bf`](https://github.com/nodejs/node/commit/40f3a516bf)] - **fs**: handle UV_ENOTDIR in `fs.statSync` with `throwIfNoEntry` provided (Juan José Arboleda) [#56996](https://github.com/nodejs/node/pull/56996)
- \[[`e10ef275e8`](https://github.com/nodejs/node/commit/e10ef275e8)] - **inspector**: convert event params to protocol without json (Chengzhong Wu) [#57027](https://github.com/nodejs/node/pull/57027)
- \[[`d6234b4652`](https://github.com/nodejs/node/commit/d6234b4652)] - **inspector**: skip promise hook in the inspector async hook (Joyee Cheung) [#57148](https://github.com/nodejs/node/pull/57148)
- \[[`aa817853cd`](https://github.com/nodejs/node/commit/aa817853cd)] - **lib**: fixup more incorrect ERR_INVALID_ARG_VALUE uses (James M Snell) [#57177](https://github.com/nodejs/node/pull/57177)
- \[[`e08d7d4e53`](https://github.com/nodejs/node/commit/e08d7d4e53)] - **lib**: fixup incorrect argument order in assertEncoding (James M Snell) [#57177](https://github.com/nodejs/node/pull/57177)
- \[[`f77069b4e0`](https://github.com/nodejs/node/commit/f77069b4e0)] - **meta**: bump `actions/setup-python` from 5.3.0 to 5.4.0 (dependabot\[bot]) [#56867](https://github.com/nodejs/node/pull/56867)
- \[[`35cdd9b9fe`](https://github.com/nodejs/node/commit/35cdd9b9fe)] - **meta**: bump `peter-evans/create-pull-request` from 7.0.5 to 7.0.6 (dependabot\[bot]) [#56866](https://github.com/nodejs/node/pull/56866)
- \[[`3d61604f2a`](https://github.com/nodejs/node/commit/3d61604f2a)] - **meta**: bump `mozilla-actions/sccache-action` from 0.0.6 to 0.0.7 (dependabot\[bot]) [#56865](https://github.com/nodejs/node/pull/56865)
- \[[`0dd0108fc5`](https://github.com/nodejs/node/commit/0dd0108fc5)] - **meta**: bump `codecov/codecov-action` from 5.0.7 to 5.3.1 (dependabot\[bot]) [#56864](https://github.com/nodejs/node/pull/56864)
- \[[`58d70369e3`](https://github.com/nodejs/node/commit/58d70369e3)] - **meta**: bump `step-security/harden-runner` from 2.10.2 to 2.10.4 (dependabot\[bot]) [#56863](https://github.com/nodejs/node/pull/56863)
- \[[`dfd42db739`](https://github.com/nodejs/node/commit/dfd42db739)] - **meta**: bump `actions/cache` from 4.1.2 to 4.2.0 (dependabot\[bot]) [#56862](https://github.com/nodejs/node/pull/56862)
- \[[`7f5f02ba2b`](https://github.com/nodejs/node/commit/7f5f02ba2b)] - **meta**: bump `actions/stale` from 9.0.0 to 9.1.0 (dependabot\[bot]) [#56860](https://github.com/nodejs/node/pull/56860)
- \[[`85ac02f8d3`](https://github.com/nodejs/node/commit/85ac02f8d3)] - **meta**: bump `github/codeql-action` from 3.27.5 to 3.28.8 (dependabot\[bot]) [#56859](https://github.com/nodejs/node/pull/56859)
- \[[`d62299b021`](https://github.com/nodejs/node/commit/d62299b021)] - **meta**: add CODEOWNERS for SQLite (Colin Ihrig) [#57147](https://github.com/nodejs/node/pull/57147)
- \[[`2ec4ff17a6`](https://github.com/nodejs/node/commit/2ec4ff17a6)] - **meta**: update last name for jkrems (Jan Martin) [#57006](https://github.com/nodejs/node/pull/57006)
- \[[`ad3c572027`](https://github.com/nodejs/node/commit/ad3c572027)] - **module**: improve error message from asynchronicity in require(esm) (Joyee Cheung) [#57126](https://github.com/nodejs/node/pull/57126)
- \[[`cc1cafd562`](https://github.com/nodejs/node/commit/cc1cafd562)] - **module**: allow omitting context in synchronous next hooks (Joyee Cheung) [#57056](https://github.com/nodejs/node/pull/57056)
- \[[`c6ddfa52fb`](https://github.com/nodejs/node/commit/c6ddfa52fb)] - **(SEMVER-MINOR)** **process**: add threadCpuUsage (Paolo Insogna) [#56467](https://github.com/nodejs/node/pull/56467)
- \[[`ac35106625`](https://github.com/nodejs/node/commit/ac35106625)] - **sea**: suppress builtin warning with disableExperimentalSEAWarning option (koooge) [#57086](https://github.com/nodejs/node/pull/57086)
- \[[`ef314dc773`](https://github.com/nodejs/node/commit/ef314dc773)] - **src**: fix crash when lazy getter is invoked in a vm context (Chengzhong Wu) [#57168](https://github.com/nodejs/node/pull/57168)
- \[[`90a4de02b6`](https://github.com/nodejs/node/commit/90a4de02b6)] - **src**: do not format single string argument for THROW_ERR\_\* (Joyee Cheung) [#57126](https://github.com/nodejs/node/pull/57126)
- \[[`e0a91f631b`](https://github.com/nodejs/node/commit/e0a91f631b)] - **src**: gate all quic behind disabled-by-default compile flag (James M Snell) [#57142](https://github.com/nodejs/node/pull/57142)
- \[[`7dd326e3a7`](https://github.com/nodejs/node/commit/7dd326e3a7)] - **src**: move instead of copy shared pointer in node_blob (Michaël Zasso) [#57120](https://github.com/nodejs/node/pull/57120)
- \[[`e3127b89a2`](https://github.com/nodejs/node/commit/e3127b89a2)] - **src**: replace NewFromUtf8 with OneByteString where appropriate (James M Snell) [#57096](https://github.com/nodejs/node/pull/57096)
- \[[`56f9fe7514`](https://github.com/nodejs/node/commit/56f9fe7514)] - **src**: port `defineLazyProperties` to native code (Antoine du Hamel) [#57081](https://github.com/nodejs/node/pull/57081)
- \[[`90875ba0ca`](https://github.com/nodejs/node/commit/90875ba0ca)] - **src**: improve error handling in node_blob (James M Snell) [#57078](https://github.com/nodejs/node/pull/57078)
- \[[`5414eb48b5`](https://github.com/nodejs/node/commit/5414eb48b5)] - **src**: improve error handling in multiple files (James M Snell) [#56962](https://github.com/nodejs/node/pull/56962)
- \[[`286bb84188`](https://github.com/nodejs/node/commit/286bb84188)] - **src**: fix accessing empty string (Cheng) [#57014](https://github.com/nodejs/node/pull/57014)
- \[[`fa26f83e5b`](https://github.com/nodejs/node/commit/fa26f83e5b)] - **src**: lock the isolate properly in IsolateData destructor (Joyee Cheung) [#57031](https://github.com/nodejs/node/pull/57031)
- \[[`7e2dac9fcc`](https://github.com/nodejs/node/commit/7e2dac9fcc)] - **src**: add self-assigment memcpy checks (Burkov Egor) [#56986](https://github.com/nodejs/node/pull/56986)
- \[[`d8e70dcaa6`](https://github.com/nodejs/node/commit/d8e70dcaa6)] - **src**: improve node::Dotenv trimming (Dario Piotrowicz) [#56983](https://github.com/nodejs/node/pull/56983)
- \[[`41f444fa78`](https://github.com/nodejs/node/commit/41f444fa78)] - **src**: improve error handling in string_bytes/decoder (James M Snell) [#56978](https://github.com/nodejs/node/pull/56978)
- \[[`d0ee8c0a20`](https://github.com/nodejs/node/commit/d0ee8c0a20)] - **src**: improve error handling in process_wrap (James M Snell) [#56977](https://github.com/nodejs/node/pull/56977)
- \[[`1a244177a3`](https://github.com/nodejs/node/commit/1a244177a3)] - **test**: add doAppendAndCancel test (Hasegawa-Yukihiro) [#56972](https://github.com/nodejs/node/pull/56972)
- \[[`51dff8b1ae`](https://github.com/nodejs/node/commit/51dff8b1ae)] - **test**: fix test-without-async-context-frame.mjs in debug mode (Joyee Cheung) [#57034](https://github.com/nodejs/node/pull/57034)
- \[[`7c7e9f4d84`](https://github.com/nodejs/node/commit/7c7e9f4d84)] - **test**: make eval snapshot comparison more flexible (Shelley Vohr) [#57020](https://github.com/nodejs/node/pull/57020)
- \[[`315244e59e`](https://github.com/nodejs/node/commit/315244e59e)] - **test**: simplify test-http2-client-promisify-connect-error (Luigi Pinca) [#57144](https://github.com/nodejs/node/pull/57144)
- \[[`ccf496cff9`](https://github.com/nodejs/node/commit/ccf496cff9)] - **test**: improve error output of test-http2-client-promisify-connect-error (Antoine du Hamel) [#57135](https://github.com/nodejs/node/pull/57135)
- \[[`a588066518`](https://github.com/nodejs/node/commit/a588066518)] - **test**: add case for unrecognised fields within pjson "exports" (Jacob Smith) [#57026](https://github.com/nodejs/node/pull/57026)
- \[[`b369ad6e45`](https://github.com/nodejs/node/commit/b369ad6e45)] - **test**: remove unnecessary assert requiring from tests (Dario Piotrowicz) [#57008](https://github.com/nodejs/node/pull/57008)
- \[[`9b98ac6a81`](https://github.com/nodejs/node/commit/9b98ac6a81)] - **test**: update WPT for urlpattern to ef6d83d789 (Node.js GitHub Bot) [#56984](https://github.com/nodejs/node/pull/56984)
- \[[`0a82d27d28`](https://github.com/nodejs/node/commit/0a82d27d28)] - **test**: reduce flakiness on test-net-write-fully-async-buffer (Yagiz Nizipli) [#56971](https://github.com/nodejs/node/pull/56971)
- \[[`ab150d7781`](https://github.com/nodejs/node/commit/ab150d7781)] - **test**: remove flakiness on macOS test (Yagiz Nizipli) [#56971](https://github.com/nodejs/node/pull/56971)
- \[[`ccb8c12712`](https://github.com/nodejs/node/commit/ccb8c12712)] - **test,crypto**: make tests work for BoringSSL (Shelley Vohr) [#57021](https://github.com/nodejs/node/pull/57021)
- \[[`116c1fe84c`](https://github.com/nodejs/node/commit/116c1fe84c)] - **test_runner**: refactor testPlan counter increse (Pietro Marchini) [#56765](https://github.com/nodejs/node/pull/56765)
- \[[`2929fc6449`](https://github.com/nodejs/node/commit/2929fc6449)] - **test_runner**: allow special characters in snapshot keys (Carlos Espa) [#57017](https://github.com/nodejs/node/pull/57017)
- \[[`a025d7ba07`](https://github.com/nodejs/node/commit/a025d7ba07)] - **tools**: run Linux tests on GitHub arm64 runners as well (Dennis Ameling) [#57162](https://github.com/nodejs/node/pull/57162)
- \[[`73a8514305`](https://github.com/nodejs/node/commit/73a8514305)] - **tools**: consolidate 'introduced_in' check for docs (1ilsang) [#57109](https://github.com/nodejs/node/pull/57109)
- \[[`6cdee545f6`](https://github.com/nodejs/node/commit/6cdee545f6)] - **tools**: do not run major-release workflow on forks (Rich Trott) [#57064](https://github.com/nodejs/node/pull/57064)
- \[[`1efd74b1b0`](https://github.com/nodejs/node/commit/1efd74b1b0)] - **tools**: fix release URL computation in update-root-certs.mjs (Joyee Cheung) [#56843](https://github.com/nodejs/node/pull/56843)
- \[[`a9112df8d3`](https://github.com/nodejs/node/commit/a9112df8d3)] - **tools**: add support for `import source` syntax in linter (Antoine du Hamel) [#56992](https://github.com/nodejs/node/pull/56992)
- \[[`c6d6be2c3b`](https://github.com/nodejs/node/commit/c6d6be2c3b)] - **typings**: fix `ImportModuleDynamicallyCallback` return type (Chengzhong Wu) [#57160](https://github.com/nodejs/node/pull/57160)
- \[[`d922153cbf`](https://github.com/nodejs/node/commit/d922153cbf)] - **url**: improve urlpattern regexp performance (Yagiz Nizipli) [#57136](https://github.com/nodejs/node/pull/57136)

Windows 64-bit Installer: https://nodejs.org/dist/v23.9.0/node-v23.9.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v23.9.0/node-v23.9.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v23.9.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v23.9.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v23.9.0/node-v23.9.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v23.9.0/node-v23.9.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v23.9.0/node-v23.9.0.tar.gz \
Other release files: https://nodejs.org/dist/v23.9.0/ \
Documentation: https://nodejs.org/docs/v23.9.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

5837acfdfa601ba46163a01ef6ad53a2f6c6283cc9fc336db1145ec466220f68  node-v23.9.0-aix-ppc64.tar.gz
fbd24ed1172a21d94abf08d73686823675698a5e84a024b1ea321e038b4781aa  node-v23.9.0-arm64.msi
02fea0822268b245066e895a20a0c530f750a710517ac9faafdc0f1cd4434994  node-v23.9.0-darwin-arm64.tar.gz
03fb167727da087d386e8985e785713a8ce942203c7ca5f08aaf00f11f7fef8b  node-v23.9.0-darwin-arm64.tar.xz
535d8ed9d5e6a59f46df4e518e2940d5701e17ae795600815a702e8233552240  node-v23.9.0-darwin-x64.tar.gz
9a5bff19ecc690bde41b7fd1c050e745da0dd534feadd849e9137e0dd6d952ce  node-v23.9.0-darwin-x64.tar.xz
0b4cf80e82f873b9ab54786099c78fe576d865086c39da12ded22f7dedb5aba5  node-v23.9.0-headers.tar.gz
af2b11300e9634a5187699781a90f6b0179e6252397bd079a20b3da6aed9fb82  node-v23.9.0-headers.tar.xz
798301b15d2acdc9e62c50688d95480a7787051fa83000e210b32b9adfdcfa4c  node-v23.9.0-linux-arm64.tar.gz
dc0d93c5e4ae41c8fe75b64399c4d1fe3c15e2bfa3f55f92f8697bb16397585b  node-v23.9.0-linux-arm64.tar.xz
99a07e0655ab7fd72242b68b960a2cfcbe2d3d96b7852605a5a8cb098f9851b9  node-v23.9.0-linux-armv7l.tar.gz
449f4a348bb436a59edc5ec3b12d84eaa09d02c8b80271186a3eebc861fb655c  node-v23.9.0-linux-armv7l.tar.xz
437c9285740c2a628bd7cf68229c00528619076ef30c59cd557459b2cc61b63b  node-v23.9.0-linux-ppc64le.tar.gz
0d4f3d6e2646a62921b8a6a046fad4fcca1d0ef3e0979aa3080deaec3c5fe1a5  node-v23.9.0-linux-ppc64le.tar.xz
dc10041dcb37c5296a747bc828e47875b9680e33a98bd2313995ca2a840d9068  node-v23.9.0-linux-s390x.tar.gz
648e40aad3b1ae5c964328d438232737e29b7cd119979c3b318e86bba0929c72  node-v23.9.0-linux-s390x.tar.xz
bb1a81335c86578e70ee282eb9f93c5aa2e75f7cb6b99d9315a52899d42884f9  node-v23.9.0-linux-x64.tar.gz
0b4ece2aa678e6891b9abf6118d5393867ab07b3e31c8d8c4c34e97840fa8749  node-v23.9.0-linux-x64.tar.xz
9172705a683b6d0acc5bc671af3df16fd75f76d91bfa5391846aa8ed2713edbe  node-v23.9.0.pkg
164ec8fe82aac21f74efc0d5890d9f6c0e0ba22ca285d400c0266913fb4ff8a0  node-v23.9.0.tar.gz
c6b420bedbb049a6538c33af28abaf89011ccc879f0f0f81791675263c238f97  node-v23.9.0.tar.xz
4e68465ccb2463ab56417920ae6c5a0fa1ee8dfeb1880cd6e8fff197278a0b43  node-v23.9.0-win-arm64.7z
f25e12f66e65e563f24b3418e879221bba11b67ab4fdcc02f31134196e178342  node-v23.9.0-win-arm64.zip
458e75cbb1ce88ed70a16e264fb423d6522be49d39bced976d8ec4dffc059ad8  node-v23.9.0-win-x64.7z
2ebf80037486002b00fe5c6accd3c253b74c9045dfc2a20844a33be954e7ce74  node-v23.9.0-win-x64.zip
51b5421a5570297fb603fa1869b4d40fd041eef3a7dadb47238ae9bd47f28153  node-v23.9.0-x64.msi
49f04514e9403ad9eeca6f5904c97fceafb2bd00e8482a17f833cfe1b70188c8  win-arm64/node.exe
b04fc2c4f04273feaae3a2bc372d507fa631d7d6fd5f11265219d5b10d083a3e  win-arm64/node.lib
9307ed98fe8f9de006d482b93232b3125f38c6db02193ff642c6413b4a58323c  win-arm64/node_pdb.7z
fae79e6c8a2b515d8a490cffa5d660958721105071412ec69a2a4869accd5acc  win-arm64/node_pdb.zip
6ac035ad7f00184705e89f8288e0a5faaafd6dd546a6bccc4763b3d64c9a6ed3  win-x64/node.exe
7005ad268c2a3b55e741957609696fd707982d8d7727325c44e2cbf23f00f565  win-x64/node.lib
5a39045b1c3172873bf88686d44a0270feea6a4237bb4e5c1118634a2530780c  win-x64/node_pdb.7z
a0f56e42c42083b0b7e1b6d4c7fa1a932ac21f79111286b217151d88e8cc4d4f  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEj8yhP+8dDC6RAI4Jdw96mlrhVgAFAme/Q04ACgkQdw96mlrh
VgAARw/+MGfo5KbfnMIQR2ATY36/CGudr15gL5BCa1za1P6TJygZQN2nr3iZW7t4
o7XcAe+e0eCLBN2G5v/v9LtgWZ6TuD5oHkAvT5QfSAxGrh8mingmvpXfQJw43PiL
gSrd9AI6LitCoTNiM36ILLyRHHtCylZoQQEZwdY1tzHqlB6sQVO9M4/YvMoCnD/2
3awt7+fGa0kmfuVcMJsE3RBVxvMWuMIyZO9Z+uq8OgQtYYpnI4+WEwAQFeXMJVRY
bpSx7bNTplomPkGEVvkDn1Cy/eUx6NrrWZTwKIVin8UM0WjuaxJXA37jYMm3HS5h
QzHdWJ8Qc+5lbxyLbOJWL95ORzfvDvwr20z5oy31A2SfKqlGJ5hanRrmCdp197IP
yWEukGnNd3inIaxF6nUrz1BRu84jRqT1iAZd/4ppAjibiRYYZuLMoMeNYCg9uI0R
E61N8HHzP+eDSrE9jAxh6zjRmvcL64ZY8vRjjOfqVHUjs5QYhuf/JqAOe0//fO+4
X6HP5WRaqDti+gBVdwpwldRdgztprufVBPLfoKvap1QpxrIdUm6oTmuXKtlGA3AU
QCIoaSJm/P7kWBVERWSRL1C0fWDVHBe8Oiw5ruKbEgHi+1fZFdhfraf51lvG4Xfc
VJ1eGcq9flN+PrDD4lr8wqeY8+gPiV1jHCDHx9lkE2+oayv0/mk=
=oNrV
-----END PGP SIGNATURE-----
```
