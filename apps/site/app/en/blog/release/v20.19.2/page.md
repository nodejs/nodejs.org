---
date: '2025-05-14T21:14:45.406Z'
category: release
title: Node.js 20.19.2 (LTS)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-05-14, Version 20.19.2 'Iron' (LTS), @RafaelGSS

This is a security release.

### Notable Changes

- (CVE-2025-23166) fix error handling on async crypto operation
- (CVE-2025-23167) (SEMVER-MAJOR) update llhttp to 9.2.0
- (CVE-2025-23165) add missing call to uv_fs_req_cleanup

### Commits

- \[[`eb25047b1b`](https://github.com/nodejs/node/commit/eb25047b1b)] - **deps**: update llhttp to 9.2.0 (Node.js GitHub Bot) [#51719](https://github.com/nodejs/node/pull/51719)
- \[[`12dcd8db08`](https://github.com/nodejs/node/commit/12dcd8db08)] - **deps**: update llhttp to 9.1.3 (Node.js GitHub Bot) [#50080](https://github.com/nodejs/node/pull/50080)
- \[[`190e45a291`](https://github.com/nodejs/node/commit/190e45a291)] - **(SEMVER-MAJOR)** **(CVE-2025-23167)** **deps**: update llhttp to 9.1.2 (Paolo Insogna) [#48981](https://github.com/nodejs/node/pull/48981)
- \[[`fc68c44e6a`](https://github.com/nodejs/node/commit/fc68c44e6a)] - **fs**: added test for missing call to uv_fs_req_cleanup (Justin Nietzel) [#57811](https://github.com/nodejs/node/pull/57811)
- \[[`9e13bf0a81`](https://github.com/nodejs/node/commit/9e13bf0a81)] - **(CVE-2025-23165)** **fs**: add missing call to uv_fs_req_cleanup (Justin Nietzel) [#57811](https://github.com/nodejs/node/pull/57811)
- \[[`bd0aa5d44c`](https://github.com/nodejs/node/commit/bd0aa5d44c)] - **(CVE-2024-27982)** **http**: do not allow OBS fold in headers by default (Paolo Insogna) [nodejs-private/node-private#556](https://github.com/nodejs-private/node-private/pull/556)
- \[[`6c57465920`](https://github.com/nodejs/node/commit/6c57465920)] - **(CVE-2025-23166)** **src**: fix error handling on async crypto operations (RafaelGSS) [nodejs-private/node-private#710](https://github.com/nodejs-private/node-private/pull/710)

Windows 32-bit Installer: https://nodejs.org/dist/v20.19.2/node-v20.19.2-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.19.2/node-v20.19.2-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.19.2/node-v20.19.2-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.19.2/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.19.2/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.19.2/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.19.2/node-v20.19.2.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.19.2/node-v20.19.2-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.19.2/node-v20.19.2.tar.gz \
Other release files: https://nodejs.org/dist/v20.19.2/ \
Documentation: https://nodejs.org/docs/v20.19.2/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

4ba1a64cd4e2d1bdbc38afbf230c6171ed62fca7c38c83497f839c3911d8d13d  node-v20.19.2-aix-ppc64.tar.gz
ceeb1753eb6bdaf0d5dada97e807a88ef29d0ce49fa989a84339bc39987956d4  node-v20.19.2-arm64.msi
5f96c725cd2be1151f08b25c05bf5a21866a2dc7db3803d351a6ea19fcc53665  node-v20.19.2-darwin-arm64.tar.gz
51344f84c3867756a381d1f1ac437b9877ef7ee98683cd38aca32133a33e4986  node-v20.19.2-darwin-arm64.tar.xz
29f91e05992a7d81498ab1d04938a184313cb4aaccab95bb4636e30e6424eae3  node-v20.19.2-darwin-x64.tar.gz
eee1053719e234060c39822cc7defcb9322e14a1e6e5046dbbf48dcf68750aa7  node-v20.19.2-darwin-x64.tar.xz
37e920f860aaa3155bf8a276d20a5473fcea9eefa31f8b09eb18dc5e65c9abd7  node-v20.19.2-headers.tar.gz
398d95ff730743659a596b9753c7e619501571ae2beedbe16077d3213cd91e0e  node-v20.19.2-headers.tar.xz
24c3090d4e8c3667cd57482263291ca4f562c2e0773d5e618a0c6ba32d21b39f  node-v20.19.2-linux-arm64.tar.gz
0d0c4a1c3a5aa657b76873eaa962936c7dc7a45047bd3957322544967713dc72  node-v20.19.2-linux-arm64.tar.xz
aed2de774737d76a81254cbcd12ae5e9239f24efec0456b9608f150d27d58fe7  node-v20.19.2-linux-armv7l.tar.gz
43adc6c3f57582f0ed206b8401816d1846c39996793f02ccf61e905294bfdc58  node-v20.19.2-linux-armv7l.tar.xz
9fced2e270fb0879709f7fa19b358551244b2d6c8cbf39d6a860221dcc12181b  node-v20.19.2-linux-ppc64le.tar.gz
1391fe00183bef0da0b478f636527d8270e43563877312d251a468746d338c74  node-v20.19.2-linux-ppc64le.tar.xz
94023e739c98ce55a057fbf5e86589253458e92af1990a2712dab8c6421cfe2f  node-v20.19.2-linux-s390x.tar.gz
ffbf836e20738f283cbe342ce92881d81d3f14651cabd2cf93cdb91152bcae3c  node-v20.19.2-linux-s390x.tar.xz
eec2c7b9c6ac72e42885a42edfc0503c0e4ee455f855c4a17a6cbcf026656dd5  node-v20.19.2-linux-x64.tar.gz
cbe59620b21732313774df4428586f7222a84af29e556f848abf624ba41caf90  node-v20.19.2-linux-x64.tar.xz
3a19f4949b422309a2806083580528c2c87e8169755f31fb7521d5f7b5fdba22  node-v20.19.2-win-arm64.7z
b155826b6abe8383b88f7de42bc7c2601cabd3b0d6e52cce1cf4cd4936e6441b  node-v20.19.2-win-arm64.zip
eb6bde3d812ee065a94fc81e39dc16a56ec41f3039e6a27022326b3b59ee895b  node-v20.19.2-win-x64.7z
8735c9940b97548f6d9d4dda7cf5fd4471c062f15f44c2b890c9b0b430460feb  node-v20.19.2-win-x64.zip
6e56ea449e6581e8d7251b1960585d4e4cd53d99df34363483099fe864de1023  node-v20.19.2-win-x86.7z
c052c2b4e7ed147f9714b4e81bef4a1c5e04b33162c7300100c547747a2a34f3  node-v20.19.2-win-x86.zip
fcc217f3af52f8ecab1e5d016df6f543cb2d903d57e26f53ac48f7ea837dfab2  node-v20.19.2-x64.msi
2a5c4f9a2a563ba73b866dbdade0157ab042568b49a8b8ec0efa72150843ed17  node-v20.19.2-x86.msi
87f1d17df2fbbd775a4813d8936ece9120135d942eae6d308d2328616eed3103  node-v20.19.2.pkg
eaf8800608ffbcae7665beb4776d8e9d8484055fbb840ef44e346044f9b08ad5  node-v20.19.2.tar.gz
4a7ff611d5180f4e420204fa6f22f9f9deb2ac5e98619dd9a4de87edf5b03b6e  node-v20.19.2.tar.xz
c36cb4961a50d2ac05a72d78b6a5b21cb9ac31ca6545a4a438b287f9d0eea9ba  win-arm64/node.exe
db56ef1b250e24a698ee3a21f4f055a1f60319f273fa7bcab84212cdf9498bf1  win-arm64/node.lib
b754b00df640e352b663f7907f0e11240258aa5f5059d9c503ce455d2500d92f  win-arm64/node_pdb.7z
2b6f70f82b6bbe178556f0b49290011e83c51e63584488d75e7dd9b94560345c  win-arm64/node_pdb.zip
5793a3bf18d75c2bc5cb2b65ba8975b30057d7bf443141db4cf970d54fd8ddc6  win-x64/node.exe
21b9f76d6ec91f6510dc5adb891dbd52893c7d242549b5cf6084803d3be91665  win-x64/node.lib
2b7de888145be4086c70866417a0742a87ec50472d8b04e1850701ca2f7bfe4e  win-x64/node_pdb.7z
d5493643b36531bb02591c3f855c77e2070bb972be1a51ea313e6b25f3e29556  win-x64/node_pdb.zip
c5505d7f22b1f6bfc56f4fe16f472c3b6428e74f48062028e6cc2a4b646a72cc  win-x86/node.exe
4f7899d5cf286aad56624539952c087088e6e90f010f55d1f9145deb45524152  win-x86/node.lib
3b2de193ae323416b1c340777f9c2ff010f337d6dbdbd711a3de4a485315e1b5  win-x86/node_pdb.7z
79647764e20eb5002ca2a27e5d2f115cd5db462661521722a002a1eb0f79cd76  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmglBRIACgkQi+q0389V
XvTuQwv/TK0ElOiurObaWA4Vhya6aXm7zQfNqGVLGo6aBr2vvh5vvUkfA4EjFKGd
HtEygdrrqBxxHSJEtykLwF1Uq0HlO36Jrwrk4qJOQasyKs99qHnXiT1frPlpQv6u
yfuCC6bVSDt80v6OcRcDCitpBgTZY2ig8VAAIhpRDLcZNX/cvhoC5iw2BXbGtWIh
zLshwamTqyJFhP7lSFp2Qka92isinNhJQHEr/E1i7PSOI3hFnF2un5WaYdLOlwJN
uIALWR+Y4HfZy1qRc46znbV0M/xuwjRLGWwnQ3CrKi4G9nLnf57MRID+lgb+82iK
d2nFkDmdjeyN6BV+SJBBTc0KH7iONeHsEJit3Zv+C9j23deXBpNIH5IA4m3BWZV/
iDshOkSBXRRfjT4DJhNK2cdu51Z8GRhlEgkJ4KOL5wwW7zTWKyGPOyJYRzqy6Lbz
1LLGbxeI65fEKKL7QCZP76p5icvq/CQJZexzk2O8LQoxNDXXOWJEagc8aUYH1AkG
isCM12ol
=m+8y
-----END PGP SIGNATURE-----
```
