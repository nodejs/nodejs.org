import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';

export default [
  js.configs.recommended,
  importX.flatConfigs.recommended,
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
    ],
  },
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
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
    },
  },
];
