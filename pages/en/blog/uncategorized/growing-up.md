---
date: '2011-12-15T19:59:15.000Z'
category: uncategorized
title: Growing up
layout: blog-post.hbs
author: ryandahl
---

This week Microsoft announced [support for Node in Windows Azure](https://www.windowsazure.com/en-us/develop/nodejs/), their cloud computing platform. For the Node core team and the community, this is an important milestone. We've worked hard over the past six months reworking Node's machinery to support IO completion ports and Visual Studio to provide a good native port to Windows. The overarching goal of the port was to expand our user base to the largest number of developers. Happily, this has paid off in the form of being a first class citizen on Azure. Many users who would have never used Node as a pure Unix tool are now up and running on the Windows platform. More users translates into a deeper and better ecosystem of modules, which makes for a better experience for everyone.

We also redesigned [our website](https://nodejs.org/) - something that we've put off for a long time because we felt that Node was too nascent to dedicate marketing to it. But now that we have binary distributions for Macintosh and Windows, have bundled npm, and are [serving millions of users](https://twitter.com/#!/mranney/status/145778414165569536) at various companies, we felt ready to indulge in a new website and share of a few of our success stories on the home page.

Work is on-going. We continue to improve the software, making performance improvements and adding isolate support, but Node is growing up.
