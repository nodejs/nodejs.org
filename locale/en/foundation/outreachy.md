---
title: Outreachy + Node.js
layout: foundation.hbs
---

### Outreachy

**Welcome to Node.js + Outreachy**  
Outreachy provides a collaborative environment in which newcomers from underrepresented backgrounds can get help working on their first contributions and a focused opportunity for them to dedicate a full-time effort to learning and contributing to FOSS. The program also assists people with finding mentors to help them with their projects. By participating in the program, interns develop a good understanding of the power of FOSS and skills necessary to continue contributing to it.  

The Node.js project is excited to partner with Outreachy to invite newcomers with diverse perspectives into our community for the December 2016 cohort.  

Participation is open internationally to all women (cis and trans), trans men, and genderqueer people. Additionally, it's open to residents and nationals of the United States of any gender who are Black/African American, Hispanic/Latin@, American Indian, Alaska Native, Native Hawaiian, or Pacific Islander. We are planning to expand the program to more participants from underrepresented backgrounds in the future.  

**THANKS**  
Our sincerest gratitude goes out to the sponsoring organizations supporting Node.js in this awesome effort: Google, Intel, IBM, and Node.js Foundation.

**Quick links**

- [The Node.js project on GitHub](https://github.com/nodejs/node)
- [Good first contributions in the Node.js issue tracker](https://github.com/nodejs/node/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+contribution%22)
- [Getting started for applicants](https://wiki.gnome.org/Outreachy#Introduction)
- [Mentor prep](https://wiki.gnome.org/Outreachy/Admin/InfoForMentors)

**Schedule**

- October 17: application deadline at 7pm UTC
- October 17 - November 8: applicants are encouraged to continue making contributions for the project they applied for; submitted applications are open for editing
- November 8: accepted participants announced on this page at 4pm UTC
- December 6, 2016 - March 6, 2017: internship period

**What is Node.js?**  
From our guiding principles, "The goal of the Node.js project is to provide a JavaScript-based application development platform that is current, reliable, and stable.  

Contributors to Node.js work on behalf of the community of users who build their applications and businesses with the Node.js platform. Accordingly, contributors must demonstrate an ongoing commitment, not only to the Project, but to the stability and vitality of the community as a whole...  

The Node.js community is large, inclusive, and excited to enable as many users to contribute in whatever way they can. If you want to report an issue, help with documentation or contribute to the code base of the project, you’ve come to the right place."  

**PARTICIPANTS**

How can I familiarize myself with the community and project?

- We’re on IRC! Connect to irc.freenode.net in the #node.js channel with an IRC client or connect in your web browser to the channel using [freenode's WebChat](http://webchat.freenode.net/?channels=node.js).

- The [GitHub issues list](https://github.com/nodejs/node/issues) is the place for discussion of Node.js core features.
- Read more about our   [contributing](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md) and [collaborator](https://github.com/nodejs/node/blob/master/COLLABORATOR_GUIDE.md) guidelines  
- Check out some of our [international communities](https://nodejs.org/en/get-involved/)  
- Introduce yourself to the project's mentors and discuss what your tasks during the internship program would be.

**How to apply and application tips**

The application process is described in detail at https://wiki.gnome.org/OutreachProgramForWomen#Send_in_an_Application. A contribution is required and you answer questions when you apply. You are expected to work full-time on the internship although you can indicate any pre-planned time off in your application.  

In order to make your application stronger, here are a few things you could consider including:

- Previously worked projects/coding experience. If it is docs, related experience if any
- What do you intend to learn from the selected project? Or rationale behind choosing the specific project
- How do you think this internship is going to help you achieve what you wanted?
- Your next choice of projects if your first choice is not available

Also include information or link on your merged patch (which is a requirement to be considered for the internship). Please be available and responsive throughout the application period so we can work with you on improving your application.

**Questions about the Node.js project?**

With open source, just finding out where to ask your question can be intimidating. Email [Tracy Hinds](tracyhinds@linuxfoundation.org) if you have any questions during the application process and she’ll be happy to find the person most helpful, if she isn’t it.

**MENTORS**

For information about expectations for mentors and to volunteer to be a mentor, see [Outreachy mentors](https://wiki.gnome.org/Outreachy/Admin/InfoForMentors).

The volunteer mentors are:

- [Franziska Hinkelmann](https://plus.google.com/u/1/116713283748910059509?prsrc=4)
- [Rich Trott](mailto:rtrott@gmail.com), IRC: Trott
- [Dan Shaw](mailto:dshaw@nodesource.com), IRC: dshaw
- [Myles Borins](mailto:myles.borins@gmail.com), IRC: thealphanerd
- [Priyanka Sulugodua Prakash Murthy](mailto:priyanka.sulugodu.prakash.murthy@intel.com)

**Project administrator**

- Tracy Hinds, Education Community Manager at the Node.js Foundation   
Reach her at [tracyhinds@linuxfoundation.org](tracyhinds@linuxfoundation.org) or on IRC: hackygolucky

**PROJECTS**

**Improve the vm module in Node.js core**

*Mentor:* [Franziska Hinkelmann](mailto:franzih@google.com)

The vm module is used in the Node.js command line and in DOM implementations, such as jsdom. Sadly, there are many open issues related to the module and it needs some love. Recent changes in V8, Node's JS engine, now make it possible to fix several of the issues and improve the vm code base significantly.    

This project includes learning how to build and debug Node.js core, how the vm module is implemented, some Node internals about the global proxy, and how to use the V8 API. You will be coding in C++ and write tests in JavaScript. No worries if you're not too familiar with these languages, a desire to learn and curiosity are much more important than a fixed skill set.

Mentor based in Europe.  
https://github.com/nodejs/node/issues/6283

-------------------------

**Improve test coverage and expand feature set for the Node.js debugger**  

*Mentor:* [Rich Trott](mailto:rtrott@gmail.com)  

The Node.js debugger built-in debugger is minimal. Test coverage is spotty and there may be opportunities for expanded functionality.

This project includes learning how to build Node.js core, how the debugger is implemented, and how testing is done in Node.js core. You will be coding in JavaScript and possibly a little C++.

Mentor based in North America (San Francisco).

-------------------------

**Project TBD**  
*Mentor:* [Dan Shaw](mailto:dshaw@nodesource.com)  

-------------------------

**Improving Serial Communication in Node.js by diving into libuv**

*Mentor:* [Myles Borins](mailto:mborins@myles.borins@gmail.com )

One of the strengths of Node.js is the ability to run on various different operating systems. One of the ways in which this is accomplished is via [libuv](https://github.com/libuv/libuv), a library for cross platform asynchronous I/O. Currently, doing serial communication in Node.js requires installing a module such as [node-serialport](https://github.com/EmergingTechnologyAdvisors/node-serialport) which relies on natively compiled components. Having natively compiled components in a node module make it more difficult for individuals to install, and has been a blocker for new developers interested in getting involved with node-bots.

In this project, you will collaborate with members of the Node.js project, and members of the libuv project, to define and implement the necessary apis to remove the need for natively compiled components to support serial communication in Node.js. This will involve planning, implementation across code bases, and a certain level of open source politics to ensure that the work being done will fit the needs of the consumers in the Node.js ecosystem.

The project will be broken down into a number of stages including:

 * Getting familliar with the Node.js code base
 * Getting your first commits into Node.js core
   - A list of good first contributions can be found [here](https://github.com/nodejs/node/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+contribution%22)
 * Getting familiar with the libuv code base
 * Getting your first commits into libuv
   - A list of future milestones can be found [here](https://github.com/libuv/libuv/milestone/5)
 * Defining and implementing the interfaces needed in libuv for implementing Serial communication
 * Defining and implementing the interfaces needed in Node.js to expose the libuv api's needed for implementing Serial communication
 * Collaborating with community projects to define and support an upgrade path.

 Mentor in United States (NYC)  

 -------------------------

**Node.js in Machine Learning**

*Mentor:* [Priyanka Sulugodua Prakash Murthy](mailto:priyanka.sulugodu.prakash.murthy@intel.com)

There is a package called TensorFlow https://www.tensorflow.org/ and a Node.js package for it
https://github.com/nikhilk/node-tensorflow

The mentee should review and learn the node-tensorflow module to find what we can get from this. The goal of the project for the mentee would be to get familiar with the module and teach the mentoring team.
