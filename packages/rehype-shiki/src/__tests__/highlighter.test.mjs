import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Mock dependencies
const mockShiki = {
  codeToHtml: mock.fn(() => '<pre><code>highlighted code</code></pre>'),
  codeToHast: mock.fn(() => ({ type: 'element', tagName: 'pre' })),
  getLoadedLanguages: mock.fn(() => ['javascript', 'js']),
};

const SPECIAL_LANGS = ['text', 'plaintext', 'txt', 'ansi'];

mock.module('@shikijs/core', {
  namedExports: {
    createHighlighterCoreSync: () => mockShiki,
    isSpecialLang: lang => SPECIAL_LANGS.includes(lang),
  },
});

mock.module('@shikijs/engine-javascript', {
  namedExports: { createJavaScriptRegexEngine: () => ({}) },
});

mock.module('shiki/themes/nord.mjs', {
  defaultExport: { name: 'nord', colors: { 'editor.background': '#2e3440' } },
});

describe('createHighlighter', async () => {
  const { default: createHighlighter } = await import('../highlighter.mjs');

  describe('resolveLanguage', () => {
    it('returns the language when it is loaded', () => {
      const highlighter = createHighlighter({});

      assert.strictEqual(
        highlighter.resolveLanguage('javascript'),
        'javascript'
      );
    });

    it('returns the language when it is a special language', () => {
      const highlighter = createHighlighter({});

      assert.strictEqual(highlighter.resolveLanguage('plaintext'), 'plaintext');
    });

    it('falls back to text for unknown languages', () => {
      const highlighter = createHighlighter({});

      assert.strictEqual(highlighter.resolveLanguage('unknown'), 'text');
    });
  });

  describe('highlightToHtml', () => {
    it('extracts inner HTML from code tag', () => {
      mockShiki.codeToHtml.mock.mockImplementationOnce(
        () => '<pre><code>const x = 1;</code></pre>'
      );

      const highlighter = createHighlighter({});
      const result = highlighter.highlightToHtml('const x = 1;', 'javascript');

      assert.strictEqual(result, 'const x = 1;');
    });

    it('falls back to text for unknown languages', () => {
      const highlighter = createHighlighter({});
      highlighter.highlightToHtml('code', 'not-a-language');

      const [, options] = mockShiki.codeToHtml.mock.calls.at(-1).arguments;
      assert.strictEqual(options.lang, 'text');
    });
  });

  describe('highlightToHast', () => {
    it('returns HAST tree from shiki', () => {
      const expectedHast = { type: 'element', tagName: 'pre' };
      mockShiki.codeToHast.mock.mockImplementationOnce(() => expectedHast);

      const highlighter = createHighlighter({});
      const result = highlighter.highlightToHast('code', 'javascript');

      assert.deepStrictEqual(result, expectedHast);
    });

    it('falls back to text for unknown languages', () => {
      const highlighter = createHighlighter({});
      highlighter.highlightToHast('code', 'not-a-language');

      const [, options] = mockShiki.codeToHast.mock.calls.at(-1).arguments;
      assert.strictEqual(options.lang, 'text');
    });
  });
});
