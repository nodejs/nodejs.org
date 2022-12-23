---
title: Le module de console intégré à node.JS
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - cli
  - globals
difficulty: 1
layout: knowledge-post.hbs
---

Toute personne familière avec le développement côté navigateur a probablement utilisé `console.log` à des fins de débogage - Node.js a implémenté un objet `console` intégré pour imiter une grande partie de cette expérience. Cependant, puisque nous travaillons côté serveur, il englobe `stdout`, `stdin`, et `stderr` au lieu de la console de débogage du navigateur.

A cause de ce parallèle avec le navigateur, le module `console` est devenu le foyer d'une bonne partie des fonctionnalités de sortie standard de Node.js. La plus simple est `console.log()`.

```javascript
console.log('Hi, everybody!');
console.log('This script is:', __filename);
console.log(__filename, process.title, process.argv);
```

Le premier exemple, le plus simple, imprime juste la chaîne de caractères fournie dans `stdout`. Il peut également être utilisé pour afficher le contenu des variables, comme le montre le #2 ; de plus, `console.dir()` est appelé sur tous les objets passés en argument, énumérant leurs propriétés.

CONSEIL DE NODE.JS : `console.log()` accepte trois caractères de format, `%s`, `%d`, et `%j`. Ces caractères de format peuvent être utilisés pour insérer des chaînes de caractères, des entiers ou des données JSON dans votre sortie - l'ordre des caractères de format doit correspondre à l'ordre des arguments.

```javascript
var name = 'Harry',
    number = 17,
    myObj = {
      propOne: 'stuff',
      propTwo: 'more stuff'
    };
console.log('My name is %s, my number is %d, my object is %j', name, number, myObj);
```

Un problème avec `console.log`, et toutes les fonctions qui en dépendent, est qu'il met en mémoire tampon la sortie. Donc si votre processus se termine soudainement, que ce soit à cause d'une exception ou de `process.exit()`, il est tout à fait possible que la sortie mise en mémoire tampon n'atteigne jamais l'écran. Cela peut causer beaucoup de frustration, alors faites attention à cette situation malheureuse.

`console.error()` fonctionne de la même manière que `console.log`, sauf que la sortie est envoyée vers `stderr` au lieu de `stdout`. C'est en fait une différence extrêmement importante, car `stderr` est toujours écrit de manière synchrone. Toute utilisation de `console.error`, ou de toute autre fonction de Node.js core qui écrit dans `stderr`, bloquera votre processus jusqu'à ce que la sortie ait été écrite. Ceci est utile pour les messages d'erreur - vous les obtenez exactement au moment où ils se produisent - mais s'il est utilisé partout, il peut considérablement ralentir votre processus.

`console.dir()`, comme mentionné ci-dessus, est un alias de `util.inspect()` - il est utilisé pour énumérer les propriétés des objets. [Lire la suite](/fr/knowledge/getting-started/how-to-use-util-inspect/)

Cela couvre les fonctionnalités de base du module `console`, mais il y a quelques autres méthodes qui méritent d'être mentionnées. Premièrement, le module `console` permet de marquer le temps via `console.time()` et `console.timeEnd()`. Voici un exemple :

```javascript
console.time('myTimer');
var string = '';
for (var i = 0; i < 300; i++) {
  (function (i) {
    string += 'aaaa' + i.toString();
  })(i);
}
console.timeEnd('myTimer');
```

Cela permet de déterminer le temps nécessaire pour effectuer les actions entre les appels `console.time` et `console.timeEnd`.

Une dernière fonction qui mérite d'être mentionnée est `console.trace()`, qui imprime une trace de pile à son emplacement dans votre code sans lancer une erreur. Cela peut parfois être utile si vous voulez savoir d'où une fonction défaillante particulière a été appelée.
