---
date: '2024-12-28T12:00:00.000Z'
category: announcements
title: Making Node.js Downloads Reliable
layout: blog-post
author: flakey5
---

Last year, we shared [the details behind Node.js' brand new website](https://nodejs.org/en/blog/announcements/diving-into-the-nodejs-website-redesign).
Today we're back, talking about the new infrastructure serving Node.js' release assets.

<!-- I don't really like this paragraph -->

This blog post goes into the nitty-gritty details on the web infrastructure behind Node.js, its history, and where it stands today.
It also goes into specifics on what we had in mind and were prioritizing with this overhaul to our infrastructure.

<!-- I feel like there should be more intro here -->

## Some Brief History

At the start of the project in 2009, Node.js release assets (binaries, documentation) were stored on a publicly accessible S3 bucket.
Around May of 2010, this was changed to be a VPS that hosted the release assets and the Node.js website.

<!-- this is awkward -->

When the io.js fork happened in 2014, a VPS was also used.

After the Node.js and io.js merge in 2015, io.js' VPS (which will be referred to as the origin server from hereon) was repurposed to host both io.js and Node.js releases along with the Node.js website, and remained that way up until recently.

The architecture looked like this:

![A diagram of the old infrastructure's diagram. Cloudflare is used as a cache and NGINX is used for serving static files.](/static/images/blog/announcements/old-release-asset-infra.png)

## Growing Pains

Nowadays, the nodejs.org domain sees over 3 billion requests and 2+ petabytes of traffic per month, with the majority of that going towards release assets.

<!-- cf dash screenshots? -->

This averages to about 1,157 requests per second, with an average bandwidth of 771 mb per second.

<details>
    <summary>Math</summary>
<!-- todo double check w/ up to date numbers -->
3,000,000,000 requests per month / 30 days / 24 hours / 60 minutes / 60 seconds = ~1157 requests/second.
2,000,000,000 mb per month / 30 days / 24 hours / 60 minutes / 60 seconds = 771 mb/second.
</details>

The origin server didn't have enough resources for this, and it struggled to keep up with the demand.
The website being moved off of the origin server as part of the redesign effort did help, but it still wasn't enough.

Cloudflare caching was being used rather inefficiently as well.
Due to there not being a great way to only purge what we needed to when a release was made, we ended up having to purge everything.
Because Node.js has nightly releases, this means that everyday at midnight UTC the cache gets purged and the origin server gets flooded with requests, effectively DDoS'ing it.

There were also a handful of other issues with the origin server pertaining to its maintenance:

- Documentation of things running on the server was spotty; some things were well documented and others not at all
- Changes performed in the [nodejs/build](https://github.com/nodejs/build) repository needed to be deployed manually by a Build WG member with access. There was also no guarantee that what's in the build repository is what's actually on the server.
- There's no staging environment other than a backup instance.
- Rollbacks could only be done via disk images through the VPS providers' web portal.

## Attempts Were Made

All of these issues combined created for scenarios where the origin server wasn't touched unless necessary, including a period in which it had over 3 years of uptime.
These factors also contributed to incidents such as the one that occurred from [March 15th, 2023 to March 17th, 2023](/en/blog/announcements/node-js-march-17-incident), where the Node.js release assets were unavailable for 2 days due to the origin server being overloaded and improper caching rules.
Between incidents such as that and the daily outages that were occuring, users were being effected and were painfully aware of the unreliability of the infrastructure.

This needed to be fixed.

However, attempts made to remediate these issues in this infrastructure could only go so far.
The NGINX configuration was changed to modify its resource consumption and add in missing documentation.
Cloudflare WAF was integrated to block spammy requests from repositories such as Artifactory.
Load balancing changes were made to try to help lessen the load.
But, these ultimately weren't as effective as they needed to be.

## The Rewrite

In August of 2023, [Claudio Wunder](https://github.com/ovflowd) and [I (flakey5)](https://github.com/flakey5) started working on a proof-of-concept for a new way to serve Node.js release assets.

The idea was "simple": create a new service that solved all of the issues we had with the previous infrastructure and showed no noticeable difference from the old infrastructure to users.
In order to meet these requirements, we prioritized three main goals with this new service:

1. Reliabiliy: The service needs to be as close to 100% uptime as possible.
2. Maintainability: Maintainers should not have to worry about things toppling over because they changed something. The service needs to be well-documented and as clean and simple as possible.
3. Efficiency: Whatever platform was used, the service would need to make full use of it to provide the best performance and experience as possible.

In order to meet these requirements, we ended up using [Cloudflare Workers](https://developers.cloudflare.com/workers) and [R2](https://developers.cloudflare.com/r2) for a handful of reasons:

1. Workers and R2 are, and historically have been, reliable and fast.
2. Workers takes care of the infrastructure for us, so we just need to maintain the service itself. This heavily lessens the cost of maintenance, especially for a team of volunteers.
3. Node.js had already had previous usage of Cloudflare services; it makes sense to look into expanding it.
4. Pricing. Cloudflare was gracious enough to provide Node.js with free access to Workers and R2 under [Project Alexandria](https://www.cloudflare.com/lp/project-alexandria).

In September of 2023, the proof-of-concept was ready to be reviewed, and an issue was made in the nodejs/build repository ([#3461](https://github.com/nodejs/build/issues/3461)) seeking approval from the Build WG.

After the Build WG discussed the change, it was approved and we started working on getting the service, which is now referred to as the Release Worker, deployed to the nodejs.org domain.

## The Journey to Production

With developing the Release Worker came a lot of trial and error and learning over numerous iterations of the service.
It needed to have all of the same features and similar, if not the exact same, behaviors as its predecessor, NGINX.

### What It Needed To Do

For starters, it needed to be able to provide the latest releases of Node.js as soon as soon as they're released.

Secondly, it needed to handle routing correctly.
Most assets don't have 1:1 mappings of their URL to where they are located in the file system.
Where a URL maps to can even change depending on the Node.js version that's being requested.
For instance,

| URL                               | File Path                              |
| --------------------------------- | -------------------------------------- |
| `/dist/index.json`                | `nodejs/release/index.json`            |
| `/dist/latest-iron/...`           | `nodejs/release/v20.x.x/...`           |
| `/docs/v0.1.20/...`               | `nodejs/docs/v0.1.20/...`              |
| `/docs/v22.0.0/...`               | `nodejs/release/v22.0.0/docs/api/...`  |
| `/dist/v0.4.9/node-v0.4.9.tar.gz` | `nodejs/release/node-v0.4.9.tar.gz`    |
| `/dist/v0.4.9/SHASUMS256.txt`     | `nodejs/release/v0.4.9/SHASUMS256.txt` |

This behavior was created from multiple different changes throughout the release cycle and the way release assets were distributed, and was achieved through symlinks.
However, R2 doesn't support symlinks, meaning we needed to come up with a solution on our own.

Finally, we needed to meet the reliability goal.
To do this, we implemented three things:

1. Any request to R2 that fails is retried 3 times (in additon to the retries tha Workers already performs).
2. A "fallback" system. Any request to R2 that fails all retries is rewritten to the old infrastructure.
3. When an error does happen, it's recorded in [Sentry](https://sentry.io/welcome) and we're notified so we can take appropriate action.

### The Iterations

We first started off with an incredibly simple worker.
Given a path in the URL, it checked if the file requested existed in the R2 bucket.
If it did, it returned it.
Otherwise, it rewrote the request back to the origin server.
For requests that resulted in a directory listing, the worker just forwarded those over to the origin server.
This iteration obviously didn't cover nearly any of the requirements, so it was back to the drawing board.

The second iteration was based off the popular R2 directory listing library [render2](https://www.npmjs.com/package/render2), developed by [Kotx](https://github.com/Kotx).
The library worked well for the more generic use cases we needed to cover, however, it fell short in the more unique use cases that we had.
So we forked it, adding what we needed for it to work for us.
However, it became rather messy and thus fell short of our maintainability goal.

This led us to our third iteration, which was a complete rewrite while still keeping some aspects of render2.
It worked for the most part, but this too was also a mess and didn't meet our maintainability goal.
It was also designed in the exact way that we needed the service to behave as well.
If we needed to change that behavior in any way, we would need to refactor significant portions of the codebase.
We knew we could do better than this.

This led us to the fourth and current iteration of the Release Worker, which was yet again another rewrite.
This time however, it was designed to be a lot more modular and with a middleware-centric design.
This allowed for code that was a lot easier to keep track of and maintain, and, as of November 2024, is what is currently deployed to production.

## Maintainability

As said in our previous blog post on the website redesign, an open source project is only as good as its documentation.
In order for the Release Worker to be maintainable, it needed to well documented.

This was achieved not only through thorough comments in the codebase but also documents such as,

- [README](https://github.com/nodejs/release-cloudflare-worker/tree/main/README.md)
- [Collaborator Guide](https://github.com/nodejs/release-cloudflare-worker/tree/main/COLLABORATOR_GUIDE.md)
- [Contributing Guide](https://github.com/nodejs/release-cloudflare-worker/tree/main/CONTRIBUTING.md)
- [General Documentation](https://github.com/nodejs/release-cloudflare-worker/blob/main/docs) on things
- [Standard Operating Procedures](https://github.com/nodejs/release-cloudflare-worker/blob/main/docs/sops) for things such as incident flows.

## What's next?

The work isn't done _just_ yet.
We still want to,

- Look into any performance improvements that could be made.
  - This includes looking into integrating [Cloudflare KV](https://developers.cloudflare.com/kv/) for directory listings.
- Have better tests and a better development environment ([PR!](https://github.com/nodejs/release-cloudflare-worker/pull/252)R)
- Metrics to give us more visibility into how the Release Worker is behaving and if there's anything that we can improve.

## Thanks

Many people and organizations have contributed to this effort in many different ways.
We'd like to thank:

- All of the [contributors and collaborators](https://github.com/nodejs/release-cloudflare-worker/graphs/contributors) that make this project possible.
- [Cloudflare](https://cloudflare.com) for providing the infrastructure that serves Node.js' Website and the Release Worker. Also specifically to the R2 team for the technical support they have given us.
- [Sentry](https://sentry.io/welcome/) for providing an open source license for their error reporting, monitoring, and diagnostic tools.
- [OpenJS Foundation](https://openjsf.org) for their support and guidance.

> Here is your weekly reminder that the Node.js project is driven by volunteers. Therefore every feature that lands is because someone spent time (or money) to make it happen. This is called Open Governance.
> <cite>[Matteo Collina, via social media](https://x.com/matteocollina/status/1770496526424351205?s=46&t=22eoAstJVk5l46KQXYEk5Q)</cite>

Want to get involved? [Check out the project on GitHub](https://github.com/nodejs/release-cloudflare-worker).

> Fun fact! Did you know that Node.js has [a status page](https://status.nodejs.org)? No? You're not alone! We've been rather bad at using it to communicate these issues to users, but we're working on improving that.
