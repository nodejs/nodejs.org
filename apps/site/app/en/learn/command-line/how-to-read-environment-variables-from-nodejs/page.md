---
title: How to read environment variables from Node.js
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, manishprivet, nikhilbhatt, ycmjason
---

# How to read environment variables from Node.js

The `process` core module of Node.js provides the `env` property which hosts all the environment variables that were set at the moment the process was started.

The below code runs `app.js` and set `USER_ID` and `USER_KEY`.

```bash
USER_ID=239482 USER_KEY=foobar node app.js
```

That will pass the user `USER_ID` as **239482** and the `USER_KEY` as **foobar**. This is suitable for testing, however for production, you will probably be configuring some bash scripts to export variables.

> Note: `process` does not need to be imported, it is a global object in Node.js.

Here is an example that accesses the `USER_ID` and `USER_KEY` environment variables, which we set in above code.

```js
console.log(process.env.USER_ID); // "239482"
console.log(process.env.USER_KEY); // "foobar"
```

In the same way you can access any custom environment variable you set.

Node.js 20 introduced **experimental** [support for .env files](https://nodejs.org/docs/v24.5.0/api/environment_variables.html#env-files).

Now, you can use the `--env-file` flag to specify an environment file when running your Node.js application. Here's an example `.env` file and how to access its variables using `process.env`.

```bash
# .env file
PORT=3000
```

In your js file

```js
console.log(process.env.PORT); // "3000"
```

Run `app.js` file with environment variables set in `.env` file.

```bash
node --env-file=.env app.js
```

This command loads all the environment variables from the `.env` file, making them available to the application on `process.env`

Also, you can pass multiple `--env-file` arguments. Subsequent files override pre-existing variables defined in previous files.

```bash
node --env-file=.env --env-file=.development.env app.js
```

> Note: if the same variable is defined in the environment and in the file, the value from the environment takes precedence.

In case you want to optionally read from a `.env` file, it's possible to avoid
throwing an error if the file is missing using the `--env-file-if-exists` flag.

```bash
node --env-file-if-exists=.env app.js
```

## Loading `.env` files programmatically with `process.loadEnvFile(path)`

Node.js provides a built-in API to load `.env` files directly from your code: [`process.loadEnvFile(path)`](https://nodejs.org/api/process.html#processloadenvfilepath).

This method loads variables from a `.env` file into `process.env`, similar to how the `--env-file` flag works — but can be invoked programmatically.

Because this method is invoked post-initialization, the setting of startup-related environment variables (i.e. `NODE_OPTIONS`) has no effect on the process (however, these variables can still be accessed via `process.env`).

### Example

```txt
// .env file
PORT=1234
```

```js
const { loadEnvFile } = require('node:process');

// Loads environment variables from the default .env file
loadEnvFile();

console.log(process.env.PORT); // Logs '1234'
```

You can also specify a custom path:

```js
const { loadEnvFile } = require('node:process');
loadEnvFile('./config/.env');
```
