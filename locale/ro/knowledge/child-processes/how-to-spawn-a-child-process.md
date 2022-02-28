---
title: How to spawn a child process - the basics
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - child_process
difficulty: 2
layout: knowledge-post.hbs
---

If you find yourself wishing you could have your Node.js process start another program for you, then look no further than the `child_process` module.

The simplest way is the "fire, forget, and buffer" method using `child_process.exec`. It runs your process, buffers its output (up to a default maximum of 200kb), and lets you access it from a callback when it is finished.

The examples you will see in this article are all Linux-based. On Windows, you need to switch these commands with their Windows alternatives.

Take a look at an example:

```js
const { exec } = require('child_process');

const ls = exec('ls -l', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: ' + error.code);
    console.log('Signal received: ' + error.signal);
  }
  console.log('Child Process STDOUT: ' + stdout);
  console.log('Child Process STDERR: ' + stderr);
});

ls.on('exit', function (code) {
  console.log('Child process exited with exit code ' + code);
});
```

`error.stack` is a stack trace to the point that the [Error object](/en/knowledge/errors/what-is-the-error-object/) was created.

The `stderr` of a given process is not exclusively reserved for error messages. Many programs use it as a channel for secondary data instead. As such, when trying to work with a program that you have not previously spawned as a child process, it can be helpful to start out dumping both `stdout` and `stderr`, as shown above, to avoid any surprises.

While `child_process.exec` buffers the output of the child process for you, it also returns a `ChildProcess` object, which wraps a still-running process. In the example above, since we are using `ls`, a program that will exit immediately regardless, the only part of the `ChildProcess` object worth worrying about is the `on exit` handler. It is not necessary here - the process will still exit and the error code will still be shown on errors.

**Buffering the Output** means that the output of the command is loaded into the memory before sending to `stdout` or `stderr` and as mentioned above a default of 200KB can be buffered into the memory. This feature has both pros and cons:

Pros:

* You can pipe the output of one command as the input to another (just like you could in Linux). Example `ls -al | grep '^package'` will show the list of all the sub-directories in the current directory that begin with the word `'package'`.

Cons:

* Buffering the entire data into memory will affect the process performance.
* Only a set maximum size of data can be buffered.

There are other very useful spawning functions like: `.spawn()`, `.fork()`, `.execFile()`.

* `child_process.spawn()`: The spawn function launches a command in a new process and you can use it to pass that command any arguments. It's the most generic spawning function and all other functions are built over it [[docs]](https://nodejs.org/api/child_process.html#child_process_child_process).
* `child_process.execFile()`: The execFile function is similar to `child_process.exec(`) except that it spawns the command directly without first spawning a shell by default [[docs]](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback).
* `child_process.fork()`: The fork function spawns a new Node.js process and invokes a specified module with an IPC communication channel established that allows sending messages between parent and child [[docs]](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options).

The functions `.exec()`, `.spawn()` and `.execFile()` do have their synchronous blocking versions that will wait until the child process exits namely `.execSync()`, `.spawnSync()` and `.execFileSync()` respectively. These blocking versions are particularly useful for one time startup processing tasks
