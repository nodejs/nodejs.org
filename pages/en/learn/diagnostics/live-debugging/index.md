---
title: Live Debugging
layout: learn.hbs
---

# Live Debugging

In this document you can learn about how to live debug a Node.js process.

## My application doesn’t behave as expected

### Symptoms

The user may observe that the application doesn’t provide the expected output
for certain inputs, for example, an HTTP server returns a JSON response where
certain fields are empty. Various things can go wrong in the process but in this
use case, we are mainly focused on the application logic and its correctness.

### Debugging

In this use case, the user would like to understand the code path that our
application executes for a certain trigger like an incoming HTTP request. They
may also want to step through the code and control the execution as well as
inspect what values variables hold in memory.

- [Using Inspector](/learn/diagnostics/live-debugging/using-inspector)
