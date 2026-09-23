import { testRule } from '../../__tests__/utils.mjs';

const code = meta => `# T\n\n\`\`\`js ${meta}\nconst a = 1;\n\`\`\`\n`;

testRule('fenced-code-meta', [
  {
    name: 'attributes',
    input: code('displayName="Reading a file" other="x"'),
    expected: [],
  },
  {
    name: 'no attributes',
    input: '# T\n\n```js\nconst a = 1;\n```\n',
    expected: [],
  },
  {
    name: 'malformed attribute',
    input: code('displayName=Reading'),
    expected: [/Code block attributes take the form `key="value"`/],
  },
  {
    name: 'unknown attribute',
    input: code('other="x"'),
    options: { allowUnknown: false },
    expected: [
      'Unknown code block attribute `other`; expected one of: displayName',
    ],
  },
]);
