---
title: Guide de démarrage
layout: docs.hbs
---

# Comment commencer à utiliser Node.js après l'avoir installé ?

Une fois que nous avons installé Node.js, construisons notre premier serveur web.
Créez un fichier nommé `app.js` contenant le contenu suivant :

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

Maintenant, lancez votre serveur web en utilisant `node app.js`. Visitez `http://localhost:3000` et vous verrez un message disant "Hello World".

Reportez-vous à [Introduction a Node.js](https://nodejs.dev/fr/learn/) pour un guide plus complet sur les débuts avec Node.js.
