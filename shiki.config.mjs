'use strict';

// Note.: We need to manually import each Language Grammar that we want to prevent Shiki from looking its BUNDLED languages map.
// If we provide `path` instead of `grammar`, Shiki will attempt to resolve the language from `BUNDLED_LANGUAGES`
// which will attempt to load the language from the `path` defined on Shiki's `BUNDLED_LANGUAGES` entry.
// In theory by using `require.resolve` (on our entries here), Vercel's NFT (Node File Trace) would include those paths
// But I assume it is safer to simply bundle these languages altogether, and remove the dependency on Shiki's `BUNDLED_LANGUAGES`

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
