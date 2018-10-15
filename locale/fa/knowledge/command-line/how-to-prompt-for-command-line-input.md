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

So you've got a little CLI tool, but you want to be able to prompt a user for additional data after the script has started, rather than passing it in as a command line argument or putting it in a file.  To do this, you'll need to listen to STDIN ("standard input", i.e. your keyboard), which Node.js exposes for you as `process.stdin`, a readable stream.

Streams are Node's way of dealing with evented I/O - they're a big topic, and you can read more about them (here).  For now, we're only going to deal with the Stream methods relevant to working with `process.stdin` so as to keep the examples easy.

The first two Readable Stream methods you'll need to know about here are `pause()` and `resume()`.  Not every program needs to care whether or not you're pressing keys at a given moment, so `process.stdin` is paused by default. 

Here's a simple example.  Try the following in a new file:

      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      var util = require('util');
      
      process.stdin.on('data', function (text) {
        console.log('received data:', util.inspect(text));
        if (text === 'quit\n') {
          done();
        }
      });
      
      function done() {
        console.log('Now that process.stdin is paused, there is nothing more to do.');
        process.exit();
      }
      

If all of this sounds complicated, or if you want a higher-level interface to this sort of thing, don't worry - as usual, the Node.js community has come to the rescue.  One particularly friendly module to use for this is Prompt, maintained by Nodejitsu.  It's available on `npm`:

     npm install prompt

Prompt is built to be easy - if your eyes started to glaze over as soon as you saw `Readable Stream`, then this is the section for you.  Compare the following to the example above:

      var prompt = require('prompt');
      
      prompt.start();
      
      prompt.get(['username', 'email'], function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log('  Username: ' + result.username);
        console.log('  Email: ' + result.email);
      });
      
      function onErr(err) {
        console.log(err);
        return 1;
      }

NODE PRO TIP: This short script also demonstrates proper error handling in node - errors are a callback's first argument, and `return` is used with the error handler so that the rest of the function doesn't execute when errors happen.  For more information, look (here).

Prompt also makes it trivial to handle a certain set of recurring properties that one might want to attach. 

      var prompt = require('prompt');

      var properties = [
        {
          name: 'username', 
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'Username must be only letters, spaces, or dashes'
        },
        {
          name: 'password',
          hidden: true
        }
      ];

      prompt.start();

      prompt.get(properties, function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log('  Username: ' + result.username);
        console.log('  Password: ' + result.password);
      });

      function onErr(err) {
        console.log(err);
        return 1;
      }
      
For more information on Prompt, please see [the project's GitHub page](http://github.com/nodejitsu/node-prompt).
