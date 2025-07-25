---
date: '2025-03-27T13:13:25.848Z'
category: release
title: Node.js v18.20.8 (LTS)
layout: blog-post
author: Richard Lau
---

## 2025-03-27, Version 18.20.8 'Hydrogen' (LTS), @richardlau

Please note that Node.js 18 is scheduled to reach End-of-Life on 30 April 2025. It is recommended to update to Node.js 20 or 22 as Node.js 18 will no longer receive security updates once it reaches End-of-Life.

Extended support for Node.js 18 may be available through [third party commercial partners](https://nodejs.org/en/about/previous-releases#commercial-support).

### Notable Changes

This release updates OpenSSL to 3.0.16 and root certificates to NSS 3.108.

### Commits

- \[[`f737a79073`](https://github.com/nodejs/node/commit/f737a79073)] - **async_hooks,inspector**: implement inspector api without async_wrap (Gabriel Bota) [#51501](https://github.com/nodejs/node/pull/51501)
- \[[`fce923ba69`](https://github.com/nodejs/node/commit/fce923ba69)] - **build**: update gcovr to 7.2 and codecov config (Benjamin E. Coe) [#54019](https://github.com/nodejs/node/pull/54019)
- \[[`8b7ffd807c`](https://github.com/nodejs/node/commit/8b7ffd807c)] - **build**: fix compatibility with V8's `depot_tools` (Richard Lau) [#57330](https://github.com/nodejs/node/pull/57330)
- \[[`ee9a343413`](https://github.com/nodejs/node/commit/ee9a343413)] - **crypto**: update root certificates to NSS 3.108 (Node.js GitHub Bot) [#57381](https://github.com/nodejs/node/pull/57381)
- \[[`738bf8aea4`](https://github.com/nodejs/node/commit/738bf8aea4)] - **crypto**: update root certificates to NSS 3.104 (Richard Lau) [#55681](https://github.com/nodejs/node/pull/55681)
- \[[`69d661d591`](https://github.com/nodejs/node/commit/69d661d591)] - **deps**: update undici to v5.29.0 (Matteo Collina) [#57557](https://github.com/nodejs/node/pull/57557)
- \[[`59fcf43b0e`](https://github.com/nodejs/node/commit/59fcf43b0e)] - **deps**: update corepack to 0.32.0 (Node.js GitHub Bot) [#57265](https://github.com/nodejs/node/pull/57265)
- \[[`1b72869503`](https://github.com/nodejs/node/commit/1b72869503)] - **deps**: update archs files for openssl-3.0.16 (Node.js GitHub Bot) [#57335](https://github.com/nodejs/node/pull/57335)
- \[[`a566560235`](https://github.com/nodejs/node/commit/a566560235)] - **deps**: upgrade openssl sources to quictls/openssl-3.0.16 (Node.js GitHub Bot) [#57335](https://github.com/nodejs/node/pull/57335)
- \[[`50c4e1da2f`](https://github.com/nodejs/node/commit/50c4e1da2f)] - **doc**: add missing `deprecated` badges in `fs.md` (Yukihiro Hasegawa) [#57384](https://github.com/nodejs/node/pull/57384)
- \[[`c3babb4671`](https://github.com/nodejs/node/commit/c3babb4671)] - **doc**: update Xcode version used for arm64 and pkg (Michaël Zasso) [#57104](https://github.com/nodejs/node/pull/57104)
- \[[`784da606a6`](https://github.com/nodejs/node/commit/784da606a6)] - **doc**: fix link and history of `SourceMap` sections (Antoine du Hamel) [#57098](https://github.com/nodejs/node/pull/57098)
- \[[`f5dbceccbe`](https://github.com/nodejs/node/commit/f5dbceccbe)] - **test**: update error code in tls-psk-circuit for for OpenSSL 3.4 (sebastianas) [#56420](https://github.com/nodejs/node/pull/56420)

Windows 32-bit Installer: https://nodejs.org/dist/v18.20.8/node-v18.20.8-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v18.20.8/node-v18.20.8-x64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v18.20.8/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v18.20.8/win-x64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v18.20.8/node-v18.20.8.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v18.20.8/node-v18.20.8-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v18.20.8/node-v18.20.8.tar.gz \
Other release files: https://nodejs.org/dist/v18.20.8/ \
Documentation: https://nodejs.org/docs/v18.20.8/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

5a962ef966f9548117dea4d57615012efc6386a7b55c9a12c16fd7e674af375b  node-v18.20.8-aix-ppc64.tar.gz
bae4965d29d29bd32f96364eefbe3bca576a03e917ddbb70b9330d75f2cacd76  node-v18.20.8-darwin-arm64.tar.gz
6626fb7526fb2d84c8200ab915496934f44f0cfa7bd6c73318322e43ce21457a  node-v18.20.8-darwin-arm64.tar.xz
ed2554677188f4afc0d050ecd8bd56effb2572d6518f8da6d40321ede6698509  node-v18.20.8-darwin-x64.tar.gz
8e15d82da8e0265eaff6207add4b5c5bc23d05f7afb78e5694d1e3d93ba05139  node-v18.20.8-darwin-x64.tar.xz
10ef9e563840b5be0f291a114afb726523178ee5f51d23bf532d28f22c23bce9  node-v18.20.8-headers.tar.gz
b188159acff29d512fc553b990e52d1f13f39045115472176f9e231ed974170d  node-v18.20.8-headers.tar.xz
2e3dfc51154e6fea9fc86a90c4ea8f3ecb8b60acaf7367c4b76691da192571c1  node-v18.20.8-linux-arm64.tar.gz
224e569dbe7b0ea4628ce383d9d482494b57ee040566583f1c54072c86d1116b  node-v18.20.8-linux-arm64.tar.xz
d09ea19ff5eb7b0ff47d80316c708092ac401c138254e018e21b89bb6ed9abd0  node-v18.20.8-linux-armv7l.tar.gz
33a35700b8d5ff73a1223fc11282f0790dabf7e7d087612d8afd59319743d828  node-v18.20.8-linux-armv7l.tar.xz
3c0c7e5f414c2123b185924e3afac3bc6fcc3edbe14ec2782e9d5210a76d8b8e  node-v18.20.8-linux-ppc64le.tar.gz
57fde85b5f8e6b3c5d45e48a82dbd28f1d2dde816b0da2b5fc250c1a63ea49e6  node-v18.20.8-linux-ppc64le.tar.xz
6db3d48cabcb22f1f4af29633431b62d1040099a6e27182ad9f018c90f09d65b  node-v18.20.8-linux-s390x.tar.gz
35c81e08d26e25598e47dc4d1755f6bc0be802457a2f5bf775ead2ffccb73e89  node-v18.20.8-linux-s390x.tar.xz
27a9f3f14d5e99ad05a07ed3524ba3ee92f8ff8b6db5ff80b00f9feb5ec8097a  node-v18.20.8-linux-x64.tar.gz
5467ee62d6af1411d46b6a10e3fb5cacc92734dbcef465fea14e7b90993001c9  node-v18.20.8-linux-x64.tar.xz
d4cc1b92f87eade68a8a025ff186609958966639e64d0b993bf88691f3273118  node-v18.20.8.pkg
ec60a6d2344ef9e1f093991ca1bb6bbe92c61c29d1762c4b99e08f87dbb91e2f  node-v18.20.8.tar.gz
36a7bf1a76d62ce4badd881ee5974a323c70e1d8d19165732684e145632460d9  node-v18.20.8.tar.xz
a3aec6ddc837df1d838978568378ce877d36f1b1ade497b65db5ce93d7254c4f  node-v18.20.8-win-x64.7z
1a1e40260a6facba83636e4cd0ba01eb5bd1386896824b36645afba44857384a  node-v18.20.8-win-x64.zip
fea3bf9abebf12d96d76fd879326050af7d4e207a6203c4efddef875e3118e0f  node-v18.20.8-win-x86.7z
96327c25f8dab9a2403b95ac60ad0b715962aeac67d3cefdbe457e37f065aff2  node-v18.20.8-win-x86.zip
bd8b92343e12dbe9e573d2f5d5fec6953fcf12e00add58a29a6774391d02f342  node-v18.20.8-x64.msi
c7a04a1378cb66f5716f2b67c65921497972e883541bc48c0b19c92668f1713d  node-v18.20.8-x86.msi
3bc28aab59b609a6f359f456641789d646081291fc6505d6df2335e6eac89ae3  win-x64/node.exe
64d93225aaece04e3cd45177d6dea2b22df49e127281fefa3ade43ac46a36cc6  win-x64/node.lib
66e1addcf18db62f22ca754dfbf54fd17c634d88341a65c25453b19bbfa3d0bd  win-x64/node_pdb.7z
bb89d9899aea449680cb39942fab775a4a3355a94c32cca6941dbff4c6157f6c  win-x64/node_pdb.zip
878db391e180fa2cd8e5ef22ea23a7ef75506dfc7c63126975afb4e99bb6c002  win-x86/node.exe
8d068c16a75ff561595f2af576191d09a4669a87374abaff8782f8ce4e7d715f  win-x86/node.lib
e7c632600ffdf957c67aef16b06e824a97e5faaa27738494d8352b98126e6841  win-x86/node_pdb.7z
95616d5176f29174225fe774fe08ccef4092a757766478965dce8a48f2076d33  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEyC+jrhy+3Gvka5NgxDzsRcF6uTwFAmflTfAACgkQxDzsRcF6
uTw3JQ//R5Yj7rqy3N0ZLJT5T2TgM4/NNOMHXpJ3lyG+KYPBcahHTky6MRkx5PUV
4zupyFQCYBQAJZGyE9wtuZ3IFlWZKjd6FUcD5rwv8AJ2PyrMmGssJKY2gVg9Zgrc
er+qro0cJMSA3vOFd1lL8BKFSx4vIYWBixBMAxnak3GDDzUbReozuDTi2RkP82dJ
Y1O7+rW7lTLaMGDPGRHHayD66L1AB5VEXu01Kj13sFvY9gu/+4LgaafKzY9QzdsO
xcmNOqxHQ6Aw3F95MQbmrkh9729i6fkh0F5mai5m6qVfTcsktVVvGgNmZBcGIDb7
XkXZdpuJLL5iHBAsyIxZQmJLqx+wC7ZavnM9c+IWb2GgOuSpatxbjsz/BOOl1NbP
N5+4Oi+X3wgMaYLGK6GASFpgZFu+L4ybcvCNaY1XSOpjqvGV5c16SD54XzaK6Dx0
tul8IKsli4xN7vMeVgplEV+OFuR2p+TFWe8tCWnm9u67+8UInj6K9ffPYHZ58R9r
rX3jm7qboKzoLLifoyr87xinlHNPdE6AnyyDvnFL+7ET7eT3O4ZokQLLM0sRBCT1
l/PUF2UnrohvdORAEr5YUfB0lQ4xiN5M6KWJV0df/VVP3KCJSnximxVng9ciVLcU
P6iluYUI2Sh6fcgmaiQJMDeaco9YZkWba341FgHbD6FSXgTw5n0=
=gHz8
-----END PGP SIGNATURE-----
```
