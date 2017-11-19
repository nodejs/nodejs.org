---
title: Don't Block the Event Loop (or the Worker Pool)
layout: docs.hbs
---

# Don't Block the Event Loop (or the Worker Pool)

## Should you read this guide?
If you're writing a server using Node, keep reading.
If you're writing command-line scripts with Node, this guide might still come in handy, but it isn't crucial.

## TL; DR
Node.js runs JavaScript code in the Event Loop and handles I/O in a maaaagic Worker Pool (the threadpool).
Node scales well, sometimes better than more heavyweight approaches like Apache.
The secret to Node's scalability is that it uses a small number of threads to handle many clients.
Threads = overhead, so if Node can make do with fewer threads, then it can spend more of your system's time and memory working on clients rather than on bookkeeping.

Here's a good rule of thumb for keeping your Node server speedy:
*Node is only fast when the work associated with each client at any given time is "small"*.

How do you keep the work associated with each client "small"?
1. Don't block the Event Loop. It's *really* important that your callbacks complete quickly.
2. Don't block the Worker Pool. The Worker Pool isn't as magic as I said. Don't put huge tasks there.

If you want tips on how to avoid blocking the Event Loop and the Worker Pool, keep reading.

## Why should I avoid blocking the Event Loop and the Worker Pool?
Node uses a small number of threads to handle many clients.
While a thread is working on behalf of one client, it can't work for any other clients.
You should care because (1) performance = good, and (2) denial of service = bad.

1. If you regularly perform heavyweight tasks on the Event Loop or the Worker Pool, the *throughput* (requests/second) of your server will suffer. Bad performance, sad clients.
2. If it's *possible* that for certain input you might block the Event Loop or the Worker Pool, a malicious client might be able to figure out the "evil input", make your code block, and keep you from working on other clients. This is a Denial of Service attack. Sad clients again!

## Who should read this?

You should definitely read this guide if you agree with any of the following statements:
- "I did not know that Node has threads."
- "I am uncomfortable talking about threads."
- "I know Node has a threadpool but I don't know much about it."
- "Regular expressions can get a bit complicated, but they are a great way to validate user input."
- "`fs.readFile()` is convenient."
- "File I/O is pretty fast."
- "I don't know what `O(nlogn)` means."

In short, this guide is intended for anyone who's a bit fuzzy about Node internals, or who doesn't have much formal computer science training.

## A quick review of Node's architecture

Node uses the Event-Driven Architecture: it has an Event Loop for orchestration and a Worker Pool for expensive stuff.

### What is the Event Loop?
Node has an Event Loop that responds to inputs with callbacks.
Node's Event Loop is implemented as a single thread that uses JavaScript callbacks.

### What is the Worker Pool?
Because one thread can't do everything, Node also has a bunch of helper threads (Workers) that live in the Worker Pool.
When you call one of Node's expensive framework APIs (file system, DNS, cryptography, compression), Node says it will finish this later and "call you back".
Under the hood, the Event Loop asks one of its Workers to work on this Task.
The Worker to which this expensive Task is assigned dutifully works on it until it is finished, and then it lets the Event Loop know that it is done.
The Event Loop then calls your callback with whatever the Worker produced -- the contents of a file, the IP address of "www.google.com", and so on.

## Don't block the Event Loop
The Event Loop notices each new client connection and orchestrates the generation of a response.
All incoming requests and outgoing responses pass through the Event Loop.
This means that if the Event Loop spends too long at any point, all current and new clients will not get a turn.

So, you should definitely make sure you never block the Event Loop.
In other words, each of your callbacks should complete quickly.
This of course also applies to your await's, your Promise.then's, etc..

A good way to think about this is to check the ["computational complexity"](https://en.wikipedia.org/wiki/Time_complexity) of your callbacks.
If your callback takes a constant number of steps no matter what its arguments are, then you're definitely good to go.
If your callback takes a different number of steps depending on its arguments, then you should think about how long the arguments might be.
For example, code like `for (let i = 0; i < n; i++)` will run quickly for small `n` and much more slowly for large `n`.

Luckily for us, Node uses Google's V8 engine for JavaScript.
V8 is really fast, even for pretty large objects.
If you might be doing double for-loops (`O(n^2)`) or sorting very large arrays (`O(nlogn)`), you should think about bounding the input, i.e. rejecting inputs that are too long.
Otherwise, you're probably OK.

### Regular expression Denial of Service (ReDoS)
I said V8 was fast.
I lied.
There is one aspect of V8 that is actually pretty slow.
[*Regular expressions*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), while really handy, can actually take exponential-time.
For example, if you are serving files and ensuring a path is valid, you might write "`if (f.match(/(\/.+)+$/) ...`" to make sure the path is a sequence of "/"-delimited names.
Sadly, what if a client sends in the path `///.../\n` (say, 100 /'s followed by a newline character that the regexp's "." won't match)?
Your server will take an extremely long time to evaluate the regexp with this input, and if the attacker adds another "/" the time taken will double.
Try it!

So why is this happening?
The problem is that your server is using a "vulnerable regular expression", one that exposes you to Regular Expression Denial of Service ([ReDoS](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)).
For this reason, you should be leery of using regular expressions to validate user input.

There are some tools to check your regexps for safety, like
- [safe-regex](https://github.com/substack/safe-regex)
- [rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/)
However, neither of these will catch all vulnerable regexps.

A safer alternative is the [node-re2](https://github.com/uhop/node-re2) project, which uses Google's blazing-fast [RE2](https://github.com/google/re2) regexp engine. But be warned, RE2 is not 100% compatible with Node's regexps, so check for regressions if you swap in the node-re2 module to handle your regexps. And really complicated regexps may not be supported by node-re2.

As usual, if you're trying to match something "obvious", like a URL or a file path, use an npm module!

### I'm not using regexps but I still wanted to do something complicated in JavaScript
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