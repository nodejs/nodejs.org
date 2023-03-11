---
date: 2018-11-28T00:55:46.667Z
category: vulnerability
title: November 2018 Security Releases
slug: november-2018-security-releases
layout: blog-post.hbs
author: Rod Vagg
---

_(Update 27-November-2018)_ **Security releases available**

## Summary

Updates are now available for all active Node.js release lines. These include fixes for the vulnerabilities identified in the initial announcement (below). They also include upgrades of Node.js 6 and 8 to OpenSSL 1.0.2q, and upgrades of Node.js 10 and 11 to OpenSSL 1.1.0j.

We recommend that all Node.js users upgrade to a version listed below as soon as possible.

## Downloads & release details

Downloads are available for the following versions. Details of code changes can also be found on each release page.

* [Node.js 11.3.0 (Current)](https://nodejs.org/en/blog/release/v11.3.0)
* [Node.js 10.14.0 (LTS "Dubnium")](https://nodejs.org/en/blog/release/v10.14.0)
* [Node.js 8.14.0 (LTS "Carbon")](https://nodejs.org/en/blog/release/v8.14.0)
* [Node.js 6.15.0 (LTS "Boron")](https://nodejs.org/en/blog/release/v6.15.0)

***Note (3-December-2018):*** _Node.js [6.15.1 (LTS "Boron")](/en/blog/release/v6.15.1) was released to fix a misapplied backport for one of the fixes listed below. See the [release page](/en/blog/release/v6.15.1) for more information._

## Debugger port 5858 listens on any interface by default (CVE-2018-12120)

_Categorization: Unprotected Primary Channel ([CWE-419](https://cwe.mitre.org/data/definitions/419.html))_

All versions of Node.js 6 are vulnerable and the severity is HIGH. When the debugger is enabled with `node --debug` or `node debug`, it listens to port 5858 on all interfaces by default. This may allow remote computers to attach to the debug port and evaluate arbitrary JavaScript. The default interface is now localhost. It has always been possible to start the debugger on a specific interface, such as `node --debug=localhost`. The debugger was removed in Node.js 8 and replaced with the inspector, so no versions from 8 and later are vulnerable.

Reported and fixed by [Ben Noordhuis](https://github.com/bnoordhuis).

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are NOT** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are NOT** vulnerable
* All versions of Node.js 11 (Current) **are NOT** vulnerable

## Denial of Service with large HTTP headers (CVE-2018-12121)

_Categorization: Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html))_

All versions of 6 and later are vulnerable and the severity is HIGH. By using a combination of many requests with maximum sized headers (almost 80 KB per connection), and carefully timed completion of the headers, it is possible to cause the HTTP server to abort from heap allocation failure. Attack potential is mitigated by the use of a load balancer or other proxy layer.

The total size of HTTP headers received by Node.js now must not exceed 8192 bytes.

Reported by [Trevor Norris](https://github.com/trevnorris), fixed by [Matteo Collina](https://twitter.com/matteocollina).

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are** vulnerable
* All versions of Node.js 11 (Current) **are** vulnerable

## "Slowloris" HTTP Denial of Service (CVE-2018-12122)

_Categorization: Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html))_

All versions of Node.js 6 and later are vulnerable and the severity is LOW. An attacker can cause a Denial of Service (DoS) by sending headers very slowly keeping HTTP or HTTPS connections and associated resources alive for a long period of time. Attack potential is mitigated by the use of a load balancer or other proxy layer.

A timeout of 40 seconds now applies to servers receiving HTTP headers. This value can be adjusted with `server.headersTimeout`. Where headers are not completely received within this period, the socket is destroyed on the next received chunk. In conjunction with `server.setTimeout()`, this aids in protecting against excessive resource retention and possible Denial of Service.

Reported by Jan Maybach ([liebdich.com](https://liebdich.com)), fixed by [Matteo Collina](https://twitter.com/matteocollina).

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are** vulnerable
* All versions of Node.js 11 (Current) **are** vulnerable

## Hostname spoofing in URL parser for javascript protocol (CVE-2018-12123)

_Categorization: Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html))_

All versions of Node.js 6 and later are vulnerable and the severity is LOW. If a Node.js application is using `url.parse()` to determine the URL hostname, that hostname can be spoofed by using a mixed case "javascript:" (e.g. "javAscript:") protocol (other protocols are not affected). If security decisions are made about the URL based on the hostname, they may be incorrect.

Reported by [Martin Bajanik](https://twitter.com/_bayotop) ([Kentico](https://kenticocloud.com/)), fixed by [Matteo Collina](https://twitter.com/matteocollina).

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are** vulnerable
* All versions of Node.js 11 (Current) **are** vulnerable

## HTTP request splitting (CVE-2018-12116)

_Categorization: Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html))_

Node.js 6 and 8 are vulnerable and the severity is MEDIUM. If Node.js can be convinced to use unsanitized user-provided Unicode data for the `path` option of an HTTP request, then data can be provided which will trigger a second, unexpected, and user-defined HTTP request to made to the same server.

Reported as security concern for Node.js 6 and 8 by [Arkadiy Tetelman](https://twitter.com/arkadiyt) ([Lob](https://lob.com)), fixed by backporting a change by [Benno Fünfstück](https://github.com/bennofs) applied to Node.js 10 and later.

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are NOT** vulnerable
* All versions of Node.js 11 (Current) **are NOT** vulnerable

## OpenSSL Timing vulnerability in ECDSA signature generation (CVE-2018-0735)

_Severity: LOW_

The OpenSSL ECDSA signature algorithm has been shown to be vulnerable to a timing side-channel attack. An attacker could use variations in the signing algorithm to recover the private key.

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are NOT** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are NOT** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are** vulnerable
* All versions of Node.js 11 (Current) **are** vulnerable

## OpenSSL Timing vulnerability in DSA signature generation (CVE-2018-0734)

_Severity: LOW_

The OpenSSL DSA signature algorithm has been shown to be vulnerable to a timing side-channel attack. An attacker could use variations in the signing algorithm to recover the private key.

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") **are** vulnerable
* All versions of Node.js 11 (Current) **are** vulnerable

## OpenSSL Microarchitecture timing vulnerability in ECC scalar multiplication (CVE-2018-5407)

_Severity: LOW_

OpenSSL ECC scalar multiplication, used in e.g. ECDSA and ECDH, has been shown to be vulnerable to a microarchitecture timing side-channel attack. An attacker with sufficient access to mount local timing attacks during ECDSA signature generation could recover the private key.

**Impact:**

* All versions of Node.js 6 (LTS "Boron") **are** vulnerable
* All versions of Node.js 8 (LTS "Carbon") **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") up to 10.8.0 **are** vulnerable
* All versions of Node.js 10 (LTS "Dubnium") from 10.9.0 **are NOT** vulnerable
* All versions of Node.js 11 (Current) **are NOT** vulnerable

## Acknowledgements

Matteo Collina for a significant amount of work fixing vulnerabilities.

Sam Roberts for the OpenSSL upgrades, other code contributions and assisting in the preparion of these releases.

Ben Noordhuis, Fedor Indutny and Benno Fünfstück for code contributions.

Trevor Norris, Jan Maybach, Martin Bajanik, Arkadiy Tetelman for reporting vulnerabilities via the appropriate channels (see below).

***Original post is included below***

## Summary

Node.js will release new versions of all supported release lines on, or shortly after, November 27th, 2018 UTC. These releases will incorporate a number of security fixes specific to Node.js, as well as the updates to OpenSSL that were released today, November 20th, 2018.

OpenSSL [1.0.2q](https://www.openssl.org/news/openssl-1.0.2-notes.html) and [1.1.0j](https://www.openssl.org/news/openssl-1.1.0-notes.html) include fixes for previously disclosed low-severity timing vulnerabilities. See the [OpenSSL release announcement](https://mta.openssl.org/pipermail/openssl-announce/2018-November/000138.html).

## Impact

Releases for all actively supported release lines will be made available to fix the following vulnerabilities.

All versions of **Node.js 6 (LTS "Boron")** are vulnerable to:

* 2 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerabilities
* 2 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerabilities
* 1 Unprotected Primary Channel ([CWE-419](https://cwe.mitre.org/data/definitions/419.html)) vulnerability

All versions of **Node.js 8 (LTS "Carbon")** are vulnerable to:

* 2 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerabilities
* 2 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerabilities

All versions of **Node.js 10 (LTS "Dubnium")** are vulnerable to:

* 2 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerabilities
* 1 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerability

All versions of **Node.js 11 (Current)** are vulnerable to:

* 2 Uncontrolled Resource Consumption / Denial of Service ([CWE-400](https://cwe.mitre.org/data/definitions/400.html)) vulnerabilities
* 1 Misinterpretation of Input ([CWE-115](https://cwe.mitre.org/data/definitions/115.html)) vulnerability

## Release timing

Releases will be available at, or shortly after, the 27th of November, 2018 UTC, along with disclosure of the details for the flaws addressed in each release in order to allow for complete impact assessment by users.

## Contact and future updates

The current Node.js security policy can be found at https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security.

Please contact security@nodejs.org if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at https://groups.google.com/forum/#!forum/nodejs-sec to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the [nodejs GitHub organization](https://github.com/nodejs/).
