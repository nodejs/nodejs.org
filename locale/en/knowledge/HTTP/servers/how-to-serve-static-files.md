---
title: How to serve static files
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

A basic necessity for most [http servers](/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/) is to be able to serve static files. Thankfully, it is not that hard to do in Node.js. First you [read the file](/en/knowledge/file-system/how-to-read-files-in-nodejs/), then you serve the file. Here is an example of a script that will serve the files in the current directory:

```javascript
var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);
```

This example takes the path requested and it serves that path, relative to the local directory. This works fine as a quick solution; however, there are a few problems with this approach. First, this code does not correctly handle mime types. Additionally, a proper static file server should really be taking advantage of client side caching, and should send a "Not Modified" response if nothing has changed. Furthermore, there are security bugs that can enable a malicious user to break out of the current directory. (for example, `GET /../../../`).

Each of these can be addressed invidually without much difficulty. You can send the proper mime type header. You can figure how to utilize the client caches. You can take advantage of `path.normalize` to make sure that requests don't break out of the current directory. But why write all that code when you can just use someone else's library?

There is a good static file server called [node-static](https://github.com/cloudhead/node-static) written by Alexis Sellier which you can leverage. Here is a script which functions similarly to the previous one:

```javascript
var static = require('node-static');
var http = require('http');

var file = new(static.Server)(__dirname);

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8080);
```

This is a fully functional file server that doesn't have any of the bugs previously mentioned. This is just the most basic set up, there are more things you can do if you look at [the api](https://github.com/cloudhead/node-static). Also since it is an open source project, you can always modify it to your needs (and feel free to contribute back to the project!).
