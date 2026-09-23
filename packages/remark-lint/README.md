# `@node-core/remark-lint`

[`remark-lint`](https://github.com/remarkjs/remark-lint) presets and rules for the documentation of the [Node.js organization](https://github.com/nodejs): general Markdown style, and full conformance with the [doc-kit Markdown specification](https://github.com/nodejs/doc-kit/blob/main/docs/specification.md) that powers the Node.js API documentation.

## Installation

```bash
npm install --save-dev @node-core/remark-lint
```

## Usage

### `@node-core/remark-lint`

General Markdown style for READMEs, guides and the website.

```json
{
  "plugins": ["@node-core/remark-lint"]
}
```

### `@node-core/remark-lint/api`

Everything in the base preset, plus the rules that make a document conform to the doc-kit specification and to the Node.js API documentation conventions.

```json
{
  "plugins": [
    [
      "@node-core/remark-lint/api",
      {
        "releasedVersions": ["v22.0.0", "v20.12.0"],
        "typeMap": "doc/type-map.json"
      }
    ]
  ]
}
```

With `unified` directly:

```js
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import nodeCoreLint from '@node-core/remark-lint/api';

const processor = unified()
  .use(remarkParse)
  .use(nodeCoreLint, { typeMap: 'doc/type-map.json' })
  .use(remarkStringify);
```

The preset registers GitHub Flavored Markdown and doc-kit's `{Type}` annotation syntax on the processor, so the document is parsed exactly the way doc-kit parses it, and `remark-stringify` reproduces the source byte-for-byte (formatters relying on it keep working).

## Configuration

The options object is keyed by **rule name**. Every rule — the `node-core` rules and the bundled `remark-lint` rules alike — is configured the same way:

```json
{
  "plugins": [
    [
      "@node-core/remark-lint/api",
      {
        "maximum-line-length": 100,
        "no-shell-dollars": "off",
        "typed-list-default": "error",
        "type-annotation-style": { "unionSpacing": "always" },
        "link-targets": ["error", { "fragments": "self" }],
        "prefer-reference-links": true
      }
    ]
  ]
}
```

A rule's value can be:

| Value                         | Meaning                                                              |
| ----------------------------- | -------------------------------------------------------------------- |
| `false`, `"off"`, `0`         | Turn the rule off.                                                   |
| `true`, `"on"`, `"warn"`, `1` | Turn the rule on as a warning, keeping the preset's options.         |
| `"error"`, `2`                | Turn the rule on as an error (a fatal message), keeping the options. |
| `[severity, options]`         | Both.                                                                |
| Anything else                 | The rule's options; this turns the rule on.                          |

Options of `node-core` rules are objects that are shallow-merged with the rule's defaults, so you only need to name what you change. Bundled `remark-lint` rules take whatever their own package documents (`"heading-style": "atx"`, `"fenced-code-flag": { "flags": ["js"] }`, ...).

Unknown rule names throw, so typos are caught immediately.

### Shared options

A few option keys are not rules:

- `releasedVersions`: an array (or comma-separated string) of released versions, with or without the `v` prefix. When given, every version in YAML metadata and `introduced_in` directives must be in it. Node.js generates this list with [`list-released-versions-from-changelogs.mjs`](https://github.com/nodejs/node/blob/main/tools/lint-md/list-released-versions-from-changelogs.mjs).
- `typeMap`: the [type map](https://github.com/nodejs/doc-kit/blob/main/docs/specification.md#83-resolution) used to resolve type annotations: an object, or a path or URL to a JSON file (for Node.js, `doc/type-map.json`).
- `settings`: `remark-stringify` settings, merged over the preset's (`bullet`, `emphasis`, `rule`, `tightDefinitions`).

### Disabling rules inline

Every rule honors `remark-lint`'s comment markers, by rule name:

```markdown
<!-- lint disable maximum-line-length typed-list-default -->

...

<!-- lint enable maximum-line-length typed-list-default -->
```

`<!-- lint ignore rule -->` turns a rule off for the next node only.

## Rules

Formatting is not linted: `remark-stringify` (which `@node-core/remark-lint` configures) and Prettier normalize list markers, heading style, emphasis, code fences, tables and blank lines, and editors handle line endings, tabs and trailing whitespace. The rules below check what a formatter cannot fix.

### Document structure

| Rule                               | Base | API | Description                                                                                                                                                                                                                                                                  |
| ---------------------------------- | ---- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `first-heading-level`              | off  | 1   | The first heading is the depth-1 document title (§3.1, §4.2.1).                                                                                                                                                                                                              |
| `document-description` (node-core) | off  | on  | The document has a description: an introductory paragraph under the title, or an `llm_description` directive (§6.2.4).                                                                                                                                                       |
| `no-frontmatter` (node-core)       | off  | on  | Metadata uses `<!-- YAML -->` comments rather than `---` frontmatter (§6.6).                                                                                                                                                                                                 |
| `required-directives` (node-core)  | off  | on  | Required document-level directives are present (§6.2). `{ keys: ['introduced_in'] }`                                                                                                                                                                                         |
| `directive-placement` (node-core)  | off  | on  | Directives immediately follow the heading they annotate; document-level ones follow the title (§3.1, §6.2). `{ documentKeys: ['introduced_in', 'source_link', 'llm_description'] }`                                                                                          |
| `directive-syntax` (node-core)     | off  | on  | Directives are single-line `<!--key=value-->` comments with consistent padding (§6.2). `{ padding: 'consistent' }` (`'always'`, `'never'`)                                                                                                                                   |
| `directive-value` (node-core)      | off  | on  | Directives use a defined key and a well-formed value: versions, document types, relative source links (§6.2.1–§6.2.5, §6.4). `{ keys: ['introduced_in', 'type', 'source_link', 'llm_description', 'name', 'module'], types, placeholders: ['REPLACEME'], releasedVersions }` |
| `tag-comment-syntax` (node-core)   | off  | on  | Plain comments do not accidentally define YAML metadata fields that doc-kit would read, nor hold metadata missing the `YAML` keyword (§6.5).                                                                                                                                 |
| `entry-order` (node-core)          | off  | on  | Within an entry, YAML metadata comes first, then at most one stability indicator, then the typed list, then prose (§3.2, §6.7, §7.6, §9.6). `{ types: ['method', 'ctor', 'classMethod', 'property', 'event', 'class'], ignoreFiles: ['documentation'] }`                     |

### Headings and signatures

| Rule                                 | Base | API | Description                                                                                                                                                                                                                                         |
| ------------------------------------ | ---- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading-depth` (node-core)          | off  | on  | Headings are at most 5 levels deep, the limit doc-kit treats as an entry (§4.2.3).                                                                                                                                                                  |
| `no-multiple-toplevel-headings`      | on   | on  | There is at most one depth-1 heading (§4.2.1).                                                                                                                                                                                                      |
| `heading-classification` (node-core) | off  | on  | API entry headings use the exact forms doc-kit classifies: identifiers in backticks, `` `new Class()` ``, Event: `'name'`, Class: `Name`, and Static method: `Class.method()` one level below its class (§4.3, §4.5). `{ staticMethodDepth: true }` |
| `heading-multiple-forms` (node-core) | off  | on  | Multiple forms of an entry in one heading are separated by `, ` (§4.5.3).                                                                                                                                                                           |
| `signature-syntax` (node-core)       | off  | on  | Signatures use bare parameter names (or a literal argument, as in `` `readable.read(0)` ``), `[, optional]` brackets (`[min, ]max` for leading optionals), `[...rest]`, and neither defaults nor types (§5).                                        |
| `signature-parameters` (node-core)   | off  | on  | Every parameter declared in a signature is documented in the typed list, as decided by doc-kit's own signature parser; consecutive overloads share one list (§5, §9). `{ reportUndeclared: false }`                                                 |

### YAML metadata

| Rule                              | Base | API | Description                                                                                                                                                                                                                                                                          |
| --------------------------------- | ---- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `yaml-comment-syntax` (node-core) | off  | on  | Blocks are `<!-- YAML` comments on their own lines holding a valid YAML 1.2 mapping (§6.1).                                                                                                                                                                                          |
| `yaml-fields` (node-core)         | off  | on  | Blocks use defined fields in order, `type` names a known entry type or context, and `napiVersion` is a positive integer (§6.3, §6.3.5). `{ keys: ['added', 'napiVersion', 'deprecated', 'removed', 'changes', 'type', 'source_link', 'llm_description'], types }`                    |
| `yaml-versions` (node-core)       | off  | on  | Version fields hold `vX.Y.Z` strings (or descending arrays of them), optionally checked against `releasedVersions`, and `changes` are ordered by version (§6.3.1–§6.3.4, §6.4). `{ fields: ['added', 'deprecated', 'removed'], placeholders: ['REPLACEME'], changes: 'descending' }` |
| `yaml-changes` (node-core)        | off  | on  | `changes` is a list of records with `version`, a pull request `pr-url`, a `description` ending with a period, and a full `commit` SHA for security changes; pre-1.0 changes are exempt (§6.3.4). `{ keys, required, prUrl, privatePrUrl, ignoreAncient: true }`                      |

### Stability indicators

| Rule                                 | Base | API | Description                                                                                                                                               |
| ------------------------------------ | ---- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stability-syntax` (node-core)       | off  | on  | Indicators take the form `> Stability: <level> - <description>` with a defined level (§7.1–§7.3). `{ levels: ['0', '1', '1.0', '1.1', '1.2', '2', '3'] }` |
| `no-redundant-stability` (node-core) | off  | on  | Nested entries do not repeat the stability of their enclosing entry. `{ compare: 'index', ignoreFiles: ['documentation'] }`                               |

Placement and count of stability indicators are checked by `entry-order`.

### Type annotations

| Rule                                     | Base | API | Description                                                                                                                                                                    |
| ---------------------------------------- | ---- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type-annotation-syntax` (node-core)     | off  | on  | Every `{Type}` annotation is a valid TypeScript type expression, parsed with the same parser doc-kit uses, and types are never written as `<Type>` (§8.1, §8.2). `{ typeMap }` |
| `type-annotation-resolution` (node-core) | off  | on  | Every type name resolves through the type map, the built-in and MDN maps, or the `module.Name` heuristic (§8.3). `{ typeMap, ignore: [] }`                                     |
| `type-annotation-style` (node-core)      | off  | on  | Annotations are unpadded, with consistent union spacing; a long union may wrap after a `\|`. `{ unionSpacing: 'never' }` (`'always'`)                                          |

### Typed lists

| Rule                                 | Base | API | Description                                                                                                                                                                                                                                                                 |
| ------------------------------------ | ---- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typed-list-item` (node-core)        | off  | on  | Items of a typed list follow the `name` {Type} description form (the type may start on the next line, and computed names such as `` `[Symbol.dispose]` `` are allowed), including nested property lists; lists that look typed but are not are reported (§9.1, §9.2, §9.4). |
| `typed-list-prefix` (node-core)      | off  | on  | `Returns:`, `Extends:` and `Type:` items are spelled exactly and followed by a `{Type}` annotation; `Extends:` comes first, in a class entry (§9.3).                                                                                                                        |
| `typed-list-default` (node-core)     | off  | on  | Defaults are introduced by exactly `**Default:**` (which is what doc-kit extracts), at most once per item, and literal values (`0`, `false`, `null`, ...) are in a code span; prose defaults and trailing explanations are fine (§9.5).                                     |
| `no-typed-list-in-prose` (node-core) | off  | on  | Parameters, return values and types are documented in typed lists, not in paragraphs (§9).                                                                                                                                                                                  |

Placement of the typed list is checked by `entry-order`.

### Code blocks

| Rule                           | Base | API | Description                                                                                                                 |
| ------------------------------ | ---- | --- | --------------------------------------------------------------------------------------------------------------------------- |
| `fenced-code-flag`             | off  | on  | Fenced code blocks have a known language identifier (§10.2). API: `{ flags: [...Node.js info strings], allowEmpty: false }` |
| `fenced-code-meta` (node-core) | off  | on  | Attributes after the language use `key="value"` syntax (§10.3). `{ keys: ['displayName'], allowUnknown: true }`             |
| `no-shell-dollars`             | on   | on  | Shell code blocks do not prefix every line with `$`.                                                                        |

### Links and definitions

| Rule                                 | Base | API | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------ | ---- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `link-targets` (node-core)           | on   | on  | Local links point at existing files (or directories), and fragments at existing headings or `id`s — in the current document, and (API) in the documents they point at. Base: `{ basePaths: ['pages/en', 'pages', 'public', '.'], fragments: 'self', slugger: 'github' }`; API: `{ basePaths: ['.'], fragments: 'all', slugger: ['doc-kit', 'github'] }`. Also `ignoreFiles`, `ignoreLinks` (globs). `slugger` accepts a list to allow several anchor flavors. |
| `man-page-reference` (node-core)     | off  | on  | Plain `name(section)` text auto-links to its manual page, so an explicit link with that text is redundant; links from code spans or other text are kept (§11.4). `{ links: true, code: false }`                                                                                                                                                                                                                                                               |
| `prefer-reference-links` (node-core) | off  | off | Links use collapsed reference style (§11.1). `{ ignoreFragments: true }`                                                                                                                                                                                                                                                                                                                                                                                      |
| `no-undefined-references`            | on   | on  | Every reference has a definition.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `no-shortcut-reference-link`         | on   | on  | Reference links are collapsed (`[text][]`) or full (§11.1).                                                                                                                                                                                                                                                                                                                                                                                                   |
| `no-shortcut-reference-image`        | on   | on  | Reference images are collapsed or full.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `definition-spacing`                 | on   | on  | Definition labels do not contain consecutive whitespace.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `no-duplicate-definitions`           | on   | on  | Definition labels are unique.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `no-unused-definitions`              | off  | on  | Every definition is referenced.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `ordered-definitions` (node-core)    | off  | on  | Definitions are sorted by label, case-sensitively, as the Node.js docs are (§11.6). `remark-lint-definition-sort` sorts lowercased identifiers instead, which does not match.                                                                                                                                                                                                                                                                                 |
| `final-definition`                   | on   | on  | Definitions are collected at the end of the document (§11.6).                                                                                                                                                                                                                                                                                                                                                                                                 |

### Files and terminology

| Rule                              | Base | API | Description                                                                                      |
| --------------------------------- | ---- | --- | ------------------------------------------------------------------------------------------------ |
| `file-extension`                  | off  | md  | Files use the `.md` extension.                                                                   |
| `no-file-name-articles`           | off  | on  | File names do not start with articles.                                                           |
| `no-file-name-consecutive-dashes` | on   | on  | File names do not contain consecutive dashes.                                                    |
| `no-file-name-outer-dashes`       | on   | on  | File names do not start or end with dashes.                                                      |
| `maximum-line-length`             | off  | 120 | Lines do not exceed the maximum length.                                                          |
| `prohibited-strings`              | off  | on  | Terminology follows the Node.js style guide (`Node.js`, `JavaScript`, `file system`, `V8`, ...). |
