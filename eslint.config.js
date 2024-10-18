import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

export default [
  js.configs.recommended,
  importX.flatConfigs.recommended,
  {
    ignores: [
      'node_modules',
      '.turbo',
      '.next',
      'build',
      'coverage',
      'global.d.ts',
      'junit.xml',
      'storybook-static/**',
    ],
  },
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
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
  },
];
