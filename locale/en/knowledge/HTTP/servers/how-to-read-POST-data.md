---
title: How can I read POST data?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

Reading the data from a POST request (i.e. a form submission) can be a little bit of a pitfall in Node.js, so we're going to go through an example of how to do it properly. The first step, obviously, is to listen for incoming data - the trick is to wait for the data to finish, so that you can process all the form data without losing anything.

Here is a quick script that shows you how to do exactly that:

```javascript
var http = require('http');
var postHTML =
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Input 1: <input name="input1"><br>' +
  'Input 2: <input name="input2"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
    res.writeHead(200);
    res.end(postHTML);
  });
}).listen(8080);
```

The variable `postHTML` is a static string containing the HTML for two input boxes and a submit box - this HTML is provided so that you can `POST` example data. This is NOT the right way to serve static HTML - please see [How to Serve Static Files](/en/knowledge/HTTP/servers/how-to-serve-static-files/) for a more proper example.

With the HTML out of the way, we [create a server](/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/) to listen for requests. It is important to note, when listening for POST data, that the `req` object is also an [Event Emitter](/en/knowledge/getting-started/control-flow/what-are-event-emitters/). `req`, therefore, will emit a `data` event whenever a 'chunk' of incoming data is received; when there is no more incoming data, the `end` event is emitted. So, in our case, we listen for `data` events. Once all the data is received, we log the data to the console and send the response.

Something important to note is that the event listeners are being added immediately after the request object is received. If you don't immediately set them, then there is a possibility of missing some of the events. If, for example, an event listener was attached from inside a callback, then the `data` and `end` events might be fired in the meantime with no listeners attached!

You can save this script to `server.js` and run it with `node server.js`. Once you run it you will notice that occasionally you will see lines with no data, e.g. `POSTed:`. This happens because regular `GET` requests go through the same codepath. In a more 'real-world' application, it would be proper practice to check the type of request and handle the different request types differently.
