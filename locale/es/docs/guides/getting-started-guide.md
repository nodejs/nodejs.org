---
title: Guía de Inicio
layout: docs.hbs
---

# ¿Cómo empiezo con Node.js después de instalarlo?

Una vez que hayamos instalado Node.js, construyamos nuestro primer servidor web. Cree un archivo llamado `app.js` que contenga el siguiente contenido:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
```

Ahora, ejecute su servidor web usando `node app.js`. Visite `http://localhost:3000` y verá un mensaje que dice" Hola mundo ".

Consulte la [Introducción a Node.js](https://nodejs.dev/) para obtener una guía más completa para comenzar con Node.js.
