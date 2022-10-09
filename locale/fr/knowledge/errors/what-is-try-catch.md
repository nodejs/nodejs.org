---
title: Qu'est-ce que try-catch ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

Exemple :

```javascript
console.log("entering try-catch statement");

try {
  console.log("entering try block");
  throw "thrown message";
  console.log("this message is never seen");
}
catch (e) {
  console.log("entering catch block");
  console.log(e);
  console.log("leaving catch block");
}
finally {
  console.log("entering and leaving the finally block");
}

console.log("leaving try-catch statement");
```

Résultat:

```
entering try-catch statement
entering try block
entering catch block
thrown message
leaving catch block
entering and leaving the finally block
leaving try-catch statement
```

L'instruction `try-catch-finally` de JavaScript fonctionne de manière très similaire à l'instruction `try-catch-finally` rencontrée en C++ et Java. Tout d'abord, le bloc d'essai est exécuté jusqu'à ce que et à moins que le code qu'il contient ne lève une exception (qu'il s'agisse d'une instruction explicite `throw`, que le code ait une exception native non capturée ou que le code appelle une fonction qui utilise `throw`).

Si le code ne lève pas d'exception, alors tout le bloc d'essai est exécuté. Si le code lève une exception à l'intérieur du bloc try, alors le bloc catch est exécuté. Enfin, le bloc finally est toujours exécuté, après les autres blocs mais avant tout autre code situé en dehors des blocs `try-catch-finally`. Le bloc `finally` s'exécutera presque toujours, quel que soit le type de lancer, d'attraper ou de retourner que l'on essaie de faire dans les blocs `try` ou `catch`.

Notez que vous pouvez omettre le bloc `catch` ou `finally`, mais l'un des deux doit être présent.

## Mais attendez, n'est-ce pas une convention Node.js de ne pas utiliser try-catch ?

Dans les bibliothèques Node.js de base, le seul endroit où l'on a vraiment *besoin* d'utiliser un try-catch est autour de `JSON.parse()`. Toutes les autres méthodes utilisent soit l'objet standard Error comme premier paramètre du callback, soit émettent un événement `error`. Pour cette raison, il est généralement considéré comme [standard](/fr/knowledge/errors/what-are-the-error-conventions/) de retourner les erreurs via le callback plutôt que d'utiliser l'instruction `throw`.
