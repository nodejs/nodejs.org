---
title: Service logging in JSON with Bunyan
author: trentmick
date: 2012-03-28T19:25:26.000Z
status: publish
category: module
slug: service-logging-in-json-with-bunyan
layout: blog-post.hbs
---

<div style="float:right;margin:0 0 15px 15px;">
<img title="Bunyan" src="/static/images/blog/module/bunyan.png" alt="Paul Bunyan and Babe the Blue Ox" width="240" height="320"><br>
<a href="http://www.flickr.com/photos/stublag/2876034487">Photo by Paul Carroll</a>
</div>

Service logs are gold, if you can mine them. We scan them for occasional debugging. Perhaps we grep them looking for errors or warnings, or setup an occasional nagios log regex monitor. If that. This is a waste of the best channel for data about a service.

["Log. (Huh) What is it good for. Absolutely ..."](https://www.youtube.com/watch?v=01-2pNCZiNk)

* debugging
* monitors tools that alert operators
* non real-time analysis (business or operational analysis)
* historical analysis

These are what logs are good for. The current state of logging is barely adequate for the first of these. Doing reliable analysis, and even monitoring, of varied ["printf-style" logs](http://journal.paul.querna.org/articles/2011/12/26/log-for-machines-in-json/) is a grueling or hacky task that most either don't bother with, fallback to paying someone else to do (viz. Splunk's great successes), or, for web sites, punt and use the plethora of JavaScript-based web analytics tools.

Let's log in JSON. Let's format log records with a filter _outside_ the app. Let's put more info in log records by not shoehorning into a printf-message. Debuggability can be improved. Monitoring and analysis can _definitely_ be improved. Let's _not_ write another regex-based parser, and use the time we've saved writing tools to collate logs from multiple nodes and services, to query structured logs (from all services, not just web servers), etc.

At [Joyent](http://joyent.com) we use Node.js for running many core services -- loosely coupled through HTTP REST APIs and/or AMQP. In this post I'll draw on experiences from my work on Joyent's [SmartDataCenter product](http://www.joyent.com/products/smartdatacenter/) and observations of [Joyent Cloud](http://www.joyentcloud.com/) operations to suggest some improvements to service logging. I'll show the (open source) **Bunyan logging library and tool** that we're developing to improve the logging toolchain.

## Current State of Log Formatting

```
# apache access log
10.0.1.22 - - [15/Oct/2010:11:46:46 -0700] "GET /favicon.ico HTTP/1.1" 404 209
fe80::6233:4bff:fe29:3173 - - [15/Oct/2010:11:46:58 -0700] "GET / HTTP/1.1" 200 44

# apache error log
[Fri Oct 15 11:46:46 2010] [error] [client 10.0.1.22] File does not exist: /Library/WebServer/Documents/favicon.ico
[Fri Oct 15 11:46:58 2010] [error] [client fe80::6233:4bff:fe29:3173] File does not exist: /Library/WebServer/Documents/favicon.ico

# Mac /var/log/secure.log
Oct 14 09:20:56 banana loginwindow[41]: in pam_sm_authenticate(): Failed to determine Kerberos principal name.
Oct 14 12:32:20 banana com.apple.SecurityServer[25]: UID 501 authenticated as user trentm (UID 501) for right 'system.privilege.admin'

# an internal joyent agent log
[2012-02-07 00:37:11.898] [INFO] AMQPAgent - Publishing success.
[2012-02-07 00:37:11.910] [DEBUG] AMQPAgent - { req_id: '8afb8d99-df8e-4724-8535-3d52adaebf25',
  timestamp: '2012-02-07T00:37:11.898Z',

# typical expressjs log output
[Mon, 21 Nov 2011 20:52:11 GMT] 200 GET /foo (1ms)
Blah, some other unstructured output to from a console.log call.
```

What're we doing here? Five logs at random. Five different date formats. As [Paul Querna points out](http://journal.paul.querna.org/articles/2011/12/26/log-for-machines-in-json/) we haven't improved log parsability in 20 years. Parsability is enemy number one. You can't use your logs until you can parse the records, and faced with the above the inevitable solution is a one-off regular expression.

The current state of the art is various [parsing libs](http://search.cpan.org/~akira/Apache-ParseLog-1.02/ParseLog.pm), [analysis](http://www.webalizer.org/) [tools](http://awstats.sourceforge.net/) and homebrew scripts ranging from grep to Perl, whose scope is limited to a few niches log formats.

## JSON for Logs

`JSON.parse()` solves all that. Let's log in JSON. But it means a change in thinking: **The first-level audience for log files shouldn't be a person, but a machine.**

That is not said lightly. The "Unix Way" of small focused tools lightly coupled with text output is important. JSON is less "text-y" than, e.g., Apache common log format. JSON makes `grep` and `awk` awkward. Using `less` directly on a log is handy.

But not handy enough. That [80's pastel jumpsuit awkwardness](http://bit.ly/wTPlN3) you're feeling isn't the JSON, it's your tools. Time to find a `json` tool -- [json](https://github.com/trentm/json) is one, `bunyan` described below is another one. Time to learn your JSON library instead of your regex library: [JavaScript](https://developer.mozilla.org/en/JSON), [Python](http://docs.python.org/library/json.html), [Ruby](http://flori.github.com/json/), [Java](http://json.org/java/), [Perl](http://search.cpan.org/~makamaka/JSON-2.53/lib/JSON.pm).

Time to burn your log4j Layout classes and move formatting to the tools side. Creating a log message with semantic information and throwing that away to make a string is silly. The win at being able to trivially parse log records is huge. The possibilities at being able to add ad hoc structured information to individual log records is interesting: think program state metrics, think feeding to Splunk, or loggly, think easy audit logs.

## Introducing Bunyan

[Bunyan](https://github.com/trentm/node-bunyan) is **a Node.js module for logging in JSON** and **a `bunyan` CLI tool** to view those logs.

Logging with Bunyan basically looks like this:

```
$ cat hi.js
var Logger = require('bunyan');
var log = new Logger({name: 'hello' /*, ... */});
log.info("hi %s", "paul");
```

And you'll get a log record like this:

```
$ node hi.js
{"name":"hello","hostname":"banana.local","pid":40026,"level":30,"msg":"hi paul","time":"2012-03-28T17:25:37.050Z","v":0}
```

Pipe that through the `bunyan` tool that is part of the "node-bunyan" install to get more readable output:

```
$ node hi.js | ./node_modules/.bin/bunyan       # formatted text output
[2012-02-07T18:50:18.003Z]  INFO: hello/40026 on banana.local: hi paul

$ node hi.js | ./node_modules/.bin/bunyan -j    # indented JSON output
{
  "name": "hello",
  "hostname": "banana.local",
  "pid": 40087,
  "level": 30,
  "msg": "hi paul",
  "time": "2012-03-28T17:26:38.431Z",
  "v": 0
}
```

Bunyan is log4j-like: create a Logger with a name, call `log.info(...)`, etc. However it has no intention of reproducing much of the functionality of log4j. IMO, much of that is overkill for the types of services you'll tend to be writing with Node.js.

## Longer Bunyan Example

Let's walk through a bigger example to show some interesting things in Bunyan. We'll create a very small "Hello API" server using the excellent [restify](https://github.com/mcavage/node-restify) library -- which we used heavily here at [Joyent](http://joyent.com). (Bunyan doesn't require restify at all, you can easily use Bunyan with [Express](http://expressjs.com/) or whatever.)

_You can follow along in [https://github.com/trentm/hello-json-logging](https://github.com/trentm/hello-json-logging) if you like. Note that I'm using the current HEAD of the bunyan and restify trees here, so details might change a bit. Prerequisite: a node 0.6.x installation._

```
git clone https://github.com/trentm/hello-json-logging.git
cd hello-json-logging
make
```

### Bunyan Logger

Our [server](https://github.com/trentm/hello-json-logging/blob/master/server.js) first creates a Bunyan logger:

```javascript
var Logger = require('bunyan');
var log = new Logger({
  name: 'helloapi',
  streams: [
    {
      stream: process.stdout,
      level: 'debug'
    },
    {
      path: 'hello.log',
      level: 'trace'
    }
  ],
  serializers: {
    req: Logger.stdSerializers.req,
    res: restify.bunyan.serializers.response,
  },
});
```

Every Bunyan logger must have a **name**. Unlike log4j, this is not a hierarchical dotted namespace. It is just a name field for the log records.

Every Bunyan logger has one or more **streams**, to which log records are written. Here we've defined two: logging at DEBUG level and above is written to stdout, and logging at TRACE and above is appended to 'hello.log'.

Bunyan has the concept of **serializers**: a registry of functions that know how to convert a JavaScript object for a certain log record field to a nice JSON representation for logging. For example, here we register the `Logger.stdSerializers.req` function to convert HTTP Request objects (using the field name "req") to JSON. More on serializers later.

### Restify Server

Restify 1.x and above has bunyan support baked in. You pass in your Bunyan logger like this:

```javascript
var server = restify.createServer({
  name: 'Hello API',
  log: log   // Pass our logger to restify.
});
```

Our simple API will have a single `GET /hello?name=NAME` endpoint:

```javascript
server.get({path: '/hello', name: 'SayHello'}, function(req, res, next) {
  var caller = req.params.name || 'caller';
  req.log.debug('caller is "%s"', caller);
  res.send({"hello": caller});
  return next();
});
```

If we run that, `node server.js`, and call the endpoint, we get the expected restify response:

```
$ curl -iSs http://0.0.0.0:8080/hello?name=paul
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version
Access-Control-Expose-Headers: X-Api-Version, X-Request-Id, X-Response-Time
Server: Hello API
X-Request-Id: f6aaf942-c60d-4c72-8ddd-bada459db5e3
Access-Control-Allow-Methods: GET
Connection: close
Content-Length: 16
Content-MD5: Xmn3QcFXaIaKw9RPUARGBA==
Content-Type: application/json
Date: Tue, 07 Feb 2012 19:12:35 GMT
X-Response-Time: 4

{"hello":"paul"}
```

### Setup Server Logging

Let's add two things to our server. First, we'll use the `server.pre` to hook into restify's request handling before routing where we'll **log the request**.

```javascript
server.pre(function (request, response, next) {
  request.log.info({req: request}, 'start');        // (1)
  return next();
});
```

This is the first time we've seen this `log.info` style with an object as the first argument. Bunyan logging methods (`log.trace`, `log.debug`, ...) all support an optional **first object argument with extra log record fields**:

```javascript
log.info(<object> fields, <string> msg, ...)
```

Here we pass in the restify Request object, `req`. The "req" serializer we registered above will come into play here, but bear with me.

Remember that we already had this debug log statement in our endpoint handler:

```javascript
req.log.debug('caller is "%s"', caller);            // (2)
```

Second, use the restify server `after` event to **log the response**:

```javascript
server.on('after', function (req, res, route) {
  req.log.info({res: res}, "finished");             // (3)
});
```

### Log Output

Now lets see what log output we get when somebody hits our API's endpoint:

```
$ curl -iSs http://0.0.0.0:8080/hello?name=paul
HTTP/1.1 200 OK
...
X-Request-Id: 9496dfdd-4ec7-4b59-aae7-3fed57aed5ba
...

{"hello":"paul"}
```

Here is the server log:

```
[trentm@banana:~/tm/hello-json-logging]$ node server.js
... intro "listening at" log message elided ...
{"name":"helloapi","hostname":"banana.local","pid":40341,"level":30,"req":{"method":"GET","url":"/hello?name=paul","headers":{"user-agent":"curl/7.19.7 (universal-apple-darwin10.0) libcurl/7.19.7 OpenSSL/0.9.8r zlib/1.2.3","host":"0.0.0.0:8080","accept":"*/*"},"remoteAddress":"127.0.0.1","remotePort":59831},"msg":"start","time":"2012-03-28T17:37:29.506Z","v":0}
{"name":"helloapi","hostname":"banana.local","pid":40341,"route":"SayHello","req_id":"9496dfdd-4ec7-4b59-aae7-3fed57aed5ba","level":20,"msg":"caller is \"paul\"","time":"2012-03-28T17:37:29.507Z","v":0}
{"name":"helloapi","hostname":"banana.local","pid":40341,"route":"SayHello","req_id":"9496dfdd-4ec7-4b59-aae7-3fed57aed5ba","level":30,"res":{"statusCode":200,"headers":{"access-control-allow-origin":"*","access-control-allow-headers":"Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version","access-control-expose-headers":"X-Api-Version, X-Request-Id, X-Response-Time","server":"Hello API","x-request-id":"9496dfdd-4ec7-4b59-aae7-3fed57aed5ba","access-control-allow-methods":"GET","connection":"close","content-length":16,"content-md5":"Xmn3QcFXaIaKw9RPUARGBA==","content-type":"application/json","date":"Wed, 28 Mar 2012 17:37:29 GMT","x-response-time":3}},"msg":"finished","time":"2012-03-28T17:37:29.510Z","v":0}
```

Lets look at each in turn to see what is interesting -- pretty-printed with `node server.js | ./node_modules/.bin/bunyan -j`:

```javascript
{                                                   // (1)
  "name": "helloapi",
  "hostname": "banana.local",
  "pid": 40442,
  "level": 30,
  "req": {
    "method": "GET",
    "url": "/hello?name=paul",
    "headers": {
      "user-agent": "curl/7.19.7 (universal-apple-darwin10.0) libcurl/7.19.7 OpenSSL/0.9.8r zlib/1.2.3",
      "host": "0.0.0.0:8080",
      "accept": "*/*"
    },
    "remoteAddress": "127.0.0.1",
    "remotePort": 59834
  },
  "msg": "start",
  "time": "2012-03-28T17:39:44.880Z",
  "v": 0
}
```

Here we logged the incoming request with `request.log.info({req: request}, 'start')`. The use of the "req" field triggers the ["req" serializer](https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L857-870) [registered at Logger creation](https://github.com/trentm/hello-json-logging/blob/master/server.js#L24).

Next the `req.log.debug` in our handler:

```javascript
{                                                   // (2)
  "name": "helloapi",
  "hostname": "banana.local",
  "pid": 40442,
  "route": "SayHello",
  "req_id": "9496dfdd-4ec7-4b59-aae7-3fed57aed5ba",
  "level": 20,
  "msg": "caller is \"paul\"",
  "time": "2012-03-28T17:39:44.883Z",
  "v": 0
}
```

and the log of response in the "after" event:

```javascript
{                                                   // (3)
  "name": "helloapi",
  "hostname": "banana.local",
  "pid": 40442,
  "route": "SayHello",
  "req_id": "9496dfdd-4ec7-4b59-aae7-3fed57aed5ba",
  "level": 30,
  "res": {
    "statusCode": 200,
    "headers": {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "access-control-expose-headers": "X-Api-Version, X-Request-Id, X-Response-Time",
      "server": "Hello API",
      "x-request-id": "9496dfdd-4ec7-4b59-aae7-3fed57aed5ba",
      "access-control-allow-methods": "GET",
      "connection": "close",
      "content-length": 16,
      "content-md5": "Xmn3QcFXaIaKw9RPUARGBA==",
      "content-type": "application/json",
      "date": "Wed, 28 Mar 2012 17:39:44 GMT",
      "x-response-time": 5
    }
  },
  "msg": "finished",
  "time": "2012-03-28T17:39:44.886Z",
  "v": 0
}
```

Two useful details of note here:

1. The last two log messages include **a "req_id" field** (added to the `req.log` logger by restify). Note that this is the same UUID as the "X-Request-Id" header in the `curl` response. This means that if you use `req.log` for logging in your API handlers you will get an easy way to collate all logging for particular requests.

    If your's is an SOA system with many services, a best practice is to carry that X-Request-Id/req_id through your system to enable collating handling of a single top-level request.

2. The last two log messages include **a "route" field**. This tells you to which handler restify routed the request. While possibly useful for debugging, this can be very helpful for log-based monitoring of endpoints on a server.

Recall that we also setup all logging to go the "hello.log" file. This was set at the TRACE level. Restify will log more detail of its operation at the trace level. See [my "hello.log"](https://gist.github.com/1761772) for an example. The `bunyan` tool does a decent job of [nicely formatting](https://gist.github.com/1761772#file_2.+cat+hello.log+pipe+bunyan) multiline messages and "req"/"res" keys (with color, not shown in the gist).

_This_ is logging you can use effectively.

## Other Tools

Bunyan is just one of many options for logging in Node.js-land. Others (that I know of) supporting JSON logging are [winston](https://github.com/flatiron/winston#readme) and [logmagic](https://github.com/pquerna/node-logmagic/). Paul Querna has [an excellent post on using JSON for logging](http://journal.paul.querna.org/articles/2011/12/26/log-for-machines-in-json/), which shows logmagic usage and also touches on topics like the GELF logging format, log transporting, indexing and searching.

## Final Thoughts

Parsing challenges won't ever completely go away, but it can for your logs if you use JSON. Collating log records across logs from multiple nodes is facilitated by a common "time" field. Correlating logging across multiple services is enabled by carrying a common "req_id" (or equivalent) through all such logs.

Separate log files for a single service is an anti-pattern. The typical Apache example of separate access and error logs is legacy, not an example to follow. A JSON log provides the structure necessary for tooling to easily filter for log records of a particular type.

JSON logs bring possibilities. Feeding to tools like Splunk becomes easy. Ad hoc fields allow for a lightly spec'd comm channel from apps to other services: records with a "metric" could feed to [statsd](http://codeascraft.etsy.com/2011/02/15/measure-anything-measure-everything/), records with a "loggly: true" could feed to loggly.com.

Here I've described a very simple example of restify and bunyan usage for Node.js-based API services with easy JSON logging. Restify provides a powerful framework for robust API services. Bunyan provides a light API for nice JSON logging and the beginnings of tooling to help consume Bunyan JSON logs.

**Update (29-Mar-2012):** Fix styles somewhat for RSS readers.
