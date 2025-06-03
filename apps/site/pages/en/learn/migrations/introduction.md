---
title: Userland Migrations
layout: learn
authors: JakobJingleheimer
---

# Userland Migrations

Node.js provides migrations for "userland" (what you write vs node's own) source-code to facilitate adoption of new features and upgrading source-code affected by breaking changes. These are done in collaboration with [`codemod`](https://www.codemod.com), who also work with other major projects like Next.js, React, and Tailwind. Node.js's migrations live in the [`nodejs/userland-migrations`](https://github.com/nodejs/userland-migrations) repository and are overseen by the [`@nodejs/userland-migrations`](https://github.com/orgs/nodejs/teams/userland-migrations) team.

Official migrations are published under the `@nodejs` namespace within the [codemod registry](https://codemod.com/registry?framework=node.js). These have been reviewed and/or authored by Node.js members. There are also unofficial migrations available which have not been reviewed by Node.js.

A migration alters a project's source-code to apply a new design pattern, like:

```console
cd path/to/your/project
npx codemod@latest @nodejs/correct-ts-specifiers
```

The cited migration transforms legacy typescript imports to standards-compliant specifiers like:

```ts displayName="before"
import Foo from './foo';
```

```ts displayName="after"
import type Foo from './foo/index.ts';
```
