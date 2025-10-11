import { createHighlighterCoreSync } from '@shikijs/core';
import shikiNordTheme from 'shiki/themes/nord.mjs';

const DEFAULT_THEME = {
  // We are updating this color because the background color and comment text color
  // in the Codebox component do not comply with accessibility standards.
  // See: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
  colorReplacements: { '#616e88': '#707e99' },
  ...shikiNordTheme,
};

export const getLanguageByName = (language, langs) => {
  const normalized = language.toLowerCase();

  return langs.find(
    ({ name, aliases }) =>
      name.toLowerCase() === normalized || aliases?.includes(normalized)
  );
};

/**
 * Factory function to create a syntax highlighter instance with utility methods.
 *
 * @param {Object} params - Parameters for highlighter creation.
 * @param {import('@shikijs/core').HighlighterCoreOptions} [params.coreOptions] - Core options for the highlighter.
 * @param {import('@shikijs/core').CodeToHastOptions} [params.highlighterOptions] - Additional options for highlighting.
 */
const createHighlighter = ({ coreOptions = {}, highlighterOptions = {} }) => {
  const options = {
    themes: [DEFAULT_THEME],
    ...coreOptions,
  };

  const shiki = createHighlighterCoreSync(options);

  const theme = options.themes[0];

  /**
   * Highlights code and returns the inner HTML inside the <code> tag
   *
   * @param {string} code - The code to highlight
   * @param {string} lang - The programming language to use for highlighting
   * @param {Record<string, any>} meta - Metadata
   * @returns {string} The inner HTML of the highlighted code
   */
  const highlightToHtml = (code, lang, meta = {}) =>
    shiki
      .codeToHtml(code, { lang, theme, meta, ...highlighterOptions })
      // Shiki will always return the Highlighted code encapsulated in a <pre> and <code> tag
      // since our own CodeBox component handles the <code> tag, we just want to extract
      // the inner highlighted code to the CodeBox
      .match(/<code>(.+?)<\/code>/s)[1];

  /**
   * Highlights code and returns a HAST tree
   *
   * @param {string} code - The code to highlight
   * @param {string} lang - The programming language to use for highlighting
   * @param {Record<string, any>} meta - Metadata
   */
  const highlightToHast = (code, lang, meta = {}) =>
    shiki.codeToHast(code, { lang, theme, meta, ...highlighterOptions });

  return {
    shiki,
    highlightToHtml,
    highlightToHast,
  };
};

export default createHighlighter;
