---
title: "How do I use node's REPL?"
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
  - repl
difficulty: 1
layout: knowledge-post.hbs
---

# Apprendre à utiliser le REPL

Node.js est livré avec une boucle de lecture-évaluation-impression, également connue sous le nom de REPL. C'est le shell interactif de Node.js ; tout JavaScript valide qui peut être écrit dans un script peut être passé au REPL. Il peut être extrêmement utile pour expérimenter avec Node.js, déboguer du code et comprendre certains des comportements les plus excentriques de JavaScript.

Node.js dispose d'un REPL autonome accessible depuis la ligne de commande, et d'un module REPL intégré que vous pouvez utiliser pour [créer vos propres REPL personnalisés] (https://nodejs.org/api/repl.html#repl_repl). Nous allons apprendre les bases du REPL autonome.

## Comment démarrer le REPL

Le démarrage du REPL est simple - il suffit d'exécuter node sur la ligne de commande sans nom de fichier.

```shell
node
```

Il vous place ensuite dans une simple invite ('>') où vous pouvez taper n'importe quelle commande JavaScript que vous souhaitez. Comme dans la plupart des shells, vous pouvez appuyer sur les touches fléchées haut et bas pour faire défiler l'historique de vos commandes et modifier les commandes précédentes.

```shell
$ node
> var x = "Hello, World!"
undefined
> x
"Hello, World!"
> .exit
```

Vous pouvez également utiliser la touche `Tab` pour autocompléter certaines commandes. Lorsque Vous pouvez également utiliser la touche `Tab` pour compléter automatiquement certaines commandes. Lorsque plusieurs options de complétion automatique sont disponibles, appuyez à nouveau sur la touche `Tab` pour les faire défiler.

## Commandes spéciales et sortie du REPL

Les commandes spéciales suivantes sont supportées par toutes les instances REPL (de [Node.js REPL docs](https://nodejs.org/api/repl.html#repl_commands_and_special_keys) :

* `.exit` - Ferme le flux d'E/S, provoquant la sortie du REPL.
* `.break` - Lors de la saisie d'une expression multi-ligne, la commande `.break` (ou la combinaison de touches `<ctrl>-C`) interrompt la saisie ou le traitement de cette expression.
* `.clear` - Remet le `contexte` du REPL à un objet vide et efface toute expression multi-ligne en cours de saisie.
* `.help` - Afficher cette liste de commandes spéciales.
* `.save` - Enregistre la session REPL actuelle dans un fichier : `> .save ./file/to/save.js`
* `.load` - Charge un fichier dans la session REPL en cours. `> .load ./file/to/load.js`
* `.editor` - Entrer en mode éditeur (`<ctrl>-D` pour terminer, `<ctrl>-C` pour annuler).

```shell
> .editor
# Entrer en mode éditeur (<ctrl>-D pour terminer, <ctrl>-C pour annuler).
function welcome(name) {
  return `Hello ${name}!`;
}

welcome('Node.js User');

# <ctrl>-D
'Hello Node.js User!'
>
```

Les combinaisons de touches suivantes dans le REPL ont ces effets spéciaux :

* `<ctrl>-C` - Lorsqu'il est pressé une fois, a le même effet que la commande `.break`. Lorsqu'il est appuyé deux fois sur une ligne blanche, il a le même effet que la commande `.exit`.
* `<ctrl>-D` - A le même effet que la commande `.exit`.
* `<tab>` - Lorsqu'il est appuyé sur une ligne blanche, affiche les variables globales et locales (portée). Lorsqu'il est pressé pendant la saisie d'une autre entrée, affiche les options d'autocomplétion pertinentes.

## Valeurs de retour

Chaque fois que vous tapez une commande, la valeur de retour de la commande est imprimée. Si vous voulez réutiliser la valeur de retour précédente, vous pouvez utiliser la variable spéciale `_`.

Par exemple :

```shell
$ node
> 1+1
2
> _+1
3
```

Une chose à noter concernant les valeurs de retour REPL :

```shell
> x = 10
10
> var y = 5
> x
10
> y
5
```

Lorsque le mot-clé `var` est utilisé, la valeur de l'expression est stockée, mais *NON* retournée. Lorsqu'un identificateur nu est utilisé, la valeur est également retournée, ainsi que stockée.

## Accès aux modules

Si vous avez besoin d'accéder à l'un des modules intégrés, ou à tout autre module tiers, vous pouvez y accéder avec `require`, comme dans le reste de Node.

Par exemple :

```shell
$ node
> path = require('path')
{ resolve: [Function],
  normalize: [Function],
  join: [Function],
  dirname: [Function],
  basename: [Function],
  extname: [Function],
  exists: [Function],
  existsSync: [Function] }
> path.basename("/a/b/c.txt")
'c.txt'
```

Notez une fois de plus que sans le mot-clé `var`, le contenu de l'objet est retourné immédiatement et affiché sur `stdout`.
