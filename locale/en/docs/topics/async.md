Asynchronous Programming
========================
How we perform more than one simultaneous action in Node.js.

Audience: javascript programmers new to node.js.



The Problem
-----------
Asynchronous programming is a core element of the node.js APIs — in fact it's
one of the strengths of node.js. However, writing asynchronous algorithms and
using async APIs can be tricky to get right.

Can you spot the bug in the following code?

```js
// write the file
var fs = require('fs');
var path = './foo/bar.txt';
fs.mkdir('./foo', function() {
  fs.writeFile(path, 'hello');
});
// upload it
var request = require('request');
var url = 'http://mysite.com/foo/bar.txt';
fs.createReadStream(path).pipe(request.put(url))
```

That example has at least 4 bugs in it! 😲 😄

Below we'll discuss the approaches and considerations for effective
asynchronous programming.



What Is Async Programming
-------------------------
Asynchronous programming is any technique in which the result of an operation
is available outside of the normal synchronous (statement by statement) flow
of code in a program.

For example, you might call the function `foo()` and it returns somewhat
quickly, but the result is available sometime _after_ the function has
returned. The `foo()` function will provide a way for you to access this
result.

There are several techniques for asynchronous programming. Listed below are
the ones commonly used in node.js. Sometimes more than one technique will be
used within the same program.



Why Async Is Used in Node.js
----------------------------
Node.js runs javascript on the server, and was created to be able to write
long-running processes which handle multiple requests. These processes are
sometimes called "apps" or "daemons", or even themselves called "servers".

For example, a process which handles HTTP (web) requests might take some time
to assemble each page out of various sources. If fetching data from these
sources is done asynchronously then the process can listen for and start
handling other requests while waiting for the sources to return their results.

As well, asynchronous programming makes it easy to fetch data from multiple
sources at the same time. This is faster than querying each source one at a
time and waiting for each to complete before starting the next.

By using asynchronous programming, well-written node.js processes can handle
hundreds or thousands of requests per second. Fewer processes doing more work
can be more efficient than many processes waiting idly for external sources to
return.



Async Approach: Callbacks
-------------------------
In this approach, when a function is called it is passed a function object as
an argument. Once the result is available it is passed to this function
object. The function object is often called a "callback" since it is "called"
to return the result "back" to the caller.

Consider the following example:

```js
function add(a, b, callback) {
  setTimeout(function() {
    var c = a + b;
    callback(c);
  }, 100);
}

add(12, 5, function(sum) {
  console.log(sum);
});
```

When we call `add()` we pass an anonymous function as the third argument. Once
the sum is available the anonymous function will be called with it.

There are two common refinements to the above technique: events and streams.


### Events
Although a callback is often called once to return the result of an operation,
there is another common usecase: responding to an event (which might happen
more than once). In this approach a callback is registered so that it is
called when something interesting happens later.

```js
process.on('uncaughtException', function(err) {
  console.error('TROUBLE!', err.stack);
});
```

The callback in this case is sometimes called a "listener" or an "event
handler". The documentation for each event should describe the signature of
the callback.

For more information see the [events API][] documentation.


### Streams
Streams are one way of connecting a data producer with a data consumer so that
data is processed asynchronously. Much of the API is built on events.

For more information see the [stream API][] documentation.


### Nodeback
In node.js there is a common pattern for using callbacks where:

* The callback is the last argument of the function.
* The first argument of the callback is an error object. (see "Throwing
  and try/catch" below.)

Example:

```js
require('fs').readFile('foo.txt', function(err, contents) {
  if (err) {
    // somehow respond to the error
  } else {
    // use the contents of the file
  }
});
```

This approach to callbacks is so common in node.js that is has been nicknamed
"nodeback" 😄



Async Approach: Promises
------------------------
In this approach a function returns an object which represents a "promise" to
provide the actual result at some later time. The [Promise API][] specifies
how that result becomes available.

The Promise API is an official part of the javascript language starting with
ECMAScript 2015 (ES6), which is available starting with node.js version 0.12.
If you're using an earlier version of node.js you can use one of the many
[promise modules][].



Async Approach: ES7 async/await
-------------------------------
There is a proposed addition to ECMAScript (possibly arriving in ES7) to add
language features meant to ease working with asynchronous programming. It does
this by adding the [async and await][] keywords.



Considerations for Async Programming
------------------------------------
There are some tricks to asynchronous programming in javascript.


### The Context
In javascript every function runs within a context (available in the `this`
variable). For methods called on an object the context is usually the object
itself.

Some approaches to async programming have the asynchronous function return the
result by passing it to a callback. Since this callback is called sometime
_after_ the called function has returned, there is no guarantee that the
context is the same as when the original function was called. In this case the
callback should be written in a way that makes no assumptions about the
current context.

One common way to address this is to save the context in a variable which is
explicitly used in the callback. Another is to use the `bind()` function to
create a function which calls the callback with the appropriate context.

```js
function MyObject() {
  this.total = 0;
}
MyObject.prototype = {

  increment: function() {
    this.total += 1;
    console.log('--TOTAL', this.total);
  },

  run: function() {
    // TROUBLE! By the time the `increment()` function is called the `this`
    // variable will no longer be its scope.
    setTimeout(this.increment, 100);

    // One approach is to save the context so that we can use it explicitly
    // later.
    var self = this;
    setTimeout(function() {
      self.increment();
    }, 200);

    // Another approach is to bind the function to the specific desired
    // context.
    setTimeout(this.increment.bind(this), 300);
  }

};
var obj = new MyObject();
obj.run();
```


### The Event Loop
The event loop is a low-level part of node.js which keeps track of
asynchronous operations which haven't completed.

The event loop doesn't usually cause difficulty itself. However sometimes it's
good to know about it because of how it impacts the order in which your code
runs.

Consider this example:

```js
console.log('--begin');
setTimeout(function() {
    console.log('--timeout');
}, 100);
console.log('--end');
```
This prints:

```
--begin
--end
--timeout
```

Even though the bottom of the script (the `--end`) is reached quickly, node.js
knows that there is still a timeout pending and so doesn't let the script exit
until that timeout has happened.

Another thing which can keep the event loop from completing is if the process
is listening for incoming network connections. This is how an HTTP server can
keep running, waiting for page requests, even though the main program has
reached the end.

The "event loop" has that name because it is a "loop" which runs continuously,
looking for "events" which have happened and processing them. It will continue
to loop until it is no longer expecting more events to happen.

The event loop works something like the following pseudo-code:

```js
while (true) {
  for (each event that happened) {
    process the event
  }
  if (no more pending events) {
    break;
  }
}
```

Some examples of events for which the event loop will wait:

* An asynchronous filesystem operation has completed.
* An asynchronous network operation has completed.
* A new incoming network connection was detected.
* A timer has timed out.

There are two functions which allow you to directly manipulate the event loop:
`nextTick()` and `setImmediate()`.

The `nextTick()` function allows you to give a callback which is added to the
beginning of the list of completed events. Said another way, the callback you
pass to `nextTick()` will be called as soon as the current event handler is
done.

The `setImmediate()` function allows you to give a callback which is processed
the next time through the loop.

The distinction between `nextTick()`, `setImmediate()`, and
`setTimeout(..., 0)` is subtle.


### Exceptions and Stack Traces
Since an asynchronous function can call the callback some time after it was
invoked, the execution environment of the callback can be quite different than
what existed when the async function was called.

Consider the following example:

```js
function err() {
    var e = new Error('boom');
    console.log(e.stack);
}
function run() {
    err();
    setTimeout(err, 100);
}
run();
```

This has the following output:

```
Error: boom
    at err (/Users/drewfish/stacktrace.js:2:13)
    at run (/Users/drewfish/stacktrace.js:6:5)
    at Object.<anonymous> (/Users/drewfish/stacktrace.js:9:1)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:929:3
Error: boom
    at err [as _onTimeout] (/Users/drewfish/stacktrace.js:2:13)
    at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)
```

Note how the stacktrace from the first call to `err()` does have the `run()`
function in it, yet the second call doesn't. This is because the second call
to `err()` happens _after_ `run()` has completed so `run()` is no longer part
of the execution environment.

This is where the event loop shows up: the second call to `err()` happens
during a timeout which is handled in the event loop.


#### Throwing and try/catch
One thing to be careful about in asynchronous programming is throwing errors
and attempting to catch them.

Consider this example:

```js
function run() {
    setTimeout(function() {
        throw new Error('boom');
    }, 100);
}
try {
    run();
}
catch (err) {
    // we'll never get here!
    console.log('TROUBLE!', err.stack);
}
```

Since the `run()` function returns quickly, the execution of the program moves
outside of the `try` block. (In fact it moves to the _end_ of the file, but
the program doesn't exit because there is a timeout waiting to happen.) Once
the timeout happens the code is run which throws the error. Since the program
has moved outside of the `try` block the `catch` doesn't catch this thrown
error.

It is because of this that exceptions are not commonly thrown from
asynchronous functions. Instead a common practice is to pass the error object
to the callback. (See "nodeback" above.)

In desperation, you can register a global exception handler by listening for
the `uncaughtException` event on the process.

```js
process.on('uncaughtException', function(err) {
  console.error('TROUBLE!', err.stack);
});
```

Since this event handler is called well outside of your algorithm there is
often very little you can do to recover from this exception.

Some Promise implementations will catch a thrown error and resolve the promise
as failed.


### Concurrency
If using asynchronous programming to handle network requests, it is possible
that more than one request is being processed at the same time. This means
that global variables should be treated with care, and probably shouldn't be
associated with a single request.

Consider the following example:

```js
var server = require('http').createServer().listen(8000),
    currentRequest;
server.on('request', function(request, response) {
    currentRequest = request;   // trouble set!
    setTimeout(function() {
        response.writeHead(200);
        response.end('hello world');
        currentRequest = null;  // trouble clear!
    }, 1000);
});
```

The way the `currentRequest` variable is used is problematic. When a second
concurrent request comes in, the `trouble set!` line will clobber the first
request object. Once the first request is done, the `trouble clear!` line will
empty the variable even though there is still another request currently being
processed.


### Single Javascript Execution Thread
The part of node.js which runs your javascript does so in a single thread.
Only one block of javascript code will be executing at any time, and it will
run until it completes. Node.js won't interrupt a block of javascript in
order to handle events.

This means that if you are doing computationally intensive tasks (such as
processing lots of text) then no events will be processed while that code is
running. One approach to address this is to split long computations into
several steps and run the steps asynchronously.



When Synchronous Is OK
----------------------
Asynchronous programming is great when you need to handle multiple requests at
the same time or if you need to be very efficient with resources. However, it
has tricks as shown above.

Sometimes you don't need such power or efficiency, and you might be more
concerned with the simplicity of your algorithm. In this case keeping things
synchronous might be the best approach. Many of the node.js APIs have
synchronous versions to help with this approach.

An example where synchronous programming might be OK is when writing a command
line script. Often these scripts run a series of steps one-by-one and then
exit. One popular npm module to aid with writing command line scripts is
`shelljs`.



[events API]: https://nodejs.org/api/events.html
[stream API]: https://nodejs.org/api/stream.html
[Promise API]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promise modules]: https://promisesaplus.com/implementations
[async and await]: http://tc39.github.io/ecmascript-asyncawait/
