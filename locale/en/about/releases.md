---
layout: about.hbs
title: Releases
---
# Releases

The roadmap is scoped by the core team, as informed by you, our users. Releases
happen as often as is necessary and practical, but never before work is
complete. The team has a strong desire to release high quality code for every
release. We know that bugs are unavoidable, but the pressure to release a new
version is always outweighed by releasing software that is as correct as we can
make it. That commitment to quality software is one of our core tenets of the
project.

## Patches

Patch releases are defined as bug, performance, and security fixes. They do not
change or add any public interfaces. They do not change the expected behavior
of a given interface. They are meant to correct behavior when it doesn't match
the documentation, without also introducing a change that makes seamless
upgrades impossible.

## Minors

Minors are the addition and refinements of APIs or subsystems. They do not
generally change APIs or introduce backwards compatible breaking changes,
except where unavoidable. These are mostly completely additive releases.

## Majors

Majors are where we can introduce breaking changes. They are also where we
identify what the API is we will be supporting for the foreseeable future.
Making a move to a new major is a difficult conversation, and requires care
and appropriate scoping.

## Scoping Features

Features and APIs can be added into Node.js when their need is clear, there are
clean, useful, agreeable APIs, and there are known consumers. For instance, it
may be the case that when implementing core functionality for Node.js another
lower level API may be identified that could have utility beyond Node.js
itself. When those APIs are identified, we can chose to expose them.

Take for instance the `EventEmitter`, the need to have an event subscription
model for core modules to consume was clear, and that abstraction clearly had
utility beyond core itself. Not that this interface couldn't be implemented as
external to Node.js, it's just that Node needed the abstraction for itself and
in turn exposed it for others.

Alternatively it may be that many people in the community are all adopting a
pattern to handle common needs that are not currently satisfied by Node, or
they are implementing a feature that should clearly be delivered by default for
all Node.js consumers. It's also possible that many in the community are
adopting a change that requires a compiled asset that can be difficult to
deliver in all environments. At that point, Node.js may decide to incorporate
those changes directly.

Adopting a new API however, is not taken lightly. Node.js has a strong
commitment to backwards compatibility. As such it is necessary to have lots of
input and conversation around the addition of a new API before it's added into
Node. Even when we've identified a suitable API it's also important to have
clearly identified the consumers of the API.

## Deprecation

It may be that we need to deprecate a feature or API of Node. Doing so takes a
lot of time and consideration before marking something as deprecated. We need
to make sure we understand to the best of our ability who is using an API, and
how that API is being used. In the case where an API is overwhelmingly in use
by the community, what is the need for marking the API deprecated? Do we have a
replacement API, is there a transitionary path that we can socialize? How many
iterations of versions do there need to before the API can be completely
removed? Is there a polyfill module that can be consumed from the community in
order to avoid as much pain as possible?

In short its not impossible for APIs to be deprecated, but just like the adding
of APIs, deprecating of an API is not something to be taken lightly.
