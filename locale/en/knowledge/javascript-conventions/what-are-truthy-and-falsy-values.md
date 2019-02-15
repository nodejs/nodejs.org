---
date: '2011-08-26T10:08:50.000Z'
tags:
  - truthy
  - falsy
  - types
  - coercion
title: 'What are "truthy" and "falsy" values?'
difficulty: 4
layout: knowledge-post.hbs
---


JavaScript is weakly typed language. That means different types can be
used in operations and the language will try to convert the types
until the operation makes sense.

```js
console.log("1" > 0); // true, "1" converted to number
console.log(1 + "1"); // 11, 1 converted to string
```

Type conversion also applies when values are used in unary boolean
operations, most notably if statements. If a value converts to the
boolean true, then it is said to be "truthy". If it converts to false
it is "falsy".

```js
let myval = "value";
if(myval) {
  console.log("This value is truthy");
}
    
myval = 0;
if(!myval) {
  console.log("This value is falsy");
}
```

Since most values in javascript are truthy, e.g. objects, arrays, most
numbers and strings, it's easier to identify all of the falsy
values. These are:

```js
false // obviously
0     // The only falsy number
""    // the empty string
null
undefined
NaN
```
    
Note that all objects and arrays are truthy, even empty ones.

Truthiness and Falsiness also come into play with logical
operators. When using logical AND/OR, the values will be converted
based on truthiness or falseness and then the expression will resolve
to the last truthy value. Short circuit rules apply. Here's an
extended example.

```js
let first = "truthy",
  second = "also truthy";

let myvalue = first && second;
console.log(myvalue); // "also truthy"

first = null;
second = "truthy";

myvalue = first || second;
console.log(myvalue); // "truthy"

myvalue2 = second || first;
console.log(myvalue2); // "truthy"

let truthy = "truthy",
  falsy = 0;

myvalue = truthy ? true : false;
myvalue = falsy ? true : false;
```
