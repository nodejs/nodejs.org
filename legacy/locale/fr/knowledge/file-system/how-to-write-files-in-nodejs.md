---
title: Comment écrire des fichiers avec Node.js ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - filesystem
difficulty: 2
layout: knowledge-post.hbs
---

L'écriture dans un fichier est une autre des tâches de programmation de base que l'on doit généralement connaître - heureusement, cette tâche est très simple dans Node.js. Heureusement, cette tâche est très simple dans Node.js. Nous pouvons utiliser la méthode pratique `writeFile` à l'intérieur du module `fs` de la bibliothèque standard, qui peut économiser toutes sortes de temps et de problèmes.

```javascript
fs = require('fs');
fs.writeFile(filename, data, [encoding], [callback])
```

`file = (string)` chemin du fichier à lire

`data = (string ou buffer)` les données que vous voulez écrire dans le fichier

`encoding = (chaîne optionnelle)` l'encodage des `data`. Les encodages possibles sont 'ascii', 'utf8', et 'base64'. Si aucun encodage n'est fourni, alors 'utf8' est supposé.

`callback = (optional function (err) {})` S'il n'y a pas d'erreur, `err === null`, sinon `err` contient le message d'erreur.

Donc si nous voulons écrire "Hello World" dans `helloworld.txt` :

```javascript
fs = require('fs');
fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});
```

```
[contents of helloworld.txt]:
Hello World!
```

Si nous voulons délibérément provoquer une erreur, nous pouvons essayer d'écrire dans un fichier auquel nous n'avons pas le droit d'accéder :

```javascript
fs = require('fs')
fs.writeFile('/etc/doesntexist', 'abc', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
```

```
{ stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'EACCES, Permission denied \'/etc/doesntexist\'',
  errno: 13,
  code: 'EACCES',
  path: '/etc/doesntexist' }
```
