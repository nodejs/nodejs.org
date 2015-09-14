---
title: Development
layout: contribute.hbs
---

# Development

## Table of Contents

- [Guiding Principles](#guiding-principles)
- [About this document](#about-this-document)
- [Repository Reconciliation Plan](#repository-reconciliation-plan)
- [Contributing](#contributing)
  - [Collaborators](#collaborators)
  - [Accepting Modifications](#accepting-modifications-through-a-consensus-seeking-process)
  - [Release-related Commits](#release-related-commits-and-error-corrections)
  - [Landing Pull Requests](#landing-pull-requests)
  - [Issue Tagging](#issue-and-pull-request-tagging)
- [Release Process and Branching Model](#release-process-and-branching-model)
  - [Release Versioning](#release-versioning)
  - [Release Process for Master](#release-process-for-master)
- [Long Term Support Working Group](#long-term-support-working-group-roadmap)
- [Issues Workflow](#issues-workflow)
- [Stability Policy](#stability-policy)
  - [Implicit vs. Explicit API Stability](#implicit-vs-explicit-api-stability)
  - [Platform Stability](#platform-stability)
  - [Dependency Stability](#dependency-stability)
- [Working Groups](#working-groups)
  - [Transition of io.js Working Groups](#transition-of-iojs-working-groups)
- [Developer's Certificate of Origin 1.0](#developers-certificate-of-origin-10)
- [A Few Open Questions](#a-few-open-questions)
- [Notes](#notes)

---

## Guiding Principles

The Fundamental goal of the Node.js Project is to provide a JavaScript-based application development platform that is *current*, *reliable* and *stable*.

Contributors to Node.js work in concert with one another *on behalf of* the Community of users who build their applications and businesses on top of the Node.js platform. Accordingly, contributors must demonstrate an ongoing commitment, not only to the Project, but to the stability and vitality of the Community as a whole.

It is vital that users trust the Contributors to have their best interests in mind while making decisions affecting the overall direction of the platform. This means having defined guidelines, stable APIs, a clear roadmap, and a predictable release schedule. The user community and developer ecosystem must be included in the decision making process.

Adoption of new capabilities and features within Node.js must be carefully balanced by the expressed needs of the users and the community. Change just for the sake of change must be avoided and a guaranteed long term support policy must be established.

Node.js owes much of its success to the existing ecosystem of module and add-on developers. The Node.js project should do everything it can to support the continued growth and stability of that ecosystem. This includes, but is not limited to, keeping Node.js focused on providing a minimal kernel of core functionality while deferring, as much as possible, additional capabilities and features to add-on modules or applications.

In order to best serve the Node.js Community as a whole, the development, release and issue management processes adopted by the Node.js Foundation TSC must reflect these guiding principles.

## About this document

This document is a work in progress draft of a *proposed* development and release policy for the Node.js Foundation TSC. This document currently has no official standing within Node.js, io.js or the Node.js Foundation. The intent is for this draft to be put up for discussion in a joint Node.js and io.js TC meeting on Thursday, April 9th, 2015.

Nothing within this document should currently be considered final.

## Repository Reconciliation Plan

There are currently release lines in both Node.js and io.js. Starting at the point from which io.js was created, the two repositories have diverged significantly. Bringing the two repositories back together under the Foundation TSC will not happen immediately.

```
                        now
       (io.js)    v1.6   :  v1.7    v1.x
          |         |    :    |       |
 v0.10.x  /--------------:-----------------\   Node.js 2.0
____|____/               :                  \______|_____
         \               :                  /
          \--------------:-----------------/
          |         |    :     |       |
       (Node.js) v0.12.x :  v0.13.x  v0.14.x
```

At the time of this writing, the current Node.js release is v0.12.2. The current io.js release is 1.7.1.

Upon Foundation launch, both projects will come together under a single TSC, but the two distinct release lines will continue independently for the near term. Each subsequent release ("interim releases") for each project should incrementally bring the two code bases closer together, allowing them to eventually merge back into a single Node.js 2.0 release line.

To avoid introducing unnecessary problems for users, the interim releases should not overlap versions. All prior versions of both io.js and Node.js should be preserved. The interim Node.js releases will remain the v0.x version stream. Interim io.js releases will continue to follow their existing semver strategy. If interim changes in io.js require a major version bump to 2.x, the first release of the Converged Project would be the next major version number (3.0). The Converged Project will use semver for release versioning.

For purposes of managing each separate release line, if the TSC determines it to be necessary, the TSC can charter an io.js Working Group and a Node.js Working Group, each responsible for their own respective release lines.

To facilitate and oversee the convergence of the release lines, the TSC will charter a Convergence Working Group. This WG would ensure that appropriate steps are being made in each of the two release lines to bring the projects back together. The Convergence WG would work directly with both release line WGs. As soon as the release lines converge, the charters for the separate release line WGs and the convergence WG would expire, and responsibility for the continued evolution of the converged release line would be with the project TSC itself. The initial membership of the Convergence WG will be a subset of members from each of the two release line WGs.

For the Converged Project, a new Github organization owned and managed by the Node.js Foundation would be created. Once the new Github organization is established, ownership of the existing iojs/io.js and joyent/node repositories should be transferred. From there, the Convergence WG will be responsible for determining the exact next steps for creating the Converged repository. Additional repositories from each of the existing joyent/* and iojs/* organizations may need to be transferred to the Node.js Foundation organization as well.

The Converged repository must contain maintenance branches for all prior stable lines from both release lines.

Note: The specific details for how the organization would be created (e.g. if it would be a brand new organization or a migration of one or both of the existing organizations) has yet to be determined. This is a complex issue that will require careful thought. It will be the responsibility of the Convergence WG to determine the specific details.

## Contributing

### Collaborators

The Node.js project is maintained by individual Collaborators. The Technical Steering Committee (TSC) membership consists of key Collaborators who have demonstrated both technical expertise critical to the ongoing maintenance and evolution of the project and a long term commitment to driving the project and community forward.

Individuals can be nominated as Collaborators by TSC members. Once the nomination is approved by the TSC, the invitation to become a Collaborator is extended to the individual. The invitation must include a copy of the project Developer’s Certificate of Origin (DCO, see below). Assuming the individual accepts the invitation, they are granted commit-access to the project.

Nominations for Collaborator Status happen through the typical TSC decision making process. That is, to nominate one or more Collaborators, an issue containing the names of all collaborators being nominated is created and put on the TSC meeting agenda. The issue is approved or rejected following the same Consensus Seeking Process used for any other issue or PR.

Individuals can self-petition the TSC for Collaborator status by submitting an issue requesting to be put on the TSC meeting agenda. In order to be considered however, such self-nominations must be sponsored by an existing TSC member, after which it follows the same process as above. To sponsor a nomination, the TSC member must indicate consent within the issue text or associated comment thread.

Collaborators can be nominated to become members of the TSC following the same nomination and approval model. However, Collaborators cannot nominate themselves for TSC membership. An individual cannot be nominated and accepted into the TSC without first having been nominated and accepted as a Collaborator.

### Accepting Modifications through a Consensus Seeking Process

A "Contribution" to the Project is any work that is voluntarily submitted to the project. These include not only source code in the form of bug fixes, code improvements, new functions, etc, but contributions to documentation, design etc that are intended for the overall improvement of the project.

Contributions to the Project are made on a collaborative basis. Any individual with a GitHub account may propose a Contribution by submitting a Pull Request (PR). Like the TSC governance, acceptance of Contributions (a.k.a. "landing a Pull Request") into the Project follows the Consensus Seeking decision making model as described in the Project TSC Charter.

All Pull Requests submitted by individuals who are not Collaborators must be signed-off on by an existing Collaborator before the PR can be landed. The sponsoring Collaborator becomes responsible for the PR. Pull Requests from an existing Collaborator must be signed-off on by at least one other Collaborator.

Before any Pull Request is landed, sufficient time should be given to receive input from other Collaborators with sufficient expertise to evaluate the changes. Specifically, at least 48 hours during the typical working week and 72 hours over weekends should be given to account for international time differences and work schedules. Trivial Pull Requests may be landed after a shorter delay.

If it becomes apparent that the changes proposed by a given Pull Request: (a) have significant impact on the project as a whole; (b) are inherently controversial; or (c) have failed to reach consensus amongst Collaborators, the Pull Request can be elevated for review by either a specific Working Group (by attaching a WG specific tag to the PR) or the TSC (by attaching the *tsc-agenda* tag to the PR). Pull Requests that have been flagged for TSC or Working Group review must not be landed until the TSC or Working Group has had sufficient opportunity to review the issue and render a decision. A Working Group may choose to defer the issue to the TSC.

Pull Requests that require an increase in the Major version must be elevated for review by the TSC. This does not necessarily mean that the PR must be put onto the TSC meeting agenda. If enough TSC members sign-off on the PR and there is clear consensus among TSC members for the change, the Pull Request can be landed. Where there is disagreement among TSC members, *semver-major* Pull Requests should be put on the TSC meeting agenda.

Specific Collaborators or Working Groups can be requested to review any PR by using an *@-mention* either within the PR text itself or the associated comment stream.

Collaborators sign-off on a Pull Request by explicitly stating their approval in the PR text or associated comment stream. If a Collaborator is unsure about the modification or is not prepared to take full responsibility for the change, they should defer to another Collaborator.

Exception to this process is allowed for high-priority changes that address security vulnerabilities. A shorter review period and modified sign-off process may be necessary depending on the nature of the change and severity of the issue. It is recommended that the TSC establish a Security Working Group of Collaborators with recognized security expertise that can be tasked with reviewing security related Pull Requests and determining an appropriate review process.

All Pull Requests that either fix bugs or introduce new functionality require at least one test case demonstrating the defect or validating the intended functionality. For bug fixes, the test should fail before the change, and pass after the change. In exceptional cases, such as environments or failure modes that are difficult to reproduce, a detailed description of how to verify the fix may be accepted in lieu of a specific test.

Pull Requests for changes intended to improve performance require a benchmark demonstrating the performance impact. The benchmark should demonstrate improved performance after the change is applied.

### Release-related Commits and error corrections

When cutting a new release, it is typically necessary to commit a few specific changes to the repository. These include tasks like updating the release notes and incrementing the current version number.

It's also possible for errors to come up in the basic management of the project repository (caused either by simple human error or bugs in the tooling used to manage the project). Correction of such errors may require additional changes to be landed.

Such changes can be landed after a significantly shorter review period if the changes are strictly targeted at repairing the current state of the repository or cutting a new release. Effort should still be made to solicit review of such changes in advance of landing them.

### Landing Pull Requests

When Landing a Pull Request, a Collaborator must modify the original commit message to include the following additional meta information regarding the change process:

* A `Reviewed-By: Name <email>` line for yourself and any other Collaborators who have reviewed the change.
* A `PR-URL:` line that references the full GitHub URL of the original Pull Request being merged so it's easy to trace a commit back to the conversation that lead up to that change.
* A `Fixes: X` line as appropriate, where `X` includes the full GitHub URL for an issue, and/or the complete or abbreviated hash identifier and commit message if the commit fixes a bug in a previous commit. Multiple `Fixes:` lines may be added if appropriate.

Additionally, Collaborators should:

* Double check Pull Requests to make sure the author's full name and email address are correct before merging.
* Verify that every commit passes all tests.

### Issue and Pull Request Tagging

All Issues and Pull Requests should be tagged with their respective feature areas. This helps organize issues and makes it easier for Collaborators to keep track of the items most relevant to them.

The labels *discuss*, *meta*, *future*, and *ideas* are used to label issues that are not bugs or features requests.

The *help-wanted* tag is used to draw attention to Issues and Pull Requests that need contributions.

When a Pull Request is not ready to merge, and is still being iterated on or reviewed, it should have the *in-progress* tag applied.

The *semver-minor* and *semver-major* tags are used for Pull Requests that will cause a version iteration other than patch once released.

The *tsc-agenda* tag is used to elevate items to the next TSC meeting. TSC meeting notes and announcements should have the *tsc-meeting* tag.

Every Working Group must specify a tag that can be used to indicate items for review by the Working Group and a tag that can be used to identify Working Group meeting notes and announcements.

## Release Process and Branching Model

The Project source repository will be organized into a single `master` branch, multiple maintenance branches, and multiple development branches. All modifications intended for the current major release line must be made to the `master` branch and must follow the guidelines detailed in this document.

At each new *semver-patch*, a Release tag is cut (e.g. `v2.0.0`, `v2.0.1`, `v2.1.0`, etc).

```
          (dev branches)         (dev branches)
          ⇗  ⇗      ⇘  ⇘       ⇗  ⇗      ⇘  ⇘
  -----------------------------------------------------------------> master
      ⇣          ⇣          ⇣          ⇣         ⇣          ⇣
  tag:v2.0.0 tag:v2.1.0 tag:v2.2.0 tag:v3.0.0 tag:v3.1.0 tag:v3.2.0  (releases)

```

Before a new *semver-major*, `master` is branched for maintenance of the prior major (e.g. `v1.x`, `v2.x`).

```
                                        v2.x ------> maintenance
                                       ⇗
  -------------------------------------------------> master
       ⇣          ⇣          ⇣         ⇣
   tag:v2.0.0 tag:v2.1.0 tag:v2.2.0 tag:v3.0.0

```

Modifications to maintenance branches are limited to bug fixes, with priority given to changes that address specific security vulnerabilities. Oversight of the maintenance branches belongs to the Long Term Support (LTS) Working Group. The LTS Working Group will establish policies for landing Pull Requests into maintenance branches.

The LTS Working Group may choose to use its own tags to identify LTS Release Candidates and LTS Releases and can choose to create additional maintenance branches if need arises. The LTS Working Group may also choose to use extended version metadata for tracking changes that land within maintenance branches.

Additionally there are branches for stable release lines prior to 1.0 of minor versions. Example: `v0.8.x`, `v0.10.x`, `v0.12.x`.

During the interim period between the launch of the Foundation and the convergence of the two release lines, variations may exist in the specific release cycles for the Node.js v0.x stream and the io.js 1.x stream. These variations are allowed to aid in the transition process.

### Release Versioning

#### Patches

Patch releases are defined as bug, performance, and security fixes. They do not change or add any public interfaces. They do not change the expected behavior of a given interface. They are meant to correct behavior when it doesn't match the documentation, without also introducing a change that makes seamless upgrades impossible.

#### Minors

Minors are the addition and refinements of APIs or subsystems. They do not change APIs or introduce backwards compatible breaking changes. These are mostly completely additive releases.

#### Majors

Majors contain changes in behavior that could potentially break code that worked in prior releases.

### Release Process for Master

Releases should not contain too many code changes and if the rate of code changes is high then it should correspond to an increase in the rate of releases. It is expected that there should be about one release per week.

Master must pass a full CI test run prior to release.

If master contains changes which are tagged *semver-minor* then the release should bump the minor version otherwise it is a patch release.

## Long Term Support Working Group Roadmap

The LTS WG is expected to establish a regular and predictable cadence of LTS Releases. To this end, the LTS WG must maintain and regularly publish a clear Roadmap that outlines the priorities and milestones for upcoming LTS Releases. The goal of the Roadmap is to help guide the project's evolution as opposed to constraining it.

## Issues Workflow

The tracking and management of issues is still an open discussion. See https://github.com/jasnell/dev-policy/issues/9 and https://github.com/jasnell/dev-policy/issues/8

## Stability Policy

The most important consideration in every code change is the impact it will have, positive or negative, on the ecosystem (modules and applications). To this end, all Collaborators must work collectively to ensure that changes do not needlessly break backwards compatibility, introduce performance or functional regressions, or negatively impact the usability of the Project on any of the platforms officially targeted for support by the Project. The TSC is responsible for determining the list of supported platforms.

When discussing stability, it is important to first review Node.js' layered architecture:

```
   +---------------------------------------------------+
   |          Module and Application Ecosystem         |
   +---------------------------------------------------+
        |                |            |              |
        |                | +----------------------+  |
        |                | |  Binary Abstraction  |  |
        |                | |        Layer         |  |
        |                | +----------------------+  |
        |                |     |             |       |
   +----------------+    |     |             |       /
   |  Node.js Core  |    |     |             |      /
   |  Library API   |    |     |             |     /
   +----------------+    |     |             |    /
   |     js impl    |    |     |             |   /
   +----------------+    |     |             |  /
            |            |     |             | /
   +--------------------------------------+  |/
   | Node.js Application Binary Interface |  |
   +--------------------------------------|  |
   |              C/C++ impl              |  |
   +--------------------------------------+  |
                      |                      |
        +---------------------------------------+
        | Dependencies: v8, libuv, openssl, etc |
        +---------------------------------------+
```

Node.js currently builds on top of several key dependencies including the V8 JavaScript engine, libuv, openssl and others. The Node.js Application Binary Interface provides access to functionality central to how Node.js operates. The Node.js Core Library is the primary interface through which most Modules and Applications built on top of Node perform I/O operations, manipulate data, access the network, etc. Some modules and applications choose to go beyond the Core Library and bind directly to the Application Binary Interface and dependencies to perform more advanced operations. An optional Binary abstraction layer is used to buffer module and application developers from changes in the Application Binary Interface and Dependencies.

Due to the existing layering, modules and applications are sensitive not only to changes in the Core Library API, but the Application Binary Interface and dependendencies as well.

Any API *addition* to either the Node.js Core Library API or Application Binary Interface must result in a *semver-minor* version increase.

Any *backwards incompatible* change to either the Node.js Core Library API or Application Binary Interface must result in a *semver-major* version increase.

Any Modification to the ABI, dependencies or Native abstractions that require a developer to *modify code* and then recompile is considered a backwards incompatible change that must result in a *semver-major* version increase.

Reversions of any changes landed into `master` are to be handled just like any other type of pre- or post-release modification.

### Implicit vs. Explicit API Stability

The Node.js Core Library API, Application Binary Interface and Binary Abstraction layer each expose methods, events, behaviors and default values that together comprise the implicit Node.js "Public API". This "Public API" is used  by application and module developers and changes will have direct impact on the Community.

Methods exposed by the API can have either strongly or weakly typed input parameters and return values. Methods may also throw any number of exceptions or trigger certain sequences of events or side effects. When such types, exceptions, events or side-effects are *documented*, they become part of the Node.js *Explicit API*.

Likewise, when the ordering of events triggered by Node.js, the default values of optional input parameters and constants, or the type and structure of return values and event payloads are *documented*, they become part of the *Explicit API*.

*Undocumented* types, return values, exceptions, events and side effects are considered to be part of the *Implicit API*.

The ecosystem of application and module developers must be able to rely on the stability of both *Implicit* and *Explicit* APIs as much as possible. Changes to these APIs that are made prior to their inclusion within a Release are generally straightforward and can be made with appropriate review. Changes after the APIs have been included within a Release, however, require Collaborators to be much more careful.

Backwards incompatible changes to *Explicit* APIs that have previously been included in a Release *must* follow a clear and predictable deprecation process in which the existing documented API: (a) is clearly marked for deprecation and (b) can change only after the next *semver-major* version increase.

Backwards incompatible changes to *Implicit* APIs that have been included in a Release *should* be handled the same as *Explicit* API changes. However, exception to this rule can be allowed if the proposed change can be reliably demonstrated to have minimal impact *in practice* and either:

  (a) the proposed change reconciles *documented* behavior with *implemented* behavior (i.e. the documentation needs to be updated to accurately reflect how the code actually works);

  (b) it is clear that the Implicit API being modified was originally intended for internal use as part of the underlying implementation (as opposed to being targeted at developers); or

  (c) it can be demonstrated that the Implicit API never worked correctly to begin with.

That said, changes to any of the APIs should not be made lightly as there is currently no reliable means of determining in advance the impact any change may have on existing applications and modules. Collaborators must use their best judgement to determine whether any given change is "technically backwards incompatible but in practice should not be", then approach landing the change accordingly.

There should never be any API change in a maintenance branch unless the change is required to address a critical security vulnerability.  

### Platform Stability

The Platforms supported by the Node.js project are generally divided into three distinct categories: *Supported*, *Experimental* and *Deprecated*.

*Supported* platforms consist of those with support in the `master` branch. For every release, the build must complete successfully and pass a full CI test run on every *Supported* platform.

*Experimental* Platforms consist of those for which there is active ongoing development to port Node.js to the platform but functionality may not yet be feature complete or fully operational. Support for experimental platforms may not yet have been committed to `master` and might be done in a Development branch or separate repository entirely.

*Supported* and *Experimental* Platforms remain active so long as there are Collaborators actively maintaining support for them.

*Deprecated* Platforms consist of platforms for which: (a) there is no active development, (b) there are no Collaborators actively maintaining support, or (c) it is no longer feasible or practical to continue supporting.

It is possible for build and CI infrastructure updates to cause failures in existing *Supported* platforms. This can happen, for instance, when an updated dependency forces the build to use an updated toolchain that is not yet (or no longer) supported on a given platform. In such cases, Collaborators should be notified  in advance that such changes are expected so that appropriate fixes on affected platforms can be planned and landed. Effort should be made to ensure that the build and CI infrastructure continues to work on all currently *Supported* platforms. Prior to the next release, however, if it becomes clear that the build cannot be fixed on a particular platform, it can be moved to *Deprecated* status and landing the changes would require a *semver-major* version increase.

Support for *Deprecated* Platforms may be removed entirely after the next *semver-major* version increase.

Note that the option to deprecate an existing supported platform should not be taken lightly. Given that deprecation of the platform would require a *semver-major* version increase, such changes must be reviewed and approved by the TSC.

### Dependency Stability

#### JavaScript Support (V8)

Node.js will adopt new V8 releases as quickly as practically feasible. For Releases, the version of V8 shipped must be fully functional with no regressions on all *Supported* platforms.

When V8 ships a breaking change to their C++ API that can be handled by the binary abstraction layer there will be a *semver-minor* version increase.

When V8 ships a breaking change to their C++ API that cannot be handled by the binary abstract layer there will be a *semver-major* version increase.

When new features in the JavaScript language are introduced by V8, there will be a *semver-minor* version increase. TC39 has stated clearly that no backwards incompatible changes will be made to the language so it is appropriate to increase the *minor* rather than the *major*.

With a few notable exceptions, the Node.js Core Library API is largely built around ES5 Language features. While there are currently no plans to do so, it is possible for post-ES5 JavaScript language features to be introduced into the Core Library API in the future. If such changes can be introduced in a manner that is transparent to module and application developers and will not cause existing applications to break, the changes can be landed after sufficient review with either a *semver-patch* or *semver-minor* version increase (depending on whether the change introduces new APIs). However, if the changes cause a backwards incompatible change to the existing API or could cause existing modules and applications to break the change must be reviewed and approved by the TSC and must result in a *semver-major* version increase.

#### Other dependencies

Other dependencies such as OpenSSL, libuv and http-parser are handled similarly.

Node.js will continue to adopt new dependency releases as often as practically feasible.

When a dependency ships a breaking change to their API, if that change can be abstracted by the Node.js Application Binary Interface such that module and application developers can be isolated from the change without breaking existing applications, there will be a *semver-minor* version increase.

When a dependency ships a breaking change to their API that cannot be abstracted by the Node.js Application Binary Interface, there will be a *semver-major* version increase.

When dependencies introduce additional functionality that does not break backwards compatibility in any way, there will be a *semver-minor* version increase.

#### npm

While the `npm` utility is shipped as part of Node.js, it is not a functional dependency in the same way as V8, OpenSSL or libuv. Specifically, `npm` is not considered part of the Node.js API. As a general rule, *semver-patch* and *semver-minor* updates in `npm` may be introduced into Node.js with only a *semver-patch* version increase. If there is a *semver-major* update in `npm`, such as when `npm` rolls over to version 3.0.0, then a *semver-major* version increase should occur in Node.js. However, the TSC may alter this policy in the future depending on the nature and scope of changes expected in newer versions of `npm`.

## Working Groups

Working Groups are autonomous groups of Collaborators chartered by the TSC to oversee specific aspects of the Project. Working groups can be formed at any time but must be ratified by the TSC.

Every Working Group has a charter that details it's area of responsibility. Once approved by the TSC, the Working Group becomes solely responsible for items detailed in that charter.

When applicable, the charter should indicate the conditions under which the Working Group's activity can be considered to be complete and the WG can be dissolved. A Working Group can, at any time, request that the TSC dissolve the Working Group by opening an issue requesting dissolution with the *tsc-agenda* tag.

The TSC may revoke the Working Groups charter at any time following the decision making process defined in the TSC Charter.

Proposals to create a new Working Group should be made either by opening an issue or submitting a PR with the draft charter for the new Working Group, then putting that on the TSC agenda using the *tsc-agenda* tag.

### Transition of io.js Working Groups

The io.js project currently has a number of Working Groups already chartered as detailed here: https://github.com/nodejs/node/blob/v1.x/WORKING_GROUPS.md. Upon the launch of the Foundation and approval of the Foundation TSC charter, these existing Working Groups (and their existing membership) would be absorbed into the project (see https://github.com/joyent/nodejs-advisory-board/blob/master/governance-proposal/WG-Merger.md). The TSC should perform a one-time review the existing WG charters and determine if any modification of their existing charters are required. It is expected that most (if not all) of the existing Working Groups will be transitioned without requiring recharter.

## Developer's Certificate of Origin 1.0

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I have the right to submit it under the open source license indicated in the file; or

(b) The contribution is based upon previous work that, to the best of my knowledge, is covered under an appropriate open source license and I have the right under that license to submit that work with modifications, whether created in whole or in part by me, under the same open source license (unless I am permitted to submit under a different license), as indicated in the file; or

(c) The contribution was provided directly to me by some other person who certified (a), (b) or (c) and I have not modified it.

## A Few Open Questions

1. What about things like http_parser and libuv? Does it make sense to see about bringing each into the foundation as their own projects?
2. What about all the other repos under iojs/* and joyent/*, which of those will move over to the foundation?

## Notes

1. The existing Node.js Workflow requires that all PR's can only be landed using a specific Jenkin's "node-accept-pull-request" job. This document requires that all PR's must be tested to ensure that all tests pass but it does not go into specific detail on the CI process. It is expected that the TSC will establish the specific step-by-step process by which Pull Requests must be landed.

2. The existing Node.js Workflow recently introduced the notion of "Priority" and "Status" tags for Issues. For instance, the *P-0* tag can be used to label issues that break node on at least one supported platform and need to be resolved as quickly as possible. The intent of the Priority tags is to assist in the triage of issues and help Collaborators determine which issues to work on first. The io.js project currently does not have a similar mechanism and feedback from io.js participants has been that such a Priority tagging system may not be of use (and could be actively harmful) given the way they've chosen to handle issues.

3. Within io.js, the Binary Abstraction Layer of choice is currently `NAN`. Several of the Node.js contributors are not yet sure if `NAN` is the right choice. This will need to be decided at some point. For now, I've abstracted the abstraction layer in this document.
