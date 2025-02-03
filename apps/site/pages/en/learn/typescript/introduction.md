---
title: Introduction to TypeScript
layout: learn
authors: sbielenica, ovflowd, vaishnav-mk, AugustinMauroy
---

# Introduction to TypeScript

## What is TypeScript

**[TypeScript](https://www.typescriptlang.org)** is an open-source language maintained and developed by Microsoft.

Basically, TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. Catch errors early in your editor or in your CI/CD pipeline, and write more maintainable code.

We can talk about other TypeScript benefits later, let's see some examples now!

## First TypeScript code

Take a look at this code snippet and then we can unpack it together:

<!--
  Maintainers note: this code is duplicated in the next article, please keep them in sync
-->

```ts
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine = {
  name: 'Justine',
  age: 23,
} satisfies User;

const isJustineAnAdult = isAdult(justine);
```

The first part (with the `type` keyword) is responsible for declaring our custom object type representing users. Later we utilize this newly created type to create function `isAdult` that accepts one argument of type `User` and returns `boolean`. After this, we create `justine`, our example data that can be used for calling the previously defined function. Finally, we create a new variable with information on whether `justine` is an adult.

There are additional things about this example that you should know. Firstly, if we do not comply with the declared types, TypeScript will inform us that something is wrong and prevent misuse. Secondly, not everything must be typed explicitly—TypeScript infers types for us. For example, the variable `isJustineAnAdult` is of type `boolean` even if we didn't type it explicitly, and `justine` would be a valid argument for our function even though we didn't declare this variable as of `User` type.

## What does TypeScript consist of?

TypeScript consists of two main components: the code itself and type definitions.

### TypeScript Code

The code part is regular JavaScript with additional TypeScript-specific syntax for type annotations. When TypeScript code is compiled, all the TypeScript-specific parts are removed, resulting in clean JavaScript that can run in any environment. For example:

```ts
// This is TypeScript code
function greet(name: string) {
  console.log(`Hello, ${name}!`);
}
```

### Type Definitions

Type definitions are declarations that describe the shape of existing JavaScript code. They are usually stored in `.d.ts` files and don't contain any actual implementation—they only describe the types. These definitions are essential for TypeScript to understand the types of libraries written in JavaScript.

For example, when you use Node.js with TypeScript, you'll need type definitions for Node.js APIs. This is where `@types/node` comes in—it's a package that contains type definitions for Node.js standard library. You can install it using:

```bash
npm add --save-dev @types/node
```

These type definitions allow TypeScript to understand Node.js APIs and provide proper type checking and autocompletion when you use functions like `fs.readFile` or `http.createServer`. For example:

```ts
import * as fs from 'fs';

// TypeScript knows the correct types thanks to @types/node
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

Many popular JavaScript libraries have their type definitions available in the `@types` namespace, maintained by the DefinitelyTyped community. This enables seamless integration of existing JavaScript libraries with TypeScript projects.

## How to run TypeScript code

Okay, so we have some TypeScript code. Now how do we run it?
There are few possible ways to run TypeScript code, we will cover all of them in the next articles.
