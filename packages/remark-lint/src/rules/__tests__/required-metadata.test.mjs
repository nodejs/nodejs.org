import { describe, it } from 'node:test';

import dedent from 'dedent';

import requiredMetadata from '../required-metadata.mjs';
import { testRule } from './utils.mjs';

const testCases = [
  {
    name: 'both metadata comments present',
    input: dedent`
      <!-- introduced_in=v20.0.0 -->
      <!-- llm_description=This explains something. -->
    `,
    expected: [],
  },
  {
    name: 'missing introduced_in',
    input: '<!-- llm_description=This explains something. -->',
    expected: ['Missing "introduced_in" metadata'],
  },
  {
    name: 'missing llm_description, but paragraph exists',
    input: dedent`
      <!-- introduced_in=v20.0.0 -->

      This is a short description for LLMs.
    `,
    expected: [],
  },
  {
    name: 'missing both metadata entries',
    input: '',
    expected: [
      'Missing "introduced_in" metadata',
      'Missing "llm_description" metadata',
    ],
  },
  {
    name: 'only paragraph, no comments at all',
    input: 'This is just a paragraph, nothing else.',
    expected: ['Missing "introduced_in" metadata'],
  },
];

describe('duplicate-stability-nodes', () => {
  for (const { name, input, expected } of testCases) {
    it(name, () => testRule(requiredMetadata, input, expected));
  }
});
