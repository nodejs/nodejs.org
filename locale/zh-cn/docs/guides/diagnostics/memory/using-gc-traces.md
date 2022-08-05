---
title: Memory Diagnostics - Using GC Trace
layout: docs.hbs
---

# 追踪垃圾回收

垃圾回收是如何工作的，实在有太多的东西需要学习。但有一点必须清楚：那便是当 GC 运行
的时候，你的代码是不工作的。

或许你想知道垃圾回收运行的频率，以及需要运行多久，以及结果是什么。

## 如何运行垃圾回收追踪

你可以借助 `--trace_gc` 在控制台输出中看到垃圾回收追踪的信息情况。

```console
$ node --trace_gc app.js
```

或许你不想追踪运行在服务器上的整个进程生命周期里的那些信息，如果是这样的话，请从进程
内部设定把它关闭，这样就不会再追踪了。

以下是如何追踪并打印持续一分钟的 GC 信息示例：

```js
const v8 = require('v8');
v8.setFlagsFromString('--trace_gc');
setTimeout(() => { v8.setFlagsFromString('--notrace_gc'); }, 60e3);
```

### 使用 `--trace_gc` 检查追踪

你得到的垃圾收集器追踪信息看上去如以下样子：

```
[19278:0x5408db0]  44 ms: Scavenge 2.3 (3.0) -> 1.9 (4.0) MB, 1.2 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure

[23521:0x10268b000]  120 ms: Mark-sweep 100.7 (122.7) -> 100.6 (122.7) MB, 0.15 / 0.0 ms  (average mu = 0.132, current mu = 0.137) deserialize GC in old space requested
```

以上面第二行数据举例，这里给出如何解析这些信息：

<table>
  <tr>
    <th>得到的数据</th>
    <th>对应解析含义</th>
  </tr>
  <tr>
    <td>23521</td>
    <td>正在运行的线程号</td>
  </tr>
  <tr>
    <td>0x10268db0</td>
    <td>独立内存地址 （JS 堆实例）</td>
  </tr>
  <tr>
    <td>120</td>
    <td>自开始运行的时间（毫秒）</td>
  </tr>
  <tr>
    <td>Mark-sweep</td>
    <td>类型 / GC 阶段</td>
  </tr>
  <tr>
    <td>100.7</td>
    <td>GC 运行前占有内存（MiB）</td>
  </tr>
  <tr>
    <td>122.7</td>
    <td>GC 运行前总占有内存（MiB）</td>
  </tr>
  <tr>
    <td>100.6</td>
    <td>GC 运行后占有内存（MiB）</td>
  </tr>
  <tr>
    <td>122.7</td>
    <td>GC 运行后总占有内存（MiB）</td>
  </tr>
  <tr>
    <td>0.15</td>
    <td>GC 所耗费时间（毫秒）</td>
  </tr>
  <tr>
    <td>0.0</td>
    <td>GC 垃圾回收回调所话费的时间（毫秒）</td>
  </tr>
  <tr>
    <td>(average mu = 0.132, current mu = 0.137)</td>
    <td>增变因子利用率（0 —— 1 之间）</td>
  </tr>
  <tr>
    <td>deserialize GC in old space requested</td>
    <td>GC 原因</td>
  </tr>
</table>

## 使用“performance hooks” 追踪你的垃圾回收信息

在 Node.js，你可以使用[performance hooks][] 来跟踪你的垃圾回收信息。

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

### 借助“performance hooks”检查追踪信息

你可以在 [PerformanceObserver][] 的回调函数里得到诸如 [PerformanceEntry][] 的 GC
数据。举例说明：

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
    <th>属性名称</th>
    <th>对应解释</th>
  </tr>
  <tr>
    <td>name</td>
    <td>进程名称。</td>
  </tr>
  <tr>
    <td>entryType</td>
    <td>类型。</td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>进程的启动时间（高精度毫秒表示）。</td>
  </tr>
  <tr>
    <td>duration</td>
    <td>持续运行时间（毫秒）。</td>
  </tr>
  <tr>
    <td>kind</td>
    <td>垃圾回收的类型。</td>
  </tr>
  <tr>
    <td>flags</td>
    <td>垃圾回收的其余信息。</td>
  </tr>
</table>

欲知更多详情，请查阅
[performance hooks API文档][performance hooks].

## 使用追踪选项诊断内存问题的示例：

A. 如何获取糟糕的内存分配的上下文信息？
1. 假定我们观察到旧内存持续增长。
2. 但根据 GC 的负重来看，堆的最大值并未达到，但进程慢。
3. 回看跟踪的数据，找出在 GC 前后总的堆占用量。
4. 使用 [`--max-old-space-size`][] 降低内存，使得总的内存堆更接近于极限值。
5. 再次不断地运行程序，直到内存耗尽。
6. 该过程的日志将显示失败的上下文信息。

B. 如何确定在堆增长之时，存在内存泄露现象？
1. 假定我们观察到旧内存持续增长。
2. 但根据 GC 的负重来看，堆的最大值并未达到，但进程慢。
3. 回看跟踪的数据，找出在 GC 前后总的堆占用量。
4. 使用 [`--max-old-space-size`][] 降低内存，使得总的内存堆更接近于极限值。
5. 再次运行程序，观察是否内存耗尽。
6. 如果发生内存耗尽，尝试每次提升 10% 的堆内存，反复数次。
如果之前的现象复现被观察到，这就能证明存在内存泄露。
7. 如果不存在内存耗尽，就把内存堆固定在那个值——紧凑的堆减少了内存占用以及对内存压缩的延迟。

C. 如何断定是否存在太多次的垃圾回收，或者因为太多次垃圾回收造成一定的开销？
1. 回顾跟踪数据，尤其关注持续不断的 GC 发生时间隔的一系列数据。
2. 回顾跟踪数据，尤其关注持续不断的 GC 发生时时间消耗的数据。
3. 如果两次 GC 间隙时间小于 GC 所话费的时间，证明程序正处于严重缺乏内存。
4. 如果两次 GC 间隙时间和所话费的时间都非常高，证明该程序应该用一个更小点的堆。
5. 如果两次 GC 的时间远大于 GC 运行的时间，应用程序则相对比较健康。

[PerformanceEntry]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceentry
[PerformanceObserver]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceobserver
[`--max-old-space-size`]: https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes
[performance hooks]: https://nodejs.org/api/perf_hooks.html
