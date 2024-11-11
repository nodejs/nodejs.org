import importX from 'eslint-plugin-import-x';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  ...tseslint.configs.recommended,
  importX.flatConfigs.typescript,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
];
