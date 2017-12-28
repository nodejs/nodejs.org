---
title: Diagnostics - Flame Graphs
layout: docs.hbs
---

# Flame Graphs

## What's a flame graph useful for?

Flame graphs are a way of visualizing CPU time spent in functions. They can help you pin down where you spend too much time doing synchronous operations.

## How to create a flame graph

You might have heard creating a flame graph for Node.js is difficult, but that's not true (anymore).
Solaris vms are no longer needed for flame graphs on linux!

1. install linux-tools-common - the package containing `perf` (eg. with apt-get)
1. try running `perf` - it might complain about missing kernel modules, install them too
1. install stackvis `npm i -g stackvis`
1. run node with perf enabled `perf record -e cycles:u -g -- node --perf-basic-prof app.js`
1. disregard warnings unless they're saying you can't run perf due to missing packages; you may get some warnings about not being able to access kernel module samples which you're not after anyway.
1. run `perf script`, but pipe it through some cleanup: `perf script | egrep -v "( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)" | sed 's/ LazyCompile:[*~]\?/ /' > perfs.out` [explanation](#about-perf-script-filtering)
1. run `stackvis perf < perfs.out > flamegraph.htm`

Now open the flame graph file in your favorite browser and watch it burn. It's color-coded so you can focus on the most saturated orange bars first. They're likely to represent CPU heavy functions.

Worth mentioning - if you click an element of a flame graph a zoom-in of its surroundings will get displayed above the graph.

### Use perf to sample a running process

```
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

Wait, what is that `sleep 3` for? It's there to keep the perf running - despite `-p` option pointing to a different pid, the command needs to be executed on a process and end with it. Just a convenient way to keep perf going for a given time.

Why is `-F` (profiling frequency) set to 99? It's a reasonable default. You can adjust if you want. Lower values should produce less output with less precise results.

After you get that 3 second perf record, proceed with generating the flame graph with last two steps from above.

### About `perf script` filtering

The long line of greps and seds after `perf script` call is there to remove some V8 and node internals so that it's easier for you to focus on your JavaScript calls. These are only important if you are looking for an issue with Node internals.

If you read your flame graph and it seems odd, as if something is missing in the key function taking up most time, try generating your flame graph without the filters - maybe you got a rare case of an issue with Node itself.

### Node's profiling options

`--perf-basic-prof-only-functions` and `--perf-basic-prof` seem like the only two you might be initially interested in for debugging your JavaScript code. Other options should only be useful for profiling Node itself, which is outside the scope of this howto.

`--perf-basic-prof-only-functions` produces less output, so it's the option with least overhead.

Why do I need them at all?

Well, without these options you'll still get a flame graph, but with most bars labeled `v8::Function::Call`.

## Node.js 8.x V8 pipeline changes

Node.js 8.x ships with new optimizations to JavaScript compilation pipeline in V8 engine which makes function names/references unreachable for perf. The result is you might not get your function names right in the flame graph. See this thread for details: https://github.com/nodejs/benchmarking/issues/168

## Examples

Practice capturing a flame graph yourself with [a flame graph exercise](https://github.com/naugtur/node-example-flamegraph)
