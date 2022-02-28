---
layout: about.hbs
title: Working Groups
---

# Core Working Groups
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Core Working Groups are created by the
[Technical Steering Committee (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## Current Working Groups

* [Addon API](#addon-api)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [Docker](#docker)
* [Evangelism](#evangelism)
* [i18n](#i18n)
* [Package Maintenance](#package-maintenance)
* [Release](#release)
* [Security](#security)
* [Streams](#streams)

### [Addon API](https://github.com/nodejs/nan)

The Addon API Working Group is responsible for maintaining the NAN project and
corresponding _nan_ package in npm. The NAN project makes available an
abstraction layer for native add-on authors for Node.js,
assisting in the writing of code that is compatible with many actively used
versions of Node.js, V8 and libuv.

Responsibilities include:

* Maintaining the [NAN](https://github.com/nodejs/nan) GitHub repository,
  including code, issues and documentation.
* Maintaining the [addon-examples](https://github.com/nodejs/node-addon-examples)
  GitHub repository, including code, issues and documentation.
* Maintaining the C++ Addon API within the Node.js project, in subordination to
  the Node.js TSC.
* Maintaining the Addon documentation within the Node.js project, in
  subordination to the Node.js TSC.
* Maintaining the _nan_ package in npm, releasing new versions as appropriate.
* Messaging about the future of the Node.js and NAN interface to give the
  community advance notice of changes.

The current members can be found in their
[README](https://github.com/nodejs/nan#collaborators).

### [Build](https://github.com/nodejs/build)

The Build Working Group's purpose is to create and maintain a distributed
automation infrastructure.

Responsibilities include:

* Producing packages for all target platforms.
* Running tests.
* Running performance testing and comparisons.
* Creating and managing build-containers.

### [Diagnostics](https://github.com/nodejs/diagnostics)

The Diagnostics Working Group's purpose is to surface a set of comprehensive,
documented, and extensible diagnostic interfaces for use by Node.js tools and
JavaScript VMs.

Responsibilities include:

* Collaborating with V8 to integrate `v8_inspector` into Node.js.
* Collaborating with V8 to integrate `trace_event` into Node.js.
* Collaborating with Core to refine `async_wrap` and `async_hooks`.
* Maintaining and improving OS trace system integration (e.g. ETW, LTTNG, dtrace).
* Documenting diagnostic capabilities and APIs in Node.js and its components.
* Exploring opportunities and gaps, discussing feature requests, and addressing
  conflicts in Node.js diagnostics.
* Fostering an ecosystem of diagnostics tools for Node.js.
* Defining and adding interfaces/APIs in order to allow dumps to be generated
  when needed.
* Defining and adding common structures to the dumps generated in order to
  support tools that want to introspect those dumps.

### [Docker](https://github.com/nodejs/docker-node)

The Docker Working Group's purpose is to build, maintain, and improve official
Docker images for the Node.js project.

Responsibilities include:

* Keeping the official Docker images updated in line with new Node.js releases.
* Decide and implement image improvements and/or fixes.
* Maintain and improve the images' documentation.

### [Evangelism](https://github.com/nodejs/evangelism)

The Evangelism Working Group promotes the accomplishments
of Node.js and lets the community know how they can get involved.

Responsibilities include:

* Facilitating project messaging.
* Managing official project social media.
* Handling the promotion of speakers for meetups and conferences.
* Handling the promotion of community events.
* Publishing regular update summaries and other promotional
  content.

### [i18n](https://github.com/nodejs/i18n)

The i18n Working Groups handle more than just translations. They
are endpoints for community members to collaborate with each
other in their language of choice.

Each team is organized around a common spoken language. Each
language community might then produce multiple localizations for
various project resources.

Responsibilities include:

* Translating any Node.js materials they believe are relevant to their
  community.
* Reviewing processes for keeping translations up to date and of high quality.
* Managing and monitoring social media channels in their language.
* Promoting Node.js speakers for meetups and conferences in their language.

Each language community maintains its own membership.

* [nodejs-ar - Arabic (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [Package Maintenance](https://github.com/nodejs/package-maintenance)

Responsibilities include:

* Building, documenting and evangelizing guidance, tools and processes that make it easier for maintainers to
  maintain packages and accept help from those who depend on their packages.
* Management of repositories within the [pkgjs](https://github.com/pkgjs)
  GitHub organization including but not limited to:
  * Managing the list of organization owners which supplement the standard
    Node.js organization owners as outlined in: <https://github.com/nodejs/admin/blob/master/GITHUB_ORG_MANAGEMENT_POLICY.md#owners>
  * Overseeing new repositories (creating, moving, removing)
  * Managing the maintainer teams for all of the repositories.
  * Contribution policy for repositories
* Technical direction for the projects within
  the [pkgjs](https://github.com/pkgjs) organization
* Managing the maintainer teams and contribution policies for the
  following repositories
  * nodejs/ci-config-travis
  * nodejs/ci-config-github-actions
  * nodejs/package-maintenance repository.

### [Release](https://github.com/nodejs/Release)

The Release Working Group manages the release process for Node.js.

Responsibilities include:

* Define the release process.
* Define the content of releases.
* Generate and create releases.
* Test Releases.
* Manage the Long Term Support and Current branches including
  backporting changes to these branches.
* Define the policy for what gets backported to release streams

### [Security](https://github.com/nodejs/security-wg)

The Security Working Group manages all aspects and processes linked to Node.js security.

Responsibilities include:

* Define and maintain security policies and procedures for:
  * the core Node.js project
  * other projects maintained by the Node.js Technical Steering Committee (TSC).
* Work with the Node Security Platform to bring community vulnerability data into
  the foundation as a shared asset.
* Ensure the vulnerability data is updated in an efficient and timely manner.
  For example, ensuring there are well-documented processes for reporting
  vulnerabilities in community modules.
* Review and recommend processes for handling of security reports (but not the
  actual administration of security reports, which are reviewed by a group of people
  directly delegated to by the TSC).
* Define and maintain policies and procedures for the coordination of security
  concerns within the external Node.js open source ecosystem.
* Offer help to npm package maintainers to fix high-impact security bugs.
* Maintain and make available data on disclosed security vulnerabilities in:
  * the core Node.js project
  * other projects maintained by the Node.js Foundation technical group
  * the external Node.js open source ecosystem
* Promote the improvement of security practices within the Node.js ecosystem.
* Recommend security improvements for the core Node.js project.
* Facilitate and promote the expansion of a healthy security service and product
  provider ecosystem.

### [Streams](https://github.com/nodejs/readable-stream)

The Streams Working Group is dedicated to the support and improvement of the
Streams API as used in Node.js and the npm ecosystem. We seek to create a
composable API that solves the problem of representing multiple occurrences
of an event over time in a humane, low-overhead fashion. Improvements to the
API will be driven by the needs of the ecosystem; interoperability and
backwards compatibility with other solutions and prior versions are paramount
in importance.

Responsibilities include:

* Addressing stream issues on the Node.js issue tracker.
* Authoring and editing stream documentation within the Node.js project.
* Reviewing changes to stream subclasses within the Node.js project.
* Redirecting changes to streams from the Node.js project to this project.
* Assisting in the implementation of stream providers within Node.js.
* Recommending versions of `readable-stream` to be included in Node.js.
* Messaging about the future of streams to give the community advance notice of changes.
