---
title: Memory Diagnostics - Using Heap Snapshot
layout: docs.hbs
---

# 使用内存堆快照

你可以在程序运行的同时为程序生成一个内存堆快照，然后把它加载到 [Chrome 开发工具][]中
检查特定的变量，或者是占用内存的大小。你也可以持续性地比较多个快照来观察他们之间的不同。

## 警告！

在创建快照的同时其它主线程中的工作都会停止。根据堆的上下文情况，有可能这种快照将持续超
过一分钟之久。内存快照在内存中创建，所以可能占用两倍的内存，导致整个内存都被填满而使得
应用程序崩溃。

如果你想在生产环境生成内存快照，请确认被快照的那个进程崩溃不会对你程序的应用产生影响。

## 如何生成快照？

### 获取内存快照

1. 通过检查器
2. 通过外部信号以及命令行命令符
3. 通过在进程内部调用 writeHeapSnapshot 函数
4. 通过检查协议

#### 1. 在检查器中使用内存剖析工具

> 该方法适用于所有维护活跃版本的 Node.js

使用 `--inspect` 命令符运行 node 程序并打开检查器。
![打开检查器][open inspector image]

最简便获取堆快照的方法就是把检查器和你本地正在运行的进程进行连接，切换到“内存”标签页，
选择采集内存快照。

![采集内存快照][take a heap snapshot image]

#### 2. 使用 `--heapsnapshot-signal` 命令符

> 此方法在 Node.js v12.0.0 或之后版本使用

你可以使用命令行的命令符启动 node 使得对信号做出反应并开始创建内存快照。

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

预知详情，请查阅最新关于[内存快照信号量标志符][]的文档。

#### 3. 使用 `writeHeapSnapshot` 函数

> Node.js 版本至少是 v11.13.0 或之后
> 对于旧版本的 Node.js，可以借助 [heapdump 包][] 来使用

如果你想从一个正在运行的进程里提取快照，这如同在服务器上运行的程序一样，你可以这样做：

```js
require('v8').writeHeapSnapshot();
```

请查阅 [`writeHeapSnapshot` 文档][] 了解文件名的可用选项。

在不停掉进程的前提下你需要有一个方式来生成快照，建议在 HTTP Handler 里调用，亦或是从操作
系统中对某个信号量做出反应。但你需小心一点：不要暴漏触发生成快照的 Http 终端地址，它不应该
被其他人直接访问。

对于 v11.13.0 之前的 Node.js 版本，请借助 [heapdump 包][]来实现。

#### 4. 借助检查器协议触发内存堆快照

“检查器协议” 可被用来从进程外部触发生成内存堆快照。

通过 Chromium 运行实际的检查器调用 API 并不是必要的方式。

以 bash 方式，借助 `websocat` 和 `jq`，给出触发内存快照的方式：

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

这里提供一份与检查器协议一起使用的内存分析工具的详尽列表：

* [适用于 Node.js 的 OpenProfiling][openprofiling]

## 如何借助内存堆快照发现内存泄露？

为找到内存泄露，必须先对比两个快照。但必须先确保这些快照之间的区别未包含不需要的信息。
遵循下列步骤，你就可以创建一个干净的快照。

1. 让进程加载完全部的资源，完成初始化启动。这最多只需要若干秒就可完成。
2. 启动你所怀疑造成内存泄露的功能性部分，可能一开始它会造成一些非内存泄露的分配。
3. 开始生成快照。
4. 继续运行此功能性部分一段时间，最好在此期间不要运行其它任何东西。
5. 再次生成另一次快照，两次生成快照之间的差别应该包含大部分内存泄露的情况。
6. 打开 Chromium 或 Chrome 的开发工具，切换到 *内存* 标签。
7. 先加载第一次（旧的）生成的内存快照，然后是第二次（较新的）。[工具中的加载按钮][load button image]部分。
8. 选择第二次（较新）的快照，在下拉框中从 *总结* 切换至 *比较*。![比较下拉选项][comparison image]
9. 在最底部的面板中寻找他们之间较大的差异部分，浏览那些导致形成这些原因的相关引用。

你可以通过[内存堆快照练习][heapsnapshot exercise]来锻炼你捕获快照以及寻找内存泄露的能力。

[open inspector image]: /static/images/docs/guides/diagnostics/tools.png
[take a heap snapshot image]: /static/images/docs/guides/diagnostics/snapshot.png
[内存快照信号量标志符]: https://nodejs.org/api/cli.html#--heapsnapshot-signalsignal
[heapdump 包]: https://www.npmjs.com/package/heapdump
[`writeHeapSnapshot` 文档]: https://nodejs.org/api/v8.html#v8_v8_writeheapsnapshot_filename
[openprofiling]: https://github.com/vmarchaud/openprofiling-node
[load button image]: /static/images/docs/guides/diagnostics/load-snapshot.png
[comparison image]: /static/images/docs/guides/diagnostics/compare.png
[heapsnapshot exercise]: https://github.com/naugtur/node-example-heapdump
[Chrome 开发工具]: https://developer.chrome.com/docs/devtools/
