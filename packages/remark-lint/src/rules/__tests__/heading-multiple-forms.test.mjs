import { testRule } from '../../__tests__/utils.mjs';

testRule('heading-multiple-forms', [
  {
    name: 'comma-separated forms and prose headings',
    input:
      '# T\n\n## `-c`, `--check`\n\n## `Blob` objects and `MessageChannel`\n\n## `-C condition`, `--conditions=condition`\n',
    expected: [],
  },
  {
    name: 'space-separated forms',
    input: '# T\n\n## `-c` `--check`\n',
    expected: [/Separate the forms of this entry with `, `/],
  },
  {
    name: 'no space after the comma',
    input: '# T\n\n## `-c`,`--check`\n',
    expected: [/Separate the forms of this entry with `, `/],
  },
]);
