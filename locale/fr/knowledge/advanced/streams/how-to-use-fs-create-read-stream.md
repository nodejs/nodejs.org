---
title: Comment utilsier fs.createReadStream ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
  - fs
difficulty: 3
layout: knowledge-post.hbs
---

La fonction `fs.createReadStream()` vous permet d'ouvrir un flux lisible d'une manière très simple. Tout ce que vous avez à faire, c'est de passer le chemin du fichier à lire en continu. Il s'avère que les objets réponse (ainsi que les objets requête) sont des flux. Nous allons donc utiliser ce fait pour créer un serveur http qui transmet les fichiers en continu au client. Comme le code est assez simple, il est assez facile de le lire et de commenter pourquoi chaque ligne est nécessaire.

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  // Le nom du fichier est un simple répertoire local et ajoute l'url demandée.
  var filename = __dirname+req.url;

  // Cette ligne ouvre le fichier en tant que flux lisible.
  var readStream = fs.createReadStream(filename);

  // Ceci attendra que nous sachions que le flux lisible est réellement valide avant de le transmettre.
  readStream.on('open', function () {
    // Cela permet simplement de transmettre le flux de lecture à l'objet de réponse (qui est envoyé au client).
    readStream.pipe(res);
  });

  // Cela permet de détecter toute erreur survenue lors de la création du flux lisible (généralement des noms invalides).
  readStream.on('error', function(err) {
    res.end(err);
  });
}).listen(8080);
```
