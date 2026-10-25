---
'@node-core/ui-components': patch
---

Stop installing `@vcarl/remark-headings` and `@orama/orama` at runtime. The `Heading` type now comes from `#ui/types`, and `@orama/orama` is only used by Storybook.
