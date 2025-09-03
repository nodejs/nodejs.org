import js from '@eslint/js';
import * as importX from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  importX.flatConfigs.typescript,

  {
    ignores: [
      'node_modules',
      '.turbo',
      '.next',
      'build',
      'lcov.info',
      'global.d.ts',
      'junit.xml',
      'storybook-static/**',
      '**/.wrangler',
      '**/.open-next',
      'test-results',
      'playwright-report',
      'dist',
    ],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },

    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-empty-function': 'off',

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

      'object-shorthand': 'error',
      curly: ['error', 'all'],
    },
  }
);
