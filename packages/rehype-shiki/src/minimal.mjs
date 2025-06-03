import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';

import { createHighlighter } from './highlighter.mjs';

const { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml } =
  createHighlighter({
    langs: [...powershellLanguage, ...shellScriptLanguage],
  });

export { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml };
