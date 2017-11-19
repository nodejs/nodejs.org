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

This provides two motivations for not blocking the Event Loop or the Worker Pool.

1. Performance: If you regularly perform heavyweight tasks on the Event Loop or the Worker Pool, the *throughput* (requests/second) of your server will suffer.
2. Security: If it's *possible* that for certain input you might block the Event Loop or the Worker Pool, a malicious client might be able to figure out the "evil input", make your code block, and keep you from working on other clients. This is a Denial of Service attack.

## A quick review of Node's architecture

Node uses the Event-Driven Architecture: it has an Event Loop for orchestration and a Worker Pool for expensive stuff.

## Queues
Both the Event Loop and the Worker Pool use queues.
The Event Loop's queue is full of pending events.
The Event Loop is the only consumer of this queue.
The Node runtime produces events for this queue.
Specifically, Node asks libuv to monitor file descriptors using [epoll](http://man7.org/linux/man-pages/man7/epoll.7.html)), and the Event Loop's queue consists of the ready descriptors.

The Worker Pool's queue is full of pending Tasks.
The consumers of this queue are the Workers in the Worker Pool, who all compete to work on the next Task.
Most of the time, the Event Loop is the only producer of Tasks for the Worker Pool.

It is crucial to understand that both the Event Loop and the Workers use a [cooperative multitasking](https://en.wikipedia.org/wiki/Cooperative_multitasking) scheme.
This means that when the Event Loop begins executing an event's callback, or when a Worker begins to work on a Task, it will work on it until completion.
Everything else in the Event Loop's queue has to wait, and if all of the Workers are busy then all of the pending Tasks have to wait, too.

## Don't block the Event Loop
The Event Loop notices each new client connection and orchestrates the generation of a response.
All incoming requests and outgoing responses pass through the Event Loop.
This means that if the Event Loop spends too long at any point, all current and new clients will not get a turn.

So, you should definitely make sure you never block the Event Loop.
In other words, each of your callbacks should complete quickly.
This of course also applies to your await's, your Promise.then's, etc..

A good way to think about this is to check the ["computational complexity"](https://en.wikipedia.org/wiki/Time_complexity) of your callbacks.
If your callback takes a constant number of steps no matter what its arguments are, then you'll always give every pending client a fair turn.
If your callback takes a different number of steps depending on its arguments, then you should think about how long the arguments might be.

For example, a callback like the following will run quickly for small `n` and more slowly for large `n`.

```javascript
app.get('/countToN', (req, res) => {
  let N = req.query.N;

  // N iterations before giving someone else a turn
  for (let i = 0; i < N; i++) {
    console.log(`Iter {$i}`);
  }

  res.sendStatus(200);
});
``` 

This next example is `O(n^2)`: for N=5, it will take 25 steps; for N=100, it will take 100\*100 steps.

```javascript
app.get('/countToN2', (req, res) => {
  let N = req.query.N;

  // N^2 iterations before giving someone else a turn
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      console.log(`Iter ${i}.${j}`);
    }
  }

  res.sendStatus(200);
});
```

Node uses the Google V8 engine for JavaScript, which is fast even for relatively complex operations.
However, if you might be sorting very large arrays (`O(nlogn)`) or iterating through double for-loops (`O(n^2)`), you should think about bounding the input and rejecting inputs that are too long.

### Blocking the Event Loop: REDOS
One common way to block the Event Loop is by using a vulnerable [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

A regular expression matches an input string against a pattern.
We usually think of a regexp match as requiring a single pass through the input string --- `O(n)` time.
In many cases, this is indeed all it takes.
Unfortunately, in some cases the regexp match might require an exponential number of trips through the input string --- `O(2^n)` time.
This means that if the engine takes `x` seconds to determine a match, it will take `2*x` seconds if we add only one more character to the input string.

A *vulnerable regular expression* is one on which your regular expression engine might take exponential time, exposing you to [REDOS](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) on "evil input".
Whether or not your regular expression is vulnerable (i.e. the regexp engine might take exponential time on it) is actually a difficult question to answer, but here are some rules of thumb:

1. Avoid nested quantifiers like `(a+)*`. Node's regexp engine can handle these quickly sometimes but not others.
2. Avoid OR's with overlapping clauses, like `(a|a)*`. Again, these are sometimes-fast.
3. Avoid use backreferences, like `(a.*) \1`. No regexp engine can guarantee evaluating these in linear time.
4. If you're doing a simple string match, just use `indexOf`. It will be cheaper.

In addition, Node generally doesn't have trouble reporting a *match* even for a vulnerable regexp and a long input string.
The exponential behavior is triggered when there is a mismatch but Node can't be certain until it tries many divisions of the input string.

Here is an example vulnerable regexp exposing this server to REDOS:

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

The vulnerable regexp is a (bad!) way to check for a valid path on Linux: a sequence of "/"-delimited names.
Note that it has a doubly-nested quantifier.

If a client queries with filePath `///.../\n` (100 /'s followed by a newline character that the regexp's "." won't match), then the Event Loop will block evaluating this regexp, effectively forever.
This REDOS attack causes all other clients not to get a turn until the regexp match finishes.

For this reason, you should be leery of using complex regular expressions to validate user input.

There are some tools to check your regexps for safety, like
- [safe-regex](https://github.com/substack/safe-regex). 
- [rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/)
However, neither of these will catch all vulnerable regexps.

A safer alternative is the [node-re2](https://github.com/uhop/node-re2) project, which uses Google's blazing-fast [RE2](https://github.com/google/re2) regexp engine. But be warned, RE2 is not 100% compatible with Node's regexps, so check for regressions if you swap in the node-re2 module to handle your regexps. And really complicated regexps may not be supported by node-re2.

If you're trying to match something "obvious", like a URL or a file path, find an example in a [regexp library](http://www.regexlib.com) or use an npm module, e.g. [ip-regex](https://www.npmjs.com/package/ip-regex).

### Blocking the Event Loop: JSON DOS

TODO I'm pretty sure a complex JSON query is also problematic.

### Blocking the Event Loop: Node core modules

Node exposes synchronous versions of several expensive APIs, including:
- [Encryption](https://nodejs.org/api/crypto.html)
- [Compression](https://nodejs.org/api/zlib.html)
- [File I/O](https://nodejs.org/api/fs.html)
- [Child process interaction](https://nodejs.org/api/child_process.html)

In a server, *you should not use the synchronous APIs from these modules*.
These APIs are expensive, because they involve significant computation or require I/O.
If you execute them on the Event Loop, they will take far longer to complete than a typical JavaScript instruction, blocking the Event Loop.

### I understand I shouldn't block the Event Loop. How do I do something "complicated" in Node?
OK, so your callback gets some input and you want to do something fancy with it. Maybe you're applying a function to every item in an array, and you're not sure how much that function costs.

Here are some questions you should ask yourself:
- Is Node really a good fit for my project? Node excels for I/O-bound work, but for expensive computation it might not be the best option.
- Do I feel confident enough in my C++ skills to write a [C++ addon](https://nodejs.org/api/addons.html)? If so, consider offloading this work to the Worker Pool. But see the next section for more on that.
- Would it be better to ask a [Child Process](https://nodejs.org/api/child_process.html) to do this for me?

If you're in a hurry, though, here's a two-step way to handle this situation:
1. Do part of your task, and then...
2. defer the rest until later, e.g. with `setImmediate`.

This gives all of the other pending clients a turn.
It's pretty easy to accomplish this by sticking whatever state you're carrying around in a closure or an object.
And you might want to add a TODO to revisit this section of your code later.

## Don't block the Worker Pool
Work in progress.

## What about all of these npm modules I use?

If you're like everybody else and you rely a lot on npm modules to process your input, you might not know how expensive these APIs are. 

Some APIs are pretty simple, e.g. APIs that manipulate strings.
But if the API you're calling does something complicated, ask the developers to document how expensive it is, or check out the source code yourself.
Remember, even if the API is asynchronous, you don't know how much time it might spend on the Event Loop in any given step.
If it partitions its work nicely as discussed above, it's OK, but if it does large chunks of work in each step than you might be in trouble.

## Conclusion
I hope you learned a lot about the Node architecture, and how to avoid blocking the Event Loop and the Worker Pool.
These are important concepts if you want to write a high-performance, more DoS-proof Node server.
