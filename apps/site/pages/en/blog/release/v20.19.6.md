---
date: '2025-11-25T12:32:17.526Z'
category: release
title: Node.js v20.19.6 (LTS)
layout: blog-post
author: Marco Ippolito
---

## 2025-11-25, Version 20.19.6 'Iron' (LTS), @marco-ippolito

### Notable Changes

- \[[`6277910a15`](https://github.com/nodejs/node/commit/6277910a15)] - **crypto**: update root certificates to NSS 3.114 (Node.js GitHub Bot) [#59571](https://github.com/nodejs/node/pull/59571)
- \[[`082e50d4a2`](https://github.com/nodejs/node/commit/082e50d4a2)] - **doc**: update the instruction on how to verify releases (Antoine du Hamel) [#59113](https://github.com/nodejs/node/pull/59113)
- \[[`db68cec4cb`](https://github.com/nodejs/node/commit/db68cec4cb)] - **doc**: deprecate HTTP/2 priority signaling (Matteo Collina) [#58313](https://github.com/nodejs/node/pull/58313)

### Commits

- \[[`0f644df42e`](https://github.com/nodejs/node/commit/0f644df42e)] - **build**: fix 'implicit-function-declaration' on OpenHarmony platform (hqzing) [#59547](https://github.com/nodejs/node/pull/59547)
- \[[`fba0025b9c`](https://github.com/nodejs/node/commit/fba0025b9c)] - **build**: use `windows-2025` runner (Michaël Zasso) [#59673](https://github.com/nodejs/node/pull/59673)
- \[[`3456ec946d`](https://github.com/nodejs/node/commit/3456ec946d)] - **crypto**: update root certificates to NSS 3.116 (Node.js GitHub Bot) [#59956](https://github.com/nodejs/node/pull/59956)
- \[[`6277910a15`](https://github.com/nodejs/node/commit/6277910a15)] - **crypto**: update root certificates to NSS 3.114 (Node.js GitHub Bot) [#59571](https://github.com/nodejs/node/pull/59571)
- \[[`1788fb5f3d`](https://github.com/nodejs/node/commit/1788fb5f3d)] - **deps**: update undici to 6.22.0 (Matteo Collina) [#60112](https://github.com/nodejs/node/pull/60112)
- \[[`5d61b55f24`](https://github.com/nodejs/node/commit/5d61b55f24)] - **deps**: update uvwasi to 0.0.23 (Node.js GitHub Bot) [#59791](https://github.com/nodejs/node/pull/59791)
- \[[`9f1e5e4637`](https://github.com/nodejs/node/commit/9f1e5e4637)] - **deps**: update histogram to 0.11.9 (Node.js GitHub Bot) [#59689](https://github.com/nodejs/node/pull/59689)
- \[[`d0edb01d25`](https://github.com/nodejs/node/commit/d0edb01d25)] - **deps**: update googletest to eb2d85e (Node.js GitHub Bot) [#59335](https://github.com/nodejs/node/pull/59335)
- \[[`576242ff39`](https://github.com/nodejs/node/commit/576242ff39)] - **deps**: V8: cherry-pick a0d0d4fc4f19 (Ho Cheung) [#60716](https://github.com/nodejs/node/pull/60716)
- \[[`a07a277020`](https://github.com/nodejs/node/commit/a07a277020)] - **deps**: update corepack to 0.34.1 (Node.js GitHub Bot) [#60314](https://github.com/nodejs/node/pull/60314)
- \[[`fa5c5af8ce`](https://github.com/nodejs/node/commit/fa5c5af8ce)] - **deps**: update archs files for openssl-3.0.17 (Node.js GitHub Bot) [#59134](https://github.com/nodejs/node/pull/59134)
- \[[`556113e2fc`](https://github.com/nodejs/node/commit/556113e2fc)] - **deps**: upgrade openssl sources to openssl-3.0.17 (Node.js GitHub Bot) [#59134](https://github.com/nodejs/node/pull/59134)
- \[[`cd1536ca90`](https://github.com/nodejs/node/commit/cd1536ca90)] - **deps**: update corepack to 0.34.0 (Node.js GitHub Bot) [#59133](https://github.com/nodejs/node/pull/59133)
- \[[`acec79989e`](https://github.com/nodejs/node/commit/acec79989e)] - **deps**: V8: cherry-pick 6b1b9bca2a8 (zhoumingtao) [#59283](https://github.com/nodejs/node/pull/59283)
- \[[`e65b930aa7`](https://github.com/nodejs/node/commit/e65b930aa7)] - **deps**: V8: backport 2e4c5cf9b112 (Michaël Zasso) [#60654](https://github.com/nodejs/node/pull/60654)
- \[[`1b75a601f7`](https://github.com/nodejs/node/commit/1b75a601f7)] - **doc**: fix typo on child_process.md (Angelo Gazzola) [#60114](https://github.com/nodejs/node/pull/60114)
- \[[`a2bcb217c6`](https://github.com/nodejs/node/commit/a2bcb217c6)] - **doc**: fix typo in section on microtask order (Tobias Nießen) [#59932](https://github.com/nodejs/node/pull/59932)
- \[[`2426d3f3ff`](https://github.com/nodejs/node/commit/2426d3f3ff)] - **doc**: add security escalation policy (Ulises Gascón) [#59806](https://github.com/nodejs/node/pull/59806)
- \[[`e7f6f04758`](https://github.com/nodejs/node/commit/e7f6f04758)] - **doc**: add Miles Guicent as triager (Miles Guicent) [#59562](https://github.com/nodejs/node/pull/59562)
- \[[`e51ef3f48b`](https://github.com/nodejs/node/commit/e51ef3f48b)] - **doc**: update install_tools.bat free disk space (Stefan Stojanovic) [#59579](https://github.com/nodejs/node/pull/59579)
- \[[`8a504d900a`](https://github.com/nodejs/node/commit/8a504d900a)] - **doc**: fix missing link to the Error documentation in the `http` page (Alexander Makarenko) [#59080](https://github.com/nodejs/node/pull/59080)
- \[[`8c5c8aa71d`](https://github.com/nodejs/node/commit/8c5c8aa71d)] - **doc**: clarify experimental platform vulnerability policy (Matteo Collina) [#59591](https://github.com/nodejs/node/pull/59591)
- \[[`109c4bff77`](https://github.com/nodejs/node/commit/109c4bff77)] - **doc**: add security incident reponse plan (Rafael Gonzaga) [#59470](https://github.com/nodejs/node/pull/59470)
- \[[`4f004efdf3`](https://github.com/nodejs/node/commit/4f004efdf3)] - **doc**: add RafaelGSS as performance strategic lead (Rafael Gonzaga) [#59445](https://github.com/nodejs/node/pull/59445)
- \[[`caa2db4bac`](https://github.com/nodejs/node/commit/caa2db4bac)] - **doc**: fix links in test.md (Vas Sudanagunta) [#58876](https://github.com/nodejs/node/pull/58876)
- \[[`082e50d4a2`](https://github.com/nodejs/node/commit/082e50d4a2)] - **doc**: update the instruction on how to verify releases (Antoine du Hamel) [#59113](https://github.com/nodejs/node/pull/59113)
- \[[`19a66365d9`](https://github.com/nodejs/node/commit/19a66365d9)] - **doc**: clarify DEP0194 scope (Antoine du Hamel) [#58504](https://github.com/nodejs/node/pull/58504)
- \[[`db68cec4cb`](https://github.com/nodejs/node/commit/db68cec4cb)] - **doc**: deprecate HTTP/2 priority signaling (Matteo Collina) [#58313](https://github.com/nodejs/node/pull/58313)
- \[[`3b2368774f`](https://github.com/nodejs/node/commit/3b2368774f)] - **doc**: make Stability labels not sticky in Stability index (Livia Medeiros) [#58291](https://github.com/nodejs/node/pull/58291)
- \[[`960d05ad7d`](https://github.com/nodejs/node/commit/960d05ad7d)] - **doc**: add history entries to `--input-type` section (Antoine du Hamel) [#58175](https://github.com/nodejs/node/pull/58175)
- \[[`20616f1750`](https://github.com/nodejs/node/commit/20616f1750)] - **http2**: do not crash on mismatched ping buffer length (René) [#60135](https://github.com/nodejs/node/pull/60135)
- \[[`9eb94232c8`](https://github.com/nodejs/node/commit/9eb94232c8)] - **lib**: handle superscript variants on windows device (Rafael Gonzaga) [#59261](https://github.com/nodejs/node/pull/59261)
- \[[`dc58b4e35f`](https://github.com/nodejs/node/commit/dc58b4e35f)] - **meta**: move Michael to emeritus (Michael Dawson) [#60070](https://github.com/nodejs/node/pull/60070)
- \[[`d943cfb260`](https://github.com/nodejs/node/commit/d943cfb260)] - **meta**: bump actions/setup-node from 4.4.0 to 5.0.0 (dependabot\[bot]) [#60093](https://github.com/nodejs/node/pull/60093)
- \[[`de9a3aaf0f`](https://github.com/nodejs/node/commit/de9a3aaf0f)] - **meta**: bump step-security/harden-runner from 2.12.2 to 2.13.1 (dependabot\[bot]) [#60094](https://github.com/nodejs/node/pull/60094)
- \[[`b4b5d4a4d7`](https://github.com/nodejs/node/commit/b4b5d4a4d7)] - **meta**: bump ossf/scorecard-action from 2.4.2 to 2.4.3 (dependabot\[bot]) [#60096](https://github.com/nodejs/node/pull/60096)
- \[[`e5b4eee901`](https://github.com/nodejs/node/commit/e5b4eee901)] - **meta**: bump actions/setup-python from 5.6.0 to 6.0.0 (dependabot\[bot]) [#60090](https://github.com/nodejs/node/pull/60090)
- \[[`7cb032c2c1`](https://github.com/nodejs/node/commit/7cb032c2c1)] - **meta**: update devcontainer to the latest schema (Aviv Keller) [#54347](https://github.com/nodejs/node/pull/54347)
- \[[`bb108191aa`](https://github.com/nodejs/node/commit/bb108191aa)] - **meta**: call `create-release-post.yml` post release (Aviv Keller) [#60366](https://github.com/nodejs/node/pull/60366)
- \[[`2a11d50526`](https://github.com/nodejs/node/commit/2a11d50526)] - **module**: correctly detect top-level await in ambiguous contexts (Shima Ryuhei) [#58646](https://github.com/nodejs/node/pull/58646)
- \[[`144233b71a`](https://github.com/nodejs/node/commit/144233b71a)] - **process**: fix wrong asyncContext under unhandled-rejections=strict (Shima Ryuhei) [#60103](https://github.com/nodejs/node/pull/60103)
- \[[`409cb773a4`](https://github.com/nodejs/node/commit/409cb773a4)] - **repl**: fix cpu overhead pasting big strings to the REPL (Ruben Bridgewater) [#59857](https://github.com/nodejs/node/pull/59857)
- \[[`d1c9d80cac`](https://github.com/nodejs/node/commit/d1c9d80cac)] - **repl**: add isValidParentheses check before wrap input (Xuguang Mei) [#59607](https://github.com/nodejs/node/pull/59607)
- \[[`b8d145db2c`](https://github.com/nodejs/node/commit/b8d145db2c)] - **src**: fix order of CHECK_NOT_NULL/dereference (Tobias Nießen) [#59487](https://github.com/nodejs/node/pull/59487)
- \[[`2c8a73f95f`](https://github.com/nodejs/node/commit/2c8a73f95f)] - **src**: remove duplicate assignment of `O_EXCL` in node_constants.cc (Daniel Osvaldo R) [#59049](https://github.com/nodejs/node/pull/59049)
- \[[`b1da374503`](https://github.com/nodejs/node/commit/b1da374503)] - **test**: fix typo of test-benchmark-readline.js (Deokjin Kim) [#59993](https://github.com/nodejs/node/pull/59993)
- \[[`4b4e38f497`](https://github.com/nodejs/node/commit/4b4e38f497)] - **test**: mark sea tests flaky on macOS x64 (Richard Lau) [#60068](https://github.com/nodejs/node/pull/60068)
- \[[`cbf4fc34c3`](https://github.com/nodejs/node/commit/cbf4fc34c3)] - **test**: skip more sea tests on Linux ppc64le (Richard Lau) [#59755](https://github.com/nodejs/node/pull/59755)
- \[[`9543facad7`](https://github.com/nodejs/node/commit/9543facad7)] - **test**: mark test-inspector-network-fetch as flaky again (Joyee Cheung) [#59640](https://github.com/nodejs/node/pull/59640)
- \[[`4f858d22ac`](https://github.com/nodejs/node/commit/4f858d22ac)] - **test**: skip test-fs-cp\* tests that are constantly failing on Windows (Joyee Cheung) [#59637](https://github.com/nodejs/node/pull/59637)
- \[[`3ec534dbe8`](https://github.com/nodejs/node/commit/3ec534dbe8)] - **test**: skip sea tests on Linux ppc64le (Richard Lau) [#59563](https://github.com/nodejs/node/pull/59563)
- \[[`a7a109f926`](https://github.com/nodejs/node/commit/a7a109f926)] - **test**: fix typos (Lee Jiho) [#59330](https://github.com/nodejs/node/pull/59330)
- \[[`fd9d43da46`](https://github.com/nodejs/node/commit/fd9d43da46)] - **test**: skip failing test on macOS 15.7+ (Antoine du Hamel) [#60419](https://github.com/nodejs/node/pull/60419)
- \[[`bc3ffbd713`](https://github.com/nodejs/node/commit/bc3ffbd713)] - **test_runner**: fix isSkipped check in junit (Sungwon) [#59414](https://github.com/nodejs/node/pull/59414)
- \[[`0cace96472`](https://github.com/nodejs/node/commit/0cace96472)] - **test_runner**: correct "already mocked" error punctuation placement (Jacob Smith) [#58840](https://github.com/nodejs/node/pull/58840)
- \[[`76001f9480`](https://github.com/nodejs/node/commit/76001f9480)] - **tools**: remove unused actions from `build-tarball.yml` (Antoine du Hamel) [#59787](https://github.com/nodejs/node/pull/59787)
- \[[`69904844bb`](https://github.com/nodejs/node/commit/69904844bb)] - **tools**: do not attempt to compress tgz archive (Antoine du Hamel) [#59785](https://github.com/nodejs/node/pull/59785)
- \[[`a6e7adb173`](https://github.com/nodejs/node/commit/a6e7adb173)] - **tools**: fix return value of try_check_compiler (theanarkh) [#59434](https://github.com/nodejs/node/pull/59434)
- \[[`6443ad2da5`](https://github.com/nodejs/node/commit/6443ad2da5)] - **tools**: drop deprecated `macos-13` runner (Richard Lau) [#60679](https://github.com/nodejs/node/pull/60679)
- \[[`45ec702ef7`](https://github.com/nodejs/node/commit/45ec702ef7)] - **tools**: fix `tools/make-v8.sh` for clang (Richard Lau) [#59893](https://github.com/nodejs/node/pull/59893)
- \[[`393ff7226e`](https://github.com/nodejs/node/commit/393ff7226e)] - **util**: fix numericSeparator with negative fractional numbers (sangwook) [#59379](https://github.com/nodejs/node/pull/59379)
- \[[`9e8beff0f4`](https://github.com/nodejs/node/commit/9e8beff0f4)] - **util**: fix error's namespaced node_modules highlighting using inspect (Ruben Bridgewater) [#59446](https://github.com/nodejs/node/pull/59446)

Windows 32-bit Installer: https://nodejs.org/dist/v20.19.6/node-v20.19.6-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.19.6/node-v20.19.6-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.19.6/node-v20.19.6-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.19.6/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.19.6/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.19.6/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.19.6/node-v20.19.6.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.19.6/node-v20.19.6-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.19.6/node-v20.19.6.tar.gz \
Other release files: https://nodejs.org/dist/v20.19.6/ \
Documentation: https://nodejs.org/docs/v20.19.6/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

c018b1ae68f3b4c4e73943a88c21edb961821a54694b582bf4ebddbfe7e4c971  node-v20.19.6-aix-ppc64.tar.gz
c83134c9b018b55fa822ef764f30e16bcaba0a68108a80686e3a909c7ebc2615  node-v20.19.6-arm64.msi
53dc59c40870460d5f72b279d06ef2c0ae70cdc154317003f853545f2f4e7747  node-v20.19.6-darwin-arm64.tar.gz
4ae715191060d69b6e2ba928f9e95d89c8db736bb397b917afb5c04501cc6982  node-v20.19.6-darwin-arm64.tar.xz
3f8c96205b22374d8dc54531586f164afe546e722aa8f9c813f17dcf30fb978b  node-v20.19.6-darwin-x64.tar.gz
c217b4f2672ea5170ab24a91ce5a396ba667a0719c17ccf9dd454a0263525cb0  node-v20.19.6-darwin-x64.tar.xz
e9cc1b5b00ef98e32bac059d8f63e757a56691b32ceece0900e5104e6dd45337  node-v20.19.6-headers.tar.gz
f2ed4fe1a156b67636004d9e6d9dcb374d531b5806eeacc6e75c04927202e5d7  node-v20.19.6-headers.tar.xz
a332bb8b108d7aab2f2e2736293e4ab41638cf6f3b3f49a756b8f63469024fa5  node-v20.19.6-linux-arm64.tar.gz
e24741779ae4c2f3c79b362fa5c0c8bbcdca1a6240eb5906c58dc762dcb62e0e  node-v20.19.6-linux-arm64.tar.xz
5ac7beb1d4237478bba571619454ee9724602f75012c46a4e6636a45725e749f  node-v20.19.6-linux-armv7l.tar.gz
76eb4a81a924c7abce161a52a7e22c302e03fe4e6a2d699145828516619710f9  node-v20.19.6-linux-armv7l.tar.xz
7cde00025e64db108aae90c2daab301138f94a769898f3ca9ecc8b30493bf673  node-v20.19.6-linux-ppc64le.tar.gz
042170f26e258304773d440848c7b29dd9808f1d15df53efd4bb7b0643829ed8  node-v20.19.6-linux-ppc64le.tar.xz
fd5dc1250938ff88169f3961e66ce4e0b97d92ef3625b0972e13d4c2e408bfc7  node-v20.19.6-linux-s390x.tar.gz
1fc97e3c79f3ba2cde8b51fff48eb762f9b285225570c3f023f942d437d94832  node-v20.19.6-linux-s390x.tar.xz
24344f9f03e3b388a901f8fb5d98e627e6cf74ce44aaf5a0fd6c4b39e4f2adc8  node-v20.19.6-linux-x64.tar.gz
c514127107ebf6e3885f793b06674574d71fe22e3df91a78c52c5a6f84b3b5b0  node-v20.19.6-linux-x64.tar.xz
4d4065292b93bd19729267cb7df52a37019d90f3ce1fdcf78ecaf72aba253f0b  node-v20.19.6.pkg
f72ccde62e6fda0090d79097ca660c1266a6354b22f628b3a95d395f0d86a2b1  node-v20.19.6.tar.gz
2026f9ff52c286d7c7d99932b21be313d1736aea524c5aff1748d41ab0bd9a20  node-v20.19.6.tar.xz
2417725ddab1c06714842d786905e9939435e6b176066f1913f9e7c1b4113cb7  node-v20.19.6-win-arm64.7z
5941dd968bc5c912d87cec4a0e3f4aafb009197c6d2f20035e83e1bcd076549a  node-v20.19.6-win-arm64.zip
9c6c84db127d7156df38c0d73779ddfdb6d390a26c0c74e0152d405510a23319  node-v20.19.6-win-x64.7z
650f9a0b46871f25f6efeb17d9ea5e8e58cf0cfd86c8e8676db6569a7bb34a34  node-v20.19.6-win-x64.zip
dfcf70171ce8cfd4ddc2ebbe13473eeaece261ac3b356668a5c47c14fa76332f  node-v20.19.6-win-x86.7z
4957a35c243434037c21bf556edbaf7ba26af79af754c260e99dc44eb7a5e2ee  node-v20.19.6-win-x86.zip
5df7e1bd7de661a3eacd3cd26e9a5828214a0ac8e4021e643f7c7929cda95e5f  node-v20.19.6-x64.msi
ab05bb1d0bd3381239cc8f22c6aa7515310f9f8a315c155e4711b103abd212b1  node-v20.19.6-x86.msi
fec0e481bfcd39ab6e01df078bbc8af93a5f0a1e2572d1aef78fb84ec3cf6ba6  win-arm64/node.exe
8de6fce6e4534a4a9ad85a6926a9ef00df949121e14fafd70182ae7ce36e957c  win-arm64/node.lib
5b723a59e0d2b53325e1569dd41c5fc3f1f24a26d2d139309cbca9b018804b38  win-arm64/node_pdb.7z
6f9e7efd1c6cc68ae6835b5df91905df923d33c2269b2696e879f96bfa2eb3c9  win-arm64/node_pdb.zip
46ba90a735e256c76af1cb1ff799876b4b18140f9a93418de8ece7965b1ad512  win-x64/node.exe
96e36b02fb24fa3ae1d010095959a34224a9500913902f447c3defdf0aae0fbb  win-x64/node.lib
5ecc28ef9344edd7b5250b40403e01e667aa447c6877204eb3f1421d08408419  win-x64/node_pdb.7z
d6298051dc315705e6179ee09af5f5375ca2797b4ebb6a332c5ca4420bfb3f27  win-x64/node_pdb.zip
faf49f72ef86fc7f31282a480a1ed34eff609020ae520052139ec9aa16a0e035  win-x86/node.exe
d22e597766b0a8de355d244cd9417f8b67bbbc39e8a66ae2e1009ee4c7409bb2  win-x86/node.lib
269c80bdd75b87697eebd7f3518dd638d0c92865b785c68f11abc77df6379b80  win-x86/node_pdb.7z
831b0c6708dfc863d5ed61d62b482277dd9ff74f62307397682075020dc6f3fe  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEzGj1oxBv9EgyLkjtJ/XjjVsKIV8FAmkloPIACgkQJ/XjjVsK
IV9QexAAhkeLdPb4FjKkz1/afzc2K/UBCe9h11eobujDT1CnOC+AmN33FxxfqJ3C
pizcjedjF3KR2xAReOcPCLGUSRzOCFBYbm5OI3CwaFTv+chK7L6qUbvLNh4H+rE3
Oku93D64mnb58UQjKPMhs/fq94mdU6BA2FPMy2KjW7leINw9dIwVmvRpPSB9Qos+
jj/dto6pzLBQZoSW7HAxu92McLTGPIuud8bd6xHPbwuILYkCFzIDlHnnJpV9+8Pq
7XLEwCG+7i0Las+ANxTi4yW9UxV44rq33ZY2IHCGxFpfgCRCdeJOOItvEUrOmaqf
j4n6TzQcF+J62l73poCMDTJb9bRCKL9sahQZF7wU+sjE4TMgUCwqmEU/7tp6Tolj
P+4jzFxE9hw/+n5LWO3K0aBmQxjb8AxqTRQiOOd9Nx1QbRr1UtwIJx5pM7iHO7Xs
Rn6PuyqHdUx7s29D2R74gOQh5ysipZfySNYBjeLPvbY9BWoHry8zYhR5NpmRPEZS
lE2oNyVulVr5/7Nne+qBglsuqvJnxdz4GnCmWf3vNZaUmQ9XK+frkSF0GUYKTsUK
8CRsOImaiTkGw2B2rg3eM535d14cBPh3GPI3/Oo+nqZvX/H69q1bPy0PiuxrU37B
DWqaGxdx2N9ybdWY/5TS0vieICobP0SbCU0lmmq+myAfQ4H+OMc=
=FVEt
-----END PGP SIGNATURE-----
```
