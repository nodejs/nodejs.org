import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('no-redundant-stability', [
  {
    name: 'different levels',
    input: dedent`
      # T

      > Stability: 2 - Stable

      ## S

      > Stability: 1 - Experimental

      ### Sub

      > Stability: 1.1 - Active development
    `,
    expected: [],
  },
  {
    name: 'repeated level',
    input: dedent`
      # T

      > Stability: 2 - Stable

      ## S

      > Stability: 2 - Stable
    `,
    expected: [
      'Redundant stability indicator: the enclosing entry `T` already declares Stability: 2',
    ],
  },
  {
    name: 'only the nearest declaring ancestor counts',
    input: dedent`
      # T

      > Stability: 2 - Stable

      ## S

      > Stability: 1 - Experimental

      ### Sub

      > Stability: 2 - Stable
    `,
    expected: [],
  },
  {
    name: 'full comparison',
    input: dedent`
      # T

      > Stability: 0 - Deprecated

      ## S

      > Stability: 0 - Deprecated: Use \`other()\` instead.
    `,
    options: { compare: 'full' },
    expected: [],
  },
]);
