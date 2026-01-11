---
date: '2025-04-22T10:52:03.953Z'
category: release
title: Node.js 20.19.1 (LTS)
layout: blog-post
author: Ulises Gascón
---

## 2025-04-22, Version 20.19.1 'Iron' (LTS), @UlisesGascon prepared by @RafaelGSS

### Notable Changes

- \[[`d5e73ce0f8`](https://github.com/nodejs/node/commit/d5e73ce0f8)] - **deps**: update undici to 6.21.2 (Matteo Collina) [#57442](https://github.com/nodejs/node/pull/57442)
- \[[`e4a6323ab2`](https://github.com/nodejs/node/commit/e4a6323ab2)] - **deps**: update c-ares to v1.34.5 (Node.js GitHub Bot) [#57792](https://github.com/nodejs/node/pull/57792)

### Commits

- \[[`d5e73ce0f8`](https://github.com/nodejs/node/commit/d5e73ce0f8)] - **deps**: update undici to 6.21.2 (Matteo Collina) [#57442](https://github.com/nodejs/node/pull/57442)
- \[[`e4a6323ab2`](https://github.com/nodejs/node/commit/e4a6323ab2)] - **deps**: update c-ares to v1.34.5 (Node.js GitHub Bot) [#57792](https://github.com/nodejs/node/pull/57792)
- \[[`b2b9eb36af`](https://github.com/nodejs/node/commit/b2b9eb36af)] - **dns**: restore dns query cache ttl (Ethan Arrowood) [#57640](https://github.com/nodejs/node/pull/57640)
- \[[`07a99a5c0b`](https://github.com/nodejs/node/commit/07a99a5c0b)] - **doc**: correct status of require(esm) warning in v20 changelog (Joyee Cheung) [#57529](https://github.com/nodejs/node/pull/57529)
- \[[`d45517ccbf`](https://github.com/nodejs/node/commit/d45517ccbf)] - **meta**: bump Mozilla-Actions/sccache-action from 0.0.8 to 0.0.9 (dependabot\[bot]) [#57720](https://github.com/nodejs/node/pull/57720)
- \[[`fa93bb2633`](https://github.com/nodejs/node/commit/fa93bb2633)] - **test**: update parallel/test-tls-dhe for OpenSSL 3.5 (Richard Lau) [#57477](https://github.com/nodejs/node/pull/57477)
- \[[`29c032403c`](https://github.com/nodejs/node/commit/29c032403c)] - **tools**: update sccache to support GH cache changes (Michaël Zasso) [#57573](https://github.com/nodejs/node/pull/57573)

Windows 32-bit Installer: https://nodejs.org/dist/v20.19.1/node-v20.19.1-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v20.19.1/node-v20.19.1-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v20.19.1/node-v20.19.1-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v20.19.1/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v20.19.1/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v20.19.1/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v20.19.1/node-v20.19.1.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v20.19.1/node-v20.19.1-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v20.19.1/node-v20.19.1.tar.gz \
Other release files: https://nodejs.org/dist/v20.19.1/ \
Documentation: https://nodejs.org/docs/v20.19.1/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

0a303961d5910a3c35258e7f984ba1dd49fe95450134feccd6b28b274eb9656b  node-v20.19.1-aix-ppc64.tar.gz
0dd69783a3adc6003312354b6450be3aa3a5043e648b3b25f1c40db7d88d771f  node-v20.19.1-arm64.msi
d3746fee0e00e3a7fedf50633f8e04adb6873b1fe9b5b50c37dff16f64a4f2c7  node-v20.19.1-darwin-arm64.tar.gz
15f6afc9465cbd63dd2ff2d7b40cc1c8ffed1ec105c79e34e2fd0e4145f8f335  node-v20.19.1-darwin-arm64.tar.xz
f4963877f026cca411b537029cee01d1fde6d3293cfb88d77096794cb89c866b  node-v20.19.1-darwin-x64.tar.gz
6b889d521c1d2a8e4aea51ba5ece21f48e0f74449c80e3b69707173fb4989ccf  node-v20.19.1-darwin-x64.tar.xz
54771863587c3f03f2c0612379962b06e556735130205f992ccb1aa878b2159b  node-v20.19.1-headers.tar.gz
28e804aecbfb09e2a29782dad9b3bb3228a2648d0300928522ded8d92b421a90  node-v20.19.1-headers.tar.xz
f8fac0cc6cb06b4e443febda59178d5a6c6a5379e0194e6d156d3d3116e75b5f  node-v20.19.1-linux-arm64.tar.gz
0f6a0aaca9181de98c0a11d97b8873aa5ddd87e0f48385fc89697e25c3675a18  node-v20.19.1-linux-arm64.tar.xz
8bcb0c923f0c6ebd0e4e635fb8765bf1a02b64a5f9a679a4fa94cd9f53e5ee74  node-v20.19.1-linux-armv7l.tar.gz
e600c0f3eb7756dafcfc0faa16a6a8f99f60efe8a8bcd3080c7f1f0a92497943  node-v20.19.1-linux-armv7l.tar.xz
e9f603f6494a453164dcd9ede175d14ea13e61838881dc0944cf230ff5d68c69  node-v20.19.1-linux-ppc64le.tar.gz
38bec57528cf98749c7c1348d1bf788837eedef232f61860012bf4bca956d6af  node-v20.19.1-linux-ppc64le.tar.xz
062c526695ed64cacab20d266b0a993ce264ee3e1fe5da007a51ba98357c7321  node-v20.19.1-linux-s390x.tar.gz
369887ddc84ace855c3416107e9570e5d2ce0569cdbf7076a7e340ce991f6ba2  node-v20.19.1-linux-s390x.tar.xz
086ab500a98900a4c05127559b2cec4d659b3aa674453be5028d416de4eb1532  node-v20.19.1-linux-x64.tar.gz
b6c4cedfc81fc544b9993bc8a3628b5c0aa7a169fbaa293460abc0418d0fabb6  node-v20.19.1-linux-x64.tar.xz
dc156f0207b93c68c3d880d74f70ea4466aeff4c59c63792d2dfb57edde4a310  node-v20.19.1.pkg
691011ddb85c9ab86afb7ead2b6db2ddd45592f1c8fd26687d152dcadc182229  node-v20.19.1.tar.gz
5587b23e907d0c7af2ea8a8deb33ec50010453b46dbb3df5987c5678eee5ed51  node-v20.19.1.tar.xz
855a6881acd11b0387c9d2574c298607478a2af936da6637a1dcfbc2e527ba21  node-v20.19.1-win-arm64.7z
f9c88d4b414c87775d10fbb56deea4a531bfb313bb65fb448788d07dbf7af4ef  node-v20.19.1-win-arm64.zip
581b2f30b9bd80f3c7fb6f06dcfbd7e0a5a0e36fd62c23385e437cf8052aff0e  node-v20.19.1-win-x64.7z
ce04b36022aacc2cf50a8cd0ea2070156710f12f5ea070ccd48705ab090389d2  node-v20.19.1-win-x64.zip
aac13fdbf41e9faf1598fb675d0fc07315f381c08e252f7a82d35a7a211d14b8  node-v20.19.1-win-x86.7z
4184c25df3f11d7c8f121d6dd43d184f0a9e3cd685bc27f069682f3f81f002ec  node-v20.19.1-win-x86.zip
772eb3443df376d2159220de18d75465717c952a2babf57dfc6ca52d1a8b4748  node-v20.19.1-x64.msi
2248b8dcef4d37b71e74f1ee6cb6473026ddbe2868cd2ffb2b89ef82551f57ee  node-v20.19.1-x86.msi
f15fea26f62bf29e16c63e60e75b79070fe1408fecfb116a1a3215447b8c5bdb  win-arm64/node.exe
4a11371c2e93e729f91ef2160f4b36821e2d000a12668c4488801531ece5e8f7  win-arm64/node.lib
ddcc1ee37cd1e7a7f17d505a23784ffdb7f77d34f34c57769757ea5de479ce5b  win-arm64/node_pdb.7z
93de565ce24e7ba21882b4b2239ef17925e060d38e6f75de2dc75cb88dfb007b  win-arm64/node_pdb.zip
9bb47f21f83de492b85a8f19faca925441923828295a46f17902672a39a60863  win-x64/node.exe
72f7ca3b33f0991e93e25521f7e78c8adf187df7d5223bf0efcb5e005420f327  win-x64/node.lib
03f73d8c96072a314dad6dfa005000e519cbca5cb367bf8df405786b92154c28  win-x64/node_pdb.7z
14bc676989a52d7bb2d6eb6fc17f97832200d1ebca5c8052bdfc24af1413f669  win-x64/node_pdb.zip
e6a13efea2b010b510778c8cdef2571c5a9c2c8ffb3bd7ea832bce90ffccd800  win-x86/node.exe
1e70659d1bb7706899c116a5fec9ae0f5e75b691d8c5b9ed55cef9cd05760988  win-x86/node.lib
8400eaf0cf0eab70527f613f35dc2c2e422949cff92c42194a3ac396f387d0b8  win-x86/node_pdb.7z
c043f6bd90fcf58626bdd3a5f1dbfee6fc649a270c953e777eec5e21fa8816af  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEpgI1MPxTRh/skfmcBM0/L94HlXgFAmgHb9UACgkQBM0/L94H
lXh0eg//cNyyA6wkIIQJwv86R+8anziEIbt/leVNTt7kMWpylDZwxcrjkPY7un0f
veWya5b04+3ZOW0LtGA59jyJ1hZ2GIhkGtDIrDepNoyHyesmYZSVFCM4llCrNIGI
ev96MDQWyC3MkZ8w+OLpSnkLX2Vv5n3lNFdraWHnOXUJzc60EFLliUoX4TyEN7FP
Lij02BTkNzmtXDPJJdZg3NJJ1e9Gb09vA/wG5rZQsCOTi8s0/fYE4bGi0eFhTr9N
MHY8bcGsniLwb5ExtqI5okLrhl/plZwKBkSEGKHfeohnh/YXZjMsZVHAbh2eJBWF
I4B+0Zh+Y4NyBev3jFUMVVRlKsrn3jPGdJ85JkbM/OUGjr8UnzKh1abGi/fld5Z2
K4bfLoFR1Fyg9NJxivHVHYbzo9Iq5S6GigI+WN1O5sBfEc69yR9Wdd8jLp7b//8v
7ojBrTKPLRArgFLCb1LQBEqal4jjTbrv+i7prWZ4xSYYTjxSHa86Bh5sfazmYz9J
6AbIWbP5au0x6qprkH25Qi2be0K17EjJUlWci2NWoXWXslue2B/HssSfxKPQvtPu
G2LVMmf9E63FDHdCbqGXz9aXUlNieJIen4tUX6JdTHV9uVNBqNqkf3en1iUESrkC
rDd2oDrwN4euCsX4/YG9c8NTrSTyb7sDvYVFyP555xKrWm4p7cs=
=LGnD
-----END PGP SIGNATURE-----
```
