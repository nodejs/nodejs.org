---
date: '2017-02-28T08:00:00.000Z'
category: wg
title: Diag WG Update - Many new tools, phasing out some old ones
layout: blog-post.hbs
author: 'Josh Gavant (@joshgav)'
---

In surveys and discussions with Node.js users we consistently hear of your need
for better tools and APIs for debugging and understanding your modules and apps.
In fact, in last year's [Node.js Foundation survey][], the biggest ask from
developers and technical leads was for better tools.

Based on that feedback and thanks to contributions and collaboration from across
our community, over the past year several experimental diagnostic APIs and tools
have landed in Node itself and the Node.js Foundation, including:

- [async_hooks][] for sharing context across async boundaries
- [Inspector][] and [node-inspect][] for stepping and profiling
- [Trace Controller][] for gathering and streaming traces from V8 and Node
- [node-report][] and [llnode][] for post-mortem analysis

Over the coming months we'll continue to improve the [stability][] of these projects
and hope to eventually graduate some from experimental state with your help and
feedback. Search the nodejs GitHub org for labels [diag-agenda][],
[tracing][], and [inspector][] and review issues in the [Diagnostics WG][] to
see what we're working on and how you can help.

## Inspector replaces legacy V8 Debugger

With progress comes the need to phase out old implementations so we can focus on
refining and completing new ones to meet user needs. In particular, as Inspector
[graduates from experimental status](https://github.com/nodejs/node/issues/11421)
in the coming months, V8 and Node's legacy Debugger API will be
[deprecated](https://github.com/nodejs/node/pull/10970) and eventually
[removed](https://github.com/nodejs/node/issues/9789) in favor of the new
Inspector API.

Considering the relative imminence of this change, we've decided to add a deprecation
warning as soon as possible to prepare users of the legacy interface. So beginning
in Node 7.7.0 **running `node --debug`** (or variants like `--debug-brk` and
`--debug-port=12345`) **will print a deprecation warning** to stderr. To avoid
this message, start node with the `--no-deprecation` flag.

For your future debugging needs, use `node --inspect` or variants like `--inspect-brk`
to activate the new [Inspector API][]. Many popular editors and tools already
automatically support this API with Node.js 6 and later.

In addition, Node's built-in [CLI debugger][], typically invoked with `node
debug myscript.js`, has now (7.6.0+) been augmented with an Inspector-based
equivalent invoked with `node inspect myscript.js`. `node debug myscript.js` will
eventually be removed as well in favor of `node inspect`.

## Try it!

Check out the [Debugging - Getting Started][] guide for help getting started
with `--inspect` and Inspector.

As always, but particularly in this transition stage, we'd love your feedback
both on the insights you need from the Node.js runtime and modules, as well as
your experiences getting that info with tools and APIs old and new. [Open an
issue][] in the Diagnostics WG for discussions or a PR in [nodejs/node][] to
contribute code.

Thank you!

[async_hooks]: https://github.com/nodejs/node/pull/8531
[CLI debugger]: https://nodejs.org/docs/v7.6.0/api/debugger.html
[Debugging - Getting Started]: /learn/getting-started/debugging
[diag-agenda]: https://github.com/search?q=org%3Anodejs+label%3A%22diag-agenda%22&type=Issues
[Diagnostics WG]: https://github.com/nodejs/diagnostics/issues
[Inspector API]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[Inspector]: https://github.com/nodejs/node/issues?utf8=%E2%9C%93&q=label%3Ainspector%20
[llnode]: https://github.com/nodejs/llnode
[node-inspect]: https://github.com/nodejs/node-inspect
[node-report]: https://github.com/nodejs/node-report
[Node.js Foundation survey]: /static/documents/2016-survey-report.pdf
[nodejs/node]: https://github.com/nodejs/node
[Open an issue]: https://github.com/nodejs/diagnostics/issues/new
[stability]: https://nodejs.org/dist/latest-v7.x/docs/api/documentation.html#documentation_stability_index
[Trace Controller]: https://github.com/nodejs/node/pull/9304
[tracing]: https://github.com/search?utf8=✓&q=org%3Anodejs+label%3A"tracing"+is%3Aopen&type=Issues
