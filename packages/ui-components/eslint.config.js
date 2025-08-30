import react from 'eslint-plugin-react';
import * as hooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';

import baseConfig from '../../eslint.config.js';

export default baseConfig.concat([
  react.configs.flat['jsx-runtime'],
  hooks.configs['recommended-latest'],
  ...storybook.configs['flat/recommended'],

  // Type-checking
  {
    files: ['src'],
    ignores: ['**/*.test.*', '**/*.stories.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  {
    rules: {
      'storybook/no-renderer-packages': 'off',

      'react/no-unescaped-entities': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
    settings: { react: { version: 'detect' } },
  },
]);
