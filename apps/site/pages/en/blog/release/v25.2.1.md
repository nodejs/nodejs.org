---
date: '2025-11-17T09:43:14.200Z'
category: release
title: Node.js v25.2.1 (Current)
layout: blog-post
author: Antoine du Hamel
---

## 2025-11-17, Version 25.2.1 (Current), @aduh95

This release reverts the spec-compliant behavior of sometimes throwing on `localStorage`
access. We received feedback that this change on an experimental API was too breaking
for a semver-minor release, so we decided to push it back for Node.js 26.0.0.

### Commits

- \[[`ff89b7b6c7`](https://github.com/nodejs/node/commit/ff89b7b6c7)] - **crypto**: ensure documented RSA-PSS saltLength default is used (Filip Skokan) [#60662](https://github.com/nodejs/node/pull/60662)
- \[[`5316b580eb`](https://github.com/nodejs/node/commit/5316b580eb)] - **deps**: V8: backport 2e4c5cf9b112 (Michaël Zasso) [#60654](https://github.com/nodejs/node/pull/60654)
- \[[`ca878bc90e`](https://github.com/nodejs/node/commit/ca878bc90e)] - **doc,src,lib**: clarify experimental status of Web Storage support (Antoine du Hamel) [#60708](https://github.com/nodejs/node/pull/60708)
- \[[`a4dee613fd`](https://github.com/nodejs/node/commit/a4dee613fd)] - _**Revert**_ "**lib**: throw from localStorage getter on missing storage path" (Antoine du Hamel) [#60750](https://github.com/nodejs/node/pull/60750)

Windows 64-bit Installer: https://nodejs.org/dist/v25.2.1/node-v25.2.1-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v25.2.1/node-v25.2.1-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v25.2.1/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v25.2.1/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v25.2.1/node-v25.2.1.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v25.2.1/node-v25.2.1-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v25.2.1/node-v25.2.1-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v25.2.1/node-v25.2.1-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v25.2.1/node-v25.2.1-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v25.2.1/node-v25.2.1-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v25.2.1/node-v25.2.1-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v25.2.1/node-v25.2.1-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v25.2.1/node-v25.2.1.tar.gz \
Other release files: https://nodejs.org/dist/v25.2.1/ \
Documentation: https://nodejs.org/docs/v25.2.1/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

fcdb45fe4b6e582b0bee9b9d40deeb6391f5fa7be95a9df20a4a6d4a2a98d5d3  node-v25.2.1-aix-ppc64.tar.gz
7a6a25009f42cd183e66ede7c287f8ebe5bbf6019ae4dc2433f22dcb3b37aa70  node-v25.2.1-arm64.msi
be87e21bd235a451fad02c89e5bf7cb17e206e4cd89dd5664f20d19e7dfde6f9  node-v25.2.1-darwin-arm64.tar.gz
001b6f0e3f3edb4b7ad12a025a053016088692202d7aa534004c99e65b5c6358  node-v25.2.1-darwin-arm64.tar.xz
c266da5a9075a56e1aa02460ce8df96fca9e796c388abe94a8df4949945df6b6  node-v25.2.1-darwin-x64.tar.gz
c81a585ef93e781dc51c37f3f307480bfb7765b6ce3e69d3bad28f742e56fb81  node-v25.2.1-darwin-x64.tar.xz
ff7ac71b76dc4699f7d16aa3bfcd58a4260782dc7a41f1ed7e04c210fcb86b02  node-v25.2.1-headers.tar.gz
179848f5154db32632eec705792bbbb350e69279cc16c51809118e331505029d  node-v25.2.1-headers.tar.xz
905238a17be9ae62c16e596019268d8ca9f0fc3142602a1f860dc4a7c1ddbf82  node-v25.2.1-linux-arm64.tar.gz
75f910b5234d3ee324ceebcf41e2c3c221c4c2225463a02ecd685b884155e0f6  node-v25.2.1-linux-arm64.tar.xz
0ffdbbd4355f40221423af6f043a9370e1b6d2efb3ec27eb4e10e47adffa427f  node-v25.2.1-linux-ppc64le.tar.gz
14d1b9bc689499f29e045c479b3d89de997f59f2301e7cdc9ce8c72cb774c631  node-v25.2.1-linux-ppc64le.tar.xz
ba8b606da5a2a68e7a92b8e57c0a3a4f727f68fd8d3cc96cb765613353a8ca04  node-v25.2.1-linux-s390x.tar.gz
da9d5d680e0641a0d641c73b2b5b559f7a0d6d03f79dfa83fce9259fe48d054c  node-v25.2.1-linux-s390x.tar.xz
2094ecdc844ea11e9777cac42672b0d89cd63d27204193a587dc5a2d276bb940  node-v25.2.1-linux-x64.tar.gz
b9f6a97e81c89a9df45526b4f86dafdccaf12b82295f7bf35bdb2b0f5e68744f  node-v25.2.1-linux-x64.tar.xz
76217e8a774a72fca1a5a4499ecac0683906228cff467e8d4ef0c0edce979107  node-v25.2.1-win-arm64.7z
e2a3eda9fabf97929274cc9cbbf4f374743765630cbb1691a22d01040b0cf23a  node-v25.2.1-win-arm64.zip
2d2c1ce900db73f5a635c32dacb8bfab9c85d1ca10792bd9663973bf43936c51  node-v25.2.1-win-x64.7z
f97ba75ead7720652f3925d9cf8661e083a28c6b98ea77acc83903d77a9dd688  node-v25.2.1-win-x64.zip
4e16e4f3e761bc1242ab4f4f191b3f570cb498e31f3d6f14e01caf0db2573c22  node-v25.2.1-x64.msi
8412d3daa7f2f371fe1bc53eed78c36ec5b0e7cefa3ddf7df2e2325d45f2b675  node-v25.2.1.pkg
1cbbdb66f99e0c41937eb8763c57e622eab43006742dc4d0856270b17215e376  node-v25.2.1.tar.gz
aa7c4ac1076dc299a8949b8d834263659b2408ec0e5bba484673a8ce0766c8b9  node-v25.2.1.tar.xz
5578bff712aeda71adc13fd2bc92c8ec43718ca8c8b86066298d7a60f3171f93  win-arm64/node.exe
8505f43c0673d071ace6d57c0008eae3b7eca1b7cd6d334c7a632eff056a090e  win-arm64/node.lib
810808a7fc7e191420f1a777324e7b56d9e734fba80ca0bbdae6cfe337a34690  win-arm64/node_pdb.7z
37494480fedf3b54235a5238437e5d1e7a5ab9fd74fad11764d883a0775fd034  win-arm64/node_pdb.zip
91ec09dda8f20556f366110859f106ab189d45f8f6a2bd092e6785174ad4a0fa  win-x64/node.exe
d5fa10f3ab2f43420a7f2253a14508802e42541b14cd805e5f04d51cc0caa21f  win-x64/node.lib
a0945a9a46a8ed5ebadade35ed1afb305a3c09d29e78d803383962dc18c43e76  win-x64/node_pdb.7z
bdb7ea2f00114e6cc157561c82de4e9499ad3c702b7d089def54ab4abc3d9b61  win-x64/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaRrtHQAKCRAgsaOQsWjT
VgCkAP0aKK0dPYKyRrNcWFSzI7RisP2Ud7jWGZ1dF9ZQ/UW4CwD/cfMh//t+TDif
x2UGLv4ZHJQbCe4Iqfe3eO39e+zK0gs=
=M/ve
-----END PGP SIGNATURE-----
```
