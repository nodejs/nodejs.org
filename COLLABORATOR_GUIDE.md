# Node.js Collaborator Guide

* [Issues and Pull Requests](#issues-and-pull-requests)
* [Accepting Modifications](#accepting-modifications)
  * [Involving the Website Group](#involving-the-website-group)
* [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)
* [Code of Conduct](#code-of-conduct)
* [Code editing](#code-editing)
  * [Adding new pages](#adding-new-pages)
    * [Create the page content](#create-the-page-content)
    * [Update locale site.json to add link attributes](#update-locale-sitejson-to-add-link-attributes)
    * [Update the layout to add a link](#update-the-layout-to-add-a-link)
  * [Translating pages](#translating-pages)

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
test should *fail* before the change, and *pass* after the change.

All pull requests that modify executable code should be subjected to
continuous integration tests on the
[project CI server](https://ci.nodejs.org/).

### Involving the Website Group

Collaborators may opt to elevate pull requests or issues to the group for
discussion by mentioning `@nodejs/website`. This should be done
where a pull request:

* has a significant impact on the codebase,
* is inherently controversial; or
* has failed to reach consensus amongst the Collaborators who are
  actively participating in the discussion.

The Website group should serve as the final arbiter where required.

## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

* (a) The contribution was created in whole or in part by me and I
  have the right to submit it under the open source license
  indicated in the file; or

* (b) The contribution is based upon previous work that, to the best
  of my knowledge, is covered under an appropriate open source
  license and I have the right under that license to submit that
  work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am
  permitted to submit under a different license), as indicated
  in the file; or

* (c) The contribution was provided directly to me by some other
  person who certified (a), (b) or (c) and I have not modified
  it.

* (d) I understand and agree that this project and the contribution
  are public and that a record of the contribution (including all
  personal information I submit with it, including my sign-off) is
  maintained indefinitely and may be redistributed consistent with
  this project or the open source license(s) involved.

## Code of Conduct

This Code of Conduct is adapted from [Rust's wonderful
CoC](https://github.com/rust-lang/rust/wiki/Note-development-policy#conduct).

* We are committed to providing a friendly, safe and welcoming
  environment for all, regardless of gender, sexual orientation,
  disability, ethnicity, religion, or similar personal characteristic.
* Please avoid using overtly sexual nicknames or other nicknames that
  might detract from a friendly, safe and welcoming environment for
  all.
* Please be kind and courteous. There's no need to be mean or rude.
* Respect that people have differences of opinion and that every
  design or implementation choice carries a trade-off and numerous
  costs. There is seldom a right answer.
* Please keep unstructured critique to a minimum. If you have solid
  ideas you want to experiment with, make a fork and see how it works.
* We will exclude you from interaction if you insult, demean or harass
  anyone. That is not welcome behavior. We interpret the term
  "harassment" as including the definition in the [Citizen Code of
  Conduct](http://citizencodeofconduct.org/); if you have any lack of
  clarity about what might be included in that concept, please read
  their definition. In particular, we don't tolerate behavior that
  excludes people in socially marginalized groups.
* Private harassment is also unacceptable. No matter who you are, if
  you feel you have been or are being harassed or made uncomfortable
  by a community member, please contact one of the channel ops or any
  of the TC members immediately with a capture (log, photo, email) of
  the harassment if possible. Whether you're a regular contributor or
  a newcomer, we care about making this community a safe place for you
  and we've got your back.
* Likewise any spamming, trolling, flaming, baiting or other
  attention-stealing behavior is not welcome.
* Avoid the use of personal pronouns in code comments or
  documentation. There is no need to address persons when explaining
  code (e.g. "When the developer")

## Code editing

### Adding new pages

1. Create new page content including the layout, title and copy.
2. Update `/locale/en/site.json` to provide page link attributes.
3. Update the relevant `/layout` to add a link to the new page.

#### Create the page content

Create a new markdown file in `/local/en`. As specified in the
[README.md](./README.md#layout), initial development happens in English.

At the top of the markdown file, set a page the title and layout.

```markdown
---
title: Events
layout: contribute.hbs
---

[Event copy goes here]
```

#### Update locale site.json to add link attributes

Open `local/en/site.json` and find the appropriate page structure.
Add a new object defining the link attributes.

```json
"event": {
  "link": "get-involved/events",
  "text": "Events"
}
```

#### Update the layout to add a link

Using the example layout, open `/layouts/contribute.hbs` and add your new
link to the markup. It's essential to update the handlebars paths to site.json.

```handlebars
{{site.locale}}/{{site.getinvolved.events.link}}
```

### Translating pages

See [TRANSLATION.md](./TRANSLATION.md) for the website translation policy.
