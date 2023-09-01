'use strict';

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
    embeddedLangs: ['sql'],
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
    embeddedLangs: ['java'],
    grammar: xmlLanguage,
  },
  {
    id: 'yaml',
    scopeName: 'source.yaml',
    grammar: yamlLanguage,
  },
];
