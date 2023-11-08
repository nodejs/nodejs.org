---
date: '2011-05-01T15:09:45.000Z'
category: npm
title: 'npm 1.0: Released'
layout: blog-post.hbs
author: Isaac Schlueter
---

npm 1.0 has been released. Here are the highlights:

- [Global vs local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation/)
- [ls displays a tree](http://blog.nodejs.org/2011/03/17/npm-1-0-the-new-ls/), instead of being a remote search
- No more “activation” concept - dependencies are nested
- [Updates to link command](http://blog.nodejs.org/2011/04/06/npm-1-0-link/)
- Install script cleans up any 0.x cruft it finds. (That is, it removes old packages, so that they can be installed properly.)
- Simplified “search” command. One line per package, rather than one line per version.
- Renovated “completion” approach
- More help topics
- Simplified folder structure

The focus is on npm being a development tool, rather than an apt-wannabe.

## <!-- installing_it -->Installing it

To get the new version, run this command:

```
curl https://npmjs.com/install.sh | sh
```

This will prompt to ask you if it’s ok to remove all the old 0.x cruft. If you want to not be asked, then do this:

```
curl https://npmjs.com/install.sh | clean=yes sh
```

Or, if you want to not do the cleanup, and leave the old stuff behind, then do this:

```
curl https://npmjs.com/install.sh | clean=no sh
```

A lot of people in the node community were brave testers and helped make this release a lot better (and swifter) than it would have otherwise been. Thanks :)

## <!-- code_freeze -->Code Freeze

npm will not have any major feature enhancements or architectural changes for at least 6 months. There are interesting developments planned that leverage npm in some ways, but it’s time to let the client itself settle. Also, I want to focus attention on some other problems for a little while.

Of course, [bug reports](https://github.com/isaacs/npm/issues) are always welcome.

See you at NodeConf!
