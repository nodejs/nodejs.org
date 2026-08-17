import { describe, it } from 'node:test';

import dedent from 'dedent';

import { testRule } from './utils.mjs';
import invalidDeprecations from '../invalid-deprecations.mjs';

const TYPE = 'Type: [...]';
const CHANGES = dedent`
  <!-- YAML
  changes:
  -->
  `;
const BODY = TYPE + '\n' + CHANGES;

const testCases = [
  {
    name: 'in order deprecations',
    input: dedent`
      ## DEP0001:
      ${BODY}
      ## DEP0002:
      ${BODY}
    `,
    expected: [],
  },
  {
    name: 'out of order deprecations',
    input: dedent`
      ## DEP0001:
      ${BODY}
      ## DEP0003:
      ${BODY}
    `,
    expected: [
      'Deprecation codes are out of order. Expected DEP0002, saw "DEP0003"',
    ],
  },
  {
    name: 'skipped deprecations',
    input: dedent`
      ## DEP0001:
      ${BODY}
      <!-- md-lint skip-deprecation DEP0002 -->
      ## DEP0003:
      ${BODY}
    `,
    expected: [],
  },
  {
    name: 'out of order skipped deprecations',
    input: dedent`
      ## DEP0001:
      ${BODY}
      <!-- md-lint skip-deprecation DEP0004 -->
      ## DEP0003:
      ${BODY}
    `,
    expected: [
      'Deprecation codes are out of order. Expected DEP0002, saw "DEP0004"',
    ],
  },
  {
    name: 'not enough skipped deprecations',
    input: dedent`
      ## DEP0001:
      ${BODY}
      <!-- md-lint skip-deprecation DEP0002 -->
      ## DEP0004:
      ${BODY}
    `,
    expected: [
      'Deprecation codes are out of order. Expected DEP0003, saw "DEP0004"',
    ],
  },
  {
    name: 'no type',
    input: dedent`
      ## DEP0001:
      some text
      ${CHANGES}
    `,
    expected: ['Deprecation "DEP0001" is missing a "Type"'],
  },
  {
    name: 'no changes',
    input: dedent`
      ## DEP0001:
      ${TYPE}
    `,
    expected: ['Deprecation "DEP0001" is missing changes'],
  },
];

describe('invalid-deprecations', () => {
  for (const { name, input, expected, options } of testCases) {
    it(name, () =>
      testRule(
        invalidDeprecations,
        input,
        expected,
        { stem: 'deprecations' },
        options
      )
    );
  }
});
