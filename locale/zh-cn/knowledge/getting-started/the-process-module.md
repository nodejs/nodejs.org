---
title: How to use the global process module
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - globals
difficulty: 2
layout: knowledge-post.hbs
---

Each Node.js process has a set of built-in functionality, accessible through the global `process` module. The `process` module doesn't need to be required - it is somewhat literally a wrapper around the currently executing process, and many of the methods it exposes are actually wrappers around calls into core C libraries.

## Events

There are two built-in events worth noting in the `process` module, `exit` and `uncaughtException`.

The `exit` event fires whenever the process is about to exit.

```javascript
process.on('exit', function () {
  fs.writeFileSync('/tmp/myfile', 'This MUST be saved on exit.');
});
```

Code like the above can occasionally be useful for saving some kind of final report before you exit. Note the use of a synchronous file system call - this is to make sure the I/O finishes before the process actually exits.

The other built-in event is called `uncaughtException`. It fires, as you might guess, whenever an exception has occurred that hasn't been caught or dealt with somewhere else in your program. It's not the ideal way to handle errors, but it can be very useful as a last line of defense if a program needs to stay running indefinitely.

```javascript
process.on('uncaughtException', function (err) {
  console.error('An uncaught error occurred!');
  console.error(err.stack);
});
```

The default behavior on `uncaughtException` is to print a stack trace and exit - using the above, your program will display the message provided and the stack trace, but will **not** exit.

## Streams

The `process` object also provides wrappings for the three `STDIO` streams, `stdin`, `stdout`, and `stderr`. Put briefly, `stdin` is a readable stream (where one would read input from the user), `stdout` is a non-blocking writeable stream (writes to `stdout` are asynchronous, in other words), and `stderr` is a blocking (synchronous) writeable stream.

The simplest one to describe is `process.stdout`. Technically, most output in Node.js is accomplished by using `process.stdout.write()` - though most people would never know it. The following is from `console.js` in Node.js core:

```javascript
exports.log = function() {
  process.stdout.write(format.apply(this, arguments) + '\n');
};
```

Since most people are used to the `console.log` syntax from browser development, it was provided as a convenient wrapper.

Next we have `process.stderr`, which is very similar to `process.stdout` with one key exception - it blocks. When you write to `stderr`, your process blocks until the write is completed. Node.js provides a number of alias functions for output, most of which either end up using `stdout` or `stderr` under the hood. Here's a quick reference list:

STDOUT, or non-blocking functions: `console.log`, `console.info`, `util.puts`, `util.print`

STDERR, or blocking functions: `console.warn`, `console.error`, `util.debug`

Lastly, `process.stdin` is a readable stream for getting user input. See [more on cli input](/en/knowledge/command-line/how-to-prompt-for-command-line-input/).

## Other Properties

The `process` object additionally contains a variety of properties that allow you to access information about the running process. Let's run through a few quick examples with the help of the REPL:

```
> process.pid
3290
> process.version
'v0.4.9'
> process.platform
'linux'
> process.title
'node'
```

The `pid` is the OS Process ID, `platform` is something general like 'linux' or 'darwin', and `version` refers to your Node.js version. `process.title` is a little bit different - while set to `node` by default, it can be set to anything you want, and will be what gets displayed in lists of running processes.

The `process` module also exposes `process.argv`, an array containing the command-line arguments to the current process, and `process.argc`, an integer representing the number of arguments passed in. Read more on [how to parse command line arguments](/en/knowledge/command-line/how-to-parse-command-line-arguments/)

`process.execPath` will return the absolute path of the executable that started this process.

`process.env` contains your environment variables. Try `process.env.HOME`, for example.

## Methods

There are also a variety of methods attached to the `process` object, many of which deal with quite advanced aspects of a program. We'll take a look at a few of the more commonly useful ones, while leaving the more advanced parts for another article.

`process.exit` exits the process. If you call an asynchronous function and then call `process.exit()` immediately afterwards, you will be in a race condition - the asynchronous call may or may not complete before the process is exited. `process.exit` accepts one optional argument - an integer exit code. `0`, by convention, is an exit with no errors.

`process.cwd` returns the 'current working directory' of the process - this is often the directory from which the command to start the process was issued.

`process.chdir` is used to change the current working directory. For example:

```
> process.cwd()
'/home/avian/dev'
> process.chdir('/home/avian')
> process.cwd()
'/home/avian'
```

Finally, on a more advanced note, we have `process.nextTick`. This method accepts one argument - a callback - and places it at the top of the next iteration of the event loop. Some people do something like this:

```javascript
setTimeout(function () {
  // code here
}, 0)
```

This, however, is not ideal. In Node.js, this should be used instead:

```javascript
process.nextTick(function () {
  console.log('Next trip around the event loop, wheeee!')
});
```

It is much more efficient, and much more accurate.
