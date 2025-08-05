---
title: Userland Migrations
layout: learn
authors: JakobJingleheimer, AugustinMauroy
---

![Node.js Userland Migrations](https://raw.githubusercontent.com/nodejs/userland-migrations/main/.github/assets/Userland-Migration-Tagline.png)

# Userland Migrations

Node.js provides migrations for "userland" (what you write vs node's own) source-code to facilitate adoption of new features and upgrading source-code affected by breaking changes. These are done in collaboration with [`codemod`](https://docs.codemod.com/introduction), who also work with other major projects like Next.js, React, and Tailwind. Node.js's migrations live in the [`nodejs/userland-migrations`](https://github.com/nodejs/userland-migrations) repository and are overseen by the `@nodejs/userland-migrations` team.

<!--
maintainer node: https://codemod.link/nodejs-official is pointing to legacy codemod registry
it's will point to new new one once codemod change the redirection of the short link
-->

Official migrations are published under the `@nodejs` namespace within the [codemod registry](https://codemod.link/nodejs-official). These have been reviewed and/or authored by Node.js members. There are also unofficial migrations available which have not been reviewed by Node.js.

## Our goal

First our goal is to help you to migrate your codebase to the latest Node.js version. We want to make it easier for you to adopt new features, deprecations, and breaking changes. In summary, we want to help you to migrate your codebase to the latest Node.js version.

Second, we want to help you to adopt native Node.js features that are already available in the ecosystem. For example, if you are using a library that provides a feature that is already available in Node.js, we want to help you to migrate to the native Node.js feature.

## How to use a Codemod

To use a codemod, you can run the following command in your terminal:

```bash displayName="npm"
npx codemod@next <codemod-name>
```

```bash displayName="yarn"
yarn dlx codemod@next <codemod-name>
```

```bash displayName="pnpm"
pnpx codemod@next <codemod-name>
```

Replace `<codemod-name>` with the name of the codemod you want to run. For example, if you want to run the `@nodejs/import-assertions-to-attributes` codemod on your project, you would run:

```bash displayName="npm"
npx codemod@next @nodejs/import-assertions-to-attributes
```

```bash displayName="yarn"
yarn dlx codemod@next @nodejs/import-assertions-to-attributes
```

```bash displayName="pnpm"
pnpx codemod@next @nodejs/import-assertions-to-attributes
```

## Good Practices

- **Run migrations in a separate branch**: If you are using a version control system like Git, it is a good practice to run migrations in a separate branch. This allows you to review the changes before merging them into your main branch.
- **Review changes**: After running a migration, review the changes made to your codebase. Ensure that the migration has not introduced any unintended side effects or issues.
- **Test your code**: After running a migration, it is important to test your code to ensure that everything is working as expected. Run your test suite and check for any errors or failures

## Feedback

If you have any feedback or suggestions for improvements, please open an issue on the [Node.js Userland Migrations repository](https://github.com/nodejs/userland-migrations/issues).

## Follow the Userland Migrations Progression

You can follow the progress of userland migrations on our [GitHub project board](https://github.com/orgs/nodejs/projects/13/views/1).

This board tracks:

- Codemod kind (deprecation, breaking change, ecosystem)
- Node.js version
- Status (backlog, todo, in progress, done, not planned) _If you want to contribute, please check the "todo" column_
