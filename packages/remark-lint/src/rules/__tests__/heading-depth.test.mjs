import { testRule } from '../../__tests__/utils.mjs';

testRule('heading-depth', [
  { name: 'depth 5', input: '# T\n\n##### Deep\n', expected: [] },
  {
    name: 'depth 6',
    input: '# T\n\n###### Too deep\n',
    expected: [/Heading depth 6 is too deep/],
  },
]);
