import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        // Allow nullish syntax (i.e. "?." or "??")
        ecmaVersion: 2020,
      },
    },
    rules: {
      // Shiki's export isn't named, it's a re-export
      'import-x/named': 'off',
    },
  },
];
