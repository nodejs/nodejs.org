---
'@node-core/ui-components': major
---

On mobile, `Sidebar` now collapses its navigation tree behind a disclosure instead of flattening every page into a select, so large sites stay navigable and the navigation is rendered once. The `onSelect` prop is removed, since navigation now happens through the rendered links.
