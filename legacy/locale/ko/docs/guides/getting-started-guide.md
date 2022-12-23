---
title: 시작 가이드
layout: docs.hbs
---

<!-- # How do I start with Node.js after I installed it?

Once you have installed Node, let's try building our first web server.
Create a file named "app.js", and paste the following code: -->

# Node.js를 설치한 후 어떻게 시작할 수 있을까요?

Node를 설치했으면 우리의 첫 번째 웹 사이트를 구축해 봅시다.
"app.js"라는 이름의 파일을 만든 후 아래의 코드를 붙여넣으세요.

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

<!-- After that, run your web server using `node app.js`, visit `http://localhost:3000`, and you will see a message 'Hello World' -->
그런 다음 `node app.js`를 사용하여 웹 사이트를 실행한 후 `http://localhost:3000`을 방문하면 'Hello World'라는 메시지를 볼 수 있을 것입니다.
