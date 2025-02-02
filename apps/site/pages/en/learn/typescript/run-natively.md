---
title: Running TypeScript Natively
layout: learn
authors: AugustinMauroy, khaosdoctor, jakebailey, robpalme
---

# Running TypeScript Natively

Since v23.6.0, Node.js enables "type stripping" by default. If you are using v23.6.0 or later and your source code contains only [erasable typescript syntax](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/#the---erasablesyntaxonly-option), you do not need this article.

## Running TypeScript code with Node.js

Since V22.6.0, Node.js has experimental support for some TypeScript syntax via "type stripping". You can write code that's valid TypeScript directly in Node.js without the need to transpile it first.

The [`--experimental-strip-types`](https://nodejs.org/docs/latest-v22.x/api/cli.html#--experimental-strip-types) flag tells Node.js to strip the type annotations from the TypeScript code before running it.

```bash
node --experimental-strip-types example.ts
```

And that's it! You can now run TypeScript code directly in Node.js without the need to transpile it first, and use TypeScript to catch type-related errors.

In V22.7.0 this experimental support was extended to transform TypeScript-only syntax, like `enum`s and `namespace`, with the addition of the [`--experimental-transform-types`](https://nodejs.org/docs/latest-v23.x/api/cli.html#--experimental-transform-types) flag. Enabling `--experimental-transform-types` automatically implies that `--experimental-strip-types` is enabled, so there's no need to use both flags in the same command:

```bash
node --experimental-transform-types another-example.ts
```

From v23.6.0 onwards, type stripping is enabled by default (you can disable it via [`--no-experimental-strip-types`](https://nodejs.org/docs/latest-v23.x/api/cli.html#--no-experimental-strip-types)), enabling you to run any supported syntax, so running files like the one below with `node file.ts` is supported:

```ts
function foo(bar: number): string {
  return 'hello';
}
```

However, running any code that requires transformations, like the code below still needs the use of `--experimental-transform-types`:

```ts
enum MyEnum {
  A,
  B,
}

console.log(MyEnum.A);
```

Future versions of Node.js will include support for TypeScript without the need for a command line flag.

## Limitations

At the time of writing, the experimental support for TypeScript in Node.js has some limitations.

You can get more information on the [API docs](https://nodejs.org/docs/latest-v23.x/api/typescript.html#typescript-features).

### Configuration

The Node.js TypeScript loader ([Amaro](https://github.com/nodejs/amaro)) does not need or use `tsconfig.json` to run TypeScript code.

We recommend configuring your editor and `tsc` to reflect Node.js behavior by creating a `tsconfig.json` using the `compilerOptions` listed [here](https://nodejs.org/api/typescript.html#type-stripping), as well as using TypeScript version **5.7 or higher**.

## Important notes

Thanks to all the contributors who have made this feature possible. We hope that this feature will be stable and available in the LTS version of Node.js soon.

We can understand that this feature is experimental and has some limitations; if that doesn't suit your use-case, please use something else, or contribute a fix. Bug reports are also welcome, please keep in mind the project is run by volunteers, without warranty of any kind, so please be patient if you can't contribute the fix yourself.
