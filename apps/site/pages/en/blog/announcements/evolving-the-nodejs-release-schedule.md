---
date: '2026-04-02T00:00:00.000Z'
category: announcements
title: Evolving the Node.js Release Schedule
layout: blog-post
author: Node.js Releasers
---

Starting with 27.x, Node.js will move from two major releases per year to one.
This post explains what's changing, why, and what it means for users. For the
full discussion and background, see [nodejs/Release#1113](https://github.com/nodejs/Release/issues/1113).

**TL;DR:** If you already only upgrade to LTS versions, little changes beyond
version numbering. LTS support windows remain similar, and now every release
becomes LTS.

**Library authors:** Please integrate Alpha releases to your CI as early as possible;
if you only test on LTS releases, you will not be able to report bugs before they
affect your users.

## Why This Change

The current release schedule is 10 years old. It was created during the io.js
merger to balance the needs of a growing ecosystem. As one contributor put it at
the time, it was "a guess of what enterprises would need."

We now have a decade of data showing how people actually use Node.js:

- Odd-numbered releases see minimal adoption. Most users wait for Long-Term Support.
- The odd/even distinction confuses newcomers.
- Many organizations skip odd releases entirely, upgrading only to LTS versions.

We also recognize that enterprises need predictability. The new schedule is
designed to be well-defined, so teams can plan upgrades and allocate resources
accordingly.

### Volunteer Sustainability

Node.js is maintained primarily by volunteers. While some contributors receive sponsorship, most
of the work (reviewing Pull Requests, handling security issues, cutting
releases, backporting fixes) is done by people in their spare time.

Managing security releases across four or five active release lines has become
difficult to sustain. Each additional line increases backporting complexity. By
reducing the number of concurrent release lines, we can focus on better
supporting the releases people actually use.

## What's Changing

As of October 2026:

- **One major release per year** (April), with LTS promotion in October.
- **Every release becomes LTS**. No more odd/even distinction - Node.js 27 will become LTS.
- **Alpha channel for early testing** with semver-major changes allowed.
- **Version numbers align with the year of the first Current release and transition to LTS**: 27.0.0 in 2027, 28.0.0 in 2028.
- **Reduced Releasers' burden**.

### New Schedule

| Phase   | Duration  | Description                                     |
| ------- | --------- | ----------------------------------------------- |
| Alpha   | 5 months  | Oct to Mar. Early testing, semver-major allowed |
| Current | 6 months  | Apr to Oct. Stabilization                       |
| LTS     | 29 months | Long-term support with security fixes           |
| EOL     | Infinity  | The project no longer provides any support      |

Total support: 35 months from release to [End of Life (EOL)](https://nodejs.org/en/about/eol).

### About the Alpha Channel

The Alpha channel fills the early-testing role that odd-numbered releases once served, but with a key difference: semver-major changes are allowed during Alpha. Alpha releases are signed,
tagged, and tested through [CITGM](https://github.com/nodejs/citgm). CITGM (Canary in the Goldmine) is a tool we
maintain that runs the test suite of major open-source packages on the upcoming
version of Node.js, which can let us detect ecosystem breakage and notify the
package authors ahead of the release.

This is different from [Nightly builds](https://nodejs.org/download/nightly/), which remain
available as automated untested builds from `main` – Alpha releases may not contain all changes from
`main`, a change may be not included in an Alpha release if:

- during Pull Request review, reviewers add a label requesting the change to not be backported
  (e.g. if an API is getting runtime deprecated in an Alpha release, the change actually removing
  that API should not land until the next release line).
- during the Alpha release preparation, the releaser ultimately decides which commits actually make the
  release (e.g. if a dependency update contains a major bug).

**Who it's for:** Library authors and CI pipelines testing compatibility with
upcoming breaking changes. Not intended for production use.

**What to expect:**

- Semver-major changes may land during this phase.
- Releases are signed and tagged (unlike nightly).
- API may change between releases.
- The release cadence is flexible; the Release Team will determine the timing
  and frequency of Alpha releases based on the volume of changes and project needs.

**Why:** Provides early feedback on breaking changes with quality gates that
Nightly builds lack. Also allows landing V8 updates earlier in the cycle.

The rules for shipping semver-major commits in Alpha versions will be defined by
the Release Team and documented in the [Release repository](https://github.com/nodejs/Release).

## What's NOT Changing

- **Long-Term Support duration** remains similar (29 months).
- **Migration windows preserved**. Overlap between LTS versions remains.
- **Quality standards unchanged**. Same testing, same CITGM, same security process.
- **Predictable schedule**. April releases, October LTS promotion.
- **V8 adoption cycle**. Node.js latest releases will still include a version of
  V8 that's at most about 6 months old.

## Timeline

![New Node.js Release Schedule](/static/images/blog/announcements/2026-new-release-schedule.svg)

### Node.js 26 Schedule (existing model)

| Milestone   | Date         |
| ----------- | ------------ |
| 26.0.0      | April 2026   |
| Enters LTS  | October 2026 |
| Maintenance | October 2027 |
| End of Life | April 2029   |

Node.js 26 follows the existing schedule. This is the last release line under the current model.

### Node.js 27 Schedule (new model)

| Milestone    | Date         |
| ------------ | ------------ |
| Alpha begins | October 2026 |
| 27.0.0       | April 2027   |
| Enters LTS   | October 2027 |
| End of Life  | March 2030   |

Node.js 27 is the first release line under the new schedule.

### The Next 10 Years

| Version | Alpha    | Current  | LTS      | End of Life |
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

This schedule is not final and may be amended. Refer to the
[`schedule.json`](https://github.com/nodejs/Release/blob/HEAD/schedule.json) for an up-to-date
record of the support claims from the project.

## Thank You

This change is the result of discussions across GitHub issues, Release Working Group meetings, and
[the Collaboration Summit Chesapeake 2025](https://youtu.be/ppi87YjU9x0?si=NFF5WKIGDJE_U-_V&t=6524).
We will continue discussing this topic at the upcoming Collaboration Summit in London.
We thank everyone who contributed feedback.

For questions or comments, see [nodejs/Release#1113](https://github.com/nodejs/Release/issues/1113).
