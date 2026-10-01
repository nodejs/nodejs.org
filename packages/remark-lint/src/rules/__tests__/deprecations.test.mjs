import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

const entry = (code, body = '') => dedent`
  ### ${code}: \`thing\`

  <!-- YAML
  changes:
    - version: v1.0.0
      pr-url: https://github.com/nodejs/node/pull/1
      description: Runtime deprecation.
  -->

  Type: Runtime

  ${body}
`;

const path = 'doc/api/deprecations.md';

testRule('deprecations', [
  {
    name: 'sequential deprecations',
    path,
    input: `# Deprecated APIs\n\n## List\n\n${entry('DEP0001')}\n\n${entry('DEP0002')}\n`,
    expected: [],
  },
  {
    name: 'skipped code acknowledged with a standard ignore comment',
    path,
    input: `# D\n\n${entry('DEP0001')}\n\n<!-- lint ignore deprecations -->\n\n${entry('DEP0003')}\n\n${entry('DEP0004')}\n`,
    expected: [],
  },
  {
    name: 'out of order',
    path,
    input: `# D\n\n${entry('DEP0001')}\n\n${entry('DEP0003')}\n`,
    expected: [
      'Deprecation codes are out of order: expected `DEP0002`, saw `DEP0003`',
    ],
  },
  {
    name: 'resyncs after a mismatch',
    path,
    input: `# D\n\n${entry('DEP0001')}\n\n${entry('DEP0003')}\n\n${entry('DEP0004')}\n`,
    expected: [
      'Deprecation codes are out of order: expected `DEP0002`, saw `DEP0003`',
    ],
  },
  {
    name: 'missing type line',
    path,
    input:
      '# D\n\n### DEP0001: `thing`\n\n<!-- YAML\nchanges: []\n-->\n\nSome text.\n',
    expected: ['Deprecation `DEP0001` must start with a `Type: ...` line'],
  },
  {
    name: 'missing changes',
    path,
    input: '# D\n\n### DEP0001: `thing`\n\nType: Runtime\n',
    expected: ['Deprecation `DEP0001` is missing its YAML `changes` history'],
  },
  {
    name: 'other files are ignored',
    path: 'doc/api/fs.md',
    input: '# D\n\n### DEP0005: `thing`\n',
    expected: [],
  },
]);
