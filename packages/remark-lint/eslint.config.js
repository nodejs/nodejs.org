import globals from 'globals';

import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: globals.nodeBuiltin,
      parserOptions: {
        // Allow nullish syntax (i.e. "?." or "??"),
        // and top-level await
        ecmaVersion: 'latest',
      },
    },
  },
];
