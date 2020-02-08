# [nodejs.org](https://nodejs.org/)

[![Build Status](https://github.com/nodejs/nodejs.org/workflows/Tests/badge.svg)](https://github.com/nodejs/nodejs.org/actions?workflow=Tests)
[![Dependency Status](https://img.shields.io/david/nodejs/nodejs.org.svg)](https://david-dm.org/nodejs/nodejs.org)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## What is this repo?

[nodejs.org](https://nodejs.org) by the [Node.js Foundation](https://foundation.nodejs.org/) builds on the merged community's past website projects to form a self-publishing, community-managed version of the previous site.

On a technical level, inspiration has been taken from the `iojs.org` repo while design and content has been migrated from the old [nodejs.org repo](https://github.com/nodejs/nodejs.org-archive). These technical changes have helped to facilitate community involvement and empower the foundation's internationalization communities to provide alternative website content in other languages.

This repo's issues section has become the primary home for the Website WG's coordination efforts (meeting planning, minute approval, etc).

## Contributing

Please contribute! There are plenty of [good first issues](https://github.com/nodejs/nodejs.org/labels/good%20first%20issue) to work on. To get started, you have to [fork](https://github.com/nodejs/nodejs.org/fork) this repo to your own GitHub account first. Then open up a terminal on your machine and enter the following commands:

```bash
git clone https://github.com/<your user name>/nodejs.org.git
cd nodejs.org
npm install
npm start
```

This will start the development server on `http://localhost:8080/en/`. This should reload automatically when you make changes to the code, but no code is perfect, so sometimes you may need to restart it. :)

If you want to submit a new feature or a bugfix, the best way is to create the changes in a separate branch, e.g.: `git checkout -b feature/mycoolfeature`. This will make it easier for you to submit a pull request and get your feature merged.

### Layout

* Page templates are in `/layouts`
* Global styles are in `/layouts/css`
* Global static files are in `/static`
* All content is in `/locale`
  * Initial development usually happens in English: `/locale/en`
  * `/locale/{{locale}}/site.json` is where global localization information lives.
  * All content is in Markdown and is per locale.
  * The top of each Markdown file is a block of YAML for page specific localization information that is passed to various templates.
  * The bulk of the Markdown content for each page is referenced as `{{{content}}}` in the corresponding template.

### Serve/Build Options

* `DEFAULT_LOCALE={{locale}} npm run serve` builds only the files present in the specified locale folder (will display 404 if file is not present)
* `DEFAULT_LOCALE={{locale}} npm run serve -- --preserveLocale` builds the files present in the specified locale folder and adds the pages present in the English locale that are missing.
* `npm run serve` builds all languages and returns 404 when a file is not present in the current locale
* `npm run serve -- --preserveLocale` builds all languages and adds the pages present in the English locale that are missing.
* Multiple locales can be built by using comma separated values in the `DEFAULT_LOCALE` variable. i.e: `DEFAULT_LOCALE=en,es,it`

### Deployment

Full set up is in <https://github.com/nodejs/build/tree/master/setup/www> minus secrets and certificates. The webhook is setup on GitHub for this project and talks to a small Node server on the host which does the work. See the [github-webhook](https://github.com/rvagg/github-webhook) package for this.

### Content vs. Code

The Website Working Group is primarily concerned with the code and overall structure of the website.

The content of the website comes from a variety of working groups (Evangelism, Core, i18n, etc).
The Website WG defers to these WGs on matters of content and routinely adds collaborators from these
working groups as they add and improve content on the website. In other words, the Website WG is not
an *editorial* Working Group except when no other Working Group has taken responsibility for a
content area.
