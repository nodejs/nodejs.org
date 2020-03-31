---
title: How to log in Node.js
date: '2011-08-26T10:08:50.000Z'
tags:
  - logging
difficulty: 2
layout: knowledge-post.hbs
---

Many processes, including most servers, write logs in one form or another. Reasons for logging include debugging, keeping track of users and resource usage, and reporting application state.

### Simple Logging

The simplest form of logging involves simply using `console.log` or one of the other standard output methods. In this approach, any information is printed to `stdout` where it can either be read by the developer as it occurs, or, for example, redirected to a log file.

```javascript
console.log('Web Server started, waiting for connections...');
```

Because it's so simple, console.log is by far the most common way of logging data in Node.js.

### Custom Logging

Logging only with functions such as `console.log` is not ideal for every use case, however. Many applications have some sort of 'debugging mode', for example, that shows the user much more output than normal execution. To do something like this, a better idea is to write your own simple logger, and use it instead of `console.log`.

Here is an example of a basic custom logging module with configurable debugging levels.

```javascript
var logger = exports;
logger.debugLevel = 'warn';
logger.log = function(level, message) {
  var levels = ['info', 'warn', 'error'];
  if (levels.indexOf(level) <= levels.indexOf(logger.debugLevel) ) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    };
    console.log(level+': '+message);
  }
}
```

Usage would then look like the following:

```javascript
var logger = require('./logger');
logger.debugLevel = 'warn';
logger.log('info', 'Everything started properly.');
logger.log('warn', 'Running out of memory...');
logger.log('error', { error: 'flagrant'});
```

Because `logger.debugLevel` was set to `warn`, the warning message and the error would both be displayed, but the `info` message would not be.

The advantage here is that the behavior of our logging mechanisms can now be modified and controlled from a central part of our code. In this case, logging levels were added, and messages are converted to JSON if they aren't already in string form. There is a lot more that could be done here - saving logs to a file, pushing them to a database, setting custom colors and formatting the output - but by the time you want that much functionality from your custom logging function, it might be time to use an already-existing library.

### Winston - multi-transport logging made easy

[Winston](https://github.com/indexzero/winston) is a multi-transport, asynchronous logging library for Node.js. It is conceptually similar to our custom logger, but comes with a wide variety of useful features and functionality baked in. In addition, `winston` is battle-hardened by internal use at Nodejitsu!

Here is an example of setting up a `winston` logger. This example includes most of the transports one could ever possibly want - please note that most use cases will only warrant a few of these.

```javascript
var winston = require('winston');

require('winston-riak').Riak;
require('winston-mongo').Mongo;
require('winston-couchdb').Couchdb;

var logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'path/to/all-logs.log' }),
    new winston.transports.Couchdb({ 'host': 'localhost', 'db': 'logs' }),
    new winston.transports.Riak({ bucket: 'logs' }),
    new winston.transports.MongoDB({ db: 'db', level: 'info'})
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'path/to/exceptions.log' })
  ]
});
```

Here, we have instantiated a new `winston` logger, and provided a number of logging transports. Winston has built-in support for configurable logging levels, and provides alias methods for each configured logging level. For example, `winston.warn(x)` is an alias for `winston.log('warn', x)`. Thus, the following:

```javascript
logger.warn('Hull Breach Detected on Deck 7!');
```

Would output to the screen:

```
warn: Hull Breach Detected on Deck 7!
```

Because of the file transport we set up, winston also logged the warning to 'somefile.log'. After the `logger.warn` call we just used, the log file, `somefile.log`, would contain the following output:

```
$ cat somefile.log
{'level':'warn','message':'Hull Breach Detected on Deck 7!'}
```

Note that winston's file logger formats the logs differently for file logging (JSON in this case) than it does for the console transport.

Winston also supports logging to Riak, CouchDB, MongoDB and [many other transports](https://github.com/winstonjs/winston/blob/master/docs/transports.md). The `logger.warn` call we used before also put the same message into each database, according to the options we gave to each transport.

For further information, please see the [thorough documentation for Winston.](https://github.com/indexzero/winston).
