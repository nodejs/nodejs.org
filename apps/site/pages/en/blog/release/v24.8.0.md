---
date: '2025-09-10T19:42:41.437Z'
category: release
title: Node.js v24.8.0 (Current)
layout: blog-post
author: Michaël Zasso
---

## 2025-09-10, Version 24.8.0 (Current), @targos

### Notable Changes

#### HTTP/2 Network Inspection Support in Node.js

Node.js now supports inspection of HTTP/2 network calls in Chrome DevTools for Node.js.

##### Usage

Write a `test.js` script that makes HTTP/2 requests.

```js
const http2 = require('node:http2');

const client = http2.connect('https://nghttp2.org');

const req = client.request([':path', '/', ':method', 'GET']);
```

Run it with these options:

```bash
node --inspect-wait --experimental-network-inspection test.js
```

Open `about:inspect` on Google Chrome and click on `Open dedicated DevTools for Node`.
The `Network` tab will let you track your HTTP/2 calls.

Contributed by Darshan Sen in [#59611](https://github.com/nodejs/node/pull/59611).

#### Other Notable Changes

- \[[`7a8e2c251d`](https://github.com/nodejs/node/commit/7a8e2c251d)] - **(SEMVER-MINOR)** **crypto**: support Ed448 and ML-DSA context parameter in node:crypto (Filip Skokan) [#59570](https://github.com/nodejs/node/pull/59570)
- \[[`4b631be0b0`](https://github.com/nodejs/node/commit/4b631be0b0)] - **(SEMVER-MINOR)** **crypto**: support Ed448 and ML-DSA context parameter in Web Cryptography (Filip Skokan) [#59570](https://github.com/nodejs/node/pull/59570)
- \[[`3e4b1e732c`](https://github.com/nodejs/node/commit/3e4b1e732c)] - **(SEMVER-MINOR)** **crypto**: add KMAC Web Cryptography algorithms (Filip Skokan) [#59647](https://github.com/nodejs/node/pull/59647)
- \[[`b1d28785b2`](https://github.com/nodejs/node/commit/b1d28785b2)] - **(SEMVER-MINOR)** **crypto**: add Argon2 Web Cryptography algorithms (Filip Skokan) [#59544](https://github.com/nodejs/node/pull/59544)
- \[[`430691d1af`](https://github.com/nodejs/node/commit/430691d1af)] - **(SEMVER-MINOR)** **crypto**: support SLH-DSA KeyObject, sign, and verify (Filip Skokan) [#59537](https://github.com/nodejs/node/pull/59537)
- \[[`d6d05ba397`](https://github.com/nodejs/node/commit/d6d05ba397)] - **(SEMVER-MINOR)** **worker**: add cpu profile APIs for worker (theanarkh) [#59428](https://github.com/nodejs/node/pull/59428)

### Commits

- \[[`d913872369`](https://github.com/nodejs/node/commit/d913872369)] - **assert**: cap input size in myersDiff to avoid Int32Array overflow (Haram Jeong) [#59578](https://github.com/nodejs/node/pull/59578)
- \[[`7bbbcf6666`](https://github.com/nodejs/node/commit/7bbbcf6666)] - **benchmark**: sqlite prevent create both tables on prepare selects (Bruno Rodrigues) [#59709](https://github.com/nodejs/node/pull/59709)
- \[[`44d7b92271`](https://github.com/nodejs/node/commit/44d7b92271)] - **benchmark**: calibrate config array-vs-concat (Rafael Gonzaga) [#59587](https://github.com/nodejs/node/pull/59587)
- \[[`7f347fc551`](https://github.com/nodejs/node/commit/7f347fc551)] - **build**: fix getting OpenSSL version on Windows (Michaël Zasso) [#59609](https://github.com/nodejs/node/pull/59609)
- \[[`4a317150d5`](https://github.com/nodejs/node/commit/4a317150d5)] - **build**: fix 'implicit-function-declaration' on OpenHarmony platform (hqzing) [#59547](https://github.com/nodejs/node/pull/59547)
- \[[`bda32af587`](https://github.com/nodejs/node/commit/bda32af587)] - **build**: use `windows-2025` runner (Michaël Zasso) [#59673](https://github.com/nodejs/node/pull/59673)
- \[[`a4a8ed8f6e`](https://github.com/nodejs/node/commit/a4a8ed8f6e)] - **build**: compile bundled uvwasi conditionally (Carlo Cabrera) [#59622](https://github.com/nodejs/node/pull/59622)
- \[[`d944a87761`](https://github.com/nodejs/node/commit/d944a87761)] - **crypto**: refactor subtle methods to use synchronous import (Filip Skokan) [#59771](https://github.com/nodejs/node/pull/59771)
- \[[`7a8e2c251d`](https://github.com/nodejs/node/commit/7a8e2c251d)] - **(SEMVER-MINOR)** **crypto**: support Ed448 and ML-DSA context parameter in node:crypto (Filip Skokan) [#59570](https://github.com/nodejs/node/pull/59570)
- \[[`4b631be0b0`](https://github.com/nodejs/node/commit/4b631be0b0)] - **(SEMVER-MINOR)** **crypto**: support Ed448 and ML-DSA context parameter in Web Cryptography (Filip Skokan) [#59570](https://github.com/nodejs/node/pull/59570)
- \[[`3e4b1e732c`](https://github.com/nodejs/node/commit/3e4b1e732c)] - **(SEMVER-MINOR)** **crypto**: add KMAC Web Cryptography algorithms (Filip Skokan) [#59647](https://github.com/nodejs/node/pull/59647)
- \[[`b1d28785b2`](https://github.com/nodejs/node/commit/b1d28785b2)] - **(SEMVER-MINOR)** **crypto**: add Argon2 Web Cryptography algorithms (Filip Skokan) [#59544](https://github.com/nodejs/node/pull/59544)
- \[[`430691d1af`](https://github.com/nodejs/node/commit/430691d1af)] - **(SEMVER-MINOR)** **crypto**: support SLH-DSA KeyObject, sign, and verify (Filip Skokan) [#59537](https://github.com/nodejs/node/pull/59537)
- \[[`0d1e53d935`](https://github.com/nodejs/node/commit/0d1e53d935)] - **deps**: update uvwasi to 0.0.23 (Node.js GitHub Bot) [#59791](https://github.com/nodejs/node/pull/59791)
- \[[`68732cf426`](https://github.com/nodejs/node/commit/68732cf426)] - **deps**: update histogram to 0.11.9 (Node.js GitHub Bot) [#59689](https://github.com/nodejs/node/pull/59689)
- \[[`f12c1ad961`](https://github.com/nodejs/node/commit/f12c1ad961)] - **deps**: update googletest to eb2d85e (Node.js GitHub Bot) [#59335](https://github.com/nodejs/node/pull/59335)
- \[[`45af6966ae`](https://github.com/nodejs/node/commit/45af6966ae)] - **deps**: upgrade npm to 11.6.0 (npm team) [#59750](https://github.com/nodejs/node/pull/59750)
- \[[`57617244a4`](https://github.com/nodejs/node/commit/57617244a4)] - **deps**: V8: cherry-pick 6b1b9bca2a8 (Xiao-Tao) [#59283](https://github.com/nodejs/node/pull/59283)
- \[[`2e6225a747`](https://github.com/nodejs/node/commit/2e6225a747)] - **deps**: update amaro to 1.1.2 (Node.js GitHub Bot) [#59616](https://github.com/nodejs/node/pull/59616)
- \[[`1f7f6dfae6`](https://github.com/nodejs/node/commit/1f7f6dfae6)] - **diagnostics_channel**: revoke DEP0163 (René) [#59758](https://github.com/nodejs/node/pull/59758)
- \[[`8671a6cdb3`](https://github.com/nodejs/node/commit/8671a6cdb3)] - **doc**: stabilize --disable-sigusr1 (Rafael Gonzaga) [#59707](https://github.com/nodejs/node/pull/59707)
- \[[`583b1b255d`](https://github.com/nodejs/node/commit/583b1b255d)] - **doc**: update OpenSSL default security level to 2 (Jeetu Suthar) [#59723](https://github.com/nodejs/node/pull/59723)
- \[[`9b5eb6eb50`](https://github.com/nodejs/node/commit/9b5eb6eb50)] - **doc**: fix missing links in the `errors` page (Nam Yooseong) [#59427](https://github.com/nodejs/node/pull/59427)
- \[[`e7bf712c57`](https://github.com/nodejs/node/commit/e7bf712c57)] - **doc**: update "Type stripping in dependencies" section (Josh Kelley) [#59652](https://github.com/nodejs/node/pull/59652)
- \[[`96db47f91e`](https://github.com/nodejs/node/commit/96db47f91e)] - **doc**: add Miles Guicent as triager (Miles Guicent) [#59562](https://github.com/nodejs/node/pull/59562)
- \[[`87f829bd0c`](https://github.com/nodejs/node/commit/87f829bd0c)] - **doc**: mark `path.matchesGlob` as stable (Aviv Keller) [#59572](https://github.com/nodejs/node/pull/59572)
- \[[`062b2f705e`](https://github.com/nodejs/node/commit/062b2f705e)] - **doc**: improve documentation for raw headers in HTTP/2 APIs (Tim Perry) [#59633](https://github.com/nodejs/node/pull/59633)
- \[[`6ab9306370`](https://github.com/nodejs/node/commit/6ab9306370)] - **doc**: update install_tools.bat free disk space (Stefan Stojanovic) [#59579](https://github.com/nodejs/node/pull/59579)
- \[[`c8d6b60da6`](https://github.com/nodejs/node/commit/c8d6b60da6)] - **doc**: fix quic session instance typo (jakecastelli) [#59642](https://github.com/nodejs/node/pull/59642)
- \[[`61d0a2d1ba`](https://github.com/nodejs/node/commit/61d0a2d1ba)] - **doc**: fix filehandle.read typo (Ruy Adorno) [#59635](https://github.com/nodejs/node/pull/59635)
- \[[`3276bfa0d0`](https://github.com/nodejs/node/commit/3276bfa0d0)] - **doc**: update migration recomendations for `util.is**()` deprecations (Augustin Mauroy) [#59269](https://github.com/nodejs/node/pull/59269)
- \[[`11de6c7ebb`](https://github.com/nodejs/node/commit/11de6c7ebb)] - **doc**: fix missing link to the Error documentation in the `http` page (Alexander Makarenko) [#59080](https://github.com/nodejs/node/pull/59080)
- \[[`f5b6829bba`](https://github.com/nodejs/node/commit/f5b6829bba)] - **doc,crypto**: add description to the KEM and supports() methods (Filip Skokan) [#59644](https://github.com/nodejs/node/pull/59644)
- \[[`5bfdc7ee74`](https://github.com/nodejs/node/commit/5bfdc7ee74)] - **doc,crypto**: cleanup unlinked and self method references webcrypto.md (Filip Skokan) [#59608](https://github.com/nodejs/node/pull/59608)
- \[[`010458d061`](https://github.com/nodejs/node/commit/010458d061)] - **esm**: populate separate cache for require(esm) in imported CJS (Joyee Cheung) [#59679](https://github.com/nodejs/node/pull/59679)
- \[[`dbe6e63baf`](https://github.com/nodejs/node/commit/dbe6e63baf)] - **esm**: fix missed renaming in ModuleJob.runSync (Joyee Cheung) [#59724](https://github.com/nodejs/node/pull/59724)
- \[[`8eb0d9d834`](https://github.com/nodejs/node/commit/8eb0d9d834)] - **fs**: fix wrong order of file names in cpSync error message (Nicholas Paun) [#59775](https://github.com/nodejs/node/pull/59775)
- \[[`e69be5611f`](https://github.com/nodejs/node/commit/e69be5611f)] - **fs**: fix dereference: false on cpSync (Nicholas Paun) [#59681](https://github.com/nodejs/node/pull/59681)
- \[[`2865d2ac20`](https://github.com/nodejs/node/commit/2865d2ac20)] - **http**: unbreak keepAliveTimeoutBuffer (Robert Nagy) [#59784](https://github.com/nodejs/node/pull/59784)
- \[[`ade1175475`](https://github.com/nodejs/node/commit/ade1175475)] - **http**: use cached '1.1' http version string (Robert Nagy) [#59717](https://github.com/nodejs/node/pull/59717)
- \[[`74a09482de`](https://github.com/nodejs/node/commit/74a09482de)] - **inspector**: undici as shared-library should pass tests (Aras Abbasi) [#59837](https://github.com/nodejs/node/pull/59837)
- \[[`772f8f415a`](https://github.com/nodejs/node/commit/772f8f415a)] - **inspector**: add http2 tracking support (Darshan Sen) [#59611](https://github.com/nodejs/node/pull/59611)
- \[[`3d225572d7`](https://github.com/nodejs/node/commit/3d225572d7)] - _**Revert**_ "**lib**: optimize writable stream buffer clearing" (Yoo) [#59743](https://github.com/nodejs/node/pull/59743)
- \[[`4fd213ce73`](https://github.com/nodejs/node/commit/4fd213ce73)] - **lib**: fix isReadable and isWritable return type value (Gabriel Quaresma) [#59089](https://github.com/nodejs/node/pull/59089)
- \[[`39befddb87`](https://github.com/nodejs/node/commit/39befddb87)] - **lib**: prefer TypedArrayPrototype primordials (Filip Skokan) [#59766](https://github.com/nodejs/node/pull/59766)
- \[[`0748160d2e`](https://github.com/nodejs/node/commit/0748160d2e)] - **lib**: fix DOMException subclass support (Chengzhong Wu) [#59680](https://github.com/nodejs/node/pull/59680)
- \[[`1a93df808c`](https://github.com/nodejs/node/commit/1a93df808c)] - **lib**: revert to using default derived class constructors (René) [#59650](https://github.com/nodejs/node/pull/59650)
- \[[`bb0755df37`](https://github.com/nodejs/node/commit/bb0755df37)] - **meta**: bump `codecov/codecov-action` (dependabot\[bot]) [#59726](https://github.com/nodejs/node/pull/59726)
- \[[`45d148d9be`](https://github.com/nodejs/node/commit/45d148d9be)] - **meta**: bump actions/download-artifact from 4.3.0 to 5.0.0 (dependabot\[bot]) [#59729](https://github.com/nodejs/node/pull/59729)
- \[[`01b66b122e`](https://github.com/nodejs/node/commit/01b66b122e)] - **meta**: bump github/codeql-action from 3.29.2 to 3.30.0 (dependabot\[bot]) [#59728](https://github.com/nodejs/node/pull/59728)
- \[[`34f7ab5502`](https://github.com/nodejs/node/commit/34f7ab5502)] - **meta**: bump actions/cache from 4.2.3 to 4.2.4 (dependabot\[bot]) [#59727](https://github.com/nodejs/node/pull/59727)
- \[[`5806ea02af`](https://github.com/nodejs/node/commit/5806ea02af)] - **meta**: bump actions/checkout from 4.2.2 to 5.0.0 (dependabot\[bot]) [#59725](https://github.com/nodejs/node/pull/59725)
- \[[`f667215583`](https://github.com/nodejs/node/commit/f667215583)] - **path**: refactor path joining logic for clarity and performance (Lee Jiho) [#59781](https://github.com/nodejs/node/pull/59781)
- \[[`0340fe92a6`](https://github.com/nodejs/node/commit/0340fe92a6)] - **repl**: do not cause side effects in tab completion (Anna Henningsen) [#59774](https://github.com/nodejs/node/pull/59774)
- \[[`a414c1eb51`](https://github.com/nodejs/node/commit/a414c1eb51)] - **repl**: fix REPL completion under unary expressions (Kingsword) [#59744](https://github.com/nodejs/node/pull/59744)
- \[[`c206f8dd87`](https://github.com/nodejs/node/commit/c206f8dd87)] - **repl**: add isValidParentheses check before wrap input (Xuguang Mei) [#59607](https://github.com/nodejs/node/pull/59607)
- \[[`0bf9775ee2`](https://github.com/nodejs/node/commit/0bf9775ee2)] - **sea**: implement sea.getAssetKeys() (Joyee Cheung) [#59661](https://github.com/nodejs/node/pull/59661)
- \[[`bf26b478d8`](https://github.com/nodejs/node/commit/bf26b478d8)] - **sea**: allow using inspector command line flags with SEA (Joyee Cheung) [#59568](https://github.com/nodejs/node/pull/59568)
- \[[`92128a8fe2`](https://github.com/nodejs/node/commit/92128a8fe2)] - **src**: use DictionaryTemplate for node_url_pattern (James M Snell) [#59802](https://github.com/nodejs/node/pull/59802)
- \[[`bcb29fb84f`](https://github.com/nodejs/node/commit/bcb29fb84f)] - **src**: correctly report memory changes to V8 (Yaksh Bariya) [#59623](https://github.com/nodejs/node/pull/59623)
- \[[`44c24657d3`](https://github.com/nodejs/node/commit/44c24657d3)] - **src**: fixup node_messaging error handling (James M Snell) [#59792](https://github.com/nodejs/node/pull/59792)
- \[[`2cd6a3b7ec`](https://github.com/nodejs/node/commit/2cd6a3b7ec)] - **src**: track async resources via pointers to stack-allocated handles (Anna Henningsen) [#59704](https://github.com/nodejs/node/pull/59704)
- \[[`34d752586f`](https://github.com/nodejs/node/commit/34d752586f)] - **src**: fix build on NetBSD (Thomas Klausner) [#59718](https://github.com/nodejs/node/pull/59718)
- \[[`15fa779ac5`](https://github.com/nodejs/node/commit/15fa779ac5)] - **src**: fix race on process exit and off thread CA loading (Chengzhong Wu) [#59632](https://github.com/nodejs/node/pull/59632)
- \[[`15cbd3966a`](https://github.com/nodejs/node/commit/15cbd3966a)] - **src**: separate module.hasAsyncGraph and module.hasTopLevelAwait (Joyee Cheung) [#59675](https://github.com/nodejs/node/pull/59675)
- \[[`88d1ca8990`](https://github.com/nodejs/node/commit/88d1ca8990)] - **src**: use non-deprecated Get/SetPrototype methods (Michaël Zasso) [#59671](https://github.com/nodejs/node/pull/59671)
- \[[`56ac9a2d46`](https://github.com/nodejs/node/commit/56ac9a2d46)] - **src**: migrate WriteOneByte to WriteOneByteV2 (Chengzhong Wu) [#59634](https://github.com/nodejs/node/pull/59634)
- \[[`3d88aa9f2f`](https://github.com/nodejs/node/commit/3d88aa9f2f)] - **src**: remove duplicate code (theanarkh) [#59649](https://github.com/nodejs/node/pull/59649)
- \[[`0718a70b2a`](https://github.com/nodejs/node/commit/0718a70b2a)] - **src**: add name for more threads (theanarkh) [#59601](https://github.com/nodejs/node/pull/59601)
- \[[`0379a8b254`](https://github.com/nodejs/node/commit/0379a8b254)] - **src**: remove JSONParser (Joyee Cheung) [#59619](https://github.com/nodejs/node/pull/59619)
- \[[`90d0a1b2e9`](https://github.com/nodejs/node/commit/90d0a1b2e9)] - **src,sqlite**: refactor value conversion (Edy Silva) [#59659](https://github.com/nodejs/node/pull/59659)
- \[[`5e025c7ca7`](https://github.com/nodejs/node/commit/5e025c7ca7)] - **stream**: replace manual function validation with validateFunction (방진혁) [#59529](https://github.com/nodejs/node/pull/59529)
- \[[`155a999bed`](https://github.com/nodejs/node/commit/155a999bed)] - **test**: skip tests failing when run under root (Livia Medeiros) [#59779](https://github.com/nodejs/node/pull/59779)
- \[[`6313706c69`](https://github.com/nodejs/node/commit/6313706c69)] - **test**: update WPT for urlpattern to cff1ac1123 (Node.js GitHub Bot) [#59602](https://github.com/nodejs/node/pull/59602)
- \[[`41245ad4c7`](https://github.com/nodejs/node/commit/41245ad4c7)] - **test**: skip more sea tests on Linux ppc64le (Richard Lau) [#59755](https://github.com/nodejs/node/pull/59755)
- \[[`df63d37ec4`](https://github.com/nodejs/node/commit/df63d37ec4)] - **test**: fix internet/test-dns (Michaël Zasso) [#59660](https://github.com/nodejs/node/pull/59660)
- \[[`1f6c335e82`](https://github.com/nodejs/node/commit/1f6c335e82)] - **test**: mark test-inspector-network-fetch as flaky again (Joyee Cheung) [#59640](https://github.com/nodejs/node/pull/59640)
- \[[`1798683df1`](https://github.com/nodejs/node/commit/1798683df1)] - **test**: skip test-fs-cp\* tests that are constantly failing on Windows (Joyee Cheung) [#59637](https://github.com/nodejs/node/pull/59637)
- \[[`4c48ec09e5`](https://github.com/nodejs/node/commit/4c48ec09e5)] - **test**: deflake test-http-keep-alive-empty-line (Luigi Pinca) [#59595](https://github.com/nodejs/node/pull/59595)
- \[[`dcdb259e85`](https://github.com/nodejs/node/commit/dcdb259e85)] - **test_runner**: fix todo inheritance (Moshe Atlow) [#59721](https://github.com/nodejs/node/pull/59721)
- \[[`24177973a2`](https://github.com/nodejs/node/commit/24177973a2)] - **test_runner**: set mock timer's interval undefined (hotpineapple) [#59479](https://github.com/nodejs/node/pull/59479)
- \[[`83d11f8a7a`](https://github.com/nodejs/node/commit/83d11f8a7a)] - **tools**: print appropriate output when test aborted (hotpineapple) [#59794](https://github.com/nodejs/node/pull/59794)
- \[[`1eca2cc548`](https://github.com/nodejs/node/commit/1eca2cc548)] - **tools**: use sparse checkout in `build-tarball.yml` (Antoine du Hamel) [#59788](https://github.com/nodejs/node/pull/59788)
- \[[`89fa1a929d`](https://github.com/nodejs/node/commit/89fa1a929d)] - **tools**: remove unused actions from `build-tarball.yml` (Antoine du Hamel) [#59787](https://github.com/nodejs/node/pull/59787)
- \[[`794ca3511d`](https://github.com/nodejs/node/commit/794ca3511d)] - **tools**: do not attempt to compress tgz archive (Antoine du Hamel) [#59785](https://github.com/nodejs/node/pull/59785)
- \[[`377bdb9b7e`](https://github.com/nodejs/node/commit/377bdb9b7e)] - **tools**: add v8windbg target (Chengzhong Wu) [#59767](https://github.com/nodejs/node/pull/59767)
- \[[`6696d1d6c9`](https://github.com/nodejs/node/commit/6696d1d6c9)] - **tools**: improve error handling in node_mksnapshot (James M Snell) [#59437](https://github.com/nodejs/node/pull/59437)
- \[[`8dbd0f13e8`](https://github.com/nodejs/node/commit/8dbd0f13e8)] - **tools**: add sccache to `test-internet` workflow (Antoine du Hamel) [#59720](https://github.com/nodejs/node/pull/59720)
- \[[`6523c2d7d9`](https://github.com/nodejs/node/commit/6523c2d7d9)] - **tools**: update gyp-next to 0.20.4 (Node.js GitHub Bot) [#59690](https://github.com/nodejs/node/pull/59690)
- \[[`19d633f40c`](https://github.com/nodejs/node/commit/19d633f40c)] - **tools**: add script to make reviewing backport PRs easier (Antoine du Hamel) [#59161](https://github.com/nodejs/node/pull/59161)
- \[[`15e547b3a4`](https://github.com/nodejs/node/commit/15e547b3a4)] - **typings**: add typing for 'uv' (방진혁) [#59606](https://github.com/nodejs/node/pull/59606)
- \[[`ad5cfcc901`](https://github.com/nodejs/node/commit/ad5cfcc901)] - **typings**: add missing properties in ConfigBinding (Lee Jiho) [#59585](https://github.com/nodejs/node/pull/59585)
- \[[`70d2d6d479`](https://github.com/nodejs/node/commit/70d2d6d479)] - **url**: add err.input to ERR_INVALID_FILE_URL_PATH (Joyee Cheung) [#59730](https://github.com/nodejs/node/pull/59730)
- \[[`e476e43c17`](https://github.com/nodejs/node/commit/e476e43c17)] - **util**: fix numericSeparator with negative fractional numbers (sangwook) [#59379](https://github.com/nodejs/node/pull/59379)
- \[[`b2e8f40d15`](https://github.com/nodejs/node/commit/b2e8f40d15)] - **util**: remove unnecessary template strings (btea) [#59201](https://github.com/nodejs/node/pull/59201)
- \[[`6f79450ea2`](https://github.com/nodejs/node/commit/6f79450ea2)] - **util**: remove outdated TODO comment (haramjeong) [#59760](https://github.com/nodejs/node/pull/59760)
- \[[`32731432ef`](https://github.com/nodejs/node/commit/32731432ef)] - **util**: use getOptionValue('--no-deprecation') in deprecated() (haramjeong) [#59760](https://github.com/nodejs/node/pull/59760)
- \[[`65e4e68c90`](https://github.com/nodejs/node/commit/65e4e68c90)] - **util**: hide duplicated stack frames when using util.inspect (Ruben Bridgewater) [#59447](https://github.com/nodejs/node/pull/59447)
- \[[`2086f3365f`](https://github.com/nodejs/node/commit/2086f3365f)] - **vm**: sync-ify SourceTextModule linkage (Chengzhong Wu) [#59000](https://github.com/nodejs/node/pull/59000)
- \[[`c16163511d`](https://github.com/nodejs/node/commit/c16163511d)] - **wasi**: fix `clean` target in `test/wasi/Makefile` (Antoine du Hamel) [#59576](https://github.com/nodejs/node/pull/59576)
- \[[`2e54411cb6`](https://github.com/nodejs/node/commit/2e54411cb6)] - **worker**: optimize cpu profile implement (theanarkh) [#59683](https://github.com/nodejs/node/pull/59683)
- \[[`d6d05ba397`](https://github.com/nodejs/node/commit/d6d05ba397)] - **(SEMVER-MINOR)** **worker**: add cpu profile APIs for worker (theanarkh) [#59428](https://github.com/nodejs/node/pull/59428)

Windows 64-bit Installer: https://nodejs.org/dist/v24.8.0/node-v24.8.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.8.0/node-v24.8.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.8.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.8.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.8.0/node-v24.8.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.8.0/node-v24.8.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.8.0/node-v24.8.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.8.0/node-v24.8.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.8.0/node-v24.8.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.8.0/node-v24.8.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.8.0/node-v24.8.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.8.0/node-v24.8.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.8.0/node-v24.8.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.8.0/ \
Documentation: https://nodejs.org/docs/v24.8.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

5625b3bffa9b39811dc83e14f40ada2f8fe693de93ad9b75f3d652679d0ca823  node-v24.8.0-aix-ppc64.tar.gz
3c30119e4083d87c6501f7aa693dcf17215bc80f5f1ba7ca96d72ae5f0238635  node-v24.8.0-arm64.msi
d81191a1866760eb918caa976c023036bc1fc7405ea31b148905211522045767  node-v24.8.0-darwin-arm64.tar.gz
dfe6f85f52f5971e3873e2305294417091b57b56394709a8d5d6ad3f2a5fa480  node-v24.8.0-darwin-arm64.tar.xz
6fd8496b59baa8f86a24e3eb03308b763091716ffc6b6e1094d1a5e5696dd6dd  node-v24.8.0-darwin-x64.tar.gz
4e3fb475c0ab90109e83fc31ce994c76067ac9a92ca68e95eceece72c92ffa2b  node-v24.8.0-darwin-x64.tar.xz
db9ae39b4b8678d6d2a4bd8b299db2e2253dc32a1cdf7de7c339bebab228556c  node-v24.8.0-headers.tar.gz
7e867c1c0f8fd82cdf77987e3e608db82dd86a353df0cff8898fd6e0383b874f  node-v24.8.0-headers.tar.xz
5eb16b14af5a5f494ed54770822144e847c744fe590f8df093ad4927cf3dd7fd  node-v24.8.0-linux-arm64.tar.gz
323e6bc34bfe82a21f42d9eb94d9a2b6c8082d8c03cb510cf2f95dd1dcaa1531  node-v24.8.0-linux-arm64.tar.xz
20a0856e7b152a5e83b4fd6fe3d509aa54b75d6170cd89066c341d56f6c5de76  node-v24.8.0-linux-ppc64le.tar.gz
0ca68fc43fe09e18c57e8c64e9f1b24f0643be87d30f6816bd842c8a4d2d6cae  node-v24.8.0-linux-ppc64le.tar.xz
708d4edfafca2218fa98e0e8b8c20dc148334f2f882fcea1237c6536e8586d06  node-v24.8.0-linux-s390x.tar.gz
9c8cd3ac0b52fcb900424d94669b53ddc204e658fffbf11b3c6f94f93b068ffb  node-v24.8.0-linux-s390x.tar.xz
daf68404b478b4c3616666580d02500a24148c0f439e4d0134d65ce70e90e655  node-v24.8.0-linux-x64.tar.gz
2598641d188b41793930917f1a99a81c9615856b4205d408a44ab676c1acbb3d  node-v24.8.0-linux-x64.tar.xz
3f386cde016bd4424000c645d5887347998723810ddc08127c423c03f1e55d1d  node-v24.8.0.pkg
6e9e8c931b5028a755e6c4e1edaf14296001ae8bbb35976a3896f59e7fd797c7  node-v24.8.0.tar.gz
1c03b362ebf4740d4758b9a3d3087e3de989f54823650ec80b47090ef414b2e0  node-v24.8.0.tar.xz
7ccff15070850300c3e2b0dbec0466e6ea919315d2ec7be0f504c97d0017dd24  node-v24.8.0-win-arm64.7z
da63ba146c455eb74b7f5c6e8f45355d01b14d9bbab4054bdf250fc4e9f5d008  node-v24.8.0-win-arm64.zip
3b61856b25be8d688f64a1aa4a725528fcffc472758888bf16e6c9251994e767  node-v24.8.0-win-x64.7z
970ecc121a16f546174b6a870215ca4cc0de33f8a616b42c16c8c02e66b07d05  node-v24.8.0-win-x64.zip
f7e1fb2f58a206bb53c11f0e9f4a0bdd8292009b5449918fecb59bd2a834e535  node-v24.8.0-x64.msi
791f5c0c8b51906feb1c76a48e781dbbedc4cfec1d88648372078c03655ec0f7  win-arm64/node.exe
685a44e041d4031da838e7f6fa42bed60af91a1550207b5f3bbbe316036c653e  win-arm64/node.lib
c65cd8cd5b25d881491f625de0d036d3bf530bffa8c24a34002852240a161498  win-arm64/node_pdb.7z
7373c728112993337bdfab198dfc09292d69131752501844fb04a089aad0da5f  win-arm64/node_pdb.zip
3a9ac860c566b7aebf144be914f95e3ec36dc88040aa7acb5d9d1e6e0c7afd5e  win-x64/node.exe
e7c7e13b1e717a58ebc4a748248c607b5ec53c1ce025bbb99320700dbc7bc683  win-x64/node.lib
430b8ef1b4f5b39fae8d1cad16e9562c088d4ec7a74f9f699d4bba8449bc367e  win-x64/node_pdb.7z
e09614871fe3b022c3116ed43ebe79b7c5e5d2c5f2c60a56704700e7feacaf37  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEj8yhP+8dDC6RAI4Jdw96mlrhVgAFAmjB1CQACgkQdw96mlrh
VgAUzw/8CKSGwJwcpemckWRqFS2Q6CEOrvrL2thBRxI5pFW1OHtJPdtmvygwBoGt
hE3UXL3uSDqo/8MB4f3xr/LurfttM6KUJjdqPaJgIxqJ8bqGKcGaWQn4GI4N7n/d
vACyLM4v6L2c9ssV/5A1RpODnnAIa7NdcJyhe7sTrOntClpNHXh6GVnHdjTbFp9D
R/N/17fO/GaHeyoM5J+DHPnUdK3tEmZlJMD+AVo8IOfrrusIeUAo+i5L2aKlslWb
VOlbyezaa7hO2iglDhESfa/in8HcNFfLmU9uaAtsyWeF8XoJzzIqXU3xJQ/mVbte
ZZMdjjlaQi0nb0QbtXcwljdJTHwrGeUm7U5sZjeC7JnHr7+Df9/W833C8fS9sYV9
WWMosyJB5qJBO8rYfNNYYt0JWOiNKSz3oGWbb1zbfMqBoo/FBrMiwR3YdFetgDBi
pzHs8LMso8/Sgjh5fENO1xNp0ZmV8pJwqiFchrWteHXXaEap0m2oEQdmP5R/WYqa
XaTWC744qSh92AlDA89DtY4Sma1VYRSYhdzWAd3qbwgTOqghhAKG/1lWqYos5JwS
JnxW3+xzGlMfTZMkb9QZC62ErHaIyMYs/PN9/P9g/kWGztc9yvT3pDa56E1y/fJC
f8iqICGyKdQ2tu89Av7f1bnLqbfRDWGYhF4e1OdYV5OEh4yYx3U=
=dctJ
-----END PGP SIGNATURE-----
```
