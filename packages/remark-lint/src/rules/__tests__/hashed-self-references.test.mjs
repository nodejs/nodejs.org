import { describe, it } from 'node:test';

import hashedSelfReference from '../hashed-self-reference.mjs';
import { testRule } from './utils.mjs';

const testCases = [
  {
    name: 'ignores links to other paths',
    input: '[external](./other.md)',
    path: 'docs/current.md',
    expected: [],
  },
  {
    name: 'accepts hashed self-reference',
    input: '[header](#my-heading)',
    path: 'docs/current.md',
    expected: [],
  },
  {
    name: 'reports self-reference with fragment',
    input: '[bad link](./current.md#section)',
    path: 'docs/current.md',
    expected: [
      'Self-reference must start with hash (expected "#section", got "./current.md#section")',
    ],
  },
  {
    name: 'reports self-reference to path only',
    input: '[bad link](./current.md)',
    path: 'docs/current.md',
    expected: [
      'Self-reference must start with hash (expected "#", got "./current.md")',
    ],
  },
  {
    name: 'ignores external links',
    input: '[nodejs](https://nodejs.org)',
    path: 'docs/current.md',
    expected: [],
  },
];

describe('hashed-self-references', () => {
  for (const { name, input, expected, ...options } of testCases) {
    it(name, () =>
      testRule(hashedSelfReference, input, expected, {
        ...options,
        cwd: process.cwd(),
      })
    );
  }
});
