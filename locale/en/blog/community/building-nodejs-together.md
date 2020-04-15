---
title: Building Node.js Together
author: tjfontaine
date: 2014-07-29T21:00:00.000Z
status: publish
category: Community
slug: building-nodejs-together
layout: blog-post.hbs
---

Node.js is reaching more people than ever, it's attracting new and interesting
use cases, at the same time as seeing heavy adoption from traditional
engineering departments. Managing the project to make sure it continues to
satisfy the needs of its end users requires a higher level of precision and
diligence. It requires taking the time to communicate and reach out to new and
old parties alike. It means seeking out new and dedicated resources. It means
properly scoping a change in concert with end users, and documenting and
regularly check pointing your progress. These are just some of the ways we're
working to improve our process, and work to deliver higher quality software
that meets our goals.

## Documentation

One of the big things we've wanted to do is to change the way the website
works, which is something I've [mentioned
before](http://blog.nodejs.org/2014/01/16/nodejs-road-ahead/). It should be a
living breathing website whose content is created by our end users and team.
The website should be the canonical location for documentation on how to use
Node.js, how Node.js works, and how to find out what's going on in the Node
community. We have seeded the initial documentation with [how to
contribute](https://nodejs.org/en/get-involved/contribute/), [who the core team
is](https://nodejs.org/en/about/organization/#index_md_technical_steering_committee),
and some basic documentation of the [project
itself](https://nodejs.org/en/about/organization). From there we're looking to
enable the community to come in and build out the rest of the framework for
documentation.

One of the key changes here is that we're extending the tools that generate API
documentation to work for the website in general. That means the website is now
written in markdown. Contributions work with the same
[pull-request](https://nodejs.org/en/get-involved/contribute/#code-contributions)
way as contributions to Node itself. The intent here is to be able to quickly
generate new documentation and improve it with feedback from the community.

The website should also be where we host information about where the project is
going and the features we're currently working on (more about that later). But
it's crucial we communicate to our end users what improvements will be coming,
and the reasons we've made those decisions. That way it's clear what is coming
in what release, and also can inspire you to collaborate on the design of that
API. This is not a replacement for our issue tracking, but an enhancement that
can allow us to reach more people.

## Features

Which brings us to the conversation about features. During the Q & A portions
of the [Node.js on the
Road](http://blog.nodejs.org/2014/06/11/notes-from-the-road/) events there are
often questions about what does and doesn't go into core. How the team
identifies what those features are and when you decide to integrate them. I've
spent a lot of time talking about that but I've also
[added](https://nodejs.org/en/about/organization) it to the new documentation on
the site.

It's pretty straight forward, but in short if Node.js needs an interface to
provide an abstraction, or if everyone in the community is using the same
interface, then those interfaces are candidates for being exposed as public
interfaces for Node. But what's important is that the addition of an API should
not be taken lightly. It is important for us to consider just how much of an
interface we can commit to, because once we add the API it's incredibly hard
for us to change or remove it. At least in a way that allows people to write
software that will continue to work.

So new features and APIs need to come with known use cases and consumers, and
with working test suites. That information is clearly and concisely present on
the website to reach as wide of an audience as possible. Once an implementation
meets those requirements it can be integrated into the project. Then and only
then, when we have an implementation that meets the design specification and
satisfies the test suite, will we be able to integrate it. That's how we'll
scope our releases going forward, that's how we'll know when we're ready to
release a new version of Node. This will be a great change for Node, as it's a
step forward on moving to an always production ready master branch.

## Quality Software

And it's because Node.js is focused on quality software and a commitment to
backwards compatibility that it's important for us to seek ways to get more
information from the community about when and where we might be breaking them.
Having downstream users test their code bases with recent versions of Node.js
(even from our master branch) is an important way we derive feedback for our
changes. The sooner we can get that information, the more test coverage we can
add, the better the software we deliver is.

Recently I had the opportunity to speak with [Dav
Glass](http://twitter.com/davglass) from [Yahoo!](http://yahoo.com), and we're
going to be finding ways to get automated test results back from some larger
test suites. The more automation we can get for downstream integration testing
the better the project can be at delivering quality software.

If you're interested in participating in the conversation about how Node.js can
be proactively testing your software/modules when we've changed things, please
[join the conversation](http://github.com/joyent/node/issues).

## Current release

Before we can release v0.12, we need to ensure we're providing a high quality
release that addresses the needs of the users as well as what we've previously
committed to as going into this release. Sometimes what can seem like an
innocuous change that solves an immediate symptom, doesn't actually treat the
disease, but instead results in other symptoms that need to be treated.
Specifically in our streams API, it can be easy to subtly break people while
trying to fix another bug with good intent.

This serves as a reminder that we need to properly scope our releases. We need
to know who the consumers are for new APIs and features. We need to make sure
those features' test cases are met. We need to make sure we're adopting APIs
that have broad appeal. And while we're able to work around some of these
things through external modules and experimenting with JavaScript APIs, that's
not a replacement for quality engineering.

Those are the things that we could have done better before embarking on 0.12,
and now to release it we need to fix some of the underlying issues. Moving
forward I'm working with consumers of the tracing APIs to work on getting a
maintainable interface for Node that will satisfy their needs. We'll publicly
document those things, we'll reach out to other stakeholders, and we'll make
sure that as we implement that we can deliver discretely on what they need.

That's why it's important for us to get our releases right, and diagnose and
fix root causes. We want to make sure that your first experience with 0.12
results in your software still working. This is why we're working with large
production environments to get their feedback, and we're looking for those
environments and you to [file bugs](https://github.com/joyent/node/issues) that
you find.

## The Team

The great part about Node's contribution process and our fantastic community is
that we have a lot of very enthusiastic members who want to work as much as
possible on Node. Maybe they want to contribute because they have free time,
maybe they want to contribute to make their job easier, or perhaps they want to
contribute because their company wants them to spend their time on open source.
Whatever the reason, we welcome contributions of every stripe!

We have our core team that manages the day to day of Node, and that works
mostly by people wanting to maintain subsystems. They alone are not solely
responsible for the entirety of that subsystem, but they guide its progress by
communicating with end users, reviewing bugs and pull requests, and identifying
test cases and consumers of new features. People come and go from the core
team, and recently we've added [some
documentation](https://nodejs.org/en/about/organization) that describes how you
find your way onto that team. It's based largely around our contribution
process. It's not about who you work for, or about who you know, it's about
your ability to provide technical improvement to the project itself.

For instance, Chris Dickinson was recently hired to work full time on Node.js,
and has expressed interest in working on the current and future state of
streams. But it's not who employs Chris that makes him an ideal candidate, but
it will be the quality of his contributions, and his understanding of the ethos
of Node.js. That's how we find members of the team. And Chris gets that, in
[his blog](http://neversaw.us/2014/05/08/on-joining-walmart-labs/) about
working full time on Node.js he says (and I couldn't have said it better
myself):

> I will not automatically get commit access to these repositories — like any
> other community member, I will have to continually submit work of consistent
> quality and put in the time to earn the commit bit. The existing core team will
> have final say on whether or not I get the commit bit — which is as it should
> be!

Exactly. And not only does he understand how mechanism works, but he's [already
started](http://neversaw.us/2014/07/13/june-recap/) getting feedback from
consumers of streams and documenting some of his plans.

In addition to Chris being hired to work full time on Node.js, Joyent has
recently hired [Julien Gilli](https://github.com/misterdjules) to work full
time with me on Node. I'm really excited for all of the team to be seeking out
new contributors, and getting to know Chris and Julien. They're both fantastic
and highly motivated, and I want to do my best to enable them to be successful
and join the team. But that's not all, I've been talking to other companies who
are excited to participate in this model, and in fact
[Modulus.io](http://modulus.io) themselves are looking to find someone this
year to work full time on Node.js.

Node.js is bigger than the core team, it's bigger than our community, and we
are excited to continue to get new contributors, and to enable everyone. So
while we're working on the project we can't just focus on one area, but instead
consider the connected system as a whole. How we scale Node, how we scale the
team, how we scale your contributions, and how we integrate your feedback --
this is what we have to consider while taking this project forward, together.
