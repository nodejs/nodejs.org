---
date: '2025-10-28T19:11:55.751Z'
category: release
title: Node.js 22.21.1 (LTS)
layout: blog-post
author: Antoine du Hamel
---

## 2025-10-28, Version 22.21.1 'Jod' (LTS), @aduh95

### Commits

- \[[`af33e8e668`](https://github.com/nodejs/node/commit/af33e8e668)] - **benchmark**: remove unused variable from util/priority-queue (Bruno Rodrigues) [#59872](https://github.com/nodejs/node/pull/59872)
- \[[`6764ce8756`](https://github.com/nodejs/node/commit/6764ce8756)] - **benchmark**: update count to n in permission startup (Bruno Rodrigues) [#59872](https://github.com/nodejs/node/pull/59872)
- \[[`4e8d99f0dc`](https://github.com/nodejs/node/commit/4e8d99f0dc)] - **benchmark**: update num to n in dgram offset-length (Bruno Rodrigues) [#59872](https://github.com/nodejs/node/pull/59872)
- \[[`af0a8ba7f8`](https://github.com/nodejs/node/commit/af0a8ba7f8)] - **benchmark**: adjust dgram offset-length len values (Bruno Rodrigues) [#59708](https://github.com/nodejs/node/pull/59708)
- \[[`78efd1be4a`](https://github.com/nodejs/node/commit/78efd1be4a)] - **benchmark**: update num to n in dgram offset-length (Bruno Rodrigues) [#59708](https://github.com/nodejs/node/pull/59708)
- \[[`df72dc96e9`](https://github.com/nodejs/node/commit/df72dc96e9)] - **console,util**: improve array inspection performance (Ruben Bridgewater) [#60037](https://github.com/nodejs/node/pull/60037)
- \[[`ef67d09f50`](https://github.com/nodejs/node/commit/ef67d09f50)] - **http**: improve writeEarlyHints by avoiding for-of loop (Haram Jeong) [#59958](https://github.com/nodejs/node/pull/59958)
- \[[`23468fd76b`](https://github.com/nodejs/node/commit/23468fd76b)] - **http2**: fix allowHttp1+Upgrade, broken by shouldUpgradeCallback (Tim Perry) [#59924](https://github.com/nodejs/node/pull/59924)
- \[[`56abc4ac76`](https://github.com/nodejs/node/commit/56abc4ac76)] - **lib**: optimize priority queue (Gürgün Dayıoğlu) [#60039](https://github.com/nodejs/node/pull/60039)
- \[[`ea5cfd98c5`](https://github.com/nodejs/node/commit/ea5cfd98c5)] - **lib**: implement passive listener behavior per spec (BCD1me) [#59995](https://github.com/nodejs/node/pull/59995)
- \[[`c2dd6eed2f`](https://github.com/nodejs/node/commit/c2dd6eed2f)] - **process**: fix wrong asyncContext under unhandled-rejections=strict (Shima Ryuhei) [#60103](https://github.com/nodejs/node/pull/60103)
- \[[`81a3055710`](https://github.com/nodejs/node/commit/81a3055710)] - **process**: fix default `env` for `process.execve` (Richard Lau) [#60029](https://github.com/nodejs/node/pull/60029)
- \[[`fe492c7ace`](https://github.com/nodejs/node/commit/fe492c7ace)] - **process**: fix hrtime fast call signatures (Renegade334) [#59600](https://github.com/nodejs/node/pull/59600)
- \[[`76b4cab8fc`](https://github.com/nodejs/node/commit/76b4cab8fc)] - **src**: bring permissions macros in line with general C/C++ standards (Anna Henningsen) [#60053](https://github.com/nodejs/node/pull/60053)
- \[[`21970970c7`](https://github.com/nodejs/node/commit/21970970c7)] - **src**: remove `AnalyzeTemporaryDtors` option from .clang-tidy (iknoom) [#60008](https://github.com/nodejs/node/pull/60008)
- \[[`609c063e81`](https://github.com/nodejs/node/commit/609c063e81)] - **src**: remove unused variables from report (Moonki Choi) [#60047](https://github.com/nodejs/node/pull/60047)
- \[[`987841a773`](https://github.com/nodejs/node/commit/987841a773)] - **src**: avoid unnecessary string allocations in SPrintF impl (Anna Henningsen) [#60052](https://github.com/nodejs/node/pull/60052)
- \[[`6e386c0632`](https://github.com/nodejs/node/commit/6e386c0632)] - **src**: make ToLower/ToUpper input args more flexible (Anna Henningsen) [#60052](https://github.com/nodejs/node/pull/60052)
- \[[`c3be1226c7`](https://github.com/nodejs/node/commit/c3be1226c7)] - **src**: allow `std::string_view` arguments to `SPrintF()` and friends (Anna Henningsen) [#60058](https://github.com/nodejs/node/pull/60058)
- \[[`764d35647d`](https://github.com/nodejs/node/commit/764d35647d)] - **src**: remove unnecessary `std::string` error messages (Anna Henningsen) [#60057](https://github.com/nodejs/node/pull/60057)
- \[[`1289ef89ec`](https://github.com/nodejs/node/commit/1289ef89ec)] - **src**: remove unnecessary shadowed functions on Utf8Value & BufferValue (Anna Henningsen) [#60056](https://github.com/nodejs/node/pull/60056)
- \[[`d1fb8a538d`](https://github.com/nodejs/node/commit/d1fb8a538d)] - **src**: avoid unnecessary string -> `char*` -> string round trips (Anna Henningsen) [#60055](https://github.com/nodejs/node/pull/60055)
- \[[`54b439fb5a`](https://github.com/nodejs/node/commit/54b439fb5a)] - **src**: fill `options_args`, `options_env` after vectors are finalized (iknoom) [#59945](https://github.com/nodejs/node/pull/59945)
- \[[`c7c597e2ca`](https://github.com/nodejs/node/commit/c7c597e2ca)] - **src**: use RAII for uv_process_options_t (iknoom) [#59945](https://github.com/nodejs/node/pull/59945)
- \[[`b928ea9716`](https://github.com/nodejs/node/commit/b928ea9716)] - **test**: ensure that the message event is fired (Luigi Pinca) [#59952](https://github.com/nodejs/node/pull/59952)
- \[[`e4b95a5158`](https://github.com/nodejs/node/commit/e4b95a5158)] - **test**: replace diagnostics_channel stackframe in output snapshots (Chengzhong Wu) [#60024](https://github.com/nodejs/node/pull/60024)
- \[[`4206406694`](https://github.com/nodejs/node/commit/4206406694)] - **test**: mark test-web-locks skip on IBM i (SRAVANI GUNDEPALLI) [#59996](https://github.com/nodejs/node/pull/59996)
- \[[`26394cd5bf`](https://github.com/nodejs/node/commit/26394cd5bf)] - **test**: expand tls-check-server-identity coverage (Diango Gavidia) [#60002](https://github.com/nodejs/node/pull/60002)
- \[[`b58df47995`](https://github.com/nodejs/node/commit/b58df47995)] - **test**: fix typo of test-benchmark-readline.js (Deokjin Kim) [#59993](https://github.com/nodejs/node/pull/59993)
- \[[`af3a59dba8`](https://github.com/nodejs/node/commit/af3a59dba8)] - **test**: verify tracing channel doesn't swallow unhandledRejection (Gerhard Stöbich) [#59974](https://github.com/nodejs/node/pull/59974)
- \[[`cee362242b`](https://github.com/nodejs/node/commit/cee362242b)] - **timers**: fix binding fast call signatures (Renegade334) [#59600](https://github.com/nodejs/node/pull/59600)
- \[[`40fea57fdd`](https://github.com/nodejs/node/commit/40fea57fdd)] - **tools**: add message on auto-fixing js lint issues in gh workflow (Dario Piotrowicz) [#59128](https://github.com/nodejs/node/pull/59128)
- \[[`aac90d351b`](https://github.com/nodejs/node/commit/aac90d351b)] - **tools**: verify signatures when updating nghttp\* (Antoine du Hamel) [#60113](https://github.com/nodejs/node/pull/60113)
- \[[`9fae03c7d9`](https://github.com/nodejs/node/commit/9fae03c7d9)] - **tools**: use dependabot cooldown and move tools/doc (Rafael Gonzaga) [#59978](https://github.com/nodejs/node/pull/59978)
- \[[`81548abdf6`](https://github.com/nodejs/node/commit/81548abdf6)] - **wasi**: fix WasiFunction fast call signature (Renegade334) [#59600](https://github.com/nodejs/node/pull/59600)

Windows 32-bit Installer: https://nodejs.org/dist/v22.21.1/node-v22.21.1-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.21.1/node-v22.21.1-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.21.1/node-v22.21.1-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.21.1/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.21.1/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.21.1/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.21.1/node-v22.21.1.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.21.1/node-v22.21.1-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.21.1/node-v22.21.1.tar.gz \
Other release files: https://nodejs.org/dist/v22.21.1/ \
Documentation: https://nodejs.org/docs/v22.21.1/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

9e4ef6748bbc55e7debf792529a108bc2635859f4ce46d0775668b27cc5cc750  node-v22.21.1-aix-ppc64.tar.gz
07a93b85d258f7b7770bad4e5e63e959c7a1a6e6ae3c6017c4e2d84dc503587d  node-v22.21.1-arm64.msi
c170d6554fba83d41d25a76cdbad85487c077e51fa73519e41ac885aa429d8af  node-v22.21.1-darwin-arm64.tar.gz
39f53ffcf1604291e85974c8588bb290c14b358ac085e342920e703651d63c5e  node-v22.21.1-darwin-arm64.tar.xz
8e3dc89614debe66c2a6ad2313a1adb06eb37db6cd6c40d7de6f7d987f7d1afd  node-v22.21.1-darwin-x64.tar.gz
2f4fd943768fdd82308da88bb53f3a16259275c770bc4393e45b986844ea3017  node-v22.21.1-darwin-x64.tar.xz
17fe8018b051e9ce255868c301e4b305194185479c0b1831f8625fa96057c9e5  node-v22.21.1-headers.tar.gz
d3d569879efa7f9c84cee539363facc4efd70375899549bc4484c98ea1f08928  node-v22.21.1-headers.tar.xz
c86830dedf77f8941faa6c5a9c863bdfdd1927a336a46943decc06a38f80bfb2  node-v22.21.1-linux-arm64.tar.gz
e660365729b434af422bcd2e8e14228637ecf24a1de2cd7c916ad48f2a0521e1  node-v22.21.1-linux-arm64.tar.xz
40d3d09aee556abc297dd782864fcc6b9e60acd438ff0660ba9ddcd569c00920  node-v22.21.1-linux-armv7l.tar.gz
69faec17156bc240a7e7590bcfb236194e4c09412387ac94318e8b30f72155e0  node-v22.21.1-linux-armv7l.tar.xz
b24f4c19d5546cd418674e83bde56d50a7c2b65faec7a65c3502f285eeb3aa70  node-v22.21.1-linux-ppc64le.tar.gz
6f2b6aa1519a8f50a66b0ae7e94d2feeadfe9aa98095c737c2fc67df25012845  node-v22.21.1-linux-ppc64le.tar.xz
7c46bd4a512b35f03acb972b2b04fecc2d4c47e35069ab9a8dd5cd8f0091195a  node-v22.21.1-linux-s390x.tar.gz
c473e8e7eb46aa93e1580736ce240ba4cf3b22dc45a47118359e85508b63e211  node-v22.21.1-linux-s390x.tar.xz
219a152ea859861d75adea578bdec3dce8143853c13c5187f40c40e77b0143b2  node-v22.21.1-linux-x64.tar.gz
680d3f30b24a7ff24b98db5e96f294c0070f8f9078df658da1bce1b9c9873c88  node-v22.21.1-linux-x64.tar.xz
a696aaf0b8e13ac1abf057dd6d82a22a3bedd03190c560d8187e3aff8527803d  node-v22.21.1-win-arm64.7z
b9d7faacd0b540b8b46640dbc8f56f4205ff63b79dec700d4f03d36591b0318f  node-v22.21.1-win-arm64.zip
7f7a247193bb5e3e6af8cb309c3dcf75fb77827f1453fd77a75b5ff9ef4868ce  node-v22.21.1-win-x64.7z
3c624e9fbe07e3217552ec52a0f84e2bdc2e6ffa7348f3fdfb9fbf8f42e23fcf  node-v22.21.1-win-x64.zip
81dc88f4f990be2924f728794d38cf2353444f0a0bbeb2018f3ee8b4f11e3d0d  node-v22.21.1-win-x86.7z
fcadbbf4575bb654ae94de5328e77e323ff3cea6360725d073ba56e2c9753e52  node-v22.21.1-win-x86.zip
fd7a63fec3a54a665851e2d3d93e07cfead2ffb4521675ffdbceb1bb5ac009bb  node-v22.21.1-x64.msi
b0bf4ad9f5c6afc6d5bbc354554abb34c378764682fb878996c5061abb448d80  node-v22.21.1-x86.msi
182ad62634eabbb11497c2284a3172771944f1cd17e23b143e778bd189af6d65  node-v22.21.1.pkg
5407ff154708e3dd6c9eb40f787b79afc5db8b2461e4ae92ee54605515bba0f1  node-v22.21.1.tar.gz
487d73fd4db00dc2420d659a8221b181a7937fbc5bc73f31c30b1680ad6ded6a  node-v22.21.1.tar.xz
707bbc8a9e615299ecdbff9040f88f59f20033ff1af923beee749b885cbd565d  win-arm64/node.exe
9265150c60463c2c524b7475f8a1f70943dcc05a735f3110ee50446ed4fff965  win-arm64/node.lib
95ed2419ec16da1eeb1394f0882a1a222b32a8fbbacb0c5205179122f4cddc88  win-arm64/node_pdb.7z
6c9d1db49bf342b7d6b8e755faa17e4f077c1eae76f314b54871887bb725cb6e  win-arm64/node_pdb.zip
471961cb355311c9a9dd8ba417eca8269ead32a2231653084112554cda52e8b3  win-x64/node.exe
aa0ec2c0281c18a5a4753b2d7f4fec0e2ba0b004be1f61b3bb9feb15e544a968  win-x64/node.lib
86f39117da6b47af53ab0c518f4ce57af76f14ad57c23c539a638f55bf37c781  win-x64/node_pdb.7z
809a9e4f88d8d08835d9da5ea1c044dc000fc765349aaf5f2ed8d9d8d1826a49  win-x64/node_pdb.zip
ffab44f146837f732b18ac6c9eb1275842752fc6b548ff215410517f55a09503  win-x86/node.exe
2428b7ac2df89e23fcc5d5d0d1b4c2baf4ff515575fe7fa5d7dd0575673fcd64  win-x86/node.lib
403adcd18baea1aa3760b2077efcaa75a2ba325fab8b30ef44418c020581114f  win-x86/node_pdb.7z
9c1377c75fc0a40101b9ab7924ef993e91cbded5f0780698b7f5987791f85c3a  win-x86/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaQEUYAAKCRAgsaOQsWjT
VveFAQCM+koZG8z4BcYYMloyig1kTab3LzQGwXeNXyo3nM2QWgD9H1e/YUE9SLlN
uYm4g9Xa/0+mqam4pAb4Bc3Op569Awg=
=7/r0
-----END PGP SIGNATURE-----
```
