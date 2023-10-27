---
date: '2015-08-14T12:00:00.000Z'
category: weekly
title: Weekly Update - Aug 14th, 2015
layout: blog-post.hbs
author: 'Steven Sinatra (@diagramatics)'
---

### io.js and Node.js News — August 14th

The move of nodejs/io.js to nodejs/node, the Collaborator Summit, and more.

### nodejs/io.js has moved to nodejs/node!

[Rod Vagg](http://twitter.com/rvagg) made a [proposal](https://github.com/nodejs/node/issues/2327) regarding the convergence work between io.js and Node.js earlier this week, and one of them is about renaming the nodejs/io.js repository to [nodejs/node](https://github.com/nodejs/node). A decision has been made, and [nodejs/node](https://github.com/nodejs/node) is our new home!

With the new repository name, io.js v3.x will be our last major version of io.js as the next (v4.x) will be Node.js v4.x.

Other points in the proposal are:

- The new repository to be the host of all future releases including io.js v3 and Node.js 0.10 and 0.12. The suggestion is that they will be in separate branches named v0.10.x and v0.12.x alongside with the existing v3.x branch.
- Leaving [joyent/node](https://github.com/joyent/node) in place for now, encouraging all new issues and pull requests in it to be filed in nodejs/node instead. There is also a possibility to move joyent/node to nodejs/node-legacy or a similarly named repository.
- Documenting a new, simpler version of CONTRIBUTING.md for casual contributions, as contributions need to be documented according to the new branch structure nodejs/node will have. With the new branches hosting the different versions, contributors will need to be aware which branch they need to file a pull request to and which version are their issues related to.

Jump on the conversation on the [nodejs/node issue page](https://github.com/nodejs/node/issues/2327).

### Community Updates

- We _still_ need a V8 maintainer for our LTS build! Head on over [to GitHub](https://github.com/nodejs/LTS/issues/28) to see if the requirements match your capabilities.
- As mentioned up top, io.js v4.x will be Node.js v4.x. Or as [Mikeal Rogers](http://twitter.com/mikeal) said, [4.0 is the new 1.0](https://medium.com/node-js-javascript/4-0-is-the-new-1-0-386597a3436d).
- The Node.js Collaborator Summit was hosted on 6th – 7th August in San Fransisco. You can see the notes in the [nodejs/summit](https://github.com/nodejs/summit) repository, [the GitHub issue](https://github.com/nodejs/summit/issues/11), or on [the Google Docs folder](https://drive.google.com/folderview?id=0B4tYrG9tjAW0fk9VOG52R2VQMmZHNWdpYnpqWU5MYUlfamNycktmeEl3UkNhdk1PS1Rid3c&usp=sharing).
- [nodejs/collaboration](https://github.com/nodejs/collaboration) was made along with [the team](https://github.com/orgs/nodejs/teams/collaboration) to help with communication between Working Groups, as well as getting better ways to have evangelism, website, documentation and the 30+ i18n groups work together.
- The new [Intl WG](https://github.com/nodejs/Intl) had [a meeting](https://github.com/nodejs/Intl/issues/8) on August 11th.
- [David Walsh](https://twitter.com/davidwalshblog) has written about [using yargs to get Node.js command line arguments](http://davidwalsh.name/nodejs-arguments-yargs/).
- [Reindex](https://www.reindex.io/) has a post about [building a GraphQL server with Node.js and SQL](https://www.reindex.io/blog/building-a-graphql-server-with-node-js-and-sql/)
- [Amine Kabab](https://twitter.com/aminekabab) made [a QR code generator library for Node.js](https://github.com/kabab/qr-cairo/)

If you have spotted or written something about Node.js and io.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

- [BrazilJS Conf](http://braziljs.com.br/) tickets are on sale, August 21st - 22nd at Shopping Center BarraShoppingSul
- [NodeConf EU](http://nodeconf.eu/) tickets are on sale, September 6th - 9th at Waterford, Ireland
- [Node.js Italian Conference](http://nodejsconf.it/) tickets are on sale, October 10th at Desenzano - Brescia, Italy
- [JSConf CO](http://www.jsconf.co/), October 16th - 17th at Ruta N, Medellin
- [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.

Have an event about Node.js and io.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
