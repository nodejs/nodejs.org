import { describe, it } from 'node:test';

import validateVersionRule from '../validate-versions.mjs';
import { testRule } from './utils.mjs';

const testCases = [
  {
    name: 'does not report on valid, sorted versions',
    input: {
      added: ['v2.0.0', 'v1.0.0'],
      removed: 'v3.0.0',
    },
    expected: [],
  },
  {
    name: 'reports invalid version format',
    input: {
      added: 'foo',
    },
    expected: ['In "added": foo is invalid'],
  },
  {
    name: 'reports unsorted versions',
    input: {
      deprecated: ['v1.0.0', 'v2.0.0'],
    },
    expected: ['In "deprecated": Versions are unsorted'],
  },
  {
    name: 'handles REPLACEME correctly when alone',
    input: {
      added: 'REPLACEME',
    },
    expected: [],
  },
  {
    name: 'reports REPLACEME when part of multi-entry array',
    input: {
      removed: ['REPLACEME', 'v1.0.0'],
    },
    expected: [
      'In "removed": REPLACEME is invalid',
    ],
  },
  {
    name: 'ignores ancient hardcoded versions (e.g. 0.1.0)',
    input: {
      added: 'v0.1.0',
    },
    expected: [],
  },
  {
    name: 'does not report when key is missing',
    input: {
      napiVersion: 4,
    },
    expected: [],
  },
];

describe('validate-version', () => {
  for (const { name, input, expected } of testCases) {
    it(name, () => {
      testRule(validateVersionRule, input, expected);
    });
  }
});
