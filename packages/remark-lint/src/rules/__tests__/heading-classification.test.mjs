import dedent from 'dedent';

import { testRule } from '../../__tests__/utils.mjs';

testRule('heading-classification', [
  {
    name: 'well-formed entries and prose headings',
    input: dedent`
      # T

      ## \`fs.readFile(path)\`

      ## \`new Agent([options])\`

      ## \`new  buffer.Blob([sources[, options]])\`

      ## Event: \`'close'\`

      ## Event: \`<protocol-method>\`

      ## Class: \`http.Server\`

      ## Class: \`X509Certificate\`

      ## Class: \`Foo extends Bar\`

      ### Static method: \`X509Certificate.parse(pem)\`

      ## Synopsis

      ## CMake.js

      ## Node.js
    `,
    expected: [],
  },
  // Unwrapped identifiers
  {
    name: 'unwrapped method',
    input: '# T\n\n## fs.readFile(path)\n',
    expected: [/Wrap the API identifier in backticks/],
  },
  {
    name: 'unwrapped class',
    input: '# T\n\n## Class: fs.Dir\n',
    expected: [/Wrap the API identifier in backticks/],
  },
  {
    name: 'unwrapped event',
    input: "# T\n\n## Event: 'close'\n",
    expected: [/Wrap the API identifier in backticks/],
  },
  {
    name: 'unwrapped constructor',
    input: '# T\n\n## new Agent([options])\n',
    expected: [/Wrap the API identifier in backticks/],
  },
  // Constructors
  {
    name: 'lowercase constructed class',
    input: '# T\n\n## `new agent()`\n',
    expected: [
      'Constructed class names begin with an uppercase letter; saw `agent`',
    ],
  },
  {
    name: 'constructor without parentheses',
    input: '# T\n\n## `new Agent`\n',
    expected: ['Constructor headings take the form `new Class(args)`'],
  },
  {
    name: 'trailing content after a constructor',
    input: '# T\n\n## `new Agent()` (deprecated)\n',
    expected: ['Constructor headings take the form `new Class(args)`'],
  },
  // Events
  {
    name: 'unquoted event name',
    input: '# T\n\n## Event: `close`\n',
    expected: [
      "Event names should be single-quoted inside the code span: Event: `'close'`",
    ],
  },
  {
    name: 'lowercase event prefix',
    input: "# T\n\n## event:  `'close'`\n",
    expected: [/start with the literal prefix `Event:`/],
  },
  {
    name: 'trailing content after an event',
    input: "# T\n\n## Event: `'close'`;\n",
    expected: ["Event headings take the form Event: `'name'`"],
  },
  // Classes
  {
    name: 'lowercase class name',
    input: '# T\n\n## Class: `fs.dir`\n',
    expected: ['Class names should begin with an uppercase letter; saw `dir`'],
  },
  {
    name: 'class without a code span',
    input: '# T\n\n## Class: Foo()\n',
    expected: ['Class headings take the form Class: `Name`'],
  },
  {
    name: 'class that is not an identifier',
    input: '# T\n\n## Class: `Foo()`\n',
    expected: ['Class headings take the form Class: `Name`'],
  },
  // Static methods
  {
    name: 'static method at the wrong depth',
    input: dedent`
      # T

      ## Class: \`Buffer\`

      #### Static method: \`Buffer.alloc(size)\`
    `,
    expected: [/expected depth 3, saw 4/],
  },
  {
    name: 'static method outside a class',
    input: '# T\n\n## Static method: `Buffer.alloc(size)`\n',
    expected: ['Static methods should be nested under their `Class:` heading'],
  },
  {
    name: 'static method depth check disabled',
    input: '# T\n\n## Static method: `Buffer.alloc(size)`\n',
    options: { staticMethodDepth: false },
    expected: [],
  },
  {
    name: 'malformed static method',
    input: '# T\n\n## Class: `Buffer`\n\n### Static method: `alloc`\n',
    expected: [
      'Static method headings take the form Static method: `Class.method(args)`',
    ],
  },
  {
    name: 'lowercase static method prefix',
    input: '# T\n\n## Class: `Buffer`\n\n### static method: `Buffer.alloc()`\n',
    expected: [/start with the literal prefix `Static method:`/],
  },
]);
