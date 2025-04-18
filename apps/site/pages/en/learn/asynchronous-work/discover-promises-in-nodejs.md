---
title: Discover Promises in Node.js
layout: learn
authors: avivkeller
---

# Discover Promises in Node.js

A **Promise** is a special object in JavaScript that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Essentially, a Promise is a placeholder for a value that is not yet available but will be in the future.

Think of a Promise like ordering a pizza: you don't get it right away, but the delivery person promises to bring it to you later. You don't know _exactly_ when, but you know the outcome will either be "pizza delivered" or "something went wrong."

## Promise States

A Promise can be in one of three states:

- **Pending**: The initial state, where the asynchronous operation is still running.
- **Fulfilled**: The operation completed successfully, and the Promise is now resolved with a value.
- **Rejected**: The operation failed, and the Promise is settled with a reason (usually an error).

When you order the pizza, You're in the pending state, hungry and hopeful. If the pizza arrives hot and cheesy, you've entered the fulfilled state. But if the restaurant calls to say they've dropped your pizza on floor, you're in the rejected state.

Regardless of whether your dinner ends in joy or disappointment, once there's a final outcome, the Promise is considered **settled**.

## Basic Syntax of a Promise

One of the most common ways to create a Promise is using the `new Promise()` constructor. The constructor takes a function with two parameters: `resolve` and `reject`. These functions are used to transition the Promise from the **pending** state to either **fulfilled** or **rejected**.

If an error is thrown inside the executor function, the Promise will be rejected with that error.
The return value of the executor function is ignored: only `resolve` or `reject` should be used to settle the Promise.

```js
const myPromise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve('Operation was successful!');
  } else {
    reject('Something went wrong.');
  }
});
```

In the above example:

- If the `success` condition is `true`, the Promise is fulfilled and the value `'Operation was successful!'` is passed to the `resolve` function.
- If the `success` condition is `false`, the Promise is rejected and the error `'Something went wrong.'` is passed to the `reject` function.

## Handling Promises with `.then()`, `.catch()`, and `.finally()`

Once a Promise is created, you can handle the outcome by using the `.then()`, `.catch()`, and `.finally()` methods.

- `.then()` is used to handle a fulfilled Promise and access its result.
- `.catch()` is used to handle a rejected Promise and catch any errors that may occur.
- `.finally()` is used to handle a settled Promise, regardless of whether the Promise resolved or rejected.

```js
const myPromise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve('Operation was successful!');
  } else {
    reject('Something went wrong.');
  }
});

myPromise
  .then(result => {
    console.log(result); // This will run if the Promise is fulfilled
  })
  .catch(error => {
    console.error(error); // This will run if the Promise is rejected
  })
  .finally(() => {
    console.log('The promise has completed'); // This will run when the Promise is settled
  });
```

## Chaining Promises

One of the great features of Promises is that they allow you to chain multiple asynchronous operations together. When you chain Promises, each `.then()` block waits for the previous one to complete before it runs.

```js
const { setTimeout: delay } = require('node:timers/promises');

const promise = delay(1000).then(() => 'First task completed');

promise
  .then(result => {
    console.log(result); // 'First task completed'
    return delay(1000).then(() => 'Second task completed'); // Return a second Promise
  })
  .then(result => {
    console.log(result); // 'Second task completed'
  })
  .catch(error => {
    console.error(error); // If any Promise is rejected, catch the error
  });
```

## Using Async/Await with Promises

One of the best ways to work with Promises in modern JavaScript is using **async/await**. This allows you to write asynchronous code that looks synchronous, making it much easier to read and maintain.

- `async` is used to define a function that returns a Promise.
- `await` is used inside an `async` function to pause execution until a Promise settles.

```js
async function performTasks() {
  try {
    const result1 = await promise1;
    console.log(result1); // 'First task completed'

    const result2 = await promise2;
    console.log(result2); // 'Second task completed'
  } catch (error) {
    console.error(error); // Catches any rejection or error
  }
}

performTasks();
```

In the `performTasks` function, the `await` keyword ensures that each Promise is settled before moving on to the next statement. This leads to a more linear and readable flow of asynchronous code.

Essentially, the code above will execute the same as if the user wrote:

```js
promise1
  .then(function (result1) {
    console.log(result1);
    return promise2;
  })
  .then(function (result2) {
    console.log(result2);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Top-Level Await

When using [ECMAScript Modules](https://nodejs.org/api/esm.html), the module itself is treated as a top-level scope that supports asynchronous operations natively. This means that you can use [`await` at the top level](https://nodejs.org/api/esm.html#top-level-await) without needing an `async` function.

```mjs
import { setTimeout as delay } from 'node:timers/promises';

await delay(1000);
```

Async/await can be much more intricate than the simple examples provided. James Snell, a member of the Node.js Technical Steering Committee, has an [in-depth presentation](https://www.youtube.com/watch?v=XV-u_Ow47s0) that explores the complexities of Promises and async/await.

## Promise-based Node.js APIs

Node.js provides **Promise-based versions** of many of its core APIs, especially in cases where asynchronous operations were traditionally handled with callbacks. This makes it easier to work with Node.js APIs and Promises, and reduces the risk of "callback hell."

For example, the `fs` (file system) module has a Promise-based API under `fs.promises`:

```js
const fs = require('node:fs').promises;
// Or, you can import the promisified version directly:
// const fs = require('node:fs/promises');

async function readFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFile();
```

In this example, `fs.promises.readFile()` returns a Promise, which we handle using `async/await` syntax to read the contents of a file asynchronously.

## Advanced Promise Methods

JavaScript's `Promise` global provides several powerful methods that help manage multiple asynchronous tasks more effectively:

### `Promise.all()`

This method accepts an array of Promises and returns a new Promise that resolves once all the Promises are fulfilled. If any Promise is rejected, `Promise.all()` will immediately reject. However, even if rejection occurs, the Promises continue to execute. When handling a large number of Promises, especially in batch processing, using this function can strain the system's memory.

```js
const { setTimeout: delay } = require('node:timers/promises');

const fetchData1 = delay(1000).then(() => 'Data from API 1');
const fetchData2 = delay(2000).then(() => 'Data from API 2');

Promise.all([fetchData1, fetchData2])
  .then(results => {
    console.log(results); // ['Data from API 1', 'Data from API 2']
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### `Promise.allSettled()`

This method waits for all promises to either resolve or reject and returns an array of objects that describe the outcome of each Promise.

```js
const promise1 = Promise.resolve('Success');
const promise2 = Promise.reject('Failed');

Promise.allSettled([promise1, promise2]).then(results => {
  console.log(results);
  // [ { status: 'fulfilled', value: 'Success' }, { status: 'rejected', reason: 'Failed' } ]
});
```

Unlike `Promise.all()`, `Promise.allSettled()` does not short-circuit on failure. It waits for all promises to settle, even if some reject. This provides better error handling for batch operations, where you may want to know the status of all tasks, regardless of failure.

### `Promise.race()`

This method resolves or rejects as soon as the first Promise settles, whether it resolves or rejects. Regardless of which promise settles first, all promises are fully executed.

```js
const { setTimeout: delay } = require('node:timers/promises');

const task1 = delay(2000).then(() => 'Task 1 done');
const task2 = delay(1000).then(() => 'Task 2 done');

Promise.race([task1, task2]).then(result => {
  console.log(result); // 'Task 2 done' (since task2 finishes first)
});
```

### `Promise.any()`

This method resolves as soon as one of the Promises resolves. If all promises are rejected, it will reject with an `AggregateError`.

```js
const { setTimeout: delay } = require('node:timers/promises');

const api1 = delay(2000).then(() => 'API 1 success');
const api2 = delay(1000).then(() => 'API 2 success');
const api3 = delay(1500).then(() => 'API 3 success');

Promise.any([api1, api2, api3])
  .then(result => {
    console.log(result); // 'API 2 success' (since it resolves first)
  })
  .catch(error => {
    console.error('All promises rejected:', error);
  });
```

### `Promise.reject()` and `Promise.resolve()`

These methods create a rejected or resolved Promise directly.

```js
Promise.resolve('Resolved immediately').then(result => {
  console.log(result); // 'Resolved immediately'
});
```

### `Promise.try()`

`Promise.try()` is a method that executes a given function, whether it's synchronous or asynchronous, and wraps the result in a promise. If the function throws an error or returns a rejected promise, `Promise.try()` will return a rejected promise. If the function completes successfully, the returned promise will be fulfilled with its value.

This can be particularly useful for starting promise chains in a consistent way, especially when working with code that might throw errors synchronously.

```js
function mightThrow() {
  if (Math.random() > 0.5) {
    throw new Error('Oops, something went wrong!');
  }
  return 'Success!';
}

Promise.try(mightThrow)
  .then(result => {
    console.log('Result:', result);
  })
  .catch(err => {
    console.error('Caught error:', err.message);
  });
```

In this example, `Promise.try()` ensures that if `mightThrow()` throws an error, it will be caught in the `.catch()` block, making it easier to handle both sync and async errors in one place.

### `Promise.withResolvers()`

This method creates a new promise along with its associated resolve and reject functions, and returns them in a convenient object. This is used, for example, when you need to create a promise but resolve or reject it later from outside the executor function.

```js
const { promise, resolve, reject } = Promise.withResolvers();

setTimeout(() => {
  resolve('Resolved successfully!');
}, 1000);

promise.then(value => {
  console.log('Success:', value);
});
```

In this example, `Promise.withResolvers()` gives you full control over when and how the promise is resolved or rejected, without needing to define the executor function inline. This pattern is commonly used in event-driven programming, timeouts, or when integrating with non-promise-based APIs.

## Error Handling with Promises

Handling errors in Promises ensures your application behaves correctly in case of unexpected situations.

- You can use `.catch()` to handle any errors or rejections that occur during the execution of Promises.

```js
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error)) // Handles the rejection
  .finally(error => console.log('Promise completed')); // Runs regardless of promise resolution
```

- Alternatively, when using `async/await`, you can use a `try/catch` block to catch and handle errors.

```js
async function performTask() {
  try {
    const result = await myPromise;
    console.log(result);
  } catch (error) {
    console.error(error); // Handles any errors
  } finally {
    // This code is executed regardless of failure
    console.log('performTask() completed');
  }
}

performTask();
```

## Scheduling Tasks in the Event Loop

In addition to Promises, Node.js provides several other mechanisms for scheduling tasks in the event loop.

### `queueMicrotask()`

`queueMicrotask()` is used to schedule a microtask, which is a lightweight task that runs after the currently executing script but before any other I/O events or timers. Microtasks include tasks like Promise resolutions and other asynchronous operations that are prioritized over regular tasks.

```js
queueMicrotask(() => {
  console.log('Microtask is executed');
});

console.log('Synchronous task is executed');
```

In the above example, "Microtask is executed" will be logged after "Synchronous task is executed," but before any I/O operations like timers.

### `process.nextTick()`

`process.nextTick()` is used to schedule a callback to be executed immediately after the current operation completes. This is useful for situations where you want to ensure that a callback is executed as soon as possible, but still after the current execution context.

```js
process.nextTick(() => {
  console.log('Next tick callback');
});

console.log('Synchronous task executed');
```

### `setImmediate()`

`setImmediate()` is used to execute a callback after the current event loop cycle finishes and all I/O events have been processed. This means that `setImmediate()` callbacks run after any I/O callbacks, but before timers.

```js
setImmediate(() => {
  console.log('Immediate callback');
});

console.log('Synchronous task executed');
```

### When to Use Each

- Use `queueMicrotask()` for tasks that need to run immediately after the current script and before any I/O or timer callbacks, typically for Promise resolutions.
- Use `process.nextTick()` for tasks that should execute before any I/O events, often useful for deferring operations or handling errors synchronously.
- Use `setImmediate()` for tasks that should run after I/O events but before timers.

Because these tasks execute outside of the current synchronous flow, uncaught exceptions inside these callbacks won't be caught by surrounding `try/catch` blocks and may crash the application if not properly managed (e.g., by attaching `.catch()` to Promises or using global error handlers like `process.on('uncaughtException')`).

For more information on the Event Loop, and the execution order of various phases, please see the related article, [The Node.js Event Loop](/learn/asynchronous-work/event-loop-timers-and-nexttick).
