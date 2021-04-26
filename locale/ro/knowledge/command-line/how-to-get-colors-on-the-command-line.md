---
title: How to get colors on the command line
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---

When working on the command line, it can be both fun and extremely useful to colorize one's output. To colorize console output, you need to use ANSI escape codes. The module [colors.js](https://www.npmjs.com/package/colors), available on `npm`, provides an extremely easy to use wrapper that makes adding colors a breeze.

First, install it to the directory you'd like to work in.

```bash
npm install colors
```

Now open up a little test script for yourself, and try something like this:

```js
const colors = require('colors');

const stringOne = 'This is a plain string.';
const stringTwo = 'This string is red.'.red;
const stringThree = 'This string is blue.'.blue;
const today = new Date().toLocaleDateString(); // returns today's date in mm/dd/yyyy format

console.log(stringOne.black.bgMagenta);
console.log(stringOne.yellow.bgRed.bold);
console.log(`Today is: ${today}`.black.bgGreen);

console.log(stringTwo);
console.log(stringThree);

console.log(stringTwo.magenta);
console.log(stringThree.grey.bold);
```

There are several things to take note of here - first, the string object has been prototyped, so any color may be added simply by adding the property to the string! It works on string literals, template literals and on variables, as shown at the top of the example above.

Notice, also, from the second pair of `console.log` statements, that once set, a color value persists as part of the string. This is because under the hood, the proper ANSI color tags have been prepended and appended as necessary - anywhere the string gets passed where ANSI color codes are also supported, the color will remain.

The last pair of `console.log` statements are probably the most important. Because of the way `colors.js` and ANSI color codes work, if more than one color property is set on a string, **only the first color property to be set on the string takes effect.** This is because the colors function as 'state shifts' rather than as tags.

Let's look at a more explicit example. If you set the following properties with `colors.js`:

```js
myString.red.blue.green
```

You can think of your terminal saying to itself, "Make this green. No, make this blue. No, make this red. No more color codes now? Red it is, then." The codes are read in the reverse order, and the last/'innermost' is applied. This can be extremely useful if you're using a library that sets its own default colors that you don't like - if you set a color code yourself on the string you pass in to the library, it will supersede the other author's color code(s).

The last thing to note is the final line of the example script. While a color code was set previously, a 'bold' code was not, so the example was made bold, but not given a different color.

### Using `colors` without changing `String.prototype`
Now an instance of `colors` can also be used. Though this approach is slightly less nifty but is beginner friendly and is specially useful if you don't want to touch `String.prototype`. Some example of this are:

```js
const colors = require('colors');

const stringOne = 'This is a plain string.';
const stringTwo = 'This string is red.';
const stringThree = 'This string is blue.';
const today = new Date().toLocaleDateString(); // returns today's date in mm/dd/yyyy format

console.log(colors.bgMagenta.black(stringOne));
console.log(colors.bold.bgRed.yellow(stringOne));
console.log(colors.bgGreen.black(`Today is: ${today}`));

console.log(colors.red(stringTwo));
console.log(colors.blue(stringThree));

console.log(colors.magenta.red(stringTwo));
console.log(colors.bold.grey.black.blue(stringThree));
```

Unlike the `String.prototype` approach, the chained methods on the `colors` instance are executed left to right i.e., the method closest to the string is finally applied. In the last `console.log` you can think of your terminal saying to itself, "Make this grey. Now, make this black. Now, make this blue. No more coloring methods now? Blue it is, then."

With the latest version of `colors.js` you can also define **[Custom Themes](https://www.npmjs.com/package/colors#custom-themes)** in `color.js`, which makes our code more Robust and allows better Encapsulation of data. A nice use case of this maybe:

```js
var colors = require('colors');

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
});

// outputs red text
console.log("this is an error".error);

// outputs text on blue background
console.log("this is a success message".success);
```

One last thing: the colors can look quite different in different terminals - sometimes, `bold` is bold, sometimes it's just a different color. Try it out and see for yourself!

For reference, here's the full list of available `colors.js` properties.

### text colors

* black
* red
* green
* yellow
* blue
* magenta
* cyan
* white
* gray
* grey

### background colors

* bgBlack
* bgRed
* bgGreen
* bgYellow
* bgBlue
* bgMagenta
* bgCyan
* bgWhite

### styles

* reset
* bold
* dim
* italic
* underline
* inverse
* hidden
* strikethrough

### extras

* rainbow
* zebra
* america
* trap
* random
