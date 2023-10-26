'use strict';

/**
 * READ: This file allows us to configure a subset of languages that we want to support on the Node.js Website
 * we use `shikiji-compat` (translation layer that exposes the same API of `shiki` with `shikiji`)
 * we use `shikiji` instead of `shiki` as it is native ESM and we can use it in Node.js without transpiling
 */

import javaScriptLanguage from 'shikiji/langs/javascript.mjs';
import jsonLanguage from 'shikiji/langs/json.mjs';
import jsxLanguage from 'shikiji/langs/jsx.mjs';
import shellScriptLanguage from 'shikiji/langs/shellscript.mjs';
import shellSessionLanguage from 'shikiji/langs/shellsession.mjs';
import typeScriptLanguage from 'shikiji/langs/typescript.mjs';
import xmlLanguage from 'shikiji/langs/xml.mjs';
import yamlLanguage from 'shikiji/langs/yaml.mjs';
import shikiNordTheme from 'shikiji/themes/nord.mjs';

/** @type {import('shiki').ILanguageRegistration[]} */
export const LANGUAGES = [
  {
    ...javaScriptLanguage[0],
    id: 'javascript',
    scopeName: 'source.js',
    aliases: ['js'],
  },
  {
    ...jsonLanguage[0],
    id: 'json',
    scopeName: 'source.json',
  },
  {
    ...jsxLanguage[0],
    id: 'jsx',
    scopeName: 'source.js.jsx',
  },
  {
    ...typeScriptLanguage[0],
    id: 'typescript',
    scopeName: 'source.ts',
    aliases: ['ts'],
  },
  {
    ...xmlLanguage[0],
    id: 'xml',
    scopeName: 'text.xml',
  },
  {
    ...yamlLanguage[0],
    id: 'yaml',
    scopeName: 'source.yaml',
    aliases: ['yml'],
  },
  {
    ...shellScriptLanguage[0],
    id: 'shellscript',
    scopeName: 'source.shell',
    aliases: ['bash', 'sh', 'shell', 'zsh'],
  },
  {
    ...shellSessionLanguage[0],
    id: 'shellsession',
    scopeName: 'text.shell-session',
    aliases: ['console'],
  },
];

// This is the default theme we use for our Shiki Syntax Highlighter
export const DEFAULT_THEME = shikiNordTheme;

// This is the default language we use for our Shiki Syntax Highlighter
export const DEFAULT_LANG = 'plaintext';
