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
git clone https://github.com/<your user name>/nodejs.org.git
cd nodejs.org
npm install
npm start
```

This will start the development server on `http://localhost:8080/en/`. This page should reload automatically when you make changes to the code, but no code is perfect, so sometimes you may need to restart it. :)

If you want to submit a new feature or a bugfix, the best way is to create the changes in a separate branch, e.g.: `git checkout -b feature/mycoolfeature`. This will make it easier for you to submit a pull request and get your feature merged.

### To translate content into other languages

If you want to help translate to other languages or improve existing translations, it isn't necessary to work from GitHub. You can and should do it through Crowdin, this is the correct workflow.

Crowdin is an online tool that facilitates the user experience for the translator, here is more information:

Website translations are handled via [Crowdin](https://crowdin.com/project/nodejs-website).

To help with localization, please read the [TRANSLATION](TRANSLATION.md) guide.

## Layout

* Page templates are in `/layouts`
* Global styles are in `/layouts/css`
* Global static files are in `/static`
* All content is in `/locale`
  * Initial development usually happens in English: `/locale/en`
  * `/locale/{{locale}}/site.json` is where global localization information lives.
  * All content is in Markdown and is per locale.
  * The top of each Markdown file is a block of YAML for page specific localization information that is passed to various templates.
  * The bulk of the Markdown content for each page is referenced as `{{{content}}}` in the corresponding template.

## Serve/Build Options

* `DEFAULT_LOCALE={{locale}} node build.js` builds all the translated files present in the locale folder (will display 404 status code if file is not present), the static/css folder for all the Sass files, as well as copy the rest of the static assets to their subfolder in the build directory.
* `DEFAULT_LOCALE={{locale}} node build.js --preserveLocale` the same as `node build.js` but it will add the pages present in the English locale that are missing instead of throwing 404 status code.
* `DEFAULT_LOCALE={{locale}} npm run serve` builds only the files present in the specified locale folder (will display 404 status code if file is not present), then start the default website (`http://localhost:${port}/${mainLocale}`). Here `{port}` is 8080, `{mainLocale}` is `en` or the first specified language.
* `DEFAULT_LOCALE={{locale}} npm run serve -- --preserveLocale` the same as `npm run serve ` but it will add the pages present in the English locale that are missing.
* `npm run serve` builds all the current languages and returns 404 when a file is not present in the current locale, then start the default website (`http://localhost:${port}/${mainLocale}`). Here `{port}` is 8080, `{mainLocale}` is `en` in default.
* `npm run serve -- --preserveLocale` the same as `npm run serve` but it will add the pages present in the English locale that are missing instead of throwing 404 status code.

## Test Options

Before submitting, you must pass all the unit tests and syntax checks by running the two commands below:

* `npm-run-all test:lint test:unit` run all the unit test cases in `tests` folder, as well as check syntax with eslint.
* `npm-run-all --parallel test:lint:*` run all the syntax checks for `js`, `md` and other related files.

There're also two syntax check commands for you:
* `npm run test:lint:js -- --fix` try to automatically fix some formations for all the js files.
* `npm run test:lint:stylelint -- --fix` try to automatically fix some formations for all the css/scss files.

## Notice

* Multiple locales can be built by using comma-separated values in the `DEFAULT_LOCALE` variable: `DEFAULT_LOCALE=en,es,it`.
* For other options, see `package.json`.

## Deployment

Full setup is in <https://github.com/nodejs/build/tree/master/ansible/www-standalone> minus secrets and certificates. The webhook is setup on GitHub for this project and talks to a small Node server on the host which does the work. See the [github-webhook](https://github.com/rvagg/github-webhook) package for this.

## Content vs. Code

The Website Working Group is primarily concerned with the code and overall structure of the website.

The content of the website comes from a variety of working groups (Evangelism, Core, i18n, etc).
The Website WG defers to these WGs on matters of content and routinely adds collaborators from these
working groups as they add and improve content on the website. In other words, the Website WG is not
an *editorial* Working Group except when no other Working Group has taken responsibility for a
content area.
