<p align="center">
  <br />
  <a href="https://nodejs.org">
    <img src="./public/static/images/logos/nodejs-new-pantone-black.svg" width="200"/>
  </a>
</p>

<p align="center">
  <a href="https://nodejs.org">nodejs.org</a> website built using Nextra (Next.js) with TypeScript, SCSS and MDXv2
</p>

<p align="center">
  <a title="CI Status" href="https://github.com/nodejs/nodejs.org/actions/workflows/github-pages.yml?query=branch%3Amain">
    <img src="https://github.com/nodejs/nodejs.org/actions/workflows/github-pages.yml/badge.svg">
  </a>
  <a title="MIT License" href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue">
  </a>
  <a title="Localised" href="https://crowdin.com/project/nodejs-website">
    <img src="https://badges.crowdin.net/nodejs-website/localized.svg">
  </a>
  <a title="Follow on Twitter" href="https://twitter.com/Nodejs">
    <img src="https://img.shields.io/twitter/follow/Nodejs.svg?style=social&label=Follow%20@Nodejs">
  </a>
  <br />
  <br />
</p>

## What is this repo?

[Nodejs.org](https://nodejs.org/) by the [OpenJS Foundation](https://openjsf.org/) is the official website for the Node.js® JavaScript runtime. This repo is the source code for the website. It is build using [Nextra](https://nextra.site), a Next.js based static site generator.

### Quick-Start Locally

```bash
npm ci
npm run serve
# listening at localhost:3000
```

### Structure of this Repository

- Page templates are in `/layouts`
- Global styles are in `/layouts/css`
- Global static files are in `/static`
- All content is in `/pages`
  - Initial development usually happens in English: `/pages/en`
  - `/i18n/locales/{{locale}}.json` is where global localization information lives.
  - All content is in Markdown and is per locale.
  - The top of each Markdown file is a block of YAML for page specific localization information that is passed to various templates.
  - The bulk of the Markdown content for each page is referenced as `{{{content}}}` in the corresponding template.

## Contributing

This project adopts the Node.js [Code of Conduct][].

Any person who wants to contribute to the Website is welcome! Please read [Contributing Guidelines][] and see the [Figma Design][] to understand better the structure of this repository.

### To translate content into other languages

If you want to help translate to other languages or improve existing translations, it isn't necessary to work from GitHub. You can and should do it through Crowdin, this is the correct workflow.

Crowdin is an online tool that facilitates the user experience for the translator, here is more information:

Website translations are handled via [Crowdin](https://crowdin.com/project/nodejs-website).

To help with localization, please read the [TRANSLATION](TRANSLATION.md) guide.

### Deployment

Full setup is in <https://github.com/nodejs/build/tree/master/ansible/www-standalone> minus secrets and certificates. The webhook is setup on GitHub for this project and talks to a small Node server on the host which does the work. See the [github-webhook](https://github.com/rvagg/github-webhook) package for this.

## Relevant Links

[Code of Conduct][]

[Contributing Guidelines][]

[Collaborator Guide][]

[Figma Design][]

[Content vs Code][]

[code of conduct]: https://github.com/nodejs/admin/blob/main/CODE_OF_CONDUCT.md
[contributing guidelines]: ./CONTRIBUTING.md
[content vs code]: ./CONTENT_VS_CODE.md
[collaborator guide]: ./COLLABORATOR_GUIDE.md
[figma design]: https://www.figma.com/file/lOxAGGg5KXb6nwie7zXkz6/NJ---Design-System?node-id=22%3A6086
