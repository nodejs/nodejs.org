# Node.js Website Contributing Guide

Thank you for your interest in contributing to the Node.js Website. Before you proceed, briefly go through the following:

- [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md)
- [Getting started](#getting-started)
  - [Vocabulary](#vocabulary)
  - [Creating Components](#creating-components)
  - [Commit message guidelines](#commit-guidelines)
  - [Unit Tests and Storybooks](#unit-tests-and-storybooks)
  - [Pull Request Policy](#pull-request-policy)
    - [Before merging](#before-merging)
    - [When merging](#when-merging)
  - [Becoming a collaborator](#becoming-a-collaborator)
  - [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)
  - [Remarks](#remarks)

## Getting started

1. Click the fork button in the top right to clone the [nodejs.org repository](https://github.com/nodejs/nodejs.org/fork)

2. Clone your fork using SSH, GitHub CLI, or HTTPS.

```bash
git clone git@github.com:<GITHUB_ID>/nodejs.org.git # SSH
git clone https://github.com/<GITHUB_ID>/nodejs.org.git # HTTPS
gh repo clone <GITHUB_ID>/nodejs.org # GitHub CLI
```

3. Change into the nodejs.org directory.

```bash
cd nodejs.org
```

4. Create a remote for keeping your fork as well as your local clone up-to-date.

```bash
git remote add upstream git@github.com:nodejs/nodejs.org.git # SSH
git remote add upstream https://github.com/nodejs/nodejs.org.git # HTTPS
gh repo sync nodejs/nodejs.org # GitHub CLI
```

5. Create a new branch for your work.

```bash
git checkout -b name-of-your-branch
```

6. Run the following to install the dependencies and start a local preview of your work.

```bash
npm ci # installs this project's dependencies
npx turbo serve # starts a preview of your local changes
```

7. Perform a merge to sync your current branch with the upstream branch.

```bash
git fetch upstream
git merge upstream/main
```

8. Run `npx turbo format` to confirm that linting, and formatting are passing.

```bash
npx turbo format
```

9.  Once you're happy with your changes, add and commit them to your branch,
    then push the branch to your fork.

        ```bash
        cd ~/nodejs.org
        git add .
        git commit -m "some message"
        git push -u origin name-of-your-branch
        ```

10. Create a Pull Request. See [PR Policy](#pull-request-policy)

> **Note**: Go through our [Commit](#commit-guidelines) and [Pull Request](#pull-request-policy) guidelines outlined below.

### CLI Options

#### Serve/Build Options

- `npx turbo serve` runs Next.js's Local Development Server, listening by default on `http://localhost:3000/`.
- `npx turbo build` builds the Application on Production mode. The output is by default within `.next` folder.
  - This is used for the Node.js Vercel Deployments (Preview & Production)
- `npx turbo deploy` builds the Application on Export Production Mode. The output is by default within `build` folder.
  - This is used for the Node.js Legacy Website Server (DigitalOcean)
- `npx turbo start` starts a web server running serving the built content from `npx turbo build`

#### Other CLI options

We also offer other commands that offer you assistance during your local development

- `npx turbo lint` runs the linter for all the js files.
  - `npx turbo lint:fix` attempts to fix any linting errors
- `npx turbo prettier` runs the prettier for all the js files.
  - `npx turbo prettier:fix` attempts to fix any style errors
- `npx turbo format` formats and fixes the whole codebase
- `npx turbo scripts:release-post` generates a release post for the current release
  - **Usage:** `npx turbo scripts:release-post -- --version=vXX.X.X --force`
- `npx turbo storybook` starts Storybook's local server
- `npx turbo storybook:build` builds Storybook as a static web application for publishing
- `npx turbo test` runs all tests locally
  - `npx turbo test:unit` runs jest (unit-tests) locally
  - `npx turbo test:storybook` runs storybook test-runner tests
    - `npx turbo test:storybook:snapshot` generates and updates snapshots for all storybook components.

## Vocabulary

- A **Contributor** is any individual who creates an issue/PR, comments on an issue/PR
  or contributes in some other way.
- A **Collaborator** is a contributor with write access to the repository. See [here](#becoming-a-collaborator) on how to become a collaborator.

## Creating Components

The Node.js Website uses **React.js** as a Frontend Library for the development of the Website. React allows us to create user interfaces with a modern take on Web Development.

If you're unfamiliar with React or Web Development in general, we encourage a read before taking on complex issues and tasks as this repository is **not for educational purposes** and we expect you to have a basic understanding of the technologies used.

We also recommend getting familiar with technologies such as [Next.js][], [MDX][], [SCSS][] and "concepts" such as "CSS Modules" and "CSS-in-JS".

### Best Practices when creating a Component

- All React Components should be placed within the `components` folder.
- Each Component should be placed whenever possible within a sub-folder, which we call the "Domain" of the Component
  - The domain is the representation of where these Components belong to or where will be used.
  - For example, Components used within Article Pages or that are part of the structure of an Article or the Article Layouts, should be placed within `components/Article`
- Each component should have its own folder with the name of the Component
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
  - If the Hook as a wider usability or can be used by other Components, then it should be placed at the root `hooks` folder.
- If the Component has "sub-components" they should follow the same philosophy as the Component itself.
  - For example, if the Component `ComponentName` has a sub-component called `SubComponentName`, then it should be placed within `ComponentName/SubComponentName`
- For i18n an component you have to follow [translation guidelines][]

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
- When importing types use `import type { NameOfImport } from 'module'`
- When defining a Component use the `FC` type from React to define the type of the Component
  - When using `children` as a prop, use the `FC<PropsWithChildren<MyComponentProps>>` type instead
  - Alterenatively you can define your type as `type MyComponentProps = PropsWithChildren<{ my other props}>`
- Each Props type should be prefixed by the name of the Component
- Components should always be the `default` export of a React Component file
- Avoid using DOM/Web APIs/`document`/`window` API access within a React Component. Use utilities or Hooks when you need a Reactive state
- Avoid making your Component too big. Deconstruct it into smaller Components/Hooks whenever possible

## Commit Guidelines

This project follows the [Conventional Commits][] specification.

Commits should be signed. You can read more about [Commit Signing][] here.

### Commit Message guidelines

- Commit messages must include a "type"
  > build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
- Commit messages **must** start with a capital letter
- Commit messages **must not** end with a period `.`

## Unit Tests and Storybooks

Each new feature or bug fix should be accompanied by a unit test (when deemed valuable). We use [Jest][] as our test runner and [React Testing Library][] for our React unit tests.

We also use [Storybook][] to document our components. Each component should have a storybook story that documents the component's usage. Snapshot testing of our components is directly done by taking snapshot of all Storybook stories, using [Storybook Test Runner][] and [Playwright][].

### General Guidelines for Unit Tests

Unit Tests are fundamental to ensure that code changes do not disrupt the functionalities of the Node.js Website:

- We recommend that unit tests are added for content covering `util`, `scripts`, `hooks` and `components` whenever possible.
- Unit Tests should cover that the functionality of a given change is working as expected.
- When creating unit tests for React components, we recommend that the tests cover all the possible states of the component.
- We also recommend mocking external dependencies, if unsure about how to mock a certain dependency, raise the question on your Pull Request.
  - We recommend using [Jest's Mock Functions](https://jestjs.io/docs/en/mock-functions) for mocking dependencies.
  - We recommend using [Jest's Mock Modules](https://jestjs.io/docs/en/manual-mocks) for mocking dependencies that are not available on the Node.js runtime.
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

## Pull Request Policy

### Before merging

We recommend a read on our [Collaborator Guide](COLLABORATOR_GUIDE.md#accepting-modifications) for in-depth details on how we accept contributions into this repository. The list below describes some of the merging and approval rules adopted in this repository.

- Pull Requests must be open for at least 48 hours (Or 72 hours if the PR was authored on the weekend).
  - Pull requests might be immediately merged if they contain critical bug fixes, short erratas (e.g. typos from previous PRs) or any critical change that is considered a "showstopper" for the operation of the website.
    - These kind of PRs should only be done by existing collaborators that have write-access and/or signed-off by administrators/maintainers.
    - This rule cannot be used for updates on the COLLABORATOR_GUIDE, CONTRIBUTING guide, CODEOWNERS, GitHub Actions or any security-impacting file or document that changes the governing policies of this repository.
  - Pull requests might be "fast-tracked", which means, they can be merged before the usual 48 hours notice if a "fast-track" label is added.
    - The person that is fast-tracking the PR (adding the label) must also comment on the PR that they're requesting the PR to be fast-tracked
    - The comment must mention `@nodejs/website` and must have at least one 👍 (or any other sort of approval reaction) if the person fast-tracking the PR is the author of the PR.
    - Fast-tracking is only allowed for small bug fixes, small feature changes, localisation changes, or other sort of non-critical/highly-impacting changes that are not covered by the previous rule that allows PRs to be merged immediately.
    - Fast-tracking cannot be used for updates on the COLLABORATOR_GUIDE, CONTRIBUTING guide, CODEOWNERS, GitHub Actions or any security-impacting file or document that changes the governing policies of this repository.
- There must be no objections after a 48 hour period (Or 72 hours if the PR was authored on the weekend).
- At least two approvals are required if the target branch is `main`
- Tests must be included in Pull Requests for new features or bug fixes. If any test(s) are failing, you are responsible for fixing them.

Each contribution is accepted only if there is no objection to it by a collaborator. During the review, collaborators may request that a specific contributor who is an expert in a particular area give an "LGTM" before the PR can be merged.

In the case that an objection is raised in a pull request by another collaborator, all collaborators involved should try to arrive at a consensus by addressing the concerns through discussion, compromise, or withdrawal of the proposed change(s).

### When merging

- [`squash`][] pull requests made up of multiple commits

## Becoming a collaborator

- Collaborators must be actively contributing to the project
- A Pull Request must be opened on the @nodejs/nodejs.org README file adding the new collaborator to the list (note the order of names)
- The Pull Request must be approved by at least two members of @nodejs/website or @nodejs/tsc
- The Pull Request must remain open for 72 hours without any objections

More details about Collaboration can be found in the [COLLABORATOR_GUIDE.md](./COLLABORATOR_GUIDE.md).

## Developer's Certificate of Origin 1.1

```

By contributing to this project, I certify that:

- (a) The contribution was created in whole or in part by me and I have the right to
  submit it under the open source license indicated in the file; or
- (b) The contribution is based upon previous work that, to the best of my knowledge,
  is covered under an appropriate open source license and I have the right under that
  license to submit that work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am permitted to submit under a
  different license), as indicated in the file; or
- (c) The contribution was provided directly to me by some other person who certified
  (a), (b) or (c) and I have not modified it.
- (d) I understand and agree that this project and the contribution are public and that
  a record of the contribution (including all personal information I submit with it,
  including my sign-off) is maintained indefinitely and may be redistributed consistent
  with this project or the open source license(s) involved.

```

## Remarks

If something is missing here, or you feel something is not well described, feel free to open an [issue](https://github.com/nodejs/nodejs.org/issues) to discuss it.

[`squash`]: https://help.github.com/en/articles/about-pull-request-merges#squash-and-merge-your-pull-request-commits
[Conventional Commits]: https://www.conventionalcommits.org/
[Commit Signing]: https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits
[Jest]: https://jestjs.io/
[React Testing Library]: https://testing-library.com/docs/react-testing-library/intro/
[Storybook]: https://storybook.js.org/
[Storybook Test Runner]: https://storybook.js.org/addons/@storybook/test-runner#dom-snapshot-recipe
[Playwright]: https://playwright.dev/
[`react-intl`]: https://formatjs.io/docs/react-intl/
[Next.js]: https://nextjs.org/
[MDX]: https://mdxjs.com/
[SCSS]: https://sass-lang.com/
[translation guidelines]: ./TRANSLATION.md#adding-new-translation-keys