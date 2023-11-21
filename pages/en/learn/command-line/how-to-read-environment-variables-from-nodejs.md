---
title: How to read environment variables from Node.js
layout: learn.hbs
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, manishprivet
---

# How to read environment variables from Node.js

The `process` core module of Node.js provides the `env` property which hosts all the environment variables that were set at the moment the process was started.

The below code runs `app.js` and set `USER_ID` and `USER_KEY`.

```bash
USER_ID=239482 USER_KEY=foobar node app.js
```

That will pass the user `USER_ID` as **239482** and the `USER_KEY` as **foobar**. This is suitable for testing, however for production, you will probably be configuring some bash scripts to export variables.

> Note: `process` does not require a "require", it's automatically available.

Here is an example that accesses the `USER_ID` and `USER_KEY` environment variables, which we set in above code.

```js
process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
```

In the same way you can access any custom environment variable you set.

If you have multiple environment variables in your node project, you can also create an `.env` file in the root directory of your project, and then use the [dotenv](https://www.npmjs.com/package/dotenv) package to load them during runtime.

```bash
# .env file
USER_ID="239482"
USER_KEY="foobar"
NODE_ENV="development"
```

In your js file

```js
require('dotenv').config();

process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
process.env.NODE_ENV; // "development"
```

> You can also run your js file with `node -r dotenv/config index.js` command if you don't want to import the package in your code.

> Note: Nodejs 20 and above have **experimental** support for the .env file. You can read more about it [here](https://nodejs.org/dist/latest-v20.x/docs/api/cli.html#--env-fileconfig).
