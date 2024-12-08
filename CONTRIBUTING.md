# Node.js Website Contributing Guide

Thank you for your interest in contributing to the Node.js Website. Before you proceed, briefly go through the following:

- [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md)
- [Contributing](#contributing)
  - [Becoming a collaborator](#becoming-a-collaborator)
- [Getting started](#getting-started)
  - [CLI Commands](#cli-commands)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Policy](#pull-request-policy)
- [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)
- [Adding a Learn Page](#adding-a-learn-page)

## Contributing

Any individual is welcome to contribute to the Node.js Website. The repository currently has two kinds of contribution personas:

- A **Contributor** is any individual who creates an issue/PR, comments on an issue/PR, or contributes in some other way.
- A **Collaborator** is a contributor with write access to the repository. See [here](#becoming-a-collaborator) on how to become a collaborator.

You can find more details and guides about Collaborating with this repository through our [Collaborator Guide](./COLLABORATOR_GUIDE.md).

### Becoming a Collaborator

A collaborator of the Node.js Website repository is a member of the Node.js Website Team.

The Website Team is responsible for the technical development of the Node.js Website; thus, it is expected
that team members have significant knowledge about modern Web Technologies and Web Standards.

Note that regular contributors do not need to become "Collaborators" as any contribution is appreciated (even without a status), and a Collaborator status
is a formality that comes with obligations.

If you're an active contributor seeking to become a member, we recommend you contact one of the existing Team Members for guidance.

<details>
  <summary><b>What's the process for becoming a Collaborator?</b></summary>

- You must be actively contributing to this repository.
- Contributions must include significant code reviews or code contributions.
- A nomination must be done by an existing Team Member of the Website Team with an Issue
  - The Issue must explain and describe why the nominated person is a good addition to the team
  - The Issue must contain links to relevant contributions through:
    - Code Reviews
    - Comments on Issues and PRs
    - Authoring of PRs or Issues
    - Comments or Authoring of Discussions
- The nomination must have at least three existing members of the Website Team agree with the nomination.
  - This can be done through commenting with "agreement" (showing support) or reacting to the Issue with a :+1: (Thumbs-up Emoji)
- The Issue must be open for at least 72 hours without an objection from an existing member of the Website Team
  - The nomination cannot pass until all open objections are resolved.
  - Objections from the TSC or Core Collaborators are also counted as valid objections.

</details>

## Getting started

The steps below will give you a general idea of how to prepare your local environment for the Node.js Website and general steps
for getting things done and landing your contribution.

1. Click the fork button in the top right to clone the [Node.js Website Repository](https://github.com/nodejs/nodejs.org/fork)

2. Clone your fork using SSH, GitHub CLI, or HTTPS.

   ```bash
   git clone git@github.com:<YOUR_GITHUB_USERNAME>/nodejs.org.git # SSH
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/nodejs.org.git # HTTPS
   gh repo clone <YOUR_GITHUB_USERNAME>/nodejs.org # GitHub CLI
   ```

3. Change into the nodejs.org directory.

   ```bash
   cd nodejs.org
   ```

4. Create a remote to keep your fork and local clone up-to-date.

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
   npm run dev # starts a development environment
   ```

7. Perform your changes. In case you're unfamiliar with the structure of this repository, we recommend a read on the [Collaborator Guide](./COLLABORATOR_GUIDE.md)

8. Perform a merge to sync your current branch with the upstream branch.

   ```bash
   git fetch upstream
   git merge upstream/main
   ```

9. Run `npm run format` to confirm that linting and formatting are passing.

   ```bash
   npm run format
   ```

10. Once you're happy with your changes, add and commit them to your branch, then push the branch to your fork.

    ```bash
    cd ~/nodejs.org
    git add .
    git commit -m "describe your changes"
    git push -u origin name-of-your-branch
    ```

> [!IMPORTANT]\
> Before committing and opening a Pull Request, please go first through our [Commit](#commit-guidelines) and [Pull Request](#pull-request-policy) guidelines outlined below.

11. Create a Pull Request.

> [!NOTE]\
> We ask for PR authors to avoid to rebase/update their PRs with the base branch (`main`) unnecessarily.
> We use [GitHub Merge Queues](https://github.blog/2023-07-12-github-merge-queue-is-generally-available/)
> which means that before merge the PRs get automatically updated and checked against the latest changes on the base branch.
>
> This also reduces the amount of times we need to run our CI checks, as every new push requires fresh new CI-checks.

### CLI Commands

This repository contains several scripts and commands for performing numerous tasks. The most relevant ones are described below.

<details>
  <summary>Commands for Running & Building the Website</summary>

- `npm run dev` runs Next.js's Local Development Server, listening by default on `http://localhost:3000/`.
- `npm run build` builds the Application on Production mode. The output is by default within `.next` folder.
  - This is used for the Node.js Vercel Deployments (Preview & Production)
- `npx turbo deploy` builds the Application on Export Production Mode. The output is by default within `build` folder.
  - This is used for the Node.js Legacy Website Server (DigitalOcean)
- `npx turbo start` starts a web server running serving the built content from `npm run build`

</details>

<details>
  <summary>Commands for Maintenance Tasks and Tests</summary>

- `npm run lint` runs the linter for all files.
  - `npm run lint:fix` attempts to fix any linting errors
- `npm run prettier` runs the prettier for all the js files.
  - `npm run prettier:fix` attempts to fix any style errors
- `npx turbo format` formats and fixes lints for the whole codebase
- `npm run scripts:release-post` in the `apps/site` directory generates a release post for the current release
  - **Usage:** `npm run scripts:release-post -- --version=vXX.X.X --force`
- `npx turbo storybook` starts Storybook's local server
- `npx turbo storybook:build` builds Storybook as a static web application for publishing
- `npm run test` runs all tests locally
  - `npx turbo test:unit` runs jest (unit-tests) locally

</details>

## Commit Guidelines

This project follows the [Conventional Commits][] specification.

Commits should be signed. You can read more about [Commit Signing][] here.

### Commit Message Guidelines

- Commit messages must include a "type" as described on Conventional Commits
- Commit messages **must** start with a capital letter
- Commit messages **must not** end with a period `.`

### Pre-commit Hooks

This project uses [Husky][] for Git pre-commit hooks.

- Some JSON files are generated during Build time with empty files as placeholders. Build time happens when you run `npx turbo serve` or `npx turbo build`.
- We don't want to commit those unnecessary changes. Since these files exist in the repository, `.gitignore` won't work for them. As a workaround, we have a pre-commit hook to discard those changes.

## Pull Request Policy

This policy governs how contributions should land within this repository. The lines below state the checks and policies to be followed before merging and in the act of merging.

### Before merging

We recommend a read on our [Collaborator Guide](COLLABORATOR_GUIDE.md#accepting-modifications) for in-depth details on how we accept contributions into this repository.
The list below describes some merging and approval rules adopted in this repository.

- Pull Requests must be open for at least 48 hours (Or 72 hours if the PR was authored on the weekend).
  - Pull requests might be immediately merged if they contain critical bug fixes, short errata (e.g., typos from previous PRs), or any critical change considered a "showstopper" for the website's operation.
    - This kind of PRs should only be done by existing collaborators with write-access and/or signed off by administrators/maintainers.
    - This rule cannot be used for updates on the `COLLABORATOR_GUIDE.md`, `CONTRIBUTING.md` guide, `CODEOWNERS`, GitHub Actions, or any security-impacting file or document that changes the governing policies of this repository.
  - Pull requests might be "fast-tracked", meaning they can be merged before the usual 48 hours' notice if a "fast-track" label is added.
    - The person that is fast-tracking the PR (adding the label) must also comment on the PR that they're requesting the PR to be fast-tracked
    - The comment must mention `@nodejs/nodejs-website` and must have at least one 👍 (or any other sort of approval reaction) if the person fast-tracking the PR is the author of the PR.
    - Fast-tracking is only allowed for small bug fixes, small feature changes, localization changes, or other non-critical/highly-impacting changes not covered by the previous rule that allows PRs to be merged immediately.
    - Fast-tracking cannot be used for updates on the `COLLABORATOR_GUIDE.md`, `CONTRIBUTING.md` guide, `CODEOWNERS`, GitHub Actions, or any security-impacting file or document that changes the governing policies of this repository.
- There must be no objections after forty-eight (48) hours (Or seventy-two (72) hours if the PR was authored on the weekend).
  - If there are disagreements consensus should be sought. Lack of consensus might require escalation to the Website Team Maintainers.
- At least one approval is required for any PR to be merged.
- Tests must be included in Pull Requests for new features or bug fixes. You are responsible for fixing any test(s) that fail.

Each contribution is accepted only if there is no objection to it by a collaborator. During the review, collaborators may request that a specific contributor who is an expert in a particular area give an "LGTM" before the PR can be merged.

If an objection is raised in a pull request by another collaborator, all collaborators involved should try to arrive at a consensus by addressing the concerns through discussion, compromise, or withdrawal of the proposed change(s).

### When merging

- All required Status-checks must have passed.
  - **Note:** If you're a collaborator, remember to run the CI checks by labeling the PR with the `github_actions:pull-request` label.
- Please make sure that all discussions are resolved.
- [`squash`][] pull requests made up of multiple commits

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

[`squash`]: https://help.github.com/en/articles/about-pull-request-merges#squash-and-merge-your-pull-request-commits
[Conventional Commits]: https://www.conventionalcommits.org/
[Commit Signing]: https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits
[Husky]: https://typicode.github.io/husky/

## Adding a Learn Page

Since the redesign of the website, we have a new section called 'Learn'. This is intended to provide a more explanatory set of resources than the API docs, which are designed purely to explain the available APIs.

The Learn section is separate from the API docs and is intended to provide a more narrative, tutorial style set of resources. This is a place where we can provide more context and guidance on how to use the APIs and how to build applications with them.

The Learn section is also divided into several sub-categories. Note that the sub-categories must be on the same topic.

### Structure of the Learn section

The file structure of the Learn section is as follows:

```
site/
├─ pages/
│  ├─ en/
│  │  ├─ learn/
│  │  │  ├─ sub-categories/
│  │  │  │  ├─ article.md
```

The frontmatter of the `article.md` file should look like this:

```yaml
title: A super cool title
layout: learn
authors: github_username, another_github_username
```

A little bit of explanation about the frontmatter:

- `title`: The title of the article. This will be displayed as the title of the page. We recommend that you use the same title as the navigation entry. How to enter navigation entries is explained later in this document.
- `layout`: This must be set to `learn` so that the new article has the same style as other Learn pages.
- `authors`: A list of the GitHub usernames of the authors of the article. This is used to display the authors' profile pictures on the page. The frontmatter must always have the `github_username` followed by `, `. The comma and space is important.

### Modify the navigation

The data of the navigation is stored in app/site/navigation.json. To add a new entry to the navigation, you need to add a new object to the sideNavigation.learn.

```json
{
  "sideNavigation": {
    "learn": [
      {
        "label": "Sub-category",
        "items": {
          "article": {
            "link": "/learn/sub-category/article",
            "label": "components.navigation.learn.sub-category.article"
          }
        }
      }
    ]
  }
}
```

The `label` key is used to display the title of the article in the navigation. To add a new i18n key we recommend you to read [the translation guide](./TRANSLATION.md#adding-new-translation-keys).

### Add the article

To add a new article, you need to create a new markdown file in the `site/pages/en/learn/your-sub-category` directory.

1. Create your new markdown file in the `site/pages/en/learn/your-sub-category` directory.
2. Add the frontmatter to the file.
3. Write your article.
4. Add the navigation entry to `app/site/navigation.json`.
5. Add the translation key to the translation files.

DONE!

### Edit the article

To edit an existing article, you need to find the markdown file in the `site/pages/en/learn/your-sub-category` directory.

> [!NOTE]
> If you rewrite a big part of the article you can add yourself as an author in the frontmatter. **But** if you only fix a typo or a small part of the article, you don't need to add yourself as an author.

### Accessible MDX components

#### Codebox

The codebox component is used to display code snippets. If two code snippets follow without any text between them, they will be displayed in the same codebox, but with two tabs.

```md
'''cjs
const http = require('node:http');
'''

'''mjs
import http from 'node:http';
'''
```

`cjs` and `mjs` are variants of `js`, it's just to display the correct language in the codebox (cjs = CommonJS, mjs = ES Module).
