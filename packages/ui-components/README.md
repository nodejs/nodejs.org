# Node.js UI Components

This package is comprised of UI components for use in the Node.js website, documentation,
and other aspects of the project.

The components are based on [this design file](https://www.figma.com/design/a10cjjw3MzvRQMPT9FP3xz/Node.js).

Most components in this package are available on [Chromatic](https://www.chromatic.com/library?appId=64c7d71358830e9105808652).

For additional details regarding specific components, refer to the [nodejs/nodejs.org](https://github.com/nodejs/nodejs.org) repository.

## Local development

To use this package via `npm link` in another repo (for example, doc-kit), build the
compiled outputs and keep them updated while you work.

```bash
# From nodejs.org/packages/ui-components
pnpm install
node --run compile:watch

# In another terminal, still in nodejs.org/packages/ui-components
npm link

# From the consumer repo (for example doc-kit)
npm link @node-core/ui-components
```

The `compile:watch` script keeps `dist/` up to date so consumers resolve compiled
CSS and JavaScript instead of the raw Tailwind source.
