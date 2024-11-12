---
date: '2024-11-11T00:00:00.000Z'
category: events
title: 'Trip report: Node.js collaboration summit (2024 Dublin)'
layout: blog-post
author: AugustinMauroy
---

<!--
day 1: https://hackmd.io/-8o2Th28QhuNJwO43fafAw
day 2: https://hackmd.io/V3xtjlcrTIGsemPv8t-tKg
-->

Following the successful Node.js collaboration summit in London earlier this year, the Node.js community gathered once again for the second summit of 2024. This time, the event was hosted by [Baseline](https://www.baseline.community/events), a community and workshop space in Dublin.

The [second collaboration summit of 2024](https://github.com/openjs-foundation/summit/issues/419), held on 7–8 November, continued the tradition of sharing knowledge, brainstorming solutions, and pushing forward new initiatives within the Node.js ecosystem. This edition focused on a range of topics, from collaborator health and diversity to documentation improvements and technical advancements. Here is a recap of what happened at the summit.

## Collaborator health survey

## Next-10 Survey

## To know you is to love you. Diversifying Node.js

## Next 10 - Deep dive on funding

## Documentation Improvements (Node.js learn section)

The documentation session focused on improving the "Learn" section of the Node.js website, aiming to make it more accessible and up-to-date for newcomers and experienced developers alike. The discussion was initiated by Stephen and taken up by Claudio (a maintainer of nodejs.org).

### Key Points Discussed

- **Website Redesign and Current State**: Claudio discussed the ongoing website redesign and the current state of the documentation. The consensus was that the "Learn" section needs more attention and regular updates.

- **Ownership and Responsibility**: Augustin pointed out that there is no clear ownership of the content in the "Learn" section. This lack of responsibility makes it challenging to keep the documentation updated.

- **Linking to Changes**: Jacob suggested adding links in the "Learn" section to mention all the changes, making it easier for users to track updates.

- **Last Updated/Reviewed**: Alexander proposed adding a "last updated" or "last reviewed" section to reflect the currency of the documentation. This would help users understand how up-to-date the information is.

- **Translation and Sync Issues**: Brian and Matteo discussed the challenges of translating the "Learn" section. While Crowdin helps keep translations up-to-date, there were concerns about the potential for misinterpretations and the difficulty of maintaining external translations.

- **Target Audience and Content Relevance**: Matteo emphasized the importance of understanding the target audience for the "Learn" section. The discussion highlighted the need for a more structured flow that introduces basic concepts in a way that makes sense for beginners. It was noted that the current content includes deep topics like profiling but lacks essential content like HTTP, which can lead users to seek outdated information elsewhere.

- **Content Creators and Contributors**: Stephen suggested reaching out to known content creators to contribute to the "Learn" section. The idea of creating a scroll of "things that you should know" was also proposed to guide users through essential topics.

- **External Content and Verification**: Alexander suggested pointing to external content from the website, but Claudio raised concerns about the difficulty of verifying the quality and relevance of external resources.

- **API Docs vs. Learn Section**: Augustin clarified that the "Learn" section should not be a course but rather a guide with examples using the API docs. The goal is to provide practical examples and guidance rather than comprehensive tutorials.

### Potential Action Items

- **Identify Owners**: Establish clear ownership and responsibility for the "Learn" section to ensure regular updates and maintenance.

- **Update Content**: Ensure that the "Learn" section is updated regularly to reflect the latest changes and best practices.

- **Add Last Updated/Reviewed**: Implement a "last updated" or "last reviewed" section to indicate the currency of the documentation.

- **Improve Translation Process**: Continue using Crowdin for translations but be mindful of potential misinterpretations and the challenges of maintaining external translations.

- **Define Target Audience**: Clearly define the target audience for the "Learn" section and structure the content to meet their needs.

- **Engage Content Creators**: Reach out to known content creators to contribute to the "Learn" section and create a scroll of essential topics.

- **Verify External Content**: If pointing to external content, ensure that it is verified and relevant to the needs of Node.js users.

- **Differentiate from API Docs**: Ensure that the "Learn" section provides practical examples and guidance rather than comprehensive tutorials, differentiating it from the API docs.

### Summary

The documentation session highlighted the need for improved ownership, regular updates, and a clear understanding of the target audience for the "Learn" section. By addressing these issues, the Node.js community can provide more accessible and up-to-date documentation that meets the needs of both newcomers and experienced developers.

> If you want to follow the discussion, you can check the [collab summit brainstorming notes](https://github.com/nodejs/nodejs.org/issues/7197).

## Module loading customization/optimization and CJS/ESM interoperability

The session on module loading customization and CJS/ESM interoperability focused on several key areas, including the removal of the `--experimental-default-type` flag, marking syntax detection as stable, and documenting dual package shipping patterns.

### `--experimental-default-type`

- **Removal Discussion**: There was a consensus that the `--experimental-default-type` flag could be removed, as no one in the room objected to its removal.
- **Error Message Improvement**: It was noted that the error message from mixing CJS and ESM syntax could be improved.
- **Next Steps**: Geoffrey suggested marking syntax detection as stable and dropping the default mode switch experiment. Benjamin agreed, noting that there have been no complaints about the current implementation.
- **Timeline for Removal**: Joyee raised the question of when to remove the flag, suggesting it could be done in the next major or minor release. Michael Dawson questioned the benefit of removing it now, while Geoffrey pointed out the code complexity in keeping it.

### Syntax Detection

- **Stability**: The group discussed whether syntax detection could be marked as stable, given that it has been unflagged since July.

### Documenting Dual Package Shipping Patterns

- **Ecosystem Practices**: The discussion turned to documenting dual package shipping patterns and updating ecosystem practices. Filip mentioned that he decided not to support CJS users who run Node.js versions that don't support `require(esm)`.
- **Guidance for Maintainers**: The consensus was that maintainers should be provided with different guides for different choices, as some may still want to support older versions of Node.js.
- **Future Prospects**: Jordan envisioned a future where shipping native ESM (only) in all packages would be feasible, as long as there is an easy method for users on older engines to seamlessly adapt/transpile a consistent compile source.

### ESM as First Class

- **Opinionated Documentation**: Geoffrey suggested that the documentation could be more opinionated, telling people to write ESM and considering CommonJS as legacy (but still supported). This would move away from presenting both as equal first-class citizens.
- **Learn Article**: Jacob mentioned a potential Learn article that could be ported from the loaders example, providing practical guidance on configuring CommonJS and ESM for Node.js.

### `node --init`

- **Problem** (npm init): The group discussed the issue of `npm init` not making `"type": "module"` by default.
- **Solution** (`node --init`): The proposed solution was to introduce a `node --init` command to create a `package.json` with `"type": "module"`. This could be extended to include `"scripts": {"test": "node --test"}` to bootstrap a project.
- **Related Work**: Wes mentioned that the package maintenance working group (Node.js WG) is working on an [`pkgjs/create-package-json`](https://github.com/pkgjs/create-package-json) an alternative to `npm init`.

> **⚠️ WARNING**: This is a proposal and not yet implemented. Also, it's may never be implemented.
> Please don't take this for granted.

### Missing Pieces of ESM

- **Performance**: Geoffrey mentioned a work-in-progress to remove async handling in the ESM loader, which is currently failing tests due to unexpected async activity. Jacob noted that it is currently impossible for ESM to be faster than CJS, but Joyee mentioned that it would be possible when import defer eval is shipped in V8.
- **Snapshot & SEA Support**: The group discussed the need for snapshot and SEA support in ESM.

### Synchronous, In-thread & Universal Module Loader Customization Hooks

- **Proposal Summary**: Joyee summarized the new proposal for synchronous, in-thread, and universal module loader customization hooks.
- **Escape Hatch**: Matteo mentioned the initial motivation for making hooks async to support network loading and his experiments with making async operations synchronous using a package called [`everysync`](https://www.npmjs.com/package/everysync).
- **Migration Guide**: Jacob confirmed that the plan before removing the async hooks is to write a migration guide including [`everysync`](https://www.npmjs.com/package/everysync) (or similar).

### Summary

The session on module loading customization and CJS/ESM interoperability highlighted the need for clear documentation, improved error messages, and a more opinionated approach to promoting ESM as a first-class citizen. The group also discussed the challenges and potential solutions for making ESM faster and more efficient, as well as the need for better tools and practices to facilitate the migration to ESM.

## Facilitating userland migrations to new features and breaking changes

This session was presented by [Jacob Smith](https://github.com/JakobJingleheimer).

## Node.js Diagnostics WG meeting

Diagnostic doesn't work with ESM so issue for "ESM as first class"

## Tooling group session

- X -> 🦋

## Personal note

> I think that was the part that touched and pleased me the most. It was the connection with the people. Because everyone involved is great. These are people I'd only been able to talk to online, and here you meet them in real life.
>
> <cite>Augustin Mauroy</cite>

## Thanks

Thanks to all the attendees. Special thanks to the Baseline team for hosting the summit and providing a welcoming space for the Node.js community.

Also big thanks to [Claudio Wunder](https://github.com/ovflowd), [Matteo Collina](https://github.com/mcollina), Robin Ginn, and the [OpenJS Foundation](https://openjsf.org) for organizing the event and making it possible.
