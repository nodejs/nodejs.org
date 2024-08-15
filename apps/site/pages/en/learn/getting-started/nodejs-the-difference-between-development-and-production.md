---
title: Node.js, the difference between development and production
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, RenanTKN, mcollina
---

# Node.js, the difference between development and production

**There is no difference between development and production in Node.js**, i.e., there are no specific settings you need to apply to make Node.js work in a production configuration.
However, a few libraries in the npm registry recognize using the `NODE_ENV` variable and default it to a `development` setting.
Always run your Node.js with the `NODE_ENV=production` set.

A popular way of configuring your application is by using the [twelve factor methodology](https://12factor.net/).

## NODE_ENV in Express

In the wildly popular [express](https://expressjs.com/) framework, setting the `NODE_ENV` to `production` generally ensures that:

- logging is kept to a minimum, essential level
- more caching levels take place to optimize performance

This is usually done by executing the command

```bash
export NODE_ENV=production
```

in the shell, but it's better to put it in your shell configuration file (e.g. `.bash_profile` with the Bash shell) because otherwise the setting does not persist in case of a system restart.

You can also apply the environment variable by prepending it to your application initialization command:

```bash
NODE_ENV=production node app.js
```

For example, in an Express app, you can use this to set different error handlers per environment:

```js
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```

For example [Pug](https://pugjs.org), the templating library used by [Express](https://expressjs.com), compiles in debug mode if `NODE_ENV` is not set to `production`. Express views are compiled in every request in development mode, while in production they are cached. There are many more examples.

**This environment variable is a convention widely used in external libraries, but not within Node.js itself**.

## Why is NODE_ENV considered an antipattern?

An environment is a digital platform or a system where engineers can build, test, _deploy_, and manage software products. Conventionally, there are four stages or types of environments where our application is run:

- Development
- Testing
- Staging
- Production

The fundamental problem of `NODE_ENV` stems from developers combining optimizations and software behavior with the environment their software is running on. The result is code like the following:

```js
if (process.env.NODE_ENV === 'development') {
  // ...
}

if (process.env.NODE_ENV === 'production') {
  // ...
}

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}
```

While this might look harmless, it makes the production and staging environments different, thus making reliable testing impossible. For example a test and thus a functionality of your product could pass when `NODE_ENV` is set to `development` but fail when setting `NODE_ENV` to `production`.
Therefore, setting `NODE_ENV` to anything but `production` is considered an _antipattern_.
