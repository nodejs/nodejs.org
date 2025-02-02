---
title: Running TypeScript code using transpilation
layout: learn
authors: AugustinMauroy
---

# Running TypeScript code using transpilation

Transpilation is the process of converting source code from one language to another. In the case of TypeScript, it's the process of converting TypeScript code to JavaScript code. This is necessary because browsers and Node.js don't run TypeScript code directly.

## Compiling TypeScript to JavaScript

The most common way to run TypeScript code is to compile it to JavaScript first. You can do this using the TypeScript compiler `tsc`.

**Step 1:** Write your TypeScript code in a file, for example `example.ts`.

<!--
  Maintainers note: this code is duplicated in the previous article, please keep them in sync
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

**Step 2:** Install TypeScript locally using a package manager:

In this example we're going to use npm, you can check our [our introduction to the npm package manager](/learn/getting-started/an-introduction-to-the-npm-package-manager) for more information.

```bash displayName="Install TypeScript locally"
npm i -D typescript # -D is a shorthand for --save-dev
```

**Step 3:** Compile your TypeScript code to JavaScript using the `tsc` command:

```bash
npx tsc example.ts
```

> **NOTE:** `npx` is a tool that allows you to run Node.js packages without installing them globally.

`tsc` is the TypeScript compiler which will take our TypeScript code and compile it to JavaScript.
This command will result in a new file named `example.js` that we can run using Node.js.
Now when we know how to compile and run TypeScript code let's see TypeScript bug-preventing capabilities in action!

**Step 4:** Run your JavaScript code using Node.js:

```bash
node example.js
```

You should see the output of your TypeScript code in the terminal

## If there are type errors

If you have type errors in your TypeScript code, the TypeScript compiler will catch them and prevent you from running the code. For example, if you change the `age` property of `justine` to a string, TypeScript will throw an error:

We will modify our code like this, to voluntarily introduce a type error:

```ts
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine: User = {
  name: 'Justine',
  age: 'Secret!',
};

const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
```

And this is what TypeScript has to say about this:

```console
example.ts:12:5 - error TS2322: Type 'string' is not assignable to type 'number'.

12     age: 'Secret!',
       ~~~

  example.ts:3:5
    3     age: number;
          ~~~
    The expected type comes from property 'age' which is declared here on type 'User'

example.ts:15:7 - error TS2322: Type 'boolean' is not assignable to type 'string'.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
         ~~~~~~~~~~~~~~~~

example.ts:15:51 - error TS2554: Expected 1 arguments, but got 2.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
                                                     ~~~~~~~~~~~~~~~~~~~~~~


Found 3 errors in the same file, starting at: example.ts:12
```

As you can see, TypeScript is very helpful in catching bugs before they even happen. This is one of the reasons why TypeScript is so popular among developers.
