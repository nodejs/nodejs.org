import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

const YAML = '<!-- YAML\nadded: v1.0.0\n-->';

testRule('entry-order', [
  {
    name: 'YAML, then stability, then the typed list, then prose',
    input: dedent`
      # T

      <!--introduced_in=v1.0.0-->

      ${YAML}

      > Stability: 2 - Stable

      Intro.

      ## \`fs.foo(a)\`

      ${YAML}

      > Stability: 1 - Experimental

      * \`a\` {string}

      Prose.

      ## Comparison details

      Prose.

      * {Error} names are compared.
    `,
    expected: [],
  },
  {
    name: 'a type override decides whether the list is lifted',
    input: dedent`
      # T

      ## Class: \`Options\`

      <!--type=misc-->

      Each class takes an options object.

      * \`flush\` {integer}

      ## Class: \`Other\`

      Prose first.

      * \`flush\` {integer}
    `,
    expected: [/The typed list must come right after/],
  },
  {
    name: 'YAML after the stability indicator',
    input: dedent`
      # T

      ## \`fs.foo()\`

      > Stability: 2 - Stable

      ${YAML}
    `,
    expected: [/YAML metadata must immediately follow its heading/],
  },
  {
    name: 'YAML after prose',
    input: `# T\n\nText.\n\n${YAML}\n`,
    expected: [/YAML metadata must immediately follow its heading/],
  },
  {
    name: 'YAML before the title',
    input: `${YAML}\n\n# T\n`,
    expected: [/move it below the document title/],
  },
  {
    name: 'YAML nested in a list',
    input: `# T\n\n* item\n\n  ${YAML.replaceAll('\n', '\n  ')}\n`,
    expected: [/must be a top-level comment/],
  },
  {
    name: 'stability after the typed list',
    input: dedent`
      # T

      ## \`fs.foo(a)\`

      * \`a\` {string}

      > Stability: 1 - Experimental
    `,
    expected: [/Stability indicators must come right after the YAML metadata/],
  },
  {
    name: 'stability after prose',
    input: '# T\n\nText.\n\n> Stability: 2 - Stable\n',
    expected: [/Stability indicators must come right after the YAML metadata/],
  },
  {
    name: 'two stability indicators',
    input: dedent`
      # T

      > Stability: 2 - Stable

      > Stability: 1 - Experimental
    `,
    expected: [/at most one stability indicator/],
  },
  {
    name: 'stability definitions file is ignored',
    input:
      '# T\n\nText.\n\n> Stability: 2 - Stable\n\n> Stability: 1 - Experimental\n',
    path: 'doc/api/documentation.md',
    expected: [],
  },
  {
    name: 'typed list after prose',
    input: dedent`
      # T

      ## Event: \`'message'\`

      Prose.

      * \`msg\` {Buffer}
    `,
    expected: [/The typed list must come right after the stability indicator/],
  },
]);
