---
title: Publishing a TypeScript package
layout: learn
authors: JakobJingleheimer
---

# Publishing a TypeScript package

This article augments TypeScript's [Publishing guide](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html) with specifics for native node support.

Some important things to note:

- Node runs typescript via a process called "type stripping", wherein node (via SWC under the hood of [Amaro](https://github.com/nodejs/amaro)) removes TypeScript-specific syntax, leaving behind vanilla JavaScript (which node already understands). This behaviour is enabled by default of node version 23.6.0.

  - Node does **not** strip types in `node_modules`. This decision was at the request of TypeScript maintainers because it can cause significant performance issues for the official compiler (`tsc`).

- TypeScript-specific features like `enum` still require a flag ([`--experimental-transform-types`](https://nodejs.org/api/typescript.html#typescript-features))

## What to do with your types

### Treat them like a test

The purpose of types are to warn an implementation will not work:

```ts
const foo = 'a';
const bar: number = 1 + foo;
//    ^^^ Type 'string' is not assignable to type 'number'.
```

TypeScript has warned you that the above code will not behave as intended, just like a unit test warns you code does not behave as intended.

Your IDE (ex VS Code) likely has built-in support for TypeScript, displaying errors as you work. If not, and/or you missed those, CI will have your back.

```yaml displayName=".github/workflows/ci.yml"
name: Tests

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

jobs:
  lint-and-check-types:
    # Separate these from tests because
    # they are platform and node-version independent.

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - name: npm clean install
        run: npm ci
      - run: node --run lint
      - run: node --run types:check

  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node:
          - version: 23.x
          - version: 22.x
          # glob is not backported below 22.x
      fail-fast: false # prevent a failure in one version cancelling other runs

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node.version }}
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
  "version": "0.0.0",
  "name": "example-ts-pkg",
  "scripts": {
    "lint": "…",
    "types:check": "tsc --noEmit"
  },
  "optionalDependencies": {
    // This is used only in CI.
    // Marking it 'optional' avoids installing on your local
    // (where you probably won't use it).
    "typescript": "^5.7.2"
  }
}
```

```json displayName="tsconfig.json"
{
  "compilerOptions": {
    "declarationMap": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "esModuleInterop": true, // Flux Capacitor: The universe breaks without it, but nobody knows what it does.
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ESNext"
  },
  // These may be different for your repo:
  "include": "./src",
  "exclude": ["**/*/*.test.*"]
}
```

### Generating type declarations

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

      - name: Generate types
        run: node --run types:generate

      - name: Publish with provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npm publish --access public --provenance
```

```diff displayName="package.json"
{
  "name": "example-ts-pkg",
  "scripts": {
    "types:check": "tsc --noEmit",
+   "types:generate": "tsc"
  }
}
```

```text displayName=".npmignore"
*.test.*
*.fixture.*
fixture.*
fixtures
```

#### Breaking this down

Generating type declarations is deterministic: you'll get the same output from the same input, every time. So there is no need to commit these to git.

[`npm publish`](https://docs.npmjs.com/cli/v11/commands/npm-publish) grabs everything applicable and available at the moment the command is run; so generating type declarations immediately before means those are available and will get picked up.

By default, `npm publish` grabs (almost) everything (see [Files included in package](https://docs.npmjs.com/cli/v11/commands/npm-publish#files-included-in-package)). In order to keep your published package minimal (see the "Heaviest Objects in the Universe" meme about `node_modules`), you want to exclude certain files (like tests and test fixtures) from from packaging.
