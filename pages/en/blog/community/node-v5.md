---
date: '2015-10-30T12:00:00.000Z'
category: community
title: What You Should Know about Node.js v5 and More
layout: blog-post.hbs
author: The Node.js Project
---

## There’s Something New with Node.js Releases

We just released [Node.js v5.0.0](/blog/release/v5.0.0/). You might be thinking to yourself: These folks just released [Node.js v4.2.1](/blog/release/v4.2.1/) “Argon,” under the new Long Term Support (LTS) plan, now I need to download this? The answer is yes and no.

Node.js is growing, and growing fast. As we continue to innovate quickly, we will focus on two different release lines. One release line will fall under our **LTS** plan. All release lines that have LTS support will be even numbers, and (most importantly) focus on stability and security. These release lines are for organizations with complex environments that find it cumbersome to continually upgrade. We recently released the first in this line: [Node.js v4.2.1](/blog/release/v4.2.1/) “Argon.”

The other release line is called **Current**. All release lines will be odd numbers, and have a shorter lifespan and more frequent updates to the code. The Current release line will focus on active development of necessary features and refinement of existing APIs. Node.js version 5 is this type of release.

We want to make sure that you are adopting the release that best meets your Node.js needs, so to break it down:

Stay on or upgrade to Node.js v4.2.x if you need stability and have a complex production environment, e.g. you are a medium or large enterprise.

Upgrade to Node.js v5.x if you have the ability to upgrade versions quickly and easily without disturbing your environment.

Now that you have the very basics, let’s take a deeper look at the new features and characteristics of v5, and the benefits and details of our LTS plan.

## Introduction to Node.js v5

[Node.js v5](/blog/release/v5.0.0/) is an intermediate feature release line that is best suited for users who have an easier time upgrading their Node.js installations, such as developers using the technology for front-end toolchains. This version will be supported for a maximum of only eight months and will be continually updated with new features and better performance; it is not supported under our LTS plan.

The release cadence for v5.x will be more rapid than in the past. Expect a new release once every one to two weeks for v5.x. If upgrading is a challenge for you, we suggest you do not use this release. There will be significant ongoing development. The focus is on getting the releases to users as soon as possible.

npm has been upgraded to v3 in Node.js v5.0.0, which (amongst other changes) will install dependencies as flat as possible in node_modules. v5.0.0 also comes with V8 4.6, which ships the [new.target](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target) and [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) JavaScript language features. If you want to learn more about other technical details around this, please check out our [release post](/blog/release/v5.0.0/).

It’s another top-quality release from us, and we are averaging roughly 50 unique contributors per month to the codebase. We are extremely excited with all the enthusiasm and amazing work that is going into this Node.js v5 and future releases.

## What Is Long Term Support and Why Does It Matter to Me?

First and foremost, if you haven’t read the [Essential Steps: Long Term Support (LTS) for Node.js by Rod Vagg](https://medium.com/@nodesource/essential-steps-long-term-support-for-node-js-8ecf7514dbd#.hi7hosy92), Technical Steering Committee Chairperson at the Node.js Foundation and the Chief Node Officer at NodeSource, do so. It’s a very helpful source for understanding our release cycle process. If you only have two minutes now, here is a quick summary:

- The point of establishing an LTS plan for Node.js is to build on top of an existing stable release cycle by delivering new versions on a predictable schedule that have a clearly defined extended support lifecycle. It is an essential requirement for enterprise application development and operations teams. It also affects companies that provide professional support for Node.js.

- As stated above, the first LTS release line is v4 “Argon," beginning at v4.2.0 and currently standing at v4.2.1. The next LTS release line will begin in 12 months around the first week of October 2016. All LTS release lines will begin at the same time each year.

- All LTS release lines are assigned a “codename” drawn from the names of the elements on the Periodic Table.

- The LTS release line will be actively maintained for a period of 18 months from the date the LTS release line begins. After 18 months have passed, it will transition into Maintenance mode.

- There will be no more than two active LTS release lines at any given time. Overlap is intended to help ease migration planning.

- Once a Current release line becomes LTS, no new features or breaking changes will be added to that release. Changes are limited to bug fixes for stability, security updates, possible npm updates, documentation updates and certain performance improvements that can be demonstrated to not break existing applications.

## Questions?

If you have any questions you can always connect with us on our [help](https://github.com/nodejs/help) repository. If you encounter an issue log or bug with Node.js v5, please report to our main code repository [here](https://github.com/nodejs/node/issues).
