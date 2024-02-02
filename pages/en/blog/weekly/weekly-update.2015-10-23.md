---
date: '2015-10-23T12:00:00.000Z'
category: weekly
title: Weekly Update - Oct 23rd, 2015
layout: blog-post.hbs
author: 'Minwoo Jung (@jmwsoft)'
---

### Node.js News — October 23rd

Node.js v5.0.0 release proposal

### Node.js v5.0.0 release proposal

This week we have one release proposal: [Node.js v5.0.0](https://github.com/nodejs/node/pull/3466). Complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

### Notable changes

- console: console.time has been changed to log with sub-millisecond accuracy (Michaël Zasso) [#3166](https://github.com/nodejs/node/pull/3166).
  - Values reported by console.time will now have 3 decimals of accuracy added.
- fs: Added file descriptor support to \*File functions (Johannes Wüller) [#3163](https://github.com/nodejs/node/pull/3163)
  - fs.readFile, fs.writeFile, and fs.appendFile now also accept a file descriptor as their first argument.

### Node.js foundation is considering an iteration on the official logo

- [Please click here](https://github.com/nodejs/evangelism/issues/179) to post images and ideas.
- The Marketing Committee will look over ideas at some point in the future and potentially select one or take some of the ideas/direction and handoff to a designer.
- Final logo will have to be approved by the Board of Directors.

### Node.js foundation announces programming for Node.js interactive

- The Node.js Foundation, a community-led and industry-backed consortium to advance the development of the Node.js platform, announced initial programming for Node.js Interactive.
- This inaugural event, which is being led by the newly formed Node.js Foundation in cooperation with the Linux Foundation, will be held December 8-9, 2015, in Portland, Ore.
- Node.js Interactive will also focus on three tracks: Frontend, Backend and the Internet of Things (IoT).

See /blog/announcements/interactive-2015-programming for more information.

### NodeUp Podcast

- NodeUp podcast episode 92 was published this week: <http://nodeup.com/ninetytwo>.
- The subject of the podcast is Node 4.0 and the participants are Rod Vagg, Evan Lucas, and Rich Trott.

### Good First Contribution

- Start getting involved in Node.js with [`good-first-contribution` issues](https://github.com/nodejs/node/labels/good%20first%20contribution).
- Want to help others with issues? You can start simply, by answering [open questions](https://github.com/nodejs/node/labels/good%20first%20contribution) with `good-first-contribution` tag.

See https://github.com/nodejs/node/labels/good%20first%20contribution for more information.

### Community Updates

- [Node.js for the Real World](http://www.technology-ebay.de/the-teams/mobile-de/blog/nodejs-real-world), "Node.js as back-end for the user-interface layer is a perfect usecase"

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

- [EmpireNode](http://2015.empirenode.org/), October 23rd at New York, US.
- [NodeFest](http://nodefest.jp/2015/), November 7th at Tokyo, Japan
- [Node Knockout](http://www.nodeknockout.com/), November 7 - 8th, Worldwide
- [Node Girls London](https://nodegirls.typeform.com/to/atW4HR), November 7th at London, UK
- [Playnode](http://playnode.io/), November 12nd at Seoul, South Korea
- [Nodevember](http://nodevember.org/), November 14th - 15th at Nashville, Tennessee, US.
- [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain
- [CampJS VI](http://vi.campjs.com), November 20 – 23th at Queensland, Australia
- [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8-9th at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
