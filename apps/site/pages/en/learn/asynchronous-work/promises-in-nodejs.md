---
title: Promises in Node.js
layout: learn
authors: avivkeller
---

# Promises in Node.js

A **Promise** is a special object in JavaScript that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Think of a Promise as a placeholder for a value that is not yet available but will be in the future.

Think of a Promise like ordering a pizza: you don't get it right away, but the delivery person promises to bring it to you later. You don't know _exactly_ when, but you know the outcome will either be "pizza delivered" or "something went wrong."

## Promise States

A Promise can be in one of three states:

- **Pending**: The initial state, where the asynchronous operation is still running.
- **Fulfilled**: The operation completed successfully, and the Promise is now resolved with a value.
- **Rejected**: The operation failed, and the Promise is settled with a reason (usually an error).

For example, imagine you're waiting for an email from a friend. You're in the pending state. If your friend replies, you've entered the fulfilled state. If the email bounces back, you are in the rejected state.

## Basic Syntax of a Promise

A Promise is created using the `new Promise()` constructor. The constructor takes a function with two parameters: `resolve` and `reject`. These functions are used to transition the Promise from the **pending** state to either **fulfilled** or **rejected**.

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

## Handling Promises with `.then()` and `.catch()`

Once a Promise is created, you can handle the outcome by using the `.then()` and `.catch()` methods.

- `.then()` is used to handle a fulfilled Promise and access its result.
- `.catch()` is used to handle a rejected Promise and catch any errors that may occur.

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
  });
```

## Chaining Promises

One of the great features of Promises is that they allow you to chain multiple asynchronous operations together. When you chain Promises, each `.then()` block waits for the previous one to complete before it runs.

```js
const { setTimeout: delay } = require('node:timers/promises');

const promise1 = delay(1000).then(() => 'First task completed');
const promise2 = delay(1000).then(() => 'Second task completed');

promise1
  .then(result => {
    console.log(result); // 'First task completed'
    return promise2; // Return the second Promise
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
- `await` is used inside an `async` function to pause execution until the Promise is resolved or rejected.

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

In the `performTasks` function, the `await` keyword pauses execution until each Promise is settled (resolved or rejected). This leads to a more linear and readable flow of asynchronous code.

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

### **`Promise.all()`**:

This method takes an array of Promises and resolves them all. It only resolves when all Promises are fulfilled. If any of the Promises is rejected, `Promise.all()` will reject immediately.

`Promise.all()` resolves when all Promises are completed. If you have a large number of Promises, especially in situations like batch processing, it could overwhelm the system's memory.

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

### **`Promise.allSettled()`**:

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

### **`Promise.race()`**:

This method resolves or rejects as soon as the first Promise settles, whether it resolves or rejects.

```js
const { setTimeout: delay } = require('node:timers/promises');

const task1 = delay(2000).then(() => 'Task 1 done');
const task2 = delay(1000).then(() => 'Task 2 done');

Promise.race([task1, task2]).then(result => {
  console.log(result); // 'Task 2 done' (since task2 finishes first)
});
```

### **`Promise.any()`**:

This method resolves as soon as one of the Promises resolves. If all promises are rejected, it will reject with an `AggregateError`.

```js
const { setTimeout: delay } = require('node:timers/promises');

const api1 = delay(2000).then(() => 'API 1 failed');
const api2 = delay(1000).then(() => 'API 2 success');

Promise.any([api1, api2])
  .then(result => {
    console.log(result); // 'API 2 success' (since it resolves first)
  })
  .catch(error => {
    console.error('All promises rejected:', error);
  });
```

### **`Promise.reject()` and `Promise.resolve()`**:

These methods create a rejected or resolved Promise directly.

```js
Promise.resolve('Resolved immediately').then(result => {
  console.log(result); // 'Resolved immediately'
});
```

## Error Handling with Promises

Handling errors in Promises ensures your application behaves correctly in case of unexpected situations.

- You can use `.catch()` to handle any errors or rejections that occur during the execution of Promises.

```js
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error)); // Handles the rejection
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

### **`queueMicrotask()`**

`queueMicrotask()` is used to schedule a microtask, which is a lightweight task that runs after the currently executing script but before any other I/O events or timers. Microtasks include tasks like Promise resolutions and other asynchronous operations that are prioritized over regular tasks.

```js
queueMicrotask(() => {
  console.log('Microtask is executed');
});

console.log('Synchronous task is executed');
```

In the above example, "Microtask is executed" will be logged after "Synchronous task is executed," but before any I/O operations like timers.

### **`process.nextTick()`**

`process.nextTick()` is used to schedule a callback to be executed after the current operation completes, but before any other event loop phases, such as I/O events, timers, or Promises. This is useful for situations where you want to ensure that a callback is executed as soon as possible, but still after the current execution context.

```js
process.nextTick(() => {
  console.log('Next tick callback');
});

console.log('Synchronous task executed');
```

### **`setImmediate()`**:

`setImmediate()` is used to execute a callback after the current event loop cycle finishes and all I/O events have been processed. This means that `setImmediate()` callbacks run after any I/O callbacks, but before timers and the next tick queue.

```js
setImmediate(() => {
  console.log('Immediate callback');
});

console.log('Synchronous task executed');
```

### **When to Use Each**:

- Use `queueMicrotask()` for tasks that need to run immediately after the current script and before any I/O or timer callbacks, typically for Promise resolutions.
- Use `process.nextTick()` for tasks that should execute before any I/O events, often useful for deferring operations or handling errors synchronously.
- Use `setImmediate()` for tasks that should run after I/O events but before timers.

In short, the execution order is as follows:

1. **Synchronous code** (e.g., regular function calls and script code)
2. **`process.nextTick()`** callbacks
3. **Microtasks** (e.g., Promises, `queueMicrotask()`)
4. **Timers** (e.g., `setTimeout()`, `setInterval()`)
5. **I/O callbacks** (e.g., network and file system operations)
6. **`setImmediate()`** callbacks
7. **Close callbacks** (e.g., `socket.on('close')`)
