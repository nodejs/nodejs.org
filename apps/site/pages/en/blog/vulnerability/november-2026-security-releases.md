---
date: 2026-11-11T00:00:00.000Z
category: vulnerability
title: Wednesday, November 11, 2026 Security Releases
slug: november-2026-security-releases
layout: blog-post
author: The Node.js Project
---

# Security releases available

Updates are now available for the 26.x, 24.x, 22.x Node.js release lines for the
following issues.

## Patched vulnerabilities

This security release includes the following dependency updates to address public vulnerabilities:

- llhttp on 22.x, 24.x, 26.x
- undici on 24.x, 26.x
- sqlite on 22.x, 24.x

### HTTP/2: remote abort, `CHECK_EQ(current_nghttp2_memory_, 0)` in `~Http2Session()` (CVE-2026-123863) - (high)

A reachable assertion in Node.js HTTP/2 session teardown lets any unauthenticated
client abort the server, over both TLS and cleartext. A client can arrange for an
Http2Stream that still holds nghttp2-allocated header buffers to outlive its
session: the stream is removed from the session's stream set but never detached,
so when `~Http2Session()` runs the memory accounting is nonzero and the
`CHECK_EQ(current_nghttp2_memory_, 0)` assertion fails, terminating the process.
The trigger needs only a default http2 server whose handler responds before the
request body has ended, which is typical. It is a variant of CVE-2024-27983 that
the earlier fix did not cover, because that fix only detached streams still
tracked in the session.

Impact:

- This vulnerability affects all users in active release lines: 24.x, 26.x

Thank you, to Chris Rohlf in collaboration with Claude and Anthropic Research
for reporting this vulnerability and thank you mcollina for fixing it.

### HTTPS: a zero-length TLS write re-enters `llhttp_execute()`, and the server copies its own heap into the request body (CVE-2026-123864) - (high)

A re-entrancy flaw in Node.js HTTPS lets an unauthenticated client read memory
belonging to other connections, including TLS private keys and
other users' requests. `TLSWrap::DoWrite()` calls `ClearOut()` directly when
asked to write zero bytes; if that write is issued from JavaScript running inside
the HTTP parser's `on_body` callback, `ClearOut()` decrypts the next TLS record
while the parser is still mid-body, re-entering `llhttp_execute()` and causing a
use-after-free and an out-of-bounds heap read. The server then copies that freed
or unrelated heap memory into the response for the request body. Triggering it
requires a handler that calls `res.flushHeaders()` before the request body ends
and later calls `res.end()` with a non-empty chunk, and reading the leaked memory
requires any ordinary route that echoes or stores a request body. Cleartext
`node:http` is not affected.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to Chris Rohlf in collaboration with Claude and Anthropic Research
for reporting this vulnerability and thank you mcollina for fixing it.

### HTTP/2 sessions never clean up if a protocol error is triggered during connection shutdown (CVE-2026-123865) - (high)

An unauthenticated HTTP/2 client can permanently leak Node.js server memory and
file descriptors. If a peer triggers a protocol error, for example an oversized
frame header, while the session is already shutting down, nghttp2 tears the
session down internally but Node.js never notices, leaving a dangling session:
the socket stays in `CLOSE_WAIT` and all of Node.js HTTP/2 state for that
connection is held in memory indefinitely, with no further cost to the attacker.
The attacker can start the shutdown remotely by sending `GOAWAY(NO_ERROR)`, so
it is reliable against default HTTP/2 servers. It is an incomplete-fix case of
CVE-2026-48937: that fix detected nghttp2 internal terminations by watching for
`GOAWAY` sent while not shutting down, but missed terminations that arrive while
the session is already shutting down.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to pimterry for reporting this vulnerability and thank you mcollina for fixing it.

### HTTP/2 stream teardown can send freed response memory to the peer (CVE-2026-123866) - (high)

A use-after-free in Node.js HTTP/2 stream teardown can leak response memory,
including the contents of other connections' response buffers, to a peer. When a
stream is torn down while a write is still backpressured, for example by a peer
`RST_STREAM` or by the server's own per-stream timeout destroying the stream, the
stream's response buffer is freed but a reference to it is still used, so freed
or unrelated heap memory is written to the socket instead of the intended
response. On Node.js 26.x and 24.x the teardown can be driven purely by a remote
peer once the window-size change from 26.9.0 and 24.22.0 is present, and on all
supported lines the same defect is reachable through an application-initiated
teardown such as a per-stream idle timeout.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to aidan02 for reporting this vulnerability and thank you mcollina for fixing it.

### Node.js is vulnerable to a remotely triggerable uncaught exception in TLS servers via deferred handshake callbacks (CVE-2026-126051) - (high)

A deferred-callback use-after-destroy in Node.js TLS server handshake handling
allows a remote, unauthenticated attacker to terminate the server process. When
a TLS server uses any of the `SNICallback`, `OCSPRequest`, `newSession`, or
`resumeSession` hooks, or `server.addContext()`, the corresponding OpenSSL
callbacks are deferred, and the deferred code does not handle the underlying
socket being destroyed between scheduling and execution. By sending a client
hello that reaches the vulnerable path (for example, no SNI together with an
OCSP request) followed by padding and a socket FIN, an attacker makes OpenSSL
deliver the client hello and the end-of-file in the same tick, so the socket is
destroyed before the deferred callback runs and the process raises an uncaught
exception instead of emitting an `'error'` event.

Impact:

- This vulnerability affects all users in active release lines: 24.x, 26.x

Thank you, to pimterry for reporting this vulnerability and for fixing it.

### TLS 1.2 renegotiation allows clients to change servername unilaterally to bypass client certificate authentication (CVE-2026-123872) - (high)

A client certificate authentication bypass in Node.js TLS lets a client change
the servername during TLS 1.2 renegotiation to reach endpoints it was not
authorized for. On a server that applies different client-certificate policies
per hostname, for example stricter admin-only client-cert auth on one host and
ordinary client-cert auth on another, a client that authenticates for a permitted
host can renegotiate the TLS 1.2 connection under a different servername and carry
its existing authentication to the protected host, bypassing the stricter policy.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to pimterry for reporting this vulnerability and for fixing it.

### HTTP/2: use-after-free of `Http2Stream` when a `respondWithFile()` stream is reset during a pending write (CVE-2026-123874) - (high)

A use-after-free in Node.js HTTP/2 lets an unauthenticated client corrupt server
memory, over both TLS and cleartext, when the server serves files with
`respondWithFile()` or `respondWithFD()`. A client can make the server free an
`Http2Stream` while a write request that points to it is still queued on the
socket; when that write completes, the code dereferences and makes a virtual call
through the freed object. The only precondition is that the application serves a
file with `stream.respondWithFile()` or `stream.respondWithFD()`, with default
settings otherwise.

Impact:

- This vulnerability affects all users in active release lines: 24.x, 26.x

Thank you, to Chris Rohlf in collaboration with Claude and Anthropic Research
for reporting this vulnerability and thank you mcollina for fixing it.

### Remote unauthenticated HTTP/2 heap-buffer-overflow in `session.altsvc()` with a long origin (CVE-2026-123828) - (medium)

A one-byte heap buffer overflow in Node.js HTTP/2 Alt-Svc handling lets a remote,
unauthenticated attacker corrupt process memory. When an application passes an
attacker-controlled value such as a request's `:authority` header to
`Http2Session.altsvc()`, the AltSvc implementation in `src/node_http2.cc`
allocates a buffer sized to the origin length and then writes it with a null
terminator, placing one byte past the end of the allocation. A single request
carrying a long but syntactically valid `:authority` triggers the out-of-bounds
write, which aborts the process and serves as a remote heap-corruption primitive.

Impact:

- This vulnerability affects all users in active release lines: 24.x, 26.x

Thank you, to zonduu for reporting this vulnerability and thank you mcollina for fixing it.

### CA-only SNI client-CA overrides fail open to the default CA, bypassing per-host mTLS authorization (CVE-2026-123867) - (medium)

A per-host mutual-TLS authorization bypass in Node.js lets a client authorized
for the default hostname reach a protected hostname it is not authorized for.
When a TLS server assigns a hostname a different client-certificate CA with
`server.addContext(host, { ca: protectedCA })` but no server certificate in that
SNI context, the per-host client CA is never installed and the handshake falls
back to the default client CA. In `src/crypto/crypto_tls.cc`, `CertCbDone`
installs the SNI context's CA only when `setSniContext` succeeds, but
`setSniContext` returns `false` for a context with no server certificate, so a
CA-only SNI context silently keeps the default CA. A client holding a certificate
trusted by the default CA, but not the protected CA, can therefore complete mTLS
to the protected hostname and read its response even with `requestCert` and
`rejectUnauthorized` enabled, while a client certified by the protected CA is
rejected.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to aur0r4_glyph for reporting this vulnerability and thank you mcollina for fixing it.

### HTTP/2 inbound data queued on an undrained stream is charged to no session budget, so `maxSessionMemory` neither bounds it nor refuses new streams (CVE-2026-123868) - (medium)

An unauthenticated HTTP/2 client can exhaust Node.js server memory because
inbound data queued on an undrained stream is charged to no session budget. Each
inbound data frame creates one JavaScript Buffer view in the receiving stream's
readable queue, but nothing charges that queue to `current_session_memory_`: the
socket read buffer is accounted only during parsing and released immediately, so
whatever stays queued is accounted to nothing. A peer that fills a stream's
receive window with one-byte data frames pays about 10 wire bytes per frame
while the server retains about 114 bytes per frame, so a single stream on one
connection can retain hundreds of megabytes from tens of megabytes sent.
`maxSessionMemory` neither bounds the growth nor refuses new streams, because
`Http2Session::CanAddStream` gates admission on the same counter that never sees
the queue.

Impact:

- This vulnerability affects all users in active release lines: 24.x, 26.x

Thank you, to jiri1234 for reporting this vulnerability and thank you mcollina for fixing it.

### Proxy credentials disclosed in `ERR_PROXY_INVALID_CONFIG` error messages (CVE-2026-123871) - (medium)

Node.js discloses proxy credentials in `ERR_PROXY_INVALID_CONFIG` error messages.
CVE-2026-48615 established that a proxy credential must not appear in a Node.js
error message and redacted the username and password from `ProxyConfig.href`,
but that fix missed four error paths in the same subsystem, one of them inside
the same constructor, which interpolate the raw proxy URL, credentials included,
into an `ERR_PROXY_INVALID_CONFIG` message. The proxy URL comes from the
environment, but the defect is the sink: a secret that Node.js redacts everywhere
else is emitted verbatim into a much wider audience than the process environment,
such as `stderr`, container logs, log aggregation, and crash reporting services.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to p-v-p for reporting this vulnerability and thank you mcollina for fixing it.

### Certificate validation bypass in Node.js `https.Agent` via cross-policy TLS session reuse (CVE-2026-123877) - (medium)

A certificate validation bypass in Node.js `https.Agent` lets a cached TLS session
authenticated under one CA policy be reused by a later request with a stricter policy.
`https.Agent.prototype.getName()` assigns the same `Agent` and session-cache key
to a request that omits ca and one that explicitly supplies `ca: []`, because an
omitted value appends nothing to the key while an empty array stringifies to an
empty string. The two policies differ: omitting ca uses the default trust store,
while supplying ca replaces it. Since they share a key, a TLS session authenticated
under the broader default policy is handed to a new connection made under the later
`ca: []` policy, and TLS 1.3 session resumption carries the earlier authentication
forward, so the second request reports `authorized === true` and transmits
confidential data to a server its own CA policy would reject on a fresh connection.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to aegis1337 and mickeyjoe for reporting this vulnerability and
thank you mcollina for fixing it.

### HTTP/2: cancelling one `respondWithFile()` download crashes the server (NULL dereference in `StreamPipe`) (CVE-2026-123875) - (medium)

A NULL pointer dereference in Node.js HTTP/2 lets an unauthenticated client crash
the server, over both TLS and cleartext, by cancelling file downloads. When the
server serves a file with `stream.respondWithFile()` or `stream.respondWithFD()`
and the client cancels the request, a `StreamPipe` used for the transfer is torn
down in an order that leaves a `NULL` pointer which is then dereferenced, aborting
the process. No crafted frames are needed, and a handful of cancelled requests
against a default file-serving handler is enough.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to Chris Rohlf in collaboration with Claude and Anthropic Research for
reporting this vulnerability and thank you mcollina for fixing it.

### Permission Model Bypass in recursive fs.watch Leaks Names of Denied Descendants (CVE-2026-123829) - (low)

A Permission Model bypass in Node.js recursive file watching discloses the names
of files and directories the process is not permitted to read. On macOS and
Windows, `fs.watch()` and `fs.promises.watch()` in recursive mode are backed by
the native libuv watcher: `FSEventWrap::Start` checks `kFileSystemRead` only once,
on the watched root, and `FSEventWrap::OnEvent` then forwards every filename
libuv reports (relative paths at any depth) to the JavaScript callback without
checking that each path is covered by the read grant. Code running under
`--permission` with an exact read grant on a directory can therefore learn names
such as sub/secret.txt even though readdir on that subdirectory is denied. The
flaw exposes names and timing metadata, not file contents, and requires macOS or
Windows plus files created under the watched directory by another actor.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to Trail of Bits (OpenAI) for reporting this vulnerability and thank
you RafaelGSS for fixing it.

### zlib: a pending `params()` plus `destroy()` throws an uncatchable `ERR_INTERNAL_ASSERTION` (CVE-2026-123862) - (low)

An uncatchable exception in the Node.js zlib streaming API lets a peer crash a
process by disconnecting while data is being compressed. `zlib.params()` queues
a flush and completes its work in that write's callback; if the stream is
destroyed first, as `pipeline()` does when the peer goes away, `Writable` still
invokes the callback with an error, but the callback ignores its arguments and
asserts that the native handle still exists. The handle is gone, so an
`ERR_INTERNAL_ASSERTION` is thrown from inside stream internals and bypasses the
stream's error event, the `params()` callback, and the `pipeline()` callback,
terminating the process. An application is affected only if it calls
`deflate.params()` while streaming to a peer, which is uncommon.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to Chris Rohlf in collaboration with Claude and Anthropic Research
for reporting this vulnerability and thank you mcollina for fixing it.

### Permission Model filesystem over-grant via wildcard radix lookup (CVE-2026-106071) - (low)

A Node.js Permission Model filesystem over-grant lets a wildcard `--allow-fs-read`
or `--allow-fs-write` rule match paths it should not. When the requested path is
shorter than the prefix of a wildcard grant, the radix tree lookup stops comparing
early and treats the path as a match, so for example `--allow-fs-read=/etc/passwd.*`
also allows reading `/etc/passwd`. It requires the wildcard grant to sit directly
under the root of the permission tree, such as when it is the only grant for that scope.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to malikhamzaiqbal for reporting this vulnerability and thank you jasnell for fixing it.

## Downloads and release details

- [Node.js v22.23.5](/blog/release/v22.23.5/)
- [Node.js v24.22.3](/blog/release/v24.22.3/)
- [Node.js v26.13.1](/blog/release/v26.13.1/)

---

The Node.js project will release new versions of the 26.x, 24.x, 22.x
releases lines on or shortly after, Wednesday, November 11, 2026 in order to address:

The highest severity issue fixed in this release is HIGH.

## Impact

The highest severity issue fixed in the 26.x release line is HIGH.
The highest severity issue fixed in the 24.x release line is HIGH.
The highest severity issue fixed in the 22.x release line is HIGH.

It's important to note that End-of-Life versions are always affected when a security release occurs.
To ensure your system's security, please use an up-to-date version as outlined in our
[Release Schedule](https://github.com/nodejs/release#release-schedule).

## Release timing

Releases will be available on, or shortly after, Wednesday, November 11, 2026.

## Contact and future updates

The current Node.js security policy can be found at <https://nodejs.org/en/security/>.
Please follow the process outlined in <https://github.com/nodejs/node/blob/master/SECURITY.md> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the nodejs GitHub organization.
