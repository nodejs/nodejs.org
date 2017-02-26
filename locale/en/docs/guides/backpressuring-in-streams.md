---
title: Backpressuring in Streams
layout: docs.hbs
---

# Backpressuring in Streams

There is a general problem that arises during data handling called
[`backpressure`][]. The term is used to describe a build up of data behind a 
buffer during data transfer. When the recieving end of the transfer has complex
operations, or is slower for whatever reason, there is a tendency for data from 
the incoming source to begin to accumulate.

To solve this problem, there must be a delegation system in place to ensure a
smooth flow of data from one source to another. Different communities have
resolved this issue uniquely to their programs, Unix pipes and TCP sockets are
good examples of this, and often times is referred to as _flow control_. In
Node.js, streams have been the adopted solution.

The purpose of this guide is to further detail what backpressure is, and how
exactly streams address this in Node.js' source code. The second part of
the guide will introduce suggested best practices to ensure your application's
code is safe and optimized when implementing streams.

We assume a little familiarity with the general definition of
[`backpressure`][], [`Buffer`][], and [`EventEmitters`][] in Node.js, as well as
some experience with [`Streams`][]. If you haven't read through those docs,
it's not a bad idea to take a look at the API documentation first, as it will
help expand your understanding while reading this guide and for following along
with examples.

## The Problem With Data Handling

In a computer system, data is transferred from one process to another through
pipes, sockets, and signals. In Node.js, we find a similar mechanism called
[`Streams`][]. Streams are great! They do so much for Node.js and almost every
part of the internal codebase utilizes that module. As a developer, you
are more than encouraged to use them too!

```javascript
const readline = require('readline');

// process.stdin and process.stdout are both instances of Streams
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Why should you use streams? ', (answer) => {

  console.log(`Maybe it's ${answer}, maybe it's because they are awesome! :)`);

  rl.close();
});
```

A good example of why the backpressure mechanism implemented through streams are
a great optimization can be demonstrated by comparing the internal system tools
from Node.js' [`Streams`][] implementation.

In one scenario, we take a large file (approximately ~9gb) and compress it up
using the familiar [`zip(1)`][] tool.

```
$ zip The.Matrix.1080p.mkv
```

While that will take a few minutes to compress, in another shell we may run
a script that takes Node.js' module [`Zlib`][], that wraps around another compression tool, [`gzip(1)`][].

```javascript
const gzip = require('zlib').createGzip();
const fs = require('fs');

const inp = fs.createReadStream('The.Matrix.1080p.mkv');
const out = fs.createWriteStream('The.Matrix.1080p.mkv.gz');

inp.pipe(gzip).pipe(out);
```

While the first `zip` function will ultimately fail, Node will be able to handle 
large amount of data transfer.

To test the results, try opening each compressed file. The one done by `zip`
will warn you that the file is corrupt, whereas the one done by streams will 
decompress perfectly fine.

## Too Much Data, Too Quickly

There are instance where a [`Readable`][] stream might give data to the
[`Writable`][] much too quickly --- much more than the consumer can handle!

When that occurs, the consumer will begin to queue all the chunks of data for
later consumption. The write queue will get longer and longer, and because of
this more data must be kept in memory until the entire process has completed.

Writing to a disk is a lot slower than reading from a disk, thus, when we are
trying to compress a file and write it to our hard disk, backpressure will
arise because the write disk will not be able to keep up with the speed from
the read.

```javascript
  // Secretly the stream is saying: "whoa, whoa! hang on, this is way too much!"
  // Data will begin to build up on the read-side of the data buffer as
  // `write` tries to keep up with the incoming data flow.
  inp.pipe(gzip).pipe(outputFile);
```
This is why a backpressure mechanism is important. If a backpressure system was 
not present, the process would use up your system's memory, effectively slowing
down other processes, and monopolizing a large part of your system until
completion.

This results in a few things:

* Slowing down all other current processes
* A very overworked garbage collector
* Memory exhaustion

## Overall Dip in System Performance

In the following examples we will take out the [return value][] of the
`.write()` function and change the it to `true`. In any reference to 'modified'
binary, we are talking about running the `node` binary without the `return ret;` 
line, and instead with the replaced `return true;`.

## Excess Drag on Garbage Collection

Let's take a look at a quick benchmark. Using the same example from above, we
ran a few time trials to get a median time for both binaries.

```
   trial (#)  | `node` binary (ms) | modified `node` binary (ms)
=================================================================
    1         |      56924         |           55011
    2         |      52686         |           55869
    3         |      59479         |           54043
    4         |      54473         |           55229
    5         |      52933         |           59723
=================================================================
average time: |      55299         |           55975
```

Both take around a minute to run, so there's not much of a difference at all,
but let's take a closer look to confirm whether our suspicions are correct. We
use the linux tool [`dtrace`][] to evaluate what's happening with the V8 garbage
collector.

The GC (garbage collector) measured time indicates the intervals of a full cycle 
of a single sweep done by the garbage collector:

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
While the two processes start off the same and seem to work the GC at the same
rate, it becomes evident that after a few seconds with a properly working
backpressure system in place, it spreads the GC load across consistent
intervals of 4-8 milliseconds until the end of the data transfer.

However, when a backpressure system is not in place, the V8 garbage collection
starts to drag out. The normal binary called the GC approximately `75`
times in a minute, whereas, the modified binary fires only `36` times.

This is the slow and gradual debt accumulating from a growing memory usage. As
data gets transferred, without a backpressure system in place, more memory is
being used for each chunk transfer.

The more memory that is being allocated, the more the GC has to take care of in
one sweep. The bigger the sweep, the more the GC needs to decide what can be
freed up and scanning for detached pointers in a larger memory space will 
consume more computing power.

## Memory Exhaustion

To determine the memory consumption of each binary, we've clocked each process
with `/usr/bin/time -lp sudo ./node ./backpressure-example/zlib.js`
individually.

This is the output on the normal binary:

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

The maximum byte size occupied by virtual memory turns out to be approximately
`87.81 mb`.

And now changing the [return value][] of the `.write()` function, we get:

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

The maximum byte size occupied by virtual memory turns out to be approximately
`1.52 gb`.

Without streams in place to delegate the backpressure, there is a memory space 
with an entire degree of magnitude greater that is being allocated. That is a 
huge margin of difference between the exact process.

This experiment shows how optimized and cost-effective Node's backpressure
mechanism is for your computing system. Now, let's do a break down on how it 
works and how we can make sure we are utilizing it in our own applications when 
building custom streams!

## How Does Backpressure Resolve These Issues?

There are different functions to transfer data from one process to another. In
Node.js, there is an internal built-in function called [`.pipe()`][]. There are
[other packages][] out there you can use too! Ultimately though, at the basic
level of this process, we have two separate components: the _source_ of the
data and the _consumer_.

When [`.pipe()`][] is called from the source, it signals to the consumer that
there is data to be transferred. The pipe function helps to set up the
appropriate backpressure closures for the event triggers.

In Node.js the source is a [`Readable`][] stream and the consumer is the
[`Writable`][] stream (both of these may be interchanged with a [`Duplex`][] or
a [`Transform`][] stream, but that is out-of-scope for this guide).

The moment that backpressure is triggered can be narrowed exactly to the return
value of a `Writable`'s [`.write()`][] function. This return value is
determined by a few conditions, of course.

In any scenario where the data buffer has exceeded the [`highWaterMark`][] or
the write queue is currently busy, [`.write()`][] will return `false`.

When a `false` value is returned, the backpressure system kicks in. It will
pause the incoming [`Readable`][] stream from sending any data and wait until
the consumer is ready again. Once the data buffer is emptied, a [`.drain()`][] 
event will be emitted and resume the incoming data flow.

The `Readable` stream also plays a vital role in backpressure. Because the two
processes rely on one another to communicate effectively, if the `Readable` does
not respect when the `Writable` stream asks to stop sending data, it can be
just as problematic.

An instance of this can be unconditionally calling your `Readable` stream to
send data using the [`push method`][] or forcing data through whenever it
is available (signaled by the [`.data` event][]):

```javascript
// This is problematic as it ignores backpressure signals
readable.on('readable', () => {

  let chunk;
  while (null !== (chunk = readable.read())) {
    readable.push(chunk);
  }

});

// Also ignores backpressure and rams data through, regardless if destination
// stream is ready or not.
readable.on('data', data =>
  writable.write(data);
);
```

Once the the queue is finished, backpressure will allow data to be sent again.
The space in memory that was being used will free itself up and prepare for the
next batch of data.

This effectively allows an fixed amount of memory to be used at any given
time for a [`.pipe()`][] function. There will be no memory leakage, no
infinite buffering, and the garbage collector will only have to deal with
one area in memory!

So, if backpressure is so important, why have you (probably) not heard of it?
Well the answer is simple: Node.js does all of this automatically for you.

That's so great! But also not so great when we are trying to understand how to
implement our own custom streams.

## Lifecycle of `.pipe()`

To achieve a better understanding of backpressure, here is a flow-chart on the
lifecycle of a [`Readable`][] stream being [piped][] into a [`Writable`][]
stream:

```javascript
+===============+               +===============+
|   Your Data   |               |  .pipe(dest)  |
+===============+               |===============|
        |                       |  Setup event  |
        |                       |  closures:    |
+-------v-----------+           |               |         +-------------------+
|  Readable Stream  >-----------+ * .data(cb)   +--------->  Writable Stream  |
+-^-------^-------^-+           | * .drain(cb)  |         +-------------------+
  ^       ^       ^             | * .unpipe(cb) |                   |
  |       ^       |             | * .error(cb)  |                   |
  |       |       |             | * .finish(cb) |                   |
  ^       |       |             | * .end(cb)    |           +=======v=========+
  ^       |       ^             | * .close(cb)  |           |  .write(chunk)  |
  |       |       ^             +---------------+           +=======+=========+
  |       ^       |                                                 |
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

_Note:_ The `.pipe()` function is typically where backpressure is invoked. In
an isolate application, both [`Readable`][] and [`Writable`][] streams
should be present. If you are writing an application meant to accept a
[`Readable`][] stream, or pipes to a [`Writable`][] stream from another
component, you may omit this detail.

## Example App

Since [Node.js v0.10][], the [`Streams`][] class has offered the ability to
modify the behaviour of the [`.read()`][] or [`.write()`][] by using the
underscore version of these respective functions ([`._read()`][] and
[`._write()`][]).

There are guidelines documented for [implementing Readable streams][] and
[implementing Writable streams][]. We will assume you've read these over.

This application will do something very simple: take the data source and
perform something fun to the data, and then write it to another file.

## Rules to Abide For Writing Custom Streams

Recall that a [`.write()`][] may return true or false dependent on some
conditions. Luckily for us, when building our own [`Writable`][] stream,
the [`stream state machine`][] will handle our callbacks and determine when to
handle backpressure and optimize the flow of data for us.

However, when we want to use a [`Writable`][] directly, we must respect the
`.write()` return value and pay close attention these conditions:

* If the write queue is busy, [`.write()`][] will return false.
* If the data chunk is too large, [`.write()`][] will return false (the limit
is indicated by the variable, [`highWaterMark`][]).

_Note_: In most machines, there is a byte size that is determines when a buffer
is full (which will vary across different machines). Node.js allows you to set
your own custom [`highWaterMark`][], but commonly, the default is the optimal
value for what system is running the application. In instances where you might
want to raise that value, go for it, but do so with caution!

## Build a Writable Stream

When we code a custom [`._write()`][], the code gets used internally by the
prototypical [`.write()`][]. This does not override the backpressure mechanism,
but we must respect the return value whenever we are building custom streams.

```javascript
const Writable = require('stream').Writable;

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {

    // does something?

  }
}
```


## Conclusion

Streams are a often used module in Node.js. They are important to the internal
structure, and for develoeprs, to expand and connect across the Node.js modules
ecosystem.

Hopefully, you will now be able to troubleshoot, safely code your own
[`Writable`][] streams with backpressure in mind, and share your knowledge with
colleagues and friends.

Be sure to read up more on [`Streams`][] for other [`EventEmitters`][] to help
improve your knowledge when building applications with Node.js.



[`Streams`]: https://nodejs.org/api/stream.html
[`Buffer`]: https://nodejs.org/api/buffer.html
[`EventEmitters`]: https://nodejs.org/api/events.html
[`Writable`]: https://nodejs.org/api/stream.html#stream_writable_streams
[`Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`Duplex`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`Transform`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`Zlib`]: https://nodejs.org/api/zlib.html
[`.drain()`]: https://nodejs.org/api/stream.html#stream_event_drain
[`.read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size
[`.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[`._read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size_1
[`._write()`]: https://nodejs.org/docs/latest/api/stream.html#stream_writable_write_chunk_encoding_callback_1
[push method]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_push_chunk_encoding

[implementing Writable streams]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_writable_stream
[implementing Readable streams]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_readable_stream

[other packages]: https://github.com/sindresorhus/awesome-nodejs#streams
[`backpressure`]: https://en.wikipedia.org/wiki/Back_pressure#Back_pressure_in_information_technology
[Node.js v0.10]: https://nodejs.org/docs/v0.10.0/
[`highWaterMark`]: https://nodejs.org/api/stream.html#stream_buffering
[return value]: https://github.com/nodejs/node/blob/55c42bc6e5602e5a47fb774009cfe9289cb88e71/lib/_stream_writable.js#L239

[dtrace]: http://dtrace.org/blogs/about/
[`zip(1)`]: https://linux.die.net/man/1/zip
[`gzip(1)`]: https://linux.die.net/man/1/gzip
[`stream state machine`]: https://en.wikipedia.org/wiki/Finite-state_machine

[`.pipe()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[piped]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
