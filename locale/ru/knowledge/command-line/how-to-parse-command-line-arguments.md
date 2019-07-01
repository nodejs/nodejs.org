---
title: How to parse command line arguments
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---


Passing in arguments via the command line is an extremely basic programming task, and a necessity for anyone trying to write a simple Command-Line Interface (CLI).  In Node.js, as in C and many related environments, all command-line arguments received by the shell are given to the process in an array called `argv` (short for 'argument values').  

Node.js exposes this array for every running process in the form of `process.argv` - let's take a look at an example.  Make a file called `argv.js` and add this line:

     console.log(process.argv);

Now save it, and try the following in your shell:

     $ node argv.js one two three four five
     [ 'node',
       '/home/avian/argvdemo/argv.js',
       'one',
       'two',
       'three',
       'four',
       'five' ]

There you have it - an array containing any arguments you passed in.  Notice the first two elements - `node` and the path to your script.  These will always be present - even if your program takes no arguments of its own, your script's interpreter and path are still considered arguments to the shell you're using.  

Where everyday CLI arguments are concerned, you'll want to skip the first two.  Now try this in `argv.js`:

     var myArgs = process.argv.slice(2);
     console.log('myArgs: ', myArgs);

This yields:

     $ node argv.js one two three four
     myArgs:  [ 'one', 'two', 'three', 'four' ]

Now let's actually do something with the args:

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

JS PRO TIP: Remember to `break` after each `case` - otherwise you'll run the next case too!

Referring to your command-line arguments by array index isn't very clean, and can quickly turn into a nightmare when you start working with flags and the like - imagine you made a server, and it needed a lot of arguments.  Imagine having to deal with something like `myapp -h host -p port -r -v -b --quiet -x -o outfile` - some flags need to know about what comes next, some don't, and most CLIs let users specify arguments in any order they want.  Sound like a fun string to parse?

Luckily, there's a third party module that makes all of this trivial - it's called [Optimist](https://github.com/substack/node-optimist), written by one Mr. James Halliday (aka SubStack).  It's available via `npm`.  Use this command from your app's base path:

     npm install optimist
     
Once you have it, give it a try - it can really be a life-saver.  

     var myArgs = require('optimist').argv,
         help = 'This would be a great place for real help information.';
     
     if ((myArgs.h)||(myArgs.help)) {
       console.log(help);
       process.exit(0);
     }
     
     switch (myArgs._[0]) {
       case 'insult':
         console.log(myArgs.n || myArgs.name, 'smells quite badly.');
         break;
       case 'compliment':
         console.log(myArgs.n || myArgs.name, 'is really cool.');
         break;
       default:
         console.log(help);
     }
     
     console.log('myArgs: ', myArgs);
     
The last line was included to let you see how Optimist handles your arguments.  Here's a quick reference:

- `argv.$0` contains the first two elements of `process.argv` joined together - "node ./myapp.js".
- `argv._` is an array containing each element not attached to a flag.
- Individual flags become properties of `argv`, such as with `myArgs.h` and `myArgs.help`.  Note that non-single-letter flags must be passed in as `--flag`.  

For more information on Optimist and the many, many other things it can do for your command-line arguments, please visit [https://github.com/substack/node-optimist](https://github.com/substack/node-optimist)
