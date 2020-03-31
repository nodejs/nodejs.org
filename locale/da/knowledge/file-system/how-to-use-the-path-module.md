---
title: How to use the path module?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

The path module contains several helper functions to help make path manipulation easier.

The first function worth mentioning is `path.normalize`. This function takes a path (in the form of a string) and strips it of duplicate slashes and normalizes directory abbreviations, like '.' for 'this directory' and '..' for 'one level up'. For example:

```
> var path = require('path');
> path.normalize('/a/.///b/d/../c/')
'/a/b/c/'
```

A closely related function to `normalize` is `join`. This function takes a variable number of arguments, joins them together, and normalizes the path.

```
> var path = require('path');
> path.join('/a/.', './//b/', 'd/../c/')
'/a/b/c'
```

A possible use of `join` is to manipulate paths when serving urls:

```
> var path = require('path');
> var url = '/index.html';
> path.join(process.cwd(), 'static', url);
'/home/nico/static/index.html'
```

There are three functions which are used to extract the various parts of the path name: `basename`, `extname`, and `dirname`.

* `basename` returns the last portion of the path passed in.
* `extname` returns the extension of the last portion. Generally for directories, `extname` just returns ''.
* Finally, `dirname` returns everything that `basename` does not return.

For example:

```
> var path = require('path')
> var a = '/a/b/c.html'
> path.basename(a)
'c.html'
> path.extname(a)
'.html'
> path.dirname(a)
'/a/b'
```

Note that `basename` has an optional second parameter that will strip out the extension if you pass the correct extension.

```
> var path = require('path')
> var a = '/a/b/c.html'
> path.basename(a, path.extname(a))
'c'
```

Lastly, the `path` module provides methods to check whether or not a given path exists: `exists` and `existsSync` They both take the path of a file for the first parameter.

`exists` takes a callback as its second parameter, to which is returned a boolean representing the existence of the file.

`existsSync`, on the other hand, checks the given path synchronously, returning the boolean directly. In Node.js, you will typically want to use the asynchronous functions for most file system I/O - the synchronous versions will block your entire process until they finish.

Blocking isn't always a bad thing. Checking the existence of a vital configuration file synchronously makes sense, for example - it doesn't matter much if your process is blocking for something it can't run without! Conversely, though, in a busy HTTP server, any per-request file I/O **MUST** be asynchronous, or else you'll be responding to requests one by one. See the article on [asynchronous operations](/en/knowledge/getting-started/control-flow/how-to-write-asynchronous-code/) for more details.

```
> var path = require('path')
> path.exists('/etc', function(exists){console.log("Does the file exist?", exists)})
> Does the file exist? true

> path.existsSync('/etc')
true
```
