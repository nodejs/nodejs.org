---
title: ES6
layout: docs.hbs
---
# ES6 in Node.js

Node.js is built against modern versions of [V8](https://developers.google.com/v8/). By keeping up-to-date with the latest releases of this engine, we ensure new features from the [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) are brought to Node.js developers in a timely manner, as well as continued performance and stability improvements.

All ES6 features are split into three groups for **shipping**, **staged**, and **in progress** features:

* All **shipping** features, which V8 considers stable, are turned **on by default on Node.js** and do **NOT** require any kind of runtime flag.
* **Staged** features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: `--es_staging` (or its synonym, `--harmony`).
* **In progress** features can be activated individually by their respective harmony flag (e.g. `--harmony_destructuring`), although this is highly discouraged unless for testing purposes.

## Which ES6 features ship with Node.js by default (no runtime flag required)?


* Block scoping

    * [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) (strict mode only)

    * [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

    * `function`-in-blocks (strict mode only)

    >As of v8 3.31.74.1, block-scoped declarations are [intentionally implemented with a non-compliant limitation to strict mode code](https://groups.google.com/forum/#!topic/v8-users/3UXNCkAU8Es). Developers should be aware that this will change as v8 continues towards ES6 specification compliance.

* [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) (strict mode only)

* Collections

    * [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    * [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

    * [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    * [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

* [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)

* [Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

* [Binary and Octal literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Numeric_literals)

* [Object literal extensions](https://github.com/lukehoban/es6features#enhanced-object-literals) (shorthand properties and methods)

* [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

* [New String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla#Additions_to_the_String_object)

* [Symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

* [Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)

* [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

You can view a more detailed list, including a comparison with other engines, on the [compat-table](https://kangax.github.io/compat-table/es6/) project page.

## Which ES6 features are behind the --es_staging flag?

* [`Symbol.toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) (user-definable results for `Object.prototype.toString`, behind flag `--harmony_tostring`)

## Which ES6 features are in progress?

New features are constantly being added to the V8 engine. Generally speaking, expect them to land on a future Node.js release, although timing is unknown.

You may list all the *in progress* features available on each Node.js release by grepping through the `--v8-options` argument. Please note that these are incomplete and possibly broken features of V8, so use them at your own risk:

```bash
node --v8-options | grep "in progress"
```

## I have my infrastructure set up to leverage the --harmony flag. Should I remove it?

The current behaviour of the `--harmony` flag on Node.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on Node.js. If you keep this enabled, you should be prepared for further Node.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.

## How do I find which version of V8 ships with a particular version of Node.js?

Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version:

```bash
node -p process.versions.v8
```
