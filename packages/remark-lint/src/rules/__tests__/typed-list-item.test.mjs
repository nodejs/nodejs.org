import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('typed-list-item', [
  {
    name: 'well-formed typed lists',
    input: dedent`
      # T

      * \`path\` {string|URL} The path.
      * \`options\` {Object}
        * \`encoding\` {string} **Default:** \`'utf8'\`.
        * \`flag\` Optional prose without a type.
      * \`callback\` {Function}
      * \`[Symbol.asyncDispose]\` {AsyncFunction} A computed name.
      * \`importModuleDynamically\`
        {Function|vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER} Wrapped.
      * Returns: {Promise}

      <!-- separator -->

      * {Error} names are compared.
      * {Map} keys are compared.

      <!-- separator -->

      * Plain prose list.
      * \`'utf8'\`: an encoding.
    `,
    expected: [],
  },
  {
    name: 'colon between name and type',
    input: '# T\n\n* `path` {string}\n* `append`: {boolean} Appends.\n',
    expected: [
      'Put the `{Type}` annotation right after the name, separated by one space: `append` {Type}',
    ],
  },
  {
    name: 'nested list with misplaced type',
    input: '# T\n\n* `options` {Object}\n  * `dest`: {string} A path.\n',
    expected: [
      'Put the `{Type}` annotation right after the name, separated by one space: `dest` {Type}',
    ],
  },
  {
    name: 'invalid parameter name',
    input: '# T\n\n* `path` {string}\n* `callback(err, data)` {Function}\n',
    expected: [/`callback\(err, data\)` is not a valid parameter name/],
  },
  {
    name: 'two spaces between name and type',
    input: '# T\n\n* `path`  {string}\n',
    expected: [
      'Put the `{Type}` annotation right after the name, separated by one space: `path` {Type}',
    ],
  },
  {
    name: 'non-typed item in a typed list',
    input: '# T\n\n* `path` {string}\n* Some prose about complexity.\n',
    expected: [/Typed list items start with a `name` code span/],
  },
  {
    name: 'first item breaks the list',
    input: '# T\n\n* `path`: {string} The path.\n* `callback` {Function}\n',
    expected: [
      /This list looks like a typed list, but its first item is not typed/,
    ],
  },
  {
    name: 'mostly typed items after a prose item',
    input: '# T\n\n* Prose first.\n* `a` {string}\n* `b` {string}\n',
    expected: [
      /This list looks like a typed list, but its first item is not typed/,
    ],
  },
]);
