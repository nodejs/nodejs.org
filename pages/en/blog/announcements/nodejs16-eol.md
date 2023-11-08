---
date: '2022-06-08T16:00:00.000Z'
category: announcements
title: Bringing forward the End-of-Life Date for Node.js 16
layout: blog-post.hbs
author: Richard Lau
---

# Changing the End-of-Life Date for Node.js 16 to September 11th, 2023

## Summary

We are moving the End-of-Life date of Node.js 16 by seven months to coincide with the end of support of OpenSSL 1.1.1 on September 11th, 2023.

## Why?

When we put together Node.js 16 the hope was that we would be able to include OpenSSL 3. Unfortunately, the timing of the releases did not allow that to be possible, and we released Node.js 16 with OpenSSL 1.1.1. OpenSSL 1.1.1 is [scheduled to be supported up until September 11th, 2023](https://www.openssl.org/policies/releasestrat.html), which is seven months before the planned End-of-Life date of Node.js 16 (April 2024).

We have evaluated the following options:

1. Do nothing. Node.js 16 will be at risk for any vulnerabilities in OpenSSL 1.1.1 for the last seven months of its lifetime.
2. End support for Node.js 16 early in September 2023 to coincide with EOL of OpenSSL 1.1.1. We have precedent for doing this when we ended support for [Node.js 8 four months early](https://github.com/nodejs/Release/issues/186) to coincide with the EOL of OpenSSL 1.0.2.
3. Attempt a switch to OpenSSL 3. Based on issues reported against Node.js 17 and 18 (which are on OpenSSL 3) and adjustments that needed to be made to our test suite, this is considered risky and will likely cause compatibility issues for some applications.
4. Attempt to replace OpenSSL 1.1.1 with the version of [OpenSSL 1.1.1 from CentOS Stream 8](https://git.centos.org/rpms/openssl/tree/c8s). CentOS Stream 8 is upstream Red Hat Enterprise Linux 8 (RHEL 8) and its openssl package would be supported for the duration of RHEL 8 ([until May 31st, 2024](https://access.redhat.com/support/policy/updates/errata/)). Unfortunately, the changes made to OpenSSL for CentOS Stream 8 result in differences (e.g., [removal of several algorithms](https://git.centos.org/rpms/openssl/blob/c8s/f/SOURCES/hobble-openssl)) which would cause compatibility issues for some applications.

After consideration, we have decided that the least risky option is to avoid the potential breaking change of an in-release OpenSSL switch and bring forward the End-of-Life date of Node.js 16 to be on the same day as the end of support of OpenSSL 1.1.1, September 11th, 2023.
