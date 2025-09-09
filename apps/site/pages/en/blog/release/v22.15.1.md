---
date: '2025-05-14T21:15:50.538Z'
category: release
title: Node.js v22.15.1 (LTS)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-05-14, Version 22.15.1 'Jod' (LTS), @RafaelGSS

This is a security release.

### Notable Changes

- (CVE-2025-23166) fix error handling on async crypto operation
- (CVE-2025-23165) add missing call to uv_fs_req_cleanup

### Commits

- \[[`edaf54da00`](https://github.com/nodejs/node/commit/edaf54da00)] - **fs**: added test for missing call to uv_fs_req_cleanup (Justin Nietzel) [#57811](https://github.com/nodejs/node/pull/57811)
- \[[`9f403e98ef`](https://github.com/nodejs/node/commit/9f403e98ef)] - **(CVE-2025-23165)** **fs**: add missing call to uv_fs_req_cleanup (Justin Nietzel) [#57811](https://github.com/nodejs/node/pull/57811)
- \[[`f4494d38f1`](https://github.com/nodejs/node/commit/f4494d38f1)] - **(CVE-2025-23166)** **src**: fix error handling on async crypto operations (RafaelGSS) [nodejs-private/node-private#709](https://github.com/nodejs-private/node-private/pull/709)

Windows 32-bit Installer: https://nodejs.org/dist/v22.15.1/node-v22.15.1-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.15.1/node-v22.15.1-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.15.1/node-v22.15.1-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.15.1/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.15.1/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.15.1/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.15.1/node-v22.15.1.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.15.1/node-v22.15.1-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.15.1/node-v22.15.1.tar.gz \
Other release files: https://nodejs.org/dist/v22.15.1/ \
Documentation: https://nodejs.org/docs/v22.15.1/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

2fe635ed920633a890fd594860e5fe35f5ca1ef6da3cda62c6692c39cfefb894  node-v22.15.1-aix-ppc64.tar.gz
3242884a544d8d7e4c1e7ee04ee82e48ae9820723b46589284e86441610f04fa  node-v22.15.1-arm64.msi
d2689b86b17e1b51e76f801ffe2d9acca4225e76eda4b843c3d8438d4a7cd6fe  node-v22.15.1-darwin-arm64.tar.gz
da2ce4f4616f5adae82de433481e00af86c7e6624a07e5a3c3fdaa1d8a6028fa  node-v22.15.1-darwin-arm64.tar.xz
1c722d0dd6d3f60e8b0be014ea01b8a59f5088f4419197a1b37544854d61cc6f  node-v22.15.1-darwin-x64.tar.gz
4f7f6dd674ffa4935dba358fe503a396347d918603e3c9657ce586280c702f61  node-v22.15.1-darwin-x64.tar.xz
7410efd260c92faa736cfa56f5cbc41cbb672e20d007d19353992ef9a96c2449  node-v22.15.1-headers.tar.gz
4b625fb4a7c7da9f04f9e897c7ec87a3d9c170504506f184e66d93f4604d2a5b  node-v22.15.1-headers.tar.xz
eb3f232b83dfe83397b98395ec77a973e888e8959c978b3e4eeb551b8845b74f  node-v22.15.1-linux-arm64.tar.gz
f4ae8ddf7487dfaf7da92fef463ee55cc29d8772d62891361dc3fc8b8e469205  node-v22.15.1-linux-arm64.tar.xz
346426e2bca62c98fb12213c39e80b0e349d7620238f74b7208d12e18fde87fd  node-v22.15.1-linux-armv7l.tar.gz
6947386b4c8373b625c6a49b5571bf2226dac7c7b560a9a561a1f81bf71a25ef  node-v22.15.1-linux-armv7l.tar.xz
156518af6901fb134ddde5f4b7ee39e047c4154480c3dd93030912a5d3f87097  node-v22.15.1-linux-ppc64le.tar.gz
da07858c6404dbe7c627bd7baea33c7825640652ad24468a6feb23c770cf7ce4  node-v22.15.1-linux-ppc64le.tar.xz
6b5a9615b66e553189578a4be33099f70add96c3b00bf38b7dcd91825ea1672f  node-v22.15.1-linux-s390x.tar.gz
7a6206af04399c090aaa7b3d568b1540e127b50931f5022ff2eaf680fc32a9c6  node-v22.15.1-linux-s390x.tar.xz
f4b8eec683708acb1a2a73c7182ba2de5466a5dd5f705934a0830903df28821c  node-v22.15.1-linux-x64.tar.gz
7dca2ab34ec817aa4781e2e99dfd34d349eff9be86e5d5fbaa7e96cae8ee3179  node-v22.15.1-linux-x64.tar.xz
2cafb8c5ee545d387409b6dab34b3552c90e247b7d2bd3964a68f42b26b3e8bf  node-v22.15.1-win-arm64.7z
dec85d230d45a6319130cbc844e8ecf8767b150bfeddd340f6b7c4a2e8c3ccb8  node-v22.15.1-win-arm64.zip
3abcca34447dace08cecd2bfd7b6521b22bfa89cff7bd70e7cde777218c84d6a  node-v22.15.1-win-x64.7z
7c7997d6ef2efd9525a54b033fc0be6f22549a5905f5da6573a41e61a436a1b5  node-v22.15.1-win-x64.zip
7b9999b5da0933f677ffff2a9ab211aebdcf23b1ed0f2e1db573cea757944103  node-v22.15.1-win-x86.7z
dd432043e8c90b7f221bd3ba8e6443fb69e7b8273049fad0669a3a7d66939985  node-v22.15.1-win-x86.zip
facb02bdf67cb9a7519c192b504fbfdbf47d8a67f36696d7d91a069b69904398  node-v22.15.1-x64.msi
89ef1c6181749a7739f6df58a73aa2127d0c7d6afe0236f5998d69ec98ec2154  node-v22.15.1-x86.msi
839f599498d36fabc3f7c940cabbaf14844e6380ba97a91299f7378b69e675c6  node-v22.15.1.pkg
38aea029f8818f7783f273fbc70dcf930f9ef54bdd49c5f90c0152caec7a57be  node-v22.15.1.tar.gz
c19f0177d21c621746625e5f37590bd0d79a72043b77b53784cba5f145e7263e  node-v22.15.1.tar.xz
e9e669cf7e9772406e3a59cb4b9b606e75eb1d9f454b675e1c78a6aaa542b31d  win-arm64/node.exe
6c43922c747e0c07fcc4ceb64f08e98854a5c1b31665764076f5783556973d16  win-arm64/node.lib
957076a2623c6f9355a21aba2031a7248d411a6f40950e7b710fbf76a666f5e9  win-arm64/node_pdb.7z
5ac29419b5aaa475ba0606a021ed5cea77b18df74b5e42d57a706011004f6be4  win-arm64/node_pdb.zip
b3191cc083480282f1edaa3324002c320704a00d7564cf1f7c48b610d1c060b6  win-x64/node.exe
e731ad9af05eabe6bd941442b19dd6037f559a19a2fa8df2a8297ccb46ed7577  win-x64/node.lib
84eec3bf646e04287fef10dc110a7aa82a4304ddcbd0b148aa90c0d44b08ea1d  win-x64/node_pdb.7z
b8b3364ad0735d45c25fb19c8b49f4c5e0c72a94f5d8fa44abddd80c15715538  win-x64/node_pdb.zip
ddd0ef952950dcaa7f705bdde5f4fd0c8a78a7c6db6dad32f8e13e3b120ad5e4  win-x86/node.exe
5f66397542e27adb288e1742720cedbeaba8a2034ebd58397306b2905f4acd2d  win-x86/node.lib
e5bd0ae9dc388aa4fd72067e3239333537c42329746124437c32b81ff2291ef4  win-x86/node_pdb.7z
b5e39e2168abe7c9418f2cebcd813db9c1a0841274b1405aeffe13ffef74c264  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmglBa4ACgkQi+q0389V
XvTAhQv8DzNseoHxhjMLTvSh8qGz8rV3dp8TpeFfJUgseZEoeq6DykvS9bA18ilB
od5YkHPQap/xWO89UJ0nq50HVySuCsTSOFDrDShzumVkgEtzCUFuFS4ZyQHJpYwi
56Fk+sea5QbzjbG/Fg/L2bgyNXmpdmjYejw6fw5AkVLk8p5OgLHDGFrGrezQ2NWO
qH1V0R5m6XBtJyNIep9l7PJ+XPTxg7KMSG8u5gXzvlHsg8aaIY1ejCnAlPgzs/hD
Qu1fGcG5vFpdOMGctu+WjgaULyOJidDxbvvuYl18ZXcLeQw5pRTsik7GBsWBcTZo
5ccsUDNqx9noSrZImwZW4L1jR12yV6Tb9pwdbX698mplZLPNUVMWNcdAgdVgmpuh
pISSOw3m3VpUt7n/l+OmKOVavY22zn8GkOYQsk2js3+ltREFbdI+XfcU/Grx/K0k
tBu86dVM0UojHB3tcR44/ZCB4YctQYBjznUgaM9TMvL8E0rfwXLtXhBS64jziNw4
QO0+Nrm3
=scbF
-----END PGP SIGNATURE-----
```
