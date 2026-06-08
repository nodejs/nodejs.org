import { createHighlighterCoreSync, isSpecialLang } from '@shikijs/core';
import shikiNordTheme from 'shiki/themes/nord.mjs';

const DEFAULT_THEME = {
  // We are updating this color because the background color and comment text color
  // in the Codebox component do not comply with accessibility standards.
  // See: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
  colorReplacements: { '#616e88': '#707e99' },
  ...shikiNordTheme,
};

const FALLBACK_LANGUAGE = 'text';

/**
 * @template {{ name: string; aliases?: string[] }} T
 * @param {string} language
 * @param {ReadonlyArray<T>} langs
 * @returns {T | undefined}
 */
export const getLanguageByName = (language, langs) => {
  const normalized = language.toLowerCase();
  return langs.find(
    ({ name, aliases }) =>
      name.toLowerCase() === normalized || aliases?.includes(normalized)
  );
};

/**
 * @typedef {Object} SyntaxHighlighter
 * @property {import('@shikijs/core').HighlighterCore} shiki - The underlying shiki core instance.
 * @property {(languageId?: string) => string} resolveLanguage - Resolves a language id to a loaded language, falling back to plain text.
 * @property {(code: string, lang: string, meta?: Record<string, any>) => string} highlightToHtml - Highlights code and returns inner HTML of the <code> tag.
 * @property {(code: string, lang: string, meta?: Record<string, any>) => any} highlightToHast - Highlights code and returns a HAST tree.
 */

/**
 * Factory function to create a syntax highlighter instance with utility methods.
 *
 * @param {Object} params - Parameters for highlighter creation.
 * @param {import('@shikijs/core').HighlighterCoreOptions} [params.coreOptions] - Core options for the highlighter.
 * @param {import('@shikijs/core').CodeToHastOptions} [params.highlighterOptions] - Additional options for highlighting.
 * @returns {SyntaxHighlighter}
 */
const createHighlighter = ({ coreOptions = {}, highlighterOptions = {} }) => {
  const options = {
    themes: [DEFAULT_THEME],
    ...coreOptions,
  };
  const shiki = createHighlighterCoreSync(options);
  const theme = options.themes[0];

  const loadedLanguages = new Set(
    shiki.getLoadedLanguages().map(lang => lang.toLowerCase())
  );

  /**
   * Resolves a language id to one this highlighter can handle.
   * Falls back to plain text for unknown/unloaded languages so
   * highlighting never throws on unrecognized code fences.
   *
   * @param {string} [languageId]
   * @returns {string}
   */
  const resolveLanguage = languageId => {
    const normalized = languageId?.toLowerCase();

    if (
      normalized &&
      (isSpecialLang(normalized) || loadedLanguages.has(normalized))
    ) {
      return languageId;
    }

    return FALLBACK_LANGUAGE;
  };

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
      .codeToHtml(code, {
        lang: resolveLanguage(lang),
        theme,
        meta,
        ...highlighterOptions,
      })
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
    shiki.codeToHast(code, {
      lang: resolveLanguage(lang),
      theme,
      meta,
      ...highlighterOptions,
    });

  return {
    shiki,
    resolveLanguage,
    highlightToHtml,
    highlightToHast,
  };
};

export default createHighlighter;
