import { describe, it } from 'node:test';

import validateChanges from '../../yaml/validate-changes.mjs';
import { testYamlRule } from '../utils.mjs';

const testCases = [
  {
    name: 'valid change entry',
    input: {
      changes: [
        {
          version: 'v2.0.0',
          'pr-url': 'https://github.com/nodejs/node/pull/12345',
          description: 'This is a valid change.',
        },
      ],
    },
    expected: [],
  },
  {
    name: '"changes" is not an array',
    input: {
      changes: {},
    },
    expected: ['"changes" must be an Array'],
  },
  {
    name: 'invalid PR URL',
    input: {
      changes: [
        {
          version: 'v1.0.0',
          'pr-url': 'ftp://example.com/invalid',
          description: 'Something happened.',
        },
      ],
    },
    expected: [
      'In "changes[0]": "ftp://example.com/invalid" is not a valid PR URL.',
    ],
  },
  {
    name: 'invalid key in change',
    input: {
      changes: [
        {
          version: 'v1.0.0',
          'pr-url': 'https://github.com/nodejs/node/pull/123',
          description: 'Change made.',
          extra: true,
        },
      ],
    },
    expected: ['In "changes[0]": Invalid key(s) found: extra'],
  },
  {
    name: 'invalid version in change',
    input: {
      changes: [
        {
          version: 'foo',
          'pr-url': 'https://github.com/nodejs/node/pull/123',
          description: 'Change made.',
        },
      ],
    },
    expected: ['In "changes[0].version": foo is invalid'],
  },
  {
    name: 'unsorted versions in change',
    input: {
      changes: [
        {
          version: ['v1.0.0', 'v2.0.0'],
          'pr-url': 'https://github.com/nodejs/node/pull/123',
          description: 'Out of order.',
        },
      ],
    },
    expected: [
      'In "changes[0].version": Versions are unsorted (should be in descending order)',
    ],
  },
  {
    name: 'empty description',
    input: {
      changes: [
        {
          version: 'v1.0.0',
          'pr-url': 'https://github.com/nodejs/node/pull/123',
          description: '',
        },
      ],
    },
    expected: ['In "changes[0]": Description cannot be empty'],
  },
  {
    name: 'description missing period',
    input: {
      changes: [
        {
          version: 'v1.0.0',
          'pr-url': 'https://github.com/nodejs/node/pull/123',
          description: 'Missing period',
        },
      ],
    },
    expected: ['In "changes[0]": Description must end with a "."'],
  },
  {
    name: 'valid security-related change (private PR, valid commit)',
    input: {
      changes: [
        {
          version: 'v1.0.0',
          'pr-url': 'https://github.com/nodejs-private/node-private/pull/999',
          // A valid commit _must_ be forty characters
          commit: '0'.repeat(40),
          description: 'Security fix.',
        },
      ],
    },
    expected: [],
  },
  {
    name: 'security-related change with invalid commit',
    input: {
      changes: [
        {
          version: 'v1.0.0',
          'pr-url': 'https://github.com/nodejs-private/node-private/pull/999',
          commit: 'invalid_commit',
          description: 'Security fix.',
        },
      ],
    },
    expected: ['In "changes[0]": Invalid commit: "invalid_commit"'],
  },
];

describe('validate-changes', () => {
  for (const { name, input, options, expected } of testCases) {
    it(name, () => {
      testYamlRule(validateChanges, input, options, expected);
    });
  }
});
