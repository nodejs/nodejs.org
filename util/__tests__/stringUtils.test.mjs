import {
  getAcronymFromString,
  parseRichTextIntoPlainText,
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

  it('parseRichTextIntoPlainText returns the correct plain text from an HTML tag', () => {
    expect(parseRichTextIntoPlainText('<p>John Doe</p>')).toBe('John Doe');
  });

  it('parseRichTextIntoPlainText returns only the text of a link tag', () => {
    expect(
      parseRichTextIntoPlainText('[this is a link](https://www.google.com)')
    ).toBe('this is a link');
  });

  it('parseRichTextIntoPlainText replaces markdown lists with their content', () => {
    expect(
      parseRichTextIntoPlainText('- this is a list item\n- this is another')
    ).toBe('this is a list item\nthis is another');
  });

  it('parseRichTextIntoPlainText removes underscore, bold and italic with their content', () => {
    expect(
      parseRichTextIntoPlainText(
        '**bold content**, *italic content*, _underscore content_'
      )
    ).toBe('bold content, italic content, underscore content');
  });

  it('parseRichTextIntoPlainText removes code blocks with their content', () => {
    expect(
      parseRichTextIntoPlainText('this is a\n```code block```\nwith content')
    ).toBe('this is a\nwith content');
  });

  it('parseRichTextIntoPlainText replaces empty lines or lines just with spaces with an empty string', () => {
    expect(parseRichTextIntoPlainText('\n \n')).toBe('');
  });

  it('parseRichTextIntoPlainText replaces leading and trailing spaces from each line with an empty string', () => {
    expect(parseRichTextIntoPlainText('  this is a line  ')).toBe(
      'this is a line'
    );
  });

  it('parseRichTextIntoPlainText replaces leading numbers and dots from each line with an empty string', () => {
    expect(
      parseRichTextIntoPlainText('1. this is a line\n2. this is a second line')
    ).toBe('this is a line\nthis is a second line');
  });
});
