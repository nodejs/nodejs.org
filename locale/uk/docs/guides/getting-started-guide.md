---
title: Getting Started Guide
layout: docs.hbs
---

# How do I start with Node.js after I installed it?

Once we have installed Node.js, let's build our first web server. Create a file named `app.js` containing the following contents:

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

Now, run your web server using `node app.js`. Visit `http://localhost:3000` and you will see a message saying "Hello World".

Refer to the [Introduction to Node.js](https://nodejs.dev/) for a more comprehensive guide to getting started with Node.js.
