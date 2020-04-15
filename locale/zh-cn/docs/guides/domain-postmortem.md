---
title: 域模块已死
layout: docs.hbs
---

# 域模块已死

## 使用中的问题

### 隐式行为

对于一个开发者而言，创建一个新的域然后简单地通过 `domain.enter()` 运行起来，然后在将来它就可以捕获全部抛出异常者无法观察到的异常。允许模块作者截取不同模块中无关代码的异常而不让原来的代码知道它的自身异常。

下面是一个间接链接模块如何影响另一个模块的例子：

```js
// module a.js
const b = require('./b');
const c = require('./c');

// module b.js
const d = require('domain').create();
d.on('error', () => { /* silence everything */ });
d.enter();

// module c.js
const dep = require('some-dep');
dep.method(); // Uh-oh! This method doesn't actually exist.
```

因为模块 `b` 进入了域中且从未退出，任何未捕获的异常将被吞掉。茫茫然地留下模块 `c` 而为什么它没有运行整个脚本？留下一个可能部分填充的模块 `module.exports`。这么做与监听 `'uncaughtException'`是不同的。后者明显指全局捕获异常错误，另外一个问题是域在任何 `'uncaughtException'` 处理程序之前进行处理，并阻止它们继续执行。

另一个问题是如果在事件激发者上没有相关 `'错误'` 控制，域自动路由错误。这种选择机制对你而言没的选择，它会在整个异步链上自动传播。这个或许一开始看起来有用，但是一旦异步调用是两个或多个模块，其中有一个不包含域的创建者的错误处理程序突然遇到了意想不到的例外，抛出异常的也就不会被作者注意到。

下面是一个简单的例子，说明丢失的 `'错误'` 处理程序是如何允许的主动域劫持错误的：

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', (err) => console.error(err.message));

d.run(() => net.createServer((c) => {
  c.end();
  c.write('bye');
}).listen(8000));
```

即便通过 `d.remove(c)` 手动移除连接也不会阻止连接错误不会自动捕获。

困扰错误路由和异常处理的故障是不一致的错误如何冒泡。下面是一个例子说明嵌套域怎样在异常发生时向上冒泡异常：

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', () => console.error('d intercepted an error'));

d.run(() => {
  const server = net.createServer((c) => {
    const e = domain.create(); // No 'error' handler being set.
    e.run(() => {
      // This will not be caught by d's error handler.
      setImmediate(() => {
        throw new Error('thrown from setImmediate');
      });
      // Though this one will bubble to d's error handler.
      throw new Error('immediately thrown');
    });
  }).listen(8080);
});
```

可以预期嵌套域始终保持嵌套，并且总是将异常传播到域堆栈上。或者那些例外不会自动发生冒泡。不幸的是，这两种情况都会发生，导致可能混淆的行为，甚至可能很难调试时序冲突。

### API 缺陷

虽然基于 `EventEmitter` 的 API 可以使用 `bind()` ，而错误回调风格的回调可以使用 `intercept()`，但是隐式绑定到活动域的替代 API 必须在 `run()` 中执行。这意思是，如果模块作者想用一种机制来支持域，那么就可以使用必须手动实现域自身的支持机制。而不是能够利用已经存在的隐含机制。

### 错误传递

如果可能的话，跨嵌套域传播错误不是直截了当的。现有文档显示了在请求处理程序中出现错误时如何使用 `close()` 方法关闭 `http` 服务器的简单示例。它没有解释的是，如果请求处理程序为另一个异步请求创建另一个域实例，则如何关闭服务器。以下作为错误传播失败的简单例子：

```js
const d1 = domain.create();
d1.foo = true; // custom member to make more visible in console
d1.on('error', (er) => { /* handle error */ });

d1.run(() => setTimeout(() => {
  const d2 = domain.create();
  d2.bar = 43;
  d2.on('error', (er) => console.error(er.message, domain._stack));
  d2.run(() => {
    setTimeout(() => {
      setTimeout(() => {
        throw new Error('outer');
      });
      throw new Error('inner');
    });
  });
}));
```

即使在域实例被用于本地存储的情况下，使得对资源的访问仍可用，仍然没有办法允许错误从 `d2` 继续传播到 `d1`。快速检查可以告诉我们简单地从 `d2` 域 `'错误'` 处理程序中抛出将允许 `d1` 捕获异常并执行它自己的错误处理程序。虽然不是这种情况。在检查 `domain._stack` 时，您会看到堆栈只包含 `d2` 。

这可能被认为是 API 的一个失败，但即使确定它在这方面可以运行，还有一个问题，就是当异步执行中的某个分支发生了失败，那么所有进一步的操作都必须终止。在 http 请求处理程序的示例中，如果我们发起几个异步请求，然后每个 `write()` 方法数据返回到客户端，试图对一个已经关闭的处理调用 `write()` 方法时会出现更多的错误。关于 _异常的资源清理_ 中对此进行了更多的讨论。

### 异常的资源清理

下面的脚本包含一个更复杂的示例。它是关于在一个小的资源依赖树中正确资源清理，在一个给定的连接或其任何依赖关系中发生异常的情况下，将脚本分解为基本操作：

```js
'use strict';

const domain = require('domain');
const EE = require('events');
const fs = require('fs');
const net = require('net');
const util = require('util');
const print = process._rawDebug;

const pipeList = [];
const FILENAME = '/tmp/tmp.tmp';
const PIPENAME = '/tmp/node-domain-example-';
const FILESIZE = 1024;
let uid = 0;

// Setting up temporary resources
const buf = Buffer.alloc(FILESIZE);
for (let i = 0; i < buf.length; i++)
  buf[i] = ((Math.random() * 1e3) % 78) + 48; // Basic ASCII
fs.writeFileSync(FILENAME, buf);

function ConnectionResource(c) {
  EE.call(this);
  this._connection = c;
  this._alive = true;
  this._domain = domain.create();
  this._id = Math.random().toString(32).substr(2).substr(0, 8) + (++uid);

  this._domain.add(c);
  this._domain.on('error', () => {
    this._alive = false;
  });
}
util.inherits(ConnectionResource, EE);

ConnectionResource.prototype.end = function end(chunk) {
  this._alive = false;
  this._connection.end(chunk);
  this.emit('end');
};

ConnectionResource.prototype.isAlive = function isAlive() {
  return this._alive;
};

ConnectionResource.prototype.id = function id() {
  return this._id;
};

ConnectionResource.prototype.write = function write(chunk) {
  this.emit('data', chunk);
  return this._connection.write(chunk);
};

// Example begin
net.createServer((c) => {
  const cr = new ConnectionResource(c);

  const d1 = domain.create();
  fs.open(FILENAME, 'r', d1.intercept((fd) => {
    streamInParts(fd, cr, 0);
  }));

  pipeData(cr);

  c.on('close', () => cr.end());
}).listen(8080);

function streamInParts(fd, cr, pos) {
  const d2 = domain.create();
  const alive = true;
  d2.on('error', (er) => {
    print('d2 error:', er.message);
    cr.end();
  });
  fs.read(fd, Buffer.alloc(10), 0, 10, pos, d2.intercept((bRead, buf) => {
    if (!cr.isAlive()) {
      return fs.close(fd);
    }
    if (cr._connection.bytesWritten < FILESIZE) {
      // Documentation says callback is optional, but doesn't mention that if
      // the write fails an exception will be thrown.
      const goodtogo = cr.write(buf);
      if (goodtogo) {
        setTimeout(() => streamInParts(fd, cr, pos + bRead), 1000);
      } else {
        cr._connection.once('drain', () => streamInParts(fd, cr, pos + bRead));
      }
      return;
    }
    cr.end(buf);
    fs.close(fd);
  }));
}

function pipeData(cr) {
  const pname = PIPENAME + cr.id();
  const ps = net.createServer();
  const d3 = domain.create();
  const connectionList = [];
  d3.on('error', (er) => {
    print('d3 error:', er.message);
    cr.end();
  });
  d3.add(ps);
  ps.on('connection', (conn) => {
    connectionList.push(conn);
    conn.on('data', () => {}); // don't care about incoming data.
    conn.on('close', () => {
      connectionList.splice(connectionList.indexOf(conn), 1);
    });
  });
  cr.on('data', (chunk) => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].write(chunk);
    }
  });
  cr.on('end', () => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].end();
    }
    ps.close();
  });
  pipeList.push(pname);
  ps.listen(pname);
}

process.on('SIGINT', () => process.exit());
process.on('exit', () => {
  try {
    for (let i = 0; i < pipeList.length; i++) {
      fs.unlinkSync(pipeList[i]);
    }
    fs.unlinkSync(FILENAME);
  } catch (e) { }
});

```

* 当一个新的连接发生时，同时也发生：
  * 打开文件系统上的文件
  * 针对唯一的套接字打开文件管道
* 异步读取文件块
* 将块写入 TCP 连接和任何监听套接字中
* 如果这些资源中的任何一个出错，则通知其它需要清理和关闭的附加资源

正如我们从这个例子中看到的那样，当某些事情发生故障时必须做正确的清理。所有域提供的是异常聚合机制。在这个例子中，即使通过域传递数据的潜在有用能力也很容易通过将需要的资源作为函数参数传递。

一个问题是把域持久化。它是对能够继续执行的简单假设，与文档所述的相反，尽管有一个意外的例外。这个例子说明了这个想法背后的谬误。

当应用程序本身的复杂性增加时，尝试对意外异常进行适当的资源清理变得更加复杂。此示例只有三个基本资源在应用中，并且它们都具有明确的依赖路径。如果应用程序使用诸如共享资源或资源重用之类的东西，清理和测试该清理的能力已经大大提高。

最后，在处理错误方面，域不仅仅是一个值得骄傲的 `'uncaughtException'` 处理程序。除第三方更隐秘和不可观察的行为以外。

### 资源传播

域的另一个用例是使用它来沿着异步数据路径传播数据。一个问题是当在堆栈中有多个时，期望何时得到正确的域的模糊性（必须假定）。异步堆栈与其它模块一起工作。还可以依赖于域进行错误处理，同时也有可能用于检索必要的数据。

下面是一个示例，演示了使用域沿着异步堆栈传输数据的失败情况：

```js
const domain = require('domain');
const net = require('net');

const server = net.createServer((c) => {
  // Use a domain to propagate data across events within the
  // connection so that we don't have to pass arguments
  // everywhere.
  const d = domain.create();
  d.data = { connection: c };
  d.add(c);
  // Mock class that does some useless async data transformation
  // for demonstration purposes.
  const ds = new DataStream(dataTransformed);
  c.on('data', (chunk) => ds.data(chunk));
}).listen(8080, () => console.log('listening on 8080'));

function dataTransformed(chunk) {
  // FAIL! Because the DataStream instance also created a
  // domain we have now lost the active domain we had
  // hoped to use.
  domain.active.data.connection.write(chunk);
}

function DataStream(cb) {
  this.cb = cb;
  // DataStream wants to use domains for data propagation too!
  // Unfortunately this will conflict with any domain that
  // already exists.
  this.domain = domain.create();
  this.domain.data = { inst: this };
}

DataStream.prototype.data = function data(chunk) {
  // This code is self contained, but pretend it's a complex
  // operation that crosses at least one other module. So
  // passing along "this", etc., is not easy.
  this.domain.run(() => {
    // Simulate an async operation that does the data transform.
    setImmediate(() => {
      for (let i = 0; i < chunk.length; i++)
        chunk[i] = ((chunk[i] + Math.random() * 100) % 96) + 33;
      // Grab the instance from the active domain and use that
      // to call the user's callback.
      const self = domain.active.data.inst;
      self.cb(chunk);
    });
  });
};
```

以上表明，尝试使用一个以上的异步 API 借助域来传播数据是困难的。这个例子是固定假设通过在 `DataStream` 构造函数中赋值 `parent: domain.active`。然后通过 `domain.active = domain.active.data.parent` 在用户的回调函数被调用前恢复它。 `DataStream` 的实例化`'连接'`回调必须在 `d.run()` 中运行，而不是简单地使用 `d.add(c)`，否则将没有活动域。

简而言之，倘若要祈祷有机会运用这样的方式处理问题，需要严格遵守一组很难实施或测试的指导方针。

## 性能问题

使用域名的显著威慑是开销。使用节点内置的 http 基准，`http_simple.js`，没有域，它可以处理超 22000 个请求/秒。而如果它运行的是 `NODE_USE_DOMAINS=1`，则该数字下降到 17000个请求/秒以下。在这种情况下只有一个全局域。如果我们编辑基准，那么 http 请求回调会创建一个新的域实例，性能进一步下降到 15000 个请求/秒。

虽然这可能不会影响每秒只有几百甚至一千个请求的服务器，但开销的数量与异步请求的数量成正比。因此，如果单个连接需要连接到其它几个服务，所有这些都将对最终交付给客户机的等待时间产生影响。

使用 `AsyncWrap` 并跟踪次数
`init`/`pre`/`post`/`destroy` 在以上基准中所提及，我们发现所有事件的总和超过每秒 170000 次。这意味着即使为每种类型的设置增加 1 微秒的开销，任何类型的安装或拆除都会导致 17% 的性能损失。当然，这是针对基准的优化方案，但我相信这证明了一种机制，如域尽可能简单方便地运行的必要性。

## 展望未来

自从 2014 年 12 月以来，域模块已经被软弃用，但由于节点目前暂时没有替代功能，所以还没有彻底被移除。在撰写本文时，`AsyncWrap` 的 API 的工作正在进行，以及为 TC39 准备的区域的建议。在这种时候，如有合适的功能来替换域，它将经历完整的弃用周期而最终从核心移除。
