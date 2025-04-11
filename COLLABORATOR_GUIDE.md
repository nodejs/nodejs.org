# Node.js Collaborator Guide

- [Issues and Pull Requests](#issues-and-pull-requests)
- [Accepting Modifications](#accepting-modifications)
  - [Involving the Website Team](#involving-the-website-team)
- [Technologies used in the Website](#technologies-used-in-the-website)
- [Code editing](#code-editing)
  - [Adding new pages](#adding-new-pages)
    - [Create the page content](#create-the-page-content)
  - [Translating pages](#translating-pages)
- [Creating Components](#creating-react-components)
  - [Styling a Component](#styling-a-component)
  - [Best practices when creating a Component](#best-practices-when-creating-a-component)
    - [How a new Component should look like when freshly created](#how-a-new-component-should-look-like-when-freshly-created)
  - [Best practices for Component development in general](#best-practices-for-component-development-in-general)
- [The new Downloads page](#the-new-downloads-page)
  - [Adding a Download Installation Method](#adding-a-download-installation-method)
  - [Adding a Download Package Manager](#adding-a-download-package-manager)
- [Unit Tests and Storybooks](#unit-tests-and-storybooks)
  - [General Guidelines for Unit Tests](#general-guidelines-for-unit-tests)
  - [General Guidelines for Storybooks](#general-guidelines-for-storybooks)
- [Remarks on Technologies used](#remarks-on-technologies-used)
- [Seeking additional clarification](#seeking-additional-clarification)

This document contains information for Collaborators of the Node.js website project regarding maintaining the code, documentation, and issues.

Collaborators should be familiar with the guidelines for new contributors in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Issues and Pull Requests

Courtesy should always be shown to individuals submitting issues and pull requests to the Node.js website project.

Collaborators should feel free to take full responsibility for managing issues and pull requests they feel qualified to handle, as long as this is done while being mindful of these guidelines, the opinions of other Collaborators and guidance of the Website Group.

Collaborators may **close** any issue or pull request they believe is not relevant to the future of the Node.js project.
Where this is unclear, the issue should be left open for several days for additional discussion.
Where this does not yield input from Node.js Collaborators or additional evidence that the issue has relevance, then the issue may be closed.
Remember that issues can always be re-opened if necessary.

> \[!IMPORTANT]\
> We recommend Collaborators to avoid Updating/Rebasing PRs unnecessarily, since we use [GitHub Merge Queues](https://github.blog/2023-07-12-github-merge-queue-is-generally-available/)
> to merge Pull Requests, which automatically rebases and runs CI-checks against the latest base branch.

## Accepting Modifications

All Node.js code and documentation modifications should be performed via GitHub pull requests.
Only the Website Team can merge their work and should do so carefully.

All pull requests must be reviewed and accepted by a Collaborator with sufficient expertise who can take full responsibility for the change.
In the case of pull requests proposed by an existing Collaborator, an additional Collaborator is required for sign-off.

Pull Requests can only be merged after all CI Checks have passed.
As usual, CI Checks need to be manually triggered by adding a `github_actions:pull-request` label to the Pull Request.

In some cases, it may be necessary to summon a qualified Collaborator to a pull request for review by @-mention.

If you are unsure about the modification and are not prepared to take full responsibility for the change, defer to another Collaborator.

We recommend collaborators follow the guidelines on the [Contributing Guide](./CONTRIBUTING.md#before-merging) for reviewing and merging Pull Requests.

### Involving the Website Team

Collaborators may opt to elevate pull requests or issues to the group for discussion by mentioning `@nodejs/nodejs-website`. This should be done where a pull request:

- has a significant impact on the codebase,
- is inherently controversial; or
- has failed to reach a consensus amongst the Collaborators who are actively participating in the discussion.

The Website group should be the final arbiter where needed.

## Technologies used in the Website

The Node.js Website is built upon [React][] and [Next.js][] respectively, the UI Rendering Engine and the Framework that builds the Website;

The Website also uses several other Open Source libraries (not limited to) listed below:

- Styling is done with [PostCSS][] and CSS Modules
- [Tailwind][] is used as our CSS Framework and the Foundation of our Design System
- [Hero Icons](https://heroicons.com/) is an SVG Icon Library used within our Codebase
- [Radix UI][] is a collection of customizable UI components
- [Shiki][] is a Syntax Highlighter used for our Codeboxes
  - The syntax highlighting is done within the processing of the Markdown files with the MDX compiler as a Rehype plugin.
- [MDX][] and Markdown are used for structuring the Content of the Website
- [`next-intl`][] is the i18n Library adopted within the Website
  - It provides an excellent integration with Next.js, But it also supports standalone support for i18n if it eventually migrates from Next.js to something else.
  - Supports React Server Components and Next.js Middlewares
- We use [Rehype](https://github.com/rehypejs/rehype) and [Remark](https://github.com/remarkjs/remark) to extend MDX functionality
- We use [Storybook](https://storybook.js.org/) for Manual Testing and Visual Regression Tests of our React Components
  - Storybook also provides a sandboxed environment, which is very useful whilst for crafting React Components

## Code Editing

### Structure of this Repository

⚠️ The repository is actively under migration to a multi-package workspace.
Locations are subject to change. (If you are someone updating these paths,
please document those changes here.)

- React Components are defined on `apps/site/components` and `packages/ui-components`
- React Templates are defined on `apps/site/layouts`
- Global Stylesheets are declared on `packages/ui-components/styles`
  - Styles are done with [PostCSS][] and [Tailwind][]
- Public files are stored on `apps/site/public`
  - Static Images, JavaScript files, and others are stored within `apps/site/public/static`
- Internationalisation is done on `apps/site/i18n`
  - React Localisation Data is stored within `apps/site/i18n/locales`
  - We use the [ICU Message Syntax](https://formatjs.io/docs/core-concepts/icu-syntax/) for Translations
  - Configuration for Locales is done within `apps/site/i18n/config.json`
- Website Content is defined within `apps/site/pages`
  - Initial development usually happens in English: `apps/site/pages/en`
  - Localized versions of `/pages/en` are done within `apps/site/pages/{localeCode}`
  - All content is in Markdown and is per locale.
  - The top of each Markdown file is a YAML (Frontmatter) block for page-specific localization information passed to various templates.
  - The bulk of the Markdown content for each page is referenced as `{children}` on their respective JSX Layout (`apps/site/layouts/`)
- Multi-Purpose React Hooks are defined on `apps/site/hooks`
- Multi-Purpose TypeScript definitions are defined on `apps/site/types`
- React Context Providers are defined on `apps/site/providers`
- Build-time Data Fetching Scripts are defined on `apps/site/next-data`
  - Used for Node.js Release data fetching
  - Generation of build-time indexes such as blog data
- Multi-Purpose Scripts are stored within `apps/site/scripts`
  - Such as Node.js Release Blog Post generation
- Storybook Configuration is done within `packages/ui-components/.storybook`
  - We use an almost out-of-the-box Storybook Experience with a few extra customisations

### Adding new Pages

1. Create new page content including the layout, title and copy.
2. Update the relevant `apps/site/layout` to add a link to the new page.

#### Create the page content

Create a new markdown file in `apps/site/pages/en`.

At the top of the markdown file, within the Markdown Frontmatter, set a page the title and layout.

```markdown
---
title: Title of the Page
layout: layout-name
---

[Content of the Page]
```

> \[!NOTE]\
> A list of currently available Layouts is provided within `components/withLayout` on the `layoutComponents` map.\
> This is a temporary map and this map might change its location and be defined in a different way in the future.

### Translating Pages

See the [Translation Guidelines](./TRANSLATION.md) for the website translation policy.

## Creating React Components

The Node.js Website uses [React][] as a Frontend Library to develop the Website.
React allows us to create user interfaces with a modern take on Web Development.

If you're unfamiliar with React or Web Development in general, we encourage a read before taking on complex issues and tasks as this repository is **not for educational purposes** and we expect you to have a basic understanding of the technologies used.

We also recommend getting familiar with technologies such as [Next.js][], [MDX][], [PostCSS][], and "concepts" such as "CSS Modules" and "CSS-in-JS".

### Styling a Component

As mentioned, we write all Component-styles in separate `.module.css` files. This is like writing any CSS in a separate file (besides the fact that we use [PostCSS][]).

This concept of writing styles on dedicated CSS files and importing them within JavaScript (or React) is a pattern named **[CSS Module](https://github.com/css-modules/css-modules)**.
These allow us to write PostCSS (or regular CSS, or any flavor of CSS if you have a way of interpreting it) within a `.module.css` and import the class names directly to our React Components.
We recommend reading guides on "Styling React Components with CSS Modules", which there are many available on the web.

It's important to mention that we use [Tailwind][] as a CSS Framework. Hence, margins, paddings, font sizes, font weights, colors, and other sorts of styles are all provided with Tailwind.
We recommend reading [Tailwind Docs](https://tailwindcss.com/docs/preflight) to get familiar with Tailwind's styles.
We also recommend reading [this guide for setting up Tailwind on your IDE](https://tailwindcss.com/docs/editor-setup).

Finally, if you're unfamiliar with how to use Tailwind or how to use Tailwind within CSS Modules, we recommend reading [this guide](https://tailwindcss.com/docs/using-with-preprocessors).

#### Example of a CSS Module

```css
.myComponent {
  @apply some
    tailwind
    classes;
}
```

#### Guidelines when writing CSS

- We use camelCase for defining CSS classes
- We use Tailwind's `@apply` selector to apply Tailwind Tokens
  - We discourage the usage of any plain CSS styles and tokens, when in doubt ask for help
  - We require that you define one Tailwind Token per line, just as shown on the example above, since this improves readability
- Only write CSS within CSS Modules, avoid writing CSS within JavaScript files

> \[!NOTE]\
> Tailwind is already configured for this repository. You don't need to import any Tailwind module within your CSS module.\
> You can apply Tailwind Tokens with Tailwind's `@apply` CSS rule. [Read more about applying Tailwind classes with `@apply`](https://tailwindcss.com/docs/functions-and-directives#apply).

> \[!IMPORTANT]\
> When using IDEs such as Visual Studio Code, we recommend installing the official [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
> and [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) Extensions.\
> These are recommended Extensions for IntelliSense, Syntax Highlighting and Error Checking when styling your Component.

### Best practices when creating a Component

- **All React components** should be placed within either `@node-core/ui-components` (for reusable components) or `apps/site/components` (for website-specific components).
- **Generic UI components** that are not tied to the website should be placed in the `@node-core/ui-components` package.
  - These components should be **framework-agnostic** and must not rely on Next.js-specific features such as `usePathname()` or `useTranslations()`.
  - If a component previously relied on Next.js, it should now accept these values as **props** instead.
- **Website-specific components** that rely on Next.js or are tied to the website should remain in `apps/site/components`.
  - These components can use Next.js-specific hooks, API calls, or configurations.
  - When using a generic UI component that requires Next.js functionality, pass it as a **prop** instead of modifying the component.
- **Each component** should be placed within a sub-folder, which we call the **"Domain"** of the component.
  - The domain represents where the component belongs or where it will be used.
  - For example, components used within article pages or related to the structure of an article should be placed within `@node-core/ui-components/Common/Article`.
- **Each component should have its own folder** with the name of the component.
- The structure of each component folder follows this template:

  ```text
  - ComponentName
    - index.tsx             // The component itself
    - index.module.css      // Component-specific styles
    - index.stories.tsx     // Storybook stories (only for @node-core/ui-components)
    - __tests__/            // Component tests (such as unit tests, etc.)
      - index.test.mjs      // Unit tests should be done in ESM, not TypeScript
  ```

- **If a component requires Next.js features, it should be wrapped within `apps/site`** rather than being modified directly in `@node-core/ui-components`.

  - Example: A component that requires `usePathname()` should **not** call it directly inside `@node-core/ui-components`. Instead:
    - The **base component** should accept `pathname` as a prop.
    - The **wrapper component** in `apps/site` should call `usePathname()` and pass it to the base component.

  Example structure:

  - **Base Component (`@node-core/ui-components`)**

    ```tsx
    const BaseComponent: FC<...> = ({ pathname, ariaLabel }) => {
      return <... ariaLabel={ariaLabel}></...>;
    };
    ```

  - **Wrapper Component (`apps/site/components`)**

    ```tsx
    const Component: FC<...> = (...) => {
      const pathname = usePathname();
      const t = useTranslations();

      return <BaseComponent pathname={pathname} ariaLabel={t('my.key')} />;
    };
    ```

  - **Importing Components:**
    - **For website-specific functionality**, import the wrapper from `apps/site/components`.
    - **For direct UI use cases**, import from `@node-core/ui-components`.

- **Storybook is now a dependency of `@node-core/ui-components`** and should not be included in `apps/site`.

  - Storybook stories should be written only for components in `@node-core/ui-components`.

- **React Hooks that belong to a single component should be placed within that component’s folder.**

  - If the hook has a **wider usability** or can be used by multiple components, it should be placed in the `apps/site/hooks` folder.
  - These hooks should only exist in `apps/site`.

- **If a component has sub-components, they should follow the same structure as the main component.**
  - Example: If `ComponentName` has a sub-component called `SubComponentName`, it should be placed within:
    ```text
    - ComponentName/
      - index.tsx
      - SubComponentName/
        - index.tsx
    ```

#### How a new Component should look like when freshly created

```tsx
import type { FC } from 'react';

import styles from './index.module.css';

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
  - Alternatively you can define your type as `type MyComponentProps = PropsWithChildren<{ my other props }>`
- Each Props type should be prefixed by the name of the Component
- Components should always be the `default` export of a React Component file
- Avoid using DOM/Web APIs/`document`/`window` API access within a React Component.
  Use utilities or Hooks when you need a Reactive state
- Avoid making your Component too big. Deconstruct it into smaller Components/Hooks whenever possible

## The new Downloads page

### Adding a Download Installation Method

To add a new download installation method, follow these steps:

1. **Update `INSTALL_METHODS` in `apps/site/util/downloadUtils.tsx`:**

   - Add a new entry to the `INSTALL_METHODS` array.
   - Each entry should have the following properties:
     - `iconImage`: The React component of the icon image for the installation method. This should be an SVG component stored within `@node-core/ui-components/Icons/InstallationMethod` and must follow the other icon component references (being a `FC` supporting `SVGSVGElement` props).
       - Don't forget to add it on the `index.tsx` file from the `InstallationMethod` folder.
     - `recommended`: A boolean indicating if this method is recommended. This property is available only for official installation methods.
     - `url`: The URL for the installation method.
     - `value`: The key of the installation method, which must be unique.

   Example:

   ```javascript
   // filepath: /nodejs.org/apps/site/util/downloadUtils.tsx
   // See full reference of INSTALL_METHODS within `downloadUtils.tsx`
   export const INSTALL_METHODS = [
     // ...existing methods...
     {
       iconImage: <InstallMethodIcons.YourIconImage width={16} height={16} />,
       url: 'https://example.com/install',
       value: 'exampleMethod',
     },
   ];
   ```

2. **Add translation key in `packages/i18n/locales/en.json`:**

   - Add an entry under `layouts.download.codeBox.platformInfo` for the `info` property of the new installation method.

   Example:

   ```json
   // filepath: /nodejs.org/packages/i18n/locales/en.json
   {
     "layouts": {
       "download": {
         "codeBox": {
           "platformInfo": {
             "exampleMethod": "Example installation method description."
           }
         }
       }
     }
   }
   ```

3. **Update `InstallationMethodLabel` and `InstallationMethod` in `@/types/release.ts`:**

   - Add the new method to the `InstallationMethodLabel` and `InstallationMethod` types.

   Example:

   ```typescript
   // filepath: /nodejs.org/apps/site/types/release.ts
   export type InstallationMethod = 'exampleMethod' | 'anotherMethod' | ...;

   export const InstallationMethodLabel: Record<InstallationMethod, string> = {
     exampleMethod: 'Example Method',
     anotherMethod: 'Another Method',
     // ...existing methods...
   };
   ```

4. **Add a snippet in `apps/site/snippets/en/download`:**

   - Create a new file with the same key as the `value` property (e.g., `exampleMethod.bash`).
   - Add the installation instructions in this file.
   - The snippet file can use JavaScript template syntax and has access to a `props` variable of type `ReleaseContextType`.

   Example:

   ```bash
   // filepath: /nodejs.org/apps/site/snippets/en/download/exampleMethod.bash
   echo "Installing Node.js version ${props.version} using Example Method"
   ```

5. **Configure `compatibility` within the `INSTALL_METHODS` object in `downloadUtils.ts`:**

- Use the `compatibility` property to enable/list the installation method for specific OSs, Node.js version ranges, or architectures/platforms.

Example:

```javascript
// filepath: /nodejs.org/apps/site/util/downloadUtils.tsx
// See full reference of compatibility property within `downloadUtils.tsx`
export const INSTALL_METHODS = [
  {
    iconImage: 'path/to/icon.svg',
    url: 'https://example.com/install',
    value: 'exampleMethod',
    compatibility: {
      os: ['LINUX', 'MAC'],
      semver: ['>=14.0.0'],
      platform: ['x64', 'arm64'],
    },
  },
];
```

By following these steps, you can successfully add a new download installation method to the Node.js website.

### Adding a Download Package Manager

You can add a PACKAGE_MANAGER the same way as adding an INSTALLATION_METHOD (from the section above, "Adding a Download Installation Method") but it should be added to the PACKAGE_MANAGERS object in `apps/site/util/downloadUtils.tsx`.

## Unit Tests and Storybooks

Each new feature or bug fix should be accompanied by a unit test (when deemed valuable).
We use [Jest][] as our test runner and [React Testing Library][] for our React unit tests.

We also use [Storybook][] to document our components.
Components within `packages/ui-components` should have a storybook story that documents the component's usage.

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
  - Common Providers and Contexts from the lifecycle of our App, such as [`next-intl`][] should not be mocked but given an empty or fake context whenever possible.
- We recommend reading previous unit tests from the codebase for inspiration and code guidelines.

### General Guidelines for Storybooks

Storybooks are an essential part of our development process. They help us to document our components and to ensure that the components are working as expected.

They also allow Developers to preview Components and be able to test them manually/individually to the smallest unit of the Application. (The individual Component itself).

**Storybooks should be fully typed and follow the following template:**

```tsx
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import NameOfComponent from '@node-core/ui-components/PathTo/YourComponent';

type Story = StoryObj<typeof NameOfComponent>;
type Meta = MetaObj<typeof NameOfComponent>;

// If the component has any props that are interactive, they should be passed here
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

## Remarks on Technologies Used

The Node.js Website is a somewhat complex application and at times non-trivial solutions have been implemented to solve certain technical challenges.
Historical decision making can be largely found on past issues, conversations on Slack and GitHub discussions. However, we also wish to highlight some of the notable development decisions that we have made here.

### Why Next.js?

We've found that Next.js is simply versatile, hackable, stable, community-maintained and has a great ecosystem.
The reasoning goes deeper, but as a long-term Framework it is the most suitable choice.

#### Why do we continue to support static builds?

It was decided together with the TSC (Technical Steering Committee) that the Node.js Website should always support fully static builds that do not depend on any 3rd party services.
This is to ensure that the Website is always available and that we do not depend on any 3rd party services to serve our content.

(For example, if we abandon Vercel, our Website should still completely work as standalone as possible)

#### What is `next.dynamic.mjs`?

Our whole Website uses a custom renderer for rendering the pages.
As you might have seen, within the `apps/site/pages` directory we have [Next.js Dynamic Route](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes) named `[...path].tsx` that matches against all possible routes of the Website.

This means that each `.md(x)` file within `apps/site/pages/` is not rendered by Next.js regular App Tree (`apps/site/pages/_document.tsx` and `apps/site/pages/_app.tsx`) but a custom render tree.

This custom render uses `getStaticPaths` and [Incremental Static Generation](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) to generate the full list of supported pages of the Website.
For example, this allows us to generate Localized Pages for every page that is not translated, by telling Next.js to create a localised path.
`next.dynamic.mjs` is responsible for getting a full list of the source pages (`apps/site/pages/en`) and identifying which pages have been translated.

Non-translated pages will have their Localized contexts and translated React message-bags (`next-intl`) but the content will be the same as the source page (English).
Whereas localized pages will have localized context and content.

This custom solution is also able to decide what paths should be compiled during runtime.
This is a combination of rules defined on `next.constants.mjs` and `[...path].tsx`.

The `[...path].tsx` file ultimately utilizes the `theme.tsx` file as its layout source.
This setup enables the loading of the Layout Provider and MDX Provider, which in turn, encapsulate and manage the rendering of any child content or components. This includes both content and components provided by the Layout Provider and the transformed MDX content originating from the `.md(x)` source page.

#### What is `next.data.mjs`?

This file is responsible for loading, fetching and generating build-time required information such as Node.js Release data, Blog Posts Metadata (for pagination and indexation), RSS feeds, etc.

#### What is `site.json`?

This file is used for defining Website Metadata, such as which RSS feeds should be generated, Social Media Information and other Metadata used during the Website build-time.
We use a JSON format to ease collaboration.

#### What is `next.locales.mjs` and why not use Next.js built-in i18n?

While Next.js provides a built-in i18n feature, it doesn't offer the flexibility we require. Our specific needs include the ability to generate comprehensive lists of supported locales and pages for each locale. Additionally, we operate with a subfolder-based approach for content, as opposed to the extension-based approach (e.g., `filename.language.md(x)`) that is compatible with Next.js's built-in i18n.

We opted for the subfolder approach to maintain consistency with our previous Node.js website's content structure and to ensure long-term maintainability, rather than relying on Next.js's i18n functionality.

#### What is `next.rewrites.mjs`?

This file is responsible for defining the rewrite rules for the Website.
It is used for defining redirects and other rewrite rules. (Such as Internal Redirects and External ones).

The `redirects.json` file specifies two types of operations: rewrites and redirects.

- Rewrites: These operations do not alter the original URL but instead render the content from the rewritten URL. It's important to note that the rewritten URL path must be valid and exist on the website.
- Redirects: Redirect operations, on the other hand, change the original URL to a new one. While these new URLs can be either internal (within the website) or external (leading to a different domain), it is more common for redirects to point externally.

This file contains a simple template engine that supports `/:locale` to indicate that this path should also be available under all available locales as prefix.

#### Why do we use Next.js Middlewares?

We have a simple Next.js Middleware that is responsible for handling initial Locale detection and redirection.
It detects browser locales and redirects to the most suitable locale for the user. And it fallbacks to `/en` if no suitable locale is found.

#### What are Layouts?

Layouts Wrap the content of the Markdown files.
They are responsible for adding additional styling and structure surrounding the content of the Markdown files.

Layouts are defined within the `layouts` folder.
They are React Components that receive the `children` prop, which is the transformed MDX content of the Markdown file.

Each Page layout is configured within their Markdown's Frontmatter as `layout: name-of-layout`.

### How we style the Website?

We use [PostCSS][] to style the Node.js Website; PostCSS is a CSS Preprocessor, like Sass and Less.

#### How exactly do we style Components?

We style each individual React Component with a dedicated CSS file (A CSS Module) that uses CSS syntax (with the extra powerups of PostCSS).

The [Styling a Component](#styling-a-component) section contains a more detailed guide on how we style our Components.

#### Why we use PostCSS over Sass or Less?

The main advantage of PostCSS is its minimal pluggable API that allows us to extend the native CSS-syntax with custom plugins.

Next.js natively supports PostCSS and always uses PostCSS as part of the bundling and building process.
By not using Sass or Less we remove another dependency from our build process and remove one layer of preprocessing our styles (CSS).

We currently use a set of PostCSS plugins that create a SCSS-a-like environment.

#### What PostCSS Plugins we use?

- `postcss-calc`: Strips `calc` expressions and replaces them with the result
- `@tailwindcss/postcss`: Allows us to use Tailwind within PostCSS

It is important to mention that even though we use SCSS-like syntax, we do not use SCSS, and some of these plugins
are not 100% compatible with the SCSS syntax.

#### Do we use a CSS Framework?

The Node.js Website uses Tailwind as a CSS Framework for crafting our React Components and style the Website.

[Tailwind][] is an utility-first CSS Framework. It allows us to create a Design System that is easy to maintain and extend. It also allows us to create a consistent Design Language across the Website.

#### Font Families on the Website

We use `next/fonts` Open Sans as the default font for the Node.js Website.
The font is configured as a CSS variable and then configured on `packages/ui-components/tailwind.config.ts` as the default font for the Website.

#### Why we use RadixUI?

- It is a minimalistic component library broken down in individual packages for each Component
- It already handles all WAI-ARIA and Accessibility shortcuts/bindings needed for Interactive Elements
- It allows us to focus on designing interactive Components without the effort of adding all the surrounding sugar and code needed to make the Component accessibility-friendly.

### Why MDX?

MDX is an extension on Markdown that allows us to add JSX Components within Markdown.
Besides that, MDX is also a pluggable parser built on top of `unified` which supports Rehype and Remark Plugins.
MDX is becoming the standard for parsing human-content on React/Next.js-based Applications.

**Some of the plugins that we use include:**

- `remark-gfm`: Allows us to bring GitHub Flavoured Markdown within MDX
- `remark-headings`: Generates Metadata for Markdown Headings
  - This allows us to build the Table of Contents for each Page, for example.
- `rehype-autolink-headings`: Allows us to add Anchor Links to Markdown Headings
- `rehype-slug`: Allows us to add IDs to Markdown Headings

#### Syntax Highlighting (Shiki) and Vercel

Shiki is integrated on our workflow as a Rehype Plugin, see the `next.mdx.shiki.mjs` file. We also use the `nord` theme for Shiki and a subset of the supported languages as defined on the `shiki.config.mjs` file.

### Vercel

We use Vercel as our hosting provider. It is a great platform that offers an excellent CI/CD pipeline which allows us to deploy our website with ease.

It is important to mention that there are some rules on our Vercel Deployments such as:

- Branches starting with `dependabot` (Dependabot Automated PRs) or `gh` (GitHub Merge Queues) are not deployed to Vercel.
- Vercel Deployments are triggered for all other branches during `push` activities.
- We have a custom install script that executes `npm ci --omit=dev` (the same way we do on our CI Pipelines)
  - Hence if Builds fail unexpectedly, make sure that your dependency that is being used during build-time is on `dependencies` and not `devDependencies`. Checkout out [DEPENDENCY_PINNING.md](./DEPENDENCY_PINNING.md) for more information.
- Our sponsorship with Vercel is maintained by the OpenJS Foundation

### Why we have a `.vscode` folder

The repository defines an optimized configuration for code editing. This is optional and is not required to contribute to the project. However, the settings and extensions specified help create a uniform and more efficient developer experience. This configuration is found in the `.vscode` directory:

- `extensions.json` suggests VSCode extensions that make the editor more compatible with the code. For example, a Tailwind extension creates auto-complete intellisense for tailwind styles within our components. Eslint, prettier, and editorconfig extensions read their respective config files and automatically format or lint code as written. This helps save CI feedback loops when a contribution does not meet our standards.
- `settings.json` contains some common sense defaults that aide development and enforce consistency across the codebase. For example, we want files formatted on save and we want prettier to be used as the formatter. Without these settings, new contributors may have different authoring experiences when contributing, leading to inconsistent code and CI failures. We also disable VSCode's default CSS parser so PostCSS and Tailwind syntax are respected.

Defining a `.vscode` configuration like this also aides browser-only development using [GitHub's Codespaces feature](https://github.com/features/codespaces). The web-based GUI will read these same configuration files and setup the remote development environment the same way every time.

### Why we have an `.npmrc` file

The npm ecosystem resolution and installation of `peerDependencies` installation [changed in recent versions](https://nodejs.org/en/blog/npm/peer-dependencies#using-peer-dependencies). The project documents what version of `Node.js` and `npm` to use via the [`.nvmrc` file](https://github.com/nodejs/nodejs.org/blob/main/.nvmrc). Not all contributors have tooling to automatically read this file and adhere to the correct version, however. To ensure all contributors install dependencies the same way, a local `.npmrc` file directly configures peerDependency installation behavior.

## Seeking additional clarification

A lot of the current structure is due to retro-compatibility, keeping a simple and familiar file structure and keeping files that have historical reasons or needs.

If you're unfamiliar or curious about something, we recommend opening a Discussion on this GitHub Repository.

[Jest]: https://jestjs.io/
[React Testing Library]: https://testing-library.com/docs/react-testing-library/intro/
[Storybook]: https://storybook.js.org/
[`next-intl`]: https://next-intl-docs.vercel.app
[Next.js]: https://nextjs.org/
[MDX]: https://mdxjs.com/
[PostCSS]: https://postcss.org/
[React]: https://react.dev/
[Shiki]: https://github.com/shikijs/shiki
[Tailwind]: https://tailwindcss.com/
[Radix UI]: https://www.radix-ui.com/
