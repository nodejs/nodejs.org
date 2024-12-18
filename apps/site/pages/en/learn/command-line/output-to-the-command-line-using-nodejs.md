---
title: Output to the command line using Node.js
layout: learn
authors: flaviocopes, potch, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais, AugustinMauroy
---

# Output to the command line using Node.js

### Basic output using the console module

Node.js provides a [`console` module](https://nodejs.org/docs/latest-v22.x/api/console.html) which provides tons of very useful ways to interact with the command line.

It is basically the same as the `console` object you find in the browser.

The most basic and most used method is `console.log()`, which prints the string you pass to it to the console.

If you pass an object, it will render it as a string.

You can pass multiple variables to `console.log`, for example:

```js
const x = 'x';
const y = 'y';

console.log(x, y);
```

and Node.js will print both.

We can also format pretty phrases by passing variables and a format specifier.

For example:

```js
console.log('My %s has %d ears', 'cat', 2);
```

- `%s` format a variable as a string
- `%d` format a variable as a number
- `%i` format a variable as its integer part only
- `%o` format a variable as an object

Example:

```js
console.log('%o', Number);
```

### Clear the console

`console.clear()` clears the console (the behavior might depend on the console used)

### Counting elements

`console.count()` is a handy method.

Take this code:

```js
const x = 1;
const y = 2;
const z = 3;

console.count(
  'The value of x is ' + x + ' and has been checked .. how many times?'
);

console.count(
  'The value of x is ' + x + ' and has been checked .. how many times?'
);

console.count(
  'The value of y is ' + y + ' and has been checked .. how many times?'
);
```

What happens is that `console.count()` will count the number of times a string is printed, and print the count next to it:

You can just count apples and oranges:

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];

oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});
```

### Reset counting

The console.countReset() method resets counter used with console.count().

We will use the apples and orange example to demonstrate this.

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];

oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});

console.countReset('orange');

oranges.forEach(fruit => {
  console.count(fruit);
});
```

Notice how the call to `console.countReset('orange')` resets the value counter to zero.

### Print the stack trace

There might be cases where it's useful to print the call stack trace of a function, maybe to answer the question _how did you reach that part of the code?_

You can do so using `console.trace()`:

```js
const function2 = () => console.trace();
const function1 = () => function2();
function1();
```

This will print the stack trace. This is what's printed if we try this in the Node.js REPL:

```bash
Trace
    at function2 (repl:1:33)
    at function1 (repl:1:25)
    at repl:1:1
    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
    at REPLServer.defaultEval (repl.js:239:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:440:10)
    at emitOne (events.js:120:20)
    at REPLServer.emit (events.js:210:7)
```

### Calculate the time spent

You can easily calculate how much time a function takes to run, using `time()` and `timeEnd()`

```js
const doSomething = () => console.log('test');
const measureDoingSomething = () => {
  console.time('doSomething()');
  // do something, and measure the time it takes
  doSomething();
  console.timeEnd('doSomething()');
};
measureDoingSomething();
```

### stdout and stderr

As we saw console.log is great for printing messages in the Console. This is what's called the standard output, or `stdout`.

`console.error` prints to the `stderr` stream.

It will not appear in the console, but it will appear in the error log.

### Color the output

> **NOTE**
> This part of the resource is designed with version 22.11 which notes `styleText` as ‘Active development’.

In many cases, you will be tempted to paste certain text to get a nice output at the terminal.

There is a `styleText` function provided by the `node:util` module. Let's discover how to use it.

First of all, you need to import the `styleText` function from the `node:util` module:

```mjs
import { styleText } from 'node:util';
```

```cjs
const { styleText } = require('node:util');
```

Then, you can use it to style your text:

```js
console.log(
  styleText(['red'], 'This is red text ') +
    styleText(['green, bold'], 'and this is green bold text ') +
    'this is normal text'
);
```

The first argument is an array of styles, and the second argument is the text you want to style. We invite you to read [the docs](https://nodejs.org/docs/latest-v22.x/api/util.html#utilstyletextformat-text-options)
