# Collaborator Guide

This document contains information for Collaborators of the Node.js website project regarding maintaining the code, documentation, and issues.

Collaborators should be familiar with the guidelines for new contributors in [Getting Started](./getting-started.md) and our [Code Style](./code-style.md) guidelines.

## Table of Contents

- [Collaborator Responsibilities](#collaborator-responsibilities)
  - [Issues and Pull Requests](#issues-and-pull-requests)
    - [Issue Management](#issue-management)
    - [Pull Request Management](#pull-request-management)
- [Accepting Modifications](#accepting-modifications)
  - [Review Requirements](#review-requirements)
  - [Review Process](#review-process)
- [Pull Request Policy](#pull-request-policy)
  - [Before Merging](#before-merging)
    - [Timing Requirements](#timing-requirements)
    - [Exceptions for Immediate Merging](#exceptions-for-immediate-merging)
    - [Fast-tracking Process](#fast-tracking-process)
    - [Consensus and Objections](#consensus-and-objections)
  - [When Merging](#when-merging)
    - [Required Checks](#required-checks)
    - [Testing Requirements](#testing-requirements)
- [Becoming a Collaborator](#becoming-a-collaborator)
  - [Prerequisites](#prerequisites)
  - [Application Process](#application-process)
    - [Nomination Requirements](#nomination-requirements)
    - [Nomination Issue Content](#nomination-issue-content)
    - [Approval Process](#approval-process)
  - [Maintaining Collaborator Status](#maintaining-collaborator-status)
    - [Policy Adherence](#policy-adherence)
    - [Activity Requirements](#activity-requirements)
    - [Consequences of Inactivity](#consequences-of-inactivity)

## Collaborator Responsibilities

### Issues and Pull Requests

Courtesy should always be shown to individuals submitting issues and pull requests to the Node.js website project.

Collaborators should feel free to take full responsibility for managing issues and pull requests they feel qualified to handle, as long as this is done while being mindful of these guidelines, the opinions of other Collaborators and guidance of the Website Team.

#### Issue Management

- **Close irrelevant issues**: Collaborators may close any issue or pull request they believe is not relevant to the future of the Node.js project
- **Allow discussion time**: When relevance is unclear, leave issues open for several days for additional discussion
- **Re-opening**: Remember that issues can always be re-opened if necessary
- **Seek input**: If no input from collaborators or evidence of relevance emerges, issues may be closed

#### Pull Request Management

> [!TIP]
> Avoid updating/rebasing PRs unnecessarily. We use [GitHub Merge Queues](https://github.blog/2023-07-12-github-merge-queue-is-generally-available/) to merge Pull Requests, which automatically rebases and runs CI-checks against the latest merge commit.

## Accepting Modifications

All Node.js code and documentation modifications should be performed via GitHub pull requests. Only the Website Team can merge their work and should do so carefully.

### Review Requirements

- **Expert Review**: All pull requests must be reviewed and accepted by a Collaborator with sufficient expertise who can take full responsibility for the change
- **Additional Sign-off**: Pull requests proposed by existing Collaborators require an additional Collaborator for sign-off
- **CI Requirements**: Pull Requests can only be merged after all CI Checks have passed
- **Manual CI Trigger**: CI Checks need to be manually triggered by adding a `github_actions:pull-request` label to the Pull Request

### Review Process

1. **Assess Expertise**: If you are unsure about the modification and are not prepared to take full responsibility for the change, defer to another Collaborator
2. **Summon Experts**: In some cases, it may be necessary to summon a qualified Collaborator to a pull request for review by @-mention
3. **Follow Guidelines**: Follow the guidelines in the [Pull Request Policy](#pull-request-policy) for reviewing and merging Pull Requests

## Pull Request Policy

This policy governs how contributions should land within this repository.

### Before Merging

#### Timing Requirements

- **Minimum Open Time**: Pull Requests must be open for at least 48 hours (or 72 hours if authored on weekends).
- **No Objections**: There must be no objections after the minimum time period
- **At Least One Approval**: At least one approval is required for any PR to be merged

#### Exceptions for Immediate Merging

Pull requests might be immediately merged if they contain:

- Critical bug fixes
- Short errata (e.g., typos from previous PRs)
- Critical changes considered "showstoppers" for the website's functionality

#### Fast-tracking Process

Pull requests can be "fast-tracked" (merged before 48 hours) if:

1. **Label Applied**: A "fast-track" label is added
2. **Comment Required**: The person fast-tracking must comment explaining the request
3. **Approval Needed**: Must have at least one 👍 reaction if the fast-tracker is the PR author

#### Consensus and Objections

- **Seek Consensus**: If there are disagreements, consensus should be sought
- **Escalation**: Lack of consensus might require escalation to the Website Team Maintainers
- **Address Objections**: All objections must be addressed before merging
- **External Objections**: Objections from TSC or Core Collaborators are valid and must be resolved

### When Merging

#### Required Checks

- **Status Checks**: All required status checks must have passed
- **CI Label**: Remember to run CI checks by labeling PR with `github_actions:pull-request`
- **Discussions Resolved**: Ensure all discussions are resolved

#### Testing Requirements

- **Include Tests**: Tests must be included in Pull Requests for new features or bug fixes
- **Fix Failing Tests**: Contributors are responsible for fixing any test(s) that fail
- **Comprehensive Coverage**: Ensure tests adequately cover the changes made

## Becoming a Collaborator

A Collaborator of the Node.js Website repository is a member of the Node.js Website Team.

### Prerequisites

The Website Team is responsible for technical development of the Node.js Website, so team members should have:

- Significant knowledge about modern Web Technologies
- Understanding of Web Standards
- Active contribution history to the repository

> [!INFO]
> Regular contributors do not need to become "Collaborators" as any contribution is appreciated, and Collaborator status is a formality that comes with obligations.

### Application Process

If you're an active contributor seeking to become a member, contact one of the existing Team Members for guidance.

#### Nomination Requirements

- **Active Contribution**: Must be actively contributing to the repository
- **Significant Involvement**: Contributions must include significant code reviews or code contributions
- **Team Nomination**: Nomination must be done by an existing Website Team member via GitHub Issue

#### Nomination Issue Content

The nomination issue must include:

- Explanation of why the nominated person is a good addition to the team
- Links to relevant contributions:
  - Code Reviews
  - Comments on Issues and PRs
  - Authoring of PRs or Issues
  - Comments or Authoring of Discussions

#### Approval Process

- **Three Approvals**: At least three existing Website Team members must agree (via comments or 👍 reactions)
- **Waiting Period**: Issue must be open for at least 72 hours without objections
- **Objection Resolution**: All objections must be resolved before proceeding
- **External Objections**: Objections from TSC or Core Collaborators count as valid objections

### Maintaining Collaborator Status

Once you become a collaborator, maintain your status by:

#### Policy Adherence

- **Moderation Policy**: Abide by the [Node.js Moderation Policy](https://github.com/nodejs/admin/blob/HEAD/Moderation-Policy.md)
- **Code of Conduct**: Follow the [Code of Conduct](https://github.com/nodejs/node/blob/HEAD/CODE_OF_CONDUCT.md)

#### Activity Requirements

- **Regular Commits**: Author commits at least once in the past twelve months
- **Active Participation**: Engage in project discussions and reviews

#### Consequences of Inactivity

- **Twelve Month Rule**: Collaborators inactive for more than twelve months may be removed from the active collaborators list
- **Reinstatement**: Can be reinstated upon returning to active participation through the same nomination process
- **Policy Violations**: Violations may result in immediate removal depending on severity and TSC decision
