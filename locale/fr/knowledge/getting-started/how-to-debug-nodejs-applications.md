---
title: Comment déboguer une application node ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - debug
difficulty: 1
layout: knowledge-post.hbs
---

Souvent, pas seulement dans la communauté Node.js mais aussi dans les logiciels en général, les gens déboguent simplement avec un généreux saupoudrage d'instructions de sortie standard. Cela vous permet de repérer les endroits où des valeurs inattendues sont générées. Cependant, cette méthode peut être fastidieuse, ou pire encore, pas assez robuste pour détecter le vrai problème.

### Mise en place

Heureusement, grâce à l'utilisation de `node-inspector`, nous pouvons exploiter la puissance des webkit-debuggers pour travailler avec notre code Node.js. Le processus en lui-même est simple.

Tout d'abord, assurez-vous que node-inspector est installé :

```
npm install node-inspector -g
```

Un bon exemple d'application pour expérimenter est un serveur de type 'hello world' avec un compteur (copié depuis le dépôt `node-inspector`) :

```javascript
var http = require('http');

var x = 0;
http.createServer(function (req, res) {
  x += 1;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World ' + x);
}).listen(8124);
console.log('Server running at http://127.0.0.1:8124/');
```

Tout d'abord, nous démarrons votre programme node avec le débogage activé.

```
node --debug app.js
```

Ce qui devrait afficher quelque chose du genre `debugger listening on port 5858` sur stderr. Prenez note du numéro de port, c'est le port sur lequel tourne le débogueur.

Ensuite, démarrez `node-inspector`. Si votre programme utilise le port 8080, alors vous devrez lui passer un port personnalisé.

```
node-inspector [--web-port=<custom port number>]
```

Enfin, vous lancez un navigateur webkit tel que chrome ou safari. et allez sur `127.0.0.1:8080/debug?port=5858`. Notez que si le débogueur écoute sur un autre port que `5858`, vous devrez le changer. Aussi, si vous avez passé un port web personnalisé à node-inspector, alors vous devrez modifier le `8080`.

A ce stade, vous serez confrontés à un écran assez vide avec les onglets `scripts`, `profiles`, et `console`.

### Onglet Scripts

C'est comme la plupart des débogueurs webkit/firebug. Il a une liste de tous les fichiers JavaScript (y compris le noyau de Node.js et les bibliothèques tierces) que vous pouvez sélectionner et plonger dedans. Pour arrêter l'interpréteur sur une ligne spécifique, vous définissez un point d'arrêt en cliquant sur le numéro de la ligne souhaitée. Lorsque l'exécution est gelée, par un point d'arrêt ou en interrompant manuellement l'interprétation en appuyant sur le bouton pause, vous pouvez vérifier la pile d'appels et examiner toutes les variables locales, de fermeture et globales. Vous pouvez également modifier le code pour essayer de corriger le comportement. Notez que lorsque vous modifiez le code via l'onglet script, il n'est pas enregistré dans le fichier, vous devrez donc transférer les modifications à la main.

### Onglet Profils

Pour utiliser l'onglet profil, vous avez besoin d'une bibliothèque appelée `v8-profiler` :

```
npm install v8-profiler
```

Ensuite, vous devez le demander dans le fichier que vous déboguez :

```javascript
var profiler = require('v8-profiler');
```

Maintenant vous pouvez enfin activer l'onglet `profiles`, malheureusement, tout ce que vous pouvez faire à partir de cet écran est un heap snapshot. Donc, à partir du code, vous devez sélectionner l'endroit où vous voulez commencer le cpu profiler et vous pouvez sélectionner un emplacement plus précis pour les heap snapshots.

Pour prendre un instantané du tas, il suffit d'insérer cette ligne à l'endroit désiré et éventuellement de lui donner un nom.

```javascript
var snapshot = profiler.takeSnapshot(name);
```

Pour prendre un profil cpu, il suffit d'entourer le code que vous voulez profiler avec les deux lignes montrées ci-dessous. Optionnellement, un nom peut être inclus pour identifier le profil cpu.

```javascript
profiler.startProfiling(name);
//..beaucoup et beaucoup de méthodes et de code appelé...//
var cpuProfile = profiler.stopProfiling([name]);
```

Comme exemple d'utilisation, voici le code donné précédemment modifié pour prendre un profil cpu à chaque requête et prendre un instantané du tas : après la création du serveur.

```javascript
var http = require('http');
var profiler = require('v8-profiler');

var x = 0;
http.createServer(function (req, res) {
  x += 1;
  profiler.startProfiling('request '+x);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World ' + x);
  profiler.stopProfiling('request '+x);
}).listen(8124);
profiler.takeSnapshot('Post-Server Snapshot');
console.log('Server running at http://127.0.0.1:8124/');
```

Notez que malgré le fait que ces apis retournent des objets, il est beaucoup plus facile de trier les données à travers l'interface node-inspector. Espérons qu'avec ces outils, vous pourrez prendre des décisions plus éclairées sur les fuites de mémoire et les goulots d'étranglement.

### Onglet Console

Enfin, l'onglet console vous permet d'utiliser le REPL de node dans la portée globale de votre programme. Cela a quelques inconvénients puisque cela signifie que vous ne pouvez pas accéder aux variables locales. Ainsi, les variables que vous pouvez lire ou écrire sont des variables qui ont été définies sans instruction `var`. L'autre problème est que lorsque vous utilisez `console.log`, cela fait référence à la `console.log` de node et non à la console.log de webkit. Cela signifie que la sortie va vers stdout et non vers votre onglet de console. Sinon, c'est un REPL node très simple.
