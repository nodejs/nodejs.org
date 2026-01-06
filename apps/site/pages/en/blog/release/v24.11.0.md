---
date: '2025-10-28T17:06:33.916Z'
category: release
title: Node.js 24.11.0 (LTS)
layout: blog-post
author: Richard Lau
---

## 2025-10-28, Version 24.11.0 'Krypton' (LTS), @richardlau

### Notable Changes

This release marks the transition of Node.js 24.x into Long Term Support (LTS)
with the codename 'Krypton'. It will continue to receive updates through to
the end of April 2028.

Other than updating metadata, such as the `process.release` object, to reflect
that the release is LTS, no further changes from Node.js 24.10.0 are included.

### Known issue

An issue has been identified in the Node.js 24.x line with `Buffer.allocUnsafe` unintentionally returning zero-filled buffers. This API is [documented to return uninitialized memory](https://nodejs.org/docs/latest-v24.x/api/buffer.html#static-method-bufferallocunsafesize). The documented behavior will be restored in the next Node.js 24.x LTS release to bring it back in line with previous releases. For more information, see [#60423](https://github.com/nodejs/node/issues/60423).

Windows 64-bit Installer: https://nodejs.org/dist/v24.11.0/node-v24.11.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.11.0/node-v24.11.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.11.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.11.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.11.0/node-v24.11.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.11.0/node-v24.11.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.11.0/node-v24.11.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.11.0/node-v24.11.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.11.0/node-v24.11.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.11.0/node-v24.11.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.11.0/node-v24.11.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.11.0/node-v24.11.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.11.0/node-v24.11.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.11.0/ \
Documentation: https://nodejs.org/docs/v24.11.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

0151a80c79335c0131faa4083a41a3588435aea14dcf668306ad3eabfde71b65  node-v24.11.0-aix-ppc64.tar.gz
00371d745402d2bf315afe3db785a30be63654529bcde455646d9d9d0cfeb88f  node-v24.11.0-arm64.msi
0be2ab2816a4fa02d1acff014a434f29f56d8d956f5af6a98b70ced6c5f4d201  node-v24.11.0-darwin-arm64.tar.gz
30bbe12b71f5b89ba44e15dc0cfaf3c733538d46ee375691534b7bbe622225cc  node-v24.11.0-darwin-arm64.tar.xz
3884671e87f46f773832d98a0a6cabcc5ec4f637084f0f3515b69e66ea27f2f1  node-v24.11.0-darwin-x64.tar.gz
20e7138957b665ecfad519b656ad2a4e1d1b46c41c67f9a68842089a960c58be  node-v24.11.0-darwin-x64.tar.xz
2ff9a57553fabfa0498ed7ecb853760006c795d544179c00bce329bb736d4530  node-v24.11.0-headers.tar.gz
ab58411d0b31bc9e929c2a95838f7a72367d0a4be8da56cc42d71e76a1fe6ab3  node-v24.11.0-headers.tar.xz
4786d00c4d259d3ff0b2328307f764ef3ced65f2d6e9502d433e68d66238509d  node-v24.11.0-linux-arm64.tar.gz
33a6673b2c7bffeae9deec7f9f8b31aad9119b08f13d49b2ca3ee3bebfe8260f  node-v24.11.0-linux-arm64.tar.xz
7e7ba4326fe8588f11e763c55217bcf45f5e0b7bcbf1e26bbbbb2225a9ae4721  node-v24.11.0-linux-ppc64le.tar.gz
5e9fd1936c08ad6bf0cc69266af3f9815b598ff63419640da8379f7bd9afe9f5  node-v24.11.0-linux-ppc64le.tar.xz
7af0d92e74b07a2b8e91089ee4fccc7b5433fd8b63259bced3a34668998cbdf7  node-v24.11.0-linux-s390x.tar.gz
8c7eca962686b98c0c5eaf46d96f24cd6d0e2f950954051027899c6b57bc7680  node-v24.11.0-linux-s390x.tar.xz
b3c071cdf47aab867c3b2aa287257df12ec5d7c962bf922b32fd33226c4295fd  node-v24.11.0-linux-x64.tar.gz
46da9a098973ab7ba4fca76945581ecb2eaf468de347173897044382f10e0a0a  node-v24.11.0-linux-x64.tar.xz
7d58266984390614a35bcd32168de75130aa6547adbf1317e3dae487df9387bb  node-v24.11.0.pkg
2f7bddb50c5ab526c2896817652f80cc200c6b647edbdb75293d58b422cdb71f  node-v24.11.0.tar.gz
cf9c906d46446471f955b1f2c6ace8a461501d82d27e1ae8595dcb3b0e2c312a  node-v24.11.0.tar.xz
cebc870a3597f53fc979a6ff8a8e866de1ce7d98a4b671ffa4de56b907118a5b  node-v24.11.0-win-arm64.7z
12d3b1aa9696b7411e115a4fa2aef57f95560b5ee16bb62cd69843e535ec72be  node-v24.11.0-win-arm64.zip
261277b58400f23595804c0ad246f924c621b942da052bebf897f49e126733f3  node-v24.11.0-win-x64.7z
1054540bce22b54ec7e50ebc078ec5d090700a77657607a58f6a64df21f49fdd  node-v24.11.0-win-x64.zip
2d411f63490613d51e6047752bc2fae99a8e5fabdf20d5267c9851eab4c67528  node-v24.11.0-x64.msi
bff61f0730286842f6e4e7062dabe22b3c79897a15c2d1007bb38c82bc26ef96  win-arm64/node.exe
fb036d418573ea032176a432dd14bc7d929c2a7d9f7a2d0d5239c2d9448a608e  win-arm64/node.lib
1832fe9e4238afc63392391e1d2cacab3d08036e64f875f9efaafe0af7fb9f9f  win-arm64/node_pdb.7z
cdfbfc10d52750d484502f58e0db57d7a03a9f2b49ad19043198667997bf5968  win-arm64/node_pdb.zip
b7d912484d42e7a0d0cb5b26a86410ec973a79ece7d61ad535e2d1a97a9026e1  win-x64/node.exe
05f6163d27cfc385e7d39fdf2e4d0950e6e56b5f85da5df9f201ecd7e3d2b69a  win-x64/node.lib
a943149ceda0c682df43fcdce96075dd559e9f2d64f3801545d8073160c43b52  win-x64/node_pdb.7z
1747544a3fe51f22d006211410073ef14f30fe53e36eef14008774b57054efa7  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEyC+jrhy+3Gvka5NgxDzsRcF6uTwFAmkA9poACgkQxDzsRcF6
uTyu3A//Z1y0f8mCjEKFDjis+YfnIT87W22dfqn9lwjb0gmgTYpUsCVCofXdyPZ2
IImbZsKVRFP//ROTL+CTZX/wZyVdur1Iqt+OdBzw5f343+8MAZgkw9GvNcUG0Uwq
LvdpjBP+oW7f7zkyRFnJ8Hh/pYAkYgG3Wog14vNXMgBgEuyIHeI2C6zjV/MlHSp8
COLyeDqYJwRDCypoJTZY1bX1AJkKuV+a4ITAit+9m/VzlDomxYv/w1/Sql61/DW7
W5qCnd9tsxd6FvKnNojjz7QOw7xRxJiwUK9igcLxgZnq7nydC9fXhv5XtOoty+wb
+tOzlmMYw49YnnhaAY7CgwHaYCLM/K8PBJ0t9INqzeSJHQEsZ+xe4CIGf6fIpdBu
e7mGUgtuZz8czs3mnKJaEmXod5WZ85KpbB4kLnTpWfP4pO5LcFZzFFsS4pdwWR2W
DHxtPuTz5SlA8SsKf0Mt0Htt0YKAgQnGpnbph/zRF2zUiy+f9ct8G0Mt+dMOYC+Q
4jdhMA3tGjcgtuNBMJPdTGnBm0hvFf5QjpyIdTSyRvGFuc1k6mY30xhDG1ptzsA8
LzsHBEVG9gv/Wk25puKJ6W+gknFJen1jwgaKOzFtd4YwjBgP7sf9npnVtuETRxP6
f1mQh/OzkSKDoEoIE3IQf6cuqKv92OAjVApx8eRzIFFlUacvVfU=
=mSKP
-----END PGP SIGNATURE-----
```
