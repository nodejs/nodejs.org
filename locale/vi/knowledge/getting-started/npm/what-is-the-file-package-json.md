---
title: What is the file `package.json`?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - conventions
  - core
difficulty: 2
layout: knowledge-post.hbs
---

All npm packages contain a file, usually in the project root, called `package.json` - this file holds various metadata relevant to the project. This file is used to give information to `npm` that allows it to identify the project as well as handle the project's dependencies. It can also contain other metadata such as a project description, the version of the project in a particular distribution, license information, even configuration data - all of which can be vital to both `npm` and to the end users of the package. The `package.json` file is normally located at the root directory of a Node.js project.

Here is a minimal `package.json`:

```json
{
  "name" : "barebones",
  "version" : "0.0.0",
}
```

The `name` field should explain itself: this is the name of your project. The `version` field is used by npm to make sure the right version of the package is being installed. Generally, it takes the form of `major.minor.patch` where `major`, `minor`, and `patch` are integers which increase after each new release. For more details, look at this spec: http://semver.org .

For a more complete package.json, we can check out `underscore`:

```json
{
  "name" : "underscore",
  "description" : "JavaScript's functional programming helper library.",
  "homepage" : "http://documentcloud.github.com/underscore/",
  "keywords" : ["util", "functional", "server", "client", "browser"],
  "author" : "Jeremy Ashkenas <jeremy@documentcloud.org>",
  "contributors" : [],
  "dependencies" : [],
  "repository" : {"type": "git", "url": "git://github.com/documentcloud/underscore.git"},
  "main" : "underscore.js",
  "version" : "1.1.6"
}
```

As you can see, there are fields for the `description` and `keywords` of your projects. This allows people who find your project understand what it is in just a few words. The `author`, `contributors`, `homepage` and `repository` fields can all be used to credit the people who contributed to the project, show how to contact the author/maintainer, and give links for additional references.

The file listed in the `main` field is the main entry point for the library; when someone runs `require(<library name>)`, require resolves this call to `require(<package.json:main>)`.

Finally, the `dependencies` field is used to list all the dependencies of your project that are available on `npm`. When someone installs your project through `npm`, all the dependencies listed will be installed as well. Additionally, if someone runs `npm install` in the root directory of your project, it will install all the dependencies to `./node_modules`.

It is also possible to add a `devDependencies` field to your `package.json` - these are dependencies not required for normal operation, but required/recommended if you want to patch or modify the project. If you built your unit tests using a testing framework, for example, it would be appropriate to put the testing framework you used in your `devDependencies` field. To install a project's `devDependencies`, simply pass the `--dev` option when you use `npm install`.

For even more options, you can look through the [online docs](https://docs.npmjs.com/files/package.json) or run `npm help json`.
