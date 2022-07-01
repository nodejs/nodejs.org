---
title: Comment analyser les arguments de la ligne de commande?
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---

Le passage d'arguments via la ligne de commande est une tâche de programmation extrêmement basique, et une nécessité pour quiconque essaie d'écrire une interface en ligne de commande (CLI) simple. Dans Node.js, comme dans le C et beaucoup d'environnements liés, tous les arguments de ligne de commande reçus par le shell sont donnés au processus dans un tableau appelé `argv` (abréviation de 'argument values').

Node.js expose ce tableau pour chaque processus en cours sous la forme de `process.argv` - regardons un exemple. Créez un fichier appelé `argv.js` et ajoutez cette ligne :

```js
console.log(process.argv);
```

Maintenant, sauvegardez-le, et essayez ce qui suit dans votre shell :

```bash
$ node argv.js one two three four five
[ 'node',
  '/home/avian/argvdemo/argv.js',
  'one',
  'two',
  'three',
  'four',
  'five' ]
```

Vous l'avez - un tableau contenant tous les arguments que vous avez passés. Remarquez les deux premiers éléments - `node` et le chemin vers votre script. Ils seront toujours présents - même si votre programme ne prend aucun argument, l'interpréteur et le chemin de votre script sont toujours considérés comme des arguments pour le shell que vous utilisez.

En ce qui concerne les arguments quotidiens du CLI, vous voudrez sauter les deux premiers. Maintenant, essayez ceci dans `argv.js` :

```js
const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
```

Ce qui donne :

```bash
$ node argv.js one two three four
myArgs:  [ 'one', 'two', 'three', 'four' ]
```

Maintenant, faisons quelque chose avec les arguments :

```js
const myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
  case 'insult':
    console.log(myArgs[1], 'smells quite badly.');
    break;
  case 'compliment':
    console.log(myArgs[1], 'is really cool.');
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}
```

CONSEIL DE JS : N'oubliez pas de faire un `break` après chaque `case` - sinon vous lancerez aussi le cas suivant !

Se référer aux arguments de la ligne de commande par l'index du tableau n'est pas très propre, et peut rapidement devenir un cauchemar quand vous commencez à travailler avec des drapeaux et autres - imaginez que vous faites un serveur, et qu'il a besoin de beaucoup d'arguments. Imaginez avoir à gérer quelque chose comme `myapp -h host -p port -r -v -b --quiet -x -o outfile` - certains drapeaux ont besoin de savoir ce qui vient ensuite, d'autres non, et la plupart des CLI laissent les utilisateurs spécifier les arguments dans l'ordre qu'ils veulent. Cela ressemble à une chaîne de caractères amusante à analyser ?

Heureusement, il existe de nombreux modules tiers qui rendent tout cela trivial - l'un d'entre eux est [yargs](https://www.npmjs.com/package/yargs). Il est disponible via `npm`. Utilisez cette commande depuis le chemin de base de votre application :

```
npm i yargs
```

Une fois que vous l'avez, essayez-le - il peut vraiment vous sauver la vie. Testons-le en nous amusant à vérifier l'année bissextile et à lire l'heure actuelle.

```js
const yargs = require('yargs');

const argv = yargs
  .command('lyr', 'Tells whether an year is leap year or not', {
    year: {
      description: 'the year to check for',
      alias: 'y',
      type: 'number'
    }
  })
  .option('time', {
    alias: 't',
    description: 'Tell the present Time',
    type: 'boolean'
  })
  .help()
  .alias('help', 'h').argv;

if (argv.time) {
  console.log('The current time is: ', new Date().toLocaleTimeString());
}

if (argv._.includes('lyr')) {
  const year = argv.year || new Date().getFullYear();
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    console.log(`${year} is a Leap Year`);
  } else {
    console.log(`${year} is NOT a Leap Year`);
  }
}

console.log(argv);
```

La dernière ligne a été incluse pour vous permettre de voir comment `yargs` gère vos arguments. Voici une référence rapide :

* `argv.$0` contient le nom du fichier de script qui est exécuté comme : `'$0' : 'myapp.js'`.
* `argv._` est un tableau contenant chaque élément qui n'est pas attaché à une option (ou un drapeau) ces éléments sont appelés `commandes` dans yargs.
* Les options (ou drapeaux) individuels deviennent des propriétés de `argv`, comme avec `argv.h` et `argv.time`. Notez que les drapeaux qui n'ont pas une seule lettre doivent être passés en tant que `--flag` comme : `node myapp.js --time`.

Un résumé des éléments utilisés dans le programme :

* **argv** : C'est le `process.argv` modifié que nous avons configuré avec yargs.
* **command()** : Cette méthode est utilisée pour ajouter des commandes, leur description et les options qui sont spécifiques à ces commandes seulement, comme dans le code ci-dessus `lyr` est la commande et `-y` est l'option spécifique à lyr : `node myapp.js lyr -y 2016`
* **option()** : Cette méthode est utilisée pour ajouter des options globales (drapeaux) qui peuvent être accédées par toutes les commandes ou sans aucune commande.
**help()** : Cette méthode est utilisée pour afficher un dialogue d'aide lorsque l'option `--help` est rencontrée et qui contient la description de toutes les `commandes` et `options` disponibles.
**alias()** : Cette méthode fournit un nom d'alias à une option, comme dans le code ci-dessus les deux `--help` et `-h` déclenchent le dialogue d'aide.

Pour plus d'informations sur yargs et les nombreuses autres choses qu'il peut faire pour vos arguments de ligne de commande, veuillez consulter [http://yargs.js.org/docs/](http://yargs.js.org/docs/).
