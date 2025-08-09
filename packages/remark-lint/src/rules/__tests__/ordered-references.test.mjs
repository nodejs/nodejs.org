import { describe, it } from 'node:test';

import dedent from 'dedent';

import orderedReferences from '../ordered-references.mjs';
import { testRule } from './utils.mjs';

const testCases = [
  {
    name: 'no definitions',
    input: 'Just some text.',
    expected: [],
  },
  {
    name: 'single definition',
    input: '[foo]: https://example.com',
    expected: [],
  },
  {
    name: 'ordered references',
    input: dedent`
      [alpha]: https://example.com/a
      [beta]: https://example.com/b
      [charlie]: https://example.com/c
    `,
    expected: [],
  },
  {
    name: 'unordered references (simple case)',
    input: dedent`
      [beta]: https://example.com/b
      [alpha]: https://example.com/a
    `,
    expected: ['Unordered reference ("alpha" should be before "beta")'],
  },
  {
    name: 'unordered references (deep nesting)',
    input: dedent`
      [foo]: https://example.com/z

      > Note:

      > [bar]: https://example.com/a
    `,
    expected: ['Unordered reference ("bar" should be before "foo")'],
  },
  {
    name: 'multiple unordered references',
    input: dedent`
      [zulu]: https://z.com
      [yankee]: https://y.com
      [alpha]: https://a.com
    `,
    expected: [
      'Unordered reference ("yankee" should be before "zulu")',
      'Unordered reference ("alpha" should be before "yankee")',
    ],
  },
];

describe('hashed-self-references', () => {
  for (const { name, input, expected } of testCases) {
    it(name, () => testRule(orderedReferences, input, expected));
  }
});
