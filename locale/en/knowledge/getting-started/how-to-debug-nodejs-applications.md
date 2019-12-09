---
title: How to debug a node application
date: '2011-08-26T10:08:50.000Z'
tags:
  - debug
difficulty: 1
layout: knowledge-post.hbs
---

Often times, not just in the Node.js community but in software at large, people debug simply with a liberal sprinkle of standard output statements. This allows you to track down where unexpected values are being generated. However, this method can be tedious, or worse yet, not robust enough to detect the real problem.

### Set up

Thankfully, through the use of `node-inspector`, we can harness to power of the webkit-debuggers to work with our Node.js code. The process itself is simple.

First, ensure that node-inspector is installed:

```
npm install node-inspector -g
```

A good example application to experiment with is a basically 'hello world' server with a counter (copied from the `node-inspector` repo):

```javascript
var http = require('http');

var x = 0;
http.createServer(function (req, res) {
  x += 1;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World ' + x);
}).listen(8124);
console.log('Server running at http://127.0.0.1:8124/');
```

First, we start your node program with debugging enabled.

```
node --debug app.js
```

which should print something along the lines of `debugger listening on port 5858` to stderr. Take note of the port number, it is the port that the debugger is running on.

Next, start up `node-inspector`. If your program uses port 8080, then you may have to pass it a custom port.

```
node-inspector [--web-port=<custom port number>]
```

Finally you fire up a webkit browser such as chrome or safari. and go to `127.0.0.1:8080/debug?port=5858`. Note, if the debugger is listening on a port other than `5858`, you will need to change it. Also, if you passed a custom webport to node-inspector, then you will have to modify the `8080`.

At this point, you will be met with a fairly empty screen with the `scripts`, `profiles`, and `console` tabs.

### Scripts tab

This is just like most webkit/firebug debuggers. It has a list of all the JavaScript files (including Node.js core and third party libraries) which you can select and dive into. To stop the interpreter on a specific line, you set a breakpoint by clicking on the number of the desired line. When the execution is frozen, by a breakpoint or by manually pausing interpretation by pressing the pause button, you can check the callstack and examine all the local, closure, and global variables. You can also modify the code to try and fix behavior. Note that when you modify the code through the script tab, it does not get saved to the file, so you will need to transfer the modifications back by hand.

### Profiles tab

To use the profile tab, you need a library called `v8-profiler`:

```
npm install v8-profiler
```

Next, you have to require it inside the file you are debugging:

```javascript
var profiler = require('v8-profiler');
```

Now you can finally enable the `profiles` tab, unfortunately, all you can do from this screen is a heap snapshot. So from the code, you need to select where you want to start to cpu profiler and can select more precise location for heap snapshots.

To take a heap snapshot, just insert this line in the desired location and optionally pass it a name.

```javascript
var snapshot = profiler.takeSnapshot(name);
```

To take a cpu profile, just surround the code that you are profiling with the two lines shown below. Optionally, a name can be included to indentify the cpu profile.

```javascript
profiler.startProfiling(name);
//..lots and lots of methods and code called..//
var cpuProfile = profiler.stopProfiling([name]);
```

As an example how to use these, here is the code given earlier modified to take a cpu profile on every request and take a heap snapshot: after the server is created.

```javascript
var http = require('http');
var profiler = require('v8-profiler');

var x = 0;
http.createServer(function (req, res) {
  x += 1;
  profiler.startProfiling('request '+x);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World ' + x);
  profiler.stopProfiling('request '+x);
}).listen(8124);
profiler.takeSnapshot('Post-Server Snapshot');
console.log('Server running at http://127.0.0.1:8124/');
```

Note that despite these apis returning objects, it is much easier to sort through the data through the node-inspector interface. Hopefully with these tools, you can make more informed decisions about memory leaks and bottlenecks.

### Console tab

Finally, the console tab allows you to use node's REPL in your program's global scope. This has a few gotchas since that means you can not access in local variables. Thus the variables you can read or write are variables that were defined without a `var` statement. The other gotcha is when you use `console.log` refers to node's `console.log` and not webkit's console.log. This means the output goes to stdout and not to your console tab. Otherwise it is a very straightforward node REPL.
