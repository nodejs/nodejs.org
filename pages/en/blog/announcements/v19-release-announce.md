---
date: '2022-10-18T15:45:00.000Z'
category: announcements
title: 'Node.js 19 is now available!'
layout: blog-post.hbs
author: The Node.js Project
---

We’re excited to announce that Node.js 19 was released today! Highlights include the update of the V8 JavaScript engine to 10.7, and HTTP(s)/1.1 KeepAlive enabled by default.

Node.js 19 will replace Node.js 18 as our ‘Current’ release line when Node.js 18 enters long-term support (LTS) later this month.
As per the release schedule, Node.js 19 will be the ‘Current' release for the next 6 months, until April 2023.

You can read more about our release policy at https://github.com/nodejs/release.

To download Node.js 19.0.0, visit: /download/current/. You can find the release post at /blog/release/v19.0.0, which contains the full list of commits included in this release.

## node --watch (experimental)

An exciting recent feature addition to the runtime is support for running in ‘watch’ mode using the `node --watch` option.
Running in ‘watch’ mode restarts the process when an imported file is changed.

```console
$ node --watch index.js
```

This feature is available in v19.0.0 and v18.11.0+.

Contributed by Moshe Atlow in [#44366](https://github.com/nodejs/node/pull/44366)

## HTTP(S)/1.1 KeepAlive by default

Starting with this release, Node.js sets `keepAlive` to true by default. This means that any outgoing HTTP(s) connection will automatically use HTTP 1.1 Keep-Alive.
The default keep-alive duration is 5 seconds.

Enable keep-alive will deliver better throughput as connections are reused by default.

Additionally, the agent is now able to parse the response `Keep-Alive` which the servers might send. This header instructs the client on how much to stay connected.
On the other side, the Node.js HTTP server will now automatically disconnect idle clients (which are using HTTP Keep-Alive to reuse the connection) when `close()` is invoked).

Node.js HTTP(S)/1.1 requests may experience a better throughput/performance by default.

Contributed by Paolo Insogna in [#43522](https://github.com/nodejs/node/pull/43522)

## Stable WebCrypto

The WebCrypto API is now stable (with the exception of the following algorithms: Ed25519, Ed448, X25519, and X448)

Use `globalThis.crypto` or `require('node:crypto').webcrypto` to access this module.

Contributed by Filip Skokan in [#44897](https://github.com/nodejs/node/pull/44897)

## Custom ESM Resolution Adjustments

Node.js has removed the `--experimental-specifier-resolution` flag. Its functionality can now be achieved via custom loaders.

Contributed by Geoffrey Booth in [#44859](https://github.com/nodejs/node/pull/44859)

## DTrace/SystemTap/ETW Support

Support for DTrace/SystemTap/ETW was removed in v19.0.0. The main reason is the prioritization of resources.
The complexity to keep the support up-to-date has proved not worth it without a clear plan to support these tools.

If you are interested in helping to bring DTrace back, an issue has been opened here: https://github.com/nodejs/node/issues/44550.

Contributed by Ben Noordhuis in [#43651](https://github.com/nodejs/node/pull/43651) and [#43652](https://github.com/nodejs/node/pull/43652)

## Dependencies

### V8 10.7

The V8 engine is updated to version 10.7, which is part of Chromium 107.
This version includes a new feature to the JavaScript API: `Intl.NumberFormat`.

`Intl.NumberFormat` v3 API is a new TC39 ECMA402 stage 3 proposal extending the pre-existing `Intl.NumberFormat`.

The V8 update was a contribution by Michaël Zasso in [#44741](https://github.com/nodejs/node/pull/44741).

### llhttp

Node.js 19 ships with llhttp@8.1.0

Contributed by Paolo Insogna in [#44967](https://github.com/nodejs/node/pull/44967)

### npm

Node.js 19 ships with npm@8.19.2

## Node.js 18 going LTS

Note that the Node.js 18 release line is going to be transitioning into long-term support next week.

## Call to action!

Try out the new Node.js 19 release! We’re always happy to hear your feedback. Testing your applications and modules with Node.js 19 helps to ensure the future compatibility of your project with the latest Node.js changes and features.

Also of note is that Node.js 14 will go End-of-Life in April 2023, so we advise you to start planning to upgrade to Node.js 16 (LTS) or Node.js 18 (soon to be LTS).

Please, consider that Node.js 16 (LTS) will go End-of-Life in September 2023, which was brought forward from April 2024 to coincide with the end of support of OpenSSL 1.1.1. You can read more details about that decision at /blog/announcements/nodejs16-eol/.

For the timeline of Node.js releases, check out the [Node.js Release Schedule](https://github.com/nodejs/release#release-schedule).
