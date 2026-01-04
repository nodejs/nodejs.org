---
date: '2025-07-15T22:15:06.297Z'
category: release
title: Node.js 20.19.4 (LTS)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-07-15, Version 20.19.4 'Iron' (LTS), @RafaelGSS

This is a security release.

### Notable Changes

- (CVE-2025-27210) Windows Device Names (CON, PRN, AUX) Bypass Path Traversal Protection in path.normalize()

### Commits

- \[[`db7b93fcef`](https://github.com/nodejs/node/commit/db7b93fcef)] - **(CVE-2025-27210)** **lib**: handle all windows reserved driver name (RafaelGSS) [nodejs-private/node-private#721](https://github.com/nodejs-private/node-private/pull/721)

Windows 32-bit Installer: https://nodejs.org/dist/v20.19.4/node-v20.19.4-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.19.4/node-v20.19.4-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.19.4/node-v20.19.4-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.19.4/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.19.4/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.19.4/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.19.4/node-v20.19.4.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.19.4/node-v20.19.4.tar.gz \
Other release files: https://nodejs.org/dist/v20.19.4/ \
Documentation: https://nodejs.org/docs/v20.19.4/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

60230a634608f7ebefe9c56e98c690596e971a76e3ef2f9f90e276a410252ec1  node-v20.19.4-aix-ppc64.tar.gz
3943b720515ffba292f8cec4f59df4e11880716d9bbcb8cd09bcd9f68394fd95  node-v20.19.4-arm64.msi
8b89801f527a85e3f7de539512c9dde08673ac99db6458cc7cc627e05d707054  node-v20.19.4-darwin-arm64.tar.gz
34f01058aea5bbdb735bdb96077232f34a9fc25bfb32f5fb07dd7df3bd49e5c9  node-v20.19.4-darwin-arm64.tar.xz
cc47ed094c1876b211a9091d09a78537c1cbbb0f8cf5a49c9fd79933ee8fd7fd  node-v20.19.4-darwin-x64.tar.gz
56d293b415e0253adfe8df7a19d14e43f8f4cadab1076929ed29c4fcb076c687  node-v20.19.4-darwin-x64.tar.xz
e8140a84f5b6974bc363c96376d2dd7dd8d75f92a40d6c906e37e04220b87791  node-v20.19.4-headers.tar.gz
b94d9157d658abc04a476d7902713a578a873715fe9b7b227aeff17d97977e76  node-v20.19.4-headers.tar.xz
d200798332b7a56d355888ce58e6a639fac7939a4833e5bc8780c66888e1ce4d  node-v20.19.4-linux-arm64.tar.gz
4492c29882f604eb4cba6ce52ad2e6436f4eeb2b2917a74b0f85e6e42e261252  node-v20.19.4-linux-arm64.tar.xz
bdff86d5ff91214c6d6c421b42b35442daebcf42f85bbfb6643e7a950a093c3b  node-v20.19.4-linux-armv7l.tar.gz
53b04763def6a35d876abf10312536170ea02b4ac0ff44b9b69533b1656ac914  node-v20.19.4-linux-armv7l.tar.xz
572e3a4cc5371680b763eddda3df45704e3478d3c2d3c774927186184fba3ac9  node-v20.19.4-linux-ppc64le.tar.gz
8cc2bb753c4666f9148f07e44706d3c6cf029c8c27f282972207983f9d2591e6  node-v20.19.4-linux-ppc64le.tar.xz
17a95c4591478bf3ccd8919ff74810feb46d320c73e90430ac8ef0fb724705ae  node-v20.19.4-linux-s390x.tar.gz
dc34e66d92e7708d5ab42586ce30e654f5617cb520fc033ebae98f6c5311452a  node-v20.19.4-linux-s390x.tar.xz
d80a33707605ced9a31b8f543cea9ab512bc3d2fef2c148f31a50e939ff07560  node-v20.19.4-linux-x64.tar.gz
7a488a09e2fc02fbd1bc4ae084bea8a589314f741c182fc02c5f3f07c79a29d4  node-v20.19.4-linux-x64.tar.xz
8bc6b30ab6e23c49bfffe64512041a43170b6a0e8ec875d636fa77f32b56d094  node-v20.19.4-win-arm64.7z
1554251027d777d3dbb276af0553b2e9f89822a1579067216bc0b9522a3a22d3  node-v20.19.4-win-arm64.zip
034802e68bf326c67bb8a7ed77ef97935485fd83f6e250dede39b9aea144b366  node-v20.19.4-win-x64.7z
1bf83e5958157d13673507349238236aec4f6efc95cf426cbe126a999a3e4c0b  node-v20.19.4-win-x64.zip
a21039667013459d743f349bf539dc38d10e396df1b266809816264b6197204d  node-v20.19.4-win-x86.7z
b16bac5090e882172b45bd3258c0f937c37860d6b2fd65c7e91d54d06ec960aa  node-v20.19.4-win-x86.zip
358c0d097a5fce3228015558b1ce52edfb1398ac6f6e2dd745acd54380805320  node-v20.19.4-x64.msi
7ecbdc27dcc9bf99249c65487105872810a864419a986204a6ee911648b50973  node-v20.19.4-x86.msi
743113245f60515ccec7f5aabed8d4db2af1c0518761fee5605bbea13f2f36a5  node-v20.19.4.pkg
cc363c0a90fe5025939175c1c29ab67235f36ebe4b5d78506634da27a73eef5d  node-v20.19.4.tar.gz
b87fd7106013d3906706913ffc63a4403715fbb272c4f83ff4338527353eec0f  node-v20.19.4.tar.xz
b10724f69284147aa40ac4964d2e7da45b7de4c0771896af7bdf566639e58190  win-arm64/node.exe
dd8b0acfe80fa4ac731561848405b173cdc16ade8347e0ebb59bdb7aee668ed1  win-arm64/node.lib
9a94958669a7bf9f58c50d82aba206e460c508c4ecf26c6271198966feab7357  win-arm64/node_pdb.7z
64bd0e9cb6c9f7aca6e395d0072407581156c7a95383c4c8c1d3b8b120a24416  win-arm64/node_pdb.zip
7ffc3c2d46bb511c6330503040b76d4f0ed7bd04e767a1f7ba2486435e6a06ac  win-x64/node.exe
7d545cfcf38456553e83f419c72e91bf9bc80500bf8c0f3f838a7be020e88def  win-x64/node.lib
b43a3681914472d6b9bad07166e8a585fa196ac5b24f7dd9d27adcb138c43fe2  win-x64/node_pdb.7z
8f6676761ddbabe21f45c2ccd55480784c9a9d92ba898f89e5130072961bf71b  win-x64/node_pdb.zip
5347fb68e3f18bc0c6a487dd1ed2062d49bb08a96866419f39531c298f7a5678  win-x86/node.exe
d22e597766b0a8de355d244cd9417f8b67bbbc39e8a66ae2e1009ee4c7409bb2  win-x86/node.lib
8f5b93eaf5011cd969fab5ccadcd278e240fc194bb9faa5040fc4f0795e48819  win-x86/node_pdb.7z
5de1f3158813d0ca66714fdb0b2ae1676e337fd3bfe631becf2f8b3162877968  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmh20aIACgkQi+q0389V
XvQIsQv/e13DVozeLCT4Do9wl5wXvRS1in37M4Ha+hbQb7Q+XmxthH2ocod/IeEy
cnhYqN8u2pDFc9s8e40mDCJ+e8+o4dLrleLhmmCyR4eFYp/fOp4r32FaYN0FSP3f
Iwy28BRh1KHoYkZgAwrhksz+OqnEsq1HW3OHWzMYgX20YAkTfJlamChfrmIfExSW
qGKC13yjQp3K1ntke7ZdxY7mWJPAVwB1eg4psx87jXibn8tD8scFrUp5D2vwyUm4
x7TTXdlH7eTMPpRA4Rmmfe85YH3roXE16v3NeegRvRHX59y2iU5RsXufLuwU7MET
1CYM3pUj3ptiw0xDg46LjQCs5CrN/56tzKzGzUwniCB89SkI1V4aIvrsDspTryh4
GtNm3Ct7/AC5843S/1yNW9tSJCFr5gxeStwK1E1gom64RhmBLlxkSaoKNHP5NlDX
+zbRxWxWzr8XMDTM+eMWMXyFFNc4rPEVJm2q2BuU7S2B5uPtGsh/OG1D9ir3m5fm
N9WeqreY
=ehgP
-----END PGP SIGNATURE-----
```
