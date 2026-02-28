import eslintReact from '@eslint-react/eslint-plugin';
import storybook from 'eslint-plugin-storybook';

import baseConfig from '../../eslint.config.js';

export default baseConfig.concat([
  eslintReact.configs['recommended-typescript'],
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
      '@eslint-react/no-array-index-key': 'off',
    },
  },
]);
