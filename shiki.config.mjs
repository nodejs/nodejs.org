'use strict';

/** @type {import('shiki').ILanguageRegistration[]} */
export const SUPPORTED_LANGUAGES = [
  {
    id: 'c',
    scopeName: 'source.c',
    path: require.resolve('shiki/languages/c.tmLanguage.json'),
  },
  {
    id: 'cpp',
    scopeName: 'source.cpp',
    embeddedLangs: ['sql'],
    path: require.resolve('shiki/languages/cpp.tmLanguage.json'),
  },
  {
    id: 'javascript',
    scopeName: 'source.js',
    aliases: ['js'],
    path: require.resolve('shiki/languages/javascript.tmLanguage.json'),
  },
  {
    id: 'json',
    scopeName: 'source.json',
    path: require.resolve('shiki/languages/json.tmLanguage.json'),
  },
  {
    id: 'jsx',
    scopeName: 'source.js.jsx',
    path: require.resolve('shiki/languages/jsx.tmLanguage.json'),
  },
  {
    id: 'typescript',
    scopeName: 'source.ts',
    aliases: ['ts'],
    path: require.resolve('shiki/languages/typescript.tmLanguage.json'),
  },
  {
    id: 'xml',
    scopeName: 'text.xml',
    embeddedLangs: ['java'],
    path: require.resolve('shiki/languages/xml.tmLanguage.json'),
  },
  {
    id: 'yaml',
    scopeName: 'source.yaml',
    path: require.resolve('shiki/languages/yaml.tmLanguage.json'),
  },
];
