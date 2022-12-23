---
title: Qu'est-ce que les callbacks ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - javascript
  - core
  - asynchronous
  - callbacks
difficulty: 1
layout: knowledge-post.hbs
---

Dans un programme synchrone, vous écrirez quelque chose du genre :

```javascript
function processData () {
  var data = fetchData ();
  data += 1;
  return data;
}
```

Cela fonctionne très bien et est très typique dans d'autres environnements de développement. Cependant, si fetchData prend beaucoup de temps pour charger les données (peut-être qu'il les diffuse à partir du disque dur ou d'Internet), le programme entier se " bloque " - autrement dit, il reste immobile et attend - jusqu'à ce qu'il charge les données. Node.js, étant une plateforme asynchrone, n'attend pas que des choses comme les E/S de fichiers se terminent - Node.js utilise des callbacks. Un callback est une fonction appelée à la fin d'une tâche donnée ; cela évite tout blocage et permet d'exécuter d'autres codes pendant ce temps.

La façon dont Node.js gère ce qui précède ressemblerait un peu plus à ceci :

```javascript
function processData (callback) {
  fetchData(function (err, data) {
    if (err) {
      console.log("An error has occurred. Abort everything!");
      return callback(err);
    }
    data += 1;
    callback(data);
  });
}
```

À première vue, cela peut sembler inutilement compliqué, mais les callbacks sont la base de Node.js. Les callbacks vous donnent une interface avec laquelle vous pouvez dire "et quand vous avez fini de faire ça, faites tout ça". Cela vous permet d'avoir autant d'opérations d'entrée/sortie que votre système d'exploitation peut en gérer en même temps. même moment. Par exemple, dans un serveur web avec des centaines ou des milliers de requêtes en attente et plusieurs requêtes bloquantes, l'exécution asynchrone des requêtes bloquantes vous permet de continuer à travailler et de ne pas rester assis à attendre que les opérations bloquantes reviennent. Il s'agit d'une amélioration majeure.

La convention typique avec les fonctions asynchrones (ce que presque toutes vos fonctions devraient être) :

```javascript
function asyncOperation ( a, b, c, callback ) {
  // ... Beaucoup de travail...
  if ( /* Une erreur survient */ ) {
    return callback(new Error("An error has occurred"));
  }
  // ... Plus de travail ...
  callback(null, d, e, f);
}

asyncOperation ( params.., function ( err, returnValues.. ) {
  //Ce code est exécuté après l'exécution de l'opération asynchrone.
});
```

Vous voudrez presque toujours suivre la [convention de rappel d'erreur](/fr/knowledge/errors/what-are-the-error-conventions/), puisque la plupart des utilisateurs de Node.js s'attendront à ce que votre projet les suive. L'idée générale est que le callback est le dernier paramètre. Le callback est appelé après que la fonction ait terminé toutes ses opérations. Traditionnellement, le premier paramètre du callback est la valeur `error`. Si la fonction rencontre une erreur, alors elle appelle généralement la callback avec comme premier paramètre un objet Error. Si elle se termine proprement, alors elle appellera la callback avec le premier paramètre étant null et le reste étant la ou les valeurs de retour.
