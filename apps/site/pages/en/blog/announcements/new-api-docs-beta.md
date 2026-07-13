---
date: '2026-07-12T12:00:00.000Z'
category: announcements
title: Try the New Node.js API Documentation Beta
layout: blog-post
author: Guilherme Araújo
---

We've been rebuilding how Node.js generates and presents its API documentation, and a preview is now live at [beta.docs.nodejs.org](https://beta.docs.nodejs.org/). Before it becomes the default, we want as many people as possible to use it for real work and tell us what you think.

## What's different for readers

The content itself hasn't changed: every page is generated from the same Markdown files in the [nodejs/node](https://github.com/nodejs/node) repository that power the current docs. The features you rely on today made the trip too: light and dark themes, ESM/CJS switching and copy buttons on snippets, stability badges, and version history.

The redesign goes deeper than visuals, though: navigation, layout, and readability were all reworked so that finding and understanding an API takes less effort. On top of that, the beta adds things the current docs have never had:

- **Search**: For the first time, the API docs have built-in search. A search box on every page, with a keyboard shortcut, lets you jump anywhere in the API without a detour through a search engine.
- **One design across the project**: The API docs now shares the design system of the nodejs.org website, with a persistent sidebar listing every module, an always-visible per-page table of contents, and a layout that works on small screens.
- **Docs as Markdown**: Every page can now be viewed as plain Markdown, a format that AI tools like Claude Code and Codex can work with natively. Point them at a page and they can read it as is, with no HTML scraping in between.

And that's not the whole list: the beta also ships features like reading times, announcement bars, [llms.txt](https://nodejs.org/llms.txt) etc.

We also care about the needs of every user, and we pay attention to the ones that are easy to overlook. Every page stays usable even with JavaScript disabled and offline.

## Same content, new tooling

Under the hood, the beta is built with [doc-kit](https://github.com/nodejs/doc-kit), a standalone tool built to replace the current documentation generator, which has lived inside Node.js core for years.

It parses the existing Markdown files and can produce several outputs from them: the redesigned web pages you see on the beta, plus the legacy HTML, JSON, man-page formats etc. Existing consumers of those formats keep working during the transition, and contributors keep editing the same Markdown files they always have.

There's a broader goal here too: any project can pick up doc-kit for its own documentation, inside or outside the Node.js ecosystem. And that's already happening. The [undici docs](https://undici.nodejs.org/) are built with doc-kit today, and [webpack is migrating](https://github.com/webpack/webpack-doc-kit) its API documentation as well.

If you're curious about the design and progress of the effort, the tracking issue at [nodejs/node#52343](https://github.com/nodejs/node/issues/52343) has the full picture.

## We need your feedback

This is a beta, and we're publishing it early because we want people using it and giving us feedback, so we can iterate before the new docs replace the current ones. If you spend time in the API docs, try spending it on [beta.docs.nodejs.org](https://beta.docs.nodejs.org/) for a while and let us know how it goes.

Please open an issue on the [nodejs/doc-kit](https://github.com/nodejs/doc-kit/issues) repository with anything you find, big or small. The current documentation remains in place in the meantime, so nothing changes for you today — but with your help, the new docs will be ready to take over soon.

## Acknowledgments

None of this would exist without the [Node.js Web Team](https://github.com/nodejs/web-team/blob/main/MEMBERS.md), whose members designed, built, and reviewed everything described in this post. Thanks as well to the Node.js community and the collaborators who have already helped by reviewing, testing, and making suggestions along the way. Thank you all for making this possible.
