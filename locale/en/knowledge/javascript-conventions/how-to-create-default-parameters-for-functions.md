---
title: How To Create Default Parameters for Functions
date: '2011-08-26T10:08:50.000Z'
tags:
  - javascript
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

Usually a function will take a set number of parameters, and require that all of them be present before it can be executed successfully. However, you will sometimes run into situations where you want to provide a default value for a parameter or take a variable number of parameters. Fortunately, from ES6/ES2015, default parameters is in the language specification:

```js

```

PRO TIP: 



javascript does not have a builtin way to do that; over time, however, people have developed idioms to compensate.

The first idiom is giving a default value for the last parameter. This is done by checking if the last parameter is `undefined` and setting it to a default value if it is. Sometimes people use the idiom: `optionalParameter = optionalParameter || defaultValue`. This can have some undesirable behaviour when they pass values that are equal to false such as `false`, `0`, and `""`. So a better way to do this is by explicitly checking that the optional parameter is `undefined`. Here is some code showing the two styles and the differing behaviour:

```js
const example = function (optionalArg) {
  optionalArg = optionalArg || "No parameter was passed";
  console.log(optionalArg);
}

const betterExample = function (optionalArg) {
  if (typeof optionalArg === 'undefined') {
    optionalArg = "No parameter was passed";
  }
  console.log(optionalArg);
}

console.log("Without parameter:");
example();
betterExample();

console.log("\nWith paramater:");
example("parameter was passed");
betterExample("parameter was passed");

console.log("\nEmpty String:");
example("");
betterExample("");
```

If the optional value is in the middle it can cause some undesired effects, since all the parameters are shifted over. The optional parameter is not the `undefined` value in this case - the last parameter is the `undefined` one. So you have to check if the last parameter is `undefined` and then manually fix all the other parameters before continuing in the code. This example shows you how to do that:

```js
const example = function (param1, optParam, callback) {
  if (typeof callback === 'undefined') {
    // only two parameters were passed, so the callback is actually in `optParam`
    callback = optParam;

    //give `optParam` a default value
    optParam = "and a default parameter";
  }
  callback(param1, optParam);
}

example("This is a necessary parameter", console.log);
example("This is a necessary parameter", "and an optional parameter", console.log);
```
