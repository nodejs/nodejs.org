---
title: Comment servir des fichiers statiques ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

Une nécessité de base pour la plupart des [serveurs http](/fr/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/) est d'être capable de servir des fichiers statiques. Heureusement, ce n'est pas si difficile à faire avec Node.js. D'abord, vous [lisez le fichier](/fr/connaissance/file-system/how-to-read-files-in-nodejs/), puis vous servez le fichier. Voici un exemple de script qui servira les fichiers dans le répertoire actuel :

```javascript
var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);
```

Cet exemple prend le chemin demandé et sert ce chemin, relatif au répertoire local. Cela fonctionne bien comme solution rapide, mais cette approche pose quelques problèmes. Tout d'abord, ce code ne gère pas correctement les types MIME. De plus, un serveur de fichiers statiques correct devrait vraiment tirer parti de la mise en cache côté client et envoyer une réponse "Not Modified" si rien n'a été modifié. De plus, il existe des bogues de sécurité qui peuvent permettre à un utilisateur malveillant de sortir du répertoire courant. (par exemple, `GET /../../../`).

Chacun de ces problèmes peut être résolu individuellement sans grande difficulté. Vous pouvez envoyer le bon en-tête de type MIME. Vous pouvez comprendre comment utiliser les caches des clients. Vous pouvez tirer parti de `path.normalize` pour vous assurer que les requêtes ne sortent pas du répertoire courant. Mais pourquoi écrire tout ce code quand vous pouvez simplement utiliser la bibliothèque de quelqu'un d'autre ?

Il existe un bon serveur de fichiers statiques appelé [node-static](https://github.com/cloudhead/node-static) écrit par Alexis Sellier dont vous pouvez tirer parti. Voici un script qui fonctionne de manière similaire au précédent :

```javascript
var static = require('node-static');
var http = require('http');

var file = new(static.Server)();

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8080);
```

Il s'agit d'un serveur de fichiers entièrement fonctionnel qui ne présente aucun des bogues mentionnés précédemment. Il s'agit juste de la configuration de base, il y a plus de choses que vous pouvez faire si vous regardez [l'api](https://github.com/cloudhead/node-static). De plus, comme il s'agit d'un projet open source, vous pouvez toujours le modifier selon vos besoins (et n'hésitez pas à contribuer au projet !).
