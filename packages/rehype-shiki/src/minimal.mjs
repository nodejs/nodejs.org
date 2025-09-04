import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';

import createHighlighter, { getLanguageByName } from './highlighter.mjs';

export const LANGS = [...powershellLanguage, ...shellScriptLanguage];

export const getLanguageDisplayName = language =>
  getLanguageByName(language, LANGS)?.displayName ?? language;

export const { shiki, highlightToHast, highlightToHtml } = createHighlighter({
  coreOptions: {
    // For the minimal (web) Shiki, we want to use the simpler,
    // JavaScript based engine.
    engine: createJavaScriptRegexEngine(),
    langs: [...powershellLanguage, ...shellScriptLanguage],
  },
});
