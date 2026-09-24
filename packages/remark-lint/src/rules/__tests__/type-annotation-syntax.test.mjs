import { testRule } from '../../__tests__/utils.mjs';

testRule('type-annotation-syntax', [
  {
    name: 'valid TypeScript types and unrelated angle brackets',
    input:
      '# T\n\n* `a` {string|Buffer\\[]} A {Promise<Object>} or {Function} or {typeof Foo}.\n* Returns: {import("fs").Stats}\n\nA `Local<Value>` and <program-entry-point> and <div>x</div>.\n',
    expected: [],
  },
  {
    name: 'invalid type',
    input: '# T\n\nA {foo bar} value.\n',
    expected: [
      'Invalid type annotation `{foo bar}`: not a TypeScript type expression',
    ],
  },
  {
    name: 'unparseable values whose display names resolve are fine, like in doc-kit',
    input: '# T\n\nA {string |} value.\n',
    expected: [],
  },
  {
    name: 'display names from the type map',
    input: '# T\n\nA {HTTP/2 Headers Object | string} value.\n',
    shared: { typeMap: { 'HTTP/2 Headers Object': 'http2.html#headers' } },
    expected: [],
  },
  {
    name: 'display names not in the type map',
    input: '# T\n\nA {HTTP/2 Headers Object} value.\n',
    expected: [
      'Invalid type annotation `{HTTP/2 Headers Object}`: not a TypeScript type expression',
    ],
  },
  {
    name: 'inline HTML type',
    input: '# T\n\nA <string> value.\n',
    expected: ['Wrap types in curly braces: `{string}`, not `<string>`'],
  },
  {
    name: 'escaped angle-bracket type',
    input: '# T\n\nA \\<Buffer> value.\n',
    shared: { typeMap: { Buffer: 'buffer.html#class-buffer' } },
    expected: ['Wrap types in curly braces: `{Buffer}`, not `<Buffer>`'],
  },
  {
    name: 'unknown angle-bracket names are left alone',
    input: '# T\n\nA <Widget> value.\n',
    expected: [],
  },
]);
