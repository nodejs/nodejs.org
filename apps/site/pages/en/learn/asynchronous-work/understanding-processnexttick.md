---
title: Understanding process.nextTick()
layout: learn
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, ovflowd, marksist300
---

# Understanding process.nextTick()

As you try to understand the Node.js event loop, one important part of it is `process.nextTick()`.
Every time the runtime calls back into JavaScript for an event, we call it a tick.

When we pass a function to `process.nextTick()`, we schedule it to run immediately after the current call stack completes, before the event loop continues and before any other queued tasks or phases are processed:

```js
process.nextTick(() => {
  // do something
});
```

The event loop is busy processing the current function code. When this operation ends, the JS engine runs all the functions passed to `nextTick` calls during that operation.

It's the way we can tell the JS engine to process a function asynchronously (after the current function), but as soon as possible, not queue it.

Calling `setTimeout(() => {}, 0)` will execute the function at the end of next tick, much later than when using `nextTick()` which prioritizes the call and executes it just before the beginning of the next tick.

Use `nextTick()` when you want to make sure that in the next event loop iteration that code is already executed.

To learn more about the order of execution and how the event loop works, check out [the dedicated article](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
