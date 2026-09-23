import { testRule } from '../../__tests__/utils.mjs';

testRule('prefer-reference-links', [
  {
    name: 'reference links, autolinks and fragments',
    input:
      '# T\n\n[a][] and <https://example.com> and [b](#x).\n\n[a]: https://example.com\n',
    expected: [],
  },
  {
    name: 'inline link',
    input: '# T\n\n[a](https://example.com)\n',
    expected: [/Prefer a reference-style link/],
  },
  {
    name: 'inline fragment link when not ignored',
    input: '# T\n\n[a](#x)\n',
    options: { ignoreFragments: false },
    expected: [/Prefer a reference-style link/],
  },
]);
