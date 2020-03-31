---
title: What is try-catch?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

Example:

```javascript
console.log("entering try-catch statement");

try {
  console.log("entering try block");
  throw "thrown message";
  console.log("this message is never seen");
}
catch (e) {
  console.log("entering catch block");
  console.log(e);
  console.log("leaving catch block");
}
finally {
  console.log("entering and leaving the finally block");
}

console.log("leaving try-catch statement");
```

Results:

```
entering try-catch statement
entering try block
entering catch block
thrown message
leaving catch block
entering and leaving the finally block
leaving try-catch statement
```

JavaScript's `try-catch-finally` statement works very similarly to the `try-catch-finally` encountered in C++ and Java. First, the try block is executed until and unless the code in it throws an exception (whether it is an explicit `throw` statement, the code has an uncaught native exception, or if the code calls a function that uses `throw`).

If the code doesn't throw an exception, then the whole try block is executed. If the code threw an exception inside the try block, then the catch block is executed. Last of all, the finally block is always executed, subsequent to the other blocks but prior to any subsequent code located outside of the `try-catch-finally` blocks. The `finally` block will just about always execute, no matter what kind of throwing, catching, or returning one might be trying to do inside the `try` or `catch` blocks.

Note that you can omit the `catch` or `finally` block, but one of them must be present.

## But wait, isn't it Node.js convention to not use try-catch?

In the core Node.js libraries, the only place that one really *needs* to use a try-catch is around `JSON.parse()`. All of the other methods use either the standard Error object through the first parameter of the callback or emit an `error` event. Because of this, it is generally considered [standard](/en/knowledge/errors/what-are-the-error-conventions/) to return errors through the callback rather than to use the `throw` statement.
