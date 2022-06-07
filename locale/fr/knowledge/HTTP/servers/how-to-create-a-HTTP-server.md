---
title: Comment créer un serveur HTTP ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

La mise en place d'un simple serveur HTTP avec Node.js est devenue de facto le "hello world" de la plateforme. D'une part, Node.js fournit des API HTTP extrêmement faciles à utiliser ; d'autre part, un simple serveur web sert également d'excellente démonstration des atouts asynchrones de Node.js.

Jetons un coup d'œil à un exemple très simple :

```javascript
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
```

Enregistrez ceci dans un fichier appelé `server.js` - lancez `node server.js`, et votre programme se figera là... il attend des connexions auxquelles répondre, donc vous devrez lui en donner une si vous voulez le voir faire quelque chose. Essayez d'ouvrir un navigateur, et tapez `localhost:8080` dans la barre d'adresse. Si tout a été configuré correctement, vous devriez voir votre serveur vous dire bonjour !

De plus, à partir de votre terminal, vous devriez être capable d'obtenir la réponse en utilisant curl :

```
curl localhost:8080
```

Regardons de plus près ce que fait le code ci-dessus. Tout d'abord, une fonction est définie, appelée `requestListener`, qui prend un objet requête et un objet réponse comme paramètres.

L'objet de requête contient des éléments tels que l'URL demandée, mais dans cet exemple, nous l'ignorons et retournons toujours "Hello World".

L'objet de réponse est la façon dont nous envoyons les en-têtes et le contenu de la réponse à l'utilisateur qui a fait la demande. Ici, nous renvoyons un code de réponse 200 (signalant une réponse réussie) avec le corps "Hello World". D'autres en-têtes, tels que `Content-type`, seront également définis ici.

Ensuite, la méthode `http.createServer` crée un serveur qui appelle `requestListener` dès qu'une requête arrive. La ligne suivante, `server.listen(8080)`, appelle la méthode `listen`, qui fait que le serveur attend les requêtes entrantes sur le port spécifié - 8080, dans ce cas.

Et voilà, vous avez votre serveur HTTP Node.js le plus basique.
