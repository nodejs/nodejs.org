---
title: Diagnostics - Flame Graphs
layout: docs.hbs
---

# Flame Graphs

## What's a flame graph useful for?

Flame graphs are a way of visualizing CPU time spent in functions. They can help you pin down where you spend too much time doing synchronous operations.

## How to create a flame graph

You might have heard creating a flame graph for Node.js is difficult, but that's not true (anymore). Solaris vms are no longer needed for flame graphs!

Flame graphs are generated from `perf` output, which is not a node-specific tool. While it's the most powerful way to visualize CPU time spent, it may have issues with how JavaScript code is optimized in Node.js 8 and above. See [perf output issues](#perf-output-issues) section below.

### Use a pre-packaged tool

If you want a single step that produces a flame graph locally, try [0x](https://www.npmjs.com/package/0x)

For diagnosing production deployments, read these notes: [0x production servers](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md)

### Create a flame graph with system perf tools

The purpose of this guide is to show steps involved in creating a flame graph and keep you in control of each step.

If you want to understand each step better, take a look at the sections that follow where we go into more detail.

Now let's get to work.

1. Install `perf` (usually available through the linux-tools-common package if not already installed)
2. try running `perf` - it might complain about missing kernel modules, install them too
3. run node with perf enabled (see [perf output issues](#perf-output-issues) for tips specific to Node.js versions)

    ```bash
    perf record -e cycles:u -g -- node --perf-basic-prof app.js
    ```

4. disregard warnings unless they're saying you can't run perf due to missing packages; you may get some warnings about not being able to access kernel module samples which you're not after anyway.
5. Run `perf script > perfs.out` to generate the data file you'll visualize in a moment. It's useful to [apply some cleanup](#filtering-out-node-js-internal-functions) for a more readable graph
6. install stackvis if not yet installed `npm i -g stackvis`
7. run `stackvis perf < perfs.out > flamegraph.htm`

Now open the flame graph file in your favorite browser and watch it burn. It's color-coded so you can focus on the most saturated orange bars first. They're likely to represent CPU heavy functions.

Worth mentioning - if you click an element of a flame graph a zoom-in of its surroundings will get displayed above the graph.

### Using `perf` to sample a running process

This is great for recording flame graph data from an already running process that you don't want to interrupt. Imagine a production process with a hard to reproduce issue.

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

Wait, what is that `sleep 3` for? It's there to keep the perf running - despite `-p` option pointing to a different pid, the command needs to be executed on a process and end with it. perf runs for the life of the command you pass to it, whether or not you're actually profiling that command. `sleep 3` ensures that perf runs for 3 seconds.

Why is `-F` (profiling frequency) set to 99? It's a reasonable default. You can adjust if you want. `-F99` tells perf to take 99 samples per second, for more precision increase the value. Lower values should produce less output with less precise results. Precision you need depends on how long your CPU intensive functions really run. If you're looking for the reason of a noticeable slowdown, 99 frames per second should be more than enough.

After you get that 3 second perf record, proceed with generating the flame graph with the last two steps from above.

### Filtering out Node.js internal functions

Usually you just want to look at the performance of your own calls, so filtering out Node.js and V8 internal functions can make the graph much easier to read. You can clean up your perf file with:

```bash
sed -i \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]\?/ /' \
  perfs.out
```

If you read your flame graph and it seems odd, as if something is missing in the key function taking up most time, try generating your flame graph without the filters - maybe you got a rare case of an issue with Node.js itself.

### Node.js's profiling options

`--perf-basic-prof-only-functions` and `--perf-basic-prof` are the two that are useful for debugging your JavaScript code. Other options are used for profiling Node.js itself, which is outside the scope of this guide.

`--perf-basic-prof-only-functions` produces less output, so it's the option with least overhead.

### Why do I need them at all?

Well, without these options you'll still get a flame graph, but with most bars labeled `v8::Function::Call`.

## `perf` output issues

### Node.js 8.x V8 pipeline changes

Node.js 8.x and above ships with new optimizations to JavaScript compilation pipeline in V8 engine which makes function names/references unreachable for perf sometimes. (It's called Turbofan)

The result is you might not get your function names right in the flame graph.

You'll notice `ByteCodeHandler:` where you'd expect function names.

[0x](https://www.npmjs.com/package/0x) has some mitigations for that built in.

For details see:

* https://github.com/nodejs/benchmarking/issues/168
* https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

### Node.js 10+

Node.js 10.x addresses the issue with Turbofan using the `--interpreted-frames-native-stack` flag.

Run `node --interpreted-frames-native-stack --perf-basic-prof-only-functions` to get function names in the flame graph regardless of which pipeline V8 used to compile your JavaScript.

### Broken labels in the flame graph

If you're seeing labels looking like this

```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```

it means the Linux perf you're using was not compiled with demangle support, see https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 for example

## Examples

Practice capturing flame graphs yourself with [a flame graph exercise](https://github.com/naugtur/node-example-flamegraph)!
