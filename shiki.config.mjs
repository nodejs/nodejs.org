'use strict';

/**
 * READ: This file allows us to configure a subset of languages that we want to support on the Node.js Website
 * we use `shikiji` which is an ESM-only rewrite of Shiki
 */

import diffLanguage from 'shikiji/langs/diff.mjs';
import dockerLanguage from 'shikiji/langs/docker.mjs';
import javaScriptLanguage from 'shikiji/langs/javascript.mjs';
import jsonLanguage from 'shikiji/langs/json.mjs';
import shellScriptLanguage from 'shikiji/langs/shellscript.mjs';
import shellSessionLanguage from 'shikiji/langs/shellsession.mjs';
import typeScriptLanguage from 'shikiji/langs/typescript.mjs';
import shikiNordTheme from 'shikiji/themes/nord.mjs';

/** @type {import('shikiji').LanguageRegistration[]} */
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
  colorReplacements: { '#616e88': '#707e99' },
  ...shikiNordTheme,
};
