---
date: '2015-12-11T12:00:00.000Z'
category: weekly
title: Weekly Update - Dec 11st, 2015
layout: blog-post.hbs
author: 'Minwoo Jung (@jmwsoft)'
---

### Node.js News — December 11st

Node v5.2.0 (Current) is released

### Node.js v5.2.0 (Current) Releases

This week we have one release: [Node.js v5.2.0 (Current)](/blog/release/v5.2.0/). Complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

### Notable changes

- **build**:
  - Add support for Intel's VTune JIT profiling when compiled with `--enable-vtune-profiling`. For more information about VTune, see <https://software.intel.com/en-us/node/544211>. (Chunyang Dai) [#3785](https://github.com/nodejs/node/pull/3785).
  - Properly enable V8 snapshots by default. Due to a configuration error, snapshots have been kept off by default when the intention is for the feature to be enabled. (Fedor Indutny) [#3962](https://github.com/nodejs/node/pull/3962).
- **crypto**:
  - Simplify use of ECDH (Elliptic Curve Diffie-Hellman) objects (created via `crypto.createECDH(curve_name)`) with private keys that are not dynamically generated via `generateKeys()`. The public key is now computed when explicitly setting a private key. Added validity checks to reduce the possibility of computing weak or invalid shared secrets. Also, deprecated the `setPublicKey()` method for ECDH objects as its usage is unnecessary and can lead to inconsistent state. (Michael Ruddy) [#3511](https://github.com/nodejs/node/pull/3511).
  - Update root certificates from the current list stored maintained by Mozilla NSS. (Ben Noordhuis) [#3951](https://github.com/nodejs/node/pull/3951).
  - Multiple CA certificates can now be passed with the `ca` option to TLS methods as an array of strings or in a single new-line separated string. (Ben Noordhuis) [#4099](https://github.com/nodejs/node/pull/4099)
- **tools**: Include a tick processor in core, exposed via the `--prof-process` command-line argument which can be used to process V8 profiling output files generated when using the `--prof` command-line argument. (Matt Loring) [#4021](https://github.com/nodejs/node/pull/4021).

### Apigee, RisingStack and Yahoo Join the Node.js Foundation

- [The Node.js Foundation](https://foundation.nodejs.org/), a community-led and industry-backed consortium to advance the development of the Node.js platform, announced Apigee, RisingStack and Yahoo are joining the Foundation as Silver Members to build and support the Node.js platform.
- With over 2 million downloads per month, Node.js is the runtime of choice for developers building everything from enterprise applications to Industrial IoT.
- The Node.js Foundation members work together alongside the community to help grow this diverse technology for large financial services, web-scale, cloud computing companies, and more.
- The newly added [Long-Term Support](/blog/release/v4.2.0/) release version 4.0 is just one of the many initiatives from the Foundation, which addresses the needs of enterprises that are using Node.js in more complex production environments, and signals the growing maturity of the technology.

See /blog/announcements/apigee-rising-stack-yahoo/ for more information.

### Node.js Foundation Advances Platform with More Than Three Million Users

- [The Node.js Foundation](https://foundation.nodejs.org/), announced major community, code and membership growth, adoption statistics of the technology at large, and the Foundation’s new incubation program.
- Since the independent Node.js Foundation launched earlier this year, development progress continues to accelerate with dramatic increases in contributions to the project.
- The first Node.js Interactive event unites more than 700 developers, engineers, system architects, DevOps professionals and users representing a wide range of projects, products and companies in Portland, Ore.
- Node.js Interactive brings together a broad range of speakers to help experienced and novice Node.js users alike learn tips, best practices, new skills, as well as gain insight into future developments for the technology.
- The Node.js Foundation announced its first incubation project libuv.
- The project is both critical to Node.js and already widely used, making it a natural fit for the Foundation.
- Under the Foundation's umbrella, it will receive additional support and mentorship.

See /blog/announcements/foundation-advances-growth/ for more information.

### Community Updates

- [Finding a Memory Leak in Node.js](https://blog.risingstack.com/finding-a-memory-leak-in-node-js/), "We compiled a bunch of methods and tools that could help"
- [Node.js running in the new Airbus A350 inflight servers](http://reaktor.com/blog/aircraft-customer-experience-on-a-new-level/), "We were allowed to run our own Node.js-server on the inflight servers of the aircraft."
- [Automatic cat feeder powered by Node.js](https://github.com/rachelnicole/robokitty), "A DIY cat (or dog, or human) feeder controlled over the web."
- [Netflix' Node powered interfaces](http://thenewstack.io/netflix-uses-node-js-power-user-interface/), "Shifting its user interfaces to Node.js, Netflix has been able to streamline the development."

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
