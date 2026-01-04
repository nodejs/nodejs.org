---
date: '2025-07-15T22:14:56.543Z'
category: release
title: Node.js 22.17.1 (LTS)
layout: blog-post
author: Rafael Gonzaga
---

## 2025-07-15, Version 22.17.1 'Jod' (LTS), @RafaelGSS

This is a security release.

### Notable Changes

- (CVE-2025-27210) Windows Device Names (CON, PRN, AUX) Bypass Path Traversal Protection in path.normalize()

### Commits

- \[[`8cf5d66ab7`](https://github.com/nodejs/node/commit/8cf5d66ab7)] - **(CVE-2025-27210)** **lib**: handle all windows reserved driver name (RafaelGSS) [nodejs-private/node-private#721](https://github.com/nodejs-private/node-private/pull/721)
- \[[`9c0cb487ec`](https://github.com/nodejs/node/commit/9c0cb487ec)] - **win,build**: fix MSVS v17.14 compilation issue (StefanStojanovic) [#58902](https://github.com/nodejs/node/pull/58902)

Windows 32-bit Installer: https://nodejs.org/dist/v22.17.1/node-v22.17.1-x86.msi \
Windows 64-bit Installer: https://nodejs.org/dist/v22.17.1/node-v22.17.1-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v22.17.1/node-v22.17.1-arm64.msi \
Windows 32-bit Binary: https://nodejs.org/dist/v22.17.1/win-x86/node.exe \
Windows 64-bit Binary: https://nodejs.org/dist/v22.17.1/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v22.17.1/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v22.17.1/node-v22.17.1.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-aix-ppc64.tar.gz \
ARMv7 32-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-linux-armv7l.tar.xz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v22.17.1/node-v22.17.1-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v22.17.1/node-v22.17.1.tar.gz \
Other release files: https://nodejs.org/dist/v22.17.1/ \
Documentation: https://nodejs.org/docs/v22.17.1/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

988da3f531740238fea22bd73bd27b3d3a9d780c3248494ae797fd1dc4737b6e  node-v22.17.1-aix-ppc64.tar.gz
538276e62f7428a86302bbe8908aa28b1a1f4635b75def8e308392894a0c3b6c  node-v22.17.1-arm64.msi
a983f4f2a7b71512b78d7935b9ccf6b72120a255810070afd635c4146bca7b31  node-v22.17.1-darwin-arm64.tar.gz
346ed47b18d7ce5ec0b7a3cd24f08623af1a8efdc8069ebc7cb7c38af1bdb7b4  node-v22.17.1-darwin-arm64.tar.xz
b925103150fac0d23a44a45b2d88a01b73e5fff101e5dcfbae98d32c08d4bee3  node-v22.17.1-darwin-x64.tar.gz
152731560b9753d62a8c67e4bcb4d9b78dcba3f3b4dfcc0ae6e1738595887ed1  node-v22.17.1-darwin-x64.tar.xz
21d248e607efae5852b3cbef0747af796432d37b50c4d644ec7ab54e52ad3f00  node-v22.17.1-headers.tar.gz
489aaa932c3bdcb69e4b0cbf2da7e677ef21931b2cc66f36b726ab090f5b26fb  node-v22.17.1-headers.tar.xz
f53510706998cf044f634190416f0588e7e1937aecea938768952e0f0ac1f41b  node-v22.17.1-linux-arm64.tar.gz
a5bb879af2fe70e7b5dc5e0bbadecba88e87f45bd8e62c0c57b5c815a4cbbaa6  node-v22.17.1-linux-arm64.tar.xz
520dcd113eca345074cab3c3e7c23b93517a6a0a22fac98e843b195fcfdcc5d7  node-v22.17.1-linux-armv7l.tar.gz
5be9a0d4808415365dce0fa4d051db93f2a708d175beb956762970971aa3ed81  node-v22.17.1-linux-armv7l.tar.xz
c07ee9fb0c0396f5551a9c0228570fdb45ebf21ba9723f7098671320f364a202  node-v22.17.1-linux-ppc64le.tar.gz
e97d90a254d4741ee4c9ca989fb21d743c0708eb7176cdc78e1b7026a954fe49  node-v22.17.1-linux-ppc64le.tar.xz
5ee94f6e421a383435c2f96b8e5742ad0eea54a851dc6b66583fc28a2f84cd33  node-v22.17.1-linux-s390x.tar.gz
c1e144457f6779d18eac9ffc31ca687cc127d27fe7c73092cc321be21d6a1011  node-v22.17.1-linux-s390x.tar.xz
cfb6ac0cf339825fe36efd1f18a79016b02aca19fbfa6c9547c57e27dc09f6ea  node-v22.17.1-linux-x64.tar.gz
ff04bc7c3ed7699ceb708dbaaf3580d899ff8bf67f17114f979e83aa74fc5a49  node-v22.17.1-linux-x64.tar.xz
6cc39aee7c832b1de1c7c44f1f4746351fc38d7880af67aa5238503eb647d830  node-v22.17.1-win-arm64.7z
588d42c7c90eecf14ed4fc126a64cc70993e3a002f93e26be9c979cdc516b0d3  node-v22.17.1-win-arm64.zip
87e44340313b125ee7f4ea1a3877ba9aede1030fcbc8edd9f57e43fd3257037c  node-v22.17.1-win-x64.7z
b1fdb5635ba860f6bf71474f2ca882459a582de49b1d869451e3ad188e3943eb  node-v22.17.1-win-x64.zip
b7e7e75d570074cd40645c8db6806ea08d121a00c1af11fd110540434664ae45  node-v22.17.1-win-x86.7z
ccfc8901bba74052a4fd9c15ec8e01f45d3014646d909026e3a07a270c4194fb  node-v22.17.1-win-x86.zip
29bf63d4be9e9ba53d8974086cd9ef2403317e6c237d98d6e498205da4d48753  node-v22.17.1-x64.msi
79ff602686c2ef16187c1624b9fb3bce3bc09e33716bcfab3168a6111832e87e  node-v22.17.1-x86.msi
31f30608a6c9961ef3d19002a578899d40cdaa6583d0d46744ae2be9aa137b0d  node-v22.17.1.pkg
167539d86368bb911488f888a05355df5002b302285d353179c9dd957233add5  node-v22.17.1.tar.gz
327415fd76fcebb98133bf56e2d90e3ac048b038fac2676f03b6db91074575b9  node-v22.17.1.tar.xz
d3b6849e4e0d9770024df678c4f77356065922d30c07a37dcf1bc4012c711d94  win-arm64/node.exe
c174ae3348a4a59c9d61629a7a73a38679fd27c55b2a7d85a2ea3e65de2beb13  win-arm64/node.lib
6d85c14c2f3c11607f3e15912391971783046198f0aebe5251c7a1b7d6f06b91  win-arm64/node_pdb.7z
62d2b887ebe89621d2e5441a01e95f74839773c039cdd8a43a087f4285b3bfa0  win-arm64/node_pdb.zip
0f1098a455c7058daaaccd660d3a71dfed1cc0ffe8bea826170a7807d36fcef2  win-x64/node.exe
4af0951712fb05a686a03e0592880e195ba53e5eb70e224d7ea7b8b76f2a3e86  win-x64/node.lib
b97379b2499adec83b4ac64fec048390404f29b667d3676fa3d1fead01d1ca5e  win-x64/node_pdb.7z
fedbd933bcfdc60fc514c5234dbb10ac8fd0f2c0e7f9c203c738364dcea7602d  win-x64/node_pdb.zip
efb130fb88544c16e480524fbd0c77725864dd08c96d86b9849bfadb13fea13e  win-x86/node.exe
e1830d28633bfa80180edfffe5f091dc945701ba8cf2b743ca542d34759f505a  win-x86/node.lib
66233b440709942b94af935aa4b1aaf3faa520de73efbf53ed19ee61144c72f6  win-x86/node_pdb.7z
8b09448a6c5a9d863151f1c0a067d2c26632aa69a29af08ca75899a4e4f8c4e6  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCAAdFiEEiQwI24V5Fi/uDfnbi+q0389VXvQFAmh20jIACgkQi+q0389V
XvSXTAv/Xzy1q8t4LcX8TvXSf806U0cEhX7QK929dpvpdsMIgcbc8/u9AGWNkeOx
8fL7iQ35qQ6sUGkusfgXHx9a+QJkKXOCbjM1gHKvLBAEyemv2Aea4iQFe4yInSKQ
eQcBL11UsfQ4W7Ef/saMGzNaTSYKg3Ky/7t9icf8HAxvykNRr5IL2exMePdiiox2
Fq/Gq0RAMBUt12yUD80Q8pcrp75OgB9BXrngDed3wDeX/cj4YZMsNE5I8r7hxRo3
7Dm4F4/6XZc2iBkXRhcSMDXfCvPK+r42XP56d7V8sQf2NEFmlXnEoWTRddZ0D2hW
/RnlqdE8x0B6r34x+QXK0RNwL9qrcoTJ3q7ksCPWpWsVPDVMWeSfCHeoPlnJBX9J
+81oSiXzLtWT2JMnihl0OSabqZhjN/P2BP7Ny346kb9a+WsG7FpMwcR1Teq0UFCv
aC5ImzM5FA85EPAVGNQt0QuTK8aIfYt8jEzRovUVd5j8pkePUPMM/I2v+FheAj4N
YTq/Tg58
=rDZQ
-----END PGP SIGNATURE-----
```
