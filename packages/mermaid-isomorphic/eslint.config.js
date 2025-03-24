import importX from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  ...tseslint.configs.recommended,
  importX.flatConfigs.typescript,
  {
    ignores: ['dist'],
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
];
