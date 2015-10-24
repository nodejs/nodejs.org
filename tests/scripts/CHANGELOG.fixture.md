# Node.js ChangeLog

## 2015-10-13, Version 4.2.1 'Argon' (Stable), @jasnell

### Notable changes

* Includes fixes for two regressions
  - Assertion error in WeakCallback  - see [#3329](https://github.com/nodejs/node/pull/3329)
  - Undefined timeout regression - see [#3331](https://github.com/nodejs/node/pull/3331)

### Known issues

* When a server queues a large amount of data to send to a client over a pipelined HTTP connection, the underlying socket may be destroyed. See [#3332](https://github.com/nodejs/node/issues/3332) and [#3342](https://github.com/nodejs/node/pull/3342).
* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Commits

* [[`b3cbd13340`](https://github.com/nodejs/node/commit/b3cbd13340)] - **buffer**: fix assertion error in WeakCallback (Fedor Indutny) [#3329](https://github.com/nodejs/node/pull/3329)
* [[`102cb7288c`](https://github.com/nodejs/node/commit/102cb7288c)] - **doc**: label v4.2.0 as LTS in changelog heading (Rod Vagg) [#3343](https://github.com/nodejs/node/pull/3343)
* [[`c245a199a7`](https://github.com/nodejs/node/commit/c245a199a7)] - **lib**: fix undefined timeout regression (Ryan Graham) [#3331](https://github.com/nodejs/node/pull/3331)

## 2015-10-07, Version 4.2.0 'Argon' (LTS), @jasnell

### Notable changes

The first Node.js LTS release! See https://github.com/nodejs/LTS/ for details of the LTS process.

* **icu**: Updated to version 56 with significant performance improvements (Steven R. Loomis) [#3281](https://github.com/nodejs/node/pull/3281)
* **node**:
  - Added new `-c` (or `--check`) command line argument for checking script syntax without executing the code (Dave Eddy) [#2411](https://github.com/nodejs/node/pull/2411)
  - Added `process.versions.icu` to hold the current ICU library version (Evan Lucas) [#3102](https://github.com/nodejs/node/pull/3102)
  - Added `process.release.lts` to hold the current LTS codename when the binary is from an active LTS release line (Rod Vagg) [#3212](https://github.com/nodejs/node/pull/3212)
* **npm**: Upgraded to npm 2.14.7 from 2.14.4, see [release notes](https://github.com/npm/npm/releases/tag/v2.14.7) for full details (Kat Marchán) [#3299](https://github.com/nodejs/node/pull/3299)

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Commits


* [[`8383c4fe00`](https://github.com/nodejs/node/commit/8383c4fe00)] - **assert**: support arrow functions in .throws() (Ben Noordhuis) [#3276](https://github.com/nodejs/node/pull/3276)
* [[`3eaa593a32`](https://github.com/nodejs/node/commit/3eaa593a32)] - **async_wrap**: correctly pass parent to init callback (Trevor Norris) [#3216](https://github.com/nodejs/node/pull/3216)
* [[`54795620f6`](https://github.com/nodejs/node/commit/54795620f6)] - **buffer**: don't abort on prototype getters (Trevor Norris) [#3302](https://github.com/nodejs/node/pull/3302)
* [[`660f7591c8`](https://github.com/nodejs/node/commit/660f7591c8)] - **buffer**: FreeCallback should be tied to ArrayBuffer (Fedor Indutny) [#3198](https://github.com/nodejs/node/pull/3198)
* [[`651a5b51eb`](https://github.com/nodejs/node/commit/651a5b51eb)] - **buffer**: only check if instance is Uint8Array (Trevor Norris) [#3080](https://github.com/nodejs/node/pull/3080)
* [[`d5a1b1ad7c`](https://github.com/nodejs/node/commit/d5a1b1ad7c)] - **buffer**: clean up usage of __proto__ (Trevor Norris) [#3080](https://github.com/nodejs/node/pull/3080)
* [[`af24376e18`](https://github.com/nodejs/node/commit/af24376e18)] - **build**: Intl: deps: bump ICU to 56.1 (GA) (Steven R. Loomis) [#3281](https://github.com/nodejs/node/pull/3281)
* [[`9136359d57`](https://github.com/nodejs/node/commit/9136359d57)] - **build**: make icu download path customizable (Johan Bergström) [#3200](https://github.com/nodejs/node/pull/3200)
* [[`b3c5ad10a8`](https://github.com/nodejs/node/commit/b3c5ad10a8)] - **build**: add --with-arm-fpu option (Jérémy Lal) [#3228](https://github.com/nodejs/node/pull/3228)
* [[`f00f3268e4`](https://github.com/nodejs/node/commit/f00f3268e4)] - **build**: intl: avoid 'duplicate main()' on ICU 56 (Steven R. Loomis) [#3066](https://github.com/nodejs/node/pull/3066)
* [[`071c72a6a3`](https://github.com/nodejs/node/commit/071c72a6a3)] - **deps**: upgrade to npm 2.14.7 (Kat Marchán) [#3299](https://github.com/nodejs/node/pull/3299)
* [[`8b50e95f06`](https://github.com/nodejs/node/commit/8b50e95f06)] - **(SEMVER-MINOR)** **deps**: backport 1ee712a from V8 upstream (Julien Gilli) [#3036](https://github.com/nodejs/node/pull/3036)
* [[`747271372f`](https://github.com/nodejs/node/commit/747271372f)] - **doc**: update the assert module summary (David Boivin) [#2799](https://github.com/nodejs/node/pull/2799)
* [[`0d506556b0`](https://github.com/nodejs/node/commit/0d506556b0)] - **doc**: replace node-gyp link with nodejs/node-gyp (Roman Klauke) [#3320](https://github.com/nodejs/node/pull/3320)
* [[`40a159e4f4`](https://github.com/nodejs/node/commit/40a159e4f4)] - **doc**: Amend capitalization of word JavaScript (Dave Hodder) [#3285](https://github.com/nodejs/node/pull/3285)
* [[`6dd34761fd`](https://github.com/nodejs/node/commit/6dd34761fd)] - **doc**: add method links in dns.markdown (Alejandro Oviedo) [#3196](https://github.com/nodejs/node/pull/3196)
* [[`333e8336be`](https://github.com/nodejs/node/commit/333e8336be)] - **doc**: add method links in child_process.markdown (Alejandro Oviedo) [#3186](https://github.com/nodejs/node/pull/3186)
* [[`0cfc6d39ca`](https://github.com/nodejs/node/commit/0cfc6d39ca)] - **doc**: recommend Infinity on emitter.setMaxListeners (Jason Karns) [#2559](https://github.com/nodejs/node/pull/2559)
* [[`d4fc6d93ef`](https://github.com/nodejs/node/commit/d4fc6d93ef)] - **doc**: add help repo link to CONTRIBUTING.md (Doug Shamoo) [#3233](https://github.com/nodejs/node/pull/3233)
* [[`28aac7f19d`](https://github.com/nodejs/node/commit/28aac7f19d)] - **doc**: add TLS session resumption example (Roman Reiss) [#3147](https://github.com/nodejs/node/pull/3147)
* [[`365cf22cce`](https://github.com/nodejs/node/commit/365cf22cce)] - **doc**: update AUTHORS list (Rod Vagg) [#3211](https://github.com/nodejs/node/pull/3211)
* [[`d4399613b7`](https://github.com/nodejs/node/commit/d4399613b7)] - **doc**: standardize references to userland (Martial) [#3192](https://github.com/nodejs/node/pull/3192)
* [[`75de258376`](https://github.com/nodejs/node/commit/75de258376)] - **doc**: fix spelling in Buffer documentation (Rod Machen) [#3226](https://github.com/nodejs/node/pull/3226)
* [[`725c7276dd`](https://github.com/nodejs/node/commit/725c7276dd)] - **doc**: fix README.md link to joyent/node intl wiki (Steven R. Loomis) [#3067](https://github.com/nodejs/node/pull/3067)
* [[`4a35ba4966`](https://github.com/nodejs/node/commit/4a35ba4966)] - **(SEMVER-MINOR)** **fs**: include filename in watch errors (charlierudolph) [#2748](https://github.com/nodejs/node/pull/2748)
* [[`2ddbbfd164`](https://github.com/nodejs/node/commit/2ddbbfd164)] - **http**: cork/uncork before flushing pipelined res (Fedor Indutny) [#3172](https://github.com/nodejs/node/pull/3172)
* [[`f638402e2f`](https://github.com/nodejs/node/commit/f638402e2f)] - **http**: add comment about `outputSize` in res/server (Fedor Indutny) [#3128](https://github.com/nodejs/node/pull/3128)
* [[`1850879b0e`](https://github.com/nodejs/node/commit/1850879b0e)] - **js_stream**: prevent abort if isalive doesn't exist (Trevor Norris) [#3282](https://github.com/nodejs/node/pull/3282)
* [[`63644dd1cd`](https://github.com/nodejs/node/commit/63644dd1cd)] - **lib**: remove redundant code, add tests in timers.js (Rich Trott) [#3143](https://github.com/nodejs/node/pull/3143)
* [[`74f443583c`](https://github.com/nodejs/node/commit/74f443583c)] - **module**: use UNC paths when loading native addons (Justin Chase) [#2965](https://github.com/nodejs/node/pull/2965)
* [[`01cb3fc36b`](https://github.com/nodejs/node/commit/01cb3fc36b)] - **net**: don't throw on bytesWritten access (Trevor Norris) [#3305](https://github.com/nodejs/node/pull/3305)
* [[`9d65528b01`](https://github.com/nodejs/node/commit/9d65528b01)] - **(SEMVER-MINOR)** **node**: add -c|--check CLI arg to syntax check script (Dave Eddy) [#2411](https://github.com/nodejs/node/pull/2411)
* [[`42b936e78d`](https://github.com/nodejs/node/commit/42b936e78d)] - **(SEMVER-MINOR)** **src**: add process.release.lts property (Rod Vagg) [#3212](https://github.com/nodejs/node/pull/3212)
* [[`589287b2e3`](https://github.com/nodejs/node/commit/589287b2e3)] - **src**: convert BE-utf16-string to LE before search (Karl Skomski) [#3295](https://github.com/nodejs/node/pull/3295)
* [[`2314378f06`](https://github.com/nodejs/node/commit/2314378f06)] - **src**: fix u-a-free if uv returns err in ASYNC_CALL (Karl Skomski) [#3049](https://github.com/nodejs/node/pull/3049)
* [[`d99336a391`](https://github.com/nodejs/node/commit/d99336a391)] - **(SEMVER-MINOR)** **src**: replace naive search in Buffer::IndexOf (Karl Skomski) [#2539](https://github.com/nodejs/node/pull/2539)
* [[`546e8333ba`](https://github.com/nodejs/node/commit/546e8333ba)] - **(SEMVER-MINOR)** **src**: fix --abort-on-uncaught-exception (Jeremy Whitlock) [#3036](https://github.com/nodejs/node/pull/3036)
* [[`7271cb047c`](https://github.com/nodejs/node/commit/7271cb047c)] - **(SEMVER-MINOR)** **src**: add process.versions.icu (Evan Lucas) [#3102](https://github.com/nodejs/node/pull/3102)
* [[`7b9f78acb2`](https://github.com/nodejs/node/commit/7b9f78acb2)] - **stream**: avoid pause with unpipe in buffered write (Brian White) [#2325](https://github.com/nodejs/node/pull/2325)
* [[`f0f8afd879`](https://github.com/nodejs/node/commit/f0f8afd879)] - **test**: remove common.inspect() (Rich Trott) [#3257](https://github.com/nodejs/node/pull/3257)
* [[`5ca4f6f8bd`](https://github.com/nodejs/node/commit/5ca4f6f8bd)] - **test**: test `util` rather than `common` (Rich Trott) [#3256](https://github.com/nodejs/node/pull/3256)
* [[`7a5ae34345`](https://github.com/nodejs/node/commit/7a5ae34345)] - **test**: refresh temp directory when using pipe (Rich Trott) [#3231](https://github.com/nodejs/node/pull/3231)
* [[`7c85557ef0`](https://github.com/nodejs/node/commit/7c85557ef0)] - **test**: Fix test-fs-read-stream-fd-leak race cond (Junliang Yan) [#3218](https://github.com/nodejs/node/pull/3218)
* [[`26a7ec6960`](https://github.com/nodejs/node/commit/26a7ec6960)] - **test**: fix losing original env vars issue (Junliang Yan) [#3190](https://github.com/nodejs/node/pull/3190)
* [[`e922716192`](https://github.com/nodejs/node/commit/e922716192)] - **test**: remove deprecated error logging (Rich Trott) [#3079](https://github.com/nodejs/node/pull/3079)
* [[`8f29d95a8c`](https://github.com/nodejs/node/commit/8f29d95a8c)] - **test**: report timeout in TapReporter (Karl Skomski) [#2647](https://github.com/nodejs/node/pull/2647)
* [[`2d0fe4c657`](https://github.com/nodejs/node/commit/2d0fe4c657)] - **test**: linting for buffer-free-callback test (Rich Trott) [#3230](https://github.com/nodejs/node/pull/3230)
* [[`70c9e4337e`](https://github.com/nodejs/node/commit/70c9e4337e)] - **test**: make common.js mandatory via linting rule (Rich Trott) [#3157](https://github.com/nodejs/node/pull/3157)
* [[`b7179562aa`](https://github.com/nodejs/node/commit/b7179562aa)] - **test**: load common.js in all tests (Rich Trott) [#3157](https://github.com/nodejs/node/pull/3157)
* [[`bab555a1c1`](https://github.com/nodejs/node/commit/bab555a1c1)] - **test**: speed up stringbytes-external test (Evan Lucas) [#3005](https://github.com/nodejs/node/pull/3005)
* [[`ddf258376d`](https://github.com/nodejs/node/commit/ddf258376d)] - **test**: use normalize() for unicode paths (Roman Reiss) [#3007](https://github.com/nodejs/node/pull/3007)
* [[`46876d519c`](https://github.com/nodejs/node/commit/46876d519c)] - **test**: remove arguments.callee usage (Roman Reiss) [#3167](https://github.com/nodejs/node/pull/3167)
* [[`af10df6108`](https://github.com/nodejs/node/commit/af10df6108)] - **tls**: use parent handle's close callback (Fedor Indutny) [#2991](https://github.com/nodejs/node/pull/2991)
* [[`9c2748bad1`](https://github.com/nodejs/node/commit/9c2748bad1)] - **tools**: remove leftover license boilerplate (Nathan Rajlich) [#3225](https://github.com/nodejs/node/pull/3225)
* [[`5d9f83ff2a`](https://github.com/nodejs/node/commit/5d9f83ff2a)] - **tools**: apply linting to custom rules code (Rich Trott) [#3195](https://github.com/nodejs/node/pull/3195)
* [[`18a8b2ec73`](https://github.com/nodejs/node/commit/18a8b2ec73)] - **tools**: remove unused gflags module (Ben Noordhuis) [#3220](https://github.com/nodejs/node/pull/3220)
* [[`e0fffca836`](https://github.com/nodejs/node/commit/e0fffca836)] - **util**: fix for inspecting promises (Evan Lucas) [#3221](https://github.com/nodejs/node/pull/3221)
* [[`8dfdee3733`](https://github.com/nodejs/node/commit/8dfdee3733)] - **util**: correctly inspect Map/Set Iterators (Evan Lucas) [#3119](https://github.com/nodejs/node/pull/3119)
* [[`b5c51fdba0`](https://github.com/nodejs/node/commit/b5c51fdba0)] - **util**: fix check for Array constructor (Evan Lucas) [#3119](https://github.com/nodejs/node/pull/3119)

## 2015-09-22, Version 4.1.1 (Stable), @rvagg

### Notable changes

* **buffer**: Fixed a bug introduced in v4.1.0 where allocating a new zero-length buffer can result in the _next_ allocation of a TypedArray in JavaScript not being zero-filled. In certain circumstances this could result in data leakage via reuse of memory space in TypedArrays, breaking the normally safe assumption that TypedArrays should be always zero-filled. (Trevor Norris) [#2931](https://github.com/nodejs/node/pull/2931).
* **http**: Guard against response-splitting of HTTP trailing headers added via [`response.addTrailers()`](https://nodejs.org/api/http.html#http_response_addtrailers_headers) by removing new-line (`[\r\n]`) characters from values. Note that standard header values are already stripped of new-line characters. The expected security impact is low because trailing headers are rarely used. (Ben Noordhuis) [#2945](https://github.com/nodejs/node/pull/2945).
* **npm**: Upgrade to npm 2.14.4 from 2.14.3, see [release notes](https://github.com/npm/npm/releases/tag/v2.14.4) for full details (Kat Marchán) [#2958](https://github.com/nodejs/node/pull/2958)
  - Upgrades `graceful-fs` on multiple dependencies to no longer rely on monkey-patching `fs`
  - Fix `npm link` for pre-release / RC builds of Node
* **v8**: Update post-mortem metadata to allow post-mortem debugging tools to find and inspect:
  - JavaScript objects that use dictionary properties (Julien Gilli) [#2959](https://github.com/nodejs/node/pull/2959)
  - ScopeInfo and thus closures (Julien Gilli) [#2974](https://github.com/nodejs/node/pull/2974)

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Commits

* [[`d63e02e08d`](https://github.com/nodejs/node/commit/d63e02e08d)] - **buffer**: don't set zero fill for zero-length buffer (Trevor Norris) [#2931](https://github.com/nodejs/node/pull/2931)
* [[`5905b14bff`](https://github.com/nodejs/node/commit/5905b14bff)] - **build**: fix icutrim when building small-icu on BE (Stewart Addison) [#2602](https://github.com/nodejs/node/pull/2602)
* [[`f010cb5d96`](https://github.com/nodejs/node/commit/f010cb5d96)] - **configure**: detect mipsel host (Jérémy Lal) [#2971](https://github.com/nodejs/node/pull/2971)
* [[`b93ad5abbd`](https://github.com/nodejs/node/commit/b93ad5abbd)] - **deps**: backport 357e6b9 from V8's upstream (Julien Gilli) [#2974](https://github.com/nodejs/node/pull/2974)
* [[`8da3da4d41`](https://github.com/nodejs/node/commit/8da3da4d41)] - **deps**: backport ff7d70b from V8's upstream (Julien Gilli) [#2959](https://github.com/nodejs/node/pull/2959)
* [[`2600fb8ae6`](https://github.com/nodejs/node/commit/2600fb8ae6)] - **deps**: upgraded to node-gyp@3.0.3 in npm (Kat Marchán) [#2958](https://github.com/nodejs/node/pull/2958)
* [[`793aad2d7a`](https://github.com/nodejs/node/commit/793aad2d7a)] - **deps**: upgrade to npm 2.14.4 (Kat Marchán) [#2958](https://github.com/nodejs/node/pull/2958)
* [[`43e2b7f836`](https://github.com/nodejs/node/commit/43e2b7f836)] - **doc**: remove usage of events.EventEmitter (Sakthipriyan Vairamani) [#2921](https://github.com/nodejs/node/pull/2921)
* [[`9c59d2f16a`](https://github.com/nodejs/node/commit/9c59d2f16a)] - **doc**: remove extra using v8::HandleScope statement (Christopher J. Brody) [#2983](https://github.com/nodejs/node/pull/2983)
* [[`f7edbab367`](https://github.com/nodejs/node/commit/f7edbab367)] - **doc**: clarify description of assert.ifError() (Rich Trott) [#2941](https://github.com/nodejs/node/pull/2941)
* [[`b2ddf0f9a2`](https://github.com/nodejs/node/commit/b2ddf0f9a2)] - **doc**: refine process.kill() and exit explanations (Rich Trott) [#2918](https://github.com/nodejs/node/pull/2918)
* [[`f68fed2e6f`](https://github.com/nodejs/node/commit/f68fed2e6f)] - **http**: remove redundant code in _deferToConnect (Malcolm Ahoy) [#2769](https://github.com/nodejs/node/pull/2769)
* [[`f542e74c93`](https://github.com/nodejs/node/commit/f542e74c93)] - **http**: guard against response splitting in trailers (Ben Noordhuis) [#2945](https://github.com/nodejs/node/pull/2945)
* [[`bc9f629387`](https://github.com/nodejs/node/commit/bc9f629387)] - **http_parser**: do not dealloc during kOnExecute (Fedor Indutny) [#2956](https://github.com/nodejs/node/pull/2956)
* [[`1860e0cebd`](https://github.com/nodejs/node/commit/1860e0cebd)] - **lib,src**: remove usage of events.EventEmitter (Sakthipriyan Vairamani) [#2921](https://github.com/nodejs/node/pull/2921)
* [[`d4cd5ac407`](https://github.com/nodejs/node/commit/d4cd5ac407)] - **readline**: fix tab completion bug (Matt Harrison) [#2816](https://github.com/nodejs/node/pull/2816)
* [[`9760e04839`](https://github.com/nodejs/node/commit/9760e04839)] - **repl**: don't use tty control codes when $TERM is set to "dumb" (Salman Aljammaz) [#2712](https://github.com/nodejs/node/pull/2712)
* [[`cb971cc97d`](https://github.com/nodejs/node/commit/cb971cc97d)] - **repl**: backslash bug fix (Sakthipriyan Vairamani) [#2968](https://github.com/nodejs/node/pull/2968)
* [[`2034f68668`](https://github.com/nodejs/node/commit/2034f68668)] - **src**: honor --abort_on_uncaught_exception flag (Evan Lucas) [#2776](https://github.com/nodejs/node/pull/2776)
* [[`0b1ca4a9ef`](https://github.com/nodejs/node/commit/0b1ca4a9ef)] - **src**: Add ABORT macro (Evan Lucas) [#2776](https://github.com/nodejs/node/pull/2776)
* [[`4519dd00f9`](https://github.com/nodejs/node/commit/4519dd00f9)] - **test**: test sync version of mkdir & rmdir (Sakthipriyan Vairamani) [#2588](https://github.com/nodejs/node/pull/2588)
* [[`816f609c8b`](https://github.com/nodejs/node/commit/816f609c8b)] - **test**: use tmpDir instead of fixtures in readdir (Sakthipriyan Vairamani) [#2587](https://github.com/nodejs/node/pull/2587)
* [[`2084f52585`](https://github.com/nodejs/node/commit/2084f52585)] - **test**: test more http response splitting scenarios (Ben Noordhuis) [#2945](https://github.com/nodejs/node/pull/2945)
* [[`fa08d1d8a1`](https://github.com/nodejs/node/commit/fa08d1d8a1)] - **test**: add test-spawn-cmd-named-pipe (Alexis Campailla) [#2770](https://github.com/nodejs/node/pull/2770)
* [[`71b5d80682`](https://github.com/nodejs/node/commit/71b5d80682)] - **test**: make cluster tests more time tolerant (Michael Dawson) [#2891](https://github.com/nodejs/node/pull/2891)
* [[`3e09dcfc32`](https://github.com/nodejs/node/commit/3e09dcfc32)] - **test**: update cwd-enoent tests for AIX (Imran Iqbal) [#2909](https://github.com/nodejs/node/pull/2909)
* [[`6ea8ec1c59`](https://github.com/nodejs/node/commit/6ea8ec1c59)] - **tools**: single, cross-platform tick processor (Matt Loring) [#2868](https://github.com/nodejs/node/pull/2868)

## 2015-09-17, Version 4.1.0 (Stable), @Fishrock123

### Notable changes

* **buffer**:
  - Buffers are now created in JavaScript, rather than C++. This increases the speed of buffer creation (Trevor Norris) [#2866](https://github.com/nodejs/node/pull/2866).
  - `Buffer#slice()` now uses `Uint8Array#subarray()` internally, increasing `slice()` performance (Karl Skomski) [#2777](https://github.com/nodejs/node/pull/2777).
* **fs**:
  - `fs.utimes()` now properly converts numeric strings, `NaN`, and `Infinity` (Yazhong Liu) [#2387](https://github.com/nodejs/node/pull/2387).
  - `fs.WriteStream` now implements `_writev`, allowing for super-fast bulk writes (Ron Korving) [#2167](https://github.com/nodejs/node/pull/2167).
* **http**: Fixed an issue with certain `write()` sizes causing errors when using `http.request()` (Fedor Indutny) [#2824](https://github.com/nodejs/node/pull/2824).
* **npm**: Upgrade to version 2.14.3, see https://github.com/npm/npm/releases/tag/v2.14.3 for more details (Kat Marchán) [#2822](https://github.com/nodejs/node/pull/2822).
* **src**: V8 cpu profiling no longer erroneously shows idle time (Oleksandr Chekhovskyi) [#2324](https://github.com/nodejs/node/pull/2324).
* **timers**: `#ref()` and `#unref()` now return the timer they belong to (Sam Roberts) [#2905](https://github.com/nodejs/node/pull/2905).
* **v8**: Lateral upgrade to 4.5.103.33 from 4.5.103.30, contains minor fixes (Ali Ijaz Sheikh) [#2870](https://github.com/nodejs/node/pull/2870).
  - This fixes a previously known bug where some computed object shorthand properties did not work correctly ([#2507](https://github.com/nodejs/node/issues/2507)).

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Commits

* [[`b1abe812cd`](https://github.com/nodejs/node/commit/b1abe812cd)] - Working on 4.0.1 (Rod Vagg)
* [[`f9f8378853`](https://github.com/nodejs/node/commit/f9f8378853)] - 2015-09-08, Version 4.0.0 (Stable) Release (Rod Vagg)
* [[`9683e5df51`](https://github.com/nodejs/node/commit/9683e5df51)] - **bindings**: close after reading module struct (Fedor Indutny) [#2792](https://github.com/nodejs/node/pull/2792)
* [[`4b4cfa2d44`](https://github.com/nodejs/node/commit/4b4cfa2d44)] - **buffer**: always allocate typed arrays outside heap (Trevor Norris) [#2893](https://github.com/nodejs/node/pull/2893)
* [[`7df018a29b`](https://github.com/nodejs/node/commit/7df018a29b)] - **buffer**: construct Uint8Array in JS (Trevor Norris) [#2866](https://github.com/nodejs/node/pull/2866)
* [[`43397b204e`](https://github.com/nodejs/node/commit/43397b204e)] - **(SEMVER-MINOR)** **build**: Updates to enable AIX support (Michael Dawson) [#2364](https://github.com/nodejs/node/pull/2364)
* [[`e35b1fd610`](https://github.com/nodejs/node/commit/e35b1fd610)] - **build**: clean up the generated tap file (Sakthipriyan Vairamani) [#2837](https://github.com/nodejs/node/pull/2837)
* [[`96670ebe37`](https://github.com/nodejs/node/commit/96670ebe37)] - **deps**: backport 6d32be2 from v8's upstream (Michaël Zasso) [#2916](https://github.com/nodejs/node/pull/2916)
* [[`94972d5b13`](https://github.com/nodejs/node/commit/94972d5b13)] - **deps**: backport 0d01728 from v8's upstream (Fedor Indutny) [#2912](https://github.com/nodejs/node/pull/2912)
* [[`7ebd881c29`](https://github.com/nodejs/node/commit/7ebd881c29)] - **deps**: upgrade V8 to 4.5.103.33 (Ali Ijaz Sheikh) [#2870](https://github.com/nodejs/node/pull/2870)
* [[`ed47ab6e44`](https://github.com/nodejs/node/commit/ed47ab6e44)] - **deps**: upgraded to node-gyp@3.0.3 in npm (Kat Marchán) [#2822](https://github.com/nodejs/node/pull/2822)
* [[`f4641ae875`](https://github.com/nodejs/node/commit/f4641ae875)] - **deps**: upgrade to npm 2.14.3 (Kat Marchán) [#2822](https://github.com/nodejs/node/pull/2822)
* [[`8119693a3d`](https://github.com/nodejs/node/commit/8119693a3d)] - **deps**: update libuv to version 1.7.4 (Saúl Ibarra Corretgé) [#2817](https://github.com/nodejs/node/pull/2817)
* [[`6098504685`](https://github.com/nodejs/node/commit/6098504685)] - **deps**: cherry-pick 6da51b4 from v8's upstream (Fedor Indutny) [#2801](https://github.com/nodejs/node/pull/2801)
* [[`bf42cc8dba`](https://github.com/nodejs/node/commit/bf42cc8dba)] - **doc**: process exit event is not guaranteed to fire (Rich Trott) [#2861](https://github.com/nodejs/node/pull/2861)
* [[`bb0f869f67`](https://github.com/nodejs/node/commit/bb0f869f67)] - **doc**: remove incorrect reference to TCP in net docs (Sam Roberts) [#2903](https://github.com/nodejs/node/pull/2903)
* [[`302d59dce8`](https://github.com/nodejs/node/commit/302d59dce8)] - **doc**: correct buffer.slice arg syntax (Sam Roberts) [#2903](https://github.com/nodejs/node/pull/2903)
* [[`74db9637b7`](https://github.com/nodejs/node/commit/74db9637b7)] - **doc**: describe spawn option.detached (Sam Roberts) [#2903](https://github.com/nodejs/node/pull/2903)
* [[`a7bd897273`](https://github.com/nodejs/node/commit/a7bd897273)] - **doc**: rename from iojs(1) to node(1) in benchmarks (Dmitry Vasilyev) [#2884](https://github.com/nodejs/node/pull/2884)
* [[`cd643d7c37`](https://github.com/nodejs/node/commit/cd643d7c37)] - **doc**: add missing backtick in buffer.markdown (Sven Slootweg) [#2881](https://github.com/nodejs/node/pull/2881)
* [[`e8a206e802`](https://github.com/nodejs/node/commit/e8a206e802)] - **doc**: fix broken link in repl.markdown (Danny Nemer) [#2827](https://github.com/nodejs/node/pull/2827)
* [[`7ee36d61f7`](https://github.com/nodejs/node/commit/7ee36d61f7)] - **doc**: fix typos in README (Ionică Bizău) [#2852](https://github.com/nodejs/node/pull/2852)
* [[`4d1ae26196`](https://github.com/nodejs/node/commit/4d1ae26196)] - **doc**: add tunniclm as a collaborator (Mike Tunnicliffe) [#2826](https://github.com/nodejs/node/pull/2826)
* [[`2d77d03643`](https://github.com/nodejs/node/commit/2d77d03643)] - **doc**: fix two doc errors in stream and process (Jeremiah Senkpiel) [#2549](https://github.com/nodejs/node/pull/2549)
* [[`55ac24f721`](https://github.com/nodejs/node/commit/55ac24f721)] - **doc**: fixed io.js references in process.markdown (Tristian Flanagan) [#2846](https://github.com/nodejs/node/pull/2846)
* [[`cd1297fb57`](https://github.com/nodejs/node/commit/cd1297fb57)] - **doc**: use "Calls" over "Executes" for consistency (Minwoo Jung) [#2800](https://github.com/nodejs/node/pull/2800)
* [[`d664b95581`](https://github.com/nodejs/node/commit/d664b95581)] - **doc**: use US English for consistency (Anne-Gaelle Colom) [#2784](https://github.com/nodejs/node/pull/2784)
* [[`82ba1839fb`](https://github.com/nodejs/node/commit/82ba1839fb)] - **doc**: use 3rd person singular for consistency (Anne-Gaelle Colom) [#2765](https://github.com/nodejs/node/pull/2765)
* [[`432cce6e95`](https://github.com/nodejs/node/commit/432cce6e95)] - **doc**: describe process API for IPC (Sam Roberts) [#1978](https://github.com/nodejs/node/pull/1978)
* [[`1d75012b9d`](https://github.com/nodejs/node/commit/1d75012b9d)] - **doc**: fix comma splice in Assertion Testing doc (Rich Trott) [#2728](https://github.com/nodejs/node/pull/2728)
* [[`6108ea9bb4`](https://github.com/nodejs/node/commit/6108ea9bb4)] - **fs**: consider NaN/Infinity in toUnixTimestamp (Yazhong Liu) [#2387](https://github.com/nodejs/node/pull/2387)
* [[`2b6aa9415f`](https://github.com/nodejs/node/commit/2b6aa9415f)] - **(SEMVER-MINOR)** **fs**: implemented WriteStream#writev (Ron Korving) [#2167](https://github.com/nodejs/node/pull/2167)
* [[`431bf74c55`](https://github.com/nodejs/node/commit/431bf74c55)] - **http**: default Agent.getName to 'localhost' (Malcolm Ahoy) [#2825](https://github.com/nodejs/node/pull/2825)
* [[`ea15d71c16`](https://github.com/nodejs/node/commit/ea15d71c16)] - **http_server**: fix resume after socket close (Fedor Indutny) [#2824](https://github.com/nodejs/node/pull/2824)
* [[`8e5843405b`](https://github.com/nodejs/node/commit/8e5843405b)] - **src**: null env_ field from constructor (Trevor Norris) [#2913](https://github.com/nodejs/node/pull/2913)
* [[`0a5f80a11f`](https://github.com/nodejs/node/commit/0a5f80a11f)] - **src**: use subarray() in Buffer#slice() for speedup (Karl Skomski) [#2777](https://github.com/nodejs/node/pull/2777)
* [[`57707e2490`](https://github.com/nodejs/node/commit/57707e2490)] - **src**: use ZCtxt as a source for v8::Isolates (Roman Klauke) [#2547](https://github.com/nodejs/node/pull/2547)
* [[`b0df2273ab`](https://github.com/nodejs/node/commit/b0df2273ab)] - **src**: fix v8::CpuProfiler idle sampling (Oleksandr Chekhovskyi) [#2324](https://github.com/nodejs/node/pull/2324)
* [[`eaa8e60b91`](https://github.com/nodejs/node/commit/eaa8e60b91)] - **streams**: refactor LazyTransform to internal/ (Brendan Ashworth) [#2566](https://github.com/nodejs/node/pull/2566)
* [[`648c003e14`](https://github.com/nodejs/node/commit/648c003e14)] - **test**: use tmp directory in chdir test (Sakthipriyan Vairamani) [#2589](https://github.com/nodejs/node/pull/2589)
* [[`079a2173d4`](https://github.com/nodejs/node/commit/079a2173d4)] - **test**: fix Buffer OOM error message (Trevor Norris) [#2915](https://github.com/nodejs/node/pull/2915)
* [[`52019a1b21`](https://github.com/nodejs/node/commit/52019a1b21)] - **test**: fix default value for additional param (Sakthipriyan Vairamani) [#2553](https://github.com/nodejs/node/pull/2553)
* [[`5df5d0423a`](https://github.com/nodejs/node/commit/5df5d0423a)] - **test**: remove disabled test (Rich Trott) [#2841](https://github.com/nodejs/node/pull/2841)
* [[`9e5f0995bd`](https://github.com/nodejs/node/commit/9e5f0995bd)] - **test**: split up internet dns tests (Rich Trott) [#2802](https://github.com/nodejs/node/pull/2802)
* [[`41f2dde51a`](https://github.com/nodejs/node/commit/41f2dde51a)] - **test**: increase dgram timeout for armv6 (Rich Trott) [#2808](https://github.com/nodejs/node/pull/2808)
* [[`6e2fe1c21a`](https://github.com/nodejs/node/commit/6e2fe1c21a)] - **test**: remove valid hostname check in test-dns.js (Rich Trott) [#2785](https://github.com/nodejs/node/pull/2785)
* [[`779e14f1a7`](https://github.com/nodejs/node/commit/779e14f1a7)] - **test**: expect error for test_lookup_ipv6_hint on FreeBSD (Rich Trott) [#2724](https://github.com/nodejs/node/pull/2724)
* [[`f931b9dd95`](https://github.com/nodejs/node/commit/f931b9dd95)] - **(SEMVER-MINOR)** **timer**: ref/unref return self (Sam Roberts) [#2905](https://github.com/nodejs/node/pull/2905)
* [[`59d03738cc`](https://github.com/nodejs/node/commit/59d03738cc)] - **tools**: enable arrow functions in .eslintrc (Sakthipriyan Vairamani) [#2840](https://github.com/nodejs/node/pull/2840)
* [[`69e7b875a2`](https://github.com/nodejs/node/commit/69e7b875a2)] - **tools**: open `test.tap` file in write-binary mode (Sakthipriyan Vairamani) [#2837](https://github.com/nodejs/node/pull/2837)
* [[`ff6d30d784`](https://github.com/nodejs/node/commit/ff6d30d784)] - **tools**: add missing tick processor polyfill (Matt Loring) [#2694](https://github.com/nodejs/node/pull/2694)
* [[`519caba021`](https://github.com/nodejs/node/commit/519caba021)] - **tools**: fix flakiness in test-tick-processor (Matt Loring) [#2694](https://github.com/nodejs/node/pull/2694)
* [[`ac004b8555`](https://github.com/nodejs/node/commit/ac004b8555)] - **tools**: remove hyphen in TAP result (Sakthipriyan Vairamani) [#2718](https://github.com/nodejs/node/pull/2718)
* [[`ba47511976`](https://github.com/nodejs/node/commit/ba47511976)] - **tsc**: adjust TSC membership for IBM+StrongLoop (James M Snell) [#2858](https://github.com/nodejs/node/pull/2858)
* [[`e035266805`](https://github.com/nodejs/node/commit/e035266805)] - **win,msi**: fix documentation shortcut url (Brian White) [#2781](https://github.com/nodejs/node/pull/2781)

## 2015-09-08, Version 4.0.0 (Stable), @rvagg

### Notable changes

This list of changes is relative to the last io.js v3.x branch release, v3.3.0. Please see the list of notable changes in the v3.x, v2.x and v1.x releases for a more complete list of changes from 0.12.x. Note, that some changes in the v3.x series as well as major breaking changes in this release constitute changes required for full convergence of the Node.js and io.js projects.

* **child_process**: `ChildProcess.prototype.send()` and `process.send()` operate asynchronously across all platforms so an optional callback parameter has been introduced that will be invoked once the message has been sent, i.e. `.send(message[, sendHandle][, callback])` (Ben Noordhuis) [#2620](https://github.com/nodejs/node/pull/2620).
* **node**: Rename "io.js" code to "Node.js" (cjihrig) [#2367](https://github.com/nodejs/node/pull/2367).
* **node-gyp**: This release bundles an updated version of node-gyp that works with all versions of Node.js and io.js including nightly and release candidate builds. From io.js v3 and Node.js v4 onward, it will only download a headers tarball when building addons rather than the entire source. (Rod Vagg) [#2700](https://github.com/nodejs/node/pull/2700)
* **npm**: Upgrade to version 2.14.2 from 2.13.3, includes a security update, see https://github.com/npm/npm/releases/tag/v2.14.2 for more details, (Kat Marchán) [#2696](https://github.com/nodejs/node/pull/2696).
* **timers**: Improved timer performance from porting the 0.12 implementation, plus minor fixes (Jeremiah Senkpiel) [#2540](https://github.com/nodejs/node/pull/2540), (Julien Gilli) [nodejs/node-v0.x-archive#8751](https://github.com/nodejs/node-v0.x-archive/pull/8751) [nodejs/node-v0.x-archive#8905](https://github.com/nodejs/node-v0.x-archive/pull/8905)
* **util**: The `util.is*()` functions have been deprecated, beginning with deprecation warnings in the documentation for this release, users are encouraged to seek more robust alternatives in the npm registry, (Sakthipriyan Vairamani) [#2447](https://github.com/nodejs/node/pull/2447).
* **v8**: Upgrade to version 4.5.103.30 from 4.4.63.30 (Ali Ijaz Sheikh) [#2632](https://github.com/nodejs/node/pull/2632).
 - Implement new `TypedArray` prototype methods: `copyWithin()`, `every()`, `fill()`, `filter()`, `find()`, `findIndex()`, `forEach()`, `indexOf()`, `join()`, `lastIndexOf()`, `map()`, `reduce()`, `reduceRight()`, `reverse()`, `slice()`, `some()`, `sort()`. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray for further information.
 - Implement new `TypedArray.from()` and `TypedArray.of()` functions. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray for further information.
 - Implement arrow functions, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions for further information.
 - Full ChangeLog available at https://github.com/v8/v8-git-mirror/blob/4.5.103/ChangeLog

### Known issues

See https://github.com/nodejs/node/labels/confirmed-bug for complete and current list of known issues.

* Some uses of computed object shorthand properties are not handled correctly by the current version of V8. e.g. `[{ [prop]: val }]` evaluates to `[{}]`. [#2507](https://github.com/nodejs/node/issues/2507)
* Some problems with unreferenced timers running during `beforeExit` are still to be resolved. See [#1264](https://github.com/nodejs/node/issues/1264).
* Surrogate pair in REPL can freeze terminal. [#690](https://github.com/nodejs/node/issues/690)
* Calling `dns.setServers()` while a DNS query is in progress can cause the process to crash on a failed assertion. [#894](https://github.com/nodejs/node/issues/894)
* `url.resolve` may transfer the auth portion of the url when resolving between two full hosts, see [#1435](https://github.com/nodejs/node/issues/1435).

### Commits

* [[`4f50d3fb90`](https://github.com/nodejs/node/commit/4f50d3fb90)] - **(SEMVER-MAJOR)** This commit sets the value of process.release.name to "node". (cjihrig) [#2367](https://github.com/nodejs/node/pull/2367)
* [[`d3178d8b1b`](https://github.com/nodejs/node/commit/d3178d8b1b)] - **buffer**: SlowBuffer only accept valid numeric values (Michaël Zasso) [#2635](https://github.com/nodejs/node/pull/2635)
* [[`0cb0f4a6e4`](https://github.com/nodejs/node/commit/0cb0f4a6e4)] - **build**: fix v8_enable_handle_zapping override (Karl Skomski) [#2731](https://github.com/nodejs/node/pull/2731)
* [[`a7596d7efc`](https://github.com/nodejs/node/commit/a7596d7efc)] - **build**: remote commands on staging in single session (Rod Vagg) [#2717](https://github.com/nodejs/node/pull/2717)
* [[`be427e9efa`](https://github.com/nodejs/node/commit/be427e9efa)] - **build**: make .msi install to "nodejs", not "node" (Rod Vagg) [#2701](https://github.com/nodejs/node/pull/2701)
* [[`5652ce0dbc`](https://github.com/nodejs/node/commit/5652ce0dbc)] - **build**: fix .pkg creation tooling (Rod Vagg) [#2687](https://github.com/nodejs/node/pull/2687)
* [[`101db80111`](https://github.com/nodejs/node/commit/101db80111)] - **build**: add --enable-asan with builtin leakcheck (Karl Skomski) [#2376](https://github.com/nodejs/node/pull/2376)
* [[`2c3939c9c0`](https://github.com/nodejs/node/commit/2c3939c9c0)] - **child_process**: use stdio.fd even if it is 0 (Evan Lucas) [#2727](https://github.com/nodejs/node/pull/2727)
* [[`609db5a1dd`](https://github.com/nodejs/node/commit/609db5a1dd)] - **child_process**: check execFile and fork args (James M Snell) [#2667](https://github.com/nodejs/node/pull/2667)
* [[`d010568c23`](https://github.com/nodejs/node/commit/d010568c23)] - **(SEMVER-MAJOR)** **child_process**: add callback parameter to .send() (Ben Noordhuis) [#2620](https://github.com/nodejs/node/pull/2620)
* [[`c60857a81a`](https://github.com/nodejs/node/commit/c60857a81a)] - **cluster**: allow shared reused dgram sockets (Fedor Indutny) [#2548](https://github.com/nodejs/node/pull/2548)
* [[`b2ecbb6191`](https://github.com/nodejs/node/commit/b2ecbb6191)] - **contextify**: ignore getters during initialization (Fedor Indutny) [#2091](https://github.com/nodejs/node/pull/2091)
* [[`3711934095`](https://github.com/nodejs/node/commit/3711934095)] - **cpplint**: make it possible to run outside git repo (Ben Noordhuis) [#2710](https://github.com/nodejs/node/pull/2710)
* [[`03f900ab25`](https://github.com/nodejs/node/commit/03f900ab25)] - **crypto**: replace rwlocks with simple mutexes (Ben Noordhuis) [#2723](https://github.com/nodejs/node/pull/2723)
* [[`847459c29b`](https://github.com/nodejs/node/commit/847459c29b)] - **(SEMVER-MAJOR)** **crypto**: show exponent in decimal and hex (Chad Johnston) [#2320](https://github.com/nodejs/node/pull/2320)
* [[`e1c976184d`](https://github.com/nodejs/node/commit/e1c976184d)] - **deps**: improve ArrayBuffer performance in v8 (Fedor Indutny) [#2732](https://github.com/nodejs/node/pull/2732)
* [[`cc0ab17a23`](https://github.com/nodejs/node/commit/cc0ab17a23)] - **deps**: float node-gyp v3.0.0 (Rod Vagg) [#2700](https://github.com/nodejs/node/pull/2700)
* [[`b2c3c6d727`](https://github.com/nodejs/node/commit/b2c3c6d727)] - **deps**: create .npmrc during npm tests (Kat Marchán) [#2696](https://github.com/nodejs/node/pull/2696)
* [[`babdbfdbd5`](https://github.com/nodejs/node/commit/babdbfdbd5)] - **deps**: upgrade to npm 2.14.2 (Kat Marchán) [#2696](https://github.com/nodejs/node/pull/2696)
* [[`155783d876`](https://github.com/nodejs/node/commit/155783d876)] - **deps**: backport 75e43a6 from v8 upstream (again) (saper) [#2692](https://github.com/nodejs/node/pull/2692)
* [[`5424d6fcf0`](https://github.com/nodejs/node/commit/5424d6fcf0)] - **deps**: upgrade V8 to 4.5.103.30 (Ali Ijaz Sheikh) [#2632](https://github.com/nodejs/node/pull/2632)
* [[`c43172578e`](https://github.com/nodejs/node/commit/c43172578e)] - **(SEMVER-MAJOR)** **deps**: upgrade V8 to 4.5.103.24 (Ali Ijaz Sheikh) [#2509](https://github.com/nodejs/node/pull/2509)
* [[`714e96e8b9`](https://github.com/nodejs/node/commit/714e96e8b9)] - **deps**: backport 75e43a6 from v8 upstream (saper) [#2636](https://github.com/nodejs/node/pull/2636)
* [[`8637755cbf`](https://github.com/nodejs/node/commit/8637755cbf)] - **doc**: add TSC meeting minutes 2015-09-02 (Rod Vagg) [#2674](https://github.com/nodejs/node/pull/2674)
* [[`d3d5b93214`](https://github.com/nodejs/node/commit/d3d5b93214)] - **doc**: update environment vars in manpage and --help (Roman Reiss) [#2690](https://github.com/nodejs/node/pull/2690)
* [[`29f586ac0a`](https://github.com/nodejs/node/commit/29f586ac0a)] - **doc**: update url doc to account for escaping (Jeremiah Senkpiel) [#2605](https://github.com/nodejs/node/pull/2605)
* [[`ba50cfebef`](https://github.com/nodejs/node/commit/ba50cfebef)] - **doc**: reorder collaborators by their usernames (Johan Bergström) [#2322](https://github.com/nodejs/node/pull/2322)
* [[`8a9a3bf798`](https://github.com/nodejs/node/commit/8a9a3bf798)] - **doc**: update changelog for io.js v3.3.0 (Rod Vagg) [#2653](https://github.com/nodejs/node/pull/2653)
* [[`6cd0e2664b`](https://github.com/nodejs/node/commit/6cd0e2664b)] - **doc**: update io.js reference (Ben Noordhuis) [#2580](https://github.com/nodejs/node/pull/2580)
* [[`f9539c19e8`](https://github.com/nodejs/node/commit/f9539c19e8)] - **doc**: update changelog for io.js v3.2.0 (Rod Vagg) [#2512](https://github.com/nodejs/node/pull/2512)
* [[`cded6e7993`](https://github.com/nodejs/node/commit/cded6e7993)] - **doc**: fix CHANGELOG.md on master (Roman Reiss) [#2513](https://github.com/nodejs/node/pull/2513)
* [[`93e2830686`](https://github.com/nodejs/node/commit/93e2830686)] - **(SEMVER-MINOR)** **doc**: document deprecation of util.is* functions (Sakthipriyan Vairamani) [#2447](https://github.com/nodejs/node/pull/2447)
* [[`7038388558`](https://github.com/nodejs/node/commit/7038388558)] - **doc,test**: enable recursive file watching in Windows (Sakthipriyan Vairamani) [#2649](https://github.com/nodejs/node/pull/2649)
* [[`f3696f64a1`](https://github.com/nodejs/node/commit/f3696f64a1)] - **events,lib**: don't require EE#listenerCount() (Jeremiah Senkpiel) [#2661](https://github.com/nodejs/node/pull/2661)
* [[`45a2046f5d`](https://github.com/nodejs/node/commit/45a2046f5d)] - **(SEMVER-MAJOR)** **installer**: fix installers for node.js rename (Frederic Hemberger) [#2367](https://github.com/nodejs/node/pull/2367)
* [[`7a999a1376`](https://github.com/nodejs/node/commit/7a999a1376)] - **(SEMVER-MAJOR)** **lib**: add net.Socket#localFamily property (Ben Noordhuis) [#956](https://github.com/nodejs/node/pull/956)
* [[`de88255b0f`](https://github.com/nodejs/node/commit/de88255b0f)] - ***Revert*** "**lib,src**: add unix socket getsockname/getpeername" (Ben Noordhuis) [#2584](https://github.com/nodejs/node/pull/2584)
* [[`f337595441`](https://github.com/nodejs/node/commit/f337595441)] - **(SEMVER-MAJOR)** **lib,src**: add unix socket getsockname/getpeername (Ben Noordhuis) [#956](https://github.com/nodejs/node/pull/956)
* [[`3b602527d1`](https://github.com/nodejs/node/commit/3b602527d1)] - **(SEMVER-MAJOR)** **node**: additional cleanup for node rename (cjihrig) [#2367](https://github.com/nodejs/node/pull/2367)
* [[`a69ab27ab4`](https://github.com/nodejs/node/commit/a69ab27ab4)] - **(SEMVER-MAJOR)** **node**: rename from io.js to node (cjihrig) [#2367](https://github.com/nodejs/node/pull/2367)
* [[`9358eee9dd`](https://github.com/nodejs/node/commit/9358eee9dd)] - **node-gyp**: float 3.0.1, minor fix for download url (Rod Vagg) [#2737](https://github.com/nodejs/node/pull/2737)
* [[`d2d981252b`](https://github.com/nodejs/node/commit/d2d981252b)] - **src**: s/ia32/x86 for process.release.libUrl for win (Rod Vagg) [#2699](https://github.com/nodejs/node/pull/2699)
* [[`eba3d3dccd`](https://github.com/nodejs/node/commit/eba3d3dccd)] - **src**: use standard conform snprintf on windows (Karl Skomski) [#2404](https://github.com/nodejs/node/pull/2404)
* [[`cddbec231f`](https://github.com/nodejs/node/commit/cddbec231f)] - **src**: fix buffer overflow for long exception lines (Karl Skomski) [#2404](https://github.com/nodejs/node/pull/2404)
* [[`dd3f3417c7`](https://github.com/nodejs/node/commit/dd3f3417c7)] - **src**: re-enable fast math on arm (Michaël Zasso) [#2592](https://github.com/nodejs/node/pull/2592)
* [[`e137c1177c`](https://github.com/nodejs/node/commit/e137c1177c)] - **(SEMVER-MAJOR)** **src**: enable vector ics on arm again (Ali Ijaz Sheikh) [#2509](https://github.com/nodejs/node/pull/2509)
* [[`7ce749d722`](https://github.com/nodejs/node/commit/7ce749d722)] - **src**: replace usage of v8::Handle with v8::Local (Michaël Zasso) [#2202](https://github.com/nodejs/node/pull/2202)
* [[`b1a2d9509f`](https://github.com/nodejs/node/commit/b1a2d9509f)] - **src**: enable v8 deprecation warnings and fix them (Ben Noordhuis) [#2091](https://github.com/nodejs/node/pull/2091)
* [[`808de0da03`](https://github.com/nodejs/node/commit/808de0da03)] - **(SEMVER-MAJOR)** **src**: apply debug force load fixups from 41e63fb (Ali Ijaz Sheikh) [#2509](https://github.com/nodejs/node/pull/2509)
* [[`5201cb0ff1`](https://github.com/nodejs/node/commit/5201cb0ff1)] - **src**: fix memory leak in ExternString (Karl Skomski) [#2402](https://github.com/nodejs/node/pull/2402)
* [[`2308a27c0a`](https://github.com/nodejs/node/commit/2308a27c0a)] - **src**: only set v8 flags if argc > 1 (Evan Lucas) [#2646](https://github.com/nodejs/node/pull/2646)
* [[`384effed20`](https://github.com/nodejs/node/commit/384effed20)] - **test**: fix use of `common` before required (Rod Vagg) [#2685](https://github.com/nodejs/node/pull/2685)
* [[`f146f686b7`](https://github.com/nodejs/node/commit/f146f686b7)] - **(SEMVER-MAJOR)** **test**: fix test-repl-tab-complete.js for V8 4.5 (Ali Ijaz Sheikh) [#2509](https://github.com/nodejs/node/pull/2509)
* [[`fe4b309fd3`](https://github.com/nodejs/node/commit/fe4b309fd3)] - **test**: refactor to eliminate flaky test (Rich Trott) [#2609](https://github.com/nodejs/node/pull/2609)
* [[`619721e6b8`](https://github.com/nodejs/node/commit/619721e6b8)] - **test**: mark eval_messages as flaky (Alexis Campailla) [#2648](https://github.com/nodejs/node/pull/2648)
* [[`93ba585b66`](https://github.com/nodejs/node/commit/93ba585b66)] - **test**: mark test-vm-syntax-error-stderr as flaky (João Reis) [#2662](https://github.com/nodejs/node/pull/2662)
* [[`367140bca0`](https://github.com/nodejs/node/commit/367140bca0)] - **test**: mark test-repl-persistent-history as flaky (João Reis) [#2659](https://github.com/nodejs/node/pull/2659)
* [[`f6b093343d`](https://github.com/nodejs/node/commit/f6b093343d)] - **timers**: minor `_unrefActive` fixes and improvements (Jeremiah Senkpiel) [#2540](https://github.com/nodejs/node/pull/2540)
* [[`403d7ee7d1`](https://github.com/nodejs/node/commit/403d7ee7d1)] - **timers**: don't mutate unref list while iterating it (Julien Gilli) [#2540](https://github.com/nodejs/node/pull/2540)
* [[`7a8c3e08c3`](https://github.com/nodejs/node/commit/7a8c3e08c3)] - **timers**: Avoid linear scan in `_unrefActive`. (Julien Gilli) [#2540](https://github.com/nodejs/node/pull/2540)
* [[`b630ebaf43`](https://github.com/nodejs/node/commit/b630ebaf43)] - **win,msi**: Upgrade from old upgrade code (João Reis) [#2439](https://github.com/nodejs/node/pull/2439)
