import { testRule } from '../../__tests__/utils.mjs';

const yaml = body => `# T\n\n<!-- YAML\n${body}\n-->\n`;
const PR = 'https://github.com/nodejs/node/pull/1';
const PRIVATE = 'https://github.com/nodejs-private/node-private/pull/1';
// A digits-only value would be parsed as a YAML number
const SHA = 'ab'.repeat(20);

testRule('yaml-changes', [
  {
    name: 'well-formed records',
    input: yaml(
      `changes:\n  - version: v2.0.0\n    pr-url: ${PR}\n    description: Changed.\n  - version: v1.0.0\n    commit: ${SHA}\n    pr-url: ${PRIVATE}\n    description: Security fix.\n  - version: v0.4.0\n    commit: ${SHA}\n    description: Ancient.`
    ),
    expected: [],
  },
  {
    name: 'not a list',
    input: yaml('changes: {}'),
    expected: ['`changes` must be a list of change records'],
  },
  {
    name: 'not a mapping',
    input: yaml('changes:\n  - v1.0.0'),
    expected: ['changes[0]: each change must be a mapping'],
  },
  {
    name: 'missing keys',
    input: yaml('changes:\n  - version: v1.0.0'),
    expected: [
      'changes[0]: missing required `pr-url`',
      'changes[0]: missing required `description`',
    ],
  },
  {
    name: 'ancient changes need no pull request',
    input: yaml('changes:\n  - version: v0.1.0\n    description: Changed.'),
    expected: [],
  },
  {
    name: 'ancient changes checked when asked',
    input: yaml(
      'changes:\n  - version: v0.1.0\n    pr-url: https://github.com/nodejs/node-v0.x-archive/pull/1\n    description: Changed.'
    ),
    options: { ignoreAncient: false },
    expected: [/changes\[0\]: `pr-url` must be a full pull request URL/],
  },
  {
    name: 'unknown key',
    input: yaml(
      `changes:\n  - version: v1.0.0\n    pr-url: ${PR}\n    description: Changed.\n    extra: true`
    ),
    expected: [/changes\[0\]: unknown key `extra`/],
  },
  {
    name: 'key order',
    input: yaml(
      `changes:\n  - description: Changed.\n    pr-url: ${PR}\n    version: v1.0.0`
    ),
    expected: [
      'changes[0]: keys must be ordered: version, pr-url, description',
    ],
  },
  {
    name: 'invalid pull request URL',
    input: yaml(
      'changes:\n  - version: v1.0.0\n    pr-url: https://example.com/pr/1\n    description: Changed.'
    ),
    expected: [/changes\[0\]: `pr-url` must be a full pull request URL/],
  },
  {
    name: 'list of pull request URLs',
    input: yaml(
      `changes:\n  - version: v1.0.0\n    pr-url:\n      - ${PR}\n    description: Changed.`
    ),
    expected: [/changes\[0\]: `pr-url` must be a full pull request URL/],
  },
  {
    name: 'custom pull request pattern',
    input: yaml(
      'changes:\n  - version: v1.0.0\n    pr-url: https://example.com/pr/1\n    description: Changed.'
    ),
    options: { prUrl: '^https://example\\.com/pr/\\d+$' },
    expected: [],
  },
  {
    name: 'description without a period',
    input: yaml(
      `changes:\n  - version: v1.0.0\n    pr-url: ${PR}\n    description: Changed`
    ),
    expected: ['changes[0]: `description` must end with a period'],
  },
  {
    name: 'empty description',
    input: yaml(
      `changes:\n  - version: v1.0.0\n    pr-url: ${PR}\n    description: ""`
    ),
    expected: ['changes[0]: `description` must not be empty'],
  },
  {
    name: 'description not a string',
    input: yaml(
      `changes:\n  - version: v1.0.0\n    pr-url: ${PR}\n    description: 1`
    ),
    expected: ['changes[0]: `description` must be a string'],
  },
  {
    name: 'short commit SHA',
    input: yaml(
      `changes:\n  - version: v1.0.0\n    commit: 186035243fad247e3955f\n    pr-url: ${PRIVATE}\n    description: Security fix.`
    ),
    expected: ['changes[0]: `commit` must be a full 40-character commit SHA'],
  },
  {
    name: 'commit on a public change',
    input: yaml(
      `changes:\n  - version: v1.0.0\n    commit: ${SHA}\n    pr-url: ${PR}\n    description: Changed.`
    ),
    expected: [/changes\[0\]: `commit` is only used for security changes/],
  },
]);
