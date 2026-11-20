---
'@node-core/rehype-shiki': minor
---

Cache each line's tokens for all the themes code is highlighted in when two or more are given by name, as the default themes now are, instead of tokenizing it again for each. The new `@node-core/rehype-shiki/cache` module exports `withTokenizationCache`, which does this for any Shiki highlighter.
