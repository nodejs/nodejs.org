import { describe, it } from 'node:test';

import validateKeys from '../../yaml/ordered-yaml-keys.mjs';
import { testYamlRule } from '../utils.mjs';

const testCases = [
  {
    name: 'does not report when keys are valid and in correct order',
    input: {
      added: 'v1.0.0',
      napiVersion: 3,
      deprecated: 'v2.0.0',
      removed: 'v3.0.0',
      changes: [],
    },
    expected: [],
  },
  {
    name: 'reports invalid keys',
    input: {
      added: 'v1.0.0',
      unexpected: true,
      oops: false,
    },
    expected: ['Invalid key(s) found: unexpected, oops'],
  },
  {
    name: 'reports out-of-order keys',
    input: {
      removed: 'v3.0.0',
      added: 'v1.0.0',
    },
    expected: [
      'Key "added" is out of order. Expected order: added, napiVersion, deprecated, removed, changes',
    ],
  },
  {
    name: 'reports both invalid and out-of-order keys (first invalid)',
    input: {
      foo: true,
      deprecated: 'v2.0.0',
      added: 'v1.0.0',
    },
    expected: [
      'Invalid key(s) found: foo',
      'Key "added" is out of order. Expected order: added, napiVersion, deprecated, removed, changes',
    ],
  },
  {
    name: 'does not report on empty object',
    input: {},
    expected: [],
  },
];

describe('ordered-yaml-keys', () => {
  for (const { name, input, options, expected } of testCases) {
    it(name, () => {
      testYamlRule(validateKeys, input, options, expected);
    });
  }
});
