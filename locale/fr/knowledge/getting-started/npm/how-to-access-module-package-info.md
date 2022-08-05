---
title: Comment accéder aux informations sur les paquets de modules ?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - npm
difficulty: 1
layout: knowledge-post.hbs
---

Il existe de nombreuses situations dans le monde du développement logiciel où l'utilisation d'une mauvaise version d'une dépendance ou d'un sous-module peut causer toutes sortes de douleurs et d'angoisses - heureusement pour vous, Node.js dispose d'un module appelé pkginfo qui peut aider à tenir ce genre de problèmes à distance.

Jetons un coup d'oeil à pkginfo - d'abord, installez-le via npm :

```
npm install pkginfo
```

Maintenant, tout ce que nous devons faire est de le demander et de l'invoquer.

```javascript
var pkginfo = require('pkginfo')(module);

console.dir(module.exports);
```

Cela nous montrerait le contenu complet du package.json, proprement affiché dans notre console. Si nous ne voulons que certains éléments d'information, il suffit de les spécifier comme suit :

```javascript
var pkginfo = require('pkginfo')(module, 'version', 'author');

console.dir(module.exports);
```

Et seuls les champs que nous spécifions nous seront montrés.

Pour plus d'informations, voir http://github.com/indexzero/ .
