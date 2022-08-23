---
title: Memory Diagnostics - Using GC Trace
layout: docs.hbs
---

# 追踪垃圾回收

本指南将贯穿所有关于垃圾回收跟踪机制的基础部分。

当你完成本章节阅读之后，你将会了解：
* 如何在 Node.js 应用程序中启用跟踪
* 解析跟踪信息
* 识别可能潜在 Node.js 应用程序内与内存相关的问题

垃圾回收是如何工作的，实在有太多的东西需要学习。但有一点必须清楚：那便是当 GC 运行
的时候，你的代码是不工作的。

或许你想知道垃圾回收运行的频率，以及需要运行多久，以及结果是什么。

## 脚本构建

为本章讲解之目的，我们将使用以下脚本：

```js
// script.mjs
import os from 'os';
let len = 1_000_000;
const entries = new Set();
function addEntry () {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };
  entries.add(entry);
}
function summary () {
  console.log(`Total: ${entries.size} entries`);
}
// execution
(() => {
  while (len > 0) {
    addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  };
  summary();
})();
```

> 在此即便内存泄露是明显的，但若想找出泄露的源头，在实际的应用程序
> 环境中仍然是非常复杂的。

## 如何运行垃圾回收追踪

你可以借助 `--trace-gc` 在控制台输出中看到垃圾回收追踪的信息情况。

```console
$ node --trace-gc script.mjs
```

> 注意：你可以在 Node.js 症状分析的[练习][]中找到相关源码。

运行之后，输出如下效果：

``` bash
[39067:0x158008000]     2297 ms: Scavenge 117.5 (135.8) -> 102.2 (135.8) MB, 0.8 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2375 ms: Scavenge 120.0 (138.3) -> 104.7 (138.3) MB, 0.9 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2453 ms: Scavenge 122.4 (140.8) -> 107.1 (140.8) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2531 ms: Scavenge 124.9 (143.3) -> 109.6 (143.3) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2610 ms: Scavenge 127.1 (145.5) -> 111.8 (145.5) MB, 0.7 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2688 ms: Scavenge 129.6 (148.0) -> 114.2 (148.0) MB, 0.8 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000]     2766 ms: Scavenge 132.0 (150.5) -> 116.7 (150.5) MB, 1.1 / 0.0 ms  (average mu = 0.994, current mu = 0.994) allocation failure
Total: 1000000 entries
```

是否感到不太容易读？我们应该对一些基本的概念有所了解，并使用 `--trace-gc` 进
行解析。

### 使用 `--trace-gc` 检查追踪

`--trace-gc`（ `--trace_gc` 也可） 将把所有和垃圾回收事件相关的信息在控制台上如数输出。
每一行的构成部分可作如下解释：

```bash
[13973:0x110008000]       44 ms: Scavenge 2.4 (3.2) -> 2.0 (4.2) MB, 0.5 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure
```

| 值                                          |           解析说明 |
|-------------------------------------------------------|------------------------------------------|
| 13973                                                 | 运行中进程的编号 |
| 0x110008000                                           | 独立内存地址 （JS 堆实例） |
| 44 ms                                                 | 自开始运行的时间（毫秒） |
| Scavenge                                              | 类型 / GC 阶段 |
| 2.4                                                   | GC 运行前占有内存（MiB） |
| (3.2)                                                 | GC 运行前总占有内存（MiB） |
| 2.0                                                   | GC 运行后占有内存（MiB） |
| (4.2)                                                 | GC 运行后总占有内存（MiB） |
| 0.5 / 0.0 ms (average mu = 1.000, current mu = 1.000) | GC 花费的时间（ms） |
| allocation failure                                    | GC 具体原因 |

在此我们只需关注两件事：
* Scavenge
* 标记—清除

内存堆被分割成了若干 _区间_ 块。在这些区间块里边，我们有“新”区间，还有“旧”区间。

> 👉 实际上，堆的结构本文表述有差异，但我们为了简化期间而故意为之。
> 如果你想了解更多的细节，我们建议你看 [talk of Peter Marshall][]。
### Scavenge

“Scavenge” 是一种算法的名称，它将执行垃圾回收，并把无用空间转化成可用的新空间。
新空间就是新对象存放的地方。新空间被设计成又小又快的样子，以便于垃圾回收。

我们假设以下使用了 Scavenge 的场景：

* 我们分配了 `A`, `B`, `C` 和 `D` 四块内存变量
  ```bash
  | A | B | C | D | <unallocated> |
  ```
* 我们继续想要分配 `E`
* 可用空间不够，内存耗尽了
* 然后垃圾回收机制被触发
* 无用的对象被回收了
* 可用对象仍然得到保留
* 假设 `B` 和 `D` 是无用对象，那么回收后如下所示
  ```bash
  | A | C | <unallocated> |
  ```
* 现在我们就可以为对象 `E` 分配空间了
  ```bash
  | A | C | E | <unallocated> |
  ```

v8 会提升对象，因此对无用空间进行两次 Scavenge 操作之后不再进行垃圾收集。

> 👉 参考这里完整的 [Scavenge 情形][]。
### 标记—清除
“标记—清除”用于从旧空间收集对象，“旧空间”指新空间中幸存下来的物体居住的地方。

该算法分成两个阶段：
* **标记**: 把“可用对象”（活对象）标记成黑，其余则为白。
* **清除**: 扫描收集所有白色区域，并回收它们转换成为可用空间。

> 👉 实际上，“标记—清除”仍然有一些东西值得说道。请阅读此[文档][]以便于了解更多详情。
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif" alt="mark and sweep algorithm"/>

## `--trace-gc` 参数实际作用

### 内存泄露

现在如果你快速回头看前一个中断控制台窗口，你会发现许多 `Mark-sweep` 事件的输出。
与此同时我们也观察到在这事件变得不再重要的时候，相关内存被收集了。

现在我们是垃圾收集方面的专家了！我们可以得出什么推论？

我们或许有内存泄露问题，但我们如何确定呢（友情提示：这个示例中很明显，但对于一个现实世界里
的程序呢）？

同时我们又如何观察上下文？

### 如何捕获糟糕的内存分配上下文？
1. 假设我们观察到旧内存持续不断地增长
2. 反复使用 [`--max-old-space-size`][]，直到堆内存接近于极限值
3. 运行程序，直到触发“内存耗尽”的提示。
4. 这将记录下内存获取失败的上下文信息
5. 如果触发了“内存耗尽”，不断提高堆的大小（每次10%），尝试数次之后如仍观察到此现象的发生，这意味着内存存在泄露。
6. 如果无法触发“内存耗尽”，保持你的堆栈大小固定成那个值——因为一个被压缩的堆减少了内存空间量，以及计算过程中的延迟。

打个比方。请使用如下的命令运行 `script.mjs` ：

```bash
node --trace-gc --max-old-space-size=50 script.mjs
```

你应该会遇到如下信息的“内存耗尽”：

```bash
[...]
<--- Last few GCs --->
[40928:0x148008000]      509 ms: Mark-sweep 46.8 (65.8) -> 40.6 (77.3) MB, 6.4 / 0.0 ms  (+ 1.4 ms in 11 steps since start of marking, biggest step 0.2 ms, walltime since start of marking 24 ms) (average mu = 0.977, current mu = 0.977) finalize incrementa[40928:0x148008000]      768 ms: Mark-sweep 56.3 (77.3) -> 47.1 (83.0) MB, 35.9 / 0.0 ms  (average mu = 0.927, current mu = 0.861) allocation failure scavenge might not succeed
<--- JS stacktrace --->
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory [...]
```

现在请调整堆大小至 100mb：

```bash
node --trace-gc --max-old-space-size=100 script.mjs
```

你应该遇到相似的情况，只不过最后的 GC 跟踪记录包含一个较大的堆空间。

```bash
<--- Last few GCs --->
[40977:0x128008000]     2066 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 46.7 / 0.0 ms  (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 47 ms) (average mu = 0.154, current mu = 0.155) allocati[40977:0x128008000]     2123 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 47.7 / 0.0 ms  (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 48 ms) (average mu = 0.165, current mu = 0.175) allocati
```

> 请注意：在实际应用程序的上下文中，通过代码寻找泄露对象非常困难。不过“堆捕获”可以帮助到你，详情请看[堆捕获相关指南][]。
### 速度慢

如何确定你的内存回收次数太多，亦或者导致性能损耗？
1. 观察跟踪的数据，尤其是在连续不断的内存回收之间的时间。
2. 观察跟踪的数据，尤其是在 GC 发生前后的时间。
3. 如果两次 GC 间的时间小于执行一次 GC 所用时间，说明该程序内存严重不足。
4. 如果两次 GC 间的时间和执行一次 GC 所用时间都异常高，说明该程序使用的内存小了些。
5. 如果两次 GC 间的时间远大于执行一次 GC 所用时间，程序就相对来说很健康。

## 如何修复内存泄露

现在让我们修复这个问题吧。我们将用一个文件，而不是一个对象来存储相关信息。

我们对脚本做一点如下的修改:

```js
// script-fix.mjs
import os from 'os';
import fs from 'fs/promises';
let len = 1_000_000;
const fileName = `entries-${Date.now()}`;
async function addEntry () {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };
  await fs.appendFile(fileName, JSON.stringify(entry) + '\n');
}
async function summary () {
  const stats = await fs.lstat(fileName);
  console.log(`File size ${stats.size} bytes`);
}
// execution
(async () => {
  await fs.writeFile(fileName, "----START---\n");
  while (len > 0) {
    await addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  };
  await summary();
})();
```
使用一个 `Set` 来存储数据在实践中并不坏。你应该关心你程序所留下的内存相关信息。

> 注意：你可以在 Node.js 症状分析的[练习][]中找到相关源码。

现在则是我们执行该脚本的时候：

```
node --trace-gc script-fix.mjs
```

你应该观察到两件事情：
* “标记—清除” 事件频率减少
* 与之前（第一个脚本）相比内存占用超过 130MB 而言，本次内存相关记录显示不超过 25MB。

相对于第一个脚本而言，新版本的脚本在内存上施加的压力更小，自然更容易甄别出。

**拓展**: 你如何考虑提升这个脚本？或许你已经注意到这个新版本的脚本太慢了。
如果我们再次使用 `Set` ，仅当内存占用达到某个程度大小的时候再把内容一次性地写入文件？

> 使用 [`getheapstatistics`][] API 或许可以帮到你
## 加分项: 通过代码跟踪垃圾收集

### 使用 `v8` 模块

或许你并不像跟踪整个程序完整的信息。如果是这样的话，在程序中设置你的标记即可。
 `v8` 模块公开了一个 API 可以让你立即设置参数：

```js
import v8 from 'v8';
// enabling trace-gc
v8.setFlagsFromString('--trace-gc');
// disabling trace-gc
v8.setFlagsFromString('--notrace-gc');
```

### 使用“性能钩子”

Node.js 里你还可以使用 [性能钩子][] 来追踪垃圾回收信息。

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
### 使用“性能钩子”检查一个跟踪信息

你可以通过 [PerformanceObserver][]，从回调函数中得到一个诸如 [PerformanceEntry][] 一样的信息。

举个例子：

```ts
PerformanceEntry {
  name: 'gc',
  entryType: 'gc',
  startTime: 2820.567669,
  duration: 1.315709,
  kind: 1
}
```

| 属性名  | 解释 |
|-----------|------------------------------------|
| name      | 性能名称  |
| entryType | 性能类型  |
| startTime | 回收开始时间（单位：高精度毫秒时间戳） |
| duration  | 本次回收总时间（单位：毫秒） |
| kind      | 本次垃圾收集的类型 |
| flags     | 垃圾回收的其余信息 |

预知更多详情，请参考[性能钩子的相关文档][性能钩子]。

[PerformanceEntry]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceentry
[PerformanceObserver]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceobserver
[`--max-old-space-size`]: https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes
[性能钩子]: https://nodejs.org/api/perf_hooks.html
[练习]: https://github.com/nodejs/diagnostics/tree/main/documentation/memory/step3/exercise
[堆捕获相关指南]: https://github.com/nodejs/nodejs.org/blob/main/locale/en/docs/guides/diagnostics/memory/using-heap-snapshot.md#how-to-find-a-memory-leak-with-heap-snapshots
[文档]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#marking-state
[Scavenge 情形]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#sample-scavenge-scenario
[talk of Peter Marshall]: https://v8.dev/blog/trash-talk
[`getheapstatistics`]: https://nodejs.org/dist/latest-v16.x/docs/api/v8.html#v8getheapstatistics
