---
date: '2025-10-20T23:51:44.415Z'
category: release
title: Node.js v22.21.0 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-10-20, Version 22.21.0 'Jod' (LTS), @aduh95

### Notable Changes

- \[[`1486fedea1`](https://github.com/nodejs/node/commit/1486fedea1)] - **(SEMVER-MINOR)** **cli**: add `--use-env-proxy` (Joyee Cheung) [#59151](https://github.com/nodejs/node/pull/59151)
- \[[`bedaaa11fc`](https://github.com/nodejs/node/commit/bedaaa11fc)] - **(SEMVER-MINOR)** **http**: support http proxy for fetch under `NODE_USE_ENV_PROXY` (Joyee Cheung) [#57165](https://github.com/nodejs/node/pull/57165)
- \[[`af8b5fa29d`](https://github.com/nodejs/node/commit/af8b5fa29d)] - **(SEMVER-MINOR)** **http**: add `shouldUpgradeCallback` to let servers control HTTP upgrades (Tim Perry) [#59824](https://github.com/nodejs/node/pull/59824)
- \[[`42102594b1`](https://github.com/nodejs/node/commit/42102594b1)] - **(SEMVER-MINOR)** **http,https**: add built-in proxy support in `http`/`https.request` and `Agent` (Joyee Cheung) [#58980](https://github.com/nodejs/node/pull/58980)
- \[[`686ac49b82`](https://github.com/nodejs/node/commit/686ac49b82)] - **(SEMVER-MINOR)** **src**: add percentage support to `--max-old-space-size` (Asaf Federman) [#59082](https://github.com/nodejs/node/pull/59082)

### Commits

- \[[`a71dd592e3`](https://github.com/nodejs/node/commit/a71dd592e3)] - **benchmark**: calibrate config dgram multi-buffer (Bruno Rodrigues) [#59696](https://github.com/nodejs/node/pull/59696)
- \[[`16c4b466f4`](https://github.com/nodejs/node/commit/16c4b466f4)] - **benchmark**: calibrate config cluster/echo.js (Nam Yooseong) [#59836](https://github.com/nodejs/node/pull/59836)
- \[[`53cb9f3b6c`](https://github.com/nodejs/node/commit/53cb9f3b6c)] - **build**: add the missing macro definitions for OpenHarmony (hqzing) [#59804](https://github.com/nodejs/node/pull/59804)
- \[[`ec5290fe01`](https://github.com/nodejs/node/commit/ec5290fe01)] - **build**: do not include custom ESLint rules testing in tarball (Antoine du Hamel) [#59809](https://github.com/nodejs/node/pull/59809)
- \[[`1486fedea1`](https://github.com/nodejs/node/commit/1486fedea1)] - **(SEMVER-MINOR)** **cli**: add --use-env-proxy (Joyee Cheung) [#59151](https://github.com/nodejs/node/pull/59151)
- \[[`1f93913446`](https://github.com/nodejs/node/commit/1f93913446)] - **crypto**: use `return await` when returning Promises from async functions (Renegade334) [#59841](https://github.com/nodejs/node/pull/59841)
- \[[`f488b2ff73`](https://github.com/nodejs/node/commit/f488b2ff73)] - **crypto**: use async functions for non-stub Promise-returning functions (Renegade334) [#59841](https://github.com/nodejs/node/pull/59841)
- \[[`aed9fd5ac4`](https://github.com/nodejs/node/commit/aed9fd5ac4)] - **crypto**: avoid calls to `promise.catch()` (Renegade334) [#59841](https://github.com/nodejs/node/pull/59841)
- \[[`37c2d186f0`](https://github.com/nodejs/node/commit/37c2d186f0)] - **deps**: update amaro to 1.1.4 (pmarchini) [#60044](https://github.com/nodejs/node/pull/60044)
- \[[`28aea13419`](https://github.com/nodejs/node/commit/28aea13419)] - **deps**: update archs files for openssl-3.5.4 (Node.js GitHub Bot) [#60101](https://github.com/nodejs/node/pull/60101)
- \[[`ddbc1aa0bb`](https://github.com/nodejs/node/commit/ddbc1aa0bb)] - **deps**: upgrade openssl sources to openssl-3.5.4 (Node.js GitHub Bot) [#60101](https://github.com/nodejs/node/pull/60101)
- \[[`badbba2da9`](https://github.com/nodejs/node/commit/badbba2da9)] - **deps**: update googletest to 50b8600 (Node.js GitHub Bot) [#59955](https://github.com/nodejs/node/pull/59955)
- \[[`48aaf98a08`](https://github.com/nodejs/node/commit/48aaf98a08)] - **deps**: update archs files for openssl-3.5.3 (Node.js GitHub Bot) [#59901](https://github.com/nodejs/node/pull/59901)
- \[[`e02a562ea6`](https://github.com/nodejs/node/commit/e02a562ea6)] - **deps**: upgrade openssl sources to openssl-3.5.3 (Node.js GitHub Bot) [#59901](https://github.com/nodejs/node/pull/59901)
- \[[`7e0e86cb92`](https://github.com/nodejs/node/commit/7e0e86cb92)] - **deps**: upgrade npm to 10.9.4 (npm team) [#60074](https://github.com/nodejs/node/pull/60074)
- \[[`91dda5facf`](https://github.com/nodejs/node/commit/91dda5facf)] - **deps**: update undici to 6.22.0 (Matteo Collina) [#60112](https://github.com/nodejs/node/pull/60112)
- \[[`3a3220a2f0`](https://github.com/nodejs/node/commit/3a3220a2f0)] - **dgram**: restore buffer optimization in fixBufferList (Yoo) [#59934](https://github.com/nodejs/node/pull/59934)
- \[[`09bdcce6b8`](https://github.com/nodejs/node/commit/09bdcce6b8)] - **diagnostics_channel**: fix race condition with diagnostics_channel and GC (Ugaitz Urien) [#59910](https://github.com/nodejs/node/pull/59910)
- \[[`b3eeb3bd13`](https://github.com/nodejs/node/commit/b3eeb3bd13)] - **doc**: provide alternative to `url.parse()` using WHATWG URL (Steven) [#59736](https://github.com/nodejs/node/pull/59736)
- \[[`1ddaab1904`](https://github.com/nodejs/node/commit/1ddaab1904)] - **doc**: mention reverse proxy and include simple example (Steven) [#59736](https://github.com/nodejs/node/pull/59736)
- \[[`3b3b71e99c`](https://github.com/nodejs/node/commit/3b3b71e99c)] - **doc**: mark `.env` files support as stable (Santeri Hiltunen) [#59925](https://github.com/nodejs/node/pull/59925)
- \[[`d37f67d1bd`](https://github.com/nodejs/node/commit/d37f67d1bd)] - **doc**: remove optional title prefixes (Aviv Keller) [#60087](https://github.com/nodejs/node/pull/60087)
- \[[`ca2dff63f9`](https://github.com/nodejs/node/commit/ca2dff63f9)] - **doc**: fix typo on child_process.md (Angelo Gazzola) [#60114](https://github.com/nodejs/node/pull/60114)
- \[[`3fca564a05`](https://github.com/nodejs/node/commit/3fca564a05)] - **doc**: add automated migration info to deprecations (Augustin Mauroy) [#60022](https://github.com/nodejs/node/pull/60022)
- \[[`4bc366fc16`](https://github.com/nodejs/node/commit/4bc366fc16)] - **doc**: use "WebAssembly" instead of "Web Assembly" (Tobias Nießen) [#59954](https://github.com/nodejs/node/pull/59954)
- \[[`4808dbdd9a`](https://github.com/nodejs/node/commit/4808dbdd9a)] - **doc**: fix typo in section on microtask order (Tobias Nießen) [#59932](https://github.com/nodejs/node/pull/59932)
- \[[`d6e303d645`](https://github.com/nodejs/node/commit/d6e303d645)] - **doc**: update V8 fast API guidance (René) [#58999](https://github.com/nodejs/node/pull/58999)
- \[[`0a3a3f729e`](https://github.com/nodejs/node/commit/0a3a3f729e)] - **doc**: add security escalation policy (Ulises Gascón) [#59806](https://github.com/nodejs/node/pull/59806)
- \[[`8fd669c70d`](https://github.com/nodejs/node/commit/8fd669c70d)] - **doc**: type improvement of file `http.md` (yusheng chen) [#58189](https://github.com/nodejs/node/pull/58189)
- \[[`9833dc6060`](https://github.com/nodejs/node/commit/9833dc6060)] - **doc**: rephrase dynamic import() description (Nam Yooseong) [#59224](https://github.com/nodejs/node/pull/59224)
- \[[`2870a73681`](https://github.com/nodejs/node/commit/2870a73681)] - **doc,crypto**: update subtle.generateKey and subtle.importKey (Filip Skokan) [#59851](https://github.com/nodejs/node/pull/59851)
- \[[`85818db93c`](https://github.com/nodejs/node/commit/85818db93c)] - **fs,win**: do not add a second trailing slash in readdir (Gerhard Stöbich) [#59847](https://github.com/nodejs/node/pull/59847)
- \[[`bedaaa11fc`](https://github.com/nodejs/node/commit/bedaaa11fc)] - **(SEMVER-MINOR)** **http**: support http proxy for fetch under NODE_USE_ENV_PROXY (Joyee Cheung) [#57165](https://github.com/nodejs/node/pull/57165)
- \[[`af8b5fa29d`](https://github.com/nodejs/node/commit/af8b5fa29d)] - **(SEMVER-MINOR)** **http**: add shouldUpgradeCallback to let servers control HTTP upgrades (Tim Perry) [#59824](https://github.com/nodejs/node/pull/59824)
- \[[`758271ae66`](https://github.com/nodejs/node/commit/758271ae66)] - **http**: optimize checkIsHttpToken for short strings (방진혁) [#59832](https://github.com/nodejs/node/pull/59832)
- \[[`42102594b1`](https://github.com/nodejs/node/commit/42102594b1)] - **(SEMVER-MINOR)** **http,https**: add built-in proxy support in http/https.request and Agent (Joyee Cheung) [#58980](https://github.com/nodejs/node/pull/58980)
- \[[`a33ed9bf96`](https://github.com/nodejs/node/commit/a33ed9bf96)] - **inspector**: ensure adequate memory allocation for `Binary::toBase64` (René) [#59870](https://github.com/nodejs/node/pull/59870)
- \[[`34c686be2b`](https://github.com/nodejs/node/commit/34c686be2b)] - **lib**: update inspect output format for subclasses (Miguel Marcondes Filho) [#59687](https://github.com/nodejs/node/pull/59687)
- \[[`12e553529c`](https://github.com/nodejs/node/commit/12e553529c)] - **lib**: add source map support for assert messages (Chengzhong Wu) [#59751](https://github.com/nodejs/node/pull/59751)
- \[[`d2a70571f8`](https://github.com/nodejs/node/commit/d2a70571f8)] - **lib,src**: refactor assert to load error source from memory (Chengzhong Wu) [#59751](https://github.com/nodejs/node/pull/59751)
- \[[`20a9e86b5d`](https://github.com/nodejs/node/commit/20a9e86b5d)] - **meta**: move Michael to emeritus (Michael Dawson) [#60070](https://github.com/nodejs/node/pull/60070)
- \[[`c591cca15c`](https://github.com/nodejs/node/commit/c591cca15c)] - **meta**: bump github/codeql-action from 3.30.0 to 3.30.5 (dependabot\[bot]) [#60089](https://github.com/nodejs/node/pull/60089)
- \[[`090ba141b1`](https://github.com/nodejs/node/commit/090ba141b1)] - **meta**: bump codecov/codecov-action from 5.5.0 to 5.5.1 (dependabot\[bot]) [#60091](https://github.com/nodejs/node/pull/60091)
- \[[`a0ba6884a5`](https://github.com/nodejs/node/commit/a0ba6884a5)] - **meta**: bump actions/stale from 9.1.0 to 10.0.0 (dependabot\[bot]) [#60092](https://github.com/nodejs/node/pull/60092)
- \[[`0feca0c541`](https://github.com/nodejs/node/commit/0feca0c541)] - **meta**: bump actions/setup-node from 4.4.0 to 5.0.0 (dependabot\[bot]) [#60093](https://github.com/nodejs/node/pull/60093)
- \[[`7cd2b42d18`](https://github.com/nodejs/node/commit/7cd2b42d18)] - **meta**: bump step-security/harden-runner from 2.12.2 to 2.13.1 (dependabot\[bot]) [#60094](https://github.com/nodejs/node/pull/60094)
- \[[`1f3b9d66ac`](https://github.com/nodejs/node/commit/1f3b9d66ac)] - **meta**: bump actions/cache from 4.2.4 to 4.3.0 (dependabot\[bot]) [#60095](https://github.com/nodejs/node/pull/60095)
- \[[`0fedbb3de7`](https://github.com/nodejs/node/commit/0fedbb3de7)] - **meta**: bump ossf/scorecard-action from 2.4.2 to 2.4.3 (dependabot\[bot]) [#60096](https://github.com/nodejs/node/pull/60096)
- \[[`04590b8267`](https://github.com/nodejs/node/commit/04590b8267)] - **meta**: bump actions/setup-python from 5.6.0 to 6.0.0 (dependabot\[bot]) [#60090](https://github.com/nodejs/node/pull/60090)
- \[[`2bf0a9318f`](https://github.com/nodejs/node/commit/2bf0a9318f)] - **meta**: add .npmrc with ignore-scripts=true (Joyee Cheung) [#59914](https://github.com/nodejs/node/pull/59914)
- \[[`e10dc7b81c`](https://github.com/nodejs/node/commit/e10dc7b81c)] - **module**: allow overriding linked requests for a ModuleWrap (Chengzhong Wu) [#59527](https://github.com/nodejs/node/pull/59527)
- \[[`2237142369`](https://github.com/nodejs/node/commit/2237142369)] - **module**: link module with a module request record (Chengzhong Wu) [#58886](https://github.com/nodejs/node/pull/58886)
- \[[`6d24b88fbc`](https://github.com/nodejs/node/commit/6d24b88fbc)] - **node-api**: added SharedArrayBuffer api (Mert Can Altin) [#59071](https://github.com/nodejs/node/pull/59071)
- \[[`4cc84c96f4`](https://github.com/nodejs/node/commit/4cc84c96f4)] - **node-api**: make napi_delete_reference use node_api_basic_env (Jeetu Suthar) [#59684](https://github.com/nodejs/node/pull/59684)
- \[[`e790eb6b50`](https://github.com/nodejs/node/commit/e790eb6b50)] - **repl**: fix cpu overhead pasting big strings to the REPL (Ruben Bridgewater) [#59857](https://github.com/nodejs/node/pull/59857)
- \[[`99ea08dc43`](https://github.com/nodejs/node/commit/99ea08dc43)] - **repl**: add isValidParentheses check before wrap input (Xuguang Mei) [#59607](https://github.com/nodejs/node/pull/59607)
- \[[`e4a4f63019`](https://github.com/nodejs/node/commit/e4a4f63019)] - **sqlite**: fix crash session extension callbacks with workers (Bart Louwers) [#59848](https://github.com/nodejs/node/pull/59848)
- \[[`42c5544b97`](https://github.com/nodejs/node/commit/42c5544b97)] - **src**: assert memory calc for max-old-space-size-percentage (Asaf Federman) [#59460](https://github.com/nodejs/node/pull/59460)
- \[[`686ac49b82`](https://github.com/nodejs/node/commit/686ac49b82)] - **(SEMVER-MINOR)** **src**: add percentage support to --max-old-space-size (Asaf Federman) [#59082](https://github.com/nodejs/node/pull/59082)
- \[[`84701ff668`](https://github.com/nodejs/node/commit/84701ff668)] - **src**: clear all linked module caches once instantiated (Chengzhong Wu) [#59117](https://github.com/nodejs/node/pull/59117)
- \[[`8e182e561f`](https://github.com/nodejs/node/commit/8e182e561f)] - **src**: remove unnecessary `Environment::GetCurrent()` calls (Moonki Choi) [#59814](https://github.com/nodejs/node/pull/59814)
- \[[`c9cde35c4d`](https://github.com/nodejs/node/commit/c9cde35c4d)] - **src**: simplify is_callable by making it a concept (Tobias Nießen) [#58169](https://github.com/nodejs/node/pull/58169)
- \[[`892b425ee1`](https://github.com/nodejs/node/commit/892b425ee1)] - **src**: rename private fields to follow naming convention (Moonki Choi) [#59923](https://github.com/nodejs/node/pull/59923)
- \[[`36b68db7f5`](https://github.com/nodejs/node/commit/36b68db7f5)] - **src**: reduce the nearest parent package JSON cache size (Michael Smith) [#59888](https://github.com/nodejs/node/pull/59888)
- \[[`26b40bad02`](https://github.com/nodejs/node/commit/26b40bad02)] - **src**: replace FIXED_ONE_BYTE_STRING with Environment-cached strings (Moonki Choi) [#59891](https://github.com/nodejs/node/pull/59891)
- \[[`34dcb7dc32`](https://github.com/nodejs/node/commit/34dcb7dc32)] - **src**: create strings in `FIXED_ONE_BYTE_STRING` as internalized (Anna Henningsen) [#59826](https://github.com/nodejs/node/pull/59826)
- \[[`4d748add05`](https://github.com/nodejs/node/commit/4d748add05)] - **src**: remove `std::array` overload of `FIXED_ONE_BYTE_STRING` (Anna Henningsen) [#59826](https://github.com/nodejs/node/pull/59826)
- \[[`bb6fd7c2d1`](https://github.com/nodejs/node/commit/bb6fd7c2d1)] - **src**: ensure `v8::Eternal` is empty before setting it (Anna Henningsen) [#59825](https://github.com/nodejs/node/pull/59825)
- \[[`7a91282bf9`](https://github.com/nodejs/node/commit/7a91282bf9)] - **src**: use simdjson::pad (0hm☘️) [#59391](https://github.com/nodejs/node/pull/59391)
- \[[`ba00875f01`](https://github.com/nodejs/node/commit/ba00875f01)] - **stream**: use new AsyncResource instead of bind (Matteo Collina) [#59867](https://github.com/nodejs/node/pull/59867)
- \[[`ebec3ef68b`](https://github.com/nodejs/node/commit/ebec3ef68b)] - **(SEMVER-MINOR)** **test**: move http proxy tests to test/client-proxy (Joyee Cheung) [#58980](https://github.com/nodejs/node/pull/58980)
- \[[`7067d79fb3`](https://github.com/nodejs/node/commit/7067d79fb3)] - **test**: mark sea tests flaky on macOS x64 (Richard Lau) [#60068](https://github.com/nodejs/node/pull/60068)
- \[[`ca1942c9d5`](https://github.com/nodejs/node/commit/ca1942c9d5)] - **test**: testcase demonstrating issue 59541 (Eric Rannaud) [#59801](https://github.com/nodejs/node/pull/59801)
- \[[`660d57355e`](https://github.com/nodejs/node/commit/660d57355e)] - **test,doc**: skip --max-old-space-size-percentage on 32-bit platforms (Asaf Federman) [#60144](https://github.com/nodejs/node/pull/60144)
- \[[`19a7b1ef26`](https://github.com/nodejs/node/commit/19a7b1ef26)] - **tls**: load bundled and extra certificates off-thread (Joyee Cheung) [#59856](https://github.com/nodejs/node/pull/59856)
- \[[`095e7a81fc`](https://github.com/nodejs/node/commit/095e7a81fc)] - **tls**: only do off-thread certificate loading on loading tls (Joyee Cheung) [#59856](https://github.com/nodejs/node/pull/59856)
- \[[`c42c1204c7`](https://github.com/nodejs/node/commit/c42c1204c7)] - **tools**: fix `tools/make-v8.sh` for clang (Richard Lau) [#59893](https://github.com/nodejs/node/pull/59893)
- \[[`b632a1d98d`](https://github.com/nodejs/node/commit/b632a1d98d)] - **tools**: skip test-internet workflow for draft PRs (Michaël Zasso) [#59817](https://github.com/nodejs/node/pull/59817)
- \[[`6021c3ac76`](https://github.com/nodejs/node/commit/6021c3ac76)] - **tools**: copyedit `build-tarball.yml` (Antoine du Hamel) [#59808](https://github.com/nodejs/node/pull/59808)
- \[[`ef005d0c9b`](https://github.com/nodejs/node/commit/ef005d0c9b)] - **typings**: update 'types' binding (René) [#59692](https://github.com/nodejs/node/pull/59692)
- \[[`28ef564ecd`](https://github.com/nodejs/node/commit/28ef564ecd)] - **typings**: remove unused imports (Nam Yooseong) [#59880](https://github.com/nodejs/node/pull/59880)
- \[[`f88752ddb6`](https://github.com/nodejs/node/commit/f88752ddb6)] - **url**: replaced slice with at (Mikhail) [#59181](https://github.com/nodejs/node/pull/59181)
- \[[`24c224960c`](https://github.com/nodejs/node/commit/24c224960c)] - **url**: add type checking to urlToHttpOptions() (simon-id) [#59753](https://github.com/nodejs/node/pull/59753)
- \[[`f2fbcc576d`](https://github.com/nodejs/node/commit/f2fbcc576d)] - **util**: fix debuglog.enabled not being present with callback logger (Ruben Bridgewater) [#59858](https://github.com/nodejs/node/pull/59858)
- \[[`6277058e43`](https://github.com/nodejs/node/commit/6277058e43)] - **vm**: sync-ify SourceTextModule linkage (Chengzhong Wu) [#59000](https://github.com/nodejs/node/pull/59000)
- \[[`5bf21a4309`](https://github.com/nodejs/node/commit/5bf21a4309)] - **vm**: explain how to share promises between contexts w/ afterEvaluate (Eric Rannaud) [#59801](https://github.com/nodejs/node/pull/59801)
- \[[`312b33a083`](https://github.com/nodejs/node/commit/312b33a083)] - **vm**: "afterEvaluate", evaluate() return a promise from the outer context (Eric Rannaud) [#59801](https://github.com/nodejs/node/pull/59801)
- \[[`1eadab863c`](https://github.com/nodejs/node/commit/1eadab863c)] - **win,tools**: add description to signature (Martin Costello) [#59877](https://github.com/nodejs/node/pull/59877)
- \[[`816e1befb1`](https://github.com/nodejs/node/commit/816e1befb1)] - **zlib**: reduce code duplication (jhofstee) [#57810](https://github.com/nodejs/node/pull/57810)

Windows 32-bit Installer: https://nodejs.org/dist/v22.21.0/node-v22.21.0-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.21.0/node-v22.21.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.21.0/node-v22.21.0-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.21.0/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.21.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.21.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.21.0/node-v22.21.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.21.0/node-v22.21.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.21.0/node-v22.21.0.tar.gz \
Other release files: https://nodejs.org/dist/v22.21.0/ \
Documentation: https://nodejs.org/docs/v22.21.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

8846bd37a71df4c581724c6435566de4b10d7f52ce9e3d848a7892a59c7d3a45  node-v22.21.0-aix-ppc64.tar.gz
9c6fa46ea627ba51561c4912494e496b0423629633bba57cfc42634ebaa42f9f  node-v22.21.0-arm64.msi
dbc1a17024a32827adb23b5b11ce98cefcd783145a30fe41bb2845be711e9742  node-v22.21.0-darwin-arm64.tar.gz
54b884588727c9833cad6e4b902f922128b8da136ba845e76e878b0d2d08c8f4  node-v22.21.0-darwin-arm64.tar.xz
756674542a28207515cdd22ca290e53a9c1fb7b903603047278d339164eb376f  node-v22.21.0-darwin-x64.tar.gz
8c61b1ab7b3a398717b3503fbd205d239079cac22402ee9327f4d3a240622d86  node-v22.21.0-darwin-x64.tar.xz
c89657f56c6cd89ae54e043dfe4a229f201267fd7f2547750dc76041acf5b578  node-v22.21.0-headers.tar.gz
bc20d7d09bc6ba807757b2a1c76523473ac88c1922523616b7fbf1ca154c60fa  node-v22.21.0-headers.tar.xz
5180e74f2cdea6142548bd827249da32c0e86ba2581d6241e2f2761f957b9ed1  node-v22.21.0-linux-arm64.tar.gz
fe3e371f6f72d07a3f75a94a54c97d652ace6bfcc48f82cc0867f0c0722b84bd  node-v22.21.0-linux-arm64.tar.xz
9bab62621d1d5f704d6e365be7804233d03851698aaaf554fe726aa02f59d8e4  node-v22.21.0-linux-armv7l.tar.gz
800d87999f4b7592ea3a780e6b5ec1f3ab41566b1031f15bbbbc03fef4f402f0  node-v22.21.0-linux-armv7l.tar.xz
b20b26276ad8f95c739db7e391e17be578905ecb4ea12274624ed513d2317d7e  node-v22.21.0-linux-ppc64le.tar.gz
7faab4f786f79c886555d86520502db68df0c1a0fae47a8cf9237e4bac505a4e  node-v22.21.0-linux-ppc64le.tar.xz
5291d90caec80f796b50666fc9a81b01c2db04e491555a9243091af0080a9c52  node-v22.21.0-linux-s390x.tar.gz
18110873863cc2f56eacb20f8da59adc3b53f5a7070f7d97501bd3d00003d236  node-v22.21.0-linux-s390x.tar.xz
262b84b02f7e2bc017d4bdb81fec85ca0d6190a5cd0781d2d6e84317c08871f8  node-v22.21.0-linux-x64.tar.gz
71a04f4b9144870c9407b8019fe912514229e50246bc706862eded3ac8e9025d  node-v22.21.0-linux-x64.tar.xz
3fce2daac6b36f6343d79ef72590b46ada5b22df3538e45e46c521c531f3f205  node-v22.21.0-win-arm64.7z
6b44ae79925840ac80d91c3115f9f78ad24ea34f85807db85bcdb7d37f28e07b  node-v22.21.0-win-arm64.zip
31a82a950fd2524651f0409307afe3276ae68a13a131e8b72945a3931109c8c3  node-v22.21.0-win-x64.7z
84d31df6571c3c7156707265bf51e2a021656fa1584bf6f4486b792dcde54d7d  node-v22.21.0-win-x64.zip
d2767e24741f915477002d6325dda40f7554ce9e5176c8d2e824dc127d273725  node-v22.21.0-win-x86.7z
eba103ab3fa3d1ad5158bf9ad38f81d2e7cc5d6d78e06b68f017cf696016025e  node-v22.21.0-win-x86.zip
78da2f62c917bdc931fb3518f3f10c0c1e74b5305d0a85a8d308e081c2af3038  node-v22.21.0-x64.msi
183ed7bddfda69c71d9381f33f368da983ddab6ee357f2324774d0a429c311df  node-v22.21.0-x86.msi
bfc3d8bf34b47f79044ca0227b0c2b130ed6633a677d18d806ff71e1824d1f78  node-v22.21.0.pkg
3ada9d465cd6557b7b0ccea5f785278931a2a319bc941f68b2e742c6883f18ad  node-v22.21.0.tar.gz
791b18e969ea22cc952108ee8eaafbb12cddfd973bbbb0b7fc116395c0d9a81c  node-v22.21.0.tar.xz
17f35e7c7ed8626c6b9def40f57f8ae74ff6ff2e5788ca4bb0577d3e07d71bcc  win-arm64/node.exe
9265150c60463c2c524b7475f8a1f70943dcc05a735f3110ee50446ed4fff965  win-arm64/node.lib
1295f96e2762c7ca4544b8dba9d768176656c67a0763a012e6d6251fb79f036b  win-arm64/node_pdb.7z
d50f2ddba93b9b874dc9ce2de519850b5e12a754deb31b903dcf139337c68822  win-arm64/node_pdb.zip
47cd67453da180a39cdf5daedb89862667b8e627e60c116607874633450cd30d  win-x64/node.exe
aa0ec2c0281c18a5a4753b2d7f4fec0e2ba0b004be1f61b3bb9feb15e544a968  win-x64/node.lib
ef6674c5480935e0471cac80d3897eceba38c71c1e42323b4a189078b7fd780f  win-x64/node_pdb.7z
14b8d6cbfe1b29a2cfabf459d6f07a5cdc6855abde875ee67f64fa777eea72d8  win-x64/node_pdb.zip
9a6cf3570b09b744bf675d0ea984ecb0ca3f92931d40f17ee423e142df4d3c5e  win-x86/node.exe
2428b7ac2df89e23fcc5d5d0d1b4c2baf4ff515575fe7fa5d7dd0575673fcd64  win-x86/node.lib
6aa8de167074d2352a4ee93924122f3d6be512ff0a398c26456fec15c30e0c29  win-x86/node_pdb.7z
9f5d0ac4c678ecc4236479875a9ee84abedafea16878ffbdd4fd7bb62329bc8a  win-x86/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaPbKwQAKCRAgsaOQsWjT
VhjhAQDdE2iAOd/4UtnGF6Iwr//TT8O1Zv4auzvTGZMZUSKAHgD+PaU6k1BDxVZG
kRtCBKy6BpYYW7+sC/6H8vLx6YQq4Qw=
=mFMf
-----END PGP SIGNATURE-----
```
