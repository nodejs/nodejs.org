---
title: Comment utiliser util.inspect ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - debug
difficulty: 1
layout: knowledge-post.hbs
---

Node.js fournit une fonction utilitaire, à des fins de débogage, qui renvoie une représentation en chaîne d'un objet. `util.inspect()` peut être une véritable bouée de sauvetage lorsqu'on travaille avec les propriétés d'objets complexes et volumineux.

Prenons un exemple de base. `util.inspect()` peut être utilisé sur n'importe quel objet - une bonne démonstration sera l'un des objets intégrés de Node.js. Essayez ceci dans le REPL (tapez `node` dans votre ligne de commande sans arguments) :

```javascript
var util = require('util');
util.inspect(console);
```

La sortie sera :

```
'{ log: [Function], info: [Function], warn: [Function], error: [Function], dir: [Function], time: [Function], timeEnd: [Function], trace: [Function], assert: [Function] }'
```

Ceci est une liste de toutes les propriétés énumérables de l'objet `console`. Il est également intéressant de noter que `console.dir` est une enveloppe autour de `util.inspect` qui utilise ses arguments par défaut.

Dans le REPL, `util.inspect` retournera immédiatement sa sortie - ce qui n'est généralement pas le cas. Dans le contexte d'un code Node.js normal dans un fichier, quelque chose doit être fait avec la sortie. La chose la plus simple à faire :

```javascript
console.log(util.inspect(myObj));
```

On peut aussi passer à `util.inspect` plusieurs arguments optionnels, montrés ici avec leurs valeurs par défaut :

```javascript
util.inspect(object, showHidden=false, depth=2, colorize=true);
```

Par exemple, `util.inspect(myObj, true, 7, true)` inspectera `myObj`, en montrant toutes les propriétés cachées et non cachées jusqu'à une profondeur de `7` et colorera la sortie. Passons en revue les arguments individuellement.

L'argument `depth` est le nombre de niveaux de profondeur dans un objet imbriqué à récuser - il est de 2 par défaut. En le mettant à `null`, la récursion sera complète, montrant chaque niveau. Comparez la (taille de) la sortie de ces deux instructions `util.inspect` dans le REPL :

```javascript
var http = require('http');
util.inspect(http, true, 1);
util.inspect(http, true, 3);
```

L'argument optionnel `showHidden` est un booléen qui détermine si oui ou non les propriétés 'non-énumérables' d'un objet seront affichées - il prend par défaut la valeur `false`, ce qui tend à donner une sortie beaucoup plus lisible. Ce n'est pas quelque chose dont un débutant a besoin de s'inquiéter la plupart du temps, mais cela vaut la peine de le démontrer brièvement. Une fois de plus, essayez ce qui suit dans le REPL :

```javascript
var util = require('util');
util.inspect(console, true);
```

Enfin, l'argument optionnel `colorize` est un booléen qui ajoute les codes d'échappement ANSI à la sortie de la chaîne. Lorsqu'elle est enregistrée dans une fenêtre de terminal, elle devrait être joliment imprimée avec des couleurs.

```javascript
var util = require('util');
console.log(util.inspect({a:1, b:"b"}, false,2,true));
```
