---
title: How to access query string parameters
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

In Node.js, functionality to aid in the accessing of URL query string parameters is built into the standard library. The built-in `url.parse` method takes care of most of the heavy lifting for us.  Here is an example script using this handy function and an explanation on how it works:

    var fs = require('fs');
    var http = require('http');
    var url = require('url') ;

    http.createServer(function (req, res) {
      var queryObject = url.parse(req.url,true).query;
      console.log(queryObject);

      res.writeHead(200);
      res.end('Feel free to add query parameters to the end of the url');
    }).listen(8080);

The key part of this whole script is this line: `var queryObject = url.parse(req.url,true).query;`. Let's take a look at things from the inside-out.  First off, `req.url` will look like `/app.js?foo=bad&baz=foo`. This is the part that is in the URL bar of the browser. Next, it gets passed to `url.parse` which parses out the various elements of the URL (NOTE: the second paramater is a boolean stating whether the method should parse the query string, so we set it to true). Finally, we access the `.query` property, which returns us a nice, friendly JavaScript object with our query string data. 


