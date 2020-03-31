---
title: What is require?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - core
  - globals
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

Node.js follows the CommonJS module system, and the builtin `require` function is the easiest way to include modules that exist in separate files. The basic functionality of `require` is that it reads a JavaScript file, executes the file, and then proceeds to return the `exports` object. An example module:

```javascript
console.log("evaluating example.js");

var invisible = function () {
  console.log("invisible");
}

exports.message = "hi";

exports.say = function () {
  console.log(exports.message);
}
```

So if you run `var example = require('./example.js')`, then `example.js` will get evaluated and then `example` be an object equal to:

```
{
  message: "hi",
  say: [Function]
}
```

If you want to set the exports object to a function or a new object, you have to use the `module.exports` object. So for an example:

```javascript
module.exports = function () {
  console.log("hello world")
}

require('./example2.js')() //require itself and run the exports object
```

It is worth noting that each time you subsequently require an already-required file, the `exports` object is cached and reused. To illustrate this point:

```
node> require('./example.js')
evaluating example.js
{ message: 'hi', say: [Function] }
node> require('./example.js')
{ message: 'hi', say: [Function] }
node> require('./example.js').message = "hey" //set the message to "hey"
'hey'
node> require('./example.js') //One might think that this "reloads" the file...
{ message: 'hey', say: [Function] } //...but the message is still "hey" because of the module cache.
```

As you can see from the above, `example.js` is evaluated the first time, but all subsequent calls to `require()` only invoke the module cache, rather than reading the file again. As seen above, this can occasionally produce side effects.

The rules of where `require` finds the files can be a little complex, but a simple rule of thumb is that if the file doesn't start with "./" or "/", then it is either considered a core module (and the local Node.js path is checked), or a dependency in the local `node_modules` folder. If the file starts with "./" it is considered a relative file to the file that called `require`. If the file starts with "/", it is considered an absolute path. NOTE: you can omit ".js" and `require` will automatically append it if needed. For more detailed information, see [the official docs](https://nodejs.org/docs/v0.4.2/api/modules.html#all_Together...)

An extra note: if the filename passed to `require` is actually a directory, it will first look for `package.json` in the directory and load the file referenced in the `main` property. Otherwise, it will look for an `index.js`.
