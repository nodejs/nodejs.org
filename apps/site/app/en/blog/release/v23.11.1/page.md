---
date: '2025-05-14T21:16:29.248Z'
category: release
title: Node.js 23.11.1 (Current)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-05-14, Version 23.11.1 (Current), @RafaelGSS

This is a security release.

### Notable Changes

src:

- (CVE-2025-23166) fix error handling on async crypto operation

### Commits

- \[[`a271810ce2`](https://github.com/nodejs/node/commit/a271810ce2)] - **deps**: update c-ares to v1.34.5 (Node.js GitHub Bot) [#57792](https://github.com/nodejs/node/pull/57792)
- \[[`a12107f0dd`](https://github.com/nodejs/node/commit/a12107f0dd)] - **(CVE-2025-23166)** **src**: fix error handling on async crypto operations (RafaelGSS) [nodejs-private/node-private#688](https://github.com/nodejs-private/node-private/pull/688)

Windows 64-bit Installer: https://nodejs.org/dist/v23.11.1/node-v23.11.1-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v23.11.1/node-v23.11.1-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v23.11.1/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v23.11.1/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v23.11.1/node-v23.11.1.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v23.11.1/node-v23.11.1-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v23.11.1/node-v23.11.1.tar.gz \
Other release files: https://nodejs.org/dist/v23.11.1/ \
Documentation: https://nodejs.org/docs/v23.11.1/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

b8e4e7f8940f4d4f1dbce5099708ef7038c41f38176524ac3b4c14e7e7324201  node-v23.11.1-aix-ppc64.tar.gz
e6c7a1e4749173876ee72b06e28ef16d5e5c6271bde3dd1a80ef01db30c8f607  node-v23.11.1-arm64.msi
255509d2c4fe8e1d6fefb950ad8db285ed75ba543e18744d83dc139f978e404d  node-v23.11.1-darwin-arm64.tar.gz
de9f09318dc13d492c09a8d11b12ffc153a8a22e79f8dc95d925b8e26cce9ba5  node-v23.11.1-darwin-arm64.tar.xz
7e384a0cfa8b44ee4833b3823485baad78bf258e54f47020d2d2b4b75e9275d3  node-v23.11.1-darwin-x64.tar.gz
f8b42dbb326553790f41311eb6d6947adc09eecff942d65a256ddbbfd78c2dae  node-v23.11.1-darwin-x64.tar.xz
04c112339bb2562c0763b19658aa9a392bc4509a0869d78dd7ca1501bdfc78ae  node-v23.11.1-headers.tar.gz
fc95283750460af25c0507a6fb85357a08bfc180392218d28725564d197cf4d8  node-v23.11.1-headers.tar.xz
277316a0b0ae3f50eb2cd57b74fa8a07f4d17fe0433468a790e6e47da297a9f6  node-v23.11.1-linux-arm64.tar.gz
3a0297c7f177d0fc06ea35c71909fbca6cdd891074c265a432c84971ebad4f7b  node-v23.11.1-linux-arm64.tar.xz
ead02a21e6f7144f588150f4684268502e467d9f76017ec5befb983caad9d0dd  node-v23.11.1-linux-armv7l.tar.gz
4dd49f33d9f2f9f18fea549ceabb33a15101f0435692c477cff4381f5c23a554  node-v23.11.1-linux-armv7l.tar.xz
1ba6e2e20c4602adbf58180254ac85a8b65d14c7f1e4c8558e7c425635d462ca  node-v23.11.1-linux-ppc64le.tar.gz
1717d673d294aca7ca4fb2ba43172113a65040ddbc4ca199302f76700508b3a8  node-v23.11.1-linux-ppc64le.tar.xz
2c1dc5f4c9e1b4926391fae71a05f58bd7eb1eb0cf1af75bf21248988d86cc50  node-v23.11.1-linux-s390x.tar.gz
f58f5e729be7b0bf5c842a0621bea208bcbc6226c3a774d75e7286dc768897a2  node-v23.11.1-linux-s390x.tar.xz
a2029c2b0cb05d10248e887c5df3f8547b7ab4aaa4e63b8e4da03e72f478140e  node-v23.11.1-linux-x64.tar.gz
64220ef391e74bb8feafe51a17764eff908f0cfd7f6c2c184fe8361fb8520a44  node-v23.11.1-linux-x64.tar.xz
d9bc16d509b336b88757487f256528ef4a8b0478cdeae0765b8a8bf50c4a81f5  node-v23.11.1-win-arm64.7z
5a8e3026657a6bb08156e9205f5f0b5a501df53b62804ad72b8352ca62ea5c4f  node-v23.11.1-win-arm64.zip
95f42a20db24f977fcf4317502c18dffb3b011b5ed1cb912f9571d49f2b7d7f0  node-v23.11.1-win-x64.7z
d22640060e1911efaede4ecc5820f94b613bc196868289cd34f56d46e4709b71  node-v23.11.1-win-x64.zip
5d096e1405e07e995f0dd017dd3575b4e16c8d3e1f583f67b945f55997baf5ad  node-v23.11.1-x64.msi
a58f531b6a97375acd1e1c8083c2f5b33ad9589ad6d8c26d5e802ca0f306ba9e  node-v23.11.1.pkg
75509306732090bfa99b004d097909315f7789badb4a495e82b5f17b6329247a  node-v23.11.1.tar.gz
aef6c67395c328376b665bceefc9d17a06a2961f9a92b93019dff39854d5b2ef  node-v23.11.1.tar.xz
3c736067409c824f7af47e92b220fa23bddecf33a118dc24b86eee38f52827a8  win-arm64/node.exe
580c1c53c658fd1f8ae51351c1f23d028ea85383c34bed5de6a890e90953b081  win-arm64/node.lib
520d2e6614b495997e699ff9dfbbfbbb4a9c6c42043f0336e3de20c0b2e7f6ed  win-arm64/node_pdb.7z
f6440d2308f8841a3e7bf0f7e34810eb75f1eafc460353592b0bd517c6e23f4e  win-arm64/node_pdb.zip
d84556784656e4f47eb086fa00af01c032a88b086492eb3cf1e9fab5029eb94a  win-x64/node.exe
acc6e547ada98361b3647b52ff4f9bca7bab82885988d4b25aa6e037ceaaa91f  win-x64/node.lib
77855cce7f5c6367bf7356f5bc5fc19add9a2def6adbc5f4d7df6487a3c82ca1  win-x64/node_pdb.7z
c439f964cf5a30ea077a980a922d2d93c29fef6883d428d2172aa1c0272b88ed  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmglBiYACgkQi+q0389V
XvR9UAv/T6XScEYGm2jh3dsIi2AVRUgwo0prZvDZm5ayar+cxtHCDbQk6EFxoP4o
UMTld6DIPzZF8mc0olzfpyWRppY/BmQDRDLO5qteFGgtY29+Cz2yRSW1I3lR1f9l
5Z+NOhmFvhLT40XXl6aNIf8qRrFr5Iu3QwT/ZTFv4JIyDEfiy0/ozxjYE/Bi3gka
tWPJgzURxBjG/ifZMvlP5NQB0ClR0AOJ+PC651xez9DUI/OUlQb8bVakbG51OPvH
AyCreSwO4B0oLSaYIwUdF/9JH6kynACdys4b3XX77SBSUiiG468zepC15fSGu5rB
+1BFA7/4AfyFdj5ucKgEIeoX97TF9/FOyBm4bHDr9RZHmPxHQz9mk7z9TnoGJ3pr
ruxghqlvUql0xMiJ5UgQq79BxzbNrRKE1/60e1yzZ5BwH4tp6Q3j7ipxHhyCrOBE
HwA+2sUQLD8byiBVeKyQRQriiHQ5zBmFYTPHrfceYEvqLxgLp0trEoZYBqz1I0Bp
enFA/qnU
=w5qU
-----END PGP SIGNATURE-----
```
