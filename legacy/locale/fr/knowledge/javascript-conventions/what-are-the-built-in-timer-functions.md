---
title: Quelles sont les fonctions de la minuterie intégrée ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - builtin
  - globals
difficulty: 1
layout: knowledge-post.hbs
---

Il existe deux fonctions de temporisation intégrées les plus courantes, `setTimeout` et `setInterval`, qui peuvent être utilisées pour appeler une fonction à un moment ultérieur. Voici un exemple d'utilisation :

```js
setTimeout(function () {
  console.log("setTimeout: It's been one second!");
}, 1000);
setInterval(function () {
  console.log("setInterval: It's been one second!");
}, 1000);
```

Voici un exemple de sortie :

```bash
setTimeout: It's been one second!
setInterval: It's been one second!
setInterval: It's been one second!
setInterval: It's been one second!
setInterval: It's been one second!
...
```

Comme vous pouvez le constater, les paramètres sont identiques dans les deux cas. Le deuxième paramètre indique combien de temps en millisecondes il faut attendre avant d'appeler la fonction passée dans le premier paramètre. La différence entre les deux fonctions est que `setTimeout` n'appelle le callback qu'une seule fois alors que `setInterval` l'appellera encore et encore.

En général, il faut être prudent avec `setInterval` car il peut provoquer des effets indésirables. Si, par exemple, vous vouliez vous assurer que votre serveur est opérationnel en lui envoyant un ping toutes les secondes, vous pourriez essayer quelque chose comme ceci :

```js
setInterval(ping, 1000);
```

Cela peut toutefois poser des problèmes si votre serveur est lent et qu'il met, par exemple, 3 secondes à répondre à la première demande. Pendant le temps nécessaire à l'obtention de la réponse, vous auriez envoyé 3 autres demandes - ce qui n'est pas vraiment souhaitable ! Dans l'ensemble, cela n'a pas un grand impact lorsque vous servez de petits fichiers statiques. Mais si vous effectuez une opération coûteuse, comme une requête de base de données ou un calcul complexe, cela peut avoir des résultats indésirables. Une solution courante ressemble à ceci :

```js
const recursive = function () {
  console.log('It has been one second!');
  setTimeout(recursive, 1000);
};
recursive();
```

Comme vous pouvez le voir, elle fait un appel à la fonction `recursive` qui, lorsqu'elle se termine, fait un appel à `setTimeout(recursive, 1000)` qui lui fait appeler `recursive` à nouveau dans 1 seconde - ayant ainsi presque le même effet que setInterval tout en étant résilient aux erreurs involontaires qui peuvent s'accumuler.

Vous pouvez effacer les temporisations que vous avez définies avec `clearTimeout` et `clearInterval`. Leur utilisation est très simple :

```js
function neverCall() {
  console.log('You should never call this function');
}

const id1 = setTimeout(neverCall, 1000);
const id2 = setInterval(neverCall, 1000);

clearTimeout(id1);
clearInterval(id2);
```

Ainsi, si vous gardez une trace des valeurs de retour des timers, vous pouvez facilement décrocher les timers.

L'astuce finale pour les objets minuteurs est que vous pouvez passer des paramètres au rappel en passant plus de paramètres à setTimeout et setInterval :

```js
setTimeout(console.log, 1000, 'This', 'has', 4, 'parameters');
setInterval(console.log, 1000, 'This only has one');
```

La sortie est :

```bash
This has 4 parameters
This only has one
This only has one
This only has one
This only has one
This only has one
...
```

#### setImmediate()

`setImmediate()` est une autre fonction de temporisation intégrée qui, comme son nom l'indique, s'exécute immédiatement après la fin de la première itération de la boucle d'événement. En d'autres termes, `setImmediate()` est similaire à une fonction `setTimeout()` avec un délai de `0ms`. La fonction `setImmediate()` peut également prendre des paramètres supplémentaires qui sont passés lorsque le callback est appelé :

```js
console.log('This will be printed first');
setImmediate(console.log, 'This is an extra parameter');
console.log('This will be printed second');
```

La sortie est :

```bash
This will be printed first
This will be printed second
This is an extra parameter
```

Rappelez-vous que si `setImmediate()` n'a pas de délai (c'est-à-dire 0ms), cela ne signifie pas que le code s'exécutera de manière synchrone. Cela signifie simplement qu'il n'y aura pas de délai (i.e. 0ms) après que la première itération de la boucle d'événement soit terminée, c'est-à-dire que toutes les commandes synchrones aient été exécutées.
