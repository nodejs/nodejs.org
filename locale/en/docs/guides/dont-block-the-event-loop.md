---
title: Don't Block the Event Loop (or the Worker Pool)
layout: docs.hbs
---

# Don't Block the Event Loop (or the Worker Pool)

## Should you read this guide?
If you're writing a server using Node, keep reading.
If you're writing command-line scripts with Node, this guide might still come in handy, but it isn't crucial.

## TL; DR
Node.js runs JavaScript code in the Event Loop and handles I/O in a Worker Pool (the threadpool).
Node scales well, sometimes better than more heavyweight approaches like Apache.
The secret to Node's scalability is that it uses a small number of threads to handle many clients.
If Node can make do with fewer threads, then it can spend more of your system's time and memory working on clients rather than on paying overheads for threads.

Here's a good rule of thumb for keeping your Node server speedy:
*Node is only fast when the work associated with each client at any given time is "small"*.

This applies to work both on the Event Loop and on the Worker Pool.

## Why should I avoid blocking the Event Loop and the Worker Pool?
Node uses a small number of threads to handle many clients.
While a thread is working on behalf of one client, it can't work for any other clients.

This provides two motivations for blocking neither the Event Loop nor the Worker Pool.
Since both the Event Loop and the Workers respond to events, we will refer to these threads generally as *Event Handlers* or *Event-Handler Threads*.
All threads in Node are Event Handlers: one Event Loop and several Workers.

1. Performance: If you regularly perform heavyweight tasks on an Event Handler, the *throughput* (requests/second) of your server will suffer.
2. Security: If it is possible that for certain input you might block an Event Handler, a malicious client might be able to figure out the "evil input", make your code block, and keep you from working on other clients. This would be a Denial of Service attack.

## A quick review of Node's architecture

Node uses the Event-Driven Architecture: it has an Event Loop for orchestration and a Worker Pool for expensive tasks.

## Queues and Cooperative Multitasking
Both the Event Loop and the Worker Pool use *queues*, which are data structures with one or more producers who place items into the queue, and one or more consumers who remove items from the queue.

The Event Loop's queue is full of pending events.
When the Event Loop sees a new event, it invokes its callback, which is JavaScript code that sees your Node application.
The Event Loop is the only consumer of this queue.
The Node runtime produces events for this queue.
Specifically, Node asks libuv to monitor file descriptors using [epoll](http://man7.org/linux/man-pages/man7/epoll.7.html)), and the Event Loop's queue consists of the ready descriptors.

The Worker Pool's queue is full of pending Tasks.
When a Worker sees a new Task, it invokes its callback, which is C++ code that sits on the C++ side of the Node core modules.
The consumers of this queue are the Workers in the Worker Pool, who all compete to work on the next Task.
Most of the time, the Event Loop is the only producer of Tasks for the Worker Pool.

It is crucial to understand that this queue-based approach means that the Event Loop and the Workers rely on [cooperative multitasking](https://en.wikipedia.org/wiki/Cooperative_multitasking).
When the Event Loop begins executing an event's callback, or when a Worker begins to work on a Task, it will work on it until completion.
Everything else in the Event Loop's queue has to wait, and if all of the Workers are busy then all of the pending Tasks have to wait, too.

The principle of cooperative multitasking is another way of saying "Don't Block the Event Loop (or the Worker Pool)."
In a one-thread-per-client system like Apache, if a thread handling one client takes awhile the operating system will interrupt it and give another client a turn.
The operating system ensures that clients are treated fairly.
In Node's cooperative multitasking design, *your application* is put in charge of scheduling client jobs.
This is part of why Node can scale well, but it also means that you are responsible for ensuring fair scheduling.

In other words, Node manages placing pending events in queues, but it does not manage the fair handling of these events.
The next sections talk about how to ensure fair scheduling for the Event Loop and for the Worker Pool.

## Don't block the Event Loop
The Event Loop notices each new client connection and orchestrates the generation of a response.
All incoming requests and outgoing responses pass through the Event Loop.
This means that if the Event Loop spends too long at any point, all current and new clients will not get a turn.

You should make sure you never block the Event Loop.
In other words, each of your JavaScript callbacks should complete quickly.
This of course also applies to your `await`'s, your `Promise.then`'s, and so on.

A good way to ensure this is to reason about the ["computational complexity"](https://en.wikipedia.org/wiki/Time_complexity) of your callbacks.
If your callback takes a constant number of steps no matter what its arguments are, then you'll always give every pending client a fair turn.
If your callback takes a different number of steps depending on its arguments, then you should think about how long the arguments might be.

Example 1: A constant-time callback.

```javascript
app.get('/constant-time', (req, res) => {
  res.sendStatus(200);
});
``` 


Example 2: An `O(n)` callback. This callback will run quickly for small `n` and more slowly for large `n`.

```javascript
app.get('/countToN', (req, res) => {
  let n = req.query.n;

  // n iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    console.log(`Iter {$i}`);
  }

  res.sendStatus(200);
});
``` 

Example 3: A `O(n^2)` callback. This callback will still run quickly for small `n`, but for large `n` it will run much more slowly than the previous `O(n)` example.

```javascript
app.get('/countToN2', (req, res) => {
  let n = req.query.n;

  // n^2 iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`Iter ${i}.${j}`);
    }
  }

  res.sendStatus(200);
});
```

### How careful should you be?
Node uses the Google V8 engine for JavaScript, which is quite fast for many common operations.
However, for complex tasks you should consider bounding the input and rejecting inputs that are too long.
That way, even if your callback is `O(n^3)`, by bounding the input you ensure the callback cannot take more than the worst-case time on the longest acceptable input.
You can then evaluate the worst-case cost of this callback and determine whether its running time is acceptable in your context.

### Blocking the Event Loop: REDOS
One common way to block the Event Loop disastrously is by using a "vulnerable" [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

#### Avoiding vulnerable regular expressions
A regular expression (regexp) matches an input string against a pattern.
We usually think of a regexp match as requiring a single pass through the input string --- `O(n)` time where `n` is the length of the input string.
In many cases, a single pass is indeed all it takes.
Unfortunately, in some cases the regexp match might require an exponential number of trips through the input string --- `O(2^n)` time.
An exponential number of trips means that if the engine requires `x` trips to determine a match, it will need `2*x` trips if we add only one more character to the input string.
Since the number of trips is linearly related to the time required, the effect of this evaluation will be to block the Event Loop.

A *vulnerable regular expression* is one on which your regular expression engine might take exponential time, exposing you to [REDOS](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) on "evil input".
Whether or not your regular expression pattern is vulnerable (i.e. the regexp engine might take exponential time on it) is actually a difficult question to answer, and varies depending on whether you're using Perl, Python, Ruby, Java, JavaScript, etc., but here are some rules of thumb that apply across all of these languages:

1. Avoid nested quantifiers like `(a+)*`. Node's regexp engine can handle some of these quickly, but others are vulnerable.
2. Avoid OR's with overlapping clauses, like `(a|a)*`. Again, these are sometimes-fast.
3. Avoid use backreferences, like `(a.*) \1`. No regexp engine can guarantee evaluating these in linear time.
4. If you're doing a simple string match, use `indexOf` or the local equivalent. It will be cheaper and will never take more than `O(n)`.

If you aren't sure whether your regular expression is vulnerable, remember that Node generally doesn't have trouble reporting a *match* even for a vulnerable regexp and a long input string.
The exponential behavior is triggered when there is a mismatch but Node can't be certain until it tries many paths through the input string.

#### A REDOS example
Here is an example vulnerable regexp exposing its server to REDOS:

```javascript
app.get('/redos-me', (req, res) => {
  let filePath = req.query.filePath;

  // REDOS
  if (fileName.match(/(\/.+)+$/)) {
    console.log('valid path');
  }
  else {
    console.log('invalid path');
  }

  res.sendStatus(200);
});
```

The vulnerable regexp in this example is a (bad!) way to check for a valid path on Linux.
It matches strings that are a sequence of "/"-delimited names, like "/a/b/c".
It is dangerous because it violates rule 1: it has a doubly-nested quantifier.

If a client queries with filePath `///.../\n` (100 /'s followed by a newline character that the regexp's "." won't match), then the Event Loop will take effectively forever, blocking the Event Loop.
This client's REDOS attack causes all other clients not to get a turn until the regexp match finishes.

For this reason, you should be leery of using complex regular expressions to validate user input.

#### Anti-REDOS Resources
There are some tools to check your regexps for safety, like
- [safe-regex](https://github.com/substack/safe-regex)
- [rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/).
However, neither of these will catch all vulnerable regexps.

Another approach is to use a different regexp engine.
You could use the [node-re2](https://github.com/uhop/node-re2) module, which uses Google's blazing-fast [RE2](https://github.com/google/re2) regexp engine.
But be warned, RE2 is not 100% compatible with Node's regexps, so check for regressions if you swap in the node-re2 module to handle your regexps.
And particularly complicated regexps are not supported by node-re2.

If you're trying to match something "obvious", like a URL or a file path, find an example in a [regexp library](http://www.regexlib.com) or use an npm module, e.g. [ip-regex](https://www.npmjs.com/package/ip-regex).

### Blocking the Event Loop: Node core modules

Node exposes synchronous versions of several expensive APIs, including:
- [Encryption](https://nodejs.org/api/crypto.html)
- [Compression](https://nodejs.org/api/zlib.html)
- [File I/O](https://nodejs.org/api/fs.html)
- [Child process interaction](https://nodejs.org/api/child_process.html)

In a server, *you should not use the synchronous APIs from these modules*.
These APIs are expensive, because they involve significant computation or require I/O.
If you execute them on the Event Loop, they will take far longer to complete than a typical JavaScript instruction, blocking the Event Loop.

### Blocking the Event Loop: JSON DOS

`JSON.parse` and `JSON.stringify` are other potentially expensive operations.
While these are `O(n)` in the length of the input, for large `n` they can take surprisingly long.

If your server manipulates JSON objects, particularly those from a client, you should be cautious about the size of the objects or strings you work with on the Event Loop.

Example: JSON blocking. We create an object `obj` of size 2^21 and `JSON.stringify` it, run `indexOf` on the string, and then JSON.parse it. The `JSON.stringify`'d string is 50MB. It takes 0.7 seconds to stringify the object, 0.03 seconds to indexOf on the 50MB string, and 1.3 seconds to parse the string.

```javascript
var obj = { a: 1 };
var niter = 20;

var before, res, took;

for (var i = 0; i < len; i++) {
  obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
}

before = process.hrtime();
res = JSON.stringify(obj);
took = process.hrtime(n);
console.log('JSON.stringify took ' + took);

before = process.hrtime();
res = str.indexOf('nomatch');
took = process.hrtime(n);
console.log('Pure indexof took ' + took);

before = process.hrtime();
res = JSON.parse(str);
took = process.hrtime(n);
console.log('JSON.parse took ' + took);
```

### Complex calculations without blocking the Event Loop
If you want to do complex calculations in JavaScript without blocking the Event Loop, you should *partition* your calculations.

For a simple example, suppose you want to compute the average of the numbers `1` to `n`.

Example 1: Un-partitioned average, costs `O(n)`
```javascript
for (let i = 0; i < n; i++)
  sum += i;
let avg = sum / n;
console.log('avg: ' + avg);
```

Example 2: Partitioned average, each of the `n` asynchronous steps costs `O(1)`.
```javascript
function asyncAvg(n, avgCB) {
  // Save ongoing sum in JS closure.
  var sum = 0;
  function help(i, cb) {
    sum += i;
    if (i == n) {
      cb(sum);
      return;
    }

    // "Asynchronous recursion".
    // Schedule next operation asynchronously.
    setImmediate(help.bind(null, i+1, cb));
  }

  // Start the helper, with CB to call avgCB.
  help(1, function(sum){
      var avg = sum/n;
      avgCB(avg);
  });
}

avg(n, function(avg){
  console.log('avg of 1-n: ' + avg);
});
```

You can apply this principle to array iterations and so forth.

However, think carefully:
- Is Node really a good fit for your project? Node excels for I/O-bound work, but for expensive computation it might not be the best option.
- If you have a lot of computation to do, a better route might be to develop a [C++ addon](https://nodejs.org/api/addons.html) and offload the work to the Worker Pool.
- Alternatively, you could offload the work to a [Child Process](https://nodejs.org/api/child_process.html), although taking this route you create a child for every client, losing the "few threads for many clients" benefit of Node.

## Don't block the Worker Pool
Work in progress.

##  The risks of npm modules
Node developers benefit tremendously from the [npm ecosystem](https://www.npmjs.com/), with hundreds of thousands of modules offering functionality to accelerate your development process.

However, the vast majority of these modules are written by third-party developers and undergo no formal verification process.
A developer using an npm module should be concerned about two things, though the latter is frequently forgotten.
1. Does it honor its APIs?
2. Might its APIs block one of my Event Handlers?
Many modules make no effort to indicate the cost of their APIs, to the detriment of the community.

In some cases you can estimate the cost of the APIs.
The cost of string manipulation isn't hard to fathom.
But in many cases it's unclear how much an API might cost.

*If you are calling an API that might do something expensive, ask the developers to document its cost, or examine the source code yourself (and submit a PR documenting the cost).*

Remember, even if the API is asynchronous, you don't know how much time it might spend on an Event Handler in each of its partitions.
For example, suppose in the `asyncAvg` example given above, each call to the helper function summed *half* of the numbers rather than one of them.
Then this function would still be asynchronous, but the cost of each partition would be `O(n)`, not `O(1)`, making it much less safe to use for arbitrary values of `n`.

## Conclusion
Node has threads called Event Handlers, i.e. the Event Loop and the threadpool Workers, and these execute JS- and C++-callbacks.
Node uses a cooperative multitasking scheduling scheme: an Event Handler *completes* a callbacks before proceeding to the next pending event.
If any callback takes a long time, you have *blocked* the Event Handler running it, thus blocking the Event Loop or a Worker.
If blocking an Event Handler is possible in your Node-based server, it can lead to degraded throughput (clients/second) at best, and complete denial of service at worst.

To write a high-throughput, more DoS-proof web server, you must ensure that on benign and on malicious input, neither your Event Loop nor your Workers will block.