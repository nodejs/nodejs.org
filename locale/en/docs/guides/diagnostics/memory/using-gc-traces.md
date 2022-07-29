---
title: Memory Diagnostics - Using GC Trace
layout: docs.hbs
---

# Tracing garbage collection

There's a lot to learn about how the garbage collector works, but if you learn
one thing it's that when GC is running, your code is not.

You may want to know how often and how long the garbage collection is running,
and what is the outcome.

## Running with garbage collection traces

You can see traces for garbage collection in console output of your process
using the `--trace_gc` flag.

```console
$ node --trace_gc app.js
```

You might want to avoid getting traces from the entire lifetime of your
process. In that case, you can set the flag from within the process, and switch
it off once the need for tracing is over. For example, here's how to print GC
events to stdout for one minute:

```js
const v8 = require('v8');
v8.setFlagsFromString('--trace_gc');
setTimeout(() => { v8.setFlagsFromString('--notrace_gc'); }, 60e3);
```

### Examining a trace with `--trace_gc`

The output traces look like the following:

```
[19278:0x5408db0]  44 ms: Scavenge 2.3 (3.0) -> 1.9 (4.0) MB, 1.2 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure

[23521:0x10268b000]  120 ms: Mark-sweep 100.7 (122.7) -> 100.6 (122.7) MB, 0.15 / 0.0 ms  (average mu = 0.132, current mu = 0.137) deserialize GC in old space requested
```

Let's look at the second line. Here is how to interpret the trace data:

<table>
  <tr>
    <th>Token value</th>
    <th>Interpretation</th>
  </tr>
  <tr>
    <td>23521</td>
    <td>PID of the running process</td>
  </tr>
  <tr>
    <td>0x10268db0</td>
    <td>Isolate (JS heap instance)</td>
  </tr>
  <tr>
    <td>120</td>
    <td>Time since the thread start in ms</td>
  </tr>
  <tr>
    <td>Mark-sweep</td>
    <td>Type / Phase of GC</td>
  </tr>
  <tr>
    <td>100.7</td>
    <td>Heap used before GC in MiB</td>
  </tr>
  <tr>
    <td>122.7</td>
    <td>Total heap before GC in MiB</td>
  </tr>
  <tr>
    <td>100.6</td>
    <td>Heap used after GC in MiB</td>
  </tr>
  <tr>
    <td>122.7</td>
    <td>Total heap after GC in MiB</td>
  </tr>
  <tr>
    <td>0.15</td>
    <td>Time spent in GC in ms</td>
  </tr>
  <tr>
    <td>0.0</td>
    <td>Time spent in GC callbacks in ms</td>
  </tr>
  <tr>
    <td>(average mu = 0.132, current mu = 0.137)</td>
    <td>Mutator utilization (from 0-1)</td>
  <tr>
    <td>deserialize GC in old space requested</td>
    <td>Reason for GC</td>
  </tr>
</table>

## Using performance hooks to trace garbage collection

In Node.js, you can use [performance hooks][] to trace
garbage collection.

```js
const { PerformanceObserver } = require('perf_hooks');

// Create a performance observer
const obs = new PerformanceObserver((list) => {
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

<table>
  <tr>
    <th>Property</th>
    <th>Interpretation</th>
  </tr>
  <tr>
    <td>name</td>
    <td>The name of the performance entry.</td>
  </tr>
  <tr>
    <td>entryType</td>
    <td>The type of the performance entry. </td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>The high resolution millisecond timestamp <br/> marking the starting time of the Performance Entry.</td>
  </tr>
  <tr>
    <td>duration</td>
    <td>The total number of milliseconds elapsed for this entry. </td>
  </tr>
  <tr>
    <td>kind</td>
    <td>The type of garbage collection operation that occurred.</td>
  </tr>
  <tr>
    <td>flags</td>
    <td>Additional information about garbage collection operation.</td>
  </tr>
</table>

For more information, you can refer to
[the documentation about performance hooks][performance hooks].

## Examples of diagnosing memory issues with trace option:

A. How to get context of bad allocations
1. Suppose we observe that the old space is continuously increasing.
2. But due to heavy GC, the heap maximum is not hit, but the process is slow.
3. Review the trace data and figure out how much is the total heap before and
   after the GC.
4. Reduce [`--max-old-space-size`][] such that the total heap is closer to the
   limit.
5. Allow the program to run and run out-of-memory.
6. The produced log shows the failing context.

B. How to assert whether there is a memory leak when heap growth is observed
1. Suppose we observe that the old space is continuously increasing.
2. Due to heavy GC, the heap maximum is not hit, but the process is slow.
3. Review the trace data and figure out how much is the total heap before and
   after the GC.
4. Reduce [`--max-old-space-size`][] such that the total heap is closer to the
   limit.
5. Allow the program to run, see if it hits the out of memory.
6. If it hits out-of-memory, increment the heap size by ~10% or so and repeat
   few times. If the same pattern is observed, it is indicative of a memory
   leak.
7. If there is no out-of-memory error, then freeze the heap size to that value.
   A packed heap reduces memory footprint and compaction latency.

C. How to assert whether too many GCs are happening or too many GCs are causing
   an overhead
1. Review the trace data, specifically around time between consecutive GCs.
2. Review the trace data, specifically around time spent in GC.
3. If the time between two GC is less than the time spent in GC, the
   application is severely starving.
4. If the time between two GCs and the time spent in GC is very high,
   the application can probably use a smaller heap.
5. If the time between two GCs is much greater than the time spent in GC,
   the application is relatively healthy.

[PerformanceEntry]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceentry
[PerformanceObserver]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceobserver
[`--max-old-space-size`]: https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes
[performance hooks]: https://nodejs.org/api/perf_hooks.html
