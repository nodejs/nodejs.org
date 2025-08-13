---
title: Ecosystem to Node.js
layout: learn
authors: AugustinMauroy
---

# Ecosystem to Node.js

Sometimes the ecosystem creates awesome tools or libraries for node.js, but a native alternative is present in Node.js. So, this page shows you codemod that handle this case.

## `correct-ts-specifiers`

When you want to [run typescript natively in Node.js](/learn/typescript/run-natively), you need to have a correct "specifiers" in your [imports statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

To run this codemod, you have to use this command:

```bash
npx codemod run @nodejs/correct-ts-specifiers
```

## Feedback

If you have any tools that you would like to be handle by userland-migrations, please open an issue on the [Node.js Userland Migrations repository](https://github.com/nodejs/userland-migrations/issues).
