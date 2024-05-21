import {
  getAcronymFromString,
  parseRichTextIntoPlainText,
  dashToCamelCase,
} from '@/util/stringUtils';

describe('String utils', () => {
  it('getAcronymFromString returns the correct acronym', () => {
    expect(getAcronymFromString('John Doe')).toBe('JD');
  });

  it('getAcronymFromString returns the correct acronym for a single word', () => {
    expect(getAcronymFromString('John')).toBe('J');
  });

  it('getAcronymFromString if the string is empty, it returns NA', () => {
    expect(getAcronymFromString('')).toBe('');
  });

  it('parseRichTextIntoPlainText returns plain text without HTML and JSX tags', () => {
    const richText = '<p>This is <strong>bold</strong> and <em>italic</em></p>';
    const result = parseRichTextIntoPlainText(richText);
    expect(result).toBe('This is bold and italic');
  });

  it('parseRichTextIntoPlainText replaces Markdown links with their text content', () => {
    const richText =
      'Check out [Node.js](https://nodejs.org/en/) for more information.';
    const result = parseRichTextIntoPlainText(richText);
    expect(result).toBe('Check out Node.js for more information.');
  });

  it('parseRichTextIntoPlainText replaces Markdown lists with their content', () => {
    const richText = '- Item 1\n- Item 2\n- Item 3';
    const result = parseRichTextIntoPlainText(richText);
    expect(result).toBe('Item 1\nItem 2\nItem 3');
  });

  it('parseRichTextIntoPlainText replaces Markdown underscore, bold, and italic with their content', () => {
    const richText = 'This is _underscore_, **bold**, and *italic*.';
    const result = parseRichTextIntoPlainText(richText);
    expect(result).toBe('This is underscore, bold, and italic.');
  });

  it('parseRichTextIntoPlainText replaces Markdown multiline code blocks with an empty string', () => {
    const richText =
      'Some text\n```\nconst x = 42;\nconsole.log(x);\n```\nMore text';
    const result = parseRichTextIntoPlainText(richText);
    expect(result).toBe('Some text\nMore text');
  });

  it('parseRichTextIntoPlainText removes empty lines or lines with just spaces', () => {
    const richText = 'Line 1\n  \nLine 3';
    const result = parseRichTextIntoPlainText(richText);
    expect(result).toBe('Line 1\nLine 3');
  });

  it('parseRichTextIntoPlainText removes leading and trailing spaces from each line', () => {
    const richText = '   Line 1   \n   Line 2   \n   Line 3   ';
    const result = parseRichTextIntoPlainText(richText);
    expect(result).toBe('Line 1\nLine 2\nLine 3');
  });

  it('should convert dash-separated strings to camelCase', () => {
    expect(dashToCamelCase('hello-world')).toBe('helloWorld');
    expect(dashToCamelCase('my-name-is')).toBe('myNameIs');
    expect(dashToCamelCase('dash-to-camel-case')).toBe('dashToCamelCase');
  });

  it('should handle strings without dashes', () => {
    expect(dashToCamelCase('hello')).toBe('hello');
    expect(dashToCamelCase('world')).toBe('world');
  });

  it('should handle numbers in the string', () => {
    expect(dashToCamelCase('my-name-is-007')).toBe('myNameIs007');
    expect(dashToCamelCase('123-abc')).toBe('123Abc');
    expect(dashToCamelCase('test-1-2-3')).toBe('test123');
    expect(dashToCamelCase('test-123-abc')).toBe('test123Abc');
  });
});
