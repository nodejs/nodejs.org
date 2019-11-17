---
title: How to create and use a custom REPL
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - repl
difficulty: 2
layout: knowledge-post.hbs
---

Node.js allows users to create their own REPLs with the [repl module](https://nodejs.org/api/repl.html). Its basic use looks like this:

```js
var repl = require('repl')

repl.start(prompt, stream);
```

Above, `prompt` is a string that's used for the prompt of your REPL (which defaults to "> ") and `stream` is the stream that the repl listens on, defaulting to `process.stdin`. When you run the standalone `node` REPL from the command prompt, what it's doing in the background is running `repl.start()` to give you the standard REPL.

However, the repl is pretty flexible. Here's an example that shows this off:

```js
#!/usr/bin/env node

var net = require("net");
var repl = require("repl");

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
```

This script creates *two* REPLs: One is normal excepting for its custom prompt, but the *other* is exposed via the net module so you can telnet to it! In addition, it uses the `context` property to expose the function "mood" to both REPLs, and the "bonus" string to the remote REPL only. As you will see, this approach of trying to expose objects to one REPL and not the other *doesn't really work*.

In addition, all objects in the global scope will also be accessible to your REPLs.

Here's what happens when you run the script:

```shell
$ node repl.js
Remote REPL started on port 5001.
node::local> .exit
# <ctrl>-C

$ node repl.js
Remote REPL started on port 5001.
node::local> mood()
'^__^'
node::local> bonus
ReferenceError: bonus is not defined
```

As may be seen, the `mood` function is usable within the local REPL, but the
`bonus` string is not. This is as expected.

Now, here's what happens when you try to telnet to port 5001:

```shell
$ telnet localhost 5001
Trying ::1...
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
node::remote> mood()
'>.<'
node::remote> bonus
'UNLOCKED'
```

As you can see, the `mood` function is *also* available over telnet! In addition, so is "bonus".

As an interesting consequence of my actions, bonus is now also defined on the local REPL:

```shell
node::local> bonus
'UNLOCKED'
```

It seems we "unlocked" the `bonus` string on the local REPL as well. As it turns out, any variables created in one REPL are also available to the other:

```shell
node::local> var node = "AWESOME!"

node::remote> node
'AWESOME!'
```

As you can see, the node REPL is powerful and flexible.
