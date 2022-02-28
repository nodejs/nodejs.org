---
title: 易于分析的 Node.js 应用程序
layout: docs.hbs
---

# 易于分析的 Node.js 应用程序

市面上有很多可以容易地分析 Node.js 应用程序的工具。但是在许多情况下，最简单的选项是使用 Node.js 内置的探查器。创建的探测器使用 [V8 内探测器][]，它收集该堆栈在程序执行期间的定期间隔的样本。并且它这些样本的结果，包含诸如 jit 编译的重要的优化事件，如以下刻度系列标示：

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```

在以前你需要 V8 源代码去解释这些刻度。幸运的是，从 Node.js 4.4.0 开始此工具就被引入，这样就方便了这些信息的消费而不另行建立 V8 源。让我们看看内置探查器如何帮助您洞察应用程序性能。

为了说明滴答探查器的使用，我们将使用一个简单的快速应用程序。我们的应用程序将有两个处理程序，一个用于向系统中添加新用户：

```javascript
app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[username] = { salt, hash };

  res.sendStatus(200);
});
```

另外一个用于验证用户尝试登陆：

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  const { salt, hash } = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  if (crypto.timingSafeEqual(hash, encryptHash)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});
```

*请注意，这些不是推荐的处理程序用于对 Node.js 中的用户进行身份验证；它们纯粹用于说明目的。您不应该尝试设计您自己的加密身份验证机制。使用现有的、经过验证的身份验证解决方案要好得多。*

现在假设我们已经部署了我们的应用程序，并且用户抱怨请求的延迟很大。我们可以轻松地运行应用程序与内置的探查器：

```
NODE_ENV=production node --prof app.js
```

然后使用 `ab` (ApacheBench) 在服务器上放些负载：

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

然后你就可以得到 ab 的输出：

```
Concurrency Level:      20
Time taken for tests:   46.932 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    5.33 [#/sec] (mean)
Time per request:       3754.556 [ms] (mean)
Time per request:       187.728 [ms] (mean, across all concurrent requests)
Transfer rate:          1.05 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (longest request)
```

从这个输出中我们可以看到我们只管理每秒约 5 个请求，并且平均请求只需要 4 秒的往返时间。在一个真实的世界例子中，我们可以代表用户请求在许多函数中做很多工作，但即使在简单的示例中，编译正则表达式、生成随机盐、从用户密码生成唯一哈希或在 Express 框架本身。

由于我们使用了 `--prof` 选项运行应用程序，因此在与应用程序的本地运行相同的目录中生成了一个刻度文件。它应该有形式 `isolate-0xnnnnnnnnnnnn-v8.log` (其中 `n` 为数字)。

为了使这个文件有意义，我们需要使用与 Node.js 捆绑在一起的刻度处理器。要运行处理器，请使用 `--prof-process` 标志：

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

在您最喜欢的文本编辑器中打开 processed.txt 将给您提供一些不同类型的信息。该文件被分解成部分，然后再次被语言分解。首先，我们看一下摘要部分：

```
 [Summary]:
   ticks  total  nonlib   name
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          Shared libraries
    215    0.6%          Unaccounted
```

这告诉我们：收集到的所有样本中有 97% 是在 C++ 代码中进行的。当查看处理的输出的其它部分时，我们应该最注意 C++ 中所做的工作（而不是 JavaScript）。考虑到这一点，我们接下来会找到 \[C++\] 部分，其中包含有关 C++ 函数占用最多 CPU 时间的信息，然后查看一下：

```
 [C++]:
   ticks  total  nonlib   name
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```

我们看到，前 3 个条目占了程序占用的 CPU 时间的 72.1%。从这个输出中，我们立即看到至少 51.8% 的 CPU 时间被称为 PBKDF2 的函数占用。它与用户密码中的哈希生成相对应。然而，较低的两个条目的因素是如何进入我们的应用程序（或者我们为了例子而假装如此）不会立即明显得看出来。为了更好地理解这些函数之间的关系，接下来我们将查看\[自下而上（重）配置文件\]部分，该节提供有关每个函数的主要调用方的信息。检查此部分，我们会发现：

```
   ticks parent  name
  19557   51.8%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
  19557  100.0%    v8::internal::Builtins::~Builtins()
  19557  100.0%      LazyCompile: ~pbkdf2 crypto.js:557:16

   4510   11.9%  _sha1_block_data_order
   4510  100.0%    LazyCompile: *pbkdf2 crypto.js:557:16
   4510  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30

   3165    8.4%  _malloc_zone_malloc
   3161   99.9%    LazyCompile: *pbkdf2 crypto.js:557:16
   3161  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30
```

分析此节需要的工作量比上面的原始刻度计数多一点。
在上面的每个“调用栈”中，父列中的百分比将告诉您在当前行中函数调用了上面行中的函数所占的样本百分比。例如，在中间“呼叫堆栈”以上为 _sha1_block_data_order，我们看到 `_sha1_block_data_order` 发生在 11.9% 样品，我们知道从上面的原始计数。然而，在这里我们也可以说，它总是由 Node.js 内部的 pbkdf2 函数调用加密模块。我们看到，同样 `_malloc_zone_malloc` 被称为几乎完全相同的 pbkdf2 功能。因此，使用中的信息这种观点，我们可以说，我们从用户的密码帐户计算的哈希不仅为上面所述的 51.8%，但也是前 3 的 CPU 时间采样函数，因为调用 `_sha1_block_data_order` 和`_malloc_zone_malloc` 是代表 pbkdf2 的功能而制作的。

在这一点上，很明显：基于密码的哈希生成应该是我们优化的目标。谢天谢地，您已经完全了解了[异步编程的好处][]，并且您认识到从用户密码生成哈希的工作正在以同步方式进行，从而绑定了事件循环。这将阻止我们在计算哈希时处理其它传入请求。

要解决此问题，请对上述处理程序进行小修改，以使用 pbkdf2 函数的异步版本：

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
    if (users[username].hash.toString() === hash.toString()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});
```

一次新的基于 ab ，关于以上异步版本的应用基准测试情况如下：

```
Concurrency Level:      20
Time taken for tests:   12.846 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    19.46 [#/sec] (mean)
Time per request:       1027.689 [ms] (mean)
Time per request:       51.384 [ms] (mean, across all concurrent requests)
Transfer rate:          3.82 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   1018
  66%   1035
  75%   1041
  80%   1043
  90%   1049
  95%   1063
  98%   1070
  99%   1071
 100%   1079 (longest request)
```

耶！您的应用程序现在每秒服务约 20 个请求，大约是同步哈希生成的4倍。此外，平均滞后时间从 4 秒前下降到仅 1 秒。

希望通过对此（诚然是做作的）示例的性能调查，您已经看到了 V8 刻度处理器如何帮助您更好地了解 Node.js 应用程序的性能。

你也会发现[如何创建火焰图][]对你是有帮助的。

[V8 内探测器]: https://v8.dev/docs/profile
[异步编程的好处]: https://nodesource.com/blog/why-asynchronous
[如何创建火焰图]: /zh-cn/docs/guides/diagnostics-flamegraph/
