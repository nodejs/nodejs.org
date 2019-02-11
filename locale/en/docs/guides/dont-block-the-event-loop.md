---
title: Don't Block the Event Loop (or the Worker Pool)
layout: docs.hbs
---

# Don't Block the Event Loop (or the Worker Pool)

## Should you read this guide?
If you're writing anything more complicated than a brief command-line script, reading this should help you write higher-performance, more-secure applications.

This document is written with Node servers in mind, but the concepts apply to complex Node applications as well.
Where OS-specific details vary, this document is Linux-centric.

## TL; DR
Node.js runs JavaScript code in the Event Loop (initialization and callbacks), and offers a Worker Pool to handle expensive tasks like file I/O.
Node scales well, sometimes better than more heavyweight approaches like Apache.
The secret to Node's scalability is that it uses a small number of threads to handle many clients.
If Node can make do with fewer threads, then it can spend more of your system's time and memory working on clients rather than on paying space and time overheads for threads (memory, context-switching).
But because Node has only a few threads, you must structure your application to use them wisely.

Here's a good rule of thumb for keeping your Node server speedy:
*Node is fast when the work associated with each client at any given time is "small"*.

This applies to callbacks on the Event Loop and tasks on the Worker Pool.

## Why should I avoid blocking the Event Loop and the Worker Pool?
Node uses a small number of threads to handle many clients.
In Node there are two types of threads: one Event Loop (aka the main loop, main thread, event thread, etc.), and a pool of `k` Workers in a Worker Pool (aka the threadpool).

If a thread is taking a long time to execute a callback (Event Loop) or a task (Worker), we call it "blocked".
While a thread is blocked working on behalf of one client, it cannot handle requests from any other clients.
This provides two motivations for blocking neither the Event Loop nor the Worker Pool:

1. Performance: If you regularly perform heavyweight activity on either type of thread, the *throughput* (requests/second) of your server will suffer.
2. Security: If it is possible that for certain input one of your threads might block, a malicious client could submit this "evil input", make your threads block, and keep them from working on other clients. This would be a [Denial of Service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack.

## A quick review of Node

Node uses the Event-Driven Architecture: it has an Event Loop for orchestration and a Worker Pool for expensive tasks.

### What code runs on the Event Loop?
When they begin, Node applications first complete an initialization phase, `require`'ing modules and registering callbacks for events.
Node applications then enter the Event Loop, responding to incoming client requests by executing the appropriate callback.
This callback executes synchronously, and may register asynchronous requests to continue processing after it completes.
The callbacks for these asynchronous requests will also be executed on the Event Loop.

The Event Loop will also fulfill the non-blocking asynchronous requests made by its callbacks, e.g., network I/O.

In summary, the Event Loop executes the JavaScript callbacks registered for events, and is also responsible for fulfilling non-blocking asynchronous requests like network I/O.

### What code runs on the Worker Pool?
Node's Worker Pool is implemented in libuv ([docs](http://docs.libuv.org/en/v1.x/threadpool.html)), which exposes a general task submission API.

Node uses the Worker Pool to handle "expensive" tasks.
This includes I/O for which an operating system does not provide a non-blocking version, as well as particularly CPU-intensive tasks.

These are the Node module APIs that make use of this Worker Pool:
1. I/O-intensive
    1. [DNS](https://nodejs.org/api/dns.html): `dns.lookup()`, `dns.lookupService()`.
    2. [File System](https://nodejs.org/api/fs.html#fs_threadpool_usage): All file system APIs except `fs.FSWatcher()` and those that are explicitly synchronous use libuv's threadpool.
2. CPU-intensive
    1. [Crypto](https://nodejs.org/api/crypto.html): `crypto.pbkdf2()`, `crypto.scrypt()`, `crypto.randomBytes()`, `crypto.randomFill()`, `crypto.generateKeyPair()`.
    2. [Zlib](https://nodejs.org/api/zlib.html#zlib_threadpool_usage): All zlib APIs except those that are explicitly synchronous use libuv's threadpool.

In many Node applications, these APIs are the only sources of tasks for the Worker Pool. Applications and modules that use a [C++ add-on](https://nodejs.org/api/addons.html) can submit other tasks to the Worker Pool.

For the sake of completeness, we note that when you call one of these APIs from a callback on the Event Loop, the Event Loop pays some minor setup costs as it enters the Node C++ bindings for that API and submits a task to the Worker Pool.
These costs are negligible compared to the overall cost of the task, which is why the Event Loop is offloading it.
When submitting one of these tasks to the Worker Pool, Node provides a pointer to the corresponding C++ function in the Node C++ bindings.

### How does Node decide what code to run next?
Abstractly, the Event Loop and the Worker Pool maintain queues for pending events and pending tasks, respectively.

In truth, the Event Loop does not actually maintain a queue.
Instead, it has a collection of file descriptors that it asks the operating system to monitor, using a mechanism like [epoll](http://man7.org/linux/man-pages/man7/epoll.7.html) (Linux), [kqueue](https://developer.apple.com/library/content/documentation/Darwin/Conceptual/FSEvents_ProgGuide/KernelQueues/KernelQueues.html) (OSX), event ports (Solaris), or [IOCP](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365198.aspx) (Windows).
These file descriptors correspond to network sockets, any files it is watching, and so on.
When the operating system says that one of these file descriptors is ready, the Event Loop translates it to the appropriate event and invokes the callback(s) associated with that event.
You can learn more about this process [here](https://www.youtube.com/watch?v=P9csgxBgaZ8).

In contrast, the Worker Pool uses a real queue whose entries are tasks to be processed.
A Worker pops a task from this queue and works on it, and when finished the Worker raises an "At least one task is finished" event for the Event Loop.

### What does this mean for application design?
In a one-thread-per-client system like Apache, each pending client is assigned its own thread.
If a thread handling one client blocks, the operating system will interrupt it and give another client a turn.
The operating system thus ensures that clients that require a small amount of work are not penalized by clients that require more work.

Because Node handles many clients with few threads, if a thread blocks handling one client's request, then pending client requests may not get a turn until the thread finishes its callback or task.
*The fair treatment of clients is thus the responsibility of your application*.
This means that you shouldn't do too much work for any client in any single callback or task.

This is part of why Node can scale well, but it also means that you are responsible for ensuring fair scheduling.
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

Example 3: An `O(n^2)` callback. This callback will still run quickly for small `n`, but for large `n` it will run much more slowly than the previous `O(n)` example.

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
Exceptions to this rule are regexps and JSON operations, discussed below.

However, for complex tasks you should consider bounding the input and rejecting inputs that are too long.
That way, even if your callback has large complexity, by bounding the input you ensure the callback cannot take more than the worst-case time on the longest acceptable input.
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
3. Avoid using backreferences, like `(a.*) \1`. No regexp engine can guarantee evaluating these in linear time.
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
Several Node core modules have synchronous expensive APIs, including:
- [Encryption](https://nodejs.org/api/crypto.html)
- [Compression](https://nodejs.org/api/zlib.html)
- [File system](https://nodejs.org/api/fs.html)
- [Child process](https://nodejs.org/api/child_process.html)

These APIs are expensive, because they involve significant computation (encryption, compression), require I/O (file I/O), or potentially both (child process). These APIs are intended for scripting convenience, but are not intended for use in the server context. If you execute them on the Event Loop, they will take far longer to complete than a typical JavaScript instruction, blocking the Event Loop.

In a server, *you should not use the following synchronous APIs from these modules*:
- Encryption:
    - `crypto.randomBytes` (synchronous version)
    - `crypto.randomFillSync`
    - `crypto.pbkdf2Sync`
    - You should also be careful about providing large input to the encryption and decryption routines.
- Compression:
    - `zlib.inflateSync`
    - `zlib.deflateSync`
- File system:
    - Do not use the synchronous file system APIs. For example, if the file you access is in a [distributed file system](https://en.wikipedia.org/wiki/Clustered_file_system#Distributed_file_systems) like [NFS](https://en.wikipedia.org/wiki/Network_File_System), access times can vary widely.
- Child process:
    - `child_process.spawnSync`
    - `child_process.execSync`
    - `child_process.execFileSync`

This list is reasonably complete as of Node v9.

### Blocking the Event Loop: JSON DOS
`JSON.parse` and `JSON.stringify` are other potentially expensive operations.
While these are `O(n)` in the length of the input, for large `n` they can take surprisingly long.

If your server manipulates JSON objects, particularly those from a client, you should be cautious about the size of the objects or strings you work with on the Event Loop.

Example: JSON blocking. We create an object `obj` of size 2^21 and `JSON.stringify` it, run `indexOf` on the string, and then JSON.parse it. The `JSON.stringify`'d string is 50MB. It takes 0.7 seconds to stringify the object, 0.03 seconds to indexOf on the 50MB string, and 1.3 seconds to parse the string.

```javascript
var obj = { a: 1 };
var niter = 20;

var before, res, took;

for (var i = 0; i < niter; i++) {
  obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
}

before = process.hrtime();
res = JSON.stringify(obj);
took = process.hrtime(before);
console.log('JSON.stringify took ' + took);

before = process.hrtime();
res = str.indexOf('nomatch');
took = process.hrtime(before);
console.log('Pure indexof took ' + took);

before = process.hrtime();
res = JSON.parse(str);
took = process.hrtime(before);
console.log('JSON.parse took ' + took);
```

There are npm modules that offer asynchronous JSON APIs. See for example:
- [JSONStream](https://www.npmjs.com/package/JSONStream), which has stream APIs.
- [Big-Friendly JSON](https://github.com/philbooth/bfj), which has stream APIs as well as asynchronous versions of the standard JSON APIs using the partitioning-on-the-Event-Loop paradigm outlined below.

### Complex calculations without blocking the Event Loop
Suppose you want to do complex calculations in JavaScript without blocking the Event Loop.
You have two options: partitioning or offloading.

#### Partitioning
You could *partition* your calculations so that each runs on the Event Loop but regularly yields (gives turns to) other pending events.
In JavaScript it's easy to save the state of an ongoing task in a closure, as shown in example 2 below.

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

asyncAvg(n, function(avg){
  console.log('avg of 1-n: ' + avg);
});
```

You can apply this principle to array iterations and so forth.

#### Offloading
If you need to do something more complex, partitioning is not a good option.
This is because partitioning uses only the Event Loop, and you won't benefit from multiple cores almost certainly available on your machine.
*Remember, the Event Loop should orchestrate client requests, not fulfill them itself.*
For a complicated task, move the work off of the Event Loop onto a Worker Pool.

##### How to offload
You have two options for a destination Worker Pool to which to offload work.
1. You can use the built-in Node Worker Pool by developing a [C++ addon](https://nodejs.org/api/addons.html). On older versions of Node, build your C++ addon using [NAN](https://github.com/nodejs/nan), and on newer versions use [N-API](https://nodejs.org/api/n-api.html). [node-webworker-threads](https://www.npmjs.com/package/webworker-threads) offers a JavaScript-only way to access Node's Worker Pool.
2. You can create and manage your own Worker Pool dedicated to computation rather than Node's I/O-themed Worker Pool. The most straightforward ways to do this is using [Child Process](https://nodejs.org/api/child_process.html) or [Cluster](https://nodejs.org/api/cluster.html).

You should *not* simply create a [Child Process](https://nodejs.org/api/child_process.html) for every client.
You can receive client requests more quickly than you can create and manage children, and your server might become a [fork bomb](https://en.wikipedia.org/wiki/Fork_bomb).

##### Downside of offloading
The downside of the offloading approach is that it incurs overhead in the form of *communication costs*.
Only the Event Loop is allowed to see the "namespace" (JavaScript state) of your application.
From a Worker, you cannot manipulate a JavaScript object in the Event Loop's namespace.
Instead, you have to serialize and deserialize any objects you wish to share.
Then the Worker can operate on its own copy of these object(s) and return the modified object (or a "patch") to the Event Loop.

For serialization concerns, see the section on JSON DOS.

##### Some suggestions for offloading
You may wish to distinguish between CPU-intensive and I/O-intensive tasks because they have markedly different characteristics.

A CPU-intensive task only makes progress when its Worker is scheduled, and the Worker must be scheduled onto one of your machine's [logical cores](https://nodejs.org/api/os.html#os_os_cpus).
If you have 4 logical cores and 5 Workers, one of these Workers cannot make progress.
As a result, you are paying overhead (memory and scheduling costs) for this Worker and getting no return for it.

I/O-intensive tasks involve querying an external service provider (DNS, file system, etc.) and waiting for its response.
While a Worker with an I/O-intensive task is waiting for its response, it has nothing else to do and can be de-scheduled by the operating system, giving another Worker a chance to submit their request.
Thus, *I/O-intensive tasks will be making progress even while the associated thread is not running*.
External service providers like databases and file systems have been highly optimized to handle many pending requests concurrently.
For example, a file system will examine a large set of pending write and read requests to merge conflicting updates and to retrieve files in an optimal order (e.g. see [these slides](http://researcher.ibm.com/researcher/files/il-AVISHAY/01-block_io-v1.3.pdf)).

If you rely on only one Worker Pool, e.g. the Node Worker Pool, then the differing characteristics of CPU-bound and I/O-bound work may harm your application's performance.

For this reason, you might wish to maintain a separate Computation Worker Pool.

#### Offloading: conclusions
For simple tasks, like iterating over the elements of an arbitrarily long array, partitioning might be a good option.
If your computation is more complex, offloading is a better approach: the communication costs, i.e. the overhead of passing serialized objects between the Event Loop and the Worker Pool, are offset by the benefit of using multiple cores.

However, if your server relies heavily on complex calculations, you should think about whether Node is really a good fit. Node excels for I/O-bound work, but for expensive computation it might not be the best option.

If you take the offloading approach, see the section on not blocking the Worker Pool.

## Don't block the Worker Pool
Node has a Worker Pool composed of `k` Workers.
If you are using the Offloading paradigm discussed above, you might have a separate Computational Worker Pool, to which the same principles apply.
In either case, let us assume that `k` is much smaller than the number of clients you might be handling concurrently.
This is in keeping with Node's "one thread for many clients" philosophy, the secret to its scalability.

As discussed above, each Worker completes its current Task before proceeding to the next one on the Worker Pool queue.

Now, there will be variation in the cost of the Tasks required to handle your clients' requests.
Some Tasks can be completed quickly (e.g. reading short or cached files, or producing a small number of random bytes), and others will take longer (e.g reading larger or uncached files, or generating more random bytes).
Your goal should be to *minimize the variation in Task times*, and you should use *Task partitioning* to accomplish this.

### Minimizing the variation in Task times
If a Worker's current Task is much more expensive than other Tasks, then it will be unavailable to work on other pending Tasks.
In other words, *each relatively long Task effectively decreases the size of the Worker Pool by one until it is completed*.
This is undesirable because, up to a point, the more Workers in the Worker Pool, the greater the Worker Pool throughput (tasks/second) and thus the greater the server throughput (client requests/second).
One client with a relatively expensive Task will decrease the throughput of the Worker Pool, in turn decreasing the throughput of the server.

To avoid this, you should try to minimize variation in the length of Tasks you submit to the Worker Pool.
While it is appropriate to treat the external systems accessed by your I/O requests (DB, FS, etc.) as black boxes, you should be aware of the relative cost of these I/O requests, and should avoid submitting requests you can expect to be particularly long.

Two examples should illustrate the possible variation in task times.

#### Variation example: Long-running file system reads
Suppose your server must read files in order to handle some client requests.
After consulting Node's [File system](https://nodejs.org/api/fs.html) APIs, you opted to use `fs.readFile()` for simplicity.
However, `fs.readFile()` is ([currently](https://github.com/nodejs/node/pull/17054)) not partitioned: it submits a single `fs.read()` Task spanning the entire file.
If you read shorter files for some users and longer files for others, `fs.readFile()` may introduce significant variation in Task lengths, to the detriment of Worker Pool throughput.

For a worst-case scenario, suppose an attacker can convince your server to read an *arbitrary* file (this is a [directory traversal vulnerability](https://www.owasp.org/index.php/Path_Traversal)).
If your server is running Linux, the attacker can name an extremely slow file: [`/dev/random`](http://man7.org/linux/man-pages/man4/random.4.html).
For all practical purposes, `/dev/random` is infinitely slow, and every Worker asked to read from `/dev/random` will never finish that Task.
An attacker then submits `k` requests, one for each Worker, and no other client requests that use the Worker Pool will make progress.

#### Variation example: Long-running crypto operations
Suppose your server generates cryptographically secure random bytes using [`crypto.randomBytes()`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback).
`crypto.randomBytes()` is not partitioned: it creates a single `randomBytes()` Task to generate as many bytes as you requested.
If you create fewer bytes for some users and more bytes for others, `crypto.randomBytes()` is another source of variation in Task lengths.

### Task partitioning
Tasks with variable time costs can harm the throughput of the Worker Pool.
To minimize variation in Task times, as far as possible you should *partition* each Task into comparable-cost sub-Tasks.
When each sub-Task completes it should submit the next sub-Task, and when the final sub-Task completes it should notify the submitter.

To continue the `fs.readFile()` example, you should instead use `fs.read()` (manual partitioning) or `ReadStream` (automatically partitioned).

The same principle applies to CPU-bound tasks; the `asyncAvg` example might be inappropriate for the Event Loop, but it is well suited to the Worker Pool.

When you partition a Task into sub-Tasks, shorter Tasks expand into a small number of sub-Tasks, and longer Tasks expand into a larger number of sub-Tasks.
Between each sub-Task of a longer Task, the Worker to which it was assigned can work on a sub-Task from another, shorter, Task, thus improving the overall Task throughput of the Worker Pool.

Note that the number of sub-Tasks completed is not a useful metric for the throughput of the Worker Pool.
Instead, concern yourself with the number of *Tasks* completed.

### Avoiding Task partitioning
Recall that the purpose of Task partitioning is to minimize the variation in Task times.
If you can distinguish between shorter Tasks and longer Tasks (e.g. summing an array vs. sorting an array), you could create one Worker Pool for each class of Task.
Routing shorter Tasks and longer Tasks to separate Worker Pools is another way to minimize Task time variation.

In favor of this approach, partitioning Tasks incurs overhead (the costs of creating a Worker Pool Task representation and of manipulating the Worker Pool queue), and avoiding partitioning saves you the costs of additional trips to the Worker Pool.
It also keeps you from making mistakes in partitioning your Tasks.

The downside of this approach is that Workers in all of these Worker Pools will incur space and time overheads and will compete with each other for CPU time.
Remember that each CPU-bound Task makes progress only while it is scheduled.
As a result, you should only consider this approach after careful analysis.

### Worker Pool: conclusions
Whether you use only the Node Worker Pool or maintain separate Worker Pool(s), you should optimize the Task throughput of your Pool(s).

To do this, minimize the variation in Task times by using Task partitioning.

##  The risks of npm modules
While the Node core modules offer building blocks for a wide variety of applications, sometimes something more is needed. Node developers benefit tremendously from the [npm ecosystem](https://www.npmjs.com/), with hundreds of thousands of modules offering functionality to accelerate your development process.

Remember, however, that the majority of these modules are written by third-party developers and are generally released with only best-effort guarantees. A developer using an npm module should be concerned about two things, though the latter is frequently forgotten.
1. Does it honor its APIs?
2. Might its APIs block the Event Loop or a Worker?
Many modules make no effort to indicate the cost of their APIs, to the detriment of the community.

For simple APIs you can estimate the cost of the APIs; the cost of string manipulation isn't hard to fathom.
But in many cases it's unclear how much an API might cost.

*If you are calling an API that might do something expensive, double-check the cost. Ask the developers to document it, or examine the source code yourself (and submit a PR documenting the cost).*

Remember, even if the API is asynchronous, you don't know how much time it might spend on a Worker or on the Event Loop in each of its partitions.
For example, suppose in the `asyncAvg` example given above, each call to the helper function summed *half* of the numbers rather than one of them.
Then this function would still be asynchronous, but the cost of each partition would be `O(n)`, not `O(1)`, making it much less safe to use for arbitrary values of `n`.

## Conclusion
Node has two types of threads: one Event Loop and `k` Workers.
The Event Loop is responsible for JavaScript callbacks and non-blocking I/O, and a Worker executes tasks corresponding to C++ code that completes an asynchronous request, including blocking I/O and CPU-intensive work.
Both types of threads work on no more than one activity at a time.
If any callback or task takes a long time, the thread running it becomes *blocked*.
If your application makes blocking callbacks or tasks, this can lead to degraded throughput (clients/second) at best, and complete denial of service at worst.

To write a high-throughput, more DoS-proof web server, you must ensure that on benign and on malicious input, neither your Event Loop nor your Workers will block.
