## Dependency Pinning

Based on the initial discussions from [this discussion thread](https://github.com/nodejs/nodejs.org/discussions/5491), we've decided to use a more strict strategy for handling npm dependencies within the Node.js Website.

The intent here is to prevent the build process, or the website itself, from breaking due to changes in dependencies. As some dependencies do not respect semantic versioning, this is a real concern. Pinning dependencies also ensures that we stay fixed on a specific dependency version. For security updates, Dependabot is still configured to give us security alerts when specific dependencies got security advisories.

### When adding dependencies

The following recommendations are in order when adding a new dependency:

- A dependency should be a `dependencies` if it is part of the build process of the Website or used within runtime code.
  - Some non-code dependencies are required for the bootstrap of the repository. They are either used on basic build scripts or Git Hooks. Examples include `husky`, `lint-staged` and others.
- A dependency should be a `devDependencies` if it is not invoked anywhere within the codebase.
  - This applies to runtimes, tooling, utility/dev-only commands, type packages and others
- Sometimes, a dependency should be a `devDependency` even if invoked within the codebase, but only used within a development environment or during a test runner. Examples include `jest`, `storybook` and others.
- A dependency should be a `peerDependencies` if it is a runtime dependency of the Website, but the Website itself does not install it. Examples include `react`, `react-dom` and others.

### When pinning dependencies

When adding dependencies, you should consider if that dependency should be saved as an exact dependency (`--save-exact`) or use either a `^` or `~` version range operator. The following guidelines are in order:

- A dependency, in general, should be pinned to its exact dependency if it's either a tooling or a CLI dependency. Examples include `husky`, `prettier`, `jest` and others.
- A dependency should generally use `~` if we're interested in patch updates (such as hot-fixes and bug-fixes) and the package is part of the Development or Testing Environment. (Such as `storybook`, for example)
- A dependency should generally use `^` if they're part of the Website Application itself, such as `react`, `react-intl` etc. This is done because we intentionally want to get these dependencies' latest features and bug-fixes.
  - If we're not interested in getting the latest features and bug fixes, we should consider using `~` instead.
- Node. js-only dependencies used in scripts or during the build process of the Website (not used within actual Application code) should use `~` instead. Examples include `glob`, `@nodevu/core`
- TypeScript type packages of corresponding packages should follow the same `semver` of their respective packages

### About manual updates

This document intends to outline the strategy we have when adding dependencies. We also recommend that Team members only add new dependencies when explicitly needed. The more dependencies, the harder it gets to review and understand the complexity of the Website Application. You can avoid adding new dependencies if possible.

Manual updates should be avoided. Dependabot is configured for updating our dependencies. Updating a dependency is only needed if the update breaks the current `semver` constraint. In these situations, good judgement should be used (as a dependency should generally only be updated in these scenarios if the updated version brings new features desired by the team).

An exception to the manual rule is the version of Node.js defined within `.nvmrc`, and the corresponding `@types/node` dependency. The `@types/node` semver MAJOR version should be kept in sync with the version of Node.js the site is built with.

Lastly, in general, a Pull Request should not contain `package-lock.json` changes, nor changes to dependencies on `package.json`.
