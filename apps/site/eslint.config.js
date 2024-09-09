import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import * as mdx from 'eslint-plugin-mdx';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import react from 'eslint-plugin-react';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();
const pluginToPatch = '@next/next';

const compatConfig = compat
  .config({
    extends: [
      // https://github.com/vercel/next.js/discussions/49337
      'plugin:@next/eslint-plugin-next/core-web-vitals',

      // https://github.com/facebook/react/issues/28313
      'plugin:react-hooks/recommended',
    ],
  })
  .map(entry => {
    if (Object.hasOwn(entry.plugins, pluginToPatch)) {
      entry.plugins[pluginToPatch] = fixupPluginRules(
        entry.plugins[pluginToPatch]
      );
    }

    return entry;
  });

export default tseslint.config(
  {
    ignores: [
      '.next',
      '.swc',
      '.turbo',
      'build',
      'coverage',
      'global.d.ts',
      'junit.xml',
      'storybook-static/**',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      react.configs.flat['jsx-runtime'],
      ...tseslint.configs.recommended,
      ...compatConfig,
    ],
    files: ['**/*.{js,md,mdx,mjs,ts,tsx}'],
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      'import-x/namespace': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'unknown',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: true, prefix: '@' },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{md,mdx}'],
    extends: [mdx.configs.flat],
    rules: {
      'no-irregular-whitespace': 'off',
      '@next/next/no-img-element': 'off',

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
  {
    files: ['.storybook/**', '**/*.mjs', '**/*.test.*'],
    rules: {
      'no-relative-import-paths/no-relative-import-paths': 'off',
    },
  },
  {
    files: ['components/**/*.stories.tsx'],
    extends: [...storybook.configs['flat/recommended']],
  }
);
