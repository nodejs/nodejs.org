import { testRule } from '../../__tests__/utils.mjs';

testRule('stability-syntax', [
  {
    name: 'well-formed indicators',
    input:
      '# T\n\n> Stability: 2 - Stable\n\n> Stability: 1.2 - Release candidate. Use [`x()`][] instead.\n\n> Stability: 1 - Experimental. This API is under active development and\n> may change.\n\n> Not a stability indicator.\n\n[`x()`]: #x\n',
    expected: [],
  },
  {
    name: 'malformed',
    input: '# T\n\n> stability: 2 - Stable\n',
    expected: [
      'Stability indicators take the form `> Stability: <level> - <description>`',
    ],
  },
  {
    name: 'unknown level',
    input: '# T\n\n> Stability: 4 - Whatever\n',
    expected: [/Unknown stability level `4`/],
  },
  {
    name: 'missing separator',
    input: '# T\n\n> Stability: 2 Stable\n',
    expected: ['Separate the stability level from its description with ` - `'],
  },
  {
    name: 'missing description',
    input: '# T\n\n> Stability: 2\n',
    expected: ['Separate the stability level from its description with ` - `'],
  },
]);
