---
title: Comment utiliser fs.createWriteStream ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
  - fs
difficulty: 3
layout: knowledge-post.hbs
---

La fonction `fs.createWriteStream()` crée un flux inscriptible d'une manière très simple. Après un appel à `fs.createWriteStream()` avec le chemin du fichier, vous avez un flux inscriptible avec lequel travailler. Il s'avère que les objets réponses (ainsi que les objets requêtes) sont des flux. Nous allons donc envoyer les données `POST` vers le fichier `output`. Comme le code est assez simple, il est assez facile de le lire et de commenter pourquoi chaque ligne est nécessaire.

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  // Cela ouvre le flux d'écriture vers `output`.
  var writeStream = fs.createWriteStream('./output');

  // Ceci achemine les données POST vers le fichier.
  req.pipe(writeStream);

  // Après la sauvegarde de toutes les données, répondez par un simple formulaire html pour qu'ils puissent envoyer d'autres données.
  req.on('end', function () {
    res.writeHead(200, {"content-type":"text/html"});
    res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
  });

  // Ceci est ici au cas où des erreurs se produiraient
  writeStream.on('error', function (err) {
    console.log(err);
  });
}).listen(8080);
```
