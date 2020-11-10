---
title: How to parse command line arguments
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---

Passing in arguments via the command line is an extremely basic programming task, and a necessity for anyone trying to write a simple Command-Line Interface (CLI). In Node.js, as in C and many related environments, all command-line arguments received by the shell are given to the process in an array called `argv` (short for 'argument values').

Node.js exposes this array for every running process in the form of `process.argv` - let's take a look at an example. Make a file called `argv.js` and add this line:

```js
console.log(process.argv);
```

Now save it, and try the following in your shell:

```bash
$ node argv.js one two three four five
[ 'node',
  '/home/avian/argvdemo/argv.js',
  'one',
  'two',
  'three',
  'four',
  'five' ]
```

There you have it - an array containing any arguments you passed in. Notice the first two elements - `node` and the path to your script. These will always be present - even if your program takes no arguments of its own, your script's interpreter and path are still considered arguments to the shell you're using.

Where everyday CLI arguments are concerned, you'll want to skip the first two. Now try this in `argv.js`:

```js
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
```

This yields:

```bash
$ node argv.js one two three four five
myArgs:  [ 'one', 'two', 'three', 'four', 'five' ]
```

Now let's actually do something with the args:

```js
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
case 'insult':
    console.log(myArgs[1], 'smells quite badly.');
    break;
case 'compliment':
    console.log(myArgs[1], 'is really cool.');
    break;
default:
    console.log('Sorry, that is not something I know how to do.');
}
```

JS PRO TIP: Remember to `break` after each `case` - otherwise you'll run the next case too!

Referring to your command-line arguments by array index isn't very clean, and can quickly turn into a nightmare when you start working with flags and the like - imagine you made a server, and it needed a lot of arguments. Imagine having to deal with something like `myapp -h host -p port -r -v -b --quiet -x -o outfile` - some flags need to know about what comes next, some don't, and most CLIs let users specify arguments in any order they want. Sound like a fun string to parse?

Luckily, there are many third party modules that makes all of this trivial - one of which is [yargs](https://www.npmjs.com/package/yargs). It's available via `npm`. Use this command from your app's base path:

```
npm i yargs
```

Once you have it, give it a try - it can really be a life-saver. Lets test it with little fun Leap Year checker and Current Time teller

```js
const yargs = require('yargs');

const argv = yargs
    .command('lyr', 'Tells whether an year is leap year or not', {
        year: {
            description: 'the year to check for',
            alias: 'y',
            type: 'number',
        }
    })
    .option('time', {
        alias: 't',
        description: 'Tell the present Time',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.time) {
    console.log('The current time is: ', new Date().toLocaleTimeString());
}

if (argv._.includes('lyr')) {
    const year = argv.year || new Date().getFullYear();
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        console.log(`${year} is a Leap Year`);
    } else {
        console.log(`${year} is NOT a Leap Year`);
    }
}

console.log(argv);
```

The last line was included to let you see how `yargs` handles your arguments. Here's a quick reference:

* `argv.$0` contains the name of the script file which is executed like: `'$0': 'myapp.js'`.
* `argv._` is an array containing each element not attached to an option(or flag) these elements are referred as `commands` in yargs.
* Individual options(flags) become properties of `argv`, such as with `argv.h` and `argv.time`. Note that non-single-letter flags must be passed in as `--flag` like: `node myapp.js --time`.

A summary of elements used in the program:

* **argv**: This is the modified `process.argv` which we have configured with yargs.
* **command()**: This method is used to add commands, their description and options which are specific to these commands only, like in the above code `lyr` is the command and `-y` is lyr specific option: `node myapp.js lyr -y 2016`
* **option()**: This method is used to add global options(flags) which can be accessed by all commands or without any command.
* **help()**: This method is used to display a help dialogue when `--help` option is encountered which contains description of all the `commands` and `options` available.
* **alias()**: This method provides an alias name to an option, like in the above code both `--help` and `-h` triggers the help dialogue.

For more information on yargs and the many, many other things it can do for your command-line arguments, please visit [http://yargs.js.org/docs/](http://yargs.js.org/docs/)
