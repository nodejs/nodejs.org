---
title: Collecting code coverage in Node.js
layout: learn
authors: RedYetiDev
---

# Collecting code coverage in Node.js

Node.js provides built-in support for code coverage through its test runner, which can be enabled using the [`--experimental-code-coverage`](https://nodejs.org/api/cli.html#--experimental-test-coverage) flag.

If using the `run()` API, the `coverage` option must be set to `true`. For more information on the `run()` API, see [the `node:test` documentation](https://nodejs.org/docs/latest/api/test.html#runoptions).

## What is code coverage?

Code coverage is a metric for test runners that gauges how much of a program’s source code is executed during testing. It reveals which portions of the codebase are tested and which are not, helping to pinpoint gaps in the test suite. This ensures more comprehensive testing of the software and minimizes the risk of undetected bugs. Typically expressed as a percentage, higher code coverage percentages indicate more thorough test coverage. For a more detailed explanation of code coverage, you can refer to the ["Code coverage" Wikipedia article](https://en.wikipedia.org/wiki/Code_coverage).

## Basic coverage reporting

Let's walk through a simple example to demonstrate how code coverage works in Node.js.

> **Note:** This example, and all other ones in this file, are written using CommonJS. If you are unfamiliar with this concept, please read the [CommonJS Modules](https://nodejs.org/docs/latest/api/modules.html) documentation.

```cjs displayName="main.js"
function add(a, b) {
  return a + b;
}

function isEven(num) {
  return num % 2 === 0;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, isEven, multiply };
```

```cjs displayName="main.test.js"
const { add, isEven } = require('./main.js');
const { test } = require('node:test');

test('add() should add two numbers', t => {
  t.assert.strictEqual(add(1, 2), 3);
});

test('isEven() should report whether a number is even', t => {
  t.assert.ok(isEven(0));
});
```

In the module, we have three functions: `add`, `isEven`, and `multiply`.

In the test file, we are testing the `add()` and `isEven()` functions. Notice that the `multiply()` function is not covered by any tests.

To collect code coverage while running your tests, see the following snippets:

```bash displayName="CLI"
node --experimental-test-coverage --test main.test.js
```
```js displayName="run()"
run({ files: ['main.test.js'], coverage: true });
```

After running the tests, you'll receive a report that looks something like this:

```text displayName="Coverage Report"
✔ add() should add two numbers (1.505987ms)
✔ isEven() should report whether a number is even (0.175859ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 59.480373
ℹ start of coverage report
ℹ -------------------------------------------------------------
ℹ file         | line % | branch % | funcs % | uncovered lines
ℹ -------------------------------------------------------------
ℹ main.js      |  76.92 |   100.00 |   66.67 | 9-11
ℹ main.test.js | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------
ℹ all files    |  86.96 |   100.00 |   80.00 |
ℹ -------------------------------------------------------------
ℹ end of coverage report
```

The coverage report provides a breakdown of how much of your code is covered by tests:

- **Line Coverage**: The percentage of lines executed during the tests.
- **Branch Coverage**: The percentage of code branches (like if-else statements) tested.
- **Function Coverage**: The percentage of functions that have been invoked during testing.

In this example:

- `main.js` shows 76.92% line coverage and 66.67% function coverage because the `multiply()` function was not tested. The uncovered lines (9-11) correspond to this function.
- `main.test.js` shows 100% coverage across all metrics, indicating that the tests themselves were fully executed.

## Including and excluding

When working on applications, you might encounter situations where certain files or lines of code need to be excluded.

Node.js provides mechanisms to handle this, including the use of comments to ignore specific code sections and the CLI to exclude entire patterns.

### Using comments

```cjs displayName="main.js"
function add(a, b) {
  return a + b;
}

function isEven(num) {
  return num % 2 === 0;
}

/* node:coverage ignore next 3 */
function multiply(a, b) {
  return a * b;
}

module.exports = { add, isEven, multiply };
```

```text displayName="Coverage Report"
✔ add() should add two numbers (1.430634ms)
✔ isEven() should report whether a number is even (0.202118ms)
ℹ tests 2
ℹ suites 0
ℹ pass 2
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 60.507104
ℹ start of coverage report
ℹ -------------------------------------------------------------
ℹ file         | line % | branch % | funcs % | uncovered lines
ℹ -------------------------------------------------------------
ℹ main.js      | 100.00 |   100.00 |  100.00 |
ℹ main.test.js | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------
ℹ all files    | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------
ℹ end of coverage report
```

When reporting coverage with this modified `main.js` file, the report will now show 100% coverage across all metrics. This is because the uncovered lines (9-11) have been ignored.

There are multiple ways to ignore sections of code using comments.

```cjs displayName="ignore next"
function add(a, b) {
  return a + b;
}

function isEven(num) {
  return num % 2 === 0;
}

/* node:coverage ignore next 3 */
function multiply(a, b) {
  return a * b;
}

module.exports = { add, isEven, multiply };
```

```cjs displayName="ignore next"
function add(a, b) {
  return a + b;
}

function isEven(num) {
  return num % 2 === 0;
}

/* node:coverage ignore next */
function multiply(a, b) {
  /* node:coverage ignore next */
  return a * b;
  /* node:coverage ignore next */
}

module.exports = { add, isEven, multiply };
```

```cjs displayName="disable"
function add(a, b) {
  return a + b;
}

function isEven(num) {
  return num % 2 === 0;
}

/* node:coverage disable */
function multiply(a, b) {
  return a * b;
}
/* node:coverage enable */

module.exports = { add, isEven, multiply };
```

Each of these different methods will produce the same report, with 100% code coverage across all metrics.

### Using the CLI

Node.js offers two CLI arguments for managing the inclusion or exclusion of specific files in a coverage report.

The [`--test-coverage-include`](https://nodejs.org/api/cli.html#--test-coverage-include) flag (`coverageIncludeGlobs` in the `run()` API) restricts the coverage to files that match the provided glob pattern. By default, files in the `/node_modules/` directory are excluded, but this flag allows you to explicitly include them.

The [`--test-coverage-exclude`](https://nodejs.org/api/cli.html#--test-coverage-exclude) flag (`coverageExcludeGlobs` in the `run()` API) omits files that match the given glob pattern from the coverage report.

These flags can be used multiple times, and when both are used together, files must adhere to the inclusion rules, while also avoiding the exclusion rules.

```text displayName="Directory Structure"
.
├── main.test.js
├── src
│   ├── age.js
│   └── name.js
```

```text displayName="Coverage Report"
ℹ start of coverage report
ℹ -------------------------------------------------------------
ℹ file         | line % | branch % | funcs % | uncovered lines
ℹ -------------------------------------------------------------
ℹ main.test.js | 100.00 |   100.00 |  100.00 |
ℹ src/age.js   |  45.45 |   100.00 |    0.00 | 3-5 7-9
ℹ src/name.js  | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------
ℹ all files    |  88.68 |   100.00 |   75.00 |
ℹ -------------------------------------------------------------
ℹ end of coverage report
```

`src/age.js` has less-than-optimal coverage in the report above, but with the `--test-coverage-exclude` flag (`coverageExcludeGlobs` in the `run()` API), it can be excluded from the report entirely.

```bash displayName="CLI"
node --experimental-test-coverage --test-coverage-exclude=src/age.js --test main.test.js
```
```js displayName="run()"
run({ files: ['main.test.js'], coverage: true, coverageExclude: ['src/age.js'] });
```

```text displayName="New coverage report"
ℹ start of coverage report
ℹ -------------------------------------------------------------
ℹ file         | line % | branch % | funcs % | uncovered lines
ℹ -------------------------------------------------------------
ℹ main.test.js | 100.00 |   100.00 |  100.00 |
ℹ src/name.js  | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------
ℹ all files    | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------
ℹ end of coverage report
```

Our test file is also included in this coverage report, but we only want JavaScript files in the `src/` directory. The `--test-coverage-include` flag (`coverageIncludeGlobs` in the `run()` API) can be used in this case.

```bash displayName="CLI"
node --experimental-test-coverage --test-coverage-include=src/*.js --test main.test.js
```
```js displayName="run()"
run({ files: ['main.test.js'], coverage: true, coverageInclude: ['src/*.js'] });
```

```text displayName="New coverage report"
ℹ start of coverage report
ℹ ------------------------------------------------------------
ℹ file        | line % | branch % | funcs % | uncovered lines
ℹ ------------------------------------------------------------
ℹ src/age.js  |  45.45 |   100.00 |    0.00 | 3-5 7-9
ℹ src/name.js | 100.00 |   100.00 |  100.00 |
ℹ ------------------------------------------------------------
ℹ all files   |  72.73 |   100.00 |   66.67 |
ℹ ------------------------------------------------------------
ℹ end of coverage report
```

## Thresholds

By default, when all tests pass, Node.js exits with code `0`, which indicates a successful execution. However, the coverage report can be configured to exit with code `1` when coverage is failing.

Node.js currently supports thresholds for all three of the coverages supported:

- [`--test-coverage-lines`](https://nodejs.org/api/cli.html#--test-coverage-linesthreshold) (`lineCoverage` in the `run()` API) for line coverage.
- [`--test-coverage-branches`](https://nodejs.org/api/cli.html#--test-coverage-branchesthreshold) (`branchCoverage` in the `run()` API) for branch coverage.
- [`--test-coverage-functions`](https://nodejs.org/api/cli.html#--test-coverage-functionsthreshold) (`functionCoverage` in the `run()` API) for function coverage.

If you wanted to require the previous example to have line coverage >= 90%, you could use the `--test-coverage-lines=90` flag (`lineCoverage: 90` in the `run()` API).

```bash displayName="CLI"
node --experimental-test-coverage --test-coverage-lines=90 --test main.test.js
```
```js displayName="run()"
run({ files: ['main.test.js'], coverage: true, lineCoverage: 90 });
```

```text displayName="Coverage Report"
ℹ start of coverage report
ℹ -------------------------------------------------------------
ℹ file         | line % | branch % | funcs % | uncovered lines
ℹ -------------------------------------------------------------
ℹ main.test.js | 100.00 |   100.00 |  100.00 |
ℹ src/age.js   |  45.45 |   100.00 |    0.00 | 3-5 7-9
ℹ src/name.js  | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------
ℹ all files    |  88.68 |   100.00 |   75.00 |
ℹ -------------------------------------------------------------
ℹ end of coverage report
ℹ Error: 88.68% line coverage does not meet threshold of 90%.
```
