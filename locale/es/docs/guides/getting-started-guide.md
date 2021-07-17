---
title: Getting Started Guide
layout: docs.hbs
---

# ¿Cómo comenzar en Node.js después de la instalación?

Ahora que hemos instalado Node.js, vamos a construir nuestro primer servidor web. Crea un archivo llamado `app.js` que tenga el siguiente contenido:

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

Ahora, ejecuta tu servidor web usando `node app.js`. Visita `http://localhost:3000` y verás un mensaje diciendo "Hola Mundo".

Visita la [Introduction to Node.js](https://nodejs.dev/) para obtener una guía más completa de como comenzar en Node.js.
