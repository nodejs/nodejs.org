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

You can then run `remark` over your markdown files:

```bash
npx remark . --frail
```

## Settings

### `NODE_RELEASED_VERSIONS`

Some lint rules (such as `node-core:yaml-comments`) require knowledge of released Node.js versions to validate version references.

You can provide these using the `NODE_RELEASED_VERSIONS` environment variable:

```bash
NODE_RELEASED_VERSIONS=20.12.0,18.19.1,16.20.2 npx remark .
```

If not set, version-related rules will accept any valid SemVer.
