---
title: Comment faire une requête HTTP ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - http
difficulty: 2
layout: knowledge-post.hbs
---

Une autre tâche de programmation extrêmement courante consiste à faire une requête HTTP à un serveur web. Node.js fournit une API extrêmement simple pour cette fonctionnalité sous la forme de `http.request`.

A titre d'exemple, nous allons préformer une requête GET vers <https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new> (qui renvoie un entier aléatoire entre 1 et 10) et imprimer le résultat dans la console.

```javascript
var http = require('http');

//L'url que nous voulons est: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'www.random.org',
  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
};

callback = function(response) {
  var str = '';

  //Un autre morceau de données a été reçu, alors ajoutez-le à `str`.
  response.on('data', function (chunk) {
    str += chunk;
  });

  //L'ensemble de la réponse a été reçu, nous l'imprimons donc ici.
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
```

Faire une requête POST est tout aussi facile. Nous allons faire une requête POST à `www.nodejitsu.com:1337` qui fait tourner un serveur qui renverra ce que nous avons posté. Le code pour faire une requête POST est presque identique à celui pour faire une requête GET, avec juste quelques modifications simples :

```javascript
var http = require('http');

//L'url que nous voulons est: `www.nodejitsu.com:1337/`
var options = {
  host: 'www.nodejitsu.com',
  path: '/',
  //Puisque nous écoutons sur un port personnalisé, nous devons le spécifier à la main
  port: '1337',
  //Voici ce qui change la requête en une requête POST
  method: 'POST'
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
//Il s'agit des données que nous envoyons, il doit s'agir d'une chaîne ou d'un tampon.
req.write("hello world!");
req.end();
```

L'ajout d'en-têtes personnalisés est un peu plus difficile. Sur `www.nodejitsu.com:1338`, nous faisons tourner un serveur qui imprimera l'en-tête `custom`. Nous allons donc faire une demande rapide à ce serveur :

```javascript
var http = require('http');

var options = {
  host: 'www.nodejitsu.com',
  path: '/',
  port: '1338',
  //C'est la seule ligne qui est nouvelle. `headers` est un objet avec les en-têtes à demander
  headers: {'custom': 'Custom Header Demo works'}
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
req.end();
```
