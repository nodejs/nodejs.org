---
'@node-core/ui-components': patch
---

Resolve the `#ui/*` import alias to the compiled output by default, so consumers
of the published package no longer need to opt into a bundler-specific
`rolldown` resolution condition. The uncompiled sources stay reachable through
the new `source` condition, which this repository's own tooling opts into.
