---
title: Guide pour commencer
layout: docs.hbs
---

# Comment débuter avec Node.js aprés l'avoir installé?

Une fois Node.js installé, créons notre premier serveur web. Créons un fichier nommé `app.js` avec le contenu suivant:

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

Demarrons le serveur web en executant en ligne de commande `node app.js`. Ensuite pour voir le resultat, ouvrir le lien `http://localhost:3000` et voir le message "Hello World".

Consultez la page [Introduction to Node.js](https://nodejs.dev/) guide plus complet pour commencer avec Node.js.
