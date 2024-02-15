---
title: Security Best Practices
layout: learn.hbs
---

# Security Best Practices

## Intent

This document intends to extend the current [threat model][] and provide extensive
guidelines on how to secure a Node.js application.

## Document Content

- Best practices: A simplified condensed way to see the best practices. We can
  use [this issue][security guidance issue] or [this guideline][nodejs guideline]
  as the starting point. It is important to note that this document is specific
  to Node.js, if you are looking for something broad, consider
  [OSSF Best Practices][].
- Attacks explained: illustrate and document in plain English with some code
  examples (if possible) of the attacks that we are mentioning in the threat model.
- Third-Party Libraries: define threats
  (typosquatting attacks, malicious packages...) and best practices regarding
  node modules dependencies, etc...

## Threat List

### Denial of Service of HTTP server (CWE-400)

This is an attack where the application becomes unavailable for the purpose it
was designed due to the way it processes incoming HTTP requests. These requests
need not be deliberately crafted by a malicious actor: a misconfigured or buggy
client can also send a pattern of requests to the server that result in a denial
of service.

HTTP requests are received by the Node.js HTTP server and handed over to the
application code via the registered request handler. The server does not parse
the content of the request body. Therefore any DoS caused by the contents of the
body after they are handed over to the request handler is not a vulnerability in
Node.js itself, since it's the responsibility of the application code to handle
it correctly.

Ensure that the WebServer handles socket errors properly, for instance, when a
server is created without an error handler, it will be vulnerable to DoS

```js
const net = require('node:net');

const server = net.createServer(function (socket) {
  // socket.on('error', console.error) // this prevents the server to crash
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(5000, '0.0.0.0');
```

If a _bad request_ is performed the server could crash.

An example of a DoS attack that is not caused by the request's contents is
[Slowloris][]. In this attack, HTTP requests are sent slowly and fragmented,
one fragment at a time. Until the full request is delivered, the server will
keep resources dedicated to the ongoing request. If enough of these requests
are sent at the same time, the amount of concurrent connections will soon reach
its maximum resulting in a denial of service. This is how the attack depends
not on the request's contents but on the timing and pattern of the requests
being sent to the server.

**Mitigations**

- Use a reverse proxy to receive and forward requests to the Node.js application.
  Reverse proxies can provide caching, load balancing, IP blacklisting, etc. which
  reduce the probability of a DoS attack being effective.
- Correctly configure the server timeouts, so that connections that are idle or
  where requests are arriving too slowly can be dropped. See the different timeouts
  in [`http.Server`][], particularly `headersTimeout`, `requestTimeout`, `timeout`,
  and `keepAliveTimeout`.
- Limit the number of open sockets per host and in total. See the [http docs][],
  particularly `agent.maxSockets`, `agent.maxTotalSockets`, `agent.maxFreeSockets`
  and `server.maxRequestsPerSocket`.

### DNS Rebinding (CWE-346)

This is an attack that can target Node.js applications being run with the
debugging inspector enabled using the [--inspect switch][].

Since websites opened in a web browser can make WebSocket and HTTP requests,
they can target the debugging inspector running locally.
This is usually prevented by the [same-origin policy][] implemented by modern
browsers, which forbids scripts from reaching resources from different origins
(meaning a malicious website cannot read data requested from a local IP address).

However, through DNS rebinding, an attacker can temporarily control the origin
for their requests so that they seem to originate from a local IP address.
This is done by controlling both a website and the DNS server used to resolve
its IP address. See [DNS Rebinding wiki][] for more details.

**Mitigations**

- Disable inspector on _SIGUSR1_ signal by attaching a `process.on(‘SIGUSR1’, …)`
  listener to it.
- Do not run the inspector protocol in production.

### Exposure of Sensitive Information to an Unauthorized Actor (CWE-552)

All the files and folders included in the current directory are pushed to the
npm registry during the package publication.

There are some mechanisms to control this behavior by defining a blocklist with
`.npmignore` and `.gitignore` or by defining an allowlist in the `package.json`

**Mitigations**

- Using `npm publish --dry-run` to list all the files to publish. Ensure to review the
  content before publishing the package.
- It’s also important to create and maintain ignore files such as `.gitignore` and
  `.npmignore`.
  Throughout these files, you can specify which files/folders should not be published.
  The [files property][] in `package.json` allows the inverse operation
  -- allowed list.
- In case of an exposure, make sure to [unpublish the package][].

### HTTP Request Smuggling (CWE-444)

This is an attack that involves two HTTP servers (usually a proxy and a Node.js
application). A client sends an HTTP request that goes first through the
front-end server (the proxy) and then is redirected to the back-end server (the application).
When the front-end and back-end interpret ambiguous HTTP requests differently,
there is potential for an attacker to send a malicious message that won't be
seen by the front-end but will be seen by the back-end, effectively "smuggling"
it past the proxy server.

See the [CWE-444][] for a more detailed description and examples.

Since this attack depends on Node.js interpreting HTTP requests
differently from an (arbitrary) HTTP server, a successful attack can be due to
a vulnerability in Node.js, the front-end server, or both.
If the way the request is interpreted by Node.js is consistent with the
HTTP specification (see [RFC7230][]), then it is not considered a vulnerability
in Node.js.

**Mitigations**

- Do not use the `insecureHTTPParser` option when creating a HTTP Server.
- Configure the front-end server to normalize ambiguous requests.
- Continuously monitor for new HTTP request smuggling vulnerabilities in both
  Node.js and the front-end server of choice.
- Use HTTP/2 end to end and disable HTTP downgrading if possible.

### Information Exposure through Timing Attacks (CWE-208)

This is an attack that allows the attacker to learn potentially sensitive information by, for example, measuring how long
it takes for the application to respond to a request. This attack is not specific to Node.js and can target almost all runtimes.

The attack is possible whenever the application uses a secret in a timing-sensitive operation (e.g., branch). Consider handling authentication in a typical application. Here, a basic authentication method includes email and password as credentials.
User information is retrieved from the input the user has supplied from ideally a
DBMS.
Upon retrieving user information, the password is compared with the user
information retrieved from the database. Using the built-in string comparison takes a longer
time for the same-length values.
This comparison, when run for an acceptable amount unwillingly increases the
response time of the request. By comparing the request response times, an
attacker can guess the length and the value of the password in a large quantity
of requests.

**Mitigations**

- The crypto API exposes a function `timingSafeEqual` to compare actual and
  expected sensitive values using a constant-time algorithm.
- For password comparison, you can use the [scrypt][] available also on the
  native crypto module.

- More generally, avoid using secrets in variable-time operations. This includes branching on secrets and, when the attacker could be co-located on the same infrastructure (e.g., same cloud machine), using a secret as an index into memory. Writing constant-time code in JavaScript is hard (partly because of the JIT). For crypto applications, use the built-in crypto APIs or WebAssembly (for algorithms not implemented in natively).

### Malicious Third-Party Modules (CWE-1357)

Currently, in Node.js, any package can access powerful resources such as
network access.
Furthermore, because they also have access to the file system, they can send
any data anywhere.

All code running into a node process has the ability to load and run additional
arbitrary code by using `eval()`(or its equivalents).
All code with file system write access may achieve the same thing by writing to
new or existing files that are loaded.

Node.js has an experimental[¹][experimental-features]
[policy mechanism][] to declare the loaded resource as untrusted or trusted.
However, this policy is not enabled by default.
Be sure to pin dependency versions and run automatic checks for vulnerabilities
using common workflows or npm scripts.
Before installing a package make sure that this package is maintained and
includes all the content you expected.
Be careful, the GitHub source code is not always the same as the published one,
validate it in the _node_modules_.

#### Supply chain attacks

A supply chain attack on a Node.js application happens when one of its
dependencies (either direct or transitive) are compromised.
This can happen either due to the application being too lax on the specification
of the dependencies (allowing for unwanted updates) and/or common typos in the
specification (vulnerable to [typosquatting][]).

An attacker who takes control of an upstream package can publish a new version
with malicious code in it. If a Node.js application depends on that package
without being strict on which version is safe to use, the package can be
automatically updated to the latest malicious version, compromising the application.

Dependencies specified in the `package.json` file can have an exact version number
or a range. However, when pinning a dependency to an exact version, its
transitive dependencies are not themselves pinned.
This still leaves the application vulnerable to unwanted/unexpected updates.

Possible attack vectors:

- Typosquatting attacks
- Lockfile poisoning
- Compromised maintainers
- Malicious Packages
- Dependency Confusions

**Mitigations**

- Prevent npm from executing arbitrary scripts with `--ignore-scripts`
  - Additionally, you can disable it globally with `npm config set ignore-scripts true`
- Pin dependency versions to a specific immutable version,
  not a version that is a range or from a mutable source.
- Use lockfiles, which pin every dependency (direct and transitive).
  - Use [Mitigations for lockfile poisoning][].
- Automate checks for new vulnerabilities using CI, with tools like [`npm-audit`][].
  - Tools such as [`Socket`][] can be used to analyze packages with static analysis
    to find risky behaviors such as network or filesystem access.
- Use [`npm ci`][] instead of `npm install`.
  This enforces the lockfile so that inconsistencies between it and the
  _package.json_ file causes an error (instead of silently ignoring the lockfile
  in favor of _package.json_).
- Carefully check the _package.json_ file for errors/typos in the names of the
  dependencies.

### Memory Access Violation (CWE-284)

Memory-based or heap-based attacks depend on a combination of memory management
errors and an exploitable memory allocator.
Like all runtimes, Node.js is vulnerable to these attacks if your projects run
on a shared machine.
Using a secure heap is useful for preventing sensitive information from leaking
due to pointer overruns and underruns.

Unfortunately, a secure heap is not available on Windows.
More information can be found on Node.js [secure-heap documentation][].

**Mitigations**

- Use `--secure-heap=n` depending on your application where _n_ is the allocated
  maximum byte size.
- Do not run your production app on a shared machine.

### Monkey Patching (CWE-349)

Monkey patching refers to the modification of properties in runtime aiming to
change the existing behavior. Example:

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};
```

**Mitigations**

The `--frozen-intrinsics` flag enables experimental[¹][experimental-features]
frozen intrinsics, which means all the built-in JavaScript objects and functions
are recursively frozen.
Therefore, the following snippet **will not** override the default behavior of
`Array.prototype.push`

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};

// Uncaught:
// TypeError <Object <Object <[Object: null prototype] {}>>>:
// Cannot assign to read only property 'push' of object ''
```

However, it’s important to mention you can still define new globals and replace
existing globals using `globalThis`

```console
> globalThis.foo = 3; foo; // you can still define new globals
3
> globalThis.Array = 4; Array; // However, you can also replace existing globals
4
```

Therefore, `Object.freeze(globalThis)` can be used to guarantee no globals will
be replaced.

### Prototype Pollution Attacks (CWE-1321)

Prototype pollution refers to the possibility of modifying or injecting properties
into Javascript language items by abusing the usage of \_\_proto\__,
\_constructor_, _prototype_, and other properties inherited from built-in
prototypes.

<!-- eslint-skip -->

```js
const a = { a: 1, b: 2 };
const data = JSON.parse('{"__proto__": { "polluted": true}}');

const c = Object.assign({}, a, data);
console.log(c.polluted); // true

// Potential DoS
const data2 = JSON.parse('{"__proto__": null}');
const d = Object.assign(a, data2);
d.hasOwnProperty('b'); // Uncaught TypeError: d.hasOwnProperty is not a function
```

This is a potential vulnerability inherited from the JavaScript
language.

**Examples**:

- [CVE-2022-21824][] (Node.js)
- [CVE-2018-3721][] (3rd Party library: Lodash)

**Mitigations**

- Avoid [insecure recursive merges][], see [CVE-2018-16487][].
- Implement JSON Schema validations for external/untrusted requests.
- Create Objects without prototype by using `Object.create(null)`.
- Freezing the prototype: `Object.freeze(MyObject.prototype)`.
- Disable the `Object.prototype.__proto__` property using `--disable-proto` flag.
- Check that the property exists directly on the object, not from the prototype
  using `Object.hasOwn(obj, keyFromObj)`.
- Avoid using methods from `Object.prototype`.

### Uncontrolled Search Path Element (CWE-427)

Node.js loads modules following the [Module Resolution Algorithm][].
Therefore, it assumes the directory in which a module is requested
(require) is trusted.

By that, it means the following application behavior is expected.
Assuming the following directory structure:

- _app/_
  - _server.js_
  - _auth.js_
  - _auth_

If server.js uses `require('./auth')` it will follow the module resolution
algorithm and load _auth_ instead of _auth.js_.

**Mitigations**

Using the experimental[¹][experimental-features]
[policy mechanism with integrity checking][] can avoid the above threat.
For the directory described above, one can use the following `policy.json`

```json
{
  "resources": {
    "./app/auth.js": {
      "integrity": "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8="
    },
    "./app/server.js": {
      "dependencies": {
        "./auth": "./app/auth.js"
      },
      "integrity": "sha256-NPtLCQ0ntPPWgfVEgX46ryTNpdvTWdQPoZO3kHo0bKI="
    }
  }
}
```

Therefore, when requiring the _auth_ module, the system will validate the
integrity and throw an error if doesn’t match the expected one.

```console
» node --experimental-policy=policy.json app/server.js
node:internal/policy/sri:65
      throw new ERR_SRI_PARSE(str, str[prevIndex], prevIndex);
      ^

SyntaxError [ERR_SRI_PARSE]: Subresource Integrity string "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8=%" had an unexpected "%" at position 51
    at new NodeError (node:internal/errors:393:5)
    at Object.parse (node:internal/policy/sri:65:13)
    at processEntry (node:internal/policy/manifest:581:38)
    at Manifest.assertIntegrity (node:internal/policy/manifest:588:32)
    at Module._compile (node:internal/modules/cjs/loader:1119:21)
    at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Module._load (node:internal/modules/cjs/loader:878:12)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:99:18) {
  code: 'ERR_SRI_PARSE'
}
```

Note, it's always recommended the use of `--policy-integrity` to avoid policy mutations.

## Experimental Features in Production

The use of experimental features in production isn't recommended.
Experimental features can suffer breaking changes if needed, and their
functionality isn't securely stable. Although, feedback is highly appreciated.

## OpenSSF Tools

The [OpenSSF][] is leading several initiatives that can be very useful, especially if you plan to publish an npm package. These initiatives include:

- [OpenSSF Scorecard][] Scorecard evaluates open source projects using a series of automated security risk checks. You can use it to proactively assess vulnerabilities and dependencies in your code base and make informed decisions about accepting vulnerabilities.
- [OpenSSF Best Practices Badge Program][] Projects can voluntarily self-certify by describing how they comply with each best practice. This will generate a badge that can be added to the project.

[threat model]: https://github.com/nodejs/node/security/policy#the-nodejs-threat-model
[security guidance issue]: https://github.com/nodejs/security-wg/issues/488
[nodejs guideline]: https://github.com/goldbergyoni/nodebestpractices
[OSSF Best Practices]: https://github.com/ossf/wg-best-practices-os-developers
[Slowloris]: https://en.wikipedia.org/wiki/Slowloris_(computer_security)
[`http.Server`]: https://nodejs.org/api/http.html#class-httpserver
[http docs]: https://nodejs.org/api/http.html
[--inspect switch]: /learn/getting-started/debugging
[same-origin policy]: /learn/getting-started/debugging
[DNS Rebinding wiki]: https://en.wikipedia.org/wiki/DNS_rebinding
[files property]: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files
[unpublish the package]: https://docs.npmjs.com/unpublishing-packages-from-the-registry
[CWE-444]: https://cwe.mitre.org/data/definitions/444.html
[RFC7230]: https://datatracker.ietf.org/doc/html/rfc7230#section-3
[policy mechanism]: https://nodejs.org/api/permissions.html#policies
[typosquatting]: https://en.wikipedia.org/wiki/Typosquatting
[Mitigations for lockfile poisoning]: https://blog.ulisesgascon.com/lockfile-posioned
[`npm ci`]: https://docs.npmjs.com/cli/v8/commands/npm-ci
[secure-heap documentation]: https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#--secure-heapn
[CVE-2022-21824]: https://www.cvedetails.com/cve/CVE-2022-21824/
[CVE-2018-3721]: https://www.cvedetails.com/cve/CVE-2018-3721/
[insecure recursive merges]: https://gist.github.com/DaniAkash/b3d7159fddcff0a9ee035bd10e34b277#file-unsafe-merge-js
[CVE-2018-16487]: https://www.cve.org/CVERecord?id=CVE-2018-16487
[scrypt]: https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
[Module Resolution Algorithm]: https://nodejs.org/api/modules.html#modules_all_together
[policy mechanism with integrity checking]: https://nodejs.org/api/permissions.html#integrity-checks
[experimental-features]: #experimental-features-in-production
[`Socket`]: https://socket.dev/
[OpenSSF]: https://openssf.org/
[OpenSSF Scorecard]: https://securityscorecards.dev/
[OpenSSF Best Practices Badge Program]: https://bestpractices.coreinfrastructure.org/en
