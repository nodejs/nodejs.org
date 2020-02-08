---
layout: about.hbs
title: A propos
trademark: Trademark
---

# A propos de Node.js®

En tant qu'environnement d'exécution JavaScript asynchrone et orienté événement, Node.js est conçu
pour générer des applications extensibles. Dans cet exemple ("hello world"), plusieures connexions peuvent être gérées de manière concurrente.
À chaque connexion, la fonction de rappel (_callback function_) est déclenchée, mais si il n'y a rien à faire, Node.js restera inactif.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Ceci contraste avec le modèle de concurrence plus commun dans lequel les processus sytème
sont utilisés. La gestion réseau basée sur les processus est relativement
inefficace et difficile à utiliser. De plus, les utilisateurs de Node.js n'ont pas à se soucier des problèmes d'interblocage des processus
puisqu'il n'y a pas de verrouillage. Aucune fonction de Node.js ou presque
n'effectue d'entrée/sortie, donc le processus ne se bloque pas. Et comme rien
n'est bloquant, développer un système extensible est relativement aisé avec Node.js.

Si une partie des termes utilisés ne vous sont pas familliers, voici
un article complet (en anglais) [Bloquant vs Non-Bloquant][].

---

Node.js est conçu de manière similaire et influencé par des
librairies comme [Event Machine][] (en) pour Ruby et [Twisted][] (en) pour Python.
Node.js pousse le modèle événementiel encore plus loin. Il instaure la
[boucle événementielle][] (en) en tant que composant élémentaire de l'environnement d'exécution
et non comme une librairie. Dans les autres systèmes, il y a toujours
un appel bloquant pour démarrer la boucle événementielle.
Le comportement est défini habituellement par des fonctions de rappel au
début du script, et à la fin un serveur est démarré avec un appel bloquant
comme `EventMachine::run()`. Dans Node.js, il n'y a pas d'appel pour démarrer la boucle.
Node.js entre simplement dans la boucle après avoir exécuté le script d'entrée.
Node.js sort de la boucle événementielle lorsqu'il n'y a plus de fonction
de rappel à exécuter. Ce comportement est similaire à celui de JavaScript
dans un navigateur - la boucle événementielle est cachée à l'utilisateur.

HTTP a une place prépondérante dans Node.js, qui a été conçu pour le streaming
et une faible latence. Ceci fait de Node.js une base toute désignée pour une librairie web ou un framework.

Et si Node.js a été conçu sans processus multiples, vous pouvez tout de même
profiter d'un environnement multi-coeur. Vous pouvez générer des processus
enfant par le biais de l'API [`child_process.fork()`][] (en), avec lesquels
vous pourrez communiquer facilement. Basé sur la même interface, le
 module
 [`cluster`][] (en) vous permettra de partager les sockets entre vos processus
 pour faire de la répartition de charge entre vos coeurs.

[Bloquant vs Non-Bloquant]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[boucle événementielle]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
