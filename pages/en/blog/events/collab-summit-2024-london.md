---
date: '2024-04-15T00:00:00.000Z'
category: events
title: 'Trip report: Node.js collaboration summit (2024 London)'
layout: blog-post
author: Joyee Cheung
---

About twice per year, Node.js contributors and community members get together in an unconference called [the Node.js collaboration summit](https://nodejs.org/en/about/get-involved/collab-summit). At the summit, we share knowledge about the project and the ecosystem, brainstorm solutions to technical and non-technical issues, make progress in decision-making discussions, and push forward new initiatives.

The [first collaboration summit of 2024](https://github.com/openjs-foundation/summit/issues/387) was held on 3-4 April, hosted by Bloomberg at their London office. In this edition, 20 attendees joined in person, including 15 Node.js core collaborators (10 of whom were from the Technical Steering Committee) and 5 more members/contributors from the community. We were also joined by around a dozen remote participants who contributed significantly to the discussions. In addition, we had our first crossover session with WinterCG.

Here is a recap of what happened at the summit.

## HTTP, web server frameworks and clients

The summit started with a morning of discussions about HTTP - both the server and the client.

Jean Burellier ([@sheplu](https://github.com/sheplu)) presented the recent development in the [Web server framework working group](https://github.com/nodejs/web-server-frameworks). We discussed ideas for the [next generation of the HTTP stack](https://github.com/nodejs/http-next). In particular we brainstormed about higher-level APIs that can abstract over three different HTTP stacks (1.1, 2 and QUIC), and lower-level APIs that empower frameworks to maximize performance and do request injection without having to monkey-patch. The next-gen HTTP parser [milo](https://github.com/ShogunPanda/milo) may also be part of the picture. Iteration of the API design will continue in the [Web server framework working group](https://github.com/nodejs/web-server-frameworks) after the session.

Matteo Collina ([@mcollina](https://github.com/mcollina)) and Robert Nagy ([@ronag](https://github.com/ronag)) facilitated a [session about the HTTP client](https://github.com/openjs-foundation/summit/issues/393) and a [session about Undici](https://github.com/openjs-foundation/summit/issues/391). The sessions mainly focused on APIs to improve customization. We brainstormed what a [composable dispatcher API](https://github.com/nodejs/undici/issues/2722) should look like and how it should be implemented in [Undici](https://github.com/nodejs/undici) and exposed to Node.js users. We also discussed whether/how we should provide [built-in environment variable handling for proxies](https://github.com/nodejs/undici/issues/1650). An idea was proposed to release an official package that provides extra abilities for the power users while decoupling semantic versioning from the Node.js releases. We will bring the ideas back to GitHub and continue the exploration.

## New features for the built-in CLI

Ruy Adorno ([@ruyadorno](https://github.com/ruyadorno)) presented the recent development in the [tooling group](https://github.com/nodejs/tooling). We discussed adding a new command line utility that lets users quickly start a static file server for Web development. Folks at the session generally found the idea favorable. We discussed the goals and non-goals of this new utility at the session and will follow up on GitHub.

Before the summit, a [recent pull request](https://github.com/nodejs/node/pull/52190) to add a subcommand `node run` (similar to a built-in, slimmed-down version of `npm run`) started a debate on GitHub. The author of the pull request, Yagiz Nizipli ([@anonrig](https://github.com/anonrig)), joined remotely and we used the session to settle the debate in the pull request. Most people at the session favored the idea, though we also agreed that we should have a more thought-out subcommand strategy. We agreed that this new feature could land as `node --run` in the first iteration. While the option is still experimental, we'll figure out whether or how we should introduce more subcommands in the future and how we can minimize breakage to existing workflows. At the meantime we could also explore adding more performant primitives that help package managers speed up their script runners.

## Version management of package managers and the Node.js binary

Wes Todd ([@wesleytodd](https://github.com/wesleytodd)) facilitated a [session](https://github.com/openjs-foundation/summit/issues/400) about the [Node.js version manager/package manager effort](https://github.com/nodejs/package-maintenance/issues/591). We started with a recap of how corepack went into the Node.js distribution as a way to provide more package manager options to our users, then dived into several topics:

- How should we enable reproducible builds with pinned versions of Node.js and package managers? How can we provide a more consistent user experience across the platform?
- How can we enable faster distribution cycles of newer versions of package managers?
- Should Node.js have a recommended version manager? Should we provide a one-line script to install Node.js? How should those be maintained?
- `devEngine` in `package.json` and recent [package metadata effort](https://github.com/openjs-foundation/package-metadata-interoperability-collab-space).
- What should our short-term strategy be for corepack?

We agreed that the next steps should be:

- Come up with a short-term strategy for corepack in the package maintenance working group in the coming weeks.
- For a long-term strategy, continue iterating on the goals in the package maintenance working group and come back with a proposal about the project goals in this field. Then send a pull request to add the goals document into the nodejs/node core repository, and get the broader contributor base to review the proposal, before diving into the implementation details.

## Better asynchronous scheduling and memory management

The second day of the summit started with deep dives into some tricky technical issues in Node.js core.

Robert Nagy ([@ronag](https://github.com/ronag)) facilitated a [session](https://github.com/openjs-foundation/summit/issues/392) to brainstorm solutions to [an error-prone use case](https://github.com/nodejs/node/issues/51156) in asynchronous scheduling. This comes from the intricate timing difference and interoperability among promises, `EventEmitter`, and existing scheduling APIs such as `process.nextTick`, `queueMicroTask()`, and `setImmediate()`. We looked into several potential solutions: some may break the timing, and some may lead to other surprises, though some ideas involving [a new scheduling API](https://github.com/nodejs/node/pull/51471) or a [new `EventEmitter` option](https://github.com/openjs-foundation/summit/issues/392#issuecomment-2037511747) looked more promising. For now, we will document the caveats more clearly and follow up by looking into the ideas mentioned in the session, finding recommendable usage patterns, and promoting them to library authors and end users to avoid the issue.

Joyee Cheung ([@joyeecheung](https://github.com/joyeecheung)) gave [a presentation](https://github.com/joyeecheung/talks/blob/master/node_collab_summit_202404/improving-native-memory-management-diagnostics-in-nodejs.pdf) to share knowledge about a corner in the code base that fewer contributors are familiar with these days - the native memory management and how to fix the memory issues in Node.js core. We dived into a case study of a few recently fixed memory bugs in the vm APIs, and talked about recent work in [migrating the native memory management](https://docs.google.com/document/d/1ny2Qz_EsUnXGKJRGxoA-FXIE2xpLgaMAN6jD7eAkqFQ/edit) to use the [V8 Oilpan library](https://v8.dev/blog/oilpan-library) in order to prevent similar bugs and improve garbage collection performance.

## Release and CITGM

Ruy Adorno ([@ruyadorno](https://github.com/ruyadorno)) facilitated a [session](https://github.com/openjs-foundation/summit/issues/389) to bring the regular meeting of the [release working group](https://github.com/nodejs/Release) to a larger audience at the summit. We looked into the upcoming release schedule, talked about the obstacles in recent releases, and discussed the recent challenges with backports and flaky CI. We need more volunteers to help improve automation, so we also brainstormed ideas to improve documentation and our process, so that more contributors can jump in and share the work without having to become a releaser themselves (which requires more trust building for security reasons).

We also discussed the status of the [CITGM](https://github.com/nodejs/citgm) - a platform we've been using to run the test suite of npm packages against unreleased versions of Node.js to detect breakage. It has been struggling with a lot of flakes and, as a result, has not been reliable enough for releasers to extract useful information. We brainstormed ideas to make it more reliable, e.g., developing automation to help the module authors notice the breakage early in their own CI. The session ended with a call for volunteers to help implement the ideas brainstormed and maintain the reliability of CITGM.

## Content curation, user survey and funding

Jean Burellier ([@sheplu](https://github.com/sheplu)) facilitated [a session](https://github.com/openjs-foundation/summit/issues/401) to talk about the recent developments in the [Next-10 initiative](https://github.com/nodejs/next-10), and Micheal Dawson ([@mhdawson](https://github.com/mhdawson)) joined remotely to give us more context. Attendees learned about the recently proposed [Node.js Ambassador program](https://github.com/nodejs/next-10/issues/259) which aims to promote educational content created by creators from the community, and the [Speakers Beaureau](https://openjsf.org/events) initiative from the OpenJS foundation that funds speakers to promote recent developments in the project. We brainstormed ideas to promote quality and up-to-date content and phase out content that still teaches out-of-date practices, including:

- Creating a venue for content creators to get their content reviewed or proof-read by project contributors and for project contributors to reach out to content creators to promote recent developments in the project.
- Getting more Node.js collaborators involved in the development of the certification program.
- Putting more reputable educational resources on our website.

We also discussed topics that should be included in the [upcoming 2024 user survey](https://github.com/nodejs/next-10/pull/261), including the adoption of new and existing features. These may be helpful for decision-making regarding some of the unresolved issues, e.g., the future of corepack. We'll review the survey pull request after the summit.

Given that currently, direct sponsorship of engineering work in the project is far too limited for the existing workload, we also discussed ideas to improve the situation. For example, adding more crowdsourcing channels to get bugs fixed or features implemented and providing better stories for companies to sponsor engineering work on specific tasks. Discussions will continue in the [Next-10 repository](https://github.com/nodejs/next-10/issues/259).

## ECMASCript Modules and interoperability

Daniel Ehrenberg ([@littledan](https://github.com/littledan)) and Guy Bedford ([@guybedford](https://github.com/guybedford), remote) facilitated [a session about ECMAScript modules](https://github.com/openjs-foundation/summit/issues/397). Attendees were briefed about the recent module-related proposals in TC39. We looked into use cases that still miss support in the language, such as module mocking. We also discussed pending tasks in Node.js core's ESM integration, including adding [universal, in-thread and synchronous loader hooks](https://github.com/nodejs/node/issues/52219), and getting help to fix [bugs in the existing off-thread loader hooks](https://github.com/nodejs/node/pull/50752).

Nicolò Ribaudo ([@nicolo-ribaudo](https://github.com/nicolo-ribaudo)) joined remotely and presented the [Stage 2 deferred module evaluation proposal](https://github.com/tc39/proposal-defer-import-eval), which is built upon being able to evaluate ESM synchronously and therefore can share specification and JavaScript engine changes with the recently added [synchronous-only `require(esm)` in Node.js](https://github.com/nodejs/node/pull/51977).

We will continue our discussions in the TC39 module harmony working group.

## Participation in standards: TC39, WinterCG and security

Daniel Ehrenberg ([@littledan](https://github.com/littledan)) briefed the audience about several recent proposals in TC39 that may be interesting for Node.js and could use more feedback from Node.js, including [`AsyncContext`](https://github.com/tc39/proposal-async-context) and [`ShadowRealm`](https://github.com/tc39/proposal-shadowrealm), etc. Oliver Medhurst ([@CanadaHonk](https://github.com/CanadaHonk)) gave an introduction about ongoing work and proposals in the WinterCG. We also learned about the recent ECMA TC55 for server-side API standardization.

Since the summit overlaps with the monthly call of [WinterCG](https://wintercg.org/), part of this session was scheduled to be a cross-over session with WinterCG. We were joined by Luca Casonato ([@lucacasonato](https://github.com/lucacasonato), remote) who explained how WinterCG works. Andreu Botella ([@andreubotella](https://github.com/andreubotella)) also joined remotely and shared how the [minimum common API](https://github.com/wintercg/proposal-common-minimum-api) tried to leave room in the specification when Node.js API behavior deviates from the browsers. We agreed that both Node.js contributors and others from WinterCG should make an effort to improve communication and ensure that the specifications are compatible and interoperable with Node.js. We also discussed how to get funding to help Node.js implement proposals coming out of WinterCG.

Node.js has a distributed consensus-seeking model, which makes effective communication between Node.js contributors and other standards bodies challenging. As a possible solution to this problem, James M Snell ([@jasnell](https://github.com/jasnell)) proposed at the [mini-summit at NodeConf EU last year](https://github.com/nodejs/TSC/issues/1422) to [set up a standards-positions repository](https://github.com/nodejs/admin/issues/841) which captures consensus within the project about proposals in standards. We revisited this idea at this summit, and discussed communication setups that may help folks from WinterCG get input more effectively from those who work on the relevant parts in Node.js. The discussions will continue in the [standards-positions repository](https://github.com/nodejs/standards-positions).

Finally, we discussed standards for supply chain security, such as [CycloneDX](https://github.com/CycloneDX) and [SLSA](https://github.com/slsa-framework/slsa). Feelings about SLSA were mixed; several people expressed that it is incompatible with Node.js's current contribution model, and implementing it requires a significant change in the contribution process that needs resources we do not have. The project is still in a learning process, and we want to explore different options in security standards. The exploration will continue in the [security working group](https://github.com/nodejs/security-wg).

## Wrapping up

We had many productive discussions at the summit. Both the contributors and community members learned a lot from each other. We will follow up on the discussions in respective working groups/teams on GitHub.

We are also looking into the organization of the next summit in the second half of 2024. Follow [this issue](https://github.com/nodejs/admin/issues/814) if you are interested!
