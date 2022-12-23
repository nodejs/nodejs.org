---
title: Les modules intégrés dans Node.js
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - globals
difficulty: 1
layout: knowledge-post.hbs
---

Node.js possède un certain nombre d'identifiants globaux intégrés avec lesquels tout développeur Node.js devrait être familiarisé. Certains d'entre eux sont de véritables globaux, visibles partout ; d'autres existent au niveau du module, mais sont inhérents à chaque module, et sont donc des pseudo globaux.

Tout d'abord, passons en revue la liste des "vrais globaux" :

* `global` - L'espace de nom global. Mettre une propriété dans cet espace de noms la rend globalement visible dans le processus en cours.
* `process` - Le module `process` intégré à Node.js, qui fournit une interaction avec le processus Node.js en cours. [Lire la suite](/fr/knowledge/getting-started/the-process-module/)
* `console` - Le module `console` intégré à Node.js, qui enveloppe diverses fonctionnalités STDIO d'une manière semblable à un navigateur. [Lire la suite](/fr/knowledge/getting-started/the-console-module/)
* `setTimeout()`, `clearTimeout()`, `setInterval()`, `clearInterval()` - Les fonctions de temporisation intégrées sont des globales. [Lire la suite](/fr/knowledge/javascript-conventions/what-are-the-built-in-timer-functions/)

Comme mentionné ci-dessus, il existe également un certain nombre de "pseudo-globals" inclus au niveau du module dans chaque module :

* `module`, `module.exports`, `exports` - Ces objets se rapportent tous au système de modules de Node.js. (/fr/knowledge/getting-started/what-is-require/)
* `__filename` - Le mot-clé `__filename` contient le chemin du fichier en cours d'exécution. Notez qu'il n'est pas défini lors de l'exécution du [Node.js REPL](/fr/knowledge/REPL/how-to-use-nodejs-repl/).
* `__dirname` - Comme `__filename`, le mot-clé `__dirname` contient le chemin vers le répertoire racine du script en cours d'exécution. Il n'est pas non plus présent dans le REPL de Node.js.
* `require()` - La fonction `require()` est une fonction intégrée, exposée par module, qui permet d'inclure d'autres modules valides. [Lire la suite](/fr/knowledge/getting-started/what-is-require/)

Une grande partie de cette fonctionnalité peut être extrêmement utile dans la vie quotidienne d'un développeur Node.js - mais au moins, retenez ces noms comme de mauvais noms à utiliser pour vos propres fonctions !
