import { testRule } from '../../__tests__/utils.mjs';

const yaml = body => `# T\n\n<!-- YAML\n${body}\n-->\n`;

testRule('yaml-versions', [
  {
    name: 'valid, descending versions',
    input: yaml(
      'added:\n  - v2.0.0\n  - v1.0.0\nremoved: v3.0.0\nchanges:\n  - version: REPLACEME\n  - version:\n      - v3.0.0\n      - v2.1.0\n  - version: v1.1.0'
    ),
    expected: [],
  },
  {
    name: 'invalid version',
    input: yaml('added: 1.0.0'),
    expected: [
      /`added`: "1.0.0" is not a valid version; expected `vX.Y.Z` \(or `REPLACEME`\)/,
    ],
  },
  {
    name: 'invalid version in changes',
    input: yaml('changes:\n  - version: foo'),
    expected: [/`changes\[0\].version`: "foo" is not a valid version/],
  },
  {
    name: 'not a string',
    input: yaml('added: 1'),
    expected: [/`added`: expected a version string, got 1/],
  },
  {
    name: 'empty list',
    input: yaml('added: []'),
    expected: ['`added` must not be an empty list'],
  },
  {
    name: 'released versions',
    input: yaml('added: v1.0.0\ndeprecated: v9.9.9\nremoved: v0.1.0'),
    shared: { releasedVersions: ['1.0.0'] },
    expected: [/`deprecated`: "v9.9.9" is not a released version/],
  },
  {
    name: 'custom placeholders',
    input: yaml('added: TBD'),
    options: { placeholders: ['TBD'] },
    expected: [],
  },
  {
    name: 'ascending field',
    input: yaml('added:\n  - v1.0.0\n  - v2.0.0'),
    expected: ['`added` must list versions in descending order (newest first)'],
  },
  {
    name: 'ascending change versions',
    input: yaml('changes:\n  - version:\n      - v1.0.0\n      - v2.0.0'),
    expected: [
      '`changes[0].version` must list versions in descending order (newest first)',
    ],
  },
  {
    name: 'changes out of order',
    input: yaml('changes:\n  - version: v1.0.0\n  - version: v2.0.0'),
    expected: ['`changes` must be ordered from newest to oldest version'],
  },
  {
    name: 'ascending changes wanted',
    input: yaml('changes:\n  - version: v2.0.0\n  - version: v1.0.0'),
    options: { changes: 'ascending' },
    expected: ['`changes` must be ordered from oldest to newest version'],
  },
  {
    name: 'changes order ignored',
    input: yaml('changes:\n  - version: v1.0.0\n  - version: v2.0.0'),
    options: { changes: 'any' },
    expected: [],
  },
]);
