---
title: Node.js 中处理安全性问题的最佳实践做法
layout: docs.hbs
---

# Node.js 中处理安全性问题的最佳实践

## 本文目的

本文旨在对目前既有的[威胁示例][]进行扩展，并且提供一些扩展的例子教导如何
让你的 Node.js 应用安全性得到保障。

## 本文内容

* 最佳实践做法：这是一个针对 Node.js 应用的安全性问题的最佳实践做法的精简压缩版。
我们可以使用[安全指南讨论议题][安全指南讨论议题]或者是[nodejs 使用指南][nodejs 使用指南]
作为我们的开始。值得注意的是：本文特定针对的是 Node.js，如果你正在寻找其它更通用的教程，
可以参考[OSSF 最佳实践做法][]。
* 安全性攻击解释：用最通俗易懂的语言，根据需要配上一些代码，来解释在我们在威胁示例
中提到的攻击方式。
* 第三方库中的潜在攻击方式（诸如“误植”式攻击，含有恶意代码的包库……），以及关于 node
模块依赖等问题的一系列最佳实践。

## 威胁列表

### HTTP 拒绝服务式攻击（CWE-400）

这种攻击会导致应用程序变得无法响应请求而拒绝服务，其攻击原理是依据处理 HTTP 请求的方式
导致的。这些攻击性请求并非一定是经过精心策划，甚至连一台错误配置，又或者有缺陷的客户端也
会发送大量请求到服务端，导致拒绝式服务。

HTTP 请求通过 Node.js 的 HTTP 服务器得以接受，并传递给已注册的相关程序代码进行处理。
因为服务本身并不解析请求数据的实际内容，因此对于任何一个试图通过文本内容发起 HTTP 拒绝
服务式攻击，接受这些请求的处理模块本身并不存在缺陷，因为这是处理模块中代码的职责，它应该
准确地处理这些问题。

请务必确保服务器能够处理服务端的错误，否则服务器在处理请求时发生了错误，恰好
又没有处理异常的相关代码，那么就可能存在拒绝服务式攻击的潜在威胁。

```js
const net = require('net');

const server = net.createServer(function(socket) {
  // socket.on('error', console.error) // this prevents the server to crash
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(5000, '0.0.0.0');
```

此处如果接受一个 _非法请求_ ，服务器就可能崩溃了。

另一个案例 [Slowloris][] 并非是通过请求的内容发动拒绝式服务攻击。
在这个攻击中，HTTP请求发送既慢又散，每次就发送一点点内容，这样就会导致服务器为等待完整
的请求不得不一直保留大量的资源。设想一下：如果这种请求足够的多，连接数很快会达到最大值，
然后就发生拒绝式服务的问题。这就是不通过发送文本的内容，而是借助消耗时间，以及发送大量
碎片化请求的方式进行攻击的。

**缓解措施**

* 使用一个反向代理来接受、转发 Node.js 应用程序请求，反向代理可以提供诸如缓存、负载均衡、
IP 黑名单等方式尽可能减少服务式拒绝攻击发生的可能性。
* 正确地配置服务器超时时间（timeout），这样凡是龟速响应请求以及一直原地不动的连接请求就会
被直接抛弃。请了解超时配置的区别，并查看 [`http.Server`][] 部分，尤其是 `headersTimeout`，
`requestTimeout`, `timeout` 和 `keepAliveTimeout`。
* 在每台主机上限制开放端口的总数。请查看 [http 文档][]，尤其是 `agent.maxSockets`，
`agent.maxTotalSockets`，`agent.maxFreeSockets` 和 `server.maxRequestsPerSocket`。

### DNS 重绑定（CWE-346）

这种攻击方式针对正在运行中的，并且使用 [--inspect switch][] 参数开启了调试观察器
的 Node.js 应用程序。

在一个网页浏览器里边可以发起 WebSocket 和 HTTP 两种请求方式，他们可以对本地的调试
观察器同时作用。通常而言，这是被主流浏览器的[同源协议][]所禁止，它不允许执行来自不同
的源的脚本（这也同时意味着一个恶意的网站不能读取来自本地 IP 地址的内容）。

然而通过 DNS 重绑定的方法攻击者可以为了他们的恶意请求而临时控制发送源，使得请求看上去
就像是从本地发出的一样。这种方法通过同时控制网站以及处理 IP 地址的 DNS 服务器来实现。
请查看 [DNS 重绑定维基百科][]了解更多细节。

**缓解措施**

* 通过挂上 `process.on(‘SIGUSR1’, …)` 的监听器方式禁止调试观察器 _SIGUSR1_ 的信号。
* 不要在生产环境中使用调试观察器。

### 向不明身份者暴露敏感信息（CWE-552）

在当前目录下所有的文件、文件夹都会通过打包发布的方式推送致 npm 的注册服务器上。
有一些机制可以避免这种行为：诸如通过定义 `.npmignore` 和 `.gitignore`，或者
在 `package.json` 中定义白名单列表。

**缓解措施**

* 使用 `npm publish --dry-run` 开列所有将要被发布的文件，并在发布前请确保这些
文件都被审核过是可以发布的。
* 创建和维护诸如 `.gitignore` 和 `.npmignore` 之类的文件，避免发布不必要的文件。
在这些文件中你可以指定哪些文件（文件夹）不应该被发布。`package.json` 中的[文件属性][]
允许你进行反操作（哪些文件是可以发布的）。
* 万一发布了不应该发布的内容，请参考 [如何撤消已有的发布][] 撤消你的发布。

### HTTP 请求夹带私货（CWE-444）

这种攻击方式涉及到两个 HTTP 服务端（通常一个是代理，一个是 Node.js 应用）。客户端
发送一个 HTTP 请求首先到代理服务器，代理服务器将请求转发到后台服务（也就是 Node.js 应用）。
当前端和后端对于这个请求的解析产生歧义时，攻击者就可能发送一个恶意信息，并且该信息不会被
前端所发现，却会被后台所处理。这就是有效的“夹带私货”式透过代理服务器发动攻击。

预知详情，请查看 [CWE-444][] 中相关信息和例子。

基于这样一个事实：即攻击依赖于 Node.js 解析 HTTP 请求的方式与任何一个 HTTP 前端服务器
所不同，那么该 Node.js 存在可能被攻击的缺陷，这可以是前端，也可能前后端都存在。
如果 Node.js 解析请求的方式与 HTTP 特性文档中描述的一致（具体参考 [RFC7230][]），那么
这个 Node.js 应用就不会被认为是存在缺陷的。

**缓解措施**
* 当创建一个 HTTP 服务时，请不要使用 `insecureHTTPParser` 选项
* 前端做适当的配置，使得带有歧义的请求能够正常化
* 对 HTTP 发出的新“私货”请求请持续在 Node.js 端以及前端都保持留意
* 使用第二代的 HTTP 协议（HTTP/2），并不允许降级

### 根据耗时的多少猜测敏感信息导致信息暴露（CWE-208）

该攻击方式是攻击者根据发起请求后服务器需要多久才给出一个回复所用的耗时，不知不觉地猜测出一些敏感的信息。
该攻击方式不仅是针对 Node.js，几乎所有的应用都会受到这种攻击方式的影响。

该攻击方式容易发生在一个需要一定时间进行某保护性的操作中（例如）。
设想一下我们是如何处理身份验证的：身份验证最基础 的方法便是“电子邮件”+“密码”的组合。
系统从用户的输入得到了登陆信息，再从数据库里边得到已有信息。在从客户输入那边获取信息之时，
程序将把用户输入的密码与数据库中的密码进行比对。使用系统内置的字符串比较，
对于一定程度相同的字符串是需要消耗一定时间的。在不断地反复比较，
直到达到一定的次数和响应时间之后，通过比较响应请求时间，攻击者就可能猜测出密码的长度，
甚至是密码内容。

**缓解措施**

* 请使用 `timingSafeEqual` 函数来比较敏感信息的内容，因为它的耗时是一个固定值。
* 在进行密码比较的过程中，请使用 [scrypt][]。

* 更一般地说，我们应当避免在可变时间操作中使用保护性措施。
这包括分支保护，以及当攻击者可能位于同一基础架构（例如，同一台云计算机）上时，
使用保护性措施作为内存索引。在 JavaScript 中写入固定耗时的代码极其困难（部分因为 JIT 的缘故）。
对于那些加密的应用而言，使用内置的加密 API 函数或者是 WebAssembly 为好
（因为 WebAssembly 的算法并非本地实现）。

### 含有恶意攻击的第三方库 （CWE-1357）

目前为止，Node.js 中任何一个包都有强大的能力去访问其它资源：例如网络资源等。
更进一步地说，Node.js 中的包可以访问本地文件系统，并且把数据发送到任何地方。

在 node 里可以通过 `eval()` （或者其它类似的方式）加载、运行任何代码。
所有与文件系统相关，拥有写权限的代码也能通过写入一个新文件，或者已有文件，当他们
被加载执行时就能达到一样的目的。

Node.js 携带一个尝鲜版本的[¹][尝鲜版特性]
[规则机制][]来声明所加载的资源是否是可被新信任的。请务必确定所有的依赖包版本号，
以及借助公共工作流或 npm 的脚本来自动检测这些包里可能潜在的缺陷。
在安装依赖包时，请务必确认这些包都是被正常维护的，并包含你预期的内容。
请务必小心！GitHub 的源代码不总是和发布版本保持一致，请在 _node\_modules_ 里仔细验证。

#### 供应链式攻击

Node.js 中 “供应链式攻击”通常发生在某个（些）依赖（无论是直接依赖还是间接依赖）
已经被攻陷的情况下。究其原因便是这类应用的特定依赖审核太过于松散（甚至允许根本不需要的更新进入），
或者是常规的拼写错误导致的误认（请参考 [typosquatting][]）。

一个控制上游更新端的攻击者完全可以发布一个新的，携带恶意代码的更新包。如果 Node.js
应用没经过检验或者不确定哪个包是安全的，那么这个包就有潜在更新成为携带恶意代码的包的可能性，
随之攻陷你的系统。

在 `package.json` 中定义的所有依赖都有精确的版本号，亦或是某个特定范围。你即使对某个
包指定了一个精确的版本号，这个包所依赖的其它包不一定是固定的。这将仍然导致应用缺陷或者
不安全、不期望的包更新。

可能存在的媒介攻击：

* “误植”域名
* 篡改 Lockfile
* 受到侵害的维护者
* 恶意第三方的包（类库）
* 依赖混淆

**缓解措施**

* 使用 npm 的指令 `--ignore-scripts` 来禁止外部脚本运行
  * 另外，你也可以直接使用 `npm config set ignore-scripts true` 方式禁止脚本运行
* 给第三方包指定精确的版本，勿指定一个宽泛的版本范围，或者是不确定可变的更新源
* 使用 lockfiles，固定每一个依赖包（无论直接引用或是间接的）
  * 参考 [对 lockfile 恶意篡改的缓解措施][] 部分
* 使用 CI 自动检测可能存在的缺陷，可以借助 [`npm-audit`][]
  * 诸如 [`Socket`][] 的工具也可使用，他可以静态分析依赖包，
  并且找出网络或文件系统方面的潜在风险性行为。
* 使用 [`npm ci`][] 而不是 `npm install`
此命令强制比对 lockfile 里的版本号，如果和 _package.json_ 中的依赖发生冲突，
直接抛出异常而不是默默地忽略，迁就 _package.json_ 的定义
* 小心检查 _package.json_ 文件里的每个依赖包的名称，切勿拼错

### 非法内存访问（CWE-284）

基于内存或者基于堆栈的攻击都依赖于内存管理错误，或者内存分配泄露。

正如其它程序一样，如果你的 Node.js 程序运行在共享机上，是有可能存在被攻击的。

使用安全性高的堆栈确实有助于此问题的解决，防止从带有缺陷的超载或空载机器中泄露敏感信息。

不幸的是安全堆栈并不适合于 Windows 操作系统。预知详情请看[安全堆栈文档][]。

**缓解措施**

* 使用`--secure-heap=n` 限定内存大小，“n”就是最大的字节大小。
* 不要在共享机上运行正式版程序。

### 鱼目混珠（CWE-349）

“鱼目混珠”（猴子补丁）指在运行时通过修改属性达到篡改原有行为的操作。举个例子：

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};
```

**缓解措施**

借助尝鲜版的 `--frozen-intrinsics` 符号[¹][尝鲜版特性]
来冻结内置对象的原型，这意味着所有的 JavaScript 对象以及其内部的一切函数等均不再可变。
有鉴于此，以下的脚本**将不会**覆盖原有的 `Array.prototype.push` 代码：

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};

// Uncaught:
// TypeError <Object <Object <[Object: null prototype] {}>>>:
// Cannot assign to read only property 'push' of object ''
```
诚然如此，但你目前仍然可以使用 `globalThis` 来定义新的，以及替换已有的全局变量。

```console
> globalThis.foo = 3; foo; // you can still define new globals
3
> globalThis.Array = 4; Array; // However, you can also replace existing globals
4
```
至此，`Object.freeze(globalThis)` 可以派上用场，以确保你无法更改任何全局性变量。

### 原型污染（CWE-1321）

原型污染指滥用 _\_proto\__、_constructor_或 _prototype_，以及从内置方法中继承等方式
在 Javascript 内恶意篡改、注入一些东西。

<!-- eslint-skip -->

```js
const a = {"a": 1, "b": 2};
const data = JSON.parse('{"__proto__": { "polluted": true}}');

const c = Object.assign({}, a, data);
console.log(c.polluted); // true

// Potential DoS
const data2 = JSON.parse('{"__proto__": null}');
const d = Object.assign(a, data2);
d.hasOwnProperty('b'); // Uncaught TypeError: d.hasOwnProperty is not a function
```

上面的 JavaScript 代码就暗含存在的隐患。

**例子**:

* [CVE-2022-21824][] (Node.js)
* [CVE-2018-3721][] (3rd Party library: Lodash)

**缓解措施**

* 避免 [不安全的递归式合并][]，参考 [CVE-2018-16487][]
* 对于外部以及不信任的对象，请使用 JSON 骨架（JSON Schema）来验证
* 使用 `Object.create(null)` 创建无原型（prototype）的对象
* 冻结对象原型： `Object.freeze(MyObject.prototype)`
* 使用 `--disable-proto` 禁止 `Object.prototype.__proto__` 属性
* 请检查对象上是否存在着特定属性，而不是使用 `Object.hasOwn(obj, keyFromObj)` 方法来检测
* 勿直接使用 `Object.prototype` 里边的方法

### 不可控的搜索路径对象（CWE-427）

Node.js 根据[模块路径算法][]来加载模块，因此我们假定说模块中的某个文件夹
是可信的。

基于此，这意味着以下的操作是符合预期的，让我们假设存在着以下的目录结构：

* _app/_
  * _server.js_
  * _auth.js_
  * _auth_

如果服务端调用 `require('./auth')`，结果加载 _auth_ 并非 _auth.js_

**缓解措施**

借助[¹][尝鲜版特性]
[完整检查路径的规则机制][] 可避免此类问题。
对于上述的路径，可以使用诸如下面的 `policy.json`：

```json
{
  "resources": {
    "./app/auth.js": {
      "integrity": "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8="
    },
    "./app/server.js": {
      "dependencies": {
        "./auth" : "./app/auth.js"
      },
      "integrity": "sha256-NPtLCQ0ntPPWgfVEgX46ryTNpdvTWdQPoZO3kHo0bKI="
    }
  }
}
```

自然而言，当调用 _auth_ 模块的时候，系统会验证路径完整性，如果发现无法找到
正确的匹配项，直接抛出异常：

```console
» node --experimental-policy=policy.json app/server.js
node:internal/policy/sri:65
      throw new ERR_SRI_PARSE(str, str[prevIndex], prevIndex);
      ^

SyntaxError [ERR_SRI_PARSE]: Subresource Integrity string "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8=%" had an unexpected "%" at position 51
    at new NodeError (node:internal/errors:393:5)
    at Object.parse (node:internal/policy/sri:65:13)
    at processEntry (node:internal/policy/manifest:581:38)
    at Manifest.assertIntegrity (node:internal/policy/manifest:588:32)
    at Module._compile (node:internal/modules/cjs/loader:1119:21)
    at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Module._load (node:internal/modules/cjs/loader:878:12)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:99:18) {
  code: 'ERR_SRI_PARSE'
}
```

请注意，我们总是推荐你使用 `--policy-integrity` 以避免路径发生变化时遇到问题。

## <!--experimental-features-in-production-->生产环境中使用尝鲜版功能

在生产环境中直接使用尝鲜版功能绝不推荐！因为尝鲜功能有可能随时发生重大
变更，而且他们实际的功能不一定稳定。虽然如此，我们还是非常乐于接受用户的反馈。

[威胁示例]: https://github.com/nodejs/node/blob/main/SECURITY.md#the-nodejs-threat-model
[安全指南讨论议题]: https://github.com/nodejs/security-wg/issues/488
[nodejs 使用指南]: https://github.com/goldbergyoni/nodebestpractices
[OSSF 最佳实践做法]: https://github.com/ossf/wg-best-practices-os-developers
[Slowloris]: https://en.wikipedia.org/wiki/Slowloris_(computer_security)
[`http.Server`]: https://nodejs.org/api/http.html#class-httpserver
[http 文档]: https://nodejs.org/api/http.html
[--inspect switch]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[同源协议]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[DNS 重绑定维基百科]: https://en.wikipedia.org/wiki/DNS_rebinding
[文件属性]: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files
[如何撤消已有的发布]: https://docs.npmjs.com/unpublishing-packages-from-the-registry
[CWE-444]: https://cwe.mitre.org/data/definitions/444.html
[RFC7230]: https://datatracker.ietf.org/doc/html/rfc7230#section-3
[规则机制]: https://nodejs.org/api/permissions.html#policies
[typosquatting]: https://en.wikipedia.org/wiki/Typosquatting
[对 lockfile 恶意篡改的缓解措施]: https://blog.ulisesgascon.com/lockfile-posioned
[`npm ci`]: https://docs.npmjs.com/cli/v8/commands/npm-ci
[安全堆栈文档]: https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#--secure-heapn
[CVE-2022-21824]: https://www.cvedetails.com/cve/CVE-2022-21824/
[CVE-2018-3721]: https://www.cvedetails.com/cve/CVE-2018-3721/
[不安全的递归式合并]: https://gist.github.com/DaniAkash/b3d7159fddcff0a9ee035bd10e34b277#file-unsafe-merge-js
[CVE-2018-16487]: https://www.cve.org/CVERecord?id=CVE-2018-16487
[scrypt]: https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
[模块路径算法]: https://nodejs.org/api/modules.html#modules_all_together
[完整检查路径的规则机制]: https://nodejs.org/api/permissions.html#integrity-checks
[尝鲜版特性]: #experimental-features-in-production
[`Socket`]: https://socket.dev/
