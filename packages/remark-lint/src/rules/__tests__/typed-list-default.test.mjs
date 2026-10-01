import { testRule } from '../../__tests__/utils.mjs';

const item = text => `# T\n\n* \`a\` {string} ${text}\n`;

testRule('typed-list-default', [
  {
    name: 'well-formed defaults',
    input:
      "# T\n\n* `a` {string} Text. **Default:** `'utf8'`.\n* `b` {string} **Default:** `0`\n* `c` {integer} Text. **Default:**\n  `buf.length`.\n* `d` {string} **Default:** [`buf.length`][].\n* `e` {string} **Default:** `false` (no shell).\n* `f` {Function} **Default:** A no-op function.\n* `g` {string} **Default:** `'a'` if `x`, otherwise `'b'`.\n\n[`buf.length`]: #buflength\n",
    expected: [],
  },
  {
    name: 'not bold',
    input: item('Default: `0`.'),
    expected: [/Write defaults as `\*\*Default:\*\* `value``/],
  },
  {
    name: 'colon outside the emphasis',
    input: item('**Default**: `0`.'),
    expected: [/Write defaults as/],
  },
  {
    name: 'doubled colon',
    input: item('**Default:**: `0`.'),
    expected: [/Write defaults as/],
  },
  {
    name: 'lowercase',
    input: item('**default:** `0`.'),
    expected: [/Write defaults as/],
  },
  {
    name: 'missing value',
    input: item('**Default:**'),
    expected: [/Write defaults as/],
  },
  {
    name: 'literal value not in a code span',
    input: item(
      '**Default:** 0 (no timeout).\n* `b` {boolean} **Default:** false.'
    ),
    expected: [
      'Wrap the default value in a code span: `**Default:** `0``',
      'Wrap the default value in a code span: `**Default:** `false``',
    ],
  },
  {
    name: 'two defaults',
    input: item('**Default:** `0`. **Default:** `1`.'),
    expected: ['Items document at most one default value'],
  },
  {
    name: 'plain lists are ignored',
    input: '# T\n\n* Prose with Default: `0` in it.\n',
    expected: [],
  },
]);
