import { testRule } from '../../__tests__/utils.mjs';

testRule('type-annotation-resolution', [
  {
    name: 'built-ins, web APIs and dotted names',
    input:
      '# T\n\n* `a` {string|Buffer\\[]|Object} A {Promise<AbortSignal>} or {fs.Stats}.\n',
    shared: { typeMap: { Buffer: 'buffer.html#class-buffer' } },
    expected: [],
  },
  {
    name: 'unknown type',
    input: '# T\n\nA {Widget} value.\n',
    expected: [
      'Unknown type `Widget` in `{Widget}`; it does not resolve to a documented type',
    ],
  },
  {
    name: 'type map from a file',
    input: '# T\n\nA {Widget} value.\n',
    shared: { typeMap: 'src/rules/__tests__/fixtures/type-map.json' },
    expected: [],
  },
  {
    name: 'ignored names',
    input: '# T\n\nA {Widget} value.\n',
    options: { ignore: ['Widget'] },
    expected: [],
  },
  {
    name: 'unparseable values are left to the syntax rule',
    input: '# T\n\nA {string |} value.\n',
    expected: [],
  },
  {
    name: 'unresolved display names',
    input: '# T\n\nA {HTTP/2 Headers Object | Other Thing} value.\n',
    shared: { typeMap: { 'HTTP/2 Headers Object': 'http2.html#headers' } },
    expected: [/Unknown type `Other Thing`/],
  },
]);
