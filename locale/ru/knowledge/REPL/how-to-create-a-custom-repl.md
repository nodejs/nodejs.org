---
title: How to create and use a custom REPL
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - repl
difficulty: 2
layout: knowledge-post.hbs
---

Node allows users to create their own REPLs with the [repl module](https://nodejs.org/docs/v0.4.10/api/repl.html). Its basic use looks like this:

    repl.start(prompt, stream);

`prompt` is a string that's used for the prompt of your REPL and defaults to "> ". `stream` is the stream that the repl listens on and defaults to `process.stdin`. When you run `node` from the command prompt, what it's doing in the background is running `repl.start()` to give you the standard REPL.

However, the repl is pretty flexible. Here's an example that shows this off:

    #!/usr/bin/env node

    var net = require("net"),
        repl = require("repl");

    var mood = function () {
        var m = [ "^__^", "-___-;", ">.<", "<_>" ];
        return m[Math.floor(Math.random()*m.length)];
    };

    //A remote node repl that you can telnet to!
    net.createServer(function (socket) {
      var remote = repl.start("node::remote> ", socket);
      //Adding "mood" and "bonus" to the remote REPL's context.
      remote.context.mood = mood;
      remote.context.bonus = "UNLOCKED";
    }).listen(5001);

    console.log("Remote REPL started on port 5001.");

    //A "local" node repl with a custom prompt
    var local = repl.start("node::local> ");

    // Exposing the function "mood" to the local REPL's context.
    local.context.mood = mood;

This script creates *two* REPLs: One is normal excepting for its custom prompt, but the *other* is exposed via the net module so I can telnet to it! In addition, it uses the `context` property to expose the function "mood" to both REPLs, and the "bonus" string to the remote REPL only. As you will see, this approach of trying to expose objects to one REPL and not the other *doesn't really work*.

In addition, all objects in the global scope will also be accessible to your REPLs.

Here's what happens when I run the script:

    $ node repl.js 
    Remote REPL started on port 5001.
    node::local> .exit
    ^Cjosh@pidgey:/tmp/telnet$ node repl.js 
    Remote REPL started on port 5001.
    node::local> mood()
    '^__^'
    node::local> bonus
    ReferenceError: bonus is not defined
        at [object Context]:1:1
        at Interface.<anonymous> (repl.js:171:22)
        at Interface.emit (events.js:64:17)
        at Interface._onLine (readline.js:153:10)
        at Interface._line (readline.js:408:8)
        at Interface._ttyWrite (readline.js:585:14)
        at ReadStream.<anonymous> (readline.js:73:12)
        at ReadStream.emit (events.js:81:20)
        at ReadStream._emitKey (tty_posix.js:307:10)
        at ReadStream.onData (tty_posix.js:70:12)

As may be seen, the `mood` function is usable within the local REPL, but the
`bonus` string is not. This is as expected.

Now, here's what happens when I try to telnet to port 5001:

    josh@pidgey:/tmp/telnet$ telnet localhost 5001
    Trying ::1...
    Trying 127.0.0.1...
    Connected to localhost.
    Escape character is '^]'.
    node::remote> mood()
    '>.<'
    node::remote> bonus
    'UNLOCKED'

As you can see, the `mood` function is *also* available over telnet! In addition, so is "bonus".

As an interesting consequence of my actions, bonus is now also defined on the local REPL:

    node::local> bonus
    'UNLOCKED'

It seems we "unlocked" the `bonus` string on the local REPL as well. As it turns out, any variables created in one REPL are also available to the other:

    node::local> var node = "AWESOME!"

    node::remote> node
    'AWESOME!'

As you can see, the node REPL is powerful and flexible.
