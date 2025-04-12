---
title: Understanding and Tuning Memory
layout: learn
authors: avivkeller
---

# Understanding and Tuning Memory

Node.js, built on Google's V8 JavaScript engine, offers a powerful runtime for running JavaScript on the server side. However, as your applications grow, managing memory becomes a critical task for maintaining optimal performance and managing problems like memory leaks or crashes. In this article, we'll explore how to monitor, manage, and optimize memory usage within Node.js. We'll also cover important V8 concepts like the heap and garbage collection and discuss how to use command-line flags to fine-tune memory behavior.

## How V8 Manages Memory

At its core, V8 divides memory into several parts, with two primary areas being the **heap** and the **stack**. Understanding these spaces, especially how the heap is managed, is key to improving memory usage in your app.

### The Heap

V8's memory management is based on the generational hypothesis, the idea that most objects die young. Therefore, it separates the heap into generations to optimize garbage collection:

1. **New Space**: This is where new, short-lived objects are allocated. Objects here are expected to "die young", so garbage collection occurs frequently, allowing memory to be reclaimed quickly.

   For example, let's say you have an API that receives 1,000 requests per second. Each request generates a temporary object like `{ name: 'John', age: 30 }`, which is discarded once the request is processed. If you leave the New Space size at the default, V8 will frequently perform minor garbage collections to clear these small objects, ensuring that memory usage remains manageable.

2. **Old Space**: Objects that survive multiple garbage collection cycles in the New Space are promoted to the Old Space. These are usually long-lived objects, such as user sessions, cache data, or persistent state. Because these objects tend to last longer, garbage collection in this space occurs less often but is more resource-intensive.

   Let's say you are running an application that tracks user sessions. Each session might store data like `{ userId: 'abc123', timestamp: '2025-04-10T12:00:00', sessionData: {...} }`, which needs to persist in memory as long as the user is active. As the number of concurrent users grows, the Old Space could fill up, causing out-of-memory errors or slower response times due to inefficient garbage collection cycles.

In V8, memory for JavaScript objects, arrays, and functions is allocated in the **heap**. The size of the heap is not fixed, and exceeding the available memory can result in an "out-of-memory" error, causing your application to crash.

To check the current heap size limit, you can use the `v8` module.

```cjs
const v8 = require('node:v8');
const { heap_size_limit } = v8.getHeapStatistics();
const heapSizeInGB = heap_size_limit / (1024 * 1024 * 1024);

console.log(`${heapSizeInGB} GB`);
```

This will output the maximum heap size in gigabytes, which is based on your system's available memory.

### The Stack

In addition to the heap, V8 also uses the **stack** for memory management. The stack is a region of memory used to store local variables and function call information. Unlike the heap, which is managed by V8's garbage collector, the stack operates on a Last In, First Out (LIFO) principle.

Whenever a function is called, a new frame is pushed onto the stack. When the function returns, its frame is popped off. The stack is much smaller in size compared to the heap, but it is faster for memory allocation and deallocation. However, the stack has a limited size, and excessive use of memory (such as with deep recursion) can result in a **stack overflow**.

## Monitoring Memory Usage

Before tuning memory usage, it's important to understand how much memory your application is consuming. Node.js and V8 provide several tools for monitoring memory usage.

### Using `process.memoryUsage()`

The `process.memoryUsage()` method provides insights into how much memory your Node.js process is using. It returns an object with details like:

- **`rss`** (Resident Set Size): The total memory allocated to your process, including heap and other areas.
- **`heapTotal`**: The total memory allocated for the heap.
- **`heapUsed`**: The memory currently in use within the heap.
- **`external`**: Memory used by external resources like bindings to C++ libraries.
- **`arrayBuffers`**: Memory allocated to various Buffer-like objects.

Here's how to use `process.memoryUsage()` to monitor memory usage in your application:

```javascript
console.log(process.memoryUsage());
```

The output will show how much memory is being used in each area:

```json
{
  "rss": 25837568,
  "heapTotal": 5238784,
  "heapUsed": 3666120,
  "external": 1274076,
  "arrayBuffers": 10515
}
```

By monitoring these values over time, you can identify if memory usage is increasing unexpectedly. For instance, if `heapUsed` steadily grows without being released, it could indicate a memory leak in your application.

## Command-Line Flags for Memory Tuning

Node.js offers several command-line flags to fine-tune memory-related settings, allowing you to optimize memory usage in your application.

### `--max-old-space-size`

This flag sets a limit on the size of the **Old Space** in the V8 heap, where long-lived objects are stored. If your application uses a significant amount of memory, you might need to adjust this limit.

For example, lets say your application handles a steady stream of incoming requests, each of which generates a large object. Over time, if these objects are not cleared, the Old Space could become overloaded, causing crashes or slower response times.

You can increase the Old Space size by setting the `--max-old-space-size` flag:

```bash
node --max-old-space-size=4096 app.js
```

This sets the Old Space size to 4096 MB (4 GB), which is particularly useful if your application is handling a large amount of persistent data, like caching or user session information.

### `--max-semi-space-size`

This flag controls the size of the **New Space** in the V8 heap. New Space is where newly created objects are allocated and garbage collected frequently. Increasing this size can reduce the frequency of minor garbage collection cycles.

For example, if you have an API that receives a large number of requests, each creating small objects like `{ name: 'Alice', action: 'login' }`, you may notice performance degradation due to frequent garbage collection. By increasing the New Space size, you can reduce the frequency of these collections and improve overall performance.

```bash
node --max-semi-space-size=64 app.js
```

This increases the New Space to 64 MB, allowing for more objects to reside in memory before triggering garbage collection. This is particularly useful in high-throughput environments where object creation and destruction are frequent.

### `--gc-interval`

This flag adjusts how frequently garbage collection cycles occur. By default, V8 determines the best interval, but you can override this setting in some scenarios where you need more control over memory cleanup.

For example, in a real-time application like a stock trading platform, you may want to minimize the impact of garbage collection by reducing the frequency of collections, ensuring the application can process data without significant pauses.

```bash
node --gc-interval=100 app.js
```

This setting forces V8 to attempt garbage collection every 100 ms. You may need to adjust this interval for specific use cases, but be cautious: setting the interval too low can cause performance degradation due to excessive garbage collection cycles.

### `--expose-gc`

With the `--expose-gc` flag, you can manually trigger garbage collection from within your application code. This can be helpful in specific scenarios, like after processing a large batch of data, where you want to reclaim memory before continuing with further operations.

To expose `gc`, start your app with:

```bash
node --expose-gc app.js
```

Then, within your application code, you can call `global.gc()` to manually trigger garbage collection:

```javascript
global.gc();
```

Keep in mind that manually triggering garbage collection **does not disable** the normal GC algorithm. V8 will still perform automatic garbage collection as needed. Manual calls are supplemental and should be used with caution, as overuse can negatively impact performance.

## Additional Resources

To dive deeper into how V8 handles memory, check out these posts by the V8 team:

- [Trash talk: the Orinoco garbage collector](https://v8.dev/blog/trash-talk)
- [Orinoco: young generation garbage collection](https://v8.dev/blog/orinoco-parallel-scavenger)

## Putting It All Together

By adjusting settings for the Old Space and New Space sizes, selectively triggering garbage collection, and configuring heap limits, you can optimize your application’s memory usage and improve its overall performance. These tools give you the power to better manage memory in high-demand scenarios and maintain stability as your applications scale.
