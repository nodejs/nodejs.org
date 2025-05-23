---
date: '2025-05-22T00:00:00.000Z'
category: events
title: 'Trip report: Node.js collaboration summit (2025 Paris)'
layout: blog-post
author: Joyee Cheung, Chengzhong Wu
---

About twice per year, Node.js contributors and community members get together in an unconference called [the Node.js collaboration summit](https://nodejs.org/en/about/get-involved/collab-summit). At the summit, we share knowledge about the project and the ecosystem, brainstorm solutions to technical and non-technical issues, make progress in decision-making discussions, and push forward new initiatives.

This April, the first collaboration summit of 2025 was hosted by [Datadog](https://www.datadoghq.com) in Paris. In this edition, we welcomed almost 40 in-person participants, and around a dozen more joined remotely.

Here is a recap of what happened at the summit.

## CI reliability and security

Before the collaboration summit, a [security incident](https://nodejs.org/en/blog/vulnerability/march-2025-ci-incident) happened in the CI infrastructure. While it only had a limited impact on the development process and did not affect any of the releases, it prompted us to take another look into our CI infrastructure management and the state of CI reliability. Richard Lau provided a walkthrough of the CI automation, and Joyee Cheung did an introduction to the current state of CI flake detection in order to spread the knowledge to more contributors.

## Lightning talks

We took advantage of the free time before the discussion-focused sessions to share more knowledge about new work-in-progress in the code base.

### Experimental WASM Modules

Chengzhong Wu gave an introduction to the experimental WASM modules (`import wasm`) and the plan to [unflag it](https://github.com/nodejs/node/pull/57038) in the next Node.js releases soon. The timing of unflagging needs some coordination with the browsers, and the general agreement in the room is that it can land as semver-minor when it's ready and does not have to be bound by major release cycles.

### Cppgc integration

Joyee Cheung showcased the initial integration with V8's [Oilpan library](https://v8.dev/blog/oilpan-library) and the planned migration work that aims to improve memory safety and garbage collection throughput by managing native embedder objects in the V8 heap.

## Mentorship

Jacob Smith facilitated a session about mentorship in the project. We reviewed ongoing informal mentorship efforts and past efforts like [nodejs/mentorship](https://github.com/nodejs/mentorship), how we can improve sharing knowledge about niche parts of the code base, and the expectations about mentees. The next step is to collect feedback from collaborators, and update in the Next-10 initiative.

## Improving Collaborator Experience

Jean Burellier facilitated a session using a retrospective board to gather feedback about contributor experience in Node.js core. Many brought up the flaky CI as a significant pain point. One of the main sources of flakes is a [deadlock issue](https://github.com/nodejs/node/issues/54918) - fortunately, after the summit it was alleviated by a [workaround](https://github.com/nodejs/node/pull/58047).

Another issue that many brought up came from the extreme cases of consensus seeking. In Node.js, decision-making is based on the consensus from the 100+ collaborators. When collaborators cannot reach a consensus, the disagreement can be escalated to the TSC, and a vote can be initiated to break the standstill. But often the vote can be started too late, after the conversations have become exhausting, and those summoned to vote may also have a hard time digesting all of the debates. We brainstormed about ideas to improve the process, for example, using emoji votes to test the temperature, using AI to help summarize the arguments, or setting a deadline for conclusions, though the benefits of these ideas are not conclusive.

Some mentioned that finding information about niche components in the codebase can be challenging. We could do better at linking and promoting [CONTRIBUTING.md](https://github.com/nodejs/node/blob/main/CONTRIBUTING.md) and various [internal documentation](https://github.com/nodejs/node/tree/main/doc/contributing). Building a tool using AI services that takes the codebase and documentation as context may also help answer contributors' queries.

We also discussed how to handle stale pull requests and prevent beginner pull requests from getting stalled and closed. Ideas include adding more automation or better pull request templates.

## Bring AsyncLocalStorage to the Web

Chengzhong Wu gave the audience an overview of the efforts to bring the Node.js [AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage) into JavaScript as a language feature that's also available to the Web - the [AsyncContext](https://github.com/tc39/proposal-async-context) proposal, which is currently at stage 2 in the TC39 process. We were joined by TC39 delegates Nicolò Ribaudo and Andreu Botella to discuss the APIs that should propagate the contexts, and how to fill the gap from use cases that require using an `enterWith()`-like escape-hatch.

AsyncLocalStorage and its akin APIs have been adopted not only in Node.js and JavaScript runtimes like Deno and Bun, but also in major programming language runtimes like .NET, Python, Go, and more. It is one of the key features that observability libraries like OpenTelemetry need to instrument a user application.

The main challenge of the AsyncContext proposal is the complexity it would bring to Web platforms. Web platforms define a different security model compared to Node.js, and the proposal has to prove that it does not open up unintended behavior through implicit context propagation. Additionally, the proposal requires efforts on the Web APIs to propagate the contexts across asynchronous boundaries. This needs specification and test facilities like [Web Platform Tests](https://github.com/web-platform-tests/wpt) to align all browsers implementing the feature uniformly.

We recognize that the `enterWith()` might be essential to certain use cases, and the proposal does not close the door to future extensions. However, it is also recognized that `enterWith()` is not perfect and can often lead to mistakes if not used with caution. There is a follow-up TC39 proposal [Disposable AsyncContext](https://github.com/tc39/proposal-async-context-disposable) to integrate AsyncContext with the `using` declaration syntax, addressing the use cases of `enterWith()`.

We also discussed that there are [alternatives](https://github.com/tc39/proposal-async-context/blob/master/CONTINUATION.md) to the AsyncLocalStorage data flow. Considering that the current AsyncLocalStorage data flow is a key model to APM vendors and OpenTelemetry, it is important to prioritize the existing model that has also been widely adopted so that the users at large can benefit from the feature being available on the Web.

## Single Executable Applications

We were joined remotely by Darshan Sen (champion of the SEA initiative). Luke Karrys went through the current outstanding feature requests and issues of the SEA (Single Executable Application) feature, including:

- ESM support
- Injecting CLI flags
- Sourceless code cache
- JS APIs
- streamlining toolchain
- Virtual file system

Most of the issues are addressable - we spent some time discussing streamlining the toolchain in core, which may be possible, but needs investigation into the binary size increase from bundling more of postject in core. The most important blocker to the progress of the SEA initiative remains the lack of volunteers or funding to gain momentum. We discussed setting up a team vs. a working group and how to resume more work.

## Embedding Undici

Matteo chaired a session about next steps in improving user experience when they need more from Undici. We reviewed the issues with existing http builtins, whose status change as legacy was discussed, and how to prevent these issues with Undici once users need more powerful customizations. For now, exposing the dispatcher configuration from the bundled undici would help with most use cases, though it still requires stabilizing the dispatcher API, and the documentation needs more work. We discussed participating in WinterTC to standardize agent support, though it's unclear how much effort it would take to match the existing solutions with a standard and where the funding would come from.

There is still interest in finishing [Milo](https://github.com/milojs/milo), and the plan is to integrate it only via WASM and not through native bindings.

To support newer protocols, we discussed advertising HTTP/2 via ALPN for HTTPS and auto‑upgrade if the server agrees, which can be opt-in by 24 as semver-minor and become a default in future major releases. Work on QUIC will resume once OpenSSL 3.5 upgrade is in.

## Node.js integration with Chrome DevTools

In this session we were joined remotely by Simon Zünd and Danil Somsikov from the Chrome DevTools team. Chengzhong Wu went through the concept of Chrome DevTools Frontend and Chrome DevTools Protocol. Node.js implements Chrome DevTools Protocol via V8, providing essential JavaScript debugging features, and extends the protocol to provide additional functionality like performance tracing, Network inspection, and automatic discovery of worker thread targets.

The support for network inspection is still in active development. We discussed collaborative efforts to add side-effect-free observability diagnostic channels to both the `http` built-in module and Undici to support inspecting network traffic sent by `http.request` and `fetch` APIs. Additionally, there are plans to support WebSocket traffic inspection.

Node.js supports debugging worker threads, but people are often confused because Chrome DevTools frontend can not automatically connect to a worker thread spawned in an inspected Node.js process. There is an open work to add experimental target discovery to Node.js Chrome DevTools Protocol implementation.

## Next 10 Survey

In this session, Marco Ippolito started an on-site review of the questions that would be asked in [Next-10 survey for 2025](https://github.com/nodejs/next-10/pull/331), including suggestions to existing questions, questions/options to add and to remove. It was a productive session and the results of the discussions had been incorporated into the survey, which would be open until the end of May - submit your response [here](https://linuxfoundation.research.net/r/2025nodenext10).

## Module customization & instrumentation

We combined two topics about modules into one session block.

Joyee Cheung gave a status update on the module loader hooks and what's next for `module.registerHooks()`. The consensus in the room was that we can make the internal module loading paths synchronous for better performance and reduce quirks/bugs, then implement `module.register()` as a helper on top of `module.registerHooks()` for those who want out-of-the-box worker orchestration and compatibility of the older API. For those who wish to run asynchronous code from `module.registerHooks()`, we can provide a utility similar to [everysync](https://www.npmjs.com/package/everysync). For the upcoming [evaluate hook](https://github.com/nodejs/node/pull/57139), we think that it could land with the current naming, so that it can make at least part of the lives of module customizers easier, even though it won't cover all evaluation edges due to JS spec constraints.

Bryan English introduced a new mechanism to instrument ESM - instead of patching module exports externally, which can run into issues with live binding of exports that are lazily initialized, patch the exports internally by parsing, analysing, and rewriting the AST of the target exports to inject tracing channels. This rust-based instrumentation library has now been open-sourced on [GitHub](https://github.com/DataDog/orchestrion-js). We discussed what Node.js core can provide to make instrumentation like this more streamlined, and how to integrate AsyncContext with it to improve handling of edge cases like constructors with `super()`. While it's still in development and there are still some open issues to solve, hopefully this can be a breeding ground for adding official tracing channel support in libraries for observability without rewritting the AST in a third-party tool.
