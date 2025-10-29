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
    name: 'miswrapped reference',
    input: 'First a {string}, then a \\<number>.',
    expected: ['Type reference must be wrapped in "{}"; saw "<number>"'],
  },
  {
    name: 'multiple references',
    input: 'Psst, are you a {string | boolean}',
    expected: [
      'Type reference should be separated by "|", without spaces; saw "{string | boolean}"',
    ],
  },
  {
    name: 'invalid references',
    input: 'This is {invalid}.',
    expected: ['Invalid type reference: {invalid}'],
  },
  {
    name: 'custom references',
    input: 'This is a {custom} type.',
    expected: [],
    options: {
      typeMap: {
        custom: '...',
      },
    },
  },
];

describe('invalid-type-reference', () => {
  for (const { name, input, expected, options } of testCases) {
    it(name, () =>
      testRule(invalidTypeReference, input, expected, {}, options)
    );
  }
});
