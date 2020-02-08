---
title: How do I search files and directories?
date: '2011-08-26T10:08:50.000Z'
tags:
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

Suppose you want to list all the files in the current directory. One approach is to use the builtin `fs.readdir` [method](/en/knowledge/file-system/how-to-read-files-in-nodejs/). This will get you an array of all the files and directories on the specified path:

```javascript
fs = require('fs');

fs.readdir(process.cwd(), function (err, files) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
});
```

Unfortunately, if you want to do a recursive list of files, then things get much more complicated very quickly. To avoid all of this scary complexity, this is one of the places where a Node.js user-land library can save the day. [Node-findit](https://github.com/substack/node-findit), by SubStack, is a helper module to make searching for files easier. It has interfaces to let you work with callbacks, events, or just plain old synchronously (not a good idea most of the time).

To install `node-findit`, simply use npm:

```
npm install findit
```

In the same folder, create a file called `example.js`, and then add this code. Run it with `node example.js`. This example uses the `node-findit` event-based interface.

```javascript
//This sets up the file finder
var finder = require('findit').find(__dirname);

//This listens for directories found
finder.on('directory', function (dir) {
  console.log('Directory: ' + dir + '/');
});

//This listens for files found
finder.on('file', function (file) {
  console.log('File: ' + file);
});
```
