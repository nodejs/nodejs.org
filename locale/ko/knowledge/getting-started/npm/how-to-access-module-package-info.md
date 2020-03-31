---
title: How to access module package info
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - npm
difficulty: 1
layout: knowledge-post.hbs
---

There are many situations in the world of software development where using the wrong version of a dependency or submodule can cause all sorts of pain and anguish - luckily for you, Node.js has a module available called pkginfo that can help keep these sorts of troubles at bay.

Let's take a look at pkginfo - first, install via npm:

```
npm install pkginfo
```

Now all we need to do is require it, and invoke it.

```javascript
var pkginfo = require('pkginfo')(module);

console.dir(module.exports);
```

That would show us the entire contents of the package.json, neatly displayed to our console. If we only wanted certain pieces of information, we just specify them like so:

```javascript
var pkginfo = require('pkginfo')(module, 'version', 'author');

console.dir(module.exports);
```

And only the fields we specify will be shown to us.

For more information, see http://github.com/indexzero/ .
