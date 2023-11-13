---
date: '2023-10-17T15:45:00.000Z'
category: announcements
title: 'Node.js 21 is now available!'
layout: blog-post.hbs
author: The Node.js Project
---

We're excited to announce the release of Node.js 21! Highlights include updates of the V8 JavaScript engine to 11.8,
stable `fetch` and `WebStreams`, a new experimental flag to flip module defaults (`--experimental-default-type`),
a built-in WebSocket client, many updates to our test runner, and more!

Node.js 21 will replace Node.js 20 as our ‘Current’ release line when Node.js 20 enters long-term support (LTS) later this month.
As per the release schedule, Node.js 21 will be ‘Current' release for the next 6 months, until April 2024.

The project continues to make progress across a number of areas, with many new features and fixes flowing into existing LTS releases.
For that reason, the changes outlined in the [changelog][CHANGELOG] for Node.js 21 only represent a small subset of the features and
work since the last major release. This blog post will add some additional context on the larger body of work in relation to those changes.

You can read more about our release policy at <https://github.com/nodejs/release>.

To download Node.js 21.0.0, visit: [https://nodejs.org/download/current/](/download/current/). You can find the release post at [https://nodejs.org/blog/release/v21.0.0](/blog/release/v21.0.0),
which contains the full list of commits included in this release.

## Notable Changes

### Stable fetch/WebStreams

The recent update to Node.js, version 21, includes an important change to the fetch module as well as `WebStreams`.
Both modules were marked as stable after a recent update.

This impacts `WebStreams`, `FormData`, `Headers`, `Request`, `Response`, and `fetch`.

Contributed by Steven in [#45684](https://github.com/nodejs/node/pull/45684).

### Built-in WebSocket client

A experimental browser-compatible `WebSocket` implementation arises with this release. This is enabled
through the flag: `--experimental-websocket`. As any experimental feature,
that's subject to change.

Contributed by Khafra in [#49830](https://github.com/nodejs/node/pull/49830).

### V8 11.8

As per usual a new version of the V8 engine is included in Node.js (updated to version 11.8, which is part of Chromium 118) bringing improved performance and new language features including:

- [Array grouping](https://github.com/tc39/proposal-array-grouping)
- [`ArrayBuffer.prototype.transfer`](https://github.com/tc39/proposal-arraybuffer-transfer)
- [WebAssembly extended-const expressions](https://github.com/WebAssembly/extended-const)

The V8 update was a contribution by Michaël Zasso in [#47251](https://github.com/nodejs/node/pull/47251).

### Support for globs in the Node.js test runner

With the latest Node.js update, the test runner introduces support for glob expressions when
specifying the `--test` parameter.
This means you can now use powerful glob patterns to run tests more efficiently and flexibly.
For example, you can execute tests for all files with the `.test.js` extension across multiple directories using
a command like `node --test **/*.test.js`.

Contributed by Moshe Atlow in [#47653](https://github.com/nodejs/node/pull/47653).

### ESM: `--experimental-default-type` flag to flip module defaults

The new flag `--experimental-default-type` can be used to flip the default module system used by Node.js.
Input that is already explicitly defined as ES modules or CommonJS, such as by a `package.json`
`"type"` field or `.mjs`/`.cjs` file extension or the `--input-type` flag, is unaffected.
What is currently implicitly CommonJS would instead be interpreted as ES modules under `--experimental-default-type=module`:

- String input provided via `--eval` or STDIN, if `--input-type` is unspecified.
- Files ending in `.js` or with no extension, if there is no `package.json` file present in the same folder or any parent folder.
- Files ending in `.js` or with no extension, if the nearest parent `package.json` field lacks a `type` field;
  unless the folder is inside a `node_modules` folder.

In addition, extensionless files are interpreted as WebAssembly if `--experimental-wasm-modules` is passed and the file begins with the WebAssembly preamble `\0asm`.

We are also exploring using detection of ES module syntax as a way of Node.js knowing when to interpret files as ES modules.
Our goal is to eventually find a way to support ES module syntax by default with minimal breaking changes.

Contributed by Geoffrey Booth in [#49869](https://github.com/nodejs/node/pull/49869).

### Module customization hook `globalPreload` removed; use `register` and `initialize` instead

The module customization hook `globalPreload` has been removed.
Instead, use [`register`](https://nodejs.org/api/module.html#moduleregister) to send data from the application thread to the customization hooks,
and the [`initialize`](https://nodejs.org/api/module.html#initialize) hook to establish a communications channel between the threads.

Contributed by Jacob Smith in [#49144](https://github.com/nodejs/node/pull/49144).

### Add flush option to fs.writeFile function

When writing to files, it is possible that data is not immediately flushed to permanent storage.
This allows subsequent read operations to see stale data.
This PR adds a `'flush'` option to the `fs.writeFile` family of functions which forces the data to be
flushed at the end of a successful write operation.

Contributed by Colin Ihrig in [#50009](https://github.com/nodejs/node/pull/50009).

### Performance

Performance is an important attribute of a runtime and our [`@nodejs/performance`](https://github.com/nodejs/performance) team
has been working hard over the last year to make improvements in URL, fetch, streams, node:fs and HTTP.

#### Streams

The Node.js streams team keeps on optimizing Writable and Readable streams.
In this version, streams maintainer Robert Nagy led an effort to further optimize streams by removing redundant checks,
utilizing bitmaps, and scheduling callbacks in a more efficient way.

Contributed in [#50012](https://github.com/nodejs/node/pull/50012).

#### HTTP

Previously, when writing to a chunked response, Node.js would create a separate chunk for each call to `.write(...)`
regardless of whether the response was corked or not. This leads to unnecessary overhead both on the client and server side.

This change fixes this by creating a single chunk for all calls to `write(...)` when uncorking the response.

Consider the following example based on the [Transfer-Encoding docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding#chunked_encoding):

```js
res.cork();
res.write('Mozilla');
res.write(' Developer Network');
res.uncork();
```

> At the beginning of each chunk you need to add the length of the current chunk in hexadecimal format, followed by '\r\n' and then the chunk itself, followed by another '\r\n'. The terminating chunk is a regular chunk, with the exception that its length is zero.

Resulting in a response stream:

```
HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked

7\r\n
Mozilla\r\n
18\r\n
Developer Network\r\n
0\r\n
\r\n
```

After this PR everything is combined into a single chunk when uncorking the response bypassing a
lot of unnecessary overhead.

```
HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked

25\r\n
Mozilla Developer Network\r\n
0\r\n
\r\n
```

Contributed by Robert Nagy in [#50167](https://github.com/nodejs/node/pull/50167).

### llhttp 9.1.2 strict mode enforcement

- In previous versions of Node.js, strict mode was not enabled by default. With the latest update, all settings that were previously included in strict mode are enabled by default, enhancing code reliability and security.
- The presence of `\r\n` after headers is now mandatory (previously, `\r` alone was allowed). Additionally, `\r\n` after a chunk is now a requirement, ensuring consistent data processing.
- Data transmission after a message with the `Connection: close` header has been parsed is no longer allowed. This change enhances protocol adherence and improves connection handling.

To accommodate specific use cases, the `--insecure-http-parser` flag exists.
This option allows users to disable the aforementioned changes and maintain backward compatibility with previous parsing behavior.

These updates are designed to enhance overall system stability and improve the consistency of data processing in Node.js applications.
Developers are encouraged to review their codebase and adjust their implementations accordingly to ensure seamless integration with the latest version.

### `navigator` Object integration

In Node.js 21, we've introduced the global navigator object, enhancing web interoperability.
Now, developers can access hardware concurrency information through navigator.hardwareConcurrency

Contributed by Yagiz Nizipli in [#47769](https://github.com/nodejs/node/pull/47769).

### Deprecations

- \[[`4b08c4c047`](https://github.com/nodejs/node/commit/4b08c4c047)] - **(SEMVER-MAJOR)** **lib**: runtime deprecate punycode (Yagiz Nizipli) [#47202](https://github.com/nodejs/node/pull/47202)
- \[[`ccca547e28`](https://github.com/nodejs/node/commit/ccca547e28)] - **(SEMVER-MAJOR)** **util**: runtime deprecate `promisify`-ing a function returning a `Promise` (Antoine du Hamel) [#49609](https://github.com/nodejs/node/pull/49609)

## Call to action!

Try out the new Node.js 21 release! We’re always happy to hear your feedback. Testing your applications and modules with Node.js 21 helps to ensure the future compatibility of your project with the latest Node.js changes and features.

Also of note is that Node.js 16 (LTS) is End-of-Life, so we strongly advise you to start planning to upgrade to Node.js 18 (LTS) or Node.js 20 (LTS).

[CHANGELOG]: https://github.com/nodejs/node/releases/tag/v21.0.0
