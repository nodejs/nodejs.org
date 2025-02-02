---
title: Running TypeScript with a runner
layout: learn
authors: AugustinMauroy
---

# Running TypeScript with a runner

If you want more advanced processing of TypeScript than node's built-in support (or you're using node prior to v22.7.0), you have 2 options: use a runner (which handles much of the complexity for you), or handle it all yourself via [transpilation](./transpile.md).

## Running TypeScript code with `ts-node`

[ts-node](https://typestrong.org/ts-node/) is a TypeScript execution environment for Node.js. It allows you to run TypeScript code directly in Node.js without the need to compile it first. Note, however, that it does not type check your code. So we recommend to type check your code first with `tsc` and then run it with `ts-node` before shipping it.

To use `ts-node`, you need to install it first:

```bash
npm i -D ts-node
```

Then you can run your TypeScript code like this:

```bash
npx ts-node example.ts
```

## Running TypeScript code with `tsx`

[tsx](https://tsx.is/) is another TypeScript execution environment for Node.js. It allows you to run TypeScript code directly in Node.js without the need to compile it first. Note, however, that it does not type check your code. So we recommend to type check your code first with `tsc` and then run it with `tsx` before shipping it.

To use `tsx`, you need to install it first:

```bash
npm i -D tsx
```

Then you can run your TypeScript code like this:

```bash
npx tsx example.ts
```

### Registering `tsx` via `node`

If you want to use `tsx` via `node`, you can register `tsx` via `--import`:

```bash
node --import=tsx example.ts
```
