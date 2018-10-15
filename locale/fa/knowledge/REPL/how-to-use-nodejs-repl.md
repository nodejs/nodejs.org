---
title: "How do I use node's REPL?"
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
  - repl
difficulty: 1
layout: knowledge-post.hbs
---



Node.js ships with a REPL, which is short for 'Read-Eval-Print Loop'.  It is the Node.js shell; any valid JavaScript which can be written in a script can be passed to the REPL. It can be extremely useful for experimenting with node.js, debugging code, and figuring out some of JavaScript's more eccentric behaviors.

Running it is simple - just run node without a filename.

     docs@nodejitsu:~/$ node

It then drops you into a simple prompt ('>') where you can type any JavaScript command you wish. As in most shells, you can press the up and down arrow keys to scroll through your command history and modify previous commands. The REPL also  `Tab` to make the REPL try to autocomplete the command.

Whenever you type a command, it will print the return value of the command. If you want to reuse the previous return value, you can use the special `_` variable.

For example:

     node
     > 1+1
     2
     > _+1
     3

One thing worth noting where REPL return values are concerned:

     > x = 10
     10
     > var y = 5
     > x
     10
     > y
     5

When the `var` keyword is used, the value of the expression is stored, but *NOT* returned.  When a bare identifier is used, the value is also returned, as well as stored.

If you need to access any of the builtin modules, or any third party modules, they can be accessed with `require`, just like in the rest of Node.

For example:

     node
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

Note once again that without the `var` keyword, the contents of the object are returned immediately and displayed to `stdout`.
