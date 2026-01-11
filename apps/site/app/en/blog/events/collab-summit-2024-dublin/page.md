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

## Collaborator Health Survey

The collaborator health survey session at the Node.js collaboration summit in Dublin focused on understanding the current state of collaborator health and identifying ways to improve the well-being and productivity of contributors. The discussion, led by Marco Ippolito ([@marco-ippolito](https://github.com/marco-ippolito)) and Michael Dawson ([@mhdawson](https://github.com/mhdawson)), aimed to gather insights from the community and develop actionable steps to enhance the collaborator experience.

### Current State of Collaborator Health

The session began with shared slides outlining the current state of collaborator health within the Node.js project. Key points discussed included:

- **CI Challenges**: We highlighted the biggest issue with the CI system as finding out what is wrong when something goes awry. This can be a frustrating and time-consuming process for collaborators.
- **ncu-ci Command**: A collaborator showcased the [`ncu-ci` command](https://github.com/nodejs/node-core-utils/blob/main/docs/ncu-ci.md) and the [reliability repository](https://github.com/nodejs/reliability), demonstrating tools that can help streamline the CI process and improve collaborator efficiency.
- **Documentation Needs**: Discussion emphasized the importance of mentioning the `ncu-ci` command in the bot comment for CI and documenting it better in the collaborator guide. This would ensure that collaborators are aware of the available tools and how to use them effectively.

### Community Feedback and Suggestions

The discussion also included valuable feedback and suggestions from the community on how to improve collaborator health:

- **BuildPulse Integration**: We mentioned that BuildPulse is already integrated with the CI system but noted that many collaborators are unaware of its capabilities. Improving awareness and documentation around BuildPulse could help collaborators better understand and utilize the tool.
- **Artifact Distribution**: We suggested using artifacts from the builds to help with bisecting commits, although it was noted that the CI system does not currently distribute them. Further, only the Windows artifacts are available, highlighting a gap in the current process.
- **AI Products**: A collaborator mentioned that their company has seen impressive AI products that could help with CI issues, suggesting potential partnerships worth exploring.
- **Social Media Recognition**: We proposed announcing first PRs or collaborator nominations on social media to provide public recognition for contributors. This could help motivate and engage collaborators, fostering a sense of community and achievement.

### Challenges and Solutions

The session also addressed some of the challenges faced by collaborators and proposed solutions to improve their experience:

- **New Collaborator Onboarding**: We highlighted the need for more public recognition for new collaborators to encourage their continued engagement. However, their was caution about the potential for contributors to participate solely for social approval and then drop out, suggesting the need to balance recognition with meaningful contributions.
- **Small Changes and Effort**: We noted that small changes do not necessarily equate to low effort, as some seemingly minor changes can require significant effort to implement. This underscores the importance of recognizing and valuing all contributions, regardless of their size.
- **Project Management**: We emphasized the need for better project management within the Node.js project, including tracking features and roadmaps. This could help ensure that collaborators have clear guidance and support in their contributions.
- **Buddy System**: We suggested implementing a buddy system to help new collaborators get started and provide ongoing support. This could involve pairing new collaborators with more experienced contributors to help them navigate the project and contribute effectively.

### Actionable Steps

The session concluded with a discussion of actionable steps that the Node.js community can take to improve collaborator health:

- **Improve CI Documentation**: Ensure that the `ncu-ci` command and other CI tools are well-documented in the collaborator guide. This will help collaborators understand and utilize these tools effectively.
- **Promote BuildPulse**: Increase awareness and documentation around BuildPulse to help collaborators better understand and utilize the tool for bisecting commits and improving CI efficiency.
- **Public Recognition**: Implement public recognition for new collaborators, such as announcing first PRs or collaborator nominations on social media. This can help motivate and engage collaborators, fostering a sense of community and achievement.
- **Balance Recognition and Contributions**: Ensure that recognition is balanced with meaningful contributions to avoid the potential for contributors to participate solely for social approval and then drop out.
- **Value All Contributions**: Recognize and value all contributions, regardless of their size, acknowledging the effort required to implement even seemingly minor changes.
- **Improve Project Management**: Implement better project management practices, including tracking features and roadmaps, to provide clear guidance and support for collaborators.
- **Buddy System**: Establish a buddy system to help new collaborators get started and provide ongoing support, pairing them with more experienced contributors to help them navigate the project and contribute effectively.

## Next-10 Survey

The Next-10 Survey session at the Node.js collaboration summit in Dublin focused on the results and insights gathered from the latest survey conducted by the Node.js community. The discussion, led by Jean Burellier ([@sheplu](https://github.com/sheplu)), aimed to analyze the survey data, identify trends, and develop actionable steps to address the findings. The survey covered a wide range of topics, including ESM syntax usage, next initiatives, and the overall health of the Node.js ecosystem.

### Survey Overview

Jean presented the slides outlining the [key findings from the Next-10 Survey](https://github.com/nodejs/next-10/tree/main/surveys/2024-04). The survey received over 2000 responses, providing a comprehensive view of the Node.js community's thoughts and experiences.

### ESM Syntax Usage

One of the main topics discussed was the usage of ESM (ECMAScript Modules) syntax in production environments. Key points included:

- **Awareness and Adoption**: We noted that with over 2000 responses, most participants should have a good understanding of whether they are running ESM in production. However, we also acknowledged that some respondents might not actually know whether they are using ESM, as frameworks like Next.js transpile ESM to CJS (CommonJS) behind the scenes.
- **Usage Counter Proposal**: We suggested adding an opt-in usage counter to core that dumps JSON files, which could be requested in the survey. This would allow respondents to easily sanitize and share their usage data, providing more accurate insights into ESM adoption.
- **Visibility and Outreach**: We emphasized the need for more visibility of the survey to reach a broader audience. Ethan added that it is crucial to reach out to the right people to ask relevant questions and gather meaningful data.

### Next Initiatives

The discussion also covered potential next initiatives for the Node.js project:

- **Failed Participation Example**: We shared an example of a failed participation initiative related to vulnerability reporting. It is important to be clear about what you want to achieve and to engage people effectively.
- **Flaky CI Working Group**: We proposed the creation of a working group focused on addressing flaky CI issues, highlighting the need to improve the reliability of the CI system.
- **Next-Gen HTTP**: We also mentioned the importance of exploring next-generation HTTP protocols and their implications for the Node.js ecosystem.

### Data Analysis and Professional Help

The session highlighted the need for more professional help with data analysis to extract meaningful insights from the survey results:

- **Professional Data Analysis**: A participant suggested the need for more professional help with the data, noting that while the survey received a large number of responses, the analysis could be improved to derive actionable insights.
- **Zoom AI Tool**: Several participants mentioned the hope that the Zoom AI tool captured missed discussions, underscoring the importance of comprehensive documentation and analysis.

### Actionable Steps

The session concluded with a discussion of actionable steps that the Node.js community can take to address the findings from the Next-10 Survey:

- **Improve Survey Visibility**: Increase the visibility of the survey to reach a broader audience and gather more comprehensive data. This could involve promoting the survey through various channels and engaging with key stakeholders.
- **Clarify ESM Usage**: Ensure that respondents have a clear understanding of whether they are using ESM in production. This could involve providing guidance on how to determine ESM usage and adding an opt-in usage counter to core.
- **Create Working Groups**: Establish working groups to address specific initiatives, such as a flaky CI working group, to focus on improving the reliability of the CI system.
- **Explore Next-Gen HTTP**: Investigate next-generation HTTP protocols and their implications for the Node.js ecosystem, ensuring that the project remains at the forefront of web development technologies.
- **Seek Professional Data Analysis**: Engage professional data analysts to help extract meaningful insights from the survey results, ensuring that the data is used effectively to inform decision-making.
- **Document Missed Discussions**: Ensure that all discussions and insights are comprehensively documented, utilizing tools like the Zoom AI tool to capture missed discussions and provide a complete record of the session.

## To know you is to love you. Diversifying Node.js

Diversity and inclusion are fundamental to the growth and success of any open-source community. The Node.js collaboration summit in Dublin provided a platform to discuss and address these critical issues. The session on diversity, led by Robin Bender Ginn ([@rginn](https://github.com/rginn)), focused on understanding the current state of diversity within the Node.js collaborator culture and identifying actionable steps to foster a more inclusive environment.

### Current State of Diversity

Robin began the session by asking three key questions to gauge the attendees' perspectives on the Node.js collaborator culture. The responses were collected on post-it notes and provided valuable insights into the current state of diversity within the community.

#### Q1: What words or phrases would you use to describe the Node.js collaborator culture?

- **Silos**: Some attendees felt that the community is divided into silos, with different groups working independently.
- **Scrappy**: The collaborator culture was described as scrappy, indicating a hands-on, DIY approach.
- **Similar pains that get heard and carried over**: There was a recognition that similar issues often resurface and need to be addressed repeatedly.
- **Chaos**: Some attendees perceived the collaborator culture as chaotic, with a lack of clear structure and organization.

#### Q2: What actions or behaviors would we like to see more of to contribute to a positive perception? What behaviors make you feel valued and included?

- **Patience**: Attendees emphasized the importance of patience in fostering a positive and inclusive environment.
- **Faster to get PR landed**: Streamlining the process for landing pull requests (PRs) was identified as a way to make contributors feel valued.
- **Mentorship**: Providing mentorship opportunities was seen as crucial for encouraging new contributors and helping them integrate into the community.
- **Outreach**: Actively reaching out to diverse groups and communities was highlighted as a way to promote inclusion.
- **Think more global**: Considering the global nature of the Node.js community and tailoring initiatives to be inclusive of different cultures and backgrounds.
- **Professionalism**: Maintaining a professional demeanor in interactions was seen as important for creating a welcoming environment.
- **Positive comments**: Providing positive feedback and encouragement was identified as a way to make contributors feel valued.

#### Q3: What is something that each of you could do personally or as a group to engage new diverse contributors? What's the best way to break into the project?

- **Mentoring**: Offering mentorship to new contributors was seen as a key action item.
- **Personal invites**: Personally inviting individuals from diverse backgrounds to contribute to the project.
- **Respect**: Showing respect for all contributors, regardless of their background or experience level.
- **Positive comments**: Providing positive feedback and encouragement to new contributors.
- **Promote more work**: Actively promoting the work of diverse contributors to highlight their contributions.
- **Patience**: Being patient with new contributors as they learn the ropes.
- **Attending diversity events**: Participating in diversity-focused events to engage with new contributors and foster a more inclusive community.

### Actionable Steps for Improving Diversity

The discussion highlighted several actionable steps that the Node.js community can take to improve diversity and inclusion:

- **Mentorship Programs**: Establish formal mentorship programs to provide guidance and support to new contributors.
- **Outreach Initiatives**: Actively reach out to diverse groups and communities to encourage their participation in the Node.js project.
- **Global Perspective**: Consider the global nature of the Node.js community and tailor initiatives to be inclusive of different cultures and backgrounds.
- **Positive Feedback**: Provide positive feedback and encouragement to new contributors to make them feel valued and included.
- **Promote Diverse Contributions**: Actively promote the work of diverse contributors to highlight their contributions and encourage others to get involved.
- **Attend Diversity Events**: Participate in diversity-focused events to engage with new contributors and foster a more inclusive community.

### Challenges and Solutions

The session also addressed some of the challenges faced by the Node.js community in promoting diversity and inclusion:

- **Language Barriers**: English as the primary language can be a barrier for non-native speakers. The community discussed the importance of providing more async communication in English to help overcome this challenge.
- **Undocumented Internal Knowledge**: The lack of documentation about internals can make it difficult for new contributors to get up to speed. Writing more documentation about internals, such as Async Hooks, was identified as a way to address this issue.
- **Gatekeeping**: The perception that making small contributions requires a lot of time and effort can be a barrier to entry. The community discussed the need to provide more guidance and support to help new contributors get started.

## Next 10 - Deep dive on funding

Funding is a critical aspect of sustaining and growing the Node.js project. The session on funding at the Node.js collaboration summit in Dublin delved into the current state of funding, potential sources of revenue, and strategies for effectively utilizing available resources. The discussion, led by Michael Dawson ([@mhdawson](https://github.com/mhdawson)) and Jean Burellier ([@sheplu](https://github.com/sheplu)), aimed to identify actionable steps to ensure the long-term financial health of the project.

### Current State of Funding

The session began with an overview of the current funding landscape for the Node.js project. Key points discussed included:

- **Foundation Support**: The OpenJS Foundation plays a crucial role in providing financial support for the Node.js project. However, there is a need to explore additional funding sources to ensure the project's sustainability.
- **Company Contributions**: While many companies benefit from Node.js, their contributions to the project often fall short of what is needed to support its ongoing development and maintenance.
- **Volunteer Efforts**: The project heavily relies on volunteer contributions, but this model can be unsustainable in the long term, especially for critical tasks such as security and CI maintenance.

### Potential Sources of Funding

The discussion explored various potential sources of funding that could help sustain the Node.js project:

- **Open Collective**: We mentioned the use of Open Collective as a funding platform, noting its advantages and limitations. While it has been used for CI funding, it has not seen widespread adoption.
- **GitHub Sponsors**: Another potential funding source is GitHub Sponsors, which could provide a more streamlined way for companies and individuals to contribute financially to the project.
- **Secure Project Funding**: We highlighted that the Node.js project is one of the first few foundations to receive secure project funding, with an initial allocation of $10,000 per project.
- **Project Alpha Omega**: We also mentioned Project Alpha Omega, which is now separate from OpenSSF and could provide additional funding opportunities.

### Strategies for Effective Utilization of Funds

The session also focused on strategies for effectively utilizing available funds to support the project's needs:

- **Prioritizing Critical Tasks**: We emphasized the importance of prioritizing critical tasks such as security and CI maintenance. These tasks are essential for the project's health and should be funded accordingly.
- **Documenting Needs**: We suggested documenting the project's funding needs clearly to ensure that potential contributors understand what is required and how their contributions will be used.
- **Engaging Companies**: We proposed that the foundation could engage with companies to encourage them to contribute financially to the project. This could involve talking to employers of new contributors to highlight the benefits of supporting Node.js.
- **Reducing Workload**: We suggested reducing the project's workload by maintaining fewer active release lines, such as one LTS and one Current release. This could help alleviate the burden on volunteers and make the project more sustainable.

### Challenges and Solutions

The discussion also addressed some of the challenges faced by the Node.js project in securing and utilizing funding:

- **Compliance and Regulations**: We noted that compliance with regulations is something that companies are willing to pay for, highlighting a potential funding opportunity.
- **Extended EOL Support**: We suggested using funding to extend the End of Life (EOL) support for LTS releases, noting that this could be a valuable service for companies relying on older versions of Node.js.
- **DevRel and Communication**: We emphasized the need for better communication with the broader community about the project's funding needs and how contributions are used. This could involve funding DevRel efforts to write blog posts and summarize the work of various working groups.
- **Social Media Recognition**: We suggested that social media recognition for companies contributing to the project could put social pressure on other companies to follow suit.

### Actionable Steps

The session concluded with a discussion of actionable steps that the Node.js community can take to improve the project's funding situation:

- **Identify Funding Needs**: Clearly document the project's funding needs and priorities to ensure that potential contributors understand what is required.
- **Engage with Companies**: Actively engage with companies to encourage them to contribute financially to the project. This could involve highlighting the benefits of supporting Node.js and the impact of their contributions.
- **Explore Additional Funding Sources**: Continue to explore additional funding sources, such as Open Collective, GitHub Sponsors, and secure project funding.
- **Prioritize Critical Tasks**: Ensure that available funds are used to support critical tasks such as security and CI maintenance.
- **Improve Communication**: Improve communication with the broader community about the project's funding needs and how contributions are used. This could involve funding DevRel efforts to write blog posts and summarize the work of various working groups.
- **Reduce Workload**: Consider reducing the project's workload by maintaining fewer active release lines to make the project more sustainable.

## Documentation Improvements (Node.js learn section)

The documentation session focused on improving the "Learn" section of the Node.js website, aiming to make it more accessible and up-to-date for newcomers and experienced developers alike. The discussion was led by Stephen Belanger ([@Qard](https://github.com/Qard)) and Claudio W ([@ovflowd](https://github.com/ovflowd)).

### Key Points Discussed

- **Website Redesign and Current State**: We discussed the ongoing website redesign and the current state of the documentation. The consensus was that the "Learn" section needs more attention and regular updates.

- **Ownership and Responsibility**: We pointed out that there is no clear ownership of the content in the "Learn" section. This lack of responsibility makes it challenging to keep the documentation updated.

- **Linking to Changes**: We suggested adding links in the "Learn" section to mention all the changes, making it easier for users to track updates.

- **Last Updated/Reviewed**: We proposed adding a "last updated" or "last reviewed" section to reflect the currency of the documentation. This would help users understand how up-to-date the information is.

- **Translation and Sync Issues**: We discussed the challenges of translating the "Learn" section. While Crowdin helps keep translations up-to-date, there were concerns about the potential for misinterpretations and the difficulty of maintaining external translations.

- **Target Audience and Content Relevance**: We emphasized the importance of understanding the target audience for the "Learn" section. The discussion highlighted the need for a more structured flow that introduces basic concepts in a way that makes sense for beginners. It was noted that the current content includes deep topics like profiling but lacks essential content like HTTP, which can lead users to seek outdated information elsewhere.

- **Content Creators and Contributors**: We suggested reaching out to known content creators to contribute to the "Learn" section. The idea of creating a scroll of "things that you should know" was also proposed to guide users through essential topics.

- **External Content and Verification**: We suggested pointing to external content from the website, but Claudio raised concerns about the difficulty of verifying the quality and relevance of external resources.

- **API Docs vs. Learn Section**: We clarified that the "Learn" section should not be a course but rather a guide with examples using the API docs. The goal is to provide practical examples and guidance rather than comprehensive tutorials.

### Potential Action Items

- **Identify Owners**: Establish clear ownership and responsibility for the "Learn" section to ensure regular updates and maintenance.

- **Update Content**: Ensure that the "Learn" section is updated regularly to reflect the latest changes and best practices.

- **Add Last Updated/Reviewed**: Implement a "last updated" or "last reviewed" section to indicate the currency of the documentation.

- **Improve Translation Process**: Continue using Crowdin for translations but be mindful of potential misinterpretations and the challenges of maintaining external translations.

- **Define Target Audience**: Clearly define the target audience for the "Learn" section and structure the content to meet their needs.

- **Engage Content Creators**: Reach out to known content creators to contribute to the "Learn" section and create a scroll of essential topics.

- **Verify External Content**: If pointing to external content, ensure that it is verified and relevant to the needs of Node.js users.

- **Differentiate from API Docs**: Ensure that the "Learn" section provides practical examples and guidance rather than comprehensive tutorials, differentiating it from the API docs.

## Module loading customization/optimization and CJS/ESM interoperability

The session on module loading customization and CJS/ESM interoperability focused on several key areas, including the removal of the `--experimental-default-type` flag, marking syntax detection as stable, and documenting dual package shipping patterns. Joyee Cheung ([@joyeecheung](https://github.com/joyeecheung)), Matteo Collina ([@mcollina](https://github.com/mcollina)), Paolo Insogna ([@ShogunPanda](https://github.com/ShogunPanda)), and Geoffrey Booth ([@GeoffreyBooth](https://github.com/GeoffreyBooth)) proposed and led the session.

### `--experimental-default-type`

- **Removal Discussion**: There was a consensus that the `--experimental-default-type` flag could be removed, as no one in the room objected to its removal.
- **Error Message Improvement**: It was noted that the error message from mixing CJS and ESM syntax could be improved.
- **Next Steps**: It was suggested marking syntax detection as stable and dropping the default mode switch experiment. Others agreed, noting that there have been no complaints about the current implementation.
- **Timeline for Removal**: We raised the question of when to remove the flag, suggesting it could be done in the next major or minor release. Some questioned the benefit of removing it now, while others pointed out the code complexity in keeping it.

### Syntax Detection

- **Stability**: The group discussed whether syntax detection could be marked as stable, given that it has been unflagged since July.

### Documenting Dual Package Shipping Patterns

- **Ecosystem Practices**: The discussion turned to documenting dual package shipping patterns and updating ecosystem practices. Some maintainers have decided not to support CJS users who run Node.js versions that don't support `require(esm)`.
- **Guidance for Maintainers**: The consensus was that maintainers should be provided with different guides for different choices, as some may still want to support older versions of Node.js.
- **Future Prospects**: We envisioned a future where shipping native ESM (only) in all packages would be feasible, as long as there is an easy method for users on older engines to seamlessly adapt/transpile a consistent compile source.

### ESM as First Class

- **Opinionated Documentation**: We suggested that the documentation could be more opinionated, telling people to write ESM and considering CommonJS as legacy (but still supported). This would move away from presenting both as equal first-class citizens.
- **Learn Article**: We mentioned a potential Learn article that could be ported from the loaders example, providing practical guidance on configuring CommonJS and ESM for Node.js.

### `node --init`

- **Problem** (npm init): The group discussed the issue of `npm init` not making `"type": "module"` by default.
- **Solution** (`node --init`): The proposed solution was to introduce a `node --init` command to create a `package.json` with `"type": "module"`. This could be extended to include `"scripts": {"test": "node --test"}` to bootstrap a project.
- **Related Work**: We mentioned that the package maintenance working group (Node.js WG) is working on an [`pkgjs/create-package-json`](https://github.com/pkgjs/create-package-json) an alternative to `npm init`.

> **⚠️ WARNING**: This is a proposal and not yet implemented. Also, it's may never be implemented.
> Please don't take this for granted.

### Missing Pieces of ESM

- **Performance**: We mentioned a work-in-progress to remove async handling in the ESM loader, which is currently failing tests due to unexpected async activity. We noted that it is currently impossible for ESM to be faster than CJS, but it was mentioned that it would be possible when import defer eval is shipped in V8.
- **Snapshot & SEA Support**: The group discussed the need for snapshot and SEA support in ESM.

### Synchronous, In-thread & Universal Module Loader Customization Hooks

- **Proposal Summary**: We summarized the new proposal for synchronous, in-thread, and universal module loader customization hooks.
- **Escape Hatch**: We mentioned the initial motivation for making hooks async to support network loading and experiments with making async operations synchronous using a package called [`everysync`](https://www.npmjs.com/package/everysync).
- **Migration Guide**: We confirmed that the plan before removing the async hooks is to write a migration guide including [`everysync`](https://www.npmjs.com/package/everysync) (or similar).

### Summary

The session on module loading customization and CJS/ESM interoperability highlighted the need for clear documentation, improved error messages, and a more opinionated approach to promoting ESM as a first-class citizen. The group also discussed the challenges and potential solutions for making ESM faster and more efficient, as well as the need for better tools and practices to facilitate the migration to ESM.

## Facilitating Userland Migrations to New Features and Breaking Changes

This session, presented by Jacob Smith ([@JakobJingleheimer](https://github.com/JakobJingleheimer)), focused on strategies and tools to facilitate the migration of userland code to new features and breaking changes in Node.js. The discussions revolved around codemods, lint rules, and best practices for managing these transitions.

### Key Points Discussed

#### Codemods

- **Demonstration**: Jacob demonstrated the `ts-correct-specifier` codemod, which can help automate the migration process. This tool can be particularly useful for updating TypeScript specifiers to comply with new standards or changes in Node.js.
- **Potential for Dependencies**: The group discussed the potential for codemods to be used not just for code but also for dependencies. This could help ensure that dependencies are updated to be compatible with new Node.js features and breaking changes.
- **Dependabot Integration**: We suggested improved Dependabot integration to facilitate migrations. Dependabot can automatically create pull requests to update dependencies, making it easier to keep projects up-to-date.
- **Registry for Migrated Projects**: The idea of maintaining a registry for projects that have already been migrated was proposed. This would help avoid redundant work and save compute resources by preventing the same migrations from being performed multiple times.
- **Good First Issues**: We suggested creating a tracking issue in the Node.js repository for codemods that need to be developed. Tagging these issues as "good first issues" could encourage new contributors to get involved and help with the migration efforts.

### Potential Action Items

- **Develop and Promote Codemods**: Continue developing and promoting codemods to automate the migration process. Encourage the community to contribute to these tools and create new codemods as needed.
- **Integrate with Dependabot**: Improve Dependabot integration to facilitate dependency updates and migrations. This could include creating custom Dependabot configurations or scripts to handle specific migration tasks.
- **Create a Registry for Migrated Projects**: Maintain a registry of projects that have already been migrated to avoid redundant work and save compute resources. This could be done through a centralized repository or a tracking issue in the Node.js repository.

## Node.js Diagnostics WG Meeting

The Node.js Diagnostics Working Group (WG) meeting focused on several key areas related to diagnostics and observability in Node.js, including async context, diagnostics channels, and the future of the `import-in-the-middle` project. Stephen Belanger ([@Qard](https://github.com/Qard)) presented.

### Async Context

- **Current State**: Stephen presented some slides about async context, highlighting that it currently doesn't work very well with concurrency.
- **Cache Behavior**: We discussed the cache behavior related to async context, noting that there hasn't been a conclusive solution yet.
- **Documentation**: We pointed out that diagnostics documentation doesn't exist in the "Learn" section, and Augustin suggested that it might need an update from the guide section.

### Future of `import-in-the-middle`

- **Critical Package**: We discussed the critical role of `import-in-the-middle` for APM vendors, as it provides the ability to manipulate ESM modules and shim exports.
- **Edge Cases**: We noted that there are too many edge cases that the package cannot support, particularly when modules modify their exports. Currently, APM vendors modify code in hooks, which has performance implications but is the best available solution.
- **Diagnostics Channels**: We emphasized the need to plan and document packages that are broken and to provide a path for APM vendors. Suggested using diagnostics channels if possible.
- **Monkey Patching**: We mentioned that diagnostics channels are useful, but there is still a need for some monkey patching abilities.

### Diagnostics Channels and Observability

- **Abort Control**: We discussed the possibility of using diagnostics channels for abort control, which is not possible with tracing channels.
- **Monkey Patching**: The group discussed the ability to patch sources for transpilers but noted that relying on it for functionalities is brittle and depends on the discretion of hook authors.
- **Live Debugging**: We talked about efforts to get live debugging, currently using the inspector protocol, and collaborating with V8 to improve this area.
- **Transactional Memory**: We suggested exploring transactional memory, and Thomas mentioned ideas like thread pause optimization and copy-on-write for data processing.

## Tooling Group Session

The tooling group session focused on various aspects of improving the tooling ecosystem around Node.js, including social media engagement, handling experimental status, and facilitating migrations to new features and breaking changes. Presenting were Ruy Adorno ([@ruyadorno](https://github.com/ruyadorno)), Stephen Belanger ([@Qard](https://github.com/Qard)), and Wes Todd ([@wesleytodd](https://github.com/wesleytodd)).

### Social Media Engagement

- **Bluesky Platform**: We presented the `pkgjs` initiative and discussed the potential migration from the current social media platform to Bluesky. The rationale behind this move was the better engagement and open-source nature of Bluesky. At the time of publish, Node.js is present on Bluesky under the handle [@nodejs.org](https://bsky.app/profile/nodejs.org).
- **Cross-Posting**: There was a suggestion to start with cross-posting to both platforms to ensure a smooth transition and maintain engagement with existing followers.
- **Automation**: It was mentioned that Bluesky supports automation, which could be beneficial for managing social media presence.
- **Foundation Involvement**: The discussion highlighted the need to involve the OpenJS Foundation in this decision and potentially take it to the Community Programs Committee (CPC) for further deliberation.
- **Password Sharing**: We suggested sharing the social media account passwords using a secure method like OnePassword to streamline the posting process and reduce delays due to timezone differences.

### Handling Experimental Status

- **Experimental Features**: The group discussed the handling of experimental features, especially when their adoption becomes significant. It was noted that even though some features are experimental, they are widely used by the community, such as `module.register`.
- **Timeline and Expectations**: We emphasized the importance of setting clear expectations and timelines for experimental features. This includes providing warnings before major changes and ensuring clear documentation about the status and upcoming changes.
- **Opt-In Mechanisms**: There was a discussion on making experimental features opt-in via API or flags, especially for library authors who might rely on these features.
- **Lint Rules and Codemods**: We suggested using lint rules to enforce best practices and codemods to facilitate migrations. It was cautioned that changing people's behavior is challenging and requires incentives rather than enforcement.

## Thanks

Thank you to all the attendees! Special appreciation goes to the Baseline team for hosting the summit and creating a welcoming space for the Node.js community.

A big thanks as well to Claudio W ([@ovflowd](https://github.com/ovflowd)), Matteo Collina ([@mcollina](https://github.com/mcollina)), Robin Bender Ginn ([@rginn](https://github.com/rginn)), and the [OpenJS Foundation](https://openjsf.org) for organizing and making this event possible.
