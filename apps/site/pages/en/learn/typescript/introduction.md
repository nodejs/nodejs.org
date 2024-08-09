---
title: Introduction to TypeScript
layout: learn
authors: sbielenica, ovflowd, vaishnav-mk, AugustinMauroy
---

# Introduction to TypeScript

## What is TypeScript

**[TypeScript](https://www.typescriptlang.org)** is an open-source language maintained and developed by Microsoft. It's loved and used by a lot of software developers around the world.

Basically, it's a superset of JavaScript that adds new capabilities to the language. The most notable addition is static type definitions, something that is not present in plain JavaScript. Thanks to types, it's possible, for example, to declare what kind of arguments we are expecting and what is returned exactly in our functions or what's the exact shape of the object that we are creating. TypeScript is a really powerful tool and opens a new world of possibilities in JavaScript projects. It makes our code more secure and robust by preventing many bugs before the code is even shipped - it catches problems during code development and integrates wonderfully with code editors like Visual Studio Code.

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

There are additional things about this example that you should know. Firstly, if we would not comply with declared types, TypeScript would alarm us that something is wrong and prevent misuse. Secondly, not everything must be typed explicitly - TypeScript is very smart and can infer types for us. For example, variable `isJustineAnAdult` is of type `boolean` even if we didn't type it explicitly or `justine` would be valid argument for our function even though we didn't declare this variable as of `User` type.

## How to run TypeScript code

Okay, so we have some TypeScript code. Now how do we run it?
There are few possible ways to run TypeScript code, we will cover all of them in the next articles.
