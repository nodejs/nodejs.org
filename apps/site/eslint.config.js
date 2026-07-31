import eslintReact from '@eslint-react/eslint-plugin';
import next from '@next/eslint-plugin-next';
import * as mdx from 'eslint-plugin-mdx';

import baseConfig from '../../eslint.config.js';

export default baseConfig.concat([
  {
    ignores: ['pages/en/blog/**/*.{md,mdx}/**', 'public', 'next-env.d.ts'],
  },

  eslintReact.configs['recommended-typescript'],
  next.configs.recommended,
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
    files: ['**/*.{md,mdx}/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  {
    // TODO: Enable validate-links for translations once their routes and
    // anchors are kept in sync with the English content.
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: true }),
    rules: {
      ...mdx.flat.rules,
      // Components used in MDX are never imported; they are injected by our
      // compiler from `mdx/components.mjs`, so they are never in lexical scope.
      'no-undef': 'off',
      'no-irregular-whitespace': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': ['error', 'apps/site/pages/'],
    },
  },
]);
