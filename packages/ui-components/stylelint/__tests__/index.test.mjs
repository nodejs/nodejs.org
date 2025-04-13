import {
  indentClassNames,
  cleanClassNames,
  applyIndentation,
} from '../utils.mjs';

describe('cleanClassNames', () => {
  it('removes newlines and extra spaces', () => {
    const input = '  text-xl   \r   font-bold \n\n   text-center  ';
    const expected = 'text-xl font-bold text-center';

    expect(cleanClassNames(input)).toBe(expected);
  });

  it('trims leading and trailing spaces', () => {
    const input = '   mt-4   ';
    const expected = 'mt-4';

    expect(cleanClassNames(input)).toBe(expected);
  });

  it('returns empty string when input is empty', () => {
    expect(cleanClassNames('')).toBe('');
  });
});

describe('applyIndentation', () => {
  it('adds indentation to each class name', () => {
    const input = 'text-xl font-bold text-center';
    const indent = '    ';
    const expected = ['text-xl', '    font-bold', '    text-center'].join('\n');

    expect(applyIndentation(input, indent)).toBe(expected);
  });
});

describe('indentClassNames', () => {
  it('returns null if rule is missing required properties', () => {
    expect(indentClassNames(null)).toBeNull();
    expect(indentClassNames({})).toBeNull();
    expect(indentClassNames({ params: 'foo' })).toBeNull();
    expect(indentClassNames({ params: 'foo', raws: {} })).toBeNull();
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

    expect(result).toEqual({
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

    expect(result).toBe(rule);
    expect(result.params).toBe('p-4\n    mb-2');
  });
});
