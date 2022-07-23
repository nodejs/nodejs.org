---
title: Memory Diagnostics - Using Heap Profiler
layout: docs.hbs
---

# 使用内存堆剖析器

内存堆剖析器处于 V8 的顶部，能持续对内存分配进行快照。在这篇文章里我们将设计到内存的
剖析，将使用：

1. 时间轴的分配
2. 采样内存堆剖析器信息

不同于[使用堆快照][]中所涉及到的内容，使用实时堆剖析意在了解一段特定时间下内存分配
情况。

## 堆剖析器 - 时间轴的分配

堆剖析器与堆采样分析器相似，不同处在于它会跟踪每次的内存分配状况，它的开销也就
高于堆采样分析器，所以不建议在生产环境中使用。

> 你可借助 [@mmarchini/observe][] 通过编码方式来启动和停止剖析器。

### 怎么用堆剖析器？

启动应用程序：

```console
node --inspect index.js
```

> `--inspect-brk` 对于脚本而言是较好的选项。

在 Chrome 中连接开发工具实例，然后：

* 选择 `memory` 选项卡
* 选择 `Allocation instrumentation timeline`
* 开始剖析

![堆剖析器步骤 1][heap profiler tutorial 1]

堆剖析一旦开始运行，我们强烈建议您运行示例，这样便于确认内存相关的问题。
举个例子：如果我们对一个 Web 应用程序进行堆剖析，`Apache Benchmark`
可以用来产出（模拟）应用程序中的负载。

> 在这个示例中，我们假定堆剖析基于 Web 应用程序。

```console
$ ab -n 1000 -c 5 http://localhost:3000
```

当负载全部请求完毕之后，请按“停止”按钮。

![堆剖析器步骤 2][heap profiler tutorial 2]

最后针对内存分配情况看一下快照。

![堆剖析器步骤 3][heap profiler tutorial 3]

请查阅下列有助于你了解关于更多内存相关术语的[链接部分](#useful-links) 。

## 堆剖析的采样

对堆剖析器的采样是在一定时间内持续跟踪内存份分配状况和后备内存。由于采样基于低
开销进行，所以它可以用在生产环境。

> 你可以借助 [`heap-profiler`][] 模块，通过编程方式控制堆内存剖析的开与关。

### 如何对堆剖析进行采样？

启动应用程序：

```console
$ node --inspect index.js
```

> `--inspect-brk` 对于脚本而言是较好的选项。

在 Chrome 中连接开发工具的实例，然后：

1. 选择 `memory` 选项卡
2. 选择 `Allocation sampling`
3. 开始剖析

![堆剖析器步骤 4][heap profiler tutorial 4]

在负载产生后停止剖析器，它会自动生成一个基于堆栈跟踪的内存分配总结。你可以关注
函数的内存堆分配状况，可以参照下面的例子：

![堆剖析器步骤 5][heap profiler tutorial 5]

## 有帮助的相关链接：

* https://developer.chrome.com/docs/devtools/memory-problems/memory-101/
* https://github.com/v8/sampling-heap-profiler
* https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/

[使用堆快照]: /zh-cn/docs/guides/diagnostics/memory/using-heap-snapshot/
[@mmarchini/observe]: https://www.npmjs.com/package/@mmarchini/observe
[`heap-profiler`]: https://www.npmjs.com/package/heap-profile
[heap profiler tutorial 1]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-1.png
[heap profiler tutorial 2]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-2.png
[heap profiler tutorial 3]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-3.png
[heap profiler tutorial 4]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-4.png
[heap profiler tutorial 5]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-5.png
