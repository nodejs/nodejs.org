---
title: Comment puis-je sécuriser mon code ?
date:
tags:
  - filesystem
  - security
difficulty: 3
layout: knowledge-post.hbs
---

Parfois, vous pouvez vouloir laisser les utilisateurs lire ou écrire des fichiers sur votre serveur. Par exemple, vous voulez peut-être écrire un logiciel de forum sans utiliser une véritable base de données. Le problème est que vous ne voulez pas que vos utilisateurs puissent modifier ou lire des fichiers arbitraires sur votre serveur, et il existe parfois des moyens de contourner les restrictions qui devraient l'empêcher. Lisez la suite pour voir comment vous pouvez sécuriser votre code contre les attaquants malveillants qui essaient de manipuler vos fichiers.

## Octets nuls empoisonnés

Les octets nuls empoisonnés sont un moyen de tromper votre code en lui faisant voir un autre nom de fichier que celui qui sera réellement ouvert. Cela peut être utilisé dans de nombreux cas pour contourner les protections de traversée de répertoire, pour inciter les serveurs à livrer des fichiers de type incorrect et pour contourner les restrictions sur les noms de fichiers qui peuvent être utilisés. (Une description plus détaillée se trouve ici.)(http://groups.google.com/group/nodejs/browse_thread/thread/51f66075e249d767/85f647474b564fde) Utilisez toujours un code comme celui-ci lorsque vous accédez à des fichiers dont le nom est fourni par l'utilisateur :

```javascript
if (filename.indexOf('\0') !== -1) {
  return respond('That was evil.');
}
```

## Whitelisting

Vous ne pourrez pas toujours utiliser la liste blanche, mais si c'est le cas, faites-le - c'est très facile à mettre en œuvre et difficile de se tromper. Par exemple, si vous savez que tous les noms de fichiers sont des chaînes alphanumériques minuscules :

```javascript
if (!/^[a-z0-9]+$/.test(filename)) {
  return respond('illegal character');
}
```

Cependant, notez que la liste blanche seule n'est plus suffisante dès que vous autorisez les points et les slashs - les gens pourraient entrer des choses comme `../../etc/passwd` afin d'obtenir des fichiers en dehors du dossier autorisé.

## Empêcher la traversée de répertoires

La traversée de répertoire signifie qu'un attaquant essaie d'accéder à des fichiers en dehors du dossier auquel vous voulez l'autoriser à accéder. Vous pouvez empêcher cela en utilisant le module "path" intégré aux nœuds. **Par exemple, si quelqu'un exécute votre code sur un serveur Windows, le fait de ne pas traiter les barres obliques inverses comme des barres obliques permettra aux attaquants de traverser les répertoires.

Cet exemple suppose que vous avez déjà vérifié la variable `userSuppliedFilename` comme décrit dans la section "Poison Null Bytes" ci-dessus.

```javascript
var rootDirectory = '/var/www/';
```

Assurez-vous que vous avez un slash à la fin du nom des dossiers autorisés - vous ne voulez pas que les gens puissent accéder à `/var/www-secret/`, n'est-ce pas ?

```javascript
var path = require('path');
var filename = path.join(rootDirectory, userSuppliedFilename);
```

Maintenant, `filename` contient un chemin absolu et ne contient plus de séquences `..` - `path.join` s'en occupe. Cependant, il pourrait être quelque chose comme `/etc/passwd` maintenant, donc vous devez vérifier s'il commence par le `rootDirectory` :

```javascript
if (filename.indexOf(rootDirectory) !== 0) {
  return respond('trying to sneak out of the web root?');
}
```

Maintenant, la variable `filename` doit contenir le nom d'un fichier ou d'un répertoire qui se trouve à l'intérieur du répertoire autorisé (sauf s'il n'existe pas).
