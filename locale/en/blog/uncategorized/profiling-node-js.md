---
title: Profiling Node.js
author: Dave Pacheco
date: 2012-04-25T20:48:58.000Z
status: publish
category: Uncategorized
slug: profiling-node-js
layout: blog-post.hbs
---

It's incredibly easy to visualize where your Node program spends its time using DTrace and [node-stackvis](https://github.com/davepacheco/node-stackvis) (a Node port of Brendan Gregg's [FlameGraph](https://github.com/brendangregg/FlameGraph/) tool):

1. Run your Node.js program as usual.
2. In another terminal, run:

    ```
    $ dtrace -n 'profile-97/execname == "node" && arg1/{
        @[jstack(150, 8000)] = count(); } tick-60s { exit(0); }' > stacks.out
    ```

    This will sample about 100 times per second for 60 seconds and emit results to stacks.out. **Note that this will sample all running programs called "node". If you want a specific process, replace `execname == "node"` with `pid == 12345` (the process id).**
3. Use the "stackvis" tool to transform this directly into a flame graph. First, install it:

    ```
    npm install -g stackvis
    ```

    then use `stackvis` to convert the DTrace output to a flamegraph:

    ```
    stackvis dtrace flamegraph-svg < stacks.out > stacks.svg
    ```

4. Open stacks.svg in your favorite browser.

You'll be looking at something like this:

[!['Hello World' HTTP server flame graph](https://cs.brown.edu/people/dapachec/helloworld.svg)](https://cs.brown.edu/people/dapachec/helloworld.svg)

This is a visualization of all of the profiled call stacks. This example is from the "hello world" HTTP server on the [Node.js](https://nodejs.org/) home page under load. Start at the bottom, where you have "main", which is present in most Node stacks because Node spends most on-CPU time in the main thread. Above each row, you have the functions called by the frame beneath it. As you move up, you'll see actual JavaScript function names. The boxes in each row are not in chronological order, but their width indicates how much time was spent there. When you hover over each box, you can see exactly what percentage of time is spent in each function. This lets you see at a glance where your program spends its time.

That's the summary. There are a few prerequisites:

* You must gather data on a system that supports DTrace with the Node.js ustack helper. For now, this pretty much means [illumos](http://illumos.org/)\-based systems like [SmartOS](http://smartos.org/), including the Joyent Cloud. **MacOS users:** OS X supports DTrace, but not ustack helpers. The way to get this changed is to contact your Apple developer liaison (if you're lucky enough to have one) or **file a bug report at bugreport.apple.com**. I'd suggest referencing existing bugs 5273057 and 11206497. More bugs filed (even if closed as dups) show more interest and make it more likely Apple will choose to fix this.
* You must be on 32-bit Node.js 0.6.7 or later, built `--with-dtrace`. The helper doesn't work with 64-bit Node yet. On illumos (including SmartOS), development releases (the 0.7.x train) include DTrace support by default.

There are a few other notes:

* You can absolutely profile apps **in production**, not just development, since compiling with DTrace support has very minimal overhead. You can start and stop profiling without restarting your program.
* You may want to run the stacks.out output through `c++filt` to demangle C++ symbols. Be sure to use the `c++filt` that came with the compiler you used to build Node. For example:

    ```
    c++filt < stacks.out > demangled.out
    ```

    then you can use demangled.out to create the flamegraph.
* If you want, you can filter stacks containing a particular function. The best way to do this is to first collapse the original DTrace output, then grep out what you want:

    ```
    stackvis dtrace collapsed < stacks.out | grep SomeFunction > collapsed.out
    stackvis collapsed flamegraph-svg < collapsed.out > stacks.svg
    ```

* If you've used Brendan's FlameGraph tools, you'll notice the coloring is a little different in the above flamegraph. I ported his tools to Node first so I could incorporate it more easily into other Node programs, but I've also been playing with different coloring options. The current default uses hue to denote stack depth and saturation to indicate time spent. (These are also indicated by position and size.) Other ideas include coloring by module (so V8, JavaScript, libc, etc. show up as different colors.)

For more on the underlying pieces, see my [previous post on Node.js profiling](http://dtrace.org/blogs/dap/2012/01/05/where-does-your-node-program-spend-its-time/) and [Brendan's post on Flame Graphs](http://dtrace.org/blogs/brendan/2011/12/16/flame-graphs/).

---

Dave Pacheco blogs at [dtrace.org](http://dtrace.org/blogs/dap)
