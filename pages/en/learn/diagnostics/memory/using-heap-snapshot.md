---
title: Using Heap Snapshot
layout: learn.hbs
---

# Using Heap Snapshot

You can take a Heap Snapshot from your running application and load it into
[Chrome Developer Tools][] to inspect certain variables or check retainer size.
You can also compare multiple snapshots to see differences over time.

## Warning

When creating a snapshot, all other work in your main thread is stopped.
Depending on the heap contents it could even take more than a minute.
The snapshot is built in memory, so it can double the heap size, resulting
in filling up entire memory and then crashing the app.

If you're going to take a heap snapshot in production, make sure the process
you're taking it from can crash without impacting your application's
availability.

## How To

### Get the Heap Snapshot

There are multiple ways to obtain a heap snapshot:

1. via the inspector,
2. via an external signal and command-line flag,
3. via a `writeHeapSnapshot` call within the process,
4. via the inspector protocol.

#### 1. Use memory profiling in inspector

> Works in all actively maintained versions of Node.js

Run node with `--inspect` flag and open the inspector.
![open inspector][open inspector image]

The simplest way to get a Heap Snapshot is to connect a inspector to your
process running locally. Then go to Memory tab and take a heap snapshot.

![take a heap snapshot][take a heap snapshot image]

#### 2. Use `--heapsnapshot-signal` flag

> Works in v12.0.0 or later

You can start node with a command-line flag enabling reacting to a signal to
create a heap snapshot.

```
$ node --heapsnapshot-signal=SIGUSR2 index.js
```

```
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
node         1  5.5  6.1 787252 247004 ?       Ssl  16:43   0:02 node --heapsnapshot-signal=SIGUSR2 index.js
$ kill -USR2 1
$ ls
Heap.20190718.133405.15554.0.001.heapsnapshot
```

For details, see the latest documentation of [heapsnapshot-signal flag][].

#### 3. Use `writeHeapSnapshot` function

> Works in v11.13.0 or later
> Can work in older versions with [heapdump package][]

If you need a snapshot from a working process, like an application running on a
server, you can implement getting it using:

```js
require('v8').writeHeapSnapshot();
```

Check [`writeHeapSnapshot` docs][] for file name options.

You need to have a way to invoke it without stopping the process, so calling it
in a HTTP handler or as a reaction to a signal from the operating system
is advised. Be careful not to expose the HTTP endpoint triggering a snapshot.
It should not be possible for anybody else to access it.

For versions of Node.js before v11.13.0 you can use the [heapdump package][].

#### 4. Trigger Heap Snapshot using inspector protocol

Inspector protocol can be used to trigger Heap Snapshot from outside of the
process.

It's not necessary to run the actual inspector from Chromium to use the API.

Here's an example snapshot trigger in bash, using `websocat` and `jq`:

```bash
#!/bin/bash
set -e

kill -USR1 "$1"
rm -f fifo out
mkfifo ./fifo
websocat -B 10000000000 "$(curl -s http://localhost:9229/json | jq -r '.[0].webSocketDebuggerUrl')" < ./fifo > ./out &
exec 3>./fifo
echo '{"method": "HeapProfiler.enable", "id": 1}' > ./fifo
echo '{"method": "HeapProfiler.takeHeapSnapshot", "id": 2}' > ./fifo
while jq -e "[.id != 2, .result != {}] | all" < <(tail -n 1 ./out); do
  sleep 1s
  echo "Capturing Heap Snapshot..."
done

echo -n "" > ./out.heapsnapshot
while read -r line; do
  f="$(echo "$line" | jq -r '.params.chunk')"
  echo -n "$f" >> out.heapsnapshot
  i=$((i+1))
done < <(cat out | tail -n +2 | head -n -1)

exec 3>&-
```

Here is a non-exhaustive list of memory profiling tools usable with the
inspector protocol:

- [OpenProfiling for Node.js][openprofiling]

## How to find a memory leak with Heap Snapshots

You can find a memory leak by comparing two snapshots. It's important to make
sure the snapshots difference does not contain unnecessary information.
Following steps should produce a clean diff between snapshots.

1. Let the process load all sources and finish bootstrapping. It should take a
   few seconds at most.
2. Start using the functionality you suspect of leaking memory. It's likely it
   makes some initial allocations that are not the leaking ones.
3. Take one heap snapshot.
4. Continue using the functionality for a while, preferably without running
   anything else in between.
5. Take another heap snapshot. The difference between the two should mostly
   contain what was leaking.
6. Open Chromium/Chrome dev tools and go to _Memory_ tab
7. Load the older snapshot file first, and the newer one second.
   ![Load button in tools][load button image]
8. Select the newer snapshot and switch mode in the dropdown at the top from
   _Summary_ to _Comparison_. ![Comparison dropdown][comparison image]
9. Look for large positive deltas and explore the references that caused
   them in the bottom panel.

You can practice capturing heap snapshots and finding memory leaks with [this
heap snapshot exercise][heapsnapshot exercise].

[open inspector image]: /static/images/docs/guides/diagnostics/tools.png
[take a heap snapshot image]: /static/images/docs/guides/diagnostics/snapshot.png
[heapsnapshot-signal flag]: https://nodejs.org/api/cli.html#--heapsnapshot-signalsignal
[heapdump package]: https://www.npmjs.com/package/heapdump
[`writeHeapSnapshot` docs]: https://nodejs.org/api/v8.html#v8_v8_writeheapsnapshot_filename
[openprofiling]: https://github.com/vmarchaud/openprofiling-node
[load button image]: /static/images/docs/guides/diagnostics/load-snapshot.png
[comparison image]: /static/images/docs/guides/diagnostics/compare.png
[heapsnapshot exercise]: https://github.com/naugtur/node-example-heapdump
[Chrome Developer Tools]: https://developer.chrome.com/docs/devtools/
