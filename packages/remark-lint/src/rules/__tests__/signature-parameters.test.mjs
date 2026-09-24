import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('signature-parameters', [
  {
    name: 'all parameters documented, including nested and rest ones',
    input: dedent`
      # T

      ## \`fs.readFile(path[, options], callback)\`

      * \`path\` {string}
      * \`options\` {Object}
        * \`encoding\` {string}
      * \`callback\` {Function}
      * Returns: {undefined}

      ## \`path.join([...paths])\`

      * \`...paths\` {string}

      ## \`util.format(format[, ...args])\`

      * \`format\` {string}
      * \`args\` {any}
    `,
    expected: [],
  },
  {
    name: 'undocumented parameter',
    input: dedent`
      # T

      ## \`fs.readFile(path, callback)\`

      * \`path\` {string}
    `,
    expected: [
      'Parameter `callback` is declared in the signature but not documented in the typed list',
    ],
  },
  {
    name: 'entries without a typed list are skipped',
    input: '# T\n\n## `fs.readFile(path)`\n\nProse only.\n',
    expected: [],
  },
  {
    name: 'overloads share one list',
    input: dedent`
      # T

      ## \`new Console(stdout[, stderr])\`

      ## \`new Console(options)\`

      * \`options\` {Object}
        * \`stdout\` {stream.Writable}
        * \`stderr\` {stream.Writable}
    `,
    expected: [],
  },
  {
    name: 'overloads with a missing parameter',
    input: dedent`
      # T

      ## \`net.connect(options)\`

      ## \`net.connect(port[, host])\`

      * \`options\` {Object}
    `,
    expected: [/Parameter `port` is declared/, /Parameter `host` is declared/],
  },
  {
    name: 'undeclared parameters',
    input: dedent`
      # T

      ## \`fs.readFile(path)\`

      * \`path\` {string}
      * \`extra\` {string}
    `,
    options: { reportUndeclared: true },
    expected: ['`extra` is documented but not declared in the signature'],
  },
]);
