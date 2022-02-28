---
title: 调试 - 入门指南
layout: docs.hbs
---

# 调试指南

本指南将帮助你开始学习调试 Node.js 程序和脚本。

## 启用检查器

当使用 `--inspect` 开关符启动检查器时，一个 Node.js 进程开始侦听调试客户端。默认情况下侦听 127.0.0.1:9229 的域名和端口号；每个进程都有一个唯一的 [UUID][] 标示符。

检查器的客户端必须知晓并制定连接的域名地址、端口号以及 UUID。一个完整的 URL 看上去如：`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`。

如果收到了 `SIGUSR1` 信号 (`SIGUSR1` 在 Windows 下不可用)，Node.js 同样会开始侦听调试信息；在 Node.js 7 以及先前的版本中，这将激活旧版本的调试 API（legacy Debugger API）；在 Node.js 8 和后续版本中，将激活检查器 API（Inspector API）。

---
## 安全隐患

由于调试器对 Node.js 执行环境具有完全访问权限，能够连接到此端口的恶意行为者能够代替 Node.js 进程执行任意代码。理解将调试器端口暴露在公共和专用网络上所受影响的安全性是很重要的。

### 把调试端口暴露在公共网络是不安全的

如果调试器与一个公共的 IP 地址绑定，或者与 0.0.0.0 绑定，任何可以访问你 IP 地址的客户端都可以在不受限的情况下连接调试器，然后随意运行代码。

默认情况下，`node --inspect` 绑定 127.0.0.1。如果打算允许外部连接到调试器，则明确需要提供公共 IP 地址或 0.0.0.0 等。这样做可能会使您面临潜在的重大安全威胁。我们建议您在适当的位置确保适当的防火墙和访问控制，以防止安全隐患。

查看 '[启用远程调试情形](#enabling-remote-debugging-scenarios)' 章节部分，以了解如何安全地允许远程调试器连接调试。

### 本地应用有足够的权限访问监视器

即便你把监视器绑定到 127.0.0.1（默认），任何在你本地机器上运行的应用程序仍然毫无限制地可以访问。这是因为在设计上我们允许本地调试器可以轻松方便地进行连接。

### 浏览器，网络套接字和同源政策

网站的开放是通过一个可以让网络套接字和 HTTP 请求在浏览器安全模式下进行的。一个初始化的 HTTP 连接必须先获得一个唯一的调试会话 ID。同源政策能够阻止这个网站与 HTTP 连接。对于其它额外的安全防范[DNS 重新绑定攻击](https://en.wikipedia.org/wiki/DNS_rebinding)，Node.js 会先精确验证‘宿主’头连接不是一个一个指定的 IP 地址，就是 `localhost`，又或者是 `localhost6`。

这些安全政策不允许通过指定主机名的方式直接进行远程连接。你不是通过指定 IP 地址，就是使用 ssh 管道的方式（下面将会有所陈述）绕开此限制。

## 监视器客户端

一些商业和开源工具可以连接到 Node 的监视器上，关于它们基本信息如下：

### [Node 监视器](https://github.com/nodejs/node-inspect)

* 由 Node.js 基础库，使用[检查器协议][]支持的 CLI 调试器。
* 和 Node 绑定在一起的版本，并且可以使用 `node inspect myscript.js`。
* 最新的版本同样可以单独通过（例如 `npm install -g node-inspect`）方式安装，并使用 `node-inspect myscript.js`。

### [Chrome 开发工具](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **选项 1**: 在基于 Chromium 内核的浏览器下打开 `chrome://inspect`。点击配置按钮确保你的目标宿主和端口号列入其中。
* **选项 2**: 从 `/json/list` 中拷贝 `devtoolsFrontendUrl`（见上），或者加上 --inspect 以检查提示文本并粘贴到 Chrome 中。

> 请注意：Node.js 和 Chrome 必须在同一个平台上运行。

### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* 在 Debug 面板中，点击设置按钮打开 `.vscode/launch.json`，选择 "Node.js" 进行初始化构建。

### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017+

* 从菜单中或者单击 F5， "Debug > Start Debugging"。
* [详细指导](https://github.com/Microsoft/nodejstools/wiki/Debugging)

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ 以及其它版本

* 创建一个新的 Node.js 调试配置，点击调试。在 Node.js 7 版本上默认会加上 `--inspect` 开关。禁用 uncheck `js.debugger.node.use.inspect` IDE 注册表。

### [chrome 远程接口](https://github.com/cyrus-and/chrome-remote-interface)

* 简化对检查器协议终端连接的库。

### [Gitpod](https://www.gitpod.io)

* 你可以通过 `Debug` 视图，或者按下 `F5` 启动 Node.js 调试。[查看详细教程](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

### [Eclipse IDE](https://eclipse.org/eclipseide) 带有 Eclipse 万维网开发扩展的开发

* 从某个后缀为 js 文件，选择 “以……方式调试（Debug As...） > Node 程序 （Node program）”，或者
* 创建一个调试配置，它把调试器挂接到一个正在运行的 Node 程序上（并且该调试已经使用 `--inspect` 参数）。

---

## 命令行选项

以下命令表列出了在调试状态下不同标示符的影响：

<table class="table-no-border-no-padding">
  <tr><th>标示符</th><th>含义</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>启用监视器代理</li>
        <li>在默认地址和端口上监听（127.0.0.1:9229）</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>启用监视器代理</li>
        <li>绑定地址或主机名<em>宿主</em> （默认：127.0.0.1）</li>
        <li>监听<em>端口</em> （默认：9229）</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>启用监视器代理</li>
        <li>监听默认地址和端口（127.0.0.1:9229）</li>
        <li>在用户代码启动前终止</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>启用监视器代理</li>
        <li>绑定地址和主机名<em>宿主</em>（默认：127.0.0.1）</li>
        <li>监听<em>端口</em>（默认：9229）</li>
        <li>在用户代码启动前终止</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>Node 监视<em>script.js</em></code></td>
    <td>
      <ul>
        <li>通过 --inspect 标志生成一个新的子进程，使用主进程运行 CLI 调试器。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>通过 --inspect 标志生成一个新的子进程，使用主进程运行 CLI 调试器。</li>
        <li>监听<em>端口</em>（默认：9229）</li>
      </ul>
    </td>
  </tr>
</table>

---

## <!--enabling-remote-debugging-scenarios-->启用远程调试的情形

我们推荐你千万不要使用调试器监听公共的 IP 地址。如果你真需要允许远程调试连接，那么就请使用 SSH 代替。以下我们提供你例子仅是为解释目的。请在开始前理解允许远程访问特权的安全风险。

让我们假定你在一台远程机器上运行 Node，譬如 remote.example.com。你想进行调试。在那台机器上你应该启动 node 进程，让监视器仅监听本地（默认）。

```bash
node --inspect server.js
```

现在，在你本地机器上，从你初始化一个调试客户端连接开始，你创建了一个 SSH 管道：

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

ssh 管道启动，在你机器上连接到 9221 端口将被重定向到 9229 的 remote.example.com 地址上。你可以附加一个调试器，例如 Chrome 开发工具或者是指向 localhost:9221 的 Visual Studio Code。如果 Node.js 本地正在运行，应该可以调试了。

---

## 遗留的调试器

**遗留的调试器自 Node 7.7.0 已被弃用。请使用 --inspect 代替。**

在版本 7 以及更早的版本使用 **--debug** 或 **--debug-brk** 开关启动调试时，Node.js 侦听由中断定义的调试命令，TCP 端口上的 V8 调试协议，默认为 `5858`。任何遵守此协议的调试客户端都可以连接并调试运行这个进程，下面有一些热门的说明。

V8 调试协议再也不维护或是归档了。

### [内置调试器](https://nodejs.org/dist/{#var currentVersion}/docs/api/debugger.html)

在 Node.js 内置命令行调试器中用 `node debug script_name.js` 启动你的脚本。你的脚本就在 Node 另外一个进程中随着 `--debug-brk` 启动了起来，并且初始化的 Node 进程运行 `_debugger.js` 脚本连接上你的目标。

### [node 监视器](https://github.com/node-inspector/node-inspector)

用 Chrome 开发工具，通过 Node.js 的中间进程把 Chromium 中的检查器协议转换成 V8 调试器协议进行程序调试。

[检查器协议]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
