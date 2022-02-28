---
title: How to store local configuration data
date: '2011-08-26T10:08:50.000Z'
tags:
  - conventions
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

Storing your Node.js application's configuration data is quite simple - every object in JavaScript can be easily rendered as [JSON](/en/knowledge/javascript-conventions/what-is-json/), which in turn is just string data that can be sent or saved any way you'd like. The simplest way to do this involves the built-in `JSON.parse()` and `JSON.stringify()` methods.

Let's take a look at a very simple (and contrived) example. First, to save some very simple data:

```javascript
var fs = require('fs');

var myOptions = {
  name: 'Avian',
  dessert: 'cake'
  flavor: 'chocolate',
  beverage: 'coffee'
};

var data = JSON.stringify(myOptions);

fs.writeFile('./config.json', data, function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Configuration saved successfully.')
});
```

It's really that simple - just `JSON.stringify()` and then save it however you'd like.

Now let's load some configuration data:

```javascript
var fs = require('fs');

var data = fs.readFileSync('./config.json'),
    myObj;

try {
  myObj = JSON.parse(data);
  console.dir(myObj);
}
catch (err) {
  console.log('There has been an error parsing your JSON.')
  console.log(err);
}
```

NODE PRO TIP: Even if you don't like using `try/catch`, this is a place to use it. `JSON.parse` is a very strict JSON parser, and errors are common - most importantly, though, `JSON.parse` uses the `throw` statement rather than giving a callback, so `try/catch` is the only way to guard against the error.

Using the built-in `JSON` methods can take you far, but as with so many other problems you might be looking to solve with Node.js, there is already a solution in Userland that can take you much further. The solution, in this case, is `nconf`. Written by Charlie Robbins, it's a configuration manager for Node.js, supporting in-memory storage, local file storage, as well as support for a `redis` backend, provided in a separate module.

Let's take a look now at how we'd perform some local configuration access with `nconf`. First, you'll need to install it to your project's working directory:

```
npm install nconf
```

After that, the syntax is a breeze. Have a look at an example:

```javascript
var nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();
nconf.set('name', 'Avian');
nconf.set('dessert:name', 'Ice Cream');
nconf.set('dessert:flavor', 'chocolate');

console.log(nconf.get('dessert'));

nconf.save(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Configuration saved successfully.');
});
```

The only tricky thing to notice here is the delimiter - ':'. When accessing nested properties with `nconf`, a colon is used to delimit the namespaces of key names. If a specific sub-key is not provided, the whole object is set or returned.

When using `nconf` to store your configuration data to a file, `nconf.save()` and `nconf.load()` are the only times that any actual file interaction will happen. All other access is performed on an in-memory copy of your data, which will not persist without a call to `nconf.save()`. Similarly, if you're trying to bring back configuration data from the last time your application ran, it will not exist in memory without a call to `nconf.load()`, as shown above.
