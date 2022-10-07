---
title: პირველი ნაბიჯები
layout: docs.hbs
---

# პირველი ნაბიჯები Node.js-ის ინსტალაციის შემდეგ

Node.js-ის ინსტალაციის შემდეგ, მოდით შევქმნათ ჩვენი პირველი ვებსერვერი.
შექმენით ფაილი სახელად `app.js` შემდეგი შიგთავსით:

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

ახლა გაუშვით თქვენი ვებსერვერი ბრძანებით `node app.js`. თქვენს ბრაუზერში გახსენით
მისამართი `http://localhost:3000` და თქვენ იხილავთ შეტყობინებას „Hello World“.

Node.js-ის საწყისებთან დაკავშირებით მეტად ამომწურავი ინფორმაციისათვის იხილეთ
შემდეგი გზამკვლევი: [შესავალი Node.js-ში](https://nodejs.dev/en/learn/).
