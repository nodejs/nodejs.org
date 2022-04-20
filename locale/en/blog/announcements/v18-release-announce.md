---
title: Node.js 18 is now available!
date: 2022-04-19T15:45:00.000Z
status: publish
category: Announcements
slug: nodejs-18-release-announcement
layout: blog-post.hbs
author: The Node.js Project
---

We’re excited to announce that Node.js 18 was released today! Highlights include the update of the V8 JavaScript engine to 10.1, global fetch enabled by default, and a core test runner module.

Initially, Node.js 18 will replace Node.js 17 as our ‘Current’ release line. As per the release schedule, Node.js 18 will be the 'Current' release for the next 6 months and then promoted to Long-term Support (LTS) in October 2022. Once promoted to long-term support the release will be designated the codename 'Hydrogen'. Node.js 18 will be supported until April 2025.

You can read more about our release policy at https://github.com/nodejs/release.

To download Node.js 18.0.0, visit: https://nodejs.org/en/download/current/. You can find the release post at https://nodejs.org/en/blog/release/v18.0.0, which contains the full list of commits included in this release.

## New globally available browser-compatible APIs

### fetch (experimental)

In Node.js 18, an experimental global fetch API is available by default. The implementation comes from [undici](https://undici.nodejs.org/#/) and is inspired by [node-fetch](https://github.com/node-fetch/node-fetch) which was originally based upon [undici-fetch](https://github.com/Ethan-Arrowood/undici-fetch). The implementation strives to be as close to spec-compliant as possible, but some aspects would require a browser environment and are thus omitted.

The API will remain experimental until more test coverage is added and the contributors have verified that the API implements as much of the specification as is feasible. If you are looking to get involved visit the [nodejs/undici](https://github.com/nodejs/undici) repository and look for [issues tagged with fetch](https://github.com/nodejs/undici/issues?q=is%3Aissue+is%3Aopen+label%3Afetch).

Example usage of this API:

```mjs
const res = await fetch('https://nodejs.org/api/documentation.json');
if (res.ok) {
  const data = await res.json();
  console.log(data);
}
```

Through this addition, the following globals are made available: `fetch`, `FormData`, `Headers`, `Request`, `Response`.

It's possible to disable the API by supplying the `--no-experimental-fetch` command-line flag.

The `fetch()` implementation in `undici` was led by Robert Nagy, Ethan Arrowood, and Matteo Collina. The implementation was added to Node.js core by Michaël Zasso in [#41811](https://github.com/nodejs/node/pull/41811).

### Web Streams API (experimental)

Node.js now exposes the experimental implementation of the [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) on the global scope. This means the following APIs are now globally available:

* `ReadableStream`, `ReadableStreamDefaultReader`, `ReadableStreamBYOBReader`, `ReadableStreamBYOBRequest`, `ReadableByteStreamController`, `ReadableStreamDefaultController`, `TransformStream`, `TransformStreamDefaultController`, `WritableStream`, `WritableStreamDefaultWriter`, `WritableStreamDefaultController`, `ByteLengthQueuingStrategy`, `CountQueuingStrategy`, `TextEncoderStream`, `TextDecoderStream`, `CompressionStream`, `DecompressionStream`.

Contributed James Snell in [#39062](https://github.com/nodejs/node/pull/39062), and Antoine du Hamel in [#42225](https://github.com/nodejs/node/pull/42225).

### Other global APIs

Additionally, the following APIs are now exposed on the global scope:
* `Blob` - <https://nodejs.org/api/buffer.html#class-blob>
* `BroadcastChannel` - <https://nodejs.org/api/worker_threads.html#class-broadcastchannel-extends-eventtarget>

Both of these APIs are also no longer experimental.

Contributed by James Snell in [#41270](https://github.com/nodejs/node/pull/41270) and [#41271](https://github.com/nodejs/node/pull/41271).

## Test runner module (experimental)

The `node:test` module facilitates the creation of JavaScript tests that report results in TAP format. To access it:

`import test from 'node:test';`

The following is an example implementation of a parent test with two subtests:

```js
test('top level test', async (t) => {
  await t.test('subtest 1', (t) => {
    assert.strictEqual(1, 1);
  });

  await t.test('subtest 2', (t) => {
    assert.strictEqual(2, 2);
  });
});
```

Note that the test runner module is only available using the `node:` prefix. The `node:` prefix denotes the loading of a core module. Omitting the prefix and importing `'test'` would attempt to load a userland module.

Read more at <https://nodejs.org/dist/latest-v18.x/docs/api/test.html>.

Contributed by Colin Ihrig in [#42325](https://github.com/nodejs/node/pull/42325).

## Toolchain and Compiler Upgrades

Node.js provides pre-built binaries for several different platforms. For each major release, the minimum toolchains are assessed and raised where appropriate.

* Prebuilt binaries for Linux are now built on Red Hat Enterprise Linux (RHEL) 8 and are compatible with Linux distributions based on glibc 2.28 or later, for example, Debian 10, RHEL 8, Ubuntu 20.04.
* Prebuilt binaries for macOS now require macOS 10.15 or later.
* For AIX the minimum supported architecture has been raised from Power 7 to Power 8.

Prebuilt binaries for 32-bit Windows will initially not be available due to issues building the V8 dependency in Node.js. We hope to restore 32-bit Windows binaries for Node.js 18 with a future V8 update.

Node.js does not support running on operating systems that are no longer supported by their vendor. For operating systems where their vendor has planned to end support earlier than April 2025, such as Windows 8.1 (January 2023) and Windows Server 2012 R2 (October 2023), support for Node.js 18 will end at the earlier date.

Full details about the supported toolchains and compilers are documented in the Node.js [BUILDING.md](https://github.com/nodejs/node/blob/v18.x/BUILDING.md#supported-platforms) file.

The Node.js team would once again like to thank our infrastructure providers Digital Ocean, Rackspace, ARM, Cloudflare, Equinix, IBM, Intel, Joyent, Macstadium, Microsoft, and Oregon State University Open Source Lab for contributing the infrastructure for the project. We would also like to thank Red Hat for providing no-cost Red Hat subscriptions under their [Red Hat for Open Source Infrastructure](https://www.redhat.com/en/blog/extending-no-cost-red-hat-enterprise-linux-open-source-organizations) program.

Contributed by Richard Lau ([#42292](https://github.com/nodejs/node/pull/42292), [#42604](https://github.com/nodejs/node/pull/42604), and [#42659](https://github.com/nodejs/node/pull/42659)) and Michaël Zasso ([#42105](https://github.com/nodejs/node/pull/42105) and [#42666](https://github.com/nodejs/node/pull/42666)). Cross compiler for ARMv7 upgrade contributed by Rod Vagg.

## Build-time user-land snapshot (experimental)

Starting from Node.js 18.0.0, users can build a Node.js binary with a custom V8 startup snapshot using the `--node-snapshot-main` flag of the configure script. For example:

```console
$ cd /path/to/node/source

# Specifying an entry point of the snapshot, for example,
# a UMD module like the marked markdown renderer which in
# this case should initialize the renderer and stores in
# globalThis.
$ ./configure --node-snapshot-main=marked.js

# Build the binary
$ make node
```

The resulted binary can deserialize the state of the heap that was initialized by the snapshot entry point at build time, so the application in generated binary can be initialized faster:

```js
// render.js
// globalThis.marked can be deserialized from the embedded
// snapshot so there is no need to parse and execute the
// module again, which improves startup time.
const html = globalThis.marked(process.argv[1]);
console.log(html);
```

The generated binary can be executed like this:

```console
$ out/Release/node render.js test.md
```

As a follow-up, we are working on JS APIs for the userland snapshot ([#42617](https://github.com/nodejs/node/issues/42617)) so that the binary can be executed without an additional runtime entry point script, effectively turning it into a single-file executable containing a user application. We are also working on making the feature a run-time flag ([#38905](https://github.com/nodejs/node/pull/38905)) so that the snapshot can be generated and loaded without a compiler.

Contributed by Joyee Cheung in [#42466](https://github.com/nodejs/node/pull/42466).

## V8 10.1

The V8 engine is updated to version 10.1, which is part of Chromium 101. Compared
to the version included in Node.js 17.9.0, the following new features are included:

* The [`findLast()` and `findLastIndex()` array methods](https://v8.dev/features/finding-in-arrays).
* Improvements to the [`Intl.Locale` API](https://v8.dev/blog/v8-release-99#intl.locale-extensions).
* The [`Intl.supportedValuesOf` function](https://v8.dev/blog/v8-release-99#intl-enumeration).
* Improved performance of [class fields and private class methods](https://v8.dev/blog/faster-class-features) (the initialization of them is now as fast as ordinary property stores).

Contributed by Michaël Zasso in [#42657](https://github.com/nodejs/node/pull/42657).

## Other project news

While not new in Node.js 18, over the past months the project has continued to develop its ECMAScript modules implementation. Notable milestones include adding experimental support for [JSON Import Assertions](https://github.com/tc39/proposal-import-assertions), the unflagging of JSON modules (experimental), and experimental support for HTTPS and HTTP imports. The [Node.js Loaders team](https://github.com/nodejs/loaders) is also continuing to develop the ECMAScript Modules Loaders implementation in Node.js.

The project is also continuing its [‘Next 10’](https://github.com/nodejs/next-10) effort. The goal of this effort is to reflect on what led to success in the first 10 years of Node.js and set the direction for success in the next 10. Several meetings have been held to discuss the next steps on the agreed [technical priorities](https://github.com/nodejs/node/blob/master/doc/contributing/technical-priorities.md). There have already been great discussions on Modern HTTP, WebAssembly, and Types. The next sessions on ECMAScript modules and Observability are planned to be part of the collaborator summit at the upcoming [OpenJS World](https://events.linuxfoundation.org/openjs-world/) conference in June.

## Call to action!

Try out the new Node.js 18 release! We’re always happy to hear your feedback. Testing your applications and modules with Node.js 18 helps to ensure the future compatibility of your project with the latest Node.js changes and features.

Also of note is that Node.js 12 will go End-of-Life in April 2022, so we advise you to start planning to upgrade to Node.js 14 (LTS) or Node.js 16 (LTS).

For the timeline of Node.js releases, check out the [Node.js Release Schedule](https://github.com/nodejs/release#release-schedule).

## Thank you!

We’d like to thank all of the Node.js collaborators and contributors, as this release is a sum of all their continued efforts.
