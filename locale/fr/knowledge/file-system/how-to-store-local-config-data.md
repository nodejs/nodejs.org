---
title: Comment stocker les données de configuration locales ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - conventions
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

Stocker les données de configuration de votre application Node.js est assez simple - chaque objet en JavaScript peut être facilement rendu comme [JSON](/fr/knowledge/javascript-conventions/what-is-json/), qui à son tour est juste une chaîne de données qui peut être envoyée ou sauvegardée comme vous le souhaitez. La façon la plus simple de le faire est d'utiliser les méthodes intégrées `JSON.parse()` et `JSON.stringify()`.

Prenons un exemple très simple (et artificiel). Tout d'abord, nous allons sauvegarder des données très simples :

```javascript
var fs = require('fs');

var myOptions = {
  name: 'Avian',
  dessert: 'cake'
  flavor: 'chocolate',
  beverage: 'coffee'
};

var data = JSON.stringify(myOptions);

fs.writeFile('./config.json', data, function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Configuration saved successfully.')
});
```

C'est vraiment aussi simple que cela - il suffit de `JSON.stringify()` et de l'enregistrer comme vous le souhaitez.

Maintenant, chargeons quelques données de configuration :

```javascript
var fs = require('fs');

var data = fs.readFileSync('./config.json'),
    myObj;

try {
  myObj = JSON.parse(data);
  console.dir(myObj);
}
catch (err) {
  console.log('There has been an error parsing your JSON.')
  console.log(err);
}
```

CONSEIL DU PRO NODE : Même si vous n'aimez pas utiliser `try/catch`, c'est un endroit où l'utiliser. `JSON.parse` est un parseur JSON très strict, et les erreurs sont courantes - le plus important, cependant, `JSON.parse` utilise l'instruction `throw` plutôt que de donner un callback, donc `try/catch` est le seul moyen de se prémunir contre l'erreur.

L'utilisation des méthodes `JSON` intégrées peut vous mener loin, mais comme pour beaucoup d'autres problèmes que vous pourriez chercher à résoudre avec Node.js, il existe déjà une solution dans Userland qui peut vous mener bien plus loin. La solution, dans ce cas, est `nconf`. Ecrit par Charlie Robbins, c'est un gestionnaire de configuration pour Node.js, supportant le stockage en mémoire, le stockage de fichiers locaux, ainsi que le support d'un backend `redis`, fourni dans un module séparé.

Voyons maintenant comment nous pouvons accéder à la configuration locale avec `nconf`. Tout d'abord, vous devez l'installer dans le répertoire de travail de votre projet :

```
npm install nconf
```

Après cela, la syntaxe est un jeu d'enfant. Jetez un coup d'œil à un exemple :

```javascript
var nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();
nconf.set('name', 'Avian');
nconf.set('dessert:name', 'Ice Cream');
nconf.set('dessert:flavor', 'chocolate');

console.log(nconf.get('dessert'));

nconf.save(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Configuration saved successfully.');
});
```

La seule chose délicate à noter ici est le délimiteur - ':'. Lors de l'accès à des propriétés imbriquées avec nconf, un deux-points est utilisé pour délimiter les espaces de noms des clés. Si une sous-clé spécifique n'est pas fournie, l'objet entier est défini ou retourné.

Lorsque vous utilisez nconf pour stocker vos données de configuration dans un fichier, nconf.save() et nconf.load() sont les seuls moments où une interaction réelle avec le fichier aura lieu. Tout autre accès est effectué sur une copie en mémoire de vos données, qui ne persistera pas sans un appel à nconf.save(). De même, si vous essayez de ramener les données de configuration de la dernière fois que votre application a été exécutée, elles n'existeront pas en mémoire sans un appel à nconf.load(), comme indiqué ci-dessus.
