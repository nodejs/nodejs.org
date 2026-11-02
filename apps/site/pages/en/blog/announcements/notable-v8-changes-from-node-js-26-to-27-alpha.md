---
date: '2026-11-01T12:00:00.000Z'
category: announcements
title: Notable V8 changes from Node.js 26 to 27 (Alpha)
layout: blog-post
author: Joyee Cheung
---

The Node.js 27 Alpha release upgrades V8 to version 15.6, from the 14.6 used by Node.js 26, bringing several new JavaScript language features and improvements. In this post, let's explore the notable V8 changes introduced in this release that are interesting for Node.js developers.

Before we dive in, keep in mind that after Node.js switches to a new release schedule with an Alpha phase, Node.js may introduce breaking V8 changes, such as a bulk V8 upgrade, during the Alpha and Current phases. Breakages that affect the native addon ABI will come with a `NODE_MODULE_VERSION` bump, allowing toolchains that select prebuilt native addons by ABI version to continue working. Once the 27 release enters LTS, the V8 version in this release line is expected to remain stable, and no ABI or API breaking changes are expected except in exceptional circumstances, such as critical security fixes.

## JavaScript language features in Node.js 27

### New language features available by default

#### `Math.sumPrecise(iterable)`

Compared to summing up numbers in a loop, [`Math.sumPrecise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise) reduces the accumulation of floating-point errors.

```js
[0.1, 0.2, 0.3].reduce((a, b) => a + b); // 0.6000000000000001
Math.sumPrecise([0.1, 0.2, 0.3]); // 0.6
```

#### `Intl.Locale.prototype.variants`

The new [`Intl.Locale.prototype.variants`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/variants) method provides access to the variants of a locale.

```js
new Intl.Locale('sl-rozaj-biske').variants; // 'biske-rozaj'
```

#### Iterator methods

Several new iterator methods have been added in this release:

- [**`Iterator.prototype.join(separator)`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/join)
- [**`Iterator.prototype.includes(value)`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/includes)
- [**`Iterator.zip(iterables, options)`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/zip)
- [**`Iterator.zipKeyed(obj, options)`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/zipKeyed)

```js
[1, 2, 3]
  .values()
  .map(x => x * 2)
  .join('-'); // '2-4-6'
new Set(['a', 'b']).values().includes('b'); // true
Iterator.zip([
  [1, 2],
  ['a', 'b'],
]).toArray(); // [[1, 'a'], [2, 'b']]
Iterator.zipKeyed({ id: [1, 2], name: ['a', 'b'] }).toArray();
// [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
```

### Experimental language features behind a flag

- `--js-import-bytes`: implements [**`import ... with { type: "bytes" }`**](https://github.com/tc39/proposal-import-bytes). Support in Node.js is not yet implemented. The related [`import ... with { type: "text" }`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) is enabled by default in V8, and supported in Node.js behind [`--experimental-import-text`](https://nodejs.org/api/cli.html#--experimental-import-text).
- `--js-regexp-buffer-boundaries`: implements [Regular Expression Buffer Boundaries](https://github.com/tc39/proposal-regexp-buffer-boundaries).

Some fixes have been made to these experimental language features that were already available in v26:

- `--js-defer-import-eval`: implements [**`import defer`**](https://github.com/tc39/proposal-defer-import-eval). The static version already works in Node.js, while support for dynamic `import.defer()` is being implemented in [node#66727](https://github.com/nodejs/node/pull/66727).
- `--js-immutable-arraybuffer`: implements [**Immutable ArrayBuffer**](https://github.com/tc39/proposal-immutable-arraybuffer).

### Changes to Math

The new version of Node.js uses LLVM's libm for some `Math` methods, which leads to slightly different results for some inputs compared to the previous implementation. Code that compares floating point results to hard-coded values from an older version of Node.js may be broken by a difference in the last bit.

```js
Math.sin(18);
// v26: -0.7509872467716762
// v27: -0.750987246771676
Math.log(3);
// v26: 1.0986122886681096
// v27: 1.0986122886681098
```

The sequence of values returned by `Math.random` now changes for a given `--random-seed`.

```js
// node --random-seed=42
Math.random();
// v26: 0.6159659788862542
// v27: 0.22876995452731475
```

### Changes to Date

The value returned by [`Date.prototype.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) [is no longer truncated to whole minutes](https://chromium-review.googlesource.com/c/v8/v8/+/8349805). For historical dates when the time zone used a local mean time offset that is not a whole number of minutes (typically before the zone adopted standard time), the returned value can contain a fraction.

```js
// TZ=America/Los_Angeles node
const date = new Date(Date.UTC(1675, 0, 1));
date.getTimezoneOffset();
// v26: 472
// v27: 472.96666666666664
const shifted = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
shifted.toLocaleString();
// v26: '12/31/1674, 11:59:02 PM'
// v27: '1/1/1675, 12:00:00 AM'
```

### Changes to Array

V8 now uses PowerSort instead of TimSort in `Array.prototype.sort()` for bigger arrays. The sort is still stable and the result from using a consistent comparator remains the same, but tests that record comparator calls or comparators with side effects can now behave differently.

```js
const array = Array.from({ length: 2000 }, (_, i) => (i * 7919) % 1009);
let calls = 0;
array.sort((a, b) => {
  calls++;
  return a - b;
});
calls;
// v26: 19220
// v27: 19249
```

### Changes to errors and stack traces

[The `error.stack` getter no longer looks up the captured stack trace from the prototype chain](https://github.com/tc39/proposal-error-stack-accessor). Errors created with `new`, error subclasses and objects passed to `Error.captureStackTrace` are not affected.

```js
const err = new Error('boom');
typeof Object.create(err).stack; // No longer looks up the prototype chain
// v26: 'string'
// v27: 'undefined'
```

In Node.js 27, more fatal V8 errors are now handled by Node.js's fatal error handling before aborting, so [`--report-on-fatalerror`](https://nodejs.org/api/cli.html#--report-on-fatalerror) can produce a diagnostic report in cases where Node.js would previously abort without one.

### Changes to Promises and async/await

When the callback passed to [**`Promise.try`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/try) returns a promise, `Promise.try` now returns that promise directly, see [ecma262#3883](https://github.com/tc39/ecma262/pull/3883).

```js
const promise = Promise.resolve(1);
Promise.try(() => promise) === promise;
// v26: false
// v27: true
```

There are also a few edge cases that have been fixed:

- When ESM with top-level `await` are evaluated, V8 no longer calls `Promise.prototype.then()` in a way that looks up `constructor` and `Symbol.species` on the promise, as the specification requires.
- Re-entrant `Atomics.wait` on the same thread now throws `TypeError` instead of crashing the process. This should only happen when a debugger evaluates code on a blocked worker.

### Changes to Iterator helpers

[`take()` and `drop()` with a limit above 2^53-1 throw `RangeError` and close the iterator](https://github.com/tc39/ecma262/pull/3776).

```js
[1, 2]
  .values()
  .take(2 ** 53)
  .toArray();
// v26: [1, 2]
// v27: RangeError: 9007199254740992 must be positive
```

`AsyncIterator.prototype[Symbol.asyncDispose]` now calls `return()` with no arguments instead of one `undefined` argument, as the [explicit resource management proposal specifies](https://github.com/tc39/proposal-explicit-resource-management).

```js
const iterator = {
  next() {
    return Promise.resolve({ done: true });
  },
  return(...args) {
    console.log(`return() is called with ${args.length} argument(s)`);
    return Promise.resolve({ done: true });
  },
};
const AsyncIteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf(Object.getPrototypeOf((async function* () {})()))
);
await AsyncIteratorPrototype[Symbol.asyncDispose].call(iterator);
// v26: return() is called with 1 argument(s)
// v27: return() is called with 0 argument(s)
```

### Changes to Modules

`new import(...).x` is now a `SyntaxError`, like `new import(...)`:

```js
new Function('new import("x").x');
// v26: parses
// v27: SyntaxError: Cannot use new with import
```

A few edge cases ([1](https://issues.chromium.org/issues/515515115), [2](https://issues.chromium.org/issues/559893859)) that used to result in crashes during module loading now reject with appropriate errors instead.

### Changes to Regular expressions

Negative [lookahead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion) and [lookbehind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion) assertions no longer match inside surrogate pairs in `/u` and `/v` mode.

```js
[...'😀😀'.matchAll(/(?!.)/gv)].map(m => m.index);
// v26: [1, 3, 4]
// v27: [4]
[...'😀😀'.matchAll(/(?<!.)/gu)].map(m => m.index);
// v26: [0, 3]
// v27: [0]
```

### Changes to Typed arrays

`TypedArray.prototype.subarray()`, when called on a typed array subclass over a resizable ArrayBuffer, now only passes the buffer and the byte offset to the subclass constructor, and omits the third undefined `length`, as the specification requires, so the new view also follows the length of the buffer.

```js
const calls = [];
class CustomArray extends Uint8Array {
  constructor(...args) {
    calls.push(args.length);
    super(...args);
  }
}
const buffer = new ArrayBuffer(4, { maxByteLength: 8 });
new CustomArray(buffer).subarray(1);
calls[1]; // arguments passed to the constructor of the subarray
// v26: 3
// v27: 2
```

`Float16Array.prototype.indexOf()`, `lastIndexOf()` and `includes()` now support negative values.

```js
const floats = new Float16Array([-1.5, 2]);
floats.includes(-1.5);
// v26: false
// v27: true
```

`TypedArray.prototype.set()` with a negative offset on an immutable buffer now throws `TypeError` before `RangeError`.

```js
// node --js-immutable-arraybuffer
const bytes = new Uint8Array(new ArrayBuffer(4).transferToImmutable());
bytes.set([1], -1);
// v26: RangeError: offset is out of bounds
// v27: TypeError: Cannot perform %TypedArray%.prototype.set on a detached or out-of-bounds or immutable ArrayBuffer
```

### Changes to Syntax and semantics

`await` and `return` inside [static class initialization blocks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks) after instance members are now a `SyntaxError`.

```js
class A { static { return; } }         // SyntaxError in both versions
class B { x = 1; static { return; } }
// v26: parses
// v27: SyntaxError
```

`using` in a C-style `for` loop initializer is now disposed once and treated as immutable, according to the [explicit resource management proposal](https://github.com/tc39/proposal-explicit-resource-management).

```js
let disposed = 0;
let i = 0;
for (
  using x = {
    [Symbol.dispose]() {
      disposed++;
    },
  };
  i < 3;
  i++
) {}
disposed;
// v26: 5
// v27: 1
```

Escaped `get` and `set` as class field names followed by a newline now get automatic semicolon insertion (see [test262#5134](https://github.com/tc39/test262/pull/5134)).

<!-- prettier-ignore -->
```js
class C {
  g\u0065t
  a = 1;
}
Object.keys(new C());
// v26: SyntaxError: Keyword must not contain escaped characters
// v27: ['get', 'a']
```

`delete super[key]` now checks the `this` binding before evaluating `key`.

```js
class B extends Object {
  constructor() {
    delete super[(console.log('key evaluated'), 'k')]; // before super()
    super();
  }
}
new B();
// v26: prints "key evaluated", then throws ReferenceError
// v27: throws ReferenceError without evaluating the key
```

`new Function(...)` now consults the code generation policy before converting arguments.

```js
// node --disallow-code-generation-from-strings
const arg = {
  toString() {
    console.log('toString called');
    return 'x';
  },
};
new Function(arg, 'return x');
// v26: prints "toString called", then throws EvalError
// v27: throws EvalError without calling toString
```

Some extreme use of language features such as overly long template literals, classes with too many elements, `Object.defineProperties` with too many properties, a regexp that is too large to compile etc. now throw `RangeError` instead of crashing the process. This is not guaranteed and should not be relied upon for program logic, however.

## V8 serialization changes in Node.js 27

[`v8.serialize`](https://nodejs.org/api/v8.html#v8serializevalue), [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) and `postMessage` now use a new serialization format that supports typed arrays and resizable ArrayBuffers larger than 4 GB. Older Node.js releases cannot deserialize data serialized by this version and will fail with an "invalid or unsupported version" error on them. This version can still deserialize data serialized by older releases.

The [`v8.cachedDataVersionTag()`](https://nodejs.org/api/v8.html#v8cacheddataversiontag) now changes whenever Node.js applies its own patches on top of V8, not only when the V8 version changes. In addition, the [built-in module compilation cache](https://nodejs.org/api/module.html#module-compile-cache) and cached data from `vm.Script`/`vm.Module` can be invalidated more often across Node.js releases. This improves safety, since a patched V8 can produce different compiled code, but it does introduce more cache misses across Node.js patch and minor releases.

## V8-related memory changes in Node.js 27

- **The default heap size limit is now larger on machines with 4 GB-15 GB of RAM**. When `--max-old-space-size` is not specified, the default maximum heap size is [half of physical memory/cgroup memory limit clamped between 256 MB and 4 GB](https://chromium-review.googlesource.com/c/v8/v8/+/7735918). Previously this was half of physical memory capped at 2 GB, or if the machine has at least 15 GB of RAM it's capped at 4 GB. On an 8 GB machine, the default limit is now 4 GB instead of 2 GB, and on a 6 GB machine it's now 3 GB instead of 2 GB. Applications that relied on the old default to restrict the amount of memory used should set `--max-old-space-size` explicitly.
- **Memory held by Buffers and ArrayBuffers [is now counted in V8's global allocation limit](https://chromium-review.googlesource.com/c/v8/v8/+/7608161).** This changes when garbage collection gets scheduled for applications that allocate a lot of buffers outside the JavaScript heap.
- **Unused bytecode is now flushed based on time instead of garbage collection count.** The bytecode of a function used to be dropped after it had not run for several major garbage collections. It is now dropped after it has not run for 3 minutes, and is recompiled on the next call. This can change the memory usage pattern of applications with a lot of rarely used code.
- **Each native object now uses more memory**: each JavaScript object that wraps a native resource, such as a socket, file handle, stream, hash or blob, may use about 16 bytes more on the JavaScript heap and about 50 bytes more outside the heap.
- [**Each isolate now uses ~90 KB more memory**](https://chromium-review.googlesource.com/c/v8/v8/+/7666718), which increases the memory footprint for applications that create many worker threads.
- **The garbage collection pauses are now shorter in some worst cases**, [reduced from ~45 ms to ~10 ms](https://chromium-review.googlesource.com/c/v8/v8/+/7611758) in V8's benchmarks.
- **Creating an `Error` is now cheaper** because the stack frame details are only computed when `error.stack` is read.
- **There are now fewer full garbage collections at startup.** The heap may grow to [32 MB](https://chromium-review.googlesource.com/c/v8/v8/+/8006508) before the first full collection.

## V8 performance changes in Node.js 27

- **Array**
  - `Array.prototype.flat()` is [faster on large arrays](https://chromium-review.googlesource.com/c/v8/v8/+/7526287).
  - `Array.prototype.copyWithin()` is [faster](https://chromium-review.googlesource.com/c/v8/v8/+/7951657).
  - `Array.prototype.fill()` is faster on [integers](https://chromium-review.googlesource.com/c/v8/v8/+/8177163) and [floating point numbers](https://chromium-review.googlesource.com/c/v8/v8/+/8115306).
  - `Array.prototype.join()` is [faster on arrays of primitives](https://chromium-review.googlesource.com/c/v8/v8/+/8203427), ~5% faster on unipoker from JetStream3.
  - `Array.prototype.lastIndexOf()` is [faster on arrays of floating point numbers](https://chromium-review.googlesource.com/c/v8/v8/+/8255963).
  - `Array.prototype.indexOf()` is [faster on sparse arrays](https://chromium-review.googlesource.com/c/v8/v8/+/8040565).
  - `Array.prototype.sort()` now uses [PowerSort](https://chromium-review.googlesource.com/c/v8/v8/+/7742184) which performs better on adversarial inputs. Sorting small arrays with a comparator is also now [faster](https://chromium-review.googlesource.com/c/v8/v8/+/7791329).
- **Strings**
  - `String.prototype.split()` is faster [when the input does not contain the separator](https://chromium-review.googlesource.com/c/v8/v8/+/7603916).
  - `String.prototype.localeCompare()` is faster on [ASCII strings](https://chromium-review.googlesource.com/c/v8/v8/+/7806670), or [when the default locale is less common](https://chromium-review.googlesource.com/c/v8/v8/+/8252326).
- **Object property access**
  - Reading properties from objects with many properties or deleted properties is [~10% faster on richards](https://chromium-review.googlesource.com/c/v8/v8/+/7679198) and [~20% faster on espree-wtb from JetStream3](https://chromium-review.googlesource.com/c/v8/v8/+/7785916).
  - Code that reads the same property from different object shapes with the same layout, e.g. instances of different classes with the same fields, [remain fast for longer](https://chromium-review.googlesource.com/c/v8/v8/+/8411367) before falling back to the slower lookup.
  - A regression that made objects created for mocking libraries [slower](https://github.com/vitest-dev/vitest/issues/9492) to write [has been fixed](https://chromium-review.googlesource.com/c/v8/v8/+/8397811).
- **Async/promises**
  - awaiting a promise that is already settled is [faster](https://chromium-review.googlesource.com/c/v8/v8/+/7655405) and [allocates less](https://chromium-review.googlesource.com/c/v8/v8/+/8004613).
  - Async generators are [+6% faster for async-fs on JetStream3](https://chromium-review.googlesource.com/c/v8/v8/+/7687450).
  - Async functions that call themselves recursively [get optimized sooner](https://chromium-review.googlesource.com/c/v8/v8/+/7761796).
- **RegExp**
  - Regexps are [compiled to machine code when used for the first time](https://chromium-review.googlesource.com/c/v8/v8/+/8018824) instead of after a warmup. Regexps that are run many times can be faster in execution, but regexps that are created and run only once may be slower due to the compilation cost.
  - V8 [no longer turns off regexp optimization after enough regexps had been compiled](https://chromium-review.googlesource.com/c/v8/v8/+/7743527).
  - Splits on the same string by the same regexp are now [cached](https://chromium-review.googlesource.com/c/v8/v8/+/8173963).
  - Regexp literals are [no longer re-validated when a function is compiled lazily](https://chromium-review.googlesource.com/c/v8/v8/+/7665887), +6% for prismjs-startup-es6 on JetStream3.
- **JSON**
  - `JSON.parse` is now faster on certain inputs, for example [inputs that contain a lot of strings](https://chromium-review.googlesource.com/c/v8/v8/+/7688511) and on [arrays of objects that share the same shape](https://chromium-review.googlesource.com/c/v8/v8/+/8064949).
- **Math and BigInt**
  - Due to the use of LLVM's libm, some `Math` functions may have different performance characteristics compared to previous versions. The impact varies depending on the platform and the specific function.
  - `Math.random()` [is now better optimized](https://chromium-review.googlesource.com/c/v8/v8/+/7813495).
  - Repeated modulo division of BigInt by the same divisor is [25% on JetStream3's bigint-noble-ed25519](https://chromium-review.googlesource.com/c/v8/v8/+/7626739), and [even faster for the primes used by most elliptic curves](https://chromium-review.googlesource.com/c/v8/v8/+/8174846). This may be interesting for pure JavaScript cryptography libraries based on BigInt.
- **Modules and scripts**
  - Source text scanning has been optimized to be [~3.5% faster for code-load](https://chromium-review.googlesource.com/c/v8/v8/+/7928227) Octane.
  - Resolution of names in ESMs with many imports and exports, e.g. bundled ESM chunks [is now faster](https://chromium-review.googlesource.com/c/v8/v8/+/8259941).
- **Maglev**
  - Many improvements have been made to V8's [Maglev optimizing compiler](https://v8.dev/blog/maglev), resulting in better performance for various JavaScript patterns e.g. [+6% for air on JetStream3](https://chromium-review.googlesource.com/c/v8/v8/+/8192917), [+5% for lazy-collections on JetStream3](https://chromium-review.googlesource.com/c/v8/v8/+/8380204).

## V8 WebAssembly changes in Node.js 27

- **asm.js is no longer compiled to WebAssembly.** This means asm.js modules can still run as ordinary JavaScript, but code that depended on asm.js optimizations may be slower, and users will no longer see the "Converted asm.js to WebAssembly" messages.
- `WebAssembly.Function` behind `--experimental-wasm-type-reflection` from [the type reflection proposal](https://github.com/WebAssembly/js-types) was removed.
- `--experimental-wasm-<name>` flags are now renamed `--wasm-<name>`. The old names are no longer accepted.
- `--wasm-lazy-validation` was removed. Invalid functions are now always reported when a module is compiled and this can no longer be disabled.
- `--experimental-wasm-exnref`, `--experimental-wasm-branch-hinting` and `--experimental-wasm-rab-integration` have been removed, as the features they enabled are now always on.
- The `memory.copy` and `memory.fill` instructions, which are typically used in compiled code for `memcpy` and `memset`, are [now inlined in optimized code](https://chromium-review.googlesource.com/c/v8/v8/+/7879404) instead of calling into the runtime, resulting in a ~12% speedup on a bulk memory benchmark.
- Calling exported functions that take or return several reference types is [about twice as fast on a microbenchmark](https://chromium-review.googlesource.com/c/v8/v8/+/8303815).
- `new WebAssembly.Table({ element, initial }, value)` now [fills the table faster](https://chromium-review.googlesource.com/c/v8/v8/+/8176626), and an invalid `value` now throws before the table is allocated.
- On arm64, more optimizations for Wasm SIMD code are now [enabled by default](https://chromium-review.googlesource.com/c/v8/v8/+/7653851). They were previously behind `--wasm-simd-opt`. On x64 these optimizations are not available.

## V8 diagnostics and tooling changes in Node.js 27

### Heap snapshots

Heap snapshots now include more detailed information about the JavaScript heap. **Taking a snapshot can take about twice as long and the file is about twice as large**.

- **Heap snapshots now include internal objects and numeric values.** The `exposeInternals` and `exposeNumericValues` options of `v8.writeHeapSnapshot()` and `v8.getHeapSnapshot()` are ignored and considered always true. This may also increase the size of the snapshots taken.
- **Heap snapshots now contain the full source of every loaded script** instead of only the first 1024 characters. They also include new `scopes`, `scope_context_vars` and `scope_uses` sections that describe which variables each scope uses. Newer DevTools use the scope data to find unused captured variables.
- The global object and the global proxy are now named `global [JSGlobalObject]` and `global [JSGlobalProxy]` instead of `global (global)` and `global (global*)`. Tools that parse the older names from the heap snapshots should be updated.

### CPU and heap profiles

- Function names and URLs are now escaped correctly in profiles serialized as JSON.
- `perf inject` can now see inlined frames from other scripts instead of `[unknown]` when using `--perf-prof`.
- Profile retrieval can be faster by [about 30%](https://chromium-review.googlesource.com/c/v8/v8/+/8449311) due to more efficient use of strings.

### Inspector and debugging

- `Debugger.setInstrumentationBreakpoint` now works for Node.js CommonJS modules.
- New protocol capabilities:
  - `Debugger.evaluateOnCallFrame` accepts a `scopeNumber` to evaluate in an outer scope.
  - Scopes now report an experimental `empty` flag.
- Several crashes that could occur while using the debugger have been fixed.

### Tracing

- In the 27.0.0 alpha build, most V8 trace events now no longer appear in the files written by `--trace-event-categories` due to V8's migration to Perfetto-style macros. Support for building with Perfetto by default is [in progress](https://github.com/nodejs/node/pull/65794). `--trace-gc` and the `gc` entries of `perf_hooks` are not affected. Downstream distributors who build with Perfetto can configure Node.js with `--shared-perfetto` to link to a shared Perfetto SDK.
- The `disabled-by-default-v8.gc` trace category now produces fewer events. The more frequent per-step garbage collection events have been [moved to the `disabled-by-default-v8.gc_extra` category](https://chromium-review.googlesource.com/c/v8/v8/+/8456727).

## Removed and renamed V8 flags in Node.js 27

### Renamed

| Old                                         | New                                            |
| ------------------------------------------- | ---------------------------------------------- |
| `--experimental-wasm-<name>`                | `--wasm-<name>`                                |
| `--experimental-wasm-simd-opt` (arm64 only) | `--future-wasm-simd-opt`                       |
| `--abort-on-contradictory-flags`            | `--flag-processing-mode=abort-on-error`        |
| `--exit-on-contradictory-flags`             | `--flag-processing-mode=exit-on-error`         |
| `--allow-overwriting-for-next-flag`         | `--flag-processing-mode=ignore-contradictions` |

### Removed

- `--js-upsert`
- `--js-regexp-escape`
- `--js-promise-try`
- `--js-error-iserror`
- `--js-base-64`
- `--js-explicit-resource-management`
- `--js-sum-precise`
- `--js-intl-locale-variants`
- `--js-atomics-pause`
- `--js-regexp-duplicate-named-groups`
- `--js-regexp-modifiers`
- `--flush-code-based-on-time`
- `--detailed-error-stack-trace`
- `--heap-profiler-show-hidden-objects`
- `--expose-ignition-statistics`
- `--riscv-c-extension` (RISC-V only)
- `--turbo-compress-frame-translations`
- `--inspector-live-edit`
- `--max-fast-properties`
- `--validate-asm`
- `--wasm-lazy-validation`
