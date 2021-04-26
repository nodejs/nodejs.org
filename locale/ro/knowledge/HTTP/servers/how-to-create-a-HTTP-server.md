---
title: How do I create a HTTP server?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

Making a simple HTTP server in Node.js has become the de facto 'hello world' for the platform. On the one hand, Node.js provides extremely easy-to-use HTTP APIs; on the other hand, a simple web server also serves as an excellent demonstration of the asynchronous strengths of Node.js.

Let's take a look at a very simple example:

```javascript
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
```

Save this in a file called `server.js` - run `node server.js`, and your program will hang there... it's waiting for connections to respond to, so you'll have to give it one if you want to see it do anything. Try opening up a browser, and typing `localhost:8080` into the location bar. If everything has been set up correctly, you should see your server saying hello!

Also, from your terminal you should be able to get the response using curl:

```
curl localhost:8080
```

Let's take a more in-depth look at what the above code is doing. First, a function is defined called `requestListener` that takes a request object and a response object as parameters.

The request object contains things such as the requested URL, but in this example we ignore it and always return "Hello World".

The response object is how we send the headers and contents of the response back to the user making the request. Here we return a 200 response code (signaling a successful response) with the body "Hello World". Other headers, such as `Content-type`, would also be set here.

Next, the `http.createServer` method creates a server that calls `requestListener` whenever a request comes in. The next line, `server.listen(8080)`, calls the `listen` method, which causes the server to wait for incoming requests on the specified port - 8080, in this case.

There you have it - your most basic Node.js HTTP server.
