import { FlatCompat } from '@eslint/eslintrc';
import { flatConfigs } from 'eslint-plugin-import-x';
import * as mdx from 'eslint-plugin-mdx';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

import baseConfig from '../../eslint.config.js';

const compat = new FlatCompat();

const compatConfig = compat.config({
  extends: [
    // https://github.com/vercel/next.js/discussions/49337
    'plugin:@next/eslint-plugin-next/core-web-vitals',

    // https://github.com/facebook/react/issues/28313
    'plugin:react-hooks/recommended',
  ],
});

export default tseslint.config(
  ...baseConfig,
  { ignores: ['pages/en/blog/**/*.{md,mdx}/**', 'public'] },
  {
    extends: [
      react.configs.flat['jsx-runtime'],
      ...tseslint.configs.recommended,
      flatConfigs.typescript,
      ...compatConfig,
    ],
    files: ['**/*.{js,md,mdx,mjs,ts,tsx}'],
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@next/next/no-duplicate-head': 'off',
      'import-x/no-duplicates': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.{md,mdx}'],
    extends: [mdx.flat],
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: true }),
    rules: {
      'no-irregular-whitespace': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': ['error', 'apps/site/pages/'],

      // https://github.com/typescript-eslint/typescript-eslint/issues/9860
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
  {
    files: ['**/*.{mdx,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'react/no-unescaped-entities': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
          message:
            'Default React import not allowed since we use the TypeScript jsx-transform. If you need a global type that collides with a React named export (such as `MouseEvent`), try using `globalThis.MouseHandler`',
        },
        {
          selector:
            "ImportDeclaration[source.value='react'] :matches(ImportNamespaceSpecifier)",
          message:
            'Named * React import is not allowed. Please import what you need from React with Named Imports',
        },
      ],
    },
  },
  mdx.flatCodeBlocks
);
