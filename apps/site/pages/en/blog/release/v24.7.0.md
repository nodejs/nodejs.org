---
date: '2025-08-27T21:27:15.405Z'
category: release
title: Node.js v24.7.0 (Current)
layout: blog-post
author: Michaël Zasso
---

## 2025-08-27, Version 24.7.0 (Current), @targos

### Notable Changes

#### Post-Quantum Cryptography in `node:crypto`

OpenSSL 3.5 on 24.x kicked off post-quantum cryptography efforts in Node.js by
allowing use of NIST's post-quantum cryptography standards for future-proofing
applications against quantum computing threats. The following post-quantum
algorithms are now available in `node:crypto`:

- ML-KEM (FIPS 203, Module-Lattice-Based Key-Encapsulation Mechanism Standard) through new `crypto.encapsulate()` and `crypto.decapsulate()` methods.
- ML-DSA (FIPS 204, Module-Lattice-Based Digital Signature Standard) in the existing `crypto.sign()` and `crypto.verify()` methods.

Contributed by Filip Skokan in [#59259](https://github.com/nodejs/node/pull/59259) and [#59491](https://github.com/nodejs/node/pull/59491).

### Modern Algorithms in Web Cryptography API

The second substantial [extension to the Web Cryptography API](https://wicg.github.io/webcrypto-modern-algos/)
(`globalThis.crypto.subtle`) was recently accepted for incubation by WICG.
The following algorithms and methods from this extension are now available in
the Node.js Web Cryptography API implementation:

- AES-OCB
- ChaCha20-Poly1305
- ML-DSA
- ML-KEM
- SHA-3
- SHAKE
- `subtle.getPublicKey()`
- `SubtleCrypto.supports()`
- ... with more coming in future releases.

Contributed by Filip Skokan in [#59365](https://github.com/nodejs/node/pull/59365), [#59569](https://github.com/nodejs/node/pull/59569), [#59461](https://github.com/nodejs/node/pull/59461), and [#59539](https://github.com/nodejs/node/pull/59539).

#### Node.js execution argument support in single executable applications

The single executable application configuration now supports additional fields
to specify Node.js execution arguments and control how they can be extended when
the application is run.

- `execArgv` takes an array of strings for the execution arguments to be used.
- `execArgvExtension` takes one of the following values:
  - `"none"`: No additional execution arguments are allowed.
  - `"cli"`: Additional execution arguments can be provided via a special command-line flag `--node-options="--flag1 --flag2=value"` at run time.
  - `"env"` (default): Additional execution arguments can be provided via the `NODE_OPTIONS` environment variable at run time.

For example, with the following configuration:

```json
{
  "main": "/path/to/bundled/script.js",
  "output": "/path/to/write/the/generated/blob.blob",
  "execArgv": ["--no-warnings"],
  "execArgvExtension": "cli"
}
```

If the generated single executable application is named `sea`, then running:

```console
sea --node-options="--max-old-space-size=4096" user-arg1 user-arg2
```

Would be equivalent to running:

```console
node --no-warnings --max-old-space-size=4096 /path/to/bundled/script.js user-arg1 user-arg2
```

Contributed by Joyee Cheung in [#59314](https://github.com/nodejs/node/pull/59314) and [#59560](https://github.com/nodejs/node/pull/59560).

#### Root certificates updated to NSS 3.114

Certificates added:

- TrustAsia TLS ECC Root CA
- TrustAsia TLS RSA Root CA
- SwissSign RSA TLS Root CA 2022 - 1

Certificates removed:

- GlobalSign Root CA
- Entrust.net Premium 2048 Secure Server CA
- Baltimore CyberTrust Root
- Comodo AAA Services root
- XRamp Global CA Root
- Go Daddy Class 2 CA
- Starfield Class 2 CA

#### Other Notable Changes

- \[[`d3afc63c44`](https://github.com/nodejs/node/commit/d3afc63c44)] - **(SEMVER-MINOR)** **crypto**: add argon2() and argon2Sync() methods (Ranieri Althoff) [#50353](https://github.com/nodejs/node/pull/50353)
- \[[`6ae202fcdf`](https://github.com/nodejs/node/commit/6ae202fcdf)] - **(SEMVER-MINOR)** **http**: add Agent.agentKeepAliveTimeoutBuffer option (Haram Jeong) [#59315](https://github.com/nodejs/node/pull/59315)
- \[[`dafee05358`](https://github.com/nodejs/node/commit/dafee05358)] - **(SEMVER-MINOR)** **http2**: add support for raw header arrays in h2Stream.respond() (Tim Perry) [#59455](https://github.com/nodejs/node/pull/59455)
- \[[`8dc6f5b696`](https://github.com/nodejs/node/commit/8dc6f5b696)] - **(SEMVER-MINOR)** **stream**: add brotli support to CompressionStream and DecompressionStream (Matthew Aitken) [#59464](https://github.com/nodejs/node/pull/59464)

### Commits

- \[[`0fa22cbf7c`](https://github.com/nodejs/node/commit/0fa22cbf7c)] - **benchmark**: calibrate config v8/serialize.js (Rafael Gonzaga) [#59586](https://github.com/nodejs/node/pull/59586)
- \[[`f5ece45b45`](https://github.com/nodejs/node/commit/f5ece45b45)] - **benchmark**: reduce readfile-permission-enabled config (Rafael Gonzaga) [#59589](https://github.com/nodejs/node/pull/59589)
- \[[`8ebd4f4434`](https://github.com/nodejs/node/commit/8ebd4f4434)] - **benchmark**: calibrate length of util.diff (Rafael Gonzaga) [#59588](https://github.com/nodejs/node/pull/59588)
- \[[`7dee3ffd14`](https://github.com/nodejs/node/commit/7dee3ffd14)] - **benchmark**: reflect current OpenSSL in crypto key benchmarks (Filip Skokan) [#59459](https://github.com/nodejs/node/pull/59459)
- \[[`027b861ca1`](https://github.com/nodejs/node/commit/027b861ca1)] - **benchmark, test**: replace CRLF variable with string literal (Lee Jiho) [#59466](https://github.com/nodejs/node/pull/59466)
- \[[`89dd770889`](https://github.com/nodejs/node/commit/89dd770889)] - **build**: do not set `-mminimal-toc` with `clang` (Richard Lau) [#59484](https://github.com/nodejs/node/pull/59484)
- \[[`e13de4542f`](https://github.com/nodejs/node/commit/e13de4542f)] - **child_process**: remove unsafe array iteration (hotpineapple) [#59347](https://github.com/nodejs/node/pull/59347)
- \[[`89fe63551e`](https://github.com/nodejs/node/commit/89fe63551e)] - **crypto**: load system CA certificates off thread (Joyee Cheung) [#59550](https://github.com/nodejs/node/pull/59550)
- \[[`152c5ef518`](https://github.com/nodejs/node/commit/152c5ef518)] - **(SEMVER-MINOR)** **crypto**: add AES-OCB Web Cryptography algorithm (Filip Skokan) [#59539](https://github.com/nodejs/node/pull/59539)
- \[[`c6c418343d`](https://github.com/nodejs/node/commit/c6c418343d)] - **crypto**: update root certificates to NSS 3.114 (Node.js GitHub Bot) [#59571](https://github.com/nodejs/node/pull/59571)
- \[[`18a2ee5b6c`](https://github.com/nodejs/node/commit/18a2ee5b6c)] - **(SEMVER-MINOR)** **crypto**: support ML-KEM in Web Cryptography (Filip Skokan) [#59569](https://github.com/nodejs/node/pull/59569)
- \[[`72937e5144`](https://github.com/nodejs/node/commit/72937e5144)] - **crypto**: require HMAC key length with SHA-3 hashes in Web Cryptography (Filip Skokan) [#59567](https://github.com/nodejs/node/pull/59567)
- \[[`b7383186c7`](https://github.com/nodejs/node/commit/b7383186c7)] - **crypto**: fix subtle.getPublicKey error for secret type key inputs (Filip Skokan) [#59558](https://github.com/nodejs/node/pull/59558)
- \[[`2d05c046db`](https://github.com/nodejs/node/commit/2d05c046db)] - **crypto**: return cached copies from CryptoKey algorithm and usages getters (Filip Skokan) [#59538](https://github.com/nodejs/node/pull/59538)
- \[[`207ffbeb07`](https://github.com/nodejs/node/commit/207ffbeb07)] - **crypto**: use CryptoKey internal slots in Web Cryptography (Filip Skokan) [#59538](https://github.com/nodejs/node/pull/59538)
- \[[`4276516781`](https://github.com/nodejs/node/commit/4276516781)] - **crypto**: normalize RsaHashedKeyParams publicExponent (Filip Skokan) [#59538](https://github.com/nodejs/node/pull/59538)
- \[[`14741539a7`](https://github.com/nodejs/node/commit/14741539a7)] - **(SEMVER-MINOR)** **crypto**: support ML-KEM, DHKEM, and RSASVE key encapsulation mechanisms (Filip Skokan) [#59491](https://github.com/nodejs/node/pull/59491)
- \[[`d3afc63c44`](https://github.com/nodejs/node/commit/d3afc63c44)] - **(SEMVER-MINOR)** **crypto**: add argon2() and argon2Sync() methods (Ranieri Althoff) [#50353](https://github.com/nodejs/node/pull/50353)
- \[[`4fe383e45a`](https://github.com/nodejs/node/commit/4fe383e45a)] - **(SEMVER-MINOR)** **crypto**: support ML-DSA spki/pkcs8 key formats in Web Cryptography (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`a95386fbf9`](https://github.com/nodejs/node/commit/a95386fbf9)] - **(SEMVER-MINOR)** **crypto**: subject some algorithms in Web Cryptography on BoringSSL absence (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`3f47a2fb63`](https://github.com/nodejs/node/commit/3f47a2fb63)] - **(SEMVER-MINOR)** **crypto**: add ChaCha20-Poly1305 Web Cryptography algorithm (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`6fcce9058a`](https://github.com/nodejs/node/commit/6fcce9058a)] - **(SEMVER-MINOR)** **crypto**: add subtle.getPublicKey() utility function in Web Cryptography (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`76cde76429`](https://github.com/nodejs/node/commit/76cde76429)] - **(SEMVER-MINOR)** **crypto**: add SHA-3 Web Cryptography digest algorithms (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`247d017501`](https://github.com/nodejs/node/commit/247d017501)] - **(SEMVER-MINOR)** **crypto**: add SHAKE Web Cryptography digest algorithms (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`f4fbcca5ce`](https://github.com/nodejs/node/commit/f4fbcca5ce)] - **(SEMVER-MINOR)** **crypto**: add SubtleCrypto.supports feature detection in Web Cryptography (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`a55382214f`](https://github.com/nodejs/node/commit/a55382214f)] - **(SEMVER-MINOR)** **crypto**: support ML-DSA in Web Cryptography (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`c38988c860`](https://github.com/nodejs/node/commit/c38988c860)] - **crypto**: fix EVPKeyCtxPointer::publicCheck() (Tobias Nießen) [#59471](https://github.com/nodejs/node/pull/59471)
- \[[`61c3bcdc56`](https://github.com/nodejs/node/commit/61c3bcdc56)] - **(SEMVER-MINOR)** **crypto**: support ML-KEM KeyObject (Filip Skokan) [#59461](https://github.com/nodejs/node/pull/59461)
- \[[`0821b446fb`](https://github.com/nodejs/node/commit/0821b446fb)] - **deps**: update undici to 7.14.0 (Node.js GitHub Bot) [#59507](https://github.com/nodejs/node/pull/59507)
- \[[`b3af17c065`](https://github.com/nodejs/node/commit/b3af17c065)] - **deps**: V8: cherry-pick 7b91e3e2cbaf (Milad Fa) [#59485](https://github.com/nodejs/node/pull/59485)
- \[[`9b69baf146`](https://github.com/nodejs/node/commit/9b69baf146)] - **deps**: V8: cherry-pick 59d52e311bb1 (Milad Fa) [#59485](https://github.com/nodejs/node/pull/59485)
- \[[`b4f202c2f1`](https://github.com/nodejs/node/commit/b4f202c2f1)] - **doc**: improve `sqlite.backup()` progress/fulfillment documentation (René) [#59598](https://github.com/nodejs/node/pull/59598)
- \[[`40b217a2f9`](https://github.com/nodejs/node/commit/40b217a2f9)] - **doc**: clarify experimental platform vulnerability policy (Matteo Collina) [#59591](https://github.com/nodejs/node/pull/59591)
- \[[`cf84fffea5`](https://github.com/nodejs/node/commit/cf84fffea5)] - **doc**: link to `TypedArray.from()` in signature (Aviv Keller) [#59226](https://github.com/nodejs/node/pull/59226)
- \[[`4bf6ed0bf5`](https://github.com/nodejs/node/commit/4bf6ed0bf5)] - **doc**: fix typos in `environment_variables.md` (PhistucK) [#59536](https://github.com/nodejs/node/pull/59536)
- \[[`1784c35a49`](https://github.com/nodejs/node/commit/1784c35a49)] - **doc**: add security incident reponse plan (Rafael Gonzaga) [#59470](https://github.com/nodejs/node/pull/59470)
- \[[`b962560240`](https://github.com/nodejs/node/commit/b962560240)] - **doc**: clarify maxRSS unit in `process.resourceUsage()` (Alex Yang) [#59511](https://github.com/nodejs/node/pull/59511)
- \[[`e6a6cdb9df`](https://github.com/nodejs/node/commit/e6a6cdb9df)] - **doc**: add missing Zstd strategy constants (RANDRIAMANANTENA Narindra Tiana Annaick) [#59312](https://github.com/nodejs/node/pull/59312)
- \[[`a6a31cb467`](https://github.com/nodejs/node/commit/a6a31cb467)] - **(SEMVER-MINOR)** **doc**: compress Web Cryptography Algorithm matrix (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`8f8960cfcb`](https://github.com/nodejs/node/commit/8f8960cfcb)] - **doc**: fix the version tls.DEFAULT_CIPHERS was added (Allon Murienik) [#59247](https://github.com/nodejs/node/pull/59247)
- \[[`9e76089f1a`](https://github.com/nodejs/node/commit/9e76089f1a)] - **doc**: clarify glob's exclude option behavior (hotpineapple) [#59245](https://github.com/nodejs/node/pull/59245)
- \[[`dd5f835af7`](https://github.com/nodejs/node/commit/dd5f835af7)] - **doc**: add RafaelGSS as performance strategic lead (Rafael Gonzaga) [#59445](https://github.com/nodejs/node/pull/59445)
- \[[`2b7a7a525e`](https://github.com/nodejs/node/commit/2b7a7a525e)] - **doc,crypto**: add supported asymmetric key types section (Filip Skokan) [#59492](https://github.com/nodejs/node/pull/59492)
- \[[`2fafe4c3bb`](https://github.com/nodejs/node/commit/2fafe4c3bb)] - **esm**: link modules synchronously when no async loader hooks are used (Joyee Cheung) [#59519](https://github.com/nodejs/node/pull/59519)
- \[[`5347c4997a`](https://github.com/nodejs/node/commit/5347c4997a)] - **esm**: show race error message for inner module job race (Joyee Cheung) [#59519](https://github.com/nodejs/node/pull/59519)
- \[[`b56d8af2fe`](https://github.com/nodejs/node/commit/b56d8af2fe)] - **esm**: sync-ify module translation (Joyee Cheung) [#59453](https://github.com/nodejs/node/pull/59453)
- \[[`b4a23d6a69`](https://github.com/nodejs/node/commit/b4a23d6a69)] - **http**: trim off brackets from IPv6 addresses with string operations (Krishnadas PC) [#59420](https://github.com/nodejs/node/pull/59420)
- \[[`6ae202fcdf`](https://github.com/nodejs/node/commit/6ae202fcdf)] - **(SEMVER-MINOR)** **http**: add Agent.agentKeepAliveTimeoutBuffer option (Haram Jeong) [#59315](https://github.com/nodejs/node/pull/59315)
- \[[`dafee05358`](https://github.com/nodejs/node/commit/dafee05358)] - **(SEMVER-MINOR)** **http2**: add support for raw header arrays in h2Stream.respond() (Tim Perry) [#59455](https://github.com/nodejs/node/pull/59455)
- \[[`b7ea39d860`](https://github.com/nodejs/node/commit/b7ea39d860)] - **http2**: report sent headers object in client stream dcs (Darshan Sen) [#59419](https://github.com/nodejs/node/pull/59419)
- \[[`ebe9272dae`](https://github.com/nodejs/node/commit/ebe9272dae)] - **inspector**: initial support websocket inspection (Shima Ryuhei) [#59404](https://github.com/nodejs/node/pull/59404)
- \[[`b35041c7dc`](https://github.com/nodejs/node/commit/b35041c7dc)] - **inspector**: prevent propagation of promise hooks to noPromise hooks (Shima Ryuhei) [#58841](https://github.com/nodejs/node/pull/58841)
- \[[`fe7176d7c6`](https://github.com/nodejs/node/commit/fe7176d7c6)] - **lib**: do not modify prototype deprecated asyncResource (encore) (Szymon Łągiewka) [#59518](https://github.com/nodejs/node/pull/59518)
- \[[`93fc80a1e2`](https://github.com/nodejs/node/commit/93fc80a1e2)] - **(SEMVER-MINOR)** **lib**: refactor kSupportedAlgorithms (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`9a12f71ad9`](https://github.com/nodejs/node/commit/9a12f71ad9)] - **lib**: simplify IPv6 checks in isLoopback() (Krishnadas) [#59375](https://github.com/nodejs/node/pull/59375)
- \[[`566fb04c82`](https://github.com/nodejs/node/commit/566fb04c82)] - **meta**: update devcontainer to the latest schema (Aviv Keller) [#54347](https://github.com/nodejs/node/pull/54347)
- \[[`389a24bbff`](https://github.com/nodejs/node/commit/389a24bbff)] - **module**: allow overriding linked requests for a ModuleWrap (Chengzhong Wu) [#59527](https://github.com/nodejs/node/pull/59527)
- \[[`7880978fe3`](https://github.com/nodejs/node/commit/7880978fe3)] - **module**: correctly detect top-level await in ambiguous contexts (Shima Ryuhei) [#58646](https://github.com/nodejs/node/pull/58646)
- \[[`99128d9244`](https://github.com/nodejs/node/commit/99128d9244)] - **node-api**: link to other programming language bindings (Chengzhong Wu) [#59516](https://github.com/nodejs/node/pull/59516)
- \[[`65c870e6cb`](https://github.com/nodejs/node/commit/65c870e6cb)] - **node-api**: clarify enum value ABI stability (Chengzhong Wu) [#59085](https://github.com/nodejs/node/pull/59085)
- \[[`352d63541a`](https://github.com/nodejs/node/commit/352d63541a)] - **sea**: implement execArgvExtension (Joyee Cheung) [#59560](https://github.com/nodejs/node/pull/59560)
- \[[`c6e3d5d98d`](https://github.com/nodejs/node/commit/c6e3d5d98d)] - **(SEMVER-MINOR)** **sea**: support execArgv in sea config (Joyee Cheung) [#59314](https://github.com/nodejs/node/pull/59314)
- \[[`e7084df4db`](https://github.com/nodejs/node/commit/e7084df4db)] - **sqlite**: add sqlite-type symbol for DatabaseSync (Alex Yang) [#59405](https://github.com/nodejs/node/pull/59405)
- \[[`e2b6bdc640`](https://github.com/nodejs/node/commit/e2b6bdc640)] - **sqlite**: handle ?NNN parameters as positional (Edy Silva) [#59350](https://github.com/nodejs/node/pull/59350)
- \[[`99e4a12731`](https://github.com/nodejs/node/commit/99e4a12731)] - **sqlite**: avoid useless call to FromMaybe() (Tobias Nießen) [#59490](https://github.com/nodejs/node/pull/59490)
- \[[`dfd4962e5f`](https://github.com/nodejs/node/commit/dfd4962e5f)] - **src**: enforce assumptions in FIXED_ONE_BYTE_STRING (Tobias Nießen) [#58155](https://github.com/nodejs/node/pull/58155)
- \[[`93a368df04`](https://github.com/nodejs/node/commit/93a368df04)] - **src**: use simdjson to parse --snapshot-config (Joyee Cheung) [#59473](https://github.com/nodejs/node/pull/59473)
- \[[`716750fcf8`](https://github.com/nodejs/node/commit/716750fcf8)] - **src**: fix order of CHECK_NOT_NULL/dereference (Tobias Nießen) [#59487](https://github.com/nodejs/node/pull/59487)
- \[[`44a8ecf8d4`](https://github.com/nodejs/node/commit/44a8ecf8d4)] - **src**: assert memory calc for max-old-space-size-percentage (Asaf Federman) [#59460](https://github.com/nodejs/node/pull/59460)
- \[[`3462b46fca`](https://github.com/nodejs/node/commit/3462b46fca)] - **src**: use simdjson::pad (0hm☘️) [#59391](https://github.com/nodejs/node/pull/59391)
- \[[`3e1551d845`](https://github.com/nodejs/node/commit/3e1551d845)] - **src**: move shared_ptr objects in KeyObjectData (Tobias Nießen) [#59472](https://github.com/nodejs/node/pull/59472)
- \[[`c022c1f85a`](https://github.com/nodejs/node/commit/c022c1f85a)] - **src**: add internal GetOptionsAsFlags (Pietro Marchini) [#59138](https://github.com/nodejs/node/pull/59138)
- \[[`c0f08454a3`](https://github.com/nodejs/node/commit/c0f08454a3)] - **src**: iterate metadata version entries with std::array (Chengzhong Wu) [#57866](https://github.com/nodejs/node/pull/57866)
- \[[`f87836f3ae`](https://github.com/nodejs/node/commit/f87836f3ae)] - **src**: internalize `v8::ConvertableToTraceFormat` in traces (Chengzhong Wu) [#57866](https://github.com/nodejs/node/pull/57866)
- \[[`852b8e46d8`](https://github.com/nodejs/node/commit/852b8e46d8)] - **src**: remove duplicate assignment of `O_EXCL` in node_constants.cc (Daniel Osvaldo R) [#59049](https://github.com/nodejs/node/pull/59049)
- \[[`64ffde608f`](https://github.com/nodejs/node/commit/64ffde608f)] - **src**: add Intel CET properties to large_pages.S (tjuhaszrh) [#59363](https://github.com/nodejs/node/pull/59363)
- \[[`823dce32ec`](https://github.com/nodejs/node/commit/823dce32ec)] - **src**: update OpenSSL pqc checks (Filip Skokan) [#59436](https://github.com/nodejs/node/pull/59436)
- \[[`8dc6f5b696`](https://github.com/nodejs/node/commit/8dc6f5b696)] - **(SEMVER-MINOR)** **stream**: add brotli support to CompressionStream and DecompressionStream (Matthew Aitken) [#59464](https://github.com/nodejs/node/pull/59464)
- \[[`b2b8383755`](https://github.com/nodejs/node/commit/b2b8383755)] - **test**: use mustSucceed in test-repl-tab-complete-import (Sohyeon Kim) [#59368](https://github.com/nodejs/node/pull/59368)
- \[[`e3ad5cc2c6`](https://github.com/nodejs/node/commit/e3ad5cc2c6)] - **test**: skip sea tests on Linux ppc64le (Richard Lau) [#59563](https://github.com/nodejs/node/pull/59563)
- \[[`f78f47ca5a`](https://github.com/nodejs/node/commit/f78f47ca5a)] - **test**: support standalone env comment in tests (Pietro Marchini) [#59546](https://github.com/nodejs/node/pull/59546)
- \[[`0e8bc2c7ac`](https://github.com/nodejs/node/commit/0e8bc2c7ac)] - **test**: rename test-net-server-drop-connections-in-cluster.js to -http- (Meghan Denny) [#59532](https://github.com/nodejs/node/pull/59532)
- \[[`ed339580af`](https://github.com/nodejs/node/commit/ed339580af)] - **test**: lazy-load internalTTy (Pietro Marchini) [#59517](https://github.com/nodejs/node/pull/59517)
- \[[`fe86bc6da8`](https://github.com/nodejs/node/commit/fe86bc6da8)] - **test**: fix `test-setproctitle` status when `ps` is not available (Antoine du Hamel) [#59523](https://github.com/nodejs/node/pull/59523)
- \[[`e517792973`](https://github.com/nodejs/node/commit/e517792973)] - **test**: add parseTestMetadata support (Pietro Marchini) [#59503](https://github.com/nodejs/node/pull/59503)
- \[[`31092972d6`](https://github.com/nodejs/node/commit/31092972d6)] - **test**: update WPT for WebCryptoAPI to ff26d9b307 (Node.js GitHub Bot) [#59497](https://github.com/nodejs/node/pull/59497)
- \[[`16afd103cc`](https://github.com/nodejs/node/commit/16afd103cc)] - **(SEMVER-MINOR)** **test**: add Web Cryptography wrap/unwrap vectors (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`5598baf34e`](https://github.com/nodejs/node/commit/5598baf34e)] - **(SEMVER-MINOR)** **test**: cleanup test-webcrypto-supports (Filip Skokan) [#59365](https://github.com/nodejs/node/pull/59365)
- \[[`e7809d6ddb`](https://github.com/nodejs/node/commit/e7809d6ddb)] - **test**: make test-debug-process locale-independent (BCD1me) [#59254](https://github.com/nodejs/node/pull/59254)
- \[[`ca7856e73c`](https://github.com/nodejs/node/commit/ca7856e73c)] - **test**: mark test-wasi-pthread as flaky (Joyee Cheung) [#59488](https://github.com/nodejs/node/pull/59488)
- \[[`0ecd82197f`](https://github.com/nodejs/node/commit/0ecd82197f)] - **test**: split test-wasi.js (Joyee Cheung) [#59488](https://github.com/nodejs/node/pull/59488)
- \[[`0930c218d6`](https://github.com/nodejs/node/commit/0930c218d6)] - **test**: deflake connection refused proxy tests (Joyee Cheung) [#59476](https://github.com/nodejs/node/pull/59476)
- \[[`7f457f886a`](https://github.com/nodejs/node/commit/7f457f886a)] - **test**: use case-insensitive path checking on Windows in fs.cpSync tests (Joyee Cheung) [#59475](https://github.com/nodejs/node/pull/59475)
- \[[`37809115f9`](https://github.com/nodejs/node/commit/37809115f9)] - **test**: add missing hasPostData in test-inspector-emit-protocol-event (Shima Ryuhei) [#59412](https://github.com/nodejs/node/pull/59412)
- \[[`f4722b1672`](https://github.com/nodejs/node/commit/f4722b1672)] - **test**: refactor error checks to use assert.ifError/mustSucceed (Sohyeon Kim) [#59424](https://github.com/nodejs/node/pull/59424)
- \[[`9ff71a672d`](https://github.com/nodejs/node/commit/9ff71a672d)] - **test**: fix typos (Lee Jiho) [#59330](https://github.com/nodejs/node/pull/59330)
- \[[`9a7700da62`](https://github.com/nodejs/node/commit/9a7700da62)] - **test**: skip test-watch-mode inspect when no inspector (James M Snell) [#59440](https://github.com/nodejs/node/pull/59440)
- \[[`e964c4334e`](https://github.com/nodejs/node/commit/e964c4334e)] - **test_runner**: do not error when getting `fullName` of root context (René) [#59377](https://github.com/nodejs/node/pull/59377)
- \[[`e076f7857c`](https://github.com/nodejs/node/commit/e076f7857c)] - **test_runner**: add option to rerun only failed tests (Moshe Atlow) [#59443](https://github.com/nodejs/node/pull/59443)
- \[[`eb8b1939a4`](https://github.com/nodejs/node/commit/eb8b1939a4)] - **test_runner**: fix isSkipped check in junit (Sungwon) [#59414](https://github.com/nodejs/node/pull/59414)
- \[[`4e02ea1c52`](https://github.com/nodejs/node/commit/4e02ea1c52)] - **tools**: update gyp-next to 0.20.3 (Node.js GitHub Bot) [#59603](https://github.com/nodejs/node/pull/59603)
- \[[`99da7fbe11`](https://github.com/nodejs/node/commit/99da7fbe11)] - **tools**: avoid parsing test files twice (Pietro Marchini) [#59526](https://github.com/nodejs/node/pull/59526)
- \[[`9a6a8e319b`](https://github.com/nodejs/node/commit/9a6a8e319b)] - **tools**: update coverage GitHub Actions to fixed version (Rich Trott) [#59512](https://github.com/nodejs/node/pull/59512)
- \[[`8d28236aff`](https://github.com/nodejs/node/commit/8d28236aff)] - **tools**: fix return value of try_check_compiler (theanarkh) [#59434](https://github.com/nodejs/node/pull/59434)
- \[[`52ab64ec3a`](https://github.com/nodejs/node/commit/52ab64ec3a)] - **tools**: bump @eslint/plugin-kit from 0.3.3 to 0.3.4 in /tools/eslint (dependabot\[bot]) [#59271](https://github.com/nodejs/node/pull/59271)
- \[[`baa22893bb`](https://github.com/nodejs/node/commit/baa22893bb)] - **typings**: add missing URLBinding methods (성우현 | Woohyun Sung) [#59468](https://github.com/nodejs/node/pull/59468)
- \[[`b68e0d1eca`](https://github.com/nodejs/node/commit/b68e0d1eca)] - **util**: fix error's namespaced node_modules highlighting using inspect (Ruben Bridgewater) [#59446](https://github.com/nodejs/node/pull/59446)
- \[[`15ae21b88a`](https://github.com/nodejs/node/commit/15ae21b88a)] - **util**: add some additional error classes to `wellKnownPrototypes` (Mark S. Miller) [#59456](https://github.com/nodejs/node/pull/59456)
- \[[`c38b7cfa35`](https://github.com/nodejs/node/commit/c38b7cfa35)] - **worker**: fix worker name with \0 (theanarkh) [#59214](https://github.com/nodejs/node/pull/59214)
- \[[`f54ace694a`](https://github.com/nodejs/node/commit/f54ace694a)] - **worker**: add worker name to report (theanarkh) [#58935](https://github.com/nodejs/node/pull/58935)

Windows 64-bit Installer: https://nodejs.org/dist/v24.7.0/node-v24.7.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.7.0/node-v24.7.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.7.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.7.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.7.0/node-v24.7.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.7.0/node-v24.7.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.7.0/node-v24.7.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.7.0/node-v24.7.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.7.0/node-v24.7.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.7.0/node-v24.7.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.7.0/node-v24.7.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.7.0/node-v24.7.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.7.0/node-v24.7.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.7.0/ \
Documentation: https://nodejs.org/docs/v24.7.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

b6424e6e5531842109ad8260f89d7457d8267d4dea5a54056098f70beba06a74  node-v24.7.0-aix-ppc64.tar.gz
4985d958a29c0632a33f90a57fb9762d1983323d970178e78f390868da5a2ef9  node-v24.7.0-arm64.msi
ff8298faaf82c85444aad7f1e12a4882496286ea9008702029b359d7fac7f8b3  node-v24.7.0-darwin-arm64.tar.gz
861ae19f855a592b0b39d9701fba69c2c42eafa5986b8094c1f7deaca165b3c4  node-v24.7.0-darwin-arm64.tar.xz
b99548ef56ec86da2ce50eff041d97e14077b77b517c4bcce0925d14c26cbee3  node-v24.7.0-darwin-x64.tar.gz
3db45b8cc33a6ccac4c79be069c8fd5a735b55ed2e6da138dbed4bcce82f93aa  node-v24.7.0-darwin-x64.tar.xz
3d8a9b6ba1400133080f55f91b1b6ab20f8df509962f72a299838b396c73da7c  node-v24.7.0-headers.tar.gz
474df556fd8735b60682b53e5fda3f57f78e654ebce892a30e89851f0780d7a0  node-v24.7.0-headers.tar.xz
04df0283d2a8a06271a690fbe2528661527b3a09f0f28c8bb63327d8888be184  node-v24.7.0-linux-arm64.tar.gz
3c238d671b2cc2e1c62b8b068c346b9830708f90df1e4a37305f4a5c2bb230b8  node-v24.7.0-linux-arm64.tar.xz
85378129414ca95c509317360c519328ae98d34160fc852408ba0209033e5f82  node-v24.7.0-linux-ppc64le.tar.gz
8a38b0def911a00ea25daff682fe9f7a3f67fb52e5b4aeff68b6d91b0753ea9a  node-v24.7.0-linux-ppc64le.tar.xz
d5b26b197795872dbd69f4dd8c275e8a08ca1be69c9e013e3cd9a6f68939e59d  node-v24.7.0-linux-s390x.tar.gz
40cb413fb1d4a123be721c51ed3f8ea208d01e4566b6a6e5acc5d30fb7cf38ef  node-v24.7.0-linux-s390x.tar.xz
8cf85258402e056efa041168c9b162a4e3b229ebfad5000850b8941c974e9d5a  node-v24.7.0-linux-x64.tar.gz
2fb405154d017f04d21b3d2273cc1cdfa824cfeffbd4225976454d06d5e381a4  node-v24.7.0-linux-x64.tar.xz
d08844ca5d020f794bf8b8cd2fc8d6af43e6d416a3b67a0b6a14ee33e5d0bb3d  node-v24.7.0.pkg
5ce2df7022d027d439b289e7393e04c494e92dec53aba212781b5f792015138a  node-v24.7.0.tar.gz
cf74a77753b629ffebd2e38fb153a21001b2b7a3c365c0ec7332b120b98c7251  node-v24.7.0.tar.xz
0fc23dfe5406002c046d65ea344b466f1bd6495e2c1f1a43e35aedd2e236be18  node-v24.7.0-win-arm64.7z
ca5b929a9f661619a8ac8da48df88d50711246615f4041b37bd0fefb4ea1c310  node-v24.7.0-win-arm64.zip
45d46dc687a2d1ae5c8ba940f9140deeb420da56e0c79a051e8847528e355782  node-v24.7.0-win-x64.7z
093fe5787ef2656c347b98aa3f9c106946c2b35de61456c307e4786e0d05d4ba  node-v24.7.0-win-x64.zip
30c1f1313b10140faa8190e59fc91a5fd2911fd267beec4f0405a730217c3b78  node-v24.7.0-x64.msi
0bc51b1048ad82a81f4d9c437c442735a12d0c6591f9723aaf504f3e3eaf17aa  win-arm64/node.exe
685a44e041d4031da838e7f6fa42bed60af91a1550207b5f3bbbe316036c653e  win-arm64/node.lib
0ed86ee5506d387a06e3dae172c992d949c5f342e76a5528f79ced480fceb5d3  win-arm64/node_pdb.7z
19f53b5d33572bbb5d7bf170a9e1a3ebe84560aee3e2f97b0ea34b0a8b8a6770  win-arm64/node_pdb.zip
c1b274a8d0a23e060fc42ce71c3cdfa1569b83d91ba82cc59fa907da97a425e9  win-x64/node.exe
e7c7e13b1e717a58ebc4a748248c607b5ec53c1ce025bbb99320700dbc7bc683  win-x64/node.lib
b1d1caf80750bd7e2a9be3374dd13d6bd228ef5c0379b30901ffcb760dba647d  win-x64/node_pdb.7z
bb450d55836ab086ab354aa28dab2d027357c29ec978fd6f6bde1d40018705ee  win-x64/node_pdb.zip
-----BEGIN PGP SIGNATURE-----

iQIzBAEBCAAdFiEEj8yhP+8dDC6RAI4Jdw96mlrhVgAFAmivd2IACgkQdw96mlrh
VgCLFw/+Jt77Nyn3UqG2yQ3UKfWTE/GvUof10kiJKaZrHN3jXQTSUCTaZof3CFYE
UBnHThOxcBotwPiC6ICFTVVbkDyQkR8MQcY/n2053IpeWlO+60WFZkDk6IVU3nTv
vZUppHtgjsadnKomeNMGXo3hzfxzVqXqDQGrUdzeLEtM9aHi4KY5VMal7KVYRroU
h1fWx+zMAG32VoG8Mi54ZrXfbVHW/hJqL9HV8fnrGtrqlYN2aNfEyREssj2GKcvT
z9LheuVzzGe2BdcernbZeMQu7m0PExtsSaTBsr13Oq1t0i1tTlZiCeExzTp4cOU1
xMIS0O9o5rHobVuhj5OvVvZX46+gB8GkwlJ0gRtSYyRob03Em+G5eOo9K4w8S45i
a+2VxzQfEd0xMu08IOi5+8oIkvX/zR9GPNLH8iSXcbF8BZHoEisf1APhIDFlgV73
8JBbJOv4HTGs91/MW7Lq6NSLONbaa3kas2k3CCYLJlwlmQdiYiI3kocEAPwVBzJP
NqsSaSQcW7JIKOtd2khmknEVNTidgrkeajo5re2CW8chZCGNgqoCtNTxFaLO88Kc
NnqZeE1MlFxxdczTC96+NKtsIU5HWM+l276mOpRszlzXR3piMYY70EDKFP8lbJe9
2/uLy4/zpMMvNSuVUKSejwIIWpctrhG9rfGWQ5noyOOF9QH0Hww=
=7EKP
-----END PGP SIGNATURE-----
```
