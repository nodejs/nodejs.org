---
date: '2012-05-02T18:00:00.000Z'
category: module
title: multi-server continuous deployment with fleet
layout: blog-post.hbs
author: Isaac Schlueter
---

_This is a guest post by James "SubStack" Halliday, originally posted [on his blog](http://substack.net/posts/16a9d8/multi-server-continuous-deployment-with-fleet), and reposted here with permission._

Writing applications as a sequence of tiny services that all talk to each other over the network has many upsides, but it can be annoyingly tedious to get all the subsystems up and running.

Running a [seaport](http://substack.net/posts/7a1c42) can help with getting all the services to talk to each other, but running the processes is another matter, especially when you have new code to push into production.

[fleet](http://github.com/substack/fleet) aims to make it really easy for anyone on your team to push new code from git to an armada of servers and manage all the processes in your stack.

To start using fleet, just install the fleet command with [npm](https://npmjs.com):

```
npm install -g fleet
```

Then on one of your servers, start a fleet hub. From a fresh directory, give it a passphrase and a port to listen on:

```
fleet hub --port=7000 --secret=beepboop
```

Now fleet is listening on :7000 for commands and has started a git server on :7001 over http. There's no ssh keys or post commit hooks to configure, just run that command and you're ready to go!

Next set up some worker drones to run your processes. You can have as many workers as you like on a single server but each worker should be run from a separate directory. Just do:

```
fleet drone --hub=x.x.x.x:7000 --secret=beepboop
```

where `x.x.x.x` is the address where the fleet hub is running. Spin up a few of these drones.

Now navigate to the directory of the app you want to deploy. First set a remote so you don't need to type `--hub` and `--secret` all the time.

```
fleet remote add default --hub=x.x.x.x:7000 --secret=beepboop
```

Fleet just created a `fleet.json` file for you to save your settings.

From the same app directory, to deploy your code just do:

```
fleet deploy
```

The deploy command does a `git push` to the fleet hub's git http server and then the hub instructs all the drones to pull from it. Your code gets checked out into a new directory on all the fleet drones every time you deploy.

Because fleet is designed specifically for managing applications with lots of tiny services, the deploy command isn't tied to running any processes. Starting processes is up to the programmer but it's super simple. Just use the `fleet spawn` command:

```
fleet spawn -- node server.js 8080
```

By default fleet picks a drone at random to run the process on. You can specify which drone you want to run a particular process on with the `--drone` switch if it matters.

Start a few processes across all your worker drones and then show what is running with the `fleet ps` command:

```
fleet ps
drone#3dfe17b8
├─┬ pid#1e99f4
│ ├── status:   running
│ ├── commit:   webapp/1b8050fcaf8f1b02b9175fcb422644cb67dc8cc5
│ └── command:  node server.js 8888
└─┬ pid#d7048a
  ├── status:   running
  ├── commit:   webapp/1b8050fcaf8f1b02b9175fcb422644cb67dc8cc5
  └── command:  node server.js 8889
```

Now suppose that you have new code to push out into production. By default, fleet lets you spin up new services without disturbing your existing services. If you `fleet deploy` again after checking in some new changes to git, the next time you `fleet spawn` a new process, that process will be spun up in a completely new directory based on the git commit hash. To stop a process, just use `fleet stop`.

This approach lets you verify that the new services work before bringing down the old services. You can even start experimenting with heterogeneous and incremental deployment by hooking into a custom [http proxy](http://substack.net/posts/5bd18d)!

Even better, if you use a service registry like [seaport](http://substack.net/posts/7a1c42) for managing the host/port tables, you can spin up new ad-hoc staging clusters all the time without disrupting the normal operation of your site before rolling out new code to users.

Fleet has many more commands that you can learn about with its git-style manpage-based help system! Just do `fleet help` to get a list of all the commands you can run.

```
fleet help
Usage: fleet <command> [<args>]

The commands are:
  deploy   Push code to drones.
  drone    Connect to a hub as a worker.
  exec     Run commands on drones.
  hub      Create a hub for drones to connect.
  monitor  Show service events system-wide.
  ps       List the running processes on the drones.
  remote   Manage the set of remote hubs.
  spawn    Run services on drones.
  stop     Stop processes running on drones.

For help about a command, try `fleet help`.
```

`npm install -g fleet` and [check out the code on github](https://github.com/substack/fleet)!
