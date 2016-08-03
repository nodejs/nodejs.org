---
layout: about.hbs
title: Робочі групи
---
# Working Groups

There are 2 types of Working Groups:

* [Top-Level Working Groups](#top-level-working-groups)
* [Core Working Groups](#core-working-groups)

## Top-Level Working Groups

<!-- Information here should mostly mirror: https://github.com/nodejs/TSC/blob/master/WORKING_GROUPS.md -->

Top-Level Working Groups are created by the
[Technical Steering Committee (TSC)](https://github.com/nodejs/TSC#top-level-wgs-and-tlps).

### Current Top-Level Working Groups

* [Inclusivity](#inclusivity)

#### [Inclusivity](https://github.com/nodejs/inclusivity)

The Inclusivity Working Group seeks to increase inclusivity and diversity for
the Node.js project:

* Increasing inclusivity means making the Node.js project a safe and friendly
place for people from diverse backgrounds.
* Increasing diversity means actively onboarding people from diverse backgrounds
to the Node.js project and maintaining their participation.

Its responsibilites are:

* Foster a welcoming environment that ensures participants are valued and can
feel confident contributing or joining discussions, regardless of any [aspect of
their identity](https://github.com/nodejs/inclusivity/#list-of-responsibilities).
* Proactively seek and propose concrete steps the project can take to increase
inclusivity.
* Serve as a resource for the development and enforcement of workflows that
protect community members and projects from harassment and abuse.
* Acknowledge and celebrate existing diversity accomplishments within the project
while seeking to build upon them.
* Identify ways to measure diversity and inclusivity within the project and report
them at regular intervals.

# Core Working Groups

<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Core Working Groups are created by the
[Core Technical Committee (CTC)](https://github.com/nodejs/node/blob/master/GOVERNANCE.md#core-technical-committee).


## Current Working Groups

* [Website](#website)
* [Streams](#streams)
* [Build](#build)
* [Tracing](#tracing)
* [i18n](#i18n)
* [Evangelism](#evangelism)
* [Roadmap](#roadmap)
* [Docker](#docker)
* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Post-mortem](#post-mortem)
* [Intl](#intl)
* [HTTP](#http)
* [Documentation](#documentation)
* [Testing](#testing)


### [Website](https://github.com/nodejs/nodejs.org)

The website working group's purpose is to build and maintain a public
website for the `Node.js` project.

Its responsibilities are:

* Develop and maintain a build and automation system for `nodejs.org`.
* Ensure the site is regularly updated with changes made to `Node.js` like
releases and features.
* Foster and enable a community of translators.

### [Streams](https://github.com/nodejs/readable-stream)

The Streams WG is dedicated to the support and improvement of the Streams API
as used in Node.js and the npm ecosystem. We seek to create a composable API that
solves the problem of representing multiple occurrences of an event over time
in a humane, low-overhead fashion. Improvements to the API will be driven by
the needs of the ecosystem; interoperability and backwards compatibility with
other solutions and prior versions are paramount in importance. Our
responsibilities include:

* Addressing stream issues on the Node.js issue tracker.
* Authoring and editing stream documentation within the Node.js project.
* Reviewing changes to stream subclasses within the Node.js project.
* Redirecting changes to streams from the Node.js project to this project.
* Assisting in the implementation of stream providers within Node.js.
* Recommending versions of readable-stream to be included in Node.js.
* Messaging about the future of streams to give the community advance notice of changes.


### [Build](https://github.com/nodejs/build)

The build working group's purpose is to create and maintain a
distributed automation infrastructure.

Its responsibilities are:

* Produce Packages for all target platforms.
* Run tests.
* Run performance testing and comparisons.
* Creates and manages build-containers.


### [Tracing](https://github.com/nodejs/tracing-wg)

The tracing working group's purpose is to increase the
transparency of software written in Node.js.

Its responsibilities are:

* Collaboration with V8 to integrate with `trace_event`.
* Maintenance and iteration on AsyncWrap.
* Maintenance and improvements to system tracing support (DTrace, LTTng, etc.)
* Documentation of tracing and debugging techniques.
* Fostering a tracing and debugging ecosystem.

### i18n

The i18n working groups handle more than just translations. They
are endpoints for community members to collaborate with each
other in their language of choice.

Each team is organized around a common spoken language. Each
language community might then produce multiple localizations for
various project resources.

Their responsibilities are:

* Translations of any Node.js materials they believe are relevant to their
community.
* Review processes for keeping translations up
to date and of high quality.
* Social media channels in their language.
* Promotion of Node.js speakers for meetups and conferences in their
language.

Note that the i18n working groups are distinct from the [Intl](#Intl) working group.

Each language community maintains its own membership.

* [nodejs-ar - Arabic (اللغة العربية)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български език)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Český Jazyk)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (फिजी बात)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Mакедонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (Hō-ló)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việtnam)](https://github.com/nodejs/nodejs-vi)

### [Intl](https://github.com/nodejs/Intl)

The Intl Working Group is dedicated to support and improvement of
Internationalization (i18n) and Localization (l10n) in Node. Its responsibilities are:

1. Functionality & compliance (standards: ECMA, Unicode…)
2. Support for Globalization and Internationalization issues that come up in the tracker
3. Guidance and Best Practices
4. Refinement of existing `Intl` implementation

The Intl WG is not responsible for translation of content. That is the responsibility of the specific [i18n](#i18n) group for each language.

### [Evangelism](https://github.com/nodejs/evangelism)

The evangelism working group promotes the accomplishments
of Node.js and lets the community know how they can get involved.

Their responsibilities are:

* Project messaging.
* Official project social media.
* Promotion of speakers for meetups and conferences.
* Promotion of community events.
* Publishing regular update summaries and other promotional
content.

### [HTTP](https://github.com/nodejs/http)

The HTTP working group is chartered for the support and improvement of the
HTTP implementation in Node. It's responsibilities are:

* Addressing HTTP issues on the Node.js issue tracker.
* Authoring and editing HTTP documentation within the Node.js project.
* Reviewing changes to HTTP functionality within the Node.js project.
* Working with the ecosystem of HTTP related module developers to evolve the
  HTTP implementation and APIs in core.
* Advising the CTC on all HTTP related issues and discussions.
* Messaging about the future of HTTP to give the community advance notice of
  changes.

### [Roadmap](https://github.com/nodejs/roadmap)

The roadmap working group is responsible for user community outreach
and the translation of their concerns into a plan of action for Node.js.

The final [ROADMAP](https://github.com/nodejs/node/blob/master/ROADMAP.md) document is still
owned by the TC and requires the same approval for changes as any other project asset.

Their responsibilities are:

* Attract and summarize user community needs and feedback.
* Find or potentially create tools that allow for broader participation.
* Create Pull Requests for relevant changes to
[ROADMAP.md](https://github.com/nodejs/node/blob/master/ROADMAP.md)


### [Docker](https://github.com/nodejs/docker-node)

The Docker working group's purpose is to build, maintain, and improve official
Docker images for the `Node.js` project.

Their responsibilities are:

* Keep the official Docker images updated in line with new `Node.js` releases.
* Decide and implement image improvements and/or fixes.
* Maintain and improve the images' documentation.


### [Addon API](https://github.com/nodejs/nan)

The Addon API Working Group is responsible for maintaining the NAN project and
corresponding _nan_ package in npm. The NAN project makes available an
abstraction layer for native add-on authors for both Node.js and Node.js,
assisting in the writing of code that is compatible with many actively used
versions of Node.js, Node.js, V8 and libuv.

Their responsibilities are:

* Maintaining the [NAN](https://github.com/nodejs/nan) GitHub repository,
  including code, issues and documentation.
* Maintaining the [addon-examples](https://github.com/nodejs/node-addon-examples)
  GitHub repository, including code, issues and documentation.
* Maintaining the C++ Addon API within the Node.js project, in subordination to
  the Node.js CTC.
* Maintaining the Addon documentation within the Node.js project, in
  subordination to the Node.js CTC.
* Maintaining the _nan_ package in npm, releasing new versions as appropriate.
* Messaging about the future of the Node.js and NAN interface to give the
  community advance notice of changes.

The current members can be found in their
[README](https://github.com/nodejs/nan#collaborators).

### [Benchmarking](https://github.com/nodejs/benchmarking)

The purpose of the Benchmark working group is to gain consensus
for an agreed set of benchmarks that can be used to:

+ track and evangelize performance gains made between Node releases
+ avoid performance regressions between releases

Its responsibilities are:

+ Identify 1 or more benchmarks that reflect customer usage.
   Likely need more than one to cover typical Node use cases
   including low-latency and high concurrency
+ Work to get community consensus on the list chosen
+ Add regular execution of chosen benchmarks to Node builds
+ Track/publicize performance between builds/releases

### [Post-mortem](https://github.com/nodejs/post-mortem)

The Post-mortem Diagnostics working group is dedicated to the support
and improvement of postmortem debugging for Node.js. It seeks to
elevate the role of postmortem debugging for Node, to assist in the
development of techniques and tools, and to make techniques and tools
known and available to Node.js users.

Its responsibilities are:

+ Defining and adding interfaces/APIs in order to allow dumps
  to be generated when needed
+ Defining and adding common structures to the dumps generated
  in order to support tools that want to introspect those dumps

### [Documentation](https://github.com/nodejs/docs)

The Documentation working group exists to support the improvement of Node.js
documentation, both in the core API documentation, and elsewhere, such as the
Node.js website. Its intent is to work closely with Evangelism, Website, and
Intl working groups to make excellent documentation available and accessible
to all.

Its responsibilities are:

* Defining and maintaining documentation style and content standards.
* Producing documentation in a format acceptable for the Website WG to consume.
* Ensuring that Node's documentation addresses a wide variety of audiences.
* Creating and operating a process for documentation review that produces
  quality documentation and avoids impeding the progress of Core work.

### [Testing](https://github.com/nodejs/testing)

The Node.js Testing Working Group's purpose is to extend and improve testing of
the Node.js source code.

It's responsibilities are:

* Coordinating an overall strategy for improving testing.
* Documenting guidelines around tests.
* Working with the Build Working Group to improve continuous integration.
* Improving tooling for testing.
