---
date: '2011-09-08T21:25:43.000Z'
category: uncategorized
title: 'ldapjs: A reprise of LDAP'
layout: blog-post.hbs
author: mcavage
---

This post has been about 10 years in the making. My first job out of college was at IBM working on the [Tivoli Directory Server](http://www-01.ibm.com/software/tivoli/products/directory-server/), and at the time I had a preconceived notion that working on anything related to Internet RFCs was about as hot as you could get. I spent a lot of time back then getting "down and dirty" with everything about LDAP: the protocol, performance, storage engines, indexing and querying, caching, customer use cases and patterns, general network server patterns, etc. Basically, I soaked up as much as I possibly could while I was there. On top of that, I listened to all the "gray beards" tell me about the history of LDAP, which was a bizarre marriage of telecommunications conglomerates and graduate students. The point of this blog post is to give you a crash course in LDAP, and explain what makes [ldapjs](http://ldapjs.org) different. Allow me to be the gray beard for a bit...

## What is LDAP and where did it come from?

Directory services were largely pioneered by the telecommunications companies (e.g., AT&T) to allow fast information retrieval of all the crap you'd expect would be in a telephone book and directory. That is, given a name, or an address, or an area code, or a number, or a foo support looking up customer records, billing information, routing information, etc. The efforts of several telcos came to exist in the [X.500](https://en.wikipedia.org/wiki/X.500 'X.500') standard(s). An X.500 directory is one of the most complicated beasts you can possibly imagine, but on a high note, there's probably not a thing you can imagine in a directory service that wasn't thought of in there. It is literally the kitchen sink. Oh, and it doesn't run over IP (it's _actually_ on the [OSI](https://en.wikipedia.org/wiki/OSI_model 'OSI Model') model).

Several years after X.500 had been deployed (at telcos, academic institutions, etc.), it became clear that the Internet was "for real." [LDAP](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol 'LDAP'), the "Lightweight Directory Access Protocol," was invented to act purely as an IP-accessible gateway to an X.500 directory.

At some point in the early 90's, a [graduate student](https://en.wikipedia.org/wiki/Tim_Howes 'Tim Howes') at the University of Michigan (with some help) cooked up the "grandfather" implementation of the LDAP protocol, which wasn't actually a "gateway," but rather a stand-alone implementation of LDAP. Said implementation, like many things at the time, was a process-per-connection concurrency model, and had "backends" (aka storage engine) for the file system and the Unix DB API. At some point the [Berkeley Database](http://www.oracle.com/technetwork/database/berkeleydb/index.html 'Berkeley Database') (BDB) was put in, and still remains the de facto storage engine for most LDAP directories.

Ok, so some a graduate student at UM wrote an LDAP server that wasn't a gateway. So what? Well, that UM code base turns out to be the thing that pretty much every vendor did a source license for. Those graduate students went off to Netscape later in the 90's, and largely dominated the market of LDAP middleware until [Active Directory](https://en.wikipedia.org/wiki/Active_Directory 'Active Directory') came along many years later (as far as I know, Active Directory is "from scratch", since while it's "almost" LDAP, it's different in a lot of ways). That Netscape code base was further bought and sold over the years to iPlanet, Sun Microsystems, and Red Hat (I'm probably missing somebody in that chain). It now lives in the Fedora umbrella as '[389 Directory Server](http://directory.fedoraproject.org/).' Probably the most popular fork of that code base now is [OpenLDAP](http://www.openldap.org/).

IBM did the same thing, and the Directory Server I worked on was a fork of the UM code too, but it heavily diverged from the Netscape branches. The divergence was primarily due to: (1) backing to DB2 as opposed to BDB, and (2) needing to run on IBM's big iron like OS/400 and Z series mainframes.

Macro point is that there have actually been very few "fresh" implementations of LDAP, and it gets a pretty bad reputation because at the end of the day you've got 20 years of "bolt-ons" to grad student code. Oh, and it was born out of ginormous telcos, so of course the protocol is overly complex.

That said, while there certainly is some wacky stuff in the LDAP protocol itself, it really suffered from poor and buggy implementations more than the fact that LDAP itself was fundamentally flawed. As [engine yard pointed out a few years back](http://www.engineyard.com/blog/2009/ldap-directories-the-forgotten-nosql/), you can think of LDAP as the original NoSQL store.

## LDAP: The Good Parts

So what's awesome about LDAP? Since it's a directory system it maintains a hierarchy of your data, which as an information management pattern aligns with _a lot_ of use case (the quintessential example is white pages for people in your company, but subscriptions to SaaS applications, "host groups" for tracking machines/instances, physical goods tracking, etc., all have use cases that fit that organization scheme). For example, presumably at your job you have a "reporting chain." Let's say a given record in LDAP (I'll use myself as a guinea pig here) looks like:

```
firstName: Mark
lastName: Cavage
city: Seattle
uid: markc
state: Washington
mail: mcavagegmailcom
phone: (206) 555-1212
title: Software Engineer
department: 123456
objectclass: joyentPerson
```

The record for me would live under the tree of engineers I report to (and as an example some other popular engineers under said vice president) would look like:

```
             uid=david
              /
         uid=bryan
      /      |      \
uid=markc  uid=ryah  uid=isaacs
```

Ok, so we've got a tree. It's not tremendously different from your filesystem, but how do we find people? LDAP has a rich search filter syntax that makes a lot of sense for key/value data (far more than tacking Map Reduce jobs on does, imo), and all search queries take a "start point" in the tree. Here's an example: let's say I wanted to find all "Software Engineers" in the entire company, a filter would look like:

```
(title="Software Engineer")
```

And I'd just start my search from 'uid=david' in the example above. Let's say I wanted to find all software engineers who worked in Seattle:

```
(&(title="Software Engineer")(city=Seattle))
```

I could keep going, but the gist is that LDAP has "full" boolean predicate logic, wildcard filters, etc. It's really rich.

Oh, and on top of the technical merits, better or worse, it's an established standard for both administrators and applications (i.e., most "shipped" intranet software has either a local user repository or the ability to leverage an LDAP server somewhere). So there's a lot of compelling reasons to look at leveraging LDAP.

## ldapjs: Why do I care?

As I said earlier, I spent a lot of time at IBM observing how customers used LDAP, and the real items I took away from that experience were:

- LDAP implementations have suffered a lot from never having been designed from the ground up for a large number of concurrent connections with asynchronous operations.
- There are use cases for LDAP that just don't always fit the traditional "here's my server and storage engine" model. A lot of simple customer use cases wanted an LDAP access point, but not be forced into taking the heavy backends that came with it (they wanted the original gateway model!). There was an entire "sub" industry for this known as "[meta directories](https://en.wikipedia.org/wiki/Metadirectory 'Metadirectory')" back in the late 90's and early 2000's.
- Replication was always a sticking point. LDAP vendors all tried to offer a big multi-master, multi-site replication model. It was a lot of "bolt-on" complexity, done before the [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem 'CAP Theorem') was written, and certainly before it was accepted as "truth."
- Nobody uses all of the protocol. In fact, 20% of the features solve 80% of the use cases (I'm making that number up, but you get the idea).

For all the good parts of LDAP, those are really damned big failing points, and even I eventually abandoned LDAP for the greener pastures of NoSQL somewhere along the way. But it always nagged at me that LDAP didn't get it's due because of a lot of implementation problems (to be clear, if I could, I'd change some aspects of the protocol itself too, but that's a lot harder).

Well, in the last year, I went to work for [Joyent](http://www.joyent.com/), and like everyone else, we have several use problems that are classic directory service problems. If you break down the list I outlined above:

- **Connection-oriented and asynchronous:** Holy smokes batman, [Node.js](https://nodejs.org/) is a completely kick-ass event-driven asynchronous server platform that manages connections like a boss. Check!
- **Lots of use cases:** Yeah, we've got some. Man, the [sinatra](http://www.sinatrarb.com/)/[express](http://expressjs.com/) paradigm is so easy to slap over anything. How about we just do that and leave as many use cases open as we can. Check!
- **Replication is hard. CAP is right:** There are a lot of distributed databases out vying to solve exactly this problem. At Joyent we went with [Riak](http://www.basho.com/). Check!
- **Don't need all of the protocol:** I'm lazy. Let's just skip the stupid things most people don't need. Check!

So that's the crux of ldapjs right there. Giving you the ability to put LDAP back into your application while nailing those 4 fundamental problems that plague most existing LDAP deployments.

The obvious question is how it turned out, and the answer is, honestly, better than I thought it would. When I set out to do this, I actually assumed I'd be shipping a much smaller percentage of the RFC than is there. There's actually about 95% of the core RFC implemented. I wasn't sure if the marriage of this protocol to node/JavaScript would work out, but if you've used express ever, this should be _really_ familiar. And I tried to make it as natural as possible to use "pure" JavaScript objects, rather than requiring the developer to understand [ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One 'ASN.1') (the binary wire protocol) or the [LDAP RFC](http://tools.ietf.org/html/rfc4510 'RFC 4510') in detail (this one mostly worked out; ldap_modify is still kind of a PITA).

Within 24 hours of releasing ldapjs on [Twitter](http://twitter.com/#!/mcavage/status/106767571012952064 'twitter'), there was an [implementation of an address book](https://gist.github.com/1173999 'github ldapjs address book') that works with Thunderbird/Evolution, by the end of that weekend there was some [slick integration with CouchDB](/static/images/blog/uncategorized/ldapjs-a-reprise-of-ldap/uR16U.png), and ldapjs even got used in one of the [node knockout apps](http://twitter.com/#!/jheusala/status/108977708649811970). Off to a pretty good start!

## The Road Ahead

Hopefully you've been motivated to learn a little bit more about LDAP and try out [ldapjs](http://ldapjs.org). The best place to start is probably the [guide](http://ldapjs.org/guide.html 'ldapjs guide'). After that you'll probably need to pick up a book from [back in the day](http://www.amazon.com/Understanding-Deploying-LDAP-Directory-Services/dp/0672323168). ldapjs itself is still in its infancy; there's quite a bit of room to add some slick client-side logic (e.g., connection pools, automatic reconnects), easy to use schema validation, backends, etc. By the time this post is live, there will be experimental [dtrace](https://en.wikipedia.org/wiki/DTrace) support if you're running on Mac OS X or preferably Joyent's [SmartOS](http://smartos.org/) (shameless plug). And that nagging percentage of the protocol I didn't do will get filled in over time I suspect. If you've got an interest in any of this, send me some pull requests, but most importantly, I just want to see LDAP not just be a skeleton in the closet and get used in places where you should be using it. So get out there and write you some LDAP.
