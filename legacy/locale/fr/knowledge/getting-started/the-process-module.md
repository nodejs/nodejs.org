---
title: Comment utiliser le module de processus global ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - globals
difficulty: 2
layout: knowledge-post.hbs
---

Chaque processus Node.js possède un ensemble de fonctionnalités intégrées, accessibles par le module global `process`. Le module `process` n'a pas besoin d'être obligatoire - il est littéralement une enveloppe autour du processus en cours d'exécution, et beaucoup des méthodes qu'il expose sont en fait des enveloppes autour des appels dans les bibliothèques C de base.

## Événements

Il y a deux événements intégrés à noter dans le module `process`, `exit` et `uncaughtException`.

L'événement `exit` se déclenche lorsque le processus est sur le point de se terminer.

```javascript
process.on('exit', function () {
  fs.writeFileSync('/tmp/myfile', 'This MUST be saved on exit.');
});
```

Un code comme celui ci-dessus peut parfois être utile pour sauvegarder une sorte de rapport final avant de quitter. Notez l'utilisation d'un appel synchrone au système de fichiers - c'est pour s'assurer que les E/S se terminent avant que le processus ne se termine réellement.

L'autre événement intégré est appelé `uncaughtException`. Il se déclenche, comme vous pouvez le deviner, chaque fois qu'une exception se produit qui n'a pas été attrapée ou traitée ailleurs dans votre programme. Ce n'est pas la façon idéale de gérer les erreurs, mais cela peut être très utile comme dernière ligne de défense si un programme doit rester en marche indéfiniment.

```javascript
process.on('uncaughtException', function (err) {
  console.error('An uncaught error occurred!');
  console.error(err.stack);
});
```

Le comportement par défaut de `uncaughtException` est d'imprimer une trace de la pile et de sortir - en utilisant ce qui précède, votre programme affichera le message fourni et la trace de la pile, mais ne sortira **pas**.

## Streams

L'objet `process` fournit également des enveloppes pour les trois flux `STDIO`, `stdin`, `stdout`, et `stderr`. En bref, `stdin` est un flux lisible (où l'on lirait les entrées de l'utilisateur), `stdout` est un flux inscriptible non-bloquant (les écritures dans `stdout` sont asynchrones, en d'autres termes), et `stderr` est un flux inscriptible bloquant (synchrone).

Le plus simple à décrire est `process.stdout`. Techniquement, la plupart des sorties dans Node.js sont accomplies en utilisant `process.stdout.write()` - bien que la plupart des gens ne le sauraient jamais. Ce qui suit est tiré de `console.js` dans le noyau de Node.js :

```javascript
exports.log = function() {
  process.stdout.write(format.apply(this, arguments) + '\n');
};
```

Comme la plupart des gens sont habitués à la syntaxe `console.log` dans le cadre du développement d'un navigateur, elle a été fournie comme une enveloppe pratique.

Ensuite, nous avons `process.stderr`, qui est très similaire à `process.stdout` avec une exception clé - il se bloque. Lorsque vous écrivez sur `stderr`, votre processus se bloque jusqu'à ce que l'écriture soit terminée. Node.js fournit un certain nombre d'alias pour la sortie, dont la plupart finissent par utiliser `stdout` ou `stderr` sous le capot. Voici une liste de référence rapide :

STDOUT, ou des fonctions non-bloquantes : `console.log`, `console.info`, `util.puts`, `util.print`.

STDERR, ou des fonctions bloquantes : `console.warn`, `console.error`, `util.debug`.

Enfin, `process.stdin` est un flux lisible pour recevoir les entrées de l'utilisateur. Voir [plus d'informations sur les entrées cli](/fr/command-line/how-to-prompt-for-command-line-input/).

## Autres propriétés

L'objet `process` contient en plus une variété de propriétés qui vous permettent d'accéder à des informations sur le processus en cours. Prenons quelques exemples rapides avec l'aide du REPL :

```
> process.pid
3290
> process.version
'v0.4.9'
> process.platform
'linux'
> process.title
'node'
```

Le `pid` est l'ID du processus du système d'exploitation, `platform` est quelque chose de général comme 'linux' ou 'darwin', et `version` fait référence à votre version de Node.js. `process.title` est un peu différent - bien que défini à `node` par défaut, il peut être défini à ce que vous voulez, et sera ce qui est affiché dans les listes de processus en cours d'exécution.

Le module `process` expose également `process.argv`, un tableau contenant les arguments de la ligne de commande du processus en cours, et `process.argc`, un entier représentant le nombre d'arguments passés. En savoir plus sur [comment analyser les arguments de la ligne de commande](/fr/knowledge/command-line/how-to-parse-command-line-arguments/)

`process.execPath` retournera le chemin absolu de l'exécutable qui a démarré ce processus.

`process.env` contient vos variables d'environnement. Essayez `process.env.HOME`, par exemple.

## Méthodes

Il y a aussi une variété de méthodes attachées à l'objet `process`, dont beaucoup traitent des aspects assez avancés d'un programme. Nous allons jeter un coup d'oeil à quelques-unes des méthodes les plus couramment utilisées, tout en laissant les parties plus avancées pour un autre article.

`process.exit` quitte le processus. Si vous appelez une fonction asynchrone et que vous appelez `process.exit()` immédiatement après, vous serez dans une situation de course - l'appel asynchrone peut ou non se terminer avant que le processus ne soit quitté. `process.exit` accepte un argument optionnel - un code de sortie entier. `0`, par convention, est une sortie sans erreur.

`process.cwd` renvoie le "répertoire de travail actuel" du processus - c'est souvent le répertoire à partir duquel la commande de démarrage du processus a été lancée.

`process.chdir` est utilisé pour changer le répertoire de travail actuel. Par exemple :

```
> process.cwd()
'/home/avian/dev'
> process.chdir('/home/avian')
> process.cwd()
'/home/avian'
```

Enfin, sur une note plus avancée, nous avons `process.nextTick`. Cette méthode accepte un argument - un callback - et le place au début de la prochaine itération de la boucle d'événement. Certaines personnes font quelque chose comme ça :

```javascript
setTimeout(function () {
  // Votre code ici
}, 0)
```

Cependant, ce n'est pas idéal. En Node.js, il faut plutôt utiliser ceci :

```javascript
process.nextTick(function () {
  console.log('Next trip around the event loop, wheeee!')
});
```

Il est beaucoup plus efficace, et beaucoup plus précis.
