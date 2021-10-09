---
title: Notes from the Road
author: tjfontaine
date: 2014-06-11T16:00:00.000Z
status: publish
category: Uncategorized
slug: notes-from-the-road
layout: blog-post.hbs
---

## Notes from the Road

As Project Lead for Node.js, I was excited to have the opportunity to go on the
road and bring production stories to all of our users. We've had amazing
speakers and turn out in San Francisco, Seattle, Portland, Boston, and New
York. But I wanted to make sure we reached more than just our coasts, so soon
we'll be in
[Minneapolis](http://www.joyent.com/noderoad/cities/minneapolis-6-17-2014) and
I'll be returning to my home state of Ohio and doing an event in
[Cincinnati](http://www.joyent.com/noderoad/cities/cincinnati-6-19-2014). The
Node.js community is all over the world, and hopefully Node on the Road can
reach as many of you as it can. Nominate your city to be a future stop on the
Node.js on the Road series
[here](http://www.joyent.com/noderoad/cities/suggest).

These Node on the Road events are successful because of the incredible support
from the community and the existing meetup organizations in their respective
cities. But the biggest advantage is that the project gets to solicit feedback
directly from our users about what is and isn't working for them in Node.js,
what modules they're using, and where they need Node to do better.

## Release schedules

Some of the feedback we've received has been about the upgrade process for
Node. Veteran Node.js alums will occasionally sit around campfires and tell the
stories of when things would break every release, or how long they stayed on
0.4 before upgrading to 0.6. Some production companies are still out there
running on 0.8 afraid to make the jump to 0.10. While other companies advise
people to avoid upgrading to a new release of a Node version until the patch
number hits double digits. It's those sorts of stories that make it important
for us to get the release for 0.12 right, from the get go.

Node is in a fantastic place right now, it's maturing quickly and finding its
footing in new environments with new users and new use cases. The expectation
for Node is getting higher each day with every release. There are multiple
interests at stake, keeping Node lean, keeping it up to date with languages and
standards, keeping it fast, and balanced with keeping it stable such that we
don't upset the adoption rate. That means Node needs to make the right choices
that balance the needs of all of our users without closing the doors to others.

All of these conversations are helping to shape the release process going
forward, and helping to scope just what does go into a release and how fast
people want to see those happen. In fact something we've been considering is
eliminating the confusion around our Stable/Unstable branches, and instead
moving to releases that are always stable. But it's important that the features
and changes that go into a release are shaped by user feedback, which is why
events like Node on the Road are vital.

## Better Documentation

Another key piece of feedback has consistently been around our documentation.
Users need us to clean up our API reference documentation, there are lots of
undocumented and under-documented methods and properties that are being used or
should be used. Node needs to include what errors may be delivered as part of
the operation of your application, as well as what methods will throw and under
what circumstances.

But mostly users are looking for more general purpose documentation that can
help both new and veteran Node.js users be more productive with Node. And the
people who are most equipped to provide that documentation are the users
themselves who've already been successful.

## Easier Contribution

Aside from soliciting feedback from users of Node.js and bringing production
stories to our users, Node on the Road has also been about highlighting the
various ways you as a member of the community can contribute. There are many
ways you can contribute from meetups and conferences, to publishing modules, to
finding issues in modules or core, to fixing issues in modules or core, or even
adding features to modules or core. Where ever you are passionate about Node.js
there are ways you can contribute back to Node.

Node.js has inherited many things from our largest dependency V8, we've adopted
their build system GYP, we use their test runner (which is unfortunately in
python), and when we were structuring the project we brought along the
Contributor License Agreement (CLA) that Google uses to manage contributions
for Chromium and V8. The CLA is there as a way for a project to audit itself
and to give itself the opportunity to relicense itself in the future if
necessary. Node.js though is distributed under the venerable
[MIT](http://opensource.org/licenses/MIT) license, and that's not going to
change. The MIT license is one of the most permissible open source licenses out
there, and has fostered a ton of development with Node.js and we want that to
continue.

In an effort to make it easier for users to contribute to Node.js the project
has decided to lift the requirement of signing the CLA before contributions are
eligible for integration. Having to sign the CLA could at times be a stumbling
block for a contribution. It could involve a long conversation with your legal
department to ultimately contribute typo corrections.

I'm excited to see what contributions will be coming from the community in the
future, excited to see where our users take Node.js, and excited to be
participating with all of you on this project.
