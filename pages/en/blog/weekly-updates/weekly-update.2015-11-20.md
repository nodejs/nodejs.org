---
date: '2015-11-20T12:00:00.000Z'
category: weekly
title: Weekly Update - Nov 20th, 2015
layout: blog-post.hbs
author: 'Minwoo Jung (@jmwsoft)'
---

### Node.js News — November 20th

Node.js v5.1.0 (Current) is released

### Node.js v5.1.0 (Current) Releases

This week we have one release: [Node.js v5.1.0 (Current)](/blog/release/v5.1.0/). Complete changelog from previous releases can be found [on GitHub](https://github.com/nodejs/node/blob/main/CHANGELOG.md).

### Notable changes

- **doc**: All of the API docs have been re-ordered so as to read in alphabetical order (Tristian Flanagan) [#3662](https://github.com/nodejs/node/pull/3662).
- **http_parser**: update http-parser to 2.6.0 from 2.5.0 (James M Snell) [#3569](https://github.com/nodejs/node/pull/3569).
  - Now supports the following HTTP methods: `LINK`, `UNLINK`, `BIND`, `REBIND`, `UNBIND`.
  - Also added ACL and IPv6 Zone ID support.
- **npm**: upgrade npm to 3.3.12 from v3.3.6 (Rebecca Turner) [#3685](https://github.com/nodejs/node/pull/3685).
  - See the release notes for [v3.3.7](https://github.com/npm/npm/releases/tag/v3.3.7), [v3.3.8](https://github.com/npm/npm/releases/tag/v3.3.8), [v3.3.9](https://github.com/npm/npm/releases/tag/v3.3.9), [v3.3.10](https://github.com/npm/npm/releases/tag/v3.3.10), [v3.3.11](https://github.com/npm/npm/releases/tag/v3.3.11), and [v3.3.12](https://github.com/npm/npm/releases/tag/v3.3.12) for more details.

### npm announces Private Packages for Organizations

- npm released a set of features: Private Packages for Organizations.
- This release allows teams to use private npm packages more effectively.
- It’s intended for businesses that manage developer teams, with varying permissions and multiple projects.

See http://blog.npmjs.org/post/133542170540/private-packages-for-organizations for more information.

### Open-sourced Visual Studio Code is based on Node

- Microsoft has open-sourced Visual Studio Code and it's a lot of TypeScript and Node.
- Visual Studio Code is based on Electron, a framework which is used to deploy Node.js applications for the desktop running on Blink layout engine.

See https://github.com/Microsoft/vscode for more information.

### NodeUp

- [NodeUp 95](http://nodeup.com/ninetyfive): A Build/CI Show with Rod Vagg, Alexis Campailla, João Reis, and Hans Kristian Flaatten.

### Community Updates

- [Node Knockout](http://www.nodeknockout.com/), "Node Knockout winners have been announced."
- [Introduction to Testing Node.js](https://www.youtube.com/watch?v=u2XCdkL4bWI), "A video of Jordan Kasper how to test Node.js apps with Mocha."

If you have spotted or written something about Node.js, do come over to our [Evangelism team repo](https://github.com/nodejs/evangelism) and suggest it on the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.

### Upcoming Events

- [NodeConf Barcelona](https://ti.to/barcelonajs/nodeconf-barcelona-2015), November 21st at Barcelona, Spain
- [CampJS VI](http://vi.campjs.com), November 20th – 23th at Queensland, Australia
- [Node.js Interactive](http://events.linuxfoundation.org/events/node-interactive), December 8th - 9th at Portland, US.

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues), specifically the Weekly Updates issue.
