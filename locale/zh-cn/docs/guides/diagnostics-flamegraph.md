---
title: 诊断 - 火焰图
layout: docs.hbs
---

# 火焰图

## 火焰图起什么作用？

“火焰图” 是专门用于分析 CPU 在函数中所消耗的时间。他们可以协助你定位哪些同步方法过于消耗时间。

## 如何创建一个火焰图？

或许你已经听说对于 Node.js，创建火焰图不是非常容易，但是那并不是真的（永远不会）。我们再也不需要 Solaris vms 创建火焰图了！

火焰图通过 `perf` 输出，这并不是一个 node 所指定的工具。即便它是把 CPU 耗时可视化的最佳工具，它仍然存在一些问题 —— 如在 Node.js 8 和之后版本中 JavaScript 编码是如何优化的。欲了解详情可以看[perf 输出的问题](#perf-output-issues)这部分。

### 使用预包装工具

如果你想在本地开始单一输出火焰图，请尝试 [0x](https://www.npmjs.com/package/0x)

如果你想诊断发布的生产环境，请阅读[在生产环境中的 0x](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md)

### 用系统工具 `pref` 创建火焰图

本教程的目的在于给你展示如何创建火焰图的具体步骤，这样让你可以对每一步都有掌控。

如果你更好地想理解每一个步骤，请仔细看这些步骤，我们将详细阐述。

现在让我们开始吧：

1. 安装 `perf`（如果你没有安装，那么通常通过 linux-tools-common 安装包进行安装）
2. 尝试运行 `perf` - 或许会告诉你缺少内核模块，请同样安装他们。
3. 启用 pref 并运行 node（具体参考 [perf 输出的问题](#perf-output-issues)以此了解针对不同 Node.js 版本的建议）

    ```bash
    perf record -e cycles:u -g -- node --perf-basic-prof app.js
    ```

4. 忽略一些警告，除非它告诉你因为缺少必要的安装包而无法运行 pref，你可能会得到一些警告，告诉你不能访问内核模块的样本等。
5. 运行命令 `perf script > perfs.out` 生成稍后你看到的可视化的数据文件。对于一个易读的火焰图而言，[应用清理](#filtering-out-node-internal-functions)是有作用的。
6. 如果没有安装 stackvis，请运行 `npm i -g stackvis`
7. 最后运行 `stackvis perf < perfs.out > flamegraph.htm`

现在你可以使用你最喜爱的浏览器打开火焰图文件，然后观察其燃烧状况。此图是带色编码的，因此你首先应该关注饱和度最深的橘色条。这些最有可能意味着你的 CPU 运行复杂函数消耗的状况。

值得一提的是：如果你点击火焰图的一个元素，它周围相关的元素将被放大，并将显示在图形的上方。

### 使用 `perf` 对一个运行的进程采样

`pref` 对于一个从已经运行、且不想被随意中断的进程中录制火焰图无疑是相当不错的。设想一下现在你有一个非常难重现问题的生产环境上的进程：

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

先停一下，这里 `sleep 3` 是干什么的？它的目的是为了让 pref 持续运行 —— 尽管 `-p` 参数选项是让你指定一个不同的进程 ID（pid），此命令仍然需要在一个进程上执行，并随着它终止。perf 运行的是传递给它的命令的生存期，不管你是否实际分析该命令。`sleep 3` 确保此命令运行 3 秒。

为什么 `-F`（采样频率）要被设置成 99？这是有默认原因的，当然你如果愿意可以任意设置。`-F99` 告诉 pref 每秒采样 99 个样本，目的是为了更精确地提高数值。越是低的数值意味着产出越是低的输出，相伴的也就是越是低精度的结果。你需要的精度取决于你的 CPU 运行多长时间的密集型函数。如果你正在寻找一个明显的减速的原因，那么 99 帧每秒应该是足够的。

当你得到了那 3 秒 pref 生成的记录，请用以上步骤的最后 2 步处理生成火焰图。

### 过滤掉 Node.js 的内置函数

通常你只希望看到你自定义函数的调用性能如何，因此把 Node.js 和 V8 内置函数过滤掉，可以让你的图变得简单又容易看懂。你可以这样做：

```bash
sed -i \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]\?/ /' \
  perfs.out
```

如果你现在读火焰图，就会觉得它看上去很怪 —— 花费了多数时间的主要函数就像丢了什么一样，你可以尝试不使用过滤参数，那么你也许得到一个罕见的情况下 Node.js 自身的问题。

### Node 的分析选项

`--perf-basic-prof-only-functions` 和 `--perf-basic-prof`：此二者函数对你的 JavaScript 调试有帮助，其余选项则用于分析 Node.js 自身，这已经超出了本章的范畴。

`--perf-basic-prof-only-functions`：因为输出少，所以使用此参数选项开销也少。

### 为什么我需要这些参数？

当然，如果没有这些参数的话，你照样可以得到火焰图。不过大部分的条状都将被标记为 `v8::Function::Call`。

## `perf` 输出的一些问题

### Node.js 8.x V8 管道上的变化

Node.js 8.x 及以上版本使用了 V8 引擎，采用了新的优化 JavaScript 编译管道模式。这使得一些函数的名字、引用有时候无法被 perf 捕获到（这也被成为“Turbofan”）。

导致的结果也就是在火焰图中你无法正确地得到一些函数名字。

你或许会注意到 `ByteCodeHandler:`，在那儿可以得到你期盼得到的函数名字。

[0x](https://www.npmjs.com/package/0x) 有一些对于此类情况的内置缓解措施。

欲知详情，请了解以下内容：

* https://github.com/nodejs/benchmarking/issues/168
* https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

### Node.js 10+

Node.js 10.x 使用 `--interpreted-frames-native-stack` 标志解决了“Turbofan”的问题。

运行 `node --interpreted-frames-native-stack --perf-basic-prof-only-functions`，你就可以在火焰图中得到函数的名字，无论过去 V8 引擎使用那个管道编译你的 JavaScript。

### 火焰图中受损的标签

如果你看到诸如以下的标签：

```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```

这意味着你正在运行的 Linux 的 perf 没有用 demangle 支持方法编译，请以 https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 作为示例参考。

## 示例部分

请通过[火焰图练习](https://github.com/naugtur/node-example-flamegraph)来练习捕获你的火焰图吧！
