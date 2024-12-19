---
title: How to use Streams
layout: learn
authors: mcollina, ceres6, simoneb, codyzu
---

# How To Use Streams

Working with large amounts of data in Node.js applications can be a double-edged sword. The ability to handle massive amounts of data is extremely handy but can also lead to performance bottlenecks and memory exhaustion. Traditionally, developers tackled this challenge by reading the entire dataset into memory at once. This approach, while intuitive for smaller datasets, becomes inefficient and resource-intensive for large data (e.g., files, network requests…).

This is where Node.js streams come in. Streams offer a fundamentally different approach, allowing you to process data incrementally and optimize memory usage. By handling data in manageable chunks, streams empower you to build scalable applications that can efficiently tackle even the most daunting datasets. As popularly quoted, “streams are arrays over time.”

In this guide, we give an overview of the Stream concept, history, and API as well as some recommendations on how to use and operate them.

## What are Node.js Streams?

Node.js streams offer a powerful abstraction for managing data flow in your applications. They excel at processing large datasets, such as reading or writing from files and network requests, without compromising performance.

This approach differs from loading the entire dataset into memory at once. Streams process data in chunks, significantly reducing memory usage. All streams in Node.js inherit from the [`EventEmitter`][] class, allowing them to emit events at various stages of data processing. These streams can be readable, writable, or both, providing flexibility for different data-handling scenarios.

### Event-Driven Architecture

Node.js thrives on an event-driven architecture, making it ideal for real-time I/O. This means consuming input as soon as it's available and sending output as soon as the application generates it. Streams seamlessly integrate with this approach, enabling continuous data processing.

They achieve this by emitting events at key stages. These events include signals for received data ([`data`][] event) and the stream's completion ([`end`][] event). Developers can listen to these events and execute custom logic accordingly. This event-driven nature makes streams highly efficient for the processing of data from external sources.

## Why use Streams?

Streams provide three key advantages over other data-handling methods:

- **Memory Efficiency**: Streams process data incrementally, consuming and processing data in chunks rather than loading the entire dataset into memory. This is a major advantage when dealing with large datasets, as it significantly reduces memory usage and prevents memory-related performance issues.
- **Improved Response Time**: Streams allow for immediate data processing. When a chunk of data arrives, it can be processed without waiting for the entire payload or dataset to be received. This reduces latency and improves your application's overall responsiveness.
- **Scalability for Real-Time Processing**: By handling data in chunks, Node.js streams can efficiently handle large amounts of data with limited resources. This scalability makes streams ideal for applications that process high volumes of data in real time.

These advantages make streams a powerful tool for building high-performance, scalable Node.js applications, particularly when working with large datasets or real-time data processing.

### Note on performance

If your application already has all the data readily available in memory, using streams might add unnecessary overhead, complexity, and slow down your application.

## Stream history

This section is a reference of the history of streams in Node.js. Unless you’re working with a codebase written for a Node.js version prior to 0.11.5 (2013), you will rarely encounter older versions of the streams API, but the terms might still be in use.

### Streams 0

The first version of streams was released at the same time as Node.js. Although there wasn't a Stream class yet, different modules used the concept and implemented the `read`/`write` functions. The `util.pump()` function was available to control the flow of data between streams.

### Streams 1 (Classic)

With the release of Node v0.4.0 in 2011, the Stream class was introduced, as well as the `pipe()` method.

### Streams 2

In 2012, with the release of Node v0.10.0, Streams 2 were unveiled. This update brought new stream subclasses, including Readable, Writable, Duplex, and Transform. Additionally, the `readable` event was added. To maintain backwards compatibility, streams could be switched to the old mode by adding a `data` event listener or calling `pause()` or `resume()` methods.

### Streams 3

In 2013, Streams 3 were released with Node v0.11.5, to address the problem of a stream having both a `data` and `readable` event handlers. This removed the need to choose between 'current' and 'old' modes. Streams 3 is the current version of streams in Node.js.

## Stream types

### Readable

[`Readable`][] is the class that we use to sequentially read a source of data. Typical examples of `Readable` streams in Node.js API are [`fs.ReadStream` ][] when reading files, [`http.IncomingMessage` ][] when reading HTTP requests, and [`process.stdin` ][] when reading from the standard input.

#### Key Methods and Events

A readable stream operates with several core methods and events that allow fine control over data handling:

- **[`on('data')`][]**: This event is triggered whenever data is available from the stream. It is very fast, as the stream pushes data as quickly as it can handle, making it suitable for high-throughput scenarios.
- **[`on('end')`][]**: Emitted when there is no more data to read from the stream. It signifies the completion of data delivery. This event is only fired when all the data from the stream has been consumed.
- **[`on('readable')`][]**: This event is triggered when there is data available to read from the stream or when the end of the stream has been reached. It allows for more controlled data reading when needed.
- **[`on('close')`][]**: This event is emitted when the stream and its underlying resources have been closed and indicates that no more events will be emitted.
- **[`on('error')`][]**: This event can be emitted at any point, signaling that there was an error processing. A handler for this event can be used to avoid uncaught exceptions.

A demonstration of the use of these events can be seen in the following sections.

#### Basic Readable Stream

Here's an example of a simple readable stream implementation that generates data dynamically:

```cjs
const { Readable } = require('node:stream');

class MyStream extends Readable {
  #count = 0;
  _read(size) {
    this.push(':-)');
    if (++this.#count === 5) {
      this.push(null);
    }
  }
}

const stream = new MyStream();

stream.on('data', chunk => {
  console.log(chunk.toString());
});
```

```mjs
import { Readable } from 'node:stream';

class MyStream extends Readable {
  #count = 0;
  _read(size) {
    this.push(':-)');
    if (++this.#count === 5) {
      this.push(null);
    }
  }
}

const stream = new MyStream();

stream.on('data', chunk => {
  console.log(chunk.toString());
});
```

In this code, the `MyStream` class extends Readable and overrides the [`_read`][] method to push a string ":-)" to the internal buffer. After pushing the string five times, it signals the end of the stream by pushing `null`. The [`on('data')`][] event handler logs each chunk to the console as it is received.

#### Advanced Control with the readable Event

For even finer control over data flow, the readable event can be used. This event is more complex but provides better performance for certain applications by allowing explicit control over when data is read from the stream:

```cjs
const stream = new MyStream({
  highWaterMark: 1,
});

stream.on('readable', () => {
  console.count('>> readable event');
  let chunk;
  while ((chunk = stream.read()) !== null) {
    console.log(chunk.toString()); // Process the chunk
  }
});
stream.on('end', () => console.log('>> end event'));
```

```mjs
const stream = new MyStream({
  highWaterMark: 1,
});

stream.on('readable', () => {
  console.count('>> readable event');
  let chunk;
  while ((chunk = stream.read()) !== null) {
    console.log(chunk.toString()); // Process the chunk
  }
});
stream.on('end', () => console.log('>> end event'));
```

Here, the readable event is used to pull data from the stream as needed manually. The loop inside the readable event handler continues to read data from the stream buffer until it returns `null`, indicating that the buffer is temporarily empty or the stream has ended. Setting `highWaterMark` to 1 keeps the buffer size small, triggering the readable event more frequently and allowing more granular control over the data flow.

With the previous code, you’ll get an output like

```bash
>> readable event: 1
:-):-)
:-)
:-)
:-)
>> readable event: 2
>> readable event: 3
>> readable event: 4
>> end event
```

Let’s try to digest that. When we attach the `on('readable')` event, it makes a first call to `read()` because that is what might trigger the emission of a `readable` event. After the emission of said event, we call `read` on the first iteration of the `while` loop. That’s why we get the first two smileys in one row. After that, we keep calling `read` until `null` is pushed. Each call to `read` programs the emission of a new `readable` event, but as we are in “flow” mode (i.e., using the `readable` event), the emission is scheduled for the `nextTick`. That’s why we get them all at the end, when the synchronous code of the loop is finished.

NOTE: You can try to run the code with `NODE_DEBUG=stream` to see that `emitReadable` is triggered after each `push`.

If we want to see readable events called before each smiley, we can wrap `push` into a `setImmediate` or `process.nextTick` like this:

```cjs
class MyStream extends Readable {
  #count = 0;
  _read(size) {
    setImmediate(() => {
      this.push(':-)');
      if (++this.#count === 5) {
        return this.push(null);
      }
    });
  }
}
```

```mjs
class MyStream extends Readable {
  #count = 0;
  _read(size) {
    setImmediate(() => {
      this.push(':-)');
      if (++this.#count === 5) {
        return this.push(null);
      }
    });
  }
}
```

And we’ll get:

```bash
>> readable event: 1
:-)
>> readable event: 2
:-)
>> readable event: 3
:-)
>> readable event: 4
:-)
>> readable event: 5
:-)
>> readable event: 6
>> end event
```

### Writable

[`Writable`][] streams are useful for creating files, uploading data, or any task that involves sequentially outputting data. While readable streams provide the source of data, writable streams in Node.js act as the destination for your data. Typical examples of writable streams in the Node.js API are [`fs.WriteStream` ][], [`process.stdout` ][], and [`process.stderr` ][].

#### Key Methods and Events in Writable Streams

- **[`.write()`][]**: This method is used to write a chunk of data to the stream. It handles the data by buffering it up to a defined limit (highWaterMark), and returns a boolean indicating whether more data can be written immediately.
- **[`.end()`][]**: This method signals the end of the data writing process. It signals the stream to complete the write operation and potentially perform any necessary cleanup.

#### Creating a Writable

Here's an example of creating a writable stream that converts all incoming data to uppercase before writing it to the standard output:

```cjs
const { Writable } = require('node:stream');
const { once } = require('node:events');

class MyStream extends Writable {
  constructor() {
    super({ highWaterMark: 10 /* 10 bytes */ });
  }
  _write(data, encode, cb) {
    process.stdout.write(data.toString().toUpperCase() + '\n', cb);
  }
}
const stream = new MyStream();

for (let i = 0; i < 10; i++) {
  const waitDrain = !stream.write('hello');

  if (waitDrain) {
    console.log('>> wait drain');
    await once(stream, 'drain');
  }
}

stream.end('world');
```

```mjs
import { Writable } from 'node:stream';
import { once } from 'node:events';

class MyStream extends Writable {
  constructor() {
    super({ highWaterMark: 10 /* 10 bytes */ });
  }
  _write(data, encode, cb) {
    process.stdout.write(data.toString().toUpperCase() + '\n', cb);
  }
}
const stream = new MyStream();

for (let i = 0; i < 10; i++) {
  const waitDrain = !stream.write('hello');

  if (waitDrain) {
    console.log('>> wait drain');
    await once(stream, 'drain');
  }
}

stream.end('world');
```

In this code, `MyStream` is a custom [`Writable`][] stream with a buffer capacity ([`highWaterMark`][]) of 10 bytes. It overrides the [`_write`][] method to convert data to uppercase before writing it out.

The loop attempts to write hello ten times to the stream. If the buffer fills up (`waitDrain` becomes `true`), it waits for a [`drain`][] event before continuing, ensuring we do not overwhelm the stream's buffer.

The output will be:

```bash
HELLO
>> wait drain
HELLO
HELLO
>> wait drain
HELLO
HELLO
>> wait drain
HELLO
HELLO
>> wait drain
HELLO
HELLO
>> wait drain
HELLO
WORLD
```

### Duplex

[`Duplex`][] streams implement both the readable and writable interfaces.

#### Key Methods and Events in Duplex Streams

Duplex streams implement all the methods and events described in Readable and Writable Streams.

A good example of a duplex stream is the `Socket` class in the `net` module:

```cjs
const net = require('node:net');

// Create a TCP server
const server = net.createServer(socket => {
  socket.write('Hello from server!\n');

  socket.on('data', data => {
    console.log(`Client says: ${data.toString()}`);
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
```

```mjs
import { net } from 'node:net';

// Create a TCP server
const server = net.createServer(socket => {
  socket.write('Hello from server!\n');

  socket.on('data', data => {
    console.log(`Client says: ${data.toString()}`);
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
```

The previous code will open a TCP socket on port 8080, send `Hello from server!` to any connecting client, and log any data received.

```cjs
const net = require('node:net');

// Connect to the server at localhost:8080
const client = net.createConnection({ port: 8080 }, () => {
  client.write('Hello from client!\n');
});

client.on('data', data => {
  console.log(`Server says: ${data.toString()}`);
});

// Handle the server closing the connection
client.on('end', () => {
  console.log('Disconnected from server');
});
```

```mjs
import { net } from 'node:net';

// Connect to the server at localhost:8080
const client = net.createConnection({ port: 8080 }, () => {
  client.write('Hello from client!\n');
});

client.on('data', data => {
  console.log(`Server says: ${data.toString()}`);
});

// Handle the server closing the connection
client.on('end', () => {
  console.log('Disconnected from server');
});
```

The previous code will connect to the TCP socket, send a `Hello from client` message, and log any received data.

### Transform

[`Transform`][] streams are duplex streams, where the output is computed based on the input. As the name suggests, they are usually used between a readable and a writable stream to transform the data as it passes through.

#### Key Methods and Events in Transform Streams

Apart from all the methods and events in Duplex Streams, there is:

- **[`_transform`][]**: This function is called internally to handle the flow of data between the readable and writable parts. This MUST NOT be called by application code.

#### Creating a Transform Stream

To create a new transform stream, we can pass an `options` object to the `Transform` constructor, including a `transform` function that handles how the output data is computed from the input data using the `push` method.

```cjs
const { Transform } = require('node:stream');

const upper = new Transform({
  transform: function (data, enc, cb) {
    this.push(data.toString().toUpperCase());
    cb();
  },
});
```

```mjs
import { Transform } from 'node:stream';

const upper = new Transform({
  transform: function (data, enc, cb) {
    this.push(data.toString().toUpperCase());
    cb();
  },
});
```

This stream will take any input and output it in uppercase.

## How to operate with streams

When working with streams, we usually want to read from a source and write to a destination, possibly needing some transformation of the data in between. The following sections will cover different ways to do so.

### `.pipe()`

The [`.pipe()`][] method concatenates one readable stream to a writable (or transform) stream. Although this seems like a simple way to achieve our goal, it delegates all error handling to the programmer, making it difficult to get it right.

The following example shows a pipe trying to output the current file in uppercase to the console.

```cjs
const fs = require('node:fs');
const { Transform } = require('node:stream');

let errorCount = 0;
const upper = new Transform({
  transform: function (data, enc, cb) {
    if (errorCount === 10) {
      return cb(new Error('BOOM!'));
    }
    errorCount++;
    this.push(data.toString().toUpperCase());
    cb();
  },
});

const readStream = fs.createReadStream(__filename, { highWaterMark: 1 });
const writeStream = process.stdout;

readStream.pipe(upper).pipe(writeStream);

readStream.on('close', () => {
  console.log('Readable stream closed');
});

upper.on('close', () => {
  console.log('Transform stream closed');
});

upper.on('error', err => {
  console.error('\nError in transform stream:', err.message);
});

writeStream.on('close', () => {
  console.log('Writable stream closed');
});
```

```mjs
import fs from 'node:fs';
import { Transform } from 'node:stream';

let errorCount = 0;
const upper = new Transform({
  transform: function (data, enc, cb) {
    if (errorCount === 10) {
      return cb(new Error('BOOM!'));
    }
    errorCount++;
    this.push(data.toString().toUpperCase());
    cb();
  },
});

const readStream = fs.createReadStream(import.meta.filename, {
  highWaterMark: 1,
});
const writeStream = process.stdout;

readStream.pipe(upper).pipe(writeStream);

readStream.on('close', () => {
  console.log('Readable stream closed');
});

upper.on('close', () => {
  console.log('Transform stream closed');
});

upper.on('error', err => {
  console.error('\nError in transform stream:', err.message);
});

writeStream.on('close', () => {
  console.log('Writable stream closed');
});
```

After writing 10 characters, `upper` will return an error in the callback, which will cause the stream to close. However, the other streams won’t be notified, resulting in memory leaks. The output will be:

```bash
CONST FS =
Error in transform stream: BOOM!
Transform stream closed
```

### `pipeline()`

To avoid the pitfalls and low-level complexity of the `.pipe()` method, in most cases, it is recommended to use the [`pipeline()`][] method. This method is a safer and more robust way to pipe streams together, handling errors and cleanup automatically.

The following example demonstrates how using `pipeline()` prevents the pitfalls of the previous example:

```cjs
const fs = require('node:fs');
const { Transform, pipeline } = require('node:stream');

let errorCount = 0;
const upper = new Transform({
  transform: function (data, enc, cb) {
    if (errorCount === 10) {
      return cb(new Error('BOOM!'));
    }
    errorCount++;
    this.push(data.toString().toUpperCase());
    cb();
  },
});

const readStream = fs.createReadStream(__filename, { highWaterMark: 1 });
const writeStream = process.stdout;

readStream.on('close', () => {
  console.log('Readable stream closed');
});

upper.on('close', () => {
  console.log('\nTransform stream closed');
});

writeStream.on('close', () => {
  console.log('Writable stream closed');
});

pipeline(readStream, upper, writeStream, err => {
  if (err) {
    return console.error('Pipeline error:', err.message);
  }
  console.log('Pipeline succeeded');
});
```

```mjs
import fs from 'node:fs';
import { Transform, pipeline } from 'node:stream';

let errorCount = 0;
const upper = new Transform({
  transform: function (data, enc, cb) {
    if (errorCount === 10) {
      return cb(new Error('BOOM!'));
    }
    errorCount++;
    this.push(data.toString().toUpperCase());
    cb();
  },
});

const readStream = fs.createReadStream(import.meta.filename, {
  highWaterMark: 1,
});
const writeStream = process.stdout;

readStream.on('close', () => {
  console.log('Readable stream closed');
});

upper.on('close', () => {
  console.log('\nTransform stream closed');
});

writeStream.on('close', () => {
  console.log('Writable stream closed');
});

pipeline(readStream, upper, writeStream, err => {
  if (err) {
    return console.error('Pipeline error:', err.message);
  }
  console.log('Pipeline succeeded');
});
```

In this case, all streams will be closed with the following output:

```bash
CONST FS =
Transform stream closed
Writable stream closed
Pipeline error: BOOM!
Readable stream closed
```

The [`pipeline()`][] method also has an [`async pipeline()`][] version, which doesn’t accept a callback but instead returns a promise that is rejected if the pipeline fails.

### Async Iterators

Async iterators are recommended as the standard way of interfacing with the Streams API. Compared to all the stream primitives in both the Web and Node.js, async iterators are easier to understand and use, contributing to fewer bugs and more maintainable code. In recent versions of Node.js, async iterators have emerged as a more elegant and readable way to interact with streams. Building upon the foundation of events, async iterators provide a higher-level abstraction that simplifies stream consumption.

In Node.js, all readable streams are asynchronous iterables. This means you can use the `for await...of` syntax to loop through the stream's data as it becomes available, handling each piece of data with the efficiency and simplicity of asynchronous code.

#### Benefits of Using Async Iterators with Streams

Using async iterators with streams simplifies the handling of asynchronous data flows in several ways:

- **Enhanced Readability**: The code structure is cleaner and more readable, particularly when dealing with multiple asynchronous data sources.
- **Error Handling**: Async iterators allow straightforward error handling using try/catch blocks, akin to regular asynchronous functions.
- **Flow Control**: They inherently manage backpressure, as the consumer controls the flow by awaiting the next piece of data, allowing for more efficient memory usage and processing.

Async iterators offer a more modern and often more readable way to work with readable streams, especially when dealing with asynchronous data sources or when you prefer a more sequential, loop-based approach to data processing.

Here's an example demonstrating the use of async iterators with a readable stream:

```cjs
const fs = require('node:fs');
const { pipeline } = require('node:stream/promises');

await pipeline(
  fs.createReadStream(import.meta.filename),
  async function* (source) {
    for await (let chunk of source) {
      yield chunk.toString().toUpperCase();
    }
  },
  process.stdout
);
```

```mjs
import fs from 'fs';
import { pipeline } from 'stream/promises';

await pipeline(
  fs.createReadStream(import.meta.filename),
  async function* (source) {
    for await (let chunk of source) {
      yield chunk.toString().toUpperCase();
    }
  },
  process.stdout
);
```

This code achieves the same result as the previous examples, without the need to define a new transform stream. The error from the previous examples has been removed for the sake of brevity. The async version of the pipeline has been used, and it should be wrapped in a `try...catch` block to handle possible errors.

### Object mode

By default, streams can work with strings, [`Buffer`][], [`TypedArray`][], or [`DataView`][]. If an arbitrary value different from these (e.g., an object) is pushed into a stream, a `TypeError` will be thrown. However, it is possible to work with objects by setting the `objectMode` option to `true`. This allows the stream to work with any JavaScript value, except for `null`, which is used to signal the end of the stream. This means you can `push` and `read` any value in a readable stream, and `write` any value in a writable stream.

```cjs
const { Readable } = require('node:stream');

const readable = Readable({
  objectMode: true,
  read() {
    this.push({ hello: 'world' });
    this.push(null);
  },
});
```

```mjs
import { Readable } from 'node:stream';

const readable = Readable({
  objectMode: true,
  read() {
    this.push({ hello: 'world' });
    this.push(null);
  },
});
```

When working in object mode, it is important to remember that the `highWaterMark` option refers to the number of objects, not bytes.

### Backpressure

When using streams, it is important to make sure the producer doesn't overwhelm the consumer. For this, the backpressure mechanism is used in all streams in the Node.js API, and implementors are responsible for maintaining that behavior.

In any scenario where the data buffer has exceeded the [`highWaterMark`][] or the write queue is currently busy, [`.write()`][] will return `false`.

When a `false` value is returned, the backpressure system kicks in. It will pause the incoming [`Readable`][] stream from sending any data and wait until the consumer is ready again. Once the data buffer is emptied, a [`'drain'`][] event will be emitted to resume the incoming data flow.

For a deeper understanding of backpressure, check the [`backpressure guide`][].

## Streams vs Web streams

The stream concept is not exclusive to Node.js. In fact, Node.js has a different implementation of the stream concept called [`Web Streams`][], which implements the [`WHATWG Streams Standard`][]. Although the concepts behind them are similar, it is important to be aware that they have different APIs and are not directly compatible.

[`Web Streams`][] implement the [`ReadableStream`][], [`WritableStream`][], and [`TransformStream`][] classes, which are homologous to Node.js's [`Readable`][], [`Writable`][], and [`Transform`][] streams.

### Interoperability of streams and Web Streams

Node.js provides utility functions to convert to/from Web Streams and Node.js streams. These functions are implemented as `toWeb` and `fromWeb` methods in each stream class.

The following example in the [`Duplex`][] class demonstrates how to work with both readable and writable streams converted to Web Streams:

```cjs
const { Duplex } = require('node:stream');

const duplex = Duplex({
  read() {
    this.push('world');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log('writable', chunk);
    callback();
  },
});

const { readable, writable } = Duplex.toWeb(duplex);
writable.getWriter().write('hello');

readable
  .getReader()
  .read()
  .then(result => {
    console.log('readable', result.value);
  });
```

```mjs
import { Duplex } from 'node:stream';

const duplex = Duplex({
  read() {
    this.push('world');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log('writable', chunk);
    callback();
  },
});

const { readable, writable } = Duplex.toWeb(duplex);
writable.getWriter().write('hello');

readable
  .getReader()
  .read()
  .then(result => {
    console.log('readable', result.value);
  });
```

The helper functions are useful if you need to return a Web Stream from a Node.js module or vice versa. For regular consumption of streams, async iterators enable seamless interaction with both Node.js and Web Streams.

```cjs
const { pipeline } = require('node:stream/promises');

const { body } = await fetch('https://nodejs.org/api/stream.html');

await pipeline(
  body,
  new TextDecoderStream(),
  async function* (source) {
    for await (const chunk of source) {
      yield chunk.toString().toUpperCase();
    }
  },
  process.stdout
);
```

```mjs
import { pipeline } from 'node:stream/promises';

const { body } = await fetch('https://nodejs.org/api/stream.html');

await pipeline(
  body,
  new TextDecoderStream(),
  async function* (source) {
    for await (const chunk of source) {
      yield chunk.toString().toUpperCase();
    }
  },
  process.stdout
);
```

Be aware that the fetch body is a `ReadableStream<Uint8Array>`, and therefore a [`TextDecoderStream`][] is needed to work with chunks as strings.

This work is derived from content published by [Matteo Collina][] in [Platformatic's Blog][].

[`Stream`]: https://nodejs.org/api/stream.html
[`Buffer`]: https://nodejs.org/api/buffer.html
[`TypedArray`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
[`DataView`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
[`TextDecoderStream`]: https://developer.mozilla.org/en-US/docs/Web/API/TextDecoderStream
[`EventEmitter`]: https://nodejs.org/api/events.html#class-eventemitter
[`Writable`]: https://nodejs.org/api/stream.html#stream_writable_streams
[`Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`Duplex`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`Transform`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`drain`]: https://nodejs.org/api/stream.html#stream_event_drain
[`on('data')`]: https://nodejs.org/api/stream.html#stream_event_data
[`data`]: https://nodejs.org/api/stream.html#stream_event_data
[`on('end')`]: https://nodejs.org/api/stream.html#event-end
[`end`]: https://nodejs.org/api/stream.html#event-end
[`on('readable')`]: https://nodejs.org/api/stream.html#event-readable
[`on('close')`]: https://nodejs.org/api/stream.html#event-close_1
[`on('error')`]: https://nodejs.org/api/stream.html#event-error_1
[`.read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size
[`.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[`_write`]: https://nodejs.org/api/stream.html#writable_writechunk-encoding-callback
[`.end()`]: https://nodejs.org/api/stream.html#writableendchunk-encoding-callback
[`'drain'`]: https://nodejs.org/api/stream.html#stream_event_drain
[`_transform`]: https://nodejs.org/api/stream.html#transform_transformchunk-encoding-callback
[`Readable.from()`]: https://nodejs.org/api/stream.html#streamreadablefromiterable-options
[`highWaterMark`]: https://nodejs.org/api/stream.html#stream_buffering
[`.pipe()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[`pipeline()`]: https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback
[`async pipeline()`]: https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options
[`Web Streams`]: https://nodejs.org/api/webstreams.html
[`ReadableStream`]: https://nodejs.org/api/webstreams.html#class-readablestream
[`WritableStream`]: https://nodejs.org/api/webstreams.html#class-writablestream
[`TransformStream`]: https://nodejs.org/api/webstreams.html#class-transformstream
[`WHATWG Streams Standard`]: https://streams.spec.whatwg.org/
[`backpressure guide`]: /learn/modules/backpressuring-in-streams
[`fs.readStream`]: https://nodejs.org/api/fs.html#class-fsreadstream
[`http.IncomingMessage`]: https://nodejs.org/api/http.html#class-httpincomingmessage
[`process.stdin`]: https://nodejs.org/api/process.html#processstdin
[`fs.WriteStream`]: https://nodejs.org/api/fs.html#class-fswritestream
[`process.stdout`]: https://nodejs.org/api/process.html#processstdout
[`process.stderr`]: https://nodejs.org/api/process.html#processstderr
[Matteo Collina]: https://github.com/mcollina
[Platformatic's Blog]: https://blog.platformatic.dev/a-guide-to-reading-and-writing-nodejs-streams
