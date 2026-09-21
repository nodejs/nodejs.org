---
date: TBD
category: announcements
title: Announcing Node.js's Documentation Redesign
layout: blog-post
author: Aviv Keller
---

A few years ago, [nodejs.org](https://nodejs.org) went through an [extensive makeover](https://nodejs.org/en/blog/announcements/diving-into-the-nodejs-website-redesign). Since then, we have done anything and everything but slow down.

For the past few years, the Node.js Web Team has been hard at work creating a brand-new documentation design system to complement the overhaul of [nodejs.org](https://nodejs.org).

Today, it is my pleasure to announce the completion of that redesign, now viewable at [nodejs.org/api](https://nodejs.org/api).

Although the most obvious change is visual, this redesign goes far, far beyond some simple CSS transformations. In fact, this is a brand-new documentation experience built on top of [`doc-kit`](https://github.com/nodejs/doc-kit), powered by reusable components from [`@node-core/ui-components`](https://www.npmjs.com/package/@node-core/ui-components), and designed to evolve alongside Node.js itself rather than stay outdated for the next 16+ years.

## What's New

### Built-In Search

One of the [most frequently requested additions](https://github.com/nodejs/node/issues/31598) to the Node.js documentation has been a proper [search system](https://github.com/nodejs/node/issues/49527). In the past, users were forced to rely on an external search engine, which was extremely inconvenient. Such results often directed users to documentation for [significantly outdated versions](https://github.com/nodejs/nodejs.org/issues/6577) of Node.js, or to pages not associated with the project at all.

The redesigned documentation includes first-party search powered by [locally hosted search indexes](https://github.com/nodejs/nodejs.org/pull/8836) that are generated as part of the documentation build, giving us complete control over what is indexed and how results are presented.

For users, this means they no longer have to leave the Node.js website and hope that an external search engine returns the correct version of the documentation.

### A Shared Design

Made possible by [`@node-core/ui-components`](https://www.npmjs.com/package/@node-core/ui-components) in [nodejs/nodejs.org#7401](https://github.com/nodejs/nodejs.org/pull/7401), a framework-agnostic package containing reusable Node.js interface components, the website and API documentation now use the same buttons, badges, navigation elements, signatures, sidebars, and other interface patterns, without requiring the duplication of these components on both Next.js and static infrastructure.

### Better API Signatures

Historically, many of Node.js's functions and their signatures were rendered using generic HTML lists. While expansive, those elements were difficult to style consistently and did not always communicate the structure of an API clearly. In the new documentation, these lists have been replaced with both tables _and_ [TypeScript-compatible signatures](https://github.com/nodejs/doc-kit/pull/637), making it easy to understand the complete type of a Node.js function without reading the entire docs.

Other notable changes include:
* A [proper 404 page](https://github.com/nodejs/doc-kit/pull/780)
* A mobile interface
* A sticky sidebar with reading time, historical information, and a table of contents.

## How We Got Here

Like the [website](https://nodejs.org/en/blog/announcements/diving-into-the-nodejs-website-redesign), we've taken great care in approaching and implementing this design. As the saying goes, "Rome wasn't built in a day," and it's important that we highlight the often thankless work of the maintainers who made this redesign what it is today.

### Issues With The Old Design

As with most things in open source, it all started with [an issue](https://github.com/nodejs/node/issues/52343), well, several.

As pointed out in that issue, and by many, many, **many** contributors over the years, the Node.js documentation experience and its underlying tooling were becoming increasingly difficult to maintain and use.

This was largely due to a few key issues:

1. There was no [first-party way to search](https://github.com/nodejs/node/issues/31598) the API documentation, and external search engines could provide [contradictory or mismatched information](https://github.com/nodejs/nodejs.org/issues/6577).
2. The interface had accumulated outdated styles and [browser-specific quirks](https://github.com/nodejs/node/issues/40099).
3. [Navigation and anchor behavior](https://github.com/nodejs/node/issues/47858) could be inconsistent, particularly on extremely long pages, with links sometimes [jumping to the wrong heading](https://github.com/nodejs/node/issues/53584).
4. The generator was difficult for new contributors to understand and modify.
5. The existing tooling made it difficult to introduce component-based interfaces or other modern documentation features.

To be clear, the problem was never that the old tooling was badly designed; it had simply been outgrown by the Node.js Project and needed a replacement.

### Staggering the Redesign

While it didn't have a name at the time, [`doc-kit`](https://github.com/nodejs/doc-kit) became our home for all of this innovation.

The idea was that, by converting the Node.js Markdown documentation into a custom [annotated abstract syntax tree](https://github.com/nodejs/doc-kit/tree/main/src/generators/ast), we could feed that structure into multiple generators. Each generator could then power a different documentation output.

After creating the basic package structure and defining an annotated AST format, our first goal was to recreate the output of the previous tooling, almost 1:1. We started with a [`legacy-json`](https://github.com/nodejs/doc-kit/pull/142) generator, followed by a [`legacy-html`](https://github.com/nodejs/doc-kit/tree/main/src/generators/legacy-html) one.

This way, we could swap out the legacy tooling for the modern one long before the redesign was completed.

In fact, you probably did not know it, but for several Node.js releases, `doc-kit` has already been working behind the scenes. The main Node.js build now invokes [`@node-core/doc-kit`](https://www.npmjs.com/package/@node-core/doc-kit) for outputs including the legacy HTML and JSON documentation, [API links](https://github.com/nodejs/doc-kit/tree/main/src/generators/api-links), the [manual page](https://github.com/nodejs/node/pull/64157), and other generated documentation artifacts. You can see this integration in the [`nodejs/node` Makefile](https://github.com/nodejs/node/blob/main/Makefile).

### The Redesigned Generator

Once we had legacy-compatible generators in place, we began working toward our primary goal: the redesign.

However, we immediately hit a roadblock.

We needed a way to share components from the main Node.js website with `doc-kit`. At the time, those components were designed around [Next.js](https://github.com/vercel/next.js) and could not simply be imported by an independent documentation generator.

To remedy this, over the course of several months, we migrated shared interface components, many of them one by one, into the separate [`@node-core/ui-components`](https://www.npmjs.com/package/@node-core/ui-components) [package](https://github.com/nodejs/nodejs.org/tree/main/packages/ui-components).

Once that was complete, we could finally begin work on the massive next step: the [`jsx-ast`](https://github.com/nodejs/doc-kit/pull/273) and [`web`](https://github.com/nodejs/doc-kit/pull/285) generators, our pipeline for AST -> JSX -> HTML.

### Working Backwards

Unless you have brainpower far exceeding the entirety of humankind, there is no practical way to "visualize" an abstract syntax tree.

An AST is JSON: very machine-readable and very much not human-visualizable.

So we had to work backwards.

Before we could confidently design our new pages, we needed a way to preview the JSX output and render it as a real page.

Thus, [the first version of the JSX generator](https://github.com/nodejs/doc-kit/pull/273) converted the Markdown syntax tree into a JSX-compatible tree using the [Unified](https://github.com/unifiedjs/unified) and [Recma](https://github.com/mdx-js/recma). That gave us a working path from JSX AST to rendered HTML, allowing us to iterate on the more sophisticated documentation transformations afterward.

Once we had that foundation, the next step was the two-month-long PR adding the [`web` generator](https://github.com/nodejs/doc-kit/pull/285), responsible for taking the generated JSX, bundling the required components and JavaScript, and producing the redesigned static documentation pages.

### Refining

Landing the web generator was a major milestone, but it did not mean the work was finished. In its current state, the web generator was about as complete as cake batter. Sure, it's got the core of a cake, but it's not really a cake yet, is it? (Although it's still delicious!)

The months that followed the landing of the `web` generator were spent [adding improvements](https://github.com/nodejs/doc-kit/pull/637), [improving search integration](https://github.com/nodejs/nodejs.org/pull/8836), and fixing lots and lots and lots of bugs.

That brings us to today: a completely redesigned Node.js documentation experience for you, and from the bottom of our hearts we hope you enjoy it.

## Where We Are Going Next

This isn't the end for [`doc-kit`](https://github.com/nodejs/doc-kit/issues/594) or the Web Team.

### The Redesigned JSON Generator

A [redesigned JSON generator](https://github.com/nodejs/doc-kit/pull/1079) would allow us to create a more deliberate, documented, and extensible representation of the Node.js API, particularly one that allows consumers to easily parse Node.js types, descriptions, and other details. We plan to work closely with the [`@types/node` maintainers](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node) to create a JSON format that allows consumers to learn all the same information available visually, in a more machine-readable format.

### doc-kit In Other Projects

[`doc-kit`](https://github.com/nodejs/doc-kit), at the end of the day, isn't just for Node.js. It's for any open-source project that wants to use it, whether it's [Node.js core](https://github.com/nodejs/node), Node.js's [Undici](https://github.com/nodejs/undici-website), or even the (coming soon) [Webpack redesign](https://github.com/webpack/webpack-doc-kit); we want our tooling to be accessible to all.

As we continue to develop and iterate on this tool, we encourage you to [try it out](https://github.com/nodejs/doc-kit) in your own repositories, see how you like it, [report bugs](https://github.com/nodejs/doc-kit/issues), and [request features](https://github.com/nodejs/doc-kit/issues/new/choose).

## Thanks

If I could, I would list the name of [each and every person who's contributed to `doc-kit`](https://github.com/nodejs/doc-kit/graphs/contributors) (including you, by reading this article). In an effort to keep you awake, I'll shorten that list to a few people and teams of note.

While a large portion of the PRs linked in this article were authored by myself, none of it would have been possible without the people who reviewed, challenged, tested, and improved that work. So, thank you to the [Node.js Web Team](https://github.com/nodejs/web-team) for supporting the redesign and maintaining the infrastructure around it.

Thank you to the people who built the foundation during the [nodejs.org redesign](https://nodejs.org/en/blog/announcements/diving-into-the-nodejs-website-redesign), including the many contributors who helped move the website toward its current architecture.

Thank you to every contributor who reported [search](https://github.com/nodejs/node/issues/49527), [scrolling](https://github.com/nodejs/node/issues/40099), [navigation](https://github.com/nodejs/node/issues/47858), accessibility, styling, and usability problems in the old documentation. We took each and every report into account when designing this new experience, and we hope you feel that your issues are resolved.

Thank you to the organizations that supported the broader Node.js website and design-system work, including the [OpenJS Foundation](https://openjsf.org), [Vercel](https://vercel.com), [Cloudflare](https://www.cloudflare.com), [Chromatic](https://www.chromatic.com), [Crowdin](https://crowdin.com), and [Sentry](https://sentry.io).

Finally, thank you to the [Node.js community](https://nodejs.org/en/about/get-involved). We love you.

Documentation is one of the primary ways people experience a project. Whether you are learning Node.js for the first time, checking a parameter in the middle of the night, maintaining a production application, or contributing to Node.js itself, we hope this redesign makes that experience a little faster, clearer, and more enjoyable.

Sincerely,
Aviv Keller & the entire Node.js Project