---
title: What is npm?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
difficulty: 1
layout: knowledge-post.hbs
---

`npm` is two things: first and foremost, it is an online repository for the publishing of open-source Node.js projects; second, it is a command-line utility for interacting with said repository that aids in package installation, version management, and dependency management. A plethora of Node.js libraries and applications are published on npm, and many more are added every day. These applications can be searched for on https://www.npmjs.com/. Once you have a package you want to install, it can be installed with a single command-line command.

Let's say you're hard at work one day, developing the Next Great Application. You come across a problem, and you decide that it's time to use that cool library you keep hearing about - let's use Caolan McMahon's [async](http://github.com/caolan/async) as an example. Thankfully, `npm` is very simple to use: you only have to run `npm install async`, and the specified module will be installed in the current directory under `./node_modules/`. Once installed to your `node_modules` folder, you'll be able to use `require()` on them just like they were built-ins.

Let's look at an example of a global install - let's say `coffee-script`. The npm command is simple: `npm install coffee-script -g`. This will typically install the program and put a symlink to it in `/usr/local/bin/`. This will then allow you to run the program from the console just like any other CLI tool. In this case, running `coffee` will now allow you to use the coffee-script REPL.

Another important use for npm is dependency management. When you have a node project with a [package.json](/en/knowledge/getting-started/npm/what-is-the-file-package-json/) file, you can run `npm install` from the project root and npm will install all the dependencies listed in the package.json. This makes installing a Node.js project from a git repo much easier! For example, `vows`, a Node.js testing framework, can be installed from git, and its single dependency, `eyes`, can be automatically handled:

Example:

```
git clone https://github.com/cloudhead/vows.git
cd vows
npm install
```

After running those commands, you will see a `node_modules` folder containing all of the project dependencies specified in the package.json.
