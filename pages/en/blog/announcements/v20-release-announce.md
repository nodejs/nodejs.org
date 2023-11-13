---
date: '2023-04-18T15:45:00.000Z'
category: announcements
title: 'Node.js 20 is now available!'
layout: blog-post.hbs
author: The Node.js Project
---

We're excited to announce the release of Node.js 20! Highlights include the new Node.js Permission Model,a synchronous `import.meta.resolve`, a stable test_runner, updates of the V8 JavaScript engine to 11.3, Ada to 2.0,
and more!

The project continues to make progress across a number of areas, with many new features and fixes flowing into existing LTS releases. For that reason, the changes outlined in the [changelog][CHANGELOG] for Node.js 20 only represent a small subset of the features and work since the last major release. This blog post will add some additional context on the larger body of work in relation to those changes.

You can read more about our release policy at <https://github.com/nodejs/release>.

To download Node.js 20.0.0, visit: [https://nodejs.org/download/current/](/download/current/). You can find the release post at [https://nodejs.org/blog/release/v20.0.0](/blog/release/v20.0.0), which contains the full list of commits included in this release.

As a reminder, Node.js 20 will enter long-term support (LTS) in October, but until then, it will be the "Current" release for the next six months.
We encourage you to explore the new features and benefits offered by this latest release and evaluate their potential impact on your applications.

## Notable Changes

### Permission Model

The Node.js Permission Model is an experimental mechanism for restricting access to specific resources during execution.

In this first release containing the Permission Model, the features come with the following abilities:

- Restrict access to the file system (read and write)
  - Use [`--allow-fs-read`][] and [`--allow-fs-write`][]
- Restrict access to `child_process`
  - Use [`--allow-child-process`][]
- Restrict access to `worker_threads`
  - Use [`--allow-worker`][]
- Restrict access to native addons (same as `--no-addons` flag)

> The available permissions are documented by the [`--experimental-permission`][]
> flag.

When starting Node.js with `--experimental-permission`, the ability to access the file system, spawn processes, and use `node:worker_threads` will be restricted.

Developers using Node.js now have more control over file system access with the introduction of the `--allow-fs-read` and `--allow-fs-write` flags. These experimental features allow for more granular control over which parts of the file system can be accessed by Node.js processes.

To enable these flags, developers can use the `--experimental-permission` flag along with the desired permissions. For example, running the following command allows for both read and write access to the entire file system:

```console
$ node --experimental-permission --allow-fs-read=* --allow-fs-write=* index.js
```

Developers can also specify specific paths for file system access by passing in comma-separated values to the flags. For example, the following command allows for write access to the `/tmp/` folder:

```console
$ node --experimental-permission --allow-fs-write=/tmp/ --allow-fs-read=/home/index.js index.js
```

Wildcard patterns can also be used to allow for access to multiple files or folders at once. For example, the following command allows for read access to all files and folders in the `/home/` directory that start with `test`:

```console
$ node --experimental-permission --allow-fs-read=/home/test* index.js
```

When the Permission Model is enabled, the new `permission` property of the `process` object can be used to check if a certain permission has been granted at runtime.

```js
process.permission.has('fs.write'); // true
process.permission.has('fs.write', '/home/nodejs/protected-folder'); // true
```

It is important to note that these features are still experimental and may change in future releases of Node.js

Furthermore can be found in [Permission Model documentation](https://nodejs.org/api/permissions.html#process-based-permissions).

The Permission Model was a contribution by Rafael Gonzaga in [#44004](https://github.com/nodejs/node/pull/44004).

### Custom ESM loader hooks nearing stable

Custom ES module lifecycle hooks supplied via loaders (`--experimental-loader=./foo.mjs`) now run in a dedicated thread, isolated from the main thread. This provides a separate scope for loaders and ensures no cross-contamination between loaders and application code.

In alignment with browser behavior, `import.meta.resolve()` now returns synchronously; note that `resolve` hooks in user loaders can remain async if the loader author desires, and `import.meta.resolve` will still return synchronously in application code.

These changes were the last outstanding items before marking ESM loaders as stable. Once some time has gone by without significant bugs reported by the community, we intend to mark the loaders flag, `import.meta.resolve` and the `resolve` and `load` hooks as stable. This should enable more widespread adoption of ESM, as important constituencies such as instrumentation vendors will have a stable API on which to build analytics and reporting libraries.

Contributed by Anna Henningsen, Antoine du Hamel, Geoffrey Booth, Guy Bedford, Jacob Smith, and Michaël Zasso in [#44710](https://github.com/nodejs/node/pull/44710).

### V8 11.3

As per usual a new version of the V8 engine is included in Node.js (updated to version 11.3, which is part of Chromium 113) bringing improved performance and new language features including:

- [String.prototype.isWellFormed and toWellFormed](https://chromestatus.com/feature/5200195346759680)
- [Methods that change Array and TypedArray by copy](https://chromestatus.com/feature/5068609911521280)
- [Resizable ArrayBuffer and growable SharedArrayBuffer](https://chromestatus.com/feature/4668361878274048)
- [RegExp v flag with set notation + properties of strings](https://chromestatus.com/feature/5144156542861312)
- [WebAssembly Tail Call](https://chromestatus.com/feature/5423405012615168)

The V8 update was a contribution by Michaël Zasso in [#47251](https://github.com/nodejs/node/pull/47251).

### Stable Test Runner

The recent update to Node.js, version 20, includes an important change to the test_runner module. The module has been marked as stable after a recent update.
The stable test runner includes the building blocks for authoring and running tests, including:

- `describe`, `it`/`test` and hooks to structure test files
- mocking
- watch mode
- `node --test` for running multiple test files in parallel

The test runner also includes some parts that are not yet stable, including reporters and code coverage.

This is a simple example of using the test runner:

```mjs
import { test, mock } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

mock.method(fs, 'readFile', async () => 'Hello World');
test('synchronous passing test', async t => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(await fs.readFile('a.txt'), 'Hello World');
});
```

Contributed by Colin Ihrig in [#46983](https://github.com/nodejs/node/pull/46983)

### Performance

With the newly formed Node.js Performance team, there has been a renewed focus on performance since the last Major release. Node.js 20 includes many improvements to the fundamental parts of the runtime including `URL`, `fetch()`, and `EventTarget`.

The cost of initializing `EventTarget` has been cut by half, providing faster access to all subsystems using it. Additionally, V8 Fast API calls have been leveraged to improve performance in APIs such as `URL.canParse()` and timers.

Node.js 20 includes specific changes, such as the updated version 2.0 of Ada, a fast and spec-compliant URL parser written in C++.

Looking forward to new ways to improve performance we are currently working on reducing the cost of being specification compliant by refactoring to get rid of brand validations checks on streams, `URL`, `URLSearchParams`, and String Decoder. This helps support our general goal of being specification compliant where it makes sense.

If you have a passion for performance and Node.js, we are actively looking for contributors for our [performance team](https://github.com/nodejs/performance).

### Preparing single executable apps now requires injecting a Blob

The project has been working on support for Single Executable Applications (SEA) over the last year with initial support landing recently. The team continues to refine the approach as the feature is still Experimental. In Node.js 20, building a single executable app now requires injecting a blob prepared by Node.js from a JSON config instead of injecting the raw JS file.

Example:

**sea-config.json**

```json
{
  "main": "hello.js",
  "output": "sea-prep.blob"
}
```

This writes the blob to the `sea-prep.blob` file.

```sh
node --experimental-sea-config sea-config.json
```

This blob can now be injected into the binary.

This change was made to allow the the possibility of embedding multiple co-existing resources into the SEA (Single Executable Apps) which opens up new use cases.

Contributed by Joyee Cheung in [#47125](https://github.com/nodejs/node/pull/47125)

### Web Crypto API

The project works toward interoperability with other JavaScript environments. As an example of that in Node.js 20, the Web Crypto API functions' arguments are now coerced and validated as per their WebIDL definitions like in other Web Crypto API implementations. This further improves interoperability with other implementations of Web Crypto API.

This change was made by Filip Skokan in [#46067](https://github.com/nodejs/node/pull/46067).

### Official support for ARM64 Windows

Node.js has broad platform and architecture support and people seem to want it to run everywhere. We are happy to share that Node.js now includes binaries for ARM64 Windows, allowing for native execution on the platform.
The MSI, zip/7z packages, and executable are available from the Node.js download site along with all other platforms.
The CI system was updated and all changes are now fully tested on ARM64 Windows, to prevent regressions and ensure compatibility.

ARM64 Windows was upgraded to tier 2 support by Stefan Stojanovic in [#47233](https://github.com/nodejs/node/pull/47233).

### Progress on Web Assembly System Interface (WASI)

The project continues to work on the WASI implementation within Node.js. Some notable progress is that although it is experimental a command line option is no longer required to enable WASI. This should make it easier to consume. As the [team](https://github.com/nodejs/uvwasi) working on WASI looks forward to `preview2` a few changes were also made to plan for the future. That included adding a `version`
option when `new WASI()` is called. In the 20.x release the `version` is required and has no default value. This is important to that as new versions are supported applications don't default to what may be an obsolete version. This does mean, however, that any code that relied on the default for the version will need to be updated to request a specific version.

If you have a interest in using WASI in Node.js or [uvwasi](https://github.com/nodejs/uvwasi) which is used outside of Node.js itself, the team would love additional contributors.

## Call to action!

Try out the new Node.js 20 release! We’re always happy to hear your feedback. Testing your applications and modules with Node.js 20 helps to ensure the future compatibility of your project with the latest Node.js changes and features.

Also of note is that Node.js 14 will go End-of-Life in April 2023, so we advise you to start planning to upgrade to Node.js 18 (LTS) or Node.js 20 (soon to be LTS).

Please, consider that Node.js 16 (LTS) will go End-of-Life in September 2023, which was brought forward from April 2024 to coincide with the end of support of OpenSSL 1.1.1. You can read more details about that decision at [https://nodejs.org/blog/announcements/nodejs16-eol/](/blog/announcements/nodejs16-eol/).

Looking to the future, the [Next-10](https://github.com/nodejs/next-10) team is running a survey to gather info from the ecosystem. Help shape the future of Node.js by participating. Submit your feedback [here](https://linuxfoundation.surveymonkey.com/r/XJ35LYF).

[`--allow-child-process`]: https://nodejs.org/api/cli.html#--allow-child-process
[`--allow-fs-read`]: https://nodejs.org/api/cli.html#--allow-fs-read
[`--allow-fs-write`]: https://nodejs.org/api/cli.html#--allow-fs-write
[`--allow-worker`]: https://nodejs.org/api/cli.html#--allow-worker
[`--experimental-permission`]: https://nodejs.org/api/cli.html#--experimental-permission
[CHANGELOG]: https://github.com/nodejs/node/releases/tag/v20.0.0
