---
title: Running TypeScript with a Node.js Itself
layout: learn
authors: AugustinMauroy
---

> **⚠️WARNING:** All content in this article uses Node.js experimental features. Please make sure you are using a version of Node.js that supports the features mentioned in this article. And remember that experimental features can change on future versions of Node.js.

# Running TypeScript with a Node.js Itself

In the previous articles, we learned how to run TypeScript code using transpilation and with a runner. In this article, we will learn how to run TypeScript code using Node.js itself.

## Running TypeScript code with Node.js

Node.js has experimental support for TypeScript. You can run TypeScript code directly in Node.js without the need to compile it first.

So how do you run TypeScript code with Node.js?

First, you need to install a nightly version of Node.js. You can download it from the [official Node.js website](https://nodejs.org/download/nightly/).

Then, you can run your TypeScript code like this:

```bash
node --experimental-strip-types example.ts
```

The `--experimental-strip-types` flag tells Node.js to strip the type annotations from the TypeScript code before running it.

And that's it! You can now run TypeScript code directly in Node.js without the need to compile it first.
In the future we all hope that this feature will be stable and available in the LTS version of Node.js, so that we can all enjoy it without any additional steps.

## Limitations

At the time of writing, the experimental support for TypeScript in Node.js has some limitations. To allow typescript to run in node.js, our collaborators have chosen to only strip types from the code.

<!--
  Maintainers note: this content is copy from docs (unreleased) and should be updated when the docs are released with a link to the official documentation
-->

Since Node.js is only removing inline types, any TypeScript features that
involve _replacing_ TypeScript syntax with new JavaScript syntax will error.
This is by design. To run TypeScript with such features, see
[Full TypeScript support][].

The most prominent unsupported features that require transformation are:

- `Enum`
- `experimentalDecorators`
- `namespaces`
- parameter properties

In addition, Node.js does not read `tsconfig.json` files and does not support
features that depend on settings within `tsconfig.json`, such as paths or
converting newer JavaScript syntax into older standards.
