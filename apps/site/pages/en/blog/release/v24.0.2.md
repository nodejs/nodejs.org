---
date: '2025-05-14T21:17:11.440Z'
category: release
title: Node.js 24.0.2 (Current)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-05-14, Version 24.0.2 (Current), @RafaelGSS

This is a security release.

### Notable Changes

- (CVE-2025-23166) fix error handling on async crypto operation

### Commits

- \[[`7d0c17b2ad`](https://github.com/nodejs/node/commit/7d0c17b2ad)] - **(CVE-2025-23166)** **src**: fix error handling on async crypto operations (RafaelGSS) [nodejs-private/node-private#688](https://github.com/nodejs-private/node-private/pull/688)

Windows 64-bit Installer: https://nodejs.org/dist/v24.0.2/node-v24.0.2-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.0.2/node-v24.0.2-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.0.2/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.0.2/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.0.2/node-v24.0.2.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.0.2/node-v24.0.2-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.0.2/node-v24.0.2-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.0.2/node-v24.0.2-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.0.2/node-v24.0.2-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.0.2/node-v24.0.2-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.0.2/node-v24.0.2-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.0.2/node-v24.0.2-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.0.2/node-v24.0.2.tar.gz \
Other release files: https://nodejs.org/dist/v24.0.2/ \
Documentation: https://nodejs.org/docs/v24.0.2/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

ed574442f7a98dc5f88bf58d6a58d83a0a30243d51136000e42e5fb81becd2ab  node-v24.0.2-aix-ppc64.tar.gz
4abbed05a2390a11f457a9e427bc9212ee0db110bcf00284f0b4096d740c5ce5  node-v24.0.2-arm64.msi
dbd43bc96d7754eff03c241888c2cbc1e879bcbbf2f0961fb8e00e9cd3a21526  node-v24.0.2-darwin-arm64.tar.gz
d70813109d5ddf729367567c412370775143b7bed5579d6166b028db26cd8d64  node-v24.0.2-darwin-arm64.tar.xz
b408d41f8e322bcc71fd4d595156b34d4ad03ef149fba26386030c4cf7e2c1e9  node-v24.0.2-darwin-x64.tar.gz
ea5494fb9b8028b9d733c97ee491e3b860000009edaf50165fd16594f3d3c082  node-v24.0.2-darwin-x64.tar.xz
38499a8b9dc93c1e42f8b8ff21b5b19c859fb41639b014cbcf1196294bc07edb  node-v24.0.2-headers.tar.gz
b2f0f5f4ffc8983134cdd1c1d9f0fd804bcb2f91ae4770126e7f5ffdbcd1a9b8  node-v24.0.2-headers.tar.xz
78e02e66ea58612b6c84e349c9879333a3a83f51d8127f2593550a4d9a5c5c1a  node-v24.0.2-linux-arm64.tar.gz
16426a7dae665cb87abe8399737248eb9661dd57e5dc99fcf6ded6e36c524525  node-v24.0.2-linux-arm64.tar.xz
4dca6cffc15d1e67b43db342d6562f21918f281bc8a4c26b6d637cfcecf76153  node-v24.0.2-linux-ppc64le.tar.gz
8fae7a9cc4d909a5dee961ea032336240fcb4902463e5448367862b87daec9b2  node-v24.0.2-linux-ppc64le.tar.xz
11bb07d9dfd5b0c11ff9ae240d1bb25e6c2f1eeec49d09157b1d262f8e97afa3  node-v24.0.2-linux-s390x.tar.gz
0c0b781ac4edbab98c3146de0b645107a275f07ba93b899f469db41268ef0742  node-v24.0.2-linux-s390x.tar.xz
0a44c1982b14ad2c67ae0d8ec26934d99e43a55c11880459f44a76757775c8fa  node-v24.0.2-linux-x64.tar.gz
a5da53c8c184111afd324e1ed818c0fb23fe6f0a7d4583d47f41390dd389a027  node-v24.0.2-linux-x64.tar.xz
33cdb2171eb91be8380f666b5d8270f18accbccc4e108db438cfdc2973d2b944  node-v24.0.2-win-arm64.7z
33f0afdfe5fac6e2380025af09faef7d4152a1b12e374597b7006a85f8d6b746  node-v24.0.2-win-arm64.zip
46fa65be8aad5f761d9d40c7ba7b25f916b28bfd5a06600a97859960588b11d7  node-v24.0.2-win-x64.7z
259ca89fced60a5673548b57d0ed8cf813b9f310827b5fdfe042b4a105217b81  node-v24.0.2-win-x64.zip
053d291586491c2bf6b188e1441a93f724f6412477b85dccb3ef467cd3893a83  node-v24.0.2-x64.msi
aabe0e196bd7afecafb8fc41d77c6e9edefb4a673201f5d2867e67e58981d3d5  node-v24.0.2.pkg
db699b535192419b02f35668aadd48f4d80e99b8ef807997df159bcf15a5e6b9  node-v24.0.2.tar.gz
1597075afc06e5c6145d0bfbd77e2072c2ec0ab71ac4950cf008b2641374cd71  node-v24.0.2.tar.xz
4fe574d78a6d1e3c1f4935e0a1b56cb61cb9d4518f19f5d361b758fdbeca0ab3  win-arm64/node.exe
6809fc156673d10cca7dff0e54f28309bb111d235c54493a4a0ca401c2113be7  win-arm64/node.lib
deb49b68a7054e7e67a4e0521fdabb2b0009b6aa3918cd974b5db959a95d88ca  win-arm64/node_pdb.7z
1f5dd8db749eb818ef5fb50e842bc2f2eff1f6ef8417c1b8d3f5d8febea32916  win-arm64/node_pdb.zip
99713814015e536bb05675e2d41dbc36b1715a92db0e71a6876d4cd2865ba573  win-x64/node.exe
34882ca2bb450431047f2dd3bae1c3b8c1cd2b4cffd5c1a0bf079948846d2b83  win-x64/node.lib
6b5df16680cfc9d53a0ed7d245de211914fd44f0a8b83a4915e3f9dd054ce470  win-x64/node_pdb.7z
56efcf3ceee83f7dda7098da5c6864b22b4516e9a119f9e78e10b5c96de81d05  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmglBusACgkQi+q0389V
XvSW6Av+PSuZPVqzRzX4a8vuXxUapAgestbIQjcDtZNJDNnLUXKP7wmfTVcxAVr+
ZzxIMXWPvScAjAIccSkdXWEY1cSdX0pcHqx++GhX62FJshVtMuTjB3sTRAoIYYGg
ewOcsiqM5/wmYCl2K9KlrwPfeCLdX0mJ0X9K1yc7DVwv2RSU1dR5JFegJzGgigx8
MkFM73tTrHQ6t0C6MFX1d6iSH6MxyEpfGwVTxHNAUeywT/e0v9YfDEKs7Nl8MRVH
Cvv3bPlo22SlWTaTVvQ6s03f/HPsOKsxBg76L3Jih6/ahgJ2/GbgpuBM98b4Nprb
5jotbC386yeai/mYDTPD4FAzbQMboIBJG83Y2Gdxz6lYTV8cG+cC3rGNMixW95fS
y1VbwtuJxD9CRMqgQ3t+PnnTAhTBhcXiCGYRM1+APtkf9j27J9d2c+fsFhgBDPCa
rt/j+vkl1ZcOXkB7mW7d0+aak3D18po4LV5WxuuQKDbqSh5uFKxSi5p7uI0y8BLB
OAtNaq0H
=iXZN
-----END PGP SIGNATURE-----
```
