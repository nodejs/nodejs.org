---
date: 2026-07-29T00:00:00.000Z
category: vulnerability
title: Wednesday, July 29, 2026 Security Releases
slug: july-2026-security-releases
layout: blog-post
author: The Node.js Project
---

## Security releases available

Updates are now available for the 26.x, 24.x, 22.x Node.js release lines for the
following issues.

This security release includes the following dependency updates to address public vulnerabilities:

- undici (8.9.0, 7.29.0, 6.28.0) on 26.x, 24.x, 22.x
- llhttp (9.4.3) on 26.x, 24.x, 22.x

## HTTP/2 retained headers can bypass `maxSessionMemory` limits (CVE-2026-56846) - (High)

A flaw in Node.js HTTP/2 handling can let retained header blocks evade `maxSessionMemory`
limits and cause remote memory exhaustion.

Impact:

- This vulnerability affects all users in active release lines: 24.x, 22.x

Thank you, to leduckhuong for reporting this vulnerability and thank you mcollina for fixing it.

## HTTP/2 re-entrant send can cause heap-use-after-free (CVE-2026-56848) - (High)

A flaw in Node.js HTTP/2 handling allows `nghttp2_session_mem_send()` to be called re-entrantly while `nghttp2_session_mem_recv()` is executing, resulting in a heap-use-after-free.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x, 22.x

Thank you, to hahahkim for reporting this vulnerability and thank you mcollina for fixing it.

## Permission Model path matching can over-grant filesystem access (CVE-2026-58043) - (High)

A flaw in Node.js Permission Model enforcement can over-grant filesystem access across radix-tree prefix boundaries.

Under `--permission`, an attacker who is granted access to one path can abuse
radix-tree prefix boundary handling to read from or write to paths outside the
intended filesystem allowlist.

Impact:

- This vulnerability affects all users in active release lines: 22.x, 24.x, 26.x

Thank you, to sy2n0 for reporting this vulnerability and thank you RafaelGSS for fixing it.

## HTTPS Agent can reuse mTLS identities across PFX certificates (CVE-2026-56850) - (Medium)

A flaw in Node.js HTTPS Agent connection reuse can cause PFX object-array key collisions, allowing mutual TLS (mTLS) client identities to be reused across requests configured with different client certificates.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x, 22.x

Thank you, to yottt for reporting this vulnerability and thank you RafaelGSS for fixing it.

## HTTPS Agent session reuse can skip hostname verification (CVE-2026-58040) - (Medium)

An incomplete fix for CVE-2026-48934 has been identified in Node.js. HTTPS Agent
TLS session reuse can skip hostname verification across identity policies.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x, 22.x

Thank you, to vnyuh for reporting this vulnerability and thank you mcollina for fixing it.

## `node:sqlite` SQLTagStore iterator replay can re-execute writes (CVE-2026-58041) - (Medium)

A flaw in `node:sqlite` allows a stale `StatementSyncIterator` created through
`DatabaseSync#createTagStore()` to continue executing a cached prepared statement
after it has been reset and rebound with new parameters. `SQLTagStore` resets
cached statements using `sqlite3_reset()` directly, bypassing the iterator
invalidation mechanism introduced for `StatementSync` in recent releases.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x

Thank you, to cantina-security for reporting this vulnerability and thank you mcollina for fixing it.

## `dns.resolveAny()` can abort on DNS responses with many A records (CVE-2026-58042) - (Medium)

A flaw in Node.js can cause `dns.resolveAny()` to abort the process when a DNS
response contains more than 256 A records.

Repeated triggering of this condition can lead to denial of service.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x, 22.x

Thank you, to cantina-security for reporting this vulnerability and thank you RafaelGSS for fixing it.

## `node:zlib` sync APIs can crash on spoofed `TypedArray` length (CVE-2026-58045) - (Medium)

A flaw in Node.js allows a spoofed `TypedArray` `byteLength` to trigger a reachable assertion in the synchronous `node:zlib` APIs, causing the process to crash.

Repeated exploitation of this condition can result in a denial of service.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x, 22.x

Thank you, to byvini for reporting this vulnerability and thank you RafaelGSS for fixing it.

## Permission Model allows trace events to write outside the allowlist (CVE-2026-56847) - (Low)

A flaw in Node.js Permission Model enforcement allows
`trace_events.createTracing().enable()` to write trace logs outside
`--allow-fs-write` paths.

This can lead to confidentiality impact or bypass of the intended security boundary under affected configurations.

Impact:

- This vulnerability affects all users of the Permission Model in active release lines: 26.x, 24.x, 22.x

Thank you, to 0xoroot for reporting this vulnerability and thank you RafaelGSS for fixing it.

## Permission Model allows process reports to write outside the allowlist (CVE-2026-58039) - (Low)

A flaw in Node.js Permission Model enforcement allows `process.report` to write
and overwrite files outside `--allow-fs-write` paths.

This can lead to confidentiality impact or bypass of the intended security boundary under affected configurations.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x, 22.x

Thank you, to sinan-polat for reporting this vulnerability and thank you RafaelGSS for fixing it.

## HTTP parser header truncation can enable request smuggling (CVE-2026-58044) - (Low)

A flaw in Node.js HTTP client can cause a request desynchronization for Node.js-based forwarding proxies that rebuild outbound headers from the visible `IncomingMessage` headers while piping the original body to a reused backend connection.

Node.js can omit headers beyond `maxHeadersCount` / `maxHeaderPairs` from `req.headers`, `req.rawHeaders`, and `req.headersDistinct`, while still using those omitted headers internally for HTTP message framing. In particular, `Content-Length` can be hidden from userland while the request body is still delivered.

Impact:

- This vulnerability affects all users in active release lines: 26.x, 24.x, 22.x

Thank you, to yushengchen for reporting this vulnerability and thank you mcollina for fixing it.

## Downloads and release details

- [Node.js v22.23.2](/blog/release/v22.23.2/)
- [Node.js v24.18.1](/blog/release/v24.18.1/)
- [Node.js v26.5.1](/blog/release/v26.5.1/)

## _(Update 28-July-2026)_ Security releases postponed

The Node.js project is delaying the planned security releases until Wednesday,
July 29, 2026 due to infrastructure issues.

## _(Update 27-July-2026)_ Security releases postponed

The Node.js project is delaying the planned security releases until Tuesday,
July 28, 2026 due to the need for additional testing and validation.

# Summary

The Node.js project will release new versions of the 26.x, 24.x, 22.x
releases lines on or shortly after, Tuesday, July 28, 2026 in order to address:

The highest severity issue fixed in this release is HIGH.

## Impact

The highest severity issue fixed in the 26.x release line is HIGH.
The highest severity issue fixed in the 24.x release line is HIGH.
The highest severity issue fixed in the 22.x release line is HIGH.

It's important to note that End-of-Life versions are always affected when a security release occurs.
To ensure your system's security, please use an up-to-date version as outlined in our
[Release Schedule](https://github.com/nodejs/release#release-schedule).

## Release timing

Releases will be available on, or shortly after, Tuesday, July 28, 2026.

## Contact and future updates

The current Node.js security policy can be found at <https://nodejs.org/en/security/>.
Please follow the process outlined in <https://github.com/nodejs/node/blob/master/SECURITY.md> if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at <https://groups.google.com/forum/#!forum/nodejs-sec> to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the nodejs GitHub organization.
