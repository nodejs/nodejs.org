import { testRule } from '../../__tests__/utils.mjs';

const heading = signature => `# T\n\n## \`${signature}\`\n`;

testRule('signature-syntax', [
  {
    name: 'valid signatures',
    input: [
      'fs.readFile(path, callback)',
      'fs.readFile(path[, options], callback)',
      'buf.write(string[, offset[, length]][, encoding])',
      'path.join([...paths])',
      'new Agent([options])',
      'crypto.randomInt([min, ]max[, callback])',
      "emitter[Symbol.for('nodejs.rejection')](err, eventName[, ...args])",
      'fs.foo()',
      'readable.read(0)',
      "readable.push('')",
    ]
      .map(signature => heading(signature))
      .join('\n'),
    expected: [],
  },
  {
    name: 'default value',
    input: heading('fs.foo(a = 1)'),
    expected: [
      /Default values must not appear in the signature/,
      /Invalid parameter `a=1`/,
    ],
  },
  {
    name: 'type annotation',
    input: heading('fs.foo({options})'),
    expected: [
      /Type annotations must not appear in the signature/,
      'Invalid parameter `{options}`',
    ],
  },
  {
    name: 'unbalanced brackets',
    input: heading('fs.foo(a[, b)'),
    expected: ['Unbalanced optional-parameter brackets'],
  },
  {
    name: 'misplaced bracket',
    input: heading('fs.foo(a, [b])'),
    expected: ['Optional parameters are written `[, name]`'],
  },
  {
    name: 'comma spacing',
    input: heading('fs.foo(a,b)'),
    expected: ['Separate parameters with `, `'],
  },
  {
    name: 'invalid parameter',
    input: heading('fs.foo(a-b, { c })'),
    expected: [
      /Type annotations must not appear in the signature/,
      'Invalid parameter `a-b`',
      'Invalid parameter `{c}`',
    ],
  },
]);
