// Keep all imports at the top
import cLanguage from 'shiki/langs/c.mjs';
import coffeeScriptLanguage from 'shiki/langs/coffeescript.mjs';
import cPlusPlusLanguage from 'shiki/langs/cpp.mjs';
import diffLanguage from 'shiki/langs/diff.mjs';
import dockerLanguage from 'shiki/langs/docker.mjs';
import httpLanguage from 'shiki/langs/http.mjs';
import iniLanguage from 'shiki/langs/ini.mjs';
import javaScriptLanguage from 'shiki/langs/javascript.mjs';
import jsonLanguage from 'shiki/langs/json.mjs';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';
import shellSessionLanguage from 'shiki/langs/shellsession.mjs';
import typeScriptLanguage from 'shiki/langs/typescript.mjs';
import yamlLanguage from 'shiki/langs/yaml.mjs';

import createHighlighter, { getLanguageByName } from './highlighter.mjs';

/**
 * @typedef {Object} HighlighterOptions
 * @property {boolean} [wasm=false] - Enable WebAssembly for the regex engine
 * @property {boolean} [twoslash=false] - Enable twoslash
 * @property {import('@shikijs/twoslash').TransformerTwoslashIndexOptions} [twoslashOptions] - Twoslash configuration options
 * @param {import('@shikijs/core').HighlighterCoreOptions} [coreOptions] - Core options for the highlighter.
 * @param {import('@shikijs/core').CodeToHastOptions} [highlighterOptions] - Additional options for highlighting.
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

  const { createJavaScriptRegexEngine } = await import(
    '@shikijs/engine-javascript'
  );
  return createJavaScriptRegexEngine();
}

/**
 * Configures and returns transformers based on options
 * @param {HighlighterOptions} options - Configuration options
 */
async function getTransformers({ twoslash = false, twoslashOptions }) {
  const transformers = [];

  if (twoslash) {
    const { twoslash } = await import('./transformers/twoslash/index.mjs');
    transformers.push(twoslash(twoslashOptions));
  }

  return transformers;
}

export const LANGS = [
  ...cLanguage,
  ...coffeeScriptLanguage,
  ...cPlusPlusLanguage,
  ...diffLanguage,
  ...dockerLanguage,
  ...httpLanguage,
  ...iniLanguage,
  {
    ...javaScriptLanguage[0],
    aliases: javaScriptLanguage[0].aliases.concat('cjs', 'mjs'),
  },
  ...jsonLanguage,
  ...powershellLanguage,
  ...shellScriptLanguage,
  ...shellSessionLanguage,
  ...typeScriptLanguage,
  ...yamlLanguage,
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
