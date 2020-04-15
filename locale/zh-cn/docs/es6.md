---
title: ECMAScript 2015 (ES6) 以及未来展望
layout: docs.hbs
---

# ECMAScript 2015 (ES6) 以及未来展望

Node.js 是针对 [V8](https://v8.dev/) 引擎构建的。通过与此引擎的最新版本保持同步，我们确保及时向 Node.js 开发人员提供 [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 中的新功能，以及持续的性能和稳定性改进。

所有的 ECMAScript 2015 (ES6) 功能将被分为三个部分 **shipping**，**staged** 和 **in progress**：

* 所有 **shipping**：在 V8 引擎中认为是稳定的，转变成 **Node.js 默认**，并且 **不会** 需要任何运行时标记。
* **Staged**：这些是将要完成的特性，并且在 V8 团队看来并不一定稳定，需要一个 `--harmony` 标记。
* **In progress**：这些特性可以通过各自单独的 harmony 标记被激活使用。除非为了测试用途，否则绝不鼓励这样做。值得注意的是这些标记是借由 V8 引擎公开，将来或许会有潜在的变化而不会有任何免责声明或者协议。

## 默认情况下什么特性随着 Node.js 一起发布？

[node.green](https://node.green/) 提供了非常完整、几乎涵盖了不同版本的 Node.js 中所支持的 ECMAScript 特性。它基于 kangax 的兼容性对照表构建。

## 有哪些特性在开发中？

新特性源源不断地被加入 V8 引擎。一般说来，虽然具体的时间未知，但我们总希望他们将来在 Node.js 中有所体现。

在每个 Node.js 发布版中，你可以通过 greeping 配上 `--v8-options` 参数罗列出全部处于 *in progress* 状态的特性功能。请注意：他们尚未完成，可能因为 V8 引擎自带的功能而夭折。所以使用这些特性时会冒风险。

```bash
node --v8-options | grep "in progress"
```

## 对于一个特定的功能，它的特性又如何呢？

V8 团队现正在努力持续工作，他们借助 EcmaScript 5 或是更早时代的语言规范，利用转译或是本地相当的技术以提高新语言的功能特性，使之达到平衡。目前研发进度记录可以在 [six-speed](https://fhinkel.github.io/six-speed) 查询到，它会告诉你 ES2015 和 ESNext 的性能究竟如何（和本地的 ES5 同等技术相比）。

特性优化的工作也随着 ES2015 到来，以上计划是通过[执行计划](https://docs.google.com/document/d/1EA9EbfnydAmmU_lM8R_uEMQ-U_v4l9zulePSBkeYWmY)，有一个 V8 团队在那儿收集整理相关信息，并协调需要提高性能、设计追踪问题的文稿等部门。

## 我有我自己的基本框架，可以利用 --harmony，所以我可以移除这个标记吗？

目前来说，`--harmony` 在 Node.js 的作用是让 **staged** 特性起作用。它本质上等同于 `--es_staging`。如上所述，有些特性尚未完全确认是稳定的，所以如果你希望一个安全的环境（尤其是在发布环境），你应该考虑移除这个运行时的环境标记，直到它在 V8 中以默认形式发布，或者在 Node.js 中落地。如果你开启了这个开关，你应该有对未来 Node.js 升级而造成代码破坏（无法正常工作）的准备，比如 V8 引擎做了更改，它的语法变得更接近标准。

## 我怎么知道某个特定版本的 Node.js 发布是随着哪个版本的 V8 引擎呢？

Node.js 提供了一个简单的方法以列出所有依赖项，以及通过 `process` 全局对象，借助特定的二进制包发布的不同版本。由于是 V8 引擎，在你的终端输入以下命令就可以获取相关版本号：

```bash
node -p process.versions.v8
```
