---
title: Live Debugging
layout: docs.hbs
---

# 在线调试

* [在线调试](#live-debugging)
  * [我的程序没有以预期方式工作](#my-application-doesnt-behave-as-expected)
    * [表现症状](#symptoms)
    * [如何调试](#debugging)

你将在本文中学到如何在线调试 Node.js 进程。

## <!--my-application-doesnt-behave-as-expected-->我的程序没有以预期方式工作

### <!--symptoms-->表现症状

用户或许已经观察到对于特定的输入，程序无法输出预期值。举个例子：一个 HTTP 服务以 JSON
格式返回数据，但某些字段却是空的。许多错误的原因皆可导致此问题的发生，不过在本示例中，我们
着重关注程序的逻辑以及如何修复。

### <!--debugging-->如何调试

在本示例中，用户需要理解“程序路径”：它表示为响应一个特定的触发，应用程序所执行的路径（例如：HTTP
请求路径）。同时用户也希望通过“走单步”的方式贯穿整个代码，顺便控制代码的执行流程，以及观察
内存中变量中到底存储了什么数据。预知详情，可以点击下面的链接：

* [使用内存检查器](/zh-cn/docs/guides/diagnostics/live-debugging/using-inspector)
