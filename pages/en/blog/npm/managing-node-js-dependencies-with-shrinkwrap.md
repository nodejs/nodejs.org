---
title: Managing Node.js Dependencies with Shrinkwrap
author: Dave Pacheco
date: 2012-02-27T18:51:59.000Z
status: publish
category: npm
slug: managing-node-js-dependencies-with-shrinkwrap
layout: blog-post.hbs
---

<p style="float:right;text-align:center;margin:5px;">
<a href="http://www.flickr.com/photos/luc_viatour/4247957432/">
<img style="border:1px #000 solid;" title="Web" src="/static/images/blog/npm/managing-node-js-dependencies-with-shrinkwrap/web-300x300.jpg" alt="" width="250" height="250">
</a>
<br>
Photo by Luc Viatour (flickr)
</p>

**This post is outdated.** Please refer to official npm documentation on [shrinkwrap](https://docs.npmjs.com/cli/v8/configuring-npm/npm-shrinkwrap-json) and/or [lockfiles](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json) instead.

<details>
<summary>Original contents</summary>

Managing dependencies is a fundamental problem in building complex software. The terrific success of github and [npm](https://npmjs.com/) have made code reuse especially easy in the Node world, where packages don't exist in isolation but rather as nodes in a large graph. The software is constantly changing (releasing new versions), and each package has its own constraints about what other packages it requires to run (dependencies). npm keeps track of these constraints, and authors express what kind of changes are compatible using [semantic versioning](https://npmjs.com/doc/semver.html), allowing authors to specify that their package will work with even future versions of its dependencies as long as the semantic versions are assigned properly.

This does mean that when you "npm install" a package with dependencies, there's no guarantee that you'll get the same set of code now that you would have gotten an hour ago, or that you would get if you were to run it again an hour later. You may get a bunch of bug fixes now that weren't available an hour ago. This is great during development, where you want to keep up with changes upstream. It's not necessarily what you want for deployment, though, where you want to validate whatever bits you're actually shipping.

Put differently, **it's understood that all software changes incur some risk, and it's critical to be able to manage this risk on your own terms**. Taking that risk in development is good because by definition that's when you're incorporating and testing software changes. On the other hand, if you're shipping production software, you probably don't want to take this risk when cutting a release candidate (i.e. build time) or when you actually ship (i.e. deploy time) because you want to validate whatever you ship.

You can address a simple case of this problem by only depending on specific versions of packages, allowing no semver flexibility at all, but this falls apart when you depend on packages that don't also adopt the same principle. Many of us at Joyent started wondering: can we generalize this approach?

## Shrinkwrapping packages

That brings us to [npm shrinkwrap](https://npmjs.com/doc/shrinkwrap.html)<a href="#note1-note" id="note1-top">[1]</a>:

```
NAME
       npm-shrinkwrap -- Lock down dependency versions

SYNOPSIS
       npm shrinkwrap

DESCRIPTION
       This  command  locks down the versions of a package's dependencies so
       that you can control exactly which versions of each  dependency  will
       be used when your package is installed.
```

Let's consider package A:

```json
{
    "name": "A",
    "version": "0.1.0",
    "dependencies": {
        "B": "<0.1.0"
    }
}
```

package B:

```json
{
    "name": "B",
    "version": "0.0.1",
    "dependencies": {
        "C": "<0.1.0"
    }
}
```

and package C:

```json
{
    "name": "C",
    "version": "0.0.1"
}
```

If these are the only versions of A, B, and C available in the registry, then a normal "npm install A" will install:

```
A@0.1.0
└─┬ B@0.0.1
  └── C@0.0.1
```

Then if B\@0.0.2 is published, then a fresh "npm install A" will install:

```
A@0.1.0
└─┬ B@0.0.2
  └── C@0.0.1
```

assuming the new version did not modify B's dependencies. Of course, the new version of B could include a new version of C and any number of new dependencies. As we said before, if A's author doesn't want that, she could specify a dependency on B\@0.0.1. But if A's author and B's author are not the same person, there's no way for A's author to say that she does not want to pull in newly published versions of C when B hasn't changed at all.

In this case, A's author can use

```
npm shrinkwrap
```

This generates npm-shrinkwrap.json, which will look something like this:

```json
{
    "name": "A",
    "dependencies": {
        "B": {
            "version": "0.0.1",
            "dependencies": {
                "C": {  "version": "0.1.0" }
            }
        }
    }
}
```

The shrinkwrap command has locked down the dependencies based on what's currently installed in node\_modules. **When "npm install" installs a package with a npm-shrinkwrap.json file in the package root, the shrinkwrap file (rather than package.json files) completely drives the installation of that package and all of its dependencies (recursively).** So now the author publishes A\@0.1.0, and subsequent installs of this package will use B\@0.0.1 and C\@0.1.0, regardless the dependencies and versions listed in A's, B's, and C's package.json files. If the authors of B and C publish new versions, they won't be used to install A because the shrinkwrap refers to older versions. Even if you generate a new shrinkwrap, it will still reference the older versions, since "npm shrinkwrap" uses what's installed locally rather than what's available in the registry.

### Using shrinkwrapped packages

Using a shrinkwrapped package is no different than using any other package: you can "npm install" it by hand, or add a dependency to your package.json file and "npm install" it.

### Building shrinkwrapped packages

To shrinkwrap an existing package:

1. Run "npm install" in the package root to install the current versions of all dependencies.
2. Validate that the package works as expected with these versions.
3. Run "npm shrinkwrap", add npm-shrinkwrap.json to git, and publish your package.

To add or update a dependency in a shrinkwrapped package:

1. Run "npm install" in the package root to install the current versions of all dependencies.
2. Add or update dependencies. "npm install" each new or updated package individually and then update package.json.
3. Validate that the package works as expected with the new dependencies.
4. Run "npm shrinkwrap", commit the new npm-shrinkwrap.json, and publish your package.

You can still use [npm outdated(1)](https://npmjs.com/doc/outdated.html) to view which dependencies have newer versions available.

For more details, check out the full docs on [npm shrinkwrap](https://npmjs.com/doc/shrinkwrap.html), from which much of the above is taken.

## Why not just check `node_modules` into git?

One previously [proposed solution](http://www.mikealrogers.com/posts/nodemodules-in-git.html) is to "npm install" your dependencies during development and commit the results into source control. Then you deploy your app from a specific git SHA knowing you've got exactly the same bits that you tested in development. This does address the problem, but it has its own issues: for one, binaries are tricky because you need to "npm install" them to get their sources, but this builds the \[system-dependent\] binary too. You can avoid checking in the binaries and use "npm rebuild" at build time, but we've had a lot of difficulty trying to do this.<a href="#note2-note" id="note2-top">[2]</a> At best, this is second-class treatment for binary modules, which are critical for many important types of Node applications.<a href="#note3-note" id="note3-top">[3]</a>

Besides the issues with binary modules, this approach just felt wrong to many of us. There's a reason we don't check binaries into source control, and it's not just because they're platform-dependent. (After all, we could build and check in binaries for all supported platforms and operating systems.) It's because that approach is error-prone and redundant: error-prone because it introduces a new human failure mode where someone checks in a source change but doesn't regenerate all the binaries, and redundant because the binaries can always be built from the sources alone. An important principle of software version control is that you don't check in files derived directly from other files by a simple transformation.<a href="#note4-note" id="note4-top">[4]</a>
Instead, you check in the original sources and automate the transformations via the build process.

Dependencies are just like binaries in this regard: they're files derived from a simple transformation of something else that is (or could easily be) already available: the name and version of the dependency. Checking them in has all the same problems as checking in binaries: people could update package.json without updating the checked-in module (or vice versa). Besides that, adding new dependencies has to be done by hand, introducing more opportunities for error (checking in the wrong files, not checking in certain files, inadvertently changing files, and so on). Our feeling was: why check in this whole dependency tree (and create a mess for binary add-ons) when we could just check in the package name and version and have the build process do the rest?

Finally, the approach of checking in node\_modules doesn't really scale for us. We've got at least a dozen repos that will use restify, and it doesn't make sense to check that in everywhere when we could instead just specify which version each one is using. There's another principle at work here, which is **separation of concerns**: each repo specifies _what_ it needs, while the build process figures out _where to get it_.

## What if an author republishes an existing version of a package?

We're not suggesting deploying a shrinkwrapped package directly and running "npm install" to install from shrinkwrap in production. We already have a build process to deal with binary modules and other automateable tasks. That's where we do the "npm install". We tar up the result and distribute the tarball. Since we test each build before shipping, we won't deploy something we didn't test.

It's still possible to pick up newly published versions of existing packages at build time. We assume force publish is not that common in the first place, let alone force publish that breaks compatibility. If you're worried about this, you can use git SHAs in the shrinkwrap or even consider maintaining a mirror of the part of the npm registry that you use and require human confirmation before mirroring unpublishes.

## Final thoughts

Of course, the details of each use case matter a lot, and the world doesn't have to pick just one solution. If you like checking in node\_modules, you should keep doing that. We've chosen the shrinkwrap route because that works better for us.

It's not exactly news that Joyent is heavy on Node. Node is the heart of our SmartDataCenter (SDC) product, whose public-facing web portal, public API, Cloud Analytics, provisioning, billing, heartbeating, and other services are all implemented in Node. That's why it's so important to us to have robust components (like [logging](https://github.com/trentm/node-bunyan) and [REST](http://mcavage.github.com/node-restify/)) and tools for [understanding production failures postmortem](http://dtrace.org/blogs/dap/2012/01/13/playing-with-nodev8-postmortem-debugging/), [profile Node apps in production](http://dtrace.org/blogs/dap/2012/01/05/where-does-your-node-program-spend-its-time/), and now managing Node dependencies. Again, we're interested to hear feedback from others using these tools.

---

Dave Pacheco blogs at [dtrace.org](http://dtrace.org/blogs/dap/).

<p><a href="#note1-top" id="note1-note">[1]</a> Much of this section is taken directly from the "npm shrinkwrap" documentation.</p>
<p><a href="#note2-top" id="note2-note">[2]</a> We've had a lot of trouble with checking in node_modules with binary dependencies. The first problem is figuring out exactly which files <em>not</em> to check in (<em>.o, </em>.node, <em>.dynlib, </em>.so, *.a, ...). When <a href="https://twitter.com/#!/mcavage">Mark</a> went to apply this to one of our internal services, the "npm rebuild" step blew away half of the dependency tree because it ran "make clean", which in dependency <a href="http://ldapjs.org/">ldapjs</a> brings the repo to a clean slate by blowing away its dependencies. Later, a new (but highly experienced) engineer on our team was tasked with fixing a bug in our Node-based DHCP server. To fix the bug, we went with a new dependency. He tried checking in node_modules, which added 190,000 lines of code (to this repo that was previously a few hundred LOC). And despite doing everything he could think of to do this correctly and test it properly, the change broke the build because of the binary modules. So having tried this approach a few times now, it appears quite difficult to get right, and as I pointed out above, the lack of actual documentation and real world examples suggests others either aren't using binary modules (which we know isn't true) or haven't had much better luck with this approach.</p>
<p><a href="#note3-top" id="note3-note">[3]</a> Like a good Node-based distributed system, our architecture uses lots of small HTTP servers. Each of these serves a REST API using <a href="http://mcavage.github.com/node-restify/">restify</a>. restify uses the binary module <a href="https://github.com/chrisa/node-dtrace-provider">node-dtrace-provider</a>, which gives each of our services <a href="http://mcavage.github.com/node-restify/#DTrace">deep DTrace-based observability for free</a>. So literally almost all of our components are or will soon be depending on a binary add-on. Additionally, the foundation of <a href="http://dtrace.org/blogs/dap/2011/03/01/welcome-to-cloud-analytics/">Cloud Analytics</a> are a pair of binary modules that extract data from <a href="https://github.com/bcantrill/node-libdtrace">DTrace</a> and <a href="https://github.com/bcantrill/node-kstat">kstat</a>. So this isn't a corner case for us, and we don't believe we're exceptional in this regard. The popular <a href="https://github.com/pietern/hiredis-node">hiredis</a> package for interfacing with redis from Node is also a binary module.</p>
<p><a href="#note4-top" id="note4-note">[4]</a> Note that I said this is an important principle for <em>software version control</em>, not using git in general. People use git for lots of things where checking in binaries and other derived files is probably fine. Also, I'm not interested in proselytizing; if you want to do this for software version control too, go ahead. But don't do it out of ignorance of existing successful software engineering practices.</p>

</details>
