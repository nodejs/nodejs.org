---
title: Comment générer un processus simple - les bases
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - child_process
difficulty: 2
layout: knowledge-post.hbs
---

Si vous souhaitez que votre processus Node.js lance un autre programme pour vous, ne cherchez pas plus loin que le module `child_process`.

La méthode la plus simple est la méthode "fire, forget, and buffer" en utilisant `child_process.exec`. Il exécute votre processus, met en mémoire tampon sa sortie (jusqu'à un maximum par défaut de 200kb), et vous permet d'y accéder à partir d'un callback quand il est terminé.

Les exemples que vous verrez dans cet article sont tous basés sur Linux. Sous Windows, vous devez remplacer ces commandes par leurs alternatives Windows.

Jetez un coup d'oeil à un exemple :

```js
const { exec } = require('child_process');

const ls = exec('ls -l', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: ' + error.code);
    console.log('Signal received: ' + error.signal);
  }
  console.log('Child Process STDOUT: ' + stdout);
  console.log('Child Process STDERR: ' + stderr);
});

ls.on('exit', function (code) {
  console.log('Child process exited with exit code ' + code);
});
```

`error.stack` est une trace de la pile jusqu'au moment où l'objet [Error object](/fr/knowledge/errors/what-is-the-error-object/) a été créé.

La `stderr` d'un processus donné n'est pas exclusivement réservée aux messages d'erreur. De nombreux programmes l'utilisent plutôt comme canal pour des données secondaires. En tant que tel, lorsque vous essayez de travailler avec un programme que vous n'avez pas encore créé en tant que processus enfant, il peut être utile de commencer par vider à la fois `stdout` et `stderr`, comme indiqué ci-dessus, pour éviter toute surprise.

Alors que `child_process.exec` met en mémoire tampon la sortie du processus enfant pour vous, il retourne également un objet `ChildProcess`, qui englobe un processus en cours d'exécution. Dans l'exemple ci-dessus, puisque nous utilisons `ls`, un programme qui se termine immédiatement, la seule partie de l'objet `ChildProcess` dont il faut se soucier est le gestionnaire `on exit`. Il n'est pas nécessaire ici - le processus se terminera quand même et le code d'erreur sera toujours affiché sur les erreurs.

**Buffering the Output** signifie que la sortie de la commande est chargée dans la mémoire avant d'être envoyée à `stdout` ou `stderr` et comme mentionné ci-dessus, une valeur par défaut de 200KB peut être mise en mémoire tampon. Cette fonctionnalité a des avantages et des inconvénients :

Avantages :

* Vous pouvez utiliser la sortie d'une commande comme entrée d'une autre (comme vous le faites sous Linux). Exemple : `ls -al | grep '^package'` affichera la liste de tous les sous-répertoires du répertoire courant qui commencent par le mot `'package'`.

Contre :

* La mise en mémoire tampon de l'ensemble des données dans la mémoire affectera les performances du processus.
* Seule une taille maximale de données peut être mise en mémoire tampon.

Il y a d'autres fonctions très utiles comme : `.spawn()`, `.fork()`, `.execFile()`.

* `child_process.spawn()` : La fonction spawn lance une commande dans un nouveau processus et vous pouvez l'utiliser pour passer des arguments à cette commande. C'est la fonction de création de processus la plus générique et toutes les autres fonctions sont construites à partir d'elle [[docs]](https://nodejs.org/api/child_process.html#child_process_child_process).
* `child_process.execFile()` : La fonction execFile est similaire à `child_process.exec(`) sauf qu'elle génère directement la commande sans générer d'abord un shell par défaut [[docs]](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback).
* `child_process.fork()` : La fonction fork génère un nouveau processus Node.js et invoque un module spécifié avec un canal de communication IPC établi qui permet d'envoyer des messages entre le parent et l'enfant [[docs]](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options).

Les fonctions `.exec()`, `.spawn()` et `.execFile()` ont leurs versions synchrones bloquantes qui attendront que le processus enfant sorte, à savoir `.execSync()`, `.spawnSync()` et `.execFileSync()` respectivement. Ces versions bloquantes sont particulièrement utiles pour les tâches ponctuelles de traitement au démarrage
