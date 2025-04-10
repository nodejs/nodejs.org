---
title: Understanding and Tuning Memory
layout: learn
authors: avivkeller
---

# Understanding and Tuning Memory

Node.js, built on Google’s V8 JavaScript engine, offers a powerful runtime for running JavaScript on the server side. However, as your applications grow, managing memory becomes a critical task for maintaining optimal performance and avoiding problems like memory leaks or crashes. In this article, we’ll explore how to monitor, manage, and optimize memory usage within Node.js. We’ll also cover important V8 concepts like the heap and garbage collection and discuss how to use command-line flags to fine-tune memory behavior.

## How V8 Manages Memory

At its core, V8 divides memory into several parts, with two primary areas being the **heap** and the **stack**. Understanding these spaces, especially how the heap is managed, is key to improving memory usage in your app.

### The Heap

V8 manages memory using two main areas in the heap:

1. **New Space**: This is where new, short-lived objects are allocated. Because objects here are expected to be temporary, garbage collection occurs frequently, allowing memory to be reclaimed quickly.

2. **Old Space**: Objects that survive several garbage collection cycles in the New Space are moved to the Old Space. Since these objects are more persistent, garbage collection in this space occurs less often but is more resource-intensive when it happens.

In V8, memory for JavaScript objects, arrays, and functions is allocated in the **heap**. The size of the heap is not fixed, and exceeding the available memory can result in an "out-of-memory" error, causing your application to crash.

To check the current heap size limit, you can use the `v8` module.

```cjs
const v8 = require('node:v8');
const heapSizeLimit = v8.getHeapStatistics().heap_size_limit;
const heapSizeInGB = heapSizeLimit / (1024 * 1024 * 1024);

console.log(`${heapSizeInGB} GB`);
```

This will output the maximum heap size in gigabytes, which is based on your system's available memory.

### The Stack

In addition to the heap, V8 also uses the **stack** for memory management. The stack is a region of memory used to store local variables and function call information. Unlike the heap, which is managed by V8's garbage collector, the stack operates on a Last In, First Out (LIFO) principle.

Whenever a function is called, a new frame is pushed onto the stack. When the function returns, its frame is popped off. The stack is much smaller in size compared to the heap, but it is faster for memory allocation and deallocation. However, the stack has a limited size, and excessive use of memory (such as with deep recursion) can result in a **stack overflow**.

## Monitoring Memory Usage

Before tuning memory usage, it’s important to understand how much memory your application is consuming. Node.js and V8 provide several tools for monitoring memory usage.

### Using `process.memoryUsage()`

The `process.memoryUsage()` method provides insights into how much memory your Node.js process is using. It returns an object with details like:

- **`rss`** (Resident Set Size): The total memory allocated to your process, including heap and other areas.
- **`heapTotal`**: The total memory allocated for the heap.
- **`heapUsed`**: The memory currently in use within the heap.
- **`external`**: Memory used by external resources like bindings to C++ libraries.
- **`arrayBuffers`**: Memory allocated to various Buffer-like objects.

Here’s an example:

```javascript
console.log(process.memoryUsage());
```

The output will look like:

```json
{
  "rss": 25837568,
  "heapTotal": 5238784,
  "heapUsed": 3666120,
  "external": 1274076,
  "arrayBuffers": 10515
}
```

By monitoring these values over time, you can identify if memory usage increases unexpectedly, a common sign of memory leaks.

## Command-Line Flags for Memory Tuning

Node.js offers several command-line flags that help you fine-tune memory-related settings. Below are some key options you can use to optimize memory usage.

### `--max-old-space-size`

This flag sets a limit on the size of the **Old Space** in the V8 heap, where long-lived objects are stored. If your application uses a significant amount of memory, you might need to adjust this limit.

To increase the Old Space limit to 4 GB, for example, use:

```bash
node --max-old-space-size=4096 app.js
```

This sets the Old Space size to 4096 MB (4 GB), but you should adjust this based on your system's available memory.

### `--max-semi-space-size`

The `--max-semi-space-size` flag controls the size of the **New Space** in the V8 heap. New Space stores newly created objects, which are garbage collected frequently. You can adjust this size if you want to optimize how much memory the New Space can use before triggering garbage collection.

For example:

```bash
node --max-semi-space-size=512 app.js
```

This limits the New Space to 512 MB, which can help optimize garbage collection behavior.

### `--gc-interval`

This flag adjusts how frequently garbage collection cycles occur. V8 uses its internal heuristics by default, but you can change this to control the collection interval.

To set the interval to 100 ms:

```bash
node --gc-interval=100 app.js
```

While this setting is not commonly used, it can be helpful for fine-tuning performance in specific scenarios.

### `--expose-gc`

With the `--expose-gc` flag, you can manually trigger garbage collection from your application code. This is useful in scenarios where you want more control over when garbage collection happens.

To enable it, start your app with:

```bash
node --expose-gc app.js
```

Then, within your code, you can call:

```javascript
global.gc();
```

Keep in mind that forcing garbage collection too frequently can hurt performance, so use this feature sparingly.

By adjusting settings for the Old Space and New Space sizes, triggering garbage collection manually, and configuring heap limits, you can optimize your application’s memory usage and improve its overall performance.
