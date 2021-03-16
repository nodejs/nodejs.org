---
title: The built-in console module
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - cli
  - globals
difficulty: 1
layout: knowledge-post.hbs
---

Anyone familiar with browser-side development has probably used `console.log` for debugging purposes - Node.js has implemented a built-in `console` object to mimic much of this experience. Since we're working server-side, however, it wraps `stdout`, `stdin`, and `stderr` instead of the browser's debugging console.

Because of this browser parallel, the `console` module has become home to quite a bit of standard output functionality of Node.js. The simplest is `console.log()`.

```javascript
console.log('Hi, everybody!');
console.log('This script is:', __filename);
console.log(__filename, process.title, process.argv);
```

The first, simplest example just prints the provided string to `stdout`. It can also be used to output the contents of variables, as evidenced in #2; furthermore, `console.dir()` is called on any objects passed in as arguments, enumerating their properties.

NODE.JS PRO TIP: `console.log()` accepts three format characters, `%s`, `%d`, and `%j`. These format characters can be used to insert string, integer, or JSON data into your output - the order of format characters must match the order of arguments.

```javascript
var name = 'Harry',
    number = 17,
    myObj = {
      propOne: 'stuff',
      propTwo: 'more stuff'
    };
console.log('My name is %s, my number is %d, my object is %j', name, number, myObj);
```

A gotcha with `console.log`, and all functions that depend on it, is that it buffers the output. So if your process ends suddenly, whether it be from an exception or from `process.exit()`, it is entirely possible that the buffered output will never reach the screen. This can cause a great deal of frustration, so watch out for this unfortunate situation.

`console.error()` works the same as `console.log`, except that the output is sent to `stderr` instead of `stdout`. This is actually an extremely important difference, as `stderr` is always written to synchronously. Any use of `console.error`, or any of the other functions in Node.js core that write to `stderr`, will block your process until the output has all been written. This is useful for error messages - you get them exactly when they occur - but if used everywhere, can greatly slow down your process.

`console.dir()`, as mentioned above, is an alias for `util.inspect()` - it is used to enumerate object properties. [Read More](/en/knowledge/getting-started/how-to-use-util-inspect/)

That covers the basic `console` module functionality, but there are a few other methods worth mentioning as well. First, the `console` module allows for the marking of time via `console.time()` and `console.timeEnd()`. Here is an example:

```javascript
console.time('myTimer');
var string = '';
for (var i = 0; i < 300; i++) {
  (function (i) {
    string += 'aaaa' + i.toString();
  })(i);
}
console.timeEnd('myTimer');
```

This would determine the amount of time taken to perform the actions in between the `console.time` and `console.timeEnd` calls.

One last function worth mentioning is `console.trace()`, which prints a stack trace to its location in your code without throwing an error. This can occasionally be useful if you'd like to figure out where a particular failing function was called from.
