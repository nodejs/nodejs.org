---
title: libuv status report
author: ryandahl
date: 2011-09-23T19:45:50.000Z
status: publish
category: Uncategorized
slug: libuv-status-report
layout: blog-post.hbs
---

We [announced](http://blog.nodejs.org/2011/06/23/porting-node-to-windows-with-microsoft%E2%80%99s-help/) back in July that with Microsoft's support Joyent would be porting Node to Windows. This effort is ongoing but I thought it would be nice to make a status report post about the new platform library [`libuv`](https://github.com/libuv/libuv) which has resulted from porting Node to Windows.

`libuv`'s purpose is to abstract platform-dependent code in Node into one place where it can be tested for correctness and performance before bindings to V8 are added. Since Node is totally non-blocking, `libuv` turns out to be a rather useful library itself: a BSD-licensed, minimal, high-performance, cross-platform networking library.

We attempt to not reinvent the wheel where possible. The entire Unix backend sits heavily on Marc Lehmann's beautiful libraries [libev](http://software.schmorp.de/pkg/libev.html) and [libeio](http://software.schmorp.de/pkg/libeio.html). For DNS we integrated with Daniel Stenberg's [C-Ares](http://c-ares.haxx.se/). For cross-platform build-system support we're relying on Chrome's [GYP](http://code.google.com/p/gyp/) meta-build system.

The current implemented features are:

* Non-blocking TCP sockets (using IOCP on Windows)
* Non-blocking named pipes
* UDP
* Timers
* Child process spawning
* Asynchronous DNS via [c-ares](http://c-ares.haxx.se/) or `uv_getaddrinfo`.
* Asynchronous file system APIs `uv_fs_*`
* High resolution time `uv_hrtime`
* Current executable path look up `uv_exepath`
* Thread pool scheduling `uv_queue_work`

The features we are working on still are

* File system events (Currently supports inotify, `ReadDirectoryChangesW` and will support kqueue and event ports in the near future.) `uv_fs_event_t`
* VT100 TTY `uv_tty_t`
* Socket sharing between processes `uv_ipc_t` ([planned API](https://gist.github.com/1233593))

For complete documentation see the header file: [include/uv.h](https://github.com/libuv/libuv/blob/03d0c57ea216abd611286ff1e58d4e344a459f76/include/uv.h). There are a number of tests in [the test directory](https://github.com/libuv/libuv/tree/3ca382be741ec6ce6a001f0db04d6375af8cd642/test) which demonstrate the API.

`libuv` supports Microsoft Windows operating systems since Windows XP SP2. It can be built with either Visual Studio or MinGW. Solaris 121 and later using GCC toolchain. Linux 2.6 or better using the GCC toolchain. Macinotsh Darwin using the GCC or XCode toolchain. It is known to work on the BSDs but we do not check the build regularly.

In addition to Node v0.5, a number of projects have begun to use `libuv`:

* Mozilla's [Rust](https://github.com/graydon/rust)
* Tim Caswell's [LuaNode](https://github.com/creationix/luanode)
* Ben Noordhuis and Bert Belder's [Phode](https://github.com/bnoordhuis/phode) async PHP project
* Kerry Snyder's [libuv-csharp](https://github.com/kersny/libuv-csharp)
* Andrea Lattuada's [web server](https://gist.github.com/1195428)

We hope to see more people contributing and using `libuv` in the future!
