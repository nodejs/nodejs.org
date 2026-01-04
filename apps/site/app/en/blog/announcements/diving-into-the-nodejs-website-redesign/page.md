---
date: '2024-03-24T12:30:09.000Z'
category: announcements
title: Diving into the Node.js Website Redesign
layout: blog-post
author: Brian Muenzenmeyer
---

By now you've noticed nodejs.org's fresh new look!

We've taken great care in approaching this design with a nod to the past and look to the future. The site has many converging use cases, thousands of pages, and is a daily resource to many. The whole story had some dead ends and detours. But in the end it was a collective effort; coming to life with the contributions of over three dozen contributors and fantastic teamwork with select partners. The site improves the information architecture, brings content to users' fingertips like never before, and puts in place a stable development platform for years to come. We've also iterated on a revamped developer experience, clearer CI/CD feedback, and an approachable tech stack.

Read on for a deeper dive into the journey and insights into what's to come.

![A screenshot of the nodejs.org website from 2024.](/static/images/blog/announcements/2024-nodejs-screenshot.png)

## Scale and Constraints

The nodejs.org site has been around for over 14 years. A design resembling the utilitarian download and docs homepage first appeared in late 2011. This was Node.js _0.6_ days, for context.

![A screenshot of the nodejs.org website from late 2011.](/static/images/blog/announcements/2011-nodejs-screenshot.png)

Ever since, the site has slowly grown in scale, as the project has needed it to. It contains 1600+ pages. At its peak it had almost 20 localized languages. The domain serves _3 billion_ requests a month, with _2 petabytes_ of data transferred. It would be an understatement to say that the site is a critical resource for the Node.js community. It was absolutely paramount to ensure changes didn't cause unnecessary disruption, both to users and contributors.

## A False Start: nodejs.dev

The project's first attempt at a redesign began in 2019. The work started on a new domain and a new repo, [nodejs.dev](https://github.com/nodejs/nodejs.dev). In retrospect, this might have unintentionally doomed the project from the start. The team faced challenges of siloed development. Put simply, this codebase was not where the community or contributors were. Established contributor workflows were not present. Already busy people volunteering their time don't want to learn a second set of tools. It was too heavy a burden. The project was not able to sustain the kind of leadership it needed to maintain momentum. Additionally, a singular cutover for the new tech stack would have been complicated and pose a risk to the established presence of the site.

Out of nodejs.dev, however, came a lot of lessons and renewed content. A series of [comprehensive learning resources](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) was created that we carried forward into our current design. A vision from all this was forming: incremental evolution, in-place development, and as little disruption as possible.

## Reassembling the Airplane in Flight

In 2022, Claudio Wunder joined the project. He bridged the gap between both development efforts. He steered the web team toward a new direction: pivot back to the existing repository. Consider how the site could be rebuilt _while_ still functioning as a production-grade resource.

The codebase was starting to show its age across a number of dimensions. The design was stale. The Metalsmith and Handlebars templates had fallen out of favor for most web developers approaching the project. The internals of the site were hard to extend and poorly documented. Trying to blend code and content was a challenge.

The team carefully considered the tech stack. The first stage of the in-flight redesign dwelt on [nextra](https://nextra.site/), an excellent Next.js static site generator. This was a great way to get started, but as the site grew, we needed a custom setup. We found ourselves "breaking out" of nextra's conventions more and more, relying on the underlying Next.js patterns and power tools that nextra abstracts away.

[Next.js](https://nextjs.org/) was a natural progression, notable for its flexibility and power. For instance, the site is still statically built for end-user speed and foundational hosting independence but leverages Next.js's incremental static regeneration to pick up dynamic content like releases. React offered an authoring experience not only more aligned with the current skillsets of contributors, but also with a larger ecosystem of tools at our disposal.

We had a close partnership with [Vercel](https://vercel.com/) along this journey. They provided direct support when the scale of the site strained webpack's memory management during static export. This was a symbiotic relationship of sorts. Our needs pushed their platform to improve, and their platform enabled us to build a better site. We beta-tested new releases before public availability, a real-world stress test for the framework.

In April 2023, we performed a miniature cutover. This is a bit of an ironic statement. The [pull request](https://github.com/nodejs/nodejs.org/pull/4991) was 1600 files and pushed the GitHub UI to the limits of its rendering capabilities. The site's infrastructure would change, but the look and feel, content, and authoring experience would remain unchanged. This was a critical milestone—proof we could rebuild the airplane in flight.

## Redesign

The [OpenJS Foundation](https://openjsf.org/) was kind enough to help fund our redesign with designer [Hayden Bleasel](https://haydenbleasel.com/). Hayden brought a modern design to the site and helped us think through the multi-faceted use cases we encountered. The result was a [Figma](https://www.figma.com/) document that we could use to guide our development. Included were UX flows, dark/light modes, page layouts, mobile viewport considerations, and a component breakdown.

![A screenshot of the nodejs.org website redesign in Figma.](/static/images/blog/announcements/2024-nodejs-figma.png)

Realizing the design as code was next, and an effort distributed across the world. A lot of emphasis was placed on sequential build-up of foundational design elements and structured component hierarchies. We built variants of components from day one and considered internationalization at the outset. This reduced rework and made any task accessible to a newcomer. We started building components in isolation via [Storybook](https://storybook.js.org/) and [Chromatic](https://www.chromatic.com/)'s hosted instance. Storybook was a great place to prototype, iterate on, and test components. We choose to use [Tailwind CSS](https://tailwindcss.com/), but with an emphasis on design tokens and applied CSS. This common language helped newcomers orient to our approach and translate the Figma.

[Orama](https://docs.oramasearch.com/) search puts all the site's content at a user's fingertips. They index our static content and provide lightning-fast results of API content, learning material, blog posts, and more. The team there directly contributed this integration and continues to help us deliver a superb experience. It's already hard to imagine _not_ having this feature.

The reach that Node.js enjoys in our communities is important to us. As such, the old site was internationalized to almost 20 languages. An unfortunate combination of events led us to reset all translations, however. This was a hard decision, but the right one given the circumstances. We're working with [Crowdin](https://crowdin.com/) to re-establish our efforts. This will include a careful parsing of the new MDX-based content. We're looking forward to the continual internalization in the coming months.

As we built and started previewing the site both on the new infrastructure and redesigned, having deeper insight into end-user behavior was invaluable. We've leveraged [Sentry](https://sentry.io/welcome/) to provide error reporting, monitoring, and diagnostic tools. This has been a great help in identifying issues and providing a better experience for our users. Sentry was also useful prior to the redesign work to identify issues in the old site via replayed user sessions.

Throughout all of these integrations and development steps, we've focused on end-user accessibility and performance. Vercel and [Cloudflare](https://cloudflare.com) support ensures the site is fast and reliable. We've also invested in our CI/CD pipeline with GitHub Actions, providing contributors with real-time feedback. This includes visual regression testing with Chromatic, Lighthouse results, and a suite of linters and tests to ensure the site quality remains high.

![A screenshot of the nodejs.org lighthouse scores. Run on a Windows Chrome browser in desktop mode. Performance: 100, Accessibility: 91, Best Practices: 100, SEO: 100](/static/images/blog/announcements/2024-nodejs-redesign-lighthouse.jpg)

### Grace Hopper and Hacktoberfest

Throughout the site redesign, we've worked actively to make for an inclusive and welcoming experience. The redesign effort aligned well with both [Grace Hopper Celebration's Open Source Day](https://ghc.anitab.org/awards-programs/open-source-day/) in September of 2023, and then [Hacktoberfest](https://hacktoberfest.com/) the following month. Both events expose new contributors to projects across the ecosystem. We prepared for these events by staging "good first issues" as discrete development tasks. In the case of Grace Hopper, we also provided in-the-field mentorship so attendees could end the day with a landed PR. We're proud to say that we had a number of first-time contributors to the project as a result.

During Grace Hopper alone, 40 PRs opened from 28 authors. Hacktoberfest saw 26 more PRs.

![A screenshot of the nodejs.org activity during Grace Hopper.](/static/images/blog/announcements/2024-grace-hopper-activity.png)

### Documentation, documentation, documentation

An open source project is only as good as its documentation. Allowing new contributors to asynchronously establish context is essential. To that end, we don't limit DX (developer experience) to tooling. The redesign served as an excellent opportunity to identify and improve gaps in our docs. Along the way, we iterated on or introduced:

- [COLLABORATOR_GUIDE](https://github.com/nodejs/nodejs.org/blob/main/COLLABORATOR_GUIDE.md)
- [CONTENT_VS_CODE](https://github.com/nodejs/nodejs.org/blob/main/CONTENT_VS_CODE.md)
- [CONTRIBUTING](https://github.com/nodejs/nodejs.org/blob/main/CONTRIBUTING.md)
- [DEPENDENCY_PINNING](https://github.com/nodejs/nodejs.org/blob/main/DEPENDENCY_PINNING.md)
- [GOVERNANCE](https://github.com/nodejs/nodejs.org/blob/main/GOVERNANCE.md)
- [README](https://github.com/nodejs/nodejs.org/blob/main/README.md)
- [TRANSLATION](https://github.com/nodejs/nodejs.org/blob/main/TRANSLATION.md)

New code has a strong focus on inline code and configuration comments, separation of concerns, and clearly defined constants. The use of TypeScript throughout helps contributors understand the shape of data and the expected behavior of functions.

## Future Plans

The redesign sets the stage for a new era of the Node.js website. We have a solid foundation in place that will last for years to come. If the past is any indicator, we'll be iterating within this space for a long time.

But the work isn't done yet. We'll:

- extend the site redesign to the API docs. They are in a separate codebase but plan to port the styles developed here to the API. This is careful work again that cannot disrupt daily use or contribution.
- explore a monorepo for the website and API docs. This should improve coupling where it matters and reduce the overhead of managing two separate codebases.
- reset internationalization efforts. The prior translations could not be carried over. Our heavy markdown / MDX approach poses a unique challenge we are partnering with Crowdin to solve.
- continue to improve the CI/CD processes. We've made great strides in providing self-service feedback to contributors, but there's more to do.

## Thanks

Many people and organizations have contributed in both big and small ways to realize the redesign. We'd like to thank:

- first and foremost, all [contributors and collaborators](https://github.com/nodejs/nodejs.org/graphs/contributors) that make this project possible.
- [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.
- [Cloudflare](https://cloudflare.com) for providing the infrastructure that serves Node.js's Website, Node.js's CDN, and more.
- [Crowdin](https://crowdin.com/) for providing a platform that allows us to localize the Node.js Website and collaborate with translators.
- [Hayden Bleasel](https://haydenbleasel.com/) for his design work on the Node.js redesign.
- [Orama](https://docs.oramasearch.com/) for providing a search platform that indexes our content and provides lightning-fast results.
- [Sentry](https://sentry.io/welcome/) for providing an open source license for their error reporting, monitoring, and diagnostic tools.
- [Vercel](https://www.vercel.com/) for providing the infrastructure that serves and powers the Node.js Website
- and lastly, the [OpenJS Foundation](https://openjsf.org/) for their support and guidance.

The community is strong, and we're excited about what we can accomplish together.

> Here is your weekly reminder that the Node.js project is driven by volunteers. Therefore every feature that lands is because someone spent time (or money) to make it happen. This is called Open Governance.
> <cite>[Matteo Collina, via social media](https://x.com/matteocollina/status/1770496526424351205?s=46&t=22eoAstJVk5l46KQXYEk5Q)</cite>

Want to get involved? [Check out the project on GitHub](https://github.com/nodejs/nodejs.org).

---

Thanks to Amal Hussein and Claudio Wunder for helping gather info for this post.
