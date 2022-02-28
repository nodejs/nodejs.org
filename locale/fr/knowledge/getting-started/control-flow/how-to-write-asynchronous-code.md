---
title: How to write asynchronous code
date: '2011-08-26T10:08:50.000Z'
tags:
  - asynchronous
  - callbacks
  - event-emitters
difficulty: 1
layout: knowledge-post.hbs
---

Node.js promotes an asynchronous coding style from the ground up, in contrast to many of the most popular web frameworks. There are a number of important things to be aware of when learning to write asynchronous code - otherwise, you will often find your code executing in extremely unexpected ways. Take this (general) rule to heart:

### Use the asynchronous functions, avoid the synchronous ones!

Many of the functions in Node.js core have both synchronous and asynchronous versions. Under most circumstances, it will be far better for you to use the asynchronous functions - otherwise, why are you using Node.js?

As a quick example comparing and contrasting the two, using `fs.readFile`:

```javascript
var fs = require('fs');

fs.readFile('example.file', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

//====================

var data = fs.readFileSync('example.file','utf8');
console.log(data);
```

Just looking at these two blocks of code, the synchronous version appears to be more concise. However, the asynchronous version is more complicated for a very good reason. In the synchronous version, the world is paused until the file is finished reading - your process will just sit there, waiting for the OS (which handles all file system tasks).

The asynchronous version, on the other hand, does not stop time - instead, the callback function gets called when the file is finished reading. This leaves your process free to execute other code in the meantime.

When only reading a file or two, or saving something quickly, the difference between synchronous and asynchronous file I/O can be quite small. On the other hand, though, when you have multiple requests coming in per second that require file or database IO, trying to do that IO synchronously would be quite thoroughly disastrous for performance.

### Callbacks
Callbacks are a basic idiom in Node.js for asynchronous operations. When most people talk about callbacks, they mean the function that is passed as the last parameter to an asynchronous function. The callback is then later called with any return value or error message that the function produced. For more details, see the article on [callbacks](/en/knowledge/getting-started/control-flow/what-are-callbacks/)

### Event Emitters
Event Emitters are another basic idiom in Node.js. A constructor is provided in Node.js core: `require('events').EventEmitter`. An Event Emitter is typically used when there will be multiple parts to the response (since usually you only want to call a callback once). For more details, see the article on [EventEmitters](/en/knowledge/getting-started/control-flow/what-are-event-emitters/)

### A gotcha with asynchronous code
A common mistake in asynchronous code with JavaScript is to write code that does something like this:

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i);
}
```

The unexpected output is then:

```
5
5
5
5
5
```

The reason this happens is because each timeout is created and then `i` is incremented. Then when the callback is called, it looks for the value of `i` and it is 5. The solution is to create a closure so that the current value of `i` is stored. For example:

```javascript
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function () {
      console.log(i);
    }, i);
  })(i);
}
```

This gives the proper output:

```
0
1
2
3
4
```
