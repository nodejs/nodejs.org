---
title: Using Heap Profiler
layout: learn.hbs
---

# Using Heap Profiler

The heap profiler acts on top of V8 to capture allocations over time. In this
document, we will cover memory profiling using:

1. Allocation Timeline
2. Sampling Heap Profiler

Unlike heap dumps which were covered in the [Using Heap Snapshot][] guide, the
idea of using real-time profiling is to understand allocations over a period of
time.

## Heap Profiler - Allocation Timeline

Heap Profiler is similar to the Sampling Heap Profiler, except it will trace
every allocation. It has higher overhead than the Sampling Heap Profiler so
it’s not recommended to use in production.

> You can use [@mmarchini/observe][] to start and stop the profiler
> programmatically.

### How To

Start the application:

```console
node --inspect index.js
```

> `--inspect-brk` is a better choice for scripts.

Connect to the dev-tools instance in chrome and then:

- Select the `Memory` tab.
- Select `Allocation instrumentation timeline`.
- Start profiling.

![heap profiler tutorial step 1][heap profiler tutorial 1]

Once the heap profiling is running, it is strongly recommended to run samples
in order to identify memory issues. For example, if we were heap profiling a
web application, we could use `Apache Benchmark` to produce load:

```console
$ ab -n 1000 -c 5 http://localhost:3000
```

Then, press stop button when the load is complete:

![heap profiler tutorial step 2][heap profiler tutorial 2]

Finally, look at the snapshot data:

![heap profiler tutorial step 3][heap profiler tutorial 3]

Check the [useful links](#useful-links) section for further information
about memory terminology.

## Sampling Heap Profiler

Sampling Heap Profiler tracks the memory allocation pattern and reserved space
over time. Since it is sampling based its overhead is low enough to use in
production systems.

> You can use the module [`heap-profiler`][] to start and stop the heap
> profiler programmatically.

### How To

Start the application:

```console
$ node --inspect index.js
```

> `--inspect-brk` is an better choice for scripts.

Connect to the dev-tools instance and then:

1. Select the `Memory` tab.
2. Select `Allocation sampling`.
3. Start profiling.

![heap profiler tutorial 4][heap profiler tutorial 4]

Produce some load and stop the profiler. It will generate a summary with
allocation based on their stacktraces. You can focus on the functions with more
heap allocations, see the example below:

![heap profiler tutorial 5][heap profiler tutorial 5]

## Useful Links

- https://developer.chrome.com/docs/devtools/memory-problems/memory-101/
- https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/

[Using Heap Snapshot]: /learn/diagnostics/memory/using-heap-snapshot/
[@mmarchini/observe]: https://www.npmjs.com/package/@mmarchini/observe
[`heap-profiler`]: https://www.npmjs.com/package/heap-profile
[heap profiler tutorial 1]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-1.png
[heap profiler tutorial 2]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-2.png
[heap profiler tutorial 3]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-3.png
[heap profiler tutorial 4]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-4.png
[heap profiler tutorial 5]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-5.png
