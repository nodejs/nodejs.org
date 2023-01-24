# [nodejs.org](https://nodejs.org/)

[![CI Status](https://github.com/nodejs/nodejs.org/actions/workflows/ci.yml/badge.svg)](https://github.com/nodejs/nodejs.org/actions/workflows/ci.yml?query=branch%3Amain)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Crowdin](https://badges.crowdin.net/nodejs-website/localized.svg)](https://crowdin.com/project/nodejs-website)

## What is this repo?

[nodejs.org](https://nodejs.org/) by the [OpenJS Foundation](https://openjsf.org/) builds on the merged community's past website projects to form a self-publishing, community-managed version of the previous site.

On a technical level, inspiration has been taken from the `iojs.org` repo while design and content has been migrated from the old [nodejs.org repo](https://github.com/nodejs/nodejs.org-archive). These technical changes have helped to facilitate community involvement and empower the foundation's internationalization communities to provide alternative website content in other languages.

This repo's issues section has become the primary home for the Website WG's coordination efforts (meeting planning, minute approval, etc).

## Contributing

There are two ways to contribute to this project. The first is **submitting new features or fixing bugs** and the second is **translating content to other languages**.

In both cases the workflow is different, please check how it is done in each case.

### To submit a new feature or a bugfix

Please contribute! There are plenty of [good first issues](https://github.com/nodejs/nodejs.org/labels/good%20first%20issue) to work on. To get started, you have to [fork](https://github.com/nodejs/nodejs.org/fork) this repo to your own GitHub account first. Then open up a terminal on your machine and enter the following commands:

```bash
git clone https://github.com/{your username}/nodejs.org
cd nodejs.org
npm ci
npm run serve
```

This will start the development server on `http://localhost:3000/en/`. This page should reload automatically when you make changes to the code, but no code is perfect, so sometimes you may need to restart it. :)

If you want to submit a new feature or a bugfix, the best way is to create the changes in a separate branch, e.g.: `git checkout -b feature/mycoolfeature`. This will make it easier for you to submit a pull request and get your feature merged.

### To translate content into other languages

If you want to help translate to other languages or improve existing translations, it isn't necessary to work from GitHub. You can and should do it through Crowdin, this is the correct workflow.

Crowdin is an online tool that facilitates the user experience for the translator, here is more information:

Website translations are handled via [Crowdin](https://crowdin.com/project/nodejs-website).

To help with localization, please read the [TRANSLATION](TRANSLATION.md) guide.

## Layout

- Page templates are in `/layouts`
- Global styles are in `/layouts/css`
- Global static files are in `/static`
- All content is in `/pages`
  - Initial development usually happens in English: `/pages/en`
  - `/i18n/locales/{{locale}}.json` is where global localization information lives.
  - All content is in Markdown and is per locale.
  - The top of each Markdown file is a block of YAML for page specific localization information that is passed to various templates.
  - The bulk of the Markdown content for each page is referenced as `{{{content}}}` in the corresponding template.

## Serve/Build Options

- `npm run serve` runs Next.js's Local Development Server, listening by default on `http://localhost:3000/`.
- `npm run build` builds the Application on Production mode. The output is by default within `.next` folder.
- `npm run export` exports the website from the `.next` into a fully static website. The output is by default within `build` folder.
  - This is what it's used to deploy the website on our current Node.js servers.
- `npm run start` starts a web server running serving the built content from `npm run build`

## Other CLI options

We also offer other commands that offer you assistance during your local development

- `npm run lint` runs the linter for all the js files.
  - `npm run lint:fix` attempts to fix any linting errors
- `npm run prettier` runs the prettier for all the js files.
  - `npm run prettier:fix` attempts to fix any style errors
- `npm run format` formats and fixes the whole codebase
- `npm run scripts:release-post` generates a release post for the current release
  - **Usage:** `npm run scripts:release-post -- --version=vXX.X.X --force`

## Deployment

Full setup is in <https://github.com/nodejs/build/tree/master/ansible/www-standalone> minus secrets and certificates. The webhook is setup on GitHub for this project and talks to a small Node server on the host which does the work. See the [github-webhook](https://github.com/rvagg/github-webhook) package for this.

## Content vs. Code

The Website Working Group is primarily concerned with the code and overall structure of the website.

The content of the website comes from a variety of working groups (Evangelism, Core, i18n, etc).
The Website WG defers to these WGs on matters of content and routinely adds collaborators from these
working groups as they add and improve content on the website. In other words, the Website WG is not
an _editorial_ Working Group except when no other Working Group has taken responsibility for a
content area.
