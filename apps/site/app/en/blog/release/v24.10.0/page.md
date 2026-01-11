---
date: '2025-10-11T16:20:00.898Z'
category: release
title: Node.js 24.10.0 (Current)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-10-08, Version 24.10.0 (Current), @RafaelGSS

### Notable Changes

- \[[`31bb476895`](https://github.com/nodejs/node/commit/31bb476895)] - **(SEMVER-MINOR)** **console**: allow per-stream `inspectOptions` option (Anna Henningsen) [#60082](https://github.com/nodejs/node/pull/60082)
- \[[`3b92be2fb8`](https://github.com/nodejs/node/commit/3b92be2fb8)] - **(SEMVER-MINOR)** **lib**: remove util.getCallSite (Rafael Gonzaga) [#59980](https://github.com/nodejs/node/pull/59980)
- \[[`18c79d9e1c`](https://github.com/nodejs/node/commit/18c79d9e1c)] - **(SEMVER-MINOR)** **sqlite**: create authorization api (Guilherme Araújo) [#59928](https://github.com/nodejs/node/pull/59928)

### Commits

- \[[`e8cff3d51e`](https://github.com/nodejs/node/commit/e8cff3d51e)] - **benchmark**: remove unused variable from util/priority-queue (Bruno Rodrigues) [#59872](https://github.com/nodejs/node/pull/59872)
- \[[`03294252ab`](https://github.com/nodejs/node/commit/03294252ab)] - **benchmark**: update count to n in permission startup (Bruno Rodrigues) [#59872](https://github.com/nodejs/node/pull/59872)
- \[[`3c8a609d9b`](https://github.com/nodejs/node/commit/3c8a609d9b)] - **benchmark**: update num to n in dgram offset-length (Bruno Rodrigues) [#59872](https://github.com/nodejs/node/pull/59872)
- \[[`7b2032b13e`](https://github.com/nodejs/node/commit/7b2032b13e)] - **benchmark**: adjust dgram offset-length len values (Bruno Rodrigues) [#59708](https://github.com/nodejs/node/pull/59708)
- \[[`552d887aee`](https://github.com/nodejs/node/commit/552d887aee)] - **benchmark**: update num to n in dgram offset-length (Bruno Rodrigues) [#59708](https://github.com/nodejs/node/pull/59708)
- \[[`31bb476895`](https://github.com/nodejs/node/commit/31bb476895)] - **(SEMVER-MINOR)** **console**: allow per-stream `inspectOptions` option (Anna Henningsen) [#60082](https://github.com/nodejs/node/pull/60082)
- \[[`0bf022d4c0`](https://github.com/nodejs/node/commit/0bf022d4c0)] - **console,util**: improve array inspection performance (Ruben Bridgewater) [#60037](https://github.com/nodejs/node/pull/60037)
- \[[`04d568e591`](https://github.com/nodejs/node/commit/04d568e591)] - **deps**: V8: cherry-pick f93055fbd5aa (Olivier Flückiger) [#60105](https://github.com/nodejs/node/pull/60105)
- \[[`621058b3bf`](https://github.com/nodejs/node/commit/621058b3bf)] - **deps**: update archs files for openssl-3.5.4 (Node.js GitHub Bot) [#60101](https://github.com/nodejs/node/pull/60101)
- \[[`81b3009fe6`](https://github.com/nodejs/node/commit/81b3009fe6)] - **deps**: upgrade openssl sources to openssl-3.5.4 (Node.js GitHub Bot) [#60101](https://github.com/nodejs/node/pull/60101)
- \[[`dc44c9f349`](https://github.com/nodejs/node/commit/dc44c9f349)] - **deps**: upgrade npm to 11.6.1 (npm team) [#60012](https://github.com/nodejs/node/pull/60012)
- \[[`ec0f137198`](https://github.com/nodejs/node/commit/ec0f137198)] - **deps**: update ada to 3.3.0 (Node.js GitHub Bot) [#60045](https://github.com/nodejs/node/pull/60045)
- \[[`f490f91874`](https://github.com/nodejs/node/commit/f490f91874)] - **deps**: update amaro to 1.1.4 (pmarchini) [#60044](https://github.com/nodejs/node/pull/60044)
- \[[`de7a7cd0d7`](https://github.com/nodejs/node/commit/de7a7cd0d7)] - **deps**: update ada to 3.2.9 (Node.js GitHub Bot) [#59987](https://github.com/nodejs/node/pull/59987)
- \[[`a533e5b5db`](https://github.com/nodejs/node/commit/a533e5b5db)] - **doc**: add automated migration info to deprecations (Augustin Mauroy) [#60022](https://github.com/nodejs/node/pull/60022)
- \[[`7fb8fe4875`](https://github.com/nodejs/node/commit/7fb8fe4875)] - **doc**: fix typo on child_process.md (Angelo Gazzola) [#60114](https://github.com/nodejs/node/pull/60114)
- \[[`24c1ef9846`](https://github.com/nodejs/node/commit/24c1ef9846)] - **doc**: remove optional title prefixes (Aviv Keller) [#60087](https://github.com/nodejs/node/pull/60087)
- \[[`08b9eb8e19`](https://github.com/nodejs/node/commit/08b9eb8e19)] - **doc**: mark `.env` files support as stable (Santeri Hiltunen) [#59925](https://github.com/nodejs/node/pull/59925)
- \[[`66d90b8063`](https://github.com/nodejs/node/commit/66d90b8063)] - **doc**: mention reverse proxy and include simple example (Steven) [#59736](https://github.com/nodejs/node/pull/59736)
- \[[`14aa1119cb`](https://github.com/nodejs/node/commit/14aa1119cb)] - **doc**: provide alternative to `url.parse()` using WHATWG URL (Steven) [#59736](https://github.com/nodejs/node/pull/59736)
- \[[`f9412324f6`](https://github.com/nodejs/node/commit/f9412324f6)] - **doc**: fix typo of built-in module specifier in worker_threads (Deokjin Kim) [#59992](https://github.com/nodejs/node/pull/59992)
- \[[`64e738a342`](https://github.com/nodejs/node/commit/64e738a342)] - **doc,crypto**: reorder ML-KEM in the asymmetric key types table (Filip Skokan) [#60067](https://github.com/nodejs/node/pull/60067)
- \[[`1b25008b41`](https://github.com/nodejs/node/commit/1b25008b41)] - **http**: improve writeEarlyHints by avoiding for-of loop (Haram Jeong) [#59958](https://github.com/nodejs/node/pull/59958)
- \[[`35f9b6b28f`](https://github.com/nodejs/node/commit/35f9b6b28f)] - **inspector**: improve batch diagnostic channel subscriptions (Chengzhong Wu) [#60009](https://github.com/nodejs/node/pull/60009)
- \[[`3b92be2fb8`](https://github.com/nodejs/node/commit/3b92be2fb8)] - **(SEMVER-MINOR)** **lib**: remove util.getCallSite (Rafael Gonzaga) [#59980](https://github.com/nodejs/node/pull/59980)
- \[[`c495e1fe57`](https://github.com/nodejs/node/commit/c495e1fe57)] - **lib**: optimize priority queue (Gürgün Dayıoğlu) [#60039](https://github.com/nodejs/node/pull/60039)
- \[[`6be31fb9f3`](https://github.com/nodejs/node/commit/6be31fb9f3)] - **lib**: implement passive listener behavior per spec (BCD1me) [#59995](https://github.com/nodejs/node/pull/59995)
- \[[`c5e4aa763b`](https://github.com/nodejs/node/commit/c5e4aa763b)] - **meta**: bump actions/setup-python from 5.6.0 to 6.0.0 (dependabot\[bot]) [#60090](https://github.com/nodejs/node/pull/60090)
- \[[`50fa1f4a76`](https://github.com/nodejs/node/commit/50fa1f4a76)] - **meta**: bump ossf/scorecard-action from 2.4.2 to 2.4.3 (dependabot\[bot]) [#60096](https://github.com/nodejs/node/pull/60096)
- \[[`def4ce976c`](https://github.com/nodejs/node/commit/def4ce976c)] - **meta**: bump actions/cache from 4.2.4 to 4.3.0 (dependabot\[bot]) [#60095](https://github.com/nodejs/node/pull/60095)
- \[[`24b5abc0e9`](https://github.com/nodejs/node/commit/24b5abc0e9)] - **meta**: bump step-security/harden-runner from 2.12.2 to 2.13.1 (dependabot\[bot]) [#60094](https://github.com/nodejs/node/pull/60094)
- \[[`8ccf2b0b34`](https://github.com/nodejs/node/commit/8ccf2b0b34)] - **meta**: bump actions/setup-node from 4.4.0 to 5.0.0 (dependabot\[bot]) [#60093](https://github.com/nodejs/node/pull/60093)
- \[[`78580147ef`](https://github.com/nodejs/node/commit/78580147ef)] - **meta**: bump actions/stale from 9.1.0 to 10.0.0 (dependabot\[bot]) [#60092](https://github.com/nodejs/node/pull/60092)
- \[[`705686b5c4`](https://github.com/nodejs/node/commit/705686b5c4)] - **meta**: bump codecov/codecov-action from 5.5.0 to 5.5.1 (dependabot\[bot]) [#60091](https://github.com/nodejs/node/pull/60091)
- \[[`423a6bc744`](https://github.com/nodejs/node/commit/423a6bc744)] - **meta**: bump github/codeql-action from 3.30.0 to 3.30.5 (dependabot\[bot]) [#60089](https://github.com/nodejs/node/pull/60089)
- \[[`9d9bd0fb4f`](https://github.com/nodejs/node/commit/9d9bd0fb4f)] - **meta**: move Michael to emeritus (Michael Dawson) [#60070](https://github.com/nodejs/node/pull/60070)
- \[[`dbeee55824`](https://github.com/nodejs/node/commit/dbeee55824)] - **module**: use sync cjs when importing cts (Marco Ippolito) [#60072](https://github.com/nodejs/node/pull/60072)
- \[[`a722f677ac`](https://github.com/nodejs/node/commit/a722f677ac)] - **perf_hooks**: fix histogram fast call signatures (Renegade334) [#59600](https://github.com/nodejs/node/pull/59600)
- \[[`b3295b8353`](https://github.com/nodejs/node/commit/b3295b8353)] - **process**: fix wrong asyncContext under unhandled-rejections=strict (Shima Ryuhei) [#60103](https://github.com/nodejs/node/pull/60103)
- \[[`cff4a7608a`](https://github.com/nodejs/node/commit/cff4a7608a)] - **process**: fix default `env` for `process.execve` (Richard Lau) [#60029](https://github.com/nodejs/node/pull/60029)
- \[[`cd034e927f`](https://github.com/nodejs/node/commit/cd034e927f)] - **process**: fix hrtime fast call signatures (Renegade334) [#59600](https://github.com/nodejs/node/pull/59600)
- \[[`18c79d9e1c`](https://github.com/nodejs/node/commit/18c79d9e1c)] - **(SEMVER-MINOR)** **sqlite**: create authorization api (Guilherme Araújo) [#59928](https://github.com/nodejs/node/pull/59928)
- \[[`d949222043`](https://github.com/nodejs/node/commit/d949222043)] - **sqlite**: replace `ToLocalChecked` and improve filter error handling (Edy Silva) [#60028](https://github.com/nodejs/node/pull/60028)
- \[[`6417dc879e`](https://github.com/nodejs/node/commit/6417dc879e)] - **src**: bring permissions macros in line with general C/C++ standards (Anna Henningsen) [#60053](https://github.com/nodejs/node/pull/60053)
- \[[`e273c2020c`](https://github.com/nodejs/node/commit/e273c2020c)] - **src**: update contextify to use DictionaryTemplate (James M Snell) [#60059](https://github.com/nodejs/node/pull/60059)
- \[[`5f9ff60664`](https://github.com/nodejs/node/commit/5f9ff60664)] - **src**: remove `AnalyzeTemporaryDtors` option from .clang-tidy (iknoom) [#60008](https://github.com/nodejs/node/pull/60008)
- \[[`9db54adccc`](https://github.com/nodejs/node/commit/9db54adccc)] - **src**: update cares_wrap to use DictionaryTemplates (James M Snell) [#60033](https://github.com/nodejs/node/pull/60033)
- \[[`fc0ceb7b82`](https://github.com/nodejs/node/commit/fc0ceb7b82)] - **src**: correct the error handling in StatementExecutionHelper (James M Snell) [#60040](https://github.com/nodejs/node/pull/60040)
- \[[`3e8fdc1d8d`](https://github.com/nodejs/node/commit/3e8fdc1d8d)] - **src**: remove unused variables from report (Moonki Choi) [#60047](https://github.com/nodejs/node/pull/60047)
- \[[`d744324d8e`](https://github.com/nodejs/node/commit/d744324d8e)] - **src**: avoid unnecessary string allocations in SPrintF impl (Anna Henningsen) [#60052](https://github.com/nodejs/node/pull/60052)
- \[[`de65a5c719`](https://github.com/nodejs/node/commit/de65a5c719)] - **src**: make ToLower/ToUpper input args more flexible (Anna Henningsen) [#60052](https://github.com/nodejs/node/pull/60052)
- \[[`354026df5a`](https://github.com/nodejs/node/commit/354026df5a)] - **src**: allow `std::string_view` arguments to `SPrintF()` and friends (Anna Henningsen) [#60058](https://github.com/nodejs/node/pull/60058)
- \[[`42f7d7cb20`](https://github.com/nodejs/node/commit/42f7d7cb20)] - **src**: remove unnecessary `std::string` error messages (Anna Henningsen) [#60057](https://github.com/nodejs/node/pull/60057)
- \[[`30c2c0fedd`](https://github.com/nodejs/node/commit/30c2c0fedd)] - **src**: remove unnecessary shadowed functions on Utf8Value & BufferValue (Anna Henningsen) [#60056](https://github.com/nodejs/node/pull/60056)
- \[[`eb99eec09b`](https://github.com/nodejs/node/commit/eb99eec09b)] - **src**: avoid unnecessary string -> `char*` -> string round trips (Anna Henningsen) [#60055](https://github.com/nodejs/node/pull/60055)
- \[[`c1f1dbdce2`](https://github.com/nodejs/node/commit/c1f1dbdce2)] - **src**: remove useless dereferencing in `THROW_...` (Anna Henningsen) [#60054](https://github.com/nodejs/node/pull/60054)
- \[[`ea0f5e575d`](https://github.com/nodejs/node/commit/ea0f5e575d)] - **src**: fill `options_args`, `options_env` after vectors are finalized (iknoom) [#59945](https://github.com/nodejs/node/pull/59945)
- \[[`415fff217a`](https://github.com/nodejs/node/commit/415fff217a)] - **src**: use RAII for uv_process_options_t (iknoom) [#59945](https://github.com/nodejs/node/pull/59945)
- \[[`982b03ecbd`](https://github.com/nodejs/node/commit/982b03ecbd)] - **test**: mark `test-runner-run-watch` flaky on macOS (Richard Lau) [#60115](https://github.com/nodejs/node/pull/60115)
- \[[`831a0d3d28`](https://github.com/nodejs/node/commit/831a0d3d28)] - **test**: ensure that the message event is fired (Luigi Pinca) [#59952](https://github.com/nodejs/node/pull/59952)
- \[[`5538cfc1e8`](https://github.com/nodejs/node/commit/5538cfc1e8)] - **test**: replace diagnostics_channel stackframe in output snapshots (Chengzhong Wu) [#60024](https://github.com/nodejs/node/pull/60024)
- \[[`77ec400d90`](https://github.com/nodejs/node/commit/77ec400d90)] - **test**: mark test-web-locks skip on IBM i (SRAVANI GUNDEPALLI) [#59996](https://github.com/nodejs/node/pull/59996)
- \[[`1aaadb9e31`](https://github.com/nodejs/node/commit/1aaadb9e31)] - **test**: ensure message event fires in worker message port test (Jarred Sumner) [#59885](https://github.com/nodejs/node/pull/59885)
- \[[`1d5cc5e57a`](https://github.com/nodejs/node/commit/1d5cc5e57a)] - **test**: mark sea tests flaky on macOS x64 (Richard Lau) [#60068](https://github.com/nodejs/node/pull/60068)
- \[[`c412b1855d`](https://github.com/nodejs/node/commit/c412b1855d)] - **test**: expand tls-check-server-identity coverage (Diango Gavidia) [#60002](https://github.com/nodejs/node/pull/60002)
- \[[`ad87975029`](https://github.com/nodejs/node/commit/ad87975029)] - **test**: fix typo of test-benchmark-readline.js (Deokjin Kim) [#59993](https://github.com/nodejs/node/pull/59993)
- \[[`bad4b9b878`](https://github.com/nodejs/node/commit/bad4b9b878)] - **test**: add new `startNewREPLSever` testing utility (Dario Piotrowicz) [#59964](https://github.com/nodejs/node/pull/59964)
- \[[`ef90b0f456`](https://github.com/nodejs/node/commit/ef90b0f456)] - **test**: verify tracing channel doesn't swallow unhandledRejection (Gerhard Stöbich) [#59974](https://github.com/nodejs/node/pull/59974)
- \[[`d7285459fe`](https://github.com/nodejs/node/commit/d7285459fe)] - **timers**: fix binding fast call signatures (Renegade334) [#59600](https://github.com/nodejs/node/pull/59600)
- \[[`6529ae9b0c`](https://github.com/nodejs/node/commit/6529ae9b0c)] - **tools**: add message on auto-fixing js lint issues in gh workflow (Dario Piotrowicz) [#59128](https://github.com/nodejs/node/pull/59128)
- \[[`1ca116a6ea`](https://github.com/nodejs/node/commit/1ca116a6ea)] - **tools**: verify signatures when updating nghttp\* (Antoine du Hamel) [#60113](https://github.com/nodejs/node/pull/60113)
- \[[`20d10a2398`](https://github.com/nodejs/node/commit/20d10a2398)] - **tools**: use dependabot cooldown and move tools/doc (Rafael Gonzaga) [#59978](https://github.com/nodejs/node/pull/59978)
- \[[`275c07064c`](https://github.com/nodejs/node/commit/275c07064c)] - **typings**: update 'types' binding (René) [#59692](https://github.com/nodejs/node/pull/59692)
- \[[`8c21c4b286`](https://github.com/nodejs/node/commit/8c21c4b286)] - **wasi**: fix WasiFunction fast call signature (Renegade334) [#59600](https://github.com/nodejs/node/pull/59600)
- \[[`b865074641`](https://github.com/nodejs/node/commit/b865074641)] - **win,tools**: add description to signature (Martin Costello) [#59877](https://github.com/nodejs/node/pull/59877)

Windows 64-bit Installer: https://nodejs.org/dist/v24.10.0/node-v24.10.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.10.0/node-v24.10.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.10.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.10.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.10.0/node-v24.10.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.10.0/node-v24.10.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.10.0/node-v24.10.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.10.0/node-v24.10.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.10.0/node-v24.10.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.10.0/node-v24.10.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.10.0/node-v24.10.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.10.0/node-v24.10.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.10.0/node-v24.10.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.10.0/ \
Documentation: https://nodejs.org/docs/v24.10.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

daa6ea9f6add07922013215bac6712a2b1e29b12e00d9bf4ed45e85eebf5e8e2  node-v24.10.0-aix-ppc64.tar.gz
1d721c81deac26a511a1fde66d76be73d608be5d5320680828edd0176c686ae1  node-v24.10.0-arm64.msi
fbc3d6e1e1d962450d058e918214373872cc4c46e08673f31c35932afac4a8c5  node-v24.10.0-darwin-arm64.tar.gz
0ba4910a69a256798729d5a3a42539d0b72670c052b67519b5f79f246121084a  node-v24.10.0-darwin-arm64.tar.xz
627b884f66db0dd35f4b46fb9e994774ce560a7fb60798ba1ab81e867a73687d  node-v24.10.0-darwin-x64.tar.gz
4e2ff8e9148659052a6cad50c3b10e6f02af1298dfa9a8ee65e010044f05726f  node-v24.10.0-darwin-x64.tar.xz
fde04b7be93bea3cf20348eaa90c4c375a7b3a303d4838a149eb5d506aca1a67  node-v24.10.0-headers.tar.gz
913eb74f42805bb441b1f44e3c8e0b66993bbc925526890cac34d3660da5640f  node-v24.10.0-headers.tar.xz
42776dfc722991b1ac9f302f3d7b5cf989cf7aca519b479c50e59f0663803b73  node-v24.10.0-linux-arm64.tar.gz
07f0558316ebb8977dd6fb29b4de8d369a639d3d8cef544293852a6f5eea6af8  node-v24.10.0-linux-arm64.tar.xz
2e285ecbbb7a79b9b59a937796cc63458a283a664226467babb7430d2b69b26e  node-v24.10.0-linux-ppc64le.tar.gz
408134a922b3c963f8d3862cb8e1f279a3aff9ec655d8e34f0b8c22178443dca  node-v24.10.0-linux-ppc64le.tar.xz
2117ab6eca63d5caf90fb99c870c466419f0e0204ce588fa6622b77b6e3a24e7  node-v24.10.0-linux-s390x.tar.gz
1ed76ee88bd0d3a5a4638f257fc4183a07c4bdd46f765466093aa453fd67a681  node-v24.10.0-linux-s390x.tar.xz
2b03c5417ce0b1076780df00e01da373bead3b4b80d1c78c1ad10ee7b918d90c  node-v24.10.0-linux-x64.tar.gz
2642f4428869aca32443660fd71b3918e2be1277a899bdcaeb64c93b54b5af17  node-v24.10.0-linux-x64.tar.xz
eecfbb713407222f89d70e60dd92503705380c2406dfe195f29bd8455c46baa0  node-v24.10.0-win-arm64.7z
ff9d2c151dedba7f814d8a71038b0ff2063e838799c916f782c96c52592a2cd7  node-v24.10.0-win-arm64.zip
36b3dffd682813134698103842d52cdaf2d56ddedbf3a48e430812126a275f85  node-v24.10.0-win-x64.7z
adc1a2d5ca79c92e94f3a58c3ec0efa76bdb488769ba4d4b50990e4c84896060  node-v24.10.0-win-x64.zip
e9fc557209ae3d90c270891dfeca33b97243ef82b2822fbfe0bb40334f83ddd6  node-v24.10.0-x64.msi
895ead3781fc7d5c3404e4eb92dff4a908d27525e1a292d3d5d5f4a84f3d6889  node-v24.10.0.pkg
fb9aa1938aa8d7b53e437184e4c5b26823db0afb5ac1cbfe6559176531e900e6  node-v24.10.0.tar.gz
f17e36cb2cc8c34a9215ba57b55ce791b102e293432ed47ad63cbaf15f78678f  node-v24.10.0.tar.xz
a603c0618ef0ef5ddd5925c751666c0ba025ef5866dbed2a90856c6c2469e566  win-arm64/node.exe
fb036d418573ea032176a432dd14bc7d929c2a7d9f7a2d0d5239c2d9448a608e  win-arm64/node.lib
ab61db14e62db37a506a85b2d73d24abcead2c6bdfab9529c2475f145d50f706  win-arm64/node_pdb.7z
9b5bb1282a34ef8565ad46fcd05cd170258674481b6f02512b2bc92249a06377  win-arm64/node_pdb.zip
93d6b1a22733fb035b19649041c0574b1a890df75ebce9d5e6e1bbe35d12b4a8  win-x64/node.exe
05f6163d27cfc385e7d39fdf2e4d0950e6e56b5f85da5df9f201ecd7e3d2b69a  win-x64/node.lib
545222eff61deb0e1bef394ce7d9c4718d96402837bf13619e4c376d4084741d  win-x64/node_pdb.7z
2d6de6d1d1bbab20f76d7f65060bfe23165dc6f7cf71e7ea9a378cd6d5dadaf0  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmjqgs4ACgkQi+q0389V
XvQucwv8CoaeI79ct9Gxj4vvg2SQKYT1ad6cRynbY4Uhi0z8wBfw7jrfy28UFYJS
X+R+9Qp4ITwaSK0Ut8+IMAs6lgCSctRj8ymyDNy0v9YxwYw0XC34L2vwdEOLSaRF
InoVJlQYp5JXfku0pv3tNFu3GYh+7GqKm+ICfxywzaTL9PbvO3asYI4Q1QX6IrjY
Gq35sA+Op/aY1CWFCus/oZTvOvPQQW4hbang2Ei0zOUXz7mvGDA73frnvdhCF8qz
Vnh1eDk+FZuKT+OeWeRV1iP0RCut1THnZrEpw9pQaj70doWFLzFRbyObj2aL8KUK
3eSP7AVx1qB+Fs6iw6bvC1Upsfh4HtT8w53cXfelhphCkoc8WRSoSenm3aR1Ew69
wRLw8Q17rMXdZZQzTZh2Wf/vIq7o7O5wB3rISOE0aMU6uPwvaKP9wuHOsXlXq7Zp
BAHhJ76729yMWPj+Daeod0B4SPW2NQ8Rv38Pgk2S3+0N/ZjWkRgFA4gHG/Q+F5aP
U0EqNQ+X
=TVAk
-----END PGP SIGNATURE-----
```
