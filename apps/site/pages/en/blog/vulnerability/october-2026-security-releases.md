---
date: 2026-10-21T22:00:00.000Z
category: vulnerability
title: Wednesday, October 21, 2026 Security Releases
slug: october-2026-security-releases
layout: blog-post
author: The Node.js Project
---

## Security releases available

Updates are now available for the 26.x, 24.x, 22.x Node.js release lines for the
following issues.

This security release includes the following dependency updates to address public vulnerabilities:

- c-ares on 26.x, 24.x, 22.x
- ca-cert (eMudhra Intermediate CA Compromise) on 26.x, 24.x, 22.x
- OpenSSL on 24.x, 22.x
- SQLite on 22.x
- Undici on 26.x, 24.x, 22.x

## dns.resolve truncates names containing NUL char (CVE-2026-105482) - (high)

A flaw in Node.js DNS resolution allows hostnames containing a NUL byte to be silently truncated by the `dns.resolve*()` functions and `dns.reverse()`. This is an incomplete fix of CVE-2026-48930, which only covered `dns.lookup()` and the `net`/`tls` host options.

Because the name is passed to c-ares as a C string, resolving `attacker.example\0.trusted.example` queries `attacker.example` and returns its records without any error. Applications that validate a hostname, for example against a domain allowlist, and then resolve it with `dns.resolve*()` can act on records for a different name than the one they validated.

This vulnerability affects Node.js **26.x**, **24.x**, and **22.x**.

Thank you, to Hasan Flayyih Abdullah for reporting this vulnerability and thank you jasnell for fixing it.

## TLS certificate hostname bypass when the IP is written fullwidth digits (CVE-2026-105483) - (high)

A flaw in Node.js TLS hostname verification allows a certificate without a matching IP address SAN to authenticate a connection to an IPv4 address when the host is written with non-ASCII characters, such as fullwidth digits (`１２７.0.0.1`).

`tls.checkServerIdentity()` did not recognize such hosts as IP addresses, even though they normalize and resolve to a regular IPv4 address, and matched them against the certificate DNS names and Common Name instead. A certificate containing `DNS:127.0.0.1` or `DNS:*.0.0.1` could therefore be accepted for an IP endpoint it was not issued for. This is a regression introduced after the fix for CVE-2026-48618.

This vulnerability affects Node.js **26.x** and **24.x**.

Thank you, to Hasan Flayyih Abdullah for reporting this vulnerability and thank you jasnell for fixing it.

## TLS certificate hostname bypass when the host loosely resolves to an IP address (CVE-2026-106069) - (high)

A flaw in Node.js TLS hostname verification can cause a server certificate to be validated against a different IP address than the one the client connected to, when the host is a non-canonical IPv4 literal with a leading zero, such as `0127.0.0.1`.

`tls.checkServerIdentity()` normalizes the host following the WHATWG URL rules, which read a leading-zero octet as octal (`0127.0.0.1` becomes `87.0.0.1`), while the connection is made through the operating system resolver, which on some platforms such as macOS reads it as decimal (`127.0.0.1`). A server at the connected address can then be authenticated with a certificate issued for another IP address.

This vulnerability affects Node.js **26.x**, **24.x**, and **22.x**.

Thank you, to anagnorisis2peripeteia for reporting this vulnerability and thank you mcollina for fixing it.

## Node.js Brotli decoder out-of-bounds write permits remote code execution (CVE-2026-111497) - (high)

A flaw in the Brotli decoder bundled with Node.js allows malformed compressed input to write past the end of an internal decoder buffer.

An invalid block switch was reported as a temporary need for more input instead of a permanent format error, so the streaming decoder kept appending input bytes to an eight-byte internal buffer. An attacker who can supply Brotli data that an application decompresses with `node:zlib` can corrupt process memory, which can lead to a crash, disclosure of process memory, or remote code execution.

This vulnerability affects Node.js **26.x**, **24.x**, and **22.x**.

Thank you, to OpenAI Codex Security - Khai Tran and Sylvie Mayer for reporting this vulnerability and thank you mcollina and aduh95 for fixing it.

## Keep-alive socket process a response that was written before the request was sent (CVE-2026-105481) - (medium)

A flaw in Node.js HTTP Agent connection reuse can cause a client to accept as valid a response that was sent before the client has sent the request. This is an incomplete fix of CVE-2026-48931.

The guard that destroys idle keep-alive sockets when unexpected data arrives only runs when the event loop polls for I/O. If an unsolicited response has already reached the socket but has not been read yet when the socket is handed to a new request, for example because the event loop was busy with synchronous work, the guard is removed without seeing it and the data is parsed as the response to the new request.

This vulnerability affects Node.js **26.x**, **24.x**, and **22.x**.

Thank you, to Hasan Flayyih Abdullah for reporting this vulnerability and thank you jasnell for fixing it.

## Improper certificate validation for non-canonical IPv4 hostnames allows DNS SANs to authenticate IP endpoints (CVE-2026-106072) - (medium)

A flaw in Node.js TLS hostname verification allows a certificate with only a DNS SAN to authenticate an IP endpoint when the client connects using a non-canonical IPv4 spelling, such as `0177.0.0.1`, `0x7f.0.0.1`, `2130706433` or `127.1`.

`tls.checkServerIdentity()` did not classify these hosts as IP addresses, but normalized them to their canonical form and matched the result against the certificate DNS names. A certificate containing `DNS:127.0.0.1` and no `IP Address:127.0.0.1` SAN was therefore accepted, while the same certificate is correctly rejected for `127.0.0.1`. Exploitation requires a certificate with a numeric DNS SAN issued by a CA trusted by the client, and a platform resolver that accepts these spellings, such as glibc.

This vulnerability affects Node.js **26.x**, **24.x**, and **22.x**.

Thank you, to br41ny for reporting this vulnerability and thank you mcollina for fixing it.

## crypto.randomUUID() and randomInt() entropy caches are saved into user-land startup snapshots and SEAs, so every process repeats the same values (CVE-2026-106074) - (medium)

A flaw in Node.js `crypto` causes the internal entropy caches used by `crypto.randomUUID()`, `crypto.randomUUIDv7()`, and `crypto.randomInt()` to be saved into user-land startup snapshots (`--build-snapshot`) and single executable applications built with `useSnapshot`.

If any of these functions, or an API that relies on them such as `URL.createObjectURL()`, is called while the snapshot is built, every process started from that snapshot returns the same values until the cache is refilled: up to 127 UUIDs and about 1,000 `randomInt()` values. Identifiers expected to be unique can collide across processes, and values issued by one process can be predicted by observing another.

This vulnerability affects Node.js **26.x**, **24.x**, and **22.x**.

Thank you, to gesposito for reporting this vulnerability and thank you panva for fixing it.

## Node.js ZipFile returns attacker-controlled prefix bytes after failed ZIP header validation (CVE-2026-106070) - (low)

A flaw in the Node.js `zlib.ZipFile` API can cause it to return bytes that do not belong to the requested entry after the local and central header validation fails.

When `zipEntry.modified` is read on an archive whose local header does not match its central directory, either directly or while compacting the archive, the validation error is caught but the parsed local header is left cached without a content offset. A later content read then returns attacker-controlled bytes from the start of the file instead of rejecting the archive, and CRC-32 verification still passes because the attacker controls the central directory CRC. A Node.js-based scanner can therefore approve different content from what another ZIP implementation extracts from the same archive.

This vulnerability affects Node.js **26.x**.

Thank you, to startimeash for reporting this vulnerability and thank you mcollina for fixing it.

## Permission Model filesystem over-grant via wildcard radix lookup (CVE-2026-106071) - (low)

A flaw in Node.js Permission Model filesystem enforcement can grant access to paths that do not match a wildcard `--allow-fs-read` or `--allow-fs-write` rule.

When the requested path is shorter than the prefix of a wildcard grant, the radix tree lookup stops comparing early and treats the path as a match. For example, `--allow-fs-read=/etc/passwd.*` also allows reading `/etc/passwd`. This requires the wildcard grant to sit directly under the root of the permission tree, for example when it is the only grant for that scope. This is a different root cause from CVE-2026-58043.

This vulnerability affects Node.js **26.x**.

Thank you, to malikhamzaiqbal for reporting this vulnerability and thank you jasnell for fixing it.

## Permission Model bypass with fs.realpathSync (CVE-2026-106073) - (low)

A flaw in Node.js Permission Model filesystem enforcement leaves `fs.realpathSync()` without the required read permission checks. This is an incomplete fix of CVE-2026-21715, which only covered `fs.realpathSync.native()`.

As a result, code running under `--permission` with restricted `--allow-fs-read` can still use `fs.realpathSync()` to check file existence, resolve symlink targets, and enumerate filesystem paths outside of permitted directories.

This vulnerability affects Node.js **26.x**, **24.x**, and **22.x**.

Thank you, to 0xoroot for reporting this vulnerability and thank you RafaelGSS for fixing it.

## Downloads and release details

- [Node.js v22.23.4](/blog/release/v22.23.4/)
- [Node.js v24.22.1](/blog/release/v24.22.1/)
- [Node.js v26.12.1](/blog/release/v26.12.1/)

# Summary

The Node.js project will release new versions of the 26.x, 24.x, 22.x
releases lines on or shortly after, Wednesday, October 21, 2026 in order to address
security vulnerabilities.

The highest severity issue fixed in this release is HIGH.

## Impact

- The highest severity issue fixed in the 26.x release line is HIGH.
- The highest severity issue fixed in the 24.x release line is HIGH.
- The highest severity issue fixed in the 22.x release line is HIGH.

It's important to note that End-of-Life versions are always affected when a security release occurs.
To ensure your system's security, please use an up-to-date version as outlined in our
[Release Schedule](https://github.com/nodejs/release#release-schedule).

## Release timing

Releases will be available on, or shortly after, Wednesday, October 21, 2026.

## Contact and future updates

The current Node.js security policy can be found at <https://nodejs.org/en/security/>.
Please follow the process outlined in <https://github.com/nodejs/node/blob/master/SECURITY.md> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the nodejs GitHub organization.
