---
title: Comment lire des fichiers dans Node.js ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - filesystem
difficulty: 2
layout: knowledge-post.hbs
---

Lire le contenu d'un fichier en mémoire est une tâche de programmation très courante, et, comme pour beaucoup d'autres choses, l'API de base de Node.js fournit des méthodes pour rendre cela trivial. Il y a une variété de méthodes de système de fichiers, toutes contenues dans le module `fs`. La façon la plus simple de lire le contenu entier d'un fichier est avec `fs.readFile`, comme suit :

```javascript
fs = require('fs');
fs.readFile(file, [encoding], [callback]);

// file = (string) chemin du fichier à lire
```

`encoding` est un paramètre optionnel qui spécifie le type d'encodage pour lire le fichier. Les encodages possibles sont 'ascii', 'utf8', et 'base64'. Si aucun encodage n'est fourni, la valeur par défaut est `null`.

`callback` est une fonction à appeler lorsque le fichier a été lu et que son contenu est prêt - on lui passe deux arguments, `error` et `data`. S'il n'y a pas d'erreur, `error` sera `null` et `data` contiendra le contenu du fichier ; sinon `err` contient le message d'erreur.

Donc, si nous voulons lire `/etc/hosts` et l'imprimer sur stdout (comme Unix `cat`) :

```javascript
fs = require('fs')
fs.readFile('/etc/hosts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
```

Le contenu de `/etc/hosts` devrait maintenant être visible pour vous, à condition que vous ayez la permission de lire le fichier en premier lieu.

Voyons maintenant un exemple de ce qui se passe lorsque vous essayez de lire un fichier invalide - l'exemple le plus simple est un fichier qui n'existe pas.

```javascript
fs = require('fs');
fs.readFile('/doesnt/exist', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
```

Voici la sortie :

```
{ stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'ENOENT, No such file or directory \'/doesnt/exist\'',
  errno: 2,
  code: 'ENOENT',
  path: '/doesnt/exist' }
```

Il s'agit d'un [objet d'erreur] de base de Node.js (/fr/knowledge/errors/what-is-the-error-object/) - il peut souvent être utile d'enregistrer directement `err.stack`, car il contient une trace de la pile à l'endroit du code où l'objet d'erreur a été créé.
