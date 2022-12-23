---
title: Comment puis-je lire des données POST ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

La lecture des données d'une requête POST (c'est-à-dire une soumission de formulaire) peut être un peu un piège dans Node.js, nous allons donc passer en revue un exemple de la façon de le faire correctement. La première étape, évidemment, est d'écouter les données entrantes - l'astuce est d'attendre que les données se terminent, de sorte que vous puissiez traiter toutes les données du formulaire sans rien perdre.

Voici un script rapide qui vous montre comment faire exactement cela :

```javascript
var http = require('http');
var postHTML =
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Input 1: <input name="input1"><br>' +
  'Input 2: <input name="input2"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
    res.writeHead(200);
    res.end(postHTML);
  });
}).listen(8080);
```

La variable `postHTML` est une chaîne statique contenant le HTML de deux boîtes de saisie et d'une boîte d'envoi - ce HTML est fourni pour que vous puissiez `POST` des données d'exemple. Ce n'est PAS la bonne façon de servir du HTML statique - veuillez consulter [How to Serve Static Files](/fr/knowledge/HTTP/servers/how-to-serve-static-files/) pour un exemple plus approprié.

Une fois le HTML éliminé, nous [créons un serveur](/fr/knowledge/HTTP/servers/how-to-create-a-HTTP-server/) pour écouter les requêtes. Il est important de noter, lorsqu'on écoute des données POST, que l'objet `req` est aussi un [Event Emitter](/fr/savoir-faire/démarrer/control-flow/what-are-event-emitters/). Par conséquent, `req` émettra un événement `data` à chaque fois qu'un 'chunk' de données entrantes sera reçu ; lorsqu'il n'y aura plus de données entrantes, l'événement `end` sera émis. Donc, dans notre cas, nous écoutons les événements `data`. Une fois que toutes les données sont reçues, nous les enregistrons dans la console et envoyons la réponse.

Il est important de noter que les écouteurs d'événements sont ajoutés immédiatement après la réception de l'objet de requête. Si vous ne les configurez pas immédiatement, vous risquez de manquer certains événements. Si, par exemple, un écouteur d'événement a été attaché à l'intérieur d'un callback, alors les événements `data` et `end` pourraient être déclenchés entre-temps sans qu'aucun écouteur ne soit attaché !

Vous pouvez enregistrer ce script dans le fichier `server.js` et le lancer avec `node server.js`. Une fois que vous l'aurez exécuté, vous remarquerez qu'occasionnellement vous verrez des lignes sans données, par exemple `POSTed:`. Cela se produit parce que les requêtes régulières `GET` passent par le même chemin de code. Dans une application plus "réelle", il serait bon de vérifier le type de demande et de traiter différemment les différents types de demande.
