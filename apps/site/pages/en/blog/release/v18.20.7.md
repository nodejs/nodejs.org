---
date: '2025-02-20T10:06:53.013Z'
category: release
title: Node.js v18.20.7 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-02-20, Version 18.20.7 'Hydrogen' (LTS), @aduh95

### Notable Changes

- \[[`ea5eb0e98b`](https://github.com/nodejs/node/commit/ea5eb0e98b)] - **crypto**: update root certificates to NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)

### Commits

- \[[`bb2977ca6c`](https://github.com/nodejs/node/commit/bb2977ca6c)] - **build**: use glob for dependencies of out/Makefile (Richard Lau) [#55789](https://github.com/nodejs/node/pull/55789)
- \[[`92896945b8`](https://github.com/nodejs/node/commit/92896945b8)] - **build**: support python 3.13 (Chengzhong Wu) [#53190](https://github.com/nodejs/node/pull/53190)
- \[[`ea5eb0e98b`](https://github.com/nodejs/node/commit/ea5eb0e98b)] - **crypto**: update root certificates to NSS 3.107 (Node.js GitHub Bot) [#56566](https://github.com/nodejs/node/pull/56566)
- \[[`d03a23577d`](https://github.com/nodejs/node/commit/d03a23577d)] - **deps**: V8: cherry-pick 26fd1dfa9cd6 (Shu-yu Guo) [#55873](https://github.com/nodejs/node/pull/55873)
- \[[`53bb21b093`](https://github.com/nodejs/node/commit/53bb21b093)] - **deps**: V8: backport ae5a4db8ad86 (Shu-yu Guo) [#55873](https://github.com/nodejs/node/pull/55873)
- \[[`5eb6dfe284`](https://github.com/nodejs/node/commit/5eb6dfe284)] - **deps**: update zlib to 1.3.0.1-motley-82a5fec (Node.js GitHub Bot) [#55980](https://github.com/nodejs/node/pull/55980)
- \[[`734515a0f7`](https://github.com/nodejs/node/commit/734515a0f7)] - **deps**: update zlib to 1.3.0.1-motley-7e2e4d7 (Node.js GitHub Bot) [#54432](https://github.com/nodejs/node/pull/54432)
- \[[`d64cc98324`](https://github.com/nodejs/node/commit/d64cc98324)] - **deps**: update simdutf to 5.6.4 (Node.js GitHub Bot) [#56255](https://github.com/nodejs/node/pull/56255)
- \[[`9eab21dd1d`](https://github.com/nodejs/node/commit/9eab21dd1d)] - **deps**: update simdutf to 5.6.3 (Node.js GitHub Bot) [#55973](https://github.com/nodejs/node/pull/55973)
- \[[`2e3367b46a`](https://github.com/nodejs/node/commit/2e3367b46a)] - **deps**: update simdutf to 5.6.2 (Node.js GitHub Bot) [#55889](https://github.com/nodejs/node/pull/55889)
- \[[`df74d66207`](https://github.com/nodejs/node/commit/df74d66207)] - **deps**: update simdutf to 5.6.1 (Node.js GitHub Bot) [#55850](https://github.com/nodejs/node/pull/55850)
- \[[`ade37ee0b3`](https://github.com/nodejs/node/commit/ade37ee0b3)] - **deps**: update acorn to 8.14.0 (Node.js GitHub Bot) [#55699](https://github.com/nodejs/node/pull/55699)
- \[[`a3c367adbd`](https://github.com/nodejs/node/commit/a3c367adbd)] - **deps**: update corepack to 0.31.0 (Node.js GitHub Bot) [#56795](https://github.com/nodejs/node/pull/56795)
- \[[`2cff6a8428`](https://github.com/nodejs/node/commit/2cff6a8428)] - **deps**: update corepack to 0.30.0 (Node.js GitHub Bot) [#55977](https://github.com/nodejs/node/pull/55977)
- \[[`8b8c9a2cf5`](https://github.com/nodejs/node/commit/8b8c9a2cf5)] - **doc**: update macOS and Xcode versions for releases (Michaël Zasso) [#56337](https://github.com/nodejs/node/pull/56337)
- \[[`706af28113`](https://github.com/nodejs/node/commit/706af28113)] - **doc**: add "Skip to content" button (Antoine du Hamel) [#56750](https://github.com/nodejs/node/pull/56750)
- \[[`634a6b3a14`](https://github.com/nodejs/node/commit/634a6b3a14)] - **doc**: improve accessibility of expandable lists (Antoine du Hamel) [#56749](https://github.com/nodejs/node/pull/56749)
- \[[`f0b60c5bf9`](https://github.com/nodejs/node/commit/f0b60c5bf9)] - **doc**: fix arrow vertical alignment in HTML version (Akash Yeole) [#52193](https://github.com/nodejs/node/pull/52193)
- \[[`91cce27ebb`](https://github.com/nodejs/node/commit/91cce27ebb)] - **doc**: remove flicker on page load on dark theme (Dima Demakov) [#50942](https://github.com/nodejs/node/pull/50942)
- \[[`522fbb00a8`](https://github.com/nodejs/node/commit/522fbb00a8)] - **doc**: make theme consistent across api and other docs (Dima Demakov) [#50877](https://github.com/nodejs/node/pull/50877)
- \[[`1486465520`](https://github.com/nodejs/node/commit/1486465520)] - **doc**: save user preference for JS flavor (Vidar Eldøy) [#49526](https://github.com/nodejs/node/pull/49526)
- \[[`d74cff7e59`](https://github.com/nodejs/node/commit/d74cff7e59)] - **doc**: rename possibly confusing variable and CSS class (Antoine du Hamel) [#49536](https://github.com/nodejs/node/pull/49536)
- \[[`4829d976fe`](https://github.com/nodejs/node/commit/4829d976fe)] - **doc**: add main ARIA landmark to API docs (Rich Trott) [#49882](https://github.com/nodejs/node/pull/49882)
- \[[`6c4ce1f1d4`](https://github.com/nodejs/node/commit/6c4ce1f1d4)] - **doc**: add navigation ARIA landmark to doc ToC (Rich Trott) [#49882](https://github.com/nodejs/node/pull/49882)
- \[[`33548f8c1f`](https://github.com/nodejs/node/commit/33548f8c1f)] - **doc**: add history entries for JSON modules stabilization (Antoine du Hamel) [#55855](https://github.com/nodejs/node/pull/55855)
- \[[`e12bdf6141`](https://github.com/nodejs/node/commit/e12bdf6141)] - **meta**: bump `actions/upload-artifact` from 4.4.3 to 4.6.0 (dependabot\[bot]) [#56861](https://github.com/nodejs/node/pull/56861)
- \[[`6f44ef388b`](https://github.com/nodejs/node/commit/6f44ef388b)] - **meta**: bump actions/upload-artifact from 4.4.0 to 4.4.3 (dependabot\[bot]) [#55685](https://github.com/nodejs/node/pull/55685)
- \[[`ae39211117`](https://github.com/nodejs/node/commit/ae39211117)] - **meta**: bump actions/upload-artifact from 4.3.4 to 4.4.0 (dependabot\[bot]) [#54703](https://github.com/nodejs/node/pull/54703)
- \[[`4cf80b37c7`](https://github.com/nodejs/node/commit/4cf80b37c7)] - **meta**: bump `actions/upload-artifact` from 4.3.3 to 4.3.4 (dependabot\[bot]) [#54166](https://github.com/nodejs/node/pull/54166)
- \[[`4d402b79cb`](https://github.com/nodejs/node/commit/4d402b79cb)] - **meta**: bump `actions/download-artifact` from 4.1.7 to 4.1.8 (dependabot\[bot]) [#54167](https://github.com/nodejs/node/pull/54167)
- \[[`1c01f93497`](https://github.com/nodejs/node/commit/1c01f93497)] - **meta**: bump actions/upload-artifact from 4.3.1 to 4.3.3 (dependabot\[bot]) [#52785](https://github.com/nodejs/node/pull/52785)
- \[[`6558a516ec`](https://github.com/nodejs/node/commit/6558a516ec)] - **meta**: bump actions/download-artifact from 4.1.4 to 4.1.7 (dependabot\[bot]) [#52784](https://github.com/nodejs/node/pull/52784)
- \[[`dd70860ec8`](https://github.com/nodejs/node/commit/dd70860ec8)] - **meta**: bump actions/download-artifact from 4.1.3 to 4.1.4 (dependabot\[bot]) [#52314](https://github.com/nodejs/node/pull/52314)
- \[[`4a24d92a45`](https://github.com/nodejs/node/commit/4a24d92a45)] - **meta**: bump actions/upload-artifact from 4.3.0 to 4.3.1 (dependabot\[bot]) [#51941](https://github.com/nodejs/node/pull/51941)
- \[[`655b9071b9`](https://github.com/nodejs/node/commit/655b9071b9)] - **meta**: bump actions/download-artifact from 4.1.1 to 4.1.3 (dependabot\[bot]) [#51938](https://github.com/nodejs/node/pull/51938)
- \[[`0e6ad795aa`](https://github.com/nodejs/node/commit/0e6ad795aa)] - **meta**: bump actions/download-artifact from 4.1.0 to 4.1.1 (dependabot\[bot]) [#51644](https://github.com/nodejs/node/pull/51644)
- \[[`61babc5037`](https://github.com/nodejs/node/commit/61babc5037)] - **meta**: bump actions/upload-artifact from 4.0.0 to 4.3.0 (dependabot\[bot]) [#51643](https://github.com/nodejs/node/pull/51643)
- \[[`8b16d80029`](https://github.com/nodejs/node/commit/8b16d80029)] - **meta**: update artifact actions to v4 (Michaël Zasso) [#51219](https://github.com/nodejs/node/pull/51219)
- \[[`d47e8cb86d`](https://github.com/nodejs/node/commit/d47e8cb86d)] - **test**: do not use deprecated import assertions (Antoine du Hamel) [#55873](https://github.com/nodejs/node/pull/55873)
- \[[`06c523d693`](https://github.com/nodejs/node/commit/06c523d693)] - **test**: mark `test-inspector-stop-profile-after-done` as flaky (Antoine du Hamel) [#57001](https://github.com/nodejs/node/pull/57001)
- \[[`dafea86962`](https://github.com/nodejs/node/commit/dafea86962)] - **test**: mark `test-perf-hooks` as flaky on macOS (Antoine du Hamel) [#57001](https://github.com/nodejs/node/pull/57001)
- \[[`8e53f1f43d`](https://github.com/nodejs/node/commit/8e53f1f43d)] - **test**: mark test-inspector-multisession-ws as flaky (Antoine du Hamel) [#57001](https://github.com/nodejs/node/pull/57001)
- \[[`350eb50bbe`](https://github.com/nodejs/node/commit/350eb50bbe)] - **test**: mark `test-performance-function` as flaky (Antoine du Hamel) [#57001](https://github.com/nodejs/node/pull/57001)
- \[[`a1f428a343`](https://github.com/nodejs/node/commit/a1f428a343)] - **test**: skip `test-perf-hooks` on SmartOS (Antoine du Hamel) [#57001](https://github.com/nodejs/node/pull/57001)
- \[[`199f52fcc0`](https://github.com/nodejs/node/commit/199f52fcc0)] - **test**: make test-crypto-hash compatible with OpenSSL > 3.4.0 (Jelle van der Waa) [#56160](https://github.com/nodejs/node/pull/56160)
- \[[`b08ce67d48`](https://github.com/nodejs/node/commit/b08ce67d48)] - **test**: compare paths on Windows without considering case (Early Riser) [#53993](https://github.com/nodejs/node/pull/53993)
- \[[`6e84d211a1`](https://github.com/nodejs/node/commit/6e84d211a1)] - **test**: deflake test-perf-hooks.js (Joyee Cheung) [#49892](https://github.com/nodejs/node/pull/49892)
- \[[`a7f565fc7f`](https://github.com/nodejs/node/commit/a7f565fc7f)] - **tools**: fix failing `lint-sh` workflow (Antoine du Hamel) [#56995](https://github.com/nodejs/node/pull/56995)

Windows 32-bit Installer: https://nodejs.org/dist/v18.20.7/node-v18.20.7-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v18.20.7/node-v18.20.7-x64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v18.20.7/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v18.20.7/win-x64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v18.20.7/node-v18.20.7.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v18.20.7/node-v18.20.7-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v18.20.7/node-v18.20.7.tar.gz \
Other release files: https://nodejs.org/dist/v18.20.7/ \
Documentation: https://nodejs.org/docs/v18.20.7/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

3e3aab6f6827063250c55cbecffe81624ec36c0ec1e6fe247f73697f78b52b86  node-v18.20.7-aix-ppc64.tar.gz
cdbe696f68b9162872295d4ec88a0700a3827261ae729f5eaf0606c69d6ab37e  node-v18.20.7-darwin-arm64.tar.gz
cccc8103e6cef10bbfa88342aff2dccd6a4c5d0cad955437d439785cc831d862  node-v18.20.7-darwin-arm64.tar.xz
c42eee8d9557720052d05856651488074f7736583b3312a223760490b9f5ce0e  node-v18.20.7-darwin-x64.tar.gz
cb57712a9f6927475de89b5f0a8152be17a4232a6e5269cb6e3173acb77ba7da  node-v18.20.7-darwin-x64.tar.xz
fbde30ff6557a5ca444743f0552e311477637e268c58e7fb9aafa739c9e7b90f  node-v18.20.7-headers.tar.gz
4bbb70f668ed528b8685ab3ade5c960cd17399f3bcdced50c07083be04ac1e54  node-v18.20.7-headers.tar.xz
fc1f0e0c1022c5486da4726c58dc678c076ac2d7ad30b1b47b9071f043adce1e  node-v18.20.7-linux-arm64.tar.gz
c788ad58ded0426a7fca9f3a7e005f57c14a348ebdb3a2977e19ef7b0c143439  node-v18.20.7-linux-arm64.tar.xz
1e8d3685417be34f8714044015cada78d82747566c15f3824ef28e9c22e3e68a  node-v18.20.7-linux-armv7l.tar.gz
eb70fcb8a5d5dd67da8be59ac2ee68b8e3e72222af1b1dc601d6407fbdb8c164  node-v18.20.7-linux-armv7l.tar.xz
4520710588d6109f818c19568d17ffbdbf89d60c96e0f9547a8771730e135901  node-v18.20.7-linux-ppc64le.tar.gz
d73cbdf68ecda53267570bb715e278d333dade6cd3e5bff6da7914d1d8b4cd0a  node-v18.20.7-linux-ppc64le.tar.xz
fecbe173c8ce1ee1d2c6475546a8d30c4426861505ef69254bd048e6d91f23fb  node-v18.20.7-linux-s390x.tar.gz
408611bfd04952c0b17b3fb77eff5f7bbd0972e67caaa7d274bb0da7a6ff6ecc  node-v18.20.7-linux-s390x.tar.xz
ca593cc143875d33b257ab45ae629a02485333e8096221c44ef62c99678aa7fc  node-v18.20.7-linux-x64.tar.gz
deaf9695966087815a09c1c8e7fb0cfeb5b5b4471836e5993431230a845becad  node-v18.20.7-linux-x64.tar.xz
eef929e650b576fc3adc5ba8d45cd9bfa7fb5ddae6894c94c1802beb2d919128  node-v18.20.7.pkg
f2f2f1ac616d8e253ed69cf0b44de7d4843c40d8a614f64c776ee59ff0047031  node-v18.20.7.tar.gz
9a89659fad80c1b6da33d29f43f5865483ccb1952ddad434ee22f8193607277f  node-v18.20.7.tar.xz
230e1aa6cc9b158b286f16723db99967c46e7933d21dba73060ecd410f2de4b7  node-v18.20.7-win-x64.7z
6c65355f921a76168610fffbc06005a16194cca9110ec306c4f036a2eaaeb651  node-v18.20.7-win-x64.zip
70e2ed920e7fe37c06c2ceadd163b1d32f470e58350ab3df0356c5c72d3ac927  node-v18.20.7-win-x86.7z
72617fe071ecfb16d79b0934612e6f36900796f0d0b422cdbb66332a84cf63b8  node-v18.20.7-win-x86.zip
8a1ae839f896a75cfb742a5b82df414e27616db4c1b47dd83a60f329dbf36594  node-v18.20.7-x64.msi
3f82198c2feebdcffbe3f5bb824510a09679485f028da626b28a9165f3b3eb05  node-v18.20.7-x86.msi
6e12702a8fa938a6449a9c0baf21b2927442a6fa3d0ff716a9c8b3c3972ae252  win-x64/node.exe
64d93225aaece04e3cd45177d6dea2b22df49e127281fefa3ade43ac46a36cc6  win-x64/node.lib
824fdfd74c415e796d0a581f4e8c8d500cfae4c7f3e65f771cad53a3a81d230e  win-x64/node_pdb.7z
a432e34d19052123b33e38bfe98baa677820812910e2e4d870b9eaa62af3d9c2  win-x64/node_pdb.zip
dfedd92e7f1eee7561188d4af5be3f65ec6d0656e0c34b9460e9114ff83f649c  win-x86/node.exe
917ebac03add6c7577675886673b6c2a2c59781ca0e0031cddd5a2f13eb6ded1  win-x86/node.lib
1ec393dbfaa31dee631dbb119a9b0501f1963e0b028251676faffcf6b7c7e9dc  win-x86/node_pdb.7z
592af02fef6f591fae40e49b25f749c038ef328adaaf8fde113425e7553cf368  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEwNYkhDnx1WBKr/tAIdkA/9sjN1YFAme2/g0ACgkQIdkA/9sj
N1bVYg/9Eew5KIJGHs5pLoAjpjCAEfhDs2cGHfggwhcv07jnapWXZkjvLVrExmqU
w03xk9bg6i81U3LbsKrQpb0rr+w6Ye4pmM/VvcVdwukLRl4i50IQFkyzvqbWS59n
wPd81m+/8YKGBRFuWaSAYBZOV7wm8Lh7v0MsyO45CNwdOemU60eV8o2Jt5OBHOaK
wsLSwSvlwBAKwMbsR7p+OjCokTrYMqGhp+tYSqoNWFmKe6++W2uxPE6JAH3v6szI
wXE4UPHtSkKrrCFB9fDKwfYwz0FfaMmTNQa2jEKeW32I52K3ysIFC/tcroPPqhYI
mZx3NdrsA35EeYjV5kKdcURXUB5GA1HVGmYi66tN4QgO5kspeXHwTbk6I7zywa5I
wzUX8Sz+v41OOPwF/0/LWlp5KiW3LZE7zajVJnnLNtx59MIY6opnI0wxDhhaC79k
zE+1xNN4s4VR5N4pxzutx7ygQl8vsS6E6m3uqmGFr3VHqkIT66V0JZbC6BQ0KfA/
AEs2ItsVx/SVOddyvuRP6odyKDucpuf8GvGSuu1KycXDDzqiB14bc3vmR67pqmSz
VqT7fXHZFzx0ohdmpYaJP0n6YmGARyRlrZRzjAjHpMmAQbZ6muljy0hqdT8z1v6Q
2tt7onlYShP6l/MtcpJXADBjTFLeYXaKeyYzMuO7HDiYtItyL9M=
=3VIt
-----END PGP SIGNATURE-----
```
