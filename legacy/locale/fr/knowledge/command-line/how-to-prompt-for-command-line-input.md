---
title: Comment demander aux utilisateurs de saisir des données à partir d'un script de ligne de commande ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - javascript
  - core
  - cli
difficulty: 2
layout: knowledge-post.hbs
---

Vous avez donc un petit outil CLI, mais vous voulez pouvoir demander à un utilisateur des données supplémentaires après le démarrage du script, plutôt que de les passer en argument de ligne de commande ou de les mettre dans un fichier. Pour ce faire, vous aurez besoin d'écouter STDIN ("entrée standard", c'est-à-dire votre clavier), que Node.js expose pour vous comme `process.stdin`, un flux lisible.

Les flux sont la façon dont Node.js traite les E/S événementielles - c'est un sujet important, et vous pouvez en lire plus à leur sujet [ici](https://nodejs.org/api/stream.html). Pour l'instant, nous allons utiliser le module intégré `readline` qui est une enveloppe autour de l'entrée/sortie standard, appropriée pour prendre l'entrée de l'utilisateur à partir de la ligne de commande (terminal).

Voici un exemple simple. Essayez ce qui suit dans un nouveau fichier :

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name ? ', function (name) {
  rl.question('Where do you live ? ', function (country) {
    console.log(`${name}, is a citizen of ${country}`);
    rl.close();
  });
});

rl.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});
```

Dans le code ci-dessus, `readline.createInterface()` est utilisé pour créer une instance de `readline` en configurant les flux de lecture et d'écriture. La clé `input` prend un flux lisible comme `process.stdin` ou `fs.createReadStream('file.txt')` et la clé `output` prend un flux inscriptible comme `process.stdout` ou `process.stderr`.

La méthode `rl.question()` affiche la requête en l'écrivant sur la `output`, attend que l'utilisateur fournisse une entrée sur `input`, puis invoque la fonction `callback` en passant l'entrée fournie comme premier argument.

CONSEIL DU PRO NODE : N'oubliez pas d'utiliser `rl.close()` pour fermer la transmission, sinon le processus sera laissé dans l'état `idle`.

La dernière partie du code utilise la méthode `rl.on()` pour ajouter un écouteur d'événement à l'événement `close` qui envoie simplement `console.log` dans le flux de sortie et quitte le processus. Cette partie est complètement facultative et peut être supprimée à volonté. Pour plus de détails et d'utilisation, consultez la documentation [ici] (https://nodejs.org/api/readline.html).

Si tout cela vous semble compliqué, ou si vous voulez une interface de plus haut niveau pour ce genre de choses, ne vous inquiétez pas - comme d'habitude, la communauté Node.js est venue à la rescousse. Un module particulièrement convivial à utiliser pour cela est `prompt`, disponible sur `npm` :

```bash
npm install prompt
```

Prompt est conçu pour être facile - si vos yeux ont commencé à se dessiller dès que vous avez vu `Readable Stream`, alors cette section est faite pour vous. Comparez ce qui suit avec l'exemple ci-dessus :

```js
const prompt = require('prompt');

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Email: ' + result.email);
});

function onErr(err) {
  console.log(err);
  return 1;
}
```

CONSEIL DE PRO NODE : Ce court script démontre également la gestion correcte des erreurs dans node - les erreurs sont le premier argument d'un callback, et `return` est utilisé avec le gestionnaire d'erreur afin que le reste de la fonction ne s'exécute pas lorsque des erreurs se produisent.

Prompt rend également trivial le traitement d'un certain ensemble de propriétés récurrentes que l'on pourrait vouloir attacher.

```js
const prompt = require('prompt');

const properties = [
  {
    name: 'username',
    validator: /^[a-zA-Z\s-]+$/,
    warning: 'Username must be only letters, spaces, or dashes'
  },
  {
    name: 'password',
    hidden: true
  }
];

prompt.start();

prompt.get(properties, function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Password: ' + result.password);
});

function onErr(err) {
  console.log(err);
  return 1;
}
```

Pour plus d'informations sur Prompt, veuillez consulter [la page GitHub du projet] (https://github.com/flatiron/prompt).
