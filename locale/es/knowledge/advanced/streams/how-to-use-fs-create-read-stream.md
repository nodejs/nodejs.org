---
title: How to use fs.createReadStream?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
  - fs
difficulty: 3
layout: knowledge-post.hbs
---

The function `fs.createReadStream()` allows you to open up a readable stream in a very simple manner. All you have to do is pass the path of the file to start streaming in. It turns out that the response (as well as the request) objects are streams. So we will use this fact to create a http server that streams the files to the client. Since the code is simple enough, it is pretty easy just to read through it and comment why each line is necessary.

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  // The filename is simple the local directory and tacks on the requested url
  var filename = __dirname+req.url;

  // This line opens the file as a readable stream
  var readStream = fs.createReadStream(filename);

  // This will wait until we know the readable stream is actually valid before piping
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });

  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    res.end(err);
  });
}).listen(8080);
```
