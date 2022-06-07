---
title: Comment gérer les données de formulaires multipartites ?
date: '2011-09-09T10:08:50.000Z'
tags:
  - http
  - forms
  - multipart
  - uploads
difficulty: 3
layout: knowledge-post.hbs
---

La gestion correcte des données de formulaire et des téléchargements de fichiers est un problème important et complexe pour les serveurs HTTP. Le faire à la main impliquerait d'analyser des données binaires en continu, de les écrire sur le système de fichiers, d'analyser d'autres données de formulaire, et plusieurs autres problèmes complexes - heureusement, seules quelques personnes auront besoin de s'en préoccuper à ce niveau. Felix Geisendorfer, l'un des committers de Node.js core, a écrit une bibliothèque appelée `node-formidable` qui gère toutes les parties difficiles pour vous. Grâce à son API conviviale, vous pouvez analyser des formulaires et recevoir des téléchargements de fichiers en un rien de temps.

Cet exemple est pris directement de la page GitHub de `node-formidable`, avec quelques explications supplémentaires ajoutées.

```javascript
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {

  // Cette instruction if est là pour capter les soumissions de formulaires et lancer l'analyse des données des formulaires multipartites.

  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {

    // Instantiate a new formidable form for processing.

    var form = new formidable.IncomingForm();

    // form.parse analyse les données du flux entrant, en distinguant les différents champs et fichiers pour vous.

    form.parse(req, function(err, fields, files) {
      if (err) {

        //Vérifiez et traitez les erreurs éventuelles ici.

        console.error(err.message);
        return;
      }
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');

      // Cette dernière ligne répond à la soumission du formulaire avec une liste des données et des fichiers analysés.

      res.end(util.inspect({fields: fields, files: files}));
    });
    return;
  }

  // S'il s'agit d'une demande normale, et non d'une soumission de formulaire, envoyez le formulaire.

  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);
```

Essayez-le par vous-même - c'est définitivement la solution la plus simple, et `node-formidable` est une bibliothèque aguerrie, prête pour la production. Laissez userland résoudre des problèmes comme celui-ci pour vous, afin que vous puissiez vous remettre à écrire le reste de votre code !
