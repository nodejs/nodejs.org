import { testRule } from '../../__tests__/utils.mjs';

testRule('type-annotation-style', [
  {
    name: 'unspaced unions',
    input: '# T\n\nA {string|Buffer} and {Object} and `a || b` {boolean}.\n',
    expected: [],
  },
  {
    name: 'spaced union',
    input: '# T\n\nA {string | Buffer} value.\n',
    expected: ['Write unions without spaces around `|`: `{string|Buffer}`'],
  },
  {
    name: 'spaced unions wanted',
    input: '# T\n\nA {string|Buffer} value.\n',
    options: { unionSpacing: 'always' },
    expected: ['Separate union members with ` | `: `{string | Buffer}`'],
  },
  {
    name: 'padding',
    input: '# T\n\nA { string } value.\n',
    expected: ['Remove the whitespace inside the braces: `{string}`'],
  },
  {
    name: 'wrapped after a union separator',
    input: '# T\n\n* `a` {string|\n  Buffer} value.\n',
    expected: [],
  },
  {
    name: 'wrapped with spaces around the separator',
    input: '# T\n\n* `a` {string |\n  Buffer} value.\n',
    expected: ['Write unions without spaces around `|`: `{string|Buffer}`'],
  },
]);
