import next from '@next/eslint-plugin-next';
import * as mdx from 'eslint-plugin-mdx';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import baseConfig from '../../eslint.config.js';

export default baseConfig.concat([
  {
    ignores: ['pages/en/blog/**/*.{md,mdx}/**', 'public', 'next-env.d.ts'],
  },

  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat['recommended-latest'],
  next.configs['core-web-vitals'],
  mdx.flatCodeBlocks,

  // Type-checking
  {
    ignores: ['**/*.{md,mdx}', '**/*.{md,mdx}/**'],
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

  {
    files: ['**/*.{md,mdx}/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: true }),
    rules: {
      ...mdx.flat.rules,
      'no-irregular-whitespace': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': ['error', 'apps/site/pages/'],
    },
  },
]);
