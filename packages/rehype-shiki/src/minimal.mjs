import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';

import { createHighlighter } from './highlighter.mjs';

const { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml } =
  createHighlighter({
    // For the minimal (web) Shiki, we want to use the simpler,
    // JavaScript based engine.
    engine: createJavaScriptRegexEngine(),
    langs: [...powershellLanguage, ...shellScriptLanguage],
  });

export { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml };
