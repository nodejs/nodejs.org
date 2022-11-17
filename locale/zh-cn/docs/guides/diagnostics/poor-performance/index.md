---
title: 低性能和效率 — 如何诊断
layout: docs.hbs
---

# <!--poor-performance-->低效率运行

本文档将告知你如何分析一个 Node.js 进程。

* [低性能和效率](#poor-performance)
  * [我的程序执行效率太低了！](#my-application-has-a-poor-performance)
    * [症状](#symptoms)
    * [调试](#debugging)

## <!--my-application-has-a-poor-performance-->我的程序执行效率太低了！

### <!--symptoms-->症状

我的程序非常缓慢，我肯定瓶颈并非出在数据库和下游服务方面的依赖。我怀疑我的程序
在执行代码和处理方面花费了太久的时间。

或许你对你的程序运行效率尚满意，但总想了解一下哪一部分还有改进的余地以便让程序
运行的更快且效率更高。当我们想提高用户体验，或者节省计算机开销的时候，了解如何分析
是很有作用的。

### <!--debugging-->调试

在本用户案例中，我们仅对造成 CPU 过多运行的代码片段该兴趣深入研究，不讨论其它代码。
我们在研究的同时也会尽量优化精简代码。

本文将提供你两种方式分析一个 Node.js 应用程序的效率：

* [如何使用 V8 采样分析器](/zh-cn/docs/guides/simple-profiling/)
* [如何使用 Linux 的 Perf 工具](/zh-cn/docs/guides/diagnostics/poor-performance/using-linux-perf)
