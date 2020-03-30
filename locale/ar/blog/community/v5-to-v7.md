---
title: Farewell to Node.js v5, Preparing for v7
date: 2016-09-06T23:36:16.645Z
status: publish
category: Announcements
slug: v5-to-v7
layout: blog-post.hbs
author: Rod Vagg
---

You may have missed it but at the end of June, the Node.js project said a final farewell to version 5. There will be no more patches, critical or otherwise, for this branch. To those who have been using Node.js for some time this may seem anomalous, shouldn't major versions stick around for _years_?

## We have a plan!

![LTS Schedule Summary](/static/images/blog/201609_lts_schedule_summary.gif)

Last year, the core team devised a Long-term Support (LTS) and release plan to balance the various wants and needs expressed by Node.js users. Chief among those were:

1. Stability
2. Progress

The io.js diversion was useful for many reasons, including the opportunity we had to lean into this "progress" thing. We learned that there is a necessary trade-off between "stability" and the rapid iteration of the platform. Some of it was manageable but much was unavoidable. Breaking the entire C++ add-on ecosystem each time we upgraded V8 turned out to be quite painful for the Node.js package ecosystem. This is due to the heavy reliance on compiled native components in Node.js userland and the difficulty Node.js has had in maintaining [API](https://en.wikipedia.org/wiki/Application_programming_interface) and [ABI](https://en.wikipedia.org/wiki/Application_binary_interface) stability while upgrading V8.

On the flip side, it was clear that v0.10 went on far too long and the slow downward trend in release frequency was hurting the platform's reputation for being innovative and _modern_ and was preventing iteration on the features and fixes that Node.js actually needed. This was one of the key reasons io.js even existed.

So, all this experience and history put us in a position to try and formulate a plan for combining both stability and progress. We didn't just find a compromise, we found a way that these often competing goals could coexist.

## Which brings me to Node.js v5.

Every 6 months, we plan to release a new _major_ version of Node.js. The version is _major_ in the [semver](http://semver.org/) sense in that we hold back breaking changes on our master branch until the 6 month point where we can release them together in a batch. The creation of these new release lines occur during April and October each year. Even version numbers happen to come in the April release while odd version numbers are in the October release.

Each major version of Node.js has an active life of 6 months in what we are now calling "Current". During this period we ship most of the active work that goes in to the Node.js codebase except for some items that we reserve for the next major release. Node.js version 5 was first released in October last year, so its "Current" period ended in April this year. At the end of this 6 month period, something different happens for odd and even versioned release lines. The even versions turn in to LTS and receive another 30 months of life; this happened for version 4 in October last year and will happen for version 6 in October this year. The odd versions, however, don't get this extended life. Instead, as a transitionary measure, we provide another 2 months of support where we'll ensure that important fixes make it into that release line.

And this is exactly what happened to version 5. It lived as _Current_ for 6 months from October, 2015 to April, 2016 and then in a special Maintenance phase for another 2 months until June, 2016. At the end of June, we ceased supporting Node.js version 5 and it will no longer receive any fixes or updates from the core team _(although you're welcome to play with the `v5.x` branch on the [Node.js repository](https://github.com/nodejs/node) if it's important to you!)_

The core team is focusing all of its activities on the following release lines:

* v0.10 which will receive occasional critical fixes during its current Maintenance phase and will cease to be supported in October this year.
* v0.12 which will receive occasional critical fixes during its current Maintenance phase and will cease to be supported in December this year.
* v4 which is in Active LTS and is receiving more regular patches and occasional important feature additions, this will continue until October 2017 where it will switch to Maintenance and operate in a manner similar to v0.10 and v0.12 until April 2018.
* v6 which is still a Current release, due to become our second LTS release in October where its life will continue under Active LTS and Maintenance until April 2019.
* v7 is being planned for a release in October this year at the same time that we switch v6 to LTS. You can already try out nightly builds from our `master` branch at <https://nodejs.org/download/nightly> but expect to see a focus on quality and stability of these in the coming months as we create a `v7.x` branch and becoming more choosy about what gets to make it in to v7.0.0.

It sounds like a lot, but once we move beyond the legacy v0.12 and v0.10 release lines we expect the steady cadence of major versions and their various releases to become easier to understand.

Armed with this knowledge, what's next for you? We suggest you make a judgement on the stability and quality requirements for your own use of Node.js and pick a release line that suits. For production deployments of Node.js we generally recommend version 4 where stability is taken very seriously. For everyday development, non-critical deployments and where Node.js is used as part of a toolchain (e.g. for building frontend components), a Current release should work just fine. We'd love your help testing nightly builds of the next major version of Node.js and while we do continuous unit testing and smoke testing of our `master` branch, we can't provide any assurances of stability or quality of these nightly builds, so buyer beware.
