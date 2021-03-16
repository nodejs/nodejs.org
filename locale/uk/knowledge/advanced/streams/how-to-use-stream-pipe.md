---
title: How to use stream.pipe
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
difficulty: 2
layout: knowledge-post.hbs
---

If you've been using Node.js for a while, you've definitely run into streams. HTTP connections are streams, open files are streams; stdin, stdout, and stderr are all streams as well. A 'stream' is node's I/O abstraction - if you feel like you still need to understand them better, you can read more about them [here](https://nodejs.org/api/stream.html#stream_stream).

Streams make for quite a handy abstraction, and there's a lot you can do with them - as an example, let's take a look at `stream.pipe()`, the method used to take a readable stream and connect it to a writeable steam. Suppose we want to spawn a `node` child process and pipe our stdout and stdin to its corresponding stdout and stdin.

```javascript
#!/usr/bin/env node

var child = require('child_process');

var myREPL = child.spawn('node');

myREPL.stdout.pipe(process.stdout, { end: false });

process.stdin.resume();

process.stdin.pipe(myREPL.stdin, { end: false });

myREPL.stdin.on('end', function() {
  process.stdout.write('REPL stream ended.');
});

myREPL.on('exit', function (code) {
  process.exit(code);
});
```

There you have it - spawn the Node.js REPL as a child process, and pipe your stdin and stdout to its stdin and stdout. Make sure to listen for the child's 'exit' event, too, or else your program will just hang there when the REPL exits.

Another use for `stream.pipe()` is file streams. In Node.js, `fs.createReadStream()` and `fs.createWriteStream()` are used to create a stream to an open file descriptor. Now let's look at how one might use `stream.pipe()` to write to a file. You'll probably recognize most of the code:

```javascript
#!/usr/bin/env node

var child = require('child_process'),
    fs = require('fs');

var myREPL = child.spawn('node'),
    myFile = fs.createWriteStream('myOutput.txt');

myREPL.stdout.pipe(process.stdout, { end: false });
myREPL.stdout.pipe(myFile);

process.stdin.resume();

process.stdin.pipe(myREPL.stdin, { end: false });
process.stdin.pipe(myFile);

myREPL.stdin.on("end", function() {
  process.stdout.write("REPL stream ended.");
});

myREPL.on('exit', function (code) {
  process.exit(code);
});
```

With those small additions, your stdin and the stdout from your REPL will both be piped to the writeable file stream you opened to 'myOutput.txt'. It's that simple - you can pipe streams to as many places as you want.

Another very important use case for `stream.pipe()` is with HTTP request and response objects. Here we have the very simplest kind of proxy:

```javascript
#!/usr/bin/env node

var http = require('http');

http.createServer(function(request, response) {
  var proxy = http.createClient(9000, 'localhost')
  var proxyRequest = proxy.request(request.method, request.url, request.headers);
  proxyRequest.on('response', function (proxyResponse) {
    proxyResponse.pipe(response);
  });
  request.pipe(proxyRequest);
}).listen(8080);

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to port 9000!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);
```

One could also use `stream.pipe()` to send incoming requests to a file for logging, or to a child process, or any one of a number of other things.

Hopefully this has shown you the basics of using `stream.pipe()` to easily pass your data streams around. It's truly a powerful little trick in Node.js, and its uses are yours to explore. Happy coding, and try not to cross your streams!
