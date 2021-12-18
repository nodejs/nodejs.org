---
date: 2019-08-16T14:58:40.000Z
category: vulnerability
title: August 2019 Security Releases
slug: august-2019-security-releases
layout: blog-post.hbs
author: Sam Roberts
---

Node.js, as well as many other implementations of HTTP/2, have been found
vulnerable to Denial of Service attacks. See
https://github.com/Netflix/security-bulletins/blob/master/advisories/third-party/2019-002.md
for more information.

Updates are now available for all active Node.js release lines, including Linux
ARMv6 builds for Node.js 8.x (which had been delayed).

We recommend that all Node.js users upgrade to a version listed below as soon
as possible.

## Downloads & release details

Downloads are available for the following versions. Details of code changes can
also be found on each release page.

* Node.js 8.16.1: https://nodejs.org/dist/latest-v8.x/
* Node.js 10.16.3: https://nodejs.org/dist/latest-v10.x/
* Node.js 12.8.1: https://nodejs.org/dist/latest-v12.x/

## Vulnerabilities Fixed

***Impact***: All versions of Node.js 8 (LTS "Carbon"), Node.js 10 (LTS "Dubnium"), and Node.js 12 (Current) are vulnerable to the following:

* **CVE-2019-9511 “Data Dribble”**: The attacker requests a large amount of
  data from a specified resource over multiple streams. They manipulate window
  size and stream priority to force the server to queue the data in 1-byte
  chunks. Depending on how efficiently this data is queued, this can consume
  excess CPU, memory, or both, potentially leading to a denial of service.
* **CVE-2019-9512 “Ping Flood”**: The attacker sends continual pings to an
  HTTP/2 peer, causing the peer to build an internal queue of responses.
  Depending on how efficiently this data is queued, this can consume excess
  CPU, memory, or both, potentially leading to a denial of service.
* **CVE-2019-9513 “Resource Loop”**: The attacker creates multiple request
  streams and continually shuffles the priority of the streams in a way that
  causes substantial churn to the priority tree. This can consume excess CPU,
  potentially leading to a denial of service.
* **CVE-2019-9514 “Reset Flood”**: The attacker opens a number of streams and
  sends an invalid request over each stream that should solicit a stream of
  RST\_STREAM frames from the peer. Depending on how the peer queues the
  RST\_STREAM frames, this can consume excess memory, CPU, or both, potentially
  leading to a denial of service.
* **CVE-2019-9515 “Settings Flood”**: The attacker sends a stream of SETTINGS
  frames to the peer. Since the RFC requires that the peer reply with one
  acknowledgement per SETTINGS frame, an empty SETTINGS frame is almost
  equivalent in behavior to a ping. Depending on how efficiently this data is
  queued, this can consume excess CPU, memory, or both, potentially leading to
  a denial of service.
* **CVE-2019-9516 “0-Length Headers Leak”**: The attacker sends a stream of
  headers with a 0-length header name and 0-length header value, optionally
  Huffman encoded into 1-byte or greater headers. Some implementations allocate
  memory for these headers and keep the allocation alive until the session
  dies. This can consume excess memory, potentially leading to a denial of
  service.
* **CVE-2019-9517 “Internal Data Buffering”**: The attacker opens the HTTP/2
  window so the peer can send without constraint; however, they leave the TCP
  window closed so the peer cannot actually write (many of) the bytes on the
  wire. The attacker then sends a stream of requests for a large response
  object. Depending on how the servers queue the responses, this can consume
  excess memory, CPU, or both, potentially leading to a denial of service.
* **CVE-2019-9518 “Empty Frames Flood”**: The attacker sends a stream of frames
  with an empty payload and without the end-of-stream flag. These frames can be
  DATA, HEADERS, CONTINUATION and/or PUSH\_PROMISE. The peer spends time
  processing each frame disproportionate to attack bandwidth. This can consume
  excess CPU, potentially leading to a denial of service. (Discovered by Piotr
  Sikora of Google)

### Contact and future updates

The current Node.js security policy and information about how to report a
vulnerability can be found at https://github.com/nodejs/node/blob/HEAD/SECURITY.md#security.

Subscribe to the low-volume announcement-only nodejs-sec mailing list at
https://groups.google.com/forum/#!forum/nodejs-sec to stay up to date on
security vulnerabilities and security-related releases of Node.js and the
projects maintained in the nodejs GitHub organization.
