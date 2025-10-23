# `@node-core/remark-lint`

A [`remark-lint`](https://github.com/remarkjs/remark-lint) plugin with configurations tailored to the documentation and contribution standards of the [Node.js GitHub Organization](https://github.com/nodejs).

## Installation

```bash
npm install --save-dev @node-core/remark-lint
```

## Usage

Add the plugin to your `.remarkrc` or `remark.config.js`:

```json
{
  "plugins": ["@node-core/remark-lint"]
}
```

Run remark to lint your Markdown files:

```bash
npx remark . --frail
```

## Configuration

### Released Versions

Some rules, such as `node-core:yaml-comments`, validate version references against known released Node.js versions. You can provide these using the `releasedVersions` option:

```json
{
  "plugins": [
    [
      "@node-core/remark-lint",
      {
        "releasedVersions": ["v18.0.0", "v18.1.0", "v18.2.0", "v20.0.0"]
      }
    ]
  ]
}
```

For Node.js projects, these versions can be automatically generated [using `list-released-versions-from-changelogs.mjs`](https://github.com/nodejs/node/blob/main/tools/lint-md/list-released-versions-from-changelogs.mjs).

If not specified, version-related rules will accept any valid SemVer format.

## Rules

### `node-core:duplicate-stability-nodes`

Prevents redundant stability markers in nested sections.

**Not allowed:**

```markdown
# Parent Section

> Stability: 2 - Stable

## Child Section

> Stability: 2 - Stable <!-- Redundant! -->
```

### `node-core:invalid-type-reference`

Ensures that all `{type}` references are valid types and formatted correctly.

**Allowed:**

```markdown
This is usually a {boolean}, but it could also be a {string|number}.
```

**Not allowed:**

```markdown
This is an {invalid} type, and so is {string | number} because there should **not** be whitespace around the `|`.
```

### `node-core:hashed-self-reference`

Ensures self-references use fragment-only links.

**Allowed:**

```markdown
See the [Introduction](#introduction) section.
```

**Not allowed:**

```markdown
See the [Introduction](document.md#introduction) section.
```

### `node-core:ordered-references`

Enforces alphabetical sorting of reference-style link definitions.

**Allowed:**

```markdown
[api]: https://example.com/api
[docs]: https://example.com/docs
[info]: https://example.com/info
```

### `node-core:required-metadata`

Requires essential metadata for documentation:

- `llm_description`: A description for Large Language Models (can be inferred from first paragraph)
- `introduced_in`: API introduction version

Metadata can be provided in comments:

```markdown
<!-- llm_description= Utilities for working with file paths -->
```

### `node-core:yaml-comments`

Enforces structure and content of YAML comment blocks:

- `added`: An array of valid version strings
- `napiVersion`: The N-API version
- `deprecated`: An array of valid version strings
- `removed`: An array of valid version strings
- `changes`: An array of:
  - `pr-url`: Pull request URL
  - `commit`: Commit hash (only required for security fixes)
  - `version`: Valid version string
  - `description`: Change description

All version references must be valid SemVer, or match the provided `releasedVersions`.
