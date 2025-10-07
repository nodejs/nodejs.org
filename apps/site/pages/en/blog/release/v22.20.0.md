---
date: '2025-09-24T13:48:52.227Z'
category: release
title: Node.js v22.20.0 (LTS)
layout: blog-post
author: Richard Lau
---

## 2025-09-24, Version 22.20.0 'Jod' (LTS), @richardlau

### Notable Changes

#### OpenSSL updated to 3.5.2

For official Node.js builds, or builds using the default build configuration, Node.js now bundles OpenSSL 3.5.2. This update allows Node.js 22.x to be supported through to the planned End-of-Life date of 2027-04-30 as the previously bundled OpenSSL 3.0.x goes out of support in September 2026.

This change does not affect third-party builds of Node.js that link to an external OpenSSL (or OpenSSL-compatible) library.

#### Other notable changes

- \[[`5b83e1e0a2`](https://github.com/nodejs/node/commit/5b83e1e0a2)] - **crypto**: update root certificates to NSS 3.114 (Node.js GitHub Bot) [#59571](https://github.com/nodejs/node/pull/59571)
- \[[`34b25fd97b`](https://github.com/nodejs/node/commit/34b25fd97b)] - **doc**: stabilize --disable-sigusr1 (Rafael Gonzaga) [#59707](https://github.com/nodejs/node/pull/59707)
- \[[`bf41218ed9`](https://github.com/nodejs/node/commit/bf41218ed9)] - **doc**: mark `path.matchesGlob` as stable (Aviv Keller) [#59572](https://github.com/nodejs/node/pull/59572)
- \[[`1dbad2058f`](https://github.com/nodejs/node/commit/1dbad2058f)] - **(SEMVER-MINOR)** **http**: add Agent.agentKeepAliveTimeoutBuffer option (Haram Jeong) [#59315](https://github.com/nodejs/node/pull/59315)
- \[[`062e837d5f`](https://github.com/nodejs/node/commit/062e837d5f)] - **(SEMVER-MINOR)** **http2**: add support for raw header arrays in h2Stream.respond() (Tim Perry) [#59455](https://github.com/nodejs/node/pull/59455)
- \[[`b8066611c3`](https://github.com/nodejs/node/commit/b8066611c3)] - **inspector**: add http2 tracking support (Darshan Sen) [#59611](https://github.com/nodejs/node/pull/59611)
- \[[`9b7dd40da8`](https://github.com/nodejs/node/commit/9b7dd40da8)] - **(SEMVER-MINOR)** **sea**: implement execArgvExtension (Joyee Cheung) [#59560](https://github.com/nodejs/node/pull/59560)
- \[[`48bfbd3dca`](https://github.com/nodejs/node/commit/48bfbd3dca)] - **(SEMVER-MINOR)** **sea**: support execArgv in sea config (Joyee Cheung) [#59314](https://github.com/nodejs/node/pull/59314)
- \[[`cf06e74076`](https://github.com/nodejs/node/commit/cf06e74076)] - **(SEMVER-MINOR)** **stream**: add brotli support to CompressionStream and DecompressionStream (Matthew Aitken) [#59464](https://github.com/nodejs/node/pull/59464)
- \[[`62bb80c17e`](https://github.com/nodejs/node/commit/62bb80c17e)] - **(SEMVER-MINOR)** **test_runner**: support object property mocking (Idan Goshen) [#58438](https://github.com/nodejs/node/pull/58438)
- \[[`9e2aa23be9`](https://github.com/nodejs/node/commit/9e2aa23be9)] - **(SEMVER-MINOR)** **worker**: add cpu profile APIs for worker (theanarkh) [#59428](https://github.com/nodejs/node/pull/59428)

### Commits

- \[[`b7b78fd565`](https://github.com/nodejs/node/commit/b7b78fd565)] - **assert**: cap input size in myersDiff to avoid Int32Array overflow (Haram Jeong) [#59578](https://github.com/nodejs/node/pull/59578)
- \[[`9da50a6c53`](https://github.com/nodejs/node/commit/9da50a6c53)] - **benchmark**: sqlite prevent create both tables on prepare selects (Bruno Rodrigues) [#59709](https://github.com/nodejs/node/pull/59709)
- \[[`4c1538770e`](https://github.com/nodejs/node/commit/4c1538770e)] - **benchmark**: calibrate config array-vs-concat (Rafael Gonzaga) [#59587](https://github.com/nodejs/node/pull/59587)
- \[[`fc3f82d683`](https://github.com/nodejs/node/commit/fc3f82d683)] - **benchmark**: calibrate config v8/serialize.js (Rafael Gonzaga) [#59586](https://github.com/nodejs/node/pull/59586)
- \[[`e95c9b2950`](https://github.com/nodejs/node/commit/e95c9b2950)] - **benchmark**: reduce readfile-permission-enabled config (Rafael Gonzaga) [#59589](https://github.com/nodejs/node/pull/59589)
- \[[`e4fea38b31`](https://github.com/nodejs/node/commit/e4fea38b31)] - **benchmark**: calibrate length of util.diff (Rafael Gonzaga) [#59588](https://github.com/nodejs/node/pull/59588)
- \[[`c5d68c4a0f`](https://github.com/nodejs/node/commit/c5d68c4a0f)] - **benchmark, test**: replace CRLF variable with string literal (Lee Jiho) [#59466](https://github.com/nodejs/node/pull/59466)
- \[[`129a1d673b`](https://github.com/nodejs/node/commit/129a1d673b)] - **build**: fix getting OpenSSL version on Windows (Michaël Zasso) [#59609](https://github.com/nodejs/node/pull/59609)
- \[[`9f53db7162`](https://github.com/nodejs/node/commit/9f53db7162)] - **build**: fix 'implicit-function-declaration' on OpenHarmony platform (hqzing) [#59547](https://github.com/nodejs/node/pull/59547)
- \[[`3839593e07`](https://github.com/nodejs/node/commit/3839593e07)] - **build**: use `windows-2025` runner (Michaël Zasso) [#59673](https://github.com/nodejs/node/pull/59673)
- \[[`e430464669`](https://github.com/nodejs/node/commit/e430464669)] - **build**: compile bundled uvwasi conditionally (Carlo Cabrera) [#59622](https://github.com/nodejs/node/pull/59622)
- \[[`e2c9cab0cd`](https://github.com/nodejs/node/commit/e2c9cab0cd)] - **build**: do not set `-mminimal-toc` with `clang` (Richard Lau) [#59484](https://github.com/nodejs/node/pull/59484)
- \[[`208bc810a1`](https://github.com/nodejs/node/commit/208bc810a1)] - **child_process**: remove unsafe array iteration (hotpineapple) [#59347](https://github.com/nodejs/node/pull/59347)
- \[[`d74799d90c`](https://github.com/nodejs/node/commit/d74799d90c)] - **crypto**: load system CA certificates off thread (Joyee Cheung) [#59550](https://github.com/nodejs/node/pull/59550)
- \[[`5b83e1e0a2`](https://github.com/nodejs/node/commit/5b83e1e0a2)] - **crypto**: update root certificates to NSS 3.114 (Node.js GitHub Bot) [#59571](https://github.com/nodejs/node/pull/59571)
- \[[`d289b1d1af`](https://github.com/nodejs/node/commit/d289b1d1af)] - **deps**: V8: cherry-pick e3df60f3f5ab (Chengzhong Wu) [#58691](https://github.com/nodejs/node/pull/58691)
- \[[`cf5d91e2a6`](https://github.com/nodejs/node/commit/cf5d91e2a6)] - **deps**: update uvwasi to 0.0.23 (Node.js GitHub Bot) [#59791](https://github.com/nodejs/node/pull/59791)
- \[[`1cf24a0445`](https://github.com/nodejs/node/commit/1cf24a0445)] - **deps**: update histogram to 0.11.9 (Node.js GitHub Bot) [#59689](https://github.com/nodejs/node/pull/59689)
- \[[`8638bd3f2e`](https://github.com/nodejs/node/commit/8638bd3f2e)] - **deps**: update googletest to eb2d85e (Node.js GitHub Bot) [#59335](https://github.com/nodejs/node/pull/59335)
- \[[`3ff4eb5b37`](https://github.com/nodejs/node/commit/3ff4eb5b37)] - **deps**: update amaro to 1.1.2 (Node.js GitHub Bot) [#59616](https://github.com/nodejs/node/pull/59616)
- \[[`4d268ac034`](https://github.com/nodejs/node/commit/4d268ac034)] - **deps**: V8: cherry-pick 7b91e3e2cbaf (Milad Fa) [#59485](https://github.com/nodejs/node/pull/59485)
- \[[`83410eb0e3`](https://github.com/nodejs/node/commit/83410eb0e3)] - **deps**: V8: cherry-pick 59d52e311bb1 (Milad Fa) [#59485](https://github.com/nodejs/node/pull/59485)
- \[[`5780af02cb`](https://github.com/nodejs/node/commit/5780af02cb)] - **deps**: update amaro to 1.1.1 (Node.js GitHub Bot) [#59141](https://github.com/nodejs/node/pull/59141)
- \[[`2986eca821`](https://github.com/nodejs/node/commit/2986eca821)] - **deps**: V8: cherry-pick 6b1b9bca2a8 (zhoumingtao) [#59283](https://github.com/nodejs/node/pull/59283)
- \[[`98e399b3ea`](https://github.com/nodejs/node/commit/98e399b3ea)] - **deps**: update archs files for openssl-3.5.2 (Node.js GitHub Bot) [#59371](https://github.com/nodejs/node/pull/59371)
- \[[`2b983a7520`](https://github.com/nodejs/node/commit/2b983a7520)] - **deps**: upgrade openssl sources to openssl-3.5.2 (Node.js GitHub Bot) [#59371](https://github.com/nodejs/node/pull/59371)
- \[[`7ffbb42454`](https://github.com/nodejs/node/commit/7ffbb42454)] - **deps**: update archs files for openssl-3.5.1 (Node.js GitHub Bot) [#59234](https://github.com/nodejs/node/pull/59234)
- \[[`bd48a60a75`](https://github.com/nodejs/node/commit/bd48a60a75)] - **deps**: upgrade openssl sources to openssl-3.5.1 (Node.js GitHub Bot) [#59234](https://github.com/nodejs/node/pull/59234)
- \[[`24762a10ca`](https://github.com/nodejs/node/commit/24762a10ca)] - **deps**: fix OpenSSL security level at 1 (Richard Lau) [#59859](https://github.com/nodejs/node/pull/59859)
- \[[`1233e92d10`](https://github.com/nodejs/node/commit/1233e92d10)] - **diagnostics_channel**: revoke DEP0163 (René) [#59758](https://github.com/nodejs/node/pull/59758)
- \[[`34b25fd97b`](https://github.com/nodejs/node/commit/34b25fd97b)] - **doc**: stabilize --disable-sigusr1 (Rafael Gonzaga) [#59707](https://github.com/nodejs/node/pull/59707)
- \[[`d7adf8be64`](https://github.com/nodejs/node/commit/d7adf8be64)] - **doc**: update "Type stripping in dependencies" section (Josh Kelley) [#59652](https://github.com/nodejs/node/pull/59652)
- \[[`a1d7e4fdbf`](https://github.com/nodejs/node/commit/a1d7e4fdbf)] - **doc**: add Miles Guicent as triager (Miles Guicent) [#59562](https://github.com/nodejs/node/pull/59562)
- \[[`bf41218ed9`](https://github.com/nodejs/node/commit/bf41218ed9)] - **doc**: mark `path.matchesGlob` as stable (Aviv Keller) [#59572](https://github.com/nodejs/node/pull/59572)
- \[[`afaa1ccb74`](https://github.com/nodejs/node/commit/afaa1ccb74)] - **doc**: improve documentation for raw headers in HTTP/2 APIs (Tim Perry) [#59633](https://github.com/nodejs/node/pull/59633)
- \[[`b95ff56102`](https://github.com/nodejs/node/commit/b95ff56102)] - **doc**: update install_tools.bat free disk space (Stefan Stojanovic) [#59579](https://github.com/nodejs/node/pull/59579)
- \[[`6ff939b8d3`](https://github.com/nodejs/node/commit/6ff939b8d3)] - **doc**: fix filehandle.read typo (Ruy Adorno) [#59635](https://github.com/nodejs/node/pull/59635)
- \[[`963bfa9d6f`](https://github.com/nodejs/node/commit/963bfa9d6f)] - **doc**: fix missing link to the Error documentation in the `http` page (Alexander Makarenko) [#59080](https://github.com/nodejs/node/pull/59080)
- \[[`0e10a8ea27`](https://github.com/nodejs/node/commit/0e10a8ea27)] - **doc**: improve `sqlite.backup()` progress/fulfillment documentation (René) [#59598](https://github.com/nodejs/node/pull/59598)
- \[[`18ceefbabd`](https://github.com/nodejs/node/commit/18ceefbabd)] - **doc**: clarify experimental platform vulnerability policy (Matteo Collina) [#59591](https://github.com/nodejs/node/pull/59591)
- \[[`66cdd00368`](https://github.com/nodejs/node/commit/66cdd00368)] - **doc**: link to `TypedArray.from()` in signature (Aviv Keller) [#59226](https://github.com/nodejs/node/pull/59226)
- \[[`9f058ce7c0`](https://github.com/nodejs/node/commit/9f058ce7c0)] - **doc**: fix typos in `environment_variables.md` (PhistucK) [#59536](https://github.com/nodejs/node/pull/59536)
- \[[`3cfec820e9`](https://github.com/nodejs/node/commit/3cfec820e9)] - **doc**: add security incident reponse plan (Rafael Gonzaga) [#59470](https://github.com/nodejs/node/pull/59470)
- \[[`46aa3434e6`](https://github.com/nodejs/node/commit/46aa3434e6)] - **doc**: clarify maxRSS unit in `process.resourceUsage()` (Alex Yang) [#59511](https://github.com/nodejs/node/pull/59511)
- \[[`adf98f600a`](https://github.com/nodejs/node/commit/adf98f600a)] - **doc**: add missing Zstd strategy constants (RANDRIAMANANTENA Narindra Tiana Annaick) [#59312](https://github.com/nodejs/node/pull/59312)
- \[[`f335989942`](https://github.com/nodejs/node/commit/f335989942)] - **doc**: fix the version tls.DEFAULT_CIPHERS was added (Allon Murienik) [#59247](https://github.com/nodejs/node/pull/59247)
- \[[`7fa14fcf54`](https://github.com/nodejs/node/commit/7fa14fcf54)] - **doc**: clarify glob's exclude option behavior (hotpineapple) [#59245](https://github.com/nodejs/node/pull/59245)
- \[[`85b8d255c9`](https://github.com/nodejs/node/commit/85b8d255c9)] - **doc**: add RafaelGSS as performance strategic lead (Rafael Gonzaga) [#59445](https://github.com/nodejs/node/pull/59445)
- \[[`16b1f7a602`](https://github.com/nodejs/node/commit/16b1f7a602)] - **doc**: add new environment variables doc page (Dario Piotrowicz) [#59052](https://github.com/nodejs/node/pull/59052)
- \[[`b4a43ed83a`](https://github.com/nodejs/node/commit/b4a43ed83a)] - **doc**: add missing environment variables to manpage (amir lavasani) [#58963](https://github.com/nodejs/node/pull/58963)
- \[[`c923cfe898`](https://github.com/nodejs/node/commit/c923cfe898)] - **doc**: fix links in test.md (Vas Sudanagunta) [#58876](https://github.com/nodejs/node/pull/58876)
- \[[`a93a8b5eda`](https://github.com/nodejs/node/commit/a93a8b5eda)] - **doc**: mark type stripping as release candidate (Marco Ippolito) [#57705](https://github.com/nodejs/node/pull/57705)
- \[[`d302cb3bb2`](https://github.com/nodejs/node/commit/d302cb3bb2)] - **esm**: add experimental support for addon modules (Chengzhong Wu) [#55844](https://github.com/nodejs/node/pull/55844)
- \[[`d55c3e7f0b`](https://github.com/nodejs/node/commit/d55c3e7f0b)] - **esm**: link modules synchronously when no async loader hooks are used (Joyee Cheung) [#59519](https://github.com/nodejs/node/pull/59519)
- \[[`9e1fbb620f`](https://github.com/nodejs/node/commit/9e1fbb620f)] - **esm**: show race error message for inner module job race (Joyee Cheung) [#59519](https://github.com/nodejs/node/pull/59519)
- \[[`8c4dcd5199`](https://github.com/nodejs/node/commit/8c4dcd5199)] - **esm**: sync-ify module translation (Joyee Cheung) [#59453](https://github.com/nodejs/node/pull/59453)
- \[[`71038932d3`](https://github.com/nodejs/node/commit/71038932d3)] - **fs**: fix wrong order of file names in cpSync error message (Nicholas Paun) [#59775](https://github.com/nodejs/node/pull/59775)
- \[[`5692dec451`](https://github.com/nodejs/node/commit/5692dec451)] - **fs**: fix dereference: false on cpSync (Nicholas Paun) [#59681](https://github.com/nodejs/node/pull/59681)
- \[[`dafd561d37`](https://github.com/nodejs/node/commit/dafd561d37)] - **fs**: fix return value of fs APIs (theanarkh) [#58996](https://github.com/nodejs/node/pull/58996)
- \[[`da6e8cb75b`](https://github.com/nodejs/node/commit/da6e8cb75b)] - **http**: unbreak keepAliveTimeoutBuffer (Robert Nagy) [#59784](https://github.com/nodejs/node/pull/59784)
- \[[`673a48f0a2`](https://github.com/nodejs/node/commit/673a48f0a2)] - **http**: use cached '1.1' http version string (Robert Nagy) [#59717](https://github.com/nodejs/node/pull/59717)
- \[[`1dbad2058f`](https://github.com/nodejs/node/commit/1dbad2058f)] - **(SEMVER-MINOR)** **http**: add Agent.agentKeepAliveTimeoutBuffer option (Haram Jeong) [#59315](https://github.com/nodejs/node/pull/59315)
- \[[`062e837d5f`](https://github.com/nodejs/node/commit/062e837d5f)] - **(SEMVER-MINOR)** **http2**: add support for raw header arrays in h2Stream.respond() (Tim Perry) [#59455](https://github.com/nodejs/node/pull/59455)
- \[[`4d4fb51b89`](https://github.com/nodejs/node/commit/4d4fb51b89)] - **http2**: report sent headers object in client stream dcs (Darshan Sen) [#59419](https://github.com/nodejs/node/pull/59419)
- \[[`b8066611c3`](https://github.com/nodejs/node/commit/b8066611c3)] - **inspector**: add http2 tracking support (Darshan Sen) [#59611](https://github.com/nodejs/node/pull/59611)
- \[[`9b2c013032`](https://github.com/nodejs/node/commit/9b2c013032)] - **inspector**: prevent propagation of promise hooks to noPromise hooks (Shima Ryuhei) [#58841](https://github.com/nodejs/node/pull/58841)
- \[[`a2329895e7`](https://github.com/nodejs/node/commit/a2329895e7)] - **lib**: fix DOMException subclass support (Chengzhong Wu) [#59680](https://github.com/nodejs/node/pull/59680)
- \[[`edb9248bdd`](https://github.com/nodejs/node/commit/edb9248bdd)] - **lib**: make domexception a native error (Chengzhong Wu) [#58691](https://github.com/nodejs/node/pull/58691)
- \[[`ccf29cda19`](https://github.com/nodejs/node/commit/ccf29cda19)] - _**Revert**_ "**lib**: optimize writable stream buffer clearing" (Yoo) [#59743](https://github.com/nodejs/node/pull/59743)
- \[[`f291eda277`](https://github.com/nodejs/node/commit/f291eda277)] - **lib**: fix isReadable and isWritable return type value (Gabriel Quaresma) [#59089](https://github.com/nodejs/node/pull/59089)
- \[[`10ae8684ea`](https://github.com/nodejs/node/commit/10ae8684ea)] - **lib**: revert to using default derived class constructors (René) [#59650](https://github.com/nodejs/node/pull/59650)
- \[[`5d3b80d62d`](https://github.com/nodejs/node/commit/5d3b80d62d)] - **lib**: do not modify prototype deprecated asyncResource (encore) (Szymon Łągiewka) [#59518](https://github.com/nodejs/node/pull/59518)
- \[[`3c4541f878`](https://github.com/nodejs/node/commit/3c4541f878)] - **lib**: simplify IPv6 checks in isLoopback() (Krishnadas) [#59375](https://github.com/nodejs/node/pull/59375)
- \[[`0b631bbffa`](https://github.com/nodejs/node/commit/0b631bbffa)] - **lib**: handle windows reserved device names on UNC (Rafael Gonzaga) [#59286](https://github.com/nodejs/node/pull/59286)
- \[[`297f62ba1f`](https://github.com/nodejs/node/commit/297f62ba1f)] - **meta**: bump `codecov/codecov-action` (dependabot\[bot]) [#59726](https://github.com/nodejs/node/pull/59726)
- \[[`3dcd8446b6`](https://github.com/nodejs/node/commit/3dcd8446b6)] - **meta**: bump actions/download-artifact from 4.3.0 to 5.0.0 (dependabot\[bot]) [#59729](https://github.com/nodejs/node/pull/59729)
- \[[`d0d357f683`](https://github.com/nodejs/node/commit/d0d357f683)] - **meta**: bump github/codeql-action from 3.29.2 to 3.30.0 (dependabot\[bot]) [#59728](https://github.com/nodejs/node/pull/59728)
- \[[`2a0e264949`](https://github.com/nodejs/node/commit/2a0e264949)] - **meta**: bump actions/cache from 4.2.3 to 4.2.4 (dependabot\[bot]) [#59727](https://github.com/nodejs/node/pull/59727)
- \[[`0a013d1da1`](https://github.com/nodejs/node/commit/0a013d1da1)] - **meta**: bump actions/checkout from 4.2.2 to 5.0.0 (dependabot\[bot]) [#59725](https://github.com/nodejs/node/pull/59725)
- \[[`c690b53d24`](https://github.com/nodejs/node/commit/c690b53d24)] - **meta**: update devcontainer to the latest schema (Aviv Keller) [#54347](https://github.com/nodejs/node/pull/54347)
- \[[`61171c7756`](https://github.com/nodejs/node/commit/61171c7756)] - **module**: correctly detect top-level await in ambiguous contexts (Shima Ryuhei) [#58646](https://github.com/nodejs/node/pull/58646)
- \[[`75bf3f4a87`](https://github.com/nodejs/node/commit/75bf3f4a87)] - **node-api**: link to other programming language bindings (Chengzhong Wu) [#59516](https://github.com/nodejs/node/pull/59516)
- \[[`9a05107558`](https://github.com/nodejs/node/commit/9a05107558)] - **node-api**: clarify enum value ABI stability (Chengzhong Wu) [#59085](https://github.com/nodejs/node/pull/59085)
- \[[`658c31d60c`](https://github.com/nodejs/node/commit/658c31d60c)] - **path**: refactor path joining logic for clarity and performance (Lee Jiho) [#59781](https://github.com/nodejs/node/pull/59781)
- \[[`9cc89f55f7`](https://github.com/nodejs/node/commit/9cc89f55f7)] - **path,win**: fix bug in resolve and normalize (Hüseyin Açacak) [#55623](https://github.com/nodejs/node/pull/55623)
- \[[`24e825f8f5`](https://github.com/nodejs/node/commit/24e825f8f5)] - **sea**: implement sea.getAssetKeys() (Joyee Cheung) [#59661](https://github.com/nodejs/node/pull/59661)
- \[[`c66af21e55`](https://github.com/nodejs/node/commit/c66af21e55)] - **sea**: allow using inspector command line flags with SEA (Joyee Cheung) [#59568](https://github.com/nodejs/node/pull/59568)
- \[[`9b7dd40da8`](https://github.com/nodejs/node/commit/9b7dd40da8)] - **(SEMVER-MINOR)** **sea**: implement execArgvExtension (Joyee Cheung) [#59560](https://github.com/nodejs/node/pull/59560)
- \[[`48bfbd3dca`](https://github.com/nodejs/node/commit/48bfbd3dca)] - **(SEMVER-MINOR)** **sea**: support execArgv in sea config (Joyee Cheung) [#59314](https://github.com/nodejs/node/pull/59314)
- \[[`5559456fe4`](https://github.com/nodejs/node/commit/5559456fe4)] - **sqlite**: add sqlite-type symbol for DatabaseSync (Alex Yang) [#59405](https://github.com/nodejs/node/pull/59405)
- \[[`3478130da3`](https://github.com/nodejs/node/commit/3478130da3)] - **sqlite**: handle ?NNN parameters as positional (Edy Silva) [#59350](https://github.com/nodejs/node/pull/59350)
- \[[`312bc4e5d1`](https://github.com/nodejs/node/commit/312bc4e5d1)] - **sqlite**: avoid useless call to FromMaybe() (Tobias Nießen) [#59490](https://github.com/nodejs/node/pull/59490)
- \[[`937e9bb1c6`](https://github.com/nodejs/node/commit/937e9bb1c6)] - **src**: track BaseObjects with an efficient list (Chengzhong Wu) [#55104](https://github.com/nodejs/node/pull/55104)
- \[[`be2a5e170d`](https://github.com/nodejs/node/commit/be2a5e170d)] - **src**: track async resources via pointers to stack-allocated handles (Anna Henningsen) [#59704](https://github.com/nodejs/node/pull/59704)
- \[[`f232bf2c11`](https://github.com/nodejs/node/commit/f232bf2c11)] - **src**: fix build on NetBSD (Thomas Klausner) [#59718](https://github.com/nodejs/node/pull/59718)
- \[[`e9a685bc3d`](https://github.com/nodejs/node/commit/e9a685bc3d)] - **src**: fix race on process exit and off thread CA loading (Chengzhong Wu) [#59632](https://github.com/nodejs/node/pull/59632)
- \[[`24428fc8fb`](https://github.com/nodejs/node/commit/24428fc8fb)] - **src**: add name for more threads (theanarkh) [#59601](https://github.com/nodejs/node/pull/59601)
- \[[`fd7559f8c3`](https://github.com/nodejs/node/commit/fd7559f8c3)] - **src**: remove JSONParser (Joyee Cheung) [#59619](https://github.com/nodejs/node/pull/59619)
- \[[`8c296bac99`](https://github.com/nodejs/node/commit/8c296bac99)] - **src**: enforce assumptions in FIXED_ONE_BYTE_STRING (Tobias Nießen) [#58155](https://github.com/nodejs/node/pull/58155)
- \[[`1b4885a3f2`](https://github.com/nodejs/node/commit/1b4885a3f2)] - **src**: use simdjson to parse --snapshot-config (Joyee Cheung) [#59473](https://github.com/nodejs/node/pull/59473)
- \[[`9f798de6b0`](https://github.com/nodejs/node/commit/9f798de6b0)] - **src**: fix order of CHECK_NOT_NULL/dereference (Tobias Nießen) [#59487](https://github.com/nodejs/node/pull/59487)
- \[[`f764be27dc`](https://github.com/nodejs/node/commit/f764be27dc)] - **src**: move shared_ptr objects in KeyObjectData (Tobias Nießen) [#59472](https://github.com/nodejs/node/pull/59472)
- \[[`d30287fe12`](https://github.com/nodejs/node/commit/d30287fe12)] - **src**: iterate metadata version entries with std::array (Chengzhong Wu) [#57866](https://github.com/nodejs/node/pull/57866)
- \[[`b2bf620c7b`](https://github.com/nodejs/node/commit/b2bf620c7b)] - **src**: internalize `v8::ConvertableToTraceFormat` in traces (Chengzhong Wu) [#57866](https://github.com/nodejs/node/pull/57866)
- \[[`b3c507c8ef`](https://github.com/nodejs/node/commit/b3c507c8ef)] - **src**: remove duplicate assignment of `O_EXCL` in node_constants.cc (Daniel Osvaldo R) [#59049](https://github.com/nodejs/node/pull/59049)
- \[[`20aec239d4`](https://github.com/nodejs/node/commit/20aec239d4)] - **src**: add Intel CET properties to large_pages.S (tjuhaszrh) [#59363](https://github.com/nodejs/node/pull/59363)
- \[[`8e0f9cd061`](https://github.com/nodejs/node/commit/8e0f9cd061)] - **src**: remove unused DSAKeyExportJob (Filip Skokan) [#59291](https://github.com/nodejs/node/pull/59291)
- \[[`0c2b6df94f`](https://github.com/nodejs/node/commit/0c2b6df94f)] - **src,sqlite**: refactor value conversion (Edy Silva) [#59659](https://github.com/nodejs/node/pull/59659)
- \[[`b95cfdf0e5`](https://github.com/nodejs/node/commit/b95cfdf0e5)] - **stream**: replace manual function validation with validateFunction (방진혁) [#59529](https://github.com/nodejs/node/pull/59529)
- \[[`cf06e74076`](https://github.com/nodejs/node/commit/cf06e74076)] - **(SEMVER-MINOR)** **stream**: add brotli support to CompressionStream and DecompressionStream (Matthew Aitken) [#59464](https://github.com/nodejs/node/pull/59464)
- \[[`903ebd373a`](https://github.com/nodejs/node/commit/903ebd373a)] - **test**: skip more sea tests on Linux ppc64le (Richard Lau) [#59755](https://github.com/nodejs/node/pull/59755)
- \[[`e961060bb6`](https://github.com/nodejs/node/commit/e961060bb6)] - **test**: fix internet/test-dns (Michaël Zasso) [#59660](https://github.com/nodejs/node/pull/59660)
- \[[`c2b22f50a8`](https://github.com/nodejs/node/commit/c2b22f50a8)] - **test**: mark test-inspector-network-fetch as flaky again (Joyee Cheung) [#59640](https://github.com/nodejs/node/pull/59640)
- \[[`4ae958e59b`](https://github.com/nodejs/node/commit/4ae958e59b)] - **test**: skip test-fs-cp\* tests that are constantly failing on Windows (Joyee Cheung) [#59637](https://github.com/nodejs/node/pull/59637)
- \[[`d5b0a64598`](https://github.com/nodejs/node/commit/d5b0a64598)] - **test**: deflake test-http-keep-alive-empty-line (Luigi Pinca) [#59595](https://github.com/nodejs/node/pull/59595)
- \[[`eb311f1754`](https://github.com/nodejs/node/commit/eb311f1754)] - **test**: use mustSucceed in test-repl-tab-complete-import (Sohyeon Kim) [#59368](https://github.com/nodejs/node/pull/59368)
- \[[`8e047e32be`](https://github.com/nodejs/node/commit/8e047e32be)] - **test**: skip sea tests on Linux ppc64le (Richard Lau) [#59563](https://github.com/nodejs/node/pull/59563)
- \[[`4a250479d8`](https://github.com/nodejs/node/commit/4a250479d8)] - **test**: rename test-net-server-drop-connections-in-cluster.js to -http- (Meghan Denny) [#59532](https://github.com/nodejs/node/pull/59532)
- \[[`d22f113aaf`](https://github.com/nodejs/node/commit/d22f113aaf)] - **test**: lazy-load internalTTy (Pietro Marchini) [#59517](https://github.com/nodejs/node/pull/59517)
- \[[`36dd856897`](https://github.com/nodejs/node/commit/36dd856897)] - **test**: fix `test-setproctitle` status when `ps` is not available (Antoine du Hamel) [#59523](https://github.com/nodejs/node/pull/59523)
- \[[`fd02295da6`](https://github.com/nodejs/node/commit/fd02295da6)] - **test**: update WPT for WebCryptoAPI to ff26d9b307 (Node.js GitHub Bot) [#59497](https://github.com/nodejs/node/pull/59497)
- \[[`cce938c5f9`](https://github.com/nodejs/node/commit/cce938c5f9)] - **test**: make test-debug-process locale-independent (BCD1me) [#59254](https://github.com/nodejs/node/pull/59254)
- \[[`5a8f03df9e`](https://github.com/nodejs/node/commit/5a8f03df9e)] - **test**: mark test-wasi-pthread as flaky (Joyee Cheung) [#59488](https://github.com/nodejs/node/pull/59488)
- \[[`94f6d6b969`](https://github.com/nodejs/node/commit/94f6d6b969)] - **test**: split test-wasi.js (Joyee Cheung) [#59488](https://github.com/nodejs/node/pull/59488)
- \[[`162ac9393c`](https://github.com/nodejs/node/commit/162ac9393c)] - **test**: use case-insensitive path checking on Windows in fs.cpSync tests (Joyee Cheung) [#59475](https://github.com/nodejs/node/pull/59475)
- \[[`ce9d6776c9`](https://github.com/nodejs/node/commit/ce9d6776c9)] - **test**: add missing hasPostData in test-inspector-emit-protocol-event (Shima Ryuhei) [#59412](https://github.com/nodejs/node/pull/59412)
- \[[`717ea2866d`](https://github.com/nodejs/node/commit/717ea2866d)] - **test**: refactor error checks to use assert.ifError/mustSucceed (Sohyeon Kim) [#59424](https://github.com/nodejs/node/pull/59424)
- \[[`b1c3e4a17c`](https://github.com/nodejs/node/commit/b1c3e4a17c)] - **test**: fix typos (Lee Jiho) [#59330](https://github.com/nodejs/node/pull/59330)
- \[[`3f4bd94b1f`](https://github.com/nodejs/node/commit/3f4bd94b1f)] - **test**: skip test-watch-mode inspect when no inspector (James M Snell) [#59440](https://github.com/nodejs/node/pull/59440)
- \[[`8b7a8efe96`](https://github.com/nodejs/node/commit/8b7a8efe96)] - **test**: exclude mock from coverage (Shima Ryuhei) [#59348](https://github.com/nodejs/node/pull/59348)
- \[[`f39352b55c`](https://github.com/nodejs/node/commit/f39352b55c)] - **test**: split test-fs-cp.js (Joyee Cheung) [#59408](https://github.com/nodejs/node/pull/59408)
- \[[`fb4180e9f6`](https://github.com/nodejs/node/commit/fb4180e9f6)] - **test_runner**: fix todo inheritance (Moshe Atlow) [#59721](https://github.com/nodejs/node/pull/59721)
- \[[`76bf6b908d`](https://github.com/nodejs/node/commit/76bf6b908d)] - **test_runner**: set mock timer's interval undefined (hotpineapple) [#59479](https://github.com/nodejs/node/pull/59479)
- \[[`0a05d06fcc`](https://github.com/nodejs/node/commit/0a05d06fcc)] - **test_runner**: do not error when getting `fullName` of root context (René) [#59377](https://github.com/nodejs/node/pull/59377)
- \[[`3fdfb187d6`](https://github.com/nodejs/node/commit/3fdfb187d6)] - **test_runner**: fix isSkipped check in junit (Sungwon) [#59414](https://github.com/nodejs/node/pull/59414)
- \[[`37c6f7d7d8`](https://github.com/nodejs/node/commit/37c6f7d7d8)] - **test_runner**: remove unused callee convertion (Alex Yang) [#59221](https://github.com/nodejs/node/pull/59221)
- \[[`57c30093e3`](https://github.com/nodejs/node/commit/57c30093e3)] - **test_runner**: clean up promisified interval generation (René) [#58824](https://github.com/nodejs/node/pull/58824)
- \[[`88bf1bab91`](https://github.com/nodejs/node/commit/88bf1bab91)] - **test_runner**: correct "already mocked" error punctuation placement (Jacob Smith) [#58840](https://github.com/nodejs/node/pull/58840)
- \[[`d3259d660a`](https://github.com/nodejs/node/commit/d3259d660a)] - **test_runner**: prefer `Atomics` primordials (Renegade334) [#58716](https://github.com/nodejs/node/pull/58716)
- \[[`62bb80c17e`](https://github.com/nodejs/node/commit/62bb80c17e)] - **(SEMVER-MINOR)** **test_runner**: support object property mocking (Idan Goshen) [#58438](https://github.com/nodejs/node/pull/58438)
- \[[`4b19439dea`](https://github.com/nodejs/node/commit/4b19439dea)] - **tools**: print appropriate output when test aborted (hotpineapple) [#59794](https://github.com/nodejs/node/pull/59794)
- \[[`847963bbba`](https://github.com/nodejs/node/commit/847963bbba)] - **tools**: use sparse checkout in `build-tarball.yml` (Antoine du Hamel) [#59788](https://github.com/nodejs/node/pull/59788)
- \[[`ef11d118a4`](https://github.com/nodejs/node/commit/ef11d118a4)] - **tools**: remove unused actions from `build-tarball.yml` (Antoine du Hamel) [#59787](https://github.com/nodejs/node/pull/59787)
- \[[`daa0615967`](https://github.com/nodejs/node/commit/daa0615967)] - **tools**: do not attempt to compress tgz archive (Antoine du Hamel) [#59785](https://github.com/nodejs/node/pull/59785)
- \[[`fdc85e5045`](https://github.com/nodejs/node/commit/fdc85e5045)] - **tools**: add v8windbg target (Chengzhong Wu) [#59767](https://github.com/nodejs/node/pull/59767)
- \[[`25801b9009`](https://github.com/nodejs/node/commit/25801b9009)] - **tools**: improve error handling in node_mksnapshot (James M Snell) [#59437](https://github.com/nodejs/node/pull/59437)
- \[[`92100a813f`](https://github.com/nodejs/node/commit/92100a813f)] - **tools**: add sccache to `test-internet` workflow (Antoine du Hamel) [#59720](https://github.com/nodejs/node/pull/59720)
- \[[`5f0090af53`](https://github.com/nodejs/node/commit/5f0090af53)] - **tools**: update gyp-next to 0.20.4 (Node.js GitHub Bot) [#59690](https://github.com/nodejs/node/pull/59690)
- \[[`31ee7fc3e9`](https://github.com/nodejs/node/commit/31ee7fc3e9)] - **tools**: add script to make reviewing backport PRs easier (Antoine du Hamel) [#59161](https://github.com/nodejs/node/pull/59161)
- \[[`45906b0d5c`](https://github.com/nodejs/node/commit/45906b0d5c)] - **tools**: update gyp-next to 0.20.3 (Node.js GitHub Bot) [#59603](https://github.com/nodejs/node/pull/59603)
- \[[`6197eeee9b`](https://github.com/nodejs/node/commit/6197eeee9b)] - **tools**: avoid parsing test files twice (Pietro Marchini) [#59526](https://github.com/nodejs/node/pull/59526)
- \[[`027ae4f67e`](https://github.com/nodejs/node/commit/027ae4f67e)] - **tools**: fix return value of try_check_compiler (theanarkh) [#59434](https://github.com/nodejs/node/pull/59434)
- \[[`77682b52a1`](https://github.com/nodejs/node/commit/77682b52a1)] - **tools**: bump @eslint/plugin-kit from 0.3.3 to 0.3.4 in /tools/eslint (dependabot\[bot]) [#59271](https://github.com/nodejs/node/pull/59271)
- \[[`91fa83fffd`](https://github.com/nodejs/node/commit/91fa83fffd)] - **tools**: disable nullability-completeness warnings (Michaël Zasso) [#59392](https://github.com/nodejs/node/pull/59392)
- \[[`079a68d392`](https://github.com/nodejs/node/commit/079a68d392)] - **typings**: add typing for 'uv' (방진혁) [#59606](https://github.com/nodejs/node/pull/59606)
- \[[`b8927967d9`](https://github.com/nodejs/node/commit/b8927967d9)] - **typings**: add missing properties in ConfigBinding (Lee Jiho) [#59585](https://github.com/nodejs/node/pull/59585)
- \[[`9b66ce5ef7`](https://github.com/nodejs/node/commit/9b66ce5ef7)] - **typings**: add missing URLBinding methods (성우현 | Woohyun Sung) [#59468](https://github.com/nodejs/node/pull/59468)
- \[[`ba5b6597aa`](https://github.com/nodejs/node/commit/ba5b6597aa)] - **url**: add err.input to ERR_INVALID_FILE_URL_PATH (Joyee Cheung) [#59730](https://github.com/nodejs/node/pull/59730)
- \[[`f660943471`](https://github.com/nodejs/node/commit/f660943471)] - **util**: fix numericSeparator with negative fractional numbers (sangwook) [#59379](https://github.com/nodejs/node/pull/59379)
- \[[`aed1b883f1`](https://github.com/nodejs/node/commit/aed1b883f1)] - **util**: remove unnecessary template strings (btea) [#59201](https://github.com/nodejs/node/pull/59201)
- \[[`91e9b8d135`](https://github.com/nodejs/node/commit/91e9b8d135)] - **util**: remove outdated TODO comment (haramjeong) [#59760](https://github.com/nodejs/node/pull/59760)
- \[[`421ab3c294`](https://github.com/nodejs/node/commit/421ab3c294)] - **util**: use getOptionValue('--no-deprecation') in deprecated() (haramjeong) [#59760](https://github.com/nodejs/node/pull/59760)
- \[[`7864ad13bb`](https://github.com/nodejs/node/commit/7864ad13bb)] - **util**: hide duplicated stack frames when using util.inspect (Ruben Bridgewater) [#59447](https://github.com/nodejs/node/pull/59447)
- \[[`a2d2003daa`](https://github.com/nodejs/node/commit/a2d2003daa)] - **util**: fix error's namespaced node_modules highlighting using inspect (Ruben Bridgewater) [#59446](https://github.com/nodejs/node/pull/59446)
- \[[`f64d0def94`](https://github.com/nodejs/node/commit/f64d0def94)] - **util**: add some additional error classes to `wellKnownPrototypes` (Mark S. Miller) [#59456](https://github.com/nodejs/node/pull/59456)
- \[[`9807ffd6a0`](https://github.com/nodejs/node/commit/9807ffd6a0)] - **vm**: expose import attributes on SourceTextModule.moduleRequests (Chengzhong Wu) [#58829](https://github.com/nodejs/node/pull/58829)
- \[[`f334e2d539`](https://github.com/nodejs/node/commit/f334e2d539)] - **wasi**: fix `clean` target in `test/wasi/Makefile` (Antoine du Hamel) [#59576](https://github.com/nodejs/node/pull/59576)
- \[[`9e2aa23be9`](https://github.com/nodejs/node/commit/9e2aa23be9)] - **(SEMVER-MINOR)** **worker**: add cpu profile APIs for worker (theanarkh) [#59428](https://github.com/nodejs/node/pull/59428)
- \[[`c5a93a3355`](https://github.com/nodejs/node/commit/c5a93a3355)] - **worker**: fix worker name with \0 (theanarkh) [#59214](https://github.com/nodejs/node/pull/59214)
- \[[`a5ed96bb97`](https://github.com/nodejs/node/commit/a5ed96bb97)] - **worker**: add worker name to report (theanarkh) [#58935](https://github.com/nodejs/node/pull/58935)
- \[[`98cd7e27d4`](https://github.com/nodejs/node/commit/98cd7e27d4)] - **worker**: add name for worker (theanarkh) [#59213](https://github.com/nodejs/node/pull/59213)

Windows 32-bit Installer: https://nodejs.org/dist/v22.20.0/node-v22.20.0-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.20.0/node-v22.20.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.20.0/node-v22.20.0-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.20.0/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.20.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.20.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.20.0/node-v22.20.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.20.0/node-v22.20.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.20.0/node-v22.20.0.tar.gz \
Other release files: https://nodejs.org/dist/v22.20.0/ \
Documentation: https://nodejs.org/docs/v22.20.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

6a37b948ef73ae3f9d9ab6eeb4991b8ae4fc09165e1ae967acb0e8467c8ba419  node-v22.20.0-aix-ppc64.tar.gz
0567888a9467b1a412fd5b5df0609d5cbccbc4c8a35ab0ce57428ad622338467  node-v22.20.0-arm64.msi
cc04a76a09f79290194c0646f48fec40354d88969bec467789a5d55dd097f949  node-v22.20.0-darwin-arm64.tar.gz
f2ed1fbdfb79afb9343dfbb609efde657b41e7efcd5215264ce78f8906356b4d  node-v22.20.0-darwin-arm64.tar.xz
00df9c5df3e4ec6848c26b70fb47bf96492f342f4bed6b17f12d99b3a45eeecc  node-v22.20.0-darwin-x64.tar.gz
2a291f0a9555f5d6685d96ce9429da3d0ea3cd896c012702c6ee0015f818684e  node-v22.20.0-darwin-x64.tar.xz
22ba4692576442821f70156219752835a920e9ea2c0113a50fd9ebecb0ea6bbd  node-v22.20.0-headers.tar.gz
5b22cce217508d0aa96dbd0a3ed019e2903a616d47da6b24b5fe79b8bf11bb1c  node-v22.20.0-headers.tar.xz
4181609e03dcb9880e7e5bf956061ecc0503c77a480c6631d868cb1f65a2c7dd  node-v22.20.0-linux-arm64.tar.gz
06907b9c088ce62305bc1530e5c1ae1510245114645768f7750c349c5b6fe667  node-v22.20.0-linux-arm64.tar.xz
607380e96e1543c5ca6dc8a9f5575181b2855b8769fb31d646ef9cf27224f300  node-v22.20.0-linux-armv7l.tar.gz
c599a33d91c9a39b7de3319929948f91f6ac42afaa1417f4340a5cc1b2efceda  node-v22.20.0-linux-armv7l.tar.xz
f96e25a3ef6cbaa992c9bdccaf18684d12fbcbc9751bf0a85407715641f1930e  node-v22.20.0-linux-ppc64le.tar.gz
f0dae000e914ee34fdc21d1c6ce7932e698b5c6774e997d9fc03989b412413c3  node-v22.20.0-linux-ppc64le.tar.xz
53471055edba3c4f2d3a7d8d0a61b43a7b193715791c4ad01a47d99863b98980  node-v22.20.0-linux-s390x.tar.gz
2dd2c7ca14f212efab98eb589b5ae801a13aef2384305fefc0fdfa2b7bbefa9a  node-v22.20.0-linux-s390x.tar.xz
eeaccb0378b79406f2208e8b37a62479c70595e20be6b659125eb77dd1ab2a29  node-v22.20.0-linux-x64.tar.gz
00bbd05e306ea68b6e13e17360d0e2f680b493ef95f2fea1c4296ff7437530bc  node-v22.20.0-linux-x64.tar.xz
7b67da49c79ff590cc83662b5c1f74b26766590735827b5f42a1dea5ccada95c  node-v22.20.0.pkg
79a087c1e23fc97d173ad6676df5b1a4e1a02daf1acca05ee25662747c5d492c  node-v22.20.0.tar.gz
ff7a6a6e8a1312af5875e40058351c4f890d28ab64c32f12b2cc199afa22002d  node-v22.20.0.tar.xz
01ccc1b2781e5c399b88299062baa1c88d41bf33e79dfb4657c8e333de7d2290  node-v22.20.0-win-arm64.7z
b12919e609b4fa1176ba8a155b49f761419a0c7cc97b42e6be09874a3f760ab6  node-v22.20.0-win-arm64.zip
a49bc0e03dea2c57941f9d473223c0f23943f225b97fde1037800a9f146f7c19  node-v22.20.0-win-x64.7z
bb819d6eb8f5bfda294bbc83a7e4ec6539da67c4233d54b0d655b9248b15e29d  node-v22.20.0-win-x64.zip
c0987f04eb9df214ecdd4ec606170350901b4b47e223e7549332f327355c75e5  node-v22.20.0-win-x86.7z
b46cf58bae2925d1122975dc758063928eca7b6a28c676bf500ad11599d7fa03  node-v22.20.0-win-x86.zip
d6429513d63a6fba90428d6508a194212ecd7c5fd76923de91306879d28cc3e1  node-v22.20.0-x64.msi
f3641a5df86d75ab109fa59b043cf2f65450bc39980718aea75f1bfc8bdc0dcd  node-v22.20.0-x86.msi
f7dd5b44ef1bcd751107f89cc2e27f17b012be5e21b5f11f923eff84bb52a3e0  win-arm64/node.exe
e5a9e8ac859070e477a2a0613d18cfe7061d4f9ec883c49f3b7ee0b06af30f69  win-arm64/node.lib
603bfa368f191577409111f6f4b3778b39365ea8d65e10e37064a1585e4a69e5  win-arm64/node_pdb.7z
5f53aa126a1a249952222ad47507f451b7258e4d18b92fa00b4e47a4472e2e69  win-arm64/node_pdb.zip
fdddbf4581e046b8102815d56208d6a248950bb554570b81519a8a5dacfee95d  win-x64/node.exe
f9d314af772d5d4d9c0f6bd483fa204240fb9c962f874d46334b95e59900575e  win-x64/node.lib
f0311b06c21c0d7827e841bdd1ea94130c75657f18fc4e0a43dde59d2898dd97  win-x64/node_pdb.7z
a7b9db641bd1c788b98219670b40e654ec9b0d8f956bb48ed6983442dd0214a8  win-x64/node_pdb.zip
a7d17a8bcb50c576c7ab7b0086bc97cd9ca7802d9a768a012394f82f5917a018  win-x86/node.exe
4cd3f787ded9aa06378734a769c26f435651894b0325d4d9a357385b3df18462  win-x86/node.lib
1745041dcec70f787f7287b38954512f53ff02448f1c8ef53400e87f72f30210  win-x86/node_pdb.7z
707c9c70b5b98303182f82b8b75301a41616f89bd9ccb82b1fd04885047d0d13  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEyC+jrhy+3Gvka5NgxDzsRcF6uTwFAmjT7fIACgkQxDzsRcF6
uTzNEw/+MC7PMMy6npjT6XRS0NEYTJyMXcvtfp/CoMwhlFbbf0Wg1mmJwft1ZoAs
JddDKFiLpLJ2vX5cWLJZD3DWNjU85MRlRA0gCkPOEfsOEjIatGFYlPVchvRTSW4O
d9mLVqHunCRaR9WgEeNPWk3qR2msX7qGLHyL9eCbDgHMrC47Vj0Tk3X0Ejj6u7cW
Mkjc5b0B+iNmaSIOUy8ogaJO6axadzU+LbiMhc35YAvz1gRqd8TXfxIRN7F2rmmb
Uf3upKf55iKAcVwetu62rSej+ZEs/zxwPvfiMTgmdhXdoTVmKnS+YculsYdcf+1x
UsU9KnPJZHFOfLOSAoo01P5zkoW9miwsDKumbyLp0mPv9FPQNvGWi0DDgOb+GVsc
qzvFoNNV/xt3hmIq6TkCF0CqPOZJVNKZbBTtB3RN2HtZRmMuXebVHjaHTdR0MRrp
D4T39VUbkG4FNySUjT+o/6o0sU2r213M+GVQq8JECLILFTABPUb1M9MmAenw7Tmh
Fn8N2N8U1Yv369MANsY2IK+mMh02xTp6vHrt1ymuLVtAgVw6cwscf8PsGUEbXaG0
J/IxmSgN7Kz9GJ4DG865HQwNwfcuDvmBHIZEUPvt3lM4whi04ejv+GyCbJLjfo+g
uaAkwbvYeuajjKmOrSse8hMRlVgiWs0XJk/oweSAB4HH73BA25s=
=CCHb
-----END PGP SIGNATURE-----
```
