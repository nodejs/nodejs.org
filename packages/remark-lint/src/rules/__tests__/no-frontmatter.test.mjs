import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('no-frontmatter', [
  {
    name: 'comment metadata',
    input: '<!-- YAML\nadded: v1.0.0\n-->\n',
    expected: [],
  },
  {
    name: 'frontmatter',
    input: dedent`
      ---
      introduced_in: v1.0.0
      ---

      # Title
    `,
    expected: [
      /Use a `<!-- YAML ... -->` comment instead of `---` frontmatter/,
    ],
  },
]);
