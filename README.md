# [nodejs.org](https://nodejs.org/)

[![Build Status](https://img.shields.io/travis/nodejs/nodejs.org/master.svg)](http://travis-ci.org/nodejs/nodejs.org)
[![Dependency Status](https://img.shields.io/david/nodejs/nodejs.org.svg)](https://david-dm.org/nodejs/nodejs.org)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## What is this repo?

[nodejs.org](https://nodejs.org) by the [Node.js Foundation](https://nodejs.org/foundation/) builds on the merged community's past website projects to form a self-publishing, community-managed version of the previous site.

On a technical level inspiration has been taken from the `iojs.org` repo while design and content has been migrated from the old `nodejs.org` repo. These technical changes have helped to facilitate community involvement and empower the foundation's internationalization communities to provide alternative website content in other languages.

This repo's issues section has become the primary home for the Website WG's coordination efforts (meeting planning, minute approval, etc.)

## Contributing

Please contribute! There's plenty of [good first contributions](https://github.com/nodejs/nodejs.org/labels/good%20first%20contribution) to do.

```bash
$ git clone git@github.com:nodejs/nodejs.org.git
$ cd nodejs.org
$ npm install
$ npm run serve
```

This will start the development server on http://localhost:8080/en/ and should reload automatically when you make changes but it's all just code and no code is perfect so sometimes you may need to restart it :)

Note: You'll need io.js 2.x or newer as the build system uses some native ES2015 features.

### Layout

* Page templates are in `/layouts`
* Global styles are in `/layouts/css`
* Global static files are in `/static`
* All content and localization specific styles are in `/locale`
 * Initial development usually happens in English: `/locale/en`
 * `/locale/{{locale}}/site.json` is where global localization information lives.
 * All content is in Markdown and is per locale.
  * The top of each Markdown file is a block of YAML for page specific localization information that is passed to various templates.
  * The bulk of the Markdown content for each page is referenced as `{{{content}}}` in the corresponding template.

### Deployment

Full set up is in https://github.com/nodejs/build/tree/master/setup/www minus secrets and certificates. The webhook is setup on GitHub for this project and talks to a small Node server on the host which does the work. See the [github-webhook](https://github.com/rvagg/github-webhook) package for this.

## Governance and Current Members

All of the Node.js Foundation websites, including this repo, are jointly governed by the **Website Working Group**. See [GOVERNANCE.md](./GOVERNANCE.md) to learn more about the group's structure and [CONTRIBUTING.md](./CONTRIBUTING.md) for guidance about the expectations for all contributors to this project.

### Website Working Group Members

- Frederic Hemberger: @fhemberger, [@fhemberger](https://twitter.com/fhemberger), `mail``@``frederic-hemberger.de`
- Robert Kowalski: @robertkowalski, [@robinson_k](https://twitter.com/robinson_k), `rok``@``kowalski.gd`
- Sean Ouimet: @snostorm, [@skepticsean](https://twitter.com/skepticsean), `sean``@``seanouimet.com`
- Tierney Coren: @bnb, [@bitandbang](https://twitter.com/bitandbang), `bitnb``@``subvertising.org`
- Trent Oswald: @therebelrobot, [@therebelrobot](https://twitter.com/therebelrobot), `trentoswald``@``therebelrobot.com`
- Jeremiah Senkpiel: @fishrock123, [@fishrock123](https://twitter.com/fishrock123), `fishrock123``@``rocketmail.com`
- Mikeal Rogers: @mikeal, [@mikeal](https://twitter.com/mikeal), `mikeal.rogers``@``gmail.com`

### Website Project Contributors

- Phillip Johnsen: @phillipj, [@phillipjohnsen](https://twitter.com/phillipjohnsen), `johphi``@``gmail.com`
