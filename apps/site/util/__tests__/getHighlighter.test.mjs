import { highlightToHtml, highlightToHast } from '@/util/getHighlighter';

describe('highlightToHtml', () => {
  it('should return highlighted HTML for valid code and language', () => {
    const code = 'const x = 10;';
    const language = 'javascript';
    const result = highlightToHtml(code, language);
    expect(result).toContain('<span class="shiki">');
  });

  it('should handle invalid inputs gracefully', () => {
    const code = 'const x = 10;';
    const language = 'invalidLanguage';
    const result = highlightToHtml(code, language);
    expect(result).toContain('<span class="shiki">');
  });
});

describe('highlightToHast', () => {
  it('should return highlighted HAST for valid code and language', () => {
    const code = 'const x = 10;';
    const language = 'javascript';
    const result = highlightToHast(code, language);
    expect(result).toHaveProperty('type', 'root');
  });

  it('should handle invalid inputs gracefully', () => {
    const code = 'const x = 10;';
    const language = 'invalidLanguage';
    const result = highlightToHast(code, language);
    expect(result).toHaveProperty('type', 'root');
  });
});
