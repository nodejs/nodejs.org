---
title: Qu'est-ce que node core par rapport à userland
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - core
  - userland
  - terminology
difficulty: 1
layout: knowledge-post.hbs
---

De temps en temps, dans les discussions sur les listes de diffusion NodeJS et les canaux IRC, vous pouvez entendre parler de "node-core" et de "userland".

Bien sûr, traditionnellement, "userland" ou "userspace" se réfèrent à tout ce qui est en dehors du noyau du système d'exploitation. Dans ce sens, Node.js lui-même est un programme "userland".

Cependant, dans le contexte de NodeJS, le "noyau" fait référence aux modules et aux liaisons qui sont compilés dans NodeJS. En général, ils fournissent un accès à une fonctionnalité de bas niveau très bien comprise, dont presque tous les programmes de mise en réseau auront besoin : TCP, HTTP, DNS, le système de fichiers, les processus enfants, et quelques autres choses. Si quelque chose est suffisamment sophistiqué pour être discuté, il y a de fortes chances qu'il ne fasse pas partie du node-core. HTTP est à peu près aussi gros que possible, et s'il n'était pas aussi populaire, il ne ferait certainement pas partie de node.

Il y a également certaines choses dans node-core qui sont simplement trop douloureuses pour s'en passer dans un environnement JavaScript, ou qui ont été créées pour implémenter certaines constructions BOM qui ne font pas partie du langage JavaScript, mais qui pourraient tout aussi bien en faire partie (par exemple, setTimeout, setInterval et console).

Tout le reste est "userland". Cela inclut : npm, express, request, coffee-script, les clients mysql, les clients redis, et ainsi de suite. Vous pouvez souvent installer ces programmes en utilisant [npm](https://www.npmjs.com/).

La question de savoir ce qui est proprement "node-core" et ce qui appartient au "userland" est un champ de bataille constant. En général, node est basé sur la philosophie selon laquelle il ne devrait *pas* être livré avec des " piles incluses ". Il est plus facile de déplacer des choses hors de node-core que de les déplacer dedans, ce qui signifie que les modules de base doivent continuellement "payer un loyer" en termes de fourniture de fonctionnalités nécessaires que presque tout le monde trouve précieuses.

## C'est une bonne chose.

L'un des objectifs de la bibliothèque centrale minimale de node est d'encourager les gens à implémenter des choses de manière créative, sans imposer leurs idées à tout le monde. Avec un noyau minuscule et un espace utilisateur dynamique, nous pouvons tous nous épanouir et expérimenter sans le fardeau onéreux de devoir être toujours d'accord, tout le temps.

## Userland n'est pas moins

Au contraire, c'est plus. Construire des fonctionnalités dans userland plutôt que dans node-core signifie :

* Vous avez beaucoup plus de liberté pour itérer sur l'idée.
* Tous ceux qui veulent votre module peuvent l'installer assez facilement (si vous le publiez avec npm).
* Vous avez la liberté de briser les conventions de node si cela a du sens pour votre cas d'utilisation.

Si vous pensez que quelque chose a *vraiment* besoin de faire partie de l'ensemble des bibliothèques de base de node, vous devez *encore* le construire en tant que module ! Il y a beaucoup plus de chances qu'il soit intégré à node-core si les gens ont la possibilité de voir vos grandes idées en action, et si ses principes de base sont itérés, polis et testés dans le monde réel.

Modifier une fonctionnalité incluse dans node-core est très coûteux. Nous le faisons parfois, mais ce n'est pas facile et cela comporte un risque élevé de régressions. Il est préférable d'expérimenter à l'extérieur, puis de l'intégrer à node-core une fois qu'elle est stable. Une fois qu'il est utilisable en tant que paquet userland, vous pouvez même trouver qu'il est moins essentiel à node-core que vous ne le pensiez au départ.
