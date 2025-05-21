import { createHighlighterCoreSync } from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';

import { LANGUAGES, DEFAULT_THEME } from './languages.mjs';

let _shiki;

/**
 * Lazy-load and memoize the minimal Shikiji Syntax Highlighter
 * @returns {import('@shikijs/core').HighlighterCore}
 */
export const getShiki = () => {
  if (!_shiki) {
    _shiki = createHighlighterCoreSync({
      themes: [DEFAULT_THEME],
      langs: LANGUAGES,
      // Let's use Shiki's new Experimental JavaScript-based regex engine!
      engine: createJavaScriptRegexEngine(),
    });
  }
  return _shiki;
};

/**
 * Highlights code and returns the inner HTML inside the <code> tag
 *
 * @param {string} code - The code to highlight
 * @param {string} language - The programming language to use for highlighting
 * @returns {string} The inner HTML of the highlighted code
 */
export const highlightToHtml = (code, language) =>
  getShiki()
    .codeToHtml(code, { lang: language, theme: DEFAULT_THEME })
    // Shiki will always return the Highlighted code encapsulated in a <pre> and <code> tag
    // since our own CodeBox component handles the <code> tag, we just want to extract
    // the inner highlighted code to the CodeBox
    .match(/<code>(.+?)<\/code>/s)[1];

/**
 * Highlights code and returns a HAST tree
 *
 * @param {string} code - The code to highlight
 * @param {string} language - The programming language to use for highlighting
 * @returns {import('hast').Element} The HAST representation of the highlighted code
 */
export const highlightToHast = (code, language) =>
  getShiki().codeToHast(code, { lang: language, theme: DEFAULT_THEME });
