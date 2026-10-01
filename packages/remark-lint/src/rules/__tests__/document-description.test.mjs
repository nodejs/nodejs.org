import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('document-description', [
  {
    name: 'introductory paragraph',
    input: '# Title\n\nThis module does things.\n\n## Section\n',
    expected: [],
  },
  {
    name: 'llm_description directive',
    input: '# Title\n\n<!--llm_description=Does things.-->\n\n## Section\n',
    expected: [],
  },
  {
    name: 'description only in a sub-section',
    input: dedent`
      # Title

      <!--introduced_in=v1.0.0-->

      ## Introduction

      This module does things.
    `,
    expected: [/Missing document description/],
  },
  { name: 'no title at all', input: 'Text.\n', expected: [] },
]);
