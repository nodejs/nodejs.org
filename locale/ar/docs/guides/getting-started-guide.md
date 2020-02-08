---
title: دليل البدء
layout: docs.hbs
---

# كيف أبدأ باستعمال الـ Node.js بعد أن قمت بتثبيته؟

بعد تثبيتك للـ Node، دعنا نجرب كيفية بناء أول خادوم ويب باستعماله.
قم بإنشاء ملف بإسم "app.js" و ألصق داخله الشفرة الآتية:

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

بعد ذلك، قم بتشغيل هذا الخادوم باستعمال الأمر `node app.js`، و قم بزيارة الرابط `http://localhost:3000` لترى رسالة مفادها 'Hello World'.
