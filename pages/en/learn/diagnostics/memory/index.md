---
title: Memory
layout: learn.hbs
---

# Memory

In this document you can learn about how to debug memory related issues.

## My process runs out of memory

Node.js _(JavaScript)_ is a garbage collected language, so having memory
leaks is possible through retainers. As Node.js applications are usually
multi-tenant, business critical, and long-running, providing an accessible and
efficient way of finding a memory leak is essential.

### Symptoms

The user observes continuously increasing memory usage _(can be fast or slow,
over days or even weeks)_ then sees the process crashing and restarting by the
process manager. The process is maybe running slower than before and the
restarts cause some requests to fail _(load balancer responds with 502)_.

### Side Effects

- Process restarts due to the memory exhaustion and requests are dropped
  on the floor
- Increased GC activity leads to higher CPU usage and slower response time
  - GC blocking the Event Loop causing slowness
- Increased memory swapping slows down the process (GC activity)
- May not have enough available memory to get a Heap Snapshot

## My process utilizes memory inefficiently

### Symptoms

The application uses an unexpected amount of memory and/or we observe elevated
garbage collector activity.

### Side Effects

- An elevated number of page faults
- Higher GC activity and CPU usage

## Debugging

Most memory issues can be solved by determining how much space our specific
type of objects take and what variables are preventing them from being garbage
collected. It can also help to know the allocation pattern of our program over
time.

- [Using Heap Profiler](/learn/diagnostics/memory/using-heap-profiler/)
- [Using Heap Snapshot](/learn/diagnostics/memory/using-heap-snapshot/)
- [GC Traces](/learn/diagnostics/memory/using-gc-traces)
