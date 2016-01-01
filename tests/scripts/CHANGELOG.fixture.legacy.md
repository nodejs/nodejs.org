2015-12-04, Version 0.12.9 (LTS), @rvagg

Security Update

Notable items:

* http: Fix a bug where an HTTP socket may no longer have a socket but a pipelined request triggers a pause or resume, a potential denial-of-service vector. (Fedor Indutny)
* openssl: Upgrade to 1.0.1q, containing fixes CVE-2015-3194 "Certificate verify crash with missing PSS parameter", a potential denial-of-service vector for Node.js TLS servers; TLS clients are also impacted. Details are available at <http://openssl.org/news/secadv/20151203.txt>. (Ben Noordhuis) https://github.com/nodejs/node/pull/4133

Commits:

* [8d24a14f2c] - deps: upgrade to openssl 1.0.1q (Ben Noordhuis) https://github.com/nodejs/node/pull/4133
* [dfc6f4a9af] - http: fix pipeline regression (Fedor Indutny)

2015.11.25, Version 0.12.8 (LTS)

* [d9399569bd] - build: backport tools/release.sh (Rod Vagg) https://github.com/nodejs/node/pull/3642
* [78c5b4c8bd] - build: backport config for new CI infrastructure (Rod Vagg) https://github.com/nodejs/node/pull/3642
* [83441616a5] - build: fix --without-ssl compile time error (Ben Noordhuis) https://github.com/nodejs/node/pull/3825
* [8887666b0b] - build: update manifest to include Windows 10 (Lucien Greathouse) https://github.com/nodejs/node/pull/2843
* [08afe4ec8e] - build: add MSVS 2015 support (Rod Vagg) https://github.com/nodejs/node/pull/2843
* [4f2456369c] - build: work around VS2015 issue in ICU <56 (Steven R. Loomis) https://github.com/nodejs/node-v0.x-archive/pull/25804
* [15030f26fd] - build: Intl: bump ICU4C from 54 to 55 (backport) (Steven R. Loomis) https://github.com/nodejs/node-v0.x-archive/pull/25856
* [1083fa70f0] - build: run-ci makefile rule (Alexis Campailla) https://github.com/nodejs/node-v0.x-archive/pull/25653
* [2d2494cf14] - build: support flaky tests in test-ci (Alexis Campailla) https://github.com/nodejs/node-v0.x-archive/pull/25653
* [b25d26f2ef] - build: support Jenkins via test-ci (Alexis Campailla) https://github.com/nodejs/node-v0.x-archive/pull/25653
* [7e4b47f38a] - build,win: fix node.exe resource version (João Reis) https://github.com/nodejs/node/pull/3053
* [e07c86e240] - build,win: try next MSVS version on failure (João Reis) https://github.com/nodejs/node/pull/2843
* [b5a0abcfdf] - child_process: clone spawn options argument (cjihrig) https://github.com/nodejs/node-v0.x-archive/pull/9159
* [8b81f98c41] - configure: add --without-mdb flag (cgalibern) https://github.com/nodejs/node-v0.x-archive/pull/25707
* [071c860c2b] - crypto: replace rwlocks with simple mutexes (Ben Noordhuis) https://github.com/nodejs/node/pull/2723
* [ca97fb6be3] - deps: upgrade npm to 2.14.9 (Forrest L Norvell) https://github.com/nodejs/node/pull/3684
* [583734342e] - deps: fix openssl for MSVS 2015 (Andy Polyakov) https://github.com/nodejs/node/pull/2843
* [02c262a4c6] - deps: fix gyp to work on MacOSX without XCode (Shigeki Ohtsu) https://github.com/nodejs/node/pull/2843
* [f0fba0bce8] - deps: update gyp to 25ed9ac (João Reis) https://github.com/nodejs/node/pull/2843
* [f693565813] - deps: upgrade to npm 2.13.4 (Kat Marchán) https://github.com/nodejs/node-v0.x-archive/pull/25825
* [618b142679] - deps,v8: fix compilation in VS2015 (João Reis) https://github.com/nodejs/node/pull/2843
* [49b4f0d54e] - doc: backport README.md (Rod Vagg) https://github.com/nodejs/node/pull/3642
* [2860c53562] - doc: fixed child_process.exec doc (Tyler Anton) https://github.com/nodejs/node-v0.x-archive/pull/14088
* [4a91fa11a3] - doc: Update docs for os.platform() (George Kotchlamazashvili) https://github.com/nodejs/node-v0.x-archive/pull/25777
* [b03ab02fe8] - doc: Change the link for v8 docs to v8dox.com (Chad Walker) https://github.com/nodejs/node-v0.x-archive/pull/25811
* [1fd8f37efd] - doc: buffer, adding missing backtick (Dyana Rose) https://github.com/nodejs/node-v0.x-archive/pull/25811
* [162d0db3bb] - doc: tls.markdown, adjust version from v0.10.39 to v0.10.x (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [eda2560cdc] - doc: additional refinement to readable event (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [881d9bea01] - doc: readable event clarification (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [b6378f0c75] - doc: stream.unshift does not reset reading state (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [4952e2b4d2] - doc: clarify Readable._read and Readable.push (fresheneesz) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [14000b97d4] - doc: two minor stream doc improvements (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [6b6bd21497] - doc: Clarified read method with specified size argument. (Philippe Laferriere) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [16f547600a] - doc: Document http.request protocol option (Ville Skyttä) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [618e4ecda9] - doc: add a note about readable in flowing mode (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [0b165be37b] - doc: fix line wrapping in buffer.markdown (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [70dd13f88d] - doc: add CleartextStream deprecation notice (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [418cde0765] - doc: mention that mode is ignored if file exists (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [85bcb281e4] - doc: improve http.abort description (James M Snell) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [5ccb429ee8] - doc, comments: Grammar and spelling fixes (Ville Skyttä) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [a24db43101] - docs: event emitter behavior notice (Samuel Mills (Henchman)) https://github.com/nodejs/node-v0.x-archive/pull/25467
* [8cbf7cb021] - docs: events clarify emitter.listener() behavior (Benjamin Steephenson) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [b7229debbe] - docs: Fix default options for fs.createWriteStream() (Chris Neave) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [f0453caea2] - domains: port caeb677 from v0.10 to v0.12 (Jeremy Whitlock) https://github.com/nodejs/node-v0.x-archive/pull/25835
* [261fa3620f] - src: fix intermittent SIGSEGV in resolveTxt (Evan Lucas) https://github.com/nodejs/node-v0.x-archive/pull/9300
* [1f7257b02d] - test: mark test-https-aws-ssl flaky on linux (João Reis) https://github.com/nodejs/node-v0.x-archive/pull/25893
* [cf435d55db] - test: mark test-signal-unregister as flaky (Alexis Campailla) https://github.com/nodejs/node-v0.x-archive/pull/25750
* [ceb6a8c131] - test: fix test-debug-port-from-cmdline (João Reis) https://github.com/nodejs/node-v0.x-archive/pull/25748
* [22997731e6] - test: add regression test for #25735 (Fedor Indutny) https://github.com/nodejs/node-v0.x-archive/pull/25739
* [39e05639f4] - test: mark http-pipeline-flood flaky on win32 (Julien Gilli) https://github.com/nodejs/node-v0.x-archive/pull/25707
* [78d256e7f5] - test: unmark tests that are no longer flaky (João Reis) https://github.com/nodejs/node-v0.x-archive/pull/25676
* [a9b642cf5b] - test: runner should return 0 on flaky tests (Alexis Campailla) https://github.com/nodejs/node-v0.x-archive/pull/25653
* [b48639befd] - test: support writing test output to file (Alexis Campailla) https://github.com/nodejs/node-v0.x-archive/pull/25653
* [caa16b41d6] - (SEMVER-MINOR) tls: prevent server from using dhe keys < 768 (Michael Dawson) https://github.com/nodejs/node/pull/3890
* [0363cf4a80] - tls: Closing parent socket also closes the tls sock (Devin Nakamura) https://github.com/nodejs/node-v0.x-archive/pull/25642
* [75697112e8] - tls: do not hang without `newSession` handler (Fedor Indutny) https://github.com/nodejs/node-v0.x-archive/pull/25739
* [d998a65058] - tools: pass constant to logger instead of string (Johan Bergström) https://github.com/nodejs/node-v0.x-archive/pull/25653
* [1982ed6e63] - v8: port fbff705 from v0.10 to v0.12 (Jeremy Whitlock) https://github.com/nodejs/node-v0.x-archive/pull/25835
* [44d7054252] - win: fix custom actions for WiX older than 3.9 (João Reis) https://github.com/nodejs/node/pull/2843
* [586c4d8b8e] - win: fix custom actions on Visual Studio != 2013 (Julien Gilli) https://github.com/nodejs/node/pull/2843
* [14db629497] - win,msi: correct installation path registry keys (João Reis) https://github.com/nodejs/node-v0.x-archive/pull/25640
* [8e80528453] - win,msi: change InstallScope to perMachine (João Reis) https://github.com/nodejs/node-v0.x-archive/pull/25640
* [35bbe98401] - Update addons.markdown (Max Deepfield) https://github.com/nodejs/node-v0.x-archive/pull/25885
* [9a6f1ce416] - comma (Julien Valéry) https://github.com/nodejs/node-v0.x-archive/pull/25811
* [d384bf8f84] - Update assert.markdown (daveboivin) https://github.com/nodejs/node-v0.x-archive/pull/25811
* [89b22ccbe1] - Fixed typo (Andrew Murray) https://github.com/nodejs/node-v0.x-archive/pull/25811
* [5ad05af380] - Update util.markdown (Daniel Rentz) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [cb660ab3d3] - Update child_process.markdown, spelling (Jared Fox) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [59c67fe3cd] - updated documentation for fs.createReadStream (Michele Caini) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [53b6a615a5] - Documentation update about Buffer initialization (Sarath) https://github.com/nodejs/node-v0.x-archive/pull/25591
* [b8d47a7b6f] - fix (Fedor Indutny) https://github.com/nodejs/node-v0.x-archive/pull/25739