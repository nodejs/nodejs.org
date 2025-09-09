---
title: Mocking in tests
layout: learn
authors: JakobJingleheimer
---

# Mocking in tests

Mocking is a means of creating a facsimile, a puppet. This is generally done in a `when 'a', do 'b'` manner of puppeteering. The idea is to limit the number of moving pieces and control things that "don't matter". "mocks" and "stubs" are technically different kinds of "test doubles". For the curious mind, a stub is a replacement that does nothing (a no-op) but track its invocation. A mock is a stub that also has a fake implementation (the `when 'a', do 'b'`). Within this doc, the difference is unimportant, and stubs are referred to as mocks.

Tests should be deterministic: runnable in any order, any number of times, and always produce the same result. Proper setup and mocking make this possible.

Node.js provides many ways to mock various pieces of code.

This articles deals with the following types of tests:

| type             | description                               | example                                                                                        | mock candidates                          |
| :--------------- | :---------------------------------------- | :--------------------------------------------------------------------------------------------- | :--------------------------------------- |
| unit             | the smallest bit of code you can isolate  | `const sum = (a, b) => a + b`                                                                  | own code, external code, external system |
| component        | a unit + dependencies                     | `const arithmetic = (op = sum, a, b) => ops[op](a, b)`                                         | external code, external system           |
| integration      | components fitting together               | -                                                                                              | external code, external system           |
| end-to-end (e2e) | app + external data stores, delivery, etc | A fake user (ex a Playwright agent) literally using an app connected to real external systems. | none (do not mock)                       |

There are different schools of thought about when to mock and when not to mock, the broad strokes of which are outlined below.

## When and not to mock

There are 3 main mock candidates:

- Own code
- External code
- External system

### Own code

This is what your project controls.

```mjs displayName="your-project/main.mjs"
import foo from './foo.mjs';

export function main() {
  const f = foo();
}
```

Here, `foo` is an "own code" dependency of `main`.

#### Why

For a true unit test of `main`, `foo` should be mocked: you're testing that `main` works, not that `main` + `foo` work (that's a different test).

#### Why not

Mocking `foo` can be more trouble than worth, especially when `foo` is simple, well-tested, and rarely updated.

Not mocking `foo` can be better because it's more authentic and increases coverage of `foo` (because `main`'s tests will also verify `foo`). This can, however, create noise: when `foo` breaks, a bunch of other tests will also break, so tracking down the problem is more tedious: if only the 1 test for the item ultimately responsible for the issue is failing, that's very easy to spot; whereas 100 tests failing creates a needle-in-a-haystack to find the real problem.

### External code

This is what your project does not control.

```mjs displayName="your-project/main.mjs"
import bar from 'bar';

export function main() {
  const f = bar();
}
```

Here, `bar` is an external package, e.g. an npm dependency.

Uncontroversially, for unit tests, this should always be mocked. For component and integration tests, whether to mock depends on what this is.

#### Why

Verifying that code that your project does not maintain works is not the goal of a unit test (and that code should have its own tests).

#### Why not

Sometimes, it's just not realistic to mock. For example, you would almost never mock a large framework such as react or angular (the medicine would be worse than the ailment).

### External system

These are things like databases, environments (Chromium or Firefox for a web app, an operating system for a node app, etc), file systems, memory store, etc.

Ideally, mocking these would not be necessary. Aside from somehow creating isolated copies for each case (usually very impractical due to cost, additional execution time, etc), the next best option is to mock. Without mocking, tests sabotage each other:

```mjs displayName="storage.mjs"
import { db } from 'db';

export function read(key, all = false) {
  validate(key, val);

  if (all) {
    return db.getAll(key);
  }

  return db.getOne(key);
}

export function save(key, val) {
  validate(key, val);

  return db.upsert(key, val);
}
```

```mjs displayName="storage.test.mjs"
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { db } from 'db';

import { save } from './storage.mjs';

describe('storage', { concurrency: true }, () => {
  it('should retrieve the requested item', async () => {
    await db.upsert('good', 'item'); // give it something to read
    await db.upsert('erroneous', 'item'); // give it a chance to fail

    const results = await read('a', true);

    assert.equal(results.length, 1); // ensure read did not retrieve erroneous item

    assert.deepEqual(results[0], { key: 'good', val: 'item' });
  });

  it('should save the new item', async () => {
    const id = await save('good', 'item');

    assert.ok(id);

    const items = await db.getAll();

    assert.equal(items.length, 1); // ensure save did not create duplicates

    assert.deepEqual(items[0], { key: 'good', val: 'item' });
  });
});
```

In the above, the first and second cases (the `it()` statements) can sabotage each other because they are run concurrently and mutate the same store (a race condition): `save()`'s insertion can cause the otherwise valid `read()`'s test to fail its assertion on items found (and `read()`'s can do the same thing to `save()`'s).

## What to mock

### Modules + units

This leverages [`mock`](https://nodejs.org/api/test.html#class-mocktracker) from the Node.js test runner.

```mjs
import assert from 'node:assert/strict';
import { before, describe, it, mock } from 'node:test';

describe('foo', { concurrency: true }, () => {
  const barMock = mock.fn();
  let foo;

  before(async () => {
    const barNamedExports = await import('./bar.mjs')
      // discard the original default export
      .then(({ default: _, ...rest }) => rest);

    // It's usually not necessary to manually call restore() after each
    // nor reset() after all (node does this automatically).
    mock.module('./bar.mjs', {
      defaultExport: barMock,
      // Keep the other exports that you don't want to mock.
      namedExports: barNamedExports,
    });

    // This MUST be a dynamic import because that is the only way to ensure the
    // import starts after the mock has been set up.
    ({ foo } = await import('./foo.mjs'));
  });

  it('should do the thing', () => {
    barMock.mock.mockImplementationOnce(function bar_mock() {
      /* … */
    });

    assert.equal(foo(), 42);
  });
});
```

### APIs

A little-known fact is that there is a builtin way to mock `fetch`. [`undici`](https://github.com/nodejs/undici) is the Node.js implementation of `fetch`. It's shipped with `node`, but not currently exposed by `node` itself, so it must be installed (ex `npm install undici`).

```mjs displayName="endpoints.spec.mjs"
import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';

import { MockAgent, setGlobalDispatcher } from 'undici';

import endpoints from './endpoints.mjs';

describe('endpoints', { concurrency: true }, () => {
  let agent;
  beforeEach(() => {
    agent = new MockAgent();
    setGlobalDispatcher(agent);
  });

  it('should retrieve data', async () => {
    const endpoint = 'foo';
    const code = 200;
    const data = {
      key: 'good',
      val: 'item',
    };

    agent
      .get('https://example.com')
      .intercept({
        path: endpoint,
        method: 'GET',
      })
      .reply(code, data);

    assert.deepEqual(await endpoints.get(endpoint), {
      code,
      data,
    });
  });

  it('should save data', async () => {
    const endpoint = 'foo/1';
    const code = 201;
    const data = {
      key: 'good',
      val: 'item',
    };

    agent
      .get('https://example.com')
      .intercept({
        path: endpoint,
        method: 'PUT',
      })
      .reply(code, data);

    assert.deepEqual(await endpoints.save(endpoint), {
      code,
      data,
    });
  });
});
```

### Time

Like Doctor Strange, you too can control time. You would usually do this just for convenience to avoid artificially protracted test runs (do you really want to wait 3 minutes for that `setTimeout()` to trigger?). You may also want to travel through time. This leverages [`mock.timers`](https://nodejs.org/api/test.html#class-mocktimers) from the Node.js test runner.

Note the use of time-zone here (`Z` in the time-stamps). Neglecting to include a consistent time-zone will likely lead to unexpected restults.

```mjs displayName="master-time.spec.mjs"
import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

import ago from './ago.mjs';

describe('whatever', { concurrency: true }, () => {
  it('should choose "minutes" when that\'s the closet unit', () => {
    mock.timers.enable({ now: new Date('2000-01-01T00:02:02Z') });

    const t = ago('1999-12-01T23:59:59Z');

    assert.equal(t, '2 minutes ago');
  });
});
```

This is especially useful when comparing against a static fixture (that is checked into a repository), such as in [snapshot testing](https://nodejs.org/api/test.html#snapshot-testing).
