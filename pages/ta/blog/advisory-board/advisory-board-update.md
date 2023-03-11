---
title: Advisory Board Update
date: 2014-12-03T18:00:00.000Z
author: Timothy J Fontaine
slug: advisory-board-update
layout: blog-post.hbs
---

A lot has been happening in Node.js, so I wanted to bring everyone up to date on
where we are with regards to the advisory board, its working groups, and the
release of v0.12.

The interim [advisory
board](https://www.joyent.com/blog/node-js-advisory-board) has met three times
since its creation. You can find the minutes from the advisory board meetings
here: [https://nodejs.org/en/about/advisory-board/](https://nodejs.org/en/about/advisory-board/). As
we have more meetings and minutes, we will announce the dates and times for
those meeting and their minutes here on the blog. The next meeting is this
Thursday December 4th, at 1:30PM PST. We're looking to collect as much feedback
and input from as many representatives of the community as we can, so it's
important that we keep everyone up to date as much as possible.

The interim advisory board has been working through a series of topics (in
general meetings as well as working groups) to further hone the scope of the
board, as well as define the structure that the advisory board will use to
conduct its meetings. Everyone on the board wants to make sure we're being as
transparent as possible, so let me describe how things operate so far. The
board is using a traditional two conference call structure, a public portion
that is recorded and open for anyone to join, and a private portion that is
only for board members.

The public portion is meant to provide an update of what happened in the
previous meeting, as well as the status of action items from the previous
meeting. At the end of each public session is a open comment section, where
listeners are able to ask questions and the advisory board can respond.

Following the public portion the board dials into the private conference,
further discussion happens during this time around specific agenda items,
working groups providing updates, and facilitating conversations about those
topics. These conversations are open and frank, and their content is recorded
in the minutes. Those minutes are then published a few days after the meeting
in the GitHub repository
[https://github.com/joyent/nodejs-advisory-board](https://github.com/joyent/nodejs-advisory-board),
as well as on the website
[https://nodejs.org/en/about/advisory-board/](https://nodejs.org/en/about/advisory-board/).

There are a few working groups so far, for instance one is focused on making
sure the membership of the board is representative of the community Node.js
serves. While the board was initially bootstrapped with its existing
membership, we want to quickly move to a model that fully represents our
community. We want the board to represent the broadest spectrum of our
community, that also enables the board to move swiftly and make progress.

Another working group is having a conversation about governance. This includes
topics like what is the team that makes decisions for Node.js, how do you
become a member of that team, how does that team set the roadmap for the
project, and how does that team makes decisions.

One thing that we all agree on, is that we're not going to be using the
Benevolent Dictator model. In fact, recently the project hasn't been operating
that way. We can be more clear about that in our
[documentation](https://nodejs.org/en/about/organization). We all agree we want
a healthy and vibrant team, a team focused on making progress for Node.js, not
for progress's sake, but for the betterment of the software project and the
community we serve. We also agree that this means that there should be
consensus among the team. The conversation has been fruitful, and is on going,
we're continuing to work through the finer points of how much consensus we
need.

I want to take a moment to describe what consensus means in this context. The
consensus model is about accountability. Accountability for the changes being
integrated into the project, accountability for documentation, and
accountability for releases. While members of the team are responsible for
subsystems or features of Node.js, everyone reviews each others changes. They
make sure to understand the impact on their relevant responsibilities.

The goal of the team, especially that of the project lead, is to drive
consensus and ensure accountability. This means asking critical questions and
being able to answer them specifically and succinctly, for example:

* What are we trying to solve with this change?
* Does this change effectively solve for this problem?
* Does this API have a consumer?
* Does this API reach the broadest amount of use cases?
* Is this API supportable?
* Does this change have adverse effects on other subsystems or use cases (and is that acceptable)?
* Does this change have tests that verify its operation, now and in the future?
* Does this change pass our style guidelines?
* Does this change pass our integration tests for the matrix of our supported configurations?
  * For instance: ia32 and x64 for Windows, Linux, OSX, SmartOS

These are just some of the questions, and while the questions are not unusual
or unique to Node.js, they are still important.

Finally, we are very close to releasing v0.12, there's only one major patch
we're waiting to land. Once that's done we'll be releasing v0.11.15 as a
release candidate. Assuming no severe issues are filed against v0.11.15 we will
be going live with v0.12 about two weeks after the v0.11.15 release.

If you have questions for the advisory board you can email
[advisoryboard@nodejs.org](mailto:advisoryboard@nodejs.org) or file an issue on
its repository
[https://github.com/joyent/nodejs-advisory-board](https://github.com/joyent/nodejs-advisory-board).
Thanks for all of your continued contributions to Node.js, in the form of
[filing issues](https://github.com/joyent/node/issues), [submitting pull
requests](https://github.com/joyent/node/pulls), and publishing your modules.
Node.js is lucky to have such an enthusiastic and engaged community, and we're
excited to be working with you on the future of Node.js.
