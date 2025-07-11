import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  indentClassNames,
  cleanClassNames,
  applyIndentation,
} from '../utils.mjs';

describe('cleanClassNames', () => {
  it('removes newlines and extra spaces', () => {
    const input = '  text-xl   \r   font-bold \n\n   text-center  ';
    const expected = 'text-xl font-bold text-center';

    assert.equal(cleanClassNames(input), expected);
  });

  it('trims leading and trailing spaces', () => {
    const input = '   mt-4   ';
    const expected = 'mt-4';

    assert.equal(cleanClassNames(input), expected);
  });

  it('returns empty string when input is empty', () => {
    assert.equal(cleanClassNames(''), '');
  });
});

describe('applyIndentation', () => {
  it('adds indentation to each class name', () => {
    const input = 'text-xl font-bold text-center';
    const indent = '    ';
    const expected = ['text-xl', '    font-bold', '    text-center'].join('\n');

    assert.equal(applyIndentation(input, indent), expected);
  });
});

describe('indentClassNames', () => {
  it('returns null if rule is missing required properties', () => {
    assert.equal(indentClassNames(null), null);
    assert.equal(indentClassNames({}), null);
    assert.equal(indentClassNames({ params: 'foo' }), null);
    assert.equal(indentClassNames({ params: 'foo', raws: {} }), null);
  });

  it('cleans and indents class names correctly', () => {
    const rule = {
      params: '  text-xl \n font-bold  \n text-center ',
      raws: {
        before: '  ',
      },
    };

    const result = indentClassNames({ ...rule });
    const expectedParams = ['text-xl', '   font-bold', '   text-center'].join(
      '\n'
    );

    assert.deepEqual(result, {
      ...rule,
      params: expectedParams,
    });
  });

  it('returns the same rule object with modified params', () => {
    const rule = {
      params: 'p-4 mb-2',
      raws: { before: '  \n' },
    };

    const result = indentClassNames(rule);

    assert.deepEqual(result, {
      ...result,
      params: 'p-4\n    mb-2',
    });
  });
});
