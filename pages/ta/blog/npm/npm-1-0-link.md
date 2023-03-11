---
title: "npm 1.0: link"
author: Isaac Schlueter
date: 2011-04-07T00:40:33.000Z
status: publish
category: npm
slug: npm-1-0-link
layout: blog-post.hbs
---

_npm 1.0 is in release candidate mode. [Go get it!](http://groups.google.com/group/npm-/browse_thread/thread/43d3e76d71d1f141)_

In npm 0.x, there was a command called `link`. With it, you could “link-install” a package so that changes would be reflected in real-time. This is especially handy when you’re actually building something. You could make a few changes, run the command again, and voila, your new code would be run without having to re-install every time.

Of course, compiled modules still have to be rebuilt. That’s not ideal, but it’s a problem that will take more powerful magic to solve.

In npm 0.x, this was a pretty awful kludge. Back then, every package existed in some folder like:

```
prefix/lib/node/.npm/my-package/1.3.6/package
```

and the package’s version and name could be inferred from the path. Then, symbolic links were set up that looked like:

```
prefix/lib/node/my-package@1.3.6 -> ./.npm/my-package/1.3.6/package
```

It was easy enough to point that symlink to a different location. However, since the _package.json file could change_, that meant that the connection between the version and the folder was not reliable.

At first, this was just sort of something that we dealt with by saying, “Relink if you change the version.” However, as more and more edge cases arose, eventually the solution was to give link packages this fakey version of “9999.0.0-LINK-hash” so that npm knew it was an impostor. Sometimes the package was treated as if it had the 9999.0.0 version, and other times it was treated as if it had the version specified in the package.json.

## <!-- a_better_way -->A better way

For npm 1.0, we backed up and looked at what the actual use cases were. Most of the time when you link something you want one of the following:

1. globally install this package I’m working on so that I can run the command it creates and test its stuff as I work on it.
2. locally install my thing into some _other_ thing that depends on it, so that the other thing can `require()` it.

And, in both cases, changes should be immediately apparent and not require any re-linking.

_Also_, there’s a third use case that I didn’t really appreciate until I started writing more programs that had more dependencies:

<!-- markdownlint-disable ol-prefix -->
3. Globally install something, and use it in development in a bunch of projects, and then update them all at once so that they all use the latest version.
<!-- markdownlint-enable ol-prefix -->

Really, the second case above is a special-case of this third case.

## <!-- link_devel_global -->Link devel → global

The first step is to link your local project into the global install space. (See [global vs local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation/) for more on this global/local business.)

I do this as I’m developing node projects (including npm itself).

```
cd ~/dev/js/node-tap  # go into the project dir
npm link              # create symlinks into {prefix}

```

Because of how I have my computer set up, with `/usr/local` as my install prefix, I end up with a symlink from `/usr/local/lib/node_modules/tap` pointing to `~/dev/js/node-tap`, and the executable linked to `/usr/local/bin/tap`.

Of course, if you [set your paths differently](http://blog.nodejs.org/2011/04/04/development-environment/), then you’ll have different results. (That’s why I tend to talk in terms of `prefix` rather than `/usr/local`.)

## <!-- link_global_local -->Link global → local

When you want to link the globally-installed package into your local development folder, you run `npm link pkg` where `pkg` is the name of the package that you want to install.

For example, let’s say that I wanted to write some tap tests for my node-glob package. I’d _first_ do the steps above to link tap into the global install space, and _then_ I’d do this:

```
cd ~/dev/js/node-glob  # go to the project that uses the thing.
npm link tap           # link the global thing into my project.

```

Now when I make changes in `~/dev/js/node-tap`, they’ll be immediately reflected in `~/dev/js/node-glob/node_modules/tap`.

## <!-- link_to_stuff_you_don8217t_build -->Link to stuff you _don’t_ build

Let’s say I have 15 sites that all use express. I want the benefits of local development, but I also want to be able to update all my dev folders at once. You can globally install express, and then link it into your local development folder.

```
npm install express -g  # install express globally
cd ~/dev/js/my-blog     # development folder one
npm link express        # link the global express into ./node_modules
cd ~/dev/js/photo-site  # other project folder
npm link express        # link express into here, as well

                        # time passes
                        # TJ releases some new stuff.
                        # you want this new stuff.

npm update express -g   # update the global install.
                        # this also updates my project folders.

```

## <!-- caveat_not_for_real_servers -->Caveat: Not For Real Servers

npm link is a development tool. It’s _awesome_ for managing packages on your local development box. But deploying with npm link is basically asking for problems, since it makes it super easy to update things without realizing it.

## <!-- caveat_2_sorry_windows -->Caveat 2: Sorry, Windows!

I highly doubt that a native Windows node will ever have comparable symbolic link support to what Unix systems provide. I know that there are junctions and such, and I've heard legends about symbolic links on Windows 7.

When there is a native windows port of Node, if that native windows port has `fs.symlink` and `fs.readlink` support that is exactly identical to the way that they work on Unix, then this should work fine.

But I wouldn't hold my breath. Any bugs about this not working on a native Windows system (ie, not Cygwin) will most likely be closed with `wontfix`.

## <!-- aside_credit_where_credit8217s_due -->Aside: Credit where Credit’s Due

Back before the Great Package Management Wars of Node 0.1, before npm or kiwi or mode or seed.js could do much of anything, and certainly before any of them had more than 2 users, Mikeal Rogers invited me to the Couch.io offices for lunch to talk about this npm registry thingie I’d mentioned wanting to build. (That is, to convince me to use CouchDB for it.)

Since he was volunteering to build the first version of it, and since couch is pretty much the ideal candidate for this use-case, it was an easy sell.

While I was there, he said, “Look. You need to be able to link a project directory as if it was installed as a package, and then have it all Just Work. Can you do that?”

I was like, “Well, I don’t know… I mean, there’s these edge cases, and it doesn’t really fit with the existing folder structure very well…”

“Dude. Either you do it, or I’m going to have to do it, and then there’ll be _another_ package manager in node, instead of writing a registry for npm, and it won’t be as good anyway. Don’t be python.”

The rest is history.
