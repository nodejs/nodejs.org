---
title: Comment utiliser le module de  ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

Le module path contient plusieurs fonctions d'aide pour faciliter la manipulation des chemins.

La première fonction qui mérite d'être mentionnée est `path.normalize`. Cette fonction prend un chemin (sous la forme d'une chaîne de caractères) et le débarrasse des slashs en double et normalise les abréviations de répertoire, comme '.' pour 'ce répertoire' et '..' pour 'un niveau au-dessus'. Par exemple :

```
> var path = require('path');
> path.normalize('/a/.///b/d/../c/')
'/a/b/c/'
```

Une fonction étroitement liée à `normalize` est `join`. Cette fonction prend un nombre variable d'arguments, les joint ensemble, et normalise le chemin.

```
> var path = require('path');
> path.join('/a/.', './//b/', 'd/../c/')
'/a/b/c'
```

Une utilisation possible de `join` est de manipuler les chemins lors du service des urls :

```
> var path = require('path');
> var url = '/index.html';
> path.join(process.cwd(), 'static', url);
'/home/nico/static/index.html'
```

Il y a trois fonctions qui sont utilisées pour extraire les différentes parties du nom du chemin : `basename`, `extname`, et `dirname`.

* `basename` retourne la dernière portion du chemin passé.
* `extname` renvoie l'extension de la dernière portion. Généralement, pour les répertoires, `extname` renvoie juste ''.
* Enfin, `dirname` retourne tout ce que `basename` ne retourne pas.

Par exemple :

```
> var path = require('path')
> var a = '/a/b/c.html'
> path.basename(a)
'c.html'
> path.extname(a)
'.html'
> path.dirname(a)
'/a/b'
```

Notez que `basename` a un deuxième paramètre optionnel qui enlèvera l'extension si vous passez l'extension correcte.

```
> var path = require('path')
> var a = '/a/b/c.html'
> path.basename(a, path.extname(a))
'c'
```

Enfin, le module `path` fournit des méthodes pour vérifier si un chemin donné existe ou non : `exists` et `existsSync` Elles prennent toutes deux le chemin d'un fichier pour premier paramètre.

`exists` prend une callback comme second paramètre, à laquelle est retournée un booléen représentant l'existence du fichier.

`existsSync`, d'autre part, vérifie le chemin donné de manière synchrone, en retournant directement le booléen. Dans Node.js, vous voudrez typiquement utiliser les fonctions asynchrones pour la plupart des entrées/sorties du système de fichiers - les versions synchrones bloqueront votre processus entier jusqu'à ce qu'elles se terminent.

Le blocage n'est pas toujours une mauvaise chose. Vérifier l'existence d'un fichier de configuration vital de manière synchrone est logique, par exemple - cela n'a pas beaucoup d'importance si votre processus bloque pour quelque chose dont il ne peut se passer ! À l'inverse, dans un serveur HTTP très actif, toute entrée/sortie de fichier par requête **Doit** être asynchrone, sinon vous devrez répondre aux requêtes une par une. Voir l'article sur les [opérations asynchrones] (/fr/knowledge/getting-started/control-flow/how-to-write-asynchronous-code/) pour plus de détails.

```
> var path = require('path')
> path.exists('/etc', function(exists){console.log("Does the file exist?", exists)})
> Does the file exist? true

> path.existsSync('/etc')
true
```
