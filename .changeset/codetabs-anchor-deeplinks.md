---
'@node-core/ui-components': major
---

Add URL-fragment deep links to CodeTabs. CSS selects the visible panel without JavaScript; a client enhancement keeps keyboard navigation and ARIA state in sync with the fragment.

CodeTabs now expects one raw child per tab, in tab order. Replace Radix `Tabs.Content` children with their contents. Arrays and fragments are supported; components that internally render multiple panels must be expanded at the call site. This replaces the previous Radix context and is a breaking change for direct CodeTabs consumers. The MDX wrapper remains compatible.

Use a unique `groupId` for durable links. Fragments are `{slug(groupId)}-{slug(tabKey)}-{index}`; reordering tabs changes them. Generated instance prefixes avoid collisions but are not a permanent URL contract.
