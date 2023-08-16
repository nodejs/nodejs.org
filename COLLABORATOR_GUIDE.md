# Node.js Collaborator Guide

- [Issues and Pull Requests](#issues-and-pull-requests)
- [Accepting Modifications](#accepting-modifications)
  - [Involving the Website Team](#involving-the-website-team)
- [Technologies used in the Website](#technologies-used-in-the-website)
- [Code editing](#code-editing)
  - [Adding new pages](#adding-new-pages)
    - [Create the page content](#create-the-page-content)
  - [Translating pages](#translating-pages)
- [Creating Components](#creating-components)
  - [Best practices when creating a Component](#best-practices-when-creating-a-component)
    - [How a new Component should look like when freshly created](#how-a-new-component-should-look-like-when-freshly-created)
  - [Best practices for Component development in general](#best-practices-for-component-development-in-general)
- [Unit Tests and Storybooks](#unit-tests-and-storybooks)
  - [General Guidelines for Unit Tests](#general-guidelines-for-unit-tests)
  - [General Guidelines for Storybooks](#general-guidelines-for-storybooks)

This document contains information for Collaborators of the Node.js
website project regarding maintaining the code, documentation, and issues.

Collaborators should be familiar with the guidelines for new
contributors in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Issues and Pull Requests

Courtesy should always be shown to individuals submitting issues and
pull requests to the Node.js website project.

Collaborators should feel free to take full responsibility for
managing issues and pull requests they feel qualified to handle, as
long as this is done while being mindful of these guidelines, the
opinions of other Collaborators and guidance of the Website Group.

Collaborators may **close** any issue or pull request they believe is
not relevant to the future of the Node.js project. Where this is
unclear, the issue should be left open for several days for
additional discussion. Where this does not yield input from Node.js
Collaborators or additional evidence that the issue has relevance, then the issue may be closed.
Remember that issues can always be re-opened if necessary.

## Accepting Modifications

All Node.js code and documentation modifications should be
performed via GitHub pull requests. Only the `Website` group
can merge their work and should do so carefully.

All pull requests must be reviewed and accepted by a Collaborator with
sufficient expertise who can take full responsibility for the
change. In the case of pull requests proposed by an existing
Collaborator, an additional Collaborator is required for sign-off.

In some cases, it may be necessary to summon a qualified Collaborator
to a pull request for review by @-mention.

If you are unsure about the modification and are not prepared to take
full responsibility for the change, defer to another Collaborator.

Before landing pull requests, sufficient time should be left for input
from other Collaborators. Leave at least 48 hours during the week and
Seventy-two hours over weekends to account for international time differences
and work schedules. Trivial changes (e.g., those which fix minor bugs
or improve performance without causing wide-reaching impact)
may be landed after a shorter delay. Any press release can land with
no time constraints as long as the copy is properly formatted;
it is not the responsibility of the website group to review the copy itself.

Where there is no disagreement amongst Collaborators, a pull request
may be landed given appropriate review. Where there is discussion
amongst Collaborators, consensus should be sought. The
lack of consensus may indicate the need to elevate the discussion to the
Website Group for resolution (see below).

All bug fixes require a test case that demonstrates the defect. The
test should _fail_ before the change, and _pass_ after the change.

All pull requests that modify executable code should be subjected to
continuous integration tests on the
[project CI server](https://ci.nodejs.org/).

### Involving the Website Team

Collaborators may opt to elevate pull requests or issues to the group for
discussion by mentioning `@nodejs/website`. This should be done
where a pull request:

- has a significant impact on the codebase,
- is inherently controversial; or
- has failed to reach a consensus amongst the Collaborators who are
  actively participating in the discussion.

The Website group should be the final arbiter where needed.

## Technologies used in the Website

The Node.js Website is built upon [React][] and [Next.js][] respectively, the UI Rendering Engine and the Framework that builds the Website;

The Website also uses several other Open Source libraries (not limited to) listed below:

- Styling is done with [SCSS][] and CSS Modules
- [TailwindCSS](https://tailwindcss.com/) is used as our CSS Framework and the Foundation of our Design System
- [Hero Icons](https://heroicons.com/) is an SVG Icon Library used within our Codebase
- [Shiki](https://github.com/shikijs/shiki) is a Syntax Highlighter used for our Codeboxes
- [MDX][] and Markdown are used for structuring the Content of the Website
- [`react-intl`][] is the i18n Library adopted within the Website
- [`next-sitemap`](https://www.npmjs.com/package/next-sitemap) is used for Sitemap and `robots.txt` Generation
- We use [Rehype](https://github.com/rehypejs/rehype) and [Remark](https://github.com/remarkjs/remark) to extend MDX functionality

## Code Editing

### Structure of this Repository

- React Components are defined on `/components`
- React Templates are defined on `/layouts`
- Global Stylesheets are declared on `/styles`
  - Styles are done with [SCSS][]
- Public files are stored on `/public`
  - Static Images, JavaScript files, and others are stored within `/public/static`
- Internationalisation is done on `/i18n`
  - React Localisation Data is stored within `/i18n/locales`
  - We use the [ICU Message Syntax](https://formatjs.io/docs/core-concepts/icu-syntax/) for Translations
  - Configuration for Locales is done within `/i18n/config.json`
- Website Content is defined within `/pages`
  - Initial development usually happens in English: `/pages/en`
  - Localized versions of `/pages/en` are done within `/pages/{localeCode}`
  - All content is in Markdown and is per locale.
  - The top of each Markdown file is a YAML (Frontmatter) block for page-specific localization information passed to various templates.
  - The bulk of the Markdown content for each page is referenced as `{children}` on their respective JSX Layout (`layouts/`)
- Multi-Purpose React Hooks are defined on `/hooks`
- Multi-Purpose TypeScript definitions are defined on `/types`
- React Context Providers are defined on `/providers`
- Build-time Data Fetching Scripts are defined on `/next-data`
  - Used for Node.js Release data fetching
  - Generation of build-time indexes such as blog data
- Multi-Purpose Scripts are stored within `/scripts`
  - Such as Node.js Release Blog Post generation

### Adding new pages

1. Create new page content including the layout, title and copy.
2. Update the relevant `/layout` to add a link to the new page.

#### Create the page content

Create a new markdown file in `/pages/en`.

At the top of the markdown file, set a page the title and layout.

```markdown
---
title: Events
layout: contribute.hbs
---

[Event copy goes here]
```

### Translating pages

See the [Translation Guidelines](./TRANSLATION.md) for the website translation policy.

## Creating Components

The Node.js Website uses [React][] as a Frontend Library to develop the Website.
React allows us to create user interfaces with a modern take on Web Development.

If you're unfamiliar with React or Web Development in general,
we encourage a read before taking on complex issues and tasks as this repository is **not for educational purposes**
and we expect you to have a basic understanding of the technologies used.

We also recommend getting familiar with technologies such as [Next.js][], [MDX][], [SCSS][],
and "concepts" such as "CSS Modules" and "CSS-in-JS".

### Best practices when creating a Component

- All React Components should be placed within the `components` folder.
- Each Component should be placed, whenever possible, within a sub-folder, which we call the "Domain" of the Component
  - The domain represents where these Components belong to or where they will be used.
  - For example, Components used within Article Pages or that are part of the structure of an Article or the Article Layouts,
    should be placed within `components/Article`
- Each component should have its folder with the name of the Component
- The structure of each component folder follows the following template:
  ```text
  - ComponentName
    - index.tsx // the component itself
    - index.module.scss // all styles of the component are placed there
    - index.stories.tsx // component Storybook stories
    - __tests__ // component tests (such as unit tests, etc)
      - index.test.tsx
  ```
- React Hooks belonging to a single Component should be placed within the Component's folder
  - If the Hook as a wider usability or can be used by other components, it should be placed in the root `hooks` folder.
- If the Component has "sub-components" they should follow the same philosophy as the Component itself.
  - For example, if the Component `ComponentName` has a sub-component called `SubComponentName`,
    then it should be placed within `ComponentName/SubComponentName`

#### How a new Component should look like when freshly created

```tsx
import styles from './index.module.scss';
import type { FC } from 'react';

type MyComponentProps = {}; // The types of the Props of your Component

const MyComponent: FC<MyComponentProps> = ({ prop1, prop2... }) => (
  // Actual code of my Component
);

export default MyComponent;
```

### Best practices for Component development in general

- Only spread props `{ ... }` on the definition of the Component (Avoid having a variable named `props`)
- Avoid importing `React`, only import the modules from React that you need
- When importing types, use `import type { NameOfImport } from 'module'`
- When defining a Component, use the `FC` type from React to define the type of the Component
  - When using `children` as a prop, use the `FC<PropsWithChildren<MyComponentProps>>` type instead
  - Alterenatively you can define your type as `type MyComponentProps = PropsWithChildren<{ my other props}>`
- Each Props type should be prefixed by the name of the Component
- Components should always be the `default` export of a React Component file
- Avoid using DOM/Web APIs/`document`/`window` API access within a React Component.
  Use utilities or Hooks when you need a Reactive state
- Avoid making your Component too big. Deconstruct it into smaller Components/Hooks whenever possible

## Unit Tests and Storybooks

Each new feature or bug fix should be accompanied by a unit test (when deemed valuable).
We use [Jest][] as our test runner and [React Testing Library][] for our React unit tests.

We also use [Storybook][] to document our components.
Each component should have a storybook story that documents the component's usage.

Visual Regression Testing is automatically done via [Chromatic](https://www.chromatic.com/) to ensure that Components are rendered correctly.

### General Guidelines for Unit Tests

Unit Tests are fundamental to ensure that code changes do not disrupt the functionalities of the Node.js Website:

- Unit tests should be written as `.mjs` files.
- We recommend adding unit tests for content covering `util`, `scripts`, `hooks`, and `components` whenever possible.
- Unit Tests should ensure that a given change's functionality is working as expected.
- When creating unit tests for React components, we recommend that the tests cover all the possible states of the component.
- We also recommend mocking external dependencies, if unsure about how to mock a particular dependency, raise the question on your Pull Request.
  - We recommend using [Jest's Mock Functions](https://jestjs.io/docs/en/mock-functions) for mocking dependencies.
  - We recommend using [Jest's Mock Modules](https://jestjs.io/docs/en/manual-mocks) for mocking dependencies unavailable on the Node.js runtime.
  - Common Providers and Contexts from the lifecycle of our App, such as [`react-intl`][] should not be mocked but given an empty or fake context whenever possible.
- We recommend reading previous unit tests from the codebase for inspiration and code guidelines.

### General Guidelines for Storybooks

Storybooks are an essential part of our development process. They help us to document our components and to ensure that the components are working as expected.

They also allow Developers to preview Components and be able to test them manually/individually to the smallest unit of the Application. (The individual Component itself).

**Storybooks should be fully typed and follow the following template:**

```tsx
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import NameOfComponent from './index';

type Story = StoryObj<typeof NameOfComponent>;
type Meta = MetaObj<typeof NameOfComponent>;

// If the component has any props that are interactable, they should be passed here
// We recommend reading Storybook docs for args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

// If the Component has more than one State/Layout/Variant, there should be one Story for each variant
export const AnotherStory: Story = {
  args: {},
};

export default { component: NameOfComponent } as Meta;
```

- Stories should have `args` whenever possible, we want to be able to test the different aspects of a Component
- Please follow the template above to keep the Storybooks as consistent as possible
- We recommend reading previous Storybooks from the codebase for inspiration and code guidelines.
- If you need to decorate/wrap your Component/Story with a Container/Provider, please use [Storybook Decorators](https://storybook.js.org/docs/react/writing-stories/decorators)

[Jest]: https://jestjs.io/
[React Testing Library]: https://testing-library.com/docs/react-testing-library/intro/
[Storybook]: https://storybook.js.org/
[`react-intl`]: https://formatjs.io/docs/react-intl/
[Next.js]: https://nextjs.org/
[MDX]: https://mdxjs.com/
[SCSS]: https://sass-lang.com/
[React]: https://react.dev/
