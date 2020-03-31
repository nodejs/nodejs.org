---
title: Development Environment
author: ryandahl
date: 2011-04-05T03:16:27.000Z
status: publish
category: Uncategorized
slug: development-environment
layout: blog-post.hbs
---

If you're compiling a software package because you need a particular version (e.g. the latest), then it requires a little bit more maintenance than using a package manager like `dpkg`. Software that you compile yourself should *not* go into `/usr`, it should go into your home directory. This is part of being a software developer.

One way of doing this is to install everything into `$HOME/local/$PACKAGE`. Here is how I install node on my machine:

```bash
./configure --prefix=$HOME/local/node-v0.4.5 && make install
```

To have my paths automatically set I put this inside my `$HOME/.zshrc`:

```bash
PATH="$HOME/local/bin:/opt/local/bin:/usr/bin:/sbin:/bin"
LD_LIBRARY_PATH="/opt/local/lib:/usr/local/lib:/usr/lib"
for i in $HOME/local/*; do
  [ -d $i/bin ] && PATH="${i}/bin:${PATH}"
  [ -d $i/sbin ] && PATH="${i}/sbin:${PATH}"
  [ -d $i/include ] && CPATH="${i}/include:${CPATH}"
  [ -d $i/lib ] && LD_LIBRARY_PATH="${i}/lib:${LD_LIBRARY_PATH}"
  [ -d $i/lib/pkgconfig ] && PKG_CONFIG_PATH="${i}/lib/pkgconfig:${PKG_CONFIG_PATH}"
  [ -d $i/share/man ] && MANPATH="${i}/share/man:${MANPATH}"
done
```

Node is under sufficiently rapid development that *everyone* should be compiling it themselves. A corollary of this is that `npm` (which should be installed alongside Node) does not require root to install packages.

CPAN and RubyGems have blurred the lines between development tools and system package managers. With `npm` we wish to draw a clear line: it is not a system package manager. It is not for installing firefox or ffmpeg or OpenSSL; it is for rapidly downloading, building, and setting up Node packages. `npm` is a *development* tool. When a program written in Node becomes sufficiently mature it should be distributed as a tarball, `.deb`, `.rpm`, or other package system. It should not be distributed to end users with `npm`.
