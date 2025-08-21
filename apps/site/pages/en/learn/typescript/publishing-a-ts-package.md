---
title: Publishing a TypeScript package
layout: learn
authors: JakobJingleheimer
---

# Publishing a TypeScript package

This article covers items regarding TypeScript publishing specifically. Publishing means distributed as a package via npm (or other package manager); this is not about compiling an app / server to be run in production (such as a PWA and/or endpoint server).

Some important things to note:

- Everything from [Publishing a package](../modules/publishing-a-package) applies here.
  - Fields like `main` operate on _published_ content, so when TypeScript source-code is transpiled to JavaScript, JavaScript is the published content and `main` would point to a JavaScript file with a JavaScript file extension (ex `main.ts` → `"main": "main.js"`).

  - Fields like `scripts.test` operate on source-code, so they would use the file extensions of the source code (ex `"test": "node --test './src/**/*.test.ts'`).

- Node runs TypeScript code via a process called "[type stripping](https://nodejs.org/api/typescript.html#type-stripping)", wherein node (via [Amaro](https://github.com/nodejs/amaro)) removes TypeScript-specific syntax, leaving behind vanilla JavaScript (which node already understands). This behaviour is enabled by default as of node version 22.18.0.
  - Node does **not** strip types in `node_modules` because it can cause significant performance issues for the official TypeScript compiler (`tsc`) and parts of VS Code, so the TypeScript maintainers would like to discourage people publishing raw TypeScript, at least for now.

- Consuming TypeScript-specific features like `enum` in node still requires a flag ([`--experimental-transform-types`](https://nodejs.org/api/typescript.html#typescript-features)). There are often better alternatives for these anyway.
  - To ensure TypeScript-specific features are _not_ present (so your code can just run in node), set the [`erasableSyntaxOnly`](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/#the---erasablesyntaxonly-option) config option in TypeScript version 5.8+.

- Use [dependabot](https://docs.github.com/en/code-security/dependabot) to keep your dependencies current, including those in github actions. It's a very easy set-and-forget configuration.

- `.nvmrc` comes from [`nvm`](https://github.com/nvm-sh/nvm), a multi-version manager for node. It allows you to specify the version of node the project should generally use.

A directory overview of a repository would look something like:

```text displayName="Files co-located"
example-ts-pkg/
├ .github/
│ ├ workflows/
│ │ ├ ci.yml
│ │ └ publish.yml
│ └ dependabot.yml
├ src/
│ ├ foo.fixture.js
│ ├ main.ts
│ ├ main.test.ts
│ ├ some-util.ts
│ └ some-util.test.ts
├ LICENSE
├ package.json
├ README.md
└ tsconfig.json
```

```text displayName="Files co-located but segregated"
example-ts-pkg/
├ .github/
│ ├ workflows/
│ │ ├ ci.yml
│ │ └ publish.yml
│ └ dependabot.yml
├ src/
│ ├ __test__/
│ │ ├ foo.fixture.js
│ │ ├ main.test.ts
│ ├ main.ts
│ └ some-util/
│   ├ __test__
│   │ └ some-util.test.ts
│   └ some-util.ts
├ LICENSE
├ package.json
├ README.md
└ tsconfig.json
```

```text displayName="'src' and 'test' fully segregated"
example-ts-pkg/
├ .github/
│ ├ workflows/
│ │ ├ ci.yml
│ │ └ publish.yml
│ └ dependabot.yml
├ src/
│ ├ main.ts
│ ├ some-util.ts
├ test/
│ ├ foo.fixture.js
│ ├ main.ts
│ └ some-util.ts
├ LICENSE
├ package.json
├ README.md
└ tsconfig.json
```

And a directory overview of its published package would look something like:

```text displayName="Fully flat"
example-ts-pkg/
├ LICENSE
├ main.d.ts
├ main.d.ts.map
├ main.js
├ package.json
├ README.md
├ some-util.d.ts
├ some-util.d.ts.map
└ some-util.js
```

```text displayName="With 'dist'"
example-ts-pkg/
├ dist/
│ ├ main.d.ts
│ ├ main.d.ts.map
│ ├ main.js
│ ├ some-util.d.ts
│ ├ some-util.d.ts.map
│ └ some-util.js
├ LICENSE
├ package.json
└ README.md
```

A note about directory organisation: There are a few common practices for placing tests. Principle of least knowledge says to co-locate them (put them adjacent to implementation). Sometimes, that's in the same directory, or within a drawer like a `__test__` (also adjacent to the implementation, "Files co-located but segregated"). Alternatively, some opt to create a `test/` sibling to `src/` ("'src' and 'test' fully segregated"), either with a mirrored structure or a "junk drawer".

## What to do with your types

### Treat types like a test

The purpose of types is to warn an implementation will not work:

```ts
const foo = 'a';
const bar: number = 1 + foo;
//    ^^^ Type 'string' is not assignable to type 'number'.
```

TypeScript has warned that the above code will not behave as intended, just like a unit test warns that code does not behave as intended. They are complementary and verify different things—you should have both.

Your editor (e.g. VS Code) likely has built-in support for TypeScript, displaying errors as you work. If not, and/or you missed those, CI will have your back.

The following [GitHub Action](https://github.com/features/actions) sets up a CI task to automatically check (and require) types pass inspection for a PR into the `main` branch.

```yaml displayName=".github/workflows/ci.yml"
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json

name: Tests

on:
  pull_request:
    branches: ['*']

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

  get-matrix:
    # Automatically pick active LTS versions
    runs-on: ubuntu-latest
    outputs:
      latest: ${{ steps.set-matrix.outputs.requireds }}
    steps:
      - uses: ljharb/actions/node/matrix@main
        id: set-matrix
        with:
          versionsAsRoot: true
          type: majors
          preset: '>= 22' # glob is not backported below 22.x

  test:
    needs: [get-matrix]
    runs-on: ${{ matrix.os }}

    strategy:
      fail-fast: false
      matrix:
        node-version: ${{ fromJson(needs.get-matrix.outputs.latest) }}
        os:
          - macos-latest
          - ubuntu-latest
          - windows-latest

    steps:
      - uses: actions/checkout@v4
      - name: Use node ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
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
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
```

```json displayName="tsconfig.json (flat output)"
{
  "compilerOptions": {
    "allowArbitraryExtensions": true,
    "declaration": true,
    "declarationMap": true,
    "lib": ["es2023"],
    "module": "NodeNext",
    "outDir": "./",
    "resolveJsonModule": true,
    "rewriteRelativeImportExtensions": true,
    "target": "es2022"
  },
  // These may be different for your repo:
  "include": ["./src"],
  "exclude": ["**/*/*.test.*", "**/*.fixture.*"]
}
```

```json displayName="tsconfig.json ('dist' output)"
{
  "compilerOptions": {
    "allowArbitraryExtensions": true,
    "declaration": true,
    "declarationMap": true,
    "lib": ["es2023"],
    "module": "NodeNext",
    "outDir": "./dist",
    "resolveJsonModule": true,
    "rewriteRelativeImportExtensions": true,
    "target": "es2022"
  },
  // These may be different for your repo:
  "include": ["./src"],
  "exclude": ["**/*/*.test.*", "**/*.fixture.*"]
}
```

Note that test files may well have a different `tsconfig.json` applied (hence why they are excluded in the above sample).

### Generate type declarations

Type declarations (`.d.ts` and friends) provide type information as a sidecar file, allowing the execution code to be vanilla JavaScript whilst still having types.

Since these are generated based on source code, they can be built as part of your publication process and do not need to be checked into your repository.

Take the following example, where the type declarations are generated just before publishing to the npm registry.

```yaml displayName=".github/workflows/publish.yml"
# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json

# This is mostly boilerplate.

name: Publish to npm
on:
  push:
    tags:
      - '**@*'

jobs:
  build:
    runs-on: ubuntu-latest

    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci

      # - name: Publish to npm
      #   run: … npm publish …
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

```ini displayName=".npmignore"
*.*ts       # foo.cts foo.mts foo.ts
!*.d.*ts
*.fixture.*
```

```ini displayName=".npmignore ('dist' output)"
src
test
```

You'll want to publish a package compiled to support all Node.js LTS versions since you don't know which version the consumer will be running; the `tsconfig`s in this article support node 18.x and later.

`npm publish` will automatically run [`prepack` beforehand](https://docs.npmjs.com/cli/using-npm/scripts#npm-publish). `npm` will also run `prepack` automatically before `npm pack --dry-run` (so you can easily see what your published package will be without actually publishing it). **Beware**, [`node --run` does _not_ do that](../command-line/run-nodejs-scripts-from-the-command-line.md#using-the---run-flag). You can't use `node --run` for this step, so that caveat does not apply here, but it can for other steps.

The steps to actually publish to npm will be included in a separate article (there are several pros and cons beyond the scope of this article).

#### Breaking this down

Generating type declarations is deterministic: you'll get the same output from the same input, every time. So there is no need to commit these to git.

[`npm publish`](https://docs.npmjs.com/cli/commands/npm-publish) grabs everything applicable and available at the moment the command is run; so generating type declarations immediately before means those are available and will get picked up.

By default, `npm publish` grabs (almost) everything (see [Files included in package](https://docs.npmjs.com/cli/commands/npm-publish#files-included-in-package)). In order to keep your published package minimal (see the "Heaviest Objects in the Universe" meme about `node_modules`), you want to exclude certain files (like tests and test fixtures) from from packaging. Add these to the opt-out list specified in [`.npmignore`](https://docs.npmjs.com/cli/using-npm/developers#keeping-files-out-of-your-package); ensure the `!*.d.ts` exception is listed, or the generated type declartions will not be published! Alternatively, you can use [package.json "files"](https://docs.npmjs.com/cli/configuring-npm/package-json#files) to create an opt-in (if a mistake is made accidentally omitting a file, your package may be broken for downstream users, so this is a less safe option).
