---
'@node-core/remark-lint': patch
---

Use `@doc-kit/core` instead of `@node-core/doc-kit` 1.x. Heading anchors now follow doc-kit 2's slugs (`child_process` links as `#child_process`), and `invalid-type-reference` no longer treats HTML comments and tags as type references.
