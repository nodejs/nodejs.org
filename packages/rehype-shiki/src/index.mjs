import { bundledLanguagesInfo } from 'shiki/langs';

import createHighlighter, { getLanguageByName } from '#rs/highlighter.mjs';

/**
 * @typedef {Object} HighlighterOptions
 * @property {boolean} [wasm=false] - Enable WebAssembly for the regex engine
 * @property {boolean} [twoslash=false] - Enable twoslash
 * @property {import('@shikijs/twoslash').TransformerTwoslashIndexOptions} [twoslashOptions] - Twoslash configuration options
 * @property {import('@shikijs/core').HighlighterCoreOptions} [coreOptions] - Core options for the highlighter.
 * @property {import('@shikijs/core').CodeToHastOptions} [highlighterOptions] - Additional options for highlighting.
 */

/**
 * Creates the appropriate regex engine based on configuration
 * @param {HighlighterOptions} options - Configuration options
 */
async function getEngine({ wasm = false }) {
  if (wasm) {
    const { createOnigurumaEngine } = await import('@shikijs/engine-oniguruma');
    return createOnigurumaEngine(await import('shiki/wasm'));
  }

  const { createJavaScriptRegexEngine } =
    await import('@shikijs/engine-javascript');

  // Not every bundled grammar compiles under the JavaScript engine,
  // so skip the patterns it cannot handle instead of throwing.
  return createJavaScriptRegexEngine({ forgiving: true });
}

/**
 * Configures and returns transformers based on options
 * @param {HighlighterOptions} options - Configuration options
 */
async function getTransformers({ twoslash = false, twoslashOptions }) {
  const transformers = [];

  if (twoslash) {
    const { twoslash } = await import('#rs/transformers/twoslash/index.mjs');
    transformers.push(twoslash(twoslashOptions));
  }

  return transformers;
}

// Every language, since this is meant for SSR-ed highlighting :-)
export const LANGS = [
  ...new Set(
    (
      await Promise.all(bundledLanguagesInfo.map(language => language.import()))
    ).flatMap(language => language.default)
  ),
];

export const getLanguageDisplayName = language =>
  getLanguageByName(language, LANGS)?.displayName ?? language;

/**
 * Creates and configures a syntax highlighter
 * @param {HighlighterOptions} options - Configuration options
 */
export default async (options = {}) =>
  createHighlighter({
    coreOptions: {
      ...options.coreOptions,
      langs: LANGS,
      engine: await getEngine(options),
    },
    highlighterOptions: {
      ...options.highlighterOptions,
      transformers: await getTransformers(options),
    },
  });
