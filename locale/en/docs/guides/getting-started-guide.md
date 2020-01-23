---
title: Getting Started Guide
layout: docs.hbs
---

# How do I start with Node.js after I installed it?

Once you have installed Node, let's try building our first web server.
Create a file named "app.js", and paste the following code:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

After that, run your web server using `node app.js`, visit `http://localhost:3000`, and you will see a message 'Hello World'
