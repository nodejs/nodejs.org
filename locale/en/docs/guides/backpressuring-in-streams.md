---
title: Backpressuring in Streams
layout: docs.hbs
---

# Backpressuring in Streams
 
The purpose of this guide will describe what backpressure is and the 
problems in Streams that it solves. The first part of this guide will cover 
these questions. The second part of the guide will introduce suggested best 
practices to ensure your application's code is safe and optimized.

We assume a little familiarity with the general definition of 
[`backpressure`][], [`Buffer`][] and [`EventEmitters`][] in Node.js, as well as 
some experience with [`Streams`][]. If you haven't read through those docs, 
it's not a bad idea to take a look at the API documentation first, as it will 
help expand your understanding while reading this guide and for following along 
with examples.

## The Problem with Streams

In a computer system, data is transferred from one process to another through 
pipes and signals. In Node.js, we find a similar mechanism and called 
[`Streams`][]. Streams are great! They do so much for Node.js and almost every
part of the internal codebase utilizes the `Streams` class. As a developer, you 
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


There are different functions to transfer data from one process to another. In 
Node.js, there is an internal built-in function called [`.pipe()`][]. There are
[other packages][] out there you can use too! Ultimately though, at the basic 
level of this process, we have two separate components: the _source_ of the 
data and the _consumer_.

In Node.js the source is a [`Readable`][] stream and the consumer is the 
[`Writable`][] stream (both of these may be interchanged with a [`Duplex`][] 
stream, but that is out-of-scope for this guide).

## Too Much Data, Too Quickly

There are instance where a [`Readable`][] stream might give data to the
[`Writable`][] much too quickly --- much more than the consumer can handle! 

When that occurs, the consumer will begin to queue all the chunks of data for 
later consumption. The write queue will get longer and longer, and because of 
this more data must be kept in memory until the entire process has completed.

```javascript
  var fs = require('fs');

  var inputFile  = fs.createReadStream('REALLY_BIG_FILE.x');
  var outputFile = fs.createWriteStream('REALLY_BIG_FILE_DEST.x');

  // Secretly the stream is saying: "whoa, whoa! hang on, this is way too much!"
  inputFile.pipe(outputFile);
```


This is why backpressure is important. If a backpressure system was not 
present, the process would use up your system's memory, effectively slowing 
down other processes, and monopolizing a large part of your system until 
completion.

This results in a few things:

* Memory exhaustion
* A very overworked garbage collector
* Slowing down all other current processes

## Memory Exhaustion



## Garbage Collection



## Overall Dip in System Performace



## How Does Backpressure Resolve These Issues?

The moment that backpressure is triggered can be narrowed exactly to the return 
value of a `Writable`'s [`.write()`][] function. This return value is 
determined by a few conditions, of course.

In any scenario where the data buffer has exceeded the [`highWaterMark`][] or 
the write queue is currently busy, [`.write()`][] will return `false`. 

When a `false` value is returned, the backpressure system kicks in. It will 
pause the incoming [`Readable`][] stream from sending any data and wait until
the consumer is ready again.

Once the the queue is finished, backpressure will allow data to be sent again.
The space in memory that was being used will free itself up and prepare for the 
next glob of data. 

This effectively allows an fixed amount of memory to be used at any given
time for a [`.pipe()`][] function. There will be no memory leakage, no 
indefinite buffering, and the garbage collector will only have to deal with
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
+===============+
|   Your_Data   |
+=======+=======+
        |
+-------v-----------+          +-------------------+         +=================+
|  Readable Stream  |          |  Writable Stream  +--------->  .write(chunk)  |
+-------+-----------+          +---------^---------+         +=======+=========+
        |                                |                           |
        |     +======================+   |        +------------------v---------+
        +----->  .pipe(destination)  >---+        |    Is this chunk too big?  |
              +==^=======^========^==+            |    Is the queue busy?      |
                 ^       ^        ^               +----------+-------------+---+
                 |       |        |                          |             |
                 |       |        |  > if (!chunk)           |             |
                 ^       |        |      emit .end();        |             |
                 ^       ^        |  > else                  |             |
                 |       ^        |      emit .write();  +---v---+     +---v---+
                 |       |        ^----^-----------------<  No   |     |  Yes  |
                 ^       |                               +-------+     +---v---+
                 ^       |                                                 |
                 |       ^   emit .pause();        +=================+     |
                 |       ^---^---------------------+  return false;  <-----+---+
                 |                                 +=================+         |
                 |                                                             |
                 ^   when queue is empty   +============+                      |
                 ^---^-----------------^---<  Buffering |                      |
                     |                     |============|                      |
                     +> emit .drain();     |  <Buffer>  |                      |
                     +> emit .resume();    +------------+                      |
                                           |  <Buffer>  |                      |
                                           +------------+  add chunk to queue  |
                                           |            <--^-------------------<
                                           +============+
```


_Note_: The `.pipe()` function is typically where backpressure is invoked. In 
an isolate application, both [`Readable`][] and [`Writable`][] streams 
should be present. If you are writing an application meant to accept a 
[`Readable`][] stream, or pipes to a [`Writable`][] stream from another app, 
you may omit this detail.

## Example App

Since [Node.js v0.10][], the [`Streams`][] class has offered the ability to 
overwrite the functionality of [`.read()`][] or [`.write()`][] by using the
underscore version of these respective functions ([`._read()`][] and 
[`._write()`][]).

There are guidelines documented for [implementing Readable streams][] and 
[implementing Writable streams][]. We will assume you've read these over. 

This application will do something very simple: take the data source and 
perform something fun to the data, and then write it to another file.

## Rules to Abide For Writing Custom Streams 

Recall that a [`.write()`][] may return true or false dependent on some 
conditions. Thus, when building our own [`Writable`][] stream, we must pay 
close attention those conditions and the return value:

* If the write queue is busy, [`.write()`][] will return false.
* If the data chunk is too large, [`.write()`][] will return false (the limit 
is indicated by the variable, [`highWaterMark`][]).

_Note_: In most machines, there is a byte size that is determines when a buffer 
is full (which will vary across different machines). Node.js allows you to set 
your own custom [`highWaterMark`][], but commonly, the default is the optimal 
value for what system is running the application. In instances where you might 
want to raise that value, go for it, but do so with caution!  

## Build a WritableStream

Let's extend the prototypical function of [`.write()`][]: 

```javascript
const Writable = require('stream').Writable;

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid'));
    } else {
      callback();
    }
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
[`.drain()`]: https://nodejs.org/api/stream.html#stream_event_drain
[`.read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size
[`.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[`._read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size_1
[`._write()`]: https://nodejs.org/docs/latest/api/stream.html#stream_writable_write_chunk_encoding_callback_1

[implementing Writable streams]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_writable_stream
[implementing Readable streams]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_readable_stream

[other packages]: https://github.com/sindresorhus/awesome-nodejs#streams
[`backpressure`]: https://en.wikipedia.org/wiki/Back_pressure#Back_pressure_in_information_technology
[Node.js v0.10]: https://nodejs.org/docs/v0.10.0/
[`highWaterMark`]: https://nodejs.org/api/stream.html#stream_buffering

[`.pipe()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[piped]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options