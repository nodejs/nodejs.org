---
date: '2026-07-12T12:00:00.000Z'
category: announcements
title: Check out the New Node.js API Documentation Preview
layout: blog-post
author: Guilherme Araújo
---

We've been rebuilding how Node.js generates and presents its API documentation, and a preview is now live at [beta.docs.nodejs.org](https://beta.docs.nodejs.org/). Before it becomes the default, we want as many people as possible to use it for real work and tell us what you think.

## What's different for readers

The content itself hasn't changed: every page is generated from the same Markdown files in the [nodejs/node](https://github.com/nodejs/node) repository that power the current docs. The features you rely on today made the trip too: light and dark themes, ESM/CJS switching and copy buttons on snippets, stability badges, version history, and the Markdown version of every page.

The redesign goes deeper than visuals, though: navigation, layout, and readability were all reworked so that finding and understanding an API takes less effort. On top of that, the beta adds things the current docs have never had:

- **Search**: For the first time, the API docs have built-in search. A search box on every page, with a keyboard shortcut, lets you jump anywhere in the API without a detour through a search engine.
- **One design across the project**: The API docs now share the design system of the nodejs.org website, with a persistent sidebar listing every module, an always-visible per-page table of contents, and a layout that works on small screens.

And that's not the whole list: the beta also ships features like reading times and announcement bars.

We also care about the needs of every user, and we pay attention to the ones that are easy to overlook. Every page stays usable even with JavaScript disabled and offline.

## Under-the-hood

The redesigned documentation is built with [doc-kit](https://github.com/nodejs/doc-kit), a standalone tool developed by the Node.js Project to replace the previous, legacy, documentation generator.

For more information on doc-kit, and its capabilities for other projects, please refer to [its repository](https://github.com/nodejs/doc-kit). This will also be the place where any and all bug reports, feature requests, and other tasks should be tracked.

## We need your feedback

While we are proud to state that the redesigned documentation is entering its final stage of development, feedback is still a crucial part of this migration, and we'd love to hear your thoughts on this process. Please open an issue on the [nodejs/doc-kit](https://github.com/nodejs/doc-kit/issues) repository with anything you find, big or small.

## Acknowledgments

None of this would exist without the [Node.js Web Team](https://github.com/nodejs/web-team/blob/main/MEMBERS.md), whose members designed, built, and reviewed everything described in this post. Thanks as well to the Node.js community and the collaborators who have already helped by reviewing, testing, and making suggestions along the way. Thank you all for making this possible.
