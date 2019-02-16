---
date: '2011-08-26T10:08:50.000Z'
tags:
  - truthy
  - falsy
  - types
  - coercion
title: What is the arguments object?
difficulty: 4
layout: knowledge-post.hbs
---

The `arguments` object is a special construct available inside all
function calls. It represents the list of arguments that were passed
in when invoking the function. Since javascript allows functions to be
called with any number args, we need a way to dynamically discover and
access them.

The `arguments` object is an array-like object. It has a length
property that corresponds to the number of arguments passed into the
function. You can access these values by indexing into the array,
e.g. `arguments[0]` is the first argument. The only other standard
property of `arguments` is callee. This always refers to the function
currently being executed. Here's an example that illustrates the
properties of `arguments`.

```js
const myfunc = function(one) {
  arguments.callee === myfunc;
  arguments[0] === one;
  arguments[1] === 2;
  arguments.length === 3;
}

myfunc(1, 2, 3);
```

This construct is very useful and gives javascript functions a lot of
flexibility. But there is an important gotcha. The `arguments` object
behaves like an array, but it is not an actual array. It does not have
Array in its prototype chain and it does not respond to any array
methods, e.g. `arguments.sort()` raises a TypeError. Instead you need to
copy the values into a true array first. Since a normal `for` loop
works, this is pretty easy, or if you are working with ES6 and above `Array.from()` makes this transfer even easier.

```js
//  for ES5 and below
const args = [];
for(let i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}

// for ES6 and above
const args = Array.from(arguments);
```

In certain cases you can still treat `arguments` as an array. You can
use `arguments` in dynamic function invocations using apply. And most
native Array methods will also accept `arguments` when dynamically
invoked using call or apply. This technique also suggests another way
to convert `arguments` into a true array using the `Array.slice` method.

```js
myfunc.apply(obj, arguments).

// concat arguments onto the 
Array.prototype.concat.apply([1,2,3], arguments).

// turn arguments into a true array
const args = Array.prototype.slice.call(arguments);

// cut out first argument
args = Array.prototype.slice.call(arguments, 1);
```

### Arguments object in arrow function

The `arrow funtions` were added in the ECMAScript 2015 (ES6) specification as syntactically compact alternative to a regular function expression. A drawback to this new alternative is the lack of `arguments object` (and `this`, `super`, and `new.target` keywords). A workaround for such casese is the use  of  `rest parameter`. The `rest parameter` allows you to represent an indefinite number of arguments as an array. For more details read [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

```js
const myfunc = (...args) => {
  console.log('first parameter is ', args[0]);
}

myfunc(1, 2, 3);
```
