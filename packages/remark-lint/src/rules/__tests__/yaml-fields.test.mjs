import { testRule } from '../../__tests__/utils.mjs';

const yaml = body => `# T\n\n<!-- YAML\n${body}\n-->\n`;

testRule('yaml-fields', [
  {
    name: 'known fields in order',
    input: yaml(
      'added: v1.0.0\nnapiVersion: 1\ndeprecated: v2.0.0\nremoved: v3.0.0\nchanges: []\ntype: global'
    ),
    expected: [],
  },
  {
    name: 'unknown field',
    input: yaml('added: v1.0.0\nfoo: bar'),
    expected: [/Unknown YAML field `foo`/],
  },
  {
    name: 'directive written as a field',
    input: yaml('introduced_in: v1.0.0'),
    expected: [
      /Unknown YAML field `introduced_in`; use the `<!--introduced_in=...-->` directive instead/,
    ],
  },
  {
    name: 'out of order',
    input: yaml('changes: []\nadded: v1.0.0'),
    expected: ['YAML fields must be ordered: added, changes'],
  },
  {
    name: 'custom keys',
    input: yaml('foo: 1\nadded: v1.0.0'),
    options: { keys: ['foo', 'added'] },
    expected: [],
  },
  {
    name: 'unknown type',
    input: yaml('type: widget'),
    expected: [/Unknown `type` "widget"; expected one of:/],
  },
  {
    name: 'custom types',
    input: yaml('type: widget'),
    options: { types: ['widget'] },
    expected: [],
  },
  {
    name: 'napiVersion as a string',
    input: yaml('napiVersion: "3"'),
    expected: ['`napiVersion` must be a positive integer; saw "3"'],
  },
  {
    name: 'napiVersion zero',
    input: yaml('napiVersion: 0'),
    expected: ['`napiVersion` must be a positive integer; saw 0'],
  },
]);
