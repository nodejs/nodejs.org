---
title: Comment créer et utiliser un REPL personnalisé ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - repl
difficulty: 2
layout: knowledge-post.hbs
---

Node.js permet aux utilisateurs de créer leurs propres REPLs avec le module [repl] (https://nodejs.org/api/repl.html). Son utilisation de base ressemble à ceci :

```js
const repl = require('repl');

repl.start(prompt, stream);
```

Ci-dessus, `prompt` est une chaîne qui est utilisée pour l'invite de votre REPL (qui par défaut est "> ") et `stream` est le flux sur lequel le repl écoute, par défaut `process.stdin`. Quand vous lancez le REPL autonome `node` à partir de l'invite de commande, ce qu'il fait en arrière-plan est de lancer `repl.start()` pour vous donner le REPL standard.

Cependant, le repl est assez flexible. Voici un exemple qui le montre :

```js
#!/usr/bin/env node

const net = require('net');
const repl = require('repl');

const mood = function () {
  const m = ['^__^', '-___-;', '>.<', '<_>'];
  return m[Math.floor(Math.random() * m.length)];
};

// Un nœud distant repl auquel vous pouvez vous connecter par telnet !
net
  .createServer(function (socket) {
    const remote = repl.start('node::remote> ', socket);
    // Ajout de "mood" et "bonus" au contexte du REPL distant.
    remote.context.mood = mood;
    remote.context.bonus = 'UNLOCKED';
  })
  .listen(5001);

console.log('Remote REPL started on port 5001.');

// Un noeud "local" repl avec une invite personnalisée
const local = repl.start('node::local> ');

// Exposition de la fonction "mood" au contexte local du REPL.
local.context.mood = mood;
```

Ce script crée *deux* REPLs : L'un est normal à l'exception de son invite personnalisée, mais l'autre est exposé via le module net pour que vous puissiez y accéder par telnet ! De plus, il utilise la propriété `context` pour exposer la fonction "mood" aux deux REPLs, et la chaîne "bonus" au REPL distant seulement. Comme vous le verrez, cette approche consistant à exposer des objets à un REPL et pas à l'autre *ne fonctionne pas vraiment*.

De plus, tous les objets de la portée globale seront également accessibles à vos REPLs.

Voici ce qui se passe lorsque vous exécutez le script :

```shell
$ node repl.js
Remote REPL started on port 5001.
node::local> .exit
# <ctrl>-C

$ node repl.js
Remote REPL started on port 5001.
node::local> mood()
'^__^'
node::local> bonus
ReferenceError: bonus is not defined
```

Comme on peut le voir, la fonction `mood` est utilisable dans le REPL local, mais la chaîne `bonus` ne l'est pas. C'est comme prévu.

Maintenant, voici ce qui se passe lorsque vous essayez de vous connecter au port 5001 :

```shell
$ telnet localhost 5001
Trying ::1...
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
node::remote> mood()
'>.<'
node::remote> bonus
'UNLOCKED'
```

Comme vous pouvez le voir, la fonction `mood` est *aussi* disponible sur telnet ! De plus, "bonus" l'est aussi.

Comme une conséquence intéressante de mes actions, bonus est maintenant aussi défini sur le REPL local :

```shell
node::local> bonus
'UNLOCKED'
```

Il semble que nous ayons "débloqué" la chaîne `bonus` sur le REPL local également. Il s'avère que toutes les variables créées dans un REPL sont également disponibles dans l'autre :

```shell
node::local> var node = "AWESOME!"

node::remote> node
'AWESOME!'
```

Comme vous pouvez le constater, le REPL de node est puissant et flexible.
