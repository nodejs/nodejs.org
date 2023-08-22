<p align="center">
  <br />
  <a href="https://nodejs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./public/static/images/logos/nodejs-new-pantone-white.svg">
      <img src="./public/static/images/logos/nodejs-new-pantone-black.svg" width="200px">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://nodejs.org">Node.js</a> Website built using Next.js with TypeScript, SCSS and MDXv2
</p>

<p align="center">
  <a title="MIT License" href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" />
  </a>
  <a title="Localised" href="https://crowdin.com/project/nodejs-website">
    <img src="https://badges.crowdin.net/nodejs-website/localized.svg" alt="Crowdin Badge" />
  </a>
  <a title="Vercel" href="https://vercel.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/powered%20by-Vercel%20%E2%96%B2-white">
      <img src="https://img.shields.io/badge/powered%20by-Vercel%20%E2%96%B2-black" alt="Powered by Vercel">
    </picture>
  </a>

  <br />

  <img src="https://github.com/nodejs/nodejs.org/actions/workflows/build.yml/badge.svg" alt="Build and Analysis Checks" />
  <a title="scorecard" href="https://securityscorecards.dev/viewer/?uri=github.com/nodejs/nodejs.org">
    <img src="https://api.securityscorecards.dev/projects/github.com/nodejs/nodejs.org/badge" alt="nodejs.org scorecard badge" />
  </a>

  <br />
  <br />
</p>

## What is this repo?

[Nodejs.org](https://nodejs.org/) by the [OpenJS Foundation](https://openjsf.org/) is the official website for the Node.js® JavaScript runtime. This repo is the source code for the website. It is built using [Next.js](https://nextjs.org), a React Framework.

```bash
npm ci
npx turbo serve

# listening at localhost:3000
```

## Contributing

This project adopts the Node.js [Code of Conduct][].

Any person who wants to contribute to the Website is welcome! Please read [Contribution Guidelines][] and see the [Figma Design][] to understand better the structure of this repository.

> [!IMPORTANT]\
> Please read our [Translation Guidelines][] before contributing to Translation and Localization of the Website

> [!NOTE]\
> We recommend a read of all Relevant Links below before doing code changes; Including Dependency changes, Content changes, and Code changes.

### Deployment

The Website is automatically deployed to [Vercel](https://vercel.com) through its GitHub App integration when new pushes happen on the `main` branch.

Details regarding the deployment are only accessible to the maintainers of the Website Team due to certain limitations.

The current integration is owned by the OpenJS Foundation and managed by the Website Team.

<details>
  <summary>Legacy Deployment</summary>

The full setup is in <https://github.com/nodejs/build/tree/master/ansible/www-standalone> minus secrets and certificates.

The webhook is set up on GitHub for this project and talks to a small Node server on the host, which does the work. See the [github-webhook](https://github.com/rvagg/github-webhook) package for this.

</details>

## Relevant Links

[Code of Conduct][]

[Contribution Guidelines][]

[Collaborator Guide][]

[Figma Design][]

[Content vs Code][]

[Dependency Pinning][]

[Translation Guidelines][]

## Thanks

- Thanks to all contributors and collaborators that make this project possible.
- Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.
- Thanks to [Vercel](https://www.vercel.com/) for providing the infrastructure that serves and powers the Node.js Website
- Thanks to [Cloudflare](https://cloudflare.com) for providing the infrastructure that serves Node.js's Website, Node.js's CDN and more.

[code of conduct]: https://github.com/nodejs/admin/blob/main/CODE_OF_CONDUCT.md
[contribution guidelines]: ./CONTRIBUTING.md
[content vs code]: ./CONTENT_VS_CODE.md
[dependency pinning]: ./DEPENDENCY_PINNING.md
[collaborator guide]: ./COLLABORATOR_GUIDE.md
[figma design]: https://www.figma.com/file/pu1vZPqNIM7BePd6W8APA5/Node.js
[translation guidelines]: ./TRANSLATION.md
