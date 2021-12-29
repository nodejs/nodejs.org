---
date: 2021-10-12T16:00:00.000Z
category: vulnerability
title: October 12th 2021 Security Releases
slug: oct-2021-security-releases
layout: blog-post.hbs
author: Matteo Collina
---

## _(Update 12-Oct-2021)_ Security releases available
Updates are now available for the v16.x, v14.x, and v12.x Node.js release lines for the
following issues.

### HTTP Request Smuggling due to spaced in headers (Medium)(CVE-2021-22959)

The http parser accepts requests with a space (SP) right after the header name before the colon. This can lead to HTTP Request Smuggling (HRS).
More details will be available at [CVE-2021-22959](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-22959) after publication.

The fix for this is included in llhttp v2.1.4 and v6.0.6.

Thanks to Mattias Grenfeldt (https://grenfeldt.dev/) and Asta Olofsson for reporting this vulnerability.

Impacts:

* All versions of the 16.x, 14.x, and 12.x releases lines.

### HTTP Request Smuggling when parsing the body (Medium)(CVE-2021-22960)

The parse ignores chunk extensions when parsing the body of chunked requests. This leads to HTTP Request Smuggling (HRS) under certain conditions.
More details will be available at [CVE-2021-22960](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-22960) after publication.

THe fix for this is included in llhttp v2.1.4 and v6.0.6.

Thanks to Mattias Grenfeldt (https://grenfeldt.dev/) and Asta Olofsson for reporting this vulnerability.

Impacts:

* All versions of the 16.x, 14.x, and 12.x releases lines.

## Downloads and release details

* [Node.js v12.22.7 (LTS)](https://nodejs.org/en/blog/release/v12.22.7/)
* [Node.js v14.18.1 (LTS)](https://nodejs.org/en/blog/release/v14.18.1/)
* [Node.js v16.11.1 (Current)](https://nodejs.org/en/blog/release/v16.11.1/)

---------------

# Summary

The Node.js project will release new versions of the 12.x, 14.x, and 16.x releases lines on or shortly after Tuesday

October 12th, 2021 in order to address:

* Two medium severity issues

## Impact

The 16.x release line of Node.js is vulnerable to two medium severity issues.

The 14.x release line of Node.js is vulnerable to two medium severity issues.

The 12.x release line of Node.js is vulnerable to two medium severity issues.

## Release timing

Releases will be available at, or shortly after, Tuesday, October 12th, 2021.

## Contact and future updates

The current Node.js security policy can be found at https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security. Please follow the process outlined in https://github.com/nodejs/node/blob/master/SECURITY.md if you wish to report a vulnerability in Node.js.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at https://groups.google.com/forum/#!forum/nodejs-sec to stay up to date on security vulnerabilities and security-related releases of Node.js and the projects maintained in the nodejs GitHub organization.
