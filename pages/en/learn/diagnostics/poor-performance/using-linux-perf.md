---
title: Using Linux Perf
layout: learn.hbs
---

# Using Linux Perf

[Linux Perf](https://perf.wiki.kernel.org/index.php/Main_Page) provides low level CPU profiling with JavaScript,
native and OS level frames.

**Important**: this tutorial is only available on Linux.

## How To

Linux Perf is usually available through the `linux-tools-common` package. Through either `--perf-basic-prof` or
`--perf-basic-prof-only-functions` we are able to start a Node.js application supporting _perf_events_.

`--perf-basic-prof` will always write to a file (/tmp/perf-PID.map), which can lead to infinite disk growth.
If that’s a concern either use the module: [linux-perf](https://www.npmjs.com/package/linux-perf)
or `--perf-basic-prof-only-functions`.

The main difference between both is that `--perf-basic-prof-only-functions` produces less output, it is a viable option
for production profiling.

```console
# Launch the application an get the PID
$ node --perf-basic-prof-only-functions index.js &
[1] 3870
```

Then record events based in the desired frequency:

```console
$ sudo perf record -F 99 -p 3870 -g
```

In this phase, you may want to use a load test in the application in order to generate more records for a reliable
analysis. When the job is done, close the perf process by sending a SIGINT (Ctrl-C) to the command.

The `perf` will generate a file inside the `/tmp` folder, usually called `/tmp/perf-PID.map`
(in above example: `/tmp/perf-3870.map`) containing the traces for each function called.

To aggregate those results in a specific file execute:

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

The raw output can be a bit hard to understand so typically the raw file is used to generate flamegraphs for a better
visualization.

![Example nodejs flamegraph](https://user-images.githubusercontent.com/26234614/129488674-8fc80fd5-549e-4a80-8ce2-2ba6be20f8e8.png)

To generate a flamegraph from this result, follow [this tutorial](/learn/diagnostics/flame-graphs#create-a-flame-graph-with-system-perf-tools)
from step 6.

Because `perf` output is not a Node.js specific tool, it might have issues with how JavaScript code is optimized in
Node.js. See [perf output issues](/learn/diagnostics/flame-graphs#perf-output-issues) for a
further reference.

## Useful Links

- /learn/diagnostics/flame-graphs
- https://www.brendangregg.com/blog/2014-09-17/node-flame-graphs-on-linux.html
- https://perf.wiki.kernel.org/index.php/Main_Page
- https://blog.rafaelgss.com.br/node-cpu-profiler
