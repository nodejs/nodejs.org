---
title: Weekly Update - Feb 22nd, 2016
author: Minwoo Jung (@jmwsoft)
date: 2016-02-22T12:00:00.000Z
status: publish
category: weekly
slug: weekly-update-2016-02-22
layout: blog-post.hbs
---

### Node.js News
Node v4.3.1 (LTS) is released.

### Notable changes

* **buffer**
  * make byteLength work with Buffer correctly (Jackson Tian)
    - [#4738](https://github.com/nodejs/node/pull/4738)
* **debugger** 
  * guard against call from non-node context (Ben Noordhuis)
    - [#4328](https://github.com/nodejs/node/pull/4328)
    - fixes segfaults in debugger
  * do not incept debug context (Myles Borins)
    - [#4819](https://github.com/nodejs/node/pull/4819)
    - fixes crash in debugger when using util methods
   
### New official Node.js logo
We are proud to introduce and unveil out new logo
![Node.js logo](https://cloud.githubusercontent.com/assets/43438/13207731/d7c62f3e-d94c-11e5-8ff8-f32c74b13cc3.png)
### Upcoming Events

* [NodeConf Adventure 2016](https://ti.to/nodeconf/adventure-2016), "First batch of NodeConf Adventure tickets are up!", June 9th–12th, 2016 - Walker Creek Ranch, Marin, CA, USA
* [NationJS Node Day Conference](http://nationjs.com/), TICKETS ARE AVAILABLE NOW, March 11, 2016 - Washington, DC

Have an event about Node.js coming up? You can put your events here through the [Evangelism team repo](https://github.com/nodejs/evangelism) and announce it in the [Issues page](https://github.com/nodejs/evangelism/issues/), specifically the Weekly Updates issue.
