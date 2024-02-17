---
title: Tracing garbage collection
layout: learn.hbs
---

# Tracing garbage collection

This guide will go through the fundamentals of garbage collection traces.

By the end of this guide, you'll be able to:

- Enable traces in your Node.js application
- Interpret traces
- Identify potential memory issues in your Node.js application

There's a lot to learn about how the garbage collector works, but if you learn
one thing it's that when GC is running, your code is not.

You may want to know how often and long the garbage collection runs,
and what is the outcome.

## Setup

For the proposal of this guide, we'll use this script:

```js
// script.mjs

import os from 'os';

let len = 1_000_000;
const entries = new Set();

function addEntry() {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };

  entries.add(entry);
}

function summary() {
  console.log(`Total: ${entries.size} entries`);
}

// execution
(() => {
  while (len > 0) {
    addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  }

  summary();
})();
```

> Even if the leak is evident here, finding the source of a leak
> could be cumbersome in the context of a real-world application.

## Running with garbage collection traces

You can see traces for garbage collection in console output of your process
using the `--trace-gc` flag.

```console
$ node --trace-gc script.mjs
```

> Note: you can find the source code of this [exercise][]
> in the Node.js Diagnostics repository.

It should output something like:

```bash
[39067:0x158008000]     2297 ms: Scavenge 117.5 (135.8) -> 102.2 (135.8) MB, 0.8 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2375 ms: Scavenge 120.0 (138.3) -> 104.7 (138.3) MB, 0.9 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2453 ms: Scavenge 122.4 (140.8) -> 107.1 (140.8) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2531 ms: Scavenge 124.9 (143.3) -> 109.6 (143.3) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2610 ms: Scavenge 127.1 (145.5) -> 111.8 (145.5) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2688 ms: Scavenge 129.6 (148.0) -> 114.2 (148.0) MB, 0.8 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2766 ms: Scavenge 132.0 (150.5) -> 116.7 (150.5) MB, 1.1 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
Total: 1000000 entries
```

Hard to read? Maybe we should pass in review a few concepts
and explain the outputs of the `--trace-gc` flag.

### Examining a trace with `--trace-gc`

The `--trace-gc` (or `--trace_gc`, either is fine) flag outputs all garbage collection
events in the console.
The composition of each line can be described as:

```bash
[13973:0x110008000]       44 ms: Scavenge 2.4 (3.2) -> 2.0 (4.2) MB, 0.5 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure
```

| Token value                                           | Interpretation                           |
| ----------------------------------------------------- | ---------------------------------------- |
| 13973                                                 | PID of the running process               |
| 0x110008000                                           | Isolate (JS heap instance)               |
| 44 ms                                                 | The time since the process started in ms |
| Scavenge                                              | Type / Phase of GC                       |
| 2.4                                                   | Heap used before GC in MB                |
| (3.2)                                                 | Total heap before GC in MB               |
| 2.0                                                   | Heap used after GC in MB                 |
| (4.2)                                                 | Total heap after GC in MB                |
| 0.5 / 0.0 ms (average mu = 1.000, current mu = 1.000) | Time spent in GC in ms                   |
| allocation failure                                    | Reason for GC                            |

We'll only focus on two events here:

- Scavenge
- Mark-sweep

The heap is divided into _spaces_. Amongst these, we have a space called
the "new" space and another one called the "old" space.

> 👉 In reality, the heap structure is a bit different, but we'll stick
> to a simpler version for this article. If you want more details
> we encourage you to look at this [talk of Peter Marshall][] about Orinoco.

### Scavenge

Scavenge is the name of an algorithm that will perform garbage collection
into new space. The new space is where objects are created.
The new space is designed to be small and fast for garbage collection.

Let's imagine a Scavenge scenario:

- we allocated `A`, `B`, `C` & `D`.
  ```bash
  | A | B | C | D | <unallocated> |
  ```
- we want to allocate `E`
- not enough space, the memory is exhausted
- then, a (garbage) collection is triggered
- dead objects are collected
- living object will stay
- assuming `B` and `D` were dead
  ```bash
  | A | C | <unallocated> |
  ```
- now we can allocate `E`
  ```bash
  | A | C | E | <unallocated> |
  ```

v8 will promote objects, not garbage collected after two Scavenge
operations to the old space.

> 👉 Full [Scavenge scenario][]

### Mark-sweep

Mark-sweep is used to collect objects from old space. The old space
is where objects that survived the new space are living.

This algorithm is composed of two phases:

- **Mark**: Will mark still alive objects as black and others as white.
- **Sweep**: Scans for white objects and converts them to free spaces.

> 👉 In fact, the Mark and Sweep steps are a bit more elaborate.
> Please read this [document][] for more details.

<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif" alt="mark and sweep algorithm"/>

## `--trace-gc` in action

### Memory leak

Now, if you return quickly to the previous terminal window:
you will see many `Mark-sweep` events in the console.
We also see that the amount of memory collected after
the event is insignificant.

Now that we are experts in garbage collection! What could we deduce?

We probably have a memory leak! But how could we be sure of that?
(Reminder: it is pretty apparent in this example,
but what about a real-world application?)

But how could we spot the context?

### How to get the context of bad allocations

1. Suppose we observe that the old space is continuously increasing.
2. Reduce [`--max-old-space-size`][] such that the total heap is closer to the limit
3. Run the program until you hit the out of memory.
4. The produced log shows the failing context.
5. If it hits OOM, increment the heap size by ~10% and repeat a few times. If the same pattern is observed, it indicates a memory leak.
6. If there is no OOM, then freeze the heap size to that value - A packed heap reduces memory footprint and computation latency.

For example, try to run `script.mjs` with the following command:

```bash
node --trace-gc --max-old-space-size=50 script.mjs
```

You should experience an OOM:

```bash
[...]
<--- Last few GCs --->
[40928:0x148008000]      509 ms: Mark-sweep 46.8 (65.8) -> 40.6 (77.3) MB, 6.4 / 0.0 ms  (+ 1.4 ms in 11 steps since start of marking, biggest step 0.2 ms, walltime since start of marking 24 ms) (average mu = 0.977, current mu = 0.977) finalize incrementa[40928:0x148008000]      768 ms: Mark-sweep 56.3 (77.3) -> 47.1 (83.0) MB, 35.9 / 0.0 ms  (average mu = 0.927, current mu = 0.861) allocation failure scavenge might not succeed
<--- JS stacktrace --->
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory [...]
```

Now, try to it for 100mb:

```bash
node --trace-gc --max-old-space-size=100 script.mjs
```

You should experience something similar, the only difference
should be that the last GC trace will contain a bigger heap size.

```bash
<--- Last few GCs --->
[40977:0x128008000]     2066 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 46.7 / 0.0 ms  (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 47 ms) (average mu = 0.154, current mu = 0.155) allocati[40977:0x128008000]     2123 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 47.7 / 0.0 ms  (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 48 ms) (average mu = 0.165, current mu = 0.175) allocati
```

> Note: In the context of real application, it could be cumbersome to find the leaked object in the code. Heap snapshot could help you to find it. Visit the [guide dedicated to heap snapshot][]

### Slowness

How do you assert whether too many garbage collections
are happening or causing an overhead?

1. Review the trace data, precisely the time between consecutive collections.
2. Review the trace data, specifically around time spent in GC.
3. If the time between two GC is less than the time spent in GC, the application is severely starving.
4. If the time between two GCS and the time spent in GC are very high, probably the application can use a smaller heap.
5. If the time between two GCS is much greater than the time spent in GC, the application is relatively healthy.

## Fix the leak

Now let's fix the leak. Instead of using an object to store
our entries, we could use a file.

Let's modify our script a bit:

```js
// script-fix.mjs
import os from 'os';
import fs from 'fs/promises';

let len = 1_000_000;
const fileName = `entries-${Date.now()}`;

async function addEntry() {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };
  await fs.appendFile(fileName, JSON.stringify(entry) + '\n');
}

async function summary() {
  const stats = await fs.lstat(fileName);
  console.log(`File size ${stats.size} bytes`);
}

// execution
(async () => {
  await fs.writeFile(fileName, '----START---\n');
  while (len > 0) {
    await addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  }

  await summary();
})();
```

Using a `Set` to store data is not a bad practice at all;
you should just care about the memory footprint of your program.

> Note: you can find the source code of this [exercise][]
> in the Node.js Diagnostics repository.

Now, let's execute this script.

```
node --trace-gc script-fix.mjs
```

You should observe two things:

- Mark-sweep events appear less frequently
- the memory footprint doesn't exceed 25MB versus more than 130MB with the first script.

It makes a lot of sense as the new version puts less pressure on
the memory than the first one.

**Takeaway**: What do you think about improving this script?
You probably see that the new version of the script is slow.
What if we use a `Set` again and write its content into a
file only when the memory reaches a specific size?

> [`getheapstatistics`][] API could help you.

## Bonus: Trace garbage collection programmatically

### Using `v8` module

You might want to avoid getting traces from the entire lifetime of your process.
In that case, set the flag from within the process.
The `v8` module exposes an API to put flags on the fly.

```js
import v8 from 'v8';

// enabling trace-gc
v8.setFlagsFromString('--trace-gc');

// disabling trace-gc
v8.setFlagsFromString('--notrace-gc');
```

### Using performance hooks

In Node.js, you can use [performance hooks][] to trace
garbage collection.

```js
const { PerformanceObserver } = require('perf_hooks');

// Create a performance observer
const obs = new PerformanceObserver(list => {
  const entry = list.getEntries()[0];
  /*
  The entry is an instance of PerformanceEntry containing
  metrics of a single garbage collection event.
  For example:
  PerformanceEntry {
    name: 'gc',
    entryType: 'gc',
    startTime: 2820.567669,
    duration: 1.315709,
    kind: 1
  }
  */
});

// Subscribe to notifications of GCs
obs.observe({ entryTypes: ['gc'] });

// Stop subscription
obs.disconnect();
```

### Examining a trace with performance hooks

You can get GC statistics as [PerformanceEntry][] from the callback in
[PerformanceObserver][].

For example:

```ts
PerformanceEntry {
  name: 'gc',
  entryType: 'gc',
  startTime: 2820.567669,
  duration: 1.315709,
  kind: 1
}
```

| Property  | Interpretation                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------ |
| name      | The name of the performance entry.                                                               |
| entryType | The type of the performance entry.                                                               |
| startTime | The high-resolution millisecond timestamp is marking the starting time of the Performance Entry. |
| duration  | The total number of milliseconds elapsed for this entry.                                         |
| kind      | The type of garbage collection operation that occurred.                                          |
| flags     | The additional information about GC.                                                             |

For more information, you can refer to
[the documentation about performance hooks][performance hooks].

[PerformanceEntry]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceentry
[PerformanceObserver]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceobserver
[`--max-old-space-size`]: https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes
[performance hooks]: https://nodejs.org/api/perf_hooks.html
[exercise]: https://github.com/nodejs/diagnostics/tree/main/documentation/memory/step3/exercise
[guide dedicated to heap snapshot]: /learn/diagnostics/memory/using-heap-snapshot#how-to-find-a-memory-leak-with-heap-snapshots
[document]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#marking-state
[Scavenge scenario]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#sample-scavenge-scenario
[talk of Peter Marshall]: https://v8.dev/blog/trash-talk
[`getheapstatistics`]: https://nodejs.org/dist/latest-v16.x/docs/api/v8.html#v8getheapstatistics
