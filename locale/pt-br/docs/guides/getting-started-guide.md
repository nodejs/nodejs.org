---
title: Guia: iniciando
layout: docs.hbs
---

# Como eu começo com Node.js depois de instalá-lo?

Uma ves instalado o Node.js, vamos começar nosso primeiro web server.

Crie um arquivo chamado `app.js` com o conteúdo abaixo:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá mundo!');
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
```

Agora execute seu web server usando o comando `node app.js`. Visite o endereço `http://localhost:3000`, então você verá a mensagem "Olá mundo!".


Consulte [Introduction to Node.js](https://nodejs.dev/) para um guia mais claro sobre como começar com Node.js
