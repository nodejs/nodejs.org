---
title: 数据流中的积压问题
layout: docs.hbs
---

# 数据流中的积压问题

通常在数据处理的时候我们会遇到一个普遍的问题：[`背压`][]，意思是在数据传输过程中有一大堆数据在缓存之后积压着。每次当数据到达结尾又遇到复杂的运算，又或者无论什么原因它比预期的慢，这样累积下来，从源头来的数据就会变得很庞大，像一个塞子一样堵塞住。

为解决这个问题，必须存在一种适当的代理机制，确保流从一个源流入另外一个的时候是平滑顺畅的。不同的社区组织针对他们各自的问题单独做了解决，好例子比如 Unix 的管道和 TCP 的 Socket。此问题经常与 _流控制_ 相关。在 Node.js 中，流已经是被采纳的解决方案。

此文的目的在于详细深入介绍什么是积压，并从代码角度详细解释在 Node.js 中，流是如何针对此问题进行处理的。本文的第二部分将给予你实现流的功能时最佳实践，以确保你的程序既安全又精简。

我们假定你对 Node.js 中的 [`背压`][]，[`Buffer`][]，[`EventEmitter`][] 和 [`Stream`][] 的基本概念有一点了解。如果你尚未完整阅读过 API 文档，那么最好是先看一下相关 API 说明，它也会有助于你扩展理解本文的主旨。

## 处理数据中遇到的问题

在一个计算机系统中，通过管道，socket 和信号量将数据从一个进程传到另外一个进程中。在 Node.js 中，我们发明了一个类似的机制，它称为 [`Stream`][]。流太棒了！它们为 Node.js 做了太多的事情，而且内部代码库的每个角落都用到了那个模块。作为一个开发者，你也应该鼓励自己多去使用这个模块！

```javascript
const readline = require('readline');

// process.stdin and process.stdout are both instances of Streams.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Why should you use streams? ', (answer) => {
  console.log(`Maybe it's ${answer}, maybe it's because they are awesome! :)`);

  rl.close();
});
```

通过流实现积压机制的一个很好的例子是通过比较内部系统工具可以证明一个很大的优化。它通过 Node.js 的 [`Stream`][]实现。

在以下场景中，我们将拿一个巨大的文件（大概有 9gb 那么大），然后用熟悉的 [`zip(1)`][] 的工具压缩。

```bash
zip The.Matrix.1080p.mkv
```

当这个终端还需要等待一些时间来完成时，我们另起一个终端运行 Node.js 的模块： [`zlib`][]，它对 [`gzip(1)`][] 进行了包装。

```javascript
const gzip = require('zlib').createGzip();
const fs = require('fs');

const inp = fs.createReadStream('The.Matrix.1080p.mkv');
const out = fs.createWriteStream('The.Matrix.1080p.mkv.gz');

inp.pipe(gzip).pipe(out);
```

现在尝试打开每个压缩的文件来测试结果。由 [`zip(1)`][] 压缩的文件会提醒你文件中断了，但通过 [`Stream`][] 的压缩在解压时无任何错误。

请注意：这个例子中我们使用 `.pipe()` 从一个数据源终端到另外一个终端，不过没有使用任何出错处理机制。如果一大堆数据出错了但是又要被接收， `可读` 和 `gzip` 流不会被销毁。 [`pump`][] 是一个工具类，如果有某个流发生错误或者关闭，它会自动销毁相关所有的流，在这个情况下是必须使用的！

[`pump`][] 对于 Node.js 8.x 以及先前版本是必须的。但对于 10.x 和之后的版本而言，我们引入了 [`pipeline`][] 来取而代之。这是一个模块化函数，用于对接不同的数据流，可以处理异常错误并善后清理释放资源。它同时也提供了一个回调函数——当整个 pipeline 任务完成时将触发。

这里给出一个例子，告诉你如何使用 pipeline：

```javascript
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.
// A pipeline to gzip a potentially huge video file efficiently:

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
```

你也可以使用 [`promisify`][] 包装 pipeline，配合 `async` / `await` 进行使用：

```javascript
const stream = require('stream');
const fs = require('fs');
const zlib = require('zlib');
const util = require('util');

const pipeline = util.promisify(stream.pipeline);

async function run() {
  try {
    await pipeline(
      fs.createReadStream('The.Matrix.1080p.mkv'),
      zlib.createGzip(),
      fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
    );
    console.log('Pipeline succeeded');
  } catch (err) {
    console.error('Pipeline failed', err);
  }
}
```

## 数据太多，速度太快
有太多的例子证明有时 [`Readable`][] 传输给 [`Writable`][] 的速度远大于它接受和处理的速度！

如果发生了这种情况，消费者开始为后面的消费而将数据列队形式积压起来。写入队列的时间越来越长，也正因为如此，更多的数据不得不保存在内存中知道整个流程全部处理完毕。

写入磁盘的速度远比从磁盘读取数据慢得多，因此，当我们试图压缩一个文件并写入磁盘时，积压的问题也就出现了。因为写磁盘的速度不能跟上读磁盘的速度。

```javascript
// Secretly the stream is saying: "whoa, whoa! hang on, this is way too much!"
// Data will begin to build up on the read-side of the data buffer as
// `write` tries to keep up with the incoming data flow.
inp.pipe(gzip).pipe(outputFile);
```

这就是为什么说积压机制很重要——如果积压机制不存在，进程将用完你全部的系统内存，从而对其它进程产生显著影响，它独占系统大量资源直到任务完成为止。

这最终导致一些问题：

* 明显使得其它进程处理变慢
* 太多繁重的垃圾回收
* 内存耗尽

以下例子中我们把 `.write()` 函数的[返回值][]值取出，改成 `true`，这样明显地禁止了 Node.js 核心的积压的支持。在任何引用了 'modified' 二进制库的地方，我们探讨在不适用 `return ret;` 的情况下运行 `node` 二进制代码，并用 `return true;` 取代它。

## 过度的垃圾收集

让我们来看一个快速的基准。使用上面的同一个例子，我们进行两次试验以获得两个二进制文件的中位时间。

```
   trial (#)  | `node` binary (ms) | modified `node` binary (ms)
=================================================================
      1       |      56924         |           55011
      2       |      52686         |           55869
      3       |      59479         |           54043
      4       |      54473         |           55229
      5       |      52933         |           59723
=================================================================
average time: |      55299         |           55975
```

两者都跑一分钟，所以几乎没有什么区别。但让我们仔细看看我们的猜测是否正确。我们使用 Linux 工具 [`dtrace`][] 来评估 V8 垃圾回收机制发生了什么。

GC（垃圾回收器）测量表明一个完整的周期间隔一个由垃圾回收器进行扫描：

```
approx. time (ms) | GC (ms) | modified GC (ms)
=================================================
          0       |    0    |      0
          1       |    0    |      0
         40       |    0    |      2
        170       |    3    |      1
        300       |    3    |      1

         *             *           *
         *             *           *
         *             *           *

      39000       |    6    |     26
      42000       |    6    |     21
      47000       |    5    |     32
      50000       |    8    |     28
      54000       |    6    |     35
```

当两个进程同时运行，并似乎以同样的效率开始工作，在若干秒随着适当的积压开始变得有效率起来。它将 GC 负载扩展到每隔一定的 4-8 毫秒的间隔，直到数据传输结束。

但是，当积压机制处理不恰当，V8 垃圾回收机制开始变慢。一般情况下 GC 一分钟内进行 75 次回收，但是修改过的二进制库仅 36 次。

随着内存占用越来越多，缓慢和渐进的欠债也不断积累。随着数据的传输，在没有积压系统的情况下，每个块传输都使用更多的内存。

内存分配使用越多，GC 就越要照顾内存交换。内存交换得越多，GC 就需要考虑决定哪些内存可以被释放，并且要一直在大块内存中扫描独立区块，而这又要消耗更多的计算功率。

## 内存耗尽

为判断每个程序内存消耗，我们使用 `/usr/bin/time -lp sudo ./node ./backpressure-example/zlib.js` 单独计算每个进程所用时间。

这是普通程序输出结果：

```
Respecting the return value of .write()
=============================================
real        58.88
user        56.79
sys          8.79
  87810048  maximum resident set size
         0  average shared memory size
         0  average unshared data size
         0  average unshared stack size
     19427  page reclaims
      3134  page faults
         0  swaps
         5  block input operations
       194  block output operations
         0  messages sent
         0  messages received
         1  signals received
        12  voluntary context switches
    666037  involuntary context switches
```

虚拟内存占用的最大字节块消耗了 87.81 mb。

现在改变 [`.write()`][] 方法的[返回值][]，我们得到以下结果：

```
Without respecting the return value of .write():
==================================================
real        54.48
user        53.15
sys          7.43
1524965376  maximum resident set size
         0  average shared memory size
         0  average unshared data size
         0  average unshared stack size
    373617  page reclaims
      3139  page faults
         0  swaps
        18  block input operations
       199  block output operations
         0  messages sent
         0  messages received
         1  signals received
        25  voluntary context switches
    629566  involuntary context switches
```

虚拟内存占用的最大的字节块达到了 1.52 gb。

没有合适的流来处理积压，就会产生一个内存占用的震级顺序——与同样的进程处理有着天壤之别！

这个实验展示了如何精简以对你的计算系统进行精简，以及有效的资源消耗。现在，我们故意弄出一个故障看看它又是怎么工作的。

## 积压是怎么处理这些问题的？

我们有不同的函数将数据从一个进程传入另外一个进程。在 Node.js 中，有一个内置函数称为 [`.pipe()`][]，同样地，你们也可以使用[其它工具包][]。最终，在这个进程的基本层面上我们有二个互不相关的组件：数据的 _源头_，和 _消费者_。

当 [`.pipe()`][] 被源调用之后，它通知消费者有数据需要传输。管道函数为事件触发建立了合适的积压封装。

在 Node.js 中，源头是一个 [`Readable`][] 的流，消费者是 [`Writable`][] 流（它们两者可能通过 [`Duplex`][] 或 [`Transform`][] 进行交互）。只不过这超出我们本文讨论范围了。

当积压被触发的一刹那，它可以被缩略成 [`Writable`][] 的 [`.write()`][] 方法。返回函数值当然是根据一些条件所决定的。

在数据缓存超出了 [`highWaterMark`][] 或者写入的列队处于繁忙状态，[`.write()`][] 会返回 `false`。

当 `false` 返回之后，积压系统介入了。它将暂停从任何发送数据的数据流中进入的 [`Readable`][]。一旦数据流清空了， [`'drain'`][] 事件将被触发，消耗进来的数据流。

一旦队列全部处理完毕，积压机制将允许允许数据再次发送。在使用中的内存空间将自我释放，同时准备接收下一次的批量数据。

这个有效的举措允许一大堆锁住的内存可以为 [`.pipe()`][] 函数随时使用而并没有内存泄露、无限扩大的内存缓冲。同时垃圾回收器仅需要处理一处地方。

所以，积压既然如此重要，为什么还有理由说你没有听说过呢？显然答案很明显：Node.js 为你做了一切。

这太好了！不过当我们试图去理解如何实现我们自己的积压流，这却并不太好。

注意：对于大部分机器，存在着一个字节的大小用以决定一个缓存是否已经满了（不同机器此值有变化）。Node.js 将允许你设置你自己的 [`highWaterMark`][]。但是通常来说，默认是设置为 16kb（16384，对于对象模型流而言是 16）。在某些实例中你或许想提高那个值，尽管去提高吧，但是也要小心使用！

## `.pipe()` 的生命周期

为了对积压有一个更好的理解，这里有一副 [`Readable`][] 流正通过 [piped][] 流入 [`Writable`][] 流的整个生命周期图：

```
                                                     +===================+
                         x-->  Piping functions   +-->   src.pipe(dest)  |
                         x     are set up during     |===================|
                         x     the .pipe method.     |  Event callbacks  |
  +===============+      x                           |-------------------|
  |   Your Data   |      x     They exist outside    | .on('close', cb)  |
  +=======+=======+      x     the data flow, but    | .on('data', cb)   |
          |              x     importantly attach    | .on('drain', cb)  |
          |              x     events, and their     | .on('unpipe', cb) |
+---------v---------+    x     respective callbacks. | .on('error', cb)  |
|  Readable Stream  +----+                           | .on('finish', cb) |
+-^-------^-------^-+    |                           | .on('end', cb)    |
  ^       |       ^      |                           +-------------------+
  |       |       |      |
  |       ^       |      |
  ^       ^       ^      |    +-------------------+         +=================+
  ^       |       ^      +---->  Writable Stream  +--------->  .write(chunk)  |
  |       |       |           +-------------------+         +=======+=========+
  |       |       |                                                 |
  |       ^       |                              +------------------v---------+
  ^       |       +-> if (!chunk)                |    Is this chunk too big?  |
  ^       |       |     emit .end();             |    Is the queue busy?      |
  |       |       +-> else                       +-------+----------------+---+
  |       ^       |     emit .write();                   |                |
  |       ^       ^                                   +--v---+        +---v---+
  |       |       ^-----------------------------------<  No  |        |  Yes  |
  ^       |                                           +------+        +---v---+
  ^       |                                                               |
  |       ^               emit .pause();          +=================+     |
  |       ^---------------^-----------------------+  return false;  <-----+---+
  |                                               +=================+         |
  |                                                                           |
  ^            when queue is empty     +============+                         |
  ^------------^-----------------------<  Buffering |                         |
               |                       |============|                         |
               +> emit .drain();       |  ^Buffer^  |                         |
               +> emit .resume();      +------------+                         |
                                       |  ^Buffer^  |                         |
                                       +------------+   add chunk to queue    |
                                       |            <---^---------------------<
                                       +============+
```

注意：如果你创建一些管道准备把一些流串联起来从而操纵数据，你应该实现 [`Transform`][] 流。

在这种情况下，从 [`Readable`][] 流中的输出进入 [`Transform`][]，并且会被管道输送进入 [`Writable`][]。

```javascript
Readable.pipe(Transformable).pipe(Writable);
```

积压将被自动应用，但是同时请注意输入和输出 [`Transform`][] 的 `水准值` 可以手动控制，并且会影响到积压系统。

## 积压行为的准则

从 [Node.js v0.10][] 开始，[`Stream`][] 类借助带有下划线一些相关函数([`._read()`][] 和 [`._write()`][])，提供了访问 [`.read()`][] 或[`.write()`][] 的能力。

这里有一些准则文档可供参考：[实现可读的流][]和[实现可写的流][]。我们假设你可以把这些文章已经读过了，下个章节将做稍许的深入讲解。

## 实现用户自定义流须知

流的黄金法则是 **总是接受积压**。作为最佳实践的构成是不矛盾的实践。只要你小心避免与内部积压支持冲突的行为，你可以确信你在遵循良好的实践。

一般而说。

1. 没有特殊要求下，绝对不要用 `.push()`。
2. 在流返回 `false` 后不要调用 `.write()` 方法，而是等待 'drain'。
3. 流在不同的 Node.js 版本和库中是有变化的。小心你的测试。

注意：关于第三点，构建浏览器流的一个难以置信的方法是使用 [`readable-stream`][]。Rodd Vagg 曾经写过一篇[大作][]，详细描述这个工具库。简而言之，它为 [`Readable`][] 流提供了自动可销毁降解的类型，并且支持旧版的 Node.js 和浏览器。

## 对于可读流的规则

迄今为止，我们已经看了 [`.write()`][] 方法对于积压的影响，并且过多关注在 [`Writable`][] 流上，因为 Node.js 的功能，数据从 [`Readable`][] 流到 [`Writable`][] 流。但是正如我们在数据流传输过程中我们观察到，源和 [`Readable`][] 目标一样重要， [`Readable`][] 流对于积压是如何处理的至关重要。

这两个过程相互依赖地进行有效沟通，如果 [`Readable`][] 流在 [`Writable`][] 流需要它停止发送数据的时候忽略了，那么当 [`.write()`][] 方法返回时，会产生问题。

所以，除了谨慎对待 [`.write()`][] 方法，我们同样要小心在 [`._read()`][] 方法中使用 [`.push()`][] 方法的返回值。如果 [`.push()`][] 方法返回一个 `false`，流就会停止从源读数据。否则，它就不会停止而继续读下去。

这里有个糟糕的使用 [`.push()`][] 的例子：

```javascript
// This is problematic as it completely ignores return value from push
// which may be a signal for backpressure from the destination stream!
class MyReadable extends Readable {
  _read(size) {
    let chunk;
    while (null !== (chunk = getNextChunk())) {
      this.push(chunk);
    }
  }
}
```

另外，从定制流之外，忽略积压简直可笑至极。在以下反例中，代码仅关注数据是否到达（通过 [`'data'` event][] 订阅）：

```javascript
// This ignores the backpressure mechanisms Node.js has set in place,
// and unconditionally pushes through data, regardless if the
// destination stream is ready for it or not.
readable.on('data', (data) =>
  writable.write(data)
);
```

## 关于可写流的规则

重新调用 [`.write()`][] 方法根据一些条件可能返回 true 或者 false。幸运地是，当我们构建属于自己的 [`Writable`][] 流的时候， [`流状态机`][] 会处理我们的回调，并且决定什么时候处理积压并且为我们简化数据流。

但是当我们需要直接使用 [`Writable`][] 流时，我们必须考虑 [`.write()`][] 方法返回的值，并且注意到以下一些情况：

* 如果写队列确实繁忙，[`.write()`][] 方法将返回 false。
* 如果数据块太大， [`.write()`][] 方法将返回 false（限定通过 [`highWaterMark`][] 决定）。

<!-- eslint-disable indent -->
```javascript
// This writable is invalid because of the async nature of JavaScript callbacks.
// Without a return statement for each callback prior to the last,
// there is a great chance multiple callbacks will be called.
class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0)
      callback();
    else if (chunk.toString().indexOf('b') >= 0)
      callback();
    callback();
  }
}

// The proper way to write this would be:
    if (chunk.contains('a'))
      return callback();
    if (chunk.contains('b'))
      return callback();
    callback();
```

在实现 [`._writev()`][] 方法时还有其它一些东西值得考虑。此函数与 [`.cork()`][] 耦合，但是编写代码的时有一个容易犯的错误：

```javascript
// Using .uncork() twice here makes two calls on the C++ layer, rendering the
// cork/uncork technique useless.
ws.cork();
ws.write('hello ');
ws.write('world ');
ws.uncork();

ws.cork();
ws.write('from ');
ws.write('Matteo');
ws.uncork();

// The correct way to write this is to utilize process.nextTick(), which fires
// on the next event loop.
ws.cork();
ws.write('hello ');
ws.write('world ');
process.nextTick(doUncork, ws);

ws.cork();
ws.write('from ');
ws.write('Matteo');
process.nextTick(doUncork, ws);

// As a global function.
function doUncork(stream) {
  stream.uncork();
}
```

[`.cork()`][] 方法可以调用任意多次，但同时也要记得调用 [`.uncork()`][] 方法同样的次数，使得它可以正常流入。

## 总结

流经常作为一个模块用于 Node.js 中，对于内部的系统结构而言非常重要。对于开发者而言，可以通过 Node.js 扩展连接应答系统。

现在我们希望你有能力进行故障排除，记住了是如何为你的 [`Writable`][] 和 [`Readable`][] 流编写积压处理的。并且你还可以把这些知识分享给你的同事和朋友们。

在此之后请仔细阅读更多的有关 [`Stream`][] 其它 API 函数，这样有助于当你在构建 Node.js 的应用程序之时更好地理解关于流的能力。

[`Stream`]: https://nodejs.org/api/stream.html
[`Buffer`]: https://nodejs.org/api/buffer.html
[`EventEmitter`]: https://nodejs.org/api/events.html
[`Writable`]: https://nodejs.org/api/stream.html#stream_writable_streams
[`Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`Duplex`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`Transform`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`zlib`]: https://nodejs.org/api/zlib.html
[`'drain'`]: https://nodejs.org/api/stream.html#stream_event_drain
[`'data'` event]: https://nodejs.org/api/stream.html#stream_event_data
[`.read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size
[`.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[`._read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size_1
[`._write()`]: https://nodejs.org/docs/latest/api/stream.html#stream_writable_write_chunk_encoding_callback_1
[`._writev()`]: https://nodejs.org/api/stream.html#stream_writable_writev_chunks_callback
[`.cork()`]: https://nodejs.org/api/stream.html#stream_writable_cork
[`.uncork()`]: https://nodejs.org/api/stream.html#stream_writable_uncork

[`.push()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_push_chunk_encoding

[实现可写的流]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_writable_stream
[实现可读的流]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_readable_stream

[其它工具包]: https://github.com/sindresorhus/awesome-nodejs#streams
[`背压`]: https://en.wikipedia.org/wiki/Backpressure_routing
[Node.js v0.10]: https://nodejs.org/docs/v0.10.0/
[`highWaterMark`]: https://nodejs.org/api/stream.html#stream_buffering
[返回值]: https://github.com/nodejs/node/blob/55c42bc6e5602e5a47fb774009cfe9289cb88e71/lib/_stream_writable.js#L239

[`readable-stream`]: https://github.com/nodejs/readable-stream
[大作]:https://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html

[`dtrace`]: http://dtrace.org/blogs/about/
[`zip(1)`]: https://linux.die.net/man/1/zip
[`gzip(1)`]: https://linux.die.net/man/1/gzip
[`流状态机`]: https://en.wikipedia.org/wiki/Finite-state_machine

[`.pipe()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[piped]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[`pump`]: https://github.com/mafintosh/pump
[`pipeline`]: https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback
[`promisify`]: https://nodejs.org/api/util.html#util_util_promisify_original
