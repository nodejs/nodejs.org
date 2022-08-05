---
title: Comment créer des paramètres par défaut pour les fonctions
date: '2011-08-26T10:08:50.000Z'
tags:
  - javascript
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

En général, une fonction prend un nombre déterminé de paramètres et exige que tous soient présents avant de pouvoir être exécutée avec succès. Cependant, vous rencontrerez parfois des situations où vous voudrez fournir une valeur par défaut pour un paramètre ou prendre un nombre variable de paramètres. Heureusement, à partir de ES6/ES2015, la fonction **paramètres par défaut** figure dans les spécifications du langage :

```js
const pow = (base, power = 2) => {
  return Math.pow(base, power);
};

console.log(pow(2)); // 4
console.log(pow(2, 10)); // 1024
```

Dans le code ci-dessus, la fonction `pow` renvoie le carré d'un nombre ou toute autre puissance spécifiée dans l'appel de la fonction parce que l'argument `power` a une valeur par défaut de 2. Ainsi, si aucun second argument n'est fourni ou si la valeur fournie est `undefined`, la fonction `pow` utilisera 2 comme valeur de l'argument `power`. Mais il y a un petit problème :

```js
const pow = (base, power = 2) => {
  return Math.pow(base, power);
};

console.log(pow(2, undefined)); // 4
console.log(pow(2, null)); // 1
```

En JavaScript, il existe de nombreuses façons d'indiquer ["falsy"(fausses valeurs)](/fr/knowledge/javascript-conventions/what-are-truthy-and-falsy-values/) mais parmi elles, seule `undefined` déclenchera le paramètre par défaut. C'est la raison pour laquelle `pow(2, undefined)` renvoie 4 et `pow(2, null)` renvoie 1.

ASTUCE DE JS : Dans `Math.pow(base, puissance)`, si `puissance` est 0 ou toute autre valeur "faussée" (sauf NaN), le résultat sera toujours 1.

Malheureusement, les versions précédentes de JavaScript (ES5 et inférieures) ne prennent pas en charge les **paramètres par défaut**, mais au fil du temps, les gens ont développé des idiomes pour compenser.

Le premier idiome consiste à donner une valeur par défaut au dernier paramètre. Ceci est fait en vérifiant si le dernier paramètre est `undefined` et en lui donnant une valeur par défaut si c'est le cas. Parfois, les gens utilisent l'idiome : `optionalParameter = optionalParameter || defaultValue`. Cela peut avoir un comportement indésirable lorsqu'ils passent des valeurs qui sont égales à false comme `false`, `0`, et `""`. Une meilleure façon de procéder est donc de vérifier explicitement que le paramètre optionnel est `undefined`. Voici un peu de code montrant les deux styles et les différences de comportement :

```js
const example = function (optionalArg) {
  optionalArg = optionalArg || 'No parameter was passed';
  console.log(optionalArg);
};

const betterExample = function (optionalArg) {
  if (optionalArg === undefined) {
    optionalArg = 'No parameter was passed';
  }
  console.log(optionalArg);
};

console.log('Without parameter:');
example();
betterExample();

console.log('\nWith paramater:');
example('parameter was passed');
betterExample('parameter was passed');

console.log('\nEmpty String:');
example('');
betterExample('');
```

Le deuxième cas de figure est celui où la valeur optionnelle se trouve au milieu, ce qui peut provoquer des effets indésirables puisque tous les paramètres sont déplacés. Le paramètre optionnel n'est pas la valeur `undefined` dans ce cas - le dernier paramètre est la valeur `undefined`. Vous devez donc vérifier si le dernier paramètre est `undefined` et ensuite corriger manuellement tous les autres paramètres avant de continuer dans le code. Ce cas est également valable pour le JavaScript moderne (ES6/ES2015). L'exemple vous montre comment faire :

```js
const example = function (param1, optParam, callback) {
  if (callback === undefined) {
    // seuls deux paramètres ont été passés, donc le callback est en fait dans `optParam`.
    callback = optParam;

    // donnez à `optParam` une valeur par défaut
    optParam = 'and a default parameter';
  }
  callback(param1, optParam);
};

example('This is a necessary parameter', console.log);
example(
  'This is a necessary parameter',
  'and an optional parameter',
  console.log
);
```
