'use strict';

/**
 * READ: This file allows us to configure a subset of languages that we want to support on the Node.js Website
 * we use `shikiji` which is an ESM-only rewrite of Shiki
 */

import dockerLanguage from 'shikiji/langs/docker.mjs';
import javaScriptLanguage from 'shikiji/langs/javascript.mjs';
import jsonLanguage from 'shikiji/langs/json.mjs';
import jsxLanguage from 'shikiji/langs/jsx.mjs';
import shellScriptLanguage from 'shikiji/langs/shellscript.mjs';
import shellSessionLanguage from 'shikiji/langs/shellsession.mjs';
import typeScriptLanguage from 'shikiji/langs/typescript.mjs';
import xmlLanguage from 'shikiji/langs/xml.mjs';
import yamlLanguage from 'shikiji/langs/yaml.mjs';
import shikiNordTheme from 'shikiji/themes/nord.mjs';

/** @type {import('shikiji').LanguageRegistration[]} */
export const LANGUAGES = [
  {
    ...javaScriptLanguage[0],
    scopeName: 'source.js',
    aliases: ['mjs', 'cjs', 'js'],
  },
  {
    ...jsonLanguage[0],
    scopeName: 'source.json',
  },
  {
    ...jsxLanguage[0],
    scopeName: 'source.js.jsx',
  },
  {
    ...typeScriptLanguage[0],
    scopeName: 'source.ts',
    aliases: ['ts'],
  },
  {
    ...xmlLanguage[0],
    scopeName: 'text.xml',
  },
  {
    ...yamlLanguage[0],
    scopeName: 'source.yaml',
    aliases: ['yml'],
  },
  {
    ...shellScriptLanguage[0],
    scopeName: 'source.shell',
    aliases: ['bash', 'sh', 'shell', 'zsh'],
  },
  {
    ...shellSessionLanguage[0],
    scopeName: 'text.shell-session',
    aliases: ['console'],
  },
  {
    ...dockerLanguage[0],
    scopeName: 'source.dockerfile',
    aliases: ['dockerfile'],
  },
];

// This is the default theme we use for our Shiki Syntax Highlighter
export const DEFAULT_THEME = shikiNordTheme;
