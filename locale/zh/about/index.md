---
layout: about.hbs
title: About
trademark: Trademark
---
# About Node.js&reg;

As an asynchronous event driven framework, Node.js is designed to build
scalable network applications. In the following "hello world" example, many
connections can be handled concurrently. Upon each connection the callback is
fired, but if there is no work to be done Node is sleeping.

```javascript
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
```

This is in contrast to today's more common concurrency model where OS threads
are employed. Thread-based networking is relatively inefficient and very
difficult to use. Furthermore, users of Node are free from worries of
dead-locking the process—there are no locks. Almost no function in Node
directly performs I/O, so the process never blocks. Because nothing blocks,
less-than-expert programmers are able to develop scalable systems.

Node is similar in design to and influenced by systems like Ruby's [Event
Machine](http://rubyeventmachine.com/) or Python's
[Twisted](http://twistedmatrix.com/). Node takes the event model a bit further,
it presents the event loop as a language construct instead of as a library. In
other systems there is always a blocking call to start the event-loop.
Typically one defines behavior through callbacks at the beginning of a script
and at the end starts a server through a blocking call like
`EventMachine::run()`. In Node there is no such start-the-event-loop call. Node
simply enters the event loop after executing the input script. Node exits the
event loop when there are no more callbacks to perform. This behavior is like
browser JavaScript -— the event loop is hidden from the user.

HTTP is a first class citizen in Node, designed with streaming and low latency
in mind. This makes Node well suited for the foundation of a web library or
framework.

Just because Node is designed without threads, doesn't mean you cannot take
advantage of multiple cores in your environment. You can spawn child processes
that are easy to communicate with by using our
[child_process.fork()](https://nodejs.org/api/child_process.html#child_process.fork)
API. Built upon that same interface is the
[cluster](https://nodejs.org/api/cluster.html) module, which allows you to share
sockets between processes to enable load balancing over your cores.
