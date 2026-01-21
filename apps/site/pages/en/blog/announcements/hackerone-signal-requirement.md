---
date: 2026-01-21T12:00:00.000Z
category: announcements
title: New HackerOne Signal Requirement for Vulnerability Reports
layout: blog-post
author: The Node.js Project
---

We have updated our [HackerOne program](https://hackerone.com/nodejs) to require a **Signal of 1.0 or
higher** to submit vulnerability reports to the Node.js project.

## Why This Change

The Node.js security team has experienced a significant increase in low-quality reports.
This trend has been increasing over the years, and over the holidays it crossed the threshold
that we can actually handle. Between December 15th and January 15th, we received over 30 reports.
Triaging these reports consumes time and energy that could be spent on legitimate security work.

By requiring a minimum Signal score, we ensure that reporters have a proven track record of submitting
valid security reports, while still allowing newer researchers to participate with a limited number of
submissions.

## What This Means for You

- **New researchers or researchers with [signal][Signal] >= 1.0**: You can continue reporting vulnerabilities through HackerOne as usual
- **Those below the threshold**: You can still reach the security team through the
  [OpenJS Foundation Slack](https://slack-invite.openjsf.org/). Contact us there to discuss potential
  vulnerabilities

## About HackerOne Signal

[Signal][] is HackerOne's reputation metric that reflects the quality of a researcher's past submissions.
A higher Signal indicates a history of valid, impactful reports. This requirement helps us prioritize
reports from researchers with demonstrated expertise while reducing the burden of triaging invalid
submissions.

We appreciate the security community's understanding and continued collaboration in keeping Node.js secure.

[Signal]: https://docs.hackerone.com/en/articles/8369891-signal-impact
