---
title: Using Node.js's test runner
layout: learn
authors: JakobJingleheimer
---

# Using Node.js's test runner

Node.js has a flexible and robust built-in test runner. This guide will show you how to set up and use it.

```text displayName="Architecture overview"
example/
  ├ …
  ├ src/
    ├ app/…
    └ sw/…
  └ test/
    ├ globals/
      ├ …
      ├ IndexedDb.js
      └ ServiceWorkerGlobalScope.js
    ├ setup.mjs
    ├ setup.units.mjs
    └ setup.ui.mjs
```

```bash displayName="Install dependencies"
npm init -y
npm install --save-dev concurrently
```

```json displayName="package.json"
{
  "name": "example",
  "scripts": {
    "test": "concurrently --kill-others-on-fail --prefix none npm:test:*",
    "test:sw": "node --import ./test/setup.sw.mjs --test './src/sw/**/*.spec.*'",
    "test:units": "node --import ./test/setup.units.mjs --test './src/app/**/*.spec.*'",
    "test:ui": "node --import ./test/setup.ui.mjs --test './src/app/**/*.test.*'"
  }
}
```

> **Note**: globs require node v21+, and the globs must themselves be wrapped in quotes (without, you'll get different behaviour than expected, wherein it may first appear to be working but isn't).

There are some things you always want, so put them in a base setup file like the following. This file will get imported by other, more bespoke setups.

## General setup

<details>
<summary>`test/setup.mjs`</summary>

```js
import { register } from 'node:module';

register('some-typescript-loader');
// TypeScript is supported hereafter
// BUT other test/setup.*.mjs files still must be plain JavaScript!
```

</details>

Then for each setup, create a dedicated `setup` file (ensuring the base `setup.mjs` file is imported within each). There are a number of reasons to isolate the setups, but the most obvious reason is [YAGNI](https://en.wikipedia.org/wiki/You_aren't_gonna_need_it) + performance: much of what you may be setting up are environment-specific mocks/stubs, which can be quite expensive and will slow down test runs. You want to avoid those costs (literal money you pay to CI, time waiting for tests to finish, etc) when you don't need them.

Each example below was taken from real-world projects; they may not be appropriate/applicable to yours, but each demonstrate general concepts that are broadly applicable.

## ServiceWorker tests

[`ServiceWorkerGlobalScope`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope) contains very specific APIs that don't exist in other environments, and some of its APIs are seemingly similar to others (ex `fetch`) but have augmented behaviour. You do not want these to spill into unrelated tests.

<details>
<summary>`test/setup.sw.mjs`</summary>

```js
import { beforeEach } from 'node:test';

import { ServiceWorkerGlobalScope } from './globals/ServiceWorkerGlobalScope.js';

import './setup.mjs'; // 💡

beforeEach(globalSWBeforeEach);
function globalSWBeforeEach() {
  globalThis.self = new ServiceWorkerGlobalScope();
}
```

</details>

```js
import assert from 'node:assert/strict';
import { describe, mock, it } from 'node:test';

import { onActivate } from './onActivate.js';

describe('ServiceWorker::onActivate()', () => {
  const globalSelf = globalThis.self;
  const claim = mock.fn(async function mock__claim() {});
  const matchAll = mock.fn(async function mock__matchAll() {});

  class ActivateEvent extends Event {
    constructor(...args) {
      super('activate', ...args);
    }
  }

  before(() => {
    globalThis.self = {
      clients: { claim, matchAll },
    };
  });
  after(() => {
    global.self = globalSelf;
  });

  it('should claim all clients', async () => {
    await onActivate(new ActivateEvent());

    assert.equal(claim.mock.callCount(), 1);
    assert.equal(matchAll.mock.callCount(), 1);
  });
});
```

## Snapshot tests

These were popularised by Jest; now, many libraries implement such functionality, including Node.js as of v22.3.0. There are several use-cases such as verifying component rendering output and [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code) config. The concept is the same regardless of use-case.

There is no specific configuration _required_ except enabling the feature via [`--experimental-test-snapshots`](). But to demonstrate the optional configuration, you would probably add something like the following to one of your existing test config files.

<details>
<summary>`test/setup.ui.mjs`</summary>

By default, node generates a filename that is incompatible with syntax highlighting detection: `.js.snapshot`. The generated file is actually a CJS file, so a more appropriate file name would end with `.snapshot.cjs` (or more succinctly `.snap.cjs` as below); this will also handle better in ESM projects.

```js
import { basename, dirname, extname, join } from 'node:path';
import { snapshot } from 'node:test';

snapshot.setResolveSnapshotPath(generateSnapshotPath);
/**
 * @param {string} testFilePath '/tmp/foo.test.js'
 * @returns {string} '/tmp/foo.test.snap.cjs'
 */
function generateSnapshotPath(testFilePath) {
  const ext = extname(testFilePath);
  const filename = basename(testFilePath, ext);
  const base = dirname(testFilePath);

  return join(base, `${filename}.snap.cjs`);
}
```

</details>

The example below demonstrates snapshot testing with [testing library](https://testing-library.com/) for UI components; note the two different ways of accessing `assert.snapshot`):

```ts
import { describe, it } from 'node:test';

import { prettyDOM } from '@testing-library/dom';
import { render } from '@testing-library/react'; // Any framework (ex svelte)

import { SomeComponent } from './SomeComponent.jsx';


describe('<SomeComponent>', () => {
  // For people preferring "fat-arrow" syntax, the following is probably better for consistency
  it('should render defaults when no props are provided', (t) => {
    const component = render(<SomeComponent />).container.firstChild;

    t.assert.snapshot(prettyDOM(component));
  });

  it('should consume `foo` when provided', function() {
    const component = render(<SomeComponent foo="bar" />).container.firstChild;

    this.assert.snapshot(prettyDOM(component));
    // `this` works only when `function` is used (not "fat arrow").
  });
});
```

> ⚠️ `assert.snapshot` comes from the test's context (`t` or `this`), **not** `node:assert`. This is necessary because the test context has access to scope that is impossible for `node:assert` (you would have to manually provide it every time `assert.snapshot` is used, like `snapshot(this, value)`, which would be rather tedious).

## Unit tests

Unit tests are the simplest tests and generally require relatively nothing special. The vast majority of your tests will likely be unit tests, so it is important to keep this setup minimal because a small decrease to setup performance will magnify and cascade.

<details>
<summary>`test/setup.units.mjs`</summary>

```js
import { register } from 'node:module';

import './setup.mjs'; // 💡

register('some-plaintext-loader');
// plain-text files like graphql can now be imported:
// import GET_ME from 'get-me.gql'; GET_ME = '
```

</details>

```js
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Cat } from './Cat.js';
import { Fish } from './Fish.js';
import { Plastic } from './Plastic.js';

describe('Cat', () => {
  it('should eat fish', () => {
    const cat = new Cat();
    const fish = new Fish();

    assert.doesNotThrow(() => cat.eat(fish));
  });

  it('should NOT eat plastic', () => {
    const cat = new Cat();
    const plastic = new Plastic();

    assert.throws(() => cat.eat(plastic));
  });
});
```

## User Interface tests

UI tests generally require a DOM, and possibly other browser-specific APIs (such as [`IndexedDb`](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) used below). These tend to be very complicated and expensive to setup.

<details>
<summary>`test/setup.ui.mjs`</summary>

If you use an API like `IndexedDb` but it's very isolated, a global mock like below is perhaps not the way to go. Instead, perhaps move this `beforeEach` into the specific test where `IndexedDb` will be accessed. Note that if the module accessing `IndexedDb` (or whatever) is itself widely accessed, either mock that module (probably the better option), or _do_ keep this here.

```js
import { register } from 'node:module';

// ⚠️ Ensure only 1 instance of JSDom is instantiated; multiples will lead to many 🤬
import jsdom from 'global-jsdom';

import './setup.units.mjs'; // 💡

import { IndexedDb } from './globals/IndexedDb.js';

register('some-css-modules-loader');

jsdom(undefined, {
  url: 'https://test.example.com', // ⚠️ Failing to specify this will likely lead to many 🤬
});

// Example of how to decorate a global.
// JSDOM's `history` does not handle navigation; the following handles most cases.
const pushState = globalThis.history.pushState.bind(globalThis.history);
globalThis.history.pushState = function mock_pushState(data, unused, url) {
  pushState(data, unused, url);
  globalThis.location.assign(url);
};

beforeEach(globalUIBeforeEach);
function globalUIBeforeEach() {
  globalThis.indexedDb = new IndexedDb();
}
```

</details>

You can have 2 different levels of UI tests: a unit-like (wherein externals & dependencies are mocked) and a more end-to-end (where only externals like IndexedDb are mocked but the rest of the chain is real). The former is generally the purer option, and the latter is generally deferred to a fully end-to-end automated usability test via something like [Playwright](https://playwright.dev/) or [Puppeteer](https://pptr.dev/). Below is an example of the former.

```ts
import { before, describe, mock, it } from 'node:test';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react'; // Any framework (ex svelte)

// ⚠️ Note that SomeOtherComponent is NOT a static import;
// this is necessary in order to facilitate mocking its own imports.


describe('<SomeOtherComponent>', () => {
  let SomeOtherComponent;
  let calcSomeValue;

  before(async () => {
    // ⚠️ Sequence matters: the mock must be set up BEFORE its consumer is imported.

    // Requires the `--experimental-test-module-mocks` be set.
    calcSomeValue = mock.module('./calcSomeValue.js', { calcSomeValue: mock.fn() });

    ({ SomeOtherComponent } = await import('./SomeOtherComponent.jsx'));
  });

  describe('when calcSomeValue fails', () => {
    // This you would not want to handle with a snapshot because that would be brittle:
    // When inconsequential updates are made to the error message,
    // the snapshot test would erroneously fail
    // (and the snapshot would need to be updated for no real value).

    it('should fail gracefully by displaying a pretty error', () => {
      calcSomeValue.mockImplementation(function mock__calcSomeValue() { return null });

      render(<SomeOtherComponent>);

      const errorMessage = screen.queryByText('unable');

      assert.ok(errorMessage);
    });
  });
});
```
