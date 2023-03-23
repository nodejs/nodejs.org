---
title: 内存诊断
layout: docs.hbs
---

# 内存诊断相关

在本文档中，你讲学到如何调试与内存相关的一系列问题。

* [内存诊断相关](#memory)
  * [内存溢出](#my-process-runs-out-of-memory)
    * [相关症状](#symptoms)
    * [副作用](#side-effects)
  * [低效率内存使用](#my-process-utilizes-memory-inefficiently)
    * [相关症状](#symptoms-1)
    * [副作用](#side-effects-1)
  * [调试](#debugging)

## 内存耗尽

Node.js _（基于 JavaScript）_ 是一个带垃圾回收功能的语言，故内存泄露是可能是 大量占用引起。通常 Node.js 的应用程序都是多终端、关键业务，以及长时间运行。因 此如能提供一个行之有效的找出内存泄露原因的方法是必须的。

### 相关症状

用户观察到内存占用持续增长 _（或快活慢，持续数天乃至数周不等）_，然后发现进程崩溃并 通过进程管理器重启进程。进程或许比之前运行得慢，重启也使得一些特定的请求失败 _（负载均衡返回 502）_。

### 副作用

* 由于内存耗尽，进程被迫重新启动，请求无法得到响应。
* 持续增长的 GC 活动导致 CPU 占用率更高，响应时间更长。
  * GC 把事件循环机制阻塞住，导致了速度变慢。
* 增长的内存交换（由 GC 活动引起）使得进程变慢。
* 没有足够的内存空间来存储一个堆快照。

## 低效率内存使用

### 相关症状

应用程序占用的内存与我们的预期不符，我们观察到垃圾回收器的活动有所提升。

### 副作用

* 分页错误数持续增长。
* 较高的 GC 活动以及 CPU 使用率。

## 调试

调试一个内存泄露的问题，我们需要看特定的对象占用了多少内存空间，以及什么变量占有了 他们从而使得垃圾回收。为了使我们有效地调试，我们同时也需要了解变量随时间的分配模式。

* [使用堆剖析器](/en/docs/guides/diagnostics/memory/using-heap-profiler/)
* [使用堆快照](/en/docs/guides/diagnostics/memory/using-heap-snapshot/)
* [GC 跟踪](/en/docs/guides/diagnostics/memory/using-gc-traces)
