---
title: Running TypeScript Natively
layout: learn
authors: AugustinMauroy, khaosdoctor, jakebailey, robpalme
---

# Running TypeScript Natively

You can write code that's valid TypeScript directly in Node.js without the need to transpile it first.

If you are using v22.18.0 or later and your source code contains only [erasable TypeScript syntax](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/#the---erasablesyntaxonly-option), you can execute TypeScript code without any flags.

```bash
node example.ts
```

If you are using a version less than v22.18.0, you can use the `--experimental-strip-types` flag to run TypeScript files directly in Node.js.

```bash
node --experimental-strip-types example.ts
```

And that's it! You can now run TypeScript code directly in Node.js without the need to transpile it first, and use TypeScript to catch type-related errors.

You can disable it via [`--no-experimental-strip-types`](https://nodejs.org/docs/latest-v22.x/api/cli.html#--no-experimental-strip-types) flag if needed.

```bash
node --no-experimental-strip-types example.ts
```

In v22.7.0 the flag [`--experimental-transform-types`](https://nodejs.org/docs/latest-v22.x/api/cli.html#--experimental-transform-types) was added to enable TypeScript-only syntax that requires transformation, like `enum`s and `namespace`. Enabling `--experimental-transform-types` automatically implies that `--experimental-strip-types` is enabled, so there's no need to use both flags in the same command:

```bash
node --experimental-transform-types another-example.ts
```

This flag is opt-in, and you should only use it if your code requires it.

## Constraints

The support for TypeScript in Node.js has some constraints to keep in mind:

You can get more information on the [API docs](https://nodejs.org/docs/latest-v22.x/api/typescript.html#typescript-features).

### Configuration

The Node.js TypeScript loader ([Amaro](https://github.com/nodejs/amaro)) does not need or use `tsconfig.json` to run TypeScript code.

We recommend configuring your editor and `tsc` to reflect Node.js behavior by creating a `tsconfig.json` using the `compilerOptions` listed [here](https://nodejs.org/api/typescript.html#type-stripping), as well as using TypeScript version **5.7 or higher**.
