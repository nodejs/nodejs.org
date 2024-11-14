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

<!-- @AugustinMauroy todo -->

## Next-10 Survey

<!-- @AugustinMauroy todo -->

## To know you is to love you. Diversifying Node.js

<!-- @AugustinMauroy todo -->

## Next 10 - Deep dive on funding

<!-- @AugustinMauroy todo -->

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

## Facilitating Userland Migrations to New Features and Breaking Changes

This session, presented by [Jacob Smith](https://github.com/JakobJingleheimer), focused on strategies and tools to facilitate the migration of userland code to new features and breaking changes in Node.js. The discussions revolved around codemods, lint rules, and best practices for managing these transitions.

### Key Points Discussed

#### Codemods

- **Demonstration**: Jacob demonstrated the `ts-correct-specifier` codemod, which can help automate the migration process. This tool can be particularly useful for updating TypeScript specifiers to comply with new standards or changes in Node.js.
- **Potential for Dependencies**: The group discussed the potential for codemods to be used not just for code but also for dependencies. This could help ensure that dependencies are updated to be compatible with new Node.js features and breaking changes.
- **Dependabot Integration**: Darcy suggested improved Dependabot integration to facilitate migrations. Dependabot can automatically create pull requests to update dependencies, making it easier to keep projects up-to-date.
- **Registry for Migrated Projects**: The idea of maintaining a registry for projects that have already been migrated was proposed. This would help avoid redundant work and save compute resources by preventing the same migrations from being performed multiple times.
- **Good First Issues**: Geoffrey suggested creating a tracking issue in the Node.js repository for codemods that need to be developed. Tagging these issues as "good first issues" could encourage new contributors to get involved and help with the migration efforts.

#### Lint Rules

- **Enforcing Best Practices**: Wes suggested using lint rules to enforce best practices. Lint rules can help catch issues early in the development process and ensure that code adheres to the latest standards and best practices.
- **Automated Fixes**: Alexander mentioned the use of lint rules with automated fixes, such as those provided by VSCode, to help developers quickly update their code to comply with new features and breaking changes.

#### Best Practices

- **Setting Clear Expectations**: James emphasized the importance of setting clear expectations and timelines for breaking changes. This includes providing warnings before major changes and ensuring clear documentation about the status and upcoming changes.
- **Opt-In Mechanisms**: There was a discussion on making experimental features opt-in via API or flags, especially for library authors who might rely on these features. This would give developers more control over when and how they adopt new features.
- **Incentives for Migration**: Jordan cautioned that changing people's behavior is challenging and requires incentives rather than enforcement. Providing clear benefits and easy-to-use tools can encourage developers to migrate to new features and breaking changes.

### Potential Action Items

- **Develop and Promote Codemods**: Continue developing and promoting codemods to automate the migration process. Encourage the community to contribute to these tools and create new codemods as needed.
- **Integrate with Dependabot**: Improve Dependabot integration to facilitate dependency updates and migrations. This could include creating custom Dependabot configurations or scripts to handle specific migration tasks.
- **Create a Registry for Migrated Projects**: Maintain a registry of projects that have already been migrated to avoid redundant work and save compute resources. This could be done through a centralized repository or a tracking issue in the Node.js repository.
- **Implement Lint Rules**: Use lint rules to enforce best practices and catch issues early in the development process. Encourage the use of automated fixes to help developers quickly update their code.
- **Set Clear Expectations and Timelines**: Provide clear documentation and timelines for breaking changes. This includes providing warnings before major changes and ensuring that developers are aware of the status and upcoming changes.
- **Provide Opt-In Mechanisms**: Make experimental features opt-in via API or flags to give developers more control over when and how they adopt new features.
- **Offer Incentives for Migration**: Provide clear benefits and easy-to-use tools to encourage developers to migrate to new features and breaking changes.

## Node.js Diagnostics WG Meeting

The Node.js Diagnostics Working Group (WG) meeting focused on several key areas related to diagnostics and observability in Node.js, including async context, diagnostics channels, and the future of the `import-in-the-middle` project.

### Async Context

- **Current State**: Stephen presented some slides about async context, highlighting that it currently doesn't work very well with concurrency.
- **Cache Behavior**: Chengzhong discussed the cache behavior related to async context, noting that there hasn't been a conclusive solution yet.
- **Documentation**: Stephen pointed out that diagnostics documentation doesn't exist in the "Learn" section, and Augustin suggested that it might need an update from the guide section.

### Future of `import-in-the-middle`

- **Critical Package**: Bryan discussed the critical role of `import-in-the-middle` for APM vendors, as it provides the ability to manipulate ESM modules and shim exports.
- **Edge Cases**: Bryan noted that there are too many edge cases that the package cannot support, particularly when modules modify their exports. Currently, APM vendors modify code in hooks, which has performance implications but is the best available solution.
- **Diagnostics Channels**: Matteo emphasized the need to plan and document packages that are broken and to provide a path for APM vendors. He suggested using diagnostics channels if possible.
- **Monkey Patching**: Bryan mentioned that diagnostics channels are useful, but there is still a need for some monkey patching abilities.

### Diagnostics Channels and Observability

- **Abort Control**: Simon discussed the possibility of using diagnostics channels for abort control, which is not possible with tracing channels.
- **Monkey Patching**: The group discussed the ability to patch sources for transpilers but noted that relying on it for functionalities is brittle and depends on the discretion of hook authors.
- **Live Debugging**: Thomas talked about efforts to get live debugging, currently using the inspector protocol, and collaborating with V8 to improve this area.
- **Transactional Memory**: Alexander suggested exploring transactional memory, and Thomas mentioned ideas like thread pause optimization and copy-on-write for data processing.

## Tooling Group Session

The tooling group session focused on various aspects of improving the tooling ecosystem around Node.js, including social media engagement, handling experimental status, and facilitating migrations to new features and breaking changes.

### Social Media Engagement

- **Bluesky Platform**: Wes presented the `pkgjs` initiative and discussed the potential migration from the current social media platform to Bluesky. The rationale behind this move was the better engagement and open-source nature of Bluesky. At the time of publish, Node.js is present on Bluesky under the handle [@nodejs.org](https://bsky.app/profile/nodejs.org).
- **Cross-Posting**: There was a suggestion to start with cross-posting to both platforms to ensure a smooth transition and maintain engagement with existing followers.
- **Automation**: Jacob mentioned that Bluesky supports automation, which could be beneficial for managing social media presence.
- **Foundation Involvement**: The discussion highlighted the need to involve the OpenJS Foundation in this decision and potentially take it to the Community Programs Committee (CPC) for further deliberation.
- **Password Sharing**: Joyee suggested sharing the social media account passwords using a secure method like OnePassword to streamline the posting process and reduce delays due to timezone differences.

### Handling Experimental Status

- **Experimental Features**: The group discussed the handling of experimental features, especially when their adoption becomes significant. Stephen noted that even though some features are experimental, they are widely used by the community, such as `module.register`.
- **Timeline and Expectations**: James emphasized the importance of setting clear expectations and timelines for experimental features. This includes providing warnings before major changes and ensuring clear documentation about the status and upcoming changes.
- **Opt-In Mechanisms**: There was a discussion on making experimental features opt-in via API or flags, especially for library authors who might rely on these features.
- **Lint Rules and Codemods**: Wes suggested using lint rules to enforce best practices and codemods to facilitate migrations. Jordan cautioned that changing people's behavior is challenging and requires incentives rather than enforcement.

### Facilitating Migrations

- **Codemods**: Jacob demonstrated the `ts-correct-specifier` codemod, which can help automate the migration process. The group discussed the potential for codemods to be used not just for code but also for dependencies.
- **Dependabot Integration**: Darcy suggested improved Dependabot integration to facilitate migrations, noting that people may not want to run random codemods found on the internet.
- **Registry for Migrated Projects**: The idea of maintaining a registry for projects that have already been migrated was proposed to avoid redundant work and save compute resources.
- **Good First Issues**: Geoffrey suggested creating a tracking issue in the Node.js repository for codemods that need to be developed, tagging them as "good first issues" to encourage new contributors.

## Personal note

> I think the part that touched and pleased me the most was the connection with the people, because everyone involved is great. These are people I'd only been able to talk to online, and here you meet them in real life.
>
> <cite>Augustin Mauroy</cite>

## Thanks

Thanks to all the attendees. Special thanks to the Baseline team for hosting the summit and providing a welcoming space for the Node.js community.

Also big thanks to [Claudio Wunder](https://github.com/ovflowd), [Matteo Collina](https://github.com/mcollina), Robin Ginn, and the [OpenJS Foundation](https://openjsf.org) for organizing the event and making it possible.
