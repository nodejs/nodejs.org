---
title: Comment accéder aux paramètres de la chaîne de requête ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

Dans Node.js, la fonctionnalité d'aide à l'accès aux paramètres de la chaîne de requête de l'URL est intégrée dans la bibliothèque standard. La méthode intégrée `url.parse` s'occupe de la plupart des tâches difficiles pour nous. Voici un exemple de script utilisant cette fonction pratique et une explication de son fonctionnement :

```js
const http = require('http');
const url = require('url');

http
  .createServer(function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Feel free to add query parameters to the end of the url');
  })
  .listen(8080);
```

> Dans Node.js, la fonctionnalité d'aide à l'accès aux paramètres de la chaîne de requête de l'URL est intégrée dans la bibliothèque standard. La méthode intégrée `url.parse` s'occupe de la plupart des tâches difficiles pour nous. Voici un exemple de script utilisant cette fonction pratique et une explication de son fonctionnement :

L'élément clé de tout ce script est cette ligne : `const queryObject = url.parse(req.url,true).query;`. Regardons les choses de l'intérieur vers l'extérieur. Tout d'abord, `req.url` ressemblera à `/app.js?foo=bad&baz=foo`. C'est la partie qui se trouve dans la barre d'URL du navigateur. Ensuite, elle est transmise à `url.parse` qui analyse les différents éléments de l'URL (NOTE : le deuxième paramètre est un booléen qui indique si la méthode doit analyser la chaîne de requête, nous le mettons donc à true). Enfin, nous accédons à la propriété `.query`, qui nous renvoie un bel objet JavaScript convivial contenant les données de notre chaîne de requête.

La méthode `url.parse()` renvoie un objet qui contient plusieurs paires clé-valeur, dont l'objet `query`. D'autres informations pratiques sont retournées par la méthode, notamment les clés `host`, `pathname`, `search`.

Dans le code ci-dessus :

* `url.parse(req.url,true).query` returns `{ foo: 'bad', baz: 'foo' }`.
* `url.parse(req.url,true).host` returns `'localhost:8080'`.
* `url.parse(req.url,true).pathname` returns `'/app.js'`.
* `url.parse(req.url,true).search` returns `'?foo=bad&baz=foo'`.

### Parsing with querystring

Une autre façon d'accéder aux paramètres de la chaîne de requête est de les analyser en utilisant le module intégré `querystring` de Node.js.

Cette méthode, cependant, doit être passée juste une portion de querystring d'une url. En lui passant l'url entière, comme vous l'avez fait dans l'exemple `url.parse`, les querystrings ne seront pas analysés.

```js
const querystring = require('querystring');
const url = 'http://example.com/index.html?code=string&key=12&id=false';
const qs = 'code=string&key=12&id=false';

console.log(querystring.parse(qs));
// > { code: 'string', key: '12', id: 'false' }

console.log(querystring.parse(url));
// > { 'http://example.com/index.html?code': 'string', key: '12', id: 'false' }
```
