---
title: Using ECMA5 in Node.js
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - builtin
  - globals
difficulty: 2
layout: knowledge-post.hbs
---

When developing in the browser there are many wonderful built in JavaScript functions that we can't use because certain browsers don't implement them. As a result, most developers never use them. In Node, however we can assume that everyone has the same JavaScript implementation and as such can use these wonderful functions and not implement them over and over in our own libraries.

The following is a list of some interesting api bits that aren't considered safe to use in a web setting but are built in to node's V8 engine.

Note that V8 implements all of ECMA 3rd edition and parts of the new stuff in the [ECMA 5th edition](http://www.ecma-international.org/publications/standards/Ecma-262.htm)

## Syntax extensions

* `var obj = { get a() { return "something" }, set a() { "do nothing" } }` getter/setter syntax

## Array

* `Array.isArray(array)` - Returns true if the passed argument is an array.

## Array.prototype

* `indexOf(value)` - Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
* `lastIndexOf(value)` - Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
* `filter(callback)` - Creates a new array with all of the elements of this array for which the provided filtering function returns true.
* `forEach(callback)` - Calls a function for each element in the array.
* `every(callback)` - Returns true if every element in this array satisfies the provided testing function.
* `map(callback)` - Creates a new array with the results of calling a provided function on every element in this array.
* `some(callback)` - Returns true if at least one element in this array satisfies the provided testing function.
* `reduce(callback[, initialValue])` - Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.
* `reduceRight(callback[, initialValue])` - Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.

## Date

* `Date.now()` - Returns the numeric value corresponding to the current time.

## Date.prototype

* `toISOString()` -

## Object

* `Object.create(proto, props)` - Creates a new object whose prototype is the passed in parent object and whose properties are those specified by props.
* `Object.keys(obj)` - Returns a list of the ownProperties of an object that are enumerable.
* `Object.defineProperty(obj, prop, desc)` - Defines a property on an object with the given descriptor
* `Object.defineProperties(obj, props)` - Adds own properties and/or updates the attributes of existing own properties of an object
* `Object.getOwnPropertyNames(obj)` - Returns a list of the ownProperties of an object including ones that are not enumerable.
* `Object.getPrototypeOf(obj)` - Returns the prototype of an object.
* `Object.getOwnPropertyDescriptor(obj, property)` - Returns an object with keys describing the description of a property (value, writable, enumerable, configurable)
* `Object.preventExtensions(obj)` - Prevents any new properties from being added to the given object.
* `Object.isExtensible(obj)` - Checks if Object.preventExtensions() has been called on this object.
* `Object.seal(obj)` - Prevents code from adding or deleting properties, or changing the descriptors of any property on an object. Property values can be changed however.
* `Object.isSealed(obj)` - Checks if Object.seal() has been called on this object.
* `Object.freeze(obj)` - Same as Object.seal, except property values cannot be changed.
* `Object.isFrozen(obj)` - Checks if Object.freeze() has been called on this object.

## Object.prototype

* `__defineGetter__(name, callback)` - (Mozilla extension, not ECMAScript 5) Associates a function with a property that, when accessed, executes that function and returns its return value.
* `__defineSetter__(name, callback)` - (Mozilla extension, not ECMAScript 5) Associates a function with a property that, when set, executes that function which modifies the property.
* `__lookupGetter__(name)` - (Mozilla extension, not ECMAScript 5) Returns the function associated with the specified property by the \_\_defineGetter\_\_ method.
* `__lookupSetter__(name)` - (Mozilla extension, not ECMAScript 5) Returns the function associated with the specified property by the \_\_defineSetter\_\_ method.
* `isPrototypeOf(obj)` - (EcmaScript 3 and 5) Returns true if `this` is a prototype of the passed in object.

## Function.prototype

* `bind(thisArg[, arg1[, argN]])` - Sets the value of 'this' inside the function to always be the value of thisArg when the function is called. Optionally, function arguments can be specified (arg1, arg2, etc) that will automatically be prepended to the argument list whenever this function is called.

## JSON

* `JSON.stringify(obj [, replacer [, space]])` - Takes any serializable object and returns the JSON representation as a string [More info](https://developer.mozilla.org/En/Using_JSON_in_Firefox)
* `JSON.parse(string)` - Takes a well formed JSON string and returns the corresponding JavaScript object.

## String.prototype

* `trim()` - Trims whitespace from both ends of the string
* `trimRight()` - Trims whitespace from the right side of the string
* `trimLeft()` - Trims whitespace from the left side of the string

## Property Descriptor Defaults

* `value` - undefined
* `get` - undefined
* `set` - undefined
* `writable` - false
* `enumerable` - false
* `configurable` - false

# Missing features

* `Object.__noSuchMethod__` (Mozilla extension, not ECMAScript 5)
* `"use strict";` syntax extension ([V8 issue](http://code.google.com/p/v8/issues/detail?id=919))
