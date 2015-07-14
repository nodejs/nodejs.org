# [new.nodejs.org](https://new.nodejs.org/)

##### [MIT Licensed](LICENSE)

## What is this repo?

`new.nodejs.org` represents an effort by the newly formed [Node.js Foundation](https://nodejs.org/foundation/) to build on the merged community's past website projects to form a self-publishing, community-managed version of [nodejs.org](https://nodejs.org).

On a technical level inspiration will be taken from the `iojs.org` repo while design and content will be migrated from the existing `nodejs.org` repo. These technical changes will help to facilitate community involvement and empower the foundation's internationalization communities to provide alternative website content in other languages.

This repo's issues section will also become the primary home for the Website WG's coordination efforts (meeting planning, minute approval, etc.)

## Contributing

Please contribute! There's [plenty to do](https://github.com/nodejs/new.nodejs.org/issues/20).

```
git clone git@github.com:nodejs/new.nodejs.org.git
cd new.nodejs.org
npm install
npm run serve
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
  
## Governance and Current Members

All of the Node.js Foundation websites, including this repo, are jointly governed by the **Website Working Group**. See [GOVERNANCE.md](./GOVERNANCE.md) to learn more about the group's structure and [CONTRIBUTING.md](./CONTRIBUTING.md) for guidance about the expectations for all contributors to this project.

### Website Working Group Members

- Frederic Hemberger: @fhemberger, [@fhemberger](https://twitter.com/fhemberger), `mail``@``frederic-hemberger.de`
- Robert Kowalski: @robertkowalski, [@robinson_k](http://twitter.com/robinson_k), `rok``@``kowalski.gd`
- Sean Ouimet: @snostorm, [@skepticsean](http://twitter.com/skepticsean), `sean``@``seanouimet.com`
- Tierney Coren: @bnb, [@bitandbang](http://twitter.com/bitandbang), `bitnb``@``subvertising.org`
- Trent Oswald: @therebelrobot, [@therebelrobot](http://twitter.com/therebelrobot), `trentoswald``@``therebelrobot.com`
- Jeremiah Senkpiel: @fishrock123, [@fishrock123](https://twitter.com/fishrock123), `fishrock123``@``rocketmail.com`

### Website Project Contributors

`...`
