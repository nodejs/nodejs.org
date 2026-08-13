---
date: '2026-08-18T19:00:00Z'
category: announcements
title: AI Can Assist, but Human Judgment Comes First in Node.js Contributions
layout: blog-post
author: The Node.js Project
---

The Node.js project has published a new [AI use policy and guidelines](https://github.com/nodejs/node/blob/main/doc/contributing/ai-guidelines.md) for contributors. The guidance is built around a simple principle: **tools should never replace human judgment, regardless of whether they are powered by AI.**

AI tools can help contributors explore a codebase and improve their work, but they can also make it easy to submit changes without fully understanding them. In open source, every contribution must be understood, tested, reviewed, and maintained by people.

The new guidance makes the project's expectations explicit so that contributors know what is required before submitting AI-assisted work and collaborators have a shared standard for reviewing it. It aligns with the [OpenJS Foundation AI Coding Assistants Policy](https://ai-coding-assistants-policy.openjsf.org/).

## Why are these guidelines needed?

Node.js is maintained by people, and review time is limited. Producing a change can now take far less time than carefully evaluating whether it is correct, appropriate, secure, and maintainable. Submitting generated work without first understanding and verifying it shifts that cost to collaborators.

## What do the guidelines say?

Contributors remain fully responsible for every change they propose, no matter which tools helped create it. They must be able to explain why the change improves Node.js, how it works, and how they verified it. "The AI did it" is never an acceptable substitute for that understanding.

For that reason, pull requests containing AI-generated code that the author has not personally understood, tested, and verified may be closed without additional review. Repeated low-quality submissions, a continued lack of understanding of the project and its processes, or dishonesty about automated assistance may lead to a contributor being blocked from further contributions.

Pull requests must also not be opened by automated tools unless the project has approved that automation in advance. Approval can be requested through [nodejs/admin](https://github.com/nodejs/admin/issues), or through the usual review process when proposing a GitHub workflow.

### Communication should still be human communication

The guidance applies to communication as well as code. Contributors should not paste messages generated entirely by AI into pull requests, issues, or Node.js communication channels. Project discussions work best when participants share their own understanding and respond directly to one another.

Before sharing claims made by AI tools, contributors must verify them against the relevant code, documentation, or specifications. Grammar and spell-checking tools remain welcome when they make a contributor's own message clearer and more concise.

## How does this affect contributors?

Node.js is not banning AI-assisted contributions. The project is setting expectations for using these tools without weakening code quality, trust, or the human collaboration that sustains the project.

When using AI tools, contributors are expected to:

- **Understand the relevant code first.** Tool-generated analysis should be treated as a hypothesis and checked against the source code, documentation, and specifications.
- **Own every submitted line.** All contributions must continue to meet the project's Developer's Certificate of Origin and licensing requirements. Contributors must be prepared to explain their changes in detail during review.
- **Keep commits and comments useful.** The existing commit guidelines still apply. Comments should explain non-obvious logic rather than restating the code.
- **Test the intended behavior.** Tests need independent human verification. A test that merely agrees with an implementation is not enough if both encode the same mistake.
- **Stay involved.** Authors are expected to respond to feedback and follow their pull requests through to completion or close them when they can no longer continue the work.
- **Disclose AI assistance honestly.** Disclosure provides useful context, but it does not transfer responsibility away from the contributor.

The policy also asks contributors not to use AI to claim `good first issue` tasks. Those issues are intentionally set aside to help new contributors learn the codebase and the project's processes through hands-on work.

Before opening an AI-assisted contribution, read the full [AI use policy and guidelines](https://github.com/nodejs/node/blob/main/doc/contributing/ai-guidelines.md). Understand the change, verify the claims, test the behavior, disclose the assistance, and be ready to work with reviewers. The tool may assist with the contribution, but a person must always stand behind it.
