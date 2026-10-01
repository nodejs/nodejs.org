import { testRule } from '../../__tests__/utils.mjs';

testRule('no-typed-list-in-prose', [
  {
    name: 'typed lists and ordinary prose',
    input:
      '# T\n\n* Returns: {Promise}\n\n`file:` {URL}s with drive letters must use `:`.\n\nType: End-of-Life\n\n{Buffer} objects are cool.\n',
    expected: [],
  },
  {
    name: 'returns in prose',
    input: '# T\n\nReturns: {Promise} The result.\n',
    expected: ['`Returns:` belongs in a typed list item: `* Returns: {Type}`'],
  },
  {
    name: 'parameter in prose',
    input: '# T\n\n`path` {string} The path.\n',
    expected: [
      'Document `path` in a typed list item: `* `path` {Type} description`',
    ],
  },
]);
