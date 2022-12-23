---
title: Comment écrire du code asynchrone ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - asynchronous
  - callbacks
  - event-emitters
difficulty: 1
layout: knowledge-post.hbs
---

Node.js encourage un style de codage asynchrone dès le départ, contrairement à la plupart des frameworks web les plus populaires. Il y a un certain nombre de choses importantes dont il faut être conscient lorsqu'on apprend à écrire du code asynchrone - sinon, vous trouverez souvent votre code s'exécutant de manière extrêmement inattendue. Prenez cette règle (générale) à cœur :

### Utilisez les fonctions asynchrones, évitez les fonctions synchrones !

De nombreuses fonctions du noyau de Node.js ont des versions synchrones et asynchrones. Dans la plupart des cas, il est préférable pour vous d'utiliser les fonctions asynchrones - sinon, pourquoi utiliser Node.js ?

Comme un exemple rapide comparant et contrastant les deux, en utilisant `fs.readFile` :

```javascript
var fs = require('fs');

fs.readFile('example.file', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

//====================

var data = fs.readFileSync('example.file','utf8');
console.log(data);
```

En regardant simplement ces deux blocs de code, la version synchrone semble être plus concise. Cependant, la version asynchrone est plus compliquée pour une très bonne raison. Dans la version synchrone, le monde est mis en pause jusqu'à ce que la lecture du fichier soit terminée - votre processus restera là, à attendre l'OS (qui gère toutes les tâches du système de fichiers).

La version asynchrone, en revanche, n'arrête pas le temps. Au lieu de cela, la fonction de rappel est appelée lorsque la lecture du fichier est terminée. Cela laisse votre processus libre d'exécuter d'autres codes pendant ce temps.

Lorsque vous ne lisez qu'un ou deux fichiers ou que vous enregistrez rapidement quelque chose, la différence entre les E/S de fichiers synchrones et asynchrones peut être assez faible. D'un autre côté, si vous recevez plusieurs requêtes par seconde qui nécessitent des entrées/sorties de fichiers ou de bases de données, essayer d'effectuer ces entrées/sorties de manière synchrone serait tout à fait désastreux pour les performances.

### Callbacks
Les callbacks sont un idiome de base dans Node.js pour les opérations asynchrones. Quand la plupart des gens parlent de callbacks, ils veulent dire la fonction qui est passée comme dernier paramètre à une fonction asynchrone. Le callback est ensuite appelé plus tard avec toute valeur de retour ou message d'erreur que la fonction a produit. Pour plus de détails, voir l'article sur les [callbacks](/fr/connaissance/démarrage/control-flow/what-are-callbacks/).

### Emetteurs d'événements
Les émetteurs d'événements sont un autre idiome de base dans Node.js. Un constructeur est fourni dans le noyau de Node.js : `require('events').EventEmitter`. Un Event Emitter est typiquement utilisé quand il y aura plusieurs parties à la réponse (puisque généralement vous voulez seulement appeler un callback une fois). Pour plus de détails, voir l'article sur les [EventEmitters](/fr/knowledge/getting-started/control-flow/what-are-event-emitters/)

#### Une erreur avec le code asynchrone
Une erreur courante dans le code asynchrone avec JavaScript est d'écrire du code qui fait quelque chose comme ceci :

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i);
}
```

La sortie inattendue est alors :

```
5
5
5
5
5
```

La raison pour laquelle cela se produit est que chaque timeout est créé et que `i` est incrémenté. Ensuite, lorsque le callback est appelé, il cherche la valeur de `i` et c'est 5. La solution est de créer une fermeture pour que la valeur actuelle de `i` soit stockée. Par exemple :

```javascript
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function () {
      console.log(i);
    }, i);
  })(i);
}
```

Cela donne la bonne sortie :

```
0
1
2
3
4
```
