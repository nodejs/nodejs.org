import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('typed-list-prefix', [
  {
    name: 'well-formed prefixes',
    input:
      '# T\n\n## Class: `Foo`\n\n* Extends: {EventEmitter}\n* Returns: {Promise} The result.\n* Type: {string}\n',
    expected: [],
  },
  {
    name: 'missing colon',
    input: '# T\n\n## Class: `Foo`\n\n* Extends {EventEmitter}\n',
    expected: [/`Extends:` items take the form `Extends: {Type} description`/],
  },
  {
    name: 'code span instead of a type',
    input: '# T\n\n* Returns: `undefined`.\n',
    expected: [/`Returns:` items take the form `Returns: {Type} description`/],
  },
  {
    name: 'prose starting with Returns',
    input: '# T\n\n* Returns the value.\n',
    expected: [
      /doc-kit treats any item starting with `Returns` as this prefix/,
    ],
  },
  {
    name: 'prose in a list that is not typed',
    input:
      '# T\n\n1. Compile the code.\n2. Returns the result.\n\n<!-- separator -->\n\n* Some prose.\n* Returns nothing useful.\n',
    expected: [],
  },
  {
    name: 'lowercase prefix',
    input: '# T\n\n* returns: {Promise}\n',
    expected: ['Capitalize the prefix: `Returns:`'],
  },
  {
    name: 'two spaces',
    input: '# T\n\n* Returns:  {Promise}\n',
    expected: [/`Returns:` items take the form/],
  },
  {
    name: 'Extends not first',
    input:
      '# T\n\n## Class: `Foo`\n\n* `bar` {string}\n* Extends: {EventEmitter}\n',
    expected: ['`Extends:` should be the first item of the typed list'],
  },
  {
    name: 'Extends outside a class',
    input: dedent`
      # T

      ## \`foo()\`

      * Extends: {EventEmitter}
    `,
    expected: [
      "`Extends:` denotes a class's superclass, but this entry is not a `Class:` heading",
    ],
  },
]);
