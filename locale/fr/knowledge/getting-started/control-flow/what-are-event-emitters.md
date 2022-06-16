---
title: Que sont les émetteurs d'événements ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - asynchronous
  - event-emitters
difficulty: 2
layout: knowledge-post.hbs
---

En Node.js, un événement peut être décrit simplement comme une chaîne de caractères avec un callback correspondant. Un événement peut être "émis" (ou en d'autres termes, le callback correspondant peut être appelé) plusieurs fois ou vous pouvez choisir de n'écouter que la première fois qu'il est émis. Voici un exemple simple exécuté sur le nœud [REPL](/fr/knowledge/REPL/how-to-use-nodejs-repl/) :

```javascript
var example_emitter = new (require('events').EventEmitter);
example_emitter.on("test", function () { console.log("test"); });
example_emitter.on("print", function (message) { console.log(message); });
example_emitter.emit("test");
example_emitter.emit("print", "message");
example_emitter.emit("unhandled");
```

```
> var example_emitter = new (require('events').EventEmitter);
{}
> example_emitter.on("test", function () { console.log("test"); });
{ _events: { test: [Function] } }
> example_emitter.on("print", function (message) { console.log(message); });
{ _events: { test: [Function], print: [Function] } }
> example_emitter.emit("test");
test //console.log'd
true //return value
> example_emitter.emit("print", "message");
message //console.log'd
true    //return value
> example_emitter.emit("unhandled");
false   //return value
```

Ceci démontre toutes les fonctionnalités de base d'un EventEmitter. La méthode `on` ou `addListener` (en fait, la méthode d'abonnement) vous permet de choisir l'événement à surveiller et le callback à appeler. La méthode `emit` (la méthode de publication), d'autre part, vous permet d'"émettre" un événement, ce qui provoque l'appel de tous les callbacks enregistrés pour cet événement.

Ainsi, dans l'exemple, nous nous abonnons d'abord aux événements `test` et `print`. Puis nous émettons les événements `test`, `print`, et `unhandled`. Puisque `unhandled` n'a pas de callback, il renvoie juste false ; les deux autres exécutent tous les callbacks attachés et renvoient true.

Dans l'événement `print`, notez que nous passons un paramètre supplémentaire - tous les paramètres supplémentaires passés à 'emit' sont passés à la fonction de rappel comme arguments.

Si vous utilisez la méthode `once` au lieu de `on`, une fois que le callback est déclenché, il est retiré de la liste des callbacks. Une petite fonction bien pratique si vous voulez détecter seulement la première fois qu'un événement a été émis.

Si vous voulez supprimer un callback spécifique, vous pouvez utiliser `removeListener`. Si vous voulez supprimer tous les callbacks d'un événement spécifique, vous pouvez utiliser `removeAllListeners`.

```javascript
var EventEmitter = require('events').EventEmitter,
    ee = new EventEmitter();

function callback() {
  console.log("Callback has been called!");
}

ee.once("event", callback);
ee.emit("event");
ee.emit("event");

ee.on("event", callback);
ee.emit("event");
ee.emit("event");
ee.removeListener("event", callback);
ee.emit("event");

ee.on("event", callback);
ee.emit("event");
ee.removeAllListeners("event");
ee.emit("event");
```

```
> var ee = new (require('events').EventEmitter);
> var callback = function () { console.log("Callbacked!"); }
> ee.once("event", callback);
{ _events: { event: { [Function: g] listener: [Function] } } }
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.emit("event");
false

> ee.on("event", callback);
{ _events: { event: [Function] } }
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.removeListener("event", callback);
{ _events: {} }
> ee.emit("event");
false

> ee.on("event", callback);
{ _events: { event: [Function] } }
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.removeAllListeners("event");
{ _events: { event: null } }
> ee.emit("event");
false
```

NOTE : Si vous voulez créer plus de 10 écouteurs sur un seul événement, vous devrez faire un appel à `ee.setMaxListeners(n)` où n est le nombre maximum d'écouteurs (avec zéro étant un nombre illimité d'écouteurs). Ceci est utilisé pour s'assurer que vous ne perdez pas accidentellement des écouteurs d'événements.
