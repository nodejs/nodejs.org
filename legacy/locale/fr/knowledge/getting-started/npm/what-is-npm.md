---
title: Qu'est-ce que NPM ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
difficulty: 1
layout: knowledge-post.hbs
---

`npm`, abréviation de Node Package Manager, est deux choses : d'abord et avant tout, c'est un dépôt en ligne pour la publication de projets Node.js open-source ; ensuite, c'est un utilitaire en ligne de commande pour interagir avec ledit dépôt qui aide à l'installation des paquets, à la gestion des versions et à la gestion des dépendances. Une pléthore de bibliothèques et d'applications Node.js sont publiées sur npm, et beaucoup d'autres sont ajoutées chaque jour. Ces applications peuvent être recherchées sur https://www.npmjs.com/. Une fois que vous avez un paquet que vous voulez installer, il peut être installé avec une seule commande en ligne de commande.

Imaginons que vous travaillez dur un jour, en développant la prochaine grande application. Vous rencontrez un problème et vous décidez qu'il est temps d'utiliser la bibliothèque dont vous entendez parler - prenons l'exemple de [async](http://github.com/caolan/async) de Caolan McMahon. Heureusement, `npm` est très simple à utiliser : vous n'avez qu'à lancer `npm install async`, et le module spécifié sera installé dans le répertoire courant sous `./node_modules/`. Une fois installé dans votre dossier `node_modules`, vous pourrez utiliser `require()` sur eux comme s'ils étaient des modules intégrés.

Regardons un exemple d'installation globale - disons `coffee-script`. La commande npm est simple : `npm install coffee-script -g`. Cela va installer le programme et mettre un lien symbolique dans `/usr/local/bin/`. Cela vous permettra ensuite d'exécuter le programme depuis la console comme n'importe quel autre outil CLI. Dans ce cas, exécuter `coffee` vous permettra d'utiliser le REPL de coffee-script.

Une autre utilisation importante de npm est la gestion des dépendances. Lorsque vous avez un projet Node avec un fichier [package.json](/fr/connaissance/getting-started/npm/what-is-the-file-package-json/), vous pouvez exécuter `npm install` depuis la racine du projet et npm installera toutes les dépendances listées dans le package.json. Cela rend l'installation d'un projet Node.js depuis un dépôt git beaucoup plus facile ! Par exemple, `vows`, un framework de test Node.js, peut être installé depuis git, et sa seule dépendance, `eyes`, peut être automatiquement gérée :

Exemple :

```
git clone https://github.com/cloudhead/vows.git
cd vows
npm install
```

Après avoir exécuté ces commandes, vous verrez un dossier `node_modules` contenant toutes les dépendances du projet spécifiées dans le package.json.
