import { describe, it } from 'node:test';

import { testRule } from './utils.mjs';
import invalidTypeReference from '../invalid-type-reference.mjs';

const testCases = [
  {
    name: 'no references',
    input: 'Just some text.',
    expected: [],
  },
  {
    name: 'single reference',
    input: 'Just a {number}.',
    expected: [],
  },
  {
    name: 'multiple references',
    input: 'Psst, are you a {string} or a {boolean}',
    expected: [],
  },
  {
    name: 'invalid references',
    input: 'This is {invalid}.',
    expected: ['Invalid type reference: {invalid}'],
  },
];

describe('hashed-self-references', () => {
  for (const { name, input, expected } of testCases) {
    it(name, () => testRule(invalidTypeReference, input, expected));
  }
});
