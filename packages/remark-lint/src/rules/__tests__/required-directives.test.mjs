import { testRule } from '../../__tests__/utils.mjs';

testRule('required-directives', [
  {
    name: 'present',
    input: '# Title\n\n<!--introduced_in=v1.0.0-->\n',
    expected: [],
  },
  {
    name: 'missing',
    input: '# Title\n\nText.\n',
    expected: ['Missing `<!--introduced_in=...-->` directive'],
  },
  {
    name: 'configurable keys',
    input: '# Title\n\n<!--introduced_in=v1.0.0-->\n',
    options: { keys: ['introduced_in', 'source_link'] },
    expected: ['Missing `<!--source_link=...-->` directive'],
  },
]);
