---
title: Comment rechercher des fichiers et des répertoires ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

Supposons que vous vouliez lister tous les fichiers dans le répertoire courant. Une approche consiste à utiliser la méthode `fs.readdir` intégrée (/fr/knowledge/file-system/how-to-read-files-in-nodejs/). Cela vous donnera un tableau de tous les fichiers et répertoires du chemin spécifié :

```javascript
fs = require('fs');

fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
});
```

Malheureusement, si vous voulez faire une liste récursive de fichiers, alors les choses deviennent très vite beaucoup plus compliquées. Pour éviter toute cette complexité effrayante, c'est l'un des endroits où une bibliothèque Node.js user-land peut sauver la journée. [Node-findit](https://github.com/substack/node-findit), par SubStack, est un module d'aide pour faciliter la recherche de fichiers. Il possède des interfaces pour vous permettre de travailler avec des callbacks, des événements, ou tout simplement de manière synchrone (ce qui n'est pas une bonne idée la plupart du temps).

Pour installer `node-findit`, utilisez simplement npm :

```
npm install findit
```

Dans le même dossier, créez un fichier appelé `example.js`, puis ajoutez ce code. Exécutez-le avec `node example.js`. Cet exemple utilise l'interface événementielle `node-findit`.

```javascript
//Ceci configure le chercheur de fichiers
var finder = require('findit').find(__dirname);

//Ceci écoute les répertoires trouvés
finder.on('directory', function (dir) {
  console.log('Directory: ' + dir + '/');
});

//This listens for files found
finder.on('file', function (file) {
  console.log('File: ' + file);
});
```
