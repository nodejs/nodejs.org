import { describe, it } from 'node:test';

import dedent from 'dedent';

import duplicateStabilityNodes from '../duplicate-stability-nodes.mjs';
import { testRule } from './utils.mjs';

const testCases = [
  {
    name: 'no stability nodes',
    input: dedent`
      # Heading 1

      > No stability here.
    `,
    expected: [],
  },
  {
    name: 'single stability blockquote',
    input: dedent`
      # Heading 1

      > Stability: 1.0
    `,
    expected: [],
  },
  {
    name: 'different stabilities under different headings',
    input: dedent`
      # Heading 1

      > Stability: 1.0

      ## Heading 2

      > Stability: 2.0
    `,
    expected: [],
  },
  {
    name: 'duplicate stability at deeper heading triggers message',
    input: dedent`
      # Heading 1

      > Stability: 1.0

      ## Heading 2

      > Stability: 1.0
    `,
    expected: ['Duplicate stability node'],
  },
];

describe('duplicate-stability-nodes', () => {
  for (const { name, input, expected } of testCases) {
    it(name, () => testRule(duplicateStabilityNodes, input, expected));
  }
});
