---
date: '2025-07-31T21:52:17.052Z'
category: release
title: Node.js 24.5.0 (Current)
layout: blog-post
author: Antoine du Hamel
---

## 2025-07-31, Version 24.5.0 (Current), @aduh95

### Notable Changes

#### Upgrade to OpenSSL 3.5

This release is distributed with OpenSSL 3.5.1, following the announcement that
OpenSSL 3.5 will be supported until April 2030, while Node.js 24 will be
supported until April 2028. Read more about OpenSSL support in their blog post:
<https://openssl-library.org/post/2025-02-20-openssl-3.5-lts/>.

Contributed by Richard Lau in [#58100](https://github.com/nodejs/node/pull/58100).

#### Unflag `--experimental-wasm-modules`

Node.js supports both source phase imports and instance phase imports to WebAssembly
modules and for WASM imports to JavaScript, in line with the current Phase 3
WebAssembly [ESM Integration](https://github.com/webassembly/esm-integration) proposal.
The implementation and the specification are still subject to change.

Contributed by Guy Bedford in [#57038](https://github.com/nodejs/node/pull/57038).

#### Built-in proxy support in `request()` and `Agent`

`node:http` and `node:https` now support proxies. When `NODE_USE_ENV_PROXY`
is set to `1`, the default global agent would parse the `http_proxy`/`HTTP_PROXY`,
`https_proxy`/`HTTPS_PROXY`, `no_proxy`/`NO_PROXY` settings from the
environment variables, and proxy the requests sent through the built-in http/https
client accordingly.

To use global proxy support from the command line:

```bash
NODE_USE_ENV_PROXY=1 HTTP_PROXY=http://proxy.example.com:8080 HTTPS_PROXY=http://proxy.example.com:8080 NO_PROXY=localhost,127.0.0.1 node client.js
```

In addition, `http.Agent` and `https.Agent` now support the custom `proxyEnv` options.

```js
const agent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: 'http://proxy.example.com:8080' },
});
```

For reference, `fetch()` already supports `NODE_USE_ENV_PROXY` as of Node.js 24.0.0.

Contributed by Joyee Cheung in <https://github.com/nodejs/node/pull/58980>.

#### Add `setDefaultCACertificates()` to `node:tls`

This API allows dynamically configuring CA certificates that will be used by the
Node.js TLS clients by default.

Once called, the provided certificates will become the default CA certificate list
returned by `tls.getCACertificates('default')` and used by TLS connections that
don't specify their own CA certificates.

To add system CA certificates to the default bundle (which includes the Mozilla
CA certificates):

```js
tls.setDefaultCACertificates(
  tls.getCACertificates('default').concat(tls.getCACertificates('system'))
);
```

Contributed by Joyee Cheung in <https://github.com/nodejs/node/pull/58822>.

#### Other notable changes

- \[[`d5640ca58a`](https://github.com/nodejs/node/commit/d5640ca58a)] - **(SEMVER-MINOR)** **cli**: support `${pid}` placeholder in `--cpu-prof-name` (Haram Jeong) [#59072](https://github.com/nodejs/node/pull/59072)
- \[[`c52aaacfc5`](https://github.com/nodejs/node/commit/c52aaacfc5)] - **(SEMVER-MINOR)** **dns**: support max timeout (theanarkh) [#58440](https://github.com/nodejs/node/pull/58440)
- \[[`927742b342`](https://github.com/nodejs/node/commit/927742b342)] - **doc**: update the instruction on how to verify releases (Antoine du Hamel) [#59113](https://github.com/nodejs/node/pull/59113)
- \[[`f753645cd8`](https://github.com/nodejs/node/commit/f753645cd8)] - **(SEMVER-MINOR)** **net**: update net.blocklist to allow file save and file management (alphaleadership) [#58087](https://github.com/nodejs/node/pull/58087)
- \[[`9791ff3480`](https://github.com/nodejs/node/commit/9791ff3480)] - **(SEMVER-MINOR)** **worker**: add web locks api (ishabi) [#58666](https://github.com/nodejs/node/pull/58666)

### Commits

- \[[`5457c7a8a1`](https://github.com/nodejs/node/commit/5457c7a8a1)] - **benchmark**: adjust configuration for string-decoder bench (Rafael Gonzaga) [#59187](https://github.com/nodejs/node/pull/59187)
- \[[`28538f2255`](https://github.com/nodejs/node/commit/28538f2255)] - **benchmark**: add --track to benchmark (Rafael Gonzaga) [#59174](https://github.com/nodejs/node/pull/59174)
- \[[`a28d804497`](https://github.com/nodejs/node/commit/a28d804497)] - **benchmark**: small lint fix on \_cli.js (Rafael Gonzaga) [#59172](https://github.com/nodejs/node/pull/59172)
- \[[`09717eb68e`](https://github.com/nodejs/node/commit/09717eb68e)] - **benchmark**: drop misc/punycode benchmark (Rafael Gonzaga) [#59171](https://github.com/nodejs/node/pull/59171)
- \[[`ad6757ef02`](https://github.com/nodejs/node/commit/ad6757ef02)] - **benchmark**: fix sqlite-is-transaction (Rafael Gonzaga) [#59170](https://github.com/nodejs/node/pull/59170)
- \[[`7fc3143f61`](https://github.com/nodejs/node/commit/7fc3143f61)] - **benchmark**: reduce N for diagnostics_channel subscribe benchmark (Arthur Angelo) [#59116](https://github.com/nodejs/node/pull/59116)
- \[[`f2812723a0`](https://github.com/nodejs/node/commit/f2812723a0)] - **buffer**: cache Environment::GetCurrent to avoid repeated calls (Mert Can Altin) [#59043](https://github.com/nodejs/node/pull/59043)
- \[[`e3e729ca60`](https://github.com/nodejs/node/commit/e3e729ca60)] - **build**: remove suppressions.supp (Rafael Gonzaga) [#59079](https://github.com/nodejs/node/pull/59079)
- \[[`dc66422768`](https://github.com/nodejs/node/commit/dc66422768)] - **build,deps,tools**: prepare to update to OpenSSL 3.5 (Richard Lau) [#58100](https://github.com/nodejs/node/pull/58100)
- \[[`f5da4947d9`](https://github.com/nodejs/node/commit/f5da4947d9)] - **cli**: add --use-env-proxy (Joyee Cheung) [#59151](https://github.com/nodejs/node/pull/59151)
- \[[`d5640ca58a`](https://github.com/nodejs/node/commit/d5640ca58a)] - **(SEMVER-MINOR)** **cli**: support `${pid}` placeholder in --cpu-prof-name (Haram Jeong) [#59072](https://github.com/nodejs/node/pull/59072)
- \[[`eeeb40e95b`](https://github.com/nodejs/node/commit/eeeb40e95b)] - **(SEMVER-MINOR)** **crypto**: add tls.setDefaultCACertificates() (Joyee Cheung) [#58822](https://github.com/nodejs/node/pull/58822)
- \[[`135fca5b72`](https://github.com/nodejs/node/commit/135fca5b72)] - **crypto**: avoid copying buffers to UTF-8 strings in `crypto.hash()` (Renegade334) [#59067](https://github.com/nodejs/node/pull/59067)
- \[[`998cef10e3`](https://github.com/nodejs/node/commit/998cef10e3)] - **deps**: update archs files for openssl-3.5.1 (Node.js GitHub Bot) [#59234](https://github.com/nodejs/node/pull/59234)
- \[[`1f06ca956a`](https://github.com/nodejs/node/commit/1f06ca956a)] - **deps**: upgrade openssl sources to openssl-3.5.1 (Node.js GitHub Bot) [#59234](https://github.com/nodejs/node/pull/59234)
- \[[`55a90eed8d`](https://github.com/nodejs/node/commit/55a90eed8d)] - **deps**: upgrade npm to 11.5.1 (npm team) [#59199](https://github.com/nodejs/node/pull/59199)
- \[[`2b5d451ae0`](https://github.com/nodejs/node/commit/2b5d451ae0)] - **deps**: update amaro to 1.1.1 (Node.js GitHub Bot) [#59141](https://github.com/nodejs/node/pull/59141)
- \[[`af789d9b5c`](https://github.com/nodejs/node/commit/af789d9b5c)] - **deps**: update undici to 7.12.0 (Node.js GitHub Bot) [#59135](https://github.com/nodejs/node/pull/59135)
- \[[`a34e44545e`](https://github.com/nodejs/node/commit/a34e44545e)] - **deps**: update sqlite to 3.50.3 (Node.js GitHub Bot) [#59132](https://github.com/nodejs/node/pull/59132)
- \[[`bfe4781c7d`](https://github.com/nodejs/node/commit/bfe4781c7d)] - **deps**: update googletest to 7e17b15 (Node.js GitHub Bot) [#59131](https://github.com/nodejs/node/pull/59131)
- \[[`72adf52e51`](https://github.com/nodejs/node/commit/72adf52e51)] - **deps**: update ada to 3.2.6 (Node.js GitHub Bot) [#58966](https://github.com/nodejs/node/pull/58966)
- \[[`2a5f35b589`](https://github.com/nodejs/node/commit/2a5f35b589)] - **deps**: V8: cherry-pick 3d750c2aa9ef (Michaël Zasso) [#58750](https://github.com/nodejs/node/pull/58750)
- \[[`3f813eaba7`](https://github.com/nodejs/node/commit/3f813eaba7)] - **deps**: update archs files for openssl-3.0.17 (Node.js GitHub Bot) [#59134](https://github.com/nodejs/node/pull/59134)
- \[[`fb52d0d8df`](https://github.com/nodejs/node/commit/fb52d0d8df)] - **deps**: upgrade openssl sources to openssl-3.0.17 (Node.js GitHub Bot) [#59134](https://github.com/nodejs/node/pull/59134)
- \[[`f122602f9d`](https://github.com/nodejs/node/commit/f122602f9d)] - **deps**: update corepack to 0.34.0 (Node.js GitHub Bot) [#59133](https://github.com/nodejs/node/pull/59133)
- \[[`c52aaacfc5`](https://github.com/nodejs/node/commit/c52aaacfc5)] - **(SEMVER-MINOR)** **dns**: support max timeout (theanarkh) [#58440](https://github.com/nodejs/node/pull/58440)
- \[[`927742b342`](https://github.com/nodejs/node/commit/927742b342)] - **doc**: update the instruction on how to verify releases (Antoine du Hamel) [#59113](https://github.com/nodejs/node/pull/59113)
- \[[`9a8d2020ad`](https://github.com/nodejs/node/commit/9a8d2020ad)] - **doc**: copyedit SECURITY.md (Rich Trott) [#59190](https://github.com/nodejs/node/pull/59190)
- \[[`3da5bc0668`](https://github.com/nodejs/node/commit/3da5bc0668)] - **doc**: fix broken sentence in `URL.parse` (Superchupu) [#59164](https://github.com/nodejs/node/pull/59164)
- \[[`06cd7461e0`](https://github.com/nodejs/node/commit/06cd7461e0)] - **doc**: improve onboarding instructions (Joyee Cheung) [#59159](https://github.com/nodejs/node/pull/59159)
- \[[`dfb72d158b`](https://github.com/nodejs/node/commit/dfb72d158b)] - **doc**: add constraints for mem leak to threat model (Rafael Gonzaga) [#58917](https://github.com/nodejs/node/pull/58917)
- \[[`51b8dfd5c6`](https://github.com/nodejs/node/commit/51b8dfd5c6)] - **doc**: add Aditi-1400 to collaborators (Aditi) [#59157](https://github.com/nodejs/node/pull/59157)
- \[[`4ffa756ce3`](https://github.com/nodejs/node/commit/4ffa756ce3)] - **doc**: avoid suggesting testing fast api with intense loop (Chengzhong Wu) [#59111](https://github.com/nodejs/node/pull/59111)
- \[[`6f81b274f7`](https://github.com/nodejs/node/commit/6f81b274f7)] - **doc**: fix typo in writing-test.md (SeokHun) [#59123](https://github.com/nodejs/node/pull/59123)
- \[[`88e434e687`](https://github.com/nodejs/node/commit/88e434e687)] - **doc**: add new environment variables doc page (Dario Piotrowicz) [#59052](https://github.com/nodejs/node/pull/59052)
- \[[`b1a318d706`](https://github.com/nodejs/node/commit/b1a318d706)] - **doc**: update release key for aduh95 (Antoine du Hamel) [#58877](https://github.com/nodejs/node/pull/58877)
- \[[`34c49000c9`](https://github.com/nodejs/node/commit/34c49000c9)] - **doc**: add missing section for `setReturnArrays` in `sqlite.md` (Edy Silva) [#59074](https://github.com/nodejs/node/pull/59074)
- \[[`9b2e965aff`](https://github.com/nodejs/node/commit/9b2e965aff)] - **doc**: add RafaelGSS as steward July 25 (Rafael Gonzaga) [#59078](https://github.com/nodejs/node/pull/59078)
- \[[`2d1dcb87e6`](https://github.com/nodejs/node/commit/2d1dcb87e6)] - **doc**: clarify ERR_FS_FILE_TOO_LARGE to reflect fs.readFile() I/O limit (Haram Jeong) [#59050](https://github.com/nodejs/node/pull/59050)
- \[[`999b5e51e7`](https://github.com/nodejs/node/commit/999b5e51e7)] - **doc**: run license-builder (github-actions\[bot]) [#59056](https://github.com/nodejs/node/pull/59056)
- \[[`1940a2cb46`](https://github.com/nodejs/node/commit/1940a2cb46)] - **doc**: fix typed list formatting (Aviv Keller) [#59019](https://github.com/nodejs/node/pull/59019)
- \[[`6cb5e0d22f`](https://github.com/nodejs/node/commit/6cb5e0d22f)] - **doc**: refine `util.parseArgs` `default` definition (Slayer95) [#58958](https://github.com/nodejs/node/pull/58958)
- \[[`d2e7f8e13a`](https://github.com/nodejs/node/commit/d2e7f8e13a)] - **doc**: remove unused import in `zlib.md` (coderaiser) [#59041](https://github.com/nodejs/node/pull/59041)
- \[[`9d02960149`](https://github.com/nodejs/node/commit/9d02960149)] - **doc**: add missing environment variables to manpage (amir lavasani) [#58963](https://github.com/nodejs/node/pull/58963)
- \[[`45ffdb34fb`](https://github.com/nodejs/node/commit/45ffdb34fb)] - **doc**: add stability index to the `--watch-kill-signal` flag (Dario Piotrowicz) [#58997](https://github.com/nodejs/node/pull/58997)
- \[[`3924c43600`](https://github.com/nodejs/node/commit/3924c43600)] - **doc**: add missing `<code>` blocks (Antoine du Hamel) [#58995](https://github.com/nodejs/node/pull/58995)
- \[[`cb95e183f3`](https://github.com/nodejs/node/commit/cb95e183f3)] - **doc**: add scroll margin to links (Roman Reiss) [#58982](https://github.com/nodejs/node/pull/58982)
- \[[`c9ded6ba15`](https://github.com/nodejs/node/commit/c9ded6ba15)] - **doc**: add sponsorship link to RafaelGSS (Rafael Gonzaga) [#58983](https://github.com/nodejs/node/pull/58983)
- \[[`b919fe0447`](https://github.com/nodejs/node/commit/b919fe0447)] - **(SEMVER-MINOR)** **esm**: unflag --experimental-wasm-modules (Guy Bedford) [#57038](https://github.com/nodejs/node/pull/57038)
- \[[`71bb6cd077`](https://github.com/nodejs/node/commit/71bb6cd077)] - **esm**: js-string Wasm builtins in ESM Integration (Guy Bedford) [#59020](https://github.com/nodejs/node/pull/59020)
- \[[`8d869e6d62`](https://github.com/nodejs/node/commit/8d869e6d62)] - **fs**: fix return value of fs APIs (theanarkh) [#58996](https://github.com/nodejs/node/pull/58996)
- \[[`7f654cee9e`](https://github.com/nodejs/node/commit/7f654cee9e)] - **(SEMVER-MINOR)** **http,https**: add built-in proxy support in http/https.request and Agent (Joyee Cheung) [#58980](https://github.com/nodejs/node/pull/58980)
- \[[`85d6a28f4f`](https://github.com/nodejs/node/commit/85d6a28f4f)] - **inspector**: initial support for Network.loadNetworkResource (Shima Ryuhei) [#58077](https://github.com/nodejs/node/pull/58077)
- \[[`cfaa299f2e`](https://github.com/nodejs/node/commit/cfaa299f2e)] - **lib**: fix incorrect `ArrayBufferPrototypeGetDetached` primordial type (Dario Piotrowicz) [#58978](https://github.com/nodejs/node/pull/58978)
- \[[`d555db22ad`](https://github.com/nodejs/node/commit/d555db22ad)] - **lib**: flag to conditionally modify proto on deprecate (Rafael Gonzaga) [#58928](https://github.com/nodejs/node/pull/58928)
- \[[`96c9dd79e6`](https://github.com/nodejs/node/commit/96c9dd79e6)] - **meta**: move one or more collaborators to emeritus (Node.js GitHub Bot) [#59140](https://github.com/nodejs/node/pull/59140)
- \[[`324d9fc9d4`](https://github.com/nodejs/node/commit/324d9fc9d4)] - **meta**: enable jsdoc/check-tag-names rule (Yagiz Nizipli) [#58521](https://github.com/nodejs/node/pull/58521)
- \[[`04c751463b`](https://github.com/nodejs/node/commit/04c751463b)] - **meta**: add marco-ippolito to security release stewards (Marco Ippolito) [#58944](https://github.com/nodejs/node/pull/58944)
- \[[`fe0195fdcc`](https://github.com/nodejs/node/commit/fe0195fdcc)] - **module**: fix conditions override in synchronous resolve hooks (Joyee Cheung) [#59011](https://github.com/nodejs/node/pull/59011)
- \[[`515b581d47`](https://github.com/nodejs/node/commit/515b581d47)] - **module**: throw error when re-runing errored module jobs (Joyee Cheung) [#58957](https://github.com/nodejs/node/pull/58957)
- \[[`f753645cd8`](https://github.com/nodejs/node/commit/f753645cd8)] - **(SEMVER-MINOR)** **net**: update net.blocklist to allow file save and file management (alphaleadership) [#58087](https://github.com/nodejs/node/pull/58087)
- \[[`15e6c28d82`](https://github.com/nodejs/node/commit/15e6c28d82)] - **node-api,doc**: update links to ecma262 with section names (Chengzhong Wu) [#59087](https://github.com/nodejs/node/pull/59087)
- \[[`f67b686551`](https://github.com/nodejs/node/commit/f67b686551)] - **perf_hooks**: do not expose SafeMap via Histogram wrapper (René) [#59094](https://github.com/nodejs/node/pull/59094)
- \[[`3d2f919f7c`](https://github.com/nodejs/node/commit/3d2f919f7c)] - **process**: make execve's args argument optional (Allon Murienik) [#58412](https://github.com/nodejs/node/pull/58412)
- \[[`1a44265810`](https://github.com/nodejs/node/commit/1a44265810)] - **repl**: handle errors from getters during completion (Shima Ryuhei) [#59044](https://github.com/nodejs/node/pull/59044)
- \[[`467dbd31e6`](https://github.com/nodejs/node/commit/467dbd31e6)] - **repl**: fix repl crashing on variable declarations without init (Dario Piotrowicz) [#59032](https://github.com/nodejs/node/pull/59032)
- \[[`3a3eb6852d`](https://github.com/nodejs/node/commit/3a3eb6852d)] - **repl**: improve REPL disabling completion on proxies and getters (Dario Piotrowicz) [#58891](https://github.com/nodejs/node/pull/58891)
- \[[`55838e79b8`](https://github.com/nodejs/node/commit/55838e79b8)] - **src**: call unmask after install signal handler (theanarkh) [#59059](https://github.com/nodejs/node/pull/59059)
- \[[`77649ad93b`](https://github.com/nodejs/node/commit/77649ad93b)] - **src**: use `FastStringKey` for `TrackV8FastApiCall` (Anna Henningsen) [#59148](https://github.com/nodejs/node/pull/59148)
- \[[`86babf9c4b`](https://github.com/nodejs/node/commit/86babf9c4b)] - **src**: use C++20 `consteval` for `FastStringKey` (Anna Henningsen) [#59148](https://github.com/nodejs/node/pull/59148)
- \[[`88b99eeae1`](https://github.com/nodejs/node/commit/88b99eeae1)] - **src**: remove declarations of removed BaseObject static fns (Anna Henningsen) [#59093](https://github.com/nodejs/node/pull/59093)
- \[[`d89390fc8f`](https://github.com/nodejs/node/commit/d89390fc8f)] - **src**: add cache to nearest parent package json (Ilyas Shabi) [#59086](https://github.com/nodejs/node/pull/59086)
- \[[`21780075e4`](https://github.com/nodejs/node/commit/21780075e4)] - **src**: check import attributes value types as strings (Chengzhong Wu) [#58986](https://github.com/nodejs/node/pull/58986)
- \[[`ef89c2fac9`](https://github.com/nodejs/node/commit/ef89c2fac9)] - **src,test**: fix config file parsing for flags defaulted to true (Edy Silva) [#59110](https://github.com/nodejs/node/pull/59110)
- \[[`1e990866e0`](https://github.com/nodejs/node/commit/1e990866e0)] - **test**: mark web lock held test as flaky (Ilyas Shabi) [#59144](https://github.com/nodejs/node/pull/59144)
- \[[`ba8e95a785`](https://github.com/nodejs/node/commit/ba8e95a785)] - **test**: use mustSucceed in test-fs-read (Sungwon) [#59204](https://github.com/nodejs/node/pull/59204)
- \[[`39978f507f`](https://github.com/nodejs/node/commit/39978f507f)] - **test**: prepare test-crypto-rsa-dsa for newer OpenSSL (Richard Lau) [#58100](https://github.com/nodejs/node/pull/58100)
- \[[`1c3aadb9d6`](https://github.com/nodejs/node/commit/1c3aadb9d6)] - **test**: fix flaky test-worker-message-port-transfer-filehandle test (Alex Yang) [#59158](https://github.com/nodejs/node/pull/59158)
- \[[`a0d22e9c51`](https://github.com/nodejs/node/commit/a0d22e9c51)] - **test**: remove timeout in test-https-proxy-request-handshake-failure (Joyee Cheung) [#59165](https://github.com/nodejs/node/pull/59165)
- \[[`7e0a0fccc1`](https://github.com/nodejs/node/commit/7e0a0fccc1)] - **test**: expand linting rules around `assert` w literal messages (Anna Henningsen) [#59147](https://github.com/nodejs/node/pull/59147)
- \[[`c6070046c3`](https://github.com/nodejs/node/commit/c6070046c3)] - **test**: update WPT for WebCryptoAPI to ab08796857 (Node.js GitHub Bot) [#59129](https://github.com/nodejs/node/pull/59129)
- \[[`15d8cc908e`](https://github.com/nodejs/node/commit/15d8cc908e)] - **test**: update WPT for WebCryptoAPI to 19d82c57ab (Node.js GitHub Bot) [#59129](https://github.com/nodejs/node/pull/59129)
- \[[`83023e5144`](https://github.com/nodejs/node/commit/83023e5144)] - **test**: skip tests that cause timeouts on IBM i (Abdirahim Musse) [#59014](https://github.com/nodejs/node/pull/59014)
- \[[`82d4175ec3`](https://github.com/nodejs/node/commit/82d4175ec3)] - **test**: update `startCLI` to set `--port=0` by default (Dario Piotrowicz) [#59042](https://github.com/nodejs/node/pull/59042)
- \[[`16dc53c143`](https://github.com/nodejs/node/commit/16dc53c143)] - **(SEMVER-MINOR)** **test**: move http proxy tests to test/client-proxy (Joyee Cheung) [#58980](https://github.com/nodejs/node/pull/58980)
- \[[`a9511a6066`](https://github.com/nodejs/node/commit/a9511a6066)] - **test**: mark test-inspector-network-fetch as flaky on Windows (Joyee Cheung) [#59091](https://github.com/nodejs/node/pull/59091)
- \[[`1cffcc02a3`](https://github.com/nodejs/node/commit/1cffcc02a3)] - **test**: add missing port=0 arg in test-debugger-extract-function-name (Dario Piotrowicz) [#58977](https://github.com/nodejs/node/pull/58977)
- \[[`83cdf1701b`](https://github.com/nodejs/node/commit/83cdf1701b)] - **test_runner**: clean up promisified interval generation (René) [#58824](https://github.com/nodejs/node/pull/58824)
- \[[`195d6038dc`](https://github.com/nodejs/node/commit/195d6038dc)] - **tools**: clarify README linter error message (Joyee Cheung) [#59160](https://github.com/nodejs/node/pull/59160)
- \[[`51f578a3bf`](https://github.com/nodejs/node/commit/51f578a3bf)] - **tools**: add support for URLs to PR commits in `merge.sh` (Antoine du Hamel) [#59162](https://github.com/nodejs/node/pull/59162)
- \[[`20be9012eb`](https://github.com/nodejs/node/commit/20be9012eb)] - **tools**: bump @eslint/plugin-kit from 0.3.1 to 0.3.3 in /tools/eslint (dependabot\[bot]) [#59119](https://github.com/nodejs/node/pull/59119)
- \[[`623e264e93`](https://github.com/nodejs/node/commit/623e264e93)] - **tools**: ignore CVE mention when linting release proposals (Antoine du Hamel) [#59037](https://github.com/nodejs/node/pull/59037)
- \[[`0e547e09ab`](https://github.com/nodejs/node/commit/0e547e09ab)] - **tools,test**: enforce best practices to detect never settling promises (Antoine du Hamel) [#58992](https://github.com/nodejs/node/pull/58992)
- \[[`075d1968db`](https://github.com/nodejs/node/commit/075d1968db)] - **util**: respect nested formats in styleText (Alex Yang) [#59098](https://github.com/nodejs/node/pull/59098)
- \[[`9791ff3480`](https://github.com/nodejs/node/commit/9791ff3480)] - **(SEMVER-MINOR)** **worker**: add web locks api (ishabi) [#58666](https://github.com/nodejs/node/pull/58666)

Windows 64-bit Installer: https://nodejs.org/dist/v24.5.0/node-v24.5.0-x64.msi \
Windows ARM 64-bit Installer: https://nodejs.org/dist/v24.5.0/node-v24.5.0-arm64.msi \
Windows 64-bit Binary: https://nodejs.org/dist/v24.5.0/win-x64/node.exe \
Windows ARM 64-bit Binary: https://nodejs.org/dist/v24.5.0/win-arm64/node.exe \
macOS 64-bit Installer: https://nodejs.org/dist/v24.5.0/node-v24.5.0.pkg \
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v24.5.0/node-v24.5.0-darwin-arm64.tar.gz \
macOS Intel 64-bit Binary: https://nodejs.org/dist/v24.5.0/node-v24.5.0-darwin-x64.tar.gz \
Linux 64-bit Binary: https://nodejs.org/dist/v24.5.0/node-v24.5.0-linux-x64.tar.xz \
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v24.5.0/node-v24.5.0-linux-ppc64le.tar.xz \
Linux s390x 64-bit Binary: https://nodejs.org/dist/v24.5.0/node-v24.5.0-linux-s390x.tar.xz \
AIX 64-bit Binary: https://nodejs.org/dist/v24.5.0/node-v24.5.0-aix-ppc64.tar.gz \
ARMv8 64-bit Binary: https://nodejs.org/dist/v24.5.0/node-v24.5.0-linux-arm64.tar.xz \
Source Code: https://nodejs.org/dist/v24.5.0/node-v24.5.0.tar.gz \
Other release files: https://nodejs.org/dist/v24.5.0/ \
Documentation: https://nodejs.org/docs/v24.5.0/api/

### SHASUMS

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

f2825d209bb71f24f2e886082631e9b68163f504628ee01d01a5bd250eaafec6  node-v24.5.0-aix-ppc64.tar.gz
49703ddee7399c50d7792ebc70f4cec48237ce3cdb4696cd7682fed9cbe16616  node-v24.5.0-arm64.msi
2a4172474565ecb8f0c87a1520590e00d6b28a78594c220d38eef991763dc276  node-v24.5.0-darwin-arm64.tar.gz
8b6379059b3347a9d0335dd682b0ec9eb7888e1a9c8b23483d3dd2c32e744420  node-v24.5.0-darwin-arm64.tar.xz
2396c3dd148c8fce15593da27f839248cdea15aad971078ea7c06c73ba970f64  node-v24.5.0-darwin-x64.tar.gz
f6b4f0086c045fd19a23bb8310d7364f5a2e6c35ae6b3931fda40dc25cfc1830  node-v24.5.0-darwin-x64.tar.xz
19a77884832905cf45ac05129a203d1cdb8079b361940742d12fcde6940e116e  node-v24.5.0-headers.tar.gz
289c25f59844acebde51b2ec4d23ab6789341c0f08fa844437ec7ddbe99c7b5d  node-v24.5.0-headers.tar.xz
c643c118d907c8db42a677a12789eb5d55ad6de4b8e2c11bab08dbd23852da2e  node-v24.5.0-linux-arm64.tar.gz
313367534186a8551d68b39fbc2a6cc36638e583fb5dc75dcf5da3c6582bff3b  node-v24.5.0-linux-arm64.tar.xz
7f45e28aedae5a4077c04fa1934268c9e3620dcfb105624517c2410ca1deb00d  node-v24.5.0-linux-ppc64le.tar.gz
4baa8b2116f45b9d40742e878c9bc14170e04ffee0439dfa5210871e49169c67  node-v24.5.0-linux-ppc64le.tar.xz
1d151244f5502ff7e72271e603889d789dec021f0cb28148d90f4a8ce89eaf30  node-v24.5.0-linux-s390x.tar.gz
bda973039e220aaab405eb41c601a3157d6bc5a8dd656e35aa79005ee45cb507  node-v24.5.0-linux-s390x.tar.xz
369f2a3668dde7e324697040fafdcf442fd198b8c102317145417b3c83a9794a  node-v24.5.0-linux-x64.tar.gz
32edb1f2aeaf8ea0d484af33bf3b5d8330d7d33c9cd8c70f811b8a643822e613  node-v24.5.0-linux-x64.tar.xz
35ff69ba35647e9b1c19f8c5d4517f6854b0a5545f1fd9bec81964bb13017e49  node-v24.5.0-win-arm64.7z
fd97842c3639fbc33ef9fc8c0c6adc5d45e56662a4354c7213c58a55a0432e8e  node-v24.5.0-win-arm64.zip
d0c25fb9ad8a0a599056e0a68be9d703f849aa3c85528bab2657492b95ca441f  node-v24.5.0-win-x64.7z
c6a5714108caa81bc71e3859c18f449a8f456e275946c0d429e2d7120b03d20e  node-v24.5.0-win-x64.zip
851a2ca6d52099f1e50d1042dfd4d27b1f861a85153a139d5b79c881e0129449  node-v24.5.0-x64.msi
9e4c4c623d1cecdaf5c1d9b1da6d58d4ab274aea2a33670dcc3066dcbc035c5c  node-v24.5.0.pkg
27a05a6925c1d9f023856513c93e4b4d34344fe95e19e0204d182f903fb120dc  node-v24.5.0.tar.gz
f1ba96204724bd1c6de7758e08b3718ba0b45d87fb3bebd7e30097874ccc8130  node-v24.5.0.tar.xz
b285c694845964ba1abb065b832c2d6ca10f1230fb31361642f56b77641bf9d1  win-arm64/node.exe
438336bb8b1272c0926af3391b3d98b846a50122323842da78feafe8d54498b7  win-arm64/node.lib
6798999bde91ac0ed9e3696e83b8f806d9df5e03678819cd097b9fb5b34b2993  win-arm64/node_pdb.7z
9951afa58565e0bbb993eb02d7b0d956ef50888a2dbaebf4f378acfb171d8c48  win-arm64/node_pdb.zip
56dbd529d1eaa0f59c8f015ea604fe3d505a77ef9592fc4aed8030dc79f1bc14  win-x64/node.exe
baa9ae6f44e6f5bd3ef5f37f376ba5295eddc212bbe05cc565492d4c7f919164  win-x64/node.lib
2df2aafb34baf8c522e02aea3c555caa7acebcc5d1d95b0f2304b50d8b5358b1  win-x64/node_pdb.7z
d9a0c06d448848fd38ee3efe1600b83a308284d0a5c1743dc4dbfdb7031ab3cd  win-x64/node_pdb.zip

-----BEGIN PGP SIGNATURE-----

iHUEARYIAB0WIQRb6KP2yKXAHRBsCtggsaOQsWjTVgUCaIvlFAAKCRAgsaOQsWjT
VkakAQC41T2Fx8J5zX29uIgu41NCu3EJut9KjatOIS72oxOdnQEAgs0XTdyXvj6/
MBe9+5UcQ/X8M1QvKXkDKSgVNFSQ6AA=
=0xOk
-----END PGP SIGNATURE-----
```
