---
date: '2016-12-03T14:41:04.442Z'
category: announcements
title: Node.js v7 has updated V8 to 5.4
layout: blog-post.hbs
author: Michaël Zasso
---

With the release of Node.js 7.0.0, the V8 JavaScript engine has been upgraded from 5.1
to its latest stable version, 5.4.
It brings in new language features and increased performance.

## New ECMAScript features

### Exponentiation operator (ES2016)

- [Proposal](https://github.com/rwaldron/exponentiation-operator)
- [Spec](https://www.ecma-international.org/ecma-262/7.0/#sec-exp-operator)

The `**` operator can now be used to raise the left-hand side to the power of the right-hand side. Example:

```javascript
const maxInt = 2 ** 32 - 1; // Equivalent to: Math.pow(2, 32) - 1
```

### Object.values / Object.entries (ES2017)

- [Proposal](https://github.com/tc39/proposal-object-values-entries)
- [Spec (draft)](https://tc39.github.io/ecma262/#sec-object.values)

Complementing `Object.keys`, those two new static methods return respectively an Array of enumerable own property values
or entries (an entry being an array with two elements: key and value). Example:

```javascript
const obj = {
  x: 0,
  y: 100,
};

const keys = Object.keys(obj); // ['x', 'y']
const values = Object.values(obj); // [0, 100]
const entries = Object.entries(obj); // [['x', 0], ['y', 100]]
```

### Object.getOwnPropertyDescriptors (ES2017)

- [Proposal](https://github.com/tc39/proposal-object-getownpropertydescriptors)
- [Spec (draft)](https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors)

Returns all own property descriptors of an Object in a new Object, mapped by their respective key. Example:

```javascript
const obj = {
  x: 0,
  y: 100,
};

const descriptors = Object.getOwnPropertyDescriptors(obj);
/*
{ x: {value: 0, writable: true, enumerable: true, configurable: true},
  y: {value: 100, writable: true, enumerable: true, configurable: true} }
*/
```

## Performance and memory optimizations

### From [V8 5.2](https://v8project.blogspot.ch/2016/06/release-52.html)

Improvement of JavaScript built-ins, including:

- `Array` operations like the `isArray` method.
- The `in` operator.
- `Function.prototype.bind`.

### From [V8 5.3](https://v8project.blogspot.ch/2016/07/v8-release-53.html)

- The new Ignition interpreter is now feature complete and can be tested with the flag `--ignition`. Read the [blog post](https://v8project.blogspot.ch/2016/08/firing-up-ignition-interpreter.html) from V8's team for more information.
- The garbage collector has been improved and full garbage collection pause times can be reduced up to 25%.
- Improvement of ES6 Promise performance.

### From [V8 5.4](https://v8project.blogspot.ch/2016/09/v8-release-54.html)

- Reduced on-heap peak memory consumption on low-memory devices up to 40%.
- Optimizations in V8's parser allowed to reduce off-heap peak memory consumption up to 20% and improve startup performance.
