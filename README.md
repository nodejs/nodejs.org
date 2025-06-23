<div align="center">
  <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://nodejs.org/static/logos/nodejsLight.svg" />
      <img src="https://nodejs.org/static/logos/nodejsDark.svg" width="200" alt="Node.js logo" />
    </picture>
  </a>

  <p>
    <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">Node.js</a> website built using Next.js, TypeScript, Tailwind CSS, and MDXv3.
  </p>

  <p>
    <a href="LICENSE" title="MIT License">
      <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" />
    </a>
    <a href="https://crowdin.com/project/nodejs-web" title="Localization" target="_blank" rel="noopener noreferrer">
      <img src="https://badges.crowdin.net/nodejs-web/localized.svg" alt="Crowdin Badge" />
    </a>
    <a href="https://vercel.com" title="Powered by Vercel" target="_blank" rel="noopener noreferrer">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/powered%20by-Vercel%20%E2%96%B2-white" />
        <img src="https://img.shields.io/badge/powered%20by-Vercel%20%E2%96%B2-black" alt="Powered by Vercel" />
      </picture>
    </a>
  </p>

  <p>
    <img src="https://github.com/nodejs/nodejs.org/actions/workflows/build.yml/badge.svg" alt="Build and Analysis Checks" />
    <a href="https://securityscorecards.dev/viewer/?uri=github.com/nodejs/nodejs.org" title="Security Scorecard" target="_blank" rel="noopener noreferrer">
      <img src="https://api.securityscorecards.dev/projects/github.com/nodejs/nodejs.org/badge" alt="Security Scorecard" />
    </a>
  </p>
</div>

---

## What is this repository?

[Nodejs.org](https://nodejs.org/) is the official website for the Node.js® JavaScript runtime, maintained by the [OpenJS Foundation](https://openjsf.org/).  
This repository contains the website source code, built with [Next.js](https://nextjs.org), TypeScript, Tailwind CSS, and MDXv3.

```bash
pnpm install --frozen-lockfile
pnpm dev

# Available at http://localhost:3000
```

---

## Contributing

This project adheres to the Node.js [Code of Conduct][].

We welcome contributions from everyone. Please read the [Contribution Guidelines][] and consult the [Figma Design][] for structural guidance.

> **Important**  
> Before contributing to translations or localization, please read the [Translation Guidelines][].

> **Note**  
> We recommend reviewing all relevant documents listed below before making content or code changes.

### Deployment

The site is automatically deployed to [Vercel](https://vercel.com) when changes are pushed to the `main` branch.  
Deployment details are managed by the Node.js Website Team and are accessible only to maintainers.

<details>
  <summary>Legacy Deployment Info</summary>

The legacy deployment setup can be found at  
<https://github.com/nodejs/build/tree/master/ansible/www-standalone>, minus secrets and certificates.

The GitHub webhook triggers a Node.js server on the host using the [github-webhook](https://github.com/rvagg/github-webhook) package.

</details>

---

## Node.js Binaries & API Docs

This repository does **not** serve the following endpoints:

- `https://nodejs.org/api/`
- `https://nodejs.org/docs/`
- `https://nodejs.org/dist/`

These are maintained in separate repositories:

- [`release-cloudflare-worker`](https://github.com/nodejs/release-cloudflare-worker): Serves distribution binaries and API docs using Cloudflare Workers and R2.
- [`node/doc/api`](https://github.com/nodejs/node/tree/main/doc/api): Contains the source Markdown files for API documentation.
- [`node/doc`](https://github.com/nodejs/node/tree/main/doc): Contains templates, styles, and frontend logic.
- [`node/tools/doc`](https://github.com/nodejs/node/tree/main/tools/doc): Builds and validates the API docs output.

---

## Relevant Links

- [Code of Conduct][]
- [Contribution Guidelines][]
- [Collaborator Guide][]
- [Figma Design][]
- [Content vs Code][]
- [Dependency Pinning][]
- [Translation Guidelines][]
- [Status Page](https://status.nodejs.org/)

---

## Acknowledgements

- Thanks to all contributors who make this project possible.
- Thanks to [Chromatic](https://www.chromatic.com/) for visual testing.
- Thanks to [Vercel](https://vercel.com/) for hosting infrastructure.
- Thanks to [Cloudflare](https://www.cloudflare.com/) for CDN and web infrastructure.
- Thanks to [Sentry](https://sentry.io/welcome/) for open source monitoring.
- Thanks to [Crowdin](https://crowdin.com/) for localization tooling.
- Thanks to [Orama](https://docs.oramasearch.com/) for fast, full-text search.
- Thanks to [DigitalOcean](https://www.digitalocean.com/) for their open source credits program.

[code of conduct]: https://github.com/nodejs/admin/blob/main/CODE_OF_CONDUCT.md  
[contribution guidelines]: https://github.com/nodejs/nodejs.org/blob/main/CONTRIBUTING.md  
[content vs code]: https://github.com/nodejs/nodejs.org/blob/main/docs/content-vs-code.md  
[dependency pinning]: https://github.com/nodejs/nodejs.org/blob/main/docs/dependency-pinning.md  
[collaborator guide]: https://github.com/nodejs/nodejs.org/blob/main/docs/collaborator-guide.md  
[figma design]: https://www.figma.com/file/a10cjjw3MzvRQMPT9FP3xz  
[translation guidelines]: https://github.com/nodejs/nodejs.org/blob/main/docs/translation.md
