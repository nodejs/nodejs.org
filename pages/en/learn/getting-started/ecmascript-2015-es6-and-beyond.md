---
title: ECMAScript 2015 (ES6) and beyond
layout: learn.hbs
authors: ovflowd
---

# ECMAScript 2015 (ES6) and beyond

Node.js is built against modern versions of [V8](https://v8.dev/). By keeping up-to-date with the latest releases of this engine, we ensure new features from the [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) are brought to Node.js developers in a timely manner, as well as continued performance and stability improvements.

All ECMAScript 2015 (ES6) features are split into three groups for **shipping**, **staged**, and **in progress** features:

- All **shipping** features, which V8 considers stable, are turned **on by default on Node.js** and do **NOT** require any kind of runtime flag.
- **Staged** features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: `--harmony`.
- **In progress** features can be activated individually by their respective harmony flag, although this is highly discouraged unless for testing purposes. Note: these flags are exposed by V8 and will potentially change without any deprecation notice.

### Which features ship with which Node.js version by default?

The website [node.green](https://node.green/) provides an excellent overview over supported ECMAScript features in various versions of Node.js, based on kangax's compat-table.

### Which features are in progress?

New features are constantly being added to the V8 engine. Generally speaking, expect them to land on a future Node.js release, although timing is unknown.

You may list all the _in progress_ features available on each Node.js release by grepping through the `--v8-options` argument. Please note that these are incomplete and possibly broken features of V8, so use them at your own risk:

```bash
node --v8-options | grep "in progress"
```

### I have my infrastructure set up to leverage the --harmony flag. Should I remove it?

The current behavior of the `--harmony` flag on Node.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on Node.js. If you keep this enabled, you should be prepared for further Node.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.

### How do I find which version of V8 ships with a particular version of Node.js?

Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version:

```bash
node -p process.versions.v8
```
