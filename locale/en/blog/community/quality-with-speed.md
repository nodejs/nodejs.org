---
title: Node.js - Quality with Speed
date: 2017-02-22T14:41:04.442Z
status: publish
category: Community
slug: quality-with-speed
layout: blog-post.hbs
author: Michael Dawson and Myles Borins
---

# Node.js - Quality with Speed

One of the key tenets of the Node.js community is to allow change
at a rapid pace in order to foster innovation and to allow Node.js
to be used in a growing number of use cases.

At the same time the community values quality. Newer versions of
the runtime must be as good or better than earlier versions and must
not un-intentionally break existing applications.

Instead of trading off one for the other, the community looks for the path
that allows us to maintain our rate of change while ensuring the
required level of quality.

Many of the activities undertaken by the community over the last year
are in support of this goal.

This is our take on how these activities fit together.

# Key strategies

Several key strategies are in place to build the safety
net in order to enable change/innovation while maintaining
quality. These include:

* Different release types
* Change flow processes
* Enhancement Proposal process
* Automation and Testing
  * Functional Tests
  * Module Testing
  * Stress Testing
  * Platform/OS coverage
  * Development Workflows
* Performance Benchmarks
* Tools

# Release Types

The Node.js project maintains 3 key types of releases

* Nightlies
* Current
* LTS

Having different release types allows innovation/change
to flow rapidly into Nightly builds where we can get
early feedback on upcoming changes.
When ready, these changes then transition
to Current and LTS releases in a more controlled manner,
such that the level of quality/stability increases at
each level.

## Nightlies

These are built from master and contain the very latest changes
that have been landed. If you want to try out the bleeding edge
these are the binaries to use. There is no additional testing
on these releases, however, the standard Node.js unit tests are
run for each change landed so these will most often be usable.

## Current

Changes which have landed in master are backported to Current
on a regular basis. In general all changes that land in master
will be backported to Current, however there may be a lag if
there are specific concerns or for larger changes where the community
believes more soak time is required. One key exception is
that semver breaking changes will not be backported until the
next major version (ex 5 -> 6). This includes V8 and other
components such that the expectation is that an application/module
written to run on a major level will continue to do so.

These releases are documented in the changelog so
there is more visibility with respect to the changes in each release.
Current releases are created roughly every 1-2 weeks.

In addition to the regular Node.js unit tests, CITGM (see
later sections) is run on Current releases.

If you want to try out the latest with a reasonable expectation
that your application will continue to run, these are the releases
to use.

## LTS

Once changes have been proven in the Current stream, they are candidates
for the LTS streams. In the first stage of LTS (Active)
changes are limited to:

* Bug fixes
* Security updates
* Non-semver-major npm updates
* Relevant documentation updates
* Certain performance improvements where the risk of
  breaking existing applications is minimal
* Changes that introduce large amount of code churn where
  the risk of breaking existing applications is low and
  where the change in question may significantly ease the
  ability to backport future changes due to the reduction in diff noise.

Further, in the second stage of an LTS release (Maintenance), only
**critical** bugs and **critical** security fixes will be included.

Like Current releases, CITGM (see
later sections) is run on LTS releases. In addition we also
track performance through nightly benchmarks reported on
[benchmarking.nodejs.org](https://benchmarking.nodejs.org) (See later sections).

You can read more about the LTS releases [here](https://github.com/nodejs/lts).

If you want the best level of stability/quality for your production
applications these are the releases to use.

# Change flow processes

We've already touched on this in the discussion on the different release
types but we'll expand on this strategy here.

The main idea is that as changes flow from Nightlies, to Stable, to LTS
Active, to LTS Maintenance we increase the following:

* scrutiny
* time

Changes going into master are well reviewed and time is allowed
(minimum 48 to 72 hours) for as many community members as possible
to comment and review. However, as we all know, some problems
will still get through.

Before changes are pulled into Current from the Nightly builds, they will have
spent more time in master where intermittent issues may surface in the
ongoing regressions runs and this provides time where users may more fully
exercise the release and report issues. Further, there is an additional
review/sanity check that they are not breaking as they are pulled over to
Current.

Similarly, before changes are pulled into an LTS update release,
they must have been in a
Current release version for at least a week, and are often left longer.
This provides additional time where users may more fully
exercise the changes and report issues. In addition, changes are more
carefully reviewed as they are pulled into LTS, again reducing the
chance that unintentional breaking changes make it through. As an LTS
release ages, particularly once it reaches maintenance, the scope of
changes that will be pulled in narrows, further reducing the risk.

When it comes to new LTS versions, changes will have soaked in the latest
release for up to 6 months. In particular, larger changes like an upgrade
to V8 are done early in the lifespan of the stream such that they will have
significant soaking and usage in the Current stream before they make it
into an LTS release.

This strategy allows for rapid innovation/change, with releases being available
where those changes can be used/validated and a funnel through which
these can flow in an appropriate manner into releases used by more
risk-averse community members.

# Enhancement Proposal Process

Some changes are of such scope that they cannot simply be reviewed in a
pull request. There are often larger questions that will factor into the
decision as to whether the change proposed is desirable or appropriate
for the Node.js runtime.

The strategy for these changes is the "enhancement proposal" process. The
proposed change is documented, discussed and moves through a number of
stages including DRAFT and ACCEPTED or REJECTED. You can read more on
the process [here](https://github.com/nodejs/node-eps#progress-of-an-ep).

This process ensures that larger changes can be discussed in advance and agreed
by the community, allowing the final review of the pull request to focus
on implementation. The result being that the merits of the concept can be
discussed at the appropriate level of abstraction without having to
review all of the technical details.

# Automation and Testing

Automation and Testing are key strategies that go hand in hand in allowing
rapid change in a safe manner.

Automation avoids error-prone manual steps. Once you have a task automated
the likelihood of errors is orders of magnitude smaller than doing those
tasks by hand, particularly when those tasks are done by different
individuals.

One of our key tenets is to automate as much as we can. This ranges all
the way from the configuration of the machines in our build infrastructure
using Ansible, to automated jobs that build/sign/and release our binaries.

Automated Testing allows tests to be run often enough to catch regressions
quickly and reliably. Given a good set of tests, we can make changes
confident that we'll catch changes which introduce regressions.

There are many levels of testing and the strategy is to build our way
up the levels until we have as complete coverage as is reasonable.

These levels include:

* Functional Tests
* Platform/OS Coverage
* Dependency Testing
* Module Testing
* Stress Testing
* Development Workflows
* Use Case Testing

## Functional Tests

Functional tests are the first level of defense. Our collaborator guidelines
require test cases for all new features added, and our collaborators set a
high standard in respect to requiring tests.

It is not enough to simply have tests, those tests must be effective at
exercising the runtime. We measure code coverage nightly and publish
the results at [coverage.nodejs.org](https://coverage.nodejs.org/).
This allows us to ensure our tests remain effective and provides the data
necessary to further improve our tests.

You'll also notice that there has been a lot of effort put into making sure
the tests pass reliably and consistently. If you watch the continuous
integration (ci) runs you will see that they are mostly green
and intermittent failures are rare.

## Platform/OS Coverage

This is not a type of test by itself. But by applying the strategy of
running tests across a broad range of platforms and OS types and levels it
multiplies the effectiveness of the existing tests.

Issues which surface on a particular platform or OS often are not specific
to that platform or OS but instead are uncovered because of different timing,
default configuration or general environment. They could have occurred on any
of the other platforms.

Our strategy is to test on a broad range of platforms both to ensure Node.js
works on our supported platforms, but also to leverage the diversity to
uncover as many problems as early as possible.

## Dependency Testing

Node.js has a number of key dependencies. It's important that we ensure
that any changes we apply to those dependencies don't have a negative effect.

To this end we have a job which runs the V8 tests on the V8 tree within
the Node.js repo. This job runs nightly and on request for PRs that are
making changes to the V8 tree.

We don't currently run the tests for other dependencies, but the delta in
the Node.js tree for the dependencies other than V8 is more limited.

## Module Tests

Module tests are the next level of defense. They help to validate that
changes are not going to break for end users. Most applications use
a number of modules, and many of the most popular modules are extensively
used. Any changes that impact those modules would have a
significant community impact.

Our strategy is to run the module's own unit tests on a set of key modules
and to run these as often as possible. Currently they are run for
Current and LTS releases and we are working to increase that frequency.

You can read more about our module testing efforts in
[https://github.com/nodejs/citgm/](https://github.com/nodejs/citgm/).

## Stress Tests

Some problems only surface after running for a long time. Stress tests help
to flush those out by running certain scenarios over a prolonged period
of time.

We don't have any stress tests running at this point but it will be our next
priority after we have module testing running at an appropriate frequency.

## Development Workflows

Development Workflows is another level up from Module Testing. It aims
to test common development workflows to ensure changes will not introduce
any regressions to those flows.

These are more work to put in place and run but they will be next on our
list after getting stress tests in place.

## Use Case Testing

This would be the next logical step after Development Workflows, testing
for the common use cases for Node.js.

Our current strategy is to get some of this coverage through the
benchmarking that we put in place, but it is another area we can work
on once we have the other levels of testing in place.

# Performance Benchmarks

While ensuring functional stability is good, its not enough. We also need
to make sure that performance is not degraded as changes flow in.

Our strategy is to define the common use cases for Node.js and then
build up a set of benchmarks that we run and publish results for on a
regular basis. This work is ongoing in the
[Benchmarking Working Group](https://github.com/nodejs/benchmarking),
but we already have a number of key benchmarks being run nightly
across the major Node.js versions. You can view this data at:

[https://benchmarking.nodejs.org/](https://benchmarking.nodejs.org/).

This data allows us to ensure we avoid performance regressions as
changes flow in.

# In Summary

This may have been a bit of a long read but I hope it has put a number
of the activities you may have seen in the Node.js community over the last
year into context. If you ever wondered "Why are they doing that?", the answer is:

**Node.js - Quality with Speed**
