---
layout: about.hbs
title: Releases
---
# Releases

The core team defines the roadmap's scope, as informed by Node.js' community.
Releases happen as often as necessary and practical, but never before work is
complete. Bugs are unavoidable, but pressure to ship a release will never
prevail over ensuring the software is correct. The commitment to quality
software is a core tenet of the Node.js project.

## Patches

Patch releases:

- Include bug, performance, and security fixes.
- Do not add nor change public interfaces.
- Do not alter the expected behavior of a given interface.
- Can correct behavior if it is out-of-sync with the documentation.
- Do not introduce changes which make seamless upgrades impossible.

## Minors

Minor releases:

- Include additions and/or refinements of APIs and subsystems.
- Do not generally change APIs nor introduce backwards-incompatible breaking
changes, except where unavoidable.
- Are mostly additive releases.

## Majors

Major releases:

- Usually introduce backwards-incompatible, breaking changes.
- Identify the API Node.js intends to support for the foreseeable future.
- Require conversation, care, collaboration and appropriate scoping by the team
and its users.

## Scoping Features

The team can add features and APIs into Node.js when:

- The need is clear.
- The API or feature has known consumers.
- The API is clean, useful, and easy-to use.

If when implementing core functionality for Node.js, the team or community may
identify another lower-level API which could have utility beyond Node.js. When
identified, Node.js can expose it for consumers.

For example, consider the [`EventEmitter`] interface.  The need to have an event
subscription model for core modules to consume was clear, and that abstraction
had utility beyond the Node.js core.  It was not the case that its interface
couldn't be implemented externally to Node.js; instead, Node.js needed the
abstraction for itself, and also exposed it for use by Node.js consumers.

Alternatively, it may be that many in the community adopt a pattern to handle
common needs which Node.js does not satisfy.  It may be clear that Node.js
should deliver, by default, an API or feature for all Node.js consumers.
Another possibility is a commonly-used compiled asset which is difficult to
deliver across environments.  Given this, Node.js may incorporate those changes
directly.

The core team does not take the decision lightly to add a new API to Node.js.
Node.js has a strong commitment to backwards compatibility. As such, community
input and conversation must occur before the team takes action. Even if an API
is otherwise suitable for addition, the team must identify potential consumers.

## Deprecation

On occasion, the team must deprecate a feature or API of Node.js. Before coming
to any final conclusion, the team must identify the consumers of the API and how
they use it.  Some questions to ask are:

- If this API is widely used by the community, what is the need for flagging it
as deprecated?
- Do we have a replacement API, or is there a transitionary path?
- How long does the API remain deprecated before removal?
- Does an external module exist which its consumers can easily substitute?

The team takes the same careful consideration when deprecating a Node.js API as
they do when adding another.

[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
