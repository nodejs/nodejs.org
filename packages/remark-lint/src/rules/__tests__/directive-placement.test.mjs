import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('directive-placement', [
  {
    name: 'directives after the title, with YAML between',
    input: dedent`
      # Title

      <!-- YAML
      added: v1.0.0
      -->

      <!--introduced_in=v1.0.0-->
      <!--type=misc-->

      > Stability: 2 - Stable

      Text.

      ## Section

      <!--module=node:fs/promises-->
      <!--name=section-->
    `,
    expected: [],
  },
  {
    name: 'document directive after the stability indicator',
    input: dedent`
      # Title

      > Stability: 2 - Stable

      <!--source_link=lib/fs.js-->
    `,
    expected: [/`source_link` directive must immediately follow its heading/],
  },
  {
    name: 'document directive under a section',
    input: dedent`
      # Title

      ## Section

      <!--introduced_in=v1.0.0-->
    `,
    expected: [
      /`introduced_in` directive must directly follow the document title, not `Section`/,
    ],
  },
  {
    name: 'section directive after prose',
    input: dedent`
      # Title

      ## Section

      Text.

      <!--type=misc-->
    `,
    expected: [/`type` directive must immediately follow its heading/],
  },
  {
    name: 'nested directive',
    input: dedent`
      # Title

      * item

        <!--type=misc-->
    `,
    expected: [/must be a top-level comment/],
  },
]);
