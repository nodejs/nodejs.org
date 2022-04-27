---
title: What are Event Emitters?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - asynchronous
  - event-emitters
difficulty: 2
layout: knowledge-post.hbs
---

In Node.js an event can be described simply as a string with a corresponding callback. An event can be "emitted" (or in other words, the corresponding callback be called) multiple times or you can choose to only listen for the first time it is emitted. So a simple example ran on the node [REPL](/en/knowledge/REPL/how-to-use-nodejs-repl/):

```javascript
var example_emitter = new (require('events').EventEmitter);
example_emitter.on("test", function () { console.log("test"); });
example_emitter.on("print", function (message) { console.log(message); });
example_emitter.emit("test");
example_emitter.emit("print", "message");
example_emitter.emit("unhandled");
```

```
> var example_emitter = new (require('events').EventEmitter);
{}
> example_emitter.on("test", function () { console.log("test"); });
{ _events: { test: [Function] } }
> example_emitter.on("print", function (message) { console.log(message); });
{ _events: { test: [Function], print: [Function] } }
> example_emitter.emit("test");
test //console.log'd
true //return value
> example_emitter.emit("print", "message");
message //console.log'd
true    //return value
> example_emitter.emit("unhandled");
false   //return value
```

This demonstrates all the basic functionality of an EventEmitter. The `on` or `addListener` method (basically the subscription method) allows you to choose the event to watch for and the callback to be called. The `emit` method (the publish method), on the other hand, allows you to "emit" an event, which causes all callbacks registered to the event to 'fire', (get called).

So in the example, we first subscribe to both the `test` and `print` events. Then we emit the `test`, `print`, and `unhandled` events. Since `unhandled` has no callback, it just returns false; the other two run all the attached callbacks and return true.

In the `print` event, note that we pass an extra parameter - all the extra parameters passed to 'emit' get passed to the callback function as arguments.

If you use the method `once` instead of `on`, after the callback is fired, it is removed from the list of callbacks. A handy little function if you want to detect only the first time an event has been emitted.

If you want to remove a specific callback, you can use `removeListener`. If you want to remove all callbacks to a specific event, you can use `removeAllListeners`.

```javascript
var EventEmitter = require('events').EventEmitter,
    ee = new EventEmitter();

function callback() {
  console.log("Callback has been called!");
}

ee.once("event", callback);
ee.emit("event");
ee.emit("event");

ee.on("event", callback);
ee.emit("event");
ee.emit("event");
ee.removeListener("event", callback);
ee.emit("event");

ee.on("event", callback);
ee.emit("event");
ee.removeAllListeners("event");
ee.emit("event");
```

```
> var ee = new (require('events').EventEmitter);
> var callback = function () { console.log("Callbacked!"); }
> ee.once("event", callback);
{ _events: { event: { [Function: g] listener: [Function] } } }
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.emit("event");
false

> ee.on("event", callback);
{ _events: { event: [Function] } }
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.removeListener("event", callback);
{ _events: {} }
> ee.emit("event");
false

> ee.on("event", callback);
{ _events: { event: [Function] } }
> ee.emit("event");
Callbacked! //console.log'd
true
> ee.removeAllListeners("event");
{ _events: { event: null } }
> ee.emit("event");
false
```

NOTE: If you want to create more than 10 listeners on a single event, you will have to make a call to `ee.setMaxListeners(n)` where n is the max numbers of listeners (with zero being unlimited number of listeners). This is used to make sure you aren't accidentally leaking event listeners.
