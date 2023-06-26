# Node.js Website Contributing Guide

Thank you for your interest in contributing to the Node.js Website. Before you proceed, briefly go through the following:

- [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md)
- [Contributing](#contributing)
- [Getting started](#getting-started)
  - [CLI Commands](#cli-commands)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Policy](#pull-request-policy)
- [Becoming a collaborator](#becoming-a-collaborator)
- [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)

# Contributing

Any individual is welcome to contribute to the Node.js Website. The repository currently has two kinds of contribution personas:

- A **Contributor** is any individual who creates an issue/PR, comments on an issue/PR
  or contributes in some other way.
- A **Collaborator** is a contributor with write access to the repository. See [here](#becoming-a-collaborator) on how to become a collaborator.

You can find more details and guides about Collaborating with this repository through our [Collaborator Guide](./COLLABORATOR_GUIDE.md).

## Becoming a Collaborator

A collaborator of the Node.js Website repository is a member of the Node.js Website Team.

The Website Team is responsible for the technical development of the Node.js Website, thus it is expected
that team members have significant knowledge about modern Web Technologies and Web Standards.

Note that regular contributors do not need to become "Collaborators". Any contribution is appreciated and a Collaborator status
is a formality that comes with obligations.

If you're an active contributor seeking to become a member we recommend reaching out to one of the existing Team Members for guidance.
 
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
  - The nomination must have at least 3 existing members of the Website Team to be in agreement with the nomination.
    - This can be done through commenting with "agreement" (showing support) or reacting to the Issue with a :+1: (Thumbs-up Emoji)
  - The Issue must be open for at least 72 hours without an objection from an existing member of the Website Team
    - The nomination cannot pass until all open discordances/objections are resolved.
    - Objections coming from the TSC or Core Collaborators are also counted as valid objections.
</details>

# Getting started

The steps below will give you a general idea of how to prepare your local environment for the Node.js Website and general steps
for getting things done and landing your contribution.

1. Click the fork button in the top right to clone the [nodejs.org repository](https://github.com/nodejs/nodejs.org/fork)
2. Clone your fork using SSH, GitHub CLI, or HTTPS.

    ```bash
    git clone git@github.com:<YOUR_GITHUB_USERNAME>/nodejs.org.git # SSH
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

9.  Once you're happy with your changes, add and commit them to your branch, then push the branch to your fork.

    ```bash
    cd ~/nodejs.org
    git add .
    git commit -m "some message"
    git push -u origin name-of-your-branch
    ```

10. Create a Pull Request.

> **Note**: Before committing and opening a Pull Request please go first through our [Commit](#commit-guidelines) and [Pull Request](#pull-request-policy) guidelines outlined below.

## CLI Commands

This repository contains several scripts and commands for performing numerous tasks. The most relevant ones are described below.

<details> 
  <summary>Commands for Running & Building the Website</summary>

  - `npx turbo serve` runs Next.js's Local Development Server, listening by default on `http://localhost:3000/`.
  - `npx turbo build` builds the Application on Production mode. The output is by default within `.next` folder.
    - This is used for the Node.js Vercel Deployments (Preview & Production)
  - `npx turbo deploy` builds the Application on Export Production Mode. The output is by default within `build` folder.
    - This is used for the Node.js Legacy Website Server (DigitalOcean)
  - `npx turbo start` starts a web server running serving the built content from `npx turbo build`
</details>

<details> 
  <summary>Commands for Maintenance Tasks and Tests</summary>
  
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
</details>

# Commit Guidelines

This project follows the [Conventional Commits][] specification.

Commits should be signed. You can read more about [Commit Signing][] here.

### Commit Message Guidelines

- Commit messages must include a "type" as described on Conventional Commits
- Commit messages **must** start with a capital letter
- Commit messages **must not** end with a period `.`

### Pre-commit Hooks

This project uses [husky][] for pre-commit hooks.

Some JSON files are generated during Build time with empty files as placeholders. Build time happens when you run `npx turbo serve` or `npx turbo build`. We don't want to commit those unnecessary changes. Since these files exist in the repository, `.gitignore` won't work for them. As the workaround, we have a pre-commit hook to discard those changes.

# Pull Request Policy

This policy governs how contributions should land within this repository. The lines below state the checks and policies to be followed before merging and on the act of merging.

## Before merging

We recommend a read on our [Collaborator Guide](COLLABORATOR_GUIDE.md#accepting-modifications) for in-depth details on how we accept contributions into this repository. The list below describes some of the merging and approval rules adopted in this repository.

- Pull Requests must be open for at least 48 hours (Or 72 hours if the PR was authored on the weekend).
  - Pull requests might be immediately merged if they contain critical bug fixes, short errata (e.g. typos from previous PRs) or any critical change that is considered a "showstopper" for the operation of the website.
    - This kind of PRs should only be done by existing collaborators that have write-access and/or signed off by administrators/maintainers.
    - This rule cannot be used for updates on the `COLLABORATOR_GUIDE.md`, `CONTRIBUTING.md` guide, `CODEOWNERS`, GitHub Actions or any security-impacting file or document that changes the governing policies of this repository.
  - Pull requests might be "fast-tracked", which means, they can be merged before the usual 48 hours' notice if a "fast-track" label is added.
    - The person that is fast-tracking the PR (adding the label) must also comment on the PR that they're requesting the PR to be fast-tracked
    - The comment must mention `@nodejs/website` and must have at least one 👍 (or any other sort of approval reaction) if the person fast-tracking the PR is the author of the PR.
    - Fast-tracking is only allowed for small bug fixes, small feature changes, localisation changes, or other sorts of non-critical/highly-impacting changes that are not covered by the previous rule that allows PRs to be merged immediately.
    - Fast-tracking cannot be used for updates on the `COLLABORATOR_GUIDE.md`,  CONTRIBUTING.md` guide, `CODEOWNERS`, GitHub Actions or any security-impacting file or document that changes the governing policies of this repository.
- There must be no objections after a 48-hour period (Or 72 hours if the PR was authored on the weekend).
- At least one approval is required for any PR to be merged.
- Tests must be included in Pull Requests for new features or bug fixes. If any test(s) are failing, you are responsible for fixing them.

Each contribution is accepted only if there is no objection to it by a collaborator. During the review, collaborators may request that a specific contributor who is an expert in a particular area give an "LGTM" before the PR can be merged.

In the case that an objection is raised in a pull request by another collaborator, all collaborators involved should try to arrive at a consensus by addressing the concerns through discussion, compromise, or withdrawal of the proposed change(s).

## When merging

- All required Status-checks must have passed.
- All discussions must be resolved.
- [`squash`][] pull requests made up of multiple commits

# Developer's Certificate of Origin 1.1

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
[husky]: https://typicode.github.io/husky/
