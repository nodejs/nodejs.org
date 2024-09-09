import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
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
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{js,mjs,ts}'],
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
  }
);
