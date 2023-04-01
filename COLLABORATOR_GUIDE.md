# Node.js Collaborator Guide

- [Issues and Pull Requests](#issues-and-pull-requests)
- [Accepting Modifications](#accepting-modifications)
  - [Involving the Website Team](#involving-the-website-team)
- [Code editing](#code-editing)
  - [Adding new pages](#adding-new-pages)
    - [Create the page content](#create-the-page-content)
  - [Translating pages](#translating-pages)

This document contains information for Collaborators of the Node.js
website project regarding maintaining the code, documentation and issues.

Collaborators should be familiar with the guidelines for new
contributors in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Issues and Pull Requests

Courtesy should always be shown to individuals submitting issues and
pull requests to the Node.js website project.

Collaborators should feel free to take full responsibility for
managing issues and pull requests they feel qualified to handle, as
long as this is done while being mindful of these guidelines, the
opinions of other Collaborators and guidance of the Website Group.

Collaborators may **close** any issue or pull request they believe is
not relevant for the future of the Node.js project. Where this is
unclear, the issue should be left open for several days to allow for
additional discussion. Where this does not yield input from Node.js
Collaborators or additional evidence that the issue has relevance, the
issue may be closed. Remember that issues can always be re-opened if
necessary.

## Accepting Modifications

All modifications to the Node.js code and documentation should be
performed via GitHub pull requests. Only the `Website` group
can merge their own work and should do so with great care.

All pull requests must be reviewed and accepted by a Collaborator with
sufficient expertise who is able to take full responsibility for the
change. In the case of pull requests proposed by an existing
Collaborator, an additional Collaborator is required for sign-off.

In some cases, it may be necessary to summon a qualified Collaborator
to a pull request for review by @-mention.

If you are unsure about the modification and are not prepared to take
full responsibility for the change, defer to another Collaborator.

Before landing pull requests, sufficient time should be left for input
from other Collaborators. Leave at least 48 hours during the week and
72 hours over weekends to account for international time differences
and work schedules. Trivial changes (e.g. those which fix minor bugs
or improve performance without affecting API or causing other
wide-reaching impact) may be landed after a shorter delay. Any press
release can land with no time constraints as long as the copy is
properly formatted, it is not the responsibility of the website group
to review the copy itself.

Where there is no disagreement amongst Collaborators, a pull request
may be landed given appropriate review. Where there is discussion
amongst Collaborators, consensus should be sought if possible. The
lack of consensus may indicate the need to elevate discussion to the
Website Group for resolution (see below).

All bugfixes require a test case which demonstrates the defect. The
test should _fail_ before the change, and _pass_ after the change.

All pull requests that modify executable code should be subjected to
continuous integration tests on the
[project CI server](https://ci.nodejs.org/).

### Involving the Website Team

Collaborators may opt to elevate pull requests or issues to the group for
discussion by mentioning `@nodejs/website`. This should be done
where a pull request:

- has a significant impact on the codebase,
- is inherently controversial; or
- has failed to reach consensus amongst the Collaborators who are
  actively participating in the discussion.

The Website group should serve as the final arbiter where required.

## Code editing

### Adding new pages

1. Create new page content including the layout, title and copy.
2. Update the relevant `/layout` to add a link to the new page.

#### Create the page content

Create a new markdown file in `/pages/en`. As specified in the
[README.md](./README.md#structure-of-this-repository), initial development happens in English.

At the top of the markdown file, set a page the title and layout.

```markdown
---
title: Events
layout: contribute.hbs
---

[Event copy goes here]
```

### Translating pages

See [TRANSLATION.md](./TRANSLATION.md) for the website translation policy.
