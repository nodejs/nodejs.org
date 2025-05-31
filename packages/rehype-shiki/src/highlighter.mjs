import { createHighlighterCoreSync } from '@shikijs/core';
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import shikiNordTheme from 'shiki/themes/nord.mjs';

const DEFAULT_THEME = {
  // We are updating this color because the background color and comment text color
  // in the Codebox component do not comply with accessibility standards
  // @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
  colorReplacements: { '#616e88': '#707e99' },
  ...shikiNordTheme,
};

/**
 * Creates a syntax highlighter with utility functions
 * @param {import('@shikijs/core').HighlighterCoreOptions} options - Configuration options for the highlighter
 */
export const createHighlighter = options => {
  const shiki = createHighlighterCoreSync({
    themes: [DEFAULT_THEME],
    engine: createJavaScriptRegexEngine(),
    ...options,
  });

  const theme = options.themes?.[0] ?? DEFAULT_THEME;
  const langs = options.langs ?? [];

  const getLanguageDisplayName = language => {
    const languageByIdOrAlias = langs.find(
      ({ name, aliases }) =>
        name.toLowerCase() === language.toLowerCase() ||
        (aliases !== undefined && aliases.includes(language.toLowerCase()))
    );

    return languageByIdOrAlias?.displayName ?? language;
  };

  /**
   * Highlights code and returns the inner HTML inside the <code> tag
   *
   * @param {string} code - The code to highlight
   * @param {string} language - The programming language to use for highlighting
   * @returns {string} The inner HTML of the highlighted code
   */
  const highlightToHtml = (code, language) =>
    shiki
      .codeToHtml(code, { lang: language, theme })
      // Shiki will always return the Highlighted code encapsulated in a <pre> and <code> tag
      // since our own CodeBox component handles the <code> tag, we just want to extract
      // the inner highlighted code to the CodeBox
      .match(/<code>(.+?)<\/code>/s)[1];

  /**
   * Highlights code and returns a HAST tree
   *
   * @param {string} code - The code to highlight
   * @param {string} language - The programming language to use for highlighting
   */
  const highlightToHast = (code, language) =>
    shiki.codeToHast(code, { lang: language, theme });

  return {
    shiki,
    getLanguageDisplayName,
    highlightToHtml,
    highlightToHast,
  };
};
