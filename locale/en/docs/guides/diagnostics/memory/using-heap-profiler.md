---
title: Memory Diagnostics - Using Heap Profiler
layout: docs.hbs
---

# Using Heap Profiler

To debug a memory issue we need to be able to see how much space our specific
type of objects take, and what variables retain them to get garbage collected.
For the effective debugging we also need to know the allocation pattern of our
variables over time.

The heap profiler acts on top of V8 towards to bring snapshots of memory over
time. In this document, we will cover the memory profiling using:

1. Allocation Timeline
2. Sampling Heap Profiler

Unlike heap dump that was cover in the [Using Heap Snapshot][],
the idea of using real-time profiling is to understand allocations in a given
time frame.

## Heap Profiler - Allocation Timeline

Heap Profiler is similar to the Sampling Heap Profiler, except it will trace
every allocation. It has higher overhead than the Sampling Heap Profiler so
it’s not recommended to use in production.

> You can use [@mmarchini/observe][] to do it programmatically.

### How To

Start the application:

```console
node --inspect index.js
```

> `--inspect-brk` is an better choice for scripts.

Connect to the dev-tools instance in chrome and then:

* Select `memory` tab
* Select `Allocation instrumentation timeline`
* Start profiling

![heap profiler tutorial step 1][heap profiler tutorial 1]

After it, the heap profiling is running, it is strongly recommended to run
samples in order to identify memory issues, for this example, we will use
`Apache Benchmark` to produce load in the application.

> In this example, we are assuming the heap profiling under web application.

```console
$ ab -n 1000 -c 5 http://localhost:3000
```

Hence, press stop button when the load expected is complete

![heap profiler tutorial step 2][heap profiler tutorial 2]

Then look at the snapshot data towards to memory allocation.

![heap profiler tutorial step 3][heap profiler tutorial 3]

Check the [usefull links](#usefull-links) section for futher information
about memory terminology.

## Sampling Heap Profiler

Sampling Heap Profiler tracks memory allocation pattern and reserved space
over time. As it’s sampling based it has a low enough overhead to use it in
production systems.

> You can use the module [`heap-profiler`][] to do it programmatically.

### How To

Start the application:

```console
$ node --inspect index.js
```

> `--inspect-brk` is an better choice for scripts.

Connect to the dev-tools instance and then:

1. Select `memory` tab
2. Select `Allocation sampling`
3. Start profiling

![heap profiler tutorial 4][heap profiler tutorial 4]

Produce some load and stop the profiler. It will generate a summary with
allocation based in the stacktrace, you can lookup to the functions with more
heap allocations in a timespan, see the example below:

![heap profiler tutorial 5][heap profiler tutorial 5]

## Useful Links

* https://developer.chrome.com/docs/devtools/memory-problems/memory-101/
* https://github.com/v8/sampling-heap-profiler
* https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/

[Using Heap Snapshot]: /en/docs/guides/diagnostics/memory/using-heap-snapshot/
[@mmarchini/observe]: https://www.npmjs.com/package/@mmarchini/observe
[`heap-profiler`]: https://www.npmjs.com/package/heap-profile
[heap profiler tutorial 1]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-1.png
[heap profiler tutorial 2]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-2.png
[heap profiler tutorial 3]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-3.png
[heap profiler tutorial 4]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-4.png
[heap profiler tutorial 5]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-5.png
