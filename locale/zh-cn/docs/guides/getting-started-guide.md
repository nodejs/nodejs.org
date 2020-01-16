---
title: 入门指南
layout: docs.hbs
---

# 在安装了 Node.js 之后，我怎么开始呢？

一旦你已经安装了 Node，让我们尝试构建第一个 Web 服务器。
请创建一个“app.js”文件，黏贴以下代码：

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

然后使用 `node app.js` 运行程序，访问 `http://localhost:3000`，你就会看到一个消息，写着“Hello World”。
