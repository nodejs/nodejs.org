---
title: Userland Migrations
layout: learn
authors: JakobJingleheimer, AugustinMauroy
---

![Node.js Userland Migrations](https://raw.githubusercontent.com/nodejs/userland-migrations/8fd9c141a118c4b64cc37eed8e663005cbc819ac/.github/assets/Userland-Migration-Tagline.png)

# Userland Migrations

Node.js offers migrations for "userland" code (anything outside the node executable) to help adopt new features and handle breaking changes. These are built in collaboration with [Codemod](https://codemod.com), a platform focused on making it easy to build, share, and run codemods.

Official migrations are published under the `@nodejs` scope within the [Codemod registry](https://codemod.link/nodejs-official). These have been reviewed and/or authored by Node.js members.

## Goal

The Node.js Userland Migrations team seeks to help developers migrate their codebases to the latest Node.js versions, making it easier to handle deprecations, new features, and breaking changes.

## How to use a codemod

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

## Understanding Codemods Registry

The [Codemod registry](https://codemod.link/nodejs-official) provides a list of available codemods for Node.js. Some codemods may not be included in the following resources but are still available because they are not related to a specific migration to a Node.js version. Since we only list codemods for End-Of-Life (EOL) deprecations, you may need to explore the registry for other codemods that could be useful for your migrations.

> Please note that if you are logged into the Codemod platform, you can like these posts. This helps us to see what users find valuable.

## Feedback

If you have any feedback or suggestions for improvements, please open a discussion on the [Node.js Userland Migrations repository](https://github.com/nodejs/userland-migrations/discussions).

## Follow the Userland Migrations Progression

You can follow the progress of userland migrations on our [GitHub project board](https://github.com/orgs/nodejs/projects/13/views/1).

This board tracks:

- Codemod kind (deprecation, breaking change, ecosystem)
- Node.js version
- Status (backlog, todo, in progress, done, not planned) _If you want to contribute, please check the "todo" column_

## Migrations guides

You can find all migrations guide on the [migration guides section](/blog/migrations).

Please also note that migration guides for major-major releases only contain end-of-life [deprecations](https://nodejs.org/docs/latest/api/deprecations.html) and breaking changes.
