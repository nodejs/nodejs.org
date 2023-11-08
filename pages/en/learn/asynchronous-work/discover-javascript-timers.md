---
title: Discover JavaScript Timers
layout: learn.hbs
authors: flaviocopes, MylesBorins, LaRuaNa, amiller-gh, ahmadawais, ovflowd
---

# Discover JavaScript Timers

## `setTimeout()`

When writing JavaScript code, you might want to delay the execution of a function.

This is the job of `setTimeout`. You specify a callback function to execute later, and a value expressing how later you want it to run, in milliseconds:

```js
setTimeout(() => {
  // runs after 2 seconds
}, 2000);

setTimeout(() => {
  // runs after 50 milliseconds
}, 50);
```

This syntax defines a new function. You can call whatever other function you want in there, or you can pass an existing function name, and a set of parameters:

```js
const myFunction = (firstParam, secondParam) => {
  // do something
};

// runs after 2 seconds
setTimeout(myFunction, 2000, firstParam, secondParam);
```

`setTimeout` returns the timer id. This is generally not used, but you can store this id, and clear it if you want to delete this scheduled function execution:

```js
const id = setTimeout(() => {
  // should run after 2 seconds
}, 2000);

// I changed my mind
clearTimeout(id);
```

### Zero delay

If you specify the timeout delay to `0`, the callback function will be executed as soon as possible, but after the current function execution:

```js
setTimeout(() => {
  console.log('after ');
}, 0);

console.log(' before ');
```

This code will print

```bash
before
after
```

This is especially useful to avoid blocking the CPU on intensive tasks and let other functions be executed while performing a heavy calculation, by queuing functions in the scheduler.

> Some browsers (IE and Edge) implement a `setImmediate()` method that does this same exact functionality, but it's not standard and [unavailable on other browsers](https://caniuse.com/#feat=setimmediate). But it's a standard function in Node.js.

## `setInterval()`

`setInterval` is a function similar to `setTimeout`, with a difference: instead of running the callback function once, it will run it forever, at the specific time interval you specify (in milliseconds):

```js
setInterval(() => {
  // runs every 2 seconds
}, 2000);
```

The function above runs every 2 seconds unless you tell it to stop, using `clearInterval`, passing it the interval id that `setInterval` returned:

```js
const id = setInterval(() => {
  // runs every 2 seconds
}, 2000);

clearInterval(id);
```

It's common to call `clearInterval` inside the setInterval callback function, to let it auto-determine if it should run again or stop. For example this code runs something unless App.somethingIWait has the value `arrived`:

```js
const interval = setInterval(() => {
  if (App.somethingIWait === 'arrived') {
    clearInterval(interval);
  }
  // otherwise do things
}, 100);
```

## Recursive setTimeout

`setInterval` starts a function every n milliseconds, without any consideration about when a function finished its execution.

If a function always takes the same amount of time, it's all fine:

![setInterval working fine](/static/images/learn/javascript-timers/setinterval-ok.png)

Maybe the function takes different execution times, depending on network conditions for example:

![setInterval varying duration](/static/images/learn/javascript-timers/setinterval-varying-duration.png)

And maybe one long execution overlaps the next one:

![setInterval overlapping](/static/images/learn/javascript-timers/setinterval-overlapping.png)

To avoid this, you can schedule a recursive setTimeout to be called when the callback function finishes:

```js
const myFunction = () => {
  // do something

  setTimeout(myFunction, 1000);
};

setTimeout(myFunction, 1000);
```

to achieve this scenario:

![Recursive setTimeout](/static/images/learn/javascript-timers/recursive-settimeout.png)

`setTimeout` and `setInterval` are available in Node.js, through the [Timers module](https://nodejs.org/api/timers.html).

Node.js also provides `setImmediate()`, which is equivalent to using `setTimeout(() => {}, 0)`, mostly used to work with the Node.js Event Loop.
