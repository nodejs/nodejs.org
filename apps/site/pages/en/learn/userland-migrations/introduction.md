---
title: Userland Migrations
layout: learn
authors: JakobJingleheimer, AugustinMauroy
---

![Node.js Userland Migrations](https://raw.githubusercontent.com/nodejs/userland-migrations/main/.github/assets/Userland-Migration-Tagline.png)

# Userland Migrations

Node.js offers migrations for "userland" code (anything outside the node executable) to help adopt new features and handle breaking changes. These are built in collaboration with [Codemod](https://codemod.com), a platform focused on making it easy to build, share, and run codemods.

Official migrations are published under the `@nodejs` scope within the [Codemod registry](https://codemod.link/nodejs-official). These have been reviewed and/or authored by Node.js members.

## Goal

The Node.js Userland Migrations team seeks to help developers migrate their codebases to the latest Node.js versions, making it easier to handle deprecations, new features, and breaking changes.

## How to use a Codemod

To use a codemod, you can run the following command in your terminal:

```bash
npx codemod <codemod-name>
```

Replace `<codemod-name>` with the name of the codemod you want to run. For example, if you want to run the `@nodejs/import-assertions-to-attributes` codemod on your project, you would run:

```bash
npx codemod @nodejs/import-assertions-to-attributes
```

## Good Practices

- **Run migrations in a separate branch**: If you are using a version control system like Git, it is a good practice to run migrations in a separate branch. This allows you to review the changes before merging them into your main branch.
- **Review changes**: After running a migration, review the changes made to your codebase. Ensure that the migration has not introduced any unintended side effects or issues.
- **Test your code**: After running a migration, it is important to test your code to ensure that everything is working as expected. Run your test suite and check for any errors or failures
- **Format and or lint your code**: After running a migration, it is a good practice to format and lint your code. This ensures that your code follows the project's coding standards and is easier to read and maintain.

## Feedback

If you have any feedback or suggestions for improvements, please open an issue on the [Node.js Userland Migrations repository](https://github.com/nodejs/userland-migrations/issues).

## Follow the Userland Migrations Progression

You can follow the progress of userland migrations on our [GitHub project board](https://github.com/orgs/nodejs/projects/13/views/1).

This board tracks:

- Codemod kind (deprecation, breaking change, ecosystem)
- Node.js version
- Status (backlog, todo, in progress, done, not planned) _If you want to contribute, please check the "todo" column_
