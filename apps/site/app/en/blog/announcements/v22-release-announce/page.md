---
date: '2024-04-24T17:45:00.000Z'
category: announcements
title: 'Node.js 22 is now available!'
layout: blog-post
author: The Node.js Project
---

We're excited to announce the release of Node.js 22!
Highlights include require()ing ES modules, a WebSocket client, updates of the V8 JavaScript engine, and more!

Node.js 22 will enter long-term support (LTS) in October, but until then, it will be the "Current" release for the next six months.
We encourage you to explore the new features and benefits offered by this latest release and evaluate their potential impact on your applications.

The project continues to make progress across a number of areas, with many new features and fixes flowing into existing LTS releases.
For that reason, the changes outlined in the [changelog][CHANGELOG] for Node.js 22 only represent a small subset of the features and
work since the last major release. This blog post will add some additional context on the larger body of work in relation to those changes.

You can read more about our release policy at <https://github.com/nodejs/release>.

To download Node.js 22.0.0, visit: [https://nodejs.org/download/current/](/download/current/). You can find the release post at [https://nodejs.org/blog/release/v22.0.0](/blog/release/v22.0.0),
which contains the full list of commits included in this release.

### Notable Changes

#### V8 Update to 12.4

The V8 release 12.4 includes new features like WebAssembly Garbage Collection, [Array.fromAsync](https://tc39.es/proposal-array-from-async/), [Set methods](https://tc39.es/proposal-set-methods/) and [iterator helpers](https://tc39.es/proposal-iterator-helpers/).

Contributed by Michaël Zasso in [#52465](https://github.com/nodejs/node/pull/52465)

#### Maglev

V8's Maglev Compiler is now enabled by default on supported architectures (<https://v8.dev/blog/maglev>).
Maglev improves performance for short-lived CLI programs.

Contributed by Keyhan Vakil in [#51360](https://github.com/nodejs/node/pull/51360)

#### Support require()ing synchronous ESM graphs

This release adds `require()` support for synchronous ESM graphs under
the flag `--experimental-require-module`.

If `--experimental-require-module` is enabled, and the ECMAScript
module being loaded by `require()` meets the following requirements:

- Explicitly marked as an ES module with a "type": "module" field in the closest package.json or a .mjs extension.
- Fully synchronous (contains no top-level await).

`require()` will load the requested module as an ES Module, and return
the module name space object. In this case it is similar to dynamic
`import()` but is run synchronously and returns the name space object
directly.
We intend to eventually enable `require(esm)` by default in the future, without
the flag.

Contributed by Joyee Cheung in [#51977](https://github.com/nodejs/node/pull/51977)

#### Running package.json scripts

Node.js 22 includes a new experimental feature for the execution of scripts from the `package.json` with the cli flag `node --run <script-in-package-json>`.
It also supports `node --run test` which executes the test command inside `package.json` scripts.

Contributed by Yagiz Nizipli [#52190](https://github.com/nodejs/node/pull/52190)

#### Stream default High Water Mark

Increased the default High Water Mark for streams from 16KiB to 64KiB.
This provides a performance boost across the board at the cost of slightly higher memory usage.
Users in memory sensitive environments are encouraged to explicitly set `setDefaultHighWaterMark`.

Contributed by Robert Nagy in [#52037](https://github.com/nodejs/node/pull/52037)

#### Watch Mode (node --watch)

From this release Watch Mode is considered stable.
When in watch mode, changes in the watched files cause the Node.js process to restart.

Contributed by Moshe Atlow [#52074](https://github.com/nodejs/node/pull/52074)

#### WebSocket

The browser-compatible implementation of WebSocket, previously behind the flag `--experimental-websocket`, will be enabled by default.
This provides a WebSocket client to Node.js without external dependencies.

Contributed by the Undici team and Aras Abbasi in [#51594](https://github.com/nodejs/node/pull/51594)

#### glob and globSync

This release adds to the `node:fs`module the functions `glob` and `globSync` for pattern matching.
Developers can now utilize these functions for matching file paths based on specified patterns.

Contributed by Moshe Atlow [#51912](https://github.com/nodejs/node/pull/51912)

#### Improve performance of AbortSignal creation

This release enhances the efficiency of creating `AbortSignal` instances, leading to significantly improved performance in `fetch` and the test runner.

Contributed by Raz Luvaton in [#52505](https://github.com/nodejs/node/pull/52505)

## Call to action

Try out the new Node.js 22 release! We’re always happy to hear your feedback. Testing your applications and modules with Node.js 22 helps to ensure the future compatibility of your project with the latest Node.js changes and features.

Also of note is that Node.js 18 will go End-of-Life in April 2025, so we advise you to start planning to upgrade to Node.js 20 (LTS) or Node.js 22 (soon to be LTS).

Looking to the future, the [Next-10](https://github.com/nodejs/next-10) team is running a survey to gather info from the ecosystem. Help shape the future of Node.js by participating. Submit your feedback [here](https://linuxfoundation.surveymonkey.com/r/nodenext10survey24).

[CHANGELOG]: https://github.com/nodejs/node/releases/tag/v22.0.0
