---
title: 低性能和效率 — 如何使用 Linux 的 Perf 工具
layout: docs.hbs
---

# 使用 Linux Perf 工具分析

[Linux Perf](https://perf.wiki.kernel.org/index.php/Main_Page) 借助 JavaScript 提供您低级别程度的 CPU 分析，
本地分析以及操作系统级别的帧分析。

**注意：**此教程仅针对 Linux 操作系统。

## 我该怎么做？

Linux Perf 工具通常随着 `linux-tools-common` 工具包一起发布。借助 `--perf-basic-prof` 或
`--perf-basic-prof-only-functions` 命令，我们可以启动一个带有支持 _perf\_events_ 的 Node.js 程序。

`--perf-basic-prof` ：总是把结果写入一个文件（通常是 /tmp/perf-PID.map），这样做的结果便是该文件的大小会
不停地增长。如果你对此感到担心的话，可以使用 [linux-perf](https://www.npmjs.com/package/linux-perf)
或 `--perf-basic-prof-only-functions`。

以上二者的主要区别在于 `--perf-basic-prof-only-functions` 的输出量更少，显然这对于生产环境下的性能分析
是可行性方案。

```console
# Launch the application an get the PID
$ node --perf-basic-prof-only-functions index.js &
[1] 3870
```

然后根据预想的采集频率记录所有发生过的事件：

```console
$ sudo perf record -F 99 -p 3870 -g
```

在本阶段你还可以加载一个负载测试，以便于生成更多的可靠的信息便于诊断和分析。当完成这一切之后，使用 SIGINT（Ctrl-C）
强制关闭性能分析工具即可。

`perf` 工具会在 `/tmp` 路径下生成一个文件，通常是 `/tmp/perf-PID.map` （上面的例子是 `/tmp/perf-3870.map`），
其中包含着每个函数调用的跟踪堆栈情况。

如想汇总这些数据到一起形成一个文件，请执行以下命令：

```console
$ sudo perf script > perfs.out
```

```console
$ cat ./perfs.out
node 3870 25147.878454:          1 cycles:
        ffffffffb5878b06 native_write_msr+0x6 ([kernel.kallsyms])
        ffffffffb580d9d5 intel_tfa_pmu_enable_all+0x35 ([kernel.kallsyms])
        ffffffffb5807ac8 x86_pmu_enable+0x118 ([kernel.kallsyms])
        ffffffffb5a0a93d perf_pmu_enable.part.0+0xd ([kernel.kallsyms])
        ffffffffb5a10c06 __perf_event_task_sched_in+0x186 ([kernel.kallsyms])
        ffffffffb58d3e1d finish_task_switch+0xfd ([kernel.kallsyms])
        ffffffffb62d46fb __sched_text_start+0x2eb ([kernel.kallsyms])
        ffffffffb62d4b92 schedule+0x42 ([kernel.kallsyms])
        ffffffffb62d87a9 schedule_hrtimeout_range_clock+0xf9 ([kernel.kallsyms])
        ffffffffb62d87d3 schedule_hrtimeout_range+0x13 ([kernel.kallsyms])
        ffffffffb5b35980 ep_poll+0x400 ([kernel.kallsyms])
        ffffffffb5b35a88 do_epoll_wait+0xb8 ([kernel.kallsyms])
        ffffffffb5b35abe __x64_sys_epoll_wait+0x1e ([kernel.kallsyms])
        ffffffffb58044c7 do_syscall_64+0x57 ([kernel.kallsyms])
        ffffffffb640008c entry_SYSCALL_64_after_hwframe+0x44 ([kernel.kallsyms])
....
```

原始的输出有一些难以理解，所以通常而言，该文件被用于生成火焰图以方便查看。

![Example nodejs flamegraph](https://user-images.githubusercontent.com/26234614/129488674-8fc80fd5-549e-4a80-8ce2-2ba6be20f8e8.png)

为了生成火焰图，请参考[生成火焰图教程](https://nodejs.org/zh-cn/docs/guides/diagnostics-flamegraph/#create-a-flame-graph-with-system-perf-tools)，从第六步开始。

 `perf` 并不是单为 Node.js 量身定制的分析工具，因此对于如何优化 JavaScript 代码上可能存在缺陷。
 预知详情可以参考[`perf` 输出的一些问题](https://nodejs.org/zh-cn/docs/guides/diagnostics-flamegraph/#perf-output-issues)。

## 其它相关的一些有用的链接帮助

* https://nodejs.org/en/docs/guides/diagnostics-flamegraph/
* https://www.brendangregg.com/blog/2014-09-17/node-flame-graphs-on-linux.html
* https://perf.wiki.kernel.org/index.php/Main_Page
* https://blog.rafaelgss.com.br/node-cpu-profiler
