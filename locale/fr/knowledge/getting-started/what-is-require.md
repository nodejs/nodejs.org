---
title: Qu'est-ce qui est nécessaire ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - core
  - globals
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

Node.js suit le système de modules CommonJS, et la fonction intégrée `require` est le moyen le plus simple d'inclure des modules qui existent dans des fichiers séparés. La fonctionnalité de base de `require` est qu'elle lit un fichier JavaScript, exécute le fichier, et ensuite retourne l'objet `exports`. Un exemple de module :

```javascript
console.log("evaluating example.js");

var invisible = function () {
  console.log("invisible");
}

exports.message = "hi";

exports.say = function () {
  console.log(exports.message);
}
```

Ainsi, si vous lancez `var exemple = require('./example.js')`, alors `example.js` sera évalué et `example` sera un objet égal à :

```
{
  message: "hi",
  say: [Function]
}
```

Si vous voulez définir l'objet exports à une fonction ou un nouvel objet, vous devez utiliser l'objet `module.exports`. Donc pour un exemple :

```javascript
module.exports = function () {
  console.log("hello world")
}

require('./example2.js')() //require itself and run the exports object
```

Si vous voulez définir l'objet exports à une fonction ou un nouvel objet, vous devez utiliser l'objet `module.exports`. Donc pour un exemple :

```
node> require('./example.js')
evaluating example.js
{ message: 'hi', say: [Function] }
node> require('./example.js')
{ message: 'hi', say: [Function] }
node> require('./example.js').message = "hey" //set the message to "hey"
'hey'
node> require('./example.js') //One might think that this "reloads" the file...
{ message: 'hey', say: [Function] } //...but the message is still "hey" because of the module cache.
```

Comme vous pouvez le voir ci-dessus, `example.js` est évalué la première fois, mais tous les appels ultérieurs à `require()` invoquent seulement le cache du module, plutôt que de relire le fichier. Comme nous l'avons vu plus haut, cela peut occasionnellement produire des effets secondaires.

Les règles d'où `require` trouve les fichiers peuvent être un peu complexes, mais une règle simple est que si le fichier ne commence pas par "./" ou "/", alors il est soit considéré comme un module de base (et le chemin local de Node.js est vérifié), ou une dépendance dans le dossier local `node_modules`. Si le fichier commence par "./", il est considéré comme un fichier relatif au fichier qui a appelé `require`. Si le fichier commence par "/", il est considéré comme un chemin absolu. NOTE : vous pouvez omettre ".js" et `require` l'ajoutera automatiquement si nécessaire. Pour des informations plus détaillées, voir [la doc officielle](https://nodejs.org/docs/v0.4.2/api/modules.html#all_Together...)

Une note supplémentaire : si le nom de fichier passé à `require` est en fait un répertoire, il cherchera d'abord `package.json` dans le répertoire et chargera le fichier référencé dans la propriété `main`. Sinon, il cherchera un `index.js`.
