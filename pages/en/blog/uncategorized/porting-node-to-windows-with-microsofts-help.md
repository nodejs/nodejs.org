---
date: '2011-06-23T22:22:58.000Z'
category: uncategorized
title: 'Porting Node to Windows With Microsoft’s Help'
layout: blog-post.hbs
author: ryandahl
---

I'm pleased to announce that Microsoft is partnering with Joyent in formally contributing resources towards porting Node to Windows. As you may have heard in [a talk](/static/documents/nodeconf.pdf) we gave earlier this year, we have started the undertaking of a native port to Windows - targeting the high-performance IOCP API.

This requires a rather large modification of the core structure, and we're very happy to have official guidance and engineering resources from Microsoft. [Rackspace](https://www.cloudkick.com/) is also contributing [Bert Belder](https://github.com/piscisaureus)'s time to this undertaking.

The result will be an official binary node.exe releases on nodejs.org, which will work on Windows Azure and other Windows versions as far back as Server 2003.
