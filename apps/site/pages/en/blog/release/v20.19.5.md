---
date: '2025-09-03T18:23:30.105Z'
category: release
title: Node.js v20.19.5 (LTS)
layout: blog-post
author: Marco Ippolito
---

## 2025-09-03, Version 20.19.5 'Iron' (LTS), @marco-ippolito

### Notable Changes

- \[[`f5b293ad48`](https://github.com/nodejs/node/commit/f5b293ad48)] - **doc**: add JonasBa to collaborators (Jonas Badalic) [#58355](https://github.com/nodejs/node/pull/58355)
- \[[`4e6ae787c6`](https://github.com/nodejs/node/commit/4e6ae787c6)] - **doc**: add puskin to collaborators (Giovanni Bucci) [#58308](https://github.com/nodejs/node/pull/58308)
- \[[`d06db658fc`](https://github.com/nodejs/node/commit/d06db658fc)] - **doc**: add Filip Skokan to TSC (Rafael Gonzaga) [#58499](https://github.com/nodejs/node/pull/58499)
- \[[`3c6206cac9`](https://github.com/nodejs/node/commit/3c6206cac9)] - **doc**: add @geeksilva97 to collaborators (Edy Silva) [#57241](https://github.com/nodejs/node/pull/57241)

### Commits

- \[[`ea20403467`](https://github.com/nodejs/node/commit/ea20403467)] - **build**: fix uvwasi pkgname (Antoine du Hamel) [#58270](https://github.com/nodejs/node/pull/58270)
- \[[`c647aa4b30`](https://github.com/nodejs/node/commit/c647aa4b30)] - **build**: fix pointer compression builds (Joyee Cheung) [#58171](https://github.com/nodejs/node/pull/58171)
- \[[`d2c5e609ae`](https://github.com/nodejs/node/commit/d2c5e609ae)] - **build**: disable v8_enable_pointer_compression_shared_cage on non-64bit (Shelley Vohr) [#58867](https://github.com/nodejs/node/pull/58867)
- \[[`84d5c4d244`](https://github.com/nodejs/node/commit/84d5c4d244)] - **build**: search for libnode.so in multiple places (Jan Staněk) [#58213](https://github.com/nodejs/node/pull/58213)
- \[[`068c439552`](https://github.com/nodejs/node/commit/068c439552)] - **crypto**: fix SHAKE128/256 breaking change introduced with OpenSSL 3.4 (Filip Skokan) [#58942](https://github.com/nodejs/node/pull/58942)
- \[[`edff105c34`](https://github.com/nodejs/node/commit/edff105c34)] - **debugger**: fix behavior of plain object exec in debugger repl (Dario Piotrowicz) [#57498](https://github.com/nodejs/node/pull/57498)
- \[[`0473e35b7f`](https://github.com/nodejs/node/commit/0473e35b7f)] - **deps**: update zlib to 1.3.1-470d3a2 (Node.js GitHub Bot) [#58628](https://github.com/nodejs/node/pull/58628)
- \[[`1218dbbea5`](https://github.com/nodejs/node/commit/1218dbbea5)] - **deps**: update zlib to 1.3.0.1-motley-780819f (Node.js GitHub Bot) [#57768](https://github.com/nodejs/node/pull/57768)
- \[[`0e3cd9ec00`](https://github.com/nodejs/node/commit/0e3cd9ec00)] - **deps**: update zlib to 1.3.0.1-motley-788cb3c (Node.js GitHub Bot) [#56655](https://github.com/nodejs/node/pull/56655)
- \[[`a194dd9bd4`](https://github.com/nodejs/node/commit/a194dd9bd4)] - **deps**: update archs files for openssl-3.0.16 (Node.js GitHub Bot) [#57335](https://github.com/nodejs/node/pull/57335)
- \[[`cc9b79ca70`](https://github.com/nodejs/node/commit/cc9b79ca70)] - **deps**: upgrade openssl sources to quictls/openssl-3.0.16 (Node.js GitHub Bot) [#57335](https://github.com/nodejs/node/pull/57335)
- \[[`82c46d5358`](https://github.com/nodejs/node/commit/82c46d5358)] - **deps**: update cjs-module-lexer to 2.1.0 (Node.js GitHub Bot) [#57180](https://github.com/nodejs/node/pull/57180)
- \[[`43e3f9b26b`](https://github.com/nodejs/node/commit/43e3f9b26b)] - **deps**: update cjs-module-lexer to 2.0.0 (Michael Dawson) [#56855](https://github.com/nodejs/node/pull/56855)
- \[[`91282ff16b`](https://github.com/nodejs/node/commit/91282ff16b)] - **deps**: update corepack to 0.33.0 (Node.js GitHub Bot) [#58566](https://github.com/nodejs/node/pull/58566)
- \[[`b76bca6f38`](https://github.com/nodejs/node/commit/b76bca6f38)] - **deps**: update acorn to 8.15.0 (Node.js GitHub Bot) [#58711](https://github.com/nodejs/node/pull/58711)
- \[[`ae11481011`](https://github.com/nodejs/node/commit/ae11481011)] - **deps**: update acorn to 8.14.1 (Node.js GitHub Bot) [#57382](https://github.com/nodejs/node/pull/57382)
- \[[`142d701201`](https://github.com/nodejs/node/commit/142d701201)] - **deps**: update minimatch to 10.0.3 (Node.js GitHub Bot) [#58712](https://github.com/nodejs/node/pull/58712)
- \[[`fee082d684`](https://github.com/nodejs/node/commit/fee082d684)] - **deps**: update llhttp to 9.3.0 (Fedor Indutny) [#58144](https://github.com/nodejs/node/pull/58144)
- \[[`c06f6f3f05`](https://github.com/nodejs/node/commit/c06f6f3f05)] - **dns**: remove redundant code using common variable (Deokjin Kim) [#57386](https://github.com/nodejs/node/pull/57386)
- \[[`cded8e7e77`](https://github.com/nodejs/node/commit/cded8e7e77)] - **dns**: fix parse memory leaky (theanarkh) [#58973](https://github.com/nodejs/node/pull/58973)
- \[[`182ae67233`](https://github.com/nodejs/node/commit/182ae67233)] - **dns**: fix dns query cache implementation (Ethan Arrowood) [#58404](https://github.com/nodejs/node/pull/58404)
- \[[`621b66a297`](https://github.com/nodejs/node/commit/621b66a297)] - **doc**: add review guidelines for collaborator nominations (Antoine du Hamel) [#57449](https://github.com/nodejs/node/pull/57449)
- \[[`b1009b5b72`](https://github.com/nodejs/node/commit/b1009b5b72)] - **doc**: explicit mention arbitrary code execution as a vuln (Rafael Gonzaga) [#57426](https://github.com/nodejs/node/pull/57426)
- \[[`f5b293ad48`](https://github.com/nodejs/node/commit/f5b293ad48)] - **doc**: add JonasBa to collaborators (Jonas Badalic) [#58355](https://github.com/nodejs/node/pull/58355)
- \[[`4e6ae787c6`](https://github.com/nodejs/node/commit/4e6ae787c6)] - **doc**: add puskin to collaborators (Giovanni Bucci) [#58308](https://github.com/nodejs/node/pull/58308)
- \[[`530473f479`](https://github.com/nodejs/node/commit/530473f479)] - **doc**: add ovflowd back to core collaborators (Claudio W.) [#58911](https://github.com/nodejs/node/pull/58911)
- \[[`38e8bbc131`](https://github.com/nodejs/node/commit/38e8bbc131)] - **doc**: add info on how project manages social media (Michael Dawson) [#57318](https://github.com/nodejs/node/pull/57318)
- \[[`d06bb4dcc2`](https://github.com/nodejs/node/commit/d06bb4dcc2)] - **doc**: ping nodejs/tsc for each security pull request (Rafael Gonzaga) [#57309](https://github.com/nodejs/node/pull/57309)
- \[[`d06db658fc`](https://github.com/nodejs/node/commit/d06db658fc)] - **doc**: add Filip Skokan to TSC (Rafael Gonzaga) [#58499](https://github.com/nodejs/node/pull/58499)
- \[[`8c3bc156ed`](https://github.com/nodejs/node/commit/8c3bc156ed)] - **doc**: clarify `path.isAbsolute` is not path traversal mitigation (Eric Fortis) [#57073](https://github.com/nodejs/node/pull/57073)
- \[[`e688410bda`](https://github.com/nodejs/node/commit/e688410bda)] - **doc**: fix rendering of DEP0174 description (David Sanders) [#56835](https://github.com/nodejs/node/pull/56835)
- \[[`e6a0c6a0fa`](https://github.com/nodejs/node/commit/e6a0c6a0fa)] - **doc**: add missing assert return types (Colin Ihrig) [#57219](https://github.com/nodejs/node/pull/57219)
- \[[`026b3cab6a`](https://github.com/nodejs/node/commit/026b3cab6a)] - **doc**: add 1ilsang to triage team (1ilsang) [#57183](https://github.com/nodejs/node/pull/57183)
- \[[`3c6206cac9`](https://github.com/nodejs/node/commit/3c6206cac9)] - **doc**: add @geeksilva97 to collaborators (Edy Silva) [#57241](https://github.com/nodejs/node/pull/57241)
- \[[`ef3a4675c7`](https://github.com/nodejs/node/commit/ef3a4675c7)] - **doc**: fix web.libera.chat link in pull-requests.md (Samuel Bronson) [#57076](https://github.com/nodejs/node/pull/57076)
- \[[`1db42b76f7`](https://github.com/nodejs/node/commit/1db42b76f7)] - **doc**: remove buffered flag from performance hooks examples (Pavel Romanov) [#52607](https://github.com/nodejs/node/pull/52607)
- \[[`b73a1356ce`](https://github.com/nodejs/node/commit/b73a1356ce)] - **doc**: add `module namespace object` links (Dario Piotrowicz) [#57093](https://github.com/nodejs/node/pull/57093)
- \[[`09368db20f`](https://github.com/nodejs/node/commit/09368db20f)] - **doc**: disambiguate pseudo-code statement (Dario Piotrowicz) [#57092](https://github.com/nodejs/node/pull/57092)
- \[[`2c3dc569a1`](https://github.com/nodejs/node/commit/2c3dc569a1)] - **doc**: fix wrong articles used to address modules (Dario Piotrowicz) [#57090](https://github.com/nodejs/node/pull/57090)
- \[[`cd8259cb4e`](https://github.com/nodejs/node/commit/cd8259cb4e)] - **doc**: `modules.md`: fix `distance` definition (Alexander “weej” Jones) [#57046](https://github.com/nodejs/node/pull/57046)
- \[[`7b0ea9ab2d`](https://github.com/nodejs/node/commit/7b0ea9ab2d)] - **doc**: fix wrong verb form (Dario Piotrowicz) [#57091](https://github.com/nodejs/node/pull/57091)
- \[[`14fcfc242b`](https://github.com/nodejs/node/commit/14fcfc242b)] - **doc**: add a note about `require('../common')` in testing documentation (Aditi) [#56953](https://github.com/nodejs/node/pull/56953)
- \[[`bc7d18b6ea`](https://github.com/nodejs/node/commit/bc7d18b6ea)] - **doc**: recommend writing tests in new files and including comments (Joyee Cheung) [#57028](https://github.com/nodejs/node/pull/57028)
- \[[`acd4d7f269`](https://github.com/nodejs/node/commit/acd4d7f269)] - **doc**: improve documentation on argument validation (Aditi) [#56954](https://github.com/nodejs/node/pull/56954)
- \[[`4cd6b3ca73`](https://github.com/nodejs/node/commit/4cd6b3ca73)] - **doc**: buffer: fix typo on `Buffer.copyBytesFrom(` `offset` option (tpoisseau) [#57015](https://github.com/nodejs/node/pull/57015)
- \[[`01220607f2`](https://github.com/nodejs/node/commit/01220607f2)] - **doc**: update cleanup to trust on vuln db automation (Rafael Gonzaga) [#57004](https://github.com/nodejs/node/pull/57004)
- \[[`77a0505a32`](https://github.com/nodejs/node/commit/77a0505a32)] - **doc**: update post sec release process (Rafael Gonzaga) [#56907](https://github.com/nodejs/node/pull/56907)
- \[[`77dbcfce5f`](https://github.com/nodejs/node/commit/77dbcfce5f)] - **doc**: add section about using npx with permission model (Rafael Gonzaga) [#56539](https://github.com/nodejs/node/pull/56539)
- \[[`73e51407b7`](https://github.com/nodejs/node/commit/73e51407b7)] - **doc**: remove RedYetiDev from triagers team (Aviv Keller) [#55947](https://github.com/nodejs/node/pull/55947)
- \[[`9a36cbb792`](https://github.com/nodejs/node/commit/9a36cbb792)] - **doc**: fix relative path mention in --allow-fs (Rafael Gonzaga) [#55791](https://github.com/nodejs/node/pull/55791)
- \[[`04d9c5baeb`](https://github.com/nodejs/node/commit/04d9c5baeb)] - **doc**: add scroll margin to links (Roman Reiss) [#58982](https://github.com/nodejs/node/pull/58982)
- \[[`959a67f6ff`](https://github.com/nodejs/node/commit/959a67f6ff)] - **doc**: make Stability labels not sticky in Stability index (Livia Medeiros) [#58291](https://github.com/nodejs/node/pull/58291)
- \[[`8757a5532f`](https://github.com/nodejs/node/commit/8757a5532f)] - **doc**: update release key for aduh95 (Antoine du Hamel) [#58877](https://github.com/nodejs/node/pull/58877)
- \[[`6fa0626327`](https://github.com/nodejs/node/commit/6fa0626327)] - **doc,src,test**: fix typos (Noritaka Kobayashi) [#58477](https://github.com/nodejs/node/pull/58477)
- \[[`9991788e4a`](https://github.com/nodejs/node/commit/9991788e4a)] - **http**: coerce content-length to number (Marco Ippolito) [#57458](https://github.com/nodejs/node/pull/57458)
- \[[`ff5cf8a428`](https://github.com/nodejs/node/commit/ff5cf8a428)] - **http2**: fix check for `frame->hd.type` (hanguanqiang) [#57644](https://github.com/nodejs/node/pull/57644)
- \[[`2f333b6c51`](https://github.com/nodejs/node/commit/2f333b6c51)] - **lib**: optimize `prepareStackTrace` on builtin frames (Chengzhong Wu) [#56299](https://github.com/nodejs/node/pull/56299)
- \[[`cdf985071f`](https://github.com/nodejs/node/commit/cdf985071f)] - **lib**: suppress source map lookup exceptions (Chengzhong Wu) [#56299](https://github.com/nodejs/node/pull/56299)
- \[[`faa08b14ed`](https://github.com/nodejs/node/commit/faa08b14ed)] - **lib**: fixup incorrect argument order in assertEncoding (James M Snell) [#57177](https://github.com/nodejs/node/pull/57177)
- \[[`a683cd1232`](https://github.com/nodejs/node/commit/a683cd1232)] - **meta**: add IlyasShabi to collaborators (Ilyas Shabi) [#58916](https://github.com/nodejs/node/pull/58916)
- \[[`b145bb28aa`](https://github.com/nodejs/node/commit/b145bb28aa)] - **meta**: bump codecov/codecov-action from 5.4.2 to 5.4.3 (dependabot\[bot]) [#58551](https://github.com/nodejs/node/pull/58551)
- \[[`2c59789001`](https://github.com/nodejs/node/commit/2c59789001)] - **meta**: bump ossf/scorecard-action from 2.4.1 to 2.4.2 (dependabot\[bot]) [#58550](https://github.com/nodejs/node/pull/58550)
- \[[`4095337e96`](https://github.com/nodejs/node/commit/4095337e96)] - **meta**: bump rtCamp/action-slack-notify from 2.3.2 to 2.3.3 (dependabot\[bot]) [#58108](https://github.com/nodejs/node/pull/58108)
- \[[`631fed8e39`](https://github.com/nodejs/node/commit/631fed8e39)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#58456](https://github.com/nodejs/node/pull/58456)
- \[[`7d2f7180b6`](https://github.com/nodejs/node/commit/7d2f7180b6)] - **meta**: bump codecov/codecov-action from 5.4.0 to 5.4.2 (dependabot\[bot]) [#58110](https://github.com/nodejs/node/pull/58110)
- \[[`1558551ea5`](https://github.com/nodejs/node/commit/1558551ea5)] - **meta**: bump actions/download-artifact from 4.2.1 to 4.3.0 (dependabot\[bot]) [#58106](https://github.com/nodejs/node/pull/58106)
- \[[`e1f12fe737`](https://github.com/nodejs/node/commit/e1f12fe737)] - **meta**: ignore mailmap changes in linux ci (Jonas Badalic) [#58356](https://github.com/nodejs/node/pull/58356)
- \[[`1b78eb1313`](https://github.com/nodejs/node/commit/1b78eb1313)] - **meta**: bump actions/setup-node from 4.3.0 to 4.4.0 (dependabot\[bot]) [#58111](https://github.com/nodejs/node/pull/58111)
- \[[`2b8449c39a`](https://github.com/nodejs/node/commit/2b8449c39a)] - **meta**: bump actions/setup-python from 5.5.0 to 5.6.0 (dependabot\[bot]) [#58107](https://github.com/nodejs/node/pull/58107)
- \[[`833b70bbc5`](https://github.com/nodejs/node/commit/833b70bbc5)] - **meta**: allow penetration testing on live system with prior authorization (Matteo Collina) [#57966](https://github.com/nodejs/node/pull/57966)
- \[[`c6a88561f5`](https://github.com/nodejs/node/commit/c6a88561f5)] - **meta**: bump actions/setup-python from 5.4.0 to 5.5.0 (dependabot\[bot]) [#57718](https://github.com/nodejs/node/pull/57718)
- \[[`9046ef4fb3`](https://github.com/nodejs/node/commit/9046ef4fb3)] - **meta**: bump peter-evans/create-pull-request from 7.0.7 to 7.0.8 (dependabot\[bot]) [#57717](https://github.com/nodejs/node/pull/57717)
- \[[`46388a4e2a`](https://github.com/nodejs/node/commit/46388a4e2a)] - **meta**: bump actions/cache from 4.2.2 to 4.2.3 (dependabot\[bot]) [#57715](https://github.com/nodejs/node/pull/57715)
- \[[`d3970685bd`](https://github.com/nodejs/node/commit/d3970685bd)] - **meta**: bump actions/setup-node from 4.2.0 to 4.3.0 (dependabot\[bot]) [#57714](https://github.com/nodejs/node/pull/57714)
- \[[`47004ef37f`](https://github.com/nodejs/node/commit/47004ef37f)] - **meta**: bump actions/upload-artifact from 4.6.1 to 4.6.2 (dependabot\[bot]) [#57713](https://github.com/nodejs/node/pull/57713)
- \[[`4abe83ec03`](https://github.com/nodejs/node/commit/4abe83ec03)] - **meta**: add some clarification to the nomination process (James M Snell) [#57503](https://github.com/nodejs/node/pull/57503)
- \[[`45e9b88363`](https://github.com/nodejs/node/commit/45e9b88363)] - **meta**: remove collaborator self-nomination (Rich Trott) [#57537](https://github.com/nodejs/node/pull/57537)
- \[[`d10949b7d8`](https://github.com/nodejs/node/commit/d10949b7d8)] - **meta**: edit collaborator nomination process (Antoine du Hamel) [#57483](https://github.com/nodejs/node/pull/57483)
- \[[`704562fb7a`](https://github.com/nodejs/node/commit/704562fb7a)] - **meta**: move ovflowd to emeritus (Claudio W.) [#57443](https://github.com/nodejs/node/pull/57443)
- \[[`3f981b8537`](https://github.com/nodejs/node/commit/3f981b8537)] - **meta**: bump codecov/codecov-action from 5.3.1 to 5.4.0 (dependabot\[bot]) [#57257](https://github.com/nodejs/node/pull/57257)
- \[[`7e1ff7b332`](https://github.com/nodejs/node/commit/7e1ff7b332)] - **meta**: bump ossf/scorecard-action from 2.4.0 to 2.4.1 (dependabot\[bot]) [#57253](https://github.com/nodejs/node/pull/57253)
- \[[`8d4ec412b9`](https://github.com/nodejs/node/commit/8d4ec412b9)] - **meta**: move RaisinTen back to collaborators, triagers and SEA champion (Darshan Sen) [#57292](https://github.com/nodejs/node/pull/57292)
- \[[`cc2abb5d17`](https://github.com/nodejs/node/commit/cc2abb5d17)] - **meta**: bump peter-evans/create-pull-request from 7.0.6 to 7.0.7 (dependabot\[bot]) [#57259](https://github.com/nodejs/node/pull/57259)
- \[[`4fad2b8758`](https://github.com/nodejs/node/commit/4fad2b8758)] - **meta**: bump actions/cache from 4.2.0 to 4.2.2 (dependabot\[bot]) [#57256](https://github.com/nodejs/node/pull/57256)
- \[[`5f5bb8b986`](https://github.com/nodejs/node/commit/5f5bb8b986)] - **meta**: bump actions/upload-artifact from 4.6.0 to 4.6.1 (dependabot\[bot]) [#57255](https://github.com/nodejs/node/pull/57255)
- \[[`e949359a56`](https://github.com/nodejs/node/commit/e949359a56)] - **meta**: bump `actions/setup-python` from 5.3.0 to 5.4.0 (dependabot\[bot]) [#56867](https://github.com/nodejs/node/pull/56867)
- \[[`d3c5ad7510`](https://github.com/nodejs/node/commit/d3c5ad7510)] - **meta**: bump `peter-evans/create-pull-request` from 7.0.5 to 7.0.6 (dependabot\[bot]) [#56866](https://github.com/nodejs/node/pull/56866)
- \[[`56decfe2d1`](https://github.com/nodejs/node/commit/56decfe2d1)] - **meta**: bump `codecov/codecov-action` from 5.0.7 to 5.3.1 (dependabot\[bot]) [#56864](https://github.com/nodejs/node/pull/56864)
- \[[`52e518444d`](https://github.com/nodejs/node/commit/52e518444d)] - **meta**: bump `actions/cache` from 4.1.2 to 4.2.0 (dependabot\[bot]) [#56862](https://github.com/nodejs/node/pull/56862)
- \[[`9cac93d9c3`](https://github.com/nodejs/node/commit/9cac93d9c3)] - **meta**: bump `actions/stale` from 9.0.0 to 9.1.0 (dependabot\[bot]) [#56860](https://github.com/nodejs/node/pull/56860)
- \[[`ecf4252f7c`](https://github.com/nodejs/node/commit/ecf4252f7c)] - **meta**: update last name for jkrems (Jan Martin) [#57006](https://github.com/nodejs/node/pull/57006)
- \[[`e8beaaaedf`](https://github.com/nodejs/node/commit/e8beaaaedf)] - **meta**: bump `actions/upload-artifact` from 4.4.3 to 4.6.0 (dependabot\[bot]) [#56861](https://github.com/nodejs/node/pull/56861)
- \[[`5462c257f8`](https://github.com/nodejs/node/commit/5462c257f8)] - **meta**: bump `actions/setup-node` from 4.1.0 to 4.2.0 (dependabot\[bot]) [#56868](https://github.com/nodejs/node/pull/56868)
- \[[`89c37891a0`](https://github.com/nodejs/node/commit/89c37891a0)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#56889](https://github.com/nodejs/node/pull/56889)
- \[[`2a0175c291`](https://github.com/nodejs/node/commit/2a0175c291)] - **meta**: add @nodejs/url as codeowner (Chengzhong Wu) [#56783](https://github.com/nodejs/node/pull/56783)
- \[[`c12aae1e78`](https://github.com/nodejs/node/commit/c12aae1e78)] - **meta**: bump github/codeql-action from 3.28.18 to 3.29.2 (dependabot\[bot]) [#58922](https://github.com/nodejs/node/pull/58922)
- \[[`4ef09990f1`](https://github.com/nodejs/node/commit/4ef09990f1)] - **meta**: bump github/codeql-action from 3.28.16 to 3.28.18 (dependabot\[bot]) [#58552](https://github.com/nodejs/node/pull/58552)
- \[[`889654eb2c`](https://github.com/nodejs/node/commit/889654eb2c)] - **meta**: bump github/codeql-action from 3.28.11 to 3.28.16 (dependabot\[bot]) [#58112](https://github.com/nodejs/node/pull/58112)
- \[[`091e5c1bb9`](https://github.com/nodejs/node/commit/091e5c1bb9)] - **meta**: bump github/codeql-action from 3.28.10 to 3.28.13 (dependabot\[bot]) [#57716](https://github.com/nodejs/node/pull/57716)
- \[[`01415153de`](https://github.com/nodejs/node/commit/01415153de)] - **meta**: bump github/codeql-action from 3.28.8 to 3.28.10 (dependabot\[bot]) [#57254](https://github.com/nodejs/node/pull/57254)
- \[[`72ea8aac34`](https://github.com/nodejs/node/commit/72ea8aac34)] - **meta**: bump `github/codeql-action` from 3.27.5 to 3.28.8 (dependabot\[bot]) [#56859](https://github.com/nodejs/node/pull/56859)
- \[[`99a271e588`](https://github.com/nodejs/node/commit/99a271e588)] - **meta**: bump step-security/harden-runner from 2.12.0 to 2.12.2 (dependabot\[bot]) [#58923](https://github.com/nodejs/node/pull/58923)
- \[[`b4c4c02490`](https://github.com/nodejs/node/commit/b4c4c02490)] - **meta**: bump step-security/harden-runner from 2.11.0 to 2.12.0 (dependabot\[bot]) [#58109](https://github.com/nodejs/node/pull/58109)
- \[[`5361bb9157`](https://github.com/nodejs/node/commit/5361bb9157)] - **meta**: bump step-security/harden-runner from 2.10.4 to 2.11.0 (dependabot\[bot]) [#57258](https://github.com/nodejs/node/pull/57258)
- \[[`28e33acf30`](https://github.com/nodejs/node/commit/28e33acf30)] - **meta**: bump `step-security/harden-runner` from 2.10.2 to 2.10.4 (dependabot\[bot]) [#56863](https://github.com/nodejs/node/pull/56863)
- \[[`fad773cede`](https://github.com/nodejs/node/commit/fad773cede)] - **module**: throw error when re-runing errored module jobs (Joyee Cheung) [#58957](https://github.com/nodejs/node/pull/58957)
- \[[`2531185423`](https://github.com/nodejs/node/commit/2531185423)] - **module**: allow cycles in require() in the CJS handling in ESM loader (Joyee Cheung) [#58598](https://github.com/nodejs/node/pull/58598)
- \[[`ed43b69689`](https://github.com/nodejs/node/commit/ed43b69689)] - **module**: clarify cjs global-like error on ModuleJobSync (Carlos Espa) [#56491](https://github.com/nodejs/node/pull/56491)
- \[[`6e02db1b12`](https://github.com/nodejs/node/commit/6e02db1b12)] - **module**: handle instantiated async module jobs in require(esm) (Joyee Cheung) [#58067](https://github.com/nodejs/node/pull/58067)
- \[[`badba50d30`](https://github.com/nodejs/node/commit/badba50d30)] - **module**: fix incorrect formatting in require(esm) cycle error message (haykam821) [#57453](https://github.com/nodejs/node/pull/57453)
- \[[`939ecf8906`](https://github.com/nodejs/node/commit/939ecf8906)] - **module**: handle cached linked async jobs in require(esm) (Joyee Cheung) [#57187](https://github.com/nodejs/node/pull/57187)
- \[[`ba7f8a0353`](https://github.com/nodejs/node/commit/ba7f8a0353)] - **module**: improve error message from asynchronicity in require(esm) (Joyee Cheung) [#57126](https://github.com/nodejs/node/pull/57126)
- \[[`c1e7fa2586`](https://github.com/nodejs/node/commit/c1e7fa2586)] - **module**: handle .mjs in .js handler in CommonJS (Joyee Cheung) [#55590](https://github.com/nodejs/node/pull/55590)
- \[[`41f3dfd21b`](https://github.com/nodejs/node/commit/41f3dfd21b)] - **module**: fix require.resolve() crash on non-string paths (Aditi) [#56942](https://github.com/nodejs/node/pull/56942)
- \[[`043dcdd628`](https://github.com/nodejs/node/commit/043dcdd628)] - **os**: fix GetInterfaceAddresses memory lieaky (theanarkh) [#58940](https://github.com/nodejs/node/pull/58940)
- \[[`9b74e9bfd9`](https://github.com/nodejs/node/commit/9b74e9bfd9)] - **permission**: ignore internalModuleStat on module loading (Rafael Gonzaga) [#55797](https://github.com/nodejs/node/pull/55797)
- \[[`611a147b45`](https://github.com/nodejs/node/commit/611a147b45)] - **readline**: fix unresolved promise on abortion (Daniel Venable) [#54030](https://github.com/nodejs/node/pull/54030)
- \[[`f891ae3421`](https://github.com/nodejs/node/commit/f891ae3421)] - **repl**: avoid deprecated `require.extensions` in tab completion (baki gul) [#58653](https://github.com/nodejs/node/pull/58653)
- \[[`7ba44290bf`](https://github.com/nodejs/node/commit/7ba44290bf)] - **repl**: fix tab completion not working with computer string properties (Dario Piotrowicz) [#58709](https://github.com/nodejs/node/pull/58709)
- \[[`eb842048b2`](https://github.com/nodejs/node/commit/eb842048b2)] - **src**: do not format single string argument for THROW_ERR\_\* (Joyee Cheung) [#57126](https://github.com/nodejs/node/pull/57126)
- \[[`4f004937ec`](https://github.com/nodejs/node/commit/4f004937ec)] - **src**: fixup errorhandling more in various places (James M Snell) [#57852](https://github.com/nodejs/node/pull/57852)
- \[[`5daa7fe2e2`](https://github.com/nodejs/node/commit/5daa7fe2e2)] - **src**: fix module buffer allocation (X-BW) [#57738](https://github.com/nodejs/node/pull/57738)
- \[[`586b1be11b`](https://github.com/nodejs/node/commit/586b1be11b)] - **src**: fix build when using shared simdutf (Antoine du Hamel) [#58407](https://github.com/nodejs/node/pull/58407)
- \[[`563e61f012`](https://github.com/nodejs/node/commit/563e61f012)] - **src**: fix possible dereference of null pointer (Eusgor) [#58459](https://github.com/nodejs/node/pull/58459)
- \[[`cbec07ea0b`](https://github.com/nodejs/node/commit/cbec07ea0b)] - **src**: fix FIPS init error handling (Tobias Nießen) [#58379](https://github.com/nodejs/node/pull/58379)
- \[[`80fb80e71b`](https://github.com/nodejs/node/commit/80fb80e71b)] - **src**: fix -Wunreachable-code in src/node_api.cc (Shelley Vohr) [#58901](https://github.com/nodejs/node/pull/58901)
- \[[`5e97719860`](https://github.com/nodejs/node/commit/5e97719860)] - **test**: skip test-http-imports on macos (Marco Ippolito) [#59745](https://github.com/nodejs/node/pull/59745)
- \[[`69c43bdfcc`](https://github.com/nodejs/node/commit/69c43bdfcc)] - **test**: fix internet/test-dns (Michaël Zasso) [#59660](https://github.com/nodejs/node/pull/59660)
- \[[`6fd58e0338`](https://github.com/nodejs/node/commit/6fd58e0338)] - **tools**: update coverage GitHub Actions to fixed version (Rich Trott) [#59512](https://github.com/nodejs/node/pull/59512)
- \[[`eb7bbce73e`](https://github.com/nodejs/node/commit/eb7bbce73e)] - **tools**: disable failing coverage jobs (Antoine du Hamel) [#58770](https://github.com/nodejs/node/pull/58770)
- \[[`65b1669936`](https://github.com/nodejs/node/commit/65b1669936)] - **util**: fix formatting of objects with built-in Symbol.toPrimitive (Shima Ryuhei) [#57832](https://github.com/nodejs/node/pull/57832)
- \[[`8a29f13bec`](https://github.com/nodejs/node/commit/8a29f13bec)] - **util**: fix parseEnv incorrectly splitting multiple ‘=‘ in value (HEESEUNG) [#57421](https://github.com/nodejs/node/pull/57421)
- \[[`077d5020c4`](https://github.com/nodejs/node/commit/077d5020c4)] - **v8**: fix missing callback in heap utils destroy (Ruben Bridgewater) [#58846](https://github.com/nodejs/node/pull/58846)
- \[[`34ae9f8b18`](https://github.com/nodejs/node/commit/34ae9f8b18)] - **vm**: import call should return a promise in the current context (Chengzhong Wu) [#58309](https://github.com/nodejs/node/pull/58309)
- \[[`0dd3a8d6d1`](https://github.com/nodejs/node/commit/0dd3a8d6d1)] - **win,build**: fix MSVS v17.14 compilation issue (StefanStojanovic) [#58902](https://github.com/nodejs/node/pull/58902)
- \[[`1b83a2bd2d`](https://github.com/nodejs/node/commit/1b83a2bd2d)] - **zlib**: remove mentions of unexposed Z_TREES constant (Jimmy Leung) [#58371](https://github.com/nodejs/node/pull/58371)
- \[[`9dc9604502`](https://github.com/nodejs/node/commit/9dc9604502)] - **zlib**: fix pointer alignment (jhofstee) [#57727](https://github.com/nodejs/node/pull/57727)

Windows 32-bit Installer: https://nodejs.org/dist/v20.19.5/node-v20.19.5-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.19.5/node-v20.19.5-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.19.5/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.19.5/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.19.5/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.19.5/node-v20.19.5.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.19.5/node-v20.19.5-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.19.5/node-v20.19.5.tar.gz \
Other release files: https://nodejs.org/dist/v20.19.5/ \
Documentation: https://nodejs.org/docs/v20.19.5/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

ee9dd8680fccc5191aa38c09d969ec67d59b8e1c19a8fbca9cccee6174974dd6  node-v20.19.5-aix-ppc64.tar.gz
09d6a9cbf6b7b644a46b8f3a1a7cc966eaa627c071158aa7774e886da3ac8f54  node-v20.19.5-arm64.msi
cfed7503d8d99fbcf2f52e408ec52f616058eb0867b34dbc3437259993ef5cba  node-v20.19.5-darwin-arm64.tar.gz
7459fb9961a84f726745d4b4f1fbe12cf8a6f7388e1568cd77f6c14cc39a9e53  node-v20.19.5-darwin-arm64.tar.xz
f9cff058f2766d4d0631dc69b5f7f27664b3a42ff186e25ac7e1ac269af7e696  node-v20.19.5-darwin-x64.tar.gz
fa932d72558be9806d64acfe832d34d43fe2743554d6a23b4190b959a1b99084  node-v20.19.5-darwin-x64.tar.xz
4ea2f359a9b0c592732ee0fda5eed25ff63d81ed8d4834236131b04c945d8d71  node-v20.19.5-headers.tar.gz
63ffe7c8e3cdce5c1a75d8ad8ed1d2dc3956343d012bec84e7c51a182ca8824f  node-v20.19.5-headers.tar.xz
a08b513de673853ca16395ec461a104a99bf0e941ebb7baedb98b30cd221d8cc  node-v20.19.5-linux-arm64.tar.gz
d462267863ae8ee556039ebdf559055a8ec562c633889ef1403f3adb449ba1dd  node-v20.19.5-linux-arm64.tar.xz
3237e6c5c3a34bbb7db4f4f7c8c3618bd67452a8bee0b77abd6e791e527b366e  node-v20.19.5-linux-armv7l.tar.gz
a8236299680e1d7267454971a31e0f770859000ac5a5ad87ad6603415b033d9b  node-v20.19.5-linux-armv7l.tar.xz
11be028464768c8704ba8b4fba6e1c0eb0cfbab1c12c9e6eda5fa51df60326cc  node-v20.19.5-linux-ppc64le.tar.gz
ef98025e71d6d498476a95f144e353be074b24431b22eaa81bc64f921ea7d57f  node-v20.19.5-linux-ppc64le.tar.xz
a0e5a52c8ab552a0255520d60d3209d97913d6229d9bb05c56135be8f41ae79e  node-v20.19.5-linux-s390x.tar.gz
a2e56c4b7fbffd0e6eef3a89e1c5945962fe85b4e2acfa59edc77a9238cc7901  node-v20.19.5-linux-s390x.tar.xz
4eba5fbe1fb10753bc06e42f001a91c5cec16798b7764a3e9257adc59af47fe1  node-v20.19.5-linux-x64.tar.gz
315046739a513a70e03a4a55a8afda8cf979f30852e576075c340084e3f8ac0f  node-v20.19.5-linux-x64.tar.xz
26671da1228cded8e6e3f4300d47cbc2abcb5b8fb3d23b2393005182b87f5525  node-v20.19.5.pkg
b34d3f57666d91deb6a148b604d7f2f4051d540087e9f6c627dedc1fcb866d5a  node-v20.19.5.tar.gz
230c899f4e2489c4b8d2232edd6cc02f384fb2397c2a246a22e415837ee5da51  node-v20.19.5.tar.xz
975e7d216a2adabc05aaa1bec92f3739f7450f3ba9bacae507314faeef3ce515  node-v20.19.5-win-arm64.7z
5010e32f6b40699b27dc5fa1d8bb9d77bdcd55e9f62d2baa5d83833d20fa41c6  node-v20.19.5-win-arm64.zip
f8047bf438c5dd71b59023aaa09d89b0f52f7fcc481d7a6c532f8ff3e6f556d9  node-v20.19.5-win-x64.7z
c48159529572a5a947eef2d55d6485dfdc4ce8e67216402e2f6de52ad5d95695  node-v20.19.5-win-x64.zip
9d2cedf94547ccf2efe4367ef131ea9715d9db529208903e912d1ca076e848e1  node-v20.19.5-win-x86.7z
ae22df41159669f7f2ca21c166ef3edc455210b6fa662a4321e2eba2dfd306bc  node-v20.19.5-win-x86.zip
77576de0ec79d0e079573ab1ff16a007fe5203d66284156b56039a55a2a46db0  node-v20.19.5-x64.msi
5b5495f3a82324175f530f7ea6d52140903ed9ce32ff3462f4719e053c3c3bbc  node-v20.19.5-x86.msi
c1a2f77d15361ee7f52ce9baddae9bfc74282323eccb96da6dd12e329b39a384  win-arm64/node.exe
dd8b0acfe80fa4ac731561848405b173cdc16ade8347e0ebb59bdb7aee668ed1  win-arm64/node.lib
e69e13c3a760d87e29e441ccdc95d91e6d4f9307d989472df80c51a65aee3a5b  win-arm64/node_pdb.7z
6888ddb1259551a24b26b8ca1883a0a08126ca23d17cc6504c682aeaa1665310  win-arm64/node_pdb.zip
e6ff5f7fefa7a94fb97ed86a9578dcf65df1bd5d0ab3117e6cb9b9c0bc74e17a  win-x64/node.exe
7d545cfcf38456553e83f419c72e91bf9bc80500bf8c0f3f838a7be020e88def  win-x64/node.lib
857026cab1595279985d399f186523fa85b0fe336adb3cc4414a96a507dcc1d8  win-x64/node_pdb.7z
a70c814f6ea5e8c06bf08f6644a883be9e8479362bce639ef8caf62fd2345cf4  win-x64/node_pdb.zip
2586a2e32ec1b0188a9ef7b35b41f53d63e3f4f7211d0b79dd7c72ae9a97123c  win-x86/node.exe
d22e597766b0a8de355d244cd9417f8b67bbbc39e8a66ae2e1009ee4c7409bb2  win-x86/node.lib
1c0df091310a896b06a063f5c3933d6f7fbbc15200e0b55903e3156aec543a2f  win-x86/node_pdb.7z
08c388afc39fc4ef7b83305c851c7f67c59ff5d363c54551be2b0d3014282a7b  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEzGj1oxBv9EgyLkjtJ/XjjVsKIV8FAmi4husACgkQJ/XjjVsK
IV9MCw//QYfSu3zho5qwDQEBHNVvxOk+oS/JKYRY7nnF3eBMROHDj24LJhylhncd
U8OjT+vUjln0U9x+Uh0nPxNBPQ4mwXpx++xm+XfN0GAtzwqlFodBZvv3vwzifKzd
xtBAuClv0yBgCymiBIVKFw2szkDnbzmmrvA0Nvqe0zM8mLNP6Z7I1Jt/nJKNtr61
afN4bHgLGV9QpGgPdTGbOirzOvrK5m7KIpHjgX5jHsLvofynHGLUPJbXTtd7QJmD
FoEYBOJ/gyOXH+5KpfVzs0kXb5JFxA9IyZdETIIeGG+85t5qu5eaNf3LTU7VMYl6
TuIgqtJ3hpWKR4VGEQt3IA5OWkJqCCRRoZ/GVaAbCXdlnNir/vcpwWoSEoBWMNDY
6L5S5/kNELuhn7JzOezDK545M7FTKrJ2NYdRltRhCL43IXYRnbMbjQ37uCIvii8+
mfV7WDXg6VjVzh1l5eqG4ymMGo1y83hsW6lrvIF4MTCeb6e5PkJwpegY16sulsLe
+tW3TgLBgVT1oUGwB4zD79gDWKmplaw+Rm+Fnk1i+GPRN4hm3IjYuhFedbsf7FtL
OBy0OY1ySLs+EKM3hMf+IrrqKVtdCSh9zUbn4LUMneEdlD9qJ0Wt2dEn44un1fBu
Clvke7Me4Wg2rQ5tG6+7gcrPy6/laNLEQv6mcgbmmCWP5Egrkco=
=eLlf
-----END PGP SIGNATURE-----
```
