---
title: How do I prompt users for input from a command-line script?
date: '2011-08-26T10:08:50.000Z'
tags:
  - javascript
  - core
  - cli
difficulty: 2
layout: knowledge-post.hbs
---

So you've got a little CLI tool, but you want to be able to prompt a user for additional data after the script has started, rather than passing it in as a command line argument or putting it in a file. To do this, you'll need to listen to STDIN ("standard input", i.e. your keyboard), which Node.js exposes for you as `process.stdin`, a readable stream.

Streams are the Node.js way of dealing with evented I/O - it's a big topic, and you can read more about them [here](https://nodejs.org/api/stream.html). For now, we're going to use the built-in `readline` module which is a wrapper around Standard I/O, suitable for taking user input from command line(terminal).

Here's a simple example. Try the following in a new file:

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name ? ', function (name) {
  rl.question('Where do you live ? ', function (country) {
    console.log(`${name}, is a citizen of ${country}`);
    rl.close();
  });
});

rl.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});
```

In the above code `readline.createInterface()` is used for creating an instance of `readline` by configuring the readable and the writable streams. The `input` key takes a readable stream like `process.stdin` or `fs.createReadStream('file.txt')` and the `output` key takes a writable stream like `process.stdout` or `process.stderr`.

The `rl.question()` method displays the query by writing it to the `output`, waits for user input to be provided on `input`, then invokes the `callback` function passing the provided input as the first argument.

NODE PRO TIP: Do remember to use `rl.close()` to close the transmitting otherwise the process will be left in the `idle` state.

The last part of the code uses `rl.on()` method to add an event listener to the `close` event which simply `console.log` to the output stream and exits the process. This part is completely optional and can be removed at will. For more in-depth details and usage refer to the docs [here](https://nodejs.org/api/readline.html).

If all of this sounds complicated, or if you want a higher-level interface to this sort of thing, don't worry - as usual, the Node.js community has come to the rescue. One particularly friendly module to use for this is `prompt`, available on `npm`:

```bash
npm install prompt
```

Prompt is built to be easy - if your eyes started to glaze over as soon as you saw `Readable Stream`, then this is the section for you. Compare the following to the example above:

```js
const prompt = require('prompt');

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Email: ' + result.email);
});

function onErr(err) {
  console.log(err);
  return 1;
}
```

NODE PRO TIP: This short script also demonstrates proper error handling in node - errors are a callback's first argument, and `return` is used with the error handler so that the rest of the function doesn't execute when errors happen.

Prompt also makes it trivial to handle a certain set of recurring properties that one might want to attach.

```js
const prompt = require('prompt');

const properties = [
  {
    name: 'username',
    validator: /^[a-zA-Z\s-]+$/,
    warning: 'Username must be only letters, spaces, or dashes'
  },
  {
    name: 'password',
    hidden: true
  }
];

prompt.start();

prompt.get(properties, function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Password: ' + result.password);
});

function onErr(err) {
  console.log(err);
  return 1;
}
```

For more information on Prompt, please see [the project's GitHub page](https://github.com/flatiron/prompt).
