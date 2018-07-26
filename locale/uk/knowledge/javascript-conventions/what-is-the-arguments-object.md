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

    var myfunc = function(one) {
      arguments.callee === myfunc;
      arguments[0] === one;
      arguments[1] === 2;
      arguments.length === 3;
    }

    myfunc(1, 2, 3);

This construct is very useful and gives javascript functions a lot of
flexibility. But there is an important gotcha. The `arguments` object
behaves like an array, but it is not an actual array. It does not have
Array in its prototype chain and it does not respond to any array
methods, e.g. `arguments.sort()` raises a TypeError. Instead you need to
copy the values into a true array first. Since a normal for loop
works, this is pretty easy.

    var args = [];
    for(var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

In certain cases you can still treat `arguments` as an array. You can
use `arguments` in dynamic function invocations using apply. And most
native Array methods will also accept `arguments` when dynamically
invoked using call or apply. This technique also suggests another way
to convert `arguments` into a true array using the Array#slice method.

    myfunc.apply(obj, arguments).

    // concat arguments onto the 
    Array.prototype.concat.apply([1,2,3], arguments).

    // turn arguments into a true array
    var args = Array.prototype.slice.call(arguments);

    // cut out first argument
    args = Array.prototype.slice.call(arguments, 1);
