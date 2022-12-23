---
title: Qu'est-ce que le fichier `package.json` ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - conventions
  - core
difficulty: 2
layout: knowledge-post.hbs
---

Tous les paquets npm contiennent un fichier, généralement à la racine du projet, appelé `package.json` - ce fichier contient diverses métadonnées relatives au projet. Ce fichier est utilisé pour donner des informations à `npm` qui lui permettent d'identifier le projet ainsi que de gérer les dépendances du projet. Il peut également contenir d'autres métadonnées telles qu'une description du projet, la version du projet dans une distribution particulière, des informations sur la licence, voire des données de configuration - toutes ces informations peuvent être vitales à la fois pour `npm` et pour les utilisateurs finaux du paquet. Le fichier `package.json` est normalement situé dans le répertoire racine d'un projet Node.js.

Node.js lui-même n'est conscient que de deux champs dans le `package.json` :

```json
{
  "name" : "barebones",
  "version" : "0.0.0",
}
```

Le champ `name` devrait s'expliquer de lui-même : c'est le nom de votre projet. Le champ `version` est utilisé par npm pour s'assurer que la bonne version du paquet est installée. Généralement, il prend la forme de `major.minor.patch` où `major`, `minor`, et `patch` sont des entiers qui augmentent après chaque nouvelle version. Pour plus de détails, consultez cette spécification : http://semver.org .

Pour un package.json plus complet, nous pouvons consulter `underscore` :

```json
{
  "name" : "underscore",
  "description" : "JavaScript's functional programming helper library.",
  "homepage" : "http://documentcloud.github.com/underscore/",
  "keywords" : ["util", "functional", "server", "client", "browser"],
  "author" : "Jeremy Ashkenas <jeremy@documentcloud.org>",
  "contributors" : [],
  "dependencies" : [],
  "repository" : {"type": "git", "url": "git://github.com/documentcloud/underscore.git"},
  "main" : "underscore.js",
  "version" : "1.1.6"
}
```

Comme vous pouvez le voir, il y a des champs pour la "description" et les "mots-clés" de vos projets. Cela permet aux personnes qui trouvent votre projet de comprendre ce qu'il est en quelques mots. Les champs `auteur`, `contributeurs`, `homepage` et `repository` peuvent tous être utilisés pour créditer les personnes qui ont contribué au projet, montrer comment contacter l'auteur/le mainteneur, et donner des liens pour des références supplémentaires.

Le fichier listé dans le champ `main` est le point d'entrée principal de la bibliothèque ; lorsque quelqu'un exécute `require(<nom de la bibliothèque>)`, require résout cet appel en `require(<package.json:main>)`.

Enfin, le champ `dependencies` est utilisé pour lister toutes les dépendances de votre projet qui sont disponibles sur `npm`. Lorsque quelqu'un installe votre projet via `npm`, toutes les dépendances listées seront également installées. De plus, si quelqu'un exécute `npm install` dans le répertoire racine de votre projet, il installera toutes les dépendances dans `./node_modules`.

Il est également possible d'ajouter un champ `devDependencies` à votre `package.json` - ce sont des dépendances qui ne sont pas nécessaires pour le fonctionnement normal, mais qui sont requises/recommandées si vous voulez patcher ou modifier le projet. Si vous avez construit vos tests unitaires en utilisant un framework de test, par exemple, il serait approprié de mettre le framework de test que vous avez utilisé dans votre champ `devDependencies`. Pour installer les `devDependencies` d'un projet, passez simplement l'option `--dev` lorsque vous utilisez `npm install`.

Pour encore plus d'options, vous pouvez consulter la [docs en ligne] (https://docs.npmjs.com/files/package.json) ou lancer `npm help json`.
