---
title: Quel est l'objet de l'erreur ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

L'objet erreur est un objet intégré qui fournit un ensemble standard d'informations utiles lorsqu'une erreur se produit, comme une trace de la pile et le message d'erreur. Par exemple :

Code :

```javascript
var error = new Error("The error message");
console.log(error);
console.log(error.stack);
```

Résultat:

```
{ stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'The error message' }
Error: The error message
    at Object.<anonymous> (/home/nico/example.js:1:75)
    at Module._compile (module.js:407:26)
    at Object..js (module.js:413:10)
    at Module.load (module.js:339:31)
    at Function._load (module.js:298:12)
    at Array.0 (module.js:426:10)
    at EventEmitter._tickCallback (node.js:126:26)
```

`error.stack` vous montre d'où vient une erreur, ainsi qu'une liste des appels de fonction qui l'ont précédée - pour votre confort, `error.stack` imprime toujours `error.message` comme première ligne de sa sortie, ce qui fait de `error.stack` une propriété unique pratique à enregistrer pendant le débogage.

Si vous voulez ajouter plus d'informations à l'objet Error, vous pouvez toujours ajouter des propriétés, comme pour tout autre objet JavaScript :

```javascript
var error = new Error("The error message");
error.http_code = 404;
console.log(error);
```

Pour plus de détails sur l'utilisation de l'objet Error, consultez l'[article sur les conventions d'erreur](/fr/knowledge/errors/what-are-the-error-conventions/).
