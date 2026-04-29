---
date: '2026-04-24T00:00:00.000Z'
category: events
title: 'Trip report: Node.js collaboration summit (2026 London)'
layout: blog-post
author: Chengzhong Wu, Joyee Cheung
---

This April, the first [Node.js Collaboration Summit](https://nodejs.org/en/about/get-involved/collab-summit) of 2026 was hosted by [Bloomberg][] in London. In this edition, we welcomed over 40 in-person participants, and around a dozen more joined remotely.

Here is a recap of what happened at the summit.

### Next 10

In this session, [Jacob Smith][] started an on-site review of the questions that would be asked in the [Next-10 survey for 2026](https://github.com/nodejs/next-10/issues/369), including suggestions to existing questions, questions and options to add or remove, and recent AI discussions.

### New Release Schedule

Rafael Gonzaga announced a [new release schedule](https://nodejs.org/en/blog/announcements/evolving-the-nodejs-release-schedule) going into effect starting with Node.js v27. TL;DR, starting with Node.js v27, the Node.js version numbers align with the calendar year of their initial Current release!

This is a reflection of the current Node.js volunteer-based maintenance and an effort to keep the Node.js project sustainable in the long run. When it comes to security vulnerabilities, managing security releases across four or five active release lines has become difficult to sustain in the current Node.js voluntary work model. By reducing the number of concurrent release lines, the project can focus on better supporting the releases people actually use.

What's important is what's not changed with the new release schedule:

- **The Long-Term Support duration** remains similar (30 months).
- **Migration windows** preserved. Overlap between LTS versions remains.
- **Quality standards** unchanged. Same testing, same CITGM, same security process.
- **Predictable schedule**. April releases, October LTS promotion.
- **V8 adoption cycle**. Node.js latest releases will still include a version of V8 that's at most about 6 months old.

### New Streams API

[James Snell][] presented a new, more unified Streams API for the Web and Node.js. Historically, Node.js has relied on the highly optimized `node:stream`. In recent years, Node.js has also implemented WHATWG Web Streams to ensure cross-platform compatibility with browsers, Deno, Bun, and edge environments (like Cloudflare Workers). However, managing two different stream ecosystems has created friction for developers.

The Web Streams API has significant promise and allocation overhead. It was designed primarily for browsers, and when applied to high-throughput backend environments, the architectural cost becomes obvious.

The proposed New Streams API takes advantage of modern JavaScript Async Iteration, treats streams natively as async iterables, leaning heavily into `async/await` and `for await...of` loops, which is how modern developers naturally write code. Handling a filled data buffer has historically been a confusing black box. The new API also proposes forcing developers to explicitly choose a backpressure strategy when a buffer is full.

At the summit, we collected feedback on the design, compatibility with existing stream APIs, performance implications, additional use cases, whether the new proposal can help address some common issues in the existing APIs, and discussed whether the new Streams API can be implemented on the Web.

### Node.js Collaboratorship

[Jacob Smith][] led the session on exploring ways to lower the barrier to entry for developers who want to contribute to the Node.js core, ensuring the project remains accessible to new talent.

Triaging issues and reviewing pull requests takes a massive amount of maintainer bandwidth. At the session we discussed ideas to enforce code ownership to encourage collaborators to take over more review work. Since in the Node.js voluntary work model, this can come with difficulties, we also brainstormed ideas about decoupling collaboratorship from the commit bits and extending reviewership to working group/team members, in order to encourage non-collaborators to review and build trust.

### OpenTelemetry

[Chengzhong Wu][] presented the CNCF OpenTelemetry project.
The session was prompted by a pull request from [Bryan English][] to add Node.js built-in OpenTelemetry support. OpenTelemetry is one of the most active projects in the Cloud Native Computing Foundation, right after Kubernetes. OpenTelemetry has emerged as the de-facto standard in the world of observability with three pillars: traces, metrics, and logs. The project defines a vendor-neutral API for instrumentation and an SDK with a data processing pipeline. Apart from the OpenTelemetry API and SDK, there are also efforts to define Semantic Conventions (SemConv) and the native data format OpenTelemetry Protocol (OTLP) for sending telemetry data to backends. OpenTelemetry is an open governance project and consists of contributors from both vendors and users.

### Observability Infrastructure

[Stephen Belanger][] shared thoughts and work on improving Node.js observability infrastructure. The presentation covered `using` syntax support for `AsyncLocalStorage` and a new `diagnostic_channel` API `BoundedChannel`. Furthermore, Stephen presented ideas about new Node.js built-in modules for metrics and traces respectively, and the potential to add built-in support for the OpenTelemetry OTLP data protocol, improving OpenTelemetry serialization performance.

### Node.js use of AI contributions

A few weeks before the summit, a large pull request implementing VFS in Node.js with the assistance of an AI coding agent led to debates over the use of AI in Node.js core. In this session, [Jacob Smith][] walked the audience through the background of this controversy, the legal opinion from the OpenJS foundation, and the current status of the use of AI in other OSS projects.

We then started listing pros & cons, concerns and thoughts about the use of AI in Node.js core using a retrospective board. There were a lot of diverse opinions about this topic. At the session, we discussed the challenges from reviewer bandwidth exacerbated by the use of AI, the ethical concerns about AI, whether a ban is feasible or desirable, whether a disclosure on the use of AI may help or draw further legal and ethical concerns, how AI may help maintenance and lower barrier of entry, and ideas on reducing the amount of noise caused by the use of AI.

We also brainstormed how to adapt open-source governance for the modern era. Strategies discussed include enforcing a process that requires lightweight design documents, RFCs, explicit maintainer buy-in before a large PR, and pledge from the human contributor submitting the code who should take full responsibility for its quality, security, and integration.

### Userland migrations

[Jacob Smith][] and [Bruno Rodrigues][] presented increased usage of userland migrations. Migrations for Node.js 22.x to 24.x deprecations are almost complete. For Node.js 25.9.0, a codemod was published along side the deprecation introduced.

### Stabilization of module customization hooks and vm.Modules

[Joyee Cheung][] facilitated a session to discuss the [stabilization of module loader hooks and the vm Module API](https://github.com/openjs-foundation/summit/issues/482).

As `module.register()` is set to be [doc-deprecated for 25 and below](https://github.com/nodejs/node/pull/62395) and [runtime-deprecated for 26 and above](https://github.com/nodejs/node/pull/62401) due to [maintenance issues](https://nodejs.org/docs/latest-v25.x/api/module.html#caveats-of-asynchronous-customization-hooks), we are looking into helping the ecosystem migrate to the `module.registerHooks()` API. Ideas include providing a [userland ponyfill](https://github.com/joyeecheung/module-register-ponyfill) that re-implements most of the `module.register()` functionality using `module.registerHooks()`, and having some [userland-migration](https://github.com/nodejs/userland-migrations) automation tools to help facilitate migration.

Joyee also presented [a new design for the vm Module APIs](https://github.com/nodejs/node/issues/62720) that have been experimental for 9 years in order to address known issues and finally bring it to stabilization. We collected feedback on how to integrate it with WebAssembly modules to ensure it's future-proof with ongoing ESM integration proposals in standardization bodies.

### Libuv v2

[Santiago Gimeno][] shared that after more than a decade on version 1, there is a renewed push to launch libuv [v2](https://github.com/libuv/libuv/issues/4622), which introduces necessary breaking changes to clean up the codebase, remove legacy APIs, and improve cross-platform consistency—capabilities already being leveraged by [Julia](https://julialang.org/).

As migrating to libuv v2 can break the ABI, we discussed ideas on how to mitigate it, for example by leveraging [Node-API](https://nodejs.org/api/n-api.html), and the nuances in this approach e.g. [`napi_get_uv_event_loop`](https://nodejs.org/api/n-api.html#napi-get-uv-event-loop) can still be impacted by libuv ABI changes, though its use is limited and its ABI stability is warned in the documentation. We also discussed getting help to maintain v1 with security patches for a limited timespan, how to bring back `io_uring`, and which Node.js can start to ship libuv v2 (a very tentative timeline could be in 27).

### Node.js Virtual File System

[Matteo Collina][] presented the proposal for a Node.js built-in Virtual File System. By taking concepts previously explored in userland libraries (like `@platformatic/vfs`) and standardizing them into a core `node:vfs` module, Node.js can intercept standard filesystem calls and route them through a virtualized, memory-based layer. Developers can define specific data sources in memory (providers) and "mount" them so the runtime treats them exactly like local directories. The proposal also provides the ability to layer virtual filesystems on top of one another, or place a virtual layer directly over the physical disk to safely mock or override files.

Userland VFS implementations require massive monkey-patching; moving it to core provides deep integration and supports more use cases like SEA.

### Node.js Security - State of the Ecosystem & What's Next

[Rafael Gonzaga][] shared that the security team has recently advanced the ecosystem through a refined threat model, improved permission models, and enhanced release automation, but these efforts are currently being overshadowed by a massive influx of AI-generated vulnerability reports. This industry-wide surge, driven largely by users seeking CVE attribution and financial bounties, has severely strained maintainer capacity with high-noise, duplicative submissions that often lack reproduction steps or misclassify standard bugs as severe security threats. Despite attempted mitigations like pausing bug bounties, raising HackerOne signal requirements, and clarifying guidelines, the overwhelming volume has significantly driven up resolution times. To combat this bottleneck, the team is exploring strategies such as securing early access for proactive testing, attempting to alter reporting agent behaviors, and adopting a public security flow to bypass embargoes and speed up CI testing.

## Thanks

Thank you to all the attendees! Special appreciation goes to [Bloomberg][] for hosting the summit and creating a welcoming space for the Node.js community.

A big thanks as well to Thomas Chetwin ([@tchetwin](https://bsky.app/profile/tchetwin.bsky.social)), [Chengzhong Wu][], [Matteo Collina][], [Joyee Cheung][], and the OpenJS Foundation for organizing and making this event possible.

The Node.js Collaboration Summit recordings are now available at [YouTube](https://www.youtube.com/playlist?list=PLfMzBWSH11xZhA93H_9ulECtLVWtSm6zy).

[Jacob Smith]: https://github.com/JakobJingleheimer
[Rafael Gonzaga]: https://github.com/RafaelGSS
[Chengzhong Wu]: https://github.com/legendecas
[Joyee Cheung]: https://github.com/joyeecheung
[Matteo Collina]: https://github.com/mcollina
[Stephen Belanger]: https://github.com/Qard
[James Snell]: https://github.com/jasnell
[Santiago Gimeno]: https://github.com/santigimeno
[Bryan English]: https://github.com/bengl
[Marco Ippolito]: https://github.com/marco-ippolito
[Bloomberg]: https://www.bloomberg.com/company/values/tech-at-bloomberg/
