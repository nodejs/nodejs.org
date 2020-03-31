---
title: What are the built-in timer functions?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - builtin
  - globals
difficulty: 1
layout: knowledge-post.hbs
---

There are two most common built-in timer functions, `setTimeout` and `setInterval`, which can be used to call a function at a later time. For an example usage:

```js
setTimeout(function() { console.log("setTimeout: It's been one second!"); }, 1000);
setInterval(function() { console.log("setInterval: It's been one second!"); }, 1000);
```

An example output is:

```bash
setTimeout: It's been one second!
setInterval: It's been one second!
setInterval: It's been one second!
setInterval: It's been one second!
setInterval: It's been one second!
...
```

As you can see the parameters to both are the same. The number second parameter says how long in milliseconds to wait before calling the function passed into the first parameter. The difference between the two functions is that `setTimeout` calls the callback only once while `setInterval` will call it over and over again.

Typically you want to be careful with `setInterval` because it can cause some undesirable effects. If, for example, you wanted to make sure your server was up by pinging it every second, you might think to try something like this:

```js
setInterval(ping, 1000);
```

This can cause problems, however, if your server is slow and it takes, for example, 3 seconds to respond to the first request. In the time it takes to get back the response, you would have sent off 3 more requests - not exactly desirable! Overall, this doesn't have a large impact when serving small static files. But if you're doing an expensive operation, such as a database query or any complex computation, this can have undesirable results. A common solution looks like this:

```js
const recursive = function () {
    console.log("It has been one second!");
    setTimeout(recursive,1000);
}
recursive();
```

As you can see, it makes a call to the `recursive` function which, as it completes, makes a call to `setTimeout(recursive, 1000)` which makes it call `recursive` again in 1 second - thus having near the same effect as setInterval while being resilient to the unintended errors that can pile up.

You can clear the timers you set with `clearTimeout` and `clearInterval`. Their usages are very simple:

```js
function never_call () {
  console.log("You should never call this function");
}

const id1 = setTimeout(never_call,1000);
const id2 = setInterval(never_call,1000);

clearTimeout(id1);
clearInterval(id2);
```

So if you keep track of the return values of the timers, you can easily unhook the timers.

The final trick for the timer objects is you can pass parameters to the callback by passing more parameters to setTimeout and setInterval:

```js
setTimeout(console.log, 1000, "This", "has", 4, "parameters");
setInterval(console.log, 1000, "This only has one");
```

The output is:

```bash
This has 4 parameters
This only has one
This only has one
This only has one
This only has one
This only has one
...
```

#### setImmediate()

`setImmediate()` is another built-in timer function which as the name suggest, runs immediately after the first iteration of the event loop is completed. In other words, `setImmediate()` is similar to a `setTimeout()` function with a `0ms` delay. The `setImmediate()` function can also take extra parameters that are passed when the callback is called:

```js
console.log("This will be printed first");
setImmediate(console.log, "This is an extra parameter");
console.log("This will be printed second");
```

The output is:

```bash
This will be printed first
This will be printed second
This is an extra parameter
```

Remember that though `setImmediate()` has no delay (i.e, 0ms) this doesn't mean that the code will run synchronously. It simply means that there will be no delay (i.e, 0ms) after the first iteration of the event loop is completed i.e, all synchronous commands have been executed.
