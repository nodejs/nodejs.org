---
title: "How do I use node's REPL?"
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
  - repl
difficulty: 1
layout: knowledge-post.hbs
---

# Learn to use the REPL

Node.js ships with a Read-Eval-Print Loop, also known as a REPL. It is the Node.js interactive shell; any valid JavaScript which can be written in a script can be passed to the REPL. It can be extremely useful for experimenting with Node.js, debugging code, and figuring out some of JavaScript's more eccentric behaviors.

Node.js has a standalone REPL accessible from the command line, and a built in REPL module you can use to [create your own custom REPLs](https://nodejs.org/api/repl.html#repl_repl). We are going to learn about the basics of the standalone REPL.

## How to Start the REPL

Starting the REPL is simple - just run node on the command line without a filename.

```shell
node
```

It then drops you into a simple prompt ('>') where you can type any JavaScript command you wish. As in most shells, you can press the up and down arrow keys to scroll through your command history and modify previous commands.

```shell
$ node
> var x = "Hello, World!"
undefined
> x
"Hello, World!"
> .exit
```

You can also use the `Tab` key to autocomplete some commands. When multiple autocomplete options are available, hit `Tab` again to cycle through them.

## Special Commands and Exiting the REPL

The following special commands are supported by all REPL instances (from [Node.js REPL docs](https://nodejs.org/api/repl.html#repl_commands_and_special_keys):

* `.exit` - Close the I/O stream, causing the REPL to exit.
* `.break` - When in the process of inputting a multi-line expression, entering
  the `.break` command (or pressing the `<ctrl>-C` key combination) will abort
  further input or processing of that expression.
* `.clear` - Resets the REPL `context` to an empty object and clears any
  multi-line expression currently being input.
* `.help` - Show this list of special commands.
* `.save` - Save the current REPL session to a file:
  `> .save ./file/to/save.js`
* `.load` - Load a file into the current REPL session.
  `> .load ./file/to/load.js`
* `.editor` - Enter editor mode (`<ctrl>-D` to finish, `<ctrl>-C` to cancel).

```shell
> .editor
# Entering editor mode (<ctrl>-D to finish, <ctrl>-C to cancel)
function welcome(name) {
  return `Hello ${name}!`;
}

welcome('Node.js User');

# <ctrl>-D
'Hello Node.js User!'
>
```

The following key combinations in the REPL have these special effects:

* `<ctrl>-C` - When pressed once, has the same effect as the `.break` command.
  When pressed twice on a blank line, has the same effect as the `.exit`
  command.
* `<ctrl>-D` - Has the same effect as the `.exit` command.
* `<tab>` - When pressed on a blank line, displays global and local (scope)
  variables. When pressed while entering other input, displays relevant
  autocompletion options.

## Return Values

Whenever you type a command, it will print the return value of the command. If you want to reuse the previous return value, you can use the special `_` variable.

For example:

```shell
$ node
> 1+1
2
> _+1
3
```

One thing worth noting where REPL return values are concerned:

```shell
> x = 10
10
> var y = 5
> x
10
> y
5
```

When the `var` keyword is used, the value of the expression is stored, but *NOT* returned. When a bare identifier is used, the value is also returned, as well as stored.

## Accessing Modules

If you need to access any of the builtin modules, or any third party modules, they can be accessed with `require`, just like in the rest of Node.

For example:

```shell
$ node
> path = require('path')
{ resolve: [Function],
  normalize: [Function],
  join: [Function],
  dirname: [Function],
  basename: [Function],
  extname: [Function],
  exists: [Function],
  existsSync: [Function] }
> path.basename("/a/b/c.txt")
'c.txt'
```

Note once again that without the `var` keyword, the contents of the object are returned immediately and displayed to `stdout`.
