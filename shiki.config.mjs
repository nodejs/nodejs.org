'use strict';

/**
 * READ: Vercel's NFT is unable to by default understand that a dependent package (`shiki`) loads any of the files
 * mentioned within `BUNDLED_LANGUAGES` as they're loaded on-demand. We circumvent this issue by manually declaring these languages
 *
 * NOTE: Shiki attempts to load matching Languages from their `BUNDLED_LANGUAGES` by the built-in provided paths, even if we provide
 * languages with a custom `path`. This would cause issues with Vercel's NFT as it doesn't recognise the need of these files.
 *
 * This is easily fixable by using `require.resolve` on the languages below which makes Vercel NFT aware of these files.
 * Yet instead we adopted the `grammar` property approach instead of `path`, since if a `grammar` field is provided, it allows
 * Shiki to load the ones we provide instead of the ones from `BUNDLED_LANGUAGES`.
 */

import cLanguage from 'shiki/languages/c.tmLanguage.json' assert { type: 'json' };
import cppLanguage from 'shiki/languages/cpp.tmLanguage.json' assert { type: 'json' };
import javaScriptLanguage from 'shiki/languages/javascript.tmLanguage.json' assert { type: 'json' };
import jsonLanguage from 'shiki/languages/json.tmLanguage.json' assert { type: 'json' };
import jsxLanguage from 'shiki/languages/jsx.tmLanguage.json' assert { type: 'json' };
import typeScriptLanguage from 'shiki/languages/typescript.tmLanguage.json' assert { type: 'json' };
import xmlLanguage from 'shiki/languages/xml.tmLanguage.json' assert { type: 'json' };
import yamlLanguage from 'shiki/languages/yaml.tmLanguage.json' assert { type: 'json' };

/** @type {import('shiki').ILanguageRegistration[]} */
export const SUPPORTED_LANGUAGES = [
  {
    id: 'c',
    scopeName: 'source.c',
    grammar: cLanguage,
  },
  {
    id: 'cpp',
    scopeName: 'source.cpp',
    grammar: cppLanguage,
  },
  {
    id: 'javascript',
    scopeName: 'source.js',
    aliases: ['js'],
    grammar: javaScriptLanguage,
  },
  {
    id: 'json',
    scopeName: 'source.json',
    grammar: jsonLanguage,
  },
  {
    id: 'jsx',
    scopeName: 'source.js.jsx',
    grammar: jsxLanguage,
  },
  {
    id: 'typescript',
    scopeName: 'source.ts',
    aliases: ['ts'],
    grammar: typeScriptLanguage,
  },
  {
    id: 'xml',
    scopeName: 'text.xml',
    grammar: xmlLanguage,
  },
  {
    id: 'yaml',
    scopeName: 'source.yaml',
    grammar: yamlLanguage,
  },
];
