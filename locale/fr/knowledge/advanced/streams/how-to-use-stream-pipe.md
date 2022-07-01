---
title: Comment utiliser stream.pipe ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
difficulty: 2
layout: knowledge-post.hbs
---

Si vous utilisez Node.js depuis un certain temps, vous avez certainement rencontré des flux. Les connexions HTTP sont des flux, les fichiers ouverts sont des flux ; stdin, stdout et stderr sont tous des flux également. Un " stream " est l'abstraction d'E/S de node - si vous avez besoin de mieux les comprendre, vous pouvez en savoir plus à leur sujet [ici] (https://nodejs.org/api/stream.html#stream_stream).

Les flux sont une abstraction très pratique, et il y a beaucoup de choses que vous pouvez faire avec eux - par exemple, regardons `stream.pipe()`, la méthode utilisée pour prendre un flux lisible et le connecter à un flux écrivable. Supposons que nous voulions créer un processus enfant `node` et envoyer notre stdout et stdin vers son stdout et stdin correspondant.

```javascript
#!/usr/bin/env node

var child = require('child_process');

var myREPL = child.spawn('node');

myREPL.stdout.pipe(process.stdout, { end: false });

process.stdin.resume();

process.stdin.pipe(myREPL.stdin, { end: false });

myREPL.stdin.on('end', function() {
  process.stdout.write('REPL stream ended.');
});

myREPL.on('exit', function (code) {
  process.exit(code);
});
```

Voilà, vous avez créé le REPL de Node.js en tant que processus enfant, et vous avez canalisé votre stdin et votre stdout vers son stdin et son stdout. Assurez-vous d'écouter l'évènement "exit" du processus enfant, ou sinon votre programme restera bloqué lorsque le REPL sortira.

Une autre utilisation de `stream.pipe()` concerne les flux de fichiers. Dans Node.js, `fs.createReadStream()` et `fs.createWriteStream()` sont utilisés pour créer un flux vers un descripteur de fichier ouvert. Voyons maintenant comment on peut utiliser `stream.pipe()` pour écrire dans un fichier. Vous reconnaîtrez probablement la plupart du code :

```javascript
#!/usr/bin/env node

var child = require('child_process'),
    fs = require('fs');

var myREPL = child.spawn('node'),
    myFile = fs.createWriteStream('myOutput.txt');

myREPL.stdout.pipe(process.stdout, { end: false });
myREPL.stdout.pipe(myFile);

process.stdin.resume();

process.stdin.pipe(myREPL.stdin, { end: false });
process.stdin.pipe(myFile);

myREPL.stdin.on("end", function() {
  process.stdout.write("REPL stream ended.");
});

myREPL.on('exit', function (code) {
  process.exit(code);
});
```

Avec ces petits ajouts, votre stdin et le stdout de votre REPL seront tous deux dirigés vers le flux de fichier inscriptible que vous avez ouvert vers 'myOutput.txt'. C'est aussi simple que cela - vous pouvez envoyer des flux vers autant d'endroits que vous le souhaitez.

Un autre cas d'utilisation très important de `stream.pipe()` est celui des objets de requête et de réponse HTTP. Ici, nous avons le type de proxy le plus simple :

```javascript
#!/usr/bin/env node

var http = require('http');

http.createServer(function(request, response) {
  var proxy = http.createClient(9000, 'localhost')
  var proxyRequest = proxy.request(request.method, request.url, request.headers);
  proxyRequest.on('response', function (proxyResponse) {
    proxyResponse.pipe(response);
  });
  request.pipe(proxyRequest);
}).listen(8080);

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to port 9000!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);
```

On peut aussi utiliser `stream.pipe()` pour envoyer des requêtes entrantes vers un fichier pour l'enregistrement, ou vers un processus enfant, ou n'importe laquelle des nombreuses autres choses.

Nous espérons vous avoir montré les bases de l'utilisation de `stream.pipe()` pour faire circuler facilement vos flux de données. C'est vraiment un petit truc puissant dans Node.js, et ses utilisations sont à explorer. Bon codage, et essayez de ne pas croiser vos flux !
