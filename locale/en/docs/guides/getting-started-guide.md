---
title: Getting Started Guide
layout: docs.hbs
---

# How do I start with Node.js after I installed it?

Once you have installed Node, let's try building our first web server\
Create a file named "app.js", and paste the following code:

```javascript
var http = require('http');

http.createServer((req, res) => {

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('Hello World!');

}).listen(8080);
```

After that, run your web server using ``` node app.js ```, visit http://localhost:8080, and you will see a message 'Hello World!'
