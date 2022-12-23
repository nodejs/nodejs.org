---
title: Quesqu'un streams ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
difficulty: 3
layout: knowledge-post.hbs
---

Les flux sont une autre construction de base dans Node.js qui encourage le codage asynchrone. Les flux vous permettent de traiter les données au fur et à mesure qu'elles sont générées ou récupérées. Les flux peuvent être lisibles, inscriptibles ou les deux.

En d'autres termes, les flux utilisent des événements pour traiter les données au fur et à mesure qu'elles se produisent, et non pas seulement avec un callback à la fin. Les flux lisibles émettent l'événement `data` pour chaque morceau de données qui arrive, et un événement `end`, qui est émis quand il n'y a plus de données. Les flux inscriptibles peuvent être écrits avec la fonction `write()`, et fermés avec la fonction `end()`. Tous les types de flux émettent des événements `error` lorsque des erreurs surviennent.

Comme exemple rapide, nous pouvons écrire une version simple de `cp` (l'utilitaire Unix qui copie les fichiers). Nous pourrions le faire en lisant le fichier entier avec les appels standards du système de fichiers et ensuite l'écrire dans un fichier. Malheureusement, cela nécessite que le fichier entier soit lu avant de pouvoir être écrit. Dans ce cas, écrire le fichier n'est pas plus rapide, mais si nous faisions du streaming sur un réseau ou si nous faisions du traitement CPU sur les données, alors il pourrait y avoir des améliorations de performance mesurables.

Exécutez ce script avec des arguments comme `node cp.js src.txt dest.txt`. Cela signifie, dans le code ci-dessous, que `process.argv[2]` est `src.txt` et `process.argv[3]` est `desc.txt`.

```javascript
var fs = require('fs');
console.log(process.argv[2], '->', process.argv[3]);

var readStream = fs.createReadStream(process.argv[2]);
var writeStream = fs.createWriteStream(process.argv[3]);

readStream.on('data', function (chunk) {
  writeStream.write(chunk);
});

readStream.on('end', function () {
  writeStream.end();
});

//Some basic error handling
readStream.on('error', function (err) {
  console.log("ERROR", err);
});

writeStream.on('error', function (err) {
  console.log("ERROR", err);
});
```

Cela met en place un flux lisible à partir du fichier source et un flux inscriptible vers le fichier de destination. Ensuite, chaque fois que le flux lisible reçoit des données, elles sont écrites dans le flux inscriptible. Enfin, elle ferme le flux d'écriture lorsque le flux de lecture est terminé.

Il aurait été préférable d'utiliser [pipe](/fr/knowledge/advanced/streams/how-to-use-stream-pipe/) comme `readStream.pipe(writeStream);`, cependant, pour montrer comment les flux fonctionnent, nous avons fait les choses à la manière longue.
