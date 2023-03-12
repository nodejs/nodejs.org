# Node.js Website Contributing Guide

Thank you for your interest in contributing to the Node.js Website. Before you proceed, briefly go through the following:

- [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md)
- [Getting started](#getting-started)
  - [Vocabulary](#vocabulary)
  - [Commit message guidelines](#commit-guidelines)
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
gh repo clone <GITHUB_ID>/nodejs.org # GitHub CLI
git clone https://github.com/<GITHUB_ID>/nodejs.org.git # HTTPS
```

3. Change into the nodejs.org directory.

```bash
cd nodejs.org
```

4. Create a remote for keeping your fork as well as your local clone up-to-date.

```bash
git remote add upstream git@github.com:nodejs/nodejs.org.git
```

5. Create a new branch for your work.

```bash
git checkout -b name-of-your-branch
```

6. Run the following to install the dependencies and start a local preview of your work.

```bash
npm ci # installs this project's dependencies
npm run serve # starts a preview of your local changes
```

7. Perform a merge to sync your current branch with the upstream branch.

```bash
git fetch upstream
git merge upstream/main
```

8. Run `npm run format` to confirm that linting, and formatting are passing.

```bash
npm run format
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

- `npm run serve` runs Next.js's Local Development Server, listening by default on `http://localhost:3000/`.
- `npm run build` builds the Application on Production mode. The output is by default within `.next` folder.
- `npm run export` exports the website from the `.next` into a fully static website. The output is by default within `build` folder.
  - This is what it's used to deploy the website on our current Node.js servers.
- `npm run start` starts a web server running serving the built content from `npm run build`

#### Other CLI options

We also offer other commands that offer you assistance during your local development

- `npm run lint` runs the linter for all the js files.
  - `npm run lint:fix` attempts to fix any linting errors
- `npm run prettier` runs the prettier for all the js files.
  - `npm run prettier:fix` attempts to fix any style errors
- `npm run format` formats and fixes the whole codebase
- `npm run scripts:release-post` generates a release post for the current release
  - **Usage:** `npm run scripts:release-post -- --version=vXX.X.X --force`

## Commit Guidelines

This project follows the [Conventional Commits][] specification.

Commits should be signed. You can read more about [Commit Signing][] here.

### Commit Message guidelines

- Commit messages must include a "type"
  > build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
- Commit messages **must** start with a capital letter
- Commit messages **must not** end with a period `.`

## Pull Request Policy

### Before merging

- Pull Requests must be open for at least 48 hours.
  - Pull requests might be immediately merged if they contain critical bug fixes, short erratas (e.g. typos from previous PRs) or any critical change that is considered a "showstopper" for the operation of the website.
    - These kind of PRs should only be done by existing collaborators that have write-access and/or signed-off by administrators/maintainers.
- There must be no objections after a 48 hour period
- Tests must be included in Pull Requests for new features or bug fixes. If any test(s) are failing, you are responsible for fixing them.

Each contribution is accepted only if there is no objection to it by a collaborator. During the review, collaborators may request that a specific contributor who is an expert in a particular area give an "LGTM" before the PR can be merged.

In the case that an objection is raised in a pull request by another collaborator, all collaborators involved should try to arrive at a consensus by addressing the concerns through discussion, compromise, or withdrawal of the proposed change(s).

### When merging

- [`squash`][] pull requests made up of multiple commits

## Vocabulary

- A **Contributor** is any individual who creates an issue/PR, comments on an issue/PR
  or contributes in some other way.
- A **Collaborator** is a contributor with write access to the repository. See [here](#becoming-a-collaborator) on how to become a collaborator.

## Becoming a collaborator

- Collaborators must be actively contributing to the project
- A Pull Request must be opened on the @nodejs/nodejs.org README file adding the new collaborator to the list (note the order of names)
- The Pull Request must be approved by at least two members of @nodejs/website or @nodejs/tsc
- The Pull Request must remain open for 72 hours without any objections

More details about Collaboration can be found in the [COLLABORATOR_GUIDE.md](./COLLABORATOR_GUIDE.md).

## Developer's Certificate of Origin 1.1

```
By contributing to this project, I certify that:

* (a) The contribution was created in whole or in part by me and I have the right to
  submit it under the open source license indicated in the file; or
* (b) The contribution is based upon previous work that, to the best of my knowledge,
  is covered under an appropriate open source license and I have the right under that
  license to submit that work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am permitted to submit under a
  different license), as indicated in the file; or
* (c) The contribution was provided directly to me by some other person who certified
  (a), (b) or (c) and I have not modified it.
* (d) I understand and agree that this project and the contribution are public and that
  a record of the contribution (including all personal information I submit with it,
  including my sign-off) is maintained indefinitely and may be redistributed consistent
  with this project or the open source license(s) involved.
```

## Remarks

If something is missing here, or you feel something is not well described, feel free to open an [issue](https://github.com/nodejs/nodejs.org/issues) to discuss it.

[`squash`]: https://help.github.com/en/articles/about-pull-request-merges#squash-and-merge-your-pull-request-commits
[Conventional Commits]: https://www.conventionalcommits.org/
[Commit Signing]: https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits
