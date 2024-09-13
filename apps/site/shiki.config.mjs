'use strict';

import diffLanguage from 'shiki/langs/diff.mjs';
import dockerLanguage from 'shiki/langs/docker.mjs';
import javaScriptLanguage from 'shiki/langs/javascript.mjs';
import jsonLanguage from 'shiki/langs/json.mjs';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';
import shellSessionLanguage from 'shiki/langs/shellsession.mjs';
import typeScriptLanguage from 'shiki/langs/typescript.mjs';
import shikiNordTheme from 'shiki/themes/nord.mjs';

/**
 * All languages needed within the Node.js website for syntax highlighting.
 *
 * @type {Array<import('shiki').LanguageRegistration>}
 */
export const LANGUAGES = [
  {
    ...javaScriptLanguage[0],
    // We path the JavaScript language to include the CommonJS and ES Module aliases
    // that are commonly used (non-standard aliases) within our API docs and Blog posts
    aliases: javaScriptLanguage[0].aliases.concat('cjs', 'mjs'),
  },
  ...jsonLanguage,
  ...typeScriptLanguage,
  ...shellScriptLanguage,
  ...powershellLanguage,
  ...shellSessionLanguage,
  ...dockerLanguage,
  ...diffLanguage,
];

// This is the default theme we use for our Shiki Syntax Highlighter
export const DEFAULT_THEME = {
  // We updating this color because the background color and comment text color
  // in the Codebox component do not comply with accessibility standards
  // @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
  colorReplacements: { '#616e88': '#707e99' },
  ...shikiNordTheme,
};
