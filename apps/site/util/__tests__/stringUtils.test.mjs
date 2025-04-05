import assert from 'node:assert';
import { describe, it } from 'node:test';

import {
  getAcronymFromString,
  parseRichTextIntoPlainText,
  dashToCamelCase,
} from '@/util/stringUtils';

describe('String utils', () => {
  it('getAcronymFromString returns the correct acronym', () => {
    assert.strictEqual(getAcronymFromString('John Doe'), 'JD');
  });

  it('getAcronymFromString returns the correct acronym for a single word', () => {
    assert.strictEqual(getAcronymFromString('John'), 'J');
  });

  it('getAcronymFromString if the string is empty, it returns NA', () => {
    assert.strictEqual(getAcronymFromString(''), '');
  });

  it('parseRichTextIntoPlainText returns plain text without HTML and JSX tags', () => {
    const richText = '<p>This is <strong>bold</strong> and <em>italic</em></p>';
    const result = parseRichTextIntoPlainText(richText);
    assert.strictEqual(result, 'This is bold and italic');
  });

  it('parseRichTextIntoPlainText replaces Markdown links with their text content', () => {
    const richText =
      'Check out [Node.js](https://nodejs.org/en/) for more information.';
    const result = parseRichTextIntoPlainText(richText);
    assert.strictEqual(result, 'Check out Node.js for more information.');
  });

  it('parseRichTextIntoPlainText replaces Markdown lists with their content', () => {
    const richText = '- Item 1\n- Item 2\n- Item 3';
    const result = parseRichTextIntoPlainText(richText);
    assert.strictEqual(result, 'Item 1\nItem 2\nItem 3');
  });

  it('parseRichTextIntoPlainText replaces Markdown underscore, bold, and italic with their content', () => {
    const richText = 'This is _underscore_, **bold**, and *italic*.';
    const result = parseRichTextIntoPlainText(richText);
    assert.strictEqual(result, 'This is underscore, bold, and italic.');
  });

  it('parseRichTextIntoPlainText replaces Markdown multiline code blocks with an empty string', () => {
    const richText =
      'Some text\n```\nconst x = 42;\nconsole.log(x);\n```\nMore text';
    const result = parseRichTextIntoPlainText(richText);
    assert.strictEqual(result, 'Some text\nMore text');
  });

  it('parseRichTextIntoPlainText removes empty lines or lines with just spaces', () => {
    const richText = 'Line 1\n  \nLine 3';
    const result = parseRichTextIntoPlainText(richText);
    assert.strictEqual(result, 'Line 1\nLine 3');
  });

  it('parseRichTextIntoPlainText removes leading and trailing spaces from each line', () => {
    const richText = '   Line 1   \n   Line 2   \n   Line 3   ';
    const result = parseRichTextIntoPlainText(richText);
    assert.strictEqual(result, 'Line 1\nLine 2\nLine 3');
  });

  it('dashToCamelCase returns correct camelCase', () => {
    assert.strictEqual(dashToCamelCase('foo-bar-baz'), 'fooBarBaz');
  });

  it('dashToCamelCase returns correct camelCase with capital first letter', () => {
    assert.strictEqual(dashToCamelCase('Foo-bar'), 'fooBar');
  });

  it('dashToCamelCase returns correct camelCase with numbers', () => {
    assert.strictEqual(dashToCamelCase('foo-123-bar'), 'foo123Bar');
  });

  it('getAcronymFromString returns an acronym for a simple string', () => {
    const result = getAcronymFromString('Node JS');
    assert.strictEqual(result, 'NJ');
  });

  it('parseRichTextIntoPlainText removes markdown syntax', () => {
    const result = parseRichTextIntoPlainText(
      'Hello **world**!\n*italic text*'
    );
    assert.strictEqual(result, 'Hello world!\nitalic text');
  });

  it('dashToCamelCase converts dashed strings to camelCase', () => {
    const result = dashToCamelCase('es-2015');
    assert.strictEqual(result, 'es2015');
  });

  describe('stringUtils', () => {
    describe('getAcronymFromString', () => {
      it('should return correct acronym', () => {
        const result = getAcronymFromString('Hello World');
        assert.strictEqual(result, 'HW');
      });
    });

    describe('parseRichTextIntoPlainText', () => {
      it('should remove markdown and HTML', () => {
        const result = parseRichTextIntoPlainText('<h1>Hello</h1> *world*');
        assert.strictEqual(result, 'Hello world');
      });
    });

    describe('dashToCamelCase', () => {
      it('should convert dash-case to camelCase', () => {
        assert.strictEqual(dashToCamelCase('es-2015-config'), 'es2015Config');
      });
    });
  });
});
