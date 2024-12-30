---
title: Publishing a TypeScript project
layout: learn
authors: JakobJingleheimer
---

# Publishing a TypeScript project

This article augments TypeScript's own [Publishing guide](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html) with specifics for native node support.

Some important things to note:

- Everything from [Publishing a package](../modules/publishing-a-package) applies here.

- Node runs TypeScript via a process called "[type stripping](https://nodejs.org/api/typescript.html#type-stripping)", wherein node (via [Amaro](https://github.com/nodejs/amaro)) removes TypeScript-specific syntax, leaving behind vanilla JavaScript (which node already understands). This behaviour is enabled by default of node version 23.6.0.

  - Node does **not** strip types in `node_modules` because it can cause significant performance issues for the official TypeScript compiler (`tsc`), so the TypeScript maintainers would like to discourage people publishing raw TypeScript, at least for now.

- Consuming TypeScript-specific features like `enum` in node still require a flag ([`--experimental-transform-types`](https://nodejs.org/api/typescript.html#typescript-features)). There are often better alternatives for these anyway.

- Use [dependabot](https://docs.github.com/en/code-security/dependabot) to keep your dependencies current, including those in github actions. It's a very easy set-and-forget configuration.

- `.nvmrc` comes from [NVM](https://github.com/nvm-sh/nvm), a multi-version manager for node. It allows you to specify the version of node the project should generally use.

A published package will look something like:

```text displayName="Published example TypeScript package (directory overview)"
example-ts-pkg/
├ LICENSE
├ main.d.ts
├ main.js
├ package.json
├ README.md
├ some-util.d.ts
└ some-util.js
```

That would be derived from a repository looking something like:

```text displayName="Source of the example TypeScript package (directory overview)"
example-ts-pkg/
├ .github/
  ├ workflows/
    ├ ci.yml
    └ publish.yml
  └ dependabot.yml
├ src/
  ├ foo.fixture.js
  ├ main.ts
  ├ main.test.ts
  ├ some-util.ts
  └ some-util.test.ts
├ LICENSE
├ package.json
└ README.md
```

## What to do with your types

### Treat types like a test

The purpose of types is to warn an implementation will not work:

```ts
const foo = 'a';
const bar: number = 1 + foo;
//    ^^^ Type 'string' is not assignable to type 'number'.
```

TypeScript has warned that the above code will not behave as intended, just like a unit test warns that code does not behave as intended.

Your IDE (ex VS Code) likely has built-in support for TypeScript, displaying errors as you work. If not, and/or you missed those, CI will have your back.

```yaml displayName=".github/workflows/ci.yml"
name: Tests

on:
  pull_request:
    branches: ['main']

jobs:
  check-types:
    # Separate these from tests because
    # they are platform and node-version independent
    # and need be run only once.

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - name: npm clean install
        run: npm ci
      # You may want to run a lint check here too
      - run: node --run types:check

  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node:
          - version: 23.x
          - version: 22.x
      fail-fast: false # Prevent a failure in one version cancelling other runs

    steps:
      - uses: actions/checkout@v4
      - name: Use node ${{ matrix.node.version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node.version }}
          cache: 'npm'
      - name: npm clean install
        run: npm ci
      - run: node --run test
```

```json displayName="package.json"
{
  "name": "example-ts-pkg",
  "scripts": {
    "test": "node --test './src/**/*.test.ts'",
    "types:check": "tsc --noEmit"
  },
  "optionalDependencies": {
    "typescript": "^5.7.2"
  }
}
```

```json displayName="tsconfig.json"
{
  "compilerOptions": {
    "allowArbitraryExtensions": true,
    "allowImportingTsExtensions": true,
    "baseUrl": "./",
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true, // Flux Capacitor: The universe breaks without it, but nobody knows exactly what it does.
    "lib": ["ESNext"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./",
    "resolveJsonModule": true,
    "resolvePackageJsonExports": true,
    "resolvePackageJsonImports": true,
    "target": "ESNext"
  },
  // These may be different for your repo:
  "include": ["./src"],
  "exclude": ["**/*/*.test.*", "**/fixtures/**"]
}
```

Pro-tip: The TypeScript executable (`tsc`) is likely used only in CI. Avoid bloating your local node_modules (where you probably won't use it) by adding [`--omit="optional"`](https://docs.npmjs.com/cli/v11/commands/npm-install#omit) when you run `npm install` locally: `npm install --omit="optional"`

### Generate type declarations

Type declarations (`.d.ts` and friends) provide type information as a sidecar file, allowing the execution code to be vanilla JavaScript whilst still having types.

Since these are generated based on source code, they can be built as part of your publication process and do not need to be checked into your repository.

Take the following example (a [GitHub Action](https://github.com/features/actions)), where the type declarations are generated just before publishing to the NPM registry.

```yaml displayName=".github/workflows/publish.yml"
name: Publish to NPM
on:
  push:
    tags:
      - '**@*'

jobs:
  build:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci

      # You can probably ignore the boilerplate config above

      - name: Publish with provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npm publish --access public --provenance
```

```diff displayName="package.json"
{
  "name": "example-ts-pkg",
  "scripts": {
+   "prepack": "tsc",
    "types:check": "tsc --noEmit"
  }
}
```

```text displayName=".npmignore"
*.ts
!*.d.ts
fixtures
```

`npm publish` will automatically run [`prepack` beforehand](https://docs.npmjs.com/cli/v11/using-npm/scripts#npm-publish). `npm` will also run `prepack` automatically before `npm pack --dry-run` (so you can easily see what your published package will be without actually publishing it). **Beware**, [`node --run` does _not_ do that](../command-line/run-nodejs-scripts-from-the-command-line.md#using-the---run-flag). You can't use `node --run` for this step, so that is not a caveat here, but it can be for other steps.

#### Breaking this down

Generating type declarations is deterministic: you'll get the same output from the same input, every time. So there is no need to commit these to git.

[`npm publish`](https://docs.npmjs.com/cli/v11/commands/npm-publish) grabs everything applicable and available at the moment the command is run; so generating type declarations immediately before means those are available and will get picked up.

By default, `npm publish` grabs (almost) everything (see [Files included in package](https://docs.npmjs.com/cli/v11/commands/npm-publish#files-included-in-package)). In order to keep your published package minimal (see the "Heaviest Objects in the Universe" meme about `node_modules`), you want to exclude certain files (like tests and test fixtures) from from packaging. Add these to the opt-out list specified in [`.npmignore`](https://docs.npmjs.com/cli/v11/using-npm/developers#keeping-files-out-of-your-package); ensure the `!*.d.ts` exception is listed, or the generated type declartions will not be published! Alternatively, you can use [package.json "files"](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#files) to create an opt-in list.
