---
date: '2026-04-01T00:00:00.000Z'
category: announcements
title: Evolving the Node.js Release Schedule
layout: blog-post
author: The Node.js Release Team
---

Starting with `27.x`, Node.js will move from two major releases per year to one. This post explains what's changing, why, and what it means for users.

## Why This Change

The current release schedule is 10 years old. It was created during the io.js merger to balance the needs of a growing ecosystem. As one contributor put it at the time, it was "a guess of what enterprises would need."

We now have a decade of data showing how people actually use Node.js:

- Odd-numbered releases see minimal adoption. Users wait for LTS.
- The odd/even distinction confuses newcomers.
- Many organizations skip odd releases entirely, upgrading only between LTS versions.

### Volunteer Sustainability

Node.js is maintained primarily by volunteers. While some contributors receive sponsorship, most of the work (reviewing PRs, handling security issues, cutting releases, backporting fixes) is done by people in their spare time.

Managing security releases across four or five active release lines has become difficult to sustain. Each additional line increases backporting complexity. By reducing concurrent release lines, we can focus on better supporting the releases people actually use.

## What's Changing

Starting with `27.x` in 2027:

- **One major release per year** (April), with LTS promotion in October
- **Every release becomes LTS**. No more odd/even distinction.
- **Alpha channel replaces odd-numbered releases** for early testing
- **Version numbers align with years**: `27.x` in 2027, `28.x` in 2028
- **Maximum 3 active release lines** (down from 5)

### New Schedule

| Phase   | Duration  | Description                                     |
| ------- | --------- | ----------------------------------------------- |
| Alpha   | 5 months  | Oct to Mar. Early testing, semver-major allowed |
| Current | 6 months  | Apr to Oct. Stabilization                       |
| LTS     | 29 months | Long-term support with security fixes           |

Total support: 35 months from release to End of Life.

This model follows a pattern similar to Ubuntu's release cycle: predictable April/October anchors, with interim releases for testing and LTS releases for production.

### About the Alpha Channel

The Alpha channel replaces odd-numbered releases. Alpha releases are signed, tagged, and tested through CITGM. This is different from [nightly builds](https://nodejs.org/download/nightly/), which remain available as automated untested builds from main.

**Who it's for:** Library authors and CI pipelines testing compatibility with upcoming breaking changes. Not intended for production use.

**What to expect:**
- Semver-major changes land during this phase
- Releases are signed and tagged (unlike nightly)
- API may change between releases

**Why:** Provides early feedback on breaking changes with quality gates that nightly builds lack. Also allows landing V8 updates earlier in the cycle.

## What's NOT Changing

- **LTS support duration** remains similar (29 months)
- **Migration windows preserved**. Overlap between LTS versions remains.
- **Quality standards unchanged**. Same testing, same CITGM, same security process.
- **Predictable schedule**. April releases, October LTS promotion.

## Timeline

![New Node.js Release Schedule](/static/images/blog/announcements/2026-new-release-schedule.svg)

### `26.x` (Current Schedule)

| Milestone   | Date         |
| ----------- | ------------ |
| Release     | April 2026   |
| Enters LTS  | October 2026 |
| Maintenance | October 2027 |
| End of Life | April 2029   |

`26.x` follows the existing schedule. This is the last release under the current model.

### `27.x` (New Schedule)

| Milestone    | Date         |
| ------------ | ------------ |
| Alpha begins | October 2026 |
| Release      | April 2027   |
| Enters LTS   | October 2027 |
| End of Life  | March 2030   |

`27.x` is the first release under the new schedule.

### The Next 10 Years

| Version | Alpha    | Release  | LTS      | End of Life |
| ------- | -------- | -------- | -------- | ----------- |
| 27.x    | Oct 2026 | Apr 2027 | Oct 2027 | Mar 2030    |
| 28.x    | Oct 2027 | Apr 2028 | Oct 2028 | Mar 2031    |
| 29.x    | Oct 2028 | Apr 2029 | Oct 2029 | Mar 2032    |
| 30.x    | Oct 2029 | Apr 2030 | Oct 2030 | Mar 2033    |
| 31.x    | Oct 2030 | Apr 2031 | Oct 2031 | Mar 2034    |
| 32.x    | Oct 2031 | Apr 2032 | Oct 2032 | Mar 2035    |
| 33.x    | Oct 2032 | Apr 2033 | Oct 2033 | Mar 2036    |
| 34.x    | Oct 2033 | Apr 2034 | Oct 2034 | Mar 2037    |
| 35.x    | Oct 2034 | Apr 2035 | Oct 2035 | Mar 2038    |
| 36.x    | Oct 2035 | Apr 2036 | Oct 2036 | Mar 2039    |

## Thank You

This change is the result of discussions across GitHub issues, Release Working Group meetings, and [the Collaboration Summit Chesapeake 2025](https://youtu.be/ppi87YjU9x0?si=NFF5WKIGDJE_U-_V&t=6524). We thank everyone who contributed feedback.

For questions or comments, see [GitHub Issue #1113](https://github.com/nodejs/Release/issues/1113).
