import baseConfig from '../../eslint.config.js';
import importX from 'eslint-plugin-import-x';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        // Allow nullish syntax (i.e. "?." or "??")
        ecmaVersion: 2020,
      },
    },
  },
  importX.flatConfigs.typescript,
];
