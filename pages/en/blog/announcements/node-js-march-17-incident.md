---
date: '2023-03-23T20:10:01.466Z'
category: announcements
title: Node.js March 17th Infrastructure Incident Post-mortem
layout: blog-post.hbs
author: Matt Cowley, Claudio Wunder
---

# The Incident

Starting on March 15th and going through to March 17th (with much of the issue being mitigated on the 16th), users were receiving intermittent 404 responses when trying to download Node.js from nodejs.org, or even accessing parts of the website.

What surfaced as one issue, users seeing 404s, was actually the result of multiple compounding issues all happening at once:

- The Cloudflare config for nodejs.org had multiple Page Rules configured with "Cache Everything" enabled alongside "Browser/Edge Cache TTLs" being set. This resulted in any 404 responses from the origin server being cached by Cloudflare.

- The origin server for nodejs.org was being overloaded, and due to a recent configuration change, was now erroneously returning 404 responses for valid files when it was overloaded and couldn't read them from its disk.

- A build script bug caused by the recent migration of the website to Next.js resulted in the site being rebuilt and the entire Cloudflare cache being purged every five minutes, sending an abnormally high number of requests to the origin server and putting it under excessive load.

Together, these resulted in the origin server receiving far more requests than normal, failing to read files from its disk that should've existed, returning incorrect 404 responses, and Cloudflare then caching those 404s.

A large team came together to investigate this issue, with the full fix being put in place at approximately 8 PM UTC on the 16th. Many of the Cloudflare Page Rules that had been removed as part of this fix (that were causing the 404s to be cached) had cache TTLs for four hours, and so the full impact of this incident was not resolved until midnight UTC on the 17th.

Related to the 404s users were receiving, it was also discovered that requests to localised pages on nodejs.org weren't resolving as expected when a localised version didn't exist. Instead of falling back to the English version of the pages, they were returning a 404. A secondary update was made to the NGINX config for nodejs.org on the 17th that fixed this, as well as a further set of updates to reduce the load on the origin server.

## Lessons

We learnt a lot from this incident, not least about how our NGINX configuration for the website works and our Cloudflare setup. We've now got a much cleaner setup in both that should be more maintainable going forward, and that has more documentation for the future.

We also learnt from this that we need a staging environment for the website that mirrors the production setup across Cloudflare and NGINX so that major changes like the Next.js migration (and our later experimentation) can be validated against the production setup without risking impacting production itself.

We're also looking at what we can do for automated testing of the NGINX configuration for the website, testing happy paths in CI before any changes to it make their way to production.

## Details

We believe much of this stemmed from a recent change that was made to the NGINX config for nodejs.org as part of the migration of the site to Next.js. With the move to Next.js, the NGINX configuration was updated to more heavily use `try_files` for requests, gracefully returning the custom 404 page if files weren't found. This is a relatively standard way to use NGINX, and we believed it should've been fine.

However, when we started investigating this incident we noticed that the origin server was under far more load than it should've been. This excessive load on the origin server would sometimes cause it to fail to read a file from the disk even when it did exist and would appear to instead return an erroneous 404 response. We believe this erroneous 404 stems from the chain of `try_files` directives now used in our config, whereas before the changes it would've been a direct 5xx response from NGINX (though we're not sure we completely understand this failure mode still). That historical 5xx response would not be cached by Cloudflare, but now it was a 404 and Cloudflare was caching it!

Part of this extra load was due to a bug in one of the site build scripts caused by the Next.js update that was resulting in Cloudflare's cache for the domain being purged every five minutes. We'd accidentally caused this with the migration of the site to Next.js, as what was previously `en/index.html` on disk was now `en.html`, and our build script was still looking for the old file to check if the site had been built. Updating the script to look for the new file, `en.html`, stopped the continual rebuilds and cache purging.

At this point a lot of experimentation started happening in both our NGINX config and in Cloudflare to understand why disk reads were failing, why there was so much load on NGINX, and why Cloudflare was caching 404 responses. One of the initial attempts that we thought would solve it was to explicitly set `no-store`/`no-cache` headers on the 404 responses from NGINX, but even that didn't seem to affect Cloudflare's caching of them. After a lot more digging and testing, we realised that Page Rules configured in Cloudflare for the domain were setting both a Browser and Edge cache TTL for all responses, which wins out even over a `no-store` response from the origin. To fix this, we added a default cache header in our NGINX config, as well as the `no-store` for 404s, and then disabled the cache TTL Page Rules in Cloudflare.

We'd now fixed the issue of 404s being cached by Cloudflare, and this had resolved much of the impact seen by end users, but we'd not yet fixed the load issues on the origin itself which were causing the erroneous 404 responses in the first place. One of the next steps taken was to enable the `open_file_cache` in NGINX, which caches assorted file metadata and descriptors for files being loaded from disk, optimising repeat requests for the same file. We added this with a minimum request count of two and relatively long-tailed timeouts for both revalidating the data and removing the data from the cache, given that most files on disk are very unlikely to ever change, and with the aim being to reduce disk reads as much as possible. We deployed this config change and its effect was almost instant, with everyone responding to the incident immediately noticing how much faster the origin was when hit directly, and how much quieter the logs were with fewer "too many files open" errors.

With both the 404 caching being fixed, and the origin now in a much happier state, we had mitigated the impact of the incident for most users at this point. This was completed at roughly 8 PM UTC on the 16th, and so by midnight, we were confident the last remaining erroneous 404s would be gone (many responses had a 4-hour cache TTL on them).

One final step we took on the 16th was to block what appeared to be invalid requests coming from misconfigured Artifactory instances, which were hammering our server with requests that were continually (correctly) 404-ing. We added this block in Cloudflare to prevent load on the origin.

The only remaining issue at this point was that during this whole process, we'd discovered that requests to NGINX for localised versions of pages were not working quite as expected. If the localised version existed, NGINX responded with it as expected, but if it didn't then there should be a fallback to the English version, but this wasn't happening. Moving into the 17th, we investigated this with local testing of NGINX and deployed a fix, allowing users to see an English version of a localised page if the localised version didn't exist, and if the English version also didn't exist they'd be served a 404 page matching the requested localisation still.

On the 17th we also deployed two more optimisations for the NGINX config, to further reduce the load on the origin server. When reviewing logs, we noticed that NGINX was often trying to open `.gz` versions of files (for example, `index.html.gz`). There are no pre-compressed versions of files on the origin server's disk, so we investigated where these requests were coming from and realised that `gzip_static` was enabled for the NGINX server. This told NGINX to always look on disk for a pre-compressed version of any file before accessing the uncompressed version, and as we had no pre-compressed versions available it essentially was doubling the number of disk reads for the origin. We removed this directive and the logs became noticeably quieter as we were now only making reads for files that should actually exist on the disk.

The second optimisation deployed on the 17th related to Cloudflare load balancing, and the health check requests it continually makes to check that the origin is online (switching to a backup origin if our main origin were to stop responding). This health check was configured to hit the index page for the site, and so every 60 seconds a request would hit the origin from every colo that Cloudflare had, which resulted in a lot of requests all wanting to read the index file that was on the disk. To optimise this, as the health check is really only worried about if NGINX itself is up and running, we created a dedicated location block in the NGINX config with a route specifically for Cloudflare's traffic manager that uses a `return 204` directive, removing the need for disk reads.

We also made a small tweak to the Cloudflare rule used to block the misconfigured Artifactory requests, as the RegEx we'd written wasn't being processed correctly by Cloudflare initially (an escape was being double-escaped by Cloudflare's UI where it shouldn't be, so we switched to writing the expression manually -- this is a known bug on their end).

For those curious, the changes made to the NGINX config for nodejs.org in response to this incident are:

- https://github.com/nodejs/build/pull/3226
- https://github.com/nodejs/build/pull/3233

We've since updated the NGINX config further with detailed comments on what everything does for future contributors:

- https://github.com/nodejs/build/pull/3239

---

We learned a lot from this incident, and have a much better understanding of how the NGINX config that powers nodejs.org works, as well as the current gaps in the process when it comes to making changes to it. We have created tickets in the nodejs/build repository to track the work needed to fill those gaps:

- https://github.com/nodejs/build/issues/3235
- https://github.com/nodejs/build/issues/3236

We apologise for any interruption this caused to your workflows.
