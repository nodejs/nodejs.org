> \[!IMPORTANT]\
> The **Node.js** Website is currently being redesigned; Read more [here](https://github.com/nodejs/nodejs.org/discussions/5131) to get involved!

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
  <a title="Localised" href="https://crowdin.com/project/nodejs-web">
    <img src="https://badges.crowdin.net/nodejs-web/localized.svg" alt="Crowdin Badge" />
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

> \[!IMPORTANT]\
> Please read our [Translation Guidelines][] before contributing to Translation and Localization of the Website

> \[!NOTE]\
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

## Node.js Binaries & API Docs

This repository does not contain the codebase or related infrastructure that serves `https://nodejs.org/api/`, `https://nodejs.org/docs/` or `https://nodejs.org/dist/`.

These are maintained in different repositories and we urge users to open **issues in their respective repositories**, for bug reports, feature requests or any matter related to these endpoints.

- [`release-cloudflare-worker`](https://github.com/nodejs/release-cloudflare-worker): The codebase responsible for serving the Node.js Distribution Binaries, API Docs and any other assets from the links mentioned above.
  - We use Cloudflare R2 Buckets for storing our Assets and Cloudflare Workers for serving these Assets to the Web.
- [`node/doc/api`](https://github.com/nodejs/node/tree/main/doc/api): The source code of our API docs, it contains all the Node.js API Documentation Markdown files
  - [`node/doc`](https://github.com/nodejs/node/tree/main/doc) contains the HTML templates, CSS styles and JavaScript code that runs on the client-side of our API Docs generated pages.
  - [`node/tools/doc`](https://github.com/nodejs/node/tree/main/tools/doc) contains the tooling that validates, lints, builds and compiles our API Docs. Also responsible for generating what you see when accessing `https://nodejs.org/api/`.

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
  - A really warm thank you to Cloudflare as we would not be able to serve our community without their immense support.
- Thanks to [Sentry](https://sentry.io/welcome/) for providing an open source license for their error reporting, monitoring and diagnostic tools.
- Thanks to [Crowdin](https://crowdin.com/) for providing a platform that allows us to localize the Node.js Website and collaborate with translators.

[code of conduct]: https://github.com/nodejs/admin/blob/main/CODE_OF_CONDUCT.md
[contribution guidelines]: https://github.com/nodejs/nodejs.org/blob/main/CONTRIBUTING.md
[content vs code]: https://github.com/nodejs/nodejs.org/blob/main/CONTENT_VS_CODE.md
[dependency pinning]: https://github.com/nodejs/nodejs.org/blob/main/DEPENDENCY_PINNING.md
[collaborator guide]: https://github.com/nodejs/nodejs.org/blob/main/COLLABORATOR_GUIDE.md
[figma design]: https://www.figma.com/file/pu1vZPqNIM7BePd6W8APA5/Node.js
[translation guidelines]: https://github.com/nodejs/nodejs.org/blob/main/TRANSLATION.md
