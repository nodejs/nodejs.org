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
