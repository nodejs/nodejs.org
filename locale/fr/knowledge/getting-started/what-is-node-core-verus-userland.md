---
title: What is node core versus userland
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - core
  - userland
  - terminology
difficulty: 1
layout: knowledge-post.hbs
---

Occasionally, in the discussions in the NodeJS mailing lists and IRC channels, you may hear things referred to as "node-core" and "userland".

Of course, traditionally, "userland" or "userspace" refer to everything outside the operating system kernel. In that sense, Node.js itself is a "userland" program.

However, in the context of NodeJS, "core" refers to the modules and bindings that are compiled into NodeJS. In general, they provide a hook into very well-understood low-level functionality which almost all networking programs are going to require: TCP, HTTP, DNS, the File System, child processes, and a few other things. If something is fancy enough to argue about, there's a good chance it won't be part of node-core. HTTP is about as big as it gets, and if it wasn't so popular, it'd certainly not be a part of node.

There are also some things in node-core that are simply too painful to do without in a JavaScript environment, or which have been created to implement some BOM constructs which are not part of the JavaScript language, but may as well be (eg, setTimeout, setInterval, and console).

Everything else is "userland". This includes: npm, express, request, coffee-script, mysql clients, redis clients, and so on. You can often install these programs using [npm](https://www.npmjs.com/).

The question of what is properly "node-core" and what belongs in "userland" is a constant battleground. In general, node is based on the philosophy that it should *not* come with "batteries included". It is easier to move things out of node-core than it is to move them in, which means that core modules must continually "pay rent" in terms of providing necessary functionality that nearly everyone finds valuable.

## This is a Good Thing.

One goal of node's minimal core library is to encourage people to implement things in creative ways, without forcing their ideas onto everyone. With a tiny core and a vibrant user space, we can all flourish and experiment without the onerous burden of having to always agree all the time.

## Userland isn't Less

If anything, it's more. Building functionality in userland rather than in node-core means:

* You have a lot more freedom to iterate on the idea.
* Everyone who wants your module can install it easily enough (if you publish it with npm).
* You have freedom to break node conventions if that makes sense for your use-case.

If you believe that something *really* just *needs* to be part of node's core library set, you should *still* build it as a module! It's much more likely to be pulled into node-core if people have a chance to see your great ideas in action, and if its core principles are iterated and polished and tested with real-world use.

Changing functionality that is included in node-core is very costly. We do it sometimes, but it's not easy, and carries a high risk of regressions. Better to experiment outside, and then pull it into node-core once it's stable. Once it's usable as a userland package, you may even find that it's less essential to node-core than you first thought.
