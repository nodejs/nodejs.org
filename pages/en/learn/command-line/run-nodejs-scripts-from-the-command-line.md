---
title: Run Node.js scripts from the command line
layout: learn.hbs
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, akazyti
---

# Run Node.js scripts from the command line

The usual way to run a Node.js program is to run the globally available `node` command (once you install Node.js) and pass the name of the file you want to execute.

If your main Node.js application file is `app.js`, you can call it by typing:

```bash
node app.js
```

Above, you are explicitly telling the shell to run your script with `node`. You can also embed this information into your JavaScript file with a "shebang" line. The "shebang" is the first line in the file, and tells the OS which interpreter to use for running the script. Below is the first line of JavaScript:

```js
#!/usr/bin/node
```

Above, we are explicitly giving the absolute path of interpreter. Not all operating systems have `node` in the bin folder, but all should have `env`. You can tell the OS to run `env` with node as parameter:

```js
#!/usr/bin/env node

// your code
```

To use a shebang, your file should have executable permission. You can give `app.js` the executable permission by running:

```bash
chmod u+x app.js
```

While running the command, make sure you are in the same directory which contains the `app.js` file.

## Pass string as argument to `node` instead of file path

To execute a string as argument you can use `-e`, `--eval "script"`. Evaluate the following argument as JavaScript. The modules which are predefined in the REPL can also be used in script.

On Windows, using cmd.exe a single quote will not work correctly because it only recognizes double `"` for quoting. In Powershell or Git bash, both `'` and `"` are usable.

```bash
node -e "console.log(123)"
```

## Restart the application automatically

The `node` command has to be re-executed in bash whenever there is a change in the application. To restart the application automatically, use the `nodemon` module.

Install the nodemon module globally to system path:

```bash
npm i -g nodemon
```

You can also install nodemon as a development dependency:

```bash
npm i --save-dev nodemon
```

This local installation of nodemon can be run by calling it from within npm script such as npm start or using npx nodemon.

Run the application using the `nodemon` command followed by the application's file name:

```bash
nodemon app.js
```

> Note: nodejs 16 and above has an **exerimental** watch mode. You can use `node --watch app.js` to run the application in watch mode. You can read about this in the [api docs](https://nodejs.org/docs/latest-v18.x/api/cli.html#--watch).
