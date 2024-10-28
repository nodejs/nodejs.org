---
title: Running TypeScript Natively
layout: learn
authors: AugustinMauroy
---

> **⚠️WARNING⚠️:** All content in this article uses Node.js experimental features. Please make sure you are using a version of Node.js that supports the features mentioned in this article. And remember that experimental features can change in future versions of Node.js.

# Running TypeScript Natively

In the previous articles, we learned how to run TypeScript code using transpilation and with a runner. In this article, we will learn how to run TypeScript code using Node.js itself.

## Running TypeScript code with Node.js

Since V22.6.0, Node.js has experimental support for some TypeScript syntax. You can write code that's valid TypeScript directly in Node.js without the need to transpile it first.

So how do you run TypeScript code with Node.js?

```bash
node --experimental-strip-types example.ts
```

The `--experimental-strip-types` flag tells Node.js to strip the type annotations from the TypeScript code before running it.

And that's it! You can now run TypeScript code directly in Node.js without the need to transpile it first, and use TypeScript to catch type-related errors.
Future versions of Node.js will include support for TypeScript without the need for a command line flag.

## Limitations

At the time of writing, the experimental support for TypeScript in Node.js has some limitations. To allow TypeScript to run in node.js, our collaborators have chosen to only strip types from the code.

You can get more information on the [API docs](https://nodejs.org/docs/latest/api/typescript.html#unsupported-typescript-features)

## Important notes

Thanks to all the contributors who have made this feature possible. We hope that this feature will be stable and available in the LTS version of Node.js soon.

We can understand that this feature is experimental and has some limitations; if that doesn't suit your use-case, please use something else, or contribute a fix. Bug reports are also welcome, please keep in mind the project is run by volunteers, without warranty of any kind, so please be patient if you can't contribute the fix yourself.
