import path from 'node:path';

import { testRule } from '../../__tests__/utils.mjs';

const cwd = path.join(import.meta.dirname, 'fixtures/links');
const api = { cwd, path: 'doc/api/fs.md' };
const site = {
  cwd,
  path: 'pages/en/index.mdx',
  options: {
    basePaths: ['pages/en', 'pages', 'public', '.'],
    fragments: 'self',
    slugger: 'github',
  },
};

testRule('link-targets', [
  {
    name: 'existing files and anchors',
    ...api,
    input:
      '# File system\n\n## Class: `fs.Dir`\n\n[a](stream.md#class-streamreadable) [b](stream.md#DEP0001) [c](stream.md#event-close-1) [d](stream.md#custom-anchor) [e](#class-fsdir) [f](other.md) [g](https://example.com/x) [h](../api) [i](./)\n',
    expected: [],
  },
  {
    name: 'missing file',
    ...api,
    input: '# T\n\n[a](missing.md)\n',
    expected: ['Cannot find file for link `missing.md`'],
  },
  {
    name: 'missing anchor in the current document',
    ...api,
    input: '# T\n\n[a](#nope)\n',
    expected: ['Cannot find heading for `#nope`'],
  },
  {
    name: 'missing anchor in another document',
    ...api,
    input: '# T\n\n[a](stream.md#nope)\n',
    expected: ['Cannot find heading for `#nope` in `stream.md`'],
  },
  {
    name: 'doc-kit deprecation anchors are case-sensitive',
    ...api,
    options: { slugger: 'doc-kit' },
    input: '# T\n\n[a](stream.md#dep0001-something)\n',
    expected: [/Cannot find heading for `#dep0001-something`/],
  },
  {
    name: 'cross-document anchors can be skipped',
    ...api,
    options: { fragments: 'self' },
    input: '# T\n\n[a](stream.md#nope) [b](#nope)\n',
    expected: ['Cannot find heading for `#nope`'],
  },
  {
    name: 'ignored links',
    ...api,
    options: { ignoreLinks: ['/learn/**'] },
    input: '# T\n\n[a](/learn/foo)\n',
    expected: [],
  },
  {
    name: 'ignored files',
    ...api,
    options: { ignoreFiles: ['doc/api/*.md'] },
    input: '# T\n\n[a](missing.md)\n',
    expected: [],
  },
  {
    name: 'root-relative routes resolve against base paths',
    ...site,
    input:
      '# T\n\n[a](/about/previous-releases) [b](/static/logo.svg) [c](/en/about/previous-releases) ![d](/static/logo.svg)\n',
    expected: [],
  },
  {
    name: 'missing route',
    ...site,
    input: '# T\n\n[a](/about/nope)\n',
    expected: ['Cannot find file for link `/about/nope`'],
  },
  {
    name: 'github slugs',
    ...site,
    input:
      '# T\n\n## Node.js & More\n\n### 7.1 Updating `it` _(optional)_\n\n[a](#nodejs--more) [b](#71-updating-it-optional)\n',
    expected: [],
  },
  {
    name: 'several anchor flavors',
    ...api,
    options: { slugger: ['doc-kit', 'github'] },
    input:
      '# T\n\n### `-r`, `--require module`\n\n[a](#-r---require-module) [b](stream.md#dep0001-something) [c](#nope)\n',
    expected: ['Cannot find heading for `#nope`'],
  },
]);
