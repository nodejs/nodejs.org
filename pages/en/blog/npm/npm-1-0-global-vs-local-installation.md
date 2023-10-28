---
date: '2011-03-24T06:07:13.000Z'
category: npm
title: 'npm 1.0: Global vs Local installation'
layout: blog-post.hbs
author: Isaac Schlueter
---

_npm 1.0 is in release candidate mode. [Go get it!](http://groups.google.com/group/npm-/browse_thread/thread/43d3e76d71d1f141)_

More than anything else, the driving force behind the npm 1.0 rearchitecture was the desire to simplify what a package installation directory structure looks like.

In npm 0.x, there was a command called `bundle` that a lot of people liked. `bundle` let you install your dependencies locally in your project, but even still, it was basically a hack that never really worked very reliably.

Also, there was that activation/deactivation thing. That’s confusing.

## Two paths

In npm 1.0, there are two ways to install things:

1. globally —- This drops modules in `{prefix}/lib/node_modules`, and puts executable files in `{prefix}/bin`, where `{prefix}` is usually something like `/usr/local`. It also installs man pages in `{prefix}/share/man`, if they’re supplied.
2. locally —- This installs your package in the current working directory. Node modules go in `./node_modules`, executables go in `./node_modules/.bin/`, and man pages aren’t installed at all.

## Which to choose

Whether to install a package globally or locally depends on the `global` config, which is aliased to the `-g` command line switch.

Just like how global variables are kind of gross, but also necessary in some cases, global packages are important, but best avoided if not needed.

In general, the rule of thumb is:

1. If you’re installing something that you want to use _in_ your program, using `require('whatever')`, then install it locally, at the root of your project.
2. If you’re installing something that you want to use in your _shell_, on the command line or something, install it globally, so that its binaries end up in your `PATH` environment variable.

## When you can't choose

Of course, there are some cases where you want to do both. [Coffee-script](http://coffeescript.org/) and [Express](http://expressjs.com/) both are good examples of apps that have a command line interface, as well as a library. In those cases, you can do one of the following:

1. Install it in both places. Seriously, are you that short on disk space? It’s fine, really. They’re tiny JavaScript programs.
2. Install it globally, and then `npm link coffee-script` or `npm link express` (if you’re on a platform that supports symbolic links.) Then you only need to update the global copy to update all the symlinks as well.

The first option is the best in my opinion. Simple, clear, explicit. The second is really handy if you are going to re-use the same library in a bunch of different projects. (More on `npm link` in a future installment.)

You can probably think of other ways to do it by messing with environment variables. But I don’t recommend those ways. Go with the grain.

## <!-- slight_exception_it8217s_not_always_the_cwd -->Slight exception: It’s not always the cwd.

Let’s say you do something like this:

```
cd ~/projects/foo     # go into my project
npm install express   # ./node_modules/express
cd lib/utils          # move around in there
vim some-thing.js     # edit some stuff, work work work
npm install redis     # ./lib/utils/node_modules/redis!? ew.
```

In this case, npm will install `redis` into `~/projects/foo/node_modules/redis`. Sort of like how git will work anywhere within a git repository, npm will work anywhere within a package, defined by having a `node_modules` folder.

## Test runners and stuff

If your package's `scripts.test` command uses a command-line program installed by one of your dependencies, not to worry. npm makes `./node_modules/.bin` the first entry in the `PATH` environment variable when running any lifecycle scripts, so this will work fine, even if your program is not globally installed:

```
{ "name" : "my-program"
, "version" : "1.2.3"
, "dependencies": { "express": "*", "coffee-script": "*" }
, "devDependencies": { "vows": "*" }
, "scripts":
  { "test": "vows test/*.js"
  , "preinstall": "cake build" } }
```
