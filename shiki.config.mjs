'use strict';

import diffLanguage from 'shiki/langs/diff.mjs';
import dockerLanguage from 'shiki/langs/docker.mjs';
import javaScriptLanguage from 'shiki/langs/javascript.mjs';
import jsonLanguage from 'shiki/langs/json.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';
import shellSessionLanguage from 'shiki/langs/shellsession.mjs';
import typeScriptLanguage from 'shiki/langs/typescript.mjs';
import shikiNordTheme from 'shiki/themes/nord.mjs';

/** @type {Array<import('shiki').LanguageRegistration>} */
export const LANGUAGES = [
  {
    ...javaScriptLanguage[0],
    scopeName: 'source.js',
    aliases: ['mjs', 'cjs', 'js'],
    displayName: 'JavaScript',
  },
  {
    ...jsonLanguage[0],
    scopeName: 'source.json',
    displayName: 'JSON',
  },
  {
    ...typeScriptLanguage[0],
    scopeName: 'source.ts',
    aliases: ['ts'],
    displayName: 'TypeScript',
  },
  {
    ...shellScriptLanguage[0],
    scopeName: 'source.shell',
    aliases: ['bash', 'sh', 'shell', 'zsh'],
    displayName: 'Bash',
  },
  {
    ...shellSessionLanguage[0],
    scopeName: 'text.shell-session',
    aliases: ['console'],
    displayName: 'Bash',
  },
  {
    ...dockerLanguage[0],
    scopeName: 'source.dockerfile',
    aliases: ['dockerfile'],
    displayName: 'Dockerfile',
  },
  {
    ...diffLanguage[0],
    scopeName: 'source.diff',
    displayName: 'Diff',
  },
];

// This is the default theme we use for our Shiki Syntax Highlighter
export const DEFAULT_THEME = {
  // We updating this color because the background color and comment text color
  // in the Codebox component do not comply with accessibility standards
  // @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
  colorReplacements: { '#616e88': '#707e99' },
  ...shikiNordTheme,
};
