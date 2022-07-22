---
title: Memory Diagnostics
layout: docs.hbs
---

# Memory

In this document you can learn about how to debug memory related issues.

* [Memory](#memory)
  * [My process runs out of memory](#my-process-runs-out-of-memory)
    * [Symptoms](#symptoms)
    * [Side Effects](#side-effects)
    * [Debugging](#debugging)
  * [My process utilizes memory inefficiently](#my-process-utilizes-memory-inefficiently)
    * [Symptoms](#symptoms-1)
    * [Side Effects](#side-effects-1)
    * [Debugging](#debugging-1)

## My process runs out of memory

Node.js _(JavaScript)_ is a garbage collected language, so having memory
leaks is possible through retainers. As Node.js applications are usually
multi-tenant, business critical, and long-running, providing an accessible and
efficient way of finding a memory leak is essential.

### Symptoms

The user observes continuously increasing memory usage _(can be fast or slow,
over days or even weeks)_ then sees the process crashing and restarting by the
process manager. The process is maybe running slower than before and the
restarts make certain requests to fail _(load balancer responds with 502)_.

### Side Effects

* Process restarts due to the memory exhaustion and request are dropped on the
  floor
* Increased GC activity leads to higher CPU usage and slower response time
  * GC blocking the Event Loop causing slowness
* Increased memory swapping slows down the process (GC activity)
* May not have enough available memory to get a Heap Snapshot

### Debugging

To debug a memory issue we need to be able to see how much space our specific
type of objects take, and what variables retain them to get garbage collected.
For the effective debugging we also need to know the allocation pattern of our
variables over time.

* [Using Heap Profiler](/en/docs/guides/diagnostics/memory/using-heap-profiler/)
* [Using Heap Snapshot](/en/docs/guides/diagnostics/memory/using-heap-snapshot/)
* [GC Traces](/en/docs/guides/diagnostics/memory/using-gc-traces)

## My process utilizes memory inefficiently

### Symptoms

The application uses an unexpected amount of memory and/or we observe elevated
garbage collector activity.

### Side Effects

* An elevated number of page faults
* Higher GC activity and CPU usage

### Debugging

To debug a memory issue we need to be able to see how much space our specific
type of objects take, and what variables retain them to get garbage collected.
For the effective debugging we also need to know the allocation pattern of our
variables over time.

* [Using Heap Profiler](/en/docs/guides/diagnostics/memory/using-heap-profiler/)
* [Using Heap Snapshot](/en/docs/guides/diagnostics/memory/using-heap-snapshot/)
* [GC Traces](/en/docs/guides/diagnostics/memory/using-gc-traces)
