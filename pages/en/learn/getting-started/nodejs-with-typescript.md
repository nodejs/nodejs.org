---
title: Node.js with TypeScript
layout: learn.hbs
authors: sbielenica, ovflowd, vaishnav-mk
---

# Node.js with TypeScript

## What is TypeScript

**[TypeScript](https://www.typescriptlang.org)** is a trendy open-source language maintained and developed by Microsoft. It's loved and used by a lot of software developers around the world.

Basically, it's a superset of JavaScript that adds new capabilities to the language. The most notable addition is static type definitions, something that is not present in plain JavaScript. Thanks to types, it's possible, for example, to declare what kind of arguments we are expecting and what is returned exactly in our functions or what's the exact shape of the object that we are creating. TypeScript is a really powerful tool and opens a new world of possibilities in JavaScript projects. It makes our code more secure and robust by preventing many bugs before the code is even shipped - it catches problems during code development and integrates wonderfully with code editors like Visual Studio Code.

We can talk about other TypeScript benefits later, let's see some examples now!

### Examples

Take a look at this code snippet and then we can unpack it together:

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
  age: 23,
};

const isJustineAnAdult: boolean = isAdult(justine);
```

The first part (with the `type` keyword) is responsible for declaring our custom object type representing users. Later we utilize this newly created type to create function `isAdult` that accepts one argument of type `User` and returns `boolean`. After this, we create `justine`, our example data that can be used for calling the previously defined function. Finally, we create a new variable with information on whether `justine` is an adult.

There are additional things about this example that you should know. Firstly, if we would not comply with declared types, TypeScript would alarm us that something is wrong and prevent misuse. Secondly, not everything must be typed explicitly - TypeScript is very smart and can deduce types for us. For example, variable `isJustineAnAdult` would be of type `boolean` even if we didn't type it explicitly or `justine` would be valid argument for our function even if we didn't declare this variable as of `User` type.

Okay, so we have some TypeScript code. Now how do we run it?

**First thing to do is to install TypeScript in our project:**

```bash
npm i -D typescript
```

Now we can compile it to JavaScript using `tsc` command in the terminal. Let's do it!

**Assuming that our file is named `example.ts`, the command would look like:**

```bash
npx tsc example.ts
```

> [npx](https://www.npmjs.com/package/npx) here stands for Node Package Execute. This tool allows us to run TypeScript's compiler without installing it globally.

`tsc` is the TypeScript compiler which will take our TypeScript code and compile it to JavaScript.
This command will result in a new file named `example.js` that we can run using Node.js.
Now when we know how to compile and run TypeScript code let's see TypeScript bug-preventing capabilities in action!

**This is how we will modify our code:**

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

**And this is what TypeScript has to say about this:**

```console
example.ts:12:3 - error TS2322: Type 'string' is not assignable to type 'number'.

12   age: "Secret!",
     ~~~

  example.ts:3:3
    3   age: number;
        ~~~
    The expected type comes from property 'age' which is declared here on type 'User'

example.ts:15:7 - error TS2322: Type 'boolean' is not assignable to type 'string'.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
         ~~~~~~~~~~~~~~~~

example.ts:15:51 - error TS2554: Expected 1 arguments, but got 2.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
                                                     ~~~~~~~~~~~~~~~~~~~~~~


Found 3 errors.
```

As you can see TypeScript successfully prevents us from shipping code that could work unexpectedly. That's wonderful!

## More about TypeScript

TypeScript offers a whole lot of other great mechanisms like interfaces, classes, utility types and so on. Also, on bigger projects you can declare your TypeScript compiler configuration in a separate file and granularly adjust how it works, how strict it is and where it stores compiled files for example. You can read more about all this awesome stuff in [the official TypeScript docs](https://www.typescriptlang.org/docs).

Some of the other benefits of TypeScript that are worth mentioning are that it can be adopted progressively, it helps making code more readable and understandable and it allows developers to use modern language features while shipping code for older Node.js versions.

## TypeScript in the Node.js world

TypeScript is well-established in the Node.js world and used by many companies, open-source projects, tools and frameworks.
Some of the notable examples of open-source projects using TypeScript are:

- [NestJS](https://nestjs.com/) - robust and fully-featured framework that makes creating scalable and well-architected systems easy and pleasant
- [TypeORM](https://typeorm.io/#/) - great ORM influenced by other well-known tools from other languages like Hibernate, Doctrine or Entity Framework
- [Prisma](https://prisma.io/) - next-generation ORM featuring a declarative data model, generated migrations and fully type-safe database queries
- [RxJS](https://rxjs.dev/) - widely used library for reactive programming
- [AdonisJS](https://adonisjs.com) - A fully featured web framework with Node.js
- [FoalTs](https://foalts.org/) - The Elegant Nodejs Framework

And many, many more great projects... Maybe even your next one!
