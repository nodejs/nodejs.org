import { testRule } from '../../__tests__/utils.mjs';

testRule('directive-syntax', [
  {
    name: 'consistent padding',
    input: '# T\n\n<!--type=misc-->\n\n<!-- name=fs -->\n',
    expected: [],
  },
  {
    name: 'asymmetric padding',
    input: '# T\n\n<!-- type=misc-->\n',
    expected: ['Pad both sides of the directive with a space, or neither'],
  },
  {
    name: 'padding always',
    input: '# T\n\n<!--type=misc-->\n',
    options: { padding: 'always' },
    expected: ['Expected `<!-- type=misc -->` (padded with spaces)'],
  },
  {
    name: 'padding never',
    input: '# T\n\n<!-- type=misc -->\n',
    options: { padding: 'never' },
    expected: ['Expected `<!--type=misc-->` (no padding)'],
  },
  {
    name: 'uppercase key',
    input: '# T\n\n<!--Type=misc-->\n',
    expected: ['Directive keys are lowercase `snake_case`; saw `Type`'],
  },
  {
    name: 'empty value',
    input: '# T\n\n<!--type=-->\n',
    expected: ['The `type` directive has no value'],
  },
  {
    name: 'two directives in one comment',
    input: '# T\n\n<!--type=misc name=fs-->\n',
    expected: [/one comment per `key=value`/],
  },
  {
    name: 'multi-line directive',
    input: '# T\n\n<!--\ntype=misc\n-->\n',
    expected: ['Directives must fit on a single line: `<!--key=value-->`'],
  },
]);
