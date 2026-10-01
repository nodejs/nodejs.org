import { testRule } from '../../__tests__/utils.mjs';

testRule('tag-comment-syntax', [
  {
    name: 'simple tags',
    input:
      '# T\n\n<!-- legacy -->\n\n<!--lint disable maximum-line-length-->\n\n<!-- TODO -->\n\n<!-- TODO(someone): fix this -->\n\n<!-- Note: keep in sync with deps -->\n',
    expected: [],
  },
  {
    name: 'single-line comment that defines metadata',
    input: '# T\n\n<!-- added: v1.0.0 -->\n',
    expected: [
      /doc-kit parses this one as YAML metadata with the key\(s\) `added`/,
    ],
  },
  {
    name: 'single-line comment that is invalid YAML',
    input: '# T\n\n<!-- foo: [ -->\n',
    expected: [/Comment is not valid YAML, which doc-kit cannot parse/],
  },
  {
    name: 'multi-line metadata missing the YAML keyword',
    input: '# T\n\n<!--\nadded: v1.0.0\n-->\n',
    expected: [/lacks the `YAML` keyword, so doc-kit ignores it/],
  },
  {
    name: 'multi-line prose comment',
    input:
      '# T\n\n<!-- TODO: add an example on how\nto do this -->\n\n<!-- TODO(someone): make it optional by allowing\n  something else -->\n',
    expected: [],
  },
]);
