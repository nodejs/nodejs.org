---
title: Asynchronous flow control
layout: learn
authors: aug2uag, ovflowd
---

# Asynchronous flow control

> The material in this post is heavily inspired by [Mixu's Node.js Book](http://book.mixu.net/node/ch7.html).

At its core, JavaScript is designed to be non-blocking on the "main" thread, this is where views are rendered. You can imagine the importance of this in the browser. When the main thread becomes blocked it results in the infamous "freezing" that end users dread, and no other events can be dispatched resulting in the loss of data acquisition, for example.

This creates some unique constraints that only a functional style of programming can cure. This is where callbacks come in to the picture.

However, callbacks can become challenging to handle in more complicated procedures. This often results in "callback hell" where multiple nested functions with callbacks make the code more challenging to read, debug, organize, etc.

```js
async1(function (input, result1) {
  async2(function (result2) {
    async3(function (result3) {
      async4(function (result4) {
        async5(function (output) {
          // Do something with output.
        });
      });
    });
  });
});
```

Of course, in real life there would most likely be additional lines of code to handle `result1`, `result2`, etc., thus, the length and complexity of this issue usually results in code that looks much more messy than the example above.

## The Modern Solution: [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

To solve callback hell, modern JavaScript introduced async and await. This is syntactic sugar built on top of a concept called Promises, allowing you to write asynchronous code that looks and behaves like synchronous code. It makes complex flows much easier to reason about.

- An async function is a function that implicitly returns a Promise.

- The await keyword can only be used inside an async function. It pauses the function's execution and waits for a Promise to be resolved, then resumes with the resolved value.

Let's rewrite the "callback hell" example using async/await. Notice how flat and readable it becomes:

```js
async function performOperations() {
  try {
    const result1 = await async1(input);
    const result2 = await async2(result1);
    const result3 = await async3(result2);
    const result4 = await async4(result3);
    const output = await async5(result4);
    // Do something with output.
  } catch (error) {
    // Handle any error that occurred in the chain.
    console.error(error);
  }
}
```

This code is executed sequentially from top to bottom, just like synchronous code, but without blocking the main thread.

**Thinking in Functions**

Even with async/await, it's useful to structure complex operations as a series of distinct functions. This improves modularity and reusability. A common pattern involves:

1. initiator style / input
2. middleware
3. terminator

**The "initiator style / input" is the first function in the sequence. This function will accept the original input, if any, for the operation. The operation is an executable series of functions, and the original input will primarily be:**

1. variables in a global environment
2. direct invocation with or without arguments
3. values obtained by file system or network requests

Network requests can be incoming requests initiated by a foreign network, by another application on the same network, or by the app itself on the same or foreign network.

A middleware function will return another function, and a terminator function will invoke the callback. The following illustrates the flow to network or file system requests. Here the latency is 0 because all these values are available in memory.

Here’s how we can structure a simple flow using async functions. Each function passes its result to the next.

```js
async function final(someInput) {
  return `${someInput} and terminated.`;
}

async function middleware(someInput) {
  const processedInput = `${someInput}touched by middleware, `;
  return await final(processedInput);
}

async function initiate() {
  const someInput = "hello this is a function, ";
  // We await the result of the entire chain.
  const result = await middleware(someInput);
  console.log(result);
}

initiate();
// Output: hello this is a function, touched by middleware, and terminated.
```

## State management

Functions may or may not be state dependent. State dependency arises when the input or other variable of a function relies on an outside function.

**In this way there are two primary strategies for state management:**

1. passing in variables directly to a function, and
2. acquiring a variable value from a cache, session, file, database, network, or other outside source.

Note, I did not mention global variable. Managing state with global variables is often a sloppy anti-pattern that makes it difficult or impossible to guarantee state. Global variables in complex programs should be avoided when possible.

## Control flow

If an object is available in memory, iteration is possible, and there will not be a change to control flow:

```js
function getSong() {
  let _song = "";
  let i = 100;
  for (i; i > 0; i -= 1) {
    _song += `${i} beers on the wall, you take one down and pass it around, ${i - 1} bottles of beer on the wall\n`;
    if (i === 1) {
      _song += "Hey let's get some more beer";
    }
  }

  return _song;
}

function singSong(_song) {
  if (!_song) throw new Error("song is '' empty, FEED ME A SONG!");
  console.log(_song);
}

const song = getSong();
// this will work
singSong(song);
```

However, if the data exists outside of memory the iteration will no longer work:

```js
function getSong() {
  let _song = "";
  let i = 100;
  for (i; i > 0; i -= 1) {
    setTimeout(function () {
      _song += `${i} beers on the wall, you take one down and pass it around, ${i - 1} bottles of beer on the wall\n`;
      if (i === 1) {
        _song += "Hey let's get some more beer";
      }
    }, 0);
  }

  return _song;
}

function singSong(_song) {
  if (!_song) throw new Error("song is '' empty, FEED ME A SONG!");
  console.log(_song);
}

const song = getSong("beer");
// this will not work
singSong(song);
// Uncaught Error: song is '' empty, FEED ME A SONG!
```

Why did this happen? setTimeout (like file system or network requests) instructs the Node.js event loop to schedule the provided function for execution at a later time. The for loop completes almost instantly, and \_song (which is still an empty string) is returned immediately. The functions scheduled by setTimeout run much later, long after singSong has attempted to use the empty \_song.

The main thread cannot be blocked indefinitely while waiting for I/O or other asynchronous tasks. Fortunately, Promises and async/await provide the mechanisms to explicitly wait for these operations to complete before continuing, allowing us to manage asynchronous control flow effectively.

You will be able to perform almost all of your operations with the following 3 patterns using async/await:

1. **In series:** functions will be executed in a strict sequential order, this one is most similar to `for` loops.

```js
// Simulate an asynchronous operation and return a Promise.
const simulateAsyncOp = (id, durationMs) =>
  new Promise((resolve) => {
    console.log(`[${id}] Starting operation.`);
    setTimeout(() => {
      console.log(`[${id}] Finished operation.`);
      resolve(`Operation ${id} complete.`);
    }, durationMs);
  });

const operations = [
  () => simulateAsyncOp(1, 500),
  () => simulateAsyncOp(2, 200),
  () => simulateAsyncOp(3, 300),
];

// Executes an array of asynchronous functions in series.
async function executeInSeries(asyncFunctions) {
  console.log("\n--- Starting In Series Execution ---");
  for (const fn of asyncFunctions) {
    const result = await fn(); // 'await' pauses here until the Promise resolves.
    console.log(`   Result: ${result}`);
  }
  console.log("--- All In Series operations completed ---");
}

(async () => {
  await executeInSeries(operations);
})();
```

**Applying "In Series": The Beer Song Solution:** The "In Series" pattern is precisely what's needed to fix the song generation, it makes sure that each line is created then added in the correct order.

```js
async function getSong() {
  const _songParts = [];
  for (let i = 100; i > 0; i -= 1) {
    // Await for each line.
    const line = await new Promise((resolve) => {
      setTimeout(() => {
        let currentLine = `${i} beers on the wall, you take one down and pass it around, ${
          i - 1
        } bottles of beer on the wall\n`;
        if (i === 1) {
          currentLine += "Hey let's get some more beer";
        }
        resolve(currentLine);
      }, 0);
    });
    _songParts.push(line);
  }
  return _songParts.join("");
}

function singSong(songContent) {
  if (!songContent) throw new Error("Song is empty, cannot sing!");
  console.log("\n--- Singing the Song ---");
  console.log(songContent);
  console.log("--- Song Finished ---");
}

(async () => {
  const fullSong = await getSong();
  singSong(fullSong);
})();
```

2. **Limited in series:** functions will be executed in a strict sequential order, but with a limit on the number of executions. Useful when you need to process a large list but with a cap on the number of items successfully processed.

```js
// Simulate an asynchronous task.
const processItem = (id) =>
  new Promise((resolve) => {
    const delay = Math.random() * 500 + 50;
    console.log(`[Item ${id}] Starting.`);
    setTimeout(() => {
      console.log(`[Item ${id}] Finished.`);
      resolve(`Item ${id} processed.`);
    }, delay);
  });

// An array of samples
const itemsToProcess = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Processes items within a limit.
async function processLimitedInSeries(items, limit) {
  const queue = [...items];
  const active = new Set(); // Tracks currently running promises.

  console.log(
    `\n--- Starting Limited In Series Execution (Limit: ${limit}) ---`,
  );

  while (queue.length > 0 || active.size > 0) {
    while (active.size < limit && queue.length > 0) {
      const item = queue.shift();
      const promise = processItem(item);
      active.add(promise);
      promise.finally(() => active.delete(promise)); // Remove the Promise from active when done.
    }

    // If all tasks are done or none active to wait for, break.
    if (active.size === 0 && queue.length === 0) break;

    // Wait for at least one active promise to finish.
    if (active.size > 0) {
      await Promise.race(active);
    }
  }
  console.log("--- All Limited In Series operations completed ---");
}

(async () => {
  await processLimitedInSeries(itemsToProcess, 3); // Process 3 items at a time.
})();
```

3. **Full parallel:** when ordering is not an issue, such as firing 5 tasks at a time.

> The name here is a bit misleading because the tasks are fired sequentially and are being handled concurrently, therefore, it is not in parallel.

```js
// A function that returns takes an id and returns a promise.
const processItem = (id) =>
  new Promise((resolve) => {
    const delay = Math.random() * 500 + 50;
    console.log(`[Item ${id}] Starting.`);
    setTimeout(() => {
      console.log(`[Item ${id}] Finished.`);
      resolve(`Item ${id} processed.`);
    }, delay);
  });

// A array of samples.
const itemsToProcess = [1, 2, 3, 4, 5];

async function processInParallel(items) {
  console.log("\n--- Starting Full Parallel Execution ---");

  // Creating an array of promises using processItem().
  const promises = items.map((item) => processItem(item));

  // Await for all the promises to finish.
  const results = await Promise.all(promises);

  console.log("--- All Full Parallel operations completed ---");
  console.log("Results:", results);
}
// Create an async function to await for processInParallel() aside.
(async () => {
  await processInParallel(itemsToProcess);
})();
```

Each has its own use cases, benefits, and issues you can experiment and read about in more detail. Most importantly, remember to modularize your operations and use callbacks! If you feel any doubt, treat everything as if it were middleware!

### Choosing the Right Pattern

- **In Series:** Use when order is critical, or when each task depends on the previous one (e.g., chained database operations).

- **Limited in Series:** Use when you need concurrency but must control resource load or adhere to external rate limits (e.g., API calls to a throttled service).

- **Full Parallel:** Use when operations are independent and can run simultaneously for maximum throughput (e.g., fetching data from multiple unrelated sources).
