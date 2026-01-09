---
date: '2025-06-23T08:36:48.302Z'
category: release
title: Node.js 20.19.3 (LTS)
layout: blog-post
author: Marco Ippolito
---

## 2025-06-23, Version 20.19.3 'Iron' (LTS), @marco-ippolito

### Notable Changes

- \[[`c535a3c483`](https://github.com/nodejs/node/commit/c535a3c483)] - **crypto**: graduate WebCryptoAPI Ed25519 and X25519 algorithms as stable (Filip Skokan) [#56142](https://github.com/nodejs/node/pull/56142)
- \[[`af1dc63815`](https://github.com/nodejs/node/commit/af1dc63815)] - **crypto**: update root certificates to NSS 3.108 (Node.js GitHub Bot) [#57381](https://github.com/nodejs/node/pull/57381)
- \[[`01d63a4ddf`](https://github.com/nodejs/node/commit/01d63a4ddf)] - **deps**: update timezone to 2025b (Node.js GitHub Bot) [#57857](https://github.com/nodejs/node/pull/57857)
- \[[`b6daa344eb`](https://github.com/nodejs/node/commit/b6daa344eb)] - **doc**: add dario-piotrowicz to collaborators (Dario Piotrowicz) [#58102](https://github.com/nodejs/node/pull/58102)

### Commits

- \[[`fc1fa7a357`](https://github.com/nodejs/node/commit/fc1fa7a357)] - **build**: use FILE_OFFSET_BITS=64 esp. on 32-bit arch (RafaelGSS) [#58090](https://github.com/nodejs/node/pull/58090)
- \[[`79e0812181`](https://github.com/nodejs/node/commit/79e0812181)] - **build**: use glob for dependencies of out/Makefile (Richard Lau) [#55789](https://github.com/nodejs/node/pull/55789)
- \[[`f56e62851a`](https://github.com/nodejs/node/commit/f56e62851a)] - **crypto**: allow length=0 for HKDF and PBKDF2 in SubtleCrypto.deriveBits (Filip Skokan) [#55866](https://github.com/nodejs/node/pull/55866)
- \[[`c535a3c483`](https://github.com/nodejs/node/commit/c535a3c483)] - **crypto**: graduate WebCryptoAPI Ed25519 and X25519 algorithms as stable (Filip Skokan) [#56142](https://github.com/nodejs/node/pull/56142)
- \[[`39925de8b1`](https://github.com/nodejs/node/commit/39925de8b1)] - **crypto**: allow non-multiple of 8 in SubtleCrypto.deriveBits (Filip Skokan) [#55296](https://github.com/nodejs/node/pull/55296)
- \[[`af1dc63815`](https://github.com/nodejs/node/commit/af1dc63815)] - **crypto**: update root certificates to NSS 3.108 (Node.js GitHub Bot) [#57381](https://github.com/nodejs/node/pull/57381)
- \[[`d09008add3`](https://github.com/nodejs/node/commit/d09008add3)] - **deps**: V8: cherry-pick 1a3ecc2483b2 (Michaël Zasso) [#58342](https://github.com/nodejs/node/pull/58342)
- \[[`fd56652425`](https://github.com/nodejs/node/commit/fd56652425)] - **deps**: V8: cherry-pick 182d9c05e78b (Andrey Kosyakov) [#58342](https://github.com/nodejs/node/pull/58342)
- \[[`447481e829`](https://github.com/nodejs/node/commit/447481e829)] - **deps**: V8: cherry-pick third_party/zlib\@646b7f569718 (Hans Wennborg) [#58342](https://github.com/nodejs/node/pull/58342)
- \[[`eb447168df`](https://github.com/nodejs/node/commit/eb447168df)] - **deps**: update simdutf to 6.4.2 (Node.js GitHub Bot) [#57855](https://github.com/nodejs/node/pull/57855)
- \[[`01d63a4ddf`](https://github.com/nodejs/node/commit/01d63a4ddf)] - **deps**: update timezone to 2025b (Node.js GitHub Bot) [#57857](https://github.com/nodejs/node/pull/57857)
- \[[`10fb49f2a9`](https://github.com/nodejs/node/commit/10fb49f2a9)] - **deps**: update icu to 77.1 (Node.js GitHub Bot) [#57455](https://github.com/nodejs/node/pull/57455)
- \[[`f1dc7d0205`](https://github.com/nodejs/node/commit/f1dc7d0205)] - **deps**: update corepack to 0.32.0 (Node.js GitHub Bot) [#57265](https://github.com/nodejs/node/pull/57265)
- \[[`7a2e64bb8a`](https://github.com/nodejs/node/commit/7a2e64bb8a)] - **deps**: update simdutf to 6.4.0 (Node.js GitHub Bot) [#56764](https://github.com/nodejs/node/pull/56764)
- \[[`e80669be0d`](https://github.com/nodejs/node/commit/e80669be0d)] - **doc**: mention reports should align with Node.js CoC (Rafael Gonzaga) [#57607](https://github.com/nodejs/node/pull/57607)
- \[[`7b2c0bc92e`](https://github.com/nodejs/node/commit/7b2c0bc92e)] - **doc**: add gurgunday as triager (Gürgün Dayıoğlu) [#57594](https://github.com/nodejs/node/pull/57594)
- \[[`791e4879de`](https://github.com/nodejs/node/commit/791e4879de)] - **doc**: document REPL custom eval arguments (Dario Piotrowicz) [#57690](https://github.com/nodejs/node/pull/57690)
- \[[`2917f09876`](https://github.com/nodejs/node/commit/2917f09876)] - **doc**: improved fetch docs (Alessandro Miliucci) [#57296](https://github.com/nodejs/node/pull/57296)
- \[[`d940b15843`](https://github.com/nodejs/node/commit/d940b15843)] - **doc**: clarify `unhandledRejection` events behaviors in process doc (Dario Piotrowicz) [#57654](https://github.com/nodejs/node/pull/57654)
- \[[`71c664fab7`](https://github.com/nodejs/node/commit/71c664fab7)] - **doc**: update position type to integer | null in fs (Yukihiro Hasegawa) [#57745](https://github.com/nodejs/node/pull/57745)
- \[[`0c0fbfa9c6`](https://github.com/nodejs/node/commit/0c0fbfa9c6)] - **doc**: add missing v0.x changelog entries (Antoine du Hamel) [#57779](https://github.com/nodejs/node/pull/57779)
- \[[`e99462c9fc`](https://github.com/nodejs/node/commit/e99462c9fc)] - **doc**: correct deprecation type of `assert.CallTracker` (René) [#57997](https://github.com/nodejs/node/pull/57997)
- \[[`c7e92696ef`](https://github.com/nodejs/node/commit/c7e92696ef)] - **doc**: add returns for https.get (Eng Zer Jun) [#58025](https://github.com/nodejs/node/pull/58025)
- \[[`ccc42b69ce`](https://github.com/nodejs/node/commit/ccc42b69ce)] - **doc**: fix env variable name in `util.styleText` (Antoine du Hamel) [#58072](https://github.com/nodejs/node/pull/58072)
- \[[`b6daa344eb`](https://github.com/nodejs/node/commit/b6daa344eb)] - **doc**: add dario-piotrowicz to collaborators (Dario Piotrowicz) [#58102](https://github.com/nodejs/node/pull/58102)
- \[[`e5d6a3df16`](https://github.com/nodejs/node/commit/e5d6a3df16)] - **doc**: fix `AsyncLocalStorage` example response changes after node v18 (Naor Tedgi (Abu Emma)) [#57969](https://github.com/nodejs/node/pull/57969)
- \[[`f006411998`](https://github.com/nodejs/node/commit/f006411998)] - **doc**: fix typo of file `zlib.md` (yusheng chen) [#58093](https://github.com/nodejs/node/pull/58093)
- \[[`5193735df4`](https://github.com/nodejs/node/commit/5193735df4)] - **doc**: add missing options.signal to readlinePromises.createInterface() (Jimmy Leung) [#55456](https://github.com/nodejs/node/pull/55456)
- \[[`fd44af730f`](https://github.com/nodejs/node/commit/fd44af730f)] - **doc**: fix misaligned options in vm.compileFunction() (Jimmy Leung) [#58145](https://github.com/nodejs/node/pull/58145)
- \[[`0fdcc0ddcd`](https://github.com/nodejs/node/commit/0fdcc0ddcd)] - **doc**: add ambassaor message (Brian Muenzenmeyer) [#57600](https://github.com/nodejs/node/pull/57600)
- \[[`5ca9616bd3`](https://github.com/nodejs/node/commit/5ca9616bd3)] - **doc**: increase z-index of header element (Dario Piotrowicz) [#57851](https://github.com/nodejs/node/pull/57851)
- \[[`81342d10f0`](https://github.com/nodejs/node/commit/81342d10f0)] - **doc**: fix deprecation type for `DEP0148` (Livia Medeiros) [#57785](https://github.com/nodejs/node/pull/57785)
- \[[`776becfe01`](https://github.com/nodejs/node/commit/776becfe01)] - **doc**: remove mention of `--require` not supporting ES modules (Huáng Jùnliàng) [#57620](https://github.com/nodejs/node/pull/57620)
- \[[`3140a8f133`](https://github.com/nodejs/node/commit/3140a8f133)] - **doc**: add missing `deprecated` badges in `fs.md` (Yukihiro Hasegawa) [#57384](https://github.com/nodejs/node/pull/57384)
- \[[`441ce24ae3`](https://github.com/nodejs/node/commit/441ce24ae3)] - **doc**: deprecate passing invalid types in `fs.existsSync` (Carlos Espa) [#55892](https://github.com/nodejs/node/pull/55892)
- \[[`0556f54544`](https://github.com/nodejs/node/commit/0556f54544)] - **http**: correctly translate HTTP method (Paolo Insogna) [#52701](https://github.com/nodejs/node/pull/52701)
- \[[`c2c6d2b035`](https://github.com/nodejs/node/commit/c2c6d2b035)] - **http**: be more generational GC friendly (ywave620) [#56767](https://github.com/nodejs/node/pull/56767)
- \[[`cdf3fa241c`](https://github.com/nodejs/node/commit/cdf3fa241c)] - **http2**: skip writeHead if stream is closed (Shima Ryuhei) [#57686](https://github.com/nodejs/node/pull/57686)
- \[[`bbd5aec785`](https://github.com/nodejs/node/commit/bbd5aec785)] - **http2**: fix graceful session close (Kushagra Pandey) [#57808](https://github.com/nodejs/node/pull/57808)
- \[[`b427ae4f34`](https://github.com/nodejs/node/commit/b427ae4f34)] - **meta**: remove `build-windows.yml` (Aviv Keller) [#54662](https://github.com/nodejs/node/pull/54662)
- \[[`49e624f554`](https://github.com/nodejs/node/commit/49e624f554)] - **os**: fix netmask format check condition in getCIDR function (Wiyeong Seo) [#57324](https://github.com/nodejs/node/pull/57324)
- \[[`d582954434`](https://github.com/nodejs/node/commit/d582954434)] - **src**: remove unused variable in crypto_x509.cc (Michaël Zasso) [#57754](https://github.com/nodejs/node/pull/57754)
- \[[`234a505e96`](https://github.com/nodejs/node/commit/234a505e96)] - **src**: allow embedder customization of OOMErrorHandler (Shelley Vohr) [#57325](https://github.com/nodejs/node/pull/57325)
- \[[`c0252cd380`](https://github.com/nodejs/node/commit/c0252cd380)] - **src**: fix -Wunreachable-code-return in node_sea (Shelley Vohr) [#57664](https://github.com/nodejs/node/pull/57664)
- \[[`fcd1622fc1`](https://github.com/nodejs/node/commit/fcd1622fc1)] - **src**: fix kill signal 0 on Windows (Stefan Stojanovic) [#57695](https://github.com/nodejs/node/pull/57695)
- \[[`850192b06b`](https://github.com/nodejs/node/commit/850192b06b)] - **test**: skip broken sea on rhel8 (Marco Ippolito) [#58761](https://github.com/nodejs/node/pull/58761)
- \[[`3cf7cfb695`](https://github.com/nodejs/node/commit/3cf7cfb695)] - **test**: update WPT for WebCryptoAPI to edd42c005c (Node.js GitHub Bot) [#57365](https://github.com/nodejs/node/pull/57365)
- \[[`f57765bdcf`](https://github.com/nodejs/node/commit/f57765bdcf)] - **test**: mark test-without-async-context-frame flaky on windows (James M Snell) [#56753](https://github.com/nodejs/node/pull/56753)
- \[[`275ea8e7ef`](https://github.com/nodejs/node/commit/275ea8e7ef)] - **test**: force GC in test-file-write-stream4 (Luigi Pinca) [#57930](https://github.com/nodejs/node/pull/57930)
- \[[`da6a13c338`](https://github.com/nodejs/node/commit/da6a13c338)] - **test**: deflake test-http2-options-max-headers-block-length (Luigi Pinca) [#57959](https://github.com/nodejs/node/pull/57959)
- \[[`56fce6691e`](https://github.com/nodejs/node/commit/56fce6691e)] - **test**: prevent extraneous HOSTNAME substitution in test-runner-output (René) [#58076](https://github.com/nodejs/node/pull/58076)
- \[[`c9c0be5596`](https://github.com/nodejs/node/commit/c9c0be5596)] - **test**: update expected error message for macOS (Antoine du Hamel) [#57742](https://github.com/nodejs/node/pull/57742)
- \[[`3cbf5f93d2`](https://github.com/nodejs/node/commit/3cbf5f93d2)] - **test**: fix missing edge case in test-blob-slice-with-large-size (Joyee Cheung) [#58414](https://github.com/nodejs/node/pull/58414)
- \[[`bffd4ec379`](https://github.com/nodejs/node/commit/bffd4ec379)] - **test**: skip in test-buffer-tostring-rangeerror on allocation failure (Joyee Cheung) [#58415](https://github.com/nodejs/node/pull/58415)
- \[[`8237346fb7`](https://github.com/nodejs/node/commit/8237346fb7)] - **test,crypto**: update WebCryptoAPI WPT (Filip Skokan) [#54593](https://github.com/nodejs/node/pull/54593)
- \[[`b90c4ab937`](https://github.com/nodejs/node/commit/b90c4ab937)] - **tools**: remove unused `osx-pkg-postinstall.sh` (Antoine du Hamel) [#57667](https://github.com/nodejs/node/pull/57667)
- \[[`414013dcfb`](https://github.com/nodejs/node/commit/414013dcfb)] - **tools**: edit create-release-proposal workflow to handle pr body length (Elves Vieira) [#57841](https://github.com/nodejs/node/pull/57841)
- \[[`7c449ed6b3`](https://github.com/nodejs/node/commit/7c449ed6b3)] - **tools**: fix tarball testing directory (Marco Ippolito) [#57994](https://github.com/nodejs/node/pull/57994)
- \[[`d164dc2d38`](https://github.com/nodejs/node/commit/d164dc2d38)] - **tools**: update sccache version to v0.10.0 (Marco Ippolito) [#57994](https://github.com/nodejs/node/pull/57994)
- \[[`debd3c2cc0`](https://github.com/nodejs/node/commit/debd3c2cc0)] - **tools**: disable failing test envs in `test-linux` CI (Antoine du Hamel) [#58351](https://github.com/nodejs/node/pull/58351)
- \[[`152112505a`](https://github.com/nodejs/node/commit/152112505a)] - **typings**: fix `ImportModuleDynamicallyCallback` return type (Chengzhong Wu) [#57160](https://github.com/nodejs/node/pull/57160)
- \[[`363bf744ab`](https://github.com/nodejs/node/commit/363bf744ab)] - **worker**: flush stdout and stderr on exit (Matteo Collina) [#56428](https://github.com/nodejs/node/pull/56428)

Windows 32-bit Installer: https://nodejs.org/dist/v20.19.3/node-v20.19.3-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.19.3/node-v20.19.3-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.19.3/node-v20.19.3-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.19.3/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.19.3/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.19.3/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.19.3/node-v20.19.3.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.19.3/node-v20.19.3-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.19.3/node-v20.19.3.tar.gz \
Other release files: https://nodejs.org/dist/v20.19.3/ \
Documentation: https://nodejs.org/docs/v20.19.3/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

3166216d8bb83dca6850643d585189e657b6038cf5e8331181fff7300a6d9f98  node-v20.19.3-aix-ppc64.tar.gz
44025e0da20a2367bce810bf09a7bc5f3d9b61d47aece23aa97dcddfc941c2df  node-v20.19.3-arm64.msi
4efd92305e36e6e9f8cfe8d7781b188eec86f306ca712535ecf2c10dc8c1ae13  node-v20.19.3-darwin-arm64.tar.gz
d0103b7025c5f738df8890cd79213d3a4cfb59536f5063ee615f73735b4232e8  node-v20.19.3-darwin-arm64.tar.xz
6f9dc8cbce8f8c74e4df296fb58c20fc6e88f47880a299fc76bbb01a90219870  node-v20.19.3-darwin-x64.tar.gz
b1ffdc297cd8a0b350f296d6c87191d4ae2beedcf78074eb35622227cd9c4df7  node-v20.19.3-darwin-x64.tar.xz
d1c3f74702e13cf936123e037cb35ee3af9350d2b4e3050a5ef0dc694640822c  node-v20.19.3-headers.tar.gz
33c890401edb172ced8c95c0705ce7c82b4473f5878cb3cff5e8d2def99cc812  node-v20.19.3-headers.tar.xz
8e6939f63b736470bf2cbda596ab62393f26d9af9d7046d61270899880d4f149  node-v20.19.3-linux-arm64.tar.gz
72a3036618fb47d8aaa3050477d9577747a9e550c39be46b53202a3b3e797e83  node-v20.19.3-linux-arm64.tar.xz
c9cb3e73efacb8e3cce47f36b0fd0b823a84b973047f1ab58a5fce99bc6b7536  node-v20.19.3-linux-armv7l.tar.gz
512402d6c336a2c548cd6056969abf065b8799af9ecbed9b74f5516835bcad4c  node-v20.19.3-linux-armv7l.tar.xz
b38c429376c4aeee09e0e3ba3294db9e2683e896747b0050aa84ed3401706389  node-v20.19.3-linux-ppc64le.tar.gz
3f72821fce859e9ed7c28d1d9486a7be42615b6e72012dc38851cca0c76ffd5a  node-v20.19.3-linux-ppc64le.tar.xz
d2ffe8fbc8b3f6eef0cb6ea3719c562d0c4535870e2a2d2f0685e7d2ae8b1c69  node-v20.19.3-linux-s390x.tar.gz
7b801977c8968106a8efdb4043be9663c5ec52c3cf0639ec52559fb8dfc79e51  node-v20.19.3-linux-s390x.tar.xz
76272878069683c3a36b933d2f4842436a26b527daa930ae9346b477011ee2f3  node-v20.19.3-linux-x64.tar.gz
c210e1a547efad55e93af1e04fb80d2f7131b13872f2de4e9ebdfecb8e06caad  node-v20.19.3-linux-x64.tar.xz
f0a8c425285daf7ea5e7fb35cf54a633b2fba66706f195e151d345e0bdc414a4  node-v20.19.3.pkg
4c9f238ad7c57af35efa6ba6259521aebbe20c2f91f6d846860a861c97fc6b99  node-v20.19.3.tar.gz
99be7b9d268d48b93be568a23240398ceacb0782dc7055b9972305c000b0e292  node-v20.19.3.tar.xz
5c1c371920fe4b9c4ecdb28ec89e7ecfdca4af15cd8eb006b33f0f8eb78a00e7  node-v20.19.3-win-arm64.7z
23fdac73af3243e5ee502888fdc3e6bfc17911ef810816b0feb403defb471430  node-v20.19.3-win-arm64.zip
7d12809db39be5176754426734780d4f847907d55a262a3e670b14d89fadc362  node-v20.19.3-win-x64.7z
ee50fe3af2e4b43aef655c5126e0e4d995a391a787a9327596563a722ada2aa9  node-v20.19.3-win-x64.zip
2aa04389edcb45acd3a1609ad73e6b250f67dcf5e60283415e856ba198a84c5c  node-v20.19.3-win-x86.7z
0add136861250792abb445f8d4705b2b5220a339a8cd2e72944e393d453f43fc  node-v20.19.3-win-x86.zip
566113399176c4982841793fc7788335be42783bac74377be77d2580518ce039  node-v20.19.3-x64.msi
6791da9a6a037be56324f43d85ba4a9a11a9ae4b9d70fb95cb4dc1b41ead45ab  node-v20.19.3-x86.msi
2e1d0c66f182fea1cfce869b9b5410ac86c797335e08da0fafca835bfc5709bd  win-arm64/node.exe
8de6fce6e4534a4a9ad85a6926a9ef00df949121e14fafd70182ae7ce36e957c  win-arm64/node.lib
26f76ddfea31f3b74aef6df8fce86c13bebad97b6154f621c615cdc55d17c16c  win-arm64/node_pdb.7z
e79b56cbe3eb8f7c405b78dd56a374f40f7dbebac27be03542c476e8cedd41a0  win-arm64/node_pdb.zip
f70b418bfe95f34d519785adf58306bb6310f69d5d53175a47c6c6fe26f83014  win-x64/node.exe
7d545cfcf38456553e83f419c72e91bf9bc80500bf8c0f3f838a7be020e88def  win-x64/node.lib
cdcee919b3bb114ac2791008a11fc90459b545c95e5e69c40db06f183af25f46  win-x64/node_pdb.7z
d5e21f5d29e3f28dacf814996e68ce404c394b93947e5ccdac507402fef024bb  win-x64/node_pdb.zip
c233d2d9cfa277e9a0679b597a34d33046752e75ba8b581c80e46086ef3fad93  win-x86/node.exe
d7f17d2550d686620f88b50d3bbaad1259974fc98b09fd95959a536fecbe1c5a  win-x86/node.lib
03ddcaf8a641c0706034dfd0aaf81e5ffa488be5bebdfc7230ae5bca51577065  win-x86/node_pdb.7z
b2e832ce2e5ce051f910bdc6d6544f70ddc0e3b8cb03d177265da4bf31c2ef9e  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEzGj1oxBv9EgyLkjtJ/XjjVsKIV8FAmhZEbcACgkQJ/XjjVsK
IV8p8A/+LpoDUapcFPcIMN8yD6zck0Coi6GDENoxK9g90ovM1HIBn9mGeEqUQuXY
cSihmn7Zg30IyT6VM3Wfpx1oWpWVdhzqdgQPaHu1QNcWhj1BnQFQMQxGpXtzLi83
1CIVt5YyDxl1FJm5wLc4vc0POoOGgiBXs6JgH6lsKZaQcCIGBflNWtVpavDfVAX2
DwvI5Zf+IkrK8McKapmpruCFb/6u0v0oL2pEgs7xEA+8zUU0BMmr4SNGQK2jlz7I
uOytCgwMjCjVxxdIJg/m8W70Ry3MUqnRRsM7Wa85vGZWrBbGjH3TXfHFtxs/8WRY
1ZQHwaUiSscajeRuySE2xs/teoZIbHHOf78i1VixC+mU+X4E5gR1fnPKlbnisC3A
79WCCoAQHIPe/OnAj467Q0DXZj+8aKR58JGpCgbpB7hGznpIgJwEwhhnPlSqvVQ7
uawLJ9JfE3NHTJBzSKFECpJ05Lyoo8zmBde1g6P384GvckFSWv4Hoa4p9V4FpKwK
up8DP2Dyfmr3CvXabOfVq9VmqjQ+TBxBixBVdQpKwtS85Ash7MDGPqHBZq1nKjFw
HvSJMwTlIQufhAUrADNQsjMGoE4MNXlOXnS6KkvOV0FSbX2A+SplN+WqqCBBft8P
+6wmkLfpdn/lbgTaayQWuI41UkhjUBd4MyEbYZeawzhZOXjJk4s=
=vDFx
-----END PGP SIGNATURE-----
```
