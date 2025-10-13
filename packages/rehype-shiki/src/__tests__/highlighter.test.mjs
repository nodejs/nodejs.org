import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Mock dependencies
const mockShiki = {
  codeToHtml: mock.fn(() => '<pre><code>highlighted code</code></pre>'),
  codeToHast: mock.fn(() => ({ type: 'element', tagName: 'pre' })),
};

mock.module('@shikijs/core', {
  namedExports: { createHighlighterCoreSync: () => mockShiki },
});

mock.module('@shikijs/engine-javascript', {
  namedExports: { createJavaScriptRegexEngine: () => ({}) },
});

mock.module('shiki/themes/nord.mjs', {
  defaultExport: { name: 'nord', colors: { 'editor.background': '#2e3440' } },
});

describe('createHighlighter', async () => {
  const { default: createHighlighter } = await import('../highlighter.mjs');

  describe('highlightToHtml', () => {
    it('extracts inner HTML from code tag', () => {
      mockShiki.codeToHtml.mock.mockImplementationOnce(
        () => '<pre><code>const x = 1;</code></pre>'
      );

      const highlighter = createHighlighter({});
      const result = highlighter.highlightToHtml('const x = 1;', 'javascript');

      assert.strictEqual(result, 'const x = 1;');
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
  });
});
